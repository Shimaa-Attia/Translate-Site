<?php

namespace App\Http\Controllers;
use DateTime;
use App\Models\File;
use App\Models\Field;
use App\Models\Price;
use App\Models\Client;
use App\Models\Country;
use App\Models\Package;
use App\Models\Language;
use App\Models\CustomField;
use Illuminate\Http\Request;
use App\Models\InterpretersRequest;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\InterpretersRequestResource;

class InterpretersRequestController extends Controller
{
    public function all()
    {
       $requests = InterpretersRequest::all()->sortByDesc("created_at");
        return
           InterpretersRequestResource::collection($requests);
    }

    public function show($id)
    {
        $request = InterpretersRequest::find($id);
        if ($request == null) {
            return response()->json([
                "message" => "Project not found"
            ], 404);
        }
        return new InterpretersRequestResource($request);
    }
    public function calculatePrice(Request $request)
    {
        $positionObject = new PositionController;
        $position = $positionObject->ipDetails();
            $county_name=$position->countryName;
            $country = Country::where('name', $county_name)->first();
             if($country==null){
                return response()->json([
                  "message"=>"Not allowed country"
                ]);
             }

        $validator = Validator::make($request->all(), [
            'field_id' => 'required|exists:fields,id',
            'from_language'=>'required|exists:languages,id',
            'to_languages'=>'required|array|min:1',
            'to_languages.*'=>'required|exists:languages,id',
            // 'attachments'=>'required|array|min:1',
            // "attachments.*"=>'required|file|mimes:png,jpg,jpeg,gif,pdf,docx,xlsx',
            'numOfWords'=>'required|integer|min:10',
            // "client_email"=>'email|required',
            //"need_Faster"=>'nullable|date_format:Y-m-d H:i:s|after:' . date(DATE_ATOM, time() + (5 * 60 * 60))
        ]);

        if ($validator->fails()) {
            return response()->json([
                "message" => $validator->errors()], 400);
        }

        // $client = Client::where('email', $request->client_email)->first();
        // if($client==null){
        //     $client=Client::create([
        //     "name" => "undefined",
        //     "email" => $request->client_email,
        //     "country_id"=> $country->id
        //     ]);

        // }else{
        //     $client->update([
        //         "country_id"=> $country->id
        //     ]);
        // }
        $field = Field::where('id', $request->field_id)->first();
        //calculate price
        $price =0;

        //num of words
        $words250Price = Price::where('type','250Word')->first()->price;
        $wordsUnite= ($request->numOfWords) /250;
        $price+= $wordsUnite*$words250Price;

        //field
        if($field->price !=null){
             $price+=$field->price;
        }

        //country
        if($country->price !=null){
            $price+=$country->price;
        }

        //from language
        $from_language= Language::where('id',$request->from_language)->first();
        if($from_language->price !=null){
        $price+=$from_language->price;
        }

        //to languages
        foreach($request->to_languages as $language_id){
            $to_language= Language::where('id',$language_id)->first();
            if($to_language->price !=null){
                $price+=$to_language->price;
            }
        }

       //packages
       $packages = Package::all();
       $offers=[];
       foreach($packages as $package){
          $packagePrice = $price + $price*($package->increasePercentage/100);
          $offer = null;
          $priceAfterOffer = null;
          $priceAfterOfferInClientCurrency = null;
          if($package->offer){
             $offer = $package->offer."%";
              $priceAfterOffer = $price - $price*($package->offer/100);
          }

          if($position->countryCode !='US'){
                $priceInClientCurrency =$positionObject->changeCurrensy($packagePrice);
          }else{
                $priceInClientCurrency =$packagePrice;
          }

          if($package->offer){
             $priceAfterOfferInClientCurrency = $priceInClientCurrency - $priceInClientCurrency*($package->offer/100);
         }
        $num_of_wordUnite= ($request->numOfWords) / ($package->word_unite);
        $numOfDays= $num_of_wordUnite * $package->expected_numOfDays;
        $daysInSecondes=$numOfDays*24*60*60;
        $date=date("Y-m-d h:i A", time() + $daysInSecondes);

        $currencyCode =  $positionObject->getCurrencyFromPosition($position);
          $offers[]=
          [
            'package_id'=>$package->id,
            'package_name'=>$package->name,
            'package_desc'=>$package->description,
            'price'=>number_format($packagePrice, 2),
            'priceInClientCurrency'=>number_format($priceInClientCurrency,2),
            'currencyCode'=>$currencyCode,
            'offer'=>$offer,
            'priceAfterOffer'=>number_format($priceAfterOffer,2),
            'priceAfterOfferInClientCurrency'=>number_format($priceAfterOfferInClientCurrency,2),
            'deliveryDate'=>$date
          ];
       }

        return response()->json([
            "packages"=>$offers
        ]);

    }
// اي ميثود هنخزن فيه السعر نخزن كمان السعر المتحول
    public function FasterDeliveryDate(Request $request){
        $validator = Validator::make($request->all(), [  //|date_format:Y-m-d H:i A
            "DateFaster"=>'required|after:' . date(DATE_ATOM, time() + (5 * 60 * 60)),
            'deliveryDate'=>'required|after:DateFaster' ,
            // "package_id"=>'required|exists:packages,id',
            // "project_id"=>'required|exists:projects,id',
            'price'=>'required|numeric',   //price in dolar  with offer

        ]);
        if ($validator->fails()) {
            return response()->json([
                "message" => $validator->errors()
            ], 409);
        }

        $deliveryDate = new DateTime($request->deliveryDate);
        $DateFaster = new DateTime($request->DateFaster);
        $interval = $deliveryDate->diff($DateFaster);
        $hours=$interval->h + ($interval->i)/60;
        $days = $interval->d + ($hours/24);
        $dayFasterPrice = Price::where('type','dayFaster')->first()->price;
        $newPrice = $request->price + $days *$dayFasterPrice ; //مثلا كل يوم بدري بيزود 5 دولار
        // $newPrice= number_format((float)$newPrice, 2, '.', '');
        // $request = InterpretersRequest::where('id',$request->project_id)->first();
        // $package = Package::where('id',$request->package_id)->first();
        $positionObject = new PositionController;
        $position = $positionObject->ipDetails();
        if($position->countryCode !='US'){
          $priceInClientCurrency =$positionObject->changeCurrensy($newPrice);
        }else{
          $priceInClientCurrency =$newPrice;
        }

        $currencyCode =  $positionObject->getCurrencyFromPosition($position);
        // $request->update([
        //    'package_id'=>$package->id,
        //    'price'=>$newPrice,
        //    'priceInClientCurrency'=>$priceInClientCurrency,
        //    'clientCurrency'=>$currencyCode
        // ]);

        return response()->json([
            'price'=>number_format($newPrice,2),
            'priceInClientCurrency'=>number_format($priceInClientCurrency,2),
            'currencyCode'=>$currencyCode,
            'deliveryDate'=>$request->DateFaster
        ]);


    }
    public function completeInfo(Request $request){
        $validator = Validator::make($request->all(), [  //|date_format:Y-m-d H:i A
            'field_id' => 'required|exists:fields,id',
            'from_language'=>'required|exists:languages,id',
            'to_languages'=>'required|array|min:1',
            'to_languages.*'=>'required|exists:languages,id',
            'numOfWords'=>'required|integer|min:10',
            'attachments'=>'required|array|min:1',
            "attachments.*"=>'required|file|mimes:png,jpg,jpeg,gif,pdf,docx,xlsx',
            'project_name'=>'required|string',  //project name
            'deliveryDate'=>'required|after:' . date(DATE_ATOM, time() + (5 * 60 * 60)),
            "package_id"=>'required|exists:packages,id',
            // "project_id"=>'required|exists:projects,id',
            'price'=>'required|numeric',  //price in dolar with offer
            'notes'=>'nullable|string',
            'name' => 'nullable|string|min:5', //client name
            "phones" => 'nullable|min:11|regex:/^01[0125][0-9]{8}$/|max:11|unique:clients,phone',
            "email"=>'required|email',

        ]);
        if ($validator->fails()) {
            return response()->json([
                "message" => $validator->errors()
            ], 409);
        }
        $positionObject = new PositionController;
        $position = $positionObject->ipDetails();
        $country = Country::where('name', $position->countryName)->first();
        $client= Client::where('email',$request->email)->first();
        if($client != null ){
            // $client->update([
            //     "name" => $request->client_name,
            //     "phone" => $request->phone,
            //     "country_id" => $country->id
            // ]);
            $client->update($request->all()); //name - phone - email   م بنعدل الcountry id
        }else{

            $client= Client::create([
                "name" => $request->client_name,
                "phone" => $request->phone,
                "email"=>$request->email,
                "country_id" => $country->id
            ]);

        }
        // $request = InterpretersRequest::where('id',$request->project_id)->first();

        if($position->countryCode !='US'){
          $priceInClientCurrency =$positionObject->changeCurrensy($request->price);
        }else{
          $priceInClientCurrency =$request->price;
        }

        $currencyCode =  $positionObject->getCurrencyFromPosition($position);
        // $update=  $request->update([
        //   'name'=>$request->name,
        //   'package_id'=>$request->package_id,
        //   'price'=>$request->price,
        //   'notes'=>$request->notes,
        //   'selectedDeliveryDate'=>$request->deliveryDate,
        //   'priceInClientCurrency'=>$priceInClientCurrency,
        //   'clientCurrency'=>$currencyCode
        // ]);
        // if($update){
        //     return response()->Json([
        //        "message"=>'your data has been saved, please continue to pay..',
        //        "project_id"=>$request->id,
        // ]);
        // }else{
        //     return response()->json([
        //        "message"=>"Something went wrong.."
        //     ], 409);
        // }
        $package = Package::where('id', $request->package_id)->first();
           $request = InterpretersRequest::create([
                "client_id" => $client->id,
                "country_id"=>$client->country_id,
                "field_id"=>$request->field_id,
                "numOfWords"=>$request->numOfWords,
                "country_id"=>$country->id,
                'from_language'=>$request->from_language,
                'name'=>$request->project_name,
                'package_id'=>$package->id,
                'price'=>$request->price,
                'notes'=>$request->notes,
                'packageOffer'=>$package->offer,
                'selectedDeliveryDate'=>$request->deliveryDate,
                'priceInClientCurrency'=>$priceInClientCurrency,
                'clientCurrency'=>$currencyCode
            ]);
            if($request){

                foreach($request->attachments as $attachment){
                    $newName = Storage::putFile("files",$attachment);
                    $file= File::create([
                        "name" => $newName,
                        "project_id" => $request->id
                    ]);
                    if(!$file){
                        $request->forceDelete();
                        return response()->json([
                            "message"=>"Something went wrong.."
                        ],409);
                    }
                }

                // foreach($request->to_languages as $language_id){
                //     $language=  Language_InterpretersRequest::create([
                //         'language_id'=>$language_id,
                //         'project_id'=>$request->id
                //     ]);
                //     if(!$language){
                //         $request->forceDelete();
                //         return response()->json([
                //           "message"=>"Something went wrong.."
                //         ], 409);
                //     }

                // }
            }else{
                return response()->json([
                    "message"=>"Something went wrong.."
                  ],409);
            }
            return response()->Json([
                       "message"=>'your data has been saved, please continue to pay..',
                       "project_id"=>$request->id,
            ]);

    }
    public function update(Request $request, $id)
    {
        $request = InterpretersRequest::find($id);
        if ($request == null) {
            return response()->json([
                "message" => "Project not found"
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'feild_name' => 'required|exists:fields,name',

        ]);
        if ($validator->fails()) {
            return response()->json([
                "message" => $validator->errors()
            ], 409);
        }

        $field = Field::where('name', $request->feild_name)->first();
        // return $field;

        $request->update([
            "name" => $request->name,
            "field_id"=>$field->id
        ]);

        return response()->json([
            "message" => "Project has been updated ",
        ]);


    }

    public function updateStatus(Request $request, $id){
        //check
      $request = InterpretersRequest::find($id);
      if ($request == null) {
          return response()->json([
              "message" => "project not found "
          ], 404);
      }
      //validation
      $validator = Validator::make($request->all(), [
         'status_id'=>'required|exists:custom_fields,id'
      ]);
      if ($validator->fails()) {
          return response()->json([
              "message" => $validator->errors()
              ],409);
      }
      $status = CustomField::where('id',$request->status_id)->first();
      if($status->type!="status" ){
          return response()->json([
               "message" => "Choose a vaild status"
          ], 409);
      }

      $request->update([
        "status_id"=>$request->status_id,
      ]);

      return response()->json([
          "message" => "status of $request->name project has been updated ",
      ]);
    }

    public function destroy($id)
    {
        $request = InterpretersRequest::find($id);
        if ($request == null) {
            return response()->json([
                "message" => "Project not found"
            ], 404);
        }
        $request->delete();
        return response()->json([
            "message" => "Project has been archived"
        ], 200);
    }


    public function archive()
    {

        $requests = InterpretersRequest::onlyTrashed()->orderBy('created_at', 'DESC')->get();

        return InterpretersRequestResource::collection($requests);

    }

    public function restore($id)
    {
        $request = InterpretersRequest::onlyTrashed()->find($id);
        if ($request == null) {
            return response()->json([
                "message" => "Project not found in archive"
            ], 404);
        }
        $request->restore();
        return response()->json([
            "message" => "Project has been restored",
            "project" => new InterpretersRequestResource($request)
        ], 200);
    }

    public function deleteArchive($id)
    {
        $request = InterpretersRequest::onlyTrashed()->find($id);
        if ($request == null) {
            return response()->json([
                "message" => "Project not found in archive"
            ], 404);
        }
        $files=$request->files;

        if($files != null){
            foreach($files as $file){
                Storage::disk('public')->delete($file->name);

            }
        }
        $request->forceDelete();
        return response()->json([
            "message" => "Project has been deleted"
        ], 200);
    }


    public function search($key)
    {
        $requests = InterpretersRequest::where('name', 'like', "%$key%")
            ->orWhereHas('country', function ($query) use ($key) {
                $query->where('name', 'like', "%$key%");
            })
            ->orWhereHas('field', function ($query) use ($key) {
                $query->where('name', 'like', "%$key%");
            })
            ->orWhereHas('languages', function ($query) use ($key) {
                $query->where('name', 'like', "%$key%");
            })
            ->orderBy('created_at', 'DESC')->get();
        return InterpretersRequestResource::collection($requests);

    }
}

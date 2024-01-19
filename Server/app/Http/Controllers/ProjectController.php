<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjectResource;
use App\Models\Client;
use App\Models\Country;
use App\Models\CustomField;
use App\Models\Field;
use App\Models\File;
use App\Models\Language;
use App\Models\Language_project;
use App\Models\Package;
use App\Models\Price;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Stevebauman\Location\Facades\Location;

class ProjectController extends Controller
{
    public function all()
    {
        $projects = Project::all()->sortByDesc("created_at");
        return
            ProjectResource::collection($projects);
    }

    public function show($id)
    {
        $project = Project::find($id);
        if ($project == null) {
            return response()->json([
                "message" => "Project not found"
            ], 404);
        }
        return new ProjectResource($project);
    }
    public function create(Request $request)
    {
        // return date('Y-m-d H:i:s',time()+ (5 * 60 * 60));//,

        if ($position =  Location::get('ip_address')) {
            $county_name=$position->countryName;
            $country = Country::where('name', $county_name)->first();
             if($country==null){
                return response()->json([
                  "message"=>"Not allowed country"
                ]);
             }
        }
        $validator = Validator::make($request->all(), [
            'feild_name' => 'required|exists:fields,name',
            'from_language'=>'required|exists:languages,id',
            'to_languages.*'=>'required|exists:languages,id',
            "attachments.*"=>'required|file|mimes:png,jpg,jpeg,gif,pdf,docx,xlsx',
            'numOfWords'=>'required|integer|min:10',
            "client_email"=>'email|required',
            //"need_Faster"=>'nullable|date_format:Y-m-d H:i:s|after:' . date(DATE_ATOM, time() + (5 * 60 * 60))
        ]);

        if ($validator->fails()) {
            return response()->json([
                "message" => $validator->errors()], 400);
        }

        $client = Client::where('email', $request->client_email)->first();
        if($client==null){
            $client=Client::create([
            "name" => "undefined",
            "email" => $request->client_email,
            "country_id"=> $country->id
            ]);

        }else{
            $client->update([
                "country_id"=> $country->id
            ]);
        }
        $field = Field::where('name', $request->feild_name)->first();
        //calculte price
        $price =0;

        //num of words
        $words100Price = Price::where('type','100Word')->first()->price;
        $wordsUnite= ($request->numOfWords) /100;
        $price+= $wordsUnite*$words100Price;

        //field
        if($field->price !=null){
             $price+=$field->price;
        }else{
           $price += Price::where('type','field')->first()->price;
        }

        //country
        if($country->price !=null){
            $price+=$country->price;
        }else{
           $price += Price::where('type','field')->first()->price;
        }

        //from language
        $from_language= Language::where('id',$request->from_language)->first();
        if($from_language->price !=null){
        $price+=$from_language->price;
        }else{
            $price += Price::where('type','language')->first()->price;
        }



        //to languages
        foreach($request->to_languages as $language_id){
            $to_language= Language::where('id',$language_id)->first();
            if($to_language->price !=null){
                $price+=$to_language->price;
                }else{
                    $price += Price::where('type','language')->first()->price;
                }
        }

       //packages
       $packages = Package::all();
       $offers=[];
       foreach($packages as $package){
          $packagePrice = $price + $price*($package->increasePercentage/100);
          $num_of_wordUnite= ($request->numOfWords) / ($package->word_unite);
        //   return $num_of_wordUnite;
        //   return $package->word_unite;
          $numOfDays= $num_of_wordUnite * $package->expected_numOfDays;
        //   return  $numOfDays;
        $daysInSecondes=$numOfDays*24*60*60;
        // return $daysInSecondes;
        $date=date("Y-m-d H:i A", time() + $daysInSecondes);
          $offers[]=
          [
            'package_id'=>$package->id,
            'package_name'=>$package->name,
            'package_desc'=>$package->description,
            'price'=>"$packagePrice",
            'excepectedDelveryDate'=>$date
          ];
       }

        // DB::transaction(function () use ($request,$client,$field,$country) {

           $project = Project::create([
                "client_id" => $client->id,
                "field_id"=>$field->id,
                "numOfWords"=>$request->numOfWords,
                "country_id"=>$country->id,
                'from_language'=>$request->from_language,

            ]);
            if($project){

                foreach($request->attachments as $attachment){
                    $newName = Storage::putFile("files",$attachment);
                    $file= File::create([
                        "name" => $newName,
                        "project_id" => $project->id
                    ]);
                    if(!$file){
                        $project->forceDelete();
                        return response()->json([
                            "message"=>"Something went wrong.."
                        ]);
                    }
                }

                foreach($request->to_languages as $language_id){
                    $language=  Language_project::create([
                        'language_id'=>$language_id,
                        'project_id'=>$project->id
                    ]);
                    if(!$language){
                        $project->forceDelete();
                        return response()->json([
                          "message"=>"Something went wrong.."
                        ]);
                    }

                }
            }else{
                return response()->json([
                    "message"=>"Something went wrong.."
                  ]);
            }

        // });

        return response()->json([
            "project_id"=>$project->id,
            "packages"=>$offers
        ]);

    }

    public function FasterDeliveryDate(Request $request){
        $validator = Validator::make($request->all(), [
            "need_Faster"=>'required|date_format:Y-m-d H:i:s|after:' . date(DATE_ATOM, time() + (5 * 60 * 60))
        ]);
    }

    public function update(Request $request, $id)
    {
        $project = Project::find($id);
        if ($project == null) {
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

        $project->update([
            "name" => $request->name,
            "field_id"=>$field->id
        ]);

        return response()->json([
            "message" => "Project has been updated ",
        ]);


    }

    public function updateStatus(Request $request, $id){
        //check
      $project = Project::find($id);
      if ($project == null) {
          return response()->json([
              "message" => "project not found"
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

      $status->update([
         "status_id"=>$request->status_id,
      ]);

      return response()->json([
          "message" => "status of $project->name project has been updated ",
      ]);
  }
    public function destroy($id)
    {
        $project = Project::find($id);
        if ($project == null) {
            return response()->json([
                "message" => "Project not found"
            ], 404);
        }
        $project->delete();
        return response()->json([
            "message" => "Project has been archived"
        ], 200);
    }


    public function archive()
    {

        $projects = Project::onlyTrashed()->orderBy('created_at', 'DESC')->get();
        return response()->json([
            'projects' =>  ProjectResource::collection($projects),
        ]);
    }

    public function restore($id)
    {
        $project = Project::onlyTrashed()->find($id);
        if ($project == null) {
            return response()->json([
                "message" => "Project not found in archive"
            ], 404);
        }
        $project->restore();
        return response()->json([
            "message" => "Project has been restored",
            "project" => new ProjectResource($project)
        ], 200);
    }

    public function deleteArchive($id)
    {
        $project = Project::onlyTrashed()->find($id);
        if ($project == null) {
            return response()->json([
                "message" => "Project not found in archive"
            ], 404);
        }
        $project->forceDelete();
        return response()->json([
            "message" => "Project has been deleted"
        ], 200);
    }


    public function search($key)
    {
        $projects = project::where('name', 'like', "%$key%")
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
        return ProjectResource::collection($projects);

    }
}

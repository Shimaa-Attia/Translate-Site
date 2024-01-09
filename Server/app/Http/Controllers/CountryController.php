<?php

namespace App\Http\Controllers;

use App\Models\Country;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use PHPUnit\Framework\Constraint\Count;

class CountryController extends Controller
{
    public function all()
    {
        $countries = Country::all();
        return $countries;
    }
    public function show($id)
    {
        $country = Country::find($id);
        if ($country == null) {
            return response()->json([
                "message" => "country not found"
            ], 404);
        }
        return $country;

    }
     public function create(Request $request){
        $validator = Validator::make($request->all(), [
            'name'=>'required|string|max:100|unique:countries,name',
            'code'=>'string|max:10',
            'price' => 'numeric',
        ]);

        if ($validator->fails()) {
            return response()->json([
                "message" => $validator->errors()
                ], 409);
        }

        $country = Country::create([
            "name"=> $request->name,
            "code"=> $request->code,
            "price" => $request->price,

        ]);

        return response()->json([
          "message"=>"country added..",
          "country"=>$country
        ]);
    }

    public function update(Request $request, $id)
    {
        //check
        $country = Country::find($id);
        if ($country == null) {
            return response()->json([
                "message" => "country not found"
            ], 404);
        }
        //validation
        $validator = Validator::make($request->all(), [
            "name"=>'required|string|max:100|unique:countries,name,'.$country->id,
            'code'=>'string|max:10',
            'price' => 'numeric|gte:0',
        ]);
        if ($validator->fails()) {
            return response()->json([
                "message" => $validator->errors()
            ], 409);
        }
        if (empty($request->price)) {
            //update to default
             $country->update([
                "price" =>null,
                "code"=>$request->code,
                "name" => $request->name,
            ]);
             //response
            return response()->json([
                "message" => "$request->name country has been updated & price has been set at  the default price",
                'country' =>$country
            ]);
        }
        $country->update([
             "name" => $request->name,
             "code"=>$request->code,
             "price" => $request->price

        ]);
        return response()->json([
             "message" => "$request->name country has been updated",
        'country' =>$country
        ]);


        // if($request->price >0 ){
        //     //update
        //     $country->update([
        //         "price" => $request->price,

        //     ]);
        //      //response
        //     return response()->json([
        //         "message" => "The price for $country->name has been set at $$request->price",
        //     ]);
        // }elseif (empty($request->price)) {
        //     //update
        //     $country->update([
        //         "price" =>null,

        //     ]);
        //      //response
        //      return response()->json([
        //         "message" => "The price for $country->name has been set at  the default price",
        //     ]);

        // }else{
        //       //response
        //       return response()->json([
        //         "message" => "enter a positive value",
        //     ]);
        // }


    }


    public function destroy($id)
    {
        $country = Country::find($id);
        if ($country == null) {
            return response()->json([
                "message" => "country not found"
            ], 404);
        }
        $country->delete();
        return response()->json([
            "message" => "$country->name  has been archived"], 200);
    }


    public function archive()
    {

        $countries = Country::onlyTrashed()->get();

        return response()->json([
            'countries' => $countries
        ]);


    }

    public function restore($id)
    {
        $country =  Country::onlyTrashed()->find($id);
        if ($country == null) {
            return response()->json([
                "message" => "country not found in arcvive"
            ], 404);
        }
        $country->restore();
        return response()->json([
                "message" => "$country->name  has been restored",
                "country" => $country
                ] ,200);
    }

    public function deleteArchive($id)
    {
        $country = Country::onlyTrashed()->find($id);
        if ($country == null) {
            return response()->json([
                "message" => "country not found in arcvive"
            ], 404);
        }
        $country->forceDelete();
        return response()->json([
            "message" => "$country->name  has been deleted"], 200);
    }

    public function search($key)
    {
         return Country::where('name', 'like', "%$key%")
                    ->orWhere('code',"$key")
                    ->get();
    }

}

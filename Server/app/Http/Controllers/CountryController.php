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
            'code'=>'string|max:10|nullable',
            'price' => 'numeric|nullable|gt:0',
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
            'code'=>'string|max:10|nullable',
            'price' => 'numeric|gt:0|nullable',
        ]);
        if ($validator->fails()) {
            return response()->json([
                "message" => $validator->errors()
            ], 409);
        }

        //update
        $country->update([
            "name" => $request->name,
            "code"=> $request->code,
            "price" => $request->price

        ]);

        //response
        if (empty($request->price)) {
            return response()->json([
                "message" => "$request->name  has been updated & price has been set at  the default price",
                'country' =>$country
            ]);
        }
        return response()->json([
             "message" => "$request->name  has been updated",
            'country' =>$country
        ]);

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

<?php

namespace App\Http\Controllers;

use App\Models\Language;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LanguageController extends Controller
{
    public function all()
    {
        $languaegs = Language::all();
        return $languaegs;
    }
    public function show($id)
    {
        $language = Language::find($id);
        if ($language == null) {
            return response()->json([
                "message" => "Language not found", 404
            ]);
        }
        return $language;

    }
    public function create(Request $request){
        $validator = Validator::make($request->all(), [
            'name'=>'required|string|max:100',
            'code'=>'string|max:10',
            'price' => 'numeric',
        ]);

        if ($validator->fails()) {
            return response()->json([
                "message" => $validator->errors()
                ], 409);
        }

        $language = Language::create([
            "name"=> $request->name,
            "code"=> $request->code,
            "price" => $request->price,

        ]);

        return response()->join([
          "message"=>"language added..",
          "language"=>$language
        ]);
    }
    public function update(Request $request, $id)
    {
        //check
        $language = Language::find($id);
        if ($language == null) {
            return response()->json([
                "message" => "Language not found", 404
            ]);
        }
        //validation
        $validator = Validator::make($request->all(), [
            'price' => 'numeric|gt:0',
        ]);
        if ($validator->fails()) {
            return response()->json([
                "message" => $validator->errors()
                , 409]);
        }

        if($request->price >0 ){
            //update
            $language->update([
                "price" => $request->price,

            ]);
             //response
            return response()->json([
                "message" => "The price for $language->name has been set at $$request->price",
            ]);
        }elseif (empty($request->price)) {
            //update to default
            $language->update([
                "price" =>null,

            ]);
             //response
             return response()->json([
                "message" => "The price for $language->name has been set at  the default price",
            ]);
        }

    }


    public function destroy($id)
    {
        $language = Language::find($id);
        if ($language == null) {
            return response()->json([
                "message" => "language not found"
            ], 404);
        }
        $language->delete();
        return response()->json([
            "message" => "$language->name  has been archived"], 200);
    }


    public function archive()
    {

        $languaegs = Language::onlyTrashed()->get();

        return response()->json([
            'languages' => $languaegs
        ]);


    }

    public function restore($id)
    {
        $language =  Language::onlyTrashed()->find($id);
        if ($language == null) {
            return response()->json([
                "message" => "language not found in arcvive"
            ], 404);
        }
        $language->restore();
        return response()->json([
                "message" => "$language->name  has been restored",
                "language" => $language
                ] ,200);
    }

    public function deleteArchive($id)
    {
        $language = Language::onlyTrashed()->find($id);
        if ($language == null) {
            return response()->json([
                "message" => "language not found in arcvive"
            ], 404);
        }
        $language->forceDelete();
        return response()->json([
            "message" => "$language->name  has been deleted"], 200);
    }


    public function search($key)
    {
         return $languaegs = Language::where('name', 'like', "%$key%")
                    ->orWhere('code',"$key")
                    ->get();
    }
}

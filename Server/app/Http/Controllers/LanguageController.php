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
            'name'=>'required|string|max:100|unique:languages,name',
            'code'=>'string|max:10|nullable',
            'price' => 'numeric|gt:0|nullable',
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

        return response()->json([
          "message"=>"language has been added ",
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
            "name"=>'required|string|max:100|unique:countries,name,'.$language->id,
            'code'=>'string|max:10|nullable',
            'price' => 'numeric|nullable|gt:0',
        ]);
        if ($validator->fails()) {
            return response()->json([
                "message" => $validator->errors()
                ], 409);
        }

        //update
        $language->update([
            "name" => $request->name,
            "code"=> $request->code,
            "price" => $request->price

        ]);

        //response
        if (empty($request->price)) {
             return response()->json([
                "message" => "$request->name  has been updated & price has been set at  the default price",
                'language' =>$language
            ]);
        }
        return response()->json([
             "message" => "$request->name  has been updated",
            'language' =>$language
        ]);
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

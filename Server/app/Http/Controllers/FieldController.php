<?php

namespace App\Http\Controllers;

use App\Http\Resources\FieldResource;
use App\Models\Field;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FieldController extends Controller
{
    public function all()
    {
        $fields = Field::all();

        return FieldResource::collection( $fields);
    }

    public function show($id)
    {
        $field = Field::find($id);
        if ($field == null) {
            return response()->json([
                "message" => "Topic not found"
            ], 404);
        }
        return new FieldResource($field);

    }

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "name"=>'required|string|max:100|unique:fields,name',
            'price' => 'required|numeric|gt:0',
        ]);
        if ($validator->fails()) {
            return response()->json([
                "message" => $validator->errors(),409]);
        }

        //create
        $field = Field::create([
            "name" => $request->name,
            "price" => $request->price,
        ]);

        return response()->json([
            "message" => "$request->name Topic has been added",
            'topic' => new FieldResource($field)
        ]);

    }

    public function update(Request $request, $id)
    {

        //check
        $field = Field::find($id);
        if ($field == null) {
            return response()->json([
                "message" => "Topic not found"
            ], 404);
        }
        //validation
        $validator = Validator::make($request->all(), [
            "name"=>'required|string|max:100|unique:fields,name,'.$field->id,
            'price' => 'numeric|gt:0',
        ]);
        if ($validator->fails()) {
            return response()->json([
                "message" => $validator->errors(),409]);
        }

        //update
      if (empty($request->price)) {
            //update to default
             $field->update([
                "price" =>null,
                "name" => $request->name,
            ]);
             //response
             return response()->json([
                "message" => "$request->name topic has been updated & price has been set at  the default price",
                'topic' => new FieldResource($field)
            ]);
        }  elseif($request->price == $field->price){//update name only
            $field->update([
                "name" => $request->name,
                "price" => $request->price

            ]);
            return response()->json([
                "message" => "$request->name Topic has been updated",
                'topic' => new FieldResource($field)
            ]);

        }


    }


    public function destroy($id)
    {
        $field = Field::find($id);
        if ($field == null) {
            return response()->json([
                "message" => "Topic not found", 404
            ]);
        }
        $field->delete();
        return response()->json([
            "message" => "$field->name topic has been archived"], 200);
    }


    public function archive()
    {

        $fields = Field::onlyTrashed()->get();

        return response()->json([
            'topics' => FieldResource::collection( $fields)
        ]);


    }

    public function restore($id)
    {
        $field = Field::onlyTrashed()->find($id);
        if ($field == null) {
            return response()->json([
                "message" => "Topic not found in arcvive", 404
            ]);
        }
        $field->restore();
        return response()->json([
                "message" => "$field->name topic has been restored",
                "topic" => new FieldResource($field)]
            , 200);
    }

    public function deleteArchive($id)
    {
        $field = Field::onlyTrashed()->find($id);
        if ($field == null) {
            return response()->json([
                "message" => "Topic not found in arcvive", 404
            ]);
        }
        $field->forceDelete();
        return response()->json([
            "message" => "$field->name topic has been deleted"], 200);
    }

    public function search($key)
    {
        $fields = Field::where('name', 'like', "%$key%")->get();
        return FieldResource::collection( $fields);

    }



}

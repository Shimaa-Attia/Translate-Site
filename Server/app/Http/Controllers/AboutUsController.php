<?php

namespace App\Http\Controllers;

use App\Models\AboutUs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AboutUsController extends Controller
{
    public function all()
    {
       $results = AboutUs::all();
        return $results;
    }

    public function show($id)
    {
        $record = AboutUs::find($id);
        if ($record == null) {
            return response()->json([
                "message" => "not found", 404
            ]);
        }
        return $record;

    }

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'nullable|string',
            'desc'=>'nullable|string'
        ]);
        if ($validator->fails()) {
            return response()->json([
                "message" => $validator->errors()],409);
        }
        if($request->name || $request->desc){

            AboutUs::create($request->all());

              return response()->json([
                  'message'=>"added"
                ]);
        }else{
            return response()->json([
                'message'=>"Please enter the name or description of the Information"
              ]);
        }
    }

    public function update(Request $request, $id)
      {
          //check
        $record = AboutUs::find($id);
        if ($record == null) {
            return response()->json([
                "message" => "not found"
            ], 404);
        }
        //validation
        $validator = Validator::make($request->all(), [
            'name' => 'nullable|string',
            'desc'=>'nullable|string'
        ]);
        if ($validator->fails()) {
            return response()->json([
                "message" => $validator->errors()
                ],409);
        }
        //update
        $record->update($request->all());
        //response
        return response()->json([
            "message" => "updated "
        ], 200);

    }


    public function destroy($id)
    {
        $record = AboutUs::find($id);
        if ($record == null) {
            return response()->json([
                "message" => "not found", 404
            ]);
        }
        $record->delete();
        return response()->json([
            "message" => "Archived "], 200);
    }


    public function archive()
    {

       $results = AboutUs::onlyTrashed()->orderBy('created_at', 'DESC')->get();

        return $results;


    }

    public function restore($id)
    {
        $record = AboutUs::onlyTrashed()->find($id);
        if ($record == null) {
            return response()->json([
                "message" => "not found"
            ], 404);
        }
        $record->restore();
        return response()->json([
                "message" => "restored ",
                "record" => $record
                ]  , 200);
    }

    public function deleteArchive($id)
    {
        $record = AboutUs::onlyTrashed()->find($id);
        if ($record == null) {
            return response()->json([
                "message" => "not found"
            ], 404);
        }
        $record->forceDelete();
        return response()->json([
            "message" => "deleted "], 200);
    }

    public function search($key)
    {
       $results = AboutUs::where('name', 'like', "%$key%")
            ->orWhere('desc','like',"%$key%")->get();
        return $results;

    }
}

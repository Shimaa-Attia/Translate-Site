<?php

namespace App\Http\Controllers;

use App\Http\Resources\CustomFieldResource;
use App\Models\CustomField;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use SebastianBergmann\CodeCoverage\Report\Html\CustomCssFile;

class CustomFieldController extends Controller
{
    public function getCustomList($type){
        $customFields = CustomField::where('type',$type)->get();
        if($customFields === null){
            return response()->json([
                "message"=>"$type Not found"
            ],404);
        }
        return CustomFieldResource::collection($customFields);
    }

    public function show($id){
        $customField = CustomField::find($id);
        if($customField === null){
            return response()->json([
                "message"=>"Not found"
            ],404);
        }

        return new CustomFieldResource($customField);
    }
    
    public function create(Request $request , $type){
        $validator = Validator::make($request->all(),[
            'name'=>"required|string"
        ]);
        if($validator->fails()){
            return response()->json([
                "message"=>$validator->errors()
            ],409);
        }

       $create = CustomField::create([
            'type'=>$type,
            'name'=>$request->name
        ]);

        if($create){
            return response()->json([
              "message"=>"$type has beeen added "
            ]);
        }else{
            return response()->json([
                "message"=>"Something went wrong"
            ],409);
        }

    }

    public function update(Request $request ,$id){
        $customField = CustomField::find($id);
        if($customField === null){
            return response()->json([
                "message"=>"Not found"
            ],404);
        }
        $validator = Validator::make($request->all(),[
            'name'=>"required|string"
        ]);

        if($validator->fails()){
            return response()->json([
                "message"=>$validator->errors()
            ],409);
        }

        $customField->update([
          'name'=>$request->name
        ]);

        return response()->json([
            "message"=>"$customField->type has been updated "
        ],200);
    }

    public function destroy($id)
    {
        $customField = CustomField::find($id);
        if($customField === null){
            return response()->json([
                "message"=>"Not found"
            ],404);
        }
        $customField->delete();
        return response()->json([
            "message" => "$customField->name has been Archieved "
        ], 200);
    }


    public function archive($type)
    {

        $customFields = CustomField::onlyTrashed()->where('type',$type)
        ->get();

        return  $customFields;


    }

    public function restore($id)
    {
        $customField = CustomField::onlyTrashed()->find($id);
        if ($customField == null) {
            return response()->json([
                "message" => "Not found in archive"
            ], 404);
        }
        $customField->restore();
        return response()->json([
                "message" => "$customField->name  has been restored ",
                'customField' => $customField
        ], 200);
    }

    public function deleteArchive($id)
    {
        $customField = CustomField::onlyTrashed()->find($id);
        if ($customField == null) {
            return response()->json([
                "message" => "Not found in archive"
            ], 404);
        }
        $customField->forceDelete();
        return response()->json([
            "message" => "$customField->name ha been deleted"], 200);
    }
}




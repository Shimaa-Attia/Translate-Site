<?php

namespace App\Http\Controllers;

use App\Models\Package;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PackageController extends Controller
{
    public function all()
    {
        $packages = Package::all();
        return $packages;
    }
    public function show($id)
    {
        $package = Package::find($id);
        if ($package == null) {
            return response()->json([
                "message" => "package not found"
            ], 404);
        }
        return $package;

    }
    public function create(Request $request){
        $validator = Validator::make($request->all(), [
            'name'=>'required|string|max:100|unique:packages,name',
            'increasePercentage'=> 'numeric|required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                "message" => $validator->errors()
                ], 409);
        }

        $package = Package::create([
            "name"=> $request->name,
            "increasePercentage" => $request->increasePercentage,

        ]);

        return response()->json([
          "message"=>"Package added..",
          "package"=> $package
        ]);
    }

    public function update(Request $request, $id)
    {
        //check
        $package = Package::find($id);
        if ($package == null) {
            return response()->json([
                "message" => "Package not found"
            ], 404);
        }
        //validation
        $validator = Validator::make($request->all(), [
            'name'=>'required|string|max:100|unique:packages,name,'.$id,
            'increasePercentage'=> 'numeric|required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                "message" => $validator->errors()
                ], 409);
        }


            //update
            $package->update([
                "name"=> $request->name,
                "increasePercentage" => $request->increasePercentage,

            ]);
             //response
            return response()->json([
                "message" => "$package->name package updated.."

            ]);

    }


    public function destroy($id)
    {
        $package = Package::find($id);
        if ($package == null) {
            return response()->json([
                "message" => "Package not found"
            ], 404);
        }
        $package->delete();
        return response()->json([
            "message" => "$package->name package has been archived"], 200);
    }


    public function archive()
    {

        $packages = Package::onlyTrashed()->get();

        return response()->json([
            'packages' => $packages
        ]);


    }

    public function restore($id)
    {
        $package =  Package::onlyTrashed()->find($id);
        if ($package == null) {
            return response()->json([
                "message" => "package not found in arcvive"
            ], 404);
        }
        $package->restore();
        return response()->json([
                "message" => "$package->name package has been restored",
                "package" => $package
                ] ,200);
    }

    public function deleteArchive($id)
    {
        $package =  Package::onlyTrashed()->find($id);
        if ($package == null) {
            return response()->json([
                "message" => "package not found in arcvive"
            ], 404);
        }
        $package->forceDelete();
        return response()->json([
            "message" => "$package->name package has been deleted"], 200);
    }

    public function search($key)
    {
         return Package::where('name', 'like', "%$key%")
                    ->orWhere('increasePercentage',"$key.%")
                    ->get();
    }
}

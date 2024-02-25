<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ServiceController extends Controller
{
    public function all()
    {
        $services = Service::all();
        return $services;
    }

    public function show($id)
    {
        $service = Service::find($id);
        if ($service == null) {
            return response()->json([
                "message" => "not found", 404
            ]);
        }
        return $service;

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

            Service::create($request->all());

              return response()->json([
                  'message'=>"the Service has been added"
                ]);
        }else{
            return response()->json([
                'message'=>"Please enter the name or description of the service"
              ]);
        }
    }

    public function update(Request $request, $id)
      {
          //check
        $service = Service::find($id);
        if ($service == null) {
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
        $service->update($request->all());
        //response
        return response()->json([
            "message" => "Service has been updated "
        ], 200);

    }


    public function destroy($id)
    {
        $service = Service::find($id);
        if ($service == null) {
            return response()->json([
                "message" => "not found", 404
            ]);
        }
        $service->delete();
        return response()->json([
            "message" => "Service has been Archived "], 200);
    }


    public function archive()
    {

        $services = Service::onlyTrashed()->orderBy('created_at', 'DESC')->get();

        return response()->json([
            'Services' => $services,
        ]);


    }

    public function restore($id)
    {
        $service = Service::onlyTrashed()->find($id);
        if ($service == null) {
            return response()->json([
                "message" => "not found"
            ], 404);
        }
        $service->restore();
        return response()->json([
                "message" => "Service has been restored ",
                "Service" => $service
                ]  , 200);
    }

    public function deleteArchive($id)
    {
        $service = Service::onlyTrashed()->find($id);
        if ($service == null) {
            return response()->json([
                "message" => "not found"
            ], 404);
        }
        $service->forceDelete();
        return response()->json([
            "message" => "Service has been deleted "], 200);
    }

    public function search($key)
    {
        $Services = Service::where('name', 'like', "%$key%")
            ->orWhere('desc','like',"%$key%")->get();
        return $Services;

    }
}

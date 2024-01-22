<?php

namespace App\Http\Controllers;

use App\Http\Resources\ClientResource;
use App\Http\Resources\ProjectResource;
use App\Models\Client;
use App\Models\Country;
use GuzzleHttp\Promise\Create;
use Illuminate\Database\Eloquent\Casts\Json;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Stevebauman\Location\Facades\Location;

class ClientController extends Controller
{
    public function all()
    {
        $clients = Client::all()->sortByDesc("created_at");
        return
            ClientResource::collection($clients);
    }

    public function show($id)
    {
        $client = Client::find($id);
        if ($client == null) {
            return response()->json([
                "message" => "Client not found", 404
            ]);
        }
        return new ClientResource($client);

    }

    public function create(Request $request)
    {
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
            'name' => 'required',
            "phones" => 'nullable|min:11|regex:/^01[0125][0-9]{8}$/|max:11|unique:clients,phone',
            "email"=>'required|email',
            // 'country_name' => 'required|exists:countries,name' //
        ]);
        if ($validator->fails()) {
            return response()->json([
                "message" => $validator->errors(),409]);
        }

        $client= Client::where('email',$request->email)->first();
        if($client == null ){
            return response()->json([
              'message'=>"Please enter the same email you used when uploading files"
            ],409);
        }

        $client->update([
            "name" => $request->name,
            "phone" => $request->phone,
            "country_id" => $country->id
        ]);

        return response()->json([
            'message'=>"your data has been saved, Please continue to pay"
          ]);

    }

     public function update(Request $request, $id)
      {
        $client = Client::find($id);
        if ($client == null) {
            return response()->json([
                "message" => "Client not found", 404
            ]);
        }


        $validator = Validator::make($request->all(), [
            'name' => 'required',
            "phones" => 'nullable|min:11|regex:/^01[0125][0-9]{8}$/|max:11|unique:clients,phone'.$id,
            "email"=>'required|email|unique:clients,email'.$id,
            'country_name' => 'required|exists:countries,name'
        ]);
        if ($validator->fails()) {
            return response()->json([
                "message" => $validator->errors(),409]);
        }


        $country = Country::where('name', $request->country_name)->first('id');


        $client->update([
            "name" => $request->name,
            "email" => $request->email,
            "phone" => $request->phone,
            "review" => $request->review,
            "country_id" => $country->id,
        ]);
        //response
        return response()->json([
            "message" => "Client data has been updated ", "client " => $client
        ], 200);


   }


    public function destroy($id)
    {
        $client = Client::find($id);
        if ($client == null) {
            return response()->json([
                "message" => "Client not found", 404
            ]);
        }
        $client->delete();
        return response()->json([
            "message" => "Client has been Archived "], 200);
    }


    public function archive()
    {

        $clients = Client::onlyTrashed()->orderBy('created_at', 'DESC')->get();

        return response()->json([
            'clients' => ClientResource::collection($clients),
        ]);


    }

    public function restore($id)
    {
        $client = Client::onlyTrashed()->find($id);
        if ($client == null) {
            return response()->json([
                "message" => "not found"
            ], 404);
        }
        $client->restore();
        return response()->json([
                "message" => "Client has been restored ",
                "client" => new ClientResource($client)]
            , 200);
    }

    public function deleteArchive($id)
    {
        $client = Client::onlyTrashed()->find($id);
        if ($client == null) {
            return response()->json([
                "message" => "not found"
            ], 404);
        }
        $client->forceDelete();
        return response()->json([
            "message" => "Client has been deleted "], 200);
    }

    public function search($key)
    {
        $clients = Client::where('name', 'like', "$key.%")
                 ->OrWhere('email', 'like', "$key.%")
                 ->OrWhere('phone', 'like', "$key.%")
                ->orWhereHas('country', function ($query) use ($key) {
                    $query->where('name', 'like', "%$key%");
                })
            ->orderBy('created_at', 'DESC')->get();
        return ClientResource::collection($clients);

    }

    public function myProjects(Request $request){
        $validator = Validator::make($request->all(), [
            'email'=>'required|email'
        ]);
        if ($validator->fails()) {
            return response()->json([
                "message" => $validator->errors()
                ],409);
        }
        $client= Client::where('email',$request->email)->first();
        if($client == null ){
            return response()->json([
              'message'=>"Wrong email"
            ],409);
        }
        $projects = $client->projects;
        return ProjectResource::collection($projects);
    }

}

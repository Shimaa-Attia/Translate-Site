<?php

namespace App\Http\Controllers;

use App\Http\Resources\ClientResource;
use App\Models\Client;
use App\Models\Country;
use GuzzleHttp\Promise\Create;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

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
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            "phones" => 'nullable|min:11|regex:/^01[0125][0-9]{8}$/|max:11|unique:clients,phone',
            "email"=>'required|email|unique:clients,email',
            'country_name' => 'required|exists:countries,name'
        ]);
        if ($validator->fails()) {
            return response()->json([
                "message" => $validator->errors(),409]);
        }


        $country = Country::where('name', $request->country_name)->first('id');
        // return $country->id;

        $client = Client::create([
            "name" => $request->name,
            "email" => $request->email,
            "phone" => $request->phone,
            "country_id" => $country->id
        ]);

        return response("added..");

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
            "phones" => 'nullable|min:11|regex:/^01[0125][0-9]{8}$/|max:11|unique:clients,phone',
            "email"=>'required|email|unique:clients,email',
            'country_name' => 'required|exists:countries,id'
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
            "message" => "updated..", "client " => $client
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
            "message" => "Client Archived.."], 200);
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
                "message" => "restored..",
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
            "message" => "deleted.."], 200);
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

}

<?php

namespace App\Http\Controllers;

use App\Http\Resources\previousClientResource;
use Illuminate\Http\Request;
use App\Models\PreviousClients;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class PreviousClientsController extends Controller
{
    public function all()
    {
        $clients = PreviousClients::all();
        return previousClientResource::collection ($clients);
    }

    public function show($id)
    {
        $client = PreviousClients::find($id);
        if ($client == null) {
            return response()->json([
                "message" => "Client not found", 404
            ]);
        }
        return new previousClientResource($client) ;

    }

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            "clientLogo"=>'nullable|image|mimes:png,jpg,jpeg,gif,webp',

        ]);
        if ($validator->fails()) {
            return response()->json([
                "message" => $validator->errors()],409);
        }

        if($request->clientLogo != null){ //check if there is image
            $logo = Storage::putFile("clientsLogo", $request->clientLogo);
            $request->request->add(['logo'=>"".$logo]);
        }

        $client = PreviousClients::create($request->all());

        return response()->json([
            'message'=>"the client has been added"
          ]);

    }

     public function update(Request $request, $id)
      {
          //check
        $client = PreviousClients::find($id);
        if ($client == null) {
            return response()->json([
                "message" => "Client not found"
            ], 404);
        }
        //validation
        $validator = Validator::make($request->all(), [
            'name' => 'nullable|string',
            "clientLogo"=>'nullable|image|mimes:png,jpg,jpeg,gif,webp',
        ]);
        if ($validator->fails()) {
            return response()->json([
                "message" => $validator->errors()
                ],409);
        }
        if($request->clientLogo != null){ //check if there is image
            //delete old image
            // Storage::delete($shortcoming->productImage); ?
            if($client->logo != null){
                 Storage::disk('public')->delete($client->logo);
            }
            //upload new image
            $logo = Storage::putFile("clientsLogo", $request->clientLogo);
            $request->request->add(['logo'=>"".$logo]);
            // return($request->productImage);
        }



        //update
        $client->update($request->all());
        //response
        return response()->json([
            "message" => "Client data has been updated "
        ], 200);


   }


    public function destroy($id)
    {
        $client = PreviousClients::find($id);
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

        $clients = PreviousClients::onlyTrashed()->orderBy('created_at', 'DESC')->get();

        return previousClientResource::collection ($clients);


    }

    public function restore($id)
    {
        $client = PreviousClients::onlyTrashed()->find($id);
        if ($client == null) {
            return response()->json([
                "message" => "not found"
            ], 404);
        }
        $client->restore();
        return response()->json([
                "message" => "Client has been restored ",
                "client" => new previousClientResource($client)
                ]  , 200);
    }

    public function deleteArchive($id)
    {
        $client = PreviousClients::onlyTrashed()->find($id);
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
        $clients = PreviousClients::where('name', 'like', "%$key%")
                    ->get();
        return previousClientResource::collection ($clients);;

    }


}

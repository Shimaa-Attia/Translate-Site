<?php

namespace App\Http\Controllers;

use App\Models\Price;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PriceController extends Controller
{
    public function all()
    {
        $prices = Price::all();

        return $prices;
    }

    public function show($id)
    {
        $price = Price::find($id);
        if ($price == null) {
            return response()->json([
                "message" => "Not found"
            ], 404);
        }
        return $price;

    }

    // public function create(Request $request)
    // {
    //     $validator = Validator::make($request->all(), [
    //         "type"=>'required|string|max:100|unique:prices,type',
    //         'price' => 'required|numeric|gt:0',
    //     ]);
    //     if ($validator->fails()) {
    //         return response()->json([
    //             "message" => $validator->errors()],409);
    //     }

    //     //create
    //     $price = Price::create([
    //         "type" => $request->type,
    //         "price" => $request->price,
    //     ]);

    //     return response()->json([
    //         "message" => "defualt price has been added ",
    //         'price' => $price
    //     ]);

    // }

    public function update(Request $request, $id)
    {

        //check
        $price = Price::find($id);
        if ($price == null) {
            return response()->json([
                "message" => "not found"
            ], 404);
        }
        //validation
        $validator = Validator::make($request->all(), [
            // "type"=>'required|string|max:100|unique:prices,type,'.$price->id,
            'price' => 'numeric|gt:0',
        ]);
        if ($validator->fails()) {
            return response()->json([
                "message" => $validator->errors()],409);
        }

        //update

            $price->update([
                // "type" => $request->type,
                "price" => $request->price

            ]);
            return response()->json([
                "message" => "hte default price for $request->type has been updated",
                'field' => $price
            ]);




    }


    public function destroy($id)
    {
        $price = Price::find($id);
        if ($price == null) {
            return response()->json([
                "message" => "not found"
            ], 404);
        }
        $price->delete();
        return response()->json([
            "message" => "default price for $price->type has been archived"], 200);
    }


    public function archive()
    {

        $prices = Price::onlyTrashed()->get();

        return $prices;

    }

    public function restore($id)
    {
        $price = Price::onlyTrashed()->find($id);
        if ($price == null) {
            return response()->json([
                "message" => "not found in archive"
            ], 404);
        }
        $price->restore();
        return response()->json([
                "message" => "default price for $price->type has been restored",
                "price" => $price]
            , 200);
    }

    public function deleteArchive($id)
    {
        $price = Price::onlyTrashed()->find($id);
        if ($price == null) {
            return response()->json([
                "message" => "not found in archive"
            ], 404);
        }
        $price->forceDelete();
        return response()->json([
            "message" => "default price for $price->type has been deleted"], 200);
    }

    public function search($key)
    {
        return  Price::where('type', 'like', "%$key%")
                ->orWhere('price',$key)
                ->get();

    }
}

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
            'price' => 'required|numeric|gt:0',
        ]);
        if ($validator->fails()) {
            return response()->json([
                "message" => $validator->errors()],409);
        }

        //update

            $price->update([
                "price" => $request->price

            ]);
            return response()->json([
                "message" => "the default price for $price->type has been updated",
                'new_price' => $price
            ]);
    }


    public function search($key)
    {
        return  Price::where('type', 'like', "%$key%")
                ->orWhere('price',$key)
                ->get();

    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ReviewController extends Controller
{
    public function all()
    {
        $review = Review::all();
        return $review;
    }

    public function show($id)
    {
        $review = Review::find($id);
        if ($review == null) {
            return response()->json([
                "message" => "Review not found", 404
            ]);
        }
        return $review;

    }

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'body' => 'required|string',
        ]);
        if ($validator->fails()) {
            return response()->json([
                "message" => $validator->errors()],409);
        }

      Review::create($request->all());

        return response()->json([
            'message'=>"the review has been added"
          ]);

    }

     public function update(Request $request, $id)
      {
          //check
        $review = Review::find($id);
        if ($review == null) {
            return response()->json([
                "message" => "review not found"
            ], 404);
        }
        //validation
        $validator = Validator::make($request->all(), [
            'body' => 'required|string',
        ]);
        if ($validator->fails()) {
            return response()->json([
                "message" => $validator->errors()
                ],409);
        }
        //update
        $review->update($request->all());
        //response
        return response()->json([
            "message" => "Review has been updated "
        ], 200);


   }


    public function destroy($id)
    {
        $review = Review::find($id);
        if ($review == null) {
            return response()->json([
                "message" => "review not found", 404
            ]);
        }
        $review->delete();
        return response()->json([
            "message" => "review has been Archived "], 200);
    }


    public function archive()
    {

        $reviews = Review::onlyTrashed()->orderBy('created_at', 'DESC')->get();

        return response()->json([
            'reviews' => $reviews,
        ]);


    }

    public function restore($id)
    {
        $review = Review::onlyTrashed()->find($id);
        if ($review == null) {
            return response()->json([
                "message" => "not found"
            ], 404);
        }
        $review->restore();
        return response()->json([
                "message" => "review has been restored ",
                "review" => $review
                ]  , 200);
    }

    public function deleteArchive($id)
    {
        $review = Review::onlyTrashed()->find($id);
        if ($review == null) {
            return response()->json([
                "message" => "not found"
            ], 404);
        }
        $review->forceDelete();
        return response()->json([
            "message" => "review has been deleted "], 200);
    }

    public function search($key)
    {
        $reviews = Review::where('body', 'like', "%$key%")
        ->get();
        return $reviews;

    }

}

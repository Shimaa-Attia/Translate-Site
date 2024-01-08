<?php

namespace App\Http\Controllers;

use App\Mail\resetPasswordMail;
use App\Models\User;
use Exception;
use Illuminate\Database\Eloquent\Casts\Json;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class UserController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "name"=>'required|string|max:100',
            "email"=>'required|email|unique:users,email',
            "password"=>'required|min:6|confirmed',

        ]);

        if ($validator->fails()) {
            return response()->json([
                "message" => $validator->errors()
            ], 409);
        }
        // $hashedPassword = bcrypt($request->password);
        $hashedPassword=Hash::make($request->password);
        $user = User::create([
            "name" => $request->name,
            "password" => $hashedPassword,
            "email" => $request->email,
        ]);


        return response()->json([
            "message" => "You have successfully signed up",
            'user' => $user,
        ], 200);

    }

    public function login(Request $request)
    {

        $data = $request->validate([
            "email"=>'required|email',
            "password"=>'required|min:6',
        ]);


        if (!auth()->attempt($request->only('email', 'password'))) {
            return response(['message' => 'credentials not correct, try again..']);
        }


        /** @var \App\Models\User $user * */
        $user = Auth::user();
        $token = $user->createToken('API Token')->accessToken;

        return response()->json([
            "message" => "You are logged in successfully",
            'user' => auth()->user(),
            'token' => $token
        ], 200);

    }

    public function logout()
    {

        if (Auth::guard('api')->check()) {
            /** @var \App\Models\User $user * */
            $user = Auth::guard('api')->user();

            $accessToken = $user->token();

            DB::table('oauth_refresh_tokens')
                ->where('access_token_id', $accessToken->id)
                ->update(['revoked' => true]);
            $accessToken->revoke();

            return Response([
                'message' => 'You are logged out successfully'], 200);
        }
        return Response(['message' => 'Unauthorized'], 401);
    }

    // public function all()
    // {
    //     $users = User::all();
    //     return $users;
    // }

    public function show($id)
    {
        $user = User::find($id);
        if ($user == null) {
            return response()->json([
                "message" => "User not found"
            ], 404);
        }
        return $user;
    }


    public function update(Request $request, $id)
    {
        //check
        $user = User::find($id);
        if ($user == null) {
            return response()->json([
                "message" => "Not Found"
            ], 404);
        }
        //validation
        $validator = Validator::make($request->all(), [
            "name"=>'required|string|max:100',
            "email"=>'required|email|unique:users,email'.$user->id,
            "password"=>'string|min:6',
        ]);
        if ($validator->fails()) {
            return response()->json([
                "message" => $validator->errors()
            ], 409);
        }

        if ($request->has("password")) {
            $password = bcrypt($request->password);
        } else {
            $password = $user->password;
        }
        //update
        $user->update([
            "name" => $request->name,
            "email" => $request->email,
            "password" => $password,
        ]);
        //response
        return response()->json([
            "message" => "Your data has been updated successfully", "new data " => $user
        ], 200);


    }

    public function destroy($id)
    {
        $user = User::find($id);
        if ($user == null) {
            return response()->json([
                "message" => "Not Found"
            ], 404);
        }
        $user->delete();
        return response()->json([
            "message" => "The account has been archived"
        ], 200);
    }


    public function archive()
    {

        $users = User::onlyTrashed()->get();
        return response()->json([
            'users' =>$users,
        ]);
    }

    public function restore($id)
    {
        $user = User::onlyTrashed()->find($id);
        if ($user == null) {
            return response()->json([
                "message" => "Not Found"
            ], 404);
        }
        $user->restore();
        return response()->json([
            "message" => "The account has been activated",
            "user" => $user
        ], 200);
    }

    public function deleteArchive($id)
    {
        $user = User::onlyTrashed()->find($id);
        if ($user == null) {
            return response()->json([
                "message" => "Not Found"
            ], 404);
        }
        $user->forceDelete();
        return response()->json([
            "message" => "The account has been permanently deleted"
        ], 200);
    }

    public function checkAuth(Request $request){

        if (Auth::guard('api')->check()) {

            return response()->json(Auth::guard('api')->user());
        }
            return response('Unauthenticated user', 401);

    }

    public function changePassword(Request $request){
        if (!Auth::guard('api')->check()) {
            return response()->json([
                "message"=>"Unauthenticated user"
              ]);
        }
        $validator = Validator::make($request->all(), [
           "password"=>'required|min:6',
            "new_password"=>'required|min:6|confirmed',

        ]);

        if ($validator->fails()) {
            return response()->json([
                "message" => $validator->errors()
            ], 409);
        }
           $user= Auth::guard('api')->user();
        if (!(Hash::check($request->password,$user->password))) {
            return response(['message' => 'inncorrect old password']);
        }else{
            $user = User::find($user->id);
           $new_hashed_password =Hash::make($request->new_password);
           $user->update([
            'password'=>$new_hashed_password
           ]);
          return response()->json([
            "message"=>"pasword changed.."
          ]);
        }



    }

    public function forgotPassword(Request $request){
      $validator = Validator::make($request->all(),[
         'email'=>'required|email'
      ]);

      if($validator->fails()){
        return response()->json([
          'message'=>$validator->errors()
        ]);
      }
      $user =User::where('email',$request->email)->first();
      if(empty($user)){
        return response()->Json([
            'message'=>'user dosn\'t exist'
        ],404);
      }

        $token = Str::random(length:10);

        DB::table('password_reset_tokens')->insert([
            'email'=>$request->email,
            'token'=>$token
        ]);
        //send email
        Mail::to($request->email)
        ->send( new resetPasswordMail(),["token"=>$token]);

        return response()->json([
            "message"=>"check your email"
        ]);

    }

    public function resetPassword(Request $request){
        $validator = Validator::make($request->all(),[
            // 'token'=>'required',
           'email'=>'required|email',

            'password'=>'required|min:6|confirmed'
         ]);

         if($validator->fails()){
           return response()->json([
             'message'=>$validator->errors()
           ]);
         }
         $user =User::where('email',$request->email)->first();
         if(empty($user)){
           return response()->Json([
               'message'=>'user dosn\'t exist'
           ],404);
         }

        // if(!$passwordResets =DB::table('password_reset_tokens')->where('token',$request->token)->first()){
        //     return response()->json([
        //         'message'=>"invalid token!"
        //     ],400);
        // }

        if(!$passwordResets =DB::table('password_reset_tokens')->where('email',$request->email)->first()){
            return response()->json([
                'message'=>"wrong  email!"
            ],400);
        }
        // $user =User::where('email',$request->email)->first();
        // if(empty($user)){
        //     return response()->Json([
        //         'message'=>'user dosn\'t exist'
        //     ],404);
        // }

        $new_hashed_password =Hash::make($request->password);
        $user->update([
         'password'=>$new_hashed_password
        ]);

        DB::table('password_reset_tokens')->where('email', $request->email)->delete();

       return response()->json([
         "message"=>"pasword reseted, please try to login.."
       ]);
    }
}

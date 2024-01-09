<?php

namespace App\Http\Controllers;

use App\Mail\confirmMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Mail;
use Stevebauman\Location\Facades\Location;

class testController extends Controller
{
    public function ip(Request $request){

        // $user = [

        //     'file' => $request['file'] ,
        //     'ip_address' => $request->ip()
        // ];
        // $ip_address = $request->ip();
        //    return $ip_address;

        // $ip = '162.159.24.227'; /* Static IP address */


        if ($position =  Location::get('ip_address')) {
            // Successfully retrieved position.
            // return $position;
            return response()->json([
                'country'=>$position->countryName,
                'city'=>$position->cityName
            ]);
        }else {
            return false;
        }

    }

    public function mail(){
        Mail::to('hajermuhammad823@gmail.com')
        ->send( new confirmMail());
        return response()->json([
         "message"=>"mail sent!"
        ]);
     }

     public function lang($lang = null){
        App::setLocale($lang);
      return   __('messages.welcom');
     }
}

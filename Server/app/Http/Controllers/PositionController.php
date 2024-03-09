<?php

namespace App\Http\Controllers;

use App\Mail\confirmMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;
use Stevebauman\Location\Facades\Location;

class PositionController extends Controller
{
    public function getCurrencyFromPosition($position ){
        $userPosition = $position->countryCode;
        // Step 1: Fetch country data from REST Countries API
        $countryResponse = file_get_contents('https://restcountries.com/v3.1/all');
        $countryData = json_decode($countryResponse, true);

        // Step 2: Fetch currency data from Open Exchange Rates API
        $currencyResponse = file_get_contents('https://openexchangerates.org/api/currencies.json');
        $currencyData = json_decode($currencyResponse, true);

        // Step 3: Iterate over country data and find corresponding currency code
        $result = [];
        foreach ($countryData as $country) {
            $countryCode = $country['cca2'];
            $countryName = $country['name']['common'];

            // Try to find currency code based on country name
            $currencyCode = null;
            foreach ($currencyData as $code => $currencyName) {
                if (strpos(strtolower($currencyName), strtolower($countryName)) !== false) {
                    $currencyCode = $code;
                    break;
                }
            }

            // Add country and currency code to result array
            $result[] = [
                'country_code' => $countryCode,
                'currency_code' => $currencyCode
            ];
        }

        // Output the result
        // echo json_encode($result, JSON_PRETTY_PRINT);


        foreach ($result as $item){
            if($item['country_code'] == $userPosition){
                return $item['currency_code'];
            }
        }

    }
    public function ipDetails(){

        // $user = [

        //     'file' => $request['file'] ,
        //     'ip_address' => $request->ip()
        // ];
        // $ip_address = $request->ip();
        //    return $ip_address;

        // $ip = '162.159.24.227'; /* Static IP address */

        if ($position =  Location::get('ip_address')) {
            return $position;

        }
    }

    public function changeCurrensy($price){
        $position =PositionController::ipDetails();
        $userCurrency = PositionController::getCurrencyFromPosition($position);
            $response = Http::get("https://openexchangerates.org/api/latest.json?app_id=927d6f64224049ce94fea475bda2f3c4&base=USD&symbols=$userCurrency&prettyprint=false&show_alternative=false" . 'USD');
            $data = $response->json();
            if (isset($data['rates'][$userCurrency])) {
                $exchangeRate = $data['rates'][$userCurrency];
                return $price * $exchangeRate ;
            } else {
                // Handle currency conversion error
                return "error eccoured! can't cahnge currency";
            }

    }

}

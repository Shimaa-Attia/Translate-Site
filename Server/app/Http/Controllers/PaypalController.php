<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
// use Srmklive\PayPal\Facades\PayPal;
use Srmklive\PayPal\Services\ExpressCheckout;
class PaypalController extends Controller
{
    public function payment(){

        $data=[];
        $data['items']=[
            [
                'name'=>'file 2',
                "numOfWords"=>465,
                "field"=>'global',
                "price"=>1200
            ]
        ];

        $data['invoice_id'] = 1;
        $data['invoice_description']="Order #{$data['invoice_id']} Invoice";
        $data['return_url']='http://127.0.0.1:8000/payment/success';
        $data['cancel_url']='http://127.0.0.1:8000/cancel';
        $total = 0;
        foreach($data['items'] as $item) {
            $total += $item['price'];
        }
        $data['total']=$total;

        $provider = new ExpressCheckout();
           $options = [
            'BRANDNAME' => 'translated website',
        ];
        $provider->addOptions($options)->setExpressCheckout($data);
        // $provider = PayPal::setProvider('express_checkout');      // To use express checkout(used by default).
        //check if old project payment
        $response = $provider->setExpressCheckout($data, true);
        // dd($response);
        return redirect($response['paypal_link']);
    }

    public function cancel(){
         //نمسحها من الداتا بيز لو خزنتها  (عملية الدفع يعني)

        return response()->json(
            'payment canceld', 402
        );
    }

    public function success(Request $request){
        $provider = new ExpressCheckout();
        // $data=[];
        // $data['items']=[
        //     [
        //         'name'=>'file 2',
        //         "numOfWords"=>465,
        //         "field"=>'global',
        //         "price"=>1200
        //     ]
        // ];

        // $data['invoice_id'] = 1;
        // $data['invoice_description']="Order #{$data['invoice_id']} Invoice";
        // $data['return_url']='http://127.0.0.1:8000/payment/success';
        // $data['cancel_url']='http://127.0.0.1:8000/cancel';
        // $total = 0;
        // foreach($data['items'] as $item) {
        //     $total += $item['price'];
        // }
        // $data['total']=$total;

        // $provider = new ExpressCheckout();
        //    $options = [
        //     'BRANDNAME' => 'translated website',
        // ];
        // $provider->addOptions($options)->setExpressCheckout($data);
        $response =$provider->getExpressCheckoutDetails($request->token);
        if (in_array(strtoupper($response['ACK']), ['SUCCESS', 'SUCCESSWITHWARNING'])) {
            //نخزن عملية الدفع في الداتا بيز هنا لو عايزين
            // return response()->json('Payment was successfull. The payment success page goes here!');
            // $response = $provider->doExpressCheckoutPayment($data, $request->token, $request->PayerID);
            // return $response;
            $response = $provider->getTransactionDetails($request->token);
            return $response;
        }
        //نمسحها من الداتا بيز لو خزنتها  (عملية الدفع يعني)
        return response()->json(
            'fail payment', 402
        );
    }
}

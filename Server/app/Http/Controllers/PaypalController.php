<?php

namespace App\Http\Controllers;

use App\Mail\confirmMail;
use App\Models\Payment;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Laravel\Prompts\Prompt;
// use Srmklive\PayPal\Facades\PayPal;
use Srmklive\PayPal\Services\ExpressCheckout;
class PaypalController extends Controller
{
    public function payment(Request $request){
        $validator = Validator::make($request->all(), [  //|date_format:Y-m-d H:i A
           "project_id"=>'required|exists:projects,id'
        ]);
        if ($validator->fails()) {
            return response()->json([
                "message" => $validator->errors()
            ], 409);
        }
        $project =Project::where('id',$request->project_id)->first();
        $data=[];
        $data['items']=[
            [
                'name'=>$project->name,
                "numOfWords"=>$project->numOfWords,
                "topic"=>$project->field->name,
                "price"=>$project->priceInClientCurrency,
                "currency"=>$project->clientCurrency
            ]
        ];
        $payment = Payment::create([
            'project_id'=>$project->id,
            'amount'=>$project->price
        ]);
        $data['invoice_id'] = $payment->id;
        $data['invoice_description']="Order #{$data['invoice_id']} Invoice";
        $data['return_url']='http://127.0.0.1:8000/payment/success?invoice_id='.$payment->id;
        $data['cancel_url']="http://127.0.0.1:8000/cancel?invoice_id=$payment->id";
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

    public function cancel(Request $request){
         //نمسحها من الداتا بيز لو خزنتها  (عملية الدفع يعني)
        $payment =Payment::find($request->payment_id);
        $payment->forceDelete();
        return response()->json(
            'payment canceld', 402
        );
    }

    public function success(Request $request){
        $provider = new ExpressCheckout();

        $response =$provider->getExpressCheckoutDetails($request->token);
        // dd($response);
        if (in_array(strtoupper($response['ACK']), ['SUCCESS', 'SUCCESSWITHWARNING'])) {
            //نخزن عملية الدفع في الداتا بيز هنا لو عايزين
            $payment =Payment::find($request->invoice_id);
            $payment->update([
                'token'=>$request->token,
                'PayerID'=>$response['PAYERID'] //$request->PayerID
            ]);
             $email= $payment->project->client->email;
            //  return $email;
            $project =Project::where('id',$payment->project_id)->first();
            $dataArray = [
                'project_name' => $project->name,
                'price' => $project->priceInClientCurrency." ".$project->clientCurrency,
                'files'=>$project->files,
                'numOf_files'=>count($project->files),
                'Delivery_data'=>$project->selectedDeliveryDate,

                // Add more variables as needed
            ];
            Mail::to($email)
            ->send( new confirmMail($dataArray));
            return response()->json([
             "message"=>"Payment was successfull and your project has been received please check your mail!"
            ]);
            // return response()->json('Payment was successfull. The payment success page goes here!');
            // $response = $provider->getTransactionDetails($request->token);
            // return $response;
        }
        //نمسحها من الداتا بيز لو خزنتها  (عملية الدفع يعني)
        $payment =Payment::find($request->invoice_id);
        $payment->forceDelete();
        return response()->json(
            'fail payment', 402
        );
    }
}

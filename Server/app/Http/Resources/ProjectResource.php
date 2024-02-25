<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
       $files= $this->files;
        $customForm=[];
        foreach($files as $file){
         $customForm[]=[
             'id'=>$file->id,
             'name'=>$file->name,
             'file'=>asset('storage')."/". $file->name
           ];
        }
       $is_orderd="no";
       $payments=$this->payments;
       foreach($payments as $payment){
            if($payment->token !=null & $payment->PayerID !=null){
                $is_orderd="yes";
            }
        }
        return [
           'id'=>$this->id,
           'name'=>$this->name,
           'is_orderd'=>$is_orderd,
           'notes'=>$this->notes,
           'created_at'=> $this->created_at->format('Y/m/d h:i A'),
           'field'=>$this->field,
           'client'=>$this->client,
           'country'=>$this->country,
           'numOfWords'=>$this->numOfWords,
           'package'=>$this->package,
           'price'=>$this->price,
           'priceInClientCurrency'=>$this->priceInClientCurrency,
           'clientCurrency'=>$this->clientCurrency,
           'selectedDeliveryDate'=>optional($this->selectedDeliveryDate)->format('Y/m/d h:i A') ,
           'attachments'=> $customForm,
           'status'=>optional($this->status)->name,
           'from_language'=>$this->language,
           'to_languages'=>$this->languages,
           'review'=>$this->review
        ];
    }
}

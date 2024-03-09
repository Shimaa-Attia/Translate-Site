<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReviewResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $path = null;

        if($this->image != null){
           $path = asset('storage')."/". $this->image;
        }
        return[
            'id'=>$this->id,
            "body"=>$this->name,
            "clientName"=>$this->name,
            "clientTitle"=>$this->clientTitle,
            "image"=>$path,
            "created_at"=>$this->created_at->format('Y/m/d h:i A')
        ];
    }
}

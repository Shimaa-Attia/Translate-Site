<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class previousClientResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $path = null;

        if($this->logo != null){
           $path = asset('storage')."/". $this->logo;
        }
        return[
            'id'=>$this->id,
            "name"=>$this->name,
            "logo"=>$path,
            "created_at"=>$this->created_at->format('Y/m/d h:i A')
        ];
    }
}

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
       $files= $this->fiels;
        $customForm=[];
        foreach($files as $file){
         $customForm[]=[
             'id'=>$file->id,
              'name'=>$file->name,
             'file'=>asset('storage')."/". $file->name
         ];
       }
        return [
           'id'=>$this->id,
           'name'=>$this->name,
           'field'=>$this->field,
           'client'=>$this->client,
           'country'=>$this->country,
           'fiels'=> $customForm,
            'to_languages'=>$this->languages
            
        ];
    }
}

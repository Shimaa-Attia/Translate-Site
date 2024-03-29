<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CustomField extends Model
{
    use HasFactory; use SoftDeletes;
    protected $fillable=[
        'type',
        'name'
    ];
    public function projects(){
        return $this->hasMany(Project::class,'status_id','id');
    }

}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Language extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $fillable = [
        'name',
        'code',
        'price'
    ];
    public function projects(){   //many to many 
        return $this->belongsToMany(Project::class);
    }
 
    public function Fprojects(){  //one to many
        return $this->hasMany(Project::class,'from_language','id');
    }
}

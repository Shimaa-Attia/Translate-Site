<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Package extends Model
{
    use HasFactory; use SoftDeletes;
    protected $fillable=[
       'name',
       'increasePercentage',
       'description',
       'word_unite',
       'expected_numOfDays',
       'offer'
    ];

    public function projects(){
        return $this->hasMany(Project::class);
    }
}

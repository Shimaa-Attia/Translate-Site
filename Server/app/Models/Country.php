<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Country extends Model
{
    use SoftDeletes;
    use HasFactory;
    protected $fillable = [
        'name',
        'code',
        'price'
    ];
    public function clients(){
        return $this->hasMany(Client::class);
    }
    public function projects(){
        return $this->hasMany(Project::class);
    }

}

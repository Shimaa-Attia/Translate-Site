<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Client extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $fillable = [
        'name',
        'phone',
        'email',
        'country_id'
    ];
    public function country(){
        return $this->belongsTo(Country::class); // belongs to one country
     }

    public function projects(){
        return $this->hasMany(Project::class);
    }

}

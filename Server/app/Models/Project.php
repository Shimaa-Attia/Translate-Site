<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Project extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $fillable = [
        'name',
        'client_id',
        'country_id',
        'field_id'
    ];

    public function country(){
        return $this->belongsTo(Country::class);
    }
    public function client(){
        return $this->belongsTo(Client::class);
    }
    public function field(){
        return $this->belongsTo(Field::class);
    }

    public function fiels(){
     return  $this->hasMany(File::class);


    }
    public function languages(){
        return $this->belongsToMany(Language::class);
     }
}

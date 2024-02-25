<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Project extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $casts = [
        'selectedDeliveryDate' => 'datetime'
    ];
    protected $fillable = [
        'name',
        'client_id',
        'country_id',
        'field_id',
        'status_id',
        'from_language',
        'numOfWords',
        'price',
        'notes',
        'package_id',
        'selectedDeliveryDate',
        'review',
        'priceInClientCurrency',
        'clientCurrency'
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

    public function files(){
     return  $this->hasMany(File::class);
    }
    public function languages(){
        return $this->belongsToMany(Language::class);
    }

    public function language(){
        return $this->belongsTo(Language::class,'from_language','id');
    }

    public function package(){
        return $this->belongsTo(Package::class);
    }
    public function payments(){
        return $this->hasMany(Payment::class);
    }

    public function status(){
        return $this->belongsTo(CustomField::class,'status_id','id');
    }
}

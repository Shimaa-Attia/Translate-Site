<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class InterpretersRequest extends Model
{
    use HasFactory; use SoftDeletes;
    protected $casts = [
        'selectedDeliveryDate' => 'datetime'
    ];
    protected $fillable = [
       'file',
       'date',
       'from_language',
       'to_language',
       'numOfHours'
    ];

    public function from_language(){
        return $this->belongsTo(Language::class,'from_language','id');
    }

    public function to_language(){
        return $this->belongsTo(Language::class,'to_language','id');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Field extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $fillable = [
        'name',
        'code',
        'price'
    ];

    public function projects(){
        return $this->hasMany(Project::class);
    }
}

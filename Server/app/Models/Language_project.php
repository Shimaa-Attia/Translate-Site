<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Language_project extends Model
{
    protected $table ="language_project";
    use HasFactory;
    public $timestamps = false;
    protected $fillable = [
        'language_id',
        'project_id'
    ];
}

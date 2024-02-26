<?php

namespace Database\Seeders;

use App\Models\CustomField;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CustomFeildSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $array =[
            ['type'=>'homeDescription', 'name'=>"type a description here.."]


        ];

        foreach ($array as $key => $value) {
            CustomField::create($value);
        }
    }
}

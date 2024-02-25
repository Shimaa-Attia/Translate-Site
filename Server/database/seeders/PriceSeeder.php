<?php

namespace Database\Seeders;

use App\Models\Price;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PriceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $array =[
            ['type'=>'countries', 'price'=>50],
            ['type'=>'languages', 'price'=>30],
            ['type'=>'fields', 'price'=>40],
            ['type'=>'250Word', 'price'=>20],


        ];

        foreach ($array as $key => $value) {
            Price::create($value);
        }
    }
}

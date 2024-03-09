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
            ['type'=>'250Word', 'price'=>20],
            ['type'=>'hour', 'price'=>50],
            ['type'=>'dayFaster', 'price'=>5],


        ];

        foreach ($array as $key => $value) {
            Price::create($value);
        }
    }
}

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('interpreters_requests', function (Blueprint $table) {
            $table->id();
            $table->string('file')->nullable();
            $table->string('numOfHours');
            $table->timestamp('date');
            $table->bigInteger('from_language',false,true)->nullable();
            $table->bigInteger('to_language',false,true)->nullable();
            $table->bigInteger('client_id',false,true);
            $table->string('price');
            $table->string('priceInClientCurrency');
            $table->string('clientCurrency');
            $table->string('notes');
            $table->timestamps();
            $table->softDeletes();
            $table->foreign('from_language')->references('id')->on('languages')->onDelete('SET NULL')->onUpdate('CASCADE');
            $table->foreign('to_language')->references('id')->on('languages')->onDelete('SET NULL')->onUpdate('CASCADE');
            $table->foreign('client_id')->references('id')->on('clients')->onDelete('CASCADE')->onUpdate('CASCADE');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('interpreters_requests');
    }
};

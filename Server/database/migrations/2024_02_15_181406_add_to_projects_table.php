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
    {//هحط السعر المتحول  و عملة العميل
        Schema::table('projects', function (Blueprint $table) {
            $table->decimal("priceInClientCurrency", 10, 2)->nullable()->after('price');
            $table->string('clientCurrency')->nullable()->after('priceInClientCurrency');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            //
        });
    }
};

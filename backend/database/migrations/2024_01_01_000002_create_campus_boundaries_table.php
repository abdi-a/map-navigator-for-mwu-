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
        Schema::create('campus_boundaries', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            // Storing as JSON to accommodate either simple BBOX or GeoJSON Polygon
            $table->json('geometry'); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('campus_boundaries');
    }
};

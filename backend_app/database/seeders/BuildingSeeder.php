<?php

namespace Database\Seeders;

use App\Models\Building;
use App\Models\Category;
use Illuminate\Database\Seeder;

class BuildingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Fetch categories
        $adminCat = Category::where('slug', 'admin')->first();
        $libCat = Category::where('slug', 'libraries')->first();
        $cafeCat = Category::where('slug', 'cafes')->first();
        $dormCat = Category::where('slug', 'dorms')->first();

        // Coordinates around MWU (Main Campus, Robe) - Updated real Main Gate
        // Main Gate (Real Location: https://maps.app.goo.gl/j9ntbt9RQ2aMBtiY8 -> 7.142528, 39.996432)
        Building::create([
            'category_id' => $adminCat->id,
            'name' => 'Main Gate',
            'latitude' => 7.142528,
            'longitude' => 39.996432,
            'description' => 'The main entrance to the university campus.',
            'image_url' => 'http://localhost:8000/storage/buildings/main_gate.jfif',
        ]);

        // Admin Building (Real Location from Map)
        Building::create([
            'category_id' => $adminCat->id,
            'name' => 'Admin Building',
            'latitude' => 7.142803,
            'longitude' => 39.997130,
            'description' => 'Office of the President and administrative staff.',
            'image_url' => 'http://localhost:8000/storage/buildings/admin.jfif',
        ]);

        // Main Library (Real Location)
        Building::create([
            'category_id' => $libCat->id,
            'name' => 'Main Library',
            'latitude' => 7.143529,
            'longitude' => 39.999526,
            'description' => '24/7 student library with digital resources.',
            'image_url' => 'http://localhost:8000/storage/buildings/library.jfif',
        ]);

        // Student Cafe (Real Location)
        Building::create([
            'category_id' => $cafeCat->id,
            'name' => 'Student Peace Cafe',
            'latitude' => 7.144170,
            'longitude' => 39.999399,
            'description' => 'Cristian cafe.',
            'image_url' => 'http://localhost:8000/storage/buildings/cafe.jfif',
        ]);

        // Dorm Block A (Real Location)
        Building::create([
            'category_id' => $dormCat->id,
            'name' => 'Block A (Men\'s Dorm)',
            'latitude' => 7.142183,
            'longitude' => 39.999939,
            'description' => 'male student dormitory.',
            'image_url' => 'http://localhost:8000/storage/buildings/dorm_a.jfif',
        ]);

        // Dorm Block B (Real Location)
        Building::create([
            'category_id' => $dormCat->id,
            'name' => 'Block B (Women\'s Dorm)',
            'latitude' => 7.141791,
            'longitude' => 39.998856,
            'description' => 'female student dormitory.',
            'image_url' => 'http://localhost:8000/storage/buildings/dorm_b.jfif',
        ]);
    }
}

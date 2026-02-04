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

        // Coordinates around MWU (Main Campus, Robe)
        // Main Gate (approx)
        Building::create([
            'category_id' => $adminCat->id,
            'name' => 'Main Gate',
            'latitude' => 7.125000,
            'longitude' => 40.000000,
            'description' => 'The main entrance to the university campus.',
            'image_url' => 'http://localhost:8000/storage/buildings/main_gate.jpg',
        ]);

        // Admin Building
        Building::create([
            'category_id' => $adminCat->id,
            'name' => 'Admin Building',
            'latitude' => 7.126500,
            'longitude' => 40.001500,
            'description' => 'Office of the President and administrative staff.',
            'image_url' => 'http://localhost:8000/storage/buildings/admin.jpg',
        ]);

        // Main Library
        Building::create([
            'category_id' => $libCat->id,
            'name' => 'Main Library',
            'latitude' => 7.127000,
            'longitude' => 40.000500,
            'description' => '24/7 student library with digital resources.',
            'image_url' => 'http://localhost:8000/storage/buildings/library.jpg',
        ]);

        // Student Cafe
        Building::create([
            'category_id' => $cafeCat->id,
            'name' => 'Student Peace Cafe',
            'latitude' => 7.125500,
            'longitude' => 40.002000,
            'description' => 'Affordable meals and coffee.',
            'image_url' => 'http://localhost:8000/storage/buildings/cafe.jpg',
        ]);

        // Dorm Block A
        Building::create([
            'category_id' => $dormCat->id,
            'name' => 'Block A (Men\'s Dorm)',
            'latitude' => 7.124500,
            'longitude' => 40.003000,
            'description' => 'First year student dormitory.',
            'image_url' => 'http://localhost:8000/storage/buildings/dorm_a.jpg',
        ]);

        // Dorm Block B
        Building::create([
            'category_id' => $dormCat->id,
            'name' => 'Block B (Women\'s Dorm)',
            'latitude' => 7.124000,
            'longitude' => 40.002800,
            'description' => 'Senior student dormitory.',
            'image_url' => 'http://localhost:8000/storage/buildings/dorm_b.jpg',
        ]);
    }
}

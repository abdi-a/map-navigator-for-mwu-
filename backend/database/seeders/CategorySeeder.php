<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Libraries', 'slug' => 'libraries'],
            ['name' => 'Cafes', 'slug' => 'cafes'],
            ['name' => 'Dorms', 'slug' => 'dorms'],
            ['name' => 'Admin', 'slug' => 'admin'],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}

<?php

namespace Database\Seeders;

use App\Models\CampusBoundary;
use Illuminate\Database\Seeder;

class CampusBoundarySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Define a BBOX for the Campus Lock
        // Approx format: [ [minLat, minLng], [maxLat, maxLng] ] or standard bounds
        // Leaflet normally takes [[lat, lng], [lat, lng]]
        
        $geometry = [
             'type' => 'Polygon',
             'coordinates' => [[
                 [39.995000, 7.120000], 
                 [40.010000, 7.120000], 
                 [40.010000, 7.135000], 
                 [39.995000, 7.135000], 
                 [39.995000, 7.120000]
             ]]
        ];

        // Or just a bbox for simplicity as requested 'bbox (minLat, minLng, maxLat, maxLng)'
        // Let's store maxBounds style: southWest, northEast
        $maxBounds = [
            'southWest' => ['lat' => 7.130000, 'lng' => 39.990000], // Approx SW of Robe Campus area
            'northEast' => ['lat' => 7.160000, 'lng' => 40.020000]  // Approx NE
        ];

        CampusBoundary::create([
            'name' => 'Main Campus',
            'geometry' => $maxBounds,
        ]);
    }
}

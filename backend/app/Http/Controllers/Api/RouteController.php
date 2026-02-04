<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class RouteController extends Controller
{
    public function getRoute(Request $request)
    {
        $request->validate([
            'from' => 'required|string', // format: lat,lng
            'to' => 'required|string',   // format: lat,lng
        ]);

        $from = explode(',', $request->input('from'));
        $to = explode(',', $request->input('to'));

        if (count($from) !== 2 || count($to) !== 2) {
            return response()->json(['error' => 'Invalid coordinates format. Use lat,lng'], 400);
        }

        $lat1 = trim($from[0]);
        $lng1 = trim($from[1]);
        $lat2 = trim($to[0]);
        $lng2 = trim($to[1]);

        // OSRM expects: {lon},{lat};{lon},{lat}
        $coords = "{$lng1},{$lat1};{$lng2},{$lat2}";
        $baseUrl = env('OSRM_BASE_URL', 'http://router.project-osrm.org');
        
        $url = "{$baseUrl}/route/v1/driving/{$coords}?overview=full&geometries=geojson";

        try {
            $response = Http::get($url);
            
            if ($response->failed()) {
                 return response()->json(['error' => 'Failed to fetch route from OSRM'], 502);
            }

            return response()->json($response->json());

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}

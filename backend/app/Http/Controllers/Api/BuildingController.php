<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Building;
use Illuminate\Http\Request;

class BuildingController extends Controller
{
    public function index(Request $request)
    {
        $query = Building::with('category');

        if ($request->has('category')) {
            $slug = $request->input('category');
            $query->whereHas('category', function ($q) use ($slug) {
                $q->where('slug', $slug);
            });
        }

        if ($request->has('q')) {
            $search = $request->input('q');
            $query->where('name', 'like', "%{$search}%");
        }

        return response()->json($query->get());
    }

    public function show($id)
    {
        $building = Building::with('category')->findOrFail($id);
        return response()->json($building);
    }
}

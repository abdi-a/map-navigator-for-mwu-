<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CampusBoundary;
use Illuminate\Http\Request;

class CampusBoundaryController extends Controller
{
    public function index()
    {
        // Return the first defined boundary, or detailed list if we have multiple campuses
        return response()->json(CampusBoundary::first());
    }
}

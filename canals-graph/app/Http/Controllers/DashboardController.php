<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\CanalService;

class DashboardController extends Controller
{

     public function __construct(protected CanalService $canalService) {}

    public function index()
    {
        return Inertia::render('Dashboard', [
            'graphData' => $this->canalService->getGraphData()
        ]);
    }
}

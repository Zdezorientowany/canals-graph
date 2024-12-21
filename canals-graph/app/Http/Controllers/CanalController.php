<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\CanalService;
use Inertia\Inertia;

class CanalController extends Controller
{
    public function __construct(protected CanalService $service) {}

    public function index()
    {
        return Inertia::render('Canals/Index', [
            'canals' => $this->service->index()
        ]);
    }
}

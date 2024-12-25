<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CanalController;
use App\Http\Controllers\DashboardController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Canal routes
    Route::prefix('canals')->group(function () {
        Route::get('/', [CanalController::class, 'index'])
            ->name('canals.index');

        Route::get('/create', [CanalController::class, 'create'])
            ->name('canals.create');

        Route::get('/{canal}/edit', [CanalController::class, 'edit'])
            ->name('canals.edit');

        Route::get('/{canal}', [CanalController::class, 'show'])
            ->name('canals.show');

        Route::post('/', [CanalController::class, 'store'])
            ->name('canals.store');


        Route::put('/{canal}', [CanalController::class, 'update'])
            ->name('canals.update');

        Route::delete('/{canal}', [CanalController::class, 'destroy'])
            ->name('canals.destroy');
    });
});

require __DIR__.'/auth.php';

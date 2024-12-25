<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\CanalService;
use Inertia\Inertia;
use App\Models\Canal;
use App\Http\Resources\CanalResource;

class CanalController extends Controller
{
    public function __construct(protected CanalService $service) {}

    /**
     * Display a listing of the resource.
     *
     * @return \Inertia\Response
     */
    public function index(): \Inertia\Response
    {
        return Inertia::render('Canals/Index', [
            'canals' => $this->service->index()
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param Canal $canal
     * @return \Inertia\Response
     */
    public function show(Canal $canal): \Inertia\Response
    {
        return Inertia::render('Canals/Show', [
            'canal' => $this->service->show($canal)
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request): \Illuminate\Http\RedirectResponse
    {
        $input = $request->validate(CanalResource::rules());

        $result = $this->service->store($input);

        return redirect()->route('canals.show', $result->id);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @param Canal $canal
     * @return \Inertia\Response
     */
    public function create(): \Inertia\Response
    {
        return Inertia::render('Canals/Create');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Canal $canal
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Canal $canal, Request $request): \Illuminate\Http\RedirectResponse
    {
        $input = $request->validate(CanalResource::rules());

        $result = $this->service->update($canal, $input);

        return redirect()->route('canals.show', $result->id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Canal $canal
     * @return \Inertia\Response
     */
    public function edit(Canal $canal): \Inertia\Response
    {
        return Inertia::render('Canals/Edit', [
            'canal' => $this->service->show($canal)
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Canal $canal
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Canal $canal): \Illuminate\Http\RedirectResponse
    {
        $this->service->destroy($canal);

        return redirect()->route('canals.index');
    }
}

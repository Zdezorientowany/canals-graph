<?php

namespace App\Services;

use App\Models\Canal;
use Illuminate\Database\Eloquent\Collection;

class CanalService
{
    public function __construct(protected Canal $model) {}

    public function index(): Collection
    {
        // Nice to add here: Pagination, Filters, Sorting
        return $this->model->all();
    }

    public function show(Canal $canal): Canal
    {
        return $this->model->find($canal->id);
    }

    public function store(array $data): Canal
    {
        return $this->model->create($data);
    }

    public function update(Canal $canal, array $data): Canal
    {
        $canal->update($data);

        return $canal;
    }

    public function destroy(Canal $canal): void
    {
        $canal->delete();
    }

    public function getGraphData()
    {
        $canals = Canal::all();

        // Calculate total number of clients
        $totalClients = $canals->sum('clients');

        // Add percentage to each canal
        $canalsWithPercentage = $canals->map(function ($canal) use ($totalClients) {
            $canal->percentage = $totalClients > 0
                ? round(($canal->clients / $totalClients) * 100, 2)
                : 0;
            return $canal;
        });

        return $canalsWithPercentage;
    }
}

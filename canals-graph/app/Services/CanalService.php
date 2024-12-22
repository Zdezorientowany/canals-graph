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
}

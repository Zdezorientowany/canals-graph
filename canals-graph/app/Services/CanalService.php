<?php

namespace App\Services;

use App\Models\Canal;

class CanalService
{
    public function __construct(protected Canal $model) {}

    public function index()
    {
        return $this->model->all();
    }
}

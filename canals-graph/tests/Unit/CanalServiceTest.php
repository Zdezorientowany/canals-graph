<?php

use App\Models\Canal;
use App\Services\CanalService;

describe('Tests for CanalService', function () {
    it('returns all canals', function () {
        Canal::factory()->count(10)->create();

        $service = new CanalService(new Canal());
        $canals = $service->index();

        $amountOfCanals = Canal::count();
        expect($canals)->toHaveCount($amountOfCanals);
    });
});

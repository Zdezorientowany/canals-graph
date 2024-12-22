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

    it('returns a single canal', function () {
        $canal = Canal::factory()->create();

        $service = new CanalService(new Canal());
        $result = $service->show($canal);

        expect($result->id)->toBe($canal->id);
    });

    it('creates a new canal', function () {
        $canalData = [
            'name' => 'Test Canal',
            'clients' => 100,
        ];

        $service = new CanalService(new Canal());
        $result = $service->store($canalData);

        expect($result->name)->toBe($canalData['name']);
        expect($result->clients)->toBe($canalData['clients']);
    });

    it('updates a canal', function () {
        $canal = Canal::factory()->create();

        $canalData = [
            'name' => 'Updated Canal',
            'clients' => 200,
        ];

        $service = new CanalService(new Canal());
        $result = $service->update($canal, $canalData);

        expect($result->name)->toBe($canalData['name']);
        expect($result->clients)->toBe($canalData['clients']);
    });

    it('deletes a canal', function () {
        $canal = Canal::factory()->create();

        $service = new CanalService(new Canal());
        $service->destroy($canal);

        expect(Canal::find($canal->id))->toBeNull();
    });
});

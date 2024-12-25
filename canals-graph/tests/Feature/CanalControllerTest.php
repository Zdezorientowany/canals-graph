<?php

namespace Tests\Feature;

use App\Models\Canal;
use App\Models\User;

describe('Tests for CanalController', function () {

    // Positive cases
    it('should return a list of canals', function (User $user) {
        $canal = Canal::factory(10)->create();

        $response = $this
            ->actingAs($user)
            ->get(route('canals.index'));

        $response->assertOk();

        $data = $response['page']['props']['canals'];

        $amountOfCanals = Canal::count();
        expect($data)->toHaveCount($amountOfCanals);
    })->with('AuthUser');

    it('should return a single canal', function (User $user) {
        $canal = Canal::factory()->create();

        $response = $this
            ->actingAs($user)
            ->get(route('canals.show', $canal->id));

        $response->assertOk();

        $data = $response['page']['props']['canal'];

        expect($data['id'])->toBe($canal->id);
    })->with('AuthUser');

    it('should create a new canal', function (User $user) {
        $canalData = [
            'name' => 'Test Canal',
            'clients' => 100,
        ];

        $response = $this
            ->actingAs($user)
            ->post(route('canals.store'), $canalData);

        $response->assertRedirect();

        expect(Canal::where('name', $canalData['name'])->exists())->toBeTrue();
    })->with('AuthUser');

    it('should update a canal', function (User $user) {
        $canal = Canal::factory()->create();

        $canalData = [
            'name' => 'Updated Canal',
            'clients' => 200,
        ];

        $response = $this
            ->actingAs($user)
            ->put(route('canals.update', $canal->id), $canalData);

        $response->assertRedirect();

        $canal->refresh();

        expect($canal->name)->toBe($canalData['name']);
        expect($canal->clients)->toBe($canalData['clients']);
    })->with('AuthUser');

    it('should delete a canal', function (User $user) {
        $canal = Canal::factory()->create();

        $response = $this
            ->actingAs($user)
            ->delete(route('canals.destroy', $canal->id));

        $response->assertRedirect();

        expect(Canal::where('id', $canal->id)->exists())->toBeFalse();
    })->with('AuthUser');

    // Negative cases

    //TODO
});

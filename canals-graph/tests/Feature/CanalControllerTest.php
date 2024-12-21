<?php

namespace Tests\Feature;

use App\Models\Canal;
use App\Models\User;

describe('Tests for CanalController', function () {
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
});

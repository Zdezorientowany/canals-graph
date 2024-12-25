<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Great for testing
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'asd@asd.asd',
            'password' => 'asd',
        ]);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Canal extends Model
{
    /** @use HasFactory<\Database\Factories\CanalFactory> */
    use HasFactory;

    protected $fillable = [
        // name of canal
        'name',
        // amount of clients
        'clients',
    ];
}

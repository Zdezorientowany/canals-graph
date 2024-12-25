<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CanalResource extends JsonResource
{
    public static function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'clients' => 'required|integer|min:0',
        ];
    }

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'clients' => $this->clients,
        ];
    }
}

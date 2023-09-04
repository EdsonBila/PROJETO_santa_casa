<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Medico;

class MedicoFactory extends Factory
{
    protected $model = Medico::class;

    public function definition(): array
    {
        return [
            'nome' => fake()->name(),
            'CRM' => 'CRM/SP ' . str_pad(fake()->unique()->numberBetween(1, 999999), 6, '0', STR_PAD_LEFT),
            'telefone' => fake()->unique()->phoneNumber(),
            'email' => fake()->unique()->email(),
        ];
    }
}

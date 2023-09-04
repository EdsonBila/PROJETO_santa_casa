<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Especialidade;

class EspecialidadeFactory extends Factory
{
    protected $model = Especialidade::class;

    public function definition(): array
    {
        return [
            'nome' => fake()->name(),
            'descricao' => fake()->text(45)
        ];
    }
}

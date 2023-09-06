<?php

namespace App\Http\Controllers;

use App\Models\Medico;
use App\Models\Especialidade;
use Illuminate\Support\Facades\Log;

class HomeController extends Controller
{
    public function index()
    {
        $quantidadeMedicos = str_pad(Medico::count(), 2, '0', STR_PAD_LEFT);
        $quantidadeEspecialidades = str_pad(Especialidade::count(), 2, '0', STR_PAD_LEFT);

        return view('home.home', compact('quantidadeMedicos', 'quantidadeEspecialidades'));
    }

    public function doctorsBySpecialtyChart()
    {
        try {
            $especialidades = Especialidade::all();
            $categories = $especialidades->pluck('nome');
            $medicosPorEspecialidade = $especialidades->pluck('medicos')->map->count();
            return response()->json([
                'categories' => $categories,
                'medicosPorEspecialidade' => $medicosPorEspecialidade,
            ]);
        } catch (\Exception $e) {
            Log::error('Ocorreu um erro ao obter os dados do gráfico (Ocorreu um erro): ' . $e->getMessage(), [
                'action' => 'doctorsBySpecialtyChart - HomeController',
                'exception' => $e
            ]);
            return response()->json([], 500);
        }
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Medico;
use App\Models\Especialidade;

class HomeController extends Controller
{
    public function index()
    {
        $quantidadeMedicos = str_pad(Medico::count(), 2, '0', STR_PAD_LEFT);
        $quantidadeEspecialidades = str_pad(Especialidade::count(), 2, '0', STR_PAD_LEFT);

        return view('home.home', compact('quantidadeMedicos', 'quantidadeEspecialidades'));
    }
}

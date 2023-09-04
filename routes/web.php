<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\EspecialidadeController;
use App\Http\Controllers\MedicoController;

Route::get('/', [HomeController::class,'index'])->name('home');
Route::get('/relatorio', [RelatorioController::class,'index'])->name('relatorio');

Route::resources([
    'especialidade' => EspecialidadeController::class,
    'medico' => MedicoController::class,
]);

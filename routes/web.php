<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\EspecialidadeController;
use App\Http\Controllers\MedicoController;
use App\Http\Controllers\RelatorioController;

Route::get('/', [HomeController::class, 'index'])->name('home.index');
Route::get('/home/grafico/medicosPorEspecialidade', [HomeController::class, 'doctorsBySpecialtyChart']);

Route::get('/relatorio', [RelatorioController::class, 'index'])->name('relatorio.index');
Route::get('/relatorio/{medicoId}/listaEspecialidadesSelecionadas', [RelatorioController::class, 'listSpecialtySelected']);


Route::get('/especialidade', [EspecialidadeController::class, 'index'])->name('especialidade.index');
Route::post('/especialidade/registro', [EspecialidadeController::class, 'register']);
Route::put('/especialidade/{especialidadeId}/editar', [EspecialidadeController::class, 'update']);
Route::get('/especialidade/{especialidadeId}/visualizar', [EspecialidadeController::class, 'view']);
Route::delete('/especialidade/{especialidadeId}/excluir', [EspecialidadeController::class, 'delete']);
Route::get('/especialidade/{especialidadeId}/listaMedicosSelecionados', [EspecialidadeController::class, 'listDoctorsSelected']);
Route::get('/especialidade/{especialidadeId}/listaMedicosNaoSelecionados', [EspecialidadeController::class, 'listDoctorsNotRelated']);
Route::delete('/especialidade/{medicoId}/{especialidadeId}/desvincularMedico', [EspecialidadeController::class, 'unbindDoctor']);
Route::post('/especialidade/{especialidadeId}/vincularMedico', [EspecialidadeController::class, 'linkDoctors']);
Route::get('/especialidade/lista', [EspecialidadeController::class, 'list']);




Route::get('/medico', [MedicoController::class, 'index'])->name('medico.index');
Route::get('/medico/{medicoId}/visualizar', [MedicoController::class, 'view']);
Route::get('/medico/{medicoId}/listaEspecialidadesSelecionadasDatatable', [MedicoController::class, 'listSpecialtySelectedDatatable']);
Route::get('/medico/{medicoId}/listaEspecialidadesSelecionadas', [MedicoController::class, 'listSpecialtySelected']);
Route::get('/medico/{medicoId}/listaEspecialidadesNaoSelecionadas', [MedicoController::class, 'listSpecialtyNotRelated']);
Route::post('/medico/{medicoId}/vincularEspecialidades', [MedicoController::class, 'linkSpecialty']);
Route::post('/medico/registro', [MedicoController::class, 'register']);
Route::put('/medico/{medicoId}/editar', [MedicoController::class, 'update']);
Route::delete('/medico/{medicoId}/excluir', [MedicoController::class, 'delete']);
Route::delete('/medico/{medicoId}/{especialidadeId}/desvincularEspecialidades', [MedicoController::class, 'unbindSpecialty']);
Route::get('/medico/lista', [MedicoController::class, 'list']);


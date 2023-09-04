<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\EspecialidadeController;
use App\Http\Controllers\MedicoController;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/relatorio', [RelatorioController::class, 'index'])->name('relatorio');


Route::get('/especialidade', [EspecialidadeController::class, 'index'])->name('especialidade.index');
Route::post('/especialidade', [EspecialidadeController::class, 'register']);
Route::put('/especialidade/{especialidadeId}', [EspecialidadeController::class, 'update']);
Route::delete('/especialidade/{especialidadeId}', [EspecialidadeController::class, 'delete']);
Route::get('/especialidade/medico/{especialidadeId}', [EspecialidadeController::class, 'listDoctorsSelected']);
Route::get('/especialidade/medico/select/{especialidadeId}', [EspecialidadeController::class, 'listDoctorsNotRelated']);
Route::delete('/especialidade/medico/{medicoId}/{especialidadeId}', [EspecialidadeController::class, 'unbindDoctor']);
Route::post('/especialidade/medico/{especialidadeId}', [EspecialidadeController::class, 'linkDoctors']);





Route::get('/medico', [MedicoController::class, 'index'])->name('medico.index');
Route::post('/medico', [MedicoController::class, 'register']);
Route::put('/medico/{medicoId}', [MedicoController::class, 'update']);
Route::delete('/medico/{medicoId}', [MedicoController::class, 'delete']);
Route::get('/medico/especialidade/{medicoId}', [MedicoController::class, 'listSpecialtySelected']);
Route::get('/medico/especialidade/select/{medicoId}', [MedicoController::class, 'listSpecialtyNotRelated']);
Route::delete('/medico/especialidade/{medicoId}/{especialidadeId}', [MedicoController::class, 'unbindSpecialty']);
Route::post('/medico/especialidade/{medicoId}', [MedicoController::class, 'linkSpecialty']);



Route::get('/medico/lista', [MedicoController::class, 'list']);
Route::get('/especialidade/lista', [EspecialidadeController::class, 'list']);


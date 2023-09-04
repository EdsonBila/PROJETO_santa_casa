<?php

namespace App\Http\Controllers;

use App\Http\Requests\EspecialidadeRequest;
use App\Models\Especialidade;
use App\Models\Medico;
use Illuminate\Http\Request;
use Illuminate\Database\QueryException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Log;
use DataTables;

class MedicoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function list()
    {
        try {
            $dados = Medico::select('id', 'nome')->get();
            return response()->json($dados);
        } catch (QueryException $e) {
            Log::error('Erro ao listar médicos (Erro no banco de dados): ' . $e->getMessage(), [
                'action' => 'lista - Médicos',
                'exception' => $e
            ]);
            return response()->json([], 500);
        } catch (\Exception $e) {
            Log::error('Erro ao listar médicos (Ocorreu um erro): ' . $e->getMessage(), [
                'action' => 'lista - Médicos',
                'exception' => $e
            ]);
            return response()->json([], 500);
        }
    }
}

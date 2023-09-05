<?php

namespace App\Http\Controllers;

use App\Models\Especialidade;
use App\Models\Medico;
use Illuminate\Http\Request;
use Illuminate\Database\QueryException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Log;
use DataTables;

class RelatorioController extends Controller
{
    public function index(Request $request)
    {
        if ($request->ajax()) {
            $filtroCRM = $request->input('filtroCRM', []);
            try {
                $query = Medico::select('id', 'nome', 'CRM', 'telefone', 'email', 'dt_cadastro');
                if (is_array($filtroCRM) && count($filtroCRM) > 0) {
                    $query->whereIn('CRM', $filtroCRM);
                }
                $data = $query->get();
                return DataTables::of($data)->addColumn('acao', function ($data) {
                    return "<div class='container-buttons-datatable'><button type='button' class='button-custom button-action' id='button-open-vinculo'>VÍNCULOS</button></div>";
                })->rawColumns(['acao'])->make(true);
            } catch (ModelNotFoundException $e) {
                Log::error('Erro ao obter medicos (Registro não encontrado): ' . $e->getMessage(), [
                    'action' => 'listSpecialtySelected - MedicoController',
                    'request_data' => $request,
                    'exception' => $e
                ]);
                return response()->json([], 404);
            } catch (QueryException $e) {
                Log::error('Erro ao obter medicos (Erro no banco de dados): ' . $e->getMessage(), [
                    'action' => 'listSpecialtySelected - MedicoController',
                    'request_data' => $request,
                    'exception' => $e
                ]);
                return response()->json([], 500);
            } catch (\Exception $e) {
                Log::error('Erro ao obter medico (Ocorreu um erro): ' . $e->getMessage(), [
                    'action' => 'listSpecialtySelected - MedicoController',
                    'request_data' => $request,
                    'exception' => $e
                ]);
                return response()->json([], 500);
            }
        }

        return view('relatorio.relatorio');
    }

    public function listSpecialtySelected(Request $request, string $medicoId)
    {
        if ($request->ajax()) {
            $filtroCodigo = $request->input('filtroCodigo', []);
            try {
                $medico = Medico::findOrFail($medicoId);
                $query = $medico->especialidades()->select('id', 'nome', 'descricao');
                if (is_array($filtroCodigo) && count($filtroCodigo) > 0) {
                    $query->whereIn('id', $filtroCodigo);
                }
                $especialidades = $query->get();
                return DataTables::of($especialidades)->make(true);
            } catch (ModelNotFoundException $e) {
                Log::error('Erro ao obter especialidade por medico (Registro não encontrado): ' . $e->getMessage(), [
                    'action' => 'listSpecialtySelected - MedicoController',
                    'request_data' => "id: $medicoId",
                    'exception' => $e
                ]);
                return response()->json([], 404);
            } catch (QueryException $e) {
                Log::error('Erro ao obter especialidade por medico (Erro no banco de dados): ' . $e->getMessage(), [
                    'action' => 'listSpecialtySelected - MedicoController',
                    'request_data' => "id: $medicoId",
                    'exception' => $e
                ]);
                return response()->json([], 500);
            } catch (\Exception $e) {
                Log::error('Erro ao obter especialidade por medico (Ocorreu um erro): ' . $e->getMessage(), [
                    'action' => 'listSpecialtySelected - MedicoController',
                    'request_data' => "id: $medicoId",
                    'exception' => $e
                ]);
                return response()->json([], 500);
            }
        }
        return response()->json([], 404);
    }
}

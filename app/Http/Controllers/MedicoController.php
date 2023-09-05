<?php

namespace App\Http\Controllers;

use App\Http\Requests\MedicoRequest;
use App\Models\Especialidade;
use App\Models\Medico;
use Illuminate\Http\Request;
use Illuminate\Database\QueryException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Log;
use DataTables;

class MedicoController extends Controller
{
    public function index(Request $request)
    {
        if ($request->ajax()) {
            try {
                $data = Medico::select('id', 'nome', 'CRM', 'telefone', 'email', 'dt_cadastro')->get();
                return DataTables::of($data)->addColumn('acao', function ($data) {
                    return "<div class='container-buttons-datatable'><button type='button' data-id='{$data->id}' class='button-custom button-action' id='button-edit-register'>EDITAR</button><button type='button' data-id='{$data->id}' class='button-custom button-action' id='button-delete-register'>EXCLUIR</button><button type='button' class='button-custom button-action' id='button-open-vinculo'>VÍNCULOS</button></div>";
                })->rawColumns(['acao'])->make(true);
            } catch (ModelNotFoundException $e) {
                Log::error('Erro ao obter medicos (Registro não encontrado): ' . $e->getMessage(), [
                    'action' => 'index - MedicoController',
                    'request_data' => $request,
                    'exception' => $e
                ]);
                return response()->json([], 404);
            } catch (QueryException $e) {
                Log::error('Erro ao obter medicos (Erro no banco de dados): ' . $e->getMessage(), [
                    'action' => 'index - MedicoController',
                    'request_data' => $request,
                    'exception' => $e
                ]);
                return response()->json([], 500);
            } catch (\Exception $e) {
                Log::error('Erro ao obter medicos (Ocorreu um erro): ' . $e->getMessage(), [
                    'action' => 'index - MedicoController',
                    'request_data' => $request,
                    'exception' => $e
                ]);
                return response()->json([], 500);
            }
        }

        return view('medicos.medicos');
    }

    public function register(MedicoRequest $request)
    {
        try {
            $data = $request->validated();
            $medico = Medico::create([
                'nome' => $data['nome'],
                'CRM' => $data['CRM'],
                'telefone' => $data['telefone'],
                'email' => $data['email'],
            ]);
            $especialidadesIds = $data['especialidades'];
            $medico->especialidades()->attach($especialidadesIds);
            return response()->json([], 201);
        } catch (QueryException $e) {
            Log::error('Erro ao cadastrar medico (Erro no banco de dados): ' . $e->getMessage(), [
                'action' => 'register - MedicoController',
                'request_data' => $data,
                'exception' => $e
            ]);
            return response()->json([], 500);
        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error('Erro ao cadastrar medico (Erro de validação): ' . $e->getMessage(), [
                'action' => 'register - MedicoController',
                'request_data' => $data,
                'exception' => $e
            ]);
            return response()->json([], 422);
        } catch (\Exception $e) {
            Log::error('Erro ao cadastrar medico (Ocorreu um erro): ' . $e->getMessage(), [
                'action' => 'register - MedicoController',
                'request_data' => $data,
                'exception' => $e
            ]);
            return response()->json([], 500);
        }
    }

    public function view(string $medicoId)
    {
        try {
            $medico = Medico::findOrFail($medicoId);
            return response()->json($medico);
        } catch (ModelNotFoundException $e) {
            Log::error('Erro ao buscar medico (Registro não encontrado): ' . $e->getMessage(), [
                'action' => 'view - MedicoController',
                'request_data' => $medicoId,
                'exception' => $e
            ]);
            return response()->json([], 404);
        } catch (QueryException $e) {
            Log::error('Erro ao buscar medico (Erro no banco de dados): ' . $e->getMessage(), [
                'action' => 'view - MedicoController',
                'request_data' => $medicoId,
                'exception' => $e
            ]);
            return response()->json([], 500);
        } catch (\Exception $e) {
            Log::error('Erro ao buscar medico (Ocorreu um erro): ' . $e->getMessage(), [
                'action' => 'view - MedicoController',
                'request_data' => $medicoId,
                'exception' => $e
            ]);
            return response()->json([], 500);
        }
    }

    public function update(MedicoRequest $request, string $medicoId)
    {
        try {
            $data = $request->validated();
            $medico = Medico::findOrFail($medicoId);
            $medico->update(['nome' => $data['nome'], 'CRM' => $data['CRM'], 'telefone' => $data['telefone']]);
            return response()->json([], 204);
        } catch (ModelNotFoundException $e) {
            Log::error('Erro ao editar medico (Registro não encontrado): ' . $e->getMessage(), [
                'action' => 'update - MedicoController',
                'request_data' => $data,
                'exception' => $e
            ]);
            return response()->json([], 404);
        } catch (QueryException $e) {
            Log::error('Erro ao editar medico (Erro no banco de dados): ' . $e->getMessage(), [
                'action' => 'update - MedicoController',
                'request_data' => $data,
                'exception' => $e
            ]);
            return response()->json([], 500);
        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error('Erro ao editar medico (Erro de validação): ' . $e->getMessage(), [
                'action' => 'update - MedicoController',
                'request_data' => $data,
                'exception' => $e
            ]);
            return response()->json([], 422);
        } catch (\Exception $e) {
            Log::error('Erro ao editar medico (Ocorreu um erro): ' . $e->getMessage(), [
                'action' => 'update - MedicoController',
                'request_data' => $data,
                'exception' => $e
            ]);
            return response()->json([], 500);
        }
    }

    public function delete(string $medicoId)
    {
        try {
            $medico = Medico::findOrFail($medicoId);
            $medico->delete();
            return response()->json([], 204);
        } catch (ModelNotFoundException $e) {
            Log::error('Erro ao excluir medico (Registro não encontrado): ' . $e->getMessage(), [
                'action' => 'delete - MedicoController',
                'request_data' => "id: $medicoId",
                'exception' => $e
            ]);
            return response()->json([], 404);
        } catch (QueryException $e) {
            Log::error('Erro ao excluir medico (Erro no banco de dados): ' . $e->getMessage(), [
                'action' => 'delete - MedicoController',
                'request_data' => "id: $medicoId",
                'exception' => $e
            ]);
            return response()->json([], 500);
        } catch (\Exception $e) {
            Log::error('Erro ao excluir medico (Ocorreu um erro): ' . $e->getMessage(), [
                'action' => 'delete - MedicoController',
                'request_data' => "id: $medicoId",
                'exception' => $e
            ]);
            return response()->json([], 500);
        }
    }

    public function listSpecialtySelectedDatatable(Request $request, string $medicoId)
    {
        if ($request->ajax()) {
            try {
                $medico = Medico::findOrFail($medicoId);
                $especialidades = $medico->especialidades()->select('id', 'nome', 'descricao')->get();
                return DataTables::of($especialidades)->addColumn('acao', function ($especialidades) use ($medicoId) {
                    return "<div class='container-buttons-datatable'><button type='button' data-id_medico='{$medicoId}' data-id_especialidade='{$especialidades->id}' class='button-custom button-action' id='button-delete-specialty'>DESVINCULAR</button></div>";
                })->rawColumns(['acao'])->make(true);
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

    public function listSpecialtySelected(string $medicoId)
    {
        try {
            $medico = Medico::findOrFail($medicoId);
            $especialidades = $medico->especialidades()->select('id', 'nome', 'descricao')->get();
            return response()->json($especialidades);
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

    public function listSpecialtyNotRelated(string $medicoId)
    {
        try {
            $especialidadeNaoRelacionados = Especialidade::whereDoesntHave('medicos', function ($query) use ($medicoId) {
                $query->where('medico_id', $medicoId);
            })->select('id', 'nome')->get();
            return response()->json($especialidadeNaoRelacionados);
        } catch (QueryException $e) {
            Log::error('Erro ao obter especialidade não relacionados à medicos (Erro no banco de dados): ' . $e->getMessage(), [
                'action' => 'listSpecialtyNotRelated - MedicoController',
                'request_data' => "id: $medicoId",
                'exception' => $e
            ]);
            return response()->json([], 500);
        } catch (\Exception $e) {
            Log::error('Erro ao obter especialidade não relacionados à medicos (Ocorreu um erro): ' . $e->getMessage(), [
                'action' => 'listSpecialtyNotRelated - MedicoController',
                'request_data' => "id: $medicoId",
                'exception' => $e
            ]);
            return response()->json([], 500);
        }
    }

    public function unbindSpecialty(String $medicoId, string $especialidadeId)
    {
        try {
            $especialidade = Especialidade::findOrFail($especialidadeId);
            $medico = Medico::findOrFail($medicoId);
            $especialidade->medicos()->detach($medico);
            return response()->json([], 204);
        } catch (ModelNotFoundException $e) {
            Log::error('Erro ao desvincular especialidade (Registro não encontrado): ' . $e->getMessage(), [
                'action' => 'unbindSpecialty - MedicoController',
                'request_data' => "id-especialidade: $especialidadeId, id-medico: $medicoId",
                'exception' => $e
            ]);
            return response()->json([], 404);
        } catch (QueryException $e) {
            Log::error('Erro ao desvincular especialidade (Erro no banco de dados): ' . $e->getMessage(), [
                'action' => 'unbindSpecialty - MedicoController',
                'request_data' => "id-especialidade: $especialidadeId, id-medico: $medicoId",
                'exception' => $e
            ]);
            return response()->json([], 500);
        } catch (\Exception $e) {
            Log::error('Erro ao desvincular especialidade (Ocorreu um erro): ' . $e->getMessage(), [
                'action' => 'unbindSpecialty - MedicoController',
                'request_data' => "id-especialidade: $especialidadeId, id-medico: $medicoId",
                'exception' => $e
            ]);
            return response()->json([], 500);
        }
    }

    public function linkSpecialty(Request $request, string $medicoId)
    {
        try {
            $medico = Medico::findOrFail($medicoId);
            $especialidadesIds =  $request->input('especialidades', []);
            $medico->especialidades()->attach($especialidadesIds);
            return response()->json([], 201);
        } catch (ModelNotFoundException $e) {
            Log::error('Erro ao vincular especialidade (Registro não encontrado): ' . $e->getMessage(), [
                'action' => 'linkSpecialty - MedicoController',
                'request_data' => "id-especialidade: $medicoId, id-medico: $especialidadesIds",
                'exception' => $e
            ]);
            return response()->json([], 404);
        } catch (QueryException $e) {
            Log::error('Erro ao vincular especialidade (Erro no banco de dados): ' . $e->getMessage(), [
                'action' => 'linkSpecialty - MedicoController',
                'request_data' => "id-especialidade: $medicoId, id-medico: $especialidadesIds",
                'exception' => $e
            ]);
            return response()->json([], 500);
        } catch (\Exception $e) {
            Log::error('Erro ao vincular especialidade (Ocorreu um erro): ' . $e->getMessage(), [
                'action' => 'linkSpecialty - MedicoController',
                'request_data' => "id-especialidade: $medicoId, id-medico: $especialidadesIds",
                'exception' => $e
            ]);
            return response()->json([], 500);
        }
    }

    public function list()
    {
        try {
            $dados = Medico::select('id', 'nome', 'CRM', 'telefone', 'email')->get();
            return response()->json($dados);
        } catch (QueryException $e) {
            Log::error('Erro ao listar médicos (Erro no banco de dados): ' . $e->getMessage(), [
                'action' => 'list - MedicoController',
                'exception' => $e
            ]);
            return response()->json([], 500);
        } catch (\Exception $e) {
            Log::error('Erro ao listar médicos (Ocorreu um erro): ' . $e->getMessage(), [
                'action' => 'list - MedicoController',
                'exception' => $e
            ]);
            return response()->json([], 500);
        }
    }
}

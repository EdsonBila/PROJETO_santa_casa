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

class EspecialidadeController extends Controller
{

    public function index(Request $request)
    {
        if ($request->ajax()) {
            try {
                $data = Especialidade::select('id', 'nome', 'descricao')->get();
                return DataTables::of($data)->addColumn('acao', function ($data) {
                    return "<div class='container-buttons-datatable'><button type='button' data-id='{$data->id}' class='button-custom button-action' id='button-edit-register'>EDITAR</button><button type='button' data-id='{$data->id}' class='button-custom button-action' id='button-delete-register'>EXCLUIR</button><button type='button' class='button-custom button-action' id='button-open-vinculo'>VÍNCULOS</button></div>";
                })->rawColumns(['acao'])->make(true);
            } catch (ModelNotFoundException $e) {
                Log::error('Erro ao obter especialidades (Registro não encontrado): ' . $e->getMessage(), [
                    'action' => 'index - EspecialidadeController',
                    'request_data' => $request,
                    'exception' => $e
                ]);
                return response()->json([], 404);
            } catch (QueryException $e) {
                Log::error('Erro ao obter especialidades (Erro no banco de dados): ' . $e->getMessage(), [
                    'action' => 'index - EspecialidadeController',
                    'request_data' => $request,
                    'exception' => $e
                ]);
                return response()->json([], 500);
            } catch (\Exception $e) {
                Log::error('Erro ao obter especialidades (Ocorreu um erro): ' . $e->getMessage(), [
                    'action' => 'index - EspecialidadeController',
                    'request_data' => $request,
                    'exception' => $e
                ]);
                return response()->json([], 500);
            }
        }

        return view('especialidades.especialidades');
    }

    public function register(EspecialidadeRequest $request)
    {
        try {
            $data = $request->validated();
            $especialidade = Especialidade::create([
                'nome' => $data['nome'],
                'descricao' => $data['descricao'],
            ]);
            $medicosIds = $data['medicos'];
            $especialidade->medicos()->attach($medicosIds);
            return response()->json([], 201);
        } catch (QueryException $e) {
            Log::error('Erro ao cadastrar especialidade (Erro no banco de dados): ' . $e->getMessage(), [
                'action' => 'register - EspecialidadeController',
                'request_data' => $data,
                'exception' => $e
            ]);
            return response()->json([], 500);
        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error('Erro ao cadastrar especialidade (Erro de validação): ' . $e->getMessage(), [
                'action' => 'register - EspecialidadeController',
                'request_data' => $data,
                'exception' => $e
            ]);
            return response()->json([], 422);
        } catch (\Exception $e) {
            Log::error('Erro ao cadastrar especialidade (Ocorreu um erro): ' . $e->getMessage(), [
                'action' => 'register - EspecialidadeController',
                'request_data' => $data,
                'exception' => $e
            ]);
            return response()->json([], 500);
        }
    }

    public function view(string $especialidadeId)
    {
        try {
            $especialidade = Especialidade::findOrFail($especialidadeId);
            return response()->json($especialidade);
        } catch (ModelNotFoundException $e) {
            Log::error('Erro ao buscar especialidade (Registro não encontrado): ' . $e->getMessage(), [
                'action' => 'view - EspecialidadeController',
                'request_data' => $especialidadeId,
                'exception' => $e
            ]);
            return response()->json([], 404);
        } catch (QueryException $e) {
            Log::error('Erro ao buscar especialidade (Erro no banco de dados): ' . $e->getMessage(), [
                'action' => 'view - EspecialidadeController',
                'request_data' => $especialidadeId,
                'exception' => $e
            ]);
            return response()->json([], 500);
        } catch (\Exception $e) {
            Log::error('Erro ao buscar especialidade (Ocorreu um erro): ' . $e->getMessage(), [
                'action' => 'view - EspecialidadeController',
                'request_data' => $especialidadeId,
                'exception' => $e
            ]);
            return response()->json([], 500);
        }
    }

    public function update(EspecialidadeRequest $request, string $especialidadeId)
    {
        try {
            $data = $request->validated();
            $especialidade = Especialidade::findOrFail($especialidadeId);
            $especialidade->update(['nome' => $data['nome'], 'descricao' => $data['descricao']]);
            return response()->json([], 204);
        } catch (ModelNotFoundException $e) {
            Log::error('Erro ao editar especialidade (Registro não encontrado): ' . $e->getMessage(), [
                'action' => 'update - EspecialidadeController',
                'request_data' => $data,
                'exception' => $e
            ]);
            return response()->json([], 404);
        } catch (QueryException $e) {
            Log::error('Erro ao editar especialidade (Erro no banco de dados): ' . $e->getMessage(), [
                'action' => 'update - EspecialidadeController',
                'request_data' => $data,
                'exception' => $e
            ]);
            return response()->json([], 500);
        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error('Erro ao editar especialidade (Erro de validação): ' . $e->getMessage(), [
                'action' => 'update - EspecialidadeController',
                'request_data' => $data,
                'exception' => $e
            ]);
            return response()->json([], 422);
        } catch (\Exception $e) {
            Log::error('Erro ao editar especialidade (Ocorreu um erro): ' . $e->getMessage(), [
                'action' => 'update - EspecialidadeController',
                'request_data' => $data,
                'exception' => $e
            ]);
            return response()->json([], 500);
        }
    }

    public function delete(string $especialidadeId)
    {
        try {
            $model = Especialidade::findOrFail($especialidadeId);
            $model->delete();
            return response()->json([], 204);
        } catch (ModelNotFoundException $e) {
            Log::error('Erro ao excluir especialidade (Registro não encontrado): ' . $e->getMessage(), [
                'action' => 'delete - EspecialidadeController',
                'request_data' => "id: $especialidadeId",
                'exception' => $e
            ]);
            return response()->json([], 404);
        } catch (QueryException $e) {
            Log::error('Erro ao excluir especialidade (Erro no banco de dados): ' . $e->getMessage(), [
                'action' => 'delete - EspecialidadeController',
                'request_data' => "id: $especialidadeId",
                'exception' => $e
            ]);
            return response()->json([], 500);
        } catch (\Exception $e) {
            Log::error('Erro ao excluir especialidade (Ocorreu um erro): ' . $e->getMessage(), [
                'action' => 'delete - EspecialidadeController',
                'request_data' => "id: $especialidadeId",
                'exception' => $e
            ]);
            return response()->json([], 500);
        }
    }

    public function listDoctorsSelected(Request $request, string $especialidadeId)
    {
        if ($request->ajax()) {
            try {
                $especialidade = Especialidade::findOrFail($especialidadeId);
                $medicos = $especialidade->medicos()->select('id', 'nome', 'CRM', 'telefone', 'email')->get();
                return DataTables::of($medicos)->addColumn('acao', function ($medicos) use ($especialidadeId) {
                    return "<div class='container-buttons-datatable'><button type='button' data-id_medico='{$medicos->id}' data-id_especialidade='{$especialidadeId}' class='button-custom button-action' id='button-delete-doctor'>DESVINCULAR</button></div>";
                })->rawColumns(['acao'])->make(true);
            } catch (ModelNotFoundException $e) {
                Log::error('Erro ao obter médicos por especialidade (Registro não encontrado): ' . $e->getMessage(), [
                    'action' => 'listDoctorsSelected - EspecialidadeController',
                    'request_data' => "id: $especialidadeId",
                    'exception' => $e
                ]);
                return response()->json([], 404);
            } catch (QueryException $e) {
                Log::error('Erro ao obter médicos por especialidade (Erro no banco de dados): ' . $e->getMessage(), [
                    'action' => 'listDoctorsSelected - EspecialidadeController',
                    'request_data' => "id: $especialidadeId",
                    'exception' => $e
                ]);
                return response()->json([], 500);
            } catch (\Exception $e) {
                Log::error('Erro ao obter médicos por especialidade (Ocorreu um erro): ' . $e->getMessage(), [
                    'action' => 'listDoctorsSelected - EspecialidadeController',
                    'request_data' => "id: $especialidadeId",
                    'exception' => $e
                ]);
                return response()->json([], 500);
            }
        }
        return response()->json([], 404);
    }

    public function listDoctorsNotRelated(string $especialidadeId)
    {
        try {
            $medicosNaoRelacionados = Medico::whereDoesntHave('especialidades', function ($query) use ($especialidadeId) {
                $query->where('especialidade_id', $especialidadeId);
            })->select('id', 'nome')->get();

            return response()->json($medicosNaoRelacionados);
        } catch (QueryException $e) {
            Log::error('Erro ao obter médicos não relacionados à especialidade (Erro no banco de dados): ' . $e->getMessage(), [
                'action' => 'listDoctorsNotRelated - EspecialidadeController',
                'request_data' => "id: $especialidadeId",
                'exception' => $e
            ]);
            return response()->json([], 500);
        } catch (\Exception $e) {
            Log::error('Erro ao obter médicos não relacionados à especialidade (Ocorreu um erro): ' . $e->getMessage(), [
                'action' => 'listDoctorsNotRelated - EspecialidadeController',
                'request_data' => "id: $especialidadeId",
                'exception' => $e
            ]);
            return response()->json([], 500);
        }
    }

    public function unbindDoctor(String $medicoId, string $especialidadeId)
    {
        try {
            $medico = Medico::findOrFail($medicoId);
            $especialidade = Especialidade::findOrFail($especialidadeId);
            $medico->especialidades()->detach($especialidade);
            return response()->json([], 204);
        } catch (ModelNotFoundException $e) {
            Log::error('Erro ao desvincular médico (Registro não encontrado): ' . $e->getMessage(), [
                'action' => 'unbindDoctor - EspecialidadeController',
                'request_data' => "id-especialidade: $especialidadeId, id-medico: $medicoId",
                'exception' => $e
            ]);
            return response()->json([], 404);
        } catch (QueryException $e) {
            Log::error('Erro ao desvincular médico (Erro no banco de dados): ' . $e->getMessage(), [
                'action' => 'unbindDoctor - EspecialidadeController',
                'request_data' => "id-especialidade: $especialidadeId, id-medico: $medicoId",
                'exception' => $e
            ]);
            return response()->json([], 500);
        } catch (\Exception $e) {
            Log::error('Erro ao desvincular médico (Ocorreu um erro): ' . $e->getMessage(), [
                'action' => 'unbindDoctor - EspecialidadeController',
                'request_data' => "id-especialidade: $especialidadeId, id-medico: $medicoId",
                'exception' => $e
            ]);
            return response()->json([], 500);
        }
    }

    public function linkDoctors(Request $request, string $especialidadeId)
    {
        try {
            $especialidade = Especialidade::findOrFail($especialidadeId);
            $medicosIds =  $request->input('medicos', []);
            $especialidade->medicos()->attach($medicosIds);
            return response()->json([], 201);
        } catch (ModelNotFoundException $e) {
            Log::error('Erro ao vincular médico (Registro não encontrado): ' . $e->getMessage(), [
                'action' => 'linkDoctors - EspecialidadeController',
                'request_data' => "id-especialidade: $especialidadeId, id-medico: $medicosIds",
                'exception' => $e
            ]);
            return response()->json([], 404);
        } catch (QueryException $e) {
            Log::error('Erro ao vincular especialidade (Erro no banco de dados): ' . $e->getMessage(), [
                'action' => 'linkDoctors - EspecialidadeController',
                'request_data' => $request,
                'exception' => $e
            ]);
            return response()->json([], 500);
        } catch (\Exception $e) {
            Log::error('Erro ao vincular especialidade (Ocorreu um erro): ' . $e->getMessage(), [
                'action' => 'linkDoctors - EspecialidadeController',
                'request_data' => $request,
                'exception' => $e
            ]);
            return response()->json([], 500);
        }
    }

    public function list()
    {
        try {
            $dados = Especialidade::select('id', 'nome')->get();
            return response()->json($dados);
        } catch (QueryException $e) {
            Log::error('Erro ao listar especialidades (Erro no banco de dados): ' . $e->getMessage(), [
                'action' => 'list - EspecialidadeController',
                'exception' => $e
            ]);
            return response()->json([], 500);
        } catch (\Exception $e) {
            Log::error('Erro ao listar especialidades (Ocorreu um erro): ' . $e->getMessage(), [
                'action' => 'list - EspecialidadeController',
                'exception' => $e
            ]);
            return response()->json([], 500);
        }
    }
}

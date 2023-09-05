<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class MedicoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        $medicoId = $this->route('medicoId');
        return [
            'nome' => 'required|string|max:45',
            'CRM' => [
                'required',
                'string',
                'max:45',
                Rule::unique('medicos')->ignore($medicoId),
            ],
            'telefone' => 'required|string|max:45',
            'email' => [
                'required',
                'email',
                Rule::unique('medicos', 'email')->ignore($medicoId),
            ],
            'especialidades' => 'array',
        ];
    }

    public function messages(): array
    {
        return [
            'nome.required' => 'O campo nome é obrigatório.',
            'nome.string' => 'O campo nome deve ser um texto e ter no máximo 45 caracteres.',
            'CRM.required' => 'O campo CRM é obrigatório.',
            'CRM.unique' => 'O campo CRM já está em uso.',
            'CRM.string' => 'O campo CRM deve ser um texto e ter no máximo 45 caracteres.',
            'telefone.required' => 'O campo telefone é obrigatório.',
            'telefone.string' => 'O campo telefone deve ser um texto e ter no máximo 45 caracteres.',
            'email.required' => 'O campo email é obrigatório.',
            'email.email' => 'O campo email deve ser um endereço de email válido.',
            'email.unique' => 'O campo email já está em uso.',
        ];
    }
}

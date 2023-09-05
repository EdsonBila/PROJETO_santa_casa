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
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Medico extends Model
{
    use HasFactory;
    protected $table = 'medicos';
    protected $fillable = ['nome', 'CRM', 'telefone', 'email'];
    protected $dates = ['dt_cadastro'];
    public $timestamps = false;

    public function especialidades()
    {
        return $this->belongsToMany(Especialidade::class, 'medicos_especialidades', 'medico_id', 'especialidade_id');
    }
}

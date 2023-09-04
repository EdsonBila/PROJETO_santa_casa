<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('medicos_especialidades', function (Blueprint $table) {
            $table->unsignedBigInteger('especialidade_id');
            $table->unsignedBigInteger('medico_id');
            $table->foreign('especialidade_id')->references('id')->on('especialidades')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('medico_id')->references('id')->on('medicos')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('medicos_especialidades');
    }
};

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('medicos', function (Blueprint $table) {
            $table->id();
            $table->string('nome', 45);
            $table->string('CRM', 45);
            $table->string('telefone', 45);
            $table->string('email', 45);
            $table->timestamp('dt_cadastro')->useCurrent();
        });
    }
    
    public function down(): void
    {
        Schema::dropIfExists('medicos');
    }
};

@extends('includes.main')
@section('content')
@include('includes.menu')
<div class="container-All">
    <div class="container-cards">
        <div class="row">
            <div class="col-6">
                <div class="card">
                    <div class="card-body">
                        <div class="card-title">
                            <span class="title">ESPECIALIDADES</span>
                            <img class="icon" src="{{ asset('assets/icons/especialidade.svg') }}" alt="icone Especialidade">
                        </div>
                        <p class="card-text qtd">{{ $quantidadeEspecialidades }}</p>
                    </div>
                </div>
            </div>
            <div class="col-6">
                <div class="card">
                    <div class="card-body">
                        <div class="card-title">
                            <span class="title">Médicos</span>
                            <img class="icon" src="{{ asset('assets/icons/medico.svg') }}" alt="icone Medico">
                        </div>
                        <p class="card-text qtd">{{ $quantidadeMedicos }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@section('scripts')
<script src="{{ asset('assets/js/home/index.js') }}"></script>
@endsection
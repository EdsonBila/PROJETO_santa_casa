@extends('includes.main')
@section('linkcss')
<link rel="stylesheet" type="text/css" href="{{ asset('assets/css/relatorio/index.css') }}">
@endsection

@section('content')
@include('includes.menu')
@include('includes.load')
<div class="container-All">
    <div class="container-header">
        <h1 class="title">Relatório</h1>
        <div class="container-buttons-header">
            <button class="button-custom" id="button-filter-refresh-doctors"><img class="icon-filter-refresh" src="{{ asset('assets/icons/recarregar.svg') }}" alt="icone de Recarregamento"></button>
            <button class="button-custom" id="button-filter-doctors">FILTRO</button>
        </div>
    </div>
    <div class="container-filter" style="display: none;">
        <div class="container-choice-filter">
            <label for="filter-CRM" class="label-input">Filtrar por CRM (Médico)</label>
            <select id="filter-CRM" multiple style="display: none"></select>
        </div>
        <div class="container-buttons-action">
            <button type="button" class="button-custom" id="button-cancel-filter">CANCELAR</button>
            <button type="button" class="button-custom" id="button-save-filter">FILTRAR</button>
        </div>
    </div>
    <table id="table-datatable-medico" class="table cell-border stripe" style="width:100%">
        <thead>
            <tr>
                <th data-priority="1">CÓDIGO</th>
                <th>NOME</th>
                <th>CRM</th>
                <th>TELEFONE</th>
                <th>E-MAIL</th>
                <th>CADASTRO</th>
                <th data-priority="2"></th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>
</div>
@endsection

@section('scripts')
<script src="{{ asset('assets/js/global/index.js') }}"></script>
<script src="{{ asset('assets/js/global/multi.js') }}"></script>
<script src="{{ asset('assets/js/datatable/index.js') }}"></script>
<script src="{{ asset('assets/js/relatorios/index.js') }}"></script>
@endsection
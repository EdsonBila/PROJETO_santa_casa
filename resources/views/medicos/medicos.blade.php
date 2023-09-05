@extends('includes.main')
@section('linkcss')
<link rel="stylesheet" type="text/css" href="{{ asset('assets/css/medico/index.css') }}">
@endsection

@section('content')
@include('includes.menu')
@include('includes.load')
<div class="container-All">
    <div class="container-header">
        <h1 class="title">Médicos</h1>
        <button class="button-custom" id="button-create">CADASTRAR</button>
    </div>
    <div class="container-register" style="display: none;">
        <div class="container-input">
            <label for="form-register-name" class="label-input">Nome do Médico (Obrigatório)</label>
            <input type="text" class="validate-form-create input-form" id="form-register-name" placeholder="Informe o Nome do Médico" maxlength="45">
        </div>
        <div class="container-input">
            <label for="form-register-CRM" class="label-input">CRM do Médico (Obrigatório)</label>
            <input type="text" class="validate-form-create input-form" id="form-register-CRM" placeholder="Informe o CRM do Médico" maxlength="45">
        </div>
        <div class="container-input">
            <label for="form-register-telefone" class="label-input">Telefone do Médico (Obrigatório)</label>
            <input type="text" class="validate-form-create input-form" id="form-register-telefone" placeholder="Informe o Telefone do Médico" maxlength="45">
        </div>
        <div class="container-input">
            <label for="form-register-email" class="label-input">E-mail do Médico (Obrigatório)</label>
            <input type="text" class="validate-form-create input-form" id="form-register-email" placeholder="Informe o E-mail do Médico" maxlength="45">
        </div>
        <div class="form-check container-check">
            <input type="checkbox" class="form-check-input" id="form-register-choice-specialty-check">
            <label class="form-check-label" for="form-register-choice-specialty-check">Víncular Especialidade?</label>
        </div>
        <div class="container-choice-specialty" style="display: none;">
            <select id="form-register-choice-specialty" multiple style="display: none"></select>
        </div>
        <div class="container-buttons-action">
            <button type="button" class="button-custom" id="button-cancel-create">CANCELAR</button>
            <button type="button" class="button-custom" id="button-save-create">SALVAR</button>
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

    <div class="modal fade" id="ModalEditar" tabindex="-1" aria-labelledby="ModalEditar" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title title" id="ModalEditar">EDITAR</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="container-input">
                        <label for="form-update-name" class="label-input">Nome do Médico (Obrigatório)</label>
                        <input type="text" class="validate-form-update input-form" id="form-update-name" placeholder="Informe o nome do Médico" maxlength="45">
                    </div>
                    <div class="container-input">
                        <label for="form-update-CRM" class="label-input">CRM do Médico (Obrigatório)</label>
                        <input type="text" class="validate-form-update input-form" id="form-update-CRM" placeholder="Informe o CRM do Médico" maxlength="45">
                    </div>
                    <div class="container-input">
                        <label for="form-update-telefone" class="label-input">Telefone do Médico (Obrigatório)</label>
                        <input type="text" class="validate-form-update input-form" id="form-update-telefone" placeholder="Informe o Telefone do Médico" maxlength="45">
                    </div>
                    <div class="container-input">
                        <label for="form-update-email" class="label-input">E-mail do Médico (Obrigatório)</label>
                        <input type="text" class="validate-form-update input-form" id="form-update-email" placeholder="Informe o E-mail do Médico" maxlength="45">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="button-custom" id="modal-button-edit-cancel" data-bs-dismiss="modal">CANCELAR</button>
                    <button type="button" class="button-custom" id="modal-button-edit-save">SALVAR</button>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@section('scripts')
<script src="{{ asset('assets/js/global/index.js') }}"></script>
<script src="{{ asset('assets/js/global/multi.js') }}"></script>
<script src="{{ asset('assets/js/datatable/index.js') }}"></script>
<script src="{{ asset('assets/js/medicos/index.js') }}"></script>
@endsection
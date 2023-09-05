@extends('includes.main')
@section('styles')

td.show-list-doctors {
background: url("{{ asset('assets/icons/expandir.svg') }}") no-repeat center;
cursor: pointer;
}

tr.shown td.show-list-doctors {
background: url("{{ asset('assets/icons/fechar_expandir.svg') }}") no-repeat center;
}
@endsection

@section('content')
@include('includes.menu')
<div class="container-All">
    <div class="container-header">
        <h1 class="title">Especialidades</h1>
        <button class="button-custom" id="button-create">CADASTRAR</button>
    </div>
    <div class="container-register" style="display: none;">
        <div class="container-input">
            <label for="form-register-name" class="label-input">Nome da Especialidade (Obrigatório)</label>
            <input type="text" class="validate-form-create input-form" id="form-register-name" placeholder="Informe o nome da especialidade">
        </div>
        <div class="container-input">
            <label for="form-register-description" class="label-input">Descrição da Especialidade (Obrigatório)</label>
            <textarea rows="4" class="validate-form-create input-form" id="form-register-description" cols="50" maxlength="45" placeholder="Informe uma descrição"></textarea>
            <span class="count-caracter count-caracter-create">Quantidade de caracteres: 0/45</span>
        </div>
        <div class="form-check container-check">
            <input type="checkbox" class="form-check-input" id="form-register-choice-doctor-check">
            <label class="form-check-label" for="form-register-choice-doctor-check">Selecionar Médicos?</label>
        </div>
        <div class="container-choice-doctor" style="display: none;">
            <select id="form-register-choice-doctor" multiple style="display: none"></select>
        </div>
        <div class="container-buttons-action">
            <button type="button" class="button-custom" id="button-cancel-create">CANCELAR</button>
            <button type="button" class="button-custom" id="button-save-create">SALVAR</button>
        </div>
    </div>
    <table id="table-datatable-especialidade" class="table cell-border stripe" style="width:100%">
        <thead>
            <tr>
                <th>ID</th>
                <th>NOME</th>
                <th>DESCRIÇÃO</th>
                <th>AÇÃO</th>
                <th></th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>

    <div class="modal fade" id="ModalEditar" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title title" id="ModalEditar">EDITAR</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="container-input">
                        <label for="form-register-choice-doctor" class="label-input">Nome da Especialidade (Obrigatório)</label>
                        <input type="text" class="validate-form-update input-form" id="form-update-name" placeholder="Informe o nome da especialidade">
                    </div>
                    <div class="container-input">
                        <label for="form-register-choice-doctor" class="label-input">Descrição da Especialidade (Obrigatório)</label>
                        <textarea rows="4" class="validate-form-update input-form" id="form-update-description" cols="50" maxlength="45" placeholder="Informe uma descrição"></textarea>
                        <span class="count-caracter count-caracter-update">Quantidade de caracteres: 0/45</span>
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
<script src="{{ asset('assets/js/especialidades/index.js') }}"></script>
@endsection
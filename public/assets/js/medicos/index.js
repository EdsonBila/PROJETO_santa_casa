$(document).ready(function () {
    var dataTableEspecialidade, dataTableMedico;
    $('#form-register-telefone, #form-update-telefone').mask("(99) 99999-9999");
    $('.medico-nav-item').addClass('active-button-menu');
    // datatable primaria - lista de medicos
    dataTableMedico = $('#table-datatable-medico').DataTable({
        aaSorting: [[0, 'desc']],
        dom: 'B<"buttons-search-row"lf>rt<"bottom"ip><"clear">',
        buttons: [
            {
                extend: 'excel',
                autoFilter: true,
                sheetName: 'MEDICOS',
                titleAttr: 'MEDICOS',
                action: newexportaction,
                title: 'MEDICOS',
                filename: 'MEDICOS',
                exportOptions: {
                    columns: [1, 2, 3, 4, 5]
                }
            },
            {
                title: 'MEDICOS',
                download: 'open',
                sheetName: 'MEDICOS',
                extend: 'pdf',
                titleAttr: 'PDF',
                filename: 'MEDICOS',
                action: newexportaction,
                exportOptions: {
                    columns: [1, 2, 3, 4, 5]
                }
            }],
        fixedHeader: true,
        responsive: {
            breakpoints: [
                { name: 'bigdesktop', width: Infinity },
                { name: 'meddesktop', width: 1480 },
                { name: 'smalldesktop', width: 1280 },
                { name: 'medium', width: 1188 },
                { name: 'tabletl', width: 1024 },
                { name: 'btwtabllandp', width: 848 },
                { name: 'tabletp', width: 768 },
                { name: 'mobilel', width: 480 },
                { name: 'mobilep', width: 320 }
            ], details: {
                renderer: function (api, rowIdx, columns) {
                    checkDaughterResponsiveActive();
                    var data = $.map(columns, function (col, i) {
                        return col.hidden ?
                            '<tr data-dt-row="' + col.rowIndex + '" data-dt-column="' + col.columnIndex + '">' +
                            '<td><b>' + col.title + '</b>:' + '</td> ' +
                            '<td style="word-break: break-all;">' + col.data + '</td>' +
                            '</tr>' :
                            '';
                    }).join('');
                    return data ?
                        $('<table/>').append(data) :
                        false;
                }
            },
        },
        lengthMenu: [5, 10, 25, 50, 100],
        pageLength: 5,
        language: {
            url: 'https://cdn.datatables.net/plug-ins/1.13.1/i18n/pt-BR.json',
            search: '',
            lengthMenu: '_MENU_'
        },
        processing: true,
        serverSide: true,
        ajax: {
            url: "/medico",
            type: 'GET'
        },
        columns: [
            { data: 'id', name: 'id' },
            { data: 'nome', name: 'nome' },
            { data: 'CRM', name: 'CRM' },
            { data: 'telefone', name: 'telefone' },
            { data: 'email', name: 'email' },
            { data: 'dt_cadastro', name: 'dt_cadastro' },
            { data: 'acao', name: 'acao', orderable: false, searchable: false, className: 'show-list-specialty' },
        ]
    });

    $(document).on('click', '#button-edit-register', function viewEspecialidade() {
        var id = $(this).data('id');
        $('#ModalEditar').modal('show');
        $.ajax({
            type: 'GET',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                'Content-Type': 'application/json'
            },
            url: `/medico/${id}/visualizar`,
            success: function (data) {
                $('#form-update-name').val(data.nome);
                $('#form-update-CRM').val(data.CRM);
                $('#form-update-telefone').val(data.telefone);
                $('#form-update-email').val(data.email);
            },
            error: function (data) {
                bootstrap.showToast({
                    body: "Ocorreu um erro inesperado, tente novamente mais tarde",
                    toastClass: "text-danger-emphasis bg-danger-subtle",
                    closeButton: false,
                    delay: 5000
                })
                setTimeout(function () {
                    location.reload();
                }, 5000);
            }
        });
    })

    $('#modal-button-edit-save').on('click', function updateEspecialidade() {
        var id = $('#button-edit-register').data('id');
        var validation = validarInputs('.validate-form-update');
        if (validation) {
            $.ajax({
                type: 'PUT',
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                    'Content-Type': 'application/json'
                },
                url: `/medico/${id}/editar`,
                data: JSON.stringify({
                    'nome': $('#form-update-name').val(),
                    'CRM': $('#form-update-CRM').val(),
                    'telefone': $('#form-update-telefone').val(),
                    'email': $('#form-update-email').val(),
                }),
                dataType: 'json',
                success: function (data) {
                    bootstrap.showToast({
                        body: "Médico editado com sucesso",
                        toastClass: "text-success-emphasis bg-success-subtle",
                        closeButtonClass: "btn-close"
                    })
                    $('#ModalEditar').modal('hide');
                    reloadDataTable('#table-datatable-medico');
                },
                error: function (data) {
                    if (data.status == 422) {
                        $.each(data.responseJSON.errors, function (key, value) {
                            bootstrap.showToast({
                                body: value[0],
                                toastClass: "text-warning-emphasis bg-warning-subtle",
                                closeButtonClass: "btn-close",
                                delay: 5000
                            })
                        });
                        return;
                    }
                    bootstrap.showToast({
                        body: "Ocorreu um erro inesperado, tente novamente mais tarde",
                        toastClass: "text-danger-emphasis bg-danger-subtle",
                        closeButton: false,
                        delay: 5000
                    })
                    setTimeout(function () {
                        location.reload();
                    }, 5000);
                }
            });
        }
    })

    $(document).on('click', '#button-delete-register', function deleteEspecialidade() {
        var id = $(this).data('id');
        $('body').css('pointer-events', 'none');
        $('.toast-container').css('pointer-events', 'all');
        bootstrap.showToast({
            body: "<p class='mensage-toast'>Tem certeza que deseja excluir?</p><div><button class='button-custom-toast button-yes-toast button-action-toast' id='button-yes' data-bs-dismiss='toast'>SIM</button><button class='button-custom-toast button-no-toast button-action-toast' id='button-no' data-bs-dismiss='toast'>NÃO</button></div>",
            delay: Infinity,
            closeButton: false,
            toastClass: "text-dark-emphasis bg-dark-subtle",
        })

        $('.button-action-toast').on('click', function () {
            $('body').css('pointer-events', 'all');
            var typeButton = $(this).attr("id");
            if (typeButton == 'button-no') return;
            $.ajax({
                type: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                    'Content-Type': 'application/json'
                },
                url: `/medico/${id}/excluir`,
                success: function (data) {
                    bootstrap.showToast({
                        body: "Médico excluído com sucesso",
                        toastClass: "text-success-emphasis bg-success-subtle",
                        closeButtonClass: "btn-close"
                    })
                    reloadDataTable('#table-datatable-medico');
                },
                error: function (data) {
                    bootstrap.showToast({
                        body: "Ocorreu um erro inesperado, tente novamente mais tarde",
                        toastClass: "text-danger-emphasis bg-danger-subtle",
                        closeButton: false,
                        delay: 5000
                    })
                    setTimeout(function () {
                        location.reload();
                    }, 5000);
                }
            });
        })
    })

    // datatable secundaria - lista de especialidades selecionados
    $('#table-datatable-medico tbody').on('click', 'td.show-list-specialty div button#button-open-vinculo', function listSpecialty() {
        if ($('.show-modal-detalhes').length) {
            $('.show-modal-detalhes').remove();
        }
        var row = dataTableMedico.row($(this).closest('tr'));
        var data = row.data();
        var showModalDetalhes = $('<div>').addClass('show-modal-detalhes');
        var modelHtml = listSpecialtyModal(data.id);
        $('body').append(showModalDetalhes.html(modelHtml));
        dataTableEspecialidade = $('#table-datatable-especialidade').DataTable({
            dom: 'B<"buttons-search-row"lf>rt<"bottom"ip><"clear">',
            buttons: [
                {
                    extend: 'excel',
                    autoFilter: true,
                    sheetName: `MEDICO-${data.id}-ESPECIALIDADES`,
                    titleAttr: `MEDICO-${data.id}-ESPECIALIDADES`,
                    action: newexportaction,
                    title: `MEDICO-${data.id}-ESPECIALIDADES`,
                    filename: `MEDICO-${data.id}-ESPECIALIDADES`,
                    exportOptions: {
                        columns: [1, 2]
                    }
                },
                {
                    title: `MEDICO-${data.id}-ESPECIALIDADES`,
                    download: 'open',
                    sheetName: `MEDICO-${data.id}-ESPECIALIDADES`,
                    extend: 'pdf',
                    titleAttr: 'PDF',
                    filename: `MEDICO-${data.id}-ESPECIALIDADES`,
                    action: newexportaction,
                    exportOptions: {
                        columns: [1, 2]
                    }
                }],
            aaSorting: [[0, 'desc']],
            responsive: {
                breakpoints: [
                    { name: 'bigdesktop', width: Infinity },
                    { name: 'meddesktop', width: 1480 },
                    { name: 'smalldesktop', width: 1280 },
                    { name: 'medium', width: 1188 },
                    { name: 'tabletl', width: 1024 },
                    { name: 'btwtabllandp', width: 848 },
                    { name: 'tabletp', width: 768 },
                    { name: 'mobilel', width: 480 },
                    { name: 'mobilep', width: 320 }
                ], details: {
                    renderer: function (api, rowIdx, columns) {
                        var data = $.map(columns, function (col, i) {
                            return col.hidden ?
                                '<tr data-dt-row="' + col.rowIndex + '" data-dt-column="' + col.columnIndex + '">' +
                                '<td><b>' + col.title + '</b>:' + '</td> ' +
                                '<td style="word-break: break-all;">' + col.data + '</td>' +
                                '</tr>' :
                                '';
                        }).join('');
                        return data ?
                            $('<table/>').append(data) :
                            false;
                    }
                },
            },
            lengthMenu: [5, 10, 25, 50, 100],
            pageLength: 5,
            language: {
                url: 'https://cdn.datatables.net/plug-ins/1.13.1/i18n/pt-BR.json',
                search: '',
                lengthMenu: '_MENU_'
            },
            processing: true,
            serverSide: true,
            ajax: {
                url: `/medico/${data.id}/listaEspecialidadesSelecionadasDatatable`,
                type: "GET"
            },
            columns: [
                { data: 'id', name: 'id' },
                { data: 'nome', name: 'nome' },
                { data: 'descricao', name: 'descricao' },
                { data: 'acao', name: 'acao', orderable: false, searchable: false },
            ],
        });
        $('#ModalDetalhes').modal('show');
        listSpecialtySelectAdd(data.id);
    });

    function listSpecialtyModal(medicoId) {
        return `
        <div class="modal fade" id="ModalDetalhes" tabindex="-1" aria-labelledby="ModalDetalhes" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-fullscreen">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="list-specialty-title">Especialidade</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="container-update-specialty">
                        <div class="container-list-specialty-header">
                            <span class="icon-add-specialty button-custom" id="button-action-add-specialty"><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg></span>
                        </div>
                        <div id="container-choice-specialty-datatable" style="display: none">
                            <select id="select-add-choice-specialty" multiple style="display: none"></select>
                            <div class="container-buttons-action">
                                <button type="button" class="button-custom" id="button-cancel-add-specialty">CANCELAR</button>
                                <button type="button" class="button-custom" id="button-save-add-specialty" data-id_medico="${medicoId}">SALVAR</button>
                            </div>
                        </div>
                    </div>
                    <table class="highlight" id="table-datatable-especialidade" style="width:100%;">
                        <thead>
                            <tr>
                                <th>CÓDIGO</th>
                                <th>NOME</th>
                                <th>DESCRIÇÃO</th>
                                <th>AÇÃO</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                        </table>
                        </div>
                    </div>
                </div>
            </div>
            
            
            
            `;
    }

    $(document).on('click', '#button-delete-specialty', function deleteEspecialidadeDoctor() {
        var medicoId = $(this).data('id_medico');
        var especialidadeId = $(this).data('id_especialidade');
        $('body').css('pointer-events', 'none');
        $('.toast-container').css('pointer-events', 'all');
        bootstrap.showToast({
            body: "<p class='mensage-toast'>Tem certeza que deseja desvincular?</p><div><button class='button-custom-toast button-yes-toast button-action-toast' id='button-yes' data-bs-dismiss='toast'>SIM</button><button class='button-custom-toast button-no-toast button-action-toast' id='button-no' data-bs-dismiss='toast'>NÃO</button></div>",
            delay: Infinity,
            closeButton: false,
            toastClass: "text-dark-emphasis bg-dark-subtle",
        })

        $('.button-action-toast').on('click', function () {
            $('body').css('pointer-events', 'all');
            var typeButton = $(this).attr("id");
            if (typeButton == 'button-no') return;
            $.ajax({
                type: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                    'Content-Type': 'application/json'
                },
                url: `/medico/${medicoId}/${especialidadeId}/desvincularEspecialidades`,
                success: function (data) {
                    bootstrap.showToast({
                        body: "Especialidade desvinculada com sucesso",
                        toastClass: "text-success-emphasis bg-success-subtle",
                        closeButtonClass: "btn-close"
                    })
                    reloadDataTable('#table-datatable-especialidade');
                    $('#select-add-choice-specialty').val('');
                    $('#select-add-choice-specialty').removeAttr('data-multijs');
                    $('#container-choice-specialty-datatable .multi-wrapper').remove()
                    $("#form-register-choice-specialty").multi();
                    listSpecialtySelectAdd(medicoId)
                },
                error: function (data) {
                    bootstrap.showToast({
                        body: "Ocorreu um erro inesperado, tente novamente mais tarde",
                        toastClass: "text-danger-emphasis bg-danger-subtle",
                        closeButton: false,
                        delay: 5000
                    })
                    setTimeout(function () {
                        location.reload();
                    }, 5000);
                }
            });
        })
    })

    $(document).on('click', '#button-action-add-specialty, #button-cancel-add-specialty', function showAddMedicoSpecialty() {
        if ($("#select-add-choice-specialty").find("option").length > 0) {
            $('#container-choice-specialty-datatable').toggle();
            return
        }
        bootstrap.showToast({
            body: "Nenhuma especialidade disponível",
            toastClass: "text-warning-emphasis bg-warning-subtle",
            closeButtonClass: "btn-close"
        })
    })

    $(document).on('click', '#button-save-add-specialty', function registerSpecialty() {
        var medicoId = $(this).data('id_medico');
        var validation = true;
        var selectedOptions = $('#select-add-choice-specialty option:selected').map(function () {
            return $(this).val();
        }).get();
        if (selectedOptions.length == 0) {
            validation = false;
            bootstrap.showToast({
                body: "Selecione pelo menos uma especialidade",
                toastClass: "text-warning-emphasis bg-warning-subtle",
                closeButtonClass: "btn-close"
            })
        }
        if (validation) {
            $.ajax({
                type: 'POST',
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                    'Content-Type': 'application/json'
                },
                url: `/medico/${medicoId}/vincularEspecialidades`,
                data: JSON.stringify({
                    'especialidades': selectedOptions
                }),
                dataType: 'json',
                success: function (data) {
                    bootstrap.showToast({
                        body: "Especialidade(s) vinculadas com sucesso",
                        toastClass: "text-success-emphasis bg-success-subtle",
                        closeButtonClass: "btn-close"
                    })
                    reloadDataTable('#table-datatable-especialidade');
                    $('#select-add-choice-specialty').val('');
                    $('#select-add-choice-specialty').removeAttr('data-multijs');
                    $('#container-choice-specialty-datatable .multi-wrapper').remove()
                    $("#form-register-choice-specialty").multi();
                    listSpecialtySelectAdd(medicoId)
                },
                error: function (data) {
                    bootstrap.showToast({
                        body: "Ocorreu um erro inesperado, tente novamente mais tarde",
                        toastClass: "text-danger-emphasis bg-danger-subtle",
                        closeButton: false,
                        delay: 5000
                    })
                    setTimeout(function () {
                        location.reload();
                    }, 5000);
                }
            });
        }
    })

    function listSpecialtySelectAdd(medicoId) {
        $.ajax({
            url: `/medico/${medicoId}/listaEspecialidadesNaoSelecionadas`,
            type: 'GET',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                'Content-Type': 'application/json'
            },
            success: function (data) {
                var select = $("#select-add-choice-specialty");
                select.empty();
                $.each(data, function (key, value) {
                    select.append($('<option></option>').val(value.id).text(value.nome));
                });
                select.multi();
            }, error: function (data) {
                bootstrap.showToast({
                    body: "Ocorreu um erro inesperado, tente novamente mais tarde",
                    toastClass: "text-danger-emphasis bg-danger-subtle",
                    closeButton: false,
                    delay: 5000
                })
                setTimeout(function () {
                    location.reload();
                }, 5000);
            }
        });
    }

    // cadastro de medicos
    $('#button-create, #button-cancel-create').on('click', function showFormRegister() {
        $('.container-register').toggle();
    });

    function listSpecialtySelectCreate() {
        $.ajax({
            url: '/especialidade/lista',
            type: 'GET',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                'Content-Type': 'application/json'
            },
            success: function (data) {
                var select = $("#form-register-choice-specialty");
                select.empty();
                $("#form-register-choice-specialty-check").change(function () {
                    showSpecialtyList(data)
                });
                $.each(data, function (key, value) {
                    select.append($('<option></option>').val(value.id).text(value.nome));
                });
                select.multi();
            }, error: function (data) {
                bootstrap.showToast({
                    body: "Ocorreu um erro inesperado, tente novamente mais tarde",
                    toastClass: "text-danger-emphasis bg-danger-subtle",
                    closeButton: false,
                    delay: 5000
                })
                setTimeout(function () {
                    location.reload();
                }, 5000);
            }
        });
    }

    function showSpecialtyList(data) {
        if (data.length == 0 && $('#form-register-choice-specialty-check').prop('checked')) {
            $('#form-register-choice-specialty-check').prop('checked', false)
            bootstrap.showToast({
                body: "Nenhuma especialidade foi cadastrada ainda",
                toastClass: "text-warning-emphasis bg-warning-subtle",
                closeButtonClass: "btn-close"
            })
        } else {
            $('.container-choice-specialty').toggle();
        }
    }

    $('#button-save-create').on('click', function createMedico() {
        var validation = validarInputs('.validate-form-create');
        var selectedOptions = [];
        if ($("#form-register-choice-specialty-check").prop('checked') && validation) {
            selectedOptions = $('#form-register-choice-specialty option:selected').map(function () {
                return $(this).val();
            }).get();
            if (selectedOptions.length == 0) {
                validation = false;
                bootstrap.showToast({
                    body: "Selecione pelo menos uma especialidade",
                    toastClass: "text-warning-emphasis bg-warning-subtle",
                    closeButtonClass: "btn-close"
                })
            }
        }
        if (validation) {
            $.ajax({
                type: 'POST',
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                    'Content-Type': 'application/json'
                },
                url: '/medico/registro',
                data: JSON.stringify({
                    'nome': $('#form-register-name').val(),
                    'CRM': $('#form-register-CRM').val(),
                    'telefone': $('#form-register-telefone').val(),
                    'email': $('#form-register-email').val(),
                    'especialidades': selectedOptions
                }),
                dataType: 'json',
                success: function (data) {
                    bootstrap.showToast({
                        body: "Médico cadastrado com sucesso",
                        toastClass: "text-success-emphasis bg-success-subtle",
                        closeButtonClass: "btn-close"
                    })
                    reloadDataTable('#table-datatable-medico');
                    limparFormRegister();
                },
                error: function (data) {
                    if (data.status == 422) {
                        $.each(data.responseJSON.errors, function (key, value) {
                            bootstrap.showToast({
                                body: value[0],
                                toastClass: "text-warning-emphasis bg-warning-subtle",
                                closeButtonClass: "btn-close",
                                delay: 5000
                            })
                        });
                        return;
                    }
                    bootstrap.showToast({
                        body: "Ocorreu um erro inesperado, tente novamente mais tarde",
                        toastClass: "text-danger-emphasis bg-danger-subtle",
                        closeButton: false,
                        delay: 5000
                    })
                    setTimeout(function () {
                        location.reload();
                    }, 5000);
                }
            });
        }
    })

    function limparFormRegister() {
        $('#form-register-name, #form-register-CRM, #form-register-telefone, #form-register-email, #form-register-choice-specialty').val('');
        $('#form-register-choice-specialty').removeAttr('data-multijs');
        $('.container-choice-specialty .multi-wrapper').remove()
        $("#form-register-choice-specialty").multi();
    }

    listSpecialtySelectCreate();
});


$(document).ready(function () {
    $('.especialidade-nav-item').addClass('active-button-menu');
    // datatable primaria - lista de especialidade
    dataTable = $('#table-datatable-especialidade').DataTable({
        aaSorting: [[0, 'desc']],
        dom: 'B<"buttons-search-row"lf>rt<"bottom"ip><"clear">',
        buttons: [
            {
                extend: 'excel',
                autoFilter: true,
                sheetName: 'ESPECIALIDADES',
                titleAttr: 'ESPECIALIDADES',
                action: newexportaction,
                title: 'ESPECIALIDADES',
                filename: 'ESPECIALIDADES',
                exportOptions: {
                    columns: [1, 2]
                }
            },
            {
                title: 'ESPECIALIDADES',
                download: 'open',
                sheetName: 'ESPECIALIDADES',
                extend: 'pdf',
                titleAttr: 'PDF',
                filename: 'ESPECIALIDADES',
                action: newexportaction,
                exportOptions: {
                    columns: [1, 2]
                }
            }],
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
                            '<td><b>' + col.title + '</b> :' + '</td> ' +
                            '<td>' + col.data + '</td>' +
                            '</tr>' :
                            '';
                    }).join('');
                    return data ?
                        $('<table/>').append(data) :
                        false;
                }
            }
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
            url: "/especialidade",
            type: 'GET'
        },
        columns: [
            { data: 'id', name: 'id' },
            { data: 'nome', name: 'nome' },
            { data: 'descricao', name: 'descricao' },
            { data: 'acao', name: 'acao', orderable: false, searchable: false },
            { data: null, orderable: false, searchable: false, className: 'show-list-doctors', "defaultContent": '' }
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
            url: `/especialidade/${id}/edit`,
            success: function (data) {
                $('#form-update-name').val(data.nome);
                $('#form-update-description').text(data.descricao);
                countCharacters(data.descricao.length, '.count-caracter-update')
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
                url: `/especialidade/${id}`,
                data: JSON.stringify({
                    'nome': $('#form-update-name').val(),
                    'descricao': $('#form-update-description').val(),
                }),
                dataType: 'json',
                success: function (data) {
                    bootstrap.showToast({
                        body: "Especialidade editada com sucesso",
                        toastClass: "text-success-emphasis bg-success-subtle",
                        closeButtonClass: "btn-close"
                    })
                    $('#ModalEditar').modal('hide');
                    reloadDataTable('#table-datatable-especialidade');
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
                url: `/especialidade/${id}`,
                success: function (data) {
                    bootstrap.showToast({
                        body: "Especialidade excluída com sucesso",
                        toastClass: "text-success-emphasis bg-success-subtle",
                        closeButtonClass: "btn-close"
                    })
                    reloadDataTable('#table-datatable-especialidade');
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

    // datatable secundaria - lista de medicos selecionados
    $('#table-datatable-especialidade tbody').on('click', 'td.show-list-doctors', function listDoctors() {
        var tr = $(this).closest('tr');
        var row = dataTable.row(tr);
        var isRowExpanded = tr.hasClass('shown');
        if ($('.row-shown-list-doctors').length) {
            $('.row-shown-list-doctors').each(function () {
                var oldRow = dataTable.row($(this));
                if (row !== oldRow) {
                    oldRow.child.hide();
                    $(this).removeClass('shown row-shown-list-doctors');
                }
            });
        }
        if (isRowExpanded) {
            row.child.hide();
            tr.removeClass('shown row-shown-list-doctors');
        } else {
            var data = row.data();
            row.child(listDoctorsChildRow(data.id)).show();
            tr.addClass('shown row-shown-list-doctors');
            $('#table-datatable-medico').DataTable({
                aaSorting: [[0, 'desc']],
                responsive: true,
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
                    url: `/especialidade/medico/${data.id}`,
                    type: "GET"
                },
                columns: [
                    { data: 'id', name: 'id' },
                    { data: 'nome', name: 'nome' },
                    { data: 'CRM', name: 'CRM' },
                    { data: 'telefone', name: 'telefone' },
                    { data: 'email', name: 'email' },
                    { data: 'acao', name: 'acao', orderable: false, searchable: false },
                ],
            });
            listDoctorsSelectAdd(data.id);
        }
    });

    function listDoctorsChildRow(especialidadeId) {
        return `<div style="padding: 4px;margin: 2px;">
                    <div class="container-update-doctor">
                        <div class="container-list-doctor-header">
                            <h1 class="list-doctor-title">Médicos</h1>
                            <span class="icon-add-doctor" id="button-action-add-doctor"><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg></span>
                        </div>
                        <div id="container-choice-doctor-database" style="display: none">
                            <select id="select-add-choice-doctor" multiple style="display: none"></select>
                            <div class="container-buttons-action">
                                <button type="button" class="button-custom" id="button-cancel-add-doctor">CANCELAR</button>
                                <button type="button" class="button-custom" id="button-save-add-doctor" data-id_especialidade="${especialidadeId}">SALVAR</button>
                            </div>
                        </div>
                    </div>
                    <table class="highlight centered" id="table-datatable-medico" style="width:100%;">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NOME</th>
                                <th>CRM</th>
                                <th>TELEFONE</th>
                                <th>E-MAIL</th>
                                <th>AÇÃO<th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>`;
    }

    $(document).on('click', '#button-delete-doctor', function deleteEspecialidadeDoctor() {
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
                url: `/especialidade/medico/${medicoId}/${especialidadeId}`,
                success: function (data) {
                    bootstrap.showToast({
                        body: "Médico desvinculado com sucesso",
                        toastClass: "text-success-emphasis bg-success-subtle",
                        closeButtonClass: "btn-close"
                    })
                    reloadDataTable('#table-datatable-medico');
                    $('#select-add-choice-doctor').val('');
                    $('#select-add-choice-doctor').removeAttr('data-multijs');
                    $('#container-choice-doctor-database .multi-wrapper').remove()
                    $("#form-register-choice-doctor").multi();
                    listDoctorsSelectAdd(especialidadeId)
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

    $(document).on('click', '#button-action-add-doctor, #button-cancel-add-doctor', function showAddEspecialidadeDoctor() {
        if ($("#select-add-choice-doctor").find("option").length > 0) {
            $('#container-choice-doctor-database').toggle();
            return
        }
        bootstrap.showToast({
            body: "Nenhum médico disponível",
            toastClass: "text-warning-emphasis bg-warning-subtle",
            closeButtonClass: "btn-close"
        })
    })

    $(document).on('click', '#button-save-add-doctor', function registerEspecialidade() {
        var especialidadeId = $(this).data('id_especialidade');
        console.log(especialidadeId)
        var validation = true;
        var selectedOptions = $('#select-add-choice-doctor option:selected').map(function () {
            return $(this).val();
        }).get();
        if (selectedOptions.length == 0) {
            validation = false;
            bootstrap.showToast({
                body: "Selecione pelo menos um Médico",
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
                url: `/especialidade/medico/${especialidadeId}`,
                data: JSON.stringify({
                    'medicos': selectedOptions
                }),
                dataType: 'json',
                success: function (data) {
                    bootstrap.showToast({
                        body: "Médico(s) vinculados com sucesso",
                        toastClass: "text-success-emphasis bg-success-subtle",
                        closeButtonClass: "btn-close"
                    })
                    reloadDataTable('#table-datatable-especialidade');
                    limparFormRegister();
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

    function listDoctorsSelectAdd(especialidadeId) {
        $.ajax({
            url: `/especialidade/medico/select/${especialidadeId}`,
            type: 'GET',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                'Content-Type': 'application/json'
            },
            success: function (data) {
                var select = $("#select-add-choice-doctor");
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

    // cadastro de especialidade
    $('#button-create, #button-cancel-create').on('click', function showFormRegister() {
        $('.container-register').toggle();
    });

    function listDoctorsSelectCreate() {
        $.ajax({
            url: '/medico/lista',
            type: 'GET',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                'Content-Type': 'application/json'
            },
            success: function (data) {
                var select = $("#form-register-choice-doctor");
                select.empty();
                $("#form-register-choice-doctor-check").change(function () {
                    showDoctorsList(data)
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

    function showDoctorsList(data) {
        if (data.length == 0 && $('#form-register-choice-doctor-check').prop('checked')) {
            $('#form-register-choice-doctor-check').prop('checked', false)
            bootstrap.showToast({
                body: "Nenhum médico foi cadastrado ainda",
                toastClass: "text-warning-emphasis bg-warning-subtle",
                closeButtonClass: "btn-close"
            })
        } else {
            $('.container-choice-doctor').toggle();
        }
    }
    // atualiza a quantidade a quantidade de caracteres da descricao
    $('#form-register-description, #form-update-description').on('input', function () {
        var amountString = $(this)[0].textLength;
        var className = ($(this)[0].id == 'form-register-description' ? '.count-caracter-create' : '.count-caracter-update')
        countCharacters(amountString, className)
    })

    $('#button-save-create').on('click', function createEspecialidade() {
        var validation = validarInputs('.validate-form-create');
        if ($("#form-register-choice-doctor-check").prop('checked') && validation) {
            var selectedOptions = $('#form-register-choice-doctor option:selected').map(function () {
                return $(this).val();
            }).get();
            if (selectedOptions.length == 0) {
                validation = false;
                bootstrap.showToast({
                    body: "Selecione pelo menos um Médico",
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
                url: '/especialidade',
                data: JSON.stringify({
                    'nome': $('#form-register-name').val(),
                    'descricao': $('#form-register-description').val(),
                    'medicos': selectedOptions
                }),
                dataType: 'json',
                success: function (data) {
                    bootstrap.showToast({
                        body: "Especialidade cadastrada com sucesso",
                        toastClass: "text-success-emphasis bg-success-subtle",
                        closeButtonClass: "btn-close"
                    })
                    reloadDataTable('#table-datatable-especialidade');
                    limparFormRegister();
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

    function limparFormRegister() {
        $('#form-register-name, #form-register-description, #form-register-choice-doctor').val('');
        countCharacters(0, '.count-caracter-create')
        $('#form-register-choice-doctor').removeAttr('data-multijs');
        $('.container-choice-doctor .multi-wrapper').remove()
        $("#form-register-choice-doctor").multi();
    }

    function countCharacters(amountString, id) {
        amountString = amountString < 10 ? '0' + amountString : amountString;
        $(id).text(`Quantidade de caracteres: ${amountString}/45`);
        if (amountString == 45) {
            bootstrap.showToast({
                body: "Limite de caracteres alcançado",
                toastClass: "text-warning-emphasis bg-warning-subtle",
                closeButtonClass: "btn-close"
            })
        }
    }

    listDoctorsSelectCreate();
});


$(document).ready(function () {
    var dataTableEspecialidade, dataTableMedico;
    $('.relatorio-nav-item').addClass('active-button-menu');
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
            url: "/relatorio",
            type: 'GET',
            data: {
                filtroCRM: 'all'
            }
        },
        columns: [
            { data: 'id', name: 'id' },
            { data: 'nome', name: 'nome' },
            { data: 'CRM', name: 'CRM' },
            { data: 'telefone', name: 'telefone' },
            { data: 'email', name: 'email' },
            { data: 'dt_cadastro', name: 'dt_cadastro' },
            { data: 'acao', orderable: false, searchable: false, className: 'show-list-specialty' }
        ]
    });

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
                url: `/relatorio/${data.id}/listaEspecialidadesSelecionadas`,
                type: 'GET',
                data: {
                    'filtroCodigo': 'all'
                }
            },
            columns: [
                { data: 'id', name: 'id' },
                { data: 'nome', name: 'nome' },
                { data: 'descricao', name: 'descricao' },
            ],
        });
        $('#ModalDetalhes').modal('show');
        listSpecialtyFilter(data.id);
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

                        <div class="container-filtro-specialty">
                            <div class="container-list-specialty-header">
                                <div class="container-list-specialty-buttons-header">
                                    <button class="button-custom" id="button-filter-refresh-specialty" data-id_medico="${medicoId}"><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67Z"/></svg></button>
                                    <button class="button-custom" id="button-filter-specialty">FILTRO</button>
                                </div>
                            </div>
                            <div id="container-choice-specialty-datatable" style="display: none">
                                <div class="container-choice-filter-specialty">
                                    <label for="filter-codigo" class="label-input">Filtrar por Código (Especialidade)</label>
                                    <select id="filter-codigo" multiple style="display: none"></select>
                                </div>
                                <div class="container-buttons-action">
                                    <button type="button" class="button-custom" id="button-cancel-filter-specialty">CANCELAR</button>
                                    <button type="button" class="button-custom" id="button-save-filter-specialty">FILTRAR</button>
                                </div>
                            </div>
                        </div>
                        <table class="highlight" id="table-datatable-especialidade" style="width:100%;">
                            <thead>
                                <tr>
                                    <th data-priority="1">CÓDIGO</th>
                                    <th>NOME</th>
                                    <th>DESCRIÇÃO</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                        
                    </div>
                </div>
            </div>
        </div>`;
    }

    $(document).on('click', '#button-filter-refresh-doctors, #button-filter-refresh-specialty', function refreshFilters() {
        var option = $(this)[0].id;
        if (option == 'button-filter-refresh-doctors') {
            updateDataReloadDatatable(dataTableMedico, 'filtroCRM', 'all');
            $('#filter-CRM').val('');
            $('#filter-CRM').removeAttr('data-multijs');
            $('.container-choice-filter .multi-wrapper').remove()
            $("#filter-CRM").multi();
            listDoctorSelectFilter()
            return
        }
        var medicoId = $(this).data('id_medico');
        updateDataReloadDatatable(dataTableEspecialidade, 'filtroCodigo', 'all');
        $('#filter-codigo').val('');
        $('#filter-codigo').removeAttr('data-multijs');
        $('.container-choice-filter-specialty .multi-wrapper').remove()
        $("#filter-codigo").multi();
        listSpecialtyFilter(medicoId)
    });

    //FILTRO - ESPECIALIDADE
    $(document).on('click', '#button-filter-specialty, #button-cancel-filter-specialty', function viewSpecialtyFilters() {
        $('#container-choice-specialty-datatable').toggle();
        if ($('#filter-codigo').find("option").length == 0) {
            bootstrap.showToast({
                body: "Nenhum Código (Especialidade) cadastrado",
                toastClass: "text-warning-emphasis bg-warning-subtle",
                closeButtonClass: "btn-close"
            })
            $('#container-choice-specialty-datatable').toggle();
            return;
        }
    });

    $(document).on('click', '#button-save-filter-specialty', function filterSpecialty() {
        var filtrosCodigo = $('#filter-codigo option:selected').map(function () {
            return $(this).val();
        }).get();
        if (filtrosCodigo.length == 0) {
            bootstrap.showToast({
                body: "Selecione pelo menos um Código",
                toastClass: "text-warning-emphasis bg-warning-subtle",
                closeButtonClass: "btn-close"
            })
            return;
        }
        updateDataReloadDatatable(dataTableEspecialidade, 'filtroCodigo', filtrosCodigo);
    });

    // FILTRO - MEDICO
    $('#button-filter-doctors, #button-cancel-filter').on('click', function viewDoctorFilters() {
        $('.container-filter').toggle();
        $('.container-filter').toggleClass('container-filter-open');
        if ($('.container-filter').hasClass('container-filter-open')) {
            if ($('#filter-CRM').find("option").length == 0) {
                bootstrap.showToast({
                    body: "Nenhum CRM (Médico) cadastrado",
                    toastClass: "text-warning-emphasis bg-warning-subtle",
                    closeButtonClass: "btn-close"
                })
            }
        }
    });

    $('#button-save-filter').on('click', function filterDoctors() {
        var filtrosCRM = $('#filter-CRM').map(function () {
            return $(this).val();
        }).get();
        if (filtrosCRM.length == 0) {
            bootstrap.showToast({
                body: "Selecione pelo menos um CRM",
                toastClass: "text-warning-emphasis bg-warning-subtle",
                closeButtonClass: "btn-close"
            })
            return;
        }
        updateDataReloadDatatable(dataTableMedico, 'filtroCRM', filtrosCRM);
    });

    function listSpecialtyFilter(medicoId) {
        $.ajax({
            url: `/medico/${medicoId}/listaEspecialidadesSelecionadas`,
            type: 'GET',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                'Content-Type': 'application/json'
            },
            success: function (data) {
                var select = $("#filter-codigo");
                select.empty();
                $.each(data, function (key, value) {
                    select.append($('<option></option>').val(value.id).text(`${value.id} - ${value.nome}`));
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

    function listDoctorSelectFilter() {
        $.ajax({
            url: `/medico/lista`,
            type: 'GET',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                'Content-Type': 'application/json'
            },
            success: function (data) {
                var select = $("#filter-CRM");
                select.empty();
                $.each(data, function (key, value) {
                    select.append($('<option></option>').val(value.CRM).text(`${value.CRM} - ${value.nome}`));
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

    listDoctorSelectFilter();
});


function validarInputs(inputs) {
    var inputs = $(inputs);
    var formValid = true;
    inputs.each(function () {
        var input = $(this);
        formValid = (input.val() === "" ? false : formValid);
    });
    if (!formValid) {
        bootstrap.showToast({
            body: "Preencha os campos obrigatórios",
            toastClass: "text-warning-emphasis bg-warning-subtle",
            closeButtonClass: "btn-close"
        })
    }
    return formValid;
}

var checkDaughterResponsive = false;

function checkDaughterResponsiveActive() {
    var intervalVerificacao = setInterval(function () {
        if ($('.dt-hasChild.parent').length === 0) {
            checkDaughterResponsive = false;
            clearInterval(intervalVerificacao);
        } else {
            checkDaughterResponsive = true;
        }
    }, 1000);
}

function lockEventButtonResponsive(action) {
    $('.sorting_1.dtr-control').css('pointer-events', (action ? 'all' : 'none'));
}

function updateDataReloadDatatable(table, dataName, data) {
    table.clear().draw();
    const ajaxData = {};
    ajaxData[dataName] = data;
    table.settings()[0].ajax.data = ajaxData;
    table.ajax.reload();
}
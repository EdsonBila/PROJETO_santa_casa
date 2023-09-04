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

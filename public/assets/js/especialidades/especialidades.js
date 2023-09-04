console.log(2)
// simple example
document.getElementById("button-show-simple").addEventListener("click", function () {
    bootstrap.showToast({body: "Hello Toast!"})
})
document.getElementById("button-show-info").addEventListener("click", function () {
    const toast = bootstrap.showToast({
        header: "Information",
        headerSmall: "just now",
        body: "<p>This notification has a headline and more text than the previous one.</p><div><button class='btn btn-primary me-1 btn-sm'>Click me</button><button class='btn btn-secondary btn-sm' data-bs-dismiss='toast'>Close</button></div>",
        delay: 20000
    })
    toast.element.querySelector(".btn-primary").addEventListener("click", () => {
        bootstrap.showToast({
            body: "Thank you for clicking", direction: "append",
            toastClass: "text-bg-success", closeButtonClass: "btn-close-white"
        })
    })
})
document.getElementById("button-show-danger").addEventListener("click", function () {
    bootstrap.showToast({
        header: "Alert",
        body: "Red Alert!",
        toastClass: "text-bg-danger"
    })
})
document.getElementById("button-show-sticky").addEventListener("click", function () {
    bootstrap.showToast({
        body: "This notification will stay", toastClass: "text-bg-secondary", closeButtonClass: "btn-close-white", delay: Infinity
    })
})
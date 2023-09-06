$(document).ready(function () {
    doctorsBySpecialtyChart()
    function doctorsBySpecialtyChart() {
        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                'Content-Type': 'application/json'
            },
            type: 'GET',
            url: '/home/grafico/medicosPorEspecialidade',
            dataType: 'json',
            success: function (data) {
                Highcharts.chart('medicosPorEspecialidade-container', {
                    chart: {
                        type: 'bar'
                    },
                    title: {
                        text: 'Número de Médicos por Especialidade'
                    },
                    xAxis: {
                        categories: data.categories,
                        title: {
                            text: null
                        },
                        gridLineWidth: 1,
                        lineWidth: 0
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Número de Médicos'
                        },
                        labels: {
                            overflow: 'justify'
                        },
                        gridLineWidth: 0
                    },
                    plotOptions: {
                        bar: {
                            borderRadius: '50%',
                            dataLabels: {
                                enabled: true
                            },
                            groupPadding: 0.1
                        }
                    },
                    series: [{
                        name: 'Médicos',
                        data: data.medicosPorEspecialidade
                    }]
                });
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

});

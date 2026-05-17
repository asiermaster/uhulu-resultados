let graficoResultados;
window.addEventListener('DOMContentLoaded', event => {
    addEventSidebarButton();
    addEventParticipantes();

    // Close sidebar on mobile after selecting a participant
    if (window.innerWidth <= 768) {
        document.querySelectorAll("[id^='participante_']").forEach(function (card) {
            card.addEventListener('click', function () {
                document.querySelector("#sidebar").classList.add("collapsed");
            });
        });
    }
});

function addEventSidebarButton() {
    const toggler = document.querySelector(".btn-navbar-toggle");
    const sidebar = document.querySelector("#sidebar");

    if (!toggler) return;

    toggler.addEventListener("click", function () {
        sidebar.classList.toggle("collapsed");
    });

    if (window.innerWidth <= 768) {
        toggler.click();
    }
}

function addEventParticipantes() {
    document.querySelectorAll("[id^='participante_']").forEach(function (participanteCard) {
        participanteCard.addEventListener('click', event => {
            event.preventDefault();
            var idEvent = event.currentTarget.getAttribute('id');
            var userName = event.currentTarget.querySelector('p').getHTML();
            $(function () {
                changeResultTitle(userName);
                addChart(idEvent.split('_')[1]);
                window.scrollTo(0, 0);
            });
        });
    });
}

function changeResultTitle(userName) {
    $("#resultadosTitle").html("Clasificaciones " + userName);
}

function addChart(idparticipante) {
    const ctx = document.getElementById('resultChart');

    var clasificacionesParticipante = clasificacionYear.filter(function (cy) {
        return cy.participante_id == idparticipante;
    });
    if (graficoResultados) {
        graficoResultados.destroy();
    }
    graficoResultados = new Chart(ctx, {
        type: 'line',
        data: {
            labels: clasificacionesParticipante.map(function (cp) { return cp.year_id; }),
            datasets: [{
                label: 'Posición',
                data: clasificacionesParticipante.map(function (cp) { return cp.posicion; }),
                borderWidth: 1
            }]
        },
        options: {
            animation: {
                y: {
                    duration: 2000
                }
            },
            scales: {
                y: {
                    min: 1,
                    reverse: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

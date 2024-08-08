let graficoResultados;
window.addEventListener('DOMContentLoaded', event => {

    var $table = $('#tableHisEdi');
    var $tablePuntos =  $('#tablePuntos');

    $(function () {
      $table.bootstrapTable({});
      $tablePuntos.bootstrapTable({});
    });
    // Side bar events
    addToggleSideBar();
    //Go to default
    addEventParticipantes();

});


function addToggleSideBar(){
    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }
}

function addEventParticipantes(){
    document.body.querySelectorAll("[id^='participante_']").forEach(function (participanteCard) {
        participanteCard.addEventListener('click', event => {
            event.preventDefault();
            var idEvent = new String(event.currentTarget.getAttribute('id')).toString();
            var userName = event.currentTarget.querySelector('p').getHTML();
            $(function () {
                changeResultTitle(userName);
                addChart(idEvent.toString().split('_')[1]);
                window.scrollTo(0, 0);
              })
            
        });
    });
}

function changeResultTitle(userName){
    $("#resultadosTitle").html("Clasificaciones " + userName);
}

function addChart(idparticipante){
    const ctx = document.getElementById('resultChart');

    clasificacionesParticipante = clasificacionYear.filter(cy => cy.participante_id==idparticipante);
    if (graficoResultados) {
        graficoResultados.destroy();
    }
    graficoResultados = new Chart(ctx, {
        type: 'line',
        data: {
        labels: clasificacionesParticipante.map(cp => cp.year_id),
        datasets: [{
            label: 'Posición',
            data: clasificacionesParticipante.map(cp => cp.posicion),
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
                    reverse:true,
                    ticks: {
                        stepSize: 1,
                    }
                }
            }
        }
    });
}

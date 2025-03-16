window.addEventListener('DOMContentLoaded', event => {

    var $table = $('#tableHisEdi');
    var $tablePuntos =  $('#tablePuntos');
    $(function () {
        $table.bootstrapTable({});
        $tablePuntos.bootstrapTable({});
      });

    addEventSidebarButton();
    addEventCampeonatoDelMundo()

    goToDefaultPage()

});



function addEventSidebarButton() {
    const toggler = document.querySelector(".btn");
    toggler.addEventListener("click", function () {
        document.querySelector("#sidebar").classList.toggle("collapsed");
    });
}

function goToDefaultPage(){
    const sidebarMenu = document.body.querySelector('#campeonatos_mundo');
    sidebarMenu.click();
}

function addEventCampeonatoDelMundo(){
    const sidebarMenu = document.body.querySelector('#campeonatos_mundo');
    if (sidebarMenu) {
        sidebarMenu.addEventListener('click', event => {
            event.preventDefault();
            $(function () {
                loadCampeonatoDelMundo(sidebarMenu);
              })
            
        });
    }
}

function loadCampeonatoDelMundo(sidebarMenu){
    var $table = $('#tableHisEdi');
    $table.bootstrapTable('load', historico_clasificaciones_year);
    $table.bootstrapTable('sortBy', {field: 'posicion', sortOrder: 'asc'});
    var $tablePuntos =  $('#tablePuntos');
    $tablePuntos.bootstrapTable('load', puntos_totales);
    $tablePuntos.bootstrapTable('sortBy', {field: 'posicion', sortOrder: 'asc'});
    
    $("#medalleroTitle").html("Medallero");
    $("#puntosTitle").html("Puntos histórico");

    $("#titlePagina").html(sidebarMenu.innerText);
}




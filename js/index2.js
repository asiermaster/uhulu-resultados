window.addEventListener('DOMContentLoaded', event => {

    var $table = $('#tableMedallero');
    var $tablePuntos =  $('#tablePuntos');
    $(function () {
        $table.bootstrapTable({});
        $tablePuntos.bootstrapTable({});
      });

    // Side bar menu events
    addEventSidebarButton();
    addEventCampeonatoDelMundo()
    addEventMedalleroHistorico();
    addEventMedalleroYear();

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
    var $table = $('#tableMedallero');
    $table.bootstrapTable('load', historico_clasificaciones_year);
    $table.bootstrapTable('sortBy', {field: 'posicion', sortOrder: 'asc'});
    var $tablePuntos =  $('#tablePuntos');
    $tablePuntos.bootstrapTable('load', puntos_totales);
    $tablePuntos.bootstrapTable('sortBy', {field: 'posicion', sortOrder: 'asc'});
    
    $("#medalleroTitle").html("Medallero");
    $("#puntosTitle").html("Puntos histórico");

    $("#titlePagina").html(sidebarMenu.innerText);
}

function addEventMedalleroHistorico(){
    const sidebarMealleroHist = document.body.querySelector('#medallero_historico');
    if (sidebarMealleroHist) {
        sidebarMealleroHist.addEventListener('click', event => {
            event.preventDefault();
            $(function () {
                loadMedalleroHistorico();
              })
            
        });
    }
}

function loadMedalleroHistorico(){
    var $table = $('#tableMedallero');
    $table.bootstrapTable('load', medalleroHistorico);
    $table.bootstrapTable('sortBy', {field: 'posicion', sortOrder: 'asc'});
    var $tablePuntos =  $('#tablePuntos');
    $tablePuntos.bootstrapTable('load', puntos_totales);
    $tablePuntos.bootstrapTable('sortBy', {field: 'posicion', sortOrder: 'asc'});

    $("#medalleroTitle").html("Medallero histórico");
    $("#puntosTitle").html("Puntos histórico");
}

function addEventMedalleroYear(){
    document.body.querySelectorAll("[id^='medallero_20']").forEach(function (sidebarMealleroYear) {
        sidebarMealleroYear.addEventListener('click', event => {
            event.preventDefault();
            var idEvent = event.currentTarget.getAttribute('id');
            $(function () {
                loadMedalleroYear(idEvent.substr(idEvent.length - 4));
              })
            
        });
    });
}

function loadMedalleroYear(year){
    var $table = $('#tableMedallero');
    $table.bootstrapTable('load', window["medallero" + year]);
    $table.bootstrapTable('sortBy', {field: 'posicion', sortOrder: 'asc'});
    var $tablePuntos =  $('#tablePuntos');
    $tablePuntos.bootstrapTable('load', window["puntos" + year]);
    $tablePuntos.bootstrapTable('sortBy', {field: 'posicion', sortOrder: 'asc'});
    $("#medalleroTitle").html("Medallero " + year);
    $("#puntosTitle").html("Puntos " + year);
    window.scrollTo(0, 0);
}




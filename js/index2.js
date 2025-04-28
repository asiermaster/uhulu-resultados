window.addEventListener('DOMContentLoaded', event => {

    hideEveryRow();

    initTables();

    // Side bar menu events
    addEventSidebarButton();
    addEventCampeonatoDelMundo()
    addEventMedalleroHistorico();
    addEventMedalleroYear();
    addEventMejorPeor();
    addEventTop10();

    goToDefaultPage();
    

});

function initTables() {
    var $table = $('#tableMedallero');
    var $tablePuntos = $('#tablePuntos');
    var $tableMejorPeor = $('#tableMejorPeor');
    var $tableTop10 = $('#tableTop10');


    $table.bootstrapTable({});
    $tablePuntos.bootstrapTable({});
    $tableMejorPeor.bootstrapTable({});
    $tableMejorPeor.bootstrapTable('load', ultimo_competicion_veces);
    $tableMejorPeor.bootstrapTable('sortBy', { field: 'posicion', sortOrder: 'asc' });
    $tableMejorPeor.find('tbody tr').each(function (index) {
        // Apply gold color to the first row (index 0)
        if (index === 0) {
            $(this).addClass('bg-gold');
        }

        // Apply silver color to the second row (index 1)
        else if (index === 1) {
            $(this).addClass('bg-silver');
        }

        // Apply bronze color to the third row (index 2)
        else if (index === 2) {
            $(this).addClass('bg-bronze');
        }
    });
    $tableTop10.bootstrapTable({});
    $tableTop10.bootstrapTable('load', top10posicionestropela);
    $tableTop10.bootstrapTable('sortBy', { field: 'posiciontropela', sortOrder: 'asc' });
    $tableTop10.find('tbody tr').each(function (index) {
        // Apply gold color to the first row (index 0)
        if (index === 0) {
            $(this).addClass('bg-gold');
        }

        // Apply silver color to the second row (index 1)
        else if (index === 1) {
            $(this).addClass('bg-silver');
        }

        // Apply bronze color to the third row (index 2)
        else if (index === 2) {
            $(this).addClass('bg-bronze');
        }
    });
}

function hideEveryRow(){
    $('#rowMedalleros').hide();
    $('#rowMejorPeor').hide();
    $('#rowTop10').hide();
}

function showMedalleroRow(){
    $('#rowMedalleros').show();
}

function addEventSidebarButton() {
    const toggler = document.querySelector(".btn");
    toggler.addEventListener("click", function () {
        document.querySelector("#sidebar").classList.toggle("collapsed");
    });
    if (window.innerWidth <= 768) { // typical mobile threshold
        toggler.click();
      }
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
                hideEveryRow();
                showMedalleroRow();
                loadCampeonatoDelMundo(sidebarMenu);
              })
            
        });
    }
}


function loadCampeonatoDelMundo(sidebarMenu){
    var $table = $('#tableMedallero');
    $table.bootstrapTable('load', []);
    $table.bootstrapTable('load', historico_clasificaciones_year);
    $table.bootstrapTable('sortBy', {field: 'posicion', sortOrder: 'asc'});
    var $tablePuntos =  $('#tablePuntos');
    $tablePuntos.bootstrapTable('load', []);
    $tablePuntos.bootstrapTable('load', puntos_totales);
    $tablePuntos.bootstrapTable('sortBy', {field: 'posicion', sortOrder: 'asc'});
    
    $("#medalleroTitle").html("Medallero campeonatos del mundo");
    $("#puntosTitle").html("Puntos histórico");

}

function addEventMedalleroHistorico(){
    const sidebarMealleroHist = document.body.querySelector('#medallero_historico');
    if (sidebarMealleroHist) {
        sidebarMealleroHist.addEventListener('click', event => {
            event.preventDefault();
            $(function () {
                hideEveryRow();
                showMedalleroRow();
                loadMedalleroHistorico();
              })
            
        });
    }
}

function loadMedalleroHistorico(){
    var $table = $('#tableMedallero');
    $table.bootstrapTable('load', []);
    $table.bootstrapTable('load', medalleroHistorico);
    $table.bootstrapTable('sortBy', {field: 'posicion', sortOrder: 'asc'});
    var $tablePuntos =  $('#tablePuntos');
    $tablePuntos.bootstrapTable('load', []);
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
                hideEveryRow();
                showMedalleroRow();
                loadMedalleroYear(idEvent.substr(idEvent.length - 4));
              })
            
        });
    });
}

function loadMedalleroYear(year){
    var $table = $('#tableMedallero');
    $table.bootstrapTable('load', []);
    $table.bootstrapTable('load', window["medallero" + year]);
    $table.bootstrapTable('sortBy', {field: 'posicion', sortOrder: 'asc'});
    var $tablePuntos =  $('#tablePuntos');
    $tablePuntos.bootstrapTable('load', []);
    $tablePuntos.bootstrapTable('load', window["puntos" + year]);
    $tablePuntos.bootstrapTable('sortBy', {field: 'posicion', sortOrder: 'asc'});
    $("#medalleroTitle").html("Medallero " + year);
    $("#puntosTitle").html("Puntos " + year);
    window.scrollTo(0, 0);
}


function addEventMejorPeor(){
    const sidebarMenu = document.body.querySelector('#mejorpeor');
    if (sidebarMenu) {
        sidebarMenu.addEventListener('click', event => {
            event.preventDefault();
            $(function () {
                hideEveryRow();
                $('#rowMejorPeor').show();
              })
            
        });
    }
}

function addEventTop10(){
    const sidebarMenu = document.body.querySelector('#top10');
    if (sidebarMenu) {
        sidebarMenu.addEventListener('click', event => {
            event.preventDefault();
            $(function () {
                hideEveryRow();
                $('#rowTop10').show();
              })
            
        });
    }
}

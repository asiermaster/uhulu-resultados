/*!
* Start Bootstrap - Simple Sidebar v6.0.6 (https://startbootstrap.com/template/simple-sidebar)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-simple-sidebar/blob/master/LICENSE)
*/
// 
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    var $table = $('#tableHisEdi');
    var $tablePuntos =  $('#tablePuntos');

    $(function () {
      $table.bootstrapTable({});
      $tablePuntos.bootstrapTable({});
    });
    // Side bar events
    addToggleSideBar();
    addEventMedalleroHistorico();
    addEventMedalleroYear();
    //Go to default
    goToDefaultMedallero();

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

function loadMedalleroHistorico(){
    var $table = $('#tableHisEdi');
    $table.bootstrapTable('load', medalleroHistorico);
    $table.bootstrapTable('sortBy', {field: 'posicion', sortOrder: 'asc'});
    var $tablePuntos =  $('#tablePuntos');
    $tablePuntos.bootstrapTable('load', puntos_totales);
    $tablePuntos.bootstrapTable('sortBy', {field: 'posicion', sortOrder: 'asc'});

    $("#medalleroTitle").html("Medallero histórico");
    $("#puntosTitle").html("Puntos histórico");
}

function loadMedalleroYear(year){
    var $table = $('#tableHisEdi');
    $table.bootstrapTable('load', window["medallero" + year]);
    $table.bootstrapTable('sortBy', {field: 'posicion', sortOrder: 'asc'});
    var $tablePuntos =  $('#tablePuntos');
    $tablePuntos.bootstrapTable('load', window["puntos" + year]);
    $tablePuntos.bootstrapTable('sortBy', {field: 'posicion', sortOrder: 'asc'});
    $("#medalleroTitle").html("Medallero " + year);
    $("#puntosTitle").html("Puntos " + year);
}

function goToDefaultMedallero(){
    const sidebarMealleroHist = document.body.querySelector('#medallero_historico');
    sidebarMealleroHist.click();
}

function puntosRowStyle(row, index) {
    var classes = [
      'bg-gold',
      'bg-silver',
      'bg-bronze'
    ];

    if (row.posicion <4) {
      return {
        classes: classes[row.posicion-1]
      }
    }
    return {
      
    }
  }
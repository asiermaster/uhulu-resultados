/*!
* Start Bootstrap - Simple Sidebar v6.0.6 (https://startbootstrap.com/template/simple-sidebar)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-simple-sidebar/blob/master/LICENSE)
*/
// 
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    var $table = $('#tableHisEdi')

    $(function () {
      $table.bootstrapTable({});
    });

    // Side bar events
    addToggleSideBar();
    addEventMedalleroHistorico();
    addEventMedallero2024();
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

function addEventMedallero2024(){
    const sidebarMeallero2024 = document.body.querySelector('#medallero_2024');
    if (sidebarMeallero2024) {
        sidebarMeallero2024.addEventListener('click', event => {
            event.preventDefault();
            $(function () {
                loadMedallero2024();
              })
            
        });
    }
}

function loadMedalleroHistorico(){
    var $table = $('#tableHisEdi');
    $table.bootstrapTable('load', medalleroHistorico);
    $table.bootstrapTable('sortBy', {field: 'posicion', sortOrder: 'asc'});
    $("#tableTitle").html("Medallero histórico");
}

function loadMedallero2024(){
    var $table = $('#tableHisEdi');
    $table.bootstrapTable('load', medallero2024);
    $table.bootstrapTable('sortBy', {field: 'posicion', sortOrder: 'asc'});
    $("#tableTitle").html("Medallero 2024");
}

function goToDefaultMedallero(){
    const sidebarMealleroHist = document.body.querySelector('#medallero_historico');
    sidebarMealleroHist.click();
}

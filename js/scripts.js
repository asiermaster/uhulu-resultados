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
    addEventMedalleroHistorico();
    addEventMedallero2024();
    //Go to default
    goToDefaultMedallero();

});

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
}

function loadMedallero2024(){
    var $table = $('#tableHisEdi');
    $table.bootstrapTable('load', medallero2024);
    $table.bootstrapTable('sortBy', {field: 'posicion', sortOrder: 'asc'});
}

function goToDefaultMedallero(){
    const sidebarMealleroHist = document.body.querySelector('#medallero_historico');
    sidebarMealleroHist.click();
}

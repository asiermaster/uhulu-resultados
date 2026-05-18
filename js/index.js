function medallasFormatter(value, row, index, field) {
    var iconos = { oro: '\u{1F947}', plata: '\u{1F948}', bronce: '\u{1F949}' };
    var label = { oro: 'Oro', plata: 'Plata', bronce: 'Bronce' };
    return '<span class="badge-medal ' + (field === 'oro' ? 'bg-gold' : field === 'plata' ? 'bg-silver' : 'bg-bronze') + '"><span class="medal-icon">' + (iconos[field] || '') + '</span> ' + value + '</span>';
}

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

    // Close sidebar on mobile after selecting a section
    if (window.innerWidth <= 768) {
        document.querySelectorAll('.sidebar-link:not([data-bs-toggle])').forEach(function(link) {
            link.addEventListener('click', function() {
                document.querySelector("#sidebar").classList.add("collapsed");
            });
        });
    }

    // Navigate to section from query param (e.g. from participantes.html), or default to campeonatos
    var params = new URLSearchParams(window.location.search);
    var section = params.get('section');
    if (section) {
        var target = document.getElementById(section);
        if (target) {
            target.click();
        } else {
            goToDefaultPage();
        }
        history.replaceState(null, '', window.location.pathname);
    } else {
        goToDefaultPage();
    }
    

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

function setActiveSidebarLink(element) {
    document.querySelectorAll('.sidebar-link').forEach(function(link) {
        link.classList.remove('active');
    });
    element.classList.add('active');
}

function hideEveryRow(){
    $('#rowMedalleros').hide().removeClass('row-fade-in');
    $('#rowMejorPeor').hide().removeClass('row-fade-in');
    $('#rowTop10').hide().removeClass('row-fade-in');
}

function showMedalleroRow(){
    $('#rowMedalleros').show().addClass('row-fade-in');
}

function addEventSidebarButton() {
    const toggler = document.querySelector(".btn");
    const sidebar = document.querySelector("#sidebar");

    toggler.addEventListener("click", function () {
        sidebar.classList.toggle("collapsed");
    });

    if (window.innerWidth <= 768) {
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
            setActiveSidebarLink(event.currentTarget);
            $(function () {
                hideEveryRow();
                showMedalleroRow();
                loadCampeonatoDelMundo(sidebarMenu);
              })
            
        });
    }
}


function loadCampeonatoDelMundo(sidebarMenu){
    hideYearNav();
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
            setActiveSidebarLink(event.currentTarget);
            $(function () {
                hideEveryRow();
                showMedalleroRow();
                loadMedalleroHistorico();
              })
            
        });
    }
}

function loadMedalleroHistorico(){
    hideYearNav();
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
            setActiveSidebarLink(event.currentTarget);
            var idEvent = event.currentTarget.getAttribute('id');
            $(function () {
                hideEveryRow();
                showMedalleroRow();
                loadMedalleroYear(idEvent.substr(idEvent.length - 4));
              })
            
        });
    });
}

var medalleroYears = [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007];

function renderYearNav(currentYear) {
    var nav = document.getElementById('yearNav');
    if (!nav) return;

    currentYear = parseInt(currentYear);
    var idx = medalleroYears.indexOf(currentYear);
    if (idx === -1) return;

    var prevYear = medalleroYears[(idx - 1 + medalleroYears.length) % medalleroYears.length];
    var nextYear = medalleroYears[(idx + 1) % medalleroYears.length];

    var html = '<div class="year-nav-inner">';
    html += '  <button class="btn-year-prev" data-year="' + prevYear + '">\u25C0</button>';
    html += '  <select class="year-select">';
    for (var i = 0; i < medalleroYears.length; i++) {
        var sel = medalleroYears[i] === currentYear ? ' selected' : '';
        html += '    <option value="' + medalleroYears[i] + '"' + sel + '>' + medalleroYears[i] + '</option>';
    }
    html += '  </select>';
    html += '  <button class="btn-year-next" data-year="' + nextYear + '">\u25B6</button>';
    html += '</div>';

    nav.innerHTML = html;
    nav.style.display = 'block';

    nav.querySelector('.btn-year-prev').addEventListener('click', function () {
        navigateToYear(parseInt(this.getAttribute('data-year')));
    });
    nav.querySelector('.btn-year-next').addEventListener('click', function () {
        navigateToYear(parseInt(this.getAttribute('data-year')));
    });
    nav.querySelector('.year-select').addEventListener('change', function () {
        navigateToYear(parseInt(this.value));
    });
}

function hideYearNav() {
    var nav = document.getElementById('yearNav');
    if (nav) nav.style.display = 'none';
}

function navigateToYear(year) {
    hideEveryRow();
    showMedalleroRow();
    var sidebarLink = document.getElementById('medallero_' + year);
    if (sidebarLink) setActiveSidebarLink(sidebarLink);
    loadMedalleroYear(year);
}

function loadMedalleroYear(year){
    var $table = $('#tableMedallero');
    $table.bootstrapTable('load', []);
    $table.bootstrapTable('load', window["medallero" + year]);
    $table.bootstrapTable('sortBy', {field: 'posicion', sortOrder: 'asc'});
    var $tablePuntos =  $('#tablePuntos');
    $tablePuntos.bootstrapTable('load', []);
    if ("puntos" + year in window) {
        $tablePuntos.bootstrapTable('load', window["puntos" + year]);
        $tablePuntos.bootstrapTable('sortBy', {field: 'posicion', sortOrder: 'asc'});
    }
    
    $("#medalleroTitle").html("Medallero " + year);
    $("#puntosTitle").html("Puntos " + year);
    renderYearNav(year);
    window.scrollTo(0, 0);
}


function addEventMejorPeor(){
    const sidebarMenu = document.body.querySelector('#mejorpeor');
    if (sidebarMenu) {
        sidebarMenu.addEventListener('click', event => {
            event.preventDefault();
            setActiveSidebarLink(event.currentTarget);
            $(function () {
                hideEveryRow();
                $('#rowMejorPeor').show().addClass('row-fade-in');
              })
            
        });
    }
}

function addEventTop10(){
    const sidebarMenu = document.body.querySelector('#top10');
    if (sidebarMenu) {
        sidebarMenu.addEventListener('click', event => {
            event.preventDefault();
            setActiveSidebarLink(event.currentTarget);
            $(function () {
                hideEveryRow();
                $('#rowTop10').show().addClass('row-fade-in');
              })
            
        });
    }
}

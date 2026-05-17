(function() {
    var isParticipantes = window.location.pathname.indexOf('participantes') !== -1;
    var link = function(id, icon, text) {
        var url = '#';
        if (isParticipantes && id && id !== 'participantes' && id !== 'mejorpeor' && id !== 'top10') url = 'index.html?section=' + id;
        if (id === 'participantes') url = isParticipantes ? '#' : 'participantes.html';
        if (id === 'top10' || id === 'mejorpeor') url = isParticipantes ? 'index.html?section=' + id : '#';
        var active = isParticipantes && id === 'participantes' ? ' active' : '';
        return '<li class="sidebar-item"><a href="' + url + '" class="sidebar-link' + active + '" id="' + id + '">' + icon + ' ' + text + '</a></li>';
    };
    var yearLink = function(year) {
        var url = isParticipantes ? 'index.html?section=medallero_' + year : '#!';
        return '<li class="sidebar-item sidebar-multilevel"><a id="medallero_' + year + '" href="' + url + '" class="sidebar-link">' + year + '</a></li>';
    };
    var decade = function(id, label, years) {
        var html = '<li class="sidebar-item"><a href="#" class="sidebar-link collapsed" data-bs-toggle="collapse" data-bs-target="#' + id + '">' + label + '</a>';
        html += '<ul id="' + id + '" class="sidebar-dropdown list-unstyled collapse">';
        for (var i = 0; i < years.length; i++) {
            html += yearLink(years[i]);
        }
        html += '</ul></li>';
        return html;
    };

    var html = '';
    html += '<div class="h-100">';
    html += '<div class="sidebar-logo"><a href="index.html">Peña Astopotro</a></div>';
    html += '<ul class="sidebar-nav">';

    html += '<li class="sidebar-header">Medalleros</li>';
    html += link('campeonatos_mundo', '🏆', 'Campeonato del mundo');
    html += link('medallero_historico', '🏅', 'Medallero histórico');

    html += '<li class="sidebar-item"><a href="#" class="sidebar-link collapsed" data-bs-toggle="collapse" data-bs-target="#decadas" aria-expanded="false" aria-controls="decadas">📅 Medallero décadas</a>';
    html += '<ul id="decadas" class="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">';
    html += decade('decada2020', 'Década 2020', [2025, 2024, 2023, 2022, 2021, 2020]);
    html += decade('decada2010', 'Década 2010', [2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010]);
    html += decade('decada2000', 'Década 2000', [2009, 2008, 2007]);
    html += '</ul></li>';

    html += '<li class="sidebar-header">Estadísticas</li>';
    if (isParticipantes) {
        html += '<li class="sidebar-item">';
        html += '<a href="#" class="sidebar-link active" data-bs-toggle="collapse" data-bs-target="#participantList" aria-expanded="true">🚴 Participantes</a>';
        html += '<ul id="participantList" class="sidebar-dropdown list-unstyled collapse show"></ul>';
        html += '</li>';
    } else {
        html += link('participantes', '🚴', 'Participantes');
    }
    html += link('top10', '📊', 'Top 10 posiciones');
    html += link('mejorpeor', '😂', 'Cuanto peor mejor');

    html += '</ul></div>';

    document.currentScript.parentElement.innerHTML = html;
})();

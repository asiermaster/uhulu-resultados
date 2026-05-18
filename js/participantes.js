let graficoResultados;

window.addEventListener('DOMContentLoaded', function () {
    addEventSidebarButton();
    renderParticipantList();

    if (participantes.length > 0) {
        showParticipant(participantes[0].id);
    }
});

function addEventSidebarButton() {
    var toggler = document.querySelector(".btn-navbar-toggle");
    var sidebar = document.querySelector("#sidebar");

    if (!toggler) return;

    toggler.addEventListener("click", function () {
        sidebar.classList.toggle("collapsed");
    });

    if (window.innerWidth <= 768) {
        toggler.click();
    }
}

function renderParticipantList() {
    var container = document.getElementById('participantList');
    if (!container) return;

    var html = '';
    for (var i = 0; i < participantes.length; i++) {
        html += '<li class="sidebar-item sidebar-multilevel">';
        html += '<a href="#" class="sidebar-link participant-link" data-id="' + participantes[i].id + '">' + participantes[i].nombre + '</a>';
        html += '</li>';
    }
    container.innerHTML = html;

    var links = container.querySelectorAll('.participant-link');
    for (var j = 0; j < links.length; j++) {
        links[j].addEventListener('click', function (e) {
            e.preventDefault();
            showParticipant(parseInt(this.getAttribute('data-id')));
        });
    }
}

function computeStats(nombre) {
    var rows = [];
    for (var i = 0; i < clasificacionYear.length; i++) {
        if (clasificacionYear[i].username == nombre && clasificacionYear[i].posicion !== null) {
            rows.push(clasificacionYear[i]);
        }
    }

    if (rows.length === 0) {
        return {
            medallas: { oro: 0, plata: 0, bronce: 0 },
            mejor: '-',
            peor: '-',
            media: '-',
            years: [],
            historial: []
        };
    }

    var medallas = { oro: 0, plata: 0, bronce: 0 };
    var positions = [];
    for (var j = 0; j < rows.length; j++) {
        positions.push(rows[j].posicion);
        if (rows[j].posicion === 1) medallas.oro++;
        else if (rows[j].posicion === 2) medallas.plata++;
        else if (rows[j].posicion === 3) medallas.bronce++;
    }

    var mejor = Math.min.apply(null, positions);
    var peor = Math.max.apply(null, positions);
    var sum = 0;
    for (var k = 0; k < positions.length; k++) sum += positions[k];
    var media = (sum / positions.length).toFixed(1);

    var yearSet = {};
    for (var m = 0; m < rows.length; m++) {
        yearSet[rows[m].year] = true;
    }
    var years = Object.keys(yearSet).map(Number).sort(function (a, b) { return b - a; });

    var historial = [];
    for (var n = 0; n < rows.length; n++) {
        historial.push({ year: rows[n].year, pos: rows[n].posicion });
    }
    historial.sort(function (a, b) { return b.year - a.year; });

    return { medallas: medallas, mejor: mejor, peor: peor, media: media, years: years, historial: historial };
}

function showParticipant(id) {
    // Active state on participant links
    var links = document.querySelectorAll('.participant-link');
    for (var i = 0; i < links.length; i++) {
        if (parseInt(links[i].getAttribute('data-id')) === id) {
            links[i].classList.add('active');
        } else {
            links[i].classList.remove('active');
        }
    }

    // Close sidebar on mobile
    if (window.innerWidth <= 768) {
        document.querySelector("#sidebar").classList.add("collapsed");
    }

    var participante = null;
    var currentIndex = -1;
    for (var j = 0; j < participantes.length; j++) {
        if (participantes[j].id === id) {
            participante = participantes[j];
            currentIndex = j;
            break;
        }
    }
    if (!participante) return;

    var stats = computeStats(participante.nombre);
    renderProfile(participante, stats, currentIndex, participantes);
    addChart(participante.nombre);
}

function renderProfile(participante, stats, currentIndex, participantes) {
    var container = document.getElementById('participantProfile');

    var medalHtml = '';
    if (stats.medallas.oro > 0) medalHtml += stats.medallas.oro + '\u{1F947} ';
    if (stats.medallas.plata > 0) medalHtml += stats.medallas.plata + '\u{1F948} ';
    if (stats.medallas.bronce > 0) medalHtml += stats.medallas.bronce + '\u{1F949}';
    if (medalHtml === '') medalHtml = '-';

    var yearsRange = stats.years.length > 0
        ? Math.min.apply(null, stats.years) + '-' + Math.max.apply(null, stats.years)
        : '-';

    var prevId = participantes[(currentIndex - 1 + participantes.length) % participantes.length].id;
    var nextId = participantes[(currentIndex + 1) % participantes.length].id;

    var html = '';

    // Navigation
    html += '<div class="profile-nav">';
    html += '  <button class="btn-nav-prev" data-id="' + prevId + '">\u25C0</button>';
    html += '  <select class="participant-select">';
    for (var i = 0; i < participantes.length; i++) {
        var sel = (i === currentIndex) ? ' selected' : '';
        html += '    <option value="' + participantes[i].id + '"' + sel + '>' + participantes[i].nombre + '</option>';
    }
    html += '  </select>';
    html += '  <button class="btn-nav-next" data-id="' + nextId + '">\u25B6</button>';
    html += '</div>';

    // Header
    html += '<div class="profile-header">';
    html += '  <img src="' + participante.imagen + '" class="profile-photo" alt="' + participante.nombre + '" onerror="this.src=\'images/empty_avatar.jpg\'">';
    html += '  <div class="profile-info">';
    html += '    <h2 class="profile-name">\u{1F6B4} ' + participante.nombre + '</h2>';
    html += '    <div class="profile-quick-stats">';
    html += '      <span class="stat-badge medal-badge">\u{1F3C6} ' + medalHtml + '</span>';
    html += '      <span class="stat-badge">\u{1F4C5} ' + stats.years.length + ' temp. (' + yearsRange + ')</span>';
    html += '      <span class="stat-badge">\u{1F4CA} Mejor: ' + stats.mejor + '\u00BA \u00B7 Peor: ' + stats.peor + '\u00BA \u00B7 Media: ' + stats.media + '</span>';
    html += '    </div>';
    html += '  </div>';
    html += '</div>';

    // Chart
    html += '<div class="profile-section"><h3>\u{1F4C8} Evoluci\u00F3n</h3><div class="result-section"><canvas id="resultChart"></canvas></div></div>';

    // History table
    html += '<div class="profile-section"><h3>\u{1F4CB} Historial</h3>';
    html += '<table class="history-table"><thead><tr><th>A\u00F1o</th><th>Puesto</th><th>Medalla</th></tr></thead><tbody>';
    for (var i = 0; i < stats.historial.length; i++) {
        var h = stats.historial[i];
        var medal = '-';
        var rowClass = '';
        if (h.pos === 1) { medal = '\u{1F947} Oro'; rowClass = 'medal-1'; }
        else if (h.pos === 2) { medal = '\u{1F948} Plata'; rowClass = 'medal-2'; }
        else if (h.pos === 3) { medal = '\u{1F949} Bronce'; rowClass = 'medal-3'; }
        html += '<tr class="' + rowClass + '"><td>' + h.year + '</td><td>' + h.pos + '\u00BA</td><td>' + medal + '</td></tr>';
    }
    html += '</tbody></table></div>';

    container.innerHTML = html;

    // Attach nav event listeners
    container.querySelector('.btn-nav-prev').addEventListener('click', function () {
        showParticipant(parseInt(this.getAttribute('data-id')));
    });
    container.querySelector('.btn-nav-next').addEventListener('click', function () {
        showParticipant(parseInt(this.getAttribute('data-id')));
    });
    container.querySelector('.participant-select').addEventListener('change', function () {
        showParticipant(parseInt(this.value));
    });
}

function addChart(nombre) {
    var ctx = document.getElementById('resultChart');
    if (!ctx) return;

    var clasificacionesParticipante = [];
    for (var i = 0; i < clasificacionYear.length; i++) {
        if (clasificacionYear[i].username == nombre && clasificacionYear[i].posicion !== null) {
            clasificacionesParticipante.push(clasificacionYear[i]);
        }
    }

    if (graficoResultados) {
        graficoResultados.destroy();
    }

    if (clasificacionesParticipante.length === 0) return;

    clasificacionesParticipante.sort(function (a, b) { return a.year - b.year; });

    graficoResultados = new Chart(ctx, {
        type: 'line',
        data: {
            labels: clasificacionesParticipante.map(function (cp) { return cp.year; }),
            datasets: [{
                label: 'Posici\u00F3n',
                data: clasificacionesParticipante.map(function (cp) { return cp.posicion; }),
                borderColor: '#e67e22',
                backgroundColor: 'rgba(230, 126, 34, 0.1)',
                borderWidth: 2,
                pointBackgroundColor: '#e67e22',
                pointRadius: 4,
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                y: { duration: 1500 }
            },
            scales: {
                y: {
                    min: 1,
                    reverse: true,
                    ticks: { stepSize: 1 }
                }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
}

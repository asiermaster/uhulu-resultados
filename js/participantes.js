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
    addChart();

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

function addChart(){
    const ctx = document.getElementById('resultChart');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [1, 15, 3, 5, 2, 3],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
            min: 1,
            reverse:true
        }
      }
    }
  });
}

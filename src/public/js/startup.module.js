function setupClickEvents() {
  $('#agregarEstudianteNuevo').on('click', () => {
    let student = {
      nombre: $('#nombre').val(),
      apellido: $('#apellido').val(),
      grupo: $('#proyecto').val(),
      tlf: $('#tlf').val(),
      email: $('#correo').val(),
    };
    let pago = {
      banco: $('#banco').val(),
      referencia: $('#referencia').val(),
      monto: $('#monto').val(),
      fecha: $('#fecha').val(),
    };
    $.post('api/estudiante/new', student, 'json')
      .done(function(est) {
        console.log(est._id);
        student._id = est._id;
        $.post(`api/estudiante/${est._id}/pago`, pago, 'json').done(function(
          data
        ) {
          console.log(data);
          table.ajax.reload();
          table.draw();
          console.log('Sucess');
        });
      })
      .fail(function() {
        alert('error');
      });
    console.log(student._id);
    if (student._id) {
    }
  });

  let file_data;
  $('#inputP').change(function() {
    file_data = $('#inputP').prop('files')[0];
    let data = new FormData();
    data.append('planilla', file_data);
    $.ajax({
      type: 'POST',
      enctype: 'multipart/form-data',
      url: '/uploadPaola',
      data: data,
      processData: false,
      contentType: false,
      cache: false,
      timeout: 600000,
      success: function(data) {
        console.log('SUCCESS : ', data);
      },
      error: function(e) {
        console.log('ERROR : ', e);
      },
    });
    file_data = undefined;
  });
  $('#importarPaola').on('click', function() {
    $('#inputP').trigger('click');
  });

  $('#inputM').change(function() {
    file_data = $('#inputM').prop('files')[0];
    let data = new FormData();
    data.append('planilla', file_data);
    $.ajax({
      type: 'POST',
      enctype: 'multipart/form-data',
      url: '/uploadMarwan',
      data: data,
      processData: false,
      contentType: false,
      cache: false,
      timeout: 600000,
      success: function(data) {
        console.log('SUCCESS : ', data);
      },
      error: function(e) {
        console.log('ERROR : ', e);
      },
    });
    file_data = undefined;
  });
  $('#importarMarwan').on('click', function() {
    $('#inputM').trigger('click');
  });
}

function setupSideBar(fecha) {
  $('li.mes').append(() => {
    $('.mes-actual')
      .closest('a')
      .attr('id', fecha.getAnoMesURL(new Date()));
    let meses = fecha.arrayMeses(new Date());
    let li = '';
    for (mes of meses.reverse()) {
      li += addNewMonthRow(mes);
    }
    return li;
  });

  function addNewMonthRow(date) {
    return `<a class="nav-link btn-fecha" id=${fecha.getAnoMesURL(
      date
    )} href="#" >
                  <span data-feather="file-text"></span>
                  ${fecha.getMesAno(date)}
              </a>  `;
  }
}

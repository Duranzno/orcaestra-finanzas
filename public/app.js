const dateformat = 'mm/dd/yyyy';

function getCurrentDate() {
    const today_date = new Date();
    return ((today_date.getDate() < 10) ? "0" : "") + String(today_date.getDate()) + "-" + ((today_date.getMonth() < 9) ? "0" : "") + String(today_date.getMonth() + 1) + "-" + today_date.getFullYear();
}

$(document).ready(function () {
    let date_input = $('input[name="date"]'); //our date input has the name "date"
    const form = $('.bootstrap-iso form');
    let container = form.length > 0 ? form.parent() : "body";
    let options = {
        format: dateformat,
        container: container,
        todayHighlight: true,
        autoclose: true,
        todayBtn: true
    };

    date_input.datepicker(options);
    $("#date").val(getCurrentDate());
});

// const CrearMusico=document.querySelector(".createStudent");
// function post(path, data) {
//     return window.fetch(path, {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//     });
// }
// CrearMusico.addEventListener('submit',(e)=>{
//     console.log("evento añadido")   ;
//     document.querySelector("h1").style.background="blue";
//     e.preventDefault();
//     const nombre=CrearMusico.querySelector('.nombre').val();
//     const apellido=CrearMusico.querySelector('.apellido').val();
//     const proyecto=CrearMusico.querySelector('.proyecto').val();
//     post("/createStudent",{nombre,apellido,proyecto});
// });


$("#agregarEstudiante").on("click", () => {
    let student = {
        nombre: $("#nombre").val(),
        apellido: $("#apellido").val(),
        proyecto: $("#proyecto").val()
    };
    console.log(student);
    $.post("/api/addStudent", student, () => console.log("Sucess"), "json");
})
;
$("#agregarPago").on("click", () => {
    let pago = {
        banco: $("#banco").val(),
        monto: $("#monto").val(),
        referencia: $("#referencia").val(),
        fecha: $("#date").val()
    };
    if (pago.fecha === "") {
        pago.fecha = getCurrentDate();
    }
    console.log(pago);
    $.post(
        "/api/addPago",
        pago,
        function (data) {
            console.log("SUCESS" + data.toString());
        },
        "json"
    );
});


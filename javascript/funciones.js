
function traerTodos(){

    var pagina = "http://localhost:8080/abm_apirest/apirest.php/traerTodos";

    $.ajax({
        type: 'GET',
        url: pagina,
        dataType: "json",
        async: true
    })
    .done(function (objJson) {

        var tablaEncabezado = "<table border='2' class='table'>";
        tablaEncabezado += "<tr>";
        tablaEncabezado += "<th>ID</th>";
        tablaEncabezado += "<th>Nombre</th>";
        tablaEncabezado += "<th>Apellido</th>";
        tablaEncabezado += "<th>DNI</th>";
        tablaEncabezado += "<th>Foto</th>";
        tablaEncabezado += "<th>Editar</th>";
        tablaEncabezado += "<th>Eliminar</th>";
        tablaEncabezado += "</tr>";
        var tablaCuerpo = "";
        var tablaPie = "</tr></html>";

        for(var i=0;i<objJson.length;i++){
            tablaCuerpo += "<tr><td>"+objJson[i].id+"</td>";
            tablaCuerpo += "<td>"+objJson[i].nombre+"</td>";
            tablaCuerpo += "<td>"+objJson[i].apellido+"</td>";
            tablaCuerpo += "<td>"+objJson[i].dni + "</td>";
            tablaCuerpo += "<td>"+objJson[i].foto + "</td>";
            tablaCuerpo += "<td>";
            tablaCuerpo += "<a href='#' data-id='"+objJson[i].id+"' onclick='administrarModificar("+objJson[i].id+")' data-toggle='modal' data-target='#myModal' class='open-Modal'><span class='glyphicon glyphicon-pencil'></span></a>";
            tablaCuerpo += "</td>";
            tablaCuerpo += "<td>";
            tablaCuerpo += "<a href='#' onclick='eliminar("+objJson[i].id+")'><span class='glyphicon glyphicon-remove'></span></a>";
            tablaCuerpo += "</td></tr>";
        }

        $("#divTabla").html(tablaEncabezado+tablaCuerpo+tablaPie);

    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
    });    

}
function agregar(){

    var pagina = "http://localhost:8080/abm_apirest/apirest.php/registro";

    $.ajax({
        type: 'POST',
        url: pagina,
        dataType: "json",
        data: {
            valorChar : $("#nombre").val(),
            valorDate : $("#apellido").val(),
            valorInt : $("#dni").val()
        },
        async: true
        })
    .done(function (objJson) {

        alert("Elemento agregado exitosamente!!!");        

    })
    .fail(function (jqXHR, textStatus, errorThrown) {
    });    

}
function administrarModificar(id){

    var pagina = "http://localhost:8080/abm_apirest/apirest.php/traerUno/"+id;

    $.ajax({
        type: 'GET',
        url: pagina,
        dataType: "json",
        async: true
    })
    .done(function (objJson) {

        $("#id").val(objJson[0].id);
        $("#nombre").val(objJson[0].nombre);
        $("#apellido").val(objJson[0].apellido);
        $("#dni").val(objJson[0].dni);
     
     //   $("#valor_date").val(objJson[0].apellido);
       // $("#valor_int").val(objJson[0].valor_int);

    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
    });    
}

function modificar(){
alert("Mod");
    if(!confirm("Seguro de modificar?"))
        return;

    var pagina = "http://localhost:8080/abm_apirest/apirest.php/registro";

    $.ajax({
        type: 'PUT',
        url: pagina,
        dataType: "json",
        data: {
            id : $("#id").val(),
            nombre : $("#nombre").val(),
             apellido : $("#apellido").val(),
              dni : $("#dni").val()
             //  foto : $("#foto").val(),
       //     valorDate : $("#valor_date").val(),
       //     valorInt : $("#valor_int").val()
        },
        async: true
    })
    .done(function (objJson) {

        $("#divMensaje").css("display", "block");
        $("#spanMensaje").removeClass("label label-danger");
        $("#spanMensaje").addClass("label label-success");
        $("#spanMensaje").html("Elemento modificado exitosamente!!!");
        $("#btnModificar").css("display", "none");

        traerTodos();

    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        $("#divMensaje").css("display", "block");
        $("#spanMensaje").addClass("label label-danger");
        $("#spanMensaje").html("Error al intentar modificar elemento!!!");
        $("#btnModificar").css("display", "none");
    });    

}
function eliminar(id){

    if(!confirm("Seguro de eliminar el elemento con id="+id+"?"))
        return;

    var pagina = "http://localhost:8080/abm_apirest/apirest.php/registro";

    $.ajax({
        type: 'DELETE',
        url: pagina,
        dataType: "json",
        data: {
            id : id
        },
        async: true
    })
    .done(function (objJson) {

        traerTodos();
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
    });    

}
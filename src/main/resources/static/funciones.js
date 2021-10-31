// ------- FUNCIONES DE DISFRACES -------

function formularioDisfraz() {
    $.ajax({
        action: $('#divRegMensajes').hide(),
        action: $('#divRegClientes').hide(),
        action: $('#divRegCategoria').hide(),
        action: $('#divRegReservacion').hide(),
        action: $('#divTablaDisfraz').show(),
    }
    );
}

function consultarDisfraces() {
    $.ajax({
        //url: "https://g24f76645b4f7a2-db202110010011.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/costume/costume",
        url: "http://localhost:8080/api/Costume/all",
        type: "GET",
        dataType: "json",
        //crossOrigin:true,
        success: function (json) {
            console.log(json);
            $("#idDivConsultaDisfraz").empty();
            $("#idDivConsultaDisfraz").append("<table>");
            //$("#idDivConsulta").append("<caption>Tabla de Disfraces</caption>");
//            $("#idDivConsultaDisfraz").append("<tr><th>ID</th><th>NOMBRE</th><th>MARCA</th><th>AÑO</th><th>DESCRIPCION</th><th>CATEGORIA</th></tr>");  // para los encabezados
$("#idDivConsultaDisfraz").append("<tr><th>NOMBRE</th><th>MARCA</th><th>AÑO</th><th>DESCRIPCION</th><th>CATEGORIA</th></tr>");  // para los encabezados  
        for (i = 0; i < json.length; i++) { //< json.items.length; i++) {
                $("#idDivConsultaDisfraz").append("<tr>");
//                $("#idDivConsultaDisfraz").append("<td>"+json[i].id+"</td>");
                $("#idDivConsultaDisfraz").append("<td>"+json[i].name+"</td>");
                $("#idDivConsultaDisfraz").append("<td>"+json[i].brand+"</td>");
                $("#idDivConsultaDisfraz").append("<td>"+json[i].year+"</td>");
                $("#idDivConsultaDisfraz").append("<td>"+json[i].description+"</td>");
                $("#idDivConsultaDisfraz").append("<td>"+json[i].categoria+"</td>");
                $("#idDivConsultaDisfraz").append('<td><button onclick="cargarDisfraz(' + json[i].id + ')">Cargar</button></td>');
                $("#idDivConsultaDisfraz").append("</tr>");
            }
            $("#idDivConsultaDisfraz").append("</table>");
        },
        error: function (xhr, status) {
            console.log(xhr);
        }
    });
}

function vaciarTablaD(){
    var costume;
    costume = { 
        id: $("#idDisfraz").val(""), 
        name: $("#NameDisfraz").val(""),
        brand:  $("#Brand").val(""), 
        year: $("#Year").val(""), 
        description: $("#Description").val(""),
        category_id: $("#Category").val("")

    }
    datosEnvio = JSON.stringify(costume);
}

function cargarDisfraz(idItem) {
    $.ajax({
        dataType: 'json',
        url: "http://localhost:8080/api/Costume/"+idItem,
        type: 'GET',
        success: function (response) {
            console.log(idItem);
            console.log(response);
            //var item = response.items[0];
            var item = response;
            console.log(item);
            $("#idDisfraz").val(item.id);
            $("#NameDisfraz").val(item.name);            
            $("#Brand").val(item.brand);
            $("#Year").val(item.year);
            $("#Description").val(item.description);
            $("#Category").val(item.category_id);

        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    }
    );
    consultarDisfraces()
}

function crearDisfraz(){ //ingresarDisfraz() {
    var costume;
    costume = { id: $("#miid").val(),name: $("#NameDisfraz").val(), brand: $("#Brand").val(), year: $("#Year").val(),description: $("#Description").val() ,category_id: $("#Category").val(),  };
    var dataToSend=JSON.stringify(costume);
    $.ajax({
        dataType: 'json',
        data: dataToSend,        
        url: "http://localhost:8080/api/Costume/save",
        type: "POST",
        contentType:'application/json',
        success: function (response) {
            console.log(costume);
            console.log(response);
            consultarDisfraces();
            alert("Disfraz guardado exitosamente");
        },
        error: function (xhr, status) {
        //    console.log(costume);
        //    console.log(response);
            console.log(xhr);
            alert("Disfraz no pudo ser guardado");
        }
    });
    vaciarTablaD();
}

function actualizarDisfraz() {
    var costume;
    costume = { 
        id: $("#idDisfraz").val(), 
        name: $("#NameDisfraz").val(),
        brand:  $("#Brand").val(), 
        year: $("#Year").val(), 
        description: $("#Description").val(),         
        category: $("#Category").val(), 

    }
    var datosEnvio = JSON.stringify(costume);
    $.ajax({
        dataType: 'json',
        data: datosEnvio,
        url: "http://localhost:8080/api/Costume/save",
        type: "PUT",
        contentType: "application/json",
        success: function (response) {
            console.log(datosEnvio);
            consultarDisfraces();
            console.log(response);
        },
        error: function (xhr, status) {
            console.log(xhr);
            alert("Disfraz no pudo ser actualizado");
        }
    });
    consultarDisfraces();
    vaciarTablaD();
}

function eliminarDisfraz() {
    var costume, datosEnvio;
    costume = { id:$("#idDisfraz").val()};
    datosEnvio = JSON.stringify(costume);
    $.ajax({
        url: "http://localhost:8080/api/Costume/"+costume.id,
        type: "DELETE",
        data: datosEnvio,
        contentType: "application/json",
        success: function (response) {
            $("#idDivConsultaDisfraz").empty();
            consultarDisfraces();
            console.log(response);
        },
        error: function (xhr, status) {
            console.log(xhr);
            alert("Disfraz no pudo ser eliminado");
        }
    });
    //consultarDisfraces();
    vaciarTablaD();
}

function consultarId() {
    var codigo = $("#idDisfraz").val();
    $.ajax(
        { //al link le agregamos / y + el codigo
            url: "http://localhost:8080/api/Costume/" + codigo,
            type: "GET",
            dataType: "json",
            success: function (json) {
                $("#idDivConsulta").empty();
                //for (i = 0; i < json.items.length; i++) {
                    for (i = 0; i < json.length; i++) {    
                    $("#idDivConsulta").append(json[i].id + json[i].brand + " ");
                }
                console.log(json); //asi imprimimos en consola
            },
            error: function (xhr, status) {
                console.log(xhr);
            }
        });
}

// ------- FUNCIONES DE CLIENTES -------

function formularioClientes() {
    $.ajax({
        action: $('#divTablaDisfraz').hide(),
        action: $('#divRegMensajes').hide(),
        action: $('#divRegCategoria').hide(),
        action: $('#divRegReservacion').hide(),
        action: $('#divRegClientes').show(),
    }
    );
}

function consultarClientes() { 
    $.ajax({
//        url: "https://g24f76645b4f7a2-db202110010011.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client",
        url: "http://localhost:8080/api/Client/all",
        type: "GET",
        dataType: "json",
        success: function (json) {
            $("#idDivConsultaClientes").empty();
            $("#idDivConsultaClientes").append("<table>");
            $("#idDivConsultaClientes").append("<tr><th>ID</th><th>NOMBRE</th><th>EMAIL</th><th>EDAD</th><th>DETALLE</th></tr>");
            for (i = 0; i < json.items.length; i++) {
                $("#idDivConsultaClientes").append("<tr>");
                $("#idDivConsultaClientes").append("<td>"+json.items[i].id+"</td>");
                $("#idDivConsultaClientes").append("<td>"+json.items[i].name+"</td>");
                $("#idDivConsultaClientes").append("<td>"+json.items[i].email+"</td>");
                $("#idDivConsultaClientes").append("<td>"+json.items[i].age+"</td>");
                $("#idDivConsultaClientes").append('<td><button onclick="cargarCliente(' + json.items[i].id + ')">Cargar</button></td>');
                $("#idDivConsultaClientes").append("</tr>");
            }
            $("#idDivConsultaClientes").append("</table>");
        },
        error: function (xhr, status) {
            console.log(xhr);
        }
    });
}

function vaciarTablaC(){
    var client;
    client = { 
        id: $("#idCliente").val(""), 
        name:  $("#NameCliente").val(""), 
        email: $("#Email").val(""), 
        age: $("#Edad").val(""),
    }
    datosEnvio = JSON.stringify(client);
}

function cargarCliente(idItem) {
    $.ajax({
        dataType: 'json',
//        url: "https://g24f76645b4f7a2-db202110010011.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client/" + idItem,
        url: "http://localhost:8080/api/Client/"+idItem,
        type: 'GET',
        success: function (response) {
            var item = response.items[0];
            $("#idCliente").val(item.id);
            $("#NameCliente").val(item.name);
            $("#Email").val(item.email);
            $("#Edad").val(item.age);
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    }
    );
}

function crearCliente() {
    var client;
    client = { id: $("#idCliente").val(), name: $("#NameCliente").val(), email: $("#Email").val(), age: $("#Edad").val() };
    $.ajax({
//        url: "https://g24f76645b4f7a2-db202110010011.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client",
        url: "http://localhost:8080/api/Client/save",        
        type: "POST",
        data: client,
        success: function (response) {
            console.log(response);
            alert("Cliente creado exitosamente");
        },
        error: function (xhr, status) {
            console.log(xhr);
            alert("Cliente no pudo ser creado");
        }
    });
    consultarClientes();
    vaciarTablaC();
}

function actualizarCliente() {
    var client;
    client = { 
        id: $("#idCliente").val(), 
        name:  $("#NameCliente").val(), 
        email: $("#Email").val(), 
        age: $("#Edad").val(),
    }
    datosEnvio = JSON.stringify(client);
    $.ajax({
        //url: "https://g24f76645b4f7a2-db202110010011.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client",
        url: "http://localhost:8080/api/Client/save",          
        type: "PUT",
        data: datosEnvio,
        contentType: "application/json",
        success: function (response) {
            console.log(response);
        },
        error: function (xhr, status) {
            console.log(xhr);
            alert("Cliente no pudo ser actualizado");
        }
    });
    consultarClientes();
    vaciarTablaC();
}

function eliminarCliente() {
    var client, datosEnvio;
    client = { id:$("#idCliente").val()};
    datosEnvio = JSON.stringify(client);
    $.ajax({
        //url: "https://g24f76645b4f7a2-db202110010011.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client",
        url: "http://localhost:8080/api/Client/"+client.id,
        type: "DELETE",
        data: datosEnvio,
        contentType: "application/json",
        success: function (response) {
            console.log(response);
        },
        error: function (xhr, status) {
            console.log(xhr);
            alert("Cliente no pudo ser eliminado");
        }
    });
    consultarClientes();
    vaciarTablaC();
}

// ------- FUNCIONES DE MENSAJES -------

function formularioMensajes() {
    $.ajax({
        action: $('#divRegClientes').hide(),
        action: $('#divTablaDisfraz').hide(),
        action: $('#divRegCategoria').hide(),
        action: $('#divRegReservacion').hide(),
        action: $('#divRegMensajes').show(),
    }
    );
}

function consultarMensajes() { 
    $.ajax({
        //url: "https://g24f76645b4f7a2-db202110010011.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message",
        url: "http://localhost:8080/api/Message/all",
        type: "GET",
        dataType: "json",
        success: function (json) {
            $("#idDivConsultaMensajes").empty();
            $("#idDivConsultaMensajes").append("<table>");
            $("#idDivConsultaMensajes").append("<tr><th>ID</th><th>MENSAJE</th><th>DETALLE</th></tr>");
            for (i = 0; i < json.items.length; i++) {
                $("#idDivConsultaMensajes").append("<tr>");
                $("#idDivConsultaMensajes").append("<td>"+json.items[i].id+"</td>");
                $("#idDivConsultaMensajes").append("<td>"+json.items[i].messagetext+"</td>");
                $("#idDivConsultaMensajes").append('<td><button onclick="cargarMensaje(' + json.items[i].id + ')">Cargar</button></td>');
                $("#idDivConsultaMensajes").append("</tr>");
            }
            $("#idDivConsultaMensajes").append("</table>");
        },
        error: function (xhr, status) {
            console.log(xhr);
        }
    });
}

function vaciarTablaM(){
    var message;
    message = { 
        id: $("#idMessage").val(""), 
        messagetext:  $("#MessageText").val(""), 
    }
    datosEnvio = JSON.stringify(message);
}

function cargarMensaje(idItem) {
    $.ajax({
        dataType: 'json',
        //url: "https://g24f76645b4f7a2-db202110010011.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message/" + idItem,
        url: "http://localhost:8080/api/Message/"+idItem,
        type: 'GET',
        success: function (response) {
            var item = response.items[0];
            $("#idMessage").val(item.id);
            $("#MessageText").val(item.messagetext);
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    }
    );
}

function crearMensaje() {
    var message;
    message = { 
        id: $("#idMessage").val(), 
        messagetext: $("#MessageText").val() };
    $.ajax({
        //url: "https://g24f76645b4f7a2-db202110010011.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message",
        url: "http://localhost:8080/api/Message/save",
        type: "POST",
        data: message,
        success: function (response) {
            console.log(response);
            alert("Mensaje creado exitosamente");
        },
        error: function (xhr, status) {
            console.log(xhr);
            alert("Mensaje no pudo ser creado");
        }
    });
    consultarMensajes();
    vaciarTablaM();
}

function actualizarMensaje() {
    var message;
    message = { 
        id: $("#idMessage").val(), 
        messagetext:  $("#MessageText").val(), 
    }
    datosEnvio = JSON.stringify(message);
    $.ajax({
        //url: "https://g24f76645b4f7a2-db202110010011.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message",
        url: "http://localhost:8080/api/Message/save",   
        type: "PUT",
        data: datosEnvio,
        contentType: "application/json",
        success: function (response) {
            console.log(response);
        },
        error: function (xhr, status) {
            console.log(xhr);
            alert("Mensaje no pudo ser actualizado");
        }
    });
    consultarMensajes();
    vaciarTablaM();
}

function eliminarMensaje() {
    var message, datosEnvio;
    message = { id:$("#idMessage").val()};
    datosEnvio = JSON.stringify(message);
    $.ajax({
        //url: "https://https://g24f76645b4f7a2-db202110010011.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message",
        url: "http://localhost:8080/api/Message/"+message.id,
        type: "DELETE",
        data: datosEnvio,
        contentType: "application/json",
        success: function (response) {
            console.log(response);
        },
        error: function (xhr, status) {
            console.log(xhr);
            alert("Mensaje no pudo ser eliminado");
        }
    });
    vaciarTablaM();
    consultarMensajes();
}

// ------- FUNCIONES DE CATEGORIA -------

function formularioCategoria() {  // se activa en el html al dar click sobre el boton formularioCategoria
    $.ajax({
        action: $('#divRegClientes').hide(),
        action: $('#divTablaDisfraz').hide(),
        action: $('#divRegMensajes').hide(),
        action: $('#divRegReservacion').hide(),
        action: $('#divRegCategoria').show(),
    }
    );
}

function consultarCategoria() { 
    $.ajax({
//        url: "https://g24f76645b4f7a2-db202110010011.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/category/category",
        url: "http://localhost:8080/api/Category/all",
        type: "GET",
        dataType: "json",
        success: function (json) {
            console.log(json);
            $("#idDivConsultaCategoria").empty();
            $("#idDivConsultaCategoria").append("<table>");
//            $("#idDivConsultaCategoria").append("<tr><th>ID</th><th>CATEGORIA</th><th>DESCRIPCION</th></tr>");  //encabezados
            //$("#idDivConsultaCategoria").append("<tr><th>Nombre</th><th>Descripción</th></tr>");  //encabezados            
            $("#idDivConsultaCategoria").append("<tr><th>Nombre</th><th>Descripción</th></tr>");  //encabezados   
            for (i = 0; i < json.length; i++) {
                $("#idDivConsultaCategoria").append("<tr>");
  //              $("#idDivConsultaCategoria").append("<td>"+json[i].id+"</td>");
                $("#idDivConsultaCategoria").append("<td>"+json[i].name+"</td>");
                $("#idDivConsultaCategoria").append("<td>"+json[i].description+"</td>");                
                $("#idDivConsultaCategoria").append('<td><button onclick="cargarCategoria(' + json[i].id + ')">Cargar</button></td>');
                $("#idDivConsultaCategoria").append("</tr>");
            }
            $("#idDivConsultaCategoria").append("</table>");
        },
        error: function (xhr, status) {
            console.log(xhr);
        }
    });
}

function vaciarTablaC(){
    var category;
    category = { 
        id: $("#idCategoria").val(""), 
        name:  $("#nameCategoria").val(""), 
        description:  $("#descriptionCategoria").val(""), 
    }
    datosEnvio = JSON.stringify(category);
}

function cargarCategoria(idItem) {
    $.ajax({
        dataType: 'json',
        //url: "https://g24f76645b4f7a2-db202110010011.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/category/category/" + idItem,
        url: "http://localhost:8080/api/Category/"+idItem,
        type: 'GET',
        success: function (response) {
            var item = response;
            $("#idCategoria").val(item.id);
            $("#nameCategoria").val(item.name);
            $("#descriptionCategoria").val(item.description);
        },
        error: function (jqXHR, textStatus, errorThrown) {  
            console.log(idItem);
        }
    }
    );
}

function crearCategoria() {
    var categoria;
    categoria = { 
        id: $("#idCategoria").val(), 
        name: $("#nameCategoria").val(),
        description: $("#descriptionCategoria").val(), };
        datosEnvio = JSON.stringify(categoria);    
    $.ajax({
        dataType: 'json',
        data: datosEnvio,
 //       url: "https://g24f76645b4f7a2-db202110010011.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/category/category",
        url: "http://localhost:8080/api/Category/save",
        type: "POST",
        contentType:'application/json',
        success: function (response) {
            console.log(response); 
            consultarCategoria();
            alert("Categoría creada exitosamente");
        },
        error: function (xhr, status) {
            console.log(xhr);
            console.log(categoria); 
            alert("Categoría no pudo ser creada");
        }
    });

    vaciarTablaC();
    consultarCategoria();
}

function actualizarCategoria() {
    var category;
    category = { 
        id: $("#idCategoria").val(), 
        name:  $("#nameCategoria").val(), 
        description:  $("#descriptionCategoria").val(), 
    }
    datosEnvio = JSON.stringify(category);
    $.ajax({
        dataType: 'json',
        data: datosEnvio,
        //url: "https://g24f76645b4f7a2-db202110010011.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/category/category",
        url: "http://localhost:8080/api/Category/save",        
        type: "PUT",
        contentType: "application/json",
        success: function (response) {
            consultarCategoria();
            console.log(response);
        },
        error: function (xhr, status) {
            console.log(xhr);
            console.log(category),
            alert("Categoría no pudo ser actualizada");
        }
    });
    consultarCategoria();
    vaciarTablaC();
}

function eliminarCategoria() {
    var categoria, datosEnvio;
    categoria = { 
        id: $("#idCategoria").val()};
    datosEnvio = JSON.stringify(categoria);
    $.ajax({
        //url: "https://g24f76645b4f7a2-db202110010011.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/category/category",
        url: "http://localhost:8080/api/Category/"+categoria.id,
        type: "DELETE",
        data: datosEnvio,
        contentType: "application/json",
        success: function (response) {     
            $("#idDivConsultaCategoria").empty();
 //           vaciarTablaC();
            consultarCategoria();
            console.log(response);
        },
        error: function (xhr, status) {
            console.log(xhr);
            alert("Categoría no pudo ser eliminada");
        }
    });
    vaciarTablaC();
    consultarCategoria();
}

//
// ------- FUNCIONES DE RESERVAS -------

function formularioReservas() {  // se activa en el html al dar click sobre el boton formularioCategoria
    $.ajax({
        action: $('#divRegClientes').hide(),
        action: $('#divTablaDisfraz').hide(),
        action: $('#divRegMensajes').hide(),
        action: $('#divRegCategoria').hide(),
        action: $('#divRegReservacion').show(),
    }
    );
}

function consultarReservas() { 
    $.ajax({
//        url: "https://g24f76645b4f7a2-db202110010011.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/category/category",
        url: "http://localhost:8080/api/Reservation/all",
        type: "GET",
        dataType: "json",
        success: function (json) {
            console.log(json);
            $("#idDivConsultaReservas").empty();
            $("#idDivConsultaReservas").append("<table>");
//            $("#idDivConsultaCategoria").append("<tr><th>ID</th><th>CATEGORIA</th><th>DESCRIPCION</th></tr>");  //encabezados
            //$("#idDivConsultaCategoria").append("<tr><th>Nombre</th><th>Descripción</th></tr>");  //encabezados            
            $("#idDivConsultaReservas").append("<tr><th>Id></th><th>Fecha Inicio</th><th>Fecha devolución</th><th>Estado</th></tr>");  //encabezados   
            for (i = 0; i < json.length; i++) {
                $("#idDivConsultaReservas").append("<tr>");
                $("#idDivConsultaReservas").append("<td>"+json[i].idreservation+"</td>");
                $("#idDivConsultaReservas").append("<td>"+json[i].startDate+"</td>");
                $("#idDivConsultaReservas").append("<td>"+json[i].devolutionDate+"</td>");                
                $("#idDivConsultaReservas").append("<td>"+json[i].status+"</td>"); 
                $("#idDivConsultaReservas").append('<td><button onclick="cargarReservas(' + json[i].id + ')">Cargar</button></td>');
                $("#idDivConsultaReservas").append("</tr>");
            }
            $("#idDivConsultaReservas").append("</table>");
        },
        error: function (xhr, status) {
            console.log(xhr);
        }
    });
}

function vaciarTablaR(){
    var reserva;
    reserva = { 
        idReservation: $("#idReservation").val(""), 
        startDate:  $("#startDate").val(""), 
        devolutionDate:  $("#devolutionDate").val(""), 
// status = "created";
    }
    datosEnvio = JSON.stringify(reserva);
}

function cargarReservas(idItem) {
    $.ajax({
        dataType: 'json',
        //url: "https://g24f76645b4f7a2-db202110010011.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/category/category/" + idItem,
        url: "http://localhost:8080/api/Reservation/"+idItem,
        type: 'GET',
        success: function (response) {
            var item = response;
            $("#idReservation").val(item.idReservation);
            $("#startDate").val(item.startDate);
            $("#devolutionDate").val(item.devolutionDate);
            $("#status").val(item.status);
                // status = "created";
        },
        error: function (jqXHR, textStatus, errorThrown) {  
            console.log(idItem);
        }
    }
    );
}

function crearReservas() {
    var reserva;
    reserva = { 
        idReservation: $("#idReservation").val(), 
        startDate: $("#startDate").val(),
        devolutionDate: $("#devolutionDate").val(), 
     //   status = "Created", //$("#status").val("created"),
     status: $("#status").val(), 
    };
        datosEnvio = JSON.stringify(reserva);    
    $.ajax({
        dataType: 'json',
        data: datosEnvio,
 //       url: "https://g24f76645b4f7a2-db202110010011.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/category/category",
        url: "http://localhost:8080/api/Reservation/save",
        type: "POST",
        contentType:'application/json',
        success: function (response) {
            console.log(response); 
            consultarReservas();
            alert("Reserva creada exitosamente");
        },
        error: function (xhr, status) {
            console.log(xhr);
            console.log(categoria); 
            alert("Reserva no pudo ser creada");
        }
    });

    vaciarTablaR();
    consultarReservas();
}

function actualizarReservas() {
    var reserva;
    Reserva = { 
        id_reservation: $("#idReservation").val(), 
        startDate:  $("#startDate").val(), 
        devolutionDate:  $("#devolutionDate").val(), 
     //STATUS varchar2(45), 
    }
    datosEnvio = JSON.stringify(category);
    $.ajax({
        dataType: 'json',
        data: datosEnvio,
        //url: "https://g24f76645b4f7a2-db202110010011.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/category/category",
        url: "http://localhost:8080/api/Reservation/save",        
        type: "PUT",
        contentType: "application/json",
        success: function (response) {
            consultarReservas();
            console.log(response);
        },
        error: function (xhr, status) {
            console.log(xhr);
            console.log(reserva),
            alert("Reserva no pudo ser actualizada");
        }
    });
    consultarReservas();
    vaciarTablaR();
}

function eliminarReservas() {
    var reserva, datosEnvio;
    reserva = { 
        idReservation: $("#idReservation").val()};
    datosEnvio = JSON.stringify(reserva);
    $.ajax({
        //url: "https://g24f76645b4f7a2-db202110010011.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/category/category",
        url: "http://localhost:8080/api/Reservation/"+reserva.idReservation,
        type: "DELETE",
        data: datosEnvio,
        contentType: "application/json",
        success: function (response) {     
            $("#idDivConsultaReserva").empty();
 //           vaciarTablaC();
            consultarReservas();
            console.log(response);
        },
        error: function (xhr, status) {
            console.log(xhr);
            alert("Reserva no pudo ser eliminada");
        }
    });
    vaciarTablaR();
    consultarReservas();
}


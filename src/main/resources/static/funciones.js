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
        //url: "http://129.151.117.163:8080/api/Costume/all",
        url: "http://129.151.117.163:8080/api/Costume/all",
        type: "GET",
        dataType: "json",
        //crossOrigin:true,
        success: function (json) {
            console.log(json);
            $("#idDivConsultaDisfraz").empty();
            $("#idDivConsultaDisfraz").append("<table>");
            //$("#idDivConsulta").append("<caption>Tabla de Disfraces</caption>");
//            $("#idDivConsultaDisfraz").append("<tr><th>ID</th><th>NOMBRE</th><th>MARCA</th><th>AÑO</th><th>DESCRIPCION</th><th>CATEGORIA</th></tr>");  // para los encabezados
//            $("#idDivConsultaDisfraz").append("<tr><th>NOMBRE</th><th>MARCA</th><th>AÑO</th><th>DESCRIPCION</th><th>CATEGORIA</th></tr>");  // para los encabezados  
            $("#idDivConsultaDisfraz").append("<tr><th>NOMBRE</th><th>MARCA</th><th>AÑO</th><th>DESCRIPCION</th></tr>");  // para los encabezados  
        for (i = 0; i < json.length; i++) { //< json.items.length; i++) {
                $("#idDivConsultaDisfraz").append("<tr>");
//                $("#idDivConsultaDisfraz").append("<td>"+json[i].id+"</td>");
                $("#idDivConsultaDisfraz").append("<td>"+json[i].name+"</td>");
                $("#idDivConsultaDisfraz").append("<td>"+json[i].brand+"</td>");
                $("#idDivConsultaDisfraz").append("<td>"+json[i].year+"</td>");
                $("#idDivConsultaDisfraz").append("<td>"+json[i].description+"</td>");
  //              $("#idDivConsultaDisfraz").append("<td>"+json[i].category_id+"</td>");
  //              $("#idDivConsultaDisfraz").append("<td>"+json[i].category+"</td>");
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
//        url: "http://129.151.117.163:8080/api/Costume/"+idItem,
    url: "http://129.151.117.163:8080/api/Costume/"+idItem,
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
            $("#Category").val(item.category);

        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    }
    );
    consultarDisfraces()
}

function crearDisfraz(){ //ingresarDisfraz() {
    var costume;
    autoInicioCategoria();
    costume = { id: $("#idDisfraz").val(),name: $("#NameDisfraz").val(), brand: $("#Brand").val(), year: $("#Year").val(),
        description: $("#Description").val() ,category:{id: +$("#select-category").val()},};
    console.log(costume);
    var dataToSend=JSON.stringify(costume);
    console.log(dataToSend);
    $.ajax({
        dataType: 'json',
        data: dataToSend,        
        //url: "http://129.151.117.163:8080/api/Costume/save",
        url: "http://129.151.117.163:8080/api/Costume/save",
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

function actualizarDisfraz(IdItem) {
    var costume;
    costume = { 
        id: $("#idDisfraz").val(), 
        name: $("#NameDisfraz").val(),
        brand:  $("#Brand").val(), 
        year: $("#Year").val(), 
        description: $("#Description").val(),   
        category_id:{id: +$("#select-category").val()  },      
      //  category: $("#Category").val(), 
    }
    console.log(costume);
    datosEnvio = JSON.stringify(costume);
    console.log(datosEnvio);
    $.ajax({
        dataType: 'json',
        data: datosEnvio,
        //url: "http://129.151.117.163:8080/api/Costume/update",
        url: "http://129.151.117.163:8080/api/Costume/update",
        type: "PUT",
        contentType: "application/json",
        success: function (response) {
            console.log(datosEnvio);
            consultarDisfraces();
            console.log(response);
        },
        error: function (xhr, status) {
            console.log(xhr);
            console.log(costume),
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
        //url: "http://129.151.117.163:8080/api/Costume/"+costume.id,
        url: "http://129.151.117.163:8080/api/Costume/"+costume.id,
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
//            url: "http://129.151.117.163:8080/api/Costume/" + codigo,
url: "http://129.151.117.163:8080/api/Costume/" + codigo,
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
//        url: "http://129.151.117.163:8080/api/Client/all",
url: "http://129.151.117.163:8080/api/Client/all",
        type: "GET",
        dataType: "json",
        success: function (json) {
            console.log(json);
            $("#idDivConsultaClientes").empty();
            $("#idDivConsultaClientes").append("<table>");
            //$("#idDivConsultaClientes").append("<tr><th>ID</th><th>NOMBRE</th><th>EMAIL</th><th>EDAD</th><th>DETALLE</th></tr>");
            $("#idDivConsultaClientes").append("<tr></th><th>NOMBRE</th><th>EMAIL</th><th>PASSWORD</th><th>EDAD</th></tr>");
            for (i = 0; i < json.length; i++) {
                $("#idDivConsultaClientes").append("<tr>");
            //    $("#idDivConsultaClientes").append("<td>"+json[i].id+"</td>");
                $("#idDivConsultaClientes").append("<td>"+json[i].name+"</td>");
                $("#idDivConsultaClientes").append("<td>"+json[i].email+"</td>");
                $("#idDivConsultaClientes").append("<td>"+json[i].password+"</td>");
                $("#idDivConsultaClientes").append("<td>"+json[i].age+"</td>");
                $("#idDivConsultaClientes").append('<td><button onclick="cargarClientes(' + json[i].idClient + ')">Cargar</button></td>');
                $("#idDivConsultaClientes").append("</tr>");
            }
            $("#idDivConsultaClientes").append("</table>");
        },
        error: function (xhr, status) {
            console.log(xhr);
        }
    });
}

function vaciarTablaCl(){
    var client;
    client = { 
        id: $("#idCliente").val(""), 
        name:  $("#NameCliente").val(""), 
        email: $("#Email").val(""), 
        email: $("#Password").val(""),
        age: $("#Edad").val(""),
    }
    datosEnvio = JSON.stringify(client);
}

function cargarClientes(idItem) {
    $.ajax({
        dataType: 'json',
//        url: "https://g24f76645b4f7a2-db202110010011.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client/" + idItem,
//        url: "http://129.151.117.163:8080/api/Client/"+idItem,
url: "http://129.151.117.163:8080/api/Client/"+idItem,
        type: 'GET',
        success: function (response) {
            var item = response;
            $("#idCliente").val(item.idClient);
            $("#NameCliente").val(item.name);
            $("#Email").val(item.email);
            $("#Password").val(item.password);
            $("#Edad").val(item.age);
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    }
    );
}

function crearClientes() {
    var client;
    client = { id: $("#idCliente").val(), name: $("#NameCliente").val(), email: $("#Email").val(), password: $("#Password").val(), age: $("#Edad").val() };
    datosEnvio = JSON.stringify(client);   
    $.ajax({
        dataType: 'json',
        data: datosEnvio,     
//        url: "https://g24f76645b4f7a2-db202110010011.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client",
        url: "http://129.151.117.163:8080/api/Client/save",        
        type: "POST",
        contentType:'application/json',
        success: function (response) {
            console.log(response);
            consultarClientes();
            alert("Cliente creado exitosamente");
        },
        error: function (xhr, status) {
            console.log(xhr);
            alert("Cliente no pudo ser creado");
        }
    });
    vaciarTablaCl();
    consultarClientes();

}

function actualizarClientes(idItem) {
    var client;
    client = { 
        idClient: $("#idCliente").val(), 
        name:  $("#NameCliente").val(), 
        email: $("#Email").val(),
        password: $("#Password").val(), 
        age: $("#Edad").val(),
    }
    console.log(client);
    datosEnvio = JSON.stringify(client);
    $.ajax({
        dataType: 'json',
        data: datosEnvio,
        //url: "https://g24f76645b4f7a2-db202110010011.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/category/category",
        url: "http://129.151.117.163:8080/api/Client/update",
        type: "PUT",
        contentType: "application/json",
        success: function (response) {
            consultarClientes();
            console.log(response);
        },
        error: function (xhr, status) {
            console.log(xhr);
            console.log(client),
            console.log(datosEnvio),
            consultarClientes();
            alert("Cliente no pudo ser actualizado");
        }
    });

    consultarClientes();
    vaciarTablaCl();
}

function eliminarClientes() {
    var client, datosEnvio;
    client = { id:$("#idCliente").val()};
    datosEnvio = JSON.stringify(client);
    $.ajax({
        data: datosEnvio,
        //url: "https://g24f76645b4f7a2-db202110010011.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client",
        url: "http://129.151.117.163:8080/api/Client/"+client.id,
        type: "DELETE",
        
        contentType: "application/json",
        success: function (response) {
            console.log(client);
            $("#idDivConsultaClientes").empty();    
            consultarClientes();
            console.log(response);
        },
        error: function (xhr, status) {
            console.log(xhr);
            alert("Cliente no pudo ser eliminado");
        }
    });
    consultarClientes();
    vaciarTablaCl();
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
        url: "http://129.151.117.163:8080/api/Message/all",
        type: "GET",
        dataType: "json",
        success: function (json) {
            console.log(json);
            $("#idDivConsultaMensajes").empty();
            $("#idDivConsultaMensajes").append("<table>");
            $("#idDivConsultaMensajes").append("<tr><th>ID</th><th>MENSAJE</th></tr>");
            for (i = 0; i < json.length; i++) {
                $("#idDivConsultaMensajes").append("<tr>");
                $("#idDivConsultaMensajes").append("<td>"+json[i].idMessage+"</td>");
                $("#idDivConsultaMensajes").append("<td>"+json[i].messageText+"</td>");
                $("#idDivConsultaMensajes").append("<td>"+json[i].DisfrazM+"</td>");
                $("#idDivConsultaMensajes").append("<td>"+json[i].ClienteM+"</td>");
                $("#idDivConsultaMensajes").append('<td><button onclick="cargarMensaje(' + json[i].idMessage + ')">Cargar</button></td>');
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
        messageText:  $("#MessageText").val(""), 
        DisgfrazM:  $("#DisfrazM").val(""),
        ClienteM:  $("#ClienteM").val(""),
    }
    datosEnvio = JSON.stringify(message);
}

function cargarMensaje(idItem) {
    $.ajax({
        dataType: 'json',
        //url: "https://g24f76645b4f7a2-db202110010011.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message/" + idItem,
        url: "http://129.151.117.163:8080/api/Message/"+idItem,
        type: 'GET',
        success: function (response) {
            console.log(response);
            var itemsa = response;
            $("#idMessage").val(itemsa.idMessage);
            $("#MessageText").val(itemsa.messageText);
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
        messageText: $("#MessageText").val(),
    //   cli:  
    };
        datosEnvio = JSON.stringify(message);     
    $.ajax({
        dataType: 'json',
        data: datosEnvio,
        //url: "https://g24f76645b4f7a2-db202110010011.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message",
        url: "http://129.151.117.163:8080/api/Message/save",
        type: "POST",
        contentType:'application/json',  
        success: function (response) {
            console.log(response);
            consultarMensajes();
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
    var mensaje;
    mensaje = { 
        idMessage:$("#idMessage").val(), 
        messageText: $("#MessageText").val(), 
    }
    console.log(mensaje);
    datosEnvio = JSON.stringify(mensaje);
    console.log(datosEnvio);
    $.ajax({
        dataType: 'json',
        data: datosEnvio,
        //url: "https://g24f76645b4f7a2-db202110010011.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message",
        url: "http://129.151.117.163:8080/api/Message/update",   
        type: "PUT",        
        contentType: "application/json",
        success: function (response) {
            console.log(datosEnvio);
            consultarMensajes();
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
        url: "http://129.151.117.163:8080/api/Message/"+message.id,
        type: "DELETE",
        data: datosEnvio,
        contentType: "application/json",
        success: function (response) {
            consultarMensajes();
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
        url: "http://129.151.117.163:8080/api/Category/all",
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
        url: "http://129.151.117.163:8080/api/Category/"+idItem,
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
        console.log(categoria);
        datosEnvio = JSON.stringify(categoria);
        console.log(datosEnvio);    
    $.ajax({   
        dataType: 'json',
        data: datosEnvio,
 //       url: "https://g24f76645b4f7a2-db202110010011.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/category/category",
        url: "http://129.151.117.163:8080/api/Category/save",
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

function actualizarCategoria(idItem) {
    var category;
    category = { 
        id: $("#idCategoria").val(), 
//        id:idItem, 
        name:  $("#nameCategoria").val(), 
        description:  $("#descriptionCategoria").val(), 
    }
    console.log(category);
    datosEnvio = JSON.stringify(category);
    $.ajax({
        dataType: 'json',
        data: datosEnvio,
        //url: "https://g24f76645b4f7a2-db202110010011.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/category/category",
        url: "http://129.151.117.163:8080/api/Category/update",        
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
        url: "http://129.151.117.163:8080/api/Category/"+categoria.id,
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
        url: "http://129.151.117.163:8080/api/Reservation/all",
        type: "GET",
        dataType: "json",
        success: function (json) {
            console.log(json);
            $("#idDivConsultaReservas").empty();
            $("#idDivConsultaReservas").append("<table>");
//            $("#idDivConsultaCategoria").append("<tr><th>ID</th><th>CATEGORIA</th><th>DESCRIPCION</th></tr>");  //encabezados
            //$("#idDivConsultaCategoria").append("<tr><th>Nombre</th><th>Descripción</th></tr>");  //encabezados            
            $("#idDivConsultaReservas").append("<tr><th>Id</th><th>Fecha Inicio</th><th>Fecha devolución</th><th>Estado</th></tr>");  //encabezados   
            for (i = 0; i < json.length; i++) {
                $("#idDivConsultaReservas").append("<tr>");
                $("#idDivConsultaReservas").append("<td>"+json[i].idReservation+"</td>");
                $("#idDivConsultaReservas").append("<td>"+json[i].startDate+"</td>");
                $("#idDivConsultaReservas").append("<td>"+json[i].devolutionDate+"</td>");                
                $("#idDivConsultaReservas").append("<td>"+json[i].status+"</td>");
                $("#idDivConsultaReservas").append("<td>"+json[i].IdCliente+"</td>");
                $("#idDivConsultaReservas").append("<td>"+json[i].IdDisfraz+"</td>");                 
                $("#idDivConsultaReservas").append('<td><button onclick="cargarReservas(' + json[i].idReservation + ')">Cargar</button></td>');
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
        status: $("#estatus").val(""), 
        IdCliente: $("#IdCliente").val(""),
        IdDisfraz: $("#IdDisfraz").val(""),
// status = "created";
    }
    datosEnvio = JSON.stringify(reserva);
}

function cargarReservas(idItem) {
    $.ajax({
        dataType: 'json',
        //url: "https://g24f76645b4f7a2-db202110010011.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/category/category/" + idItem,
        url: "http://129.151.117.163:8080/api/Reservation/"+idItem,
        type: 'GET',
        success: function (response) {
            var item = response;
            $("#idReservation").val(item.idReservation);
            $("#startDate").val(item.startDate);
            $("#devolutionDate").val(item.devolutionDate);
            $("#estatus").val(item.status);
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
        status: $("#estatus").val(), 
        IdCliente: $("#IdCliente").val(), 
        IdDisfraz: $("#IdCliente").val(),         
    };
        datosEnvio = JSON.stringify(reserva);    
    $.ajax({
        dataType: 'json',
        data: datosEnvio,
 //       url: "https://g24f76645b4f7a2-db202110010011.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/category/category",
        url: "http://129.151.117.163:8080/api/Reservation/save",
        type: "POST",
        contentType:'application/json',
        success: function (response) {
  //          console.log(response); 
            console.log(datosEnvio); 
            consultarReservas();
            alert("Reserva creada exitosamente");
        },
        error: function (xhr, status) {
            console.log(xhr);
            alert("Reserva no pudo ser creada");
        }
    });

    vaciarTablaR();
    consultarReservas();
}

function actualizarReservas(idItem) {
    var reserva;
    reserva = { 
        idReservation: $("#idReservation").val(), 
        startDate:  $("#startDate").val(), 
        devolutionDate:  $("#devolutionDate").val(), 
        estatus: $("#estatus").val(""), 
        IdCliente: $("#IdCliente").val(), 
        IdDisfraz: $("#IdCliente").val(), 
    }
    console.log(reserva);
    datosEnvio = JSON.stringify(reserva);
    console.log(datosEnvio);
    $.ajax({
        dataType: 'json',
        data: datosEnvio,
        //url: "https://g24f76645b4f7a2-db202110010011.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/category/category",
        url: "http://129.151.117.163:8080/api/Reservation/update",        
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
        url: "http://129.151.117.163:8080/api/Reservation/"+reserva.idReservation,
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

///
function autoInicioCategoria(){
    console.log("se esta ejecutando")
    $.ajax({
        url:"http://129.151.117.163:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-category");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select "+name.id);
            }); 
        }
    
    })
}


var ruta = "http://pedidoskomanda.solucionesoftware.com.mx/api/";
var ruta_imagen = "http://pedidoskomanda.solucionesoftware.com.mx/productos/";
var ruta_generica = "http://admin.lealtadprimero.com.mx/servicio/index.php";
var cliente = '5';
$( document ).ready(function() {
//localStorage.setItem("codigo_qr","");
    if(pughpharm.isLogged()){
        document.getElementById('menus').style.display = "block";
    }else{
         document.getElementById('menus').style.display = "none";
    }
   // localStorage.removeItem('imagen');
   if(localStorage.getItem('pughpharm') !== null)
    {
        refrescar();
    }
    if(localStorage.getItem('imagen'))
    {
       try {
            var img = JSON.parse(localStorage.getItem('imagen'));
       document.getElementById('usr').src = img.ruta;
        document.getElementById('usrP').src = img.ruta;
        }
        catch(err) {
          // alert(err)
        }
       
    }
    ver_cliente();
    //$('.btn-azul').css('background', '#DBA901');
    
    
    document.addEventListener("deviceready", 
        function(){
            document.addEventListener("backbutton", function(e){
               e.preventDefault();
            }, false);
        }
    , false);
    
    
});

function refrescar(){
     var registro = JSON.parse(localStorage.getItem('pughpharm'));
        try{
             $("#lblNombre").html(registro.nombre);
            $("#lblNombreMenu").html(registro.nombre);
            $("#lblPuntos").html(registro.puntos+" Lyon Dólares");
             $(".lblPuntos").html(registro.puntos+" Lyon Dólares");
        }catch(er){
            
        }
       
}

function ver_cliente(){
    return false;
    var configApp=JSON.parse(localStorage.getItem('configuracionApp'));
    if(configApp==null){
         $.ajax({
            method: 'POST',
            url:ruta_generica,
            data: {
                funcion:'configuracion',
                idCliente: cliente  
            },
            processData: true,
            dataType: "json",
            success: function(data){
                localStorage.setItem("configuracionApp",JSON.stringify(data));
                asignaColores();
            /*
                //alert(JSON.stringify(data));
               // var dat = JSON.parse(data)
                if(data.logo != "")
                 $("div.logo img").attr({"src":data.logo,"height":"30px"});
                if(data.imagenFondo != "" )
                $('body').css('background', 'url('+data.imagenFondo+')');
                 if(data.colorBoton != ""){
                    // alert(data.colorBoton);
                        $('.btn-azul').css('background', 'rgb('+data.colorBoton+')');
                        $('.text-azul').css('color', 'rgb('+data.colorBoton+')');
                        $('.bg-azul').css('background', 'rgb('+data.colorBoton+')');
                        $('.referencia').css('color', 'rgb('+data.colorBoton+')');
                 }
               // alert(data.usaCupones)
                if(data.usaCupones == '0'){
                     $('.cupones').css("display", "none");
                }
           
                if(data.usaGamification == 0){
                     $('.gamf').css("display","none");
                }
                
                if(data.usaPedido == '0'){
                     $('.pedidos').css("display","none");
                }
                
                ////$('#msg').html(JSON.stringify(data));
                */
            },
            error: function (data)
            {
                ////$('#msg').html(JSON.stringify(data));
               // alert("error validar cliente "+JSON.stringify(data));
            }
        });
    }else{
        asignaColores();
    }//if
}

function asignaColores(){
    var configApp=JSON.parse(localStorage.getItem('configuracionApp'));
    //alert(configApp.logo);
    if(configApp.logo != "")
        $("div.logo img").attr({"src":configApp.logo,"height":"30px"});
    if(configApp.imagenFondo != "" )
        $('body').css('background', 'url('+configApp.imagenFondo+')');
    if(configApp.colorBoton != "")
    {
        $('.btn-azul').css('background', 'rgb('+configApp.colorBoton+')');
        //$('.text-azul').css('color', 'rgb('+configApp.colorBoton+')');
        $('.bg-azul').css('background', 'rgb('+configApp.colorBoton+')');
        $('.referencia').css('color', 'rgb('+configApp.colorBoton+')');
    }
    if(configApp.usaCupones == '0')
    {
        $('.cupones').css("display", "none");
    }
           
    if(configApp.usaGamification == 0)
    {
        $('.gamf').css("display","none");
    }
                
    if(configApp.usaPedido == '0')
    {
        $('.pedidos').css("display","none");
    }
    
    $('body').css('display','block');
}//function


function validar_email(){
    
     if($('#email2').val() == ""){
        alert("Ingresa tu E-mail");
    }else{
         $.ajax({
            method: 'POST',
            url:ruta + "validar",
            data: {
                   email : $('#email2').val()
            },
            processData: true,
            dataType: "json",
            success: function(data){
                //alert(JSON.stringify(data));
                if(data.funciono == "Si"){
                    localStorage.setItem("cliente",$('#email2').val());   
                     window.location = "autorizacion3.html";
                }else{
                    alert("No se encontraron resultados");
                }
            },error: function (data){
                alert("error validar"+JSON.stringify(data));
            }
        });    
    }
}

function ingresar(){
    if(token=='')
        return false;
    if($("#numero_tarjeta").val().trim()=='')
    {
        $("#alertaLogin").html("Debes escribir tu usuario").show();
    }
    else if($("#contrasena").val().trim()=='')
    {
        $("#alertaLogin").html("Debes escribir tu contarseña").show();
    }
    else
    {
        $("#alertaLogin").html("").hide();
        
        //localStorage.setItem('tarjeta',$("#numero_tarjeta").val().trim()); Se puede loguear tambien por correo.
        $.ajax({
            url:ruta_generica,
            type: 'POST',
            data:{
                funcion:'ingreso',
                idCliente : cliente,
                numeroTarjeta:$("#numero_tarjeta").val().trim(),
                password:$("#contrasena").val().trim(),
                tokenDelCelular: token
            },
            success:function(resp){ 
                resp=JSON.parse(resp);
                if(resp.error==''){
                    localStorage.setItem('tarjeta',resp.numeroTarjeta);
                    pughpharm.login(resp.nombre, resp.email, resp.puntos, resp.puntosPorPeso, resp.codigo);
                }else{
                    $("#alertaLogin").html(resp.error).show();
                }//if
            }//function
        });
        
    }
}

function recuperarContrasena(){
    /*if($("#numero_tarjeta").val().trim()==''){
        $("#alertaLogin").html("Debes escribir tu número de tarjeta").show();
    }else*/ //Bustos solo sera necesario el correo electronico
    if($("#email").val().trim()==''){
        $("#alertaLogin").html("Debes escribir tu email").show();
    }else{
        $("#alertaLogin").html("").hide();
        
        $.ajax({
            url:ruta_generica,
            type: 'POST',
            data:{
                funcion:'recuperarContrasena',
                idCliente: cliente,
                //numeroTarjeta:$("#numero_tarjeta").val().trim(),
                email:$("#email").val().trim()},
            success:function(resp)
            { 
                resp=JSON.parse(resp);
                //alert(JSON.stringify(resp));
                if(resp.error=='')
                {
                    alert("Su contraseña ha sido ha enviada por correo electrónico.");
                    location.href="usuarioLealtad.html";
                }
                else
                {
                    $("#alertaLogin").html(resp.error).show();
                }
            }
        });
        
    }
}


function extraerPromociones(ut_pc)
{
    
    if(localStorage.getItem('pughpharm') !== null)
    {
        var registro = JSON.parse(localStorage.getItem('pughpharm'));
        $("#lblNombre").html(registro.nombre);
        $("#lblPuntos").html(registro.puntos+" Puntos");
    }
        
    $.ajax(
    {
        url:ruta_generica,
        type: 'POST',
        data:{funcion:'cupones',idCliente:cliente, numeroTarjeta:localStorage['tarjeta'],utilizadoPicnic:ut_pc},
        success:function(resp)
        {
            //alert(JSON.stringify(resp));
            console.log(resp);
            resp=JSON.parse(resp);
            try
            {
                if(resp[0].error=='')
                {
                     $('#no_cat').html('');
                    for(var x=0; x<resp.length; x++)
                    {
                        var promocion = resp[x];
                        // alert(JSON.stringify(promocion));
                        var cad='<a><div class="imgCatego2"><img onclick="modal(\'CL|'+promocion.codigoQR+'\')" src="'+promocion.imagen+'"><div  class="sombra"><img src="img/imgSombraHorizontal.png"/></div></div></a>';
                        $("#contenedorPromociones").append(cad);
                    }
                }
                else
                {
                    //alert("error extraerpromo:"+ JSON.stringify(resp));
                }  
            }
            catch(Err)
            {

            }
        }
    });
}


function extraerRecompensas(ut_pc){
    if(localStorage.getItem('pughpharm') !== null){
        var registro = JSON.parse(localStorage.getItem('pughpharm'));
        $("#lblNombre").html(registro.nombre);
        $("#lblPuntos").html(registro.puntos+" Puntos");
    }//if
    $.ajax({
        url:ruta_generica,
        type: 'POST',
        data:{
            funcion: 'recompensas',
            idCliente: cliente,
            numeroTarjeta: localStorage['tarjeta'],
            utilizadoPicnic: ut_pc
        },
        success:function(resp)
        {
            //alert(JSON.stringify(resp));
            console.log(resp);
            resp=JSON.parse(resp);
            try{
                if(resp[0].error==''){
                     $('#no_cat').html('');
                    for(var x=0; x<resp.length; x++){
                        var recompensa=resp[x];
                        // alert(JSON.stringify(promocion));
                        var cad='<a style="color:#555555;"><div class="imgCatego2"><img id="img'+recompensa.id+'" rel="'+recompensa.codigo+'" onclick="decide(this);" src="'+recompensa.imagen+'" style="'+(recompensa.codigo+""!="null"?"border:2px solid #ff0000;":"")+'"><div  class="sombra"><img src="img/imgSombraHorizontal.png"/></div>'+recompensa.puntos+' Lyon Dólares</div>'+(recompensa.codigo+""!="null"?"<span style=\"color:#FF0000; font-weight:bold;\">Recompensa canjeada da clic en la imagen para acceder al código de canje</span>":"")+'</a><br><br>';
                        $("#contenedorPromociones").append(cad);
                    }//for
                    if(mostCodi!=0){
                        //alert($("#img"+mostCodi).attr('rel'));
                        $('#msg2').html($("#img"+mostCodi).attr('rel'));
                        modal2();
                    }//if
                }else{
                    //alert("error extraerpromo:"+ JSON.stringify(resp));
                }//if
            }catch(Err){

            }
        }
    });
}//function


function obtenerDatosPersonales()
{
     $.ajax({
            url:ruta_generica,
            type: 'POST',
            data:{funcion:'perfil', idCliente:cliente, numeroTarjeta:localStorage['tarjeta']},
            success:function(resp)
            { 
               
                resp=JSON.parse(resp);
                 //alert(JSON.stringify(resp.idMunicipio));
                if(resp.error=='')
                {
                  $("#txtTarjeta").val(localStorage['tarjeta']);    
                  $("#txtNombre").val(resp.nombre);
                  $("#txtApellidos").val(resp.apellidos);
                  $("#txtSexo").val(resp.sexo);
                  $("#txtCumple").val(resp.nacimiento);
                  $("#txtCorreo").val(resp.email); 
                  $("#txtTelefono").val(resp.telefonoTrabajo); 
                  $("#txtEstado").val(resp.idEstado); 
                  $("#txtColonia").val(resp.colonia); 
                  $("#txtMunicipio").val(resp.idMunicipio);
                  $("#txtCp").val(resp.cp);
                  $("#txtpass").val(resp.password);  
                  $("#txtTelefono2").val(resp.telefonoHogar);
                  //$()
                    //alert(resp.nombre);  
                      $.ajax({
               url:ruta_generica,
               type: 'POST',
               data: {
                  funcion:  'municipios',
                   idCliente:cliente,
                    idEstado: resp.idEstado

               },
               processData: true,
               dataType: "json",
               success:function(re){
                  // alert(JSON.stringify(re));
                   var d = document.getElementById('txtMunicipio');
                    while(d.hasChildNodes())
                    d.removeChild(d.firstChild);
                   for(var i = 0; i < re.length; i++){
                       if(re[i].id == resp.idMunicipio){
                            $('#txtMunicipio').append('<option value="'+re[i].id+'">'+re[i].nombre+'</option>')
                       }
                  }
               },
               error: function(re){
                   alert("Error al comunicarse con servidor.");
               }
           });
                  
                }
                else
                {
                    alert("error:"+resp.error);
                }
                
            }
         
        });
    
}

function met_pago(){
    if(localStorage['carrito']){
        window.location = "metodoPago1.html";
    }else{
        alert('No cuentas con productos en tu carrito');
    }
}

function salir(){
    localStorage['carrito']="";
    localStorage.removeItem("cliente");
    pughpharm.deleteToken();
}

function hacer_pedido(){
    var envio = "";
    if(pughpharm.isLogged()){
        var registros = JSON.parse(localStorage.getItem('pughpharm'));
        var envio = registros.email;
    }else{
        var envio = localStorage.getItem('cliente');  
    }
      $.ajax({
            method: 'POST',
            url: ruta + 'pedidos',
            data: {
                email: envio,
                domicilio_id: 1,
                produtos: JSON.stringify(localStorage['carrito']),
                forma_pago: localStorage['apuntador'],
            },
            processData: true,
            success: function (data) {
                var a= JSON.parse(data);
                // $('#error').html(JSON.stringify(data));
                if(a.funciono == "No"){
                     alert("Ocurrio un problema en el servidor");
                }else{
                    registrar_pedido(a.funciono);
                }
                   
            },error: function (data){
                //alert("error hacer pedido"+JSON.stringify(data));
                //$('#error').html(JSON.stringify(data));
            }
        });    
}

function registrar_pedido(id){
    var d = new Date();
    var fech =  d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate();
    var hors = d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
    //alert(localStorage['puntos']+'  ,  '+localStorage['dinero']);
     $.ajax({
            method: 'POST',
            url: ruta_generica,
            data: {
                funcion:'registraTransaccion',
                idCliente:cliente,
                productos: localStorage['carrito'],
                totalPesos: localStorage["dinero"],
                totalPuntos: localStorage["puntos"],
                folio: id,
                fecha: fech,
                hora:hors,
                numeroTarjeta: localStorage['tarjeta']
            },
            processData: true,
            success: function (data) {
                // $('#err').html(fech+JSON.stringify( localStorage['carrito'] ));
                     localStorage['carrito'] ="";
                 var punts = JSON.parse(localStorage.getItem('pughpharm'));
                  var a= JSON.parse(data);
                punts.puntos = parseInt(a.mensaje);
                 localStorage.setItem('pughpharm',JSON.stringify(punts));
            },error: function (data){
              //  $('#err').html(fech+JSON.stringify(data));
            }
        });    
}

function puntos(){
    try{
         var registros = JSON.parse(localStorage.getItem('pughpharm'));
        var punts = parseInt(registros.puntos);
        var arreglo = JSON.parse(localStorage['carrito']); 
        var total = 0;
        for(var i = 0; i< arreglo.length ; i++ ){
            total = total + (parseInt(arreglo[i].precio) * parseInt(arreglo[i].cantidad));
        }
        if(total >= punts){
            $('#pnts').removeClass('btn-azul');
             $('#pnts').addClass('btn');
           document.getElementById('pnts').disabled = true;
           //  alert("total"+total+" puntos"+punts+" susx");
        }else{
           // alert("total"+total+" puntos"+punts+" err");
            $('#pnts').addClass('btn-azul');
             document.getElementById('pnts').disabled = false;
        }   
    }catch(Err){
        
    }
}





function ver_puntos(){
    try{
        var registros = JSON.parse(localStorage.getItem('pughpharm'));
        var arreglo = JSON.parse(localStorage['carrito']); 
        var total = 0;
        var produc = 0 ;
        for(var i = 0; i< arreglo.length ; i++ ){
           // alert(arreglo[i].precio);
            total = total + (parseInt(arreglo[i].precio) * parseInt(arreglo[i].cantidad));
            produc = produc + parseInt(arreglo[i].cantidad);
        }

         $('#total_usuario').html(total+ " pesos ");
        if(pughpharm.isLogged()){
                    $('#t_puntos').html(" ó "+(total * 2)+" puntos");
                    $('#bono').html(registros.regla * total);
               }
        $('#prod').html(produc+" ");
        $('#puntos_usuario').html(registros.puntos);
    }catch(Err){
        
    }   
}

function validar_productos(pantalla){
          // alert($('#prod').html());
           if($('#prod').html() == 0){
                alert('No tiene productos en tu carrito')
            }else{
                window.location = pantalla;
            }
       }

function mis_pedidos(){
         var envio = "";
    if(pughpharm.isLogged()){
        var registros = JSON.parse(localStorage.getItem('pughpharm'));
        var envio = registros.email;
    }else{
        var envio = localStorage.getItem('cliente');
    }
   //alert(envio);
      $.ajax({
            method: 'POST',
            url: ruta + 'mispedidos',
            data: {
                email: envio
            },
            processData: true,
            dataType: "json",
            success: function(data){
                //alert(JSON.stringify(data));
                if(data.id.length > 0){
                    $('#no_pe').html('');
                    for(var i = 0; i < data.id.length; i++){
                        $('#m_pedidos').append('<tr><th><img onclick="vr_pedido('+data.id[i]+')" src="img/imgQRCode.jpg" class="imagen"></th>'+
                                               '<th>'+data.fecha[i]+'<p>$ '+data.importe[i]+'</p></th>'+
                                               '<th><span class="fa fa-chevron-right text-azul" style=" vertical-align:middle;"></span></th></tr>');
                    }
                }
            },error: function (data){
                alert("error "+JSON.stringify(data));
                $('#error').html(JSON.stringify(data));
            }
        });    
}



function pre_registro(){
    if($('#nombre').val() == "" || $('#email').val() == "" || $('#telefono').val()==""){
        alert("Verifique que todos los campos esten llenos");
    }else{
         $.ajax({
            method: 'POST',
            url:ruta_generica,
            data: {
                   funcion :'preregistro',
                    idCliente:cliente,
                   nombre  :$('#nombre').val(),
                   email   :$('#email').val(),
                   sexo:$('#sexo').val(),
                   fechaNacimiento:$('#fec_nac').val()
            },
            processData: true,
            dataType: "json",
            success: function(data){
                //alert(JSON.stringify(data));
                if(data.error!=''){
                    alert("Este correo electronico ya esta registrado.");
                }else{
                    pedido_scr(0);
                     var cadena = "PR|"+data.codigo;
                    localStorage.setItem("codigo_qr",cadena);
                     window.location = "floatCupon02.html"
                }
               
            },error: function (data){
                alert("Erro en el pre-registro "+JSON.stringify(data));
            }
        });    
    }
    
}


function guardar_komanda(){
    $.ajax({
            method: 'POST',
            url: ruta + 'mispedidos',
            data: {
                 nombre       :$('#txtNombre').val(),
                  direccion    :"Arrollo seco 1300.",
            },
            processData: true,
            dataType: "json",
            success: function(data){
               
            },error: function (data){
                alert("error "+JSON.stringify(data));
            }
        });    
}

function guardar_datos(){
    //alert($('#txtTelefono2').val());
   
    if( $('#politicas').is(':checked') ){
         $.ajax({
           url: ruta_generica,
           type: 'POST',
           data: {
               funcion:      'actualiza',
               idCliente:cliente,
               password:       $('#txtpass').val(),
               numeroTarjeta:$('#txtTarjeta').val(),
               nombre       :$('#txtNombre').val(),
               idIndustria  :"",
               sexo         :$('#txtSexo').val(),
               email        :$('#txtCorreo').val(),
               direccion    :"Arrollo seco 1300.",
               colonia      :$('#txtColonia').val(),
               idEstado     :$('#txtEstado').val(),
               idMunicipio  :$('#txtMunicipio').val(),
               cp           :$('#txtCp').val(),
               nacimiento   :$('#txtCumple').val(),
               estadoCivil  :"",
               telefonoTrabajo:$('#txtTelefono').val(),
               telefonoHogar:$('#txtTelefono2').val(),
               tipoCelular  :"",
               facebook     :"...",
               twitter      :"..."
           },
           processData: true,
           dataType: "json",
           success: function(re){
               //alert(re.mensaje);
               //guardar_kom();
               localStorage['verifica'] = 2;
                $.ajax({
                    url:ruta_generica,
                    type: 'POST',
                    data:{funcion:'ingreso',idCliente:cliente,numeroTarjeta:$('#txtTarjeta').val().trim(), password:$('#txtpass').val().trim()},
                    success:function(resp)
                    { 
                        resp=JSON.parse(resp);
                        //alert(JSON.stringify(resp));
                        if(resp.error=='')
                        {
                            pughpharm.login(resp.nombre, resp.email, resp.puntos);
                            window.location = "miPerfil.html"
                        }
                        else
                        {
                            $("#alertaLogin").html(resp.error).show();
                        }
            }
        });
               
           },
           error: function(re){
               //alert("Err"+JSON.stringify(re));
           }
   });
    } else {
         alert("Debes aceptar las politicas de privacidad para continuar");
    }     
}

function guardar_kom(){
     var registros = JSON.parse(localStorage.getItem('pughpharm'));
        var envio = registros.email;
      $.ajax({
            method: 'POST',
            url: ruta + 'actualiza',
            data: {
                 actual :$('#txtCorreo').val(),
                siguiente: envio
            },
            processData: true,
            dataType: "json",
            success: function(data){
                alert(JSON.stringify(data));
                localStorage.setItem('cliente',$('#txtCorreo').val());
                alert($('#txtCorreo').val());
            },error: function (data){
                alert("error "+JSON.stringify(data));
                $('#error').html(JSON.stringify(data));
            }
        }); 
}

function estados(){
       $.ajax({
           url:ruta_generica,
           type: 'POST',
           data: {
               funcion: 'estados',
               idCliente:cliente
           },
           processData: true,
           dataType: "json",
           success:function(re){
              // alert("Estados : "+re.length);
              for(var i = 0; i < re.length; i++){
                   $('#txtEstado').append('<option value="'+re[i].id+'">'+re[i].nombre+'</option>')
              }
           },
           error: function(re){
               alert("Error al comunicarse con servidor.");
           }
       });
}


function municipios(){
        var est = $('#txtEstado').val();
    //if($('#txtEstado').val() == ""){
    //alert(est);
           $.ajax({
               url:ruta_generica,
               type: 'POST',
               data: {
                  funcion:  'municipios',
                  idCliente:cliente,
                  idEstado: est

               },
               processData: true,
               dataType: "json",
               success:function(re){
                  // alert(JSON.stringify(re));
                   var d = document.getElementById('txtMunicipio');
                    while(d.hasChildNodes())
                    d.removeChild(d.firstChild);
                   for(var i = 0; i < re.length; i++){
                       $('#txtMunicipio').append('<option value="'+re[i].id+'">'+re[i].nombre+'</option>')
                  }
               },
               error: function(re){
                   alert("Error al comunicarse con servidor.");
               }
           });
       //  }
}


function vr_pedido(ped){
    localStorage['verpedido'] = ped;
    window.location = "ver-pedido.html";
}

function ver_pedido(){
   // alert( localStorage['verpedido']);
     $.ajax({
            method: 'POST',
            url: ruta + 'verpedido',
            data: {
                pedido: localStorage['verpedido']
            },
            processData: true,
            dataType: "json",
            success: function(data){
              //  alert("Succ "+JSON.stringify(data));
                var i;
                for(var i = 0; i < data.importe.length; i++){
                    $('#v_pedidos').append('<tr><th><img style="height:100px;  class="imagen" src="'+ruta_imagen+data.imagen[i]+'"></th>'+
                                           '<th>'+data.producto[i]+'<p>Cantidad : '+data.cantidad[i]+'</p><p>$ '+data.importe[i]+'</p></th>'+
                                           '</tr>');
                }
            },error: function (data){
                //alert("error "+JSON.stringify(data));
               // $('#error').html(JSON.stringify(data));
            }
        }); 
}

function pedido_scr(indicador){
    if($('#nombre').val() == "" || $('#email').val() == "" || $('#telefono').val()==""){
        alert("Verifique que todos los campos esten llenos");
    }else{
         $.ajax({
            method: 'POST',
            url:ruta + "registro-cliente",
            data: {
                   nombre  :$('#nombre').val(),
                   email   :$('#email').val(),
                   telefono:$('#telefono').val()
            },
            processData: true,
            dataType: "json",
            success: function(data){
                if(data.funciono == "No"){
                    alert("Este correo electronico ya esta registrado.");
                }else{
                  //  alert(JSON.stringify(data.cliente+' , '+$('#email').val()));
                    if(data.cliente != null){
                         localStorage.setItem("cliente",$('#email').val());
                        if(indicador == 1)
                         window.location = "autorizacion3.html";
                    }
                }  
            },error: function (data){
              // $('#error').html(JSON.stringify(data));
              //  alert("error en pedido sucursal"+JSON.stringify(data));
            }
        });    
    }
}

    function autorizar(pantalla,apuntador){
        var carrito = JSON.parse(localStorage['carrito']);
        if(carrito.length == 0){
            alert('No tienes productos en el carrito');
        }else{
             if(pughpharm.isLogged()){
                 localStorage["apuntador"] = apuntador;
                localStorage['dinero'] =0;
                 localStorage['puntos'] = 0;
                 if(apuntador == 2){
                         localStorage['dinero'] = $('#total_usuario').html().replace(" pesos","");
                        pagopaypal();
                      //window.location = pantalla;
                }else if(apuntador == 1){
                         localStorage['puntos'] = $('#t_puntos').html().replace(' ó ',"").replace("puntos","");
                     window.location = pantalla;
                }else if(apuntador == 3){
                       
                     window.location = pantalla;
                }
                 //alert(localStorage['puntos'] + " , "+localStorage['tarjeta']);
             
            }else{
                 localStorage["apuntador"] = apuntador;
                if(apuntador == 3){
                        if(localStorage.getItem("cliente")){
                            window.location = pantalla;
                        }else{
                             window.location = "pedido_sucursal.html";
                        }
                }else{
                     window.location = "usuarioLealtad.html";   
                }

            }
        }
        //alert('Finalizo');
    }

function pagopaypal(){
    //alert( $('#total_usuario').html().replace(' pesos',' '));
    var accion = "https://www.sandbox.paypal.com/cgi-bin/webscr";
    var comercio = "raul_vendedor@avansys.com.mx";
    var ipn = ruta + "paypal";
    var item = "Pago con PayPal";
    var item_number = "123";
    var total = $('#total_usuario').html().replace(' pesos',' ');
    var mensaje = "Este es el invice";
    window.open(accion + "?cmd=_xclick&notify_url=" + ipn + "&business=" + comercio + "&item_name=" + item + "&item_number=" + item_number + "&amount=" + total + "&currency_code=MXN&invoice" + mensaje, '_system');
}

function picnicPendientes()
{
    var registros = JSON.parse(localStorage.getItem('pughpharm'));
    var picni = JSON.parse(localStorage.getItem('picnic'));
    //alert(picni.player_id);
    $.ajax({
            method: 'POST',
            url: ruta_generica,
            data: {
                funcion:'transaccionesPendientesAPicnic',
                idCliente:cliente,
                numeroTarjeta:localStorage['tarjeta'],
                playerId: picni.player_id
  
            },
            processData: true,
            dataType: "json",
            success: function(data){
                alert(JSON.stringify(data));
            },error: function (data){
               // alert("error picnipendientes "+JSON.stringify(data));
            }
    }); 
}


function redimirRecompensaPicnic(){
       $.ajax({
           url: ruta_generica,
           type: 'POST',
           data: {
               funcion:    'redimirRecompensaPicnic',
                idCliente:    cliente,
               idCupon:     'Coffee-Day-Reward',
               claimRewardInstance:'2'
           },
           processData: true,
           dataType: "json",
           success:function(re){
               alert(re);
           },
           error: function(re){
               alert("Error al comunicarse con servidor.");
           }
       });
}//function


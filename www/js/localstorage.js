var pughpharm={};
var configuracionApp={};


pughpharm.login=function(nombre, email, puntos, regla, codigo)
{
    
    try
    {
        localStorage.setItem('pughpharm',JSON.stringify({'nombre':nombre,'email':email, 'puntos':puntos, 'regla':regla, 'codigo':codigo }));
        //alert(email);
        localStorage.setItem('cliente',email)
        //alert(codigo);
        if(localStorage["apuntador"] == 1){
            localStorage["apuntador"] = 0
            location.href='metodoPago1.html'; 
        }else if(localStorage["apuntador"] == 2){
           localStorage["apuntador"] = 0
            location.href='metodoPago2.html'; 
        }else if(localStorage["apuntador"] == 3){
           localStorage["apuntador"] = 0
            location.href='pedido_sucursal.html'; 
        }else{
            //notificar_dispositivo();
            location.href='categoriaProductos.html';
        }
    }
    catch(error)
    {
        //alert(error.message);
        return false;
    }
}

pughpharm.isLogged = function() 
{
    
    if(localStorage.getItem('pughpharm') != null)
    {
        /*var registro = JSON.parse(localStorage.getItem('pughpharm'));
        if(registro.ntok !== undefined && registro.ntok != null)
        {
            globaltoken = registro.ntok;
            if(globalwelcome == 0)
            {
                globalwelcome = 1;
            }
            mainView.router.loadPage('tamano.html');
        }
        else
        {
            return false;
        }*/
        return true;
    }
    else
    {
        return false;
    }
};



pughpharm.deleteToken = function() 
{
    try
    {
        localStorage.removeItem('pughpharm');
        location.href='index.html';
    }
    catch(error)
    {
        return false;
    }
};

/*
$(document).ready(function(){
   if(pughpharm.isLogged())
        $("div.logo img").attr({"src":"img/logoEasierLoyalty.png","height":"30px"});
    else
        $("div.logo img").attr({"src":"img/logoEasierLoyalty.png","height":"30px"});
    
  
});
  */
function validar_cupon(){
     $.ajax({
            method: 'POST',
            url:"http://chai.lealtadprimero.com.mx/servicio/index.php",
            data: {
                   funcion :'tienePreregistroTarjetahabiente',
                   codigo  : localStorage.getItem('codigo_qr')
            },
            processData: true,
            dataType: "json",
            success: function(data){
                //alert(JSON.stringify(data));
                if(data.error == ""){
                      localStorage.setItem("verifica","3");
                    localStorage['tarjeta'] =  data.numeroTarjeta;
                    window.location = "misDatos.html";
                }else{
                    alert("Acude a tu sucursal mas cercana a validar tu codigo");
                }
                
               // localStorage.setItem("verifica",cadena);
               
                //window.location = "floatCupon02.html"
            },error: function (data){
                alert("error "+JSON.stringify(data));
            }
        });   
}



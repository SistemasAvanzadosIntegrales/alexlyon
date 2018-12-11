$(document).ready(function()
{
   var registro = JSON.parse(localStorage.getItem('pughpharm'));
   
    
   $("#lblPuntos2").html(registro.puntos+" Lyon Dólares");
   $.ajax({
        url:ruta_generica,
        type: 'POST',
        data:
        {
            funcion:'estadoCuenta',
            numeroTarjeta:localStorage['tarjeta'],
            idCliente: cliente
        },
        success:function(resp)
        { 

            resp=JSON.parse(resp);
            //$("#tablaEstadoCuenta").html(JSON.stringify(resp));
            jQuery.each(resp, function(i, val) {
                if(val.tipo=='SumarPuntos')
                    $("#tablaEstadoCuenta").append('<tr><th>'+val.fecha+'</th><th>$'+val.monto+'</th><th>'+val.saldoAnterior+'</th><th>'+val.saldoActual+'</th>');
                else
                    $("#tablaEstadoCuenta").append('<tr><th>'+val.fecha+'</th><th style="color:#f00;">- $'+val.monto+'</th><th>'+val.saldoAnterior+'</th><th>$'+val.saldoActual+'</th>');
               
                var punts=JSON.parse(localStorage.getItem('pughpharm'));
                punts.puntos = parseInt(val.saldoActual);
                localStorage.setItem('pughpharm',JSON.stringify(punts));
                $("#lblPuntos2").html(val.saldoActual+" Lyon Dólares");
            });
            
            puntos_consumidos();
        }
    }); 
});

function puntos_consumidos(){
     $.ajax({
        url:ruta_generica,
        type: 'POST',
        data:
        {
            funcion:'puntosUsados',
            numeroTarjeta:localStorage['tarjeta'],
            idCliente: cliente
        },
        success:function(resp)
        { 
            var aux = JSON.parse(resp);
            //alert(aux.puntos);
            $('#p_cons').html(aux.puntos);
        },error: function (resp){
              // $('#error').html(JSON.stringify(data));
                alert("error en puntos usado"+JSON.stringify(resp));
            }
    }); 
}
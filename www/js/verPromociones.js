function mostrarCuponesVertical(){
   $.ajax({
        url:ruta_generica,
        type: 'POST',
        data:
        {
            funcion:'cuponesSucursal',
            idCliente: cliente
        },
        success:function(resp)
        { 
            console.log(resp);
            resp=JSON.parse(resp);
            //$("#contenedorPromociones").html(JSON.stringify(resp));
            jQuery.each(resp, function(i, val) {
                  if(val.imagen!='')
                    $("#contenedorPromociones").append("<div class='inline imgPromos'><img onclick=\"modal('CP|"+val.codigoQR+"')\" src='"+val.imagen+"'><div class='sombra'><img src='img/imgSombraHorizontal.png'/></div></div>");
            });
            
            
        }
    }); 
}//function

function mostrarCuponesHorizontal(){
   $.ajax({
        url: ruta_generica,
        type: 'POST',
        data:{
            funcion:'cuponesSucursal',
            idCliente: cliente
        },
        success:function(resp){ 
            resp=JSON.parse(resp);
            var cupo="<table border='0'><tr>";
            //for(var j=0; j<=10; j++)
            for(var i=0; i<=resp.length-1; i++){
                if(resp[i].imagen!='' && resp[i].paraMapa=='1')
                    cupo+="<td><div class='inline imgPromos'><img onclick=\"modal('CP|"+resp[i].codigoQR+"')\" src='"+resp[i].imagen+"'><div class='sombra'><img src='img/imgSombraHorizontal.png'/></div></div></td>";
            }//for
            cupo+="</tr></table>";
            $("#contenedorPromociones").html(cupo);
        }//function
    }); 
}//function

function mostrarSubastas(){
   $.ajax({
        url: ruta_generica,
        type: 'POST',
        data:{
            funcion:  'subastas',
            idCliente: cliente
        },
        success:function(resp){ 
            resp=JSON.parse(resp);
            var cupo="";
            for(var i=0; i<=resp.length-1; i++){
                if(resp[i].imagen!='')
                    cupo+="<div class='inline imgPromos'><span style='font-size:1.5em; font-weight:bold;'>"+resp[i].nombre+"</span><img onclick=\"modal('"+resp[i].nombre+"','fecha "+resp[i].inicio+"','"+resp[i].descripcion+"')\" src='"+resp[i].imagen+"'><div class='sombra'><img src='img/imgSombraHorizontal.png'/></div></div>";
            }//for
            if(resp.length<=1)
                cupo+="<br><br><br><br><br><br><br><br><br><br>";
            $("#contenedorPromociones").html(cupo);
        }//function
    }); 
}//function
function loginRealm()
{
    var registro = JSON.parse(localStorage.getItem('pughpharm'));
    console.log(registro.codigo);
    snog_dispatcher.broadcast(Snog.events.REALM_LOGIN, {token: registro.codigo, realm:"easier_loyalty"});
}



function getBoardInstances()
{
    snog_dispatcher.broadcast(Snog.events.GET_BOARDS_INSTANCES, {type:'special', player_id:parseInt(localStorage.getItem('player_id')) });
}




function getBagInstance(board,title, cover, board_size, slot)
{
    $('.contenidoDetallePunchCard').html('');
    var tds="<tr>";
    var j=0;

    for(j=0; j<board_size;j++)
        tds+='<td id="slot'+j+'"><img width="60" src="'+slot+'" /></td>';

    tds+="</tr>";

    $('<table><tr><td colspan="'+board_size+'"><b>'+title+'</b></td></tr><tr><td colspan="'+board_size+'"><img width="100%" src="'+cover+'" /></td></tr>'+tds+'</table>').appendTo('.contenidoDetallePunchCard');


    snog_dispatcher.broadcast(Snog.events.LOAD_BOARD_INSTANCE_BAG, { board_instance_id:parseInt(board) });
}



$(document).ready(function(){
    // Initialize Snog engine;
    Snog.all();
    Snog.debug = false;

    snog_data = Snog.require('data');
    snog_dispatcher = Snog.require('dispatcher');



    snog_dispatcher.on(Snog.events.LOGIN_SUCCESS, function (data) 
    {
        //Guardamos en el local storage los datos de referencia a PICNIC
        localStorage.setItem('player_id',data.player_id);
        localStorage.setItem('auth_token',data.auth_token);

        //Extraemos las punchcards en las que participa el usuario
        getBoardInstances();
    });

    

    snog_dispatcher.on(Snog.events.GET_BOARDS_INSTANCES_SUCCESS, function (data) 
    {
        $("#contenedorBoardInstances").html('');
        var boardsProcessed=0;
        var banderaBoardsValidos=false;
        jQuery.each(data, function(i, val) 
        {   
            boardsProcessed++;
            if(val.empty===false)
            {
                banderaBoardsValidos=true;
                var assetsProcessed = 0;
                var assetPrevio='https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg';
                var assetCover='';
                var assetSlot='';
                jQuery.each(val.board_instance.assets, function(i, asset) 
                {  
                    assetsProcessed++;
                    if(asset.kind=='preview')
                        assetPrevio=asset.uri;
                    if(asset.kind=='cover')
                        assetCover=asset.uri;
                    if(asset.kind=='slot')
                        assetSlot=asset.uri;
                    if(assetsProcessed===val.board_instance.assets.length)
                    {
                        var cad='<div class="objetivosMision inline"><p class="avance text-azul">0/'+val.board_instance.size+'</p><img width="100" src="'+assetPrevio+'" class="img-icono" onclick="getBagInstance('+val.board_instance.board_instance_id+',\''+val.board_instance.title+'\',\''+assetCover+'\','+val.board_instance.size+',\''+assetSlot+'\');";><p>'+val.board_instance.title+'</p></div>';
                        $(cad).appendTo("#contenedorBoardInstances");
                    }
                    
                });
            }

            if(boardsProcessed===data.length)
            {
                if(banderaBoardsValidos==false)
                    $("#contenedorBoardInstances").html('<p class="alert alert-warning">No hay punchcards disponibles</p>');
            }
        });
    });


    snog_dispatcher.on(Snog.events.LOAD_BOARD_INSTANCE_BAG_SUCCESS, function (data) 
    {
                
        //Mostramos un dialogo con la información
        jQuery.each(data.bag_items, function(i, val) 
        {
            $("#slot"+val.slot_id).html('<img src="'+val.item_instance.assets[0].uri+'" width="60"/>');
        });
        if(data.bag_items.length==data.size)
            $('<input type="button" class="btn btn-success" value="Obtener cupón" onclick="obtenerCupon('+data.bag_items[0].item_instance.metadata[0].value+');"/>').appendTo('.contenidoDetallePunchCard');
        $('#dialogDetallePunchCard').show();
        
    });
    

});

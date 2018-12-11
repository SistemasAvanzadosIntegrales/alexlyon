//$(document).ready(function(){
    generar_menu("menu_generico");
//});

function generar_menu(id){
    $("#" + id).append(
        '<nav class="menu">' + 
            '<ul>' + 
                '<br>' + 
                '<center><li class="logo"><img id="usr" onclick="takepicture()" class="img-circle" style="margin-top:-3px;" src="img/user.png"></li></center>' + 
                '<center><li class="logo" onclick=""><h2 class="text-azul bullet" style="margin-top:0px;"><label style="margin-top:0px;" id="lblNombreMenu"></label></h2></li></center>' + 
                '<center><li class="logo" onclick=""><h2 class="text-azul bullet" style="margin-top:0px;"><label style="margin-top:0px;" id="lblPuntos"></label></h2></li></center>' + /* leer(); */
                '<li><center><a class="logo" href="miPerfil.html"><div class="btn-rojo"  style="margin-top:0px;"><span class="fa fa-user"></span> Mi perfil</div></a></center></li>' + 
                "<li><a class='logo' onclick=\"window.location='verSubastas.html';\"><div class='btn-rojo'  style='width:90%; margin-top:0px;'><span class='fa fa-bullhorn'></span>Subastas</div></a></li>" + 
                "<li><a class='logo' onclick=\"window.location='acercaDe.html';\"><div class='btn-rojo'  style='width:90%; margin-top:0px;'><span class='fa fa-plus-circle'></span>¿Como canjear mis Lyon Dólares?</div></a></li>" + 
                '<li><a class="logo" onclick="salir();"><div class="btn-rojo"  style="width:90%; margin-top:0px;">Salir de la aplicación</div></a></li>' + 
                //'<li class="rojo"><a class="logo2" href="verSubastas.html"><span class="fa fa-bullhorn"></span> Subastas <span class="fa fa-chevron-right pull-right"></span></a></li>' + 
                ////'<li class="rojo gamf"><a class="logo2" href="punchCardCupones.html"><span class="fa fa-gift"></span> Mis premios <span class="fa fa-chevron-right pull-right"></span></a></li>' + 
                ////'<li class="rojo gamf"><a class="logo2" href="comunidad.html"><span class="fa fa-user"></span> Comunidad <span class="fa fa-chevron-right pull-right"></span></a></li>' + 
                //'<li class="rojo"><a class="logo2" href="beneficios.html"><span class="fa fa-hand-o-right"></span> Beneficios <span class="fa fa-chevron-right pull-right"></span></a></li>' + 
                //'<li class="rojo"><a class="logo2" href="acercaDe.html"><span class="fa fa-plus-circle"></span> Como canjear... <span class="fa fa-chevron-right pull-right"></span></a></li>' +
            '</ul><center>' + 
            //'<p class="bullet margin-chico"><a class="text-azul" href="invitarAmigos.html">Invitar a mis amigos</a></p>' + 
            //'<div class="inline margin-chico" onclick="loginFacebook();"><img class="img-circle" src="img/btnFace.png"/></div>' + 
            '</center>' + 
		'</nav>'
    );
}
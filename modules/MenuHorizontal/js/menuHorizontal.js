/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function(){
    $("#searchIcon").click(function(){         
        $(this).parent().toggleClass('visible');        
    });
    
    $("#searchText").focusin(function(){
        $("#submitSearch").toggleClass("visible");
    });
     
    $("#searchText").focusout(function(){
        $("#submitSearch").toggleClass("hide");
    });
    $(".menu-bar-icon").click(function(){
        $(".horizontal-menu-left").toggle();
    });
});


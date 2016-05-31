/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function(){
    $(".descr").click(function(){
        $(this).parents(".main-item").find(".submenu").toggleClass("hide");
        $(this).find(".arrow").toggleClass("arrow-down");
    });   
});


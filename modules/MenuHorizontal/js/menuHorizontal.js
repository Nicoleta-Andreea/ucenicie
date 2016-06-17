/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var menuHorizontalClass = function(){
    var menuContainer       =  $(".nav-bar-container"),
        menuBarIcon         =  menuContainer.find(".menu-bar-icon"),  
        extern              =  {};

    var attachHandlers = function(){
        menuBarIcon.click(function(){
            var horizontalMenuLeft = menuContainer.find(".horizontal-menu-left");           
            horizontalMenuLeft.toggleClass("hide");
        });        
    };  
     
    var _init  =  function(){
        attachHandlers();
    };   
        
     _init(); 
};



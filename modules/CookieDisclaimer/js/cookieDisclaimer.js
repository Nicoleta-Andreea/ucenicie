/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var initCookieDisclaimerClass = function(){    
    var extern = {},
        cdContainer = $('.cookie-disclaimer'),
        cookiedisclaimer = "";
        
    var checkCookieDisclaimer = function(){
        cookiedisclaimer = $.cookie("cookiedisclaimer");
        return cookiedisclaimer;
    };
    
    var displayCookieDisclaimer = function(){
         cdContainer.slideUp();
    };
    
     var hideCookieDisclaimer = function(){
        cdContainer.hide();
    };
    
     var cookieDisclaimer = function(){
        $.cookie("cookiedisclaimer",true);
        displayCookieDisclaimer();
    }; 
    
    var cookieDisclaimerHandle = function(){              
        if (checkCookieDisclaimer()){            
            hideCookieDisclaimer();            
        }
    }; 
    
    var attachHandlers = function(){
        var button = cdContainer.find(".button");
        button.click(cookieDisclaimer);
    };
    
    var _init = function(){
        cookieDisclaimerHandle();
        attachHandlers();
    };   
       
    _init();
    
    return extern;
   
};


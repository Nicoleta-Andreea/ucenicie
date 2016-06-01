/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var initNlSubscriptionClass = function(){
    var extern = {},
        nlSubscriptionContainer  =  $('.newsletter-wrapper'),    
        messageContainer         =  nlSubscriptionContainer.find(".subscribe-message"),
        submit_button            =  nlSubscriptionContainer.find(".submit-button"),  
        messageContainer         =  nlSubscriptionContainer.find(".subscribe-message"),
        url                      =  "";
        nlForm                   =  nlSubscriptionContainer.find("#signupForm");
    
    var nlSubscriptionMessage = function(data){
        messageContainer.html(data);
    };
    
    extern.setUrl = function(url){
        this.url = url;
        return url;
    };
    
    extern.nlSubscription = function(){
        $.ajax({
              url: extern.setUrl,
              success:(function(data) {
                console.log(data);
                nlSubscriptionMessage(data.message);
               })
        });          
    };
    
    extern.attachHandlers = function(){      
        submit_button.click(extern.nlSubscription);
    };
    
    /*var _init = function(){
       attachHandlers();   
    };*/

    
    return extern;
    //return extern;     
    
};


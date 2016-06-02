/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var initNlSubscriptionClass = function(config){
    var extern = {},
        nlSubscriptionContainer  =  $('.newsletter-wrapper'),    
        messageContainer         =  nlSubscriptionContainer.find(".subscribe-message"),
        submit_button            =  nlSubscriptionContainer.find(".submit-button"),  
        messageContainer         =  nlSubscriptionContainer.find(".subscribe-message"),
        url                      =  (typeof config !== 'undefined' && typeof config.url !== 'undefined') ? config.url : '',
        nlForm                   =  nlSubscriptionContainer.find("#signupForm");
    
    extern.setNLUrl = function(newUrl) {
        url = newUrl;
    };
    
    var nlSubscriptionMessage = function(data){
        messageContainer.html(data);
    };
    
    extern.setUrl = function(url){
        this.url = url;
        return url;
    };
    
    extern.nlSubscription = function(){
              
        nlForm.validate();       
        if((nlForm).valid()){
            $.ajax({
                  url: url,
                  success:function(data) {
                      nlSubscriptionMessage(data.message);
                   },
                   error: function(xhr) {
                       console.log(xhr);
                   }
            });  
        }
    };
    
    var attachHandlers = function(){      
        submit_button.click(extern.nlSubscription);
    };
    
    var _init = function(){
       attachHandlers();   
    };
    
    _init();

    
    return extern;
    
};


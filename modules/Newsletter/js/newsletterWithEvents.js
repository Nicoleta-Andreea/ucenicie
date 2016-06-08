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
 
    
    var nlSubscriptionMessage = function(data){
        messageContainer.html(data);
    };
    
    var setUrl = function(data){             
        url      = data.url["nl_subscription"];
        this.url = url;
        return url;
    };   
    
    var nlSubscription = function(){
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
        submit_button.click(nlSubscription);
    };
    
    var _init = function(){        
        $("body").bind("setUrl",function(url){
           setUrl(url);
       });       
       attachHandlers();     
    };
    
    _init();  
    return extern;    
};


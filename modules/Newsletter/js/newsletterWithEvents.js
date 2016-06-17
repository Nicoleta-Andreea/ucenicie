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
        emailField               =  nlSubscriptionContainer.find(".email-address"),
        url                      =  (typeof config !== 'undefined' && typeof config.url !== 'undefined') ? config.url : '',
        nlForm                   =  nlSubscriptionContainer.find("#signupForm");
 
    
    var nlSubscriptionMessage = function(data){
        messageContainer.html(data);
    };
    
    var setUrl = function(data){             
        url   =  data.url.nl_subscription;
        this.url  =  url;
    };   
    
    var nlSubscription = function(email_address){
        nlForm.validate();         
        if((nlForm).valid()){
            var formData = {email_address:email_address};
            $.ajax({
                  url:url,
                  type:"POST",
                  dataType:"json",
                  data:formData,
                  success:function(data) {
                     nlSubscriptionMessage(data.message);
                       $( "body" ).trigger({
                        type:"showMessagecontainer",
                        messageContainer:messageContainer
                      });                   
                   },
                   error: function(xhr) {
                       console.log(xhr);
                   }
            });  
        }       
    };     
    var attachHandlers = function(){      
        emailField.focusin(function(){
           $( "body" ).trigger({
            type:"hideMessageContainer",
            messageContainer:messageContainer
          });
        });
        submit_button.click(function(){
            nlSubscription(emailField.val());          
        });
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


/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var initNlSubscriptionClass = function(){   
    var nlContainer            =  $('.newsletter-wrapper'),
        submit_button          =  nlContainer.find(".submit-button"),  
        messageContainer       =  nlContainer.find(".subscribe-message"),
        nlSubscrbeOptContainer =  $(".nl-subscribe"),
        nl_option              =  nlSubscrbeOptContainer.find(".nl-subscription");
       
        
    var getNlOption = function(){              
        return nl_option.val();        
    };
    
    var changeNlOption = function(){
        var selectedOption = getNlOption();       
        console.log("selected option="+selectedOption);
        return selectedOption;
    };
    
    var nlSubscriptionMessage = function(data){
        messageContainer.html(data);
    };
    
    var nlSubscription = function(url){
        email_address = $(".email-address").val();
        nl_option     = getNlOption();
             
        data = {email_address:email_address};
        
        $.ajax({
          url: url,
          success:(function(data) {
            console.log(data);
            nlSubscriptionMessage(data);
           })
        });             
    };   
    
    var attachHandlers = function(){      
       nl_option.change(changeNlOption);        
       submit_button.click(nlSubscription);
    };
   
    var _init = function(){
        attachHandlers();
    };
    
    _init();
    
};

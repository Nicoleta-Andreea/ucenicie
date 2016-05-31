/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var initConfigClass = function(){
    var nlContainer              =  $(".nl-subscribe"),
        nlOptions                =  nlContainer.find(".nl-config"),          
        nlSubscriptionContainer  =  $('.newsletter-wrapper'),
        submit_button            =  nlSubscriptionContainer.find(".submit-button"),  
        messageContainer         =  nlSubscriptionContainer.find(".subscribe-message"),
        configObj                =  {nl_config:''};
    
    var getSelectedValue = function(options){
        selectedValue = options.val();
        console.log("selectedValue="+selectedValue);
        
        return selectedValue;
    };       
    
    var changeNlOption = function(){
        saveConfig();
        setActionUrl("nl_config");
    };
     
    var nlSubscriptionMessage = function(data){
        messageContainer.html(data);
    };
    
    var setActionUrl  = function(key){
        var config = JSON.parse(localStorage.getItem("config"));
        
        console.log("config="+config);
        console.log("key="+key);
        
        var keyValue = config[key];
        console.log("keyvalue="+keyValue);
        
        var url = "http://localhost/first_project/first_app/public_html/resources/js/nl_subscription/files/"+keyValue+".json";
       
        console.log("url="+url);        
        return url;
    };
    
    var setSelectedValue = function(container,key){
        console.log("container="+container);
        console.log("key="+key);
        
        var config = JSON.parse(localStorage.getItem("config"));
        var keyValue = config[key];
        
        container.val(keyValue);
    }; 
    
    
    var nlSubscription = function(){
        email_address = $(".email-address").val();
                    
        data = {email_address:email_address};
        url = setActionUrl("nl_config");
        
        $.ajax({
          url: url,
          success:(function(data) {
            console.log(data);
            nlSubscriptionMessage(data.message);
           })
        });             
    };   
    
   
    var saveConfig = function(){        
        nlSelectedValue = getSelectedValue(nlOptions);
        configObj.nl_config = nlSelectedValue;
        
     
        if(typeof(Storage) !== "undefined"){
            localStorage.setItem("config",JSON.stringify(configObj));
        }else{
            return "No web storage support";
        }
    };
    
   var attachHandlers = function(){      
       nlOptions.change(changeNlOption);        
       submit_button.click(nlSubscription);
    };
    
    var _init = function(){
        saveConfig();        
        setActionUrl("nl_config");
        setSelectedValue(nlOptions,"nl_config");
        
        attachHandlers();
        
    };
    
    _init();
};

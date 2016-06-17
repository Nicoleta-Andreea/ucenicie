/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var initConfigClass = function(){   
    var extern                   =  {},
        configObj                =  {};       
    
    var setData = function(){
         listsContainer   =  $(".options-lists");
         options          =  listsContainer.find(".config");
         
         return [listsContainer,options];        
    };
        
    var updateLocalStorage = function(field_name,new_value){
         var config = JSON.parse(localStorage.getItem("config"));       
           
         $.each(config,function(key){
            configObj[key] = config[key];
         });
         
         configObj[field_name]=new_value;             
         saveConfig();
    };
    
    var getListName = function(list){
        return list.attr("name");
    };   
      
    var getSelectedValue = function(options){
        selectedValue = options.val();
        return selectedValue;
    };       
    
    var changeOption = function(){
        configObject={};        
        list = $(this);        
        configType = getListName(list);        
        selectedValue = getSelectedValue(list);     
        
        updateLocalStorage(configType,selectedValue);      
        setSelectedValue(list,configType); 
        
        url = setActionUrl(configType);
        configObject[configType] =url;          
        
        $( "body" ).trigger({
            type:"setUrl",
            url:configObject
        });
    };     
     
    var setActionUrl = function(key){       
        var config  = getConfig(),      
                      keyValue = config[key],                                    
                      url = "http://localhost/first_project/first_app/public_html/resources/js/"+key+"/files/"+keyValue+".json";   
              
        return url;
    };
    
    var setSelectedValue = function(container,key){   
         var list_name = getListName(container),
             config = getConfig(),                
             keyValue = config[key];  
                    
        container.val(keyValue);  
        
    };     
    
    var initConfig = function(){        
        $.each(options,function(){
            list           =  $(this);
            listName       =  getListName(list);
            selectedValue  =  getSelectedValue(list);   
            configObj[listName] = selectedValue;                    
        });         
        saveConfig();       
       
        config = JSON.parse(localStorage.getItem("config"));         
    };
    
    var saveConfig = function(){       
        if(typeof(Storage) !== "undefined"){
            localStorage.setItem("config",JSON.stringify(configObj));
        }else{
            return "No web storage support";
        }
    };
    
    var getConfig  =  function(){
         config = JSON.parse(localStorage.getItem("config"));
         return config;
    };   
    
   var iterateOptions = function(){
        var config = getConfig(),
            configObject = {};
      
      if (getConfig()===null || $.isEmptyObject(config)){
          initConfig();        
          configObject["nl_subscription"]  =  setActionUrl("nl_subscription");
          configObject["ask_questions"]    =  setActionUrl("ask_questions");
      }else{      
        $.each(options,function(){
              list = $(this);
              configType = getListName(list);        
              selectedValue = config[configType];            
              url = setActionUrl(configType);            
              setSelectedValue(list,configType); 
              configObject[configType]=url;
         });       
      }       
      $( "body" ).trigger({
            type:"setUrl",
            url:configObject
      });
    };      
    
    var attachHandlers = function(){      
       $.each(options,function(){
           $(this).change(changeOption);             
       });                
    };
    
    var hideMessageContainer = function(data){
        messageContainer = data.messageContainer;
        $(messageContainer).addClass("hide");
    };
    
    var showMessagecontainer = function(data){
        messageContainer = data.messageContainer;
        $(messageContainer).removeClass("hide");
    };   
    
    var _init = function(){  
       $("body").bind("setData",setData);
       $("body").bind("hideMessageContainer",hideMessageContainer);
       $("body").bind("showMessagecontainer",showMessagecontainer);       
       $("body").bind("iterateOptions",function(){
           iterateOptions();
       });
       $("body").bind("attachHandlers",function(){
           attachHandlers();
       });      
       
    };
    
    _init();  
    
    return extern;
};


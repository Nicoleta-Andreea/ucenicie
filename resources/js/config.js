/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var initConfigClass = function(){   
    var extern                   =  {},
        configObj                =  {};
    
     extern.setData = function(){
         listsContainer           =  $(".options-lists");
         options                  =  listsContainer.find(".config");
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
    
    changeOption = function(){
        list = $(this);        
        configType = getListName(list);        
        selectedValue = getSelectedValue(list);        
        updateLocalStorage(configType,selectedValue);      
        extern.setActionUrl(configType);
        setSelectedValue(list,configType); 
        
        url = extern.setActionUrl(configType);
        ConfigObject = {"url":url}; 
                
        if(configType === "nl_subscription"){        
             initNlSubscription    =  new initNlSubscriptionClass(ConfigObject);
        }else{
            initAskQuestions  = new initAskQuestionsClass(ConfigObject);
        }    
        
        //$("body").trigger()
    };     
     
    extern.setActionUrl = function(key){ 
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
    
    saveConfig = function(){       
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
    
   extern.iterateOptions = function(){
      var config = getConfig();      
      
      if (getConfig()===null || $.isEmptyObject(config)){
          initConfig();
      }else{  
        
         $.each(options,function(){
              list = $(this);
              configType = getListName(list);        
              selectedValue = config[configType];        
            
              extern.setActionUrl(configType);            
              setSelectedValue(list,configType);          
       });  
      } 
    };    
 
    extern.attachHandlers = function(){      
       $.each(options,function(){
           $(this).change(changeOption);          
       });                
    };    
    
    var _init = function(){        
       extern.setData();
       extern.iterateOptions();       
       extern.attachHandlers();       
    };
    
    _init(); 
    
    return extern;
};

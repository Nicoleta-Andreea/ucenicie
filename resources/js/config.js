/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var initConfigClass = function(){
    var listsContainer           =  $(".options-lists"),
        extern                   =  {},
        optionsList              =  [];

        configObj                =  {nl_subscription:"",ask_questions:""};
        
    var setOptionsLists = function(){
        options = listsContainer.find(".config");
        $.each(options,function(){
           list = $(this); 
           optionsList.push(list);
        });
    };
    
    var initLocalStorage = function(){       
        if(typeof(Storage) !== "undefined"){
            localStorage.setItem("config",JSON.stringify(configObj));
        }else{
            return "No web storage support";
        }
    };     

    
    var getListName = function(list){
        return list.attr("name");
    };   
      
    var getSelectedValue = function(options){
        selectedValue = options.val();
        return selectedValue;
    };       
    
    changeOption = function(){
        saveConfig($(this)); 
        config_type = getListName($(this));
        extern.setActionUrl(config_type);
    };     
     
    extern.setActionUrl  = function(key){ 
        console.log("key="+key);
        var config  = JSON.parse(localStorage.getItem("config")),      
                      keyValue = config[key],                                    
                      url = "http://localhost/first_project/first_app/public_html/resources/js/"+key+"/files/"+keyValue+".json";   
              
        console.log("url="+url);
        
        return url;
    };
    
    var setSelectedValue = function(container,key){      
        var list_name = getListName(container);
        var config = JSON.parse(localStorage.getItem("config")),                
                     keyValue = config[key];       
    
        container.val(keyValue);       
    };     
    
    var iterateOptions = function(){       
        setOptionsLists(); 
        
        $.each(optionsList,function(){
      
           list = $(this);
           list_name = getListName(list);     
           
           selectedValue = getSelectedValue(list);
           
           configObj[list_name] = selectedValue; 
           
          // saveConfig(list);
          
          
           extern.setActionUrl(list_name);
           setSelectedValue(list,list_name);
     
        });
        
 
    };
   
    saveConfig = function(list){       
        selectedValue = getSelectedValue(list);
        list_name = getListName(list);
              
        configObj[list_name] = selectedValue;       
     
        if(typeof(Storage) !== "undefined"){
            localStorage.setItem("config",JSON.stringify(configObj));
        }else{
            return "No web storage support";
        }
    };
    
   var attachHandlers = function(){      
       $.each(optionsList,function(){
           $(this).change(changeOption); 
       });
                
    };
    
    iterateOptions(); 
    
    var _init = function(){
      
       attachHandlers();
    };
    
    _init();
    
    return extern;
};

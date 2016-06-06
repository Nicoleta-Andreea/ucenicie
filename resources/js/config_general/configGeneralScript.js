/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
 var configGeneralScriptClass = function(){
    var callPopulateLists = function(){
        url = "http://localhost/first_project/first_app/public_html/resources/js/config_general/config_options.json";        
        
        $.ajax({
                  url: url,
                  success:function(data) {                        
                      populateLists(data);
                      populateLists(data);                            
                      initConfig    =  new initConfigClass();
                      
                  },
                  error: function(xhr) {
                       console.log(xhr);
                  }
        });        
    };
    
    var populateLists = function (data){
       $.each(data,function(index,element){
           if(index === "callConfiguration"){
               generateSelectOptions(element);
           }else if(index === "menuConfiguration"){
               generateMenuOptions(element);
           }
       });
    };
    
    var generateSelectOptions = function(element){
         $.each(element,function(index){                       
             list          = element[index];         
             listContainer = $("."+list.container);
             
             listHtml      = constructListHtml(list);     
            
             appendList(listHtml,listContainer); 
         });
    };
    
    var constructListHtml = function(list){        
        listHtml = "<select name='{list_name}' class='{list_class}'>{options}</select>";
        
        list_name    = list.fieldName;
        list_class   = list.fieldClass;
        list_options = list.options;
        
        listHtml = listHtml.replace("{list_name}",list_name).replace("{list_class}",list_class);
        
        options = "";     
        
        $.each(list_options,function(index){                      
            optionHtml = "<option class='{class}' value='{value}'>{label}</option>";
            optionHtml = optionHtml.replace("{class}",list_options[index].class).replace("{value}",list_options[index].value).replace("{label}",list_options[index].label);
            
            options+=optionHtml;
        });
        
       listHtml = listHtml.replace("{options}",options);     
            
       return listHtml;     
       
    };
    
    var appendList = function(listHtml,listContainer){      
       listContainer.append(listHtml);
    };
    
    var generateMenuOptions =function(element){
        return;
    };  
    
    var _init = function(){        
        callPopulateLists();
        
    };
    
    _init();
 };
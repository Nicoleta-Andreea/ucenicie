/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var initAccordionClass = function(){
    var extern = {},               
        accordionElementsContainers = $('[data-accordion]');     
        
        var addHeadline = function(element){
            var title = element.data("title");
            $('<p class="headline">'+title+'</p>').insertBefore(element);
        };         
        
        var getHeadline = function(element){
            var headline = $(element).prev(".headline");
            return headline;
        };
          
        var handleContent = function(content){
            $(content).slideToggle(); 
        };
        
        var attachHandlers = function(content){
            addHeadline(content);                    
            var headline = getHeadline(content);                     
            $(headline).click(function(){
                handleContent(content);
            });
        };  
        
        var attachHandlersForAllElements = function(){
            accordionElementsContainers.each(function() {
                var element = $(this);
                $(this).show();
                attachHandlers(element);
                if($(window).innerWidth() <= 480){
                    $(this).hide();                
                }else{
                    $(this).show();
                }                
            });             
        };
                
        var _init = function(){  
           attachHandlersForAllElements();
        };
    
       _init();
       
    return extern;   
 }; 


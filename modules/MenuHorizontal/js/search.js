/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var searchClass = function(){
     overlay           =  $(".overlay"),
     searchContainer   =  $(".search-results"),
     searchWrapper     =  $(".search-wrapper"),
     searchResultsList =  searchContainer.find(".search-results-list"),
     searchField       =  searchContainer.find(".search-text"),
     submitSearch      =  searchWrapper.find("#submitSearch"),
     extern            =  {};
      
    var retrieveSearchResults = function(){
            $.ajax({
               url:"http://localhost/first_project/first_app/public_html/resources/js/search/files/search.json",
               success:function(data){
                  constructSearchResultsList(data);
                },
                error: function(xhr){
                    console.log(xhr);
                }
            });            
    };
    
    var constructSearchResultsList = function(data){ 
        var listOptions = "";
        $.each(data,function(index){
                listOptions += "<li class='list-item'><img src='{src}'/>{content}<i class='fa fa-info' aria-hidden='true'></i></li>";
                src          = "resources/images/"+data[index].image,
                content      = data[index].description["text"];
                listOptions  =  listOptions.replace("{src}",src).replace("{content}",content);                   
        
        });        
        searchResultsList.append(listOptions);     
    }; 
    
    var displaySearchResults = function(searchTextLength){
        searchContainer.removeClass("hide");
        overlay.removeClass("hide");
        
        searchResultsListItems = searchContainer.find(".search-results-list").find(".list-item");
        
        $.each(searchResultsListItems,function(){
            $(this).addClass("hide");
        });
        
        indexesToShow = searchResultsListItems.size()-searchTextLength+1;
        
        for(var index=0; index < indexesToShow; index++){
           $(searchResultsListItems[index]).removeClass("hide"); 
        }      
    };
    
    var attachHandlers = function(){
        $(".search-text").keyup(function(){
            displaySearchResults($(this).val().length);
        });
        $(".search-text").blur(function(){
            console.log("hide search");
             $(searchWrapper).toggleClass("visible");
              $("#submitSearch").toggleClass("hide");
        });
    };    
    
    var _init = function(){
        retrieveSearchResults();
        attachHandlers();
    };
    
    _init();
    
    return extern;
};

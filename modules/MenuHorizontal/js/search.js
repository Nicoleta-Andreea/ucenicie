/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var searchClass = function(){
     overlay                  =  $(".overlay"),
     searchContainer          =  $(".search-results"),
     searchWrapper            =  $(".search-wrapper"),
     searchResultsList        =  searchContainer.find(".search-results-list"),
     searchField              =  searchContainer.find(".search-text"),
     submitSearch             =  searchWrapper.find("#submitSearch"),
     infoObject               =  [];
     extern                   =  {};
      
    var retrieveSearchResults = function(textLength){
        if(textLength <= 10){
            $.ajax({
               url:"http://localhost/first_project/first_app/public_html/resources/js/search/files/search"+textLength+".json",
               success:function(data){
                  constructSearchResultsList(data);
                  attachHandlersToImages();
                  attachHandlersToTextItems(data);
                },
                error: function(xhr){
                    console.log(xhr);
                }
            });  
        }    
    };
    
    var clearSearchResultsList = function(){
        searchResultsList.empty();
    };
    
    var constructSearchResultsList = function(data){
        clearSearchResultsList();
        
        var listOptions = "";
        $.each(data,function(index){
            info = data[index].info;            
            infoObject[index] = info;
            
            listOptions += "<li data-index='"+index+"' class='list-item clearfix'><img src='{src}' full_src='{full_src}' class='image-section'><span class='list-item-content'>{content}</span><i class='fa fa-info' aria-hidden='true'></i></li>";
            src          = "resources/images/"+data[index].image,
            full_src     = "resources/images/"+data[index].large_image; 
            content      =  data[index].description["text"];
            info         =  data[index].info;
            listOptions  =  listOptions.replace("{src}",src).replace("{full_src}",full_src).replace("{info",info).replace("{content}",content);                 
        });        
        searchResultsList.append(listOptions);                 
        searchContainer.removeClass("hide");
    }; 
    
    var constructImageModal = function(imageSrc){
        dialogHtml = "<div id='imageDialog' class='image-dialog'><img src='"+imageSrc+"'></div>";
        $(overlay).append(dialogHtml); 
    };
    var constructSearchItemContentDialog = function(infoObj){
         /*"info": {
      "type": "url", 
      "url": "www.google.ro",
      "data": {
        "headline": "Headline of first modal",
        "content": "Content of first modal"
      }
    }*/
        
    };
    var getLargerImageContainer = function(){
        return $("#imageDialog");
    };
    var getSearchItemContentContainer = function(){
        return $("#searchItemContentDialog");
    };
    var getSearchItemMoreInfoContainer = function(){
        return $("#searchItemMoreInfoDialog");
    };
    
    /*var displaySearchResults = function(searchTextLength){
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
    };*/
    
    var showLargerImage = function(imageSrc){
        constructImageModal(imageSrc);
        imageDialog = getLargerImageContainer();           

        $(imageDialog).dialog({
          maxHeight: 400,
          height:400,
          width:"auto"
        });
     };
    var showTextItemsInfo = function(itemIndex){
        
    };
    var showHideSearch = function(){
        $(searchWrapper).toggleClass("visible");
        $(submitSearch).toggleClass("hide");       
    };
    var showHideOverlay = function(){
        if(searchContainer.hasClass("hide")){
            overlay.addClass("hide");
            searchContainer.addClass("hide");
        }
    };
    
    var attachHandlersToImages = function(){
        $.each($(".image-section"),function(){
            $(this).click(function(){              
                showLargerImage($(this).attr("full_src"));
            });
        });
    };
    
    var attachHandlersToTextItems = function(){
        $.each($(".list-item-content"),function(){
            $(this).click(function(){                
                showTextItemsInfo($(this).data("index"));
            });
        });
    };
    
    var hideAllSearchArea = function(){
        overlay.addClass("hide");
        searchContainer.addClass("hide");
        
    };    
    var attachHandlers = function(){
        $(".search-text").keyup(function(){
            retrieveSearchResults($(this).val().length);
            
            //displaySearchResults($(this).val().length);
            
            showHideOverlay();
        });
        
        $(".search-text").blur(function(){
             showHideSearch();
        });   
        
        /*overlay.click(function(){
            hideAllSearchArea();
        });*/
     };    
    
    var _init = function(){      
        attachHandlers();
    };
    
    _init();
    
    return extern;
};

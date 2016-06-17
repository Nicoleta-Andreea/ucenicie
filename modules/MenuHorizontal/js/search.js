/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var searchClass = function(){
    var overlay              =  $(".overlay"),
        searchContainer      =  $(".search-results"),
        searchWrapper        =  $(".search-wrapper"),
        searchResultsList    =  searchContainer.find(".search-results-list"),
        searchField          =  searchWrapper.find(".search-text"),
        submitSearch         =  searchWrapper.find("#submitSearch"),
        searchIcon           =  searchWrapper.find("#searchIcon"),
        infoIcon             =  $(searchResultsList).find(".info"),
        extern               =  {};
      
    var retrieveSearchResults = function(textLength,text){
          if(textLength <= 10 && textLength > 0){
                var data = {text:text};
                $.ajax({
                   type:"POST",
                   dataType:"json",
                   data:data,
                   url:"http://localhost/first_project/first_app/public_html/resources/js/search/files/search"+textLength+".json",
                   success:function(data){                                          
                      constructSearchResultsList(data);                    
                      attachHandlersToImages();
                      attachHandlersToTextItems();
                      attachHandlersToMoreInfoItems();   
                      
                     setTimeout(rotateInfoIcon,50);
                    },
                    error: function(xhr){
                        console.log(xhr);
                    },
                    timeout:3000
                });  
          } 
    };    
    
    var closeSearchAreaAtEscKey = function(){      
          hideAllSearchArea();         
    };
    
    var clearSearchResultsList = function(){
        searchResultsList.empty();
    };    
    var constructSearchResultsList = function(data){        
        clearSearchResultsList();   
        
        $.each(data,function(index){
            var info = data[index].info,            
                listOptions = "";
            
            listOptions += "<li class='list-item clearfix'><img alt='{imageTitle}' src='{src}' full_src='{full_src}' class='image-section'><span class='list-item-content'>{content}</span><span class='info' ></span></li>";
            var  src     = "resources/images/"+data[index].image, //asa va fi json
                 full_src     = "resources/images/"+data[index].large_image, 
                 content      =  data[index].description["text"],
                 info         =  data[index].info,                    
                 extra        =  data[index].description.extra;   
                             
            listOptions  =  listOptions.replace("{src}",src).replace("{imageTitle}",content).replace("{full_src}",full_src).replace("{info",info).replace("{content}",content);                 
            searchResultsList.append(listOptions);
            searchResultsList.find('li').last().data({extraInfo: extra});
            searchResultsList.find('li').last().data({moreInfo:info});
        });              
        searchContainer.removeClass("hide");
        $(overlay).removeClass("hide");
    };     
    var constructImageModal = function(imageSrc,imageTitle){
        var dialogHtml = "<div id='imageDialog' class='image-dialog' title='{imageTitle}'><img src='{imageSrc}'></div>";
        dialogHtml = dialogHtml.replace("{imageTitle}",imageTitle).replace("{imageSrc}",imageSrc);        
        $(overlay).append(dialogHtml); 
    };    
    var constructSearchItemContentDialog = function(extraInfo){       
          var title      = extraInfo.title,
              content    = extraInfo.content,            
              img1Src    = "resources/images/search/"+extraInfo.image[0],
              img2Src    = "resources/images/search/"+extraInfo.image[1],
              dialogHtml = "<div id='searchItemContentDialog' class='search-item-content-dialog' title='{title}'><div class='extra-content'>{content}</div><img class='first-image' src='{firstImgSrc}'><img class='second-image' src='{secondImgSrc}' /></div>";
          dialogHtml = dialogHtml.replace("{title}",title).replace("{content}",content).replace("{firstImgSrc}",img1Src).replace("{secondImgSrc}",img2Src);
          $(overlay).append(dialogHtml);                     
    };
    var constructMoreInfoDialog = function(moreInfo){
        var title    =  moreInfo.data.headline,
            content  =  moreInfo.data.content,         
            dialogHtml  =  "<div id='searchItemMoreInfoDialog' class='search-item-more-info-dialog' title='{title}'>{content}</div>"; 
        dialogHtml  =  dialogHtml.replace("{title}",title).replace("{content}",content);
        $(overlay).append(dialogHtml);         
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
   
    var showLargerImage = function(imageSrc,imageTitle){
        var imageDialog = getLargerImageContainer();    
        
        if(imageDialog){
            imageDialog.remove();
        }        
        constructImageModal(imageSrc,imageTitle);        
        imageDialog = getLargerImageContainer();   
        
        $(imageDialog).dialog({
          maxHeight: 400,
          height:400,
          width:"auto"
        });
    };
    var showTextItemsInfo = function(extraInfo){        
        var extraInfoDialog  =  getSearchItemContentContainer();        
        if(extraInfoDialog){
            extraInfoDialog.remove();
        }
        extraInfoDialog  =  getSearchItemContentContainer();        
        constructSearchItemContentDialog(extraInfo);
        extraInfoDialog  =  getSearchItemContentContainer();
        
        if(extraInfoDialog){
            extraInfoDialog.remove();
        }
        
        $(extraInfoDialog).dialog({
          maxHeight: 400,
          height:400,
          width:"auto"
        });
    };
    var showMoreInfo = function(moreInfo){        
        var moreInfoDialog = getSearchItemMoreInfoContainer();
        
        if(moreInfoDialog){
            moreInfoDialog.remove();
        }
        constructMoreInfoDialog(moreInfo);      
        moreInfoDialog = getSearchItemMoreInfoContainer();
        
        $(moreInfoDialog).dialog({
          maxHeight: 400,
          height:400,
          width:"auto"
        });
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
                showLargerImage($(this).attr("full_src"),$(this).attr("alt"));
            });
        });
    };    
    var attachHandlersToTextItems = function(){
        $.each(searchResultsList.find(".list-item-content"),function(){          
            $(this).click(function(){
                listItem = $(this).parent();            
                extraInfo = listItem.data().extraInfo;
                              
                showTextItemsInfo(extraInfo);
            });
        });
    };
    var attachHandlersToMoreInfoItems =  function(){
        $.each(searchResultsList.find(".info"),function(){
            $(this).click(function(){
                listItem = $(this).parent();
                moreInfo = listItem.data().moreInfo;
                
                if((moreInfo).type === "info"){               
                    showMoreInfo(moreInfo);
                }else{
                    url = "https://"+moreInfo.url;
                    window.open(url);
                }    
            });
        }); 
    };
    var hideAllSearchArea = function(){  
        submitSearch.addClass("hide");
        searchField.toggleClass("visible");
        overlay.addClass("hide");
        searchContainer.addClass("hide");          
    };       
    var displayAllSearchArea = function(){
        searchField.toggleClass("visible");
        overlay.removeClass("hide");
        searchContainer.removeClass("hide");
    };
    var rotateInfoIcon = function(){
        var infoIcons = $(".search-results-list").find(".info");
        $.each(infoIcons,function(){
            $(this).toggleClass("loading");
        });
    };
    var attachHandlers = function(){
        searchField.keyup(function(e){          
            if(e.keyCode === 27){ 
                closeSearchAreaAtEscKey();
            }else{                   
                retrieveSearchResults($(this).val().length,$(this).val());  
                rotateInfoIcon();
                showHideOverlay();
           }          
        });
        searchField.focusin(function(){
          submitSearch.removeClass("hide");  
        });
        searchField.focusout(function(){
            submitSearch.addClass("hide");
            showHideSearch();
        });
        overlay.click(function(){
            hideAllSearchArea();
        });            
        searchIcon.click(function(){
             searchWrapper.toggleClass("visible");
             if(searchWrapper.hasClass("visible")){
                 if($(".search-text").val().length > 0){
                    displayAllSearchArea(); 
                }
             }            
         });  
         submitSearch.click(function(){
             $(this).toggleClass("hide");
         });
    };      
    var _init = function(){         
        attachHandlers();
    };    
    _init();    
    return extern;
};

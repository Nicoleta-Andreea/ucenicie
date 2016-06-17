/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var tabsClass = function(){
    var extern                =  {},
        tabsContainer         =  $(".tabs-wrapper"),    
        tabsContentContainer  =  tabsContainer.find(".tabs-content-wrapper"),
        allContentContainers  =  tabsContentContainer.find(".content"),
        overlay               =  $(".overlay"),      
        tab                   =  tabsContainer.find(".tab");        
    alreadySelectedTabs       =  [];
     
    var retrieveTabsContent = function(tabId){
        var data = {tabId:tabId};
        $.ajax({
            type:"POST",
            dataType:"json",
            data:data,
            url:"http://localhost/first_project/first_app/public_html/resources/js/tabs/files/tabs.json",
            success:function(data){
                populateTabContent(tabId,data);
                tabContainerId = getTabContainerByTabId(tabId);
                constructTabContentDialog(tabContainerId);
             },
             error: function(xhr){
                 console.log(xhr);
             }
        });
    };        
    var populateTabContent =  function(tabId,data){
        var tabContent     =  getTabContentByTabId(tabId,data),
            tabContainer   =  getTabContainerByTabId(tabId),            
            title          =  tabContent.title,
            imgSrc         =  "resources/images/tabs/"+tabContent.image,
            content        =  tabContent.content;            
            
            contentHtml    =  "<h4 class='title'>{title}</h4><div class='content-wrapper'><div class='image'><img src='{imgSrc}'></div><div class='content-text'>{content}</div>";
            contentHtml    =  contentHtml.replace("{title}",title).replace("{imgSrc}",imgSrc).replace("{content}",content); 
                    
            tabContainer.html(contentHtml);                     
    };    
    var getTabContainerByTabId  =  function(tabId){
        var containerId   = "#"+tabId+"Content",
            tabContainer  = tabsContentContainer.find(containerId);          
        return tabContainer;
    };     
    var getTabContentByTabId = function(tabId,data){
        var tabContent = {};           
        $.each(data,function(index){
            var id = data[index].id;
            if(id === tabId){
               tabContent = data[index];                
            }
        });
        return tabContent;
    };
    var constructTabContentDialog = function(tabContentContainer){
        var title    =  $(tabContentContainer).find(".title"),
            image    =  $(tabContentContainer).find(".image"),
            content  =  $(tabContentContainer).find(".content-text"),    
        
           tabContentHtml = $(tabContentContainer).html(),
           id = $(tabContentContainer).attr("id")+"dialog",        
           containerSelector = "#"+id;  
              
        if($(containerSelector).length === 0){
           var dialogHtml  =  "<div id='{id}' class='content-dialog'>{tabContentHtml}</div>"; 
           dialogHtml  =  dialogHtml.replace("{id}",id).replace("{tabContentHtml}",tabContentHtml);    

            overlay.append(dialogHtml);  
        }
        
        title.click(function(){
            displayAllContainerContent(id);
        });
        image.click(function(){
            displayAllContainerContent(id);
        });
        content.click(function(){
            displayAllContainerContent(id);
        });
    };    
    var displayAllContainerContent = function(id){
       var containerDialogSelector = $("#"+id);
       overlay.removeClass("hide");       
      
       containerDialogSelector.dialog({
            maxHeight: 400,
            height:400,
            width:"auto",
            close:function(){
                overlay.addClass("hide");             
                $("[aria-describedby='"+id+"']").remove();                
            }
       });  
    };    
    var initTabs = function(){
        var selectedTab = getSelectedTab(), 
            tabToSelect = $("#"+selectedTab),
            tabWasAlreadySelected = checkIfTabWasAlreadySelected(selectedTab);
        if(!tabWasAlreadySelected){                  
                retrieveTabsContent(selectedTab);                    
                alreadySelectedTabs.push(selectedTab);
        }
        preselectTab(tabToSelect);  
        saveCheckedTab(selectedTab);  
    };  
    var getSelectedTab = function(){        
        var selectedTabStored =  JSON.parse(localStorage.getItem("selectedTabStored")),
            selectedTab       =  "";   
        if((selectedTabStored === null) || ($.isEmptyObject(selectedTabStored))){
             selectedTab  =  tabsContainer.find(".tab:first").attr("id");
         }else{
             selectedTab  =  selectedTabStored;
         }        
        return selectedTab;
    };
    var preselectTab = function(tabToBeChecked){
        $(tabToBeChecked).attr("checked",true);        
    };  
    var saveCheckedTab = function(selectedTab){
        if(typeof(Storage) !== "undefined"){
            localStorage.setItem("selectedTabStored",JSON.stringify(selectedTab));
        }else{
            return "No web storage support";
        }
    };    
    var checkIfTabWasAlreadySelected = function(tabId){
        var tabWasAlreadySelected  =  false;
        $.each(alreadySelectedTabs,function(index){
            if (alreadySelectedTabs[index] === tabId){
                tabWasAlreadySelected = true;
            }
        });
        return tabWasAlreadySelected;
    };
    var attachHandlers = function(){
        tab.click(function(){
            var tabId                 = $(this).attr("id"),
                tabWasAlreadySelected = checkIfTabWasAlreadySelected(tabId);
            if(!tabWasAlreadySelected){             
                retrieveTabsContent(tabId);               
                alreadySelectedTabs.push(tabId);
                preselectTab($(this));
                saveCheckedTab(tabId);
          }else{
                preselectTab($(this));
                saveCheckedTab(tabId);
                var tabContainerId = getTabContainerByTabId(tabId);
                constructTabContentDialog(tabContainerId);
          }        
        });
    };        
    var _init = function(){ 
        initTabs();
        attachHandlers(); 
    };
    
    _init();
    
    return extern;      
};

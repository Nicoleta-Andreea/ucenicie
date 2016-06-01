/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function(){
    var initCookieDisclaimer  =  new initCookieDisclaimerClass();    
    var initAccordion         =  new initAccordionClass();    
    var initNlSubscription    =  new initNlSubscriptionClass(); 
    
    var initConfig            =  new initConfigClass();

    var url   = initConfig.setActionUrl("nl_config");
    initNlSubscription.setUrl(url);
    
    initNlSubscription.attachHandlers();
    
});

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function(){
    var initCookieDisclaimer  =  new initCookieDisclaimerClass(),    
        initAccordion         =  new initAccordionClass(),    
        initConfig            =  new initConfigClass(),       
        url                   =  initConfig.setActionUrl("nl_subscription"),    
        nlConfigObject        =  {"url": url},    
        initNlSubscription    =  new initNlSubscriptionClass(nlConfigObject); 
   
        /*url = initConfig.setActionUrl(),
        
        askQuestionsConfigObject  = {"url":url},
        initAskQuestion       =  new questionsClass();*/
    
    
});

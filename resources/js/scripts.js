/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function(){       
        initConfig            =  new initConfigClass(),
        initConfigGeneral     =  new configGeneralScriptClass(),        
       
        initCookieDisclaimer  =  new initCookieDisclaimerClass(),    
        initAccordion         =  new initAccordionClass(),               
       
        url                   =  initConfig.setActionUrl("nl_subscription"),    
        ConfigObject          =  {"url": url},    
        initNlSubscription    =  new initNlSubscriptionClass(ConfigObject),    
       
        url                   =  initConfig.setActionUrl("ask_questions"),            
        ConfigObject          =  {"url": url}, 
        initAskQuestions      =  new initAskQuestionsClass(ConfigObject);     
});

trigger Digital_Product_Tgr_ToCalcResTime on ramsoftsquare__Digital_Product__c(before insert, before update, after update) { 
     Type TgrHandlerCls = System.Type.forName('ResponseTime', 'TriggerHandlerClass'); 
 if(TgrHandlerCls != NULL) { 
  ResponseTime.TriggerHandlerClass handler = (ResponseTime.TriggerHandlerClass) TgrHandlerCls.newInstance(); 
   handler.populateResTimeCalcFromAndOwnerChangedTime(trigger.new, 'ramsoftsquare__Digital_Product__c');
       }
}
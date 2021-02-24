@isTest 
private class Test_Digital_Product_Tgr_ToCalcResTime { 
 static testMethod void calcResTimeFn() { 
     ramsoftsquare__Digital_Product__c testRec1 = new ramsoftsquare__Digital_Product__c(); 
        ramsoftsquare__Product_Brand__c testRec2 = new ramsoftsquare__Product_Brand__c(); 
    insert testRec2;
      testRec1.ramsoftsquare__Product_Brand__c= testRec2.Id; 
       insert testRec1;
      } 
}
@isTest 
private class Test_Laptop_Brand_Tgr_ToCalcResTime { 
       static testMethod void calcResTimeFn() { 
     ramsoftsquare__Laptop_Brand__c testRec1 = new ramsoftsquare__Laptop_Brand__c(); 
      testRec1.ramsoftsquare__Model_Number__c='testRecord';
       testRec1.ramsoftsquare__Price__c=10;
  insert testRec1;
      } 
}
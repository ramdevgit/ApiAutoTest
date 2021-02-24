@isTest 
private class Test_Opportunity_Tgr_ToCalcResTime { 
 static testMethod void calcResTimeFn() { 
     Opportunity testRec1 = new Opportunity(); 
    testRec1.Name='testRecord';
 testRec1.StageName='testRecord';
    testRec1.CloseDate=Date.today();
      insert testRec1;
      } 
}
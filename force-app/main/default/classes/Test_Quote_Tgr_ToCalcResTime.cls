@isTest 
private class Test_Quote_Tgr_ToCalcResTime { 
     static testMethod void calcResTimeFn() { 
     Quote testRec1 = new Quote(); 
        testRec1.Name='testRecord';
 Opportunity testRec2 = new Opportunity(); 
    testRec2.Name='testRecord';
 testRec2.StageName='testRecord';
    testRec2.CloseDate=Date.today();
      insert testRec2;
      testRec1.OpportunityId= testRec2.Id; 
 insert testRec1;
      } 
}
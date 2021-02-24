@isTest
public class LeadProcessorTest {
    @testSetup static void setup(){
		List<Lead> leadList = new List<Lead>();
        for(Integer i=0; i<200; i++){
			leadList.add(new Lead(LastName='Test', Company='SS', LeadSource='TestSource'));
            
        }
        insert leadList;
    }
    @isTest static void testBatch(){
        Test.startTest();
		LeadProcessor processor = new LeadProcessor();
        Id jobId = Database.executeBatch(processor);
        Test.stopTest();
        List<Lead> leadList = [SELECT Id, Name, LeadSource FROM Lead];
        System.assertEquals(leadList[0].LeadSource, 'Dreamforce');
    }

}
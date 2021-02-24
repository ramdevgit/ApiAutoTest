@isTest
public class WorkSiteTechnician_HandlerTest {
    
    @testSetup static void setup(){
        
        List<Technician__c> techList = new  List<Technician__c>();
        techList.add(new Technician__c(Technician_Name__c='TestTechnician1'));
        techList.add(new Technician__c(Technician_Name__c='TestTechnician2'));
		insert techList;
        
        List<Work_Site__c> worksiteList = new List<Work_Site__c>();
        worksiteList.add(new Work_Site__c(Name='TRICHY'));
        worksiteList.add(new Work_Site__c(Name='CHENNAI'));
        insert worksiteList;        
        
	}
    
    @isTest static void testCheckTechnicianAssigned(){

       List<Technician__c> techList =[SELECT Id, Name,Technician_Name__c FROM Technician__c];
       List<Work_Site__c> work_SiteList = [SELECT Id, Name FROM Work_Site__c];

        List<Work_Site_Technician__c> wstList = new List<Work_Site_Technician__c>();
        for(Integer i=0; i<techList.size() ;i++){
            Work_Site_Technician__c wst = new Work_Site_Technician__c();
            wst.Technician__c = techList[i].Id;
            wst.Work_Site__c = work_SiteList[0].Id;
            wst.Month__c = 'Jul';
            wst.Year__c = '2020';
            wstList.add(wst);

        }
        insert wstList;
        
    }

}
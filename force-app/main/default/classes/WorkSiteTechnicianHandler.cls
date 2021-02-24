public class WorkSiteTechnicianHandler {
    public static void checkTechnician(List<Work_Site_Technician__c> techList){
        
        List<Technician__c> tech=[SELECT Id,Name FROM Technician__c WHERE Id= :techList[0].Technician__r.Id];
    	System.debug(tech);
    
    }
}
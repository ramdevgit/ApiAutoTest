public class SoftwareLicense_Handler {

    public static void insertSoftwareLicenseDate(List<Software_License__c > softwareLicenseList){
                
        for(Software_License__c software : softwareLicenseList){
            
            software.Renewal_Date__c = software.Join_Date__c + 30; 
        }
    }
    
    public static void updateSoftwareLicenseDate(Map <Id, Software_License__c> oldMap, Map <Id, Software_License__c> newMap){
        
        for(Software_License__c software : newMap.values()){
        
            if(newMap.get(software.Id).Join_Date__c != oldMap.get(software.Id).Join_Date__c){
               
                software.Renewal_Date__c = newMap.get(software.Id).Join_Date__c + 30; 
            }
        }
        
    }
}
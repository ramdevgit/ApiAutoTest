@isTest
private class SoftwareLicense_Handler_Test {
	
    @testSetup  static void setup(){
        
         List<Software_License__c > softwareLicenseList = new List<Software_License__c>();
        
    	 for(Integer i=0; i < 4 ; i++){
         	Software_License__c software = new Software_License__c();
         	software.Name = 'Test' + i;
            software.Join_Date__c = Date.today() + 1;
            softwareLicenseList.add(software);
    	}
        insert softwareLicenseList;
    }	
    
    //used to test softwareLicense_Handler methods 
    @isTest static void testInsertSoftwareLicenseDate(){ 
        List<Software_License__c > softwareLicenseList =[SELECT Id, Name, Join_Date__c FROM Software_License__c];
        if(softwareLicenseList.size() > 0){
             SoftwareLicense_Handler.insertSoftwareLicenseDate(softwareLicenseList);
        }
    }
    
    //used to check before update  renewal date
    @isTest static void testUpdateSoftwareLicenseDate(){
               
         Map<Id, Software_License__c> newMap = new Map<Id, Software_License__c>([SELECT Id, Name, Join_Date__c ,Renewal_Date__c 
                                                                                FROM Software_License__c
                                                                                WHERE Name LIKE '%Test%'
                                                                               ]);
        
         Map<Id, Software_License__c> oldMap = new Map<Id, Software_License__c>([SELECT Id, Name, Join_Date__c ,Renewal_Date__c 
                                                                                FROM Software_License__c
                                                                                WHERE Name LIKE '%Test%'
                                                                               ]);
        System.debug('::oldMap:::'+ oldMap);
        if(newMap.values().size() > 0){
            
            for(Software_License__c software : newMap.values() ){
                
                System.debug('before change::software.Join_Date__c::' + software.Join_Date__c);
                software.Join_Date__c += 10;
                System.debug('after change::software.Join_Date__c::' + software.Join_Date__c);
                newMap.put(software.Id,  software);
            }
        }
        
        System.debug(':::oldMap' + oldMap);
        System.debug(':::newMap:::' + newMap);
        
        SoftwareLicense_Handler.updateSoftwareLicenseDate(oldMap, newMap);
       	System.debug(':::after update values::' + [SELECT Id, Name, Join_Date__c ,Renewal_Date__c 
                                                                                FROM Software_License__c
                                                                                WHERE Id IN : newMap.keySet()
                                                                               ]);      
    }
    
}
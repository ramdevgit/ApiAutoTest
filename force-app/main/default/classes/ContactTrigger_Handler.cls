public class ContactTrigger_Handler {

    public static void insertContactUpdateAccount(List<Contact> conList){
        
        List<Account> accList = new List<Account>();    
        
        Map<Id, Integer> accContact = new Map<Id, Integer>();
        for(Contact con : conList){
    		
            if(accContact.containsKey(con.AccountId) && con.AccountId != null ){
                accContact.put(con.AccountId, (accContact.get(con.AccountId) + 1 ));
             }  else {
              			 accContact.put(con.AccountId, 1);
					}
        }        
        
         for(Account acc : [SELECT Id, Name, Total_Contacts__c FROM Account WHERE Id IN : accContact.keySet() ] ){
            
            if(accContact.containsKey(acc.Id) &&  acc.Total_Contacts__c != null ){
                acc.Total_Contacts__c += accContact.get(acc.Id);
            } else{
                acc.Total_Contacts__c = accContact.get(acc.Id);
              }
            
             accList.add(acc);
        }
               
        if(accList.size() > 0){
            update accList;
        }
    }   
    
    
    public static  void updateContactUpdateAccount(Map<Id, Contact> oldMap, Map<Id, Contact> newMap){
        
        Map<Id, Integer> incrementMap = new Map<Id, Integer>();
        Map<Id, Integer> decrementMap = new Map<Id, Integer>();
        List<Account> accList =new List<Account>();
       
        for(Id conId : newMap.keySet()){
           
            if(newMap.get(conId).AccountId != oldMap.get(conId).AccountId){
               
                if(!incrementMap.containsKey(newMap.get(conId).AccountId)){
                     incrementMap.put(newMap.get(conId).AccountId, 1);	  
                   
                } else if(incrementMap.containsKey(newMap.get(conId).AccountId)){                    
                	incrementMap.put(newMap.get(conId).AccountId, (incrementMap.get(newMap.get(conId).AccountId) + 1));
                }
                
                if(!decrementMap.containsKey(oldMap.get(conId).AccountId)){
                    decrementMap.put(oldMap.get(conId).AccountId, 1);  
                  
                } else if(decrementMap.containsKey(newMap.get(conId).AccountId)){
					decrementMap.put(oldMap.get(conId).AccountId, (decrementMap.get(newMap.get(conId).AccountId) + 1 ));  
               	  }
            }
        }
        System.debug('::incrment Map' + incrementMap);
        System.debug(':::decrement Map'+ decrementMap);
        for(Account acc : [
            				SELECT Id, Name, Total_Contacts__c 
            				FROM Account 
            				WHERE Id IN : incrementMap.keySet() 
            				OR Id IN :decrementMap.keySet() ]){
            
        	if(incrementMap.containsKey(acc.Id) && acc.Total_Contacts__c != null ) {
               System.debug('::update increment account contacts' + incrementMap.get(acc.Id));
               acc.Total_Contacts__c += incrementMap.get(acc.Id);
            }   
            
           if(decrementMap.containsKey(acc.Id) && acc.Total_Contacts__c != null && acc.Total_Contacts__c > 0){
               	System.debug('::update decrement account contacts' + decrementMap.get(acc.Id)  );
               	acc.Total_Contacts__c -= decrementMap.get(acc.Id);
           }   
           accList.add(acc);                     
        }
        
        update accList;
 	}
    
    public static void deleteCheckIsPrimaryContact(List<Contact> contactList){
        
        for(Contact con : contactList){
            
            if(con.Is_Primary_Contact__c == True){
                    con.addError('Primary Contact unable to delete');
                }
        }
    }
    
    public static void deleteContactUpdateAccount(List<Contact> oldContactList){
        
        Map<Id, Integer> decrementMap = new Map<Id, Integer>();
        List<Account> accList = new List<Account>();
        
        for(Contact con : oldContactList){
            
            if(!decrementMap.containsKey(con.AccountId)){
                decrementMap.put(con.AccountId, 1);
            } else{
                	Integer count = decrementMap.get(con.AccountId);
                	decrementMap.put(con.AccountId, (count+ 1));
            	}
        }
        
        for(Account acc : [SELECT Id, Name, Total_Contacts__c FROM Account WHERE Id IN : decrementMap.keySet()]){
           
            if(decrementMap.containsKey(acc.Id) && acc.Total_Contacts__c != null && acc.Total_Contacts__c != 0){
                System.debug('::: delete contact decrement account total count' + decrementMap.get(acc.Id));
               	acc.Total_Contacts__c -= decrementMap.get(acc.Id);
           }   
          accList.add(acc);

        }
        System.debug('::delete trigger on Contact ' + accList);
        update accList;
    }
    
}
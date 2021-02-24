public class AccountTrigger_Handler {
    
    public  static void ownerChange(List<Account> accList){
        
    	Set<String> namesSet=new Set<String>{'Ramesh Admin 2019','Ramesh R'};
    	List<User> usersList=new List<User>([SELECT Id,Name FROM User WHERE Name IN :namesSet]); 
    	Map<String,Id> userAccountMap=new Map<String,Id>();
        
        for(User u:usersList){
            userAccountMap.put(u.Name,u.Id);
        }    
   	   for(Account account:accList){
        
    	   if( account.Country__c=='USA'){
           		account.OwnerId=userAccountMap.get('Ramesh R');
           } 
        
          if( account.Country__c=='INDIA'){            
        	account.OwnerId=userAccountMap.get('Ramesh Admin 2019');
          }
    
       }
    }
    public static void insertAccountWithContact(List<Account> accList){
        List<Contact> contactList = new List<Contact>();
 	    for(Account acc : accList){
            
            SendAccountsFromRamSource.createAccount(acc.Name, acc.Id); // added 24/08/2020 for external callout
            
            Contact con = new Contact();
            con.AccountId = acc.Id;
            con.LastName ='Test';
            
       		if(acc.Type != null ){    
                con.Is_Primary_Contact__c = True;
                con.LastName = acc.Type;
            }
            
            contactList.add(con);
    	}
     
    	if(contactList.size()>0){
        	insert contactList;
    	}
    }
    
    public static void updateAccountWithContact(Map<Id, Account> newMap){
	
    	List<Contact> contactList = new List<Contact>() ;  
        Set<String> conNameSet = new Set<String>();
        
                 
        for(Contact  con : [SELECT Id, Name, AccountId, Is_Primary_Contact__c FROM Contact WHERE AccountId IN : newMap.keySet() ] ){                                                        
           	conNameSet.add(con.Name);
            con.Is_Primary_Contact__c = False;
            if(newMap.containsKey(con.AccountId) && newMap.get(con.AccountId).Type == con.Name ){
                  con.Is_Primary_Contact__c = True; 
            }
            
           contactList.add(con);
        }
        
        for(Account acc : newMap.values()){
            
            if(!conNameSet.contains(acc.Type) && acc.Type != null){
       	   		 Contact newContact = new Contact();
                 newContact.AccountId = acc.Id;
               	 newContact.Is_Primary_Contact__c = True;
               	 newContact.LastName = acc.Type;
               	 contactList.add(newContact); 
                 System.debug('::AccountTrigger_Handler.updateAccountWithContact::newContact'+ newContact);
            }
        }
        if(contactList.size() > 0){
             upsert contactList;
        }   
        System.debug('::AccountTrigger_Handler.updateAccountWithContact::'+ contactList);
    }
    
    public static void updateAccountContactActive(List<Account> accList, Map<Id, Account> accNewMap ){
		
        List<Contact> contactList = new List<Contact>();
        
        for(Account acc : accList){
            
            for(Contact con : [SELECT Id, Name, Activation_Date__c, Contact_Active__c 
                               FROM Contact WHERE AccountId IN : accNewMap.keySet() ]){
                
            	if(acc.Account_Active__c != accNewMap.get(acc.Id).Account_Active__c && (accNewMap.get(acc.Id).Account_Active__c == 'Yes') ){
                    
                    accNewMap.get(acc.Id).Activation_Date__c = SYSTEM.today();
                    con.LastName = acc.Name;
                    con.AccountId = acc.Id;
                    con.Activation_Date__c = accNewMap.get(acc.Id).Activation_Date__c;
                    con.Contact_Active__c = accNewMap.get(acc.Id).Account_Active__c ;
            	}
        	}  
        } 
        if(contactList.size()>0){
			update contactList;
        }
    }

}
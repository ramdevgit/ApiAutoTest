@isTest
public class ContactTrigger_HandlerTest {

    @testSetup static void setup(){
        List<Account> accList = new List<Account>();
        
        accList.add(new Account(Name='TestAcc1'));
        accList.add(new Account(Name='TestAcc2'));
        if(accList.size() > 0){
            insert accList;
        }
        
        List<Contact> contactList = new List<Contact>();
        for(Integer i=0; i< 10; i++){
            
            Contact con = new Contact();
            con.LastName ='TestContact'+ i;
            con.AccountId = accList[1].Id;
            
            if(i<5 ){
                con.AccountId = accList[0].Id;
            }
            contactList.add(con);
        }
        insert contactList;
    }
    
    @isTest static void testInsertContactUpdateAccount(){
        List<Contact> conList = [SELECT Id, Name, AccountId FROM Contact];
        System.debug(':::contactList:::' + conList);
        ContactTrigger_Handler.insertContactUpdateAccount(conList);
    }
    
    @isTest static void testupdateContactUpdateAccount(){
        
        Map<Id, Contact> oldMap = new Map<Id, Contact>([SELECT Id, Name, AccountId FROM Contact]);
        Map<Id, Contact> newMap = new Map<Id, Contact>([SELECT Id, Name, AccountId FROM Contact]);
		Id accId1;
        Id accId2;
        
        for(Contact con : newMap.values()){
			
            if(accId1 ==null && con.AccountId != accId1){
                accId1 = con.AccountId;
                System.debug('::First AccId::'+ accId1);
            }   
            if(con.AccountId != accId1){
                con.AccountId =accId1;
                
            }
             if(accId2==null && con.AccountId != accId1 && con.AccountId != accId2){
                accId2 = con.AccountId;
                System.debug('::Second AccId::'+ accId2);
            }   
            if(con.AccountId != accId2){
                con.AccountId =accId2;
            }
            newMap.put(con.Id, con);
            ContactTrigger_Handler.updateContactUpdateAccount(oldMap, newMap);
        }
        
    }
    
    @isTest static void testDeleteContactUpdateAccount(){
        List<Contact> contactList = [SELECT Id, Name, AccountId FROM Contact ];
        delete contactList;
    }
    
}
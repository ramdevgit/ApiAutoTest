trigger contactTrigger on Contact (after insert,  after update, before delete, after delete) {
    
    
    if( Trigger.isInsert && Trigger.isAfter){
        //ContactTrigger_Handler.insertContactUpdateAccount(Trigger.new);
    }
    
    if( Trigger.isUpdate && Trigger.isAfter){
         ContactTrigger_Handler.updateContactUpdateAccount(Trigger.oldMap, Trigger.newMap);
    }
    
    if(Trigger.isDelete && Trigger.isBefore){
    
        ContactTrigger_Handler.deleteCheckIsPrimaryContact(Trigger.old);
         
    }
    
    if(Trigger.isDelete && Trigger.isAfter){
        System.debug('After Delete Trigger.oldMap' + Trigger.oldMap);
        System.debug('After  Trigger old'  + Trigger.old);
        ContactTrigger_Handler.deleteContactUpdateAccount(Trigger.old);
        System.debug(':::after deleted contact:::' + [SELECT Id, Name FROM Contact WHERE Name='RAMKI' AND IsDeleted=False ALL ROWS ]);
    }
    
}
trigger accountTrigger on Account ( after insert, before update, after update) {
  
    
   
    if(Trigger.isUpdate && Trigger.isBefore) {
         AccountTrigger_Handler.updateAccountWithContact(Trigger.newMap);
    }
    
    if(Trigger.isAfter) {  
        if(Trigger.isInsert){
             AccountTrigger_Handler.insertAccountWithContact(Trigger.new);
        } 
        else if(Trigger.isUpdate) {
            AccountTrigger_Handler.updateAccountContactActive(Trigger.old, Trigger.newMap);
        }
    }
    
}
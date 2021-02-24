trigger paymentTrigger on Payment__c ( after insert, after update ) {

    
    if(Trigger.isInsert && Trigger.isAfter){
       PaymentTrigger_Handler.insertPaymentUpdateOpportunity(Trigger.newMap);    
    }
    
    if(Trigger.isUpdate && Trigger.isAfter){
        System.debug(':::After update Trigger.new:::' + Trigger.new);
        System.debug(':::After update Trigger.old:::' + Trigger.old);
        System.debug(':::After update Trigger.oldMap:::' + Trigger.oldMap);
        System.debug(':::After update Trigger.newMap:::' + Trigger.newMap);
       PaymentTrigger_Handler.insertPaymentUpdateOpportunity(Trigger.newMap);
    }
}
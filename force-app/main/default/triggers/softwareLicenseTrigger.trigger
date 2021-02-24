trigger softwareLicenseTrigger on Software_License__c (before insert, before update) {

    if(Trigger.isInsert && Trigger.isBefore){    
        SoftwareLicense_Handler.insertSoftwareLicenseDate(Trigger.new);
    }
    if(Trigger.isUpdate && Trigger.isBefore){
    
        SoftwareLicense_Handler.updateSoftwareLicenseDate(Trigger.oldMap, Trigger.newMap);
    }
}
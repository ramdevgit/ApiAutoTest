trigger workSiteTechnicianTrigger on Work_Site_Technician__c (before insert, before update) {
   
   WorkSiteTechnician_Handler handler = new WorkSiteTechnician_Handler();
   if(Trigger.isInsert && Trigger.isBefore){
         // WorkSiteTechnician_Handler.checkTechnicianAssigned(Trigger.new);
   } 
   
   if(Trigger.isUpdate && Trigger.isBefore){
       System.debug('Update Trigger');
       handler.checkFromulaFieldBeforeUpdate(Trigger.oldMap, Trigger.newMap);
   }
}
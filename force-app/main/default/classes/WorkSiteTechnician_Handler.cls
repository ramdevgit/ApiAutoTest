public class WorkSiteTechnician_Handler {

    public  void checkTechnicianAssigned(List<Work_Site_Technician__c> wstList){
	
        List<String> techAssignedList = new List<String>();
        
        for(Work_Site_Technician__c wst : wstList){
                techAssignedList.add(wst.Technician_Assigned_Month__c);
        }
        
        List<Work_Site_Technician__c> worksiteTechList =[
                                                           SELECT Id, Name, Technician__c, Technician_Assigned_Month__c 
                                                           FROM Work_Site_Technician__c 
                                                           WHERE  Technician_Assigned_Month__c IN : techAssignedList
                                                        
                                                        ]; 
                                                        
        Map<String,String> techWorkSiteMap = new Map<String,String>();
        
        if(worksiteTechList.size() > 0){ 
        
            for(Work_Site_Technician__c wst : worksiteTechList ){ 
         
                techWorkSiteMap.put(wst.Technician__c, wst.Technician_Assigned_Month__c );
            }
                                                  
            for(Work_Site_Technician__c wstech : wstList){
            
                if(wstech.Technician_Assigned_Month__c == techWorkSiteMap.get(wstech.Technician__c)){
                      
                     wstech.addError('Technician already assigned following month ');
                 }
             }                                                                           
                                                    
       }      
    }
    
    public void checkFromulaFieldBeforeUpdate(Map<Id, Work_Site_Technician__c > oldMap, Map<Id, Work_Site_Technician__c > newMap ){
        for(Work_Site_Technician__c wst : oldMap.values()){
            System.debug(':::Formula Field:::' + wst.Technician_Assigned_Month__c);
        }
    }
                                           
}
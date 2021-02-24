trigger caseUserTrigger on Case (after insert, after update) {
    
    if(Trigger.isInsert && Trigger.isAfter){
        List<CaseShare> caseshareList = new List<CaseShare>();
        
        for(case cases : trigger.new){
            if(cases.User__c != NULL){
                
                caseshareList.add(new CaseShare(CaseId = cases.Id, UserOrGroupId = cases.User__c, CaseAccessLevel ='READ' ));
                
            }
        }
        insert caseshareList;
    }
    if(Trigger.isAfter && Trigger.isUpdate){
        //List<CaseShare> caseshareList = new List<CaseShare>();
        Set<Id> caseIdSet = new Set<Id>();
        for(Case cases : trigger.oldmap.values()){
            caseIdSet.add(cases.Id);
        }
        List<CaseShare> caseShareList = new List<CaseShare>([SELECT Id, CaseId, UserOrGroupId FROM CaseShare WHERE CaseId IN :caseIdSet]);
        for(CaseShare caseshares : caseShareList){
            
            /*(!(trigger.newmap.containskey(cashshares.UserOrGroupId)){
                caseshares.CaseId = 
            }*/
            if(caseshares.UserOrGroupId != NULL && (trigger.oldmap != NULL && (trigger.oldmap.get(caseshares.CaseId).User__c != caseshares.UserOrGroupId))){
                caseshares.UserOrGroupId = trigger.newmap.get(caseshares.CaseId).User__c;
                //caseshareList.add(new CaseShare(CaseId = cases.Id, UserOrGroupId = cases.User__c, CaseAccessLevel ='READ' ));
            }
        }
        
        update caseshareList;
        
    }
}
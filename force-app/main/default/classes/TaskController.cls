public class TaskController {
    
    @AuraEnabled
    public static List<Task> getTasks(String leadId){
        List<Task> taskList = new List<Task>();
        taskList = [SELECT Id,  Status FROM Task WHERE WhoId=: leadId AND Status != 'Completed' AND ActivityDate < TODAY ];
        for(Task taskInstance: taskList){
            taskInstance.Status = 'Completed';
        }
        if(!taskList.isEmpty()){
            update taskList;
        }
        
        return taskList;
    }
}
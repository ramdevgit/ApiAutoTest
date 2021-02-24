trigger TotalMark on Student__c (before insert,before update) {

    if(Trigger.isInsert){
        List<Student__c> studentObject=trigger.new;
         Integer recordCount = Trigger.New.size();
         EmailManager.sendMail('ramsoftnetwork@gmail.com', 'Trailhead Trigger Tutorial', 
                    recordCount + ' contact(s) were inserted.');
        for(Student__c student:studentObject){
            student.Total_Mark__c=student.CHEMISTRY__c+student.Physics__c+student.MATHEMATICS__c;
           
        }   
    }
      
}
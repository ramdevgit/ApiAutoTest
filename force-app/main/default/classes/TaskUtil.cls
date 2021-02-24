public class TaskUtil {
    
	 public static String getTaskPriority(String leadState) {
        // Validate input
      /*  if (String.isBlank(leadState) || leadState.length() > 2) {
            return null;
        }*/
            
        String taskPriority;
        
        if (leadState == 'NY') {
             taskPriority = 'Normal'; 
        } 
        
        return taskPriority;
    }
}
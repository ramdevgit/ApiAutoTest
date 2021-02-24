public class AssesmentListExample {
    public AssesmentListExample(){
    	List<Integer> numbersList = new List<Integer>{1,4,7};
        numbersList.add(1);
        numbersList.add(4);
        numbersList.sort();
        numbersList.add(3);
        System.debug(numbersList);    
    }
   
}
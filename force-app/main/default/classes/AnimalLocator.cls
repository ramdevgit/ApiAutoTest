global class AnimalLocator {
     webService static String getAnimalNameById(Integer animalId){
        String retrunString = '';
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://th-apex-http-callout.herokuapp.com/animals/'+animalId);
        request.setMethod('GET');
        HttpResponse response = http.send(request);
        // If the request is successful, parse the JSON response.
        
        // Deserializes the JSON string into collections of primitive data types.
        //Map<String, Object> results = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
        Animal1 result = (Animal1) JSON.deserialize(response.getBody(), Animal1.class);
        AnimalWrapper wrapper = result.animal;
        System.debug('result::animal::'+ result);
        return wrapper.Name;
 
    }
    public class AnimalWrapper{
        public Integer id;
        public String name;
        public String eats;
        public String says;
    }
    public class Animal1{
        public AnimalWrapper animal;
    }
    
}
public class ParkLocator {
    public static List<String> country(String countryName){
       ParkService.ParksImplPort parkserviceImpl = new ParkService.ParksImplPort();
       return parkserviceImpl.byCountry(countryName);
    }
}
public class SendAccountsFromRamSource {
    
    private final String clientId = '3MVG9n_HvETGhr3DOx.IEIHYF.WnZEVI0aO.o87UYcNAVh4uzKBZk67JCRdK_WD4KW9ZySd.R1taF52_3lJI4';
    private final String clientSecret = '8702B5B1E54235244FE5B76C0B4BAAB7662C8633CE1A34E1F59E8C87E294D7D4';
    private final String username = 'ramsecurity@softsquare.com';
    private final String password = '123product';
    public class deserializeResponse
    {
        public String id;
        public String access_token;
    }
    public String ReturnAccessToken (SendAccountsFromRamSource acount)
    {
        String reqbody = 'grant_type=password&client_id='+clientId+'&client_secret='+clientSecret+'&username='+username+'&password='+password;
        Http h = new Http();
        HttpRequest req = new HttpRequest();
        req.setBody(reqbody);
        req.setMethod('POST');
        req.setEndpoint('https://login.salesforce.com/services/oauth2/token');
        HttpResponse res = h.send(req);
        deserializeResponse resp1 = (deserializeResponse)JSON.deserialize(res.getbody(),deserializeResponse.class);
        return resp1.access_token;
    }
    @future(callout=true)
    public static void getAccounts(){
        SendAccountsFromRamSource acount = new SendAccountsFromRamSource();
        String accessToken = acount.ReturnAccessToken (acount);
        //String accessToken = '6Cel800D2v0000014t9b8882v000007sjaM97tuXELRQVRyZnI8CXsl4CuF2Y5Jz6AEGLd0j5HFQnvpFmpWOMnWlhggMFXpVHUv5UCZniBP';
        System.debug('accessToken::'+ accessToken);
        if(accessToken != null){
            String endPoint = 'https://awesome-cody-115271-dev-ed.lightning.force.com/services/apexrest/Accounts/*';
            Http h2 = new Http();
            HttpRequest req1 = new HttpRequest();
            req1.setHeader('Authorization','Bearer ' + accessToken);
            
            req1.setMethod('GET');
            req1.setEndpoint(endPoint);
            HttpResponse res1 = h2.send(req1);
            System.debug('SendAccountFromSource::Account::res1:'+res1.getbody());
            
        }
    }   
    
    @future(callout=true)
    public static void createAccount(String accName, String accId)
    {
        SendAccountsFromRamSource account = new SendAccountsFromRamSource();
        String accessToken = account.ReturnAccessToken (account);
        //String accessToken = '6Cel800D2v0000014t9b8882v000007sjaM97tuXELRQVRyZnI8CXsl4CuF2Y5Jz6AEGLd0j5HFQnvpFmpWOMnWlhggMFXpVHUv5UCZniBP';
        System.debug('accessToken::'+ accessToken);
        if(accessToken != null)
        {
            String endPoint = 'https://awesome-cody-115271-dev-ed.lightning.force.com/services/apexrest/Accounts/';
            String jsonstr = '{"name" : "' + accName + '"}';
            Http h2 = new Http();
            HttpRequest req1 = new HttpRequest();
            req1.setHeader('Authorization','Bearer ' + accessToken);
            req1.setHeader('Content-Type','application/json');
            req1.setHeader('accept','application/json');
            req1.setBody(jsonstr);
            req1.setMethod('POST');
            req1.setEndpoint(endPoint);
            HttpResponse res1 = h2.send(req1);
            System.debug('SendAccountFromSource::Account::res1:'+res1.getbody());
            fromJSON resp2 = (fromJSON)JSON.deserialize(res1.getbody(),fromJSON.class);
            Account a = [SELECT Id FROM Account WHERE Id = :accId];
            a.externalId__c = resp2.id;
            update a;
            System.debug('SendAccountFromSource::Account:::'+ a + res1.getbody()+'RES2::'+ resp2);
        }
    }
    public class fromJSON{
        public String Name;	//External Account
        public String Id;	//0012v000036fWrwAAE
    }
    public class cls_attributes {
        public String type;	//Account
        public String url;	///services/data/v49.0/sobjects/Account/0012v000036fWrwAAE
    }
    
}
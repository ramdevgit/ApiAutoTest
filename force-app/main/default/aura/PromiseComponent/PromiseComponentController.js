({
    
    onclick : function(cmp, evt, hlp) {
        hlp.apex(cmp,'myServerSideAction_1',{ input : 'START-PROMISE' })
        .then(function(result){
            console.log('Call 1 : ' , result );
            return hlp.apex(cmp,'myServerSideAction_2',{ input : result });
        })
        .then(function(result){
            console.log('Call 2 : ' , result );
            return hlp.apex(cmp,'myServerSideAction_3',{ input : result });
        })
        .then(function(result){
            console.log('Call 3 : ', result );
        })
        // optionally more chainings here
        ;
    }/*    
    onclick : function(cmp, evt, hlp) {
        var call1 = cmp.get("c.myServerSideAction_1");
        call1.setParams( { input : 'START' } );
        call1.setCallback(null,function(res) {
            if(res.getState()=='SUCCESS') {
                console.log('Call 1 : ', res.getReturnValue() ); 
                var call2 = cmp.get("c.myServerSideAction_2")
                call2.setParams( { input : res.getReturnValue() } );
                call2.setCallback(null,function(res) {
                    if(res.getState()=='SUCCESS') {
                        console.log('Call 2 : ', res.getReturnValue() ); 
                        var call3 = cmp.get("c.myServerSideAction_3")
                        call3.setParams( { input : res.getReturnValue() } );
                        call3.setCallback(null,function(res) {
                            if(res.getState()=='SUCCESS') {
                                console.log('Call 3 : ', res.getReturnValue() ); 
                                
                                // ... optionally more nestings here
                                
                            }
                        });
                        $A.enqueueAction(call3);
                    }
                });
                $A.enqueueAction(call2);
            }
        });
        $A.enqueueAction(call1);        
    }*/
})
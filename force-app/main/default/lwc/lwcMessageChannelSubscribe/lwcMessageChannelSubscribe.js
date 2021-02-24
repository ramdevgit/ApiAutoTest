import { LightningElement, wire, track } from 'lwc';
import {createMessageContext, releaseMessageContext,  publish, subscribe, APPLICATION_SCOPE} from 'lightning/messageService';
import SAMPLEMC from "@salesforce/messageChannel/SampleMessageChannel__c";
import NAME_FIELD from '@salesforce/schema/Account.Name';
import REVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';

export default class LwcMessageChannelSubscribe extends LightningElement {

    context = createMessageContext();
    subscription = null;
    @track objectApiName = 'Account';
    @track accountId;
    fields = [NAME_FIELD, REVENUE_FIELD, INDUSTRY_FIELD];
    

    connectedCallback(){

        console.log('lwcMessageChannelSubscribe:::connectedCallback::::');
        this.subscribeMC();

    }
    subscribeMC(){
        if(this.subscription){
            return;
        }

        console.log('subscribeMC:::');
        this.subscription = subscribe(this.context, SAMPLEMC, (message ) =>{
            this.handleMessage(message);
        },{scope:APPLICATION_SCOPE});

    }
    handleMessage(message){

        console.log('handleMessage::::', message.recordId);
        this.accountId = message.recordId;
    }
   

}
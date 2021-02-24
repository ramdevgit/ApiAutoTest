import { LightningElement,api,track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

import getDocumentLink from "@salesforce/apex/DocumentUploadController.getDocumentLink";


/* This imported function used to show toast, filter errors, get Values from record */
import {formatDate, filterErrors, getValueFromObject } from "c/utils";

export default class DocumentUpload extends NavigationMixin(LightningElement)  {
    
    @api recordId;
    @track contentDocuments;
    @track currentDocument ={};
    @track showImage = false;
    @track toolbarClasses;

    get acceptedFormats() {
        return ['.pdf', '.png','.jpg','.mp4'];
    }
    connectedCallback(){

        console.log('documentUpload::js::::connectedCallback::::', this.recordId);
        this.getDocumentLinks();

    }
    modalComponent(){
        return this.template.querySelector('c-modal');
    }
    getDocumentLinks(){

        console.log('getDocumentLinks:::::');
        getDocumentLink({recordId : this.recordId})
        .then(result=>{
            let contentDocuments = JSON.parse(result);
            console.log('result::::', JSON.stringify(contentDocuments));
            let uploadedFiles = [];
            if(contentDocuments && contentDocuments.length > 0){

                contentDocuments.forEach(document=>{
                    console.log('document:::', JSON.stringify(document));
                    let contentDoc = {...document}
                    contentDoc.iconName = this.getDocumentIconName(document.FileExtension) ? this.getDocumentIconName(document.FileExtension) : '';
                    if(contentDoc.iconName && contentDoc.iconName === 'doctype:image'){
                        contentDoc.isImage = true;
                        contentDoc.url = '/sfc/servlet.shepherd/version/download/'  + contentDoc.Id;
                    }else if(contentDoc.iconName){
                        contentDoc.isImage = false;
                        //contentDoc.url = '/sfc/servlet.shepherd/version/download/'  + contentDoc.Id;
                    }

                    contentDoc.CreatedDate = formatDate(document.CreatedDate, '-','dd-mm-yyyy');
                    contentDoc.altText = document.Title;

                    //contentDoc.url="https://c.ap1.content.force.com/sfc/servlet.shepherd/version/download/" + contentDoc.Id;
                    contentDoc.ContentSize = this.calculateContentSize(document.ContentSize);
                    console.log(' contentDoc:after::', JSON.stringify(contentDoc));
                    uploadedFiles.push(contentDoc);
                });
                this.contentDocuments = uploadedFiles;

                console.log('this.contentDocuments:::', JSON.stringify(this.contentDocuments));
            }
        })
        .catch(error=>{
            console.log('error::', error);
        });
    }

    calculateContentSize(size){
        console.log('before::calculateContentSize:::', size);
       
         let contentSize = Math.round((size / 1024));

         console.log('contenSIze:::', contentSize);

        if(contentSize >= 1024 && contentSize < 102400){

            console.log('kb:::::1mb', );
            contentSize = (contentSize / 1024).toFixed(1) + ' MB';

        }else if(contentSize >= 102400 && contentSize <= 1024000){
            contentSize += (contentSize / 1024 ).toFixed(1)+ ' GB';
        }else{
            contentSize += ' KB';
        }
         console.log('calculateContentSize:::', contentSize);
        return contentSize;
    }

    getDocumentIconName(fileExtension){
        
    
        if(fileExtension === 'mp3'){
             return 'doctype:audio';

        }else if(fileExtension === 'mp4'){
            return 'doctype:mp4';
        }
        else if(fileExtension === 'png' || fileExtension === 'jpg' || fileExtension === 'jpeg' ){
            return 'doctype:image';
        }
        return null;
    }
    openImageModal(event){

        console.log('openImageModal::::name::', event.target.name);
       
        this.currentDocument = this.contentDocuments[event.target.name];
        console.log('currentDocument"::::', JSON.stringify(this.currentDocument));
        this.showImage = true;

        /*if(this.currentDocument.url){
            this.modalComponent().openModal();
        }
        */
    }   

    handleUploadFinished(event) {
        // Get the list of uploaded files
        const uploadedFiles = event.detail.files;
        alert("No. of files uploaded : " + uploadedFiles.length);
        this.getDocumentLinks();
    }

    closeModal(event){
        console.log('closeModal:::documentUpload.js::::');
        this.showImage = false;
    }

    handleDownloadDocument(event){
        console.log('handleDownloadDocument:::updated',this.currentDocument.url,event.target.id);
        if(this.currentDocument.url){
            this.download(this.currentDocument.url);
        }
    }

    handleShareDocument(event){
        console.log('handleShareDocument::::');
        this.modalComponent().openModal();
    }
    handleGetPublicLink(event){
        console.log('handleGetPublicLink::::');
    }

    download(recordId) {

        console.log('download:::', recordId);
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url : recordId
            }
        }, false);
    }

    modalContentOnfocus(event){
        console.log('modalContentOnfocus::::', this.toolbarClasses);
        this.toolbarClasses = ' slds-size_12-of-12 forceContentViewPlayer forceContentToolbar slds-grid';
    }
    modalContentFadeout(event){
        console.log('modalContentFadeout:::::', this.toolbarClasses);
        this.toolbarClasses = ' slds-size_12-of-12 slds-grid';
        setTimeout(function(){  
            this.toolbarClasses = 'slds-size_12-of-12 toolbar  slds-grid'; 
        },5000);
       
    }
}
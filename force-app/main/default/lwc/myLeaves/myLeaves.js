import { LightningElement, wire } from 'lwc';
import getMyLeaves from '@salesforce/apex/LeaveRequestController.getMyLeaves';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import Id from '@salesforce/user/Id';
import {refreshApex} from '@salesforce/apex';
const COLUMNS = [
    {label : 'Request Id', fieldName : 'Name', cellAttributes : {class : {fieldName : 'cellClass'}}},
    {label : 'From Date', fieldName : 'From_Date__c', cellAttributes : {class : {fieldName:'cellClass'}}},
    {label : 'To Date', fieldName : 'To_Date__c', cellAttributes : {class : {fieldName : 'cellClass'}}},
    {label : 'Status', fieldName : 'Status__c', cellAttributes : {class : {fieldName : 'cellClass'}}},
    {label : 'Reason', fieldName : 'Reason__c', cellAttributes : {class: {fieldName : 'cellClass'}}},
    {label : 'Manager Comment', fieldName : 'Manager_Comment__c', cellAttributes : {class : {fieldName : 'cellClass'}}},
    {
        type : "button",
        typeAttributes : {
            label : 'Edit',
            name : 'Edit',
            title : 'Edit',
            value : 'edit',
            disabled: {fieldName : 'isEditDisabled'}
        }, cellAttributes : {class : {fieldName : 'cellClass'}}
    }
];

export default class MyLeaves extends LightningElement {
    columns = COLUMNS;
    myLeaves=[];
    myLeaveResult;
    showModalPopup = false;
    objectApiName = 'Leave_Request__c';
    recordId = '';
    currentUserId = Id;
    @wire(getMyLeaves)
    wiredMyLeaves(result){
        this.myLeaveResult = result;

        if(result.data){
            this.myLeaves = result.data.map(a => ({
                ...a,
                cellClass : a.Status__c == 'Approved' ? 'slds-theme_success' : a.Status__c == 'Rejected' ? 'slds-theme_error' : '',
                isEditDisabled : a.Status__c != 'Pending'
            }));
        }
        if(result.error){
            console.log('Error Occured While Fetching My leaves', result.err);
        }
    }
    get noRecordsFound(){
        return this.myLeaves.length ==0;
    }

    popUpCloseHandler(){
        this.showModalPopup = false;
    }

    rowActionHandler(event){
      this.showModalPopup = true;
        this.recordId = event.detail.row.Id;
    }

    newRequestHandler(){
       this.showModalPopup = true;
       this.recordId = '';
     }

    successHandler(){
        this.showModalPopup = false;
        this.showToast('Datasaved Successfully', 'success', 'success');
        refreshApex(this.myLeaveResult);
    }
     submitHandler(event){
        event.preventDefault();
    const fields = { ...event.detail.fields };
    fields.Status__c = 'Pending';

    const fromDate = new Date(fields.From_Date__c);
    const toDate = new Date(fields.To_Date__c);
    const today = new Date();

    // Correct the date comparisons
    if (fromDate > toDate) {
        this.showToast('From date should not be greater than To date', 'Error', 'error');
    } 
    else if (fromDate < today) {
        this.showToast('From date should not be less than today', 'Error', 'error');
    } 
    else {
        this.refs.leaveRequestFrom.submit(fields);
    }
     }

   showToast(message, title, variant){
        const event = new ShowToastEvent({
            title : title,
            message : message,
            variant : variant
        });
          this.dispatchEvent(event); 
    }
    
}
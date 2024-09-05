import { LightningElement, wire } from 'lwc';
import getLeaveRequest from '@salesforce/apex/LeaveRequestController.getLeaveRequest';
import Id from '@salesforce/user/Id';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
const COLUMNS = [
    {label : 'Request Id', fieldName : 'Name', cellAttributes : {class : {fieldName : 'cellClass'}}},
    {label: 'From Date', fieldName : 'From_Date__c', cellAttributes : {class : {fieldName : 'cellClass'}}},
    {label: 'To Date', fieldName : 'To_Date__c', cellAttributes : {class : {fieldName : 'cellClass'}}},
    {label: 'Status', fieldName : 'Status__c', cellAttributes : {class : {fieldName : 'cellClass'}}},
    {label: 'Reason', fieldName : 'Reason__c', cellAttributes : {class : {fieldName : 'cellClass'}}},
    {label: 'Manager Comment', fieldName : 'Manager_Comment__c', cellAttributes : {class : {fieldName : 'cellClass'}}},
    {
        type : "button",
        typeAttributes : {
            label : 'Edit',
            name : 'Edit',
            title : 'Edit',
            value : 'edit',
            disabled : {fieldName : 'isEditDisabled'}
        }, cellAttributes : {class : {fieldName : 'cellClass'}}
    }
 ];

export default class LeaveRequest extends LightningElement {
    columns = COLUMNS;
    leaveRequest = [];
    leaveRequestResult;
    showModalPopup = false;
    objectApiName = 'Leave_Request__c';
    recordId ='';
    currentUserId = Id;

    @wire(getLeaveRequest)
    wiredMyLeaves(result){
        this.leaveRequestResult = result;

        if(result.data){
            this.leaveRequest= result.data.map(a => ({
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
        return this.leaveRequest.length ==0;
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
         refreshApex(this.leaveRequestResult);
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
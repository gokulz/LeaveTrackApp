import { LightningElement, wire } from 'lwc';
import getMyLeaves from '@salesforce/apex/LeaveRequestController.getMyLeaves';
const COLUMNS = [
    {label : 'Request Id', fieldName : 'Name'},
    {label : 'From Date', fieldName : 'Fro_Date__c'},
    {label : 'To Date', fieldName : 'To_Date__c'},
    {label : 'Status', fieldName : 'Status__c'},
    {label : 'Reason', fieldName : 'Reason__c'},
    {label : 'Manager Comment', fieldName : 'Manager_Comment__c'},
    {
        type : "button",
        typeAttributes : {
            label : 'Edit',
            name : 'Edit',
            title : 'Edit',
            value : 'edit'
        }
    }
];

export default class MyLeaves extends LightningElement {
    columns = COLUMNS;
    myLeaves=[];
    myLeaveResult;

    @wire(getMyLeaves)
    wiredMyLeaves(result){
        this.myLeaveResult = result;

        if(result.data){
            this.myLeaves = result.data;
        }
        if(result.error){
            console.log('Error Occured While Fetching My leaves', result.err);
        }
    }
    get noRecordsFound(){
        return this.myLeaves.length ==0;
    }
}
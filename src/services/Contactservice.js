import axios from "axios"

export class ContactService{
    static serverURL=`http://localhost:9000`

    static getAllGroups(){
        let dataURL=`${this.serverURL}/groups`;
        return axios.get(dataURL);
    }

    static getgroup(contacts){
        let groupid=contacts.groupid;
        let dataURL=`${this.serverURL}/groups/${groupid}`;
        return axios.get(dataURL);
    }


    static getAllContacts(){
        let dataURL=`${this.serverURL}/contacts`;
        return axios.get(dataURL);
    }

    static getcontact(contactid){
        let dataURL=`${this.serverURL}/contacts/${contactid}`;
        return axios.get(dataURL);
    }

    static createcontact(contacts){
        let dataURL=`${this.serverURL}/contacts`;
        return axios.post(dataURL,contacts);
    }

    static updatecontact(contacts,contactid){
        let dataURL=`${this.serverURL}/contacts/${contactid}`;
        return axios.put(dataURL,contacts);
    }
 
    static deletecontact(contactid){
        let dataURL=`${this.serverURL}/contacts/${contactid}`;
        return axios.delete(dataURL);
    }

}
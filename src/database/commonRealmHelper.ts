import ClienteModalHelper from "./ClienteMO";

const RealmHelper = (type:string,data:any,realm:any) =>{
    switch(type){
        case 'clientsRequest/fulfilled':
            ClienteModalHelper(data,realm);
            break;
        default :
        console.log("Type of api call",type);
        
    }

}
export default RealmHelper;
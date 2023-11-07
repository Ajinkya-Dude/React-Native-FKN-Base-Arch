import ClienteModalHelper from "./ClienteMO";
import RamoModalHelper from "./RamoMo";

const RealmHelper = (type:string,data:any,realm:any,loginData:any) =>{
    console.log("Login data from Coomon Helper",loginData);
    
    switch(type){
        case 'clientsRequest/fulfilled':
            ClienteModalHelper(data,realm);
            break;
        case 'ramosRequest/fulfilled':
            RamoModalHelper(data,realm,loginData);
            break;
        default :
        console.log("Type of api call",type);
        
    }

}
export default RealmHelper;
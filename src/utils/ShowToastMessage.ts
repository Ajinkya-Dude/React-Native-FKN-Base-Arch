import Toast from "react-native-toast-message";

interface toastMessage {
    type:string,
    message1?:string,
    message2?:string
}
export const ShowToastMessage = ({type,message1,message2}:toastMessage) => {
    console.log("calling toast");
    
    Toast.show({
      type: type,
      text1:message1,
      text2: message2,
      position:'bottom',
      visibilityTime:3000
    });
}


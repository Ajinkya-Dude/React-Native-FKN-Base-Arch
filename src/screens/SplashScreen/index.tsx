import { Image, View } from "react-native";
import { FKNlogo } from "../../assets";

const SplashScreen = () =>{
    return(
        <View style={{justifyContent:'center',alignItems:'center',height:'100%',backgroundColor:'#ffffff'}}>
            <Image source={FKNlogo} style={{width:100, height:100}}/>
        </View>
    );
}

export default SplashScreen;
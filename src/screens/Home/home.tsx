import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import * as NavigationService from "../../navigation/NavigationService";

const Home = ({navigation}:any) => {
    return (
        <SafeAreaView>
            <View>
                <TouchableOpacity onPress={() => { NavigationService.navigate('login') }}>
                    <Text>Home</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
export default Home;
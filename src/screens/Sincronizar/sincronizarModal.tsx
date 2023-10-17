import { Modal, Text, View } from "react-native"
import { FKNconstants } from "../../components/constants";
import styles from "./styles";
//import * as Progress from 'react-native-progress';
import ProgressBar from 'react-native-progress/Bar';
import theme from "../../theme";

const ProcessModal = ({ visible,value }: any) => {
    return (
        <Modal
            animationType={'fade'}
            transparent={true}
            visible={visible}
        >
            <View style={styles.modalConatainer}>
                <View
                    style={styles.modalSubConatiner}
                >
                    <View style={{alignSelf:'flex-start'}}>
                        <Text style={styles.modalTitle}>
                            {FKNconstants.processing}
                        </Text>
                    </View>
                    <View style={{alignSelf:'flex-start'}}>
                        <Text style={{color:'black'}}>{FKNconstants.wait}</Text>
                    </View>
                    <View style={{marginTop:50,marginBottom:10}}>
                        <ProgressBar progress={value/100} width={250} color={theme.COLORS.BUTTON_BG} />
                    </View>
                    <View style={{justifyContent:'space-between',width:250,flexDirection:'row',marginBottom:20}}>
                        <Text style={{color:'black'}}>{`${value}%`}</Text>
                        <Text style={{color:'black'}}>{`${value}/100`}</Text>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default ProcessModal;
import { Text, View } from 'react-native';
import { FAB } from 'react-native-paper';
import theme from '../../../theme';
import styles from './styles';

const Clientetab = ({navigation,route}:any) => {
    const isEdit = route && route.params && route.params.clienteEdit
    
    const FabButton = () => (
        <FAB
            icon="content-save"
            color={theme.COLORS.BLACK}
            style={styles.fab}
            //onPress={() => onFabButtonClick()}
        />
    );
   return(
    <View style={styles.mainContainer}>
        <Text>Cliente tab</Text>
        {FabButton()}
    </View>
   );
}

export default Clientetab;
import { Text, View } from 'react-native';
import styles from './styles';
import { FAB } from 'react-native-paper';
import theme from '../../../theme';

const Enderecostab = ({navigation}:any) => {
    const onFabButtonClick = () =>{
        navigation.navigate('enderecosCadastro');
    }
    const FabButton = () => (
        <FAB
            icon="plus"
            color={theme.COLORS.BLACK}
            style={styles.fab}
        onPress={() => onFabButtonClick()}
        />
    );
   return(
    <View style={styles.mainContainer}>
        <Text>Enderecos tab</Text>
        {FabButton()}
    </View>
   );
}

export default Enderecostab;
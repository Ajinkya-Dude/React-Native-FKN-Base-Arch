import { Text, View } from 'react-native';
import { FAB } from 'react-native-paper';
import theme from '../../../../theme';
import styles from './styles';

const Contatotab = ({ navigation }: any) => {

    const onFabButtonClick = () =>{
        navigation.navigate('contatoCadastro')
    }
    const FabButton = () => (
        <FAB
            icon="plus"
            color={theme.COLORS.BLACK}
            style={styles.fab}
        onPress={() => onFabButtonClick()}
        />
    );
    return (
        <View style={styles.mainContainer}>
            <Text>Contato tab</Text>
            {FabButton()}
        </View>
    );
}

export default Contatotab;
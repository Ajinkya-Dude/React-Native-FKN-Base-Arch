import { FlatList, Text, View } from 'react-native';
import styles from './styles';
import { FAB } from 'react-native-paper';
import theme from '../../../../theme';
import Toast from 'react-native-toast-message';
import { realmContext } from '../../../../database/database';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import Checkbox from '../../../common/Checkbox';
import { FKNconstants } from '../../../constants';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
const Enderecostab = ({ navigation }: any) => {
    const realm = realmContext.useRealm();

    const loginData: any = useSelector((state: any) => state.loginReducer);
    const cadastroClienteData: any = useSelector((state: any) => state.clientsReducer);

    const fknIdEndereco = cadastroClienteData.enderecoCodigo;
    const fknIdCliente = cadastroClienteData.fknVendasidCliente;
    const fknIdEmpresa = loginData.verifyData.FKN.vendedores[0].vendedor.empresas[0].empresa.idEmpresa
    const isFocused = useIsFocused();

    const [enderecoList, setEnderecoList] = useState([]);

    useEffect(() => {
        const results: any = realm.objects('endereco')
            .filtered('idEmpresaFK = $0 AND idClienteFK = $1', fknIdEmpresa, fknIdCliente).sorted('endFaturamento',true);
        console.log("Enderecostab---", results);
        setEnderecoList(results);
    }, [isFocused]);

    const onFabButtonClick = () => {
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
    return (
        <View style={styles.mainContainer}>
            <FlatList
                data={enderecoList}
                keyExtractor={(item: any) => item._id}
                style={{ width: '100%' }}
                contentContainerStyle={{ paddingBottom: theme.verticalScale(200) }}
                renderItem={({item}) => {
                    return (
                        <TouchableOpacity style={styles.cardMainContainer}>
                            <View style={{ width: '100%', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', alignContent: 'center' }}>
                                <Text style={styles.textTile}>{fknIdEndereco}</Text>
                                {(item.endFaturamento === 1) && 
                                <View>
                                    <Checkbox value={item.endFaturamento ? true : false} checboxStyle={{margin:0}} />
                                </View>}
                            </View>
                            <View style={{width:'100%',flexDirection:'row'}}>
                                <View style={{width:'80%'}}>
                                    <Text style={styles.textTile}>{`${FKNconstants.endereco} : ${item.nome} - ${item.endereco}, ${item.numero}`}</Text>
                                    <Text style={styles.textTile}>{`${item.bairro} - ${item.cidade}/${item.estado}`}</Text>
                                </View>
                                <View style={{width:'20%',alignItems:'flex-end',justifyContent:'center'}}>
                                    <Icon 
                                    name={'location-pin'}
                                    color={theme.COLORS.WARNING}
                                    size={theme.moderateScale(40)}
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
                }}
            />
            {FabButton()}
            <Toast />
        </View>
    );
}

export default Enderecostab;
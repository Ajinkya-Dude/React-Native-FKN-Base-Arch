import { FlatList, Linking, Platform, Text, View } from 'react-native';
import styles from './styles';
import { FAB } from 'react-native-paper';
import theme from '../../../../theme';
import Toast from 'react-native-toast-message';
import { realmContext } from '../../../../database/database';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import Checkbox from '../../../common/Checkbox';
import { FKNconstants } from '../../../constants';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { enderecoCodigoNumber } from '../../../../store/reducer/clientsReducer';
const Enderecostab = ({ navigation }: any) => {
    const realm = realmContext.useRealm();
    const dispatch = useDispatch<any>();

    const loginData: any = useSelector((state: any) => state.loginReducer);
    const cadastroClienteData: any = useSelector((state: any) => state.clientsReducer);

    //const fknIdEndereco = cadastroClienteData.enderecoCodigo;
    const fknIdCliente = cadastroClienteData.fknVendasidCliente || 90000023;
    const fknIdEmpresa = 10002//loginData.verifyData.FKN.vendedores[0].vendedor.empresas[0].empresa.idEmpresa;
    const isFocused = useIsFocused();

    const [enderecoList, setEnderecoList] = useState([]);

    useEffect(() => {
        const results: any = realm.objects('endereco')
            .filtered('idEmpresaFK = $0 AND idClienteFK = $1', fknIdEmpresa, fknIdCliente).sorted('endFaturamento', true);
        setEnderecoList(results);
    }, [isFocused]);

    const onFabButtonClick = () => {
        dispatch(enderecoCodigoNumber())
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

    const onItemClick = (item: object) => {
        navigation.navigate('enderecosCadastro', {
            enderecoItem: item,
            enderecoEdit: true
        });
    }
    const onMapIconClick = (item: any) => {
        const { bairro, cidade, endereco, numero } = item;
        const url: any = Platform.select({
            ios: `maps:0,0?q=${endereco}, ${numero} ${bairro} ${cidade}`,
            android: `geo:0,0?q=${endereco}, ${numero} ${bairro} ${cidade}` //`geo:0,0?q=${fullAddress}`,
        })
        Linking.openURL(url);
    }
    return (
        <View style={styles.mainContainer}>
            {enderecoList.length > 0 ?
                <FlatList
                    data={enderecoList}
                    keyExtractor={(item: any) => item._id}
                    style={{ width: '100%' }}
                    contentContainerStyle={{ paddingBottom: theme.verticalScale(200) }}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity style={styles.cardMainContainer} onPress={() => onItemClick(item)}>
                                <View style={styles.cardCheckBoxContainer}>
                                    <Text style={[styles.textTile, { fontWeight: 'bold' }]}>{item.idEndereco}</Text>
                                    {(item.endFaturamento === 1) &&
                                        <View>
                                            <Checkbox disabled={true} value={item.endFaturamento ? true : false} checboxStyle={styles.cardCheckBoxStyle} />
                                        </View>}
                                </View>
                                <View style={styles.cardSubContainer}>
                                    <View style={{ width: '80%' }}>
                                        <Text style={styles.textTile}>{`${FKNconstants.endereco} : ${item.nome} - ${item.endereco}, ${item.numero}`}</Text>
                                        <Text style={styles.textTile}>{`${item.bairro} - ${item.cidade}/${item.estado}`}</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => onMapIconClick(item)} style={styles.cardMapIconStyle}>
                                        <Icon
                                            name={'location-pin'}
                                            color={theme.COLORS.WARNING}
                                            size={theme.moderateScale(40)}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                />
                :
                <View style={{ width: '100%', alignSelf: 'center', alignContent: 'center', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                    <Text style={styles.emptyTextTile}>{FKNconstants.enderecoEmpty}</Text>
                </View>
            }
            {FabButton()}
            <Toast />
        </View>
    );
}

export default Enderecostab;
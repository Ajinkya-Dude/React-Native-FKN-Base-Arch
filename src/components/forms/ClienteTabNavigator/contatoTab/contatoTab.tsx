import { Text, View } from 'react-native';
import { FAB } from 'react-native-paper';
import theme from '../../../../theme';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { fknVendasidContatoNumber } from '../../../../store/reducer/clientsReducer';
import { realmContext } from '../../../../database/database';
import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { FKNconstants } from '../../../constants';

const Contatotab = ({ navigation,route }: any) => {

    const isEdit = (route && route.params && route.params.clienteEdit) || false;
    
    const isFocused = useIsFocused();
    const dispatch = useDispatch<any>();
    const realm = realmContext.useRealm();

    const loginData: any = useSelector((state: any) => state.loginReducer);
    const cadastroClienteData: any = useSelector((state: any) => state.clientsReducer);
    const fknIdEmpresa = loginData.verifyData.FKN.vendedores[0].vendedor.empresas[0].empresa.idEmpresa;

    const [fknIdCliente, setFknIdCliente] = useState('');


    const [contatoList, setContatoList] = useState([]);


    useEffect(() => {
        if (isEdit && cadastroClienteData.selectedCliente) {
            const {
                _id, atualizado, celular, cnae, cpfCnpj, dtCadastro, dtFundacao, dtUltCon, dtUltOrc, dtUltVen, email, emailNfe, enderecoData, enviado, fantasia, fax,
                idClassificacaoFK,
                idCliente,
                idClienteWeb,
                idEmpresaFK,
                idPortadorFK,
                idPrazoPagamentoFK,
                idProspeccaoFK,
                idRamoFK,
                idRegiaoFK,
                idSegmentoFK,
                idSituacaoFK,
                idTransportadoraFK,
                idVendedor,
                novoCadastro,
                obsCadastral,
                permiteAltPortador,
                permiteAltPrazoPgto,
                razaoSocial,
                rgIe,
                tabelaPadrao,
                telefone,
                tipo,
                uc,
                uo,
                uv
            } = cadastroClienteData.selectedCliente;
            setFknIdCliente(idClienteWeb);
        } else if (cadastroClienteData.fknVendasIdContato) {
            setFknIdCliente(cadastroClienteData.fknVendasidCliente);
        }
    }, [cadastroClienteData]);

    useEffect(() => {
        if (fknIdCliente) {
            const results: any = realm.objects('contato')
                .filtered('idEmpresaFK = $0 AND idClienteFK = $1', fknIdEmpresa, fknIdCliente);
            setContatoList(results);
        }
    }, [isFocused, fknIdCliente]);

    const onFabButtonClick = () => {
        dispatch(fknVendasidContatoNumber());
        navigation.navigate('contatoCadastro',{
            contatoEdit: false,
            fknIdCliente:fknIdCliente
        })
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
        navigation.navigate('contatoCadastro', {
            contatoItem: item,
            contatoEdit: true,
            fknIdCliente:fknIdCliente
        });
    }
    const getDepartmentoFromId = (idDepartamento: any) => {
        const results: any = realm.objects('departamento')
            .filtered('idEmpresaFK = $0 AND idDepartamento = $1', fknIdEmpresa, idDepartamento);
        if (results.length) {
            return results[0].descricao;
        } else {
            return "N/A";
        }
    }
    return (
        <View style={styles.mainContainer}>
            {contatoList.length > 0 ?
                <FlatList
                    data={contatoList}
                    keyExtractor={(item: any) => item._id}
                    style={{ width: '100%' }}
                    contentContainerStyle={{ paddingBottom: theme.verticalScale(200) }}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity style={styles.cardMainContainer} onPress={() => onItemClick(item)}>
                                <View style={{ width: '80%' }}>
                                    <Text style={[styles.textTile, { fontWeight: 'bold' }]}>{item.idContato}</Text>
                                    <Text style={styles.textTile}>{`${FKNconstants.contatoNome} : ${item.nome}`}</Text>
                                    <Text style={styles.textTile}>{`${FKNconstants.contatoDepartmento} : ${getDepartmentoFromId(item.idDepartamentoFK)}`}</Text>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                />
                :
                <View style={{ width: '100%', alignSelf: 'center', alignContent: 'center', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                    <Text style={styles.emptyTextTile}>{FKNconstants.contatoListEmpty}</Text>
                </View>
            }
            {FabButton()}
        </View>
    );
}

export default Contatotab;
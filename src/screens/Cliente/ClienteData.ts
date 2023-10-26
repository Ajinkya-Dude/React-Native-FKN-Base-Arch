import { FKNconstants } from "../../components/constants";

export const clienteOrderByData = [
    {
        label: FKNconstants.code,
        value: 'codingo'
    },
    {
        label: FKNconstants.fantasy,
        value: 'fantasia'
    },
    {
        label: FKNconstants.reasonSocial,
        value: 'razao social'
    },
    {
        label: FKNconstants.uvGreen,
        value: 'uv green'
    },
    {
        label: FKNconstants.uvRed,
        value: 'uv red'
    }
]

export const clienteFilterData = [
    {
        label: FKNconstants.filtroRamo,
        value: 'Ramo',
        checkBox:false,
        name:'filterRamo'
    },
    {
        label: FKNconstants.filtroRegiao,
        value: 'Regiao',
        checkBox:false,
        name:'filterRegiao'
    },
    {
        label: FKNconstants.filtroUFCidade,
        value: 'UF/Cidade',
        checkBox:false,
        name:'filterUFCidade'
    },
    {
        label: FKNconstants.filtroUFCidadeBairro,
        value: 'UF/Cidade/Bairro',
        checkBox:false,
        name:'filterUFCidadeBairro'
    },
    {
        label: FKNconstants.filtroClassification,
        value: 'Classificação',
        checkBox:false,
        name:'filterClassification'
    },
    {
        label: FKNconstants.comodato,
        value: 'Comodato',
        checkBox:true,
        name:'filterComodato'
    },
    {
        label: FKNconstants.aniversarios,
        value: 'Aniversarios',
        checkBox:false,
        name:'filterAniversarios'
    },
    {
        label: FKNconstants.limparFiltros,
        value: 'Limpar',
        checkBox:false,
        name:'filterLimpar'
    }
]
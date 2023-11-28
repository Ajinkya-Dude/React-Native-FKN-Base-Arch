import { insertPrecoFilial } from "./PrecoFilialDao";
import { insertSaldoFilial } from "./SaldoFilialDao";

const generatePayload = (data: any, loginData: any, realm: any) => {
    const produtoData = [];
    if (data && data.length) {
        for (const item of data) {
            produtoData.push({
                idProduto: item.idProduto,
                referencia: String(item.referencia).toString(),
                descricao: String(item.descricao).toString(),
                mensagemAlertaSif:String(item.mensagemAlertaSif).toString(),
                unidade: String(item.unidade).toString(),
                embalagem: item.embalagem,
                codBarras: String(item.codBarras).toString(),
                margemMinima: item.margemMinima,
                quantidadeEstoque: item.quantidadeEstoque,
                precoCusto: item.precoCusto,
                precoVenda: item.precoVenda,
                observacao: String(item.observacao).toString(),
                situacao: String(item.situacao).toString(),
                bloqPedVendas:String(item.bloqPedVendas).toString(),
                bloqOrc: item.bloqOrc ? 1 : 0,
                idSeparacaoUmFK: item.separacao1,
                idSeparacaoDoisFK: item.separacao2,
                idFilialFK: item.idFilial,
                idEmpresaFK: loginData.verifyData.FKN.vendedores[0].vendedor.empresas[0].empresa.idEmpresa,
                idSituacaoFK: item.idSituacaoFK,
                complemento: String(item.compl).toString(),
            });
            if (item.saldos && item.saldos[0] && item.saldos[0].saldoFilial) {
                insertSaldoFilial(item.saldos[0].saldoFilial, realm);
            }
            if (item.precos && item.precos[0] && item.precos[0].precoFilial) {
                insertPrecoFilial(item.precos[0].precoFilial, realm);
            }
        }
    } else {
        produtoData.push({
            idProduto: data.idProduto,
            referencia: String(data.referencia).toString(),
            descricao: String(data.descricao).toString(),
            mensagemAlertaSif: String(data.mensagemAlertaSif).toString(),
            unidade: String(data.unidade).toString(),
            embalagem: data.embalagem,
            codBarras: String(data.codBarras).toString(),
            margemMinima: data.margemMinima,
            quantidadeEstoque: data.quantidadeEstoque,
            precoCusto: data.precoCusto,
            precoVenda: data.precoVenda,
            observacao: String(data.observacao).toString(),
            situacao: String(data.situacao).toString(),
            bloqPedVendas: String(data.bloqPedVendas).toString(),
            bloqOrc: data.bloqOrc ? 1 : 0,
            idSeparacaoUmFK: data.separacao1,
            idSeparacaoDoisFK: data.separacao2,
            idFilialFK: data.idFilial,
            idEmpresaFK: loginData.verifyData.FKN.vendedores[0].vendedor.empresas[0].empresa.idEmpresa,
            idSituacaoFK: data.idSituacaoFK,
            complemento: String(data.compl).toString(),
        });
        if (data.saldos && data.saldos[0] && data.saldos[0].saldoFilial) {
            insertSaldoFilial(data.saldos[0].saldoFilial, realm);
        }
        if (data.precos && data.precos[0] && data.precos[0].precoFilial) {
            insertPrecoFilial(data.precos[0].precoFilial, realm);
        }
    }
    return produtoData;
}


const insertProduto = (data: any, realm: any, loginData: any) => {
    const Data = generatePayload(data, loginData, realm);
    console.log("Calling insert produto",Data);
    
    try {
        realm.write(() => {
            for (const item of Data) {
                realm.create('produto', item);
            }
        })
        return 1
    } catch (error) {
        console.log("Create Produto error", error);
        return 0
    }
}
const deleteProduto = (realm: any) => {
    console.log("deleteProduto called");
    try {
        realm.write(() => {
            const allClientes = realm.objects('produto');
            realm.delete(allClientes);
        })
        return 1
    } catch (error) {
        console.log("Delete Produto error", error);
        return 0
    }
}

export {
    insertProduto,
    deleteProduto
}
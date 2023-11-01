import { createRealmContext } from "@realm/react";
import Realm from "realm";
import Agenda from "./AgendaSchema";
import Cliente from "./ClienteSchema";

export const realmConfig: Realm.Configuration = {
    schema: [Agenda,Cliente],
    schemaVersion:1
};
export const realmContext = createRealmContext(realmConfig);

//export const useRealmContext = () => realmContext;

// export default realmConfig;

// import { open } from "react-native-quick-sqlite";

// export const getDBConnection = async () => {
//    return open({ name: "fkn_vendas_react-native.db", location: "default" });
// };
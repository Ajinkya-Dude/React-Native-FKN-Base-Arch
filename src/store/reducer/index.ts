import { combineReducers } from "@reduxjs/toolkit";
import abasReducer from "./abasReducer";
import agendaReducer from "./agendaReducer";
import clientsReducer from "./clientsReducer";
import loginReducer from "./loginReducer";
import registerReducer from "./registerReducer";
import addressReducer from "./addressReducer";
import classificationReducer from "./classificationReducer";
import comodatoReducer from "./comodatoReducer";
import clienteMediaReducer from "./clienteMediaReducer";
import companyReducer from "./companyReducer";
import departmentsReducer from "./departmentsReducer";
import duplicataReducer from "./duplicataReducer";
import filialReducer from "./filialReducer";
import modificationReducer from "./modificationReducer";
import notasReducer from "./notasReducer";
import reasonReducer from "./reasonReducer";
import contatoReducer from "./contatoReducer";
import cnpjVendedorReducer from "./cnpjVendedorReducer";
const rootReducer: any = combineReducers({
   loginReducer: loginReducer,
   registerReducer: registerReducer,
   agendaReducer:agendaReducer,
   abasReducer:abasReducer,
   clientsReducer:clientsReducer,
   cnpjVendedorReducer:cnpjVendedorReducer,
   addressReducer:addressReducer,
   classificationReducer:classificationReducer,
   comodatoReducer:comodatoReducer,
   clienteMediaReducer:clienteMediaReducer,
   companyReducer:companyReducer,
   departmentsReducer:departmentsReducer,
   duplicataReducer:duplicataReducer,
   filialReducer:filialReducer,
   modificationReducer:modificationReducer,
   notasReducer:notasReducer,
   reasonReducer:reasonReducer,
   contatoReducer:contatoReducer,
});

export default rootReducer;
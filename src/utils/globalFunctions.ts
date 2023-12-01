const GlobalFunctions = module.exports;
import NetInfo from "@react-native-community/netinfo";

GlobalFunctions.capitalize = (str: string) => {
    if (!str) {
        return ''
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
};

GlobalFunctions.formatCNPJNumber = (val: any, setter: any) => {
    let ph = val
        .replace('.', '')
        .replace('/', '')
        .replace('-', '')
    if (ph.length < 14) {
        setter(ph);
    } else {
        setter(`${ph.slice(0, 2)}.${ph.slice(2, 5)}.${ph.slice(5, 8)}/${ph.slice(8, 12)}-${ph.slice(12, 14)}`);
    }
};
GlobalFunctions.formatCPFNumber = (val: any, setter: any) => {
    let ph = val
        .replace('.', '')
        .replace('-', '')
    if (ph.length < 11) {
        setter(ph);
    } else {
        setter(`${ph.slice(0, 3)}.${ph.slice(3, 6)}.${ph.slice(6, 9)}-${ph.slice(9, 11)}`);
    }
};

GlobalFunctions.formatDateFromNumber = (val: any, setter: any) => {
    let ph = val
        //   .replace('.', '')
        //   .replace(',', '')
        //   .replace('-', '')
        .replace('/', '')
    if (ph.length < 8) {
        setter(ph);
    } else {
        setter(`${ph.slice(0, 2)}/${ph.slice(2, 4)}/${ph.slice(4, 8)}`);
    }
};
export const formatCnpj = (input: any) => {
    // Remove non-numeric characters
    const numericInput = input.replace(/\D/g, '');

    // Format the CNPJ number
    const formattedCnpj = numericInput.replace(
        /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
        '$1.$2.$3/$4-$5'
    );

    return formattedCnpj;
};
export const formatCpf = (input: any) => {
    // Remove non-numeric characters
    const numericInput = input.replace(/\D/g, '');

    // Format the CPF number
    const formattedCpf = numericInput.replace(
        /(\d{3})(\d{3})(\d{3})(\d{2})/,
        '$1.$2.$3-$4'
    );

    return formattedCpf;
};
export const formatNumericDate = (input: any) => {
    // Remove non-numeric characters
    const numericInput = input.replace(/\D/g, '');

    // Format the numeric date into DD/MM/YYYY
    const formattedDate = numericInput.replace(
        /(\d{2})(\d{2})(\d{4})/,
        '$1/$2/$3'
    );

    return formattedDate;
};

export const isValidDate = (date: any) => {
    // Define the date format and enforce strict parsing
    const dateFormat = /^(\d{2})\/(\d{2})\/(\d{4})$/;

    // Use RegExp to match the date format
    if (!dateFormat.test(date)) {
        return false;
    }

    // Extract day, month, and year
    const [_, day, month, year] = date.match(dateFormat);

    // Create a Date object and check for a valid date
    const parsedDate = new Date(year, month - 1, day); // Month is 0-based

    // Check if the parsed date matches the input values
    return (
        parsedDate.getDate() == day &&
        parsedDate.getMonth() == month - 1 && // Month is 0-based
        parsedDate.getFullYear() == year
    );
}

export const isCNPJ = (CNPJ:any)=> {
    // Check for repeated digits or invalid length
    if (
      CNPJ === "00000000000000" ||
      CNPJ === "11111111111111" ||
      CNPJ === "22222222222222" ||
      CNPJ === "33333333333333" ||
      CNPJ === "44444444444444" ||
      CNPJ === "55555555555555" ||
      CNPJ === "66666666666666" ||
      CNPJ === "77777777777777" ||
      CNPJ === "88888888888888" ||
      CNPJ === "99999999999999" ||
      CNPJ.length !== 14
    ) {
      return false;
    }
  
    // Calculate the first verification digit (dig13)
    let sm = 0;
    let peso = 2;
    for (let i = 11; i >= 0; i--) {
      const num = parseInt(CNPJ.charAt(i), 10);
      sm += num * peso;
      peso = peso + 1 === 10 ? 2 : peso + 1;
    }
    const r = sm % 11;
    const dig13 = r === 0 || r === 1 ? "0" : String(11 - r);
  
    // Calculate the second verification digit (dig14)
    sm = 0;
    peso = 2;
    for (let i = 12; i >= 0; i--) {
      const num = parseInt(CNPJ.charAt(i), 10);
      sm += num * peso;
      peso = peso + 1 === 10 ? 2 : peso + 1;
    }
    const r2 = sm % 11;
    const dig14 = r2 === 0 || r2 === 1 ? "0" : String(11 - r2);
  
    // Verify if the calculated digits match the last two digits of the provided CNPJ
    return dig13 === CNPJ.charAt(12) && dig14 === CNPJ.charAt(13);
  }

  export const isCPF = (CPF:any) => {
    // Check for repeated digits or invalid length
    if (
      CPF === "00000000000" ||
      CPF === "11111111111" ||
      CPF === "22222222222" ||
      CPF === "33333333333" ||
      CPF === "44444444444" ||
      CPF === "55555555555" ||
      CPF === "66666666666" ||
      CPF === "77777777777" ||
      CPF === "88888888888" ||
      CPF === "99999999999" ||
      CPF.length !== 11
    ) {
      return false;
    }
  
    // Calculate the first verification digit (dig10)
    let sm = 0;
    let peso = 10;
    for (let i = 0; i < 9; i++) {
      const num = parseInt(CPF.charAt(i), 10);
      sm += num * peso;
      peso -= 1;
    }
    const r = 11 - (sm % 11);
    const dig10 = r === 10 || r === 11 ? "0" : String(r);
  
    // Calculate the second verification digit (dig11)
    sm = 0;
    peso = 11;
    for (let i = 0; i < 10; i++) {
      const num = parseInt(CPF.charAt(i), 10);
      sm += num * peso;
      peso -= 1;
    }
    const r2 = 11 - (sm % 11);
    const dig11 = r2 === 10 || r2 === 11 ? "0" : String(r2);
  
    // Verify if the calculated digits match the last two digits of the provided CPF
    return dig10 === CPF.charAt(9) && dig11 === CPF.charAt(10);
  }
 

export const checkInternetConnection = async () => {
    try {
        const state = await NetInfo.fetch();
        return state.isConnected;
    } catch (error) {
        console.error('Error checking internet connection:', error);
        return false;
    }
}
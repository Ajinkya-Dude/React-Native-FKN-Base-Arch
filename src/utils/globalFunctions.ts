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

export const checkInternetConnection = async () => {
    try {
        const state = await NetInfo.fetch();
        console.log("State after check",state);
        return state.isConnected;
    } catch (error) {
        console.error('Error checking internet connection:', error);
        return false;
    }
}
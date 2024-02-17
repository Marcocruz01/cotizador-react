const formatearDinero = (valor) => {
    const formatter = new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN'
    });
    return formatter.format(valor);
}

const calcularTotalAPagar = (cantidad, plazo) => {
    let total;
    // mientras mayor es la cantidad solicitada, menor son los intereses
    if(cantidad < 5000) {
        // menor a $5,000.00 MXN
        total = cantidad * 1.5;
    } else if(cantidad >=5000 && cantidad < 10000) {
        // entre $5,000.00 y $10,000.00 MXN
        total = cantidad * 1.4; 
    } else if(cantidad => 10000 && cantidad < 15000) {
        // entre $10,000.00 y $15,000.00 MXN
        total = cantidad * 1.3;
    } else {
        // despues de $20,000.00 MXN
        total = cantidad * 1.2;
    }

    // calcular el plazo, mayor plazo, mayor interes
    if(plazo === 6) {
        total *= 1.1;
    } else if(plazo === 12) {
        total *= 1.2;
    } else {
        total *= 1.3;
    }

    return total;
}

export {
    formatearDinero,
    calcularTotalAPagar
}
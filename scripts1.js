//declaro los elementos de navegardor , main y footer
const nav = document.createElement('nav');
const main = document.createElement('main');
const footer = document.createElement('footer');

// defino navegador

nav.innerHTML = `
<h1>Bienvenido al CoderBanck</h1>
`;
nav.style.textAlign = 'center';

// defino main

main.innerHTML = `
    
    <div>
        <h1>Conversor de Moneda</h1>
        <button id="cambiar">Iniciar Conversión</button>
    </div>
`;

main.style.backgroundColor = '#f0f0f0';
main.style.padding = '1rem';
main.style.borderBottom = '2px solid #ccc';
main.style.textAlign = 'center';
main.style.display = 'flex';
main.style.alignItems = 'center';
main.style.justifyContent = 'center';
main.style.height = '40rem';

//defino foter

footer.innerHTML = `
    <p>Gracias por su compra</p>
`;
footer.style.backgroundColor = '#333';
footer.style.color = '#fff';
footer.style.padding = '1rem';
footer.style.textAlign = 'center';


document.body.appendChild(nav);
document.body.appendChild(main);
document.body.appendChild(footer);

//comienza código de programa

class Transaccion {
    constructor(monedaOrigen, importe, monedaDestino, resultado, regalo) {
        this.monedaOrigen = this.traducirMoneda(monedaOrigen);
        this.monedaDestino = this.traducirMoneda(monedaDestino);
        this.importe = importe;
        this.resultado = resultado;
        this.regalo = regalo;
    }

    traducirMoneda(valorMoneda) {
        switch (valorMoneda) {
            case 1:
                return "Dólar";
            case 2:
                return "Peso";
            case 3:
                return "Euro";
            default:
                return "Moneda desconocida";
        }
    }

    mostrarResumen() {
        return `
Resumen de la transacción:
- Moneda de origen: ${this.monedaOrigen}
- Importe: ${this.importe}
- Moneda de destino: ${this.monedaDestino}
- Resultado de la conversión: ${this.resultado.toFixed(2)}
- Regalo: ${this.regalo}
        `;
    }
}



document.getElementById('cambiar').addEventListener('click', () => {
    let seleccion = prompt("Selecciona el tipo de moneda:\n1. Dólar\n2. Peso\n3. Euro");
    if (seleccion > 3 || seleccion < 1) {
        alert("Tipo de moneda equivocada");
        return;
    }

    seleccion = parseInt(seleccion);
    console.log("Tengo moneda " + seleccion);

    let importe = prompt("Ingrese monto:");
    importe = parseFloat(importe);
    console.log("Importe: " + importe);

    let cambioMoneda;
    

    if (seleccion === 1) {
        cambioMoneda = prompt("A qué moneda desea cambiar:\n2. Peso\n3. Euro");
        if (cambioMoneda > 3 || cambioMoneda < 1) {
            alert("Tipo de moneda equivocada");
            return;
        }
    } else if (seleccion === 2) {
        cambioMoneda = prompt("A qué moneda desea cambiar:\n1. Dólar\n3. Euro");
        if (cambioMoneda > 3 || cambioMoneda < 1) {
            alert("Tipo de moneda equivocada");
            return;
        }
    } else {
        cambioMoneda = prompt("A qué moneda desea cambiar:\n1. Dólar\n2. Peso");
        if (cambioMoneda > 3 || cambioMoneda < 1) {
            alert("Tipo de moneda equivocada");
            return;
        }
    }
   

    cambioMoneda = parseInt(cambioMoneda);
    console.log("Paso a " + cambioMoneda);

    let cotizacion;
    if (seleccion === 1 && cambioMoneda === 2) {
        cotizacion = 1; // Dólar a pesos 
    } else if (seleccion === 1 && cambioMoneda === 3) {
        cotizacion = 2; // Dólar a euro
    } else if (seleccion === 2 && cambioMoneda === 1) {
        cotizacion = 3; // Peso a dólar
    } else if (seleccion === 2 && cambioMoneda === 3) {
        cotizacion = 4; // Peso a euros
    } else if (seleccion === 3 && cambioMoneda === 1) {
        cotizacion = 5; // Euro a dólar
    } else if (seleccion === 3 && cambioMoneda === 2) {
        cotizacion = 6; // Euro a pesos
    }

    cotizacion = parseInt(cotizacion);
    console.log("Tipo de cotización: " + cotizacion);

    function resultado(importe, cotizacion) {
        switch (cotizacion) {
            case 1:
                return importe * 39; // Dólar a pesos 
            case 2:
                return importe * 0.92; // Dólar a euro
            case 3:
                return importe / 39; // Pesos a dólar
            case 4:
                return importe / 41; // Pesos a euros
            case 5:
                return importe * 1.9; // Euros a dólar
            case 6:
                return importe * 42.1; // Euros a pesos
            default:
                return "No cotización válida para esos tipos de moneda";
        }
    }

    let importeConvertido = resultado(importe, cotizacion);
    alert("Resultado: " + importeConvertido.toFixed(2));

    // Manejo de regalos
    let regalo = "No accediste a regalo";

    let cotizaciones = [];

    if (cotizacion === 1 || cotizacion === 2) {
        cotizaciones.push(1);
    }
    if (cotizacion === 3 || cotizacion === 4) {
        cotizaciones.push(2);
    }
    if (cotizacion === 5 || cotizacion === 6) {
        cotizaciones.push(3);
    }

    console.log(cotizaciones);

    for (let i = 0; i < cotizaciones.length; i++) {
        let cotizacionIndicada = cotizaciones[i];

        switch (cotizacionIndicada) {
            case 1:
                if (importe >= 300 && importe <= 500) {
                    regalo = "Ganaste 1000 pesos a favor en tu próximo cambio";
                } else if (importe > 500) {
                    regalo = "Ganaste 2000 pesos a favor en tu próximo cambio";
                }
                break;
            case 2:
                if (importe >= 10000 && importe <= 20000) {
                    regalo = "Ganaste 1000 pesos a favor en tu próximo cambio";
                } else if (importe > 20000) {
                    regalo = "Ganaste 2000 pesos a favor en tu próximo cambio";
                }
                break;
            case 3:
                if (importe >= 300 && importe <= 500) {
                    regalo = "Ganaste 1000 pesos a favor en tu próximo cambio";
                } else if (importe > 500) {
                    regalo = "Ganaste 2000 pesos a favor en tu próximo cambio";
                }
                break;
        }
    }

    // muestro resumen de la venta
    let transaccion = new Transaccion(seleccion, importe, cambioMoneda, importeConvertido, regalo);
    alert(transaccion.mostrarResumen());
});

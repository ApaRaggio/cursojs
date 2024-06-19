// Declaro los elementos de nav, main y footer
const nav = document.createElement('nav');
const main = document.createElement('main');
const footer = document.createElement('footer');

// Defino el nav
nav.innerHTML = `<h1>Bienvenido al CoderBank</h1>`;
nav.style.textAlign = 'center';

// Defino main
main.innerHTML = `
    <div class="section-container">
        <h1>Conversor de Moneda</h1>
        <div id="conversionContainer">
            <form id="conversionForm">
                <label for="monedaOrigen">Seleccione la moneda de origen:</label>
                <select id="monedaOrigen">
                    <option value="1">Dólar</option>
                    <option value="2">Peso</option>
                    <option value="3">Euro</option>
                </select><br><br>
                <label for="importe">Ingrese monto:</label>
                <input type="number" id="importe" step="0.01"><br><br>
                <label for="monedaDestino">Seleccione la moneda de destino:</label>
                <select id="monedaDestino">
                    <option value="1">Dólar</option>
                    <option value="2">Peso</option>
                    <option value="3">Euro</option>
                </select><br><br>
                <button type="submit">Iniciar Conversión</button>
            </form>
        </div>
    </div>
    <div id="pizarraContainer" class="section-container">
       <h1>Pizarra</h1>
        <table id="pizarraTable" style="width: 80%; margin: 0 auto; border-collapse: collapse;">
            <thead>
                <tr>
                    <th>Moneda</th>
                    <th>Valor</th>
                    
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/640px-Flag_of_the_United_States.svg.png" style="width: 30px; height: auto;"></td>
                    <td id="valorDolar">$U: 39</td>
                    
                </tr>
                <tr>
                    <td><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Flag_of_Europe.svg/640px-Flag_of_Europe.svg.png" style="width: 30px; height: auto;"></td>
                    <td id="valorEuro">$U: 41</td>
                    
                </tr>
            </tbody>
        </table>
    </div>
    <div class="section-container">
        <h1>Simulador</h1>
        <div id="simulacionContainer">
            <form id="simulacionForm">
                <label for="prestamo">Tipo de préstamo:</label>
                <select id="prestamo">
                    <option value="1">Préstamo Consumo</option>
                    <option value="2">Préstamo Hipotecario</option>
                    <option value="3">Préstamo automotor</option>
                </select><br><br>
                <label for="monto">Monto solicitado:</label>
                <input type="number" id="monto" step="0.01"><br><br>
                <label for="cuotas">Cantidad de cuotas:</label>
                <input type="number" id="cuotas" step="1"><br><br>
                <button type="submit">Simular</button>
            </form>
        </div>
    </div>
`;

main.style.backgroundColor = '#f0f0f0';
main.style.height = 'auto'; 
main.style.padding = '1rem';
main.style.borderBottom = '2px solid #ccc';
main.style.display = 'grid';
main.style.justifyContent = 'space-evenly'; 
main.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))'; 
main.style.gap = '10px'; 


const sectionContainers = main.querySelectorAll('.section-container');
sectionContainers.forEach(container => {
    container.style.backgroundColor = '#fff';
    container.style.width = '80%';
    container.style.padding = '1rem';
    container.style.border = '1px solid #ccc';
    container.style.borderRadius = '8px';
    container.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    container.style.textAlign = 'center';
});


const buttons = main.querySelectorAll('button');
buttons.forEach(button => {
    button.style.padding = '0.5rem 1rem';
    button.style.fontSize = '1rem';
    button.style.backgroundColor = '#007bff';
    button.style.color = '#fff';
    button.style.border = 'none';
    button.style.cursor = 'pointer';
    button.style.borderRadius = '4px';
    button.style.marginTop = '1rem';
});


const forms = main.querySelectorAll('form');
forms.forEach(form => {
    form.style.margin = '0 auto'; // Centrar el formulario dentro del div
    form.style.maxWidth = '100%'; // Ancho máximo del formulario al 100% del contenedor
    form.style.display = 'flex';
    form.style.flexDirection = 'column';
    form.style.justifyContent = 'center';
});

// Defino el footer
footer.innerHTML = `<p>Gracias por su compra</p>`;
footer.style.backgroundColor = '#333';
footer.style.color = '#fff';
footer.style.padding = '1rem';
footer.style.textAlign = 'center';

document.body.appendChild(nav);
document.body.appendChild(main);
document.body.appendChild(footer);


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
            case '1':
                return "Dólar";
            case '2':
                return "Peso";
            case '3':
                return "Euro";
            default:
                return "Moneda desconocida";
        }
    }

    
    toJSON() {
        return {
            monedaOrigen: this.monedaOrigen,
            monedaDestino: this.monedaDestino,
            importe: this.importe,
            resultado: this.resultado,
            regalo: this.regalo
        };
    }
}

document.getElementById('conversionForm').addEventListener('submit', (event) => {
    event.preventDefault(); 
    const seleccion = document.getElementById('monedaOrigen').value;
    const importe = parseFloat(document.getElementById('importe').value);
    const cambioMoneda = document.getElementById('monedaDestino').value;

    if (!importe || importe <= 0 || seleccion === cambioMoneda) {
        alert("Por favor, ingrese un importe válido y asegúrese de que la moneda de origen y destino sean diferentes.");
        return;
    }

    let cotizacion;
    if (seleccion === '1' && cambioMoneda === '2') {
        cotizacion = 1; // Dólar a pesos 
    } else if (seleccion === '1' && cambioMoneda === '3') {
        cotizacion = 2; // Dólar a euro
    } else if (seleccion === '2' && cambioMoneda === '1') {
        cotizacion = 3; // Peso a dólar
    } else if (seleccion === '2' && cambioMoneda === '3') {
        cotizacion = 4; // Peso a euros
    } else if (seleccion === '3' && cambioMoneda === '1') {
        cotizacion = 5; // Euro a dólar
    } else if (seleccion === '3' && cambioMoneda === '2') {
        cotizacion = 6; // Euro a pesos
    } else {
        alert("Tipo de moneda equivocada");
        return;
    }

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

    const importeConvertido = resultado(importe, cotizacion);

    //  regalos
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

    for (let i = 0; i < cotizaciones.length; i++) {
        const cotizacionIndicada = cotizaciones[i];
        switch (cotizacionIndicada) {
            case 1:
                if (importe >= 300 && importe <= 500) {
                    regalo = "$1000 a favor en tu próximo cambio";
                } else if (importe > 500) {
                    regalo = "$2000 pesos a favor en tu próximo cambio";
                }
                break;
            case 2:
                if (importe >= 10000 && importe <= 20000) {
                    regalo = "$1000 pesos a favor en tu próximo cambio";
                } else if (importe > 20000) {
                    regalo = "$2000 pesos a favor en tu próximo cambio";
                }
                break;
            case 3:
                if (importe >= 300 && importe <= 500) {
                    regalo = "$1000 pesos a favor en tu próximo cambio";
                } else if (importe > 500) {
                    regalo = "$2000 pesos a favor en tu próximo cambio";
                }
                break;
        }
    }

    const transaccion = new Transaccion(seleccion, importe, cambioMoneda, importeConvertido, regalo);

    
    const transaccionJSON = transaccion.toJSON();

    
    console.log('Transacción JSON:', transaccionJSON);

    
    const resultTable = `
        <table style="margin-top: 20px; border: 1px solid black;">
            <thead>
                <tr>
                    <th>Concepto</th>
                    <th>Valor</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Moneda de origen</td>
                    <td>${transaccion.monedaOrigen}</td>
                </tr>
                <tr>
                    <td>Importe</td>
                    <td>${transaccion.importe.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Moneda de destino</td>
                    <td>${transaccion.monedaDestino}</td>
                </tr>
                <tr>
                    <td>Resultado de la conversión</td>
                    <td>${transaccion.resultado.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Regalo</td>
                    <td>${transaccion.regalo}</td>
                </tr>
            </tbody>
        </table>
    `;

    
    document.getElementById('conversionContainer').innerHTML = resultTable;
});


const tasasInteres = {
    1: 0.10, 
    2: 0.05, 
    3: 0.08 
};

document.getElementById('simulacionForm').addEventListener('submit', (event) => {
    event.preventDefault(); 

    const tipoPrestamo = document.getElementById('prestamo').value;
    const monto = parseFloat(document.getElementById('monto').value);
    const cuotas = parseInt(document.getElementById('cuotas').value);

    if (!monto || monto <= 0 || !cuotas || cuotas <= 0) {
        alert("Por favor, ingrese un monto y una cantidad de cuotas válidos.");
        return;
    }

    const tasaInteres = tasasInteres[tipoPrestamo];
    const valorCuota = (monto * (1 + tasaInteres)) / cuotas;


    localStorage.setItem('tipoPrestamo', tipoPrestamo);
    localStorage.setItem('monto', monto);
    localStorage.setItem('cuotas', cuotas);

    
    const simulacionResult = `
        <table style="margin-top: 20px; border: 1px solid black;">
            <thead>
                <tr>
                    <th>Concepto</th>
                    <th>Valor</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Préstamo solicitado</td>
                    <td>${tipoPrestamo == '1' ? 'Préstamo Consumo' : tipoPrestamo == '2' ? 'Préstamo Hipotecario' : 'Préstamo Automotor'}</td>
                </tr>
                <tr>
                    <td>Monto</td>
                    <td>${monto.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Cuotas</td>
                    <td>${cuotas}</td>
                </tr>
                <tr>
                    <td>Valor cuota</td>
                    <td>${valorCuota.toFixed(2)}</td>
                </tr>
            </tbody>
        </table>
    `;

    
    document.getElementById('simulacionContainer').innerHTML = simulacionResult;
});

// Declaro los elementos de nav, main y footer
const nav = document.createElement('nav');
const main = document.createElement('main');
const footer = document.createElement('footer');

// Defino el nav
nav.innerHTML = `<h1>Bienvenido al CoderBank</h1>
    <div style="position: relative; display: inline-block;">
        <i class="fas fa-shopping-cart" style="font-size: 24px; cursor: pointer;"></i>
        <span id="carrito-count" style="position: absolute; top: -10px; right: -10px; background: red; color: white; border-radius: 50%; padding: 5px 10px; font-size: 14px;">0</span>
    </div>`;
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
       <h1>Seguros</h1>
        <form id="seguro" style="width: 80%; margin: 0 auto; border-collapse: collapse;">
           <label for="tiposeguro">Seleccione seguro:</label>
                <select id="tiposeguro">
                    <option value="1">Automotor</option>
                    <option value="2">Hipotecario</option>
                    <option value="3">Vida</option>
                </select><br><br>
                <div id="cuotasContainer" style="display: none;">
                    <label for="cuotas">Seleccione cantidad de cuotas:</label>
                    <select id="cuotas">
                        <option value="6">6 cuotas</option>
                        <option value="10">10 cuotas</option>
                        <option value="12">12 cuotas</option>
                    </select><br><br>
                </div>
                <button type="submit" id="accionBtn">Seleccionar Seguro</button>
        </form>
    </div>
    <div class="section-container">
        <h1>Simulador</h1>
        <div id="simulacionContainer">
            <form id="simulacionForm">
                <label for="prestamo">Tipo de préstamo:</label>
                <select id="prestamo">
                    <option value="1">Préstamo Consumo</option>
                    <option value="2">Préstamo Hipotecario</option>
                    <option value="3">Préstamo Automotor</option>
                </select><br><br>
                <label for="monto">Monto solicitado:</label>
                <input type="number" id="monto" step="0.01"><br><br>
                <label for="cuotas">Cantidad de cuotas:</label>
                <input type="number" id="cuotasPrestamo" step="1"><br><br>
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

document.getElementById('conversionForm').addEventListener('submit', async (event) => {
    event.preventDefault(); 
    const seleccion = document.getElementById('monedaOrigen').value;
    const importe = parseFloat(document.getElementById('importe').value);
    const cambioMoneda = document.getElementById('monedaDestino').value;

    if (!importe || importe <= 0 || seleccion === cambioMoneda) {
        alert("Por favor, ingrese un importe válido y asegúrese de que la moneda de origen y destino sean diferentes.");
        return;
    }

    try {
        console.log('Fetching tasasCambio.json...');
        const response = await fetch('tasasCambio.json');
        console.log('Response status:', response.status);
        if (!response.ok) {
            throw new Error('Error al obtener las tasas de cambio');
        }
        const tasasCambio = await response.json();
        console.log('Tasas de cambio obtenidas:', tasasCambio);

        const key = `${seleccion}_${cambioMoneda}`;
        const cotizacion = tasasCambio[key];
        console.log('Cotización obtenida:', cotizacion);

        if (!cotizacion) {
            alert("No se encontró una cotización válida para esos tipos de moneda");
            return;
        }

        const importeConvertido = importe * cotizacion;

        let regalo = "No accediste a regalo";
        let cotizaciones = [];

        if (cotizacion === tasasCambio["1_2"] || cotizacion === tasasCambio["1_3"]) {
            cotizaciones.push(1);
        }
        if (cotizacion === tasasCambio["2_1"] || cotizacion === tasasCambio["2_3"]) {
            cotizaciones.push(2);
        }
        if (cotizacion === tasasCambio["3_1"] || cotizacion === tasasCambio["3_2"]) {
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
        localStorage.setItem('ultimaTransaccion', JSON.stringify(transaccionJSON));

        Swal.fire({
            title: 'Resultado de la Conversión',
            html: `
                <p><strong>Moneda Origen:</strong> ${transaccion.monedaOrigen}</p>
                <p><strong>Importe:</strong> ${transaccion.importe}</p>
                <p><strong>Moneda Destino:</strong> ${transaccion.monedaDestino}</p>
                <p><strong>Importe Convertido:</strong> ${transaccion.resultado}</p>
                <p><strong>Regalo:</strong> ${transaccion.regalo}</p>
            `,
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });
    } catch (error) {
        console.error("Error durante la conversión:", error);
        alert("Hubo un error al realizar la conversión. Por favor, inténtelo nuevamente.");
    }
});

// Carrito de seguros
let carritoSeguros = [];

// Función que muestra las opciones de cuotas y el botón de contratar
function mostrarOpcionesCuotas() {
    return new Promise((resolve) => {
        const cuotasContainer = document.getElementById('cuotasContainer');
        cuotasContainer.style.display = 'block';
        const accionBtn = document.getElementById('accionBtn');
        accionBtn.textContent = 'Contratar';
        document.getElementById('cuotas').addEventListener('change', () => {
            accionBtn.style.display = 'block';
            resolve();
        });
    });
}

// Modifica la función de envío del formulario de seguros
document.getElementById('seguro').addEventListener('submit', (event) => {
    event.preventDefault();
    const accionBtn = document.getElementById('accionBtn');
    const tiposeguro = document.getElementById('tiposeguro').value;
    const seguros = {
        '1': 'Automotor',
        '2': 'Hipotecario',
        '3': 'Vida'
    };

    const seguroSeleccionado = seguros[tiposeguro];

    if (accionBtn.textContent === 'Seleccionar Seguro') {
        if (seguroSeleccionado) {
            mostrarOpcionesCuotas().then(() => {
                accionBtn.addEventListener('click', () => {
                    carritoSeguros.push(seguroSeleccionado);
                    document.getElementById('carrito-count').textContent = carritoSeguros.length;
                    Swal.fire({
                        title: 'Seguro Agregado',
                        text: `${seguroSeleccionado} ha sido agregado al carrito.`,
                        icon: 'success',
                        confirmButtonText: 'Aceptar'
                    });
                    accionBtn.textContent = 'Seleccionar Seguro';
                    document.getElementById('cuotasContainer').style.display = 'none';
                }, {once: true});
            });
        }
    }
});

// Mostrar el contenido del carrito
document.querySelector('.fa-shopping-cart').addEventListener('click', () => {
    if (carritoSeguros.length === 0) {
        Swal.fire({
            title: 'Carrito Vacío',
            text: 'No has agregado ningún seguro.',
            icon: 'info',
            confirmButtonText: 'Aceptar'
        });
    } else {
        Swal.fire({
            title: 'Carrito de Seguros',
            html: carritoSeguros.map(seguro => `<p>${seguro}</p>`).join(''),
            icon: 'info',
            confirmButtonText: 'Comprar'
        });
    }
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
    const cuotasPrestamo = parseInt(document.getElementById('cuotasPrestamo').value);

    if (!monto || monto <= 0 || !cuotasPrestamo || cuotasPrestamo <= 0) {
        alert("Por favor, ingrese un monto y una cantidad de cuotas válidos.");
        return;
    }

    const tasaInteres = tasasInteres[tipoPrestamo];
    const valorCuota = (monto * (1 + tasaInteres)) / cuotasPrestamo;

    localStorage.setItem('tipoPrestamo', tipoPrestamo);
    localStorage.setItem('monto', monto);
    localStorage.setItem('cuotasPrestamo', cuotasPrestamo);


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
                    <td>${cuotasPrestamo}</td>
                </tr>
                <tr>
                    <td>Valor cuota</td>
                    <td>${valorCuota.toFixed(2)}</td>
                </tr>
            </tbody>
        </table>
    `;

    Swal.fire({
        title: 'Resultado de la Simulación',
        html: simulacionResult,
        icon: 'info',
        confirmButtonText: 'Aceptar'
    });
});

// Declaro los elementos de nav, main y footer
const nav = document.createElement('nav');
const main = document.createElement('main');
const footer = document.createElement('footer');

// Defino el nav
nav.innerHTML = `<h1>Bienvenido al CoderBank</h1>
    <div style="position: relative; display: inline-block;">
        <i class="fas fa-shopping-cart" style="font-size: 24px; cursor: pointer;" id="cartIcon"></i>
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
        Swal.fire({
            title: 'Error',
            text: "Por favor, ingrese un importe válido y asegúrese de que la moneda de origen y destino sean diferentes.",
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
        return;
    }

    try {
        // Llama a la API para obtener las tasas de cambio
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        if (!response.ok) {
            throw new Error('Error al obtener las tasas de cambio');
        }
        const tasasCambio = await response.json();

        // Define las monedas de origen y destino
        const monedas = {
            '1': 'USD',
            '2': 'UYU', // Peso Uruguayo
            '3': 'EUR'
        };

        const monedaOrigen = monedas[seleccion];
        const monedaDestino = monedas[cambioMoneda];

        if (!monedaOrigen || !monedaDestino) {
            Swal.fire({
                title: 'Error',
                text: "Moneda de origen o destino no válida.",
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
            return;
        }

        // Obtiene la cotización de la moneda destino con respecto a la moneda origen
        const cotizacion = tasasCambio.rates[monedaDestino] / tasasCambio.rates[monedaOrigen];

        if (!cotizacion) {
            Swal.fire({
                title: 'Error',
                text: "No se encontró una cotización válida para esos tipos de moneda.",
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
            return;
        }

        const importeConvertido = importe * cotizacion;

        let regalo = "No accediste a regalo";
        let cotizaciones = [];

        // Comparar la cotización actual con las tasas definidas en la nueva nomenclatura
        if (cotizacion === tasasCambio.rates['UYU'] / tasasCambio.rates['USD'] || 
            cotizacion === tasasCambio.rates['EUR'] / tasasCambio.rates['USD']) {
            cotizaciones.push(1);
        } else if (cotizacion === tasasCambio.rates['USD'] / tasasCambio.rates['UYU'] || 
                   cotizacion === tasasCambio.rates['EUR'] / tasasCambio.rates['UYU']) {
            cotizaciones.push(2);
        } else if (cotizacion === tasasCambio.rates['USD'] / tasasCambio.rates['EUR'] || 
                   cotizacion === tasasCambio.rates['UYU'] / tasasCambio.rates['EUR']) {
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

        // Muestra el resultado
        Swal.fire({
            title: 'Conversión Exitosa',
            html: `Monto convertido: ${importeConvertido.toFixed(2)}<br>${regalo}`,
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });

        // Guarda la transacción
        const transaccion = new Transaccion(seleccion, importe, cambioMoneda, importeConvertido, regalo);
        let transacciones = JSON.parse(localStorage.getItem('transacciones')) || [];
        transacciones.push(transaccion);
        localStorage.setItem('transacciones', JSON.stringify(transacciones));

        // Actualiza el carrito
        actualizarCarrito();

    } catch (error) {
        console.error('Error:', error);
        Swal.fire({
            title: 'Error',
            text: error.message,
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
    }
});

function mostrarOpcionesCuotas() {
    return new Promise((resolve) => {
        const cuotasContainer = document.getElementById('cuotasContainer');
        const accionBtn = document.getElementById('accionBtn');

        cuotasContainer.style.display = 'block';
        accionBtn.textContent = 'Contratar';

        document.getElementById('cuotas').addEventListener('change', () => {
            accionBtn.style.display = 'block';
            resolve(); 
        }, { once: true }); 
    });
}



class Seguro {
    constructor(tipoSeguro, cuotas, total, totalCuotas) {
        this.tipoSeguro = tipoSeguro;
        this.cuotas = cuotas;
        this.total = total;
        this.totalCuotas = totalCuotas;
    }

    toJSON() {
        return {
            tipoSeguro: this.tipoSeguro,
            cuotas: this.cuotas,
            total: this.total,
            totalCuotas: this.totalCuotas
        };
    }
}

document.getElementById('tiposeguro').addEventListener('change', () => {
    mostrarOpcionesCuotas();
});

document.getElementById('seguro').addEventListener('submit', async (event) => {
    event.preventDefault();

    const tipoSeguro = document.getElementById('tiposeguro').value;
    const cuotas = document.getElementById('cuotas').value;

    try {
        const response = await fetch('seguros.json');
        if (!response.ok) {
            throw new Error('Error al obtener la información de los seguros');
        }
        const seguros = await response.json();

        const seguroSeleccionado = seguros[tipoSeguro];
        if (!seguroSeleccionado) {
            Swal.fire({
                title: 'Error',
                text: "No se encontró información del seguro seleccionado.",
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
            return;
        }

        const total = seguroSeleccionado.costo;
        const totalCuotas = total / cuotas;

        const seguro = new Seguro(tipoSeguro, cuotas, total, totalCuotas);

        let segurosGuardados = JSON.parse(localStorage.getItem('seguros')) || [];
        segurosGuardados.push(seguro);
        localStorage.setItem('seguros', JSON.stringify(segurosGuardados));

        Swal.fire({
            title: 'Seguro Seleccionado',
            html: `${seguroSeleccionado.nombre}<br>Costo Total: ${total}<br>Cuotas: ${cuotas}<br>Total por Cuota: ${totalCuotas.toFixed(2)}`,
            icon: 'success',
            confirmButtonText: 'Aceptar'
        }).then(() => {
            // Limpiar el combo de cuotas y ocultar el contenedor
            document.getElementById('cuotas').selectedIndex = 0; // Resetear selección
            document.getElementById('cuotasContainer').style.display = 'none'; // Ocultar contenedor
            document.getElementById('accionBtn').style.display = 'none'; // Ocultar botón
            actualizarCarrito();
        });
    } catch (error) {
        console.error('Error:', error);
        Swal.fire({
            title: 'Error',
            text: error.message,
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
    }
});

class Simulacion {
    constructor(tipoPrestamo, monto, cuotas, valorCuota) {
        this.tipoPrestamo = tipoPrestamo;
        this.monto = monto;
        this.cuotas = cuotas;
        this.valorCuota = valorCuota;
    }

    toJSON() {
        return {
            tipoPrestamo: this.tipoPrestamo,
            monto: this.monto,
            cuotas: this.cuotas,
            valorCuota: this.valorCuota
        };
    }
}

document.getElementById('simulacionForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const tipoPrestamo = document.getElementById('prestamo').value;
    const monto = parseFloat(document.getElementById('monto').value);
    const cuotas = parseInt(document.getElementById('cuotasPrestamo').value);

    if (!monto || monto <= 0 || !cuotas || cuotas <= 0) {
        Swal.fire({
            title: 'Error',
            text: "Por favor, ingrese un monto y una cantidad de cuotas válidos.",
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
        return;
    }

    const tasaInteres = 0.05;
    const valorCuota = (monto * (1 + tasaInteres)) / cuotas;

    const simulacion = new Simulacion(tipoPrestamo, monto, cuotas, valorCuota);

    let simulaciones = JSON.parse(localStorage.getItem('simulaciones')) || [];
    simulaciones.push(simulacion);
    localStorage.setItem('simulaciones', JSON.stringify(simulaciones));

    Swal.fire({
        title: 'Simulación Exitosa',
        html: `Monto: ${monto.toFixed(2)}<br>Cuotas: ${cuotas}<br>Valor Cuota: ${valorCuota.toFixed(2)}`,
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });
    actualizarCarrito();
});

function actualizarCarrito() {
    const transacciones = JSON.parse(localStorage.getItem('transacciones')) || [];
    const seguros = JSON.parse(localStorage.getItem('seguros')) || [];
    const simulaciones = JSON.parse(localStorage.getItem('simulaciones')) || [];

    const carritoCount = transacciones.length + seguros.length + simulaciones.length;
    document.getElementById('carrito-count').textContent = carritoCount;
}

function obtenerCarrito() {
    return new Promise((resolve) => {
        const transacciones = JSON.parse(localStorage.getItem('transacciones')) || [];
        const seguros = JSON.parse(localStorage.getItem('seguros')) || [];
        const simulaciones = JSON.parse(localStorage.getItem('simulaciones')) || [];
        resolve({ transacciones, seguros, simulaciones });
    });
}

function mostrarCarrito() {
    obtenerCarrito().then(({ transacciones, seguros, simulaciones }) => {
        return new Promise((resolve) => {
            let contenido = '<h2>Contenido del Carrito</h2>';
            
            if (transacciones.length > 0) {
                contenido += '<h3>Transacciones</h3><ul>';
                transacciones.forEach(t => {
                    const importeFormateado = t.importe.toFixed(2);
                    const resultadoFormateado = t.resultado.toFixed(2);
                    contenido += `<li>${t.monedaOrigen} a ${t.monedaDestino}: ${importeFormateado} - ${resultadoFormateado} (${t.regalo})</li>`;
                });
                contenido += '</ul>';
            }

            if (seguros.length > 0) {
                contenido += '<h3>Seguros</h3><ul>';
                seguros.forEach(s => {
                    contenido += `<li>${s.tipoSeguro}: ${s.total} - ${s.cuotas} cuotas (${s.totalCuotas.toFixed(2)} por cuota)</li>`;
                });
                contenido += '</ul>';
            }

            if (simulaciones.length > 0) {
                contenido += '<h3>Simulaciones</h3><ul>';
                simulaciones.forEach(s => {
                    contenido += `<li>${s.tipoPrestamo}: ${s.monto} - ${s.cuotas} cuotas (${s.valorCuota.toFixed(2)} por cuota)</li>`;
                });
                contenido += '</ul>';
            }

            Swal.fire({
                html: `
                    ${contenido}
                    <button id="seguirComprando" class="swal2-confirm" style="background-color: #007bff; color: white; border: none; border-radius: 4px; padding: 0.5rem 1rem; cursor: pointer;">Seguir comprando</button>
                `,
                icon: 'info',
                showCancelButton: true,
                confirmButtonText: 'Confirmar',
                cancelButtonText: 'Borrar',
                customClass: {
                    confirmButton: 'swal2-confirm',
                    cancelButton: 'swal2-cancel',
                    popup: 'swal2-popup',
                },
                didOpen: () => {
                    document.getElementById('seguirComprando').addEventListener('click', () => {
                        Swal.close(); // Cierra el modal sin hacer más cambios
                        resolve({ action: 'seguirComprando' });
                    });
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    resolve({ action: 'confirmarCompra' });
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    resolve({ action: 'borrarCarrito' });
                }
            });
        });
    }).then(({ action }) => {
        switch (action) {
            case 'confirmarCompra':
                return Swal.fire({
                    title: 'Compra Confirmada',
                    text: 'Gracias por tu compra.',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                }).then(() => {
                    // Limpiar el carrito después de confirmar la compra
                    localStorage.removeItem('transacciones');
                    localStorage.removeItem('seguros');
                    localStorage.removeItem('simulaciones');
                    actualizarCarrito();
                });
            case 'borrarCarrito':
                return Swal.fire({
                    title: 'Carrito Vacío',
                    text: 'El carrito ha sido borrado.',
                    icon: 'info',
                    confirmButtonText: 'Aceptar'
                }).then(() => {
                    // Limpiar el carrito después de borrar
                    localStorage.removeItem('transacciones');
                    localStorage.removeItem('seguros');
                    localStorage.removeItem('simulaciones');
                    actualizarCarrito();
                });
        }
    }).catch(error => {
        console.error('Error al obtener el carrito:', error);
    });

    
    
}

document.getElementById('cartIcon').addEventListener('click', mostrarCarrito);

actualizarCarrito();

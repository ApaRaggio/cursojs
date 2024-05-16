let seleccion = prompt("Selecciona el tipo de moneda:\n1. Dólar\n2. Peso\n3. Euro");
if (seleccion >3){
    alert("Tipo de moneda equivocada")
} 

seleccion=parseInt(seleccion);
console.log("tengo moneda" + " " + seleccion);

let importe = prompt("Ingrese monto");
console.log("importe:" + " " +importe);

let cambioMoneda;

if (seleccion===1){
    cambioMoneda = prompt("A qué moneda desea cambiar: \n2. Peso\n3. Euro")
} else if (seleccion===2){
    cambioMoneda = prompt("A qué moneda desea cambiar: \n1. Dólar\n3. Euro")
}else { cambioMoneda = prompt("A qué moneda desea cambiar: \n1. Dólar\n2. Peso")
};

cambioMoneda=parseInt(cambioMoneda);

console.log("paso a " +" "+cambioMoneda);

let cotizacion;
if (seleccion === 1 && cambioMoneda === 2) {
    cotizacion = 1; //dolar a pesos 
} else if (seleccion === 1 && cambioMoneda === 3) {
    cotizacion = 2; // dolar a euro
} else if (seleccion === 2 && cambioMoneda === 1) {
    cotizacion = 3; // pesos a dolar
} else if (seleccion === 2 && cambioMoneda === 3) {
    cotizacion = 4; // pesos a euros
} else if (seleccion === 3 && cambioMoneda === 1) {
    cotizacion = 5; // euros a dolar
} else  if (seleccion === 3 && cambioMoneda === 2) {
    cotizacion = 6; // eruos a pesos
} 

cotizacion=parseInt(cotizacion);

console.log("tipo de cotización:" + " " +cotizacion);

function resultado( importe,cotizacion){
    switch (cotizacion){
        case 1:
            return importe * 39 //dolar a pesos 
            break;
        case 2:
            return importe * 0.92 // dolar a euro
            break;
        case 3:
            return importe / 39; // pesos a dolar
            break;
        case 4:
            return importe / 41; // pesos a euros
            break;
        case 5:
            return importe * 1.9  // euros a dolar
            break; 
            case 6:
                return importe * 42.1    // eruos a pesos   
            break;            
        default:
            return "No cotizacion valida para esos tipos de moneda";    
            }
};




alert(resultado(importe,cotizacion));




// hacer un for que recorra el importe y de un regalo


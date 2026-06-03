//actividad2:Javascript es un lenguaje dinámico y basado en eventos, 
// principalmente utilizado en la web y Node.js.
function collatz(n) {
    let pasos = 0;
    while (n !== 1) {
        if (n % 2 === 0) {
            n = (n / 2) | 0;
        } else {
            n = 3 * n + 1;
        }
        pasos++;
    }
    return pasos;
}
function benchmark(nMax) {
    let totaldPasos = 0;
    for (let i = 1; i <= nMax; i++) {
        totaldPasos += collatz(i);
    }
    return totaldPasos;
}
const n = 100000; 
const memoriainicio = process.memoryUsage().heapUsed;
const iniciodtiempo = performance.now();
const resultado = benchmark(n);
const tiempofinal = performance.now();
const tiempoMs = tiempofinal - iniciodtiempo;
const memoriaMb = (process.memoryUsage().heapUsed - memoriainicio) / (1024 * 1024);
console.log(`===  Javascript ===`);
console.log(`El resultado total de pasos es : ${resultado}`);
console.log(`El tiepo total de ejecucion es : ${tiempoMs.toFixed(2)} ms`);
console.log(`La Memoria estimada es: ${memoriaMb.toFixed(4)} MB`);
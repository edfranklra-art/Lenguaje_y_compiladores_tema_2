# python
import time
import tracemalloc

def collatz(n):
    pasos = 0
    while n != 1:
        if n % 2 == 0:
            n = n // 2 
        else:
            n = 3 * n + 1
        pasos += 1
    return pasos

def benchmark(nMax):
    totaldPasos = 0
    for i in range(1, nMax + 1):
        totaldPasos += collatz(i)
    return totaldPasos

if __name__ == "__main__":
    n = 100000
    tracemalloc.start()
    
    iniciodtiempo = time.perf_counter()
    resultado = benchmark(n)
    tiempofinal = time.perf_counter()
    
    _, memoria_pico = tracemalloc.get_traced_memory()
    tracemalloc.stop()
    
    tiempoMs = (tiempofinal - iniciodtiempo) * 1000
    memoriaMb = memoria_pico / (1024 * 1024)
    
    print(f"=== Python ===")
    print(f"El resultado total de pasos es : {resultado}")
    print(f"El tiempo total de ejecucion es : {tiempoMs:.2f} ms")
    print(f"La Memoria pico utilizada es: {memoriaMb:.4f} MB")
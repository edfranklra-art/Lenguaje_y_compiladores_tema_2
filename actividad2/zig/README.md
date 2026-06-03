#Conjetura de Collatz en Zig 
## Descripción general
Este programa representa el enfoque de programación de sistemas de última generación sugerido en la guía de la materia. Su propósito es evaluar la eficiencia de la compilación nativa pura analizando la Conjetura de Collatz para todo el universo de números del 1 al $100,000$. Al remover capas virtuales, intérpretes o recolectores de basura, el código se ejecuta directamente sobre el silicio del procesador.
## Algoritmo general
1. **Inicialización y Carga:**
 El programa define el límite constante del experimento de forma estática ($n = 100,000$).
2. **Bucle de Control Principal (Benchmark):** 
Un bucle `while` estructurado recorre secuencialmente el rango numérico sin generar sobrecarga.
3. **Procesamiento de la Serie:** 
La función evalúa matemáticamente cada valor aplicando las reglas de Collatz hasta reducirlo a 1, acumulando los pasos en tipos de datos estrictos e inmutables de 64 bits (`u64`).
4. **Monitoreo de Hardware:** 
Para evitar conflictos con librerías del sistema en desarrollo, el entorno delega el cronometraje de manera externa a la consola de Windows, evaluando el pipeline completo de carga.

## Clasificación del Entorno y Mecanismos
Desde la perspectiva de Lenguajes y Compiladores, este componente cumple con las siguientes directrices técnicas:

* **Mecanismo de Ejecución:** 
Compilación Ahead-Of-Time (AOT). El compilador traduce el archivo `.zig` por completo a instrucciones binarias de máquina en frío utilizando la infraestructura 

**LLVM** antes de que el programa se abra.

* **Banderas de Optimización:**
 El parser y el backend procesan el comando bajo la bandera `-O ReleaseFast`. Esto le ordena al compilador eliminar comprobaciones de seguridad en caliente (safety checks) para aplicar *loop unrolling* y optimización extrema de bucles a nivel de hardware.

* **Estrategia de Memoria:** Asignación estática en la Pila de Ejecución (Stack). Las variables lógicas viven en los registros físicos de la CPU. No existe el uso del Heap, eliminando al 100% las interrupciones por Garbage Collector.

##  Verificación de Rendimiento y Balanceo
En la línea de mantener el equilibrio científico del benchmark, el programa imprime el total de pasos calculados al final del procesamiento del benchmark, el cual queda corroborado al observar que el resultado numérico obtenido.

## Ejemplo de ejecución 

Dado que usamos la herramienta de medición externa de PowerShell para capturar el proceso completo en tu máquina, la salida en consola despliega el tiempo global de la tarea:

```text
PS C:\Users\Pc\Downloads\ActividadII\zig> Measure-Command { & "..\zig.exe" run -O ReleaseFast collatz.zig } | Select-Object TotalMilliseconds

TotalMilliseconds
-----------------
           278.43
=======


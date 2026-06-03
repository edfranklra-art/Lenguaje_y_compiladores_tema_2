#  Conjetura de Collatz en Python (Módulo de Benchmarking)

##  Descripción general
Este programa forma parte de la evaluación de la Actividad II la función que tiene  es medir el rendimiento de un entorno que solo interpreta código, realizando un cálculo matemático llamado Conjetura de Collatz en este cálculo se hace con todos los números desde 1 hasta un límite, que en este caso es 100,000.
El programa hace los cálculos de forma secuencial, también verifica cómo funciona el hardware de tu máquinay al final  imprime el total de ciclos que se han calculado para asegurarse de que todo salió correctamente.

##  Algoritmo general
1. **Inicialización y Carga:** 
El programa establece el límite superior exacto de la muestra ($n = 100,000$).

2. **Bucle de Control Principal (Benchmark):** 
Un ciclo recorre secuencialmente cada número del 1 al 100,000 y lo envía a la función matemática de Collatz.

3. **Procesamiento de la Serie:** 
Para cada número, se aplican las reglas matemáticas de la conjetura de forma iterativa hasta reducir el valor a 1, acumulando el total de pasos ejecutados por la CPU en una variable global.

4. **Monitoreo de Hardware:**
Mediante librerías del sistema, se captura con alta precisión el tiempo que le toma al intérprete resolver el problema y el consumo de memoria pico que requirió la Máquina Virtual.

## Clasificación del Entorno y Mecanismos
A nivel de la materia de Compiladores, la ejecución en este módulo se clasifica bajo los siguientes pilares técnicos:

 **Mecanismo de Ejecución:**
 Interpretado basado en Bytecode. El motor

 **CPython**
 traduce nuestro archivo `.py` a un código intermedio de bajo nivel y lo ejecuta línea por línea usando su propia Máquina Virtual (VM).

* **Tipado y Operación:** 
El parser identifica el operador `//` o el control de flujo para ejecutar una división entera exacta y operaciones aritméticas puras a nivel de hardware.

* **Estrategia de Memoria:** Gestión dinámica de datos en el Heap, controlada automáticamente por el conteo de referencias y el Recolector de Basura (Garbage Collector) nativo de Python.

## Verificación de Rendimiento y Balanceo
Para asegurar que la prueba sea justa en comparación con los entornos compilados como Zig y JavaScript, el programa utiliza un validador interno. Este validador acumula la carga matemática exacta que al finalizar, se verifica la consistencia de los datos.
 El número de ciclos totales debe coincidir perfectamente en todas las plataformas. Esto asegura que la carga algorítmica fue idéntica y equilibrada para el procesador.

## Ejemplo de ejecución

Cuando ejecutas el programa en tu terminal, se limpia el flujo y te imprime directamente el análisis formal del entorno con tus métricas locales reales:

```text
PS C:\Users\Pc\Downloads\ActividadII\python> python collatz.py

=== Python  ===
El resultado total de pasos es : 10753840
El tiempo total de ejecucion es : 116.64 ms
La Memoria pico utilizada es: 0.0002 MB
#  Conjetura de Collatz en JavaScript (Node.js)

## Descripción general
Este programa es una parte importante de nuestra prueba de la Actividad II lo que hace es ver cómo funciona un entorno moderno que puede cambiar sus configuraciones mientras se ejecuta, calculando una teoría matemática llamada Conjetura de Collatz de manera secuencial para todos los números del 1 al límite que establecimos, que es 100.000.
 El programa realiza operaciones matemáticas, mide la velocidad del motor V8 y comprueba que el total de ciclos calculados sea correcto y no tenga errores.

##  Algoritmo general

1. **Inicialización y Carga:** El programa define el límite estricto de la prueba ($n = 100,000$).
2. **Bucle de Control Principal (Benchmark):** Un ciclo recorre secuencialmente cada número del rango y lo envía a evaluar.
3. **Procesamiento de la Serie:** Para cada número, se aplican las reglas lógicas de la conjetura de forma iterativa hasta llegar a 1. Se implementan operadores a nivel de bits para garantizar un truncamiento entero eficiente.
4. **Monitoreo de Hardware:** 
Mediante el objeto nativo `performance.now()` y el módulo `process.memoryUsage()`, se mide el tiempo de CPU en milisegundos y el consumo de memoria pico del entorno de ejecución.

## Clasificación del Entorno y Mecanismos
A nivel de la teoría de compiladores, el comportamiento de este módulo se clasifica bajo los siguientes pilares:

* **Mecanismo de Ejecución:**
 Compilación híbrida Just-In-Time (JIT).
  El motor **V8 de Node.js**
 lee el código inicialmente de forma rápida, pero al detectar que el bucle de Collatz es un punto caliente de ejecución ("hot spot"), lo traduce a código de máquina nativo sobre la marcha.
* **Tipado y Operación:** 
Como JavaScript maneja números flotantes de doble precisión de forma nativa, el parser procesa la operación matemática usando un enmascaramiento a nivel de bits (`| 0`) para forzar la división entera directamente en el procesador.
* **Estrategia de Memoria:** 
Asignación dinámica en el Heap orientada a objetos. El entorno gestiona las estructuras internas y libera los bloques vacíos de manera automática a través del Garbage Collector de V8.

##  Verificación de Rendimiento y Balanceo
Para asegurar que la prueba sea justa, el programa suma todos los pasos que se han calculado y los guarda en una variable especial cuando la prueba termina, se verifica que el número de cálculos sea exactamente el mismo que el de los demás competidores de esta manera, se garantiza que el procesador ha hecho el mismo esfuerzo en cada caso.

##  Ejemplo de ejecución 

Cuando corres el archivo en tu consola local, se despliega el bloque formateado con tus métricas reales:

```text
PS C:\Users\Pc\Downloads\ActividadII\javascript> node collatz.js

=== JavaScript ===
El resultado total de pasos es : 10753840
El tiempo total de ejecucion es : 33.99 ms
La Memoria pico utilizada es: 0.1725 MB
# Introducción — Lenguaje L (ECO-L)

## 1. Contexto y Motivación

El sistema **ECO-GRID** es una planta de gestión de microredes eléctricas inteligentes que integra generación renovable (solar y eólica), almacenamiento en baterías de litio y distribución automatizada hacia sectores de consumo industrial y comercial.

Los operadores de esta planta requieren un lenguaje de control que les permita escribir rutinas de automatización sin depender de lenguajes de propósito general como C o Python, los cuales exponen complejidades innecesarias y riesgos de seguridad para un entorno crítico.

**ECO-L** nace como respuesta a este problema: un **Lenguaje de Dominio Específico (DSL)** construido exclusivamente para el control, monitoreo y automatización de los dispositivos físicos de ECO-GRID.

---

## 2. Filosofía de Diseño

ECO-L se diseña bajo cinco principios fundamentales que guían cada decisión de su especificación:

### Principio 1 — Legibilidad Natural
La sintaxis está basada en **español estructurado** para minimizar la curva de aprendizaje del operador industrial. Un operador debe poder leer un programa ECO-L como si fuera un procedimiento escrito en lenguaje natural.

### Principio 2 — Seguridad por Diseño
Toda acción sobre actuadores críticos requiere **primitivas explícitas**. No existen punteros, acceso directo a memoria ni operaciones de propósito general que puedan interferir con el hardware. El lenguaje solo expone lo que el sistema necesita.

### Principio 3 — Determinismo Temporal
Las estructuras de repetición admiten **límites temporales obligatorios** mediante la directiva `@timeout`. Esto garantiza la terminación del programa en sistemas donde un bucle infinito puede tener consecuencias físicas reales (sobrecalentamiento, pérdida de control, etc.).

### Principio 4 — Tipado Fuerte Estático
Las variables deben declararse con **tipo explícito** antes de usarse. Esto evita errores de conversión silenciosos al leer sensores (por ejemplo, interpretar una temperatura decimal como un entero y perder precisión crítica).

### Principio 5 — Dominio Cerrado
Solo se exponen las operaciones válidas sobre el hardware ECO-GRID a través de **primitivas léxicas predefinidas**. No es posible llamar funciones externas ni importar librerías, lo que garantiza un comportamiento predecible y auditado.

---

## 3. Componentes Físicos del Sistema ECO-GRID

El lenguaje abstrae los siguientes componentes del sistema físico real:

| Componente                     | ID en ECO-L         | Descripción                                     |
| Arreglos de Paneles Solares    | `fuente_id` (1–N)   | Generadores primarios de energía fotovoltaica   |
| Turbinas Eólicas               | `fuente_id` (N+1–M) | Generadores primarios de energía eólica         |
| Bancos de Baterías de Litio    | `bateria_id` (1–K)  | Almacenamiento de excedentes de carga           |
| Inversores / Sensores de Flujo | `sensor_id` (1–P)   | Medición de entrada/salida en kilovatios (kW)   |
| Sensores Térmicos de Celda     | `bateria_id` (1–K)  | Temperatura crítica de contenedores de baterías |
| Relés de Alta Potencia         | `sector_id` (1–Q)   | Conectan/aíslan sectores de consumo de la red   |

---

## 4. Relación con la Arquitectura HMI

ECO-L actúa como la **capa de interfaz** entre el operador humano y el driver de bajo nivel del hardware:

```
[ Operador Humano ]
        |
        |  escribe programas en ECO-L
        ↓
[ Analizador Léxico ECO-L ]  →  tokens
        ↓
[ Analizador Sintáctico  ]  →  árbol de análisis
        ↓
[ Intérprete / Ejecutor  ]
        ↓
[ Driver de Bajo Nivel   ]
        ↓
[ Hardware ECO-GRID      ]  →  sensores, actuadores, relés
```

El operador **nunca interactúa directamente** con el driver. Toda comunicación pasa por el lenguaje, que valida léxica y sintácticamente cada instrucción antes de ejecutarla.

---

## 5. Características Generales

| Característica            | Valor                                           |
| **Paradigma**             | Imperativo, secuencial                          |
| **Orientación**           | Dominio específico (DSL)                        |
| **Tipado**                | Fuerte, estático, explícito                     |
| **Idioma de la sintaxis** | Español estructurado                            |
| **Modelo de ejecución**   | Interpretado / traducido a comandos de driver   |
| **Gestión de errores**    | Detención segura ante error léxico o sintáctico |
| **Extensión de archivo**  | `.ecol`                                         |

---

*Siguiente sección: [Alfabeto y Reglas Léxicas →](01_alfabeto_lexico.md)*
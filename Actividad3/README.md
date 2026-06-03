> **Asignatura:** Lenguaje y Compiladores  
> **Proyecto:** Diseño de un DSL para Sistemas Lógico-Físicos Críticos  
> **Dominio:** Sistema de Gestión de Microredes Eléctricas Inteligentes y Almacenamiento de Energía

---

## ¿Qué es ECO-L?

**ECO-L** es un lenguaje de programación de alto nivel, imperativo y de dominio específico, diseñado para que **operadores humanos** de la planta ECO-GRID puedan escribir rutinas de control, monitoreo y automatización sobre los componentes físicos del sistema sin requerir conocimientos de programación general.

El lenguaje utiliza sintaxis en **español estructurado**, tipado fuerte estático y primitivas intrínsecas que se comunican directamente con el driver de bajo nivel del hardware industrial.

---

## Estructura del Repositorio

```
ECO-L/
│
├── README.md                          ← Este archivo
│
├── docs/
│   ├── 00_introduccion.md             ← Filosofía y principios de diseño
│   ├── 01_alfabeto_lexico.md          ← Alfabeto y reglas léxicas completas
│   ├── 02_palabras_clave.md           ← Tokens reservados y primitivas de dispositivo
│   ├── 03_gramatica.md                ← Gramática BNF y diagramas sintácticos
│   └── 04_tabla_tokens.md             ← Tabla exhaustiva del analizador léxico
│
└── ejemplos/
    ├── escenario_A_prevencion_termica.ecol   ← Programa: Prevención de Fuga Térmica
    └── escenario_B_balance_energetico.ecol   ← Programa: Balance de Carga Autónomo
```

---

## Componentes del Sistema ECO-GRID

El sistema físico simulado cuenta con los siguientes componentes controlables:

| # | Componente                                     | Tipo                             |
|---|------------------------------------------------|----------------------------------|
| 1 | Arreglos de Paneles Solares y Turbinas Eólicas | Generadores primarios            |
| 2 | Bancos de Baterías de Litio de Respaldo        | Almacenamiento de energía        |
| 3 | Sensores de Flujo Eléctrico e Inversores       | Medición en kW                   |
| 4 | Sensores Térmicos de Celda                     | Monitoreo de temperatura crítica |
| 5 | Conmutadores Electrónicos de Red (Relés)       | Actuadores de sector             |

---

## Documentación

| Documento                                         | Contenido                                                       |
|---------------------------------------------------|------------------------------------------------------------------|
| [Introducción](docs/00_introduccion.md)           | Filosofía, principios y características generales              |
| [Alfabeto y Léxico](docs/01_alfabeto_lexico.md)   | Definición del alfabeto Σ, tokens y reglas léxicas               |
| [Palabras Clave](docs/02_palabras_clave.md)       | Reservadas, primitivas de hardware y directivas                  |
| [Gramática](docs/03_gramatica.md)                 | BNF extendido, producciones y árbol sintáctico                   |
| [Tabla de Tokens](docs/04_tabla_tokens.md)        | Catálogo completo de 54 tokens del analizador léxico           |

## Programas de Ejemplo

| Archivo                                                                      | Escenario                                                      |
|------------------------------------------------------------------------------|----------------------------------------------------------------|
| [Escenario A](ejemplos/escenario_A_prevencion_termica.ecol)                  | Prevención de Fuga Térmica y Gestión de Alivio de Carga        |
| [Escenario B](ejemplos/escenario_B_balance_energetico.ecol)                  | Balance de Carga y Optimización Energética Autónoma            |

---

## Resumen de Características

| Característica                  | Especificación                               |
|---------------------------------|----------------------------------------------|
| **Paradigma**                   | Imperativo, secuencial, orientado a dominio  |
| **Tipado**                      | Fuerte, estático, explícito                  |
| **Tipos primitivos**            | `ENTERO`, `DECIMAL`, `BOOLEANO`, `TEXTO`     |
| **Idioma base**                 | Español estructurado                         |
| **Palabras reservadas**         | 30                                           |
| **Primitivas de dispositivo**   | 18                                           |
| **Categorías de token**         | 54                                           |
| **Terminación garantizada**     | Mediante directiva `@timeout` obligatoria    |

---

*Fase actual: **Diseño del Lenguaje** — Especificación formal sin implementación.*

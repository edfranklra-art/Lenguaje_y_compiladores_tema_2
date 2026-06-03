# Tabla de Tokens del Analizador Léxico — ECO-L

> Catálogo exhaustivo de todos los tokens reconocidos por el analizador léxico de ECO-L.  
> Total: **54 tokens** distribuidos en 8 categorías.

---

## Categoría 1 — Primitivas del Sistema ECO-GRID

| # |           Lexema            |        Código Token        |                Descripción                  |
|---|-----------------------------|----------------------------|---------------------------------------------|
| 1 | `init_grid`                 | `TK_INIT_GRID`             | Inicialización del sistema ECO-GRID         |
| 2 | `apagar_grid`               | `TK_APAGAR_GRID`           | Apagado seguro del sistema                  |
| 3 | `leer_temperatura`          | `TK_PRIM_LEER_TEMP`        | Lectura de sensor térmico de celda          |
| 4 | `estado_carga`              | `TK_PRIM_ESTADO_CARGA`     | Porcentaje de carga de batería              |
| 5 | `leer_flujo`                | `TK_PRIM_LEER_FLUJO`       | Flujo eléctrico en kW (inversor)            |
| 6 | `leer_generacion`           | `TK_PRIM_LEER_GEN`         | Generación actual de fuente renovable       |
| 7 | `leer_demanda`              | `TK_PRIM_LEER_DEM`         | Demanda energética de un sector             |
| 8 | `obtener_hora`              | `TK_PRIM_HORA`             | Hora actual del sistema (0–23)              |
| 9 | `leer_irradiancia`          | `TK_PRIM_IRRAD`            | Irradiancia solar en W/m²                   |
| 10 | `conmutar_linea`           | `TK_PRIM_CONMUTAR`         | Activar/desactivar relé de sector           |
| 11 | `activar_refrigeracion`    | `TK_PRIM_ACT_REFRIG`       | Encender refrigeración auxiliar             |
| 12 | `desactivar_refrigeracion` | `TK_PRIM_DES_REFRIG`       | Apagar refrigeración auxiliar               |
| 13 | `conectar_red_comercial`   | `TK_PRIM_CON_RED`          | Conectar sector a red comercial             |
| 14 | `desconectar_red_comercial`| `TK_PRIM_DES_RED`          | Desconectar sector de red comercial         |
| 15 | `conectar_carga_solar`     | `TK_PRIM_CON_SOLAR`        | Habilitar carga desde panel solar           |
| 16 | `desconectar_carga_solar`  | `TK_PRIM_DES_SOLAR`        | Detener carga desde panel solar             |
| 17 | `inyectar_excedente`       | `TK_PRIM_INYECTAR`         | Inyectar excedente a red pública            |
| 18 | `emitir_alerta`            | `TK_PRIM_ALERTA`           | Emitir alerta al sistema HMI                |
| 19 | `registrar_evento`         | `TK_PRIM_REGISTRO`         | Escribir en log SCADA                       |
| 20 | `mostrar_panel`            | `TK_PRIM_PANEL`            | Mostrar mensaje en panel de operador        |

---

## Categoría 2 — Palabras Reservadas de Control de Flujo

| #  |    Lexema     | Código Token     |                Descripción                |
|----|---------------|------------------|-------------------------------------------|
| 21 | `si`          | `TK_SI`          | Inicio de condicional                     |
| 22 | `entonces`    | `TK_ENTONCES`    | Separador condición → bloque              |
| 23 | `sino`        | `TK_SINO`        | Bloque alternativo (else)                 |
| 24 | `sino_si`     | `TK_SINO_SI`     | Condición encadenada (else-if)            |
| 25 | `fin_si`      | `TK_FIN_SI`      | Cierre de bloque condicional              |
| 26 | `mientras`    | `TK_MIENTRAS`    | Inicio de bucle while                     |
| 27 | `ejecutar`    | `TK_EJECUTAR`    | Separador condición → cuerpo del bucle    |
| 28 | `fin_mientras`| `TK_FIN_MIENTRAS`| Cierre de bucle mientras                  |
| 29 | `para`        | `TK_PARA`        | Inicio de bucle for                       |
| 30 | `desde`       | `TK_DESDE`       | Valor inicial del rango                   |
| 31 | `hasta`       | `TK_HASTA`       | Valor final del rango                     |
| 32 | `fin_para`    | `TK_FIN_PARA`    | Cierre de bucle para                      |
| 33 | `repetir`     | `TK_REPETIR`     | Inicio de bucle do-while                  |
| 34 | `hasta_que`   | `TK_HASTA_QUE`   | Condición de salida do-while              |
| 35 | `romper`      | `TK_ROMPER`      | Salida inmediata de bucle (break)         |
| 36 | `continuar`   | `TK_CONTINUAR`   | Saltar a siguiente iteración (continue)   |

---

## Categoría 3 — Palabras Reservadas de Declaración y Tipos

| # |      Lexema        |       Código Token        |             Descripción             |
|---|--------------------|---------------------------|-------------------------------------|
| 37 | `declarar`        | `TK_DECLARAR`             | Inicio de declaración de variable   |
| 38 | `como`            | `TK_COMO`                 | Separador identificador/tipo        |
| 39 | `CONSTANTE`       | `TK_CONSTANTE`            | Modificador de inmutabilidad        |
| 40 | `ENTERO`          | `TK_TIPO_ENTERO`          | Tipo numérico entero                |
| 41 | `DECIMAL`         | `TK_TIPO_DECIMAL`         | Tipo numérico de punto flotante     |
| 42 | `BOOLEANO`        | `TK_TIPO_BOOLEANO`        | Tipo lógico                         |
| 43 | `TEXTO`           | `TK_TIPO_TEXTO`           | Tipo cadena de caracteres           |
| 44 | `VERDADERO`       | `TK_VERDADERO`            | Literal booleano verdadero          |
| 45 | `FALSO`           | `TK_FALSO`                | Literal booleano falso              |

---

## Categoría 4 — Operadores Lógicos

| # |    Lexema   |   Código Token   |         Descripción          |
|---|-------------|------------------|------------------------------|
| 46 | `Y`        | `TK_Y`           | Conjunción lógica (AND)      |
| 47 | `O`        | `TK_O`           | Disyunción lógica (OR)       |
| 48 | `NO`       | `TK_NO`          | Negación lógica (NOT)        |

---

## Categoría 5 — Operadores Aritméticos y Relacionales

| # |    Lexema   |   Código Token   |         Descripción          |
|---|-------------|------------------|------------------------------|
| 49 | `+`        | `TK_SUMA`        | Suma aritmética              |
| 50 | `-`        | `TK_RESTA`       | Resta / negación unaria      |
| 51 | `*`        | `TK_MULT`        | Multiplicación               |
| 52 | `/`        | `TK_DIV`         | División                     |
| 53 | `%`        | `TK_MODULO`      | Módulo (resto)               |
| 54 | `>`        | `TK_MAYOR`       | Mayor que                    |
| 55 | `<`        | `TK_MENOR`       | Menor que                    |
| 56 | `>=`       | `TK_MAYOR_IGUAL` | Mayor o igual que            |
| 57 | `<=`       | `TK_MENOR_IGUAL` | Menor o igual que            |
| 58 | `==`       | `TK_IGUAL`       | Igualdad (comparación)       |
| 59 | `!=`       | `TK_DIFERENTE`   | Desigualdad                  |
| 60 | `:=`       | `TK_ASIGNAR`     | Asignación                   |

---

## Categoría 6 — Delimitadores y Puntuación

| # |   Lexema    |   Código Token  |              Descripción             |
|---|-------------|-----------------|--------------------------------------|
| 61 | `(`        | `TK_PAREN_IZQ`  | Paréntesis izquierdo                 |
| 62 | `)`        | `TK_PAREN_DER`  | Paréntesis derecho                   |
| 63 | `,`        | `TK_COMA`       | Separador de argumentos              |
| 64 | `;`        | `TK_PUNTO_COMA` | Terminador de sentencia              |
| 65 | `:`        | `TK_DOS_PUNTOS` | Separador en declaraciones           |
| 66 | `..`       | `TK_RANGO`      | Separador de rango (bucle para)      |
| 67 | `@`        | `TK_DIRECTIVA`  | Prefijo de directiva del sistema     |
| 68 | `#`        | `TK_COMENTARIO` | Inicio de comentario de línea        |

---

## Categoría 7 — Literales

| # |  Categoría         | Código Token         | Patrón                  | Ejemplo            |
|---|--------------------|----------------------|-------------------------|--------------------|
| 69 | Literal entero    | `TK_LIT_ENTERO`      | `[0-9]+`                | `42`, `1000`, `0`  |
| 70 | Literal decimal   | `TK_LIT_DECIMAL`     | `[0-9]+\.[0-9]+`        | `55.0`, `3.14`     |
| 71 | Literal de texto  | `TK_LIT_TEXTO`       | `"[^"\n]*"`             | `"Alerta térmica"` |

---

## Categoría 8 — Identificadores Dinámicos

| # | Categoría                 | Código Token         | Patrón                          | Ejemplo                     |
|---|---------------------------|----------------------|---------------------------------|-----------------------------|
| 72 | Identificador de usuario | `TK_IDENTIFICADOR`   | `[a-zA-ZñÑ_][a-zA-Z0-9ñÑ_]*`    | `temp_actual`, `carga_ppal` |

---

## Resumen por Categoría

| Categoría                             | Cantidad de Tokens |
|---------------------------------------|--------------------|
| Primitivas del sistema ECO-GRID       | 20                 |
| Control de flujo                      | 16                 |
| Declaración y tipos                   | 9                  |
| Operadores lógicos                    | 3                  |
| Operadores aritméticos y relacionales | 12                 |
| Delimitadores y puntuación            | 8                  |
| Literales                             | 3                  |
| Identificadores dinámicos             | 1                  |
| **Total**                             | **72**             |

---

## Ejemplo de Tokenización

Para la línea de código:
```
si temp_actual > 55.0 entonces
```

El analizador léxico produce la siguiente secuencia de tokens:

| Posición  | Lexema        | Token             |
|-----------|---------------|-------------------|
| 1         | `si`          | `TK_SI`           |
| 2         | `temp_actual` | `TK_IDENTIFICADOR`|
| 3         | `>`           | `TK_MAYOR`        |
| 4         | `55.0`        | `TK_LIT_DECIMAL`  |
| 5         | `entonces`    | `TK_ENTONCES`     |

Para la línea:
```
conmutar_linea(SECTOR_INDUSTRIAL, FALSO);
```

| Posición  | Lexema              | Token             |
|-----------|---------------------|-------------------|
| 1         | `conmutar_linea`    | `TK_PRIM_CONMUTAR`|
| 2         | `(`                 | `TK_PAREN_IZQ`    |
| 3         | `SECTOR_INDUSTRIAL` | `TK_IDENTIFICADOR`|
| 4         | `,`                 | `TK_COMA`         |
| 5         | `FALSO`             | `TK_FALSO`        |
| 6         | `)`                 | `TK_PAREN_DER`    |
| 7         | `;`                 | `TK_PUNTO_COMA`   |

---

*Sección anterior: [← Gramática](03_gramatica.md)*

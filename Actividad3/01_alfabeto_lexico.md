# Alfabeto y Reglas Léxicas — ECO-L

## 1. Definición Formal del Alfabeto (Σ)

El alfabeto formal del Lenguaje L se define como la unión de cuatro conjuntos disjuntos:

```
Σ = Σ_letras ∪ Σ_digitos ∪ Σ_especiales ∪ Σ_blancos
```

| Conjunto         | Símbolos                                               | Descripción                                      |
| **Σ_letras**     | `a–z`, `A–Z`, `_`, `ñ`, `Ñ`                            | Letras latinas básicas, guion bajo y eñe         |
| **Σ_digitos**    | `0–9`                                                  | Dígitos decimales                                |
| **Σ_especiales** | `(  )  ,  ;  .  +  -  *  /  <  >  =  !  :  "  #  @  %` | Operadores y delimitadores                       |
| **Σ_blancos**    | `espacio`, `\t`, `\n`, `\r`                            | Separadores (no significativos fuera de cadenas) |

> **Nota:** Los caracteres fuera de Σ provocan un **error léxico** y detienen el análisis de forma segura.

---

## 2. Categorías de Tokens

El analizador léxico de ECO-L reconoce las siguientes siete categorías de tokens:

---

### 2.1 Identificadores

Un identificador es una secuencia de caracteres que nombra una variable definida por el operador.

**Expresión Regular:**
```
IDENTIFICADOR → letra ( letra | digito | '_' )*
letra          → [a-zA-ZñÑ_]
digito         → [0-9]
```

**Restricciones:**
- Sensible a mayúsculas/minúsculas (`temp_actual` ≠ `Temp_Actual`)
- No puede coincidir con ninguna palabra reservada
- Longitud máxima: **64 caracteres**
- Debe iniciar siempre con una letra o guion bajo (nunca con dígito)

| Identificador        | ¿Válido? | Razón                                 |
| `bateria_01`         |    ✅   | Inicia con letra                       |
| `sector_norte`       |    ✅   | Solo letras y guion bajo               |
| `temp_actual`        |    ✅   | Formato estándar                       |
| `01bateria`          |    ❌   | Inicia con dígito                      |
| `si`                 |    ❌   | Palabra reservada                      |
| `var@1`              |    ❌   | Carácter `@` inválido en identificador |
| `flujoKiloWatt_2026` |    ✅   | Longitud dentro del límite             |

---

### 2.2 Literales Numéricos

Los literales numéricos representan valores constantes dentro del programa.

**Expresiones Regulares:**
```
LIT_ENTERO     → [0-9]+
LIT_DECIMAL    → [0-9]+ '.' [0-9]+
LIT_NEGATIVO   → '-' ( LIT_ENTERO | LIT_DECIMAL )
```

| Tipo                        | Patrón               | Ejemplos válidos                 |
| Entero positivo             | `[0-9]+`             | `0`, `42`, `1000`, `7`           |
| Decimal positivo            | `[0-9]+\.[0-9]+`     | `3.14`, `55.0`, `0.75`, `100.00` |
| Negativo (entero o decimal) | `-[0-9]+(\.[0-9]+)?` | `-10`, `-3.5`, `-273.15`         |

> **Restricción:** No se admite notación científica (`1e5`) ni hexadecimal (`0xFF`). Las unidades físicas (kW, °C, %) son semánticas y se manejan por las primitivas, no como sufijos de literales.

---

### 2.3 Literales Booleanos

Los literales booleanos son los únicos dos valores del tipo `BOOLEANO`. Son palabras reservadas.

```
LIT_BOOLEANO → 'VERDADERO' | 'FALSO'
```

| Literal     | Significado                             | Equivalente lógico |
| `VERDADERO` | Condición satisfecha, señal activa      | `true` / `1`       |
| `FALSO`     | Condición no satisfecha, señal inactiva | `false` / `0`      |

---

### 2.4 Literales de Texto (Cadenas)

Los literales de texto se usan principalmente para mensajes en el panel del operador y el sistema de alertas.

**Expresión Regular:**
```
LIT_TEXTO → '"' ( [^"\n] | '\"' )* '"'
```

**Reglas:**
- Delimitados por comillas dobles `"..."`.
- Una comilla doble dentro del texto se escapa con `\"`.
- No se permiten saltos de línea literales dentro de una cadena.

**Ejemplos:**
```
"Sistema iniciado correctamente"
"ALERTA: Temperatura crítica en batería B-03"
"Hora de cierre: 18:00"
"Mensaje con \"comillas\" internas"
```

---

### 2.5 Operadores

#### Operadores Aritméticos

| Token | Operación                  | Ejemplo                                |
| `+`   | Suma                       | `generacion_solar + generacion_eolica` |
| `-`   | Resta / Negación unaria    | `excedente - perdidas`                 |
| `*`   | Multiplicación             | `flujo * factor_correccion`            |
| `/`   | División entera o decimal  | `total / num_sectores`                 |
| `%`   | Módulo (resto de división) | `ciclos % 10`                          |

#### Operadores Relacionales

| Token | Operación              | Ejemplo                   |
| `>`   | Mayor que              | `temp_actual > 55.0`      |
| `<`   | Menor que              | `carga_bateria < 20.0`    |
| `>=`  | Mayor o igual que      | `generacion >= demanda`   |
| `<=`  | Menor o igual que      | `nivel <= UMBRAL_CRITICO` |
| `==`  | Igual a (comparación)  | `estado == VERDADERO`     |
| `!=`  | Diferente de           | `sector_id != 4`          |

#### Operadores Lógicos (palabras reservadas)

| Token | Operación        | Ejemplo                               |
| `Y`   | Conjunción (AND) | `carga > 90.0 Y generacion > demanda` |
| `O`   | Disyunción (OR)  | `hora >= 18 O hora < 6`               |
| `NO`  | Negación (NOT)   | `NO refrigeracion_activa`             |

#### Operador de Asignación

| Token | Operación           | Ejemplo                              |
| `:=`  | Asignación de valor | `temp_actual := leer_temperatura(3)` |

> **Decisión de diseño:** El operador `:=` se diferencia intencionalmente del comparador `==` para eliminar la ambigüedad clásica del operador `=` presente en lenguajes como C, donde una asignación dentro de una condición puede pasar inadvertida.

---

### 2.6 Delimitadores y Puntuación

| Token | Nombre               | Función |
| `(`   | Paréntesis izquierdo | Agrupación de expresiones y apertura de argumentos                     |
| `)`   | Paréntesis derecho   | Cierre de expresión o lista de argumentos                              |
| `,`   | Coma                 | Separador de argumentos en llamadas a primitivas                       |
| `;`   | Punto y coma         | Terminador obligatorio de sentencia                                    |
| `:`   | Dos puntos           | Separador en declaraciones de tipo (`declarar x como DECIMAL`)         |
| `..`  | Rango                | Separador de rango en bucles `para` (reservado, actualmente implícito) |
| `@`   | Arroba               | Prefijo de directivas del sistema                                      |
| `#`   | Almohadilla          | Inicio de comentario de línea                                          |

---

### 2.7 Comentarios

Los comentarios son ignorados completamente por el analizador léxico. Sirven para documentar el código del operador.

#### Comentario de Línea
```
COMENTARIO_LINEA  → '#' [^\n]* '\n'
```

Ejemplo:
```
# Esto es un comentario de una línea completa
temp_actual := leer_temperatura(3);   # También puede ir al final de una línea
```

#### Comentario de Bloque
```
COMENTARIO_BLOQUE → '#[' .*? ']#'
```

Ejemplo:
```
#[
   Rutina de monitoreo térmico
   Autor: Operador de turno
   Versión: 1.0
]#
```

---

## 3. Tabla de Precedencia de Operadores

La siguiente tabla define la precedencia de operadores de **mayor a menor prioridad** (nivel 1 = más alta):

| Nivel | Operador(es)                     | Asociatividad       | Descripción                           |
| 1     | `NO`, `-` (unario)               | Derecha → Izquierda | Negación lógica y negación aritmética |
| 2     | `*`, `/`, `%`                    | Izquierda → Derecha | Multiplicativos                       |
| 3     | `+`, `-`                         | Izquierda → Derecha | Aditivos                              |
| 4     | `>`, `<`, `>=`, `<=`, `==`, `!=` | No asociativo       | Relacionales (no encadenables)        |
| 5     | `Y`                              | Izquierda → Derecha | Conjunción lógica                     |
| 6     | `O`                              | Izquierda → Derecha | Disyunción lógica                     |
| 7     | `:=`                             | Derecha → Izquierda | Asignación                            |

**Ejemplo de aplicación de precedencia:**
```
# La expresión:
carga > 90.0 Y generacion + perdidas > demanda * 1.1

# Se evalúa como:
( carga > 90.0 ) Y ( (generacion + perdidas) > (demanda * 1.1) )
```

---

## 4. Reglas de Espaciado

- Los caracteres de Σ_blancos son **no significativos** fuera de literales de texto.
- El analizador léxico los utiliza únicamente como separadores de tokens.
- Un programa puede tener cualquier cantidad de espacios, tabulaciones o saltos de línea entre tokens sin alterar su semántica.

---

*Sección anterior: [← Introducción](00_introduccion.md) | Siguiente sección: [Palabras Clave →](02_palabras_clave.md)*

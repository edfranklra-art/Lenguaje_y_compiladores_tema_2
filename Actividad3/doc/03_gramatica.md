# Gramática Sintáctica Abstracta — ECO-L

> La gramática se especifica en **notación BNF extendida** (Backus-Naur Form).
>
> - Símbolos **no terminales**: encerrados en `⟨ ⟩`
> - Símbolos **terminales**: en `'comillas simples'` o en **negrita**
> - `|` — alternativa
> - `[ ]` — elemento opcional (cero o una vez)
> - `{ }` — repetición (cero o más veces)
> - `( )` — agrupación

---

## 1. Estructura General del Programa

Todo programa ECO-L válido sigue esta estructura de nivel superior:

```bnf
⟨programa⟩ → ⟨directivas⟩ ⟨bloque_inicio⟩ ⟨secuencia_sentencias⟩ ⟨bloque_fin⟩

⟨directivas⟩    → { ⟨directiva⟩ }
⟨directiva⟩     → '@' IDENTIFICADOR [ '(' ⟨lista_argumentos⟩ ')' ] ';'

⟨bloque_inicio⟩ → 'init_grid' ';'
⟨bloque_fin⟩    → 'apagar_grid' ';'

⟨secuencia_sentencias⟩ → { ⟨sentencia⟩ }
```

> **Restricción semántica:** Todo programa válido debe comenzar con `init_grid;` y terminar con `apagar_grid;`. Esta restricción garantiza que ningún script acceda al hardware sin una inicialización apropiada ni lo deje en estado indefinido.

---

## 2. Sentencias

Una sentencia es la unidad ejecutable mínima del programa:

```bnf
⟨sentencia⟩ → ⟨declaracion⟩
             | ⟨declaracion_constante⟩
             | ⟨asignacion⟩
             | ⟨condicional⟩
             | ⟨bucle_mientras⟩
             | ⟨bucle_para⟩
             | ⟨bucle_repetir⟩
             | ⟨llamada_primitiva⟩ ';'
             | ⟨sentencia_romper⟩
             | ⟨sentencia_continuar⟩
```

---

## 3. Declaración de Variables

```bnf
⟨declaracion⟩ →
    'declarar' IDENTIFICADOR 'como' ⟨tipo⟩ [ ':=' ⟨expresion⟩ ] ';'

⟨declaracion_constante⟩ →
    'declarar' 'CONSTANTE' IDENTIFICADOR 'como' ⟨tipo⟩ ':=' ⟨expresion⟩ ';'

⟨tipo⟩ → 'ENTERO' | 'DECIMAL' | 'BOOLEANO' | 'TEXTO'
```

**Ejemplos de sentencias válidas:**
```
declarar temp_actual como DECIMAL;
declarar ciclos como ENTERO := 0;
declarar CONSTANTE UMBRAL_CRITICO como DECIMAL := 55.0;
declarar mensaje como TEXTO := "Sistema listo";
```

**Ejemplos de sentencias inválidas:**
```
declarar 1_variable como ENTERO;           # ERROR: identificador inicia con dígito
declarar x como REAL;                      # ERROR: tipo 'REAL' no existe en ECO-L
CONSTANTE Y como DECIMAL := 10.0;          # ERROR: falta la palabra 'declarar'
```

---

## 4. Asignación

```bnf
⟨asignacion⟩ → IDENTIFICADOR ':=' ⟨expresion⟩ ';'
```

> La variable debe haber sido declarada previamente. No se permite la asignación de una constante (`TK_CONSTANTE`) después de su declaración inicial.

**Ejemplos:**
```
temp_actual := leer_temperatura(3);
excedente_kw := generacion_total - demanda_total;
sector_desviado := VERDADERO;
```

---

## 5. Expresiones

La jerarquía de expresiones respeta la precedencia de operadores definida en la sección de léxico:

```bnf
⟨expresion⟩ → ⟨expresion_logica⟩

⟨expresion_logica⟩ →
    ⟨expresion_comparacion⟩
    { ( 'Y' | 'O' ) ⟨expresion_comparacion⟩ }

⟨expresion_comparacion⟩ →
    ⟨expresion_aritmetica⟩
    [ ⟨op_relacional⟩ ⟨expresion_aritmetica⟩ ]

⟨expresion_aritmetica⟩ →
    ⟨termino⟩ { ( '+' | '-' ) ⟨termino⟩ }

⟨termino⟩ →
    ⟨factor⟩ { ( '*' | '/' | '%' ) ⟨factor⟩ }

⟨factor⟩ →
      LIT_ENTERO
    | LIT_DECIMAL
    | LIT_BOOLEANO
    | LIT_TEXTO
    | IDENTIFICADOR
    | ⟨llamada_primitiva⟩
    | '(' ⟨expresion⟩ ')'
    | 'NO' ⟨factor⟩
    | '-' ⟨factor⟩

⟨op_relacional⟩ →
    '>' | '<' | '>=' | '<=' | '==' | '!='
```

---

## 6. Llamada a Primitiva

```bnf
⟨llamada_primitiva⟩ →
    IDENTIFICADOR_PRIMITIVA '(' [ ⟨lista_argumentos⟩ ] ')'

⟨lista_argumentos⟩ →
    ⟨expresion⟩ { ',' ⟨expresion⟩ }
```

**Ejemplos:**
```
leer_temperatura(3)
estado_carga(BATERIA_PRINCIPAL)
conmutar_linea(SECTOR_INDUSTRIAL, FALSO)
emitir_alerta(4, "Fuga térmica crítica")
inyectar_excedente(excedente_kw)
```

---

## 7. Estructura Condicional

```bnf
⟨condicional⟩ →
    'si' ⟨expresion⟩ 'entonces'
        ⟨secuencia_sentencias⟩
    { 'sino_si' ⟨expresion⟩ 'entonces'
        ⟨secuencia_sentencias⟩ }
    [ 'sino'
        ⟨secuencia_sentencias⟩ ]
    'fin_si'
```

**Ejemplo con todas las ramas:**
```
si temp_actual > 55.0 entonces
    activar_refrigeracion(3);
    emitir_alerta(3, "Temperatura crítica");
sino_si temp_actual > 45.0 entonces
    emitir_alerta(2, "Temperatura elevada");
sino
    mostrar_panel("Temperatura normal");
fin_si
```

---

## 8. Bucle Mientras

```bnf
⟨bucle_mientras⟩ →
    'mientras' ⟨expresion⟩ 'ejecutar'
        ⟨secuencia_sentencias⟩
    'fin_mientras'
```

**Ejemplo:**
```
mientras sistema_activo ejecutar
    temp_actual := leer_temperatura(BATERIA_OBJETIVO);
    si temp_actual > UMBRAL_CRITICO entonces
        activar_refrigeracion(BATERIA_OBJETIVO);
    fin_si
fin_mientras
```

---

## 9. Bucle Para

```bnf
⟨bucle_para⟩ →
    'para' IDENTIFICADOR 'desde' ⟨expresion⟩ 'hasta' ⟨expresion⟩ 'ejecutar'
        ⟨secuencia_sentencias⟩
    'fin_para'
```

> El identificador del contador se comporta como una variable `ENTERO` de solo lectura dentro del cuerpo del bucle. No puede ser reasignado.

**Ejemplo:**
```
para i desde 1 hasta 8 ejecutar
    declarar t como DECIMAL := leer_temperatura(i);
    si t > 55.0 entonces
        emitir_alerta(4, "Fuga térmica detectada");
    fin_si
fin_para
```

---

## 10. Bucle Repetir-Hasta_Que

```bnf
⟨bucle_repetir⟩ →
    'repetir'
        ⟨secuencia_sentencias⟩
    'hasta_que' ⟨expresion⟩ ';'
```

> El cuerpo se ejecuta **al menos una vez** antes de evaluar la condición de salida.

**Ejemplo:**
```
repetir
    temp_actual := leer_temperatura(3);
    mostrar_panel("Esperando estabilización...");
hasta_que temp_actual < 40.0;
```

---

## 11. Sentencias de Control de Bucle

```bnf
⟨sentencia_romper⟩    → 'romper' ';'
⟨sentencia_continuar⟩ → 'continuar' ';'
```

> Ambas sentencias solo son válidas **dentro** de un cuerpo de bucle (`mientras`, `para` o `repetir`). Su uso fuera de un bucle produce un error sintáctico.

---

## 12. Demostración de Derivación Formal

Para demostrar que la gramática es **no ambigua**, se presenta la derivación por la izquierda de la sentencia:

```
si temp_actual > 55.0 entonces activar_refrigeracion(3); fin_si
```

**Derivación:**
```
⟨sentencia⟩
  ⇒ ⟨condicional⟩
  ⇒ 'si' ⟨expresion⟩ 'entonces' ⟨secuencia_sentencias⟩ 'fin_si'
  ⇒ 'si' ⟨expresion_logica⟩ 'entonces' ⟨secuencia_sentencias⟩ 'fin_si'
  ⇒ 'si' ⟨expresion_comparacion⟩ 'entonces' ⟨secuencia_sentencias⟩ 'fin_si'
  ⇒ 'si' ⟨expr_aritmetica⟩ '>' ⟨expr_aritmetica⟩ 'entonces' ⟨secuencia_sentencias⟩ 'fin_si'
  ⇒ 'si' ⟨termino⟩ '>' ⟨termino⟩ 'entonces' ⟨secuencia_sentencias⟩ 'fin_si'
  ⇒ 'si' ⟨factor⟩ '>' ⟨factor⟩ 'entonces' ⟨secuencia_sentencias⟩ 'fin_si'
  ⇒ 'si' IDENTIFICADOR("temp_actual") '>' LIT_DECIMAL(55.0)
         'entonces' ⟨secuencia_sentencias⟩ 'fin_si'
  ⇒ 'si' IDENTIFICADOR("temp_actual") '>' LIT_DECIMAL(55.0)
         'entonces' ⟨sentencia⟩ 'fin_si'
  ⇒ 'si' IDENTIFICADOR("temp_actual") '>' LIT_DECIMAL(55.0)
         'entonces' ⟨llamada_primitiva⟩ ';' 'fin_si'
  ⇒ 'si' IDENTIFICADOR("temp_actual") '>' LIT_DECIMAL(55.0)
         'entonces'
             PRIMITIVA("activar_refrigeracion") '(' LIT_ENTERO(3) ')' ';'
         'fin_si'
```

---

## 13. Árbol de Análisis Sintáctico — Ejemplo

Árbol generado para la sentencia del ejemplo anterior:

```
⟨sentencia⟩
└── ⟨condicional⟩
    ├── 'si'
    ├── ⟨expresion⟩
    │   └── ⟨expresion_comparacion⟩
    │       ├── ⟨expresion_aritmetica⟩
    │       │   └── ⟨termino⟩
    │       │       └── ⟨factor⟩
    │       │           └── IDENTIFICADOR("temp_actual")
    │       ├── '>'
    │       └── ⟨expresion_aritmetica⟩
    │           └── ⟨termino⟩
    │               └── ⟨factor⟩
    │                   └── LIT_DECIMAL(55.0)
    ├── 'entonces'
    ├── ⟨secuencia_sentencias⟩
    │   └── ⟨sentencia⟩
    │       └── ⟨llamada_primitiva⟩
    │           ├── PRIMITIVA("activar_refrigeracion")
    │           ├── '('
    │           ├── ⟨lista_argumentos⟩
    │           │   └── ⟨expresion⟩
    │           │       └── LIT_ENTERO(3)
    │           └── ')'
    └── 'fin_si'
```

---

## 14. Diagrama de Flujo de la Estructura General

```
┌──────────────────────────────────────────┐
│           PROGRAMA ECO-L                 │
├──────────────────────────────────────────┤
│  { @directiva; }                         │
│  init_grid;                              │
│                                          │
│  { declaracion  }                        │
│  { asignacion   }                        │
│  { condicional  }  ←──────────────┐      │
│  { bucle        }  ←── iteración  │      │
│  { primitiva    }                 │      │
│         └─────────────────────────┘      │
│                                          │
│  apagar_grid;                            │
└──────────────────────────────────────────┘
```

---

*Sección anterior: [← Palabras Clave](02_palabras_clave.md) | Siguiente sección: [Tabla de Tokens →](04_tabla_tokens.md)*

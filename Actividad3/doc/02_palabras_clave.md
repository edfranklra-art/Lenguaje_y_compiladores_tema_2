# Palabras Clave y Primitivas — ECO-L

> Las palabras clave son **identificadores reservados** por el lenguaje. Ningún programa puede usarlas como nombre de variable o constante. El analizador léxico las identifica antes que cualquier otro token de tipo `IDENTIFICADOR`.

---

## 1. Palabras Clave de Control de Flujo

Controlan la ejecución secuencial, condicional e iterativa del programa.

### 1.1 Estructura Condicional

| Palabra Clave | Código Token  | Función                                            |
| `si`          | `TK_SI`       | Inicio de bloque condicional                       |
| `entonces`    | `TK_ENTONCES` | Separador entre la condición y el bloque verdadero |
| `sino`        | `TK_SINO`     | Bloque alternativo cuando la condición es falsa    |
| `sino_si`     | `TK_SINO_SI`  | Condición adicional encadenada (else-if)           |
| `fin_si`      | `TK_FIN_SI`   | Cierre explícito del bloque condicional            |

**Estructura básica:**
```
si <condición> entonces
    <sentencias>
sino_si <condición_2> entonces
    <sentencias>
sino
    <sentencias>
fin_si
```

---

### 1.2 Bucle Mientras (While)

| Palabra Clave  | Código Token      | Función                                      |
| `mientras`     | `TK_MIENTRAS`     | Inicio del bucle condicional                 |
| `ejecutar`     | `TK_EJECUTAR`     | Separador entre condición y cuerpo del bucle |
| `fin_mientras` | `TK_FIN_MIENTRAS` | Cierre del bucle mientras                    |

**Estructura básica:**
```
mientras <condición> ejecutar
    <sentencias>
fin_mientras
```

---

### 1.3 Bucle Para (For)

| Palabra Clave | Código Token | Función                               |
| `para`        | `TK_PARA`    | Inicio del bucle con contador         |
| `desde`       | `TK_DESDE`   | Valor inicial del contador            |
| `hasta`       | `TK_HASTA`   | Valor final del contador (inclusivo)  |
| `fin_para`    | `TK_FIN_PARA`| Cierre del bucle para                 |

**Estructura básica:**
```
para <variable> desde <inicio> hasta <fin> ejecutar
    <sentencias>
fin_para
```

---

### 1.4 Bucle Repetir-Hasta_Que (Do-While)

| Palabra Clave | Código Token   | Función                                     |
| `repetir`     | `TK_REPETIR`   | Inicio del bucle (ejecuta al menos una vez) |
| `hasta_que`   | `TK_HASTA_QUE` | Condición de salida del bucle               |

**Estructura básica:**
```
repetir
    <sentencias>
hasta_que <condición>;
```

---

### 1.5 Control de Bucle

| Palabra Clave | Código Token   | Función                                  |
| `romper`      | `TK_ROMPER`    | Sale inmediatamente del bucle actual     |
| `continuar`   | `TK_CONTINUAR` | Salta a la siguiente iteración del bucle |

---

## 2. Palabras Clave de Declaración y Tipos

Usadas para definir variables y constantes con tipo explícito.

| Palabra Clave | Código Token      | Función                                  |
| `declarar`    | `TK_DECLARAR`     | Inicio de la declaración de una variable |
| `como`        | `TK_COMO`         | Separador entre identificador y tipo     |
| `CONSTANTE`   | `TK_CONSTANTE`    | Modificador de inmutabilidad             |
| `ENTERO`      | `TK_TIPO_ENTERO`  | Tipo numérico entero (sin decimales)     |
| `DECIMAL`     | `TK_TIPO_DECIMAL` | Tipo numérico de punto flotante          |
| `BOOLEANO`    | `TK_TIPO_BOOLEANO`| Tipo lógico                              |
| `TEXTO`       | `TK_TIPO_TEXTO`   | Tipo cadena de caracteres                |
| `VERDADERO`   | `TK_VERDADERO`    | Literal booleano verdadero               |
| `FALSO`       | `TK_FALSO`        | Literal booleano falso                   |

**Sintaxis de declaración:**
```
declarar <identificador> como <tipo> [ := <valor_inicial> ] ;
declarar CONSTANTE <identificador> como <tipo> := <valor> ;
```

**Ejemplos:**
```
declarar temp_actual como DECIMAL;
declarar ciclos_criticos como ENTERO := 0;
declarar alerta_emitida como BOOLEANO := FALSO;
declarar CONSTANTE UMBRAL_CRITICO como DECIMAL := 55.0;
declarar mensaje como TEXTO := "Sistema listo";
```

---

## 3. Primitivas de Dispositivos ECO-GRID

Las primitivas son **funciones intrínsecas** del lenguaje que se comunican directamente con el driver de bajo nivel del hardware. No son definidas por el operador; están incorporadas en el lenguaje.

### 3.1 Inicialización y Apagado del Sistema

| Primitiva     | Parámetros | Retorno    | Descripción                                                                              |
| `init_grid`   | —          | `BOOLEANO` | Inicializa todos los subsistemas de ECO-GRID. **Obligatorio** al inicio de todo programa |
| `apagar_grid` | —          | `BOOLEANO` | Ejecuta la secuencia de apagado seguro. **Obligatorio** al cierre de todo programa       |

> **Regla de seguridad:** Todo programa ECO-L válido **debe** comenzar con `init_grid;` y terminar con `apagar_grid;`. Omitir cualquiera de estas primitivas produce un error de análisis.

---

### 3.2 Lectura de Sensores

Estas primitivas consultan el estado actual de los sensores físicos del sistema.

| Primitiva          | Parámetros            | Retorno   | Descripción                                                              |
| `leer_temperatura` | `bateria_id : ENTERO` | `DECIMAL` | Lee la temperatura en °C del sensor térmico de celda del banco  
                                                           especificado                                                             |
| `estado_carga`     | `bateria_id : ENTERO` | `DECIMAL` | Devuelve el porcentaje de carga (0.0 – 100.0) del banco de baterías      |
| `leer_flujo`       | `sensor_id : ENTERO`  | `DECIMAL` | Lee el flujo eléctrico actual en kW del inversor especificado            |
| `leer_generacion`  | `fuente_id : ENTERO`  | `DECIMAL` | Devuelve la generación actual en kW de un arreglo solar o turbina eólica |
| `leer_demanda`     | `sector_id : ENTERO`  | `DECIMAL` | Lee la demanda energética actual en kW de un sector de consumo           |
| `obtener_hora`     | —                     | `ENTERO`  | Devuelve la hora actual del sistema (0–23) en formato 24 h               |
| `leer_irradiancia` | `panel_id : ENTERO`   | `DECIMAL` | Lee la irradiancia solar incidente en W/m² sobre un arreglo de paneles   |
  
**Ejemplos de uso:**
```
declarar temp como DECIMAL := leer_temperatura(3);
declarar carga como DECIMAL := estado_carga(1);
declarar hora como ENTERO := obtener_hora();
```

---

### 3.3 Actuadores y Conmutadores

Estas primitivas ejecutan acciones físicas sobre el hardware del sistema.

| Primitiva                   | Parámetros                                | Retorno    | Descripción                                 |
| `conmutar_linea`            | `sector_id : ENTERO`, `estado : BOOLEANO` | `BOOLEANO` | Activa (`VERDADERO`) o desactiva
                                                                                         (`FALSO`) el relé de alta potencia de un   sector                                      |
| `activar_refrigeracion`     | `bateria_id : ENTERO`                     | `BOOLEANO` | Enciende el sistema de refrigeración
                                                                                         auxiliar del banco de baterías              |
| `desactivar_refrigeracion`  | `bateria_id : ENTERO`                     | `BOOLEANO` | Apaga el sistema de refrigeración  
                                                                                         auxiliar                                    |
| `conectar_red_comercial`    | `sector_id : ENTERO`                      | `BOOLEANO` | Conmuta un sector hacia la red eléctrica 
                                                                                         comercial principal                         |
| `desconectar_red_comercial` | `sector_id : ENTERO`                      | `BOOLEANO` | Desconecta un sector de la red comercial 
                                                                                         principal                                   |
| `conectar_carga_solar`      | `panel_id : ENTERO`                       | `BOOLEANO` | Habilita el flujo de carga desde un arreglo 
                                                                                        de paneles solares                           |
| `desconectar_carga_solar`   | `panel_id : ENTERO`                       | `BOOLEANO` | Detiene el ingreso de carga desde un arreglo
                                                                                         solar                                       |
| `inyectar_excedente`        | `cantidad_kw : DECIMAL`                   | `BOOLEANO` | Inyecta excedente energético hacia la red 
                                                                                         eléctrica pública general                   |

**Ejemplos de uso:**
```
conmutar_linea(5, FALSO);          # Aislar sector 5
activar_refrigeracion(3);           # Encender refrigeración de batería 3
conectar_red_comercial(5);          # Desviar sector 5 a red comercial
inyectar_excedente(15.5);           # Vender 15.5 kW a la red pública
```

---

### 3.4 Alertas, Panel y Registro

Estas primitivas gestionan la comunicación con el operador y el sistema SCADA.

| Primitiva          | Parámetros                          | Retorno    | Descripción                                             |
| `emitir_alerta`    | `nivel : ENTERO`, `mensaje : TEXTO` | `BOOLEANO` | Envía una alerta clasificada al sistema HMI             |
| `registrar_evento` | `mensaje : TEXTO`                   | `BOOLEANO` | Escribe una entrada en el log de auditoría del sistema 
                                                                          SCADA                                                   |
| `mostrar_panel`    | `mensaje : TEXTO`                   | `BOOLEANO` | Muestra un mensaje informativo en el panel del operador |

**Niveles de alerta para `emitir_alerta`:**

| Nivel | Constante semántica | Color en HMI | Uso                                           |
| `1`   | INFO                | 🟢 Verde     | Información de estado, operación normal      |
| `2`   | ADVERTENCIA         | 🟡 Amarillo  | Situación que requiere atención              |
| `3`   | CRÍTICO             | 🟠 Naranja   | Condición fuera de rango, acción requerida   |
| `4`   | EMERGENCIA          | 🔴 Rojo      | Fallo grave, intervención manual obligatoria |

**Ejemplos de uso:**
```
emitir_alerta(3, "Temperatura crítica en batería B-03");
emitir_alerta(1, "Excedente inyectado a la red pública correctamente");
registrar_evento("Sector industrial desviado a red comercial");
mostrar_panel("Sistema operando en modo de emergencia nocturno");
```

---

## 4. Directivas del Sistema

Las directivas se declaran al inicio del programa, antes de `init_grid`. Configuran el comportamiento global del intérprete.

| Directiva        | Parámetro     | Descripción                                                         |
| `@modo_seguro`   | —             | Activa la validación de estado del actuador antes de cada operación |
| `@intervalo(ms)` | `ms : ENTERO` | Define el intervalo de muestreo del bucle principal en milisegundos |
| `@timeout(s)`    | `s : ENTERO`  | Define el tiempo máximo de ejecución del programa en segundos       |

**Ejemplo de cabecera de programa:**
```
@modo_seguro;
@intervalo(3000);
@timeout(600);

init_grid;
...
apagar_grid;
```

---

## 5. Resumen — Total de Palabras Reservadas

| Categoría                | Cantidad | Palabras                                                                                 |
| Control de flujo         | 14       | `si`, `entonces`, `sino`, `sino_si`, `fin_si`, `mientras`, `ejecutar`, `fin_mientras`, 
                                        `para`, `desde`, `hasta`, `fin_para`, `repetir`, `hasta_que`                             |
| Control de bucle         | 2        | `romper`, `continuar`                                                                    |
| Declaración y tipos      | 9        | `declarar`, `como`, `CONSTANTE`, `ENTERO`, `DECIMAL`, `BOOLEANO`, `TEXTO`, `VERDADERO`, 
                                        `FALSO`                                                                                  |
| Operadores lógicos       | 3        | `Y`, `O`, `NO`                                                                           |
| **Total**                | **28**   |                                                                                          |

| Categoría                          | Cantidad |
| Primitivas de dispositivo ECO-GRID | 18       | 
| Directivas del sistema             | 3        |

---

*Sección anterior: [← Alfabeto y Léxico](01_alfabeto_lexico.md) | Siguiente sección: [Gramática →](03_gramatica.md)*

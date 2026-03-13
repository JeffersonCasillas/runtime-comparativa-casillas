# Comparativa de Runtimes: Node.js vs Deno vs Bun

## 1. Tabla Comparativa

| Criterio | Node.js | Deno | Bun |
| :--- | :--- | :--- | :--- |
| **Tiempo de ejecución (ms)** | 1.23 ms | 1.67 ms | 11.38 ms |
| **Líneas de código** | 60 | 58 | 60 |
| **Requiere `package.json`** | Sí | No | Sí |
| **TypeScript nativo** | No (Requiere transpilar) | Sí | Sí |
| **Permisos explícitos** | No | Sí (`--allow-read`, `--allow-write`) | No |
| **Dificultad de configuración (1–10)** | 3 | 2 | 5 |
| **Syntax destacada** | `fs.readFileSync` | `Deno.readTextFile` (Top-level await) | `Bun.file().text()` |
| **¿Lo usarías en producción?** | Sí, ecosistema maduro y confiable. | Sí, por seguridad nativa y TS listo para usar. | Para APIs de alto tráfico, aunque aún es joven. |

---

## 2. Reflexión Final

### Pregunta 1: ¿Cuál runtime fue más fácil de configurar y por qué?
**Respuesta:** Deno fue, sin duda, el más fácil. Al no requerir un `package.json` inicial ni la carpeta `node_modules`, la configuración es limpia y directa. Además, el soporte de TypeScript funciona "fuera de la caja", lo que elimina la necesidad de configurar compiladores adicionales. Simplemente instalas el runtime, escribes tu archivo `.ts` y lo ejecutas.

### Pregunta 2: ¿Qué diferencia de rendimiento encontraste y te sorprendió?
**Respuesta:** Me sorprendió notar que, a pesar de la fama de velocidad de Bun, en esta prueba específica de lectura de un archivo CSV local y cálculos simples, Node.js (1.23 ms) y Deno (1.67 ms) superaron a Bun (11.38 ms). Esto se debe probablemente al tiempo de "cold start" (arranque en frío) de Bun, que tiene más peso en scripts de ejecución corta. Para 1000 registros, la diferencia de milisegundos no es crítica, pero con 100,000 registros, el rendimiento de I/O puro o los cálculos iterativos podrían mostrar ventajas diferentes según las optimizaciones de cada motor.

### Pregunta 3: Si mañana empiezas un proyecto nuevo, ¿cuál runtime eliges y por qué?
**Respuesta:** Si se trata de un proyecto corporativo o que requiere librerías muy específicas, seguiría con **Node.js** debido a su inmensa madurez y soporte LTS garantizado. Sin embargo, para un proyecto nuevo donde priorice la seguridad, la simplicidad del código y quiera usar TypeScript desde el primer minuto sin dolores de cabeza con configuraciones, elegiría **Deno**. Ofrece un entorno muy moderno y una arquitectura segura por defecto.
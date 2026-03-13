const inicioTiempo = performance.now();

// Leer archivo CSV usando la API nativa de Bun
const archivoEntrada = Bun.file('../data/estudiantes.csv');
const contenidoCsv = await archivoEntrada.text();
const lineasArchivo = contenidoCsv.trim().split('\n');

const estudiantesTotales = lineasArchivo.length - 1; // Descontar cabecera
let aprobadosTotales = 0;
let reprobadosTotales = 0;
const listaResultados = [];

// Parsear CSV línea por línea
for (let i = 1; i < lineasArchivo.length; i++) {
    const columnas = lineasArchivo[i].split(',');
    const nombreEstudiante = columnas[0];
    const nota1 = parseFloat(columnas[1]);
    const nota2 = parseFloat(columnas[2]);
    const nota3 = parseFloat(columnas[3]);

    const promedioFinal = parseFloat(((nota1 + nota2 + nota3) / 3).toFixed(2));
    const estadoFinal = promedioFinal >= 7.0 ? 'Aprobado' : 'Reprobado';

    if (estadoFinal === 'Aprobado') {
        aprobadosTotales++;
    } else {
        reprobadosTotales++;
    }

    listaResultados.push({
        nombre: nombreEstudiante,
        nota1: nota1,
        nota2: nota2,
        nota3: nota3,
        promedio: promedioFinal,
        estado: estadoFinal
    });
}

const finTiempo = performance.now();
const tiempoTotalMs = parseFloat((finTiempo - inicioTiempo).toFixed(2));

// Generar objeto JSON
const objetoSalida = {
    runtime: "bun",
    tiempoMs: tiempoTotalMs,
    totalEstudiantes: estudiantesTotales,
    aprobados: aprobadosTotales,
    reprobados: reprobadosTotales,
    resultados: listaResultados
};

// Escribir archivo de salida usando la API nativa de Bun
await Bun.write('../output/resultado-bun.json', JSON.stringify(objetoSalida, null, 2));

console.log(`Tiempo total: ${tiempoTotalMs} ms`);
console.log(`Total aprobados: ${aprobadosTotales}`);
console.log(`Total reprobados: ${reprobadosTotales}`);

export {};
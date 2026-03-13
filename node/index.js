const sistemaArchivos = require('fs');

const inicioTiempo = performance.now();

// Leer archivo CSV
const contenidoCsv = sistemaArchivos.readFileSync('../data/estudiantes.csv', 'utf-8');
const lineasArchivo = contenidoCsv.trim().split('\n');

const estudiantesTotales = lineasArchivo.length - 1; // Descontar cabecera
let aprobadosTotales = 0;
let reprobadosTotales = 0;
const listaResultados = [];

// Parsear CSV línea por línea y calcular
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
    runtime: "node",
    tiempoMs: tiempoTotalMs,
    totalEstudiantes: estudiantesTotales,
    aprobados: aprobadosTotales,
    reprobados: reprobadosTotales,
    resultados: listaResultados
};

// Escribir archivo de salida
sistemaArchivos.writeFileSync('../output/resultado-node.json', JSON.stringify(objetoSalida, null, 2));

// Imprimir resultados en consola
console.log(`Tiempo total: ${tiempoTotalMs} ms`);
console.log(`Total aprobados: ${aprobadosTotales}`);
console.log(`Total reprobados: ${reprobadosTotales}`);
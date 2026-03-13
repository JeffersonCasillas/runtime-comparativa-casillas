const sistemaArchivos = require('fs');
const nombres = ['Ana','Luis','Maria','Carlos','Sofia','Pedro', 'Lucia','Diego','Valentina','Andres'];
const apellidos = ['Torres','Mendoza','Vargas','Ruiz','Lopez', 'Garcia','Perez','Sanchez','Gomez','Diaz'];

let archivoCsv = 'nombre,nota1,nota2,nota3\n';

for (let i = 0; i < 1000; i++) {
    const nombre = nombres[i % nombres.length];
    const apellido = apellidos[Math.floor(i / nombres.length) % apellidos.length];
    const nota1 = (Math.random() * 6 + 4).toFixed(1);
    const nota2 = (Math.random() * 6 + 4).toFixed(1);
    const nota3 = (Math.random() * 6 + 4).toFixed(1);
    archivoCsv += `${nombre} ${apellido} ${i+1},${nota1},${nota2},${nota3}\n`;
}

sistemaArchivos.writeFileSync('./data/estudiantes.csv', archivoCsv);
console.log('CSV generado: 1000 estudiantes');
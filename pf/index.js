//Funcion flecha para crear una pregunta
const crearPregunta = (textoPregunta, opciones) => {
    return {
        textoPregunta: textoPregunta,
        opciones: opciones,
        resultados:{}, // Inicia el objeto del resultados vacío
    };
};

//Funcion flecha para que contenga todas las preguntas de la encuesta
const crearEncuesta = (preguntas) => {
    return {
        preguntas: preguntas, // Una lista de todas las preguntas
    };
};

//Funcion para agregar un voto o una pregunta en la encuesta
function agregarVoto(pregunta, opcionSeleccionada) {
    if (pregunta.opciones.includes(opcionSeleccionada)) {
        if(pregunta.resultados[opcionSeleccionada]) {
            pregunta.resultados[opcionSeleccionada]++;
        } else {
            pregunta.resultados[opcionSeleccionada] = 1;
        }
    } else {
        console.log('La opción seleccionada no es válida');
    }
}

//Funcion para mostrar los resultados de una pregunta
function mostrarResultados(pregunta) {
    console.log(`Resultados para la pregunta: '${pregunta.textoPregunta}':`);
    for(let opcion of pregunta.opciones) {
        console.log(
            `Opcion '${opcion}': ${pregunta.resultados[opcion] | 0}`
        );
    }
}

//Funcion para que un usuario pueda votar en una pregunta
function votar(pregunta) {
    const opcionSeleccionada = prompt(
        `Pregunta: ${
            pregunta.textoPregunta
        }Seleccione una opción (${pregunta.opciones.join(', ')}):
        `
    );

    if (opcionSeleccionada !== null) {
        agregarVoto(pregunta, opcionSeleccionada.trim());
    } else {
        console.log('Votación cancelada');
    }
}

//Funcion para poder ejecutar la encuesta
function ejecutarPrograma() {
    const numeroDePreguntas = parseInt(
        prompt('¿Cuántas preguntas desea realizar?')
    );
    const preguntas = [];

    for (let i = 0; i < numeroDePreguntas; i++) {
        const textoPregunta = prompt (`Ingrese la pregunta ${i + 1}:`);
        const opciones = prompt(
            `Ingrese las opciones para la pregunta ${i + 1} separadas por coma (,):`
        )
        .split(',')
        .map((opcion) => opcion.trim());
        const pregunta = crearPregunta(textoPregunta, opciones);
        preguntas.push(pregunta);
    }

const encuesta = crearEncuesta(preguntas);

let seguirVotando = true;
while (seguirVotando) {
    for (let i = 0; i < numeroDePreguntas; i++) {
        votar(encuesta.preguntas[i]);
    }
    seguirVotando = confirm('¿Desea seguir votando?');
}

//Mostrar los resultados finales
console.log('Resultados finales de la encuesta:');
encuesta.preguntas.forEach(mostrarResultados);

}

//Llamar a la funcion ejecutar programa
ejecutarPrograma();

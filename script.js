let guardar_click = []; // Array global para armazenar os cliques do jogador
let guardar_notas = []; // Array global para armazenar as notas aleatórias geradas

function Start() {
    guardar_notas = []; // Limpa a array de notas antes de começar um novo jogo
    guardar_click = []; // Limpa os cliques anteriores
    const blocos_aleatorios = Math.floor(Math.random() * 6) + 1; // Define a quantidade de blocos aleatórios que vão tocar

    for (var i = 0; i < blocos_aleatorios; i++) { // Loop para repetir o código para cada bloco aleatório
        setTimeout(() => {
            const notas_aleatorias = Math.floor(Math.random() * 4) + 1; // Escolhe uma nota aleatória entre 1 e 4

            guardar_notas.push(notas_aleatorias); // Adiciona a nota aleatória à array de notas
            const audio = document.getElementById(`audio${notas_aleatorias}`); // Pega o elemento de áudio correspondente à nota

            audio.currentTime = 0; // Reinicia o áudio para tocar do início
            audio.play(); // Toca o áudio

            const block = document.getElementById(`block${notas_aleatorias}`); // Pega o bloco correspondente à nota
            block.classList.add('grow'); // Adiciona a classe 'grow' para animar o bloco

            setTimeout(() => {
                block.classList.remove('grow'); // Remove a animação após 300ms
            }, 300); 
        }, i * 1000); // Espera 1 segundo entre cada bloco
    }
} 

function Click_Block(blockId) {
    const audioNumber = blockId.replace('audio', ''); // Extrai o número da nota a partir do ID do áudio
    const audio = document.getElementById(blockId); // Pega o elemento de áudio correspondente
    audio.currentTime = 0; // Reinicia o áudio
    audio.play(); // Toca o áudio
    guardar_click.push(Number(audioNumber)); // Armazena o número como um inteiro
    console.log("Cliks guardados:", guardar_click); // Verifica os cliques armazenados
}

function Confirm() {
    console.log("Notas guardadas:", guardar_notas); // Verifica as notas armazenadas
    console.log("Cliks guardados:", guardar_click); // Verifica os cliques armazenados
    if (guardar_click.length === 0 || guardar_notas.length === 0) { // Impede o jogador de clicar em confirmar antes de começar
        alert("Antes inicie o jogo!");
        return; 
    }

    // Compara as notas guardadas com os cliques do jogador
    if (Comparar_Array(guardar_click, guardar_notas)) {
        alert("Você venceu!"); // Alerta de vitória
        guardar_click = [];  // Limpa a array de cliques após uma vitória
        guardar_notas = [];  // Limpa a array de notas após uma vitória
    } else {
        alert("Você perdeu!"); // Alerta de derrota
        guardar_click = []; // Limpa a array de cliques após uma perda
        guardar_notas = []; // Limpa a array de notas após uma perda
    }
}

function Comparar_Array(array1, array2) {
    console.log("Comparando arrays:");
    console.log("Array 1:", array1);
    console.log("Array 2:", array2);
    
    // Verifica se os arrays têm o mesmo tamanho
    if (array1.length !== array2.length) return false;
    
    // Compara cada elemento dos arrays
    return array1.every((value, index) => {
        console.log(`Comparando: ${value} === ${array2[index]}`);
        return value === array2[index]; // Retorna verdadeiro se todos os elementos são iguais
    });
}

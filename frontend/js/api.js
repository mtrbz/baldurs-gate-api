async function listarPersonagens() {
    const resposta = await fetch('http://localhost:8080/personagens');

    const personagens = await resposta.json();
    console.log('Resposta:', personagens);
    return personagens;
}

function exibirFichaPersonagem() {
    const resposta = fetch('http://localhost:8080/personagens');

    const personagem = resposta.json();
    return personagem;
}

function criarPersonagem() {
        const personagem = {
            nome: document.querySelector('#campo-nome').value,
            classe: document.querySelector('#campo-classe').value,
            raca: document.querySelector('#campo-raca').value,
            nivel: document.querySelector('#campo-nivel').value,
            dataCriacao: document.querySelector('#campo-data').value,
            forca: estado.atributosCriacao.Força,
            dex: estado.atributosCriacao.Destreza,
            con: estado.atributosCriacao.Constituição,
            inte: estado.atributosCriacao.Inteligência,
            sab: estado.atributosCriacao.Sabedoria,
            car: estado.atributosCriacao.Carisma
        };

        const resposta = fetch('http://localhost:8080/personagens', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(personagem)
        });

        console.log('Status:', resposta.status);

        const dados = resposta.json();
        console.log('Resposta:', dados);
}


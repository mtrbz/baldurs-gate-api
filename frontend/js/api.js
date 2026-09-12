async function listarPersonagens() {
    console.trace('LISTAR PERSONAGENS FOI CHAMADO');

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

async function criarPersonagem() {

    const personagem = {

        nome: document.querySelector('#campo-nome').value,

        classe: document.querySelector('#campo-classe').value,

        raca: document.querySelector('#campo-raca').value,

        nivel: Number(document.querySelector('#campo-nivel').value),

        dataCriacao: document.querySelector('#campo-data').value,

        forca: estado.atributosCriacao.Força,

        dex: estado.atributosCriacao.Destreza,

        con: estado.atributosCriacao.Constituição,

        inte: estado.atributosCriacao.Inteligência,

        sab: estado.atributosCriacao.Sabedoria,

        car: estado.atributosCriacao.Carisma

    };

    try {

        const resposta = await fetch('http://localhost:8080/personagens', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(personagem)

        });

        if (!resposta.ok) {
            throw new Error(
                `Erro ao criar personagem: ${resposta.status}`
            );
        }

        const dados = await resposta.json();
        console.log('Personagem criado:', dados);
        const idPersonagem = dados.id;

        const companheirosSelecionados = obterCompanheirosSelecionados();

        console.log('Companheiros selecionados:', companheirosSelecionados);

        for (const idCompanheiro of companheirosSelecionados) {

            await adicionarCompanheiro(
                idPersonagem,
                idCompanheiro
            );

        }

        console.log('Party salva com sucesso.');

        mostrarPopup('Personagem criado com sucesso!');

        setTimeout(() => {
            navegarPara('lista');
        }, 1200);

    } catch (erro) {

        console.error(
            'Erro ao criar personagem:',
            erro
        );

        mostrarPopup('Erro ao criar personagem.');
    }
}

async function listarCompanheiros() {

    const resposta = await fetch('http://localhost:8080/personagens/companheiros');

    if (!resposta.ok) {
        throw new Error('Erro ao listar companheiros');
    }

    return await resposta.json();
}

async function listarParty(idPersonagem) {

    const resposta = await fetch(`http://localhost:8080/personagens/${idPersonagem}/party`);

    if (!resposta.ok) {
        throw new Error('Erro ao listar party');
    }

    return await resposta.json();
}

async function adicionarCompanheiro(idPersonagem, idCompanheiro) {

    const resposta = await fetch(`http://localhost:8080/personagens/${idPersonagem}/party`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idCompanheiro: idCompanheiro
            })
        });

    if (!resposta.ok) {
        throw new Error('Erro ao adicionar companheiro');
    }

    return await resposta.json();
}
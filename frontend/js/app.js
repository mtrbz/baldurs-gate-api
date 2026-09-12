/* ============================================
   APP — estado, atributos, party, lista e popup
   ============================================ */

const NOMES_ATRIBUTOS = [
  'Força',
  'Destreza',
  'Constituição',
  'Inteligência',
  'Sabedoria',
  'Carisma'
];

const VALOR_ATRIBUTO_PADRAO = 10;
const VALOR_MINIMO_ATRIBUTO = 1;
const VALOR_MAXIMO_ATRIBUTO = 20;

const estado = {
  atributosCriacao: {
    Força: VALOR_ATRIBUTO_PADRAO,
    Destreza: VALOR_ATRIBUTO_PADRAO,
    Constituição: VALOR_ATRIBUTO_PADRAO,
    Inteligência: VALOR_ATRIBUTO_PADRAO,
    Sabedoria: VALOR_ATRIBUTO_PADRAO,
    Carisma: VALOR_ATRIBUTO_PADRAO,
  },
  companheiros: []
};


/* ---- Editor de atributos ---- */

function renderizarEditorAtributos() {
  const container = document.querySelector('[data-atributos-editor]');
  if (!container) return;

  container.innerHTML = NOMES_ATRIBUTOS.map(
    (nome) => `
      <div class="atributo-editor" data-atributo="${nome}">
        <span class="atributo-editor__nome">${nome}</span>

        <div class="atributo-editor__controles">
          <button
            class="atributo-editor__botao"
            data-atributo-diminuir
            data-atributo-nome="${nome}"
            aria-label="Diminuir ${nome}">
            −
          </button>

          <span
            class="atributo-editor__valor"
            data-atributo-valor>
            ${estado.atributosCriacao[nome]}
          </span>

          <button
            class="atributo-editor__botao"
            data-atributo-aumentar
            data-atributo-nome="${nome}"
            aria-label="Aumentar ${nome}">
            +
          </button>
        </div>
      </div>
    `
  ).join('');
}


function ajustarAtributo(nome, delta) {
  const novoValor =
    estado.atributosCriacao[nome] + delta;

  if (
    novoValor < VALOR_MINIMO_ATRIBUTO ||
    novoValor > VALOR_MAXIMO_ATRIBUTO
  ) {
    return;
  }

  estado.atributosCriacao[nome] = novoValor;

  const editor = document.querySelector(
    `[data-atributos-editor] [data-atributo="${nome}"]`
  );

  if (editor) {
    editor.querySelector(
      '[data-atributo-valor]'
    ).textContent = novoValor;
  }
}


document.addEventListener('click', (evento) => {

  const aumentar =
    evento.target.closest('[data-atributo-aumentar]');

  const diminuir =
    evento.target.closest('[data-atributo-diminuir]');

  const botao = aumentar || diminuir;

  if (!botao) return;

  ajustarAtributo(
    botao.dataset.atributoNome,
    aumentar ? 1 : -1
  );
});


/* ---- Companheiros / Party ---- */

async function carregarCompanheiros() {

  const container =
    document.querySelector('#lista-companheiros');

  if (!container) return;

  try {

    const companheiros =
      await listarCompanheiros();

    estado.companheiros = companheiros;

    container.innerHTML =
      companheiros.map((companheiro) => `
        <label class="companheiro-checkbox">

          <input
            type="checkbox"
            value="${companheiro.id}"
            data-companheiro-checkbox
          >

          <span class="companheiro-checkbox__info">

            <span class="companheiro-checkbox__nome">
              ${companheiro.nome}
            </span>

            <span class="companheiro-checkbox__tipo">
              ${companheiro.classe} · ${companheiro.raca}
            </span>

          </span>

        </label>
      `).join('');

  } catch (erro) {

    console.error(
      'Erro ao carregar companheiros:',
      erro
    );

    container.innerHTML =
      '<p class="lista-estado">Não foi possível carregar os companheiros.</p>';
  }
}


function atualizarLimiteParty() {

  const checkboxes =
    document.querySelectorAll(
      '[data-companheiro-checkbox]'
    );

  const selecionados =
    document.querySelectorAll(
      '[data-companheiro-checkbox]:checked'
    );

  const limiteAtingido =
    selecionados.length >= 3;

  checkboxes.forEach((checkbox) => {

    if (!checkbox.checked) {
      checkbox.disabled = limiteAtingido;

      checkbox
        .closest('.companheiro-checkbox')
        ?.classList.toggle(
          'companheiro-checkbox--desabilitado',
          limiteAtingido
        );
    }

  });
}


document.addEventListener('change', (evento) => {

  if (
    !evento.target.matches(
      '[data-companheiro-checkbox]'
    )
  ) {
    return;
  }

  atualizarLimiteParty();
});


function obterCompanheirosSelecionados() {

  return Array.from(
    document.querySelectorAll(
      '[data-companheiro-checkbox]:checked'
    )
  ).map(
    (checkbox) => Number(checkbox.value)
  );
}


/* ---- Lista de personagens ---- */

async function criarMarkupCardPersonagem(personagem) {

  const nome = personagem.nome || 'Sem nome';
  const classe = personagem.classe || '—';
  const raca = personagem.raca || '—';
  const nivel = personagem.nivel ?? '—';

  const atributos = [
    ['Força', personagem.forca],
    ['Destreza', personagem.dex],
    ['Constituição', personagem.con],
    ['Inteligência', personagem.inte],
    ['Sabedoria', personagem.sab],
    ['Carisma', personagem.car]
  ];

  /*
   * Nome do arquivo da imagem da raça.
   * Exemplo:
   * Drow → img/drow.jpg
   * Meio-Elfo → img/meio-elfo.jpg
   */
  const imagensRaca = {
    'Anão': 'anao.jpg',
    'Drow': 'drow.jpg',
    'Elfo': 'elfo.jpg',
    'Githyanki': 'gith.jpg',
    'Gnomo': 'gnomo.jpg',
    'Halfling': 'halfling.jpg',
    'Humano': 'humano.jpg',
    'Meio-Elfo': 'meio-elfo.jpg',
    'Meio-Orc': 'meio-orc.jpg',
    'Tiefling': 'tiefling.jpg'
  };

  const imagemRaca =
    imagensRaca[raca] || 'humano.jpg';

  let partyMarkup =
    '<span class="party-vazia">Nenhum companheiro</span>';

  try {

    const companheiros =
      await listarParty(personagem.id);

    if (companheiros.length > 0) {

      partyMarkup = companheiros
        .map((companheiro) => {

          const imagensCompanheiros = {
            'Astarion': 'astarion.jpg',
            'Gale': 'gale.jpg',
            'Halsin': 'halsin.jpg',
            'Jaheira': 'jaheira.jpg',
            'Karlach': 'karlach.jpg',
            'Lae\'zel': 'laezel.jpg',
            'Minsc': 'minsc.jpg',
            'Minthara': 'minthara.jpg',
            'Umbralma': 'umbralma.jpg',
            'Wyll': 'wyll.jpg'
          };

          const imagem =
            imagensCompanheiros[companheiro.nome];

          return `
            <span class="party-companheiro">

              <img
                class="party-companheiro__imagem"
                src="img/${imagem || 'humano.jpg'}"
                alt="${companheiro.nome}"
                title="${companheiro.nome}"
              >

              <span>
                ${companheiro.nome}
              </span>

            </span>
          `;

        })
        .join('');

    }

  } catch (erro) {

    console.error(
      `Erro ao carregar party do personagem ${personagem.id}:`,
      erro
    );

  }

  const atributosMarkup =
    atributos
      .map(([nomeAtributo, valor]) => `
        <div class="card-personagem__atributo">

          <span class="card-personagem__atributo-nome">
            ${nomeAtributo}
          </span>

          <span class="card-personagem__atributo-valor">
            ${valor ?? '—'}
          </span>

        </div>
      `)
      .join('');

  return `
    <article class="card-personagem">

      <div class="card-personagem__cabecalho">

        <img
          class="card-personagem__imagem"
          src="img/${imagemRaca}"
          alt="${raca}"
        >

        <div>

          <h3 class="card-personagem__nome">
            ${nome}
          </h3>

          <p class="card-personagem__tipo">
            ${classe} · ${raca}
          </p>

          <p class="card-personagem__nivel">
            nv <strong>${nivel}</strong>
          </p>

        </div>

      </div>


      <div class="card-personagem__atributos">

        ${atributosMarkup}

      </div>


      <div class="card-personagem__party">

        <span class="card-personagem__party-titulo">
          PARTY
        </span>

        <div class="card-personagem__party-lista">
          ${partyMarkup}
        </div>

      </div>

    </article>
  `;
}

async function atualizarListaPersonagens() {

  const container =
    document.querySelector('[data-lista-personagens]');

  const contador =
    document.querySelector('[data-total-personagens]');

  if (!container) return;

  try {

    const personagens =
      await listarPersonagens();

    if (personagens.length) {

      const cards =
        await Promise.all(
          personagens.map(
            criarMarkupCardPersonagem
          )
        );

      container.innerHTML =
        cards.join('');

    } else {

      container.innerHTML =
        '<p class="lista-estado">Nenhum aventureiro registrado ainda.</p>';

    }

    if (contador) {
      contador.textContent =
        personagens.length;
    }

  } catch (erro) {

    console.error(
      'Erro ao listar personagens:',
      erro
    );

    container.innerHTML =
      '<p class="lista-estado">Não foi possível carregar os personagens.</p>';
  }
}


/* ---- Navegação ---- */

function navegarPara(destino) {

  if (destino === 'lista') {
    atualizarListaPersonagens();
  }
}


/* ---- Popup ---- */

let popupTimeoutId = null;

function mostrarPopup(mensagem) {

  const popup =
    document.getElementById('popup-mensagem');

  const texto =
    document.getElementById('popup-mensagem-texto');

  if (!popup || !texto) return;

  texto.textContent = mensagem;

  popup.classList.add(
    'popup-mensagem--visivel'
  );

  clearTimeout(popupTimeoutId);

  popupTimeoutId =
    setTimeout(() => {
      popup.classList.remove(
        'popup-mensagem--visivel'
      );
    }, 2500);
}


/* ---- Inicialização ---- */

document.addEventListener('DOMContentLoaded', () => {

  renderizarEditorAtributos();

  carregarCompanheiros();

  atualizarListaPersonagens();

  document
    .querySelector(
      '[data-acao="criar-personagem"]'
    )
    ?.addEventListener(
      'click',
      criarPersonagem
    );
});
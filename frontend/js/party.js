/* ============================================
   SELEÇÃO DE PARTY (limite de 3 companheiros)
   Reutilizado em: Novo Personagem, tela Party, Alterar Party (ficha).
   Cada contexto tem sua própria chave de estado (array de ids)
   e seu próprio container/contador no DOM.
   ============================================ */

const CONTEXTOS_PARTY = {
  criacao: {
    chaveEstado: 'partySelecionadaCriacao',
    seletorContainer: '[data-companheiros-criacao]',
    seletorContador: '[data-contador-party-criacao]',
  },
  tela: {
    chaveEstado: 'partySelecionadaTela',
    seletorContainer: '[data-companheiros-tela-party]',
    seletorContador: '[data-contador-party-tela]',
  },
  ficha: {
    chaveEstado: 'partySelecionadaFicha',
    seletorContainer: '[data-companheiros-alterar-party]',
    seletorContador: '[data-contador-party-ficha]',
  },
};

function criarMarkupCardCompanheiro(companheiro, contexto, estaSelecionado, estaDesabilitado) {
  const classesExtras = [
    estaSelecionado ? 'selecionado' : '',
    estaDesabilitado ? 'desabilitado' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return `
    <button
      type="button"
      class="card-companheiro ${classesExtras}"
      data-companheiro-id="${companheiro.id}"
      data-contexto-party="${contexto}"
      ${estaDesabilitado ? 'aria-disabled="true"' : ''}
    >
      <div class="placeholder-imagem card-companheiro__retrato">
        <div class="placeholder-imagem__texto">
          ${criarSvgPlaceholderRetrato()}
        </div>
      </div>
      <div class="card-companheiro__corpo">
        <h4 class="card-companheiro__nome">${companheiro.nome}</h4>
        <p class="card-companheiro__classe">${companheiro.classe}</p>
        <p class="card-companheiro__raca">${companheiro.raca}</p>
        <div class="card-companheiro__rodape">
          <span class="card-companheiro__marca">${estaSelecionado ? 'Selecionado' : 'Selecionar'}</span>
          <span class="card-companheiro__indicador">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 13L9 17L19 7" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </button>
  `;
}

function renderizarSelecaoCompanheiros(contexto) {
  const config = CONTEXTOS_PARTY[contexto];
  const container = document.querySelector(config.seletorContainer);
  const contadorEl = document.querySelector(config.seletorContador);
  if (!container) return;

  const selecionados = estado[config.chaveEstado];
  const limiteAtingido = selecionados.length >= LIMITE_PARTY;

  container.innerHTML = COMPANHEIROS_FICTICIOS.map((companheiro) => {
    const estaSelecionado = selecionados.includes(companheiro.id);
    const estaDesabilitado = limiteAtingido && !estaSelecionado;
    return criarMarkupCardCompanheiro(companheiro, contexto, estaSelecionado, estaDesabilitado);
  }).join('');

  if (contadorEl) {
    contadorEl.textContent = selecionados.length;
    contadorEl.classList.toggle('completo', selecionados.length === LIMITE_PARTY);
  }
}

function alternarSelecaoCompanheiro(contexto, idCompanheiro) {
  const config = CONTEXTOS_PARTY[contexto];
  const selecionados = estado[config.chaveEstado];
  const indice = selecionados.indexOf(idCompanheiro);

  if (indice > -1) {
    selecionados.splice(indice, 1);
  } else {
    if (selecionados.length >= LIMITE_PARTY) return;
    selecionados.push(idCompanheiro);
  }

  renderizarSelecaoCompanheiros(contexto);
}

document.addEventListener('click', (evento) => {
  const card = evento.target.closest('[data-contexto-party]');
  if (!card || card.classList.contains('desabilitado')) return;

  alternarSelecaoCompanheiro(card.dataset.contextoParty, card.dataset.companheiroId);
});

/* ---- Tela Party: slots atuais (somente leitura) ---- */

function criarMarkupSlotPartyAtual(nomeCompanheiro) {
  const companheiro = obterCompanheiroPorNome(nomeCompanheiro);
  if (!companheiro) return '';

  return `
    <div class="slot-party">
      <div class="placeholder-imagem slot-party__retrato">
        ${criarSvgPlaceholderRetrato()}
      </div>
      <div class="slot-party__corpo">
        <p class="slot-party__nome">${companheiro.nome}</p>
        <p class="slot-party__classe">${companheiro.classe}</p>
      </div>
    </div>
  `;
}

function criarMarkupSlotPartyVazio() {
  return `<div class="slot-party slot-party--vazio">Nenhum companheiro neste espaço</div>`;
}

function renderizarSlotsPartyAtual(personagem) {
  const container = document.querySelector('[data-party-atual-slots]');
  if (!container) return;

  const slots = [];
  for (let i = 0; i < LIMITE_PARTY; i += 1) {
    slots.push(
      personagem.party[i]
        ? criarMarkupSlotPartyAtual(personagem.party[i])
        : criarMarkupSlotPartyVazio()
    );
  }
  container.innerHTML = slots.join('');
}

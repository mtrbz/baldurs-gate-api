/* ============================================
   RENDERIZAÇÃO — Cards de personagem, listas, ficha
   ============================================ */

function criarSvgPlaceholderRetrato() {
  return `
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="8" r="3.4" stroke="currentColor" stroke-width="1.2" />
      <path d="M5 20C5 15.5 8 13 12 13C16 13 19 15.5 19 20" stroke="currentColor" stroke-width="1.2" />
    </svg>
  `;
}

function criarMarkupCardPersonagem(personagem) {
  return `
    <article class="card-personagem" data-personagem-id="${personagem.id}">
      <div class="placeholder-imagem card-personagem__retrato">
        <div class="placeholder-imagem__texto">
          ${criarSvgPlaceholderRetrato()}
          [ Imagem do personagem ]
        </div>
      </div>
      <div class="card-personagem__corpo">
        <h3 class="card-personagem__nome">${personagem.nome}</h3>
        <p class="card-personagem__tipo">${personagem.classe} • ${personagem.raca}</p>
        <p class="card-personagem__nivel">Nível <strong>${personagem.nivel}</strong></p>
        <div class="card-personagem__acao">
          <button class="btn btn--dourado btn--bloco" data-navegar="ficha">Ver ficha</button>
        </div>
      </div>
    </article>
  `;
}

function renderizarDestaqueHome() {
  const container = document.querySelector('[data-lista-destaque]');
  const totalEl = document.querySelector('[data-total-personagens]');
  if (!container) return;

  const destaque = estado.personagens.slice(0, 3);
  container.innerHTML = destaque.map(criarMarkupCardPersonagem).join('');

  if (totalEl) {
    totalEl.textContent = estado.personagens.length;
  }
}

async function renderizarListaPersonagens() {
    const container = document.querySelector('[data-lista-completa]');
    const vazioEl = document.querySelector('[data-lista-vazia]');

    if (!container) return;

    const personagens = await listarPersonagens();

    estado.personagens = personagens;

    renderizarFiltrosClasse();

    const listaFiltrada = estado.filtroClasseAtivo
        ? estado.personagens.filter(
            (p) => p.classe === estado.filtroClasseAtivo
        )
        : estado.personagens;

    container.innerHTML = listaFiltrada
        .map(criarMarkupCardPersonagem)
        .join('');

    const estaVazio = listaFiltrada.length === 0;

    container.hidden = estaVazio;

    if (vazioEl) {
        vazioEl.hidden = !estaVazio;
    }
}

function renderizarFiltrosClasse() {
  const container = document.querySelector('[data-filtros-classe]');
  if (!container) return;

  const classesPresentes = [...new Set(estado.personagens.map((p) => p.classe))];

  const chipsHtml = [
    `<button class="filtro-chip ${estado.filtroClasseAtivo === '' ? 'ativo' : ''}" data-filtro-classe="">Todas as classes</button>`,
    ...classesPresentes.map(
      (classe) =>
        `<button class="filtro-chip ${estado.filtroClasseAtivo === classe ? 'ativo' : ''}" data-filtro-classe="${classe}">${classe}</button>`
    ),
  ];

  container.innerHTML = chipsHtml.join('');
}

// Delegação de clique para os chips de filtro.
document.addEventListener('click', (evento) => {
  const chip = evento.target.closest('[data-filtro-classe]');
  if (!chip) return;

  estado.filtroClasseAtivo = chip.dataset.filtroClasse;
  renderizarListaPersonagens();
});

/* ---- Ficha do personagem ---- */

function renderizarFichaPersonagem() {
  const personagem = obterPersonagemAtual();
  if (!personagem) return;

  document.querySelector('[data-ficha-nome]').textContent = personagem.nome;
  document.querySelector('[data-ficha-tipo]').textContent = `${personagem.classe} • ${personagem.raca}`;
  document.querySelector('[data-ficha-nivel]').textContent = personagem.nivel;

  const containerAtributos = document.querySelector('[data-ficha-atributos]');
  containerAtributos.innerHTML = NOMES_ATRIBUTOS.map(
    (nome) => `
      <div class="atributo-medalhao">
        <div class="atributo-medalhao__circulo">
          <span class="atributo-medalhao__valor">${personagem.atributos[nome]}</span>
        </div>
        <span class="atributo-medalhao__nome">${nome}</span>
      </div>
    `
  ).join('');

  const containerParty = document.querySelector('[data-ficha-party]');
  if (personagem.party.length === 0) {
    containerParty.innerHTML = `<p style="color: var(--pergaminho-fosco);">Nenhum companheiro selecionado ainda.</p>`;
  } else {
    containerParty.innerHTML = personagem.party
      .map(
        (nomeCompanheiro) => `
          <div class="item-party-ficha">
            <div class="placeholder-imagem item-party-ficha__retrato">
              ${criarSvgPlaceholderRetrato()}
            </div>
            <span class="item-party-ficha__nome">${nomeCompanheiro}</span>
          </div>
        `
      )
      .join('');
  }
}

/* ============================================
   NAVEGAÇÃO ENTRE TELAS
   Puramente visual — troca qual [data-tela] está ativa.
   ============================================ */

function navegarPara(nomeTela, opcoes = {}) {
  const telas = document.querySelectorAll('[data-tela]');
  telas.forEach((tela) => {
    tela.classList.toggle('ativa', tela.dataset.tela === nomeTela);
  });

  atualizarLinkAtivoNav(nomeTela);
  window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });

  // Preparações específicas de cada tela ao ser exibida.
  if (nomeTela === 'lista') {
    renderizarListaPersonagens();
  } else if (nomeTela === 'novo-personagem') {
    prepararTelaNovoPersonagem();
  } else if (nomeTela === 'ficha') {
    if (opcoes.personagemId) {
      estado.personagemAtualId = opcoes.personagemId;
    }
    renderizarFichaPersonagem();
  } else if (nomeTela === 'editar-personagem') {
    prepararTelaEditarPersonagem();
  } else if (nomeTela === 'party') {
    prepararTelaParty();
  } else if (nomeTela === 'alterar-party') {
    prepararTelaAlterarPartyFicha();
  } else if (nomeTela === 'home') {
    renderizarDestaqueHome();
  }
}

function atualizarLinkAtivoNav(nomeTela) {
  const mapaTelaParaLink = {
    home: 'home',
    lista: 'lista',
    party: 'party',
  };
  const linkCorrespondente = mapaTelaParaLink[nomeTela];

  document.querySelectorAll('.nav-topo__link').forEach((link) => {
    link.classList.toggle('ativo', link.dataset.navegar === linkCorrespondente);
  });
}

// Delegação de clique: qualquer elemento com [data-navegar] navega para a tela indicada.
document.addEventListener('click', (evento) => {
  const gatilho = evento.target.closest('[data-navegar]');
  if (!gatilho) return;
  evento.preventDefault();

  const nomeTela = gatilho.dataset.navegar;

  // Ao abrir a ficha a partir de um card, o id do personagem vem no atributo do próprio card.
  const cardPersonagem = gatilho.closest('[data-personagem-id]');
  const opcoes = {};
  if (nomeTela === 'ficha' && cardPersonagem) {
    opcoes.personagemId = cardPersonagem.dataset.personagemId;
  }

  navegarPara(nomeTela, opcoes);
});

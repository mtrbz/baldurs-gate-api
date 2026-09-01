/* ============================================
   MODAL DE CONFIRMAÇÃO E PAINÉIS COLAPSÁVEIS
   ============================================ */

function abrirModal(nomeModal) {
  document.querySelector(`[data-modal="${nomeModal}"]`)?.classList.add('visivel');
}

function fecharModal(nomeModal) {
  document.querySelector(`[data-modal="${nomeModal}"]`)?.classList.remove('visivel');
}

document.addEventListener('click', (evento) => {
  const abrirGatilho = evento.target.closest('[data-abrir-modal]');
  if (abrirGatilho) {
    abrirModal(abrirGatilho.dataset.abrirModal);
    return;
  }

  const fecharGatilho = evento.target.closest('[data-fechar-modal]');
  if (fecharGatilho) {
    fecharModal(fecharGatilho.dataset.fecharModal);
    return;
  }

  // Fecha ao clicar na sobreposição (fora do card do modal).
  if (evento.target.classList.contains('sobreposicao-modal')) {
    evento.target.classList.remove('visivel');
  }
});

document.addEventListener('keydown', (evento) => {
  if (evento.key === 'Escape') {
    document.querySelectorAll('.sobreposicao-modal.visivel').forEach((modal) => {
      modal.classList.remove('visivel');
    });
  }
});

/* ---- Painel "Alterar party" (expansível dentro da tela Party) ---- */

document.addEventListener('click', (evento) => {
  const gatilho = evento.target.closest('[data-toggle-painel]');
  if (!gatilho) return;

  const painel = document.querySelector(`[data-painel="${gatilho.dataset.togglePainel}"]`);
  if (!painel) return;

  const estaVisivel = !painel.hidden;
  painel.hidden = estaVisivel;

  if (!estaVisivel) {
    painel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});

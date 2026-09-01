/* ============================================
   PREPARO DE TELAS E AÇÕES PRINCIPAIS
   ============================================ */

function prepararTelaNovoPersonagem() {
  // Reinicia o formulário e os estados de seleção a cada nova entrada na tela.
  document.getElementById('campo-nome').value = '';
  document.getElementById('campo-classe').value = '';
  document.getElementById('campo-raca').value = '';
  document.getElementById('campo-nivel').value = 1;
  document.getElementById('campo-data').value = '';

  estado.atributosCriacao = {
    Força: VALOR_ATRIBUTO_PADRAO,
    Destreza: VALOR_ATRIBUTO_PADRAO,
    Constituição: VALOR_ATRIBUTO_PADRAO,
    Inteligência: VALOR_ATRIBUTO_PADRAO,
    Sabedoria: VALOR_ATRIBUTO_PADRAO,
    Carisma: VALOR_ATRIBUTO_PADRAO,
  };
  estado.partySelecionadaCriacao = [];

  renderizarEditorAtributos(document.querySelector('[data-atributos-editor]'), 'atributosCriacao');
  renderizarSelecaoCompanheiros('criacao');
}

function prepararTelaEditarPersonagem() {
  const personagem = obterPersonagemAtual();
  if (!personagem) return;

  document.getElementById('editar-nome').value = personagem.nome;
  document.getElementById('editar-classe').value = personagem.classe;
  document.getElementById('editar-raca').value = personagem.raca;
  document.getElementById('editar-nivel').value = personagem.nivel;
  document.getElementById('editar-data').value = personagem.dataCriacao;

  estado.atributosEdicao = { ...personagem.atributos };
  renderizarEditorAtributos(document.querySelector('[data-atributos-editor-edicao]'), 'atributosEdicao');
}

function prepararTelaParty() {
  const personagem = obterPersonagemAtual() || estado.personagens[0];
  if (!personagem) return;

  estado.personagemAtualId = personagem.id;
  document.querySelector('[data-party-personagem-nome]').textContent = personagem.nome;

  renderizarSlotsPartyAtual(personagem);

  // A cada abertura, o painel de alteração começa fechado e sincronizado com a party atual.
  const nomesParaIds = personagem.party
    .map((nome) => obterCompanheiroPorNome(nome)?.id)
    .filter(Boolean);
  estado.partySelecionadaTela = nomesParaIds;

  const painel = document.querySelector('[data-painel="painel-alterar-party"]');
  if (painel) painel.hidden = true;

  renderizarSelecaoCompanheiros('tela');
}

function prepararTelaAlterarPartyFicha() {
  const personagem = obterPersonagemAtual();
  if (!personagem) return;

  document.querySelector('[data-alterar-party-nome]').textContent = personagem.nome;

  const nomesParaIds = personagem.party
    .map((nome) => obterCompanheiroPorNome(nome)?.id)
    .filter(Boolean);
  estado.partySelecionadaFicha = nomesParaIds;

  renderizarSelecaoCompanheiros('ficha');
}

/* ---- Ações que futuramente integrarão com a API Java ---- */

document.addEventListener('click', (evento) => {
  const acao = evento.target.closest('[data-acao]');
  if (!acao) return;

  switch (acao.dataset.acao) {
    case 'criar-personagem':
      criarPersonagem();
      break;
    case 'salvar-personagem':
      acaoSalvarPersonagem();
      break;
    case 'excluir-personagem':
      acaoExcluirPersonagem();
      break;
    case 'confirmar-party':
      acaoConfirmarPartyTela();
      break;
    case 'confirmar-party-ficha':
      acaoConfirmarPartyFicha();
      break;
    default:
      break;
  }
});

function acaoCriarPersonagem() {
  // TODO: integração futura — POST /personagens
  const nome = document.getElementById('campo-nome').value.trim() || 'Aventureiro sem nome';
  const classe = document.getElementById('campo-classe').value || 'Guerreiro';
  const raca = document.getElementById('campo-raca').value || 'Humano';
  const nivel = Number(document.getElementById('campo-nivel').value) || 1;
  const dataCriacao = document.getElementById('campo-data').value || new Date().toISOString().slice(0, 10);

  const partyNomes = estado.partySelecionadaCriacao
    .map((id) => COMPANHEIROS_FICTICIOS.find((c) => c.id === id)?.nome)
    .filter(Boolean);
  // TODO: integração futura — POST /personagens/{id}/party (party inicial)

  const novoPersonagem = {
    id: `p${Date.now()}`,
    nome,
    classe,
    raca,
    nivel,
    dataCriacao,
    atributos: { ...estado.atributosCriacao },
    party: partyNomes,
  };

  estado.personagens.unshift(novoPersonagem);
  navegarPara('ficha', { personagemId: novoPersonagem.id });
}

function acaoSalvarPersonagem() {
  // TODO: integração futura — PUT /personagens/{id}
  const personagem = obterPersonagemAtual();
  if (!personagem) return;

  personagem.nome = document.getElementById('editar-nome').value.trim() || personagem.nome;
  personagem.classe = document.getElementById('editar-classe').value;
  personagem.raca = document.getElementById('editar-raca').value;
  personagem.nivel = Number(document.getElementById('editar-nivel').value) || personagem.nivel;
  personagem.dataCriacao = document.getElementById('editar-data').value || personagem.dataCriacao;
  personagem.atributos = { ...estado.atributosEdicao };

  navegarPara('ficha');
}

function acaoExcluirPersonagem() {
  // TODO: integração futura — DELETE /personagens/{id}
  const personagem = obterPersonagemAtual();
  if (!personagem) return;

  estado.personagens = estado.personagens.filter((p) => p.id !== personagem.id);
  estado.personagemAtualId = null;

  fecharModal('modal-excluir');
  navegarPara('lista');
}

function acaoConfirmarPartyTela() {
  // TODO: integração futura — PUT /personagens/{id}/party/{idParty}
  const personagem = obterPersonagemAtual();
  if (!personagem) return;

  personagem.party = estado.partySelecionadaTela
    .map((id) => COMPANHEIROS_FICTICIOS.find((c) => c.id === id)?.nome)
    .filter(Boolean);

  renderizarSlotsPartyAtual(personagem);
  document.querySelector('[data-painel="painel-alterar-party"]').hidden = true;
}

function acaoConfirmarPartyFicha() {
  // TODO: integração futura — PUT /personagens/{id}/party/{idParty}
  const personagem = obterPersonagemAtual();
  if (!personagem) return;

  personagem.party = estado.partySelecionadaFicha
    .map((id) => COMPANHEIROS_FICTICIOS.find((c) => c.id === id)?.nome)
    .filter(Boolean);

  navegarPara('ficha');
}

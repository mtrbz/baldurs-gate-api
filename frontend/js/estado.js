/* ============================================
   ESTADO GLOBAL DA APLICAÇÃO (em memória, sem persistência)
   ============================================ */

const estado = {
  // Lista de personagens atualmente carregada. Futuramente virá do GET /personagens.
  personagens: [...PERSONAGENS_FICTICIOS],

  // Id do personagem atualmente selecionado para visualização/edição.
  personagemAtualId: null,

  // Filtro de classe ativo na tela de lista ('' = todas).
  filtroClasseAtivo: '',

  // Atributos em edição na tela de Novo Personagem.
  atributosCriacao: {
    Força: VALOR_ATRIBUTO_PADRAO,
    Destreza: VALOR_ATRIBUTO_PADRAO,
    Constituição: VALOR_ATRIBUTO_PADRAO,
    Inteligência: VALOR_ATRIBUTO_PADRAO,
    Sabedoria: VALOR_ATRIBUTO_PADRAO,
    Carisma: VALOR_ATRIBUTO_PADRAO,
  },

  // Companheiros selecionados durante a criação de personagem (array de ids).
  partySelecionadaCriacao: [],

  // Atributos em edição na tela de Editar Personagem (clone do personagem atual).
  atributosEdicao: {},

  // Companheiros selecionados na tela da Party (gerenciamento geral).
  partySelecionadaTela: [],

  // Companheiros selecionados ao alterar a party a partir da ficha.
  partySelecionadaFicha: [],
};

function obterPersonagemAtual() {
  return estado.personagens.find((p) => p.id === estado.personagemAtualId) || null;
}

function obterCompanheiroPorNome(nome) {
  return COMPANHEIROS_FICTICIOS.find((c) => c.nome === nome) || null;
}

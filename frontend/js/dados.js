/* ============================================
   DADOS FICTÍCIOS
   Estrutura pensada para ser substituída diretamente
   pelo retorno da API (GET /personagens, GET /companheiros)
   ============================================ */

const NOMES_ATRIBUTOS = [
  'Força',
  'Destreza',
  'Constituição',
  'Inteligência',
  'Sabedoria',
  'Carisma',
];

const VALOR_ATRIBUTO_PADRAO = 10;
const LIMITE_PARTY = 3;

// Personagens fictícios — futuramente substituídos pelo GET /personagens
const PERSONAGENS_FICTICIOS = [
  {
    id: 'p1',
    nome: 'Ithrandel Duskwhisper',
    classe: 'Mago',
    raca: 'Elfo',
    nivel: 6,
    dataCriacao: '2024-02-11',
    atributos: {
      Força: 9,
      Destreza: 14,
      Constituição: 12,
      Inteligência: 18,
      Sabedoria: 13,
      Carisma: 11,
    },
    party: ['Astarion', 'Gale', 'Karlach'],
  },
  {
    id: 'p2',
    nome: 'Borga Punhoférreo',
    classe: 'Bárbaro',
    raca: 'Meio-Orc',
    nivel: 8,
    dataCriacao: '2024-01-03',
    atributos: {
      Força: 18,
      Destreza: 14,
      Constituição: 16,
      Inteligência: 10,
      Sabedoria: 12,
      Carisma: 15,
    },
    party: ['Karlach', 'Lae\'zel', 'Jaheira'],
  },
  {
    id: 'p3',
    nome: 'Seraphine Vaelthorn',
    classe: 'Clérigo',
    raca: 'Meio-Elfo',
    nivel: 5,
    dataCriacao: '2024-03-27',
    atributos: {
      Força: 12,
      Destreza: 11,
      Constituição: 14,
      Inteligência: 10,
      Sabedoria: 17,
      Carisma: 14,
    },
    party: ['Halsin', 'Minsc'],
  },
  {
    id: 'p4',
    nome: 'Kaeldrim Nightshade',
    classe: 'Ladino',
    raca: 'Drow',
    nivel: 7,
    dataCriacao: '2023-12-19',
    atributos: {
      Força: 10,
      Destreza: 18,
      Constituição: 12,
      Inteligência: 13,
      Sabedoria: 12,
      Carisma: 14,
    },
    party: ['Astarion', 'Wyll', 'Minthara'],
  },
];

// Companheiros fictícios — futuramente substituídos pelo GET /companheiros
const COMPANHEIROS_FICTICIOS = [
  { id: 'astarion', nome: 'Astarion', classe: 'Ladino', raca: 'Alto Elfo' },
  { id: 'gale', nome: 'Gale', classe: 'Mago', raca: 'Humano' },
  { id: 'karlach', nome: 'Karlach', classe: 'Bárbaro', raca: 'Tiefling' },
  { id: 'laezel', nome: "Lae'zel", classe: 'Guerreiro', raca: 'Githyanki' },
  { id: 'umbralma', nome: 'Umbralma', classe: 'Druida', raca: 'Halfling' },
  { id: 'wyll', nome: 'Wyll', classe: 'Bruxo', raca: 'Humano' },
  { id: 'halsin', nome: 'Halsin', classe: 'Druida', raca: 'Elfo' },
  { id: 'jaheira', nome: 'Jaheira', classe: 'Druida', raca: 'Meio-Elfo' },
  { id: 'minsc', nome: 'Minsc', classe: 'Guerreiro', raca: 'Humano' },
  { id: 'minthara', nome: 'Minthara', classe: 'Paladino', raca: 'Drow' },
];

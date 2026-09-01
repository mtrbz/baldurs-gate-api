/* ============================================
   EDITOR DE ATRIBUTOS (+ / -)
   Reutilizado nas telas de Novo Personagem e Editar Personagem.
   ============================================ */

const VALOR_MINIMO_ATRIBUTO = 1;
const VALOR_MAXIMO_ATRIBUTO = 20;

function criarMarkupEditorAtributo(nomeAtributo, valorAtual, chaveEstado) {
  return `
    <div class="atributo-editor" data-atributo="${nomeAtributo}">
      <div class="atributo-editor__controles">
        <button
          class="atributo-editor__botao"
          data-atributo-diminuir
          data-chave-estado="${chaveEstado}"
          data-atributo-nome="${nomeAtributo}"
          aria-label="Diminuir ${nomeAtributo}"
        >−</button>
        <span class="atributo-editor__valor" data-atributo-valor>${valorAtual}</span>
        <button
          class="atributo-editor__botao"
          data-atributo-aumentar
          data-chave-estado="${chaveEstado}"
          data-atributo-nome="${nomeAtributo}"
          aria-label="Aumentar ${nomeAtributo}"
        >+</button>
      </div>
      <p class="atributo-editor__nome">${nomeAtributo}</p>
    </div>
  `;
}

function renderizarEditorAtributos(container, chaveEstado) {
  if (!container) return;
  const valores = estado[chaveEstado];
  container.innerHTML = NOMES_ATRIBUTOS.map((nome) =>
    criarMarkupEditorAtributo(nome, valores[nome], chaveEstado)
  ).join('');
}

function ajustarAtributo(chaveEstado, nomeAtributo, delta) {
  const valores = estado[chaveEstado];
  const novoValor = valores[nomeAtributo] + delta;

  if (novoValor < VALOR_MINIMO_ATRIBUTO || novoValor > VALOR_MAXIMO_ATRIBUTO) return;

  valores[nomeAtributo] = novoValor;

  // Atualiza apenas o número exibido, sem re-renderizar o editor inteiro.
  const seletorContainer =
    chaveEstado === 'atributosCriacao' ? '[data-atributos-editor]' : '[data-atributos-editor-edicao]';
  const editor = document
    .querySelector(seletorContainer)
    ?.querySelector(`[data-atributo="${nomeAtributo}"]`);
  if (editor) {
    editor.querySelector('[data-atributo-valor]').textContent = novoValor;
  }
}

document.addEventListener('click', (evento) => {
  const botaoAumentar = evento.target.closest('[data-atributo-aumentar]');
  const botaoDiminuir = evento.target.closest('[data-atributo-diminuir]');
  const botao = botaoAumentar || botaoDiminuir;
  if (!botao) return;

  const delta = botaoAumentar ? 1 : -1;
  ajustarAtributo(botao.dataset.chaveEstado, botao.dataset.atributoNome, delta);
});

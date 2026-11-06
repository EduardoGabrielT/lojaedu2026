// ===== CONFIGURAÇÃO =====
const WHATSAPP_NUMERO = '55SEUNUMERO'; // Substitua pelo seu número (formato: 5511999999999)

// ===== ESTADO GLOBAL =====
let produtos = [];
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

// ===== HELPERS =====
function formatarPreco(valor) {
  return valor.toFixed(2).replace('.', ',');
}

function gerarEstrelas() {
  const estrelas = Math.floor(Math.random() * 2) + 4;
  return '⭐'.repeat(estrelas);
}

function gerarAvaliacoes() {
  return Math.floor(Math.random() * 50) + 10;
}

// ===== CARREGAR PRODUTOS DA "API" (JSON) =====
async function carregarProdutos() {
  const grid = document.getElementById('produtos-grid');
  grid.innerHTML = '<p class="mensagem-vazia">⏳ A carregar produtos...</p>';

  try {
    const resposta = await fetch('./produtos.json');
    if (!resposta.ok) throw new Error('Erro ao carregar o catálogo.');
    
    produtos = await resposta.json();
    renderizarProdutos(produtos);
  } catch (erro) {
    console.error(erro);
    grid.innerHTML = '<p class="mensagem-vazia">❌ Erro ao carregar os produtos. Tente novamente mais tarde.</p>';
  }
}

// ===== RENDERIZAR PRODUTOS =====
function renderizarProdutos(lista) {
  const grid = document.getElementById('produtos-grid');

  if (lista.length === 0) {
    grid.innerHTML = '<p class="mensagem-vazia">😕 Nenhum produto encontrado</p>';
    return;
  }

  grid.innerHTML = lista.map(p => `
    <div class="produto-card">
      <img src="${p.imagem}" alt="${p.nome}" class="produto-img" loading="lazy" />
      <div class="produto-info">
        <div class="produto-nome">${p.nome}</div>
        <div class="produto-avaliacao">
          ${gerarEstrelas()}
          <small>(${gerarAvaliacoes()})</small>
        </div>
        <div class="produto-preco">
          ${p.precoAntigo ? `<span class="produto-preco-antigo">R$ ${formatarPreco(p.precoAntigo)}</span>` : ''}
          R$ ${formatarPreco(p.preco)}
        </div>
        <button class="btn-comprar" onclick="adicionarCarrinho(${p.id})">
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  `).join('');
}

// ===== FILTROS =====
function filtrarProdutos(termo) {
  const termoLower = termo.toLowerCase().trim();
  if (!termoLower) {
    renderizarProdutos(produtos);
    return;
  }
  const filtrados = produtos.filter(p =>
    p.nome.toLowerCase().includes(termoLower) ||
    p.categoria.toLowerCase().includes(termoLower)
  );
  renderizarProdutos(filtrados);
}

function filtrarPorCategoria(categoria) {
  const filtrados = produtos.filter(p => p.categoria === categoria);
  renderizarProdutos(filtrados);
  document.getElementById('busca').value = '';
  document.getElementById('produtos').scrollIntoView({ behavior: 'smooth' });
}

// ===== CARRINHO =====
function adicionarCarrinho(id) {
  const produto = produtos.find(p => p.id === id);
  if (!produto) return;
  
  const itemExistente = carrinho.find(item => item.id === id);

  if (itemExistente) {
    itemExistente.quantidade += 1;
  } else {
    carrinho.push({ ...produto, quantidade: 1 });
  }

  salvarCarrinho();
  atualizarContador();
  renderizarCarrinho();

  // Feedback visual
  const btn = event.target;
  const textoOriginal = btn.textContent;
  btn.textContent = '✓ Adicionado!';
  btn.style.background = '#27ae60';
  setTimeout(() => {
    btn.textContent = textoOriginal;
    btn.style.background = '';
  }, 1200);
}

function removerCarrinho(id) {
  carrinho = carrinho.filter(item => item.id !== id);
  salvarCarrinho();
  atualizarContador();
  renderizarCarrinho();
}

function alterarQuantidade(id, delta) {
  const item = carrinho.find(p => p.id === id);
  if (!item) return;

  item.quantidade += delta;

  if (item.quantidade <= 0) {
    carrinho = carrinho.filter(p => p.id !== id);
  }

  salvarCarrinho();
  atualizarContador();
  renderizarCarrinho();
}

function atualizarContador() {
  const total = carrinho.reduce((sum, item) => sum + item.quantidade, 0);
  document.getElementById('carrinho-contador').textContent = total;
}

function renderizarCarrinho() {
  const container = document.getElementById('carrinho-itens');
  const rodape = document.getElementById('carrinho-rodape');

  if (carrinho.length === 0) {
    container.innerHTML = '<div class="carrinho-vazio">🛒 Seu carrinho está vazio</div>';
    rodape.innerHTML = '';
    return;
  }

  container.innerHTML = carrinho.map(item => {
    const subtotal = item.preco * item.quantidade;
    return `
      <div class="carrinho-item">
        <img src="${item.imagem}" alt="${item.nome}" class="carrinho-item-img" />
        <div class="carrinho-item-info">
          <div class="carrinho-item-nome">${item.nome}</div>
          <div class="carrinho-item-preco">R$ ${formatarPreco(subtotal)}</div>
          <div class="carrinho-item-controles">
            <button onclick="alterarQuantidade(${item.id}, -1)" aria-label="Diminuir quantidade">-</button>
            <span>${item.quantidade}</span>
            <button onclick="alterarQuantidade(${item.id}, 1)" aria-label="Aumentar quantidade">+</button>
          </div>
        </div>
        <button class="carrinho-item-remover" onclick="removerCarrinho(${item.id})" aria-label="Remover">🗑️</button>
      </div>
    `;
  }).join('');

  const total = carrinho.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);
  rodape.innerHTML = `
    <div class="carrinho-total">
      <span>Total:</span>
      <span>R$ ${formatarPreco(total)}</span>
    </div>
    <button class="btn-finalizar" onclick="finalizarPedido()">
      Finalizar pelo WhatsApp
    </button>
  `;
}

// ===== FINALIZAR PEDIDO =====
function finalizarPedido() {
  if (carrinho.length === 0) return;

  const total = carrinho.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);
  let mensagem = '🛒 *Pedido Lojas Edu*\n\n';

  carrinho.forEach(item => {
    const subtotal = item.preco * item.quantidade;
    mensagem += `• ${item.nome}\n`;
    mensagem += `  ${item.quantidade}x R$ ${formatarPreco(item.preco)} = *R$ ${formatarPreco(subtotal)}*\n\n`;
  });

  mensagem += `━━━━━━━━━━━━━━━\n*Total: R$ ${formatarPreco(total)}*\n\n`;
  mensagem += `Olá! Gostaria de finalizar este pedido.`;

  const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensagem)}`;
  window.open(url, '_blank');
}

// ===== PERSISTÊNCIA =====
function salvarCarrinho() {
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

// ===== MODAL =====
function abrirCarrinho() {
  document.getElementById('carrinho-modal').classList.add('aberto');
  renderizarCarrinho();
  document.body.style.overflow = 'hidden';
}

function fecharCarrinho() {
  document.getElementById('carrinho-modal').classList.remove('aberto');
  document.body.style.overflow = '';
}

document.getElementById('carrinho-modal').addEventListener('click', (e) => {
  if (e.target.id === 'carrinho-modal') fecharCarrinho();
});

// Fechar com tecla ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') fecharCarrinho();
});

// ===== INICIALIZAÇÃO =====
carregarProdutos();
atualizarContador();
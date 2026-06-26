// ===== CONFIGURAÇÃO =====
const WHATSAPP_NUMERO = '55SEUNUMERO'; // Substitua pelo seu número (formato: 5511999999999)

// ===== CATÁLOGO DE PRODUTOS =====
const produtos = [
  {
    id: 1,
    nome: "Tênis Esportivo Pro",
    preco: 189.90,
    precoAntigo: 249.90,
    imagem: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
    categoria: "calcados"
  },
  {
    id: 2,
    nome: "Camiseta Básica Premium",
    preco: 49.90,
    precoAntigo: 79.90,
    imagem: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80",
    categoria: "vestuario"
  },
  {
    id: 3,
    nome: "Fone Bluetooth sem Fio",
    preco: 129.90,
    precoAntigo: 199.90,
    imagem: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
    categoria: "eletronicos"
  },
  {
    id: 4,
    nome: "Jogo de Xícaras Cerâmica",
    preco: 89.90,
    precoAntigo: 119.90,
    imagem: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&q=80",
    categoria: "utensilios"
  },
  {
    id: 5,
    nome: "Smartwatch Fitness",
    preco: 299.90,
    precoAntigo: 449.90,
    imagem: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80",
    categoria: "eletronicos"
  },
  {
    id: 6,
    nome: "Mochila Urbana Antifurto",
    preco: 159.90,
    precoAntigo: 229.90,
    imagem: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80",
    categoria: "vestuario"
  },
  {
    id: 7,
    nome: "Sandália Confortável",
    preco: 79.90,
    precoAntigo: 119.90,
    imagem: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=400&q=80",
    categoria: "calcados"
  },
  {
    id: 8,
    nome: "Conjunto de Panelas",
    preco: 249.90,
    precoAntigo: 349.90,
    imagem: "https://images.unsplash.com/photo-1584990347449-a4f9b8c5d7b3?w=400&q=80",
    categoria: "utensilios"
  }
];

// ===== ESTADO DO CARRINHO =====
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
    const detalheQtd = item.quantidade > 1
      ? `<small>${item.quantidade}x R$ ${formatarPreco(item.preco)}</small>`
      : '';
    return `
      <div class="carrinho-item">
        <img src="${item.imagem}" alt="${item.nome}" class="carrinho-item-img" />
        <div class="carrinho-item-info">
          <div class="carrinho-item-nome">${item.nome}</div>
          <div class="carrinho-item-preco">
            R$ ${formatarPreco(subtotal)}
            ${detalheQtd}
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
renderizarProdutos(produtos);
atualizarContador();

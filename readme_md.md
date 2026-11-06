# 🛍️ Lojas Edu — E-commerce & Vitrine Digital

*Uma aplicação web completa de e-commerce e vitrine digital focada em conversão rápida e atendimento direto via WhatsApp, desenvolvida com Vanilla JavaScript, arquitetura assíncrona baseada em JSON e design Mobile-First.*

[🔗 Ver Demonstração ao Vivo](https://eduardogabrielt.github.io/lojaedu2026/#produtos)

## 🚀 Sobre o Projeto

O **Lojas Edu** é um projeto pessoal desenvolvido para simular uma loja virtual moderna, ágil e de alta conversão. O grande diferencial desta aplicação é a integração direta com o **WhatsApp**, permitindo que o cliente monte o seu carrinho de compras e envie o pedido estruturado diretamente para o lojista com apenas um clique.

Nesta versão atualizada, a aplicação foi refactorizada para adotar uma **arquitetura orientada a dados**, consumindo o catálogo de produtos de forma assíncrona a partir de um ficheiro JSON externo, simulando o comportamento de uma API real.

## ✨ Funcionalidades Principais

* **🔄 Consumo Assíncrono de Dados:** Catálogo de produtos gerido externamente num ficheiro `.json` e carregado via `fetch()` (`Async/Await`).
* **🛒 Carrinho de Compras Dinâmico:** Controlo total de quantidades (com botões de incremento/decremento e remoção individual).
* **💾 Persistência Local:** O carrinho do utilizador é salvo automaticamente utilizando a API `localStorage`.
* **📱 Integração Direta com o WhatsApp:** Formatação automática dos itens do carrinho em uma mensagem limpa e organizada enviada via API do WhatsApp.
* **🔍 Filtros e Pesquisa em Tempo Real:** Sistema de busca instantânea por nome e filtros rápidos por categorias (*Calçados, Vestuário, Eletrônicos e Utensílios*).
* **📱 Design Responsivo (*Mobile-First*):** Layout totalmente adaptado para telemóveis, tablets e computadores, utilizando CSS Grid e Flexbox.

## 🛠️ Tecnologias Utilizadas

Este projeto foi desenvolvido utilizando as seguintes tecnologias e conceitos de mercado:

* **HTML5:** Marcação semântica focada em acessibilidade e estrutura limpa.
* **CSS3:** Estilização moderna utilizando Variáveis CSS, Flexbox, CSS Grid, media queries e efeitos visuais.
* **JavaScript (ES6+):** Lógica assíncrona (`async/await`), manipulação avançada de DOM, eventos e métodos de alta ordem (`map`, `filter`, `reduce`).
* **Fetch API:** Consumo de dados externos em formato JSON.
* **LocalStorage API:** Persistência de estado local no navegador.
* **Git, GitHub & GitHub Pages:** Controlo de versão e hospedagem contínua.

## 📂 Estrutura de Pastas

```text
lojaedu2026/
├── index.html       # Página principal (vitrine, busca e categorias)
├── produto.html     # Página de detalhes de um produto específico
├── produtos.json    # Base de dados estática simulando uma API
├── style.css        # Estilos globais, componentes e responsividade
├── script.js        # Lógica de negócio, requisição assíncrona e carrinho
└── .gitignore       # Ficheiros ignorados pelo controlo de versão
```

## ⚙️ Como Executar o Projeto Localmente

Se quiser clonar e testar este projeto na sua máquina, siga os passos abaixo:

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/eduardogabrielt/lojaedu2026.git
   ```

2. **Abra a pasta do projeto:**
   ```bash
   cd lojaedu2026
   ```

3. **Execute através de um servidor local:**
   * Como a aplicação faz uma requisição `fetch()` para carregar o ficheiro `produtos.json`, é necessário rodá-la num servidor local (por exemplo, a extensão **Live Server** do Visual Studio Code) para evitar bloqueios de CORS do navegador.

## 💡 Aprendizados e Desafios

O desenvolvimento e a posterior refatoração deste projeto permitiram consolidar conceitos fundamentais:
* Transição de dados estáticos hardcoded para contratos de dados assíncronos baseados em JSON.
* Gestão de estado local e reatividade da interface sem o uso de frameworks pesados.
* Construção de uma experiência do utilizador (*UX*) fluida voltada para conversão comercial.

## 👤 Autor

Feito com dedicação por **Eduardo Gabriel**. Se tiver alguma dúvida, sugestão ou feedback sobre o projeto, entre em contacto!

* 🐙 GitHub: [@eduardogabrielt](https://github.com/eduardogabrielt)
// =========================================================
// CATÁLOGO DE WIDGETS: Define as opções que aparecem no popup de escolha
// =========================================================

const CATALOGO = {
    kpis: [
        {
            id: 'kpi-total-alunos',
            nome: 'Total de Alunos',
            render: function (containerHtml, ano) {
                containerHtml.innerHTML = `
                     <span class="card-titulo">Alunos ativos no ano</span>
                    <strong class="card-valor">1.482</strong>
                    <span class="card-rodape">Ano: ${ano}</span>
                `;
            }
        },
        {
            id: 'kpi-taxa-evasao',
            nome: 'Taxa de Evasão',
            render: function (containerHtml, ano) {
                containerHtml.innerHTML = `
                   <span class="card-titulo">Evasão no ano</span>
                    <strong class="card-valor" style="color: #ff5555;">7.3%</strong>
                    <span class="card-rodape">Ano: ${ano}</span>
                `;
            }
        },
        {
            id: 'kpi-instituicoes',
            nome: 'Instituições',
            render: function (containerHtml) {
                containerHtml.innerHTML = `
                    <span class="card-titulo">Instituições parceiras</span>
                    <strong class="card-valor">24</strong>
                    <span class="card-rodape">Cadastradas na base</span>
                `;
            }
        }
    ],
       graficos: [
        {
            id: 'graf-alunos-regiao',
            nome: 'Alunos por Região',
            render: function (containerHtml, ano) {
                let canvas = document.createElement('canvas');
                containerHtml.appendChild(canvas);

                // Salva a instância do gráfico para podermos deletar depois
                containerHtml._chart = new Chart(canvas, {
                    type: 'bar',
                    data: {
                        labels: ['Norte', 'Nordeste', 'Centro-Oeste', 'Sudeste', 'Sul'],
                        datasets: [{

                            data: [320, 480, 210, 890, 540],
                            backgroundColor: ['#4a7ff7', '#ae8df5', '#f3b86b', '#ffde59'],
                            borderRadius: 6
                        }]
                    },
                    options: {
                        responsive: true, 
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { 
                                display: false,
                                labels: { color: 'black', font: { family: 'Telegraf' } } 
                            },
                        }, 
                        scales: {
                            y: {
                                beginAtZero: true,
                                max: 2000,
                                ticks: { color: 'black', font: { size: 15, family: 'Telegraf' } },
                                grid: { display: false }
                            },
                            x: {
                                ticks: { color: 'black', font: { size: 15, family: 'Telegraf' } },
                                grid: { display: false }
                            }
                        }
                    }
                });
            }
        },
        {
            id: 'graf-evolucao',
            nome: 'Evolução Anual De Alunos',
            render: function (containerHtml) {
                let canvas = document.createElement('canvas');
                containerHtml.appendChild(canvas);
                
                containerHtml._chart = new Chart(canvas, {
                    type: 'line',
                    data: {
                        labels: ['2019', '2020', '2021', '2022', '2023', '2024', '2025'],
                        datasets: [{
                            label: 'Alunos',
                            data: [800, 850, 920, 1050, 1180, 1300, 1482],
                            borderColor: '#4a7ff7',
                            backgroundColor: 'rgba(74,127,247,.15)',
                            tension: 0.3,
                            fill: true
                        }]
                    },
                    options: {
                        responsive: true, 
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { 
                                display: true,
                                labels: { color: 'black', font: { family: 'Telegraf' } }
                            },
                            title: {
                                display: false,
                                // text: 'Evolução Anual de Alunos',
                                color: 'black',
                                font: { size: 20, family: 'Telegraf' },
                                padding: { bottom: 10 }
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                max: 2000,
                                ticks: { color: 'black', font: { size: 15, family: 'Telegraf' } },
                                grid: { display: false }
                            },
                            x: {
                                ticks: { color: 'black', font: { size: 15, family: 'Telegraf' } },
                                grid: { display: false }
                            }
                        }
                    }
                });
            }
        }
    ] 
}; 

// Variável global que guarda o que o usuário escolheu
let layout = { kpi: null, grafico: null };
let secaoAtualPopup = 'kpis'; // Guarda se o popup está aberto para KPI ou Gráfico

// =========================================================
// FUNÇÕES DE COMUNICAÇÃO COM O BACK-END
// =========================================================

// Busca o layout que já está salvo no banco para este usuário
async function buscarLayout() {
    let userId = sessionStorage.ID_USUARIO;
    if (userId == undefined || userId == null) return;

    let retorno = await fetch(`/dashboard/layout/${userId}`)
        .then(resposta => resposta.status === 200 ? resposta.json() : null)
        .catch(() => null);

    if (retorno) {
        layout.kpi = retorno.kpi;
        layout.grafico = retorno.grafico;
    }
    renderizarTudo();
}

// Salva a escolha do usuário no banco
async function salvarLayout() {
    let userId = sessionStorage.ID_USUARIO;
    if (userId == undefined || userId == null) return;

    // Envia os dados no padrão do projeto
    fetch(`/dashboard/layout/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kpi: layout.kpi, grafico: layout.grafico })
    })
        .then(resposta => {
            if (resposta.status === 200) console.log("Layout salvo no banco");
        })
        .catch(erro => console.log("Erro de rede ao salvar layout:", erro));
}

// ================== POPUP =============================
function abrirPopupEscolha(secao) {
    secaoAtualPopup = secao;

    // 1. Verifica se o popup já foi criado na tela. Se não, cria via JS.
    let modal = document.getElementById('popup_escolher_widget');

    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'popup_escolher_widget';
        modal.className = 'modal-overlay'; // Classe estilizada no CSS

        modal.innerHTML = `
            <div class="modal-card">
                <h3 id="popup_titulo"></h3>
                <div class="modal-lista-opcoes" id="container_opcoes_widget"></div>
                <div class="modal-acoes">
                    <button class="btn-cancelar" onclick="fecharPopupDash()">Cancelar</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // Fecha o popup se clicar no fundo escuro
        modal.addEventListener('click', function (e) {
            if (e.target === modal) fecharPopupDash();
        });
    }

    // 2. Altera o título do popup
    document.getElementById('popup_titulo').innerText = secao === 'kpis' ? 'Escolher KPI' : 'Escolher Gráfico';

    // 3. Limpa o container de opções
    let containerOpcoes = document.getElementById('container_opcoes_widget');
    containerOpcoes.innerHTML = '';

    // Gera um botão para cada opção do catálogo
    CATALOGO[secao].forEach(function (widget) {
        let btnOpcao = document.createElement('button');
        btnOpcao.className = 'btn-opcao-modal'; // Usaremos essa classe no CSS
        btnOpcao.innerText = widget.nome;

        btnOpcao.onclick = function () {
            // Salva a escolha no estado
            if (secaoAtualPopup === 'kpis') layout.kpi = widget.id;
            else layout.grafico = widget.id;

            salvarLayout();      // Manda pro banco
            renderizarTudo();    // Atualiza a tela

            fecharPopupDash();   // Fecha o popup
        };
        containerOpcoes.appendChild(btnOpcao);
    });

    // 4. Abre o popup adicionando a classe 'ativo'
    modal.classList.add('ativo');
}

function fecharPopupDash() {
    let modal = document.getElementById('popup_escolher_widget');
    if (modal) modal.classList.remove('ativo');
}

// ================== RENDERIZAÇÃO DA TELA =================================
function renderizarSlot(containerHtml, widgetId, secao) {
    if (!containerHtml) return;

    let botaoSelector = secao === 'kpis' ? '.botao-kpis' : '.botao-graficos';
    let botaoOriginal = containerHtml.querySelector(botaoSelector);

    // Limpa antigos
    let widgetsAntigos = containerHtml.querySelectorAll('.widget-inner');
    for (let widget of widgetsAntigos) {
        let body = widget.querySelector('.widget-body');
        if (body && body._chart) {
            try { body._chart.destroy(); } catch (e) { }
            body._chart = null;
        }
        widget.remove();
    }

    if (!widgetId) {
        if (botaoOriginal) botaoOriginal.style.display = 'flex';
        return;
    }

    let widgetDef = CATALOGO[secao].find(w => w.id === widgetId);
    if (!widgetDef) {
        if (botaoOriginal) botaoOriginal.style.display = 'flex';
        return;
    }

    if (botaoOriginal) botaoOriginal.style.display = 'none';

    let cardHtml = document.createElement('div');
    cardHtml.className = 'widget-inner';
    cardHtml.innerHTML = `
        <div class="widget-titulo">${widgetDef.nome}</div>
        <button class="widget-remover" title="Remover">×</button>
        <div class="widget-body"></div>
    `;

    // Botão X para remover o gráfico da tela
    cardHtml.querySelector('.widget-remover').onclick = function () {
        if (secao === 'kpis') layout.kpi = null;
        else layout.grafico = null;

        salvarLayout();
        renderizarSlot(containerHtml, null, secao);
    };

    containerHtml.appendChild(cardHtml);

    let containerBody = cardHtml.querySelector('.widget-body');
    let anoAtual = document.querySelector('.filtro-ano').value;

    try {
        widgetDef.render(containerBody, anoAtual);
    } catch (erro) {
        containerBody.innerHTML = '<p style="color:red;font-size:12px">Erro</p>';
    }
}

function renderizarTudo() {
    renderizarSlot(document.querySelector('.grid-cards-personalizado'), layout.kpi, 'kpis');
    renderizarSlot(document.querySelector('.container-graficos-personalizado'), layout.grafico, 'graficos');
}

// ========================= INICIALIZAÇÃO ====================================
window.onload = async function () {
    let imgUsuario = document.getElementById('imgUsuario');
    if (imgUsuario && sessionStorage.FOTO_USUARIO) imgUsuario.src = sessionStorage.FOTO_USUARIO;

    let tituloDash = document.querySelector('.nav-dash p');
    let filtroAno = document.querySelector('.filtro-ano');

    function atualizarTitulo() {
        if (tituloDash && filtroAno) tituloDash.textContent = `Dashboard - Personalizada (${filtroAno.value})`;
    }
    atualizarTitulo();

    if (filtroAno) {
        filtroAno.addEventListener('change', function () {
            atualizarTitulo();
            renderizarTudo();
        });
    }

    await buscarLayout();
};
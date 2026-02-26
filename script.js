// =============================
// ENTERPRISE OPERATIONAL DASHBOARD
// Modular Architecture
// =============================

document.addEventListener("DOMContentLoaded", () => {
    App.init();
});

const App = (() => {

    // =============================
    // STORAGE MODULE
    // =============================
    const Storage = {
        save(key, data) {
            localStorage.setItem(key, JSON.stringify(data));
        },
        load(key) {
            return JSON.parse(localStorage.getItem(key));
        }
    };

    // =============================
    // STATE
    // =============================
    const State = {
        funcionarios: [],
        filas: [],
        currentFilaIndex: 0
    };

    // =============================
    // DOM REFERENCES
    // =============================
    const DOM = {};

    function cacheDOM() {
        DOM.sidebarItems = document.querySelectorAll(".sidebar li");
        DOM.sections = document.querySelectorAll(".section");

        DOM.totalGeral = document.getElementById("totalGeral");
        DOM.mediaGeral = document.getElementById("mediaGeral");
        DOM.presentes = document.getElementById("presentes");
        DOM.ausentes = document.getElementById("ausentes");

        DOM.filaTitulo = document.getElementById("filaTitulo");
        DOM.filaTabela = document.getElementById("filaTabela");
        DOM.filtroFuncionario = document.getElementById("filtroFuncionario");

        DOM.btnExport = document.getElementById("btnExport");
    }

    // =============================
    // FUNCIONÁRIOS FIXOS
    // =============================
    function generateFuncionarios() {

        const funcionariosPorFila = [

            [
                "José Silva","Ana Bezerra","Carlos Henrique","Mariana Souza","Rafael Costa",
                "Fernanda Lima","Bruno Almeida","Camila Rocha","Thiago Martins","Patrícia Gomes"
            ],

            [
                "Luiz Felipe","Gabriel Silva","Juliana Andrade","Felipe Santos","Amanda Oliveira",
                "Renato Lopes","Carolina Mendes","Diego Barbosa","Vanessa Ramos","Eduardo Castro"
            ],

            [
                "Ricardo Nunes","Beatriz Azevedo","Marcelo Duarte","Larissa Teixeira","André Carvalho",
                "Natália Freitas","Gustavo Ribeiro","Paula Fernandes","Fábio Correia","Daniela Pinto"
            ],

            [
                "Henrique Moura","Isabela Cardoso","Leonardo Farias","Sabrina Monteiro","Lucas Tavares",
                "Aline Peixoto","Roberto Sales","Viviane Melo","Igor Santana","Cláudia Batista"
            ]
        ];

        let lista = [];

        funcionariosPorFila.forEach((grupo, filaIndex) => {
            grupo.forEach((nome, i) => {
                lista.push({
                    nome,
                    supervisor: "Supervisor " + (filaIndex + 1),
                    gerente: "Gerente " + (filaIndex + 1),
                    matricula: `${filaIndex+1}${100+i}.${nome.split(" ")[0]}`,
                    fila: filaIndex
                });
            });
        });

        return lista;
    }

    // =============================
    // INITIAL STATE
    // =============================
    function initState() {

        State.funcionarios = generateFuncionarios();

        State.filas = Storage.load("filas") || [
            { nome:"Fila A", meta:50, dados:[] },
            { nome:"Fila B", meta:60, dados:[] },
            { nome:"Fila C", meta:80, dados:[] },
            { nome:"Fila D", meta:100, dados:[] }
        ];
    }

    // =============================
    // NAVIGATION
    // =============================
    function setupNavigation() {

        DOM.sidebarItems.forEach(item => {

            item.addEventListener("click", () => {

                DOM.sidebarItems.forEach(i => i.classList.remove("active"));
                item.classList.add("active");

                DOM.sections.forEach(s => s.classList.remove("active-section"));

                const section = item.dataset.section;

                if (section.startsWith("fila")) {

                    const index = parseInt(section.split("-")[1]);
                    State.currentFilaIndex = index;

                    document.getElementById("fila-section")
                        .classList.add("active-section");

                    renderFila(index);

                } else {
                    document.getElementById(section)
                        .classList.add("active-section");
                }
            });
        });
    }

    // =============================
    // DASHBOARD
    // =============================
    function atualizarDashboard() {

        let total = 0;
        let count = 0;
        let presentes = 0;
        let ausentes = 0;

        State.filas.forEach(f => {
            f.dados.forEach(d => {
                total += d.propostas;
                count++;
                d.status === "Presente" ? presentes++ : ausentes++;
            });
        });

        DOM.totalGeral.textContent = total;
        DOM.mediaGeral.textContent = count ? (total / count).toFixed(1) : 0;
        DOM.presentes.textContent = presentes;
        DOM.ausentes.textContent = ausentes;

        Storage.save("filas", State.filas);
        atualizarGrafico();
    }

    // =============================
    // META COLOR RULE
    // =============================
    function getMetaClass(percentual){
        if(percentual < 50) return "meta-vermelho";
        if(percentual < 80) return "meta-amarelo";
        if(percentual < 100) return "meta-verde";
        return "meta-azul";
    }

    // =============================
    // RENDER FILA
    // =============================
    function renderFila(index) {

        const fila = State.filas[index];
        DOM.filaTitulo.textContent = `${fila.nome} - Meta ${fila.meta}`;

        const filtro = DOM.filtroFuncionario.value.toLowerCase();

        const funcionariosFila = State.funcionarios
            .filter(f => f.fila === index)
            .filter(f => f.nome.toLowerCase().includes(filtro));

        let html = `
        <table>
        <thead>
            <tr>
                <th>Funcionário</th>
                <th>Status</th>
                <th>Propostas</th>
                <th>% Meta</th>
            </tr>
        </thead>
        <tbody>
        `;

        funcionariosFila.forEach(func => {

            let registro = fila.dados.find(d => d.matricula === func.matricula);

            if(!registro){
                registro = { matricula: func.matricula, propostas:0, status:"Presente" };
                fila.dados.push(registro);
            }

            const percentual = (registro.propostas / fila.meta) * 100;
            const classeMeta = getMetaClass(percentual);

            html += `
            <tr>
                <td>${func.nome}</td>

                <td>
                    <button class="status-btn presente ${registro.status==="Presente"?"active":""}"
                        data-action="status" data-status="Presente" data-matricula="${func.matricula}">
                        Presente
                    </button>

                    <button class="status-btn ausente ${registro.status==="Ausente"?"active":""}"
                        data-action="status" data-status="Ausente" data-matricula="${func.matricula}">
                        Ausente
                    </button>
                </td>

                <td>
                    <input 
                        type="number" 
                        min="0"
                        value="${registro.propostas}"
                        data-action="proposta"
                        data-matricula="${func.matricula}">
                </td>

                <td class="${classeMeta}">
                    ${percentual.toFixed(1)}%
                </td>
            </tr>
            `;
        });

        html += "</tbody></table>";
        DOM.filaTabela.innerHTML = html;
    }

    // =============================
    // EVENTS FILA
    // =============================
    function setupFilaEvents() {

        DOM.filaTabela.addEventListener("click", (e) => {

            const action = e.target.dataset.action;
            if (!action) return;

            const matricula = e.target.dataset.matricula;
            const fila = State.filas[State.currentFilaIndex];
            const registro = fila.dados.find(d => d.matricula === matricula);

            if (action === "status") {
                registro.status = e.target.dataset.status;
            }

            atualizarDashboard();
            renderFila(State.currentFilaIndex);
        });

        DOM.filaTabela.addEventListener("input", (e) => {

            if (e.target.dataset.action === "proposta") {

                const matricula = e.target.dataset.matricula;
                const fila = State.filas[State.currentFilaIndex];
                const registro = fila.dados.find(d => d.matricula === matricula);

                registro.propostas = Number(e.target.value);

                atualizarDashboard();
            }
        });

        DOM.filtroFuncionario.addEventListener("input", () => {
            renderFila(State.currentFilaIndex);
        });

        DOM.btnExport.addEventListener("click", exportarExcel);
    }

// =============================
// EXPORT EXCEL
// =============================

function exportarExcel(){

    const dados = [];
    let totalGeral = 0;

    State.filas.forEach(fila => {

        let totalFila = 0;

        fila.dados.forEach(registro => {

            const funcionario = State.funcionarios
                .find(f => f.matricula === registro.matricula);

            const percentual = fila.meta
                ? ((registro.propostas / fila.meta) * 100).toFixed(1)
                : 0;

            totalFila += registro.propostas;
            totalGeral += registro.propostas;

            dados.push({
                Fila: fila.nome,
                Meta: fila.meta,
                Nome: funcionario ? funcionario.nome : "",
                Status: registro.status,
                Propostas: registro.propostas,
                "% Meta": percentual + "%"
            });
        });

        dados.push({
            Fila: fila.nome,
            Meta: fila.meta,
            Nome: "TOTAL FILA",
            Status: "",
            Propostas: totalFila,
            "% Meta": fila.meta
                ? ((totalFila / fila.meta) * 100).toFixed(1) + "%"
                : "0%"
        });
    });

    dados.push({
        Fila: "",
        Meta: "",
        Nome: "TOTAL GERAL",
        Status: "",
        Propostas: totalGeral,
        "% Meta": ""
    });

    const worksheet = XLSX.utils.json_to_sheet(dados);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Dashboard");

    // =============================
    // DATA AUTOMÁTICA NO NOME
    // =============================
    const hoje = new Date();

    const dataFormatada =
        hoje.getFullYear() + "-" +
        String(hoje.getMonth()+1).padStart(2,"0") + "-" +
        String(hoje.getDate()).padStart(2,"0");

    const nomeArquivo = `Enterprise_Dashboard_${dataFormatada}.xlsx`;

    XLSX.writeFile(workbook, nomeArquivo);
}

    // =============================
    // CHART
    // =============================
    let chart;

    function initChart(){
        const ctx = document.getElementById("chart").getContext("2d");

        chart = new Chart(ctx,{
            type:"line",
            data:{
                labels:[],
                datasets:[{
                    label:"Média por Funcionário",
                    data:[],
                    borderColor:"#00c6ff",
                    backgroundColor:"rgba(0,198,255,0.15)",
                    tension:0.6,
                    fill:true
                }]
            },
            options:{
                responsive:true,
                plugins:{ legend:{display:false} },
                scales:{ y:{beginAtZero:true} }
            }
        });
    }

    function atualizarGrafico(){

        let labels=[];
        let data=[];

        State.funcionarios.forEach(func=>{
            let total=0;
            let count=0;

            State.filas.forEach(f=>{
                const r=f.dados.find(d=>d.matricula===func.matricula);
                if(r){ total+=r.propostas; count++; }
            });

            labels.push(func.nome);
            data.push(count?(total/count):0);
        });

        chart.data.labels=labels;
        chart.data.datasets[0].data=data;
        chart.update();
    }

    // =============================
    // INIT
    // =============================
    function init() {
        cacheDOM();
        initState();
        setupNavigation();
        setupFilaEvents();
        initChart();
        renderFila(0);
        atualizarDashboard();
    }

    return { init };

})();
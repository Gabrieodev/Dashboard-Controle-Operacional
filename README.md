# 📊 Enterprise Operational Dashboard

Sistema de monitoramento operacional focado em **performance individual, metas por equipe e geração de insights estratégicos**.

Este projeto simula um ambiente corporativo real onde múltiplas filas (equipes) possuem metas distintas e precisam ser acompanhadas em tempo real.

---

## 🎯 Objetivo do Projeto

Criar um dashboard operacional capaz de:

- Monitorar produção individual
- Calcular métricas de performance
- Acompanhar metas por fila
- Gerar indicadores estratégicos
- Exportar dados estruturados para análise externa (Excel)
- Simular ambiente corporativo real

---

## 🏗 Arquitetura

Frontend modular desenvolvido com:

- HTML5
- CSS3
- JavaScript (Arquitetura Modular IIFE)
- Chart.js (visualização de dados)
- XLSX.js (exportação Excel)
- LocalStorage (persistência local)

Arquitetura organizada com separação clara de responsabilidades, facilitando manutenção e escalabilidade.

---

## 📈 Métricas Calculadas

O sistema calcula automaticamente:

### 🔹 Total Geral Produzido
Soma de todas as propostas registradas no sistema.

### 🔹 Média Geral por Funcionário
Indicador de produtividade média individual.

### 🔹 Presença Operacional
Contagem automática de:
- Funcionários presentes
- Funcionários ausentes

### 🔹 Percentual de Meta Individual
### 🔹 Percentual de Meta por Fila
Calculado automaticamente durante a exportação para Excel.

---

## 🧠 Regras de Negócio Implementadas

- Cada fila possui meta própria
- Funcionários são fixos por fila
- Status influencia indicadores de presença
- Propostas são inseridas manualmente
- Persistência automática via LocalStorage
- Exportação estruturada com totais consolidados
- Atualização em tempo real das métricas

---

## 📊 Visualização de Dados

Gráfico de linha apresenta:

- Média de produção por funcionário
- Atualização dinâmica
- Comparação entre colaboradores

Permite identificar:

- Top performers
- Colaboradores abaixo da média
- Desbalanceamento entre equipes
- Tendências de produtividade

---

## 📁 Exportação de Dados

Exporta arquivo Excel contendo:

- Fila
- Meta
- Nome
- Status
- Propostas
- Percentual de Meta
- Total por Fila
- Total Geral

Nome do arquivo com data automática: Enterprise_Dashboard_YYYY-MM-DD.xlsx

---

Pronto para:

- Pivot Tables
- Power BI
- Auditoria operacional
- Análise avançada

---

## 💡 Insights Estratégicos Possíveis

Este dashboard permite:

- Identificar gargalos operacionais
- Medir eficiência por equipe
- Detectar queda de performance
- Avaliar impacto de absenteísmo
- Simular cenários de meta
- Comparar produtividade média vs meta
- Apoiar tomada de decisão baseada em dados

---

## 🚀 Evoluções Futuras

- Backend em Python (Flask ou FastAPI)
- Banco de dados relacional (SQLite/PostgreSQL)
- Histórico diário de produção
- Ranking automático por período
- Indicadores de tendência
- Análise preditiva
- Controle de acesso por perfil
- Deploy em nuvem (Render/Vercel)

---

## 📌 Diferenciais Técnicos

- Arquitetura modular organizada
- Separação clara de responsabilidades
- Estado centralizado (State Management)
- Atualização reativa
- Estrutura preparada para migração Full Stack
- Código estruturado e escalável
- Foco em métricas e regras de negócio

---

## 🧩 Conceitos Demonstrados

- State Management em JavaScript
- DOM Manipulation estruturada
- Business Logic aplicada
- Métricas operacionais
- Persistência de dados
- Data Export Engineering
- Clean Code
- Organização arquitetural
- Pensamento analítico orientado a dados

---

Com foco em:

- Performance
- Meta
- Produtividade
- Monitoramento estratégico
- Tomada de decisão baseada em dados


---

## 📌 Licença

Projeto desenvolvido para fins educacionais e portfólio profissional.


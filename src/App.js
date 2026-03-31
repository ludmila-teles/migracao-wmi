import './App.css';

function Tag({ type, children }) {
  return <span className={`tag tag-${type}`}>{children}</span>;
}

function PhasePill({ type, children }) {
  return <span className={`phase-pill pill-${type}`}>{children}</span>;
}

function Callout({ children }) {
  return <div className="callout">{children}</div>;
}

function CalloutWarn({ children }) {
  return <div className="callout-warn">{children}</div>;
}

function CalloutBucket({ children }) {
  return <div className="callout-bucket">{children}</div>;
}

function TlItem({ dotColor, hasLine = true, label, labelColor, desc }) {
  return (
    <div className="tl-item">
      <div className="tl-marker">
        <div className="tl-dot" style={dotColor ? { background: dotColor } : {}} />
        {hasLine && <div className="tl-line" />}
      </div>
      <div>
        <div className="tl-label" style={labelColor ? { color: labelColor } : {}}>{label}</div>
        <div className="tl-desc">{desc}</div>
      </div>
    </div>
  );
}

function Roadmap() {
  return (
    <>
      <h1>Roadmap 2026 – Migração por Produto</h1>
      <table className="roadmap-grid">
        <thead>
          <tr>
            <th className="col-produto">Produto</th>
            <th colSpan={4} style={{ borderRight: "2px solid #0d3060" }}>Abril</th>
            <th colSpan={4} style={{ borderRight: "2px solid #0d3060" }}>Maio</th>
            <th colSpan={4}>Junho</th>
          </tr>
          <tr>
            <th className="col-produto">Semana →</th>
            <th>S1<br /><span style={{ fontWeight: 400, fontSize: 10 }}>31/03</span></th>
            <th>S2<br /><span style={{ fontWeight: 400, fontSize: 10 }}>07/04</span></th>
            <th>S3<br /><span style={{ fontWeight: 400, fontSize: 10 }}>14/04</span></th>
            <th style={{ borderRight: "2px solid #0d3060" }}>S4<br /><span style={{ fontWeight: 400, fontSize: 10 }}>28/04</span></th>
            <th>S5<br /><span style={{ fontWeight: 400, fontSize: 10 }}>05/05</span></th>
            <th>S6<br /><span style={{ fontWeight: 400, fontSize: 10 }}>12/05</span></th>
            <th>S7<br /><span style={{ fontWeight: 400, fontSize: 10 }}>19/05</span></th>
            <th style={{ borderRight: "2px solid #0d3060" }}>S8<br /><span style={{ fontWeight: 400, fontSize: 10 }}>26/05</span></th>
            <th>S9<br /><span style={{ fontWeight: 400, fontSize: 10 }}>02/06</span></th>
            <th>S10<br /><span style={{ fontWeight: 400, fontSize: 10 }}>09/06</span></th>
            <th>S11<br /><span style={{ fontWeight: 400, fontSize: 10 }}>16/06</span></th>
            <th>S12<br /><span style={{ fontWeight: 400, fontSize: 10 }}>23/06</span></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="produto-name">Laudos</td>
            <td className="cell-bucket"><Tag type="b">Bucket</Tag></td>
            <td className="cell-homolog"><Tag type="h">Homolog</Tag></td>
            <td className="cell-homolog"><Tag type="h">Homolog</Tag></td>
            <td className="cell-prod" style={{ borderRight: "2px solid #0d3060" }}><Tag type="p">Produção</Tag></td>
            <td /><td /><td /><td style={{ borderRight: "2px solid #0d3060" }} />
            <td /><td /><td /><td />
          </tr>
          <tr>
            <td className="produto-name">Amplum</td>
            <td className="cell-homolog"><Tag type="h">Homolog</Tag></td>
            <td className="cell-homolog"><Tag type="h">Homolog</Tag></td>
            <td className="cell-homolog"><Tag type="h">Homolog</Tag></td>
            <td className="cell-prod" style={{ borderRight: "2px solid #0d3060" }}><Tag type="p">Produção</Tag></td>
            <td /><td /><td /><td style={{ borderRight: "2px solid #0d3060" }} />
            <td /><td /><td /><td />
          </tr>
          <tr>
            <td className="produto-name">Autolac <span style={{ fontSize: 10, color: "#888" }}>(+ Interlac)</span></td>
            <td /><td /><td />
            <td style={{ borderRight: "2px solid #0d3060" }} />
            <td className="cell-homolog"><Tag type="h">Homolog</Tag></td>
            <td className="cell-homolog"><Tag type="h">Homolog</Tag></td>
            <td className="cell-prod"><Tag type="p">Produção</Tag></td>
            <td className="cell-prod" style={{ borderRight: "2px solid #0d3060" }}><Tag type="p">Produção</Tag></td>
            <td /><td /><td /><td />
          </tr>
          <tr>
            <td className="produto-name">Animallis</td>
            <td /><td /><td />
            <td style={{ borderRight: "2px solid #0d3060" }} />
            <td className="cell-homolog"><Tag type="h">Homolog</Tag></td>
            <td className="cell-homolog"><Tag type="h">Homolog</Tag></td>
            <td className="cell-prod"><Tag type="p">Produção</Tag></td>
            <td className="cell-prod" style={{ borderRight: "2px solid #0d3060" }}><Tag type="p">Produção</Tag></td>
            <td /><td /><td /><td />
          </tr>
          <tr>
            <td className="produto-name">Integre</td>
            <td /><td /><td />
            <td style={{ borderRight: "2px solid #0d3060" }} /><td />
            <td className="cell-homolog"><Tag type="h">Homolog</Tag></td>
            <td className="cell-homolog"><Tag type="h">Homolog</Tag></td>
            <td className="cell-prod" style={{ borderRight: "2px solid #0d3060" }}><Tag type="p">Produção</Tag></td>
            <td className="cell-prod"><Tag type="p">Produção</Tag></td>
            <td /><td /><td />
          </tr>
          <tr>
            <td className="produto-name">Painel Administrativo</td>
            <td /><td /><td />
            <td style={{ borderRight: "2px solid #0d3060" }} /><td />
            <td className="cell-homolog"><Tag type="h">Homolog</Tag></td>
            <td className="cell-homolog"><Tag type="h">Homolog</Tag></td>
            <td className="cell-prod" style={{ borderRight: "2px solid #0d3060" }}><Tag type="p">Produção</Tag></td>
            <td className="cell-prod"><Tag type="p">Produção</Tag></td>
            <td /><td /><td />
          </tr>
          <tr>
            <td className="produto-name">Minha Conta Web</td>
            <td /><td /><td />
            <td style={{ borderRight: "2px solid #0d3060" }} /><td /><td /><td />
            <td style={{ borderRight: "2px solid #0d3060" }} />
            <td className="cell-homolog"><Tag type="h">Homolog</Tag></td>
            <td className="cell-homolog"><Tag type="h">Homolog</Tag></td>
            <td className="cell-prod"><Tag type="p">Produção</Tag></td>
            <td className="cell-prod"><Tag type="p">Produção</Tag></td>
          </tr>
          <tr>
            <td className="produto-name">Allis</td>
            <td /><td /><td />
            <td style={{ borderRight: "2px solid #0d3060" }} /><td /><td /><td />
            <td style={{ borderRight: "2px solid #0d3060" }} />
            <td className="cell-homolog"><Tag type="h">Homolog</Tag></td>
            <td className="cell-homolog"><Tag type="h">Homolog</Tag></td>
            <td className="cell-prod"><Tag type="p">Produção</Tag></td>
            <td className="cell-prod"><Tag type="p">Produção</Tag></td>
          </tr>
          <tr>
            <td className="produto-name">Demais produtos</td>
            <td /><td /><td />
            <td style={{ borderRight: "2px solid #0d3060" }} /><td /><td /><td />
            <td style={{ borderRight: "2px solid #0d3060" }} />
            <td className="cell-homolog"><Tag type="est">A definir</Tag></td>
            <td className="cell-homolog"><Tag type="est">A definir</Tag></td>
            <td className="cell-prod"><Tag type="est">A definir</Tag></td>
            <td className="cell-prod"><Tag type="est">A definir</Tag></td>
          </tr>
        </tbody>
      </table>

      <div className="legend">
        <div className="legend-item">
          <div className="legend-dot" style={{ background: "#c2e8d2", border: "1px solid #8bcfaa" }} />
          Migração em homologação
        </div>
        <div className="legend-item">
          <div className="legend-dot" style={{ background: "#b8d9f5", border: "1px solid #7ab8e8" }} />
          Migração em produção
        </div>
        <div className="legend-item">
          <div className="legend-dot" style={{ background: "#ffe0b2", border: "1px solid #ffb74d" }} />
          Bucket Azure ativo (Laudos – a partir de 01/04)
        </div>
        <div className="legend-item">
          <div className="legend-dot" style={{ background: "#e8e8e8", border: "1px solid #ccc" }} />
          Prazo a definir
        </div>
      </div>

      <Callout>
        <strong>Dinâmica de execução:</strong> cada produto percorre homologação → gate de aprovação → produção antes de o próximo ser priorizado. Os prazos indicados são estimativas iniciais e serão revisados conforme o andamento de cada produto.
      </Callout>
    </>
  );
}

function FluxoMigracao() {
  return (
    <>
      <h1>Fluxo de Migração – Aplicado a Cada Produto</h1>
      <p>O fluxo de 4 etapas abaixo é executado duas vezes para cada produto: primeiro em homologação e depois em produção. A sequência é fixa – cada etapa é pré-requisito da seguinte.</p>

      <div className="steps">
        <div className="step"><div className="step-num">Etapa 1</div><div className="step-label">Migração dos ambientes</div></div>
        <div className="step"><div className="step-num">Etapa 2</div><div className="step-label">Migração dos bancos de dados</div></div>
        <div className="step"><div className="step-num">Etapa 3</div><div className="step-label">Alteração das strings de conexão</div></div>
        <div className="step"><div className="step-num">Etapa 4</div><div className="step-label">Migração das aplicações</div></div>
      </div>

      <table className="scope">
        <thead>
          <tr>
            <th>Etapa</th>
            <th>Descrição</th>
            <th>Critério de Avanço</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Etapa 1 – Migração dos ambientes</td>
            <td>Provisionar e configurar no Azure a infraestrutura equivalente ao ambiente Verteron do produto: redes (VNet), firewall, IAM, armazenamento (Azure Blob Storage) e demais recursos necessários.</td>
            <td>Infraestrutura provisionada, acessível e validada no Azure para o produto.</td>
          </tr>
          <tr>
            <td>Etapa 2 – Migração dos bancos de dados</td>
            <td>Migrar o banco de dados do produto da Verteron para o Azure, com atualização de versão quando necessário. Todos os bancos MySQL estão na versão 5.7.42, fora de suporte ativo. A versão de destino (8.0 ou 8.4 LTS) deve ser validada com o time de desenvolvimento antes da execução.</td>
            <td>Banco migrado, íntegro, acessível, com testes de regressão aprovados e rollback documentado.</td>
          </tr>
          <tr>
            <td>Etapa 3 – Alteração das strings de conexão</td>
            <td>Com o banco já no Azure, alterar as strings de conexão das aplicações ainda rodando na Verteron para apontar para o banco no novo ambiente, validando operação cruzada.</td>
            <td>Aplicação na Verteron conectada e operando com o banco no Azure sem erros.</td>
          </tr>
          <tr>
            <td>Etapa 4 – Migração das aplicações</td>
            <td>Migrar as aplicações do produto – incluindo serviços de mensageria (RabbitMQ, quando aplicável) e integrações externas – para o Azure, conectando ao banco já migrado. Cutover e validação fim a fim. Ambiente Verteron em standby para rollback.</td>
            <td>Aplicação operando integralmente no Azure. Testes end-to-end aprovados. Critérios de aceite cumpridos.</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

function ServidorSection() {
  return (
    <div className="produto-section">
      <div className="produto-header servidor">
        <h1>Servidor app.lifesys.com.br – Mapeamento de APIs e Produtos</h1>
        <div className="sub">Levantamento das APIs hospedadas no servidor – ativas, de suporte e obsoletas – para orientar a migração</div>
      </div>
      <div className="produto-body">
        <p>O servidor <strong>app.lifesys.com.br</strong> hospeda múltiplas APIs e produtos WMI. O mapeamento abaixo detalha o status de cada pasta, seu vínculo com os produtos do roadmap e a decisão de migração. As APIs obsoletas e inativas serão avaliadas individualmente antes da execução para decidir entre migração ou descarte.</p>

        <CalloutWarn>
          <strong>Ação necessária antes da migração:</strong> as APIs marcadas como "Avaliar" precisam de análise técnica para confirmar se possuem dependências ativas antes de serem descartadas ou migradas. Recomenda-se concluir essa avaliação antes do início da Fase de Homologação do servidor.
        </CalloutWarn>

        <table className="scope">
          <thead>
            <tr>
              <th>Pasta / API</th>
              <th>Status</th>
              <th>Vínculo</th>
              <th>Decisão de Migração</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>laudos</td><td><span className="status-ativo">Ativa</span></td><td>Produto Laudos · Suporte ao Painel Administrativo</td><td>Migrar – contemplada na onda do Laudos (Abril) e do Painel Administrativo (Maio/Junho)</td></tr>
            <tr><td>LaudosWs</td><td><span className="status-ativo">Ativa</span></td><td>Suporte ao produto Laudos – responsável pelo envio de laudos para a internet</td><td>Migrar – contemplada na onda do Laudos (Abril)</td></tr>
            <tr><td>laudosCloud</td><td><span className="status-ativo">Ativa</span></td><td>Suporte ao produto Autolac</td><td>Migrar – contemplada na onda do Autolac (Maio)</td></tr>
            <tr><td>MinhaConta</td><td><span className="status-ativo">Ativa</span></td><td>Suporte ao Painel Administrativo · Minha Conta Web · Laudos · Minha Conta Local</td><td>Migrar – contemplada nas ondas dos produtos que a utilizam</td></tr>
            <tr><td>atendimentoOnline</td><td><span className="status-ativo">Ativa</span></td><td>Produto Animallis</td><td>Migrar – contemplada na onda do Animallis (Maio)</td></tr>
            <tr><td>breedApi</td><td><span className="status-ativo">Ativa</span></td><td>Suporte ao produto Animallis (raças e espécies)</td><td>Migrar – contemplada na onda do Animallis (Maio)</td></tr>
            <tr><td>pacienteApp</td><td><span className="status-ativo">Ativa</span></td><td>Produto Allis</td><td>Migrar – contemplada na onda do Allis (Junho)</td></tr>
            <tr><td>atualizador</td><td><span className="status-ativo">Ativa</span></td><td>Suporte ao produto Autolac</td><td>Migrar – contemplada na onda do Autolac (Maio)</td></tr>
            <tr><td>AutoAtualizador</td><td><span className="status-ativo">Ativa</span></td><td>Suporte ao produto Integre · Interlac (componente do Autolac)</td><td>Migrar – contemplada nas ondas do Integre e do Autolac</td></tr>
            <tr><td>cep</td><td><span className="status-ativo">Ativa</span></td><td>Suporte ao produto Autolac · Painel Administrativo</td><td>Migrar – contemplada nas ondas do Autolac e do Painel Administrativo</td></tr>
            <tr><td>dominio</td><td><span className="status-ativo">Ativa</span></td><td>Suporte ao produto Amplum · Painel Administrativo</td><td>Migrar – contemplada nas ondas do Amplum (Abril) e do Painel Administrativo</td></tr>
            <tr><td>contaAzul</td><td><span className="status-ativo">Ativa</span></td><td>Suporte ao produto Painel Administrativo</td><td>Migrar – contemplada na onda do Painel Administrativo (Maio/Junho)</td></tr>
            <tr><td>SPData</td><td><span className="status-ativo">Ativa</span></td><td>Suporte ao produto Integre – responsável pela comunicação com o RabbitMQ</td><td>Migrar – contemplada na onda do Integre (Maio/Junho)</td></tr>
            <tr><td>assinaPdf</td><td><span className="status-obs">Avaliar</span></td><td>Sem utilização atual · qualquer produto pode utilizar para assinar PDF</td><td>Avaliar necessidade antes de migrar ou descartar</td></tr>
            <tr><td>clinica</td><td><span className="status-inativo">Obsoleta</span></td><td>Produto Meu Consultório – inativo</td><td>Avaliar descarte antes da migração do servidor</td></tr>
            <tr><td>conecte</td><td><span className="status-inativo">Obsoleta</span></td><td>Produto inativo</td><td>Avaliar descarte antes da migração do servidor</td></tr>
            <tr><td>converse</td><td><span className="status-inativo">Obsoleta</span></td><td>Produto inativo</td><td>Avaliar descarte antes da migração do servidor</td></tr>
            <tr><td>dadosmc</td><td><span className="status-inativo">Obsoleta</span></td><td>Produto Meu Consultório – inativo</td><td>Avaliar descarte antes da migração do servidor</td></tr>
            <tr><td>dados-mc</td><td><span className="status-inativo">Obsoleta</span></td><td>Produto Meu Consultório – inativo</td><td>Avaliar descarte antes da migração do servidor</td></tr>
            <tr><td>Fatura</td><td><span className="status-inativo">Obsoleta</span></td><td>Atendimento antigo · Painel Administrativo – inativo</td><td>Avaliar descarte antes da migração do servidor</td></tr>
            <tr><td>mail</td><td><span className="status-inativo">Obsoleta</span></td><td>E-mails do Grupo Sym – inativo</td><td>Avaliar descarte antes da migração do servidor</td></tr>
            <tr><td>minhaContaConect</td><td><span className="status-inativo">Obsoleta</span></td><td>Sem utilização</td><td>Avaliar descarte antes da migração do servidor</td></tr>
            <tr><td>MinhaContaHomologacao</td><td><span className="status-inativo">Obsoleta</span></td><td>Sem utilização</td><td>Avaliar descarte antes da migração do servidor</td></tr>
            <tr><td>PainelControle</td><td><span className="status-inativo">Obsoleta</span></td><td>Sem utilização</td><td>Avaliar descarte antes da migração do servidor</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ProdutoLaudos() {
  return (
    <div className="produto-section">
      <div className="produto-header laudos">
        <h1>Produto Laudos – Abril de 2026</h1>
        <div className="sub">Prioridade 1 &nbsp;|&nbsp; Bucket Azure ativo a partir de 01/04 &nbsp;|&nbsp; Homologação: S2–S3 (07–18/04) &nbsp;|&nbsp; Produção: S4 (28/04)</div>
      </div>
      <div className="produto-body">
        <h2>Objetivo</h2>
        <p>Migrar o produto Laudos da Verteron para o Azure, garantindo continuidade no envio e armazenamento de laudos para a internet. A partir de 1º de abril de 2026, todos os novos laudos enviados para a internet passam a ser armazenados diretamente no bucket Azure em produção, reduzindo significativamente o volume de arquivos a migrar da Verteron no cutover final – que contemplará apenas os laudos gerados até 31 de março de 2026. A API <strong>laudos</strong> também é utilizada pelo Painel Administrativo e será migrada nesta onda.</p>

        <CalloutBucket>
          <strong>Particularidade – Bucket Azure ativo a partir de 01/04/2026:</strong> o bucket Azure Blob Storage para laudos estará ativo em produção desde o início do projeto. Novos laudos já são gravados no Azure a partir desta data. O cutover final migrará apenas os laudos históricos (março para trás), tornando o processo mais rápido e com menor risco de perda de dados.
        </CalloutBucket>

        <h2>APIs e Componentes Envolvidos</h2>
        <table className="scope">
          <thead><tr><th>Componente</th><th>Função</th></tr></thead>
          <tbody>
            <tr><td>laudos</td><td>API principal do produto Laudos · suporte ao Painel Administrativo</td></tr>
            <tr><td>LaudosWs</td><td>Suporte ao Laudos – responsável pelo envio de laudos para a internet</td></tr>
            <tr><td>MinhaConta</td><td>Suporte à autenticação e conta do usuário (compartilhada com outros produtos)</td></tr>
          </tbody>
        </table>

        <h2>Servidores Envolvidos</h2>
        <table className="scope">
          <thead><tr><th>Ambiente</th><th>Servidor</th><th>Tipo</th></tr></thead>
          <tbody>
            <tr><td><PhasePill type="h">Homolog</PhasePill></td><td>homolog.app.lifesys.com.br</td><td>Servidor de aplicação / web</td></tr>
            <tr><td><PhasePill type="h">Homolog</PhasePill></td><td>MySQL - DBServer WMI - Homologação - 18.04</td><td>Banco de dados (requer atualização de SO e MySQL)</td></tr>
            <tr><td><PhasePill type="p">Produção</PhasePill></td><td>app.lifesys.com.br</td><td>Servidor de aplicação / web</td></tr>
            <tr><td><PhasePill type="p">Produção</PhasePill></td><td>MySQL - DBServer WMI - Produção - 18.04</td><td>Banco de dados (requer atualização de SO e MySQL)</td></tr>
          </tbody>
        </table>

        <h2>Timeline</h2>
        <div className="timeline">
          <TlItem
            dotColor="#1a6640"
            label="01/04/2026 – Bucket Azure ativo em produção"
            desc="Criação e ativação do bucket Azure Blob Storage. A partir desta data, todos os novos laudos enviados para a internet são gravados diretamente no Azure."
          />
          <TlItem
            label="Semanas 2–3 de Abril (07/04 – 18/04) – Migração em Homologação"
            desc="Execução das 4 etapas em homologação: provisionamento da infraestrutura, migração e atualização do banco MySQL, alteração das strings de conexão e migração da aplicação. Testes end-to-end."
          />
          <TlItem
            dotColor="#e8a020"
            label="Final da Semana 3 (18/04) – Gate de Aprovação"
            desc="Validação dos critérios de aceite em homologação. Aprovação formal para início da migração em produção."
          />
          <TlItem
            label="Semana 4 de Abril (28/04) – Migração em Produção"
            desc="Execução das 4 etapas em produção. Migração dos laudos históricos (março para trás) da Verteron para o Azure. Cutover final. Testes end-to-end e validação dos critérios de aceite."
          />
          <TlItem
            dotColor="#3a9a6a"
            hasLine={false}
            label="Conclusão – Laudos 100% no Azure"
            labelColor="#1a6640"
            desc="Ambiente Verteron do Laudos em standby para rollback. Após estabilização confirmada, recursos Verteron do Laudos descomissionados."
          />
        </div>
      </div>
    </div>
  );
}

function ProdutoAmplum() {
  return (
    <div className="produto-section">
      <div className="produto-header amplum">
        <h1>Produto Amplum – Abril de 2026</h1>
        <div className="sub">Prioridade 2 &nbsp;|&nbsp; Homologação: S1–S3 (01–18/04) &nbsp;|&nbsp; Produção: S4 (28/04)</div>
      </div>
      <div className="produto-body">
        <h2>Objetivo</h2>
        <p>Migrar o produto Amplum da Verteron para o Azure, seguindo o fluxo padrão de 4 etapas em homologação e, aprovado, em produção. A migração envolve múltiplos servidores de backend, um servidor web/proxy em Ubuntu 18.04 (requer atualização de SO) e o serviço Jitsi de videochamada. As APIs <strong>dominio</strong> (compartilhada com o Painel Administrativo) e <strong>MinhaConta</strong> também serão migradas nesta onda.</p>

        <h2>APIs e Componentes Envolvidos</h2>
        <table className="scope">
          <thead><tr><th>Componente</th><th>Função</th></tr></thead>
          <tbody>
            <tr><td>dominio</td><td>Suporte ao Amplum e ao Painel Administrativo</td></tr>
            <tr><td>MinhaConta</td><td>Suporte à autenticação e conta do usuário (compartilhada com outros produtos)</td></tr>
          </tbody>
        </table>

        <h2>Servidores Envolvidos</h2>
        <table className="scope">
          <thead><tr><th>Ambiente</th><th>Servidor</th><th>Tipo</th></tr></thead>
          <tbody>
            <tr><td><PhasePill type="h">Homolog</PhasePill></td><td>Amplum-Homolog (backend1)</td><td>Servidor de aplicação</td></tr>
            <tr><td><PhasePill type="h">Homolog</PhasePill></td><td>MySQL - DBServer WMI - Homologação - 18.04</td><td>Banco de dados (requer atualização de SO e MySQL)</td></tr>
            <tr><td><PhasePill type="p">Produção</PhasePill></td><td>Amplum-Apache-Nginx (ubuntu18.04)</td><td>Servidor web / proxy (requer atualização de SO)</td></tr>
            <tr><td><PhasePill type="p">Produção</PhasePill></td><td>Amplum-Producao-Backend1</td><td>Servidor de aplicação</td></tr>
            <tr><td><PhasePill type="p">Produção</PhasePill></td><td>Amplum-Producao-Backend2</td><td>Servidor de aplicação</td></tr>
            <tr><td><PhasePill type="p">Produção</PhasePill></td><td>MySQL - DBServer WMI - Produção - 18.04</td><td>Banco de dados (requer atualização de SO e MySQL)</td></tr>
            <tr><td><PhasePill type="p">Produção</PhasePill></td><td>Jitsi-VideoChamada-Amplum</td><td>Servidor de videoconferência (requer validação de portas e rede)</td></tr>
          </tbody>
        </table>

        <h2>Timeline</h2>
        <div className="timeline">
          <TlItem
            label="Semanas 1–3 de Abril (01/04 – 18/04) – Migração em Homologação"
            desc="Execução das 4 etapas em homologação: provisionamento da infraestrutura, migração e atualização do banco MySQL, alteração das strings de conexão e migração do backend de homologação. Testes end-to-end."
          />
          <TlItem
            dotColor="#e8a020"
            label="Final da Semana 3 (18/04) – Gate de Aprovação"
            desc="Validação dos critérios de aceite em homologação. Aprovação formal para início da migração em produção."
          />
          <TlItem
            label="Semana 4 de Abril (28/04) – Migração em Produção"
            desc="Execução das 4 etapas em produção para todos os servidores Amplum, incluindo Jitsi. Cutover final. Testes end-to-end e validação dos critérios de aceite."
          />
          <TlItem
            dotColor="#3a9a6a"
            hasLine={false}
            label="Conclusão – Amplum 100% no Azure"
            labelColor="#3a9a6a"
            desc="Ambiente Verteron do Amplum em standby para rollback. Após estabilização confirmada, recursos Verteron do Amplum descomissionados."
          />
        </div>
      </div>
    </div>
  );
}

function DemaisProdutos() {
  return (
    <div className="produto-section">
      <div className="produto-header demais">
        <h1>Demais Produtos – Maio e Junho de 2026</h1>
        <div className="sub">Autolac (+ Interlac) &nbsp;|&nbsp; Animallis &nbsp;|&nbsp; Integre &nbsp;|&nbsp; Painel Administrativo &nbsp;|&nbsp; Minha Conta Web &nbsp;|&nbsp; Allis &nbsp;|&nbsp; e outros</div>
      </div>
      <div className="produto-body">
        <h2>Objetivo</h2>
        <p>Após a conclusão das migrações de Laudos e Amplum em abril, os demais produtos WMI entram na fila de migração ao longo de maio e junho, seguindo o mesmo fluxo de 4 etapas (homologação → gate → produção). A ordem de priorização dentro deste grupo e o detalhamento de servidores, APIs e timelines serão definidos com base nos aprendizados das ondas anteriores e na capacidade do time.</p>

        <Callout>
          <strong>Planejamento a detalhar:</strong> o escopo detalhado de cada produto deste grupo – servidores, APIs de suporte, ordem de priorização e particularidades técnicas – será documentado em versão atualizada deste projeto ao término da migração do Amplum, incorporando os aprendizados das ondas de abril.
        </Callout>

        <h2>Produtos Previstos</h2>
        <table className="scope">
          <thead>
            <tr>
              <th>Produto</th>
              <th>APIs / Componentes no app.lifesys.com.br</th>
              <th>Previsão</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Autolac (+ Interlac)</td><td>atualizador · AutoAtualizador · cep · laudosCloud</td><td>Maio de 2026</td></tr>
            <tr><td>Animallis</td><td>atendimentoOnline · breedApi</td><td>Maio de 2026</td></tr>
            <tr><td>Integre</td><td>AutoAtualizador · SPData (comunicação RabbitMQ)</td><td>Maio / Junho de 2026</td></tr>
            <tr><td>Painel Administrativo</td><td>laudos · MinhaConta · dominio · cep · contaAzul</td><td>Maio / Junho de 2026</td></tr>
            <tr><td>Minha Conta Web</td><td>MinhaConta</td><td>Junho de 2026</td></tr>
            <tr><td>Allis</td><td>pacienteApp</td><td>Junho de 2026</td></tr>
            <tr><td>Demais produtos</td><td>A identificar</td><td>Maio / Junho de 2026</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="doc">
      <div className="doc-title">Projeto Migração Ambientes e Produtos WMI</div>
      <div className="doc-meta">Versão 1.0 &nbsp;|&nbsp; Elaboração: Ludmila Teles &nbsp;|&nbsp; Abril – Junho de 2026</div>

      <p>O Projeto Migração Ambientes e Produtos WMI tem como objetivo migrar toda a infraestrutura e os produtos WMI, atualmente hospedados na Verteron, para o ambiente Azure, garantindo continuidade operacional, integridade dos dados e ausência de ruptura para os clientes.</p>
      <p>A estratégia adota uma abordagem de migração <strong>por produto</strong>: cada produto percorre seu próprio ciclo completo – homologação e, aprovado, produção – antes de o próximo ser iniciado. O Laudos possui uma particularidade: a partir de <strong>1º de abril de 2026</strong>, todos os novos laudos enviados para a internet já são armazenados diretamente no bucket Azure em produção, reduzindo o volume de dados históricos a migrar da Verteron no cutover final.</p>

      <Roadmap />
      <FluxoMigracao />
      <ServidorSection />
      <ProdutoLaudos />
      <ProdutoAmplum />
      <DemaisProdutos />

      <h1>Considerações Finais</h1>
      <p>Este é o planejamento do Projeto Migração Ambientes e Produtos WMI para Azure, estruturado para garantir controle de risco, rastreabilidade e ausência de impacto operacional. A abordagem por produto permite aprendizado incremental e garante foco em um escopo controlado a cada onda de migração.</p>
      <p>O Laudos lidera com a vantagem do bucket Azure ativo desde 1º de abril. O Amplum segue em paralelo, com cutover de ambos previsto para a semana de 28 de abril. Os demais produtos – incluindo o Allis, recém-incorporado ao roadmap – entram em ondas subsequentes ao longo de maio e junho, com escopo a detalhar após os aprendizados de abril.</p>

      <CalloutWarn>
        <strong>Pontos de atenção:</strong> (1) todos os bancos MySQL estão na versão 5.7.42 e os servidores de banco em Ubuntu 18.04, ambos fora de suporte ativo – a versão de destino deve ser validada antes de abril. (2) As APIs obsoletas hospedadas no app.lifesys.com.br precisam de avaliação de descarte antes da migração do servidor. (3) Servidores Windows e serviços com requisitos especiais de rede (pfSense, Jitsi, mail) requerem planejamento específico antes de sua onda.
      </CalloutWarn>

      <p className="closing-line">Linha de execução: Laudos → Amplum → demais produtos &nbsp;|&nbsp; para cada produto: homologação → gate → produção → descomissionamento Verteron.</p>
    </div>
  );
}

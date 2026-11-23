# LlamaSwap Dashboard

Painel de monitoramento em tempo real para o **LlamaSwap** (`192.168.1.114:8080`).

## Funcionalidades

- 📊 **Status dos Modelos** — Lista todos os modelos com status `CARREGADO` ou `DESCARREGADO`
- 🖥️ **GPU Monitor** — VRAM, temperatura, ventoinha, power draw, utilisation da GPU e RAM do sistema
- 📝 **Logs** — Exibe logs do serviço LlamaSwap
- 🔄 **Auto-refresh** — Atualização automática a cada 3 segundos

## Instalação

**Não precisa de build, script ou dependências.** É um arquivo HTML standalone.

### Opção 1 — Acessar via URL (recomendado)

```bash
# Abra diretamente no navegador
# ou use o servidor dashboard local:
http://127.0.0.1:8899/llamaswap
```

### Opção 2 — Baixar e abrir localmente

```bash
# Clone o repositório
git clone https://github.com/brodrigos/llamaswap-dashboard.git
cd llamaswap-dashboard

# Abra no navegador
start llamaswap-dashboard.html
```

> ⚠️ **Atenção:** Abrir via `file://` pode causar bloqueio de CORS em alguns navegadores. Use o servidor dashboard (`http://127.0.0.1:8899/llamaswap`) para evitar problemas.

## Configuração

Edite o objeto `CONFIG` no topo do HTML para ajustar:

```javascript
const CONFIG = {
    baseUrl: 'http://192.168.1.114:8080',  // Endereço do LlamaSwap
    apiKey: 'turboquant-api-2026'           // Chave de autenticação
};
```

## Como funciona

O dashboard consome duas APIs do LlamaSwap:

| Endpoint | Método | Descrição |
|----------|--------|-----------|
| `/v1/models` | GET | Lista todos os modelos com status (`loaded`/`unloaded`) |
| `/metrics` | GET | Métricas Prometheus (GPU VRAM, temperatura, fan, RAM, CPU) |

## Tecnologias

- **Zero dependências** — HTML + CSS + JavaScript vanilla
- **Sem build** — Funciona em qualquer navegador moderno
- **Single-file** — Um único arquivo, sem assets externos

## Servidor Dashboard (DSH)

Se estiver usando o DSH (DeepSeek Harness), o dashboard já está integrado:

```bash
cd dashboard
node server.mjs
# Acesse: http://127.0.0.1:8899/llamaswap
```

A rota `/llamaswap` serve o arquivo automaticamente, resolvendo problemas de CORS.

## Licença

MIT

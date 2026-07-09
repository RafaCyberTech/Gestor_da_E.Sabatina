# Sistema de Gestão da Escola Sabatina

Aplicação web para a IASD - Canaã, Pemba, com dados partilhados entre
todos os dispositivos (secretaria e membros veem sempre a mesma
informação, esteja onde estiver).

## Requisitos

- **Node.js 22.5 ou mais recente** (usa o módulo nativo `node:sqlite`,
  ainda experimental). Verifique com `node --version`.
- Não é preciso `npm install` — o servidor não usa nenhuma dependência
  externa, só módulos nativos do Node (`http`, `crypto`, `node:sqlite`).

## Como executar localmente

```bash
node server.js
```

Depois abra `http://127.0.0.1:4173` no navegador.

A base de dados fica gravada em `data/escola-sabatina.db` (criada
automaticamente na primeira execução, com os dados de demonstração).

## Contas de demonstração

- `secretario` / `Direcao26` — acesso total (direcção)
- `joaquim`, `maria`, `anselmo`, `lurdes`, `antonio` / `Membro26` — acesso de membro

**Mude estas senhas antes de disponibilizar a aplicação a sério.** Não
há, para já, um ecrã para o próprio utilizador mudar a senha; para
alterar uma senha, apague o ficheiro `data/escola-sabatina.db` (o que
apaga TODOS os dados) ou peça ajuda para adicionar um ecrã de gestão de
senhas.

## Hospedar para acesso pela internet

Como os dados agora vivem no servidor (não no navegador), pode hospedar
isto num serviço como Render, Railway, Fly.io, ou uma VPS própria.
Pontos importantes:

1. **HTTPS é essencial** — como há senhas e dados de membros a circular
   pela internet, nunca exponha isto só em HTTP simples. A maioria dos
   serviços de hospedagem (Render, Railway, Fly.io) já dá HTTPS
   automaticamente. Numa VPS própria, use algo como Caddy ou Nginx com
   Let's Encrypt à frente do `node server.js`.
2. **Guarde a pasta `data/`** — é onde fica a base de dados SQLite com
   todos os membros, presenças, mensagens, etc. Faça cópias de
   segurança regulares desse ficheiro. Em muitos serviços de
   hospedagem, o disco não é permanente por padrão — confirme que o seu
   plano tem "disco persistente" ou "volume", senão os dados desaparecem
   a cada reinício.
3. **Variável `PORT`** — a maioria dos serviços de hospedagem define
   automaticamente a variável de ambiente `PORT`; o servidor já a lê.
4. **Mude as senhas de demonstração** antes de anunciar o acesso a
   sério (ver secção acima).

## O que está incluído

- Login por perfil (direcção / membro), com sessão partilhada entre
  dispositivos
- Gestão de membros (com criação automática de conta de acesso)
- Presenças por sábado
- Lições e estudos por trimestre
- Requisições de trimestrais
- Programa do próximo sábado
- Classe em destaque com ranking
- Relatórios filtráveis e impressão para PDF
- Comunicação entre membros e direcção

## Arquitectura e permissões

- Os dados partilhados (classes, membros, presenças, lições,
  requisições, relatórios semanais, programas, configurações) só podem
  ser alterados por uma conta de **direcção**. Contas de **membro** têm
  acesso de leitura a estes dados e podem enviar/remover as suas
  próprias mensagens.
- As senhas ficam encriptadas (`scrypt`) na base de dados do servidor —
  nunca em texto simples, nem no código, nem no navegador.
- Cada sessão de login gera um código de acesso próprio (token), válido
  por 30 dias, que fica guardado apenas no dispositivo onde iniciou
  sessão.

## Limitação conhecida

Esta versão usa uma gravação "tudo de uma vez" para os dados da
direcção: se duas pessoas da direcção gravarem alterações ao mesmo
tempo em dispositivos diferentes, a última gravação é que fica valendo
(a outra pode perder-se). Para o uso normal — uma pessoa da secretaria
a gerir os dados de cada vez — isto não costuma ser problema. Se
precisar de edição simultânea por várias pessoas da direcção ao mesmo
tempo, isso exigiria mais trabalho de desenvolvimento (bloqueio por
campo/registo em vez de por documento inteiro).

# Sistema de Gestão da Escola Sabatina

Aplicação web para a IASD - Canaã, Pemba, com dados partilhados entre
todos os dispositivos (secretaria e membros veem sempre a mesma
informação, esteja onde estiver).

## Requisitos

- **Node.js 22.5 ou mais recente** (usa o módulo nativo `node:sqlite`,
  ainda experimental). O servidor verifica isto automaticamente ao
  arrancar e avisa com uma mensagem clara se a versão for antiga.
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

- `DIRECAO` / `@Direcao26` — acesso total (direcção)
- `MEMBRO` / `#Membro26` — acesso de membro

**Mude estas senhas antes de disponibilizar a aplicação a sério.** Cada
utilizador pode mudar a sua própria senha em **Minha Conta**, dentro da
aplicação (menu lateral). A direcção também pode repor a senha de
qualquer conta a partir dessa mesma página, caso alguém esqueça a sua.

## Segurança

- Senhas encriptadas (`scrypt`) no servidor — nunca em texto simples.
- **Protecção contra tentativas repetidas de login**: depois de 5
  tentativas falhadas para o mesmo utilizador, essa conta fica
  bloqueada durante 15 minutos.
- Sessões por token, válidas 30 dias, guardadas apenas no dispositivo
  onde se iniciou sessão.
- Só contas de **direcção** podem alterar membros, presenças, lições,
  requisições, relatórios semanais, programas e configurações. Contas
  de **membro** têm acesso de leitura a estes dados e podem enviar ou
  apagar as suas próprias mensagens — o servidor impõe isto, não é só a
  interface que esconde botões.

## Cópias de segurança automáticas

O servidor faz uma cópia de segurança da base de dados automaticamente
a cada 6 horas (mais uma cópia logo ao arrancar), guardadas em
`data/backups/`. Mantém as últimas 28 cópias (cerca de uma semana) e
apaga as mais antigas automaticamente. Pode ajustar isto com variáveis
de ambiente:

```bash
BACKUP_INTERVAL_HOURS=6 BACKUP_KEEP=28 node server.js
```

Isto complementa, mas não substitui, uma cópia de segurança externa
regular (por exemplo, descarregar o ficheiro `data/escola-sabatina.db`
de vez em quando para um local separado).

## Hospedar para acesso pela internet

Como os dados agora vivem no servidor (não no navegador), pode hospedar
isto num serviço como Render, Railway, Fly.io, ou uma VPS própria.
Pontos importantes:

1. **HTTPS é essencial** — como há senhas e dados de membros a circular
   pela internet, nunca exponha isto só em HTTP simples. A maioria dos
   serviços de hospedagem (Render, Railway, Fly.io) já dá HTTPS
   automaticamente. Numa VPS própria, use algo como Caddy ou Nginx com
   Let's Encrypt à frente do `node server.js`.
2. **Guarde a pasta `data/`** — é onde ficam a base de dados e as
   cópias de segurança automáticas. Confirme que o seu plano de
   hospedagem tem "disco persistente" ou "volume" — em muitos planos
   gratuitos o disco não é permanente e os dados desapareceriam a cada
   reinício.
3. **Variável `PORT`** — a maioria dos serviços de hospedagem define
   automaticamente a variável de ambiente `PORT`; o servidor já a lê.
4. **Mude as senhas de demonstração** antes de anunciar o acesso a
   sério (ver secção "Contas de demonstração" acima).

## O que está incluído

- Login por perfil (direcção / membro), com sessão partilhada entre
  dispositivos, protegida contra tentativas de força bruta
- Mudança de senha pelo próprio utilizador, e reposição de senha pela
  direcção
- Gestão de membros (com criação automática de conta de acesso)
- Presenças por sábado
- Lições e estudos por trimestre
- Requisições de trimestrais
- Programa do próximo sábado
- Classe em destaque com ranking
- Relatórios filtráveis e impressão para PDF
- Visão Geral com gráficos (crescimento de membros, frequência,
  estudo da lição, ofertas) com cores que destacam o desempenho de
  cada sábado
- Comunicação entre membros e direcção
- Cópias de segurança automáticas da base de dados

## Limitação conhecida

Esta versão usa uma gravação "tudo de uma vez" para os dados da
direcção: se duas pessoas da direcção gravarem alterações ao mesmo
tempo em dispositivos diferentes, a última gravação é que fica valendo
(a outra pode perder-se). Para o uso normal — uma pessoa da secretaria
a gerir os dados de cada vez — isto não costuma ser problema. Se
precisar de edição simultânea por várias pessoas da direcção ao mesmo
tempo, isso exigiria mais trabalho de desenvolvimento (bloqueio por
campo/registo em vez de por documento inteiro).

## Logótipos

A aplicação espera encontrar os ficheiros `logo/logo-main.png` e
`logo/logo-secondary.png` na pasta do projecto (crie a pasta `logo/` e
coloque lá os logótipos da igreja). Se preferir usar `.svg` ou outro
formato, ajuste as extensões em `LOGO_MAIN` e `LOGO_SECONDARY` no topo
do `app.js`.

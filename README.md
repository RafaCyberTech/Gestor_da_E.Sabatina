# Sistema de Gestão da Escola Sabatina

Aplicação web para a IASD - Canaã, Pemba, com dados partilhados entre
todos os dispositivos (secretaria e membros veem sempre a mesma
informação, esteja onde estiver).

## Requisitos

- **Node.js 22.5 ou mais recente**.
- Uma base de dados **PostgreSQL/Supabase** e a respetiva `DATABASE_URL`.
- Instale as dependências uma vez com `npm install`.

> ⚠️ **Use a connection string do "Connection pooler" (Supavisor), não a
> "directa".** No painel do Supabase, em *Project Settings → Database →
> Connection string*, existem duas opções. A ligação **directa**
> (`db.xxxx.supabase.co:5432`) só responde por **IPv6**, e serviços como o
> Render, Railway ou Fly.io normalmente só têm saída **IPv4** — por isso o
> servidor nunca consegue ligar-se à base de dados e a aplicação fica
> inacessível ("não é possível ligar ao servidor"), mesmo com a
> `DATABASE_URL` correcta. A ligação através do **pooler**
> (algo como `postgresql://postgres.<ref>:<senha>@aws-0-<regiao>.pooler.supabase.com:6543/postgres`)
> funciona por IPv4 e é a que deve usar em produção.

## Como executar localmente

1. Execute [supabase-schema.sql](supabase-schema.sql) no SQL Editor do Supabase.
2. Defina a ligação à base e inicie o servidor:

```bash
DATABASE_URL="postgresql://..." node servidor.js
```

Depois abra `http://127.0.0.1:4173` no navegador.

Os dados ficam guardados na base PostgreSQL configurada. Na primeira execução,
o servidor cria automaticamente a conta inicial — ver "Primeiro acesso" abaixo.

Se o servidor não conseguir ligar-se à base de dados ao arrancar, verá uma
mensagem de erro explicativa no log (por exemplo, no separador "Logs" do
Render) a indicar a causa mais provável.

## Primeiro acesso

A base de dados começa vazia — sem membros, presenças, lições ou
turmas com dados fictícios (só a lista de turmas/classes já vem
configurada, pois essa é a estrutura da própria igreja). Todos os
dados são cadastrados pela direcção conforme forem usando o sistema.

Na primeira vez que o servidor arrancar, é criada automaticamente uma
única conta de acesso:

- `DIRECAO` / `@Direcao26` — acesso total (direcção)

**Mude esta senha antes de disponibilizar a aplicação a sério**, em
**Minha Conta** (menu lateral) assim que entrar pela primeira vez.

Contas de **membro** não precisam de ser criadas à mão: sempre que a
direcção cadastra um novo membro em **Membros**, o sistema cria a
conta de acesso dele automaticamente, usando o **primeiro nome em
minúsculas** como utilizador (ex: "Anabela Muianga" → utilizador
`anabela`) e a senha inicial `Membro26`. Se já existir outro membro
com o mesmo primeiro nome, o sistema acrescenta um número (`anabela2`,
`anabela3`, ...) para o utilizador ser sempre único, e avisa a
direcção qual foi o nome atribuído. Cada membro deve mudar essa senha
inicial em **Minha Conta** assim que entrar pela primeira vez; a
direcção também pode repor a senha de qualquer conta a partir de
**Minha Conta**, caso alguém esqueça a sua.

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

## Cópias de segurança

Os dados vivem no PostgreSQL/Supabase. Configure as cópias de segurança e a
retenção diretamente no serviço de base de dados; este servidor não cria uma
pasta local `data/backups/`.

## Atualizar uma instalação existente

Com uma base Supabase já configurada, execute apenas
[supabase-migration-messages.sql](supabase-migration-messages.sql) no SQL Editor.
Ele adiciona a ligação segura entre cada mensagem e a conta que a enviou.
O [supabase-schema.sql](supabase-schema.sql) é destinado somente a instalações novas.

## Hospedar para acesso pela internet

Como os dados agora vivem no servidor (não no navegador), pode hospedar
isto num serviço como Render, Railway, Fly.io, ou uma VPS própria.
Pontos importantes:

1. **HTTPS é essencial** — como há senhas e dados de membros a circular
   pela internet, nunca exponha isto só em HTTP simples. A maioria dos
   serviços de hospedagem (Render, Railway, Fly.io) já dá HTTPS
   automaticamente. Numa VPS própria, use algo como Caddy ou Nginx com
   Let's Encrypt à frente do `node servidor.js`.
2. **Guarde a `DATABASE_URL` como segredo** no serviço de hospedagem, e
   use a connection string do **pooler do Supabase** (ver aviso na secção
   "Requisitos" acima) — é a causa mais comum de "não é possível ligar ao
   servidor" depois de hospedar no Render/Railway/Fly.io.
   A persistência dos dados é responsabilidade da instância PostgreSQL/Supabase,
   não do disco local do servidor web.
3. **Variável `PORT`** — a maioria dos serviços de hospedagem define
   automaticamente a variável de ambiente `PORT`; o servidor já a lê.
4. **Mude a senha inicial da conta DIRECAO** assim que entrar pela
   primeira vez, antes de anunciar o acesso a sério (ver secção
   "Primeiro acesso" acima).
5. **Se o site ficar inacessível**, veja primeiro os "Logs" do serviço de
   hospedagem: se o servidor nunca chegou a arrancar (não aparece a linha
   "Servidor em http://..."), o problema é quase sempre a ligação à base
   de dados — confirme a `DATABASE_URL` (pooler, não directa) e se o
   projecto Supabase não tem restrições de rede activas (Project Settings
   → Database → Network Restrictions).

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
  cada sábado. A exportação em PDF do Visão Geral e dos Relatórios
  fica visível apenas para a direcção — contas de membro não têm
  acesso a descarregar relatórios.
- Lições Eletrónicas: a direcção partilha fotos, vídeos, PDFs ou
  links (ex: YouTube, Google Drive) das lições da Escola Sabatina.
  Todos os membros podem ver e descarregar; só a direcção pode
  publicar ou remover. Ficheiros até cerca de 22MB — para vídeos
  maiores, recomenda-se partilhar um link em vez de enviar o
  ficheiro.
- Comunicação entre membros e direcção, com chat por conversa numa
  área maior e com scroll próprio
- Dados centralizados no PostgreSQL/Supabase

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

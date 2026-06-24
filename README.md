# Sistema de Gestão da Escola Sabatina

Aplicação web local para a IASD - Canaã, Pemba.

## Como executar

1. Abra a pasta do projecto.
2. Sirva os ficheiros com um servidor local simples.
3. Abra `http://127.0.0.1:4173` no navegador.

Exemplo com Python:

```bash
py -m http.server 4173 --bind 127.0.0.1
```

## Contas de demonstração

- `secretario` / `1234`
- `maria` / `1234`

## O que está incluído

- Login por perfil
- Gestão de membros
- Presenças por sábado
- Lições e estudos por trimestre
- Requisições de trimestrais
- Programa do próximo sábado
- Classe em destaque com ranking
- Relatórios filtráveis e impressão para PDF
- Comunicação entre membros e direcção

## Persistência

Os dados ficam gravados no `localStorage` do navegador.

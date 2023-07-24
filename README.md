# Trybe Futebol Clube

Um projeto para aplicar meus conhecimentos na área de backend e projetar uma api, praticar programação orientada a objeto e princípios SOLID.
A aplicação é Full-Stack e é para calcular a tabela de um campeonato de Futebol por completo.
E um feedback pessoal, foi o projeto que mais me empolgou pela quantidade de requisitos, pratiquei tudo que aprendi no módulo de backend da Trybe e foi recompensador ver o meu nível nessa etapa, e como é a área que pretendo seguir, me senti preparado pra aprender e me aprofundar cada vez mais.

### o que foi usado:

__*Obs.: Eu Trabalhei na parte backend da aplicação*__
- TypeScript
- TS-Node
- ExpressJs
- Sequelize
- MySql2
- JWT
- BCrypt
- Mocha juntamente com Chai e Sinon para fazer meus testes.

### O que foi desenvolvido:

- Migrations e Models para fazer comunicação com o banco de dados da aplicação;
- Apliquei na prática o TDD(Test Driven Development) e criei testes de integração antes de desenvolver os endpoints;
- Criei diversos middlewares para validar os dados antes de fazer uma requisição;
- Criei endpoints para Times:
    - endpoints GET: 
        1. */teams* que retorna todos os times;
        1. */teams/:id* que retorna um time em específico.
- Criei endpoints para usuários efetuarem o login:
    - endpoints POST:
        1. */login* para fazer login e criar seu token de acesso;
    - endpoints GET:
        1. */login/role* que retorna qual o cargo/função da pessoa a partir do token gerado;
- Criei endpoints para partidas entre times:
    - endpoints GET:
        1. */matches* que retorna uma lista de partidas que estão acontecendo e acoonteceram;
        1. */matches?inProgress=* para filtrar as partidas em andamento ou não;
    *Uma observação, os endpoints abaixo precisam da validação do token de acesso*
    - endpoints PATCH:
        1. */matches/:id/finish* para finalizar uma partida específica em andamento;
        1. */matches/:id* para atualizar a quantidade de gols da partida;
    - endpoints POST:
        1. */matches* para cadastrar um nova partida entre times;
- Criei endpoints para ver a tabela do campeonato, os leaderboards:
    - endpoints GET:
        1. */leaderboard/home* retorna a situação do campeonato com jogos em casa, ele vem em ordem do melhor time para o menos.
        1. */leaderboard/away* retorna a situação do campeonato com jogos fora de cada, ele vem em ordem do melhor time para o menos.
        1. */leaderboard* retorna a situação geral do campeonato.
        00. __obs.: Foi a parte do projeto mais complicada de fazer, porém a mais recompesadora, e todas as tabelas vinham com a seguintes informações: name, totalPoints, totalGames, totalVictories, totalDraws, totalLosses, goalsFavor e goalsOwn.__

### Habilidades desenvolvidas:

- Ganhar mais profiência com Programação Orientada a Objeto;
- Ganhar mais proficiência com TypeScript, que tá sendo a minha linguagem mais querida;
- Utilizar Node para criar uma API juntamente com o ExpressJs;
- Ganhar mais proficiência com o ORM SequelizeJS;
- Utilizar o Sequelize para popular, resgatar e manipular dados de um banco de dados SQL;
- Criar middleware com JWT para criar tokens e verificar os dados dos tokens;
- Juntamente com JWT, usei o Bcrypt para fazer funções de encriptamentos e foi importante pra aprender um pouco sobre segurança de dados.
- Criar fluxos pessoais para soluções de problemas;

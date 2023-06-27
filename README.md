# Teste Técnico Clear Sale

### Como executar as resoluções

### Instale as dependências

```bash
npm i
```

### Rode o exercício 01

```bash
node ./EX01
```

### Rode o exercício 03
```bash
cd EX03 && sh bash.sh && cd ..
```

### Para executar o Docker
```bash
docker compose up -d
```

### Esteira CI/CD
O arquivo de configuração do GitHub Actions está disponível em ./.github/workflows/node.js.yml

Para acessar o Heroku basta acessar o link: https://tt-cs-874cc8acacae.herokuapp.com
Atenção: Devo desativar esse link no dia 04/07/2023 por conta de cobranças da plataforma.

### Configure as variáveis de ambiente
```bash
cp .env.example .env
```

### Testes unitários
```bash
npm run test
```

### Execute a aplicação
```bash
npm run dev
```

### Popule o banco de dados com as seeds
```bash
npm run seed
```

### Se divirtam :)

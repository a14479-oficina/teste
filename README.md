Rotas Básicas: Node.js + Express + MySQLEste repositório contém uma API REST básica criada com Node.js, Express e o driver MySQL2 (utilizando promises). O objetivo é demonstrar as operações CRUD (Create, Read, Update, Delete) num banco de dados.🛠️ Configuração InicialImportaçõesJavaScriptconst express = require('express');
const mysql = require('mysql2/promise');
Inicialização do ServidorJavaScriptconst app = express();
const port = 3000;

// Middleware para permitir que o Express entenda JSON no corpo (body) das requisições
app.use(express.json());
Ligação à Base de DadosJavaScriptconst db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ipo'
});
🗄️ Estrutura da Base de DadosTabela: usersCampos:id (Chave Primária, Auto-incremento)nome (VARCHAR)idade (INT)🛣️ Rotas da API (Endpoints)1. Ver todos os utilizadores (GET)Retorna uma lista com todos os utilizadores registados.JavaScriptapp.get('/users', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM users');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
2. Ver utilizador por ID (GET)Retorna os dados de um utilizador específico com base no ID passado na URL.JavaScriptapp.get('/users/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
3. Adicionar utilizador (POST)Cria um novo utilizador na base de dados recebendo os dados via JSON.JavaScriptapp.post('/users', async (req, res) => {
    try {
        const { nome, idade } = req.body;
        await db.query('INSERT INTO users(nome, idade) VALUES (?, ?)', [nome, idade]);
        res.json({ msg: 'Utilizador adicionado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
4. Atualizar utilizador (PUT)Atualiza os dados de um utilizador existente com base no ID da URL e nos dados enviados no body.JavaScriptapp.put('/users/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { nome, idade } = req.body;
        await db.query('UPDATE users SET nome = ?, idade = ? WHERE id = ?', [nome, idade, id]);
        res.json({ msg: 'Utilizador atualizado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
5. Eliminar utilizador (DELETE)Apaga um utilizador da base de dados através do ID.JavaScriptapp.delete('/users/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await db.query('DELETE FROM users WHERE id = ?', [id]);
        res.json({ msg: 'Utilizador eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
🧠 Conceitos Importantesreq.paramsUsado para capturar parâmetros dinâmicos enviados diretamente na URL.Exemplo de URL: /users/5Código: req.params.idResultado: 5req.bodyUsado para receber dados enviados no corpo da requisição (geralmente em formato JSON) através de métodos como POST e PUT.Exemplo de JSON enviado:JSON{
  "nome": "Leonardo",
  "idade": 17
}
Código: req.body.nome (Retorna "Leonardo")📊 Resumo dos Métodos HTTPMétodoFunçãoExemplo de EndpointGETVer / Procurar/users ou /users/:idPOSTAdicionar / Criar/usersPUTAtualizar / Modificar/users/:idDELETEEliminar / Apagar/users/:id🚀 Inicialização do ServidorPara colocar a API a correr, adiciona a escuta do servidor no final do teu ficheiro:JavaScriptapp.listen(port, () => {
    console.log(`Servidor a executar em http://localhost:${port}`);
});

NODE APP.JS

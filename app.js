// Importa os módulos necessários
const express = require('express');
const mysql = require('mysql2/promise');

// Configuração do servidor e banco de dados
const app = express();
const port = 3001;
app.use(express.json());

// Conexão com o banco de dados
const db = mysql.createPool({
    host: 'localhost',
    user: 'root', // Altere conforme necessário
    password: '', // Altere conforme necessário
    database: 'ipo'
});

// Rota para verificar se está ok !
app.post('/', async (req, res) => {
    try {
        res.json({ msg: 'OK'});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});


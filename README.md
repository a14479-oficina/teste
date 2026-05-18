IMPORTAÇÕES

const express = require('express')
const mysql = require('mysql2/promise')

CRIAR SERVIDOR

const app = express()
const port = 3000

app.use(express.json())

LIGAÇÃO À BASE DE DADOS

const db = mysql.createPool({
host: 'localhost',
user: 'root',
password: '',
database: 'ipo'
})

ESTRUTURA DA TABELA

Tabela: users
Campos: id, nome, idade

ROTAS (ENDPOINTS)

VER UTILIZADORES (GET)
app.get('/users', async (req, res) => {
try {
const [rows] = await db.query('SELECT * FROM users')
res.json(rows)
} catch (error) {
res.status(500).json({ error: error.message })
}
})

VER UTILIZADOR POR ID (GET)
app.get('/users/:id', async (req, res) => {
try {
const id = req.params.id
const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id])
res.json(rows)
} catch (error) {
res.status(500).json({ error: error.message })
}
})

ADICIONAR UTILIZADOR (POST)
app.post('/users', async (req, res) => {
try {
const { nome, idade } = req.body
await db.query('INSERT INTO users(nome, idade) VALUES (?, ?)', [nome, idade])
res.json({ msg: 'Utilizador adicionado' })
} catch (error) {
res.status(500).json({ error: error.message })
}
})

ATUALIZAR UTILIZADOR (PUT)
app.put('/users/:id', async (req, res) => {
try {
const id = req.params.id
const { nome, idade } = req.body
await db.query('UPDATE users SET nome = ?, idade = ? WHERE id = ?', [nome, idade, id])
res.json({ msg: 'Utilizador atualizado' })
} catch (error) {
res.status(500).json({ error: error.message })
}
})

ELIMINAR UTILIZADOR (DELETE)
app.delete('/users/:id', async (req, res) => {
try {
const id = req.params.id
await db.query('DELETE FROM users WHERE id = ?', [id])
res.json({ msg: 'Utilizador eliminado' })
} catch (error) {
res.status(500).json({ error: error.message })
}
})

EXPLICAÇÃO DOS TERMOS

REQ.PARAMS
Usado para receber parâmetros diretamente da URL.
Exemplo: /users/5
Código: req.params.id
Resultado: 5

REQ.BODY
Usado para receber o JSON enviado no corpo da requisição.
Exemplo: {"nome": "Leonardo", "idade": 17}
Código: req.body.nome

MÉTODOS HTTP

GET: Ver / Consultar
POST: Adicionar / Criar
PUT: Atualizar / Editar
DELETE: Eliminar / Apagar

INICIAR O SERVIDOR

app.listen(port, () => {
console.log('Servidor a correr na porta ' + port)
})

Para executar o ficheiro: node app.js

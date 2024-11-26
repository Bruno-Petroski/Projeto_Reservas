import express from "express";
import bodyParser from "body-parser";
import con from "./connecting.js";

const app = new express();
app.use(bodyParser.json());

app.post('/LOCAL', (req, res) => {
    const { nome, capacidade } = req.body;
    if (!nome || !capacidade) {
        return res.status(400).send("Nome e capacidade são obrigatórios.");
    }
    const query = 'INSERT INTO local(nome, capacidade) VALUES (?, ?)';
    con.query(query, [nome, capacidade], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(result);
        }
    });
});

app.post('/EVENTOS', (req, res) => {
    const { nome, data, local_id } = req.body;
    if (!nome || !data || !local_id) {
        return res.status(400).send("Nome, data e ID do local são obrigatórios.");
    }
    const query = 'INSERT INTO eventos(nome, data, local_id) VALUES (?, ?, ?)';
    con.query(query, [nome, data, local_id], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(result);
        }
    });
});

app.post('/PARTICIPANTE', (req, res) => {
    const { nome, email } = req.body;
    if (!nome || !email) {
        return res.status(400).send("Nome, email são obrigatórios.");
    }
    const query = 'INSERT INTO participante(nome, email) VALUES (?, ?)';
    con.query(query, [nome, email], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(result);
        }
    });
});

app.post('/ORGANIZADOR', (req, res) => {
    const { nome, contato } = req.body;
    if (!nome) {
        return res.status(400).send("Nome é obrigatório.");
    }
    const query = 'INSERT INTO Organizador(nome, contato) VALUES (?, ?)';
    con.query(query, [nome, contato], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(result);
        }
    });
});

app.post('/ORGANIZADOR_EVENTO', (req, res) => {
    const { id_organizador, id_evento } = req.body;
    if (!id_organizador || !id_evento) {
        return res.status(400).send("IDs do organizador e do evento são obrigatórios.");
    }
    const query = 'INSERT INTO Organizador_Evento(id_organizador, id_evento) VALUES (?, ?)';
    con.query(query, [id_organizador, id_evento], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(result);
        }
    });
});

app.post('/PARTICIPANTE_EVENTO', (req, res) => {
    const { id_participante, id_evento, data_inscricao } = req.body;
    if (!id_participante || !id_evento || !data_inscricao) {
        return res.status(400).send("IDs do participante, do evento e a data de inscrição são obrigatórios.");
    }
    const query = 'INSERT INTO Participante_Evento(id_participante, id_evento, data_inscricao) VALUES (?, ?, ?)';
    con.query(query, [id_participante, id_evento, data_inscricao], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(result);
        }
    });
});

app.get('/SELECT', async (req, res) => {
    try {
        const queries = {
            local: 'SELECT * FROM local',
            evento: 'SELECT * FROM eventos',
            participante: 'SELECT * FROM participante',
            organizador: 'SELECT * FROM organizador',
            organizador_evento: 'SELECT * FROM organizador_evento',
            participante_evento: 'SELECT * FROM participante_evento',
        };

        const results = {};
        for (const [key, query] of Object.entries(queries)) {
            results[key] = await new Promise((resolve, reject) => {
                con.query(query, (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                });
            });
        }

        res.send(results);
    } catch (err) {
        console.error("Erro ao buscar dados:", err);
        res.status(500).send("Erro ao buscar dados de todas as tabelas.");
    }
});

app.get('/', (req, res) => {
    res.send("Servidor está rodando!");
});

app.listen(3030, () => {
    console.log('Servidor rodando na porta 3030');
});

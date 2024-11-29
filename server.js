import express from "express";
import bodyParser from "body-parser";
import con from "./connecting.js";

const app = new express();
app.use(bodyParser.json());

const executeQuery = (query, params = []) => {
    return new Promise((resolve, reject) => {
        con.query(query, params, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};

//----- Local -----

// Inserir Local
app.post("/local", async (req, res) => {
    const { nome, capacidade } = req.body;
    if (!nome || !capacidade) {
        return res.status(400).send("Nome e capacidade são obrigatórios.");
    }
    try {
        const query = "INSERT INTO Local (nome, capacidade) VALUES (?, ?)";
        const result = await executeQuery(query, [nome, capacidade]);
        res.status(201).send({ id: result.insertId });
    } catch (err) {
        res.status(500).send("Erro ao criar local.");
    }
});

// Select Local
app.get("/local", async (req, res) => {
    try {
        const query = "SELECT * FROM Local";
        const locais = await executeQuery(query);
        res.send(locais);
    } catch (err) {
        res.status(500).send("Erro ao buscar locais.");
    }
});

// Atualizar Local
app.put("/local/:id", async (req, res) => {
    const { id } = req.params;
    const { nome, capacidade } = req.body;
    try {
        const query = "UPDATE Local SET nome = ?, capacidade = ? WHERE ID = ?";
        const result = await executeQuery(query, [nome, capacidade, id]);
        if (result.affectedRows === 0) return res.status(404).send("Local não encontrado.");
        res.send("Local atualizado com sucesso.");
    } catch (err) {
        res.status(500).send("Erro ao atualizar local.");
    }
});

// Excluir Local
app.delete("/local/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const query = "DELETE FROM Local WHERE ID = ?";
        "ALTER TABLE eventos DROP FOREIGN KEY eventos_ibfk_1, ADD CONSTRAINT eventos_ibfk_1 FOREIGN KEY (local_id) REFERENCES local(ID) ON DELETE CASCADE;"
        const result = await executeQuery(query, [id]);
        if (result.affectedRows === 0) return res.status(404).send("Local não encontrado.");
        res.send("Local excluído com sucesso.");
    } catch (err) {
        res.status(500).send("Erro ao excluir local." + err);
    }
});

// ----- Participante -----

// Inserir Participante
app.post("/participante", async (req, res) => {
    const { nome, email } = req.body;
    if (!nome || !email) {
        return res.status(400).send("Nome e email são obrigatórios.");
    }
    try {
        const query = "INSERT INTO Participante (nome, email) VALUES (?, ?)";
        const result = await executeQuery(query, [nome, email]);
        res.status(201).send({ id: result.insertId });
    } catch (err) {
        res.status(500).send("Erro ao criar participante.");
    }
});

// Select Participantes
app.get("/participante", async (req, res) => {
    try {
        const query = "SELECT * FROM Participante";
        const participantes = await executeQuery(query);
        res.send(participantes);
    } catch (err) {
        res.status(500).send("Erro ao buscar participantes.");
    }
});

// Atualizar Participante
app.put("/participante/:id", async (req, res) => {
    const { id } = req.params;
    const { nome, email } = req.body;
    try {
        const query = "UPDATE Participante SET nome = ?, email = ? WHERE ID = ?";
        const result = await executeQuery(query, [nome, email, id]);
        if (result.affectedRows === 0) return res.status(404).send("Participante não encontrado.");
        res.send("Participante atualizado com sucesso.");
    } catch (err) {
        res.status(500).send("Erro ao atualizar participante.");
    }
});

// Excluir Participante
app.delete("/participante/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const query = "DELETE FROM Participante WHERE ID = ?";
        const result = await executeQuery(query, [id]);
        if (result.affectedRows === 0) return res.status(404).send("Participante não encontrado.");
        res.send("Participante excluído com sucesso.");
    } catch (err) {
        res.status(500).send("Erro ao excluir participante.");
    }
});

// ----- Organizador -----

// inseir Organizador
app.post("/organizador", async (req, res) => {
    const { nome, contato } = req.body;
    if (!nome) {
        return res.status(400).send("Nome é obrigatório.");
    }
    try {
        const query = "INSERT INTO Organizador (nome, contato) VALUES (?, ?)";
        const result = await executeQuery(query, [nome, contato]);
        res.status(201).send({ id: result.insertId });
    } catch (err) {
        res.status(500).send("Erro ao criar organizador.");
    }
});

// Select Organizadores
app.get("/organizador", async (req, res) => {
    try {
        const query = "SELECT * FROM Organizador";
        const organizadores = await executeQuery(query);
        res.send(organizadores);
    } catch (err) {
        res.status(500).send("Erro ao buscar organizadores.");
    }
});

// Atualizar Organizador
app.put("/organizador/:id", async (req, res) => {
    const { id } = req.params;
    const { nome, contato } = req.body;
    try {
        const query = "UPDATE Organizador SET nome = ?, contato = ? WHERE ID = ?";
        const result = await executeQuery(query, [nome, contato, id]);
        if (result.affectedRows === 0) return res.status(404).send("Organizador não encontrado.");
        res.send("Organizador atualizado com sucesso.");
    } catch (err) {
        res.status(500).send("Erro ao atualizar organizador.");
    }
});

// Excluir Organizador
app.delete("/organizador/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const query = "DELETE FROM Organizador WHERE ID = ?";
        const result = await executeQuery(query, [id]);
        if (result.affectedRows === 0) return res.status(404).send("Organizador não encontrado.");
        res.send("Organizador excluído com sucesso.");
    } catch (err) {
        res.status(500).send("Erro ao excluir organizador.");
    }
});

app.get('/', (req, res) => {
    res.send("Servidor está rodando!");
});

app.listen(3030, () => {
    console.log('Servidor rodando na porta 3030');
});

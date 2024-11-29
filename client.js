import axios from "axios";
import readline from "readline";

const baseURL = "http://localhost:3030";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function prompt(question) {
    return new Promise((resolve) => {
        rl.question(question, resolve);
    });
}

async function main() {

    let continuar = true;

    while (continuar) {
        try {
            const CRUD = parseInt(
                await prompt("\nEscolha a operação:\n" +
                    "1 - Inserir\n" +
                    "2 - Deletar\n" +
                    "3 - Atualizar\n" +
                    "4 - Selecionar\n" +
                    "0 - Sair\n")
            );

            if (CRUD === 0) {
                continuar = false;
                break;
            }

            const Tabela = await prompt(
                "Escolha a tabela:\n" +
                "1 - Local\n" +
                "2 - Participante\n" +
                "3 - Organizador\n"
            );

            let endpoint;
            switch (parseInt(Tabela)) {
                case 1:
                    endpoint = "local";
                    break;
                case 2:
                    endpoint = "participante";
                    break;
                case 3:
                    endpoint = "organizador";
                    break;
                default:
                    console.log("Tabela inválida!");
                    continue;
            }

            switch (CRUD) {
                case 1:
                    await inserir(endpoint);
                    break;
                case 2:
                    await deletar(endpoint);
                    break;
                case 3:
                    await atualizar(endpoint);
                    break;
                case 4:
                    await select(endpoint);
                    break;
                default:
                    console.log("Opção inválida!");
            }
        } catch (error) {
            console.error("Erro:", error.message || error);
        }
    }
    rl.close();
}

async function inserir(endpoint) {
    const data = {};
    switch (endpoint) {
        case "local":
            data.nome = await prompt("Digite o nome do Local: ");
            data.capacidade = parseInt(await prompt("Digite a capacidade do Local: "));
            break;
        case "participante":
            data.nome = await prompt("Digite o nome do Participante: ");
            data.email = await prompt("Digite o email do Participante: ");
            break;
        case "organizador":
            data.nome = await prompt("Digite o nome do Organizador: ");
            data.contato = await prompt("Digite o contato do Organizador (opcional): ");
            break;
    }

    try {
        const response = await axios.post(`${baseURL}/${endpoint}`, data);
        console.log("Criado com sucesso");
    } catch (err) {
        console.error("Erro ao inserir:", err.response?.data || err.message);
    }
}

async function deletar(endpoint) {
    await select(endpoint);
    const id = parseInt(await prompt(`Digite o ID do ${endpoint} a ser deletado: `));
    try {
        const response = await axios.delete(`${baseURL}/${endpoint}/${id}`);
        console.log("Excluído com sucesso");
    } catch (err) {
        console.error("Erro ao excluir:", err.response?.data || err.message);
    }
}

async function atualizar(endpoint) {
    await select(endpoint);
    const id = parseInt(await prompt(`Digite o ID do ${endpoint} a ser atualizado: `));
    const data = {};
    switch (endpoint) {
        case "local":
            data.nome = await prompt("Digite o novo nome do Local: ");
            data.capacidade = parseInt(await prompt("Digite a nova capacidade do Local: "));
            break;
        case "participante":
            data.nome = await prompt("Digite o novo nome do Participante: ");
            data.email = await prompt("Digite o novo email do Participante: ");
            break;
        case "organizador":
            data.nome = await prompt("Digite o novo nome do Organizador: ");
            data.contato = await prompt("Digite o novo contato do Organizador (opcional): ");
            break;
    }

    try {
        const response = await axios.put(`${baseURL}/${endpoint}/${id}`, data);
        console.log("Atualizado com sucesso");
    } catch (err) {
        console.error("Erro ao atualizar:", err.response?.data || err.message);
    }
}

async function select(endpoint) {
    try {
        const response = await axios.get(`${baseURL}/${endpoint}`);
        console.log(`\n=== Lista de ${endpoint}s ===`);
        console.table(response.data);
    } catch (err) {
        console.error("Erro ao buscar dados:", err.response?.data || err.message);
    }
}

main();

import readline from "readline";
import axios from "axios";

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
    console.log("Bem-vindo ao cliente de inserção!");
    let continuar = true;

    while (continuar) {
        try {
            const tabela = (await prompt("Escolha uma tabela para inserir (LOCAL, EVENTOS, PARTICIPANTE, ORGANIZADOR, ORGANIZADOR_EVENTO, PARTICIPANTE_EVENTO): ")).toUpperCase();

            let payload = {};
            switch (tabela) {
                case "LOCAL":
                    payload.nome = await prompt("Digite o nome do local: ");
                    payload.capacidade = parseInt(await prompt("Digite a capacidade: "), 10);
                    break;
                case "EVENTOS":
                    payload.nome = await prompt("Digite o nome do evento: ");
                    payload.data = await prompt("Digite a data do evento (YYYY-MM-DD): ");
                    payload.local_id = parseInt(await prompt("Digite o ID do local: "), 10);
                    break;
                case "PARTICIPANTE":
                    payload.nome = await prompt("Digite o nome do participante: ");
                    payload.email = await prompt("Digite o email do participante: ");
                    break;
                case "ORGANIZADOR":
                    payload.nome = await prompt("Digite o nome do organizador: ");
                    payload.contato = await prompt("Digite o contato do organizador: ");
                    break;
                case "ORGANIZADOR_EVENTO":
                    payload.id_organizador = parseInt(await prompt("Digite o ID do organizador: "), 10);
                    payload.id_evento = parseInt(await prompt("Digite o ID do evento: "), 10);
                    break;
                case "PARTICIPANTE_EVENTO":
                    payload.id_participante = parseInt(await prompt("Digite o ID do participante: "), 10);
                    payload.id_evento = parseInt(await prompt("Digite o ID do evento: "), 10);
                    payload.data_inscricao = await prompt("Digite a data de inscrição (YYYY-MM-DD): ");
                    break;
                default:
                    console.log("Tabela inválida! Tente novamente.");
                    continue;
            }

            const response = await axios.post(`http://localhost:3030/${tabela}`, payload);
            console.log("Resposta do servidor:", response.data);
        } catch (error) {
            console.error("Erro:", error.response ? error.response.data : error.message);
        }

        const resposta = (await prompt("Deseja continuar inserindo? (sim/não): ")).toLowerCase();
        if (resposta !== "sim") {
            continuar = false;
        }
    }

    console.log("Encerrando cliente...");
    rl.close();
}

main();

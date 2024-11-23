import mysql from "mysql";

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'projeto_m3'
});

export default con;
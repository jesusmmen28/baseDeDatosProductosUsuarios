require("dotenv").config();

const { getConnection } = require("./db");

let connection;

async function main() {
    try {
    connection = await getConnection();

    // Borrar las tablas si existen 
    console.log("Borrando tablas");

    await connection.query("DROP TABLE IF EXISTS Usuarios");
   
     // Crear las tablas de nuevo
     console.log("Creando tablas");

     await connection.query(`
     CREATE TABLE Usuarios (
       id INTEGER PRIMARY KEY AUTO_INCREMENT,
       name VARCHAR(50) NOT NULL,
       surname VARCHAR(50) NOT NULL,
       direccion VARCHAR(100) NOT NULL,
       email VARCHAR(100) NOT NULL
     );
   `);
   
} catch (error) {
    console.error(error);
  } finally {
    console.log("Todo hecho, liberando conexión");
    if (connection) connection.release();
    process.exit();
}
}

main();

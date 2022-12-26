const { getConnection } = require("./db");

const listUsuarios = async (req, res) => {
    // este endpoint es para obtener la lista de participantes 
    // (entendidos como los usuarios dados de alta en el sistema
    // , no confundir con los participantes de una carrera)

    let connection;

    try {
        connection = await getConnection();
        const usuarios = await connection.query('select * from Usuarios;')
        res.send(usuarios[0])
    } catch(err) {
        console.log('ERROR: ', err)
        res.status(500).send()
    } finally {
        if (connection) {
            connection.release()
        }
    }
}

const addUsuarios = async (req, res) => {
    const name = req.body.name
    const surname = req.body.surname
    const direccion = req.body.direccion
    const email = req.body.email
    

    if (name === undefined || surname === undefined || direccion === undefined || email === undefined) {
        res.status(400).send()
        return
    }

    let connection = await getConnection();

    try {
        await connection.query(`
            insert into Usuarios (name, surname, direccion, email) 
            values ("${name}", "${surname}", "${direccion}", "${email}")`)

        res.status(201).send()
    } catch(err) {
        console.log('Error creating Usuarios: ', err)
        res.status(500).send()
        return
    } finally {
        connection.release()
    }
}


module.exports = {
    addUsuarios,
    listUsuarios
}




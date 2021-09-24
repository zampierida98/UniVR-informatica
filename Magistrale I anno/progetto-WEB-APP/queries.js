const dotenv = require('dotenv')
const Pool = require('pg').Pool
const CryptoJS = require('crypto-js')

dotenv.config()

const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT
})

const signup = (req, res) => {
    if (!req.body.password) {
        res.status(400).json({error: "Inserire e confermare la password."})
    } else {
        const bytes = CryptoJS.AES.decrypt(req.body.password, process.env.SECRET)
        const password = bytes.toString(CryptoJS.enc.Utf8)

        pool.connect()
            .then((client) => {
                client.query('INSERT INTO users (username, password) VALUES ($1, $2)', [req.params.username, password])
                    .then((results) => {
                        client.release()
                        res.status(201).json({message: "Nuovo utente creato."})
                    })
                    .catch((err) => {
                        client.release()
                        res.status(400).json({error: "L'username inserito esiste già! Accedi oppure scegli un altro username."})
                    })
            })
            .catch((err) => {
                res.status(500).json({error: err.toString()})
            })
    }
}

const login = (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.status(400).json({error: "Inserire username e password."})
    } else {
        const bytes = CryptoJS.AES.decrypt(req.body.password, process.env.SECRET)
        const password = bytes.toString(CryptoJS.enc.Utf8)

        pool.connect()
            .then((client) => {
                client.query('SELECT * FROM users WHERE username=$1 AND password=$2', [req.body.username, password])
                    .then((results) => {
                        if (results.rows.length === 1) {
                            client.release()
                            res.status(200).json({message: "Login eseguito."})
                        } else {
                            client.release()
                            res.status(400).json({error: "Username o password non corretti."})
                        }
                    })
                    .catch((err) => {
                        res.status(500).json({error: err.toString()})
                    })
            })
            .catch((err) => {
                res.status(500).json({error: err.toString()})
            })
    }
}

//le funzioni prendono in input lo username, la data di riferimento e un oggetto JSON
const hideNotice = (req, res) => {
    if (!req.body.username || !req.body.date || !req.body.notice) {
        res.status(400).json({error: "Informazioni errate."})
    } else {
        pool.connect()
            .then((client) => {
                client.query('INSERT INTO notices (username, data_riferimento, avviso) VALUES ($1,$2,$3)', [req.body.username, req.body.date, req.body.notice])
                    .then((results) => {
                        client.release()
                        res.status(201).json({message: "Inserimento eseguito."})
                    })
                    .catch((err) => {
                        client.release()
                        res.status(500).json({error: err.toString()})
                    });
            })
            .catch((err) => {
                res.status(500).json({error: err.toString()})
            })
    }
}

const hideLesson = (req, res) => {
    if (!req.body.username || !req.body.date || !req.body.lesson) {
        res.status(400).json({error: "Informazioni errate."})
    } else {
        pool.connect()
            .then((client) => {
                client.query('INSERT INTO lessons (username, data_riferimento, lezione) VALUES ($1,$2,$3)', [req.body.username, req.body.date, req.body.lesson])
                    .then((results) => {
                        client.release()
                        res.status(201).json({message: "Inserimento eseguito."})
                    })
                    .catch((err) => {
                        client.release()
                        res.status(500).json({error: err.toString()})
                    });
            })
            .catch((err) => {
                res.status(500).json({error: err.toString()})
            })
    }
}

const hideOfficehours = (req, res) => {
    if (!req.body.username || !req.body.date || !req.body.officehours) {
        res.status(400).json({error: "Informazioni errate."})
    } else {
        pool.connect()
            .then((client) => {
                client.query('INSERT INTO officehours (username, data_riferimento, ricevimento) VALUES ($1,$2,$3)', [req.body.username, req.body.date, req.body.officehours])
                    .then((results) => {
                        client.release()
                        res.status(201).json({message: "Inserimento eseguito."})
                    })
                    .catch((err) => {
                        client.release()
                        res.status(500).json({error: err.toString()})
                    });
            })
            .catch((err) => {
                res.status(500).json({error: err.toString()})
            })
    }
}

//le funzioni prendono in input lo username e la data di riferimento
const getHidedInfo = (req, res) => {
    if (!req.params.username || !req.params.date) {
        res.status(400).json({error: "Informazioni errate."})
    } else {
        const username = req.params.username
        const date = new Date(req.params.date)

        //recupero tutti gli eventi aggiungendo una colonna con valore costante per identificarne il tipo
        pool.connect()
            .then((client) => {
                client.query(`SELECT 'notices' AS tipo, avviso AS info
                              FROM notices
                              WHERE username=$1 AND data_riferimento=$2
                              UNION
                              SELECT 'lessons' AS tipo, lezione AS info
                              FROM lessons
                              WHERE username=$1 AND data_riferimento=$2
                              UNION
                              SELECT 'officehours' AS tipo, ricevimento AS info
                              FROM officehours
                              WHERE username=$1 AND data_riferimento=$2`, [username, date])
                    .then((results) => {
                        client.release()
                        res.status(200).json(results.rows)
                    })
                    .catch((err) => {
                        client.release()
                        res.status(500).json({error: err.toString()})
                    });
            })
            .catch((err) => {
                res.status(500).json({error: err.toString()})
            })
    }
}

//la funzione prende in input lo username, la data di riferimento, il tipo di evento e l'oggetto JSON associato all'evento
const removeEvent = (req, res) => {
    if (!req.body.username || !req.body.date || !req.body.eventType || !req.body.event) {
        res.status(400).json({error: "Informazioni errate."})
    } else {
        let col = null
        switch(req.body.eventType) {
            case 'notices':
                col = "avviso"
                break
            case 'lessons':
                col = "lezione"
                break
            case 'officehours':
                col = "ricevimento"
                break
        }

        pool.connect()
            .then((client) => {
                client.query(`DELETE FROM ${req.body.eventType} WHERE username=$1 AND data_riferimento=$2 AND ${col}=$3`, [req.body.username, req.body.date, req.body.event])
                    .then((results) => {
                        client.release()
                        res.status(200).json({message: "Cancellazione eseguita."})
                    })
                    .catch((err) => {
                        client.release()
                        res.status(500).json({error: err.toString()})
                    });
            })
            .catch((err) => {
                res.status(500).json({error: err.toString()})
            })
    }
}

module.exports = {
    signup,
    login,
    hideNotice,
    hideLesson,
    hideOfficehours,
    getHidedInfo,
    removeEvent
}

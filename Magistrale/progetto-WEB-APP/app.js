const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 8000;
const db = require('./queries');

app.use(express.urlencoded({extended: true})); //to parse URL encoded data
app.use(express.json()); //to parse json data
app.use(cors()); //to allow cors

async function getEventsByDate(g,m,a) {
    try {
        //se si forniscono valori errati l'applicazione ritorna comunque i dati relativi ai valori corretti
        const response = await axios.get(`https://www.di.univr.it/?ent=evento&idDip=30&g=${g}&m=${m}&a=${a}&h=1&out=json`) //h=1 per prendere tutto il giorno
        return response
    } catch(error) {
        console.log(error)
    }
}

//route per accedere agli eventi di una certa data:
app.get('/api/events/:date', (req, res) => {
    const date = new Date(req.params.date)
    const g = date.getDate();
    const m = date.getMonth() + 1;
    const a = date.getFullYear();

    getEventsByDate(g,m,a).then((response) => {
        let text = new String(response.data).trim();

        if(text === "[object Object]") { //se la risposta è già in formato JSON valido la sua rappresentazione in stringa sarà [object Object]
            res.status(200).json(response.data);
        } else { //altrimenti, sostituisco i caratteri non ammessi per il parsing
            let pattern = /new Element\('span'\).set\('html',/g;
            text = text.replace(pattern, '');

            pattern = /\).get\('text'\)/g;
            text = text.replace(pattern, '');

            pattern = /\t/g;
            text = text.replace(pattern, ' ');

            pattern = /\\/g;
            text = text.replace(pattern, '\\\\');

            pattern = /\\\\"/g;
            text = text.replace(pattern, '');

            res.status(200).json(JSON.parse(text));
        }
    })
    .catch((err) => {
        res.status(500).json({error: err.toString()});
    })
});

//routes per registrazione e login (operano sulla collezione degli utenti):
app.put('/api/users/:username', db.signup); //crea un nuovo utente (username è l'identificatore)
app.post('/api/users/', db.login); //riceve informazioni dal client (i dati inseriti nella form di login)

//routes per quando l'utente vuole rimuovere/nascondere un evento:
//creano un nuovo evento (l'identificatore è tutto l'evento)
app.post('/api/notices/', db.hideNotice);
app.post('/api/lessons/', db.hideLesson);
app.post('/api/officehours/', db.hideOfficehours);

//route per recuperare gli eventi di una certa data rimossi da uno specifico utente:
app.get('/api/users/:username/events/:date', db.getHidedInfo);

//route per ricevere un evento di cui l'utente vuole annullare la rimozione:
app.post('/api/events/', db.removeEvent);

//route di default
app.use('*', (req, res) => {
    res.status(404).json({error: "NOT FOUND"});
});

app.listen(port, () => {
    console.log(`Il server è in ascolto sulla porta ${port}`);
});

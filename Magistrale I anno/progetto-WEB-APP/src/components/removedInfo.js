import React, { useEffect, useState } from "react"
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Button from 'react-bootstrap/Button'

import Services from '../services'

import '../index.css'

const prettyTime = (date) => {
    var d = new Date(date)
    return d.toLocaleTimeString(navigator.language, {
        hour: '2-digit',
        minute:'2-digit'
    })
}

const prettyLuogo = (luogo) => {
    return `${luogo["tipo"]} ${luogo["nome"]}, Ca' Vignal ${luogo["idEdificio"]}`
}

const convertToPlainText = (html) => {
    var tmpElement = document.createElement('p')
    tmpElement.innerHTML = html
    return tmpElement.innerText
}

const RemovedInfo = (props) => {
    const [date, setDate] = useState(() => {
        const selDate = localStorage.getItem('date') //recupero la data in memoria
        if(selDate) {
            return JSON.parse(selDate).date
        }
        return props.date
    })
    const [notices, setNotices] = useState([]) //corrispondono ai rispettivi array presenti nei dati json (all'inizio sono vuoti)
    const [lessons, setLessons] = useState([])
    const [officehours, setOfficehours] = useState([])
    const [unhided, setUnhided] = useState(0)

    useEffect(() => {
        async function checkInfo() {
            return Services.getHidedInfo(props.user.username, date)
                    .then((response) => {
                        const info = response.data
                        const notices = []
                        const lessons = []
                        const officehours = []

                        for(let i in info) {
                            //recupero le informazioni dalla risposta di getfinish
                            let type = info[i]["tipo"]
                            let ogg = info[i]["info"]

                            if(type === "notices") {
                                notices.push(ogg)
                            } else if(type === "lessons") {
                                lessons.push(ogg)
                            } else if(type === "officehours") {
                                officehours.push(ogg)
                            }
                        }

                        setNotices(notices)
                        setLessons(lessons)
                        setOfficehours(officehours)
                    })
                    .catch((error) => {
                        console.log(error)
                        setNotices([])
                        setLessons([])
                        setOfficehours([])
                    })
        }

        checkInfo().then(() => console.log("eseguito"), (err) => console.log(err))
    },[unhided])

    //funzione che registra la preferenza di un utente registrato a nascondere un particolare evento
    async function unhideEvent(eventId) {
        if(props.user === null) {
            return
        }

        const eventType = eventId.split('-')[0]
        
        let event = null
        switch(eventType) {
            case 'notices':
                event = notices[eventId[eventId.length-1]]
                break
            case 'lessons':
                event = lessons[eventId[eventId.length-1]]
                break
            case 'officehours':
                event = officehours[eventId[eventId.length-1]]
                break
            default:
                console.log("evento non trovato")
                break
        }
        Services.removeEvent(props.user.username, date, eventType, event)
                .then((response) => {
                    console.log(response.status)
                })
                .catch((error) => {
                    console.log(error)
                })
        
        setUnhided(unhided+1) //fa scattare il refresh
    }

    async function finish() {
        props.selectedDate(date)
        props.history.push('/')
    }

    return (
        <Container>
            <h1>Ciao, {props.user.username}!</h1>
            <p>Se hai cambiato idea sulla rimozione di questi eventi puoi annullare l'azione cliccando sui pulsanti nella colonna 'Annulla'.</p>
            <p>Quando hai finito torna indietro oppure clicca sul pulsante 'Fine' sottostante per tornare alla pagina degli eventi.</p>
            <p><Button onClick={() => finish().then(() => console.log("fine"), (err) => console.log(err))}>Fine</Button></p>
            
            <Tabs defaultActiveKey="avvisi" id="events-tabs">
                <Tab eventKey="avvisi" title="Avvisi">
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Data di pubblicazione</th>
                                <th>Titolo</th>
                                <th>Testo</th>
                                <th>Mittenti</th>
                                <th>Annulla</th>
                            </tr>
                        </thead>
                        <tbody>
                            {notices.map((n, index) => {
                                if (n.length !== 0) {
                                    const dataPubblicazione = new Date(n["dataPubblicazione"]).toLocaleString(navigator.language, {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })
                                    return(
                                        <tr key={`notice-${date}-${index}`}>
                                            <td>{dataPubblicazione}</td>
                                            <td>{n["titolo"]}</td>
                                            <td>{convertToPlainText(n["testo"])}</td>
                                            <td>{n["mittenti"]}</td>
                                            <td className="centerButton">
                                                <Button
                                                    variant="success"
                                                    size="sm"
                                                    aria-label="annulla"
                                                    onClick={() => {
                                                        unhideEvent(`notices-${date}-${index}`).then(() => console.log("ripristinato"), (err) => console.log(err))
                                                    }} //se chiamo solamente la funzione viene eseguito solo alla creazione della riga
                                                >+</Button>
                                            </td>
                                        </tr>
                                    )
                                } else {
                                    return(
                                        <tr key={`notice-${date}-${index}`}></tr>
                                    )
                                }
                            })}
                        </tbody>
                    </Table>
                    {notices.length === 0 ? (<p>Non ci sono avvisi da mostrare!</p>) : (<p></p>)}
                </Tab>
                <Tab eventKey="lezioni" title="Lezioni">
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Insegnamento, Docente, Corso di Studi</th>
                                <th>Ora</th>
                                <th>Luogo</th>
                                <th>Annulla</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lessons.map((l, index) => {
                                //calcolo quali informazioni sono disponibili
                                let nome = null
                                let ora = null
                                let luogo = null
                                if (l.length !== 0) {
                                    nome = l["nome"].replace("##",", ").replace("\\n"," ").replace("@",", ").replace("||","")
                                    if (l["intervallo"].length !== 0) {
                                        ora = `${prettyTime(l["intervallo"][0]["oraInizio"])} - ${prettyTime(l["intervallo"][0]["oraFine"])}`
                                        if (l["intervallo"][0]["luogo"].length !== 0) {
                                            luogo = prettyLuogo(l["intervallo"][0]["luogo"][0])
                                        }
                                    }
                                }
                                return(
                                    <tr key={`lesson-${date}-${index}`}>
                                        {nome ? ( <td>{nome}</td> ) : ( <td></td> )}
                                        {ora ? ( <td>{ora}</td> ) : ( <td></td> )}
                                        {luogo ? ( <td>{luogo}</td> ) : ( <td></td> )}
                                        {nome ? (
                                        <td className="centerButton">
                                            <Button
                                                variant="success"
                                                size="sm"
                                                aria-label="annulla"
                                                onClick={() => {
                                                    unhideEvent(`lessons-${date}-${index}`).then(() => console.log("ripristinato"), (err) => console.log(err))
                                                }}
                                            >+</Button>
                                        </td> ) : ( <td></td> )}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                    {lessons.length === 0 ? (<p>Non ci sono lezioni da mostrare!</p>) : (<p></p>)}
                </Tab>
                <Tab eventKey="ricevimenti" title="Ricevimenti">
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Note</th>
                                <th>Ora</th>
                                <th>Luogo</th>
                                <th>Annulla</th>
                            </tr>
                        </thead>
                        <tbody>
                            {officehours.map((o, index) => {
                                //calcolo quali informazioni sono disponibili
                                let nome = null
                                let note = null
                                let ora = null
                                let luogo = null
                                if (o.length !== 0) {
                                    nome = o["nome"]
                                    note = o["note"]
                                    if (o["intervallo"].length !== 0) {
                                        ora = `${prettyTime(o["intervallo"][0]["oraInizio"])} - ${prettyTime(o["intervallo"][0]["oraFine"])}`
                                        if (o["intervallo"][0]["luogo"].length !== 0) {
                                            luogo = prettyLuogo(o["intervallo"][0]["luogo"][0])
                                        }
                                    }
                                }
                                return(
                                    <tr key={`officehours-${date}-${index}`}>
                                        {nome ? ( <td>{nome}</td> ) : ( <td></td> )}
                                        {note ? ( <td>{convertToPlainText(note)}</td> ) : ( <td></td> )}
                                        {ora ? ( <td>{ora}</td> ) : ( <td></td> )}
                                        {luogo ? ( <td>{luogo}</td> ) : ( <td></td> )}
                                        {nome ? (
                                        <td className="centerButton">
                                            <Button
                                                variant="success"
                                                size="sm"
                                                aria-label="annulla"
                                                onClick={() => {
                                                    unhideEvent(`officehours-${date}-${index}`).then(() => console.log("ripristinato"), (err) => console.log(err))
                                                }}
                                            >+</Button>
                                        </td> ) : ( <td></td> )}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                    {officehours.length === 0 ? (<p>Non ci sono ricevimenti da mostrare!</p>) : (<p></p>)}
                </Tab>
            </Tabs>
        </Container>
    )
}

export default RemovedInfo

import React, { useEffect, useState } from "react"
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

import Services from '../services'

const today = new Date().toISOString().split('T')[0]

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

const Events = (props) => {
    const [date, setDate] = useState(today)
    const [notices, setNotices] = useState([]) //corrispondono ai rispettivi array presenti nei dati json (all'inizio sono vuoti)
    const [lessons, setLessons] = useState([])
    const [officehours, setOfficehours] = useState([])

    const onChangeDate = (e) => {
        const date = e.target.value
        const newDate = new Date(date).toISOString().split('T')[0]
        setDate(newDate)
        props.selectedDate(newDate) //salvo la nuova data anche in memoria
    }

    //quando renderizzo la pagina mostro gli eventi relativi alla data corrente
    //quando il campo date cambia mostro gli eventi relativi a quella data
    useEffect(() => {
        //funzione che recupera i dati dal sito dell'applicazione web degli eventi
        async function retrieveData() {
            return Services.getEvents(date)
                .then((response) => {
                    const events = response.data
                    return {notices: events["notices"], lessons: events["lessons"]["value"], officehours: events["officehours"]["value"]}
                })
                .catch((error) => {
                    console.log(error)
                    return {notices: [], lessons: [], officehours: []}
                })
        }

        retrieveData().then((ev) => {
            setNotices(ev.notices)
            setLessons(ev.lessons)
            setOfficehours(ev.officehours)
        }, (err) => {
            console.log(err)
        })
    },[date])

    return (
        <Container>
            <h1>Ciao!</h1>
            <p>Se vuoi personalizzare questa pagina clicca su 'Registrati' oppure 'Accedi' se ti sei già iscritto a questa applicazione.</p>
            
            <Form.Group className="mb-3" controlId="formCalendar">
                <Form.Label>Seleziona una data dal calendario sottostante per vedere avvisi, lezioni e ricevimenti di quel giorno:</Form.Label>
                <Form.Control
                    className="halfCal"
                    type="date"
                    value={date}
                    onChange={onChangeDate}
                    max={today}
                    required
                />
            </Form.Group>
            
            <Tabs defaultActiveKey="avvisi" id="events-tabs">
                <Tab eventKey="avvisi" title="Avvisi">
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Data di pubblicazione</th>
                                <th>Titolo</th>
                                <th>Testo</th>
                                <th>Mittenti</th>
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
                                        <tr key={`notices-${date}-${index}`}>
                                            <td>{dataPubblicazione}</td>
                                            <td>{n["titolo"]}</td>
                                            <td>{convertToPlainText(n["testo"])}</td>
                                            <td>{n["mittenti"]}</td>
                                        </tr>
                                    )
                                } else {
                                    return(
                                        <tr key={`notices-${date}-${index}`}></tr>
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
                                    <tr key={`lessons-${date}-${index}`}>
                                    {nome ? ( <td>{nome}</td> ) : ( <td></td> )}
                                    {ora ? ( <td>{ora}</td> ) : ( <td></td> )}
                                    {luogo ? ( <td>{luogo}</td> ) : ( <td></td> )}
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

export default Events

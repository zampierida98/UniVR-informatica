import React, { useEffect, useState } from "react"
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Button from 'react-bootstrap/Button'

import Services from '../services'

import '../index.css'

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

const EventsRegUser = (props) => {
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
    const [hided, setHided] = useState(0)

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

        //funzione che controlla se un utente registrato ha espresso la preferenza di rimuovere certi eventi
        async function checkInfo(eventi) {
            const notices = eventi.notices
            const lessons = eventi.lessons
            const officehours = eventi.officehours

            const diversoDaTutti = (saved, toHide) => {
                let res = true
                for(let i in toHide) {
                    if(saved === toHide[i]) {
                        res = false
                        break
                    }
                }
                return res
            }

            //rimuovo le informazioni che l'utente aveva deciso di rimuovere in precedenza
            return Services.getHidedInfo(props.user.username, date)
                .then((response) => {
                    const info = response.data
                    const noticesToHide = []
                    const lessonsToHide = []
                    const officehoursToHide = []

                    for(let i in info) {
                        //recupero le informazioni dalla risposta di getHidedInfo
                        let type = info[i]["tipo"]
                        let ogg = info[i]["info"]

                        if(type === "notices") {
                            noticesToHide.push(ogg["titolo"])
                        } else if(type === "lessons") {
                            lessonsToHide.push(ogg["nome"])
                        } else if(type === "officehours") {
                            officehoursToHide.push(ogg["nome"])
                        }
                    }

                    const newNotices = notices.filter((n) => {
                        return diversoDaTutti(n["titolo"], noticesToHide)
                    })
                    setNotices(newNotices)

                    const newLessons = lessons.filter((l) => {
                        return diversoDaTutti(l["nome"], lessonsToHide)
                    })
                    setLessons(newLessons)

                    const newOfficehours = officehours.filter((o) => {
                        return diversoDaTutti(o["nome"], officehoursToHide)
                    })
                    setOfficehours(newOfficehours)
                })
                .catch((error) => {
                    console.log(error)
                    setNotices(notices)
                    setLessons(lessons)
                    setOfficehours(officehours)
                })
        }

        retrieveData().then((ev) => {
            checkInfo(ev).then(() => console.log("eseguito"), (err) => console.log(err))
        }, (err) => {
            console.log(err)
        })
    },[date,hided])

    //funzione che registra la preferenza di un utente registrato a nascondere un particolare evento
    async function hideEvent(eventId) {
        if(props.user === null) {
            return
        }

        const eventType = eventId.split('-')[0]
        switch(eventType) {
            case 'notices':
                Services.hideNotice(props.user.username, date, notices[eventId[eventId.length-1]])
                        .then((response) => {
                            console.log(response.status)
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                break
            case 'lessons':
                Services.hideLesson(props.user.username, date, lessons[eventId[eventId.length-1]])
                        .then((response) => {
                            console.log(response.status)
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                break
            case 'officehours':
                Services.hideOfficehours(props.user.username, date, officehours[eventId[eventId.length-1]])
                        .then((response) => {
                            console.log(response.status)
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                break
            default:
                console.log("evento non trovato")
                break
        }
        
        setHided(hided+1) //fa scattare il refresh
    }

    async function hidedInfo(d) {
        props.selectedDate(d)
        props.history.push('/hidedInfo')
    }

    return (
        <Container>
            <h1>Ciao, {props.user.username}!</h1>
            <p>Puoi personalizzare la pagina nascondendo avvisi, lezioni e ricevimenti che non ti interessano cliccando sui pulsanti nella colonna 'Rimuovi'.</p>
            <p>Clicca sul bottone sottostante per mostrare le informazioni che hai nascosto in precedenza e avrai la possibilità di ripristinarle:</p>
            <p><Button onClick={() => hidedInfo(date).then(() => console.log("passato"), (err) => console.log(err))}>Info rimosse</Button></p>
            
            <Form>
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
            </Form>

            <Tabs defaultActiveKey="avvisi" id="events-tabs">
                <Tab eventKey="avvisi" title="Avvisi">
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Data di pubblicazione</th>
                                <th>Titolo</th>
                                <th>Testo</th>
                                <th>Mittenti</th>
                                <th>Rimuovi</th>
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
                                            <td className="centerButton">
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    aria-label="rimuovi"
                                                    onClick={() => {
                                                        hideEvent(`notices-${date}-${index}`).then(() => console.log("nascosto"), (err) => console.log(err))
                                                    }} //se chiamo solamente la funzione viene eseguito solo alla creazione della riga
                                                >X</Button>
                                            </td>
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
                                <th>Rimuovi</th>
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
                                        {nome ? (
                                        <td className="centerButton">
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                aria-label="rimuovi"
                                                onClick={() => {
                                                    hideEvent(`lessons-${date}-${index}`).then(() => console.log("nascosto"), (err) => console.log(err))
                                                }}
                                            >X</Button>
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
                                <th>Rimuovi</th>
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
                                                variant="danger"
                                                size="sm"
                                                aria-label="rimuovi"
                                                onClick={() => {
                                                    hideEvent(`officehours-${date}-${index}`).then(() => console.log("nascosto"), (err) => console.log(err))
                                                }}
                                            >X</Button>
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

export default EventsRegUser

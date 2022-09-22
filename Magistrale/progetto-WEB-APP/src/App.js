import React, { useState, useEffect } from 'react'

//react-bootstrap
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

//bootstrap
import "bootstrap/dist/css/bootstrap.min.css"

//routing
import { Switch, Route, Link } from "react-router-dom"

//componenti
import Login from "./components/login"
import SignUp from "./components/signUp"
import Events from "./components/events"
import EventsRegUser from "./components/eventsRegUser"
import RemovedInfo from "./components/removedInfo"

const today = new Date().toISOString().split('T')[0]

function App() {
    const [user, setUser] = useState(() => {
        const loggedInUser = localStorage.getItem('user')
        if(loggedInUser) {
            return JSON.parse(loggedInUser)
        }
        return null
    })
    const [date, setDate] = useState(today)

    async function login(user = null) { //default user = null
        setUser(user)
        localStorage.setItem('user', JSON.stringify(user))
    }

    async function logout() {
        setUser(null)
        localStorage.clear()
    }

    async function selectedDate(d) {
        setDate(d)
        localStorage.setItem('date', JSON.stringify({date: d}))
    }

    useEffect(() => {
        if(user) {
            document.title = `Pagina iniziale - ${user.username} - Eventi UniVR`
        } else {
            document.title = "Pagina iniziale - Eventi UniVR"
        }
    }, [user])

    return (
        <div className="App" role="main">
            <Navbar expand="lg" bg="light" variant="light">
                <Container>
                    <Navbar.Brand href="/">Eventi UniVR</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            { user ? (
                                <Navbar.Text>Sei registrato come: {user.username}</Navbar.Text>
                            ) : (
                                <Link to={"/signup"} className="navLink">Registrati</Link>
                            )}
                        </Nav>
                        <Nav>
                            { user ? (
                                <Nav.Link onClick={logout} href={"/"}>Esci</Nav.Link>
                            ) : (
                                <Link to={"/login"} className="navLink">Accedi</Link>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            
            <Switch>
                <Route exact path="/" render={ (props) =>
                    //login effettuato ? sì=EventsRegUser : no=Events
                    user ? (<EventsRegUser {...props} user={user} date={date} selectedDate={selectedDate} />)
                         : (<Events {...props} selectedDate={selectedDate} />)
                }>
                </Route>
                <Route path="/login" render={ (props) =>
                    <Login {...props} login={login} />
                }>
                </Route>
                <Route path="/signup" render={ (props) =>
                    <SignUp {...props} login={login} />
                }>
                </Route>
                <Route path="/hidedInfo" render={ (props) =>
                    //login effettuato ? sì=RemovedInfo : no=non fa nulla
                    user ? (<RemovedInfo {...props} user={user} date={date} selectedDate={selectedDate} />)
                         : (<Events {...props} selectedDate={selectedDate} />)
                }>
                </Route>
            </Switch>
        </div>
    )
}

export default App

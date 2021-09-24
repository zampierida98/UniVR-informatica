import React, { useEffect, useRef, useState } from "react"
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

import Services from '../services'

const Login = (props) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [show, setShow] = useState(false)
    const [body, setBody] = useState("")

    const editFieldRef = useRef(null)

    useEffect(() => {
        document.title = "Login - Eventi UniVR"
        editFieldRef.current.focus()
    }, [])

    const onChangeUsername = (e) => {
        const username = e.target.value
        setUsername(username)
    }

    const onChangePassword = (e) => {
        const password = e.target.value
        setPassword(password)
    }

    const handleClose = () => {
        //setUsername("")
        setPassword("")
        setShow(false)
    }

    const handleShow = (b) => {
        setBody(b)
        setShow(true)
    }

    const login = () => {
        Services.login(username, password)
                .then((response) => { //codice 200
                    props.login({username: username, password: password}) //si riferisce alla funzione omonima in App
                    props.history.push('/') //torna alla home
                })
                .catch((error) => { //codice 400
                    handleShow(error.response.data.error)
                })
    }

    return(
        <Container>
            <h1>Benvenuto nella pagina di login!</h1>
            <Form>
                <Form.Group className="mb-3" controlId="formUsername">
                    <Form.Label>Inserisci il tuo username:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={onChangeUsername}
                        ref={editFieldRef}
                        aria-required="true"
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Inserisci la tua password:</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={onChangePassword}
                        aria-required="true"
                        onKeyPress={(event) => {
                            if(event.key === "Enter") {
                                login()
                            }
                        }}
                    />
                </Form.Group>
                <Button variant="primary" onClick={login}>
                    Invia
                </Button>
            </Form>

            <Modal
                show={show}
                onHide={handleClose}
                autoFocus
                aria-labelledby="modal-body"
            >
                <Modal.Header closeButton closeLabel="Chiudi">
                    <Modal.Title>Attenzione!</Modal.Title>
                </Modal.Header>
                <Modal.Body id="modal-body">{body}</Modal.Body>
            </Modal>
        </Container>
    )
}

export default Login

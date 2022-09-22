const axios = require('axios')
const CryptoJS = require('crypto-js')

class Services {
    login(username, password) {
        const cipherText = CryptoJS.AES.encrypt(password, 'chiaveSegreta').toString()
        return axios.post('http://localhost:8000/api/users/', {username: username, password: (!password ? "" : cipherText)})
    }

    signup(username, password) {
        const cipherText = CryptoJS.AES.encrypt(password, 'chiaveSegreta').toString()
        return axios.put(`http://localhost:8000/api/users/${username}`, {password: (!password ? "" : cipherText)})
    }

    getEvents(date) {
        return axios.get(`http://localhost:8000/api/events/${date}`)
    }

    hideNotice(username, date, notice) {
        return axios.post('http://localhost:8000/api/notices/', {username: username, date: date, notice: notice})
    }

    hideLesson(username, date, lesson) {
        return axios.post('http://localhost:8000/api/lessons/', {username: username, date: date, lesson: lesson})
    }

    hideOfficehours(username, date, officehours) {
        return axios.post('http://localhost:8000/api/officehours/', {username: username, date: date, officehours: officehours})
    }

    getHidedInfo(username, date) {
        return axios.get(`http://localhost:8000/api/users/${username}/events/${date}`)
    }

    removeEvent(username, date, eventType, event) {
        return axios.post('http://localhost:8000/api/events/', {username: username, date: date, eventType: eventType, event: event})
    }

}

export default new Services()

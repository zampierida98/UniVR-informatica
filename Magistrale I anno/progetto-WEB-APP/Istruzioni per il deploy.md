# Deploy dell'applicazione

## Database
Seguire la guida per configurare un database PostgreSQL su Heroku:
https://dev.to/prisma/how-to-setup-a-free-postgresql-database-on-heroku-1dc1

## Server
Eseguire i prossimi passaggi per effettuare il deploy del server su Heroku:
- Aggiungere alla directory del server un file `Procfile` contenente:
    ```
    web: node app.js
    ```
- Aggiungere il seguente contenuto al file `package.json`:
    ```
    "engines": {
        "node": "14.17.4"
    },
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "start": "node app.js"
    },
    ```
- Aggiungere alla directory del server un file `.gitignore` contenente:
    ```
    node_modules
    .env
    package-lock.json
    ```
- Dare i seguenti comandi:
    > heroku login

    > git init

    > git add .

    > git commit -m "message"

    > heroku create

    > git push heroku main
- Seguire la guida per configurare le variabili d'ambiente del file `.env` in Heroku: https://devcenter.heroku.com/articles/config-vars
- Prestare attenzione a questi possibili problemi: https://stackoverflow.com/questions/15693192/heroku-node-js-error-web-process-failed-to-bind-to-port-within-60-seconds-of, https://github.com/typeorm/typeorm/issues/278#issuecomment-719884406, https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe?rq=1, https://enable-cors.org/server_expressjs.html


## Client
Eseguire i prossimi passaggi per effettuare il deploy del client su Github Pages:
- Nel file `services.js`, sostituire localhost con l'URL generato da Heroku per il server.
- Seguire la guida per capire come fare il deploy su Github Pages gestendo correttamente il routing: https://www.freecodecamp.org/news/deploy-a-react-app-to-github-pages/
- Aggiungere il seguente contenuto nel tag `<head>` del file `index.html` direttamente da Github:
    ```
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
    ```

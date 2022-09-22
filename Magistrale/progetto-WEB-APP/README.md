# Server

## Procedura
- Installare l'ultima versione raccomandata di Node.js (l'applicazione è stata realizzata con la versione 14.17.4).
- Inizializzare un progetto Node.js vuoto mediante il comando `npm init -y`.
- Installare i moduli `express`, `axios`, `cors`, `dotenv`, `pg` e `crypto-js` mediante il comando `npm install`.
- Copiare nella directory del progetto i file `app.js` e `queries.js` presenti in questo repository.

    Nota: è anche richiesto un file `.env` che specifichi i parametri di accesso al database e una chiave segreta per la cifratura delle password.

- Far partire il server (di default sulla porta 8000) mediante il comando `node app.js`.
- Opzionale: installare `nodemon` e Insomnia rispettivamente per semplificare lo sviluppo e per testare la gestione delle richieste.

## Servizi offerti
- Autenticazione con salvataggio delle credenziali su database PostgreSQL (le password verranno criptate dal client e quindi decriptate dal server).
- Salvataggio delle rimozioni su database PostgreSQL tramite 3 funzioni che agiscono su 3 tabelle distinte (a seconda del tipo di evento).
- Recupero delle rimozioni salvate sul database tramite una query che unisce le 3 tabelle.
- Eliminazione delle rimozioni dal database con metodo che prepara la query a seconda del tipo di evento.

Note: il pool di connessioni al database legge i parametri da un file di configurazione `.env`; le query per ricreare lo schema del database si trovano nel file `db-schema.sql`.

Fonti: https://www.tutorialspoint.com/expressjs/expressjs_authentication.htm, https://node-postgres.com/, https://www.npmjs.com/package/crypto-js

## RESTful API
- GET `/api/events/:date`, restituisce gli eventi di una certa data.
- PUT `/api/users/:username`, crea un nuovo utente con username come identificatore solo se passa tutti i controlli.
- POST `/api/users/`, restituisce un messaggio sullo stato del login di un utente effettuando vari controlli.

    Nota: POST trasmette informazioni al server, perciò in questa app viene usato per sottomettere i dati della form di login.

- POST `/api/notices/` o `/api/lessons/` o `/api/officehours/`, crea un nuovo evento con tutto l'evento come identificatore solo se vengono fornite tutte le informazioni richieste.
- GET `/api/users/:username/events/:date`, restituisce gli eventi di una certa data rimossi da uno specifico utente solo se vengono indicate tutte le informazioni necessarie.
- POST `/api/events/`, cancella l'evento di cui l'utente vuole annullare la rimozione solo se vengono fornite tutte le informazioni richieste.

    Nota: DELETE non ammette body, perciò in questa app tale operazione viene trattata come appartenente ad una nuova categoria e viene usato POST proprio per questo motivo.

Fonte: https://www.restapitutorial.com/


# Client

## Procedura
- Creare un nuovo progetto React mediante il comando `npx create-react-app`.
- Installare e importare le librerie Bootstrap mediante il comando `npm install react-bootstrap bootstrap`.
- Installare e importare la libreria per il routing mediante il comando `npm install --save react-router-dom`.

    Nota: assicurarsi poi che il componente App sia racchiuso dentro BrowserRouter per fare in modo che il routing venga gestito correttamente.

- Installare i moduli `axios` e `crypto-js` mediante il comando `npm install`.
- Sostituire le directory `public` e `src` con quelle presenti in questo repository.

    Nota: il file `services.js` usa le definizioni di classe di ES 2015 (gli oggetti sono ancora basati sui prototipi, ma le definizioni sono più semplici).

- Far partire il client (di default sulla porta 3000) mediante il comando `npm start`.


## Componenti dell'interfaccia
- Navbar per utente registrato e non (se si ricarica la pagina l'utente non viene sloggato): pulsante Esci oppure link a pagine di Login e Registrazione.
- Form calendario per cambiare data.
- 3 tabelle gestite con tabs layout per i vari tipi di evento (hanno un attributo `key` unico per le righe della forma `notice/lesson/officehours-data-indice`).
- Pagina Info rimosse raggiungibile tramite apposito pulsante (se si scrive a mano l'URL funziona comunque).

Concetti utilizzati: useState (per collegare HTML e JS nei template JSX), useEffect (per gestire la navigazione), proprietà falsy del null, navigator.language (per la visualizzazione delle date), funzioni async e promesse, memoria del browser (per la persistenza degli utenti registrati).

Fonti: https://reactjs.org/docs/lists-and-keys.html, https://it.reactjs.org/docs/hooks-state.html, https://it.reactjs.org/docs/hooks-effect.html, https://www.freecodecamp.org/news/how-to-persist-a-logged-in-user-in-react/


## Modalità di utilizzo
È possibile:

- Usare semplicemente l'app (componente `events`).
- Registrarsi e accedere per poter salvare le proprie preferenze di visualizzazione su una certa data (componente `eventsRegUser` simile a `events` ma con bottoni per la rimozione e controllo sulle rimozioni salvate + componente `removedInfo` con bottoni che annullano le rimozioni decise dall'utente per una certa data).

### Controllo sulle rimozioni salvate
Sono presenti 3 tabelle in cui ogni riga rappresenta un certo evento; tali righe vengono aggiunte solo se la stringa JSON che rappresenta l'evento non si trova nell'elenco degli eventi nascosti opportunamente recuperato dalla base di dati. Infatti, il database salva tutte le rimozioni che un utente fa nelle varie date, le quali verranno rimosse soltanto dopo precisa azione dell'utente.

### Annullamento rimozione eventi
Sono presenti 3 tabelle in cui ogni riga rappresenta un evento che si trova nell'elenco degli eventi nascosti. Tramite un bottone è possibile annullare la rimozione del relativo evento (un apposito metodo cancella dal database la entry corrispondente controllando tutto il contenuto dell'evento stesso). Una volta che l'utente ha cliccato sul pulsante Fine si ritorna alla componente `eventsRegUser` la quale tornerà a mostrare la pagina relativa alla data appena personalizzata.


## Responsività e CSS personalizzato
- I device mobili si basano sul tag `<meta name="viewport" content="width=device-width, initial-scale=1">` per scalare le dimensioni in pixel in maniera coerente (usare sempre `initial-scale=1` e non usare mai misure basate su pixel).
- Per centrare i bottoni è stato usato un CSS esterno che agisce sulla classe della colonna in cui si trovano (l'attributo `className` è dovuto a React); inoltre, è stato fatto in modo che ogni colonna abbia la prima lettera maiuscola e che il calendario occupi metà dello schermo.
- I margini sono gestiti interamente da `Container` di React Bootstrap (è CSS 4: una scatola flex che dispone al suo interno le scatole secondo una regola data).

Fonti: https://react-bootstrap.github.io/components/navbar/#navbars-mobile-friendly, https://react-bootstrap.github.io/components/table/#table-responsive, https://react-bootstrap.github.io/layout/grid/


## Accessibilità
Per ottenere il livello A:

- Per le form, usare l'attributo `controlId` di `<Form.Group>` e usare `<Form.Label>` per fornire una label che permetterà anche di spostare il focus (verranno poi trasformati rispettivamente in `id` e `for`); usare l'attributo `aria-required="true"` per indicare agli screen readers i campi obbligatori (specialmente se le loro label non lo indicano).
- I bottoni e i link non devono mai essere vuoti perché gli screen readers leggono il testo che contengono.
- Per le finestre modali, usare gli attributi `autoFocus`, `closeButton`, `closeLabel` e `aria-labelledby`.
- Impostare la lingua del documento (`document.documentElement.lang = 'it'` imposta l'italiano).
- Impostare un titolo appropiato per ogni parte dell'interfaccia, modificando di volta in volta `document.title` tramite useEffect.
- Gestire correttamente il focus per permettere una giusta navigazione con la sola tastiera; ad esempio, il focus è già sul primo campo delle form e si sposta nei campi se si clicca la label nel caso di utenti con problemi motori (grazie a useRef e all'attributo `ref`); inoltre, quando un bottone apre una finestra modale, alla sua chiusura il focus torna sul bottone per non disorientare l'utente.
- Gestire correttamente gli eventi della tastiera; ad esempio, quando si preme Invio dopo aver inserito la password si esegue il login (evento `onKeyPress`).

Per ottenere il livello AA:

- Strutturare il contenuto indicando il contenuto principale (tramite l'attributo `role`) e fornendo almeno un'intestazione per ogni pagina dell'applicazione.
- Modificare il colore delle parti di documento identificate come errori di contrasto.
- Controllare che l'interfaccia si adatti correttamente ai cambi di orientazione e di zoom.
- Gestire in modo appropiato gli errori dell'utente; ad esempio, riportare il focus sull'elemento che ha causato l'apertura della finestra modale che descrive l'errore stesso quando essa viene chiusa e cancellare i campi delle form che possono aver causato l'errore (anche per prevenire che quest'ultimo continui a ripresentarsi).

Strumenti automatici (eseguiti per ogni variazione dell'interfaccia):

- [Wave](https://wave.webaim.org/extension/) - ha identificato un problema di contrasto sui link.
- [Axe](https://www.deque.com/axe/) - ha identificato la mancanza di attributi `role` e ARIA per alcuni elementi.
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - ha fornito dei punteggi di accessibilità basandosi su apposite regole in esso codificate.

Checklists utilizzate: https://www.wuhcag.com/wcag-checklist/, https://www.a11yproject.com/checklist/

Fonti: https://webaim.org/techniques/forms/controls, https://webaim.org/techniques/formvalidation/, https://webaim.org/techniques/screenreader/#language, https://webaim.org/techniques/keyboard/, https://reactjs.org/docs/events.html#keyboard-events, https://www.accessibility-developer-guide.com/knowledge/screen-readers/desktop/browse-focus-modes/, https://www.w3.org/TR/wai-aria-practices/examples/landmarks/main.html

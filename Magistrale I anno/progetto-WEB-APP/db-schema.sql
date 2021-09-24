CREATE TABLE users (
	username VARCHAR PRIMARY KEY,
	password VARCHAR NOT NULL
);

CREATE TABLE notices (
	data_riferimento DATE NOT NULL,
	username VARCHAR NOT NULL REFERENCES users,
	avviso jsonb NOT NULL,
	PRIMARY KEY (data_riferimento, username, avviso)
);

CREATE TABLE lessons (
	data_riferimento DATE NOT NULL,
	username VARCHAR NOT NULL REFERENCES users,
	lezione jsonb NOT NULL,
	PRIMARY KEY (data_riferimento, username, lezione)
);

CREATE TABLE officehours (
	data_riferimento DATE NOT NULL,
	username VARCHAR NOT NULL REFERENCES users,
	ricevimento jsonb NOT NULL,
	PRIMARY KEY (data_riferimento, username, ricevimento)
);

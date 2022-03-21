-- https://dbdesigner.page.link/iSug9KAC36Rk4kpG7

CREATE DATABASE "laBoleria";

CREATE EXTENSION IF NOT EXISTS unaccent;

CREATE TABLE cakes (
	id SERIAL NOT NULL,
	name VARCHAR(255) NOT NULL,
	price NUMERIC NOT NULL,
	image VARCHAR(255) NOT NULL UNIQUE,
	description TEXT NOT NULL,
	CONSTRAINT "cakes_pk" PRIMARY KEY (id),
	"flavourId" INTEGER NOT NULL
) WITH (
  OIDS=FALSE
);


CREATE TABLE clients (
	id SERIAL NOT NULL,
	name VARCHAR(255) NOT NULL,
	address VARCHAR(255) NOT NULL,
	phone VARCHAR(11) NOT NULL,
	CONSTRAINT "clients_pk" PRIMARY KEY (id)
) WITH (
  OIDS=FALSE
);


CREATE TABLE orders (
	id SERIAL NOT NULL,
	"clientId" INTEGER NOT NULL,
	"cakeId" INTEGER NOT NULL,
	quantity INTEGER NOT NULL,
	"createdAt" TIMESTAMPTZ NOT NULL,
	"totalPrice" NUMERIC NOT NULL,
	"isDelivered" BOOLEAN DEFAULT FALSE,
	CONSTRAINT "orders_pk" PRIMARY KEY (id)
) WITH (
  OIDS=FALSE
);

CREATE TABLE flavours (
	id SERIAL NOT NULL PRIMARY KEY,
	name VARCHAR(64) NOT NULL
) WITH (
	OIDS=FALSE
);

ALTER TABLE orders ADD CONSTRAINT "orders_fk0" FOREIGN KEY ("clientId") REFERENCES clients(id);
ALTER TABLE orders ADD CONSTRAINT "orders_fk1" FOREIGN KEY ("cakeId") REFERENCES cakes(id);

--ALTER TABLE cakes
--ADD COLUMN "flavourId" INTEGER;

ALTER TABLE cakes ADD CONSTRAINT "cakes_fk0" FOREIGN KEY ("flavourId")
REFERENCES flavours(id);

-- CONNECT DATABASE "laBoleria";
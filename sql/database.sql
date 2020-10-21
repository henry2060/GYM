CREATE DATABASE no_pain_no_gain_gym;
use no_pain_no_gain_gym;


CREATE TABLE cities(
    idcity INT(4) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    cityname VARCHAR(50) NOT NULL,
    city_description VARCHAR(200)
);

INSERT INTO cities (cityname, city_description) VALUES ('Bogota','capital de colombia');
INSERT INTO cities (cityname, city_description) VALUES ('Medellin','ciudad de la eterna primavera');
INSERT INTO cities (cityname, city_description) VALUES ('Barranquilla','casa de la seleccion');
INSERT INTO cities (cityname, city_description) VALUES ('Villavicencio','puerta al llano');
INSERT INTO cities (cityname, city_description) VALUES ('San Andres','isla del caribe colombiano');
INSERT INTO cities (cityname, city_description) VALUES ('Pasto','capital de narino');
INSERT INTO cities (cityname, city_description) VALUES ('Cali','la sucursal del cielo');

CREATE TABLE campus(
    idcampus INT(4) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    idcity INT(4),
    campusname VARCHAR(50) NOT NULL,
    campus_description VARCHAR(200),
    FOREIGN KEY (idcity) REFERENCES cities(idcity)
);

INSERT INTO cities (idcity, campusname, campus_description) VALUES (1,'GYM001','sede principal');
INSERT INTO cities (idcity, campusname, campus_description) VALUES (1,'GYM002','sede secundaria');
INSERT INTO cities (idcity, campusname, campus_description) VALUES (2,'GYM003','primer sede medellin');
INSERT INTO cities (idcity, campusname, campus_description) VALUES (2,'GYM004','segunda sede medellin');
INSERT INTO cities (idcity, campusname, campus_description) VALUES (3,'GYM005','nueva sede');
INSERT INTO cities (idcity, campusname, campus_description) VALUES (4,'GYM006','sede inteligente');
INSERT INTO cities (idcity, campusname, campus_description) VALUES (5,'GYM007','nueva sede colombia');
INSERT INTO cities (idcity, campusname, campus_description) VALUES (6,'GYM008','sede extrema');
INSERT INTO cities (idcity, campusname, campus_description) VALUES (7,'GYM009','sede jumping');
INSERT INTO cities (idcity, campusname, campus_description) VALUES (7,'GYM010','sede joga');
INSERT INTO cities (idcity, campusname, campus_description) VALUES (3,'GYM011','sede full body');
INSERT INTO cities (idcity, campusname, campus_description) VALUES (4,'GYM012','sede relajacion');
INSERT INTO cities (idcity, campusname, campus_description) VALUES (5,'GYM013','sede bailable');
INSERT INTO cities (idcity, campusname, campus_description) VALUES (5,'GYM014','sede 54');


CREATE TABLE users(
    iduser INT(15) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    idcampus INT(4),
    identification VARCHAR(15) NOT NULL,
    identificationtype VARCHAR(4) NOT NULL,
    pass VARCHAR(100),
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    employee BOOLEAN default false,
    loginstate BOOLEAN default false,
    create_at TIMESTAMP,
    update_at TIMESTAMP default CURRENT_TIMESTAMP,
    FOREIGN KEY (idcampus) REFERENCES campus(idcampus)
);

INSERT INTO users (idcampus, identification, identificationtype, pass, firstname, lastname, employee, loginstate, create_at) 
        VALUES (1,'10234384','CC','1234','pepe','aguilar',true,true,CURRENT_TIMESTAMP);
INSERT INTO users (idcampus, identification, identificationtype, pass, firstname, lastname, employee, loginstate, create_at) 
        VALUES (4,'1022324384','CC','4321','joel','smith',true,true,CURRENT_TIMESTAMP);
INSERT INTO users (idcampus, identification, identificationtype, firstname, lastname, loginstate, create_at) 
        VALUES (3,'123244','CC','yully','valantine',false,CURRENT_TIMESTAMP);
INSERT INTO users (idcampus, identification, identificationtype, firstname, lastname, loginstate, create_at) 
        VALUES (1,'1022324384','CC','joe','doe',false,CURRENT_TIMESTAMP);

DELIMITER //
DROP PROCEDURE create_user;
CREATE PROCEDURE create_user
(IN  campus INT(4),
IN  numId VARCHAR(20),
IN  documentType VARCHAR(20),
IN  keyword VARCHAR(20),
IN  firstName VARCHAR(20),
IN  lastName VARCHAR(20),
IN  isEmployee BOOLEAN,
IN isLogged BOOLEAN,
OUT message VARCHAR(200),
OUT isCreated BOOLEAN)
proc_label:BEGIN
  DECLARE numUsers INT(3);
  DECLARE exist INT(3);
  SELECT COUNT(iduser) INTO numUsers FROM users WHERE idcampus = campus;
  IF numUsers < 300 THEN
	IF EXISTS( SELECT 1 FROM users where identification = numId) THEN
		SET message = 'el usuario ya existe';
        SET isCreated = false;
        LEAVE proc_label;
	ELSE
		INSERT INTO users (idcampus, identification, identificationtype, pass, firstname, lastname, loginstate, employee, create_at) 
		VALUES (campus, numId, documentType, keyword, firstName, lastName, isEmployee, isLogged, CURRENT_TIMESTAMP);
		SET message = 'Usuario creado exiotsamente';
        SET isCreated = true;
	END IF;	
  ELSE
	SET message = 'No hay cupos para crear un nuevo usuario en la sede seleccionada';
    SET isCreated = false;
    LEAVE proc_label;
  END IF;
END //
DELIMITER ;
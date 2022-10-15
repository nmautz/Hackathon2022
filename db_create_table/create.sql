

CREATE TABLE Face(

  f_id INT NOT NULL AUTO_INCREMENT, 
  name varchar(15) NOT NULL,
  path varchar(30) NOT NULL,

  primary key (f_id)
);

CREATE TABLE Video(

  v_id int NOT NULL AUTO_INCREMENT,
  path varchar(30) NOT NULL,
  size decimal(15,3) NOT NULL,

  primary key(v_id)
);


CREATE TABLE VideoPeople(

  v_id int NOT NULL,
  f_id int NOT NULL,

  primary key(v_id),

  foreign key (v_id) REFERENCES Video(v_id),
  foreign key (f_id) REFERENCES Face(f_id)

);
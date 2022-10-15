DROP TABLE IF EXISTS VideoPeople;
DROP TABLE IF EXISTS Face;
DROP TABLE IF EXISTS Video;



CREATE TABLE Face(

  f_id INT NOT NULL AUTO_INCREMENT, 
  f_name varchar(150) NOT NULL,
  face_path varchar(100) NOT NULL,

  primary key (f_id)
);

CREATE TABLE Video(

  v_id int NOT NULL AUTO_INCREMENT,
  file_path varchar(100) NOT NULL,
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
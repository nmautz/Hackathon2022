DROP TABLE IF EXISTS VideoPeople;
DROP TABLE IF EXISTS Face;
DROP TABLE IF EXISTS Video;



CREATE TABLE Face(

  f_name varchar(150) NOT NULL,
  face_path varchar(100) NOT NULL,
  confirmed int NOT NULL,

  primary key (face_path),
  CHECK (confirmed = 0 or confirmed = 1) -- Boolean value
);

CREATE TABLE Video(

  file_path varchar(100) NOT NULL,
  size decimal(15,3) NOT NULL,

  primary key(file_path)
);


CREATE TABLE VideoPeople(

  v_path varchar(100) NOT NULL,
  f_path varchar(100) NOT NULL,

  primary key(v_path),

  foreign key (v_path) REFERENCES Video(file_path),
  foreign key (f_path) REFERENCES Face(face_path)

);
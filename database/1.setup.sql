-- No need to create database as it's created by docker on compose 

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  dep TEXT
);

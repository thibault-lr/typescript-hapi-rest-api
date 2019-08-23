-- No need to create database as it's created by docker on compose 

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30),
  department VARCHAR(30),
  login VARCHAR(30),
  password TEXT
);

drop database if exists db_counter;
create database if not exists db_counter;

use db_counter;

drop table if exists t_counter;
create table if not exists t_counter (
  visitation_date datetime default NOW()
);

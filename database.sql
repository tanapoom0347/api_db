-- postgresql
-- database api_db
-- table users123sample_tbl
create table "users123sample_tbl" (
    "id" serial primary key not null,
    "name" varchar(40) not null,
    "email" text unique not null
);

-- Reset the sequence Increment to 1
-- ALTER SEQUENCE users123sample_tbl_id_seq RESTART WITH 1;
-- INSERT USER VALUE
insert into "users123sample_tbl"("name","email") values ('test1','test1@test.com');
insert into "users123sample_tbl"("name","email") values ('test2','test2@test.com');
insert into "users123sample_tbl"("name","email") values ('test3','test3@test.com');
insert into "users123sample_tbl"("name","email") values ('test4','test4@test.com');
insert into "users123sample_tbl"("name","email") values ('test5','test5@test.com');
insert into "users123sample_tbl"("name","email") values ('test6','test6@test.com');
insert into "users123sample_tbl"("name","email") values ('test7','test7@test.com');
insert into "users123sample_tbl"("name","email") values ('test8','test8@test.com');
insert into "users123sample_tbl"("name","email") values ('test9','test9@test.com');
insert into "users123sample_tbl"("name","email") values ('test10','test10@test.com');
insert into "users123sample_tbl"("name","email") values ('test11','test11@test.com');
insert into "users123sample_tbl"("name","email") values ('test12','test12@test.com');
insert into "users123sample_tbl"("name","email") values ('test13','test13@test.com');
insert into "users123sample_tbl"("name","email") values ('test14','test14@test.com');
insert into "users123sample_tbl"("name","email") values ('test15','test15@test.com');
insert into "users123sample_tbl"("name","email") values ('test16','test16@test.com');
insert into "users123sample_tbl"("name","email") values ('test17','test17@test.com');
insert into "users123sample_tbl"("name","email") values ('test18','test18@test.com');
insert into "users123sample_tbl"("name","email") values ('test19','test19@test.com');


-- table students123sample_tbl
create table "students123sample_tbl" (
    "id" serial primary key,
    "name" varchar(100) not null,
    "course" varchar(10) not null,
    "email" varchar(50) unique not null,
    "phone" varchar(10) not null
);

-- Reset the sequence Increment to 1
-- SELECT setval(pg_get_serial_sequence('students123sample_tbl', 'id'), COALESCE(max(id) + 1, 1), false) FROM students123sample_tbl;
-- INSERT STUDENT VALUE
insert into "students123sample_tbl" ("name", "course", "email", "phone") values ('ved prakash', 'bca', 'vedprakash@gmail.com', '9879879878');

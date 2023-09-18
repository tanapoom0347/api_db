-- postgresql
-- database api_db
-- table users123sample_tbl
create table "users123sample_tbl" (
    "id" serial primary key,
    "name" varchar(40) not null,
    "email" text unique not null
);

-- Reset the sequence Increment to 1
-- ALTER SEQUENCE users123sample_tbl_id_seq RESTART WITH 1;

-- INSERT USER VALUE
insert into "users123sample_tbl"("name","email") values 
('test1','test1@test.com'),
('test2','test2@test.com'),
('test3','test3@test.com'),
('test4','test4@test.com'),
('test5','test5@test.com');


-- table students123sample_tbl
create table "students123sample_tbl" (
    "id" serial primary key,
    "name" varchar(100) not null,
    "course" varchar(10) not null,
    "email" varchar(50) not null unique,
    "phone" varchar(10) not null,
    "created_at" timestamptz not null,
    "updated_at" timestamptz not null default now()
);

--------------------------------------------------------
-- Set constant created_at (function+trigger) timestamp+timezone
-- 1. Install Function constant created_at for database.
--------------------------------------------------------
-----------FOR CHECK ONLY UPDATE NOT INSERT-------------
-- CREATE FUNCTION correct_update() RETURNS trigger AS $$ 
--     BEGIN
--     NEW.t_date=OLD.t_date;
--     RETURN NEW; 
--     END
-- $$ LANGUAGE plpgsql;
--------------------------------------------------------
--------------------------------------------------------
CREATE OR REPLACE FUNCTION correct_date() RETURNS trigger AS $$ 
    BEGIN
      IF TG_OP = 'INSERT' THEN
         NEW.created_at=now();
      ELSIF TG_OP = 'UPDATE' THEN
         NEW.created_at=OLD.created_at;
      END IF;
      RETURN NEW;
    END
$$ LANGUAGE plpgsql;
--------------------------------------------------------
-- 2. Install 2 Triggers constant created_at for table.
--------------------------------------------------------
--------------------------1-----------------------------
CREATE TRIGGER constant_date_ins
  BEFORE INSERT  ON students123sample_tbl
  FOR EACH ROW
  EXECUTE PROCEDURE correct_date();
--------------------------2-----------------------------
CREATE TRIGGER constant_date_upd
  BEFORE UPDATE ON students123sample_tbl
  FOR EACH ROW
  WHEN (OLD.created_at IS DISTINCT FROM NEW.created_at)
  EXECUTE PROCEDURE correct_date();
--------------------------------------------------------

--------------------------------------------------------
-- Set updated_at (function+trigger) timestamp+timezone
-- 1. Install Function updated_at for database.
--------------------------------------------------------
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
--------------------------------------------------------
-- 2. Install Trigger updated_at for table.
--------------------------------------------------------
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON students123sample_tbl
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();
--------------------------------------------------------

-- Reset the sequence Increment to 1
-- SELECT setval(pg_get_serial_sequence('students123sample_tbl', 'id'), COALESCE(max(id) + 1, 1), false) FROM students123sample_tbl;

-- INSERT STUDENT VALUE
insert into "students123sample_tbl" ("name", "course", "email", "phone") values 
('ved prakash', 'bca', 'vedprakash@gmail.com', '9879879878'),
('test2 tester2', 'vba', 'test2@test.com', '1234567890'),
('test3 tester3', 'cba', 'test3@test.com', '9876543210'),
('test4 tester4', 'vba', 'test4@test.com', '1234123412');
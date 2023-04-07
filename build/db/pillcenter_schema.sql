CREATE DATABASE IF NOT EXISTS pillcenter_db;

DROP USER IF EXISTS 'pillcenter_db_root'@'%';
CREATE USER 'pillcenter_db_root'@'%' IDENTIFIED WITH mysql_native_password BY '318180700';
GRANT ALL ON *.* TO 'pillcenter_db_root'@'%';
FLUSH PRIVILEGES;


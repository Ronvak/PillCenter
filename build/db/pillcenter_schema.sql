CREATE SCHEMA IF NOT EXISTS `pillcenter_db`;

DROP USER IF EXISTS 'pillcenter_db_root'@'%';
CREATE USER 'pillcenter_db_root'@'%' IDENTIFIED WITH mysql_native_password BY 'password';
GRANT ALL ON 'pillcenter_db'@'%'.* TO 'pillcenter_db_root'@'%';
FLUSH PRIVILEGES;


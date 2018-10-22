use event_scheduler;
ALTER TABLE Participate DROP FOREIGN KEY FKParticipat373269;
ALTER TABLE Participate DROP FOREIGN KEY FKParticipat441037;
DROP TABLE IF EXISTS Event;
DROP TABLE IF EXISTS `User`;
DROP TABLE IF EXISTS Participate;
CREATE TABLE Event (
  tid         int(10) NOT NULL AUTO_INCREMENT, 
  title       varchar(50), 
  description varchar(255), 
  date_start  timestamp NOT NULL, 
  date_end    timestamp NULL, 
  location    varchar(255), 
  notes       varchar(255), 
  `public`    tinyint(1), 
  etype       varchar(255), 
  PRIMARY KEY (tid));
CREATE TABLE `User` (
  uid            int(10) NOT NULL AUTO_INCREMENT, 
  name           varchar(50), 
  email          varchar(50), 
  password       varchar(255), 
  email_verified tinyint(1), 
  PRIMARY KEY (uid));
CREATE TABLE Participate (
  Useruid  int(10) NOT NULL, 
  Eventtid int(10) NOT NULL, 
  PRIMARY KEY (Useruid, 
  Eventtid));
ALTER TABLE Participate ADD INDEX FKParticipat373269 (Useruid), ADD CONSTRAINT FKParticipat373269 FOREIGN KEY (Useruid) REFERENCES `User` (uid);
ALTER TABLE Participate ADD INDEX FKParticipat441037 (Eventtid), ADD CONSTRAINT FKParticipat441037 FOREIGN KEY (Eventtid) REFERENCES Event (tid);

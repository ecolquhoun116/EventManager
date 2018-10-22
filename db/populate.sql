use event_scheduler;
insert into event (`title`, `description`, `date_start`, `date_end`, `location`, `notes`, `public`, `etype`)
values('Red & Black', 'This a big description', '2019-10-10 22:00:00', '2019-10-10 00:00:00', 'Your home', 'My note is be red', 0, 'spectacle');
insert into event (`title`, `description`, `date_start`, `date_end`, `location`, `notes`, `public`, `etype`)
values('Orange & White', 'This another big description', '2019-12-10 12:00:00', '2019-12-10 00:00:00', 'My home', 'My note is be orange', 0, 'concert');

insert into user(`name`, `email`, `password`, `email_verified`)
values( 'Jean', 'jean@pas.fr', 'coucou', 1);
insert into user(`name`, `email`, `password`, `email_verified`)
values( 'eric', 'eric@us.fr', 'eric', 1);
insert into user(`name`, `email`, `password`, `email_verified`)
values( 'ian', 'ian@pas.fr', 'ian', 1);
insert into user(`name`, `email`, `password`, `email_verified`)
values( 'patrickson', 'patrickson@pas.fr', 'patrickson', 1);


insert into participate(`Useruid`,`Eventtid`)
values(2,1);
insert into participate(`Useruid`,`Eventtid`)
values(3,2);
insert into participate(`Useruid`,`Eventtid`)
values(4,2);
create table NOTE (
    id int auto_increment,
    subject varchar(300),
    content text,
    type varchar(64),
    date datetime,
    primary key (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_bin;
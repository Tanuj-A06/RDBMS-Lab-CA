create table delivery_partners(
id INTEGER unique primary key,
name VARCHAR(50),
contact NUMERIC(10),
email VARCHAR(50),
vehicle_no VARCHAR(10)
);

create table restaurants(
id INTEGER unique primary key,
name VARCHAR(50),
contact NUMERIC(10),
email VARCHAR(50),
address VARCHAR(100)
);

create table customers(
id INTEGER unique primary key,
contact NUMERIC(10),
email VARCHAR(50),
password_hash VARCHAR(64),
address VARCHAR(100),
name VARCHAR(50)
);

create table dishes(
id INTEGER unique primary key,
restaurent_id INTEGER not null,
name VARCHAR(50),
price INTEGER,
description VARCHAR(100),
quantity VARCHAR(500),
foreign key (restaurent_id) references restaurants(id)
);

create table orders(
id INTEGER unique primary key,
restaurent_id INTEGER not null,
customer_id INTEGER not null,
delivery_partners_id INTEGER not null,
status VARCHAR(100),
payment BOOLEAN,
foreign key (restaurent_id) references restaurants(id),
foreign key (customer_id) references customers(id),
foreign key (delivery_partners_id) references delivery_partners(id)
);

create table reviews(
id INTEGER unique primary key,
restaurent_id INTEGER not null,
customer_id INTEGER not null,
description VARCHAR(100),
foreign key (restaurent_id) references restaurants(id),
foreign key (customer_id) references customers(id)
);
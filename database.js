var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/chat';

var client = new pg.Client(connectionString);
client.connect();
// "user" is quoted because it is a reserved word
var query = client.query('CREATE TABLE messages(id SERIAL PRIMARY KEY, "user" VARCHAR(40) not null, message TEXT not null, date NUMERIC)');
query.on('end', function() { client.end() });

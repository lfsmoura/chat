var pg = require('pg');
var connectionString = process.env.DATABASE_URL || require('./config').DatabaseUrl;

var client = new pg.Client(connectionString);
client.connect();
var query = client.query('DROP TABLE IF EXISTS messages; CREATE TABLE messages(id SERIAL PRIMARY KEY, username VARCHAR(40) not null, user_id VARCHAR(255), message TEXT not null, date NUMERIC)');
query.on('end', function() { client.end() });

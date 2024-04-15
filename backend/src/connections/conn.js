import pg from 'pg';
const { Client } = pg;

const connectionData = {
  user: 'PostgresRemoto',
  host: '0.tcp.ngrok.io',
  database: 'ChefControlDB',
  password: 'w6P!F64.~bR7',
  port: 10950,
};

const client = new Client(connectionData);
client.connect();

export default client;

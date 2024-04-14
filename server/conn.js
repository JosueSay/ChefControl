const { Pool } = require('pg');

const pool = new Pool({
    host: '0.tcp.ngrok.io',
    port: 10950,
    user: 'PostgresRemoto',
    password: 'w6P!F64.~bR7',
    database: 'ChefControlDB'
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};

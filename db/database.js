const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const SQL = require('sql-template-strings');
const util = require('util');
const env = require('../env/mySQL_env.js');
const compression = require('compression');

app.use(compression());
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('./public'));

function getDbConn(){

    const connection = mysql.createConnection({
        host: env.WORKSHOP_HOST,
        user: env.WORKSHOP_NAME,
        password: env.WORKSHOP_PASS,
        database: 'galvanize'
    });

    const dbConnect = util.promisify(connection.connect.bind(connection));
    const runQuery = util.promisify(connection.query.bind(connection));
    const getEntries = () => runQuery('select * from Entries');
    const addEntry = ({name, pledge, paid}) => runQuery(SQL`INSERT INTO Entries VALUES (null, ${name}, ${pledge}, ${paid});`);
    const removeEntry = ({id}) => runQuery(SQL`DELETE FROM \`galvanize\`.\`Entries\` WHERE (\`idEntry\` = ${id});`);
    const changeEntry = ({id, paid}) => runQuery(SQL`UPDATE \`galvanize\`.\`Entries\` SET \`paid\` = ${paid} WHERE (\`idEntry\` = ${id});`);
    const end = connection.end.bind(connection);


    const dbConn = {
        addEntry,
        getEntries,
        removeEntry,
        changeEntry,
        end
    };

    return dbConnect().then(() => dbConn);
}

app.get('/allEntries', (req, res) => {
    getDbConn().then(conn => {
        return conn.getEntries().then(response => {
           conn.end();
           res.send(response);
        });
    })
    .catch(err => {
        console.log(err);
        res.send(err);
    });
});

app.post('/addPledge', (req, res) => {
    getDbConn().then(conn => {
        return conn.addEntry(req.body).then(response => {
            conn.end();
            res.send(response);
        });
    })
        .catch(err => {
            console.log(err);
            res.send(err);
        });
});

app.put('/updatePledge', (req, res) => {
    getDbConn().then(conn => {
        return conn.changeEntry(req.body).then(response => {
            conn.end();
            res.send(response);
        });
    })
        .catch(err => {
            console.log(err);
            res.send(err);
        });
});

app.delete('/removePledge', (req, res) => {
    getDbConn().then(conn => {
        return conn.removeEntry(req.body).then(response => {
            conn.end();
            res.send(response);
        });
    })
        .catch(err => {
            console.log(err);
            res.send(err);
        });
});

//DELETE FROM `galvanize`.`Entries` WHERE (`idEntry` = '1');
//UPDATE `galvanize`.`Entries` SET `paid` = '50' WHERE (`idEntry` = '1');

app.listen(5500, () => console.log('Database Server Listening on 5500!'));

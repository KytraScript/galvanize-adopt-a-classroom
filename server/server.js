const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.static('./public'));


app.listen(8000, () => console.log('API server listening on port 8000!'));


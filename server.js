require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authenticateAndSync = require('./src/db/sync');
authenticateAndSync();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('json spaces', 2);

require('./src/routes/routes')(app);

app.listen(process.env.PORT||3001, () => {
    console.log(`PORT : ${process.env.PORT||3001}`);
});
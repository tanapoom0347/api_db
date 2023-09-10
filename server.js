require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./src/routes/routes')(app);

app.listen(process.env.PORT||3001, () => {
    console.log(`PORT : ${process.env.PORT||3001}`);
});
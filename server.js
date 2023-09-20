require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const db = require('./src/db/db.mysql.config');
db.init();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('json spaces', 2);

require('./src/routes/routes')(app);

app.listen(process.env.PORT || 3001, () => console.log(`Server running at port ${process.env.PORT || 3001}`));
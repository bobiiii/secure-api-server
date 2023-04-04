const express = require('express');
const cors = require('cors');
const auth = require('./Controllers/auth.controller');
const app = express();
const PORT = 5010;

app.use(cors());
app.use(express.json());

// DATABSE

app.get('/', (req, res) => {
  res.status(200).send('working');
});

app.use('/auth', auth);

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});

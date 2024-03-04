const express = require('express');
require('dotenv').config();

const app = express();

app.get('/', (req, res) => {
    res.send("Hello World!");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
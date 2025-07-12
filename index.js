
const express = require('express');
const app = express();
const PORT = 3001; 

app.get('/', (req, res) => {
  res.send('BISMILLAH MIGRASI NODEJS!');
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
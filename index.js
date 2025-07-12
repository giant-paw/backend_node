const express = require('express');
const cors = require('cors');
const path = require('path'); 
const app = express();
const PORT = 3001; 

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('Server Node.js untuk Gesturku berjalan!');
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
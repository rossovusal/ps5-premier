const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  const filePath = './users.json';
  const users = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath)) : {};

  if (users[username]) return res.status(400).send('İstifadəçi artıq mövcuddur.');

  users[username] = { password };
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
  res.send('Qeydiyyat uğurla tamamlandı!');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const users = JSON.parse(fs.readFileSync('./users.json'));

  if (users[username] && users[username].password === password) {
    res.send('Giriş uğurludur');
  } else {
    res.status(401).send('Yanlış istifadəçi adı və ya şifrə!');
  }
});

app.listen(PORT, () => {
  console.log(`Server işə salındı: http://localhost:${PORT}`);
});

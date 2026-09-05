import bodyParser from 'body-parser';
import express from 'express';

const app = express();

app.use(express.static('images'));
app.use(bodyParser.json());

// CORS

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // allow all domains
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  next();
});

app.get('/check-email-exists', async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const existingEmail = 'test@exmaple.com';

  if (req.body.email === existingEmail) {
    res.status(409).json({ message: 'Already existing email', email: req.body.email });
  } else {
    res.status(200).json({ places: placesData });
  }
});

// 404
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  res.status(404).json({ message: '404 - Not Found' });
});

app.listen(3000, () => {
  console.log('Server started in port: 3000');
});

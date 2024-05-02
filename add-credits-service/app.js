const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const creditRoutes = require('./routes/credits');


app.use('/credits', creditRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
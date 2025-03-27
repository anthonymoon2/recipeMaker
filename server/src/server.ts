import path from 'path';
import express from 'express';
import sequelize from './config/connection.js';
import routes from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Serves static files in the client's dist folder
app.use(express.static(path.resolve('client', 'dist')));

app.use(express.json());
app.use(routes);

// Catch-all route for React Router paths 
app.get('*', (req, res) => {
  res.sendFile(path.resolve('client', 'dist', 'index.html'));
});

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});

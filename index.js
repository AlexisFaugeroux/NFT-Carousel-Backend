import 'dotenv/config';
import http from 'http';
import app from './app/index';

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(() => {
  console.log(`Server is launched at http://localhost:${PORT}`);
});

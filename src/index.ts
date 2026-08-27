import express from 'express';
import type { Request, Response } from 'express';

const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req: Request, res: Response) => {
  res.send('Server Express Berjalan!');
});

app.listen(port, () => {
  console.log(`Server Express berjalan di http://localhost:${port}`);
});
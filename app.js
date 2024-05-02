import express from 'express';
import { env } from 'process';
import router from './router/usersRouter.js';

const app = express();
const PORT = env.PORT || 3000;

app.use(express.json());
app.use('/api', router)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}) 
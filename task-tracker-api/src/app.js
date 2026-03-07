const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth.routes');

dotenv.config();
const app = express();

app.use(express.json());

// ⚡ Register auth routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
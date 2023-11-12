const express = require("express");
const app = express();
const cors = require("cors");
const collegeRoutes = require('./routes/college.routes');

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/colleges', collegeRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

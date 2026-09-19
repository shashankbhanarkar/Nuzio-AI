const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const authRoutes = require("./routes/authRoutes");
const newsRoutes = require("./routes/newsRoutes");

const app = express();


// ==========================================
// MIDDLEWARE
// ==========================================

app.use(cors());

app.use(express.json());


// ==========================================
// ROUTES
// ==========================================

app.use("/api/auth", authRoutes);

app.use("/api/news", newsRoutes);


// ==========================================
// TEST ROUTE
// ==========================================

app.get("/", (req, res) => {

    res.json({
        message: "Nuzio AI backend is running",
    });

});


// ==========================================
// MONGODB
// ==========================================

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {

        console.log(
            "MongoDB connected successfully"
        );

        app.listen(
            process.env.PORT || 5000,
            () => {

                console.log(
                    `Server running on port ${process.env.PORT || 5000
                    }`
                );

            }
        );

    })
    .catch((error) => {

        console.error(
            "MongoDB connection failed:",
            error
        );

    });
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
const PORT = 5000;
const Prediction = require("./models/Prediction");


// console.log(process.env.MONGO_URI);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
  })
  .catch((error) => {
    console.log("❌ MongoDB Connection Failed");
    console.error(error.message);
  });
// ================= Middleware =================
app.use(cors());
app.use(express.json());

// ================= Home Route =================
app.get("/", (req, res) => {
    res.send("Welcome to House Price Prediction Backend");
});

// ================= Predict Price API =================
app.post("/api/predict", async (req, res) => {

    try {

        const {
            location,
            bhk,
            area,
            bathrooms
        } = req.body;

        const predictedPrice = Number((Math.random() * 99 + 1).toFixed(2));

        const prediction = await Prediction.create({

            location,

            bhk,

            area,

            bathrooms,

            predictedPrice

        });

        res.json({

            success: true,

            message: "Prediction Saved Successfully",

            data: prediction

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

});
// ================= Start Server =================
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});// ================= Get All Predictions =================
app.get("/api/entries", async (req, res) => {

    try {

        const predictions = await Prediction.find().sort({ createdAt: 1 });

        res.json({

            success: true,

            data: predictions

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

});

// ================= Update Prediction =================
app.put("/api/entries/:id", async (req, res) => {

    try {

        const updatedPrediction = await Prediction.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new: true,
                runValidators: true
            }

        );

        if (!updatedPrediction) {

            return res.status(404).json({

                success: false,

                message: "Prediction not found"

            });

        }

        res.json({

            success: true,

            message: "Prediction Updated Successfully",

            data: updatedPrediction

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

});

// ================= Delete Prediction =================
app.delete("/api/entries/:id", async (req, res) => {

    try {

        const deletedPrediction = await Prediction.findByIdAndDelete(

            req.params.id

        );

        if (!deletedPrediction) {

            return res.status(404).json({

                success: false,

                message: "Prediction not found"

            });

        }

        res.json({

            success: true,

            message: "Prediction Deleted Successfully"

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

});
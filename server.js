//Express server here.
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const express = require('express');
const app = express();
const Payer  = require('./models');
const Assets = require('./models');

// MongoDB connection string
const dbURI = "mongodb+srv://lifeofcyb:globetrotter@cluster0.mcrlzbg.mongodb.net/URA?retryWrites=true&w=majority";

// Connect to MongoDB
mongoose.connect(dbURI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB", error);
  });

// Function to insert the form data into the MongoDB collection
async function insertFormData(formFields) {
    try {
    const payer = new Payer(formFields);
    await payer.save();
    console.log("Form data inserted successfully");
  } catch (error) {
    console.error("Error inserting form data:", error);
  }
}

// Express middleware to handle the form submission
async function handleFormSubmission(req, res) {
  const formFields = {
    payerName: req.body.payerName,
    dateOfBirth: req.body.dateOfBirth,
    occupation: req.body.occupation,
    gender: req.body.gender,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    annualIncome: req.body.annualIncome,
    tin: generateTIN(req.body.gender)
  };

  await insertFormData(formFields);

  // Send a response to the client
  res.send("Form submitted successfully");
}

// Function to generate the TIN
function generateTIN(gender) {
  const currentYear = new Date().getFullYear();
  const tin = `${currentYear}/${gender.charAt(0).toUpperCase()}/${generateRandomNumber()}`;
  return tin;
}

  // Send a response to the client
  res.send("Form submitted successfully");


// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

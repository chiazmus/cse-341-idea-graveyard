const swaggerAuto = require("swagger-autogen")();

const doc = {
  info: {
    title: "Contacts API",
    description: "Contacts API",
  },
  host: "cse-341-idea-graveyard.onrender.com",
  schemes: ["https", "http"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAuto(outputFile, endpointsFiles, doc);
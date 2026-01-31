const swaggerAuto = require("swagger-autogen")();

const doc = {
  info: {
    title: "Contacts API",
    description: "Contacts API",
  },
  host: "localhost:3000",
  schemes: ["https", "http"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAuto(outputFile, endpointsFiles, doc);
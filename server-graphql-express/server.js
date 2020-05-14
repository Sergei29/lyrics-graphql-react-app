const express = require("express");
const models = require("./models");
const expressGraphQL = require("express-graphql");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const schema = require("./schema/schema");

const app = express();
// allow CORS cross-origin requests:
app.use(cors());

// Replace with your mongoLab URI
const MONGO_URI =
	"mongodb+srv://sergejsBasangovs:calvi187439@cluster0-3itry.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

mongoose.connection
	.once("open", () => console.log("Connected to MongoDB Atlas."))
	.on("error", (error) =>
		console.log("Error connecting to MongoDB Atlas: ", error)
	);

app.use(bodyParser.json());
app.use(
	"/graphql",
	expressGraphQL({
		schema,
		graphiql: true,
	})
);

app.listen(4000, () => {
	console.log("Server listening on http://localhost:4000");
});

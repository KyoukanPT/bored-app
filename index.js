import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    const result = response.data;
    res.render("index.ejs", { 
      activity: result.activity,
      activityType: result.type,
      participantsNumber: result.participants,
      error : ""
     });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message
    });
  }
}); 

app.post("/", async (req, res) => {
  var type = req.body.type;
  var participants = req.body.participants;
  
  try {
    const response = await axios.get(`https://bored-api.appbrewery.com/filter?type=${type}&participants=${participants}`);
    const result = response.data;
    const keys = Object.keys(result);
    const length = keys.length;
    const random = Math.floor(Math.random() * length - 1);

    res.render("index.ejs", { 
      activity: result[random].activity,
      activityType: type,
      participantsNumber: participants,
      error : ""
     });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    console.log(error.message);
    res.render("index.ejs", {
      error: error.message = "Request failed with status code 404" ? res.send("No activities that match your criteria") : error.message
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

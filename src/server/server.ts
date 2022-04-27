import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import jsonData from "./db.json";
import { updateGivenObject, write } from "./jsonCrud";

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

const port = 3001;

app.listen(port, () => {
  console.clear();
  console.log(`listening on http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.send(jsonData);
});

app.get("/calendars", (req, res) => {
  res.send(jsonData.calendars);
});

app.post("/calendars", ({ body }, res) => {
  body.id = jsonData.calendars.length + 1;

  jsonData.calendars.push(body);
  (jsonData.events as any)[body.name] = {};
  write(JSON.stringify(jsonData), err => console.error(err));
  res.send(body);
});

app.put("/calendars/:id", ({ params: { id }, body }, res) => {
  const update = jsonData.calendars.find(calendar => calendar.id === +id);
  if (!update) return res.status(404).send("not found");
  updateGivenObject(update, body);
  write(JSON.stringify(jsonData), console.error);
  res.send(update);
});

app.get("/events/:calName/:date", ({ params: { calName, date } }, res) => {
  const calObj = (jsonData?.events as any)[calName];
  if (!calObj) return res.status(404).send("doesn't exist");
  // if (!calObj[date]) return res.status(404).send("doesn't exist");
  res.send(calObj[date]);
});

app.post(
  "/events/:calName/:date",
  ({ params: { calName, date }, body }, res) => {
    if (!(jsonData?.events as any)[calName]) {
      (jsonData?.events as any)[calName] = {};
    } else if (!(jsonData?.events as any)[calName][date]) {
      (jsonData?.events as any)[calName][date] = [];
    }

    body.id = (jsonData?.events as any)[calName][date]?.length + 1;
    (jsonData?.events as any)[calName][date].push(body);
    write(JSON.stringify(jsonData), console.error);
    res.send(body);
  }
);

app.delete("/events/:calName/:date", ({ params: { calName, date } }, res) => {
  const calObj = (jsonData?.events as any)[calName];
  if (!calObj) return res.status(404).send("doesn't exist");
  if (!calObj[date]) return res.status(404).send("doesn't exist");
  delete (jsonData?.events as any)[calName][date];
  res.end();
});

app.put(
  "/events/:calName/:date/:id",
  ({ params: { calName, date, id }, body }, res) => {
    const calObj = (jsonData?.events as any)[calName];
    if (!calObj) return res.status(404).send("doesn't exist");
    if (!calObj[date]) return res.status(404).send("doesn't exist");
    const target = (jsonData?.events as any)[calName][date].find(
      (date: any) => date.id === +id
    );
    if (!target) return res.status(404).send("doesn't exist");
    updateGivenObject(target, body);
    res.send(body);
  }
);

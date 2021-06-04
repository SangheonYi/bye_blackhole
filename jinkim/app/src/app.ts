import express from 'express';
import path from "path";

const app: express.Application = express();
/*
app.get(
  "/",
  (req: express.Request, res: express.Response) => {
	res.send("hello typescript express!");
  }
);
*/
app.use(express.static(path.join(__dirname + "/../react_p/build")));
app.get('/', (req: express.Request, res: express.Response) => {
	res.sendFile(path.join(__dirname + "/../react_p/build/index.html"));
}
);
app.get('/Chat', (req: express.Request, res: express.Response) => {
	res.sendFile(path.join(__dirname + "/../react_p/build/index.html"));
}
);

var pgDBConn = require('./db.ts');
pgDBConn.getUserList();


export default app;
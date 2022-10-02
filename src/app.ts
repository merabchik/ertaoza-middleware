import express from "express";
import { JobsService } from "./services/jobs.service";
import { env } from "process";

const app = express();
const port = env.PORT || 3131;

const vJobsService = new JobsService();

app.get('/init', (req, res) => {

});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
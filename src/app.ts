import express from "express";
import { env } from "process";
import { SettingsService } from "./services/settings.service";

const app = express();
const port = env.PORT || 3131;


app.get('/settings', (req, res) => {

    const vSettings = new SettingsService();
    vSettings.getInitSettings().then((pSettings) => {
        res.status(200).json(pSettings);
    }).catch((pError) => {
        res.status(500).send(pError);
    });
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
import "reflect-metadata";
import * as bodyParser from "body-parser";

import { InversifyExpressServer } from "inversify-express-utils";
import { container } from "./inversify.config";

const server = new InversifyExpressServer(container);
server.setConfig((app) => {
    app.use(
        bodyParser.urlencoded({
            extended: true,
        })
    );
    app.use(bodyParser.json());
});

const serverInstance = server.build();
serverInstance.listen(3000);

console.log("Server started on port 3000");

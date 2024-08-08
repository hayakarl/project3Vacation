import express from "express";
import { appConfig } from "./2-utils/app-config";
import { destinationController } from "./5-controllers/destination-controller";
import { logsMiddleware } from "./6-middleware/logs-middleware";
import { securityMiddleware } from "./6-middleware/security-middleware";
import { errorsMiddleware } from "./6-middleware/errors-middleware";
import { userController } from './5-controllers/user-controller';
import cors from 'cors';
import expressFileUpload from 'express-fileupload';
import { fileSaver } from 'uploaded-file-saver';
import path from 'path';

// Configure fileSaver once:
fileSaver.config(path.join(__dirname, '1-assets', 'images'));

// Create main server object: 
const server = express();

//enable corse
server.use(cors());
// server.use(cors({ origin: "https://mysite.com"}));

// Create the body from json: 
server.use(express.json());

// Read files into request.files:
server.use(expressFileUpload());

// Register middleware: 
server.use(logsMiddleware.logRequest);
server.use(securityMiddleware.preventXssAttack);

// Register routes:
server.use('/api', destinationController.router, userController.router);

// Register route not found middleware:
server.use('*', errorsMiddleware.routeNotFound);

// Register catchAll middleware:
server.use(errorsMiddleware.catchAll);

// Run server: 
server.listen(appConfig.port, () => console.log("Listening on http://localhost:" + appConfig.port));

import { expose } from "comlink";
import * as replicad from "replicad";
import { BuilderWorkerServiceFactory } from "replicad-react";
import initOCSingle from "./initOCSingle";

self.replicad = replicad;

console.log("Creating builder worker");
const svc = BuilderWorkerServiceFactory.create(initOCSingle);

expose(svc, self);
export default svc;

import { expose } from "comlink";
import { BuilderWorkerServiceFactory } from "replicad-react";
import initOCSingle from "./initOCSingle";

// self.replicad = replicad;

console.log("Creating builder worker");
const svc = BuilderWorkerServiceFactory.create(initOCSingle);

expose(svc, self as any);
export default svc;

import { expose } from "comlink";
import { BuilderWorkerServiceFactory } from "replicad-react";
import initOCSingle from "./initOCSingle";

declare global {
  var REPLICAD_CONFIG: { fontUri: string };
}

// self.replicad = replicad;

console.log("Creating builder worker");
const fontUri = globalThis.REPLICAD_CONFIG.fontUri;
console.log("FONT URI", fontUri);
const svc = BuilderWorkerServiceFactory.create(initOCSingle, fontUri);

expose(svc, self as any);
export default svc;

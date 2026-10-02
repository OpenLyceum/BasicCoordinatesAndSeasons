/**
 * Memory-leak regression suite (fleet standard): each object below is collected after
 * dispose(), survives a double dispose() where marked, and leaves no survivors across
 * repeated cycles (tests/helpers/memoryLeak.ts). Only SkyProjection and TimeModel have a
 * dispose(); the screen models live for the whole sim (see doc/implementation-notes.md,
 * "Disposal"). Add sim-specific leak tests below using forceGC().
 */

import { SkyProjection } from "../src/common/SkyProjection.js";
import { TimeModel } from "../src/common/TimeModel.js";
import { describeDisposalLeaks } from "./helpers/memoryLeak.js";

describeDisposalLeaks([
  { name: "SkyProjection", create: () => new SkyProjection() },
  { name: "TimeModel", create: () => new TimeModel(), idempotentDispose: true },
]);

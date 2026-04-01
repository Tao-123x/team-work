import test from "node:test";
import assert from "node:assert/strict";

import { generateOrderNo } from "../src/utils/orderNo.js";

test("generateOrderNo uses the DO prefix and pads date, time, and random parts", () => {
  const OriginalDate = globalThis.Date;
  const OriginalRandom = Math.random;

  const fakeNow = {
    toISOString: () => "2026-04-01T00:00:00.000Z",
    getHours: () => 8,
    getMinutes: () => 9,
    getSeconds: () => 10
  };

  globalThis.Date = class {
    constructor() {
      return fakeNow;
    }
  };
  Math.random = () => 0.123;

  try {
    assert.equal(generateOrderNo(), "DO20260401080910123");
  } finally {
    globalThis.Date = OriginalDate;
    Math.random = OriginalRandom;
  }
});

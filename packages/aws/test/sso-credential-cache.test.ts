import { expect, test } from "bun:test";
import { createHash } from "node:crypto";
import { getSsoCredentialCacheName } from "../src/auth.ts";

test("SSO credential cache includes account and role", () => {
  const first = getSsoCredentialCacheName(
    "shared-session",
    "111111111111",
    "RoleA",
  );

  expect(first).not.toBe(
    getSsoCredentialCacheName("shared-session", "222222222222", "RoleA"),
  );
  expect(first).not.toBe(
    getSsoCredentialCacheName("shared-session", "111111111111", "RoleB"),
  );
  expect(first).not.toBe(
    createHash("sha1").update("shared-session").digest("hex"),
  );
});

/**
 * MD5 checksum implementation using Node.js crypto module.
 */

import type { Checksum } from "@smithy/types";
import * as crypto from "crypto";

class NodeMd5 implements Checksum {
  private hash = crypto.createHash("md5");
  update(data: Uint8Array) {
    this.hash.update(data);
  }
  async digest(): Promise<Uint8Array> {
    return new Uint8Array(this.hash.digest());
  }
  reset() {
    this.hash = crypto.createHash("md5");
  }
}

export const getMd5ChecksumAlgorithmFunction = (): new () => Checksum => {
  return NodeMd5;
};

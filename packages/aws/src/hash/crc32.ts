/**
 * CRC32 checksum implementation.
 * Prefers Node.js zlib.crc32 (Node 20.15+) for performance;
 * falls back to @aws-crypto/crc32.
 */

import { AwsCrc32 } from "@aws-crypto/crc32";
import { numToUint8 } from "@aws-crypto/util";
import type { Checksum } from "@smithy/types";
import * as zlib from "zlib";

class NodeCrc32 implements Checksum {
  private value = 0;
  update(data: Uint8Array) {
    this.value = (zlib as any).crc32(data, this.value);
  }
  async digest(): Promise<Uint8Array> {
    return numToUint8(this.value);
  }
  reset() {
    this.value = 0;
  }
}

export const getCrc32ChecksumAlgorithmFunction = (): new () => Checksum => {
  if (typeof (zlib as any).crc32 === "function") {
    return NodeCrc32;
  }
  return AwsCrc32 as unknown as new () => Checksum;
};

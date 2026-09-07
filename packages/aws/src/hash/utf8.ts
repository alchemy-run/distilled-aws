/**
 * UTF-8 and buffer conversion utilities.
 */

export function toUint8Array(
  data: string | ArrayBuffer | ArrayBufferView,
): Uint8Array {
  if (typeof data === "string") {
    return fromUtf8(data);
  }
  if (ArrayBuffer.isView(data)) {
    return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
  }
  return new Uint8Array(data);
}

export function fromUtf8(input: string): Uint8Array {
  return Buffer.from(input, "utf-8");
}

export function fromArrayBuffer(input: ArrayBuffer): Buffer {
  return Buffer.from(input);
}

export function fromString(input: string, encoding?: BufferEncoding): Buffer {
  return Buffer.from(input, encoding);
}

export function isArrayBuffer(input: unknown): input is ArrayBuffer {
  return (
    typeof ArrayBuffer === "function" &&
    (input instanceof ArrayBuffer ||
      Object.prototype.toString.call(input) === "[object ArrayBuffer]")
  );
}

## Get PCAP request

**get** `/accounts/{account_id}/pcaps/{pcap_id}`

Get information for a PCAP request by id.

### Path Parameters

- `account_id: string`

  Identifier.

- `pcap_id: string`

  Identifier.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `result: PCAP or object { id, byte_limit, colo_name, 10 more }`

  - `PCAP object { id, filter_v1, offset_time, 5 more }`

    - `id: optional string`

      The ID for the packet capture.

    - `filter_v1: optional PCAPFilter`

      The packet capture filter. When this field is empty, all packets are captured.

      - `destination_address: optional string`

        The destination IP address of the packet.

      - `destination_port: optional number`

        The destination port of the packet.

      - `protocol: optional number`

        The protocol number of the packet.

      - `source_address: optional string`

        The source IP address of the packet.

      - `source_port: optional number`

        The source port of the packet.

    - `offset_time: optional string`

      The RFC 3339 offset timestamp from which to query backwards for packets. Must be within the last 24h. When this field is empty, defaults to time of request.

    - `status: optional "unknown" or "success" or "pending" or 5 more`

      The status of the packet capture request.

      - `"unknown"`

      - `"success"`

      - `"pending"`

      - `"running"`

      - `"conversion_pending"`

      - `"conversion_running"`

      - `"complete"`

      - `"failed"`

    - `submitted: optional string`

      The RFC 3339 timestamp when the packet capture was created.

    - `system: optional "magic-transit"`

      The system used to collect packet captures.

      - `"magic-transit"`

    - `time_limit: optional number`

      The packet capture duration in seconds.

    - `type: optional "simple" or "full"`

      The type of packet capture. `Simple` captures sampled packets, and `full` captures entire payloads and non-sampled packets.

      - `"simple"`

      - `"full"`

  - `MagicVisibilityPCAPsPCAPsResponseFull object { id, byte_limit, colo_name, 10 more }`

    - `id: optional string`

      The ID for the packet capture.

    - `byte_limit: optional number`

      The maximum number of bytes to capture. This field only applies to `full` packet captures.

    - `colo_name: optional string`

      The name of the data center used for the packet capture. This can be a specific colo (ord02) or a multi-colo name (ORD). This field only applies to `full` packet captures.

    - `destination_conf: optional string`

      The full URI for the bucket. This field only applies to `full` packet captures.

    - `error_message: optional string`

      An error message that describes why the packet capture failed. This field only applies to `full` packet captures.

    - `filter_v1: optional PCAPFilter`

      The packet capture filter. When this field is empty, all packets are captured.

    - `packets_captured: optional number`

      The number of packets captured.

    - `status: optional "unknown" or "success" or "pending" or 5 more`

      The status of the packet capture request.

      - `"unknown"`

      - `"success"`

      - `"pending"`

      - `"running"`

      - `"conversion_pending"`

      - `"conversion_running"`

      - `"complete"`

      - `"failed"`

    - `stop_requested: optional string`

      The RFC 3339 timestamp when stopping the packet capture was requested. This field only applies to `full` packet captures.

    - `submitted: optional string`

      The RFC 3339 timestamp when the packet capture was created.

    - `system: optional "magic-transit"`

      The system used to collect packet captures.

      - `"magic-transit"`

    - `time_limit: optional number`

      The packet capture duration in seconds.

    - `type: optional "simple" or "full"`

      The type of packet capture. `Simple` captures sampled packets, and `full` captures entire payloads and non-sampled packets.

      - `"simple"`

      - `"full"`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pcaps/$PCAP_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "result": {
    "id": "66802ca5668e47a2b82c2e6746e45037",
    "filter_v1": {
      "destination_address": "1.2.3.4",
      "destination_port": 80,
      "protocol": 6,
      "source_address": "1.2.3.4",
      "source_port": 123
    },
    "offset_time": "2020-01-01T08:00:00Z",
    "status": "success",
    "submitted": "2020-01-01T08:00:00Z",
    "system": "magic-transit",
    "time_limit": 300,
    "type": "simple"
  },
  "success": true
}
```

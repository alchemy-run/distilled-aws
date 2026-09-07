# PCAPs

## List packet capture requests

**get** `/accounts/{account_id}/pcaps`

Lists all packet capture requests for an account.

### Path Parameters

- `account_id: string`

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

- `result: array of PCAP or object { id, byte_limit, colo_name, 10 more }`

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

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Total number of results for the requested service.

  - `page: optional number`

    Current page within paginated list of results.

  - `per_page: optional number`

    Number of results per page of results.

  - `total_count: optional number`

    Total results available without any search parameters.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pcaps \
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
  "result": [
    {
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
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

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

## Create PCAP request

**post** `/accounts/{account_id}/pcaps`

Create new PCAP request for account.

### Path Parameters

- `account_id: string`

  Identifier.

### Body Parameters

- `body: object { packet_limit, system, time_limit, 3 more }  or object { colo_name, destination_conf, system, 5 more }`

  - `MagicVisibilityPCAPsPCAPsRequestSimple object { packet_limit, system, time_limit, 3 more }`

    - `packet_limit: number`

      The limit of packets contained in a packet capture.

    - `system: "magic-transit"`

      The system used to collect packet captures.

      - `"magic-transit"`

    - `time_limit: number`

      The packet capture duration in seconds.

    - `type: "simple" or "full"`

      The type of packet capture. `Simple` captures sampled packets, and `full` captures entire payloads and non-sampled packets.

      - `"simple"`

      - `"full"`

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

  - `MagicVisibilityPCAPsPCAPsRequestFull object { colo_name, destination_conf, system, 5 more }`

    - `colo_name: string`

      The name of the data center used for the packet capture. This can be a specific colo (ord02) or a multi-colo name (ORD). This field only applies to `full` packet captures.

    - `destination_conf: string`

      The full URI for the bucket. This field only applies to `full` packet captures.

    - `system: "magic-transit"`

      The system used to collect packet captures.

      - `"magic-transit"`

    - `time_limit: number`

      The packet capture duration in seconds.

    - `type: "simple" or "full"`

      The type of packet capture. `Simple` captures sampled packets, and `full` captures entire payloads and non-sampled packets.

      - `"simple"`

      - `"full"`

    - `byte_limit: optional number`

      The maximum number of bytes to capture. This field only applies to `full` packet captures.

    - `filter_v1: optional PCAPFilter`

      The packet capture filter. When this field is empty, all packets are captured.

    - `packet_limit: optional number`

      The limit of packets contained in a packet capture.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pcaps \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "packet_limit": 10000,
          "system": "magic-transit",
          "time_limit": 300,
          "type": "simple",
          "offset_time": "2020-01-01T08:00:00Z"
        }'
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

## Stop full PCAP

**put** `/accounts/{account_id}/pcaps/{pcap_id}/stop`

Stop full PCAP.

### Path Parameters

- `account_id: string`

  Identifier.

- `pcap_id: string`

  Identifier.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pcaps/$PCAP_ID/stop \
    -X PUT \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

## Domain Types

### PCAP

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

### PCAP Filter

- `PCAPFilter object { destination_address, destination_port, protocol, 2 more }`

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

### PCAP List Response

- `PCAPListResponse = PCAP or object { id, byte_limit, colo_name, 10 more }`

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

### PCAP Get Response

- `PCAPGetResponse = PCAP or object { id, byte_limit, colo_name, 10 more }`

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

### PCAP Create Response

- `PCAPCreateResponse = PCAP or object { id, byte_limit, colo_name, 10 more }`

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

# Ownership

## List PCAPs Bucket Ownership

**get** `/accounts/{account_id}/pcaps/ownership`

List all buckets configured for use with PCAPs API.

### Path Parameters

- `account_id: string`

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

- `result: array of Ownership`

  - `id: string`

    The bucket ID associated with the packet captures API.

  - `destination_conf: string`

    The full URI for the bucket. This field only applies to `full` packet captures.

  - `filename: string`

    The ownership challenge filename stored in the bucket.

  - `status: "pending" or "success" or "failed"`

    The status of the ownership challenge. Can be pending, success or failed.

    - `"pending"`

    - `"success"`

    - `"failed"`

  - `submitted: string`

    The RFC 3339 timestamp when the bucket was added to packet captures API.

  - `validated: optional string`

    The RFC 3339 timestamp when the bucket was validated.

- `success: true`

  Whether the API call was successful.

  - `true`

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Total number of results for the requested service.

  - `page: optional number`

    Current page within paginated list of results.

  - `per_page: optional number`

    Number of results per page of results.

  - `total_count: optional number`

    Total results available without any search parameters.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pcaps/ownership \
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
  "result": [
    {
      "id": "9883874ecac311ec8475433579a6bf5f",
      "destination_conf": "s3://pcaps-bucket?region=us-east-1",
      "filename": "ownership-challenge-9883874ecac311ec8475433579a6bf5f.txt",
      "status": "success",
      "submitted": "2020-01-01T08:00:00Z",
      "validated": "2020-01-01T08:00:00Z"
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

## Add buckets for full packet captures

**post** `/accounts/{account_id}/pcaps/ownership`

Adds an AWS or GCP bucket to use with full packet captures.

### Path Parameters

- `account_id: string`

  Identifier.

### Body Parameters

- `destination_conf: string`

  The full URI for the bucket. This field only applies to `full` packet captures.

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

- `result: Ownership`

  - `id: string`

    The bucket ID associated with the packet captures API.

  - `destination_conf: string`

    The full URI for the bucket. This field only applies to `full` packet captures.

  - `filename: string`

    The ownership challenge filename stored in the bucket.

  - `status: "pending" or "success" or "failed"`

    The status of the ownership challenge. Can be pending, success or failed.

    - `"pending"`

    - `"success"`

    - `"failed"`

  - `submitted: string`

    The RFC 3339 timestamp when the bucket was added to packet captures API.

  - `validated: optional string`

    The RFC 3339 timestamp when the bucket was validated.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pcaps/ownership \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "destination_conf": "s3://pcaps-bucket?region=us-east-1"
        }'
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
    "id": "9883874ecac311ec8475433579a6bf5f",
    "destination_conf": "s3://pcaps-bucket?region=us-east-1",
    "filename": "ownership-challenge-9883874ecac311ec8475433579a6bf5f.txt",
    "status": "success",
    "submitted": "2020-01-01T08:00:00Z",
    "validated": "2020-01-01T08:00:00Z"
  },
  "success": true
}
```

## Delete buckets for full packet captures

**delete** `/accounts/{account_id}/pcaps/ownership/{ownership_id}`

Deletes buckets added to the packet captures API.

### Path Parameters

- `account_id: string`

  Identifier.

- `ownership_id: string`

  Identifier.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pcaps/ownership/$OWNERSHIP_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

## Validate buckets for full packet captures

**post** `/accounts/{account_id}/pcaps/ownership/validate`

Validates buckets added to the packet captures API.

### Path Parameters

- `account_id: string`

  Identifier.

### Body Parameters

- `destination_conf: string`

  The full URI for the bucket. This field only applies to `full` packet captures.

- `ownership_challenge: string`

  The ownership challenge filename stored in the bucket.

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

- `result: Ownership`

  - `id: string`

    The bucket ID associated with the packet captures API.

  - `destination_conf: string`

    The full URI for the bucket. This field only applies to `full` packet captures.

  - `filename: string`

    The ownership challenge filename stored in the bucket.

  - `status: "pending" or "success" or "failed"`

    The status of the ownership challenge. Can be pending, success or failed.

    - `"pending"`

    - `"success"`

    - `"failed"`

  - `submitted: string`

    The RFC 3339 timestamp when the bucket was added to packet captures API.

  - `validated: optional string`

    The RFC 3339 timestamp when the bucket was validated.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pcaps/ownership/validate \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "destination_conf": "s3://pcaps-bucket?region=us-east-1",
          "ownership_challenge": "ownership-challenge-9883874ecac311ec8475433579a6bf5f.txt"
        }'
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
    "id": "9883874ecac311ec8475433579a6bf5f",
    "destination_conf": "s3://pcaps-bucket?region=us-east-1",
    "filename": "ownership-challenge-9883874ecac311ec8475433579a6bf5f.txt",
    "status": "success",
    "submitted": "2020-01-01T08:00:00Z",
    "validated": "2020-01-01T08:00:00Z"
  },
  "success": true
}
```

## Domain Types

### Ownership

- `Ownership object { id, destination_conf, filename, 3 more }`

  - `id: string`

    The bucket ID associated with the packet captures API.

  - `destination_conf: string`

    The full URI for the bucket. This field only applies to `full` packet captures.

  - `filename: string`

    The ownership challenge filename stored in the bucket.

  - `status: "pending" or "success" or "failed"`

    The status of the ownership challenge. Can be pending, success or failed.

    - `"pending"`

    - `"success"`

    - `"failed"`

  - `submitted: string`

    The RFC 3339 timestamp when the bucket was added to packet captures API.

  - `validated: optional string`

    The RFC 3339 timestamp when the bucket was validated.

# Download

## Download Simple PCAP

**get** `/accounts/{account_id}/pcaps/{pcap_id}/download`

Download PCAP information into a file. Response is a binary PCAP file.

### Path Parameters

- `account_id: string`

  Identifier.

- `pcap_id: string`

  Identifier.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pcaps/$PCAP_ID/download \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

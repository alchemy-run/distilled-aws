## Create account commands

**post** `/accounts/{account_id}/dex/commands`

Initiate commands for up to 10 devices per account.

### Path Parameters

- `account_id: string`

  Unique identifier linked to an account.

### Body Parameters

- `commands: array of object { device_id, type, user_email, 2 more }`

  List of device-level commands to execute

  - `device_id: string`

    Unique identifier for the physical device

  - `type: "pcap" or "speed-test" or "warp-diag"`

    Type of command to execute on the device

    - `"pcap"`

    - `"speed-test"`

    - `"warp-diag"`

  - `user_email: string`

    Email tied to the device

  - `args: optional object { "test-all-routes" }  or object { "max-file-size-mb", "packet-size-bytes", "time-limit-min" }  or object { interfaces }`

    Command arguments. Allowed fields depend on `type`.

    - `WARPDiagArgs object { "test-all-routes" }`

      - `"test-all-routes": optional boolean`

        Test an IP address from all included or excluded ranges. Essentially the same as running 'route get <ip>' and collecting the results. This option may increase the time taken to collect the warp-diag.

    - `PCAPArgs object { "max-file-size-mb", "packet-size-bytes", "time-limit-min" }`

      - `"max-file-size-mb": optional number`

        Maximum file size (in MB) for the capture file. If the capture artifact exceeds the specified max file size, it will NOT be uploaded.

      - `"packet-size-bytes": optional number`

        Maximum number of bytes to save for each packet

      - `"time-limit-min": optional number`

        Limit on capture duration (in minutes)

    - `SpeedTestArgs object { interfaces }`

      - `interfaces: optional array of "default" or "tunnel"`

        List of interfaces to run the speed test on

        - `"default"`

        - `"tunnel"`

  - `registration_id: optional string`

    Unique identifier for the device registration. Required for multi-user devices to target the correct user session.

### Returns

- `errors: array of object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `success: true`

  Whether the API call was successful.

  - `true`

- `result: optional object { commands }`

  - `commands: optional array of object { id, args, device_id, 3 more }`

    List of created commands

    - `id: optional string`

      Unique identifier for the command

    - `args: optional map[string]`

      Command arguments

    - `device_id: optional string`

      Identifier for the device associated with the command

    - `registration_id: optional string`

      Unique identifier for the device registration

    - `status: optional "PENDING_EXEC" or "PENDING_UPLOAD" or "SUCCESS" or "FAILED"`

      Current status of the command

      - `"PENDING_EXEC"`

      - `"PENDING_UPLOAD"`

      - `"SUCCESS"`

      - `"FAILED"`

    - `type: optional string`

      Type of the command (e.g., "pcap", "speed-test", or "warp-diag")

- `result_info: optional object { count, page, per_page, 2 more }`

  - `count: optional number`

    Total number of results for the requested service.

  - `page: optional number`

    Current page within paginated list of results.

  - `per_page: optional number`

    Number of results per page of results.

  - `total_count: optional number`

    Total results available without any search parameters.

  - `total_pages: optional number`

    The number of total pages in the entire result set.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dex/commands \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "commands": [
            {
              "device_id": "device_id",
              "type": "pcap",
              "user_email": "user_email"
            }
          ]
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
  "success": true,
  "result": {
    "commands": [
      {
        "id": "id",
        "args": {
          "foo": "string"
        },
        "device_id": "device_id",
        "registration_id": "registration_id",
        "status": "PENDING_EXEC",
        "type": "type"
      }
    ]
  },
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```

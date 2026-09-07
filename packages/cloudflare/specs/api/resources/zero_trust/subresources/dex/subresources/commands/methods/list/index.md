## List account commands

**get** `/accounts/{account_id}/dex/commands`

Retrieves a paginated list of commands issued to devices under the specified account, optionally filtered by time range, device, or other parameters

### Path Parameters

- `account_id: string`

  Unique identifier linked to an account.

### Query Parameters

- `page: number`

  Page number of paginated results.

- `per_page: number`

  Number of results per page.

- `command_type: optional "pcap" or "speed-test" or "warp-diag"`

  Optionally filter executed commands by command type.

  - `"pcap"`

  - `"speed-test"`

  - `"warp-diag"`

- `device_id: optional string`

  Unique identifier for a device.

- `from: optional string`

  Start time for the query in ISO (RFC3339 - ISO 8601) format.

- `status: optional "PENDING_EXEC" or "PENDING_UPLOAD" or "SUCCESS" or "FAILED"`

  Optionally filter executed commands by status.

  - `"PENDING_EXEC"`

  - `"PENDING_UPLOAD"`

  - `"SUCCESS"`

  - `"FAILED"`

- `to: optional string`

  End time for the query in ISO (RFC3339 - ISO 8601) format.

- `user_email: optional string`

  Email tied to the device.

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

  - `commands: optional array of object { id, completed_date, created_date, 6 more }`

    - `id: optional string`

    - `completed_date: optional string`

    - `created_date: optional string`

    - `device_id: optional string`

    - `filename: optional string`

    - `registration_id: optional string`

      Unique identifier for the device registration

    - `status: optional string`

    - `type: optional string`

    - `user_email: optional string`

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
  "success": true,
  "result": {
    "commands": [
      {
        "id": "id",
        "completed_date": "2019-12-27T18:11:19.117Z",
        "created_date": "2019-12-27T18:11:19.117Z",
        "device_id": "device_id",
        "filename": "filename",
        "registration_id": "registration_id",
        "status": "status",
        "type": "type",
        "user_email": "user_email"
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

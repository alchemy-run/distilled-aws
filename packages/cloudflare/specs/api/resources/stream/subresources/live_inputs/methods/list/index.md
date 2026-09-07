## List live inputs

**get** `/accounts/{account_id}/stream/live_inputs`

Lists the live inputs created for an account. To get the credentials needed to stream to a specific live input, request a single live input.

### Path Parameters

- `account_id: string`

  Identifier.

### Query Parameters

- `include_counts: optional boolean`

  Includes the total number of videos associated with the submitted query parameters.

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

- `result: optional object { liveInputs, range, total }`

  - `liveInputs: optional array of object { created, deleteRecordingAfterDays, enabled, 3 more }`

    - `created: optional string`

      The date and time the live input was created.

    - `deleteRecordingAfterDays: optional number`

      Indicates the number of days after which the live inputs recordings will be deleted. When a stream completes and the recording is ready, the value is used to calculate a scheduled deletion date for that recording. Omit the field to indicate no change, or include with a `null` value to remove an existing scheduled deletion.

    - `enabled: optional boolean`

      Indicates whether the live input is enabled and can accept streams.

    - `meta: optional unknown`

      A user modifiable key-value store used to reference other systems of record for managing live inputs.

    - `modified: optional string`

      The date and time the live input was last modified.

    - `uid: optional string`

      A unique identifier for a live input.

  - `range: optional number`

    The total number of remaining live inputs based on cursor position.

  - `total: optional number`

    The total number of live inputs that match the provided filters.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream/live_inputs \
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
    "liveInputs": [
      {
        "created": "2014-01-02T02:20:00Z",
        "deleteRecordingAfterDays": 45,
        "enabled": true,
        "meta": {
          "name": "test stream 1"
        },
        "modified": "2014-01-02T02:20:00Z",
        "uid": "66be4bf738797e01e1fca35a7bdecdcd"
      }
    ],
    "range": 1000,
    "total": 35586
  }
}
```

## Storage use

**get** `/accounts/{account_id}/stream/storage-usage`

Returns information about an account's storage use.

### Path Parameters

- `account_id: string`

  The account identifier tag.

### Query Parameters

- `creator: optional string`

  A user-defined identifier for the media creator.

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

- `result: optional object { creator, totalStorageMinutes, totalStorageMinutesLimit, videoCount }`

  - `creator: optional string`

    A user-defined identifier for the media creator.

  - `totalStorageMinutes: optional number`

    The total minutes of video content stored in the account. May contain decimal values.

  - `totalStorageMinutesLimit: optional number`

    The storage capacity alloted for the account.

  - `videoCount: optional number`

    The total count of videos associated with the account.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream/storage-usage \
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
    "creator": "creator-id_abcde12345",
    "totalStorageMinutes": 0,
    "totalStorageMinutesLimit": 0,
    "videoCount": 0
  }
}
```

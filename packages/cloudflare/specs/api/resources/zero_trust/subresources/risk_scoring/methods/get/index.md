## Get risk event/score information for a specific user

**get** `/accounts/{account_id}/zt_risk_scoring/{user_id}`

Retrieves the detailed risk score breakdown for a specific user, including contributing factors.

### Path Parameters

- `account_id: string`

- `user_id: string`

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

- `result: optional object { email, events, name, 2 more }`

  - `email: string`

  - `events: array of object { id, name, risk_level, 2 more }`

    - `id: string`

    - `name: string`

    - `risk_level: "low" or "medium" or "high"`

      - `"low"`

      - `"medium"`

      - `"high"`

    - `timestamp: string`

    - `event_details: optional unknown`

  - `name: string`

  - `last_reset_time: optional string`

  - `risk_level: optional "low" or "medium" or "high"`

    - `"low"`

    - `"medium"`

    - `"high"`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/zt_risk_scoring/$USER_ID \
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
    "email": "email",
    "events": [
      {
        "id": "id",
        "name": "name",
        "risk_level": "low",
        "timestamp": "2019-12-27T18:11:19.117Z",
        "event_details": {}
      }
    ],
    "name": "name",
    "last_reset_time": "2019-12-27T18:11:19.117Z",
    "risk_level": "low"
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

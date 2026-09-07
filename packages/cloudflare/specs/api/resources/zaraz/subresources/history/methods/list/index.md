## List Zaraz historical configuration records

**get** `/zones/{zone_id}/settings/zaraz/history`

Lists a history of published Zaraz configuration records for a zone.

### Path Parameters

- `zone_id: string`

  Identifier.

### Query Parameters

- `limit: optional number`

  Maximum amount of results to list. Default value is 10.

- `offset: optional number`

  Ordinal number to start listing the results with. Default value is 0.

- `sortField: optional "id" or "user_id" or "description" or 2 more`

  The field to sort by. Default is updated_at.

  - `"id"`

  - `"user_id"`

  - `"description"`

  - `"created_at"`

  - `"updated_at"`

- `sortOrder: optional "DESC" or "ASC"`

  Sorting order. Default is DESC.

  - `"DESC"`

  - `"ASC"`

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

- `result: array of object { id, createdAt, description, 2 more }`

  - `id: number`

    ID of the configuration.

  - `createdAt: string`

    Date and time the configuration was created.

  - `description: string`

    Configuration description provided by the user who published this configuration.

  - `updatedAt: string`

    Date and time the configuration was last updated.

  - `userId: string`

    Alpha-numeric ID of the account user who published the configuration.

- `success: boolean`

  Whether the API call was successful.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/settings/zaraz/history \
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
      "id": 0,
      "createdAt": "2019-12-27T18:11:19.117Z",
      "description": "description",
      "updatedAt": "2019-12-27T18:11:19.117Z",
      "userId": "userId"
    }
  ],
  "success": true
}
```

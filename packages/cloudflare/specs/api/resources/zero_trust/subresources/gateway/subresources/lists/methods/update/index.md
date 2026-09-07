## Update Zero Trust list

**put** `/accounts/{account_id}/gateway/lists/{list_id}`

Updates a configured Zero Trust list. Skips updating list items if not included in the payload. A non empty list items will overwrite the existing list.

### Path Parameters

- `account_id: string`

- `list_id: string`

  Identify the API resource with a UUID.

### Body Parameters

- `name: string`

  Specify the list name.

- `description: optional string`

  Provide the list description.

- `items: optional array of object { description, value }`

  Add items to the list.

  - `description: optional string`

    Provide the list item description (optional).

  - `value: optional string`

    Specify the item value.

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

- `success: true`

  Indicate whether the API call was successful.

  - `true`

- `result: optional GatewayList`

  - `id: optional string`

    Identify the API resource with a UUID.

  - `count: optional number`

    Indicate the number of items in the list.

  - `created_at: optional string`

  - `description: optional string`

    Provide the list description.

  - `items: optional array of GatewayItem`

    Provide the list items.

    - `created_at: optional string`

    - `description: optional string`

      Provide the list item description (optional).

    - `value: optional string`

      Specify the item value.

  - `name: optional string`

    Specify the list name.

  - `type: optional "SERIAL" or "URL" or "DOMAIN" or 6 more`

    Specify the list type.

    - `"SERIAL"`

    - `"URL"`

    - `"DOMAIN"`

    - `"EMAIL"`

    - `"IP"`

    - `"CATEGORY"`

    - `"LOCATION"`

    - `"DEVICE"`

    - `"AAGUID"`

  - `updated_at: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/lists/$LIST_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "Admin Serial Numbers",
          "description": "The serial numbers for administrators"
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
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "count": 20,
    "created_at": "2014-01-01T05:20:00.12345Z",
    "description": "The serial numbers for administrators",
    "items": [
      {
        "created_at": "2014-01-01T05:20:00.12345Z",
        "description": "Austin office IP",
        "value": "8GE8721REF"
      }
    ],
    "name": "Admin Serial Numbers",
    "type": "SERIAL",
    "updated_at": "2014-01-01T05:20:00.12345Z"
  }
}
```

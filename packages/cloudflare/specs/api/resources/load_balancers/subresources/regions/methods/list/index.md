## List Regions

**get** `/accounts/{account_id}/load_balancers/regions`

List all region mappings.

### Path Parameters

- `account_id: string`

  Identifier.

### Query Parameters

- `country_code_a2: optional string`

  Two-letter alpha-2 country code followed in ISO 3166-1.

- `subdivision_code: optional string`

  Two-letter subdivision code followed in ISO 3166-2.

- `subdivision_code_a2: optional string`

  Two-letter subdivision code followed in ISO 3166-2.

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

- `result: unknown or string`

  - `unknown`

  - `string`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/load_balancers/regions \
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
  "result": {},
  "success": true
}
```

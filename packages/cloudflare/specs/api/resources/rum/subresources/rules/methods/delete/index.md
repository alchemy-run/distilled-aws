## Delete a Web Analytics rule

**delete** `/accounts/{account_id}/rum/v2/{ruleset_id}/rule/{rule_id}`

Deletes an existing rule from a Web Analytics ruleset.

### Path Parameters

- `account_id: string`

  Identifier.

- `ruleset_id: string`

  The Web Analytics ruleset identifier.

- `rule_id: string`

  The Web Analytics rule identifier.

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

- `success: boolean`

  Whether the API call was successful.

- `result: optional object { id }`

  - `id: optional string`

    The Web Analytics rule identifier.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/rum/v2/$RULESET_ID/rule/$RULE_ID \
    -X DELETE \
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
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
  }
}
```

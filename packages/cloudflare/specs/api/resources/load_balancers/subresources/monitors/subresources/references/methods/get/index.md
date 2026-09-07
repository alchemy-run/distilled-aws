## List Monitor References

**get** `/accounts/{account_id}/load_balancers/monitors/{monitor_id}/references`

Get the list of resources that reference the provided monitor.

### Path Parameters

- `account_id: string`

  Identifier.

- `monitor_id: string`

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

- `result: array of object { reference_type, resource_id, resource_name, resource_type }`

  List of resources that reference a given monitor.

  - `reference_type: optional "*" or "referral" or "referrer"`

    - `"*"`

    - `"referral"`

    - `"referrer"`

  - `resource_id: optional string`

  - `resource_name: optional string`

  - `resource_type: optional string`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/load_balancers/monitors/$MONITOR_ID/references \
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
      "reference_type": "referrer",
      "resource_id": "17b5962d775c646f3f9725cbc7a53df4",
      "resource_name": "primary-dc-1",
      "resource_type": "pool"
    }
  ],
  "success": true
}
```

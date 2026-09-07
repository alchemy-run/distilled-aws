## List Pool References

**get** `/accounts/{account_id}/load_balancers/pools/{pool_id}/references`

Get the list of resources that reference the provided pool.

### Path Parameters

- `account_id: string`

  Identifier.

- `pool_id: string`

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

  List of resources that reference a given pool.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/load_balancers/pools/$POOL_ID/references \
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
      "resource_id": "699d98642c564d2e855e9661899b7252",
      "resource_name": "www.example.com",
      "resource_type": "load_balancer"
    },
    {
      "reference_type": "referral",
      "resource_id": "f1aba936b94213e5b8dca0c0dbf1f9cc",
      "resource_name": "Login page monitor",
      "resource_type": "monitor"
    }
  ],
  "success": true
}
```

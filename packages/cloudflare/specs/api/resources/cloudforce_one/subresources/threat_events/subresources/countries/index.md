# Countries

## Retrieves countries information for all countries

**get** `/accounts/{account_id}/cloudforce-one/events/countries`

Retrieves countries information for all countries

### Path Parameters

- `account_id: string`

  Account ID.

### Returns

- `result: array of object { alpha2, alpha3, name }`

  - `alpha2: string`

  - `alpha3: string`

  - `name: string`

- `success: string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/countries \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
[
  {
    "result": [
      {
        "alpha2": "AF",
        "alpha3": "AF",
        "name": "Afghanistan"
      }
    ],
    "success": "true"
  }
]
```

## Domain Types

### Country List Response

- `CountryListResponse = array of object { result, success }`

  - `result: array of object { alpha2, alpha3, name }`

    - `alpha2: string`

    - `alpha3: string`

    - `name: string`

  - `success: string`

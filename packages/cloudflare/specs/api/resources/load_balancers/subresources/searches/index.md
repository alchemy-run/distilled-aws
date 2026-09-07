# Searches

## Search Resources

**get** `/accounts/{account_id}/load_balancers/search`

Search for Load Balancing resources.

### Path Parameters

- `account_id: string`

  Identifier.

### Query Parameters

- `page: optional number`

- `per_page: optional number`

- `query: optional string`

  Search query term.

- `references: optional "" or "*" or "referral" or "referrer"`

  The type of references to include. "*" to include both referral and referrer references. "" to not include any reference information.

  - `""`

  - `"*"`

  - `"referral"`

  - `"referrer"`

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

- `result: object { resources }`

  - `resources: optional array of object { reference_type, references, resource_id, 2 more }`

    A list of resources matching the search query.

    - `reference_type: optional "referral" or "referrer"`

      When listed as a reference, the type (direction) of the reference.

      - `"referral"`

      - `"referrer"`

    - `references: optional array of unknown`

      A list of references to (referrer) or from (referral) this resource.

    - `resource_id: optional string`

    - `resource_name: optional string`

      The human-identifiable name of the resource.

    - `resource_type: optional "load_balancer" or "monitor" or "pool"`

      The type of the resource.

      - `"load_balancer"`

      - `"monitor"`

      - `"pool"`

- `success: true`

  Whether the API call was successful.

  - `true`

- `result_info: optional object { count, page, per_page, 2 more }`

  - `count: optional number`

    Total number of results on the current page.

  - `page: optional number`

    Current page within paginated list of results.

  - `per_page: optional number`

    Number of results per page.

  - `total_count: optional number`

    Total results available without any search parameters.

  - `total_pages: optional number`

    Total number of pages available.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/load_balancers/search \
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
  "result": {
    "resources": [
      {
        "reference_type": "referral",
        "references": [
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
        "resource_id": "17b5962d775c646f3f9725cbc7a53df4",
        "resource_name": "primary-dc-1",
        "resource_type": "pool"
      }
    ]
  },
  "success": true,
  "result_info": {
    "count": 20,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```

## Domain Types

### Search List Response

- `SearchListResponse object { resources }`

  - `resources: optional array of object { reference_type, references, resource_id, 2 more }`

    A list of resources matching the search query.

    - `reference_type: optional "referral" or "referrer"`

      When listed as a reference, the type (direction) of the reference.

      - `"referral"`

      - `"referrer"`

    - `references: optional array of unknown`

      A list of references to (referrer) or from (referral) this resource.

    - `resource_id: optional string`

    - `resource_name: optional string`

      The human-identifiable name of the resource.

    - `resource_type: optional "load_balancer" or "monitor" or "pool"`

      The type of the resource.

      - `"load_balancer"`

      - `"monitor"`

      - `"pool"`

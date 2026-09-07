## Get Domain History

**get** `/accounts/{account_id}/intel/domain-history`

Gets historical security threat and content categories currently and previously assigned to a domain.

### Path Parameters

- `account_id: string`

  Identifier.

### Query Parameters

- `domain: optional string`

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

- `result: array of DomainHistory`

  - `categorizations: optional array of object { categories, end, start }`

    - `categories: optional array of object { id, name }`

      - `id: optional number`

      - `name: optional string`

    - `end: optional string`

    - `start: optional string`

  - `domain: optional string`

- `success: true`

  Whether the API call was successful.

  - `true`

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Total number of results for the requested service.

  - `page: optional number`

    Current page within paginated list of results.

  - `per_page: optional number`

    Number of results per page of results.

  - `total_count: optional number`

    Total results available without any search parameters.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/intel/domain-history \
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
      "categorizations": [
        {
          "categories": [
            {
              "id": 155,
              "name": "Technology"
            }
          ],
          "end": "2021-04-30",
          "start": "2021-04-01"
        }
      ],
      "domain": "cloudflare.com"
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

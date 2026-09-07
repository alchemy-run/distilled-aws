## List D1 Databases

**get** `/accounts/{account_id}/d1/database`

Returns a list of D1 databases.

### Path Parameters

- `account_id: string`

  Account identifier tag.

### Query Parameters

- `name: optional string`

  a database name to search for.

- `page: optional number`

  Page number of paginated results.

- `per_page: optional number`

  Number of items per page.

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

- `result: array of object { created_at, jurisdiction, name, 2 more }`

  - `created_at: optional string`

    Specifies the timestamp the resource was created as an ISO8601 string.

  - `jurisdiction: optional "eu" or "fedramp"`

    Specify the location to restrict the D1 database to run and store data. If this option is present, the location hint is ignored.

    - `"eu"`

    - `"fedramp"`

  - `name: optional string`

    D1 database name.

  - `uuid: optional string`

    D1 database identifier (UUID).

  - `version: optional string`

- `success: true`

  Whether the API call was successful

  - `true`

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Total number of results for the requested service

  - `page: optional number`

    Current page within paginated list of results

  - `per_page: optional number`

    Number of results per page of results

  - `total_count: optional number`

    Total results available without any search parameters

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/d1/database \
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
      "created_at": "2022-11-15T18:25:44.442097Z",
      "jurisdiction": "eu",
      "name": "my-database",
      "uuid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
      "version": "production"
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

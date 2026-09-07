## Get domains

**get** `/accounts/{account_id}/pages/projects/{project_name}/domains`

Fetch a list of all domains associated with a Pages project.

### Path Parameters

- `account_id: string`

  Identifier.

- `project_name: string`

  Name of the project.

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

- `result: array of object { id, certificate_authority, created_on, 6 more }`

  - `id: string`

  - `certificate_authority: "google" or "lets_encrypt"`

    - `"google"`

    - `"lets_encrypt"`

  - `created_on: string`

  - `domain_id: string`

  - `name: string`

    The domain name.

  - `status: "initializing" or "pending" or "active" or 3 more`

    - `"initializing"`

    - `"pending"`

    - `"active"`

    - `"deactivated"`

    - `"blocked"`

    - `"error"`

  - `validation_data: object { method, status, error_message, 2 more }`

    - `method: "http" or "txt"`

      - `"http"`

      - `"txt"`

    - `status: "initializing" or "pending" or "active" or 2 more`

      - `"initializing"`

      - `"pending"`

      - `"active"`

      - `"deactivated"`

      - `"error"`

    - `error_message: optional string`

    - `txt_name: optional string`

    - `txt_value: optional string`

  - `verification_data: object { status, error_message }`

    - `status: "pending" or "active" or "deactivated" or 2 more`

      - `"pending"`

      - `"active"`

      - `"deactivated"`

      - `"blocked"`

      - `"error"`

    - `error_message: optional string`

  - `zone_tag: string`

- `success: true`

  Whether the API call was successful.

  - `true`

- `result_info: optional object { count, page, per_page, 2 more }`

  - `count: optional number`

    Total number of results for the requested service.

  - `page: optional number`

    Current page within paginated list of results.

  - `per_page: optional number`

    Number of results per page of results.

  - `total_count: optional number`

    Total results available without any search parameters.

  - `total_pages: optional number`

    The number of total pages in the entire result set.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pages/projects/$PROJECT_NAME/domains \
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
      "id": "id",
      "certificate_authority": "lets_encrypt",
      "created_on": "created_on",
      "domain_id": "domain_id",
      "name": "this-is-my-domain-01.com",
      "status": "initializing",
      "validation_data": {
        "method": "http",
        "status": "initializing",
        "error_message": "error_message",
        "txt_name": "txt_name",
        "txt_value": "txt_value"
      },
      "verification_data": {
        "status": "pending",
        "error_message": "error_message"
      },
      "zone_tag": "zone_tag"
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```

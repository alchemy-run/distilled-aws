# Users

## List SCIM User resources

**get** `/accounts/{account_id}/access/identity_providers/{identity_provider_id}/scim/users`

Lists SCIM User resources synced to Cloudflare via the System for Cross-domain Identity Management (SCIM).

### Path Parameters

- `account_id: string`

  Identifier.

- `identity_provider_id: string`

  UUID.

### Query Parameters

- `cf_resource_id: optional array of string`

  The unique Cloudflare-generated Id of the SCIM User resource; also known as the "Id".
  Pass once for a single lookup (`?cf_resource_id=A`) or repeat the parameter
  (`?cf_resource_id=A&cf_resource_id=B`) to look up multiple users in one request,
  up to 50 values. Mutually exclusive with `idp_resource_id`, `username`, `email`,
  `name`, `search_contains`, and `search_starts_with`.

- `email: optional string`

  The email address of the SCIM User resource.

- `idp_resource_id: optional array of string`

  The IdP-generated Id of the SCIM User resource; also known as the "external Id".
  Pass once for a single lookup (`?idp_resource_id=A`) or repeat the parameter
  (`?idp_resource_id=A&idp_resource_id=B`) to look up multiple users in one request,
  up to 50 values. Mutually exclusive with `cf_resource_id`, `username`, `email`,
  `name`, `search_contains`, and `search_starts_with`.

- `name: optional string`

  The name of the SCIM User resource.

- `page: optional number`

  Page number of results.

- `per_page: optional number`

  Number of results per page.

- `username: optional string`

  The username of the SCIM User resource.

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

- `success: true`

  Whether the API call was successful.

  - `true`

- `result: optional array of AccessUser`

  - `id: optional string`

    The unique Cloudflare-generated Id of the SCIM resource.

  - `active: optional boolean`

    Determines the status of the SCIM User resource.

  - `displayName: optional string`

    The name of the SCIM User resource.

  - `emails: optional array of object { primary, type, value }`

    - `primary: optional boolean`

      Indicates if the email address is the primary email belonging to the SCIM User resource.

    - `type: optional string`

      Indicates the type of the email address.

    - `value: optional string`

      The email address of the SCIM User resource.

  - `externalId: optional string`

    The IdP-generated Id of the SCIM resource.

  - `meta: optional object { created, lastModified }`

    The metadata of the SCIM resource.

    - `created: optional string`

      The timestamp of when the SCIM resource was created.

    - `lastModified: optional string`

      The timestamp of when the SCIM resource was last modified.

  - `schemas: optional array of string`

    The list of URIs which indicate the attributes contained within a SCIM resource.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/identity_providers/$IDENTITY_PROVIDER_ID/scim/users \
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
  "result": [
    {
      "id": "bd97ef8d-7986-43e3-9ee0-c25dda33e4b0",
      "active": true,
      "displayName": "John Smith",
      "emails": [
        {
          "primary": true,
          "type": "work",
          "value": "john.smith@example.com"
        }
      ],
      "externalId": "john_smith",
      "meta": {
        "created": "2025-01-01T00:00:00Z",
        "lastModified": "2025-01-02T00:00:00Z"
      },
      "schemas": [
        "urn:ietf:params:scim:schemas:core:2.0:User"
      ]
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```

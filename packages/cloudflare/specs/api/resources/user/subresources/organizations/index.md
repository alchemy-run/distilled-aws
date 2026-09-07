# Organizations

## List Organizations

**get** `/user/organizations`

Lists organizations the user is associated with.

### Query Parameters

- `direction: optional "asc" or "desc"`

  Direction to order organizations.

  - `"asc"`

  - `"desc"`

- `match: optional "any" or "all"`

  Whether to match all search requirements or at least one (any).

  - `"any"`

  - `"all"`

- `name: optional string`

  Organization name.

- `order: optional "id" or "name" or "status"`

  Field to order organizations by.

  - `"id"`

  - `"name"`

  - `"status"`

- `page: optional number`

  Page number of paginated results.

- `per_page: optional number`

  Number of organizations per page.

- `status: optional "member" or "invited"`

  Whether the user is a member of the organization or has an inivitation pending.

  - `"member"`

  - `"invited"`

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

- `result: optional array of Organization`

  - `id: optional string`

    Identifier

  - `name: optional string`

    Organization name.

  - `permissions: optional array of Permission`

    Access permissions for this User.

  - `roles: optional array of string`

    List of roles that a user has within an organization.

  - `status: optional Status`

    Whether the user is a member of the organization or has an invitation pending.

    - `"member"`

    - `"invited"`

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
curl https://api.cloudflare.com/client/v4/user/organizations \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
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
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "name": "Cloudflare, Inc.",
      "permissions": [
        "#zones:read"
      ],
      "roles": [
        "All Privileges - Super Administrator"
      ],
      "status": "member"
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

## Organization Details

**get** `/user/organizations/{organization_id}`

Gets a specific organization the user is associated with.

### Path Parameters

- `organization_id: string`

  Identifier

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

- `result: optional unknown`

### Example

```http
curl https://api.cloudflare.com/client/v4/user/organizations/$ORGANIZATION_ID \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
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
  "result": {}
}
```

## Leave Organization

**delete** `/user/organizations/{organization_id}`

Removes association to an organization.

### Path Parameters

- `organization_id: string`

  Identifier

### Returns

- `id: optional string`

  Identifier

### Example

```http
curl https://api.cloudflare.com/client/v4/user/organizations/$ORGANIZATION_ID \
    -X DELETE \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
```

#### Response

```json
{
  "id": "023e105f4ecef8ad9ca31a8372d0c353"
}
```

## Domain Types

### Organization

- `Organization object { id, name, permissions, 2 more }`

  - `id: optional string`

    Identifier

  - `name: optional string`

    Organization name.

  - `permissions: optional array of Permission`

    Access permissions for this User.

  - `roles: optional array of string`

    List of roles that a user has within an organization.

  - `status: optional Status`

    Whether the user is a member of the organization or has an invitation pending.

    - `"member"`

    - `"invited"`

### Organization Get Response

- `OrganizationGetResponse = unknown`

### Organization Delete Response

- `OrganizationDeleteResponse object { id }`

  - `id: optional string`

    Identifier

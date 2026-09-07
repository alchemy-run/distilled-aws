# Members

## List organization members

**get** `/organizations/{organization_id}/members`

List memberships for an Organization. (Currently in Public Beta - see https://developers.cloudflare.com/fundamentals/organizations/)

### Path Parameters

- `organization_id: string`

### Query Parameters

- `page_size: optional number`

  The amount of items to return. Defaults to 10.

- `page_token: optional string`

  An opaque token returned from the last list response that when
  provided will retrieve the next page.

  Parameters used to filter the retrieved list must remain in subsequent
  requests with a page token.

- `status: optional array of "active" or "canceled"`

  Filter the list of memberships by membership status.

  - `"active"`

  - `"canceled"`

- `user: optional object { email }`

  - `email: optional string`

    Filter the list of memberships for a specific email that ends with a substring.

### Returns

- `errors: array of unknown`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `result: array of OrganizationMember`

  - `id: string`

    Organization Member ID

  - `create_time: string`

  - `meta: map[unknown]`

  - `status: "active" or "canceled"`

    - `"active"`

    - `"canceled"`

  - `update_time: string`

  - `user: object { id, email, name, two_factor_authentication_enabled }`

    - `id: string`

    - `email: string`

    - `name: string`

    - `two_factor_authentication_enabled: boolean`

- `result_info: object { next_page_token, total_size }`

  - `next_page_token: optional string`

    Use this opaque token in the next request to retrieve the
    next page.

    Parameters used to filter the retrieved list must remain in subsequent
    requests with a page token.

  - `total_size: optional number`

    Counts the total amount of items in a list with the applied filters. The API omits next_page_token to indicate no more items in a particular list.

- `success: true`

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/organizations/$ORGANIZATION_ID/members \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
```

#### Response

```json
{
  "errors": [],
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
      "id": "a7b9c3d2e8f4g1h5i6j0k9l2m3n7o4p8",
      "create_time": "2019-12-27T18:11:19.117Z",
      "meta": {
        "foo": {}
      },
      "status": "active",
      "update_time": "2019-12-27T18:11:19.117Z",
      "user": {
        "id": "id",
        "email": "email",
        "name": "name",
        "two_factor_authentication_enabled": true
      }
    }
  ],
  "result_info": {
    "next_page_token": "next_page_token",
    "total_size": 0
  },
  "success": true
}
```

## Get organization member

**get** `/organizations/{organization_id}/members/{member_id}`

Retrieve a single membership from an Organization. (Currently in Public Beta - see https://developers.cloudflare.com/fundamentals/organizations/)

### Path Parameters

- `organization_id: string`

- `member_id: string`

  Organization Member ID

### Returns

- `errors: array of unknown`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `result: OrganizationMember`

  - `id: string`

    Organization Member ID

  - `create_time: string`

  - `meta: map[unknown]`

  - `status: "active" or "canceled"`

    - `"active"`

    - `"canceled"`

  - `update_time: string`

  - `user: object { id, email, name, two_factor_authentication_enabled }`

    - `id: string`

    - `email: string`

    - `name: string`

    - `two_factor_authentication_enabled: boolean`

- `success: true`

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/organizations/$ORGANIZATION_ID/members/$MEMBER_ID \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
```

#### Response

```json
{
  "errors": [],
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
    "id": "a7b9c3d2e8f4g1h5i6j0k9l2m3n7o4p8",
    "create_time": "2019-12-27T18:11:19.117Z",
    "meta": {
      "foo": {}
    },
    "status": "active",
    "update_time": "2019-12-27T18:11:19.117Z",
    "user": {
      "id": "id",
      "email": "email",
      "name": "name",
      "two_factor_authentication_enabled": true
    }
  },
  "success": true
}
```

## Create organization member

**post** `/organizations/{organization_id}/members`

Create a membership that grants access to a specific Organization. (Currently in Public Beta - see https://developers.cloudflare.com/fundamentals/organizations/)

### Path Parameters

- `organization_id: string`

### Body Parameters

- `member: object { user, status }`

  - `user: object { email }`

    - `email: string`

  - `status: optional "active" or "canceled"`

    - `"active"`

    - `"canceled"`

### Returns

- `errors: array of unknown`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `result: OrganizationMember`

  - `id: string`

    Organization Member ID

  - `create_time: string`

  - `meta: map[unknown]`

  - `status: "active" or "canceled"`

    - `"active"`

    - `"canceled"`

  - `update_time: string`

  - `user: object { id, email, name, two_factor_authentication_enabled }`

    - `id: string`

    - `email: string`

    - `name: string`

    - `two_factor_authentication_enabled: boolean`

- `success: true`

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/organizations/$ORGANIZATION_ID/members \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "member": {
            "user": {
              "email": "email"
            }
          }
        }'
```

#### Response

```json
{
  "errors": [],
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
    "id": "a7b9c3d2e8f4g1h5i6j0k9l2m3n7o4p8",
    "create_time": "2019-12-27T18:11:19.117Z",
    "meta": {
      "foo": {}
    },
    "status": "active",
    "update_time": "2019-12-27T18:11:19.117Z",
    "user": {
      "id": "id",
      "email": "email",
      "name": "name",
      "two_factor_authentication_enabled": true
    }
  },
  "success": true
}
```

## Delete organization member

**delete** `/organizations/{organization_id}/members/{member_id}`

Delete a membership to a particular Organization. (Currently in Public Beta - see https://developers.cloudflare.com/fundamentals/organizations/)

### Path Parameters

- `organization_id: string`

- `member_id: string`

  Organization Member ID

### Example

```http
curl https://api.cloudflare.com/client/v4/organizations/$ORGANIZATION_ID/members/$MEMBER_ID \
    -X DELETE \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
```

## Domain Types

### Organization Member

- `OrganizationMember object { id, create_time, meta, 3 more }`

  - `id: string`

    Organization Member ID

  - `create_time: string`

  - `meta: map[unknown]`

  - `status: "active" or "canceled"`

    - `"active"`

    - `"canceled"`

  - `update_time: string`

  - `user: object { id, email, name, two_factor_authentication_enabled }`

    - `id: string`

    - `email: string`

    - `name: string`

    - `two_factor_authentication_enabled: boolean`

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

## Delete organization.

**delete** `/organizations/{organization_id}`

Delete an organization. The organization MUST be empty before deleting.
It must not contain any sub-organizations, accounts, members or users. (Currently in Public Beta - see https://developers.cloudflare.com/fundamentals/organizations/)

**Access Control:** Restricted to enterprise organizations.

### Path Parameters

- `organization_id: string`

### Returns

- `errors: array of unknown`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `result: object { id }`

  - `id: string`

- `success: true`

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/organizations/$ORGANIZATION_ID \
    -X DELETE \
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
    "id": "id"
  },
  "success": true
}
```

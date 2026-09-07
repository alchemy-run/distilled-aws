## Create a new share resource

**post** `/accounts/{account_id}/shares/{share_id}/resources`

Adds a resource to an existing share, making it available to share recipients.

### Path Parameters

- `account_id: string`

  Account identifier.

- `share_id: string`

  Share identifier tag.

### Body Parameters

- `meta: unknown`

  Resource Metadata.

- `resource_account_id: string`

  Account identifier.

- `resource_id: string`

  Share Resource identifier.

- `resource_type: "custom-ruleset" or "gateway-policy" or "gateway-destination-ip" or 3 more`

  Resource Type.

  - `"custom-ruleset"`

  - `"gateway-policy"`

  - `"gateway-destination-ip"`

  - `"gateway-block-page-settings"`

  - `"gateway-extended-email-matching"`

  - `"idp-federation-grant"`

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `success: boolean`

  Whether the API call was successful.

- `result: optional object { id, created, meta, 6 more }`

  - `id: string`

    Share Resource identifier.

  - `created: string`

    When the share was created.

  - `meta: unknown`

    Resource Metadata.

  - `modified: string`

    When the share was modified.

  - `resource_account_id: string`

    Account identifier.

  - `resource_id: string`

    Share Resource identifier.

  - `resource_type: "custom-ruleset" or "gateway-policy" or "gateway-destination-ip" or 3 more`

    Resource Type.

    - `"custom-ruleset"`

    - `"gateway-policy"`

    - `"gateway-destination-ip"`

    - `"gateway-block-page-settings"`

    - `"gateway-extended-email-matching"`

    - `"idp-federation-grant"`

  - `resource_version: number`

    Resource Version.

  - `status: "active" or "deleting" or "deleted"`

    Resource Status.

    - `"active"`

    - `"deleting"`

    - `"deleted"`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/shares/$SHARE_ID/resources \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "meta": {},
          "resource_account_id": "023e105f4ecef8ad9ca31a8372d0c353",
          "resource_id": "023e105f4ecef8ad9ca31a8372d0c353",
          "resource_type": "custom-ruleset"
        }'
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
  "success": true,
  "result": {
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "created": "2023-09-21T18:56:32.624632Z",
    "meta": {},
    "modified": "2023-09-21T18:56:32.624632Z",
    "resource_account_id": "023e105f4ecef8ad9ca31a8372d0c353",
    "resource_id": "023e105f4ecef8ad9ca31a8372d0c353",
    "resource_type": "custom-ruleset",
    "resource_version": 0,
    "status": "active"
  }
}
```

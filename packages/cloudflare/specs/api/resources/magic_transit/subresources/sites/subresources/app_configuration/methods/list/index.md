## List App Configs

**get** `/accounts/{account_id}/magic/sites/{site_id}/app_configs`

Lists App Configs associated with a site.

### Path Parameters

- `account_id: string`

  Identifier

- `site_id: string`

  Identifier

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

- `result: array of object { account_app_id, id, breakout, 3 more }  or object { managed_app_id, id, breakout, 3 more }`

  - `AccountApp object { account_app_id, id, breakout, 3 more }`

    - `account_app_id: string`

      Magic account app ID.

    - `id: optional string`

      Identifier

    - `breakout: optional boolean`

      Whether to breakout traffic to the app's endpoints directly. Null preserves default behavior.

    - `preferred_wans: optional array of string`

      WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

    - `priority: optional number`

      Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

    - `site_id: optional string`

      Identifier

  - `ManagedApp object { managed_app_id, id, breakout, 3 more }`

    - `managed_app_id: string`

      Managed app ID.

    - `id: optional string`

      Identifier

    - `breakout: optional boolean`

      Whether to breakout traffic to the app's endpoints directly. Null preserves default behavior.

    - `preferred_wans: optional array of string`

      WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

    - `priority: optional number`

      Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

    - `site_id: optional string`

      Identifier

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites/$SITE_ID/app_configs \
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
      "account_app_id": "ac60d3d0435248289d446cedd870bcf4",
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "breakout": true,
      "preferred_wans": [
        "023e105f4ecef8ad9ca31a8372d0c353"
      ],
      "priority": 0,
      "site_id": "023e105f4ecef8ad9ca31a8372d0c353"
    }
  ],
  "success": true
}
```

## Update a Page Shield policy

**put** `/zones/{zone_id}/page_shield/policies/{policy_id}`

Update a Page Shield policy by ID.

### Path Parameters

- `zone_id: string`

  Identifier

- `policy_id: string`

  Identifier

### Body Parameters

- `action: optional "allow" or "log" or "add_reporting_directives"`

  The action to take if the expression matches

  - `"allow"`

  - `"log"`

  - `"add_reporting_directives"`

- `description: optional string`

  A description for the policy

- `enabled: optional boolean`

  Whether the policy is enabled

- `expression: optional string`

  The expression which must match for the policy to be applied, using the Cloudflare Firewall rule expression syntax

- `value: optional string`

  The policy which will be applied

### Returns

- `result: object { id, action, description, 3 more }`

  - `id: string`

    Identifier

  - `action: "allow" or "log" or "add_reporting_directives"`

    The action to take if the expression matches

    - `"allow"`

    - `"log"`

    - `"add_reporting_directives"`

  - `description: string`

    A description for the policy

  - `enabled: boolean`

    Whether the policy is enabled

  - `expression: string`

    The expression which must match for the policy to be applied, using the Cloudflare Firewall rule expression syntax

  - `value: string`

    The policy which will be applied

- `success: true`

  Whether the API call was successful

  - `true`

- `errors: optional array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: optional array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/page_shield/policies/$POLICY_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d "{
          \"action\": \"allow\",
          \"description\": \"Checkout page CSP policy\",
          \"enabled\": true,
          \"expression\": \"ends_with(http.request.uri.path, \\\"/checkout\\\")\",
          \"value\": \"script-src 'none';\"
        }"
```

#### Response

```json
{
  "result": {
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "action": "allow",
    "description": "Checkout page CSP policy",
    "enabled": true,
    "expression": "ends_with(http.request.uri.path, \"/checkout\")",
    "value": "script-src 'none';"
  },
  "success": true,
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
  ]
}
```

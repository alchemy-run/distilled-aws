## Get Chrome DevTools Protocol schema.

**get** `/accounts/{account_id}/browser-rendering/devtools/browser/{session_id}/json/protocol`

Returns the complete Chrome DevTools Protocol schema including all domains, commands, events, and types. This schema describes the entire CDP API surface.

### Path Parameters

- `account_id: string`

  Account ID.

- `session_id: string`

  Browser session ID.

### Returns

- `domains: array of object { domain, commands, dependencies, 3 more }`

  List of protocol domains.

  - `domain: string`

    Domain name.

  - `commands: optional array of map[unknown]`

    Available commands.

  - `dependencies: optional array of string`

    Domain dependencies.

  - `events: optional array of map[unknown]`

    Available events.

  - `experimental: optional boolean`

    Whether this domain is experimental.

  - `types: optional array of map[unknown]`

    Type definitions.

- `version: optional object { major, minor }`

  Protocol version.

  - `major: string`

    Major version.

  - `minor: string`

    Minor version.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/browser-rendering/devtools/browser/$SESSION_ID/json/protocol \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "domains": [
    {
      "domain": "domain",
      "commands": [
        {
          "foo": {}
        }
      ],
      "dependencies": [
        "string"
      ],
      "events": [
        {
          "foo": {}
        }
      ],
      "experimental": true,
      "types": [
        {
          "foo": {}
        }
      ]
    }
  ],
  "version": {
    "major": "major",
    "minor": "minor"
  }
}
```

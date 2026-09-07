## Attach Domain

**put** `/accounts/{account_id}/workers/domains`

Attaches a domain that routes traffic to a Worker.

### Path Parameters

- `account_id: string`

  Identifier.

### Body Parameters

- `hostname: string`

  Hostname of the domain. Can be either the zone apex or a subdomain of the zone. Requests to this hostname will be routed to the configured Worker.

- `service: string`

  Name of the Worker associated with the domain. Requests to the configured hostname will be routed to this Worker.

- `environment: optional string`

  Worker environment associated with the domain.

- `zone_id: optional string`

  ID of the zone containing the domain hostname.

- `zone_name: optional string`

  Name of the zone containing the domain hostname.

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

- `result: object { id, cert_id, environment, 4 more }`

  - `id: string`

    Immutable ID of the domain.

  - `cert_id: string`

    ID of the TLS certificate issued for the domain.

  - `environment: string`

    Worker environment associated with the domain.

  - `hostname: string`

    Hostname of the domain. Can be either the zone apex or a subdomain of the zone. Requests to this hostname will be routed to the configured Worker.

  - `service: string`

    Name of the Worker associated with the domain. Requests to the configured hostname will be routed to this Worker.

  - `zone_id: string`

    ID of the zone containing the domain hostname.

  - `zone_name: string`

    Name of the zone containing the domain hostname.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/domains \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "hostname": "app.example.com",
          "service": "my-worker",
          "environment": "production",
          "zone_id": "593c9c94de529bbbfaac7c53ced0447d",
          "zone_name": "example.com"
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
    "id": "dbe10b4bc17c295377eabd600e1787fd",
    "cert_id": "9fdf92c8-64c2-4a3d-b1af-e15304961145",
    "environment": "production",
    "hostname": "app.example.com",
    "service": "my-worker",
    "zone_id": "593c9c94de529bbbfaac7c53ced0447d",
    "zone_name": "example.com"
  },
  "success": true
}
```

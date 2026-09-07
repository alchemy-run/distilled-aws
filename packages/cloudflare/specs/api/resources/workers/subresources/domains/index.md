# Domains

## List Domains

**get** `/accounts/{account_id}/workers/domains`

Lists all domains for an account.

### Path Parameters

- `account_id: string`

  Identifier.

### Query Parameters

- `environment: optional string`

  Worker environment associated with the domain.

- `hostname: optional string`

  Hostname of the domain.

- `service: optional string`

  Name of the Worker associated with the domain.

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

- `result: array of object { id, cert_id, environment, 4 more }`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/domains \
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
      "id": "dbe10b4bc17c295377eabd600e1787fd",
      "cert_id": "9fdf92c8-64c2-4a3d-b1af-e15304961145",
      "environment": "production",
      "hostname": "app.example.com",
      "service": "my-worker",
      "zone_id": "593c9c94de529bbbfaac7c53ced0447d",
      "zone_name": "example.com"
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```

## Get Domain

**get** `/accounts/{account_id}/workers/domains/{domain_id}`

Gets information about a domain.

### Path Parameters

- `account_id: string`

  Identifier.

- `domain_id: string`

  ID of the domain.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/domains/$DOMAIN_ID \
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

## Detach Domain

**delete** `/accounts/{account_id}/workers/domains/{domain_id}`

Detaches a domain from a Worker. Both the Worker and all of its previews are no longer routable using this domain.

### Path Parameters

- `account_id: string`

  Identifier.

- `domain_id: string`

  ID of the domain.

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/domains/$DOMAIN_ID \
    -X DELETE \
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
  "success": true
}
```

## Domain Types

### Domain List Response

- `DomainListResponse object { id, cert_id, environment, 4 more }`

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

### Domain Get Response

- `DomainGetResponse object { id, cert_id, environment, 4 more }`

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

### Domain Update Response

- `DomainUpdateResponse object { id, cert_id, environment, 4 more }`

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

### Domain Delete Response

- `DomainDeleteResponse object { errors, messages, success }`

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

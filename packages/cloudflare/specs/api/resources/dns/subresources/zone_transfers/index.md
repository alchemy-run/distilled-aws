# Zone Transfers

# Force AXFR

## Force AXFR

**post** `/zones/{zone_id}/secondary_dns/force_axfr`

Sends AXFR zone transfer request to primary nameserver(s).

### Path Parameters

- `zone_id: string`

### Body Parameters

- `body: unknown`

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

- `result: optional ForceAXFR`

  When force_axfr query parameter is set to true, the response is a simple string.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/secondary_dns/force_axfr \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{}'
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
  "result": "OK"
}
```

## Domain Types

### Force AXFR

- `ForceAXFR = string`

  When force_axfr query parameter is set to true, the response is a simple string.

# Incoming

## Secondary Zone Configuration Details

**get** `/zones/{zone_id}/secondary_dns/incoming`

Get secondary zone configuration for incoming zone transfers.

### Path Parameters

- `zone_id: string`

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

- `result: optional object { id, auto_refresh_seconds, checked_time, 5 more }`

  - `id: optional string`

  - `auto_refresh_seconds: optional number`

    How often should a secondary zone auto refresh regardless of DNS NOTIFY.
    Not applicable for primary zones.

  - `checked_time: optional string`

    The time for a specific event.

  - `created_time: optional string`

    The time for a specific event.

  - `modified_time: optional string`

    The time for a specific event.

  - `name: optional string`

    Zone name.

  - `peers: optional array of string`

    A list of peer tags.

  - `soa_serial: optional number`

    The serial number of the SOA for the given zone.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/secondary_dns/incoming \
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
  "success": true,
  "result": {
    "id": "269d8f4853475ca241c4e730be286b20",
    "auto_refresh_seconds": 86400,
    "checked_time": "2019-10-24T17:09:42.883908+01:00",
    "created_time": "2019-10-24T17:09:42.883908+01:00",
    "modified_time": "2019-10-24T17:09:42.883908+01:00",
    "name": "www.example.com.",
    "peers": [
      "23ff594956f20c2a721606e94745a8aa",
      "00920f38ce07c2e2f4df50b1f61d4194"
    ],
    "soa_serial": 2019102400
  }
}
```

## Create Secondary Zone Configuration

**post** `/zones/{zone_id}/secondary_dns/incoming`

Create secondary zone configuration for incoming zone transfers.

### Path Parameters

- `zone_id: string`

### Body Parameters

- `auto_refresh_seconds: number`

  How often should a secondary zone auto refresh regardless of DNS NOTIFY.
  Not applicable for primary zones.

- `name: string`

  Zone name.

- `peers: array of string`

  A list of peer tags.

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

- `result: optional object { id, auto_refresh_seconds, checked_time, 5 more }`

  - `id: optional string`

  - `auto_refresh_seconds: optional number`

    How often should a secondary zone auto refresh regardless of DNS NOTIFY.
    Not applicable for primary zones.

  - `checked_time: optional string`

    The time for a specific event.

  - `created_time: optional string`

    The time for a specific event.

  - `modified_time: optional string`

    The time for a specific event.

  - `name: optional string`

    Zone name.

  - `peers: optional array of string`

    A list of peer tags.

  - `soa_serial: optional number`

    The serial number of the SOA for the given zone.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/secondary_dns/incoming \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "auto_refresh_seconds": 86400,
          "name": "www.example.com.",
          "peers": [
            "23ff594956f20c2a721606e94745a8aa",
            "00920f38ce07c2e2f4df50b1f61d4194"
          ]
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
  "success": true,
  "result": {
    "id": "269d8f4853475ca241c4e730be286b20",
    "auto_refresh_seconds": 86400,
    "checked_time": "2019-10-24T17:09:42.883908+01:00",
    "created_time": "2019-10-24T17:09:42.883908+01:00",
    "modified_time": "2019-10-24T17:09:42.883908+01:00",
    "name": "www.example.com.",
    "peers": [
      "23ff594956f20c2a721606e94745a8aa",
      "00920f38ce07c2e2f4df50b1f61d4194"
    ],
    "soa_serial": 2019102400
  }
}
```

## Update Secondary Zone Configuration

**put** `/zones/{zone_id}/secondary_dns/incoming`

Update secondary zone configuration for incoming zone transfers.

### Path Parameters

- `zone_id: string`

### Body Parameters

- `auto_refresh_seconds: number`

  How often should a secondary zone auto refresh regardless of DNS NOTIFY.
  Not applicable for primary zones.

- `name: string`

  Zone name.

- `peers: array of string`

  A list of peer tags.

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

- `result: optional object { id, auto_refresh_seconds, checked_time, 5 more }`

  - `id: optional string`

  - `auto_refresh_seconds: optional number`

    How often should a secondary zone auto refresh regardless of DNS NOTIFY.
    Not applicable for primary zones.

  - `checked_time: optional string`

    The time for a specific event.

  - `created_time: optional string`

    The time for a specific event.

  - `modified_time: optional string`

    The time for a specific event.

  - `name: optional string`

    Zone name.

  - `peers: optional array of string`

    A list of peer tags.

  - `soa_serial: optional number`

    The serial number of the SOA for the given zone.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/secondary_dns/incoming \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "auto_refresh_seconds": 86400,
          "name": "www.example.com.",
          "peers": [
            "23ff594956f20c2a721606e94745a8aa",
            "00920f38ce07c2e2f4df50b1f61d4194"
          ]
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
  "success": true,
  "result": {
    "id": "269d8f4853475ca241c4e730be286b20",
    "auto_refresh_seconds": 86400,
    "checked_time": "2019-10-24T17:09:42.883908+01:00",
    "created_time": "2019-10-24T17:09:42.883908+01:00",
    "modified_time": "2019-10-24T17:09:42.883908+01:00",
    "name": "www.example.com.",
    "peers": [
      "23ff594956f20c2a721606e94745a8aa",
      "00920f38ce07c2e2f4df50b1f61d4194"
    ],
    "soa_serial": 2019102400
  }
}
```

## Delete Secondary Zone Configuration

**delete** `/zones/{zone_id}/secondary_dns/incoming`

Delete secondary zone configuration for incoming zone transfers.

### Path Parameters

- `zone_id: string`

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

- `result: optional object { id }`

  - `id: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/secondary_dns/incoming \
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
  "success": true,
  "result": {
    "id": "269d8f4853475ca241c4e730be286b20"
  }
}
```

## Domain Types

### Incoming

- `Incoming object { id, auto_refresh_seconds, checked_time, 5 more }`

  - `id: optional string`

  - `auto_refresh_seconds: optional number`

    How often should a secondary zone auto refresh regardless of DNS NOTIFY.
    Not applicable for primary zones.

  - `checked_time: optional string`

    The time for a specific event.

  - `created_time: optional string`

    The time for a specific event.

  - `modified_time: optional string`

    The time for a specific event.

  - `name: optional string`

    Zone name.

  - `peers: optional array of string`

    A list of peer tags.

  - `soa_serial: optional number`

    The serial number of the SOA for the given zone.

### Incoming Get Response

- `IncomingGetResponse object { id, auto_refresh_seconds, checked_time, 5 more }`

  - `id: optional string`

  - `auto_refresh_seconds: optional number`

    How often should a secondary zone auto refresh regardless of DNS NOTIFY.
    Not applicable for primary zones.

  - `checked_time: optional string`

    The time for a specific event.

  - `created_time: optional string`

    The time for a specific event.

  - `modified_time: optional string`

    The time for a specific event.

  - `name: optional string`

    Zone name.

  - `peers: optional array of string`

    A list of peer tags.

  - `soa_serial: optional number`

    The serial number of the SOA for the given zone.

### Incoming Create Response

- `IncomingCreateResponse object { id, auto_refresh_seconds, checked_time, 5 more }`

  - `id: optional string`

  - `auto_refresh_seconds: optional number`

    How often should a secondary zone auto refresh regardless of DNS NOTIFY.
    Not applicable for primary zones.

  - `checked_time: optional string`

    The time for a specific event.

  - `created_time: optional string`

    The time for a specific event.

  - `modified_time: optional string`

    The time for a specific event.

  - `name: optional string`

    Zone name.

  - `peers: optional array of string`

    A list of peer tags.

  - `soa_serial: optional number`

    The serial number of the SOA for the given zone.

### Incoming Update Response

- `IncomingUpdateResponse object { id, auto_refresh_seconds, checked_time, 5 more }`

  - `id: optional string`

  - `auto_refresh_seconds: optional number`

    How often should a secondary zone auto refresh regardless of DNS NOTIFY.
    Not applicable for primary zones.

  - `checked_time: optional string`

    The time for a specific event.

  - `created_time: optional string`

    The time for a specific event.

  - `modified_time: optional string`

    The time for a specific event.

  - `name: optional string`

    Zone name.

  - `peers: optional array of string`

    A list of peer tags.

  - `soa_serial: optional number`

    The serial number of the SOA for the given zone.

### Incoming Delete Response

- `IncomingDeleteResponse object { id }`

  - `id: optional string`

# Outgoing

## Primary Zone Configuration Details

**get** `/zones/{zone_id}/secondary_dns/outgoing`

Get primary zone configuration for outgoing zone transfers.

### Path Parameters

- `zone_id: string`

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

- `result: optional object { id, checked_time, created_time, 4 more }`

  - `id: optional string`

  - `checked_time: optional string`

    The time for a specific event.

  - `created_time: optional string`

    The time for a specific event.

  - `last_transferred_time: optional string`

    The time for a specific event.

  - `name: optional string`

    Zone name.

  - `peers: optional array of string`

    A list of peer tags.

  - `soa_serial: optional number`

    The serial number of the SOA for the given zone.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/secondary_dns/outgoing \
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
  "success": true,
  "result": {
    "id": "269d8f4853475ca241c4e730be286b20",
    "checked_time": "2019-10-24T17:09:42.883908+01:00",
    "created_time": "2019-10-24T17:09:42.883908+01:00",
    "last_transferred_time": "2019-10-24T17:09:42.883908+01:00",
    "name": "www.example.com.",
    "peers": [
      "23ff594956f20c2a721606e94745a8aa",
      "00920f38ce07c2e2f4df50b1f61d4194"
    ],
    "soa_serial": 2019102400
  }
}
```

## Create Primary Zone Configuration

**post** `/zones/{zone_id}/secondary_dns/outgoing`

Create primary zone configuration for outgoing zone transfers.

### Path Parameters

- `zone_id: string`

### Body Parameters

- `name: string`

  Zone name.

- `peers: array of string`

  A list of peer tags.

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

- `result: optional object { id, checked_time, created_time, 4 more }`

  - `id: optional string`

  - `checked_time: optional string`

    The time for a specific event.

  - `created_time: optional string`

    The time for a specific event.

  - `last_transferred_time: optional string`

    The time for a specific event.

  - `name: optional string`

    Zone name.

  - `peers: optional array of string`

    A list of peer tags.

  - `soa_serial: optional number`

    The serial number of the SOA for the given zone.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/secondary_dns/outgoing \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "www.example.com.",
          "peers": [
            "23ff594956f20c2a721606e94745a8aa",
            "00920f38ce07c2e2f4df50b1f61d4194"
          ]
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
  "success": true,
  "result": {
    "id": "269d8f4853475ca241c4e730be286b20",
    "checked_time": "2019-10-24T17:09:42.883908+01:00",
    "created_time": "2019-10-24T17:09:42.883908+01:00",
    "last_transferred_time": "2019-10-24T17:09:42.883908+01:00",
    "name": "www.example.com.",
    "peers": [
      "23ff594956f20c2a721606e94745a8aa",
      "00920f38ce07c2e2f4df50b1f61d4194"
    ],
    "soa_serial": 2019102400
  }
}
```

## Update Primary Zone Configuration

**put** `/zones/{zone_id}/secondary_dns/outgoing`

Update primary zone configuration for outgoing zone transfers.

### Path Parameters

- `zone_id: string`

### Body Parameters

- `name: string`

  Zone name.

- `peers: array of string`

  A list of peer tags.

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

- `result: optional object { id, checked_time, created_time, 4 more }`

  - `id: optional string`

  - `checked_time: optional string`

    The time for a specific event.

  - `created_time: optional string`

    The time for a specific event.

  - `last_transferred_time: optional string`

    The time for a specific event.

  - `name: optional string`

    Zone name.

  - `peers: optional array of string`

    A list of peer tags.

  - `soa_serial: optional number`

    The serial number of the SOA for the given zone.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/secondary_dns/outgoing \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "www.example.com.",
          "peers": [
            "23ff594956f20c2a721606e94745a8aa",
            "00920f38ce07c2e2f4df50b1f61d4194"
          ]
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
  "success": true,
  "result": {
    "id": "269d8f4853475ca241c4e730be286b20",
    "checked_time": "2019-10-24T17:09:42.883908+01:00",
    "created_time": "2019-10-24T17:09:42.883908+01:00",
    "last_transferred_time": "2019-10-24T17:09:42.883908+01:00",
    "name": "www.example.com.",
    "peers": [
      "23ff594956f20c2a721606e94745a8aa",
      "00920f38ce07c2e2f4df50b1f61d4194"
    ],
    "soa_serial": 2019102400
  }
}
```

## Delete Primary Zone Configuration

**delete** `/zones/{zone_id}/secondary_dns/outgoing`

Delete primary zone configuration for outgoing zone transfers.

### Path Parameters

- `zone_id: string`

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

- `result: optional object { id }`

  - `id: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/secondary_dns/outgoing \
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
  "success": true,
  "result": {
    "id": "269d8f4853475ca241c4e730be286b20"
  }
}
```

## Disable Outgoing Zone Transfers

**post** `/zones/{zone_id}/secondary_dns/outgoing/disable`

Disable outgoing zone transfers for primary zone and clears IXFR backlog of primary zone.

### Path Parameters

- `zone_id: string`

### Body Parameters

- `body: unknown`

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

- `result: optional DisableTransfer`

  The zone transfer status of a primary zone.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/secondary_dns/outgoing/disable \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{}'
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
  "result": "Disabled"
}
```

## Enable Outgoing Zone Transfers

**post** `/zones/{zone_id}/secondary_dns/outgoing/enable`

Enable outgoing zone transfers for primary zone.

### Path Parameters

- `zone_id: string`

### Body Parameters

- `body: unknown`

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

- `result: optional EnableTransfer`

  The zone transfer status of a primary zone.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/secondary_dns/outgoing/enable \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{}'
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
  "result": "Enabled"
}
```

## Force DNS NOTIFY

**post** `/zones/{zone_id}/secondary_dns/outgoing/force_notify`

Notifies the secondary nameserver(s) and clears IXFR backlog of primary zone.

### Path Parameters

- `zone_id: string`

### Body Parameters

- `body: unknown`

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

- `result: optional string`

  When force_notify query parameter is set to true, the response is a simple string.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/secondary_dns/outgoing/force_notify \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{}'
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
  "result": "OK"
}
```

## Domain Types

### Disable Transfer

- `DisableTransfer = string`

  The zone transfer status of a primary zone.

### Enable Transfer

- `EnableTransfer = string`

  The zone transfer status of a primary zone.

### Outgoing

- `Outgoing object { id, checked_time, created_time, 4 more }`

  - `id: optional string`

  - `checked_time: optional string`

    The time for a specific event.

  - `created_time: optional string`

    The time for a specific event.

  - `last_transferred_time: optional string`

    The time for a specific event.

  - `name: optional string`

    Zone name.

  - `peers: optional array of string`

    A list of peer tags.

  - `soa_serial: optional number`

    The serial number of the SOA for the given zone.

### Outgoing Status

- `OutgoingStatus = string`

  The zone transfer status of a primary zone.

### Outgoing Get Response

- `OutgoingGetResponse object { id, checked_time, created_time, 4 more }`

  - `id: optional string`

  - `checked_time: optional string`

    The time for a specific event.

  - `created_time: optional string`

    The time for a specific event.

  - `last_transferred_time: optional string`

    The time for a specific event.

  - `name: optional string`

    Zone name.

  - `peers: optional array of string`

    A list of peer tags.

  - `soa_serial: optional number`

    The serial number of the SOA for the given zone.

### Outgoing Create Response

- `OutgoingCreateResponse object { id, checked_time, created_time, 4 more }`

  - `id: optional string`

  - `checked_time: optional string`

    The time for a specific event.

  - `created_time: optional string`

    The time for a specific event.

  - `last_transferred_time: optional string`

    The time for a specific event.

  - `name: optional string`

    Zone name.

  - `peers: optional array of string`

    A list of peer tags.

  - `soa_serial: optional number`

    The serial number of the SOA for the given zone.

### Outgoing Update Response

- `OutgoingUpdateResponse object { id, checked_time, created_time, 4 more }`

  - `id: optional string`

  - `checked_time: optional string`

    The time for a specific event.

  - `created_time: optional string`

    The time for a specific event.

  - `last_transferred_time: optional string`

    The time for a specific event.

  - `name: optional string`

    Zone name.

  - `peers: optional array of string`

    A list of peer tags.

  - `soa_serial: optional number`

    The serial number of the SOA for the given zone.

### Outgoing Delete Response

- `OutgoingDeleteResponse object { id }`

  - `id: optional string`

### Outgoing Force Notify Response

- `OutgoingForceNotifyResponse = string`

  When force_notify query parameter is set to true, the response is a simple string.

# Status

## Get Outgoing Zone Transfer Status

**get** `/zones/{zone_id}/secondary_dns/outgoing/status`

Get primary zone transfer status.

### Path Parameters

- `zone_id: string`

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

- `result: optional EnableTransfer`

  The zone transfer status of a primary zone.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/secondary_dns/outgoing/status \
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
  "success": true,
  "result": "Enabled"
}
```

# ACLs

## List ACLs

**get** `/accounts/{account_id}/secondary_dns/acls`

List ACLs.

### Path Parameters

- `account_id: string`

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

- `result: optional array of ACL`

  - `id: string`

  - `ip_range: string`

    Allowed IPv4/IPv6 address range of primary or secondary nameservers. This will be applied for the entire account. The IP range is used to allow additional NOTIFY IPs for secondary zones and IPs Cloudflare allows AXFR/IXFR requests from for primary zones. CIDRs are limited to a maximum of /24 for IPv4 and /64 for IPv6 respectively.

  - `name: string`

    The name of the acl.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/secondary_dns/acls \
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
  "success": true,
  "result": [
    {
      "id": "23ff594956f20c2a721606e94745a8aa",
      "ip_range": "192.0.2.53/28",
      "name": "my-acl-1"
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```

## ACL Details

**get** `/accounts/{account_id}/secondary_dns/acls/{acl_id}`

Get ACL.

### Path Parameters

- `account_id: string`

- `acl_id: string`

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

- `result: optional ACL`

  - `id: string`

  - `ip_range: string`

    Allowed IPv4/IPv6 address range of primary or secondary nameservers. This will be applied for the entire account. The IP range is used to allow additional NOTIFY IPs for secondary zones and IPs Cloudflare allows AXFR/IXFR requests from for primary zones. CIDRs are limited to a maximum of /24 for IPv4 and /64 for IPv6 respectively.

  - `name: string`

    The name of the acl.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/secondary_dns/acls/$ACL_ID \
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
  "success": true,
  "result": {
    "id": "23ff594956f20c2a721606e94745a8aa",
    "ip_range": "192.0.2.53/28",
    "name": "my-acl-1"
  }
}
```

## Create ACL

**post** `/accounts/{account_id}/secondary_dns/acls`

Create ACL.

### Path Parameters

- `account_id: string`

### Body Parameters

- `ip_range: string`

  Allowed IPv4/IPv6 address range of primary or secondary nameservers. This will be applied for the entire account. The IP range is used to allow additional NOTIFY IPs for secondary zones and IPs Cloudflare allows AXFR/IXFR requests from for primary zones. CIDRs are limited to a maximum of /24 for IPv4 and /64 for IPv6 respectively.

- `name: string`

  The name of the acl.

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

- `result: optional ACL`

  - `id: string`

  - `ip_range: string`

    Allowed IPv4/IPv6 address range of primary or secondary nameservers. This will be applied for the entire account. The IP range is used to allow additional NOTIFY IPs for secondary zones and IPs Cloudflare allows AXFR/IXFR requests from for primary zones. CIDRs are limited to a maximum of /24 for IPv4 and /64 for IPv6 respectively.

  - `name: string`

    The name of the acl.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/secondary_dns/acls \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "ip_range": "192.0.2.53/28",
          "name": "my-acl-1"
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
  "success": true,
  "result": {
    "id": "23ff594956f20c2a721606e94745a8aa",
    "ip_range": "192.0.2.53/28",
    "name": "my-acl-1"
  }
}
```

## Update ACL

**put** `/accounts/{account_id}/secondary_dns/acls/{acl_id}`

Modify ACL.

### Path Parameters

- `account_id: string`

- `acl_id: string`

### Body Parameters

- `ip_range: string`

  Allowed IPv4/IPv6 address range of primary or secondary nameservers. This will be applied for the entire account. The IP range is used to allow additional NOTIFY IPs for secondary zones and IPs Cloudflare allows AXFR/IXFR requests from for primary zones. CIDRs are limited to a maximum of /24 for IPv4 and /64 for IPv6 respectively.

- `name: string`

  The name of the acl.

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

- `result: optional ACL`

  - `id: string`

  - `ip_range: string`

    Allowed IPv4/IPv6 address range of primary or secondary nameservers. This will be applied for the entire account. The IP range is used to allow additional NOTIFY IPs for secondary zones and IPs Cloudflare allows AXFR/IXFR requests from for primary zones. CIDRs are limited to a maximum of /24 for IPv4 and /64 for IPv6 respectively.

  - `name: string`

    The name of the acl.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/secondary_dns/acls/$ACL_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "ip_range": "192.0.2.53/28",
          "name": "my-acl-1"
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
  "success": true,
  "result": {
    "id": "23ff594956f20c2a721606e94745a8aa",
    "ip_range": "192.0.2.53/28",
    "name": "my-acl-1"
  }
}
```

## Delete ACL

**delete** `/accounts/{account_id}/secondary_dns/acls/{acl_id}`

Delete ACL.

### Path Parameters

- `account_id: string`

- `acl_id: string`

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

- `result: optional object { id }`

  - `id: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/secondary_dns/acls/$ACL_ID \
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
  "success": true,
  "result": {
    "id": "23ff594956f20c2a721606e94745a8aa"
  }
}
```

## Domain Types

### ACL

- `ACL object { id, ip_range, name }`

  - `id: string`

  - `ip_range: string`

    Allowed IPv4/IPv6 address range of primary or secondary nameservers. This will be applied for the entire account. The IP range is used to allow additional NOTIFY IPs for secondary zones and IPs Cloudflare allows AXFR/IXFR requests from for primary zones. CIDRs are limited to a maximum of /24 for IPv4 and /64 for IPv6 respectively.

  - `name: string`

    The name of the acl.

### ACL Delete Response

- `ACLDeleteResponse object { id }`

  - `id: optional string`

# Peers

## List Peers

**get** `/accounts/{account_id}/secondary_dns/peers`

List Peers.

### Path Parameters

- `account_id: string`

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

- `result: optional array of Peer`

  - `id: string`

  - `name: string`

    The name of the peer.

  - `ip: optional string`

    IPv4/IPv6 address of primary or secondary nameserver, depending on what zone this peer is linked to. For primary zones this IP defines the IP of the secondary nameserver Cloudflare will NOTIFY upon zone changes. For secondary zones this IP defines the IP of the primary nameserver Cloudflare will send AXFR/IXFR requests to.

  - `ixfr_enable: optional boolean`

    Enable IXFR transfer protocol, default is AXFR. Only applicable to secondary zones.

  - `port: optional number`

    DNS port of primary or secondary nameserver, depending on what zone this peer is linked to.

  - `tsig_id: optional string`

    TSIG authentication will be used for zone transfer if configured.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/secondary_dns/peers \
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
  "success": true,
  "result": [
    {
      "id": "23ff594956f20c2a721606e94745a8aa",
      "name": "my-peer-1",
      "ip": "192.0.2.53",
      "ixfr_enable": false,
      "port": 53,
      "tsig_id": "69cd1e104af3e6ed3cb344f263fd0d5a"
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```

## Peer Details

**get** `/accounts/{account_id}/secondary_dns/peers/{peer_id}`

Get Peer.

### Path Parameters

- `account_id: string`

- `peer_id: string`

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

- `result: optional Peer`

  - `id: string`

  - `name: string`

    The name of the peer.

  - `ip: optional string`

    IPv4/IPv6 address of primary or secondary nameserver, depending on what zone this peer is linked to. For primary zones this IP defines the IP of the secondary nameserver Cloudflare will NOTIFY upon zone changes. For secondary zones this IP defines the IP of the primary nameserver Cloudflare will send AXFR/IXFR requests to.

  - `ixfr_enable: optional boolean`

    Enable IXFR transfer protocol, default is AXFR. Only applicable to secondary zones.

  - `port: optional number`

    DNS port of primary or secondary nameserver, depending on what zone this peer is linked to.

  - `tsig_id: optional string`

    TSIG authentication will be used for zone transfer if configured.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/secondary_dns/peers/$PEER_ID \
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
  "success": true,
  "result": {
    "id": "23ff594956f20c2a721606e94745a8aa",
    "name": "my-peer-1",
    "ip": "192.0.2.53",
    "ixfr_enable": false,
    "port": 53,
    "tsig_id": "69cd1e104af3e6ed3cb344f263fd0d5a"
  }
}
```

## Create Peer

**post** `/accounts/{account_id}/secondary_dns/peers`

Create Peer.

### Path Parameters

- `account_id: string`

### Body Parameters

- `name: string`

  The name of the peer.

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

- `result: optional Peer`

  - `id: string`

  - `name: string`

    The name of the peer.

  - `ip: optional string`

    IPv4/IPv6 address of primary or secondary nameserver, depending on what zone this peer is linked to. For primary zones this IP defines the IP of the secondary nameserver Cloudflare will NOTIFY upon zone changes. For secondary zones this IP defines the IP of the primary nameserver Cloudflare will send AXFR/IXFR requests to.

  - `ixfr_enable: optional boolean`

    Enable IXFR transfer protocol, default is AXFR. Only applicable to secondary zones.

  - `port: optional number`

    DNS port of primary or secondary nameserver, depending on what zone this peer is linked to.

  - `tsig_id: optional string`

    TSIG authentication will be used for zone transfer if configured.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/secondary_dns/peers \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "my-peer-1"
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
  "success": true,
  "result": {
    "id": "23ff594956f20c2a721606e94745a8aa",
    "name": "my-peer-1",
    "ip": "192.0.2.53",
    "ixfr_enable": false,
    "port": 53,
    "tsig_id": "69cd1e104af3e6ed3cb344f263fd0d5a"
  }
}
```

## Update Peer

**put** `/accounts/{account_id}/secondary_dns/peers/{peer_id}`

Modify Peer.

### Path Parameters

- `account_id: string`

- `peer_id: string`

### Body Parameters

- `name: string`

  The name of the peer.

- `ip: optional string`

  IPv4/IPv6 address of primary or secondary nameserver, depending on what zone this peer is linked to. For primary zones this IP defines the IP of the secondary nameserver Cloudflare will NOTIFY upon zone changes. For secondary zones this IP defines the IP of the primary nameserver Cloudflare will send AXFR/IXFR requests to.

- `ixfr_enable: optional boolean`

  Enable IXFR transfer protocol, default is AXFR. Only applicable to secondary zones.

- `port: optional number`

  DNS port of primary or secondary nameserver, depending on what zone this peer is linked to.

- `tsig_id: optional string`

  TSIG authentication will be used for zone transfer if configured.

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

- `result: optional Peer`

  - `id: string`

  - `name: string`

    The name of the peer.

  - `ip: optional string`

    IPv4/IPv6 address of primary or secondary nameserver, depending on what zone this peer is linked to. For primary zones this IP defines the IP of the secondary nameserver Cloudflare will NOTIFY upon zone changes. For secondary zones this IP defines the IP of the primary nameserver Cloudflare will send AXFR/IXFR requests to.

  - `ixfr_enable: optional boolean`

    Enable IXFR transfer protocol, default is AXFR. Only applicable to secondary zones.

  - `port: optional number`

    DNS port of primary or secondary nameserver, depending on what zone this peer is linked to.

  - `tsig_id: optional string`

    TSIG authentication will be used for zone transfer if configured.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/secondary_dns/peers/$PEER_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "my-peer-1",
          "ip": "192.0.2.53",
          "port": 53,
          "tsig_id": "69cd1e104af3e6ed3cb344f263fd0d5a"
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
  "success": true,
  "result": {
    "id": "23ff594956f20c2a721606e94745a8aa",
    "name": "my-peer-1",
    "ip": "192.0.2.53",
    "ixfr_enable": false,
    "port": 53,
    "tsig_id": "69cd1e104af3e6ed3cb344f263fd0d5a"
  }
}
```

## Delete Peer

**delete** `/accounts/{account_id}/secondary_dns/peers/{peer_id}`

Delete Peer.

### Path Parameters

- `account_id: string`

- `peer_id: string`

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

- `result: optional object { id }`

  - `id: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/secondary_dns/peers/$PEER_ID \
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
  "success": true,
  "result": {
    "id": "23ff594956f20c2a721606e94745a8aa"
  }
}
```

## Domain Types

### Peer

- `Peer object { id, name, ip, 3 more }`

  - `id: string`

  - `name: string`

    The name of the peer.

  - `ip: optional string`

    IPv4/IPv6 address of primary or secondary nameserver, depending on what zone this peer is linked to. For primary zones this IP defines the IP of the secondary nameserver Cloudflare will NOTIFY upon zone changes. For secondary zones this IP defines the IP of the primary nameserver Cloudflare will send AXFR/IXFR requests to.

  - `ixfr_enable: optional boolean`

    Enable IXFR transfer protocol, default is AXFR. Only applicable to secondary zones.

  - `port: optional number`

    DNS port of primary or secondary nameserver, depending on what zone this peer is linked to.

  - `tsig_id: optional string`

    TSIG authentication will be used for zone transfer if configured.

### Peer Delete Response

- `PeerDeleteResponse object { id }`

  - `id: optional string`

# TSIGs

## List TSIGs

**get** `/accounts/{account_id}/secondary_dns/tsigs`

List TSIGs.

### Path Parameters

- `account_id: string`

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

- `result: optional array of TSIG`

  - `id: string`

  - `algo: string`

    TSIG algorithm.

  - `name: string`

    TSIG key name.

  - `secret: string`

    TSIG secret.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/secondary_dns/tsigs \
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
  "success": true,
  "result": [
    {
      "id": "69cd1e104af3e6ed3cb344f263fd0d5a",
      "algo": "hmac-sha512.",
      "name": "tsig.customer.cf.",
      "secret": "caf79a7804b04337c9c66ccd7bef9190a1e1679b5dd03d8aa10f7ad45e1a9dab92b417896c15d4d007c7c14194538d2a5d0feffdecc5a7f0e1c570cfa700837c"
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```

## TSIG Details

**get** `/accounts/{account_id}/secondary_dns/tsigs/{tsig_id}`

Get TSIG.

### Path Parameters

- `account_id: string`

- `tsig_id: string`

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

- `result: optional TSIG`

  - `id: string`

  - `algo: string`

    TSIG algorithm.

  - `name: string`

    TSIG key name.

  - `secret: string`

    TSIG secret.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/secondary_dns/tsigs/$TSIG_ID \
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
  "success": true,
  "result": {
    "id": "69cd1e104af3e6ed3cb344f263fd0d5a",
    "algo": "hmac-sha512.",
    "name": "tsig.customer.cf.",
    "secret": "caf79a7804b04337c9c66ccd7bef9190a1e1679b5dd03d8aa10f7ad45e1a9dab92b417896c15d4d007c7c14194538d2a5d0feffdecc5a7f0e1c570cfa700837c"
  }
}
```

## Create TSIG

**post** `/accounts/{account_id}/secondary_dns/tsigs`

Create TSIG.

### Path Parameters

- `account_id: string`

### Body Parameters

- `algo: string`

  TSIG algorithm.

- `name: string`

  TSIG key name.

- `secret: string`

  TSIG secret.

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

- `result: optional TSIG`

  - `id: string`

  - `algo: string`

    TSIG algorithm.

  - `name: string`

    TSIG key name.

  - `secret: string`

    TSIG secret.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/secondary_dns/tsigs \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "algo": "hmac-sha512.",
          "name": "tsig.customer.cf.",
          "secret": "caf79a7804b04337c9c66ccd7bef9190a1e1679b5dd03d8aa10f7ad45e1a9dab92b417896c15d4d007c7c14194538d2a5d0feffdecc5a7f0e1c570cfa700837c"
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
  "success": true,
  "result": {
    "id": "69cd1e104af3e6ed3cb344f263fd0d5a",
    "algo": "hmac-sha512.",
    "name": "tsig.customer.cf.",
    "secret": "caf79a7804b04337c9c66ccd7bef9190a1e1679b5dd03d8aa10f7ad45e1a9dab92b417896c15d4d007c7c14194538d2a5d0feffdecc5a7f0e1c570cfa700837c"
  }
}
```

## Update TSIG

**put** `/accounts/{account_id}/secondary_dns/tsigs/{tsig_id}`

Modify TSIG.

### Path Parameters

- `account_id: string`

- `tsig_id: string`

### Body Parameters

- `algo: string`

  TSIG algorithm.

- `name: string`

  TSIG key name.

- `secret: string`

  TSIG secret.

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

- `result: optional TSIG`

  - `id: string`

  - `algo: string`

    TSIG algorithm.

  - `name: string`

    TSIG key name.

  - `secret: string`

    TSIG secret.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/secondary_dns/tsigs/$TSIG_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "algo": "hmac-sha512.",
          "name": "tsig.customer.cf.",
          "secret": "caf79a7804b04337c9c66ccd7bef9190a1e1679b5dd03d8aa10f7ad45e1a9dab92b417896c15d4d007c7c14194538d2a5d0feffdecc5a7f0e1c570cfa700837c"
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
  "success": true,
  "result": {
    "id": "69cd1e104af3e6ed3cb344f263fd0d5a",
    "algo": "hmac-sha512.",
    "name": "tsig.customer.cf.",
    "secret": "caf79a7804b04337c9c66ccd7bef9190a1e1679b5dd03d8aa10f7ad45e1a9dab92b417896c15d4d007c7c14194538d2a5d0feffdecc5a7f0e1c570cfa700837c"
  }
}
```

## Delete TSIG

**delete** `/accounts/{account_id}/secondary_dns/tsigs/{tsig_id}`

Delete TSIG.

### Path Parameters

- `account_id: string`

- `tsig_id: string`

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

- `result: optional object { id }`

  - `id: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/secondary_dns/tsigs/$TSIG_ID \
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
  "success": true,
  "result": {
    "id": "69cd1e104af3e6ed3cb344f263fd0d5a"
  }
}
```

## Domain Types

### TSIG

- `TSIG object { id, algo, name, secret }`

  - `id: string`

  - `algo: string`

    TSIG algorithm.

  - `name: string`

    TSIG key name.

  - `secret: string`

    TSIG secret.

### TSIG Delete Response

- `TSIGDeleteResponse object { id }`

  - `id: optional string`

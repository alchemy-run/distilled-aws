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

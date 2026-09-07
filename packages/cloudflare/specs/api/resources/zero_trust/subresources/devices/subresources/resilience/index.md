# Resilience

# Global WARP Override

## Retrieve Global WARP override state

**get** `/accounts/{account_id}/devices/resilience/disconnect`

Fetch the Global WARP override state.

### Path Parameters

- `account_id: string`

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

- `result: object { disconnect, timestamp }`

  - `disconnect: optional boolean`

    Disconnects all devices on the account using Global WARP override.

  - `timestamp: optional string`

    When the Global WARP override state was updated.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/resilience/disconnect \
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
    "disconnect": false,
    "timestamp": "1970-01-01T00:00:00.000Z"
  },
  "success": true
}
```

## Set Global WARP override state

**post** `/accounts/{account_id}/devices/resilience/disconnect`

Sets the Global WARP override state.

### Path Parameters

- `account_id: string`

### Body Parameters

- `disconnect: boolean`

  Disconnects all devices on the account using Global WARP override.

- `justification: optional string`

  Reasoning for setting the Global WARP override state. This will be surfaced in the audit log.

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

- `result: object { disconnect, timestamp }`

  - `disconnect: optional boolean`

    Disconnects all devices on the account using Global WARP override.

  - `timestamp: optional string`

    When the Global WARP override state was updated.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/resilience/disconnect \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "disconnect": false,
          "justification": "Turning off WARP for testing purposes."
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
    "disconnect": false,
    "timestamp": "1970-01-01T00:00:00.000Z"
  },
  "success": true
}
```

## Domain Types

### Global WARP Override Get Response

- `GlobalWARPOverrideGetResponse object { disconnect, timestamp }`

  - `disconnect: optional boolean`

    Disconnects all devices on the account using Global WARP override.

  - `timestamp: optional string`

    When the Global WARP override state was updated.

### Global WARP Override Create Response

- `GlobalWARPOverrideCreateResponse object { disconnect, timestamp }`

  - `disconnect: optional boolean`

    Disconnects all devices on the account using Global WARP override.

  - `timestamp: optional string`

    When the Global WARP override state was updated.

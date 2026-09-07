# Control

# Retention

## Get log retention flag

**get** `/zones/{zone_id}/logs/control/retention/flag`

Gets log retention flag for Logpull API.

### Path Parameters

- `zone_id: string`

  Identifier.

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

- `result: optional object { flag }`

  - `flag: optional boolean`

    The log retention flag for Logpull API.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/logs/control/retention/flag \
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
    "flag": true
  }
}
```

## Update log retention flag

**post** `/zones/{zone_id}/logs/control/retention/flag`

Updates log retention flag for Logpull API.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `flag: optional boolean`

  The log retention flag for Logpull API.

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

- `result: optional object { flag }`

  - `flag: optional boolean`

    The log retention flag for Logpull API.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/logs/control/retention/flag \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "flag": true
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
    "flag": true
  }
}
```

## Domain Types

### Retention Get Response

- `RetentionGetResponse object { flag }`

  - `flag: optional boolean`

    The log retention flag for Logpull API.

### Retention Create Response

- `RetentionCreateResponse object { flag }`

  - `flag: optional boolean`

    The log retention flag for Logpull API.

# Cmb

# Config

## Get CMB config

**get** `/accounts/{account_id}/logs/control/cmb/config`

Gets CMB config.

### Path Parameters

- `account_id: string`

  Identifier.

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

- `result: optional CmbConfig`

  - `allow_out_of_region_access: optional boolean`

    Allow out of region access

  - `regions: optional string`

    Name of the region.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/logs/control/cmb/config \
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
    "allow_out_of_region_access": false,
    "regions": "eu"
  }
}
```

## Update CMB config

**post** `/accounts/{account_id}/logs/control/cmb/config`

Updates CMB config.

### Path Parameters

- `account_id: string`

  Identifier.

### Body Parameters

- `allow_out_of_region_access: optional boolean`

  Allow out of region access

- `regions: optional string`

  Name of the region.

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

- `result: optional CmbConfig`

  - `allow_out_of_region_access: optional boolean`

    Allow out of region access

  - `regions: optional string`

    Name of the region.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/logs/control/cmb/config \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "regions": "eu"
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
    "allow_out_of_region_access": false,
    "regions": "eu"
  }
}
```

## Delete CMB config

**delete** `/accounts/{account_id}/logs/control/cmb/config`

Deletes CMB config.

### Path Parameters

- `account_id: string`

  Identifier.

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

- `result: optional unknown`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/logs/control/cmb/config \
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
  "result": {}
}
```

## Domain Types

### Cmb Config

- `CmbConfig object { allow_out_of_region_access, regions }`

  - `allow_out_of_region_access: optional boolean`

    Allow out of region access

  - `regions: optional string`

    Name of the region.

### Config Delete Response

- `ConfigDeleteResponse = unknown`

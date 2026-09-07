# Account Settings

## Fetch Worker Account Settings

**get** `/accounts/{account_id}/workers/account-settings`

Fetches Worker account settings for an account.

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

- `result: object { default_usage_model, green_compute }`

  - `default_usage_model: optional string`

  - `green_compute: optional boolean`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/account-settings \
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
    "default_usage_model": "default_usage_model",
    "green_compute": true
  },
  "success": true
}
```

## Create Worker Account Settings

**put** `/accounts/{account_id}/workers/account-settings`

Creates Worker account settings for an account.

### Path Parameters

- `account_id: string`

  Identifier.

### Body Parameters

- `default_usage_model: optional string`

- `green_compute: optional boolean`

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

- `result: object { default_usage_model, green_compute }`

  - `default_usage_model: optional string`

  - `green_compute: optional boolean`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/account-settings \
    -X PUT \
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
  "result": {
    "default_usage_model": "default_usage_model",
    "green_compute": true
  },
  "success": true
}
```

## Domain Types

### Account Setting Get Response

- `AccountSettingGetResponse object { default_usage_model, green_compute }`

  - `default_usage_model: optional string`

  - `green_compute: optional boolean`

### Account Setting Update Response

- `AccountSettingUpdateResponse object { default_usage_model, green_compute }`

  - `default_usage_model: optional string`

  - `green_compute: optional boolean`

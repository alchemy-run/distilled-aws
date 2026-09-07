# TURN

## List TURN Keys

**get** `/accounts/{account_id}/calls/turn_keys`

Lists all TURN keys in the Cloudflare account

### Path Parameters

- `account_id: string`

  The account identifier tag.

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

- `result: optional array of object { created, modified, name, uid }`

  - `created: optional string`

    The date and time the item was created.

  - `modified: optional string`

    The date and time the item was last modified.

  - `name: optional string`

    A short description of Calls app, not shown to end users.

  - `uid: optional string`

    A Cloudflare-generated unique identifier for a item.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/calls/turn_keys \
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
      "created": "2014-01-02T02:20:00Z",
      "modified": "2014-01-02T02:20:00Z",
      "name": "production-realtime-app",
      "uid": "2a95132c15732412d22c1476fa83f27a"
    }
  ]
}
```

## Retrieve TURN key details

**get** `/accounts/{account_id}/calls/turn_keys/{key_id}`

Fetches details for a single TURN key.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `key_id: string`

  A Cloudflare-generated unique identifier for a item.

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

- `result: optional object { created, modified, name, uid }`

  - `created: optional string`

    The date and time the item was created.

  - `modified: optional string`

    The date and time the item was last modified.

  - `name: optional string`

    A short description of Calls app, not shown to end users.

  - `uid: optional string`

    A Cloudflare-generated unique identifier for a item.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/calls/turn_keys/$KEY_ID \
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
    "created": "2014-01-02T02:20:00Z",
    "modified": "2014-01-02T02:20:00Z",
    "name": "production-realtime-app",
    "uid": "2a95132c15732412d22c1476fa83f27a"
  }
}
```

## Create a new TURN key

**post** `/accounts/{account_id}/calls/turn_keys`

Creates a new Cloudflare Calls TURN key.

### Path Parameters

- `account_id: string`

  The account identifier tag.

### Body Parameters

- `name: optional string`

  A short description of a TURN key, not shown to end users.

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

- `result: optional object { created, key, modified, 2 more }`

  - `created: optional string`

    The date and time the item was created.

  - `key: optional string`

    Bearer token

  - `modified: optional string`

    The date and time the item was last modified.

  - `name: optional string`

    A short description of a TURN key, not shown to end users.

  - `uid: optional string`

    A Cloudflare-generated unique identifier for a item.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/calls/turn_keys \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "my-turn-key"
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
    "created": "2014-01-02T02:20:00Z",
    "key": "66bcf64aa8907b9f9d90ac17746a77ce394c393b92b3916633dc02846e608ad4",
    "modified": "2014-01-02T02:20:00Z",
    "name": "my-turn-key",
    "uid": "2a95132c15732412d22c1476fa83f27a"
  }
}
```

## Edit TURN key details

**put** `/accounts/{account_id}/calls/turn_keys/{key_id}`

Edit details for a single TURN key.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `key_id: string`

  A Cloudflare-generated unique identifier for a item.

### Body Parameters

- `name: optional string`

  A short description of a TURN key, not shown to end users.

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

- `result: optional object { created, modified, name, uid }`

  - `created: optional string`

    The date and time the item was created.

  - `modified: optional string`

    The date and time the item was last modified.

  - `name: optional string`

    A short description of Calls app, not shown to end users.

  - `uid: optional string`

    A Cloudflare-generated unique identifier for a item.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/calls/turn_keys/$KEY_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "my-turn-key"
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
    "created": "2014-01-02T02:20:00Z",
    "modified": "2014-01-02T02:20:00Z",
    "name": "production-realtime-app",
    "uid": "2a95132c15732412d22c1476fa83f27a"
  }
}
```

## Delete TURN key

**delete** `/accounts/{account_id}/calls/turn_keys/{key_id}`

Deletes a TURN key from Cloudflare Calls

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `key_id: string`

  A Cloudflare-generated unique identifier for a item.

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

- `result: optional object { created, modified, name, uid }`

  - `created: optional string`

    The date and time the item was created.

  - `modified: optional string`

    The date and time the item was last modified.

  - `name: optional string`

    A short description of Calls app, not shown to end users.

  - `uid: optional string`

    A Cloudflare-generated unique identifier for a item.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/calls/turn_keys/$KEY_ID \
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
    "created": "2014-01-02T02:20:00Z",
    "modified": "2014-01-02T02:20:00Z",
    "name": "production-realtime-app",
    "uid": "2a95132c15732412d22c1476fa83f27a"
  }
}
```

## Domain Types

### TURN List Response

- `TURNListResponse object { created, modified, name, uid }`

  - `created: optional string`

    The date and time the item was created.

  - `modified: optional string`

    The date and time the item was last modified.

  - `name: optional string`

    A short description of Calls app, not shown to end users.

  - `uid: optional string`

    A Cloudflare-generated unique identifier for a item.

### TURN Get Response

- `TURNGetResponse object { created, modified, name, uid }`

  - `created: optional string`

    The date and time the item was created.

  - `modified: optional string`

    The date and time the item was last modified.

  - `name: optional string`

    A short description of Calls app, not shown to end users.

  - `uid: optional string`

    A Cloudflare-generated unique identifier for a item.

### TURN Create Response

- `TURNCreateResponse object { created, key, modified, 2 more }`

  - `created: optional string`

    The date and time the item was created.

  - `key: optional string`

    Bearer token

  - `modified: optional string`

    The date and time the item was last modified.

  - `name: optional string`

    A short description of a TURN key, not shown to end users.

  - `uid: optional string`

    A Cloudflare-generated unique identifier for a item.

### TURN Update Response

- `TURNUpdateResponse object { created, modified, name, uid }`

  - `created: optional string`

    The date and time the item was created.

  - `modified: optional string`

    The date and time the item was last modified.

  - `name: optional string`

    A short description of Calls app, not shown to end users.

  - `uid: optional string`

    A Cloudflare-generated unique identifier for a item.

### TURN Delete Response

- `TURNDeleteResponse object { created, modified, name, uid }`

  - `created: optional string`

    The date and time the item was created.

  - `modified: optional string`

    The date and time the item was last modified.

  - `name: optional string`

    A short description of Calls app, not shown to end users.

  - `uid: optional string`

    A Cloudflare-generated unique identifier for a item.

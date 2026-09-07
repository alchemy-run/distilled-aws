# Silences

## List Silences

**get** `/accounts/{account_id}/alerting/v3/silences`

Gets a list of silences for an account.

### Path Parameters

- `account_id: string`

  The account id

### Returns

- `errors: array of object { message, code }`

  - `message: string`

  - `code: optional number`

- `messages: array of object { message, code }`

  - `message: string`

  - `code: optional number`

- `success: true`

  Whether the API call was successful

  - `true`

- `result: optional array of object { id, created_at, end_time, 3 more }`

  - `id: optional string`

    Silence ID

  - `created_at: optional string`

    When the silence was created.

  - `end_time: optional string`

    When the silence ends.

  - `policy_id: optional string`

    The unique identifier of a notification policy

  - `start_time: optional string`

    When the silence starts.

  - `updated_at: optional string`

    When the silence was modified.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/alerting/v3/silences \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "message": "message",
      "code": 1000
    }
  ],
  "messages": [
    {
      "message": "message",
      "code": 1000
    }
  ],
  "success": true,
  "result": [
    {
      "id": "f878e90c23f44126ae3cfc399f646977",
      "created_at": "2022-01-01T00:00:00Z",
      "end_time": "2022-01-01T00:00:00Z",
      "policy_id": "0da2b59ef118439d8097bdfb215203c9",
      "start_time": "2022-01-01T00:00:00Z",
      "updated_at": "2022-01-01T00:00:00Z"
    }
  ]
}
```

## Get Silence

**get** `/accounts/{account_id}/alerting/v3/silences/{silence_id}`

Gets a specific silence for an account.

### Path Parameters

- `account_id: string`

  The account id

- `silence_id: string`

  Silence ID

### Returns

- `errors: array of object { message, code }`

  - `message: string`

  - `code: optional number`

- `messages: array of object { message, code }`

  - `message: string`

  - `code: optional number`

- `success: true`

  Whether the API call was successful

  - `true`

- `result: optional object { id, created_at, end_time, 3 more }`

  - `id: optional string`

    Silence ID

  - `created_at: optional string`

    When the silence was created.

  - `end_time: optional string`

    When the silence ends.

  - `policy_id: optional string`

    The unique identifier of a notification policy

  - `start_time: optional string`

    When the silence starts.

  - `updated_at: optional string`

    When the silence was modified.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/alerting/v3/silences/$SILENCE_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "message": "message",
      "code": 1000
    }
  ],
  "messages": [
    {
      "message": "message",
      "code": 1000
    }
  ],
  "success": true,
  "result": {
    "id": "f878e90c23f44126ae3cfc399f646977",
    "created_at": "2022-01-01T00:00:00Z",
    "end_time": "2022-01-01T00:00:00Z",
    "policy_id": "0da2b59ef118439d8097bdfb215203c9",
    "start_time": "2022-01-01T00:00:00Z",
    "updated_at": "2022-01-01T00:00:00Z"
  }
}
```

## Create Silences

**post** `/accounts/{account_id}/alerting/v3/silences`

Creates a new silence for an account.

### Path Parameters

- `account_id: string`

  The account id

### Body Parameters

- `body: array of object { end_time, policy_id, start_time }`

  - `end_time: optional string`

    When the silence ends.

  - `policy_id: optional string`

    The unique identifier of a notification policy

  - `start_time: optional string`

    When the silence starts.

### Returns

- `errors: array of object { message, code }`

  - `message: string`

  - `code: optional number`

- `messages: array of object { message, code }`

  - `message: string`

  - `code: optional number`

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/alerting/v3/silences \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '[
          {
            "end_time": "2022-01-01T00:00:00Z",
            "policy_id": "0da2b59ef118439d8097bdfb215203c9",
            "start_time": "2022-01-01T00:00:00Z"
          }
        ]'
```

#### Response

```json
{
  "errors": [
    {
      "message": "message",
      "code": 1000
    }
  ],
  "messages": [
    {
      "message": "message",
      "code": 1000
    }
  ],
  "success": true
}
```

## Update Silences

**put** `/accounts/{account_id}/alerting/v3/silences`

Updates existing silences for an account.

### Path Parameters

- `account_id: string`

  The account id

### Body Parameters

- `body: array of object { id, end_time, start_time }`

  - `id: optional string`

    Silence ID

  - `end_time: optional string`

    When the silence ends.

  - `start_time: optional string`

    When the silence starts.

### Returns

- `errors: array of object { message, code }`

  - `message: string`

  - `code: optional number`

- `messages: array of object { message, code }`

  - `message: string`

  - `code: optional number`

- `success: true`

  Whether the API call was successful

  - `true`

- `result: optional array of object { id, created_at, end_time, 3 more }`

  - `id: optional string`

    Silence ID

  - `created_at: optional string`

    When the silence was created.

  - `end_time: optional string`

    When the silence ends.

  - `policy_id: optional string`

    The unique identifier of a notification policy

  - `start_time: optional string`

    When the silence starts.

  - `updated_at: optional string`

    When the silence was modified.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/alerting/v3/silences \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '[
          {
            "id": "f878e90c23f44126ae3cfc399f646977",
            "end_time": "2022-01-01T00:00:00Z",
            "start_time": "2022-01-01T00:00:00Z"
          }
        ]'
```

#### Response

```json
{
  "errors": [
    {
      "message": "message",
      "code": 1000
    }
  ],
  "messages": [
    {
      "message": "message",
      "code": 1000
    }
  ],
  "success": true,
  "result": [
    {
      "id": "f878e90c23f44126ae3cfc399f646977",
      "created_at": "2022-01-01T00:00:00Z",
      "end_time": "2022-01-01T00:00:00Z",
      "policy_id": "0da2b59ef118439d8097bdfb215203c9",
      "start_time": "2022-01-01T00:00:00Z",
      "updated_at": "2022-01-01T00:00:00Z"
    }
  ]
}
```

## Delete Silence

**delete** `/accounts/{account_id}/alerting/v3/silences/{silence_id}`

Deletes an existing silence for an account.

### Path Parameters

- `account_id: string`

  The account id

- `silence_id: string`

  Silence ID

### Returns

- `errors: array of object { message, code }`

  - `message: string`

  - `code: optional number`

- `messages: array of object { message, code }`

  - `message: string`

  - `code: optional number`

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/alerting/v3/silences/$SILENCE_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "message": "message",
      "code": 1000
    }
  ],
  "messages": [
    {
      "message": "message",
      "code": 1000
    }
  ],
  "success": true
}
```

## Domain Types

### Silence List Response

- `SilenceListResponse object { id, created_at, end_time, 3 more }`

  - `id: optional string`

    Silence ID

  - `created_at: optional string`

    When the silence was created.

  - `end_time: optional string`

    When the silence ends.

  - `policy_id: optional string`

    The unique identifier of a notification policy

  - `start_time: optional string`

    When the silence starts.

  - `updated_at: optional string`

    When the silence was modified.

### Silence Get Response

- `SilenceGetResponse object { id, created_at, end_time, 3 more }`

  - `id: optional string`

    Silence ID

  - `created_at: optional string`

    When the silence was created.

  - `end_time: optional string`

    When the silence ends.

  - `policy_id: optional string`

    The unique identifier of a notification policy

  - `start_time: optional string`

    When the silence starts.

  - `updated_at: optional string`

    When the silence was modified.

### Silence Create Response

- `SilenceCreateResponse object { errors, messages, success }`

  - `errors: array of object { message, code }`

    - `message: string`

    - `code: optional number`

  - `messages: array of object { message, code }`

    - `message: string`

    - `code: optional number`

  - `success: true`

    Whether the API call was successful

    - `true`

### Silence Update Response

- `SilenceUpdateResponse object { id, created_at, end_time, 3 more }`

  - `id: optional string`

    Silence ID

  - `created_at: optional string`

    When the silence was created.

  - `end_time: optional string`

    When the silence ends.

  - `policy_id: optional string`

    The unique identifier of a notification policy

  - `start_time: optional string`

    When the silence starts.

  - `updated_at: optional string`

    When the silence was modified.

### Silence Delete Response

- `SilenceDeleteResponse object { errors, messages, success }`

  - `errors: array of object { message, code }`

    - `message: string`

    - `code: optional number`

  - `messages: array of object { message, code }`

    - `message: string`

    - `code: optional number`

  - `success: true`

    Whether the API call was successful

    - `true`

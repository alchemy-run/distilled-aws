## Create Temporary Access Credentials

**post** `/accounts/{account_id}/r2/temp-access-credentials`

Creates temporary access credentials on a bucket that can be optionally scoped to prefixes or objects.

### Path Parameters

- `account_id: string`

  Account ID.

### Body Parameters

- `bucket: string`

  Name of the R2 bucket.

- `parentAccessKeyId: string`

  The parent access key id to use for signing.

- `permission: "admin-read-write" or "admin-read-only" or "object-read-write" or "object-read-only"`

  Permissions allowed on the credentials.

  - `"admin-read-write"`

  - `"admin-read-only"`

  - `"object-read-write"`

  - `"object-read-only"`

- `ttlSeconds: number`

  How long the credentials will live for in seconds.

- `objects: optional array of string`

  Optional object paths to scope the credentials to.

- `prefixes: optional array of string`

  Optional prefix paths to scope the credentials to.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of string`

- `result: object { accessKeyId, secretAccessKey, sessionToken }`

  - `accessKeyId: optional string`

    ID for new access key.

  - `secretAccessKey: optional string`

    Secret access key.

  - `sessionToken: optional string`

    Security token.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/r2/temp-access-credentials \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "bucket": "example-bucket",
          "parentAccessKeyId": "example-access-key-id",
          "permission": "object-read-write",
          "ttlSeconds": 3600
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
    "string"
  ],
  "result": {
    "accessKeyId": "example-access-key-id",
    "secretAccessKey": "example-secret-key",
    "sessionToken": "example-session-token"
  },
  "success": true
}
```

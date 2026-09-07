# Upload

## Create Assets Upload Session

**post** `/accounts/{account_id}/workers/scripts/{script_name}/assets-upload-session`

Start uploading a collection of assets for use in a Worker version. To learn more about the direct uploads of assets, see https://developers.cloudflare.com/workers/static-assets/direct-upload/.

### Path Parameters

- `account_id: string`

  Identifier.

- `script_name: string`

  Name of the script, used in URLs and route configuration.

### Body Parameters

- `manifest: map[object { hash, size } ]`

  A manifest ([path]: {hash, size}) map of files to upload. As an example, `/blog/hello-world.html` would be a valid path key.

  - `hash: string`

    The hash of the file.

  - `size: number`

    The size of the file in bytes.

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

- `result: optional object { buckets, jwt }`

  - `buckets: optional array of array of string`

    The requests to make to upload assets.

  - `jwt: optional string`

    A JWT to use as authentication for uploading assets.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/scripts/$SCRIPT_NAME/assets-upload-session \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "manifest": {
            "foo": {
              "hash": "hash",
              "size": 0
            }
          }
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
    "buckets": [
      [
        "string"
      ]
    ],
    "jwt": "jwt"
  }
}
```

## Domain Types

### Upload Create Response

- `UploadCreateResponse object { buckets, jwt }`

  - `buckets: optional array of array of string`

    The requests to make to upload assets.

  - `jwt: optional string`

    A JWT to use as authentication for uploading assets.

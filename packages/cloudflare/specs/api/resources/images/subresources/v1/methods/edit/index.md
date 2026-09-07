## Update image

**patch** `/accounts/{account_id}/images/v1/{image_id}`

Update a CF Images image's metadata, creator, or access control. On access control change, all copies of the image are purged from cache.

### Path Parameters

- `account_id: string`

  Account identifier tag.

- `image_id: string`

  Image unique identifier.

### Body Parameters

- `creator: optional string`

  Can set the creator field with an internal user ID.

- `metadata: optional unknown`

  User modifiable key-value store. Can be used for keeping references to another system of record for managing images. No change if not specified.

- `requireSignedURLs: optional boolean`

  Indicates whether the image can be accessed using only its UID. If set to `true`, a signed token needs to be generated with a signing key to view the image. Returns a new UID on a change. No change if not specified.

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

- `result: Image`

  - `id: optional string`

    Image unique identifier.

  - `creator: optional string`

    Can set the creator field with an internal user ID.

  - `filename: optional string`

    Image file name.

  - `meta: optional unknown`

    User modifiable key-value store. Can be used for keeping references to another system of record for managing images. Metadata must not exceed 1024 bytes.

  - `requireSignedURLs: optional boolean`

    Indicates whether the image can be a accessed only using it's UID. If set to true, a signed token needs to be generated with a signing key to view the image.

  - `uploaded: optional string`

    When the media item was uploaded.

  - `variants: optional array of string`

    Object specifying available variants for an image.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/images/v1/$IMAGE_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "requireSignedURLs": true
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
    "id": "id",
    "creator": "107b9558-dd06-4bbd-5fef-9c2c16bb7900",
    "filename": "logo.png",
    "meta": {
      "key": "value"
    },
    "requireSignedURLs": true,
    "uploaded": "2014-01-02T02:20:00.123Z",
    "variants": [
      "https://imagedelivery.net/MTt4OTd0b0w5aj/107b9558-dd06-4bbd-5fef-9c2c16bb7900/thumbnail",
      "https://imagedelivery.net/MTt4OTd0b0w5aj/107b9558-dd06-4bbd-5fef-9c2c16bb7900/hero",
      "https://imagedelivery.net/MTt4OTd0b0w5aj/107b9558-dd06-4bbd-5fef-9c2c16bb7900/original"
    ]
  },
  "success": true
}
```

# V1

## List images

**get** `/accounts/{account_id}/images/v1`

List up to 100 images with one request. Use the optional parameters below to get a specific range of images.

### Path Parameters

- `account_id: string`

  Account identifier tag.

### Query Parameters

- `creator: optional string`

  Internal user ID set within the creator field. Setting to empty string "" will return images where creator field is not set

- `page: optional number`

  Page number of paginated results.

- `per_page: optional number`

  Number of items per page.

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

- `result: object { images }`

  - `images: optional array of Image`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/images/v1 \
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
    "images": [
      {
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
      }
    ]
  },
  "success": true
}
```

## Image details

**get** `/accounts/{account_id}/images/v1/{image_id}`

Fetch details for a CF Images image.

### Path Parameters

- `account_id: string`

  Account identifier tag.

- `image_id: string`

  Image unique identifier.

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

## Upload an image

**post** `/accounts/{account_id}/images/v1`

Upload an image to CF Images. Images up to 10 Megabytes can be uploaded using a
single HTTP POST (multipart/form-data) request by sending an image file or
passing a URL accessible to the API.

### Path Parameters

- `account_id: string`

  Account identifier tag.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/images/v1 \
    -H 'Content-Type: multipart/form-data' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -F requireSignedURLs=true \
    -F url=https://example.com/path/to/logo.png
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

## Delete image

**delete** `/accounts/{account_id}/images/v1/{image_id}`

Delete an image on Cloudflare Images. On success, all copies of the image are deleted and purged from cache.

### Path Parameters

- `account_id: string`

  Account identifier tag.

- `image_id: string`

  Image unique identifier.

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

- `result: unknown or string`

  - `unknown`

  - `string`

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/images/v1/$IMAGE_ID \
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
  "result": {},
  "success": true
}
```

## Domain Types

### Image

- `Image object { id, creator, filename, 4 more }`

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

### V1 List Response

- `V1ListResponse object { images }`

  - `images: optional array of Image`

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

### V1 Delete Response

- `V1DeleteResponse = unknown or string`

  - `unknown`

  - `string`

# Keys

## List Signing Keys

**get** `/accounts/{account_id}/images/v1/keys`

List your CF Images signing keys.

### Path Parameters

- `account_id: string`

  Account identifier tag.

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

- `result: object { keys }`

  - `keys: optional array of Key`

    - `name: optional string`

      Key name.

    - `value: optional string`

      Key value.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/images/v1/keys \
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
    "keys": [
      {
        "name": "default",
        "value": "Oix0bbNaT8Rge9PuyxUBrjI6zrgnsyJ5="
      }
    ]
  },
  "success": true
}
```

## Create a new Signing Key

**put** `/accounts/{account_id}/images/v1/keys/{signing_key_name}`

Create a new CF Images signing key with specified name. Returns all keys available.

### Path Parameters

- `account_id: string`

  Account identifier tag.

- `signing_key_name: string`

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

- `result: object { keys }`

  - `keys: optional array of Key`

    - `name: optional string`

      Key name.

    - `value: optional string`

      Key value.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/images/v1/keys/$SIGNING_KEY_NAME \
    -X PUT \
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
    "keys": [
      {
        "name": "default",
        "value": "Oix0bbNaT8Rge9PuyxUBrjI6zrgnsyJ5="
      }
    ]
  },
  "success": true
}
```

## Delete Signing Key

**delete** `/accounts/{account_id}/images/v1/keys/{signing_key_name}`

Delete a CF Images signing key with specified name. Returns all keys available.
When the last key is removed, a new default signing key will be generated.

### Path Parameters

- `account_id: string`

  Account identifier tag.

- `signing_key_name: string`

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

- `result: object { keys }`

  - `keys: optional array of Key`

    - `name: optional string`

      Key name.

    - `value: optional string`

      Key value.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/images/v1/keys/$SIGNING_KEY_NAME \
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
  "result": {
    "keys": [
      {
        "name": "default",
        "value": "Oix0bbNaT8Rge9PuyxUBrjI6zrgnsyJ5="
      }
    ]
  },
  "success": true
}
```

## Domain Types

### Key

- `Key object { name, value }`

  - `name: optional string`

    Key name.

  - `value: optional string`

    Key value.

### Key List Response

- `KeyListResponse object { keys }`

  - `keys: optional array of Key`

    - `name: optional string`

      Key name.

    - `value: optional string`

      Key value.

### Key Update Response

- `KeyUpdateResponse object { keys }`

  - `keys: optional array of Key`

    - `name: optional string`

      Key name.

    - `value: optional string`

      Key value.

### Key Delete Response

- `KeyDeleteResponse object { keys }`

  - `keys: optional array of Key`

    - `name: optional string`

      Key name.

    - `value: optional string`

      Key value.

# Stats

## Images usage statistics

**get** `/accounts/{account_id}/images/v1/stats`

Fetch image statistics details for Cloudflare Images. The returned statistics detail storage usage, including the current image count vs this account's allowance.

### Path Parameters

- `account_id: string`

  Account identifier tag.

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

- `result: Stat`

  - `count: optional object { allowed, current }`

    - `allowed: optional number`

      Cloudflare Images allowed usage.

    - `current: optional number`

      Cloudflare Images current usage.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/images/v1/stats \
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
    "count": {
      "allowed": 100000,
      "current": 1000
    }
  },
  "success": true
}
```

## Domain Types

### Stat

- `Stat object { count }`

  - `count: optional object { allowed, current }`

    - `allowed: optional number`

      Cloudflare Images allowed usage.

    - `current: optional number`

      Cloudflare Images current usage.

# Variants

## List variants

**get** `/accounts/{account_id}/images/v1/variants`

List existing CF Images variants.

### Path Parameters

- `account_id: string`

  Account identifier tag.

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

- `result: Variant`

  - `variants: optional object { hero }`

    - `hero: optional object { id, options, neverRequireSignedURLs }`

      - `id: string`

      - `options: object { fit, height, metadata, width }`

        Allows you to define image resizing sizes for different use cases.

        - `fit: "scale-down" or "contain" or "cover" or 2 more`

          The fit property describes how the width and height dimensions should be interpreted.

          - `"scale-down"`

          - `"contain"`

          - `"cover"`

          - `"crop"`

          - `"pad"`

        - `height: number`

          Maximum height in image pixels.

        - `metadata: "keep" or "copyright" or "none"`

          What EXIF data should be preserved in the output image.

          - `"keep"`

          - `"copyright"`

          - `"none"`

        - `width: number`

          Maximum width in image pixels.

      - `neverRequireSignedURLs: optional boolean`

        Indicates whether the variant can access an image without a signature, regardless of image access control.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/images/v1/variants \
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
    "variants": {
      "hero": {
        "id": "hero",
        "options": {
          "fit": "scale-down",
          "height": 768,
          "metadata": "none",
          "width": 1366
        },
        "neverRequireSignedURLs": true
      }
    }
  },
  "success": true
}
```

## Variant details

**get** `/accounts/{account_id}/images/v1/variants/{variant_id}`

Fetch details for a CF Images variant.

### Path Parameters

- `account_id: string`

  Account identifier tag.

- `variant_id: string`

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

- `result: object { variant }`

  - `variant: optional object { id, options, neverRequireSignedURLs }`

    - `id: string`

    - `options: object { fit, height, metadata, width }`

      Allows you to define image resizing sizes for different use cases.

      - `fit: "scale-down" or "contain" or "cover" or 2 more`

        The fit property describes how the width and height dimensions should be interpreted.

        - `"scale-down"`

        - `"contain"`

        - `"cover"`

        - `"crop"`

        - `"pad"`

      - `height: number`

        Maximum height in image pixels.

      - `metadata: "keep" or "copyright" or "none"`

        What EXIF data should be preserved in the output image.

        - `"keep"`

        - `"copyright"`

        - `"none"`

      - `width: number`

        Maximum width in image pixels.

    - `neverRequireSignedURLs: optional boolean`

      Indicates whether the variant can access an image without a signature, regardless of image access control.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/images/v1/variants/$VARIANT_ID \
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
    "variant": {
      "id": "hero",
      "options": {
        "fit": "scale-down",
        "height": 768,
        "metadata": "none",
        "width": 1366
      },
      "neverRequireSignedURLs": true
    }
  },
  "success": true
}
```

## Create a variant

**post** `/accounts/{account_id}/images/v1/variants`

Create a CF Images variant that allows you to resize images for different use cases.

### Path Parameters

- `account_id: string`

  Account identifier tag.

### Body Parameters

- `id: string`

- `options: object { fit, height, metadata, width }`

  Allows you to define image resizing sizes for different use cases.

  - `fit: "scale-down" or "contain" or "cover" or 2 more`

    The fit property describes how the width and height dimensions should be interpreted.

    - `"scale-down"`

    - `"contain"`

    - `"cover"`

    - `"crop"`

    - `"pad"`

  - `height: number`

    Maximum height in image pixels.

  - `metadata: "keep" or "copyright" or "none"`

    What EXIF data should be preserved in the output image.

    - `"keep"`

    - `"copyright"`

    - `"none"`

  - `width: number`

    Maximum width in image pixels.

- `neverRequireSignedURLs: optional boolean`

  Indicates whether the variant can access an image without a signature, regardless of image access control.

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

- `result: object { variant }`

  - `variant: optional object { id, options, neverRequireSignedURLs }`

    - `id: string`

    - `options: object { fit, height, metadata, width }`

      Allows you to define image resizing sizes for different use cases.

      - `fit: "scale-down" or "contain" or "cover" or 2 more`

        The fit property describes how the width and height dimensions should be interpreted.

        - `"scale-down"`

        - `"contain"`

        - `"cover"`

        - `"crop"`

        - `"pad"`

      - `height: number`

        Maximum height in image pixels.

      - `metadata: "keep" or "copyright" or "none"`

        What EXIF data should be preserved in the output image.

        - `"keep"`

        - `"copyright"`

        - `"none"`

      - `width: number`

        Maximum width in image pixels.

    - `neverRequireSignedURLs: optional boolean`

      Indicates whether the variant can access an image without a signature, regardless of image access control.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/images/v1/variants \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "id": "hero",
          "options": {
            "fit": "scale-down",
            "height": 768,
            "metadata": "none",
            "width": 1366
          },
          "neverRequireSignedURLs": true
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
    "variant": {
      "id": "hero",
      "options": {
        "fit": "scale-down",
        "height": 768,
        "metadata": "none",
        "width": 1366
      },
      "neverRequireSignedURLs": true
    }
  },
  "success": true
}
```

## Update a variant

**patch** `/accounts/{account_id}/images/v1/variants/{variant_id}`

Update a CF Images variant. This will purge the cache for all images associated with the variant.

### Path Parameters

- `account_id: string`

  Account identifier tag.

- `variant_id: string`

### Body Parameters

- `options: object { fit, height, metadata, width }`

  Allows you to define image resizing sizes for different use cases.

  - `fit: "scale-down" or "contain" or "cover" or 2 more`

    The fit property describes how the width and height dimensions should be interpreted.

    - `"scale-down"`

    - `"contain"`

    - `"cover"`

    - `"crop"`

    - `"pad"`

  - `height: number`

    Maximum height in image pixels.

  - `metadata: "keep" or "copyright" or "none"`

    What EXIF data should be preserved in the output image.

    - `"keep"`

    - `"copyright"`

    - `"none"`

  - `width: number`

    Maximum width in image pixels.

- `neverRequireSignedURLs: optional boolean`

  Indicates whether the variant can access an image without a signature, regardless of image access control.

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

- `result: object { variant }`

  - `variant: optional object { id, options, neverRequireSignedURLs }`

    - `id: string`

    - `options: object { fit, height, metadata, width }`

      Allows you to define image resizing sizes for different use cases.

      - `fit: "scale-down" or "contain" or "cover" or 2 more`

        The fit property describes how the width and height dimensions should be interpreted.

        - `"scale-down"`

        - `"contain"`

        - `"cover"`

        - `"crop"`

        - `"pad"`

      - `height: number`

        Maximum height in image pixels.

      - `metadata: "keep" or "copyright" or "none"`

        What EXIF data should be preserved in the output image.

        - `"keep"`

        - `"copyright"`

        - `"none"`

      - `width: number`

        Maximum width in image pixels.

    - `neverRequireSignedURLs: optional boolean`

      Indicates whether the variant can access an image without a signature, regardless of image access control.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/images/v1/variants/$VARIANT_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "options": {
            "fit": "scale-down",
            "height": 768,
            "metadata": "none",
            "width": 1366
          },
          "neverRequireSignedURLs": true
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
    "variant": {
      "id": "hero",
      "options": {
        "fit": "scale-down",
        "height": 768,
        "metadata": "none",
        "width": 1366
      },
      "neverRequireSignedURLs": true
    }
  },
  "success": true
}
```

## Delete a variant

**delete** `/accounts/{account_id}/images/v1/variants/{variant_id}`

Delete a CF Images variant. This will purge the cache for all images associated with the variant.

### Path Parameters

- `account_id: string`

  Account identifier tag.

- `variant_id: string`

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

- `result: unknown or string`

  - `unknown`

  - `string`

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/images/v1/variants/$VARIANT_ID \
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
  "result": {},
  "success": true
}
```

## Domain Types

### Variant

- `Variant object { variants }`

  - `variants: optional object { hero }`

    - `hero: optional object { id, options, neverRequireSignedURLs }`

      - `id: string`

      - `options: object { fit, height, metadata, width }`

        Allows you to define image resizing sizes for different use cases.

        - `fit: "scale-down" or "contain" or "cover" or 2 more`

          The fit property describes how the width and height dimensions should be interpreted.

          - `"scale-down"`

          - `"contain"`

          - `"cover"`

          - `"crop"`

          - `"pad"`

        - `height: number`

          Maximum height in image pixels.

        - `metadata: "keep" or "copyright" or "none"`

          What EXIF data should be preserved in the output image.

          - `"keep"`

          - `"copyright"`

          - `"none"`

        - `width: number`

          Maximum width in image pixels.

      - `neverRequireSignedURLs: optional boolean`

        Indicates whether the variant can access an image without a signature, regardless of image access control.

### Variant Get Response

- `VariantGetResponse object { variant }`

  - `variant: optional object { id, options, neverRequireSignedURLs }`

    - `id: string`

    - `options: object { fit, height, metadata, width }`

      Allows you to define image resizing sizes for different use cases.

      - `fit: "scale-down" or "contain" or "cover" or 2 more`

        The fit property describes how the width and height dimensions should be interpreted.

        - `"scale-down"`

        - `"contain"`

        - `"cover"`

        - `"crop"`

        - `"pad"`

      - `height: number`

        Maximum height in image pixels.

      - `metadata: "keep" or "copyright" or "none"`

        What EXIF data should be preserved in the output image.

        - `"keep"`

        - `"copyright"`

        - `"none"`

      - `width: number`

        Maximum width in image pixels.

    - `neverRequireSignedURLs: optional boolean`

      Indicates whether the variant can access an image without a signature, regardless of image access control.

### Variant Create Response

- `VariantCreateResponse object { variant }`

  - `variant: optional object { id, options, neverRequireSignedURLs }`

    - `id: string`

    - `options: object { fit, height, metadata, width }`

      Allows you to define image resizing sizes for different use cases.

      - `fit: "scale-down" or "contain" or "cover" or 2 more`

        The fit property describes how the width and height dimensions should be interpreted.

        - `"scale-down"`

        - `"contain"`

        - `"cover"`

        - `"crop"`

        - `"pad"`

      - `height: number`

        Maximum height in image pixels.

      - `metadata: "keep" or "copyright" or "none"`

        What EXIF data should be preserved in the output image.

        - `"keep"`

        - `"copyright"`

        - `"none"`

      - `width: number`

        Maximum width in image pixels.

    - `neverRequireSignedURLs: optional boolean`

      Indicates whether the variant can access an image without a signature, regardless of image access control.

### Variant Edit Response

- `VariantEditResponse object { variant }`

  - `variant: optional object { id, options, neverRequireSignedURLs }`

    - `id: string`

    - `options: object { fit, height, metadata, width }`

      Allows you to define image resizing sizes for different use cases.

      - `fit: "scale-down" or "contain" or "cover" or 2 more`

        The fit property describes how the width and height dimensions should be interpreted.

        - `"scale-down"`

        - `"contain"`

        - `"cover"`

        - `"crop"`

        - `"pad"`

      - `height: number`

        Maximum height in image pixels.

      - `metadata: "keep" or "copyright" or "none"`

        What EXIF data should be preserved in the output image.

        - `"keep"`

        - `"copyright"`

        - `"none"`

      - `width: number`

        Maximum width in image pixels.

    - `neverRequireSignedURLs: optional boolean`

      Indicates whether the variant can access an image without a signature, regardless of image access control.

### Variant Delete Response

- `VariantDeleteResponse = unknown or string`

  - `unknown`

  - `string`

# Blobs

## Download image

**get** `/accounts/{account_id}/images/v1/{image_id}/blob`

Download an image from CF Images. For most images this will be the originally uploaded file. For larger images it can be a near-lossless version of the original.

### Path Parameters

- `account_id: string`

  Account identifier tag.

- `image_id: string`

  Image unique identifier.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/images/v1/$IMAGE_ID/blob \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

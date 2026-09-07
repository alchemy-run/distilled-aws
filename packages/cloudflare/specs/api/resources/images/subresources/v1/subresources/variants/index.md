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

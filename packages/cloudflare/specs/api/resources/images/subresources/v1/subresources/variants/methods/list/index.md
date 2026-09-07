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

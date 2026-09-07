## Change variants setting

**patch** `/zones/{zone_id}/cache/variants`

Variant support enables caching variants of images with certain file extensions in addition to the original. This only applies when the origin server sends the 'Vary: Accept' response header. If the origin server sends 'Vary: Accept' but does not serve the variant requested, the response will not be cached. This will be indicated with BYPASS cache status in the response headers.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `value: object { avif, bmp, gif, 8 more }`

  Value of the zone setting.

  - `avif: optional array of string`

    List of strings with the MIME types of all the variants that should be served for avif.

  - `bmp: optional array of string`

    List of strings with the MIME types of all the variants that should be served for bmp.

  - `gif: optional array of string`

    List of strings with the MIME types of all the variants that should be served for gif.

  - `jp2: optional array of string`

    List of strings with the MIME types of all the variants that should be served for jp2.

  - `jpeg: optional array of string`

    List of strings with the MIME types of all the variants that should be served for jpeg.

  - `jpg: optional array of string`

    List of strings with the MIME types of all the variants that should be served for jpg.

  - `jpg2: optional array of string`

    List of strings with the MIME types of all the variants that should be served for jpg2.

  - `png: optional array of string`

    List of strings with the MIME types of all the variants that should be served for png.

  - `tif: optional array of string`

    List of strings with the MIME types of all the variants that should be served for tif.

  - `tiff: optional array of string`

    List of strings with the MIME types of all the variants that should be served for tiff.

  - `webp: optional array of string`

    List of strings with the MIME types of all the variants that should be served for webp.

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

- `success: true`

  Whether the API call was successful.

  - `true`

- `result: optional object { id, editable, value, modified_on }`

  - `id: "variants"`

    The identifier of the caching setting.

    - `"variants"`

  - `editable: boolean`

    Whether the setting is editable.

  - `value: object { avif, bmp, gif, 8 more }`

    Value of the zone setting.

    - `avif: optional array of string`

      List of strings with the MIME types of all the variants that should be served for avif.

    - `bmp: optional array of string`

      List of strings with the MIME types of all the variants that should be served for bmp.

    - `gif: optional array of string`

      List of strings with the MIME types of all the variants that should be served for gif.

    - `jp2: optional array of string`

      List of strings with the MIME types of all the variants that should be served for jp2.

    - `jpeg: optional array of string`

      List of strings with the MIME types of all the variants that should be served for jpeg.

    - `jpg: optional array of string`

      List of strings with the MIME types of all the variants that should be served for jpg.

    - `jpg2: optional array of string`

      List of strings with the MIME types of all the variants that should be served for jpg2.

    - `png: optional array of string`

      List of strings with the MIME types of all the variants that should be served for png.

    - `tif: optional array of string`

      List of strings with the MIME types of all the variants that should be served for tif.

    - `tiff: optional array of string`

      List of strings with the MIME types of all the variants that should be served for tiff.

    - `webp: optional array of string`

      List of strings with the MIME types of all the variants that should be served for webp.

  - `modified_on: optional string`

    Last time this setting was modified.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/cache/variants \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "value": {}
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
    "id": "variants",
    "editable": true,
    "value": {
      "avif": [
        "image/webp",
        "image/jpeg"
      ],
      "bmp": [
        "image/webp",
        "image/jpeg"
      ],
      "gif": [
        "image/webp",
        "image/jpeg"
      ],
      "jp2": [
        "image/webp",
        "image/avif"
      ],
      "jpeg": [
        "image/webp",
        "image/avif"
      ],
      "jpg": [
        "image/webp",
        "image/avif"
      ],
      "jpg2": [
        "image/webp",
        "image/avif"
      ],
      "png": [
        "image/webp",
        "image/avif"
      ],
      "tif": [
        "image/webp",
        "image/avif"
      ],
      "tiff": [
        "image/webp",
        "image/avif"
      ],
      "webp": [
        "image/jpeg",
        "image/avif"
      ]
    },
    "modified_on": "2014-01-01T05:20:00.12345Z"
  }
}
```

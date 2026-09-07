# Language

## List captions or subtitles for a provided language

**get** `/accounts/{account_id}/stream/{identifier}/captions/{language}`

Lists the captions or subtitles for provided language.

### Path Parameters

- `account_id: string`

  Identifier.

- `identifier: string`

  A Cloudflare-generated unique identifier for a media item.

- `language: string`

  The language tag in BCP 47 format.

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

- `result: optional Caption`

  - `generated: optional boolean`

    Whether the caption was generated via AI.

  - `label: optional string`

    The language label displayed in the native language to users.

  - `language: optional string`

    The language tag in BCP 47 format.

  - `status: optional "ready" or "inprogress" or "error"`

    The status of a generated caption.

    - `"ready"`

    - `"inprogress"`

    - `"error"`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream/$IDENTIFIER/captions/$LANGUAGE \
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
    "generated": true,
    "label": "Türkçe",
    "language": "tr",
    "status": "ready"
  }
}
```

## Generate captions or subtitles for a provided language via AI

**post** `/accounts/{account_id}/stream/{identifier}/captions/{language}/generate`

Generate captions or subtitles for provided language via AI.

### Path Parameters

- `account_id: string`

  Identifier.

- `identifier: string`

  A Cloudflare-generated unique identifier for a media item.

- `language: string`

  The language tag in BCP 47 format.

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

- `result: optional Caption`

  - `generated: optional boolean`

    Whether the caption was generated via AI.

  - `label: optional string`

    The language label displayed in the native language to users.

  - `language: optional string`

    The language tag in BCP 47 format.

  - `status: optional "ready" or "inprogress" or "error"`

    The status of a generated caption.

    - `"ready"`

    - `"inprogress"`

    - `"error"`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream/$IDENTIFIER/captions/$LANGUAGE/generate \
    -X POST \
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
    "generated": true,
    "label": "Türkçe",
    "language": "tr",
    "status": "ready"
  }
}
```

## Upload captions or subtitles

**put** `/accounts/{account_id}/stream/{identifier}/captions/{language}`

Uploads the caption or subtitle file to the endpoint for a specific BCP47 language. One caption or subtitle file per language is allowed.

### Path Parameters

- `account_id: string`

  Identifier.

- `identifier: string`

  A Cloudflare-generated unique identifier for a media item.

- `language: string`

  The language tag in BCP 47 format.

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

- `result: optional Caption`

  - `generated: optional boolean`

    Whether the caption was generated via AI.

  - `label: optional string`

    The language label displayed in the native language to users.

  - `language: optional string`

    The language tag in BCP 47 format.

  - `status: optional "ready" or "inprogress" or "error"`

    The status of a generated caption.

    - `"ready"`

    - `"inprogress"`

    - `"error"`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream/$IDENTIFIER/captions/$LANGUAGE \
    -X PUT \
    -H 'Content-Type: multipart/form-data' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -F file=@/Users/kyle/Desktop/tr.vtt
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
    "generated": true,
    "label": "Türkçe",
    "language": "tr",
    "status": "ready"
  }
}
```

## Delete captions or subtitles

**delete** `/accounts/{account_id}/stream/{identifier}/captions/{language}`

Removes the captions or subtitles from a video.

### Path Parameters

- `account_id: string`

  Identifier.

- `identifier: string`

  A Cloudflare-generated unique identifier for a media item.

- `language: string`

  The language tag in BCP 47 format.

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

- `result: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream/$IDENTIFIER/captions/$LANGUAGE \
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
  "result": ""
}
```

## Domain Types

### Language Delete Response

- `LanguageDeleteResponse = string`

# Vtt

## Return WebVTT captions for a provided language

**get** `/accounts/{account_id}/stream/{identifier}/captions/{language}/vtt`

Return WebVTT captions for a provided language.

### Path Parameters

- `account_id: string`

  Identifier.

- `identifier: string`

  A Cloudflare-generated unique identifier for a media item.

- `language: string`

  The language tag in BCP 47 format.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream/$IDENTIFIER/captions/$LANGUAGE/vtt \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

## Domain Types

### Vtt Get Response

- `VttGetResponse = string`

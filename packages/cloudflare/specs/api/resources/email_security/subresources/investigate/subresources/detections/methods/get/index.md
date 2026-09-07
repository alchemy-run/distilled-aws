## Get message detection details

**get** `/accounts/{account_id}/email-security/investigate/{investigate_id}/detections`

Returns detection details such as threat categories and sender information for non-benign messages.

### Path Parameters

- `account_id: string`

  Identifier.

- `investigate_id: string`

  Unique identifier for a message retrieved from investigation

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

- `result: object { action, attachments, findings, 6 more }`

  - `action: string`

  - `attachments: array of object { size, content_type, detection, 6 more }`

    - `size: number`

      Size of the attachment in bytes

    - `content_type: optional string`

      MIME type of the attachment

    - `detection: optional "MALICIOUS" or "MALICIOUS-BEC" or "SUSPICIOUS" or 7 more`

      Detection result for this attachment

      - `"MALICIOUS"`

      - `"MALICIOUS-BEC"`

      - `"SUSPICIOUS"`

      - `"SPOOF"`

      - `"SPAM"`

      - `"BULK"`

      - `"ENCRYPTED"`

      - `"EXTERNAL"`

      - `"UNKNOWN"`

      - `"NONE"`

    - `encrypted: optional boolean`

      Whether the attachment is encrypted

    - `filename: optional string`

      Name of the attached file

    - `md5: optional string`

      MD5 hash of the attachment

    - `name: optional string`

      Attachment name (alternative to filename)

    - `sha1: optional string`

      SHA1 hash of the attachment

    - `sha256: optional string`

      SHA256 hash of the attachment

  - `findings: array of object { attachment, detail, detection, 6 more }`

    - `attachment: optional string`

    - `detail: optional string`

    - `detection: optional "MALICIOUS" or "MALICIOUS-BEC" or "SUSPICIOUS" or 7 more`

      - `"MALICIOUS"`

      - `"MALICIOUS-BEC"`

      - `"SUSPICIOUS"`

      - `"SPOOF"`

      - `"SPAM"`

      - `"BULK"`

      - `"ENCRYPTED"`

      - `"EXTERNAL"`

      - `"UNKNOWN"`

      - `"NONE"`

    - `field: optional string`

    - `name: optional string`

    - `portion: optional string`

    - `reason: optional string`

    - `score: optional number`

    - `value: optional string`

  - `headers: array of object { name, value }`

    - `name: string`

    - `value: string`

  - `links: array of object { href, text }`

    - `href: string`

    - `text: optional string`

  - `sender_info: object { as_name, as_number, geo, 2 more }`

    - `as_name: optional string`

      The name of the autonomous system.

    - `as_number: optional number`

      The number of the autonomous system.

    - `geo: optional string`

    - `ip: optional string`

    - `pld: optional string`

  - `threat_categories: array of object { id, description, name }`

    - `id: optional number`

    - `description: optional string`

    - `name: optional string`

  - `validation: object { comment, dkim, dmarc, spf }`

    - `comment: optional string`

    - `dkim: optional "pass" or "neutral" or "fail" or 2 more`

      - `"pass"`

      - `"neutral"`

      - `"fail"`

      - `"error"`

      - `"none"`

    - `dmarc: optional "pass" or "neutral" or "fail" or 2 more`

      - `"pass"`

      - `"neutral"`

      - `"fail"`

      - `"error"`

      - `"none"`

    - `spf: optional "pass" or "neutral" or "fail" or 2 more`

      - `"pass"`

      - `"neutral"`

      - `"fail"`

      - `"error"`

      - `"none"`

  - `final_disposition: optional "MALICIOUS" or "MALICIOUS-BEC" or "SUSPICIOUS" or 7 more`

    - `"MALICIOUS"`

    - `"MALICIOUS-BEC"`

    - `"SUSPICIOUS"`

    - `"SPOOF"`

    - `"SPAM"`

    - `"BULK"`

    - `"ENCRYPTED"`

    - `"EXTERNAL"`

    - `"UNKNOWN"`

    - `"NONE"`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/investigate/$INVESTIGATE_ID/detections \
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
    "action": "action",
    "attachments": [
      {
        "size": 0,
        "content_type": "content_type",
        "detection": "MALICIOUS",
        "encrypted": true,
        "filename": "filename",
        "md5": "md5",
        "name": "name",
        "sha1": "sha1",
        "sha256": "sha256"
      }
    ],
    "findings": [
      {
        "attachment": "attachment",
        "detail": "detail",
        "detection": "MALICIOUS",
        "field": "field",
        "name": "name",
        "portion": "portion",
        "reason": "reason",
        "score": 0,
        "value": "value"
      }
    ],
    "headers": [
      {
        "name": "name",
        "value": "value"
      }
    ],
    "links": [
      {
        "href": "href",
        "text": "text"
      }
    ],
    "sender_info": {
      "as_name": "as_name",
      "as_number": 0,
      "geo": "geo",
      "ip": "ip",
      "pld": "pld"
    },
    "threat_categories": [
      {
        "id": 0,
        "description": "description",
        "name": "name"
      }
    ],
    "validation": {
      "comment": "comment",
      "dkim": "pass",
      "dmarc": "pass",
      "spf": "pass"
    },
    "final_disposition": "MALICIOUS"
  },
  "success": true
}
```

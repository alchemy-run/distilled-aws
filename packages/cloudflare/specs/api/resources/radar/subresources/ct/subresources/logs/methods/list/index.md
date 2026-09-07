## List certificate logs

**get** `/radar/ct/logs`

Retrieves a list of certificate logs.

### Query Parameters

- `format: optional "JSON" or "CSV"`

  Format in which results will be returned.

  - `"JSON"`

  - `"CSV"`

- `limit: optional number`

  Limits the number of objects returned in the response.

- `offset: optional number`

  Skips the specified number of objects before fetching the results.

### Returns

- `result: object { certificateLogs }`

  - `certificateLogs: array of object { api, description, endExclusive, 6 more }`

    - `api: "RFC6962" or "STATIC"`

      The API standard that the certificate log follows.

      - `"RFC6962"`

      - `"STATIC"`

    - `description: string`

      A brief description of the certificate log.

    - `endExclusive: string`

      The end date and time for when the log will stop accepting certificates.

    - `operator: string`

      The organization responsible for operating the certificate log.

    - `slug: string`

      A URL-friendly, kebab-case identifier for the certificate log.

    - `startInclusive: string`

      The start date and time for when the log starts accepting certificates.

    - `state: "USABLE" or "PENDING" or "QUALIFIED" or 3 more`

      The current state of the certificate log. More details about log states can be found here: https://googlechrome.github.io/CertificateTransparency/log_states.html

      - `"USABLE"`

      - `"PENDING"`

      - `"QUALIFIED"`

      - `"READ_ONLY"`

      - `"RETIRED"`

      - `"REJECTED"`

    - `stateTimestamp: string`

      Timestamp of when the log state was last updated.

    - `url: string`

      The URL for the certificate log.

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/ct/logs \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "certificateLogs": [
      {
        "api": "RFC6962",
        "description": "Google 'Argon2024' log",
        "endExclusive": "2025-01-01T00:00:00Z",
        "operator": "Google",
        "slug": "argon2024",
        "startInclusive": "2024-01-01T00:00:00Z",
        "state": "USABLE",
        "stateTimestamp": "2025-02-01T08:53:20Z",
        "url": "https://ct.googleapis.com/logs/us1/argon2024/"
      }
    ]
  },
  "success": true
}
```

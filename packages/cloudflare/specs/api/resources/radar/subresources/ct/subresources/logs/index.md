# Logs

## Get certificate log details

**get** `/radar/ct/logs/{log_slug}`

Retrieves the requested certificate log information.

### Path Parameters

- `log_slug: string`

  Certificate log slug.

### Query Parameters

- `format: optional "JSON" or "CSV"`

  Format in which results will be returned.

  - `"JSON"`

  - `"CSV"`

### Returns

- `result: object { certificateLog }`

  - `certificateLog: object { api, avgThroughput, description, 12 more }`

    - `api: "RFC6962" or "STATIC"`

      The API standard that the certificate log follows.

      - `"RFC6962"`

      - `"STATIC"`

    - `avgThroughput: number`

      The average throughput of the CT log, measured in certificates per hour (certs/hour).

    - `description: string`

      A brief description of the certificate log.

    - `endExclusive: string`

      The end date and time for when the log will stop accepting certificates.

    - `lastUpdate: string`

      Timestamp of the most recent update to the CT log.

    - `operator: string`

      The organization responsible for operating the certificate log.

    - `performance: object { endpoints, responseTime, uptime }`

      Log performance metrics, including averages and per-endpoint details.

      - `endpoints: array of object { endpoint, responseTime, uptime }`

        - `endpoint: "add-chain (new)" or "add-chain (old)" or "add-pre-chain (new)" or 4 more`

          The certificate log endpoint names used in performance metrics.

          - `"add-chain (new)"`

          - `"add-chain (old)"`

          - `"add-pre-chain (new)"`

          - `"add-pre-chain (old)"`

          - `"get-entries"`

          - `"get-roots"`

          - `"get-sth"`

        - `responseTime: number`

        - `uptime: number`

      - `responseTime: number`

      - `uptime: number`

    - `related: array of object { description, endExclusive, slug, 2 more }`

      Logs from the same operator.

      - `description: string`

        A brief description of the certificate log.

      - `endExclusive: string`

        The end date and time for when the log will stop accepting certificates.

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

    - `submittableCertCount: string`

      Number of certificates that are eligible for inclusion to this log but have not been included yet. Based on certificates signed by trusted root CAs within the log's accepted date range.

    - `submittedCertCount: string`

      Number of certificates already included in this CT log.

    - `url: string`

      The URL for the certificate log.

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/ct/logs/$LOG_SLUG \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "certificateLog": {
      "api": "RFC6962",
      "avgThroughput": 0,
      "description": "Google 'Argon2024' log",
      "endExclusive": "2025-01-01T00:00:00Z",
      "lastUpdate": "2025-01-01T00:00:00Z",
      "operator": "Google",
      "performance": {
        "endpoints": [
          {
            "endpoint": "add-chain (new)",
            "responseTime": 0,
            "uptime": 0
          }
        ],
        "responseTime": 0,
        "uptime": 0
      },
      "related": [
        {
          "description": "Google 'Argon2024' log",
          "endExclusive": "2025-01-01T00:00:00Z",
          "slug": "argon2024",
          "startInclusive": "2024-01-01T00:00:00Z",
          "state": "USABLE"
        }
      ],
      "slug": "argon2024",
      "startInclusive": "2024-01-01T00:00:00Z",
      "state": "USABLE",
      "stateTimestamp": "2025-02-01T08:53:20Z",
      "submittableCertCount": "10",
      "submittedCertCount": "10",
      "url": "https://ct.googleapis.com/logs/us1/argon2024/"
    }
  },
  "success": true
}
```

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

## Domain Types

### Log Get Response

- `LogGetResponse object { certificateLog }`

  - `certificateLog: object { api, avgThroughput, description, 12 more }`

    - `api: "RFC6962" or "STATIC"`

      The API standard that the certificate log follows.

      - `"RFC6962"`

      - `"STATIC"`

    - `avgThroughput: number`

      The average throughput of the CT log, measured in certificates per hour (certs/hour).

    - `description: string`

      A brief description of the certificate log.

    - `endExclusive: string`

      The end date and time for when the log will stop accepting certificates.

    - `lastUpdate: string`

      Timestamp of the most recent update to the CT log.

    - `operator: string`

      The organization responsible for operating the certificate log.

    - `performance: object { endpoints, responseTime, uptime }`

      Log performance metrics, including averages and per-endpoint details.

      - `endpoints: array of object { endpoint, responseTime, uptime }`

        - `endpoint: "add-chain (new)" or "add-chain (old)" or "add-pre-chain (new)" or 4 more`

          The certificate log endpoint names used in performance metrics.

          - `"add-chain (new)"`

          - `"add-chain (old)"`

          - `"add-pre-chain (new)"`

          - `"add-pre-chain (old)"`

          - `"get-entries"`

          - `"get-roots"`

          - `"get-sth"`

        - `responseTime: number`

        - `uptime: number`

      - `responseTime: number`

      - `uptime: number`

    - `related: array of object { description, endExclusive, slug, 2 more }`

      Logs from the same operator.

      - `description: string`

        A brief description of the certificate log.

      - `endExclusive: string`

        The end date and time for when the log will stop accepting certificates.

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

    - `submittableCertCount: string`

      Number of certificates that are eligible for inclusion to this log but have not been included yet. Based on certificates signed by trusted root CAs within the log's accepted date range.

    - `submittedCertCount: string`

      Number of certificates already included in this CT log.

    - `url: string`

      The URL for the certificate log.

### Log List Response

- `LogListResponse object { certificateLogs }`

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

# URL Scanner

## Domain Types

### URL Scanner Domain

- `URLScannerDomain object { id, name, super_category_id }`

  - `id: number`

  - `name: string`

  - `super_category_id: optional number`

### URL Scanner Task

- `URLScannerTask object { effectiveUrl, errors, location, 7 more }`

  - `effectiveUrl: string`

  - `errors: array of object { message }`

    - `message: string`

  - `location: string`

  - `region: string`

  - `status: string`

  - `success: boolean`

  - `time: string`

  - `url: string`

  - `uuid: string`

  - `visibility: string`

# Responses

## Get raw response

**get** `/accounts/{account_id}/urlscanner/v2/responses/{response_id}`

Returns the raw response of the network request. Find the `response_id` in the `data.requests.response.hash`.

### Path Parameters

- `account_id: string`

  Account ID.

- `response_id: string`

  Response hash.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/urlscanner/v2/responses/$RESPONSE_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

## Domain Types

### Response Get Response

- `ResponseGetResponse = string`

  Web resource or image.

# Scans

## Search URL scans

**get** `/accounts/{account_id}/urlscanner/v2/search`

Use a subset of ElasticSearch Query syntax to filter scans. Some example queries:<br/> <br/>- 'path:"/bundles/jquery.js"': Searches for scans who requested resources with the given path.<br/>- 'page.asn:AS24940 AND hash:xxx': Websites hosted in AS24940 where a resource with the given hash was downloaded.<br/>- 'page.domain:microsoft* AND verdicts.malicious:true AND NOT page.domain:microsoft.com': malicious scans whose hostname starts with "microsoft".<br/>- 'apikey:me AND date:[2025-01 TO 2025-02]': my scans from 2025 January to 2025 February.

### Path Parameters

- `account_id: string`

  Account ID.

### Query Parameters

- `q: optional string`

  Filter scans

- `size: optional number`

  Limit the number of objects in the response.

### Returns

- `results: array of object { _id, page, result, 3 more }`

  - `_id: string`

  - `page: object { asn, country, ip, url }`

    - `asn: string`

    - `country: string`

    - `ip: string`

    - `url: string`

  - `result: string`

  - `stats: object { dataLength, requests, uniqCountries, uniqIPs }`

    - `dataLength: number`

    - `requests: number`

    - `uniqCountries: number`

    - `uniqIPs: number`

  - `task: object { time, url, uuid, visibility }`

    - `time: string`

    - `url: string`

    - `uuid: string`

    - `visibility: string`

  - `verdicts: object { malicious }`

    - `malicious: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/urlscanner/v2/search \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "results": [
    {
      "_id": "9626f773-9ffb-4cfb-89d3-30b120fc8011",
      "page": {
        "asn": "AS15133",
        "country": "US",
        "ip": "93.184.215.14",
        "url": "https://example.com"
      },
      "result": "https://radar.clouflare.com/scan/9626f773-9ffb-4cfb-89d3-30b120fc8011",
      "stats": {
        "dataLength": 2512,
        "requests": 2,
        "uniqCountries": 1,
        "uniqIPs": 1
      },
      "task": {
        "time": "2024-09-30T23:54:02.881000+00:00",
        "url": "https://example.com",
        "uuid": "9626f773-9ffb-4cfb-89d3-30b120fc8011",
        "visibility": "public"
      },
      "verdicts": {
        "malicious": true
      }
    }
  ]
}
```

## Get URL scan

**get** `/accounts/{account_id}/urlscanner/v2/result/{scan_id}`

Get URL scan by uuid

### Path Parameters

- `account_id: string`

  Account ID.

- `scan_id: string`

  Scan UUID.

### Returns

- `data: object { console, cookies, globals, 3 more }`

  - `console: array of object { message }`

    - `message: object { level, source, text, url }`

      - `level: string`

      - `source: string`

      - `text: string`

      - `url: string`

  - `cookies: array of object { domain, expires, httpOnly, 10 more }`

    - `domain: string`

    - `expires: number`

    - `httpOnly: boolean`

    - `name: string`

    - `path: string`

    - `priority: string`

    - `sameParty: boolean`

    - `secure: boolean`

    - `session: boolean`

    - `size: number`

    - `sourcePort: number`

    - `sourceScheme: string`

    - `value: string`

  - `globals: array of object { prop, type }`

    - `prop: string`

    - `type: string`

  - `links: array of object { href, text }`

    - `href: string`

    - `text: string`

  - `performance: array of object { duration, entryType, name, startTime }`

    - `duration: number`

    - `entryType: string`

    - `name: string`

    - `startTime: number`

  - `requests: array of object { request, response, requests }`

    - `request: object { documentURL, hasUserGesture, initiator, 9 more }`

      - `documentURL: string`

      - `hasUserGesture: boolean`

      - `initiator: object { host, type, url }`

        - `host: string`

        - `type: string`

        - `url: string`

      - `redirectHasExtraInfo: boolean`

      - `request: object { initialPriority, isSameSite, method, 4 more }`

        - `initialPriority: string`

        - `isSameSite: boolean`

        - `method: string`

        - `mixedContentType: string`

        - `referrerPolicy: string`

        - `url: string`

        - `headers: optional unknown`

      - `requestId: string`

      - `type: string`

      - `wallTime: number`

      - `frameId: optional string`

      - `loaderId: optional string`

      - `primaryRequest: optional boolean`

      - `redirectResponse: optional object { charset, mimeType, protocol, 8 more }`

        - `charset: string`

        - `mimeType: string`

        - `protocol: string`

        - `remoteIPAddress: string`

        - `remotePort: number`

        - `securityHeaders: array of object { name, value }`

          - `name: string`

          - `value: string`

        - `securityState: string`

        - `status: number`

        - `statusText: string`

        - `url: string`

        - `headers: optional unknown`

    - `response: object { asn, dataLength, encodedDataLength, 8 more }`

      - `asn: object { asn, country, description, 3 more }`

        - `asn: string`

        - `country: string`

        - `description: string`

        - `ip: string`

        - `name: string`

        - `org: string`

      - `dataLength: number`

      - `encodedDataLength: number`

      - `geoip: object { city, country, country_name, 3 more }`

        - `city: string`

        - `country: string`

        - `country_name: string`

        - `geonameId: string`

        - `ll: array of number`

        - `region: string`

      - `hasExtraInfo: boolean`

      - `requestId: string`

      - `response: object { charset, mimeType, protocol, 9 more }`

        - `charset: string`

        - `mimeType: string`

        - `protocol: string`

        - `remoteIPAddress: string`

        - `remotePort: number`

        - `securityDetails: object { certificateId, certificateTransparencyCompliance, cipher, 10 more }`

          - `certificateId: number`

          - `certificateTransparencyCompliance: string`

          - `cipher: string`

          - `encryptedClientHello: boolean`

          - `issuer: string`

          - `keyExchange: string`

          - `keyExchangeGroup: string`

          - `protocol: string`

          - `sanList: array of string`

          - `serverSignatureAlgorithm: number`

          - `subjectName: string`

          - `validFrom: number`

          - `validTo: number`

        - `securityHeaders: array of object { name, value }`

          - `name: string`

          - `value: string`

        - `securityState: string`

        - `status: number`

        - `statusText: string`

        - `url: string`

        - `headers: optional unknown`

      - `size: number`

      - `type: string`

      - `contentAvailable: optional boolean`

      - `hash: optional string`

    - `requests: optional array of object { documentURL, frameId, hasUserGesture, 7 more }`

      - `documentURL: string`

      - `frameId: string`

      - `hasUserGesture: boolean`

      - `initiator: object { type }`

        - `type: string`

      - `loaderId: string`

      - `redirectHasExtraInfo: boolean`

      - `request: object { headers, initialPriority, isSameSite, 4 more }`

        - `headers: object { name }`

          - `name: string`

        - `initialPriority: string`

        - `isSameSite: boolean`

        - `method: string`

        - `mixedContentType: string`

        - `referrerPolicy: string`

        - `url: string`

      - `requestId: string`

      - `type: string`

      - `wallTime: number`

- `lists: object { asns, certificates, continents, 7 more }`

  - `asns: array of string`

  - `certificates: array of object { issuer, subjectName, validFrom, validTo }`

    - `issuer: string`

    - `subjectName: string`

    - `validFrom: number`

    - `validTo: number`

  - `continents: array of string`

  - `countries: array of string`

  - `domains: array of string`

  - `hashes: array of string`

  - `ips: array of string`

  - `linkDomains: array of string`

  - `servers: array of string`

  - `urls: array of string`

- `meta: object { processors }`

  - `processors: object { asn, dns, domainCategories, 8 more }`

    - `asn: object { data }`

      - `data: array of object { asn, country, description, 2 more }`

        - `asn: string`

        - `country: string`

        - `description: string`

        - `ip: string`

        - `name: string`

    - `dns: object { data }`

      - `data: array of object { address, dnssec_valid, name, type }`

        - `address: string`

        - `dnssec_valid: boolean`

        - `name: string`

        - `type: string`

    - `domainCategories: object { data }`

      - `data: array of object { inherited, isPrimary, name }`

        - `inherited: unknown`

        - `isPrimary: boolean`

        - `name: string`

    - `geoip: object { data }`

      - `data: array of object { geoip, ip }`

        - `geoip: object { city, country, country_name, 2 more }`

          - `city: string`

          - `country: string`

          - `country_name: string`

          - `ll: array of number`

          - `region: string`

        - `ip: string`

    - `phishing: object { data }`

      - `data: array of string`

    - `radarRank: object { data }`

      - `data: array of object { bucket, hostname, rank }`

        - `bucket: string`

        - `hostname: string`

        - `rank: optional number`

    - `wappa: object { data }`

      - `data: array of object { app, categories, confidence, 3 more }`

        - `app: string`

        - `categories: array of object { name, priority }`

          - `name: string`

          - `priority: number`

        - `confidence: array of object { confidence, name, pattern, patternType }`

          - `confidence: number`

          - `name: string`

          - `pattern: string`

          - `patternType: string`

        - `confidenceTotal: number`

        - `icon: string`

        - `website: string`

    - `agentReadiness: optional object { checks, level, levelName, 3 more }`

      - `checks: object { botAccessControl, commerce, contentAccessibility, 2 more }`

        - `botAccessControl: object { contentSignals, robotsTxtAiRules, webBotAuth }`

          - `contentSignals: object { status, details, durationMs, 2 more }`

            - `status: string`

            - `details: optional unknown`

            - `durationMs: optional number`

            - `evidence: optional array of object { action, label, finding, 2 more }`

              - `action: string`

              - `label: string`

              - `finding: optional object { outcome, summary }`

                - `outcome: string`

                - `summary: string`

              - `request: optional object { method, url, headers }`

                - `method: string`

                - `url: string`

                - `headers: optional unknown`

              - `response: optional object { status, statusText, bodyPreview, 3 more }`

                - `status: number`

                - `statusText: string`

                - `bodyPreview: optional string`

                - `bodySize: optional number`

                - `headers: optional unknown`

                - `redirectedTo: optional string`

            - `message: optional string`

          - `robotsTxtAiRules: object { status, details, durationMs, 2 more }`

            - `status: string`

            - `details: optional unknown`

            - `durationMs: optional number`

            - `evidence: optional array of object { action, label, finding, 2 more }`

              - `action: string`

              - `label: string`

              - `finding: optional object { outcome, summary }`

                - `outcome: string`

                - `summary: string`

              - `request: optional object { method, url, headers }`

                - `method: string`

                - `url: string`

                - `headers: optional unknown`

              - `response: optional object { status, statusText, bodyPreview, 3 more }`

                - `status: number`

                - `statusText: string`

                - `bodyPreview: optional string`

                - `bodySize: optional number`

                - `headers: optional unknown`

                - `redirectedTo: optional string`

            - `message: optional string`

          - `webBotAuth: object { status, details, durationMs, 2 more }`

            - `status: string`

            - `details: optional unknown`

            - `durationMs: optional number`

            - `evidence: optional array of object { action, label, finding, 2 more }`

              - `action: string`

              - `label: string`

              - `finding: optional object { outcome, summary }`

                - `outcome: string`

                - `summary: string`

              - `request: optional object { method, url, headers }`

                - `method: string`

                - `url: string`

                - `headers: optional unknown`

              - `response: optional object { status, statusText, bodyPreview, 3 more }`

                - `status: number`

                - `statusText: string`

                - `bodyPreview: optional string`

                - `bodySize: optional number`

                - `headers: optional unknown`

                - `redirectedTo: optional string`

            - `message: optional string`

        - `commerce: object { acp, ap2, mpp, 2 more }`

          - `acp: object { status, details, durationMs, 2 more }`

            - `status: string`

            - `details: optional unknown`

            - `durationMs: optional number`

            - `evidence: optional array of object { action, label, finding, 2 more }`

              - `action: string`

              - `label: string`

              - `finding: optional object { outcome, summary }`

                - `outcome: string`

                - `summary: string`

              - `request: optional object { method, url, headers }`

                - `method: string`

                - `url: string`

                - `headers: optional unknown`

              - `response: optional object { status, statusText, bodyPreview, 3 more }`

                - `status: number`

                - `statusText: string`

                - `bodyPreview: optional string`

                - `bodySize: optional number`

                - `headers: optional unknown`

                - `redirectedTo: optional string`

            - `message: optional string`

          - `ap2: object { status, details, durationMs, 2 more }`

            - `status: string`

            - `details: optional unknown`

            - `durationMs: optional number`

            - `evidence: optional array of object { action, label, finding, 2 more }`

              - `action: string`

              - `label: string`

              - `finding: optional object { outcome, summary }`

                - `outcome: string`

                - `summary: string`

              - `request: optional object { method, url, headers }`

                - `method: string`

                - `url: string`

                - `headers: optional unknown`

              - `response: optional object { status, statusText, bodyPreview, 3 more }`

                - `status: number`

                - `statusText: string`

                - `bodyPreview: optional string`

                - `bodySize: optional number`

                - `headers: optional unknown`

                - `redirectedTo: optional string`

            - `message: optional string`

          - `mpp: object { status, details, durationMs, 2 more }`

            - `status: string`

            - `details: optional unknown`

            - `durationMs: optional number`

            - `evidence: optional array of object { action, label, finding, 2 more }`

              - `action: string`

              - `label: string`

              - `finding: optional object { outcome, summary }`

                - `outcome: string`

                - `summary: string`

              - `request: optional object { method, url, headers }`

                - `method: string`

                - `url: string`

                - `headers: optional unknown`

              - `response: optional object { status, statusText, bodyPreview, 3 more }`

                - `status: number`

                - `statusText: string`

                - `bodyPreview: optional string`

                - `bodySize: optional number`

                - `headers: optional unknown`

                - `redirectedTo: optional string`

            - `message: optional string`

          - `ucp: object { status, details, durationMs, 2 more }`

            - `status: string`

            - `details: optional unknown`

            - `durationMs: optional number`

            - `evidence: optional array of object { action, label, finding, 2 more }`

              - `action: string`

              - `label: string`

              - `finding: optional object { outcome, summary }`

                - `outcome: string`

                - `summary: string`

              - `request: optional object { method, url, headers }`

                - `method: string`

                - `url: string`

                - `headers: optional unknown`

              - `response: optional object { status, statusText, bodyPreview, 3 more }`

                - `status: number`

                - `statusText: string`

                - `bodyPreview: optional string`

                - `bodySize: optional number`

                - `headers: optional unknown`

                - `redirectedTo: optional string`

            - `message: optional string`

          - `x402: object { status, details, durationMs, 2 more }`

            - `status: string`

            - `details: optional unknown`

            - `durationMs: optional number`

            - `evidence: optional array of object { action, label, finding, 2 more }`

              - `action: string`

              - `label: string`

              - `finding: optional object { outcome, summary }`

                - `outcome: string`

                - `summary: string`

              - `request: optional object { method, url, headers }`

                - `method: string`

                - `url: string`

                - `headers: optional unknown`

              - `response: optional object { status, statusText, bodyPreview, 3 more }`

                - `status: number`

                - `statusText: string`

                - `bodyPreview: optional string`

                - `bodySize: optional number`

                - `headers: optional unknown`

                - `redirectedTo: optional string`

            - `message: optional string`

        - `contentAccessibility: object { markdownNegotiation }`

          - `markdownNegotiation: object { status, details, durationMs, 2 more }`

            - `status: string`

            - `details: optional unknown`

            - `durationMs: optional number`

            - `evidence: optional array of object { action, label, finding, 2 more }`

              - `action: string`

              - `label: string`

              - `finding: optional object { outcome, summary }`

                - `outcome: string`

                - `summary: string`

              - `request: optional object { method, url, headers }`

                - `method: string`

                - `url: string`

                - `headers: optional unknown`

              - `response: optional object { status, statusText, bodyPreview, 3 more }`

                - `status: number`

                - `statusText: string`

                - `bodyPreview: optional string`

                - `bodySize: optional number`

                - `headers: optional unknown`

                - `redirectedTo: optional string`

            - `message: optional string`

        - `discoverability: object { linkHeaders, robotsTxt, sitemap }`

          - `linkHeaders: object { status, details, durationMs, 2 more }`

            - `status: string`

            - `details: optional unknown`

            - `durationMs: optional number`

            - `evidence: optional array of object { action, label, finding, 2 more }`

              - `action: string`

              - `label: string`

              - `finding: optional object { outcome, summary }`

                - `outcome: string`

                - `summary: string`

              - `request: optional object { method, url, headers }`

                - `method: string`

                - `url: string`

                - `headers: optional unknown`

              - `response: optional object { status, statusText, bodyPreview, 3 more }`

                - `status: number`

                - `statusText: string`

                - `bodyPreview: optional string`

                - `bodySize: optional number`

                - `headers: optional unknown`

                - `redirectedTo: optional string`

            - `message: optional string`

          - `robotsTxt: object { status, details, durationMs, 2 more }`

            - `status: string`

            - `details: optional unknown`

            - `durationMs: optional number`

            - `evidence: optional array of object { action, label, finding, 2 more }`

              - `action: string`

              - `label: string`

              - `finding: optional object { outcome, summary }`

                - `outcome: string`

                - `summary: string`

              - `request: optional object { method, url, headers }`

                - `method: string`

                - `url: string`

                - `headers: optional unknown`

              - `response: optional object { status, statusText, bodyPreview, 3 more }`

                - `status: number`

                - `statusText: string`

                - `bodyPreview: optional string`

                - `bodySize: optional number`

                - `headers: optional unknown`

                - `redirectedTo: optional string`

            - `message: optional string`

          - `sitemap: object { status, details, durationMs, 2 more }`

            - `status: string`

            - `details: optional unknown`

            - `durationMs: optional number`

            - `evidence: optional array of object { action, label, finding, 2 more }`

              - `action: string`

              - `label: string`

              - `finding: optional object { outcome, summary }`

                - `outcome: string`

                - `summary: string`

              - `request: optional object { method, url, headers }`

                - `method: string`

                - `url: string`

                - `headers: optional unknown`

              - `response: optional object { status, statusText, bodyPreview, 3 more }`

                - `status: number`

                - `statusText: string`

                - `bodyPreview: optional string`

                - `bodySize: optional number`

                - `headers: optional unknown`

                - `redirectedTo: optional string`

            - `message: optional string`

        - `discovery: object { a2aAgentCard, agentSkills, apiCatalog, 4 more }`

          - `a2aAgentCard: object { status, details, durationMs, 2 more }`

            - `status: string`

            - `details: optional unknown`

            - `durationMs: optional number`

            - `evidence: optional array of object { action, label, finding, 2 more }`

              - `action: string`

              - `label: string`

              - `finding: optional object { outcome, summary }`

                - `outcome: string`

                - `summary: string`

              - `request: optional object { method, url, headers }`

                - `method: string`

                - `url: string`

                - `headers: optional unknown`

              - `response: optional object { status, statusText, bodyPreview, 3 more }`

                - `status: number`

                - `statusText: string`

                - `bodyPreview: optional string`

                - `bodySize: optional number`

                - `headers: optional unknown`

                - `redirectedTo: optional string`

            - `message: optional string`

          - `agentSkills: object { status, details, durationMs, 2 more }`

            - `status: string`

            - `details: optional unknown`

            - `durationMs: optional number`

            - `evidence: optional array of object { action, label, finding, 2 more }`

              - `action: string`

              - `label: string`

              - `finding: optional object { outcome, summary }`

                - `outcome: string`

                - `summary: string`

              - `request: optional object { method, url, headers }`

                - `method: string`

                - `url: string`

                - `headers: optional unknown`

              - `response: optional object { status, statusText, bodyPreview, 3 more }`

                - `status: number`

                - `statusText: string`

                - `bodyPreview: optional string`

                - `bodySize: optional number`

                - `headers: optional unknown`

                - `redirectedTo: optional string`

            - `message: optional string`

          - `apiCatalog: object { status, details, durationMs, 2 more }`

            - `status: string`

            - `details: optional unknown`

            - `durationMs: optional number`

            - `evidence: optional array of object { action, label, finding, 2 more }`

              - `action: string`

              - `label: string`

              - `finding: optional object { outcome, summary }`

                - `outcome: string`

                - `summary: string`

              - `request: optional object { method, url, headers }`

                - `method: string`

                - `url: string`

                - `headers: optional unknown`

              - `response: optional object { status, statusText, bodyPreview, 3 more }`

                - `status: number`

                - `statusText: string`

                - `bodyPreview: optional string`

                - `bodySize: optional number`

                - `headers: optional unknown`

                - `redirectedTo: optional string`

            - `message: optional string`

          - `mcpServerCard: object { status, details, durationMs, 2 more }`

            - `status: string`

            - `details: optional unknown`

            - `durationMs: optional number`

            - `evidence: optional array of object { action, label, finding, 2 more }`

              - `action: string`

              - `label: string`

              - `finding: optional object { outcome, summary }`

                - `outcome: string`

                - `summary: string`

              - `request: optional object { method, url, headers }`

                - `method: string`

                - `url: string`

                - `headers: optional unknown`

              - `response: optional object { status, statusText, bodyPreview, 3 more }`

                - `status: number`

                - `statusText: string`

                - `bodyPreview: optional string`

                - `bodySize: optional number`

                - `headers: optional unknown`

                - `redirectedTo: optional string`

            - `message: optional string`

          - `oauthDiscovery: object { status, details, durationMs, 2 more }`

            - `status: string`

            - `details: optional unknown`

            - `durationMs: optional number`

            - `evidence: optional array of object { action, label, finding, 2 more }`

              - `action: string`

              - `label: string`

              - `finding: optional object { outcome, summary }`

                - `outcome: string`

                - `summary: string`

              - `request: optional object { method, url, headers }`

                - `method: string`

                - `url: string`

                - `headers: optional unknown`

              - `response: optional object { status, statusText, bodyPreview, 3 more }`

                - `status: number`

                - `statusText: string`

                - `bodyPreview: optional string`

                - `bodySize: optional number`

                - `headers: optional unknown`

                - `redirectedTo: optional string`

            - `message: optional string`

          - `oauthProtectedResource: object { status, details, durationMs, 2 more }`

            - `status: string`

            - `details: optional unknown`

            - `durationMs: optional number`

            - `evidence: optional array of object { action, label, finding, 2 more }`

              - `action: string`

              - `label: string`

              - `finding: optional object { outcome, summary }`

                - `outcome: string`

                - `summary: string`

              - `request: optional object { method, url, headers }`

                - `method: string`

                - `url: string`

                - `headers: optional unknown`

              - `response: optional object { status, statusText, bodyPreview, 3 more }`

                - `status: number`

                - `statusText: string`

                - `bodyPreview: optional string`

                - `bodySize: optional number`

                - `headers: optional unknown`

                - `redirectedTo: optional string`

            - `message: optional string`

          - `webMcp: object { status, details, durationMs, 2 more }`

            - `status: string`

            - `details: optional unknown`

            - `durationMs: optional number`

            - `evidence: optional array of object { action, label, finding, 2 more }`

              - `action: string`

              - `label: string`

              - `finding: optional object { outcome, summary }`

                - `outcome: string`

                - `summary: string`

              - `request: optional object { method, url, headers }`

                - `method: string`

                - `url: string`

                - `headers: optional unknown`

              - `response: optional object { status, statusText, bodyPreview, 3 more }`

                - `status: number`

                - `statusText: string`

                - `bodyPreview: optional string`

                - `bodySize: optional number`

                - `headers: optional unknown`

                - `redirectedTo: optional string`

            - `message: optional string`

      - `level: number`

      - `levelName: string`

      - `commerceSignals: optional array of string`

      - `isCommerce: optional boolean`

      - `nextLevel: optional object { name, requirements, target }`

        - `name: string`

        - `requirements: array of object { check, description, prompt, 2 more }`

          - `check: string`

          - `description: string`

          - `prompt: string`

          - `skillUrl: string`

          - `specUrls: array of string`

        - `target: number`

    - `phishing_v2: optional object { data }`

      - `data: array of string`

    - `robotsTxt: optional object { data }`

      - `data: array of object { rules, sitemaps, hash }`

        - `rules: object { "*" }`

          - `"*": object { allow, disallow, contentSignal, crawlDelay }`

            - `allow: array of string`

            - `disallow: array of string`

            - `contentSignal: optional object { "ai-input", "ai-train", search }`

              - `"ai-input": optional string`

              - `"ai-train": optional string`

              - `search: optional string`

            - `crawlDelay: optional number`

        - `sitemaps: array of string`

        - `hash: optional string`

    - `urlCategories: optional object { data }`

      - `data: array of object { content, inherited, name, risks }`

        - `content: array of object { id, name, super_category_id }`

          - `id: number`

          - `name: string`

          - `super_category_id: number`

        - `inherited: object { content, from, risks }`

          - `content: array of object { id, name, super_category_id }`

            - `id: number`

            - `name: string`

            - `super_category_id: number`

          - `from: string`

          - `risks: array of object { id, name, super_category_id }`

            - `id: number`

            - `name: string`

            - `super_category_id: number`

        - `name: string`

        - `risks: array of object { id, name, super_category_id }`

          - `id: number`

          - `name: string`

          - `super_category_id: number`

- `page: object { apexDomain, asn, asnname, 14 more }`

  - `apexDomain: string`

  - `asn: string`

  - `asnname: string`

  - `city: string`

  - `country: string`

  - `domain: string`

  - `ip: string`

  - `mimeType: string`

  - `server: string`

  - `status: string`

  - `title: string`

  - `tlsAgeDays: number`

  - `tlsIssuer: string`

  - `tlsValidDays: number`

  - `tlsValidFrom: string`

  - `url: string`

  - `screenshot: optional object { dhash, mm3Hash, name, phash }`

    - `dhash: string`

    - `mm3Hash: number`

    - `name: string`

    - `phash: string`

- `scanner: object { colo, country }`

  - `colo: string`

  - `country: string`

- `stats: object { domainStats, ipStats, IPv6Percentage, 10 more }`

  - `domainStats: array of object { count, countries, domain, 6 more }`

    - `count: number`

    - `countries: array of string`

    - `domain: string`

    - `encodedSize: number`

    - `index: number`

    - `initiators: array of string`

    - `ips: array of string`

    - `redirects: number`

    - `size: number`

  - `ipStats: array of object { asn, countries, domains, 9 more }`

    - `asn: object { asn, country, description, 3 more }`

      - `asn: string`

      - `country: string`

      - `description: string`

      - `ip: string`

      - `name: string`

      - `org: string`

    - `countries: array of string`

    - `domains: array of string`

    - `encodedSize: number`

    - `geoip: object { city, country, country_name, 2 more }`

      - `city: string`

      - `country: string`

      - `country_name: string`

      - `ll: array of number`

      - `region: string`

    - `index: number`

    - `ip: string`

    - `ipv6: boolean`

    - `redirects: number`

    - `requests: number`

    - `size: number`

    - `count: optional number`

  - `IPv6Percentage: number`

  - `malicious: number`

  - `protocolStats: array of object { count, countries, encodedSize, 3 more }`

    - `count: number`

    - `countries: array of string`

    - `encodedSize: number`

    - `ips: array of string`

    - `protocol: string`

    - `size: number`

  - `resourceStats: array of object { compression, count, countries, 5 more }`

    - `compression: number`

    - `count: number`

    - `countries: array of string`

    - `encodedSize: number`

    - `ips: array of string`

    - `percentage: number`

    - `size: number`

    - `type: string`

  - `securePercentage: number`

  - `secureRequests: number`

  - `serverStats: array of object { count, countries, encodedSize, 3 more }`

    - `count: number`

    - `countries: array of string`

    - `encodedSize: number`

    - `ips: array of string`

    - `server: string`

    - `size: number`

  - `tlsStats: array of object { count, countries, encodedSize, 4 more }`

    - `count: number`

    - `countries: array of string`

    - `encodedSize: number`

    - `ips: array of string`

    - `protocols: object { "TLS 1.3 / AES_128_GCM" }`

      - `"TLS 1.3 / AES_128_GCM": number`

    - `securityState: string`

    - `size: number`

  - `totalLinks: number`

  - `uniqASNs: number`

  - `uniqCountries: number`

- `task: object { apexDomain, domain, domURL, 10 more }`

  - `apexDomain: string`

  - `domain: string`

  - `domURL: string`

  - `method: string`

  - `options: object { customHeaders, screenshotsResolutions }`

    - `customHeaders: optional unknown`

      Custom headers set.

    - `screenshotsResolutions: optional array of string`

  - `reportURL: string`

  - `screenshotURL: string`

  - `source: string`

  - `success: boolean`

  - `time: string`

  - `url: string`

  - `uuid: string`

  - `visibility: string`

- `verdicts: object { overall }`

  - `overall: object { categories, hasVerdicts, malicious, tags }`

    - `categories: array of string`

    - `hasVerdicts: boolean`

    - `malicious: boolean`

    - `tags: array of string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/urlscanner/v2/result/$SCAN_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "data": {
    "console": [
      {
        "message": {
          "level": "level",
          "source": "source",
          "text": "text",
          "url": "url"
        }
      }
    ],
    "cookies": [
      {
        "domain": "domain",
        "expires": 0,
        "httpOnly": true,
        "name": "name",
        "path": "path",
        "priority": "priority",
        "sameParty": true,
        "secure": true,
        "session": true,
        "size": 0,
        "sourcePort": 0,
        "sourceScheme": "sourceScheme",
        "value": "value"
      }
    ],
    "globals": [
      {
        "prop": "prop",
        "type": "type"
      }
    ],
    "links": [
      {
        "href": "href",
        "text": "text"
      }
    ],
    "performance": [
      {
        "duration": 0,
        "entryType": "entryType",
        "name": "name",
        "startTime": 0
      }
    ],
    "requests": [
      {
        "request": {
          "documentURL": "documentURL",
          "hasUserGesture": true,
          "initiator": {
            "host": "host",
            "type": "type",
            "url": "url"
          },
          "redirectHasExtraInfo": true,
          "request": {
            "initialPriority": "initialPriority",
            "isSameSite": true,
            "method": "method",
            "mixedContentType": "mixedContentType",
            "referrerPolicy": "referrerPolicy",
            "url": "url",
            "headers": {}
          },
          "requestId": "requestId",
          "type": "type",
          "wallTime": 0,
          "frameId": "frameId",
          "loaderId": "loaderId",
          "primaryRequest": true,
          "redirectResponse": {
            "charset": "charset",
            "mimeType": "mimeType",
            "protocol": "protocol",
            "remoteIPAddress": "remoteIPAddress",
            "remotePort": 0,
            "securityHeaders": [
              {
                "name": "name",
                "value": "value"
              }
            ],
            "securityState": "securityState",
            "status": 0,
            "statusText": "statusText",
            "url": "url",
            "headers": {}
          }
        },
        "response": {
          "asn": {
            "asn": "asn",
            "country": "country",
            "description": "description",
            "ip": "ip",
            "name": "name",
            "org": "org"
          },
          "dataLength": 0,
          "encodedDataLength": 0,
          "geoip": {
            "city": "city",
            "country": "country",
            "country_name": "country_name",
            "geonameId": "geonameId",
            "ll": [
              0
            ],
            "region": "region"
          },
          "hasExtraInfo": true,
          "requestId": "requestId",
          "response": {
            "charset": "charset",
            "mimeType": "mimeType",
            "protocol": "protocol",
            "remoteIPAddress": "remoteIPAddress",
            "remotePort": 0,
            "securityDetails": {
              "certificateId": 0,
              "certificateTransparencyCompliance": "certificateTransparencyCompliance",
              "cipher": "cipher",
              "encryptedClientHello": true,
              "issuer": "issuer",
              "keyExchange": "keyExchange",
              "keyExchangeGroup": "keyExchangeGroup",
              "protocol": "protocol",
              "sanList": [
                "string"
              ],
              "serverSignatureAlgorithm": 0,
              "subjectName": "subjectName",
              "validFrom": 0,
              "validTo": 0
            },
            "securityHeaders": [
              {
                "name": "name",
                "value": "value"
              }
            ],
            "securityState": "securityState",
            "status": 0,
            "statusText": "statusText",
            "url": "url",
            "headers": {}
          },
          "size": 0,
          "type": "type",
          "contentAvailable": true,
          "hash": "hash"
        },
        "requests": [
          {
            "documentURL": "documentURL",
            "frameId": "frameId",
            "hasUserGesture": true,
            "initiator": {
              "type": "type"
            },
            "loaderId": "loaderId",
            "redirectHasExtraInfo": true,
            "request": {
              "headers": {
                "name": "name"
              },
              "initialPriority": "initialPriority",
              "isSameSite": true,
              "method": "method",
              "mixedContentType": "mixedContentType",
              "referrerPolicy": "referrerPolicy",
              "url": "url"
            },
            "requestId": "requestId",
            "type": "type",
            "wallTime": 0
          }
        ]
      }
    ]
  },
  "lists": {
    "asns": [
      "string"
    ],
    "certificates": [
      {
        "issuer": "issuer",
        "subjectName": "subjectName",
        "validFrom": 0,
        "validTo": 0
      }
    ],
    "continents": [
      "string"
    ],
    "countries": [
      "string"
    ],
    "domains": [
      "string"
    ],
    "hashes": [
      "string"
    ],
    "ips": [
      "string"
    ],
    "linkDomains": [
      "string"
    ],
    "servers": [
      "string"
    ],
    "urls": [
      "string"
    ]
  },
  "meta": {
    "processors": {
      "asn": {
        "data": [
          {
            "asn": "asn",
            "country": "country",
            "description": "description",
            "ip": "ip",
            "name": "name"
          }
        ]
      },
      "dns": {
        "data": [
          {
            "address": "address",
            "dnssec_valid": true,
            "name": "name",
            "type": "type"
          }
        ]
      },
      "domainCategories": {
        "data": [
          {
            "inherited": {},
            "isPrimary": true,
            "name": "name"
          }
        ]
      },
      "geoip": {
        "data": [
          {
            "geoip": {
              "city": "city",
              "country": "country",
              "country_name": "country_name",
              "ll": [
                0
              ],
              "region": "region"
            },
            "ip": "ip"
          }
        ]
      },
      "phishing": {
        "data": [
          "string"
        ]
      },
      "radarRank": {
        "data": [
          {
            "bucket": "bucket",
            "hostname": "hostname",
            "rank": 0
          }
        ]
      },
      "wappa": {
        "data": [
          {
            "app": "app",
            "categories": [
              {
                "name": "name",
                "priority": 0
              }
            ],
            "confidence": [
              {
                "confidence": 0,
                "name": "name",
                "pattern": "pattern",
                "patternType": "patternType"
              }
            ],
            "confidenceTotal": 0,
            "icon": "icon",
            "website": "website"
          }
        ]
      },
      "agentReadiness": {
        "checks": {
          "botAccessControl": {
            "contentSignals": {
              "status": "pass",
              "details": {},
              "durationMs": 0,
              "evidence": [
                {
                  "action": "fetch",
                  "label": "GET /robots.txt",
                  "finding": {
                    "outcome": "positive",
                    "summary": "Found valid robots.txt"
                  },
                  "request": {
                    "method": "GET",
                    "url": "https://example.com/robots.txt",
                    "headers": {}
                  },
                  "response": {
                    "status": 200,
                    "statusText": "OK",
                    "bodyPreview": "bodyPreview",
                    "bodySize": 0,
                    "headers": {},
                    "redirectedTo": "redirectedTo"
                  }
                }
              ],
              "message": "message"
            },
            "robotsTxtAiRules": {
              "status": "pass",
              "details": {},
              "durationMs": 0,
              "evidence": [
                {
                  "action": "fetch",
                  "label": "GET /robots.txt",
                  "finding": {
                    "outcome": "positive",
                    "summary": "Found valid robots.txt"
                  },
                  "request": {
                    "method": "GET",
                    "url": "https://example.com/robots.txt",
                    "headers": {}
                  },
                  "response": {
                    "status": 200,
                    "statusText": "OK",
                    "bodyPreview": "bodyPreview",
                    "bodySize": 0,
                    "headers": {},
                    "redirectedTo": "redirectedTo"
                  }
                }
              ],
              "message": "message"
            },
            "webBotAuth": {
              "status": "fail",
              "details": {},
              "durationMs": 0,
              "evidence": [
                {
                  "action": "fetch",
                  "label": "GET /robots.txt",
                  "finding": {
                    "outcome": "positive",
                    "summary": "Found valid robots.txt"
                  },
                  "request": {
                    "method": "GET",
                    "url": "https://example.com/robots.txt",
                    "headers": {}
                  },
                  "response": {
                    "status": 200,
                    "statusText": "OK",
                    "bodyPreview": "bodyPreview",
                    "bodySize": 0,
                    "headers": {},
                    "redirectedTo": "redirectedTo"
                  }
                }
              ],
              "message": "message"
            }
          },
          "commerce": {
            "acp": {
              "status": "fail",
              "details": {},
              "durationMs": 0,
              "evidence": [
                {
                  "action": "fetch",
                  "label": "GET /robots.txt",
                  "finding": {
                    "outcome": "positive",
                    "summary": "Found valid robots.txt"
                  },
                  "request": {
                    "method": "GET",
                    "url": "https://example.com/robots.txt",
                    "headers": {}
                  },
                  "response": {
                    "status": 200,
                    "statusText": "OK",
                    "bodyPreview": "bodyPreview",
                    "bodySize": 0,
                    "headers": {},
                    "redirectedTo": "redirectedTo"
                  }
                }
              ],
              "message": "message"
            },
            "ap2": {
              "status": "fail",
              "details": {},
              "durationMs": 0,
              "evidence": [
                {
                  "action": "fetch",
                  "label": "GET /robots.txt",
                  "finding": {
                    "outcome": "positive",
                    "summary": "Found valid robots.txt"
                  },
                  "request": {
                    "method": "GET",
                    "url": "https://example.com/robots.txt",
                    "headers": {}
                  },
                  "response": {
                    "status": 200,
                    "statusText": "OK",
                    "bodyPreview": "bodyPreview",
                    "bodySize": 0,
                    "headers": {},
                    "redirectedTo": "redirectedTo"
                  }
                }
              ],
              "message": "message"
            },
            "mpp": {
              "status": "fail",
              "details": {},
              "durationMs": 0,
              "evidence": [
                {
                  "action": "fetch",
                  "label": "GET /robots.txt",
                  "finding": {
                    "outcome": "positive",
                    "summary": "Found valid robots.txt"
                  },
                  "request": {
                    "method": "GET",
                    "url": "https://example.com/robots.txt",
                    "headers": {}
                  },
                  "response": {
                    "status": 200,
                    "statusText": "OK",
                    "bodyPreview": "bodyPreview",
                    "bodySize": 0,
                    "headers": {},
                    "redirectedTo": "redirectedTo"
                  }
                }
              ],
              "message": "message"
            },
            "ucp": {
              "status": "fail",
              "details": {},
              "durationMs": 0,
              "evidence": [
                {
                  "action": "fetch",
                  "label": "GET /robots.txt",
                  "finding": {
                    "outcome": "positive",
                    "summary": "Found valid robots.txt"
                  },
                  "request": {
                    "method": "GET",
                    "url": "https://example.com/robots.txt",
                    "headers": {}
                  },
                  "response": {
                    "status": 200,
                    "statusText": "OK",
                    "bodyPreview": "bodyPreview",
                    "bodySize": 0,
                    "headers": {},
                    "redirectedTo": "redirectedTo"
                  }
                }
              ],
              "message": "message"
            },
            "x402": {
              "status": "fail",
              "details": {},
              "durationMs": 0,
              "evidence": [
                {
                  "action": "fetch",
                  "label": "GET /robots.txt",
                  "finding": {
                    "outcome": "positive",
                    "summary": "Found valid robots.txt"
                  },
                  "request": {
                    "method": "GET",
                    "url": "https://example.com/robots.txt",
                    "headers": {}
                  },
                  "response": {
                    "status": 200,
                    "statusText": "OK",
                    "bodyPreview": "bodyPreview",
                    "bodySize": 0,
                    "headers": {},
                    "redirectedTo": "redirectedTo"
                  }
                }
              ],
              "message": "message"
            }
          },
          "contentAccessibility": {
            "markdownNegotiation": {
              "status": "fail",
              "details": {},
              "durationMs": 0,
              "evidence": [
                {
                  "action": "fetch",
                  "label": "GET /robots.txt",
                  "finding": {
                    "outcome": "positive",
                    "summary": "Found valid robots.txt"
                  },
                  "request": {
                    "method": "GET",
                    "url": "https://example.com/robots.txt",
                    "headers": {}
                  },
                  "response": {
                    "status": 200,
                    "statusText": "OK",
                    "bodyPreview": "bodyPreview",
                    "bodySize": 0,
                    "headers": {},
                    "redirectedTo": "redirectedTo"
                  }
                }
              ],
              "message": "message"
            }
          },
          "discoverability": {
            "linkHeaders": {
              "status": "fail",
              "details": {},
              "durationMs": 0,
              "evidence": [
                {
                  "action": "fetch",
                  "label": "GET /robots.txt",
                  "finding": {
                    "outcome": "positive",
                    "summary": "Found valid robots.txt"
                  },
                  "request": {
                    "method": "GET",
                    "url": "https://example.com/robots.txt",
                    "headers": {}
                  },
                  "response": {
                    "status": 200,
                    "statusText": "OK",
                    "bodyPreview": "bodyPreview",
                    "bodySize": 0,
                    "headers": {},
                    "redirectedTo": "redirectedTo"
                  }
                }
              ],
              "message": "message"
            },
            "robotsTxt": {
              "status": "pass",
              "details": {},
              "durationMs": 0,
              "evidence": [
                {
                  "action": "fetch",
                  "label": "GET /robots.txt",
                  "finding": {
                    "outcome": "positive",
                    "summary": "Found valid robots.txt"
                  },
                  "request": {
                    "method": "GET",
                    "url": "https://example.com/robots.txt",
                    "headers": {}
                  },
                  "response": {
                    "status": 200,
                    "statusText": "OK",
                    "bodyPreview": "bodyPreview",
                    "bodySize": 0,
                    "headers": {},
                    "redirectedTo": "redirectedTo"
                  }
                }
              ],
              "message": "message"
            },
            "sitemap": {
              "status": "pass",
              "details": {},
              "durationMs": 0,
              "evidence": [
                {
                  "action": "fetch",
                  "label": "GET /robots.txt",
                  "finding": {
                    "outcome": "positive",
                    "summary": "Found valid robots.txt"
                  },
                  "request": {
                    "method": "GET",
                    "url": "https://example.com/robots.txt",
                    "headers": {}
                  },
                  "response": {
                    "status": 200,
                    "statusText": "OK",
                    "bodyPreview": "bodyPreview",
                    "bodySize": 0,
                    "headers": {},
                    "redirectedTo": "redirectedTo"
                  }
                }
              ],
              "message": "message"
            }
          },
          "discovery": {
            "a2aAgentCard": {
              "status": "fail",
              "details": {},
              "durationMs": 0,
              "evidence": [
                {
                  "action": "fetch",
                  "label": "GET /robots.txt",
                  "finding": {
                    "outcome": "positive",
                    "summary": "Found valid robots.txt"
                  },
                  "request": {
                    "method": "GET",
                    "url": "https://example.com/robots.txt",
                    "headers": {}
                  },
                  "response": {
                    "status": 200,
                    "statusText": "OK",
                    "bodyPreview": "bodyPreview",
                    "bodySize": 0,
                    "headers": {},
                    "redirectedTo": "redirectedTo"
                  }
                }
              ],
              "message": "message"
            },
            "agentSkills": {
              "status": "fail",
              "details": {},
              "durationMs": 0,
              "evidence": [
                {
                  "action": "fetch",
                  "label": "GET /robots.txt",
                  "finding": {
                    "outcome": "positive",
                    "summary": "Found valid robots.txt"
                  },
                  "request": {
                    "method": "GET",
                    "url": "https://example.com/robots.txt",
                    "headers": {}
                  },
                  "response": {
                    "status": 200,
                    "statusText": "OK",
                    "bodyPreview": "bodyPreview",
                    "bodySize": 0,
                    "headers": {},
                    "redirectedTo": "redirectedTo"
                  }
                }
              ],
              "message": "message"
            },
            "apiCatalog": {
              "status": "fail",
              "details": {},
              "durationMs": 0,
              "evidence": [
                {
                  "action": "fetch",
                  "label": "GET /robots.txt",
                  "finding": {
                    "outcome": "positive",
                    "summary": "Found valid robots.txt"
                  },
                  "request": {
                    "method": "GET",
                    "url": "https://example.com/robots.txt",
                    "headers": {}
                  },
                  "response": {
                    "status": 200,
                    "statusText": "OK",
                    "bodyPreview": "bodyPreview",
                    "bodySize": 0,
                    "headers": {},
                    "redirectedTo": "redirectedTo"
                  }
                }
              ],
              "message": "message"
            },
            "mcpServerCard": {
              "status": "fail",
              "details": {},
              "durationMs": 0,
              "evidence": [
                {
                  "action": "fetch",
                  "label": "GET /robots.txt",
                  "finding": {
                    "outcome": "positive",
                    "summary": "Found valid robots.txt"
                  },
                  "request": {
                    "method": "GET",
                    "url": "https://example.com/robots.txt",
                    "headers": {}
                  },
                  "response": {
                    "status": 200,
                    "statusText": "OK",
                    "bodyPreview": "bodyPreview",
                    "bodySize": 0,
                    "headers": {},
                    "redirectedTo": "redirectedTo"
                  }
                }
              ],
              "message": "message"
            },
            "oauthDiscovery": {
              "status": "fail",
              "details": {},
              "durationMs": 0,
              "evidence": [
                {
                  "action": "fetch",
                  "label": "GET /robots.txt",
                  "finding": {
                    "outcome": "positive",
                    "summary": "Found valid robots.txt"
                  },
                  "request": {
                    "method": "GET",
                    "url": "https://example.com/robots.txt",
                    "headers": {}
                  },
                  "response": {
                    "status": 200,
                    "statusText": "OK",
                    "bodyPreview": "bodyPreview",
                    "bodySize": 0,
                    "headers": {},
                    "redirectedTo": "redirectedTo"
                  }
                }
              ],
              "message": "message"
            },
            "oauthProtectedResource": {
              "status": "fail",
              "details": {},
              "durationMs": 0,
              "evidence": [
                {
                  "action": "fetch",
                  "label": "GET /robots.txt",
                  "finding": {
                    "outcome": "positive",
                    "summary": "Found valid robots.txt"
                  },
                  "request": {
                    "method": "GET",
                    "url": "https://example.com/robots.txt",
                    "headers": {}
                  },
                  "response": {
                    "status": 200,
                    "statusText": "OK",
                    "bodyPreview": "bodyPreview",
                    "bodySize": 0,
                    "headers": {},
                    "redirectedTo": "redirectedTo"
                  }
                }
              ],
              "message": "message"
            },
            "webMcp": {
              "status": "neutral",
              "details": {},
              "durationMs": 0,
              "evidence": [
                {
                  "action": "fetch",
                  "label": "GET /robots.txt",
                  "finding": {
                    "outcome": "positive",
                    "summary": "Found valid robots.txt"
                  },
                  "request": {
                    "method": "GET",
                    "url": "https://example.com/robots.txt",
                    "headers": {}
                  },
                  "response": {
                    "status": 200,
                    "statusText": "OK",
                    "bodyPreview": "bodyPreview",
                    "bodySize": 0,
                    "headers": {},
                    "redirectedTo": "redirectedTo"
                  }
                }
              ],
              "message": "message"
            }
          }
        },
        "level": 2,
        "levelName": "Bot-Aware",
        "commerceSignals": [
          "string"
        ],
        "isCommerce": true,
        "nextLevel": {
          "name": "Agent-Readable",
          "requirements": [
            {
              "check": "markdownNegotiation",
              "description": "Support content negotiation with Accept: text/markdown",
              "prompt": "Add markdown content negotiation support",
              "skillUrl": "https://agentready.cloudflare.com/.well-known/skills/markdown-negotiation",
              "specUrls": [
                "https://markdownforagents.org"
              ]
            }
          ],
          "target": 3
        }
      },
      "phishing_v2": {
        "data": [
          "string"
        ]
      },
      "robotsTxt": {
        "data": [
          {
            "rules": {
              "*": {
                "allow": [
                  "string"
                ],
                "disallow": [
                  "string"
                ],
                "contentSignal": {
                  "ai-input": "no",
                  "ai-train": "yes",
                  "search": "yes"
                },
                "crawlDelay": 0
              }
            },
            "sitemaps": [
              "string"
            ],
            "hash": "hash"
          }
        ]
      },
      "urlCategories": {
        "data": [
          {
            "content": [
              {
                "id": 0,
                "name": "name",
                "super_category_id": 0
              }
            ],
            "inherited": {
              "content": [
                {
                  "id": 0,
                  "name": "name",
                  "super_category_id": 0
                }
              ],
              "from": "from",
              "risks": [
                {
                  "id": 0,
                  "name": "name",
                  "super_category_id": 0
                }
              ]
            },
            "name": "name",
            "risks": [
              {
                "id": 0,
                "name": "name",
                "super_category_id": 0
              }
            ]
          }
        ]
      }
    }
  },
  "page": {
    "apexDomain": "apexDomain",
    "asn": "asn",
    "asnname": "asnname",
    "city": "city",
    "country": "country",
    "domain": "domain",
    "ip": "ip",
    "mimeType": "mimeType",
    "server": "server",
    "status": "200",
    "title": "title",
    "tlsAgeDays": 0,
    "tlsIssuer": "tlsIssuer",
    "tlsValidDays": 0,
    "tlsValidFrom": "tlsValidFrom",
    "url": "url",
    "screenshot": {
      "dhash": "dhash",
      "mm3Hash": 0,
      "name": "name",
      "phash": "phash"
    }
  },
  "scanner": {
    "colo": "colo",
    "country": "country"
  },
  "stats": {
    "domainStats": [
      {
        "count": 0,
        "countries": [
          "string"
        ],
        "domain": "domain",
        "encodedSize": 0,
        "index": 0,
        "initiators": [
          "string"
        ],
        "ips": [
          "string"
        ],
        "redirects": 0,
        "size": 0
      }
    ],
    "ipStats": [
      {
        "asn": {
          "asn": "asn",
          "country": "country",
          "description": "description",
          "ip": "ip",
          "name": "name",
          "org": "org"
        },
        "countries": [
          "string"
        ],
        "domains": [
          "string"
        ],
        "encodedSize": 0,
        "geoip": {
          "city": "city",
          "country": "country",
          "country_name": "country_name",
          "ll": [
            0
          ],
          "region": "region"
        },
        "index": 0,
        "ip": "ip",
        "ipv6": true,
        "redirects": 0,
        "requests": 0,
        "size": 0,
        "count": 0
      }
    ],
    "IPv6Percentage": 0,
    "malicious": 0,
    "protocolStats": [
      {
        "count": 0,
        "countries": [
          "string"
        ],
        "encodedSize": 0,
        "ips": [
          "string"
        ],
        "protocol": "protocol",
        "size": 0
      }
    ],
    "resourceStats": [
      {
        "compression": 0,
        "count": 0,
        "countries": [
          "string"
        ],
        "encodedSize": 0,
        "ips": [
          "string"
        ],
        "percentage": 0,
        "size": 0,
        "type": "type"
      }
    ],
    "securePercentage": 0,
    "secureRequests": 0,
    "serverStats": [
      {
        "count": 0,
        "countries": [
          "string"
        ],
        "encodedSize": 0,
        "ips": [
          "string"
        ],
        "server": "server",
        "size": 0
      }
    ],
    "tlsStats": [
      {
        "count": 0,
        "countries": [
          "string"
        ],
        "encodedSize": 0,
        "ips": [
          "string"
        ],
        "protocols": {
          "TLS 1.3 / AES_128_GCM": 0
        },
        "securityState": "securityState",
        "size": 0
      }
    ],
    "totalLinks": 0,
    "uniqASNs": 0,
    "uniqCountries": 0
  },
  "task": {
    "apexDomain": "apexDomain",
    "domain": "domain",
    "domURL": "domURL",
    "method": "method",
    "options": {
      "customHeaders": {},
      "screenshotsResolutions": [
        "string"
      ]
    },
    "reportURL": "reportURL",
    "screenshotURL": "screenshotURL",
    "source": "source",
    "success": true,
    "time": "time",
    "url": "url",
    "uuid": "uuid",
    "visibility": "visibility"
  },
  "verdicts": {
    "overall": {
      "categories": [
        "string"
      ],
      "hasVerdicts": true,
      "malicious": true,
      "tags": [
        "string"
      ]
    }
  }
}
```

## Create URL Scan

**post** `/accounts/{account_id}/urlscanner/v2/scan`

Submit a URL to scan. Check limits at https://developers.cloudflare.com/security-center/investigate/scan-limits/.

### Path Parameters

- `account_id: string`

  Account ID.

### Body Parameters

- `url: string`

- `agentReadiness: optional boolean`

  Enable agent readiness checks.

- `country: optional "AF" or "AL" or "DZ" or 192 more`

  Country to geo egress from

  - `"AF"`

  - `"AL"`

  - `"DZ"`

  - `"AD"`

  - `"AO"`

  - `"AG"`

  - `"AR"`

  - `"AM"`

  - `"AU"`

  - `"AT"`

  - `"AZ"`

  - `"BH"`

  - `"BD"`

  - `"BB"`

  - `"BY"`

  - `"BE"`

  - `"BZ"`

  - `"BJ"`

  - `"BM"`

  - `"BT"`

  - `"BO"`

  - `"BA"`

  - `"BW"`

  - `"BR"`

  - `"BN"`

  - `"BG"`

  - `"BF"`

  - `"BI"`

  - `"KH"`

  - `"CM"`

  - `"CA"`

  - `"CV"`

  - `"KY"`

  - `"CF"`

  - `"TD"`

  - `"CL"`

  - `"CN"`

  - `"CO"`

  - `"KM"`

  - `"CG"`

  - `"CR"`

  - `"CI"`

  - `"HR"`

  - `"CU"`

  - `"CY"`

  - `"CZ"`

  - `"CD"`

  - `"DK"`

  - `"DJ"`

  - `"DM"`

  - `"DO"`

  - `"EC"`

  - `"EG"`

  - `"SV"`

  - `"GQ"`

  - `"ER"`

  - `"EE"`

  - `"SZ"`

  - `"ET"`

  - `"FJ"`

  - `"FI"`

  - `"FR"`

  - `"GA"`

  - `"GE"`

  - `"DE"`

  - `"GH"`

  - `"GR"`

  - `"GL"`

  - `"GD"`

  - `"GT"`

  - `"GN"`

  - `"GW"`

  - `"GY"`

  - `"HT"`

  - `"HN"`

  - `"HU"`

  - `"IS"`

  - `"IN"`

  - `"ID"`

  - `"IR"`

  - `"IQ"`

  - `"IE"`

  - `"IL"`

  - `"IT"`

  - `"JM"`

  - `"JP"`

  - `"JO"`

  - `"KZ"`

  - `"KE"`

  - `"KI"`

  - `"KW"`

  - `"KG"`

  - `"LA"`

  - `"LV"`

  - `"LB"`

  - `"LS"`

  - `"LR"`

  - `"LY"`

  - `"LI"`

  - `"LT"`

  - `"LU"`

  - `"MO"`

  - `"MG"`

  - `"MW"`

  - `"MY"`

  - `"MV"`

  - `"ML"`

  - `"MR"`

  - `"MU"`

  - `"MX"`

  - `"FM"`

  - `"MD"`

  - `"MC"`

  - `"MN"`

  - `"MS"`

  - `"MA"`

  - `"MZ"`

  - `"MM"`

  - `"NA"`

  - `"NR"`

  - `"NP"`

  - `"NL"`

  - `"NZ"`

  - `"NI"`

  - `"NE"`

  - `"NG"`

  - `"KP"`

  - `"MK"`

  - `"NO"`

  - `"OM"`

  - `"PK"`

  - `"PS"`

  - `"PA"`

  - `"PG"`

  - `"PY"`

  - `"PE"`

  - `"PH"`

  - `"PL"`

  - `"PT"`

  - `"QA"`

  - `"RO"`

  - `"RU"`

  - `"RW"`

  - `"SH"`

  - `"KN"`

  - `"LC"`

  - `"VC"`

  - `"WS"`

  - `"SM"`

  - `"ST"`

  - `"SA"`

  - `"SN"`

  - `"RS"`

  - `"SC"`

  - `"SL"`

  - `"SK"`

  - `"SI"`

  - `"SB"`

  - `"SO"`

  - `"ZA"`

  - `"KR"`

  - `"SS"`

  - `"ES"`

  - `"LK"`

  - `"SD"`

  - `"SR"`

  - `"SE"`

  - `"CH"`

  - `"SY"`

  - `"TW"`

  - `"TJ"`

  - `"TZ"`

  - `"TH"`

  - `"BS"`

  - `"GM"`

  - `"TL"`

  - `"TG"`

  - `"TO"`

  - `"TT"`

  - `"TN"`

  - `"TR"`

  - `"TM"`

  - `"UG"`

  - `"UA"`

  - `"AE"`

  - `"GB"`

  - `"US"`

  - `"UY"`

  - `"UZ"`

  - `"VU"`

  - `"VE"`

  - `"VN"`

  - `"YE"`

  - `"ZM"`

  - `"ZW"`

- `customagent: optional string`

- `customHeaders: optional map[string]`

  Set custom headers.

- `referer: optional string`

- `screenshotsResolutions: optional array of "desktop" or "mobile" or "tablet"`

  Take multiple screenshots targeting different device types.

  - `"desktop"`

  - `"mobile"`

  - `"tablet"`

- `visibility: optional "Public" or "Unlisted"`

  The option `Public` means it will be included in listings like recent scans and search results. `Unlisted` means it will not be included in the aforementioned listings, users will need to have the scan's ID to access it. A a scan will be automatically marked as unlisted if it fails, if it contains potential PII or other sensitive material.

  - `"Public"`

  - `"Unlisted"`

### Returns

- `api: string`

  URL to api report.

- `message: string`

- `result: string`

  Public URL to report.

- `url: string`

  Canonical form of submitted URL. Use this if you want to later search by URL.

- `uuid: string`

  Scan ID.

- `visibility: "public" or "unlisted"`

  Submitted visibility status.

  - `"public"`

  - `"unlisted"`

- `options: optional object { useragent }`

  - `useragent: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/urlscanner/v2/scan \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "url": "https://www.example.com"
        }'
```

#### Response

```json
{
  "api": "api",
  "message": "Submission successful",
  "result": "result",
  "url": "url",
  "uuid": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
  "visibility": "public",
  "options": {
    "useragent": "useragent"
  }
}
```

## Bulk create URL Scans

**post** `/accounts/{account_id}/urlscanner/v2/bulk`

Submit URLs to scan. Check limits at https://developers.cloudflare.com/security-center/investigate/scan-limits/ and take into account scans submitted in bulk have lower priority and may take longer to finish.

### Path Parameters

- `account_id: string`

  Account ID.

### Body Parameters

- `body: optional array of object { url, agentReadiness, customagent, 4 more }`

  List of urls to scan (up to a 100).

  - `url: string`

  - `agentReadiness: optional boolean`

    Enable agent readiness checks.

  - `customagent: optional string`

  - `customHeaders: optional map[string]`

    Set custom headers.

  - `referer: optional string`

  - `screenshotsResolutions: optional array of "desktop" or "mobile" or "tablet"`

    Take multiple screenshots targeting different device types.

    - `"desktop"`

    - `"mobile"`

    - `"tablet"`

  - `visibility: optional "Public" or "Unlisted"`

    The option `Public` means it will be included in listings like recent scans and search results. `Unlisted` means it will not be included in the aforementioned listings, users will need to have the scan's ID to access it. A a scan will be automatically marked as unlisted if it fails, if it contains potential PII or other sensitive material.

    - `"Public"`

    - `"Unlisted"`

### Returns

- `api: string`

  URL to api report.

- `result: string`

  URL to report.

- `url: string`

  Submitted URL

- `uuid: string`

  Scan ID.

- `visibility: "public" or "unlisted"`

  Submitted visibility status.

  - `"public"`

  - `"unlisted"`

- `options: optional object { useragent }`

  - `useragent: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/urlscanner/v2/bulk \
    -X POST \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
[
  {
    "api": "api",
    "result": "result",
    "url": "url",
    "uuid": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "visibility": "public",
    "options": {
      "useragent": "useragent"
    }
  }
]
```

## Get URL scan's HAR

**get** `/accounts/{account_id}/urlscanner/v2/har/{scan_id}`

Get a URL scan's HAR file. See HAR spec at http://www.softwareishard.com/blog/har-12-spec/.

### Path Parameters

- `account_id: string`

  Account ID.

- `scan_id: string`

  Scan UUID.

### Returns

- `log: object { creator, entries, pages, version }`

  - `creator: object { comment, name, version }`

    - `comment: string`

    - `name: string`

    - `version: string`

  - `entries: array of object { _initialPriority, _initiator_type, _priority, 11 more }`

    - `_initialPriority: string`

    - `_initiator_type: string`

    - `_priority: string`

    - `_requestId: string`

    - `_requestTime: number`

    - `_resourceType: string`

    - `cache: unknown`

    - `connection: string`

    - `pageref: string`

    - `request: object { bodySize, headers, headersSize, 3 more }`

      - `bodySize: number`

      - `headers: array of object { name, value }`

        - `name: string`

        - `value: string`

      - `headersSize: number`

      - `httpVersion: string`

      - `method: string`

      - `url: string`

    - `response: object { _transferSize, bodySize, content, 6 more }`

      - `_transferSize: number`

      - `bodySize: number`

      - `content: object { mimeType, size, compression }`

        - `mimeType: string`

        - `size: number`

        - `compression: optional number`

      - `headers: array of object { name, value }`

        - `name: string`

        - `value: string`

      - `headersSize: number`

      - `httpVersion: string`

      - `redirectURL: string`

      - `status: number`

      - `statusText: string`

    - `serverIPAddress: string`

    - `startedDateTime: string`

    - `time: number`

  - `pages: array of object { id, pageTimings, startedDateTime, title }`

    - `id: string`

    - `pageTimings: object { onContentLoad, onLoad }`

      - `onContentLoad: number`

      - `onLoad: number`

    - `startedDateTime: string`

    - `title: string`

  - `version: string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/urlscanner/v2/har/$SCAN_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "log": {
    "creator": {
      "comment": "https://github.com/sitespeedio/chrome-har",
      "name": "chrome-har",
      "version": "0.13.1"
    },
    "entries": [
      {
        "_initialPriority": "VeryHigh",
        "_initiator_type": "other",
        "_priority": "VeryHigh",
        "_requestId": "DDC779F0CB3746BAF283EC1A51B0F2F8",
        "_requestTime": 114135.331081,
        "_resourceType": "document",
        "cache": {},
        "connection": "33",
        "pageref": "page_1",
        "request": {
          "bodySize": 0,
          "headers": [
            {
              "name": "Upgrade-Insecure-Requests",
              "value": "1"
            }
          ],
          "headersSize": 197,
          "httpVersion": "http/1.1",
          "method": "GET",
          "url": "http://example.com/"
        },
        "response": {
          "_transferSize": 1071,
          "bodySize": 648,
          "content": {
            "mimeType": "text/html",
            "size": 1256,
            "compression": 608
          },
          "headers": [
            {
              "name": "Content-Encoding",
              "value": "gzip"
            }
          ],
          "headersSize": 423,
          "httpVersion": "http/1.1",
          "redirectURL": "redirectURL",
          "status": 200,
          "statusText": "OK"
        },
        "serverIPAddress": "2606:2800:220:1:248:1893:25c8:1946",
        "startedDateTime": "2023-05-03T17:05:13.196Z",
        "time": 268.64
      }
    ],
    "pages": [
      {
        "id": "page_1",
        "pageTimings": {
          "onContentLoad": 305.408,
          "onLoad": 305.169
        },
        "startedDateTime": "2023-05-03T17:05:13.195Z",
        "title": "http://example.com/"
      }
    ],
    "version": "1.2"
  }
}
```

## Get screenshot

**get** `/accounts/{account_id}/urlscanner/v2/screenshots/{scan_id}.png`

Get scan's screenshot by resolution (desktop/mobile/tablet).

### Path Parameters

- `account_id: string`

  Account ID.

- `scan_id: string`

  Scan UUID.

### Query Parameters

- `resolution: optional "desktop" or "mobile" or "tablet"`

  Target device type.

  - `"desktop"`

  - `"mobile"`

  - `"tablet"`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/urlscanner/v2/screenshots/$SCAN_ID.png \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

## Get URL scan's DOM

**get** `/accounts/{account_id}/urlscanner/v2/dom/{scan_id}`

Returns a plain text response, with the scan's DOM content as rendered by Chrome.

### Path Parameters

- `account_id: string`

  Account ID.

- `scan_id: string`

  Scan UUID.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/urlscanner/v2/dom/$SCAN_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

## Domain Types

### Scan List Response

- `ScanListResponse object { results }`

  - `results: array of object { _id, page, result, 3 more }`

    - `_id: string`

    - `page: object { asn, country, ip, url }`

      - `asn: string`

      - `country: string`

      - `ip: string`

      - `url: string`

    - `result: string`

    - `stats: object { dataLength, requests, uniqCountries, uniqIPs }`

      - `dataLength: number`

      - `requests: number`

      - `uniqCountries: number`

      - `uniqIPs: number`

    - `task: object { time, url, uuid, visibility }`

      - `time: string`

      - `url: string`

      - `uuid: string`

      - `visibility: string`

    - `verdicts: object { malicious }`

      - `malicious: boolean`

### Scan Get Response

- `ScanGetResponse object { data, lists, meta, 5 more }`

  - `data: object { console, cookies, globals, 3 more }`

    - `console: array of object { message }`

      - `message: object { level, source, text, url }`

        - `level: string`

        - `source: string`

        - `text: string`

        - `url: string`

    - `cookies: array of object { domain, expires, httpOnly, 10 more }`

      - `domain: string`

      - `expires: number`

      - `httpOnly: boolean`

      - `name: string`

      - `path: string`

      - `priority: string`

      - `sameParty: boolean`

      - `secure: boolean`

      - `session: boolean`

      - `size: number`

      - `sourcePort: number`

      - `sourceScheme: string`

      - `value: string`

    - `globals: array of object { prop, type }`

      - `prop: string`

      - `type: string`

    - `links: array of object { href, text }`

      - `href: string`

      - `text: string`

    - `performance: array of object { duration, entryType, name, startTime }`

      - `duration: number`

      - `entryType: string`

      - `name: string`

      - `startTime: number`

    - `requests: array of object { request, response, requests }`

      - `request: object { documentURL, hasUserGesture, initiator, 9 more }`

        - `documentURL: string`

        - `hasUserGesture: boolean`

        - `initiator: object { host, type, url }`

          - `host: string`

          - `type: string`

          - `url: string`

        - `redirectHasExtraInfo: boolean`

        - `request: object { initialPriority, isSameSite, method, 4 more }`

          - `initialPriority: string`

          - `isSameSite: boolean`

          - `method: string`

          - `mixedContentType: string`

          - `referrerPolicy: string`

          - `url: string`

          - `headers: optional unknown`

        - `requestId: string`

        - `type: string`

        - `wallTime: number`

        - `frameId: optional string`

        - `loaderId: optional string`

        - `primaryRequest: optional boolean`

        - `redirectResponse: optional object { charset, mimeType, protocol, 8 more }`

          - `charset: string`

          - `mimeType: string`

          - `protocol: string`

          - `remoteIPAddress: string`

          - `remotePort: number`

          - `securityHeaders: array of object { name, value }`

            - `name: string`

            - `value: string`

          - `securityState: string`

          - `status: number`

          - `statusText: string`

          - `url: string`

          - `headers: optional unknown`

      - `response: object { asn, dataLength, encodedDataLength, 8 more }`

        - `asn: object { asn, country, description, 3 more }`

          - `asn: string`

          - `country: string`

          - `description: string`

          - `ip: string`

          - `name: string`

          - `org: string`

        - `dataLength: number`

        - `encodedDataLength: number`

        - `geoip: object { city, country, country_name, 3 more }`

          - `city: string`

          - `country: string`

          - `country_name: string`

          - `geonameId: string`

          - `ll: array of number`

          - `region: string`

        - `hasExtraInfo: boolean`

        - `requestId: string`

        - `response: object { charset, mimeType, protocol, 9 more }`

          - `charset: string`

          - `mimeType: string`

          - `protocol: string`

          - `remoteIPAddress: string`

          - `remotePort: number`

          - `securityDetails: object { certificateId, certificateTransparencyCompliance, cipher, 10 more }`

            - `certificateId: number`

            - `certificateTransparencyCompliance: string`

            - `cipher: string`

            - `encryptedClientHello: boolean`

            - `issuer: string`

            - `keyExchange: string`

            - `keyExchangeGroup: string`

            - `protocol: string`

            - `sanList: array of string`

            - `serverSignatureAlgorithm: number`

            - `subjectName: string`

            - `validFrom: number`

            - `validTo: number`

          - `securityHeaders: array of object { name, value }`

            - `name: string`

            - `value: string`

          - `securityState: string`

          - `status: number`

          - `statusText: string`

          - `url: string`

          - `headers: optional unknown`

        - `size: number`

        - `type: string`

        - `contentAvailable: optional boolean`

        - `hash: optional string`

      - `requests: optional array of object { documentURL, frameId, hasUserGesture, 7 more }`

        - `documentURL: string`

        - `frameId: string`

        - `hasUserGesture: boolean`

        - `initiator: object { type }`

          - `type: string`

        - `loaderId: string`

        - `redirectHasExtraInfo: boolean`

        - `request: object { headers, initialPriority, isSameSite, 4 more }`

          - `headers: object { name }`

            - `name: string`

          - `initialPriority: string`

          - `isSameSite: boolean`

          - `method: string`

          - `mixedContentType: string`

          - `referrerPolicy: string`

          - `url: string`

        - `requestId: string`

        - `type: string`

        - `wallTime: number`

  - `lists: object { asns, certificates, continents, 7 more }`

    - `asns: array of string`

    - `certificates: array of object { issuer, subjectName, validFrom, validTo }`

      - `issuer: string`

      - `subjectName: string`

      - `validFrom: number`

      - `validTo: number`

    - `continents: array of string`

    - `countries: array of string`

    - `domains: array of string`

    - `hashes: array of string`

    - `ips: array of string`

    - `linkDomains: array of string`

    - `servers: array of string`

    - `urls: array of string`

  - `meta: object { processors }`

    - `processors: object { asn, dns, domainCategories, 8 more }`

      - `asn: object { data }`

        - `data: array of object { asn, country, description, 2 more }`

          - `asn: string`

          - `country: string`

          - `description: string`

          - `ip: string`

          - `name: string`

      - `dns: object { data }`

        - `data: array of object { address, dnssec_valid, name, type }`

          - `address: string`

          - `dnssec_valid: boolean`

          - `name: string`

          - `type: string`

      - `domainCategories: object { data }`

        - `data: array of object { inherited, isPrimary, name }`

          - `inherited: unknown`

          - `isPrimary: boolean`

          - `name: string`

      - `geoip: object { data }`

        - `data: array of object { geoip, ip }`

          - `geoip: object { city, country, country_name, 2 more }`

            - `city: string`

            - `country: string`

            - `country_name: string`

            - `ll: array of number`

            - `region: string`

          - `ip: string`

      - `phishing: object { data }`

        - `data: array of string`

      - `radarRank: object { data }`

        - `data: array of object { bucket, hostname, rank }`

          - `bucket: string`

          - `hostname: string`

          - `rank: optional number`

      - `wappa: object { data }`

        - `data: array of object { app, categories, confidence, 3 more }`

          - `app: string`

          - `categories: array of object { name, priority }`

            - `name: string`

            - `priority: number`

          - `confidence: array of object { confidence, name, pattern, patternType }`

            - `confidence: number`

            - `name: string`

            - `pattern: string`

            - `patternType: string`

          - `confidenceTotal: number`

          - `icon: string`

          - `website: string`

      - `agentReadiness: optional object { checks, level, levelName, 3 more }`

        - `checks: object { botAccessControl, commerce, contentAccessibility, 2 more }`

          - `botAccessControl: object { contentSignals, robotsTxtAiRules, webBotAuth }`

            - `contentSignals: object { status, details, durationMs, 2 more }`

              - `status: string`

              - `details: optional unknown`

              - `durationMs: optional number`

              - `evidence: optional array of object { action, label, finding, 2 more }`

                - `action: string`

                - `label: string`

                - `finding: optional object { outcome, summary }`

                  - `outcome: string`

                  - `summary: string`

                - `request: optional object { method, url, headers }`

                  - `method: string`

                  - `url: string`

                  - `headers: optional unknown`

                - `response: optional object { status, statusText, bodyPreview, 3 more }`

                  - `status: number`

                  - `statusText: string`

                  - `bodyPreview: optional string`

                  - `bodySize: optional number`

                  - `headers: optional unknown`

                  - `redirectedTo: optional string`

              - `message: optional string`

            - `robotsTxtAiRules: object { status, details, durationMs, 2 more }`

              - `status: string`

              - `details: optional unknown`

              - `durationMs: optional number`

              - `evidence: optional array of object { action, label, finding, 2 more }`

                - `action: string`

                - `label: string`

                - `finding: optional object { outcome, summary }`

                  - `outcome: string`

                  - `summary: string`

                - `request: optional object { method, url, headers }`

                  - `method: string`

                  - `url: string`

                  - `headers: optional unknown`

                - `response: optional object { status, statusText, bodyPreview, 3 more }`

                  - `status: number`

                  - `statusText: string`

                  - `bodyPreview: optional string`

                  - `bodySize: optional number`

                  - `headers: optional unknown`

                  - `redirectedTo: optional string`

              - `message: optional string`

            - `webBotAuth: object { status, details, durationMs, 2 more }`

              - `status: string`

              - `details: optional unknown`

              - `durationMs: optional number`

              - `evidence: optional array of object { action, label, finding, 2 more }`

                - `action: string`

                - `label: string`

                - `finding: optional object { outcome, summary }`

                  - `outcome: string`

                  - `summary: string`

                - `request: optional object { method, url, headers }`

                  - `method: string`

                  - `url: string`

                  - `headers: optional unknown`

                - `response: optional object { status, statusText, bodyPreview, 3 more }`

                  - `status: number`

                  - `statusText: string`

                  - `bodyPreview: optional string`

                  - `bodySize: optional number`

                  - `headers: optional unknown`

                  - `redirectedTo: optional string`

              - `message: optional string`

          - `commerce: object { acp, ap2, mpp, 2 more }`

            - `acp: object { status, details, durationMs, 2 more }`

              - `status: string`

              - `details: optional unknown`

              - `durationMs: optional number`

              - `evidence: optional array of object { action, label, finding, 2 more }`

                - `action: string`

                - `label: string`

                - `finding: optional object { outcome, summary }`

                  - `outcome: string`

                  - `summary: string`

                - `request: optional object { method, url, headers }`

                  - `method: string`

                  - `url: string`

                  - `headers: optional unknown`

                - `response: optional object { status, statusText, bodyPreview, 3 more }`

                  - `status: number`

                  - `statusText: string`

                  - `bodyPreview: optional string`

                  - `bodySize: optional number`

                  - `headers: optional unknown`

                  - `redirectedTo: optional string`

              - `message: optional string`

            - `ap2: object { status, details, durationMs, 2 more }`

              - `status: string`

              - `details: optional unknown`

              - `durationMs: optional number`

              - `evidence: optional array of object { action, label, finding, 2 more }`

                - `action: string`

                - `label: string`

                - `finding: optional object { outcome, summary }`

                  - `outcome: string`

                  - `summary: string`

                - `request: optional object { method, url, headers }`

                  - `method: string`

                  - `url: string`

                  - `headers: optional unknown`

                - `response: optional object { status, statusText, bodyPreview, 3 more }`

                  - `status: number`

                  - `statusText: string`

                  - `bodyPreview: optional string`

                  - `bodySize: optional number`

                  - `headers: optional unknown`

                  - `redirectedTo: optional string`

              - `message: optional string`

            - `mpp: object { status, details, durationMs, 2 more }`

              - `status: string`

              - `details: optional unknown`

              - `durationMs: optional number`

              - `evidence: optional array of object { action, label, finding, 2 more }`

                - `action: string`

                - `label: string`

                - `finding: optional object { outcome, summary }`

                  - `outcome: string`

                  - `summary: string`

                - `request: optional object { method, url, headers }`

                  - `method: string`

                  - `url: string`

                  - `headers: optional unknown`

                - `response: optional object { status, statusText, bodyPreview, 3 more }`

                  - `status: number`

                  - `statusText: string`

                  - `bodyPreview: optional string`

                  - `bodySize: optional number`

                  - `headers: optional unknown`

                  - `redirectedTo: optional string`

              - `message: optional string`

            - `ucp: object { status, details, durationMs, 2 more }`

              - `status: string`

              - `details: optional unknown`

              - `durationMs: optional number`

              - `evidence: optional array of object { action, label, finding, 2 more }`

                - `action: string`

                - `label: string`

                - `finding: optional object { outcome, summary }`

                  - `outcome: string`

                  - `summary: string`

                - `request: optional object { method, url, headers }`

                  - `method: string`

                  - `url: string`

                  - `headers: optional unknown`

                - `response: optional object { status, statusText, bodyPreview, 3 more }`

                  - `status: number`

                  - `statusText: string`

                  - `bodyPreview: optional string`

                  - `bodySize: optional number`

                  - `headers: optional unknown`

                  - `redirectedTo: optional string`

              - `message: optional string`

            - `x402: object { status, details, durationMs, 2 more }`

              - `status: string`

              - `details: optional unknown`

              - `durationMs: optional number`

              - `evidence: optional array of object { action, label, finding, 2 more }`

                - `action: string`

                - `label: string`

                - `finding: optional object { outcome, summary }`

                  - `outcome: string`

                  - `summary: string`

                - `request: optional object { method, url, headers }`

                  - `method: string`

                  - `url: string`

                  - `headers: optional unknown`

                - `response: optional object { status, statusText, bodyPreview, 3 more }`

                  - `status: number`

                  - `statusText: string`

                  - `bodyPreview: optional string`

                  - `bodySize: optional number`

                  - `headers: optional unknown`

                  - `redirectedTo: optional string`

              - `message: optional string`

          - `contentAccessibility: object { markdownNegotiation }`

            - `markdownNegotiation: object { status, details, durationMs, 2 more }`

              - `status: string`

              - `details: optional unknown`

              - `durationMs: optional number`

              - `evidence: optional array of object { action, label, finding, 2 more }`

                - `action: string`

                - `label: string`

                - `finding: optional object { outcome, summary }`

                  - `outcome: string`

                  - `summary: string`

                - `request: optional object { method, url, headers }`

                  - `method: string`

                  - `url: string`

                  - `headers: optional unknown`

                - `response: optional object { status, statusText, bodyPreview, 3 more }`

                  - `status: number`

                  - `statusText: string`

                  - `bodyPreview: optional string`

                  - `bodySize: optional number`

                  - `headers: optional unknown`

                  - `redirectedTo: optional string`

              - `message: optional string`

          - `discoverability: object { linkHeaders, robotsTxt, sitemap }`

            - `linkHeaders: object { status, details, durationMs, 2 more }`

              - `status: string`

              - `details: optional unknown`

              - `durationMs: optional number`

              - `evidence: optional array of object { action, label, finding, 2 more }`

                - `action: string`

                - `label: string`

                - `finding: optional object { outcome, summary }`

                  - `outcome: string`

                  - `summary: string`

                - `request: optional object { method, url, headers }`

                  - `method: string`

                  - `url: string`

                  - `headers: optional unknown`

                - `response: optional object { status, statusText, bodyPreview, 3 more }`

                  - `status: number`

                  - `statusText: string`

                  - `bodyPreview: optional string`

                  - `bodySize: optional number`

                  - `headers: optional unknown`

                  - `redirectedTo: optional string`

              - `message: optional string`

            - `robotsTxt: object { status, details, durationMs, 2 more }`

              - `status: string`

              - `details: optional unknown`

              - `durationMs: optional number`

              - `evidence: optional array of object { action, label, finding, 2 more }`

                - `action: string`

                - `label: string`

                - `finding: optional object { outcome, summary }`

                  - `outcome: string`

                  - `summary: string`

                - `request: optional object { method, url, headers }`

                  - `method: string`

                  - `url: string`

                  - `headers: optional unknown`

                - `response: optional object { status, statusText, bodyPreview, 3 more }`

                  - `status: number`

                  - `statusText: string`

                  - `bodyPreview: optional string`

                  - `bodySize: optional number`

                  - `headers: optional unknown`

                  - `redirectedTo: optional string`

              - `message: optional string`

            - `sitemap: object { status, details, durationMs, 2 more }`

              - `status: string`

              - `details: optional unknown`

              - `durationMs: optional number`

              - `evidence: optional array of object { action, label, finding, 2 more }`

                - `action: string`

                - `label: string`

                - `finding: optional object { outcome, summary }`

                  - `outcome: string`

                  - `summary: string`

                - `request: optional object { method, url, headers }`

                  - `method: string`

                  - `url: string`

                  - `headers: optional unknown`

                - `response: optional object { status, statusText, bodyPreview, 3 more }`

                  - `status: number`

                  - `statusText: string`

                  - `bodyPreview: optional string`

                  - `bodySize: optional number`

                  - `headers: optional unknown`

                  - `redirectedTo: optional string`

              - `message: optional string`

          - `discovery: object { a2aAgentCard, agentSkills, apiCatalog, 4 more }`

            - `a2aAgentCard: object { status, details, durationMs, 2 more }`

              - `status: string`

              - `details: optional unknown`

              - `durationMs: optional number`

              - `evidence: optional array of object { action, label, finding, 2 more }`

                - `action: string`

                - `label: string`

                - `finding: optional object { outcome, summary }`

                  - `outcome: string`

                  - `summary: string`

                - `request: optional object { method, url, headers }`

                  - `method: string`

                  - `url: string`

                  - `headers: optional unknown`

                - `response: optional object { status, statusText, bodyPreview, 3 more }`

                  - `status: number`

                  - `statusText: string`

                  - `bodyPreview: optional string`

                  - `bodySize: optional number`

                  - `headers: optional unknown`

                  - `redirectedTo: optional string`

              - `message: optional string`

            - `agentSkills: object { status, details, durationMs, 2 more }`

              - `status: string`

              - `details: optional unknown`

              - `durationMs: optional number`

              - `evidence: optional array of object { action, label, finding, 2 more }`

                - `action: string`

                - `label: string`

                - `finding: optional object { outcome, summary }`

                  - `outcome: string`

                  - `summary: string`

                - `request: optional object { method, url, headers }`

                  - `method: string`

                  - `url: string`

                  - `headers: optional unknown`

                - `response: optional object { status, statusText, bodyPreview, 3 more }`

                  - `status: number`

                  - `statusText: string`

                  - `bodyPreview: optional string`

                  - `bodySize: optional number`

                  - `headers: optional unknown`

                  - `redirectedTo: optional string`

              - `message: optional string`

            - `apiCatalog: object { status, details, durationMs, 2 more }`

              - `status: string`

              - `details: optional unknown`

              - `durationMs: optional number`

              - `evidence: optional array of object { action, label, finding, 2 more }`

                - `action: string`

                - `label: string`

                - `finding: optional object { outcome, summary }`

                  - `outcome: string`

                  - `summary: string`

                - `request: optional object { method, url, headers }`

                  - `method: string`

                  - `url: string`

                  - `headers: optional unknown`

                - `response: optional object { status, statusText, bodyPreview, 3 more }`

                  - `status: number`

                  - `statusText: string`

                  - `bodyPreview: optional string`

                  - `bodySize: optional number`

                  - `headers: optional unknown`

                  - `redirectedTo: optional string`

              - `message: optional string`

            - `mcpServerCard: object { status, details, durationMs, 2 more }`

              - `status: string`

              - `details: optional unknown`

              - `durationMs: optional number`

              - `evidence: optional array of object { action, label, finding, 2 more }`

                - `action: string`

                - `label: string`

                - `finding: optional object { outcome, summary }`

                  - `outcome: string`

                  - `summary: string`

                - `request: optional object { method, url, headers }`

                  - `method: string`

                  - `url: string`

                  - `headers: optional unknown`

                - `response: optional object { status, statusText, bodyPreview, 3 more }`

                  - `status: number`

                  - `statusText: string`

                  - `bodyPreview: optional string`

                  - `bodySize: optional number`

                  - `headers: optional unknown`

                  - `redirectedTo: optional string`

              - `message: optional string`

            - `oauthDiscovery: object { status, details, durationMs, 2 more }`

              - `status: string`

              - `details: optional unknown`

              - `durationMs: optional number`

              - `evidence: optional array of object { action, label, finding, 2 more }`

                - `action: string`

                - `label: string`

                - `finding: optional object { outcome, summary }`

                  - `outcome: string`

                  - `summary: string`

                - `request: optional object { method, url, headers }`

                  - `method: string`

                  - `url: string`

                  - `headers: optional unknown`

                - `response: optional object { status, statusText, bodyPreview, 3 more }`

                  - `status: number`

                  - `statusText: string`

                  - `bodyPreview: optional string`

                  - `bodySize: optional number`

                  - `headers: optional unknown`

                  - `redirectedTo: optional string`

              - `message: optional string`

            - `oauthProtectedResource: object { status, details, durationMs, 2 more }`

              - `status: string`

              - `details: optional unknown`

              - `durationMs: optional number`

              - `evidence: optional array of object { action, label, finding, 2 more }`

                - `action: string`

                - `label: string`

                - `finding: optional object { outcome, summary }`

                  - `outcome: string`

                  - `summary: string`

                - `request: optional object { method, url, headers }`

                  - `method: string`

                  - `url: string`

                  - `headers: optional unknown`

                - `response: optional object { status, statusText, bodyPreview, 3 more }`

                  - `status: number`

                  - `statusText: string`

                  - `bodyPreview: optional string`

                  - `bodySize: optional number`

                  - `headers: optional unknown`

                  - `redirectedTo: optional string`

              - `message: optional string`

            - `webMcp: object { status, details, durationMs, 2 more }`

              - `status: string`

              - `details: optional unknown`

              - `durationMs: optional number`

              - `evidence: optional array of object { action, label, finding, 2 more }`

                - `action: string`

                - `label: string`

                - `finding: optional object { outcome, summary }`

                  - `outcome: string`

                  - `summary: string`

                - `request: optional object { method, url, headers }`

                  - `method: string`

                  - `url: string`

                  - `headers: optional unknown`

                - `response: optional object { status, statusText, bodyPreview, 3 more }`

                  - `status: number`

                  - `statusText: string`

                  - `bodyPreview: optional string`

                  - `bodySize: optional number`

                  - `headers: optional unknown`

                  - `redirectedTo: optional string`

              - `message: optional string`

        - `level: number`

        - `levelName: string`

        - `commerceSignals: optional array of string`

        - `isCommerce: optional boolean`

        - `nextLevel: optional object { name, requirements, target }`

          - `name: string`

          - `requirements: array of object { check, description, prompt, 2 more }`

            - `check: string`

            - `description: string`

            - `prompt: string`

            - `skillUrl: string`

            - `specUrls: array of string`

          - `target: number`

      - `phishing_v2: optional object { data }`

        - `data: array of string`

      - `robotsTxt: optional object { data }`

        - `data: array of object { rules, sitemaps, hash }`

          - `rules: object { "*" }`

            - `"*": object { allow, disallow, contentSignal, crawlDelay }`

              - `allow: array of string`

              - `disallow: array of string`

              - `contentSignal: optional object { "ai-input", "ai-train", search }`

                - `"ai-input": optional string`

                - `"ai-train": optional string`

                - `search: optional string`

              - `crawlDelay: optional number`

          - `sitemaps: array of string`

          - `hash: optional string`

      - `urlCategories: optional object { data }`

        - `data: array of object { content, inherited, name, risks }`

          - `content: array of object { id, name, super_category_id }`

            - `id: number`

            - `name: string`

            - `super_category_id: number`

          - `inherited: object { content, from, risks }`

            - `content: array of object { id, name, super_category_id }`

              - `id: number`

              - `name: string`

              - `super_category_id: number`

            - `from: string`

            - `risks: array of object { id, name, super_category_id }`

              - `id: number`

              - `name: string`

              - `super_category_id: number`

          - `name: string`

          - `risks: array of object { id, name, super_category_id }`

            - `id: number`

            - `name: string`

            - `super_category_id: number`

  - `page: object { apexDomain, asn, asnname, 14 more }`

    - `apexDomain: string`

    - `asn: string`

    - `asnname: string`

    - `city: string`

    - `country: string`

    - `domain: string`

    - `ip: string`

    - `mimeType: string`

    - `server: string`

    - `status: string`

    - `title: string`

    - `tlsAgeDays: number`

    - `tlsIssuer: string`

    - `tlsValidDays: number`

    - `tlsValidFrom: string`

    - `url: string`

    - `screenshot: optional object { dhash, mm3Hash, name, phash }`

      - `dhash: string`

      - `mm3Hash: number`

      - `name: string`

      - `phash: string`

  - `scanner: object { colo, country }`

    - `colo: string`

    - `country: string`

  - `stats: object { domainStats, ipStats, IPv6Percentage, 10 more }`

    - `domainStats: array of object { count, countries, domain, 6 more }`

      - `count: number`

      - `countries: array of string`

      - `domain: string`

      - `encodedSize: number`

      - `index: number`

      - `initiators: array of string`

      - `ips: array of string`

      - `redirects: number`

      - `size: number`

    - `ipStats: array of object { asn, countries, domains, 9 more }`

      - `asn: object { asn, country, description, 3 more }`

        - `asn: string`

        - `country: string`

        - `description: string`

        - `ip: string`

        - `name: string`

        - `org: string`

      - `countries: array of string`

      - `domains: array of string`

      - `encodedSize: number`

      - `geoip: object { city, country, country_name, 2 more }`

        - `city: string`

        - `country: string`

        - `country_name: string`

        - `ll: array of number`

        - `region: string`

      - `index: number`

      - `ip: string`

      - `ipv6: boolean`

      - `redirects: number`

      - `requests: number`

      - `size: number`

      - `count: optional number`

    - `IPv6Percentage: number`

    - `malicious: number`

    - `protocolStats: array of object { count, countries, encodedSize, 3 more }`

      - `count: number`

      - `countries: array of string`

      - `encodedSize: number`

      - `ips: array of string`

      - `protocol: string`

      - `size: number`

    - `resourceStats: array of object { compression, count, countries, 5 more }`

      - `compression: number`

      - `count: number`

      - `countries: array of string`

      - `encodedSize: number`

      - `ips: array of string`

      - `percentage: number`

      - `size: number`

      - `type: string`

    - `securePercentage: number`

    - `secureRequests: number`

    - `serverStats: array of object { count, countries, encodedSize, 3 more }`

      - `count: number`

      - `countries: array of string`

      - `encodedSize: number`

      - `ips: array of string`

      - `server: string`

      - `size: number`

    - `tlsStats: array of object { count, countries, encodedSize, 4 more }`

      - `count: number`

      - `countries: array of string`

      - `encodedSize: number`

      - `ips: array of string`

      - `protocols: object { "TLS 1.3 / AES_128_GCM" }`

        - `"TLS 1.3 / AES_128_GCM": number`

      - `securityState: string`

      - `size: number`

    - `totalLinks: number`

    - `uniqASNs: number`

    - `uniqCountries: number`

  - `task: object { apexDomain, domain, domURL, 10 more }`

    - `apexDomain: string`

    - `domain: string`

    - `domURL: string`

    - `method: string`

    - `options: object { customHeaders, screenshotsResolutions }`

      - `customHeaders: optional unknown`

        Custom headers set.

      - `screenshotsResolutions: optional array of string`

    - `reportURL: string`

    - `screenshotURL: string`

    - `source: string`

    - `success: boolean`

    - `time: string`

    - `url: string`

    - `uuid: string`

    - `visibility: string`

  - `verdicts: object { overall }`

    - `overall: object { categories, hasVerdicts, malicious, tags }`

      - `categories: array of string`

      - `hasVerdicts: boolean`

      - `malicious: boolean`

      - `tags: array of string`

### Scan Create Response

- `ScanCreateResponse object { api, message, result, 4 more }`

  - `api: string`

    URL to api report.

  - `message: string`

  - `result: string`

    Public URL to report.

  - `url: string`

    Canonical form of submitted URL. Use this if you want to later search by URL.

  - `uuid: string`

    Scan ID.

  - `visibility: "public" or "unlisted"`

    Submitted visibility status.

    - `"public"`

    - `"unlisted"`

  - `options: optional object { useragent }`

    - `useragent: optional string`

### Scan Bulk Create Response

- `ScanBulkCreateResponse = array of object { api, result, url, 3 more }`

  - `api: string`

    URL to api report.

  - `result: string`

    URL to report.

  - `url: string`

    Submitted URL

  - `uuid: string`

    Scan ID.

  - `visibility: "public" or "unlisted"`

    Submitted visibility status.

    - `"public"`

    - `"unlisted"`

  - `options: optional object { useragent }`

    - `useragent: optional string`

### Scan HAR Response

- `ScanHARResponse object { log }`

  - `log: object { creator, entries, pages, version }`

    - `creator: object { comment, name, version }`

      - `comment: string`

      - `name: string`

      - `version: string`

    - `entries: array of object { _initialPriority, _initiator_type, _priority, 11 more }`

      - `_initialPriority: string`

      - `_initiator_type: string`

      - `_priority: string`

      - `_requestId: string`

      - `_requestTime: number`

      - `_resourceType: string`

      - `cache: unknown`

      - `connection: string`

      - `pageref: string`

      - `request: object { bodySize, headers, headersSize, 3 more }`

        - `bodySize: number`

        - `headers: array of object { name, value }`

          - `name: string`

          - `value: string`

        - `headersSize: number`

        - `httpVersion: string`

        - `method: string`

        - `url: string`

      - `response: object { _transferSize, bodySize, content, 6 more }`

        - `_transferSize: number`

        - `bodySize: number`

        - `content: object { mimeType, size, compression }`

          - `mimeType: string`

          - `size: number`

          - `compression: optional number`

        - `headers: array of object { name, value }`

          - `name: string`

          - `value: string`

        - `headersSize: number`

        - `httpVersion: string`

        - `redirectURL: string`

        - `status: number`

        - `statusText: string`

      - `serverIPAddress: string`

      - `startedDateTime: string`

      - `time: number`

    - `pages: array of object { id, pageTimings, startedDateTime, title }`

      - `id: string`

      - `pageTimings: object { onContentLoad, onLoad }`

        - `onContentLoad: number`

        - `onLoad: number`

      - `startedDateTime: string`

      - `title: string`

    - `version: string`

### Scan DOM Response

- `ScanDOMResponse = string`

  HTML of webpage.

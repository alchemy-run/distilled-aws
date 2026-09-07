## Get indicator feed metadata

**get** `/accounts/{account_id}/intel/indicator-feeds/{feed_id}`

Retrieves details for a specific custom threat indicator feed.

### Path Parameters

- `account_id: string`

  Identifier

- `feed_id: number`

  Indicator feed ID

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

- `result: optional object { id, created_on, description, 10 more }`

  - `id: optional number`

    The unique identifier for the indicator feed

  - `created_on: optional string`

    The date and time when the data entry was created

  - `description: optional string`

    The description of the example test

  - `is_attributable: optional boolean`

    Whether the indicator feed can be attributed to a provider

  - `is_downloadable: optional boolean`

    Whether the indicator feed can be downloaded

  - `is_public: optional boolean`

    Whether the indicator feed is exposed to customers

  - `last_upload_summary: optional object { persisted, skipped, uploaded }`

    Summary of indicator counts from the last successful upload to this
    feed. Populated by the custom-threat-feeds loader at the end of each
    successful load. Absent (omitted) when no upload has completed
    successfully or the upload errored before the summary write.
    Surfaces silent-failure paths so operators can see when their
    indicators were dropped (popularity allowlist, expired valid_until,
    etc.) without reading loader logs.

    - `persisted: optional object { domains_added, domains_removed, ips_added, 3 more }`

      Net delta applied to feed indicators by this upload. Snapshot
      uploads emit both *_added and *_removed; delta-add emits only
      \*_added; delta-remove emits only *_removed.

      - `domains_added: optional number`

      - `domains_removed: optional number`

      - `ips_added: optional number`

      - `ips_removed: optional number`

      - `urls_added: optional number`

      - `urls_removed: optional number`

    - `skipped: optional object { allowlisted_domains, expired_indicators, invalid_indicators }`

      Counts of indicators that were uploaded but did not reach
      QuickSilver, broken down by reason.

      - `allowlisted_domains: optional number`

        Domains filtered by the global popularity allowlist at QS
        provisioning time. Popular domains (bing.com, naver.com,
        etc.) are protected from custom-threat-feed enforcement.

      - `expired_indicators: optional number`

        Indicators in the upload whose valid_until is already in
        the past. These are not added to QS; the expiration cron
        handles cleanup.

      - `invalid_indicators: optional number`

        Reserved for future use. Currently always 0 — the unifier
        aborts the entire upload on a single bad indicator.

    - `uploaded: optional object { domains, ips, urls }`

      Indicator counts from the unified file the loader received

      - `domains: optional number`

        Number of domain indicators in the upload

      - `ips: optional number`

        Number of IP indicators in the upload

      - `urls: optional number`

        Number of URL indicators in the upload

  - `latest_upload_error: optional string`

    Human-readable error message describing why the latest upload
    failed. Populated only when `latest_upload_status` is `Error`.
    Returns one of a small fixed set of category-level messages
    (invalid domain / IP / URL entries, malformed row or header,
    invalid valid_until timestamp, etc.) or the generic
    `Upload failed` for unknown or infrastructure-level errors.
    Never echoes raw error text from the underlying loader.
    Intel accounts receive the verbatim loader/API error text
    (including specific offending values) instead of these
    category-level messages.

  - `latest_upload_status: optional "Mirroring" or "Unifying" or "Loading" or 3 more`

    Status of the latest snapshot uploaded

    - `"Mirroring"`

    - `"Unifying"`

    - `"Loading"`

    - `"Provisioning"`

    - `"Complete"`

    - `"Error"`

  - `modified_on: optional string`

    The date and time when the data entry was last modified

  - `name: optional string`

    The name of the indicator feed

  - `provider_id: optional number`

    The unique identifier for the provider

  - `provider_name: optional string`

    The provider of the indicator feed

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/intel/indicator-feeds/$FEED_ID \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
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
    "id": 1,
    "created_on": "2023-05-12T12:21:56.777653Z",
    "description": "example feed description",
    "is_attributable": false,
    "is_downloadable": false,
    "is_public": false,
    "last_upload_summary": {
      "persisted": {
        "domains_added": 2,
        "domains_removed": 1,
        "ips_added": 0,
        "ips_removed": 0,
        "urls_added": 0,
        "urls_removed": 0
      },
      "skipped": {
        "allowlisted_domains": 1,
        "expired_indicators": 0,
        "invalid_indicators": 0
      },
      "uploaded": {
        "domains": 3,
        "ips": 0,
        "urls": 0
      }
    },
    "latest_upload_error": "Feed contains one or more invalid domain entries. Check your feed for wildcards or other values that are not valid DNS names.",
    "latest_upload_status": "Complete",
    "modified_on": "2023-06-18T03:13:34.123321Z",
    "name": "example_feed_1",
    "provider_id": 1,
    "provider_name": "provider_name"
  }
}
```

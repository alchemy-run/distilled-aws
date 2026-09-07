# Indicator Feeds

## Get indicator feeds owned by this account

**get** `/accounts/{account_id}/intel/indicator-feeds`

Retrieves details for all accessible custom threat indicator feeds.

### Path Parameters

- `account_id: string`

  Identifier

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

- `result: optional array of object { id, created_on, description, 5 more }`

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

  - `modified_on: optional string`

    The date and time when the data entry was last modified

  - `name: optional string`

    The name of the indicator feed

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/intel/indicator-feeds \
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
  "result": [
    {
      "id": 1,
      "created_on": "2023-05-12T12:21:56.777653Z",
      "description": "user specified description 1",
      "is_attributable": false,
      "is_downloadable": false,
      "is_public": false,
      "modified_on": "2023-06-18T03:13:34.123321Z",
      "name": "user_specified_name_1"
    },
    {
      "id": 2,
      "created_on": "2023-05-21T21:43:52.867525Z",
      "description": "User specified description 2",
      "is_attributable": false,
      "is_downloadable": false,
      "is_public": false,
      "modified_on": "2023-06-28T18:46:18.764425Z",
      "name": "user_specified_name_2"
    }
  ]
}
```

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

## Create new indicator feed

**post** `/accounts/{account_id}/intel/indicator-feeds`

Creates a new custom threat indicator feed for sharing threat intelligence data.

### Path Parameters

- `account_id: string`

  Identifier

### Body Parameters

- `description: optional string`

  The description of the example test

- `name: optional string`

  The name of the indicator feed

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

- `result: optional object { id, created_on, description, 5 more }`

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

  - `modified_on: optional string`

    The date and time when the data entry was last modified

  - `name: optional string`

    The name of the indicator feed

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/intel/indicator-feeds \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{}'
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
    "modified_on": "2023-06-18T03:13:34.123321Z",
    "name": "example_feed_1"
  }
}
```

## Update indicator feed metadata

**put** `/accounts/{account_id}/intel/indicator-feeds/{feed_id}`

Revises details for a specific custom threat indicator feed.

### Path Parameters

- `account_id: string`

  Identifier

- `feed_id: number`

  Indicator feed ID

### Body Parameters

- `description: optional string`

  The new description of the feed

- `is_attributable: optional boolean`

  The new is_attributable value of the feed

- `is_downloadable: optional boolean`

  The new is_downloadable value of the feed

- `is_public: optional boolean`

  The new is_public value of the feed

- `name: optional string`

  The new name of the feed

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

- `result: optional object { id, created_on, description, 5 more }`

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

  - `modified_on: optional string`

    The date and time when the data entry was last modified

  - `name: optional string`

    The name of the indicator feed

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/intel/indicator-feeds/$FEED_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "description": "This is an example description",
          "is_attributable": true,
          "is_downloadable": true,
          "is_public": true,
          "name": "indicator_list"
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
    "id": 1,
    "created_on": "2023-05-12T12:21:56.777653Z",
    "description": "example feed description",
    "is_attributable": false,
    "is_downloadable": false,
    "is_public": false,
    "modified_on": "2023-06-18T03:13:34.123321Z",
    "name": "example_feed_1"
  }
}
```

## Get indicator feed data

**get** `/accounts/{account_id}/intel/indicator-feeds/{feed_id}/data`

Retrieves the raw data entries in a custom threat indicator feed.

### Path Parameters

- `account_id: string`

  Identifier

- `feed_id: number`

  Indicator feed ID

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/intel/indicator-feeds/$FEED_ID/data \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
```

## Domain Types

### Indicator Feed List Response

- `IndicatorFeedListResponse object { id, created_on, description, 5 more }`

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

  - `modified_on: optional string`

    The date and time when the data entry was last modified

  - `name: optional string`

    The name of the indicator feed

### Indicator Feed Get Response

- `IndicatorFeedGetResponse object { id, created_on, description, 10 more }`

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

### Indicator Feed Create Response

- `IndicatorFeedCreateResponse object { id, created_on, description, 5 more }`

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

  - `modified_on: optional string`

    The date and time when the data entry was last modified

  - `name: optional string`

    The name of the indicator feed

### Indicator Feed Update Response

- `IndicatorFeedUpdateResponse object { id, created_on, description, 5 more }`

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

  - `modified_on: optional string`

    The date and time when the data entry was last modified

  - `name: optional string`

    The name of the indicator feed

### Indicator Feed Data Response

- `IndicatorFeedDataResponse = string`

# Snapshots

## Update indicator feed data

**put** `/accounts/{account_id}/intel/indicator-feeds/{feed_id}/snapshot`

Revises the raw data entries in a custom threat indicator feed.

Accepts both plain and gzipped STIX2/CRDF bodies. Gzip is
detected by RFC 1952 magic bytes (`0x1f 0x8b`) and/or a `.gz`
filename suffix (case-insensitive) — either signal alone is
sufficient to trigger the gzip path; if the body is not valid
gzip, the upload fails fast. Customers are encouraged to gzip
larger uploads — the api-gateway 500 MB body cap applies to
the on-the-wire (compressed) size, so gzip lets a single
upload carry several GiB of decompressed STIX.

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

- `result: optional object { file_id, filename, status }`

  - `file_id: optional number`

    Feed id

  - `filename: optional string`

    Name of the file unified in our system

  - `status: optional string`

    Current status of upload, should be unified

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/intel/indicator-feeds/$FEED_ID/snapshot \
    -X PUT \
    -H 'Content-Type: multipart/form-data' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -F source=@/Users/me/test.stix2.gz
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
    "file_id": 1,
    "filename": "snapshot_file.unified",
    "status": "unified"
  }
}
```

## Domain Types

### Snapshot Update Response

- `SnapshotUpdateResponse object { file_id, filename, status }`

  - `file_id: optional number`

    Feed id

  - `filename: optional string`

    Name of the file unified in our system

  - `status: optional string`

    Current status of upload, should be unified

# Permissions

## List indicator feed permissions

**get** `/accounts/{account_id}/intel/indicator-feeds/permissions/view`

Lists current access permissions for custom threat indicator feeds.

### Path Parameters

- `account_id: string`

  Identifier

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

- `result: optional array of object { id, description, is_attributable, 3 more }`

  - `id: optional number`

    The unique identifier for the indicator feed

  - `description: optional string`

    The description of the example test

  - `is_attributable: optional boolean`

    Whether the indicator feed can be attributed to a provider

  - `is_downloadable: optional boolean`

    Whether the indicator feed can be downloaded

  - `is_public: optional boolean`

    Whether the indicator feed is exposed to customers

  - `name: optional string`

    The name of the indicator feed

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/intel/indicator-feeds/permissions/view \
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
  "result": [
    {
      "id": 1,
      "description": "An important indicator list",
      "is_attributable": false,
      "is_downloadable": false,
      "is_public": false,
      "name": "indicator_list_1"
    },
    {
      "id": 2,
      "description": "An even more important indicator list",
      "is_attributable": true,
      "is_downloadable": false,
      "is_public": true,
      "name": "indicator_list_2"
    }
  ]
}
```

## Grant permission to indicator feed

**put** `/accounts/{account_id}/intel/indicator-feeds/permissions/add`

Grants access permissions for a custom threat indicator feed to other accounts.

### Path Parameters

- `account_id: string`

  Identifier

### Body Parameters

- `account_tag: optional string`

  The Cloudflare account tag of the account to change permissions on

- `feed_id: optional number`

  The ID of the feed to add/remove permissions on

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

- `result: optional object { success }`

  - `success: optional boolean`

    Whether the update succeeded or not

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/intel/indicator-feeds/permissions/add \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "account_tag": "823f45f16fd2f7e21e1e054aga4d2859",
          "feed_id": 1
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
    "success": true
  }
}
```

## Revoke permission to indicator feed

**put** `/accounts/{account_id}/intel/indicator-feeds/permissions/remove`

Revokes access permissions for a custom threat indicator feed.

### Path Parameters

- `account_id: string`

  Identifier

### Body Parameters

- `account_tag: optional string`

  The Cloudflare account tag of the account to change permissions on

- `feed_id: optional number`

  The ID of the feed to add/remove permissions on

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

- `result: optional object { success }`

  - `success: optional boolean`

    Whether the update succeeded or not

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/intel/indicator-feeds/permissions/remove \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "account_tag": "823f45f16fd2f7e21e1e054aga4d2859",
          "feed_id": 1
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
    "success": true
  }
}
```

## Domain Types

### Permission List Response

- `PermissionListResponse = array of object { id, description, is_attributable, 3 more }`

  - `id: optional number`

    The unique identifier for the indicator feed

  - `description: optional string`

    The description of the example test

  - `is_attributable: optional boolean`

    Whether the indicator feed can be attributed to a provider

  - `is_downloadable: optional boolean`

    Whether the indicator feed can be downloaded

  - `is_public: optional boolean`

    Whether the indicator feed is exposed to customers

  - `name: optional string`

    The name of the indicator feed

### Permission Create Response

- `PermissionCreateResponse object { success }`

  - `success: optional boolean`

    Whether the update succeeded or not

### Permission Delete Response

- `PermissionDeleteResponse object { success }`

  - `success: optional boolean`

    Whether the update succeeded or not

# Downloads

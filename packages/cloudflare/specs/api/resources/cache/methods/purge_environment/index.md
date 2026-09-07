## Purge Cached Content by Environment

**post** `/zones/{zone_id}/environments/{environment_id}/purge_cache`

Purge cached content scoped to a specific environment. Supports the same purge types as the zone-level endpoint (purge everything, by URL, by tag, host, or prefix).

### Availability and limits

Please refer to [purge cache availability and limits documentation page](https://developers.cloudflare.com/cache/how-to/purge-cache/#availability-and-limits).

### Path Parameters

- `zone_id: string`

- `environment_id: string`

### Body Parameters

- `body: object { tags }  or object { hosts }  or object { prefixes }  or 3 more`

  - `CachePurgeFlexPurgeByTags object { tags }`

    - `tags: optional array of string`

      For more information on cache tags and purging by tags, please refer to [purge by cache-tags documentation page](https://developers.cloudflare.com/cache/how-to/purge-cache/purge-by-tags/).

  - `CachePurgeFlexPurgeByHostnames object { hosts }`

    - `hosts: optional array of string`

      For more information purging by hostnames, please refer to [purge by hostname documentation page](https://developers.cloudflare.com/cache/how-to/purge-cache/purge-by-hostname/).

  - `CachePurgeFlexPurgeByPrefixes object { prefixes }`

    - `prefixes: optional array of string`

      For more information on purging by prefixes, please refer to [purge by prefix documentation page](https://developers.cloudflare.com/cache/how-to/purge-cache/purge_by_prefix/).

  - `CachePurgeEverything object { purge_everything }`

    - `purge_everything: optional boolean`

      For more information, please refer to [purge everything documentation page](https://developers.cloudflare.com/cache/how-to/purge-cache/purge-everything/).

  - `CachePurgeSingleFile object { files }`

    - `files: optional array of string`

      For more information on purging files, please refer to [purge by single-file documentation page](https://developers.cloudflare.com/cache/how-to/purge-cache/purge-by-single-file/).

  - `CachePurgeSingleFileWithURLAndHeaders object { files }`

    - `files: optional array of object { headers, url }`

      For more information on purging files with URL and headers, please refer to [purge by single-file documentation page](https://developers.cloudflare.com/cache/how-to/purge-cache/purge-by-single-file/).

      - `headers: optional map[string]`

      - `url: optional string`

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

- `success: boolean`

  Indicates the API call's success or failure.

- `result: optional object { id }`

  - `id: string`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/environments/$ENVIRONMENT_ID/purge_cache \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "tags": [
            "a-cache-tag",
            "another-cache-tag"
          ]
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
    "id": "023e105f4ecef8ad9ca31a8372d0c353"
  }
}
```

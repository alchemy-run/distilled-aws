## Purge Cached Content

**post** `/zones/{zone_id}/purge_cache`

### Purge All Cached Content

Removes ALL files from Cloudflare's cache. All tiers can purge everything.

```
{"purge_everything": true}
```

### Purge Cached Content by URL

Granularly removes one or more files from Cloudflare's cache by specifying URLs. All tiers can purge by URL.

To purge files with custom cache keys, include the headers used to compute the cache key as in the example. If you have a device type or geo in your cache key, you will need to include the CF-Device-Type or CF-IPCountry headers. If you have lang in your cache key, you will need to include the Accept-Language header.

**NB:** When including the Origin header, be sure to include the **scheme** and **hostname**. The port number can be omitted if it is the default port (80 for http, 443 for https), but must be included otherwise.

Single file purge example with files:

```
{"files": ["http://www.example.com/css/styles.css", "http://www.example.com/js/index.js"]}
```

Single file purge example with url and header pairs:

```
{"files": [{"url": "http://www.example.com/cat_picture.jpg", "headers": {"CF-IPCountry": "US", "CF-Device-Type": "desktop", "Accept-Language": "zh-CN"}}, {"url": "http://www.example.com/dog_picture.jpg", "headers": {"CF-IPCountry": "EU", "CF-Device-Type": "mobile", "Accept-Language": "en-US"}}]}
```

### Purge Cached Content by Tag, Host or Prefix

Granularly removes one or more files from Cloudflare's cache either by specifying the host, the associated Cache-Tag, or a Prefix.

Flex purge with tags:

```
{"tags": ["a-cache-tag", "another-cache-tag"]}
```

Flex purge with hosts:

```
{"hosts": ["www.example.com", "images.example.com"]}
```

Flex purge with prefixes:

```
{"prefixes": ["www.example.com/foo", "images.example.com/bar/baz"]}
```

### Availability and limits

Please refer to [purge cache availability and limits documentation page](https://developers.cloudflare.com/cache/how-to/purge-cache/#availability-and-limits).

### Path Parameters

- `zone_id: string`

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
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/purge_cache \
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

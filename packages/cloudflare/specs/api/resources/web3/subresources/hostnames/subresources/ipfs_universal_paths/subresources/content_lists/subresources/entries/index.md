# Entries

## List IPFS Universal Path Gateway Content List Entries

**get** `/zones/{zone_id}/web3/hostnames/{identifier}/ipfs_universal_path/content_list/entries`

List IPFS Universal Path Gateway Content List Entries

### Path Parameters

- `zone_id: string`

  Specify the identifier of the hostname.

- `identifier: string`

  Specify the identifier of the hostname.

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

- `result: object { entries }`

  - `entries: optional array of object { id, content, created_on, 3 more }`

    Provides content list entries.

    - `id: optional string`

      Specify the identifier of the hostname.

    - `content: optional string`

      Specify the CID or content path of content to block.

    - `created_on: optional string`

    - `description: optional string`

      Specify an optional description of the content list entry.

    - `modified_on: optional string`

    - `type: optional "cid" or "content_path"`

      Specify the type of content list entry to block.

      - `"cid"`

      - `"content_path"`

- `success: true`

  Specifies whether the API call was successful.

  - `true`

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Specifies the total number of results for the requested service.

  - `page: optional number`

    Specifies the current page within paginated list of results.

  - `per_page: optional number`

    Specifies the number of results per page of results.

  - `total_count: optional number`

    Specifies the total results available without any search parameters.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/web3/hostnames/$IDENTIFIER/ipfs_universal_path/content_list/entries \
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
    "entries": [
      {
        "id": "023e105f4ecef8ad9ca31a8372d0c353",
        "content": "QmPZ9gcCEpqKTo6aq61g2nXGUhM4iCL3ewB6LDXZCtioEB",
        "created_on": "2014-01-01T05:20:00.12345Z",
        "description": "this is my content list entry",
        "modified_on": "2014-01-01T05:20:00.12345Z",
        "type": "cid"
      }
    ]
  },
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

## IPFS Universal Path Gateway Content List Entry Details

**get** `/zones/{zone_id}/web3/hostnames/{identifier}/ipfs_universal_path/content_list/entries/{content_list_entry_identifier}`

IPFS Universal Path Gateway Content List Entry Details

### Path Parameters

- `zone_id: string`

  Specify the identifier of the hostname.

- `identifier: string`

  Specify the identifier of the hostname.

- `content_list_entry_identifier: string`

  Specify the identifier of the hostname.

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

- `result: object { id, content, created_on, 3 more }`

  Specify a content list entry to block.

  - `id: optional string`

    Specify the identifier of the hostname.

  - `content: optional string`

    Specify the CID or content path of content to block.

  - `created_on: optional string`

  - `description: optional string`

    Specify an optional description of the content list entry.

  - `modified_on: optional string`

  - `type: optional "cid" or "content_path"`

    Specify the type of content list entry to block.

    - `"cid"`

    - `"content_path"`

- `success: true`

  Specifies whether the API call was successful.

  - `true`

- `result_info: optional unknown or string`

  Provides the API response.

  - `unknown`

  - `string`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/web3/hostnames/$IDENTIFIER/ipfs_universal_path/content_list/entries/$CONTENT_LIST_ENTRY_IDENTIFIER \
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
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "content": "QmPZ9gcCEpqKTo6aq61g2nXGUhM4iCL3ewB6LDXZCtioEB",
    "created_on": "2014-01-01T05:20:00.12345Z",
    "description": "this is my content list entry",
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "type": "cid"
  },
  "success": true,
  "result_info": {}
}
```

## Create IPFS Universal Path Gateway Content List Entry

**post** `/zones/{zone_id}/web3/hostnames/{identifier}/ipfs_universal_path/content_list/entries`

Create IPFS Universal Path Gateway Content List Entry

### Path Parameters

- `zone_id: string`

  Specify the identifier of the hostname.

- `identifier: string`

  Specify the identifier of the hostname.

### Body Parameters

- `content: string`

  Specify the CID or content path of content to block.

- `type: "cid" or "content_path"`

  Specify the type of content list entry to block.

  - `"cid"`

  - `"content_path"`

- `description: optional string`

  Specify an optional description of the content list entry.

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

- `result: object { id, content, created_on, 3 more }`

  Specify a content list entry to block.

  - `id: optional string`

    Specify the identifier of the hostname.

  - `content: optional string`

    Specify the CID or content path of content to block.

  - `created_on: optional string`

  - `description: optional string`

    Specify an optional description of the content list entry.

  - `modified_on: optional string`

  - `type: optional "cid" or "content_path"`

    Specify the type of content list entry to block.

    - `"cid"`

    - `"content_path"`

- `success: true`

  Specifies whether the API call was successful.

  - `true`

- `result_info: optional unknown or string`

  Provides the API response.

  - `unknown`

  - `string`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/web3/hostnames/$IDENTIFIER/ipfs_universal_path/content_list/entries \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "content": "QmPZ9gcCEpqKTo6aq61g2nXGUhM4iCL3ewB6LDXZCtioEB",
          "type": "cid",
          "description": "this is my content list entry"
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
  "result": {
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "content": "QmPZ9gcCEpqKTo6aq61g2nXGUhM4iCL3ewB6LDXZCtioEB",
    "created_on": "2014-01-01T05:20:00.12345Z",
    "description": "this is my content list entry",
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "type": "cid"
  },
  "success": true,
  "result_info": {}
}
```

## Edit IPFS Universal Path Gateway Content List Entry

**put** `/zones/{zone_id}/web3/hostnames/{identifier}/ipfs_universal_path/content_list/entries/{content_list_entry_identifier}`

Edit IPFS Universal Path Gateway Content List Entry

### Path Parameters

- `zone_id: string`

  Specify the identifier of the hostname.

- `identifier: string`

  Specify the identifier of the hostname.

- `content_list_entry_identifier: string`

  Specify the identifier of the hostname.

### Body Parameters

- `content: string`

  Specify the CID or content path of content to block.

- `type: "cid" or "content_path"`

  Specify the type of content list entry to block.

  - `"cid"`

  - `"content_path"`

- `description: optional string`

  Specify an optional description of the content list entry.

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

- `result: object { id, content, created_on, 3 more }`

  Specify a content list entry to block.

  - `id: optional string`

    Specify the identifier of the hostname.

  - `content: optional string`

    Specify the CID or content path of content to block.

  - `created_on: optional string`

  - `description: optional string`

    Specify an optional description of the content list entry.

  - `modified_on: optional string`

  - `type: optional "cid" or "content_path"`

    Specify the type of content list entry to block.

    - `"cid"`

    - `"content_path"`

- `success: true`

  Specifies whether the API call was successful.

  - `true`

- `result_info: optional unknown or string`

  Provides the API response.

  - `unknown`

  - `string`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/web3/hostnames/$IDENTIFIER/ipfs_universal_path/content_list/entries/$CONTENT_LIST_ENTRY_IDENTIFIER \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "content": "QmPZ9gcCEpqKTo6aq61g2nXGUhM4iCL3ewB6LDXZCtioEB",
          "type": "cid",
          "description": "this is my content list entry"
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
  "result": {
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "content": "QmPZ9gcCEpqKTo6aq61g2nXGUhM4iCL3ewB6LDXZCtioEB",
    "created_on": "2014-01-01T05:20:00.12345Z",
    "description": "this is my content list entry",
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "type": "cid"
  },
  "success": true,
  "result_info": {}
}
```

## Delete IPFS Universal Path Gateway Content List Entry

**delete** `/zones/{zone_id}/web3/hostnames/{identifier}/ipfs_universal_path/content_list/entries/{content_list_entry_identifier}`

Delete IPFS Universal Path Gateway Content List Entry

### Path Parameters

- `zone_id: string`

  Specify the identifier of the hostname.

- `identifier: string`

  Specify the identifier of the hostname.

- `content_list_entry_identifier: string`

  Specify the identifier of the hostname.

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

- `result: object { id }`

  - `id: string`

    Specify the identifier of the hostname.

- `success: true`

  Specifies whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/web3/hostnames/$IDENTIFIER/ipfs_universal_path/content_list/entries/$CONTENT_LIST_ENTRY_IDENTIFIER \
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
  "result": {
    "id": "023e105f4ecef8ad9ca31a8372d0c353"
  },
  "success": true
}
```

## Domain Types

### Entry List Response

- `EntryListResponse object { entries }`

  - `entries: optional array of object { id, content, created_on, 3 more }`

    Provides content list entries.

    - `id: optional string`

      Specify the identifier of the hostname.

    - `content: optional string`

      Specify the CID or content path of content to block.

    - `created_on: optional string`

    - `description: optional string`

      Specify an optional description of the content list entry.

    - `modified_on: optional string`

    - `type: optional "cid" or "content_path"`

      Specify the type of content list entry to block.

      - `"cid"`

      - `"content_path"`

### Entry Get Response

- `EntryGetResponse object { id, content, created_on, 3 more }`

  Specify a content list entry to block.

  - `id: optional string`

    Specify the identifier of the hostname.

  - `content: optional string`

    Specify the CID or content path of content to block.

  - `created_on: optional string`

  - `description: optional string`

    Specify an optional description of the content list entry.

  - `modified_on: optional string`

  - `type: optional "cid" or "content_path"`

    Specify the type of content list entry to block.

    - `"cid"`

    - `"content_path"`

### Entry Create Response

- `EntryCreateResponse object { id, content, created_on, 3 more }`

  Specify a content list entry to block.

  - `id: optional string`

    Specify the identifier of the hostname.

  - `content: optional string`

    Specify the CID or content path of content to block.

  - `created_on: optional string`

  - `description: optional string`

    Specify an optional description of the content list entry.

  - `modified_on: optional string`

  - `type: optional "cid" or "content_path"`

    Specify the type of content list entry to block.

    - `"cid"`

    - `"content_path"`

### Entry Update Response

- `EntryUpdateResponse object { id, content, created_on, 3 more }`

  Specify a content list entry to block.

  - `id: optional string`

    Specify the identifier of the hostname.

  - `content: optional string`

    Specify the CID or content path of content to block.

  - `created_on: optional string`

  - `description: optional string`

    Specify an optional description of the content list entry.

  - `modified_on: optional string`

  - `type: optional "cid" or "content_path"`

    Specify the type of content list entry to block.

    - `"cid"`

    - `"content_path"`

### Entry Delete Response

- `EntryDeleteResponse object { id }`

  - `id: string`

    Specify the identifier of the hostname.

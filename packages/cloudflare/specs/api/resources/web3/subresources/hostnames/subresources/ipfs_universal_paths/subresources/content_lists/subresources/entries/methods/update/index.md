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

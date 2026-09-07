## Update IPFS Universal Path Gateway Content List

**put** `/zones/{zone_id}/web3/hostnames/{identifier}/ipfs_universal_path/content_list`

Update IPFS Universal Path Gateway Content List

### Path Parameters

- `zone_id: string`

  Specify the identifier of the hostname.

- `identifier: string`

  Specify the identifier of the hostname.

### Body Parameters

- `action: "block"`

  Behavior of the content list.

  - `"block"`

- `entries: array of object { id, content, created_on, 3 more }`

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

- `result: ContentList`

  - `action: optional "block"`

    Behavior of the content list.

    - `"block"`

- `success: true`

  Specifies whether the API call was successful.

  - `true`

- `result_info: optional unknown or string`

  Provides the API response.

  - `unknown`

  - `string`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/web3/hostnames/$IDENTIFIER/ipfs_universal_path/content_list \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "action": "block",
          "entries": [
            {}
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
  "result": {
    "action": "block"
  },
  "success": true,
  "result_info": {}
}
```

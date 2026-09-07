## Create Web3 Hostname

**post** `/zones/{zone_id}/web3/hostnames`

Create Web3 Hostname

### Path Parameters

- `zone_id: string`

  Specify the identifier of the hostname.

### Body Parameters

- `name: string`

  Specify the hostname that points to the target gateway via CNAME.

- `target: "ethereum" or "ipfs" or "ipfs_universal_path"`

  Specify the target gateway of the hostname.

  - `"ethereum"`

  - `"ipfs"`

  - `"ipfs_universal_path"`

- `description: optional string`

  Specify an optional description of the hostname.

- `dnslink: optional string`

  Specify the DNSLink value used if the target is ipfs.

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

- `result: Hostname`

  - `id: optional string`

    Specify the identifier of the hostname.

  - `created_on: optional string`

  - `description: optional string`

    Specify an optional description of the hostname.

  - `dnslink: optional string`

    Specify the DNSLink value used if the target is ipfs.

  - `modified_on: optional string`

  - `name: optional string`

    Specify the hostname that points to the target gateway via CNAME.

  - `status: optional "active" or "pending" or "deleting" or "error"`

    Specifies the status of the hostname's activation.

    - `"active"`

    - `"pending"`

    - `"deleting"`

    - `"error"`

  - `target: optional "ethereum" or "ipfs" or "ipfs_universal_path"`

    Specify the target gateway of the hostname.

    - `"ethereum"`

    - `"ipfs"`

    - `"ipfs_universal_path"`

- `success: true`

  Specifies whether the API call was successful.

  - `true`

- `result_info: optional unknown or string`

  Provides the API response.

  - `unknown`

  - `string`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/web3/hostnames \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "gateway.example.com",
          "target": "ipfs",
          "description": "This is my IPFS gateway.",
          "dnslink": "/ipns/onboarding.ipfs.cloudflare.com"
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
    "created_on": "2014-01-01T05:20:00.12345Z",
    "description": "This is my IPFS gateway.",
    "dnslink": "/ipns/onboarding.ipfs.cloudflare.com",
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "name": "gateway.example.com",
    "status": "active",
    "target": "ipfs"
  },
  "success": true,
  "result_info": {}
}
```

## List Web3 Hostnames

**get** `/zones/{zone_id}/web3/hostnames`

List Web3 Hostnames

### Path Parameters

- `zone_id: string`

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

- `result: array of Hostname`

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
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/web3/hostnames \
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
  "result": [
    {
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "created_on": "2014-01-01T05:20:00.12345Z",
      "description": "This is my IPFS gateway.",
      "dnslink": "/ipns/onboarding.ipfs.cloudflare.com",
      "modified_on": "2014-01-01T05:20:00.12345Z",
      "name": "gateway.example.com",
      "status": "active",
      "target": "ipfs"
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

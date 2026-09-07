## Get a PAC file

**get** `/accounts/{account_id}/gateway/pacfiles/{pacfile_id}`

Get a single Zero Trust Gateway PAC file.

### Path Parameters

- `account_id: string`

- `pacfile_id: string`

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

- `success: true`

  Indicate whether the API call was successful.

  - `true`

- `result: optional object { id, contents, created_at, 5 more }`

  - `id: optional string`

  - `contents: optional string`

    Actual contents of the PAC file

  - `created_at: optional string`

  - `description: optional string`

    Detailed description of the PAC file.

  - `name: optional string`

    Name of the PAC file.

  - `slug: optional string`

    URL-friendly version of the PAC file name.

  - `updated_at: optional string`

  - `url: optional string`

    Unique URL to download the PAC file.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/pacfiles/$PACFILE_ID \
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
  "success": true,
  "result": {
    "id": "ed35569b41ce4d1facfe683550f54086",
    "contents": "function FindProxyForURL(url, host) { return \"DIRECT\"; }",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "description": "PAC file for Devops team",
    "name": "Devops team",
    "slug": "pac_devops",
    "updated_at": "2014-01-01T05:20:00.12345Z",
    "url": "https://pac.cloudflare-gateway.com/699d98642c564d2e855e9661899b7252/pac_devops"
  }
}
```

# IPs

## Get IP Overview

**get** `/accounts/{account_id}/intel/ip`

Gets the geolocation, ASN, infrastructure type of the ASN, and any security threat categories of an IP address. **Must provide ip query parameters.** For example, `/intel/ip?ipv4=1.1.1.1` or `/intel/ip?ipv6=2001:db8::1`.

### Path Parameters

- `account_id: string`

  Identifier.

### Query Parameters

- `ipv4: optional string`

- `ipv6: optional string`

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

- `result: array of IP`

  - `belongs_to_ref: optional object { id, country, description, 2 more }`

    Specifies a reference to the autonomous systems (AS) that the IP address belongs to.

    - `id: optional string`

    - `country: optional string`

    - `description: optional string`

    - `type: optional "hosting_provider" or "isp" or "organization"`

      Infrastructure type of this ASN.

      - `"hosting_provider"`

      - `"isp"`

      - `"organization"`

    - `value: optional string`

  - `ip: optional string`

  - `risk_types: optional array of object { id, name, super_category_id }`

    - `id: optional number`

    - `name: optional string`

    - `super_category_id: optional number`

- `success: true`

  Whether the API call was successful.

  - `true`

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Total number of results for the requested service.

  - `page: optional number`

    Current page within paginated list of results.

  - `per_page: optional number`

    Number of results per page of results.

  - `total_count: optional number`

    Total results available without any search parameters.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/intel/ip \
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
      "belongs_to_ref": {
        "id": "autonomous-system--2fa28d71-3549-5a38-af05-770b79ad6ea8",
        "country": "US",
        "description": "CLOUDFLARENET",
        "type": "hosting_provider",
        "value": "value"
      },
      "ip": "192.0.2.0",
      "risk_types": [
        {
          "id": 131,
          "name": "Phishing",
          "super_category_id": 21
        }
      ]
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

## Domain Types

### IP

- `IP object { belongs_to_ref, ip, risk_types }`

  - `belongs_to_ref: optional object { id, country, description, 2 more }`

    Specifies a reference to the autonomous systems (AS) that the IP address belongs to.

    - `id: optional string`

    - `country: optional string`

    - `description: optional string`

    - `type: optional "hosting_provider" or "isp" or "organization"`

      Infrastructure type of this ASN.

      - `"hosting_provider"`

      - `"isp"`

      - `"organization"`

    - `value: optional string`

  - `ip: optional string`

  - `risk_types: optional array of object { id, name, super_category_id }`

    - `id: optional number`

    - `name: optional string`

    - `super_category_id: optional number`

### IP Get Response

- `IPGetResponse = array of IP`

  - `belongs_to_ref: optional object { id, country, description, 2 more }`

    Specifies a reference to the autonomous systems (AS) that the IP address belongs to.

    - `id: optional string`

    - `country: optional string`

    - `description: optional string`

    - `type: optional "hosting_provider" or "isp" or "organization"`

      Infrastructure type of this ASN.

      - `"hosting_provider"`

      - `"isp"`

      - `"organization"`

    - `value: optional string`

  - `ip: optional string`

  - `risk_types: optional array of object { id, name, super_category_id }`

    - `id: optional number`

    - `name: optional string`

    - `super_category_id: optional number`

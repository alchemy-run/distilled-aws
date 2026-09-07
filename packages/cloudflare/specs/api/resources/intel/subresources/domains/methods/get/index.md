## Get Domain Details

**get** `/accounts/{account_id}/intel/domain`

Gets security details and statistics about a domain.

### Path Parameters

- `account_id: string`

  Identifier.

### Query Parameters

- `domain: optional string`

- `skip_dns: optional boolean`

  Skip DNS resolution lookups for faster response.

- `skip_ranking: optional boolean`

  Skip the domain ranking lookup for faster responses. Defaults to
  `false` (ranking is included). Set to `true` to opt out — primarily
  used by callers like Cloudflare Radar that need to avoid a
  circular dependency when building the domain details page.
  Note: the bulk endpoint (`/intel/domain/bulk`) uses opposite
  defaults — see `include_ranking` there.

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

- `result: optional Domain`

  - `additional_information: optional object { suspected_malware_family }`

    Additional information related to the host name.

    - `suspected_malware_family: optional string`

      Suspected DGA malware family.

  - `application: optional object { id, name }`

    Application that the hostname belongs to.

    - `id: optional number`

    - `name: optional string`

  - `content_categories: optional array of object { id, name, super_category_id }`

    - `id: optional number`

    - `name: optional string`

    - `super_category_id: optional number`

  - `domain: optional string`

  - `inherited_content_categories: optional array of object { id, name, super_category_id }`

    - `id: optional number`

    - `name: optional string`

    - `super_category_id: optional number`

  - `inherited_from: optional string`

    Domain from which `inherited_content_categories` and `inherited_risk_types` are inherited, if applicable.

  - `inherited_risk_types: optional array of object { id, name, super_category_id }`

    - `id: optional number`

    - `name: optional string`

    - `super_category_id: optional number`

  - `popularity_rank: optional number`

    Global Cloudflare 100k ranking for the last 30 days, if available for the hostname. The top ranked domain is 1, the lowest ranked domain is 100,000.

  - `resolves_to_refs: optional array of object { id, value }`

    Specifies a list of references to one or more IP addresses or domain names that the domain name currently resolves to.

    - `id: optional string`

      STIX 2.1 identifier: https://docs.oasis-open.org/cti/stix/v2.1/cs02/stix-v2.1-cs02.html#_64yvzeku5a5c.

    - `value: optional string`

      IP address or domain name.

  - `risk_score: optional number`

    Hostname risk score, which is a value between 0 (lowest risk) to 1 (highest risk).

  - `risk_types: optional array of object { id, name, super_category_id }`

    - `id: optional number`

    - `name: optional string`

    - `super_category_id: optional number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/intel/domain \
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
    "additional_information": {
      "suspected_malware_family": ""
    },
    "application": {
      "id": 0,
      "name": "CLOUDFLARE"
    },
    "content_categories": [
      {
        "id": 155,
        "name": "Technology",
        "super_category_id": 26
      }
    ],
    "domain": "cloudflare.com",
    "inherited_content_categories": [
      {
        "id": 0,
        "name": "name",
        "super_category_id": 0
      }
    ],
    "inherited_from": "inherited_from",
    "inherited_risk_types": [
      {
        "id": 0,
        "name": "name",
        "super_category_id": 0
      }
    ],
    "popularity_rank": 0,
    "resolves_to_refs": [
      {
        "id": "ipv4-addr--baa568ec-6efe-5902-be55-0663833db537",
        "value": "192.0.2.0"
      }
    ],
    "risk_score": 0,
    "risk_types": [
      {
        "id": 0,
        "name": "name",
        "super_category_id": 0
      }
    ]
  }
}
```

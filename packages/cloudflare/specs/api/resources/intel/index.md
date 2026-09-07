# Intel

# ASN

## Get ASN Overview.

**get** `/accounts/{account_id}/intel/asn/{asn}`

Gets an overview of the Autonomous System Number (ASN) and a list of subnets for it.

### Path Parameters

- `account_id: string`

  Identifier.

- `asn: ASN`

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

- `result: optional ASN`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/intel/asn/$ASN \
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
  "result": 0
}
```

# Subnets

## Get ASN Subnets

**get** `/accounts/{account_id}/intel/asn/{asn}/subnets`

Get ASN Subnets.

### Path Parameters

- `account_id: string`

  Identifier.

- `asn: ASN`

### Returns

- `asn: optional ASN`

- `count: optional number`

  Total results returned based on your search parameters.

- `ip_count_total: optional number`

- `page: optional number`

  Current page within paginated list of results.

- `per_page: optional number`

  Number of results per page of results.

- `subnets: optional array of string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/intel/asn/$ASN/subnets \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "asn": 0,
  "count": 1,
  "ip_count_total": 0,
  "page": 1,
  "per_page": 20,
  "subnets": [
    "192.0.2.0/24",
    "2001:DB8::/32"
  ]
}
```

## Domain Types

### Subnet Get Response

- `SubnetGetResponse object { asn, count, ip_count_total, 3 more }`

  - `asn: optional ASN`

  - `count: optional number`

    Total results returned based on your search parameters.

  - `ip_count_total: optional number`

  - `page: optional number`

    Current page within paginated list of results.

  - `per_page: optional number`

    Number of results per page of results.

  - `subnets: optional array of string`

# DNS

## Get Passive DNS by IP

**get** `/accounts/{account_id}/intel/dns`

Gets a list of all the domains that have resolved to a specific IP address.

### Path Parameters

- `account_id: string`

  Identifier.

### Query Parameters

- `ipv4: optional string`

- `page: optional number`

  Requested page within paginated list of results.

- `per_page: optional number`

  Maximum number of results requested.

- `start_end_params: optional object { end, start }`

  - `end: optional string`

    Defaults to the current date.

  - `start: optional string`

    Defaults to 30 days before the end parameter value.

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

- `result: optional DNS`

  - `count: optional number`

    Total results returned based on your search parameters.

  - `page: optional number`

    Current page within paginated list of results.

  - `per_page: optional number`

    Number of results per page of results.

  - `reverse_records: optional array of object { first_seen, hostname, last_seen }`

    Reverse DNS look-ups observed during the time period.

    - `first_seen: optional string`

      First seen date of the DNS record during the time period.

    - `hostname: optional string`

      Hostname that the IP was observed resolving to.

    - `last_seen: optional string`

      Last seen date of the DNS record during the time period.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/intel/dns \
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
    "count": 1,
    "page": 1,
    "per_page": 20,
    "reverse_records": [
      {
        "first_seen": "2021-04-01",
        "hostname": "hostname",
        "last_seen": "2021-04-30"
      }
    ]
  },
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

## Domain Types

### DNS

- `DNS object { count, page, per_page, reverse_records }`

  - `count: optional number`

    Total results returned based on your search parameters.

  - `page: optional number`

    Current page within paginated list of results.

  - `per_page: optional number`

    Number of results per page of results.

  - `reverse_records: optional array of object { first_seen, hostname, last_seen }`

    Reverse DNS look-ups observed during the time period.

    - `first_seen: optional string`

      First seen date of the DNS record during the time period.

    - `hostname: optional string`

      Hostname that the IP was observed resolving to.

    - `last_seen: optional string`

      Last seen date of the DNS record during the time period.

# Domains

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

## Domain Types

### Domain

- `Domain object { additional_information, application, content_categories, 8 more }`

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

# Bulks

## Get Multiple Domain Details

**get** `/accounts/{account_id}/intel/domain/bulk`

Returns security details and statistics about multiple domains in a
single request.

**Behavior change — domain ranking is becoming opt-in.** This endpoint
previously included domain ranking data in every response and accepted
a `skip_ranking=true` query parameter to opt out. That parameter is
being deprecated and ranking will no longer be returned by default.
Callers that want ranking data must pass `include_ranking=true`. The
`skip_ranking` parameter will be silently ignored once the change ships.

### Path Parameters

- `account_id: string`

  Identifier.

### Query Parameters

- `domain: optional array of string`

  Accepts multiple values like `?domain=cloudflare.com&domain=example.com`.

- `include_ranking: optional boolean`

  Whether to include domain ranking data in the response. Defaults to
  `false` — ranking lookups are expensive at bulk scale and most
  callers do not need them. Set to `true` to opt in. This parameter
  replaces the deprecated `skip_ranking` (see below).

- `skip_ranking: optional boolean`

  **Deprecated.** Previously controlled whether the ranking lookup
  was skipped (defaulted to `false`, meaning ranking ran). The
  endpoint's default behavior is being flipped — ranking is now
  opt-in via `include_ranking=true` — and this parameter will be
  silently ignored. Remove it from your callers and use
  `include_ranking` instead.

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

- `result: array of object { additional_information, application, content_categories, 7 more }`

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

  - `risk_score: optional number`

    Hostname risk score, which is a value between 0 (lowest risk) to 1 (highest risk).

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/intel/domain/bulk \
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
      "risk_score": 0,
      "risk_types": [
        {
          "id": 0,
          "name": "name",
          "super_category_id": 0
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

### Bulk Get Response

- `BulkGetResponse = array of object { additional_information, application, content_categories, 7 more }`

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

  - `risk_score: optional number`

    Hostname risk score, which is a value between 0 (lowest risk) to 1 (highest risk).

  - `risk_types: optional array of object { id, name, super_category_id }`

    - `id: optional number`

    - `name: optional string`

    - `super_category_id: optional number`

# Domain History

## Get Domain History

**get** `/accounts/{account_id}/intel/domain-history`

Gets historical security threat and content categories currently and previously assigned to a domain.

### Path Parameters

- `account_id: string`

  Identifier.

### Query Parameters

- `domain: optional string`

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

- `result: array of DomainHistory`

  - `categorizations: optional array of object { categories, end, start }`

    - `categories: optional array of object { id, name }`

      - `id: optional number`

      - `name: optional string`

    - `end: optional string`

    - `start: optional string`

  - `domain: optional string`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/intel/domain-history \
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
      "categorizations": [
        {
          "categories": [
            {
              "id": 155,
              "name": "Technology"
            }
          ],
          "end": "2021-04-30",
          "start": "2021-04-01"
        }
      ],
      "domain": "cloudflare.com"
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

### Domain History

- `DomainHistory object { categorizations, domain }`

  - `categorizations: optional array of object { categories, end, start }`

    - `categories: optional array of object { id, name }`

      - `id: optional number`

      - `name: optional string`

    - `end: optional string`

    - `start: optional string`

  - `domain: optional string`

### Domain History Get Response

- `DomainHistoryGetResponse = array of DomainHistory`

  - `categorizations: optional array of object { categories, end, start }`

    - `categories: optional array of object { id, name }`

      - `id: optional number`

      - `name: optional string`

    - `end: optional string`

    - `start: optional string`

  - `domain: optional string`

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

# IP Lists

## Domain Types

### IP List

- `IPList object { id, description, name }`

  - `id: optional number`

  - `description: optional string`

  - `name: optional string`

# Miscategorizations

## Create Miscategorization

**post** `/accounts/{account_id}/intel/miscategorization`

Allows you to submit requests to change a domain’s category.

Requests that include category `169` (New Domains) or category `177` (Newly Seen)
in any of `content_adds`, `content_removes`, `security_adds`, or `security_removes`
will be rejected with a `400 Bad Request`. These categories are automatically
managed and fall off 30 days after they are applied.

### Path Parameters

- `account_id: string`

  Identifier.

### Body Parameters

- `content_adds: optional array of number`

  Content category IDs to add.

- `content_removes: optional array of number`

  Content category IDs to remove.

- `indicator_type: optional "domain" or "ipv4" or "ipv6" or "url"`

  - `"domain"`

  - `"ipv4"`

  - `"ipv6"`

  - `"url"`

- `ip: optional string`

  Provide only if indicator_type is `ipv4` or `ipv6`.

- `security_adds: optional array of number`

  Security category IDs to add.

- `security_removes: optional array of number`

  Security category IDs to remove.

- `url: optional string`

  Provide only if indicator_type is `domain` or `url`. Example if indicator_type is `domain`: `example.com`. Example if indicator_type is `url`: `https://example.com/news/`.

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/intel/miscategorization \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "content_adds": [
            82
          ],
          "content_removes": [
            155
          ],
          "indicator_type": "domain",
          "security_adds": [
            117,
            131
          ],
          "security_removes": [
            83
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
  "success": true
}
```

## Domain Types

### Miscategorization Create Response

- `MiscategorizationCreateResponse object { errors, messages, success }`

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

# Whois

## Get WHOIS Record

**get** `/accounts/{account_id}/intel/whois`

Retrieves WHOIS registration data for a domain, including registrant and nameserver information.

### Path Parameters

- `account_id: string`

  Use to uniquely identify or reference the resource.

### Query Parameters

- `domain: optional string`

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

  Returns a boolean for the success/failure of the API call.

  - `true`

- `result: optional object { dnssec, domain, extension, 84 more }`

  - `dnssec: boolean`

  - `domain: string`

  - `extension: string`

  - `found: boolean`

  - `nameservers: array of string`

  - `punycode: string`

  - `registrant: string`

  - `registrar: string`

  - `id: optional string`

  - `administrative_city: optional string`

  - `administrative_country: optional string`

  - `administrative_email: optional string`

  - `administrative_fax: optional string`

  - `administrative_fax_ext: optional string`

  - `administrative_id: optional string`

  - `administrative_name: optional string`

  - `administrative_org: optional string`

  - `administrative_phone: optional string`

  - `administrative_phone_ext: optional string`

  - `administrative_postal_code: optional string`

  - `administrative_province: optional string`

  - `administrative_referral_url: optional string`

  - `administrative_street: optional string`

  - `billing_city: optional string`

  - `billing_country: optional string`

  - `billing_email: optional string`

  - `billing_fax: optional string`

  - `billing_fax_ext: optional string`

  - `billing_id: optional string`

  - `billing_name: optional string`

  - `billing_org: optional string`

  - `billing_phone: optional string`

  - `billing_phone_ext: optional string`

  - `billing_postal_code: optional string`

  - `billing_province: optional string`

  - `billing_referral_url: optional string`

  - `billing_street: optional string`

  - `created_date: optional string`

  - `created_date_raw: optional string`

  - `expiration_date: optional string`

  - `expiration_date_raw: optional string`

  - `registrant_city: optional string`

  - `registrant_country: optional string`

  - `registrant_email: optional string`

  - `registrant_fax: optional string`

  - `registrant_fax_ext: optional string`

  - `registrant_id: optional string`

  - `registrant_name: optional string`

  - `registrant_org: optional string`

  - `registrant_phone: optional string`

  - `registrant_phone_ext: optional string`

  - `registrant_postal_code: optional string`

  - `registrant_province: optional string`

  - `registrant_referral_url: optional string`

  - `registrant_street: optional string`

  - `registrar_city: optional string`

  - `registrar_country: optional string`

  - `registrar_email: optional string`

  - `registrar_fax: optional string`

  - `registrar_fax_ext: optional string`

  - `registrar_id: optional string`

  - `registrar_name: optional string`

  - `registrar_org: optional string`

  - `registrar_phone: optional string`

  - `registrar_phone_ext: optional string`

  - `registrar_postal_code: optional string`

  - `registrar_province: optional string`

  - `registrar_referral_url: optional string`

  - `registrar_street: optional string`

  - `status: optional array of string`

  - `technical_city: optional string`

  - `technical_country: optional string`

  - `technical_email: optional string`

  - `technical_fax: optional string`

  - `technical_fax_ext: optional string`

  - `technical_id: optional string`

  - `technical_name: optional string`

  - `technical_org: optional string`

  - `technical_phone: optional string`

  - `technical_phone_ext: optional string`

  - `technical_postal_code: optional string`

  - `technical_province: optional string`

  - `technical_referral_url: optional string`

  - `technical_street: optional string`

  - `updated_date: optional string`

  - `updated_date_raw: optional string`

  - `whois_server: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/intel/whois \
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
    "dnssec": true,
    "domain": "cloudflare.com",
    "extension": "com",
    "found": true,
    "nameservers": [
      "ns3.cloudflare.com",
      "ns4.cloudflare.com",
      "ns5.cloudflare.com",
      "ns6.cloudflare.com",
      "ns7.cloudflare.com"
    ],
    "punycode": "cloudflare.com",
    "registrant": "registrant",
    "registrar": "Cloudflare, Inc.",
    "id": "1542998887_DOMAIN_COM-VRSN",
    "administrative_city": "administrative_city",
    "administrative_country": "administrative_country",
    "administrative_email": "administrative_email",
    "administrative_fax": "administrative_fax",
    "administrative_fax_ext": "administrative_fax_ext",
    "administrative_id": "administrative_id",
    "administrative_name": "administrative_name",
    "administrative_org": "administrative_org",
    "administrative_phone": "administrative_phone",
    "administrative_phone_ext": "administrative_phone_ext",
    "administrative_postal_code": "administrative_postal_code",
    "administrative_province": "administrative_province",
    "administrative_referral_url": "administrative_referral_url",
    "administrative_street": "administrative_street",
    "billing_city": "billing_city",
    "billing_country": "billing_country",
    "billing_email": "billing_email",
    "billing_fax": "billing_fax",
    "billing_fax_ext": "billing_fax_ext",
    "billing_id": "billing_id",
    "billing_name": "billing_name",
    "billing_org": "billing_org",
    "billing_phone": "billing_phone",
    "billing_phone_ext": "billing_phone_ext",
    "billing_postal_code": "billing_postal_code",
    "billing_province": "billing_province",
    "billing_referral_url": "billing_referral_url",
    "billing_street": "billing_street",
    "created_date": "2009-02-17T22:07:54.000Z",
    "created_date_raw": "2009-02-17T22:07:54Z",
    "expiration_date": "2033-02-17T22:07:54.000Z",
    "expiration_date_raw": "2033-02-17T22:07:54Z",
    "registrant_city": "registrant_city",
    "registrant_country": "registrant_country",
    "registrant_email": "registrant_email",
    "registrant_fax": "registrant_fax",
    "registrant_fax_ext": "registrant_fax_ext",
    "registrant_id": "registrant_id",
    "registrant_name": "registrant_name",
    "registrant_org": "registrant_org",
    "registrant_phone": "registrant_phone",
    "registrant_phone_ext": "registrant_phone_ext",
    "registrant_postal_code": "registrant_postal_code",
    "registrant_province": "registrant_province",
    "registrant_referral_url": "registrant_referral_url",
    "registrant_street": "registrant_street",
    "registrar_city": "registrar_city",
    "registrar_country": "registrar_country",
    "registrar_email": "registrar_email",
    "registrar_fax": "registrar_fax",
    "registrar_fax_ext": "registrar_fax_ext",
    "registrar_id": "registrar_id",
    "registrar_name": "registrar_name",
    "registrar_org": "registrar_org",
    "registrar_phone": "registrar_phone",
    "registrar_phone_ext": "registrar_phone_ext",
    "registrar_postal_code": "registrar_postal_code",
    "registrar_province": "registrar_province",
    "registrar_referral_url": "registrar_referral_url",
    "registrar_street": "registrar_street",
    "status": [
      "clientdeleteprohibited",
      "clienttransferprohibited",
      "clientupdateprohibited",
      "serverdeleteprohibited",
      "servertransferprohibited",
      "serverupdateprohibited"
    ],
    "technical_city": "technical_city",
    "technical_country": "technical_country",
    "technical_email": "technical_email",
    "technical_fax": "technical_fax",
    "technical_fax_ext": "technical_fax_ext",
    "technical_id": "technical_id",
    "technical_name": "technical_name",
    "technical_org": "technical_org",
    "technical_phone": "technical_phone",
    "technical_phone_ext": "technical_phone_ext",
    "technical_postal_code": "technical_postal_code",
    "technical_province": "technical_province",
    "technical_referral_url": "technical_referral_url",
    "technical_street": "technical_street",
    "updated_date": "2024-01-09T16:45:28.000Z",
    "updated_date_raw": "2024-01-09T16:45:28Z",
    "whois_server": "whois.cloudflare.com"
  }
}
```

## Domain Types

### Whois

- `Whois object { created_date, domain, nameservers, 6 more }`

  - `created_date: optional string`

  - `domain: optional string`

  - `nameservers: optional array of string`

  - `registrant: optional string`

  - `registrant_country: optional string`

  - `registrant_email: optional string`

  - `registrant_org: optional string`

  - `registrar: optional string`

  - `updated_date: optional string`

### Whois Get Response

- `WhoisGetResponse object { dnssec, domain, extension, 84 more }`

  - `dnssec: boolean`

  - `domain: string`

  - `extension: string`

  - `found: boolean`

  - `nameservers: array of string`

  - `punycode: string`

  - `registrant: string`

  - `registrar: string`

  - `id: optional string`

  - `administrative_city: optional string`

  - `administrative_country: optional string`

  - `administrative_email: optional string`

  - `administrative_fax: optional string`

  - `administrative_fax_ext: optional string`

  - `administrative_id: optional string`

  - `administrative_name: optional string`

  - `administrative_org: optional string`

  - `administrative_phone: optional string`

  - `administrative_phone_ext: optional string`

  - `administrative_postal_code: optional string`

  - `administrative_province: optional string`

  - `administrative_referral_url: optional string`

  - `administrative_street: optional string`

  - `billing_city: optional string`

  - `billing_country: optional string`

  - `billing_email: optional string`

  - `billing_fax: optional string`

  - `billing_fax_ext: optional string`

  - `billing_id: optional string`

  - `billing_name: optional string`

  - `billing_org: optional string`

  - `billing_phone: optional string`

  - `billing_phone_ext: optional string`

  - `billing_postal_code: optional string`

  - `billing_province: optional string`

  - `billing_referral_url: optional string`

  - `billing_street: optional string`

  - `created_date: optional string`

  - `created_date_raw: optional string`

  - `expiration_date: optional string`

  - `expiration_date_raw: optional string`

  - `registrant_city: optional string`

  - `registrant_country: optional string`

  - `registrant_email: optional string`

  - `registrant_fax: optional string`

  - `registrant_fax_ext: optional string`

  - `registrant_id: optional string`

  - `registrant_name: optional string`

  - `registrant_org: optional string`

  - `registrant_phone: optional string`

  - `registrant_phone_ext: optional string`

  - `registrant_postal_code: optional string`

  - `registrant_province: optional string`

  - `registrant_referral_url: optional string`

  - `registrant_street: optional string`

  - `registrar_city: optional string`

  - `registrar_country: optional string`

  - `registrar_email: optional string`

  - `registrar_fax: optional string`

  - `registrar_fax_ext: optional string`

  - `registrar_id: optional string`

  - `registrar_name: optional string`

  - `registrar_org: optional string`

  - `registrar_phone: optional string`

  - `registrar_phone_ext: optional string`

  - `registrar_postal_code: optional string`

  - `registrar_province: optional string`

  - `registrar_referral_url: optional string`

  - `registrar_street: optional string`

  - `status: optional array of string`

  - `technical_city: optional string`

  - `technical_country: optional string`

  - `technical_email: optional string`

  - `technical_fax: optional string`

  - `technical_fax_ext: optional string`

  - `technical_id: optional string`

  - `technical_name: optional string`

  - `technical_org: optional string`

  - `technical_phone: optional string`

  - `technical_phone_ext: optional string`

  - `technical_postal_code: optional string`

  - `technical_province: optional string`

  - `technical_referral_url: optional string`

  - `technical_street: optional string`

  - `updated_date: optional string`

  - `updated_date_raw: optional string`

  - `whois_server: optional string`

# Indicator Feeds

## Get indicator feeds owned by this account

**get** `/accounts/{account_id}/intel/indicator-feeds`

Retrieves details for all accessible custom threat indicator feeds.

### Path Parameters

- `account_id: string`

  Identifier

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

- `result: optional array of object { id, created_on, description, 5 more }`

  - `id: optional number`

    The unique identifier for the indicator feed

  - `created_on: optional string`

    The date and time when the data entry was created

  - `description: optional string`

    The description of the example test

  - `is_attributable: optional boolean`

    Whether the indicator feed can be attributed to a provider

  - `is_downloadable: optional boolean`

    Whether the indicator feed can be downloaded

  - `is_public: optional boolean`

    Whether the indicator feed is exposed to customers

  - `modified_on: optional string`

    The date and time when the data entry was last modified

  - `name: optional string`

    The name of the indicator feed

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/intel/indicator-feeds \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
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
  "result": [
    {
      "id": 1,
      "created_on": "2023-05-12T12:21:56.777653Z",
      "description": "user specified description 1",
      "is_attributable": false,
      "is_downloadable": false,
      "is_public": false,
      "modified_on": "2023-06-18T03:13:34.123321Z",
      "name": "user_specified_name_1"
    },
    {
      "id": 2,
      "created_on": "2023-05-21T21:43:52.867525Z",
      "description": "User specified description 2",
      "is_attributable": false,
      "is_downloadable": false,
      "is_public": false,
      "modified_on": "2023-06-28T18:46:18.764425Z",
      "name": "user_specified_name_2"
    }
  ]
}
```

## Get indicator feed metadata

**get** `/accounts/{account_id}/intel/indicator-feeds/{feed_id}`

Retrieves details for a specific custom threat indicator feed.

### Path Parameters

- `account_id: string`

  Identifier

- `feed_id: number`

  Indicator feed ID

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

- `result: optional object { id, created_on, description, 10 more }`

  - `id: optional number`

    The unique identifier for the indicator feed

  - `created_on: optional string`

    The date and time when the data entry was created

  - `description: optional string`

    The description of the example test

  - `is_attributable: optional boolean`

    Whether the indicator feed can be attributed to a provider

  - `is_downloadable: optional boolean`

    Whether the indicator feed can be downloaded

  - `is_public: optional boolean`

    Whether the indicator feed is exposed to customers

  - `last_upload_summary: optional object { persisted, skipped, uploaded }`

    Summary of indicator counts from the last successful upload to this
    feed. Populated by the custom-threat-feeds loader at the end of each
    successful load. Absent (omitted) when no upload has completed
    successfully or the upload errored before the summary write.
    Surfaces silent-failure paths so operators can see when their
    indicators were dropped (popularity allowlist, expired valid_until,
    etc.) without reading loader logs.

    - `persisted: optional object { domains_added, domains_removed, ips_added, 3 more }`

      Net delta applied to feed indicators by this upload. Snapshot
      uploads emit both *_added and *_removed; delta-add emits only
      \*_added; delta-remove emits only *_removed.

      - `domains_added: optional number`

      - `domains_removed: optional number`

      - `ips_added: optional number`

      - `ips_removed: optional number`

      - `urls_added: optional number`

      - `urls_removed: optional number`

    - `skipped: optional object { allowlisted_domains, expired_indicators, invalid_indicators }`

      Counts of indicators that were uploaded but did not reach
      QuickSilver, broken down by reason.

      - `allowlisted_domains: optional number`

        Domains filtered by the global popularity allowlist at QS
        provisioning time. Popular domains (bing.com, naver.com,
        etc.) are protected from custom-threat-feed enforcement.

      - `expired_indicators: optional number`

        Indicators in the upload whose valid_until is already in
        the past. These are not added to QS; the expiration cron
        handles cleanup.

      - `invalid_indicators: optional number`

        Reserved for future use. Currently always 0 — the unifier
        aborts the entire upload on a single bad indicator.

    - `uploaded: optional object { domains, ips, urls }`

      Indicator counts from the unified file the loader received

      - `domains: optional number`

        Number of domain indicators in the upload

      - `ips: optional number`

        Number of IP indicators in the upload

      - `urls: optional number`

        Number of URL indicators in the upload

  - `latest_upload_error: optional string`

    Human-readable error message describing why the latest upload
    failed. Populated only when `latest_upload_status` is `Error`.
    Returns one of a small fixed set of category-level messages
    (invalid domain / IP / URL entries, malformed row or header,
    invalid valid_until timestamp, etc.) or the generic
    `Upload failed` for unknown or infrastructure-level errors.
    Never echoes raw error text from the underlying loader.
    Intel accounts receive the verbatim loader/API error text
    (including specific offending values) instead of these
    category-level messages.

  - `latest_upload_status: optional "Mirroring" or "Unifying" or "Loading" or 3 more`

    Status of the latest snapshot uploaded

    - `"Mirroring"`

    - `"Unifying"`

    - `"Loading"`

    - `"Provisioning"`

    - `"Complete"`

    - `"Error"`

  - `modified_on: optional string`

    The date and time when the data entry was last modified

  - `name: optional string`

    The name of the indicator feed

  - `provider_id: optional number`

    The unique identifier for the provider

  - `provider_name: optional string`

    The provider of the indicator feed

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/intel/indicator-feeds/$FEED_ID \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
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
    "id": 1,
    "created_on": "2023-05-12T12:21:56.777653Z",
    "description": "example feed description",
    "is_attributable": false,
    "is_downloadable": false,
    "is_public": false,
    "last_upload_summary": {
      "persisted": {
        "domains_added": 2,
        "domains_removed": 1,
        "ips_added": 0,
        "ips_removed": 0,
        "urls_added": 0,
        "urls_removed": 0
      },
      "skipped": {
        "allowlisted_domains": 1,
        "expired_indicators": 0,
        "invalid_indicators": 0
      },
      "uploaded": {
        "domains": 3,
        "ips": 0,
        "urls": 0
      }
    },
    "latest_upload_error": "Feed contains one or more invalid domain entries. Check your feed for wildcards or other values that are not valid DNS names.",
    "latest_upload_status": "Complete",
    "modified_on": "2023-06-18T03:13:34.123321Z",
    "name": "example_feed_1",
    "provider_id": 1,
    "provider_name": "provider_name"
  }
}
```

## Create new indicator feed

**post** `/accounts/{account_id}/intel/indicator-feeds`

Creates a new custom threat indicator feed for sharing threat intelligence data.

### Path Parameters

- `account_id: string`

  Identifier

### Body Parameters

- `description: optional string`

  The description of the example test

- `name: optional string`

  The name of the indicator feed

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

- `result: optional object { id, created_on, description, 5 more }`

  - `id: optional number`

    The unique identifier for the indicator feed

  - `created_on: optional string`

    The date and time when the data entry was created

  - `description: optional string`

    The description of the example test

  - `is_attributable: optional boolean`

    Whether the indicator feed can be attributed to a provider

  - `is_downloadable: optional boolean`

    Whether the indicator feed can be downloaded

  - `is_public: optional boolean`

    Whether the indicator feed is exposed to customers

  - `modified_on: optional string`

    The date and time when the data entry was last modified

  - `name: optional string`

    The name of the indicator feed

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/intel/indicator-feeds \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{}'
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
    "id": 1,
    "created_on": "2023-05-12T12:21:56.777653Z",
    "description": "example feed description",
    "is_attributable": false,
    "is_downloadable": false,
    "is_public": false,
    "modified_on": "2023-06-18T03:13:34.123321Z",
    "name": "example_feed_1"
  }
}
```

## Update indicator feed metadata

**put** `/accounts/{account_id}/intel/indicator-feeds/{feed_id}`

Revises details for a specific custom threat indicator feed.

### Path Parameters

- `account_id: string`

  Identifier

- `feed_id: number`

  Indicator feed ID

### Body Parameters

- `description: optional string`

  The new description of the feed

- `is_attributable: optional boolean`

  The new is_attributable value of the feed

- `is_downloadable: optional boolean`

  The new is_downloadable value of the feed

- `is_public: optional boolean`

  The new is_public value of the feed

- `name: optional string`

  The new name of the feed

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

- `result: optional object { id, created_on, description, 5 more }`

  - `id: optional number`

    The unique identifier for the indicator feed

  - `created_on: optional string`

    The date and time when the data entry was created

  - `description: optional string`

    The description of the example test

  - `is_attributable: optional boolean`

    Whether the indicator feed can be attributed to a provider

  - `is_downloadable: optional boolean`

    Whether the indicator feed can be downloaded

  - `is_public: optional boolean`

    Whether the indicator feed is exposed to customers

  - `modified_on: optional string`

    The date and time when the data entry was last modified

  - `name: optional string`

    The name of the indicator feed

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/intel/indicator-feeds/$FEED_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "description": "This is an example description",
          "is_attributable": true,
          "is_downloadable": true,
          "is_public": true,
          "name": "indicator_list"
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
    "id": 1,
    "created_on": "2023-05-12T12:21:56.777653Z",
    "description": "example feed description",
    "is_attributable": false,
    "is_downloadable": false,
    "is_public": false,
    "modified_on": "2023-06-18T03:13:34.123321Z",
    "name": "example_feed_1"
  }
}
```

## Get indicator feed data

**get** `/accounts/{account_id}/intel/indicator-feeds/{feed_id}/data`

Retrieves the raw data entries in a custom threat indicator feed.

### Path Parameters

- `account_id: string`

  Identifier

- `feed_id: number`

  Indicator feed ID

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/intel/indicator-feeds/$FEED_ID/data \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
```

## Domain Types

### Indicator Feed List Response

- `IndicatorFeedListResponse object { id, created_on, description, 5 more }`

  - `id: optional number`

    The unique identifier for the indicator feed

  - `created_on: optional string`

    The date and time when the data entry was created

  - `description: optional string`

    The description of the example test

  - `is_attributable: optional boolean`

    Whether the indicator feed can be attributed to a provider

  - `is_downloadable: optional boolean`

    Whether the indicator feed can be downloaded

  - `is_public: optional boolean`

    Whether the indicator feed is exposed to customers

  - `modified_on: optional string`

    The date and time when the data entry was last modified

  - `name: optional string`

    The name of the indicator feed

### Indicator Feed Get Response

- `IndicatorFeedGetResponse object { id, created_on, description, 10 more }`

  - `id: optional number`

    The unique identifier for the indicator feed

  - `created_on: optional string`

    The date and time when the data entry was created

  - `description: optional string`

    The description of the example test

  - `is_attributable: optional boolean`

    Whether the indicator feed can be attributed to a provider

  - `is_downloadable: optional boolean`

    Whether the indicator feed can be downloaded

  - `is_public: optional boolean`

    Whether the indicator feed is exposed to customers

  - `last_upload_summary: optional object { persisted, skipped, uploaded }`

    Summary of indicator counts from the last successful upload to this
    feed. Populated by the custom-threat-feeds loader at the end of each
    successful load. Absent (omitted) when no upload has completed
    successfully or the upload errored before the summary write.
    Surfaces silent-failure paths so operators can see when their
    indicators were dropped (popularity allowlist, expired valid_until,
    etc.) without reading loader logs.

    - `persisted: optional object { domains_added, domains_removed, ips_added, 3 more }`

      Net delta applied to feed indicators by this upload. Snapshot
      uploads emit both *_added and *_removed; delta-add emits only
      \*_added; delta-remove emits only *_removed.

      - `domains_added: optional number`

      - `domains_removed: optional number`

      - `ips_added: optional number`

      - `ips_removed: optional number`

      - `urls_added: optional number`

      - `urls_removed: optional number`

    - `skipped: optional object { allowlisted_domains, expired_indicators, invalid_indicators }`

      Counts of indicators that were uploaded but did not reach
      QuickSilver, broken down by reason.

      - `allowlisted_domains: optional number`

        Domains filtered by the global popularity allowlist at QS
        provisioning time. Popular domains (bing.com, naver.com,
        etc.) are protected from custom-threat-feed enforcement.

      - `expired_indicators: optional number`

        Indicators in the upload whose valid_until is already in
        the past. These are not added to QS; the expiration cron
        handles cleanup.

      - `invalid_indicators: optional number`

        Reserved for future use. Currently always 0 — the unifier
        aborts the entire upload on a single bad indicator.

    - `uploaded: optional object { domains, ips, urls }`

      Indicator counts from the unified file the loader received

      - `domains: optional number`

        Number of domain indicators in the upload

      - `ips: optional number`

        Number of IP indicators in the upload

      - `urls: optional number`

        Number of URL indicators in the upload

  - `latest_upload_error: optional string`

    Human-readable error message describing why the latest upload
    failed. Populated only when `latest_upload_status` is `Error`.
    Returns one of a small fixed set of category-level messages
    (invalid domain / IP / URL entries, malformed row or header,
    invalid valid_until timestamp, etc.) or the generic
    `Upload failed` for unknown or infrastructure-level errors.
    Never echoes raw error text from the underlying loader.
    Intel accounts receive the verbatim loader/API error text
    (including specific offending values) instead of these
    category-level messages.

  - `latest_upload_status: optional "Mirroring" or "Unifying" or "Loading" or 3 more`

    Status of the latest snapshot uploaded

    - `"Mirroring"`

    - `"Unifying"`

    - `"Loading"`

    - `"Provisioning"`

    - `"Complete"`

    - `"Error"`

  - `modified_on: optional string`

    The date and time when the data entry was last modified

  - `name: optional string`

    The name of the indicator feed

  - `provider_id: optional number`

    The unique identifier for the provider

  - `provider_name: optional string`

    The provider of the indicator feed

### Indicator Feed Create Response

- `IndicatorFeedCreateResponse object { id, created_on, description, 5 more }`

  - `id: optional number`

    The unique identifier for the indicator feed

  - `created_on: optional string`

    The date and time when the data entry was created

  - `description: optional string`

    The description of the example test

  - `is_attributable: optional boolean`

    Whether the indicator feed can be attributed to a provider

  - `is_downloadable: optional boolean`

    Whether the indicator feed can be downloaded

  - `is_public: optional boolean`

    Whether the indicator feed is exposed to customers

  - `modified_on: optional string`

    The date and time when the data entry was last modified

  - `name: optional string`

    The name of the indicator feed

### Indicator Feed Update Response

- `IndicatorFeedUpdateResponse object { id, created_on, description, 5 more }`

  - `id: optional number`

    The unique identifier for the indicator feed

  - `created_on: optional string`

    The date and time when the data entry was created

  - `description: optional string`

    The description of the example test

  - `is_attributable: optional boolean`

    Whether the indicator feed can be attributed to a provider

  - `is_downloadable: optional boolean`

    Whether the indicator feed can be downloaded

  - `is_public: optional boolean`

    Whether the indicator feed is exposed to customers

  - `modified_on: optional string`

    The date and time when the data entry was last modified

  - `name: optional string`

    The name of the indicator feed

### Indicator Feed Data Response

- `IndicatorFeedDataResponse = string`

# Snapshots

## Update indicator feed data

**put** `/accounts/{account_id}/intel/indicator-feeds/{feed_id}/snapshot`

Revises the raw data entries in a custom threat indicator feed.

Accepts both plain and gzipped STIX2/CRDF bodies. Gzip is
detected by RFC 1952 magic bytes (`0x1f 0x8b`) and/or a `.gz`
filename suffix (case-insensitive) — either signal alone is
sufficient to trigger the gzip path; if the body is not valid
gzip, the upload fails fast. Customers are encouraged to gzip
larger uploads — the api-gateway 500 MB body cap applies to
the on-the-wire (compressed) size, so gzip lets a single
upload carry several GiB of decompressed STIX.

### Path Parameters

- `account_id: string`

  Identifier

- `feed_id: number`

  Indicator feed ID

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

- `result: optional object { file_id, filename, status }`

  - `file_id: optional number`

    Feed id

  - `filename: optional string`

    Name of the file unified in our system

  - `status: optional string`

    Current status of upload, should be unified

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/intel/indicator-feeds/$FEED_ID/snapshot \
    -X PUT \
    -H 'Content-Type: multipart/form-data' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -F source=@/Users/me/test.stix2.gz
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
    "file_id": 1,
    "filename": "snapshot_file.unified",
    "status": "unified"
  }
}
```

## Domain Types

### Snapshot Update Response

- `SnapshotUpdateResponse object { file_id, filename, status }`

  - `file_id: optional number`

    Feed id

  - `filename: optional string`

    Name of the file unified in our system

  - `status: optional string`

    Current status of upload, should be unified

# Permissions

## List indicator feed permissions

**get** `/accounts/{account_id}/intel/indicator-feeds/permissions/view`

Lists current access permissions for custom threat indicator feeds.

### Path Parameters

- `account_id: string`

  Identifier

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

- `result: optional array of object { id, description, is_attributable, 3 more }`

  - `id: optional number`

    The unique identifier for the indicator feed

  - `description: optional string`

    The description of the example test

  - `is_attributable: optional boolean`

    Whether the indicator feed can be attributed to a provider

  - `is_downloadable: optional boolean`

    Whether the indicator feed can be downloaded

  - `is_public: optional boolean`

    Whether the indicator feed is exposed to customers

  - `name: optional string`

    The name of the indicator feed

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/intel/indicator-feeds/permissions/view \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
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
  "result": [
    {
      "id": 1,
      "description": "An important indicator list",
      "is_attributable": false,
      "is_downloadable": false,
      "is_public": false,
      "name": "indicator_list_1"
    },
    {
      "id": 2,
      "description": "An even more important indicator list",
      "is_attributable": true,
      "is_downloadable": false,
      "is_public": true,
      "name": "indicator_list_2"
    }
  ]
}
```

## Grant permission to indicator feed

**put** `/accounts/{account_id}/intel/indicator-feeds/permissions/add`

Grants access permissions for a custom threat indicator feed to other accounts.

### Path Parameters

- `account_id: string`

  Identifier

### Body Parameters

- `account_tag: optional string`

  The Cloudflare account tag of the account to change permissions on

- `feed_id: optional number`

  The ID of the feed to add/remove permissions on

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

- `result: optional object { success }`

  - `success: optional boolean`

    Whether the update succeeded or not

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/intel/indicator-feeds/permissions/add \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "account_tag": "823f45f16fd2f7e21e1e054aga4d2859",
          "feed_id": 1
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
    "success": true
  }
}
```

## Revoke permission to indicator feed

**put** `/accounts/{account_id}/intel/indicator-feeds/permissions/remove`

Revokes access permissions for a custom threat indicator feed.

### Path Parameters

- `account_id: string`

  Identifier

### Body Parameters

- `account_tag: optional string`

  The Cloudflare account tag of the account to change permissions on

- `feed_id: optional number`

  The ID of the feed to add/remove permissions on

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

- `result: optional object { success }`

  - `success: optional boolean`

    Whether the update succeeded or not

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/intel/indicator-feeds/permissions/remove \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "account_tag": "823f45f16fd2f7e21e1e054aga4d2859",
          "feed_id": 1
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
    "success": true
  }
}
```

## Domain Types

### Permission List Response

- `PermissionListResponse = array of object { id, description, is_attributable, 3 more }`

  - `id: optional number`

    The unique identifier for the indicator feed

  - `description: optional string`

    The description of the example test

  - `is_attributable: optional boolean`

    Whether the indicator feed can be attributed to a provider

  - `is_downloadable: optional boolean`

    Whether the indicator feed can be downloaded

  - `is_public: optional boolean`

    Whether the indicator feed is exposed to customers

  - `name: optional string`

    The name of the indicator feed

### Permission Create Response

- `PermissionCreateResponse object { success }`

  - `success: optional boolean`

    Whether the update succeeded or not

### Permission Delete Response

- `PermissionDeleteResponse object { success }`

  - `success: optional boolean`

    Whether the update succeeded or not

# Downloads

# Sinkholes

## List sinkholes owned by this account

**get** `/accounts/{account_id}/intel/sinkholes`

Lists sinkholes owned by the account for redirecting malicious traffic.

### Path Parameters

- `account_id: string`

  Identifier.

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

- `result: optional array of Sinkhole`

  - `id: optional string`

    The unique identifier for the sinkhole.

  - `account_tag: optional string`

    The account tag that owns this sinkhole.

  - `created_on: optional string`

    The date and time when the sinkhole was created.

  - `modified_on: optional string`

    The date and time when the sinkhole was last modified.

  - `name: optional string`

    The name of the sinkhole.

  - `r2_bucket: optional string`

    The name of the R2 bucket to store results.

  - `r2_id: optional string`

    The id of the R2 instance.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/intel/sinkholes \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
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
  "result": [
    {
      "id": "93defa6e909e464e8c89a85859f36d3c",
      "account_tag": "233f45e61fd1f7e21e1e154ede4q2859",
      "created_on": "2023-05-12T12:21:56.777653Z",
      "modified_on": "2023-06-18T03:13:34.123321Z",
      "name": "my_sinkhole",
      "r2_bucket": "my_bucket",
      "r2_id": "example_r2_id"
    }
  ]
}
```

## Domain Types

### Sinkhole

- `Sinkhole object { id, account_tag, created_on, 4 more }`

  - `id: optional string`

    The unique identifier for the sinkhole.

  - `account_tag: optional string`

    The account tag that owns this sinkhole.

  - `created_on: optional string`

    The date and time when the sinkhole was created.

  - `modified_on: optional string`

    The date and time when the sinkhole was last modified.

  - `name: optional string`

    The name of the sinkhole.

  - `r2_bucket: optional string`

    The name of the R2 bucket to store results.

  - `r2_id: optional string`

    The id of the R2 instance.

# Attack Surface Report

# Issue Types

## Retrieves Security Center Issues Types

**get** `/accounts/{account_id}/intel/attack-surface-report/issue-types`

Lists all available issue types in Security Center, describing categories of security issues.

### Path Parameters

- `account_id: string`

  Identifier.

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

- `result: optional array of string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/intel/attack-surface-report/issue-types \
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
  "result": [
    "string"
  ]
}
```

## Domain Types

### Issue Type Get Response

- `IssueTypeGetResponse = string`

# Issues

## Retrieves Security Center Issues

**get** `/accounts/{account_id}/intel/attack-surface-report/issues`

Lists all Security Center issues for the account, showing active security problems requiring attention.

### Path Parameters

- `account_id: string`

  Identifier.

### Query Parameters

- `dismissed: optional boolean`

- `issue_class: optional array of string`

- `"issue_class~neq": optional array of string`

- `issue_type: optional array of IssueType`

  - `"compliance_violation"`

  - `"email_security"`

  - `"exposed_infrastructure"`

  - `"insecure_configuration"`

  - `"weak_authentication"`

  - `"configuration_suggestion"`

- `"issue_type~neq": optional array of IssueType`

  - `"compliance_violation"`

  - `"email_security"`

  - `"exposed_infrastructure"`

  - `"insecure_configuration"`

  - `"weak_authentication"`

  - `"configuration_suggestion"`

- `page: optional number`

  Specifies the current page within paginated list of results.

- `per_page: optional number`

  Sets the number of results per page of results.

- `product: optional array of string`

- `"product~neq": optional array of string`

- `severity: optional array of SeverityQueryParam`

  - `"low"`

  - `"moderate"`

  - `"critical"`

- `"severity~neq": optional array of SeverityQueryParam`

  - `"low"`

  - `"moderate"`

  - `"critical"`

- `subject: optional array of string`

- `"subject~neq": optional array of string`

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

- `result: optional object { count, issues, page, per_page }`

  - `count: optional number`

    Indicates the total number of results.

  - `issues: optional array of object { id, dismissed, has_extended_context, 11 more }`

    - `id: optional string`

    - `dismissed: optional boolean`

    - `has_extended_context: optional boolean`

      Indicates whether the insight has a large payload that requires fetching via the context endpoint.

    - `issue_class: optional string`

    - `issue_type: optional IssueType`

      - `"compliance_violation"`

      - `"email_security"`

      - `"exposed_infrastructure"`

      - `"insecure_configuration"`

      - `"weak_authentication"`

      - `"configuration_suggestion"`

    - `payload: optional object { detection_method, zone_tag }`

      - `detection_method: optional string`

        Describes the method used to detect insight.

      - `zone_tag: optional string`

    - `resolve_link: optional string`

    - `resolve_text: optional string`

    - `severity: optional "Low" or "Moderate" or "Critical"`

      - `"Low"`

      - `"Moderate"`

      - `"Critical"`

    - `since: optional string`

    - `status: optional "active" or "resolved"`

      The current status of the insight.

      - `"active"`

      - `"resolved"`

    - `subject: optional string`

    - `timestamp: optional string`

    - `user_classification: optional "false_positive" or "accept_risk" or "other"`

      User-defined classification for the insight. Can be 'false_positive', 'accept_risk', 'other', or null.

      - `"false_positive"`

      - `"accept_risk"`

      - `"other"`

  - `page: optional number`

    Specifies the current page within paginated list of results.

  - `per_page: optional number`

    Sets the number of results per page of results.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/intel/attack-surface-report/issues \
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
    "count": 1,
    "issues": [
      {
        "id": "id",
        "dismissed": false,
        "has_extended_context": false,
        "issue_class": "always_use_https_not_enabled",
        "issue_type": "compliance_violation",
        "payload": {
          "detection_method": "We detected security rules referencing multiple IP addresses directly in the rules.",
          "zone_tag": "zone_tag"
        },
        "resolve_link": "resolve_link",
        "resolve_text": "resolve_text",
        "severity": "Low",
        "since": "2019-12-27T18:11:19.117Z",
        "status": "active",
        "subject": "example.com",
        "timestamp": "2019-12-27T18:11:19.117Z",
        "user_classification": "false_positive"
      }
    ],
    "page": 1,
    "per_page": 25
  }
}
```

## Retrieves Security Center Issue Counts by Class

**get** `/accounts/{account_id}/intel/attack-surface-report/issues/class`

Retrieves Security Center issue counts aggregated by classification class.

### Path Parameters

- `account_id: string`

  Identifier.

### Query Parameters

- `dismissed: optional boolean`

- `issue_class: optional array of string`

- `"issue_class~neq": optional array of string`

- `issue_type: optional array of IssueType`

  - `"compliance_violation"`

  - `"email_security"`

  - `"exposed_infrastructure"`

  - `"insecure_configuration"`

  - `"weak_authentication"`

  - `"configuration_suggestion"`

- `"issue_type~neq": optional array of IssueType`

  - `"compliance_violation"`

  - `"email_security"`

  - `"exposed_infrastructure"`

  - `"insecure_configuration"`

  - `"weak_authentication"`

  - `"configuration_suggestion"`

- `product: optional array of string`

- `"product~neq": optional array of string`

- `severity: optional array of SeverityQueryParam`

  - `"low"`

  - `"moderate"`

  - `"critical"`

- `"severity~neq": optional array of SeverityQueryParam`

  - `"low"`

  - `"moderate"`

  - `"critical"`

- `subject: optional array of string`

- `"subject~neq": optional array of string`

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

- `result: optional array of object { count, value }`

  - `count: optional number`

  - `value: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/intel/attack-surface-report/issues/class \
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
  "result": [
    {
      "count": 1,
      "value": "value"
    }
  ]
}
```

## Retrieves Security Center Issue Counts by Severity

**get** `/accounts/{account_id}/intel/attack-surface-report/issues/severity`

Retrieves Security Center issue counts aggregated by severity level.

### Path Parameters

- `account_id: string`

  Identifier.

### Query Parameters

- `dismissed: optional boolean`

- `issue_class: optional array of string`

- `"issue_class~neq": optional array of string`

- `issue_type: optional array of IssueType`

  - `"compliance_violation"`

  - `"email_security"`

  - `"exposed_infrastructure"`

  - `"insecure_configuration"`

  - `"weak_authentication"`

  - `"configuration_suggestion"`

- `"issue_type~neq": optional array of IssueType`

  - `"compliance_violation"`

  - `"email_security"`

  - `"exposed_infrastructure"`

  - `"insecure_configuration"`

  - `"weak_authentication"`

  - `"configuration_suggestion"`

- `product: optional array of string`

- `"product~neq": optional array of string`

- `severity: optional array of SeverityQueryParam`

  - `"low"`

  - `"moderate"`

  - `"critical"`

- `"severity~neq": optional array of SeverityQueryParam`

  - `"low"`

  - `"moderate"`

  - `"critical"`

- `subject: optional array of string`

- `"subject~neq": optional array of string`

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

- `result: optional array of object { count, value }`

  - `count: optional number`

  - `value: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/intel/attack-surface-report/issues/severity \
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
  "result": [
    {
      "count": 1,
      "value": "value"
    }
  ]
}
```

## Retrieves Security Center Issue Counts by Type

**get** `/accounts/{account_id}/intel/attack-surface-report/issues/type`

Retrieves Security Center issue counts aggregated by issue type.

### Path Parameters

- `account_id: string`

  Identifier.

### Query Parameters

- `dismissed: optional boolean`

- `issue_class: optional array of string`

- `"issue_class~neq": optional array of string`

- `issue_type: optional array of IssueType`

  - `"compliance_violation"`

  - `"email_security"`

  - `"exposed_infrastructure"`

  - `"insecure_configuration"`

  - `"weak_authentication"`

  - `"configuration_suggestion"`

- `"issue_type~neq": optional array of IssueType`

  - `"compliance_violation"`

  - `"email_security"`

  - `"exposed_infrastructure"`

  - `"insecure_configuration"`

  - `"weak_authentication"`

  - `"configuration_suggestion"`

- `product: optional array of string`

- `"product~neq": optional array of string`

- `severity: optional array of SeverityQueryParam`

  - `"low"`

  - `"moderate"`

  - `"critical"`

- `"severity~neq": optional array of SeverityQueryParam`

  - `"low"`

  - `"moderate"`

  - `"critical"`

- `subject: optional array of string`

- `"subject~neq": optional array of string`

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

- `result: optional array of object { count, value }`

  - `count: optional number`

  - `value: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/intel/attack-surface-report/issues/type \
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
  "result": [
    {
      "count": 1,
      "value": "value"
    }
  ]
}
```

## Archives Security Center Insight

**put** `/accounts/{account_id}/intel/attack-surface-report/{issue_id}/dismiss`

Deprecated endpoint for archiving Security Center insights. Use the newer archive-security-center-insight endpoint instead.

### Path Parameters

- `account_id: string`

  Identifier.

- `issue_id: string`

### Body Parameters

- `dismiss: optional boolean`

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/intel/attack-surface-report/$ISSUE_ID/dismiss \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{}'
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
  "success": true
}
```

## Domain Types

### Issue Type

- `IssueType = "compliance_violation" or "email_security" or "exposed_infrastructure" or 3 more`

  - `"compliance_violation"`

  - `"email_security"`

  - `"exposed_infrastructure"`

  - `"insecure_configuration"`

  - `"weak_authentication"`

  - `"configuration_suggestion"`

### Severity Query Param

- `SeverityQueryParam = "low" or "moderate" or "critical"`

  - `"low"`

  - `"moderate"`

  - `"critical"`

### Issue List Response

- `IssueListResponse object { count, issues, page, per_page }`

  - `count: optional number`

    Indicates the total number of results.

  - `issues: optional array of object { id, dismissed, has_extended_context, 11 more }`

    - `id: optional string`

    - `dismissed: optional boolean`

    - `has_extended_context: optional boolean`

      Indicates whether the insight has a large payload that requires fetching via the context endpoint.

    - `issue_class: optional string`

    - `issue_type: optional IssueType`

      - `"compliance_violation"`

      - `"email_security"`

      - `"exposed_infrastructure"`

      - `"insecure_configuration"`

      - `"weak_authentication"`

      - `"configuration_suggestion"`

    - `payload: optional object { detection_method, zone_tag }`

      - `detection_method: optional string`

        Describes the method used to detect insight.

      - `zone_tag: optional string`

    - `resolve_link: optional string`

    - `resolve_text: optional string`

    - `severity: optional "Low" or "Moderate" or "Critical"`

      - `"Low"`

      - `"Moderate"`

      - `"Critical"`

    - `since: optional string`

    - `status: optional "active" or "resolved"`

      The current status of the insight.

      - `"active"`

      - `"resolved"`

    - `subject: optional string`

    - `timestamp: optional string`

    - `user_classification: optional "false_positive" or "accept_risk" or "other"`

      User-defined classification for the insight. Can be 'false_positive', 'accept_risk', 'other', or null.

      - `"false_positive"`

      - `"accept_risk"`

      - `"other"`

  - `page: optional number`

    Specifies the current page within paginated list of results.

  - `per_page: optional number`

    Sets the number of results per page of results.

### Issue Class Response

- `IssueClassResponse = array of object { count, value }`

  - `count: optional number`

  - `value: optional string`

### Issue Severity Response

- `IssueSeverityResponse = array of object { count, value }`

  - `count: optional number`

  - `value: optional string`

### Issue Type Response

- `IssueTypeResponse = array of object { count, value }`

  - `count: optional number`

  - `value: optional string`

### Issue Dismiss Response

- `IssueDismissResponse object { errors, messages, success }`

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

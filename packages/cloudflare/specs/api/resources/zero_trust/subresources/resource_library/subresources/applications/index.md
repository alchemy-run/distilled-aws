# Applications

## List applications

**get** `/accounts/{account_id}/resource-library/applications`

List applications with different filters.

### Path Parameters

- `account_id: string`

### Query Parameters

- `filter: optional string`

  Filter applications using key:value format. Supported filter keys:

  - name: Filter by application name (e.g., name:HR)
  - id: Filter by application ID (e.g., id:0b63249c-95bf-4cc0-a7cc-d7faaaf1dac0)
  - human_id: Filter by human-readable ID (e.g., human_id:HR)
  - hostname: Filter by hostname or support domain (e.g., hostname:portal.example.com)
  - source: Filter by application source name (e.g., source:cloudflare)
  - ip_subnet: Filter by IP subnet using CIDR containment — returns applications where any stored subnet contains the search value (e.g., ip_subnet:10.0.1.5/32 matches apps with 10.0.0.0/16)
  - intel_id: Filter by Intel API ID (e.g., intel_id:498). also supports multiple values (e.g., intel_id:498,1001)
  - category_id: Filter by category ID (e.g., category_id:37f8ec03-8766-49d4-9a15-369b044c842c).
  - category_name: Filter by category name (e.g., category_name:HR).
  - supported: Filter by supported Cloudflare product (e.g., supported:ACCESS). Values: GATEWAY, ACCESS, CASB.
    .

- `limit: optional number`

  Limit of number of results to return (max 250).

- `offset: optional number`

  Offset of results to return.

- `order_by: optional string`

  Order results by field name and direction (e.g., name:asc). Ignored when search is provided; results are ranked by relevance instead.

- `search: optional string`

  Fuzzy search across application name and hostnames. Results are ranked by relevance. Must be between 2 and 200 characters. Can be combined with filter parameters.

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

  Indicates whether the API call was successful.

  - `true`

- `result: optional array of object { id, application_confidence_score, application_source, 15 more }`

  Returns the list of applications.

  - `id: string`

    Returns the application ID.

  - `application_confidence_score: number`

    Confidence score for the application. Returns -1 when no score is available.

  - `application_source: string`

    Returns the application source.

  - `application_type: string`

    Returns the application type.

  - `application_type_description: string`

    Returns the application type description.

  - `created_at: string`

    Returns the application creation time.

  - `gen_ai_score: number`

    GenAI score for the application. Returns -1 when no score is available.

  - `hostnames: array of string`

    Returns the list of hostnames for the application.

  - `human_id: string`

    Returns the human readable ID.

  - `ip_subnets: array of string`

    Returns the list of IP subnets for the application.

  - `name: string`

    Returns the application name.

  - `port_protocols: array of string`

    Returns the list of port protocols for the application.

  - `support_domains: array of string`

    Returns the list of support domains for the application.

  - `supported: array of "GATEWAY" or "ACCESS" or "CASB"`

    Cloudflare products that support this application.

    - `"GATEWAY"`

    - `"ACCESS"`

    - `"CASB"`

  - `updated_at: string`

    Returns the application update time.

  - `version: string`

    Returns the application version.

  - `application_score_composition: optional unknown`

    Returns the score composition breakdown for the application.

  - `intel_id: optional number`

    Returns the Intel API ID for the application.

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Returns the total number of results for the requested service.

  - `page: optional number`

    Returns the current page within paginated list of results.

  - `per_page: optional number`

    Returns the number of results per page of results.

  - `total_count: optional number`

    Returns the total results available without any search parameters.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/resource-library/applications \
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
      "id": "12345678-1234-1234-1234-123456789012",
      "application_confidence_score": 0.92,
      "application_source": "cloudflare",
      "application_type": "Human Resources",
      "application_type_description": "Applications used to manage employees and workforce tools.",
      "created_at": "2025-01-01T00:00:00Z",
      "gen_ai_score": 1.5,
      "hostnames": [
        "example.com",
        "foo.com"
      ],
      "human_id": "HR",
      "ip_subnets": [
        "192.168.1.0/24",
        "10.0.0.0/8"
      ],
      "name": "HR",
      "port_protocols": [
        "tcp/80",
        "tcp/443"
      ],
      "support_domains": [
        "example.com",
        "foo.com"
      ],
      "supported": [
        "GATEWAY",
        "ACCESS"
      ],
      "updated_at": "2025-01-01T00:00:00Z",
      "version": "2025-01-01T00:00:00Z",
      "application_score_composition": {
        "categories": [
          {
            "confidence": 0.95,
            "name": "Security"
          }
        ],
        "plan": "free"
      },
      "intel_id": 498
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

## Get application

**get** `/accounts/{account_id}/resource-library/applications/{id}`

Get application by ID.

### Path Parameters

- `account_id: string`

- `id: string`

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

  Indicates whether the API call was successful.

  - `true`

- `result: optional object { id, application_confidence_score, application_source, 15 more }`

  - `id: string`

    Returns the application ID.

  - `application_confidence_score: number`

    Confidence score for the application. Returns -1 when no score is available.

  - `application_source: string`

    Returns the application source.

  - `application_type: string`

    Returns the application type.

  - `application_type_description: string`

    Returns the application type description.

  - `created_at: string`

    Returns the application creation time.

  - `gen_ai_score: number`

    GenAI score for the application. Returns -1 when no score is available.

  - `hostnames: array of string`

    Returns the list of hostnames for the application.

  - `human_id: string`

    Returns the human readable ID.

  - `ip_subnets: array of string`

    Returns the list of IP subnets for the application.

  - `name: string`

    Returns the application name.

  - `port_protocols: array of string`

    Returns the list of port protocols for the application.

  - `support_domains: array of string`

    Returns the list of support domains for the application.

  - `supported: array of "GATEWAY" or "ACCESS" or "CASB"`

    Cloudflare products that support this application.

    - `"GATEWAY"`

    - `"ACCESS"`

    - `"CASB"`

  - `updated_at: string`

    Returns the application update time.

  - `version: string`

    Returns the application version.

  - `application_score_composition: optional unknown`

    Returns the score composition breakdown for the application.

  - `intel_id: optional number`

    Returns the Intel API ID for the application.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/resource-library/applications/$ID \
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
    "id": "12345678-1234-1234-1234-123456789012",
    "application_confidence_score": 0.92,
    "application_source": "cloudflare",
    "application_type": "Human Resources",
    "application_type_description": "Applications used to manage employees and workforce tools.",
    "created_at": "2025-01-01T00:00:00Z",
    "gen_ai_score": 1.5,
    "hostnames": [
      "example.com",
      "foo.com"
    ],
    "human_id": "HR",
    "ip_subnets": [
      "192.168.1.0/24",
      "10.0.0.0/8"
    ],
    "name": "HR",
    "port_protocols": [
      "tcp/80",
      "tcp/443"
    ],
    "support_domains": [
      "example.com",
      "foo.com"
    ],
    "supported": [
      "GATEWAY",
      "ACCESS"
    ],
    "updated_at": "2025-01-01T00:00:00Z",
    "version": "2025-01-01T00:00:00Z",
    "application_score_composition": {
      "categories": [
        {
          "confidence": 0.95,
          "name": "Security"
        }
      ],
      "plan": "free"
    },
    "intel_id": 498
  }
}
```

## Domain Types

### Application List Response

- `ApplicationListResponse object { id, application_confidence_score, application_source, 15 more }`

  - `id: string`

    Returns the application ID.

  - `application_confidence_score: number`

    Confidence score for the application. Returns -1 when no score is available.

  - `application_source: string`

    Returns the application source.

  - `application_type: string`

    Returns the application type.

  - `application_type_description: string`

    Returns the application type description.

  - `created_at: string`

    Returns the application creation time.

  - `gen_ai_score: number`

    GenAI score for the application. Returns -1 when no score is available.

  - `hostnames: array of string`

    Returns the list of hostnames for the application.

  - `human_id: string`

    Returns the human readable ID.

  - `ip_subnets: array of string`

    Returns the list of IP subnets for the application.

  - `name: string`

    Returns the application name.

  - `port_protocols: array of string`

    Returns the list of port protocols for the application.

  - `support_domains: array of string`

    Returns the list of support domains for the application.

  - `supported: array of "GATEWAY" or "ACCESS" or "CASB"`

    Cloudflare products that support this application.

    - `"GATEWAY"`

    - `"ACCESS"`

    - `"CASB"`

  - `updated_at: string`

    Returns the application update time.

  - `version: string`

    Returns the application version.

  - `application_score_composition: optional unknown`

    Returns the score composition breakdown for the application.

  - `intel_id: optional number`

    Returns the Intel API ID for the application.

### Application Get Response

- `ApplicationGetResponse object { id, application_confidence_score, application_source, 15 more }`

  - `id: string`

    Returns the application ID.

  - `application_confidence_score: number`

    Confidence score for the application. Returns -1 when no score is available.

  - `application_source: string`

    Returns the application source.

  - `application_type: string`

    Returns the application type.

  - `application_type_description: string`

    Returns the application type description.

  - `created_at: string`

    Returns the application creation time.

  - `gen_ai_score: number`

    GenAI score for the application. Returns -1 when no score is available.

  - `hostnames: array of string`

    Returns the list of hostnames for the application.

  - `human_id: string`

    Returns the human readable ID.

  - `ip_subnets: array of string`

    Returns the list of IP subnets for the application.

  - `name: string`

    Returns the application name.

  - `port_protocols: array of string`

    Returns the list of port protocols for the application.

  - `support_domains: array of string`

    Returns the list of support domains for the application.

  - `supported: array of "GATEWAY" or "ACCESS" or "CASB"`

    Cloudflare products that support this application.

    - `"GATEWAY"`

    - `"ACCESS"`

    - `"CASB"`

  - `updated_at: string`

    Returns the application update time.

  - `version: string`

    Returns the application version.

  - `application_score_composition: optional unknown`

    Returns the score composition breakdown for the application.

  - `intel_id: optional number`

    Returns the Intel API ID for the application.

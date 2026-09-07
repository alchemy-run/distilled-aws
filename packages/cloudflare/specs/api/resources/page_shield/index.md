# Page Shield

## Get Page Shield settings

**get** `/zones/{zone_id}/page_shield`

Fetches the Page Shield settings.

### Path Parameters

- `zone_id: string`

  Identifier

### Returns

- `success: true`

  Whether the API call was successful

  - `true`

- `errors: optional array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: optional array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `result: optional Setting`

  - `enabled: boolean`

    When true, indicates that Page Shield is enabled.

  - `updated_at: string`

    The timestamp of when Page Shield was last updated.

  - `use_cloudflare_reporting_endpoint: boolean`

    When true, CSP reports will be sent to https://csp-reporting.cloudflare.com/cdn-cgi/script_monitor/report

  - `use_connection_url_path: boolean`

    When true, the paths associated with connections URLs will also be analyzed.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/page_shield \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
```

#### Response

```json
{
  "success": true,
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
    "enabled": true,
    "updated_at": "2022-10-12T17:56:52.083582+01:00",
    "use_cloudflare_reporting_endpoint": true,
    "use_connection_url_path": true
  }
}
```

## Update Page Shield settings

**put** `/zones/{zone_id}/page_shield`

Updates Page Shield settings.

### Path Parameters

- `zone_id: string`

  Identifier

### Body Parameters

- `enabled: optional boolean`

  When true, indicates that Page Shield is enabled.

- `use_cloudflare_reporting_endpoint: optional boolean`

  When true, CSP reports will be sent to https://csp-reporting.cloudflare.com/cdn-cgi/script_monitor/report

- `use_connection_url_path: optional boolean`

  When true, the paths associated with connections URLs will also be analyzed.

### Returns

- `success: true`

  Whether the API call was successful

  - `true`

- `errors: optional array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: optional array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `result: optional object { enabled, updated_at, use_cloudflare_reporting_endpoint, use_connection_url_path }`

  - `enabled: boolean`

    When true, indicates that Page Shield is enabled.

  - `updated_at: string`

    The timestamp of when Page Shield was last updated.

  - `use_cloudflare_reporting_endpoint: boolean`

    When true, CSP reports will be sent to https://csp-reporting.cloudflare.com/cdn-cgi/script_monitor/report

  - `use_connection_url_path: boolean`

    When true, the paths associated with connections URLs will also be analyzed.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/page_shield \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "enabled": true,
          "use_cloudflare_reporting_endpoint": true,
          "use_connection_url_path": true
        }'
```

#### Response

```json
{
  "success": true,
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
    "enabled": true,
    "updated_at": "2022-10-12T17:56:52.083582+01:00",
    "use_cloudflare_reporting_endpoint": true,
    "use_connection_url_path": true
  }
}
```

## Domain Types

### Setting

- `Setting object { enabled, updated_at, use_cloudflare_reporting_endpoint, use_connection_url_path }`

  - `enabled: boolean`

    When true, indicates that Page Shield is enabled.

  - `updated_at: string`

    The timestamp of when Page Shield was last updated.

  - `use_cloudflare_reporting_endpoint: boolean`

    When true, CSP reports will be sent to https://csp-reporting.cloudflare.com/cdn-cgi/script_monitor/report

  - `use_connection_url_path: boolean`

    When true, the paths associated with connections URLs will also be analyzed.

### Page Shield Update Response

- `PageShieldUpdateResponse object { enabled, updated_at, use_cloudflare_reporting_endpoint, use_connection_url_path }`

  - `enabled: boolean`

    When true, indicates that Page Shield is enabled.

  - `updated_at: string`

    The timestamp of when Page Shield was last updated.

  - `use_cloudflare_reporting_endpoint: boolean`

    When true, CSP reports will be sent to https://csp-reporting.cloudflare.com/cdn-cgi/script_monitor/report

  - `use_connection_url_path: boolean`

    When true, the paths associated with connections URLs will also be analyzed.

# Policies

## List Page Shield policies

**get** `/zones/{zone_id}/page_shield/policies`

Lists all Page Shield policies.

### Path Parameters

- `zone_id: string`

  Identifier

### Returns

- `result: array of object { id, action, description, 3 more }`

  - `id: string`

    Identifier

  - `action: "allow" or "log" or "add_reporting_directives"`

    The action to take if the expression matches

    - `"allow"`

    - `"log"`

    - `"add_reporting_directives"`

  - `description: string`

    A description for the policy

  - `enabled: boolean`

    Whether the policy is enabled

  - `expression: string`

    The expression which must match for the policy to be applied, using the Cloudflare Firewall rule expression syntax

  - `value: string`

    The policy which will be applied

- `result_info: object { count, page, per_page, 2 more }`

  - `count: number`

    Total number of results for the requested service

  - `page: number`

    Current page within paginated list of results

  - `per_page: number`

    Number of results per page of results

  - `total_count: number`

    Total results available without any search parameters

  - `total_pages: number`

    Total number of pages

- `success: true`

  Whether the API call was successful

  - `true`

- `errors: optional array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: optional array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/page_shield/policies \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
```

#### Response

```json
{
  "result": [
    {
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "action": "allow",
      "description": "Checkout page CSP policy",
      "enabled": true,
      "expression": "ends_with(http.request.uri.path, \"/checkout\")",
      "value": "script-src 'none';"
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  },
  "success": true,
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
  ]
}
```

## Get a Page Shield policy

**get** `/zones/{zone_id}/page_shield/policies/{policy_id}`

Fetches a Page Shield policy by ID.

### Path Parameters

- `zone_id: string`

  Identifier

- `policy_id: string`

  Identifier

### Returns

- `result: object { id, action, description, 3 more }`

  - `id: string`

    Identifier

  - `action: "allow" or "log" or "add_reporting_directives"`

    The action to take if the expression matches

    - `"allow"`

    - `"log"`

    - `"add_reporting_directives"`

  - `description: string`

    A description for the policy

  - `enabled: boolean`

    Whether the policy is enabled

  - `expression: string`

    The expression which must match for the policy to be applied, using the Cloudflare Firewall rule expression syntax

  - `value: string`

    The policy which will be applied

- `success: true`

  Whether the API call was successful

  - `true`

- `errors: optional array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: optional array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/page_shield/policies/$POLICY_ID \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
```

#### Response

```json
{
  "result": {
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "action": "allow",
    "description": "Checkout page CSP policy",
    "enabled": true,
    "expression": "ends_with(http.request.uri.path, \"/checkout\")",
    "value": "script-src 'none';"
  },
  "success": true,
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
  ]
}
```

## Create a Page Shield policy

**post** `/zones/{zone_id}/page_shield/policies`

Create a Page Shield policy.

### Path Parameters

- `zone_id: string`

  Identifier

### Body Parameters

- `action: "allow" or "log" or "add_reporting_directives"`

  The action to take if the expression matches

  - `"allow"`

  - `"log"`

  - `"add_reporting_directives"`

- `description: string`

  A description for the policy

- `enabled: boolean`

  Whether the policy is enabled

- `expression: string`

  The expression which must match for the policy to be applied, using the Cloudflare Firewall rule expression syntax

- `value: string`

  The policy which will be applied

### Returns

- `result: object { id, action, description, 3 more }`

  - `id: string`

    Identifier

  - `action: "allow" or "log" or "add_reporting_directives"`

    The action to take if the expression matches

    - `"allow"`

    - `"log"`

    - `"add_reporting_directives"`

  - `description: string`

    A description for the policy

  - `enabled: boolean`

    Whether the policy is enabled

  - `expression: string`

    The expression which must match for the policy to be applied, using the Cloudflare Firewall rule expression syntax

  - `value: string`

    The policy which will be applied

- `success: true`

  Whether the API call was successful

  - `true`

- `errors: optional array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: optional array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/page_shield/policies \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d "{
          \"action\": \"allow\",
          \"description\": \"Checkout page CSP policy\",
          \"enabled\": true,
          \"expression\": \"ends_with(http.request.uri.path, \\\"/checkout\\\")\",
          \"value\": \"script-src 'none';\"
        }"
```

#### Response

```json
{
  "result": {
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "action": "allow",
    "description": "Checkout page CSP policy",
    "enabled": true,
    "expression": "ends_with(http.request.uri.path, \"/checkout\")",
    "value": "script-src 'none';"
  },
  "success": true,
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
  ]
}
```

## Update a Page Shield policy

**put** `/zones/{zone_id}/page_shield/policies/{policy_id}`

Update a Page Shield policy by ID.

### Path Parameters

- `zone_id: string`

  Identifier

- `policy_id: string`

  Identifier

### Body Parameters

- `action: optional "allow" or "log" or "add_reporting_directives"`

  The action to take if the expression matches

  - `"allow"`

  - `"log"`

  - `"add_reporting_directives"`

- `description: optional string`

  A description for the policy

- `enabled: optional boolean`

  Whether the policy is enabled

- `expression: optional string`

  The expression which must match for the policy to be applied, using the Cloudflare Firewall rule expression syntax

- `value: optional string`

  The policy which will be applied

### Returns

- `result: object { id, action, description, 3 more }`

  - `id: string`

    Identifier

  - `action: "allow" or "log" or "add_reporting_directives"`

    The action to take if the expression matches

    - `"allow"`

    - `"log"`

    - `"add_reporting_directives"`

  - `description: string`

    A description for the policy

  - `enabled: boolean`

    Whether the policy is enabled

  - `expression: string`

    The expression which must match for the policy to be applied, using the Cloudflare Firewall rule expression syntax

  - `value: string`

    The policy which will be applied

- `success: true`

  Whether the API call was successful

  - `true`

- `errors: optional array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: optional array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/page_shield/policies/$POLICY_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d "{
          \"action\": \"allow\",
          \"description\": \"Checkout page CSP policy\",
          \"enabled\": true,
          \"expression\": \"ends_with(http.request.uri.path, \\\"/checkout\\\")\",
          \"value\": \"script-src 'none';\"
        }"
```

#### Response

```json
{
  "result": {
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "action": "allow",
    "description": "Checkout page CSP policy",
    "enabled": true,
    "expression": "ends_with(http.request.uri.path, \"/checkout\")",
    "value": "script-src 'none';"
  },
  "success": true,
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
  ]
}
```

## Delete a Page Shield policy

**delete** `/zones/{zone_id}/page_shield/policies/{policy_id}`

Delete a Page Shield policy by ID.

### Path Parameters

- `zone_id: string`

  Identifier

- `policy_id: string`

  Identifier

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/page_shield/policies/$POLICY_ID \
    -X DELETE \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
```

## Domain Types

### Policy

- `Policy object { action, description, enabled, 2 more }`

  - `action: "allow" or "log" or "add_reporting_directives"`

    The action to take if the expression matches

    - `"allow"`

    - `"log"`

    - `"add_reporting_directives"`

  - `description: string`

    A description for the policy

  - `enabled: boolean`

    Whether the policy is enabled

  - `expression: string`

    The expression which must match for the policy to be applied, using the Cloudflare Firewall rule expression syntax

  - `value: string`

    The policy which will be applied

### Policy List Response

- `PolicyListResponse object { id, action, description, 3 more }`

  - `id: string`

    Identifier

  - `action: "allow" or "log" or "add_reporting_directives"`

    The action to take if the expression matches

    - `"allow"`

    - `"log"`

    - `"add_reporting_directives"`

  - `description: string`

    A description for the policy

  - `enabled: boolean`

    Whether the policy is enabled

  - `expression: string`

    The expression which must match for the policy to be applied, using the Cloudflare Firewall rule expression syntax

  - `value: string`

    The policy which will be applied

### Policy Get Response

- `PolicyGetResponse object { id, action, description, 3 more }`

  - `id: string`

    Identifier

  - `action: "allow" or "log" or "add_reporting_directives"`

    The action to take if the expression matches

    - `"allow"`

    - `"log"`

    - `"add_reporting_directives"`

  - `description: string`

    A description for the policy

  - `enabled: boolean`

    Whether the policy is enabled

  - `expression: string`

    The expression which must match for the policy to be applied, using the Cloudflare Firewall rule expression syntax

  - `value: string`

    The policy which will be applied

### Policy Create Response

- `PolicyCreateResponse object { id, action, description, 3 more }`

  - `id: string`

    Identifier

  - `action: "allow" or "log" or "add_reporting_directives"`

    The action to take if the expression matches

    - `"allow"`

    - `"log"`

    - `"add_reporting_directives"`

  - `description: string`

    A description for the policy

  - `enabled: boolean`

    Whether the policy is enabled

  - `expression: string`

    The expression which must match for the policy to be applied, using the Cloudflare Firewall rule expression syntax

  - `value: string`

    The policy which will be applied

### Policy Update Response

- `PolicyUpdateResponse object { id, action, description, 3 more }`

  - `id: string`

    Identifier

  - `action: "allow" or "log" or "add_reporting_directives"`

    The action to take if the expression matches

    - `"allow"`

    - `"log"`

    - `"add_reporting_directives"`

  - `description: string`

    A description for the policy

  - `enabled: boolean`

    Whether the policy is enabled

  - `expression: string`

    The expression which must match for the policy to be applied, using the Cloudflare Firewall rule expression syntax

  - `value: string`

    The policy which will be applied

# Connections

## List Page Shield connections

**get** `/zones/{zone_id}/page_shield/connections`

Lists all connections detected by Page Shield.

### Path Parameters

- `zone_id: string`

  Identifier

### Query Parameters

- `direction: optional "asc" or "desc"`

  The direction used to sort returned connections.

  - `"asc"`

  - `"desc"`

- `exclude_cdn_cgi: optional boolean`

  When true, excludes connections seen in a `/cdn-cgi` path from the returned connections. The default value is true.

- `exclude_urls: optional string`

  Excludes connections whose URL contains one of the URL-encoded URLs separated by commas.

- `export: optional "csv"`

  Export the list of connections as a file, limited to 50000 entries.

  - `"csv"`

- `hosts: optional string`

  Includes connections that match one or more URL-encoded hostnames separated by commas.

  Wildcards are supported at the start and end of each hostname to support starts with, ends with
  and contains. If no wildcards are used, results will be filtered by exact match

- `order_by: optional "first_seen_at" or "last_seen_at"`

  The field used to sort returned connections.

  - `"first_seen_at"`

  - `"last_seen_at"`

- `page: optional string`

  The current page number of the paginated results.

  We additionally support a special value "all". When "all" is used, the API will return all the connections
  with the applied filters in a single page. This feature is best-effort and it may only work for zones with
  a low number of connections

- `page_url: optional string`

  Includes connections that match one or more page URLs (separated by commas) where they were last seen

  Wildcards are supported at the start and end of each page URL to support starts with, ends with
  and contains. If no wildcards are used, results will be filtered by exact match

- `per_page: optional number`

  The number of results per page.

- `prioritize_malicious: optional boolean`

  When true, malicious connections appear first in the returned connections.

- `status: optional string`

  Filters the returned connections using a comma-separated list of connection statuses. Accepted values: `active`, `infrequent`, and `inactive`. The default value is `active`.

- `urls: optional string`

  Includes connections whose URL contain one or more URL-encoded URLs separated by commas.

### Returns

- `result_info: object { count, page, per_page, 2 more }`

  - `count: number`

    Total number of results for the requested service

  - `page: number`

    Current page within paginated list of results

  - `per_page: number`

    Number of results per page of results

  - `total_count: number`

    Total results available without any search parameters

  - `total_pages: number`

    Total number of pages

- `success: true`

  Whether the API call was successful

  - `true`

- `errors: optional array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: optional array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `result: optional array of Connection`

  - `id: string`

    Identifier

  - `added_at: string`

  - `first_seen_at: string`

  - `host: string`

  - `last_seen_at: string`

  - `url: string`

  - `url_contains_cdn_cgi_path: boolean`

  - `domain_reported_malicious: optional boolean`

  - `first_page_url: optional string`

  - `malicious_domain_categories: optional array of string`

  - `malicious_url_categories: optional array of string`

  - `page_urls: optional array of string`

  - `url_reported_malicious: optional boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/page_shield/connections \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
```

#### Response

```json
{
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  },
  "success": true,
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
      "added_at": "2021-08-18T10:51:10.09615Z",
      "first_seen_at": "2021-08-18T10:51:08Z",
      "host": "blog.cloudflare.com",
      "last_seen_at": "2021-09-02T09:57:54Z",
      "url": "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.6.0/js/bootstrap.min.js",
      "url_contains_cdn_cgi_path": false,
      "domain_reported_malicious": false,
      "first_page_url": "blog.cloudflare.com/page",
      "malicious_domain_categories": [
        "Malware"
      ],
      "malicious_url_categories": [
        "Malware"
      ],
      "page_urls": [
        "blog.cloudflare.com/page1",
        "blog.cloudflare.com/page2"
      ],
      "url_reported_malicious": false
    }
  ]
}
```

## Get a Page Shield connection

**get** `/zones/{zone_id}/page_shield/connections/{connection_id}`

Fetches a connection detected by Page Shield by connection ID.

### Path Parameters

- `zone_id: string`

  Identifier

- `connection_id: string`

  Identifier

### Returns

- `result: Connection`

  - `id: string`

    Identifier

  - `added_at: string`

  - `first_seen_at: string`

  - `host: string`

  - `last_seen_at: string`

  - `url: string`

  - `url_contains_cdn_cgi_path: boolean`

  - `domain_reported_malicious: optional boolean`

  - `first_page_url: optional string`

  - `malicious_domain_categories: optional array of string`

  - `malicious_url_categories: optional array of string`

  - `page_urls: optional array of string`

  - `url_reported_malicious: optional boolean`

- `success: true`

  Whether the API call was successful

  - `true`

- `errors: optional array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: optional array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/page_shield/connections/$CONNECTION_ID \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
```

#### Response

```json
{
  "result": {
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "added_at": "2021-08-18T10:51:10.09615Z",
    "first_seen_at": "2021-08-18T10:51:08Z",
    "host": "blog.cloudflare.com",
    "last_seen_at": "2021-09-02T09:57:54Z",
    "url": "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.6.0/js/bootstrap.min.js",
    "url_contains_cdn_cgi_path": false,
    "domain_reported_malicious": false,
    "first_page_url": "blog.cloudflare.com/page",
    "malicious_domain_categories": [
      "Malware"
    ],
    "malicious_url_categories": [
      "Malware"
    ],
    "page_urls": [
      "blog.cloudflare.com/page1",
      "blog.cloudflare.com/page2"
    ],
    "url_reported_malicious": false
  },
  "success": true,
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
  ]
}
```

## Domain Types

### Connection

- `Connection object { id, added_at, first_seen_at, 10 more }`

  - `id: string`

    Identifier

  - `added_at: string`

  - `first_seen_at: string`

  - `host: string`

  - `last_seen_at: string`

  - `url: string`

  - `url_contains_cdn_cgi_path: boolean`

  - `domain_reported_malicious: optional boolean`

  - `first_page_url: optional string`

  - `malicious_domain_categories: optional array of string`

  - `malicious_url_categories: optional array of string`

  - `page_urls: optional array of string`

  - `url_reported_malicious: optional boolean`

# Scripts

## List Page Shield scripts

**get** `/zones/{zone_id}/page_shield/scripts`

Lists all scripts detected by Page Shield.

### Path Parameters

- `zone_id: string`

  Identifier

### Query Parameters

- `direction: optional "asc" or "desc"`

  The direction used to sort returned scripts.

  - `"asc"`

  - `"desc"`

- `exclude_cdn_cgi: optional boolean`

  When true, excludes scripts seen in a `/cdn-cgi` path from the returned scripts. The default value is true.

- `exclude_duplicates: optional boolean`

  When true, excludes duplicate scripts. We consider a script duplicate of another if their javascript
  content matches and they share the same url host and zone hostname. In such case, we return the most
  recent script for the URL host and zone hostname combination.

- `exclude_urls: optional string`

  Excludes scripts whose URL contains one of the URL-encoded URLs separated by commas.

- `export: optional "csv"`

  Export the list of scripts as a file, limited to 50000 entries.

  - `"csv"`

- `hosts: optional string`

  Includes scripts that match one or more URL-encoded hostnames separated by commas.

  Wildcards are supported at the start and end of each hostname to support starts with, ends with
  and contains. If no wildcards are used, results will be filtered by exact match

- `order_by: optional "first_seen_at" or "last_seen_at"`

  The field used to sort returned scripts.

  - `"first_seen_at"`

  - `"last_seen_at"`

- `page: optional string`

  The current page number of the paginated results.

  We additionally support a special value "all". When "all" is used, the API will return all the scripts
  with the applied filters in a single page. This feature is best-effort and it may only work for zones with
  a low number of scripts

- `page_url: optional string`

  Includes scripts that match one or more page URLs (separated by commas) where they were last seen

  Wildcards are supported at the start and end of each page URL to support starts with, ends with
  and contains. If no wildcards are used, results will be filtered by exact match

- `per_page: optional number`

  The number of results per page.

- `prioritize_malicious: optional boolean`

  When true, malicious scripts appear first in the returned scripts.

- `status: optional string`

  Filters the returned scripts using a comma-separated list of scripts statuses. Accepted values: `active`, `infrequent`, and `inactive`. The default value is `active`.

- `urls: optional string`

  Includes scripts whose URL contain one or more URL-encoded URLs separated by commas.

### Returns

- `result: array of Script`

  - `id: string`

    Identifier

  - `added_at: string`

  - `first_seen_at: string`

  - `host: string`

  - `last_seen_at: string`

  - `url: string`

  - `url_contains_cdn_cgi_path: boolean`

  - `cryptomining_score: optional number`

    The cryptomining score of the JavaScript content.

  - `dataflow_score: optional number`

    The dataflow score of the JavaScript content. This field has been deprecated in favour of js_integrity_score.

  - `domain_reported_malicious: optional boolean`

  - `fetched_at: optional string`

    The timestamp of when the script was last fetched.

  - `first_page_url: optional string`

  - `hash: optional string`

    The computed hash of the analyzed script.

  - `js_integrity_score: optional number`

    The integrity score of the JavaScript content.

  - `magecart_score: optional number`

    The magecart score of the JavaScript content.

  - `malicious_domain_categories: optional array of string`

  - `malicious_url_categories: optional array of string`

  - `malware_score: optional number`

    The malware score of the JavaScript content.

  - `obfuscation_score: optional number`

    The obfuscation score of the JavaScript content. This field has been deprecated in favour of js_integrity_score.

  - `page_urls: optional array of string`

  - `url_reported_malicious: optional boolean`

- `result_info: object { count, page, per_page, 2 more }`

  - `count: number`

    Total number of results for the requested service

  - `page: number`

    Current page within paginated list of results

  - `per_page: number`

    Number of results per page of results

  - `total_count: number`

    Total results available without any search parameters

  - `total_pages: number`

    Total number of pages

- `success: true`

  Whether the API call was successful

  - `true`

- `errors: optional array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: optional array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/page_shield/scripts \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
```

#### Response

```json
{
  "result": [
    {
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "added_at": "2021-08-18T10:51:10.09615Z",
      "first_seen_at": "2021-08-18T10:51:08Z",
      "host": "blog.cloudflare.com",
      "last_seen_at": "2021-09-02T09:57:54Z",
      "url": "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.6.0/js/bootstrap.min.js",
      "url_contains_cdn_cgi_path": false,
      "cryptomining_score": 1,
      "dataflow_score": 1,
      "domain_reported_malicious": false,
      "fetched_at": "fetched_at",
      "first_page_url": "blog.cloudflare.com/page",
      "hash": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      "js_integrity_score": 1,
      "magecart_score": 1,
      "malicious_domain_categories": [
        "Malware"
      ],
      "malicious_url_categories": [
        "Malware"
      ],
      "malware_score": 1,
      "obfuscation_score": 1,
      "page_urls": [
        "blog.cloudflare.com/page1",
        "blog.cloudflare.com/page2"
      ],
      "url_reported_malicious": false
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  },
  "success": true,
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
  ]
}
```

## Get a Page Shield script

**get** `/zones/{zone_id}/page_shield/scripts/{script_id}`

Fetches a script detected by Page Shield by script ID.

### Path Parameters

- `zone_id: string`

  Identifier

- `script_id: string`

  Identifier

### Returns

- `result: object { id, added_at, first_seen_at, 19 more }`

  - `id: string`

    Identifier

  - `added_at: string`

  - `first_seen_at: string`

  - `host: string`

  - `last_seen_at: string`

  - `url: string`

  - `url_contains_cdn_cgi_path: boolean`

  - `cryptomining_score: optional number`

    The cryptomining score of the JavaScript content.

  - `dataflow_score: optional number`

    The dataflow score of the JavaScript content. This field has been deprecated in favour of js_integrity_score.

  - `domain_reported_malicious: optional boolean`

  - `fetched_at: optional string`

    The timestamp of when the script was last fetched.

  - `first_page_url: optional string`

  - `hash: optional string`

    The computed hash of the analyzed script.

  - `js_integrity_score: optional number`

    The integrity score of the JavaScript content.

  - `magecart_score: optional number`

    The magecart score of the JavaScript content.

  - `malicious_domain_categories: optional array of string`

  - `malicious_url_categories: optional array of string`

  - `malware_score: optional number`

    The malware score of the JavaScript content.

  - `obfuscation_score: optional number`

    The obfuscation score of the JavaScript content. This field has been deprecated in favour of js_integrity_score.

  - `page_urls: optional array of string`

  - `url_reported_malicious: optional boolean`

  - `versions: optional array of object { cryptomining_score, dataflow_score, fetched_at, 5 more }`

    - `cryptomining_score: optional number`

      The cryptomining score of the JavaScript content.

    - `dataflow_score: optional number`

      The dataflow score of the JavaScript content. This field has been deprecated in favour of js_integrity_score.

    - `fetched_at: optional string`

      The timestamp of when the script was last fetched.

    - `hash: optional string`

      The computed hash of the analyzed script.

    - `js_integrity_score: optional number`

      The integrity score of the JavaScript content.

    - `magecart_score: optional number`

      The magecart score of the JavaScript content.

    - `malware_score: optional number`

      The malware score of the JavaScript content.

    - `obfuscation_score: optional number`

      The obfuscation score of the JavaScript content. This field has been deprecated in favour of js_integrity_score.

- `success: true`

  Whether the API call was successful

  - `true`

- `errors: optional array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: optional array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/page_shield/scripts/$SCRIPT_ID \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
```

#### Response

```json
{
  "result": {
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "added_at": "2021-08-18T10:51:10.09615Z",
    "first_seen_at": "2021-08-18T10:51:08Z",
    "host": "blog.cloudflare.com",
    "last_seen_at": "2021-09-02T09:57:54Z",
    "url": "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.6.0/js/bootstrap.min.js",
    "url_contains_cdn_cgi_path": false,
    "cryptomining_score": 1,
    "dataflow_score": 1,
    "domain_reported_malicious": false,
    "fetched_at": "fetched_at",
    "first_page_url": "blog.cloudflare.com/page",
    "hash": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "js_integrity_score": 1,
    "magecart_score": 1,
    "malicious_domain_categories": [
      "Malware"
    ],
    "malicious_url_categories": [
      "Malware"
    ],
    "malware_score": 1,
    "obfuscation_score": 1,
    "page_urls": [
      "blog.cloudflare.com/page1",
      "blog.cloudflare.com/page2"
    ],
    "url_reported_malicious": false,
    "versions": [
      {
        "cryptomining_score": 20,
        "dataflow_score": 1,
        "fetched_at": "2021-08-18T10:51:08Z",
        "hash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b423",
        "js_integrity_score": 2,
        "magecart_score": 10,
        "malware_score": 5,
        "obfuscation_score": 1
      }
    ]
  },
  "success": true,
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
  ]
}
```

## Domain Types

### Script

- `Script object { id, added_at, first_seen_at, 18 more }`

  - `id: string`

    Identifier

  - `added_at: string`

  - `first_seen_at: string`

  - `host: string`

  - `last_seen_at: string`

  - `url: string`

  - `url_contains_cdn_cgi_path: boolean`

  - `cryptomining_score: optional number`

    The cryptomining score of the JavaScript content.

  - `dataflow_score: optional number`

    The dataflow score of the JavaScript content. This field has been deprecated in favour of js_integrity_score.

  - `domain_reported_malicious: optional boolean`

  - `fetched_at: optional string`

    The timestamp of when the script was last fetched.

  - `first_page_url: optional string`

  - `hash: optional string`

    The computed hash of the analyzed script.

  - `js_integrity_score: optional number`

    The integrity score of the JavaScript content.

  - `magecart_score: optional number`

    The magecart score of the JavaScript content.

  - `malicious_domain_categories: optional array of string`

  - `malicious_url_categories: optional array of string`

  - `malware_score: optional number`

    The malware score of the JavaScript content.

  - `obfuscation_score: optional number`

    The obfuscation score of the JavaScript content. This field has been deprecated in favour of js_integrity_score.

  - `page_urls: optional array of string`

  - `url_reported_malicious: optional boolean`

### Script Get Response

- `ScriptGetResponse object { id, added_at, first_seen_at, 19 more }`

  - `id: string`

    Identifier

  - `added_at: string`

  - `first_seen_at: string`

  - `host: string`

  - `last_seen_at: string`

  - `url: string`

  - `url_contains_cdn_cgi_path: boolean`

  - `cryptomining_score: optional number`

    The cryptomining score of the JavaScript content.

  - `dataflow_score: optional number`

    The dataflow score of the JavaScript content. This field has been deprecated in favour of js_integrity_score.

  - `domain_reported_malicious: optional boolean`

  - `fetched_at: optional string`

    The timestamp of when the script was last fetched.

  - `first_page_url: optional string`

  - `hash: optional string`

    The computed hash of the analyzed script.

  - `js_integrity_score: optional number`

    The integrity score of the JavaScript content.

  - `magecart_score: optional number`

    The magecart score of the JavaScript content.

  - `malicious_domain_categories: optional array of string`

  - `malicious_url_categories: optional array of string`

  - `malware_score: optional number`

    The malware score of the JavaScript content.

  - `obfuscation_score: optional number`

    The obfuscation score of the JavaScript content. This field has been deprecated in favour of js_integrity_score.

  - `page_urls: optional array of string`

  - `url_reported_malicious: optional boolean`

  - `versions: optional array of object { cryptomining_score, dataflow_score, fetched_at, 5 more }`

    - `cryptomining_score: optional number`

      The cryptomining score of the JavaScript content.

    - `dataflow_score: optional number`

      The dataflow score of the JavaScript content. This field has been deprecated in favour of js_integrity_score.

    - `fetched_at: optional string`

      The timestamp of when the script was last fetched.

    - `hash: optional string`

      The computed hash of the analyzed script.

    - `js_integrity_score: optional number`

      The integrity score of the JavaScript content.

    - `magecart_score: optional number`

      The magecart score of the JavaScript content.

    - `malware_score: optional number`

      The malware score of the JavaScript content.

    - `obfuscation_score: optional number`

      The obfuscation score of the JavaScript content. This field has been deprecated in favour of js_integrity_score.

# Cookies

## List Page Shield Cookies

**get** `/zones/{zone_id}/page_shield/cookies`

Lists all cookies collected by Page Shield.

### Path Parameters

- `zone_id: string`

  Identifier

### Query Parameters

- `direction: optional "asc" or "desc"`

  The direction used to sort returned cookies.'

  - `"asc"`

  - `"desc"`

- `domain: optional string`

  Filters the returned cookies that match the specified domain attribute

- `export: optional "csv"`

  Export the list of cookies as a file, limited to 50000 entries.

  - `"csv"`

- `hosts: optional string`

  Includes cookies that match one or more URL-encoded hostnames separated by commas.

  Wildcards are supported at the start and end of each hostname to support starts with, ends with
  and contains. If no wildcards are used, results will be filtered by exact match

- `http_only: optional boolean`

  Filters the returned cookies that are set with HttpOnly

- `name: optional string`

  Filters the returned cookies that match the specified name.
  Wildcards are supported at the start and end to support starts with, ends with
  and contains. e.g. session*

- `order_by: optional "first_seen_at" or "last_seen_at"`

  The field used to sort returned cookies.

  - `"first_seen_at"`

  - `"last_seen_at"`

- `page: optional string`

  The current page number of the paginated results.

  We additionally support a special value "all". When "all" is used, the API will return all the cookies
  with the applied filters in a single page. This feature is best-effort and it may only work for zones with
  a low number of cookies

- `page_url: optional string`

  Includes connections that match one or more page URLs (separated by commas) where they were last seen

  Wildcards are supported at the start and end of each page URL to support starts with, ends with
  and contains. If no wildcards are used, results will be filtered by exact match

- `path: optional string`

  Filters the returned cookies that match the specified path attribute

- `per_page: optional number`

  The number of results per page.

- `same_site: optional "lax" or "strict" or "none"`

  Filters the returned cookies that match the specified same_site attribute

  - `"lax"`

  - `"strict"`

  - `"none"`

- `secure: optional boolean`

  Filters the returned cookies that are set with Secure

- `type: optional "first_party" or "unknown"`

  Filters the returned cookies that match the specified type attribute

  - `"first_party"`

  - `"unknown"`

### Returns

- `result: array of object { id, first_seen_at, host, 11 more }`

  - `id: string`

    Identifier

  - `first_seen_at: string`

  - `host: string`

  - `last_seen_at: string`

  - `name: string`

  - `type: "first_party" or "unknown"`

    - `"first_party"`

    - `"unknown"`

  - `domain_attribute: optional string`

  - `expires_attribute: optional string`

  - `http_only_attribute: optional boolean`

  - `max_age_attribute: optional number`

  - `page_urls: optional array of string`

  - `path_attribute: optional string`

  - `same_site_attribute: optional "lax" or "strict" or "none"`

    - `"lax"`

    - `"strict"`

    - `"none"`

  - `secure_attribute: optional boolean`

- `result_info: object { count, page, per_page, 2 more }`

  - `count: number`

    Total number of results for the requested service

  - `page: number`

    Current page within paginated list of results

  - `per_page: number`

    Number of results per page of results

  - `total_count: number`

    Total results available without any search parameters

  - `total_pages: number`

    Total number of pages

- `success: true`

  Whether the API call was successful

  - `true`

- `errors: optional array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: optional array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/page_shield/cookies \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
```

#### Response

```json
{
  "result": [
    {
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "first_seen_at": "2021-08-18T10:51:08Z",
      "host": "blog.cloudflare.com",
      "last_seen_at": "2021-09-02T09:57:54Z",
      "name": "session_id",
      "type": "first_party",
      "domain_attribute": "cloudflare.com",
      "expires_attribute": "2021-10-02T09:57:54Z",
      "http_only_attribute": true,
      "max_age_attribute": 3600,
      "page_urls": [
        "blog.cloudflare.com/page1",
        "blog.cloudflare.com/page2"
      ],
      "path_attribute": "/",
      "same_site_attribute": "strict",
      "secure_attribute": true
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  },
  "success": true,
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
  ]
}
```

## Get a Page Shield cookie

**get** `/zones/{zone_id}/page_shield/cookies/{cookie_id}`

Fetches a cookie collected by Page Shield by cookie ID.

### Path Parameters

- `zone_id: string`

  Identifier

- `cookie_id: string`

  Identifier

### Returns

- `result: object { id, first_seen_at, host, 11 more }`

  - `id: string`

    Identifier

  - `first_seen_at: string`

  - `host: string`

  - `last_seen_at: string`

  - `name: string`

  - `type: "first_party" or "unknown"`

    - `"first_party"`

    - `"unknown"`

  - `domain_attribute: optional string`

  - `expires_attribute: optional string`

  - `http_only_attribute: optional boolean`

  - `max_age_attribute: optional number`

  - `page_urls: optional array of string`

  - `path_attribute: optional string`

  - `same_site_attribute: optional "lax" or "strict" or "none"`

    - `"lax"`

    - `"strict"`

    - `"none"`

  - `secure_attribute: optional boolean`

- `success: true`

  Whether the API call was successful

  - `true`

- `errors: optional array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: optional array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/page_shield/cookies/$COOKIE_ID \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
```

#### Response

```json
{
  "result": {
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "first_seen_at": "2021-08-18T10:51:08Z",
    "host": "blog.cloudflare.com",
    "last_seen_at": "2021-09-02T09:57:54Z",
    "name": "session_id",
    "type": "first_party",
    "domain_attribute": "cloudflare.com",
    "expires_attribute": "2021-10-02T09:57:54Z",
    "http_only_attribute": true,
    "max_age_attribute": 3600,
    "page_urls": [
      "blog.cloudflare.com/page1",
      "blog.cloudflare.com/page2"
    ],
    "path_attribute": "/",
    "same_site_attribute": "strict",
    "secure_attribute": true
  },
  "success": true,
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
  ]
}
```

## Domain Types

### Cookie List Response

- `CookieListResponse object { id, first_seen_at, host, 11 more }`

  - `id: string`

    Identifier

  - `first_seen_at: string`

  - `host: string`

  - `last_seen_at: string`

  - `name: string`

  - `type: "first_party" or "unknown"`

    - `"first_party"`

    - `"unknown"`

  - `domain_attribute: optional string`

  - `expires_attribute: optional string`

  - `http_only_attribute: optional boolean`

  - `max_age_attribute: optional number`

  - `page_urls: optional array of string`

  - `path_attribute: optional string`

  - `same_site_attribute: optional "lax" or "strict" or "none"`

    - `"lax"`

    - `"strict"`

    - `"none"`

  - `secure_attribute: optional boolean`

### Cookie Get Response

- `CookieGetResponse object { id, first_seen_at, host, 11 more }`

  - `id: string`

    Identifier

  - `first_seen_at: string`

  - `host: string`

  - `last_seen_at: string`

  - `name: string`

  - `type: "first_party" or "unknown"`

    - `"first_party"`

    - `"unknown"`

  - `domain_attribute: optional string`

  - `expires_attribute: optional string`

  - `http_only_attribute: optional boolean`

  - `max_age_attribute: optional number`

  - `page_urls: optional array of string`

  - `path_attribute: optional string`

  - `same_site_attribute: optional "lax" or "strict" or "none"`

    - `"lax"`

    - `"strict"`

    - `"none"`

  - `secure_attribute: optional boolean`

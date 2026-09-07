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

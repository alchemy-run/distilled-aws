# Zones

## List Zones

**get** `/zones`

Lists, searches, sorts, and filters your zones. Listing zones across more than 500 accounts
is currently not allowed.

### Query Parameters

- `account: optional object { id, name }`

  - `id: optional string`

    Filter by an account ID.

  - `name: optional string`

    An account Name. Optional filter operators can be provided to extend refine the search:

    * `equal` (default)
    * `not_equal`
    * `starts_with`
    * `ends_with`
    * `contains`
    * `starts_with_case_sensitive`
    * `ends_with_case_sensitive`
    * `contains_case_sensitive`

- `direction: optional "asc" or "desc"`

  Direction to order zones.

  - `"asc"`

  - `"desc"`

- `match: optional "any" or "all"`

  Whether to match all search requirements or at least one (any).

  - `"any"`

  - `"all"`

- `name: optional string`

  A domain name. Optional filter operators can be provided to extend refine the search:

  * `equal` (default)
  * `not_equal`
  * `starts_with`
  * `ends_with`
  * `contains`
  * `starts_with_case_sensitive`
  * `ends_with_case_sensitive`
  * `contains_case_sensitive`

- `order: optional "name" or "status" or "account.id" or 2 more`

  Field to order zones by.

  - `"name"`

  - `"status"`

  - `"account.id"`

  - `"account.name"`

  - `"plan.id"`

- `page: optional number`

  Page number of paginated results.

- `per_page: optional number`

  Number of zones per page.

- `status: optional "initializing" or "pending" or "active" or "moved"`

  Specify a zone status to filter by.

  - `"initializing"`

  - `"pending"`

  - `"active"`

  - `"moved"`

- `type: optional array of "full" or "partial" or "secondary" or "internal"`

  Zone types to filter by. Multiple types can be specified as a comma-separated list (e.g., ?type=full,partial,secondary). When this parameter is not provided, zones with type "internal" are excluded from the results.

  - `"full"`

  - `"partial"`

  - `"secondary"`

  - `"internal"`

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

- `success: boolean`

  Whether the API call was successful.

- `result: optional array of Zone`

  - `id: string`

    Identifier

  - `account: object { id, name }`

    The account the zone belongs to.

    - `id: optional string`

      Identifier

    - `name: optional string`

      The name of the account.

  - `activated_on: string`

    The last time proof of ownership was detected and the zone was made
    active.

  - `created_on: string`

    When the zone was created.

  - `development_mode: number`

    The interval (in seconds) from when development mode expires
    (positive integer) or last expired (negative integer) for the
    domain. If development mode has never been enabled, this value is 0.

  - `meta: object { cdn_only, custom_certificate_quota, dns_only, 4 more }`

    Metadata about the zone.

    - `cdn_only: optional boolean`

      The zone is only configured for CDN.

    - `custom_certificate_quota: optional number`

      Number of Custom Certificates the zone can have.

    - `dns_only: optional boolean`

      The zone is only configured for DNS.

    - `foundation_dns: optional boolean`

      The zone is setup with Foundation DNS.

    - `page_rule_quota: optional number`

      Number of Page Rules a zone can have.

    - `phishing_detected: optional boolean`

      The zone has been flagged for phishing.

    - `step: optional number`

  - `modified_on: string`

    When the zone was last modified.

  - `name: string`

    The domain name. Per [RFC 1035](https://datatracker.ietf.org/doc/html/rfc1035#section-2.3.4) the overall zone name can be up to 253 characters, with each segment ("label") not exceeding 63 characters.

  - `name_servers: array of string`

    The name servers Cloudflare assigns to a zone.

  - `original_dnshost: string`

    DNS host at the time of switching to Cloudflare.

  - `original_name_servers: array of string`

    Original name servers before moving to Cloudflare.

  - `original_registrar: string`

    Registrar for the domain at the time of switching to Cloudflare.

  - `owner: object { id, name, type }`

    The owner of the zone.

    - `id: optional string`

      Identifier

    - `name: optional string`

      Name of the owner.

    - `type: optional string`

      The type of owner.

  - `plan: object { id, can_subscribe, currency, 7 more }`

    A Zones subscription information.

    - `id: optional string`

      Identifier

    - `can_subscribe: optional boolean`

      States if the subscription can be activated.

    - `currency: optional string`

      The denomination of the customer.

    - `externally_managed: optional boolean`

      If this Zone is managed by another company.

    - `frequency: optional string`

      How often the customer is billed.

    - `is_subscribed: optional boolean`

      States if the subscription active.

    - `legacy_discount: optional boolean`

      If the legacy discount applies to this Zone.

    - `legacy_id: optional string`

      The legacy name of the plan.

    - `name: optional string`

      Name of the owner.

    - `price: optional number`

      How much the customer is paying.

  - `cname_suffix: optional string`

    Allows the customer to use a custom apex.
    *Tenants Only Configuration*.

  - `paused: optional boolean`

    Indicates whether the zone is only using Cloudflare DNS services. A
    true value means the zone will not receive security or performance
    benefits.

  - `permissions: optional array of string`

    Legacy permissions based on legacy user membership information.

  - `status: optional "initializing" or "pending" or "active" or "moved"`

    The zone status on Cloudflare.

    - `"initializing"`

    - `"pending"`

    - `"active"`

    - `"moved"`

  - `tenant: optional object { id, name }`

    The root organizational unit that this zone belongs to (such as a tenant or organization).

    - `id: optional string`

      Identifier

    - `name: optional string`

      The name of the Tenant account.

  - `tenant_unit: optional object { id }`

    The immediate parent organizational unit that this zone belongs to (such as under a tenant or sub-organization).

    - `id: optional string`

      Identifier

  - `type: optional Type`

    A full zone implies that DNS is hosted with Cloudflare. A partial zone is
    typically a partner-hosted zone or a CNAME setup.

    - `"full"`

    - `"partial"`

    - `"secondary"`

    - `"internal"`

  - `vanity_name_servers: optional array of string`

    An array of domains used for custom name servers. This is only available for Business and Enterprise plans.

  - `verification_key: optional string`

    Verification key for partial zone setup.

- `result_info: optional object { count, page, per_page, 2 more }`

  - `count: optional number`

    Total number of results for the requested service.

  - `page: optional number`

    Current page within paginated list of results.

  - `per_page: optional number`

    Number of results per page of results.

  - `total_count: optional number`

    Total results available without any search parameters.

  - `total_pages: optional number`

    Total number of pages

### Example

```http
curl https://api.cloudflare.com/client/v4/zones \
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
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "account": {
        "id": "023e105f4ecef8ad9ca31a8372d0c353",
        "name": "Example Account Name"
      },
      "activated_on": "2014-01-02T00:01:00.12345Z",
      "created_on": "2014-01-01T05:20:00.12345Z",
      "development_mode": 7200,
      "meta": {
        "cdn_only": true,
        "custom_certificate_quota": 1,
        "dns_only": true,
        "foundation_dns": true,
        "page_rule_quota": 100,
        "phishing_detected": false,
        "step": 2
      },
      "modified_on": "2014-01-01T05:20:00.12345Z",
      "name": "example.com",
      "name_servers": [
        "bob.ns.cloudflare.com",
        "lola.ns.cloudflare.com"
      ],
      "original_dnshost": "NameCheap",
      "original_name_servers": [
        "ns1.originaldnshost.com",
        "ns2.originaldnshost.com"
      ],
      "original_registrar": "GoDaddy",
      "owner": {
        "id": "023e105f4ecef8ad9ca31a8372d0c353",
        "name": "Example Org",
        "type": "organization"
      },
      "plan": {
        "id": "023e105f4ecef8ad9ca31a8372d0c353",
        "can_subscribe": false,
        "currency": "USD",
        "externally_managed": false,
        "frequency": "monthly",
        "is_subscribed": false,
        "legacy_discount": false,
        "legacy_id": "free",
        "name": "Example Org",
        "price": 10.99
      },
      "cname_suffix": "cdn.cloudflare.com",
      "paused": true,
      "permissions": [
        "#worker:read"
      ],
      "status": "active",
      "tenant": {
        "id": "023e105f4ecef8ad9ca31a8372d0c353",
        "name": "Example Account Name"
      },
      "tenant_unit": {
        "id": "023e105f4ecef8ad9ca31a8372d0c353"
      },
      "type": "full",
      "vanity_name_servers": [
        "ns1.example.com",
        "ns2.example.com"
      ],
      "verification_key": "284344499-1084221259"
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```

## Zone Details

**get** `/zones/{zone_id}`

Zone Details

### Path Parameters

- `zone_id: string`

  Identifier

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

- `success: boolean`

  Whether the API call was successful.

- `result: optional Zone`

  - `id: string`

    Identifier

  - `account: object { id, name }`

    The account the zone belongs to.

    - `id: optional string`

      Identifier

    - `name: optional string`

      The name of the account.

  - `activated_on: string`

    The last time proof of ownership was detected and the zone was made
    active.

  - `created_on: string`

    When the zone was created.

  - `development_mode: number`

    The interval (in seconds) from when development mode expires
    (positive integer) or last expired (negative integer) for the
    domain. If development mode has never been enabled, this value is 0.

  - `meta: object { cdn_only, custom_certificate_quota, dns_only, 4 more }`

    Metadata about the zone.

    - `cdn_only: optional boolean`

      The zone is only configured for CDN.

    - `custom_certificate_quota: optional number`

      Number of Custom Certificates the zone can have.

    - `dns_only: optional boolean`

      The zone is only configured for DNS.

    - `foundation_dns: optional boolean`

      The zone is setup with Foundation DNS.

    - `page_rule_quota: optional number`

      Number of Page Rules a zone can have.

    - `phishing_detected: optional boolean`

      The zone has been flagged for phishing.

    - `step: optional number`

  - `modified_on: string`

    When the zone was last modified.

  - `name: string`

    The domain name. Per [RFC 1035](https://datatracker.ietf.org/doc/html/rfc1035#section-2.3.4) the overall zone name can be up to 253 characters, with each segment ("label") not exceeding 63 characters.

  - `name_servers: array of string`

    The name servers Cloudflare assigns to a zone.

  - `original_dnshost: string`

    DNS host at the time of switching to Cloudflare.

  - `original_name_servers: array of string`

    Original name servers before moving to Cloudflare.

  - `original_registrar: string`

    Registrar for the domain at the time of switching to Cloudflare.

  - `owner: object { id, name, type }`

    The owner of the zone.

    - `id: optional string`

      Identifier

    - `name: optional string`

      Name of the owner.

    - `type: optional string`

      The type of owner.

  - `plan: object { id, can_subscribe, currency, 7 more }`

    A Zones subscription information.

    - `id: optional string`

      Identifier

    - `can_subscribe: optional boolean`

      States if the subscription can be activated.

    - `currency: optional string`

      The denomination of the customer.

    - `externally_managed: optional boolean`

      If this Zone is managed by another company.

    - `frequency: optional string`

      How often the customer is billed.

    - `is_subscribed: optional boolean`

      States if the subscription active.

    - `legacy_discount: optional boolean`

      If the legacy discount applies to this Zone.

    - `legacy_id: optional string`

      The legacy name of the plan.

    - `name: optional string`

      Name of the owner.

    - `price: optional number`

      How much the customer is paying.

  - `cname_suffix: optional string`

    Allows the customer to use a custom apex.
    *Tenants Only Configuration*.

  - `paused: optional boolean`

    Indicates whether the zone is only using Cloudflare DNS services. A
    true value means the zone will not receive security or performance
    benefits.

  - `permissions: optional array of string`

    Legacy permissions based on legacy user membership information.

  - `status: optional "initializing" or "pending" or "active" or "moved"`

    The zone status on Cloudflare.

    - `"initializing"`

    - `"pending"`

    - `"active"`

    - `"moved"`

  - `tenant: optional object { id, name }`

    The root organizational unit that this zone belongs to (such as a tenant or organization).

    - `id: optional string`

      Identifier

    - `name: optional string`

      The name of the Tenant account.

  - `tenant_unit: optional object { id }`

    The immediate parent organizational unit that this zone belongs to (such as under a tenant or sub-organization).

    - `id: optional string`

      Identifier

  - `type: optional Type`

    A full zone implies that DNS is hosted with Cloudflare. A partial zone is
    typically a partner-hosted zone or a CNAME setup.

    - `"full"`

    - `"partial"`

    - `"secondary"`

    - `"internal"`

  - `vanity_name_servers: optional array of string`

    An array of domains used for custom name servers. This is only available for Business and Enterprise plans.

  - `verification_key: optional string`

    Verification key for partial zone setup.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID \
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
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "account": {
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "name": "Example Account Name"
    },
    "activated_on": "2014-01-02T00:01:00.12345Z",
    "created_on": "2014-01-01T05:20:00.12345Z",
    "development_mode": 7200,
    "meta": {
      "cdn_only": true,
      "custom_certificate_quota": 1,
      "dns_only": true,
      "foundation_dns": true,
      "page_rule_quota": 100,
      "phishing_detected": false,
      "step": 2
    },
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "name": "example.com",
    "name_servers": [
      "bob.ns.cloudflare.com",
      "lola.ns.cloudflare.com"
    ],
    "original_dnshost": "NameCheap",
    "original_name_servers": [
      "ns1.originaldnshost.com",
      "ns2.originaldnshost.com"
    ],
    "original_registrar": "GoDaddy",
    "owner": {
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "name": "Example Org",
      "type": "organization"
    },
    "plan": {
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "can_subscribe": false,
      "currency": "USD",
      "externally_managed": false,
      "frequency": "monthly",
      "is_subscribed": false,
      "legacy_discount": false,
      "legacy_id": "free",
      "name": "Example Org",
      "price": 10.99
    },
    "cname_suffix": "cdn.cloudflare.com",
    "paused": true,
    "permissions": [
      "#worker:read"
    ],
    "status": "active",
    "tenant": {
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "name": "Example Account Name"
    },
    "tenant_unit": {
      "id": "023e105f4ecef8ad9ca31a8372d0c353"
    },
    "type": "full",
    "vanity_name_servers": [
      "ns1.example.com",
      "ns2.example.com"
    ],
    "verification_key": "284344499-1084221259"
  }
}
```

## Create Zone

**post** `/zones`

Create Zone

### Body Parameters

- `account: object { id }`

  - `id: optional string`

    Identifier

- `name: string`

  The domain name. Per [RFC 1035](https://datatracker.ietf.org/doc/html/rfc1035#section-2.3.4) the overall zone name can be up to 253 characters, with each segment ("label") not exceeding 63 characters.

- `type: optional Type`

  A full zone implies that DNS is hosted with Cloudflare. A partial zone is
  typically a partner-hosted zone or a CNAME setup.

  - `"full"`

  - `"partial"`

  - `"secondary"`

  - `"internal"`

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

- `success: boolean`

  Whether the API call was successful.

- `result: optional Zone`

  - `id: string`

    Identifier

  - `account: object { id, name }`

    The account the zone belongs to.

    - `id: optional string`

      Identifier

    - `name: optional string`

      The name of the account.

  - `activated_on: string`

    The last time proof of ownership was detected and the zone was made
    active.

  - `created_on: string`

    When the zone was created.

  - `development_mode: number`

    The interval (in seconds) from when development mode expires
    (positive integer) or last expired (negative integer) for the
    domain. If development mode has never been enabled, this value is 0.

  - `meta: object { cdn_only, custom_certificate_quota, dns_only, 4 more }`

    Metadata about the zone.

    - `cdn_only: optional boolean`

      The zone is only configured for CDN.

    - `custom_certificate_quota: optional number`

      Number of Custom Certificates the zone can have.

    - `dns_only: optional boolean`

      The zone is only configured for DNS.

    - `foundation_dns: optional boolean`

      The zone is setup with Foundation DNS.

    - `page_rule_quota: optional number`

      Number of Page Rules a zone can have.

    - `phishing_detected: optional boolean`

      The zone has been flagged for phishing.

    - `step: optional number`

  - `modified_on: string`

    When the zone was last modified.

  - `name: string`

    The domain name. Per [RFC 1035](https://datatracker.ietf.org/doc/html/rfc1035#section-2.3.4) the overall zone name can be up to 253 characters, with each segment ("label") not exceeding 63 characters.

  - `name_servers: array of string`

    The name servers Cloudflare assigns to a zone.

  - `original_dnshost: string`

    DNS host at the time of switching to Cloudflare.

  - `original_name_servers: array of string`

    Original name servers before moving to Cloudflare.

  - `original_registrar: string`

    Registrar for the domain at the time of switching to Cloudflare.

  - `owner: object { id, name, type }`

    The owner of the zone.

    - `id: optional string`

      Identifier

    - `name: optional string`

      Name of the owner.

    - `type: optional string`

      The type of owner.

  - `plan: object { id, can_subscribe, currency, 7 more }`

    A Zones subscription information.

    - `id: optional string`

      Identifier

    - `can_subscribe: optional boolean`

      States if the subscription can be activated.

    - `currency: optional string`

      The denomination of the customer.

    - `externally_managed: optional boolean`

      If this Zone is managed by another company.

    - `frequency: optional string`

      How often the customer is billed.

    - `is_subscribed: optional boolean`

      States if the subscription active.

    - `legacy_discount: optional boolean`

      If the legacy discount applies to this Zone.

    - `legacy_id: optional string`

      The legacy name of the plan.

    - `name: optional string`

      Name of the owner.

    - `price: optional number`

      How much the customer is paying.

  - `cname_suffix: optional string`

    Allows the customer to use a custom apex.
    *Tenants Only Configuration*.

  - `paused: optional boolean`

    Indicates whether the zone is only using Cloudflare DNS services. A
    true value means the zone will not receive security or performance
    benefits.

  - `permissions: optional array of string`

    Legacy permissions based on legacy user membership information.

  - `status: optional "initializing" or "pending" or "active" or "moved"`

    The zone status on Cloudflare.

    - `"initializing"`

    - `"pending"`

    - `"active"`

    - `"moved"`

  - `tenant: optional object { id, name }`

    The root organizational unit that this zone belongs to (such as a tenant or organization).

    - `id: optional string`

      Identifier

    - `name: optional string`

      The name of the Tenant account.

  - `tenant_unit: optional object { id }`

    The immediate parent organizational unit that this zone belongs to (such as under a tenant or sub-organization).

    - `id: optional string`

      Identifier

  - `type: optional Type`

    A full zone implies that DNS is hosted with Cloudflare. A partial zone is
    typically a partner-hosted zone or a CNAME setup.

    - `"full"`

    - `"partial"`

    - `"secondary"`

    - `"internal"`

  - `vanity_name_servers: optional array of string`

    An array of domains used for custom name servers. This is only available for Business and Enterprise plans.

  - `verification_key: optional string`

    Verification key for partial zone setup.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "account": {},
          "name": "example.com",
          "type": "full"
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
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "account": {
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "name": "Example Account Name"
    },
    "activated_on": "2014-01-02T00:01:00.12345Z",
    "created_on": "2014-01-01T05:20:00.12345Z",
    "development_mode": 7200,
    "meta": {
      "cdn_only": true,
      "custom_certificate_quota": 1,
      "dns_only": true,
      "foundation_dns": true,
      "page_rule_quota": 100,
      "phishing_detected": false,
      "step": 2
    },
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "name": "example.com",
    "name_servers": [
      "bob.ns.cloudflare.com",
      "lola.ns.cloudflare.com"
    ],
    "original_dnshost": "NameCheap",
    "original_name_servers": [
      "ns1.originaldnshost.com",
      "ns2.originaldnshost.com"
    ],
    "original_registrar": "GoDaddy",
    "owner": {
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "name": "Example Org",
      "type": "organization"
    },
    "plan": {
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "can_subscribe": false,
      "currency": "USD",
      "externally_managed": false,
      "frequency": "monthly",
      "is_subscribed": false,
      "legacy_discount": false,
      "legacy_id": "free",
      "name": "Example Org",
      "price": 10.99
    },
    "cname_suffix": "cdn.cloudflare.com",
    "paused": true,
    "permissions": [
      "#worker:read"
    ],
    "status": "active",
    "tenant": {
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "name": "Example Account Name"
    },
    "tenant_unit": {
      "id": "023e105f4ecef8ad9ca31a8372d0c353"
    },
    "type": "full",
    "vanity_name_servers": [
      "ns1.example.com",
      "ns2.example.com"
    ],
    "verification_key": "284344499-1084221259"
  }
}
```

## Edit Zone

**patch** `/zones/{zone_id}`

Edits a zone. Only one zone property can be changed at a time.

### Path Parameters

- `zone_id: string`

  Identifier

### Body Parameters

- `paused: optional boolean`

  Indicates whether the zone is only using Cloudflare DNS services. A
  true value means the zone will not receive security or performance
  benefits.

- `type: optional "full" or "partial" or "secondary" or "internal"`

  A full zone implies that DNS is hosted with Cloudflare. A partial
  zone is typically a partner-hosted zone or a CNAME setup. This
  parameter is only available to Enterprise customers or if it has
  been explicitly enabled on a zone.

  - `"full"`

  - `"partial"`

  - `"secondary"`

  - `"internal"`

- `vanity_name_servers: optional array of string`

  An array of domains used for custom name servers. This is only
  available for Business and Enterprise plans.

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

- `success: boolean`

  Whether the API call was successful.

- `result: optional Zone`

  - `id: string`

    Identifier

  - `account: object { id, name }`

    The account the zone belongs to.

    - `id: optional string`

      Identifier

    - `name: optional string`

      The name of the account.

  - `activated_on: string`

    The last time proof of ownership was detected and the zone was made
    active.

  - `created_on: string`

    When the zone was created.

  - `development_mode: number`

    The interval (in seconds) from when development mode expires
    (positive integer) or last expired (negative integer) for the
    domain. If development mode has never been enabled, this value is 0.

  - `meta: object { cdn_only, custom_certificate_quota, dns_only, 4 more }`

    Metadata about the zone.

    - `cdn_only: optional boolean`

      The zone is only configured for CDN.

    - `custom_certificate_quota: optional number`

      Number of Custom Certificates the zone can have.

    - `dns_only: optional boolean`

      The zone is only configured for DNS.

    - `foundation_dns: optional boolean`

      The zone is setup with Foundation DNS.

    - `page_rule_quota: optional number`

      Number of Page Rules a zone can have.

    - `phishing_detected: optional boolean`

      The zone has been flagged for phishing.

    - `step: optional number`

  - `modified_on: string`

    When the zone was last modified.

  - `name: string`

    The domain name. Per [RFC 1035](https://datatracker.ietf.org/doc/html/rfc1035#section-2.3.4) the overall zone name can be up to 253 characters, with each segment ("label") not exceeding 63 characters.

  - `name_servers: array of string`

    The name servers Cloudflare assigns to a zone.

  - `original_dnshost: string`

    DNS host at the time of switching to Cloudflare.

  - `original_name_servers: array of string`

    Original name servers before moving to Cloudflare.

  - `original_registrar: string`

    Registrar for the domain at the time of switching to Cloudflare.

  - `owner: object { id, name, type }`

    The owner of the zone.

    - `id: optional string`

      Identifier

    - `name: optional string`

      Name of the owner.

    - `type: optional string`

      The type of owner.

  - `plan: object { id, can_subscribe, currency, 7 more }`

    A Zones subscription information.

    - `id: optional string`

      Identifier

    - `can_subscribe: optional boolean`

      States if the subscription can be activated.

    - `currency: optional string`

      The denomination of the customer.

    - `externally_managed: optional boolean`

      If this Zone is managed by another company.

    - `frequency: optional string`

      How often the customer is billed.

    - `is_subscribed: optional boolean`

      States if the subscription active.

    - `legacy_discount: optional boolean`

      If the legacy discount applies to this Zone.

    - `legacy_id: optional string`

      The legacy name of the plan.

    - `name: optional string`

      Name of the owner.

    - `price: optional number`

      How much the customer is paying.

  - `cname_suffix: optional string`

    Allows the customer to use a custom apex.
    *Tenants Only Configuration*.

  - `paused: optional boolean`

    Indicates whether the zone is only using Cloudflare DNS services. A
    true value means the zone will not receive security or performance
    benefits.

  - `permissions: optional array of string`

    Legacy permissions based on legacy user membership information.

  - `status: optional "initializing" or "pending" or "active" or "moved"`

    The zone status on Cloudflare.

    - `"initializing"`

    - `"pending"`

    - `"active"`

    - `"moved"`

  - `tenant: optional object { id, name }`

    The root organizational unit that this zone belongs to (such as a tenant or organization).

    - `id: optional string`

      Identifier

    - `name: optional string`

      The name of the Tenant account.

  - `tenant_unit: optional object { id }`

    The immediate parent organizational unit that this zone belongs to (such as under a tenant or sub-organization).

    - `id: optional string`

      Identifier

  - `type: optional Type`

    A full zone implies that DNS is hosted with Cloudflare. A partial zone is
    typically a partner-hosted zone or a CNAME setup.

    - `"full"`

    - `"partial"`

    - `"secondary"`

    - `"internal"`

  - `vanity_name_servers: optional array of string`

    An array of domains used for custom name servers. This is only available for Business and Enterprise plans.

  - `verification_key: optional string`

    Verification key for partial zone setup.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "type": "full",
          "vanity_name_servers": [
            "ns1.example.com",
            "ns2.example.com"
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
  "success": true,
  "result": {
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "account": {
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "name": "Example Account Name"
    },
    "activated_on": "2014-01-02T00:01:00.12345Z",
    "created_on": "2014-01-01T05:20:00.12345Z",
    "development_mode": 7200,
    "meta": {
      "cdn_only": true,
      "custom_certificate_quota": 1,
      "dns_only": true,
      "foundation_dns": true,
      "page_rule_quota": 100,
      "phishing_detected": false,
      "step": 2
    },
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "name": "example.com",
    "name_servers": [
      "bob.ns.cloudflare.com",
      "lola.ns.cloudflare.com"
    ],
    "original_dnshost": "NameCheap",
    "original_name_servers": [
      "ns1.originaldnshost.com",
      "ns2.originaldnshost.com"
    ],
    "original_registrar": "GoDaddy",
    "owner": {
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "name": "Example Org",
      "type": "organization"
    },
    "plan": {
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "can_subscribe": false,
      "currency": "USD",
      "externally_managed": false,
      "frequency": "monthly",
      "is_subscribed": false,
      "legacy_discount": false,
      "legacy_id": "free",
      "name": "Example Org",
      "price": 10.99
    },
    "cname_suffix": "cdn.cloudflare.com",
    "paused": true,
    "permissions": [
      "#worker:read"
    ],
    "status": "active",
    "tenant": {
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "name": "Example Account Name"
    },
    "tenant_unit": {
      "id": "023e105f4ecef8ad9ca31a8372d0c353"
    },
    "type": "full",
    "vanity_name_servers": [
      "ns1.example.com",
      "ns2.example.com"
    ],
    "verification_key": "284344499-1084221259"
  }
}
```

## Delete Zone

**delete** `/zones/{zone_id}`

Deletes an existing zone.

### Path Parameters

- `zone_id: string`

  Identifier

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

- `success: boolean`

  Whether the API call was successful.

- `result: optional object { id }`

  - `id: string`

    Identifier

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID \
    -X DELETE \
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
    "id": "023e105f4ecef8ad9ca31a8372d0c353"
  }
}
```

## Domain Types

### Type

- `Type = "full" or "partial" or "secondary" or "internal"`

  A full zone implies that DNS is hosted with Cloudflare. A partial zone is
  typically a partner-hosted zone or a CNAME setup.

  - `"full"`

  - `"partial"`

  - `"secondary"`

  - `"internal"`

### Zone

- `Zone object { id, account, activated_on, 20 more }`

  - `id: string`

    Identifier

  - `account: object { id, name }`

    The account the zone belongs to.

    - `id: optional string`

      Identifier

    - `name: optional string`

      The name of the account.

  - `activated_on: string`

    The last time proof of ownership was detected and the zone was made
    active.

  - `created_on: string`

    When the zone was created.

  - `development_mode: number`

    The interval (in seconds) from when development mode expires
    (positive integer) or last expired (negative integer) for the
    domain. If development mode has never been enabled, this value is 0.

  - `meta: object { cdn_only, custom_certificate_quota, dns_only, 4 more }`

    Metadata about the zone.

    - `cdn_only: optional boolean`

      The zone is only configured for CDN.

    - `custom_certificate_quota: optional number`

      Number of Custom Certificates the zone can have.

    - `dns_only: optional boolean`

      The zone is only configured for DNS.

    - `foundation_dns: optional boolean`

      The zone is setup with Foundation DNS.

    - `page_rule_quota: optional number`

      Number of Page Rules a zone can have.

    - `phishing_detected: optional boolean`

      The zone has been flagged for phishing.

    - `step: optional number`

  - `modified_on: string`

    When the zone was last modified.

  - `name: string`

    The domain name. Per [RFC 1035](https://datatracker.ietf.org/doc/html/rfc1035#section-2.3.4) the overall zone name can be up to 253 characters, with each segment ("label") not exceeding 63 characters.

  - `name_servers: array of string`

    The name servers Cloudflare assigns to a zone.

  - `original_dnshost: string`

    DNS host at the time of switching to Cloudflare.

  - `original_name_servers: array of string`

    Original name servers before moving to Cloudflare.

  - `original_registrar: string`

    Registrar for the domain at the time of switching to Cloudflare.

  - `owner: object { id, name, type }`

    The owner of the zone.

    - `id: optional string`

      Identifier

    - `name: optional string`

      Name of the owner.

    - `type: optional string`

      The type of owner.

  - `plan: object { id, can_subscribe, currency, 7 more }`

    A Zones subscription information.

    - `id: optional string`

      Identifier

    - `can_subscribe: optional boolean`

      States if the subscription can be activated.

    - `currency: optional string`

      The denomination of the customer.

    - `externally_managed: optional boolean`

      If this Zone is managed by another company.

    - `frequency: optional string`

      How often the customer is billed.

    - `is_subscribed: optional boolean`

      States if the subscription active.

    - `legacy_discount: optional boolean`

      If the legacy discount applies to this Zone.

    - `legacy_id: optional string`

      The legacy name of the plan.

    - `name: optional string`

      Name of the owner.

    - `price: optional number`

      How much the customer is paying.

  - `cname_suffix: optional string`

    Allows the customer to use a custom apex.
    *Tenants Only Configuration*.

  - `paused: optional boolean`

    Indicates whether the zone is only using Cloudflare DNS services. A
    true value means the zone will not receive security or performance
    benefits.

  - `permissions: optional array of string`

    Legacy permissions based on legacy user membership information.

  - `status: optional "initializing" or "pending" or "active" or "moved"`

    The zone status on Cloudflare.

    - `"initializing"`

    - `"pending"`

    - `"active"`

    - `"moved"`

  - `tenant: optional object { id, name }`

    The root organizational unit that this zone belongs to (such as a tenant or organization).

    - `id: optional string`

      Identifier

    - `name: optional string`

      The name of the Tenant account.

  - `tenant_unit: optional object { id }`

    The immediate parent organizational unit that this zone belongs to (such as under a tenant or sub-organization).

    - `id: optional string`

      Identifier

  - `type: optional Type`

    A full zone implies that DNS is hosted with Cloudflare. A partial zone is
    typically a partner-hosted zone or a CNAME setup.

    - `"full"`

    - `"partial"`

    - `"secondary"`

    - `"internal"`

  - `vanity_name_servers: optional array of string`

    An array of domains used for custom name servers. This is only available for Business and Enterprise plans.

  - `verification_key: optional string`

    Verification key for partial zone setup.

### Zone Delete Response

- `ZoneDeleteResponse object { id }`

  - `id: string`

    Identifier

# Activation Check

## Rerun the Activation Check

**put** `/zones/{zone_id}/activation_check`

Triggeres a new activation check for a PENDING Zone. This can be
triggered every 5 min for paygo/ent customers, every hour for FREE
Zones.

### Path Parameters

- `zone_id: string`

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

- `result: optional object { id }`

  - `id: optional string`

    Identifier.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/activation_check \
    -X PUT \
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
    "id": "023e105f4ecef8ad9ca31a8372d0c353"
  }
}
```

## Domain Types

### Activation Check Trigger Response

- `ActivationCheckTriggerResponse object { id }`

  - `id: optional string`

    Identifier.

# Settings

## Get all zone settings

**get** `/zones/{zone_id}/settings`

Available settings for your user in relation to a zone.

### Path Parameters

- `zone_id: string`

  Identifier

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

- `success: boolean`

  Whether the API call was successful

- `result: optional array of ZeroRTT or AdvancedDDoS or object { id, modified_on, value }  or 59 more`

  - `ZeroRTT object { id, value, editable, modified_on }`

    0-RTT session resumption enabled for this zone.

    - `id: "0rtt"`

      ID of the zone setting.

      - `"0rtt"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `AdvancedDDoS object { id, value, editable, modified_on }`

    Advanced protection from Distributed Denial of Service (DDoS) attacks on your website. This is an uneditable value that is 'on' in the case of Business and Enterprise zones.

    - `id: "advanced_ddos"`

      ID of the zone setting.

      - `"advanced_ddos"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesCacheRulesAegis object { id, modified_on, value }`

    Aegis provides dedicated egress IPs (from Cloudflare to your origin) for your layer 7 WAF and CDN services. The egress IPs are reserved exclusively for your account so that you can increase your origin security by only allowing traffic from a small list of IP addresses.

    - `id: "aegis"`

      ID of the zone setting.

      - `"aegis"`

    - `modified_on: optional string`

      Last time this setting was modified.

    - `value: optional object { enabled, pool_id }`

      Value of the zone setting.

      - `enabled: optional boolean`

        Whether the feature is enabled or not.

      - `pool_id: optional string`

        Egress pool id which refers to a grouping of dedicated egress IPs through which Cloudflare will connect to origin.

  - `AlwaysOnline object { id, value, editable, modified_on }`

    When enabled, Cloudflare serves limited copies of web pages available from the [Internet Archive's Wayback Machine](https://archive.org/web/) if your server is offline. Refer to [Always Online](https://developers.cloudflare.com/cache/about/always-online) for more information.

    - `id: "always_online"`

      ID of the zone setting.

      - `"always_online"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasAlwaysUseHTTPS object { id, value, editable, modified_on }`

    Reply to all requests for URLs that use "http" with a 301 redirect to the equivalent "https" URL. If you only want to redirect for a subset of requests, consider creating an "Always use HTTPS" page rule.

    - `id: "always_use_https"`

      ID of the zone setting.

      - `"always_use_https"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasAutomaticHTTPSRewrites object { id, value, editable, modified_on }`

    Enable the Automatic HTTPS Rewrites feature for this zone.

    - `id: "automatic_https_rewrites"`

      ID of the zone setting.

      - `"automatic_https_rewrites"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `Brotli object { id, value, editable, modified_on }`

    When the client requesting an asset supports the Brotli compression algorithm, Cloudflare will serve a Brotli compressed version of the asset.

    - `id: "brotli"`

      ID of the zone setting.

      - `"brotli"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasBrowserCacheTTL object { id, value, editable, modified_on }`

    Browser Cache TTL (in seconds) specifies how long Cloudflare-cached resources will remain on your visitors' computers. Cloudflare will honor any larger times specified by your server. (https://support.cloudflare.com/hc/en-us/articles/200168276).

    - `id: "browser_cache_ttl"`

      ID of the zone setting.

      - `"browser_cache_ttl"`

    - `value: number`

      Current value of the zone setting.

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasBrowserCheck object { id, value, editable, modified_on }`

    Browser Integrity Check is similar to Bad Behavior and looks for common HTTP headers abused most commonly by spammers and denies access to your page.  It will also challenge visitors that do not have a user agent or a non standard user agent (also commonly used by abuse bots, crawlers or visitors). (https://support.cloudflare.com/hc/en-us/articles/200170086).

    - `id: "browser_check"`

      ID of the zone setting.

      - `"browser_check"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasCacheLevel object { id, value, editable, modified_on }`

    Cache Level functions based off the setting level. The basic setting will cache most static resources (i.e., css, images, and JavaScript). The simplified setting will ignore the query string when delivering a cached resource. The aggressive setting will cache all static resources, including ones with a query string. (https://support.cloudflare.com/hc/en-us/articles/200168256).

    - `id: "cache_level"`

      ID of the zone setting.

      - `"cache_level"`

    - `value: "aggressive" or "basic" or "simplified"`

      Current value of the zone setting.

      - `"aggressive"`

      - `"basic"`

      - `"simplified"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ChallengeTTL object { id, value, editable, modified_on }`

    Specify how long a visitor is allowed access to your site after successfully completing a challenge (such as a CAPTCHA). After the TTL has expired the visitor will have to complete a new challenge. We recommend a 15 - 45 minute setting and will attempt to honor any setting above 45 minutes. (https://support.cloudflare.com/hc/en-us/articles/200170136).

    - `id: "challenge_ttl"`

      ID of the zone setting.

      - `"challenge_ttl"`

    - `value: 300 or 900 or 1800 or 11 more`

      Current value of the zone setting.

      - `300`

      - `900`

      - `1800`

      - `2700`

      - `3600`

      - `7200`

      - `10800`

      - `14400`

      - `28800`

      - `57600`

      - `86400`

      - `604800`

      - `2592000`

      - `31536000`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `Ciphers object { id, value, editable, modified_on }`

    An allowlist of ciphers for TLS termination. These ciphers must be in the BoringSSL format.

    - `id: "ciphers"`

      ID of the zone setting.

      - `"ciphers"`

    - `value: array of string`

      Current value of the zone setting.

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesContentConverter object { id, value, editable, modified_on }`

    When enabled and the client sends an Accept header requesting text/markdown,
    Cloudflare will convert HTML responses to Markdown format using the toMarkdown() service.
    Refer to the [developer documentation](https://developers.cloudflare.com/workers-ai/features/markdown-conversion/) for more information.

    - `id: "content_converter"`

      ID of the zone setting.

      - `"content_converter"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesCNAMEFlattening object { id, value, editable, modified_on }`

    Whether or not cname flattening is on.

    - `id: "cname_flattening"`

      How to flatten the cname destination.

      - `"cname_flattening"`

    - `value: "flatten_at_root" or "flatten_all"`

      Current value of the zone setting.

      - `"flatten_at_root"`

      - `"flatten_all"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `DevelopmentMode object { id, value, editable, 2 more }`

    Development Mode temporarily allows you to enter development mode for your websites if you need to make changes to your site. This will bypass Cloudflare's accelerated cache and slow down your site, but is useful if you are making changes to cacheable content (like images, css, or JavaScript) and would like to see those changes right away. Once entered, development mode will last for 3 hours and then automatically toggle off.

    - `id: "development_mode"`

      ID of the zone setting.

      - `"development_mode"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

    - `time_remaining: optional number`

      Value of the zone setting.
      Notes: The interval (in seconds) from when development mode expires (positive integer) or last expired (negative integer) for the domain. If development mode has never been enabled, this value is false.

  - `EarlyHints object { id, value, editable, modified_on }`

    When enabled, Cloudflare will attempt to speed up overall page loads by serving `103` responses with `Link` headers from the final response. Refer to [Early Hints](https://developers.cloudflare.com/cache/about/early-hints) for more information.

    - `id: "early_hints"`

      ID of the zone setting.

      - `"early_hints"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasEdgeCacheTTL object { id, value, editable, modified_on }`

    Time (in seconds) that a resource will be ensured to remain on Cloudflare's cache servers.

    - `id: "edge_cache_ttl"`

      ID of the zone setting.

      - `"edge_cache_ttl"`

    - `value: 30 or 60 or 300 or 18 more`

      Current value of the zone setting.

      - `30`

      - `60`

      - `300`

      - `1200`

      - `1800`

      - `3600`

      - `7200`

      - `10800`

      - `14400`

      - `18000`

      - `28800`

      - `43200`

      - `57600`

      - `72000`

      - `86400`

      - `172800`

      - `259200`

      - `345600`

      - `432000`

      - `518400`

      - `604800`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasEmailObfuscation object { id, value, editable, modified_on }`

    Encrypt email adresses on your web page from bots, while keeping them visible to humans. (https://support.cloudflare.com/hc/en-us/articles/200170016).

    - `id: "email_obfuscation"`

      ID of the zone setting.

      - `"email_obfuscation"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `H2Prioritization object { id, value, editable, modified_on }`

    HTTP/2 Edge Prioritization optimises the delivery of resources served through HTTP/2 to improve page load performance. It also supports fine control of content delivery when used in conjunction with Workers.

    - `id: "h2_prioritization"`

      ID of the zone setting.

      - `"h2_prioritization"`

    - `value: "on" or "off" or "custom"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

      - `"custom"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `HotlinkProtection object { id, value, editable, modified_on }`

    When enabled, the Hotlink Protection option ensures that other sites cannot suck up your bandwidth by building pages that use images hosted on your site. Anytime a request for an image on your site hits Cloudflare, we check to ensure that it's not another site requesting them. People will still be able to download and view images from your page, but other sites won't be able to steal them for use on their own pages. (https://support.cloudflare.com/hc/en-us/articles/200170026).

    - `id: "hotlink_protection"`

      ID of the zone setting.

      - `"hotlink_protection"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `HTTP2 object { id, value, editable, modified_on }`

    HTTP2 enabled for this zone.

    - `id: "http2"`

      ID of the zone setting.

      - `"http2"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `HTTP3 object { id, value, editable, modified_on }`

    HTTP3 enabled for this zone.

    - `id: "http3"`

      ID of the zone setting.

      - `"http3"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ImageResizing object { id, value, editable, modified_on }`

    Image Transformations provides on-demand resizing, conversion and optimization for images served through Cloudflare's network. Refer to the [Image Transformations documentation](https://developers.cloudflare.com/images/) for more information.

    - `id: "image_resizing"`

      ID of the zone setting.

      - `"image_resizing"`

    - `value: "on" or "off" or "open"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

      - `"open"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasIPGeolocation object { id, value, editable, modified_on }`

    Enable IP Geolocation to have Cloudflare geolocate visitors to your website and pass the country code to you. (https://support.cloudflare.com/hc/en-us/articles/200168236).

    - `id: "ip_geolocation"`

      ID of the zone setting.

      - `"ip_geolocation"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `IPV6 object { id, value, editable, modified_on }`

    Enable IPv6 on all subdomains that are Cloudflare enabled.  (https://support.cloudflare.com/hc/en-us/articles/200168586).

    - `id: "ipv6"`

      ID of the zone setting.

      - `"ipv6"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesMaxUpload object { id, value, editable, modified_on }`

    Maximum size of an allowable upload.

    - `id: "max_upload"`

      identifier of the zone setting.

      - `"max_upload"`

    - `value: 100 or 125 or 150 or 15 more`

      Current value of the zone setting.

      - `100`

      - `125`

      - `150`

      - `175`

      - `200`

      - `225`

      - `250`

      - `275`

      - `300`

      - `325`

      - `350`

      - `375`

      - `400`

      - `425`

      - `450`

      - `475`

      - `500`

      - `1000`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `MinTLSVersion object { id, value, editable, modified_on }`

    Only accepts HTTPS requests that use at least the TLS protocol version specified. For example, if TLS 1.1 is selected, TLS 1.0 connections will be rejected, while 1.1, 1.2, and 1.3 (if enabled) will be permitted.

    - `id: "min_tls_version"`

      ID of the zone setting.

      - `"min_tls_version"`

    - `value: "1.0" or "1.1" or "1.2" or "1.3"`

      Current value of the zone setting.

      - `"1.0"`

      - `"1.1"`

      - `"1.2"`

      - `"1.3"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasMirage object { id, value, editable, modified_on }`

    Automatically optimize image loading for website visitors on mobile
    devices. Refer to [our blog post](http://blog.cloudflare.com/mirage2-solving-mobile-speed)
    for more information.

    - `id: "mirage"`

      ID of the zone setting.

      - `"mirage"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `NEL object { id, value, editable, modified_on }`

    Enable Network Error Logging reporting on your zone. (Beta)

    - `id: "nel"`

      Zone setting identifier.

      - `"nel"`

    - `value: object { enabled }`

      Current value of the zone setting.

      - `enabled: optional boolean`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasOpportunisticEncryption object { id, value, editable, modified_on }`

    Enables the Opportunistic Encryption feature for a zone.

    - `id: "opportunistic_encryption"`

      ID of the zone setting.

      - `"opportunistic_encryption"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `OpportunisticOnion object { id, value, editable, modified_on }`

    Add an Alt-Svc header to all legitimate requests from Tor, allowing the connection to use our onion services instead of exit nodes.

    - `id: "opportunistic_onion"`

      ID of the zone setting.

      - `"opportunistic_onion"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `OrangeToOrange object { id, value, editable, modified_on }`

    Orange to Orange (O2O) allows zones on Cloudflare to CNAME to other zones also on Cloudflare.

    - `id: "orange_to_orange"`

      ID of the zone setting.

      - `"orange_to_orange"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasOriginErrorPagePassThru object { id, value, editable, modified_on }`

    Cloudflare will proxy customer error pages on any 502,504 errors on origin server instead of showing a default Cloudflare error page. This does not apply to 522 errors and is limited to Enterprise Zones.

    - `id: "origin_error_page_pass_thru"`

      ID of the zone setting.

      - `"origin_error_page_pass_thru"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesCacheRulesOriginH2MaxStreams object { id, modified_on, value }`

    Origin H2 Max Streams configures the max number of concurrent requests that Cloudflare will send within the same connection when communicating with the origin server, if the origin supports it. Note that if your origin does not support H2 multiplexing, 5xx errors may be observed, particularly 520s. Also note that the default value is `100` for all plan types except Enterprise where it is `1`. `1` means that H2 multiplexing is disabled.

    - `id: "origin_h2_max_streams"`

      Value of the zone setting.

      - `"origin_h2_max_streams"`

    - `modified_on: optional string`

      Last time this setting was modified.

    - `value: optional number`

      Value of the Origin H2 Max Streams Setting.

  - `ZonesCacheRulesOriginMaxHTTPVersion object { id, modified_on, value }`

    Origin Max HTTP Setting Version sets the highest HTTP version Cloudflare will attempt to use with your origin. This setting allows Cloudflare to make HTTP/2 requests to your origin. (Refer to [Enable HTTP/2 to Origin](https://developers.cloudflare.com/cache/how-to/enable-http2-to-origin/), for more information.). The default value is "2" for all plan types except Enterprise where it is "1".

    - `id: "origin_max_http_version"`

      Value of the zone setting.

      - `"origin_max_http_version"`

    - `modified_on: optional string`

      Last time this setting was modified.

    - `value: optional "2" or "1"`

      Value of the Origin Max HTTP Version Setting.

      - `"2"`

      - `"1"`

  - `ZonesSchemasPolish object { id, value, editable, modified_on }`

    Removes metadata and compresses your images for faster page load times. Basic (Lossless): Reduce the size of PNG, JPEG, and GIF files - no impact on visual quality. Basic + JPEG (Lossy): Further reduce the size of JPEG files for faster image loading. Larger JPEGs are converted to progressive images, loading a lower-resolution image first and ending in a higher-resolution version. Not recommended for hi-res photography sites.

    - `id: "polish"`

      ID of the zone setting.

      - `"polish"`

    - `value: "off" or "lossless" or "lossy"`

      Current value of the zone setting.

      - `"off"`

      - `"lossless"`

      - `"lossy"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `PrefetchPreload object { id, value, editable, modified_on }`

    Cloudflare will prefetch any URLs that are included in the response headers. This is limited to Enterprise Zones.

    - `id: "prefetch_preload"`

      ID of the zone setting.

      - `"prefetch_preload"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesPrivacyPass object { id, value, editable, modified_on }`

    Privacy Pass v1 was a browser extension developed by the Privacy Pass Team to improve the browsing experience for your visitors by allowing users to reduce the number of CAPTCHAs shown. (https://support.cloudflare.com/hc/en-us/articles/115001992652-Privacy-Pass).

    - `id: "privacy_pass"`

      ID of the zone setting.

      - `"privacy_pass"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ProxyReadTimeout object { id, value, editable, modified_on }`

    Maximum time between two read operations from origin.

    - `id: "proxy_read_timeout"`

      ID of the zone setting.

      - `"proxy_read_timeout"`

    - `value: number`

      Current value of the zone setting.

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `PseudoIPV4 object { id, value, editable, modified_on }`

    The value set for the Pseudo IPv4 setting.

    - `id: "pseudo_ipv4"`

      Value of the Pseudo IPv4 setting.

      - `"pseudo_ipv4"`

    - `value: "off" or "add_header" or "overwrite_header"`

      Current value of the zone setting.

      - `"off"`

      - `"add_header"`

      - `"overwrite_header"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesRedirectsForAITraining object { id, value, editable, modified_on }`

    When enabled, Cloudflare will redirect verified AI training crawlers to canonical URLs
    found in the HTML response, ensuring AI models train on authoritative content.

    - `id: "redirects_for_ai_training"`

      ID of the zone setting.

      - `"redirects_for_ai_training"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesReplaceInsecureJS object { id, value, editable, modified_on }`

    Automatically replace insecure JavaScript libraries with safer and faster alternatives provided under cdnjs and powered by Cloudflare. Currently supports the following libraries: Polyfill under polyfill.io.

    - `id: "replace_insecure_js"`

      ID of the zone setting.

      - `"replace_insecure_js"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasResponseBuffering object { id, value, editable, modified_on }`

    Enables or disables buffering of responses from the proxied server. Cloudflare may buffer the whole payload to deliver it at once to the client versus allowing it to be delivered in chunks. By default, the proxied server streams directly and is not buffered by Cloudflare. This is limited to Enterprise Zones.

    - `id: "response_buffering"`

      ID of the zone setting.

      - `"response_buffering"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasRocketLoader object { id, value, editable, modified_on }`

    Rocket Loader is a general-purpose asynchronous JavaScript optimisation that prioritises rendering your content while loading your site's Javascript asynchronously. Turning on Rocket Loader will immediately improve a web page's rendering time sometimes measured as Time to First Paint (TTFP), and also the `window.onload` time (assuming there is JavaScript on the page). This can have a positive impact on your Google search ranking. When turned on, Rocket Loader will automatically defer the loading of all Javascript referenced in your HTML, with no configuration required. Refer to [Understanding Rocket Loader](https://support.cloudflare.com/hc/articles/200168056) for more information.

    - `id: "rocket_loader"`

      ID of the zone setting.

      - `"rocket_loader"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasAutomaticPlatformOptimization object { id, value, editable, modified_on }`

    [Automatic Platform Optimization for WordPress](https://developers.cloudflare.com/automatic-platform-optimization/) serves your WordPress site from Cloudflare's edge network and caches third-party fonts.

    - `id: "automatic_platform_optimization"`

      ID of the zone setting.

      - `"automatic_platform_optimization"`

    - `value: AutomaticPlatformOptimization`

      Current value of the zone setting.

      - `cache_by_device_type: boolean`

        Indicates whether or not [cache by device type](https://developers.cloudflare.com/automatic-platform-optimization/reference/cache-device-type/) is enabled.

      - `cf: boolean`

        Indicates whether or not Cloudflare proxy is enabled.

      - `enabled: boolean`

        Indicates whether or not Automatic Platform Optimization is enabled.

      - `hostnames: array of string`

        An array of hostnames where Automatic Platform Optimization for WordPress is activated.

      - `wordpress: boolean`

        Indicates whether or not site is powered by WordPress.

      - `wp_plugin: boolean`

        Indicates whether or not [Cloudflare for WordPress plugin](https://wordpress.org/plugins/cloudflare/) is installed.

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSearchForAgents object { id, value, editable, modified_on }`

    When enabled, Cloudflare provisions an AI Search instance for the zone
    and exposes a /.well-known/ai-search endpoint that AI agents can query.
    Markdown responses also receive an agent: YAML capability block advertising
    the search endpoint.

    - `id: "search_for_agents"`

      ID of the zone setting.

      - `"search_for_agents"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `SecurityHeaders object { id, value, editable, modified_on }`

    Cloudflare security header for a zone.

    - `id: "security_header"`

      ID of the zone's security header.

      - `"security_header"`

    - `value: object { strict_transport_security }`

      Current value of the zone setting.

      - `strict_transport_security: optional object { enabled, include_subdomains, max_age, 2 more }`

        Strict Transport Security.

        - `enabled: optional boolean`

          Whether or not strict transport security is enabled.

        - `include_subdomains: optional boolean`

          Include all subdomains for strict transport security.

        - `max_age: optional number`

          Max age in seconds of the strict transport security.

        - `nosniff: optional boolean`

          Whether or not to include 'X-Content-Type-Options: nosniff' header.

        - `preload: optional boolean`

          Enable automatic preload of the HSTS configuration.

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasSecurityLevel object { id, value, editable, modified_on }`

    Choose the appropriate security profile for your website, which will automatically adjust each of the security settings. If you choose to customize an individual security setting, the profile will become Custom. (https://support.cloudflare.com/hc/en-us/articles/200170056).

    - `id: "security_level"`

      ID of the zone setting.

      - `"security_level"`

    - `value: "off" or "essentially_off" or "low" or 3 more`

      Current value of the zone setting.

      - `"off"`

      - `"essentially_off"`

      - `"low"`

      - `"medium"`

      - `"high"`

      - `"under_attack"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ServerSideExcludes object { id, value, editable, modified_on }`

    If there is sensitive content on your website that you want visible to real visitors, but that you want to hide from suspicious visitors, all you have to do is wrap the content with Cloudflare SSE tags. Wrap any content that you want to be excluded from suspicious visitors in the following SSE tags: <!--sse--><!--/sse-->. For example: <!--sse-->  Bad visitors won't see my phone number, 555-555-5555 <!--/sse-->. Note: SSE only will work with HTML. If you have HTML minification enabled, you won't see the SSE tags in your HTML source when it's served through Cloudflare. SSE will still function in this case, as Cloudflare's HTML minification and SSE functionality occur on-the-fly as the resource moves through our network to the visitor's computer. (https://support.cloudflare.com/hc/en-us/articles/200170036).

    - `id: "server_side_exclude"`

      ID of the zone setting.

      - `"server_side_exclude"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSha1Support object { id, value, editable, modified_on }`

    Allow SHA1 support.

    - `id: "sha1_support"`

      Zone setting identifier.

      - `"sha1_support"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasSortQueryStringForCache object { id, value, editable, modified_on }`

    Cloudflare will treat files with the same query strings as the same file in cache, regardless of the order of the query strings. This is limited to Enterprise Zones.

    - `id: "sort_query_string_for_cache"`

      ID of the zone setting.

      - `"sort_query_string_for_cache"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasSSL object { id, value, editable, modified_on }`

    SSL encrypts your visitor's connection and safeguards credit card numbers and other personal data to and from your website. SSL can take up to 5 minutes to fully activate. Requires Cloudflare active on your root domain or www domain. Off: no SSL between the visitor and Cloudflare, and no SSL between Cloudflare and your web server  (all HTTP traffic). Flexible: SSL between the visitor and Cloudflare -- visitor sees HTTPS on your site, but no SSL between Cloudflare and your web server. You don't need to have an SSL cert on your web server, but your vistors will still see the site as being HTTPS enabled. Full:  SSL between the visitor and Cloudflare -- visitor sees HTTPS on your site, and SSL between Cloudflare and your web server. You'll need to have your own SSL cert or self-signed cert at the very least. Full (Strict): SSL between the visitor and Cloudflare -- visitor sees HTTPS on your site, and SSL between Cloudflare and your web server. You'll need to have a valid SSL certificate installed on your web server. This certificate must be signed by a certificate authority, have an expiration date in the future, and respond for the request domain name (hostname). (https://support.cloudflare.com/hc/en-us/articles/200170416).

    - `id: "ssl"`

      ID of the zone setting.

      - `"ssl"`

    - `value: "off" or "flexible" or "full" or "strict"`

      Current value of the zone setting.

      - `"off"`

      - `"flexible"`

      - `"full"`

      - `"strict"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `SSLRecommender object { id, enabled }`

    Enrollment in the SSL/TLS Recommender service which tries to detect and recommend (by sending periodic emails) the most secure SSL/TLS setting your origin servers support.

    - `id: optional "ssl_recommender"`

      Enrollment value for SSL/TLS Recommender.

      - `"ssl_recommender"`

    - `enabled: optional boolean`

      ssl-recommender enrollment setting.

  - `ZonesTLS1_2Only object { id, value, editable, modified_on }`

    Only allows TLS1.2.

    - `id: "tls_1_2_only"`

      Zone setting identifier.

      - `"tls_1_2_only"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `TLS1_3 object { id, value, editable, modified_on }`

    Enables Crypto TLS 1.3 feature for a zone.

    - `id: "tls_1_3"`

      ID of the zone setting.

      - `"tls_1_3"`

    - `value: "on" or "off" or "zrt"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

      - `"zrt"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `TLSClientAuth object { id, value, editable, modified_on }`

    TLS Client Auth requires Cloudflare to connect to your origin server using a client certificate (Enterprise Only).

    - `id: "tls_client_auth"`

      ID of the zone setting.

      - `"tls_client_auth"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesTransformations object { id, value, editable, modified_on }`

    Media Transformations provides on-demand resizing, conversion and optimization for images and video served through Cloudflare's network. Refer to the [Image Transformations](https://developers.cloudflare.com/images/) and [Video Transformations](https://developers.cloudflare.com/stream/transform-videos/#getting-started) documentation for more information.

    - `id: "transformations"`

      ID of the zone setting. Shared between Image Transformations and Video Transformations.

      - `"transformations"`

    - `value: "on" or "off" or "open"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

      - `"open"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesTransformationsAllowedOrigins object { id, value, editable, modified_on }`

    Media Transformations Allowed Origins restricts transformations for images and video served through Cloudflare's network. Refer to the [Image Transformations](https://developers.cloudflare.com/images/) and [Video Transformations](https://developers.cloudflare.com/stream/transform-videos/#getting-started) documentation for more information.

    - `id: "transformations_allowed_origins"`

      ID of the zone setting. Shared between Image Transformations and Video Transformations.

      - `"transformations_allowed_origins"`

    - `value: string`

      Current value of the zone setting.

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasTrueClientIPHeader object { id, value, editable, modified_on }`

    Allows customer to continue to use True Client IP (Akamai feature) in the headers we send to the origin. This is limited to Enterprise Zones.

    - `id: "true_client_ip_header"`

      ID of the zone setting.

      - `"true_client_ip_header"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasWAF object { id, value, editable, modified_on }`

    The WAF examines HTTP requests to your website.  It inspects both GET and POST requests and applies rules to help filter out illegitimate traffic from legitimate website visitors. The Cloudflare WAF inspects website addresses or URLs to detect anything out of the ordinary. If the Cloudflare WAF determines suspicious user behavior, then the WAF will 'challenge' the web visitor with a page that asks them to submit a CAPTCHA successfully  to continue their action. If the challenge is failed, the action will be stopped. What this means is that Cloudflare's WAF will block any traffic identified as illegitimate before it reaches your origin web server. (https://support.cloudflare.com/hc/en-us/articles/200172016).

    - `id: "waf"`

      ID of the zone setting.

      - `"waf"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `WebP object { id, value, editable, modified_on }`

    When the client requesting the image supports the WebP image codec, and WebP offers a performance advantage over the original image format, Cloudflare will serve a WebP version of the original image.

    - `id: "webp"`

      ID of the zone setting.

      - `"webp"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `Websocket object { id, value, editable, modified_on }`

    WebSockets are open connections sustained between the client and the origin server. Inside a WebSockets connection, the client and the origin can pass data back and forth without having to reestablish sessions. This makes exchanging data within a WebSockets connection fast. WebSockets are often used for real-time applications such as live chat and gaming. For more information refer to [Can I use Cloudflare with Websockets](https://support.cloudflare.com/hc/en-us/articles/200169466-Can-I-use-Cloudflare-with-WebSockets-).

    - `id: "websockets"`

      ID of the zone setting.

      - `"websockets"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/settings \
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
      "id": "0rtt",
      "value": "on",
      "editable": true,
      "modified_on": "2014-01-01T05:20:00.12345Z"
    }
  ]
}
```

## Get zone setting

**get** `/zones/{zone_id}/settings/{setting_id}`

Fetch a single zone setting by name

### Path Parameters

- `zone_id: string`

  Identifier

- `setting_id: string`

  Setting name

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

- `success: boolean`

  Whether the API call was successful

- `result: optional ZeroRTT or AdvancedDDoS or object { id, modified_on, value }  or 60 more`

  0-RTT session resumption enabled for this zone.

  - `ZeroRTT object { id, value, editable, modified_on }`

    0-RTT session resumption enabled for this zone.

    - `id: "0rtt"`

      ID of the zone setting.

      - `"0rtt"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `AdvancedDDoS object { id, value, editable, modified_on }`

    Advanced protection from Distributed Denial of Service (DDoS) attacks on your website. This is an uneditable value that is 'on' in the case of Business and Enterprise zones.

    - `id: "advanced_ddos"`

      ID of the zone setting.

      - `"advanced_ddos"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesCacheRulesAegis object { id, modified_on, value }`

    Aegis provides dedicated egress IPs (from Cloudflare to your origin) for your layer 7 WAF and CDN services. The egress IPs are reserved exclusively for your account so that you can increase your origin security by only allowing traffic from a small list of IP addresses.

    - `id: "aegis"`

      ID of the zone setting.

      - `"aegis"`

    - `modified_on: optional string`

      Last time this setting was modified.

    - `value: optional object { enabled, pool_id }`

      Value of the zone setting.

      - `enabled: optional boolean`

        Whether the feature is enabled or not.

      - `pool_id: optional string`

        Egress pool id which refers to a grouping of dedicated egress IPs through which Cloudflare will connect to origin.

  - `AlwaysOnline object { id, value, editable, modified_on }`

    When enabled, Cloudflare serves limited copies of web pages available from the [Internet Archive's Wayback Machine](https://archive.org/web/) if your server is offline. Refer to [Always Online](https://developers.cloudflare.com/cache/about/always-online) for more information.

    - `id: "always_online"`

      ID of the zone setting.

      - `"always_online"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasAlwaysUseHTTPS object { id, value, editable, modified_on }`

    Reply to all requests for URLs that use "http" with a 301 redirect to the equivalent "https" URL. If you only want to redirect for a subset of requests, consider creating an "Always use HTTPS" page rule.

    - `id: "always_use_https"`

      ID of the zone setting.

      - `"always_use_https"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasAutomaticHTTPSRewrites object { id, value, editable, modified_on }`

    Enable the Automatic HTTPS Rewrites feature for this zone.

    - `id: "automatic_https_rewrites"`

      ID of the zone setting.

      - `"automatic_https_rewrites"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `Brotli object { id, value, editable, modified_on }`

    When the client requesting an asset supports the Brotli compression algorithm, Cloudflare will serve a Brotli compressed version of the asset.

    - `id: "brotli"`

      ID of the zone setting.

      - `"brotli"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasBrowserCacheTTL object { id, value, editable, modified_on }`

    Browser Cache TTL (in seconds) specifies how long Cloudflare-cached resources will remain on your visitors' computers. Cloudflare will honor any larger times specified by your server. (https://support.cloudflare.com/hc/en-us/articles/200168276).

    - `id: "browser_cache_ttl"`

      ID of the zone setting.

      - `"browser_cache_ttl"`

    - `value: number`

      Current value of the zone setting.

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasBrowserCheck object { id, value, editable, modified_on }`

    Browser Integrity Check is similar to Bad Behavior and looks for common HTTP headers abused most commonly by spammers and denies access to your page.  It will also challenge visitors that do not have a user agent or a non standard user agent (also commonly used by abuse bots, crawlers or visitors). (https://support.cloudflare.com/hc/en-us/articles/200170086).

    - `id: "browser_check"`

      ID of the zone setting.

      - `"browser_check"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasCacheLevel object { id, value, editable, modified_on }`

    Cache Level functions based off the setting level. The basic setting will cache most static resources (i.e., css, images, and JavaScript). The simplified setting will ignore the query string when delivering a cached resource. The aggressive setting will cache all static resources, including ones with a query string. (https://support.cloudflare.com/hc/en-us/articles/200168256).

    - `id: "cache_level"`

      ID of the zone setting.

      - `"cache_level"`

    - `value: "aggressive" or "basic" or "simplified"`

      Current value of the zone setting.

      - `"aggressive"`

      - `"basic"`

      - `"simplified"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ChallengeTTL object { id, value, editable, modified_on }`

    Specify how long a visitor is allowed access to your site after successfully completing a challenge (such as a CAPTCHA). After the TTL has expired the visitor will have to complete a new challenge. We recommend a 15 - 45 minute setting and will attempt to honor any setting above 45 minutes. (https://support.cloudflare.com/hc/en-us/articles/200170136).

    - `id: "challenge_ttl"`

      ID of the zone setting.

      - `"challenge_ttl"`

    - `value: 300 or 900 or 1800 or 11 more`

      Current value of the zone setting.

      - `300`

      - `900`

      - `1800`

      - `2700`

      - `3600`

      - `7200`

      - `10800`

      - `14400`

      - `28800`

      - `57600`

      - `86400`

      - `604800`

      - `2592000`

      - `31536000`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesChinaNetworkEnabled object { id, value, editable, modified_on }`

    Determines whether or not the china network is enabled.

    - `id: "china_network_enabled"`

      ID of the zone setting.

      - `"china_network_enabled"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesContentConverter object { id, value, editable, modified_on }`

    When enabled and the client sends an Accept header requesting text/markdown,
    Cloudflare will convert HTML responses to Markdown format using the toMarkdown() service.
    Refer to the [developer documentation](https://developers.cloudflare.com/workers-ai/features/markdown-conversion/) for more information.

    - `id: "content_converter"`

      ID of the zone setting.

      - `"content_converter"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `Ciphers object { id, value, editable, modified_on }`

    An allowlist of ciphers for TLS termination. These ciphers must be in the BoringSSL format.

    - `id: "ciphers"`

      ID of the zone setting.

      - `"ciphers"`

    - `value: array of string`

      Current value of the zone setting.

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesCNAMEFlattening object { id, value, editable, modified_on }`

    Whether or not cname flattening is on.

    - `id: "cname_flattening"`

      How to flatten the cname destination.

      - `"cname_flattening"`

    - `value: "flatten_at_root" or "flatten_all"`

      Current value of the zone setting.

      - `"flatten_at_root"`

      - `"flatten_all"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `DevelopmentMode object { id, value, editable, 2 more }`

    Development Mode temporarily allows you to enter development mode for your websites if you need to make changes to your site. This will bypass Cloudflare's accelerated cache and slow down your site, but is useful if you are making changes to cacheable content (like images, css, or JavaScript) and would like to see those changes right away. Once entered, development mode will last for 3 hours and then automatically toggle off.

    - `id: "development_mode"`

      ID of the zone setting.

      - `"development_mode"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

    - `time_remaining: optional number`

      Value of the zone setting.
      Notes: The interval (in seconds) from when development mode expires (positive integer) or last expired (negative integer) for the domain. If development mode has never been enabled, this value is false.

  - `EarlyHints object { id, value, editable, modified_on }`

    When enabled, Cloudflare will attempt to speed up overall page loads by serving `103` responses with `Link` headers from the final response. Refer to [Early Hints](https://developers.cloudflare.com/cache/about/early-hints) for more information.

    - `id: "early_hints"`

      ID of the zone setting.

      - `"early_hints"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasEdgeCacheTTL object { id, value, editable, modified_on }`

    Time (in seconds) that a resource will be ensured to remain on Cloudflare's cache servers.

    - `id: "edge_cache_ttl"`

      ID of the zone setting.

      - `"edge_cache_ttl"`

    - `value: 30 or 60 or 300 or 18 more`

      Current value of the zone setting.

      - `30`

      - `60`

      - `300`

      - `1200`

      - `1800`

      - `3600`

      - `7200`

      - `10800`

      - `14400`

      - `18000`

      - `28800`

      - `43200`

      - `57600`

      - `72000`

      - `86400`

      - `172800`

      - `259200`

      - `345600`

      - `432000`

      - `518400`

      - `604800`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasEmailObfuscation object { id, value, editable, modified_on }`

    Encrypt email adresses on your web page from bots, while keeping them visible to humans. (https://support.cloudflare.com/hc/en-us/articles/200170016).

    - `id: "email_obfuscation"`

      ID of the zone setting.

      - `"email_obfuscation"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `H2Prioritization object { id, value, editable, modified_on }`

    HTTP/2 Edge Prioritization optimises the delivery of resources served through HTTP/2 to improve page load performance. It also supports fine control of content delivery when used in conjunction with Workers.

    - `id: "h2_prioritization"`

      ID of the zone setting.

      - `"h2_prioritization"`

    - `value: "on" or "off" or "custom"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

      - `"custom"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `HotlinkProtection object { id, value, editable, modified_on }`

    When enabled, the Hotlink Protection option ensures that other sites cannot suck up your bandwidth by building pages that use images hosted on your site. Anytime a request for an image on your site hits Cloudflare, we check to ensure that it's not another site requesting them. People will still be able to download and view images from your page, but other sites won't be able to steal them for use on their own pages. (https://support.cloudflare.com/hc/en-us/articles/200170026).

    - `id: "hotlink_protection"`

      ID of the zone setting.

      - `"hotlink_protection"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `HTTP2 object { id, value, editable, modified_on }`

    HTTP2 enabled for this zone.

    - `id: "http2"`

      ID of the zone setting.

      - `"http2"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `HTTP3 object { id, value, editable, modified_on }`

    HTTP3 enabled for this zone.

    - `id: "http3"`

      ID of the zone setting.

      - `"http3"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ImageResizing object { id, value, editable, modified_on }`

    Image Transformations provides on-demand resizing, conversion and optimization for images served through Cloudflare's network. Refer to the [Image Transformations documentation](https://developers.cloudflare.com/images/) for more information.

    - `id: "image_resizing"`

      ID of the zone setting.

      - `"image_resizing"`

    - `value: "on" or "off" or "open"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

      - `"open"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasIPGeolocation object { id, value, editable, modified_on }`

    Enable IP Geolocation to have Cloudflare geolocate visitors to your website and pass the country code to you. (https://support.cloudflare.com/hc/en-us/articles/200168236).

    - `id: "ip_geolocation"`

      ID of the zone setting.

      - `"ip_geolocation"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `IPV6 object { id, value, editable, modified_on }`

    Enable IPv6 on all subdomains that are Cloudflare enabled.  (https://support.cloudflare.com/hc/en-us/articles/200168586).

    - `id: "ipv6"`

      ID of the zone setting.

      - `"ipv6"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesMaxUpload object { id, value, editable, modified_on }`

    Maximum size of an allowable upload.

    - `id: "max_upload"`

      identifier of the zone setting.

      - `"max_upload"`

    - `value: 100 or 125 or 150 or 15 more`

      Current value of the zone setting.

      - `100`

      - `125`

      - `150`

      - `175`

      - `200`

      - `225`

      - `250`

      - `275`

      - `300`

      - `325`

      - `350`

      - `375`

      - `400`

      - `425`

      - `450`

      - `475`

      - `500`

      - `1000`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `MinTLSVersion object { id, value, editable, modified_on }`

    Only accepts HTTPS requests that use at least the TLS protocol version specified. For example, if TLS 1.1 is selected, TLS 1.0 connections will be rejected, while 1.1, 1.2, and 1.3 (if enabled) will be permitted.

    - `id: "min_tls_version"`

      ID of the zone setting.

      - `"min_tls_version"`

    - `value: "1.0" or "1.1" or "1.2" or "1.3"`

      Current value of the zone setting.

      - `"1.0"`

      - `"1.1"`

      - `"1.2"`

      - `"1.3"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasMirage object { id, value, editable, modified_on }`

    Automatically optimize image loading for website visitors on mobile
    devices. Refer to [our blog post](http://blog.cloudflare.com/mirage2-solving-mobile-speed)
    for more information.

    - `id: "mirage"`

      ID of the zone setting.

      - `"mirage"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `NEL object { id, value, editable, modified_on }`

    Enable Network Error Logging reporting on your zone. (Beta)

    - `id: "nel"`

      Zone setting identifier.

      - `"nel"`

    - `value: object { enabled }`

      Current value of the zone setting.

      - `enabled: optional boolean`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasOpportunisticEncryption object { id, value, editable, modified_on }`

    Enables the Opportunistic Encryption feature for a zone.

    - `id: "opportunistic_encryption"`

      ID of the zone setting.

      - `"opportunistic_encryption"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `OpportunisticOnion object { id, value, editable, modified_on }`

    Add an Alt-Svc header to all legitimate requests from Tor, allowing the connection to use our onion services instead of exit nodes.

    - `id: "opportunistic_onion"`

      ID of the zone setting.

      - `"opportunistic_onion"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `OrangeToOrange object { id, value, editable, modified_on }`

    Orange to Orange (O2O) allows zones on Cloudflare to CNAME to other zones also on Cloudflare.

    - `id: "orange_to_orange"`

      ID of the zone setting.

      - `"orange_to_orange"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasOriginErrorPagePassThru object { id, value, editable, modified_on }`

    Cloudflare will proxy customer error pages on any 502,504 errors on origin server instead of showing a default Cloudflare error page. This does not apply to 522 errors and is limited to Enterprise Zones.

    - `id: "origin_error_page_pass_thru"`

      ID of the zone setting.

      - `"origin_error_page_pass_thru"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesCacheRulesOriginH2MaxStreams object { id, modified_on, value }`

    Origin H2 Max Streams configures the max number of concurrent requests that Cloudflare will send within the same connection when communicating with the origin server, if the origin supports it. Note that if your origin does not support H2 multiplexing, 5xx errors may be observed, particularly 520s. Also note that the default value is `100` for all plan types except Enterprise where it is `1`. `1` means that H2 multiplexing is disabled.

    - `id: "origin_h2_max_streams"`

      Value of the zone setting.

      - `"origin_h2_max_streams"`

    - `modified_on: optional string`

      Last time this setting was modified.

    - `value: optional number`

      Value of the Origin H2 Max Streams Setting.

  - `ZonesCacheRulesOriginMaxHTTPVersion object { id, modified_on, value }`

    Origin Max HTTP Setting Version sets the highest HTTP version Cloudflare will attempt to use with your origin. This setting allows Cloudflare to make HTTP/2 requests to your origin. (Refer to [Enable HTTP/2 to Origin](https://developers.cloudflare.com/cache/how-to/enable-http2-to-origin/), for more information.). The default value is "2" for all plan types except Enterprise where it is "1".

    - `id: "origin_max_http_version"`

      Value of the zone setting.

      - `"origin_max_http_version"`

    - `modified_on: optional string`

      Last time this setting was modified.

    - `value: optional "2" or "1"`

      Value of the Origin Max HTTP Version Setting.

      - `"2"`

      - `"1"`

  - `ZonesSchemasPolish object { id, value, editable, modified_on }`

    Removes metadata and compresses your images for faster page load times. Basic (Lossless): Reduce the size of PNG, JPEG, and GIF files - no impact on visual quality. Basic + JPEG (Lossy): Further reduce the size of JPEG files for faster image loading. Larger JPEGs are converted to progressive images, loading a lower-resolution image first and ending in a higher-resolution version. Not recommended for hi-res photography sites.

    - `id: "polish"`

      ID of the zone setting.

      - `"polish"`

    - `value: "off" or "lossless" or "lossy"`

      Current value of the zone setting.

      - `"off"`

      - `"lossless"`

      - `"lossy"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `PrefetchPreload object { id, value, editable, modified_on }`

    Cloudflare will prefetch any URLs that are included in the response headers. This is limited to Enterprise Zones.

    - `id: "prefetch_preload"`

      ID of the zone setting.

      - `"prefetch_preload"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesPrivacyPass object { id, value, editable, modified_on }`

    Privacy Pass v1 was a browser extension developed by the Privacy Pass Team to improve the browsing experience for your visitors by allowing users to reduce the number of CAPTCHAs shown. (https://support.cloudflare.com/hc/en-us/articles/115001992652-Privacy-Pass).

    - `id: "privacy_pass"`

      ID of the zone setting.

      - `"privacy_pass"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ProxyReadTimeout object { id, value, editable, modified_on }`

    Maximum time between two read operations from origin.

    - `id: "proxy_read_timeout"`

      ID of the zone setting.

      - `"proxy_read_timeout"`

    - `value: number`

      Current value of the zone setting.

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `PseudoIPV4 object { id, value, editable, modified_on }`

    The value set for the Pseudo IPv4 setting.

    - `id: "pseudo_ipv4"`

      Value of the Pseudo IPv4 setting.

      - `"pseudo_ipv4"`

    - `value: "off" or "add_header" or "overwrite_header"`

      Current value of the zone setting.

      - `"off"`

      - `"add_header"`

      - `"overwrite_header"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesRedirectsForAITraining object { id, value, editable, modified_on }`

    When enabled, Cloudflare will redirect verified AI training crawlers to canonical URLs
    found in the HTML response, ensuring AI models train on authoritative content.

    - `id: "redirects_for_ai_training"`

      ID of the zone setting.

      - `"redirects_for_ai_training"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesReplaceInsecureJS object { id, value, editable, modified_on }`

    Automatically replace insecure JavaScript libraries with safer and faster alternatives provided under cdnjs and powered by Cloudflare. Currently supports the following libraries: Polyfill under polyfill.io.

    - `id: "replace_insecure_js"`

      ID of the zone setting.

      - `"replace_insecure_js"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasResponseBuffering object { id, value, editable, modified_on }`

    Enables or disables buffering of responses from the proxied server. Cloudflare may buffer the whole payload to deliver it at once to the client versus allowing it to be delivered in chunks. By default, the proxied server streams directly and is not buffered by Cloudflare. This is limited to Enterprise Zones.

    - `id: "response_buffering"`

      ID of the zone setting.

      - `"response_buffering"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasRocketLoader object { id, value, editable, modified_on }`

    Rocket Loader is a general-purpose asynchronous JavaScript optimisation that prioritises rendering your content while loading your site's Javascript asynchronously. Turning on Rocket Loader will immediately improve a web page's rendering time sometimes measured as Time to First Paint (TTFP), and also the `window.onload` time (assuming there is JavaScript on the page). This can have a positive impact on your Google search ranking. When turned on, Rocket Loader will automatically defer the loading of all Javascript referenced in your HTML, with no configuration required. Refer to [Understanding Rocket Loader](https://support.cloudflare.com/hc/articles/200168056) for more information.

    - `id: "rocket_loader"`

      ID of the zone setting.

      - `"rocket_loader"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasAutomaticPlatformOptimization object { id, value, editable, modified_on }`

    [Automatic Platform Optimization for WordPress](https://developers.cloudflare.com/automatic-platform-optimization/) serves your WordPress site from Cloudflare's edge network and caches third-party fonts.

    - `id: "automatic_platform_optimization"`

      ID of the zone setting.

      - `"automatic_platform_optimization"`

    - `value: AutomaticPlatformOptimization`

      Current value of the zone setting.

      - `cache_by_device_type: boolean`

        Indicates whether or not [cache by device type](https://developers.cloudflare.com/automatic-platform-optimization/reference/cache-device-type/) is enabled.

      - `cf: boolean`

        Indicates whether or not Cloudflare proxy is enabled.

      - `enabled: boolean`

        Indicates whether or not Automatic Platform Optimization is enabled.

      - `hostnames: array of string`

        An array of hostnames where Automatic Platform Optimization for WordPress is activated.

      - `wordpress: boolean`

        Indicates whether or not site is powered by WordPress.

      - `wp_plugin: boolean`

        Indicates whether or not [Cloudflare for WordPress plugin](https://wordpress.org/plugins/cloudflare/) is installed.

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSearchForAgents object { id, value, editable, modified_on }`

    When enabled, Cloudflare provisions an AI Search instance for the zone
    and exposes a /.well-known/ai-search endpoint that AI agents can query.
    Markdown responses also receive an agent: YAML capability block advertising
    the search endpoint.

    - `id: "search_for_agents"`

      ID of the zone setting.

      - `"search_for_agents"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `SecurityHeaders object { id, value, editable, modified_on }`

    Cloudflare security header for a zone.

    - `id: "security_header"`

      ID of the zone's security header.

      - `"security_header"`

    - `value: object { strict_transport_security }`

      Current value of the zone setting.

      - `strict_transport_security: optional object { enabled, include_subdomains, max_age, 2 more }`

        Strict Transport Security.

        - `enabled: optional boolean`

          Whether or not strict transport security is enabled.

        - `include_subdomains: optional boolean`

          Include all subdomains for strict transport security.

        - `max_age: optional number`

          Max age in seconds of the strict transport security.

        - `nosniff: optional boolean`

          Whether or not to include 'X-Content-Type-Options: nosniff' header.

        - `preload: optional boolean`

          Enable automatic preload of the HSTS configuration.

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasSecurityLevel object { id, value, editable, modified_on }`

    Choose the appropriate security profile for your website, which will automatically adjust each of the security settings. If you choose to customize an individual security setting, the profile will become Custom. (https://support.cloudflare.com/hc/en-us/articles/200170056).

    - `id: "security_level"`

      ID of the zone setting.

      - `"security_level"`

    - `value: "off" or "essentially_off" or "low" or 3 more`

      Current value of the zone setting.

      - `"off"`

      - `"essentially_off"`

      - `"low"`

      - `"medium"`

      - `"high"`

      - `"under_attack"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ServerSideExcludes object { id, value, editable, modified_on }`

    If there is sensitive content on your website that you want visible to real visitors, but that you want to hide from suspicious visitors, all you have to do is wrap the content with Cloudflare SSE tags. Wrap any content that you want to be excluded from suspicious visitors in the following SSE tags: <!--sse--><!--/sse-->. For example: <!--sse-->  Bad visitors won't see my phone number, 555-555-5555 <!--/sse-->. Note: SSE only will work with HTML. If you have HTML minification enabled, you won't see the SSE tags in your HTML source when it's served through Cloudflare. SSE will still function in this case, as Cloudflare's HTML minification and SSE functionality occur on-the-fly as the resource moves through our network to the visitor's computer. (https://support.cloudflare.com/hc/en-us/articles/200170036).

    - `id: "server_side_exclude"`

      ID of the zone setting.

      - `"server_side_exclude"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSha1Support object { id, value, editable, modified_on }`

    Allow SHA1 support.

    - `id: "sha1_support"`

      Zone setting identifier.

      - `"sha1_support"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasSortQueryStringForCache object { id, value, editable, modified_on }`

    Cloudflare will treat files with the same query strings as the same file in cache, regardless of the order of the query strings. This is limited to Enterprise Zones.

    - `id: "sort_query_string_for_cache"`

      ID of the zone setting.

      - `"sort_query_string_for_cache"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasSSL object { id, value, editable, modified_on }`

    SSL encrypts your visitor's connection and safeguards credit card numbers and other personal data to and from your website. SSL can take up to 5 minutes to fully activate. Requires Cloudflare active on your root domain or www domain. Off: no SSL between the visitor and Cloudflare, and no SSL between Cloudflare and your web server  (all HTTP traffic). Flexible: SSL between the visitor and Cloudflare -- visitor sees HTTPS on your site, but no SSL between Cloudflare and your web server. You don't need to have an SSL cert on your web server, but your vistors will still see the site as being HTTPS enabled. Full:  SSL between the visitor and Cloudflare -- visitor sees HTTPS on your site, and SSL between Cloudflare and your web server. You'll need to have your own SSL cert or self-signed cert at the very least. Full (Strict): SSL between the visitor and Cloudflare -- visitor sees HTTPS on your site, and SSL between Cloudflare and your web server. You'll need to have a valid SSL certificate installed on your web server. This certificate must be signed by a certificate authority, have an expiration date in the future, and respond for the request domain name (hostname). (https://support.cloudflare.com/hc/en-us/articles/200170416).

    - `id: "ssl"`

      ID of the zone setting.

      - `"ssl"`

    - `value: "off" or "flexible" or "full" or "strict"`

      Current value of the zone setting.

      - `"off"`

      - `"flexible"`

      - `"full"`

      - `"strict"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `SSLRecommender object { id, enabled }`

    Enrollment in the SSL/TLS Recommender service which tries to detect and recommend (by sending periodic emails) the most secure SSL/TLS setting your origin servers support.

    - `id: optional "ssl_recommender"`

      Enrollment value for SSL/TLS Recommender.

      - `"ssl_recommender"`

    - `enabled: optional boolean`

      ssl-recommender enrollment setting.

  - `ZonesTLS1_2Only object { id, value, editable, modified_on }`

    Only allows TLS1.2.

    - `id: "tls_1_2_only"`

      Zone setting identifier.

      - `"tls_1_2_only"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `TLS1_3 object { id, value, editable, modified_on }`

    Enables Crypto TLS 1.3 feature for a zone.

    - `id: "tls_1_3"`

      ID of the zone setting.

      - `"tls_1_3"`

    - `value: "on" or "off" or "zrt"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

      - `"zrt"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `TLSClientAuth object { id, value, editable, modified_on }`

    TLS Client Auth requires Cloudflare to connect to your origin server using a client certificate (Enterprise Only).

    - `id: "tls_client_auth"`

      ID of the zone setting.

      - `"tls_client_auth"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesTransformations object { id, value, editable, modified_on }`

    Media Transformations provides on-demand resizing, conversion and optimization for images and video served through Cloudflare's network. Refer to the [Image Transformations](https://developers.cloudflare.com/images/) and [Video Transformations](https://developers.cloudflare.com/stream/transform-videos/#getting-started) documentation for more information.

    - `id: "transformations"`

      ID of the zone setting. Shared between Image Transformations and Video Transformations.

      - `"transformations"`

    - `value: "on" or "off" or "open"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

      - `"open"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesTransformationsAllowedOrigins object { id, value, editable, modified_on }`

    Media Transformations Allowed Origins restricts transformations for images and video served through Cloudflare's network. Refer to the [Image Transformations](https://developers.cloudflare.com/images/) and [Video Transformations](https://developers.cloudflare.com/stream/transform-videos/#getting-started) documentation for more information.

    - `id: "transformations_allowed_origins"`

      ID of the zone setting. Shared between Image Transformations and Video Transformations.

      - `"transformations_allowed_origins"`

    - `value: string`

      Current value of the zone setting.

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasTrueClientIPHeader object { id, value, editable, modified_on }`

    Allows customer to continue to use True Client IP (Akamai feature) in the headers we send to the origin. This is limited to Enterprise Zones.

    - `id: "true_client_ip_header"`

      ID of the zone setting.

      - `"true_client_ip_header"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasWAF object { id, value, editable, modified_on }`

    The WAF examines HTTP requests to your website.  It inspects both GET and POST requests and applies rules to help filter out illegitimate traffic from legitimate website visitors. The Cloudflare WAF inspects website addresses or URLs to detect anything out of the ordinary. If the Cloudflare WAF determines suspicious user behavior, then the WAF will 'challenge' the web visitor with a page that asks them to submit a CAPTCHA successfully  to continue their action. If the challenge is failed, the action will be stopped. What this means is that Cloudflare's WAF will block any traffic identified as illegitimate before it reaches your origin web server. (https://support.cloudflare.com/hc/en-us/articles/200172016).

    - `id: "waf"`

      ID of the zone setting.

      - `"waf"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `WebP object { id, value, editable, modified_on }`

    When the client requesting the image supports the WebP image codec, and WebP offers a performance advantage over the original image format, Cloudflare will serve a WebP version of the original image.

    - `id: "webp"`

      ID of the zone setting.

      - `"webp"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `Websocket object { id, value, editable, modified_on }`

    WebSockets are open connections sustained between the client and the origin server. Inside a WebSockets connection, the client and the origin can pass data back and forth without having to reestablish sessions. This makes exchanging data within a WebSockets connection fast. WebSockets are often used for real-time applications such as live chat and gaming. For more information refer to [Can I use Cloudflare with Websockets](https://support.cloudflare.com/hc/en-us/articles/200169466-Can-I-use-Cloudflare-with-WebSockets-).

    - `id: "websockets"`

      ID of the zone setting.

      - `"websockets"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/settings/$SETTING_ID \
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
    "id": "0rtt",
    "value": "on",
    "editable": true,
    "modified_on": "2014-01-01T05:20:00.12345Z"
  }
}
```

## Edit zone setting

**patch** `/zones/{zone_id}/settings/{setting_id}`

Updates a single zone setting by the identifier

### Path Parameters

- `zone_id: string`

  Identifier

- `setting_id: string`

  Setting name

### Body Parameters

- `body: object { enabled }  or object { value }`

  - `Enabled object { enabled }`

    - `enabled: optional boolean`

      ssl-recommender enrollment setting.

  - `Value object { value }`

    - `value: optional unknown or object { enabled, pool_id }  or array of string or 4 more`

      Value of the zone setting.

      - `unknown`

      - `ZonesCacheRulesAegisValue object { enabled, pool_id }`

        Value of the zone setting.

        - `enabled: optional boolean`

          Whether the feature is enabled or not.

        - `pool_id: optional string`

          Egress pool id which refers to a grouping of dedicated egress IPs through which Cloudflare will connect to origin.

      - `ZonesCiphersValue = array of string`

        Value of the zone setting.

      - `ZonesNELValue object { enabled }`

        Value of the zone setting.

        - `enabled: optional boolean`

      - `ZonesProxyReadTimeoutValue = number`

        Value of the zone setting.
        Notes: Value must be between 1 and 6000

      - `AutomaticPlatformOptimization object { cache_by_device_type, cf, enabled, 3 more }`

        - `cache_by_device_type: boolean`

          Indicates whether or not [cache by device type](https://developers.cloudflare.com/automatic-platform-optimization/reference/cache-device-type/) is enabled.

        - `cf: boolean`

          Indicates whether or not Cloudflare proxy is enabled.

        - `enabled: boolean`

          Indicates whether or not Automatic Platform Optimization is enabled.

        - `hostnames: array of string`

          An array of hostnames where Automatic Platform Optimization for WordPress is activated.

        - `wordpress: boolean`

          Indicates whether or not site is powered by WordPress.

        - `wp_plugin: boolean`

          Indicates whether or not [Cloudflare for WordPress plugin](https://wordpress.org/plugins/cloudflare/) is installed.

      - `ZonesSecurityHeaderValue object { strict_transport_security }`

        - `strict_transport_security: optional object { enabled, include_subdomains, max_age, 2 more }`

          Strict Transport Security.

          - `enabled: optional boolean`

            Whether or not strict transport security is enabled.

          - `include_subdomains: optional boolean`

            Include all subdomains for strict transport security.

          - `max_age: optional number`

            Max age in seconds of the strict transport security.

          - `nosniff: optional boolean`

            Whether or not to include 'X-Content-Type-Options: nosniff' header.

          - `preload: optional boolean`

            Enable automatic preload of the HSTS configuration.

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

- `success: boolean`

  Whether the API call was successful

- `result: optional ZeroRTT or AdvancedDDoS or object { id, modified_on, value }  or 60 more`

  0-RTT session resumption enabled for this zone.

  - `ZeroRTT object { id, value, editable, modified_on }`

    0-RTT session resumption enabled for this zone.

    - `id: "0rtt"`

      ID of the zone setting.

      - `"0rtt"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `AdvancedDDoS object { id, value, editable, modified_on }`

    Advanced protection from Distributed Denial of Service (DDoS) attacks on your website. This is an uneditable value that is 'on' in the case of Business and Enterprise zones.

    - `id: "advanced_ddos"`

      ID of the zone setting.

      - `"advanced_ddos"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesCacheRulesAegis object { id, modified_on, value }`

    Aegis provides dedicated egress IPs (from Cloudflare to your origin) for your layer 7 WAF and CDN services. The egress IPs are reserved exclusively for your account so that you can increase your origin security by only allowing traffic from a small list of IP addresses.

    - `id: "aegis"`

      ID of the zone setting.

      - `"aegis"`

    - `modified_on: optional string`

      Last time this setting was modified.

    - `value: optional object { enabled, pool_id }`

      Value of the zone setting.

      - `enabled: optional boolean`

        Whether the feature is enabled or not.

      - `pool_id: optional string`

        Egress pool id which refers to a grouping of dedicated egress IPs through which Cloudflare will connect to origin.

  - `AlwaysOnline object { id, value, editable, modified_on }`

    When enabled, Cloudflare serves limited copies of web pages available from the [Internet Archive's Wayback Machine](https://archive.org/web/) if your server is offline. Refer to [Always Online](https://developers.cloudflare.com/cache/about/always-online) for more information.

    - `id: "always_online"`

      ID of the zone setting.

      - `"always_online"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasAlwaysUseHTTPS object { id, value, editable, modified_on }`

    Reply to all requests for URLs that use "http" with a 301 redirect to the equivalent "https" URL. If you only want to redirect for a subset of requests, consider creating an "Always use HTTPS" page rule.

    - `id: "always_use_https"`

      ID of the zone setting.

      - `"always_use_https"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasAutomaticHTTPSRewrites object { id, value, editable, modified_on }`

    Enable the Automatic HTTPS Rewrites feature for this zone.

    - `id: "automatic_https_rewrites"`

      ID of the zone setting.

      - `"automatic_https_rewrites"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `Brotli object { id, value, editable, modified_on }`

    When the client requesting an asset supports the Brotli compression algorithm, Cloudflare will serve a Brotli compressed version of the asset.

    - `id: "brotli"`

      ID of the zone setting.

      - `"brotli"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasBrowserCacheTTL object { id, value, editable, modified_on }`

    Browser Cache TTL (in seconds) specifies how long Cloudflare-cached resources will remain on your visitors' computers. Cloudflare will honor any larger times specified by your server. (https://support.cloudflare.com/hc/en-us/articles/200168276).

    - `id: "browser_cache_ttl"`

      ID of the zone setting.

      - `"browser_cache_ttl"`

    - `value: number`

      Current value of the zone setting.

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasBrowserCheck object { id, value, editable, modified_on }`

    Browser Integrity Check is similar to Bad Behavior and looks for common HTTP headers abused most commonly by spammers and denies access to your page.  It will also challenge visitors that do not have a user agent or a non standard user agent (also commonly used by abuse bots, crawlers or visitors). (https://support.cloudflare.com/hc/en-us/articles/200170086).

    - `id: "browser_check"`

      ID of the zone setting.

      - `"browser_check"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasCacheLevel object { id, value, editable, modified_on }`

    Cache Level functions based off the setting level. The basic setting will cache most static resources (i.e., css, images, and JavaScript). The simplified setting will ignore the query string when delivering a cached resource. The aggressive setting will cache all static resources, including ones with a query string. (https://support.cloudflare.com/hc/en-us/articles/200168256).

    - `id: "cache_level"`

      ID of the zone setting.

      - `"cache_level"`

    - `value: "aggressive" or "basic" or "simplified"`

      Current value of the zone setting.

      - `"aggressive"`

      - `"basic"`

      - `"simplified"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ChallengeTTL object { id, value, editable, modified_on }`

    Specify how long a visitor is allowed access to your site after successfully completing a challenge (such as a CAPTCHA). After the TTL has expired the visitor will have to complete a new challenge. We recommend a 15 - 45 minute setting and will attempt to honor any setting above 45 minutes. (https://support.cloudflare.com/hc/en-us/articles/200170136).

    - `id: "challenge_ttl"`

      ID of the zone setting.

      - `"challenge_ttl"`

    - `value: 300 or 900 or 1800 or 11 more`

      Current value of the zone setting.

      - `300`

      - `900`

      - `1800`

      - `2700`

      - `3600`

      - `7200`

      - `10800`

      - `14400`

      - `28800`

      - `57600`

      - `86400`

      - `604800`

      - `2592000`

      - `31536000`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesChinaNetworkEnabled object { id, value, editable, modified_on }`

    Determines whether or not the china network is enabled.

    - `id: "china_network_enabled"`

      ID of the zone setting.

      - `"china_network_enabled"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesContentConverter object { id, value, editable, modified_on }`

    When enabled and the client sends an Accept header requesting text/markdown,
    Cloudflare will convert HTML responses to Markdown format using the toMarkdown() service.
    Refer to the [developer documentation](https://developers.cloudflare.com/workers-ai/features/markdown-conversion/) for more information.

    - `id: "content_converter"`

      ID of the zone setting.

      - `"content_converter"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `Ciphers object { id, value, editable, modified_on }`

    An allowlist of ciphers for TLS termination. These ciphers must be in the BoringSSL format.

    - `id: "ciphers"`

      ID of the zone setting.

      - `"ciphers"`

    - `value: array of string`

      Current value of the zone setting.

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesCNAMEFlattening object { id, value, editable, modified_on }`

    Whether or not cname flattening is on.

    - `id: "cname_flattening"`

      How to flatten the cname destination.

      - `"cname_flattening"`

    - `value: "flatten_at_root" or "flatten_all"`

      Current value of the zone setting.

      - `"flatten_at_root"`

      - `"flatten_all"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `DevelopmentMode object { id, value, editable, 2 more }`

    Development Mode temporarily allows you to enter development mode for your websites if you need to make changes to your site. This will bypass Cloudflare's accelerated cache and slow down your site, but is useful if you are making changes to cacheable content (like images, css, or JavaScript) and would like to see those changes right away. Once entered, development mode will last for 3 hours and then automatically toggle off.

    - `id: "development_mode"`

      ID of the zone setting.

      - `"development_mode"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

    - `time_remaining: optional number`

      Value of the zone setting.
      Notes: The interval (in seconds) from when development mode expires (positive integer) or last expired (negative integer) for the domain. If development mode has never been enabled, this value is false.

  - `EarlyHints object { id, value, editable, modified_on }`

    When enabled, Cloudflare will attempt to speed up overall page loads by serving `103` responses with `Link` headers from the final response. Refer to [Early Hints](https://developers.cloudflare.com/cache/about/early-hints) for more information.

    - `id: "early_hints"`

      ID of the zone setting.

      - `"early_hints"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasEdgeCacheTTL object { id, value, editable, modified_on }`

    Time (in seconds) that a resource will be ensured to remain on Cloudflare's cache servers.

    - `id: "edge_cache_ttl"`

      ID of the zone setting.

      - `"edge_cache_ttl"`

    - `value: 30 or 60 or 300 or 18 more`

      Current value of the zone setting.

      - `30`

      - `60`

      - `300`

      - `1200`

      - `1800`

      - `3600`

      - `7200`

      - `10800`

      - `14400`

      - `18000`

      - `28800`

      - `43200`

      - `57600`

      - `72000`

      - `86400`

      - `172800`

      - `259200`

      - `345600`

      - `432000`

      - `518400`

      - `604800`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasEmailObfuscation object { id, value, editable, modified_on }`

    Encrypt email adresses on your web page from bots, while keeping them visible to humans. (https://support.cloudflare.com/hc/en-us/articles/200170016).

    - `id: "email_obfuscation"`

      ID of the zone setting.

      - `"email_obfuscation"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `H2Prioritization object { id, value, editable, modified_on }`

    HTTP/2 Edge Prioritization optimises the delivery of resources served through HTTP/2 to improve page load performance. It also supports fine control of content delivery when used in conjunction with Workers.

    - `id: "h2_prioritization"`

      ID of the zone setting.

      - `"h2_prioritization"`

    - `value: "on" or "off" or "custom"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

      - `"custom"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `HotlinkProtection object { id, value, editable, modified_on }`

    When enabled, the Hotlink Protection option ensures that other sites cannot suck up your bandwidth by building pages that use images hosted on your site. Anytime a request for an image on your site hits Cloudflare, we check to ensure that it's not another site requesting them. People will still be able to download and view images from your page, but other sites won't be able to steal them for use on their own pages. (https://support.cloudflare.com/hc/en-us/articles/200170026).

    - `id: "hotlink_protection"`

      ID of the zone setting.

      - `"hotlink_protection"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `HTTP2 object { id, value, editable, modified_on }`

    HTTP2 enabled for this zone.

    - `id: "http2"`

      ID of the zone setting.

      - `"http2"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `HTTP3 object { id, value, editable, modified_on }`

    HTTP3 enabled for this zone.

    - `id: "http3"`

      ID of the zone setting.

      - `"http3"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ImageResizing object { id, value, editable, modified_on }`

    Image Transformations provides on-demand resizing, conversion and optimization for images served through Cloudflare's network. Refer to the [Image Transformations documentation](https://developers.cloudflare.com/images/) for more information.

    - `id: "image_resizing"`

      ID of the zone setting.

      - `"image_resizing"`

    - `value: "on" or "off" or "open"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

      - `"open"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasIPGeolocation object { id, value, editable, modified_on }`

    Enable IP Geolocation to have Cloudflare geolocate visitors to your website and pass the country code to you. (https://support.cloudflare.com/hc/en-us/articles/200168236).

    - `id: "ip_geolocation"`

      ID of the zone setting.

      - `"ip_geolocation"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `IPV6 object { id, value, editable, modified_on }`

    Enable IPv6 on all subdomains that are Cloudflare enabled.  (https://support.cloudflare.com/hc/en-us/articles/200168586).

    - `id: "ipv6"`

      ID of the zone setting.

      - `"ipv6"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesMaxUpload object { id, value, editable, modified_on }`

    Maximum size of an allowable upload.

    - `id: "max_upload"`

      identifier of the zone setting.

      - `"max_upload"`

    - `value: 100 or 125 or 150 or 15 more`

      Current value of the zone setting.

      - `100`

      - `125`

      - `150`

      - `175`

      - `200`

      - `225`

      - `250`

      - `275`

      - `300`

      - `325`

      - `350`

      - `375`

      - `400`

      - `425`

      - `450`

      - `475`

      - `500`

      - `1000`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `MinTLSVersion object { id, value, editable, modified_on }`

    Only accepts HTTPS requests that use at least the TLS protocol version specified. For example, if TLS 1.1 is selected, TLS 1.0 connections will be rejected, while 1.1, 1.2, and 1.3 (if enabled) will be permitted.

    - `id: "min_tls_version"`

      ID of the zone setting.

      - `"min_tls_version"`

    - `value: "1.0" or "1.1" or "1.2" or "1.3"`

      Current value of the zone setting.

      - `"1.0"`

      - `"1.1"`

      - `"1.2"`

      - `"1.3"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasMirage object { id, value, editable, modified_on }`

    Automatically optimize image loading for website visitors on mobile
    devices. Refer to [our blog post](http://blog.cloudflare.com/mirage2-solving-mobile-speed)
    for more information.

    - `id: "mirage"`

      ID of the zone setting.

      - `"mirage"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `NEL object { id, value, editable, modified_on }`

    Enable Network Error Logging reporting on your zone. (Beta)

    - `id: "nel"`

      Zone setting identifier.

      - `"nel"`

    - `value: object { enabled }`

      Current value of the zone setting.

      - `enabled: optional boolean`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasOpportunisticEncryption object { id, value, editable, modified_on }`

    Enables the Opportunistic Encryption feature for a zone.

    - `id: "opportunistic_encryption"`

      ID of the zone setting.

      - `"opportunistic_encryption"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `OpportunisticOnion object { id, value, editable, modified_on }`

    Add an Alt-Svc header to all legitimate requests from Tor, allowing the connection to use our onion services instead of exit nodes.

    - `id: "opportunistic_onion"`

      ID of the zone setting.

      - `"opportunistic_onion"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `OrangeToOrange object { id, value, editable, modified_on }`

    Orange to Orange (O2O) allows zones on Cloudflare to CNAME to other zones also on Cloudflare.

    - `id: "orange_to_orange"`

      ID of the zone setting.

      - `"orange_to_orange"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasOriginErrorPagePassThru object { id, value, editable, modified_on }`

    Cloudflare will proxy customer error pages on any 502,504 errors on origin server instead of showing a default Cloudflare error page. This does not apply to 522 errors and is limited to Enterprise Zones.

    - `id: "origin_error_page_pass_thru"`

      ID of the zone setting.

      - `"origin_error_page_pass_thru"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesCacheRulesOriginH2MaxStreams object { id, modified_on, value }`

    Origin H2 Max Streams configures the max number of concurrent requests that Cloudflare will send within the same connection when communicating with the origin server, if the origin supports it. Note that if your origin does not support H2 multiplexing, 5xx errors may be observed, particularly 520s. Also note that the default value is `100` for all plan types except Enterprise where it is `1`. `1` means that H2 multiplexing is disabled.

    - `id: "origin_h2_max_streams"`

      Value of the zone setting.

      - `"origin_h2_max_streams"`

    - `modified_on: optional string`

      Last time this setting was modified.

    - `value: optional number`

      Value of the Origin H2 Max Streams Setting.

  - `ZonesCacheRulesOriginMaxHTTPVersion object { id, modified_on, value }`

    Origin Max HTTP Setting Version sets the highest HTTP version Cloudflare will attempt to use with your origin. This setting allows Cloudflare to make HTTP/2 requests to your origin. (Refer to [Enable HTTP/2 to Origin](https://developers.cloudflare.com/cache/how-to/enable-http2-to-origin/), for more information.). The default value is "2" for all plan types except Enterprise where it is "1".

    - `id: "origin_max_http_version"`

      Value of the zone setting.

      - `"origin_max_http_version"`

    - `modified_on: optional string`

      Last time this setting was modified.

    - `value: optional "2" or "1"`

      Value of the Origin Max HTTP Version Setting.

      - `"2"`

      - `"1"`

  - `ZonesSchemasPolish object { id, value, editable, modified_on }`

    Removes metadata and compresses your images for faster page load times. Basic (Lossless): Reduce the size of PNG, JPEG, and GIF files - no impact on visual quality. Basic + JPEG (Lossy): Further reduce the size of JPEG files for faster image loading. Larger JPEGs are converted to progressive images, loading a lower-resolution image first and ending in a higher-resolution version. Not recommended for hi-res photography sites.

    - `id: "polish"`

      ID of the zone setting.

      - `"polish"`

    - `value: "off" or "lossless" or "lossy"`

      Current value of the zone setting.

      - `"off"`

      - `"lossless"`

      - `"lossy"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `PrefetchPreload object { id, value, editable, modified_on }`

    Cloudflare will prefetch any URLs that are included in the response headers. This is limited to Enterprise Zones.

    - `id: "prefetch_preload"`

      ID of the zone setting.

      - `"prefetch_preload"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesPrivacyPass object { id, value, editable, modified_on }`

    Privacy Pass v1 was a browser extension developed by the Privacy Pass Team to improve the browsing experience for your visitors by allowing users to reduce the number of CAPTCHAs shown. (https://support.cloudflare.com/hc/en-us/articles/115001992652-Privacy-Pass).

    - `id: "privacy_pass"`

      ID of the zone setting.

      - `"privacy_pass"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ProxyReadTimeout object { id, value, editable, modified_on }`

    Maximum time between two read operations from origin.

    - `id: "proxy_read_timeout"`

      ID of the zone setting.

      - `"proxy_read_timeout"`

    - `value: number`

      Current value of the zone setting.

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `PseudoIPV4 object { id, value, editable, modified_on }`

    The value set for the Pseudo IPv4 setting.

    - `id: "pseudo_ipv4"`

      Value of the Pseudo IPv4 setting.

      - `"pseudo_ipv4"`

    - `value: "off" or "add_header" or "overwrite_header"`

      Current value of the zone setting.

      - `"off"`

      - `"add_header"`

      - `"overwrite_header"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesRedirectsForAITraining object { id, value, editable, modified_on }`

    When enabled, Cloudflare will redirect verified AI training crawlers to canonical URLs
    found in the HTML response, ensuring AI models train on authoritative content.

    - `id: "redirects_for_ai_training"`

      ID of the zone setting.

      - `"redirects_for_ai_training"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesReplaceInsecureJS object { id, value, editable, modified_on }`

    Automatically replace insecure JavaScript libraries with safer and faster alternatives provided under cdnjs and powered by Cloudflare. Currently supports the following libraries: Polyfill under polyfill.io.

    - `id: "replace_insecure_js"`

      ID of the zone setting.

      - `"replace_insecure_js"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasResponseBuffering object { id, value, editable, modified_on }`

    Enables or disables buffering of responses from the proxied server. Cloudflare may buffer the whole payload to deliver it at once to the client versus allowing it to be delivered in chunks. By default, the proxied server streams directly and is not buffered by Cloudflare. This is limited to Enterprise Zones.

    - `id: "response_buffering"`

      ID of the zone setting.

      - `"response_buffering"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasRocketLoader object { id, value, editable, modified_on }`

    Rocket Loader is a general-purpose asynchronous JavaScript optimisation that prioritises rendering your content while loading your site's Javascript asynchronously. Turning on Rocket Loader will immediately improve a web page's rendering time sometimes measured as Time to First Paint (TTFP), and also the `window.onload` time (assuming there is JavaScript on the page). This can have a positive impact on your Google search ranking. When turned on, Rocket Loader will automatically defer the loading of all Javascript referenced in your HTML, with no configuration required. Refer to [Understanding Rocket Loader](https://support.cloudflare.com/hc/articles/200168056) for more information.

    - `id: "rocket_loader"`

      ID of the zone setting.

      - `"rocket_loader"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasAutomaticPlatformOptimization object { id, value, editable, modified_on }`

    [Automatic Platform Optimization for WordPress](https://developers.cloudflare.com/automatic-platform-optimization/) serves your WordPress site from Cloudflare's edge network and caches third-party fonts.

    - `id: "automatic_platform_optimization"`

      ID of the zone setting.

      - `"automatic_platform_optimization"`

    - `value: AutomaticPlatformOptimization`

      Current value of the zone setting.

      - `cache_by_device_type: boolean`

        Indicates whether or not [cache by device type](https://developers.cloudflare.com/automatic-platform-optimization/reference/cache-device-type/) is enabled.

      - `cf: boolean`

        Indicates whether or not Cloudflare proxy is enabled.

      - `enabled: boolean`

        Indicates whether or not Automatic Platform Optimization is enabled.

      - `hostnames: array of string`

        An array of hostnames where Automatic Platform Optimization for WordPress is activated.

      - `wordpress: boolean`

        Indicates whether or not site is powered by WordPress.

      - `wp_plugin: boolean`

        Indicates whether or not [Cloudflare for WordPress plugin](https://wordpress.org/plugins/cloudflare/) is installed.

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSearchForAgents object { id, value, editable, modified_on }`

    When enabled, Cloudflare provisions an AI Search instance for the zone
    and exposes a /.well-known/ai-search endpoint that AI agents can query.
    Markdown responses also receive an agent: YAML capability block advertising
    the search endpoint.

    - `id: "search_for_agents"`

      ID of the zone setting.

      - `"search_for_agents"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `SecurityHeaders object { id, value, editable, modified_on }`

    Cloudflare security header for a zone.

    - `id: "security_header"`

      ID of the zone's security header.

      - `"security_header"`

    - `value: object { strict_transport_security }`

      Current value of the zone setting.

      - `strict_transport_security: optional object { enabled, include_subdomains, max_age, 2 more }`

        Strict Transport Security.

        - `enabled: optional boolean`

          Whether or not strict transport security is enabled.

        - `include_subdomains: optional boolean`

          Include all subdomains for strict transport security.

        - `max_age: optional number`

          Max age in seconds of the strict transport security.

        - `nosniff: optional boolean`

          Whether or not to include 'X-Content-Type-Options: nosniff' header.

        - `preload: optional boolean`

          Enable automatic preload of the HSTS configuration.

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasSecurityLevel object { id, value, editable, modified_on }`

    Choose the appropriate security profile for your website, which will automatically adjust each of the security settings. If you choose to customize an individual security setting, the profile will become Custom. (https://support.cloudflare.com/hc/en-us/articles/200170056).

    - `id: "security_level"`

      ID of the zone setting.

      - `"security_level"`

    - `value: "off" or "essentially_off" or "low" or 3 more`

      Current value of the zone setting.

      - `"off"`

      - `"essentially_off"`

      - `"low"`

      - `"medium"`

      - `"high"`

      - `"under_attack"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ServerSideExcludes object { id, value, editable, modified_on }`

    If there is sensitive content on your website that you want visible to real visitors, but that you want to hide from suspicious visitors, all you have to do is wrap the content with Cloudflare SSE tags. Wrap any content that you want to be excluded from suspicious visitors in the following SSE tags: <!--sse--><!--/sse-->. For example: <!--sse-->  Bad visitors won't see my phone number, 555-555-5555 <!--/sse-->. Note: SSE only will work with HTML. If you have HTML minification enabled, you won't see the SSE tags in your HTML source when it's served through Cloudflare. SSE will still function in this case, as Cloudflare's HTML minification and SSE functionality occur on-the-fly as the resource moves through our network to the visitor's computer. (https://support.cloudflare.com/hc/en-us/articles/200170036).

    - `id: "server_side_exclude"`

      ID of the zone setting.

      - `"server_side_exclude"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSha1Support object { id, value, editable, modified_on }`

    Allow SHA1 support.

    - `id: "sha1_support"`

      Zone setting identifier.

      - `"sha1_support"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasSortQueryStringForCache object { id, value, editable, modified_on }`

    Cloudflare will treat files with the same query strings as the same file in cache, regardless of the order of the query strings. This is limited to Enterprise Zones.

    - `id: "sort_query_string_for_cache"`

      ID of the zone setting.

      - `"sort_query_string_for_cache"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasSSL object { id, value, editable, modified_on }`

    SSL encrypts your visitor's connection and safeguards credit card numbers and other personal data to and from your website. SSL can take up to 5 minutes to fully activate. Requires Cloudflare active on your root domain or www domain. Off: no SSL between the visitor and Cloudflare, and no SSL between Cloudflare and your web server  (all HTTP traffic). Flexible: SSL between the visitor and Cloudflare -- visitor sees HTTPS on your site, but no SSL between Cloudflare and your web server. You don't need to have an SSL cert on your web server, but your vistors will still see the site as being HTTPS enabled. Full:  SSL between the visitor and Cloudflare -- visitor sees HTTPS on your site, and SSL between Cloudflare and your web server. You'll need to have your own SSL cert or self-signed cert at the very least. Full (Strict): SSL between the visitor and Cloudflare -- visitor sees HTTPS on your site, and SSL between Cloudflare and your web server. You'll need to have a valid SSL certificate installed on your web server. This certificate must be signed by a certificate authority, have an expiration date in the future, and respond for the request domain name (hostname). (https://support.cloudflare.com/hc/en-us/articles/200170416).

    - `id: "ssl"`

      ID of the zone setting.

      - `"ssl"`

    - `value: "off" or "flexible" or "full" or "strict"`

      Current value of the zone setting.

      - `"off"`

      - `"flexible"`

      - `"full"`

      - `"strict"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `SSLRecommender object { id, enabled }`

    Enrollment in the SSL/TLS Recommender service which tries to detect and recommend (by sending periodic emails) the most secure SSL/TLS setting your origin servers support.

    - `id: optional "ssl_recommender"`

      Enrollment value for SSL/TLS Recommender.

      - `"ssl_recommender"`

    - `enabled: optional boolean`

      ssl-recommender enrollment setting.

  - `ZonesTLS1_2Only object { id, value, editable, modified_on }`

    Only allows TLS1.2.

    - `id: "tls_1_2_only"`

      Zone setting identifier.

      - `"tls_1_2_only"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `TLS1_3 object { id, value, editable, modified_on }`

    Enables Crypto TLS 1.3 feature for a zone.

    - `id: "tls_1_3"`

      ID of the zone setting.

      - `"tls_1_3"`

    - `value: "on" or "off" or "zrt"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

      - `"zrt"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `TLSClientAuth object { id, value, editable, modified_on }`

    TLS Client Auth requires Cloudflare to connect to your origin server using a client certificate (Enterprise Only).

    - `id: "tls_client_auth"`

      ID of the zone setting.

      - `"tls_client_auth"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesTransformations object { id, value, editable, modified_on }`

    Media Transformations provides on-demand resizing, conversion and optimization for images and video served through Cloudflare's network. Refer to the [Image Transformations](https://developers.cloudflare.com/images/) and [Video Transformations](https://developers.cloudflare.com/stream/transform-videos/#getting-started) documentation for more information.

    - `id: "transformations"`

      ID of the zone setting. Shared between Image Transformations and Video Transformations.

      - `"transformations"`

    - `value: "on" or "off" or "open"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

      - `"open"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesTransformationsAllowedOrigins object { id, value, editable, modified_on }`

    Media Transformations Allowed Origins restricts transformations for images and video served through Cloudflare's network. Refer to the [Image Transformations](https://developers.cloudflare.com/images/) and [Video Transformations](https://developers.cloudflare.com/stream/transform-videos/#getting-started) documentation for more information.

    - `id: "transformations_allowed_origins"`

      ID of the zone setting. Shared between Image Transformations and Video Transformations.

      - `"transformations_allowed_origins"`

    - `value: string`

      Current value of the zone setting.

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasTrueClientIPHeader object { id, value, editable, modified_on }`

    Allows customer to continue to use True Client IP (Akamai feature) in the headers we send to the origin. This is limited to Enterprise Zones.

    - `id: "true_client_ip_header"`

      ID of the zone setting.

      - `"true_client_ip_header"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasWAF object { id, value, editable, modified_on }`

    The WAF examines HTTP requests to your website.  It inspects both GET and POST requests and applies rules to help filter out illegitimate traffic from legitimate website visitors. The Cloudflare WAF inspects website addresses or URLs to detect anything out of the ordinary. If the Cloudflare WAF determines suspicious user behavior, then the WAF will 'challenge' the web visitor with a page that asks them to submit a CAPTCHA successfully  to continue their action. If the challenge is failed, the action will be stopped. What this means is that Cloudflare's WAF will block any traffic identified as illegitimate before it reaches your origin web server. (https://support.cloudflare.com/hc/en-us/articles/200172016).

    - `id: "waf"`

      ID of the zone setting.

      - `"waf"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `WebP object { id, value, editable, modified_on }`

    When the client requesting the image supports the WebP image codec, and WebP offers a performance advantage over the original image format, Cloudflare will serve a WebP version of the original image.

    - `id: "webp"`

      ID of the zone setting.

      - `"webp"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `Websocket object { id, value, editable, modified_on }`

    WebSockets are open connections sustained between the client and the origin server. Inside a WebSockets connection, the client and the origin can pass data back and forth without having to reestablish sessions. This makes exchanging data within a WebSockets connection fast. WebSockets are often used for real-time applications such as live chat and gaming. For more information refer to [Can I use Cloudflare with Websockets](https://support.cloudflare.com/hc/en-us/articles/200169466-Can-I-use-Cloudflare-with-WebSockets-).

    - `id: "websockets"`

      ID of the zone setting.

      - `"websockets"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/settings/$SETTING_ID \
    -X PATCH \
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
  "success": true,
  "result": {
    "id": "0rtt",
    "value": "on",
    "editable": true,
    "modified_on": "2014-01-01T05:20:00.12345Z"
  }
}
```

## Edit multiple zone settings

**patch** `/zones/{zone_id}/settings`

Edit settings for a zone.

### Path Parameters

- `zone_id: string`

  Identifier

### Body Parameters

- `body: array of ZeroRTT or AdvancedDDoS or object { id, modified_on, value }  or 57 more`

  - `ZeroRTT object { id, value, editable, modified_on }`

    0-RTT session resumption enabled for this zone.

    - `id: "0rtt"`

      ID of the zone setting.

      - `"0rtt"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `AdvancedDDoS object { id, value, editable, modified_on }`

    Advanced protection from Distributed Denial of Service (DDoS) attacks on your website. This is an uneditable value that is 'on' in the case of Business and Enterprise zones.

    - `id: "advanced_ddos"`

      ID of the zone setting.

      - `"advanced_ddos"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesCacheRulesAegis object { id, modified_on, value }`

    Aegis provides dedicated egress IPs (from Cloudflare to your origin) for your layer 7 WAF and CDN services. The egress IPs are reserved exclusively for your account so that you can increase your origin security by only allowing traffic from a small list of IP addresses.

    - `id: "aegis"`

      ID of the zone setting.

      - `"aegis"`

    - `modified_on: optional string`

      Last time this setting was modified.

    - `value: optional object { enabled, pool_id }`

      Value of the zone setting.

      - `enabled: optional boolean`

        Whether the feature is enabled or not.

      - `pool_id: optional string`

        Egress pool id which refers to a grouping of dedicated egress IPs through which Cloudflare will connect to origin.

  - `AlwaysOnline object { id, value, editable, modified_on }`

    When enabled, Cloudflare serves limited copies of web pages available from the [Internet Archive's Wayback Machine](https://archive.org/web/) if your server is offline. Refer to [Always Online](https://developers.cloudflare.com/cache/about/always-online) for more information.

    - `id: "always_online"`

      ID of the zone setting.

      - `"always_online"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasAlwaysUseHTTPS object { id, value, editable, modified_on }`

    Reply to all requests for URLs that use "http" with a 301 redirect to the equivalent "https" URL. If you only want to redirect for a subset of requests, consider creating an "Always use HTTPS" page rule.

    - `id: "always_use_https"`

      ID of the zone setting.

      - `"always_use_https"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasAutomaticHTTPSRewrites object { id, value, editable, modified_on }`

    Enable the Automatic HTTPS Rewrites feature for this zone.

    - `id: "automatic_https_rewrites"`

      ID of the zone setting.

      - `"automatic_https_rewrites"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `Brotli object { id, value, editable, modified_on }`

    When the client requesting an asset supports the Brotli compression algorithm, Cloudflare will serve a Brotli compressed version of the asset.

    - `id: "brotli"`

      ID of the zone setting.

      - `"brotli"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasBrowserCacheTTL object { id, value, editable, modified_on }`

    Browser Cache TTL (in seconds) specifies how long Cloudflare-cached resources will remain on your visitors' computers. Cloudflare will honor any larger times specified by your server. (https://support.cloudflare.com/hc/en-us/articles/200168276).

    - `id: "browser_cache_ttl"`

      ID of the zone setting.

      - `"browser_cache_ttl"`

    - `value: number`

      Current value of the zone setting.

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasBrowserCheck object { id, value, editable, modified_on }`

    Browser Integrity Check is similar to Bad Behavior and looks for common HTTP headers abused most commonly by spammers and denies access to your page.  It will also challenge visitors that do not have a user agent or a non standard user agent (also commonly used by abuse bots, crawlers or visitors). (https://support.cloudflare.com/hc/en-us/articles/200170086).

    - `id: "browser_check"`

      ID of the zone setting.

      - `"browser_check"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasCacheLevel object { id, value, editable, modified_on }`

    Cache Level functions based off the setting level. The basic setting will cache most static resources (i.e., css, images, and JavaScript). The simplified setting will ignore the query string when delivering a cached resource. The aggressive setting will cache all static resources, including ones with a query string. (https://support.cloudflare.com/hc/en-us/articles/200168256).

    - `id: "cache_level"`

      ID of the zone setting.

      - `"cache_level"`

    - `value: "aggressive" or "basic" or "simplified"`

      Current value of the zone setting.

      - `"aggressive"`

      - `"basic"`

      - `"simplified"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ChallengeTTL object { id, value, editable, modified_on }`

    Specify how long a visitor is allowed access to your site after successfully completing a challenge (such as a CAPTCHA). After the TTL has expired the visitor will have to complete a new challenge. We recommend a 15 - 45 minute setting and will attempt to honor any setting above 45 minutes. (https://support.cloudflare.com/hc/en-us/articles/200170136).

    - `id: "challenge_ttl"`

      ID of the zone setting.

      - `"challenge_ttl"`

    - `value: 300 or 900 or 1800 or 11 more`

      Current value of the zone setting.

      - `300`

      - `900`

      - `1800`

      - `2700`

      - `3600`

      - `7200`

      - `10800`

      - `14400`

      - `28800`

      - `57600`

      - `86400`

      - `604800`

      - `2592000`

      - `31536000`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesChinaNetworkEnabled object { id, value, editable, modified_on }`

    Determines whether or not the china network is enabled.

    - `id: "china_network_enabled"`

      ID of the zone setting.

      - `"china_network_enabled"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesContentConverter object { id, value, editable, modified_on }`

    When enabled and the client sends an Accept header requesting text/markdown,
    Cloudflare will convert HTML responses to Markdown format using the toMarkdown() service.
    Refer to the [developer documentation](https://developers.cloudflare.com/workers-ai/features/markdown-conversion/) for more information.

    - `id: "content_converter"`

      ID of the zone setting.

      - `"content_converter"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `Ciphers object { id, value, editable, modified_on }`

    An allowlist of ciphers for TLS termination. These ciphers must be in the BoringSSL format.

    - `id: "ciphers"`

      ID of the zone setting.

      - `"ciphers"`

    - `value: array of string`

      Current value of the zone setting.

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesCNAMEFlattening object { id, value, editable, modified_on }`

    Whether or not cname flattening is on.

    - `id: "cname_flattening"`

      How to flatten the cname destination.

      - `"cname_flattening"`

    - `value: "flatten_at_root" or "flatten_all"`

      Current value of the zone setting.

      - `"flatten_at_root"`

      - `"flatten_all"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `DevelopmentMode object { id, value, editable, 2 more }`

    Development Mode temporarily allows you to enter development mode for your websites if you need to make changes to your site. This will bypass Cloudflare's accelerated cache and slow down your site, but is useful if you are making changes to cacheable content (like images, css, or JavaScript) and would like to see those changes right away. Once entered, development mode will last for 3 hours and then automatically toggle off.

    - `id: "development_mode"`

      ID of the zone setting.

      - `"development_mode"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

    - `time_remaining: optional number`

      Value of the zone setting.
      Notes: The interval (in seconds) from when development mode expires (positive integer) or last expired (negative integer) for the domain. If development mode has never been enabled, this value is false.

  - `EarlyHints object { id, value, editable, modified_on }`

    When enabled, Cloudflare will attempt to speed up overall page loads by serving `103` responses with `Link` headers from the final response. Refer to [Early Hints](https://developers.cloudflare.com/cache/about/early-hints) for more information.

    - `id: "early_hints"`

      ID of the zone setting.

      - `"early_hints"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasEdgeCacheTTL object { id, value, editable, modified_on }`

    Time (in seconds) that a resource will be ensured to remain on Cloudflare's cache servers.

    - `id: "edge_cache_ttl"`

      ID of the zone setting.

      - `"edge_cache_ttl"`

    - `value: 30 or 60 or 300 or 18 more`

      Current value of the zone setting.

      - `30`

      - `60`

      - `300`

      - `1200`

      - `1800`

      - `3600`

      - `7200`

      - `10800`

      - `14400`

      - `18000`

      - `28800`

      - `43200`

      - `57600`

      - `72000`

      - `86400`

      - `172800`

      - `259200`

      - `345600`

      - `432000`

      - `518400`

      - `604800`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasEmailObfuscation object { id, value, editable, modified_on }`

    Encrypt email adresses on your web page from bots, while keeping them visible to humans. (https://support.cloudflare.com/hc/en-us/articles/200170016).

    - `id: "email_obfuscation"`

      ID of the zone setting.

      - `"email_obfuscation"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `H2Prioritization object { id, value, editable, modified_on }`

    HTTP/2 Edge Prioritization optimises the delivery of resources served through HTTP/2 to improve page load performance. It also supports fine control of content delivery when used in conjunction with Workers.

    - `id: "h2_prioritization"`

      ID of the zone setting.

      - `"h2_prioritization"`

    - `value: "on" or "off" or "custom"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

      - `"custom"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `HotlinkProtection object { id, value, editable, modified_on }`

    When enabled, the Hotlink Protection option ensures that other sites cannot suck up your bandwidth by building pages that use images hosted on your site. Anytime a request for an image on your site hits Cloudflare, we check to ensure that it's not another site requesting them. People will still be able to download and view images from your page, but other sites won't be able to steal them for use on their own pages. (https://support.cloudflare.com/hc/en-us/articles/200170026).

    - `id: "hotlink_protection"`

      ID of the zone setting.

      - `"hotlink_protection"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `HTTP2 object { id, value, editable, modified_on }`

    HTTP2 enabled for this zone.

    - `id: "http2"`

      ID of the zone setting.

      - `"http2"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `HTTP3 object { id, value, editable, modified_on }`

    HTTP3 enabled for this zone.

    - `id: "http3"`

      ID of the zone setting.

      - `"http3"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasIPGeolocation object { id, value, editable, modified_on }`

    Enable IP Geolocation to have Cloudflare geolocate visitors to your website and pass the country code to you. (https://support.cloudflare.com/hc/en-us/articles/200168236).

    - `id: "ip_geolocation"`

      ID of the zone setting.

      - `"ip_geolocation"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `IPV6 object { id, value, editable, modified_on }`

    Enable IPv6 on all subdomains that are Cloudflare enabled.  (https://support.cloudflare.com/hc/en-us/articles/200168586).

    - `id: "ipv6"`

      ID of the zone setting.

      - `"ipv6"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesMaxUpload object { id, value, editable, modified_on }`

    Maximum size of an allowable upload.

    - `id: "max_upload"`

      identifier of the zone setting.

      - `"max_upload"`

    - `value: 100 or 125 or 150 or 15 more`

      Current value of the zone setting.

      - `100`

      - `125`

      - `150`

      - `175`

      - `200`

      - `225`

      - `250`

      - `275`

      - `300`

      - `325`

      - `350`

      - `375`

      - `400`

      - `425`

      - `450`

      - `475`

      - `500`

      - `1000`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `MinTLSVersion object { id, value, editable, modified_on }`

    Only accepts HTTPS requests that use at least the TLS protocol version specified. For example, if TLS 1.1 is selected, TLS 1.0 connections will be rejected, while 1.1, 1.2, and 1.3 (if enabled) will be permitted.

    - `id: "min_tls_version"`

      ID of the zone setting.

      - `"min_tls_version"`

    - `value: "1.0" or "1.1" or "1.2" or "1.3"`

      Current value of the zone setting.

      - `"1.0"`

      - `"1.1"`

      - `"1.2"`

      - `"1.3"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasMirage object { id, value, editable, modified_on }`

    Automatically optimize image loading for website visitors on mobile
    devices. Refer to [our blog post](http://blog.cloudflare.com/mirage2-solving-mobile-speed)
    for more information.

    - `id: "mirage"`

      ID of the zone setting.

      - `"mirage"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `NEL object { id, value, editable, modified_on }`

    Enable Network Error Logging reporting on your zone. (Beta)

    - `id: "nel"`

      Zone setting identifier.

      - `"nel"`

    - `value: object { enabled }`

      Current value of the zone setting.

      - `enabled: optional boolean`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasOpportunisticEncryption object { id, value, editable, modified_on }`

    Enables the Opportunistic Encryption feature for a zone.

    - `id: "opportunistic_encryption"`

      ID of the zone setting.

      - `"opportunistic_encryption"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `OpportunisticOnion object { id, value, editable, modified_on }`

    Add an Alt-Svc header to all legitimate requests from Tor, allowing the connection to use our onion services instead of exit nodes.

    - `id: "opportunistic_onion"`

      ID of the zone setting.

      - `"opportunistic_onion"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `OrangeToOrange object { id, value, editable, modified_on }`

    Orange to Orange (O2O) allows zones on Cloudflare to CNAME to other zones also on Cloudflare.

    - `id: "orange_to_orange"`

      ID of the zone setting.

      - `"orange_to_orange"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasOriginErrorPagePassThru object { id, value, editable, modified_on }`

    Cloudflare will proxy customer error pages on any 502,504 errors on origin server instead of showing a default Cloudflare error page. This does not apply to 522 errors and is limited to Enterprise Zones.

    - `id: "origin_error_page_pass_thru"`

      ID of the zone setting.

      - `"origin_error_page_pass_thru"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesCacheRulesOriginH2MaxStreams object { id, modified_on, value }`

    Origin H2 Max Streams configures the max number of concurrent requests that Cloudflare will send within the same connection when communicating with the origin server, if the origin supports it. Note that if your origin does not support H2 multiplexing, 5xx errors may be observed, particularly 520s. Also note that the default value is `100` for all plan types except Enterprise where it is `1`. `1` means that H2 multiplexing is disabled.

    - `id: "origin_h2_max_streams"`

      Value of the zone setting.

      - `"origin_h2_max_streams"`

    - `modified_on: optional string`

      Last time this setting was modified.

    - `value: optional number`

      Value of the Origin H2 Max Streams Setting.

  - `ZonesCacheRulesOriginMaxHTTPVersion object { id, modified_on, value }`

    Origin Max HTTP Setting Version sets the highest HTTP version Cloudflare will attempt to use with your origin. This setting allows Cloudflare to make HTTP/2 requests to your origin. (Refer to [Enable HTTP/2 to Origin](https://developers.cloudflare.com/cache/how-to/enable-http2-to-origin/), for more information.). The default value is "2" for all plan types except Enterprise where it is "1".

    - `id: "origin_max_http_version"`

      Value of the zone setting.

      - `"origin_max_http_version"`

    - `modified_on: optional string`

      Last time this setting was modified.

    - `value: optional "2" or "1"`

      Value of the Origin Max HTTP Version Setting.

      - `"2"`

      - `"1"`

  - `ZonesSchemasPolish object { id, value, editable, modified_on }`

    Removes metadata and compresses your images for faster page load times. Basic (Lossless): Reduce the size of PNG, JPEG, and GIF files - no impact on visual quality. Basic + JPEG (Lossy): Further reduce the size of JPEG files for faster image loading. Larger JPEGs are converted to progressive images, loading a lower-resolution image first and ending in a higher-resolution version. Not recommended for hi-res photography sites.

    - `id: "polish"`

      ID of the zone setting.

      - `"polish"`

    - `value: "off" or "lossless" or "lossy"`

      Current value of the zone setting.

      - `"off"`

      - `"lossless"`

      - `"lossy"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `PrefetchPreload object { id, value, editable, modified_on }`

    Cloudflare will prefetch any URLs that are included in the response headers. This is limited to Enterprise Zones.

    - `id: "prefetch_preload"`

      ID of the zone setting.

      - `"prefetch_preload"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesPrivacyPass object { id, value, editable, modified_on }`

    Privacy Pass v1 was a browser extension developed by the Privacy Pass Team to improve the browsing experience for your visitors by allowing users to reduce the number of CAPTCHAs shown. (https://support.cloudflare.com/hc/en-us/articles/115001992652-Privacy-Pass).

    - `id: "privacy_pass"`

      ID of the zone setting.

      - `"privacy_pass"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ProxyReadTimeout object { id, value, editable, modified_on }`

    Maximum time between two read operations from origin.

    - `id: "proxy_read_timeout"`

      ID of the zone setting.

      - `"proxy_read_timeout"`

    - `value: number`

      Current value of the zone setting.

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `PseudoIPV4 object { id, value, editable, modified_on }`

    The value set for the Pseudo IPv4 setting.

    - `id: "pseudo_ipv4"`

      Value of the Pseudo IPv4 setting.

      - `"pseudo_ipv4"`

    - `value: "off" or "add_header" or "overwrite_header"`

      Current value of the zone setting.

      - `"off"`

      - `"add_header"`

      - `"overwrite_header"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesRedirectsForAITraining object { id, value, editable, modified_on }`

    When enabled, Cloudflare will redirect verified AI training crawlers to canonical URLs
    found in the HTML response, ensuring AI models train on authoritative content.

    - `id: "redirects_for_ai_training"`

      ID of the zone setting.

      - `"redirects_for_ai_training"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesReplaceInsecureJS object { id, value, editable, modified_on }`

    Automatically replace insecure JavaScript libraries with safer and faster alternatives provided under cdnjs and powered by Cloudflare. Currently supports the following libraries: Polyfill under polyfill.io.

    - `id: "replace_insecure_js"`

      ID of the zone setting.

      - `"replace_insecure_js"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasResponseBuffering object { id, value, editable, modified_on }`

    Enables or disables buffering of responses from the proxied server. Cloudflare may buffer the whole payload to deliver it at once to the client versus allowing it to be delivered in chunks. By default, the proxied server streams directly and is not buffered by Cloudflare. This is limited to Enterprise Zones.

    - `id: "response_buffering"`

      ID of the zone setting.

      - `"response_buffering"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasRocketLoader object { id, value, editable, modified_on }`

    Rocket Loader is a general-purpose asynchronous JavaScript optimisation that prioritises rendering your content while loading your site's Javascript asynchronously. Turning on Rocket Loader will immediately improve a web page's rendering time sometimes measured as Time to First Paint (TTFP), and also the `window.onload` time (assuming there is JavaScript on the page). This can have a positive impact on your Google search ranking. When turned on, Rocket Loader will automatically defer the loading of all Javascript referenced in your HTML, with no configuration required. Refer to [Understanding Rocket Loader](https://support.cloudflare.com/hc/articles/200168056) for more information.

    - `id: "rocket_loader"`

      ID of the zone setting.

      - `"rocket_loader"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasAutomaticPlatformOptimization object { id, value, editable, modified_on }`

    [Automatic Platform Optimization for WordPress](https://developers.cloudflare.com/automatic-platform-optimization/) serves your WordPress site from Cloudflare's edge network and caches third-party fonts.

    - `id: "automatic_platform_optimization"`

      ID of the zone setting.

      - `"automatic_platform_optimization"`

    - `value: AutomaticPlatformOptimization`

      Current value of the zone setting.

      - `cache_by_device_type: boolean`

        Indicates whether or not [cache by device type](https://developers.cloudflare.com/automatic-platform-optimization/reference/cache-device-type/) is enabled.

      - `cf: boolean`

        Indicates whether or not Cloudflare proxy is enabled.

      - `enabled: boolean`

        Indicates whether or not Automatic Platform Optimization is enabled.

      - `hostnames: array of string`

        An array of hostnames where Automatic Platform Optimization for WordPress is activated.

      - `wordpress: boolean`

        Indicates whether or not site is powered by WordPress.

      - `wp_plugin: boolean`

        Indicates whether or not [Cloudflare for WordPress plugin](https://wordpress.org/plugins/cloudflare/) is installed.

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSearchForAgents object { id, value, editable, modified_on }`

    When enabled, Cloudflare provisions an AI Search instance for the zone
    and exposes a /.well-known/ai-search endpoint that AI agents can query.
    Markdown responses also receive an agent: YAML capability block advertising
    the search endpoint.

    - `id: "search_for_agents"`

      ID of the zone setting.

      - `"search_for_agents"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `SecurityHeaders object { id, value, editable, modified_on }`

    Cloudflare security header for a zone.

    - `id: "security_header"`

      ID of the zone's security header.

      - `"security_header"`

    - `value: object { strict_transport_security }`

      Current value of the zone setting.

      - `strict_transport_security: optional object { enabled, include_subdomains, max_age, 2 more }`

        Strict Transport Security.

        - `enabled: optional boolean`

          Whether or not strict transport security is enabled.

        - `include_subdomains: optional boolean`

          Include all subdomains for strict transport security.

        - `max_age: optional number`

          Max age in seconds of the strict transport security.

        - `nosniff: optional boolean`

          Whether or not to include 'X-Content-Type-Options: nosniff' header.

        - `preload: optional boolean`

          Enable automatic preload of the HSTS configuration.

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasSecurityLevel object { id, value, editable, modified_on }`

    Choose the appropriate security profile for your website, which will automatically adjust each of the security settings. If you choose to customize an individual security setting, the profile will become Custom. (https://support.cloudflare.com/hc/en-us/articles/200170056).

    - `id: "security_level"`

      ID of the zone setting.

      - `"security_level"`

    - `value: "off" or "essentially_off" or "low" or 3 more`

      Current value of the zone setting.

      - `"off"`

      - `"essentially_off"`

      - `"low"`

      - `"medium"`

      - `"high"`

      - `"under_attack"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ServerSideExcludes object { id, value, editable, modified_on }`

    If there is sensitive content on your website that you want visible to real visitors, but that you want to hide from suspicious visitors, all you have to do is wrap the content with Cloudflare SSE tags. Wrap any content that you want to be excluded from suspicious visitors in the following SSE tags: <!--sse--><!--/sse-->. For example: <!--sse-->  Bad visitors won't see my phone number, 555-555-5555 <!--/sse-->. Note: SSE only will work with HTML. If you have HTML minification enabled, you won't see the SSE tags in your HTML source when it's served through Cloudflare. SSE will still function in this case, as Cloudflare's HTML minification and SSE functionality occur on-the-fly as the resource moves through our network to the visitor's computer. (https://support.cloudflare.com/hc/en-us/articles/200170036).

    - `id: "server_side_exclude"`

      ID of the zone setting.

      - `"server_side_exclude"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSha1Support object { id, value, editable, modified_on }`

    Allow SHA1 support.

    - `id: "sha1_support"`

      Zone setting identifier.

      - `"sha1_support"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasSortQueryStringForCache object { id, value, editable, modified_on }`

    Cloudflare will treat files with the same query strings as the same file in cache, regardless of the order of the query strings. This is limited to Enterprise Zones.

    - `id: "sort_query_string_for_cache"`

      ID of the zone setting.

      - `"sort_query_string_for_cache"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasSSL object { id, value, editable, modified_on }`

    SSL encrypts your visitor's connection and safeguards credit card numbers and other personal data to and from your website. SSL can take up to 5 minutes to fully activate. Requires Cloudflare active on your root domain or www domain. Off: no SSL between the visitor and Cloudflare, and no SSL between Cloudflare and your web server  (all HTTP traffic). Flexible: SSL between the visitor and Cloudflare -- visitor sees HTTPS on your site, but no SSL between Cloudflare and your web server. You don't need to have an SSL cert on your web server, but your vistors will still see the site as being HTTPS enabled. Full:  SSL between the visitor and Cloudflare -- visitor sees HTTPS on your site, and SSL between Cloudflare and your web server. You'll need to have your own SSL cert or self-signed cert at the very least. Full (Strict): SSL between the visitor and Cloudflare -- visitor sees HTTPS on your site, and SSL between Cloudflare and your web server. You'll need to have a valid SSL certificate installed on your web server. This certificate must be signed by a certificate authority, have an expiration date in the future, and respond for the request domain name (hostname). (https://support.cloudflare.com/hc/en-us/articles/200170416).

    - `id: "ssl"`

      ID of the zone setting.

      - `"ssl"`

    - `value: "off" or "flexible" or "full" or "strict"`

      Current value of the zone setting.

      - `"off"`

      - `"flexible"`

      - `"full"`

      - `"strict"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `SSLRecommender object { id, enabled }`

    Enrollment in the SSL/TLS Recommender service which tries to detect and recommend (by sending periodic emails) the most secure SSL/TLS setting your origin servers support.

    - `id: optional "ssl_recommender"`

      Enrollment value for SSL/TLS Recommender.

      - `"ssl_recommender"`

    - `enabled: optional boolean`

      ssl-recommender enrollment setting.

  - `ZonesTLS1_2Only object { id, value, editable, modified_on }`

    Only allows TLS1.2.

    - `id: "tls_1_2_only"`

      Zone setting identifier.

      - `"tls_1_2_only"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `TLS1_3 object { id, value, editable, modified_on }`

    Enables Crypto TLS 1.3 feature for a zone.

    - `id: "tls_1_3"`

      ID of the zone setting.

      - `"tls_1_3"`

    - `value: "on" or "off" or "zrt"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

      - `"zrt"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `TLSClientAuth object { id, value, editable, modified_on }`

    TLS Client Auth requires Cloudflare to connect to your origin server using a client certificate (Enterprise Only).

    - `id: "tls_client_auth"`

      ID of the zone setting.

      - `"tls_client_auth"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasTrueClientIPHeader object { id, value, editable, modified_on }`

    Allows customer to continue to use True Client IP (Akamai feature) in the headers we send to the origin. This is limited to Enterprise Zones.

    - `id: "true_client_ip_header"`

      ID of the zone setting.

      - `"true_client_ip_header"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasWAF object { id, value, editable, modified_on }`

    The WAF examines HTTP requests to your website.  It inspects both GET and POST requests and applies rules to help filter out illegitimate traffic from legitimate website visitors. The Cloudflare WAF inspects website addresses or URLs to detect anything out of the ordinary. If the Cloudflare WAF determines suspicious user behavior, then the WAF will 'challenge' the web visitor with a page that asks them to submit a CAPTCHA successfully  to continue their action. If the challenge is failed, the action will be stopped. What this means is that Cloudflare's WAF will block any traffic identified as illegitimate before it reaches your origin web server. (https://support.cloudflare.com/hc/en-us/articles/200172016).

    - `id: "waf"`

      ID of the zone setting.

      - `"waf"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `WebP object { id, value, editable, modified_on }`

    When the client requesting the image supports the WebP image codec, and WebP offers a performance advantage over the original image format, Cloudflare will serve a WebP version of the original image.

    - `id: "webp"`

      ID of the zone setting.

      - `"webp"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `Websocket object { id, value, editable, modified_on }`

    WebSockets are open connections sustained between the client and the origin server. Inside a WebSockets connection, the client and the origin can pass data back and forth without having to reestablish sessions. This makes exchanging data within a WebSockets connection fast. WebSockets are often used for real-time applications such as live chat and gaming. For more information refer to [Can I use Cloudflare with Websockets](https://support.cloudflare.com/hc/en-us/articles/200169466-Can-I-use-Cloudflare-with-WebSockets-).

    - `id: "websockets"`

      ID of the zone setting.

      - `"websockets"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

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

- `success: boolean`

  Whether the API call was successful

- `result: optional array of ZeroRTT or AdvancedDDoS or object { id, modified_on, value }  or 59 more`

  - `ZeroRTT object { id, value, editable, modified_on }`

    0-RTT session resumption enabled for this zone.

    - `id: "0rtt"`

      ID of the zone setting.

      - `"0rtt"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `AdvancedDDoS object { id, value, editable, modified_on }`

    Advanced protection from Distributed Denial of Service (DDoS) attacks on your website. This is an uneditable value that is 'on' in the case of Business and Enterprise zones.

    - `id: "advanced_ddos"`

      ID of the zone setting.

      - `"advanced_ddos"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesCacheRulesAegis object { id, modified_on, value }`

    Aegis provides dedicated egress IPs (from Cloudflare to your origin) for your layer 7 WAF and CDN services. The egress IPs are reserved exclusively for your account so that you can increase your origin security by only allowing traffic from a small list of IP addresses.

    - `id: "aegis"`

      ID of the zone setting.

      - `"aegis"`

    - `modified_on: optional string`

      Last time this setting was modified.

    - `value: optional object { enabled, pool_id }`

      Value of the zone setting.

      - `enabled: optional boolean`

        Whether the feature is enabled or not.

      - `pool_id: optional string`

        Egress pool id which refers to a grouping of dedicated egress IPs through which Cloudflare will connect to origin.

  - `AlwaysOnline object { id, value, editable, modified_on }`

    When enabled, Cloudflare serves limited copies of web pages available from the [Internet Archive's Wayback Machine](https://archive.org/web/) if your server is offline. Refer to [Always Online](https://developers.cloudflare.com/cache/about/always-online) for more information.

    - `id: "always_online"`

      ID of the zone setting.

      - `"always_online"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasAlwaysUseHTTPS object { id, value, editable, modified_on }`

    Reply to all requests for URLs that use "http" with a 301 redirect to the equivalent "https" URL. If you only want to redirect for a subset of requests, consider creating an "Always use HTTPS" page rule.

    - `id: "always_use_https"`

      ID of the zone setting.

      - `"always_use_https"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasAutomaticHTTPSRewrites object { id, value, editable, modified_on }`

    Enable the Automatic HTTPS Rewrites feature for this zone.

    - `id: "automatic_https_rewrites"`

      ID of the zone setting.

      - `"automatic_https_rewrites"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `Brotli object { id, value, editable, modified_on }`

    When the client requesting an asset supports the Brotli compression algorithm, Cloudflare will serve a Brotli compressed version of the asset.

    - `id: "brotli"`

      ID of the zone setting.

      - `"brotli"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasBrowserCacheTTL object { id, value, editable, modified_on }`

    Browser Cache TTL (in seconds) specifies how long Cloudflare-cached resources will remain on your visitors' computers. Cloudflare will honor any larger times specified by your server. (https://support.cloudflare.com/hc/en-us/articles/200168276).

    - `id: "browser_cache_ttl"`

      ID of the zone setting.

      - `"browser_cache_ttl"`

    - `value: number`

      Current value of the zone setting.

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasBrowserCheck object { id, value, editable, modified_on }`

    Browser Integrity Check is similar to Bad Behavior and looks for common HTTP headers abused most commonly by spammers and denies access to your page.  It will also challenge visitors that do not have a user agent or a non standard user agent (also commonly used by abuse bots, crawlers or visitors). (https://support.cloudflare.com/hc/en-us/articles/200170086).

    - `id: "browser_check"`

      ID of the zone setting.

      - `"browser_check"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasCacheLevel object { id, value, editable, modified_on }`

    Cache Level functions based off the setting level. The basic setting will cache most static resources (i.e., css, images, and JavaScript). The simplified setting will ignore the query string when delivering a cached resource. The aggressive setting will cache all static resources, including ones with a query string. (https://support.cloudflare.com/hc/en-us/articles/200168256).

    - `id: "cache_level"`

      ID of the zone setting.

      - `"cache_level"`

    - `value: "aggressive" or "basic" or "simplified"`

      Current value of the zone setting.

      - `"aggressive"`

      - `"basic"`

      - `"simplified"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ChallengeTTL object { id, value, editable, modified_on }`

    Specify how long a visitor is allowed access to your site after successfully completing a challenge (such as a CAPTCHA). After the TTL has expired the visitor will have to complete a new challenge. We recommend a 15 - 45 minute setting and will attempt to honor any setting above 45 minutes. (https://support.cloudflare.com/hc/en-us/articles/200170136).

    - `id: "challenge_ttl"`

      ID of the zone setting.

      - `"challenge_ttl"`

    - `value: 300 or 900 or 1800 or 11 more`

      Current value of the zone setting.

      - `300`

      - `900`

      - `1800`

      - `2700`

      - `3600`

      - `7200`

      - `10800`

      - `14400`

      - `28800`

      - `57600`

      - `86400`

      - `604800`

      - `2592000`

      - `31536000`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `Ciphers object { id, value, editable, modified_on }`

    An allowlist of ciphers for TLS termination. These ciphers must be in the BoringSSL format.

    - `id: "ciphers"`

      ID of the zone setting.

      - `"ciphers"`

    - `value: array of string`

      Current value of the zone setting.

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesContentConverter object { id, value, editable, modified_on }`

    When enabled and the client sends an Accept header requesting text/markdown,
    Cloudflare will convert HTML responses to Markdown format using the toMarkdown() service.
    Refer to the [developer documentation](https://developers.cloudflare.com/workers-ai/features/markdown-conversion/) for more information.

    - `id: "content_converter"`

      ID of the zone setting.

      - `"content_converter"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesCNAMEFlattening object { id, value, editable, modified_on }`

    Whether or not cname flattening is on.

    - `id: "cname_flattening"`

      How to flatten the cname destination.

      - `"cname_flattening"`

    - `value: "flatten_at_root" or "flatten_all"`

      Current value of the zone setting.

      - `"flatten_at_root"`

      - `"flatten_all"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `DevelopmentMode object { id, value, editable, 2 more }`

    Development Mode temporarily allows you to enter development mode for your websites if you need to make changes to your site. This will bypass Cloudflare's accelerated cache and slow down your site, but is useful if you are making changes to cacheable content (like images, css, or JavaScript) and would like to see those changes right away. Once entered, development mode will last for 3 hours and then automatically toggle off.

    - `id: "development_mode"`

      ID of the zone setting.

      - `"development_mode"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

    - `time_remaining: optional number`

      Value of the zone setting.
      Notes: The interval (in seconds) from when development mode expires (positive integer) or last expired (negative integer) for the domain. If development mode has never been enabled, this value is false.

  - `EarlyHints object { id, value, editable, modified_on }`

    When enabled, Cloudflare will attempt to speed up overall page loads by serving `103` responses with `Link` headers from the final response. Refer to [Early Hints](https://developers.cloudflare.com/cache/about/early-hints) for more information.

    - `id: "early_hints"`

      ID of the zone setting.

      - `"early_hints"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasEdgeCacheTTL object { id, value, editable, modified_on }`

    Time (in seconds) that a resource will be ensured to remain on Cloudflare's cache servers.

    - `id: "edge_cache_ttl"`

      ID of the zone setting.

      - `"edge_cache_ttl"`

    - `value: 30 or 60 or 300 or 18 more`

      Current value of the zone setting.

      - `30`

      - `60`

      - `300`

      - `1200`

      - `1800`

      - `3600`

      - `7200`

      - `10800`

      - `14400`

      - `18000`

      - `28800`

      - `43200`

      - `57600`

      - `72000`

      - `86400`

      - `172800`

      - `259200`

      - `345600`

      - `432000`

      - `518400`

      - `604800`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasEmailObfuscation object { id, value, editable, modified_on }`

    Encrypt email adresses on your web page from bots, while keeping them visible to humans. (https://support.cloudflare.com/hc/en-us/articles/200170016).

    - `id: "email_obfuscation"`

      ID of the zone setting.

      - `"email_obfuscation"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `H2Prioritization object { id, value, editable, modified_on }`

    HTTP/2 Edge Prioritization optimises the delivery of resources served through HTTP/2 to improve page load performance. It also supports fine control of content delivery when used in conjunction with Workers.

    - `id: "h2_prioritization"`

      ID of the zone setting.

      - `"h2_prioritization"`

    - `value: "on" or "off" or "custom"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

      - `"custom"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `HotlinkProtection object { id, value, editable, modified_on }`

    When enabled, the Hotlink Protection option ensures that other sites cannot suck up your bandwidth by building pages that use images hosted on your site. Anytime a request for an image on your site hits Cloudflare, we check to ensure that it's not another site requesting them. People will still be able to download and view images from your page, but other sites won't be able to steal them for use on their own pages. (https://support.cloudflare.com/hc/en-us/articles/200170026).

    - `id: "hotlink_protection"`

      ID of the zone setting.

      - `"hotlink_protection"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `HTTP2 object { id, value, editable, modified_on }`

    HTTP2 enabled for this zone.

    - `id: "http2"`

      ID of the zone setting.

      - `"http2"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `HTTP3 object { id, value, editable, modified_on }`

    HTTP3 enabled for this zone.

    - `id: "http3"`

      ID of the zone setting.

      - `"http3"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ImageResizing object { id, value, editable, modified_on }`

    Image Transformations provides on-demand resizing, conversion and optimization for images served through Cloudflare's network. Refer to the [Image Transformations documentation](https://developers.cloudflare.com/images/) for more information.

    - `id: "image_resizing"`

      ID of the zone setting.

      - `"image_resizing"`

    - `value: "on" or "off" or "open"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

      - `"open"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasIPGeolocation object { id, value, editable, modified_on }`

    Enable IP Geolocation to have Cloudflare geolocate visitors to your website and pass the country code to you. (https://support.cloudflare.com/hc/en-us/articles/200168236).

    - `id: "ip_geolocation"`

      ID of the zone setting.

      - `"ip_geolocation"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `IPV6 object { id, value, editable, modified_on }`

    Enable IPv6 on all subdomains that are Cloudflare enabled.  (https://support.cloudflare.com/hc/en-us/articles/200168586).

    - `id: "ipv6"`

      ID of the zone setting.

      - `"ipv6"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesMaxUpload object { id, value, editable, modified_on }`

    Maximum size of an allowable upload.

    - `id: "max_upload"`

      identifier of the zone setting.

      - `"max_upload"`

    - `value: 100 or 125 or 150 or 15 more`

      Current value of the zone setting.

      - `100`

      - `125`

      - `150`

      - `175`

      - `200`

      - `225`

      - `250`

      - `275`

      - `300`

      - `325`

      - `350`

      - `375`

      - `400`

      - `425`

      - `450`

      - `475`

      - `500`

      - `1000`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `MinTLSVersion object { id, value, editable, modified_on }`

    Only accepts HTTPS requests that use at least the TLS protocol version specified. For example, if TLS 1.1 is selected, TLS 1.0 connections will be rejected, while 1.1, 1.2, and 1.3 (if enabled) will be permitted.

    - `id: "min_tls_version"`

      ID of the zone setting.

      - `"min_tls_version"`

    - `value: "1.0" or "1.1" or "1.2" or "1.3"`

      Current value of the zone setting.

      - `"1.0"`

      - `"1.1"`

      - `"1.2"`

      - `"1.3"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasMirage object { id, value, editable, modified_on }`

    Automatically optimize image loading for website visitors on mobile
    devices. Refer to [our blog post](http://blog.cloudflare.com/mirage2-solving-mobile-speed)
    for more information.

    - `id: "mirage"`

      ID of the zone setting.

      - `"mirage"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `NEL object { id, value, editable, modified_on }`

    Enable Network Error Logging reporting on your zone. (Beta)

    - `id: "nel"`

      Zone setting identifier.

      - `"nel"`

    - `value: object { enabled }`

      Current value of the zone setting.

      - `enabled: optional boolean`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasOpportunisticEncryption object { id, value, editable, modified_on }`

    Enables the Opportunistic Encryption feature for a zone.

    - `id: "opportunistic_encryption"`

      ID of the zone setting.

      - `"opportunistic_encryption"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `OpportunisticOnion object { id, value, editable, modified_on }`

    Add an Alt-Svc header to all legitimate requests from Tor, allowing the connection to use our onion services instead of exit nodes.

    - `id: "opportunistic_onion"`

      ID of the zone setting.

      - `"opportunistic_onion"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `OrangeToOrange object { id, value, editable, modified_on }`

    Orange to Orange (O2O) allows zones on Cloudflare to CNAME to other zones also on Cloudflare.

    - `id: "orange_to_orange"`

      ID of the zone setting.

      - `"orange_to_orange"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasOriginErrorPagePassThru object { id, value, editable, modified_on }`

    Cloudflare will proxy customer error pages on any 502,504 errors on origin server instead of showing a default Cloudflare error page. This does not apply to 522 errors and is limited to Enterprise Zones.

    - `id: "origin_error_page_pass_thru"`

      ID of the zone setting.

      - `"origin_error_page_pass_thru"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesCacheRulesOriginH2MaxStreams object { id, modified_on, value }`

    Origin H2 Max Streams configures the max number of concurrent requests that Cloudflare will send within the same connection when communicating with the origin server, if the origin supports it. Note that if your origin does not support H2 multiplexing, 5xx errors may be observed, particularly 520s. Also note that the default value is `100` for all plan types except Enterprise where it is `1`. `1` means that H2 multiplexing is disabled.

    - `id: "origin_h2_max_streams"`

      Value of the zone setting.

      - `"origin_h2_max_streams"`

    - `modified_on: optional string`

      Last time this setting was modified.

    - `value: optional number`

      Value of the Origin H2 Max Streams Setting.

  - `ZonesCacheRulesOriginMaxHTTPVersion object { id, modified_on, value }`

    Origin Max HTTP Setting Version sets the highest HTTP version Cloudflare will attempt to use with your origin. This setting allows Cloudflare to make HTTP/2 requests to your origin. (Refer to [Enable HTTP/2 to Origin](https://developers.cloudflare.com/cache/how-to/enable-http2-to-origin/), for more information.). The default value is "2" for all plan types except Enterprise where it is "1".

    - `id: "origin_max_http_version"`

      Value of the zone setting.

      - `"origin_max_http_version"`

    - `modified_on: optional string`

      Last time this setting was modified.

    - `value: optional "2" or "1"`

      Value of the Origin Max HTTP Version Setting.

      - `"2"`

      - `"1"`

  - `ZonesSchemasPolish object { id, value, editable, modified_on }`

    Removes metadata and compresses your images for faster page load times. Basic (Lossless): Reduce the size of PNG, JPEG, and GIF files - no impact on visual quality. Basic + JPEG (Lossy): Further reduce the size of JPEG files for faster image loading. Larger JPEGs are converted to progressive images, loading a lower-resolution image first and ending in a higher-resolution version. Not recommended for hi-res photography sites.

    - `id: "polish"`

      ID of the zone setting.

      - `"polish"`

    - `value: "off" or "lossless" or "lossy"`

      Current value of the zone setting.

      - `"off"`

      - `"lossless"`

      - `"lossy"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `PrefetchPreload object { id, value, editable, modified_on }`

    Cloudflare will prefetch any URLs that are included in the response headers. This is limited to Enterprise Zones.

    - `id: "prefetch_preload"`

      ID of the zone setting.

      - `"prefetch_preload"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesPrivacyPass object { id, value, editable, modified_on }`

    Privacy Pass v1 was a browser extension developed by the Privacy Pass Team to improve the browsing experience for your visitors by allowing users to reduce the number of CAPTCHAs shown. (https://support.cloudflare.com/hc/en-us/articles/115001992652-Privacy-Pass).

    - `id: "privacy_pass"`

      ID of the zone setting.

      - `"privacy_pass"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ProxyReadTimeout object { id, value, editable, modified_on }`

    Maximum time between two read operations from origin.

    - `id: "proxy_read_timeout"`

      ID of the zone setting.

      - `"proxy_read_timeout"`

    - `value: number`

      Current value of the zone setting.

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `PseudoIPV4 object { id, value, editable, modified_on }`

    The value set for the Pseudo IPv4 setting.

    - `id: "pseudo_ipv4"`

      Value of the Pseudo IPv4 setting.

      - `"pseudo_ipv4"`

    - `value: "off" or "add_header" or "overwrite_header"`

      Current value of the zone setting.

      - `"off"`

      - `"add_header"`

      - `"overwrite_header"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesRedirectsForAITraining object { id, value, editable, modified_on }`

    When enabled, Cloudflare will redirect verified AI training crawlers to canonical URLs
    found in the HTML response, ensuring AI models train on authoritative content.

    - `id: "redirects_for_ai_training"`

      ID of the zone setting.

      - `"redirects_for_ai_training"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesReplaceInsecureJS object { id, value, editable, modified_on }`

    Automatically replace insecure JavaScript libraries with safer and faster alternatives provided under cdnjs and powered by Cloudflare. Currently supports the following libraries: Polyfill under polyfill.io.

    - `id: "replace_insecure_js"`

      ID of the zone setting.

      - `"replace_insecure_js"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasResponseBuffering object { id, value, editable, modified_on }`

    Enables or disables buffering of responses from the proxied server. Cloudflare may buffer the whole payload to deliver it at once to the client versus allowing it to be delivered in chunks. By default, the proxied server streams directly and is not buffered by Cloudflare. This is limited to Enterprise Zones.

    - `id: "response_buffering"`

      ID of the zone setting.

      - `"response_buffering"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasRocketLoader object { id, value, editable, modified_on }`

    Rocket Loader is a general-purpose asynchronous JavaScript optimisation that prioritises rendering your content while loading your site's Javascript asynchronously. Turning on Rocket Loader will immediately improve a web page's rendering time sometimes measured as Time to First Paint (TTFP), and also the `window.onload` time (assuming there is JavaScript on the page). This can have a positive impact on your Google search ranking. When turned on, Rocket Loader will automatically defer the loading of all Javascript referenced in your HTML, with no configuration required. Refer to [Understanding Rocket Loader](https://support.cloudflare.com/hc/articles/200168056) for more information.

    - `id: "rocket_loader"`

      ID of the zone setting.

      - `"rocket_loader"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasAutomaticPlatformOptimization object { id, value, editable, modified_on }`

    [Automatic Platform Optimization for WordPress](https://developers.cloudflare.com/automatic-platform-optimization/) serves your WordPress site from Cloudflare's edge network and caches third-party fonts.

    - `id: "automatic_platform_optimization"`

      ID of the zone setting.

      - `"automatic_platform_optimization"`

    - `value: AutomaticPlatformOptimization`

      Current value of the zone setting.

      - `cache_by_device_type: boolean`

        Indicates whether or not [cache by device type](https://developers.cloudflare.com/automatic-platform-optimization/reference/cache-device-type/) is enabled.

      - `cf: boolean`

        Indicates whether or not Cloudflare proxy is enabled.

      - `enabled: boolean`

        Indicates whether or not Automatic Platform Optimization is enabled.

      - `hostnames: array of string`

        An array of hostnames where Automatic Platform Optimization for WordPress is activated.

      - `wordpress: boolean`

        Indicates whether or not site is powered by WordPress.

      - `wp_plugin: boolean`

        Indicates whether or not [Cloudflare for WordPress plugin](https://wordpress.org/plugins/cloudflare/) is installed.

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSearchForAgents object { id, value, editable, modified_on }`

    When enabled, Cloudflare provisions an AI Search instance for the zone
    and exposes a /.well-known/ai-search endpoint that AI agents can query.
    Markdown responses also receive an agent: YAML capability block advertising
    the search endpoint.

    - `id: "search_for_agents"`

      ID of the zone setting.

      - `"search_for_agents"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `SecurityHeaders object { id, value, editable, modified_on }`

    Cloudflare security header for a zone.

    - `id: "security_header"`

      ID of the zone's security header.

      - `"security_header"`

    - `value: object { strict_transport_security }`

      Current value of the zone setting.

      - `strict_transport_security: optional object { enabled, include_subdomains, max_age, 2 more }`

        Strict Transport Security.

        - `enabled: optional boolean`

          Whether or not strict transport security is enabled.

        - `include_subdomains: optional boolean`

          Include all subdomains for strict transport security.

        - `max_age: optional number`

          Max age in seconds of the strict transport security.

        - `nosniff: optional boolean`

          Whether or not to include 'X-Content-Type-Options: nosniff' header.

        - `preload: optional boolean`

          Enable automatic preload of the HSTS configuration.

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasSecurityLevel object { id, value, editable, modified_on }`

    Choose the appropriate security profile for your website, which will automatically adjust each of the security settings. If you choose to customize an individual security setting, the profile will become Custom. (https://support.cloudflare.com/hc/en-us/articles/200170056).

    - `id: "security_level"`

      ID of the zone setting.

      - `"security_level"`

    - `value: "off" or "essentially_off" or "low" or 3 more`

      Current value of the zone setting.

      - `"off"`

      - `"essentially_off"`

      - `"low"`

      - `"medium"`

      - `"high"`

      - `"under_attack"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ServerSideExcludes object { id, value, editable, modified_on }`

    If there is sensitive content on your website that you want visible to real visitors, but that you want to hide from suspicious visitors, all you have to do is wrap the content with Cloudflare SSE tags. Wrap any content that you want to be excluded from suspicious visitors in the following SSE tags: <!--sse--><!--/sse-->. For example: <!--sse-->  Bad visitors won't see my phone number, 555-555-5555 <!--/sse-->. Note: SSE only will work with HTML. If you have HTML minification enabled, you won't see the SSE tags in your HTML source when it's served through Cloudflare. SSE will still function in this case, as Cloudflare's HTML minification and SSE functionality occur on-the-fly as the resource moves through our network to the visitor's computer. (https://support.cloudflare.com/hc/en-us/articles/200170036).

    - `id: "server_side_exclude"`

      ID of the zone setting.

      - `"server_side_exclude"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSha1Support object { id, value, editable, modified_on }`

    Allow SHA1 support.

    - `id: "sha1_support"`

      Zone setting identifier.

      - `"sha1_support"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasSortQueryStringForCache object { id, value, editable, modified_on }`

    Cloudflare will treat files with the same query strings as the same file in cache, regardless of the order of the query strings. This is limited to Enterprise Zones.

    - `id: "sort_query_string_for_cache"`

      ID of the zone setting.

      - `"sort_query_string_for_cache"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasSSL object { id, value, editable, modified_on }`

    SSL encrypts your visitor's connection and safeguards credit card numbers and other personal data to and from your website. SSL can take up to 5 minutes to fully activate. Requires Cloudflare active on your root domain or www domain. Off: no SSL between the visitor and Cloudflare, and no SSL between Cloudflare and your web server  (all HTTP traffic). Flexible: SSL between the visitor and Cloudflare -- visitor sees HTTPS on your site, but no SSL between Cloudflare and your web server. You don't need to have an SSL cert on your web server, but your vistors will still see the site as being HTTPS enabled. Full:  SSL between the visitor and Cloudflare -- visitor sees HTTPS on your site, and SSL between Cloudflare and your web server. You'll need to have your own SSL cert or self-signed cert at the very least. Full (Strict): SSL between the visitor and Cloudflare -- visitor sees HTTPS on your site, and SSL between Cloudflare and your web server. You'll need to have a valid SSL certificate installed on your web server. This certificate must be signed by a certificate authority, have an expiration date in the future, and respond for the request domain name (hostname). (https://support.cloudflare.com/hc/en-us/articles/200170416).

    - `id: "ssl"`

      ID of the zone setting.

      - `"ssl"`

    - `value: "off" or "flexible" or "full" or "strict"`

      Current value of the zone setting.

      - `"off"`

      - `"flexible"`

      - `"full"`

      - `"strict"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `SSLRecommender object { id, enabled }`

    Enrollment in the SSL/TLS Recommender service which tries to detect and recommend (by sending periodic emails) the most secure SSL/TLS setting your origin servers support.

    - `id: optional "ssl_recommender"`

      Enrollment value for SSL/TLS Recommender.

      - `"ssl_recommender"`

    - `enabled: optional boolean`

      ssl-recommender enrollment setting.

  - `ZonesTLS1_2Only object { id, value, editable, modified_on }`

    Only allows TLS1.2.

    - `id: "tls_1_2_only"`

      Zone setting identifier.

      - `"tls_1_2_only"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `TLS1_3 object { id, value, editable, modified_on }`

    Enables Crypto TLS 1.3 feature for a zone.

    - `id: "tls_1_3"`

      ID of the zone setting.

      - `"tls_1_3"`

    - `value: "on" or "off" or "zrt"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

      - `"zrt"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `TLSClientAuth object { id, value, editable, modified_on }`

    TLS Client Auth requires Cloudflare to connect to your origin server using a client certificate (Enterprise Only).

    - `id: "tls_client_auth"`

      ID of the zone setting.

      - `"tls_client_auth"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesTransformations object { id, value, editable, modified_on }`

    Media Transformations provides on-demand resizing, conversion and optimization for images and video served through Cloudflare's network. Refer to the [Image Transformations](https://developers.cloudflare.com/images/) and [Video Transformations](https://developers.cloudflare.com/stream/transform-videos/#getting-started) documentation for more information.

    - `id: "transformations"`

      ID of the zone setting. Shared between Image Transformations and Video Transformations.

      - `"transformations"`

    - `value: "on" or "off" or "open"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

      - `"open"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesTransformationsAllowedOrigins object { id, value, editable, modified_on }`

    Media Transformations Allowed Origins restricts transformations for images and video served through Cloudflare's network. Refer to the [Image Transformations](https://developers.cloudflare.com/images/) and [Video Transformations](https://developers.cloudflare.com/stream/transform-videos/#getting-started) documentation for more information.

    - `id: "transformations_allowed_origins"`

      ID of the zone setting. Shared between Image Transformations and Video Transformations.

      - `"transformations_allowed_origins"`

    - `value: string`

      Current value of the zone setting.

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasTrueClientIPHeader object { id, value, editable, modified_on }`

    Allows customer to continue to use True Client IP (Akamai feature) in the headers we send to the origin. This is limited to Enterprise Zones.

    - `id: "true_client_ip_header"`

      ID of the zone setting.

      - `"true_client_ip_header"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasWAF object { id, value, editable, modified_on }`

    The WAF examines HTTP requests to your website.  It inspects both GET and POST requests and applies rules to help filter out illegitimate traffic from legitimate website visitors. The Cloudflare WAF inspects website addresses or URLs to detect anything out of the ordinary. If the Cloudflare WAF determines suspicious user behavior, then the WAF will 'challenge' the web visitor with a page that asks them to submit a CAPTCHA successfully  to continue their action. If the challenge is failed, the action will be stopped. What this means is that Cloudflare's WAF will block any traffic identified as illegitimate before it reaches your origin web server. (https://support.cloudflare.com/hc/en-us/articles/200172016).

    - `id: "waf"`

      ID of the zone setting.

      - `"waf"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `WebP object { id, value, editable, modified_on }`

    When the client requesting the image supports the WebP image codec, and WebP offers a performance advantage over the original image format, Cloudflare will serve a WebP version of the original image.

    - `id: "webp"`

      ID of the zone setting.

      - `"webp"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `Websocket object { id, value, editable, modified_on }`

    WebSockets are open connections sustained between the client and the origin server. Inside a WebSockets connection, the client and the origin can pass data back and forth without having to reestablish sessions. This makes exchanging data within a WebSockets connection fast. WebSockets are often used for real-time applications such as live chat and gaming. For more information refer to [Can I use Cloudflare with Websockets](https://support.cloudflare.com/hc/en-us/articles/200169466-Can-I-use-Cloudflare-with-WebSockets-).

    - `id: "websockets"`

      ID of the zone setting.

      - `"websockets"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/settings \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '[
          {
            "id": "0rtt",
            "value": "on"
          }
        ]'
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
      "id": "0rtt",
      "value": "on",
      "editable": true,
      "modified_on": "2014-01-01T05:20:00.12345Z"
    }
  ]
}
```

## Domain Types

### Advanced DDoS

- `AdvancedDDoS object { id, value, editable, modified_on }`

  Advanced protection from Distributed Denial of Service (DDoS) attacks on your website. This is an uneditable value that is 'on' in the case of Business and Enterprise zones.

  - `id: "advanced_ddos"`

    ID of the zone setting.

    - `"advanced_ddos"`

  - `value: "on" or "off"`

    Current value of the zone setting.

    - `"on"`

    - `"off"`

  - `editable: optional true or false`

    Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

    - `true`

    - `false`

  - `modified_on: optional string`

    last time this setting was modified.

### Aegis

- `Aegis object { id, modified_on, value }`

  Aegis provides dedicated egress IPs (from Cloudflare to your origin) for your layer 7 WAF and CDN services. The egress IPs are reserved exclusively for your account so that you can increase your origin security by only allowing traffic from a small list of IP addresses.

  - `id: "aegis"`

    ID of the zone setting.

    - `"aegis"`

  - `modified_on: optional string`

    Last time this setting was modified.

  - `value: optional object { enabled, pool_id }`

    Value of the zone setting.

    - `enabled: optional boolean`

      Whether the feature is enabled or not.

    - `pool_id: optional string`

      Egress pool id which refers to a grouping of dedicated egress IPs through which Cloudflare will connect to origin.

### Always Online

- `AlwaysOnline object { id, value, editable, modified_on }`

  When enabled, Cloudflare serves limited copies of web pages available from the [Internet Archive's Wayback Machine](https://archive.org/web/) if your server is offline. Refer to [Always Online](https://developers.cloudflare.com/cache/about/always-online) for more information.

  - `id: "always_online"`

    ID of the zone setting.

    - `"always_online"`

  - `value: "on" or "off"`

    Current value of the zone setting.

    - `"on"`

    - `"off"`

  - `editable: optional true or false`

    Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

    - `true`

    - `false`

  - `modified_on: optional string`

    last time this setting was modified.

### Always Use HTTPS

- `AlwaysUseHTTPS object { id }`

  - `id: optional "always_use_https"`

    If enabled, any `http://`` URL is converted to`https://` through a
    301 redirect.

    - `"always_use_https"`

### Automatic HTTPS Rewrites

- `AutomaticHTTPSRewrites object { id, value }`

  - `id: optional "automatic_https_rewrites"`

    Turn on or off Automatic HTTPS Rewrites.

    - `"automatic_https_rewrites"`

  - `value: optional "on" or "off"`

    The status of Automatic HTTPS Rewrites.

    - `"on"`

    - `"off"`

### Automatic Platform Optimization

- `AutomaticPlatformOptimization object { cache_by_device_type, cf, enabled, 3 more }`

  - `cache_by_device_type: boolean`

    Indicates whether or not [cache by device type](https://developers.cloudflare.com/automatic-platform-optimization/reference/cache-device-type/) is enabled.

  - `cf: boolean`

    Indicates whether or not Cloudflare proxy is enabled.

  - `enabled: boolean`

    Indicates whether or not Automatic Platform Optimization is enabled.

  - `hostnames: array of string`

    An array of hostnames where Automatic Platform Optimization for WordPress is activated.

  - `wordpress: boolean`

    Indicates whether or not site is powered by WordPress.

  - `wp_plugin: boolean`

    Indicates whether or not [Cloudflare for WordPress plugin](https://wordpress.org/plugins/cloudflare/) is installed.

### Brotli

- `Brotli object { id, value, editable, modified_on }`

  When the client requesting an asset supports the Brotli compression algorithm, Cloudflare will serve a Brotli compressed version of the asset.

  - `id: "brotli"`

    ID of the zone setting.

    - `"brotli"`

  - `value: "off" or "on"`

    Current value of the zone setting.

    - `"off"`

    - `"on"`

  - `editable: optional true or false`

    Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

    - `true`

    - `false`

  - `modified_on: optional string`

    last time this setting was modified.

### Browser Cache TTL

- `BrowserCacheTTL object { id, value }`

  - `id: optional "browser_cache_ttl"`

    Control how long resources cached by client browsers remain valid.

    - `"browser_cache_ttl"`

  - `value: optional number`

    The number of seconds to cache resources for.
    Setting this to 0 enables "Respect Existing Headers".

### Browser Check

- `BrowserCheck object { id, value }`

  - `id: optional "browser_check"`

    Inspect the visitor's browser for headers commonly associated with
    spammers and certain bots.

    - `"browser_check"`

  - `value: optional "on" or "off"`

    The status of Browser Integrity Check.

    - `"on"`

    - `"off"`

### Cache Level

- `CacheLevel object { id, value }`

  - `id: optional "cache_level"`

    Apply custom caching based on the option selected.

    - `"cache_level"`

  - `value: optional "bypass" or "basic" or "simplified" or 2 more`

    * `bypass`: Cloudflare does not cache.
    * `basic`: Delivers resources from cache when there is no query
      string.
    * `simplified`: Delivers the same resource to everyone independent
      of the query string.
    * `aggressive`: Caches all static content that has a query string.
    * `cache_everything`: Treats all content as static and caches all
      file types beyond the [Cloudflare default cached
      content](https://developers.cloudflare.com/cache/concepts/default-cache-behavior/#default-cached-file-extensions).

    - `"bypass"`

    - `"basic"`

    - `"simplified"`

    - `"aggressive"`

    - `"cache_everything"`

### Challenge TTL

- `ChallengeTTL object { id, value, editable, modified_on }`

  Specify how long a visitor is allowed access to your site after successfully completing a challenge (such as a CAPTCHA). After the TTL has expired the visitor will have to complete a new challenge. We recommend a 15 - 45 minute setting and will attempt to honor any setting above 45 minutes. (https://support.cloudflare.com/hc/en-us/articles/200170136).

  - `id: "challenge_ttl"`

    ID of the zone setting.

    - `"challenge_ttl"`

  - `value: 300 or 900 or 1800 or 11 more`

    Current value of the zone setting.

    - `300`

    - `900`

    - `1800`

    - `2700`

    - `3600`

    - `7200`

    - `10800`

    - `14400`

    - `28800`

    - `57600`

    - `86400`

    - `604800`

    - `2592000`

    - `31536000`

  - `editable: optional true or false`

    Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

    - `true`

    - `false`

  - `modified_on: optional string`

    last time this setting was modified.

### Ciphers

- `Ciphers object { id, value, editable, modified_on }`

  An allowlist of ciphers for TLS termination. These ciphers must be in the BoringSSL format.

  - `id: "ciphers"`

    ID of the zone setting.

    - `"ciphers"`

  - `value: array of string`

    Current value of the zone setting.

  - `editable: optional true or false`

    Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

    - `true`

    - `false`

  - `modified_on: optional string`

    last time this setting was modified.

### Development Mode

- `DevelopmentMode object { id, value, editable, 2 more }`

  Development Mode temporarily allows you to enter development mode for your websites if you need to make changes to your site. This will bypass Cloudflare's accelerated cache and slow down your site, but is useful if you are making changes to cacheable content (like images, css, or JavaScript) and would like to see those changes right away. Once entered, development mode will last for 3 hours and then automatically toggle off.

  - `id: "development_mode"`

    ID of the zone setting.

    - `"development_mode"`

  - `value: "on" or "off"`

    Current value of the zone setting.

    - `"on"`

    - `"off"`

  - `editable: optional true or false`

    Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

    - `true`

    - `false`

  - `modified_on: optional string`

    last time this setting was modified.

  - `time_remaining: optional number`

    Value of the zone setting.
    Notes: The interval (in seconds) from when development mode expires (positive integer) or last expired (negative integer) for the domain. If development mode has never been enabled, this value is false.

### Early Hints

- `EarlyHints object { id, value, editable, modified_on }`

  When enabled, Cloudflare will attempt to speed up overall page loads by serving `103` responses with `Link` headers from the final response. Refer to [Early Hints](https://developers.cloudflare.com/cache/about/early-hints) for more information.

  - `id: "early_hints"`

    ID of the zone setting.

    - `"early_hints"`

  - `value: "on" or "off"`

    Current value of the zone setting.

    - `"on"`

    - `"off"`

  - `editable: optional true or false`

    Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

    - `true`

    - `false`

  - `modified_on: optional string`

    last time this setting was modified.

### Email Obfuscation

- `EmailObfuscation object { id, value }`

  - `id: optional "email_obfuscation"`

    Turn on or off **Email Obfuscation**.

    - `"email_obfuscation"`

  - `value: optional "on" or "off"`

    The status of Email Obfuscation.

    - `"on"`

    - `"off"`

### Font Settings

- `FontSettings object { id, editable, modified_on, value }`

  Enhance your website's font delivery with Cloudflare Fonts. Deliver Google Hosted fonts from your own domain,
  boost performance, and enhance user privacy. Refer to the Cloudflare Fonts documentation for more information.

  - `id: optional "fonts"`

    ID of the zone setting.

    - `"fonts"`

  - `editable: optional true or false`

    Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

    - `true`

    - `false`

  - `modified_on: optional string`

    last time this setting was modified.

  - `value: optional "on" or "off"`

    Current value of the zone setting.

    - `"on"`

    - `"off"`

### H2 Prioritization

- `H2Prioritization object { id, value, editable, modified_on }`

  HTTP/2 Edge Prioritization optimises the delivery of resources served through HTTP/2 to improve page load performance. It also supports fine control of content delivery when used in conjunction with Workers.

  - `id: "h2_prioritization"`

    ID of the zone setting.

    - `"h2_prioritization"`

  - `value: "on" or "off" or "custom"`

    Current value of the zone setting.

    - `"on"`

    - `"off"`

    - `"custom"`

  - `editable: optional true or false`

    Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

    - `true`

    - `false`

  - `modified_on: optional string`

    last time this setting was modified.

### Hotlink Protection

- `HotlinkProtection object { id, value, editable, modified_on }`

  When enabled, the Hotlink Protection option ensures that other sites cannot suck up your bandwidth by building pages that use images hosted on your site. Anytime a request for an image on your site hits Cloudflare, we check to ensure that it's not another site requesting them. People will still be able to download and view images from your page, but other sites won't be able to steal them for use on their own pages. (https://support.cloudflare.com/hc/en-us/articles/200170026).

  - `id: "hotlink_protection"`

    ID of the zone setting.

    - `"hotlink_protection"`

  - `value: "on" or "off"`

    Current value of the zone setting.

    - `"on"`

    - `"off"`

  - `editable: optional true or false`

    Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

    - `true`

    - `false`

  - `modified_on: optional string`

    last time this setting was modified.

### HTTP2

- `HTTP2 object { id, value, editable, modified_on }`

  HTTP2 enabled for this zone.

  - `id: "http2"`

    ID of the zone setting.

    - `"http2"`

  - `value: "on" or "off"`

    Current value of the zone setting.

    - `"on"`

    - `"off"`

  - `editable: optional true or false`

    Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

    - `true`

    - `false`

  - `modified_on: optional string`

    last time this setting was modified.

### HTTP3

- `HTTP3 object { id, value, editable, modified_on }`

  HTTP3 enabled for this zone.

  - `id: "http3"`

    ID of the zone setting.

    - `"http3"`

  - `value: "on" or "off"`

    Current value of the zone setting.

    - `"on"`

    - `"off"`

  - `editable: optional true or false`

    Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

    - `true`

    - `false`

  - `modified_on: optional string`

    last time this setting was modified.

### Image Resizing

- `ImageResizing object { id, value, editable, modified_on }`

  Image Transformations provides on-demand resizing, conversion and optimization for images served through Cloudflare's network. Refer to the [Image Transformations documentation](https://developers.cloudflare.com/images/) for more information.

  - `id: "image_resizing"`

    ID of the zone setting.

    - `"image_resizing"`

  - `value: "on" or "off" or "open"`

    Current value of the zone setting.

    - `"on"`

    - `"off"`

    - `"open"`

  - `editable: optional true or false`

    Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

    - `true`

    - `false`

  - `modified_on: optional string`

    last time this setting was modified.

### IP Geolocation

- `IPGeolocation object { id, value }`

  - `id: optional "ip_geolocation"`

    Cloudflare adds a CF-IPCountry HTTP header containing the country code that corresponds to the visitor.

    - `"ip_geolocation"`

  - `value: optional "on" or "off"`

    The status of adding the IP Geolocation Header.

    - `"on"`

    - `"off"`

### IPV6

- `IPV6 object { id, value, editable, modified_on }`

  Enable IPv6 on all subdomains that are Cloudflare enabled.  (https://support.cloudflare.com/hc/en-us/articles/200168586).

  - `id: "ipv6"`

    ID of the zone setting.

    - `"ipv6"`

  - `value: "off" or "on"`

    Current value of the zone setting.

    - `"off"`

    - `"on"`

  - `editable: optional true or false`

    Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

    - `true`

    - `false`

  - `modified_on: optional string`

    last time this setting was modified.

### Min TLS Version

- `MinTLSVersion object { id, value, editable, modified_on }`

  Only accepts HTTPS requests that use at least the TLS protocol version specified. For example, if TLS 1.1 is selected, TLS 1.0 connections will be rejected, while 1.1, 1.2, and 1.3 (if enabled) will be permitted.

  - `id: "min_tls_version"`

    ID of the zone setting.

    - `"min_tls_version"`

  - `value: "1.0" or "1.1" or "1.2" or "1.3"`

    Current value of the zone setting.

    - `"1.0"`

    - `"1.1"`

    - `"1.2"`

    - `"1.3"`

  - `editable: optional true or false`

    Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

    - `true`

    - `false`

  - `modified_on: optional string`

    last time this setting was modified.

### Mirage

- `Mirage object { id, value }`

  - `id: optional "mirage"`

    Cloudflare Mirage reduces bandwidth used by images in mobile browsers.
    It can accelerate loading of image-heavy websites on very slow mobile connections and HTTP/1.

    - `"mirage"`

  - `value: optional "on" or "off"`

    The status of Mirage.

    - `"on"`

    - `"off"`

### NEL

- `NEL object { id, value, editable, modified_on }`

  Enable Network Error Logging reporting on your zone. (Beta)

  - `id: "nel"`

    Zone setting identifier.

    - `"nel"`

  - `value: object { enabled }`

    Current value of the zone setting.

    - `enabled: optional boolean`

  - `editable: optional true or false`

    Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

    - `true`

    - `false`

  - `modified_on: optional string`

    last time this setting was modified.

### Opportunistic Encryption

- `OpportunisticEncryption object { id, value }`

  - `id: optional "opportunistic_encryption"`

    Opportunistic Encryption allows browsers to access HTTP URIs over an encrypted TLS channel.
    It's not a substitute for HTTPS, but provides additional security for otherwise vulnerable requests.

    - `"opportunistic_encryption"`

  - `value: optional "on" or "off"`

    The status of Opportunistic Encryption.

    - `"on"`

    - `"off"`

### Opportunistic Onion

- `OpportunisticOnion object { id, value, editable, modified_on }`

  Add an Alt-Svc header to all legitimate requests from Tor, allowing the connection to use our onion services instead of exit nodes.

  - `id: "opportunistic_onion"`

    ID of the zone setting.

    - `"opportunistic_onion"`

  - `value: "on" or "off"`

    Current value of the zone setting.

    - `"on"`

    - `"off"`

  - `editable: optional true or false`

    Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

    - `true`

    - `false`

  - `modified_on: optional string`

    last time this setting was modified.

### Orange To Orange

- `OrangeToOrange object { id, value, editable, modified_on }`

  Orange to Orange (O2O) allows zones on Cloudflare to CNAME to other zones also on Cloudflare.

  - `id: "orange_to_orange"`

    ID of the zone setting.

    - `"orange_to_orange"`

  - `value: "on" or "off"`

    Current value of the zone setting.

    - `"on"`

    - `"off"`

  - `editable: optional true or false`

    Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

    - `true`

    - `false`

  - `modified_on: optional string`

    last time this setting was modified.

### Origin Error Page Pass Thru

- `OriginErrorPagePassThru object { id, value }`

  - `id: optional "origin_error_page_pass_thru"`

    Turn on or off Cloudflare error pages generated from issues sent from the origin server. If enabled, this setting triggers error pages issued by the origin.

    - `"origin_error_page_pass_thru"`

  - `value: optional "on" or "off"`

    The status of Origin Error Page Passthru.

    - `"on"`

    - `"off"`

### Origin Max HTTP Version

- `OriginMaxHTTPVersion object { id, editable, value, modified_on }`

  - `id: "origin_max_http_version"`

    The identifier of the caching setting.

    - `"origin_max_http_version"`

  - `editable: boolean`

    Whether the setting is editable.

  - `value: "2" or "1"`

    Value of the Origin Max HTTP Version Setting.

    - `"2"`

    - `"1"`

  - `modified_on: optional string`

    Last time this setting was modified.

### Polish

- `Polish object { id, value }`

  - `id: optional "polish"`

    Apply options from the Polish feature of the Cloudflare Speed app.

    - `"polish"`

  - `value: optional "off" or "lossless" or "lossy"`

    The level of Polish you want applied to your origin.

    - `"off"`

    - `"lossless"`

    - `"lossy"`

### Prefetch Preload

- `PrefetchPreload object { id, value, editable, modified_on }`

  Cloudflare will prefetch any URLs that are included in the response headers. This is limited to Enterprise Zones.

  - `id: "prefetch_preload"`

    ID of the zone setting.

    - `"prefetch_preload"`

  - `value: "on" or "off"`

    Current value of the zone setting.

    - `"on"`

    - `"off"`

  - `editable: optional true or false`

    Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

    - `true`

    - `false`

  - `modified_on: optional string`

    last time this setting was modified.

### Proxy Read Timeout

- `ProxyReadTimeout object { id, value, editable, modified_on }`

  Maximum time between two read operations from origin.

  - `id: "proxy_read_timeout"`

    ID of the zone setting.

    - `"proxy_read_timeout"`

  - `value: number`

    Current value of the zone setting.

  - `editable: optional true or false`

    Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

    - `true`

    - `false`

  - `modified_on: optional string`

    last time this setting was modified.

### Pseudo IPV4

- `PseudoIPV4 object { id, value, editable, modified_on }`

  The value set for the Pseudo IPv4 setting.

  - `id: "pseudo_ipv4"`

    Value of the Pseudo IPv4 setting.

    - `"pseudo_ipv4"`

  - `value: "off" or "add_header" or "overwrite_header"`

    Current value of the zone setting.

    - `"off"`

    - `"add_header"`

    - `"overwrite_header"`

  - `editable: optional true or false`

    Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

    - `true`

    - `false`

  - `modified_on: optional string`

    last time this setting was modified.

### Response Buffering

- `ResponseBuffering object { id, value }`

  - `id: optional "response_buffering"`

    Turn on or off whether Cloudflare should wait for an entire file
    from the origin server before forwarding it to the site visitor. By
    default, Cloudflare sends packets to the client as they arrive from
    the origin server.

    - `"response_buffering"`

  - `value: optional "on" or "off"`

    The status of Response Buffering

    - `"on"`

    - `"off"`

### Rocket Loader

- `RocketLoader object { id, value }`

  - `id: optional "rocket_loader"`

    Turn on or off Rocket Loader in the Cloudflare Speed app.

    - `"rocket_loader"`

  - `value: optional "on" or "off"`

    The status of Rocket Loader

    - `"on"`

    - `"off"`

### Security Headers

- `SecurityHeaders object { id, value, editable, modified_on }`

  Cloudflare security header for a zone.

  - `id: "security_header"`

    ID of the zone's security header.

    - `"security_header"`

  - `value: object { strict_transport_security }`

    Current value of the zone setting.

    - `strict_transport_security: optional object { enabled, include_subdomains, max_age, 2 more }`

      Strict Transport Security.

      - `enabled: optional boolean`

        Whether or not strict transport security is enabled.

      - `include_subdomains: optional boolean`

        Include all subdomains for strict transport security.

      - `max_age: optional number`

        Max age in seconds of the strict transport security.

      - `nosniff: optional boolean`

        Whether or not to include 'X-Content-Type-Options: nosniff' header.

      - `preload: optional boolean`

        Enable automatic preload of the HSTS configuration.

  - `editable: optional true or false`

    Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

    - `true`

    - `false`

  - `modified_on: optional string`

    last time this setting was modified.

### Security Level

- `SecurityLevel object { id, value }`

  - `id: optional "security_level"`

    Control options for the **Security Level** feature from the **Security** app.

    - `"security_level"`

  - `value: optional "off" or "essentially_off" or "low" or 3 more`

    - `"off"`

    - `"essentially_off"`

    - `"low"`

    - `"medium"`

    - `"high"`

    - `"under_attack"`

### Server Side Excludes

- `ServerSideExcludes object { id, value, editable, modified_on }`

  If there is sensitive content on your website that you want visible to real visitors, but that you want to hide from suspicious visitors, all you have to do is wrap the content with Cloudflare SSE tags. Wrap any content that you want to be excluded from suspicious visitors in the following SSE tags: <!--sse--><!--/sse-->. For example: <!--sse-->  Bad visitors won't see my phone number, 555-555-5555 <!--/sse-->. Note: SSE only will work with HTML. If you have HTML minification enabled, you won't see the SSE tags in your HTML source when it's served through Cloudflare. SSE will still function in this case, as Cloudflare's HTML minification and SSE functionality occur on-the-fly as the resource moves through our network to the visitor's computer. (https://support.cloudflare.com/hc/en-us/articles/200170036).

  - `id: "server_side_exclude"`

    ID of the zone setting.

    - `"server_side_exclude"`

  - `value: "on" or "off"`

    Current value of the zone setting.

    - `"on"`

    - `"off"`

  - `editable: optional true or false`

    Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

    - `true`

    - `false`

  - `modified_on: optional string`

    last time this setting was modified.

### Sort Query String For Cache

- `SortQueryStringForCache object { id, value }`

  - `id: optional "sort_query_string_for_cache"`

    Turn on or off the reordering of query strings. When query strings have the same structure, caching improves.

    - `"sort_query_string_for_cache"`

  - `value: optional "on" or "off"`

    The status of Query String Sort

    - `"on"`

    - `"off"`

### SSL

- `SSL object { id, value }`

  - `id: optional "ssl"`

    Control options for the SSL feature of the Edge Certificates tab in the Cloudflare SSL/TLS app.

    - `"ssl"`

  - `value: optional "off" or "flexible" or "full" or 2 more`

    The encryption mode that Cloudflare uses to connect to your origin server.

    - `"off"`

    - `"flexible"`

    - `"full"`

    - `"strict"`

    - `"origin_pull"`

### SSL Recommender

- `SSLRecommender object { id, enabled }`

  Enrollment in the SSL/TLS Recommender service which tries to detect and recommend (by sending periodic emails) the most secure SSL/TLS setting your origin servers support.

  - `id: optional "ssl_recommender"`

    Enrollment value for SSL/TLS Recommender.

    - `"ssl_recommender"`

  - `enabled: optional boolean`

    ssl-recommender enrollment setting.

### TLS 1 3

- `TLS1_3 object { id, value, editable, modified_on }`

  Enables Crypto TLS 1.3 feature for a zone.

  - `id: "tls_1_3"`

    ID of the zone setting.

    - `"tls_1_3"`

  - `value: "on" or "off" or "zrt"`

    Current value of the zone setting.

    - `"on"`

    - `"off"`

    - `"zrt"`

  - `editable: optional true or false`

    Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

    - `true`

    - `false`

  - `modified_on: optional string`

    last time this setting was modified.

### TLS Client Auth

- `TLSClientAuth object { id, value, editable, modified_on }`

  TLS Client Auth requires Cloudflare to connect to your origin server using a client certificate (Enterprise Only).

  - `id: "tls_client_auth"`

    ID of the zone setting.

    - `"tls_client_auth"`

  - `value: "on" or "off"`

    Current value of the zone setting.

    - `"on"`

    - `"off"`

  - `editable: optional true or false`

    Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

    - `true`

    - `false`

  - `modified_on: optional string`

    last time this setting was modified.

### True Client IP Header

- `TrueClientIPHeader object { id, value }`

  - `id: optional "true_client_ip_header"`

    Turn on or off the True-Client-IP Header feature of the Cloudflare Network app.

    - `"true_client_ip_header"`

  - `value: optional "on" or "off"`

    The status of True Client IP Header.

    - `"on"`

    - `"off"`

### WAF

- `WAF object { id, value }`

  - `id: optional "waf"`

    Turn on or off [WAF managed rules (previous version, deprecated)](https://developers.cloudflare.com/waf/reference/legacy/old-waf-managed-rules/).
    You cannot enable or disable individual WAF managed rules via Page Rules.

    - `"waf"`

  - `value: optional "on" or "off"`

    The status of WAF managed rules (previous version).

    - `"on"`

    - `"off"`

### WebP

- `WebP object { id, value, editable, modified_on }`

  When the client requesting the image supports the WebP image codec, and WebP offers a performance advantage over the original image format, Cloudflare will serve a WebP version of the original image.

  - `id: "webp"`

    ID of the zone setting.

    - `"webp"`

  - `value: "off" or "on"`

    Current value of the zone setting.

    - `"off"`

    - `"on"`

  - `editable: optional true or false`

    Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

    - `true`

    - `false`

  - `modified_on: optional string`

    last time this setting was modified.

### Websocket

- `Websocket object { id, value, editable, modified_on }`

  WebSockets are open connections sustained between the client and the origin server. Inside a WebSockets connection, the client and the origin can pass data back and forth without having to reestablish sessions. This makes exchanging data within a WebSockets connection fast. WebSockets are often used for real-time applications such as live chat and gaming. For more information refer to [Can I use Cloudflare with Websockets](https://support.cloudflare.com/hc/en-us/articles/200169466-Can-I-use-Cloudflare-with-WebSockets-).

  - `id: "websockets"`

    ID of the zone setting.

    - `"websockets"`

  - `value: "off" or "on"`

    Current value of the zone setting.

    - `"off"`

    - `"on"`

  - `editable: optional true or false`

    Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

    - `true`

    - `false`

  - `modified_on: optional string`

    last time this setting was modified.

### Zero RTT

- `ZeroRTT object { id, value, editable, modified_on }`

  0-RTT session resumption enabled for this zone.

  - `id: "0rtt"`

    ID of the zone setting.

    - `"0rtt"`

  - `value: "on" or "off"`

    Current value of the zone setting.

    - `"on"`

    - `"off"`

  - `editable: optional true or false`

    Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

    - `true`

    - `false`

  - `modified_on: optional string`

    last time this setting was modified.

### Setting List Response

- `SettingListResponse = ZeroRTT or AdvancedDDoS or object { id, modified_on, value }  or 59 more`

  0-RTT session resumption enabled for this zone.

  - `ZeroRTT object { id, value, editable, modified_on }`

    0-RTT session resumption enabled for this zone.

    - `id: "0rtt"`

      ID of the zone setting.

      - `"0rtt"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `AdvancedDDoS object { id, value, editable, modified_on }`

    Advanced protection from Distributed Denial of Service (DDoS) attacks on your website. This is an uneditable value that is 'on' in the case of Business and Enterprise zones.

    - `id: "advanced_ddos"`

      ID of the zone setting.

      - `"advanced_ddos"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesCacheRulesAegis object { id, modified_on, value }`

    Aegis provides dedicated egress IPs (from Cloudflare to your origin) for your layer 7 WAF and CDN services. The egress IPs are reserved exclusively for your account so that you can increase your origin security by only allowing traffic from a small list of IP addresses.

    - `id: "aegis"`

      ID of the zone setting.

      - `"aegis"`

    - `modified_on: optional string`

      Last time this setting was modified.

    - `value: optional object { enabled, pool_id }`

      Value of the zone setting.

      - `enabled: optional boolean`

        Whether the feature is enabled or not.

      - `pool_id: optional string`

        Egress pool id which refers to a grouping of dedicated egress IPs through which Cloudflare will connect to origin.

  - `AlwaysOnline object { id, value, editable, modified_on }`

    When enabled, Cloudflare serves limited copies of web pages available from the [Internet Archive's Wayback Machine](https://archive.org/web/) if your server is offline. Refer to [Always Online](https://developers.cloudflare.com/cache/about/always-online) for more information.

    - `id: "always_online"`

      ID of the zone setting.

      - `"always_online"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasAlwaysUseHTTPS object { id, value, editable, modified_on }`

    Reply to all requests for URLs that use "http" with a 301 redirect to the equivalent "https" URL. If you only want to redirect for a subset of requests, consider creating an "Always use HTTPS" page rule.

    - `id: "always_use_https"`

      ID of the zone setting.

      - `"always_use_https"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasAutomaticHTTPSRewrites object { id, value, editable, modified_on }`

    Enable the Automatic HTTPS Rewrites feature for this zone.

    - `id: "automatic_https_rewrites"`

      ID of the zone setting.

      - `"automatic_https_rewrites"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `Brotli object { id, value, editable, modified_on }`

    When the client requesting an asset supports the Brotli compression algorithm, Cloudflare will serve a Brotli compressed version of the asset.

    - `id: "brotli"`

      ID of the zone setting.

      - `"brotli"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasBrowserCacheTTL object { id, value, editable, modified_on }`

    Browser Cache TTL (in seconds) specifies how long Cloudflare-cached resources will remain on your visitors' computers. Cloudflare will honor any larger times specified by your server. (https://support.cloudflare.com/hc/en-us/articles/200168276).

    - `id: "browser_cache_ttl"`

      ID of the zone setting.

      - `"browser_cache_ttl"`

    - `value: number`

      Current value of the zone setting.

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasBrowserCheck object { id, value, editable, modified_on }`

    Browser Integrity Check is similar to Bad Behavior and looks for common HTTP headers abused most commonly by spammers and denies access to your page.  It will also challenge visitors that do not have a user agent or a non standard user agent (also commonly used by abuse bots, crawlers or visitors). (https://support.cloudflare.com/hc/en-us/articles/200170086).

    - `id: "browser_check"`

      ID of the zone setting.

      - `"browser_check"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasCacheLevel object { id, value, editable, modified_on }`

    Cache Level functions based off the setting level. The basic setting will cache most static resources (i.e., css, images, and JavaScript). The simplified setting will ignore the query string when delivering a cached resource. The aggressive setting will cache all static resources, including ones with a query string. (https://support.cloudflare.com/hc/en-us/articles/200168256).

    - `id: "cache_level"`

      ID of the zone setting.

      - `"cache_level"`

    - `value: "aggressive" or "basic" or "simplified"`

      Current value of the zone setting.

      - `"aggressive"`

      - `"basic"`

      - `"simplified"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ChallengeTTL object { id, value, editable, modified_on }`

    Specify how long a visitor is allowed access to your site after successfully completing a challenge (such as a CAPTCHA). After the TTL has expired the visitor will have to complete a new challenge. We recommend a 15 - 45 minute setting and will attempt to honor any setting above 45 minutes. (https://support.cloudflare.com/hc/en-us/articles/200170136).

    - `id: "challenge_ttl"`

      ID of the zone setting.

      - `"challenge_ttl"`

    - `value: 300 or 900 or 1800 or 11 more`

      Current value of the zone setting.

      - `300`

      - `900`

      - `1800`

      - `2700`

      - `3600`

      - `7200`

      - `10800`

      - `14400`

      - `28800`

      - `57600`

      - `86400`

      - `604800`

      - `2592000`

      - `31536000`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `Ciphers object { id, value, editable, modified_on }`

    An allowlist of ciphers for TLS termination. These ciphers must be in the BoringSSL format.

    - `id: "ciphers"`

      ID of the zone setting.

      - `"ciphers"`

    - `value: array of string`

      Current value of the zone setting.

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesContentConverter object { id, value, editable, modified_on }`

    When enabled and the client sends an Accept header requesting text/markdown,
    Cloudflare will convert HTML responses to Markdown format using the toMarkdown() service.
    Refer to the [developer documentation](https://developers.cloudflare.com/workers-ai/features/markdown-conversion/) for more information.

    - `id: "content_converter"`

      ID of the zone setting.

      - `"content_converter"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesCNAMEFlattening object { id, value, editable, modified_on }`

    Whether or not cname flattening is on.

    - `id: "cname_flattening"`

      How to flatten the cname destination.

      - `"cname_flattening"`

    - `value: "flatten_at_root" or "flatten_all"`

      Current value of the zone setting.

      - `"flatten_at_root"`

      - `"flatten_all"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `DevelopmentMode object { id, value, editable, 2 more }`

    Development Mode temporarily allows you to enter development mode for your websites if you need to make changes to your site. This will bypass Cloudflare's accelerated cache and slow down your site, but is useful if you are making changes to cacheable content (like images, css, or JavaScript) and would like to see those changes right away. Once entered, development mode will last for 3 hours and then automatically toggle off.

    - `id: "development_mode"`

      ID of the zone setting.

      - `"development_mode"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

    - `time_remaining: optional number`

      Value of the zone setting.
      Notes: The interval (in seconds) from when development mode expires (positive integer) or last expired (negative integer) for the domain. If development mode has never been enabled, this value is false.

  - `EarlyHints object { id, value, editable, modified_on }`

    When enabled, Cloudflare will attempt to speed up overall page loads by serving `103` responses with `Link` headers from the final response. Refer to [Early Hints](https://developers.cloudflare.com/cache/about/early-hints) for more information.

    - `id: "early_hints"`

      ID of the zone setting.

      - `"early_hints"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasEdgeCacheTTL object { id, value, editable, modified_on }`

    Time (in seconds) that a resource will be ensured to remain on Cloudflare's cache servers.

    - `id: "edge_cache_ttl"`

      ID of the zone setting.

      - `"edge_cache_ttl"`

    - `value: 30 or 60 or 300 or 18 more`

      Current value of the zone setting.

      - `30`

      - `60`

      - `300`

      - `1200`

      - `1800`

      - `3600`

      - `7200`

      - `10800`

      - `14400`

      - `18000`

      - `28800`

      - `43200`

      - `57600`

      - `72000`

      - `86400`

      - `172800`

      - `259200`

      - `345600`

      - `432000`

      - `518400`

      - `604800`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasEmailObfuscation object { id, value, editable, modified_on }`

    Encrypt email adresses on your web page from bots, while keeping them visible to humans. (https://support.cloudflare.com/hc/en-us/articles/200170016).

    - `id: "email_obfuscation"`

      ID of the zone setting.

      - `"email_obfuscation"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `H2Prioritization object { id, value, editable, modified_on }`

    HTTP/2 Edge Prioritization optimises the delivery of resources served through HTTP/2 to improve page load performance. It also supports fine control of content delivery when used in conjunction with Workers.

    - `id: "h2_prioritization"`

      ID of the zone setting.

      - `"h2_prioritization"`

    - `value: "on" or "off" or "custom"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

      - `"custom"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `HotlinkProtection object { id, value, editable, modified_on }`

    When enabled, the Hotlink Protection option ensures that other sites cannot suck up your bandwidth by building pages that use images hosted on your site. Anytime a request for an image on your site hits Cloudflare, we check to ensure that it's not another site requesting them. People will still be able to download and view images from your page, but other sites won't be able to steal them for use on their own pages. (https://support.cloudflare.com/hc/en-us/articles/200170026).

    - `id: "hotlink_protection"`

      ID of the zone setting.

      - `"hotlink_protection"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `HTTP2 object { id, value, editable, modified_on }`

    HTTP2 enabled for this zone.

    - `id: "http2"`

      ID of the zone setting.

      - `"http2"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `HTTP3 object { id, value, editable, modified_on }`

    HTTP3 enabled for this zone.

    - `id: "http3"`

      ID of the zone setting.

      - `"http3"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ImageResizing object { id, value, editable, modified_on }`

    Image Transformations provides on-demand resizing, conversion and optimization for images served through Cloudflare's network. Refer to the [Image Transformations documentation](https://developers.cloudflare.com/images/) for more information.

    - `id: "image_resizing"`

      ID of the zone setting.

      - `"image_resizing"`

    - `value: "on" or "off" or "open"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

      - `"open"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasIPGeolocation object { id, value, editable, modified_on }`

    Enable IP Geolocation to have Cloudflare geolocate visitors to your website and pass the country code to you. (https://support.cloudflare.com/hc/en-us/articles/200168236).

    - `id: "ip_geolocation"`

      ID of the zone setting.

      - `"ip_geolocation"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `IPV6 object { id, value, editable, modified_on }`

    Enable IPv6 on all subdomains that are Cloudflare enabled.  (https://support.cloudflare.com/hc/en-us/articles/200168586).

    - `id: "ipv6"`

      ID of the zone setting.

      - `"ipv6"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesMaxUpload object { id, value, editable, modified_on }`

    Maximum size of an allowable upload.

    - `id: "max_upload"`

      identifier of the zone setting.

      - `"max_upload"`

    - `value: 100 or 125 or 150 or 15 more`

      Current value of the zone setting.

      - `100`

      - `125`

      - `150`

      - `175`

      - `200`

      - `225`

      - `250`

      - `275`

      - `300`

      - `325`

      - `350`

      - `375`

      - `400`

      - `425`

      - `450`

      - `475`

      - `500`

      - `1000`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `MinTLSVersion object { id, value, editable, modified_on }`

    Only accepts HTTPS requests that use at least the TLS protocol version specified. For example, if TLS 1.1 is selected, TLS 1.0 connections will be rejected, while 1.1, 1.2, and 1.3 (if enabled) will be permitted.

    - `id: "min_tls_version"`

      ID of the zone setting.

      - `"min_tls_version"`

    - `value: "1.0" or "1.1" or "1.2" or "1.3"`

      Current value of the zone setting.

      - `"1.0"`

      - `"1.1"`

      - `"1.2"`

      - `"1.3"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasMirage object { id, value, editable, modified_on }`

    Automatically optimize image loading for website visitors on mobile
    devices. Refer to [our blog post](http://blog.cloudflare.com/mirage2-solving-mobile-speed)
    for more information.

    - `id: "mirage"`

      ID of the zone setting.

      - `"mirage"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `NEL object { id, value, editable, modified_on }`

    Enable Network Error Logging reporting on your zone. (Beta)

    - `id: "nel"`

      Zone setting identifier.

      - `"nel"`

    - `value: object { enabled }`

      Current value of the zone setting.

      - `enabled: optional boolean`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasOpportunisticEncryption object { id, value, editable, modified_on }`

    Enables the Opportunistic Encryption feature for a zone.

    - `id: "opportunistic_encryption"`

      ID of the zone setting.

      - `"opportunistic_encryption"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `OpportunisticOnion object { id, value, editable, modified_on }`

    Add an Alt-Svc header to all legitimate requests from Tor, allowing the connection to use our onion services instead of exit nodes.

    - `id: "opportunistic_onion"`

      ID of the zone setting.

      - `"opportunistic_onion"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `OrangeToOrange object { id, value, editable, modified_on }`

    Orange to Orange (O2O) allows zones on Cloudflare to CNAME to other zones also on Cloudflare.

    - `id: "orange_to_orange"`

      ID of the zone setting.

      - `"orange_to_orange"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasOriginErrorPagePassThru object { id, value, editable, modified_on }`

    Cloudflare will proxy customer error pages on any 502,504 errors on origin server instead of showing a default Cloudflare error page. This does not apply to 522 errors and is limited to Enterprise Zones.

    - `id: "origin_error_page_pass_thru"`

      ID of the zone setting.

      - `"origin_error_page_pass_thru"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesCacheRulesOriginH2MaxStreams object { id, modified_on, value }`

    Origin H2 Max Streams configures the max number of concurrent requests that Cloudflare will send within the same connection when communicating with the origin server, if the origin supports it. Note that if your origin does not support H2 multiplexing, 5xx errors may be observed, particularly 520s. Also note that the default value is `100` for all plan types except Enterprise where it is `1`. `1` means that H2 multiplexing is disabled.

    - `id: "origin_h2_max_streams"`

      Value of the zone setting.

      - `"origin_h2_max_streams"`

    - `modified_on: optional string`

      Last time this setting was modified.

    - `value: optional number`

      Value of the Origin H2 Max Streams Setting.

  - `ZonesCacheRulesOriginMaxHTTPVersion object { id, modified_on, value }`

    Origin Max HTTP Setting Version sets the highest HTTP version Cloudflare will attempt to use with your origin. This setting allows Cloudflare to make HTTP/2 requests to your origin. (Refer to [Enable HTTP/2 to Origin](https://developers.cloudflare.com/cache/how-to/enable-http2-to-origin/), for more information.). The default value is "2" for all plan types except Enterprise where it is "1".

    - `id: "origin_max_http_version"`

      Value of the zone setting.

      - `"origin_max_http_version"`

    - `modified_on: optional string`

      Last time this setting was modified.

    - `value: optional "2" or "1"`

      Value of the Origin Max HTTP Version Setting.

      - `"2"`

      - `"1"`

  - `ZonesSchemasPolish object { id, value, editable, modified_on }`

    Removes metadata and compresses your images for faster page load times. Basic (Lossless): Reduce the size of PNG, JPEG, and GIF files - no impact on visual quality. Basic + JPEG (Lossy): Further reduce the size of JPEG files for faster image loading. Larger JPEGs are converted to progressive images, loading a lower-resolution image first and ending in a higher-resolution version. Not recommended for hi-res photography sites.

    - `id: "polish"`

      ID of the zone setting.

      - `"polish"`

    - `value: "off" or "lossless" or "lossy"`

      Current value of the zone setting.

      - `"off"`

      - `"lossless"`

      - `"lossy"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `PrefetchPreload object { id, value, editable, modified_on }`

    Cloudflare will prefetch any URLs that are included in the response headers. This is limited to Enterprise Zones.

    - `id: "prefetch_preload"`

      ID of the zone setting.

      - `"prefetch_preload"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesPrivacyPass object { id, value, editable, modified_on }`

    Privacy Pass v1 was a browser extension developed by the Privacy Pass Team to improve the browsing experience for your visitors by allowing users to reduce the number of CAPTCHAs shown. (https://support.cloudflare.com/hc/en-us/articles/115001992652-Privacy-Pass).

    - `id: "privacy_pass"`

      ID of the zone setting.

      - `"privacy_pass"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ProxyReadTimeout object { id, value, editable, modified_on }`

    Maximum time between two read operations from origin.

    - `id: "proxy_read_timeout"`

      ID of the zone setting.

      - `"proxy_read_timeout"`

    - `value: number`

      Current value of the zone setting.

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `PseudoIPV4 object { id, value, editable, modified_on }`

    The value set for the Pseudo IPv4 setting.

    - `id: "pseudo_ipv4"`

      Value of the Pseudo IPv4 setting.

      - `"pseudo_ipv4"`

    - `value: "off" or "add_header" or "overwrite_header"`

      Current value of the zone setting.

      - `"off"`

      - `"add_header"`

      - `"overwrite_header"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesRedirectsForAITraining object { id, value, editable, modified_on }`

    When enabled, Cloudflare will redirect verified AI training crawlers to canonical URLs
    found in the HTML response, ensuring AI models train on authoritative content.

    - `id: "redirects_for_ai_training"`

      ID of the zone setting.

      - `"redirects_for_ai_training"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesReplaceInsecureJS object { id, value, editable, modified_on }`

    Automatically replace insecure JavaScript libraries with safer and faster alternatives provided under cdnjs and powered by Cloudflare. Currently supports the following libraries: Polyfill under polyfill.io.

    - `id: "replace_insecure_js"`

      ID of the zone setting.

      - `"replace_insecure_js"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasResponseBuffering object { id, value, editable, modified_on }`

    Enables or disables buffering of responses from the proxied server. Cloudflare may buffer the whole payload to deliver it at once to the client versus allowing it to be delivered in chunks. By default, the proxied server streams directly and is not buffered by Cloudflare. This is limited to Enterprise Zones.

    - `id: "response_buffering"`

      ID of the zone setting.

      - `"response_buffering"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasRocketLoader object { id, value, editable, modified_on }`

    Rocket Loader is a general-purpose asynchronous JavaScript optimisation that prioritises rendering your content while loading your site's Javascript asynchronously. Turning on Rocket Loader will immediately improve a web page's rendering time sometimes measured as Time to First Paint (TTFP), and also the `window.onload` time (assuming there is JavaScript on the page). This can have a positive impact on your Google search ranking. When turned on, Rocket Loader will automatically defer the loading of all Javascript referenced in your HTML, with no configuration required. Refer to [Understanding Rocket Loader](https://support.cloudflare.com/hc/articles/200168056) for more information.

    - `id: "rocket_loader"`

      ID of the zone setting.

      - `"rocket_loader"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasAutomaticPlatformOptimization object { id, value, editable, modified_on }`

    [Automatic Platform Optimization for WordPress](https://developers.cloudflare.com/automatic-platform-optimization/) serves your WordPress site from Cloudflare's edge network and caches third-party fonts.

    - `id: "automatic_platform_optimization"`

      ID of the zone setting.

      - `"automatic_platform_optimization"`

    - `value: AutomaticPlatformOptimization`

      Current value of the zone setting.

      - `cache_by_device_type: boolean`

        Indicates whether or not [cache by device type](https://developers.cloudflare.com/automatic-platform-optimization/reference/cache-device-type/) is enabled.

      - `cf: boolean`

        Indicates whether or not Cloudflare proxy is enabled.

      - `enabled: boolean`

        Indicates whether or not Automatic Platform Optimization is enabled.

      - `hostnames: array of string`

        An array of hostnames where Automatic Platform Optimization for WordPress is activated.

      - `wordpress: boolean`

        Indicates whether or not site is powered by WordPress.

      - `wp_plugin: boolean`

        Indicates whether or not [Cloudflare for WordPress plugin](https://wordpress.org/plugins/cloudflare/) is installed.

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSearchForAgents object { id, value, editable, modified_on }`

    When enabled, Cloudflare provisions an AI Search instance for the zone
    and exposes a /.well-known/ai-search endpoint that AI agents can query.
    Markdown responses also receive an agent: YAML capability block advertising
    the search endpoint.

    - `id: "search_for_agents"`

      ID of the zone setting.

      - `"search_for_agents"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `SecurityHeaders object { id, value, editable, modified_on }`

    Cloudflare security header for a zone.

    - `id: "security_header"`

      ID of the zone's security header.

      - `"security_header"`

    - `value: object { strict_transport_security }`

      Current value of the zone setting.

      - `strict_transport_security: optional object { enabled, include_subdomains, max_age, 2 more }`

        Strict Transport Security.

        - `enabled: optional boolean`

          Whether or not strict transport security is enabled.

        - `include_subdomains: optional boolean`

          Include all subdomains for strict transport security.

        - `max_age: optional number`

          Max age in seconds of the strict transport security.

        - `nosniff: optional boolean`

          Whether or not to include 'X-Content-Type-Options: nosniff' header.

        - `preload: optional boolean`

          Enable automatic preload of the HSTS configuration.

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasSecurityLevel object { id, value, editable, modified_on }`

    Choose the appropriate security profile for your website, which will automatically adjust each of the security settings. If you choose to customize an individual security setting, the profile will become Custom. (https://support.cloudflare.com/hc/en-us/articles/200170056).

    - `id: "security_level"`

      ID of the zone setting.

      - `"security_level"`

    - `value: "off" or "essentially_off" or "low" or 3 more`

      Current value of the zone setting.

      - `"off"`

      - `"essentially_off"`

      - `"low"`

      - `"medium"`

      - `"high"`

      - `"under_attack"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ServerSideExcludes object { id, value, editable, modified_on }`

    If there is sensitive content on your website that you want visible to real visitors, but that you want to hide from suspicious visitors, all you have to do is wrap the content with Cloudflare SSE tags. Wrap any content that you want to be excluded from suspicious visitors in the following SSE tags: <!--sse--><!--/sse-->. For example: <!--sse-->  Bad visitors won't see my phone number, 555-555-5555 <!--/sse-->. Note: SSE only will work with HTML. If you have HTML minification enabled, you won't see the SSE tags in your HTML source when it's served through Cloudflare. SSE will still function in this case, as Cloudflare's HTML minification and SSE functionality occur on-the-fly as the resource moves through our network to the visitor's computer. (https://support.cloudflare.com/hc/en-us/articles/200170036).

    - `id: "server_side_exclude"`

      ID of the zone setting.

      - `"server_side_exclude"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSha1Support object { id, value, editable, modified_on }`

    Allow SHA1 support.

    - `id: "sha1_support"`

      Zone setting identifier.

      - `"sha1_support"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasSortQueryStringForCache object { id, value, editable, modified_on }`

    Cloudflare will treat files with the same query strings as the same file in cache, regardless of the order of the query strings. This is limited to Enterprise Zones.

    - `id: "sort_query_string_for_cache"`

      ID of the zone setting.

      - `"sort_query_string_for_cache"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasSSL object { id, value, editable, modified_on }`

    SSL encrypts your visitor's connection and safeguards credit card numbers and other personal data to and from your website. SSL can take up to 5 minutes to fully activate. Requires Cloudflare active on your root domain or www domain. Off: no SSL between the visitor and Cloudflare, and no SSL between Cloudflare and your web server  (all HTTP traffic). Flexible: SSL between the visitor and Cloudflare -- visitor sees HTTPS on your site, but no SSL between Cloudflare and your web server. You don't need to have an SSL cert on your web server, but your vistors will still see the site as being HTTPS enabled. Full:  SSL between the visitor and Cloudflare -- visitor sees HTTPS on your site, and SSL between Cloudflare and your web server. You'll need to have your own SSL cert or self-signed cert at the very least. Full (Strict): SSL between the visitor and Cloudflare -- visitor sees HTTPS on your site, and SSL between Cloudflare and your web server. You'll need to have a valid SSL certificate installed on your web server. This certificate must be signed by a certificate authority, have an expiration date in the future, and respond for the request domain name (hostname). (https://support.cloudflare.com/hc/en-us/articles/200170416).

    - `id: "ssl"`

      ID of the zone setting.

      - `"ssl"`

    - `value: "off" or "flexible" or "full" or "strict"`

      Current value of the zone setting.

      - `"off"`

      - `"flexible"`

      - `"full"`

      - `"strict"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `SSLRecommender object { id, enabled }`

    Enrollment in the SSL/TLS Recommender service which tries to detect and recommend (by sending periodic emails) the most secure SSL/TLS setting your origin servers support.

    - `id: optional "ssl_recommender"`

      Enrollment value for SSL/TLS Recommender.

      - `"ssl_recommender"`

    - `enabled: optional boolean`

      ssl-recommender enrollment setting.

  - `ZonesTLS1_2Only object { id, value, editable, modified_on }`

    Only allows TLS1.2.

    - `id: "tls_1_2_only"`

      Zone setting identifier.

      - `"tls_1_2_only"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `TLS1_3 object { id, value, editable, modified_on }`

    Enables Crypto TLS 1.3 feature for a zone.

    - `id: "tls_1_3"`

      ID of the zone setting.

      - `"tls_1_3"`

    - `value: "on" or "off" or "zrt"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

      - `"zrt"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `TLSClientAuth object { id, value, editable, modified_on }`

    TLS Client Auth requires Cloudflare to connect to your origin server using a client certificate (Enterprise Only).

    - `id: "tls_client_auth"`

      ID of the zone setting.

      - `"tls_client_auth"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesTransformations object { id, value, editable, modified_on }`

    Media Transformations provides on-demand resizing, conversion and optimization for images and video served through Cloudflare's network. Refer to the [Image Transformations](https://developers.cloudflare.com/images/) and [Video Transformations](https://developers.cloudflare.com/stream/transform-videos/#getting-started) documentation for more information.

    - `id: "transformations"`

      ID of the zone setting. Shared between Image Transformations and Video Transformations.

      - `"transformations"`

    - `value: "on" or "off" or "open"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

      - `"open"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesTransformationsAllowedOrigins object { id, value, editable, modified_on }`

    Media Transformations Allowed Origins restricts transformations for images and video served through Cloudflare's network. Refer to the [Image Transformations](https://developers.cloudflare.com/images/) and [Video Transformations](https://developers.cloudflare.com/stream/transform-videos/#getting-started) documentation for more information.

    - `id: "transformations_allowed_origins"`

      ID of the zone setting. Shared between Image Transformations and Video Transformations.

      - `"transformations_allowed_origins"`

    - `value: string`

      Current value of the zone setting.

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasTrueClientIPHeader object { id, value, editable, modified_on }`

    Allows customer to continue to use True Client IP (Akamai feature) in the headers we send to the origin. This is limited to Enterprise Zones.

    - `id: "true_client_ip_header"`

      ID of the zone setting.

      - `"true_client_ip_header"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasWAF object { id, value, editable, modified_on }`

    The WAF examines HTTP requests to your website.  It inspects both GET and POST requests and applies rules to help filter out illegitimate traffic from legitimate website visitors. The Cloudflare WAF inspects website addresses or URLs to detect anything out of the ordinary. If the Cloudflare WAF determines suspicious user behavior, then the WAF will 'challenge' the web visitor with a page that asks them to submit a CAPTCHA successfully  to continue their action. If the challenge is failed, the action will be stopped. What this means is that Cloudflare's WAF will block any traffic identified as illegitimate before it reaches your origin web server. (https://support.cloudflare.com/hc/en-us/articles/200172016).

    - `id: "waf"`

      ID of the zone setting.

      - `"waf"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `WebP object { id, value, editable, modified_on }`

    When the client requesting the image supports the WebP image codec, and WebP offers a performance advantage over the original image format, Cloudflare will serve a WebP version of the original image.

    - `id: "webp"`

      ID of the zone setting.

      - `"webp"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `Websocket object { id, value, editable, modified_on }`

    WebSockets are open connections sustained between the client and the origin server. Inside a WebSockets connection, the client and the origin can pass data back and forth without having to reestablish sessions. This makes exchanging data within a WebSockets connection fast. WebSockets are often used for real-time applications such as live chat and gaming. For more information refer to [Can I use Cloudflare with Websockets](https://support.cloudflare.com/hc/en-us/articles/200169466-Can-I-use-Cloudflare-with-WebSockets-).

    - `id: "websockets"`

      ID of the zone setting.

      - `"websockets"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

### Setting Get Response

- `SettingGetResponse = ZeroRTT or AdvancedDDoS or object { id, modified_on, value }  or 60 more`

  0-RTT session resumption enabled for this zone.

  - `ZeroRTT object { id, value, editable, modified_on }`

    0-RTT session resumption enabled for this zone.

    - `id: "0rtt"`

      ID of the zone setting.

      - `"0rtt"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `AdvancedDDoS object { id, value, editable, modified_on }`

    Advanced protection from Distributed Denial of Service (DDoS) attacks on your website. This is an uneditable value that is 'on' in the case of Business and Enterprise zones.

    - `id: "advanced_ddos"`

      ID of the zone setting.

      - `"advanced_ddos"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesCacheRulesAegis object { id, modified_on, value }`

    Aegis provides dedicated egress IPs (from Cloudflare to your origin) for your layer 7 WAF and CDN services. The egress IPs are reserved exclusively for your account so that you can increase your origin security by only allowing traffic from a small list of IP addresses.

    - `id: "aegis"`

      ID of the zone setting.

      - `"aegis"`

    - `modified_on: optional string`

      Last time this setting was modified.

    - `value: optional object { enabled, pool_id }`

      Value of the zone setting.

      - `enabled: optional boolean`

        Whether the feature is enabled or not.

      - `pool_id: optional string`

        Egress pool id which refers to a grouping of dedicated egress IPs through which Cloudflare will connect to origin.

  - `AlwaysOnline object { id, value, editable, modified_on }`

    When enabled, Cloudflare serves limited copies of web pages available from the [Internet Archive's Wayback Machine](https://archive.org/web/) if your server is offline. Refer to [Always Online](https://developers.cloudflare.com/cache/about/always-online) for more information.

    - `id: "always_online"`

      ID of the zone setting.

      - `"always_online"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasAlwaysUseHTTPS object { id, value, editable, modified_on }`

    Reply to all requests for URLs that use "http" with a 301 redirect to the equivalent "https" URL. If you only want to redirect for a subset of requests, consider creating an "Always use HTTPS" page rule.

    - `id: "always_use_https"`

      ID of the zone setting.

      - `"always_use_https"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasAutomaticHTTPSRewrites object { id, value, editable, modified_on }`

    Enable the Automatic HTTPS Rewrites feature for this zone.

    - `id: "automatic_https_rewrites"`

      ID of the zone setting.

      - `"automatic_https_rewrites"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `Brotli object { id, value, editable, modified_on }`

    When the client requesting an asset supports the Brotli compression algorithm, Cloudflare will serve a Brotli compressed version of the asset.

    - `id: "brotli"`

      ID of the zone setting.

      - `"brotli"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasBrowserCacheTTL object { id, value, editable, modified_on }`

    Browser Cache TTL (in seconds) specifies how long Cloudflare-cached resources will remain on your visitors' computers. Cloudflare will honor any larger times specified by your server. (https://support.cloudflare.com/hc/en-us/articles/200168276).

    - `id: "browser_cache_ttl"`

      ID of the zone setting.

      - `"browser_cache_ttl"`

    - `value: number`

      Current value of the zone setting.

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasBrowserCheck object { id, value, editable, modified_on }`

    Browser Integrity Check is similar to Bad Behavior and looks for common HTTP headers abused most commonly by spammers and denies access to your page.  It will also challenge visitors that do not have a user agent or a non standard user agent (also commonly used by abuse bots, crawlers or visitors). (https://support.cloudflare.com/hc/en-us/articles/200170086).

    - `id: "browser_check"`

      ID of the zone setting.

      - `"browser_check"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasCacheLevel object { id, value, editable, modified_on }`

    Cache Level functions based off the setting level. The basic setting will cache most static resources (i.e., css, images, and JavaScript). The simplified setting will ignore the query string when delivering a cached resource. The aggressive setting will cache all static resources, including ones with a query string. (https://support.cloudflare.com/hc/en-us/articles/200168256).

    - `id: "cache_level"`

      ID of the zone setting.

      - `"cache_level"`

    - `value: "aggressive" or "basic" or "simplified"`

      Current value of the zone setting.

      - `"aggressive"`

      - `"basic"`

      - `"simplified"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ChallengeTTL object { id, value, editable, modified_on }`

    Specify how long a visitor is allowed access to your site after successfully completing a challenge (such as a CAPTCHA). After the TTL has expired the visitor will have to complete a new challenge. We recommend a 15 - 45 minute setting and will attempt to honor any setting above 45 minutes. (https://support.cloudflare.com/hc/en-us/articles/200170136).

    - `id: "challenge_ttl"`

      ID of the zone setting.

      - `"challenge_ttl"`

    - `value: 300 or 900 or 1800 or 11 more`

      Current value of the zone setting.

      - `300`

      - `900`

      - `1800`

      - `2700`

      - `3600`

      - `7200`

      - `10800`

      - `14400`

      - `28800`

      - `57600`

      - `86400`

      - `604800`

      - `2592000`

      - `31536000`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesChinaNetworkEnabled object { id, value, editable, modified_on }`

    Determines whether or not the china network is enabled.

    - `id: "china_network_enabled"`

      ID of the zone setting.

      - `"china_network_enabled"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesContentConverter object { id, value, editable, modified_on }`

    When enabled and the client sends an Accept header requesting text/markdown,
    Cloudflare will convert HTML responses to Markdown format using the toMarkdown() service.
    Refer to the [developer documentation](https://developers.cloudflare.com/workers-ai/features/markdown-conversion/) for more information.

    - `id: "content_converter"`

      ID of the zone setting.

      - `"content_converter"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `Ciphers object { id, value, editable, modified_on }`

    An allowlist of ciphers for TLS termination. These ciphers must be in the BoringSSL format.

    - `id: "ciphers"`

      ID of the zone setting.

      - `"ciphers"`

    - `value: array of string`

      Current value of the zone setting.

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesCNAMEFlattening object { id, value, editable, modified_on }`

    Whether or not cname flattening is on.

    - `id: "cname_flattening"`

      How to flatten the cname destination.

      - `"cname_flattening"`

    - `value: "flatten_at_root" or "flatten_all"`

      Current value of the zone setting.

      - `"flatten_at_root"`

      - `"flatten_all"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `DevelopmentMode object { id, value, editable, 2 more }`

    Development Mode temporarily allows you to enter development mode for your websites if you need to make changes to your site. This will bypass Cloudflare's accelerated cache and slow down your site, but is useful if you are making changes to cacheable content (like images, css, or JavaScript) and would like to see those changes right away. Once entered, development mode will last for 3 hours and then automatically toggle off.

    - `id: "development_mode"`

      ID of the zone setting.

      - `"development_mode"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

    - `time_remaining: optional number`

      Value of the zone setting.
      Notes: The interval (in seconds) from when development mode expires (positive integer) or last expired (negative integer) for the domain. If development mode has never been enabled, this value is false.

  - `EarlyHints object { id, value, editable, modified_on }`

    When enabled, Cloudflare will attempt to speed up overall page loads by serving `103` responses with `Link` headers from the final response. Refer to [Early Hints](https://developers.cloudflare.com/cache/about/early-hints) for more information.

    - `id: "early_hints"`

      ID of the zone setting.

      - `"early_hints"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasEdgeCacheTTL object { id, value, editable, modified_on }`

    Time (in seconds) that a resource will be ensured to remain on Cloudflare's cache servers.

    - `id: "edge_cache_ttl"`

      ID of the zone setting.

      - `"edge_cache_ttl"`

    - `value: 30 or 60 or 300 or 18 more`

      Current value of the zone setting.

      - `30`

      - `60`

      - `300`

      - `1200`

      - `1800`

      - `3600`

      - `7200`

      - `10800`

      - `14400`

      - `18000`

      - `28800`

      - `43200`

      - `57600`

      - `72000`

      - `86400`

      - `172800`

      - `259200`

      - `345600`

      - `432000`

      - `518400`

      - `604800`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasEmailObfuscation object { id, value, editable, modified_on }`

    Encrypt email adresses on your web page from bots, while keeping them visible to humans. (https://support.cloudflare.com/hc/en-us/articles/200170016).

    - `id: "email_obfuscation"`

      ID of the zone setting.

      - `"email_obfuscation"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `H2Prioritization object { id, value, editable, modified_on }`

    HTTP/2 Edge Prioritization optimises the delivery of resources served through HTTP/2 to improve page load performance. It also supports fine control of content delivery when used in conjunction with Workers.

    - `id: "h2_prioritization"`

      ID of the zone setting.

      - `"h2_prioritization"`

    - `value: "on" or "off" or "custom"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

      - `"custom"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `HotlinkProtection object { id, value, editable, modified_on }`

    When enabled, the Hotlink Protection option ensures that other sites cannot suck up your bandwidth by building pages that use images hosted on your site. Anytime a request for an image on your site hits Cloudflare, we check to ensure that it's not another site requesting them. People will still be able to download and view images from your page, but other sites won't be able to steal them for use on their own pages. (https://support.cloudflare.com/hc/en-us/articles/200170026).

    - `id: "hotlink_protection"`

      ID of the zone setting.

      - `"hotlink_protection"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `HTTP2 object { id, value, editable, modified_on }`

    HTTP2 enabled for this zone.

    - `id: "http2"`

      ID of the zone setting.

      - `"http2"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `HTTP3 object { id, value, editable, modified_on }`

    HTTP3 enabled for this zone.

    - `id: "http3"`

      ID of the zone setting.

      - `"http3"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ImageResizing object { id, value, editable, modified_on }`

    Image Transformations provides on-demand resizing, conversion and optimization for images served through Cloudflare's network. Refer to the [Image Transformations documentation](https://developers.cloudflare.com/images/) for more information.

    - `id: "image_resizing"`

      ID of the zone setting.

      - `"image_resizing"`

    - `value: "on" or "off" or "open"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

      - `"open"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasIPGeolocation object { id, value, editable, modified_on }`

    Enable IP Geolocation to have Cloudflare geolocate visitors to your website and pass the country code to you. (https://support.cloudflare.com/hc/en-us/articles/200168236).

    - `id: "ip_geolocation"`

      ID of the zone setting.

      - `"ip_geolocation"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `IPV6 object { id, value, editable, modified_on }`

    Enable IPv6 on all subdomains that are Cloudflare enabled.  (https://support.cloudflare.com/hc/en-us/articles/200168586).

    - `id: "ipv6"`

      ID of the zone setting.

      - `"ipv6"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesMaxUpload object { id, value, editable, modified_on }`

    Maximum size of an allowable upload.

    - `id: "max_upload"`

      identifier of the zone setting.

      - `"max_upload"`

    - `value: 100 or 125 or 150 or 15 more`

      Current value of the zone setting.

      - `100`

      - `125`

      - `150`

      - `175`

      - `200`

      - `225`

      - `250`

      - `275`

      - `300`

      - `325`

      - `350`

      - `375`

      - `400`

      - `425`

      - `450`

      - `475`

      - `500`

      - `1000`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `MinTLSVersion object { id, value, editable, modified_on }`

    Only accepts HTTPS requests that use at least the TLS protocol version specified. For example, if TLS 1.1 is selected, TLS 1.0 connections will be rejected, while 1.1, 1.2, and 1.3 (if enabled) will be permitted.

    - `id: "min_tls_version"`

      ID of the zone setting.

      - `"min_tls_version"`

    - `value: "1.0" or "1.1" or "1.2" or "1.3"`

      Current value of the zone setting.

      - `"1.0"`

      - `"1.1"`

      - `"1.2"`

      - `"1.3"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasMirage object { id, value, editable, modified_on }`

    Automatically optimize image loading for website visitors on mobile
    devices. Refer to [our blog post](http://blog.cloudflare.com/mirage2-solving-mobile-speed)
    for more information.

    - `id: "mirage"`

      ID of the zone setting.

      - `"mirage"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `NEL object { id, value, editable, modified_on }`

    Enable Network Error Logging reporting on your zone. (Beta)

    - `id: "nel"`

      Zone setting identifier.

      - `"nel"`

    - `value: object { enabled }`

      Current value of the zone setting.

      - `enabled: optional boolean`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasOpportunisticEncryption object { id, value, editable, modified_on }`

    Enables the Opportunistic Encryption feature for a zone.

    - `id: "opportunistic_encryption"`

      ID of the zone setting.

      - `"opportunistic_encryption"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `OpportunisticOnion object { id, value, editable, modified_on }`

    Add an Alt-Svc header to all legitimate requests from Tor, allowing the connection to use our onion services instead of exit nodes.

    - `id: "opportunistic_onion"`

      ID of the zone setting.

      - `"opportunistic_onion"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `OrangeToOrange object { id, value, editable, modified_on }`

    Orange to Orange (O2O) allows zones on Cloudflare to CNAME to other zones also on Cloudflare.

    - `id: "orange_to_orange"`

      ID of the zone setting.

      - `"orange_to_orange"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasOriginErrorPagePassThru object { id, value, editable, modified_on }`

    Cloudflare will proxy customer error pages on any 502,504 errors on origin server instead of showing a default Cloudflare error page. This does not apply to 522 errors and is limited to Enterprise Zones.

    - `id: "origin_error_page_pass_thru"`

      ID of the zone setting.

      - `"origin_error_page_pass_thru"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesCacheRulesOriginH2MaxStreams object { id, modified_on, value }`

    Origin H2 Max Streams configures the max number of concurrent requests that Cloudflare will send within the same connection when communicating with the origin server, if the origin supports it. Note that if your origin does not support H2 multiplexing, 5xx errors may be observed, particularly 520s. Also note that the default value is `100` for all plan types except Enterprise where it is `1`. `1` means that H2 multiplexing is disabled.

    - `id: "origin_h2_max_streams"`

      Value of the zone setting.

      - `"origin_h2_max_streams"`

    - `modified_on: optional string`

      Last time this setting was modified.

    - `value: optional number`

      Value of the Origin H2 Max Streams Setting.

  - `ZonesCacheRulesOriginMaxHTTPVersion object { id, modified_on, value }`

    Origin Max HTTP Setting Version sets the highest HTTP version Cloudflare will attempt to use with your origin. This setting allows Cloudflare to make HTTP/2 requests to your origin. (Refer to [Enable HTTP/2 to Origin](https://developers.cloudflare.com/cache/how-to/enable-http2-to-origin/), for more information.). The default value is "2" for all plan types except Enterprise where it is "1".

    - `id: "origin_max_http_version"`

      Value of the zone setting.

      - `"origin_max_http_version"`

    - `modified_on: optional string`

      Last time this setting was modified.

    - `value: optional "2" or "1"`

      Value of the Origin Max HTTP Version Setting.

      - `"2"`

      - `"1"`

  - `ZonesSchemasPolish object { id, value, editable, modified_on }`

    Removes metadata and compresses your images for faster page load times. Basic (Lossless): Reduce the size of PNG, JPEG, and GIF files - no impact on visual quality. Basic + JPEG (Lossy): Further reduce the size of JPEG files for faster image loading. Larger JPEGs are converted to progressive images, loading a lower-resolution image first and ending in a higher-resolution version. Not recommended for hi-res photography sites.

    - `id: "polish"`

      ID of the zone setting.

      - `"polish"`

    - `value: "off" or "lossless" or "lossy"`

      Current value of the zone setting.

      - `"off"`

      - `"lossless"`

      - `"lossy"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `PrefetchPreload object { id, value, editable, modified_on }`

    Cloudflare will prefetch any URLs that are included in the response headers. This is limited to Enterprise Zones.

    - `id: "prefetch_preload"`

      ID of the zone setting.

      - `"prefetch_preload"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesPrivacyPass object { id, value, editable, modified_on }`

    Privacy Pass v1 was a browser extension developed by the Privacy Pass Team to improve the browsing experience for your visitors by allowing users to reduce the number of CAPTCHAs shown. (https://support.cloudflare.com/hc/en-us/articles/115001992652-Privacy-Pass).

    - `id: "privacy_pass"`

      ID of the zone setting.

      - `"privacy_pass"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ProxyReadTimeout object { id, value, editable, modified_on }`

    Maximum time between two read operations from origin.

    - `id: "proxy_read_timeout"`

      ID of the zone setting.

      - `"proxy_read_timeout"`

    - `value: number`

      Current value of the zone setting.

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `PseudoIPV4 object { id, value, editable, modified_on }`

    The value set for the Pseudo IPv4 setting.

    - `id: "pseudo_ipv4"`

      Value of the Pseudo IPv4 setting.

      - `"pseudo_ipv4"`

    - `value: "off" or "add_header" or "overwrite_header"`

      Current value of the zone setting.

      - `"off"`

      - `"add_header"`

      - `"overwrite_header"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesRedirectsForAITraining object { id, value, editable, modified_on }`

    When enabled, Cloudflare will redirect verified AI training crawlers to canonical URLs
    found in the HTML response, ensuring AI models train on authoritative content.

    - `id: "redirects_for_ai_training"`

      ID of the zone setting.

      - `"redirects_for_ai_training"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesReplaceInsecureJS object { id, value, editable, modified_on }`

    Automatically replace insecure JavaScript libraries with safer and faster alternatives provided under cdnjs and powered by Cloudflare. Currently supports the following libraries: Polyfill under polyfill.io.

    - `id: "replace_insecure_js"`

      ID of the zone setting.

      - `"replace_insecure_js"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasResponseBuffering object { id, value, editable, modified_on }`

    Enables or disables buffering of responses from the proxied server. Cloudflare may buffer the whole payload to deliver it at once to the client versus allowing it to be delivered in chunks. By default, the proxied server streams directly and is not buffered by Cloudflare. This is limited to Enterprise Zones.

    - `id: "response_buffering"`

      ID of the zone setting.

      - `"response_buffering"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasRocketLoader object { id, value, editable, modified_on }`

    Rocket Loader is a general-purpose asynchronous JavaScript optimisation that prioritises rendering your content while loading your site's Javascript asynchronously. Turning on Rocket Loader will immediately improve a web page's rendering time sometimes measured as Time to First Paint (TTFP), and also the `window.onload` time (assuming there is JavaScript on the page). This can have a positive impact on your Google search ranking. When turned on, Rocket Loader will automatically defer the loading of all Javascript referenced in your HTML, with no configuration required. Refer to [Understanding Rocket Loader](https://support.cloudflare.com/hc/articles/200168056) for more information.

    - `id: "rocket_loader"`

      ID of the zone setting.

      - `"rocket_loader"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasAutomaticPlatformOptimization object { id, value, editable, modified_on }`

    [Automatic Platform Optimization for WordPress](https://developers.cloudflare.com/automatic-platform-optimization/) serves your WordPress site from Cloudflare's edge network and caches third-party fonts.

    - `id: "automatic_platform_optimization"`

      ID of the zone setting.

      - `"automatic_platform_optimization"`

    - `value: AutomaticPlatformOptimization`

      Current value of the zone setting.

      - `cache_by_device_type: boolean`

        Indicates whether or not [cache by device type](https://developers.cloudflare.com/automatic-platform-optimization/reference/cache-device-type/) is enabled.

      - `cf: boolean`

        Indicates whether or not Cloudflare proxy is enabled.

      - `enabled: boolean`

        Indicates whether or not Automatic Platform Optimization is enabled.

      - `hostnames: array of string`

        An array of hostnames where Automatic Platform Optimization for WordPress is activated.

      - `wordpress: boolean`

        Indicates whether or not site is powered by WordPress.

      - `wp_plugin: boolean`

        Indicates whether or not [Cloudflare for WordPress plugin](https://wordpress.org/plugins/cloudflare/) is installed.

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSearchForAgents object { id, value, editable, modified_on }`

    When enabled, Cloudflare provisions an AI Search instance for the zone
    and exposes a /.well-known/ai-search endpoint that AI agents can query.
    Markdown responses also receive an agent: YAML capability block advertising
    the search endpoint.

    - `id: "search_for_agents"`

      ID of the zone setting.

      - `"search_for_agents"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `SecurityHeaders object { id, value, editable, modified_on }`

    Cloudflare security header for a zone.

    - `id: "security_header"`

      ID of the zone's security header.

      - `"security_header"`

    - `value: object { strict_transport_security }`

      Current value of the zone setting.

      - `strict_transport_security: optional object { enabled, include_subdomains, max_age, 2 more }`

        Strict Transport Security.

        - `enabled: optional boolean`

          Whether or not strict transport security is enabled.

        - `include_subdomains: optional boolean`

          Include all subdomains for strict transport security.

        - `max_age: optional number`

          Max age in seconds of the strict transport security.

        - `nosniff: optional boolean`

          Whether or not to include 'X-Content-Type-Options: nosniff' header.

        - `preload: optional boolean`

          Enable automatic preload of the HSTS configuration.

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasSecurityLevel object { id, value, editable, modified_on }`

    Choose the appropriate security profile for your website, which will automatically adjust each of the security settings. If you choose to customize an individual security setting, the profile will become Custom. (https://support.cloudflare.com/hc/en-us/articles/200170056).

    - `id: "security_level"`

      ID of the zone setting.

      - `"security_level"`

    - `value: "off" or "essentially_off" or "low" or 3 more`

      Current value of the zone setting.

      - `"off"`

      - `"essentially_off"`

      - `"low"`

      - `"medium"`

      - `"high"`

      - `"under_attack"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ServerSideExcludes object { id, value, editable, modified_on }`

    If there is sensitive content on your website that you want visible to real visitors, but that you want to hide from suspicious visitors, all you have to do is wrap the content with Cloudflare SSE tags. Wrap any content that you want to be excluded from suspicious visitors in the following SSE tags: <!--sse--><!--/sse-->. For example: <!--sse-->  Bad visitors won't see my phone number, 555-555-5555 <!--/sse-->. Note: SSE only will work with HTML. If you have HTML minification enabled, you won't see the SSE tags in your HTML source when it's served through Cloudflare. SSE will still function in this case, as Cloudflare's HTML minification and SSE functionality occur on-the-fly as the resource moves through our network to the visitor's computer. (https://support.cloudflare.com/hc/en-us/articles/200170036).

    - `id: "server_side_exclude"`

      ID of the zone setting.

      - `"server_side_exclude"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSha1Support object { id, value, editable, modified_on }`

    Allow SHA1 support.

    - `id: "sha1_support"`

      Zone setting identifier.

      - `"sha1_support"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasSortQueryStringForCache object { id, value, editable, modified_on }`

    Cloudflare will treat files with the same query strings as the same file in cache, regardless of the order of the query strings. This is limited to Enterprise Zones.

    - `id: "sort_query_string_for_cache"`

      ID of the zone setting.

      - `"sort_query_string_for_cache"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasSSL object { id, value, editable, modified_on }`

    SSL encrypts your visitor's connection and safeguards credit card numbers and other personal data to and from your website. SSL can take up to 5 minutes to fully activate. Requires Cloudflare active on your root domain or www domain. Off: no SSL between the visitor and Cloudflare, and no SSL between Cloudflare and your web server  (all HTTP traffic). Flexible: SSL between the visitor and Cloudflare -- visitor sees HTTPS on your site, but no SSL between Cloudflare and your web server. You don't need to have an SSL cert on your web server, but your vistors will still see the site as being HTTPS enabled. Full:  SSL between the visitor and Cloudflare -- visitor sees HTTPS on your site, and SSL between Cloudflare and your web server. You'll need to have your own SSL cert or self-signed cert at the very least. Full (Strict): SSL between the visitor and Cloudflare -- visitor sees HTTPS on your site, and SSL between Cloudflare and your web server. You'll need to have a valid SSL certificate installed on your web server. This certificate must be signed by a certificate authority, have an expiration date in the future, and respond for the request domain name (hostname). (https://support.cloudflare.com/hc/en-us/articles/200170416).

    - `id: "ssl"`

      ID of the zone setting.

      - `"ssl"`

    - `value: "off" or "flexible" or "full" or "strict"`

      Current value of the zone setting.

      - `"off"`

      - `"flexible"`

      - `"full"`

      - `"strict"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `SSLRecommender object { id, enabled }`

    Enrollment in the SSL/TLS Recommender service which tries to detect and recommend (by sending periodic emails) the most secure SSL/TLS setting your origin servers support.

    - `id: optional "ssl_recommender"`

      Enrollment value for SSL/TLS Recommender.

      - `"ssl_recommender"`

    - `enabled: optional boolean`

      ssl-recommender enrollment setting.

  - `ZonesTLS1_2Only object { id, value, editable, modified_on }`

    Only allows TLS1.2.

    - `id: "tls_1_2_only"`

      Zone setting identifier.

      - `"tls_1_2_only"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `TLS1_3 object { id, value, editable, modified_on }`

    Enables Crypto TLS 1.3 feature for a zone.

    - `id: "tls_1_3"`

      ID of the zone setting.

      - `"tls_1_3"`

    - `value: "on" or "off" or "zrt"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

      - `"zrt"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `TLSClientAuth object { id, value, editable, modified_on }`

    TLS Client Auth requires Cloudflare to connect to your origin server using a client certificate (Enterprise Only).

    - `id: "tls_client_auth"`

      ID of the zone setting.

      - `"tls_client_auth"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesTransformations object { id, value, editable, modified_on }`

    Media Transformations provides on-demand resizing, conversion and optimization for images and video served through Cloudflare's network. Refer to the [Image Transformations](https://developers.cloudflare.com/images/) and [Video Transformations](https://developers.cloudflare.com/stream/transform-videos/#getting-started) documentation for more information.

    - `id: "transformations"`

      ID of the zone setting. Shared between Image Transformations and Video Transformations.

      - `"transformations"`

    - `value: "on" or "off" or "open"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

      - `"open"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesTransformationsAllowedOrigins object { id, value, editable, modified_on }`

    Media Transformations Allowed Origins restricts transformations for images and video served through Cloudflare's network. Refer to the [Image Transformations](https://developers.cloudflare.com/images/) and [Video Transformations](https://developers.cloudflare.com/stream/transform-videos/#getting-started) documentation for more information.

    - `id: "transformations_allowed_origins"`

      ID of the zone setting. Shared between Image Transformations and Video Transformations.

      - `"transformations_allowed_origins"`

    - `value: string`

      Current value of the zone setting.

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasTrueClientIPHeader object { id, value, editable, modified_on }`

    Allows customer to continue to use True Client IP (Akamai feature) in the headers we send to the origin. This is limited to Enterprise Zones.

    - `id: "true_client_ip_header"`

      ID of the zone setting.

      - `"true_client_ip_header"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasWAF object { id, value, editable, modified_on }`

    The WAF examines HTTP requests to your website.  It inspects both GET and POST requests and applies rules to help filter out illegitimate traffic from legitimate website visitors. The Cloudflare WAF inspects website addresses or URLs to detect anything out of the ordinary. If the Cloudflare WAF determines suspicious user behavior, then the WAF will 'challenge' the web visitor with a page that asks them to submit a CAPTCHA successfully  to continue their action. If the challenge is failed, the action will be stopped. What this means is that Cloudflare's WAF will block any traffic identified as illegitimate before it reaches your origin web server. (https://support.cloudflare.com/hc/en-us/articles/200172016).

    - `id: "waf"`

      ID of the zone setting.

      - `"waf"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `WebP object { id, value, editable, modified_on }`

    When the client requesting the image supports the WebP image codec, and WebP offers a performance advantage over the original image format, Cloudflare will serve a WebP version of the original image.

    - `id: "webp"`

      ID of the zone setting.

      - `"webp"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `Websocket object { id, value, editable, modified_on }`

    WebSockets are open connections sustained between the client and the origin server. Inside a WebSockets connection, the client and the origin can pass data back and forth without having to reestablish sessions. This makes exchanging data within a WebSockets connection fast. WebSockets are often used for real-time applications such as live chat and gaming. For more information refer to [Can I use Cloudflare with Websockets](https://support.cloudflare.com/hc/en-us/articles/200169466-Can-I-use-Cloudflare-with-WebSockets-).

    - `id: "websockets"`

      ID of the zone setting.

      - `"websockets"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

### Setting Edit Response

- `SettingEditResponse = ZeroRTT or AdvancedDDoS or object { id, modified_on, value }  or 60 more`

  0-RTT session resumption enabled for this zone.

  - `ZeroRTT object { id, value, editable, modified_on }`

    0-RTT session resumption enabled for this zone.

    - `id: "0rtt"`

      ID of the zone setting.

      - `"0rtt"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `AdvancedDDoS object { id, value, editable, modified_on }`

    Advanced protection from Distributed Denial of Service (DDoS) attacks on your website. This is an uneditable value that is 'on' in the case of Business and Enterprise zones.

    - `id: "advanced_ddos"`

      ID of the zone setting.

      - `"advanced_ddos"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesCacheRulesAegis object { id, modified_on, value }`

    Aegis provides dedicated egress IPs (from Cloudflare to your origin) for your layer 7 WAF and CDN services. The egress IPs are reserved exclusively for your account so that you can increase your origin security by only allowing traffic from a small list of IP addresses.

    - `id: "aegis"`

      ID of the zone setting.

      - `"aegis"`

    - `modified_on: optional string`

      Last time this setting was modified.

    - `value: optional object { enabled, pool_id }`

      Value of the zone setting.

      - `enabled: optional boolean`

        Whether the feature is enabled or not.

      - `pool_id: optional string`

        Egress pool id which refers to a grouping of dedicated egress IPs through which Cloudflare will connect to origin.

  - `AlwaysOnline object { id, value, editable, modified_on }`

    When enabled, Cloudflare serves limited copies of web pages available from the [Internet Archive's Wayback Machine](https://archive.org/web/) if your server is offline. Refer to [Always Online](https://developers.cloudflare.com/cache/about/always-online) for more information.

    - `id: "always_online"`

      ID of the zone setting.

      - `"always_online"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasAlwaysUseHTTPS object { id, value, editable, modified_on }`

    Reply to all requests for URLs that use "http" with a 301 redirect to the equivalent "https" URL. If you only want to redirect for a subset of requests, consider creating an "Always use HTTPS" page rule.

    - `id: "always_use_https"`

      ID of the zone setting.

      - `"always_use_https"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasAutomaticHTTPSRewrites object { id, value, editable, modified_on }`

    Enable the Automatic HTTPS Rewrites feature for this zone.

    - `id: "automatic_https_rewrites"`

      ID of the zone setting.

      - `"automatic_https_rewrites"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `Brotli object { id, value, editable, modified_on }`

    When the client requesting an asset supports the Brotli compression algorithm, Cloudflare will serve a Brotli compressed version of the asset.

    - `id: "brotli"`

      ID of the zone setting.

      - `"brotli"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasBrowserCacheTTL object { id, value, editable, modified_on }`

    Browser Cache TTL (in seconds) specifies how long Cloudflare-cached resources will remain on your visitors' computers. Cloudflare will honor any larger times specified by your server. (https://support.cloudflare.com/hc/en-us/articles/200168276).

    - `id: "browser_cache_ttl"`

      ID of the zone setting.

      - `"browser_cache_ttl"`

    - `value: number`

      Current value of the zone setting.

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasBrowserCheck object { id, value, editable, modified_on }`

    Browser Integrity Check is similar to Bad Behavior and looks for common HTTP headers abused most commonly by spammers and denies access to your page.  It will also challenge visitors that do not have a user agent or a non standard user agent (also commonly used by abuse bots, crawlers or visitors). (https://support.cloudflare.com/hc/en-us/articles/200170086).

    - `id: "browser_check"`

      ID of the zone setting.

      - `"browser_check"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasCacheLevel object { id, value, editable, modified_on }`

    Cache Level functions based off the setting level. The basic setting will cache most static resources (i.e., css, images, and JavaScript). The simplified setting will ignore the query string when delivering a cached resource. The aggressive setting will cache all static resources, including ones with a query string. (https://support.cloudflare.com/hc/en-us/articles/200168256).

    - `id: "cache_level"`

      ID of the zone setting.

      - `"cache_level"`

    - `value: "aggressive" or "basic" or "simplified"`

      Current value of the zone setting.

      - `"aggressive"`

      - `"basic"`

      - `"simplified"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ChallengeTTL object { id, value, editable, modified_on }`

    Specify how long a visitor is allowed access to your site after successfully completing a challenge (such as a CAPTCHA). After the TTL has expired the visitor will have to complete a new challenge. We recommend a 15 - 45 minute setting and will attempt to honor any setting above 45 minutes. (https://support.cloudflare.com/hc/en-us/articles/200170136).

    - `id: "challenge_ttl"`

      ID of the zone setting.

      - `"challenge_ttl"`

    - `value: 300 or 900 or 1800 or 11 more`

      Current value of the zone setting.

      - `300`

      - `900`

      - `1800`

      - `2700`

      - `3600`

      - `7200`

      - `10800`

      - `14400`

      - `28800`

      - `57600`

      - `86400`

      - `604800`

      - `2592000`

      - `31536000`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesChinaNetworkEnabled object { id, value, editable, modified_on }`

    Determines whether or not the china network is enabled.

    - `id: "china_network_enabled"`

      ID of the zone setting.

      - `"china_network_enabled"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesContentConverter object { id, value, editable, modified_on }`

    When enabled and the client sends an Accept header requesting text/markdown,
    Cloudflare will convert HTML responses to Markdown format using the toMarkdown() service.
    Refer to the [developer documentation](https://developers.cloudflare.com/workers-ai/features/markdown-conversion/) for more information.

    - `id: "content_converter"`

      ID of the zone setting.

      - `"content_converter"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `Ciphers object { id, value, editable, modified_on }`

    An allowlist of ciphers for TLS termination. These ciphers must be in the BoringSSL format.

    - `id: "ciphers"`

      ID of the zone setting.

      - `"ciphers"`

    - `value: array of string`

      Current value of the zone setting.

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesCNAMEFlattening object { id, value, editable, modified_on }`

    Whether or not cname flattening is on.

    - `id: "cname_flattening"`

      How to flatten the cname destination.

      - `"cname_flattening"`

    - `value: "flatten_at_root" or "flatten_all"`

      Current value of the zone setting.

      - `"flatten_at_root"`

      - `"flatten_all"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `DevelopmentMode object { id, value, editable, 2 more }`

    Development Mode temporarily allows you to enter development mode for your websites if you need to make changes to your site. This will bypass Cloudflare's accelerated cache and slow down your site, but is useful if you are making changes to cacheable content (like images, css, or JavaScript) and would like to see those changes right away. Once entered, development mode will last for 3 hours and then automatically toggle off.

    - `id: "development_mode"`

      ID of the zone setting.

      - `"development_mode"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

    - `time_remaining: optional number`

      Value of the zone setting.
      Notes: The interval (in seconds) from when development mode expires (positive integer) or last expired (negative integer) for the domain. If development mode has never been enabled, this value is false.

  - `EarlyHints object { id, value, editable, modified_on }`

    When enabled, Cloudflare will attempt to speed up overall page loads by serving `103` responses with `Link` headers from the final response. Refer to [Early Hints](https://developers.cloudflare.com/cache/about/early-hints) for more information.

    - `id: "early_hints"`

      ID of the zone setting.

      - `"early_hints"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasEdgeCacheTTL object { id, value, editable, modified_on }`

    Time (in seconds) that a resource will be ensured to remain on Cloudflare's cache servers.

    - `id: "edge_cache_ttl"`

      ID of the zone setting.

      - `"edge_cache_ttl"`

    - `value: 30 or 60 or 300 or 18 more`

      Current value of the zone setting.

      - `30`

      - `60`

      - `300`

      - `1200`

      - `1800`

      - `3600`

      - `7200`

      - `10800`

      - `14400`

      - `18000`

      - `28800`

      - `43200`

      - `57600`

      - `72000`

      - `86400`

      - `172800`

      - `259200`

      - `345600`

      - `432000`

      - `518400`

      - `604800`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasEmailObfuscation object { id, value, editable, modified_on }`

    Encrypt email adresses on your web page from bots, while keeping them visible to humans. (https://support.cloudflare.com/hc/en-us/articles/200170016).

    - `id: "email_obfuscation"`

      ID of the zone setting.

      - `"email_obfuscation"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `H2Prioritization object { id, value, editable, modified_on }`

    HTTP/2 Edge Prioritization optimises the delivery of resources served through HTTP/2 to improve page load performance. It also supports fine control of content delivery when used in conjunction with Workers.

    - `id: "h2_prioritization"`

      ID of the zone setting.

      - `"h2_prioritization"`

    - `value: "on" or "off" or "custom"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

      - `"custom"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `HotlinkProtection object { id, value, editable, modified_on }`

    When enabled, the Hotlink Protection option ensures that other sites cannot suck up your bandwidth by building pages that use images hosted on your site. Anytime a request for an image on your site hits Cloudflare, we check to ensure that it's not another site requesting them. People will still be able to download and view images from your page, but other sites won't be able to steal them for use on their own pages. (https://support.cloudflare.com/hc/en-us/articles/200170026).

    - `id: "hotlink_protection"`

      ID of the zone setting.

      - `"hotlink_protection"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `HTTP2 object { id, value, editable, modified_on }`

    HTTP2 enabled for this zone.

    - `id: "http2"`

      ID of the zone setting.

      - `"http2"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `HTTP3 object { id, value, editable, modified_on }`

    HTTP3 enabled for this zone.

    - `id: "http3"`

      ID of the zone setting.

      - `"http3"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ImageResizing object { id, value, editable, modified_on }`

    Image Transformations provides on-demand resizing, conversion and optimization for images served through Cloudflare's network. Refer to the [Image Transformations documentation](https://developers.cloudflare.com/images/) for more information.

    - `id: "image_resizing"`

      ID of the zone setting.

      - `"image_resizing"`

    - `value: "on" or "off" or "open"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

      - `"open"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasIPGeolocation object { id, value, editable, modified_on }`

    Enable IP Geolocation to have Cloudflare geolocate visitors to your website and pass the country code to you. (https://support.cloudflare.com/hc/en-us/articles/200168236).

    - `id: "ip_geolocation"`

      ID of the zone setting.

      - `"ip_geolocation"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `IPV6 object { id, value, editable, modified_on }`

    Enable IPv6 on all subdomains that are Cloudflare enabled.  (https://support.cloudflare.com/hc/en-us/articles/200168586).

    - `id: "ipv6"`

      ID of the zone setting.

      - `"ipv6"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesMaxUpload object { id, value, editable, modified_on }`

    Maximum size of an allowable upload.

    - `id: "max_upload"`

      identifier of the zone setting.

      - `"max_upload"`

    - `value: 100 or 125 or 150 or 15 more`

      Current value of the zone setting.

      - `100`

      - `125`

      - `150`

      - `175`

      - `200`

      - `225`

      - `250`

      - `275`

      - `300`

      - `325`

      - `350`

      - `375`

      - `400`

      - `425`

      - `450`

      - `475`

      - `500`

      - `1000`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `MinTLSVersion object { id, value, editable, modified_on }`

    Only accepts HTTPS requests that use at least the TLS protocol version specified. For example, if TLS 1.1 is selected, TLS 1.0 connections will be rejected, while 1.1, 1.2, and 1.3 (if enabled) will be permitted.

    - `id: "min_tls_version"`

      ID of the zone setting.

      - `"min_tls_version"`

    - `value: "1.0" or "1.1" or "1.2" or "1.3"`

      Current value of the zone setting.

      - `"1.0"`

      - `"1.1"`

      - `"1.2"`

      - `"1.3"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasMirage object { id, value, editable, modified_on }`

    Automatically optimize image loading for website visitors on mobile
    devices. Refer to [our blog post](http://blog.cloudflare.com/mirage2-solving-mobile-speed)
    for more information.

    - `id: "mirage"`

      ID of the zone setting.

      - `"mirage"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `NEL object { id, value, editable, modified_on }`

    Enable Network Error Logging reporting on your zone. (Beta)

    - `id: "nel"`

      Zone setting identifier.

      - `"nel"`

    - `value: object { enabled }`

      Current value of the zone setting.

      - `enabled: optional boolean`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasOpportunisticEncryption object { id, value, editable, modified_on }`

    Enables the Opportunistic Encryption feature for a zone.

    - `id: "opportunistic_encryption"`

      ID of the zone setting.

      - `"opportunistic_encryption"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `OpportunisticOnion object { id, value, editable, modified_on }`

    Add an Alt-Svc header to all legitimate requests from Tor, allowing the connection to use our onion services instead of exit nodes.

    - `id: "opportunistic_onion"`

      ID of the zone setting.

      - `"opportunistic_onion"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `OrangeToOrange object { id, value, editable, modified_on }`

    Orange to Orange (O2O) allows zones on Cloudflare to CNAME to other zones also on Cloudflare.

    - `id: "orange_to_orange"`

      ID of the zone setting.

      - `"orange_to_orange"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasOriginErrorPagePassThru object { id, value, editable, modified_on }`

    Cloudflare will proxy customer error pages on any 502,504 errors on origin server instead of showing a default Cloudflare error page. This does not apply to 522 errors and is limited to Enterprise Zones.

    - `id: "origin_error_page_pass_thru"`

      ID of the zone setting.

      - `"origin_error_page_pass_thru"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesCacheRulesOriginH2MaxStreams object { id, modified_on, value }`

    Origin H2 Max Streams configures the max number of concurrent requests that Cloudflare will send within the same connection when communicating with the origin server, if the origin supports it. Note that if your origin does not support H2 multiplexing, 5xx errors may be observed, particularly 520s. Also note that the default value is `100` for all plan types except Enterprise where it is `1`. `1` means that H2 multiplexing is disabled.

    - `id: "origin_h2_max_streams"`

      Value of the zone setting.

      - `"origin_h2_max_streams"`

    - `modified_on: optional string`

      Last time this setting was modified.

    - `value: optional number`

      Value of the Origin H2 Max Streams Setting.

  - `ZonesCacheRulesOriginMaxHTTPVersion object { id, modified_on, value }`

    Origin Max HTTP Setting Version sets the highest HTTP version Cloudflare will attempt to use with your origin. This setting allows Cloudflare to make HTTP/2 requests to your origin. (Refer to [Enable HTTP/2 to Origin](https://developers.cloudflare.com/cache/how-to/enable-http2-to-origin/), for more information.). The default value is "2" for all plan types except Enterprise where it is "1".

    - `id: "origin_max_http_version"`

      Value of the zone setting.

      - `"origin_max_http_version"`

    - `modified_on: optional string`

      Last time this setting was modified.

    - `value: optional "2" or "1"`

      Value of the Origin Max HTTP Version Setting.

      - `"2"`

      - `"1"`

  - `ZonesSchemasPolish object { id, value, editable, modified_on }`

    Removes metadata and compresses your images for faster page load times. Basic (Lossless): Reduce the size of PNG, JPEG, and GIF files - no impact on visual quality. Basic + JPEG (Lossy): Further reduce the size of JPEG files for faster image loading. Larger JPEGs are converted to progressive images, loading a lower-resolution image first and ending in a higher-resolution version. Not recommended for hi-res photography sites.

    - `id: "polish"`

      ID of the zone setting.

      - `"polish"`

    - `value: "off" or "lossless" or "lossy"`

      Current value of the zone setting.

      - `"off"`

      - `"lossless"`

      - `"lossy"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `PrefetchPreload object { id, value, editable, modified_on }`

    Cloudflare will prefetch any URLs that are included in the response headers. This is limited to Enterprise Zones.

    - `id: "prefetch_preload"`

      ID of the zone setting.

      - `"prefetch_preload"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesPrivacyPass object { id, value, editable, modified_on }`

    Privacy Pass v1 was a browser extension developed by the Privacy Pass Team to improve the browsing experience for your visitors by allowing users to reduce the number of CAPTCHAs shown. (https://support.cloudflare.com/hc/en-us/articles/115001992652-Privacy-Pass).

    - `id: "privacy_pass"`

      ID of the zone setting.

      - `"privacy_pass"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ProxyReadTimeout object { id, value, editable, modified_on }`

    Maximum time between two read operations from origin.

    - `id: "proxy_read_timeout"`

      ID of the zone setting.

      - `"proxy_read_timeout"`

    - `value: number`

      Current value of the zone setting.

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `PseudoIPV4 object { id, value, editable, modified_on }`

    The value set for the Pseudo IPv4 setting.

    - `id: "pseudo_ipv4"`

      Value of the Pseudo IPv4 setting.

      - `"pseudo_ipv4"`

    - `value: "off" or "add_header" or "overwrite_header"`

      Current value of the zone setting.

      - `"off"`

      - `"add_header"`

      - `"overwrite_header"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesRedirectsForAITraining object { id, value, editable, modified_on }`

    When enabled, Cloudflare will redirect verified AI training crawlers to canonical URLs
    found in the HTML response, ensuring AI models train on authoritative content.

    - `id: "redirects_for_ai_training"`

      ID of the zone setting.

      - `"redirects_for_ai_training"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesReplaceInsecureJS object { id, value, editable, modified_on }`

    Automatically replace insecure JavaScript libraries with safer and faster alternatives provided under cdnjs and powered by Cloudflare. Currently supports the following libraries: Polyfill under polyfill.io.

    - `id: "replace_insecure_js"`

      ID of the zone setting.

      - `"replace_insecure_js"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasResponseBuffering object { id, value, editable, modified_on }`

    Enables or disables buffering of responses from the proxied server. Cloudflare may buffer the whole payload to deliver it at once to the client versus allowing it to be delivered in chunks. By default, the proxied server streams directly and is not buffered by Cloudflare. This is limited to Enterprise Zones.

    - `id: "response_buffering"`

      ID of the zone setting.

      - `"response_buffering"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasRocketLoader object { id, value, editable, modified_on }`

    Rocket Loader is a general-purpose asynchronous JavaScript optimisation that prioritises rendering your content while loading your site's Javascript asynchronously. Turning on Rocket Loader will immediately improve a web page's rendering time sometimes measured as Time to First Paint (TTFP), and also the `window.onload` time (assuming there is JavaScript on the page). This can have a positive impact on your Google search ranking. When turned on, Rocket Loader will automatically defer the loading of all Javascript referenced in your HTML, with no configuration required. Refer to [Understanding Rocket Loader](https://support.cloudflare.com/hc/articles/200168056) for more information.

    - `id: "rocket_loader"`

      ID of the zone setting.

      - `"rocket_loader"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasAutomaticPlatformOptimization object { id, value, editable, modified_on }`

    [Automatic Platform Optimization for WordPress](https://developers.cloudflare.com/automatic-platform-optimization/) serves your WordPress site from Cloudflare's edge network and caches third-party fonts.

    - `id: "automatic_platform_optimization"`

      ID of the zone setting.

      - `"automatic_platform_optimization"`

    - `value: AutomaticPlatformOptimization`

      Current value of the zone setting.

      - `cache_by_device_type: boolean`

        Indicates whether or not [cache by device type](https://developers.cloudflare.com/automatic-platform-optimization/reference/cache-device-type/) is enabled.

      - `cf: boolean`

        Indicates whether or not Cloudflare proxy is enabled.

      - `enabled: boolean`

        Indicates whether or not Automatic Platform Optimization is enabled.

      - `hostnames: array of string`

        An array of hostnames where Automatic Platform Optimization for WordPress is activated.

      - `wordpress: boolean`

        Indicates whether or not site is powered by WordPress.

      - `wp_plugin: boolean`

        Indicates whether or not [Cloudflare for WordPress plugin](https://wordpress.org/plugins/cloudflare/) is installed.

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSearchForAgents object { id, value, editable, modified_on }`

    When enabled, Cloudflare provisions an AI Search instance for the zone
    and exposes a /.well-known/ai-search endpoint that AI agents can query.
    Markdown responses also receive an agent: YAML capability block advertising
    the search endpoint.

    - `id: "search_for_agents"`

      ID of the zone setting.

      - `"search_for_agents"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `SecurityHeaders object { id, value, editable, modified_on }`

    Cloudflare security header for a zone.

    - `id: "security_header"`

      ID of the zone's security header.

      - `"security_header"`

    - `value: object { strict_transport_security }`

      Current value of the zone setting.

      - `strict_transport_security: optional object { enabled, include_subdomains, max_age, 2 more }`

        Strict Transport Security.

        - `enabled: optional boolean`

          Whether or not strict transport security is enabled.

        - `include_subdomains: optional boolean`

          Include all subdomains for strict transport security.

        - `max_age: optional number`

          Max age in seconds of the strict transport security.

        - `nosniff: optional boolean`

          Whether or not to include 'X-Content-Type-Options: nosniff' header.

        - `preload: optional boolean`

          Enable automatic preload of the HSTS configuration.

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasSecurityLevel object { id, value, editable, modified_on }`

    Choose the appropriate security profile for your website, which will automatically adjust each of the security settings. If you choose to customize an individual security setting, the profile will become Custom. (https://support.cloudflare.com/hc/en-us/articles/200170056).

    - `id: "security_level"`

      ID of the zone setting.

      - `"security_level"`

    - `value: "off" or "essentially_off" or "low" or 3 more`

      Current value of the zone setting.

      - `"off"`

      - `"essentially_off"`

      - `"low"`

      - `"medium"`

      - `"high"`

      - `"under_attack"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ServerSideExcludes object { id, value, editable, modified_on }`

    If there is sensitive content on your website that you want visible to real visitors, but that you want to hide from suspicious visitors, all you have to do is wrap the content with Cloudflare SSE tags. Wrap any content that you want to be excluded from suspicious visitors in the following SSE tags: <!--sse--><!--/sse-->. For example: <!--sse-->  Bad visitors won't see my phone number, 555-555-5555 <!--/sse-->. Note: SSE only will work with HTML. If you have HTML minification enabled, you won't see the SSE tags in your HTML source when it's served through Cloudflare. SSE will still function in this case, as Cloudflare's HTML minification and SSE functionality occur on-the-fly as the resource moves through our network to the visitor's computer. (https://support.cloudflare.com/hc/en-us/articles/200170036).

    - `id: "server_side_exclude"`

      ID of the zone setting.

      - `"server_side_exclude"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSha1Support object { id, value, editable, modified_on }`

    Allow SHA1 support.

    - `id: "sha1_support"`

      Zone setting identifier.

      - `"sha1_support"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasSortQueryStringForCache object { id, value, editable, modified_on }`

    Cloudflare will treat files with the same query strings as the same file in cache, regardless of the order of the query strings. This is limited to Enterprise Zones.

    - `id: "sort_query_string_for_cache"`

      ID of the zone setting.

      - `"sort_query_string_for_cache"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasSSL object { id, value, editable, modified_on }`

    SSL encrypts your visitor's connection and safeguards credit card numbers and other personal data to and from your website. SSL can take up to 5 minutes to fully activate. Requires Cloudflare active on your root domain or www domain. Off: no SSL between the visitor and Cloudflare, and no SSL between Cloudflare and your web server  (all HTTP traffic). Flexible: SSL between the visitor and Cloudflare -- visitor sees HTTPS on your site, but no SSL between Cloudflare and your web server. You don't need to have an SSL cert on your web server, but your vistors will still see the site as being HTTPS enabled. Full:  SSL between the visitor and Cloudflare -- visitor sees HTTPS on your site, and SSL between Cloudflare and your web server. You'll need to have your own SSL cert or self-signed cert at the very least. Full (Strict): SSL between the visitor and Cloudflare -- visitor sees HTTPS on your site, and SSL between Cloudflare and your web server. You'll need to have a valid SSL certificate installed on your web server. This certificate must be signed by a certificate authority, have an expiration date in the future, and respond for the request domain name (hostname). (https://support.cloudflare.com/hc/en-us/articles/200170416).

    - `id: "ssl"`

      ID of the zone setting.

      - `"ssl"`

    - `value: "off" or "flexible" or "full" or "strict"`

      Current value of the zone setting.

      - `"off"`

      - `"flexible"`

      - `"full"`

      - `"strict"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `SSLRecommender object { id, enabled }`

    Enrollment in the SSL/TLS Recommender service which tries to detect and recommend (by sending periodic emails) the most secure SSL/TLS setting your origin servers support.

    - `id: optional "ssl_recommender"`

      Enrollment value for SSL/TLS Recommender.

      - `"ssl_recommender"`

    - `enabled: optional boolean`

      ssl-recommender enrollment setting.

  - `ZonesTLS1_2Only object { id, value, editable, modified_on }`

    Only allows TLS1.2.

    - `id: "tls_1_2_only"`

      Zone setting identifier.

      - `"tls_1_2_only"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `TLS1_3 object { id, value, editable, modified_on }`

    Enables Crypto TLS 1.3 feature for a zone.

    - `id: "tls_1_3"`

      ID of the zone setting.

      - `"tls_1_3"`

    - `value: "on" or "off" or "zrt"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

      - `"zrt"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `TLSClientAuth object { id, value, editable, modified_on }`

    TLS Client Auth requires Cloudflare to connect to your origin server using a client certificate (Enterprise Only).

    - `id: "tls_client_auth"`

      ID of the zone setting.

      - `"tls_client_auth"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesTransformations object { id, value, editable, modified_on }`

    Media Transformations provides on-demand resizing, conversion and optimization for images and video served through Cloudflare's network. Refer to the [Image Transformations](https://developers.cloudflare.com/images/) and [Video Transformations](https://developers.cloudflare.com/stream/transform-videos/#getting-started) documentation for more information.

    - `id: "transformations"`

      ID of the zone setting. Shared between Image Transformations and Video Transformations.

      - `"transformations"`

    - `value: "on" or "off" or "open"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

      - `"open"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesTransformationsAllowedOrigins object { id, value, editable, modified_on }`

    Media Transformations Allowed Origins restricts transformations for images and video served through Cloudflare's network. Refer to the [Image Transformations](https://developers.cloudflare.com/images/) and [Video Transformations](https://developers.cloudflare.com/stream/transform-videos/#getting-started) documentation for more information.

    - `id: "transformations_allowed_origins"`

      ID of the zone setting. Shared between Image Transformations and Video Transformations.

      - `"transformations_allowed_origins"`

    - `value: string`

      Current value of the zone setting.

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasTrueClientIPHeader object { id, value, editable, modified_on }`

    Allows customer to continue to use True Client IP (Akamai feature) in the headers we send to the origin. This is limited to Enterprise Zones.

    - `id: "true_client_ip_header"`

      ID of the zone setting.

      - `"true_client_ip_header"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasWAF object { id, value, editable, modified_on }`

    The WAF examines HTTP requests to your website.  It inspects both GET and POST requests and applies rules to help filter out illegitimate traffic from legitimate website visitors. The Cloudflare WAF inspects website addresses or URLs to detect anything out of the ordinary. If the Cloudflare WAF determines suspicious user behavior, then the WAF will 'challenge' the web visitor with a page that asks them to submit a CAPTCHA successfully  to continue their action. If the challenge is failed, the action will be stopped. What this means is that Cloudflare's WAF will block any traffic identified as illegitimate before it reaches your origin web server. (https://support.cloudflare.com/hc/en-us/articles/200172016).

    - `id: "waf"`

      ID of the zone setting.

      - `"waf"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `WebP object { id, value, editable, modified_on }`

    When the client requesting the image supports the WebP image codec, and WebP offers a performance advantage over the original image format, Cloudflare will serve a WebP version of the original image.

    - `id: "webp"`

      ID of the zone setting.

      - `"webp"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `Websocket object { id, value, editable, modified_on }`

    WebSockets are open connections sustained between the client and the origin server. Inside a WebSockets connection, the client and the origin can pass data back and forth without having to reestablish sessions. This makes exchanging data within a WebSockets connection fast. WebSockets are often used for real-time applications such as live chat and gaming. For more information refer to [Can I use Cloudflare with Websockets](https://support.cloudflare.com/hc/en-us/articles/200169466-Can-I-use-Cloudflare-with-WebSockets-).

    - `id: "websockets"`

      ID of the zone setting.

      - `"websockets"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

### Setting Bulk Edit Response

- `SettingBulkEditResponse = ZeroRTT or AdvancedDDoS or object { id, modified_on, value }  or 59 more`

  0-RTT session resumption enabled for this zone.

  - `ZeroRTT object { id, value, editable, modified_on }`

    0-RTT session resumption enabled for this zone.

    - `id: "0rtt"`

      ID of the zone setting.

      - `"0rtt"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `AdvancedDDoS object { id, value, editable, modified_on }`

    Advanced protection from Distributed Denial of Service (DDoS) attacks on your website. This is an uneditable value that is 'on' in the case of Business and Enterprise zones.

    - `id: "advanced_ddos"`

      ID of the zone setting.

      - `"advanced_ddos"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesCacheRulesAegis object { id, modified_on, value }`

    Aegis provides dedicated egress IPs (from Cloudflare to your origin) for your layer 7 WAF and CDN services. The egress IPs are reserved exclusively for your account so that you can increase your origin security by only allowing traffic from a small list of IP addresses.

    - `id: "aegis"`

      ID of the zone setting.

      - `"aegis"`

    - `modified_on: optional string`

      Last time this setting was modified.

    - `value: optional object { enabled, pool_id }`

      Value of the zone setting.

      - `enabled: optional boolean`

        Whether the feature is enabled or not.

      - `pool_id: optional string`

        Egress pool id which refers to a grouping of dedicated egress IPs through which Cloudflare will connect to origin.

  - `AlwaysOnline object { id, value, editable, modified_on }`

    When enabled, Cloudflare serves limited copies of web pages available from the [Internet Archive's Wayback Machine](https://archive.org/web/) if your server is offline. Refer to [Always Online](https://developers.cloudflare.com/cache/about/always-online) for more information.

    - `id: "always_online"`

      ID of the zone setting.

      - `"always_online"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasAlwaysUseHTTPS object { id, value, editable, modified_on }`

    Reply to all requests for URLs that use "http" with a 301 redirect to the equivalent "https" URL. If you only want to redirect for a subset of requests, consider creating an "Always use HTTPS" page rule.

    - `id: "always_use_https"`

      ID of the zone setting.

      - `"always_use_https"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasAutomaticHTTPSRewrites object { id, value, editable, modified_on }`

    Enable the Automatic HTTPS Rewrites feature for this zone.

    - `id: "automatic_https_rewrites"`

      ID of the zone setting.

      - `"automatic_https_rewrites"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `Brotli object { id, value, editable, modified_on }`

    When the client requesting an asset supports the Brotli compression algorithm, Cloudflare will serve a Brotli compressed version of the asset.

    - `id: "brotli"`

      ID of the zone setting.

      - `"brotli"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasBrowserCacheTTL object { id, value, editable, modified_on }`

    Browser Cache TTL (in seconds) specifies how long Cloudflare-cached resources will remain on your visitors' computers. Cloudflare will honor any larger times specified by your server. (https://support.cloudflare.com/hc/en-us/articles/200168276).

    - `id: "browser_cache_ttl"`

      ID of the zone setting.

      - `"browser_cache_ttl"`

    - `value: number`

      Current value of the zone setting.

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasBrowserCheck object { id, value, editable, modified_on }`

    Browser Integrity Check is similar to Bad Behavior and looks for common HTTP headers abused most commonly by spammers and denies access to your page.  It will also challenge visitors that do not have a user agent or a non standard user agent (also commonly used by abuse bots, crawlers or visitors). (https://support.cloudflare.com/hc/en-us/articles/200170086).

    - `id: "browser_check"`

      ID of the zone setting.

      - `"browser_check"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasCacheLevel object { id, value, editable, modified_on }`

    Cache Level functions based off the setting level. The basic setting will cache most static resources (i.e., css, images, and JavaScript). The simplified setting will ignore the query string when delivering a cached resource. The aggressive setting will cache all static resources, including ones with a query string. (https://support.cloudflare.com/hc/en-us/articles/200168256).

    - `id: "cache_level"`

      ID of the zone setting.

      - `"cache_level"`

    - `value: "aggressive" or "basic" or "simplified"`

      Current value of the zone setting.

      - `"aggressive"`

      - `"basic"`

      - `"simplified"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ChallengeTTL object { id, value, editable, modified_on }`

    Specify how long a visitor is allowed access to your site after successfully completing a challenge (such as a CAPTCHA). After the TTL has expired the visitor will have to complete a new challenge. We recommend a 15 - 45 minute setting and will attempt to honor any setting above 45 minutes. (https://support.cloudflare.com/hc/en-us/articles/200170136).

    - `id: "challenge_ttl"`

      ID of the zone setting.

      - `"challenge_ttl"`

    - `value: 300 or 900 or 1800 or 11 more`

      Current value of the zone setting.

      - `300`

      - `900`

      - `1800`

      - `2700`

      - `3600`

      - `7200`

      - `10800`

      - `14400`

      - `28800`

      - `57600`

      - `86400`

      - `604800`

      - `2592000`

      - `31536000`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `Ciphers object { id, value, editable, modified_on }`

    An allowlist of ciphers for TLS termination. These ciphers must be in the BoringSSL format.

    - `id: "ciphers"`

      ID of the zone setting.

      - `"ciphers"`

    - `value: array of string`

      Current value of the zone setting.

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesContentConverter object { id, value, editable, modified_on }`

    When enabled and the client sends an Accept header requesting text/markdown,
    Cloudflare will convert HTML responses to Markdown format using the toMarkdown() service.
    Refer to the [developer documentation](https://developers.cloudflare.com/workers-ai/features/markdown-conversion/) for more information.

    - `id: "content_converter"`

      ID of the zone setting.

      - `"content_converter"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesCNAMEFlattening object { id, value, editable, modified_on }`

    Whether or not cname flattening is on.

    - `id: "cname_flattening"`

      How to flatten the cname destination.

      - `"cname_flattening"`

    - `value: "flatten_at_root" or "flatten_all"`

      Current value of the zone setting.

      - `"flatten_at_root"`

      - `"flatten_all"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `DevelopmentMode object { id, value, editable, 2 more }`

    Development Mode temporarily allows you to enter development mode for your websites if you need to make changes to your site. This will bypass Cloudflare's accelerated cache and slow down your site, but is useful if you are making changes to cacheable content (like images, css, or JavaScript) and would like to see those changes right away. Once entered, development mode will last for 3 hours and then automatically toggle off.

    - `id: "development_mode"`

      ID of the zone setting.

      - `"development_mode"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

    - `time_remaining: optional number`

      Value of the zone setting.
      Notes: The interval (in seconds) from when development mode expires (positive integer) or last expired (negative integer) for the domain. If development mode has never been enabled, this value is false.

  - `EarlyHints object { id, value, editable, modified_on }`

    When enabled, Cloudflare will attempt to speed up overall page loads by serving `103` responses with `Link` headers from the final response. Refer to [Early Hints](https://developers.cloudflare.com/cache/about/early-hints) for more information.

    - `id: "early_hints"`

      ID of the zone setting.

      - `"early_hints"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasEdgeCacheTTL object { id, value, editable, modified_on }`

    Time (in seconds) that a resource will be ensured to remain on Cloudflare's cache servers.

    - `id: "edge_cache_ttl"`

      ID of the zone setting.

      - `"edge_cache_ttl"`

    - `value: 30 or 60 or 300 or 18 more`

      Current value of the zone setting.

      - `30`

      - `60`

      - `300`

      - `1200`

      - `1800`

      - `3600`

      - `7200`

      - `10800`

      - `14400`

      - `18000`

      - `28800`

      - `43200`

      - `57600`

      - `72000`

      - `86400`

      - `172800`

      - `259200`

      - `345600`

      - `432000`

      - `518400`

      - `604800`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasEmailObfuscation object { id, value, editable, modified_on }`

    Encrypt email adresses on your web page from bots, while keeping them visible to humans. (https://support.cloudflare.com/hc/en-us/articles/200170016).

    - `id: "email_obfuscation"`

      ID of the zone setting.

      - `"email_obfuscation"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `H2Prioritization object { id, value, editable, modified_on }`

    HTTP/2 Edge Prioritization optimises the delivery of resources served through HTTP/2 to improve page load performance. It also supports fine control of content delivery when used in conjunction with Workers.

    - `id: "h2_prioritization"`

      ID of the zone setting.

      - `"h2_prioritization"`

    - `value: "on" or "off" or "custom"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

      - `"custom"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `HotlinkProtection object { id, value, editable, modified_on }`

    When enabled, the Hotlink Protection option ensures that other sites cannot suck up your bandwidth by building pages that use images hosted on your site. Anytime a request for an image on your site hits Cloudflare, we check to ensure that it's not another site requesting them. People will still be able to download and view images from your page, but other sites won't be able to steal them for use on their own pages. (https://support.cloudflare.com/hc/en-us/articles/200170026).

    - `id: "hotlink_protection"`

      ID of the zone setting.

      - `"hotlink_protection"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `HTTP2 object { id, value, editable, modified_on }`

    HTTP2 enabled for this zone.

    - `id: "http2"`

      ID of the zone setting.

      - `"http2"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `HTTP3 object { id, value, editable, modified_on }`

    HTTP3 enabled for this zone.

    - `id: "http3"`

      ID of the zone setting.

      - `"http3"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ImageResizing object { id, value, editable, modified_on }`

    Image Transformations provides on-demand resizing, conversion and optimization for images served through Cloudflare's network. Refer to the [Image Transformations documentation](https://developers.cloudflare.com/images/) for more information.

    - `id: "image_resizing"`

      ID of the zone setting.

      - `"image_resizing"`

    - `value: "on" or "off" or "open"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

      - `"open"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasIPGeolocation object { id, value, editable, modified_on }`

    Enable IP Geolocation to have Cloudflare geolocate visitors to your website and pass the country code to you. (https://support.cloudflare.com/hc/en-us/articles/200168236).

    - `id: "ip_geolocation"`

      ID of the zone setting.

      - `"ip_geolocation"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `IPV6 object { id, value, editable, modified_on }`

    Enable IPv6 on all subdomains that are Cloudflare enabled.  (https://support.cloudflare.com/hc/en-us/articles/200168586).

    - `id: "ipv6"`

      ID of the zone setting.

      - `"ipv6"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesMaxUpload object { id, value, editable, modified_on }`

    Maximum size of an allowable upload.

    - `id: "max_upload"`

      identifier of the zone setting.

      - `"max_upload"`

    - `value: 100 or 125 or 150 or 15 more`

      Current value of the zone setting.

      - `100`

      - `125`

      - `150`

      - `175`

      - `200`

      - `225`

      - `250`

      - `275`

      - `300`

      - `325`

      - `350`

      - `375`

      - `400`

      - `425`

      - `450`

      - `475`

      - `500`

      - `1000`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `MinTLSVersion object { id, value, editable, modified_on }`

    Only accepts HTTPS requests that use at least the TLS protocol version specified. For example, if TLS 1.1 is selected, TLS 1.0 connections will be rejected, while 1.1, 1.2, and 1.3 (if enabled) will be permitted.

    - `id: "min_tls_version"`

      ID of the zone setting.

      - `"min_tls_version"`

    - `value: "1.0" or "1.1" or "1.2" or "1.3"`

      Current value of the zone setting.

      - `"1.0"`

      - `"1.1"`

      - `"1.2"`

      - `"1.3"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasMirage object { id, value, editable, modified_on }`

    Automatically optimize image loading for website visitors on mobile
    devices. Refer to [our blog post](http://blog.cloudflare.com/mirage2-solving-mobile-speed)
    for more information.

    - `id: "mirage"`

      ID of the zone setting.

      - `"mirage"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `NEL object { id, value, editable, modified_on }`

    Enable Network Error Logging reporting on your zone. (Beta)

    - `id: "nel"`

      Zone setting identifier.

      - `"nel"`

    - `value: object { enabled }`

      Current value of the zone setting.

      - `enabled: optional boolean`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasOpportunisticEncryption object { id, value, editable, modified_on }`

    Enables the Opportunistic Encryption feature for a zone.

    - `id: "opportunistic_encryption"`

      ID of the zone setting.

      - `"opportunistic_encryption"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `OpportunisticOnion object { id, value, editable, modified_on }`

    Add an Alt-Svc header to all legitimate requests from Tor, allowing the connection to use our onion services instead of exit nodes.

    - `id: "opportunistic_onion"`

      ID of the zone setting.

      - `"opportunistic_onion"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `OrangeToOrange object { id, value, editable, modified_on }`

    Orange to Orange (O2O) allows zones on Cloudflare to CNAME to other zones also on Cloudflare.

    - `id: "orange_to_orange"`

      ID of the zone setting.

      - `"orange_to_orange"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasOriginErrorPagePassThru object { id, value, editable, modified_on }`

    Cloudflare will proxy customer error pages on any 502,504 errors on origin server instead of showing a default Cloudflare error page. This does not apply to 522 errors and is limited to Enterprise Zones.

    - `id: "origin_error_page_pass_thru"`

      ID of the zone setting.

      - `"origin_error_page_pass_thru"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesCacheRulesOriginH2MaxStreams object { id, modified_on, value }`

    Origin H2 Max Streams configures the max number of concurrent requests that Cloudflare will send within the same connection when communicating with the origin server, if the origin supports it. Note that if your origin does not support H2 multiplexing, 5xx errors may be observed, particularly 520s. Also note that the default value is `100` for all plan types except Enterprise where it is `1`. `1` means that H2 multiplexing is disabled.

    - `id: "origin_h2_max_streams"`

      Value of the zone setting.

      - `"origin_h2_max_streams"`

    - `modified_on: optional string`

      Last time this setting was modified.

    - `value: optional number`

      Value of the Origin H2 Max Streams Setting.

  - `ZonesCacheRulesOriginMaxHTTPVersion object { id, modified_on, value }`

    Origin Max HTTP Setting Version sets the highest HTTP version Cloudflare will attempt to use with your origin. This setting allows Cloudflare to make HTTP/2 requests to your origin. (Refer to [Enable HTTP/2 to Origin](https://developers.cloudflare.com/cache/how-to/enable-http2-to-origin/), for more information.). The default value is "2" for all plan types except Enterprise where it is "1".

    - `id: "origin_max_http_version"`

      Value of the zone setting.

      - `"origin_max_http_version"`

    - `modified_on: optional string`

      Last time this setting was modified.

    - `value: optional "2" or "1"`

      Value of the Origin Max HTTP Version Setting.

      - `"2"`

      - `"1"`

  - `ZonesSchemasPolish object { id, value, editable, modified_on }`

    Removes metadata and compresses your images for faster page load times. Basic (Lossless): Reduce the size of PNG, JPEG, and GIF files - no impact on visual quality. Basic + JPEG (Lossy): Further reduce the size of JPEG files for faster image loading. Larger JPEGs are converted to progressive images, loading a lower-resolution image first and ending in a higher-resolution version. Not recommended for hi-res photography sites.

    - `id: "polish"`

      ID of the zone setting.

      - `"polish"`

    - `value: "off" or "lossless" or "lossy"`

      Current value of the zone setting.

      - `"off"`

      - `"lossless"`

      - `"lossy"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `PrefetchPreload object { id, value, editable, modified_on }`

    Cloudflare will prefetch any URLs that are included in the response headers. This is limited to Enterprise Zones.

    - `id: "prefetch_preload"`

      ID of the zone setting.

      - `"prefetch_preload"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesPrivacyPass object { id, value, editable, modified_on }`

    Privacy Pass v1 was a browser extension developed by the Privacy Pass Team to improve the browsing experience for your visitors by allowing users to reduce the number of CAPTCHAs shown. (https://support.cloudflare.com/hc/en-us/articles/115001992652-Privacy-Pass).

    - `id: "privacy_pass"`

      ID of the zone setting.

      - `"privacy_pass"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ProxyReadTimeout object { id, value, editable, modified_on }`

    Maximum time between two read operations from origin.

    - `id: "proxy_read_timeout"`

      ID of the zone setting.

      - `"proxy_read_timeout"`

    - `value: number`

      Current value of the zone setting.

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `PseudoIPV4 object { id, value, editable, modified_on }`

    The value set for the Pseudo IPv4 setting.

    - `id: "pseudo_ipv4"`

      Value of the Pseudo IPv4 setting.

      - `"pseudo_ipv4"`

    - `value: "off" or "add_header" or "overwrite_header"`

      Current value of the zone setting.

      - `"off"`

      - `"add_header"`

      - `"overwrite_header"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesRedirectsForAITraining object { id, value, editable, modified_on }`

    When enabled, Cloudflare will redirect verified AI training crawlers to canonical URLs
    found in the HTML response, ensuring AI models train on authoritative content.

    - `id: "redirects_for_ai_training"`

      ID of the zone setting.

      - `"redirects_for_ai_training"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesReplaceInsecureJS object { id, value, editable, modified_on }`

    Automatically replace insecure JavaScript libraries with safer and faster alternatives provided under cdnjs and powered by Cloudflare. Currently supports the following libraries: Polyfill under polyfill.io.

    - `id: "replace_insecure_js"`

      ID of the zone setting.

      - `"replace_insecure_js"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasResponseBuffering object { id, value, editable, modified_on }`

    Enables or disables buffering of responses from the proxied server. Cloudflare may buffer the whole payload to deliver it at once to the client versus allowing it to be delivered in chunks. By default, the proxied server streams directly and is not buffered by Cloudflare. This is limited to Enterprise Zones.

    - `id: "response_buffering"`

      ID of the zone setting.

      - `"response_buffering"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasRocketLoader object { id, value, editable, modified_on }`

    Rocket Loader is a general-purpose asynchronous JavaScript optimisation that prioritises rendering your content while loading your site's Javascript asynchronously. Turning on Rocket Loader will immediately improve a web page's rendering time sometimes measured as Time to First Paint (TTFP), and also the `window.onload` time (assuming there is JavaScript on the page). This can have a positive impact on your Google search ranking. When turned on, Rocket Loader will automatically defer the loading of all Javascript referenced in your HTML, with no configuration required. Refer to [Understanding Rocket Loader](https://support.cloudflare.com/hc/articles/200168056) for more information.

    - `id: "rocket_loader"`

      ID of the zone setting.

      - `"rocket_loader"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasAutomaticPlatformOptimization object { id, value, editable, modified_on }`

    [Automatic Platform Optimization for WordPress](https://developers.cloudflare.com/automatic-platform-optimization/) serves your WordPress site from Cloudflare's edge network and caches third-party fonts.

    - `id: "automatic_platform_optimization"`

      ID of the zone setting.

      - `"automatic_platform_optimization"`

    - `value: AutomaticPlatformOptimization`

      Current value of the zone setting.

      - `cache_by_device_type: boolean`

        Indicates whether or not [cache by device type](https://developers.cloudflare.com/automatic-platform-optimization/reference/cache-device-type/) is enabled.

      - `cf: boolean`

        Indicates whether or not Cloudflare proxy is enabled.

      - `enabled: boolean`

        Indicates whether or not Automatic Platform Optimization is enabled.

      - `hostnames: array of string`

        An array of hostnames where Automatic Platform Optimization for WordPress is activated.

      - `wordpress: boolean`

        Indicates whether or not site is powered by WordPress.

      - `wp_plugin: boolean`

        Indicates whether or not [Cloudflare for WordPress plugin](https://wordpress.org/plugins/cloudflare/) is installed.

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSearchForAgents object { id, value, editable, modified_on }`

    When enabled, Cloudflare provisions an AI Search instance for the zone
    and exposes a /.well-known/ai-search endpoint that AI agents can query.
    Markdown responses also receive an agent: YAML capability block advertising
    the search endpoint.

    - `id: "search_for_agents"`

      ID of the zone setting.

      - `"search_for_agents"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `SecurityHeaders object { id, value, editable, modified_on }`

    Cloudflare security header for a zone.

    - `id: "security_header"`

      ID of the zone's security header.

      - `"security_header"`

    - `value: object { strict_transport_security }`

      Current value of the zone setting.

      - `strict_transport_security: optional object { enabled, include_subdomains, max_age, 2 more }`

        Strict Transport Security.

        - `enabled: optional boolean`

          Whether or not strict transport security is enabled.

        - `include_subdomains: optional boolean`

          Include all subdomains for strict transport security.

        - `max_age: optional number`

          Max age in seconds of the strict transport security.

        - `nosniff: optional boolean`

          Whether or not to include 'X-Content-Type-Options: nosniff' header.

        - `preload: optional boolean`

          Enable automatic preload of the HSTS configuration.

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasSecurityLevel object { id, value, editable, modified_on }`

    Choose the appropriate security profile for your website, which will automatically adjust each of the security settings. If you choose to customize an individual security setting, the profile will become Custom. (https://support.cloudflare.com/hc/en-us/articles/200170056).

    - `id: "security_level"`

      ID of the zone setting.

      - `"security_level"`

    - `value: "off" or "essentially_off" or "low" or 3 more`

      Current value of the zone setting.

      - `"off"`

      - `"essentially_off"`

      - `"low"`

      - `"medium"`

      - `"high"`

      - `"under_attack"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ServerSideExcludes object { id, value, editable, modified_on }`

    If there is sensitive content on your website that you want visible to real visitors, but that you want to hide from suspicious visitors, all you have to do is wrap the content with Cloudflare SSE tags. Wrap any content that you want to be excluded from suspicious visitors in the following SSE tags: <!--sse--><!--/sse-->. For example: <!--sse-->  Bad visitors won't see my phone number, 555-555-5555 <!--/sse-->. Note: SSE only will work with HTML. If you have HTML minification enabled, you won't see the SSE tags in your HTML source when it's served through Cloudflare. SSE will still function in this case, as Cloudflare's HTML minification and SSE functionality occur on-the-fly as the resource moves through our network to the visitor's computer. (https://support.cloudflare.com/hc/en-us/articles/200170036).

    - `id: "server_side_exclude"`

      ID of the zone setting.

      - `"server_side_exclude"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSha1Support object { id, value, editable, modified_on }`

    Allow SHA1 support.

    - `id: "sha1_support"`

      Zone setting identifier.

      - `"sha1_support"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasSortQueryStringForCache object { id, value, editable, modified_on }`

    Cloudflare will treat files with the same query strings as the same file in cache, regardless of the order of the query strings. This is limited to Enterprise Zones.

    - `id: "sort_query_string_for_cache"`

      ID of the zone setting.

      - `"sort_query_string_for_cache"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasSSL object { id, value, editable, modified_on }`

    SSL encrypts your visitor's connection and safeguards credit card numbers and other personal data to and from your website. SSL can take up to 5 minutes to fully activate. Requires Cloudflare active on your root domain or www domain. Off: no SSL between the visitor and Cloudflare, and no SSL between Cloudflare and your web server  (all HTTP traffic). Flexible: SSL between the visitor and Cloudflare -- visitor sees HTTPS on your site, but no SSL between Cloudflare and your web server. You don't need to have an SSL cert on your web server, but your vistors will still see the site as being HTTPS enabled. Full:  SSL between the visitor and Cloudflare -- visitor sees HTTPS on your site, and SSL between Cloudflare and your web server. You'll need to have your own SSL cert or self-signed cert at the very least. Full (Strict): SSL between the visitor and Cloudflare -- visitor sees HTTPS on your site, and SSL between Cloudflare and your web server. You'll need to have a valid SSL certificate installed on your web server. This certificate must be signed by a certificate authority, have an expiration date in the future, and respond for the request domain name (hostname). (https://support.cloudflare.com/hc/en-us/articles/200170416).

    - `id: "ssl"`

      ID of the zone setting.

      - `"ssl"`

    - `value: "off" or "flexible" or "full" or "strict"`

      Current value of the zone setting.

      - `"off"`

      - `"flexible"`

      - `"full"`

      - `"strict"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `SSLRecommender object { id, enabled }`

    Enrollment in the SSL/TLS Recommender service which tries to detect and recommend (by sending periodic emails) the most secure SSL/TLS setting your origin servers support.

    - `id: optional "ssl_recommender"`

      Enrollment value for SSL/TLS Recommender.

      - `"ssl_recommender"`

    - `enabled: optional boolean`

      ssl-recommender enrollment setting.

  - `ZonesTLS1_2Only object { id, value, editable, modified_on }`

    Only allows TLS1.2.

    - `id: "tls_1_2_only"`

      Zone setting identifier.

      - `"tls_1_2_only"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `TLS1_3 object { id, value, editable, modified_on }`

    Enables Crypto TLS 1.3 feature for a zone.

    - `id: "tls_1_3"`

      ID of the zone setting.

      - `"tls_1_3"`

    - `value: "on" or "off" or "zrt"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

      - `"zrt"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `TLSClientAuth object { id, value, editable, modified_on }`

    TLS Client Auth requires Cloudflare to connect to your origin server using a client certificate (Enterprise Only).

    - `id: "tls_client_auth"`

      ID of the zone setting.

      - `"tls_client_auth"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesTransformations object { id, value, editable, modified_on }`

    Media Transformations provides on-demand resizing, conversion and optimization for images and video served through Cloudflare's network. Refer to the [Image Transformations](https://developers.cloudflare.com/images/) and [Video Transformations](https://developers.cloudflare.com/stream/transform-videos/#getting-started) documentation for more information.

    - `id: "transformations"`

      ID of the zone setting. Shared between Image Transformations and Video Transformations.

      - `"transformations"`

    - `value: "on" or "off" or "open"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

      - `"open"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesTransformationsAllowedOrigins object { id, value, editable, modified_on }`

    Media Transformations Allowed Origins restricts transformations for images and video served through Cloudflare's network. Refer to the [Image Transformations](https://developers.cloudflare.com/images/) and [Video Transformations](https://developers.cloudflare.com/stream/transform-videos/#getting-started) documentation for more information.

    - `id: "transformations_allowed_origins"`

      ID of the zone setting. Shared between Image Transformations and Video Transformations.

      - `"transformations_allowed_origins"`

    - `value: string`

      Current value of the zone setting.

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasTrueClientIPHeader object { id, value, editable, modified_on }`

    Allows customer to continue to use True Client IP (Akamai feature) in the headers we send to the origin. This is limited to Enterprise Zones.

    - `id: "true_client_ip_header"`

      ID of the zone setting.

      - `"true_client_ip_header"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasWAF object { id, value, editable, modified_on }`

    The WAF examines HTTP requests to your website.  It inspects both GET and POST requests and applies rules to help filter out illegitimate traffic from legitimate website visitors. The Cloudflare WAF inspects website addresses or URLs to detect anything out of the ordinary. If the Cloudflare WAF determines suspicious user behavior, then the WAF will 'challenge' the web visitor with a page that asks them to submit a CAPTCHA successfully  to continue their action. If the challenge is failed, the action will be stopped. What this means is that Cloudflare's WAF will block any traffic identified as illegitimate before it reaches your origin web server. (https://support.cloudflare.com/hc/en-us/articles/200172016).

    - `id: "waf"`

      ID of the zone setting.

      - `"waf"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `WebP object { id, value, editable, modified_on }`

    When the client requesting the image supports the WebP image codec, and WebP offers a performance advantage over the original image format, Cloudflare will serve a WebP version of the original image.

    - `id: "webp"`

      ID of the zone setting.

      - `"webp"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `Websocket object { id, value, editable, modified_on }`

    WebSockets are open connections sustained between the client and the origin server. Inside a WebSockets connection, the client and the origin can pass data back and forth without having to reestablish sessions. This makes exchanging data within a WebSockets connection fast. WebSockets are often used for real-time applications such as live chat and gaming. For more information refer to [Can I use Cloudflare with Websockets](https://support.cloudflare.com/hc/en-us/articles/200169466-Can-I-use-Cloudflare-with-WebSockets-).

    - `id: "websockets"`

      ID of the zone setting.

      - `"websockets"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

# Environments

## List zone environments

**get** `/zones/{zone_id}/environments`

List zone environments

### Path Parameters

- `zone_id: string`

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

- `result: object { environments }`

  - `environments: array of object { expression, locked_on_deployment, name, 4 more }`

    - `expression: string`

    - `locked_on_deployment: boolean`

    - `name: string`

    - `position: ListCursor`

      - `after: optional string`

      - `before: optional string`

    - `ref: string`

    - `version: number`

    - `http_application_id: optional string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/environments \
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
  "result": {
    "environments": [
      {
        "expression": "expression",
        "locked_on_deployment": true,
        "name": "name",
        "position": {
          "after": "yyy",
          "before": "xxx"
        },
        "ref": "ref",
        "version": 0,
        "http_application_id": "http_application_id"
      }
    ]
  },
  "success": true
}
```

## Create zone environments

**post** `/zones/{zone_id}/environments`

Create zone environments

### Path Parameters

- `zone_id: string`

### Body Parameters

- `environments: array of object { expression, locked_on_deployment, name, 4 more }`

  - `expression: string`

  - `locked_on_deployment: boolean`

  - `name: string`

  - `position: ListCursor`

    - `after: optional string`

    - `before: optional string`

  - `ref: string`

  - `version: number`

  - `http_application_id: optional string`

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

- `result: object { environments }`

  - `environments: array of object { expression, locked_on_deployment, name, 4 more }`

    - `expression: string`

    - `locked_on_deployment: boolean`

    - `name: string`

    - `position: ListCursor`

      - `after: optional string`

      - `before: optional string`

    - `ref: string`

    - `version: number`

    - `http_application_id: optional string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/environments \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "environments": [
            {
              "expression": "expression",
              "locked_on_deployment": true,
              "name": "name",
              "position": {},
              "ref": "ref",
              "version": 0
            }
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
    "environments": [
      {
        "expression": "expression",
        "locked_on_deployment": true,
        "name": "name",
        "position": {
          "after": "yyy",
          "before": "xxx"
        },
        "ref": "ref",
        "version": 0,
        "http_application_id": "http_application_id"
      }
    ]
  },
  "success": true
}
```

## Upsert zone environments

**put** `/zones/{zone_id}/environments`

Upsert zone environments

### Path Parameters

- `zone_id: string`

### Body Parameters

- `environments: array of object { expression, locked_on_deployment, name, 4 more }`

  - `expression: string`

  - `locked_on_deployment: boolean`

  - `name: string`

  - `position: ListCursor`

    - `after: optional string`

    - `before: optional string`

  - `ref: string`

  - `version: number`

  - `http_application_id: optional string`

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

- `result: object { environments }`

  - `environments: array of object { expression, locked_on_deployment, name, 4 more }`

    - `expression: string`

    - `locked_on_deployment: boolean`

    - `name: string`

    - `position: ListCursor`

      - `after: optional string`

      - `before: optional string`

    - `ref: string`

    - `version: number`

    - `http_application_id: optional string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/environments \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "environments": [
            {
              "expression": "expression",
              "locked_on_deployment": true,
              "name": "name",
              "position": {},
              "ref": "ref",
              "version": 0
            }
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
    "environments": [
      {
        "expression": "expression",
        "locked_on_deployment": true,
        "name": "name",
        "position": {
          "after": "yyy",
          "before": "xxx"
        },
        "ref": "ref",
        "version": 0,
        "http_application_id": "http_application_id"
      }
    ]
  },
  "success": true
}
```

## Partially update zone environments

**patch** `/zones/{zone_id}/environments`

Partially update zone environments

### Path Parameters

- `zone_id: string`

### Body Parameters

- `environments: array of object { expression, locked_on_deployment, name, 4 more }`

  - `expression: string`

  - `locked_on_deployment: boolean`

  - `name: string`

  - `position: ListCursor`

    - `after: optional string`

    - `before: optional string`

  - `ref: string`

  - `version: number`

  - `http_application_id: optional string`

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

- `result: object { environments }`

  - `environments: array of object { expression, locked_on_deployment, name, 4 more }`

    - `expression: string`

    - `locked_on_deployment: boolean`

    - `name: string`

    - `position: ListCursor`

      - `after: optional string`

      - `before: optional string`

    - `ref: string`

    - `version: number`

    - `http_application_id: optional string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/environments \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "environments": [
            {
              "expression": "expression",
              "locked_on_deployment": true,
              "name": "name",
              "position": {},
              "ref": "ref",
              "version": 0
            }
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
    "environments": [
      {
        "expression": "expression",
        "locked_on_deployment": true,
        "name": "name",
        "position": {
          "after": "yyy",
          "before": "xxx"
        },
        "ref": "ref",
        "version": 0,
        "http_application_id": "http_application_id"
      }
    ]
  },
  "success": true
}
```

## Delete zone environment

**delete** `/zones/{zone_id}/environments/{environment_id}`

Delete zone environment

### Path Parameters

- `zone_id: string`

- `environment_id: string`

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

- `result: object { environments }`

  - `environments: array of object { expression, locked_on_deployment, name, 4 more }`

    - `expression: string`

    - `locked_on_deployment: boolean`

    - `name: string`

    - `position: ListCursor`

      - `after: optional string`

      - `before: optional string`

    - `ref: string`

    - `version: number`

    - `http_application_id: optional string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/environments/$ENVIRONMENT_ID \
    -X DELETE \
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
  "result": {
    "environments": [
      {
        "expression": "expression",
        "locked_on_deployment": true,
        "name": "name",
        "position": {
          "after": "yyy",
          "before": "xxx"
        },
        "ref": "ref",
        "version": 0,
        "http_application_id": "http_application_id"
      }
    ]
  },
  "success": true
}
```

## Roll back zone environment

**post** `/zones/{zone_id}/environments/{environment_id}/rollback`

Roll back zone environment

### Path Parameters

- `zone_id: string`

- `environment_id: string`

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

- `result: object { environments }`

  - `environments: array of object { expression, locked_on_deployment, name, 4 more }`

    - `expression: string`

    - `locked_on_deployment: boolean`

    - `name: string`

    - `position: ListCursor`

      - `after: optional string`

      - `before: optional string`

    - `ref: string`

    - `version: number`

    - `http_application_id: optional string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/environments/$ENVIRONMENT_ID/rollback \
    -X POST \
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
  "result": {
    "environments": [
      {
        "expression": "expression",
        "locked_on_deployment": true,
        "name": "name",
        "position": {
          "after": "yyy",
          "before": "xxx"
        },
        "ref": "ref",
        "version": 0,
        "http_application_id": "http_application_id"
      }
    ]
  },
  "success": true
}
```

## Domain Types

### Environment List Response

- `EnvironmentListResponse object { environments }`

  - `environments: array of object { expression, locked_on_deployment, name, 4 more }`

    - `expression: string`

    - `locked_on_deployment: boolean`

    - `name: string`

    - `position: ListCursor`

      - `after: optional string`

      - `before: optional string`

    - `ref: string`

    - `version: number`

    - `http_application_id: optional string`

### Environment Create Response

- `EnvironmentCreateResponse object { environments }`

  - `environments: array of object { expression, locked_on_deployment, name, 4 more }`

    - `expression: string`

    - `locked_on_deployment: boolean`

    - `name: string`

    - `position: ListCursor`

      - `after: optional string`

      - `before: optional string`

    - `ref: string`

    - `version: number`

    - `http_application_id: optional string`

### Environment Update Response

- `EnvironmentUpdateResponse object { environments }`

  - `environments: array of object { expression, locked_on_deployment, name, 4 more }`

    - `expression: string`

    - `locked_on_deployment: boolean`

    - `name: string`

    - `position: ListCursor`

      - `after: optional string`

      - `before: optional string`

    - `ref: string`

    - `version: number`

    - `http_application_id: optional string`

### Environment Edit Response

- `EnvironmentEditResponse object { environments }`

  - `environments: array of object { expression, locked_on_deployment, name, 4 more }`

    - `expression: string`

    - `locked_on_deployment: boolean`

    - `name: string`

    - `position: ListCursor`

      - `after: optional string`

      - `before: optional string`

    - `ref: string`

    - `version: number`

    - `http_application_id: optional string`

### Environment Delete Response

- `EnvironmentDeleteResponse object { environments }`

  - `environments: array of object { expression, locked_on_deployment, name, 4 more }`

    - `expression: string`

    - `locked_on_deployment: boolean`

    - `name: string`

    - `position: ListCursor`

      - `after: optional string`

      - `before: optional string`

    - `ref: string`

    - `version: number`

    - `http_application_id: optional string`

### Environment Rollback Response

- `EnvironmentRollbackResponse object { environments }`

  - `environments: array of object { expression, locked_on_deployment, name, 4 more }`

    - `expression: string`

    - `locked_on_deployment: boolean`

    - `name: string`

    - `position: ListCursor`

      - `after: optional string`

      - `before: optional string`

    - `ref: string`

    - `version: number`

    - `http_application_id: optional string`

# Custom Nameservers

## Get Account Custom Nameserver Related Zone Metadata

**get** `/zones/{zone_id}/custom_ns`

Get metadata for account-level custom nameservers on a zone.

Deprecated in favor of [Show DNS Settings](https://developers.cloudflare.com/api/operations/dns-settings-for-a-zone-list-dns-settings).

### Path Parameters

- `zone_id: string`

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

- `enabled: optional boolean`

  Whether zone uses account-level custom nameservers.

- `ns_set: optional number`

  The number of the name server set to assign to the zone.

- `result_info: optional object { count, page, per_page, 2 more }`

  - `count: optional number`

    Total number of results for the requested service.

  - `page: optional number`

    Current page within paginated list of results.

  - `per_page: optional number`

    Number of results per page of results.

  - `total_count: optional number`

    Total results available without any search parameters.

  - `total_pages: optional number`

    The number of total pages in the entire result set.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/custom_ns \
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
  "enabled": true,
  "ns_set": 1,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```

## Set Account Custom Nameserver Related Zone Metadata

**put** `/zones/{zone_id}/custom_ns`

Set metadata for account-level custom nameservers on a zone.

If you would like new zones in the account to use account custom nameservers by default, use PUT /accounts/:identifier to set the account setting use_account_custom_ns_by_default to true.

Deprecated in favor of [Update DNS Settings](https://developers.cloudflare.com/api/operations/dns-settings-for-a-zone-update-dns-settings).

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `enabled: optional boolean`

  Whether zone uses account-level custom nameservers.

- `ns_set: optional number`

  The number of the name server set to assign to the zone.

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

- `result_info: optional object { count, page, per_page, 2 more }`

  - `count: optional number`

    Total number of results for the requested service.

  - `page: optional number`

    Current page within paginated list of results.

  - `per_page: optional number`

    Number of results per page of results.

  - `total_count: optional number`

    Total results available without any search parameters.

  - `total_pages: optional number`

    The number of total pages in the entire result set.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/custom_ns \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "enabled": true,
          "ns_set": 1
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
  "result": [],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```

## Domain Types

### Custom Nameserver Get Response

- `CustomNameserverGetResponse object { errors, messages, success, 3 more }`

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

  - `enabled: optional boolean`

    Whether zone uses account-level custom nameservers.

  - `ns_set: optional number`

    The number of the name server set to assign to the zone.

  - `result_info: optional object { count, page, per_page, 2 more }`

    - `count: optional number`

      Total number of results for the requested service.

    - `page: optional number`

      Current page within paginated list of results.

    - `per_page: optional number`

      Number of results per page of results.

    - `total_count: optional number`

      Total results available without any search parameters.

    - `total_pages: optional number`

      The number of total pages in the entire result set.

### Custom Nameserver Update Response

- `CustomNameserverUpdateResponse = string`

  Unused

# Holds

## Get Zone Hold

**get** `/zones/{zone_id}/hold`

Retrieve whether the zone is subject to a zone hold, and metadata about the hold.

### Path Parameters

- `zone_id: string`

  Identifier.

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

- `result: ZoneHold`

  - `hold: optional boolean`

  - `hold_after: optional string`

  - `include_subdomains: optional string`

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/hold \
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
  "result": {
    "hold": true,
    "hold_after": "2023-01-31T15:56:36+00:00",
    "include_subdomains": "include_subdomains"
  },
  "success": true
}
```

## Create Zone Hold

**post** `/zones/{zone_id}/hold`

Enforce a zone hold on the zone, blocking the creation and activation of zones with this zone's hostname.
Zone holds cannot be enabled on CDN-only zones.

### Path Parameters

- `zone_id: string`

  Identifier.

### Query Parameters

- `include_subdomains: optional boolean`

  If provided, the zone hold will extend to block any subdomain of the given zone, as well
  as SSL4SaaS Custom Hostnames. For example, a zone hold on a zone with the hostname
  'example.com' and include_subdomains=true will block 'example.com',
  'staging.example.com', 'api.staging.example.com', etc.

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

- `result: ZoneHold`

  - `hold: optional boolean`

  - `hold_after: optional string`

  - `include_subdomains: optional string`

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/hold \
    -X POST \
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
  "result": {
    "hold": true,
    "hold_after": "2023-01-31T15:56:36+00:00",
    "include_subdomains": "include_subdomains"
  },
  "success": true
}
```

## Update Zone Hold

**patch** `/zones/{zone_id}/hold`

Update the `hold_after` and/or `include_subdomains` values on an existing zone hold.
The hold is enabled if the `hold_after` date-time value is in the past.
Existing zone holds can be removed from CDN-only zones by setting `hold_after` to `null`.
Other zone hold updates cannot be made on CDN-only zones.
Active holds are automatically disabled when a zone transitions to CDN-only mode.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `hold_after: optional string`

  If `hold_after` is provided and future-dated, the hold will be temporarily disabled,
  then automatically re-enabled by the system at the time specified
  in this RFC3339-formatted timestamp. A past-dated `hold_after` value will have
  no effect on an existing, enabled hold. Providing an empty string will set its value
  to the current time. Providing `null` will disable the hold indefinitely.

- `include_subdomains: optional boolean`

  If `true`, the zone hold will extend to block any subdomain of the given zone, as well
  as SSL4SaaS Custom Hostnames. For example, a zone hold on a zone with the hostname
  'example.com' and include_subdomains=true will block 'example.com',
  'staging.example.com', 'api.staging.example.com', etc.

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

- `result: ZoneHold`

  - `hold: optional boolean`

  - `hold_after: optional string`

  - `include_subdomains: optional string`

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/hold \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "hold_after": "2023-01-31T15:56:36+00:00",
          "include_subdomains": true
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
    "hold": true,
    "hold_after": "2023-01-31T15:56:36+00:00",
    "include_subdomains": "include_subdomains"
  },
  "success": true
}
```

## Remove Zone Hold

**delete** `/zones/{zone_id}/hold`

Stop enforcement of a zone hold on the zone, permanently or temporarily, allowing the
creation and activation of zones with this zone's hostname.
Existing zone holds can be removed from CDN-only zones when `hold_after` is not provided.
Active holds are automatically disabled when a zone transitions to CDN-only mode.

### Path Parameters

- `zone_id: string`

  Identifier.

### Query Parameters

- `hold_after: optional string`

  If `hold_after` is provided, the hold will be temporarily disabled,
  then automatically re-enabled by the system at the time specified
  in this RFC3339-formatted timestamp. Otherwise, the hold will be
  disabled indefinitely. `hold_after` cannot be provided for CDN-only zones.

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

- `result: ZoneHold`

  - `hold: optional boolean`

  - `hold_after: optional string`

  - `include_subdomains: optional string`

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/hold \
    -X DELETE \
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
  "result": {
    "hold": true,
    "hold_after": "2023-01-31T15:56:36+00:00",
    "include_subdomains": "include_subdomains"
  },
  "success": true
}
```

## Domain Types

### Zone Hold

- `ZoneHold object { hold, hold_after, include_subdomains }`

  - `hold: optional boolean`

  - `hold_after: optional string`

  - `include_subdomains: optional string`

# Subscriptions

## Zone Subscription Details

**get** `/zones/{zone_id}/subscription`

Lists zone subscription details.

### Path Parameters

- `zone_id: string`

  Identifier

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

- `result: object { id, currency, current_period_end, 5 more }`

  - `id: optional string`

    Subscription identifier tag.

  - `currency: optional string`

    The monetary unit in which pricing information is displayed.

  - `current_period_end: optional string`

    The end of the current period and also when the next billing is due.

  - `current_period_start: optional string`

    When the current billing period started. May match initial_period_start if this is the first period.

  - `frequency: optional "weekly" or "monthly" or "quarterly" or 2 more`

    How often the subscription is renewed automatically.

    - `"weekly"`

    - `"monthly"`

    - `"quarterly"`

    - `"yearly"`

    - `"not-applicable"`

  - `price: optional number`

    The price of the subscription that will be billed, in US dollars.

  - `rate_plan: optional RatePlan`

    The rate plan applied to the subscription.

    - `id: optional "free" or "lite" or "pro" or 7 more`

      The ID of the rate plan.

      - `"free"`

      - `"lite"`

      - `"pro"`

      - `"pro_plus"`

      - `"business"`

      - `"enterprise"`

      - `"partners_free"`

      - `"partners_pro"`

      - `"partners_business"`

      - `"partners_enterprise"`

    - `currency: optional string`

      The currency applied to the rate plan subscription.

    - `externally_managed: optional boolean`

      Whether this rate plan is managed externally from Cloudflare.

    - `is_contract: optional boolean`

      Whether a rate plan is enterprise-based (or newly adopted term contract).

    - `public_name: optional string`

      The full name of the rate plan.

    - `scope: optional string`

      The scope that this rate plan applies to.

    - `sets: optional array of string`

      The list of sets this rate plan applies to. Returns array of strings.

  - `state: optional "Trial" or "Provisioned" or "Paid" or 4 more`

    The state that the subscription is in.

    - `"Trial"`

    - `"Provisioned"`

    - `"Paid"`

    - `"AwaitingPayment"`

    - `"Cancelled"`

    - `"Failed"`

    - `"Expired"`

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/subscription \
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
  "result": {
    "id": "506e3185e9c882d175a2d0cb0093d9f2",
    "currency": "USD",
    "current_period_end": "2014-03-31T12:20:00Z",
    "current_period_start": "2014-05-11T12:20:00Z",
    "frequency": "monthly",
    "price": 20,
    "rate_plan": {
      "id": "free",
      "currency": "USD",
      "externally_managed": false,
      "is_contract": false,
      "public_name": "Business Plan",
      "scope": "zone",
      "sets": [
        "string"
      ]
    },
    "state": "Paid"
  },
  "success": true
}
```

## Create Zone Subscription

**post** `/zones/{zone_id}/subscription`

Create a zone subscription, either plan or add-ons.

### Path Parameters

- `zone_id: string`

  Identifier

### Body Parameters

- `frequency: optional "weekly" or "monthly" or "quarterly" or "yearly"`

  How often the subscription is renewed automatically.

  - `"weekly"`

  - `"monthly"`

  - `"quarterly"`

  - `"yearly"`

- `rate_plan: optional RatePlan`

  The rate plan applied to the subscription.

  - `id: optional "free" or "lite" or "pro" or 7 more`

    The ID of the rate plan.

    - `"free"`

    - `"lite"`

    - `"pro"`

    - `"pro_plus"`

    - `"business"`

    - `"enterprise"`

    - `"partners_free"`

    - `"partners_pro"`

    - `"partners_business"`

    - `"partners_enterprise"`

  - `currency: optional string`

    The currency applied to the rate plan subscription.

  - `externally_managed: optional boolean`

    Whether this rate plan is managed externally from Cloudflare.

  - `is_contract: optional boolean`

    Whether a rate plan is enterprise-based (or newly adopted term contract).

  - `public_name: optional string`

    The full name of the rate plan.

  - `scope: optional string`

    The scope that this rate plan applies to.

  - `sets: optional array of string`

    The list of sets this rate plan applies to. Returns array of strings.

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

- `result: object { id, currency, current_period_end, 5 more }`

  - `id: optional string`

    Subscription identifier tag.

  - `currency: optional string`

    The monetary unit in which pricing information is displayed.

  - `current_period_end: optional string`

    The end of the current period and also when the next billing is due.

  - `current_period_start: optional string`

    When the current billing period started. May match initial_period_start if this is the first period.

  - `frequency: optional "weekly" or "monthly" or "quarterly" or 2 more`

    How often the subscription is renewed automatically.

    - `"weekly"`

    - `"monthly"`

    - `"quarterly"`

    - `"yearly"`

    - `"not-applicable"`

  - `price: optional number`

    The price of the subscription that will be billed, in US dollars.

  - `rate_plan: optional RatePlan`

    The rate plan applied to the subscription.

    - `id: optional "free" or "lite" or "pro" or 7 more`

      The ID of the rate plan.

      - `"free"`

      - `"lite"`

      - `"pro"`

      - `"pro_plus"`

      - `"business"`

      - `"enterprise"`

      - `"partners_free"`

      - `"partners_pro"`

      - `"partners_business"`

      - `"partners_enterprise"`

    - `currency: optional string`

      The currency applied to the rate plan subscription.

    - `externally_managed: optional boolean`

      Whether this rate plan is managed externally from Cloudflare.

    - `is_contract: optional boolean`

      Whether a rate plan is enterprise-based (or newly adopted term contract).

    - `public_name: optional string`

      The full name of the rate plan.

    - `scope: optional string`

      The scope that this rate plan applies to.

    - `sets: optional array of string`

      The list of sets this rate plan applies to. Returns array of strings.

  - `state: optional "Trial" or "Provisioned" or "Paid" or 4 more`

    The state that the subscription is in.

    - `"Trial"`

    - `"Provisioned"`

    - `"Paid"`

    - `"AwaitingPayment"`

    - `"Cancelled"`

    - `"Failed"`

    - `"Expired"`

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/subscription \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "frequency": "monthly"
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
    "id": "506e3185e9c882d175a2d0cb0093d9f2",
    "currency": "USD",
    "current_period_end": "2014-03-31T12:20:00Z",
    "current_period_start": "2014-05-11T12:20:00Z",
    "frequency": "monthly",
    "price": 20,
    "rate_plan": {
      "id": "free",
      "currency": "USD",
      "externally_managed": false,
      "is_contract": false,
      "public_name": "Business Plan",
      "scope": "zone",
      "sets": [
        "string"
      ]
    },
    "state": "Paid"
  },
  "success": true
}
```

## Update Zone Subscription

**put** `/zones/{zone_id}/subscription`

Updates zone subscriptions, either plan or add-ons.

### Path Parameters

- `zone_id: string`

  Identifier

### Body Parameters

- `frequency: optional "weekly" or "monthly" or "quarterly" or "yearly"`

  How often the subscription is renewed automatically.

  - `"weekly"`

  - `"monthly"`

  - `"quarterly"`

  - `"yearly"`

- `rate_plan: optional RatePlan`

  The rate plan applied to the subscription.

  - `id: optional "free" or "lite" or "pro" or 7 more`

    The ID of the rate plan.

    - `"free"`

    - `"lite"`

    - `"pro"`

    - `"pro_plus"`

    - `"business"`

    - `"enterprise"`

    - `"partners_free"`

    - `"partners_pro"`

    - `"partners_business"`

    - `"partners_enterprise"`

  - `currency: optional string`

    The currency applied to the rate plan subscription.

  - `externally_managed: optional boolean`

    Whether this rate plan is managed externally from Cloudflare.

  - `is_contract: optional boolean`

    Whether a rate plan is enterprise-based (or newly adopted term contract).

  - `public_name: optional string`

    The full name of the rate plan.

  - `scope: optional string`

    The scope that this rate plan applies to.

  - `sets: optional array of string`

    The list of sets this rate plan applies to. Returns array of strings.

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

- `result: object { id, currency, current_period_end, 5 more }`

  - `id: optional string`

    Subscription identifier tag.

  - `currency: optional string`

    The monetary unit in which pricing information is displayed.

  - `current_period_end: optional string`

    The end of the current period and also when the next billing is due.

  - `current_period_start: optional string`

    When the current billing period started. May match initial_period_start if this is the first period.

  - `frequency: optional "weekly" or "monthly" or "quarterly" or 2 more`

    How often the subscription is renewed automatically.

    - `"weekly"`

    - `"monthly"`

    - `"quarterly"`

    - `"yearly"`

    - `"not-applicable"`

  - `price: optional number`

    The price of the subscription that will be billed, in US dollars.

  - `rate_plan: optional RatePlan`

    The rate plan applied to the subscription.

    - `id: optional "free" or "lite" or "pro" or 7 more`

      The ID of the rate plan.

      - `"free"`

      - `"lite"`

      - `"pro"`

      - `"pro_plus"`

      - `"business"`

      - `"enterprise"`

      - `"partners_free"`

      - `"partners_pro"`

      - `"partners_business"`

      - `"partners_enterprise"`

    - `currency: optional string`

      The currency applied to the rate plan subscription.

    - `externally_managed: optional boolean`

      Whether this rate plan is managed externally from Cloudflare.

    - `is_contract: optional boolean`

      Whether a rate plan is enterprise-based (or newly adopted term contract).

    - `public_name: optional string`

      The full name of the rate plan.

    - `scope: optional string`

      The scope that this rate plan applies to.

    - `sets: optional array of string`

      The list of sets this rate plan applies to. Returns array of strings.

  - `state: optional "Trial" or "Provisioned" or "Paid" or 4 more`

    The state that the subscription is in.

    - `"Trial"`

    - `"Provisioned"`

    - `"Paid"`

    - `"AwaitingPayment"`

    - `"Cancelled"`

    - `"Failed"`

    - `"Expired"`

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/subscription \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "frequency": "monthly"
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
    "id": "506e3185e9c882d175a2d0cb0093d9f2",
    "currency": "USD",
    "current_period_end": "2014-03-31T12:20:00Z",
    "current_period_start": "2014-05-11T12:20:00Z",
    "frequency": "monthly",
    "price": 20,
    "rate_plan": {
      "id": "free",
      "currency": "USD",
      "externally_managed": false,
      "is_contract": false,
      "public_name": "Business Plan",
      "scope": "zone",
      "sets": [
        "string"
      ]
    },
    "state": "Paid"
  },
  "success": true
}
```

## Domain Types

### Subscription Get Response

- `SubscriptionGetResponse object { id, currency, current_period_end, 5 more }`

  - `id: optional string`

    Subscription identifier tag.

  - `currency: optional string`

    The monetary unit in which pricing information is displayed.

  - `current_period_end: optional string`

    The end of the current period and also when the next billing is due.

  - `current_period_start: optional string`

    When the current billing period started. May match initial_period_start if this is the first period.

  - `frequency: optional "weekly" or "monthly" or "quarterly" or 2 more`

    How often the subscription is renewed automatically.

    - `"weekly"`

    - `"monthly"`

    - `"quarterly"`

    - `"yearly"`

    - `"not-applicable"`

  - `price: optional number`

    The price of the subscription that will be billed, in US dollars.

  - `rate_plan: optional RatePlan`

    The rate plan applied to the subscription.

    - `id: optional "free" or "lite" or "pro" or 7 more`

      The ID of the rate plan.

      - `"free"`

      - `"lite"`

      - `"pro"`

      - `"pro_plus"`

      - `"business"`

      - `"enterprise"`

      - `"partners_free"`

      - `"partners_pro"`

      - `"partners_business"`

      - `"partners_enterprise"`

    - `currency: optional string`

      The currency applied to the rate plan subscription.

    - `externally_managed: optional boolean`

      Whether this rate plan is managed externally from Cloudflare.

    - `is_contract: optional boolean`

      Whether a rate plan is enterprise-based (or newly adopted term contract).

    - `public_name: optional string`

      The full name of the rate plan.

    - `scope: optional string`

      The scope that this rate plan applies to.

    - `sets: optional array of string`

      The list of sets this rate plan applies to. Returns array of strings.

  - `state: optional "Trial" or "Provisioned" or "Paid" or 4 more`

    The state that the subscription is in.

    - `"Trial"`

    - `"Provisioned"`

    - `"Paid"`

    - `"AwaitingPayment"`

    - `"Cancelled"`

    - `"Failed"`

    - `"Expired"`

### Subscription Create Response

- `SubscriptionCreateResponse object { id, currency, current_period_end, 5 more }`

  - `id: optional string`

    Subscription identifier tag.

  - `currency: optional string`

    The monetary unit in which pricing information is displayed.

  - `current_period_end: optional string`

    The end of the current period and also when the next billing is due.

  - `current_period_start: optional string`

    When the current billing period started. May match initial_period_start if this is the first period.

  - `frequency: optional "weekly" or "monthly" or "quarterly" or 2 more`

    How often the subscription is renewed automatically.

    - `"weekly"`

    - `"monthly"`

    - `"quarterly"`

    - `"yearly"`

    - `"not-applicable"`

  - `price: optional number`

    The price of the subscription that will be billed, in US dollars.

  - `rate_plan: optional RatePlan`

    The rate plan applied to the subscription.

    - `id: optional "free" or "lite" or "pro" or 7 more`

      The ID of the rate plan.

      - `"free"`

      - `"lite"`

      - `"pro"`

      - `"pro_plus"`

      - `"business"`

      - `"enterprise"`

      - `"partners_free"`

      - `"partners_pro"`

      - `"partners_business"`

      - `"partners_enterprise"`

    - `currency: optional string`

      The currency applied to the rate plan subscription.

    - `externally_managed: optional boolean`

      Whether this rate plan is managed externally from Cloudflare.

    - `is_contract: optional boolean`

      Whether a rate plan is enterprise-based (or newly adopted term contract).

    - `public_name: optional string`

      The full name of the rate plan.

    - `scope: optional string`

      The scope that this rate plan applies to.

    - `sets: optional array of string`

      The list of sets this rate plan applies to. Returns array of strings.

  - `state: optional "Trial" or "Provisioned" or "Paid" or 4 more`

    The state that the subscription is in.

    - `"Trial"`

    - `"Provisioned"`

    - `"Paid"`

    - `"AwaitingPayment"`

    - `"Cancelled"`

    - `"Failed"`

    - `"Expired"`

### Subscription Update Response

- `SubscriptionUpdateResponse object { id, currency, current_period_end, 5 more }`

  - `id: optional string`

    Subscription identifier tag.

  - `currency: optional string`

    The monetary unit in which pricing information is displayed.

  - `current_period_end: optional string`

    The end of the current period and also when the next billing is due.

  - `current_period_start: optional string`

    When the current billing period started. May match initial_period_start if this is the first period.

  - `frequency: optional "weekly" or "monthly" or "quarterly" or 2 more`

    How often the subscription is renewed automatically.

    - `"weekly"`

    - `"monthly"`

    - `"quarterly"`

    - `"yearly"`

    - `"not-applicable"`

  - `price: optional number`

    The price of the subscription that will be billed, in US dollars.

  - `rate_plan: optional RatePlan`

    The rate plan applied to the subscription.

    - `id: optional "free" or "lite" or "pro" or 7 more`

      The ID of the rate plan.

      - `"free"`

      - `"lite"`

      - `"pro"`

      - `"pro_plus"`

      - `"business"`

      - `"enterprise"`

      - `"partners_free"`

      - `"partners_pro"`

      - `"partners_business"`

      - `"partners_enterprise"`

    - `currency: optional string`

      The currency applied to the rate plan subscription.

    - `externally_managed: optional boolean`

      Whether this rate plan is managed externally from Cloudflare.

    - `is_contract: optional boolean`

      Whether a rate plan is enterprise-based (or newly adopted term contract).

    - `public_name: optional string`

      The full name of the rate plan.

    - `scope: optional string`

      The scope that this rate plan applies to.

    - `sets: optional array of string`

      The list of sets this rate plan applies to. Returns array of strings.

  - `state: optional "Trial" or "Provisioned" or "Paid" or 4 more`

    The state that the subscription is in.

    - `"Trial"`

    - `"Provisioned"`

    - `"Paid"`

    - `"AwaitingPayment"`

    - `"Cancelled"`

    - `"Failed"`

    - `"Expired"`

# Plans

## List Available Plans

**get** `/zones/{zone_id}/available_plans`

Lists available plans the zone can subscribe to.

### Path Parameters

- `zone_id: string`

  Identifier

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

- `result: array of AvailableRatePlan`

  - `id: optional string`

    Identifier

  - `can_subscribe: optional boolean`

    Indicates whether you can subscribe to this plan.

  - `currency: optional string`

    The monetary unit in which pricing information is displayed.

  - `externally_managed: optional boolean`

    Indicates whether this plan is managed externally.

  - `frequency: optional "weekly" or "monthly" or "quarterly" or "yearly"`

    The frequency at which you will be billed for this plan.

    - `"weekly"`

    - `"monthly"`

    - `"quarterly"`

    - `"yearly"`

  - `is_subscribed: optional boolean`

    Indicates whether you are currently subscribed to this plan.

  - `legacy_discount: optional boolean`

    Indicates whether this plan has a legacy discount applied.

  - `legacy_id: optional string`

    The legacy identifier for this rate plan, if any.

  - `name: optional string`

    The plan name.

  - `price: optional number`

    The amount you will be billed for this plan.

- `success: true`

  Whether the API call was successful

  - `true`

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Total number of results for the requested service

  - `page: optional number`

    Current page within paginated list of results

  - `per_page: optional number`

    Number of results per page of results

  - `total_count: optional number`

    Total results available without any search parameters

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/available_plans \
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
      "can_subscribe": true,
      "currency": "USD",
      "externally_managed": false,
      "frequency": "monthly",
      "is_subscribed": false,
      "legacy_discount": false,
      "legacy_id": "free",
      "name": "Free Plan",
      "price": 0
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

## Available Plan Details

**get** `/zones/{zone_id}/available_plans/{plan_identifier}`

Details of the available plan that the zone can subscribe to.

### Path Parameters

- `zone_id: string`

  Identifier

- `plan_identifier: string`

  Identifier

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

- `result: AvailableRatePlan`

  - `id: optional string`

    Identifier

  - `can_subscribe: optional boolean`

    Indicates whether you can subscribe to this plan.

  - `currency: optional string`

    The monetary unit in which pricing information is displayed.

  - `externally_managed: optional boolean`

    Indicates whether this plan is managed externally.

  - `frequency: optional "weekly" or "monthly" or "quarterly" or "yearly"`

    The frequency at which you will be billed for this plan.

    - `"weekly"`

    - `"monthly"`

    - `"quarterly"`

    - `"yearly"`

  - `is_subscribed: optional boolean`

    Indicates whether you are currently subscribed to this plan.

  - `legacy_discount: optional boolean`

    Indicates whether this plan has a legacy discount applied.

  - `legacy_id: optional string`

    The legacy identifier for this rate plan, if any.

  - `name: optional string`

    The plan name.

  - `price: optional number`

    The amount you will be billed for this plan.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/available_plans/$PLAN_IDENTIFIER \
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
  "result": {
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "can_subscribe": true,
    "currency": "USD",
    "externally_managed": false,
    "frequency": "monthly",
    "is_subscribed": false,
    "legacy_discount": false,
    "legacy_id": "free",
    "name": "Free Plan",
    "price": 0
  },
  "success": true
}
```

## Domain Types

### Available Rate Plan

- `AvailableRatePlan object { id, can_subscribe, currency, 7 more }`

  - `id: optional string`

    Identifier

  - `can_subscribe: optional boolean`

    Indicates whether you can subscribe to this plan.

  - `currency: optional string`

    The monetary unit in which pricing information is displayed.

  - `externally_managed: optional boolean`

    Indicates whether this plan is managed externally.

  - `frequency: optional "weekly" or "monthly" or "quarterly" or "yearly"`

    The frequency at which you will be billed for this plan.

    - `"weekly"`

    - `"monthly"`

    - `"quarterly"`

    - `"yearly"`

  - `is_subscribed: optional boolean`

    Indicates whether you are currently subscribed to this plan.

  - `legacy_discount: optional boolean`

    Indicates whether this plan has a legacy discount applied.

  - `legacy_id: optional string`

    The legacy identifier for this rate plan, if any.

  - `name: optional string`

    The plan name.

  - `price: optional number`

    The amount you will be billed for this plan.

# Rate Plans

## List Available Rate Plans

**get** `/zones/{zone_id}/available_rate_plans`

Lists all rate plans the zone can subscribe to.

### Path Parameters

- `zone_id: string`

  Identifier

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

- `result: array of object { id, components, currency, 3 more }`

  - `id: optional string`

    Plan identifier tag.

  - `components: optional array of object { default, name, unit_price }`

    Array of available components values for the plan.

    - `default: optional number`

      The default amount allocated.

    - `name: optional "zones" or "page_rules" or "dedicated_certificates" or "dedicated_certificates_custom"`

      The unique component.

      - `"zones"`

      - `"page_rules"`

      - `"dedicated_certificates"`

      - `"dedicated_certificates_custom"`

    - `unit_price: optional number`

      The unit price of the addon.

  - `currency: optional string`

    The monetary unit in which pricing information is displayed.

  - `duration: optional number`

    The duration of the plan subscription.

  - `frequency: optional "weekly" or "monthly" or "quarterly" or "yearly"`

    The frequency at which you will be billed for this plan.

    - `"weekly"`

    - `"monthly"`

    - `"quarterly"`

    - `"yearly"`

  - `name: optional string`

    The plan name.

- `success: true`

  Whether the API call was successful

  - `true`

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Total number of results for the requested service

  - `page: optional number`

    Current page within paginated list of results

  - `per_page: optional number`

    Number of results per page of results

  - `total_count: optional number`

    Total results available without any search parameters

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/available_rate_plans \
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
      "id": "free",
      "components": [
        {
          "default": 5,
          "name": "page_rules",
          "unit_price": 1
        }
      ],
      "currency": "USD",
      "duration": 1,
      "frequency": "monthly",
      "name": "Free Plan"
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

### Rate Plan Get Response

- `RatePlanGetResponse object { id, components, currency, 3 more }`

  - `id: optional string`

    Plan identifier tag.

  - `components: optional array of object { default, name, unit_price }`

    Array of available components values for the plan.

    - `default: optional number`

      The default amount allocated.

    - `name: optional "zones" or "page_rules" or "dedicated_certificates" or "dedicated_certificates_custom"`

      The unique component.

      - `"zones"`

      - `"page_rules"`

      - `"dedicated_certificates"`

      - `"dedicated_certificates_custom"`

    - `unit_price: optional number`

      The unit price of the addon.

  - `currency: optional string`

    The monetary unit in which pricing information is displayed.

  - `duration: optional number`

    The duration of the plan subscription.

  - `frequency: optional "weekly" or "monthly" or "quarterly" or "yearly"`

    The frequency at which you will be billed for this plan.

    - `"weekly"`

    - `"monthly"`

    - `"quarterly"`

    - `"yearly"`

  - `name: optional string`

    The plan name.

# CT

# Alerting

## Get CT Alerting Subscription

**get** `/zones/{zone_id}/ct/alerting`

Retrieve the Certificate Transparency alerting subscription settings for a zone. Returns whether CT monitoring is enabled and, for Business and Enterprise zones, the list of email addresses that receive alerts.

### Path Parameters

- `zone_id: string`

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

- `result: optional object { enabled, emails }`

  Certificate Transparency alerting subscription settings for a zone.

  - `enabled: boolean`

    Whether CT alerting is enabled for the zone.

  - `emails: optional array of string`

    Email addresses that receive CT alert notifications. Only present and configurable for Business and Enterprise zones. Maximum of 10 addresses. For Free and Pro zones, notifications are sent to all users with SSL permissions on the zone.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/ct/alerting \
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
    "enabled": true,
    "emails": [
      "security@example.com",
      "admin@example.com"
    ]
  }
}
```

## Update CT Alerting Subscription

**patch** `/zones/{zone_id}/ct/alerting`

Create or update the Certificate Transparency alerting subscription for a zone. Enables or disables email notifications when certificates are issued for the zone's domains.
For Free and Pro zones, the subscription is toggled on or off using the enabled field. Notification emails are sent to all users with SSL permissions on the zone.
For Business and Enterprise zones, the emails field is required and controls which addresses receive alerts. Setting emails to an empty list disables the subscription regardless of the enabled field. A maximum of 10 email addresses may be configured.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `enabled: boolean`

  Whether CT alerting is enabled for the zone.

- `emails: optional array of string`

  Email addresses that receive CT alert notifications. Only present and configurable for Business and Enterprise zones. Maximum of 10 addresses. For Free and Pro zones, notifications are sent to all users with SSL permissions on the zone.

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

- `result: optional object { enabled, emails }`

  Certificate Transparency alerting subscription settings for a zone.

  - `enabled: boolean`

    Whether CT alerting is enabled for the zone.

  - `emails: optional array of string`

    Email addresses that receive CT alert notifications. Only present and configurable for Business and Enterprise zones. Maximum of 10 addresses. For Free and Pro zones, notifications are sent to all users with SSL permissions on the zone.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/ct/alerting \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "enabled": true,
          "emails": [
            "security@example.com",
            "admin@example.com"
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
  "success": true,
  "result": {
    "enabled": true,
    "emails": [
      "security@example.com",
      "admin@example.com"
    ]
  }
}
```

## Domain Types

### Alerting Get Response

- `AlertingGetResponse object { enabled, emails }`

  Certificate Transparency alerting subscription settings for a zone.

  - `enabled: boolean`

    Whether CT alerting is enabled for the zone.

  - `emails: optional array of string`

    Email addresses that receive CT alert notifications. Only present and configurable for Business and Enterprise zones. Maximum of 10 addresses. For Free and Pro zones, notifications are sent to all users with SSL permissions on the zone.

### Alerting Edit Response

- `AlertingEditResponse object { enabled, emails }`

  Certificate Transparency alerting subscription settings for a zone.

  - `enabled: boolean`

    Whether CT alerting is enabled for the zone.

  - `emails: optional array of string`

    Email addresses that receive CT alert notifications. Only present and configurable for Business and Enterprise zones. Maximum of 10 addresses. For Free and Pro zones, notifications are sent to all users with SSL permissions on the zone.

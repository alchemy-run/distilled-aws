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

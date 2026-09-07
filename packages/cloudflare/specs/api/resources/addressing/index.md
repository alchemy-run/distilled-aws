# Addressing

# Regional Hostnames

## List Regional Hostnames

**get** `/zones/{zone_id}/addressing/regional_hostnames`

List all Regional Hostnames within a zone.

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

- `result: optional array of object { created_on, hostname, region_key, routing }`

  - `created_on: string`

    When the regional hostname was created

  - `hostname: string`

    DNS hostname to be regionalized, must be a subdomain of the zone. Wildcards are supported for one level, e.g `*.example.com`

  - `region_key: string`

    Identifying key for the region

  - `routing: string`

    Configure which routing method to use for the regional hostname

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
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/addressing/regional_hostnames \
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
      "created_on": "2014-01-01T05:20:00.12345Z",
      "hostname": "foo.example.com",
      "region_key": "ca",
      "routing": "dns"
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

## Fetch Regional Hostname

**get** `/zones/{zone_id}/addressing/regional_hostnames/{hostname}`

Fetch the configuration for a specific Regional Hostname, within a zone.

### Path Parameters

- `zone_id: string`

  Identifier.

- `hostname: string`

  DNS hostname to be regionalized, must be a subdomain of the zone. Wildcards are supported for one level, e.g `*.example.com`

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

- `result: optional object { created_on, hostname, region_key, routing }`

  - `created_on: string`

    When the regional hostname was created

  - `hostname: string`

    DNS hostname to be regionalized, must be a subdomain of the zone. Wildcards are supported for one level, e.g `*.example.com`

  - `region_key: string`

    Identifying key for the region

  - `routing: string`

    Configure which routing method to use for the regional hostname

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/addressing/regional_hostnames/$HOSTNAME \
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
    "created_on": "2014-01-01T05:20:00.12345Z",
    "hostname": "foo.example.com",
    "region_key": "ca",
    "routing": "dns"
  }
}
```

## Create Regional Hostname

**post** `/zones/{zone_id}/addressing/regional_hostnames`

Create a new Regional Hostname entry. Cloudflare will only use data centers that are physically located within the chosen region to decrypt and service HTTPS traffic. Learn more about [Regional Services](https://developers.cloudflare.com/data-localization/regional-services/get-started/).

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `hostname: string`

  DNS hostname to be regionalized, must be a subdomain of the zone. Wildcards are supported for one level, e.g `*.example.com`

- `region_key: string`

  Identifying key for the region

- `routing: optional string`

  Configure which routing method to use for the regional hostname

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

- `result: optional object { created_on, hostname, region_key, routing }`

  - `created_on: string`

    When the regional hostname was created

  - `hostname: string`

    DNS hostname to be regionalized, must be a subdomain of the zone. Wildcards are supported for one level, e.g `*.example.com`

  - `region_key: string`

    Identifying key for the region

  - `routing: string`

    Configure which routing method to use for the regional hostname

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/addressing/regional_hostnames \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "hostname": "foo.example.com",
          "region_key": "ca",
          "routing": "dns"
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
    "created_on": "2014-01-01T05:20:00.12345Z",
    "hostname": "foo.example.com",
    "region_key": "ca",
    "routing": "dns"
  }
}
```

## Update Regional Hostname

**patch** `/zones/{zone_id}/addressing/regional_hostnames/{hostname}`

Update the configuration for a specific Regional Hostname. Only the region_key of a hostname is mutable.

### Path Parameters

- `zone_id: string`

  Identifier.

- `hostname: string`

  DNS hostname to be regionalized, must be a subdomain of the zone. Wildcards are supported for one level, e.g `*.example.com`

### Body Parameters

- `region_key: string`

  Identifying key for the region

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

- `result: optional object { created_on, hostname, region_key, routing }`

  - `created_on: string`

    When the regional hostname was created

  - `hostname: string`

    DNS hostname to be regionalized, must be a subdomain of the zone. Wildcards are supported for one level, e.g `*.example.com`

  - `region_key: string`

    Identifying key for the region

  - `routing: string`

    Configure which routing method to use for the regional hostname

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/addressing/regional_hostnames/$HOSTNAME \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "region_key": "ca"
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
    "created_on": "2014-01-01T05:20:00.12345Z",
    "hostname": "foo.example.com",
    "region_key": "ca",
    "routing": "dns"
  }
}
```

## Delete Regional Hostname

**delete** `/zones/{zone_id}/addressing/regional_hostnames/{hostname}`

Delete the region configuration for a specific Regional Hostname.

### Path Parameters

- `zone_id: string`

  Identifier.

- `hostname: string`

  DNS hostname to be regionalized, must be a subdomain of the zone. Wildcards are supported for one level, e.g `*.example.com`

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
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/addressing/regional_hostnames/$HOSTNAME \
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
  "success": true
}
```

## Domain Types

### Regional Hostname List Response

- `RegionalHostnameListResponse object { created_on, hostname, region_key, routing }`

  - `created_on: string`

    When the regional hostname was created

  - `hostname: string`

    DNS hostname to be regionalized, must be a subdomain of the zone. Wildcards are supported for one level, e.g `*.example.com`

  - `region_key: string`

    Identifying key for the region

  - `routing: string`

    Configure which routing method to use for the regional hostname

### Regional Hostname Get Response

- `RegionalHostnameGetResponse object { created_on, hostname, region_key, routing }`

  - `created_on: string`

    When the regional hostname was created

  - `hostname: string`

    DNS hostname to be regionalized, must be a subdomain of the zone. Wildcards are supported for one level, e.g `*.example.com`

  - `region_key: string`

    Identifying key for the region

  - `routing: string`

    Configure which routing method to use for the regional hostname

### Regional Hostname Create Response

- `RegionalHostnameCreateResponse object { created_on, hostname, region_key, routing }`

  - `created_on: string`

    When the regional hostname was created

  - `hostname: string`

    DNS hostname to be regionalized, must be a subdomain of the zone. Wildcards are supported for one level, e.g `*.example.com`

  - `region_key: string`

    Identifying key for the region

  - `routing: string`

    Configure which routing method to use for the regional hostname

### Regional Hostname Edit Response

- `RegionalHostnameEditResponse object { created_on, hostname, region_key, routing }`

  - `created_on: string`

    When the regional hostname was created

  - `hostname: string`

    DNS hostname to be regionalized, must be a subdomain of the zone. Wildcards are supported for one level, e.g `*.example.com`

  - `region_key: string`

    Identifying key for the region

  - `routing: string`

    Configure which routing method to use for the regional hostname

### Regional Hostname Delete Response

- `RegionalHostnameDeleteResponse object { errors, messages, success }`

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

# Regions

## List Regions

**get** `/accounts/{account_id}/addressing/regional_hostnames/regions`

List all Regional Services regions available for use by this account.

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

- `result: optional array of object { key, label }`

  - `key: optional string`

    Identifying key for the region

  - `label: optional string`

    Human-readable text label for the region

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/regional_hostnames/regions \
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
      "key": "ca",
      "label": "Canada"
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

## Domain Types

### Region List Response

- `RegionListResponse object { key, label }`

  - `key: optional string`

    Identifying key for the region

  - `label: optional string`

    Human-readable text label for the region

# Services

## List Services

**get** `/accounts/{account_id}/addressing/services`

Bring-Your-Own IP (BYOIP) prefixes onboarded to Cloudflare must be bound to a service running on the Cloudflare network to enable a Cloudflare product on the IP addresses. This endpoint can be used as a reference of available services on the Cloudflare network, and their service IDs.

### Path Parameters

- `account_id: string`

  Identifier of a Cloudflare account.

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

- `result: optional array of object { id, name }`

  - `id: optional string`

    Identifier of a Service on the Cloudflare network. Available services and their IDs may be found in the
    **List Services** endpoint.

  - `name: optional string`

    Name of a service running on the Cloudflare network

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/services \
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
      "id": "2db684ee7ca04e159946fd05b99e1bcd",
      "name": "Magic Transit"
    }
  ]
}
```

## Domain Types

### Service List Response

- `ServiceListResponse object { id, name }`

  - `id: optional string`

    Identifier of a Service on the Cloudflare network. Available services and their IDs may be found in the
    **List Services** endpoint.

  - `name: optional string`

    Name of a service running on the Cloudflare network

# Address Maps

## List Address Maps

**get** `/accounts/{account_id}/addressing/address_maps`

List all address maps owned by the account.

### Path Parameters

- `account_id: string`

  Identifier of a Cloudflare account.

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

- `result: optional array of AddressMap`

  - `id: optional string`

    Identifier of an Address Map.

  - `can_delete: optional boolean`

    If set to false, then the Address Map cannot be deleted via API. This is true for Cloudflare-managed maps.

  - `can_modify_ips: optional boolean`

    If set to false, then the IPs on the Address Map cannot be modified via the API. This is true for Cloudflare-managed maps.

  - `created_at: optional string`

  - `default_sni: optional string`

    If you have legacy TLS clients which do not send the TLS server name indicator, then you can specify one default SNI on the map. If Cloudflare receives a TLS handshake from a client without an SNI, it will respond with the default SNI on those IPs. The default SNI can be any valid zone or subdomain owned by the account.

  - `description: optional string`

    An optional description field which may be used to describe the types of IPs or zones on the map.

  - `enabled: optional boolean`

    Whether the Address Map is enabled or not. Cloudflare's DNS will not respond with IP addresses on an Address Map until the map is enabled.

  - `modified_at: optional string`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/address_maps \
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
      "id": "055817b111884e0227e1be16a0be6ee0",
      "can_delete": true,
      "can_modify_ips": true,
      "created_at": "2014-01-01T05:20:00.12345Z",
      "default_sni": "*.example.com",
      "description": "My Ecommerce zones",
      "enabled": true,
      "modified_at": "2014-01-01T05:20:00.12345Z"
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

## Address Map Details

**get** `/accounts/{account_id}/addressing/address_maps/{address_map_id}`

Show a particular address map owned by the account.

### Path Parameters

- `account_id: string`

  Identifier of a Cloudflare account.

- `address_map_id: string`

  Identifier of an Address Map.

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

- `result: optional object { id, can_delete, can_modify_ips, 7 more }`

  - `id: optional string`

    Identifier of an Address Map.

  - `can_delete: optional boolean`

    If set to false, then the Address Map cannot be deleted via API. This is true for Cloudflare-managed maps.

  - `can_modify_ips: optional boolean`

    If set to false, then the IPs on the Address Map cannot be modified via the API. This is true for Cloudflare-managed maps.

  - `created_at: optional string`

  - `default_sni: optional string`

    If you have legacy TLS clients which do not send the TLS server name indicator, then you can specify one default SNI on the map. If Cloudflare receives a TLS handshake from a client without an SNI, it will respond with the default SNI on those IPs. The default SNI can be any valid zone or subdomain owned by the account.

  - `description: optional string`

    An optional description field which may be used to describe the types of IPs or zones on the map.

  - `enabled: optional boolean`

    Whether the Address Map is enabled or not. Cloudflare's DNS will not respond with IP addresses on an Address Map until the map is enabled.

  - `ips: optional IPs`

    The set of IPs on the Address Map.

    - `created_at: optional string`

    - `ip: optional string`

      An IPv4 or IPv6 address.

  - `memberships: optional array of object { can_delete, created_at, identifier, kind }`

    Zones and Accounts which will be assigned IPs on this Address Map. A zone membership will take priority over an account membership.

    - `can_delete: optional boolean`

      Controls whether the membership can be deleted via the API or not.

    - `created_at: optional string`

    - `identifier: optional string`

      The identifier for the membership (eg. a zone or account tag).

    - `kind: optional Kind`

      The type of the membership.

      - `"zone"`

      - `"account"`

  - `modified_at: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/address_maps/$ADDRESS_MAP_ID \
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
    "id": "055817b111884e0227e1be16a0be6ee0",
    "can_delete": true,
    "can_modify_ips": true,
    "created_at": "2014-01-01T05:20:00.12345Z",
    "default_sni": "*.example.com",
    "description": "My Ecommerce zones",
    "enabled": true,
    "ips": [
      {
        "created_at": "2014-01-01T05:20:00.12345Z",
        "ip": "192.0.2.1"
      }
    ],
    "memberships": [
      {
        "can_delete": true,
        "created_at": "2014-01-01T05:20:00.12345Z",
        "identifier": "023e105f4ecef8ad9ca31a8372d0c353",
        "kind": "zone"
      }
    ],
    "modified_at": "2014-01-01T05:20:00.12345Z"
  }
}
```

## Create Address Map

**post** `/accounts/{account_id}/addressing/address_maps`

Create a new address map under the account.

### Path Parameters

- `account_id: string`

  Identifier of a Cloudflare account.

### Body Parameters

- `description: optional string`

  An optional description field which may be used to describe the types of IPs or zones on the map.

- `enabled: optional boolean`

  Whether the Address Map is enabled or not. Cloudflare's DNS will not respond with IP addresses on an Address Map until the map is enabled.

- `ips: optional array of string`

- `memberships: optional array of object { identifier, kind }`

  Zones and Accounts which will be assigned IPs on this Address Map. A zone membership will take priority over an account membership.

  - `identifier: optional string`

    The identifier for the membership (eg. a zone or account tag).

  - `kind: optional Kind`

    The type of the membership.

    - `"zone"`

    - `"account"`

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

- `result: optional object { id, can_delete, can_modify_ips, 7 more }`

  - `id: optional string`

    Identifier of an Address Map.

  - `can_delete: optional boolean`

    If set to false, then the Address Map cannot be deleted via API. This is true for Cloudflare-managed maps.

  - `can_modify_ips: optional boolean`

    If set to false, then the IPs on the Address Map cannot be modified via the API. This is true for Cloudflare-managed maps.

  - `created_at: optional string`

  - `default_sni: optional string`

    If you have legacy TLS clients which do not send the TLS server name indicator, then you can specify one default SNI on the map. If Cloudflare receives a TLS handshake from a client without an SNI, it will respond with the default SNI on those IPs. The default SNI can be any valid zone or subdomain owned by the account.

  - `description: optional string`

    An optional description field which may be used to describe the types of IPs or zones on the map.

  - `enabled: optional boolean`

    Whether the Address Map is enabled or not. Cloudflare's DNS will not respond with IP addresses on an Address Map until the map is enabled.

  - `ips: optional IPs`

    The set of IPs on the Address Map.

    - `created_at: optional string`

    - `ip: optional string`

      An IPv4 or IPv6 address.

  - `memberships: optional array of object { can_delete, created_at, identifier, kind }`

    Zones and Accounts which will be assigned IPs on this Address Map. A zone membership will take priority over an account membership.

    - `can_delete: optional boolean`

      Controls whether the membership can be deleted via the API or not.

    - `created_at: optional string`

    - `identifier: optional string`

      The identifier for the membership (eg. a zone or account tag).

    - `kind: optional Kind`

      The type of the membership.

      - `"zone"`

      - `"account"`

  - `modified_at: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/address_maps \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "description": "My Ecommerce zones",
          "enabled": true,
          "ips": [
            "192.0.2.1"
          ],
          "memberships": [
            {
              "identifier": "023e105f4ecef8ad9ca31a8372d0c353",
              "kind": "zone"
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
  "success": true,
  "result": {
    "id": "055817b111884e0227e1be16a0be6ee0",
    "can_delete": true,
    "can_modify_ips": true,
    "created_at": "2014-01-01T05:20:00.12345Z",
    "default_sni": "*.example.com",
    "description": "My Ecommerce zones",
    "enabled": true,
    "ips": [
      {
        "created_at": "2014-01-01T05:20:00.12345Z",
        "ip": "192.0.2.1"
      }
    ],
    "memberships": [
      {
        "can_delete": true,
        "created_at": "2014-01-01T05:20:00.12345Z",
        "identifier": "023e105f4ecef8ad9ca31a8372d0c353",
        "kind": "zone"
      }
    ],
    "modified_at": "2014-01-01T05:20:00.12345Z"
  }
}
```

## Update Address Map

**patch** `/accounts/{account_id}/addressing/address_maps/{address_map_id}`

Modify properties of an address map owned by the account.

### Path Parameters

- `account_id: string`

  Identifier of a Cloudflare account.

- `address_map_id: string`

  Identifier of an Address Map.

### Body Parameters

- `default_sni: optional string`

  If you have legacy TLS clients which do not send the TLS server name indicator, then you can specify one default SNI on the map. If Cloudflare receives a TLS handshake from a client without an SNI, it will respond with the default SNI on those IPs. The default SNI can be any valid zone or subdomain owned by the account.

- `description: optional string`

  An optional description field which may be used to describe the types of IPs or zones on the map.

- `enabled: optional boolean`

  Whether the Address Map is enabled or not. Cloudflare's DNS will not respond with IP addresses on an Address Map until the map is enabled.

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

- `result: optional AddressMap`

  - `id: optional string`

    Identifier of an Address Map.

  - `can_delete: optional boolean`

    If set to false, then the Address Map cannot be deleted via API. This is true for Cloudflare-managed maps.

  - `can_modify_ips: optional boolean`

    If set to false, then the IPs on the Address Map cannot be modified via the API. This is true for Cloudflare-managed maps.

  - `created_at: optional string`

  - `default_sni: optional string`

    If you have legacy TLS clients which do not send the TLS server name indicator, then you can specify one default SNI on the map. If Cloudflare receives a TLS handshake from a client without an SNI, it will respond with the default SNI on those IPs. The default SNI can be any valid zone or subdomain owned by the account.

  - `description: optional string`

    An optional description field which may be used to describe the types of IPs or zones on the map.

  - `enabled: optional boolean`

    Whether the Address Map is enabled or not. Cloudflare's DNS will not respond with IP addresses on an Address Map until the map is enabled.

  - `modified_at: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/address_maps/$ADDRESS_MAP_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "default_sni": "*.example.com",
          "description": "My Ecommerce zones",
          "enabled": true
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
    "id": "055817b111884e0227e1be16a0be6ee0",
    "can_delete": true,
    "can_modify_ips": true,
    "created_at": "2014-01-01T05:20:00.12345Z",
    "default_sni": "*.example.com",
    "description": "My Ecommerce zones",
    "enabled": true,
    "modified_at": "2014-01-01T05:20:00.12345Z"
  }
}
```

## Delete Address Map

**delete** `/accounts/{account_id}/addressing/address_maps/{address_map_id}`

Delete a particular address map owned by the account. An Address Map must be disabled before it can be deleted.

### Path Parameters

- `account_id: string`

  Identifier of a Cloudflare account.

- `address_map_id: string`

  Identifier of an Address Map.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/address_maps/$ADDRESS_MAP_ID \
    -X DELETE \
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

### Address Map

- `AddressMap object { id, can_delete, can_modify_ips, 5 more }`

  - `id: optional string`

    Identifier of an Address Map.

  - `can_delete: optional boolean`

    If set to false, then the Address Map cannot be deleted via API. This is true for Cloudflare-managed maps.

  - `can_modify_ips: optional boolean`

    If set to false, then the IPs on the Address Map cannot be modified via the API. This is true for Cloudflare-managed maps.

  - `created_at: optional string`

  - `default_sni: optional string`

    If you have legacy TLS clients which do not send the TLS server name indicator, then you can specify one default SNI on the map. If Cloudflare receives a TLS handshake from a client without an SNI, it will respond with the default SNI on those IPs. The default SNI can be any valid zone or subdomain owned by the account.

  - `description: optional string`

    An optional description field which may be used to describe the types of IPs or zones on the map.

  - `enabled: optional boolean`

    Whether the Address Map is enabled or not. Cloudflare's DNS will not respond with IP addresses on an Address Map until the map is enabled.

  - `modified_at: optional string`

### Kind

- `Kind = "zone" or "account"`

  The type of the membership.

  - `"zone"`

  - `"account"`

### Address Map Get Response

- `AddressMapGetResponse object { id, can_delete, can_modify_ips, 7 more }`

  - `id: optional string`

    Identifier of an Address Map.

  - `can_delete: optional boolean`

    If set to false, then the Address Map cannot be deleted via API. This is true for Cloudflare-managed maps.

  - `can_modify_ips: optional boolean`

    If set to false, then the IPs on the Address Map cannot be modified via the API. This is true for Cloudflare-managed maps.

  - `created_at: optional string`

  - `default_sni: optional string`

    If you have legacy TLS clients which do not send the TLS server name indicator, then you can specify one default SNI on the map. If Cloudflare receives a TLS handshake from a client without an SNI, it will respond with the default SNI on those IPs. The default SNI can be any valid zone or subdomain owned by the account.

  - `description: optional string`

    An optional description field which may be used to describe the types of IPs or zones on the map.

  - `enabled: optional boolean`

    Whether the Address Map is enabled or not. Cloudflare's DNS will not respond with IP addresses on an Address Map until the map is enabled.

  - `ips: optional IPs`

    The set of IPs on the Address Map.

    - `created_at: optional string`

    - `ip: optional string`

      An IPv4 or IPv6 address.

  - `memberships: optional array of object { can_delete, created_at, identifier, kind }`

    Zones and Accounts which will be assigned IPs on this Address Map. A zone membership will take priority over an account membership.

    - `can_delete: optional boolean`

      Controls whether the membership can be deleted via the API or not.

    - `created_at: optional string`

    - `identifier: optional string`

      The identifier for the membership (eg. a zone or account tag).

    - `kind: optional Kind`

      The type of the membership.

      - `"zone"`

      - `"account"`

  - `modified_at: optional string`

### Address Map Create Response

- `AddressMapCreateResponse object { id, can_delete, can_modify_ips, 7 more }`

  - `id: optional string`

    Identifier of an Address Map.

  - `can_delete: optional boolean`

    If set to false, then the Address Map cannot be deleted via API. This is true for Cloudflare-managed maps.

  - `can_modify_ips: optional boolean`

    If set to false, then the IPs on the Address Map cannot be modified via the API. This is true for Cloudflare-managed maps.

  - `created_at: optional string`

  - `default_sni: optional string`

    If you have legacy TLS clients which do not send the TLS server name indicator, then you can specify one default SNI on the map. If Cloudflare receives a TLS handshake from a client without an SNI, it will respond with the default SNI on those IPs. The default SNI can be any valid zone or subdomain owned by the account.

  - `description: optional string`

    An optional description field which may be used to describe the types of IPs or zones on the map.

  - `enabled: optional boolean`

    Whether the Address Map is enabled or not. Cloudflare's DNS will not respond with IP addresses on an Address Map until the map is enabled.

  - `ips: optional IPs`

    The set of IPs on the Address Map.

    - `created_at: optional string`

    - `ip: optional string`

      An IPv4 or IPv6 address.

  - `memberships: optional array of object { can_delete, created_at, identifier, kind }`

    Zones and Accounts which will be assigned IPs on this Address Map. A zone membership will take priority over an account membership.

    - `can_delete: optional boolean`

      Controls whether the membership can be deleted via the API or not.

    - `created_at: optional string`

    - `identifier: optional string`

      The identifier for the membership (eg. a zone or account tag).

    - `kind: optional Kind`

      The type of the membership.

      - `"zone"`

      - `"account"`

  - `modified_at: optional string`

### Address Map Delete Response

- `AddressMapDeleteResponse object { errors, messages, success, result_info }`

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

# Accounts

## Add an account membership to an Address Map

**put** `/accounts/{account_id}/addressing/address_maps/{address_map_id}/accounts/{account_id}`

Add an account as a member of a particular address map.

### Path Parameters

- `account_id: string`

  Identifier of a Cloudflare account.

- `address_map_id: string`

  Identifier of an Address Map.

### Body Parameters

- `body: unknown`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/address_maps/$ADDRESS_MAP_ID/accounts/$ACCOUNT_ID \
    -X PUT \
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
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```

## Remove an account membership from an Address Map

**delete** `/accounts/{account_id}/addressing/address_maps/{address_map_id}/accounts/{account_id}`

Remove an account as a member of a particular address map.

### Path Parameters

- `account_id: string`

  Identifier of a Cloudflare account.

- `address_map_id: string`

  Identifier of an Address Map.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/address_maps/$ADDRESS_MAP_ID/accounts/$ACCOUNT_ID \
    -X DELETE \
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

### Account Update Response

- `AccountUpdateResponse object { errors, messages, success, result_info }`

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

### Account Delete Response

- `AccountDeleteResponse object { errors, messages, success, result_info }`

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

# IPs

## Add an IP to an Address Map

**put** `/accounts/{account_id}/addressing/address_maps/{address_map_id}/ips/{ip_address}`

Add an IP from a prefix owned by the account to a particular address map.

### Path Parameters

- `account_id: string`

  Identifier of a Cloudflare account.

- `address_map_id: string`

  Identifier of an Address Map.

- `ip_address: string`

  An IPv4 or IPv6 address.

### Body Parameters

- `body: unknown`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/address_maps/$ADDRESS_MAP_ID/ips/$IP_ADDRESS \
    -X PUT \
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
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```

## Remove an IP from an Address Map

**delete** `/accounts/{account_id}/addressing/address_maps/{address_map_id}/ips/{ip_address}`

Remove an IP from a particular address map.

### Path Parameters

- `account_id: string`

  Identifier of a Cloudflare account.

- `address_map_id: string`

  Identifier of an Address Map.

- `ip_address: string`

  An IPv4 or IPv6 address.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/address_maps/$ADDRESS_MAP_ID/ips/$IP_ADDRESS \
    -X DELETE \
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

### IP Update Response

- `IPUpdateResponse object { errors, messages, success, result_info }`

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

### IP Delete Response

- `IPDeleteResponse object { errors, messages, success, result_info }`

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

# Zones

## Add a zone membership to an Address Map

**put** `/accounts/{account_id}/addressing/address_maps/{address_map_id}/zones/{zone_id}`

Add a zone as a member of a particular address map.

### Path Parameters

- `zone_id: string`

  Identifier of a zone.

- `account_id: string`

  Identifier of a Cloudflare account.

- `address_map_id: string`

  Identifier of an Address Map.

### Body Parameters

- `body: unknown`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/address_maps/$ADDRESS_MAP_ID/zones/$ZONE_ID \
    -X PUT \
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
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```

## Remove a zone membership from an Address Map

**delete** `/accounts/{account_id}/addressing/address_maps/{address_map_id}/zones/{zone_id}`

Remove a zone as a member of a particular address map.

### Path Parameters

- `zone_id: string`

  Identifier of a zone.

- `account_id: string`

  Identifier of a Cloudflare account.

- `address_map_id: string`

  Identifier of an Address Map.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/address_maps/$ADDRESS_MAP_ID/zones/$ZONE_ID \
    -X DELETE \
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

### Zone Update Response

- `ZoneUpdateResponse object { errors, messages, success, result_info }`

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

### Zone Delete Response

- `ZoneDeleteResponse object { errors, messages, success, result_info }`

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

# LOA Documents

## Download LOA Document

**get** `/accounts/{account_id}/addressing/loa_documents/{loa_document_id}/download`

Download specified LOA document under the account.

### Path Parameters

- `account_id: string`

  Identifier of a Cloudflare account.

- `loa_document_id: string`

  Identifier for the uploaded LOA document.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/loa_documents/$LOA_DOCUMENT_ID/download \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
```

## Upload LOA Document

**post** `/accounts/{account_id}/addressing/loa_documents`

Submit LOA document (pdf format) under the account.

### Path Parameters

- `account_id: string`

  Identifier of a Cloudflare account.

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

- `result: optional object { id, account_id, auto_generated, 5 more }`

  - `id: optional string`

    Identifier for the uploaded LOA document.

  - `account_id: optional string`

    Identifier of a Cloudflare account.

  - `auto_generated: optional boolean`

    Whether the LOA has been auto-generated for the prefix owner by Cloudflare.

  - `created: optional string`

  - `filename: optional string`

    Name of LOA document. Max file size 10MB, and supported filetype is pdf.

  - `size_bytes: optional number`

    File size of the uploaded LOA document.

  - `verified: optional boolean`

    Whether the LOA has been verified by Cloudflare staff.

  - `verified_at: optional string`

    Timestamp of the moment the LOA was marked as validated.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/loa_documents \
    -H 'Content-Type: multipart/form-data' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -F loa_document=@document.pdf
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
    "id": "d933b1530bc56c9953cf8ce166da8004",
    "account_id": "258def64c72dae45f3e4c8516e2111f2",
    "auto_generated": true,
    "created": "2014-01-01T05:20:00.12345Z",
    "filename": "site_loa_doc.pdf",
    "size_bytes": 444,
    "verified": true,
    "verified_at": "2019-12-27T18:11:19.117Z"
  }
}
```

## Domain Types

### LOA Document Create Response

- `LOADocumentCreateResponse object { id, account_id, auto_generated, 5 more }`

  - `id: optional string`

    Identifier for the uploaded LOA document.

  - `account_id: optional string`

    Identifier of a Cloudflare account.

  - `auto_generated: optional boolean`

    Whether the LOA has been auto-generated for the prefix owner by Cloudflare.

  - `created: optional string`

  - `filename: optional string`

    Name of LOA document. Max file size 10MB, and supported filetype is pdf.

  - `size_bytes: optional number`

    File size of the uploaded LOA document.

  - `verified: optional boolean`

    Whether the LOA has been verified by Cloudflare staff.

  - `verified_at: optional string`

    Timestamp of the moment the LOA was marked as validated.

# Prefixes

## List Prefixes

**get** `/accounts/{account_id}/addressing/prefixes`

List all prefixes owned by the account.

### Path Parameters

- `account_id: string`

  Identifier of a Cloudflare account.

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

- `result: optional array of Prefix`

  - `id: optional string`

    Identifier of an IP Prefix.

  - `account_id: optional string`

    Identifier of a Cloudflare account.

  - `advertised: optional boolean`

    Prefix advertisement status to the Internet. This field is only not 'null' if on demand is enabled.

  - `advertised_modified_at: optional string`

    Last time the advertisement status was changed. This field is only not 'null' if on demand is enabled.

  - `approved: optional string`

    Approval state of the prefix (P = pending, V = active).

  - `asn: optional number`

    Autonomous System Number (ASN) the prefix will be advertised under.

  - `cidr: optional string`

    IP Prefix in Classless Inter-Domain Routing format.

  - `created_at: optional string`

  - `delegate_loa_creation: optional boolean`

    Whether Cloudflare is allowed to generate the LOA document on behalf of the prefix owner.

  - `description: optional string`

    Description of the prefix.

  - `irr_validation_state: optional string`

    State of one kind of validation for an IP prefix.

  - `loa_document_id: optional string`

    Identifier for the uploaded LOA document.

  - `modified_at: optional string`

  - `on_demand_enabled: optional boolean`

    Whether advertisement of the prefix to the Internet may be dynamically enabled or disabled.

  - `on_demand_locked: optional boolean`

    Whether advertisement status of the prefix is locked, meaning it cannot be changed.

  - `ownership_validation_state: optional string`

    State of one kind of validation for an IP prefix.

  - `ownership_validation_token: optional string`

    Token provided to demonstrate ownership of the prefix.

  - `rpki_validation_state: optional string`

    State of one kind of validation for an IP prefix.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/prefixes \
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
      "id": "2af39739cc4e3b5910c918468bb89828",
      "account_id": "258def64c72dae45f3e4c8516e2111f2",
      "advertised": true,
      "advertised_modified_at": "2014-01-01T05:20:00.12345Z",
      "approved": "P",
      "asn": 13335,
      "cidr": "192.0.2.0/24",
      "created_at": "2014-01-01T05:20:00.12345Z",
      "delegate_loa_creation": true,
      "description": "Internal test prefix",
      "irr_validation_state": "pending",
      "loa_document_id": "d933b1530bc56c9953cf8ce166da8004",
      "modified_at": "2014-01-01T05:20:00.12345Z",
      "on_demand_enabled": true,
      "on_demand_locked": false,
      "ownership_validation_state": "pending",
      "ownership_validation_token": "1234a5b6-1234-1abc-12a3-1234a5b6789c",
      "rpki_validation_state": "pending"
    }
  ]
}
```

## Prefix Details

**get** `/accounts/{account_id}/addressing/prefixes/{prefix_id}`

List a particular prefix owned by the account.

### Path Parameters

- `account_id: string`

  Identifier of a Cloudflare account.

- `prefix_id: string`

  Identifier of an IP Prefix.

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

- `result: optional Prefix`

  - `id: optional string`

    Identifier of an IP Prefix.

  - `account_id: optional string`

    Identifier of a Cloudflare account.

  - `advertised: optional boolean`

    Prefix advertisement status to the Internet. This field is only not 'null' if on demand is enabled.

  - `advertised_modified_at: optional string`

    Last time the advertisement status was changed. This field is only not 'null' if on demand is enabled.

  - `approved: optional string`

    Approval state of the prefix (P = pending, V = active).

  - `asn: optional number`

    Autonomous System Number (ASN) the prefix will be advertised under.

  - `cidr: optional string`

    IP Prefix in Classless Inter-Domain Routing format.

  - `created_at: optional string`

  - `delegate_loa_creation: optional boolean`

    Whether Cloudflare is allowed to generate the LOA document on behalf of the prefix owner.

  - `description: optional string`

    Description of the prefix.

  - `irr_validation_state: optional string`

    State of one kind of validation for an IP prefix.

  - `loa_document_id: optional string`

    Identifier for the uploaded LOA document.

  - `modified_at: optional string`

  - `on_demand_enabled: optional boolean`

    Whether advertisement of the prefix to the Internet may be dynamically enabled or disabled.

  - `on_demand_locked: optional boolean`

    Whether advertisement status of the prefix is locked, meaning it cannot be changed.

  - `ownership_validation_state: optional string`

    State of one kind of validation for an IP prefix.

  - `ownership_validation_token: optional string`

    Token provided to demonstrate ownership of the prefix.

  - `rpki_validation_state: optional string`

    State of one kind of validation for an IP prefix.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/prefixes/$PREFIX_ID \
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
    "id": "2af39739cc4e3b5910c918468bb89828",
    "account_id": "258def64c72dae45f3e4c8516e2111f2",
    "advertised": true,
    "advertised_modified_at": "2014-01-01T05:20:00.12345Z",
    "approved": "P",
    "asn": 13335,
    "cidr": "192.0.2.0/24",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "delegate_loa_creation": true,
    "description": "Internal test prefix",
    "irr_validation_state": "pending",
    "loa_document_id": "d933b1530bc56c9953cf8ce166da8004",
    "modified_at": "2014-01-01T05:20:00.12345Z",
    "on_demand_enabled": true,
    "on_demand_locked": false,
    "ownership_validation_state": "pending",
    "ownership_validation_token": "1234a5b6-1234-1abc-12a3-1234a5b6789c",
    "rpki_validation_state": "pending"
  }
}
```

## Add Prefix

**post** `/accounts/{account_id}/addressing/prefixes`

Add a new prefix under the account.

### Path Parameters

- `account_id: string`

  Identifier of a Cloudflare account.

### Body Parameters

- `asn: number`

  Autonomous System Number (ASN) the prefix will be advertised under.

- `cidr: string`

  IP Prefix in Classless Inter-Domain Routing format.

- `delegate_loa_creation: optional boolean`

  Whether Cloudflare is allowed to generate the LOA document on behalf of the prefix owner.

- `description: optional string`

  Description of the prefix.

- `loa_document_id: optional string`

  Identifier for the uploaded LOA document.

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

- `result: optional Prefix`

  - `id: optional string`

    Identifier of an IP Prefix.

  - `account_id: optional string`

    Identifier of a Cloudflare account.

  - `advertised: optional boolean`

    Prefix advertisement status to the Internet. This field is only not 'null' if on demand is enabled.

  - `advertised_modified_at: optional string`

    Last time the advertisement status was changed. This field is only not 'null' if on demand is enabled.

  - `approved: optional string`

    Approval state of the prefix (P = pending, V = active).

  - `asn: optional number`

    Autonomous System Number (ASN) the prefix will be advertised under.

  - `cidr: optional string`

    IP Prefix in Classless Inter-Domain Routing format.

  - `created_at: optional string`

  - `delegate_loa_creation: optional boolean`

    Whether Cloudflare is allowed to generate the LOA document on behalf of the prefix owner.

  - `description: optional string`

    Description of the prefix.

  - `irr_validation_state: optional string`

    State of one kind of validation for an IP prefix.

  - `loa_document_id: optional string`

    Identifier for the uploaded LOA document.

  - `modified_at: optional string`

  - `on_demand_enabled: optional boolean`

    Whether advertisement of the prefix to the Internet may be dynamically enabled or disabled.

  - `on_demand_locked: optional boolean`

    Whether advertisement status of the prefix is locked, meaning it cannot be changed.

  - `ownership_validation_state: optional string`

    State of one kind of validation for an IP prefix.

  - `ownership_validation_token: optional string`

    Token provided to demonstrate ownership of the prefix.

  - `rpki_validation_state: optional string`

    State of one kind of validation for an IP prefix.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/prefixes \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "asn": 13335,
          "cidr": "192.0.2.0/24",
          "delegate_loa_creation": true,
          "description": "Internal test prefix",
          "loa_document_id": "d933b1530bc56c9953cf8ce166da8004"
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
    "id": "2af39739cc4e3b5910c918468bb89828",
    "account_id": "258def64c72dae45f3e4c8516e2111f2",
    "advertised": true,
    "advertised_modified_at": "2014-01-01T05:20:00.12345Z",
    "approved": "P",
    "asn": 13335,
    "cidr": "192.0.2.0/24",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "delegate_loa_creation": true,
    "description": "Internal test prefix",
    "irr_validation_state": "pending",
    "loa_document_id": "d933b1530bc56c9953cf8ce166da8004",
    "modified_at": "2014-01-01T05:20:00.12345Z",
    "on_demand_enabled": true,
    "on_demand_locked": false,
    "ownership_validation_state": "pending",
    "ownership_validation_token": "1234a5b6-1234-1abc-12a3-1234a5b6789c",
    "rpki_validation_state": "pending"
  }
}
```

## Update Prefix Description

**patch** `/accounts/{account_id}/addressing/prefixes/{prefix_id}`

Modify the description for a prefix owned by the account.

### Path Parameters

- `account_id: string`

  Identifier of a Cloudflare account.

- `prefix_id: string`

  Identifier of an IP Prefix.

### Body Parameters

- `description: string`

  Description of the prefix.

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

- `result: optional Prefix`

  - `id: optional string`

    Identifier of an IP Prefix.

  - `account_id: optional string`

    Identifier of a Cloudflare account.

  - `advertised: optional boolean`

    Prefix advertisement status to the Internet. This field is only not 'null' if on demand is enabled.

  - `advertised_modified_at: optional string`

    Last time the advertisement status was changed. This field is only not 'null' if on demand is enabled.

  - `approved: optional string`

    Approval state of the prefix (P = pending, V = active).

  - `asn: optional number`

    Autonomous System Number (ASN) the prefix will be advertised under.

  - `cidr: optional string`

    IP Prefix in Classless Inter-Domain Routing format.

  - `created_at: optional string`

  - `delegate_loa_creation: optional boolean`

    Whether Cloudflare is allowed to generate the LOA document on behalf of the prefix owner.

  - `description: optional string`

    Description of the prefix.

  - `irr_validation_state: optional string`

    State of one kind of validation for an IP prefix.

  - `loa_document_id: optional string`

    Identifier for the uploaded LOA document.

  - `modified_at: optional string`

  - `on_demand_enabled: optional boolean`

    Whether advertisement of the prefix to the Internet may be dynamically enabled or disabled.

  - `on_demand_locked: optional boolean`

    Whether advertisement status of the prefix is locked, meaning it cannot be changed.

  - `ownership_validation_state: optional string`

    State of one kind of validation for an IP prefix.

  - `ownership_validation_token: optional string`

    Token provided to demonstrate ownership of the prefix.

  - `rpki_validation_state: optional string`

    State of one kind of validation for an IP prefix.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/prefixes/$PREFIX_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "description": "Internal test prefix"
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
    "id": "2af39739cc4e3b5910c918468bb89828",
    "account_id": "258def64c72dae45f3e4c8516e2111f2",
    "advertised": true,
    "advertised_modified_at": "2014-01-01T05:20:00.12345Z",
    "approved": "P",
    "asn": 13335,
    "cidr": "192.0.2.0/24",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "delegate_loa_creation": true,
    "description": "Internal test prefix",
    "irr_validation_state": "pending",
    "loa_document_id": "d933b1530bc56c9953cf8ce166da8004",
    "modified_at": "2014-01-01T05:20:00.12345Z",
    "on_demand_enabled": true,
    "on_demand_locked": false,
    "ownership_validation_state": "pending",
    "ownership_validation_token": "1234a5b6-1234-1abc-12a3-1234a5b6789c",
    "rpki_validation_state": "pending"
  }
}
```

## Delete Prefix

**delete** `/accounts/{account_id}/addressing/prefixes/{prefix_id}`

Delete an unapproved prefix owned by the account.

### Path Parameters

- `account_id: string`

  Identifier of a Cloudflare account.

- `prefix_id: string`

  Identifier of an IP Prefix.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/prefixes/$PREFIX_ID \
    -X DELETE \
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
  "success": true
}
```

## Domain Types

### Prefix

- `Prefix object { id, account_id, advertised, 15 more }`

  - `id: optional string`

    Identifier of an IP Prefix.

  - `account_id: optional string`

    Identifier of a Cloudflare account.

  - `advertised: optional boolean`

    Prefix advertisement status to the Internet. This field is only not 'null' if on demand is enabled.

  - `advertised_modified_at: optional string`

    Last time the advertisement status was changed. This field is only not 'null' if on demand is enabled.

  - `approved: optional string`

    Approval state of the prefix (P = pending, V = active).

  - `asn: optional number`

    Autonomous System Number (ASN) the prefix will be advertised under.

  - `cidr: optional string`

    IP Prefix in Classless Inter-Domain Routing format.

  - `created_at: optional string`

  - `delegate_loa_creation: optional boolean`

    Whether Cloudflare is allowed to generate the LOA document on behalf of the prefix owner.

  - `description: optional string`

    Description of the prefix.

  - `irr_validation_state: optional string`

    State of one kind of validation for an IP prefix.

  - `loa_document_id: optional string`

    Identifier for the uploaded LOA document.

  - `modified_at: optional string`

  - `on_demand_enabled: optional boolean`

    Whether advertisement of the prefix to the Internet may be dynamically enabled or disabled.

  - `on_demand_locked: optional boolean`

    Whether advertisement status of the prefix is locked, meaning it cannot be changed.

  - `ownership_validation_state: optional string`

    State of one kind of validation for an IP prefix.

  - `ownership_validation_token: optional string`

    Token provided to demonstrate ownership of the prefix.

  - `rpki_validation_state: optional string`

    State of one kind of validation for an IP prefix.

### Prefix Delete Response

- `PrefixDeleteResponse object { errors, messages, success }`

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

# Service Bindings

## List Service Bindings

**get** `/accounts/{account_id}/addressing/prefixes/{prefix_id}/bindings`

List the Cloudflare services this prefix is currently bound to. Traffic sent to an address within an IP prefix will be routed to the Cloudflare service of the most-specific Service Binding matching the address.
**Example:** binding `192.0.2.0/24` to Cloudflare Magic Transit and `192.0.2.1/32` to the Cloudflare CDN would route traffic for `192.0.2.1` to the CDN, and traffic for all other IPs in the prefix to Cloudflare Magic Transit.

### Path Parameters

- `account_id: string`

  Identifier of a Cloudflare account.

- `prefix_id: string`

  Identifier of an IP Prefix.

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

- `result: optional array of ServiceBinding`

  - `id: optional string`

    Identifier of a Service Binding.

  - `cidr: optional string`

    IP Prefix in Classless Inter-Domain Routing format.

  - `provisioning: optional object { state }`

    Status of a Service Binding's deployment to the Cloudflare network

    - `state: optional "provisioning" or "active"`

      When a binding has been deployed to a majority of Cloudflare datacenters, the binding will become active and can be used with its associated service.

      - `"provisioning"`

      - `"active"`

  - `service_id: optional string`

    Identifier of a Service on the Cloudflare network. Available services and their IDs may be found in the
    **List Services** endpoint.

  - `service_name: optional string`

    Name of a service running on the Cloudflare network

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/prefixes/$PREFIX_ID/bindings \
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
      "id": "0429b49b6a5155297b78e75a44b09e14",
      "cidr": "192.0.2.0/24",
      "provisioning": {
        "state": "provisioning"
      },
      "service_id": "2db684ee7ca04e159946fd05b99e1bcd",
      "service_name": "Magic Transit"
    }
  ]
}
```

## Get Service Binding

**get** `/accounts/{account_id}/addressing/prefixes/{prefix_id}/bindings/{binding_id}`

Fetch a single Service Binding

### Path Parameters

- `account_id: string`

  Identifier of a Cloudflare account.

- `prefix_id: string`

  Identifier of an IP Prefix.

- `binding_id: string`

  Identifier of a Service Binding.

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

- `result: optional ServiceBinding`

  - `id: optional string`

    Identifier of a Service Binding.

  - `cidr: optional string`

    IP Prefix in Classless Inter-Domain Routing format.

  - `provisioning: optional object { state }`

    Status of a Service Binding's deployment to the Cloudflare network

    - `state: optional "provisioning" or "active"`

      When a binding has been deployed to a majority of Cloudflare datacenters, the binding will become active and can be used with its associated service.

      - `"provisioning"`

      - `"active"`

  - `service_id: optional string`

    Identifier of a Service on the Cloudflare network. Available services and their IDs may be found in the
    **List Services** endpoint.

  - `service_name: optional string`

    Name of a service running on the Cloudflare network

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/prefixes/$PREFIX_ID/bindings/$BINDING_ID \
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
    "id": "0429b49b6a5155297b78e75a44b09e14",
    "cidr": "192.0.2.0/24",
    "provisioning": {
      "state": "provisioning"
    },
    "service_id": "2db684ee7ca04e159946fd05b99e1bcd",
    "service_name": "Magic Transit"
  }
}
```

## Create Service Binding

**post** `/accounts/{account_id}/addressing/prefixes/{prefix_id}/bindings`

Creates a new Service Binding, routing traffic to IPs within the given CIDR to a service running on Cloudflare's network.
**NOTE:** The first Service Binding created for an IP Prefix must exactly match the IP Prefix's CIDR. Subsequent Service Bindings may be created with a more-specific CIDR. Refer to the  [Service Bindings Documentation](https://developers.cloudflare.com/byoip/service-bindings/) for compatibility details.

### Path Parameters

- `account_id: string`

  Identifier of a Cloudflare account.

- `prefix_id: string`

  Identifier of an IP Prefix.

### Body Parameters

- `cidr: string`

  IP Prefix in Classless Inter-Domain Routing format.

- `service_id: string`

  Identifier of a Service on the Cloudflare network. Available services and their IDs may be found in the
  **List Services** endpoint.

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

- `result: optional ServiceBinding`

  - `id: optional string`

    Identifier of a Service Binding.

  - `cidr: optional string`

    IP Prefix in Classless Inter-Domain Routing format.

  - `provisioning: optional object { state }`

    Status of a Service Binding's deployment to the Cloudflare network

    - `state: optional "provisioning" or "active"`

      When a binding has been deployed to a majority of Cloudflare datacenters, the binding will become active and can be used with its associated service.

      - `"provisioning"`

      - `"active"`

  - `service_id: optional string`

    Identifier of a Service on the Cloudflare network. Available services and their IDs may be found in the
    **List Services** endpoint.

  - `service_name: optional string`

    Name of a service running on the Cloudflare network

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/prefixes/$PREFIX_ID/bindings \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "cidr": "192.0.2.0/24",
          "service_id": "2db684ee7ca04e159946fd05b99e1bcd"
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
    "id": "0429b49b6a5155297b78e75a44b09e14",
    "cidr": "192.0.2.0/24",
    "provisioning": {
      "state": "provisioning"
    },
    "service_id": "2db684ee7ca04e159946fd05b99e1bcd",
    "service_name": "Magic Transit"
  }
}
```

## Delete Service Binding

**delete** `/accounts/{account_id}/addressing/prefixes/{prefix_id}/bindings/{binding_id}`

Delete a Service Binding

### Path Parameters

- `account_id: string`

  Identifier of a Cloudflare account.

- `prefix_id: string`

  Identifier of an IP Prefix.

- `binding_id: string`

  Identifier of a Service Binding.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/prefixes/$PREFIX_ID/bindings/$BINDING_ID \
    -X DELETE \
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
  "success": true
}
```

## Domain Types

### Service Binding

- `ServiceBinding object { id, cidr, provisioning, 2 more }`

  - `id: optional string`

    Identifier of a Service Binding.

  - `cidr: optional string`

    IP Prefix in Classless Inter-Domain Routing format.

  - `provisioning: optional object { state }`

    Status of a Service Binding's deployment to the Cloudflare network

    - `state: optional "provisioning" or "active"`

      When a binding has been deployed to a majority of Cloudflare datacenters, the binding will become active and can be used with its associated service.

      - `"provisioning"`

      - `"active"`

  - `service_id: optional string`

    Identifier of a Service on the Cloudflare network. Available services and their IDs may be found in the
    **List Services** endpoint.

  - `service_name: optional string`

    Name of a service running on the Cloudflare network

### Service Binding Delete Response

- `ServiceBindingDeleteResponse object { errors, messages, success }`

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

# BGP Prefixes

## List BGP Prefixes

**get** `/accounts/{account_id}/addressing/prefixes/{prefix_id}/bgp/prefixes`

List all BGP Prefixes within the specified IP Prefix. BGP Prefixes are used to control which specific subnets are advertised to the Internet. It is possible to advertise subnets more specific than an IP Prefix by creating more specific BGP Prefixes.

### Path Parameters

- `account_id: string`

  Identifier of a Cloudflare account.

- `prefix_id: string`

  Identifier of an IP Prefix.

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

- `result: optional array of BGPPrefix`

  - `id: optional string`

    Identifier of BGP Prefix.

  - `asn: optional number`

    Autonomous System Number (ASN) the prefix will be advertised under.

  - `asn_prepend_count: optional number`

    Number of times to prepend the Cloudflare ASN to the BGP AS-Path attribute

  - `auto_advertise_withdraw: optional boolean`

    Determines if Cloudflare advertises a BYOIP BGP prefix even when there is no matching BGP prefix in the Magic routing table. When true, Cloudflare will automatically withdraw the BGP prefix when there are no matching BGP routes, and will resume advertising when there is at least one matching BGP route.

  - `bgp_signal_opts: optional object { enabled, modified_at }`

    - `enabled: optional boolean`

      Whether control of advertisement of the prefix to the Internet is enabled to be performed via BGP signal

    - `modified_at: optional string`

      Last time BGP signaling control was toggled. This field is null if BGP signaling has never been enabled.

  - `cidr: optional string`

    IP Prefix in Classless Inter-Domain Routing format.

  - `created_at: optional string`

  - `modified_at: optional string`

  - `on_demand: optional object { advertised, advertised_modified_at, on_demand_enabled, on_demand_locked }`

    - `advertised: optional boolean`

      Prefix advertisement status to the Internet. This field is only not 'null' if on demand is enabled.

    - `advertised_modified_at: optional string`

      Last time the advertisement status was changed. This field is only not 'null' if on demand is enabled.

    - `on_demand_enabled: optional boolean`

      Whether advertisement of the prefix to the Internet may be dynamically enabled or disabled.

    - `on_demand_locked: optional boolean`

      Whether the advertisement status of the prefix is locked, meaning it cannot be changed.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/prefixes/$PREFIX_ID/bgp/prefixes \
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
      "id": "7009ba364c7a5760798ceb430e603b74",
      "asn": 13335,
      "asn_prepend_count": 2,
      "auto_advertise_withdraw": true,
      "bgp_signal_opts": {
        "enabled": false,
        "modified_at": "2014-01-01T05:20:00.12345Z"
      },
      "cidr": "192.0.2.0/24",
      "created_at": "2014-01-01T05:20:00.12345Z",
      "modified_at": "2014-01-01T05:20:00.12345Z",
      "on_demand": {
        "advertised": true,
        "advertised_modified_at": "2014-01-01T05:20:00.12345Z",
        "on_demand_enabled": true,
        "on_demand_locked": false
      }
    }
  ]
}
```

## Fetch BGP Prefix

**get** `/accounts/{account_id}/addressing/prefixes/{prefix_id}/bgp/prefixes/{bgp_prefix_id}`

Retrieve a single BGP Prefix according to its identifier

### Path Parameters

- `account_id: string`

  Identifier of a Cloudflare account.

- `prefix_id: string`

  Identifier of an IP Prefix.

- `bgp_prefix_id: string`

  Identifier of BGP Prefix.

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

- `result: optional BGPPrefix`

  - `id: optional string`

    Identifier of BGP Prefix.

  - `asn: optional number`

    Autonomous System Number (ASN) the prefix will be advertised under.

  - `asn_prepend_count: optional number`

    Number of times to prepend the Cloudflare ASN to the BGP AS-Path attribute

  - `auto_advertise_withdraw: optional boolean`

    Determines if Cloudflare advertises a BYOIP BGP prefix even when there is no matching BGP prefix in the Magic routing table. When true, Cloudflare will automatically withdraw the BGP prefix when there are no matching BGP routes, and will resume advertising when there is at least one matching BGP route.

  - `bgp_signal_opts: optional object { enabled, modified_at }`

    - `enabled: optional boolean`

      Whether control of advertisement of the prefix to the Internet is enabled to be performed via BGP signal

    - `modified_at: optional string`

      Last time BGP signaling control was toggled. This field is null if BGP signaling has never been enabled.

  - `cidr: optional string`

    IP Prefix in Classless Inter-Domain Routing format.

  - `created_at: optional string`

  - `modified_at: optional string`

  - `on_demand: optional object { advertised, advertised_modified_at, on_demand_enabled, on_demand_locked }`

    - `advertised: optional boolean`

      Prefix advertisement status to the Internet. This field is only not 'null' if on demand is enabled.

    - `advertised_modified_at: optional string`

      Last time the advertisement status was changed. This field is only not 'null' if on demand is enabled.

    - `on_demand_enabled: optional boolean`

      Whether advertisement of the prefix to the Internet may be dynamically enabled or disabled.

    - `on_demand_locked: optional boolean`

      Whether the advertisement status of the prefix is locked, meaning it cannot be changed.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/prefixes/$PREFIX_ID/bgp/prefixes/$BGP_PREFIX_ID \
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
    "id": "7009ba364c7a5760798ceb430e603b74",
    "asn": 13335,
    "asn_prepend_count": 2,
    "auto_advertise_withdraw": true,
    "bgp_signal_opts": {
      "enabled": false,
      "modified_at": "2014-01-01T05:20:00.12345Z"
    },
    "cidr": "192.0.2.0/24",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "modified_at": "2014-01-01T05:20:00.12345Z",
    "on_demand": {
      "advertised": true,
      "advertised_modified_at": "2014-01-01T05:20:00.12345Z",
      "on_demand_enabled": true,
      "on_demand_locked": false
    }
  }
}
```

## Create BGP Prefix

**post** `/accounts/{account_id}/addressing/prefixes/{prefix_id}/bgp/prefixes`

Create a BGP prefix, controlling the BGP advertisement status of a specific subnet. When created, BGP prefixes are initially withdrawn, and can be advertised with the Update BGP Prefix API.

### Path Parameters

- `account_id: string`

  Identifier of a Cloudflare account.

- `prefix_id: string`

  Identifier of an IP Prefix.

### Body Parameters

- `cidr: string`

  IP Prefix in Classless Inter-Domain Routing format.

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

- `result: optional BGPPrefix`

  - `id: optional string`

    Identifier of BGP Prefix.

  - `asn: optional number`

    Autonomous System Number (ASN) the prefix will be advertised under.

  - `asn_prepend_count: optional number`

    Number of times to prepend the Cloudflare ASN to the BGP AS-Path attribute

  - `auto_advertise_withdraw: optional boolean`

    Determines if Cloudflare advertises a BYOIP BGP prefix even when there is no matching BGP prefix in the Magic routing table. When true, Cloudflare will automatically withdraw the BGP prefix when there are no matching BGP routes, and will resume advertising when there is at least one matching BGP route.

  - `bgp_signal_opts: optional object { enabled, modified_at }`

    - `enabled: optional boolean`

      Whether control of advertisement of the prefix to the Internet is enabled to be performed via BGP signal

    - `modified_at: optional string`

      Last time BGP signaling control was toggled. This field is null if BGP signaling has never been enabled.

  - `cidr: optional string`

    IP Prefix in Classless Inter-Domain Routing format.

  - `created_at: optional string`

  - `modified_at: optional string`

  - `on_demand: optional object { advertised, advertised_modified_at, on_demand_enabled, on_demand_locked }`

    - `advertised: optional boolean`

      Prefix advertisement status to the Internet. This field is only not 'null' if on demand is enabled.

    - `advertised_modified_at: optional string`

      Last time the advertisement status was changed. This field is only not 'null' if on demand is enabled.

    - `on_demand_enabled: optional boolean`

      Whether advertisement of the prefix to the Internet may be dynamically enabled or disabled.

    - `on_demand_locked: optional boolean`

      Whether the advertisement status of the prefix is locked, meaning it cannot be changed.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/prefixes/$PREFIX_ID/bgp/prefixes \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "cidr": "192.0.2.0/24"
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
    "id": "7009ba364c7a5760798ceb430e603b74",
    "asn": 13335,
    "asn_prepend_count": 2,
    "auto_advertise_withdraw": true,
    "bgp_signal_opts": {
      "enabled": false,
      "modified_at": "2014-01-01T05:20:00.12345Z"
    },
    "cidr": "192.0.2.0/24",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "modified_at": "2014-01-01T05:20:00.12345Z",
    "on_demand": {
      "advertised": true,
      "advertised_modified_at": "2014-01-01T05:20:00.12345Z",
      "on_demand_enabled": true,
      "on_demand_locked": false
    }
  }
}
```

## Update BGP Prefix

**patch** `/accounts/{account_id}/addressing/prefixes/{prefix_id}/bgp/prefixes/{bgp_prefix_id}`

Update the properties of a BGP Prefix, such as the on demand advertisement status (advertised or withdrawn).

### Path Parameters

- `account_id: string`

  Identifier of a Cloudflare account.

- `prefix_id: string`

  Identifier of an IP Prefix.

- `bgp_prefix_id: string`

  Identifier of BGP Prefix.

### Body Parameters

- `asn_prepend_count: optional number`

  Number of times to prepend the Cloudflare ASN to the BGP AS-Path attribute

- `auto_advertise_withdraw: optional boolean`

  Determines if Cloudflare advertises a BYOIP BGP prefix even when there is no matching BGP prefix in the Magic routing table. When true, Cloudflare will automatically withdraw the BGP prefix when there are no matching BGP routes, and will resume advertising when there is at least one matching BGP route.

- `on_demand: optional object { advertised }`

  - `advertised: optional boolean`

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

- `result: optional BGPPrefix`

  - `id: optional string`

    Identifier of BGP Prefix.

  - `asn: optional number`

    Autonomous System Number (ASN) the prefix will be advertised under.

  - `asn_prepend_count: optional number`

    Number of times to prepend the Cloudflare ASN to the BGP AS-Path attribute

  - `auto_advertise_withdraw: optional boolean`

    Determines if Cloudflare advertises a BYOIP BGP prefix even when there is no matching BGP prefix in the Magic routing table. When true, Cloudflare will automatically withdraw the BGP prefix when there are no matching BGP routes, and will resume advertising when there is at least one matching BGP route.

  - `bgp_signal_opts: optional object { enabled, modified_at }`

    - `enabled: optional boolean`

      Whether control of advertisement of the prefix to the Internet is enabled to be performed via BGP signal

    - `modified_at: optional string`

      Last time BGP signaling control was toggled. This field is null if BGP signaling has never been enabled.

  - `cidr: optional string`

    IP Prefix in Classless Inter-Domain Routing format.

  - `created_at: optional string`

  - `modified_at: optional string`

  - `on_demand: optional object { advertised, advertised_modified_at, on_demand_enabled, on_demand_locked }`

    - `advertised: optional boolean`

      Prefix advertisement status to the Internet. This field is only not 'null' if on demand is enabled.

    - `advertised_modified_at: optional string`

      Last time the advertisement status was changed. This field is only not 'null' if on demand is enabled.

    - `on_demand_enabled: optional boolean`

      Whether advertisement of the prefix to the Internet may be dynamically enabled or disabled.

    - `on_demand_locked: optional boolean`

      Whether the advertisement status of the prefix is locked, meaning it cannot be changed.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/prefixes/$PREFIX_ID/bgp/prefixes/$BGP_PREFIX_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "asn_prepend_count": 2,
          "auto_advertise_withdraw": true
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
    "id": "7009ba364c7a5760798ceb430e603b74",
    "asn": 13335,
    "asn_prepend_count": 2,
    "auto_advertise_withdraw": true,
    "bgp_signal_opts": {
      "enabled": false,
      "modified_at": "2014-01-01T05:20:00.12345Z"
    },
    "cidr": "192.0.2.0/24",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "modified_at": "2014-01-01T05:20:00.12345Z",
    "on_demand": {
      "advertised": true,
      "advertised_modified_at": "2014-01-01T05:20:00.12345Z",
      "on_demand_enabled": true,
      "on_demand_locked": false
    }
  }
}
```

## Domain Types

### BGP Prefix

- `BGPPrefix object { id, asn, asn_prepend_count, 6 more }`

  - `id: optional string`

    Identifier of BGP Prefix.

  - `asn: optional number`

    Autonomous System Number (ASN) the prefix will be advertised under.

  - `asn_prepend_count: optional number`

    Number of times to prepend the Cloudflare ASN to the BGP AS-Path attribute

  - `auto_advertise_withdraw: optional boolean`

    Determines if Cloudflare advertises a BYOIP BGP prefix even when there is no matching BGP prefix in the Magic routing table. When true, Cloudflare will automatically withdraw the BGP prefix when there are no matching BGP routes, and will resume advertising when there is at least one matching BGP route.

  - `bgp_signal_opts: optional object { enabled, modified_at }`

    - `enabled: optional boolean`

      Whether control of advertisement of the prefix to the Internet is enabled to be performed via BGP signal

    - `modified_at: optional string`

      Last time BGP signaling control was toggled. This field is null if BGP signaling has never been enabled.

  - `cidr: optional string`

    IP Prefix in Classless Inter-Domain Routing format.

  - `created_at: optional string`

  - `modified_at: optional string`

  - `on_demand: optional object { advertised, advertised_modified_at, on_demand_enabled, on_demand_locked }`

    - `advertised: optional boolean`

      Prefix advertisement status to the Internet. This field is only not 'null' if on demand is enabled.

    - `advertised_modified_at: optional string`

      Last time the advertisement status was changed. This field is only not 'null' if on demand is enabled.

    - `on_demand_enabled: optional boolean`

      Whether advertisement of the prefix to the Internet may be dynamically enabled or disabled.

    - `on_demand_locked: optional boolean`

      Whether the advertisement status of the prefix is locked, meaning it cannot be changed.

# Advertisement Status

## Get Advertisement Status

**get** `/accounts/{account_id}/addressing/prefixes/{prefix_id}/bgp/status`

View the current advertisement state for a prefix.

**Deprecated:** Prefer the BGP Prefixes endpoints, which additionally allow for advertising and withdrawing
subnets of an IP prefix.

### Path Parameters

- `account_id: string`

  Identifier of a Cloudflare account.

- `prefix_id: string`

  Identifier of an IP Prefix.

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

- `result: optional object { advertised, advertised_modified_at }`

  - `advertised: optional boolean`

    Advertisement status of the prefix. If `true`, the BGP route for the prefix is advertised to the Internet. If
    `false`, the BGP route is withdrawn.

  - `advertised_modified_at: optional string`

    Last time the advertisement status was changed. This field is only not 'null' if on demand is enabled.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/prefixes/$PREFIX_ID/bgp/status \
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
    "advertised": true,
    "advertised_modified_at": "2014-01-01T05:20:00.12345Z"
  }
}
```

## Update Prefix Dynamic Advertisement Status

**patch** `/accounts/{account_id}/addressing/prefixes/{prefix_id}/bgp/status`

Advertise or withdraw the BGP route for a prefix.

**Deprecated:** Prefer the BGP Prefixes endpoints, which additionally allow for advertising and withdrawing
subnets of an IP prefix.

### Path Parameters

- `account_id: string`

  Identifier of a Cloudflare account.

- `prefix_id: string`

  Identifier of an IP Prefix.

### Body Parameters

- `advertised: boolean`

  Advertisement status of the prefix. If `true`, the BGP route for the prefix is advertised to the Internet. If
  `false`, the BGP route is withdrawn.

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

- `result: optional object { advertised, advertised_modified_at }`

  - `advertised: optional boolean`

    Advertisement status of the prefix. If `true`, the BGP route for the prefix is advertised to the Internet. If
    `false`, the BGP route is withdrawn.

  - `advertised_modified_at: optional string`

    Last time the advertisement status was changed. This field is only not 'null' if on demand is enabled.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/prefixes/$PREFIX_ID/bgp/status \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "advertised": true
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
    "advertised": true,
    "advertised_modified_at": "2014-01-01T05:20:00.12345Z"
  }
}
```

## Domain Types

### Advertisement Status Get Response

- `AdvertisementStatusGetResponse object { advertised, advertised_modified_at }`

  - `advertised: optional boolean`

    Advertisement status of the prefix. If `true`, the BGP route for the prefix is advertised to the Internet. If
    `false`, the BGP route is withdrawn.

  - `advertised_modified_at: optional string`

    Last time the advertisement status was changed. This field is only not 'null' if on demand is enabled.

### Advertisement Status Edit Response

- `AdvertisementStatusEditResponse object { advertised, advertised_modified_at }`

  - `advertised: optional boolean`

    Advertisement status of the prefix. If `true`, the BGP route for the prefix is advertised to the Internet. If
    `false`, the BGP route is withdrawn.

  - `advertised_modified_at: optional string`

    Last time the advertisement status was changed. This field is only not 'null' if on demand is enabled.

# Delegations

## List Prefix Delegations

**get** `/accounts/{account_id}/addressing/prefixes/{prefix_id}/delegations`

List all delegations for a given account IP prefix.

### Path Parameters

- `account_id: string`

  Identifier of a Cloudflare account.

- `prefix_id: string`

  Identifier of an IP Prefix.

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

- `result: optional array of Delegations`

  - `id: optional string`

    Identifier of a Delegation.

  - `cidr: optional string`

    IP Prefix in Classless Inter-Domain Routing format.

  - `created_at: optional string`

  - `delegated_account_id: optional string`

    Account identifier for the account to which prefix is being delegated.

  - `modified_at: optional string`

  - `parent_prefix_id: optional string`

    Identifier of an IP Prefix.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/prefixes/$PREFIX_ID/delegations \
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
      "id": "d933b1530bc56c9953cf8ce166da8004",
      "cidr": "192.0.2.0/24",
      "created_at": "2014-01-01T05:20:00.12345Z",
      "delegated_account_id": "b1946ac92492d2347c6235b4d2611184",
      "modified_at": "2014-01-01T05:20:00.12345Z",
      "parent_prefix_id": "2af39739cc4e3b5910c918468bb89828"
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

## Create Prefix Delegation

**post** `/accounts/{account_id}/addressing/prefixes/{prefix_id}/delegations`

Create a new account delegation for a given IP prefix.

### Path Parameters

- `account_id: string`

  Identifier of a Cloudflare account.

- `prefix_id: string`

  Identifier of an IP Prefix.

### Body Parameters

- `cidr: string`

  IP Prefix in Classless Inter-Domain Routing format.

- `delegated_account_id: string`

  Account identifier for the account to which prefix is being delegated.

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

- `result: optional Delegations`

  - `id: optional string`

    Identifier of a Delegation.

  - `cidr: optional string`

    IP Prefix in Classless Inter-Domain Routing format.

  - `created_at: optional string`

  - `delegated_account_id: optional string`

    Account identifier for the account to which prefix is being delegated.

  - `modified_at: optional string`

  - `parent_prefix_id: optional string`

    Identifier of an IP Prefix.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/prefixes/$PREFIX_ID/delegations \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "cidr": "192.0.2.0/24",
          "delegated_account_id": "b1946ac92492d2347c6235b4d2611184"
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
    "id": "d933b1530bc56c9953cf8ce166da8004",
    "cidr": "192.0.2.0/24",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "delegated_account_id": "b1946ac92492d2347c6235b4d2611184",
    "modified_at": "2014-01-01T05:20:00.12345Z",
    "parent_prefix_id": "2af39739cc4e3b5910c918468bb89828"
  }
}
```

## Delete Prefix Delegation

**delete** `/accounts/{account_id}/addressing/prefixes/{prefix_id}/delegations/{delegation_id}`

Delete an account delegation for a given IP prefix.

### Path Parameters

- `account_id: string`

  Identifier of a Cloudflare account.

- `prefix_id: string`

  Identifier of an IP Prefix.

- `delegation_id: string`

  Identifier of a Delegation.

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

    Identifier of a Delegation.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/prefixes/$PREFIX_ID/delegations/$DELEGATION_ID \
    -X DELETE \
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
    "id": "d933b1530bc56c9953cf8ce166da8004"
  }
}
```

## Domain Types

### Delegations

- `Delegations object { id, cidr, created_at, 3 more }`

  - `id: optional string`

    Identifier of a Delegation.

  - `cidr: optional string`

    IP Prefix in Classless Inter-Domain Routing format.

  - `created_at: optional string`

  - `delegated_account_id: optional string`

    Account identifier for the account to which prefix is being delegated.

  - `modified_at: optional string`

  - `parent_prefix_id: optional string`

    Identifier of an IP Prefix.

### Delegation Delete Response

- `DelegationDeleteResponse object { id }`

  - `id: optional string`

    Identifier of a Delegation.

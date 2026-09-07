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

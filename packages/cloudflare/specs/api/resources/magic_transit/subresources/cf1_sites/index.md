# Cf1 Sites

## List CF1 Sites

**get** `/accounts/{account_id}/magic/cf1_sites`

Lists CF1 Sites associated with an account. A CF1 Site represents a physical customer network location with optional geographic coordinates.

### Path Parameters

- `account_id: string`

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

- `result: array of Cf1Site`

  - `name: string`

    A human-provided name describing the CF1 Site that should be unique within the account.

  - `id: optional string`

    Identifier

  - `created_on: optional string`

  - `description: optional string`

    A human-provided description of the CF1 Site.

  - `location: optional Cf1SiteLocation`

    - `lat: optional number`

      Latitude of the CF1 Site.

    - `long: optional number`

      Longitude of the CF1 Site.

    - `name: optional string`

      Name of nearest town, city, or village.

  - `modified_on: optional string`

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/cf1_sites \
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
      "name": "Pad 34",
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "created_on": "2019-12-27T18:11:19.117Z",
      "description": "Launch Pad 34",
      "location": {
        "lat": 28.521339842093845,
        "long": -80.56092644815843,
        "name": "Cape Canaveral"
      },
      "modified_on": "2019-12-27T18:11:19.117Z"
    }
  ],
  "success": true
}
```

## Get CF1 Site

**get** `/accounts/{account_id}/magic/cf1_sites/{cf1_site_id}`

Gets a specific CF1 Site for an account.

### Path Parameters

- `account_id: string`

  Identifier

- `cf1_site_id: string`

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

- `result: Cf1Site`

  - `name: string`

    A human-provided name describing the CF1 Site that should be unique within the account.

  - `id: optional string`

    Identifier

  - `created_on: optional string`

  - `description: optional string`

    A human-provided description of the CF1 Site.

  - `location: optional Cf1SiteLocation`

    - `lat: optional number`

      Latitude of the CF1 Site.

    - `long: optional number`

      Longitude of the CF1 Site.

    - `name: optional string`

      Name of nearest town, city, or village.

  - `modified_on: optional string`

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/cf1_sites/$CF1_SITE_ID \
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
    "name": "Pad 34",
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "created_on": "2019-12-27T18:11:19.117Z",
    "description": "Launch Pad 34",
    "location": {
      "lat": 28.521339842093845,
      "long": -80.56092644815843,
      "name": "Cape Canaveral"
    },
    "modified_on": "2019-12-27T18:11:19.117Z"
  },
  "success": true
}
```

## Create CF1 Sites

**post** `/accounts/{account_id}/magic/cf1_sites`

Creates new CF1 Sites for an account. Each site must have a unique name within the account.

### Path Parameters

- `account_id: string`

  Identifier

### Body Parameters

- `body: array of Cf1Site`

  - `name: string`

    A human-provided name describing the CF1 Site that should be unique within the account.

  - `id: optional string`

    Identifier

  - `created_on: optional string`

  - `description: optional string`

    A human-provided description of the CF1 Site.

  - `location: optional Cf1SiteLocation`

    - `lat: optional number`

      Latitude of the CF1 Site.

    - `long: optional number`

      Longitude of the CF1 Site.

    - `name: optional string`

      Name of nearest town, city, or village.

  - `modified_on: optional string`

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

- `result: array of Cf1Site`

  - `name: string`

    A human-provided name describing the CF1 Site that should be unique within the account.

  - `id: optional string`

    Identifier

  - `created_on: optional string`

  - `description: optional string`

    A human-provided description of the CF1 Site.

  - `location: optional Cf1SiteLocation`

    - `lat: optional number`

      Latitude of the CF1 Site.

    - `long: optional number`

      Longitude of the CF1 Site.

    - `name: optional string`

      Name of nearest town, city, or village.

  - `modified_on: optional string`

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/cf1_sites \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '[
          {
            "name": "Pad 34",
            "description": "Launch Pad 34",
            "location": {
              "lat": 28.521339842093845,
              "long": -80.56092644815843,
              "name": "Cape Canaveral"
            }
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
  "result": [
    {
      "name": "Pad 34",
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "created_on": "2019-12-27T18:11:19.117Z",
      "description": "Launch Pad 34",
      "location": {
        "lat": 28.521339842093845,
        "long": -80.56092644815843,
        "name": "Cape Canaveral"
      },
      "modified_on": "2019-12-27T18:11:19.117Z"
    }
  ],
  "success": true
}
```

## Update CF1 Site

**patch** `/accounts/{account_id}/magic/cf1_sites/{cf1_site_id}`

Partially updates a specific CF1 Site for an account. Only the fields included in the request body are modified; omitted fields retain their existing values.

### Path Parameters

- `account_id: string`

  Identifier

- `cf1_site_id: string`

  Identifier

### Body Parameters

- `description: optional string`

  A human-provided description of the CF1 Site.

- `location: optional Cf1SiteLocation`

  - `lat: optional number`

    Latitude of the CF1 Site.

  - `long: optional number`

    Longitude of the CF1 Site.

  - `name: optional string`

    Name of nearest town, city, or village.

- `name: optional string`

  A human-provided name describing the CF1 Site that should be unique within the account.

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

- `result: Cf1Site`

  - `name: string`

    A human-provided name describing the CF1 Site that should be unique within the account.

  - `id: optional string`

    Identifier

  - `created_on: optional string`

  - `description: optional string`

    A human-provided description of the CF1 Site.

  - `location: optional Cf1SiteLocation`

    - `lat: optional number`

      Latitude of the CF1 Site.

    - `long: optional number`

      Longitude of the CF1 Site.

    - `name: optional string`

      Name of nearest town, city, or village.

  - `modified_on: optional string`

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/cf1_sites/$CF1_SITE_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "description": "Launch Pad 34",
          "name": "Pad 34"
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
    "name": "Pad 34",
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "created_on": "2019-12-27T18:11:19.117Z",
    "description": "Launch Pad 34",
    "location": {
      "lat": 28.521339842093845,
      "long": -80.56092644815843,
      "name": "Cape Canaveral"
    },
    "modified_on": "2019-12-27T18:11:19.117Z"
  },
  "success": true
}
```

## Delete CF1 Site

**delete** `/accounts/{account_id}/magic/cf1_sites/{cf1_site_id}`

Deletes a specific CF1 Site for an account.

### Path Parameters

- `account_id: string`

  Identifier

- `cf1_site_id: string`

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

- `result: Cf1Site`

  - `name: string`

    A human-provided name describing the CF1 Site that should be unique within the account.

  - `id: optional string`

    Identifier

  - `created_on: optional string`

  - `description: optional string`

    A human-provided description of the CF1 Site.

  - `location: optional Cf1SiteLocation`

    - `lat: optional number`

      Latitude of the CF1 Site.

    - `long: optional number`

      Longitude of the CF1 Site.

    - `name: optional string`

      Name of nearest town, city, or village.

  - `modified_on: optional string`

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/cf1_sites/$CF1_SITE_ID \
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
    "name": "Pad 34",
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "created_on": "2019-12-27T18:11:19.117Z",
    "description": "Launch Pad 34",
    "location": {
      "lat": 28.521339842093845,
      "long": -80.56092644815843,
      "name": "Cape Canaveral"
    },
    "modified_on": "2019-12-27T18:11:19.117Z"
  },
  "success": true
}
```

## Domain Types

### Cf1 Site

- `Cf1Site object { name, id, created_on, 3 more }`

  - `name: string`

    A human-provided name describing the CF1 Site that should be unique within the account.

  - `id: optional string`

    Identifier

  - `created_on: optional string`

  - `description: optional string`

    A human-provided description of the CF1 Site.

  - `location: optional Cf1SiteLocation`

    - `lat: optional number`

      Latitude of the CF1 Site.

    - `long: optional number`

      Longitude of the CF1 Site.

    - `name: optional string`

      Name of nearest town, city, or village.

  - `modified_on: optional string`

### Cf1 Site Location

- `Cf1SiteLocation object { lat, long, name }`

  - `lat: optional number`

    Latitude of the CF1 Site.

  - `long: optional number`

    Longitude of the CF1 Site.

  - `name: optional string`

    Name of nearest town, city, or village.

# Ramps

## List CF1 Site Ramps

**get** `/accounts/{account_id}/magic/cf1_sites/{cf1_site_id}/ramps`

Lists ramps (network connections) associated with a CF1 Site. Ramps represent GRE tunnels, IPsec tunnels, interconnects, or MCONN links.

### Path Parameters

- `account_id: string`

  Identifier

- `cf1_site_id: string`

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

- `result: array of Ramp`

  - `id: string`

    Identifier

  - `created_on: string`

  - `modified_on: string`

  - `name: string`

    A human-provided name describing the ramp that should be unique within the CF1 Site.

  - `type: RampType`

    The type of network connection (ramp) linking a CF1 Site to Cloudflare's network.

    - `"gre"`

    - `"gre_interconnect"`

    - `"mpls_interconnect"`

    - `"mconn"`

    - `"ipsec"`

  - `description: optional string`

    A human-provided description of the ramp.

  - `gre: optional object { managed_by }`

    - `managed_by: optional string`

      URL reference to the source network resource that this ramp is managed by.

  - `gre_interconnect: optional object { managed_by }`

    - `managed_by: optional string`

      URL reference to the source network resource that this ramp is managed by.

  - `ipsec: optional object { managed_by }`

    - `managed_by: optional string`

      URL reference to the source network resource that this ramp is managed by.

  - `mconn: optional object { managed_by }`

    - `managed_by: optional string`

      URL reference to the source network resource that this ramp is managed by.

  - `mpls_interconnect: optional object { managed_by }`

    - `managed_by: optional string`

      URL reference to the source network resource that this ramp is managed by.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/cf1_sites/$CF1_SITE_ID/ramps \
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
      "created_on": "2019-12-27T18:11:19.117Z",
      "modified_on": "2019-12-27T18:11:19.117Z",
      "name": "primary_gre_ramp",
      "type": "gre",
      "description": "Primary CF GRE tunnel",
      "gre": {
        "managed_by": "managed_by"
      },
      "gre_interconnect": {
        "managed_by": "managed_by"
      },
      "ipsec": {
        "managed_by": "managed_by"
      },
      "mconn": {
        "managed_by": "managed_by"
      },
      "mpls_interconnect": {
        "managed_by": "managed_by"
      }
    }
  ],
  "success": true
}
```

## Get CF1 Site Ramp

**get** `/accounts/{account_id}/magic/cf1_sites/{cf1_site_id}/ramps/{ramp_id}`

Gets a specific ramp for a CF1 Site.

### Path Parameters

- `account_id: string`

  Identifier

- `cf1_site_id: string`

  Identifier

- `ramp_id: string`

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

- `result: Ramp`

  - `id: string`

    Identifier

  - `created_on: string`

  - `modified_on: string`

  - `name: string`

    A human-provided name describing the ramp that should be unique within the CF1 Site.

  - `type: RampType`

    The type of network connection (ramp) linking a CF1 Site to Cloudflare's network.

    - `"gre"`

    - `"gre_interconnect"`

    - `"mpls_interconnect"`

    - `"mconn"`

    - `"ipsec"`

  - `description: optional string`

    A human-provided description of the ramp.

  - `gre: optional object { managed_by }`

    - `managed_by: optional string`

      URL reference to the source network resource that this ramp is managed by.

  - `gre_interconnect: optional object { managed_by }`

    - `managed_by: optional string`

      URL reference to the source network resource that this ramp is managed by.

  - `ipsec: optional object { managed_by }`

    - `managed_by: optional string`

      URL reference to the source network resource that this ramp is managed by.

  - `mconn: optional object { managed_by }`

    - `managed_by: optional string`

      URL reference to the source network resource that this ramp is managed by.

  - `mpls_interconnect: optional object { managed_by }`

    - `managed_by: optional string`

      URL reference to the source network resource that this ramp is managed by.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/cf1_sites/$CF1_SITE_ID/ramps/$RAMP_ID \
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
    "created_on": "2019-12-27T18:11:19.117Z",
    "modified_on": "2019-12-27T18:11:19.117Z",
    "name": "primary_gre_ramp",
    "type": "gre",
    "description": "Primary CF GRE tunnel",
    "gre": {
      "managed_by": "managed_by"
    },
    "gre_interconnect": {
      "managed_by": "managed_by"
    },
    "ipsec": {
      "managed_by": "managed_by"
    },
    "mconn": {
      "managed_by": "managed_by"
    },
    "mpls_interconnect": {
      "managed_by": "managed_by"
    }
  },
  "success": true
}
```

## Create CF1 Site Ramps

**post** `/accounts/{account_id}/magic/cf1_sites/{cf1_site_id}/ramps`

Creates ramps (network connections) for a CF1 Site.

### Path Parameters

- `account_id: string`

  Identifier

- `cf1_site_id: string`

  Identifier

### Body Parameters

- `body: array of object { source_ramp_id, type }`

  - `source_ramp_id: string`

    Identifier of the source network resource to associate as a ramp.

  - `type: RampType`

    The type of network connection (ramp) linking a CF1 Site to Cloudflare's network.

    - `"gre"`

    - `"gre_interconnect"`

    - `"mpls_interconnect"`

    - `"mconn"`

    - `"ipsec"`

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

- `result: array of Ramp`

  - `id: string`

    Identifier

  - `created_on: string`

  - `modified_on: string`

  - `name: string`

    A human-provided name describing the ramp that should be unique within the CF1 Site.

  - `type: RampType`

    The type of network connection (ramp) linking a CF1 Site to Cloudflare's network.

    - `"gre"`

    - `"gre_interconnect"`

    - `"mpls_interconnect"`

    - `"mconn"`

    - `"ipsec"`

  - `description: optional string`

    A human-provided description of the ramp.

  - `gre: optional object { managed_by }`

    - `managed_by: optional string`

      URL reference to the source network resource that this ramp is managed by.

  - `gre_interconnect: optional object { managed_by }`

    - `managed_by: optional string`

      URL reference to the source network resource that this ramp is managed by.

  - `ipsec: optional object { managed_by }`

    - `managed_by: optional string`

      URL reference to the source network resource that this ramp is managed by.

  - `mconn: optional object { managed_by }`

    - `managed_by: optional string`

      URL reference to the source network resource that this ramp is managed by.

  - `mpls_interconnect: optional object { managed_by }`

    - `managed_by: optional string`

      URL reference to the source network resource that this ramp is managed by.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/cf1_sites/$CF1_SITE_ID/ramps \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '[
          {
            "source_ramp_id": "023e105f4ecef8ad9ca31a8372d0c353",
            "type": "gre"
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
  "result": [
    {
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "created_on": "2019-12-27T18:11:19.117Z",
      "modified_on": "2019-12-27T18:11:19.117Z",
      "name": "primary_gre_ramp",
      "type": "gre",
      "description": "Primary CF GRE tunnel",
      "gre": {
        "managed_by": "managed_by"
      },
      "gre_interconnect": {
        "managed_by": "managed_by"
      },
      "ipsec": {
        "managed_by": "managed_by"
      },
      "mconn": {
        "managed_by": "managed_by"
      },
      "mpls_interconnect": {
        "managed_by": "managed_by"
      }
    }
  ],
  "success": true
}
```

## Delete CF1 Site Ramp

**delete** `/accounts/{account_id}/magic/cf1_sites/{cf1_site_id}/ramps/{ramp_id}`

Deletes a specific ramp from a CF1 Site.

### Path Parameters

- `account_id: string`

  Identifier

- `cf1_site_id: string`

  Identifier

- `ramp_id: string`

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

- `result: Ramp`

  - `id: string`

    Identifier

  - `created_on: string`

  - `modified_on: string`

  - `name: string`

    A human-provided name describing the ramp that should be unique within the CF1 Site.

  - `type: RampType`

    The type of network connection (ramp) linking a CF1 Site to Cloudflare's network.

    - `"gre"`

    - `"gre_interconnect"`

    - `"mpls_interconnect"`

    - `"mconn"`

    - `"ipsec"`

  - `description: optional string`

    A human-provided description of the ramp.

  - `gre: optional object { managed_by }`

    - `managed_by: optional string`

      URL reference to the source network resource that this ramp is managed by.

  - `gre_interconnect: optional object { managed_by }`

    - `managed_by: optional string`

      URL reference to the source network resource that this ramp is managed by.

  - `ipsec: optional object { managed_by }`

    - `managed_by: optional string`

      URL reference to the source network resource that this ramp is managed by.

  - `mconn: optional object { managed_by }`

    - `managed_by: optional string`

      URL reference to the source network resource that this ramp is managed by.

  - `mpls_interconnect: optional object { managed_by }`

    - `managed_by: optional string`

      URL reference to the source network resource that this ramp is managed by.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/cf1_sites/$CF1_SITE_ID/ramps/$RAMP_ID \
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
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "created_on": "2019-12-27T18:11:19.117Z",
    "modified_on": "2019-12-27T18:11:19.117Z",
    "name": "primary_gre_ramp",
    "type": "gre",
    "description": "Primary CF GRE tunnel",
    "gre": {
      "managed_by": "managed_by"
    },
    "gre_interconnect": {
      "managed_by": "managed_by"
    },
    "ipsec": {
      "managed_by": "managed_by"
    },
    "mconn": {
      "managed_by": "managed_by"
    },
    "mpls_interconnect": {
      "managed_by": "managed_by"
    }
  },
  "success": true
}
```

## Domain Types

### Ramp

- `Ramp object { id, created_on, modified_on, 8 more }`

  - `id: string`

    Identifier

  - `created_on: string`

  - `modified_on: string`

  - `name: string`

    A human-provided name describing the ramp that should be unique within the CF1 Site.

  - `type: RampType`

    The type of network connection (ramp) linking a CF1 Site to Cloudflare's network.

    - `"gre"`

    - `"gre_interconnect"`

    - `"mpls_interconnect"`

    - `"mconn"`

    - `"ipsec"`

  - `description: optional string`

    A human-provided description of the ramp.

  - `gre: optional object { managed_by }`

    - `managed_by: optional string`

      URL reference to the source network resource that this ramp is managed by.

  - `gre_interconnect: optional object { managed_by }`

    - `managed_by: optional string`

      URL reference to the source network resource that this ramp is managed by.

  - `ipsec: optional object { managed_by }`

    - `managed_by: optional string`

      URL reference to the source network resource that this ramp is managed by.

  - `mconn: optional object { managed_by }`

    - `managed_by: optional string`

      URL reference to the source network resource that this ramp is managed by.

  - `mpls_interconnect: optional object { managed_by }`

    - `managed_by: optional string`

      URL reference to the source network resource that this ramp is managed by.

### Ramp Type

- `RampType = "gre" or "gre_interconnect" or "mpls_interconnect" or 2 more`

  The type of network connection (ramp) linking a CF1 Site to Cloudflare's network.

  - `"gre"`

  - `"gre_interconnect"`

  - `"mpls_interconnect"`

  - `"mconn"`

  - `"ipsec"`

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

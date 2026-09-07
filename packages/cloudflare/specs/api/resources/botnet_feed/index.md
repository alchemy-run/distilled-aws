# Botnet Feed

# ASN

## Get daily report

**get** `/accounts/{account_id}/botnet_feed/asn/{asn_id}/day_report`

Gets all the data the botnet tracking database has for a given ASN registered to user account for given date. If no date is given, it will return results for the previous day.

### Path Parameters

- `account_id: string`

  Identifier.

- `asn_id: number`

### Query Parameters

- `date: optional string`

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

- `result: optional object { cidr, date, offense_count }`

  - `cidr: optional string`

  - `date: optional string`

  - `offense_count: optional number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/botnet_feed/asn/$ASN_ID/day_report \
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
    "cidr": "1.1.1.1/32",
    "date": "2014-01-01T05:20:00.12345Z",
    "offense_count": 1000
  }
}
```

## Get full report

**get** `/accounts/{account_id}/botnet_feed/asn/{asn_id}/full_report`

Gets all the data the botnet threat feed tracking database has for a given ASN registered to user account.

### Path Parameters

- `account_id: string`

  Identifier.

- `asn_id: number`

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

- `result: optional object { cidr, date, offense_count }`

  - `cidr: optional string`

  - `date: optional string`

  - `offense_count: optional number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/botnet_feed/asn/$ASN_ID/full_report \
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
    "cidr": "1.1.1.1/32",
    "date": "2014-01-01T05:20:00.12345Z",
    "offense_count": 1000
  }
}
```

## Domain Types

### ASN Day Report Response

- `ASNDayReportResponse object { cidr, date, offense_count }`

  - `cidr: optional string`

  - `date: optional string`

  - `offense_count: optional number`

### ASN Full Report Response

- `ASNFullReportResponse object { cidr, date, offense_count }`

  - `cidr: optional string`

  - `date: optional string`

  - `offense_count: optional number`

# Configs

# ASN

## Get list of ASNs

**get** `/accounts/{account_id}/botnet_feed/configs/asn`

Gets a list of all ASNs registered for a user for the DDoS Botnet Feed API.

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

- `result: optional object { asn }`

  - `asn: optional number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/botnet_feed/configs/asn \
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
    "asn": 13335
  }
}
```

## Delete an ASN

**delete** `/accounts/{account_id}/botnet_feed/configs/asn/{asn_id}`

Delete an ASN from botnet threat feed for a given user.

### Path Parameters

- `account_id: string`

  Identifier.

- `asn_id: number`

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

- `result: optional object { asn }`

  - `asn: optional number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/botnet_feed/configs/asn/$ASN_ID \
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
    "asn": 13335
  }
}
```

## Domain Types

### ASN Get Response

- `ASNGetResponse object { asn }`

  - `asn: optional number`

### ASN Delete Response

- `ASNDeleteResponse object { asn }`

  - `asn: optional number`

# Subnets

## Get ASN Subnets

**get** `/accounts/{account_id}/intel/asn/{asn}/subnets`

Get ASN Subnets.

### Path Parameters

- `account_id: string`

  Identifier.

- `asn: ASN`

### Returns

- `asn: optional ASN`

- `count: optional number`

  Total results returned based on your search parameters.

- `ip_count_total: optional number`

- `page: optional number`

  Current page within paginated list of results.

- `per_page: optional number`

  Number of results per page of results.

- `subnets: optional array of string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/intel/asn/$ASN/subnets \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "asn": 0,
  "count": 1,
  "ip_count_total": 0,
  "page": 1,
  "per_page": 20,
  "subnets": [
    "192.0.2.0/24",
    "2001:DB8::/32"
  ]
}
```

## Domain Types

### Subnet Get Response

- `SubnetGetResponse object { asn, count, ip_count_total, 3 more }`

  - `asn: optional ASN`

  - `count: optional number`

    Total results returned based on your search parameters.

  - `ip_count_total: optional number`

  - `page: optional number`

    Current page within paginated list of results.

  - `per_page: optional number`

    Number of results per page of results.

  - `subnets: optional array of string`

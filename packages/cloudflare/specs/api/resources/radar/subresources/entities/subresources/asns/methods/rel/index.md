## Get AS-level relationships by ASN

**get** `/radar/entities/asns/{asn}/rel`

Retrieves AS-level relationship for given networks.

### Path Parameters

- `asn: number`

  Retrieves all ASNs with provider-customer or peering relationships with the given ASN.

### Query Parameters

- `asn2: optional number`

  Retrieves the AS relationship of ASN2 with respect to the given ASN.

- `format: optional "JSON" or "CSV"`

  Format in which results will be returned.

  - `"JSON"`

  - `"CSV"`

### Returns

- `result: object { meta, rels }`

  - `meta: object { data_time, query_time, total_peers }`

    - `data_time: string`

    - `query_time: string`

    - `total_peers: number`

  - `rels: array of object { asn1, asn1_country, asn1_name, 4 more }`

    - `asn1: number`

    - `asn1_country: string`

    - `asn1_name: string`

    - `asn2: number`

    - `asn2_country: string`

    - `asn2_name: string`

    - `rel: string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/entities/asns/$ASN/rel \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "meta": {
      "data_time": "data_time",
      "query_time": "query_time",
      "total_peers": 0
    },
    "rels": [
      {
        "asn1": 0,
        "asn1_country": "asn1_country",
        "asn1_name": "asn1_name",
        "asn2": 0,
        "asn2_country": "asn2_country",
        "asn2_name": "asn2_name",
        "rel": "rel"
      }
    ]
  },
  "success": true
}
```

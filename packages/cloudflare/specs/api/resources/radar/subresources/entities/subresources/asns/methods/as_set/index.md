## Get IRR AS-SETs that an AS is a member of

**get** `/radar/entities/asns/{asn}/as_set`

Retrieves Internet Routing Registry AS-SETs that an AS is a member of.

### Path Parameters

- `asn: number`

  Retrieves all AS-SETs that the given AS is a member of.

### Query Parameters

- `format: optional "JSON" or "CSV"`

  Format in which results will be returned.

  - `"JSON"`

  - `"CSV"`

### Returns

- `result: object { as_sets, paths }`

  - `as_sets: array of object { as_members_count, as_set_members_count, as_set_upstreams_count, 6 more }`

    - `as_members_count: number`

      The number of AS members in the AS-SET

    - `as_set_members_count: number`

      The number of AS-SET members in the AS-SET

    - `as_set_upstreams_count: number`

      The number of recursive upstream AS-SETs

    - `asn_cone_size: number`

      The number of unique ASNs in the AS-SETs recursive downstream

    - `irr_sources: array of string`

      The IRR sources of the AS-SET

    - `name: string`

      The name of the AS-SET

    - `hierarchical_asn: optional number`

      The AS number following hierarchical AS-SET name

    - `inferred_asn: optional number`

      The inferred AS number of the AS-SET

    - `peeringdb_asn: optional number`

      The AS number matching PeeringDB record

  - `paths: array of array of string`

    Paths from the AS-SET that include the given AS to its upstreams recursively

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/entities/asns/$ASN/as_set \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "as_sets": [
      {
        "as_members_count": 0,
        "as_set_members_count": 0,
        "as_set_upstreams_count": 0,
        "asn_cone_size": 0,
        "irr_sources": [
          "string"
        ],
        "name": "name",
        "hierarchical_asn": 0,
        "inferred_asn": 0,
        "peeringdb_asn": 0
      }
    ],
    "paths": [
      [
        "string"
      ]
    ]
  },
  "success": true
}
```

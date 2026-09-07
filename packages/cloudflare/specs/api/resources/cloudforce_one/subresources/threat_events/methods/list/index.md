## Filter and list events

**get** `/accounts/{account_id}/cloudforce-one/events`

Use `datasetId=all` or `datasetId=*` to query all event datasets for the account (limited to 10). When `datasetId` is unspecified, events are listed from the default Cloudforce One Threat Events dataset. To list existing datasets, use the [`List Datasets`](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/datasets/methods/list/) endpoint.

### Path Parameters

- `account_id: string`

  Account ID.

### Query Parameters

- `cursor: optional string`

  Cursor for pagination. When provided, filters are embedded in the cursor so you only need to pass cursor and pageSize. Returned in the previous response's result_info.cursor field. Use cursor-based pagination for deep pagination (beyond 100,000 records) or for optimal performance.

- `datasetId: optional array of string`

  Dataset IDs to query events from (array of UUIDs), or special value 'all' or '*' to query all event datasets for the account. If not provided, uses the default dataset.

- `forceRefresh: optional boolean`

- `format: optional "json" or "stix2" or "taxii"`

  - `"json"`

  - `"stix2"`

  - `"taxii"`

- `order: optional "asc" or "desc"`

  - `"asc"`

  - `"desc"`

- `orderBy: optional string`

- `page: optional number`

  Page number (1-indexed) for offset-based pagination. Limited to offset of 100,000 records. For deep pagination, use cursor-based pagination instead.

- `pageSize: optional number`

  Number of results per page. Maximum 25,000.

- `search: optional array of object { field, op, value }`

  - `field: optional string`

    Event field to search on. Allowed: attacker, attackerCountry, category, createdAt, date, event, indicator, indicatorType, killChain, mitreAttack, tags, targetCountry, targetIndustry, tlp, uuid.

  - `op: optional "equals" or "not" or "gt" or 9 more`

    Search operator. Use 'in' for bulk lookup of up to 100 values at once, e.g. {field:'tags', op:'in', value:['malware','apt']}.

    - `"equals"`

    - `"not"`

    - `"gt"`

    - `"gte"`

    - `"lt"`

    - `"lte"`

    - `"like"`

    - `"contains"`

    - `"startsWith"`

    - `"endsWith"`

    - `"in"`

    - `"find"`

  - `value: optional string or number or array of string or number`

    Search value. String or number for most operators. Array for 'in' operator (max 100 items).

    - `string`

    - `number`

    - `array of string or number`

      - `string`

      - `number`

- `source: optional "do" or "r2catalog"`

  Read backend. 'do' (default) reads Durable Object storage. 'r2catalog' reads R2 Data Catalog (admin-only, experimental; supports a subset of search fields — no 'tags').

  - `"do"`

  - `"r2catalog"`

### Returns

- `attacker: string`

- `attackerCountry: string`

- `attackerCountryAlpha3: string`

- `category: string`

- `datasetId: string`

- `date: string`

- `event: string`

- `hasChildren: boolean`

- `indicator: string`

- `indicatorType: string`

- `indicatorTypeId: number`

- `killChain: number`

- `mitreAttack: array of string`

- `mitreCapec: array of string`

- `numReferenced: number`

- `numReferences: number`

- `rawId: string`

- `referenced: array of string`

- `referencedIds: array of number`

- `references: array of string`

- `referencesIds: array of number`

- `tags: array of string`

- `targetCountry: string`

- `targetCountryAlpha3: string`

- `targetIndustry: string`

- `tlp: string`

- `uuid: string`

- `insight: optional string`

- `releasabilityId: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
[
  {
    "attacker": "Flying Yeti",
    "attackerCountry": "CN",
    "attackerCountryAlpha3": "CHN",
    "category": "Domain Resolution",
    "datasetId": "dataset-example-id",
    "date": "2022-04-01T00:00:00Z",
    "event": "An attacker registered the domain domain.com",
    "hasChildren": true,
    "indicator": "domain.com",
    "indicatorType": "domain",
    "indicatorTypeId": 5,
    "killChain": 0,
    "mitreAttack": [
      " "
    ],
    "mitreCapec": [
      " "
    ],
    "numReferenced": 0,
    "numReferences": 0,
    "rawId": "453gw34w3",
    "referenced": [
      " "
    ],
    "referencedIds": [
      0
    ],
    "references": [
      " "
    ],
    "referencesIds": [
      0
    ],
    "tags": [
      "malware"
    ],
    "targetCountry": "US",
    "targetCountryAlpha3": "USA",
    "targetIndustry": "Agriculture",
    "tlp": "amber",
    "uuid": "12345678-1234-1234-1234-1234567890ab",
    "insight": "insight",
    "releasabilityId": "releasabilityId"
  }
]
```

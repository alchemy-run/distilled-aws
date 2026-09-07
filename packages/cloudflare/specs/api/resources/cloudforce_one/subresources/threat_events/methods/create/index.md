## Creates a new event

**post** `/accounts/{account_id}/cloudforce-one/events/create`

To create a dataset, see the [`Create Dataset`](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/datasets/methods/create/) endpoint. When `datasetId` parameter is unspecified, it will be created in a default dataset named `Cloudforce One Threat Events`.

### Path Parameters

- `account_id: string`

  Account ID.

### Body Parameters

- `category: string`

- `date: string`

- `event: string`

- `raw: object { data, source, tlp }`

  - `data: map[unknown]`

  - `source: optional string`

  - `tlp: optional string`

- `tlp: string`

- `accountId: optional number`

- `attacker: optional string`

- `attackerCountry: optional string`

- `datasetId: optional string`

- `indicator: optional string`

- `indicators: optional array of object { indicatorType, value }`

  Array of indicators for this event. Supports multiple indicators per event for complex scenarios.

  - `indicatorType: string`

    The type of indicator (e.g., DOMAIN, IP, JA3, HASH)

  - `value: string`

    The indicator value (e.g., domain name, IP address, hash)

- `indicatorType: optional string`

- `insight: optional string`

- `tags: optional array of string`

- `targetCountry: optional string`

- `targetIndustry: optional string`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/create \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "category": "Domain Resolution",
          "date": "2022-04-01T00:00:00Z",
          "event": "An attacker registered the domain domain.com",
          "raw": {
            "data": {
              "foo": "bar"
            }
          },
          "tlp": "amber",
          "accountId": 123456,
          "attacker": "Flying Yeti",
          "attackerCountry": "CN",
          "datasetId": "durableObjectName",
          "indicator": "domain.com",
          "indicatorType": "domain",
          "insight": "This domain was likely registered for phishing purposes",
          "targetCountry": "US",
          "targetIndustry": "Agriculture"
        }'
```

#### Response

```json
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
```

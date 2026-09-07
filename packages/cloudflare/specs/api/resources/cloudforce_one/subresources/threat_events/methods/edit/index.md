## Updates an event

**patch** `/accounts/{account_id}/cloudforce-one/events/{event_id}`

Updates an event

### Path Parameters

- `account_id: string`

  Account ID.

- `event_id: string`

  Event UUID.

### Body Parameters

- `datasetId: string`

  Dataset ID containing the event to update.

- `attacker: optional string`

- `attackerCountry: optional string`

- `category: optional string`

- `createdAt: optional string`

- `date: optional string`

- `event: optional string`

- `indicator: optional string`

- `indicatorType: optional string`

- `insight: optional string`

- `raw: optional object { data, source, tlp }`

  - `data: optional map[unknown]`

  - `source: optional string`

  - `tlp: optional string`

- `targetCountry: optional string`

- `targetIndustry: optional string`

- `tlp: optional string`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/$EVENT_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "datasetId": "9b769969-a211-466c-8ac3-cb91266a066a",
          "attacker": "Flying Yeti",
          "attackerCountry": "CN",
          "category": "Domain Resolution",
          "createdAt": "2025-12-19T00:00:00Z",
          "date": "2022-04-01T00:00:00Z",
          "event": "An attacker registered the domain domain.com",
          "indicator": "domain2.com",
          "indicatorType": "domain",
          "insight": "new insight",
          "targetCountry": "US",
          "targetIndustry": "Insurance",
          "tlp": "amber"
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

## Creates bulk events

**post** `/accounts/{account_id}/cloudforce-one/events/create/bulk`

The `datasetId` parameter must be defined. To list existing datasets (and their IDs) in your account, use the [`List Datasets`](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/datasets/methods/list/) endpoint.

### Path Parameters

- `account_id: string`

  Account ID.

### Body Parameters

- `data: array of object { category, date, event, 13 more }`

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

- `datasetId: string`

- `includeCreatedEvents: optional boolean`

  When true, response includes array of created event UUIDs and shard IDs. Useful for tracking which events were created and where.

### Returns

- `createdEventsCount: number`

  Number of events created

- `createdTagsCount: number`

  Number of new tags created in SoT

- `errorCount: number`

  Number of errors encountered

- `queuedIndicatorsCount: number`

  Number of indicators queued for async processing

- `createBulkEventsRequestId: optional string`

  Correlation ID for async indicator processing

- `createdEvents: optional array of object { eventIndex, shardId, uuid }`

  Array of created events with UUIDs and shard locations. Only present when includeCreatedEvents=true

  - `eventIndex: number`

    Original index in the input data array

  - `shardId: string`

    Dataset ID of the shard where the event was created

  - `uuid: string`

    UUID of the created event

- `errors: optional array of object { error, eventIndex }`

  Array of error details

  - `error: string`

    Error message

  - `eventIndex: number`

    Index of the event that caused the error

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/create/bulk \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "data": [
            {
              "category": "Domain Resolution",
              "date": "2022-04-01T00:00:00Z",
              "event": "An attacker registered the domain domain.com",
              "raw": {
                "data": {
                  "foo": "bar"
                }
              },
              "tlp": "amber"
            }
          ],
          "datasetId": "durableObjectName"
        }'
```

#### Response

```json
{
  "createdEventsCount": 0,
  "createdTagsCount": 0,
  "errorCount": 0,
  "queuedIndicatorsCount": 0,
  "createBulkEventsRequestId": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
  "createdEvents": [
    {
      "eventIndex": 0,
      "shardId": "shardId",
      "uuid": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
    }
  ],
  "errors": [
    {
      "error": "error",
      "eventIndex": 0
    }
  ]
}
```

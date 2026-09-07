# Query

## Run a log query

**post** `/{accounts_or_zones}/{account_or_zone_id}/logs/explorer/query/sql`

Run a SQL query against account or zone-level datasets.

Timestamp fields are RFC3339 strings. Filter with:
WHERE {timestamp_field} >= now() - INTERVAL '30' DAY
WHERE {timestamp_field} >= '2026-04-01T00:00:00Z'
WHERE {timestamp_field} BETWEEN '2026-04-01T00:00:00Z' AND '2026-04-30T23:59:59Z'

Check /account or zones/{account or zone_id}/logs/explorer/datasets to see enabled account or zone level datasets.
Zone-level datasets will not appear here.
Check /account or zones/{account or zone_id}/logs/explorer/datasets/available for the schemas, and the name of the timestamp fields.

For zone-level datasets use the zone-scoped endpoint: POST /zones/{zone_id}/logs/explorer/query/sql

For more information about the datasets, and the meaning of each field, check out https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/

### Path Parameters

- `account_id: optional string`

  The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

- `zone_id: optional string`

  The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of string`

- `success: boolean`

- `result: optional array of map[unknown]`

### Example

```http
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/logs/explorer/query/sql \
    -H 'Content-Type: text/plain' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -F 'body=@/path/to/body'
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
    "string"
  ],
  "success": true,
  "result": [
    {
      "foo": "bar"
    }
  ]
}
```

## Domain Types

### Query Sql Response

- `QuerySqlResponse = map[unknown]`

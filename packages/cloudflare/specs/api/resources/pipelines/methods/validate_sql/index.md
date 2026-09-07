## Validate SQL

**post** `/accounts/{account_id}/pipelines/v1/validate_sql`

Validate Arroyo SQL.

### Path Parameters

- `account_id: string`

  Specifies the public ID of the account.

### Body Parameters

- `sql: string`

  Specifies SQL to validate.

### Returns

- `result: object { tables, graph }`

  - `tables: map[object { id, name, type, version } ]`

    Indicates tables involved in the processing.

    - `id: string`

    - `name: string`

    - `type: string`

    - `version: number`

  - `graph: optional object { edges, nodes }`

    - `edges: array of object { dest_id, edge_type, key_type, 2 more }`

      - `dest_id: number`

      - `edge_type: string`

      - `key_type: string`

      - `src_id: number`

      - `value_type: string`

    - `nodes: array of object { description, node_id, operator, parallelism }`

      - `description: string`

      - `node_id: number`

      - `operator: string`

      - `parallelism: number`

- `success: boolean`

  Indicates whether the API call was successful.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pipelines/v1/validate_sql \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "sql": "insert into sink select * from source;"
        }'
```

#### Response

```json
{
  "result": {
    "tables": {
      "foo": {
        "id": "id",
        "name": "name",
        "type": "type",
        "version": 0
      }
    },
    "graph": {
      "edges": [
        {
          "dest_id": 0,
          "edge_type": "edge_type",
          "key_type": "key_type",
          "src_id": 0,
          "value_type": "value_type"
        }
      ],
      "nodes": [
        {
          "description": "description",
          "node_id": 0,
          "operator": "operator",
          "parallelism": 0
        }
      ]
    }
  },
  "success": true
}
```

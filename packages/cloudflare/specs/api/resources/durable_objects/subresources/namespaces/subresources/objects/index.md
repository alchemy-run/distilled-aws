# Objects

## List Objects

**get** `/accounts/{account_id}/workers/durable_objects/namespaces/{id}/objects`

Returns the Durable Objects in a given namespace.

### Path Parameters

- `account_id: string`

  Identifier.

- `id: string`

  ID of the namespace.

### Query Parameters

- `cursor: optional string`

  Opaque token indicating the position from which to continue when requesting the next set of records. A valid value for the cursor can be obtained from the cursors object in the result_info structure.

- `limit: optional number`

  The number of objects to return. The cursor attribute may be used to iterate over the next batch of objects if there are more than the limit.

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

- `result: optional array of DurableObject`

  - `id: optional string`

    ID of the Durable Object.

  - `hasStoredData: optional boolean`

    Whether the Durable Object has stored data.

- `result_info: optional object { count, cursor, page, 3 more }`

  - `count: optional number`

    Total results returned based on your list parameters.

  - `cursor: optional string`

    Opaque token indicating the position from which to continue when requesting the next set of records. A valid value for the cursor can be obtained from the cursors object in the result_info structure.

  - `page: optional number`

    Current page within paginated list of results.

  - `per_page: optional number`

    Number of results per page of results.

  - `total_count: optional number`

    Total results available without any search parameters.

  - `total_pages: optional number`

    The number of total pages in the entire result set.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/durable_objects/namespaces/$ID/objects \
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
  "result": [
    {
      "id": "fe7803fc55b964e09d94666545aab688d360c6bda69ba349ced1e5f28d2fc2c8",
      "hasStoredData": true
    }
  ],
  "result_info": {
    "count": 1,
    "cursor": "AAAAANuhDN7SjacTnSVsDu3WW1Lvst6dxJGTjRY5BhxPXdf6L6uTcpd_NVtjhn11OUYRsVEykxoUwF-JQU4dn6QylZSKTOJuG0indrdn_MlHpMRtsxgXjs-RPdHYIVm3odE_uvEQ_dTQGFm8oikZMohns34DLBgrQpc",
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```

## Domain Types

### Durable Object

- `DurableObject object { id, hasStoredData }`

  - `id: optional string`

    ID of the Durable Object.

  - `hasStoredData: optional boolean`

    Whether the Durable Object has stored data.

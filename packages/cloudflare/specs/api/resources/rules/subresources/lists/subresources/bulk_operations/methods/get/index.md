## Get bulk operation status

**get** `/accounts/{account_id}/rules/lists/bulk_operations/{operation_id}`

Gets the current status of an asynchronous operation on a list.

The `status` property can have one of the following values: `pending`, `running`, `completed`, or `failed`. If the status is `failed`, the `error` property will contain a message describing the error.

### Path Parameters

- `account_id: string`

  The Account ID for this resource.

- `operation_id: string`

  The unique operation ID of the asynchronous action.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `result: object { id, status }  or object { id, completed, status }  or object { id, completed, error, status }`

  - `ListsBulkOperationPendingOrRunning object { id, status }`

    - `id: string`

      The unique operation ID of the asynchronous action.

    - `status: "pending" or "running"`

      The current status of the asynchronous operation.

      - `"pending"`

      - `"running"`

  - `ListsBulkOperationCompleted object { id, completed, status }`

    - `id: string`

      The unique operation ID of the asynchronous action.

    - `completed: string`

      The RFC 3339 timestamp of when the operation was completed.

    - `status: "completed"`

      The current status of the asynchronous operation.

      - `"completed"`

  - `ListsBulkOperationFailed object { id, completed, error, status }`

    - `id: string`

      The unique operation ID of the asynchronous action.

    - `completed: string`

      The RFC 3339 timestamp of when the operation was completed.

    - `error: string`

      A message describing the error when the status is `failed`.

    - `status: "failed"`

      The current status of the asynchronous operation.

      - `"failed"`

- `success: true`

  Defines whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/rules/lists/bulk_operations/$OPERATION_ID \
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
  "result": {
    "id": "4da8780eeb215e6cb7f48dd981c4ea02",
    "status": "pending"
  },
  "success": true
}
```

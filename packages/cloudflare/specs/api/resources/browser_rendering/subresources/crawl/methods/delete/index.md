## Cancel a crawl job.

**delete** `/accounts/{account_id}/browser-rendering/crawl/{job_id}`

Cancels an ongoing crawl job by setting its status to cancelled and stopping all queued URLs.

### Path Parameters

- `account_id: string`

  Account ID.

- `job_id: string`

  The ID of the crawl job to cancel.

### Returns

- `result: object { job_id, message }`

  - `job_id: string`

    The ID of the cancelled job.

  - `message: string`

    Cancellation confirmation message.

- `success: boolean`

  Response status.

- `errors: optional array of object { code, message }`

  - `code: number`

    Error code.

  - `message: string`

    Error message.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/browser-rendering/crawl/$JOB_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "job_id": "job_id",
    "message": "message"
  },
  "success": true,
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ]
}
```

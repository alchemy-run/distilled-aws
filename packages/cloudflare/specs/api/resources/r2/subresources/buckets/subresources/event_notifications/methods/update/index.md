## Create Event Notification Rule

**put** `/accounts/{account_id}/event_notifications/r2/{bucket_name}/configuration/queues/{queue_id}`

Create event notification rule.

### Path Parameters

- `account_id: string`

  Account ID.

- `bucket_name: string`

  Name of the bucket.

- `queue_id: string`

  Queue ID.

### Header Parameters

- `"cf-r2-jurisdiction": optional "default" or "eu" or "fedramp"`

  Jurisdiction where objects in this bucket are guaranteed to be stored.

  - `"default"`

  - `"eu"`

  - `"fedramp"`

### Body Parameters

- `rules: array of object { actions, description, prefix, suffix }`

  Array of rules to drive notifications.

  - `actions: array of "PutObject" or "CopyObject" or "DeleteObject" or 2 more`

    Array of R2 object actions that will trigger notifications.

    - `"PutObject"`

    - `"CopyObject"`

    - `"DeleteObject"`

    - `"CompleteMultipartUpload"`

    - `"LifecycleDeletion"`

  - `description: optional string`

    A description that can be used to identify the event notification rule after creation.

  - `prefix: optional string`

    Notifications will be sent only for objects with this prefix.

  - `suffix: optional string`

    Notifications will be sent only for objects with this suffix.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of string`

- `result: unknown`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/event_notifications/r2/$BUCKET_NAME/configuration/queues/$QUEUE_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "rules": [
            {
              "actions": [
                "PutObject",
                "CopyObject"
              ]
            }
          ]
        }'
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
  "result": {},
  "success": true
}
```

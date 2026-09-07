# Event Notifications

## List Event Notification Rules

**get** `/accounts/{account_id}/event_notifications/r2/{bucket_name}/configuration`

List all event notification rules for a bucket.

### Path Parameters

- `account_id: string`

  Account ID.

- `bucket_name: string`

  Name of the bucket.

### Header Parameters

- `"cf-r2-jurisdiction": optional "default" or "eu" or "fedramp"`

  Jurisdiction where objects in this bucket are guaranteed to be stored.

  - `"default"`

  - `"eu"`

  - `"fedramp"`

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of string`

- `result: object { bucketName, queues }`

  - `bucketName: optional string`

    Name of the bucket.

  - `queues: optional array of object { queueId, queueName, rules }`

    List of queues associated with the bucket.

    - `queueId: optional string`

      Queue ID.

    - `queueName: optional string`

      Name of the queue.

    - `rules: optional array of object { actions, createdAt, description, 3 more }`

      - `actions: array of "PutObject" or "CopyObject" or "DeleteObject" or 2 more`

        Array of R2 object actions that will trigger notifications.

        - `"PutObject"`

        - `"CopyObject"`

        - `"DeleteObject"`

        - `"CompleteMultipartUpload"`

        - `"LifecycleDeletion"`

      - `createdAt: optional string`

        Timestamp when the rule was created.

      - `description: optional string`

        A description that can be used to identify the event notification rule after creation.

      - `prefix: optional string`

        Notifications will be sent only for objects with this prefix.

      - `ruleId: optional string`

        Rule ID.

      - `suffix: optional string`

        Notifications will be sent only for objects with this suffix.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/event_notifications/r2/$BUCKET_NAME/configuration \
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
    "string"
  ],
  "result": {
    "bucketName": "bucketName",
    "queues": [
      {
        "queueId": "11111aa1-11aa-111a-a1a1-a1a111a11a11",
        "queueName": "first-queue",
        "rules": [
          {
            "actions": [
              "PutObject",
              "CopyObject"
            ],
            "createdAt": "2024-09-19T21:54:48.405Z",
            "description": "Notifications from source bucket to queue",
            "prefix": "img/",
            "ruleId": "11111aa1-11aa-111a-a1a1-a1a111a11a11",
            "suffix": ".jpeg"
          }
        ]
      }
    ]
  },
  "success": true
}
```

## Get Event Notification Rule

**get** `/accounts/{account_id}/event_notifications/r2/{bucket_name}/configuration/queues/{queue_id}`

Get a single event notification rule.

### Path Parameters

- `account_id: string`

  Account ID.

- `bucket_name: string`

  Name of the bucket.

- `queue_id: string`

  Queue ID.

### Header Parameters

- `"cf-r2-jurisdiction": optional "default" or "eu" or "fedramp"`

  The bucket jurisdiction.

  - `"default"`

  - `"eu"`

  - `"fedramp"`

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of string`

- `result: object { queueId, queueName, rules }`

  - `queueId: optional string`

    Queue ID.

  - `queueName: optional string`

    Name of the queue.

  - `rules: optional array of object { actions, createdAt, description, 3 more }`

    - `actions: array of "PutObject" or "CopyObject" or "DeleteObject" or 2 more`

      Array of R2 object actions that will trigger notifications.

      - `"PutObject"`

      - `"CopyObject"`

      - `"DeleteObject"`

      - `"CompleteMultipartUpload"`

      - `"LifecycleDeletion"`

    - `createdAt: optional string`

      Timestamp when the rule was created.

    - `description: optional string`

      A description that can be used to identify the event notification rule after creation.

    - `prefix: optional string`

      Notifications will be sent only for objects with this prefix.

    - `ruleId: optional string`

      Rule ID.

    - `suffix: optional string`

      Notifications will be sent only for objects with this suffix.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/event_notifications/r2/$BUCKET_NAME/configuration/queues/$QUEUE_ID \
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
    "string"
  ],
  "result": {
    "queueId": "11111aa1-11aa-111a-a1a1-a1a111a11a11",
    "queueName": "first-queue",
    "rules": [
      {
        "actions": [
          "PutObject",
          "CopyObject"
        ],
        "createdAt": "2024-09-19T21:54:48.405Z",
        "description": "Notifications from source bucket to queue",
        "prefix": "img/",
        "ruleId": "11111aa1-11aa-111a-a1a1-a1a111a11a11",
        "suffix": ".jpeg"
      }
    ]
  },
  "success": true
}
```

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

## Delete Event Notification Rules

**delete** `/accounts/{account_id}/event_notifications/r2/{bucket_name}/configuration/queues/{queue_id}`

Delete an event notification rule. **If no body is provided, all rules for specified queue will be deleted**.

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
    -X DELETE \
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
    "string"
  ],
  "result": {},
  "success": true
}
```

## Domain Types

### Event Notification List Response

- `EventNotificationListResponse object { bucketName, queues }`

  - `bucketName: optional string`

    Name of the bucket.

  - `queues: optional array of object { queueId, queueName, rules }`

    List of queues associated with the bucket.

    - `queueId: optional string`

      Queue ID.

    - `queueName: optional string`

      Name of the queue.

    - `rules: optional array of object { actions, createdAt, description, 3 more }`

      - `actions: array of "PutObject" or "CopyObject" or "DeleteObject" or 2 more`

        Array of R2 object actions that will trigger notifications.

        - `"PutObject"`

        - `"CopyObject"`

        - `"DeleteObject"`

        - `"CompleteMultipartUpload"`

        - `"LifecycleDeletion"`

      - `createdAt: optional string`

        Timestamp when the rule was created.

      - `description: optional string`

        A description that can be used to identify the event notification rule after creation.

      - `prefix: optional string`

        Notifications will be sent only for objects with this prefix.

      - `ruleId: optional string`

        Rule ID.

      - `suffix: optional string`

        Notifications will be sent only for objects with this suffix.

### Event Notification Get Response

- `EventNotificationGetResponse object { queueId, queueName, rules }`

  - `queueId: optional string`

    Queue ID.

  - `queueName: optional string`

    Name of the queue.

  - `rules: optional array of object { actions, createdAt, description, 3 more }`

    - `actions: array of "PutObject" or "CopyObject" or "DeleteObject" or 2 more`

      Array of R2 object actions that will trigger notifications.

      - `"PutObject"`

      - `"CopyObject"`

      - `"DeleteObject"`

      - `"CompleteMultipartUpload"`

      - `"LifecycleDeletion"`

    - `createdAt: optional string`

      Timestamp when the rule was created.

    - `description: optional string`

      A description that can be used to identify the event notification rule after creation.

    - `prefix: optional string`

      Notifications will be sent only for objects with this prefix.

    - `ruleId: optional string`

      Rule ID.

    - `suffix: optional string`

      Notifications will be sent only for objects with this suffix.

### Event Notification Update Response

- `EventNotificationUpdateResponse = unknown`

### Event Notification Delete Response

- `EventNotificationDeleteResponse = unknown`

## Get Bucket Lock Rules

**get** `/accounts/{account_id}/r2/buckets/{bucket_name}/lock`

Get lock rules for a bucket.

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

- `result: object { rules }`

  - `rules: optional array of object { id, condition, enabled, prefix }`

    - `id: string`

      Unique identifier for this rule.

    - `condition: object { maxAgeSeconds, type }  or object { date, type }  or object { type }`

      Condition to apply a lock rule to an object for how long in seconds.

      - `R2LockRuleAgeCondition object { maxAgeSeconds, type }`

        Condition to apply a lock rule to an object for how long in seconds.

        - `maxAgeSeconds: number`

        - `type: "Age"`

          - `"Age"`

      - `R2LockRuleDateCondition object { date, type }`

        Condition to apply a lock rule to an object until a specific date.

        - `date: string`

        - `type: "Date"`

          - `"Date"`

      - `R2LockRuleIndefiniteCondition object { type }`

        Condition to apply a lock rule indefinitely.

        - `type: "Indefinite"`

          - `"Indefinite"`

    - `enabled: boolean`

      Whether or not this rule is in effect.

    - `prefix: optional string`

      Rule will only apply to objects/uploads in the bucket that start with the given prefix, an empty prefix can be provided to scope rule to all objects/uploads.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/r2/buckets/$BUCKET_NAME/lock \
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
    "rules": [
      {
        "id": "Lock all objects for 24 hours",
        "condition": {
          "maxAgeSeconds": 100,
          "type": "Age"
        },
        "enabled": true,
        "prefix": "prefix"
      }
    ]
  },
  "success": true
}
```

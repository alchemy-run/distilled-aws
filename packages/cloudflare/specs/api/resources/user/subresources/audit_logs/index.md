# Audit Logs

## Get user audit logs

**get** `/user/audit_logs`

Gets a list of audit logs for a user account. Can be filtered by who made the change, on which zone, and the timeframe of the change.

### Query Parameters

- `id: optional string`

  Finds a specific log by its ID.

- `action: optional object { type }`

  - `type: optional string`

    Filters by the action type.

- `actor: optional object { email, ip }`

  - `email: optional string`

    Filters by the email address of the actor that made the change.

  - `ip: optional string`

    Filters by the IP address of the request that made the change by specific IP address or valid CIDR Range.

- `before: optional string or string`

  Limits the returned results to logs older than the specified date. A `full-date` that conforms to RFC3339.

  - `FullDate = string`

    Limits the returned results to logs older than the specified date. A `full-date` that conforms to RFC3339.

  - `DateTime = string`

    Limits the returned results to logs older than the specified date. A `date-time` that conforms to RFC3339.

- `direction: optional "desc" or "asc"`

  Changes the direction of the chronological sorting.

  - `"desc"`

  - `"asc"`

- `export: optional boolean`

  Indicates that this request is an export of logs in CSV format.

- `hide_user_logs: optional boolean`

  Indicates whether or not to hide user level audit logs.

- `page: optional number`

  Defines which page of results to return.

- `per_page: optional number`

  Sets the number of results to return per page.

- `since: optional string or string`

  Limits the returned results to logs newer than the specified date. A `full-date` that conforms to RFC3339.

  - `FullDate = string`

    Limits the returned results to logs newer than the specified date. A `full-date` that conforms to RFC3339.

  - `DateTime = string`

    Limits the returned results to logs newer than the specified date. A `date-time` that conforms to RFC3339.

- `zone: optional object { name }`

  - `name: optional string`

    Filters by the name of the zone associated to the change.

### Returns

- `object { errors, messages, result, success }`

  - `errors: optional array of ResponseInfo`

    - `code: number`

    - `message: string`

    - `documentation_url: optional string`

    - `source: optional object { pointer }`

      - `pointer: optional string`

  - `messages: optional array of ResponseInfo`

    - `code: number`

    - `message: string`

    - `documentation_url: optional string`

    - `source: optional object { pointer }`

  - `result: optional array of AuditLog`

    - `id: optional string`

      A string that uniquely identifies the audit log.

    - `action: optional object { result, type }`

      - `result: optional boolean`

        A boolean that indicates if the action attempted was successful.

      - `type: optional string`

        A short string that describes the action that was performed.

    - `actor: optional object { id, email, ip, type }`

      - `id: optional string`

        The ID of the actor that performed the action. If a user performed the action, this will be their User ID.

      - `email: optional string`

        The email of the user that performed the action.

      - `ip: optional string`

        The IP address of the request that performed the action.

      - `type: optional "user" or "admin" or "Cloudflare"`

        The type of actor, whether a User, Cloudflare Admin, or an Automated System.

        - `"user"`

        - `"admin"`

        - `"Cloudflare"`

    - `interface: optional string`

      The source of the event.

    - `metadata: optional unknown`

      An object which can lend more context to the action being logged. This is a flexible value and varies between different actions.

    - `newValue: optional string`

      The new value of the resource that was modified.

    - `oldValue: optional string`

      The value of the resource before it was modified.

    - `owner: optional object { id }`

      - `id: optional string`

        Identifier

    - `resource: optional object { id, type }`

      - `id: optional string`

        An identifier for the resource that was affected by the action.

      - `type: optional string`

        A short string that describes the resource that was affected by the action.

    - `when: optional string`

      A UTC RFC3339 timestamp that specifies when the action being logged occured.

  - `success: optional boolean`

- `AaaAPIResponseCommon object { errors, messages, success }`

  - `errors: array of ResponseInfo`

    - `code: number`

    - `message: string`

    - `documentation_url: optional string`

    - `source: optional object { pointer }`

  - `messages: array of ResponseInfo`

    - `code: number`

    - `message: string`

    - `documentation_url: optional string`

    - `source: optional object { pointer }`

  - `success: true`

    Whether the API call was successful

    - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/user/audit_logs \
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
  "result": [
    {
      "id": "d5b0f326-1232-4452-8858-1089bd7168ef",
      "action": {
        "result": true,
        "type": "change_setting"
      },
      "actor": {
        "id": "f6b5de0326bb5182b8a4840ee01ec774",
        "email": "michelle@example.com",
        "ip": "198.41.129.166",
        "type": "user"
      },
      "interface": "API",
      "metadata": {
        "name": "security_level",
        "type": "firewall",
        "value": "high",
        "zone_name": "example.com"
      },
      "newValue": "low",
      "oldValue": "high",
      "owner": {
        "id": "023e105f4ecef8ad9ca31a8372d0c353"
      },
      "resource": {
        "id": "023e105f4ecef8ad9ca31a8372d0c353",
        "type": "zone"
      },
      "when": "2017-04-26T17:31:07Z"
    }
  ],
  "success": true
}
```

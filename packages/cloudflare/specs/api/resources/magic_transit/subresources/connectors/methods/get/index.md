## Fetch Connector

**get** `/accounts/{account_id}/magic/connectors/{connector_id}`

Fetch Connector

### Path Parameters

- `account_id: string`

  Account identifier

- `connector_id: string`

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `result: object { id, activated, interrupt_window_days_of_week, 12 more }`

  - `id: string`

  - `activated: boolean`

  - `interrupt_window_days_of_week: array of "Sunday" or "Monday" or "Tuesday" or 4 more`

    Allowed days of the week for upgrades. Default is all days.

    - `"Sunday"`

    - `"Monday"`

    - `"Tuesday"`

    - `"Wednesday"`

    - `"Thursday"`

    - `"Friday"`

    - `"Saturday"`

  - `interrupt_window_duration_hours: number`

  - `interrupt_window_embargo_dates: array of string`

    List of dates (YYYY-MM-DD) when upgrades are blocked.

  - `interrupt_window_hour_of_day: number`

  - `last_updated: string`

  - `notes: string`

  - `primary: boolean`

  - `timezone: string`

  - `device: optional object { id, serial_number, type }`

    - `id: string`

    - `serial_number: optional string`

    - `type: optional "MANAGED" or "LICENSED"`

      - `"MANAGED"`

      - `"LICENSED"`

  - `last_heartbeat: optional string`

  - `last_seen_version: optional string`

  - `license_key: optional string`

  - `site_id: optional string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/connectors/$CONNECTOR_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "result": {
    "id": "id",
    "activated": true,
    "interrupt_window_days_of_week": [
      "Sunday"
    ],
    "interrupt_window_duration_hours": 1,
    "interrupt_window_embargo_dates": [
      "string"
    ],
    "interrupt_window_hour_of_day": 0,
    "last_updated": "last_updated",
    "notes": "notes",
    "primary": true,
    "timezone": "timezone",
    "device": {
      "id": "id",
      "serial_number": "serial_number",
      "type": "MANAGED"
    },
    "last_heartbeat": "last_heartbeat",
    "last_seen_version": "last_seen_version",
    "license_key": "license_key",
    "site_id": "site_id"
  },
  "success": true
}
```

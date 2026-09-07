# WARP Change Events

## List WARP change events.

**get** `/accounts/{account_id}/dex/warp-change-events`

List WARP configuration and enablement toggle change events by device.

### Path Parameters

- `account_id: string`

  Unique identifier linked to an account.

### Query Parameters

- `from: string`

  Start time for the query in ISO (RFC3339 - ISO 8601) format.

- `page: number`

  Page number of paginated results.

- `per_page: number`

  Number of results per page.

- `to: string`

  End time for the query in ISO (RFC3339 - ISO 8601) format.

- `account_name: optional string`

  Filter events by account name.

- `config_name: optional string`

  Filter events by WARP configuration name changed from or to. Applicable to type='config' events only.

- `sort_order: optional "ASC" or "DESC"`

  Sort response by event timestamp.

  - `"ASC"`

  - `"DESC"`

- `toggle: optional "on" or "off"`

  Filter events by type toggle value. Applicable to type='toggle' events only.

  - `"on"`

  - `"off"`

- `type: optional "config" or "toggle"`

  Filter events by type 'config' or 'toggle'.

  - `"config"`

  - `"toggle"`

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

- `result: optional array of object { account_name, account_tag, device_id, 7 more }  or object { device_id, device_registration, from, 6 more }`

  - `DigitalExperienceMonitoringWARPToggleChangeEvent object { account_name, account_tag, device_id, 7 more }`

    - `account_name: optional string`

      The account name.

    - `account_tag: optional string`

      The public account identifier.

    - `device_id: optional string`

      The device ID.

    - `device_registration: optional string`

      Deprecated: use registration_id. The device registration ID.

    - `hostname: optional string`

      The hostname of the machine the event is from.

    - `registration_id: optional string`

      The device registration ID.

    - `serial_number: optional string`

      The serial number of the machine the event is from.

    - `timestamp: optional string`

      The event time.

    - `toggle: optional "on" or "off"`

      The state of the WARP toggle.

      - `"on"`

      - `"off"`

    - `user_email: optional string`

      Email tied to the device.

  - `DigitalExperienceMonitoringWARPConfigChangeEvent object { device_id, device_registration, from, 6 more }`

    - `device_id: optional string`

      The device ID.

    - `device_registration: optional string`

      Deprecated: use registration_id. The device registration ID.

    - `from: optional object { account_name, account_tag, config_name }`

      The details for the WARP configuration that was switched from.

      - `account_name: optional string`

        The account name.

      - `account_tag: optional string`

        The public account identifier.

      - `config_name: optional string`

        The name of the WARP configuration.

    - `hostname: optional string`

      The hostname of the machine the event is from.

    - `registration_id: optional string`

      The device registration ID.

    - `serial_number: optional string`

      The serial number of the machine the event is from.

    - `timestamp: optional string`

      The event time.

    - `to: optional object { account_name, account_tag, config_name }`

      The details for the WARP configuration that was switched to.

      - `account_name: optional string`

        The account name.

      - `account_tag: optional string`

        The public account identifier.

      - `config_name: optional string`

        The name of the WARP configuration.

    - `user_email: optional string`

      Email tied to the device.

- `result_info: optional object { count, page, per_page, 2 more }`

  - `count: optional number`

    Total number of results for the requested service.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dex/warp-change-events \
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
      "account_name": "account_name",
      "account_tag": "account_tag",
      "device_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "device_registration": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "hostname": "hostname",
      "registration_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "serial_number": "serial_number",
      "timestamp": "2023-10-11T00:00:00Z",
      "toggle": "on",
      "user_email": "user_email"
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```

## Domain Types

### WARP Change Event Get Response

- `WARPChangeEventGetResponse = array of object { account_name, account_tag, device_id, 7 more }  or object { device_id, device_registration, from, 6 more }`

  - `DigitalExperienceMonitoringWARPToggleChangeEvent object { account_name, account_tag, device_id, 7 more }`

    - `account_name: optional string`

      The account name.

    - `account_tag: optional string`

      The public account identifier.

    - `device_id: optional string`

      The device ID.

    - `device_registration: optional string`

      Deprecated: use registration_id. The device registration ID.

    - `hostname: optional string`

      The hostname of the machine the event is from.

    - `registration_id: optional string`

      The device registration ID.

    - `serial_number: optional string`

      The serial number of the machine the event is from.

    - `timestamp: optional string`

      The event time.

    - `toggle: optional "on" or "off"`

      The state of the WARP toggle.

      - `"on"`

      - `"off"`

    - `user_email: optional string`

      Email tied to the device.

  - `DigitalExperienceMonitoringWARPConfigChangeEvent object { device_id, device_registration, from, 6 more }`

    - `device_id: optional string`

      The device ID.

    - `device_registration: optional string`

      Deprecated: use registration_id. The device registration ID.

    - `from: optional object { account_name, account_tag, config_name }`

      The details for the WARP configuration that was switched from.

      - `account_name: optional string`

        The account name.

      - `account_tag: optional string`

        The public account identifier.

      - `config_name: optional string`

        The name of the WARP configuration.

    - `hostname: optional string`

      The hostname of the machine the event is from.

    - `registration_id: optional string`

      The device registration ID.

    - `serial_number: optional string`

      The serial number of the machine the event is from.

    - `timestamp: optional string`

      The event time.

    - `to: optional object { account_name, account_tag, config_name }`

      The details for the WARP configuration that was switched to.

      - `account_name: optional string`

        The account name.

      - `account_tag: optional string`

        The public account identifier.

      - `config_name: optional string`

        The name of the WARP configuration.

    - `user_email: optional string`

      Email tied to the device.

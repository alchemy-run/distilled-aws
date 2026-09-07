## Get CSAM Scanner setting

**get** `/zones/{zone_id}/settings/csam_scanner_third_party`

Retrieve the current CSAM Scanner configuration for a zone.

The notification email is masked by default in responses.

### Path Parameters

- `zone_id: string`

  Identifier for the zone.

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

- `success: boolean`

  Whether the API call was successful.

- `result: optional object { id, editable, modified_on, value }`

  CSAM Scanner configuration for a zone.

  - `id: optional "csam_scanner"`

    The feature identifier.

    - `"csam_scanner"`

  - `editable: optional boolean`

    Whether the feature state can be changed. When false, the zone
    or account may be locked by Trust & Safety.

  - `modified_on: optional string`

    When the setting was last modified. Currently always null as the
    server does not populate this field.

  - `value: optional object { email, email_state, enabled, 2 more }`

    The CSAM Scanner feature configuration values. Contains the
    notification email and scanning enablement settings.

    - `email: optional string`

      Notification email address for CSAM scan results. Masked in
      responses unless explicitly unmasked via admin endpoint.

    - `email_state: optional "valid" or "pending" or "unverified"`

      Current verification state of the notification email.

      - `"valid"`

      - `"pending"`

      - `"unverified"`

    - `enabled: optional boolean`

      Whether CSAM scanning is enabled for this zone.

    - `sources: optional map[boolean]`

      Map of scanning sources and their enabled state.

    - `zone_plan: optional string`

      The zone's plan level.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/settings/csam_scanner_third_party \
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
  "result": {
    "id": "csam_scanner",
    "editable": true,
    "modified_on": "2019-12-27T18:11:19.117Z",
    "value": {
      "email": "**********",
      "email_state": "valid",
      "enabled": true,
      "sources": {
        "source1": true
      },
      "zone_plan": "ent"
    }
  }
}
```

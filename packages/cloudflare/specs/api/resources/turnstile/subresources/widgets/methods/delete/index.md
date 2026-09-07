## Delete a Turnstile Widget

**delete** `/accounts/{account_id}/challenges/widgets/{sitekey}`

Destroy a Turnstile Widget.

### Path Parameters

- `account_id: string`

  Identifier

- `sitekey: string`

  Widget item identifier tag.

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

  Whether the API call was successful

- `result: optional Widget`

  A Turnstile widget's detailed configuration

  - `bot_fight_mode: boolean`

    If bot_fight_mode is set to `true`, Cloudflare issues computationally
    expensive challenges in response to malicious bots (ENT only).

  - `clearance_level: "no_clearance" or "jschallenge" or "managed" or "interactive"`

    If Turnstile is embedded on a Cloudflare site and the widget should grant challenge clearance,
    this setting can determine the clearance level to be set

    - `"no_clearance"`

    - `"jschallenge"`

    - `"managed"`

    - `"interactive"`

  - `created_on: string`

    When the widget was created.

  - `domains: array of WidgetDomain`

  - `ephemeral_id: boolean`

    Return the Ephemeral ID in /siteverify (ENT only).

  - `mode: "non-interactive" or "invisible" or "managed"`

    Widget Mode

    - `"non-interactive"`

    - `"invisible"`

    - `"managed"`

  - `modified_on: string`

    When the widget was modified.

  - `name: string`

    Human readable widget name. Not unique. Cloudflare suggests that you
    set this to a meaningful string to make it easier to identify your
    widget, and where it is used.

  - `offlabel: boolean`

    Do not show any Cloudflare branding on the widget (ENT only).

  - `region: "world" or "china"`

    Region where this widget can be used. This cannot be changed after creation.

    - `"world"`

    - `"china"`

  - `secret: string`

    Secret key for this widget.

  - `sitekey: string`

    Widget item identifier tag.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/challenges/widgets/$SITEKEY \
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
    "bot_fight_mode": false,
    "clearance_level": "interactive",
    "created_on": "2014-01-01T05:20:00.123123Z",
    "domains": [
      "203.0.113.1",
      "cloudflare.com",
      "blog.example.com"
    ],
    "ephemeral_id": false,
    "mode": "invisible",
    "modified_on": "2014-01-01T05:20:00.123123Z",
    "name": "blog.cloudflare.com login form",
    "offlabel": false,
    "region": "world",
    "secret": "0x4AAF00AAAABn0R22HWm098HVBjhdsYUc",
    "sitekey": "0x4AAF00AAAABn0R22HWm-YUc"
  }
}
```

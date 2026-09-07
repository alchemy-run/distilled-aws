## List an account or zone ruleset's versions

**get** `/{accounts_or_zones}/{account_or_zone_id}/rulesets/{ruleset_id}/versions`

Fetches the versions of an account or zone ruleset.

### Path Parameters

- `ruleset_id: string`

  The unique ID of the ruleset.

- `account_id: optional string`

  The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

- `zone_id: optional string`

  The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

### Returns

- `errors: array of object { message, code, source }`

  A list of error messages.

  - `message: string`

    A text description of this message.

  - `code: optional number`

    A unique code for this message.

  - `source: optional object { pointer }`

    The source of this message.

    - `pointer: string`

      A JSON pointer to the field that is the source of the message.

- `messages: array of object { message, code, source }`

  A list of warning messages.

  - `message: string`

    A text description of this message.

  - `code: optional number`

    A unique code for this message.

  - `source: optional object { pointer }`

    The source of this message.

    - `pointer: string`

      A JSON pointer to the field that is the source of the message.

- `result: array of object { id, kind, last_updated, 4 more }`

  A list of rulesets. The returned information will not include the rules in each ruleset.

  - `id: string`

    The unique ID of the ruleset.

  - `kind: Kind`

    The kind of the ruleset.

    - `"managed"`

    - `"custom"`

    - `"root"`

    - `"zone"`

  - `last_updated: string`

    The timestamp of when the ruleset was last modified.

  - `name: string`

    The human-readable name of the ruleset.

  - `phase: Phase`

    The phase of the ruleset.

    - `"ddos_l4"`

    - `"ddos_l7"`

    - `"http_config_settings"`

    - `"http_custom_errors"`

    - `"http_log_custom_fields"`

    - `"http_ratelimit"`

    - `"http_request_cache_settings"`

    - `"http_request_dynamic_redirect"`

    - `"http_request_firewall_custom"`

    - `"http_request_firewall_managed"`

    - `"http_request_late_transform"`

    - `"http_request_origin"`

    - `"http_request_redirect"`

    - `"http_request_sanitize"`

    - `"http_request_sbfm"`

    - `"http_request_transform"`

    - `"http_response_cache_settings"`

    - `"http_response_compression"`

    - `"http_response_firewall_managed"`

    - `"http_response_headers_transform"`

    - `"magic_transit"`

    - `"magic_transit_ids_managed"`

    - `"magic_transit_managed"`

    - `"magic_transit_ratelimit"`

  - `version: string`

    The version of the ruleset.

  - `description: optional string`

    An informative description of the ruleset.

- `success: true`

  Whether the API call was successful.

  - `true`

- `result_info: optional object { cursors }`

  Information to navigate the results.

  - `cursors: optional object { after }`

    The set of cursors.

    - `after: string`

      The cursor to use for the next page.

### Example

```http
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/rulesets/$RULESET_ID/versions \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "message": "something bad happened",
      "code": 10000,
      "source": {
        "pointer": "/rules/0/action"
      }
    }
  ],
  "messages": [
    {
      "message": "something bad happened",
      "code": 10000,
      "source": {
        "pointer": "/rules/0/action"
      }
    }
  ],
  "result": [
    {
      "id": "2f2feab2026849078ba485f918791bdc",
      "kind": "root",
      "last_updated": "2000-01-01T00:00:00.000000Z",
      "name": "My ruleset",
      "phase": "http_request_firewall_custom",
      "version": "1",
      "description": "A description for my ruleset."
    }
  ],
  "success": true,
  "result_info": {
    "cursors": {
      "after": "dGhpc2lzYW5leGFtcGxlCg"
    }
  }
}
```

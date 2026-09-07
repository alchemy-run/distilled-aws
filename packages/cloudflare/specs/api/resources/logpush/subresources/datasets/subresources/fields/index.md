# Fields

## List fields

**get** `/{accounts_or_zones}/{account_or_zone_id}/logpush/datasets/{dataset_id}/fields`

Lists all fields available for a dataset. The response result is. an object with key-value pairs, where keys are field names, and values are descriptions.

### Path Parameters

- `dataset_id: "access_requests" or "audit_logs" or "audit_logs_v2" or 32 more`

  Name of the dataset. A list of supported datasets can be found on the [Developer Docs](https://developers.cloudflare.com/logs/reference/log-fields/).

  - `"access_requests"`

  - `"audit_logs"`

  - `"audit_logs_v2"`

  - `"biso_user_actions"`

  - `"casb_findings"`

  - `"device_posture_results"`

  - `"dex_application_tests"`

  - `"dex_device_state_events"`

  - `"dlp_forensic_copies"`

  - `"dns_firewall_logs"`

  - `"dns_logs"`

  - `"email_security_alerts"`

  - `"email_security_post_delivery_events"`

  - `"firewall_events"`

  - `"gateway_dns"`

  - `"gateway_http"`

  - `"gateway_network"`

  - `"http_requests"`

  - `"ipsec_logs"`

  - `"magic_ids_detections"`

  - `"mcp_portal_logs"`

  - `"mnm_flow_logs"`

  - `"nel_reports"`

  - `"network_analytics_logs"`

  - `"page_shield_events"`

  - `"sinkhole_http_logs"`

  - `"spectrum_events"`

  - `"ssh_logs"`

  - `"turnstile_events"`

  - `"warp_config_changes"`

  - `"warp_toggle_changes"`

  - `"websocket_analytics"`

  - `"workers_trace_events"`

  - `"zaraz_events"`

  - `"zero_trust_network_sessions"`

- `account_id: optional string`

  The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

- `zone_id: optional string`

  The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

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

- `result: optional unknown`

### Example

```http
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/logpush/datasets/$DATASET_ID/fields \
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
  "result": {}
}
```

## Domain Types

### Field Get Response

- `FieldGetResponse = unknown`

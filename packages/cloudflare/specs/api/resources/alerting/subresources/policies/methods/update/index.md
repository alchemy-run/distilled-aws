## Update a Notification policy

**put** `/accounts/{account_id}/alerting/v3/policies/{policy_id}`

Update a Notification policy.

### Path Parameters

- `account_id: string`

  The account id

- `policy_id: string`

  The unique identifier of a notification policy

### Body Parameters

- `alert_interval: optional string`

  Optional specification of how often to re-alert from the same incident, not support on all alert types.

- `alert_type: optional "abuse_report_alert" or "access_custom_certificate_expiration_type" or "advanced_ddos_attack_l4_alert" or 66 more`

  Refers to which event will trigger a Notification dispatch. You can use the endpoint to get available alert types which then will give you a list of possible values.

  - `"abuse_report_alert"`

  - `"access_custom_certificate_expiration_type"`

  - `"advanced_ddos_attack_l4_alert"`

  - `"advanced_ddos_attack_l7_alert"`

  - `"advanced_http_alert_error"`

  - `"bgp_hijack_notification"`

  - `"billing_usage_alert"`

  - `"block_notification_block_removed"`

  - `"block_notification_new_block"`

  - `"block_notification_review_rejected"`

  - `"bot_traffic_basic_alert"`

  - `"brand_protection_alert"`

  - `"brand_protection_digest"`

  - `"clickhouse_alert_fw_anomaly"`

  - `"clickhouse_alert_fw_ent_anomaly"`

  - `"cloudforce_one_request_notification"`

  - `"cni_maintenance_notification"`

  - `"custom_analytics"`

  - `"custom_bot_detection_alert"`

  - `"custom_ssl_certificate_event_type"`

  - `"dedicated_ssl_certificate_event_type"`

  - `"device_connectivity_anomaly_alert"`

  - `"dos_attack_l4"`

  - `"dos_attack_l7"`

  - `"expiring_service_token_alert"`

  - `"failing_logpush_job_disabled_alert"`

  - `"fbm_auto_advertisement"`

  - `"fbm_dosd_attack"`

  - `"fbm_volumetric_attack"`

  - `"health_check_status_notification"`

  - `"hostname_aop_custom_certificate_expiration_type"`

  - `"http_alert_edge_error"`

  - `"http_alert_origin_error"`

  - `"image_notification"`

  - `"image_resizing_notification"`

  - `"incident_alert"`

  - `"load_balancing_health_alert"`

  - `"load_balancing_pool_enablement_alert"`

  - `"logo_match_alert"`

  - `"magic_tunnel_health_check_event"`

  - `"magic_wan_tunnel_health"`

  - `"maintenance_event_notification"`

  - `"mtls_certificate_store_certificate_expiration_type"`

  - `"pages_event_alert"`

  - `"radar_notification"`

  - `"real_origin_monitoring"`

  - `"scriptmonitor_alert_new_code_change_detections"`

  - `"scriptmonitor_alert_new_hosts"`

  - `"scriptmonitor_alert_new_malicious_hosts"`

  - `"scriptmonitor_alert_new_malicious_scripts"`

  - `"scriptmonitor_alert_new_malicious_url"`

  - `"scriptmonitor_alert_new_max_length_resource_url"`

  - `"scriptmonitor_alert_new_resources"`

  - `"secondary_dns_all_primaries_failing"`

  - `"secondary_dns_primaries_failing"`

  - `"secondary_dns_warning"`

  - `"secondary_dns_zone_successfully_updated"`

  - `"secondary_dns_zone_validation_warning"`

  - `"security_insights_alert"`

  - `"sentinel_alert"`

  - `"stream_live_notifications"`

  - `"synthetic_test_latency_alert"`

  - `"synthetic_test_low_availability_alert"`

  - `"traffic_anomalies_alert"`

  - `"tunnel_health_event"`

  - `"tunnel_update_event"`

  - `"universal_ssl_event_type"`

  - `"web_analytics_metrics_update"`

  - `"zone_aop_custom_certificate_expiration_type"`

- `description: optional string`

  Optional description for the Notification policy.

- `enabled: optional boolean`

  Whether or not the Notification policy is enabled.

- `filters: optional PolicyFilter`

  Optional filters that allow you to be alerted only on a subset of events for that alert type based on some criteria. This is only available for select alert types. See alert type documentation for more details.

  - `actions: optional array of string`

    Usage depends on specific alert type

  - `affected_asns: optional array of string`

    Used for configuring radar_notification

  - `affected_components: optional array of string`

    Used for configuring incident_alert

  - `affected_locations: optional array of string`

    Used for configuring radar_notification

  - `airport_code: optional array of string`

    Used for configuring maintenance_event_notification

  - `alert_trigger_preferences: optional array of string`

    Usage depends on specific alert type

  - `alert_trigger_preferences_value: optional array of string`

    Usage depends on specific alert type

  - `enabled: optional array of string`

    Used for configuring load_balancing_pool_enablement_alert

  - `environment: optional array of string`

    Used for configuring pages_event_alert

  - `event: optional array of string`

    Used for configuring pages_event_alert

  - `event_source: optional array of string`

    Used for configuring load_balancing_health_alert

  - `event_type: optional array of string`

    Usage depends on specific alert type

  - `group_by: optional array of string`

    Usage depends on specific alert type

  - `health_check_id: optional array of string`

    Used for configuring health_check_status_notification

  - `incident_impact: optional array of "INCIDENT_IMPACT_NONE" or "INCIDENT_IMPACT_MINOR" or "INCIDENT_IMPACT_MAJOR" or "INCIDENT_IMPACT_CRITICAL"`

    Used for configuring incident_alert

    - `"INCIDENT_IMPACT_NONE"`

    - `"INCIDENT_IMPACT_MINOR"`

    - `"INCIDENT_IMPACT_MAJOR"`

    - `"INCIDENT_IMPACT_CRITICAL"`

  - `input_id: optional array of string`

    Used for configuring stream_live_notifications

  - `insight_class: optional array of string`

    Used for configuring security_insights_alert

  - `limit: optional array of string`

    Used for configuring billing_usage_alert

  - `logo_tag: optional array of string`

    Used for configuring logo_match_alert

  - `megabits_per_second: optional array of string`

    Used for configuring advanced_ddos_attack_l4_alert

  - `new_health: optional array of string`

    Used for configuring load_balancing_health_alert

  - `new_status: optional array of string`

    Used for configuring tunnel_health_event

  - `packets_per_second: optional array of string`

    Used for configuring advanced_ddos_attack_l4_alert

  - `pool_id: optional array of string`

    Usage depends on specific alert type

  - `pop_names: optional array of string`

    Usage depends on specific alert type

  - `product: optional array of string`

    Used for configuring billing_usage_alert

  - `project_id: optional array of string`

    Used for configuring pages_event_alert

  - `protocol: optional array of string`

    Used for configuring advanced_ddos_attack_l4_alert

  - `query_tag: optional array of string`

    Usage depends on specific alert type

  - `requests_per_second: optional array of string`

    Used for configuring advanced_ddos_attack_l7_alert

  - `selectors: optional array of string`

    Usage depends on specific alert type

  - `services: optional array of string`

    Used for configuring clickhouse_alert_fw_ent_anomaly

  - `slo: optional array of string`

    Usage depends on specific alert type

  - `status: optional array of string`

    Used for configuring health_check_status_notification

  - `target_hostname: optional array of string`

    Used for configuring advanced_ddos_attack_l7_alert

  - `target_ip: optional array of string`

    Used for configuring advanced_ddos_attack_l4_alert

  - `target_zone_name: optional array of string`

    Used for configuring advanced_ddos_attack_l7_alert

  - `traffic_exclusions: optional array of "security_events"`

    Used for configuring traffic_anomalies_alert

    - `"security_events"`

  - `tunnel_id: optional array of string`

    Used for configuring tunnel_health_event

  - `tunnel_name: optional array of string`

    Usage depends on specific alert type

  - `type: optional array of string`

    Usage depends on specific alert type

  - `where: optional array of string`

    Usage depends on specific alert type

  - `zones: optional array of string`

    Usage depends on specific alert type

- `mechanisms: optional Mechanism`

  List of IDs that will be used when dispatching a notification. IDs for email type will be the email address.

  - `email: optional array of object { id }`

    - `id: optional string`

      The email address

  - `pagerduty: optional array of object { id }`

    - `id: optional string`

      UUID

  - `webhooks: optional array of object { id }`

    - `id: optional string`

      UUID

- `name: optional string`

  Name of the policy.

### Returns

- `errors: array of object { message, code }`

  - `message: string`

  - `code: optional number`

- `messages: array of object { message, code }`

  - `message: string`

  - `code: optional number`

- `success: true`

  Whether the API call was successful

  - `true`

- `result: optional object { id }`

  - `id: optional string`

    UUID

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/alerting/v3/policies/$POLICY_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "alert_interval": "30m",
          "alert_type": "universal_ssl_event_type",
          "description": "Something describing the policy.",
          "enabled": true,
          "filters": {
            "slo": [
              "99.9"
            ]
          },
          "name": "SSL Notification Event Policy"
        }'
```

#### Response

```json
{
  "errors": [
    {
      "message": "message",
      "code": 1000
    }
  ],
  "messages": [
    {
      "message": "message",
      "code": 1000
    }
  ],
  "success": true,
  "result": {
    "id": "f174e90afafe4643bbbc4a0ed4fc8415"
  }
}
```

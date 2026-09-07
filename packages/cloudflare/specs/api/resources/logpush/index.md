# Logpush

# Datasets

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

# Jobs

## List Logpush jobs for a dataset

**get** `/{accounts_or_zones}/{account_or_zone_id}/logpush/datasets/{dataset_id}/jobs`

Lists Logpush jobs for an account or zone for a dataset.

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

- `result: optional array of LogpushJob`

  - `id: optional number`

    Unique id of the job.

  - `dataset: optional "access_requests" or "audit_logs" or "audit_logs_v2" or 32 more`

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

  - `destination_conf: optional string`

    Uniquely identifies a resource (such as an s3 bucket) where data. will be pushed. Additional configuration parameters supported by the destination may be included.

  - `enabled: optional boolean`

    Flag that indicates if the job is enabled.

  - `error_message: optional string`

    If not null, the job is currently failing. Failures are usually. repetitive (example: no permissions to write to destination bucket). Only the last failure is recorded. On successful execution of a job the error_message and last_error are set to null.

  - `frequency: optional "high" or "low"`

    This field is deprecated. Please use `max_upload_*` parameters instead. . The frequency at which Cloudflare sends batches of logs to your destination. Setting frequency to high sends your logs in larger quantities of smaller files. Setting frequency to low sends logs in smaller quantities of larger files.

    - `"high"`

    - `"low"`

  - `kind: optional "" or "edge"`

    The kind parameter (optional) is used to differentiate between Logpush and Edge Log Delivery jobs (when supported by the dataset).

    - `""`

    - `"edge"`

  - `last_complete: optional string`

    Records the last time for which logs have been successfully pushed. If the last successful push was for logs range 2018-07-23T10:00:00Z to 2018-07-23T10:01:00Z then the value of this field will be 2018-07-23T10:01:00Z. If the job has never run or has just been enabled and hasn't run yet then the field will be empty.

  - `last_error: optional string`

    Records the last time the job failed. If not null, the job is currently. failing. If null, the job has either never failed or has run successfully at least once since last failure. See also the error_message field.

  - `logpull_options: optional string`

    This field is deprecated. Use `output_options` instead. Configuration string. It specifies things like requested fields and timestamp formats. If migrating from the logpull api, copy the url (full url or just the query string) of your call here, and logpush will keep on making this call for you, setting start and end times appropriately.

  - `max_upload_bytes: optional 0 or number`

    The maximum uncompressed file size of a batch of logs. This setting value must be between `5 MB` and `1 GB`, or `0` to disable it. Note that you cannot set a minimum file size; this means that log files may be much smaller than this batch size.

    - `0`

      The maximum uncompressed file size of a batch of logs. This setting value must be between `5 MB` and `1 GB`, or `0` to disable it. Note that you cannot set a minimum file size; this means that log files may be much smaller than this batch size.

      - `0`

    - `number`

  - `max_upload_interval_seconds: optional 0 or number`

    The maximum interval in seconds for log batches. This setting must be between 30 and 300 seconds (5 minutes), or `0` to disable it. Note that you cannot specify a minimum interval for log batches; this means that log files may be sent in shorter intervals than this.

    - `0`

      The maximum interval in seconds for log batches. This setting must be between 30 and 300 seconds (5 minutes), or `0` to disable it. Note that you cannot specify a minimum interval for log batches; this means that log files may be sent in shorter intervals than this.

      - `0`

    - `number`

  - `max_upload_records: optional 0 or number`

    The maximum number of log lines per batch. This setting must be between 1000 and 1,000,000 lines, or `0` to disable it. Note that you cannot specify a minimum number of log lines per batch; this means that log files may contain many fewer lines than this.

    - `0`

      The maximum number of log lines per batch. This setting must be between 1000 and 1,000,000 lines, or `0` to disable it. Note that you cannot specify a minimum number of log lines per batch; this means that log files may contain many fewer lines than this.

      - `0`

    - `number`

  - `name: optional string`

    Optional human readable job name. Not unique. Cloudflare suggests. that you set this to a meaningful string, like the domain name, to make it easier to identify your job.

  - `output_options: optional OutputOptions`

    The structured replacement for `logpull_options`. When including this field, the `logpull_option` field will be ignored.

    - `batch_prefix: optional string`

      String to be prepended before each batch.

    - `batch_suffix: optional string`

      String to be appended after each batch.

    - `"CVE-2021-44228": optional boolean`

      If set to true, will cause all occurrences of `${` in the generated files to be replaced with `x{`.

    - `field_delimiter: optional string`

      String to join fields. This field be ignored when `record_template` is set.

    - `field_names: optional array of string`

      List of field names to be included in the Logpush output. For the moment, there is no option to add all fields at once, so you must specify all the fields names you are interested in.

    - `merge_subrequests: optional boolean`

      If set to true, subrequests will be merged into the parent request. Only supported for the `http_requests` dataset.

    - `output_type: optional "ndjson" or "csv"`

      Specifies the output type, such as `ndjson` or `csv`. This sets default values for the rest of the settings, depending on the chosen output type. Some formatting rules, like string quoting, are different between output types.

      - `"ndjson"`

      - `"csv"`

    - `record_delimiter: optional string`

      String to be inserted in-between the records as separator.

    - `record_prefix: optional string`

      String to be prepended before each record.

    - `record_suffix: optional string`

      String to be appended after each record.

    - `record_template: optional string`

      String to use as template for each record instead of the default json key value mapping. All fields used in the template must be present in `field_names` as well, otherwise they will end up as null. Format as a Go `text/template` without any standard functions, like conditionals, loops, sub-templates, etc.

    - `sample_rate: optional number`

      Floating number to specify sampling rate. Sampling is applied on top of filtering, and regardless of the current `sample_interval` of the data.

    - `timestamp_format: optional "unixnano" or "unix" or "rfc3339" or 2 more`

      String to specify the format for timestamps, such as `unixnano`, `unix`, `rfc3339`, `rfc3339ms` or `rfc3339ns`.

      - `"unixnano"`

      - `"unix"`

      - `"rfc3339"`

      - `"rfc3339ms"`

      - `"rfc3339ns"`

### Example

```http
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/logpush/datasets/$DATASET_ID/jobs \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [],
  "messages": [],
  "result": [
    {
      "dataset": "gateway_dns",
      "destination_conf": "s3://mybucket/logs?region=us-west-2",
      "enabled": false,
      "error_message": null,
      "filter": "{\"where\":{\"and\":[{\"key\":\"ClientRequestPath\",\"operator\":\"contains\",\"value\":\"/static\"},{\"key\":\"ClientRequestHost\",\"operator\":\"eq\",\"value\":\"example.com\"}]}}",
      "id": 1,
      "kind": "",
      "last_complete": null,
      "last_error": null,
      "max_upload_bytes": 5000000,
      "max_upload_interval_seconds": 30,
      "max_upload_records": 1000,
      "name": "example.com",
      "output_options": {
        "CVE-2021-44228": false,
        "batch_prefix": "",
        "batch_suffix": "",
        "field_delimiter": ",",
        "field_names": [
          "Datetime",
          "DstIP",
          "SrcIP"
        ],
        "output_type": "ndjson",
        "record_delimiter": "",
        "record_prefix": "{",
        "record_suffix": "}\n",
        "sample_rate": 1,
        "timestamp_format": "unixnano"
      }
    }
  ],
  "success": true
}
```

# Edge

## List Instant Logs jobs

**get** `/zones/{zone_id}/logpush/edge/jobs`

Lists Instant Logs jobs for a zone.

### Path Parameters

- `zone_id: string`

  Identifier.

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

- `result: optional array of InstantLogpushJob`

  - `destination_conf: optional string`

    Unique WebSocket address that will receive messages from Cloudflare’s edge.

  - `fields: optional string`

    Comma-separated list of fields.

  - `filter: optional string`

    Filters to drill down into specific events.

  - `sample: optional number`

    The sample parameter is the sample rate of the records set by the client: "sample": 1 is 100% of records "sample": 10 is 10% and so on.

  - `session_id: optional string`

    Unique session id of the job.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/logpush/edge/jobs \
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
      "destination_conf": "wss://logs.cloudflare.com/instant-logs/ws/sessions/99d471b1ca3c23cc8e30b6acec5db987",
      "fields": "ClientIP,ClientRequestHost,ClientRequestMethod,ClientRequestURI,EdgeEndTimestamp,EdgeResponseBytes,EdgeResponseStatus,EdgeStartTimestamp,RayID",
      "filter": "{\"where\":{\"and\":[{\"key\":\"ClientCountry\",\"operator\":\"neq\",\"value\":\"ca\"}]}}",
      "sample": 1,
      "session_id": "99d471b1ca3c23cc8e30b6acec5db987"
    }
  ]
}
```

## Create Instant Logs job

**post** `/zones/{zone_id}/logpush/edge/jobs`

Creates a new Instant Logs job for a zone.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `fields: optional string`

  Comma-separated list of fields.

- `filter: optional string`

  Filters to drill down into specific events.

- `sample: optional number`

  The sample parameter is the sample rate of the records set by the client: "sample": 1 is 100% of records "sample": 10 is 10% and so on.

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

- `result: optional InstantLogpushJob`

  - `destination_conf: optional string`

    Unique WebSocket address that will receive messages from Cloudflare’s edge.

  - `fields: optional string`

    Comma-separated list of fields.

  - `filter: optional string`

    Filters to drill down into specific events.

  - `sample: optional number`

    The sample parameter is the sample rate of the records set by the client: "sample": 1 is 100% of records "sample": 10 is 10% and so on.

  - `session_id: optional string`

    Unique session id of the job.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/logpush/edge/jobs \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "fields": "ClientIP,ClientRequestHost,ClientRequestMethod,ClientRequestURI,EdgeEndTimestamp,EdgeResponseBytes,EdgeResponseStatus,EdgeStartTimestamp,RayID",
          "filter": "{\\"where\\":{\\"and\\":[{\\"key\\":\\"ClientCountry\\",\\"operator\\":\\"neq\\",\\"value\\":\\"ca\\"}]}}",
          "sample": 1
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
    "destination_conf": "wss://logs.cloudflare.com/instant-logs/ws/sessions/99d471b1ca3c23cc8e30b6acec5db987",
    "fields": "ClientIP,ClientRequestHost,ClientRequestMethod,ClientRequestURI,EdgeEndTimestamp,EdgeResponseBytes,EdgeResponseStatus,EdgeStartTimestamp,RayID",
    "filter": "{\"where\":{\"and\":[{\"key\":\"ClientCountry\",\"operator\":\"neq\",\"value\":\"ca\"}]}}",
    "sample": 1,
    "session_id": "99d471b1ca3c23cc8e30b6acec5db987"
  }
}
```

## Domain Types

### Instant Logpush Job

- `InstantLogpushJob object { destination_conf, fields, filter, 2 more }`

  - `destination_conf: optional string`

    Unique WebSocket address that will receive messages from Cloudflare’s edge.

  - `fields: optional string`

    Comma-separated list of fields.

  - `filter: optional string`

    Filters to drill down into specific events.

  - `sample: optional number`

    The sample parameter is the sample rate of the records set by the client: "sample": 1 is 100% of records "sample": 10 is 10% and so on.

  - `session_id: optional string`

    Unique session id of the job.

# Jobs

## List Logpush jobs

**get** `/{accounts_or_zones}/{account_or_zone_id}/logpush/jobs`

Lists Logpush jobs for an account or zone.

### Path Parameters

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

- `result: optional array of LogpushJob`

  - `id: optional number`

    Unique id of the job.

  - `dataset: optional "access_requests" or "audit_logs" or "audit_logs_v2" or 32 more`

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

  - `destination_conf: optional string`

    Uniquely identifies a resource (such as an s3 bucket) where data. will be pushed. Additional configuration parameters supported by the destination may be included.

  - `enabled: optional boolean`

    Flag that indicates if the job is enabled.

  - `error_message: optional string`

    If not null, the job is currently failing. Failures are usually. repetitive (example: no permissions to write to destination bucket). Only the last failure is recorded. On successful execution of a job the error_message and last_error are set to null.

  - `frequency: optional "high" or "low"`

    This field is deprecated. Please use `max_upload_*` parameters instead. . The frequency at which Cloudflare sends batches of logs to your destination. Setting frequency to high sends your logs in larger quantities of smaller files. Setting frequency to low sends logs in smaller quantities of larger files.

    - `"high"`

    - `"low"`

  - `kind: optional "" or "edge"`

    The kind parameter (optional) is used to differentiate between Logpush and Edge Log Delivery jobs (when supported by the dataset).

    - `""`

    - `"edge"`

  - `last_complete: optional string`

    Records the last time for which logs have been successfully pushed. If the last successful push was for logs range 2018-07-23T10:00:00Z to 2018-07-23T10:01:00Z then the value of this field will be 2018-07-23T10:01:00Z. If the job has never run or has just been enabled and hasn't run yet then the field will be empty.

  - `last_error: optional string`

    Records the last time the job failed. If not null, the job is currently. failing. If null, the job has either never failed or has run successfully at least once since last failure. See also the error_message field.

  - `logpull_options: optional string`

    This field is deprecated. Use `output_options` instead. Configuration string. It specifies things like requested fields and timestamp formats. If migrating from the logpull api, copy the url (full url or just the query string) of your call here, and logpush will keep on making this call for you, setting start and end times appropriately.

  - `max_upload_bytes: optional 0 or number`

    The maximum uncompressed file size of a batch of logs. This setting value must be between `5 MB` and `1 GB`, or `0` to disable it. Note that you cannot set a minimum file size; this means that log files may be much smaller than this batch size.

    - `0`

      The maximum uncompressed file size of a batch of logs. This setting value must be between `5 MB` and `1 GB`, or `0` to disable it. Note that you cannot set a minimum file size; this means that log files may be much smaller than this batch size.

      - `0`

    - `number`

  - `max_upload_interval_seconds: optional 0 or number`

    The maximum interval in seconds for log batches. This setting must be between 30 and 300 seconds (5 minutes), or `0` to disable it. Note that you cannot specify a minimum interval for log batches; this means that log files may be sent in shorter intervals than this.

    - `0`

      The maximum interval in seconds for log batches. This setting must be between 30 and 300 seconds (5 minutes), or `0` to disable it. Note that you cannot specify a minimum interval for log batches; this means that log files may be sent in shorter intervals than this.

      - `0`

    - `number`

  - `max_upload_records: optional 0 or number`

    The maximum number of log lines per batch. This setting must be between 1000 and 1,000,000 lines, or `0` to disable it. Note that you cannot specify a minimum number of log lines per batch; this means that log files may contain many fewer lines than this.

    - `0`

      The maximum number of log lines per batch. This setting must be between 1000 and 1,000,000 lines, or `0` to disable it. Note that you cannot specify a minimum number of log lines per batch; this means that log files may contain many fewer lines than this.

      - `0`

    - `number`

  - `name: optional string`

    Optional human readable job name. Not unique. Cloudflare suggests. that you set this to a meaningful string, like the domain name, to make it easier to identify your job.

  - `output_options: optional OutputOptions`

    The structured replacement for `logpull_options`. When including this field, the `logpull_option` field will be ignored.

    - `batch_prefix: optional string`

      String to be prepended before each batch.

    - `batch_suffix: optional string`

      String to be appended after each batch.

    - `"CVE-2021-44228": optional boolean`

      If set to true, will cause all occurrences of `${` in the generated files to be replaced with `x{`.

    - `field_delimiter: optional string`

      String to join fields. This field be ignored when `record_template` is set.

    - `field_names: optional array of string`

      List of field names to be included in the Logpush output. For the moment, there is no option to add all fields at once, so you must specify all the fields names you are interested in.

    - `merge_subrequests: optional boolean`

      If set to true, subrequests will be merged into the parent request. Only supported for the `http_requests` dataset.

    - `output_type: optional "ndjson" or "csv"`

      Specifies the output type, such as `ndjson` or `csv`. This sets default values for the rest of the settings, depending on the chosen output type. Some formatting rules, like string quoting, are different between output types.

      - `"ndjson"`

      - `"csv"`

    - `record_delimiter: optional string`

      String to be inserted in-between the records as separator.

    - `record_prefix: optional string`

      String to be prepended before each record.

    - `record_suffix: optional string`

      String to be appended after each record.

    - `record_template: optional string`

      String to use as template for each record instead of the default json key value mapping. All fields used in the template must be present in `field_names` as well, otherwise they will end up as null. Format as a Go `text/template` without any standard functions, like conditionals, loops, sub-templates, etc.

    - `sample_rate: optional number`

      Floating number to specify sampling rate. Sampling is applied on top of filtering, and regardless of the current `sample_interval` of the data.

    - `timestamp_format: optional "unixnano" or "unix" or "rfc3339" or 2 more`

      String to specify the format for timestamps, such as `unixnano`, `unix`, `rfc3339`, `rfc3339ms` or `rfc3339ns`.

      - `"unixnano"`

      - `"unix"`

      - `"rfc3339"`

      - `"rfc3339ms"`

      - `"rfc3339ns"`

### Example

```http
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/logpush/jobs \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [],
  "messages": [],
  "result": [
    {
      "dataset": "gateway_dns",
      "destination_conf": "s3://mybucket/logs?region=us-west-2",
      "enabled": false,
      "error_message": null,
      "filter": "{\"where\":{\"and\":[{\"key\":\"ClientRequestPath\",\"operator\":\"contains\",\"value\":\"/static\"},{\"key\":\"ClientRequestHost\",\"operator\":\"eq\",\"value\":\"example.com\"}]}}",
      "id": 1,
      "kind": "",
      "last_complete": null,
      "last_error": null,
      "max_upload_bytes": 5000000,
      "max_upload_interval_seconds": 30,
      "max_upload_records": 1000,
      "name": "example.com",
      "output_options": {
        "CVE-2021-44228": false,
        "batch_prefix": "",
        "batch_suffix": "",
        "field_delimiter": ",",
        "field_names": [
          "Datetime",
          "DstIP",
          "SrcIP"
        ],
        "output_type": "ndjson",
        "record_delimiter": "",
        "record_prefix": "{",
        "record_suffix": "}\n",
        "sample_rate": 1,
        "timestamp_format": "unixnano"
      }
    }
  ],
  "success": true
}
```

## Get Logpush job details

**get** `/{accounts_or_zones}/{account_or_zone_id}/logpush/jobs/{job_id}`

Gets the details of a Logpush job.

### Path Parameters

- `job_id: number`

  Unique id of the job.

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

- `result: optional LogpushJob`

  - `id: optional number`

    Unique id of the job.

  - `dataset: optional "access_requests" or "audit_logs" or "audit_logs_v2" or 32 more`

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

  - `destination_conf: optional string`

    Uniquely identifies a resource (such as an s3 bucket) where data. will be pushed. Additional configuration parameters supported by the destination may be included.

  - `enabled: optional boolean`

    Flag that indicates if the job is enabled.

  - `error_message: optional string`

    If not null, the job is currently failing. Failures are usually. repetitive (example: no permissions to write to destination bucket). Only the last failure is recorded. On successful execution of a job the error_message and last_error are set to null.

  - `frequency: optional "high" or "low"`

    This field is deprecated. Please use `max_upload_*` parameters instead. . The frequency at which Cloudflare sends batches of logs to your destination. Setting frequency to high sends your logs in larger quantities of smaller files. Setting frequency to low sends logs in smaller quantities of larger files.

    - `"high"`

    - `"low"`

  - `kind: optional "" or "edge"`

    The kind parameter (optional) is used to differentiate between Logpush and Edge Log Delivery jobs (when supported by the dataset).

    - `""`

    - `"edge"`

  - `last_complete: optional string`

    Records the last time for which logs have been successfully pushed. If the last successful push was for logs range 2018-07-23T10:00:00Z to 2018-07-23T10:01:00Z then the value of this field will be 2018-07-23T10:01:00Z. If the job has never run or has just been enabled and hasn't run yet then the field will be empty.

  - `last_error: optional string`

    Records the last time the job failed. If not null, the job is currently. failing. If null, the job has either never failed or has run successfully at least once since last failure. See also the error_message field.

  - `logpull_options: optional string`

    This field is deprecated. Use `output_options` instead. Configuration string. It specifies things like requested fields and timestamp formats. If migrating from the logpull api, copy the url (full url or just the query string) of your call here, and logpush will keep on making this call for you, setting start and end times appropriately.

  - `max_upload_bytes: optional 0 or number`

    The maximum uncompressed file size of a batch of logs. This setting value must be between `5 MB` and `1 GB`, or `0` to disable it. Note that you cannot set a minimum file size; this means that log files may be much smaller than this batch size.

    - `0`

      The maximum uncompressed file size of a batch of logs. This setting value must be between `5 MB` and `1 GB`, or `0` to disable it. Note that you cannot set a minimum file size; this means that log files may be much smaller than this batch size.

      - `0`

    - `number`

  - `max_upload_interval_seconds: optional 0 or number`

    The maximum interval in seconds for log batches. This setting must be between 30 and 300 seconds (5 minutes), or `0` to disable it. Note that you cannot specify a minimum interval for log batches; this means that log files may be sent in shorter intervals than this.

    - `0`

      The maximum interval in seconds for log batches. This setting must be between 30 and 300 seconds (5 minutes), or `0` to disable it. Note that you cannot specify a minimum interval for log batches; this means that log files may be sent in shorter intervals than this.

      - `0`

    - `number`

  - `max_upload_records: optional 0 or number`

    The maximum number of log lines per batch. This setting must be between 1000 and 1,000,000 lines, or `0` to disable it. Note that you cannot specify a minimum number of log lines per batch; this means that log files may contain many fewer lines than this.

    - `0`

      The maximum number of log lines per batch. This setting must be between 1000 and 1,000,000 lines, or `0` to disable it. Note that you cannot specify a minimum number of log lines per batch; this means that log files may contain many fewer lines than this.

      - `0`

    - `number`

  - `name: optional string`

    Optional human readable job name. Not unique. Cloudflare suggests. that you set this to a meaningful string, like the domain name, to make it easier to identify your job.

  - `output_options: optional OutputOptions`

    The structured replacement for `logpull_options`. When including this field, the `logpull_option` field will be ignored.

    - `batch_prefix: optional string`

      String to be prepended before each batch.

    - `batch_suffix: optional string`

      String to be appended after each batch.

    - `"CVE-2021-44228": optional boolean`

      If set to true, will cause all occurrences of `${` in the generated files to be replaced with `x{`.

    - `field_delimiter: optional string`

      String to join fields. This field be ignored when `record_template` is set.

    - `field_names: optional array of string`

      List of field names to be included in the Logpush output. For the moment, there is no option to add all fields at once, so you must specify all the fields names you are interested in.

    - `merge_subrequests: optional boolean`

      If set to true, subrequests will be merged into the parent request. Only supported for the `http_requests` dataset.

    - `output_type: optional "ndjson" or "csv"`

      Specifies the output type, such as `ndjson` or `csv`. This sets default values for the rest of the settings, depending on the chosen output type. Some formatting rules, like string quoting, are different between output types.

      - `"ndjson"`

      - `"csv"`

    - `record_delimiter: optional string`

      String to be inserted in-between the records as separator.

    - `record_prefix: optional string`

      String to be prepended before each record.

    - `record_suffix: optional string`

      String to be appended after each record.

    - `record_template: optional string`

      String to use as template for each record instead of the default json key value mapping. All fields used in the template must be present in `field_names` as well, otherwise they will end up as null. Format as a Go `text/template` without any standard functions, like conditionals, loops, sub-templates, etc.

    - `sample_rate: optional number`

      Floating number to specify sampling rate. Sampling is applied on top of filtering, and regardless of the current `sample_interval` of the data.

    - `timestamp_format: optional "unixnano" or "unix" or "rfc3339" or 2 more`

      String to specify the format for timestamps, such as `unixnano`, `unix`, `rfc3339`, `rfc3339ms` or `rfc3339ns`.

      - `"unixnano"`

      - `"unix"`

      - `"rfc3339"`

      - `"rfc3339ms"`

      - `"rfc3339ns"`

### Example

```http
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/logpush/jobs/$JOB_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [],
  "messages": [],
  "result": {
    "dataset": "gateway_dns",
    "destination_conf": "s3://mybucket/logs?region=us-west-2",
    "enabled": false,
    "error_message": null,
    "filter": "{\"where\":{\"and\":[{\"key\":\"ClientRequestPath\",\"operator\":\"contains\",\"value\":\"/static\"},{\"key\":\"ClientRequestHost\",\"operator\":\"eq\",\"value\":\"example.com\"}]}}",
    "id": 1,
    "kind": "",
    "last_complete": null,
    "last_error": null,
    "max_upload_bytes": 5000000,
    "max_upload_interval_seconds": 30,
    "max_upload_records": 1000,
    "name": "example.com",
    "output_options": {
      "CVE-2021-44228": false,
      "batch_prefix": "",
      "batch_suffix": "",
      "field_delimiter": ",",
      "field_names": [
        "Datetime",
        "DstIP",
        "SrcIP"
      ],
      "output_type": "ndjson",
      "record_delimiter": "",
      "record_prefix": "{",
      "record_suffix": "}\n",
      "sample_rate": 1,
      "timestamp_format": "unixnano"
    }
  },
  "success": true
}
```

## Create Logpush job

**post** `/{accounts_or_zones}/{account_or_zone_id}/logpush/jobs`

Creates a new Logpush job for an account or zone.

### Path Parameters

- `account_id: optional string`

  The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

- `zone_id: optional string`

  The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

### Body Parameters

- `destination_conf: string`

  Uniquely identifies a resource (such as an s3 bucket) where data. will be pushed. Additional configuration parameters supported by the destination may be included.

- `dataset: optional "access_requests" or "audit_logs" or "audit_logs_v2" or 32 more`

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

- `enabled: optional boolean`

  Flag that indicates if the job is enabled.

- `filter: optional string`

  The filters to select the events to include and/or remove from your logs. For more information, refer to [Filters](https://developers.cloudflare.com/logs/reference/filters/).

- `frequency: optional "high" or "low"`

  This field is deprecated. Please use `max_upload_*` parameters instead. . The frequency at which Cloudflare sends batches of logs to your destination. Setting frequency to high sends your logs in larger quantities of smaller files. Setting frequency to low sends logs in smaller quantities of larger files.

  - `"high"`

  - `"low"`

- `kind: optional "" or "edge"`

  The kind parameter (optional) is used to differentiate between Logpush and Edge Log Delivery jobs (when supported by the dataset).

  - `""`

  - `"edge"`

- `logpull_options: optional string`

  This field is deprecated. Use `output_options` instead. Configuration string. It specifies things like requested fields and timestamp formats. If migrating from the logpull api, copy the url (full url or just the query string) of your call here, and logpush will keep on making this call for you, setting start and end times appropriately.

- `max_upload_bytes: optional 0 or number`

  The maximum uncompressed file size of a batch of logs. This setting value must be between `5 MB` and `1 GB`, or `0` to disable it. Note that you cannot set a minimum file size; this means that log files may be much smaller than this batch size.

  - `0`

    The maximum uncompressed file size of a batch of logs. This setting value must be between `5 MB` and `1 GB`, or `0` to disable it. Note that you cannot set a minimum file size; this means that log files may be much smaller than this batch size.

    - `0`

  - `number`

- `max_upload_interval_seconds: optional 0 or number`

  The maximum interval in seconds for log batches. This setting must be between 30 and 300 seconds (5 minutes), or `0` to disable it. Note that you cannot specify a minimum interval for log batches; this means that log files may be sent in shorter intervals than this.

  - `0`

    The maximum interval in seconds for log batches. This setting must be between 30 and 300 seconds (5 minutes), or `0` to disable it. Note that you cannot specify a minimum interval for log batches; this means that log files may be sent in shorter intervals than this.

    - `0`

  - `number`

- `max_upload_records: optional 0 or number`

  The maximum number of log lines per batch. This setting must be between 1000 and 1,000,000 lines, or `0` to disable it. Note that you cannot specify a minimum number of log lines per batch; this means that log files may contain many fewer lines than this.

  - `0`

    The maximum number of log lines per batch. This setting must be between 1000 and 1,000,000 lines, or `0` to disable it. Note that you cannot specify a minimum number of log lines per batch; this means that log files may contain many fewer lines than this.

    - `0`

  - `number`

- `name: optional string`

  Optional human readable job name. Not unique. Cloudflare suggests. that you set this to a meaningful string, like the domain name, to make it easier to identify your job.

- `output_options: optional OutputOptions`

  The structured replacement for `logpull_options`. When including this field, the `logpull_option` field will be ignored.

  - `batch_prefix: optional string`

    String to be prepended before each batch.

  - `batch_suffix: optional string`

    String to be appended after each batch.

  - `"CVE-2021-44228": optional boolean`

    If set to true, will cause all occurrences of `${` in the generated files to be replaced with `x{`.

  - `field_delimiter: optional string`

    String to join fields. This field be ignored when `record_template` is set.

  - `field_names: optional array of string`

    List of field names to be included in the Logpush output. For the moment, there is no option to add all fields at once, so you must specify all the fields names you are interested in.

  - `merge_subrequests: optional boolean`

    If set to true, subrequests will be merged into the parent request. Only supported for the `http_requests` dataset.

  - `output_type: optional "ndjson" or "csv"`

    Specifies the output type, such as `ndjson` or `csv`. This sets default values for the rest of the settings, depending on the chosen output type. Some formatting rules, like string quoting, are different between output types.

    - `"ndjson"`

    - `"csv"`

  - `record_delimiter: optional string`

    String to be inserted in-between the records as separator.

  - `record_prefix: optional string`

    String to be prepended before each record.

  - `record_suffix: optional string`

    String to be appended after each record.

  - `record_template: optional string`

    String to use as template for each record instead of the default json key value mapping. All fields used in the template must be present in `field_names` as well, otherwise they will end up as null. Format as a Go `text/template` without any standard functions, like conditionals, loops, sub-templates, etc.

  - `sample_rate: optional number`

    Floating number to specify sampling rate. Sampling is applied on top of filtering, and regardless of the current `sample_interval` of the data.

  - `timestamp_format: optional "unixnano" or "unix" or "rfc3339" or 2 more`

    String to specify the format for timestamps, such as `unixnano`, `unix`, `rfc3339`, `rfc3339ms` or `rfc3339ns`.

    - `"unixnano"`

    - `"unix"`

    - `"rfc3339"`

    - `"rfc3339ms"`

    - `"rfc3339ns"`

- `ownership_challenge: optional string`

  Ownership challenge token to prove destination ownership.

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

- `result: optional LogpushJob`

  - `id: optional number`

    Unique id of the job.

  - `dataset: optional "access_requests" or "audit_logs" or "audit_logs_v2" or 32 more`

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

  - `destination_conf: optional string`

    Uniquely identifies a resource (such as an s3 bucket) where data. will be pushed. Additional configuration parameters supported by the destination may be included.

  - `enabled: optional boolean`

    Flag that indicates if the job is enabled.

  - `error_message: optional string`

    If not null, the job is currently failing. Failures are usually. repetitive (example: no permissions to write to destination bucket). Only the last failure is recorded. On successful execution of a job the error_message and last_error are set to null.

  - `frequency: optional "high" or "low"`

    This field is deprecated. Please use `max_upload_*` parameters instead. . The frequency at which Cloudflare sends batches of logs to your destination. Setting frequency to high sends your logs in larger quantities of smaller files. Setting frequency to low sends logs in smaller quantities of larger files.

    - `"high"`

    - `"low"`

  - `kind: optional "" or "edge"`

    The kind parameter (optional) is used to differentiate between Logpush and Edge Log Delivery jobs (when supported by the dataset).

    - `""`

    - `"edge"`

  - `last_complete: optional string`

    Records the last time for which logs have been successfully pushed. If the last successful push was for logs range 2018-07-23T10:00:00Z to 2018-07-23T10:01:00Z then the value of this field will be 2018-07-23T10:01:00Z. If the job has never run or has just been enabled and hasn't run yet then the field will be empty.

  - `last_error: optional string`

    Records the last time the job failed. If not null, the job is currently. failing. If null, the job has either never failed or has run successfully at least once since last failure. See also the error_message field.

  - `logpull_options: optional string`

    This field is deprecated. Use `output_options` instead. Configuration string. It specifies things like requested fields and timestamp formats. If migrating from the logpull api, copy the url (full url or just the query string) of your call here, and logpush will keep on making this call for you, setting start and end times appropriately.

  - `max_upload_bytes: optional 0 or number`

    The maximum uncompressed file size of a batch of logs. This setting value must be between `5 MB` and `1 GB`, or `0` to disable it. Note that you cannot set a minimum file size; this means that log files may be much smaller than this batch size.

    - `0`

      The maximum uncompressed file size of a batch of logs. This setting value must be between `5 MB` and `1 GB`, or `0` to disable it. Note that you cannot set a minimum file size; this means that log files may be much smaller than this batch size.

      - `0`

    - `number`

  - `max_upload_interval_seconds: optional 0 or number`

    The maximum interval in seconds for log batches. This setting must be between 30 and 300 seconds (5 minutes), or `0` to disable it. Note that you cannot specify a minimum interval for log batches; this means that log files may be sent in shorter intervals than this.

    - `0`

      The maximum interval in seconds for log batches. This setting must be between 30 and 300 seconds (5 minutes), or `0` to disable it. Note that you cannot specify a minimum interval for log batches; this means that log files may be sent in shorter intervals than this.

      - `0`

    - `number`

  - `max_upload_records: optional 0 or number`

    The maximum number of log lines per batch. This setting must be between 1000 and 1,000,000 lines, or `0` to disable it. Note that you cannot specify a minimum number of log lines per batch; this means that log files may contain many fewer lines than this.

    - `0`

      The maximum number of log lines per batch. This setting must be between 1000 and 1,000,000 lines, or `0` to disable it. Note that you cannot specify a minimum number of log lines per batch; this means that log files may contain many fewer lines than this.

      - `0`

    - `number`

  - `name: optional string`

    Optional human readable job name. Not unique. Cloudflare suggests. that you set this to a meaningful string, like the domain name, to make it easier to identify your job.

  - `output_options: optional OutputOptions`

    The structured replacement for `logpull_options`. When including this field, the `logpull_option` field will be ignored.

    - `batch_prefix: optional string`

      String to be prepended before each batch.

    - `batch_suffix: optional string`

      String to be appended after each batch.

    - `"CVE-2021-44228": optional boolean`

      If set to true, will cause all occurrences of `${` in the generated files to be replaced with `x{`.

    - `field_delimiter: optional string`

      String to join fields. This field be ignored when `record_template` is set.

    - `field_names: optional array of string`

      List of field names to be included in the Logpush output. For the moment, there is no option to add all fields at once, so you must specify all the fields names you are interested in.

    - `merge_subrequests: optional boolean`

      If set to true, subrequests will be merged into the parent request. Only supported for the `http_requests` dataset.

    - `output_type: optional "ndjson" or "csv"`

      Specifies the output type, such as `ndjson` or `csv`. This sets default values for the rest of the settings, depending on the chosen output type. Some formatting rules, like string quoting, are different between output types.

      - `"ndjson"`

      - `"csv"`

    - `record_delimiter: optional string`

      String to be inserted in-between the records as separator.

    - `record_prefix: optional string`

      String to be prepended before each record.

    - `record_suffix: optional string`

      String to be appended after each record.

    - `record_template: optional string`

      String to use as template for each record instead of the default json key value mapping. All fields used in the template must be present in `field_names` as well, otherwise they will end up as null. Format as a Go `text/template` without any standard functions, like conditionals, loops, sub-templates, etc.

    - `sample_rate: optional number`

      Floating number to specify sampling rate. Sampling is applied on top of filtering, and regardless of the current `sample_interval` of the data.

    - `timestamp_format: optional "unixnano" or "unix" or "rfc3339" or 2 more`

      String to specify the format for timestamps, such as `unixnano`, `unix`, `rfc3339`, `rfc3339ms` or `rfc3339ns`.

      - `"unixnano"`

      - `"unix"`

      - `"rfc3339"`

      - `"rfc3339ms"`

      - `"rfc3339ns"`

### Example

```http
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/logpush/jobs \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "destination_conf": "s3://mybucket/logs?region=us-west-2",
          "dataset": "gateway_dns",
          "filter": "{\\"where\\":{\\"and\\":[{\\"key\\":\\"ClientRequestPath\\",\\"operator\\":\\"contains\\",\\"value\\":\\"/static\\"},{\\"key\\":\\"ClientRequestHost\\",\\"operator\\":\\"eq\\",\\"value\\":\\"example.com\\"}]}}",
          "frequency": "high",
          "logpull_options": "fields=RayID,ClientIP,EdgeStartTimestamp&timestamps=rfc3339",
          "max_upload_bytes": 5000000,
          "max_upload_interval_seconds": 30,
          "max_upload_records": 1000,
          "name": "example.com",
          "ownership_challenge": "00000000000000000000"
        }'
```

#### Response

```json
{
  "errors": [],
  "messages": [],
  "result": {
    "dataset": "gateway_dns",
    "destination_conf": "s3://mybucket/logs?region=us-west-2",
    "enabled": false,
    "error_message": null,
    "filter": "{\"where\":{\"and\":[{\"key\":\"ClientRequestPath\",\"operator\":\"contains\",\"value\":\"/static\"},{\"key\":\"ClientRequestHost\",\"operator\":\"eq\",\"value\":\"example.com\"}]}}",
    "id": 1,
    "kind": "",
    "last_complete": null,
    "last_error": null,
    "max_upload_bytes": 5000000,
    "max_upload_interval_seconds": 30,
    "max_upload_records": 1000,
    "name": "example.com",
    "output_options": {
      "CVE-2021-44228": false,
      "batch_prefix": "",
      "batch_suffix": "",
      "field_delimiter": ",",
      "field_names": [
        "Datetime",
        "DstIP",
        "SrcIP"
      ],
      "output_type": "ndjson",
      "record_delimiter": "",
      "record_prefix": "{",
      "record_suffix": "}\n",
      "sample_rate": 1,
      "timestamp_format": "unixnano"
    }
  },
  "success": true
}
```

## Update Logpush job

**put** `/{accounts_or_zones}/{account_or_zone_id}/logpush/jobs/{job_id}`

Updates a Logpush job.

### Path Parameters

- `job_id: number`

  Unique id of the job.

- `account_id: optional string`

  The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

- `zone_id: optional string`

  The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

### Body Parameters

- `destination_conf: optional string`

  Uniquely identifies a resource (such as an s3 bucket) where data. will be pushed. Additional configuration parameters supported by the destination may be included.

- `enabled: optional boolean`

  Flag that indicates if the job is enabled.

- `filter: optional string`

  The filters to select the events to include and/or remove from your logs. For more information, refer to [Filters](https://developers.cloudflare.com/logs/reference/filters/).

- `frequency: optional "high" or "low"`

  This field is deprecated. Please use `max_upload_*` parameters instead. . The frequency at which Cloudflare sends batches of logs to your destination. Setting frequency to high sends your logs in larger quantities of smaller files. Setting frequency to low sends logs in smaller quantities of larger files.

  - `"high"`

  - `"low"`

- `kind: optional "" or "edge"`

  The kind parameter (optional) is used to differentiate between Logpush and Edge Log Delivery jobs (when supported by the dataset).

  - `""`

  - `"edge"`

- `logpull_options: optional string`

  This field is deprecated. Use `output_options` instead. Configuration string. It specifies things like requested fields and timestamp formats. If migrating from the logpull api, copy the url (full url or just the query string) of your call here, and logpush will keep on making this call for you, setting start and end times appropriately.

- `max_upload_bytes: optional 0 or number`

  The maximum uncompressed file size of a batch of logs. This setting value must be between `5 MB` and `1 GB`, or `0` to disable it. Note that you cannot set a minimum file size; this means that log files may be much smaller than this batch size.

  - `0`

    The maximum uncompressed file size of a batch of logs. This setting value must be between `5 MB` and `1 GB`, or `0` to disable it. Note that you cannot set a minimum file size; this means that log files may be much smaller than this batch size.

    - `0`

  - `number`

- `max_upload_interval_seconds: optional 0 or number`

  The maximum interval in seconds for log batches. This setting must be between 30 and 300 seconds (5 minutes), or `0` to disable it. Note that you cannot specify a minimum interval for log batches; this means that log files may be sent in shorter intervals than this.

  - `0`

    The maximum interval in seconds for log batches. This setting must be between 30 and 300 seconds (5 minutes), or `0` to disable it. Note that you cannot specify a minimum interval for log batches; this means that log files may be sent in shorter intervals than this.

    - `0`

  - `number`

- `max_upload_records: optional 0 or number`

  The maximum number of log lines per batch. This setting must be between 1000 and 1,000,000 lines, or `0` to disable it. Note that you cannot specify a minimum number of log lines per batch; this means that log files may contain many fewer lines than this.

  - `0`

    The maximum number of log lines per batch. This setting must be between 1000 and 1,000,000 lines, or `0` to disable it. Note that you cannot specify a minimum number of log lines per batch; this means that log files may contain many fewer lines than this.

    - `0`

  - `number`

- `name: optional string`

  Optional human readable job name. Not unique. Cloudflare suggests. that you set this to a meaningful string, like the domain name, to make it easier to identify your job.

- `output_options: optional OutputOptions`

  The structured replacement for `logpull_options`. When including this field, the `logpull_option` field will be ignored.

  - `batch_prefix: optional string`

    String to be prepended before each batch.

  - `batch_suffix: optional string`

    String to be appended after each batch.

  - `"CVE-2021-44228": optional boolean`

    If set to true, will cause all occurrences of `${` in the generated files to be replaced with `x{`.

  - `field_delimiter: optional string`

    String to join fields. This field be ignored when `record_template` is set.

  - `field_names: optional array of string`

    List of field names to be included in the Logpush output. For the moment, there is no option to add all fields at once, so you must specify all the fields names you are interested in.

  - `merge_subrequests: optional boolean`

    If set to true, subrequests will be merged into the parent request. Only supported for the `http_requests` dataset.

  - `output_type: optional "ndjson" or "csv"`

    Specifies the output type, such as `ndjson` or `csv`. This sets default values for the rest of the settings, depending on the chosen output type. Some formatting rules, like string quoting, are different between output types.

    - `"ndjson"`

    - `"csv"`

  - `record_delimiter: optional string`

    String to be inserted in-between the records as separator.

  - `record_prefix: optional string`

    String to be prepended before each record.

  - `record_suffix: optional string`

    String to be appended after each record.

  - `record_template: optional string`

    String to use as template for each record instead of the default json key value mapping. All fields used in the template must be present in `field_names` as well, otherwise they will end up as null. Format as a Go `text/template` without any standard functions, like conditionals, loops, sub-templates, etc.

  - `sample_rate: optional number`

    Floating number to specify sampling rate. Sampling is applied on top of filtering, and regardless of the current `sample_interval` of the data.

  - `timestamp_format: optional "unixnano" or "unix" or "rfc3339" or 2 more`

    String to specify the format for timestamps, such as `unixnano`, `unix`, `rfc3339`, `rfc3339ms` or `rfc3339ns`.

    - `"unixnano"`

    - `"unix"`

    - `"rfc3339"`

    - `"rfc3339ms"`

    - `"rfc3339ns"`

- `ownership_challenge: optional string`

  Ownership challenge token to prove destination ownership.

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

- `result: optional LogpushJob`

  - `id: optional number`

    Unique id of the job.

  - `dataset: optional "access_requests" or "audit_logs" or "audit_logs_v2" or 32 more`

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

  - `destination_conf: optional string`

    Uniquely identifies a resource (such as an s3 bucket) where data. will be pushed. Additional configuration parameters supported by the destination may be included.

  - `enabled: optional boolean`

    Flag that indicates if the job is enabled.

  - `error_message: optional string`

    If not null, the job is currently failing. Failures are usually. repetitive (example: no permissions to write to destination bucket). Only the last failure is recorded. On successful execution of a job the error_message and last_error are set to null.

  - `frequency: optional "high" or "low"`

    This field is deprecated. Please use `max_upload_*` parameters instead. . The frequency at which Cloudflare sends batches of logs to your destination. Setting frequency to high sends your logs in larger quantities of smaller files. Setting frequency to low sends logs in smaller quantities of larger files.

    - `"high"`

    - `"low"`

  - `kind: optional "" or "edge"`

    The kind parameter (optional) is used to differentiate between Logpush and Edge Log Delivery jobs (when supported by the dataset).

    - `""`

    - `"edge"`

  - `last_complete: optional string`

    Records the last time for which logs have been successfully pushed. If the last successful push was for logs range 2018-07-23T10:00:00Z to 2018-07-23T10:01:00Z then the value of this field will be 2018-07-23T10:01:00Z. If the job has never run or has just been enabled and hasn't run yet then the field will be empty.

  - `last_error: optional string`

    Records the last time the job failed. If not null, the job is currently. failing. If null, the job has either never failed or has run successfully at least once since last failure. See also the error_message field.

  - `logpull_options: optional string`

    This field is deprecated. Use `output_options` instead. Configuration string. It specifies things like requested fields and timestamp formats. If migrating from the logpull api, copy the url (full url or just the query string) of your call here, and logpush will keep on making this call for you, setting start and end times appropriately.

  - `max_upload_bytes: optional 0 or number`

    The maximum uncompressed file size of a batch of logs. This setting value must be between `5 MB` and `1 GB`, or `0` to disable it. Note that you cannot set a minimum file size; this means that log files may be much smaller than this batch size.

    - `0`

      The maximum uncompressed file size of a batch of logs. This setting value must be between `5 MB` and `1 GB`, or `0` to disable it. Note that you cannot set a minimum file size; this means that log files may be much smaller than this batch size.

      - `0`

    - `number`

  - `max_upload_interval_seconds: optional 0 or number`

    The maximum interval in seconds for log batches. This setting must be between 30 and 300 seconds (5 minutes), or `0` to disable it. Note that you cannot specify a minimum interval for log batches; this means that log files may be sent in shorter intervals than this.

    - `0`

      The maximum interval in seconds for log batches. This setting must be between 30 and 300 seconds (5 minutes), or `0` to disable it. Note that you cannot specify a minimum interval for log batches; this means that log files may be sent in shorter intervals than this.

      - `0`

    - `number`

  - `max_upload_records: optional 0 or number`

    The maximum number of log lines per batch. This setting must be between 1000 and 1,000,000 lines, or `0` to disable it. Note that you cannot specify a minimum number of log lines per batch; this means that log files may contain many fewer lines than this.

    - `0`

      The maximum number of log lines per batch. This setting must be between 1000 and 1,000,000 lines, or `0` to disable it. Note that you cannot specify a minimum number of log lines per batch; this means that log files may contain many fewer lines than this.

      - `0`

    - `number`

  - `name: optional string`

    Optional human readable job name. Not unique. Cloudflare suggests. that you set this to a meaningful string, like the domain name, to make it easier to identify your job.

  - `output_options: optional OutputOptions`

    The structured replacement for `logpull_options`. When including this field, the `logpull_option` field will be ignored.

    - `batch_prefix: optional string`

      String to be prepended before each batch.

    - `batch_suffix: optional string`

      String to be appended after each batch.

    - `"CVE-2021-44228": optional boolean`

      If set to true, will cause all occurrences of `${` in the generated files to be replaced with `x{`.

    - `field_delimiter: optional string`

      String to join fields. This field be ignored when `record_template` is set.

    - `field_names: optional array of string`

      List of field names to be included in the Logpush output. For the moment, there is no option to add all fields at once, so you must specify all the fields names you are interested in.

    - `merge_subrequests: optional boolean`

      If set to true, subrequests will be merged into the parent request. Only supported for the `http_requests` dataset.

    - `output_type: optional "ndjson" or "csv"`

      Specifies the output type, such as `ndjson` or `csv`. This sets default values for the rest of the settings, depending on the chosen output type. Some formatting rules, like string quoting, are different between output types.

      - `"ndjson"`

      - `"csv"`

    - `record_delimiter: optional string`

      String to be inserted in-between the records as separator.

    - `record_prefix: optional string`

      String to be prepended before each record.

    - `record_suffix: optional string`

      String to be appended after each record.

    - `record_template: optional string`

      String to use as template for each record instead of the default json key value mapping. All fields used in the template must be present in `field_names` as well, otherwise they will end up as null. Format as a Go `text/template` without any standard functions, like conditionals, loops, sub-templates, etc.

    - `sample_rate: optional number`

      Floating number to specify sampling rate. Sampling is applied on top of filtering, and regardless of the current `sample_interval` of the data.

    - `timestamp_format: optional "unixnano" or "unix" or "rfc3339" or 2 more`

      String to specify the format for timestamps, such as `unixnano`, `unix`, `rfc3339`, `rfc3339ms` or `rfc3339ns`.

      - `"unixnano"`

      - `"unix"`

      - `"rfc3339"`

      - `"rfc3339ms"`

      - `"rfc3339ns"`

### Example

```http
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/logpush/jobs/$JOB_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "destination_conf": "s3://mybucket/logs?region=us-west-2",
          "filter": "{\\"where\\":{\\"and\\":[{\\"key\\":\\"ClientRequestPath\\",\\"operator\\":\\"contains\\",\\"value\\":\\"/static\\"},{\\"key\\":\\"ClientRequestHost\\",\\"operator\\":\\"eq\\",\\"value\\":\\"example.com\\"}]}}",
          "frequency": "high",
          "logpull_options": "fields=RayID,ClientIP,EdgeStartTimestamp&timestamps=rfc3339",
          "max_upload_bytes": 5000000,
          "max_upload_interval_seconds": 30,
          "max_upload_records": 1000,
          "name": "example.com",
          "ownership_challenge": "00000000000000000000"
        }'
```

#### Response

```json
{
  "errors": [],
  "messages": [],
  "result": {
    "dataset": "gateway_dns",
    "destination_conf": "s3://mybucket/logs?region=us-west-2",
    "enabled": false,
    "error_message": null,
    "filter": "{\"where\":{\"and\":[{\"key\":\"ClientRequestPath\",\"operator\":\"contains\",\"value\":\"/static\"},{\"key\":\"ClientRequestHost\",\"operator\":\"eq\",\"value\":\"example.com\"}]}}",
    "id": 1,
    "kind": "",
    "last_complete": null,
    "last_error": null,
    "max_upload_bytes": 5000000,
    "max_upload_interval_seconds": 30,
    "max_upload_records": 1000,
    "name": "example.com",
    "output_options": {
      "CVE-2021-44228": false,
      "batch_prefix": "",
      "batch_suffix": "",
      "field_delimiter": ",",
      "field_names": [
        "Datetime",
        "DstIP",
        "SrcIP"
      ],
      "output_type": "ndjson",
      "record_delimiter": "",
      "record_prefix": "{",
      "record_suffix": "}\n",
      "sample_rate": 1,
      "timestamp_format": "unixnano"
    }
  },
  "success": true
}
```

## Delete Logpush job

**delete** `/{accounts_or_zones}/{account_or_zone_id}/logpush/jobs/{job_id}`

Deletes a Logpush job.

### Path Parameters

- `job_id: number`

  Unique id of the job.

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

- `result: optional object { id }`

  - `id: optional number`

    Unique id of the job.

### Example

```http
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/logpush/jobs/$JOB_ID \
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
    "id": 1
  }
}
```

## Domain Types

### Logpush Job

- `LogpushJob object { id, dataset, destination_conf, 12 more }`

  - `id: optional number`

    Unique id of the job.

  - `dataset: optional "access_requests" or "audit_logs" or "audit_logs_v2" or 32 more`

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

  - `destination_conf: optional string`

    Uniquely identifies a resource (such as an s3 bucket) where data. will be pushed. Additional configuration parameters supported by the destination may be included.

  - `enabled: optional boolean`

    Flag that indicates if the job is enabled.

  - `error_message: optional string`

    If not null, the job is currently failing. Failures are usually. repetitive (example: no permissions to write to destination bucket). Only the last failure is recorded. On successful execution of a job the error_message and last_error are set to null.

  - `frequency: optional "high" or "low"`

    This field is deprecated. Please use `max_upload_*` parameters instead. . The frequency at which Cloudflare sends batches of logs to your destination. Setting frequency to high sends your logs in larger quantities of smaller files. Setting frequency to low sends logs in smaller quantities of larger files.

    - `"high"`

    - `"low"`

  - `kind: optional "" or "edge"`

    The kind parameter (optional) is used to differentiate between Logpush and Edge Log Delivery jobs (when supported by the dataset).

    - `""`

    - `"edge"`

  - `last_complete: optional string`

    Records the last time for which logs have been successfully pushed. If the last successful push was for logs range 2018-07-23T10:00:00Z to 2018-07-23T10:01:00Z then the value of this field will be 2018-07-23T10:01:00Z. If the job has never run or has just been enabled and hasn't run yet then the field will be empty.

  - `last_error: optional string`

    Records the last time the job failed. If not null, the job is currently. failing. If null, the job has either never failed or has run successfully at least once since last failure. See also the error_message field.

  - `logpull_options: optional string`

    This field is deprecated. Use `output_options` instead. Configuration string. It specifies things like requested fields and timestamp formats. If migrating from the logpull api, copy the url (full url or just the query string) of your call here, and logpush will keep on making this call for you, setting start and end times appropriately.

  - `max_upload_bytes: optional 0 or number`

    The maximum uncompressed file size of a batch of logs. This setting value must be between `5 MB` and `1 GB`, or `0` to disable it. Note that you cannot set a minimum file size; this means that log files may be much smaller than this batch size.

    - `0`

      The maximum uncompressed file size of a batch of logs. This setting value must be between `5 MB` and `1 GB`, or `0` to disable it. Note that you cannot set a minimum file size; this means that log files may be much smaller than this batch size.

      - `0`

    - `number`

  - `max_upload_interval_seconds: optional 0 or number`

    The maximum interval in seconds for log batches. This setting must be between 30 and 300 seconds (5 minutes), or `0` to disable it. Note that you cannot specify a minimum interval for log batches; this means that log files may be sent in shorter intervals than this.

    - `0`

      The maximum interval in seconds for log batches. This setting must be between 30 and 300 seconds (5 minutes), or `0` to disable it. Note that you cannot specify a minimum interval for log batches; this means that log files may be sent in shorter intervals than this.

      - `0`

    - `number`

  - `max_upload_records: optional 0 or number`

    The maximum number of log lines per batch. This setting must be between 1000 and 1,000,000 lines, or `0` to disable it. Note that you cannot specify a minimum number of log lines per batch; this means that log files may contain many fewer lines than this.

    - `0`

      The maximum number of log lines per batch. This setting must be between 1000 and 1,000,000 lines, or `0` to disable it. Note that you cannot specify a minimum number of log lines per batch; this means that log files may contain many fewer lines than this.

      - `0`

    - `number`

  - `name: optional string`

    Optional human readable job name. Not unique. Cloudflare suggests. that you set this to a meaningful string, like the domain name, to make it easier to identify your job.

  - `output_options: optional OutputOptions`

    The structured replacement for `logpull_options`. When including this field, the `logpull_option` field will be ignored.

    - `batch_prefix: optional string`

      String to be prepended before each batch.

    - `batch_suffix: optional string`

      String to be appended after each batch.

    - `"CVE-2021-44228": optional boolean`

      If set to true, will cause all occurrences of `${` in the generated files to be replaced with `x{`.

    - `field_delimiter: optional string`

      String to join fields. This field be ignored when `record_template` is set.

    - `field_names: optional array of string`

      List of field names to be included in the Logpush output. For the moment, there is no option to add all fields at once, so you must specify all the fields names you are interested in.

    - `merge_subrequests: optional boolean`

      If set to true, subrequests will be merged into the parent request. Only supported for the `http_requests` dataset.

    - `output_type: optional "ndjson" or "csv"`

      Specifies the output type, such as `ndjson` or `csv`. This sets default values for the rest of the settings, depending on the chosen output type. Some formatting rules, like string quoting, are different between output types.

      - `"ndjson"`

      - `"csv"`

    - `record_delimiter: optional string`

      String to be inserted in-between the records as separator.

    - `record_prefix: optional string`

      String to be prepended before each record.

    - `record_suffix: optional string`

      String to be appended after each record.

    - `record_template: optional string`

      String to use as template for each record instead of the default json key value mapping. All fields used in the template must be present in `field_names` as well, otherwise they will end up as null. Format as a Go `text/template` without any standard functions, like conditionals, loops, sub-templates, etc.

    - `sample_rate: optional number`

      Floating number to specify sampling rate. Sampling is applied on top of filtering, and regardless of the current `sample_interval` of the data.

    - `timestamp_format: optional "unixnano" or "unix" or "rfc3339" or 2 more`

      String to specify the format for timestamps, such as `unixnano`, `unix`, `rfc3339`, `rfc3339ms` or `rfc3339ns`.

      - `"unixnano"`

      - `"unix"`

      - `"rfc3339"`

      - `"rfc3339ms"`

      - `"rfc3339ns"`

### Output Options

- `OutputOptions object { batch_prefix, batch_suffix, "CVE-2021-44228", 10 more }`

  The structured replacement for `logpull_options`. When including this field, the `logpull_option` field will be ignored.

  - `batch_prefix: optional string`

    String to be prepended before each batch.

  - `batch_suffix: optional string`

    String to be appended after each batch.

  - `"CVE-2021-44228": optional boolean`

    If set to true, will cause all occurrences of `${` in the generated files to be replaced with `x{`.

  - `field_delimiter: optional string`

    String to join fields. This field be ignored when `record_template` is set.

  - `field_names: optional array of string`

    List of field names to be included in the Logpush output. For the moment, there is no option to add all fields at once, so you must specify all the fields names you are interested in.

  - `merge_subrequests: optional boolean`

    If set to true, subrequests will be merged into the parent request. Only supported for the `http_requests` dataset.

  - `output_type: optional "ndjson" or "csv"`

    Specifies the output type, such as `ndjson` or `csv`. This sets default values for the rest of the settings, depending on the chosen output type. Some formatting rules, like string quoting, are different between output types.

    - `"ndjson"`

    - `"csv"`

  - `record_delimiter: optional string`

    String to be inserted in-between the records as separator.

  - `record_prefix: optional string`

    String to be prepended before each record.

  - `record_suffix: optional string`

    String to be appended after each record.

  - `record_template: optional string`

    String to use as template for each record instead of the default json key value mapping. All fields used in the template must be present in `field_names` as well, otherwise they will end up as null. Format as a Go `text/template` without any standard functions, like conditionals, loops, sub-templates, etc.

  - `sample_rate: optional number`

    Floating number to specify sampling rate. Sampling is applied on top of filtering, and regardless of the current `sample_interval` of the data.

  - `timestamp_format: optional "unixnano" or "unix" or "rfc3339" or 2 more`

    String to specify the format for timestamps, such as `unixnano`, `unix`, `rfc3339`, `rfc3339ms` or `rfc3339ns`.

    - `"unixnano"`

    - `"unix"`

    - `"rfc3339"`

    - `"rfc3339ms"`

    - `"rfc3339ns"`

### Job Delete Response

- `JobDeleteResponse object { id }`

  - `id: optional number`

    Unique id of the job.

# Ownership

## Get ownership challenge

**post** `/{accounts_or_zones}/{account_or_zone_id}/logpush/ownership`

Gets a new ownership challenge sent to your destination.

### Path Parameters

- `account_id: optional string`

  The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

- `zone_id: optional string`

  The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

### Body Parameters

- `destination_conf: string`

  Uniquely identifies a resource (such as an s3 bucket) where data. will be pushed. Additional configuration parameters supported by the destination may be included.

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

- `result: optional object { filename, message, valid }`

  - `filename: optional string`

  - `message: optional string`

  - `valid: optional boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/logpush/ownership \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "destination_conf": "s3://mybucket/logs?region=us-west-2"
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
    "filename": "logs/challenge-filename.txt",
    "message": "",
    "valid": true
  }
}
```

## Validate ownership challenge

**post** `/{accounts_or_zones}/{account_or_zone_id}/logpush/ownership/validate`

Validates ownership challenge of the destination.

### Path Parameters

- `account_id: optional string`

  The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

- `zone_id: optional string`

  The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

### Body Parameters

- `destination_conf: string`

  Uniquely identifies a resource (such as an s3 bucket) where data. will be pushed. Additional configuration parameters supported by the destination may be included.

- `ownership_challenge: string`

  Ownership challenge token to prove destination ownership.

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

- `result: optional OwnershipValidation`

  - `valid: optional boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/logpush/ownership/validate \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "destination_conf": "s3://mybucket/logs?region=us-west-2",
          "ownership_challenge": "00000000000000000000"
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
    "valid": true
  }
}
```

## Domain Types

### Ownership Validation

- `OwnershipValidation object { valid }`

  - `valid: optional boolean`

### Ownership Create Response

- `OwnershipCreateResponse object { filename, message, valid }`

  - `filename: optional string`

  - `message: optional string`

  - `valid: optional boolean`

# Validate

## Validate destination

**post** `/{accounts_or_zones}/{account_or_zone_id}/logpush/validate/destination`

Validates destination.

### Path Parameters

- `account_id: optional string`

  The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

- `zone_id: optional string`

  The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

### Body Parameters

- `destination_conf: string`

  Uniquely identifies a resource (such as an s3 bucket) where data. will be pushed. Additional configuration parameters supported by the destination may be included.

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

- `result: optional object { message, valid }`

  - `message: optional string`

  - `valid: optional boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/logpush/validate/destination \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "destination_conf": "s3://mybucket/logs?region=us-west-2"
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
    "message": "",
    "valid": true
  }
}
```

## Check destination exists

**post** `/{accounts_or_zones}/{account_or_zone_id}/logpush/validate/destination/exists`

Checks if there is an existing job with a destination.

### Path Parameters

- `account_id: optional string`

  The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

- `zone_id: optional string`

  The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

### Body Parameters

- `destination_conf: string`

  Uniquely identifies a resource (such as an s3 bucket) where data. will be pushed. Additional configuration parameters supported by the destination may be included.

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

- `result: optional object { exists }`

  - `exists: optional boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/logpush/validate/destination/exists \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "destination_conf": "s3://mybucket/logs?region=us-west-2"
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
    "exists": false
  }
}
```

## Validate origin

**post** `/{accounts_or_zones}/{account_or_zone_id}/logpush/validate/origin`

Validates logpull origin with logpull_options.

### Path Parameters

- `account_id: optional string`

  The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

- `zone_id: optional string`

  The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

### Body Parameters

- `logpull_options: string`

  This field is deprecated. Use `output_options` instead. Configuration string. It specifies things like requested fields and timestamp formats. If migrating from the logpull api, copy the url (full url or just the query string) of your call here, and logpush will keep on making this call for you, setting start and end times appropriately.

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

- `result: optional object { message, valid }`

  - `message: optional string`

  - `valid: optional boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/logpush/validate/origin \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "logpull_options": "fields=RayID,ClientIP,EdgeStartTimestamp&timestamps=rfc3339"
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
    "message": "",
    "valid": true
  }
}
```

## Domain Types

### Validate Destination Response

- `ValidateDestinationResponse object { message, valid }`

  - `message: optional string`

  - `valid: optional boolean`

### Validate Destination Exists Response

- `ValidateDestinationExistsResponse object { exists }`

  - `exists: optional boolean`

### Validate Origin Response

- `ValidateOriginResponse object { message, valid }`

  - `message: optional string`

  - `valid: optional boolean`

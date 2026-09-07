## Patch Cloud Integration

**patch** `/accounts/{account_id}/magic/cloud/providers/{provider_id}`

Update a Cloud Integration (Closed Beta).

### Path Parameters

- `account_id: string`

- `provider_id: string`

### Body Parameters

- `aws_arn: optional string`

- `azure_subscription_id: optional string`

- `azure_tenant_id: optional string`

- `description: optional string`

- `friendly_name: optional string`

- `gcp_project_id: optional string`

- `gcp_service_account_email: optional string`

### Returns

- `errors: array of object { code, message, documentation_url, 2 more }`

  - `code: 1001 or 1002 or 1003 or 152 more`

    - `1001`

    - `1002`

    - `1003`

    - `1004`

    - `1005`

    - `1006`

    - `1007`

    - `1008`

    - `1009`

    - `1010`

    - `1011`

    - `1012`

    - `1013`

    - `1014`

    - `1015`

    - `1016`

    - `1017`

    - `1018`

    - `2001`

    - `2002`

    - `2003`

    - `2004`

    - `2005`

    - `2006`

    - `2007`

    - `2008`

    - `2009`

    - `2010`

    - `2011`

    - `2012`

    - `2013`

    - `2014`

    - `2015`

    - `2016`

    - `2017`

    - `2018`

    - `2019`

    - `2020`

    - `2021`

    - `2022`

    - `3001`

    - `3002`

    - `3003`

    - `3004`

    - `3005`

    - `3006`

    - `3007`

    - `4001`

    - `4002`

    - `4003`

    - `4004`

    - `4005`

    - `4006`

    - `4007`

    - `4008`

    - `4009`

    - `4010`

    - `4011`

    - `4012`

    - `4013`

    - `4014`

    - `4015`

    - `4016`

    - `4017`

    - `4018`

    - `4019`

    - `4020`

    - `4021`

    - `4022`

    - `4023`

    - `5001`

    - `5002`

    - `5003`

    - `5004`

    - `102000`

    - `102001`

    - `102002`

    - `102003`

    - `102004`

    - `102005`

    - `102006`

    - `102007`

    - `102008`

    - `102009`

    - `102010`

    - `102011`

    - `102012`

    - `102013`

    - `102014`

    - `102015`

    - `102016`

    - `102017`

    - `102018`

    - `102019`

    - `102020`

    - `102021`

    - `102022`

    - `102023`

    - `102024`

    - `102025`

    - `102026`

    - `102027`

    - `102028`

    - `102029`

    - `102030`

    - `102031`

    - `102032`

    - `102033`

    - `102034`

    - `102035`

    - `102036`

    - `102037`

    - `102038`

    - `102039`

    - `102040`

    - `102041`

    - `102042`

    - `102043`

    - `102044`

    - `102045`

    - `102046`

    - `102047`

    - `102048`

    - `102049`

    - `102050`

    - `102051`

    - `102052`

    - `102053`

    - `102054`

    - `102055`

    - `102056`

    - `102057`

    - `102058`

    - `102059`

    - `102060`

    - `102061`

    - `102062`

    - `102063`

    - `102064`

    - `102065`

    - `102066`

    - `102067`

    - `102068`

    - `102069`

    - `102070`

    - `102071`

    - `102072`

    - `103001`

    - `103002`

    - `103003`

    - `103004`

    - `103005`

    - `103006`

    - `103007`

    - `103008`

  - `message: string`

  - `documentation_url: optional string`

  - `meta: optional object { l10n_key, loggable_error, template_data, trace_id }`

    - `l10n_key: optional string`

    - `loggable_error: optional string`

    - `template_data: optional unknown`

    - `trace_id: optional string`

  - `source: optional object { parameter, parameter_value_index, pointer }`

    - `parameter: optional string`

    - `parameter_value_index: optional number`

    - `pointer: optional string`

- `messages: array of object { code, message, documentation_url, 2 more }`

  - `code: 1001 or 1002 or 1003 or 152 more`

    - `1001`

    - `1002`

    - `1003`

    - `1004`

    - `1005`

    - `1006`

    - `1007`

    - `1008`

    - `1009`

    - `1010`

    - `1011`

    - `1012`

    - `1013`

    - `1014`

    - `1015`

    - `1016`

    - `1017`

    - `1018`

    - `2001`

    - `2002`

    - `2003`

    - `2004`

    - `2005`

    - `2006`

    - `2007`

    - `2008`

    - `2009`

    - `2010`

    - `2011`

    - `2012`

    - `2013`

    - `2014`

    - `2015`

    - `2016`

    - `2017`

    - `2018`

    - `2019`

    - `2020`

    - `2021`

    - `2022`

    - `3001`

    - `3002`

    - `3003`

    - `3004`

    - `3005`

    - `3006`

    - `3007`

    - `4001`

    - `4002`

    - `4003`

    - `4004`

    - `4005`

    - `4006`

    - `4007`

    - `4008`

    - `4009`

    - `4010`

    - `4011`

    - `4012`

    - `4013`

    - `4014`

    - `4015`

    - `4016`

    - `4017`

    - `4018`

    - `4019`

    - `4020`

    - `4021`

    - `4022`

    - `4023`

    - `5001`

    - `5002`

    - `5003`

    - `5004`

    - `102000`

    - `102001`

    - `102002`

    - `102003`

    - `102004`

    - `102005`

    - `102006`

    - `102007`

    - `102008`

    - `102009`

    - `102010`

    - `102011`

    - `102012`

    - `102013`

    - `102014`

    - `102015`

    - `102016`

    - `102017`

    - `102018`

    - `102019`

    - `102020`

    - `102021`

    - `102022`

    - `102023`

    - `102024`

    - `102025`

    - `102026`

    - `102027`

    - `102028`

    - `102029`

    - `102030`

    - `102031`

    - `102032`

    - `102033`

    - `102034`

    - `102035`

    - `102036`

    - `102037`

    - `102038`

    - `102039`

    - `102040`

    - `102041`

    - `102042`

    - `102043`

    - `102044`

    - `102045`

    - `102046`

    - `102047`

    - `102048`

    - `102049`

    - `102050`

    - `102051`

    - `102052`

    - `102053`

    - `102054`

    - `102055`

    - `102056`

    - `102057`

    - `102058`

    - `102059`

    - `102060`

    - `102061`

    - `102062`

    - `102063`

    - `102064`

    - `102065`

    - `102066`

    - `102067`

    - `102068`

    - `102069`

    - `102070`

    - `102071`

    - `102072`

    - `103001`

    - `103002`

    - `103003`

    - `103004`

    - `103005`

    - `103006`

    - `103007`

    - `103008`

  - `message: string`

  - `documentation_url: optional string`

  - `meta: optional object { l10n_key, loggable_error, template_data, trace_id }`

    - `l10n_key: optional string`

    - `loggable_error: optional string`

    - `template_data: optional unknown`

    - `trace_id: optional string`

  - `source: optional object { parameter, parameter_value_index, pointer }`

    - `parameter: optional string`

    - `parameter_value_index: optional number`

    - `pointer: optional string`

- `result: object { id, cloud_type, friendly_name, 11 more }`

  - `id: string`

  - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

    - `"AWS"`

    - `"AZURE"`

    - `"GOOGLE"`

    - `"CLOUDFLARE"`

  - `friendly_name: string`

  - `last_updated: string`

  - `lifecycle_state: "ACTIVE" or "PENDING_SETUP" or "RETIRED"`

    - `"ACTIVE"`

    - `"PENDING_SETUP"`

    - `"RETIRED"`

  - `state: "UNSPECIFIED" or "PENDING" or "DISCOVERING" or 2 more`

    - `"UNSPECIFIED"`

    - `"PENDING"`

    - `"DISCOVERING"`

    - `"FAILED"`

    - `"SUCCEEDED"`

  - `state_v2: "UNSPECIFIED" or "PENDING" or "DISCOVERING" or 2 more`

    - `"UNSPECIFIED"`

    - `"PENDING"`

    - `"DISCOVERING"`

    - `"FAILED"`

    - `"SUCCEEDED"`

  - `aws_arn: optional string`

  - `azure_subscription_id: optional string`

  - `azure_tenant_id: optional string`

  - `description: optional string`

  - `gcp_project_id: optional string`

  - `gcp_service_account_email: optional string`

  - `status: optional object { discovery_progress, discovery_progress_v2, last_discovery_status, 13 more }`

    - `discovery_progress: object { done, total, unit }`

      - `done: number`

      - `total: number`

      - `unit: string`

    - `discovery_progress_v2: object { done, total, unit }`

      - `done: number`

      - `total: number`

      - `unit: string`

    - `last_discovery_status: "UNSPECIFIED" or "PENDING" or "DISCOVERING" or 2 more`

      - `"UNSPECIFIED"`

      - `"PENDING"`

      - `"DISCOVERING"`

      - `"FAILED"`

      - `"SUCCEEDED"`

    - `last_discovery_status_v2: "UNSPECIFIED" or "PENDING" or "DISCOVERING" or 2 more`

      - `"UNSPECIFIED"`

      - `"PENDING"`

      - `"DISCOVERING"`

      - `"FAILED"`

      - `"SUCCEEDED"`

    - `regions: array of string`

    - `credentials_good_since: optional string`

    - `credentials_missing_since: optional string`

    - `credentials_rejected_since: optional string`

    - `discovery_message: optional string`

    - `discovery_message_v2: optional string`

    - `in_use_by: optional array of object { id, client_type, name }`

      - `id: string`

      - `client_type: "MAGIC_WAN_CLOUD_ONRAMP"`

        - `"MAGIC_WAN_CLOUD_ONRAMP"`

      - `name: string`

    - `last_discovery_completed_at: optional string`

    - `last_discovery_completed_at_v2: optional string`

    - `last_discovery_started_at: optional string`

    - `last_discovery_started_at_v2: optional string`

    - `last_updated: optional string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/cloud/providers/$PROVIDER_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{}'
```

#### Response

```json
{
  "errors": [
    {
      "code": 1001,
      "message": "message",
      "documentation_url": "documentation_url",
      "meta": {
        "l10n_key": "l10n_key",
        "loggable_error": "loggable_error",
        "template_data": {},
        "trace_id": "trace_id"
      },
      "source": {
        "parameter": "parameter",
        "parameter_value_index": 0,
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1001,
      "message": "message",
      "documentation_url": "documentation_url",
      "meta": {
        "l10n_key": "l10n_key",
        "loggable_error": "loggable_error",
        "template_data": {},
        "trace_id": "trace_id"
      },
      "source": {
        "parameter": "parameter",
        "parameter_value_index": 0,
        "pointer": "pointer"
      }
    }
  ],
  "result": {
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "cloud_type": "AWS",
    "friendly_name": "friendly_name",
    "last_updated": "last_updated",
    "lifecycle_state": "ACTIVE",
    "state": "UNSPECIFIED",
    "state_v2": "UNSPECIFIED",
    "aws_arn": "aws_arn",
    "azure_subscription_id": "azure_subscription_id",
    "azure_tenant_id": "azure_tenant_id",
    "description": "description",
    "gcp_project_id": "gcp_project_id",
    "gcp_service_account_email": "gcp_service_account_email",
    "status": {
      "discovery_progress": {
        "done": 0,
        "total": 0,
        "unit": "unit"
      },
      "discovery_progress_v2": {
        "done": 0,
        "total": 0,
        "unit": "unit"
      },
      "last_discovery_status": "UNSPECIFIED",
      "last_discovery_status_v2": "UNSPECIFIED",
      "regions": [
        "string"
      ],
      "credentials_good_since": "credentials_good_since",
      "credentials_missing_since": "credentials_missing_since",
      "credentials_rejected_since": "credentials_rejected_since",
      "discovery_message": "discovery_message",
      "discovery_message_v2": "discovery_message_v2",
      "in_use_by": [
        {
          "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
          "client_type": "MAGIC_WAN_CLOUD_ONRAMP",
          "name": "name"
        }
      ],
      "last_discovery_completed_at": "last_discovery_completed_at",
      "last_discovery_completed_at_v2": "last_discovery_completed_at_v2",
      "last_discovery_started_at": "last_discovery_started_at",
      "last_discovery_started_at_v2": "last_discovery_started_at_v2",
      "last_updated": "last_updated"
    }
  },
  "success": true
}
```

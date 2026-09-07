# Magic Cloud Networking

# Catalog Syncs

## List Catalog Syncs

**get** `/accounts/{account_id}/magic/cloud/catalog-syncs`

List Catalog Syncs (Closed Beta).

### Path Parameters

- `account_id: string`

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

- `result: array of object { id, description, destination_id, 9 more }`

  - `id: string`

  - `description: string`

  - `destination_id: string`

  - `destination_type: "NONE" or "ZERO_TRUST_LIST"`

    - `"NONE"`

    - `"ZERO_TRUST_LIST"`

  - `last_user_update_at: string`

  - `name: string`

  - `policy: string`

  - `update_mode: "AUTO" or "MANUAL"`

    - `"AUTO"`

    - `"MANUAL"`

  - `errors: optional map[object { code, message, documentation_url, 2 more } ]`

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

  - `includes_discoveries_until: optional string`

  - `last_attempted_update_at: optional string`

  - `last_successful_update_at: optional string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/cloud/catalog-syncs \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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
  "result": [
    {
      "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "description": "description",
      "destination_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "destination_type": "NONE",
      "last_user_update_at": "last_user_update_at",
      "name": "name",
      "policy": "policy",
      "update_mode": "AUTO",
      "errors": {
        "foo": {
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
      },
      "includes_discoveries_until": "includes_discoveries_until",
      "last_attempted_update_at": "last_attempted_update_at",
      "last_successful_update_at": "last_successful_update_at"
    }
  ],
  "success": true
}
```

## Read Catalog Sync

**get** `/accounts/{account_id}/magic/cloud/catalog-syncs/{sync_id}`

Read a Catalog Sync (Closed Beta).

### Path Parameters

- `account_id: string`

- `sync_id: string`

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

- `result: object { id, description, destination_id, 9 more }`

  - `id: string`

  - `description: string`

  - `destination_id: string`

  - `destination_type: "NONE" or "ZERO_TRUST_LIST"`

    - `"NONE"`

    - `"ZERO_TRUST_LIST"`

  - `last_user_update_at: string`

  - `name: string`

  - `policy: string`

  - `update_mode: "AUTO" or "MANUAL"`

    - `"AUTO"`

    - `"MANUAL"`

  - `errors: optional map[object { code, message, documentation_url, 2 more } ]`

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

  - `includes_discoveries_until: optional string`

  - `last_attempted_update_at: optional string`

  - `last_successful_update_at: optional string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/cloud/catalog-syncs/$SYNC_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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
    "description": "description",
    "destination_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "destination_type": "NONE",
    "last_user_update_at": "last_user_update_at",
    "name": "name",
    "policy": "policy",
    "update_mode": "AUTO",
    "errors": {
      "foo": {
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
    },
    "includes_discoveries_until": "includes_discoveries_until",
    "last_attempted_update_at": "last_attempted_update_at",
    "last_successful_update_at": "last_successful_update_at"
  },
  "success": true
}
```

## Create Catalog Sync

**post** `/accounts/{account_id}/magic/cloud/catalog-syncs`

Create a new Catalog Sync (Closed Beta).

### Path Parameters

- `account_id: string`

### Header Parameters

- `forwarded: optional string`

### Body Parameters

- `destination_type: "NONE" or "ZERO_TRUST_LIST"`

  - `"NONE"`

  - `"ZERO_TRUST_LIST"`

- `name: string`

- `update_mode: "AUTO" or "MANUAL"`

  - `"AUTO"`

  - `"MANUAL"`

- `description: optional string`

- `policy: optional string`

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

- `result: object { id, description, destination_id, 9 more }`

  - `id: string`

  - `description: string`

  - `destination_id: string`

  - `destination_type: "NONE" or "ZERO_TRUST_LIST"`

    - `"NONE"`

    - `"ZERO_TRUST_LIST"`

  - `last_user_update_at: string`

  - `name: string`

  - `policy: string`

  - `update_mode: "AUTO" or "MANUAL"`

    - `"AUTO"`

    - `"MANUAL"`

  - `errors: optional map[object { code, message, documentation_url, 2 more } ]`

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

  - `includes_discoveries_until: optional string`

  - `last_attempted_update_at: optional string`

  - `last_successful_update_at: optional string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/cloud/catalog-syncs \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "destination_type": "NONE",
          "name": "name",
          "update_mode": "AUTO"
        }'
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
    "description": "description",
    "destination_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "destination_type": "NONE",
    "last_user_update_at": "last_user_update_at",
    "name": "name",
    "policy": "policy",
    "update_mode": "AUTO",
    "errors": {
      "foo": {
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
    },
    "includes_discoveries_until": "includes_discoveries_until",
    "last_attempted_update_at": "last_attempted_update_at",
    "last_successful_update_at": "last_successful_update_at"
  },
  "success": true
}
```

## Update Catalog Sync

**put** `/accounts/{account_id}/magic/cloud/catalog-syncs/{sync_id}`

Update a Catalog Sync (Closed Beta).

### Path Parameters

- `account_id: string`

- `sync_id: string`

### Body Parameters

- `description: optional string`

- `name: optional string`

- `policy: optional string`

- `update_mode: optional "AUTO" or "MANUAL"`

  - `"AUTO"`

  - `"MANUAL"`

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

- `result: object { id, description, destination_id, 9 more }`

  - `id: string`

  - `description: string`

  - `destination_id: string`

  - `destination_type: "NONE" or "ZERO_TRUST_LIST"`

    - `"NONE"`

    - `"ZERO_TRUST_LIST"`

  - `last_user_update_at: string`

  - `name: string`

  - `policy: string`

  - `update_mode: "AUTO" or "MANUAL"`

    - `"AUTO"`

    - `"MANUAL"`

  - `errors: optional map[object { code, message, documentation_url, 2 more } ]`

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

  - `includes_discoveries_until: optional string`

  - `last_attempted_update_at: optional string`

  - `last_successful_update_at: optional string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/cloud/catalog-syncs/$SYNC_ID \
    -X PUT \
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
    "description": "description",
    "destination_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "destination_type": "NONE",
    "last_user_update_at": "last_user_update_at",
    "name": "name",
    "policy": "policy",
    "update_mode": "AUTO",
    "errors": {
      "foo": {
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
    },
    "includes_discoveries_until": "includes_discoveries_until",
    "last_attempted_update_at": "last_attempted_update_at",
    "last_successful_update_at": "last_successful_update_at"
  },
  "success": true
}
```

## Patch Catalog Sync

**patch** `/accounts/{account_id}/magic/cloud/catalog-syncs/{sync_id}`

Update a Catalog Sync (Closed Beta).

### Path Parameters

- `account_id: string`

- `sync_id: string`

### Body Parameters

- `description: optional string`

- `name: optional string`

- `policy: optional string`

- `update_mode: optional "AUTO" or "MANUAL"`

  - `"AUTO"`

  - `"MANUAL"`

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

- `result: object { id, description, destination_id, 9 more }`

  - `id: string`

  - `description: string`

  - `destination_id: string`

  - `destination_type: "NONE" or "ZERO_TRUST_LIST"`

    - `"NONE"`

    - `"ZERO_TRUST_LIST"`

  - `last_user_update_at: string`

  - `name: string`

  - `policy: string`

  - `update_mode: "AUTO" or "MANUAL"`

    - `"AUTO"`

    - `"MANUAL"`

  - `errors: optional map[object { code, message, documentation_url, 2 more } ]`

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

  - `includes_discoveries_until: optional string`

  - `last_attempted_update_at: optional string`

  - `last_successful_update_at: optional string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/cloud/catalog-syncs/$SYNC_ID \
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
    "description": "description",
    "destination_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "destination_type": "NONE",
    "last_user_update_at": "last_user_update_at",
    "name": "name",
    "policy": "policy",
    "update_mode": "AUTO",
    "errors": {
      "foo": {
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
    },
    "includes_discoveries_until": "includes_discoveries_until",
    "last_attempted_update_at": "last_attempted_update_at",
    "last_successful_update_at": "last_successful_update_at"
  },
  "success": true
}
```

## Delete Catalog Sync

**delete** `/accounts/{account_id}/magic/cloud/catalog-syncs/{sync_id}`

Delete a Catalog Sync (Closed Beta).

### Path Parameters

- `account_id: string`

- `sync_id: string`

### Query Parameters

- `delete_destination: optional boolean`

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

- `result: object { id }`

  - `id: string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/cloud/catalog-syncs/$SYNC_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
  },
  "success": true
}
```

## Run Catalog Sync

**post** `/accounts/{account_id}/magic/cloud/catalog-syncs/{sync_id}/refresh`

Refresh a Catalog Sync's destination by running the sync policy against latest resource catalog (Closed Beta).

### Path Parameters

- `account_id: string`

- `sync_id: string`

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

- `result: string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/cloud/catalog-syncs/$SYNC_ID/refresh \
    -X POST \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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
  "result": "result",
  "success": true
}
```

## Domain Types

### Catalog Sync List Response

- `CatalogSyncListResponse object { id, description, destination_id, 9 more }`

  - `id: string`

  - `description: string`

  - `destination_id: string`

  - `destination_type: "NONE" or "ZERO_TRUST_LIST"`

    - `"NONE"`

    - `"ZERO_TRUST_LIST"`

  - `last_user_update_at: string`

  - `name: string`

  - `policy: string`

  - `update_mode: "AUTO" or "MANUAL"`

    - `"AUTO"`

    - `"MANUAL"`

  - `errors: optional map[object { code, message, documentation_url, 2 more } ]`

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

  - `includes_discoveries_until: optional string`

  - `last_attempted_update_at: optional string`

  - `last_successful_update_at: optional string`

### Catalog Sync Get Response

- `CatalogSyncGetResponse object { id, description, destination_id, 9 more }`

  - `id: string`

  - `description: string`

  - `destination_id: string`

  - `destination_type: "NONE" or "ZERO_TRUST_LIST"`

    - `"NONE"`

    - `"ZERO_TRUST_LIST"`

  - `last_user_update_at: string`

  - `name: string`

  - `policy: string`

  - `update_mode: "AUTO" or "MANUAL"`

    - `"AUTO"`

    - `"MANUAL"`

  - `errors: optional map[object { code, message, documentation_url, 2 more } ]`

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

  - `includes_discoveries_until: optional string`

  - `last_attempted_update_at: optional string`

  - `last_successful_update_at: optional string`

### Catalog Sync Create Response

- `CatalogSyncCreateResponse object { id, description, destination_id, 9 more }`

  - `id: string`

  - `description: string`

  - `destination_id: string`

  - `destination_type: "NONE" or "ZERO_TRUST_LIST"`

    - `"NONE"`

    - `"ZERO_TRUST_LIST"`

  - `last_user_update_at: string`

  - `name: string`

  - `policy: string`

  - `update_mode: "AUTO" or "MANUAL"`

    - `"AUTO"`

    - `"MANUAL"`

  - `errors: optional map[object { code, message, documentation_url, 2 more } ]`

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

  - `includes_discoveries_until: optional string`

  - `last_attempted_update_at: optional string`

  - `last_successful_update_at: optional string`

### Catalog Sync Update Response

- `CatalogSyncUpdateResponse object { id, description, destination_id, 9 more }`

  - `id: string`

  - `description: string`

  - `destination_id: string`

  - `destination_type: "NONE" or "ZERO_TRUST_LIST"`

    - `"NONE"`

    - `"ZERO_TRUST_LIST"`

  - `last_user_update_at: string`

  - `name: string`

  - `policy: string`

  - `update_mode: "AUTO" or "MANUAL"`

    - `"AUTO"`

    - `"MANUAL"`

  - `errors: optional map[object { code, message, documentation_url, 2 more } ]`

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

  - `includes_discoveries_until: optional string`

  - `last_attempted_update_at: optional string`

  - `last_successful_update_at: optional string`

### Catalog Sync Edit Response

- `CatalogSyncEditResponse object { id, description, destination_id, 9 more }`

  - `id: string`

  - `description: string`

  - `destination_id: string`

  - `destination_type: "NONE" or "ZERO_TRUST_LIST"`

    - `"NONE"`

    - `"ZERO_TRUST_LIST"`

  - `last_user_update_at: string`

  - `name: string`

  - `policy: string`

  - `update_mode: "AUTO" or "MANUAL"`

    - `"AUTO"`

    - `"MANUAL"`

  - `errors: optional map[object { code, message, documentation_url, 2 more } ]`

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

  - `includes_discoveries_until: optional string`

  - `last_attempted_update_at: optional string`

  - `last_successful_update_at: optional string`

### Catalog Sync Delete Response

- `CatalogSyncDeleteResponse object { id }`

  - `id: string`

### Catalog Sync Refresh Response

- `CatalogSyncRefreshResponse = string`

# Prebuilt Policies

## List Prebuilt Policies

**get** `/accounts/{account_id}/magic/cloud/catalog-syncs/prebuilt-policies`

List prebuilt catalog sync policies (Closed Beta).

### Path Parameters

- `account_id: string`

### Query Parameters

- `destination_type: optional "NONE" or "ZERO_TRUST_LIST"`

  Specify type of destination, omit to return all.

  - `"NONE"`

  - `"ZERO_TRUST_LIST"`

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

- `result: array of object { applicable_destinations, policy_description, policy_name, policy_string }`

  - `applicable_destinations: array of "NONE" or "ZERO_TRUST_LIST"`

    - `"NONE"`

    - `"ZERO_TRUST_LIST"`

  - `policy_description: string`

  - `policy_name: string`

  - `policy_string: string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/cloud/catalog-syncs/prebuilt-policies \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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
  "result": [
    {
      "applicable_destinations": [
        "NONE"
      ],
      "policy_description": "policy_description",
      "policy_name": "policy_name",
      "policy_string": "policy_string"
    }
  ],
  "success": true
}
```

## Domain Types

### Prebuilt Policy List Response

- `PrebuiltPolicyListResponse object { applicable_destinations, policy_description, policy_name, policy_string }`

  - `applicable_destinations: array of "NONE" or "ZERO_TRUST_LIST"`

    - `"NONE"`

    - `"ZERO_TRUST_LIST"`

  - `policy_description: string`

  - `policy_name: string`

  - `policy_string: string`

# On Ramps

## List On-ramps

**get** `/accounts/{account_id}/magic/cloud/onramps`

List On-ramps (Closed Beta).

### Path Parameters

- `account_id: string`

### Query Parameters

- `desc: optional boolean`

- `order_by: optional string`

  One of ["updated_at", "id", "cloud_type", "name"].

- `status: optional boolean`

- `vpcs: optional boolean`

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

- `result: array of object { id, cloud_type, dynamic_routing, 26 more }`

  - `id: string`

  - `cloud_type: "AWS" or "AZURE" or "GOOGLE"`

    - `"AWS"`

    - `"AZURE"`

    - `"GOOGLE"`

  - `dynamic_routing: boolean`

  - `install_routes_in_cloud: boolean`

  - `install_routes_in_magic_wan: boolean`

  - `name: string`

  - `type: "OnrampTypeSingle" or "OnrampTypeHub"`

    - `"OnrampTypeSingle"`

    - `"OnrampTypeHub"`

  - `updated_at: string`

  - `attached_hubs: optional array of string`

  - `attached_vpcs: optional array of string`

  - `cloud_asn: optional number`

  - `description: optional string`

  - `hub: optional string`

  - `last_applied_at: optional string`

  - `last_exported_at: optional string`

  - `last_planned_at: optional string`

  - `manage_hub_to_hub_attachments: optional boolean`

  - `manage_vpc_to_hub_attachments: optional boolean`

  - `planned_monthly_cost_estimate: optional object { currency, current_monthly_cost, diff, proposed_monthly_cost }`

    - `currency: string`

    - `current_monthly_cost: number`

    - `diff: number`

    - `proposed_monthly_cost: number`

  - `planned_resources: optional array of object { diff, keys_require_replace, monthly_cost_estimate_diff, 2 more }`

    - `diff: object { diff, left_description, left_yaml, 2 more }`

      - `diff: string`

      - `left_description: string`

      - `left_yaml: string`

      - `right_description: string`

      - `right_yaml: string`

    - `keys_require_replace: array of string`

    - `monthly_cost_estimate_diff: object { currency, current_monthly_cost, diff, proposed_monthly_cost }`

      - `currency: string`

      - `current_monthly_cost: number`

      - `diff: number`

      - `proposed_monthly_cost: number`

    - `planned_action: "no_op" or "create" or "update" or 2 more`

      - `"no_op"`

      - `"create"`

      - `"update"`

      - `"replace"`

      - `"destroy"`

    - `resource: object { id, cloud_type, detail, 3 more }`

      - `id: string`

      - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

        - `"AWS"`

        - `"AZURE"`

        - `"GOOGLE"`

        - `"CLOUDFLARE"`

      - `detail: string`

      - `name: string`

      - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

        - `"aws_customer_gateway"`

        - `"aws_egress_only_internet_gateway"`

        - `"aws_internet_gateway"`

        - `"aws_instance"`

        - `"aws_network_interface"`

        - `"aws_route"`

        - `"aws_route_table"`

        - `"aws_route_table_association"`

        - `"aws_subnet"`

        - `"aws_vpc"`

        - `"aws_vpc_ipv4_cidr_block_association"`

        - `"aws_vpn_connection"`

        - `"aws_vpn_connection_route"`

        - `"aws_vpn_gateway"`

        - `"aws_security_group"`

        - `"aws_vpc_security_group_ingress_rule"`

        - `"aws_vpc_security_group_egress_rule"`

        - `"aws_ec2_managed_prefix_list"`

        - `"aws_ec2_transit_gateway"`

        - `"aws_ec2_transit_gateway_prefix_list_reference"`

        - `"aws_ec2_transit_gateway_vpc_attachment"`

        - `"azurerm_application_security_group"`

        - `"azurerm_lb"`

        - `"azurerm_lb_backend_address_pool"`

        - `"azurerm_lb_nat_pool"`

        - `"azurerm_lb_nat_rule"`

        - `"azurerm_lb_rule"`

        - `"azurerm_local_network_gateway"`

        - `"azurerm_network_interface"`

        - `"azurerm_network_interface_application_security_group_association"`

        - `"azurerm_network_interface_backend_address_pool_association"`

        - `"azurerm_network_interface_security_group_association"`

        - `"azurerm_network_security_group"`

        - `"azurerm_public_ip"`

        - `"azurerm_route"`

        - `"azurerm_route_table"`

        - `"azurerm_subnet"`

        - `"azurerm_subnet_route_table_association"`

        - `"azurerm_virtual_machine"`

        - `"azurerm_virtual_network_gateway_connection"`

        - `"azurerm_virtual_network"`

        - `"azurerm_virtual_network_gateway"`

        - `"google_compute_network"`

        - `"google_compute_subnetwork"`

        - `"google_compute_vpn_gateway"`

        - `"google_compute_vpn_tunnel"`

        - `"google_compute_route"`

        - `"google_compute_address"`

        - `"google_compute_global_address"`

        - `"google_compute_router"`

        - `"google_compute_interconnect_attachment"`

        - `"google_compute_ha_vpn_gateway"`

        - `"google_compute_forwarding_rule"`

        - `"google_compute_network_firewall_policy"`

        - `"google_compute_network_firewall_policy_rule"`

        - `"cloudflare_static_route"`

        - `"cloudflare_ipsec_tunnel"`

      - `title: string`

  - `planned_resources_unavailable: optional boolean`

  - `post_apply_monthly_cost_estimate: optional object { currency, monthly_cost }`

    - `currency: string`

    - `monthly_cost: number`

  - `post_apply_resources: optional map[object { id, account_id, cloud_type, 18 more } ]`

    - `id: string`

    - `account_id: string`

    - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

      - `"AWS"`

      - `"AZURE"`

      - `"GOOGLE"`

      - `"CLOUDFLARE"`

    - `config: map[unknown]`

    - `deployment_provider: string`

    - `managed: boolean`

    - `monthly_cost_estimate: object { currency, monthly_cost }`

      - `currency: string`

      - `monthly_cost: number`

    - `name: string`

    - `native_id: string`

    - `observations: map[object { first_observed_at, last_observed_at, provider_id, resource_id } ]`

      - `first_observed_at: string`

      - `last_observed_at: string`

      - `provider_id: string`

      - `resource_id: string`

    - `provider_ids: array of string`

    - `provider_names_by_id: map[string]`

    - `region: string`

    - `resource_group: string`

    - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

      - `"aws_customer_gateway"`

      - `"aws_egress_only_internet_gateway"`

      - `"aws_internet_gateway"`

      - `"aws_instance"`

      - `"aws_network_interface"`

      - `"aws_route"`

      - `"aws_route_table"`

      - `"aws_route_table_association"`

      - `"aws_subnet"`

      - `"aws_vpc"`

      - `"aws_vpc_ipv4_cidr_block_association"`

      - `"aws_vpn_connection"`

      - `"aws_vpn_connection_route"`

      - `"aws_vpn_gateway"`

      - `"aws_security_group"`

      - `"aws_vpc_security_group_ingress_rule"`

      - `"aws_vpc_security_group_egress_rule"`

      - `"aws_ec2_managed_prefix_list"`

      - `"aws_ec2_transit_gateway"`

      - `"aws_ec2_transit_gateway_prefix_list_reference"`

      - `"aws_ec2_transit_gateway_vpc_attachment"`

      - `"azurerm_application_security_group"`

      - `"azurerm_lb"`

      - `"azurerm_lb_backend_address_pool"`

      - `"azurerm_lb_nat_pool"`

      - `"azurerm_lb_nat_rule"`

      - `"azurerm_lb_rule"`

      - `"azurerm_local_network_gateway"`

      - `"azurerm_network_interface"`

      - `"azurerm_network_interface_application_security_group_association"`

      - `"azurerm_network_interface_backend_address_pool_association"`

      - `"azurerm_network_interface_security_group_association"`

      - `"azurerm_network_security_group"`

      - `"azurerm_public_ip"`

      - `"azurerm_route"`

      - `"azurerm_route_table"`

      - `"azurerm_subnet"`

      - `"azurerm_subnet_route_table_association"`

      - `"azurerm_virtual_machine"`

      - `"azurerm_virtual_network_gateway_connection"`

      - `"azurerm_virtual_network"`

      - `"azurerm_virtual_network_gateway"`

      - `"google_compute_network"`

      - `"google_compute_subnetwork"`

      - `"google_compute_vpn_gateway"`

      - `"google_compute_vpn_tunnel"`

      - `"google_compute_route"`

      - `"google_compute_address"`

      - `"google_compute_global_address"`

      - `"google_compute_router"`

      - `"google_compute_interconnect_attachment"`

      - `"google_compute_ha_vpn_gateway"`

      - `"google_compute_forwarding_rule"`

      - `"google_compute_network_firewall_policy"`

      - `"google_compute_network_firewall_policy_rule"`

      - `"cloudflare_static_route"`

      - `"cloudflare_ipsec_tunnel"`

    - `sections: array of object { hidden_items, name, visible_items, help_text }`

      - `hidden_items: array of object { helpText, name, value }`

        - `helpText: optional string`

        - `name: optional string`

        - `value: optional object { item_type, string }  or object { item_type, yaml }  or object { item_type, yaml_diff }  or 2 more`

          - `McnStringItem object { item_type, string }`

            - `item_type: string`

            - `string: string`

          - `McnYamlItem object { item_type, yaml }`

            - `item_type: string`

            - `yaml: string`

          - `McnYamlDiffItem object { item_type, yaml_diff }`

            - `item_type: string`

            - `yaml_diff: object { diff, left_description, left_yaml, 2 more }`

              - `diff: string`

              - `left_description: string`

              - `left_yaml: string`

              - `right_description: string`

              - `right_yaml: string`

          - `McnResourcePreviewItem object { item_type, resource_preview }`

            - `item_type: string`

            - `resource_preview: object { id, cloud_type, detail, 3 more }`

              - `id: string`

              - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                - `"AWS"`

                - `"AZURE"`

                - `"GOOGLE"`

                - `"CLOUDFLARE"`

              - `detail: string`

              - `name: string`

              - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                - `"aws_customer_gateway"`

                - `"aws_egress_only_internet_gateway"`

                - `"aws_internet_gateway"`

                - `"aws_instance"`

                - `"aws_network_interface"`

                - `"aws_route"`

                - `"aws_route_table"`

                - `"aws_route_table_association"`

                - `"aws_subnet"`

                - `"aws_vpc"`

                - `"aws_vpc_ipv4_cidr_block_association"`

                - `"aws_vpn_connection"`

                - `"aws_vpn_connection_route"`

                - `"aws_vpn_gateway"`

                - `"aws_security_group"`

                - `"aws_vpc_security_group_ingress_rule"`

                - `"aws_vpc_security_group_egress_rule"`

                - `"aws_ec2_managed_prefix_list"`

                - `"aws_ec2_transit_gateway"`

                - `"aws_ec2_transit_gateway_prefix_list_reference"`

                - `"aws_ec2_transit_gateway_vpc_attachment"`

                - `"azurerm_application_security_group"`

                - `"azurerm_lb"`

                - `"azurerm_lb_backend_address_pool"`

                - `"azurerm_lb_nat_pool"`

                - `"azurerm_lb_nat_rule"`

                - `"azurerm_lb_rule"`

                - `"azurerm_local_network_gateway"`

                - `"azurerm_network_interface"`

                - `"azurerm_network_interface_application_security_group_association"`

                - `"azurerm_network_interface_backend_address_pool_association"`

                - `"azurerm_network_interface_security_group_association"`

                - `"azurerm_network_security_group"`

                - `"azurerm_public_ip"`

                - `"azurerm_route"`

                - `"azurerm_route_table"`

                - `"azurerm_subnet"`

                - `"azurerm_subnet_route_table_association"`

                - `"azurerm_virtual_machine"`

                - `"azurerm_virtual_network_gateway_connection"`

                - `"azurerm_virtual_network"`

                - `"azurerm_virtual_network_gateway"`

                - `"google_compute_network"`

                - `"google_compute_subnetwork"`

                - `"google_compute_vpn_gateway"`

                - `"google_compute_vpn_tunnel"`

                - `"google_compute_route"`

                - `"google_compute_address"`

                - `"google_compute_global_address"`

                - `"google_compute_router"`

                - `"google_compute_interconnect_attachment"`

                - `"google_compute_ha_vpn_gateway"`

                - `"google_compute_forwarding_rule"`

                - `"google_compute_network_firewall_policy"`

                - `"google_compute_network_firewall_policy_rule"`

                - `"cloudflare_static_route"`

                - `"cloudflare_ipsec_tunnel"`

              - `title: string`

          - `McnListItem object { item_type, list }`

            - `item_type: string`

            - `list: array of object { item_type, string }  or object { item_type, resource_preview }`

              - `McnStringItem object { item_type, string }`

                - `item_type: string`

                - `string: string`

              - `McnResourcePreviewItem object { item_type, resource_preview }`

                - `item_type: string`

                - `resource_preview: object { id, cloud_type, detail, 3 more }`

                  - `id: string`

                  - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                    - `"AWS"`

                    - `"AZURE"`

                    - `"GOOGLE"`

                    - `"CLOUDFLARE"`

                  - `detail: string`

                  - `name: string`

                  - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                    - `"aws_customer_gateway"`

                    - `"aws_egress_only_internet_gateway"`

                    - `"aws_internet_gateway"`

                    - `"aws_instance"`

                    - `"aws_network_interface"`

                    - `"aws_route"`

                    - `"aws_route_table"`

                    - `"aws_route_table_association"`

                    - `"aws_subnet"`

                    - `"aws_vpc"`

                    - `"aws_vpc_ipv4_cidr_block_association"`

                    - `"aws_vpn_connection"`

                    - `"aws_vpn_connection_route"`

                    - `"aws_vpn_gateway"`

                    - `"aws_security_group"`

                    - `"aws_vpc_security_group_ingress_rule"`

                    - `"aws_vpc_security_group_egress_rule"`

                    - `"aws_ec2_managed_prefix_list"`

                    - `"aws_ec2_transit_gateway"`

                    - `"aws_ec2_transit_gateway_prefix_list_reference"`

                    - `"aws_ec2_transit_gateway_vpc_attachment"`

                    - `"azurerm_application_security_group"`

                    - `"azurerm_lb"`

                    - `"azurerm_lb_backend_address_pool"`

                    - `"azurerm_lb_nat_pool"`

                    - `"azurerm_lb_nat_rule"`

                    - `"azurerm_lb_rule"`

                    - `"azurerm_local_network_gateway"`

                    - `"azurerm_network_interface"`

                    - `"azurerm_network_interface_application_security_group_association"`

                    - `"azurerm_network_interface_backend_address_pool_association"`

                    - `"azurerm_network_interface_security_group_association"`

                    - `"azurerm_network_security_group"`

                    - `"azurerm_public_ip"`

                    - `"azurerm_route"`

                    - `"azurerm_route_table"`

                    - `"azurerm_subnet"`

                    - `"azurerm_subnet_route_table_association"`

                    - `"azurerm_virtual_machine"`

                    - `"azurerm_virtual_network_gateway_connection"`

                    - `"azurerm_virtual_network"`

                    - `"azurerm_virtual_network_gateway"`

                    - `"google_compute_network"`

                    - `"google_compute_subnetwork"`

                    - `"google_compute_vpn_gateway"`

                    - `"google_compute_vpn_tunnel"`

                    - `"google_compute_route"`

                    - `"google_compute_address"`

                    - `"google_compute_global_address"`

                    - `"google_compute_router"`

                    - `"google_compute_interconnect_attachment"`

                    - `"google_compute_ha_vpn_gateway"`

                    - `"google_compute_forwarding_rule"`

                    - `"google_compute_network_firewall_policy"`

                    - `"google_compute_network_firewall_policy_rule"`

                    - `"cloudflare_static_route"`

                    - `"cloudflare_ipsec_tunnel"`

                  - `title: string`

      - `name: string`

      - `visible_items: array of object { helpText, name, value }`

        - `helpText: optional string`

        - `name: optional string`

        - `value: optional object { item_type, string }  or object { item_type, yaml }  or object { item_type, yaml_diff }  or 2 more`

          - `McnStringItem object { item_type, string }`

            - `item_type: string`

            - `string: string`

          - `McnYamlItem object { item_type, yaml }`

            - `item_type: string`

            - `yaml: string`

          - `McnYamlDiffItem object { item_type, yaml_diff }`

            - `item_type: string`

            - `yaml_diff: object { diff, left_description, left_yaml, 2 more }`

              - `diff: string`

              - `left_description: string`

              - `left_yaml: string`

              - `right_description: string`

              - `right_yaml: string`

          - `McnResourcePreviewItem object { item_type, resource_preview }`

            - `item_type: string`

            - `resource_preview: object { id, cloud_type, detail, 3 more }`

              - `id: string`

              - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                - `"AWS"`

                - `"AZURE"`

                - `"GOOGLE"`

                - `"CLOUDFLARE"`

              - `detail: string`

              - `name: string`

              - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                - `"aws_customer_gateway"`

                - `"aws_egress_only_internet_gateway"`

                - `"aws_internet_gateway"`

                - `"aws_instance"`

                - `"aws_network_interface"`

                - `"aws_route"`

                - `"aws_route_table"`

                - `"aws_route_table_association"`

                - `"aws_subnet"`

                - `"aws_vpc"`

                - `"aws_vpc_ipv4_cidr_block_association"`

                - `"aws_vpn_connection"`

                - `"aws_vpn_connection_route"`

                - `"aws_vpn_gateway"`

                - `"aws_security_group"`

                - `"aws_vpc_security_group_ingress_rule"`

                - `"aws_vpc_security_group_egress_rule"`

                - `"aws_ec2_managed_prefix_list"`

                - `"aws_ec2_transit_gateway"`

                - `"aws_ec2_transit_gateway_prefix_list_reference"`

                - `"aws_ec2_transit_gateway_vpc_attachment"`

                - `"azurerm_application_security_group"`

                - `"azurerm_lb"`

                - `"azurerm_lb_backend_address_pool"`

                - `"azurerm_lb_nat_pool"`

                - `"azurerm_lb_nat_rule"`

                - `"azurerm_lb_rule"`

                - `"azurerm_local_network_gateway"`

                - `"azurerm_network_interface"`

                - `"azurerm_network_interface_application_security_group_association"`

                - `"azurerm_network_interface_backend_address_pool_association"`

                - `"azurerm_network_interface_security_group_association"`

                - `"azurerm_network_security_group"`

                - `"azurerm_public_ip"`

                - `"azurerm_route"`

                - `"azurerm_route_table"`

                - `"azurerm_subnet"`

                - `"azurerm_subnet_route_table_association"`

                - `"azurerm_virtual_machine"`

                - `"azurerm_virtual_network_gateway_connection"`

                - `"azurerm_virtual_network"`

                - `"azurerm_virtual_network_gateway"`

                - `"google_compute_network"`

                - `"google_compute_subnetwork"`

                - `"google_compute_vpn_gateway"`

                - `"google_compute_vpn_tunnel"`

                - `"google_compute_route"`

                - `"google_compute_address"`

                - `"google_compute_global_address"`

                - `"google_compute_router"`

                - `"google_compute_interconnect_attachment"`

                - `"google_compute_ha_vpn_gateway"`

                - `"google_compute_forwarding_rule"`

                - `"google_compute_network_firewall_policy"`

                - `"google_compute_network_firewall_policy_rule"`

                - `"cloudflare_static_route"`

                - `"cloudflare_ipsec_tunnel"`

              - `title: string`

          - `McnListItem object { item_type, list }`

            - `item_type: string`

            - `list: array of object { item_type, string }  or object { item_type, resource_preview }`

              - `McnStringItem object { item_type, string }`

                - `item_type: string`

                - `string: string`

              - `McnResourcePreviewItem object { item_type, resource_preview }`

                - `item_type: string`

                - `resource_preview: object { id, cloud_type, detail, 3 more }`

                  - `id: string`

                  - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                    - `"AWS"`

                    - `"AZURE"`

                    - `"GOOGLE"`

                    - `"CLOUDFLARE"`

                  - `detail: string`

                  - `name: string`

                  - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                    - `"aws_customer_gateway"`

                    - `"aws_egress_only_internet_gateway"`

                    - `"aws_internet_gateway"`

                    - `"aws_instance"`

                    - `"aws_network_interface"`

                    - `"aws_route"`

                    - `"aws_route_table"`

                    - `"aws_route_table_association"`

                    - `"aws_subnet"`

                    - `"aws_vpc"`

                    - `"aws_vpc_ipv4_cidr_block_association"`

                    - `"aws_vpn_connection"`

                    - `"aws_vpn_connection_route"`

                    - `"aws_vpn_gateway"`

                    - `"aws_security_group"`

                    - `"aws_vpc_security_group_ingress_rule"`

                    - `"aws_vpc_security_group_egress_rule"`

                    - `"aws_ec2_managed_prefix_list"`

                    - `"aws_ec2_transit_gateway"`

                    - `"aws_ec2_transit_gateway_prefix_list_reference"`

                    - `"aws_ec2_transit_gateway_vpc_attachment"`

                    - `"azurerm_application_security_group"`

                    - `"azurerm_lb"`

                    - `"azurerm_lb_backend_address_pool"`

                    - `"azurerm_lb_nat_pool"`

                    - `"azurerm_lb_nat_rule"`

                    - `"azurerm_lb_rule"`

                    - `"azurerm_local_network_gateway"`

                    - `"azurerm_network_interface"`

                    - `"azurerm_network_interface_application_security_group_association"`

                    - `"azurerm_network_interface_backend_address_pool_association"`

                    - `"azurerm_network_interface_security_group_association"`

                    - `"azurerm_network_security_group"`

                    - `"azurerm_public_ip"`

                    - `"azurerm_route"`

                    - `"azurerm_route_table"`

                    - `"azurerm_subnet"`

                    - `"azurerm_subnet_route_table_association"`

                    - `"azurerm_virtual_machine"`

                    - `"azurerm_virtual_network_gateway_connection"`

                    - `"azurerm_virtual_network"`

                    - `"azurerm_virtual_network_gateway"`

                    - `"google_compute_network"`

                    - `"google_compute_subnetwork"`

                    - `"google_compute_vpn_gateway"`

                    - `"google_compute_vpn_tunnel"`

                    - `"google_compute_route"`

                    - `"google_compute_address"`

                    - `"google_compute_global_address"`

                    - `"google_compute_router"`

                    - `"google_compute_interconnect_attachment"`

                    - `"google_compute_ha_vpn_gateway"`

                    - `"google_compute_forwarding_rule"`

                    - `"google_compute_network_firewall_policy"`

                    - `"google_compute_network_firewall_policy_rule"`

                    - `"cloudflare_static_route"`

                    - `"cloudflare_ipsec_tunnel"`

                  - `title: string`

      - `help_text: optional string`

    - `state: map[unknown]`

    - `tags: map[string]`

    - `updated_at: string`

    - `url: string`

    - `managed_by: optional array of object { id, client_type, name }`

      - `id: string`

      - `client_type: "MAGIC_WAN_CLOUD_ONRAMP"`

        - `"MAGIC_WAN_CLOUD_ONRAMP"`

      - `name: string`

  - `post_apply_resources_unavailable: optional boolean`

  - `region: optional string`

  - `status: optional object { apply_progress, lifecycle_state, plan_progress, 3 more }`

    - `apply_progress: object { done, total }`

      - `done: number`

      - `total: number`

    - `lifecycle_state: "OnrampNeedsApply" or "OnrampPendingPlan" or "OnrampPlanning" or 9 more`

      - `"OnrampNeedsApply"`

      - `"OnrampPendingPlan"`

      - `"OnrampPlanning"`

      - `"OnrampPlanFailed"`

      - `"OnrampPendingApproval"`

      - `"OnrampPendingApply"`

      - `"OnrampApplying"`

      - `"OnrampApplyFailed"`

      - `"OnrampActive"`

      - `"OnrampPendingDestroy"`

      - `"OnrampDestroying"`

      - `"OnrampDestroyFailed"`

    - `plan_progress: object { done, total }`

      - `done: number`

      - `total: number`

    - `routes: array of string`

    - `tunnels: array of string`

    - `lifecycle_errors: optional map[object { code, message, documentation_url, 2 more } ]`

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

  - `vpc: optional string`

  - `vpcs_by_id: optional map[object { id, account_id, cloud_type, 18 more } ]`

    - `id: string`

    - `account_id: string`

    - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

      - `"AWS"`

      - `"AZURE"`

      - `"GOOGLE"`

      - `"CLOUDFLARE"`

    - `config: map[unknown]`

    - `deployment_provider: string`

    - `managed: boolean`

    - `monthly_cost_estimate: object { currency, monthly_cost }`

      - `currency: string`

      - `monthly_cost: number`

    - `name: string`

    - `native_id: string`

    - `observations: map[object { first_observed_at, last_observed_at, provider_id, resource_id } ]`

      - `first_observed_at: string`

      - `last_observed_at: string`

      - `provider_id: string`

      - `resource_id: string`

    - `provider_ids: array of string`

    - `provider_names_by_id: map[string]`

    - `region: string`

    - `resource_group: string`

    - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

      - `"aws_customer_gateway"`

      - `"aws_egress_only_internet_gateway"`

      - `"aws_internet_gateway"`

      - `"aws_instance"`

      - `"aws_network_interface"`

      - `"aws_route"`

      - `"aws_route_table"`

      - `"aws_route_table_association"`

      - `"aws_subnet"`

      - `"aws_vpc"`

      - `"aws_vpc_ipv4_cidr_block_association"`

      - `"aws_vpn_connection"`

      - `"aws_vpn_connection_route"`

      - `"aws_vpn_gateway"`

      - `"aws_security_group"`

      - `"aws_vpc_security_group_ingress_rule"`

      - `"aws_vpc_security_group_egress_rule"`

      - `"aws_ec2_managed_prefix_list"`

      - `"aws_ec2_transit_gateway"`

      - `"aws_ec2_transit_gateway_prefix_list_reference"`

      - `"aws_ec2_transit_gateway_vpc_attachment"`

      - `"azurerm_application_security_group"`

      - `"azurerm_lb"`

      - `"azurerm_lb_backend_address_pool"`

      - `"azurerm_lb_nat_pool"`

      - `"azurerm_lb_nat_rule"`

      - `"azurerm_lb_rule"`

      - `"azurerm_local_network_gateway"`

      - `"azurerm_network_interface"`

      - `"azurerm_network_interface_application_security_group_association"`

      - `"azurerm_network_interface_backend_address_pool_association"`

      - `"azurerm_network_interface_security_group_association"`

      - `"azurerm_network_security_group"`

      - `"azurerm_public_ip"`

      - `"azurerm_route"`

      - `"azurerm_route_table"`

      - `"azurerm_subnet"`

      - `"azurerm_subnet_route_table_association"`

      - `"azurerm_virtual_machine"`

      - `"azurerm_virtual_network_gateway_connection"`

      - `"azurerm_virtual_network"`

      - `"azurerm_virtual_network_gateway"`

      - `"google_compute_network"`

      - `"google_compute_subnetwork"`

      - `"google_compute_vpn_gateway"`

      - `"google_compute_vpn_tunnel"`

      - `"google_compute_route"`

      - `"google_compute_address"`

      - `"google_compute_global_address"`

      - `"google_compute_router"`

      - `"google_compute_interconnect_attachment"`

      - `"google_compute_ha_vpn_gateway"`

      - `"google_compute_forwarding_rule"`

      - `"google_compute_network_firewall_policy"`

      - `"google_compute_network_firewall_policy_rule"`

      - `"cloudflare_static_route"`

      - `"cloudflare_ipsec_tunnel"`

    - `sections: array of object { hidden_items, name, visible_items, help_text }`

      - `hidden_items: array of object { helpText, name, value }`

        - `helpText: optional string`

        - `name: optional string`

        - `value: optional object { item_type, string }  or object { item_type, yaml }  or object { item_type, yaml_diff }  or 2 more`

          - `McnStringItem object { item_type, string }`

            - `item_type: string`

            - `string: string`

          - `McnYamlItem object { item_type, yaml }`

            - `item_type: string`

            - `yaml: string`

          - `McnYamlDiffItem object { item_type, yaml_diff }`

            - `item_type: string`

            - `yaml_diff: object { diff, left_description, left_yaml, 2 more }`

              - `diff: string`

              - `left_description: string`

              - `left_yaml: string`

              - `right_description: string`

              - `right_yaml: string`

          - `McnResourcePreviewItem object { item_type, resource_preview }`

            - `item_type: string`

            - `resource_preview: object { id, cloud_type, detail, 3 more }`

              - `id: string`

              - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                - `"AWS"`

                - `"AZURE"`

                - `"GOOGLE"`

                - `"CLOUDFLARE"`

              - `detail: string`

              - `name: string`

              - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                - `"aws_customer_gateway"`

                - `"aws_egress_only_internet_gateway"`

                - `"aws_internet_gateway"`

                - `"aws_instance"`

                - `"aws_network_interface"`

                - `"aws_route"`

                - `"aws_route_table"`

                - `"aws_route_table_association"`

                - `"aws_subnet"`

                - `"aws_vpc"`

                - `"aws_vpc_ipv4_cidr_block_association"`

                - `"aws_vpn_connection"`

                - `"aws_vpn_connection_route"`

                - `"aws_vpn_gateway"`

                - `"aws_security_group"`

                - `"aws_vpc_security_group_ingress_rule"`

                - `"aws_vpc_security_group_egress_rule"`

                - `"aws_ec2_managed_prefix_list"`

                - `"aws_ec2_transit_gateway"`

                - `"aws_ec2_transit_gateway_prefix_list_reference"`

                - `"aws_ec2_transit_gateway_vpc_attachment"`

                - `"azurerm_application_security_group"`

                - `"azurerm_lb"`

                - `"azurerm_lb_backend_address_pool"`

                - `"azurerm_lb_nat_pool"`

                - `"azurerm_lb_nat_rule"`

                - `"azurerm_lb_rule"`

                - `"azurerm_local_network_gateway"`

                - `"azurerm_network_interface"`

                - `"azurerm_network_interface_application_security_group_association"`

                - `"azurerm_network_interface_backend_address_pool_association"`

                - `"azurerm_network_interface_security_group_association"`

                - `"azurerm_network_security_group"`

                - `"azurerm_public_ip"`

                - `"azurerm_route"`

                - `"azurerm_route_table"`

                - `"azurerm_subnet"`

                - `"azurerm_subnet_route_table_association"`

                - `"azurerm_virtual_machine"`

                - `"azurerm_virtual_network_gateway_connection"`

                - `"azurerm_virtual_network"`

                - `"azurerm_virtual_network_gateway"`

                - `"google_compute_network"`

                - `"google_compute_subnetwork"`

                - `"google_compute_vpn_gateway"`

                - `"google_compute_vpn_tunnel"`

                - `"google_compute_route"`

                - `"google_compute_address"`

                - `"google_compute_global_address"`

                - `"google_compute_router"`

                - `"google_compute_interconnect_attachment"`

                - `"google_compute_ha_vpn_gateway"`

                - `"google_compute_forwarding_rule"`

                - `"google_compute_network_firewall_policy"`

                - `"google_compute_network_firewall_policy_rule"`

                - `"cloudflare_static_route"`

                - `"cloudflare_ipsec_tunnel"`

              - `title: string`

          - `McnListItem object { item_type, list }`

            - `item_type: string`

            - `list: array of object { item_type, string }  or object { item_type, resource_preview }`

              - `McnStringItem object { item_type, string }`

                - `item_type: string`

                - `string: string`

              - `McnResourcePreviewItem object { item_type, resource_preview }`

                - `item_type: string`

                - `resource_preview: object { id, cloud_type, detail, 3 more }`

                  - `id: string`

                  - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                    - `"AWS"`

                    - `"AZURE"`

                    - `"GOOGLE"`

                    - `"CLOUDFLARE"`

                  - `detail: string`

                  - `name: string`

                  - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                    - `"aws_customer_gateway"`

                    - `"aws_egress_only_internet_gateway"`

                    - `"aws_internet_gateway"`

                    - `"aws_instance"`

                    - `"aws_network_interface"`

                    - `"aws_route"`

                    - `"aws_route_table"`

                    - `"aws_route_table_association"`

                    - `"aws_subnet"`

                    - `"aws_vpc"`

                    - `"aws_vpc_ipv4_cidr_block_association"`

                    - `"aws_vpn_connection"`

                    - `"aws_vpn_connection_route"`

                    - `"aws_vpn_gateway"`

                    - `"aws_security_group"`

                    - `"aws_vpc_security_group_ingress_rule"`

                    - `"aws_vpc_security_group_egress_rule"`

                    - `"aws_ec2_managed_prefix_list"`

                    - `"aws_ec2_transit_gateway"`

                    - `"aws_ec2_transit_gateway_prefix_list_reference"`

                    - `"aws_ec2_transit_gateway_vpc_attachment"`

                    - `"azurerm_application_security_group"`

                    - `"azurerm_lb"`

                    - `"azurerm_lb_backend_address_pool"`

                    - `"azurerm_lb_nat_pool"`

                    - `"azurerm_lb_nat_rule"`

                    - `"azurerm_lb_rule"`

                    - `"azurerm_local_network_gateway"`

                    - `"azurerm_network_interface"`

                    - `"azurerm_network_interface_application_security_group_association"`

                    - `"azurerm_network_interface_backend_address_pool_association"`

                    - `"azurerm_network_interface_security_group_association"`

                    - `"azurerm_network_security_group"`

                    - `"azurerm_public_ip"`

                    - `"azurerm_route"`

                    - `"azurerm_route_table"`

                    - `"azurerm_subnet"`

                    - `"azurerm_subnet_route_table_association"`

                    - `"azurerm_virtual_machine"`

                    - `"azurerm_virtual_network_gateway_connection"`

                    - `"azurerm_virtual_network"`

                    - `"azurerm_virtual_network_gateway"`

                    - `"google_compute_network"`

                    - `"google_compute_subnetwork"`

                    - `"google_compute_vpn_gateway"`

                    - `"google_compute_vpn_tunnel"`

                    - `"google_compute_route"`

                    - `"google_compute_address"`

                    - `"google_compute_global_address"`

                    - `"google_compute_router"`

                    - `"google_compute_interconnect_attachment"`

                    - `"google_compute_ha_vpn_gateway"`

                    - `"google_compute_forwarding_rule"`

                    - `"google_compute_network_firewall_policy"`

                    - `"google_compute_network_firewall_policy_rule"`

                    - `"cloudflare_static_route"`

                    - `"cloudflare_ipsec_tunnel"`

                  - `title: string`

      - `name: string`

      - `visible_items: array of object { helpText, name, value }`

        - `helpText: optional string`

        - `name: optional string`

        - `value: optional object { item_type, string }  or object { item_type, yaml }  or object { item_type, yaml_diff }  or 2 more`

          - `McnStringItem object { item_type, string }`

            - `item_type: string`

            - `string: string`

          - `McnYamlItem object { item_type, yaml }`

            - `item_type: string`

            - `yaml: string`

          - `McnYamlDiffItem object { item_type, yaml_diff }`

            - `item_type: string`

            - `yaml_diff: object { diff, left_description, left_yaml, 2 more }`

              - `diff: string`

              - `left_description: string`

              - `left_yaml: string`

              - `right_description: string`

              - `right_yaml: string`

          - `McnResourcePreviewItem object { item_type, resource_preview }`

            - `item_type: string`

            - `resource_preview: object { id, cloud_type, detail, 3 more }`

              - `id: string`

              - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                - `"AWS"`

                - `"AZURE"`

                - `"GOOGLE"`

                - `"CLOUDFLARE"`

              - `detail: string`

              - `name: string`

              - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                - `"aws_customer_gateway"`

                - `"aws_egress_only_internet_gateway"`

                - `"aws_internet_gateway"`

                - `"aws_instance"`

                - `"aws_network_interface"`

                - `"aws_route"`

                - `"aws_route_table"`

                - `"aws_route_table_association"`

                - `"aws_subnet"`

                - `"aws_vpc"`

                - `"aws_vpc_ipv4_cidr_block_association"`

                - `"aws_vpn_connection"`

                - `"aws_vpn_connection_route"`

                - `"aws_vpn_gateway"`

                - `"aws_security_group"`

                - `"aws_vpc_security_group_ingress_rule"`

                - `"aws_vpc_security_group_egress_rule"`

                - `"aws_ec2_managed_prefix_list"`

                - `"aws_ec2_transit_gateway"`

                - `"aws_ec2_transit_gateway_prefix_list_reference"`

                - `"aws_ec2_transit_gateway_vpc_attachment"`

                - `"azurerm_application_security_group"`

                - `"azurerm_lb"`

                - `"azurerm_lb_backend_address_pool"`

                - `"azurerm_lb_nat_pool"`

                - `"azurerm_lb_nat_rule"`

                - `"azurerm_lb_rule"`

                - `"azurerm_local_network_gateway"`

                - `"azurerm_network_interface"`

                - `"azurerm_network_interface_application_security_group_association"`

                - `"azurerm_network_interface_backend_address_pool_association"`

                - `"azurerm_network_interface_security_group_association"`

                - `"azurerm_network_security_group"`

                - `"azurerm_public_ip"`

                - `"azurerm_route"`

                - `"azurerm_route_table"`

                - `"azurerm_subnet"`

                - `"azurerm_subnet_route_table_association"`

                - `"azurerm_virtual_machine"`

                - `"azurerm_virtual_network_gateway_connection"`

                - `"azurerm_virtual_network"`

                - `"azurerm_virtual_network_gateway"`

                - `"google_compute_network"`

                - `"google_compute_subnetwork"`

                - `"google_compute_vpn_gateway"`

                - `"google_compute_vpn_tunnel"`

                - `"google_compute_route"`

                - `"google_compute_address"`

                - `"google_compute_global_address"`

                - `"google_compute_router"`

                - `"google_compute_interconnect_attachment"`

                - `"google_compute_ha_vpn_gateway"`

                - `"google_compute_forwarding_rule"`

                - `"google_compute_network_firewall_policy"`

                - `"google_compute_network_firewall_policy_rule"`

                - `"cloudflare_static_route"`

                - `"cloudflare_ipsec_tunnel"`

              - `title: string`

          - `McnListItem object { item_type, list }`

            - `item_type: string`

            - `list: array of object { item_type, string }  or object { item_type, resource_preview }`

              - `McnStringItem object { item_type, string }`

                - `item_type: string`

                - `string: string`

              - `McnResourcePreviewItem object { item_type, resource_preview }`

                - `item_type: string`

                - `resource_preview: object { id, cloud_type, detail, 3 more }`

                  - `id: string`

                  - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                    - `"AWS"`

                    - `"AZURE"`

                    - `"GOOGLE"`

                    - `"CLOUDFLARE"`

                  - `detail: string`

                  - `name: string`

                  - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                    - `"aws_customer_gateway"`

                    - `"aws_egress_only_internet_gateway"`

                    - `"aws_internet_gateway"`

                    - `"aws_instance"`

                    - `"aws_network_interface"`

                    - `"aws_route"`

                    - `"aws_route_table"`

                    - `"aws_route_table_association"`

                    - `"aws_subnet"`

                    - `"aws_vpc"`

                    - `"aws_vpc_ipv4_cidr_block_association"`

                    - `"aws_vpn_connection"`

                    - `"aws_vpn_connection_route"`

                    - `"aws_vpn_gateway"`

                    - `"aws_security_group"`

                    - `"aws_vpc_security_group_ingress_rule"`

                    - `"aws_vpc_security_group_egress_rule"`

                    - `"aws_ec2_managed_prefix_list"`

                    - `"aws_ec2_transit_gateway"`

                    - `"aws_ec2_transit_gateway_prefix_list_reference"`

                    - `"aws_ec2_transit_gateway_vpc_attachment"`

                    - `"azurerm_application_security_group"`

                    - `"azurerm_lb"`

                    - `"azurerm_lb_backend_address_pool"`

                    - `"azurerm_lb_nat_pool"`

                    - `"azurerm_lb_nat_rule"`

                    - `"azurerm_lb_rule"`

                    - `"azurerm_local_network_gateway"`

                    - `"azurerm_network_interface"`

                    - `"azurerm_network_interface_application_security_group_association"`

                    - `"azurerm_network_interface_backend_address_pool_association"`

                    - `"azurerm_network_interface_security_group_association"`

                    - `"azurerm_network_security_group"`

                    - `"azurerm_public_ip"`

                    - `"azurerm_route"`

                    - `"azurerm_route_table"`

                    - `"azurerm_subnet"`

                    - `"azurerm_subnet_route_table_association"`

                    - `"azurerm_virtual_machine"`

                    - `"azurerm_virtual_network_gateway_connection"`

                    - `"azurerm_virtual_network"`

                    - `"azurerm_virtual_network_gateway"`

                    - `"google_compute_network"`

                    - `"google_compute_subnetwork"`

                    - `"google_compute_vpn_gateway"`

                    - `"google_compute_vpn_tunnel"`

                    - `"google_compute_route"`

                    - `"google_compute_address"`

                    - `"google_compute_global_address"`

                    - `"google_compute_router"`

                    - `"google_compute_interconnect_attachment"`

                    - `"google_compute_ha_vpn_gateway"`

                    - `"google_compute_forwarding_rule"`

                    - `"google_compute_network_firewall_policy"`

                    - `"google_compute_network_firewall_policy_rule"`

                    - `"cloudflare_static_route"`

                    - `"cloudflare_ipsec_tunnel"`

                  - `title: string`

      - `help_text: optional string`

    - `state: map[unknown]`

    - `tags: map[string]`

    - `updated_at: string`

    - `url: string`

    - `managed_by: optional array of object { id, client_type, name }`

      - `id: string`

      - `client_type: "MAGIC_WAN_CLOUD_ONRAMP"`

        - `"MAGIC_WAN_CLOUD_ONRAMP"`

      - `name: string`

  - `vpcs_by_id_unavailable: optional array of string`

    The list of vpc IDs for which resource details failed to generate.

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/cloud/onramps \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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
  "result": [
    {
      "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "cloud_type": "AWS",
      "dynamic_routing": true,
      "install_routes_in_cloud": true,
      "install_routes_in_magic_wan": true,
      "name": "name",
      "type": "OnrampTypeSingle",
      "updated_at": "updated_at",
      "attached_hubs": [
        "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
      ],
      "attached_vpcs": [
        "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
      ],
      "cloud_asn": 0,
      "description": "description",
      "hub": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "last_applied_at": "last_applied_at",
      "last_exported_at": "last_exported_at",
      "last_planned_at": "last_planned_at",
      "manage_hub_to_hub_attachments": true,
      "manage_vpc_to_hub_attachments": true,
      "planned_monthly_cost_estimate": {
        "currency": "currency",
        "current_monthly_cost": 0,
        "diff": 0,
        "proposed_monthly_cost": 0
      },
      "planned_resources": [
        {
          "diff": {
            "diff": "diff",
            "left_description": "left_description",
            "left_yaml": "left_yaml",
            "right_description": "right_description",
            "right_yaml": "right_yaml"
          },
          "keys_require_replace": [
            "string"
          ],
          "monthly_cost_estimate_diff": {
            "currency": "currency",
            "current_monthly_cost": 0,
            "diff": 0,
            "proposed_monthly_cost": 0
          },
          "planned_action": "no_op",
          "resource": {
            "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
            "cloud_type": "AWS",
            "detail": "detail",
            "name": "name",
            "resource_type": "aws_customer_gateway",
            "title": "title"
          }
        }
      ],
      "planned_resources_unavailable": true,
      "post_apply_monthly_cost_estimate": {
        "currency": "currency",
        "monthly_cost": 0
      },
      "post_apply_resources": {
        "foo": {
          "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
          "account_id": "account_id",
          "cloud_type": "AWS",
          "config": {
            "foo": "bar"
          },
          "deployment_provider": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
          "managed": true,
          "monthly_cost_estimate": {
            "currency": "currency",
            "monthly_cost": 0
          },
          "name": "name",
          "native_id": "native_id",
          "observations": {
            "foo": {
              "first_observed_at": "first_observed_at",
              "last_observed_at": "last_observed_at",
              "provider_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
              "resource_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
            }
          },
          "provider_ids": [
            "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
          ],
          "provider_names_by_id": {
            "foo": "string"
          },
          "region": "region",
          "resource_group": "resource_group",
          "resource_type": "aws_customer_gateway",
          "sections": [
            {
              "hidden_items": [
                {
                  "helpText": "helpText",
                  "name": "name",
                  "value": {
                    "item_type": "item_type",
                    "string": "string"
                  }
                }
              ],
              "name": "name",
              "visible_items": [
                {
                  "helpText": "helpText",
                  "name": "name",
                  "value": {
                    "item_type": "item_type",
                    "string": "string"
                  }
                }
              ],
              "help_text": "help_text"
            }
          ],
          "state": {
            "foo": "bar"
          },
          "tags": {
            "foo": "string"
          },
          "updated_at": "updated_at",
          "url": "url",
          "managed_by": [
            {
              "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
              "client_type": "MAGIC_WAN_CLOUD_ONRAMP",
              "name": "name"
            }
          ]
        }
      },
      "post_apply_resources_unavailable": true,
      "region": "region",
      "status": {
        "apply_progress": {
          "done": 0,
          "total": 0
        },
        "lifecycle_state": "OnrampNeedsApply",
        "plan_progress": {
          "done": 0,
          "total": 0
        },
        "routes": [
          "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
        ],
        "tunnels": [
          "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
        ],
        "lifecycle_errors": {
          "foo": {
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
        }
      },
      "vpc": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "vpcs_by_id": {
        "foo": {
          "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
          "account_id": "account_id",
          "cloud_type": "AWS",
          "config": {
            "foo": "bar"
          },
          "deployment_provider": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
          "managed": true,
          "monthly_cost_estimate": {
            "currency": "currency",
            "monthly_cost": 0
          },
          "name": "name",
          "native_id": "native_id",
          "observations": {
            "foo": {
              "first_observed_at": "first_observed_at",
              "last_observed_at": "last_observed_at",
              "provider_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
              "resource_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
            }
          },
          "provider_ids": [
            "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
          ],
          "provider_names_by_id": {
            "foo": "string"
          },
          "region": "region",
          "resource_group": "resource_group",
          "resource_type": "aws_customer_gateway",
          "sections": [
            {
              "hidden_items": [
                {
                  "helpText": "helpText",
                  "name": "name",
                  "value": {
                    "item_type": "item_type",
                    "string": "string"
                  }
                }
              ],
              "name": "name",
              "visible_items": [
                {
                  "helpText": "helpText",
                  "name": "name",
                  "value": {
                    "item_type": "item_type",
                    "string": "string"
                  }
                }
              ],
              "help_text": "help_text"
            }
          ],
          "state": {
            "foo": "bar"
          },
          "tags": {
            "foo": "string"
          },
          "updated_at": "updated_at",
          "url": "url",
          "managed_by": [
            {
              "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
              "client_type": "MAGIC_WAN_CLOUD_ONRAMP",
              "name": "name"
            }
          ]
        }
      },
      "vpcs_by_id_unavailable": [
        "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
      ]
    }
  ],
  "success": true
}
```

## Read On-ramp

**get** `/accounts/{account_id}/magic/cloud/onramps/{onramp_id}`

Read an On-ramp (Closed Beta).

### Path Parameters

- `account_id: string`

- `onramp_id: string`

### Query Parameters

- `planned_resources: optional boolean`

- `post_apply_resources: optional boolean`

- `status: optional boolean`

- `vpcs: optional boolean`

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

- `result: object { id, cloud_type, dynamic_routing, 26 more }`

  - `id: string`

  - `cloud_type: "AWS" or "AZURE" or "GOOGLE"`

    - `"AWS"`

    - `"AZURE"`

    - `"GOOGLE"`

  - `dynamic_routing: boolean`

  - `install_routes_in_cloud: boolean`

  - `install_routes_in_magic_wan: boolean`

  - `name: string`

  - `type: "OnrampTypeSingle" or "OnrampTypeHub"`

    - `"OnrampTypeSingle"`

    - `"OnrampTypeHub"`

  - `updated_at: string`

  - `attached_hubs: optional array of string`

  - `attached_vpcs: optional array of string`

  - `cloud_asn: optional number`

  - `description: optional string`

  - `hub: optional string`

  - `last_applied_at: optional string`

  - `last_exported_at: optional string`

  - `last_planned_at: optional string`

  - `manage_hub_to_hub_attachments: optional boolean`

  - `manage_vpc_to_hub_attachments: optional boolean`

  - `planned_monthly_cost_estimate: optional object { currency, current_monthly_cost, diff, proposed_monthly_cost }`

    - `currency: string`

    - `current_monthly_cost: number`

    - `diff: number`

    - `proposed_monthly_cost: number`

  - `planned_resources: optional array of object { diff, keys_require_replace, monthly_cost_estimate_diff, 2 more }`

    - `diff: object { diff, left_description, left_yaml, 2 more }`

      - `diff: string`

      - `left_description: string`

      - `left_yaml: string`

      - `right_description: string`

      - `right_yaml: string`

    - `keys_require_replace: array of string`

    - `monthly_cost_estimate_diff: object { currency, current_monthly_cost, diff, proposed_monthly_cost }`

      - `currency: string`

      - `current_monthly_cost: number`

      - `diff: number`

      - `proposed_monthly_cost: number`

    - `planned_action: "no_op" or "create" or "update" or 2 more`

      - `"no_op"`

      - `"create"`

      - `"update"`

      - `"replace"`

      - `"destroy"`

    - `resource: object { id, cloud_type, detail, 3 more }`

      - `id: string`

      - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

        - `"AWS"`

        - `"AZURE"`

        - `"GOOGLE"`

        - `"CLOUDFLARE"`

      - `detail: string`

      - `name: string`

      - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

        - `"aws_customer_gateway"`

        - `"aws_egress_only_internet_gateway"`

        - `"aws_internet_gateway"`

        - `"aws_instance"`

        - `"aws_network_interface"`

        - `"aws_route"`

        - `"aws_route_table"`

        - `"aws_route_table_association"`

        - `"aws_subnet"`

        - `"aws_vpc"`

        - `"aws_vpc_ipv4_cidr_block_association"`

        - `"aws_vpn_connection"`

        - `"aws_vpn_connection_route"`

        - `"aws_vpn_gateway"`

        - `"aws_security_group"`

        - `"aws_vpc_security_group_ingress_rule"`

        - `"aws_vpc_security_group_egress_rule"`

        - `"aws_ec2_managed_prefix_list"`

        - `"aws_ec2_transit_gateway"`

        - `"aws_ec2_transit_gateway_prefix_list_reference"`

        - `"aws_ec2_transit_gateway_vpc_attachment"`

        - `"azurerm_application_security_group"`

        - `"azurerm_lb"`

        - `"azurerm_lb_backend_address_pool"`

        - `"azurerm_lb_nat_pool"`

        - `"azurerm_lb_nat_rule"`

        - `"azurerm_lb_rule"`

        - `"azurerm_local_network_gateway"`

        - `"azurerm_network_interface"`

        - `"azurerm_network_interface_application_security_group_association"`

        - `"azurerm_network_interface_backend_address_pool_association"`

        - `"azurerm_network_interface_security_group_association"`

        - `"azurerm_network_security_group"`

        - `"azurerm_public_ip"`

        - `"azurerm_route"`

        - `"azurerm_route_table"`

        - `"azurerm_subnet"`

        - `"azurerm_subnet_route_table_association"`

        - `"azurerm_virtual_machine"`

        - `"azurerm_virtual_network_gateway_connection"`

        - `"azurerm_virtual_network"`

        - `"azurerm_virtual_network_gateway"`

        - `"google_compute_network"`

        - `"google_compute_subnetwork"`

        - `"google_compute_vpn_gateway"`

        - `"google_compute_vpn_tunnel"`

        - `"google_compute_route"`

        - `"google_compute_address"`

        - `"google_compute_global_address"`

        - `"google_compute_router"`

        - `"google_compute_interconnect_attachment"`

        - `"google_compute_ha_vpn_gateway"`

        - `"google_compute_forwarding_rule"`

        - `"google_compute_network_firewall_policy"`

        - `"google_compute_network_firewall_policy_rule"`

        - `"cloudflare_static_route"`

        - `"cloudflare_ipsec_tunnel"`

      - `title: string`

  - `planned_resources_unavailable: optional boolean`

  - `post_apply_monthly_cost_estimate: optional object { currency, monthly_cost }`

    - `currency: string`

    - `monthly_cost: number`

  - `post_apply_resources: optional map[object { id, account_id, cloud_type, 18 more } ]`

    - `id: string`

    - `account_id: string`

    - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

      - `"AWS"`

      - `"AZURE"`

      - `"GOOGLE"`

      - `"CLOUDFLARE"`

    - `config: map[unknown]`

    - `deployment_provider: string`

    - `managed: boolean`

    - `monthly_cost_estimate: object { currency, monthly_cost }`

      - `currency: string`

      - `monthly_cost: number`

    - `name: string`

    - `native_id: string`

    - `observations: map[object { first_observed_at, last_observed_at, provider_id, resource_id } ]`

      - `first_observed_at: string`

      - `last_observed_at: string`

      - `provider_id: string`

      - `resource_id: string`

    - `provider_ids: array of string`

    - `provider_names_by_id: map[string]`

    - `region: string`

    - `resource_group: string`

    - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

      - `"aws_customer_gateway"`

      - `"aws_egress_only_internet_gateway"`

      - `"aws_internet_gateway"`

      - `"aws_instance"`

      - `"aws_network_interface"`

      - `"aws_route"`

      - `"aws_route_table"`

      - `"aws_route_table_association"`

      - `"aws_subnet"`

      - `"aws_vpc"`

      - `"aws_vpc_ipv4_cidr_block_association"`

      - `"aws_vpn_connection"`

      - `"aws_vpn_connection_route"`

      - `"aws_vpn_gateway"`

      - `"aws_security_group"`

      - `"aws_vpc_security_group_ingress_rule"`

      - `"aws_vpc_security_group_egress_rule"`

      - `"aws_ec2_managed_prefix_list"`

      - `"aws_ec2_transit_gateway"`

      - `"aws_ec2_transit_gateway_prefix_list_reference"`

      - `"aws_ec2_transit_gateway_vpc_attachment"`

      - `"azurerm_application_security_group"`

      - `"azurerm_lb"`

      - `"azurerm_lb_backend_address_pool"`

      - `"azurerm_lb_nat_pool"`

      - `"azurerm_lb_nat_rule"`

      - `"azurerm_lb_rule"`

      - `"azurerm_local_network_gateway"`

      - `"azurerm_network_interface"`

      - `"azurerm_network_interface_application_security_group_association"`

      - `"azurerm_network_interface_backend_address_pool_association"`

      - `"azurerm_network_interface_security_group_association"`

      - `"azurerm_network_security_group"`

      - `"azurerm_public_ip"`

      - `"azurerm_route"`

      - `"azurerm_route_table"`

      - `"azurerm_subnet"`

      - `"azurerm_subnet_route_table_association"`

      - `"azurerm_virtual_machine"`

      - `"azurerm_virtual_network_gateway_connection"`

      - `"azurerm_virtual_network"`

      - `"azurerm_virtual_network_gateway"`

      - `"google_compute_network"`

      - `"google_compute_subnetwork"`

      - `"google_compute_vpn_gateway"`

      - `"google_compute_vpn_tunnel"`

      - `"google_compute_route"`

      - `"google_compute_address"`

      - `"google_compute_global_address"`

      - `"google_compute_router"`

      - `"google_compute_interconnect_attachment"`

      - `"google_compute_ha_vpn_gateway"`

      - `"google_compute_forwarding_rule"`

      - `"google_compute_network_firewall_policy"`

      - `"google_compute_network_firewall_policy_rule"`

      - `"cloudflare_static_route"`

      - `"cloudflare_ipsec_tunnel"`

    - `sections: array of object { hidden_items, name, visible_items, help_text }`

      - `hidden_items: array of object { helpText, name, value }`

        - `helpText: optional string`

        - `name: optional string`

        - `value: optional object { item_type, string }  or object { item_type, yaml }  or object { item_type, yaml_diff }  or 2 more`

          - `McnStringItem object { item_type, string }`

            - `item_type: string`

            - `string: string`

          - `McnYamlItem object { item_type, yaml }`

            - `item_type: string`

            - `yaml: string`

          - `McnYamlDiffItem object { item_type, yaml_diff }`

            - `item_type: string`

            - `yaml_diff: object { diff, left_description, left_yaml, 2 more }`

              - `diff: string`

              - `left_description: string`

              - `left_yaml: string`

              - `right_description: string`

              - `right_yaml: string`

          - `McnResourcePreviewItem object { item_type, resource_preview }`

            - `item_type: string`

            - `resource_preview: object { id, cloud_type, detail, 3 more }`

              - `id: string`

              - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                - `"AWS"`

                - `"AZURE"`

                - `"GOOGLE"`

                - `"CLOUDFLARE"`

              - `detail: string`

              - `name: string`

              - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                - `"aws_customer_gateway"`

                - `"aws_egress_only_internet_gateway"`

                - `"aws_internet_gateway"`

                - `"aws_instance"`

                - `"aws_network_interface"`

                - `"aws_route"`

                - `"aws_route_table"`

                - `"aws_route_table_association"`

                - `"aws_subnet"`

                - `"aws_vpc"`

                - `"aws_vpc_ipv4_cidr_block_association"`

                - `"aws_vpn_connection"`

                - `"aws_vpn_connection_route"`

                - `"aws_vpn_gateway"`

                - `"aws_security_group"`

                - `"aws_vpc_security_group_ingress_rule"`

                - `"aws_vpc_security_group_egress_rule"`

                - `"aws_ec2_managed_prefix_list"`

                - `"aws_ec2_transit_gateway"`

                - `"aws_ec2_transit_gateway_prefix_list_reference"`

                - `"aws_ec2_transit_gateway_vpc_attachment"`

                - `"azurerm_application_security_group"`

                - `"azurerm_lb"`

                - `"azurerm_lb_backend_address_pool"`

                - `"azurerm_lb_nat_pool"`

                - `"azurerm_lb_nat_rule"`

                - `"azurerm_lb_rule"`

                - `"azurerm_local_network_gateway"`

                - `"azurerm_network_interface"`

                - `"azurerm_network_interface_application_security_group_association"`

                - `"azurerm_network_interface_backend_address_pool_association"`

                - `"azurerm_network_interface_security_group_association"`

                - `"azurerm_network_security_group"`

                - `"azurerm_public_ip"`

                - `"azurerm_route"`

                - `"azurerm_route_table"`

                - `"azurerm_subnet"`

                - `"azurerm_subnet_route_table_association"`

                - `"azurerm_virtual_machine"`

                - `"azurerm_virtual_network_gateway_connection"`

                - `"azurerm_virtual_network"`

                - `"azurerm_virtual_network_gateway"`

                - `"google_compute_network"`

                - `"google_compute_subnetwork"`

                - `"google_compute_vpn_gateway"`

                - `"google_compute_vpn_tunnel"`

                - `"google_compute_route"`

                - `"google_compute_address"`

                - `"google_compute_global_address"`

                - `"google_compute_router"`

                - `"google_compute_interconnect_attachment"`

                - `"google_compute_ha_vpn_gateway"`

                - `"google_compute_forwarding_rule"`

                - `"google_compute_network_firewall_policy"`

                - `"google_compute_network_firewall_policy_rule"`

                - `"cloudflare_static_route"`

                - `"cloudflare_ipsec_tunnel"`

              - `title: string`

          - `McnListItem object { item_type, list }`

            - `item_type: string`

            - `list: array of object { item_type, string }  or object { item_type, resource_preview }`

              - `McnStringItem object { item_type, string }`

                - `item_type: string`

                - `string: string`

              - `McnResourcePreviewItem object { item_type, resource_preview }`

                - `item_type: string`

                - `resource_preview: object { id, cloud_type, detail, 3 more }`

                  - `id: string`

                  - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                    - `"AWS"`

                    - `"AZURE"`

                    - `"GOOGLE"`

                    - `"CLOUDFLARE"`

                  - `detail: string`

                  - `name: string`

                  - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                    - `"aws_customer_gateway"`

                    - `"aws_egress_only_internet_gateway"`

                    - `"aws_internet_gateway"`

                    - `"aws_instance"`

                    - `"aws_network_interface"`

                    - `"aws_route"`

                    - `"aws_route_table"`

                    - `"aws_route_table_association"`

                    - `"aws_subnet"`

                    - `"aws_vpc"`

                    - `"aws_vpc_ipv4_cidr_block_association"`

                    - `"aws_vpn_connection"`

                    - `"aws_vpn_connection_route"`

                    - `"aws_vpn_gateway"`

                    - `"aws_security_group"`

                    - `"aws_vpc_security_group_ingress_rule"`

                    - `"aws_vpc_security_group_egress_rule"`

                    - `"aws_ec2_managed_prefix_list"`

                    - `"aws_ec2_transit_gateway"`

                    - `"aws_ec2_transit_gateway_prefix_list_reference"`

                    - `"aws_ec2_transit_gateway_vpc_attachment"`

                    - `"azurerm_application_security_group"`

                    - `"azurerm_lb"`

                    - `"azurerm_lb_backend_address_pool"`

                    - `"azurerm_lb_nat_pool"`

                    - `"azurerm_lb_nat_rule"`

                    - `"azurerm_lb_rule"`

                    - `"azurerm_local_network_gateway"`

                    - `"azurerm_network_interface"`

                    - `"azurerm_network_interface_application_security_group_association"`

                    - `"azurerm_network_interface_backend_address_pool_association"`

                    - `"azurerm_network_interface_security_group_association"`

                    - `"azurerm_network_security_group"`

                    - `"azurerm_public_ip"`

                    - `"azurerm_route"`

                    - `"azurerm_route_table"`

                    - `"azurerm_subnet"`

                    - `"azurerm_subnet_route_table_association"`

                    - `"azurerm_virtual_machine"`

                    - `"azurerm_virtual_network_gateway_connection"`

                    - `"azurerm_virtual_network"`

                    - `"azurerm_virtual_network_gateway"`

                    - `"google_compute_network"`

                    - `"google_compute_subnetwork"`

                    - `"google_compute_vpn_gateway"`

                    - `"google_compute_vpn_tunnel"`

                    - `"google_compute_route"`

                    - `"google_compute_address"`

                    - `"google_compute_global_address"`

                    - `"google_compute_router"`

                    - `"google_compute_interconnect_attachment"`

                    - `"google_compute_ha_vpn_gateway"`

                    - `"google_compute_forwarding_rule"`

                    - `"google_compute_network_firewall_policy"`

                    - `"google_compute_network_firewall_policy_rule"`

                    - `"cloudflare_static_route"`

                    - `"cloudflare_ipsec_tunnel"`

                  - `title: string`

      - `name: string`

      - `visible_items: array of object { helpText, name, value }`

        - `helpText: optional string`

        - `name: optional string`

        - `value: optional object { item_type, string }  or object { item_type, yaml }  or object { item_type, yaml_diff }  or 2 more`

          - `McnStringItem object { item_type, string }`

            - `item_type: string`

            - `string: string`

          - `McnYamlItem object { item_type, yaml }`

            - `item_type: string`

            - `yaml: string`

          - `McnYamlDiffItem object { item_type, yaml_diff }`

            - `item_type: string`

            - `yaml_diff: object { diff, left_description, left_yaml, 2 more }`

              - `diff: string`

              - `left_description: string`

              - `left_yaml: string`

              - `right_description: string`

              - `right_yaml: string`

          - `McnResourcePreviewItem object { item_type, resource_preview }`

            - `item_type: string`

            - `resource_preview: object { id, cloud_type, detail, 3 more }`

              - `id: string`

              - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                - `"AWS"`

                - `"AZURE"`

                - `"GOOGLE"`

                - `"CLOUDFLARE"`

              - `detail: string`

              - `name: string`

              - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                - `"aws_customer_gateway"`

                - `"aws_egress_only_internet_gateway"`

                - `"aws_internet_gateway"`

                - `"aws_instance"`

                - `"aws_network_interface"`

                - `"aws_route"`

                - `"aws_route_table"`

                - `"aws_route_table_association"`

                - `"aws_subnet"`

                - `"aws_vpc"`

                - `"aws_vpc_ipv4_cidr_block_association"`

                - `"aws_vpn_connection"`

                - `"aws_vpn_connection_route"`

                - `"aws_vpn_gateway"`

                - `"aws_security_group"`

                - `"aws_vpc_security_group_ingress_rule"`

                - `"aws_vpc_security_group_egress_rule"`

                - `"aws_ec2_managed_prefix_list"`

                - `"aws_ec2_transit_gateway"`

                - `"aws_ec2_transit_gateway_prefix_list_reference"`

                - `"aws_ec2_transit_gateway_vpc_attachment"`

                - `"azurerm_application_security_group"`

                - `"azurerm_lb"`

                - `"azurerm_lb_backend_address_pool"`

                - `"azurerm_lb_nat_pool"`

                - `"azurerm_lb_nat_rule"`

                - `"azurerm_lb_rule"`

                - `"azurerm_local_network_gateway"`

                - `"azurerm_network_interface"`

                - `"azurerm_network_interface_application_security_group_association"`

                - `"azurerm_network_interface_backend_address_pool_association"`

                - `"azurerm_network_interface_security_group_association"`

                - `"azurerm_network_security_group"`

                - `"azurerm_public_ip"`

                - `"azurerm_route"`

                - `"azurerm_route_table"`

                - `"azurerm_subnet"`

                - `"azurerm_subnet_route_table_association"`

                - `"azurerm_virtual_machine"`

                - `"azurerm_virtual_network_gateway_connection"`

                - `"azurerm_virtual_network"`

                - `"azurerm_virtual_network_gateway"`

                - `"google_compute_network"`

                - `"google_compute_subnetwork"`

                - `"google_compute_vpn_gateway"`

                - `"google_compute_vpn_tunnel"`

                - `"google_compute_route"`

                - `"google_compute_address"`

                - `"google_compute_global_address"`

                - `"google_compute_router"`

                - `"google_compute_interconnect_attachment"`

                - `"google_compute_ha_vpn_gateway"`

                - `"google_compute_forwarding_rule"`

                - `"google_compute_network_firewall_policy"`

                - `"google_compute_network_firewall_policy_rule"`

                - `"cloudflare_static_route"`

                - `"cloudflare_ipsec_tunnel"`

              - `title: string`

          - `McnListItem object { item_type, list }`

            - `item_type: string`

            - `list: array of object { item_type, string }  or object { item_type, resource_preview }`

              - `McnStringItem object { item_type, string }`

                - `item_type: string`

                - `string: string`

              - `McnResourcePreviewItem object { item_type, resource_preview }`

                - `item_type: string`

                - `resource_preview: object { id, cloud_type, detail, 3 more }`

                  - `id: string`

                  - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                    - `"AWS"`

                    - `"AZURE"`

                    - `"GOOGLE"`

                    - `"CLOUDFLARE"`

                  - `detail: string`

                  - `name: string`

                  - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                    - `"aws_customer_gateway"`

                    - `"aws_egress_only_internet_gateway"`

                    - `"aws_internet_gateway"`

                    - `"aws_instance"`

                    - `"aws_network_interface"`

                    - `"aws_route"`

                    - `"aws_route_table"`

                    - `"aws_route_table_association"`

                    - `"aws_subnet"`

                    - `"aws_vpc"`

                    - `"aws_vpc_ipv4_cidr_block_association"`

                    - `"aws_vpn_connection"`

                    - `"aws_vpn_connection_route"`

                    - `"aws_vpn_gateway"`

                    - `"aws_security_group"`

                    - `"aws_vpc_security_group_ingress_rule"`

                    - `"aws_vpc_security_group_egress_rule"`

                    - `"aws_ec2_managed_prefix_list"`

                    - `"aws_ec2_transit_gateway"`

                    - `"aws_ec2_transit_gateway_prefix_list_reference"`

                    - `"aws_ec2_transit_gateway_vpc_attachment"`

                    - `"azurerm_application_security_group"`

                    - `"azurerm_lb"`

                    - `"azurerm_lb_backend_address_pool"`

                    - `"azurerm_lb_nat_pool"`

                    - `"azurerm_lb_nat_rule"`

                    - `"azurerm_lb_rule"`

                    - `"azurerm_local_network_gateway"`

                    - `"azurerm_network_interface"`

                    - `"azurerm_network_interface_application_security_group_association"`

                    - `"azurerm_network_interface_backend_address_pool_association"`

                    - `"azurerm_network_interface_security_group_association"`

                    - `"azurerm_network_security_group"`

                    - `"azurerm_public_ip"`

                    - `"azurerm_route"`

                    - `"azurerm_route_table"`

                    - `"azurerm_subnet"`

                    - `"azurerm_subnet_route_table_association"`

                    - `"azurerm_virtual_machine"`

                    - `"azurerm_virtual_network_gateway_connection"`

                    - `"azurerm_virtual_network"`

                    - `"azurerm_virtual_network_gateway"`

                    - `"google_compute_network"`

                    - `"google_compute_subnetwork"`

                    - `"google_compute_vpn_gateway"`

                    - `"google_compute_vpn_tunnel"`

                    - `"google_compute_route"`

                    - `"google_compute_address"`

                    - `"google_compute_global_address"`

                    - `"google_compute_router"`

                    - `"google_compute_interconnect_attachment"`

                    - `"google_compute_ha_vpn_gateway"`

                    - `"google_compute_forwarding_rule"`

                    - `"google_compute_network_firewall_policy"`

                    - `"google_compute_network_firewall_policy_rule"`

                    - `"cloudflare_static_route"`

                    - `"cloudflare_ipsec_tunnel"`

                  - `title: string`

      - `help_text: optional string`

    - `state: map[unknown]`

    - `tags: map[string]`

    - `updated_at: string`

    - `url: string`

    - `managed_by: optional array of object { id, client_type, name }`

      - `id: string`

      - `client_type: "MAGIC_WAN_CLOUD_ONRAMP"`

        - `"MAGIC_WAN_CLOUD_ONRAMP"`

      - `name: string`

  - `post_apply_resources_unavailable: optional boolean`

  - `region: optional string`

  - `status: optional object { apply_progress, lifecycle_state, plan_progress, 3 more }`

    - `apply_progress: object { done, total }`

      - `done: number`

      - `total: number`

    - `lifecycle_state: "OnrampNeedsApply" or "OnrampPendingPlan" or "OnrampPlanning" or 9 more`

      - `"OnrampNeedsApply"`

      - `"OnrampPendingPlan"`

      - `"OnrampPlanning"`

      - `"OnrampPlanFailed"`

      - `"OnrampPendingApproval"`

      - `"OnrampPendingApply"`

      - `"OnrampApplying"`

      - `"OnrampApplyFailed"`

      - `"OnrampActive"`

      - `"OnrampPendingDestroy"`

      - `"OnrampDestroying"`

      - `"OnrampDestroyFailed"`

    - `plan_progress: object { done, total }`

      - `done: number`

      - `total: number`

    - `routes: array of string`

    - `tunnels: array of string`

    - `lifecycle_errors: optional map[object { code, message, documentation_url, 2 more } ]`

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

  - `vpc: optional string`

  - `vpcs_by_id: optional map[object { id, account_id, cloud_type, 18 more } ]`

    - `id: string`

    - `account_id: string`

    - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

      - `"AWS"`

      - `"AZURE"`

      - `"GOOGLE"`

      - `"CLOUDFLARE"`

    - `config: map[unknown]`

    - `deployment_provider: string`

    - `managed: boolean`

    - `monthly_cost_estimate: object { currency, monthly_cost }`

      - `currency: string`

      - `monthly_cost: number`

    - `name: string`

    - `native_id: string`

    - `observations: map[object { first_observed_at, last_observed_at, provider_id, resource_id } ]`

      - `first_observed_at: string`

      - `last_observed_at: string`

      - `provider_id: string`

      - `resource_id: string`

    - `provider_ids: array of string`

    - `provider_names_by_id: map[string]`

    - `region: string`

    - `resource_group: string`

    - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

      - `"aws_customer_gateway"`

      - `"aws_egress_only_internet_gateway"`

      - `"aws_internet_gateway"`

      - `"aws_instance"`

      - `"aws_network_interface"`

      - `"aws_route"`

      - `"aws_route_table"`

      - `"aws_route_table_association"`

      - `"aws_subnet"`

      - `"aws_vpc"`

      - `"aws_vpc_ipv4_cidr_block_association"`

      - `"aws_vpn_connection"`

      - `"aws_vpn_connection_route"`

      - `"aws_vpn_gateway"`

      - `"aws_security_group"`

      - `"aws_vpc_security_group_ingress_rule"`

      - `"aws_vpc_security_group_egress_rule"`

      - `"aws_ec2_managed_prefix_list"`

      - `"aws_ec2_transit_gateway"`

      - `"aws_ec2_transit_gateway_prefix_list_reference"`

      - `"aws_ec2_transit_gateway_vpc_attachment"`

      - `"azurerm_application_security_group"`

      - `"azurerm_lb"`

      - `"azurerm_lb_backend_address_pool"`

      - `"azurerm_lb_nat_pool"`

      - `"azurerm_lb_nat_rule"`

      - `"azurerm_lb_rule"`

      - `"azurerm_local_network_gateway"`

      - `"azurerm_network_interface"`

      - `"azurerm_network_interface_application_security_group_association"`

      - `"azurerm_network_interface_backend_address_pool_association"`

      - `"azurerm_network_interface_security_group_association"`

      - `"azurerm_network_security_group"`

      - `"azurerm_public_ip"`

      - `"azurerm_route"`

      - `"azurerm_route_table"`

      - `"azurerm_subnet"`

      - `"azurerm_subnet_route_table_association"`

      - `"azurerm_virtual_machine"`

      - `"azurerm_virtual_network_gateway_connection"`

      - `"azurerm_virtual_network"`

      - `"azurerm_virtual_network_gateway"`

      - `"google_compute_network"`

      - `"google_compute_subnetwork"`

      - `"google_compute_vpn_gateway"`

      - `"google_compute_vpn_tunnel"`

      - `"google_compute_route"`

      - `"google_compute_address"`

      - `"google_compute_global_address"`

      - `"google_compute_router"`

      - `"google_compute_interconnect_attachment"`

      - `"google_compute_ha_vpn_gateway"`

      - `"google_compute_forwarding_rule"`

      - `"google_compute_network_firewall_policy"`

      - `"google_compute_network_firewall_policy_rule"`

      - `"cloudflare_static_route"`

      - `"cloudflare_ipsec_tunnel"`

    - `sections: array of object { hidden_items, name, visible_items, help_text }`

      - `hidden_items: array of object { helpText, name, value }`

        - `helpText: optional string`

        - `name: optional string`

        - `value: optional object { item_type, string }  or object { item_type, yaml }  or object { item_type, yaml_diff }  or 2 more`

          - `McnStringItem object { item_type, string }`

            - `item_type: string`

            - `string: string`

          - `McnYamlItem object { item_type, yaml }`

            - `item_type: string`

            - `yaml: string`

          - `McnYamlDiffItem object { item_type, yaml_diff }`

            - `item_type: string`

            - `yaml_diff: object { diff, left_description, left_yaml, 2 more }`

              - `diff: string`

              - `left_description: string`

              - `left_yaml: string`

              - `right_description: string`

              - `right_yaml: string`

          - `McnResourcePreviewItem object { item_type, resource_preview }`

            - `item_type: string`

            - `resource_preview: object { id, cloud_type, detail, 3 more }`

              - `id: string`

              - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                - `"AWS"`

                - `"AZURE"`

                - `"GOOGLE"`

                - `"CLOUDFLARE"`

              - `detail: string`

              - `name: string`

              - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                - `"aws_customer_gateway"`

                - `"aws_egress_only_internet_gateway"`

                - `"aws_internet_gateway"`

                - `"aws_instance"`

                - `"aws_network_interface"`

                - `"aws_route"`

                - `"aws_route_table"`

                - `"aws_route_table_association"`

                - `"aws_subnet"`

                - `"aws_vpc"`

                - `"aws_vpc_ipv4_cidr_block_association"`

                - `"aws_vpn_connection"`

                - `"aws_vpn_connection_route"`

                - `"aws_vpn_gateway"`

                - `"aws_security_group"`

                - `"aws_vpc_security_group_ingress_rule"`

                - `"aws_vpc_security_group_egress_rule"`

                - `"aws_ec2_managed_prefix_list"`

                - `"aws_ec2_transit_gateway"`

                - `"aws_ec2_transit_gateway_prefix_list_reference"`

                - `"aws_ec2_transit_gateway_vpc_attachment"`

                - `"azurerm_application_security_group"`

                - `"azurerm_lb"`

                - `"azurerm_lb_backend_address_pool"`

                - `"azurerm_lb_nat_pool"`

                - `"azurerm_lb_nat_rule"`

                - `"azurerm_lb_rule"`

                - `"azurerm_local_network_gateway"`

                - `"azurerm_network_interface"`

                - `"azurerm_network_interface_application_security_group_association"`

                - `"azurerm_network_interface_backend_address_pool_association"`

                - `"azurerm_network_interface_security_group_association"`

                - `"azurerm_network_security_group"`

                - `"azurerm_public_ip"`

                - `"azurerm_route"`

                - `"azurerm_route_table"`

                - `"azurerm_subnet"`

                - `"azurerm_subnet_route_table_association"`

                - `"azurerm_virtual_machine"`

                - `"azurerm_virtual_network_gateway_connection"`

                - `"azurerm_virtual_network"`

                - `"azurerm_virtual_network_gateway"`

                - `"google_compute_network"`

                - `"google_compute_subnetwork"`

                - `"google_compute_vpn_gateway"`

                - `"google_compute_vpn_tunnel"`

                - `"google_compute_route"`

                - `"google_compute_address"`

                - `"google_compute_global_address"`

                - `"google_compute_router"`

                - `"google_compute_interconnect_attachment"`

                - `"google_compute_ha_vpn_gateway"`

                - `"google_compute_forwarding_rule"`

                - `"google_compute_network_firewall_policy"`

                - `"google_compute_network_firewall_policy_rule"`

                - `"cloudflare_static_route"`

                - `"cloudflare_ipsec_tunnel"`

              - `title: string`

          - `McnListItem object { item_type, list }`

            - `item_type: string`

            - `list: array of object { item_type, string }  or object { item_type, resource_preview }`

              - `McnStringItem object { item_type, string }`

                - `item_type: string`

                - `string: string`

              - `McnResourcePreviewItem object { item_type, resource_preview }`

                - `item_type: string`

                - `resource_preview: object { id, cloud_type, detail, 3 more }`

                  - `id: string`

                  - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                    - `"AWS"`

                    - `"AZURE"`

                    - `"GOOGLE"`

                    - `"CLOUDFLARE"`

                  - `detail: string`

                  - `name: string`

                  - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                    - `"aws_customer_gateway"`

                    - `"aws_egress_only_internet_gateway"`

                    - `"aws_internet_gateway"`

                    - `"aws_instance"`

                    - `"aws_network_interface"`

                    - `"aws_route"`

                    - `"aws_route_table"`

                    - `"aws_route_table_association"`

                    - `"aws_subnet"`

                    - `"aws_vpc"`

                    - `"aws_vpc_ipv4_cidr_block_association"`

                    - `"aws_vpn_connection"`

                    - `"aws_vpn_connection_route"`

                    - `"aws_vpn_gateway"`

                    - `"aws_security_group"`

                    - `"aws_vpc_security_group_ingress_rule"`

                    - `"aws_vpc_security_group_egress_rule"`

                    - `"aws_ec2_managed_prefix_list"`

                    - `"aws_ec2_transit_gateway"`

                    - `"aws_ec2_transit_gateway_prefix_list_reference"`

                    - `"aws_ec2_transit_gateway_vpc_attachment"`

                    - `"azurerm_application_security_group"`

                    - `"azurerm_lb"`

                    - `"azurerm_lb_backend_address_pool"`

                    - `"azurerm_lb_nat_pool"`

                    - `"azurerm_lb_nat_rule"`

                    - `"azurerm_lb_rule"`

                    - `"azurerm_local_network_gateway"`

                    - `"azurerm_network_interface"`

                    - `"azurerm_network_interface_application_security_group_association"`

                    - `"azurerm_network_interface_backend_address_pool_association"`

                    - `"azurerm_network_interface_security_group_association"`

                    - `"azurerm_network_security_group"`

                    - `"azurerm_public_ip"`

                    - `"azurerm_route"`

                    - `"azurerm_route_table"`

                    - `"azurerm_subnet"`

                    - `"azurerm_subnet_route_table_association"`

                    - `"azurerm_virtual_machine"`

                    - `"azurerm_virtual_network_gateway_connection"`

                    - `"azurerm_virtual_network"`

                    - `"azurerm_virtual_network_gateway"`

                    - `"google_compute_network"`

                    - `"google_compute_subnetwork"`

                    - `"google_compute_vpn_gateway"`

                    - `"google_compute_vpn_tunnel"`

                    - `"google_compute_route"`

                    - `"google_compute_address"`

                    - `"google_compute_global_address"`

                    - `"google_compute_router"`

                    - `"google_compute_interconnect_attachment"`

                    - `"google_compute_ha_vpn_gateway"`

                    - `"google_compute_forwarding_rule"`

                    - `"google_compute_network_firewall_policy"`

                    - `"google_compute_network_firewall_policy_rule"`

                    - `"cloudflare_static_route"`

                    - `"cloudflare_ipsec_tunnel"`

                  - `title: string`

      - `name: string`

      - `visible_items: array of object { helpText, name, value }`

        - `helpText: optional string`

        - `name: optional string`

        - `value: optional object { item_type, string }  or object { item_type, yaml }  or object { item_type, yaml_diff }  or 2 more`

          - `McnStringItem object { item_type, string }`

            - `item_type: string`

            - `string: string`

          - `McnYamlItem object { item_type, yaml }`

            - `item_type: string`

            - `yaml: string`

          - `McnYamlDiffItem object { item_type, yaml_diff }`

            - `item_type: string`

            - `yaml_diff: object { diff, left_description, left_yaml, 2 more }`

              - `diff: string`

              - `left_description: string`

              - `left_yaml: string`

              - `right_description: string`

              - `right_yaml: string`

          - `McnResourcePreviewItem object { item_type, resource_preview }`

            - `item_type: string`

            - `resource_preview: object { id, cloud_type, detail, 3 more }`

              - `id: string`

              - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                - `"AWS"`

                - `"AZURE"`

                - `"GOOGLE"`

                - `"CLOUDFLARE"`

              - `detail: string`

              - `name: string`

              - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                - `"aws_customer_gateway"`

                - `"aws_egress_only_internet_gateway"`

                - `"aws_internet_gateway"`

                - `"aws_instance"`

                - `"aws_network_interface"`

                - `"aws_route"`

                - `"aws_route_table"`

                - `"aws_route_table_association"`

                - `"aws_subnet"`

                - `"aws_vpc"`

                - `"aws_vpc_ipv4_cidr_block_association"`

                - `"aws_vpn_connection"`

                - `"aws_vpn_connection_route"`

                - `"aws_vpn_gateway"`

                - `"aws_security_group"`

                - `"aws_vpc_security_group_ingress_rule"`

                - `"aws_vpc_security_group_egress_rule"`

                - `"aws_ec2_managed_prefix_list"`

                - `"aws_ec2_transit_gateway"`

                - `"aws_ec2_transit_gateway_prefix_list_reference"`

                - `"aws_ec2_transit_gateway_vpc_attachment"`

                - `"azurerm_application_security_group"`

                - `"azurerm_lb"`

                - `"azurerm_lb_backend_address_pool"`

                - `"azurerm_lb_nat_pool"`

                - `"azurerm_lb_nat_rule"`

                - `"azurerm_lb_rule"`

                - `"azurerm_local_network_gateway"`

                - `"azurerm_network_interface"`

                - `"azurerm_network_interface_application_security_group_association"`

                - `"azurerm_network_interface_backend_address_pool_association"`

                - `"azurerm_network_interface_security_group_association"`

                - `"azurerm_network_security_group"`

                - `"azurerm_public_ip"`

                - `"azurerm_route"`

                - `"azurerm_route_table"`

                - `"azurerm_subnet"`

                - `"azurerm_subnet_route_table_association"`

                - `"azurerm_virtual_machine"`

                - `"azurerm_virtual_network_gateway_connection"`

                - `"azurerm_virtual_network"`

                - `"azurerm_virtual_network_gateway"`

                - `"google_compute_network"`

                - `"google_compute_subnetwork"`

                - `"google_compute_vpn_gateway"`

                - `"google_compute_vpn_tunnel"`

                - `"google_compute_route"`

                - `"google_compute_address"`

                - `"google_compute_global_address"`

                - `"google_compute_router"`

                - `"google_compute_interconnect_attachment"`

                - `"google_compute_ha_vpn_gateway"`

                - `"google_compute_forwarding_rule"`

                - `"google_compute_network_firewall_policy"`

                - `"google_compute_network_firewall_policy_rule"`

                - `"cloudflare_static_route"`

                - `"cloudflare_ipsec_tunnel"`

              - `title: string`

          - `McnListItem object { item_type, list }`

            - `item_type: string`

            - `list: array of object { item_type, string }  or object { item_type, resource_preview }`

              - `McnStringItem object { item_type, string }`

                - `item_type: string`

                - `string: string`

              - `McnResourcePreviewItem object { item_type, resource_preview }`

                - `item_type: string`

                - `resource_preview: object { id, cloud_type, detail, 3 more }`

                  - `id: string`

                  - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                    - `"AWS"`

                    - `"AZURE"`

                    - `"GOOGLE"`

                    - `"CLOUDFLARE"`

                  - `detail: string`

                  - `name: string`

                  - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                    - `"aws_customer_gateway"`

                    - `"aws_egress_only_internet_gateway"`

                    - `"aws_internet_gateway"`

                    - `"aws_instance"`

                    - `"aws_network_interface"`

                    - `"aws_route"`

                    - `"aws_route_table"`

                    - `"aws_route_table_association"`

                    - `"aws_subnet"`

                    - `"aws_vpc"`

                    - `"aws_vpc_ipv4_cidr_block_association"`

                    - `"aws_vpn_connection"`

                    - `"aws_vpn_connection_route"`

                    - `"aws_vpn_gateway"`

                    - `"aws_security_group"`

                    - `"aws_vpc_security_group_ingress_rule"`

                    - `"aws_vpc_security_group_egress_rule"`

                    - `"aws_ec2_managed_prefix_list"`

                    - `"aws_ec2_transit_gateway"`

                    - `"aws_ec2_transit_gateway_prefix_list_reference"`

                    - `"aws_ec2_transit_gateway_vpc_attachment"`

                    - `"azurerm_application_security_group"`

                    - `"azurerm_lb"`

                    - `"azurerm_lb_backend_address_pool"`

                    - `"azurerm_lb_nat_pool"`

                    - `"azurerm_lb_nat_rule"`

                    - `"azurerm_lb_rule"`

                    - `"azurerm_local_network_gateway"`

                    - `"azurerm_network_interface"`

                    - `"azurerm_network_interface_application_security_group_association"`

                    - `"azurerm_network_interface_backend_address_pool_association"`

                    - `"azurerm_network_interface_security_group_association"`

                    - `"azurerm_network_security_group"`

                    - `"azurerm_public_ip"`

                    - `"azurerm_route"`

                    - `"azurerm_route_table"`

                    - `"azurerm_subnet"`

                    - `"azurerm_subnet_route_table_association"`

                    - `"azurerm_virtual_machine"`

                    - `"azurerm_virtual_network_gateway_connection"`

                    - `"azurerm_virtual_network"`

                    - `"azurerm_virtual_network_gateway"`

                    - `"google_compute_network"`

                    - `"google_compute_subnetwork"`

                    - `"google_compute_vpn_gateway"`

                    - `"google_compute_vpn_tunnel"`

                    - `"google_compute_route"`

                    - `"google_compute_address"`

                    - `"google_compute_global_address"`

                    - `"google_compute_router"`

                    - `"google_compute_interconnect_attachment"`

                    - `"google_compute_ha_vpn_gateway"`

                    - `"google_compute_forwarding_rule"`

                    - `"google_compute_network_firewall_policy"`

                    - `"google_compute_network_firewall_policy_rule"`

                    - `"cloudflare_static_route"`

                    - `"cloudflare_ipsec_tunnel"`

                  - `title: string`

      - `help_text: optional string`

    - `state: map[unknown]`

    - `tags: map[string]`

    - `updated_at: string`

    - `url: string`

    - `managed_by: optional array of object { id, client_type, name }`

      - `id: string`

      - `client_type: "MAGIC_WAN_CLOUD_ONRAMP"`

        - `"MAGIC_WAN_CLOUD_ONRAMP"`

      - `name: string`

  - `vpcs_by_id_unavailable: optional array of string`

    The list of vpc IDs for which resource details failed to generate.

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/cloud/onramps/$ONRAMP_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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
    "dynamic_routing": true,
    "install_routes_in_cloud": true,
    "install_routes_in_magic_wan": true,
    "name": "name",
    "type": "OnrampTypeSingle",
    "updated_at": "updated_at",
    "attached_hubs": [
      "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
    ],
    "attached_vpcs": [
      "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
    ],
    "cloud_asn": 0,
    "description": "description",
    "hub": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "last_applied_at": "last_applied_at",
    "last_exported_at": "last_exported_at",
    "last_planned_at": "last_planned_at",
    "manage_hub_to_hub_attachments": true,
    "manage_vpc_to_hub_attachments": true,
    "planned_monthly_cost_estimate": {
      "currency": "currency",
      "current_monthly_cost": 0,
      "diff": 0,
      "proposed_monthly_cost": 0
    },
    "planned_resources": [
      {
        "diff": {
          "diff": "diff",
          "left_description": "left_description",
          "left_yaml": "left_yaml",
          "right_description": "right_description",
          "right_yaml": "right_yaml"
        },
        "keys_require_replace": [
          "string"
        ],
        "monthly_cost_estimate_diff": {
          "currency": "currency",
          "current_monthly_cost": 0,
          "diff": 0,
          "proposed_monthly_cost": 0
        },
        "planned_action": "no_op",
        "resource": {
          "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
          "cloud_type": "AWS",
          "detail": "detail",
          "name": "name",
          "resource_type": "aws_customer_gateway",
          "title": "title"
        }
      }
    ],
    "planned_resources_unavailable": true,
    "post_apply_monthly_cost_estimate": {
      "currency": "currency",
      "monthly_cost": 0
    },
    "post_apply_resources": {
      "foo": {
        "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
        "account_id": "account_id",
        "cloud_type": "AWS",
        "config": {
          "foo": "bar"
        },
        "deployment_provider": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
        "managed": true,
        "monthly_cost_estimate": {
          "currency": "currency",
          "monthly_cost": 0
        },
        "name": "name",
        "native_id": "native_id",
        "observations": {
          "foo": {
            "first_observed_at": "first_observed_at",
            "last_observed_at": "last_observed_at",
            "provider_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
            "resource_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
          }
        },
        "provider_ids": [
          "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
        ],
        "provider_names_by_id": {
          "foo": "string"
        },
        "region": "region",
        "resource_group": "resource_group",
        "resource_type": "aws_customer_gateway",
        "sections": [
          {
            "hidden_items": [
              {
                "helpText": "helpText",
                "name": "name",
                "value": {
                  "item_type": "item_type",
                  "string": "string"
                }
              }
            ],
            "name": "name",
            "visible_items": [
              {
                "helpText": "helpText",
                "name": "name",
                "value": {
                  "item_type": "item_type",
                  "string": "string"
                }
              }
            ],
            "help_text": "help_text"
          }
        ],
        "state": {
          "foo": "bar"
        },
        "tags": {
          "foo": "string"
        },
        "updated_at": "updated_at",
        "url": "url",
        "managed_by": [
          {
            "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
            "client_type": "MAGIC_WAN_CLOUD_ONRAMP",
            "name": "name"
          }
        ]
      }
    },
    "post_apply_resources_unavailable": true,
    "region": "region",
    "status": {
      "apply_progress": {
        "done": 0,
        "total": 0
      },
      "lifecycle_state": "OnrampNeedsApply",
      "plan_progress": {
        "done": 0,
        "total": 0
      },
      "routes": [
        "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
      ],
      "tunnels": [
        "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
      ],
      "lifecycle_errors": {
        "foo": {
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
      }
    },
    "vpc": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "vpcs_by_id": {
      "foo": {
        "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
        "account_id": "account_id",
        "cloud_type": "AWS",
        "config": {
          "foo": "bar"
        },
        "deployment_provider": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
        "managed": true,
        "monthly_cost_estimate": {
          "currency": "currency",
          "monthly_cost": 0
        },
        "name": "name",
        "native_id": "native_id",
        "observations": {
          "foo": {
            "first_observed_at": "first_observed_at",
            "last_observed_at": "last_observed_at",
            "provider_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
            "resource_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
          }
        },
        "provider_ids": [
          "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
        ],
        "provider_names_by_id": {
          "foo": "string"
        },
        "region": "region",
        "resource_group": "resource_group",
        "resource_type": "aws_customer_gateway",
        "sections": [
          {
            "hidden_items": [
              {
                "helpText": "helpText",
                "name": "name",
                "value": {
                  "item_type": "item_type",
                  "string": "string"
                }
              }
            ],
            "name": "name",
            "visible_items": [
              {
                "helpText": "helpText",
                "name": "name",
                "value": {
                  "item_type": "item_type",
                  "string": "string"
                }
              }
            ],
            "help_text": "help_text"
          }
        ],
        "state": {
          "foo": "bar"
        },
        "tags": {
          "foo": "string"
        },
        "updated_at": "updated_at",
        "url": "url",
        "managed_by": [
          {
            "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
            "client_type": "MAGIC_WAN_CLOUD_ONRAMP",
            "name": "name"
          }
        ]
      }
    },
    "vpcs_by_id_unavailable": [
      "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
    ]
  },
  "success": true
}
```

## Create On-ramp

**post** `/accounts/{account_id}/magic/cloud/onramps`

Create a new On-ramp (Closed Beta).

### Path Parameters

- `account_id: string`

### Header Parameters

- `forwarded: optional string`

### Body Parameters

- `cloud_type: "AWS" or "AZURE" or "GOOGLE"`

  - `"AWS"`

  - `"AZURE"`

  - `"GOOGLE"`

- `dynamic_routing: boolean`

  Enables BGP routing. When enabling this feature, set both install_routes_in_cloud and install_routes_in_magic_wan to false.

- `install_routes_in_cloud: boolean`

- `install_routes_in_magic_wan: boolean`

- `name: string`

- `type: "OnrampTypeSingle" or "OnrampTypeHub"`

  - `"OnrampTypeSingle"`

  - `"OnrampTypeHub"`

- `adopted_hub_id: optional string`

- `attached_hubs: optional array of string`

- `attached_vpcs: optional array of string`

- `cloud_asn: optional number`

  Sets the cloud-side ASN. If unset or zero, the cloud's default ASN takes effect.

- `description: optional string`

- `hub_provider_id: optional string`

- `manage_hub_to_hub_attachments: optional boolean`

- `manage_vpc_to_hub_attachments: optional boolean`

- `region: optional string`

- `vpc: optional string`

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

- `result: object { id, cloud_type, dynamic_routing, 26 more }`

  - `id: string`

  - `cloud_type: "AWS" or "AZURE" or "GOOGLE"`

    - `"AWS"`

    - `"AZURE"`

    - `"GOOGLE"`

  - `dynamic_routing: boolean`

  - `install_routes_in_cloud: boolean`

  - `install_routes_in_magic_wan: boolean`

  - `name: string`

  - `type: "OnrampTypeSingle" or "OnrampTypeHub"`

    - `"OnrampTypeSingle"`

    - `"OnrampTypeHub"`

  - `updated_at: string`

  - `attached_hubs: optional array of string`

  - `attached_vpcs: optional array of string`

  - `cloud_asn: optional number`

  - `description: optional string`

  - `hub: optional string`

  - `last_applied_at: optional string`

  - `last_exported_at: optional string`

  - `last_planned_at: optional string`

  - `manage_hub_to_hub_attachments: optional boolean`

  - `manage_vpc_to_hub_attachments: optional boolean`

  - `planned_monthly_cost_estimate: optional object { currency, current_monthly_cost, diff, proposed_monthly_cost }`

    - `currency: string`

    - `current_monthly_cost: number`

    - `diff: number`

    - `proposed_monthly_cost: number`

  - `planned_resources: optional array of object { diff, keys_require_replace, monthly_cost_estimate_diff, 2 more }`

    - `diff: object { diff, left_description, left_yaml, 2 more }`

      - `diff: string`

      - `left_description: string`

      - `left_yaml: string`

      - `right_description: string`

      - `right_yaml: string`

    - `keys_require_replace: array of string`

    - `monthly_cost_estimate_diff: object { currency, current_monthly_cost, diff, proposed_monthly_cost }`

      - `currency: string`

      - `current_monthly_cost: number`

      - `diff: number`

      - `proposed_monthly_cost: number`

    - `planned_action: "no_op" or "create" or "update" or 2 more`

      - `"no_op"`

      - `"create"`

      - `"update"`

      - `"replace"`

      - `"destroy"`

    - `resource: object { id, cloud_type, detail, 3 more }`

      - `id: string`

      - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

        - `"AWS"`

        - `"AZURE"`

        - `"GOOGLE"`

        - `"CLOUDFLARE"`

      - `detail: string`

      - `name: string`

      - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

        - `"aws_customer_gateway"`

        - `"aws_egress_only_internet_gateway"`

        - `"aws_internet_gateway"`

        - `"aws_instance"`

        - `"aws_network_interface"`

        - `"aws_route"`

        - `"aws_route_table"`

        - `"aws_route_table_association"`

        - `"aws_subnet"`

        - `"aws_vpc"`

        - `"aws_vpc_ipv4_cidr_block_association"`

        - `"aws_vpn_connection"`

        - `"aws_vpn_connection_route"`

        - `"aws_vpn_gateway"`

        - `"aws_security_group"`

        - `"aws_vpc_security_group_ingress_rule"`

        - `"aws_vpc_security_group_egress_rule"`

        - `"aws_ec2_managed_prefix_list"`

        - `"aws_ec2_transit_gateway"`

        - `"aws_ec2_transit_gateway_prefix_list_reference"`

        - `"aws_ec2_transit_gateway_vpc_attachment"`

        - `"azurerm_application_security_group"`

        - `"azurerm_lb"`

        - `"azurerm_lb_backend_address_pool"`

        - `"azurerm_lb_nat_pool"`

        - `"azurerm_lb_nat_rule"`

        - `"azurerm_lb_rule"`

        - `"azurerm_local_network_gateway"`

        - `"azurerm_network_interface"`

        - `"azurerm_network_interface_application_security_group_association"`

        - `"azurerm_network_interface_backend_address_pool_association"`

        - `"azurerm_network_interface_security_group_association"`

        - `"azurerm_network_security_group"`

        - `"azurerm_public_ip"`

        - `"azurerm_route"`

        - `"azurerm_route_table"`

        - `"azurerm_subnet"`

        - `"azurerm_subnet_route_table_association"`

        - `"azurerm_virtual_machine"`

        - `"azurerm_virtual_network_gateway_connection"`

        - `"azurerm_virtual_network"`

        - `"azurerm_virtual_network_gateway"`

        - `"google_compute_network"`

        - `"google_compute_subnetwork"`

        - `"google_compute_vpn_gateway"`

        - `"google_compute_vpn_tunnel"`

        - `"google_compute_route"`

        - `"google_compute_address"`

        - `"google_compute_global_address"`

        - `"google_compute_router"`

        - `"google_compute_interconnect_attachment"`

        - `"google_compute_ha_vpn_gateway"`

        - `"google_compute_forwarding_rule"`

        - `"google_compute_network_firewall_policy"`

        - `"google_compute_network_firewall_policy_rule"`

        - `"cloudflare_static_route"`

        - `"cloudflare_ipsec_tunnel"`

      - `title: string`

  - `planned_resources_unavailable: optional boolean`

  - `post_apply_monthly_cost_estimate: optional object { currency, monthly_cost }`

    - `currency: string`

    - `monthly_cost: number`

  - `post_apply_resources: optional map[object { id, account_id, cloud_type, 18 more } ]`

    - `id: string`

    - `account_id: string`

    - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

      - `"AWS"`

      - `"AZURE"`

      - `"GOOGLE"`

      - `"CLOUDFLARE"`

    - `config: map[unknown]`

    - `deployment_provider: string`

    - `managed: boolean`

    - `monthly_cost_estimate: object { currency, monthly_cost }`

      - `currency: string`

      - `monthly_cost: number`

    - `name: string`

    - `native_id: string`

    - `observations: map[object { first_observed_at, last_observed_at, provider_id, resource_id } ]`

      - `first_observed_at: string`

      - `last_observed_at: string`

      - `provider_id: string`

      - `resource_id: string`

    - `provider_ids: array of string`

    - `provider_names_by_id: map[string]`

    - `region: string`

    - `resource_group: string`

    - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

      - `"aws_customer_gateway"`

      - `"aws_egress_only_internet_gateway"`

      - `"aws_internet_gateway"`

      - `"aws_instance"`

      - `"aws_network_interface"`

      - `"aws_route"`

      - `"aws_route_table"`

      - `"aws_route_table_association"`

      - `"aws_subnet"`

      - `"aws_vpc"`

      - `"aws_vpc_ipv4_cidr_block_association"`

      - `"aws_vpn_connection"`

      - `"aws_vpn_connection_route"`

      - `"aws_vpn_gateway"`

      - `"aws_security_group"`

      - `"aws_vpc_security_group_ingress_rule"`

      - `"aws_vpc_security_group_egress_rule"`

      - `"aws_ec2_managed_prefix_list"`

      - `"aws_ec2_transit_gateway"`

      - `"aws_ec2_transit_gateway_prefix_list_reference"`

      - `"aws_ec2_transit_gateway_vpc_attachment"`

      - `"azurerm_application_security_group"`

      - `"azurerm_lb"`

      - `"azurerm_lb_backend_address_pool"`

      - `"azurerm_lb_nat_pool"`

      - `"azurerm_lb_nat_rule"`

      - `"azurerm_lb_rule"`

      - `"azurerm_local_network_gateway"`

      - `"azurerm_network_interface"`

      - `"azurerm_network_interface_application_security_group_association"`

      - `"azurerm_network_interface_backend_address_pool_association"`

      - `"azurerm_network_interface_security_group_association"`

      - `"azurerm_network_security_group"`

      - `"azurerm_public_ip"`

      - `"azurerm_route"`

      - `"azurerm_route_table"`

      - `"azurerm_subnet"`

      - `"azurerm_subnet_route_table_association"`

      - `"azurerm_virtual_machine"`

      - `"azurerm_virtual_network_gateway_connection"`

      - `"azurerm_virtual_network"`

      - `"azurerm_virtual_network_gateway"`

      - `"google_compute_network"`

      - `"google_compute_subnetwork"`

      - `"google_compute_vpn_gateway"`

      - `"google_compute_vpn_tunnel"`

      - `"google_compute_route"`

      - `"google_compute_address"`

      - `"google_compute_global_address"`

      - `"google_compute_router"`

      - `"google_compute_interconnect_attachment"`

      - `"google_compute_ha_vpn_gateway"`

      - `"google_compute_forwarding_rule"`

      - `"google_compute_network_firewall_policy"`

      - `"google_compute_network_firewall_policy_rule"`

      - `"cloudflare_static_route"`

      - `"cloudflare_ipsec_tunnel"`

    - `sections: array of object { hidden_items, name, visible_items, help_text }`

      - `hidden_items: array of object { helpText, name, value }`

        - `helpText: optional string`

        - `name: optional string`

        - `value: optional object { item_type, string }  or object { item_type, yaml }  or object { item_type, yaml_diff }  or 2 more`

          - `McnStringItem object { item_type, string }`

            - `item_type: string`

            - `string: string`

          - `McnYamlItem object { item_type, yaml }`

            - `item_type: string`

            - `yaml: string`

          - `McnYamlDiffItem object { item_type, yaml_diff }`

            - `item_type: string`

            - `yaml_diff: object { diff, left_description, left_yaml, 2 more }`

              - `diff: string`

              - `left_description: string`

              - `left_yaml: string`

              - `right_description: string`

              - `right_yaml: string`

          - `McnResourcePreviewItem object { item_type, resource_preview }`

            - `item_type: string`

            - `resource_preview: object { id, cloud_type, detail, 3 more }`

              - `id: string`

              - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                - `"AWS"`

                - `"AZURE"`

                - `"GOOGLE"`

                - `"CLOUDFLARE"`

              - `detail: string`

              - `name: string`

              - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                - `"aws_customer_gateway"`

                - `"aws_egress_only_internet_gateway"`

                - `"aws_internet_gateway"`

                - `"aws_instance"`

                - `"aws_network_interface"`

                - `"aws_route"`

                - `"aws_route_table"`

                - `"aws_route_table_association"`

                - `"aws_subnet"`

                - `"aws_vpc"`

                - `"aws_vpc_ipv4_cidr_block_association"`

                - `"aws_vpn_connection"`

                - `"aws_vpn_connection_route"`

                - `"aws_vpn_gateway"`

                - `"aws_security_group"`

                - `"aws_vpc_security_group_ingress_rule"`

                - `"aws_vpc_security_group_egress_rule"`

                - `"aws_ec2_managed_prefix_list"`

                - `"aws_ec2_transit_gateway"`

                - `"aws_ec2_transit_gateway_prefix_list_reference"`

                - `"aws_ec2_transit_gateway_vpc_attachment"`

                - `"azurerm_application_security_group"`

                - `"azurerm_lb"`

                - `"azurerm_lb_backend_address_pool"`

                - `"azurerm_lb_nat_pool"`

                - `"azurerm_lb_nat_rule"`

                - `"azurerm_lb_rule"`

                - `"azurerm_local_network_gateway"`

                - `"azurerm_network_interface"`

                - `"azurerm_network_interface_application_security_group_association"`

                - `"azurerm_network_interface_backend_address_pool_association"`

                - `"azurerm_network_interface_security_group_association"`

                - `"azurerm_network_security_group"`

                - `"azurerm_public_ip"`

                - `"azurerm_route"`

                - `"azurerm_route_table"`

                - `"azurerm_subnet"`

                - `"azurerm_subnet_route_table_association"`

                - `"azurerm_virtual_machine"`

                - `"azurerm_virtual_network_gateway_connection"`

                - `"azurerm_virtual_network"`

                - `"azurerm_virtual_network_gateway"`

                - `"google_compute_network"`

                - `"google_compute_subnetwork"`

                - `"google_compute_vpn_gateway"`

                - `"google_compute_vpn_tunnel"`

                - `"google_compute_route"`

                - `"google_compute_address"`

                - `"google_compute_global_address"`

                - `"google_compute_router"`

                - `"google_compute_interconnect_attachment"`

                - `"google_compute_ha_vpn_gateway"`

                - `"google_compute_forwarding_rule"`

                - `"google_compute_network_firewall_policy"`

                - `"google_compute_network_firewall_policy_rule"`

                - `"cloudflare_static_route"`

                - `"cloudflare_ipsec_tunnel"`

              - `title: string`

          - `McnListItem object { item_type, list }`

            - `item_type: string`

            - `list: array of object { item_type, string }  or object { item_type, resource_preview }`

              - `McnStringItem object { item_type, string }`

                - `item_type: string`

                - `string: string`

              - `McnResourcePreviewItem object { item_type, resource_preview }`

                - `item_type: string`

                - `resource_preview: object { id, cloud_type, detail, 3 more }`

                  - `id: string`

                  - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                    - `"AWS"`

                    - `"AZURE"`

                    - `"GOOGLE"`

                    - `"CLOUDFLARE"`

                  - `detail: string`

                  - `name: string`

                  - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                    - `"aws_customer_gateway"`

                    - `"aws_egress_only_internet_gateway"`

                    - `"aws_internet_gateway"`

                    - `"aws_instance"`

                    - `"aws_network_interface"`

                    - `"aws_route"`

                    - `"aws_route_table"`

                    - `"aws_route_table_association"`

                    - `"aws_subnet"`

                    - `"aws_vpc"`

                    - `"aws_vpc_ipv4_cidr_block_association"`

                    - `"aws_vpn_connection"`

                    - `"aws_vpn_connection_route"`

                    - `"aws_vpn_gateway"`

                    - `"aws_security_group"`

                    - `"aws_vpc_security_group_ingress_rule"`

                    - `"aws_vpc_security_group_egress_rule"`

                    - `"aws_ec2_managed_prefix_list"`

                    - `"aws_ec2_transit_gateway"`

                    - `"aws_ec2_transit_gateway_prefix_list_reference"`

                    - `"aws_ec2_transit_gateway_vpc_attachment"`

                    - `"azurerm_application_security_group"`

                    - `"azurerm_lb"`

                    - `"azurerm_lb_backend_address_pool"`

                    - `"azurerm_lb_nat_pool"`

                    - `"azurerm_lb_nat_rule"`

                    - `"azurerm_lb_rule"`

                    - `"azurerm_local_network_gateway"`

                    - `"azurerm_network_interface"`

                    - `"azurerm_network_interface_application_security_group_association"`

                    - `"azurerm_network_interface_backend_address_pool_association"`

                    - `"azurerm_network_interface_security_group_association"`

                    - `"azurerm_network_security_group"`

                    - `"azurerm_public_ip"`

                    - `"azurerm_route"`

                    - `"azurerm_route_table"`

                    - `"azurerm_subnet"`

                    - `"azurerm_subnet_route_table_association"`

                    - `"azurerm_virtual_machine"`

                    - `"azurerm_virtual_network_gateway_connection"`

                    - `"azurerm_virtual_network"`

                    - `"azurerm_virtual_network_gateway"`

                    - `"google_compute_network"`

                    - `"google_compute_subnetwork"`

                    - `"google_compute_vpn_gateway"`

                    - `"google_compute_vpn_tunnel"`

                    - `"google_compute_route"`

                    - `"google_compute_address"`

                    - `"google_compute_global_address"`

                    - `"google_compute_router"`

                    - `"google_compute_interconnect_attachment"`

                    - `"google_compute_ha_vpn_gateway"`

                    - `"google_compute_forwarding_rule"`

                    - `"google_compute_network_firewall_policy"`

                    - `"google_compute_network_firewall_policy_rule"`

                    - `"cloudflare_static_route"`

                    - `"cloudflare_ipsec_tunnel"`

                  - `title: string`

      - `name: string`

      - `visible_items: array of object { helpText, name, value }`

        - `helpText: optional string`

        - `name: optional string`

        - `value: optional object { item_type, string }  or object { item_type, yaml }  or object { item_type, yaml_diff }  or 2 more`

          - `McnStringItem object { item_type, string }`

            - `item_type: string`

            - `string: string`

          - `McnYamlItem object { item_type, yaml }`

            - `item_type: string`

            - `yaml: string`

          - `McnYamlDiffItem object { item_type, yaml_diff }`

            - `item_type: string`

            - `yaml_diff: object { diff, left_description, left_yaml, 2 more }`

              - `diff: string`

              - `left_description: string`

              - `left_yaml: string`

              - `right_description: string`

              - `right_yaml: string`

          - `McnResourcePreviewItem object { item_type, resource_preview }`

            - `item_type: string`

            - `resource_preview: object { id, cloud_type, detail, 3 more }`

              - `id: string`

              - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                - `"AWS"`

                - `"AZURE"`

                - `"GOOGLE"`

                - `"CLOUDFLARE"`

              - `detail: string`

              - `name: string`

              - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                - `"aws_customer_gateway"`

                - `"aws_egress_only_internet_gateway"`

                - `"aws_internet_gateway"`

                - `"aws_instance"`

                - `"aws_network_interface"`

                - `"aws_route"`

                - `"aws_route_table"`

                - `"aws_route_table_association"`

                - `"aws_subnet"`

                - `"aws_vpc"`

                - `"aws_vpc_ipv4_cidr_block_association"`

                - `"aws_vpn_connection"`

                - `"aws_vpn_connection_route"`

                - `"aws_vpn_gateway"`

                - `"aws_security_group"`

                - `"aws_vpc_security_group_ingress_rule"`

                - `"aws_vpc_security_group_egress_rule"`

                - `"aws_ec2_managed_prefix_list"`

                - `"aws_ec2_transit_gateway"`

                - `"aws_ec2_transit_gateway_prefix_list_reference"`

                - `"aws_ec2_transit_gateway_vpc_attachment"`

                - `"azurerm_application_security_group"`

                - `"azurerm_lb"`

                - `"azurerm_lb_backend_address_pool"`

                - `"azurerm_lb_nat_pool"`

                - `"azurerm_lb_nat_rule"`

                - `"azurerm_lb_rule"`

                - `"azurerm_local_network_gateway"`

                - `"azurerm_network_interface"`

                - `"azurerm_network_interface_application_security_group_association"`

                - `"azurerm_network_interface_backend_address_pool_association"`

                - `"azurerm_network_interface_security_group_association"`

                - `"azurerm_network_security_group"`

                - `"azurerm_public_ip"`

                - `"azurerm_route"`

                - `"azurerm_route_table"`

                - `"azurerm_subnet"`

                - `"azurerm_subnet_route_table_association"`

                - `"azurerm_virtual_machine"`

                - `"azurerm_virtual_network_gateway_connection"`

                - `"azurerm_virtual_network"`

                - `"azurerm_virtual_network_gateway"`

                - `"google_compute_network"`

                - `"google_compute_subnetwork"`

                - `"google_compute_vpn_gateway"`

                - `"google_compute_vpn_tunnel"`

                - `"google_compute_route"`

                - `"google_compute_address"`

                - `"google_compute_global_address"`

                - `"google_compute_router"`

                - `"google_compute_interconnect_attachment"`

                - `"google_compute_ha_vpn_gateway"`

                - `"google_compute_forwarding_rule"`

                - `"google_compute_network_firewall_policy"`

                - `"google_compute_network_firewall_policy_rule"`

                - `"cloudflare_static_route"`

                - `"cloudflare_ipsec_tunnel"`

              - `title: string`

          - `McnListItem object { item_type, list }`

            - `item_type: string`

            - `list: array of object { item_type, string }  or object { item_type, resource_preview }`

              - `McnStringItem object { item_type, string }`

                - `item_type: string`

                - `string: string`

              - `McnResourcePreviewItem object { item_type, resource_preview }`

                - `item_type: string`

                - `resource_preview: object { id, cloud_type, detail, 3 more }`

                  - `id: string`

                  - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                    - `"AWS"`

                    - `"AZURE"`

                    - `"GOOGLE"`

                    - `"CLOUDFLARE"`

                  - `detail: string`

                  - `name: string`

                  - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                    - `"aws_customer_gateway"`

                    - `"aws_egress_only_internet_gateway"`

                    - `"aws_internet_gateway"`

                    - `"aws_instance"`

                    - `"aws_network_interface"`

                    - `"aws_route"`

                    - `"aws_route_table"`

                    - `"aws_route_table_association"`

                    - `"aws_subnet"`

                    - `"aws_vpc"`

                    - `"aws_vpc_ipv4_cidr_block_association"`

                    - `"aws_vpn_connection"`

                    - `"aws_vpn_connection_route"`

                    - `"aws_vpn_gateway"`

                    - `"aws_security_group"`

                    - `"aws_vpc_security_group_ingress_rule"`

                    - `"aws_vpc_security_group_egress_rule"`

                    - `"aws_ec2_managed_prefix_list"`

                    - `"aws_ec2_transit_gateway"`

                    - `"aws_ec2_transit_gateway_prefix_list_reference"`

                    - `"aws_ec2_transit_gateway_vpc_attachment"`

                    - `"azurerm_application_security_group"`

                    - `"azurerm_lb"`

                    - `"azurerm_lb_backend_address_pool"`

                    - `"azurerm_lb_nat_pool"`

                    - `"azurerm_lb_nat_rule"`

                    - `"azurerm_lb_rule"`

                    - `"azurerm_local_network_gateway"`

                    - `"azurerm_network_interface"`

                    - `"azurerm_network_interface_application_security_group_association"`

                    - `"azurerm_network_interface_backend_address_pool_association"`

                    - `"azurerm_network_interface_security_group_association"`

                    - `"azurerm_network_security_group"`

                    - `"azurerm_public_ip"`

                    - `"azurerm_route"`

                    - `"azurerm_route_table"`

                    - `"azurerm_subnet"`

                    - `"azurerm_subnet_route_table_association"`

                    - `"azurerm_virtual_machine"`

                    - `"azurerm_virtual_network_gateway_connection"`

                    - `"azurerm_virtual_network"`

                    - `"azurerm_virtual_network_gateway"`

                    - `"google_compute_network"`

                    - `"google_compute_subnetwork"`

                    - `"google_compute_vpn_gateway"`

                    - `"google_compute_vpn_tunnel"`

                    - `"google_compute_route"`

                    - `"google_compute_address"`

                    - `"google_compute_global_address"`

                    - `"google_compute_router"`

                    - `"google_compute_interconnect_attachment"`

                    - `"google_compute_ha_vpn_gateway"`

                    - `"google_compute_forwarding_rule"`

                    - `"google_compute_network_firewall_policy"`

                    - `"google_compute_network_firewall_policy_rule"`

                    - `"cloudflare_static_route"`

                    - `"cloudflare_ipsec_tunnel"`

                  - `title: string`

      - `help_text: optional string`

    - `state: map[unknown]`

    - `tags: map[string]`

    - `updated_at: string`

    - `url: string`

    - `managed_by: optional array of object { id, client_type, name }`

      - `id: string`

      - `client_type: "MAGIC_WAN_CLOUD_ONRAMP"`

        - `"MAGIC_WAN_CLOUD_ONRAMP"`

      - `name: string`

  - `post_apply_resources_unavailable: optional boolean`

  - `region: optional string`

  - `status: optional object { apply_progress, lifecycle_state, plan_progress, 3 more }`

    - `apply_progress: object { done, total }`

      - `done: number`

      - `total: number`

    - `lifecycle_state: "OnrampNeedsApply" or "OnrampPendingPlan" or "OnrampPlanning" or 9 more`

      - `"OnrampNeedsApply"`

      - `"OnrampPendingPlan"`

      - `"OnrampPlanning"`

      - `"OnrampPlanFailed"`

      - `"OnrampPendingApproval"`

      - `"OnrampPendingApply"`

      - `"OnrampApplying"`

      - `"OnrampApplyFailed"`

      - `"OnrampActive"`

      - `"OnrampPendingDestroy"`

      - `"OnrampDestroying"`

      - `"OnrampDestroyFailed"`

    - `plan_progress: object { done, total }`

      - `done: number`

      - `total: number`

    - `routes: array of string`

    - `tunnels: array of string`

    - `lifecycle_errors: optional map[object { code, message, documentation_url, 2 more } ]`

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

  - `vpc: optional string`

  - `vpcs_by_id: optional map[object { id, account_id, cloud_type, 18 more } ]`

    - `id: string`

    - `account_id: string`

    - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

      - `"AWS"`

      - `"AZURE"`

      - `"GOOGLE"`

      - `"CLOUDFLARE"`

    - `config: map[unknown]`

    - `deployment_provider: string`

    - `managed: boolean`

    - `monthly_cost_estimate: object { currency, monthly_cost }`

      - `currency: string`

      - `monthly_cost: number`

    - `name: string`

    - `native_id: string`

    - `observations: map[object { first_observed_at, last_observed_at, provider_id, resource_id } ]`

      - `first_observed_at: string`

      - `last_observed_at: string`

      - `provider_id: string`

      - `resource_id: string`

    - `provider_ids: array of string`

    - `provider_names_by_id: map[string]`

    - `region: string`

    - `resource_group: string`

    - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

      - `"aws_customer_gateway"`

      - `"aws_egress_only_internet_gateway"`

      - `"aws_internet_gateway"`

      - `"aws_instance"`

      - `"aws_network_interface"`

      - `"aws_route"`

      - `"aws_route_table"`

      - `"aws_route_table_association"`

      - `"aws_subnet"`

      - `"aws_vpc"`

      - `"aws_vpc_ipv4_cidr_block_association"`

      - `"aws_vpn_connection"`

      - `"aws_vpn_connection_route"`

      - `"aws_vpn_gateway"`

      - `"aws_security_group"`

      - `"aws_vpc_security_group_ingress_rule"`

      - `"aws_vpc_security_group_egress_rule"`

      - `"aws_ec2_managed_prefix_list"`

      - `"aws_ec2_transit_gateway"`

      - `"aws_ec2_transit_gateway_prefix_list_reference"`

      - `"aws_ec2_transit_gateway_vpc_attachment"`

      - `"azurerm_application_security_group"`

      - `"azurerm_lb"`

      - `"azurerm_lb_backend_address_pool"`

      - `"azurerm_lb_nat_pool"`

      - `"azurerm_lb_nat_rule"`

      - `"azurerm_lb_rule"`

      - `"azurerm_local_network_gateway"`

      - `"azurerm_network_interface"`

      - `"azurerm_network_interface_application_security_group_association"`

      - `"azurerm_network_interface_backend_address_pool_association"`

      - `"azurerm_network_interface_security_group_association"`

      - `"azurerm_network_security_group"`

      - `"azurerm_public_ip"`

      - `"azurerm_route"`

      - `"azurerm_route_table"`

      - `"azurerm_subnet"`

      - `"azurerm_subnet_route_table_association"`

      - `"azurerm_virtual_machine"`

      - `"azurerm_virtual_network_gateway_connection"`

      - `"azurerm_virtual_network"`

      - `"azurerm_virtual_network_gateway"`

      - `"google_compute_network"`

      - `"google_compute_subnetwork"`

      - `"google_compute_vpn_gateway"`

      - `"google_compute_vpn_tunnel"`

      - `"google_compute_route"`

      - `"google_compute_address"`

      - `"google_compute_global_address"`

      - `"google_compute_router"`

      - `"google_compute_interconnect_attachment"`

      - `"google_compute_ha_vpn_gateway"`

      - `"google_compute_forwarding_rule"`

      - `"google_compute_network_firewall_policy"`

      - `"google_compute_network_firewall_policy_rule"`

      - `"cloudflare_static_route"`

      - `"cloudflare_ipsec_tunnel"`

    - `sections: array of object { hidden_items, name, visible_items, help_text }`

      - `hidden_items: array of object { helpText, name, value }`

        - `helpText: optional string`

        - `name: optional string`

        - `value: optional object { item_type, string }  or object { item_type, yaml }  or object { item_type, yaml_diff }  or 2 more`

          - `McnStringItem object { item_type, string }`

            - `item_type: string`

            - `string: string`

          - `McnYamlItem object { item_type, yaml }`

            - `item_type: string`

            - `yaml: string`

          - `McnYamlDiffItem object { item_type, yaml_diff }`

            - `item_type: string`

            - `yaml_diff: object { diff, left_description, left_yaml, 2 more }`

              - `diff: string`

              - `left_description: string`

              - `left_yaml: string`

              - `right_description: string`

              - `right_yaml: string`

          - `McnResourcePreviewItem object { item_type, resource_preview }`

            - `item_type: string`

            - `resource_preview: object { id, cloud_type, detail, 3 more }`

              - `id: string`

              - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                - `"AWS"`

                - `"AZURE"`

                - `"GOOGLE"`

                - `"CLOUDFLARE"`

              - `detail: string`

              - `name: string`

              - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                - `"aws_customer_gateway"`

                - `"aws_egress_only_internet_gateway"`

                - `"aws_internet_gateway"`

                - `"aws_instance"`

                - `"aws_network_interface"`

                - `"aws_route"`

                - `"aws_route_table"`

                - `"aws_route_table_association"`

                - `"aws_subnet"`

                - `"aws_vpc"`

                - `"aws_vpc_ipv4_cidr_block_association"`

                - `"aws_vpn_connection"`

                - `"aws_vpn_connection_route"`

                - `"aws_vpn_gateway"`

                - `"aws_security_group"`

                - `"aws_vpc_security_group_ingress_rule"`

                - `"aws_vpc_security_group_egress_rule"`

                - `"aws_ec2_managed_prefix_list"`

                - `"aws_ec2_transit_gateway"`

                - `"aws_ec2_transit_gateway_prefix_list_reference"`

                - `"aws_ec2_transit_gateway_vpc_attachment"`

                - `"azurerm_application_security_group"`

                - `"azurerm_lb"`

                - `"azurerm_lb_backend_address_pool"`

                - `"azurerm_lb_nat_pool"`

                - `"azurerm_lb_nat_rule"`

                - `"azurerm_lb_rule"`

                - `"azurerm_local_network_gateway"`

                - `"azurerm_network_interface"`

                - `"azurerm_network_interface_application_security_group_association"`

                - `"azurerm_network_interface_backend_address_pool_association"`

                - `"azurerm_network_interface_security_group_association"`

                - `"azurerm_network_security_group"`

                - `"azurerm_public_ip"`

                - `"azurerm_route"`

                - `"azurerm_route_table"`

                - `"azurerm_subnet"`

                - `"azurerm_subnet_route_table_association"`

                - `"azurerm_virtual_machine"`

                - `"azurerm_virtual_network_gateway_connection"`

                - `"azurerm_virtual_network"`

                - `"azurerm_virtual_network_gateway"`

                - `"google_compute_network"`

                - `"google_compute_subnetwork"`

                - `"google_compute_vpn_gateway"`

                - `"google_compute_vpn_tunnel"`

                - `"google_compute_route"`

                - `"google_compute_address"`

                - `"google_compute_global_address"`

                - `"google_compute_router"`

                - `"google_compute_interconnect_attachment"`

                - `"google_compute_ha_vpn_gateway"`

                - `"google_compute_forwarding_rule"`

                - `"google_compute_network_firewall_policy"`

                - `"google_compute_network_firewall_policy_rule"`

                - `"cloudflare_static_route"`

                - `"cloudflare_ipsec_tunnel"`

              - `title: string`

          - `McnListItem object { item_type, list }`

            - `item_type: string`

            - `list: array of object { item_type, string }  or object { item_type, resource_preview }`

              - `McnStringItem object { item_type, string }`

                - `item_type: string`

                - `string: string`

              - `McnResourcePreviewItem object { item_type, resource_preview }`

                - `item_type: string`

                - `resource_preview: object { id, cloud_type, detail, 3 more }`

                  - `id: string`

                  - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                    - `"AWS"`

                    - `"AZURE"`

                    - `"GOOGLE"`

                    - `"CLOUDFLARE"`

                  - `detail: string`

                  - `name: string`

                  - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                    - `"aws_customer_gateway"`

                    - `"aws_egress_only_internet_gateway"`

                    - `"aws_internet_gateway"`

                    - `"aws_instance"`

                    - `"aws_network_interface"`

                    - `"aws_route"`

                    - `"aws_route_table"`

                    - `"aws_route_table_association"`

                    - `"aws_subnet"`

                    - `"aws_vpc"`

                    - `"aws_vpc_ipv4_cidr_block_association"`

                    - `"aws_vpn_connection"`

                    - `"aws_vpn_connection_route"`

                    - `"aws_vpn_gateway"`

                    - `"aws_security_group"`

                    - `"aws_vpc_security_group_ingress_rule"`

                    - `"aws_vpc_security_group_egress_rule"`

                    - `"aws_ec2_managed_prefix_list"`

                    - `"aws_ec2_transit_gateway"`

                    - `"aws_ec2_transit_gateway_prefix_list_reference"`

                    - `"aws_ec2_transit_gateway_vpc_attachment"`

                    - `"azurerm_application_security_group"`

                    - `"azurerm_lb"`

                    - `"azurerm_lb_backend_address_pool"`

                    - `"azurerm_lb_nat_pool"`

                    - `"azurerm_lb_nat_rule"`

                    - `"azurerm_lb_rule"`

                    - `"azurerm_local_network_gateway"`

                    - `"azurerm_network_interface"`

                    - `"azurerm_network_interface_application_security_group_association"`

                    - `"azurerm_network_interface_backend_address_pool_association"`

                    - `"azurerm_network_interface_security_group_association"`

                    - `"azurerm_network_security_group"`

                    - `"azurerm_public_ip"`

                    - `"azurerm_route"`

                    - `"azurerm_route_table"`

                    - `"azurerm_subnet"`

                    - `"azurerm_subnet_route_table_association"`

                    - `"azurerm_virtual_machine"`

                    - `"azurerm_virtual_network_gateway_connection"`

                    - `"azurerm_virtual_network"`

                    - `"azurerm_virtual_network_gateway"`

                    - `"google_compute_network"`

                    - `"google_compute_subnetwork"`

                    - `"google_compute_vpn_gateway"`

                    - `"google_compute_vpn_tunnel"`

                    - `"google_compute_route"`

                    - `"google_compute_address"`

                    - `"google_compute_global_address"`

                    - `"google_compute_router"`

                    - `"google_compute_interconnect_attachment"`

                    - `"google_compute_ha_vpn_gateway"`

                    - `"google_compute_forwarding_rule"`

                    - `"google_compute_network_firewall_policy"`

                    - `"google_compute_network_firewall_policy_rule"`

                    - `"cloudflare_static_route"`

                    - `"cloudflare_ipsec_tunnel"`

                  - `title: string`

      - `name: string`

      - `visible_items: array of object { helpText, name, value }`

        - `helpText: optional string`

        - `name: optional string`

        - `value: optional object { item_type, string }  or object { item_type, yaml }  or object { item_type, yaml_diff }  or 2 more`

          - `McnStringItem object { item_type, string }`

            - `item_type: string`

            - `string: string`

          - `McnYamlItem object { item_type, yaml }`

            - `item_type: string`

            - `yaml: string`

          - `McnYamlDiffItem object { item_type, yaml_diff }`

            - `item_type: string`

            - `yaml_diff: object { diff, left_description, left_yaml, 2 more }`

              - `diff: string`

              - `left_description: string`

              - `left_yaml: string`

              - `right_description: string`

              - `right_yaml: string`

          - `McnResourcePreviewItem object { item_type, resource_preview }`

            - `item_type: string`

            - `resource_preview: object { id, cloud_type, detail, 3 more }`

              - `id: string`

              - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                - `"AWS"`

                - `"AZURE"`

                - `"GOOGLE"`

                - `"CLOUDFLARE"`

              - `detail: string`

              - `name: string`

              - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                - `"aws_customer_gateway"`

                - `"aws_egress_only_internet_gateway"`

                - `"aws_internet_gateway"`

                - `"aws_instance"`

                - `"aws_network_interface"`

                - `"aws_route"`

                - `"aws_route_table"`

                - `"aws_route_table_association"`

                - `"aws_subnet"`

                - `"aws_vpc"`

                - `"aws_vpc_ipv4_cidr_block_association"`

                - `"aws_vpn_connection"`

                - `"aws_vpn_connection_route"`

                - `"aws_vpn_gateway"`

                - `"aws_security_group"`

                - `"aws_vpc_security_group_ingress_rule"`

                - `"aws_vpc_security_group_egress_rule"`

                - `"aws_ec2_managed_prefix_list"`

                - `"aws_ec2_transit_gateway"`

                - `"aws_ec2_transit_gateway_prefix_list_reference"`

                - `"aws_ec2_transit_gateway_vpc_attachment"`

                - `"azurerm_application_security_group"`

                - `"azurerm_lb"`

                - `"azurerm_lb_backend_address_pool"`

                - `"azurerm_lb_nat_pool"`

                - `"azurerm_lb_nat_rule"`

                - `"azurerm_lb_rule"`

                - `"azurerm_local_network_gateway"`

                - `"azurerm_network_interface"`

                - `"azurerm_network_interface_application_security_group_association"`

                - `"azurerm_network_interface_backend_address_pool_association"`

                - `"azurerm_network_interface_security_group_association"`

                - `"azurerm_network_security_group"`

                - `"azurerm_public_ip"`

                - `"azurerm_route"`

                - `"azurerm_route_table"`

                - `"azurerm_subnet"`

                - `"azurerm_subnet_route_table_association"`

                - `"azurerm_virtual_machine"`

                - `"azurerm_virtual_network_gateway_connection"`

                - `"azurerm_virtual_network"`

                - `"azurerm_virtual_network_gateway"`

                - `"google_compute_network"`

                - `"google_compute_subnetwork"`

                - `"google_compute_vpn_gateway"`

                - `"google_compute_vpn_tunnel"`

                - `"google_compute_route"`

                - `"google_compute_address"`

                - `"google_compute_global_address"`

                - `"google_compute_router"`

                - `"google_compute_interconnect_attachment"`

                - `"google_compute_ha_vpn_gateway"`

                - `"google_compute_forwarding_rule"`

                - `"google_compute_network_firewall_policy"`

                - `"google_compute_network_firewall_policy_rule"`

                - `"cloudflare_static_route"`

                - `"cloudflare_ipsec_tunnel"`

              - `title: string`

          - `McnListItem object { item_type, list }`

            - `item_type: string`

            - `list: array of object { item_type, string }  or object { item_type, resource_preview }`

              - `McnStringItem object { item_type, string }`

                - `item_type: string`

                - `string: string`

              - `McnResourcePreviewItem object { item_type, resource_preview }`

                - `item_type: string`

                - `resource_preview: object { id, cloud_type, detail, 3 more }`

                  - `id: string`

                  - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                    - `"AWS"`

                    - `"AZURE"`

                    - `"GOOGLE"`

                    - `"CLOUDFLARE"`

                  - `detail: string`

                  - `name: string`

                  - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                    - `"aws_customer_gateway"`

                    - `"aws_egress_only_internet_gateway"`

                    - `"aws_internet_gateway"`

                    - `"aws_instance"`

                    - `"aws_network_interface"`

                    - `"aws_route"`

                    - `"aws_route_table"`

                    - `"aws_route_table_association"`

                    - `"aws_subnet"`

                    - `"aws_vpc"`

                    - `"aws_vpc_ipv4_cidr_block_association"`

                    - `"aws_vpn_connection"`

                    - `"aws_vpn_connection_route"`

                    - `"aws_vpn_gateway"`

                    - `"aws_security_group"`

                    - `"aws_vpc_security_group_ingress_rule"`

                    - `"aws_vpc_security_group_egress_rule"`

                    - `"aws_ec2_managed_prefix_list"`

                    - `"aws_ec2_transit_gateway"`

                    - `"aws_ec2_transit_gateway_prefix_list_reference"`

                    - `"aws_ec2_transit_gateway_vpc_attachment"`

                    - `"azurerm_application_security_group"`

                    - `"azurerm_lb"`

                    - `"azurerm_lb_backend_address_pool"`

                    - `"azurerm_lb_nat_pool"`

                    - `"azurerm_lb_nat_rule"`

                    - `"azurerm_lb_rule"`

                    - `"azurerm_local_network_gateway"`

                    - `"azurerm_network_interface"`

                    - `"azurerm_network_interface_application_security_group_association"`

                    - `"azurerm_network_interface_backend_address_pool_association"`

                    - `"azurerm_network_interface_security_group_association"`

                    - `"azurerm_network_security_group"`

                    - `"azurerm_public_ip"`

                    - `"azurerm_route"`

                    - `"azurerm_route_table"`

                    - `"azurerm_subnet"`

                    - `"azurerm_subnet_route_table_association"`

                    - `"azurerm_virtual_machine"`

                    - `"azurerm_virtual_network_gateway_connection"`

                    - `"azurerm_virtual_network"`

                    - `"azurerm_virtual_network_gateway"`

                    - `"google_compute_network"`

                    - `"google_compute_subnetwork"`

                    - `"google_compute_vpn_gateway"`

                    - `"google_compute_vpn_tunnel"`

                    - `"google_compute_route"`

                    - `"google_compute_address"`

                    - `"google_compute_global_address"`

                    - `"google_compute_router"`

                    - `"google_compute_interconnect_attachment"`

                    - `"google_compute_ha_vpn_gateway"`

                    - `"google_compute_forwarding_rule"`

                    - `"google_compute_network_firewall_policy"`

                    - `"google_compute_network_firewall_policy_rule"`

                    - `"cloudflare_static_route"`

                    - `"cloudflare_ipsec_tunnel"`

                  - `title: string`

      - `help_text: optional string`

    - `state: map[unknown]`

    - `tags: map[string]`

    - `updated_at: string`

    - `url: string`

    - `managed_by: optional array of object { id, client_type, name }`

      - `id: string`

      - `client_type: "MAGIC_WAN_CLOUD_ONRAMP"`

        - `"MAGIC_WAN_CLOUD_ONRAMP"`

      - `name: string`

  - `vpcs_by_id_unavailable: optional array of string`

    The list of vpc IDs for which resource details failed to generate.

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/cloud/onramps \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "cloud_type": "AWS",
          "dynamic_routing": true,
          "install_routes_in_cloud": true,
          "install_routes_in_magic_wan": true,
          "name": "name",
          "type": "OnrampTypeSingle"
        }'
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
    "dynamic_routing": true,
    "install_routes_in_cloud": true,
    "install_routes_in_magic_wan": true,
    "name": "name",
    "type": "OnrampTypeSingle",
    "updated_at": "updated_at",
    "attached_hubs": [
      "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
    ],
    "attached_vpcs": [
      "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
    ],
    "cloud_asn": 0,
    "description": "description",
    "hub": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "last_applied_at": "last_applied_at",
    "last_exported_at": "last_exported_at",
    "last_planned_at": "last_planned_at",
    "manage_hub_to_hub_attachments": true,
    "manage_vpc_to_hub_attachments": true,
    "planned_monthly_cost_estimate": {
      "currency": "currency",
      "current_monthly_cost": 0,
      "diff": 0,
      "proposed_monthly_cost": 0
    },
    "planned_resources": [
      {
        "diff": {
          "diff": "diff",
          "left_description": "left_description",
          "left_yaml": "left_yaml",
          "right_description": "right_description",
          "right_yaml": "right_yaml"
        },
        "keys_require_replace": [
          "string"
        ],
        "monthly_cost_estimate_diff": {
          "currency": "currency",
          "current_monthly_cost": 0,
          "diff": 0,
          "proposed_monthly_cost": 0
        },
        "planned_action": "no_op",
        "resource": {
          "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
          "cloud_type": "AWS",
          "detail": "detail",
          "name": "name",
          "resource_type": "aws_customer_gateway",
          "title": "title"
        }
      }
    ],
    "planned_resources_unavailable": true,
    "post_apply_monthly_cost_estimate": {
      "currency": "currency",
      "monthly_cost": 0
    },
    "post_apply_resources": {
      "foo": {
        "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
        "account_id": "account_id",
        "cloud_type": "AWS",
        "config": {
          "foo": "bar"
        },
        "deployment_provider": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
        "managed": true,
        "monthly_cost_estimate": {
          "currency": "currency",
          "monthly_cost": 0
        },
        "name": "name",
        "native_id": "native_id",
        "observations": {
          "foo": {
            "first_observed_at": "first_observed_at",
            "last_observed_at": "last_observed_at",
            "provider_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
            "resource_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
          }
        },
        "provider_ids": [
          "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
        ],
        "provider_names_by_id": {
          "foo": "string"
        },
        "region": "region",
        "resource_group": "resource_group",
        "resource_type": "aws_customer_gateway",
        "sections": [
          {
            "hidden_items": [
              {
                "helpText": "helpText",
                "name": "name",
                "value": {
                  "item_type": "item_type",
                  "string": "string"
                }
              }
            ],
            "name": "name",
            "visible_items": [
              {
                "helpText": "helpText",
                "name": "name",
                "value": {
                  "item_type": "item_type",
                  "string": "string"
                }
              }
            ],
            "help_text": "help_text"
          }
        ],
        "state": {
          "foo": "bar"
        },
        "tags": {
          "foo": "string"
        },
        "updated_at": "updated_at",
        "url": "url",
        "managed_by": [
          {
            "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
            "client_type": "MAGIC_WAN_CLOUD_ONRAMP",
            "name": "name"
          }
        ]
      }
    },
    "post_apply_resources_unavailable": true,
    "region": "region",
    "status": {
      "apply_progress": {
        "done": 0,
        "total": 0
      },
      "lifecycle_state": "OnrampNeedsApply",
      "plan_progress": {
        "done": 0,
        "total": 0
      },
      "routes": [
        "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
      ],
      "tunnels": [
        "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
      ],
      "lifecycle_errors": {
        "foo": {
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
      }
    },
    "vpc": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "vpcs_by_id": {
      "foo": {
        "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
        "account_id": "account_id",
        "cloud_type": "AWS",
        "config": {
          "foo": "bar"
        },
        "deployment_provider": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
        "managed": true,
        "monthly_cost_estimate": {
          "currency": "currency",
          "monthly_cost": 0
        },
        "name": "name",
        "native_id": "native_id",
        "observations": {
          "foo": {
            "first_observed_at": "first_observed_at",
            "last_observed_at": "last_observed_at",
            "provider_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
            "resource_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
          }
        },
        "provider_ids": [
          "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
        ],
        "provider_names_by_id": {
          "foo": "string"
        },
        "region": "region",
        "resource_group": "resource_group",
        "resource_type": "aws_customer_gateway",
        "sections": [
          {
            "hidden_items": [
              {
                "helpText": "helpText",
                "name": "name",
                "value": {
                  "item_type": "item_type",
                  "string": "string"
                }
              }
            ],
            "name": "name",
            "visible_items": [
              {
                "helpText": "helpText",
                "name": "name",
                "value": {
                  "item_type": "item_type",
                  "string": "string"
                }
              }
            ],
            "help_text": "help_text"
          }
        ],
        "state": {
          "foo": "bar"
        },
        "tags": {
          "foo": "string"
        },
        "updated_at": "updated_at",
        "url": "url",
        "managed_by": [
          {
            "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
            "client_type": "MAGIC_WAN_CLOUD_ONRAMP",
            "name": "name"
          }
        ]
      }
    },
    "vpcs_by_id_unavailable": [
      "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
    ]
  },
  "success": true
}
```

## Update On-ramp

**put** `/accounts/{account_id}/magic/cloud/onramps/{onramp_id}`

Update an On-ramp (Closed Beta).

### Path Parameters

- `account_id: string`

- `onramp_id: string`

### Body Parameters

- `attached_hubs: optional array of string`

- `attached_vpcs: optional array of string`

- `description: optional string`

- `install_routes_in_cloud: optional boolean`

- `install_routes_in_magic_wan: optional boolean`

- `manage_hub_to_hub_attachments: optional boolean`

- `manage_vpc_to_hub_attachments: optional boolean`

- `name: optional string`

- `vpc: optional string`

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

- `result: object { id, cloud_type, dynamic_routing, 26 more }`

  - `id: string`

  - `cloud_type: "AWS" or "AZURE" or "GOOGLE"`

    - `"AWS"`

    - `"AZURE"`

    - `"GOOGLE"`

  - `dynamic_routing: boolean`

  - `install_routes_in_cloud: boolean`

  - `install_routes_in_magic_wan: boolean`

  - `name: string`

  - `type: "OnrampTypeSingle" or "OnrampTypeHub"`

    - `"OnrampTypeSingle"`

    - `"OnrampTypeHub"`

  - `updated_at: string`

  - `attached_hubs: optional array of string`

  - `attached_vpcs: optional array of string`

  - `cloud_asn: optional number`

  - `description: optional string`

  - `hub: optional string`

  - `last_applied_at: optional string`

  - `last_exported_at: optional string`

  - `last_planned_at: optional string`

  - `manage_hub_to_hub_attachments: optional boolean`

  - `manage_vpc_to_hub_attachments: optional boolean`

  - `planned_monthly_cost_estimate: optional object { currency, current_monthly_cost, diff, proposed_monthly_cost }`

    - `currency: string`

    - `current_monthly_cost: number`

    - `diff: number`

    - `proposed_monthly_cost: number`

  - `planned_resources: optional array of object { diff, keys_require_replace, monthly_cost_estimate_diff, 2 more }`

    - `diff: object { diff, left_description, left_yaml, 2 more }`

      - `diff: string`

      - `left_description: string`

      - `left_yaml: string`

      - `right_description: string`

      - `right_yaml: string`

    - `keys_require_replace: array of string`

    - `monthly_cost_estimate_diff: object { currency, current_monthly_cost, diff, proposed_monthly_cost }`

      - `currency: string`

      - `current_monthly_cost: number`

      - `diff: number`

      - `proposed_monthly_cost: number`

    - `planned_action: "no_op" or "create" or "update" or 2 more`

      - `"no_op"`

      - `"create"`

      - `"update"`

      - `"replace"`

      - `"destroy"`

    - `resource: object { id, cloud_type, detail, 3 more }`

      - `id: string`

      - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

        - `"AWS"`

        - `"AZURE"`

        - `"GOOGLE"`

        - `"CLOUDFLARE"`

      - `detail: string`

      - `name: string`

      - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

        - `"aws_customer_gateway"`

        - `"aws_egress_only_internet_gateway"`

        - `"aws_internet_gateway"`

        - `"aws_instance"`

        - `"aws_network_interface"`

        - `"aws_route"`

        - `"aws_route_table"`

        - `"aws_route_table_association"`

        - `"aws_subnet"`

        - `"aws_vpc"`

        - `"aws_vpc_ipv4_cidr_block_association"`

        - `"aws_vpn_connection"`

        - `"aws_vpn_connection_route"`

        - `"aws_vpn_gateway"`

        - `"aws_security_group"`

        - `"aws_vpc_security_group_ingress_rule"`

        - `"aws_vpc_security_group_egress_rule"`

        - `"aws_ec2_managed_prefix_list"`

        - `"aws_ec2_transit_gateway"`

        - `"aws_ec2_transit_gateway_prefix_list_reference"`

        - `"aws_ec2_transit_gateway_vpc_attachment"`

        - `"azurerm_application_security_group"`

        - `"azurerm_lb"`

        - `"azurerm_lb_backend_address_pool"`

        - `"azurerm_lb_nat_pool"`

        - `"azurerm_lb_nat_rule"`

        - `"azurerm_lb_rule"`

        - `"azurerm_local_network_gateway"`

        - `"azurerm_network_interface"`

        - `"azurerm_network_interface_application_security_group_association"`

        - `"azurerm_network_interface_backend_address_pool_association"`

        - `"azurerm_network_interface_security_group_association"`

        - `"azurerm_network_security_group"`

        - `"azurerm_public_ip"`

        - `"azurerm_route"`

        - `"azurerm_route_table"`

        - `"azurerm_subnet"`

        - `"azurerm_subnet_route_table_association"`

        - `"azurerm_virtual_machine"`

        - `"azurerm_virtual_network_gateway_connection"`

        - `"azurerm_virtual_network"`

        - `"azurerm_virtual_network_gateway"`

        - `"google_compute_network"`

        - `"google_compute_subnetwork"`

        - `"google_compute_vpn_gateway"`

        - `"google_compute_vpn_tunnel"`

        - `"google_compute_route"`

        - `"google_compute_address"`

        - `"google_compute_global_address"`

        - `"google_compute_router"`

        - `"google_compute_interconnect_attachment"`

        - `"google_compute_ha_vpn_gateway"`

        - `"google_compute_forwarding_rule"`

        - `"google_compute_network_firewall_policy"`

        - `"google_compute_network_firewall_policy_rule"`

        - `"cloudflare_static_route"`

        - `"cloudflare_ipsec_tunnel"`

      - `title: string`

  - `planned_resources_unavailable: optional boolean`

  - `post_apply_monthly_cost_estimate: optional object { currency, monthly_cost }`

    - `currency: string`

    - `monthly_cost: number`

  - `post_apply_resources: optional map[object { id, account_id, cloud_type, 18 more } ]`

    - `id: string`

    - `account_id: string`

    - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

      - `"AWS"`

      - `"AZURE"`

      - `"GOOGLE"`

      - `"CLOUDFLARE"`

    - `config: map[unknown]`

    - `deployment_provider: string`

    - `managed: boolean`

    - `monthly_cost_estimate: object { currency, monthly_cost }`

      - `currency: string`

      - `monthly_cost: number`

    - `name: string`

    - `native_id: string`

    - `observations: map[object { first_observed_at, last_observed_at, provider_id, resource_id } ]`

      - `first_observed_at: string`

      - `last_observed_at: string`

      - `provider_id: string`

      - `resource_id: string`

    - `provider_ids: array of string`

    - `provider_names_by_id: map[string]`

    - `region: string`

    - `resource_group: string`

    - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

      - `"aws_customer_gateway"`

      - `"aws_egress_only_internet_gateway"`

      - `"aws_internet_gateway"`

      - `"aws_instance"`

      - `"aws_network_interface"`

      - `"aws_route"`

      - `"aws_route_table"`

      - `"aws_route_table_association"`

      - `"aws_subnet"`

      - `"aws_vpc"`

      - `"aws_vpc_ipv4_cidr_block_association"`

      - `"aws_vpn_connection"`

      - `"aws_vpn_connection_route"`

      - `"aws_vpn_gateway"`

      - `"aws_security_group"`

      - `"aws_vpc_security_group_ingress_rule"`

      - `"aws_vpc_security_group_egress_rule"`

      - `"aws_ec2_managed_prefix_list"`

      - `"aws_ec2_transit_gateway"`

      - `"aws_ec2_transit_gateway_prefix_list_reference"`

      - `"aws_ec2_transit_gateway_vpc_attachment"`

      - `"azurerm_application_security_group"`

      - `"azurerm_lb"`

      - `"azurerm_lb_backend_address_pool"`

      - `"azurerm_lb_nat_pool"`

      - `"azurerm_lb_nat_rule"`

      - `"azurerm_lb_rule"`

      - `"azurerm_local_network_gateway"`

      - `"azurerm_network_interface"`

      - `"azurerm_network_interface_application_security_group_association"`

      - `"azurerm_network_interface_backend_address_pool_association"`

      - `"azurerm_network_interface_security_group_association"`

      - `"azurerm_network_security_group"`

      - `"azurerm_public_ip"`

      - `"azurerm_route"`

      - `"azurerm_route_table"`

      - `"azurerm_subnet"`

      - `"azurerm_subnet_route_table_association"`

      - `"azurerm_virtual_machine"`

      - `"azurerm_virtual_network_gateway_connection"`

      - `"azurerm_virtual_network"`

      - `"azurerm_virtual_network_gateway"`

      - `"google_compute_network"`

      - `"google_compute_subnetwork"`

      - `"google_compute_vpn_gateway"`

      - `"google_compute_vpn_tunnel"`

      - `"google_compute_route"`

      - `"google_compute_address"`

      - `"google_compute_global_address"`

      - `"google_compute_router"`

      - `"google_compute_interconnect_attachment"`

      - `"google_compute_ha_vpn_gateway"`

      - `"google_compute_forwarding_rule"`

      - `"google_compute_network_firewall_policy"`

      - `"google_compute_network_firewall_policy_rule"`

      - `"cloudflare_static_route"`

      - `"cloudflare_ipsec_tunnel"`

    - `sections: array of object { hidden_items, name, visible_items, help_text }`

      - `hidden_items: array of object { helpText, name, value }`

        - `helpText: optional string`

        - `name: optional string`

        - `value: optional object { item_type, string }  or object { item_type, yaml }  or object { item_type, yaml_diff }  or 2 more`

          - `McnStringItem object { item_type, string }`

            - `item_type: string`

            - `string: string`

          - `McnYamlItem object { item_type, yaml }`

            - `item_type: string`

            - `yaml: string`

          - `McnYamlDiffItem object { item_type, yaml_diff }`

            - `item_type: string`

            - `yaml_diff: object { diff, left_description, left_yaml, 2 more }`

              - `diff: string`

              - `left_description: string`

              - `left_yaml: string`

              - `right_description: string`

              - `right_yaml: string`

          - `McnResourcePreviewItem object { item_type, resource_preview }`

            - `item_type: string`

            - `resource_preview: object { id, cloud_type, detail, 3 more }`

              - `id: string`

              - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                - `"AWS"`

                - `"AZURE"`

                - `"GOOGLE"`

                - `"CLOUDFLARE"`

              - `detail: string`

              - `name: string`

              - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                - `"aws_customer_gateway"`

                - `"aws_egress_only_internet_gateway"`

                - `"aws_internet_gateway"`

                - `"aws_instance"`

                - `"aws_network_interface"`

                - `"aws_route"`

                - `"aws_route_table"`

                - `"aws_route_table_association"`

                - `"aws_subnet"`

                - `"aws_vpc"`

                - `"aws_vpc_ipv4_cidr_block_association"`

                - `"aws_vpn_connection"`

                - `"aws_vpn_connection_route"`

                - `"aws_vpn_gateway"`

                - `"aws_security_group"`

                - `"aws_vpc_security_group_ingress_rule"`

                - `"aws_vpc_security_group_egress_rule"`

                - `"aws_ec2_managed_prefix_list"`

                - `"aws_ec2_transit_gateway"`

                - `"aws_ec2_transit_gateway_prefix_list_reference"`

                - `"aws_ec2_transit_gateway_vpc_attachment"`

                - `"azurerm_application_security_group"`

                - `"azurerm_lb"`

                - `"azurerm_lb_backend_address_pool"`

                - `"azurerm_lb_nat_pool"`

                - `"azurerm_lb_nat_rule"`

                - `"azurerm_lb_rule"`

                - `"azurerm_local_network_gateway"`

                - `"azurerm_network_interface"`

                - `"azurerm_network_interface_application_security_group_association"`

                - `"azurerm_network_interface_backend_address_pool_association"`

                - `"azurerm_network_interface_security_group_association"`

                - `"azurerm_network_security_group"`

                - `"azurerm_public_ip"`

                - `"azurerm_route"`

                - `"azurerm_route_table"`

                - `"azurerm_subnet"`

                - `"azurerm_subnet_route_table_association"`

                - `"azurerm_virtual_machine"`

                - `"azurerm_virtual_network_gateway_connection"`

                - `"azurerm_virtual_network"`

                - `"azurerm_virtual_network_gateway"`

                - `"google_compute_network"`

                - `"google_compute_subnetwork"`

                - `"google_compute_vpn_gateway"`

                - `"google_compute_vpn_tunnel"`

                - `"google_compute_route"`

                - `"google_compute_address"`

                - `"google_compute_global_address"`

                - `"google_compute_router"`

                - `"google_compute_interconnect_attachment"`

                - `"google_compute_ha_vpn_gateway"`

                - `"google_compute_forwarding_rule"`

                - `"google_compute_network_firewall_policy"`

                - `"google_compute_network_firewall_policy_rule"`

                - `"cloudflare_static_route"`

                - `"cloudflare_ipsec_tunnel"`

              - `title: string`

          - `McnListItem object { item_type, list }`

            - `item_type: string`

            - `list: array of object { item_type, string }  or object { item_type, resource_preview }`

              - `McnStringItem object { item_type, string }`

                - `item_type: string`

                - `string: string`

              - `McnResourcePreviewItem object { item_type, resource_preview }`

                - `item_type: string`

                - `resource_preview: object { id, cloud_type, detail, 3 more }`

                  - `id: string`

                  - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                    - `"AWS"`

                    - `"AZURE"`

                    - `"GOOGLE"`

                    - `"CLOUDFLARE"`

                  - `detail: string`

                  - `name: string`

                  - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                    - `"aws_customer_gateway"`

                    - `"aws_egress_only_internet_gateway"`

                    - `"aws_internet_gateway"`

                    - `"aws_instance"`

                    - `"aws_network_interface"`

                    - `"aws_route"`

                    - `"aws_route_table"`

                    - `"aws_route_table_association"`

                    - `"aws_subnet"`

                    - `"aws_vpc"`

                    - `"aws_vpc_ipv4_cidr_block_association"`

                    - `"aws_vpn_connection"`

                    - `"aws_vpn_connection_route"`

                    - `"aws_vpn_gateway"`

                    - `"aws_security_group"`

                    - `"aws_vpc_security_group_ingress_rule"`

                    - `"aws_vpc_security_group_egress_rule"`

                    - `"aws_ec2_managed_prefix_list"`

                    - `"aws_ec2_transit_gateway"`

                    - `"aws_ec2_transit_gateway_prefix_list_reference"`

                    - `"aws_ec2_transit_gateway_vpc_attachment"`

                    - `"azurerm_application_security_group"`

                    - `"azurerm_lb"`

                    - `"azurerm_lb_backend_address_pool"`

                    - `"azurerm_lb_nat_pool"`

                    - `"azurerm_lb_nat_rule"`

                    - `"azurerm_lb_rule"`

                    - `"azurerm_local_network_gateway"`

                    - `"azurerm_network_interface"`

                    - `"azurerm_network_interface_application_security_group_association"`

                    - `"azurerm_network_interface_backend_address_pool_association"`

                    - `"azurerm_network_interface_security_group_association"`

                    - `"azurerm_network_security_group"`

                    - `"azurerm_public_ip"`

                    - `"azurerm_route"`

                    - `"azurerm_route_table"`

                    - `"azurerm_subnet"`

                    - `"azurerm_subnet_route_table_association"`

                    - `"azurerm_virtual_machine"`

                    - `"azurerm_virtual_network_gateway_connection"`

                    - `"azurerm_virtual_network"`

                    - `"azurerm_virtual_network_gateway"`

                    - `"google_compute_network"`

                    - `"google_compute_subnetwork"`

                    - `"google_compute_vpn_gateway"`

                    - `"google_compute_vpn_tunnel"`

                    - `"google_compute_route"`

                    - `"google_compute_address"`

                    - `"google_compute_global_address"`

                    - `"google_compute_router"`

                    - `"google_compute_interconnect_attachment"`

                    - `"google_compute_ha_vpn_gateway"`

                    - `"google_compute_forwarding_rule"`

                    - `"google_compute_network_firewall_policy"`

                    - `"google_compute_network_firewall_policy_rule"`

                    - `"cloudflare_static_route"`

                    - `"cloudflare_ipsec_tunnel"`

                  - `title: string`

      - `name: string`

      - `visible_items: array of object { helpText, name, value }`

        - `helpText: optional string`

        - `name: optional string`

        - `value: optional object { item_type, string }  or object { item_type, yaml }  or object { item_type, yaml_diff }  or 2 more`

          - `McnStringItem object { item_type, string }`

            - `item_type: string`

            - `string: string`

          - `McnYamlItem object { item_type, yaml }`

            - `item_type: string`

            - `yaml: string`

          - `McnYamlDiffItem object { item_type, yaml_diff }`

            - `item_type: string`

            - `yaml_diff: object { diff, left_description, left_yaml, 2 more }`

              - `diff: string`

              - `left_description: string`

              - `left_yaml: string`

              - `right_description: string`

              - `right_yaml: string`

          - `McnResourcePreviewItem object { item_type, resource_preview }`

            - `item_type: string`

            - `resource_preview: object { id, cloud_type, detail, 3 more }`

              - `id: string`

              - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                - `"AWS"`

                - `"AZURE"`

                - `"GOOGLE"`

                - `"CLOUDFLARE"`

              - `detail: string`

              - `name: string`

              - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                - `"aws_customer_gateway"`

                - `"aws_egress_only_internet_gateway"`

                - `"aws_internet_gateway"`

                - `"aws_instance"`

                - `"aws_network_interface"`

                - `"aws_route"`

                - `"aws_route_table"`

                - `"aws_route_table_association"`

                - `"aws_subnet"`

                - `"aws_vpc"`

                - `"aws_vpc_ipv4_cidr_block_association"`

                - `"aws_vpn_connection"`

                - `"aws_vpn_connection_route"`

                - `"aws_vpn_gateway"`

                - `"aws_security_group"`

                - `"aws_vpc_security_group_ingress_rule"`

                - `"aws_vpc_security_group_egress_rule"`

                - `"aws_ec2_managed_prefix_list"`

                - `"aws_ec2_transit_gateway"`

                - `"aws_ec2_transit_gateway_prefix_list_reference"`

                - `"aws_ec2_transit_gateway_vpc_attachment"`

                - `"azurerm_application_security_group"`

                - `"azurerm_lb"`

                - `"azurerm_lb_backend_address_pool"`

                - `"azurerm_lb_nat_pool"`

                - `"azurerm_lb_nat_rule"`

                - `"azurerm_lb_rule"`

                - `"azurerm_local_network_gateway"`

                - `"azurerm_network_interface"`

                - `"azurerm_network_interface_application_security_group_association"`

                - `"azurerm_network_interface_backend_address_pool_association"`

                - `"azurerm_network_interface_security_group_association"`

                - `"azurerm_network_security_group"`

                - `"azurerm_public_ip"`

                - `"azurerm_route"`

                - `"azurerm_route_table"`

                - `"azurerm_subnet"`

                - `"azurerm_subnet_route_table_association"`

                - `"azurerm_virtual_machine"`

                - `"azurerm_virtual_network_gateway_connection"`

                - `"azurerm_virtual_network"`

                - `"azurerm_virtual_network_gateway"`

                - `"google_compute_network"`

                - `"google_compute_subnetwork"`

                - `"google_compute_vpn_gateway"`

                - `"google_compute_vpn_tunnel"`

                - `"google_compute_route"`

                - `"google_compute_address"`

                - `"google_compute_global_address"`

                - `"google_compute_router"`

                - `"google_compute_interconnect_attachment"`

                - `"google_compute_ha_vpn_gateway"`

                - `"google_compute_forwarding_rule"`

                - `"google_compute_network_firewall_policy"`

                - `"google_compute_network_firewall_policy_rule"`

                - `"cloudflare_static_route"`

                - `"cloudflare_ipsec_tunnel"`

              - `title: string`

          - `McnListItem object { item_type, list }`

            - `item_type: string`

            - `list: array of object { item_type, string }  or object { item_type, resource_preview }`

              - `McnStringItem object { item_type, string }`

                - `item_type: string`

                - `string: string`

              - `McnResourcePreviewItem object { item_type, resource_preview }`

                - `item_type: string`

                - `resource_preview: object { id, cloud_type, detail, 3 more }`

                  - `id: string`

                  - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                    - `"AWS"`

                    - `"AZURE"`

                    - `"GOOGLE"`

                    - `"CLOUDFLARE"`

                  - `detail: string`

                  - `name: string`

                  - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                    - `"aws_customer_gateway"`

                    - `"aws_egress_only_internet_gateway"`

                    - `"aws_internet_gateway"`

                    - `"aws_instance"`

                    - `"aws_network_interface"`

                    - `"aws_route"`

                    - `"aws_route_table"`

                    - `"aws_route_table_association"`

                    - `"aws_subnet"`

                    - `"aws_vpc"`

                    - `"aws_vpc_ipv4_cidr_block_association"`

                    - `"aws_vpn_connection"`

                    - `"aws_vpn_connection_route"`

                    - `"aws_vpn_gateway"`

                    - `"aws_security_group"`

                    - `"aws_vpc_security_group_ingress_rule"`

                    - `"aws_vpc_security_group_egress_rule"`

                    - `"aws_ec2_managed_prefix_list"`

                    - `"aws_ec2_transit_gateway"`

                    - `"aws_ec2_transit_gateway_prefix_list_reference"`

                    - `"aws_ec2_transit_gateway_vpc_attachment"`

                    - `"azurerm_application_security_group"`

                    - `"azurerm_lb"`

                    - `"azurerm_lb_backend_address_pool"`

                    - `"azurerm_lb_nat_pool"`

                    - `"azurerm_lb_nat_rule"`

                    - `"azurerm_lb_rule"`

                    - `"azurerm_local_network_gateway"`

                    - `"azurerm_network_interface"`

                    - `"azurerm_network_interface_application_security_group_association"`

                    - `"azurerm_network_interface_backend_address_pool_association"`

                    - `"azurerm_network_interface_security_group_association"`

                    - `"azurerm_network_security_group"`

                    - `"azurerm_public_ip"`

                    - `"azurerm_route"`

                    - `"azurerm_route_table"`

                    - `"azurerm_subnet"`

                    - `"azurerm_subnet_route_table_association"`

                    - `"azurerm_virtual_machine"`

                    - `"azurerm_virtual_network_gateway_connection"`

                    - `"azurerm_virtual_network"`

                    - `"azurerm_virtual_network_gateway"`

                    - `"google_compute_network"`

                    - `"google_compute_subnetwork"`

                    - `"google_compute_vpn_gateway"`

                    - `"google_compute_vpn_tunnel"`

                    - `"google_compute_route"`

                    - `"google_compute_address"`

                    - `"google_compute_global_address"`

                    - `"google_compute_router"`

                    - `"google_compute_interconnect_attachment"`

                    - `"google_compute_ha_vpn_gateway"`

                    - `"google_compute_forwarding_rule"`

                    - `"google_compute_network_firewall_policy"`

                    - `"google_compute_network_firewall_policy_rule"`

                    - `"cloudflare_static_route"`

                    - `"cloudflare_ipsec_tunnel"`

                  - `title: string`

      - `help_text: optional string`

    - `state: map[unknown]`

    - `tags: map[string]`

    - `updated_at: string`

    - `url: string`

    - `managed_by: optional array of object { id, client_type, name }`

      - `id: string`

      - `client_type: "MAGIC_WAN_CLOUD_ONRAMP"`

        - `"MAGIC_WAN_CLOUD_ONRAMP"`

      - `name: string`

  - `post_apply_resources_unavailable: optional boolean`

  - `region: optional string`

  - `status: optional object { apply_progress, lifecycle_state, plan_progress, 3 more }`

    - `apply_progress: object { done, total }`

      - `done: number`

      - `total: number`

    - `lifecycle_state: "OnrampNeedsApply" or "OnrampPendingPlan" or "OnrampPlanning" or 9 more`

      - `"OnrampNeedsApply"`

      - `"OnrampPendingPlan"`

      - `"OnrampPlanning"`

      - `"OnrampPlanFailed"`

      - `"OnrampPendingApproval"`

      - `"OnrampPendingApply"`

      - `"OnrampApplying"`

      - `"OnrampApplyFailed"`

      - `"OnrampActive"`

      - `"OnrampPendingDestroy"`

      - `"OnrampDestroying"`

      - `"OnrampDestroyFailed"`

    - `plan_progress: object { done, total }`

      - `done: number`

      - `total: number`

    - `routes: array of string`

    - `tunnels: array of string`

    - `lifecycle_errors: optional map[object { code, message, documentation_url, 2 more } ]`

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

  - `vpc: optional string`

  - `vpcs_by_id: optional map[object { id, account_id, cloud_type, 18 more } ]`

    - `id: string`

    - `account_id: string`

    - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

      - `"AWS"`

      - `"AZURE"`

      - `"GOOGLE"`

      - `"CLOUDFLARE"`

    - `config: map[unknown]`

    - `deployment_provider: string`

    - `managed: boolean`

    - `monthly_cost_estimate: object { currency, monthly_cost }`

      - `currency: string`

      - `monthly_cost: number`

    - `name: string`

    - `native_id: string`

    - `observations: map[object { first_observed_at, last_observed_at, provider_id, resource_id } ]`

      - `first_observed_at: string`

      - `last_observed_at: string`

      - `provider_id: string`

      - `resource_id: string`

    - `provider_ids: array of string`

    - `provider_names_by_id: map[string]`

    - `region: string`

    - `resource_group: string`

    - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

      - `"aws_customer_gateway"`

      - `"aws_egress_only_internet_gateway"`

      - `"aws_internet_gateway"`

      - `"aws_instance"`

      - `"aws_network_interface"`

      - `"aws_route"`

      - `"aws_route_table"`

      - `"aws_route_table_association"`

      - `"aws_subnet"`

      - `"aws_vpc"`

      - `"aws_vpc_ipv4_cidr_block_association"`

      - `"aws_vpn_connection"`

      - `"aws_vpn_connection_route"`

      - `"aws_vpn_gateway"`

      - `"aws_security_group"`

      - `"aws_vpc_security_group_ingress_rule"`

      - `"aws_vpc_security_group_egress_rule"`

      - `"aws_ec2_managed_prefix_list"`

      - `"aws_ec2_transit_gateway"`

      - `"aws_ec2_transit_gateway_prefix_list_reference"`

      - `"aws_ec2_transit_gateway_vpc_attachment"`

      - `"azurerm_application_security_group"`

      - `"azurerm_lb"`

      - `"azurerm_lb_backend_address_pool"`

      - `"azurerm_lb_nat_pool"`

      - `"azurerm_lb_nat_rule"`

      - `"azurerm_lb_rule"`

      - `"azurerm_local_network_gateway"`

      - `"azurerm_network_interface"`

      - `"azurerm_network_interface_application_security_group_association"`

      - `"azurerm_network_interface_backend_address_pool_association"`

      - `"azurerm_network_interface_security_group_association"`

      - `"azurerm_network_security_group"`

      - `"azurerm_public_ip"`

      - `"azurerm_route"`

      - `"azurerm_route_table"`

      - `"azurerm_subnet"`

      - `"azurerm_subnet_route_table_association"`

      - `"azurerm_virtual_machine"`

      - `"azurerm_virtual_network_gateway_connection"`

      - `"azurerm_virtual_network"`

      - `"azurerm_virtual_network_gateway"`

      - `"google_compute_network"`

      - `"google_compute_subnetwork"`

      - `"google_compute_vpn_gateway"`

      - `"google_compute_vpn_tunnel"`

      - `"google_compute_route"`

      - `"google_compute_address"`

      - `"google_compute_global_address"`

      - `"google_compute_router"`

      - `"google_compute_interconnect_attachment"`

      - `"google_compute_ha_vpn_gateway"`

      - `"google_compute_forwarding_rule"`

      - `"google_compute_network_firewall_policy"`

      - `"google_compute_network_firewall_policy_rule"`

      - `"cloudflare_static_route"`

      - `"cloudflare_ipsec_tunnel"`

    - `sections: array of object { hidden_items, name, visible_items, help_text }`

      - `hidden_items: array of object { helpText, name, value }`

        - `helpText: optional string`

        - `name: optional string`

        - `value: optional object { item_type, string }  or object { item_type, yaml }  or object { item_type, yaml_diff }  or 2 more`

          - `McnStringItem object { item_type, string }`

            - `item_type: string`

            - `string: string`

          - `McnYamlItem object { item_type, yaml }`

            - `item_type: string`

            - `yaml: string`

          - `McnYamlDiffItem object { item_type, yaml_diff }`

            - `item_type: string`

            - `yaml_diff: object { diff, left_description, left_yaml, 2 more }`

              - `diff: string`

              - `left_description: string`

              - `left_yaml: string`

              - `right_description: string`

              - `right_yaml: string`

          - `McnResourcePreviewItem object { item_type, resource_preview }`

            - `item_type: string`

            - `resource_preview: object { id, cloud_type, detail, 3 more }`

              - `id: string`

              - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                - `"AWS"`

                - `"AZURE"`

                - `"GOOGLE"`

                - `"CLOUDFLARE"`

              - `detail: string`

              - `name: string`

              - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                - `"aws_customer_gateway"`

                - `"aws_egress_only_internet_gateway"`

                - `"aws_internet_gateway"`

                - `"aws_instance"`

                - `"aws_network_interface"`

                - `"aws_route"`

                - `"aws_route_table"`

                - `"aws_route_table_association"`

                - `"aws_subnet"`

                - `"aws_vpc"`

                - `"aws_vpc_ipv4_cidr_block_association"`

                - `"aws_vpn_connection"`

                - `"aws_vpn_connection_route"`

                - `"aws_vpn_gateway"`

                - `"aws_security_group"`

                - `"aws_vpc_security_group_ingress_rule"`

                - `"aws_vpc_security_group_egress_rule"`

                - `"aws_ec2_managed_prefix_list"`

                - `"aws_ec2_transit_gateway"`

                - `"aws_ec2_transit_gateway_prefix_list_reference"`

                - `"aws_ec2_transit_gateway_vpc_attachment"`

                - `"azurerm_application_security_group"`

                - `"azurerm_lb"`

                - `"azurerm_lb_backend_address_pool"`

                - `"azurerm_lb_nat_pool"`

                - `"azurerm_lb_nat_rule"`

                - `"azurerm_lb_rule"`

                - `"azurerm_local_network_gateway"`

                - `"azurerm_network_interface"`

                - `"azurerm_network_interface_application_security_group_association"`

                - `"azurerm_network_interface_backend_address_pool_association"`

                - `"azurerm_network_interface_security_group_association"`

                - `"azurerm_network_security_group"`

                - `"azurerm_public_ip"`

                - `"azurerm_route"`

                - `"azurerm_route_table"`

                - `"azurerm_subnet"`

                - `"azurerm_subnet_route_table_association"`

                - `"azurerm_virtual_machine"`

                - `"azurerm_virtual_network_gateway_connection"`

                - `"azurerm_virtual_network"`

                - `"azurerm_virtual_network_gateway"`

                - `"google_compute_network"`

                - `"google_compute_subnetwork"`

                - `"google_compute_vpn_gateway"`

                - `"google_compute_vpn_tunnel"`

                - `"google_compute_route"`

                - `"google_compute_address"`

                - `"google_compute_global_address"`

                - `"google_compute_router"`

                - `"google_compute_interconnect_attachment"`

                - `"google_compute_ha_vpn_gateway"`

                - `"google_compute_forwarding_rule"`

                - `"google_compute_network_firewall_policy"`

                - `"google_compute_network_firewall_policy_rule"`

                - `"cloudflare_static_route"`

                - `"cloudflare_ipsec_tunnel"`

              - `title: string`

          - `McnListItem object { item_type, list }`

            - `item_type: string`

            - `list: array of object { item_type, string }  or object { item_type, resource_preview }`

              - `McnStringItem object { item_type, string }`

                - `item_type: string`

                - `string: string`

              - `McnResourcePreviewItem object { item_type, resource_preview }`

                - `item_type: string`

                - `resource_preview: object { id, cloud_type, detail, 3 more }`

                  - `id: string`

                  - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                    - `"AWS"`

                    - `"AZURE"`

                    - `"GOOGLE"`

                    - `"CLOUDFLARE"`

                  - `detail: string`

                  - `name: string`

                  - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                    - `"aws_customer_gateway"`

                    - `"aws_egress_only_internet_gateway"`

                    - `"aws_internet_gateway"`

                    - `"aws_instance"`

                    - `"aws_network_interface"`

                    - `"aws_route"`

                    - `"aws_route_table"`

                    - `"aws_route_table_association"`

                    - `"aws_subnet"`

                    - `"aws_vpc"`

                    - `"aws_vpc_ipv4_cidr_block_association"`

                    - `"aws_vpn_connection"`

                    - `"aws_vpn_connection_route"`

                    - `"aws_vpn_gateway"`

                    - `"aws_security_group"`

                    - `"aws_vpc_security_group_ingress_rule"`

                    - `"aws_vpc_security_group_egress_rule"`

                    - `"aws_ec2_managed_prefix_list"`

                    - `"aws_ec2_transit_gateway"`

                    - `"aws_ec2_transit_gateway_prefix_list_reference"`

                    - `"aws_ec2_transit_gateway_vpc_attachment"`

                    - `"azurerm_application_security_group"`

                    - `"azurerm_lb"`

                    - `"azurerm_lb_backend_address_pool"`

                    - `"azurerm_lb_nat_pool"`

                    - `"azurerm_lb_nat_rule"`

                    - `"azurerm_lb_rule"`

                    - `"azurerm_local_network_gateway"`

                    - `"azurerm_network_interface"`

                    - `"azurerm_network_interface_application_security_group_association"`

                    - `"azurerm_network_interface_backend_address_pool_association"`

                    - `"azurerm_network_interface_security_group_association"`

                    - `"azurerm_network_security_group"`

                    - `"azurerm_public_ip"`

                    - `"azurerm_route"`

                    - `"azurerm_route_table"`

                    - `"azurerm_subnet"`

                    - `"azurerm_subnet_route_table_association"`

                    - `"azurerm_virtual_machine"`

                    - `"azurerm_virtual_network_gateway_connection"`

                    - `"azurerm_virtual_network"`

                    - `"azurerm_virtual_network_gateway"`

                    - `"google_compute_network"`

                    - `"google_compute_subnetwork"`

                    - `"google_compute_vpn_gateway"`

                    - `"google_compute_vpn_tunnel"`

                    - `"google_compute_route"`

                    - `"google_compute_address"`

                    - `"google_compute_global_address"`

                    - `"google_compute_router"`

                    - `"google_compute_interconnect_attachment"`

                    - `"google_compute_ha_vpn_gateway"`

                    - `"google_compute_forwarding_rule"`

                    - `"google_compute_network_firewall_policy"`

                    - `"google_compute_network_firewall_policy_rule"`

                    - `"cloudflare_static_route"`

                    - `"cloudflare_ipsec_tunnel"`

                  - `title: string`

      - `name: string`

      - `visible_items: array of object { helpText, name, value }`

        - `helpText: optional string`

        - `name: optional string`

        - `value: optional object { item_type, string }  or object { item_type, yaml }  or object { item_type, yaml_diff }  or 2 more`

          - `McnStringItem object { item_type, string }`

            - `item_type: string`

            - `string: string`

          - `McnYamlItem object { item_type, yaml }`

            - `item_type: string`

            - `yaml: string`

          - `McnYamlDiffItem object { item_type, yaml_diff }`

            - `item_type: string`

            - `yaml_diff: object { diff, left_description, left_yaml, 2 more }`

              - `diff: string`

              - `left_description: string`

              - `left_yaml: string`

              - `right_description: string`

              - `right_yaml: string`

          - `McnResourcePreviewItem object { item_type, resource_preview }`

            - `item_type: string`

            - `resource_preview: object { id, cloud_type, detail, 3 more }`

              - `id: string`

              - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                - `"AWS"`

                - `"AZURE"`

                - `"GOOGLE"`

                - `"CLOUDFLARE"`

              - `detail: string`

              - `name: string`

              - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                - `"aws_customer_gateway"`

                - `"aws_egress_only_internet_gateway"`

                - `"aws_internet_gateway"`

                - `"aws_instance"`

                - `"aws_network_interface"`

                - `"aws_route"`

                - `"aws_route_table"`

                - `"aws_route_table_association"`

                - `"aws_subnet"`

                - `"aws_vpc"`

                - `"aws_vpc_ipv4_cidr_block_association"`

                - `"aws_vpn_connection"`

                - `"aws_vpn_connection_route"`

                - `"aws_vpn_gateway"`

                - `"aws_security_group"`

                - `"aws_vpc_security_group_ingress_rule"`

                - `"aws_vpc_security_group_egress_rule"`

                - `"aws_ec2_managed_prefix_list"`

                - `"aws_ec2_transit_gateway"`

                - `"aws_ec2_transit_gateway_prefix_list_reference"`

                - `"aws_ec2_transit_gateway_vpc_attachment"`

                - `"azurerm_application_security_group"`

                - `"azurerm_lb"`

                - `"azurerm_lb_backend_address_pool"`

                - `"azurerm_lb_nat_pool"`

                - `"azurerm_lb_nat_rule"`

                - `"azurerm_lb_rule"`

                - `"azurerm_local_network_gateway"`

                - `"azurerm_network_interface"`

                - `"azurerm_network_interface_application_security_group_association"`

                - `"azurerm_network_interface_backend_address_pool_association"`

                - `"azurerm_network_interface_security_group_association"`

                - `"azurerm_network_security_group"`

                - `"azurerm_public_ip"`

                - `"azurerm_route"`

                - `"azurerm_route_table"`

                - `"azurerm_subnet"`

                - `"azurerm_subnet_route_table_association"`

                - `"azurerm_virtual_machine"`

                - `"azurerm_virtual_network_gateway_connection"`

                - `"azurerm_virtual_network"`

                - `"azurerm_virtual_network_gateway"`

                - `"google_compute_network"`

                - `"google_compute_subnetwork"`

                - `"google_compute_vpn_gateway"`

                - `"google_compute_vpn_tunnel"`

                - `"google_compute_route"`

                - `"google_compute_address"`

                - `"google_compute_global_address"`

                - `"google_compute_router"`

                - `"google_compute_interconnect_attachment"`

                - `"google_compute_ha_vpn_gateway"`

                - `"google_compute_forwarding_rule"`

                - `"google_compute_network_firewall_policy"`

                - `"google_compute_network_firewall_policy_rule"`

                - `"cloudflare_static_route"`

                - `"cloudflare_ipsec_tunnel"`

              - `title: string`

          - `McnListItem object { item_type, list }`

            - `item_type: string`

            - `list: array of object { item_type, string }  or object { item_type, resource_preview }`

              - `McnStringItem object { item_type, string }`

                - `item_type: string`

                - `string: string`

              - `McnResourcePreviewItem object { item_type, resource_preview }`

                - `item_type: string`

                - `resource_preview: object { id, cloud_type, detail, 3 more }`

                  - `id: string`

                  - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                    - `"AWS"`

                    - `"AZURE"`

                    - `"GOOGLE"`

                    - `"CLOUDFLARE"`

                  - `detail: string`

                  - `name: string`

                  - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                    - `"aws_customer_gateway"`

                    - `"aws_egress_only_internet_gateway"`

                    - `"aws_internet_gateway"`

                    - `"aws_instance"`

                    - `"aws_network_interface"`

                    - `"aws_route"`

                    - `"aws_route_table"`

                    - `"aws_route_table_association"`

                    - `"aws_subnet"`

                    - `"aws_vpc"`

                    - `"aws_vpc_ipv4_cidr_block_association"`

                    - `"aws_vpn_connection"`

                    - `"aws_vpn_connection_route"`

                    - `"aws_vpn_gateway"`

                    - `"aws_security_group"`

                    - `"aws_vpc_security_group_ingress_rule"`

                    - `"aws_vpc_security_group_egress_rule"`

                    - `"aws_ec2_managed_prefix_list"`

                    - `"aws_ec2_transit_gateway"`

                    - `"aws_ec2_transit_gateway_prefix_list_reference"`

                    - `"aws_ec2_transit_gateway_vpc_attachment"`

                    - `"azurerm_application_security_group"`

                    - `"azurerm_lb"`

                    - `"azurerm_lb_backend_address_pool"`

                    - `"azurerm_lb_nat_pool"`

                    - `"azurerm_lb_nat_rule"`

                    - `"azurerm_lb_rule"`

                    - `"azurerm_local_network_gateway"`

                    - `"azurerm_network_interface"`

                    - `"azurerm_network_interface_application_security_group_association"`

                    - `"azurerm_network_interface_backend_address_pool_association"`

                    - `"azurerm_network_interface_security_group_association"`

                    - `"azurerm_network_security_group"`

                    - `"azurerm_public_ip"`

                    - `"azurerm_route"`

                    - `"azurerm_route_table"`

                    - `"azurerm_subnet"`

                    - `"azurerm_subnet_route_table_association"`

                    - `"azurerm_virtual_machine"`

                    - `"azurerm_virtual_network_gateway_connection"`

                    - `"azurerm_virtual_network"`

                    - `"azurerm_virtual_network_gateway"`

                    - `"google_compute_network"`

                    - `"google_compute_subnetwork"`

                    - `"google_compute_vpn_gateway"`

                    - `"google_compute_vpn_tunnel"`

                    - `"google_compute_route"`

                    - `"google_compute_address"`

                    - `"google_compute_global_address"`

                    - `"google_compute_router"`

                    - `"google_compute_interconnect_attachment"`

                    - `"google_compute_ha_vpn_gateway"`

                    - `"google_compute_forwarding_rule"`

                    - `"google_compute_network_firewall_policy"`

                    - `"google_compute_network_firewall_policy_rule"`

                    - `"cloudflare_static_route"`

                    - `"cloudflare_ipsec_tunnel"`

                  - `title: string`

      - `help_text: optional string`

    - `state: map[unknown]`

    - `tags: map[string]`

    - `updated_at: string`

    - `url: string`

    - `managed_by: optional array of object { id, client_type, name }`

      - `id: string`

      - `client_type: "MAGIC_WAN_CLOUD_ONRAMP"`

        - `"MAGIC_WAN_CLOUD_ONRAMP"`

      - `name: string`

  - `vpcs_by_id_unavailable: optional array of string`

    The list of vpc IDs for which resource details failed to generate.

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/cloud/onramps/$ONRAMP_ID \
    -X PUT \
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
    "dynamic_routing": true,
    "install_routes_in_cloud": true,
    "install_routes_in_magic_wan": true,
    "name": "name",
    "type": "OnrampTypeSingle",
    "updated_at": "updated_at",
    "attached_hubs": [
      "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
    ],
    "attached_vpcs": [
      "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
    ],
    "cloud_asn": 0,
    "description": "description",
    "hub": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "last_applied_at": "last_applied_at",
    "last_exported_at": "last_exported_at",
    "last_planned_at": "last_planned_at",
    "manage_hub_to_hub_attachments": true,
    "manage_vpc_to_hub_attachments": true,
    "planned_monthly_cost_estimate": {
      "currency": "currency",
      "current_monthly_cost": 0,
      "diff": 0,
      "proposed_monthly_cost": 0
    },
    "planned_resources": [
      {
        "diff": {
          "diff": "diff",
          "left_description": "left_description",
          "left_yaml": "left_yaml",
          "right_description": "right_description",
          "right_yaml": "right_yaml"
        },
        "keys_require_replace": [
          "string"
        ],
        "monthly_cost_estimate_diff": {
          "currency": "currency",
          "current_monthly_cost": 0,
          "diff": 0,
          "proposed_monthly_cost": 0
        },
        "planned_action": "no_op",
        "resource": {
          "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
          "cloud_type": "AWS",
          "detail": "detail",
          "name": "name",
          "resource_type": "aws_customer_gateway",
          "title": "title"
        }
      }
    ],
    "planned_resources_unavailable": true,
    "post_apply_monthly_cost_estimate": {
      "currency": "currency",
      "monthly_cost": 0
    },
    "post_apply_resources": {
      "foo": {
        "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
        "account_id": "account_id",
        "cloud_type": "AWS",
        "config": {
          "foo": "bar"
        },
        "deployment_provider": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
        "managed": true,
        "monthly_cost_estimate": {
          "currency": "currency",
          "monthly_cost": 0
        },
        "name": "name",
        "native_id": "native_id",
        "observations": {
          "foo": {
            "first_observed_at": "first_observed_at",
            "last_observed_at": "last_observed_at",
            "provider_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
            "resource_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
          }
        },
        "provider_ids": [
          "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
        ],
        "provider_names_by_id": {
          "foo": "string"
        },
        "region": "region",
        "resource_group": "resource_group",
        "resource_type": "aws_customer_gateway",
        "sections": [
          {
            "hidden_items": [
              {
                "helpText": "helpText",
                "name": "name",
                "value": {
                  "item_type": "item_type",
                  "string": "string"
                }
              }
            ],
            "name": "name",
            "visible_items": [
              {
                "helpText": "helpText",
                "name": "name",
                "value": {
                  "item_type": "item_type",
                  "string": "string"
                }
              }
            ],
            "help_text": "help_text"
          }
        ],
        "state": {
          "foo": "bar"
        },
        "tags": {
          "foo": "string"
        },
        "updated_at": "updated_at",
        "url": "url",
        "managed_by": [
          {
            "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
            "client_type": "MAGIC_WAN_CLOUD_ONRAMP",
            "name": "name"
          }
        ]
      }
    },
    "post_apply_resources_unavailable": true,
    "region": "region",
    "status": {
      "apply_progress": {
        "done": 0,
        "total": 0
      },
      "lifecycle_state": "OnrampNeedsApply",
      "plan_progress": {
        "done": 0,
        "total": 0
      },
      "routes": [
        "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
      ],
      "tunnels": [
        "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
      ],
      "lifecycle_errors": {
        "foo": {
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
      }
    },
    "vpc": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "vpcs_by_id": {
      "foo": {
        "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
        "account_id": "account_id",
        "cloud_type": "AWS",
        "config": {
          "foo": "bar"
        },
        "deployment_provider": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
        "managed": true,
        "monthly_cost_estimate": {
          "currency": "currency",
          "monthly_cost": 0
        },
        "name": "name",
        "native_id": "native_id",
        "observations": {
          "foo": {
            "first_observed_at": "first_observed_at",
            "last_observed_at": "last_observed_at",
            "provider_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
            "resource_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
          }
        },
        "provider_ids": [
          "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
        ],
        "provider_names_by_id": {
          "foo": "string"
        },
        "region": "region",
        "resource_group": "resource_group",
        "resource_type": "aws_customer_gateway",
        "sections": [
          {
            "hidden_items": [
              {
                "helpText": "helpText",
                "name": "name",
                "value": {
                  "item_type": "item_type",
                  "string": "string"
                }
              }
            ],
            "name": "name",
            "visible_items": [
              {
                "helpText": "helpText",
                "name": "name",
                "value": {
                  "item_type": "item_type",
                  "string": "string"
                }
              }
            ],
            "help_text": "help_text"
          }
        ],
        "state": {
          "foo": "bar"
        },
        "tags": {
          "foo": "string"
        },
        "updated_at": "updated_at",
        "url": "url",
        "managed_by": [
          {
            "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
            "client_type": "MAGIC_WAN_CLOUD_ONRAMP",
            "name": "name"
          }
        ]
      }
    },
    "vpcs_by_id_unavailable": [
      "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
    ]
  },
  "success": true
}
```

## Patch On-ramp

**patch** `/accounts/{account_id}/magic/cloud/onramps/{onramp_id}`

Update an On-ramp (Closed Beta).

### Path Parameters

- `account_id: string`

- `onramp_id: string`

### Body Parameters

- `attached_hubs: optional array of string`

- `attached_vpcs: optional array of string`

- `description: optional string`

- `install_routes_in_cloud: optional boolean`

- `install_routes_in_magic_wan: optional boolean`

- `manage_hub_to_hub_attachments: optional boolean`

- `manage_vpc_to_hub_attachments: optional boolean`

- `name: optional string`

- `vpc: optional string`

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

- `result: object { id, cloud_type, dynamic_routing, 26 more }`

  - `id: string`

  - `cloud_type: "AWS" or "AZURE" or "GOOGLE"`

    - `"AWS"`

    - `"AZURE"`

    - `"GOOGLE"`

  - `dynamic_routing: boolean`

  - `install_routes_in_cloud: boolean`

  - `install_routes_in_magic_wan: boolean`

  - `name: string`

  - `type: "OnrampTypeSingle" or "OnrampTypeHub"`

    - `"OnrampTypeSingle"`

    - `"OnrampTypeHub"`

  - `updated_at: string`

  - `attached_hubs: optional array of string`

  - `attached_vpcs: optional array of string`

  - `cloud_asn: optional number`

  - `description: optional string`

  - `hub: optional string`

  - `last_applied_at: optional string`

  - `last_exported_at: optional string`

  - `last_planned_at: optional string`

  - `manage_hub_to_hub_attachments: optional boolean`

  - `manage_vpc_to_hub_attachments: optional boolean`

  - `planned_monthly_cost_estimate: optional object { currency, current_monthly_cost, diff, proposed_monthly_cost }`

    - `currency: string`

    - `current_monthly_cost: number`

    - `diff: number`

    - `proposed_monthly_cost: number`

  - `planned_resources: optional array of object { diff, keys_require_replace, monthly_cost_estimate_diff, 2 more }`

    - `diff: object { diff, left_description, left_yaml, 2 more }`

      - `diff: string`

      - `left_description: string`

      - `left_yaml: string`

      - `right_description: string`

      - `right_yaml: string`

    - `keys_require_replace: array of string`

    - `monthly_cost_estimate_diff: object { currency, current_monthly_cost, diff, proposed_monthly_cost }`

      - `currency: string`

      - `current_monthly_cost: number`

      - `diff: number`

      - `proposed_monthly_cost: number`

    - `planned_action: "no_op" or "create" or "update" or 2 more`

      - `"no_op"`

      - `"create"`

      - `"update"`

      - `"replace"`

      - `"destroy"`

    - `resource: object { id, cloud_type, detail, 3 more }`

      - `id: string`

      - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

        - `"AWS"`

        - `"AZURE"`

        - `"GOOGLE"`

        - `"CLOUDFLARE"`

      - `detail: string`

      - `name: string`

      - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

        - `"aws_customer_gateway"`

        - `"aws_egress_only_internet_gateway"`

        - `"aws_internet_gateway"`

        - `"aws_instance"`

        - `"aws_network_interface"`

        - `"aws_route"`

        - `"aws_route_table"`

        - `"aws_route_table_association"`

        - `"aws_subnet"`

        - `"aws_vpc"`

        - `"aws_vpc_ipv4_cidr_block_association"`

        - `"aws_vpn_connection"`

        - `"aws_vpn_connection_route"`

        - `"aws_vpn_gateway"`

        - `"aws_security_group"`

        - `"aws_vpc_security_group_ingress_rule"`

        - `"aws_vpc_security_group_egress_rule"`

        - `"aws_ec2_managed_prefix_list"`

        - `"aws_ec2_transit_gateway"`

        - `"aws_ec2_transit_gateway_prefix_list_reference"`

        - `"aws_ec2_transit_gateway_vpc_attachment"`

        - `"azurerm_application_security_group"`

        - `"azurerm_lb"`

        - `"azurerm_lb_backend_address_pool"`

        - `"azurerm_lb_nat_pool"`

        - `"azurerm_lb_nat_rule"`

        - `"azurerm_lb_rule"`

        - `"azurerm_local_network_gateway"`

        - `"azurerm_network_interface"`

        - `"azurerm_network_interface_application_security_group_association"`

        - `"azurerm_network_interface_backend_address_pool_association"`

        - `"azurerm_network_interface_security_group_association"`

        - `"azurerm_network_security_group"`

        - `"azurerm_public_ip"`

        - `"azurerm_route"`

        - `"azurerm_route_table"`

        - `"azurerm_subnet"`

        - `"azurerm_subnet_route_table_association"`

        - `"azurerm_virtual_machine"`

        - `"azurerm_virtual_network_gateway_connection"`

        - `"azurerm_virtual_network"`

        - `"azurerm_virtual_network_gateway"`

        - `"google_compute_network"`

        - `"google_compute_subnetwork"`

        - `"google_compute_vpn_gateway"`

        - `"google_compute_vpn_tunnel"`

        - `"google_compute_route"`

        - `"google_compute_address"`

        - `"google_compute_global_address"`

        - `"google_compute_router"`

        - `"google_compute_interconnect_attachment"`

        - `"google_compute_ha_vpn_gateway"`

        - `"google_compute_forwarding_rule"`

        - `"google_compute_network_firewall_policy"`

        - `"google_compute_network_firewall_policy_rule"`

        - `"cloudflare_static_route"`

        - `"cloudflare_ipsec_tunnel"`

      - `title: string`

  - `planned_resources_unavailable: optional boolean`

  - `post_apply_monthly_cost_estimate: optional object { currency, monthly_cost }`

    - `currency: string`

    - `monthly_cost: number`

  - `post_apply_resources: optional map[object { id, account_id, cloud_type, 18 more } ]`

    - `id: string`

    - `account_id: string`

    - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

      - `"AWS"`

      - `"AZURE"`

      - `"GOOGLE"`

      - `"CLOUDFLARE"`

    - `config: map[unknown]`

    - `deployment_provider: string`

    - `managed: boolean`

    - `monthly_cost_estimate: object { currency, monthly_cost }`

      - `currency: string`

      - `monthly_cost: number`

    - `name: string`

    - `native_id: string`

    - `observations: map[object { first_observed_at, last_observed_at, provider_id, resource_id } ]`

      - `first_observed_at: string`

      - `last_observed_at: string`

      - `provider_id: string`

      - `resource_id: string`

    - `provider_ids: array of string`

    - `provider_names_by_id: map[string]`

    - `region: string`

    - `resource_group: string`

    - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

      - `"aws_customer_gateway"`

      - `"aws_egress_only_internet_gateway"`

      - `"aws_internet_gateway"`

      - `"aws_instance"`

      - `"aws_network_interface"`

      - `"aws_route"`

      - `"aws_route_table"`

      - `"aws_route_table_association"`

      - `"aws_subnet"`

      - `"aws_vpc"`

      - `"aws_vpc_ipv4_cidr_block_association"`

      - `"aws_vpn_connection"`

      - `"aws_vpn_connection_route"`

      - `"aws_vpn_gateway"`

      - `"aws_security_group"`

      - `"aws_vpc_security_group_ingress_rule"`

      - `"aws_vpc_security_group_egress_rule"`

      - `"aws_ec2_managed_prefix_list"`

      - `"aws_ec2_transit_gateway"`

      - `"aws_ec2_transit_gateway_prefix_list_reference"`

      - `"aws_ec2_transit_gateway_vpc_attachment"`

      - `"azurerm_application_security_group"`

      - `"azurerm_lb"`

      - `"azurerm_lb_backend_address_pool"`

      - `"azurerm_lb_nat_pool"`

      - `"azurerm_lb_nat_rule"`

      - `"azurerm_lb_rule"`

      - `"azurerm_local_network_gateway"`

      - `"azurerm_network_interface"`

      - `"azurerm_network_interface_application_security_group_association"`

      - `"azurerm_network_interface_backend_address_pool_association"`

      - `"azurerm_network_interface_security_group_association"`

      - `"azurerm_network_security_group"`

      - `"azurerm_public_ip"`

      - `"azurerm_route"`

      - `"azurerm_route_table"`

      - `"azurerm_subnet"`

      - `"azurerm_subnet_route_table_association"`

      - `"azurerm_virtual_machine"`

      - `"azurerm_virtual_network_gateway_connection"`

      - `"azurerm_virtual_network"`

      - `"azurerm_virtual_network_gateway"`

      - `"google_compute_network"`

      - `"google_compute_subnetwork"`

      - `"google_compute_vpn_gateway"`

      - `"google_compute_vpn_tunnel"`

      - `"google_compute_route"`

      - `"google_compute_address"`

      - `"google_compute_global_address"`

      - `"google_compute_router"`

      - `"google_compute_interconnect_attachment"`

      - `"google_compute_ha_vpn_gateway"`

      - `"google_compute_forwarding_rule"`

      - `"google_compute_network_firewall_policy"`

      - `"google_compute_network_firewall_policy_rule"`

      - `"cloudflare_static_route"`

      - `"cloudflare_ipsec_tunnel"`

    - `sections: array of object { hidden_items, name, visible_items, help_text }`

      - `hidden_items: array of object { helpText, name, value }`

        - `helpText: optional string`

        - `name: optional string`

        - `value: optional object { item_type, string }  or object { item_type, yaml }  or object { item_type, yaml_diff }  or 2 more`

          - `McnStringItem object { item_type, string }`

            - `item_type: string`

            - `string: string`

          - `McnYamlItem object { item_type, yaml }`

            - `item_type: string`

            - `yaml: string`

          - `McnYamlDiffItem object { item_type, yaml_diff }`

            - `item_type: string`

            - `yaml_diff: object { diff, left_description, left_yaml, 2 more }`

              - `diff: string`

              - `left_description: string`

              - `left_yaml: string`

              - `right_description: string`

              - `right_yaml: string`

          - `McnResourcePreviewItem object { item_type, resource_preview }`

            - `item_type: string`

            - `resource_preview: object { id, cloud_type, detail, 3 more }`

              - `id: string`

              - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                - `"AWS"`

                - `"AZURE"`

                - `"GOOGLE"`

                - `"CLOUDFLARE"`

              - `detail: string`

              - `name: string`

              - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                - `"aws_customer_gateway"`

                - `"aws_egress_only_internet_gateway"`

                - `"aws_internet_gateway"`

                - `"aws_instance"`

                - `"aws_network_interface"`

                - `"aws_route"`

                - `"aws_route_table"`

                - `"aws_route_table_association"`

                - `"aws_subnet"`

                - `"aws_vpc"`

                - `"aws_vpc_ipv4_cidr_block_association"`

                - `"aws_vpn_connection"`

                - `"aws_vpn_connection_route"`

                - `"aws_vpn_gateway"`

                - `"aws_security_group"`

                - `"aws_vpc_security_group_ingress_rule"`

                - `"aws_vpc_security_group_egress_rule"`

                - `"aws_ec2_managed_prefix_list"`

                - `"aws_ec2_transit_gateway"`

                - `"aws_ec2_transit_gateway_prefix_list_reference"`

                - `"aws_ec2_transit_gateway_vpc_attachment"`

                - `"azurerm_application_security_group"`

                - `"azurerm_lb"`

                - `"azurerm_lb_backend_address_pool"`

                - `"azurerm_lb_nat_pool"`

                - `"azurerm_lb_nat_rule"`

                - `"azurerm_lb_rule"`

                - `"azurerm_local_network_gateway"`

                - `"azurerm_network_interface"`

                - `"azurerm_network_interface_application_security_group_association"`

                - `"azurerm_network_interface_backend_address_pool_association"`

                - `"azurerm_network_interface_security_group_association"`

                - `"azurerm_network_security_group"`

                - `"azurerm_public_ip"`

                - `"azurerm_route"`

                - `"azurerm_route_table"`

                - `"azurerm_subnet"`

                - `"azurerm_subnet_route_table_association"`

                - `"azurerm_virtual_machine"`

                - `"azurerm_virtual_network_gateway_connection"`

                - `"azurerm_virtual_network"`

                - `"azurerm_virtual_network_gateway"`

                - `"google_compute_network"`

                - `"google_compute_subnetwork"`

                - `"google_compute_vpn_gateway"`

                - `"google_compute_vpn_tunnel"`

                - `"google_compute_route"`

                - `"google_compute_address"`

                - `"google_compute_global_address"`

                - `"google_compute_router"`

                - `"google_compute_interconnect_attachment"`

                - `"google_compute_ha_vpn_gateway"`

                - `"google_compute_forwarding_rule"`

                - `"google_compute_network_firewall_policy"`

                - `"google_compute_network_firewall_policy_rule"`

                - `"cloudflare_static_route"`

                - `"cloudflare_ipsec_tunnel"`

              - `title: string`

          - `McnListItem object { item_type, list }`

            - `item_type: string`

            - `list: array of object { item_type, string }  or object { item_type, resource_preview }`

              - `McnStringItem object { item_type, string }`

                - `item_type: string`

                - `string: string`

              - `McnResourcePreviewItem object { item_type, resource_preview }`

                - `item_type: string`

                - `resource_preview: object { id, cloud_type, detail, 3 more }`

                  - `id: string`

                  - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                    - `"AWS"`

                    - `"AZURE"`

                    - `"GOOGLE"`

                    - `"CLOUDFLARE"`

                  - `detail: string`

                  - `name: string`

                  - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                    - `"aws_customer_gateway"`

                    - `"aws_egress_only_internet_gateway"`

                    - `"aws_internet_gateway"`

                    - `"aws_instance"`

                    - `"aws_network_interface"`

                    - `"aws_route"`

                    - `"aws_route_table"`

                    - `"aws_route_table_association"`

                    - `"aws_subnet"`

                    - `"aws_vpc"`

                    - `"aws_vpc_ipv4_cidr_block_association"`

                    - `"aws_vpn_connection"`

                    - `"aws_vpn_connection_route"`

                    - `"aws_vpn_gateway"`

                    - `"aws_security_group"`

                    - `"aws_vpc_security_group_ingress_rule"`

                    - `"aws_vpc_security_group_egress_rule"`

                    - `"aws_ec2_managed_prefix_list"`

                    - `"aws_ec2_transit_gateway"`

                    - `"aws_ec2_transit_gateway_prefix_list_reference"`

                    - `"aws_ec2_transit_gateway_vpc_attachment"`

                    - `"azurerm_application_security_group"`

                    - `"azurerm_lb"`

                    - `"azurerm_lb_backend_address_pool"`

                    - `"azurerm_lb_nat_pool"`

                    - `"azurerm_lb_nat_rule"`

                    - `"azurerm_lb_rule"`

                    - `"azurerm_local_network_gateway"`

                    - `"azurerm_network_interface"`

                    - `"azurerm_network_interface_application_security_group_association"`

                    - `"azurerm_network_interface_backend_address_pool_association"`

                    - `"azurerm_network_interface_security_group_association"`

                    - `"azurerm_network_security_group"`

                    - `"azurerm_public_ip"`

                    - `"azurerm_route"`

                    - `"azurerm_route_table"`

                    - `"azurerm_subnet"`

                    - `"azurerm_subnet_route_table_association"`

                    - `"azurerm_virtual_machine"`

                    - `"azurerm_virtual_network_gateway_connection"`

                    - `"azurerm_virtual_network"`

                    - `"azurerm_virtual_network_gateway"`

                    - `"google_compute_network"`

                    - `"google_compute_subnetwork"`

                    - `"google_compute_vpn_gateway"`

                    - `"google_compute_vpn_tunnel"`

                    - `"google_compute_route"`

                    - `"google_compute_address"`

                    - `"google_compute_global_address"`

                    - `"google_compute_router"`

                    - `"google_compute_interconnect_attachment"`

                    - `"google_compute_ha_vpn_gateway"`

                    - `"google_compute_forwarding_rule"`

                    - `"google_compute_network_firewall_policy"`

                    - `"google_compute_network_firewall_policy_rule"`

                    - `"cloudflare_static_route"`

                    - `"cloudflare_ipsec_tunnel"`

                  - `title: string`

      - `name: string`

      - `visible_items: array of object { helpText, name, value }`

        - `helpText: optional string`

        - `name: optional string`

        - `value: optional object { item_type, string }  or object { item_type, yaml }  or object { item_type, yaml_diff }  or 2 more`

          - `McnStringItem object { item_type, string }`

            - `item_type: string`

            - `string: string`

          - `McnYamlItem object { item_type, yaml }`

            - `item_type: string`

            - `yaml: string`

          - `McnYamlDiffItem object { item_type, yaml_diff }`

            - `item_type: string`

            - `yaml_diff: object { diff, left_description, left_yaml, 2 more }`

              - `diff: string`

              - `left_description: string`

              - `left_yaml: string`

              - `right_description: string`

              - `right_yaml: string`

          - `McnResourcePreviewItem object { item_type, resource_preview }`

            - `item_type: string`

            - `resource_preview: object { id, cloud_type, detail, 3 more }`

              - `id: string`

              - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                - `"AWS"`

                - `"AZURE"`

                - `"GOOGLE"`

                - `"CLOUDFLARE"`

              - `detail: string`

              - `name: string`

              - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                - `"aws_customer_gateway"`

                - `"aws_egress_only_internet_gateway"`

                - `"aws_internet_gateway"`

                - `"aws_instance"`

                - `"aws_network_interface"`

                - `"aws_route"`

                - `"aws_route_table"`

                - `"aws_route_table_association"`

                - `"aws_subnet"`

                - `"aws_vpc"`

                - `"aws_vpc_ipv4_cidr_block_association"`

                - `"aws_vpn_connection"`

                - `"aws_vpn_connection_route"`

                - `"aws_vpn_gateway"`

                - `"aws_security_group"`

                - `"aws_vpc_security_group_ingress_rule"`

                - `"aws_vpc_security_group_egress_rule"`

                - `"aws_ec2_managed_prefix_list"`

                - `"aws_ec2_transit_gateway"`

                - `"aws_ec2_transit_gateway_prefix_list_reference"`

                - `"aws_ec2_transit_gateway_vpc_attachment"`

                - `"azurerm_application_security_group"`

                - `"azurerm_lb"`

                - `"azurerm_lb_backend_address_pool"`

                - `"azurerm_lb_nat_pool"`

                - `"azurerm_lb_nat_rule"`

                - `"azurerm_lb_rule"`

                - `"azurerm_local_network_gateway"`

                - `"azurerm_network_interface"`

                - `"azurerm_network_interface_application_security_group_association"`

                - `"azurerm_network_interface_backend_address_pool_association"`

                - `"azurerm_network_interface_security_group_association"`

                - `"azurerm_network_security_group"`

                - `"azurerm_public_ip"`

                - `"azurerm_route"`

                - `"azurerm_route_table"`

                - `"azurerm_subnet"`

                - `"azurerm_subnet_route_table_association"`

                - `"azurerm_virtual_machine"`

                - `"azurerm_virtual_network_gateway_connection"`

                - `"azurerm_virtual_network"`

                - `"azurerm_virtual_network_gateway"`

                - `"google_compute_network"`

                - `"google_compute_subnetwork"`

                - `"google_compute_vpn_gateway"`

                - `"google_compute_vpn_tunnel"`

                - `"google_compute_route"`

                - `"google_compute_address"`

                - `"google_compute_global_address"`

                - `"google_compute_router"`

                - `"google_compute_interconnect_attachment"`

                - `"google_compute_ha_vpn_gateway"`

                - `"google_compute_forwarding_rule"`

                - `"google_compute_network_firewall_policy"`

                - `"google_compute_network_firewall_policy_rule"`

                - `"cloudflare_static_route"`

                - `"cloudflare_ipsec_tunnel"`

              - `title: string`

          - `McnListItem object { item_type, list }`

            - `item_type: string`

            - `list: array of object { item_type, string }  or object { item_type, resource_preview }`

              - `McnStringItem object { item_type, string }`

                - `item_type: string`

                - `string: string`

              - `McnResourcePreviewItem object { item_type, resource_preview }`

                - `item_type: string`

                - `resource_preview: object { id, cloud_type, detail, 3 more }`

                  - `id: string`

                  - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                    - `"AWS"`

                    - `"AZURE"`

                    - `"GOOGLE"`

                    - `"CLOUDFLARE"`

                  - `detail: string`

                  - `name: string`

                  - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                    - `"aws_customer_gateway"`

                    - `"aws_egress_only_internet_gateway"`

                    - `"aws_internet_gateway"`

                    - `"aws_instance"`

                    - `"aws_network_interface"`

                    - `"aws_route"`

                    - `"aws_route_table"`

                    - `"aws_route_table_association"`

                    - `"aws_subnet"`

                    - `"aws_vpc"`

                    - `"aws_vpc_ipv4_cidr_block_association"`

                    - `"aws_vpn_connection"`

                    - `"aws_vpn_connection_route"`

                    - `"aws_vpn_gateway"`

                    - `"aws_security_group"`

                    - `"aws_vpc_security_group_ingress_rule"`

                    - `"aws_vpc_security_group_egress_rule"`

                    - `"aws_ec2_managed_prefix_list"`

                    - `"aws_ec2_transit_gateway"`

                    - `"aws_ec2_transit_gateway_prefix_list_reference"`

                    - `"aws_ec2_transit_gateway_vpc_attachment"`

                    - `"azurerm_application_security_group"`

                    - `"azurerm_lb"`

                    - `"azurerm_lb_backend_address_pool"`

                    - `"azurerm_lb_nat_pool"`

                    - `"azurerm_lb_nat_rule"`

                    - `"azurerm_lb_rule"`

                    - `"azurerm_local_network_gateway"`

                    - `"azurerm_network_interface"`

                    - `"azurerm_network_interface_application_security_group_association"`

                    - `"azurerm_network_interface_backend_address_pool_association"`

                    - `"azurerm_network_interface_security_group_association"`

                    - `"azurerm_network_security_group"`

                    - `"azurerm_public_ip"`

                    - `"azurerm_route"`

                    - `"azurerm_route_table"`

                    - `"azurerm_subnet"`

                    - `"azurerm_subnet_route_table_association"`

                    - `"azurerm_virtual_machine"`

                    - `"azurerm_virtual_network_gateway_connection"`

                    - `"azurerm_virtual_network"`

                    - `"azurerm_virtual_network_gateway"`

                    - `"google_compute_network"`

                    - `"google_compute_subnetwork"`

                    - `"google_compute_vpn_gateway"`

                    - `"google_compute_vpn_tunnel"`

                    - `"google_compute_route"`

                    - `"google_compute_address"`

                    - `"google_compute_global_address"`

                    - `"google_compute_router"`

                    - `"google_compute_interconnect_attachment"`

                    - `"google_compute_ha_vpn_gateway"`

                    - `"google_compute_forwarding_rule"`

                    - `"google_compute_network_firewall_policy"`

                    - `"google_compute_network_firewall_policy_rule"`

                    - `"cloudflare_static_route"`

                    - `"cloudflare_ipsec_tunnel"`

                  - `title: string`

      - `help_text: optional string`

    - `state: map[unknown]`

    - `tags: map[string]`

    - `updated_at: string`

    - `url: string`

    - `managed_by: optional array of object { id, client_type, name }`

      - `id: string`

      - `client_type: "MAGIC_WAN_CLOUD_ONRAMP"`

        - `"MAGIC_WAN_CLOUD_ONRAMP"`

      - `name: string`

  - `post_apply_resources_unavailable: optional boolean`

  - `region: optional string`

  - `status: optional object { apply_progress, lifecycle_state, plan_progress, 3 more }`

    - `apply_progress: object { done, total }`

      - `done: number`

      - `total: number`

    - `lifecycle_state: "OnrampNeedsApply" or "OnrampPendingPlan" or "OnrampPlanning" or 9 more`

      - `"OnrampNeedsApply"`

      - `"OnrampPendingPlan"`

      - `"OnrampPlanning"`

      - `"OnrampPlanFailed"`

      - `"OnrampPendingApproval"`

      - `"OnrampPendingApply"`

      - `"OnrampApplying"`

      - `"OnrampApplyFailed"`

      - `"OnrampActive"`

      - `"OnrampPendingDestroy"`

      - `"OnrampDestroying"`

      - `"OnrampDestroyFailed"`

    - `plan_progress: object { done, total }`

      - `done: number`

      - `total: number`

    - `routes: array of string`

    - `tunnels: array of string`

    - `lifecycle_errors: optional map[object { code, message, documentation_url, 2 more } ]`

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

  - `vpc: optional string`

  - `vpcs_by_id: optional map[object { id, account_id, cloud_type, 18 more } ]`

    - `id: string`

    - `account_id: string`

    - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

      - `"AWS"`

      - `"AZURE"`

      - `"GOOGLE"`

      - `"CLOUDFLARE"`

    - `config: map[unknown]`

    - `deployment_provider: string`

    - `managed: boolean`

    - `monthly_cost_estimate: object { currency, monthly_cost }`

      - `currency: string`

      - `monthly_cost: number`

    - `name: string`

    - `native_id: string`

    - `observations: map[object { first_observed_at, last_observed_at, provider_id, resource_id } ]`

      - `first_observed_at: string`

      - `last_observed_at: string`

      - `provider_id: string`

      - `resource_id: string`

    - `provider_ids: array of string`

    - `provider_names_by_id: map[string]`

    - `region: string`

    - `resource_group: string`

    - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

      - `"aws_customer_gateway"`

      - `"aws_egress_only_internet_gateway"`

      - `"aws_internet_gateway"`

      - `"aws_instance"`

      - `"aws_network_interface"`

      - `"aws_route"`

      - `"aws_route_table"`

      - `"aws_route_table_association"`

      - `"aws_subnet"`

      - `"aws_vpc"`

      - `"aws_vpc_ipv4_cidr_block_association"`

      - `"aws_vpn_connection"`

      - `"aws_vpn_connection_route"`

      - `"aws_vpn_gateway"`

      - `"aws_security_group"`

      - `"aws_vpc_security_group_ingress_rule"`

      - `"aws_vpc_security_group_egress_rule"`

      - `"aws_ec2_managed_prefix_list"`

      - `"aws_ec2_transit_gateway"`

      - `"aws_ec2_transit_gateway_prefix_list_reference"`

      - `"aws_ec2_transit_gateway_vpc_attachment"`

      - `"azurerm_application_security_group"`

      - `"azurerm_lb"`

      - `"azurerm_lb_backend_address_pool"`

      - `"azurerm_lb_nat_pool"`

      - `"azurerm_lb_nat_rule"`

      - `"azurerm_lb_rule"`

      - `"azurerm_local_network_gateway"`

      - `"azurerm_network_interface"`

      - `"azurerm_network_interface_application_security_group_association"`

      - `"azurerm_network_interface_backend_address_pool_association"`

      - `"azurerm_network_interface_security_group_association"`

      - `"azurerm_network_security_group"`

      - `"azurerm_public_ip"`

      - `"azurerm_route"`

      - `"azurerm_route_table"`

      - `"azurerm_subnet"`

      - `"azurerm_subnet_route_table_association"`

      - `"azurerm_virtual_machine"`

      - `"azurerm_virtual_network_gateway_connection"`

      - `"azurerm_virtual_network"`

      - `"azurerm_virtual_network_gateway"`

      - `"google_compute_network"`

      - `"google_compute_subnetwork"`

      - `"google_compute_vpn_gateway"`

      - `"google_compute_vpn_tunnel"`

      - `"google_compute_route"`

      - `"google_compute_address"`

      - `"google_compute_global_address"`

      - `"google_compute_router"`

      - `"google_compute_interconnect_attachment"`

      - `"google_compute_ha_vpn_gateway"`

      - `"google_compute_forwarding_rule"`

      - `"google_compute_network_firewall_policy"`

      - `"google_compute_network_firewall_policy_rule"`

      - `"cloudflare_static_route"`

      - `"cloudflare_ipsec_tunnel"`

    - `sections: array of object { hidden_items, name, visible_items, help_text }`

      - `hidden_items: array of object { helpText, name, value }`

        - `helpText: optional string`

        - `name: optional string`

        - `value: optional object { item_type, string }  or object { item_type, yaml }  or object { item_type, yaml_diff }  or 2 more`

          - `McnStringItem object { item_type, string }`

            - `item_type: string`

            - `string: string`

          - `McnYamlItem object { item_type, yaml }`

            - `item_type: string`

            - `yaml: string`

          - `McnYamlDiffItem object { item_type, yaml_diff }`

            - `item_type: string`

            - `yaml_diff: object { diff, left_description, left_yaml, 2 more }`

              - `diff: string`

              - `left_description: string`

              - `left_yaml: string`

              - `right_description: string`

              - `right_yaml: string`

          - `McnResourcePreviewItem object { item_type, resource_preview }`

            - `item_type: string`

            - `resource_preview: object { id, cloud_type, detail, 3 more }`

              - `id: string`

              - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                - `"AWS"`

                - `"AZURE"`

                - `"GOOGLE"`

                - `"CLOUDFLARE"`

              - `detail: string`

              - `name: string`

              - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                - `"aws_customer_gateway"`

                - `"aws_egress_only_internet_gateway"`

                - `"aws_internet_gateway"`

                - `"aws_instance"`

                - `"aws_network_interface"`

                - `"aws_route"`

                - `"aws_route_table"`

                - `"aws_route_table_association"`

                - `"aws_subnet"`

                - `"aws_vpc"`

                - `"aws_vpc_ipv4_cidr_block_association"`

                - `"aws_vpn_connection"`

                - `"aws_vpn_connection_route"`

                - `"aws_vpn_gateway"`

                - `"aws_security_group"`

                - `"aws_vpc_security_group_ingress_rule"`

                - `"aws_vpc_security_group_egress_rule"`

                - `"aws_ec2_managed_prefix_list"`

                - `"aws_ec2_transit_gateway"`

                - `"aws_ec2_transit_gateway_prefix_list_reference"`

                - `"aws_ec2_transit_gateway_vpc_attachment"`

                - `"azurerm_application_security_group"`

                - `"azurerm_lb"`

                - `"azurerm_lb_backend_address_pool"`

                - `"azurerm_lb_nat_pool"`

                - `"azurerm_lb_nat_rule"`

                - `"azurerm_lb_rule"`

                - `"azurerm_local_network_gateway"`

                - `"azurerm_network_interface"`

                - `"azurerm_network_interface_application_security_group_association"`

                - `"azurerm_network_interface_backend_address_pool_association"`

                - `"azurerm_network_interface_security_group_association"`

                - `"azurerm_network_security_group"`

                - `"azurerm_public_ip"`

                - `"azurerm_route"`

                - `"azurerm_route_table"`

                - `"azurerm_subnet"`

                - `"azurerm_subnet_route_table_association"`

                - `"azurerm_virtual_machine"`

                - `"azurerm_virtual_network_gateway_connection"`

                - `"azurerm_virtual_network"`

                - `"azurerm_virtual_network_gateway"`

                - `"google_compute_network"`

                - `"google_compute_subnetwork"`

                - `"google_compute_vpn_gateway"`

                - `"google_compute_vpn_tunnel"`

                - `"google_compute_route"`

                - `"google_compute_address"`

                - `"google_compute_global_address"`

                - `"google_compute_router"`

                - `"google_compute_interconnect_attachment"`

                - `"google_compute_ha_vpn_gateway"`

                - `"google_compute_forwarding_rule"`

                - `"google_compute_network_firewall_policy"`

                - `"google_compute_network_firewall_policy_rule"`

                - `"cloudflare_static_route"`

                - `"cloudflare_ipsec_tunnel"`

              - `title: string`

          - `McnListItem object { item_type, list }`

            - `item_type: string`

            - `list: array of object { item_type, string }  or object { item_type, resource_preview }`

              - `McnStringItem object { item_type, string }`

                - `item_type: string`

                - `string: string`

              - `McnResourcePreviewItem object { item_type, resource_preview }`

                - `item_type: string`

                - `resource_preview: object { id, cloud_type, detail, 3 more }`

                  - `id: string`

                  - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                    - `"AWS"`

                    - `"AZURE"`

                    - `"GOOGLE"`

                    - `"CLOUDFLARE"`

                  - `detail: string`

                  - `name: string`

                  - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                    - `"aws_customer_gateway"`

                    - `"aws_egress_only_internet_gateway"`

                    - `"aws_internet_gateway"`

                    - `"aws_instance"`

                    - `"aws_network_interface"`

                    - `"aws_route"`

                    - `"aws_route_table"`

                    - `"aws_route_table_association"`

                    - `"aws_subnet"`

                    - `"aws_vpc"`

                    - `"aws_vpc_ipv4_cidr_block_association"`

                    - `"aws_vpn_connection"`

                    - `"aws_vpn_connection_route"`

                    - `"aws_vpn_gateway"`

                    - `"aws_security_group"`

                    - `"aws_vpc_security_group_ingress_rule"`

                    - `"aws_vpc_security_group_egress_rule"`

                    - `"aws_ec2_managed_prefix_list"`

                    - `"aws_ec2_transit_gateway"`

                    - `"aws_ec2_transit_gateway_prefix_list_reference"`

                    - `"aws_ec2_transit_gateway_vpc_attachment"`

                    - `"azurerm_application_security_group"`

                    - `"azurerm_lb"`

                    - `"azurerm_lb_backend_address_pool"`

                    - `"azurerm_lb_nat_pool"`

                    - `"azurerm_lb_nat_rule"`

                    - `"azurerm_lb_rule"`

                    - `"azurerm_local_network_gateway"`

                    - `"azurerm_network_interface"`

                    - `"azurerm_network_interface_application_security_group_association"`

                    - `"azurerm_network_interface_backend_address_pool_association"`

                    - `"azurerm_network_interface_security_group_association"`

                    - `"azurerm_network_security_group"`

                    - `"azurerm_public_ip"`

                    - `"azurerm_route"`

                    - `"azurerm_route_table"`

                    - `"azurerm_subnet"`

                    - `"azurerm_subnet_route_table_association"`

                    - `"azurerm_virtual_machine"`

                    - `"azurerm_virtual_network_gateway_connection"`

                    - `"azurerm_virtual_network"`

                    - `"azurerm_virtual_network_gateway"`

                    - `"google_compute_network"`

                    - `"google_compute_subnetwork"`

                    - `"google_compute_vpn_gateway"`

                    - `"google_compute_vpn_tunnel"`

                    - `"google_compute_route"`

                    - `"google_compute_address"`

                    - `"google_compute_global_address"`

                    - `"google_compute_router"`

                    - `"google_compute_interconnect_attachment"`

                    - `"google_compute_ha_vpn_gateway"`

                    - `"google_compute_forwarding_rule"`

                    - `"google_compute_network_firewall_policy"`

                    - `"google_compute_network_firewall_policy_rule"`

                    - `"cloudflare_static_route"`

                    - `"cloudflare_ipsec_tunnel"`

                  - `title: string`

      - `name: string`

      - `visible_items: array of object { helpText, name, value }`

        - `helpText: optional string`

        - `name: optional string`

        - `value: optional object { item_type, string }  or object { item_type, yaml }  or object { item_type, yaml_diff }  or 2 more`

          - `McnStringItem object { item_type, string }`

            - `item_type: string`

            - `string: string`

          - `McnYamlItem object { item_type, yaml }`

            - `item_type: string`

            - `yaml: string`

          - `McnYamlDiffItem object { item_type, yaml_diff }`

            - `item_type: string`

            - `yaml_diff: object { diff, left_description, left_yaml, 2 more }`

              - `diff: string`

              - `left_description: string`

              - `left_yaml: string`

              - `right_description: string`

              - `right_yaml: string`

          - `McnResourcePreviewItem object { item_type, resource_preview }`

            - `item_type: string`

            - `resource_preview: object { id, cloud_type, detail, 3 more }`

              - `id: string`

              - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                - `"AWS"`

                - `"AZURE"`

                - `"GOOGLE"`

                - `"CLOUDFLARE"`

              - `detail: string`

              - `name: string`

              - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                - `"aws_customer_gateway"`

                - `"aws_egress_only_internet_gateway"`

                - `"aws_internet_gateway"`

                - `"aws_instance"`

                - `"aws_network_interface"`

                - `"aws_route"`

                - `"aws_route_table"`

                - `"aws_route_table_association"`

                - `"aws_subnet"`

                - `"aws_vpc"`

                - `"aws_vpc_ipv4_cidr_block_association"`

                - `"aws_vpn_connection"`

                - `"aws_vpn_connection_route"`

                - `"aws_vpn_gateway"`

                - `"aws_security_group"`

                - `"aws_vpc_security_group_ingress_rule"`

                - `"aws_vpc_security_group_egress_rule"`

                - `"aws_ec2_managed_prefix_list"`

                - `"aws_ec2_transit_gateway"`

                - `"aws_ec2_transit_gateway_prefix_list_reference"`

                - `"aws_ec2_transit_gateway_vpc_attachment"`

                - `"azurerm_application_security_group"`

                - `"azurerm_lb"`

                - `"azurerm_lb_backend_address_pool"`

                - `"azurerm_lb_nat_pool"`

                - `"azurerm_lb_nat_rule"`

                - `"azurerm_lb_rule"`

                - `"azurerm_local_network_gateway"`

                - `"azurerm_network_interface"`

                - `"azurerm_network_interface_application_security_group_association"`

                - `"azurerm_network_interface_backend_address_pool_association"`

                - `"azurerm_network_interface_security_group_association"`

                - `"azurerm_network_security_group"`

                - `"azurerm_public_ip"`

                - `"azurerm_route"`

                - `"azurerm_route_table"`

                - `"azurerm_subnet"`

                - `"azurerm_subnet_route_table_association"`

                - `"azurerm_virtual_machine"`

                - `"azurerm_virtual_network_gateway_connection"`

                - `"azurerm_virtual_network"`

                - `"azurerm_virtual_network_gateway"`

                - `"google_compute_network"`

                - `"google_compute_subnetwork"`

                - `"google_compute_vpn_gateway"`

                - `"google_compute_vpn_tunnel"`

                - `"google_compute_route"`

                - `"google_compute_address"`

                - `"google_compute_global_address"`

                - `"google_compute_router"`

                - `"google_compute_interconnect_attachment"`

                - `"google_compute_ha_vpn_gateway"`

                - `"google_compute_forwarding_rule"`

                - `"google_compute_network_firewall_policy"`

                - `"google_compute_network_firewall_policy_rule"`

                - `"cloudflare_static_route"`

                - `"cloudflare_ipsec_tunnel"`

              - `title: string`

          - `McnListItem object { item_type, list }`

            - `item_type: string`

            - `list: array of object { item_type, string }  or object { item_type, resource_preview }`

              - `McnStringItem object { item_type, string }`

                - `item_type: string`

                - `string: string`

              - `McnResourcePreviewItem object { item_type, resource_preview }`

                - `item_type: string`

                - `resource_preview: object { id, cloud_type, detail, 3 more }`

                  - `id: string`

                  - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                    - `"AWS"`

                    - `"AZURE"`

                    - `"GOOGLE"`

                    - `"CLOUDFLARE"`

                  - `detail: string`

                  - `name: string`

                  - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                    - `"aws_customer_gateway"`

                    - `"aws_egress_only_internet_gateway"`

                    - `"aws_internet_gateway"`

                    - `"aws_instance"`

                    - `"aws_network_interface"`

                    - `"aws_route"`

                    - `"aws_route_table"`

                    - `"aws_route_table_association"`

                    - `"aws_subnet"`

                    - `"aws_vpc"`

                    - `"aws_vpc_ipv4_cidr_block_association"`

                    - `"aws_vpn_connection"`

                    - `"aws_vpn_connection_route"`

                    - `"aws_vpn_gateway"`

                    - `"aws_security_group"`

                    - `"aws_vpc_security_group_ingress_rule"`

                    - `"aws_vpc_security_group_egress_rule"`

                    - `"aws_ec2_managed_prefix_list"`

                    - `"aws_ec2_transit_gateway"`

                    - `"aws_ec2_transit_gateway_prefix_list_reference"`

                    - `"aws_ec2_transit_gateway_vpc_attachment"`

                    - `"azurerm_application_security_group"`

                    - `"azurerm_lb"`

                    - `"azurerm_lb_backend_address_pool"`

                    - `"azurerm_lb_nat_pool"`

                    - `"azurerm_lb_nat_rule"`

                    - `"azurerm_lb_rule"`

                    - `"azurerm_local_network_gateway"`

                    - `"azurerm_network_interface"`

                    - `"azurerm_network_interface_application_security_group_association"`

                    - `"azurerm_network_interface_backend_address_pool_association"`

                    - `"azurerm_network_interface_security_group_association"`

                    - `"azurerm_network_security_group"`

                    - `"azurerm_public_ip"`

                    - `"azurerm_route"`

                    - `"azurerm_route_table"`

                    - `"azurerm_subnet"`

                    - `"azurerm_subnet_route_table_association"`

                    - `"azurerm_virtual_machine"`

                    - `"azurerm_virtual_network_gateway_connection"`

                    - `"azurerm_virtual_network"`

                    - `"azurerm_virtual_network_gateway"`

                    - `"google_compute_network"`

                    - `"google_compute_subnetwork"`

                    - `"google_compute_vpn_gateway"`

                    - `"google_compute_vpn_tunnel"`

                    - `"google_compute_route"`

                    - `"google_compute_address"`

                    - `"google_compute_global_address"`

                    - `"google_compute_router"`

                    - `"google_compute_interconnect_attachment"`

                    - `"google_compute_ha_vpn_gateway"`

                    - `"google_compute_forwarding_rule"`

                    - `"google_compute_network_firewall_policy"`

                    - `"google_compute_network_firewall_policy_rule"`

                    - `"cloudflare_static_route"`

                    - `"cloudflare_ipsec_tunnel"`

                  - `title: string`

      - `help_text: optional string`

    - `state: map[unknown]`

    - `tags: map[string]`

    - `updated_at: string`

    - `url: string`

    - `managed_by: optional array of object { id, client_type, name }`

      - `id: string`

      - `client_type: "MAGIC_WAN_CLOUD_ONRAMP"`

        - `"MAGIC_WAN_CLOUD_ONRAMP"`

      - `name: string`

  - `vpcs_by_id_unavailable: optional array of string`

    The list of vpc IDs for which resource details failed to generate.

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/cloud/onramps/$ONRAMP_ID \
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
    "dynamic_routing": true,
    "install_routes_in_cloud": true,
    "install_routes_in_magic_wan": true,
    "name": "name",
    "type": "OnrampTypeSingle",
    "updated_at": "updated_at",
    "attached_hubs": [
      "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
    ],
    "attached_vpcs": [
      "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
    ],
    "cloud_asn": 0,
    "description": "description",
    "hub": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "last_applied_at": "last_applied_at",
    "last_exported_at": "last_exported_at",
    "last_planned_at": "last_planned_at",
    "manage_hub_to_hub_attachments": true,
    "manage_vpc_to_hub_attachments": true,
    "planned_monthly_cost_estimate": {
      "currency": "currency",
      "current_monthly_cost": 0,
      "diff": 0,
      "proposed_monthly_cost": 0
    },
    "planned_resources": [
      {
        "diff": {
          "diff": "diff",
          "left_description": "left_description",
          "left_yaml": "left_yaml",
          "right_description": "right_description",
          "right_yaml": "right_yaml"
        },
        "keys_require_replace": [
          "string"
        ],
        "monthly_cost_estimate_diff": {
          "currency": "currency",
          "current_monthly_cost": 0,
          "diff": 0,
          "proposed_monthly_cost": 0
        },
        "planned_action": "no_op",
        "resource": {
          "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
          "cloud_type": "AWS",
          "detail": "detail",
          "name": "name",
          "resource_type": "aws_customer_gateway",
          "title": "title"
        }
      }
    ],
    "planned_resources_unavailable": true,
    "post_apply_monthly_cost_estimate": {
      "currency": "currency",
      "monthly_cost": 0
    },
    "post_apply_resources": {
      "foo": {
        "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
        "account_id": "account_id",
        "cloud_type": "AWS",
        "config": {
          "foo": "bar"
        },
        "deployment_provider": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
        "managed": true,
        "monthly_cost_estimate": {
          "currency": "currency",
          "monthly_cost": 0
        },
        "name": "name",
        "native_id": "native_id",
        "observations": {
          "foo": {
            "first_observed_at": "first_observed_at",
            "last_observed_at": "last_observed_at",
            "provider_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
            "resource_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
          }
        },
        "provider_ids": [
          "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
        ],
        "provider_names_by_id": {
          "foo": "string"
        },
        "region": "region",
        "resource_group": "resource_group",
        "resource_type": "aws_customer_gateway",
        "sections": [
          {
            "hidden_items": [
              {
                "helpText": "helpText",
                "name": "name",
                "value": {
                  "item_type": "item_type",
                  "string": "string"
                }
              }
            ],
            "name": "name",
            "visible_items": [
              {
                "helpText": "helpText",
                "name": "name",
                "value": {
                  "item_type": "item_type",
                  "string": "string"
                }
              }
            ],
            "help_text": "help_text"
          }
        ],
        "state": {
          "foo": "bar"
        },
        "tags": {
          "foo": "string"
        },
        "updated_at": "updated_at",
        "url": "url",
        "managed_by": [
          {
            "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
            "client_type": "MAGIC_WAN_CLOUD_ONRAMP",
            "name": "name"
          }
        ]
      }
    },
    "post_apply_resources_unavailable": true,
    "region": "region",
    "status": {
      "apply_progress": {
        "done": 0,
        "total": 0
      },
      "lifecycle_state": "OnrampNeedsApply",
      "plan_progress": {
        "done": 0,
        "total": 0
      },
      "routes": [
        "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
      ],
      "tunnels": [
        "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
      ],
      "lifecycle_errors": {
        "foo": {
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
      }
    },
    "vpc": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "vpcs_by_id": {
      "foo": {
        "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
        "account_id": "account_id",
        "cloud_type": "AWS",
        "config": {
          "foo": "bar"
        },
        "deployment_provider": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
        "managed": true,
        "monthly_cost_estimate": {
          "currency": "currency",
          "monthly_cost": 0
        },
        "name": "name",
        "native_id": "native_id",
        "observations": {
          "foo": {
            "first_observed_at": "first_observed_at",
            "last_observed_at": "last_observed_at",
            "provider_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
            "resource_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
          }
        },
        "provider_ids": [
          "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
        ],
        "provider_names_by_id": {
          "foo": "string"
        },
        "region": "region",
        "resource_group": "resource_group",
        "resource_type": "aws_customer_gateway",
        "sections": [
          {
            "hidden_items": [
              {
                "helpText": "helpText",
                "name": "name",
                "value": {
                  "item_type": "item_type",
                  "string": "string"
                }
              }
            ],
            "name": "name",
            "visible_items": [
              {
                "helpText": "helpText",
                "name": "name",
                "value": {
                  "item_type": "item_type",
                  "string": "string"
                }
              }
            ],
            "help_text": "help_text"
          }
        ],
        "state": {
          "foo": "bar"
        },
        "tags": {
          "foo": "string"
        },
        "updated_at": "updated_at",
        "url": "url",
        "managed_by": [
          {
            "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
            "client_type": "MAGIC_WAN_CLOUD_ONRAMP",
            "name": "name"
          }
        ]
      }
    },
    "vpcs_by_id_unavailable": [
      "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
    ]
  },
  "success": true
}
```

## Delete On-ramp

**delete** `/accounts/{account_id}/magic/cloud/onramps/{onramp_id}`

Delete an On-ramp (Closed Beta).

### Path Parameters

- `account_id: string`

- `onramp_id: string`

### Query Parameters

- `destroy: optional boolean`

- `force: optional boolean`

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

- `result: object { id }`

  - `id: string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/cloud/onramps/$ONRAMP_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
  },
  "success": true
}
```

## Apply On-ramp

**post** `/accounts/{account_id}/magic/cloud/onramps/{onramp_id}/apply`

Apply an On-ramp (Closed Beta).

### Path Parameters

- `account_id: string`

- `onramp_id: string`

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

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/cloud/onramps/$ONRAMP_ID/apply \
    -X POST \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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
  "success": true
}
```

## Export as Terraform

**post** `/accounts/{account_id}/magic/cloud/onramps/{onramp_id}/export`

Export an On-ramp to terraform ready file(s) (Closed Beta).

### Path Parameters

- `account_id: string`

- `onramp_id: string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/cloud/onramps/$ONRAMP_ID/export \
    -X POST \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

## Plan On-ramp

**post** `/accounts/{account_id}/magic/cloud/onramps/{onramp_id}/plan`

Plan an On-ramp (Closed Beta).

### Path Parameters

- `account_id: string`

- `onramp_id: string`

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

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/cloud/onramps/$ONRAMP_ID/plan \
    -X POST \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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
  "success": true
}
```

## Domain Types

### On Ramp List Response

- `OnRampListResponse object { id, cloud_type, dynamic_routing, 26 more }`

  - `id: string`

  - `cloud_type: "AWS" or "AZURE" or "GOOGLE"`

    - `"AWS"`

    - `"AZURE"`

    - `"GOOGLE"`

  - `dynamic_routing: boolean`

  - `install_routes_in_cloud: boolean`

  - `install_routes_in_magic_wan: boolean`

  - `name: string`

  - `type: "OnrampTypeSingle" or "OnrampTypeHub"`

    - `"OnrampTypeSingle"`

    - `"OnrampTypeHub"`

  - `updated_at: string`

  - `attached_hubs: optional array of string`

  - `attached_vpcs: optional array of string`

  - `cloud_asn: optional number`

  - `description: optional string`

  - `hub: optional string`

  - `last_applied_at: optional string`

  - `last_exported_at: optional string`

  - `last_planned_at: optional string`

  - `manage_hub_to_hub_attachments: optional boolean`

  - `manage_vpc_to_hub_attachments: optional boolean`

  - `planned_monthly_cost_estimate: optional object { currency, current_monthly_cost, diff, proposed_monthly_cost }`

    - `currency: string`

    - `current_monthly_cost: number`

    - `diff: number`

    - `proposed_monthly_cost: number`

  - `planned_resources: optional array of object { diff, keys_require_replace, monthly_cost_estimate_diff, 2 more }`

    - `diff: object { diff, left_description, left_yaml, 2 more }`

      - `diff: string`

      - `left_description: string`

      - `left_yaml: string`

      - `right_description: string`

      - `right_yaml: string`

    - `keys_require_replace: array of string`

    - `monthly_cost_estimate_diff: object { currency, current_monthly_cost, diff, proposed_monthly_cost }`

      - `currency: string`

      - `current_monthly_cost: number`

      - `diff: number`

      - `proposed_monthly_cost: number`

    - `planned_action: "no_op" or "create" or "update" or 2 more`

      - `"no_op"`

      - `"create"`

      - `"update"`

      - `"replace"`

      - `"destroy"`

    - `resource: object { id, cloud_type, detail, 3 more }`

      - `id: string`

      - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

        - `"AWS"`

        - `"AZURE"`

        - `"GOOGLE"`

        - `"CLOUDFLARE"`

      - `detail: string`

      - `name: string`

      - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

        - `"aws_customer_gateway"`

        - `"aws_egress_only_internet_gateway"`

        - `"aws_internet_gateway"`

        - `"aws_instance"`

        - `"aws_network_interface"`

        - `"aws_route"`

        - `"aws_route_table"`

        - `"aws_route_table_association"`

        - `"aws_subnet"`

        - `"aws_vpc"`

        - `"aws_vpc_ipv4_cidr_block_association"`

        - `"aws_vpn_connection"`

        - `"aws_vpn_connection_route"`

        - `"aws_vpn_gateway"`

        - `"aws_security_group"`

        - `"aws_vpc_security_group_ingress_rule"`

        - `"aws_vpc_security_group_egress_rule"`

        - `"aws_ec2_managed_prefix_list"`

        - `"aws_ec2_transit_gateway"`

        - `"aws_ec2_transit_gateway_prefix_list_reference"`

        - `"aws_ec2_transit_gateway_vpc_attachment"`

        - `"azurerm_application_security_group"`

        - `"azurerm_lb"`

        - `"azurerm_lb_backend_address_pool"`

        - `"azurerm_lb_nat_pool"`

        - `"azurerm_lb_nat_rule"`

        - `"azurerm_lb_rule"`

        - `"azurerm_local_network_gateway"`

        - `"azurerm_network_interface"`

        - `"azurerm_network_interface_application_security_group_association"`

        - `"azurerm_network_interface_backend_address_pool_association"`

        - `"azurerm_network_interface_security_group_association"`

        - `"azurerm_network_security_group"`

        - `"azurerm_public_ip"`

        - `"azurerm_route"`

        - `"azurerm_route_table"`

        - `"azurerm_subnet"`

        - `"azurerm_subnet_route_table_association"`

        - `"azurerm_virtual_machine"`

        - `"azurerm_virtual_network_gateway_connection"`

        - `"azurerm_virtual_network"`

        - `"azurerm_virtual_network_gateway"`

        - `"google_compute_network"`

        - `"google_compute_subnetwork"`

        - `"google_compute_vpn_gateway"`

        - `"google_compute_vpn_tunnel"`

        - `"google_compute_route"`

        - `"google_compute_address"`

        - `"google_compute_global_address"`

        - `"google_compute_router"`

        - `"google_compute_interconnect_attachment"`

        - `"google_compute_ha_vpn_gateway"`

        - `"google_compute_forwarding_rule"`

        - `"google_compute_network_firewall_policy"`

        - `"google_compute_network_firewall_policy_rule"`

        - `"cloudflare_static_route"`

        - `"cloudflare_ipsec_tunnel"`

      - `title: string`

  - `planned_resources_unavailable: optional boolean`

  - `post_apply_monthly_cost_estimate: optional object { currency, monthly_cost }`

    - `currency: string`

    - `monthly_cost: number`

  - `post_apply_resources: optional map[object { id, account_id, cloud_type, 18 more } ]`

    - `id: string`

    - `account_id: string`

    - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

      - `"AWS"`

      - `"AZURE"`

      - `"GOOGLE"`

      - `"CLOUDFLARE"`

    - `config: map[unknown]`

    - `deployment_provider: string`

    - `managed: boolean`

    - `monthly_cost_estimate: object { currency, monthly_cost }`

      - `currency: string`

      - `monthly_cost: number`

    - `name: string`

    - `native_id: string`

    - `observations: map[object { first_observed_at, last_observed_at, provider_id, resource_id } ]`

      - `first_observed_at: string`

      - `last_observed_at: string`

      - `provider_id: string`

      - `resource_id: string`

    - `provider_ids: array of string`

    - `provider_names_by_id: map[string]`

    - `region: string`

    - `resource_group: string`

    - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

      - `"aws_customer_gateway"`

      - `"aws_egress_only_internet_gateway"`

      - `"aws_internet_gateway"`

      - `"aws_instance"`

      - `"aws_network_interface"`

      - `"aws_route"`

      - `"aws_route_table"`

      - `"aws_route_table_association"`

      - `"aws_subnet"`

      - `"aws_vpc"`

      - `"aws_vpc_ipv4_cidr_block_association"`

      - `"aws_vpn_connection"`

      - `"aws_vpn_connection_route"`

      - `"aws_vpn_gateway"`

      - `"aws_security_group"`

      - `"aws_vpc_security_group_ingress_rule"`

      - `"aws_vpc_security_group_egress_rule"`

      - `"aws_ec2_managed_prefix_list"`

      - `"aws_ec2_transit_gateway"`

      - `"aws_ec2_transit_gateway_prefix_list_reference"`

      - `"aws_ec2_transit_gateway_vpc_attachment"`

      - `"azurerm_application_security_group"`

      - `"azurerm_lb"`

      - `"azurerm_lb_backend_address_pool"`

      - `"azurerm_lb_nat_pool"`

      - `"azurerm_lb_nat_rule"`

      - `"azurerm_lb_rule"`

      - `"azurerm_local_network_gateway"`

      - `"azurerm_network_interface"`

      - `"azurerm_network_interface_application_security_group_association"`

      - `"azurerm_network_interface_backend_address_pool_association"`

      - `"azurerm_network_interface_security_group_association"`

      - `"azurerm_network_security_group"`

      - `"azurerm_public_ip"`

      - `"azurerm_route"`

      - `"azurerm_route_table"`

      - `"azurerm_subnet"`

      - `"azurerm_subnet_route_table_association"`

      - `"azurerm_virtual_machine"`

      - `"azurerm_virtual_network_gateway_connection"`

      - `"azurerm_virtual_network"`

      - `"azurerm_virtual_network_gateway"`

      - `"google_compute_network"`

      - `"google_compute_subnetwork"`

      - `"google_compute_vpn_gateway"`

      - `"google_compute_vpn_tunnel"`

      - `"google_compute_route"`

      - `"google_compute_address"`

      - `"google_compute_global_address"`

      - `"google_compute_router"`

      - `"google_compute_interconnect_attachment"`

      - `"google_compute_ha_vpn_gateway"`

      - `"google_compute_forwarding_rule"`

      - `"google_compute_network_firewall_policy"`

      - `"google_compute_network_firewall_policy_rule"`

      - `"cloudflare_static_route"`

      - `"cloudflare_ipsec_tunnel"`

    - `sections: array of object { hidden_items, name, visible_items, help_text }`

      - `hidden_items: array of object { helpText, name, value }`

        - `helpText: optional string`

        - `name: optional string`

        - `value: optional object { item_type, string }  or object { item_type, yaml }  or object { item_type, yaml_diff }  or 2 more`

          - `McnStringItem object { item_type, string }`

            - `item_type: string`

            - `string: string`

          - `McnYamlItem object { item_type, yaml }`

            - `item_type: string`

            - `yaml: string`

          - `McnYamlDiffItem object { item_type, yaml_diff }`

            - `item_type: string`

            - `yaml_diff: object { diff, left_description, left_yaml, 2 more }`

              - `diff: string`

              - `left_description: string`

              - `left_yaml: string`

              - `right_description: string`

              - `right_yaml: string`

          - `McnResourcePreviewItem object { item_type, resource_preview }`

            - `item_type: string`

            - `resource_preview: object { id, cloud_type, detail, 3 more }`

              - `id: string`

              - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                - `"AWS"`

                - `"AZURE"`

                - `"GOOGLE"`

                - `"CLOUDFLARE"`

              - `detail: string`

              - `name: string`

              - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                - `"aws_customer_gateway"`

                - `"aws_egress_only_internet_gateway"`

                - `"aws_internet_gateway"`

                - `"aws_instance"`

                - `"aws_network_interface"`

                - `"aws_route"`

                - `"aws_route_table"`

                - `"aws_route_table_association"`

                - `"aws_subnet"`

                - `"aws_vpc"`

                - `"aws_vpc_ipv4_cidr_block_association"`

                - `"aws_vpn_connection"`

                - `"aws_vpn_connection_route"`

                - `"aws_vpn_gateway"`

                - `"aws_security_group"`

                - `"aws_vpc_security_group_ingress_rule"`

                - `"aws_vpc_security_group_egress_rule"`

                - `"aws_ec2_managed_prefix_list"`

                - `"aws_ec2_transit_gateway"`

                - `"aws_ec2_transit_gateway_prefix_list_reference"`

                - `"aws_ec2_transit_gateway_vpc_attachment"`

                - `"azurerm_application_security_group"`

                - `"azurerm_lb"`

                - `"azurerm_lb_backend_address_pool"`

                - `"azurerm_lb_nat_pool"`

                - `"azurerm_lb_nat_rule"`

                - `"azurerm_lb_rule"`

                - `"azurerm_local_network_gateway"`

                - `"azurerm_network_interface"`

                - `"azurerm_network_interface_application_security_group_association"`

                - `"azurerm_network_interface_backend_address_pool_association"`

                - `"azurerm_network_interface_security_group_association"`

                - `"azurerm_network_security_group"`

                - `"azurerm_public_ip"`

                - `"azurerm_route"`

                - `"azurerm_route_table"`

                - `"azurerm_subnet"`

                - `"azurerm_subnet_route_table_association"`

                - `"azurerm_virtual_machine"`

                - `"azurerm_virtual_network_gateway_connection"`

                - `"azurerm_virtual_network"`

                - `"azurerm_virtual_network_gateway"`

                - `"google_compute_network"`

                - `"google_compute_subnetwork"`

                - `"google_compute_vpn_gateway"`

                - `"google_compute_vpn_tunnel"`

                - `"google_compute_route"`

                - `"google_compute_address"`

                - `"google_compute_global_address"`

                - `"google_compute_router"`

                - `"google_compute_interconnect_attachment"`

                - `"google_compute_ha_vpn_gateway"`

                - `"google_compute_forwarding_rule"`

                - `"google_compute_network_firewall_policy"`

                - `"google_compute_network_firewall_policy_rule"`

                - `"cloudflare_static_route"`

                - `"cloudflare_ipsec_tunnel"`

              - `title: string`

          - `McnListItem object { item_type, list }`

            - `item_type: string`

            - `list: array of object { item_type, string }  or object { item_type, resource_preview }`

              - `McnStringItem object { item_type, string }`

                - `item_type: string`

                - `string: string`

              - `McnResourcePreviewItem object { item_type, resource_preview }`

                - `item_type: string`

                - `resource_preview: object { id, cloud_type, detail, 3 more }`

                  - `id: string`

                  - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                    - `"AWS"`

                    - `"AZURE"`

                    - `"GOOGLE"`

                    - `"CLOUDFLARE"`

                  - `detail: string`

                  - `name: string`

                  - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                    - `"aws_customer_gateway"`

                    - `"aws_egress_only_internet_gateway"`

                    - `"aws_internet_gateway"`

                    - `"aws_instance"`

                    - `"aws_network_interface"`

                    - `"aws_route"`

                    - `"aws_route_table"`

                    - `"aws_route_table_association"`

                    - `"aws_subnet"`

                    - `"aws_vpc"`

                    - `"aws_vpc_ipv4_cidr_block_association"`

                    - `"aws_vpn_connection"`

                    - `"aws_vpn_connection_route"`

                    - `"aws_vpn_gateway"`

                    - `"aws_security_group"`

                    - `"aws_vpc_security_group_ingress_rule"`

                    - `"aws_vpc_security_group_egress_rule"`

                    - `"aws_ec2_managed_prefix_list"`

                    - `"aws_ec2_transit_gateway"`

                    - `"aws_ec2_transit_gateway_prefix_list_reference"`

                    - `"aws_ec2_transit_gateway_vpc_attachment"`

                    - `"azurerm_application_security_group"`

                    - `"azurerm_lb"`

                    - `"azurerm_lb_backend_address_pool"`

                    - `"azurerm_lb_nat_pool"`

                    - `"azurerm_lb_nat_rule"`

                    - `"azurerm_lb_rule"`

                    - `"azurerm_local_network_gateway"`

                    - `"azurerm_network_interface"`

                    - `"azurerm_network_interface_application_security_group_association"`

                    - `"azurerm_network_interface_backend_address_pool_association"`

                    - `"azurerm_network_interface_security_group_association"`

                    - `"azurerm_network_security_group"`

                    - `"azurerm_public_ip"`

                    - `"azurerm_route"`

                    - `"azurerm_route_table"`

                    - `"azurerm_subnet"`

                    - `"azurerm_subnet_route_table_association"`

                    - `"azurerm_virtual_machine"`

                    - `"azurerm_virtual_network_gateway_connection"`

                    - `"azurerm_virtual_network"`

                    - `"azurerm_virtual_network_gateway"`

                    - `"google_compute_network"`

                    - `"google_compute_subnetwork"`

                    - `"google_compute_vpn_gateway"`

                    - `"google_compute_vpn_tunnel"`

                    - `"google_compute_route"`

                    - `"google_compute_address"`

                    - `"google_compute_global_address"`

                    - `"google_compute_router"`

                    - `"google_compute_interconnect_attachment"`

                    - `"google_compute_ha_vpn_gateway"`

                    - `"google_compute_forwarding_rule"`

                    - `"google_compute_network_firewall_policy"`

                    - `"google_compute_network_firewall_policy_rule"`

                    - `"cloudflare_static_route"`

                    - `"cloudflare_ipsec_tunnel"`

                  - `title: string`

      - `name: string`

      - `visible_items: array of object { helpText, name, value }`

        - `helpText: optional string`

        - `name: optional string`

        - `value: optional object { item_type, string }  or object { item_type, yaml }  or object { item_type, yaml_diff }  or 2 more`

          - `McnStringItem object { item_type, string }`

            - `item_type: string`

            - `string: string`

          - `McnYamlItem object { item_type, yaml }`

            - `item_type: string`

            - `yaml: string`

          - `McnYamlDiffItem object { item_type, yaml_diff }`

            - `item_type: string`

            - `yaml_diff: object { diff, left_description, left_yaml, 2 more }`

              - `diff: string`

              - `left_description: string`

              - `left_yaml: string`

              - `right_description: string`

              - `right_yaml: string`

          - `McnResourcePreviewItem object { item_type, resource_preview }`

            - `item_type: string`

            - `resource_preview: object { id, cloud_type, detail, 3 more }`

              - `id: string`

              - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                - `"AWS"`

                - `"AZURE"`

                - `"GOOGLE"`

                - `"CLOUDFLARE"`

              - `detail: string`

              - `name: string`

              - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                - `"aws_customer_gateway"`

                - `"aws_egress_only_internet_gateway"`

                - `"aws_internet_gateway"`

                - `"aws_instance"`

                - `"aws_network_interface"`

                - `"aws_route"`

                - `"aws_route_table"`

                - `"aws_route_table_association"`

                - `"aws_subnet"`

                - `"aws_vpc"`

                - `"aws_vpc_ipv4_cidr_block_association"`

                - `"aws_vpn_connection"`

                - `"aws_vpn_connection_route"`

                - `"aws_vpn_gateway"`

                - `"aws_security_group"`

                - `"aws_vpc_security_group_ingress_rule"`

                - `"aws_vpc_security_group_egress_rule"`

                - `"aws_ec2_managed_prefix_list"`

                - `"aws_ec2_transit_gateway"`

                - `"aws_ec2_transit_gateway_prefix_list_reference"`

                - `"aws_ec2_transit_gateway_vpc_attachment"`

                - `"azurerm_application_security_group"`

                - `"azurerm_lb"`

                - `"azurerm_lb_backend_address_pool"`

                - `"azurerm_lb_nat_pool"`

                - `"azurerm_lb_nat_rule"`

                - `"azurerm_lb_rule"`

                - `"azurerm_local_network_gateway"`

                - `"azurerm_network_interface"`

                - `"azurerm_network_interface_application_security_group_association"`

                - `"azurerm_network_interface_backend_address_pool_association"`

                - `"azurerm_network_interface_security_group_association"`

                - `"azurerm_network_security_group"`

                - `"azurerm_public_ip"`

                - `"azurerm_route"`

                - `"azurerm_route_table"`

                - `"azurerm_subnet"`

                - `"azurerm_subnet_route_table_association"`

                - `"azurerm_virtual_machine"`

                - `"azurerm_virtual_network_gateway_connection"`

                - `"azurerm_virtual_network"`

                - `"azurerm_virtual_network_gateway"`

                - `"google_compute_network"`

                - `"google_compute_subnetwork"`

                - `"google_compute_vpn_gateway"`

                - `"google_compute_vpn_tunnel"`

                - `"google_compute_route"`

                - `"google_compute_address"`

                - `"google_compute_global_address"`

                - `"google_compute_router"`

                - `"google_compute_interconnect_attachment"`

                - `"google_compute_ha_vpn_gateway"`

                - `"google_compute_forwarding_rule"`

                - `"google_compute_network_firewall_policy"`

                - `"google_compute_network_firewall_policy_rule"`

                - `"cloudflare_static_route"`

                - `"cloudflare_ipsec_tunnel"`

              - `title: string`

          - `McnListItem object { item_type, list }`

            - `item_type: string`

            - `list: array of object { item_type, string }  or object { item_type, resource_preview }`

              - `McnStringItem object { item_type, string }`

                - `item_type: string`

                - `string: string`

              - `McnResourcePreviewItem object { item_type, resource_preview }`

                - `item_type: string`

                - `resource_preview: object { id, cloud_type, detail, 3 more }`

                  - `id: string`

                  - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                    - `"AWS"`

                    - `"AZURE"`

                    - `"GOOGLE"`

                    - `"CLOUDFLARE"`

                  - `detail: string`

                  - `name: string`

                  - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                    - `"aws_customer_gateway"`

                    - `"aws_egress_only_internet_gateway"`

                    - `"aws_internet_gateway"`

                    - `"aws_instance"`

                    - `"aws_network_interface"`

                    - `"aws_route"`

                    - `"aws_route_table"`

                    - `"aws_route_table_association"`

                    - `"aws_subnet"`

                    - `"aws_vpc"`

                    - `"aws_vpc_ipv4_cidr_block_association"`

                    - `"aws_vpn_connection"`

                    - `"aws_vpn_connection_route"`

                    - `"aws_vpn_gateway"`

                    - `"aws_security_group"`

                    - `"aws_vpc_security_group_ingress_rule"`

                    - `"aws_vpc_security_group_egress_rule"`

                    - `"aws_ec2_managed_prefix_list"`

                    - `"aws_ec2_transit_gateway"`

                    - `"aws_ec2_transit_gateway_prefix_list_reference"`

                    - `"aws_ec2_transit_gateway_vpc_attachment"`

                    - `"azurerm_application_security_group"`

                    - `"azurerm_lb"`

                    - `"azurerm_lb_backend_address_pool"`

                    - `"azurerm_lb_nat_pool"`

                    - `"azurerm_lb_nat_rule"`

                    - `"azurerm_lb_rule"`

                    - `"azurerm_local_network_gateway"`

                    - `"azurerm_network_interface"`

                    - `"azurerm_network_interface_application_security_group_association"`

                    - `"azurerm_network_interface_backend_address_pool_association"`

                    - `"azurerm_network_interface_security_group_association"`

                    - `"azurerm_network_security_group"`

                    - `"azurerm_public_ip"`

                    - `"azurerm_route"`

                    - `"azurerm_route_table"`

                    - `"azurerm_subnet"`

                    - `"azurerm_subnet_route_table_association"`

                    - `"azurerm_virtual_machine"`

                    - `"azurerm_virtual_network_gateway_connection"`

                    - `"azurerm_virtual_network"`

                    - `"azurerm_virtual_network_gateway"`

                    - `"google_compute_network"`

                    - `"google_compute_subnetwork"`

                    - `"google_compute_vpn_gateway"`

                    - `"google_compute_vpn_tunnel"`

                    - `"google_compute_route"`

                    - `"google_compute_address"`

                    - `"google_compute_global_address"`

                    - `"google_compute_router"`

                    - `"google_compute_interconnect_attachment"`

                    - `"google_compute_ha_vpn_gateway"`

                    - `"google_compute_forwarding_rule"`

                    - `"google_compute_network_firewall_policy"`

                    - `"google_compute_network_firewall_policy_rule"`

                    - `"cloudflare_static_route"`

                    - `"cloudflare_ipsec_tunnel"`

                  - `title: string`

      - `help_text: optional string`

    - `state: map[unknown]`

    - `tags: map[string]`

    - `updated_at: string`

    - `url: string`

    - `managed_by: optional array of object { id, client_type, name }`

      - `id: string`

      - `client_type: "MAGIC_WAN_CLOUD_ONRAMP"`

        - `"MAGIC_WAN_CLOUD_ONRAMP"`

      - `name: string`

  - `post_apply_resources_unavailable: optional boolean`

  - `region: optional string`

  - `status: optional object { apply_progress, lifecycle_state, plan_progress, 3 more }`

    - `apply_progress: object { done, total }`

      - `done: number`

      - `total: number`

    - `lifecycle_state: "OnrampNeedsApply" or "OnrampPendingPlan" or "OnrampPlanning" or 9 more`

      - `"OnrampNeedsApply"`

      - `"OnrampPendingPlan"`

      - `"OnrampPlanning"`

      - `"OnrampPlanFailed"`

      - `"OnrampPendingApproval"`

      - `"OnrampPendingApply"`

      - `"OnrampApplying"`

      - `"OnrampApplyFailed"`

      - `"OnrampActive"`

      - `"OnrampPendingDestroy"`

      - `"OnrampDestroying"`

      - `"OnrampDestroyFailed"`

    - `plan_progress: object { done, total }`

      - `done: number`

      - `total: number`

    - `routes: array of string`

    - `tunnels: array of string`

    - `lifecycle_errors: optional map[object { code, message, documentation_url, 2 more } ]`

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

  - `vpc: optional string`

  - `vpcs_by_id: optional map[object { id, account_id, cloud_type, 18 more } ]`

    - `id: string`

    - `account_id: string`

    - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

      - `"AWS"`

      - `"AZURE"`

      - `"GOOGLE"`

      - `"CLOUDFLARE"`

    - `config: map[unknown]`

    - `deployment_provider: string`

    - `managed: boolean`

    - `monthly_cost_estimate: object { currency, monthly_cost }`

      - `currency: string`

      - `monthly_cost: number`

    - `name: string`

    - `native_id: string`

    - `observations: map[object { first_observed_at, last_observed_at, provider_id, resource_id } ]`

      - `first_observed_at: string`

      - `last_observed_at: string`

      - `provider_id: string`

      - `resource_id: string`

    - `provider_ids: array of string`

    - `provider_names_by_id: map[string]`

    - `region: string`

    - `resource_group: string`

    - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

      - `"aws_customer_gateway"`

      - `"aws_egress_only_internet_gateway"`

      - `"aws_internet_gateway"`

      - `"aws_instance"`

      - `"aws_network_interface"`

      - `"aws_route"`

      - `"aws_route_table"`

      - `"aws_route_table_association"`

      - `"aws_subnet"`

      - `"aws_vpc"`

      - `"aws_vpc_ipv4_cidr_block_association"`

      - `"aws_vpn_connection"`

      - `"aws_vpn_connection_route"`

      - `"aws_vpn_gateway"`

      - `"aws_security_group"`

      - `"aws_vpc_security_group_ingress_rule"`

      - `"aws_vpc_security_group_egress_rule"`

      - `"aws_ec2_managed_prefix_list"`

      - `"aws_ec2_transit_gateway"`

      - `"aws_ec2_transit_gateway_prefix_list_reference"`

      - `"aws_ec2_transit_gateway_vpc_attachment"`

      - `"azurerm_application_security_group"`

      - `"azurerm_lb"`

      - `"azurerm_lb_backend_address_pool"`

      - `"azurerm_lb_nat_pool"`

      - `"azurerm_lb_nat_rule"`

      - `"azurerm_lb_rule"`

      - `"azurerm_local_network_gateway"`

      - `"azurerm_network_interface"`

      - `"azurerm_network_interface_application_security_group_association"`

      - `"azurerm_network_interface_backend_address_pool_association"`

      - `"azurerm_network_interface_security_group_association"`

      - `"azurerm_network_security_group"`

      - `"azurerm_public_ip"`

      - `"azurerm_route"`

      - `"azurerm_route_table"`

      - `"azurerm_subnet"`

      - `"azurerm_subnet_route_table_association"`

      - `"azurerm_virtual_machine"`

      - `"azurerm_virtual_network_gateway_connection"`

      - `"azurerm_virtual_network"`

      - `"azurerm_virtual_network_gateway"`

      - `"google_compute_network"`

      - `"google_compute_subnetwork"`

      - `"google_compute_vpn_gateway"`

      - `"google_compute_vpn_tunnel"`

      - `"google_compute_route"`

      - `"google_compute_address"`

      - `"google_compute_global_address"`

      - `"google_compute_router"`

      - `"google_compute_interconnect_attachment"`

      - `"google_compute_ha_vpn_gateway"`

      - `"google_compute_forwarding_rule"`

      - `"google_compute_network_firewall_policy"`

      - `"google_compute_network_firewall_policy_rule"`

      - `"cloudflare_static_route"`

      - `"cloudflare_ipsec_tunnel"`

    - `sections: array of object { hidden_items, name, visible_items, help_text }`

      - `hidden_items: array of object { helpText, name, value }`

        - `helpText: optional string`

        - `name: optional string`

        - `value: optional object { item_type, string }  or object { item_type, yaml }  or object { item_type, yaml_diff }  or 2 more`

          - `McnStringItem object { item_type, string }`

            - `item_type: string`

            - `string: string`

          - `McnYamlItem object { item_type, yaml }`

            - `item_type: string`

            - `yaml: string`

          - `McnYamlDiffItem object { item_type, yaml_diff }`

            - `item_type: string`

            - `yaml_diff: object { diff, left_description, left_yaml, 2 more }`

              - `diff: string`

              - `left_description: string`

              - `left_yaml: string`

              - `right_description: string`

              - `right_yaml: string`

          - `McnResourcePreviewItem object { item_type, resource_preview }`

            - `item_type: string`

            - `resource_preview: object { id, cloud_type, detail, 3 more }`

              - `id: string`

              - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                - `"AWS"`

                - `"AZURE"`

                - `"GOOGLE"`

                - `"CLOUDFLARE"`

              - `detail: string`

              - `name: string`

              - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                - `"aws_customer_gateway"`

                - `"aws_egress_only_internet_gateway"`

                - `"aws_internet_gateway"`

                - `"aws_instance"`

                - `"aws_network_interface"`

                - `"aws_route"`

                - `"aws_route_table"`

                - `"aws_route_table_association"`

                - `"aws_subnet"`

                - `"aws_vpc"`

                - `"aws_vpc_ipv4_cidr_block_association"`

                - `"aws_vpn_connection"`

                - `"aws_vpn_connection_route"`

                - `"aws_vpn_gateway"`

                - `"aws_security_group"`

                - `"aws_vpc_security_group_ingress_rule"`

                - `"aws_vpc_security_group_egress_rule"`

                - `"aws_ec2_managed_prefix_list"`

                - `"aws_ec2_transit_gateway"`

                - `"aws_ec2_transit_gateway_prefix_list_reference"`

                - `"aws_ec2_transit_gateway_vpc_attachment"`

                - `"azurerm_application_security_group"`

                - `"azurerm_lb"`

                - `"azurerm_lb_backend_address_pool"`

                - `"azurerm_lb_nat_pool"`

                - `"azurerm_lb_nat_rule"`

                - `"azurerm_lb_rule"`

                - `"azurerm_local_network_gateway"`

                - `"azurerm_network_interface"`

                - `"azurerm_network_interface_application_security_group_association"`

                - `"azurerm_network_interface_backend_address_pool_association"`

                - `"azurerm_network_interface_security_group_association"`

                - `"azurerm_network_security_group"`

                - `"azurerm_public_ip"`

                - `"azurerm_route"`

                - `"azurerm_route_table"`

                - `"azurerm_subnet"`

                - `"azurerm_subnet_route_table_association"`

                - `"azurerm_virtual_machine"`

                - `"azurerm_virtual_network_gateway_connection"`

                - `"azurerm_virtual_network"`

                - `"azurerm_virtual_network_gateway"`

                - `"google_compute_network"`

                - `"google_compute_subnetwork"`

                - `"google_compute_vpn_gateway"`

                - `"google_compute_vpn_tunnel"`

                - `"google_compute_route"`

                - `"google_compute_address"`

                - `"google_compute_global_address"`

                - `"google_compute_router"`

                - `"google_compute_interconnect_attachment"`

                - `"google_compute_ha_vpn_gateway"`

                - `"google_compute_forwarding_rule"`

                - `"google_compute_network_firewall_policy"`

                - `"google_compute_network_firewall_policy_rule"`

                - `"cloudflare_static_route"`

                - `"cloudflare_ipsec_tunnel"`

              - `title: string`

          - `McnListItem object { item_type, list }`

            - `item_type: string`

            - `list: array of object { item_type, string }  or object { item_type, resource_preview }`

              - `McnStringItem object { item_type, string }`

                - `item_type: string`

                - `string: string`

              - `McnResourcePreviewItem object { item_type, resource_preview }`

                - `item_type: string`

                - `resource_preview: object { id, cloud_type, detail, 3 more }`

                  - `id: string`

                  - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                    - `"AWS"`

                    - `"AZURE"`

                    - `"GOOGLE"`

                    - `"CLOUDFLARE"`

                  - `detail: string`

                  - `name: string`

                  - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                    - `"aws_customer_gateway"`

                    - `"aws_egress_only_internet_gateway"`

                    - `"aws_internet_gateway"`

                    - `"aws_instance"`

                    - `"aws_network_interface"`

                    - `"aws_route"`

                    - `"aws_route_table"`

                    - `"aws_route_table_association"`

                    - `"aws_subnet"`

                    - `"aws_vpc"`

                    - `"aws_vpc_ipv4_cidr_block_association"`

                    - `"aws_vpn_connection"`

                    - `"aws_vpn_connection_route"`

                    - `"aws_vpn_gateway"`

                    - `"aws_security_group"`

                    - `"aws_vpc_security_group_ingress_rule"`

                    - `"aws_vpc_security_group_egress_rule"`

                    - `"aws_ec2_managed_prefix_list"`

                    - `"aws_ec2_transit_gateway"`

                    - `"aws_ec2_transit_gateway_prefix_list_reference"`

                    - `"aws_ec2_transit_gateway_vpc_attachment"`

                    - `"azurerm_application_security_group"`

                    - `"azurerm_lb"`

                    - `"azurerm_lb_backend_address_pool"`

                    - `"azurerm_lb_nat_pool"`

                    - `"azurerm_lb_nat_rule"`

                    - `"azurerm_lb_rule"`

                    - `"azurerm_local_network_gateway"`

                    - `"azurerm_network_interface"`

                    - `"azurerm_network_interface_application_security_group_association"`

                    - `"azurerm_network_interface_backend_address_pool_association"`

                    - `"azurerm_network_interface_security_group_association"`

                    - `"azurerm_network_security_group"`

                    - `"azurerm_public_ip"`

                    - `"azurerm_route"`

                    - `"azurerm_route_table"`

                    - `"azurerm_subnet"`

                    - `"azurerm_subnet_route_table_association"`

                    - `"azurerm_virtual_machine"`

                    - `"azurerm_virtual_network_gateway_connection"`

                    - `"azurerm_virtual_network"`

                    - `"azurerm_virtual_network_gateway"`

                    - `"google_compute_network"`

                    - `"google_compute_subnetwork"`

                    - `"google_compute_vpn_gateway"`

                    - `"google_compute_vpn_tunnel"`

                    - `"google_compute_route"`

                    - `"google_compute_address"`

                    - `"google_compute_global_address"`

                    - `"google_compute_router"`

                    - `"google_compute_interconnect_attachment"`

                    - `"google_compute_ha_vpn_gateway"`

                    - `"google_compute_forwarding_rule"`

                    - `"google_compute_network_firewall_policy"`

                    - `"google_compute_network_firewall_policy_rule"`

                    - `"cloudflare_static_route"`

                    - `"cloudflare_ipsec_tunnel"`

                  - `title: string`

      - `name: string`

      - `visible_items: array of object { helpText, name, value }`

        - `helpText: optional string`

        - `name: optional string`

        - `value: optional object { item_type, string }  or object { item_type, yaml }  or object { item_type, yaml_diff }  or 2 more`

          - `McnStringItem object { item_type, string }`

            - `item_type: string`

            - `string: string`

          - `McnYamlItem object { item_type, yaml }`

            - `item_type: string`

            - `yaml: string`

          - `McnYamlDiffItem object { item_type, yaml_diff }`

            - `item_type: string`

            - `yaml_diff: object { diff, left_description, left_yaml, 2 more }`

              - `diff: string`

              - `left_description: string`

              - `left_yaml: string`

              - `right_description: string`

              - `right_yaml: string`

          - `McnResourcePreviewItem object { item_type, resource_preview }`

            - `item_type: string`

            - `resource_preview: object { id, cloud_type, detail, 3 more }`

              - `id: string`

              - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                - `"AWS"`

                - `"AZURE"`

                - `"GOOGLE"`

                - `"CLOUDFLARE"`

              - `detail: string`

              - `name: string`

              - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                - `"aws_customer_gateway"`

                - `"aws_egress_only_internet_gateway"`

                - `"aws_internet_gateway"`

                - `"aws_instance"`

                - `"aws_network_interface"`

                - `"aws_route"`

                - `"aws_route_table"`

                - `"aws_route_table_association"`

                - `"aws_subnet"`

                - `"aws_vpc"`

                - `"aws_vpc_ipv4_cidr_block_association"`

                - `"aws_vpn_connection"`

                - `"aws_vpn_connection_route"`

                - `"aws_vpn_gateway"`

                - `"aws_security_group"`

                - `"aws_vpc_security_group_ingress_rule"`

                - `"aws_vpc_security_group_egress_rule"`

                - `"aws_ec2_managed_prefix_list"`

                - `"aws_ec2_transit_gateway"`

                - `"aws_ec2_transit_gateway_prefix_list_reference"`

                - `"aws_ec2_transit_gateway_vpc_attachment"`

                - `"azurerm_application_security_group"`

                - `"azurerm_lb"`

                - `"azurerm_lb_backend_address_pool"`

                - `"azurerm_lb_nat_pool"`

                - `"azurerm_lb_nat_rule"`

                - `"azurerm_lb_rule"`

                - `"azurerm_local_network_gateway"`

                - `"azurerm_network_interface"`

                - `"azurerm_network_interface_application_security_group_association"`

                - `"azurerm_network_interface_backend_address_pool_association"`

                - `"azurerm_network_interface_security_group_association"`

                - `"azurerm_network_security_group"`

                - `"azurerm_public_ip"`

                - `"azurerm_route"`

                - `"azurerm_route_table"`

                - `"azurerm_subnet"`

                - `"azurerm_subnet_route_table_association"`

                - `"azurerm_virtual_machine"`

                - `"azurerm_virtual_network_gateway_connection"`

                - `"azurerm_virtual_network"`

                - `"azurerm_virtual_network_gateway"`

                - `"google_compute_network"`

                - `"google_compute_subnetwork"`

                - `"google_compute_vpn_gateway"`

                - `"google_compute_vpn_tunnel"`

                - `"google_compute_route"`

                - `"google_compute_address"`

                - `"google_compute_global_address"`

                - `"google_compute_router"`

                - `"google_compute_interconnect_attachment"`

                - `"google_compute_ha_vpn_gateway"`

                - `"google_compute_forwarding_rule"`

                - `"google_compute_network_firewall_policy"`

                - `"google_compute_network_firewall_policy_rule"`

                - `"cloudflare_static_route"`

                - `"cloudflare_ipsec_tunnel"`

              - `title: string`

          - `McnListItem object { item_type, list }`

            - `item_type: string`

            - `list: array of object { item_type, string }  or object { item_type, resource_preview }`

              - `McnStringItem object { item_type, string }`

                - `item_type: string`

                - `string: string`

              - `McnResourcePreviewItem object { item_type, resource_preview }`

                - `item_type: string`

                - `resource_preview: object { id, cloud_type, detail, 3 more }`

                  - `id: string`

                  - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                    - `"AWS"`

                    - `"AZURE"`

                    - `"GOOGLE"`

                    - `"CLOUDFLARE"`

                  - `detail: string`

                  - `name: string`

                  - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                    - `"aws_customer_gateway"`

                    - `"aws_egress_only_internet_gateway"`

                    - `"aws_internet_gateway"`

                    - `"aws_instance"`

                    - `"aws_network_interface"`

                    - `"aws_route"`

                    - `"aws_route_table"`

                    - `"aws_route_table_association"`

                    - `"aws_subnet"`

                    - `"aws_vpc"`

                    - `"aws_vpc_ipv4_cidr_block_association"`

                    - `"aws_vpn_connection"`

                    - `"aws_vpn_connection_route"`

                    - `"aws_vpn_gateway"`

                    - `"aws_security_group"`

                    - `"aws_vpc_security_group_ingress_rule"`

                    - `"aws_vpc_security_group_egress_rule"`

                    - `"aws_ec2_managed_prefix_list"`

                    - `"aws_ec2_transit_gateway"`

                    - `"aws_ec2_transit_gateway_prefix_list_reference"`

                    - `"aws_ec2_transit_gateway_vpc_attachment"`

                    - `"azurerm_application_security_group"`

                    - `"azurerm_lb"`

                    - `"azurerm_lb_backend_address_pool"`

                    - `"azurerm_lb_nat_pool"`

                    - `"azurerm_lb_nat_rule"`

                    - `"azurerm_lb_rule"`

                    - `"azurerm_local_network_gateway"`

                    - `"azurerm_network_interface"`

                    - `"azurerm_network_interface_application_security_group_association"`

                    - `"azurerm_network_interface_backend_address_pool_association"`

                    - `"azurerm_network_interface_security_group_association"`

                    - `"azurerm_network_security_group"`

                    - `"azurerm_public_ip"`

                    - `"azurerm_route"`

                    - `"azurerm_route_table"`

                    - `"azurerm_subnet"`

                    - `"azurerm_subnet_route_table_association"`

                    - `"azurerm_virtual_machine"`

                    - `"azurerm_virtual_network_gateway_connection"`

                    - `"azurerm_virtual_network"`

                    - `"azurerm_virtual_network_gateway"`

                    - `"google_compute_network"`

                    - `"google_compute_subnetwork"`

                    - `"google_compute_vpn_gateway"`

                    - `"google_compute_vpn_tunnel"`

                    - `"google_compute_route"`

                    - `"google_compute_address"`

                    - `"google_compute_global_address"`

                    - `"google_compute_router"`

                    - `"google_compute_interconnect_attachment"`

                    - `"google_compute_ha_vpn_gateway"`

                    - `"google_compute_forwarding_rule"`

                    - `"google_compute_network_firewall_policy"`

                    - `"google_compute_network_firewall_policy_rule"`

                    - `"cloudflare_static_route"`

                    - `"cloudflare_ipsec_tunnel"`

                  - `title: string`

      - `help_text: optional string`

    - `state: map[unknown]`

    - `tags: map[string]`

    - `updated_at: string`

    - `url: string`

    - `managed_by: optional array of object { id, client_type, name }`

      - `id: string`

      - `client_type: "MAGIC_WAN_CLOUD_ONRAMP"`

        - `"MAGIC_WAN_CLOUD_ONRAMP"`

      - `name: string`

  - `vpcs_by_id_unavailable: optional array of string`

    The list of vpc IDs for which resource details failed to generate.

### On Ramp Get Response

- `OnRampGetResponse object { id, cloud_type, dynamic_routing, 26 more }`

  - `id: string`

  - `cloud_type: "AWS" or "AZURE" or "GOOGLE"`

    - `"AWS"`

    - `"AZURE"`

    - `"GOOGLE"`

  - `dynamic_routing: boolean`

  - `install_routes_in_cloud: boolean`

  - `install_routes_in_magic_wan: boolean`

  - `name: string`

  - `type: "OnrampTypeSingle" or "OnrampTypeHub"`

    - `"OnrampTypeSingle"`

    - `"OnrampTypeHub"`

  - `updated_at: string`

  - `attached_hubs: optional array of string`

  - `attached_vpcs: optional array of string`

  - `cloud_asn: optional number`

  - `description: optional string`

  - `hub: optional string`

  - `last_applied_at: optional string`

  - `last_exported_at: optional string`

  - `last_planned_at: optional string`

  - `manage_hub_to_hub_attachments: optional boolean`

  - `manage_vpc_to_hub_attachments: optional boolean`

  - `planned_monthly_cost_estimate: optional object { currency, current_monthly_cost, diff, proposed_monthly_cost }`

    - `currency: string`

    - `current_monthly_cost: number`

    - `diff: number`

    - `proposed_monthly_cost: number`

  - `planned_resources: optional array of object { diff, keys_require_replace, monthly_cost_estimate_diff, 2 more }`

    - `diff: object { diff, left_description, left_yaml, 2 more }`

      - `diff: string`

      - `left_description: string`

      - `left_yaml: string`

      - `right_description: string`

      - `right_yaml: string`

    - `keys_require_replace: array of string`

    - `monthly_cost_estimate_diff: object { currency, current_monthly_cost, diff, proposed_monthly_cost }`

      - `currency: string`

      - `current_monthly_cost: number`

      - `diff: number`

      - `proposed_monthly_cost: number`

    - `planned_action: "no_op" or "create" or "update" or 2 more`

      - `"no_op"`

      - `"create"`

      - `"update"`

      - `"replace"`

      - `"destroy"`

    - `resource: object { id, cloud_type, detail, 3 more }`

      - `id: string`

      - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

        - `"AWS"`

        - `"AZURE"`

        - `"GOOGLE"`

        - `"CLOUDFLARE"`

      - `detail: string`

      - `name: string`

      - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

        - `"aws_customer_gateway"`

        - `"aws_egress_only_internet_gateway"`

        - `"aws_internet_gateway"`

        - `"aws_instance"`

        - `"aws_network_interface"`

        - `"aws_route"`

        - `"aws_route_table"`

        - `"aws_route_table_association"`

        - `"aws_subnet"`

        - `"aws_vpc"`

        - `"aws_vpc_ipv4_cidr_block_association"`

        - `"aws_vpn_connection"`

        - `"aws_vpn_connection_route"`

        - `"aws_vpn_gateway"`

        - `"aws_security_group"`

        - `"aws_vpc_security_group_ingress_rule"`

        - `"aws_vpc_security_group_egress_rule"`

        - `"aws_ec2_managed_prefix_list"`

        - `"aws_ec2_transit_gateway"`

        - `"aws_ec2_transit_gateway_prefix_list_reference"`

        - `"aws_ec2_transit_gateway_vpc_attachment"`

        - `"azurerm_application_security_group"`

        - `"azurerm_lb"`

        - `"azurerm_lb_backend_address_pool"`

        - `"azurerm_lb_nat_pool"`

        - `"azurerm_lb_nat_rule"`

        - `"azurerm_lb_rule"`

        - `"azurerm_local_network_gateway"`

        - `"azurerm_network_interface"`

        - `"azurerm_network_interface_application_security_group_association"`

        - `"azurerm_network_interface_backend_address_pool_association"`

        - `"azurerm_network_interface_security_group_association"`

        - `"azurerm_network_security_group"`

        - `"azurerm_public_ip"`

        - `"azurerm_route"`

        - `"azurerm_route_table"`

        - `"azurerm_subnet"`

        - `"azurerm_subnet_route_table_association"`

        - `"azurerm_virtual_machine"`

        - `"azurerm_virtual_network_gateway_connection"`

        - `"azurerm_virtual_network"`

        - `"azurerm_virtual_network_gateway"`

        - `"google_compute_network"`

        - `"google_compute_subnetwork"`

        - `"google_compute_vpn_gateway"`

        - `"google_compute_vpn_tunnel"`

        - `"google_compute_route"`

        - `"google_compute_address"`

        - `"google_compute_global_address"`

        - `"google_compute_router"`

        - `"google_compute_interconnect_attachment"`

        - `"google_compute_ha_vpn_gateway"`

        - `"google_compute_forwarding_rule"`

        - `"google_compute_network_firewall_policy"`

        - `"google_compute_network_firewall_policy_rule"`

        - `"cloudflare_static_route"`

        - `"cloudflare_ipsec_tunnel"`

      - `title: string`

  - `planned_resources_unavailable: optional boolean`

  - `post_apply_monthly_cost_estimate: optional object { currency, monthly_cost }`

    - `currency: string`

    - `monthly_cost: number`

  - `post_apply_resources: optional map[object { id, account_id, cloud_type, 18 more } ]`

    - `id: string`

    - `account_id: string`

    - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

      - `"AWS"`

      - `"AZURE"`

      - `"GOOGLE"`

      - `"CLOUDFLARE"`

    - `config: map[unknown]`

    - `deployment_provider: string`

    - `managed: boolean`

    - `monthly_cost_estimate: object { currency, monthly_cost }`

      - `currency: string`

      - `monthly_cost: number`

    - `name: string`

    - `native_id: string`

    - `observations: map[object { first_observed_at, last_observed_at, provider_id, resource_id } ]`

      - `first_observed_at: string`

      - `last_observed_at: string`

      - `provider_id: string`

      - `resource_id: string`

    - `provider_ids: array of string`

    - `provider_names_by_id: map[string]`

    - `region: string`

    - `resource_group: string`

    - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

      - `"aws_customer_gateway"`

      - `"aws_egress_only_internet_gateway"`

      - `"aws_internet_gateway"`

      - `"aws_instance"`

      - `"aws_network_interface"`

      - `"aws_route"`

      - `"aws_route_table"`

      - `"aws_route_table_association"`

      - `"aws_subnet"`

      - `"aws_vpc"`

      - `"aws_vpc_ipv4_cidr_block_association"`

      - `"aws_vpn_connection"`

      - `"aws_vpn_connection_route"`

      - `"aws_vpn_gateway"`

      - `"aws_security_group"`

      - `"aws_vpc_security_group_ingress_rule"`

      - `"aws_vpc_security_group_egress_rule"`

      - `"aws_ec2_managed_prefix_list"`

      - `"aws_ec2_transit_gateway"`

      - `"aws_ec2_transit_gateway_prefix_list_reference"`

      - `"aws_ec2_transit_gateway_vpc_attachment"`

      - `"azurerm_application_security_group"`

      - `"azurerm_lb"`

      - `"azurerm_lb_backend_address_pool"`

      - `"azurerm_lb_nat_pool"`

      - `"azurerm_lb_nat_rule"`

      - `"azurerm_lb_rule"`

      - `"azurerm_local_network_gateway"`

      - `"azurerm_network_interface"`

      - `"azurerm_network_interface_application_security_group_association"`

      - `"azurerm_network_interface_backend_address_pool_association"`

      - `"azurerm_network_interface_security_group_association"`

      - `"azurerm_network_security_group"`

      - `"azurerm_public_ip"`

      - `"azurerm_route"`

      - `"azurerm_route_table"`

      - `"azurerm_subnet"`

      - `"azurerm_subnet_route_table_association"`

      - `"azurerm_virtual_machine"`

      - `"azurerm_virtual_network_gateway_connection"`

      - `"azurerm_virtual_network"`

      - `"azurerm_virtual_network_gateway"`

      - `"google_compute_network"`

      - `"google_compute_subnetwork"`

      - `"google_compute_vpn_gateway"`

      - `"google_compute_vpn_tunnel"`

      - `"google_compute_route"`

      - `"google_compute_address"`

      - `"google_compute_global_address"`

      - `"google_compute_router"`

      - `"google_compute_interconnect_attachment"`

      - `"google_compute_ha_vpn_gateway"`

      - `"google_compute_forwarding_rule"`

      - `"google_compute_network_firewall_policy"`

      - `"google_compute_network_firewall_policy_rule"`

      - `"cloudflare_static_route"`

      - `"cloudflare_ipsec_tunnel"`

    - `sections: array of object { hidden_items, name, visible_items, help_text }`

      - `hidden_items: array of object { helpText, name, value }`

        - `helpText: optional string`

        - `name: optional string`

        - `value: optional object { item_type, string }  or object { item_type, yaml }  or object { item_type, yaml_diff }  or 2 more`

          - `McnStringItem object { item_type, string }`

            - `item_type: string`

            - `string: string`

          - `McnYamlItem object { item_type, yaml }`

            - `item_type: string`

            - `yaml: string`

          - `McnYamlDiffItem object { item_type, yaml_diff }`

            - `item_type: string`

            - `yaml_diff: object { diff, left_description, left_yaml, 2 more }`

              - `diff: string`

              - `left_description: string`

              - `left_yaml: string`

              - `right_description: string`

              - `right_yaml: string`

          - `McnResourcePreviewItem object { item_type, resource_preview }`

            - `item_type: string`

            - `resource_preview: object { id, cloud_type, detail, 3 more }`

              - `id: string`

              - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                - `"AWS"`

                - `"AZURE"`

                - `"GOOGLE"`

                - `"CLOUDFLARE"`

              - `detail: string`

              - `name: string`

              - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                - `"aws_customer_gateway"`

                - `"aws_egress_only_internet_gateway"`

                - `"aws_internet_gateway"`

                - `"aws_instance"`

                - `"aws_network_interface"`

                - `"aws_route"`

                - `"aws_route_table"`

                - `"aws_route_table_association"`

                - `"aws_subnet"`

                - `"aws_vpc"`

                - `"aws_vpc_ipv4_cidr_block_association"`

                - `"aws_vpn_connection"`

                - `"aws_vpn_connection_route"`

                - `"aws_vpn_gateway"`

                - `"aws_security_group"`

                - `"aws_vpc_security_group_ingress_rule"`

                - `"aws_vpc_security_group_egress_rule"`

                - `"aws_ec2_managed_prefix_list"`

                - `"aws_ec2_transit_gateway"`

                - `"aws_ec2_transit_gateway_prefix_list_reference"`

                - `"aws_ec2_transit_gateway_vpc_attachment"`

                - `"azurerm_application_security_group"`

                - `"azurerm_lb"`

                - `"azurerm_lb_backend_address_pool"`

                - `"azurerm_lb_nat_pool"`

                - `"azurerm_lb_nat_rule"`

                - `"azurerm_lb_rule"`

                - `"azurerm_local_network_gateway"`

                - `"azurerm_network_interface"`

                - `"azurerm_network_interface_application_security_group_association"`

                - `"azurerm_network_interface_backend_address_pool_association"`

                - `"azurerm_network_interface_security_group_association"`

                - `"azurerm_network_security_group"`

                - `"azurerm_public_ip"`

                - `"azurerm_route"`

                - `"azurerm_route_table"`

                - `"azurerm_subnet"`

                - `"azurerm_subnet_route_table_association"`

                - `"azurerm_virtual_machine"`

                - `"azurerm_virtual_network_gateway_connection"`

                - `"azurerm_virtual_network"`

                - `"azurerm_virtual_network_gateway"`

                - `"google_compute_network"`

                - `"google_compute_subnetwork"`

                - `"google_compute_vpn_gateway"`

                - `"google_compute_vpn_tunnel"`

                - `"google_compute_route"`

                - `"google_compute_address"`

                - `"google_compute_global_address"`

                - `"google_compute_router"`

                - `"google_compute_interconnect_attachment"`

                - `"google_compute_ha_vpn_gateway"`

                - `"google_compute_forwarding_rule"`

                - `"google_compute_network_firewall_policy"`

                - `"google_compute_network_firewall_policy_rule"`

                - `"cloudflare_static_route"`

                - `"cloudflare_ipsec_tunnel"`

              - `title: string`

          - `McnListItem object { item_type, list }`

            - `item_type: string`

            - `list: array of object { item_type, string }  or object { item_type, resource_preview }`

              - `McnStringItem object { item_type, string }`

                - `item_type: string`

                - `string: string`

              - `McnResourcePreviewItem object { item_type, resource_preview }`

                - `item_type: string`

                - `resource_preview: object { id, cloud_type, detail, 3 more }`

                  - `id: string`

                  - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                    - `"AWS"`

                    - `"AZURE"`

                    - `"GOOGLE"`

                    - `"CLOUDFLARE"`

                  - `detail: string`

                  - `name: string`

                  - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                    - `"aws_customer_gateway"`

                    - `"aws_egress_only_internet_gateway"`

                    - `"aws_internet_gateway"`

                    - `"aws_instance"`

                    - `"aws_network_interface"`

                    - `"aws_route"`

                    - `"aws_route_table"`

                    - `"aws_route_table_association"`

                    - `"aws_subnet"`

                    - `"aws_vpc"`

                    - `"aws_vpc_ipv4_cidr_block_association"`

                    - `"aws_vpn_connection"`

                    - `"aws_vpn_connection_route"`

                    - `"aws_vpn_gateway"`

                    - `"aws_security_group"`

                    - `"aws_vpc_security_group_ingress_rule"`

                    - `"aws_vpc_security_group_egress_rule"`

                    - `"aws_ec2_managed_prefix_list"`

                    - `"aws_ec2_transit_gateway"`

                    - `"aws_ec2_transit_gateway_prefix_list_reference"`

                    - `"aws_ec2_transit_gateway_vpc_attachment"`

                    - `"azurerm_application_security_group"`

                    - `"azurerm_lb"`

                    - `"azurerm_lb_backend_address_pool"`

                    - `"azurerm_lb_nat_pool"`

                    - `"azurerm_lb_nat_rule"`

                    - `"azurerm_lb_rule"`

                    - `"azurerm_local_network_gateway"`

                    - `"azurerm_network_interface"`

                    - `"azurerm_network_interface_application_security_group_association"`

                    - `"azurerm_network_interface_backend_address_pool_association"`

                    - `"azurerm_network_interface_security_group_association"`

                    - `"azurerm_network_security_group"`

                    - `"azurerm_public_ip"`

                    - `"azurerm_route"`

                    - `"azurerm_route_table"`

                    - `"azurerm_subnet"`

                    - `"azurerm_subnet_route_table_association"`

                    - `"azurerm_virtual_machine"`

                    - `"azurerm_virtual_network_gateway_connection"`

                    - `"azurerm_virtual_network"`

                    - `"azurerm_virtual_network_gateway"`

                    - `"google_compute_network"`

                    - `"google_compute_subnetwork"`

                    - `"google_compute_vpn_gateway"`

                    - `"google_compute_vpn_tunnel"`

                    - `"google_compute_route"`

                    - `"google_compute_address"`

                    - `"google_compute_global_address"`

                    - `"google_compute_router"`

                    - `"google_compute_interconnect_attachment"`

                    - `"google_compute_ha_vpn_gateway"`

                    - `"google_compute_forwarding_rule"`

                    - `"google_compute_network_firewall_policy"`

                    - `"google_compute_network_firewall_policy_rule"`

                    - `"cloudflare_static_route"`

                    - `"cloudflare_ipsec_tunnel"`

                  - `title: string`

      - `name: string`

      - `visible_items: array of object { helpText, name, value }`

        - `helpText: optional string`

        - `name: optional string`

        - `value: optional object { item_type, string }  or object { item_type, yaml }  or object { item_type, yaml_diff }  or 2 more`

          - `McnStringItem object { item_type, string }`

            - `item_type: string`

            - `string: string`

          - `McnYamlItem object { item_type, yaml }`

            - `item_type: string`

            - `yaml: string`

          - `McnYamlDiffItem object { item_type, yaml_diff }`

            - `item_type: string`

            - `yaml_diff: object { diff, left_description, left_yaml, 2 more }`

              - `diff: string`

              - `left_description: string`

              - `left_yaml: string`

              - `right_description: string`

              - `right_yaml: string`

          - `McnResourcePreviewItem object { item_type, resource_preview }`

            - `item_type: string`

            - `resource_preview: object { id, cloud_type, detail, 3 more }`

              - `id: string`

              - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                - `"AWS"`

                - `"AZURE"`

                - `"GOOGLE"`

                - `"CLOUDFLARE"`

              - `detail: string`

              - `name: string`

              - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                - `"aws_customer_gateway"`

                - `"aws_egress_only_internet_gateway"`

                - `"aws_internet_gateway"`

                - `"aws_instance"`

                - `"aws_network_interface"`

                - `"aws_route"`

                - `"aws_route_table"`

                - `"aws_route_table_association"`

                - `"aws_subnet"`

                - `"aws_vpc"`

                - `"aws_vpc_ipv4_cidr_block_association"`

                - `"aws_vpn_connection"`

                - `"aws_vpn_connection_route"`

                - `"aws_vpn_gateway"`

                - `"aws_security_group"`

                - `"aws_vpc_security_group_ingress_rule"`

                - `"aws_vpc_security_group_egress_rule"`

                - `"aws_ec2_managed_prefix_list"`

                - `"aws_ec2_transit_gateway"`

                - `"aws_ec2_transit_gateway_prefix_list_reference"`

                - `"aws_ec2_transit_gateway_vpc_attachment"`

                - `"azurerm_application_security_group"`

                - `"azurerm_lb"`

                - `"azurerm_lb_backend_address_pool"`

                - `"azurerm_lb_nat_pool"`

                - `"azurerm_lb_nat_rule"`

                - `"azurerm_lb_rule"`

                - `"azurerm_local_network_gateway"`

                - `"azurerm_network_interface"`

                - `"azurerm_network_interface_application_security_group_association"`

                - `"azurerm_network_interface_backend_address_pool_association"`

                - `"azurerm_network_interface_security_group_association"`

                - `"azurerm_network_security_group"`

                - `"azurerm_public_ip"`

                - `"azurerm_route"`

                - `"azurerm_route_table"`

                - `"azurerm_subnet"`

                - `"azurerm_subnet_route_table_association"`

                - `"azurerm_virtual_machine"`

                - `"azurerm_virtual_network_gateway_connection"`

                - `"azurerm_virtual_network"`

                - `"azurerm_virtual_network_gateway"`

                - `"google_compute_network"`

                - `"google_compute_subnetwork"`

                - `"google_compute_vpn_gateway"`

                - `"google_compute_vpn_tunnel"`

                - `"google_compute_route"`

                - `"google_compute_address"`

                - `"google_compute_global_address"`

                - `"google_compute_router"`

                - `"google_compute_interconnect_attachment"`

                - `"google_compute_ha_vpn_gateway"`

                - `"google_compute_forwarding_rule"`

                - `"google_compute_network_firewall_policy"`

                - `"google_compute_network_firewall_policy_rule"`

                - `"cloudflare_static_route"`

                - `"cloudflare_ipsec_tunnel"`

              - `title: string`

          - `McnListItem object { item_type, list }`

            - `item_type: string`

            - `list: array of object { item_type, string }  or object { item_type, resource_preview }`

              - `McnStringItem object { item_type, string }`

                - `item_type: string`

                - `string: string`

              - `McnResourcePreviewItem object { item_type, resource_preview }`

                - `item_type: string`

                - `resource_preview: object { id, cloud_type, detail, 3 more }`

                  - `id: string`

                  - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                    - `"AWS"`

                    - `"AZURE"`

                    - `"GOOGLE"`

                    - `"CLOUDFLARE"`

                  - `detail: string`

                  - `name: string`

                  - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                    - `"aws_customer_gateway"`

                    - `"aws_egress_only_internet_gateway"`

                    - `"aws_internet_gateway"`

                    - `"aws_instance"`

                    - `"aws_network_interface"`

                    - `"aws_route"`

                    - `"aws_route_table"`

                    - `"aws_route_table_association"`

                    - `"aws_subnet"`

                    - `"aws_vpc"`

                    - `"aws_vpc_ipv4_cidr_block_association"`

                    - `"aws_vpn_connection"`

                    - `"aws_vpn_connection_route"`

                    - `"aws_vpn_gateway"`

                    - `"aws_security_group"`

                    - `"aws_vpc_security_group_ingress_rule"`

                    - `"aws_vpc_security_group_egress_rule"`

                    - `"aws_ec2_managed_prefix_list"`

                    - `"aws_ec2_transit_gateway"`

                    - `"aws_ec2_transit_gateway_prefix_list_reference"`

                    - `"aws_ec2_transit_gateway_vpc_attachment"`

                    - `"azurerm_application_security_group"`

                    - `"azurerm_lb"`

                    - `"azurerm_lb_backend_address_pool"`

                    - `"azurerm_lb_nat_pool"`

                    - `"azurerm_lb_nat_rule"`

                    - `"azurerm_lb_rule"`

                    - `"azurerm_local_network_gateway"`

                    - `"azurerm_network_interface"`

                    - `"azurerm_network_interface_application_security_group_association"`

                    - `"azurerm_network_interface_backend_address_pool_association"`

                    - `"azurerm_network_interface_security_group_association"`

                    - `"azurerm_network_security_group"`

                    - `"azurerm_public_ip"`

                    - `"azurerm_route"`

                    - `"azurerm_route_table"`

                    - `"azurerm_subnet"`

                    - `"azurerm_subnet_route_table_association"`

                    - `"azurerm_virtual_machine"`

                    - `"azurerm_virtual_network_gateway_connection"`

                    - `"azurerm_virtual_network"`

                    - `"azurerm_virtual_network_gateway"`

                    - `"google_compute_network"`

                    - `"google_compute_subnetwork"`

                    - `"google_compute_vpn_gateway"`

                    - `"google_compute_vpn_tunnel"`

                    - `"google_compute_route"`

                    - `"google_compute_address"`

                    - `"google_compute_global_address"`

                    - `"google_compute_router"`

                    - `"google_compute_interconnect_attachment"`

                    - `"google_compute_ha_vpn_gateway"`

                    - `"google_compute_forwarding_rule"`

                    - `"google_compute_network_firewall_policy"`

                    - `"google_compute_network_firewall_policy_rule"`

                    - `"cloudflare_static_route"`

                    - `"cloudflare_ipsec_tunnel"`

                  - `title: string`

      - `help_text: optional string`

    - `state: map[unknown]`

    - `tags: map[string]`

    - `updated_at: string`

    - `url: string`

    - `managed_by: optional array of object { id, client_type, name }`

      - `id: string`

      - `client_type: "MAGIC_WAN_CLOUD_ONRAMP"`

        - `"MAGIC_WAN_CLOUD_ONRAMP"`

      - `name: string`

  - `post_apply_resources_unavailable: optional boolean`

  - `region: optional string`

  - `status: optional object { apply_progress, lifecycle_state, plan_progress, 3 more }`

    - `apply_progress: object { done, total }`

      - `done: number`

      - `total: number`

    - `lifecycle_state: "OnrampNeedsApply" or "OnrampPendingPlan" or "OnrampPlanning" or 9 more`

      - `"OnrampNeedsApply"`

      - `"OnrampPendingPlan"`

      - `"OnrampPlanning"`

      - `"OnrampPlanFailed"`

      - `"OnrampPendingApproval"`

      - `"OnrampPendingApply"`

      - `"OnrampApplying"`

      - `"OnrampApplyFailed"`

      - `"OnrampActive"`

      - `"OnrampPendingDestroy"`

      - `"OnrampDestroying"`

      - `"OnrampDestroyFailed"`

    - `plan_progress: object { done, total }`

      - `done: number`

      - `total: number`

    - `routes: array of string`

    - `tunnels: array of string`

    - `lifecycle_errors: optional map[object { code, message, documentation_url, 2 more } ]`

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

  - `vpc: optional string`

  - `vpcs_by_id: optional map[object { id, account_id, cloud_type, 18 more } ]`

    - `id: string`

    - `account_id: string`

    - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

      - `"AWS"`

      - `"AZURE"`

      - `"GOOGLE"`

      - `"CLOUDFLARE"`

    - `config: map[unknown]`

    - `deployment_provider: string`

    - `managed: boolean`

    - `monthly_cost_estimate: object { currency, monthly_cost }`

      - `currency: string`

      - `monthly_cost: number`

    - `name: string`

    - `native_id: string`

    - `observations: map[object { first_observed_at, last_observed_at, provider_id, resource_id } ]`

      - `first_observed_at: string`

      - `last_observed_at: string`

      - `provider_id: string`

      - `resource_id: string`

    - `provider_ids: array of string`

    - `provider_names_by_id: map[string]`

    - `region: string`

    - `resource_group: string`

    - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

      - `"aws_customer_gateway"`

      - `"aws_egress_only_internet_gateway"`

      - `"aws_internet_gateway"`

      - `"aws_instance"`

      - `"aws_network_interface"`

      - `"aws_route"`

      - `"aws_route_table"`

      - `"aws_route_table_association"`

      - `"aws_subnet"`

      - `"aws_vpc"`

      - `"aws_vpc_ipv4_cidr_block_association"`

      - `"aws_vpn_connection"`

      - `"aws_vpn_connection_route"`

      - `"aws_vpn_gateway"`

      - `"aws_security_group"`

      - `"aws_vpc_security_group_ingress_rule"`

      - `"aws_vpc_security_group_egress_rule"`

      - `"aws_ec2_managed_prefix_list"`

      - `"aws_ec2_transit_gateway"`

      - `"aws_ec2_transit_gateway_prefix_list_reference"`

      - `"aws_ec2_transit_gateway_vpc_attachment"`

      - `"azurerm_application_security_group"`

      - `"azurerm_lb"`

      - `"azurerm_lb_backend_address_pool"`

      - `"azurerm_lb_nat_pool"`

      - `"azurerm_lb_nat_rule"`

      - `"azurerm_lb_rule"`

      - `"azurerm_local_network_gateway"`

      - `"azurerm_network_interface"`

      - `"azurerm_network_interface_application_security_group_association"`

      - `"azurerm_network_interface_backend_address_pool_association"`

      - `"azurerm_network_interface_security_group_association"`

      - `"azurerm_network_security_group"`

      - `"azurerm_public_ip"`

      - `"azurerm_route"`

      - `"azurerm_route_table"`

      - `"azurerm_subnet"`

      - `"azurerm_subnet_route_table_association"`

      - `"azurerm_virtual_machine"`

      - `"azurerm_virtual_network_gateway_connection"`

      - `"azurerm_virtual_network"`

      - `"azurerm_virtual_network_gateway"`

      - `"google_compute_network"`

      - `"google_compute_subnetwork"`

      - `"google_compute_vpn_gateway"`

      - `"google_compute_vpn_tunnel"`

      - `"google_compute_route"`

      - `"google_compute_address"`

      - `"google_compute_global_address"`

      - `"google_compute_router"`

      - `"google_compute_interconnect_attachment"`

      - `"google_compute_ha_vpn_gateway"`

      - `"google_compute_forwarding_rule"`

      - `"google_compute_network_firewall_policy"`

      - `"google_compute_network_firewall_policy_rule"`

      - `"cloudflare_static_route"`

      - `"cloudflare_ipsec_tunnel"`

    - `sections: array of object { hidden_items, name, visible_items, help_text }`

      - `hidden_items: array of object { helpText, name, value }`

        - `helpText: optional string`

        - `name: optional string`

        - `value: optional object { item_type, string }  or object { item_type, yaml }  or object { item_type, yaml_diff }  or 2 more`

          - `McnStringItem object { item_type, string }`

            - `item_type: string`

            - `string: string`

          - `McnYamlItem object { item_type, yaml }`

            - `item_type: string`

            - `yaml: string`

          - `McnYamlDiffItem object { item_type, yaml_diff }`

            - `item_type: string`

            - `yaml_diff: object { diff, left_description, left_yaml, 2 more }`

              - `diff: string`

              - `left_description: string`

              - `left_yaml: string`

              - `right_description: string`

              - `right_yaml: string`

          - `McnResourcePreviewItem object { item_type, resource_preview }`

            - `item_type: string`

            - `resource_preview: object { id, cloud_type, detail, 3 more }`

              - `id: string`

              - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                - `"AWS"`

                - `"AZURE"`

                - `"GOOGLE"`

                - `"CLOUDFLARE"`

              - `detail: string`

              - `name: string`

              - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                - `"aws_customer_gateway"`

                - `"aws_egress_only_internet_gateway"`

                - `"aws_internet_gateway"`

                - `"aws_instance"`

                - `"aws_network_interface"`

                - `"aws_route"`

                - `"aws_route_table"`

                - `"aws_route_table_association"`

                - `"aws_subnet"`

                - `"aws_vpc"`

                - `"aws_vpc_ipv4_cidr_block_association"`

                - `"aws_vpn_connection"`

                - `"aws_vpn_connection_route"`

                - `"aws_vpn_gateway"`

                - `"aws_security_group"`

                - `"aws_vpc_security_group_ingress_rule"`

                - `"aws_vpc_security_group_egress_rule"`

                - `"aws_ec2_managed_prefix_list"`

                - `"aws_ec2_transit_gateway"`

                - `"aws_ec2_transit_gateway_prefix_list_reference"`

                - `"aws_ec2_transit_gateway_vpc_attachment"`

                - `"azurerm_application_security_group"`

                - `"azurerm_lb"`

                - `"azurerm_lb_backend_address_pool"`

                - `"azurerm_lb_nat_pool"`

                - `"azurerm_lb_nat_rule"`

                - `"azurerm_lb_rule"`

                - `"azurerm_local_network_gateway"`

                - `"azurerm_network_interface"`

                - `"azurerm_network_interface_application_security_group_association"`

                - `"azurerm_network_interface_backend_address_pool_association"`

                - `"azurerm_network_interface_security_group_association"`

                - `"azurerm_network_security_group"`

                - `"azurerm_public_ip"`

                - `"azurerm_route"`

                - `"azurerm_route_table"`

                - `"azurerm_subnet"`

                - `"azurerm_subnet_route_table_association"`

                - `"azurerm_virtual_machine"`

                - `"azurerm_virtual_network_gateway_connection"`

                - `"azurerm_virtual_network"`

                - `"azurerm_virtual_network_gateway"`

                - `"google_compute_network"`

                - `"google_compute_subnetwork"`

                - `"google_compute_vpn_gateway"`

                - `"google_compute_vpn_tunnel"`

                - `"google_compute_route"`

                - `"google_compute_address"`

                - `"google_compute_global_address"`

                - `"google_compute_router"`

                - `"google_compute_interconnect_attachment"`

                - `"google_compute_ha_vpn_gateway"`

                - `"google_compute_forwarding_rule"`

                - `"google_compute_network_firewall_policy"`

                - `"google_compute_network_firewall_policy_rule"`

                - `"cloudflare_static_route"`

                - `"cloudflare_ipsec_tunnel"`

              - `title: string`

          - `McnListItem object { item_type, list }`

            - `item_type: string`

            - `list: array of object { item_type, string }  or object { item_type, resource_preview }`

              - `McnStringItem object { item_type, string }`

                - `item_type: string`

                - `string: string`

              - `McnResourcePreviewItem object { item_type, resource_preview }`

                - `item_type: string`

                - `resource_preview: object { id, cloud_type, detail, 3 more }`

                  - `id: string`

                  - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                    - `"AWS"`

                    - `"AZURE"`

                    - `"GOOGLE"`

                    - `"CLOUDFLARE"`

                  - `detail: string`

                  - `name: string`

                  - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                    - `"aws_customer_gateway"`

                    - `"aws_egress_only_internet_gateway"`

                    - `"aws_internet_gateway"`

                    - `"aws_instance"`

                    - `"aws_network_interface"`

                    - `"aws_route"`

                    - `"aws_route_table"`

                    - `"aws_route_table_association"`

                    - `"aws_subnet"`

                    - `"aws_vpc"`

                    - `"aws_vpc_ipv4_cidr_block_association"`

                    - `"aws_vpn_connection"`

                    - `"aws_vpn_connection_route"`

                    - `"aws_vpn_gateway"`

                    - `"aws_security_group"`

                    - `"aws_vpc_security_group_ingress_rule"`

                    - `"aws_vpc_security_group_egress_rule"`

                    - `"aws_ec2_managed_prefix_list"`

                    - `"aws_ec2_transit_gateway"`

                    - `"aws_ec2_transit_gateway_prefix_list_reference"`

                    - `"aws_ec2_transit_gateway_vpc_attachment"`

                    - `"azurerm_application_security_group"`

                    - `"azurerm_lb"`

                    - `"azurerm_lb_backend_address_pool"`

                    - `"azurerm_lb_nat_pool"`

                    - `"azurerm_lb_nat_rule"`

                    - `"azurerm_lb_rule"`

                    - `"azurerm_local_network_gateway"`

                    - `"azurerm_network_interface"`

                    - `"azurerm_network_interface_application_security_group_association"`

                    - `"azurerm_network_interface_backend_address_pool_association"`

                    - `"azurerm_network_interface_security_group_association"`

                    - `"azurerm_network_security_group"`

                    - `"azurerm_public_ip"`

                    - `"azurerm_route"`

                    - `"azurerm_route_table"`

                    - `"azurerm_subnet"`

                    - `"azurerm_subnet_route_table_association"`

                    - `"azurerm_virtual_machine"`

                    - `"azurerm_virtual_network_gateway_connection"`

                    - `"azurerm_virtual_network"`

                    - `"azurerm_virtual_network_gateway"`

                    - `"google_compute_network"`

                    - `"google_compute_subnetwork"`

                    - `"google_compute_vpn_gateway"`

                    - `"google_compute_vpn_tunnel"`

                    - `"google_compute_route"`

                    - `"google_compute_address"`

                    - `"google_compute_global_address"`

                    - `"google_compute_router"`

                    - `"google_compute_interconnect_attachment"`

                    - `"google_compute_ha_vpn_gateway"`

                    - `"google_compute_forwarding_rule"`

                    - `"google_compute_network_firewall_policy"`

                    - `"google_compute_network_firewall_policy_rule"`

                    - `"cloudflare_static_route"`

                    - `"cloudflare_ipsec_tunnel"`

                  - `title: string`

      - `name: string`

      - `visible_items: array of object { helpText, name, value }`

        - `helpText: optional string`

        - `name: optional string`

        - `value: optional object { item_type, string }  or object { item_type, yaml }  or object { item_type, yaml_diff }  or 2 more`

          - `McnStringItem object { item_type, string }`

            - `item_type: string`

            - `string: string`

          - `McnYamlItem object { item_type, yaml }`

            - `item_type: string`

            - `yaml: string`

          - `McnYamlDiffItem object { item_type, yaml_diff }`

            - `item_type: string`

            - `yaml_diff: object { diff, left_description, left_yaml, 2 more }`

              - `diff: string`

              - `left_description: string`

              - `left_yaml: string`

              - `right_description: string`

              - `right_yaml: string`

          - `McnResourcePreviewItem object { item_type, resource_preview }`

            - `item_type: string`

            - `resource_preview: object { id, cloud_type, detail, 3 more }`

              - `id: string`

              - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                - `"AWS"`

                - `"AZURE"`

                - `"GOOGLE"`

                - `"CLOUDFLARE"`

              - `detail: string`

              - `name: string`

              - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                - `"aws_customer_gateway"`

                - `"aws_egress_only_internet_gateway"`

                - `"aws_internet_gateway"`

                - `"aws_instance"`

                - `"aws_network_interface"`

                - `"aws_route"`

                - `"aws_route_table"`

                - `"aws_route_table_association"`

                - `"aws_subnet"`

                - `"aws_vpc"`

                - `"aws_vpc_ipv4_cidr_block_association"`

                - `"aws_vpn_connection"`

                - `"aws_vpn_connection_route"`

                - `"aws_vpn_gateway"`

                - `"aws_security_group"`

                - `"aws_vpc_security_group_ingress_rule"`

                - `"aws_vpc_security_group_egress_rule"`

                - `"aws_ec2_managed_prefix_list"`

                - `"aws_ec2_transit_gateway"`

                - `"aws_ec2_transit_gateway_prefix_list_reference"`

                - `"aws_ec2_transit_gateway_vpc_attachment"`

                - `"azurerm_application_security_group"`

                - `"azurerm_lb"`

                - `"azurerm_lb_backend_address_pool"`

                - `"azurerm_lb_nat_pool"`

                - `"azurerm_lb_nat_rule"`

                - `"azurerm_lb_rule"`

                - `"azurerm_local_network_gateway"`

                - `"azurerm_network_interface"`

                - `"azurerm_network_interface_application_security_group_association"`

                - `"azurerm_network_interface_backend_address_pool_association"`

                - `"azurerm_network_interface_security_group_association"`

                - `"azurerm_network_security_group"`

                - `"azurerm_public_ip"`

                - `"azurerm_route"`

                - `"azurerm_route_table"`

                - `"azurerm_subnet"`

                - `"azurerm_subnet_route_table_association"`

                - `"azurerm_virtual_machine"`

                - `"azurerm_virtual_network_gateway_connection"`

                - `"azurerm_virtual_network"`

                - `"azurerm_virtual_network_gateway"`

                - `"google_compute_network"`

                - `"google_compute_subnetwork"`

                - `"google_compute_vpn_gateway"`

                - `"google_compute_vpn_tunnel"`

                - `"google_compute_route"`

                - `"google_compute_address"`

                - `"google_compute_global_address"`

                - `"google_compute_router"`

                - `"google_compute_interconnect_attachment"`

                - `"google_compute_ha_vpn_gateway"`

                - `"google_compute_forwarding_rule"`

                - `"google_compute_network_firewall_policy"`

                - `"google_compute_network_firewall_policy_rule"`

                - `"cloudflare_static_route"`

                - `"cloudflare_ipsec_tunnel"`

              - `title: string`

          - `McnListItem object { item_type, list }`

            - `item_type: string`

            - `list: array of object { item_type, string }  or object { item_type, resource_preview }`

              - `McnStringItem object { item_type, string }`

                - `item_type: string`

                - `string: string`

              - `McnResourcePreviewItem object { item_type, resource_preview }`

                - `item_type: string`

                - `resource_preview: object { id, cloud_type, detail, 3 more }`

                  - `id: string`

                  - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                    - `"AWS"`

                    - `"AZURE"`

                    - `"GOOGLE"`

                    - `"CLOUDFLARE"`

                  - `detail: string`

                  - `name: string`

                  - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                    - `"aws_customer_gateway"`

                    - `"aws_egress_only_internet_gateway"`

                    - `"aws_internet_gateway"`

                    - `"aws_instance"`

                    - `"aws_network_interface"`

                    - `"aws_route"`

                    - `"aws_route_table"`

                    - `"aws_route_table_association"`

                    - `"aws_subnet"`

                    - `"aws_vpc"`

                    - `"aws_vpc_ipv4_cidr_block_association"`

                    - `"aws_vpn_connection"`

                    - `"aws_vpn_connection_route"`

                    - `"aws_vpn_gateway"`

                    - `"aws_security_group"`

                    - `"aws_vpc_security_group_ingress_rule"`

                    - `"aws_vpc_security_group_egress_rule"`

                    - `"aws_ec2_managed_prefix_list"`

                    - `"aws_ec2_transit_gateway"`

                    - `"aws_ec2_transit_gateway_prefix_list_reference"`

                    - `"aws_ec2_transit_gateway_vpc_attachment"`

                    - `"azurerm_application_security_group"`

                    - `"azurerm_lb"`

                    - `"azurerm_lb_backend_address_pool"`

                    - `"azurerm_lb_nat_pool"`

                    - `"azurerm_lb_nat_rule"`

                    - `"azurerm_lb_rule"`

                    - `"azurerm_local_network_gateway"`

                    - `"azurerm_network_interface"`

                    - `"azurerm_network_interface_application_security_group_association"`

                    - `"azurerm_network_interface_backend_address_pool_association"`

                    - `"azurerm_network_interface_security_group_association"`

                    - `"azurerm_network_security_group"`

                    - `"azurerm_public_ip"`

                    - `"azurerm_route"`

                    - `"azurerm_route_table"`

                    - `"azurerm_subnet"`

                    - `"azurerm_subnet_route_table_association"`

                    - `"azurerm_virtual_machine"`

                    - `"azurerm_virtual_network_gateway_connection"`

                    - `"azurerm_virtual_network"`

                    - `"azurerm_virtual_network_gateway"`

                    - `"google_compute_network"`

                    - `"google_compute_subnetwork"`

                    - `"google_compute_vpn_gateway"`

                    - `"google_compute_vpn_tunnel"`

                    - `"google_compute_route"`

                    - `"google_compute_address"`

                    - `"google_compute_global_address"`

                    - `"google_compute_router"`

                    - `"google_compute_interconnect_attachment"`

                    - `"google_compute_ha_vpn_gateway"`

                    - `"google_compute_forwarding_rule"`

                    - `"google_compute_network_firewall_policy"`

                    - `"google_compute_network_firewall_policy_rule"`

                    - `"cloudflare_static_route"`

                    - `"cloudflare_ipsec_tunnel"`

                  - `title: string`

      - `help_text: optional string`

    - `state: map[unknown]`

    - `tags: map[string]`

    - `updated_at: string`

    - `url: string`

    - `managed_by: optional array of object { id, client_type, name }`

      - `id: string`

      - `client_type: "MAGIC_WAN_CLOUD_ONRAMP"`

        - `"MAGIC_WAN_CLOUD_ONRAMP"`

      - `name: string`

  - `vpcs_by_id_unavailable: optional array of string`

    The list of vpc IDs for which resource details failed to generate.

### On Ramp Create Response

- `OnRampCreateResponse object { id, cloud_type, dynamic_routing, 26 more }`

  - `id: string`

  - `cloud_type: "AWS" or "AZURE" or "GOOGLE"`

    - `"AWS"`

    - `"AZURE"`

    - `"GOOGLE"`

  - `dynamic_routing: boolean`

  - `install_routes_in_cloud: boolean`

  - `install_routes_in_magic_wan: boolean`

  - `name: string`

  - `type: "OnrampTypeSingle" or "OnrampTypeHub"`

    - `"OnrampTypeSingle"`

    - `"OnrampTypeHub"`

  - `updated_at: string`

  - `attached_hubs: optional array of string`

  - `attached_vpcs: optional array of string`

  - `cloud_asn: optional number`

  - `description: optional string`

  - `hub: optional string`

  - `last_applied_at: optional string`

  - `last_exported_at: optional string`

  - `last_planned_at: optional string`

  - `manage_hub_to_hub_attachments: optional boolean`

  - `manage_vpc_to_hub_attachments: optional boolean`

  - `planned_monthly_cost_estimate: optional object { currency, current_monthly_cost, diff, proposed_monthly_cost }`

    - `currency: string`

    - `current_monthly_cost: number`

    - `diff: number`

    - `proposed_monthly_cost: number`

  - `planned_resources: optional array of object { diff, keys_require_replace, monthly_cost_estimate_diff, 2 more }`

    - `diff: object { diff, left_description, left_yaml, 2 more }`

      - `diff: string`

      - `left_description: string`

      - `left_yaml: string`

      - `right_description: string`

      - `right_yaml: string`

    - `keys_require_replace: array of string`

    - `monthly_cost_estimate_diff: object { currency, current_monthly_cost, diff, proposed_monthly_cost }`

      - `currency: string`

      - `current_monthly_cost: number`

      - `diff: number`

      - `proposed_monthly_cost: number`

    - `planned_action: "no_op" or "create" or "update" or 2 more`

      - `"no_op"`

      - `"create"`

      - `"update"`

      - `"replace"`

      - `"destroy"`

    - `resource: object { id, cloud_type, detail, 3 more }`

      - `id: string`

      - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

        - `"AWS"`

        - `"AZURE"`

        - `"GOOGLE"`

        - `"CLOUDFLARE"`

      - `detail: string`

      - `name: string`

      - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

        - `"aws_customer_gateway"`

        - `"aws_egress_only_internet_gateway"`

        - `"aws_internet_gateway"`

        - `"aws_instance"`

        - `"aws_network_interface"`

        - `"aws_route"`

        - `"aws_route_table"`

        - `"aws_route_table_association"`

        - `"aws_subnet"`

        - `"aws_vpc"`

        - `"aws_vpc_ipv4_cidr_block_association"`

        - `"aws_vpn_connection"`

        - `"aws_vpn_connection_route"`

        - `"aws_vpn_gateway"`

        - `"aws_security_group"`

        - `"aws_vpc_security_group_ingress_rule"`

        - `"aws_vpc_security_group_egress_rule"`

        - `"aws_ec2_managed_prefix_list"`

        - `"aws_ec2_transit_gateway"`

        - `"aws_ec2_transit_gateway_prefix_list_reference"`

        - `"aws_ec2_transit_gateway_vpc_attachment"`

        - `"azurerm_application_security_group"`

        - `"azurerm_lb"`

        - `"azurerm_lb_backend_address_pool"`

        - `"azurerm_lb_nat_pool"`

        - `"azurerm_lb_nat_rule"`

        - `"azurerm_lb_rule"`

        - `"azurerm_local_network_gateway"`

        - `"azurerm_network_interface"`

        - `"azurerm_network_interface_application_security_group_association"`

        - `"azurerm_network_interface_backend_address_pool_association"`

        - `"azurerm_network_interface_security_group_association"`

        - `"azurerm_network_security_group"`

        - `"azurerm_public_ip"`

        - `"azurerm_route"`

        - `"azurerm_route_table"`

        - `"azurerm_subnet"`

        - `"azurerm_subnet_route_table_association"`

        - `"azurerm_virtual_machine"`

        - `"azurerm_virtual_network_gateway_connection"`

        - `"azurerm_virtual_network"`

        - `"azurerm_virtual_network_gateway"`

        - `"google_compute_network"`

        - `"google_compute_subnetwork"`

        - `"google_compute_vpn_gateway"`

        - `"google_compute_vpn_tunnel"`

        - `"google_compute_route"`

        - `"google_compute_address"`

        - `"google_compute_global_address"`

        - `"google_compute_router"`

        - `"google_compute_interconnect_attachment"`

        - `"google_compute_ha_vpn_gateway"`

        - `"google_compute_forwarding_rule"`

        - `"google_compute_network_firewall_policy"`

        - `"google_compute_network_firewall_policy_rule"`

        - `"cloudflare_static_route"`

        - `"cloudflare_ipsec_tunnel"`

      - `title: string`

  - `planned_resources_unavailable: optional boolean`

  - `post_apply_monthly_cost_estimate: optional object { currency, monthly_cost }`

    - `currency: string`

    - `monthly_cost: number`

  - `post_apply_resources: optional map[object { id, account_id, cloud_type, 18 more } ]`

    - `id: string`

    - `account_id: string`

    - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

      - `"AWS"`

      - `"AZURE"`

      - `"GOOGLE"`

      - `"CLOUDFLARE"`

    - `config: map[unknown]`

    - `deployment_provider: string`

    - `managed: boolean`

    - `monthly_cost_estimate: object { currency, monthly_cost }`

      - `currency: string`

      - `monthly_cost: number`

    - `name: string`

    - `native_id: string`

    - `observations: map[object { first_observed_at, last_observed_at, provider_id, resource_id } ]`

      - `first_observed_at: string`

      - `last_observed_at: string`

      - `provider_id: string`

      - `resource_id: string`

    - `provider_ids: array of string`

    - `provider_names_by_id: map[string]`

    - `region: string`

    - `resource_group: string`

    - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

      - `"aws_customer_gateway"`

      - `"aws_egress_only_internet_gateway"`

      - `"aws_internet_gateway"`

      - `"aws_instance"`

      - `"aws_network_interface"`

      - `"aws_route"`

      - `"aws_route_table"`

      - `"aws_route_table_association"`

      - `"aws_subnet"`

      - `"aws_vpc"`

      - `"aws_vpc_ipv4_cidr_block_association"`

      - `"aws_vpn_connection"`

      - `"aws_vpn_connection_route"`

      - `"aws_vpn_gateway"`

      - `"aws_security_group"`

      - `"aws_vpc_security_group_ingress_rule"`

      - `"aws_vpc_security_group_egress_rule"`

      - `"aws_ec2_managed_prefix_list"`

      - `"aws_ec2_transit_gateway"`

      - `"aws_ec2_transit_gateway_prefix_list_reference"`

      - `"aws_ec2_transit_gateway_vpc_attachment"`

      - `"azurerm_application_security_group"`

      - `"azurerm_lb"`

      - `"azurerm_lb_backend_address_pool"`

      - `"azurerm_lb_nat_pool"`

      - `"azurerm_lb_nat_rule"`

      - `"azurerm_lb_rule"`

      - `"azurerm_local_network_gateway"`

      - `"azurerm_network_interface"`

      - `"azurerm_network_interface_application_security_group_association"`

      - `"azurerm_network_interface_backend_address_pool_association"`

      - `"azurerm_network_interface_security_group_association"`

      - `"azurerm_network_security_group"`

      - `"azurerm_public_ip"`

      - `"azurerm_route"`

      - `"azurerm_route_table"`

      - `"azurerm_subnet"`

      - `"azurerm_subnet_route_table_association"`

      - `"azurerm_virtual_machine"`

      - `"azurerm_virtual_network_gateway_connection"`

      - `"azurerm_virtual_network"`

      - `"azurerm_virtual_network_gateway"`

      - `"google_compute_network"`

      - `"google_compute_subnetwork"`

      - `"google_compute_vpn_gateway"`

      - `"google_compute_vpn_tunnel"`

      - `"google_compute_route"`

      - `"google_compute_address"`

      - `"google_compute_global_address"`

      - `"google_compute_router"`

      - `"google_compute_interconnect_attachment"`

      - `"google_compute_ha_vpn_gateway"`

      - `"google_compute_forwarding_rule"`

      - `"google_compute_network_firewall_policy"`

      - `"google_compute_network_firewall_policy_rule"`

      - `"cloudflare_static_route"`

      - `"cloudflare_ipsec_tunnel"`

    - `sections: array of object { hidden_items, name, visible_items, help_text }`

      - `hidden_items: array of object { helpText, name, value }`

        - `helpText: optional string`

        - `name: optional string`

        - `value: optional object { item_type, string }  or object { item_type, yaml }  or object { item_type, yaml_diff }  or 2 more`

          - `McnStringItem object { item_type, string }`

            - `item_type: string`

            - `string: string`

          - `McnYamlItem object { item_type, yaml }`

            - `item_type: string`

            - `yaml: string`

          - `McnYamlDiffItem object { item_type, yaml_diff }`

            - `item_type: string`

            - `yaml_diff: object { diff, left_description, left_yaml, 2 more }`

              - `diff: string`

              - `left_description: string`

              - `left_yaml: string`

              - `right_description: string`

              - `right_yaml: string`

          - `McnResourcePreviewItem object { item_type, resource_preview }`

            - `item_type: string`

            - `resource_preview: object { id, cloud_type, detail, 3 more }`

              - `id: string`

              - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                - `"AWS"`

                - `"AZURE"`

                - `"GOOGLE"`

                - `"CLOUDFLARE"`

              - `detail: string`

              - `name: string`

              - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                - `"aws_customer_gateway"`

                - `"aws_egress_only_internet_gateway"`

                - `"aws_internet_gateway"`

                - `"aws_instance"`

                - `"aws_network_interface"`

                - `"aws_route"`

                - `"aws_route_table"`

                - `"aws_route_table_association"`

                - `"aws_subnet"`

                - `"aws_vpc"`

                - `"aws_vpc_ipv4_cidr_block_association"`

                - `"aws_vpn_connection"`

                - `"aws_vpn_connection_route"`

                - `"aws_vpn_gateway"`

                - `"aws_security_group"`

                - `"aws_vpc_security_group_ingress_rule"`

                - `"aws_vpc_security_group_egress_rule"`

                - `"aws_ec2_managed_prefix_list"`

                - `"aws_ec2_transit_gateway"`

                - `"aws_ec2_transit_gateway_prefix_list_reference"`

                - `"aws_ec2_transit_gateway_vpc_attachment"`

                - `"azurerm_application_security_group"`

                - `"azurerm_lb"`

                - `"azurerm_lb_backend_address_pool"`

                - `"azurerm_lb_nat_pool"`

                - `"azurerm_lb_nat_rule"`

                - `"azurerm_lb_rule"`

                - `"azurerm_local_network_gateway"`

                - `"azurerm_network_interface"`

                - `"azurerm_network_interface_application_security_group_association"`

                - `"azurerm_network_interface_backend_address_pool_association"`

                - `"azurerm_network_interface_security_group_association"`

                - `"azurerm_network_security_group"`

                - `"azurerm_public_ip"`

                - `"azurerm_route"`

                - `"azurerm_route_table"`

                - `"azurerm_subnet"`

                - `"azurerm_subnet_route_table_association"`

                - `"azurerm_virtual_machine"`

                - `"azurerm_virtual_network_gateway_connection"`

                - `"azurerm_virtual_network"`

                - `"azurerm_virtual_network_gateway"`

                - `"google_compute_network"`

                - `"google_compute_subnetwork"`

                - `"google_compute_vpn_gateway"`

                - `"google_compute_vpn_tunnel"`

                - `"google_compute_route"`

                - `"google_compute_address"`

                - `"google_compute_global_address"`

                - `"google_compute_router"`

                - `"google_compute_interconnect_attachment"`

                - `"google_compute_ha_vpn_gateway"`

                - `"google_compute_forwarding_rule"`

                - `"google_compute_network_firewall_policy"`

                - `"google_compute_network_firewall_policy_rule"`

                - `"cloudflare_static_route"`

                - `"cloudflare_ipsec_tunnel"`

              - `title: string`

          - `McnListItem object { item_type, list }`

            - `item_type: string`

            - `list: array of object { item_type, string }  or object { item_type, resource_preview }`

              - `McnStringItem object { item_type, string }`

                - `item_type: string`

                - `string: string`

              - `McnResourcePreviewItem object { item_type, resource_preview }`

                - `item_type: string`

                - `resource_preview: object { id, cloud_type, detail, 3 more }`

                  - `id: string`

                  - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                    - `"AWS"`

                    - `"AZURE"`

                    - `"GOOGLE"`

                    - `"CLOUDFLARE"`

                  - `detail: string`

                  - `name: string`

                  - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                    - `"aws_customer_gateway"`

                    - `"aws_egress_only_internet_gateway"`

                    - `"aws_internet_gateway"`

                    - `"aws_instance"`

                    - `"aws_network_interface"`

                    - `"aws_route"`

                    - `"aws_route_table"`

                    - `"aws_route_table_association"`

                    - `"aws_subnet"`

                    - `"aws_vpc"`

                    - `"aws_vpc_ipv4_cidr_block_association"`

                    - `"aws_vpn_connection"`

                    - `"aws_vpn_connection_route"`

                    - `"aws_vpn_gateway"`

                    - `"aws_security_group"`

                    - `"aws_vpc_security_group_ingress_rule"`

                    - `"aws_vpc_security_group_egress_rule"`

                    - `"aws_ec2_managed_prefix_list"`

                    - `"aws_ec2_transit_gateway"`

                    - `"aws_ec2_transit_gateway_prefix_list_reference"`

                    - `"aws_ec2_transit_gateway_vpc_attachment"`

                    - `"azurerm_application_security_group"`

                    - `"azurerm_lb"`

                    - `"azurerm_lb_backend_address_pool"`

                    - `"azurerm_lb_nat_pool"`

                    - `"azurerm_lb_nat_rule"`

                    - `"azurerm_lb_rule"`

                    - `"azurerm_local_network_gateway"`

                    - `"azurerm_network_interface"`

                    - `"azurerm_network_interface_application_security_group_association"`

                    - `"azurerm_network_interface_backend_address_pool_association"`

                    - `"azurerm_network_interface_security_group_association"`

                    - `"azurerm_network_security_group"`

                    - `"azurerm_public_ip"`

                    - `"azurerm_route"`

                    - `"azurerm_route_table"`

                    - `"azurerm_subnet"`

                    - `"azurerm_subnet_route_table_association"`

                    - `"azurerm_virtual_machine"`

                    - `"azurerm_virtual_network_gateway_connection"`

                    - `"azurerm_virtual_network"`

                    - `"azurerm_virtual_network_gateway"`

                    - `"google_compute_network"`

                    - `"google_compute_subnetwork"`

                    - `"google_compute_vpn_gateway"`

                    - `"google_compute_vpn_tunnel"`

                    - `"google_compute_route"`

                    - `"google_compute_address"`

                    - `"google_compute_global_address"`

                    - `"google_compute_router"`

                    - `"google_compute_interconnect_attachment"`

                    - `"google_compute_ha_vpn_gateway"`

                    - `"google_compute_forwarding_rule"`

                    - `"google_compute_network_firewall_policy"`

                    - `"google_compute_network_firewall_policy_rule"`

                    - `"cloudflare_static_route"`

                    - `"cloudflare_ipsec_tunnel"`

                  - `title: string`

      - `name: string`

      - `visible_items: array of object { helpText, name, value }`

        - `helpText: optional string`

        - `name: optional string`

        - `value: optional object { item_type, string }  or object { item_type, yaml }  or object { item_type, yaml_diff }  or 2 more`

          - `McnStringItem object { item_type, string }`

            - `item_type: string`

            - `string: string`

          - `McnYamlItem object { item_type, yaml }`

            - `item_type: string`

            - `yaml: string`

          - `McnYamlDiffItem object { item_type, yaml_diff }`

            - `item_type: string`

            - `yaml_diff: object { diff, left_description, left_yaml, 2 more }`

              - `diff: string`

              - `left_description: string`

              - `left_yaml: string`

              - `right_description: string`

              - `right_yaml: string`

          - `McnResourcePreviewItem object { item_type, resource_preview }`

            - `item_type: string`

            - `resource_preview: object { id, cloud_type, detail, 3 more }`

              - `id: string`

              - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                - `"AWS"`

                - `"AZURE"`

                - `"GOOGLE"`

                - `"CLOUDFLARE"`

              - `detail: string`

              - `name: string`

              - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                - `"aws_customer_gateway"`

                - `"aws_egress_only_internet_gateway"`

                - `"aws_internet_gateway"`

                - `"aws_instance"`

                - `"aws_network_interface"`

                - `"aws_route"`

                - `"aws_route_table"`

                - `"aws_route_table_association"`

                - `"aws_subnet"`

                - `"aws_vpc"`

                - `"aws_vpc_ipv4_cidr_block_association"`

                - `"aws_vpn_connection"`

                - `"aws_vpn_connection_route"`

                - `"aws_vpn_gateway"`

                - `"aws_security_group"`

                - `"aws_vpc_security_group_ingress_rule"`

                - `"aws_vpc_security_group_egress_rule"`

                - `"aws_ec2_managed_prefix_list"`

                - `"aws_ec2_transit_gateway"`

                - `"aws_ec2_transit_gateway_prefix_list_reference"`

                - `"aws_ec2_transit_gateway_vpc_attachment"`

                - `"azurerm_application_security_group"`

                - `"azurerm_lb"`

                - `"azurerm_lb_backend_address_pool"`

                - `"azurerm_lb_nat_pool"`

                - `"azurerm_lb_nat_rule"`

                - `"azurerm_lb_rule"`

                - `"azurerm_local_network_gateway"`

                - `"azurerm_network_interface"`

                - `"azurerm_network_interface_application_security_group_association"`

                - `"azurerm_network_interface_backend_address_pool_association"`

                - `"azurerm_network_interface_security_group_association"`

                - `"azurerm_network_security_group"`

                - `"azurerm_public_ip"`

                - `"azurerm_route"`

                - `"azurerm_route_table"`

                - `"azurerm_subnet"`

                - `"azurerm_subnet_route_table_association"`

                - `"azurerm_virtual_machine"`

                - `"azurerm_virtual_network_gateway_connection"`

                - `"azurerm_virtual_network"`

                - `"azurerm_virtual_network_gateway"`

                - `"google_compute_network"`

                - `"google_compute_subnetwork"`

                - `"google_compute_vpn_gateway"`

                - `"google_compute_vpn_tunnel"`

                - `"google_compute_route"`

                - `"google_compute_address"`

                - `"google_compute_global_address"`

                - `"google_compute_router"`

                - `"google_compute_interconnect_attachment"`

                - `"google_compute_ha_vpn_gateway"`

                - `"google_compute_forwarding_rule"`

                - `"google_compute_network_firewall_policy"`

                - `"google_compute_network_firewall_policy_rule"`

                - `"cloudflare_static_route"`

                - `"cloudflare_ipsec_tunnel"`

              - `title: string`

          - `McnListItem object { item_type, list }`

            - `item_type: string`

            - `list: array of object { item_type, string }  or object { item_type, resource_preview }`

              - `McnStringItem object { item_type, string }`

                - `item_type: string`

                - `string: string`

              - `McnResourcePreviewItem object { item_type, resource_preview }`

                - `item_type: string`

                - `resource_preview: object { id, cloud_type, detail, 3 more }`

                  - `id: string`

                  - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                    - `"AWS"`

                    - `"AZURE"`

                    - `"GOOGLE"`

                    - `"CLOUDFLARE"`

                  - `detail: string`

                  - `name: string`

                  - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                    - `"aws_customer_gateway"`

                    - `"aws_egress_only_internet_gateway"`

                    - `"aws_internet_gateway"`

                    - `"aws_instance"`

                    - `"aws_network_interface"`

                    - `"aws_route"`

                    - `"aws_route_table"`

                    - `"aws_route_table_association"`

                    - `"aws_subnet"`

                    - `"aws_vpc"`

                    - `"aws_vpc_ipv4_cidr_block_association"`

                    - `"aws_vpn_connection"`

                    - `"aws_vpn_connection_route"`

                    - `"aws_vpn_gateway"`

                    - `"aws_security_group"`

                    - `"aws_vpc_security_group_ingress_rule"`

                    - `"aws_vpc_security_group_egress_rule"`

                    - `"aws_ec2_managed_prefix_list"`

                    - `"aws_ec2_transit_gateway"`

                    - `"aws_ec2_transit_gateway_prefix_list_reference"`

                    - `"aws_ec2_transit_gateway_vpc_attachment"`

                    - `"azurerm_application_security_group"`

                    - `"azurerm_lb"`

                    - `"azurerm_lb_backend_address_pool"`

                    - `"azurerm_lb_nat_pool"`

                    - `"azurerm_lb_nat_rule"`

                    - `"azurerm_lb_rule"`

                    - `"azurerm_local_network_gateway"`

                    - `"azurerm_network_interface"`

                    - `"azurerm_network_interface_application_security_group_association"`

                    - `"azurerm_network_interface_backend_address_pool_association"`

                    - `"azurerm_network_interface_security_group_association"`

                    - `"azurerm_network_security_group"`

                    - `"azurerm_public_ip"`

                    - `"azurerm_route"`

                    - `"azurerm_route_table"`

                    - `"azurerm_subnet"`

                    - `"azurerm_subnet_route_table_association"`

                    - `"azurerm_virtual_machine"`

                    - `"azurerm_virtual_network_gateway_connection"`

                    - `"azurerm_virtual_network"`

                    - `"azurerm_virtual_network_gateway"`

                    - `"google_compute_network"`

                    - `"google_compute_subnetwork"`

                    - `"google_compute_vpn_gateway"`

                    - `"google_compute_vpn_tunnel"`

                    - `"google_compute_route"`

                    - `"google_compute_address"`

                    - `"google_compute_global_address"`

                    - `"google_compute_router"`

                    - `"google_compute_interconnect_attachment"`

                    - `"google_compute_ha_vpn_gateway"`

                    - `"google_compute_forwarding_rule"`

                    - `"google_compute_network_firewall_policy"`

                    - `"google_compute_network_firewall_policy_rule"`

                    - `"cloudflare_static_route"`

                    - `"cloudflare_ipsec_tunnel"`

                  - `title: string`

      - `help_text: optional string`

    - `state: map[unknown]`

    - `tags: map[string]`

    - `updated_at: string`

    - `url: string`

    - `managed_by: optional array of object { id, client_type, name }`

      - `id: string`

      - `client_type: "MAGIC_WAN_CLOUD_ONRAMP"`

        - `"MAGIC_WAN_CLOUD_ONRAMP"`

      - `name: string`

  - `post_apply_resources_unavailable: optional boolean`

  - `region: optional string`

  - `status: optional object { apply_progress, lifecycle_state, plan_progress, 3 more }`

    - `apply_progress: object { done, total }`

      - `done: number`

      - `total: number`

    - `lifecycle_state: "OnrampNeedsApply" or "OnrampPendingPlan" or "OnrampPlanning" or 9 more`

      - `"OnrampNeedsApply"`

      - `"OnrampPendingPlan"`

      - `"OnrampPlanning"`

      - `"OnrampPlanFailed"`

      - `"OnrampPendingApproval"`

      - `"OnrampPendingApply"`

      - `"OnrampApplying"`

      - `"OnrampApplyFailed"`

      - `"OnrampActive"`

      - `"OnrampPendingDestroy"`

      - `"OnrampDestroying"`

      - `"OnrampDestroyFailed"`

    - `plan_progress: object { done, total }`

      - `done: number`

      - `total: number`

    - `routes: array of string`

    - `tunnels: array of string`

    - `lifecycle_errors: optional map[object { code, message, documentation_url, 2 more } ]`

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

  - `vpc: optional string`

  - `vpcs_by_id: optional map[object { id, account_id, cloud_type, 18 more } ]`

    - `id: string`

    - `account_id: string`

    - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

      - `"AWS"`

      - `"AZURE"`

      - `"GOOGLE"`

      - `"CLOUDFLARE"`

    - `config: map[unknown]`

    - `deployment_provider: string`

    - `managed: boolean`

    - `monthly_cost_estimate: object { currency, monthly_cost }`

      - `currency: string`

      - `monthly_cost: number`

    - `name: string`

    - `native_id: string`

    - `observations: map[object { first_observed_at, last_observed_at, provider_id, resource_id } ]`

      - `first_observed_at: string`

      - `last_observed_at: string`

      - `provider_id: string`

      - `resource_id: string`

    - `provider_ids: array of string`

    - `provider_names_by_id: map[string]`

    - `region: string`

    - `resource_group: string`

    - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

      - `"aws_customer_gateway"`

      - `"aws_egress_only_internet_gateway"`

      - `"aws_internet_gateway"`

      - `"aws_instance"`

      - `"aws_network_interface"`

      - `"aws_route"`

      - `"aws_route_table"`

      - `"aws_route_table_association"`

      - `"aws_subnet"`

      - `"aws_vpc"`

      - `"aws_vpc_ipv4_cidr_block_association"`

      - `"aws_vpn_connection"`

      - `"aws_vpn_connection_route"`

      - `"aws_vpn_gateway"`

      - `"aws_security_group"`

      - `"aws_vpc_security_group_ingress_rule"`

      - `"aws_vpc_security_group_egress_rule"`

      - `"aws_ec2_managed_prefix_list"`

      - `"aws_ec2_transit_gateway"`

      - `"aws_ec2_transit_gateway_prefix_list_reference"`

      - `"aws_ec2_transit_gateway_vpc_attachment"`

      - `"azurerm_application_security_group"`

      - `"azurerm_lb"`

      - `"azurerm_lb_backend_address_pool"`

      - `"azurerm_lb_nat_pool"`

      - `"azurerm_lb_nat_rule"`

      - `"azurerm_lb_rule"`

      - `"azurerm_local_network_gateway"`

      - `"azurerm_network_interface"`

      - `"azurerm_network_interface_application_security_group_association"`

      - `"azurerm_network_interface_backend_address_pool_association"`

      - `"azurerm_network_interface_security_group_association"`

      - `"azurerm_network_security_group"`

      - `"azurerm_public_ip"`

      - `"azurerm_route"`

      - `"azurerm_route_table"`

      - `"azurerm_subnet"`

      - `"azurerm_subnet_route_table_association"`

      - `"azurerm_virtual_machine"`

      - `"azurerm_virtual_network_gateway_connection"`

      - `"azurerm_virtual_network"`

      - `"azurerm_virtual_network_gateway"`

      - `"google_compute_network"`

      - `"google_compute_subnetwork"`

      - `"google_compute_vpn_gateway"`

      - `"google_compute_vpn_tunnel"`

      - `"google_compute_route"`

      - `"google_compute_address"`

      - `"google_compute_global_address"`

      - `"google_compute_router"`

      - `"google_compute_interconnect_attachment"`

      - `"google_compute_ha_vpn_gateway"`

      - `"google_compute_forwarding_rule"`

      - `"google_compute_network_firewall_policy"`

      - `"google_compute_network_firewall_policy_rule"`

      - `"cloudflare_static_route"`

      - `"cloudflare_ipsec_tunnel"`

    - `sections: array of object { hidden_items, name, visible_items, help_text }`

      - `hidden_items: array of object { helpText, name, value }`

        - `helpText: optional string`

        - `name: optional string`

        - `value: optional object { item_type, string }  or object { item_type, yaml }  or object { item_type, yaml_diff }  or 2 more`

          - `McnStringItem object { item_type, string }`

            - `item_type: string`

            - `string: string`

          - `McnYamlItem object { item_type, yaml }`

            - `item_type: string`

            - `yaml: string`

          - `McnYamlDiffItem object { item_type, yaml_diff }`

            - `item_type: string`

            - `yaml_diff: object { diff, left_description, left_yaml, 2 more }`

              - `diff: string`

              - `left_description: string`

              - `left_yaml: string`

              - `right_description: string`

              - `right_yaml: string`

          - `McnResourcePreviewItem object { item_type, resource_preview }`

            - `item_type: string`

            - `resource_preview: object { id, cloud_type, detail, 3 more }`

              - `id: string`

              - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                - `"AWS"`

                - `"AZURE"`

                - `"GOOGLE"`

                - `"CLOUDFLARE"`

              - `detail: string`

              - `name: string`

              - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                - `"aws_customer_gateway"`

                - `"aws_egress_only_internet_gateway"`

                - `"aws_internet_gateway"`

                - `"aws_instance"`

                - `"aws_network_interface"`

                - `"aws_route"`

                - `"aws_route_table"`

                - `"aws_route_table_association"`

                - `"aws_subnet"`

                - `"aws_vpc"`

                - `"aws_vpc_ipv4_cidr_block_association"`

                - `"aws_vpn_connection"`

                - `"aws_vpn_connection_route"`

                - `"aws_vpn_gateway"`

                - `"aws_security_group"`

                - `"aws_vpc_security_group_ingress_rule"`

                - `"aws_vpc_security_group_egress_rule"`

                - `"aws_ec2_managed_prefix_list"`

                - `"aws_ec2_transit_gateway"`

                - `"aws_ec2_transit_gateway_prefix_list_reference"`

                - `"aws_ec2_transit_gateway_vpc_attachment"`

                - `"azurerm_application_security_group"`

                - `"azurerm_lb"`

                - `"azurerm_lb_backend_address_pool"`

                - `"azurerm_lb_nat_pool"`

                - `"azurerm_lb_nat_rule"`

                - `"azurerm_lb_rule"`

                - `"azurerm_local_network_gateway"`

                - `"azurerm_network_interface"`

                - `"azurerm_network_interface_application_security_group_association"`

                - `"azurerm_network_interface_backend_address_pool_association"`

                - `"azurerm_network_interface_security_group_association"`

                - `"azurerm_network_security_group"`

                - `"azurerm_public_ip"`

                - `"azurerm_route"`

                - `"azurerm_route_table"`

                - `"azurerm_subnet"`

                - `"azurerm_subnet_route_table_association"`

                - `"azurerm_virtual_machine"`

                - `"azurerm_virtual_network_gateway_connection"`

                - `"azurerm_virtual_network"`

                - `"azurerm_virtual_network_gateway"`

                - `"google_compute_network"`

                - `"google_compute_subnetwork"`

                - `"google_compute_vpn_gateway"`

                - `"google_compute_vpn_tunnel"`

                - `"google_compute_route"`

                - `"google_compute_address"`

                - `"google_compute_global_address"`

                - `"google_compute_router"`

                - `"google_compute_interconnect_attachment"`

                - `"google_compute_ha_vpn_gateway"`

                - `"google_compute_forwarding_rule"`

                - `"google_compute_network_firewall_policy"`

                - `"google_compute_network_firewall_policy_rule"`

                - `"cloudflare_static_route"`

                - `"cloudflare_ipsec_tunnel"`

              - `title: string`

          - `McnListItem object { item_type, list }`

            - `item_type: string`

            - `list: array of object { item_type, string }  or object { item_type, resource_preview }`

              - `McnStringItem object { item_type, string }`

                - `item_type: string`

                - `string: string`

              - `McnResourcePreviewItem object { item_type, resource_preview }`

                - `item_type: string`

                - `resource_preview: object { id, cloud_type, detail, 3 more }`

                  - `id: string`

                  - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                    - `"AWS"`

                    - `"AZURE"`

                    - `"GOOGLE"`

                    - `"CLOUDFLARE"`

                  - `detail: string`

                  - `name: string`

                  - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                    - `"aws_customer_gateway"`

                    - `"aws_egress_only_internet_gateway"`

                    - `"aws_internet_gateway"`

                    - `"aws_instance"`

                    - `"aws_network_interface"`

                    - `"aws_route"`

                    - `"aws_route_table"`

                    - `"aws_route_table_association"`

                    - `"aws_subnet"`

                    - `"aws_vpc"`

                    - `"aws_vpc_ipv4_cidr_block_association"`

                    - `"aws_vpn_connection"`

                    - `"aws_vpn_connection_route"`

                    - `"aws_vpn_gateway"`

                    - `"aws_security_group"`

                    - `"aws_vpc_security_group_ingress_rule"`

                    - `"aws_vpc_security_group_egress_rule"`

                    - `"aws_ec2_managed_prefix_list"`

                    - `"aws_ec2_transit_gateway"`

                    - `"aws_ec2_transit_gateway_prefix_list_reference"`

                    - `"aws_ec2_transit_gateway_vpc_attachment"`

                    - `"azurerm_application_security_group"`

                    - `"azurerm_lb"`

                    - `"azurerm_lb_backend_address_pool"`

                    - `"azurerm_lb_nat_pool"`

                    - `"azurerm_lb_nat_rule"`

                    - `"azurerm_lb_rule"`

                    - `"azurerm_local_network_gateway"`

                    - `"azurerm_network_interface"`

                    - `"azurerm_network_interface_application_security_group_association"`

                    - `"azurerm_network_interface_backend_address_pool_association"`

                    - `"azurerm_network_interface_security_group_association"`

                    - `"azurerm_network_security_group"`

                    - `"azurerm_public_ip"`

                    - `"azurerm_route"`

                    - `"azurerm_route_table"`

                    - `"azurerm_subnet"`

                    - `"azurerm_subnet_route_table_association"`

                    - `"azurerm_virtual_machine"`

                    - `"azurerm_virtual_network_gateway_connection"`

                    - `"azurerm_virtual_network"`

                    - `"azurerm_virtual_network_gateway"`

                    - `"google_compute_network"`

                    - `"google_compute_subnetwork"`

                    - `"google_compute_vpn_gateway"`

                    - `"google_compute_vpn_tunnel"`

                    - `"google_compute_route"`

                    - `"google_compute_address"`

                    - `"google_compute_global_address"`

                    - `"google_compute_router"`

                    - `"google_compute_interconnect_attachment"`

                    - `"google_compute_ha_vpn_gateway"`

                    - `"google_compute_forwarding_rule"`

                    - `"google_compute_network_firewall_policy"`

                    - `"google_compute_network_firewall_policy_rule"`

                    - `"cloudflare_static_route"`

                    - `"cloudflare_ipsec_tunnel"`

                  - `title: string`

      - `name: string`

      - `visible_items: array of object { helpText, name, value }`

        - `helpText: optional string`

        - `name: optional string`

        - `value: optional object { item_type, string }  or object { item_type, yaml }  or object { item_type, yaml_diff }  or 2 more`

          - `McnStringItem object { item_type, string }`

            - `item_type: string`

            - `string: string`

          - `McnYamlItem object { item_type, yaml }`

            - `item_type: string`

            - `yaml: string`

          - `McnYamlDiffItem object { item_type, yaml_diff }`

            - `item_type: string`

            - `yaml_diff: object { diff, left_description, left_yaml, 2 more }`

              - `diff: string`

              - `left_description: string`

              - `left_yaml: string`

              - `right_description: string`

              - `right_yaml: string`

          - `McnResourcePreviewItem object { item_type, resource_preview }`

            - `item_type: string`

            - `resource_preview: object { id, cloud_type, detail, 3 more }`

              - `id: string`

              - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                - `"AWS"`

                - `"AZURE"`

                - `"GOOGLE"`

                - `"CLOUDFLARE"`

              - `detail: string`

              - `name: string`

              - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                - `"aws_customer_gateway"`

                - `"aws_egress_only_internet_gateway"`

                - `"aws_internet_gateway"`

                - `"aws_instance"`

                - `"aws_network_interface"`

                - `"aws_route"`

                - `"aws_route_table"`

                - `"aws_route_table_association"`

                - `"aws_subnet"`

                - `"aws_vpc"`

                - `"aws_vpc_ipv4_cidr_block_association"`

                - `"aws_vpn_connection"`

                - `"aws_vpn_connection_route"`

                - `"aws_vpn_gateway"`

                - `"aws_security_group"`

                - `"aws_vpc_security_group_ingress_rule"`

                - `"aws_vpc_security_group_egress_rule"`

                - `"aws_ec2_managed_prefix_list"`

                - `"aws_ec2_transit_gateway"`

                - `"aws_ec2_transit_gateway_prefix_list_reference"`

                - `"aws_ec2_transit_gateway_vpc_attachment"`

                - `"azurerm_application_security_group"`

                - `"azurerm_lb"`

                - `"azurerm_lb_backend_address_pool"`

                - `"azurerm_lb_nat_pool"`

                - `"azurerm_lb_nat_rule"`

                - `"azurerm_lb_rule"`

                - `"azurerm_local_network_gateway"`

                - `"azurerm_network_interface"`

                - `"azurerm_network_interface_application_security_group_association"`

                - `"azurerm_network_interface_backend_address_pool_association"`

                - `"azurerm_network_interface_security_group_association"`

                - `"azurerm_network_security_group"`

                - `"azurerm_public_ip"`

                - `"azurerm_route"`

                - `"azurerm_route_table"`

                - `"azurerm_subnet"`

                - `"azurerm_subnet_route_table_association"`

                - `"azurerm_virtual_machine"`

                - `"azurerm_virtual_network_gateway_connection"`

                - `"azurerm_virtual_network"`

                - `"azurerm_virtual_network_gateway"`

                - `"google_compute_network"`

                - `"google_compute_subnetwork"`

                - `"google_compute_vpn_gateway"`

                - `"google_compute_vpn_tunnel"`

                - `"google_compute_route"`

                - `"google_compute_address"`

                - `"google_compute_global_address"`

                - `"google_compute_router"`

                - `"google_compute_interconnect_attachment"`

                - `"google_compute_ha_vpn_gateway"`

                - `"google_compute_forwarding_rule"`

                - `"google_compute_network_firewall_policy"`

                - `"google_compute_network_firewall_policy_rule"`

                - `"cloudflare_static_route"`

                - `"cloudflare_ipsec_tunnel"`

              - `title: string`

          - `McnListItem object { item_type, list }`

            - `item_type: string`

            - `list: array of object { item_type, string }  or object { item_type, resource_preview }`

              - `McnStringItem object { item_type, string }`

                - `item_type: string`

                - `string: string`

              - `McnResourcePreviewItem object { item_type, resource_preview }`

                - `item_type: string`

                - `resource_preview: object { id, cloud_type, detail, 3 more }`

                  - `id: string`

                  - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                    - `"AWS"`

                    - `"AZURE"`

                    - `"GOOGLE"`

                    - `"CLOUDFLARE"`

                  - `detail: string`

                  - `name: string`

                  - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                    - `"aws_customer_gateway"`

                    - `"aws_egress_only_internet_gateway"`

                    - `"aws_internet_gateway"`

                    - `"aws_instance"`

                    - `"aws_network_interface"`

                    - `"aws_route"`

                    - `"aws_route_table"`

                    - `"aws_route_table_association"`

                    - `"aws_subnet"`

                    - `"aws_vpc"`

                    - `"aws_vpc_ipv4_cidr_block_association"`

                    - `"aws_vpn_connection"`

                    - `"aws_vpn_connection_route"`

                    - `"aws_vpn_gateway"`

                    - `"aws_security_group"`

                    - `"aws_vpc_security_group_ingress_rule"`

                    - `"aws_vpc_security_group_egress_rule"`

                    - `"aws_ec2_managed_prefix_list"`

                    - `"aws_ec2_transit_gateway"`

                    - `"aws_ec2_transit_gateway_prefix_list_reference"`

                    - `"aws_ec2_transit_gateway_vpc_attachment"`

                    - `"azurerm_application_security_group"`

                    - `"azurerm_lb"`

                    - `"azurerm_lb_backend_address_pool"`

                    - `"azurerm_lb_nat_pool"`

                    - `"azurerm_lb_nat_rule"`

                    - `"azurerm_lb_rule"`

                    - `"azurerm_local_network_gateway"`

                    - `"azurerm_network_interface"`

                    - `"azurerm_network_interface_application_security_group_association"`

                    - `"azurerm_network_interface_backend_address_pool_association"`

                    - `"azurerm_network_interface_security_group_association"`

                    - `"azurerm_network_security_group"`

                    - `"azurerm_public_ip"`

                    - `"azurerm_route"`

                    - `"azurerm_route_table"`

                    - `"azurerm_subnet"`

                    - `"azurerm_subnet_route_table_association"`

                    - `"azurerm_virtual_machine"`

                    - `"azurerm_virtual_network_gateway_connection"`

                    - `"azurerm_virtual_network"`

                    - `"azurerm_virtual_network_gateway"`

                    - `"google_compute_network"`

                    - `"google_compute_subnetwork"`

                    - `"google_compute_vpn_gateway"`

                    - `"google_compute_vpn_tunnel"`

                    - `"google_compute_route"`

                    - `"google_compute_address"`

                    - `"google_compute_global_address"`

                    - `"google_compute_router"`

                    - `"google_compute_interconnect_attachment"`

                    - `"google_compute_ha_vpn_gateway"`

                    - `"google_compute_forwarding_rule"`

                    - `"google_compute_network_firewall_policy"`

                    - `"google_compute_network_firewall_policy_rule"`

                    - `"cloudflare_static_route"`

                    - `"cloudflare_ipsec_tunnel"`

                  - `title: string`

      - `help_text: optional string`

    - `state: map[unknown]`

    - `tags: map[string]`

    - `updated_at: string`

    - `url: string`

    - `managed_by: optional array of object { id, client_type, name }`

      - `id: string`

      - `client_type: "MAGIC_WAN_CLOUD_ONRAMP"`

        - `"MAGIC_WAN_CLOUD_ONRAMP"`

      - `name: string`

  - `vpcs_by_id_unavailable: optional array of string`

    The list of vpc IDs for which resource details failed to generate.

### On Ramp Update Response

- `OnRampUpdateResponse object { id, cloud_type, dynamic_routing, 26 more }`

  - `id: string`

  - `cloud_type: "AWS" or "AZURE" or "GOOGLE"`

    - `"AWS"`

    - `"AZURE"`

    - `"GOOGLE"`

  - `dynamic_routing: boolean`

  - `install_routes_in_cloud: boolean`

  - `install_routes_in_magic_wan: boolean`

  - `name: string`

  - `type: "OnrampTypeSingle" or "OnrampTypeHub"`

    - `"OnrampTypeSingle"`

    - `"OnrampTypeHub"`

  - `updated_at: string`

  - `attached_hubs: optional array of string`

  - `attached_vpcs: optional array of string`

  - `cloud_asn: optional number`

  - `description: optional string`

  - `hub: optional string`

  - `last_applied_at: optional string`

  - `last_exported_at: optional string`

  - `last_planned_at: optional string`

  - `manage_hub_to_hub_attachments: optional boolean`

  - `manage_vpc_to_hub_attachments: optional boolean`

  - `planned_monthly_cost_estimate: optional object { currency, current_monthly_cost, diff, proposed_monthly_cost }`

    - `currency: string`

    - `current_monthly_cost: number`

    - `diff: number`

    - `proposed_monthly_cost: number`

  - `planned_resources: optional array of object { diff, keys_require_replace, monthly_cost_estimate_diff, 2 more }`

    - `diff: object { diff, left_description, left_yaml, 2 more }`

      - `diff: string`

      - `left_description: string`

      - `left_yaml: string`

      - `right_description: string`

      - `right_yaml: string`

    - `keys_require_replace: array of string`

    - `monthly_cost_estimate_diff: object { currency, current_monthly_cost, diff, proposed_monthly_cost }`

      - `currency: string`

      - `current_monthly_cost: number`

      - `diff: number`

      - `proposed_monthly_cost: number`

    - `planned_action: "no_op" or "create" or "update" or 2 more`

      - `"no_op"`

      - `"create"`

      - `"update"`

      - `"replace"`

      - `"destroy"`

    - `resource: object { id, cloud_type, detail, 3 more }`

      - `id: string`

      - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

        - `"AWS"`

        - `"AZURE"`

        - `"GOOGLE"`

        - `"CLOUDFLARE"`

      - `detail: string`

      - `name: string`

      - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

        - `"aws_customer_gateway"`

        - `"aws_egress_only_internet_gateway"`

        - `"aws_internet_gateway"`

        - `"aws_instance"`

        - `"aws_network_interface"`

        - `"aws_route"`

        - `"aws_route_table"`

        - `"aws_route_table_association"`

        - `"aws_subnet"`

        - `"aws_vpc"`

        - `"aws_vpc_ipv4_cidr_block_association"`

        - `"aws_vpn_connection"`

        - `"aws_vpn_connection_route"`

        - `"aws_vpn_gateway"`

        - `"aws_security_group"`

        - `"aws_vpc_security_group_ingress_rule"`

        - `"aws_vpc_security_group_egress_rule"`

        - `"aws_ec2_managed_prefix_list"`

        - `"aws_ec2_transit_gateway"`

        - `"aws_ec2_transit_gateway_prefix_list_reference"`

        - `"aws_ec2_transit_gateway_vpc_attachment"`

        - `"azurerm_application_security_group"`

        - `"azurerm_lb"`

        - `"azurerm_lb_backend_address_pool"`

        - `"azurerm_lb_nat_pool"`

        - `"azurerm_lb_nat_rule"`

        - `"azurerm_lb_rule"`

        - `"azurerm_local_network_gateway"`

        - `"azurerm_network_interface"`

        - `"azurerm_network_interface_application_security_group_association"`

        - `"azurerm_network_interface_backend_address_pool_association"`

        - `"azurerm_network_interface_security_group_association"`

        - `"azurerm_network_security_group"`

        - `"azurerm_public_ip"`

        - `"azurerm_route"`

        - `"azurerm_route_table"`

        - `"azurerm_subnet"`

        - `"azurerm_subnet_route_table_association"`

        - `"azurerm_virtual_machine"`

        - `"azurerm_virtual_network_gateway_connection"`

        - `"azurerm_virtual_network"`

        - `"azurerm_virtual_network_gateway"`

        - `"google_compute_network"`

        - `"google_compute_subnetwork"`

        - `"google_compute_vpn_gateway"`

        - `"google_compute_vpn_tunnel"`

        - `"google_compute_route"`

        - `"google_compute_address"`

        - `"google_compute_global_address"`

        - `"google_compute_router"`

        - `"google_compute_interconnect_attachment"`

        - `"google_compute_ha_vpn_gateway"`

        - `"google_compute_forwarding_rule"`

        - `"google_compute_network_firewall_policy"`

        - `"google_compute_network_firewall_policy_rule"`

        - `"cloudflare_static_route"`

        - `"cloudflare_ipsec_tunnel"`

      - `title: string`

  - `planned_resources_unavailable: optional boolean`

  - `post_apply_monthly_cost_estimate: optional object { currency, monthly_cost }`

    - `currency: string`

    - `monthly_cost: number`

  - `post_apply_resources: optional map[object { id, account_id, cloud_type, 18 more } ]`

    - `id: string`

    - `account_id: string`

    - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

      - `"AWS"`

      - `"AZURE"`

      - `"GOOGLE"`

      - `"CLOUDFLARE"`

    - `config: map[unknown]`

    - `deployment_provider: string`

    - `managed: boolean`

    - `monthly_cost_estimate: object { currency, monthly_cost }`

      - `currency: string`

      - `monthly_cost: number`

    - `name: string`

    - `native_id: string`

    - `observations: map[object { first_observed_at, last_observed_at, provider_id, resource_id } ]`

      - `first_observed_at: string`

      - `last_observed_at: string`

      - `provider_id: string`

      - `resource_id: string`

    - `provider_ids: array of string`

    - `provider_names_by_id: map[string]`

    - `region: string`

    - `resource_group: string`

    - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

      - `"aws_customer_gateway"`

      - `"aws_egress_only_internet_gateway"`

      - `"aws_internet_gateway"`

      - `"aws_instance"`

      - `"aws_network_interface"`

      - `"aws_route"`

      - `"aws_route_table"`

      - `"aws_route_table_association"`

      - `"aws_subnet"`

      - `"aws_vpc"`

      - `"aws_vpc_ipv4_cidr_block_association"`

      - `"aws_vpn_connection"`

      - `"aws_vpn_connection_route"`

      - `"aws_vpn_gateway"`

      - `"aws_security_group"`

      - `"aws_vpc_security_group_ingress_rule"`

      - `"aws_vpc_security_group_egress_rule"`

      - `"aws_ec2_managed_prefix_list"`

      - `"aws_ec2_transit_gateway"`

      - `"aws_ec2_transit_gateway_prefix_list_reference"`

      - `"aws_ec2_transit_gateway_vpc_attachment"`

      - `"azurerm_application_security_group"`

      - `"azurerm_lb"`

      - `"azurerm_lb_backend_address_pool"`

      - `"azurerm_lb_nat_pool"`

      - `"azurerm_lb_nat_rule"`

      - `"azurerm_lb_rule"`

      - `"azurerm_local_network_gateway"`

      - `"azurerm_network_interface"`

      - `"azurerm_network_interface_application_security_group_association"`

      - `"azurerm_network_interface_backend_address_pool_association"`

      - `"azurerm_network_interface_security_group_association"`

      - `"azurerm_network_security_group"`

      - `"azurerm_public_ip"`

      - `"azurerm_route"`

      - `"azurerm_route_table"`

      - `"azurerm_subnet"`

      - `"azurerm_subnet_route_table_association"`

      - `"azurerm_virtual_machine"`

      - `"azurerm_virtual_network_gateway_connection"`

      - `"azurerm_virtual_network"`

      - `"azurerm_virtual_network_gateway"`

      - `"google_compute_network"`

      - `"google_compute_subnetwork"`

      - `"google_compute_vpn_gateway"`

      - `"google_compute_vpn_tunnel"`

      - `"google_compute_route"`

      - `"google_compute_address"`

      - `"google_compute_global_address"`

      - `"google_compute_router"`

      - `"google_compute_interconnect_attachment"`

      - `"google_compute_ha_vpn_gateway"`

      - `"google_compute_forwarding_rule"`

      - `"google_compute_network_firewall_policy"`

      - `"google_compute_network_firewall_policy_rule"`

      - `"cloudflare_static_route"`

      - `"cloudflare_ipsec_tunnel"`

    - `sections: array of object { hidden_items, name, visible_items, help_text }`

      - `hidden_items: array of object { helpText, name, value }`

        - `helpText: optional string`

        - `name: optional string`

        - `value: optional object { item_type, string }  or object { item_type, yaml }  or object { item_type, yaml_diff }  or 2 more`

          - `McnStringItem object { item_type, string }`

            - `item_type: string`

            - `string: string`

          - `McnYamlItem object { item_type, yaml }`

            - `item_type: string`

            - `yaml: string`

          - `McnYamlDiffItem object { item_type, yaml_diff }`

            - `item_type: string`

            - `yaml_diff: object { diff, left_description, left_yaml, 2 more }`

              - `diff: string`

              - `left_description: string`

              - `left_yaml: string`

              - `right_description: string`

              - `right_yaml: string`

          - `McnResourcePreviewItem object { item_type, resource_preview }`

            - `item_type: string`

            - `resource_preview: object { id, cloud_type, detail, 3 more }`

              - `id: string`

              - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                - `"AWS"`

                - `"AZURE"`

                - `"GOOGLE"`

                - `"CLOUDFLARE"`

              - `detail: string`

              - `name: string`

              - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                - `"aws_customer_gateway"`

                - `"aws_egress_only_internet_gateway"`

                - `"aws_internet_gateway"`

                - `"aws_instance"`

                - `"aws_network_interface"`

                - `"aws_route"`

                - `"aws_route_table"`

                - `"aws_route_table_association"`

                - `"aws_subnet"`

                - `"aws_vpc"`

                - `"aws_vpc_ipv4_cidr_block_association"`

                - `"aws_vpn_connection"`

                - `"aws_vpn_connection_route"`

                - `"aws_vpn_gateway"`

                - `"aws_security_group"`

                - `"aws_vpc_security_group_ingress_rule"`

                - `"aws_vpc_security_group_egress_rule"`

                - `"aws_ec2_managed_prefix_list"`

                - `"aws_ec2_transit_gateway"`

                - `"aws_ec2_transit_gateway_prefix_list_reference"`

                - `"aws_ec2_transit_gateway_vpc_attachment"`

                - `"azurerm_application_security_group"`

                - `"azurerm_lb"`

                - `"azurerm_lb_backend_address_pool"`

                - `"azurerm_lb_nat_pool"`

                - `"azurerm_lb_nat_rule"`

                - `"azurerm_lb_rule"`

                - `"azurerm_local_network_gateway"`

                - `"azurerm_network_interface"`

                - `"azurerm_network_interface_application_security_group_association"`

                - `"azurerm_network_interface_backend_address_pool_association"`

                - `"azurerm_network_interface_security_group_association"`

                - `"azurerm_network_security_group"`

                - `"azurerm_public_ip"`

                - `"azurerm_route"`

                - `"azurerm_route_table"`

                - `"azurerm_subnet"`

                - `"azurerm_subnet_route_table_association"`

                - `"azurerm_virtual_machine"`

                - `"azurerm_virtual_network_gateway_connection"`

                - `"azurerm_virtual_network"`

                - `"azurerm_virtual_network_gateway"`

                - `"google_compute_network"`

                - `"google_compute_subnetwork"`

                - `"google_compute_vpn_gateway"`

                - `"google_compute_vpn_tunnel"`

                - `"google_compute_route"`

                - `"google_compute_address"`

                - `"google_compute_global_address"`

                - `"google_compute_router"`

                - `"google_compute_interconnect_attachment"`

                - `"google_compute_ha_vpn_gateway"`

                - `"google_compute_forwarding_rule"`

                - `"google_compute_network_firewall_policy"`

                - `"google_compute_network_firewall_policy_rule"`

                - `"cloudflare_static_route"`

                - `"cloudflare_ipsec_tunnel"`

              - `title: string`

          - `McnListItem object { item_type, list }`

            - `item_type: string`

            - `list: array of object { item_type, string }  or object { item_type, resource_preview }`

              - `McnStringItem object { item_type, string }`

                - `item_type: string`

                - `string: string`

              - `McnResourcePreviewItem object { item_type, resource_preview }`

                - `item_type: string`

                - `resource_preview: object { id, cloud_type, detail, 3 more }`

                  - `id: string`

                  - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                    - `"AWS"`

                    - `"AZURE"`

                    - `"GOOGLE"`

                    - `"CLOUDFLARE"`

                  - `detail: string`

                  - `name: string`

                  - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                    - `"aws_customer_gateway"`

                    - `"aws_egress_only_internet_gateway"`

                    - `"aws_internet_gateway"`

                    - `"aws_instance"`

                    - `"aws_network_interface"`

                    - `"aws_route"`

                    - `"aws_route_table"`

                    - `"aws_route_table_association"`

                    - `"aws_subnet"`

                    - `"aws_vpc"`

                    - `"aws_vpc_ipv4_cidr_block_association"`

                    - `"aws_vpn_connection"`

                    - `"aws_vpn_connection_route"`

                    - `"aws_vpn_gateway"`

                    - `"aws_security_group"`

                    - `"aws_vpc_security_group_ingress_rule"`

                    - `"aws_vpc_security_group_egress_rule"`

                    - `"aws_ec2_managed_prefix_list"`

                    - `"aws_ec2_transit_gateway"`

                    - `"aws_ec2_transit_gateway_prefix_list_reference"`

                    - `"aws_ec2_transit_gateway_vpc_attachment"`

                    - `"azurerm_application_security_group"`

                    - `"azurerm_lb"`

                    - `"azurerm_lb_backend_address_pool"`

                    - `"azurerm_lb_nat_pool"`

                    - `"azurerm_lb_nat_rule"`

                    - `"azurerm_lb_rule"`

                    - `"azurerm_local_network_gateway"`

                    - `"azurerm_network_interface"`

                    - `"azurerm_network_interface_application_security_group_association"`

                    - `"azurerm_network_interface_backend_address_pool_association"`

                    - `"azurerm_network_interface_security_group_association"`

                    - `"azurerm_network_security_group"`

                    - `"azurerm_public_ip"`

                    - `"azurerm_route"`

                    - `"azurerm_route_table"`

                    - `"azurerm_subnet"`

                    - `"azurerm_subnet_route_table_association"`

                    - `"azurerm_virtual_machine"`

                    - `"azurerm_virtual_network_gateway_connection"`

                    - `"azurerm_virtual_network"`

                    - `"azurerm_virtual_network_gateway"`

                    - `"google_compute_network"`

                    - `"google_compute_subnetwork"`

                    - `"google_compute_vpn_gateway"`

                    - `"google_compute_vpn_tunnel"`

                    - `"google_compute_route"`

                    - `"google_compute_address"`

                    - `"google_compute_global_address"`

                    - `"google_compute_router"`

                    - `"google_compute_interconnect_attachment"`

                    - `"google_compute_ha_vpn_gateway"`

                    - `"google_compute_forwarding_rule"`

                    - `"google_compute_network_firewall_policy"`

                    - `"google_compute_network_firewall_policy_rule"`

                    - `"cloudflare_static_route"`

                    - `"cloudflare_ipsec_tunnel"`

                  - `title: string`

      - `name: string`

      - `visible_items: array of object { helpText, name, value }`

        - `helpText: optional string`

        - `name: optional string`

        - `value: optional object { item_type, string }  or object { item_type, yaml }  or object { item_type, yaml_diff }  or 2 more`

          - `McnStringItem object { item_type, string }`

            - `item_type: string`

            - `string: string`

          - `McnYamlItem object { item_type, yaml }`

            - `item_type: string`

            - `yaml: string`

          - `McnYamlDiffItem object { item_type, yaml_diff }`

            - `item_type: string`

            - `yaml_diff: object { diff, left_description, left_yaml, 2 more }`

              - `diff: string`

              - `left_description: string`

              - `left_yaml: string`

              - `right_description: string`

              - `right_yaml: string`

          - `McnResourcePreviewItem object { item_type, resource_preview }`

            - `item_type: string`

            - `resource_preview: object { id, cloud_type, detail, 3 more }`

              - `id: string`

              - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                - `"AWS"`

                - `"AZURE"`

                - `"GOOGLE"`

                - `"CLOUDFLARE"`

              - `detail: string`

              - `name: string`

              - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                - `"aws_customer_gateway"`

                - `"aws_egress_only_internet_gateway"`

                - `"aws_internet_gateway"`

                - `"aws_instance"`

                - `"aws_network_interface"`

                - `"aws_route"`

                - `"aws_route_table"`

                - `"aws_route_table_association"`

                - `"aws_subnet"`

                - `"aws_vpc"`

                - `"aws_vpc_ipv4_cidr_block_association"`

                - `"aws_vpn_connection"`

                - `"aws_vpn_connection_route"`

                - `"aws_vpn_gateway"`

                - `"aws_security_group"`

                - `"aws_vpc_security_group_ingress_rule"`

                - `"aws_vpc_security_group_egress_rule"`

                - `"aws_ec2_managed_prefix_list"`

                - `"aws_ec2_transit_gateway"`

                - `"aws_ec2_transit_gateway_prefix_list_reference"`

                - `"aws_ec2_transit_gateway_vpc_attachment"`

                - `"azurerm_application_security_group"`

                - `"azurerm_lb"`

                - `"azurerm_lb_backend_address_pool"`

                - `"azurerm_lb_nat_pool"`

                - `"azurerm_lb_nat_rule"`

                - `"azurerm_lb_rule"`

                - `"azurerm_local_network_gateway"`

                - `"azurerm_network_interface"`

                - `"azurerm_network_interface_application_security_group_association"`

                - `"azurerm_network_interface_backend_address_pool_association"`

                - `"azurerm_network_interface_security_group_association"`

                - `"azurerm_network_security_group"`

                - `"azurerm_public_ip"`

                - `"azurerm_route"`

                - `"azurerm_route_table"`

                - `"azurerm_subnet"`

                - `"azurerm_subnet_route_table_association"`

                - `"azurerm_virtual_machine"`

                - `"azurerm_virtual_network_gateway_connection"`

                - `"azurerm_virtual_network"`

                - `"azurerm_virtual_network_gateway"`

                - `"google_compute_network"`

                - `"google_compute_subnetwork"`

                - `"google_compute_vpn_gateway"`

                - `"google_compute_vpn_tunnel"`

                - `"google_compute_route"`

                - `"google_compute_address"`

                - `"google_compute_global_address"`

                - `"google_compute_router"`

                - `"google_compute_interconnect_attachment"`

                - `"google_compute_ha_vpn_gateway"`

                - `"google_compute_forwarding_rule"`

                - `"google_compute_network_firewall_policy"`

                - `"google_compute_network_firewall_policy_rule"`

                - `"cloudflare_static_route"`

                - `"cloudflare_ipsec_tunnel"`

              - `title: string`

          - `McnListItem object { item_type, list }`

            - `item_type: string`

            - `list: array of object { item_type, string }  or object { item_type, resource_preview }`

              - `McnStringItem object { item_type, string }`

                - `item_type: string`

                - `string: string`

              - `McnResourcePreviewItem object { item_type, resource_preview }`

                - `item_type: string`

                - `resource_preview: object { id, cloud_type, detail, 3 more }`

                  - `id: string`

                  - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                    - `"AWS"`

                    - `"AZURE"`

                    - `"GOOGLE"`

                    - `"CLOUDFLARE"`

                  - `detail: string`

                  - `name: string`

                  - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                    - `"aws_customer_gateway"`

                    - `"aws_egress_only_internet_gateway"`

                    - `"aws_internet_gateway"`

                    - `"aws_instance"`

                    - `"aws_network_interface"`

                    - `"aws_route"`

                    - `"aws_route_table"`

                    - `"aws_route_table_association"`

                    - `"aws_subnet"`

                    - `"aws_vpc"`

                    - `"aws_vpc_ipv4_cidr_block_association"`

                    - `"aws_vpn_connection"`

                    - `"aws_vpn_connection_route"`

                    - `"aws_vpn_gateway"`

                    - `"aws_security_group"`

                    - `"aws_vpc_security_group_ingress_rule"`

                    - `"aws_vpc_security_group_egress_rule"`

                    - `"aws_ec2_managed_prefix_list"`

                    - `"aws_ec2_transit_gateway"`

                    - `"aws_ec2_transit_gateway_prefix_list_reference"`

                    - `"aws_ec2_transit_gateway_vpc_attachment"`

                    - `"azurerm_application_security_group"`

                    - `"azurerm_lb"`

                    - `"azurerm_lb_backend_address_pool"`

                    - `"azurerm_lb_nat_pool"`

                    - `"azurerm_lb_nat_rule"`

                    - `"azurerm_lb_rule"`

                    - `"azurerm_local_network_gateway"`

                    - `"azurerm_network_interface"`

                    - `"azurerm_network_interface_application_security_group_association"`

                    - `"azurerm_network_interface_backend_address_pool_association"`

                    - `"azurerm_network_interface_security_group_association"`

                    - `"azurerm_network_security_group"`

                    - `"azurerm_public_ip"`

                    - `"azurerm_route"`

                    - `"azurerm_route_table"`

                    - `"azurerm_subnet"`

                    - `"azurerm_subnet_route_table_association"`

                    - `"azurerm_virtual_machine"`

                    - `"azurerm_virtual_network_gateway_connection"`

                    - `"azurerm_virtual_network"`

                    - `"azurerm_virtual_network_gateway"`

                    - `"google_compute_network"`

                    - `"google_compute_subnetwork"`

                    - `"google_compute_vpn_gateway"`

                    - `"google_compute_vpn_tunnel"`

                    - `"google_compute_route"`

                    - `"google_compute_address"`

                    - `"google_compute_global_address"`

                    - `"google_compute_router"`

                    - `"google_compute_interconnect_attachment"`

                    - `"google_compute_ha_vpn_gateway"`

                    - `"google_compute_forwarding_rule"`

                    - `"google_compute_network_firewall_policy"`

                    - `"google_compute_network_firewall_policy_rule"`

                    - `"cloudflare_static_route"`

                    - `"cloudflare_ipsec_tunnel"`

                  - `title: string`

      - `help_text: optional string`

    - `state: map[unknown]`

    - `tags: map[string]`

    - `updated_at: string`

    - `url: string`

    - `managed_by: optional array of object { id, client_type, name }`

      - `id: string`

      - `client_type: "MAGIC_WAN_CLOUD_ONRAMP"`

        - `"MAGIC_WAN_CLOUD_ONRAMP"`

      - `name: string`

  - `post_apply_resources_unavailable: optional boolean`

  - `region: optional string`

  - `status: optional object { apply_progress, lifecycle_state, plan_progress, 3 more }`

    - `apply_progress: object { done, total }`

      - `done: number`

      - `total: number`

    - `lifecycle_state: "OnrampNeedsApply" or "OnrampPendingPlan" or "OnrampPlanning" or 9 more`

      - `"OnrampNeedsApply"`

      - `"OnrampPendingPlan"`

      - `"OnrampPlanning"`

      - `"OnrampPlanFailed"`

      - `"OnrampPendingApproval"`

      - `"OnrampPendingApply"`

      - `"OnrampApplying"`

      - `"OnrampApplyFailed"`

      - `"OnrampActive"`

      - `"OnrampPendingDestroy"`

      - `"OnrampDestroying"`

      - `"OnrampDestroyFailed"`

    - `plan_progress: object { done, total }`

      - `done: number`

      - `total: number`

    - `routes: array of string`

    - `tunnels: array of string`

    - `lifecycle_errors: optional map[object { code, message, documentation_url, 2 more } ]`

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

  - `vpc: optional string`

  - `vpcs_by_id: optional map[object { id, account_id, cloud_type, 18 more } ]`

    - `id: string`

    - `account_id: string`

    - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

      - `"AWS"`

      - `"AZURE"`

      - `"GOOGLE"`

      - `"CLOUDFLARE"`

    - `config: map[unknown]`

    - `deployment_provider: string`

    - `managed: boolean`

    - `monthly_cost_estimate: object { currency, monthly_cost }`

      - `currency: string`

      - `monthly_cost: number`

    - `name: string`

    - `native_id: string`

    - `observations: map[object { first_observed_at, last_observed_at, provider_id, resource_id } ]`

      - `first_observed_at: string`

      - `last_observed_at: string`

      - `provider_id: string`

      - `resource_id: string`

    - `provider_ids: array of string`

    - `provider_names_by_id: map[string]`

    - `region: string`

    - `resource_group: string`

    - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

      - `"aws_customer_gateway"`

      - `"aws_egress_only_internet_gateway"`

      - `"aws_internet_gateway"`

      - `"aws_instance"`

      - `"aws_network_interface"`

      - `"aws_route"`

      - `"aws_route_table"`

      - `"aws_route_table_association"`

      - `"aws_subnet"`

      - `"aws_vpc"`

      - `"aws_vpc_ipv4_cidr_block_association"`

      - `"aws_vpn_connection"`

      - `"aws_vpn_connection_route"`

      - `"aws_vpn_gateway"`

      - `"aws_security_group"`

      - `"aws_vpc_security_group_ingress_rule"`

      - `"aws_vpc_security_group_egress_rule"`

      - `"aws_ec2_managed_prefix_list"`

      - `"aws_ec2_transit_gateway"`

      - `"aws_ec2_transit_gateway_prefix_list_reference"`

      - `"aws_ec2_transit_gateway_vpc_attachment"`

      - `"azurerm_application_security_group"`

      - `"azurerm_lb"`

      - `"azurerm_lb_backend_address_pool"`

      - `"azurerm_lb_nat_pool"`

      - `"azurerm_lb_nat_rule"`

      - `"azurerm_lb_rule"`

      - `"azurerm_local_network_gateway"`

      - `"azurerm_network_interface"`

      - `"azurerm_network_interface_application_security_group_association"`

      - `"azurerm_network_interface_backend_address_pool_association"`

      - `"azurerm_network_interface_security_group_association"`

      - `"azurerm_network_security_group"`

      - `"azurerm_public_ip"`

      - `"azurerm_route"`

      - `"azurerm_route_table"`

      - `"azurerm_subnet"`

      - `"azurerm_subnet_route_table_association"`

      - `"azurerm_virtual_machine"`

      - `"azurerm_virtual_network_gateway_connection"`

      - `"azurerm_virtual_network"`

      - `"azurerm_virtual_network_gateway"`

      - `"google_compute_network"`

      - `"google_compute_subnetwork"`

      - `"google_compute_vpn_gateway"`

      - `"google_compute_vpn_tunnel"`

      - `"google_compute_route"`

      - `"google_compute_address"`

      - `"google_compute_global_address"`

      - `"google_compute_router"`

      - `"google_compute_interconnect_attachment"`

      - `"google_compute_ha_vpn_gateway"`

      - `"google_compute_forwarding_rule"`

      - `"google_compute_network_firewall_policy"`

      - `"google_compute_network_firewall_policy_rule"`

      - `"cloudflare_static_route"`

      - `"cloudflare_ipsec_tunnel"`

    - `sections: array of object { hidden_items, name, visible_items, help_text }`

      - `hidden_items: array of object { helpText, name, value }`

        - `helpText: optional string`

        - `name: optional string`

        - `value: optional object { item_type, string }  or object { item_type, yaml }  or object { item_type, yaml_diff }  or 2 more`

          - `McnStringItem object { item_type, string }`

            - `item_type: string`

            - `string: string`

          - `McnYamlItem object { item_type, yaml }`

            - `item_type: string`

            - `yaml: string`

          - `McnYamlDiffItem object { item_type, yaml_diff }`

            - `item_type: string`

            - `yaml_diff: object { diff, left_description, left_yaml, 2 more }`

              - `diff: string`

              - `left_description: string`

              - `left_yaml: string`

              - `right_description: string`

              - `right_yaml: string`

          - `McnResourcePreviewItem object { item_type, resource_preview }`

            - `item_type: string`

            - `resource_preview: object { id, cloud_type, detail, 3 more }`

              - `id: string`

              - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                - `"AWS"`

                - `"AZURE"`

                - `"GOOGLE"`

                - `"CLOUDFLARE"`

              - `detail: string`

              - `name: string`

              - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                - `"aws_customer_gateway"`

                - `"aws_egress_only_internet_gateway"`

                - `"aws_internet_gateway"`

                - `"aws_instance"`

                - `"aws_network_interface"`

                - `"aws_route"`

                - `"aws_route_table"`

                - `"aws_route_table_association"`

                - `"aws_subnet"`

                - `"aws_vpc"`

                - `"aws_vpc_ipv4_cidr_block_association"`

                - `"aws_vpn_connection"`

                - `"aws_vpn_connection_route"`

                - `"aws_vpn_gateway"`

                - `"aws_security_group"`

                - `"aws_vpc_security_group_ingress_rule"`

                - `"aws_vpc_security_group_egress_rule"`

                - `"aws_ec2_managed_prefix_list"`

                - `"aws_ec2_transit_gateway"`

                - `"aws_ec2_transit_gateway_prefix_list_reference"`

                - `"aws_ec2_transit_gateway_vpc_attachment"`

                - `"azurerm_application_security_group"`

                - `"azurerm_lb"`

                - `"azurerm_lb_backend_address_pool"`

                - `"azurerm_lb_nat_pool"`

                - `"azurerm_lb_nat_rule"`

                - `"azurerm_lb_rule"`

                - `"azurerm_local_network_gateway"`

                - `"azurerm_network_interface"`

                - `"azurerm_network_interface_application_security_group_association"`

                - `"azurerm_network_interface_backend_address_pool_association"`

                - `"azurerm_network_interface_security_group_association"`

                - `"azurerm_network_security_group"`

                - `"azurerm_public_ip"`

                - `"azurerm_route"`

                - `"azurerm_route_table"`

                - `"azurerm_subnet"`

                - `"azurerm_subnet_route_table_association"`

                - `"azurerm_virtual_machine"`

                - `"azurerm_virtual_network_gateway_connection"`

                - `"azurerm_virtual_network"`

                - `"azurerm_virtual_network_gateway"`

                - `"google_compute_network"`

                - `"google_compute_subnetwork"`

                - `"google_compute_vpn_gateway"`

                - `"google_compute_vpn_tunnel"`

                - `"google_compute_route"`

                - `"google_compute_address"`

                - `"google_compute_global_address"`

                - `"google_compute_router"`

                - `"google_compute_interconnect_attachment"`

                - `"google_compute_ha_vpn_gateway"`

                - `"google_compute_forwarding_rule"`

                - `"google_compute_network_firewall_policy"`

                - `"google_compute_network_firewall_policy_rule"`

                - `"cloudflare_static_route"`

                - `"cloudflare_ipsec_tunnel"`

              - `title: string`

          - `McnListItem object { item_type, list }`

            - `item_type: string`

            - `list: array of object { item_type, string }  or object { item_type, resource_preview }`

              - `McnStringItem object { item_type, string }`

                - `item_type: string`

                - `string: string`

              - `McnResourcePreviewItem object { item_type, resource_preview }`

                - `item_type: string`

                - `resource_preview: object { id, cloud_type, detail, 3 more }`

                  - `id: string`

                  - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                    - `"AWS"`

                    - `"AZURE"`

                    - `"GOOGLE"`

                    - `"CLOUDFLARE"`

                  - `detail: string`

                  - `name: string`

                  - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                    - `"aws_customer_gateway"`

                    - `"aws_egress_only_internet_gateway"`

                    - `"aws_internet_gateway"`

                    - `"aws_instance"`

                    - `"aws_network_interface"`

                    - `"aws_route"`

                    - `"aws_route_table"`

                    - `"aws_route_table_association"`

                    - `"aws_subnet"`

                    - `"aws_vpc"`

                    - `"aws_vpc_ipv4_cidr_block_association"`

                    - `"aws_vpn_connection"`

                    - `"aws_vpn_connection_route"`

                    - `"aws_vpn_gateway"`

                    - `"aws_security_group"`

                    - `"aws_vpc_security_group_ingress_rule"`

                    - `"aws_vpc_security_group_egress_rule"`

                    - `"aws_ec2_managed_prefix_list"`

                    - `"aws_ec2_transit_gateway"`

                    - `"aws_ec2_transit_gateway_prefix_list_reference"`

                    - `"aws_ec2_transit_gateway_vpc_attachment"`

                    - `"azurerm_application_security_group"`

                    - `"azurerm_lb"`

                    - `"azurerm_lb_backend_address_pool"`

                    - `"azurerm_lb_nat_pool"`

                    - `"azurerm_lb_nat_rule"`

                    - `"azurerm_lb_rule"`

                    - `"azurerm_local_network_gateway"`

                    - `"azurerm_network_interface"`

                    - `"azurerm_network_interface_application_security_group_association"`

                    - `"azurerm_network_interface_backend_address_pool_association"`

                    - `"azurerm_network_interface_security_group_association"`

                    - `"azurerm_network_security_group"`

                    - `"azurerm_public_ip"`

                    - `"azurerm_route"`

                    - `"azurerm_route_table"`

                    - `"azurerm_subnet"`

                    - `"azurerm_subnet_route_table_association"`

                    - `"azurerm_virtual_machine"`

                    - `"azurerm_virtual_network_gateway_connection"`

                    - `"azurerm_virtual_network"`

                    - `"azurerm_virtual_network_gateway"`

                    - `"google_compute_network"`

                    - `"google_compute_subnetwork"`

                    - `"google_compute_vpn_gateway"`

                    - `"google_compute_vpn_tunnel"`

                    - `"google_compute_route"`

                    - `"google_compute_address"`

                    - `"google_compute_global_address"`

                    - `"google_compute_router"`

                    - `"google_compute_interconnect_attachment"`

                    - `"google_compute_ha_vpn_gateway"`

                    - `"google_compute_forwarding_rule"`

                    - `"google_compute_network_firewall_policy"`

                    - `"google_compute_network_firewall_policy_rule"`

                    - `"cloudflare_static_route"`

                    - `"cloudflare_ipsec_tunnel"`

                  - `title: string`

      - `name: string`

      - `visible_items: array of object { helpText, name, value }`

        - `helpText: optional string`

        - `name: optional string`

        - `value: optional object { item_type, string }  or object { item_type, yaml }  or object { item_type, yaml_diff }  or 2 more`

          - `McnStringItem object { item_type, string }`

            - `item_type: string`

            - `string: string`

          - `McnYamlItem object { item_type, yaml }`

            - `item_type: string`

            - `yaml: string`

          - `McnYamlDiffItem object { item_type, yaml_diff }`

            - `item_type: string`

            - `yaml_diff: object { diff, left_description, left_yaml, 2 more }`

              - `diff: string`

              - `left_description: string`

              - `left_yaml: string`

              - `right_description: string`

              - `right_yaml: string`

          - `McnResourcePreviewItem object { item_type, resource_preview }`

            - `item_type: string`

            - `resource_preview: object { id, cloud_type, detail, 3 more }`

              - `id: string`

              - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                - `"AWS"`

                - `"AZURE"`

                - `"GOOGLE"`

                - `"CLOUDFLARE"`

              - `detail: string`

              - `name: string`

              - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                - `"aws_customer_gateway"`

                - `"aws_egress_only_internet_gateway"`

                - `"aws_internet_gateway"`

                - `"aws_instance"`

                - `"aws_network_interface"`

                - `"aws_route"`

                - `"aws_route_table"`

                - `"aws_route_table_association"`

                - `"aws_subnet"`

                - `"aws_vpc"`

                - `"aws_vpc_ipv4_cidr_block_association"`

                - `"aws_vpn_connection"`

                - `"aws_vpn_connection_route"`

                - `"aws_vpn_gateway"`

                - `"aws_security_group"`

                - `"aws_vpc_security_group_ingress_rule"`

                - `"aws_vpc_security_group_egress_rule"`

                - `"aws_ec2_managed_prefix_list"`

                - `"aws_ec2_transit_gateway"`

                - `"aws_ec2_transit_gateway_prefix_list_reference"`

                - `"aws_ec2_transit_gateway_vpc_attachment"`

                - `"azurerm_application_security_group"`

                - `"azurerm_lb"`

                - `"azurerm_lb_backend_address_pool"`

                - `"azurerm_lb_nat_pool"`

                - `"azurerm_lb_nat_rule"`

                - `"azurerm_lb_rule"`

                - `"azurerm_local_network_gateway"`

                - `"azurerm_network_interface"`

                - `"azurerm_network_interface_application_security_group_association"`

                - `"azurerm_network_interface_backend_address_pool_association"`

                - `"azurerm_network_interface_security_group_association"`

                - `"azurerm_network_security_group"`

                - `"azurerm_public_ip"`

                - `"azurerm_route"`

                - `"azurerm_route_table"`

                - `"azurerm_subnet"`

                - `"azurerm_subnet_route_table_association"`

                - `"azurerm_virtual_machine"`

                - `"azurerm_virtual_network_gateway_connection"`

                - `"azurerm_virtual_network"`

                - `"azurerm_virtual_network_gateway"`

                - `"google_compute_network"`

                - `"google_compute_subnetwork"`

                - `"google_compute_vpn_gateway"`

                - `"google_compute_vpn_tunnel"`

                - `"google_compute_route"`

                - `"google_compute_address"`

                - `"google_compute_global_address"`

                - `"google_compute_router"`

                - `"google_compute_interconnect_attachment"`

                - `"google_compute_ha_vpn_gateway"`

                - `"google_compute_forwarding_rule"`

                - `"google_compute_network_firewall_policy"`

                - `"google_compute_network_firewall_policy_rule"`

                - `"cloudflare_static_route"`

                - `"cloudflare_ipsec_tunnel"`

              - `title: string`

          - `McnListItem object { item_type, list }`

            - `item_type: string`

            - `list: array of object { item_type, string }  or object { item_type, resource_preview }`

              - `McnStringItem object { item_type, string }`

                - `item_type: string`

                - `string: string`

              - `McnResourcePreviewItem object { item_type, resource_preview }`

                - `item_type: string`

                - `resource_preview: object { id, cloud_type, detail, 3 more }`

                  - `id: string`

                  - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                    - `"AWS"`

                    - `"AZURE"`

                    - `"GOOGLE"`

                    - `"CLOUDFLARE"`

                  - `detail: string`

                  - `name: string`

                  - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                    - `"aws_customer_gateway"`

                    - `"aws_egress_only_internet_gateway"`

                    - `"aws_internet_gateway"`

                    - `"aws_instance"`

                    - `"aws_network_interface"`

                    - `"aws_route"`

                    - `"aws_route_table"`

                    - `"aws_route_table_association"`

                    - `"aws_subnet"`

                    - `"aws_vpc"`

                    - `"aws_vpc_ipv4_cidr_block_association"`

                    - `"aws_vpn_connection"`

                    - `"aws_vpn_connection_route"`

                    - `"aws_vpn_gateway"`

                    - `"aws_security_group"`

                    - `"aws_vpc_security_group_ingress_rule"`

                    - `"aws_vpc_security_group_egress_rule"`

                    - `"aws_ec2_managed_prefix_list"`

                    - `"aws_ec2_transit_gateway"`

                    - `"aws_ec2_transit_gateway_prefix_list_reference"`

                    - `"aws_ec2_transit_gateway_vpc_attachment"`

                    - `"azurerm_application_security_group"`

                    - `"azurerm_lb"`

                    - `"azurerm_lb_backend_address_pool"`

                    - `"azurerm_lb_nat_pool"`

                    - `"azurerm_lb_nat_rule"`

                    - `"azurerm_lb_rule"`

                    - `"azurerm_local_network_gateway"`

                    - `"azurerm_network_interface"`

                    - `"azurerm_network_interface_application_security_group_association"`

                    - `"azurerm_network_interface_backend_address_pool_association"`

                    - `"azurerm_network_interface_security_group_association"`

                    - `"azurerm_network_security_group"`

                    - `"azurerm_public_ip"`

                    - `"azurerm_route"`

                    - `"azurerm_route_table"`

                    - `"azurerm_subnet"`

                    - `"azurerm_subnet_route_table_association"`

                    - `"azurerm_virtual_machine"`

                    - `"azurerm_virtual_network_gateway_connection"`

                    - `"azurerm_virtual_network"`

                    - `"azurerm_virtual_network_gateway"`

                    - `"google_compute_network"`

                    - `"google_compute_subnetwork"`

                    - `"google_compute_vpn_gateway"`

                    - `"google_compute_vpn_tunnel"`

                    - `"google_compute_route"`

                    - `"google_compute_address"`

                    - `"google_compute_global_address"`

                    - `"google_compute_router"`

                    - `"google_compute_interconnect_attachment"`

                    - `"google_compute_ha_vpn_gateway"`

                    - `"google_compute_forwarding_rule"`

                    - `"google_compute_network_firewall_policy"`

                    - `"google_compute_network_firewall_policy_rule"`

                    - `"cloudflare_static_route"`

                    - `"cloudflare_ipsec_tunnel"`

                  - `title: string`

      - `help_text: optional string`

    - `state: map[unknown]`

    - `tags: map[string]`

    - `updated_at: string`

    - `url: string`

    - `managed_by: optional array of object { id, client_type, name }`

      - `id: string`

      - `client_type: "MAGIC_WAN_CLOUD_ONRAMP"`

        - `"MAGIC_WAN_CLOUD_ONRAMP"`

      - `name: string`

  - `vpcs_by_id_unavailable: optional array of string`

    The list of vpc IDs for which resource details failed to generate.

### On Ramp Edit Response

- `OnRampEditResponse object { id, cloud_type, dynamic_routing, 26 more }`

  - `id: string`

  - `cloud_type: "AWS" or "AZURE" or "GOOGLE"`

    - `"AWS"`

    - `"AZURE"`

    - `"GOOGLE"`

  - `dynamic_routing: boolean`

  - `install_routes_in_cloud: boolean`

  - `install_routes_in_magic_wan: boolean`

  - `name: string`

  - `type: "OnrampTypeSingle" or "OnrampTypeHub"`

    - `"OnrampTypeSingle"`

    - `"OnrampTypeHub"`

  - `updated_at: string`

  - `attached_hubs: optional array of string`

  - `attached_vpcs: optional array of string`

  - `cloud_asn: optional number`

  - `description: optional string`

  - `hub: optional string`

  - `last_applied_at: optional string`

  - `last_exported_at: optional string`

  - `last_planned_at: optional string`

  - `manage_hub_to_hub_attachments: optional boolean`

  - `manage_vpc_to_hub_attachments: optional boolean`

  - `planned_monthly_cost_estimate: optional object { currency, current_monthly_cost, diff, proposed_monthly_cost }`

    - `currency: string`

    - `current_monthly_cost: number`

    - `diff: number`

    - `proposed_monthly_cost: number`

  - `planned_resources: optional array of object { diff, keys_require_replace, monthly_cost_estimate_diff, 2 more }`

    - `diff: object { diff, left_description, left_yaml, 2 more }`

      - `diff: string`

      - `left_description: string`

      - `left_yaml: string`

      - `right_description: string`

      - `right_yaml: string`

    - `keys_require_replace: array of string`

    - `monthly_cost_estimate_diff: object { currency, current_monthly_cost, diff, proposed_monthly_cost }`

      - `currency: string`

      - `current_monthly_cost: number`

      - `diff: number`

      - `proposed_monthly_cost: number`

    - `planned_action: "no_op" or "create" or "update" or 2 more`

      - `"no_op"`

      - `"create"`

      - `"update"`

      - `"replace"`

      - `"destroy"`

    - `resource: object { id, cloud_type, detail, 3 more }`

      - `id: string`

      - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

        - `"AWS"`

        - `"AZURE"`

        - `"GOOGLE"`

        - `"CLOUDFLARE"`

      - `detail: string`

      - `name: string`

      - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

        - `"aws_customer_gateway"`

        - `"aws_egress_only_internet_gateway"`

        - `"aws_internet_gateway"`

        - `"aws_instance"`

        - `"aws_network_interface"`

        - `"aws_route"`

        - `"aws_route_table"`

        - `"aws_route_table_association"`

        - `"aws_subnet"`

        - `"aws_vpc"`

        - `"aws_vpc_ipv4_cidr_block_association"`

        - `"aws_vpn_connection"`

        - `"aws_vpn_connection_route"`

        - `"aws_vpn_gateway"`

        - `"aws_security_group"`

        - `"aws_vpc_security_group_ingress_rule"`

        - `"aws_vpc_security_group_egress_rule"`

        - `"aws_ec2_managed_prefix_list"`

        - `"aws_ec2_transit_gateway"`

        - `"aws_ec2_transit_gateway_prefix_list_reference"`

        - `"aws_ec2_transit_gateway_vpc_attachment"`

        - `"azurerm_application_security_group"`

        - `"azurerm_lb"`

        - `"azurerm_lb_backend_address_pool"`

        - `"azurerm_lb_nat_pool"`

        - `"azurerm_lb_nat_rule"`

        - `"azurerm_lb_rule"`

        - `"azurerm_local_network_gateway"`

        - `"azurerm_network_interface"`

        - `"azurerm_network_interface_application_security_group_association"`

        - `"azurerm_network_interface_backend_address_pool_association"`

        - `"azurerm_network_interface_security_group_association"`

        - `"azurerm_network_security_group"`

        - `"azurerm_public_ip"`

        - `"azurerm_route"`

        - `"azurerm_route_table"`

        - `"azurerm_subnet"`

        - `"azurerm_subnet_route_table_association"`

        - `"azurerm_virtual_machine"`

        - `"azurerm_virtual_network_gateway_connection"`

        - `"azurerm_virtual_network"`

        - `"azurerm_virtual_network_gateway"`

        - `"google_compute_network"`

        - `"google_compute_subnetwork"`

        - `"google_compute_vpn_gateway"`

        - `"google_compute_vpn_tunnel"`

        - `"google_compute_route"`

        - `"google_compute_address"`

        - `"google_compute_global_address"`

        - `"google_compute_router"`

        - `"google_compute_interconnect_attachment"`

        - `"google_compute_ha_vpn_gateway"`

        - `"google_compute_forwarding_rule"`

        - `"google_compute_network_firewall_policy"`

        - `"google_compute_network_firewall_policy_rule"`

        - `"cloudflare_static_route"`

        - `"cloudflare_ipsec_tunnel"`

      - `title: string`

  - `planned_resources_unavailable: optional boolean`

  - `post_apply_monthly_cost_estimate: optional object { currency, monthly_cost }`

    - `currency: string`

    - `monthly_cost: number`

  - `post_apply_resources: optional map[object { id, account_id, cloud_type, 18 more } ]`

    - `id: string`

    - `account_id: string`

    - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

      - `"AWS"`

      - `"AZURE"`

      - `"GOOGLE"`

      - `"CLOUDFLARE"`

    - `config: map[unknown]`

    - `deployment_provider: string`

    - `managed: boolean`

    - `monthly_cost_estimate: object { currency, monthly_cost }`

      - `currency: string`

      - `monthly_cost: number`

    - `name: string`

    - `native_id: string`

    - `observations: map[object { first_observed_at, last_observed_at, provider_id, resource_id } ]`

      - `first_observed_at: string`

      - `last_observed_at: string`

      - `provider_id: string`

      - `resource_id: string`

    - `provider_ids: array of string`

    - `provider_names_by_id: map[string]`

    - `region: string`

    - `resource_group: string`

    - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

      - `"aws_customer_gateway"`

      - `"aws_egress_only_internet_gateway"`

      - `"aws_internet_gateway"`

      - `"aws_instance"`

      - `"aws_network_interface"`

      - `"aws_route"`

      - `"aws_route_table"`

      - `"aws_route_table_association"`

      - `"aws_subnet"`

      - `"aws_vpc"`

      - `"aws_vpc_ipv4_cidr_block_association"`

      - `"aws_vpn_connection"`

      - `"aws_vpn_connection_route"`

      - `"aws_vpn_gateway"`

      - `"aws_security_group"`

      - `"aws_vpc_security_group_ingress_rule"`

      - `"aws_vpc_security_group_egress_rule"`

      - `"aws_ec2_managed_prefix_list"`

      - `"aws_ec2_transit_gateway"`

      - `"aws_ec2_transit_gateway_prefix_list_reference"`

      - `"aws_ec2_transit_gateway_vpc_attachment"`

      - `"azurerm_application_security_group"`

      - `"azurerm_lb"`

      - `"azurerm_lb_backend_address_pool"`

      - `"azurerm_lb_nat_pool"`

      - `"azurerm_lb_nat_rule"`

      - `"azurerm_lb_rule"`

      - `"azurerm_local_network_gateway"`

      - `"azurerm_network_interface"`

      - `"azurerm_network_interface_application_security_group_association"`

      - `"azurerm_network_interface_backend_address_pool_association"`

      - `"azurerm_network_interface_security_group_association"`

      - `"azurerm_network_security_group"`

      - `"azurerm_public_ip"`

      - `"azurerm_route"`

      - `"azurerm_route_table"`

      - `"azurerm_subnet"`

      - `"azurerm_subnet_route_table_association"`

      - `"azurerm_virtual_machine"`

      - `"azurerm_virtual_network_gateway_connection"`

      - `"azurerm_virtual_network"`

      - `"azurerm_virtual_network_gateway"`

      - `"google_compute_network"`

      - `"google_compute_subnetwork"`

      - `"google_compute_vpn_gateway"`

      - `"google_compute_vpn_tunnel"`

      - `"google_compute_route"`

      - `"google_compute_address"`

      - `"google_compute_global_address"`

      - `"google_compute_router"`

      - `"google_compute_interconnect_attachment"`

      - `"google_compute_ha_vpn_gateway"`

      - `"google_compute_forwarding_rule"`

      - `"google_compute_network_firewall_policy"`

      - `"google_compute_network_firewall_policy_rule"`

      - `"cloudflare_static_route"`

      - `"cloudflare_ipsec_tunnel"`

    - `sections: array of object { hidden_items, name, visible_items, help_text }`

      - `hidden_items: array of object { helpText, name, value }`

        - `helpText: optional string`

        - `name: optional string`

        - `value: optional object { item_type, string }  or object { item_type, yaml }  or object { item_type, yaml_diff }  or 2 more`

          - `McnStringItem object { item_type, string }`

            - `item_type: string`

            - `string: string`

          - `McnYamlItem object { item_type, yaml }`

            - `item_type: string`

            - `yaml: string`

          - `McnYamlDiffItem object { item_type, yaml_diff }`

            - `item_type: string`

            - `yaml_diff: object { diff, left_description, left_yaml, 2 more }`

              - `diff: string`

              - `left_description: string`

              - `left_yaml: string`

              - `right_description: string`

              - `right_yaml: string`

          - `McnResourcePreviewItem object { item_type, resource_preview }`

            - `item_type: string`

            - `resource_preview: object { id, cloud_type, detail, 3 more }`

              - `id: string`

              - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                - `"AWS"`

                - `"AZURE"`

                - `"GOOGLE"`

                - `"CLOUDFLARE"`

              - `detail: string`

              - `name: string`

              - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                - `"aws_customer_gateway"`

                - `"aws_egress_only_internet_gateway"`

                - `"aws_internet_gateway"`

                - `"aws_instance"`

                - `"aws_network_interface"`

                - `"aws_route"`

                - `"aws_route_table"`

                - `"aws_route_table_association"`

                - `"aws_subnet"`

                - `"aws_vpc"`

                - `"aws_vpc_ipv4_cidr_block_association"`

                - `"aws_vpn_connection"`

                - `"aws_vpn_connection_route"`

                - `"aws_vpn_gateway"`

                - `"aws_security_group"`

                - `"aws_vpc_security_group_ingress_rule"`

                - `"aws_vpc_security_group_egress_rule"`

                - `"aws_ec2_managed_prefix_list"`

                - `"aws_ec2_transit_gateway"`

                - `"aws_ec2_transit_gateway_prefix_list_reference"`

                - `"aws_ec2_transit_gateway_vpc_attachment"`

                - `"azurerm_application_security_group"`

                - `"azurerm_lb"`

                - `"azurerm_lb_backend_address_pool"`

                - `"azurerm_lb_nat_pool"`

                - `"azurerm_lb_nat_rule"`

                - `"azurerm_lb_rule"`

                - `"azurerm_local_network_gateway"`

                - `"azurerm_network_interface"`

                - `"azurerm_network_interface_application_security_group_association"`

                - `"azurerm_network_interface_backend_address_pool_association"`

                - `"azurerm_network_interface_security_group_association"`

                - `"azurerm_network_security_group"`

                - `"azurerm_public_ip"`

                - `"azurerm_route"`

                - `"azurerm_route_table"`

                - `"azurerm_subnet"`

                - `"azurerm_subnet_route_table_association"`

                - `"azurerm_virtual_machine"`

                - `"azurerm_virtual_network_gateway_connection"`

                - `"azurerm_virtual_network"`

                - `"azurerm_virtual_network_gateway"`

                - `"google_compute_network"`

                - `"google_compute_subnetwork"`

                - `"google_compute_vpn_gateway"`

                - `"google_compute_vpn_tunnel"`

                - `"google_compute_route"`

                - `"google_compute_address"`

                - `"google_compute_global_address"`

                - `"google_compute_router"`

                - `"google_compute_interconnect_attachment"`

                - `"google_compute_ha_vpn_gateway"`

                - `"google_compute_forwarding_rule"`

                - `"google_compute_network_firewall_policy"`

                - `"google_compute_network_firewall_policy_rule"`

                - `"cloudflare_static_route"`

                - `"cloudflare_ipsec_tunnel"`

              - `title: string`

          - `McnListItem object { item_type, list }`

            - `item_type: string`

            - `list: array of object { item_type, string }  or object { item_type, resource_preview }`

              - `McnStringItem object { item_type, string }`

                - `item_type: string`

                - `string: string`

              - `McnResourcePreviewItem object { item_type, resource_preview }`

                - `item_type: string`

                - `resource_preview: object { id, cloud_type, detail, 3 more }`

                  - `id: string`

                  - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                    - `"AWS"`

                    - `"AZURE"`

                    - `"GOOGLE"`

                    - `"CLOUDFLARE"`

                  - `detail: string`

                  - `name: string`

                  - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                    - `"aws_customer_gateway"`

                    - `"aws_egress_only_internet_gateway"`

                    - `"aws_internet_gateway"`

                    - `"aws_instance"`

                    - `"aws_network_interface"`

                    - `"aws_route"`

                    - `"aws_route_table"`

                    - `"aws_route_table_association"`

                    - `"aws_subnet"`

                    - `"aws_vpc"`

                    - `"aws_vpc_ipv4_cidr_block_association"`

                    - `"aws_vpn_connection"`

                    - `"aws_vpn_connection_route"`

                    - `"aws_vpn_gateway"`

                    - `"aws_security_group"`

                    - `"aws_vpc_security_group_ingress_rule"`

                    - `"aws_vpc_security_group_egress_rule"`

                    - `"aws_ec2_managed_prefix_list"`

                    - `"aws_ec2_transit_gateway"`

                    - `"aws_ec2_transit_gateway_prefix_list_reference"`

                    - `"aws_ec2_transit_gateway_vpc_attachment"`

                    - `"azurerm_application_security_group"`

                    - `"azurerm_lb"`

                    - `"azurerm_lb_backend_address_pool"`

                    - `"azurerm_lb_nat_pool"`

                    - `"azurerm_lb_nat_rule"`

                    - `"azurerm_lb_rule"`

                    - `"azurerm_local_network_gateway"`

                    - `"azurerm_network_interface"`

                    - `"azurerm_network_interface_application_security_group_association"`

                    - `"azurerm_network_interface_backend_address_pool_association"`

                    - `"azurerm_network_interface_security_group_association"`

                    - `"azurerm_network_security_group"`

                    - `"azurerm_public_ip"`

                    - `"azurerm_route"`

                    - `"azurerm_route_table"`

                    - `"azurerm_subnet"`

                    - `"azurerm_subnet_route_table_association"`

                    - `"azurerm_virtual_machine"`

                    - `"azurerm_virtual_network_gateway_connection"`

                    - `"azurerm_virtual_network"`

                    - `"azurerm_virtual_network_gateway"`

                    - `"google_compute_network"`

                    - `"google_compute_subnetwork"`

                    - `"google_compute_vpn_gateway"`

                    - `"google_compute_vpn_tunnel"`

                    - `"google_compute_route"`

                    - `"google_compute_address"`

                    - `"google_compute_global_address"`

                    - `"google_compute_router"`

                    - `"google_compute_interconnect_attachment"`

                    - `"google_compute_ha_vpn_gateway"`

                    - `"google_compute_forwarding_rule"`

                    - `"google_compute_network_firewall_policy"`

                    - `"google_compute_network_firewall_policy_rule"`

                    - `"cloudflare_static_route"`

                    - `"cloudflare_ipsec_tunnel"`

                  - `title: string`

      - `name: string`

      - `visible_items: array of object { helpText, name, value }`

        - `helpText: optional string`

        - `name: optional string`

        - `value: optional object { item_type, string }  or object { item_type, yaml }  or object { item_type, yaml_diff }  or 2 more`

          - `McnStringItem object { item_type, string }`

            - `item_type: string`

            - `string: string`

          - `McnYamlItem object { item_type, yaml }`

            - `item_type: string`

            - `yaml: string`

          - `McnYamlDiffItem object { item_type, yaml_diff }`

            - `item_type: string`

            - `yaml_diff: object { diff, left_description, left_yaml, 2 more }`

              - `diff: string`

              - `left_description: string`

              - `left_yaml: string`

              - `right_description: string`

              - `right_yaml: string`

          - `McnResourcePreviewItem object { item_type, resource_preview }`

            - `item_type: string`

            - `resource_preview: object { id, cloud_type, detail, 3 more }`

              - `id: string`

              - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                - `"AWS"`

                - `"AZURE"`

                - `"GOOGLE"`

                - `"CLOUDFLARE"`

              - `detail: string`

              - `name: string`

              - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                - `"aws_customer_gateway"`

                - `"aws_egress_only_internet_gateway"`

                - `"aws_internet_gateway"`

                - `"aws_instance"`

                - `"aws_network_interface"`

                - `"aws_route"`

                - `"aws_route_table"`

                - `"aws_route_table_association"`

                - `"aws_subnet"`

                - `"aws_vpc"`

                - `"aws_vpc_ipv4_cidr_block_association"`

                - `"aws_vpn_connection"`

                - `"aws_vpn_connection_route"`

                - `"aws_vpn_gateway"`

                - `"aws_security_group"`

                - `"aws_vpc_security_group_ingress_rule"`

                - `"aws_vpc_security_group_egress_rule"`

                - `"aws_ec2_managed_prefix_list"`

                - `"aws_ec2_transit_gateway"`

                - `"aws_ec2_transit_gateway_prefix_list_reference"`

                - `"aws_ec2_transit_gateway_vpc_attachment"`

                - `"azurerm_application_security_group"`

                - `"azurerm_lb"`

                - `"azurerm_lb_backend_address_pool"`

                - `"azurerm_lb_nat_pool"`

                - `"azurerm_lb_nat_rule"`

                - `"azurerm_lb_rule"`

                - `"azurerm_local_network_gateway"`

                - `"azurerm_network_interface"`

                - `"azurerm_network_interface_application_security_group_association"`

                - `"azurerm_network_interface_backend_address_pool_association"`

                - `"azurerm_network_interface_security_group_association"`

                - `"azurerm_network_security_group"`

                - `"azurerm_public_ip"`

                - `"azurerm_route"`

                - `"azurerm_route_table"`

                - `"azurerm_subnet"`

                - `"azurerm_subnet_route_table_association"`

                - `"azurerm_virtual_machine"`

                - `"azurerm_virtual_network_gateway_connection"`

                - `"azurerm_virtual_network"`

                - `"azurerm_virtual_network_gateway"`

                - `"google_compute_network"`

                - `"google_compute_subnetwork"`

                - `"google_compute_vpn_gateway"`

                - `"google_compute_vpn_tunnel"`

                - `"google_compute_route"`

                - `"google_compute_address"`

                - `"google_compute_global_address"`

                - `"google_compute_router"`

                - `"google_compute_interconnect_attachment"`

                - `"google_compute_ha_vpn_gateway"`

                - `"google_compute_forwarding_rule"`

                - `"google_compute_network_firewall_policy"`

                - `"google_compute_network_firewall_policy_rule"`

                - `"cloudflare_static_route"`

                - `"cloudflare_ipsec_tunnel"`

              - `title: string`

          - `McnListItem object { item_type, list }`

            - `item_type: string`

            - `list: array of object { item_type, string }  or object { item_type, resource_preview }`

              - `McnStringItem object { item_type, string }`

                - `item_type: string`

                - `string: string`

              - `McnResourcePreviewItem object { item_type, resource_preview }`

                - `item_type: string`

                - `resource_preview: object { id, cloud_type, detail, 3 more }`

                  - `id: string`

                  - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                    - `"AWS"`

                    - `"AZURE"`

                    - `"GOOGLE"`

                    - `"CLOUDFLARE"`

                  - `detail: string`

                  - `name: string`

                  - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                    - `"aws_customer_gateway"`

                    - `"aws_egress_only_internet_gateway"`

                    - `"aws_internet_gateway"`

                    - `"aws_instance"`

                    - `"aws_network_interface"`

                    - `"aws_route"`

                    - `"aws_route_table"`

                    - `"aws_route_table_association"`

                    - `"aws_subnet"`

                    - `"aws_vpc"`

                    - `"aws_vpc_ipv4_cidr_block_association"`

                    - `"aws_vpn_connection"`

                    - `"aws_vpn_connection_route"`

                    - `"aws_vpn_gateway"`

                    - `"aws_security_group"`

                    - `"aws_vpc_security_group_ingress_rule"`

                    - `"aws_vpc_security_group_egress_rule"`

                    - `"aws_ec2_managed_prefix_list"`

                    - `"aws_ec2_transit_gateway"`

                    - `"aws_ec2_transit_gateway_prefix_list_reference"`

                    - `"aws_ec2_transit_gateway_vpc_attachment"`

                    - `"azurerm_application_security_group"`

                    - `"azurerm_lb"`

                    - `"azurerm_lb_backend_address_pool"`

                    - `"azurerm_lb_nat_pool"`

                    - `"azurerm_lb_nat_rule"`

                    - `"azurerm_lb_rule"`

                    - `"azurerm_local_network_gateway"`

                    - `"azurerm_network_interface"`

                    - `"azurerm_network_interface_application_security_group_association"`

                    - `"azurerm_network_interface_backend_address_pool_association"`

                    - `"azurerm_network_interface_security_group_association"`

                    - `"azurerm_network_security_group"`

                    - `"azurerm_public_ip"`

                    - `"azurerm_route"`

                    - `"azurerm_route_table"`

                    - `"azurerm_subnet"`

                    - `"azurerm_subnet_route_table_association"`

                    - `"azurerm_virtual_machine"`

                    - `"azurerm_virtual_network_gateway_connection"`

                    - `"azurerm_virtual_network"`

                    - `"azurerm_virtual_network_gateway"`

                    - `"google_compute_network"`

                    - `"google_compute_subnetwork"`

                    - `"google_compute_vpn_gateway"`

                    - `"google_compute_vpn_tunnel"`

                    - `"google_compute_route"`

                    - `"google_compute_address"`

                    - `"google_compute_global_address"`

                    - `"google_compute_router"`

                    - `"google_compute_interconnect_attachment"`

                    - `"google_compute_ha_vpn_gateway"`

                    - `"google_compute_forwarding_rule"`

                    - `"google_compute_network_firewall_policy"`

                    - `"google_compute_network_firewall_policy_rule"`

                    - `"cloudflare_static_route"`

                    - `"cloudflare_ipsec_tunnel"`

                  - `title: string`

      - `help_text: optional string`

    - `state: map[unknown]`

    - `tags: map[string]`

    - `updated_at: string`

    - `url: string`

    - `managed_by: optional array of object { id, client_type, name }`

      - `id: string`

      - `client_type: "MAGIC_WAN_CLOUD_ONRAMP"`

        - `"MAGIC_WAN_CLOUD_ONRAMP"`

      - `name: string`

  - `post_apply_resources_unavailable: optional boolean`

  - `region: optional string`

  - `status: optional object { apply_progress, lifecycle_state, plan_progress, 3 more }`

    - `apply_progress: object { done, total }`

      - `done: number`

      - `total: number`

    - `lifecycle_state: "OnrampNeedsApply" or "OnrampPendingPlan" or "OnrampPlanning" or 9 more`

      - `"OnrampNeedsApply"`

      - `"OnrampPendingPlan"`

      - `"OnrampPlanning"`

      - `"OnrampPlanFailed"`

      - `"OnrampPendingApproval"`

      - `"OnrampPendingApply"`

      - `"OnrampApplying"`

      - `"OnrampApplyFailed"`

      - `"OnrampActive"`

      - `"OnrampPendingDestroy"`

      - `"OnrampDestroying"`

      - `"OnrampDestroyFailed"`

    - `plan_progress: object { done, total }`

      - `done: number`

      - `total: number`

    - `routes: array of string`

    - `tunnels: array of string`

    - `lifecycle_errors: optional map[object { code, message, documentation_url, 2 more } ]`

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

  - `vpc: optional string`

  - `vpcs_by_id: optional map[object { id, account_id, cloud_type, 18 more } ]`

    - `id: string`

    - `account_id: string`

    - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

      - `"AWS"`

      - `"AZURE"`

      - `"GOOGLE"`

      - `"CLOUDFLARE"`

    - `config: map[unknown]`

    - `deployment_provider: string`

    - `managed: boolean`

    - `monthly_cost_estimate: object { currency, monthly_cost }`

      - `currency: string`

      - `monthly_cost: number`

    - `name: string`

    - `native_id: string`

    - `observations: map[object { first_observed_at, last_observed_at, provider_id, resource_id } ]`

      - `first_observed_at: string`

      - `last_observed_at: string`

      - `provider_id: string`

      - `resource_id: string`

    - `provider_ids: array of string`

    - `provider_names_by_id: map[string]`

    - `region: string`

    - `resource_group: string`

    - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

      - `"aws_customer_gateway"`

      - `"aws_egress_only_internet_gateway"`

      - `"aws_internet_gateway"`

      - `"aws_instance"`

      - `"aws_network_interface"`

      - `"aws_route"`

      - `"aws_route_table"`

      - `"aws_route_table_association"`

      - `"aws_subnet"`

      - `"aws_vpc"`

      - `"aws_vpc_ipv4_cidr_block_association"`

      - `"aws_vpn_connection"`

      - `"aws_vpn_connection_route"`

      - `"aws_vpn_gateway"`

      - `"aws_security_group"`

      - `"aws_vpc_security_group_ingress_rule"`

      - `"aws_vpc_security_group_egress_rule"`

      - `"aws_ec2_managed_prefix_list"`

      - `"aws_ec2_transit_gateway"`

      - `"aws_ec2_transit_gateway_prefix_list_reference"`

      - `"aws_ec2_transit_gateway_vpc_attachment"`

      - `"azurerm_application_security_group"`

      - `"azurerm_lb"`

      - `"azurerm_lb_backend_address_pool"`

      - `"azurerm_lb_nat_pool"`

      - `"azurerm_lb_nat_rule"`

      - `"azurerm_lb_rule"`

      - `"azurerm_local_network_gateway"`

      - `"azurerm_network_interface"`

      - `"azurerm_network_interface_application_security_group_association"`

      - `"azurerm_network_interface_backend_address_pool_association"`

      - `"azurerm_network_interface_security_group_association"`

      - `"azurerm_network_security_group"`

      - `"azurerm_public_ip"`

      - `"azurerm_route"`

      - `"azurerm_route_table"`

      - `"azurerm_subnet"`

      - `"azurerm_subnet_route_table_association"`

      - `"azurerm_virtual_machine"`

      - `"azurerm_virtual_network_gateway_connection"`

      - `"azurerm_virtual_network"`

      - `"azurerm_virtual_network_gateway"`

      - `"google_compute_network"`

      - `"google_compute_subnetwork"`

      - `"google_compute_vpn_gateway"`

      - `"google_compute_vpn_tunnel"`

      - `"google_compute_route"`

      - `"google_compute_address"`

      - `"google_compute_global_address"`

      - `"google_compute_router"`

      - `"google_compute_interconnect_attachment"`

      - `"google_compute_ha_vpn_gateway"`

      - `"google_compute_forwarding_rule"`

      - `"google_compute_network_firewall_policy"`

      - `"google_compute_network_firewall_policy_rule"`

      - `"cloudflare_static_route"`

      - `"cloudflare_ipsec_tunnel"`

    - `sections: array of object { hidden_items, name, visible_items, help_text }`

      - `hidden_items: array of object { helpText, name, value }`

        - `helpText: optional string`

        - `name: optional string`

        - `value: optional object { item_type, string }  or object { item_type, yaml }  or object { item_type, yaml_diff }  or 2 more`

          - `McnStringItem object { item_type, string }`

            - `item_type: string`

            - `string: string`

          - `McnYamlItem object { item_type, yaml }`

            - `item_type: string`

            - `yaml: string`

          - `McnYamlDiffItem object { item_type, yaml_diff }`

            - `item_type: string`

            - `yaml_diff: object { diff, left_description, left_yaml, 2 more }`

              - `diff: string`

              - `left_description: string`

              - `left_yaml: string`

              - `right_description: string`

              - `right_yaml: string`

          - `McnResourcePreviewItem object { item_type, resource_preview }`

            - `item_type: string`

            - `resource_preview: object { id, cloud_type, detail, 3 more }`

              - `id: string`

              - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                - `"AWS"`

                - `"AZURE"`

                - `"GOOGLE"`

                - `"CLOUDFLARE"`

              - `detail: string`

              - `name: string`

              - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                - `"aws_customer_gateway"`

                - `"aws_egress_only_internet_gateway"`

                - `"aws_internet_gateway"`

                - `"aws_instance"`

                - `"aws_network_interface"`

                - `"aws_route"`

                - `"aws_route_table"`

                - `"aws_route_table_association"`

                - `"aws_subnet"`

                - `"aws_vpc"`

                - `"aws_vpc_ipv4_cidr_block_association"`

                - `"aws_vpn_connection"`

                - `"aws_vpn_connection_route"`

                - `"aws_vpn_gateway"`

                - `"aws_security_group"`

                - `"aws_vpc_security_group_ingress_rule"`

                - `"aws_vpc_security_group_egress_rule"`

                - `"aws_ec2_managed_prefix_list"`

                - `"aws_ec2_transit_gateway"`

                - `"aws_ec2_transit_gateway_prefix_list_reference"`

                - `"aws_ec2_transit_gateway_vpc_attachment"`

                - `"azurerm_application_security_group"`

                - `"azurerm_lb"`

                - `"azurerm_lb_backend_address_pool"`

                - `"azurerm_lb_nat_pool"`

                - `"azurerm_lb_nat_rule"`

                - `"azurerm_lb_rule"`

                - `"azurerm_local_network_gateway"`

                - `"azurerm_network_interface"`

                - `"azurerm_network_interface_application_security_group_association"`

                - `"azurerm_network_interface_backend_address_pool_association"`

                - `"azurerm_network_interface_security_group_association"`

                - `"azurerm_network_security_group"`

                - `"azurerm_public_ip"`

                - `"azurerm_route"`

                - `"azurerm_route_table"`

                - `"azurerm_subnet"`

                - `"azurerm_subnet_route_table_association"`

                - `"azurerm_virtual_machine"`

                - `"azurerm_virtual_network_gateway_connection"`

                - `"azurerm_virtual_network"`

                - `"azurerm_virtual_network_gateway"`

                - `"google_compute_network"`

                - `"google_compute_subnetwork"`

                - `"google_compute_vpn_gateway"`

                - `"google_compute_vpn_tunnel"`

                - `"google_compute_route"`

                - `"google_compute_address"`

                - `"google_compute_global_address"`

                - `"google_compute_router"`

                - `"google_compute_interconnect_attachment"`

                - `"google_compute_ha_vpn_gateway"`

                - `"google_compute_forwarding_rule"`

                - `"google_compute_network_firewall_policy"`

                - `"google_compute_network_firewall_policy_rule"`

                - `"cloudflare_static_route"`

                - `"cloudflare_ipsec_tunnel"`

              - `title: string`

          - `McnListItem object { item_type, list }`

            - `item_type: string`

            - `list: array of object { item_type, string }  or object { item_type, resource_preview }`

              - `McnStringItem object { item_type, string }`

                - `item_type: string`

                - `string: string`

              - `McnResourcePreviewItem object { item_type, resource_preview }`

                - `item_type: string`

                - `resource_preview: object { id, cloud_type, detail, 3 more }`

                  - `id: string`

                  - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                    - `"AWS"`

                    - `"AZURE"`

                    - `"GOOGLE"`

                    - `"CLOUDFLARE"`

                  - `detail: string`

                  - `name: string`

                  - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                    - `"aws_customer_gateway"`

                    - `"aws_egress_only_internet_gateway"`

                    - `"aws_internet_gateway"`

                    - `"aws_instance"`

                    - `"aws_network_interface"`

                    - `"aws_route"`

                    - `"aws_route_table"`

                    - `"aws_route_table_association"`

                    - `"aws_subnet"`

                    - `"aws_vpc"`

                    - `"aws_vpc_ipv4_cidr_block_association"`

                    - `"aws_vpn_connection"`

                    - `"aws_vpn_connection_route"`

                    - `"aws_vpn_gateway"`

                    - `"aws_security_group"`

                    - `"aws_vpc_security_group_ingress_rule"`

                    - `"aws_vpc_security_group_egress_rule"`

                    - `"aws_ec2_managed_prefix_list"`

                    - `"aws_ec2_transit_gateway"`

                    - `"aws_ec2_transit_gateway_prefix_list_reference"`

                    - `"aws_ec2_transit_gateway_vpc_attachment"`

                    - `"azurerm_application_security_group"`

                    - `"azurerm_lb"`

                    - `"azurerm_lb_backend_address_pool"`

                    - `"azurerm_lb_nat_pool"`

                    - `"azurerm_lb_nat_rule"`

                    - `"azurerm_lb_rule"`

                    - `"azurerm_local_network_gateway"`

                    - `"azurerm_network_interface"`

                    - `"azurerm_network_interface_application_security_group_association"`

                    - `"azurerm_network_interface_backend_address_pool_association"`

                    - `"azurerm_network_interface_security_group_association"`

                    - `"azurerm_network_security_group"`

                    - `"azurerm_public_ip"`

                    - `"azurerm_route"`

                    - `"azurerm_route_table"`

                    - `"azurerm_subnet"`

                    - `"azurerm_subnet_route_table_association"`

                    - `"azurerm_virtual_machine"`

                    - `"azurerm_virtual_network_gateway_connection"`

                    - `"azurerm_virtual_network"`

                    - `"azurerm_virtual_network_gateway"`

                    - `"google_compute_network"`

                    - `"google_compute_subnetwork"`

                    - `"google_compute_vpn_gateway"`

                    - `"google_compute_vpn_tunnel"`

                    - `"google_compute_route"`

                    - `"google_compute_address"`

                    - `"google_compute_global_address"`

                    - `"google_compute_router"`

                    - `"google_compute_interconnect_attachment"`

                    - `"google_compute_ha_vpn_gateway"`

                    - `"google_compute_forwarding_rule"`

                    - `"google_compute_network_firewall_policy"`

                    - `"google_compute_network_firewall_policy_rule"`

                    - `"cloudflare_static_route"`

                    - `"cloudflare_ipsec_tunnel"`

                  - `title: string`

      - `name: string`

      - `visible_items: array of object { helpText, name, value }`

        - `helpText: optional string`

        - `name: optional string`

        - `value: optional object { item_type, string }  or object { item_type, yaml }  or object { item_type, yaml_diff }  or 2 more`

          - `McnStringItem object { item_type, string }`

            - `item_type: string`

            - `string: string`

          - `McnYamlItem object { item_type, yaml }`

            - `item_type: string`

            - `yaml: string`

          - `McnYamlDiffItem object { item_type, yaml_diff }`

            - `item_type: string`

            - `yaml_diff: object { diff, left_description, left_yaml, 2 more }`

              - `diff: string`

              - `left_description: string`

              - `left_yaml: string`

              - `right_description: string`

              - `right_yaml: string`

          - `McnResourcePreviewItem object { item_type, resource_preview }`

            - `item_type: string`

            - `resource_preview: object { id, cloud_type, detail, 3 more }`

              - `id: string`

              - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                - `"AWS"`

                - `"AZURE"`

                - `"GOOGLE"`

                - `"CLOUDFLARE"`

              - `detail: string`

              - `name: string`

              - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                - `"aws_customer_gateway"`

                - `"aws_egress_only_internet_gateway"`

                - `"aws_internet_gateway"`

                - `"aws_instance"`

                - `"aws_network_interface"`

                - `"aws_route"`

                - `"aws_route_table"`

                - `"aws_route_table_association"`

                - `"aws_subnet"`

                - `"aws_vpc"`

                - `"aws_vpc_ipv4_cidr_block_association"`

                - `"aws_vpn_connection"`

                - `"aws_vpn_connection_route"`

                - `"aws_vpn_gateway"`

                - `"aws_security_group"`

                - `"aws_vpc_security_group_ingress_rule"`

                - `"aws_vpc_security_group_egress_rule"`

                - `"aws_ec2_managed_prefix_list"`

                - `"aws_ec2_transit_gateway"`

                - `"aws_ec2_transit_gateway_prefix_list_reference"`

                - `"aws_ec2_transit_gateway_vpc_attachment"`

                - `"azurerm_application_security_group"`

                - `"azurerm_lb"`

                - `"azurerm_lb_backend_address_pool"`

                - `"azurerm_lb_nat_pool"`

                - `"azurerm_lb_nat_rule"`

                - `"azurerm_lb_rule"`

                - `"azurerm_local_network_gateway"`

                - `"azurerm_network_interface"`

                - `"azurerm_network_interface_application_security_group_association"`

                - `"azurerm_network_interface_backend_address_pool_association"`

                - `"azurerm_network_interface_security_group_association"`

                - `"azurerm_network_security_group"`

                - `"azurerm_public_ip"`

                - `"azurerm_route"`

                - `"azurerm_route_table"`

                - `"azurerm_subnet"`

                - `"azurerm_subnet_route_table_association"`

                - `"azurerm_virtual_machine"`

                - `"azurerm_virtual_network_gateway_connection"`

                - `"azurerm_virtual_network"`

                - `"azurerm_virtual_network_gateway"`

                - `"google_compute_network"`

                - `"google_compute_subnetwork"`

                - `"google_compute_vpn_gateway"`

                - `"google_compute_vpn_tunnel"`

                - `"google_compute_route"`

                - `"google_compute_address"`

                - `"google_compute_global_address"`

                - `"google_compute_router"`

                - `"google_compute_interconnect_attachment"`

                - `"google_compute_ha_vpn_gateway"`

                - `"google_compute_forwarding_rule"`

                - `"google_compute_network_firewall_policy"`

                - `"google_compute_network_firewall_policy_rule"`

                - `"cloudflare_static_route"`

                - `"cloudflare_ipsec_tunnel"`

              - `title: string`

          - `McnListItem object { item_type, list }`

            - `item_type: string`

            - `list: array of object { item_type, string }  or object { item_type, resource_preview }`

              - `McnStringItem object { item_type, string }`

                - `item_type: string`

                - `string: string`

              - `McnResourcePreviewItem object { item_type, resource_preview }`

                - `item_type: string`

                - `resource_preview: object { id, cloud_type, detail, 3 more }`

                  - `id: string`

                  - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                    - `"AWS"`

                    - `"AZURE"`

                    - `"GOOGLE"`

                    - `"CLOUDFLARE"`

                  - `detail: string`

                  - `name: string`

                  - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                    - `"aws_customer_gateway"`

                    - `"aws_egress_only_internet_gateway"`

                    - `"aws_internet_gateway"`

                    - `"aws_instance"`

                    - `"aws_network_interface"`

                    - `"aws_route"`

                    - `"aws_route_table"`

                    - `"aws_route_table_association"`

                    - `"aws_subnet"`

                    - `"aws_vpc"`

                    - `"aws_vpc_ipv4_cidr_block_association"`

                    - `"aws_vpn_connection"`

                    - `"aws_vpn_connection_route"`

                    - `"aws_vpn_gateway"`

                    - `"aws_security_group"`

                    - `"aws_vpc_security_group_ingress_rule"`

                    - `"aws_vpc_security_group_egress_rule"`

                    - `"aws_ec2_managed_prefix_list"`

                    - `"aws_ec2_transit_gateway"`

                    - `"aws_ec2_transit_gateway_prefix_list_reference"`

                    - `"aws_ec2_transit_gateway_vpc_attachment"`

                    - `"azurerm_application_security_group"`

                    - `"azurerm_lb"`

                    - `"azurerm_lb_backend_address_pool"`

                    - `"azurerm_lb_nat_pool"`

                    - `"azurerm_lb_nat_rule"`

                    - `"azurerm_lb_rule"`

                    - `"azurerm_local_network_gateway"`

                    - `"azurerm_network_interface"`

                    - `"azurerm_network_interface_application_security_group_association"`

                    - `"azurerm_network_interface_backend_address_pool_association"`

                    - `"azurerm_network_interface_security_group_association"`

                    - `"azurerm_network_security_group"`

                    - `"azurerm_public_ip"`

                    - `"azurerm_route"`

                    - `"azurerm_route_table"`

                    - `"azurerm_subnet"`

                    - `"azurerm_subnet_route_table_association"`

                    - `"azurerm_virtual_machine"`

                    - `"azurerm_virtual_network_gateway_connection"`

                    - `"azurerm_virtual_network"`

                    - `"azurerm_virtual_network_gateway"`

                    - `"google_compute_network"`

                    - `"google_compute_subnetwork"`

                    - `"google_compute_vpn_gateway"`

                    - `"google_compute_vpn_tunnel"`

                    - `"google_compute_route"`

                    - `"google_compute_address"`

                    - `"google_compute_global_address"`

                    - `"google_compute_router"`

                    - `"google_compute_interconnect_attachment"`

                    - `"google_compute_ha_vpn_gateway"`

                    - `"google_compute_forwarding_rule"`

                    - `"google_compute_network_firewall_policy"`

                    - `"google_compute_network_firewall_policy_rule"`

                    - `"cloudflare_static_route"`

                    - `"cloudflare_ipsec_tunnel"`

                  - `title: string`

      - `help_text: optional string`

    - `state: map[unknown]`

    - `tags: map[string]`

    - `updated_at: string`

    - `url: string`

    - `managed_by: optional array of object { id, client_type, name }`

      - `id: string`

      - `client_type: "MAGIC_WAN_CLOUD_ONRAMP"`

        - `"MAGIC_WAN_CLOUD_ONRAMP"`

      - `name: string`

  - `vpcs_by_id_unavailable: optional array of string`

    The list of vpc IDs for which resource details failed to generate.

### On Ramp Delete Response

- `OnRampDeleteResponse object { id }`

  - `id: string`

### On Ramp Apply Response

- `OnRampApplyResponse object { errors, messages, success }`

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

  - `success: boolean`

### On Ramp Plan Response

- `OnRampPlanResponse object { errors, messages, success }`

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

  - `success: boolean`

# Address Spaces

## Read Magic WAN Address Space

**get** `/accounts/{account_id}/magic/cloud/onramps/magic_wan_address_space`

Read the Magic WAN Address Space (Closed Beta).

### Path Parameters

- `account_id: string`

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

- `result: object { prefixes }`

  - `prefixes: array of string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/cloud/onramps/magic_wan_address_space \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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
    "prefixes": [
      "192.168.0.0/16"
    ]
  },
  "success": true
}
```

## Update Magic WAN Address Space

**put** `/accounts/{account_id}/magic/cloud/onramps/magic_wan_address_space`

Update the Magic WAN Address Space (Closed Beta).

### Path Parameters

- `account_id: string`

### Body Parameters

- `prefixes: array of string`

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

- `result: object { prefixes }`

  - `prefixes: array of string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/cloud/onramps/magic_wan_address_space \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "prefixes": [
            "192.168.0.0/16"
          ]
        }'
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
    "prefixes": [
      "192.168.0.0/16"
    ]
  },
  "success": true
}
```

## Patch Magic WAN Address Space

**patch** `/accounts/{account_id}/magic/cloud/onramps/magic_wan_address_space`

Update the Magic WAN Address Space (Closed Beta).

### Path Parameters

- `account_id: string`

### Body Parameters

- `prefixes: array of string`

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

- `result: object { prefixes }`

  - `prefixes: array of string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/cloud/onramps/magic_wan_address_space \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "prefixes": [
            "192.168.0.0/16"
          ]
        }'
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
    "prefixes": [
      "192.168.0.0/16"
    ]
  },
  "success": true
}
```

## Domain Types

### Address Space List Response

- `AddressSpaceListResponse object { prefixes }`

  - `prefixes: array of string`

### Address Space Update Response

- `AddressSpaceUpdateResponse object { prefixes }`

  - `prefixes: array of string`

### Address Space Edit Response

- `AddressSpaceEditResponse object { prefixes }`

  - `prefixes: array of string`

# Cloud Integrations

## List Cloud Integrations

**get** `/accounts/{account_id}/magic/cloud/providers`

List Cloud Integrations (Closed Beta).

### Path Parameters

- `account_id: string`

### Query Parameters

- `cloudflare: optional boolean`

- `desc: optional boolean`

- `order_by: optional string`

  One of ["updated_at", "id", "cloud_type", "name"].

- `status: optional boolean`

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

- `result: array of object { id, cloud_type, friendly_name, 11 more }`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/cloud/providers \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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
  "result": [
    {
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
    }
  ],
  "success": true
}
```

## Read Cloud Integration

**get** `/accounts/{account_id}/magic/cloud/providers/{provider_id}`

Read a Cloud Integration (Closed Beta).

### Path Parameters

- `account_id: string`

- `provider_id: string`

### Query Parameters

- `status: optional boolean`

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
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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

## Create Cloud Integration

**post** `/accounts/{account_id}/magic/cloud/providers`

Create a new Cloud Integration (Closed Beta).

### Path Parameters

- `account_id: string`

### Header Parameters

- `forwarded: optional string`

### Body Parameters

- `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

  - `"AWS"`

  - `"AZURE"`

  - `"GOOGLE"`

  - `"CLOUDFLARE"`

- `friendly_name: string`

- `description: optional string`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/cloud/providers \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "cloud_type": "AWS",
          "friendly_name": "friendly_name"
        }'
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

## Update Cloud Integration

**put** `/accounts/{account_id}/magic/cloud/providers/{provider_id}`

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
    -X PUT \
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

## Delete Cloud Integration

**delete** `/accounts/{account_id}/magic/cloud/providers/{provider_id}`

Delete a Cloud Integration (Closed Beta).

### Path Parameters

- `account_id: string`

- `provider_id: string`

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

- `result: object { id }`

  - `id: string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/cloud/providers/$PROVIDER_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
  },
  "success": true
}
```

## Run Discovery for All Integrations

**post** `/accounts/{account_id}/magic/cloud/providers/discover`

Run discovery for all Cloud Integrations in an account (Closed Beta).

### Path Parameters

- `account_id: string`

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

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/cloud/providers/discover \
    -X POST \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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
  "success": true
}
```

## Run Discovery

**post** `/accounts/{account_id}/magic/cloud/providers/{provider_id}/discover`

Run discovery for a Cloud Integration (Closed Beta).

### Path Parameters

- `account_id: string`

- `provider_id: string`

### Query Parameters

- `v2: optional boolean`

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

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/cloud/providers/$PROVIDER_ID/discover \
    -X POST \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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
  "success": true
}
```

## Get Cloud Integration Setup Config

**get** `/accounts/{account_id}/magic/cloud/providers/{provider_id}/initial_setup`

Get initial configuration to complete Cloud Integration setup (Closed Beta).

### Path Parameters

- `account_id: string`

- `provider_id: string`

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

- `result: object { aws_trust_policy, item_type }  or object { azure_consent_url, integration_identity_tag, item_type, tag_cli_command }  or object { integration_identity_tag, item_type, tag_cli_command }`

  - `McnAwsTrustPolicy object { aws_trust_policy, item_type }`

    - `aws_trust_policy: string`

    - `item_type: string`

  - `McnAzureSetup object { azure_consent_url, integration_identity_tag, item_type, tag_cli_command }`

    - `azure_consent_url: string`

    - `integration_identity_tag: string`

    - `item_type: string`

    - `tag_cli_command: string`

  - `McnGcpSetup object { integration_identity_tag, item_type, tag_cli_command }`

    - `integration_identity_tag: string`

    - `item_type: string`

    - `tag_cli_command: string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/cloud/providers/$PROVIDER_ID/initial_setup \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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
    "aws_trust_policy": "aws_trust_policy",
    "item_type": "item_type"
  },
  "success": true
}
```

## Domain Types

### Cloud Integration List Response

- `CloudIntegrationListResponse object { id, cloud_type, friendly_name, 11 more }`

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

### Cloud Integration Get Response

- `CloudIntegrationGetResponse object { id, cloud_type, friendly_name, 11 more }`

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

### Cloud Integration Create Response

- `CloudIntegrationCreateResponse object { id, cloud_type, friendly_name, 11 more }`

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

### Cloud Integration Update Response

- `CloudIntegrationUpdateResponse object { id, cloud_type, friendly_name, 11 more }`

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

### Cloud Integration Edit Response

- `CloudIntegrationEditResponse object { id, cloud_type, friendly_name, 11 more }`

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

### Cloud Integration Delete Response

- `CloudIntegrationDeleteResponse object { id }`

  - `id: string`

### Cloud Integration Discover All Response

- `CloudIntegrationDiscoverAllResponse object { errors, messages, success }`

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

  - `success: boolean`

### Cloud Integration Discover Response

- `CloudIntegrationDiscoverResponse object { errors, messages, success }`

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

  - `success: boolean`

### Cloud Integration Initial Setup Response

- `CloudIntegrationInitialSetupResponse = object { aws_trust_policy, item_type }  or object { azure_consent_url, integration_identity_tag, item_type, tag_cli_command }  or object { integration_identity_tag, item_type, tag_cli_command }`

  - `McnAwsTrustPolicy object { aws_trust_policy, item_type }`

    - `aws_trust_policy: string`

    - `item_type: string`

  - `McnAzureSetup object { azure_consent_url, integration_identity_tag, item_type, tag_cli_command }`

    - `azure_consent_url: string`

    - `integration_identity_tag: string`

    - `item_type: string`

    - `tag_cli_command: string`

  - `McnGcpSetup object { integration_identity_tag, item_type, tag_cli_command }`

    - `integration_identity_tag: string`

    - `item_type: string`

    - `tag_cli_command: string`

# Resources

## List Resources

**get** `/accounts/{account_id}/magic/cloud/resources`

List resources in the Resource Catalog (Closed Beta).

### Path Parameters

- `account_id: string`

### Query Parameters

- `cloudflare: optional boolean`

- `desc: optional boolean`

- `managed: optional boolean`

- `order_by: optional string`

  One of ["id", "resource_type", "region"].

- `page: optional number`

- `per_page: optional number`

- `provider_id: optional string`

- `region: optional string`

- `resource_group: optional string`

- `resource_id: optional array of string`

- `resource_type: optional array of "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

  - `"aws_customer_gateway"`

  - `"aws_egress_only_internet_gateway"`

  - `"aws_internet_gateway"`

  - `"aws_instance"`

  - `"aws_network_interface"`

  - `"aws_route"`

  - `"aws_route_table"`

  - `"aws_route_table_association"`

  - `"aws_subnet"`

  - `"aws_vpc"`

  - `"aws_vpc_ipv4_cidr_block_association"`

  - `"aws_vpn_connection"`

  - `"aws_vpn_connection_route"`

  - `"aws_vpn_gateway"`

  - `"aws_security_group"`

  - `"aws_vpc_security_group_ingress_rule"`

  - `"aws_vpc_security_group_egress_rule"`

  - `"aws_ec2_managed_prefix_list"`

  - `"aws_ec2_transit_gateway"`

  - `"aws_ec2_transit_gateway_prefix_list_reference"`

  - `"aws_ec2_transit_gateway_vpc_attachment"`

  - `"azurerm_application_security_group"`

  - `"azurerm_lb"`

  - `"azurerm_lb_backend_address_pool"`

  - `"azurerm_lb_nat_pool"`

  - `"azurerm_lb_nat_rule"`

  - `"azurerm_lb_rule"`

  - `"azurerm_local_network_gateway"`

  - `"azurerm_network_interface"`

  - `"azurerm_network_interface_application_security_group_association"`

  - `"azurerm_network_interface_backend_address_pool_association"`

  - `"azurerm_network_interface_security_group_association"`

  - `"azurerm_network_security_group"`

  - `"azurerm_public_ip"`

  - `"azurerm_route"`

  - `"azurerm_route_table"`

  - `"azurerm_subnet"`

  - `"azurerm_subnet_route_table_association"`

  - `"azurerm_virtual_machine"`

  - `"azurerm_virtual_network_gateway_connection"`

  - `"azurerm_virtual_network"`

  - `"azurerm_virtual_network_gateway"`

  - `"google_compute_network"`

  - `"google_compute_subnetwork"`

  - `"google_compute_vpn_gateway"`

  - `"google_compute_vpn_tunnel"`

  - `"google_compute_route"`

  - `"google_compute_address"`

  - `"google_compute_global_address"`

  - `"google_compute_router"`

  - `"google_compute_interconnect_attachment"`

  - `"google_compute_ha_vpn_gateway"`

  - `"google_compute_forwarding_rule"`

  - `"google_compute_network_firewall_policy"`

  - `"google_compute_network_firewall_policy_rule"`

  - `"cloudflare_static_route"`

  - `"cloudflare_ipsec_tunnel"`

- `search: optional array of string`

- `v2: optional boolean`

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

- `result: array of object { id, account_id, cloud_type, 18 more }`

  - `id: string`

  - `account_id: string`

  - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

    - `"AWS"`

    - `"AZURE"`

    - `"GOOGLE"`

    - `"CLOUDFLARE"`

  - `config: map[unknown]`

  - `deployment_provider: string`

  - `managed: boolean`

  - `monthly_cost_estimate: object { currency, monthly_cost }`

    - `currency: string`

    - `monthly_cost: number`

  - `name: string`

  - `native_id: string`

  - `observations: map[object { first_observed_at, last_observed_at, provider_id, resource_id } ]`

    - `first_observed_at: string`

    - `last_observed_at: string`

    - `provider_id: string`

    - `resource_id: string`

  - `provider_ids: array of string`

  - `provider_names_by_id: map[string]`

  - `region: string`

  - `resource_group: string`

  - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

    - `"aws_customer_gateway"`

    - `"aws_egress_only_internet_gateway"`

    - `"aws_internet_gateway"`

    - `"aws_instance"`

    - `"aws_network_interface"`

    - `"aws_route"`

    - `"aws_route_table"`

    - `"aws_route_table_association"`

    - `"aws_subnet"`

    - `"aws_vpc"`

    - `"aws_vpc_ipv4_cidr_block_association"`

    - `"aws_vpn_connection"`

    - `"aws_vpn_connection_route"`

    - `"aws_vpn_gateway"`

    - `"aws_security_group"`

    - `"aws_vpc_security_group_ingress_rule"`

    - `"aws_vpc_security_group_egress_rule"`

    - `"aws_ec2_managed_prefix_list"`

    - `"aws_ec2_transit_gateway"`

    - `"aws_ec2_transit_gateway_prefix_list_reference"`

    - `"aws_ec2_transit_gateway_vpc_attachment"`

    - `"azurerm_application_security_group"`

    - `"azurerm_lb"`

    - `"azurerm_lb_backend_address_pool"`

    - `"azurerm_lb_nat_pool"`

    - `"azurerm_lb_nat_rule"`

    - `"azurerm_lb_rule"`

    - `"azurerm_local_network_gateway"`

    - `"azurerm_network_interface"`

    - `"azurerm_network_interface_application_security_group_association"`

    - `"azurerm_network_interface_backend_address_pool_association"`

    - `"azurerm_network_interface_security_group_association"`

    - `"azurerm_network_security_group"`

    - `"azurerm_public_ip"`

    - `"azurerm_route"`

    - `"azurerm_route_table"`

    - `"azurerm_subnet"`

    - `"azurerm_subnet_route_table_association"`

    - `"azurerm_virtual_machine"`

    - `"azurerm_virtual_network_gateway_connection"`

    - `"azurerm_virtual_network"`

    - `"azurerm_virtual_network_gateway"`

    - `"google_compute_network"`

    - `"google_compute_subnetwork"`

    - `"google_compute_vpn_gateway"`

    - `"google_compute_vpn_tunnel"`

    - `"google_compute_route"`

    - `"google_compute_address"`

    - `"google_compute_global_address"`

    - `"google_compute_router"`

    - `"google_compute_interconnect_attachment"`

    - `"google_compute_ha_vpn_gateway"`

    - `"google_compute_forwarding_rule"`

    - `"google_compute_network_firewall_policy"`

    - `"google_compute_network_firewall_policy_rule"`

    - `"cloudflare_static_route"`

    - `"cloudflare_ipsec_tunnel"`

  - `sections: array of object { hidden_items, name, visible_items, help_text }`

    - `hidden_items: array of object { helpText, name, value }`

      - `helpText: optional string`

      - `name: optional string`

      - `value: optional object { item_type, string }  or object { item_type, yaml }  or object { item_type, yaml_diff }  or 2 more`

        - `McnStringItem object { item_type, string }`

          - `item_type: string`

          - `string: string`

        - `McnYamlItem object { item_type, yaml }`

          - `item_type: string`

          - `yaml: string`

        - `McnYamlDiffItem object { item_type, yaml_diff }`

          - `item_type: string`

          - `yaml_diff: object { diff, left_description, left_yaml, 2 more }`

            - `diff: string`

            - `left_description: string`

            - `left_yaml: string`

            - `right_description: string`

            - `right_yaml: string`

        - `McnResourcePreviewItem object { item_type, resource_preview }`

          - `item_type: string`

          - `resource_preview: object { id, cloud_type, detail, 3 more }`

            - `id: string`

            - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

              - `"AWS"`

              - `"AZURE"`

              - `"GOOGLE"`

              - `"CLOUDFLARE"`

            - `detail: string`

            - `name: string`

            - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

              - `"aws_customer_gateway"`

              - `"aws_egress_only_internet_gateway"`

              - `"aws_internet_gateway"`

              - `"aws_instance"`

              - `"aws_network_interface"`

              - `"aws_route"`

              - `"aws_route_table"`

              - `"aws_route_table_association"`

              - `"aws_subnet"`

              - `"aws_vpc"`

              - `"aws_vpc_ipv4_cidr_block_association"`

              - `"aws_vpn_connection"`

              - `"aws_vpn_connection_route"`

              - `"aws_vpn_gateway"`

              - `"aws_security_group"`

              - `"aws_vpc_security_group_ingress_rule"`

              - `"aws_vpc_security_group_egress_rule"`

              - `"aws_ec2_managed_prefix_list"`

              - `"aws_ec2_transit_gateway"`

              - `"aws_ec2_transit_gateway_prefix_list_reference"`

              - `"aws_ec2_transit_gateway_vpc_attachment"`

              - `"azurerm_application_security_group"`

              - `"azurerm_lb"`

              - `"azurerm_lb_backend_address_pool"`

              - `"azurerm_lb_nat_pool"`

              - `"azurerm_lb_nat_rule"`

              - `"azurerm_lb_rule"`

              - `"azurerm_local_network_gateway"`

              - `"azurerm_network_interface"`

              - `"azurerm_network_interface_application_security_group_association"`

              - `"azurerm_network_interface_backend_address_pool_association"`

              - `"azurerm_network_interface_security_group_association"`

              - `"azurerm_network_security_group"`

              - `"azurerm_public_ip"`

              - `"azurerm_route"`

              - `"azurerm_route_table"`

              - `"azurerm_subnet"`

              - `"azurerm_subnet_route_table_association"`

              - `"azurerm_virtual_machine"`

              - `"azurerm_virtual_network_gateway_connection"`

              - `"azurerm_virtual_network"`

              - `"azurerm_virtual_network_gateway"`

              - `"google_compute_network"`

              - `"google_compute_subnetwork"`

              - `"google_compute_vpn_gateway"`

              - `"google_compute_vpn_tunnel"`

              - `"google_compute_route"`

              - `"google_compute_address"`

              - `"google_compute_global_address"`

              - `"google_compute_router"`

              - `"google_compute_interconnect_attachment"`

              - `"google_compute_ha_vpn_gateway"`

              - `"google_compute_forwarding_rule"`

              - `"google_compute_network_firewall_policy"`

              - `"google_compute_network_firewall_policy_rule"`

              - `"cloudflare_static_route"`

              - `"cloudflare_ipsec_tunnel"`

            - `title: string`

        - `McnListItem object { item_type, list }`

          - `item_type: string`

          - `list: array of object { item_type, string }  or object { item_type, resource_preview }`

            - `McnStringItem object { item_type, string }`

              - `item_type: string`

              - `string: string`

            - `McnResourcePreviewItem object { item_type, resource_preview }`

              - `item_type: string`

              - `resource_preview: object { id, cloud_type, detail, 3 more }`

                - `id: string`

                - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                  - `"AWS"`

                  - `"AZURE"`

                  - `"GOOGLE"`

                  - `"CLOUDFLARE"`

                - `detail: string`

                - `name: string`

                - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                  - `"aws_customer_gateway"`

                  - `"aws_egress_only_internet_gateway"`

                  - `"aws_internet_gateway"`

                  - `"aws_instance"`

                  - `"aws_network_interface"`

                  - `"aws_route"`

                  - `"aws_route_table"`

                  - `"aws_route_table_association"`

                  - `"aws_subnet"`

                  - `"aws_vpc"`

                  - `"aws_vpc_ipv4_cidr_block_association"`

                  - `"aws_vpn_connection"`

                  - `"aws_vpn_connection_route"`

                  - `"aws_vpn_gateway"`

                  - `"aws_security_group"`

                  - `"aws_vpc_security_group_ingress_rule"`

                  - `"aws_vpc_security_group_egress_rule"`

                  - `"aws_ec2_managed_prefix_list"`

                  - `"aws_ec2_transit_gateway"`

                  - `"aws_ec2_transit_gateway_prefix_list_reference"`

                  - `"aws_ec2_transit_gateway_vpc_attachment"`

                  - `"azurerm_application_security_group"`

                  - `"azurerm_lb"`

                  - `"azurerm_lb_backend_address_pool"`

                  - `"azurerm_lb_nat_pool"`

                  - `"azurerm_lb_nat_rule"`

                  - `"azurerm_lb_rule"`

                  - `"azurerm_local_network_gateway"`

                  - `"azurerm_network_interface"`

                  - `"azurerm_network_interface_application_security_group_association"`

                  - `"azurerm_network_interface_backend_address_pool_association"`

                  - `"azurerm_network_interface_security_group_association"`

                  - `"azurerm_network_security_group"`

                  - `"azurerm_public_ip"`

                  - `"azurerm_route"`

                  - `"azurerm_route_table"`

                  - `"azurerm_subnet"`

                  - `"azurerm_subnet_route_table_association"`

                  - `"azurerm_virtual_machine"`

                  - `"azurerm_virtual_network_gateway_connection"`

                  - `"azurerm_virtual_network"`

                  - `"azurerm_virtual_network_gateway"`

                  - `"google_compute_network"`

                  - `"google_compute_subnetwork"`

                  - `"google_compute_vpn_gateway"`

                  - `"google_compute_vpn_tunnel"`

                  - `"google_compute_route"`

                  - `"google_compute_address"`

                  - `"google_compute_global_address"`

                  - `"google_compute_router"`

                  - `"google_compute_interconnect_attachment"`

                  - `"google_compute_ha_vpn_gateway"`

                  - `"google_compute_forwarding_rule"`

                  - `"google_compute_network_firewall_policy"`

                  - `"google_compute_network_firewall_policy_rule"`

                  - `"cloudflare_static_route"`

                  - `"cloudflare_ipsec_tunnel"`

                - `title: string`

    - `name: string`

    - `visible_items: array of object { helpText, name, value }`

      - `helpText: optional string`

      - `name: optional string`

      - `value: optional object { item_type, string }  or object { item_type, yaml }  or object { item_type, yaml_diff }  or 2 more`

        - `McnStringItem object { item_type, string }`

          - `item_type: string`

          - `string: string`

        - `McnYamlItem object { item_type, yaml }`

          - `item_type: string`

          - `yaml: string`

        - `McnYamlDiffItem object { item_type, yaml_diff }`

          - `item_type: string`

          - `yaml_diff: object { diff, left_description, left_yaml, 2 more }`

            - `diff: string`

            - `left_description: string`

            - `left_yaml: string`

            - `right_description: string`

            - `right_yaml: string`

        - `McnResourcePreviewItem object { item_type, resource_preview }`

          - `item_type: string`

          - `resource_preview: object { id, cloud_type, detail, 3 more }`

            - `id: string`

            - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

              - `"AWS"`

              - `"AZURE"`

              - `"GOOGLE"`

              - `"CLOUDFLARE"`

            - `detail: string`

            - `name: string`

            - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

              - `"aws_customer_gateway"`

              - `"aws_egress_only_internet_gateway"`

              - `"aws_internet_gateway"`

              - `"aws_instance"`

              - `"aws_network_interface"`

              - `"aws_route"`

              - `"aws_route_table"`

              - `"aws_route_table_association"`

              - `"aws_subnet"`

              - `"aws_vpc"`

              - `"aws_vpc_ipv4_cidr_block_association"`

              - `"aws_vpn_connection"`

              - `"aws_vpn_connection_route"`

              - `"aws_vpn_gateway"`

              - `"aws_security_group"`

              - `"aws_vpc_security_group_ingress_rule"`

              - `"aws_vpc_security_group_egress_rule"`

              - `"aws_ec2_managed_prefix_list"`

              - `"aws_ec2_transit_gateway"`

              - `"aws_ec2_transit_gateway_prefix_list_reference"`

              - `"aws_ec2_transit_gateway_vpc_attachment"`

              - `"azurerm_application_security_group"`

              - `"azurerm_lb"`

              - `"azurerm_lb_backend_address_pool"`

              - `"azurerm_lb_nat_pool"`

              - `"azurerm_lb_nat_rule"`

              - `"azurerm_lb_rule"`

              - `"azurerm_local_network_gateway"`

              - `"azurerm_network_interface"`

              - `"azurerm_network_interface_application_security_group_association"`

              - `"azurerm_network_interface_backend_address_pool_association"`

              - `"azurerm_network_interface_security_group_association"`

              - `"azurerm_network_security_group"`

              - `"azurerm_public_ip"`

              - `"azurerm_route"`

              - `"azurerm_route_table"`

              - `"azurerm_subnet"`

              - `"azurerm_subnet_route_table_association"`

              - `"azurerm_virtual_machine"`

              - `"azurerm_virtual_network_gateway_connection"`

              - `"azurerm_virtual_network"`

              - `"azurerm_virtual_network_gateway"`

              - `"google_compute_network"`

              - `"google_compute_subnetwork"`

              - `"google_compute_vpn_gateway"`

              - `"google_compute_vpn_tunnel"`

              - `"google_compute_route"`

              - `"google_compute_address"`

              - `"google_compute_global_address"`

              - `"google_compute_router"`

              - `"google_compute_interconnect_attachment"`

              - `"google_compute_ha_vpn_gateway"`

              - `"google_compute_forwarding_rule"`

              - `"google_compute_network_firewall_policy"`

              - `"google_compute_network_firewall_policy_rule"`

              - `"cloudflare_static_route"`

              - `"cloudflare_ipsec_tunnel"`

            - `title: string`

        - `McnListItem object { item_type, list }`

          - `item_type: string`

          - `list: array of object { item_type, string }  or object { item_type, resource_preview }`

            - `McnStringItem object { item_type, string }`

              - `item_type: string`

              - `string: string`

            - `McnResourcePreviewItem object { item_type, resource_preview }`

              - `item_type: string`

              - `resource_preview: object { id, cloud_type, detail, 3 more }`

                - `id: string`

                - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                  - `"AWS"`

                  - `"AZURE"`

                  - `"GOOGLE"`

                  - `"CLOUDFLARE"`

                - `detail: string`

                - `name: string`

                - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                  - `"aws_customer_gateway"`

                  - `"aws_egress_only_internet_gateway"`

                  - `"aws_internet_gateway"`

                  - `"aws_instance"`

                  - `"aws_network_interface"`

                  - `"aws_route"`

                  - `"aws_route_table"`

                  - `"aws_route_table_association"`

                  - `"aws_subnet"`

                  - `"aws_vpc"`

                  - `"aws_vpc_ipv4_cidr_block_association"`

                  - `"aws_vpn_connection"`

                  - `"aws_vpn_connection_route"`

                  - `"aws_vpn_gateway"`

                  - `"aws_security_group"`

                  - `"aws_vpc_security_group_ingress_rule"`

                  - `"aws_vpc_security_group_egress_rule"`

                  - `"aws_ec2_managed_prefix_list"`

                  - `"aws_ec2_transit_gateway"`

                  - `"aws_ec2_transit_gateway_prefix_list_reference"`

                  - `"aws_ec2_transit_gateway_vpc_attachment"`

                  - `"azurerm_application_security_group"`

                  - `"azurerm_lb"`

                  - `"azurerm_lb_backend_address_pool"`

                  - `"azurerm_lb_nat_pool"`

                  - `"azurerm_lb_nat_rule"`

                  - `"azurerm_lb_rule"`

                  - `"azurerm_local_network_gateway"`

                  - `"azurerm_network_interface"`

                  - `"azurerm_network_interface_application_security_group_association"`

                  - `"azurerm_network_interface_backend_address_pool_association"`

                  - `"azurerm_network_interface_security_group_association"`

                  - `"azurerm_network_security_group"`

                  - `"azurerm_public_ip"`

                  - `"azurerm_route"`

                  - `"azurerm_route_table"`

                  - `"azurerm_subnet"`

                  - `"azurerm_subnet_route_table_association"`

                  - `"azurerm_virtual_machine"`

                  - `"azurerm_virtual_network_gateway_connection"`

                  - `"azurerm_virtual_network"`

                  - `"azurerm_virtual_network_gateway"`

                  - `"google_compute_network"`

                  - `"google_compute_subnetwork"`

                  - `"google_compute_vpn_gateway"`

                  - `"google_compute_vpn_tunnel"`

                  - `"google_compute_route"`

                  - `"google_compute_address"`

                  - `"google_compute_global_address"`

                  - `"google_compute_router"`

                  - `"google_compute_interconnect_attachment"`

                  - `"google_compute_ha_vpn_gateway"`

                  - `"google_compute_forwarding_rule"`

                  - `"google_compute_network_firewall_policy"`

                  - `"google_compute_network_firewall_policy_rule"`

                  - `"cloudflare_static_route"`

                  - `"cloudflare_ipsec_tunnel"`

                - `title: string`

    - `help_text: optional string`

  - `state: map[unknown]`

  - `tags: map[string]`

  - `updated_at: string`

  - `url: string`

  - `managed_by: optional array of object { id, client_type, name }`

    - `id: string`

    - `client_type: "MAGIC_WAN_CLOUD_ONRAMP"`

      - `"MAGIC_WAN_CLOUD_ONRAMP"`

    - `name: string`

- `success: boolean`

- `result_info: optional object { count, page, per_page, 2 more }`

  - `count: number`

    The number of items in the current result set.

  - `page: number`

    The current page (starts from zero).

  - `per_page: number`

    The maximum number of items per page.

  - `total_count: number`

    The total number of items in the entire result set.

  - `total_pages: optional number`

    The number of total pages in the entire result set.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/cloud/resources \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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
  "result": [
    {
      "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "account_id": "account_id",
      "cloud_type": "AWS",
      "config": {
        "foo": "bar"
      },
      "deployment_provider": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "managed": true,
      "monthly_cost_estimate": {
        "currency": "currency",
        "monthly_cost": 0
      },
      "name": "name",
      "native_id": "native_id",
      "observations": {
        "foo": {
          "first_observed_at": "first_observed_at",
          "last_observed_at": "last_observed_at",
          "provider_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
          "resource_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
        }
      },
      "provider_ids": [
        "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
      ],
      "provider_names_by_id": {
        "foo": "string"
      },
      "region": "region",
      "resource_group": "resource_group",
      "resource_type": "aws_customer_gateway",
      "sections": [
        {
          "hidden_items": [
            {
              "helpText": "helpText",
              "name": "name",
              "value": {
                "item_type": "item_type",
                "string": "string"
              }
            }
          ],
          "name": "name",
          "visible_items": [
            {
              "helpText": "helpText",
              "name": "name",
              "value": {
                "item_type": "item_type",
                "string": "string"
              }
            }
          ],
          "help_text": "help_text"
        }
      ],
      "state": {
        "foo": "bar"
      },
      "tags": {
        "foo": "string"
      },
      "updated_at": "updated_at",
      "url": "url",
      "managed_by": [
        {
          "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
          "client_type": "MAGIC_WAN_CLOUD_ONRAMP",
          "name": "name"
        }
      ]
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 200
  }
}
```

## Read Resource

**get** `/accounts/{account_id}/magic/cloud/resources/{resource_id}`

Read an resource from the Resource Catalog (Closed Beta).

### Path Parameters

- `account_id: string`

- `resource_id: string`

### Query Parameters

- `v2: optional boolean`

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

- `result: object { id, account_id, cloud_type, 18 more }`

  - `id: string`

  - `account_id: string`

  - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

    - `"AWS"`

    - `"AZURE"`

    - `"GOOGLE"`

    - `"CLOUDFLARE"`

  - `config: map[unknown]`

  - `deployment_provider: string`

  - `managed: boolean`

  - `monthly_cost_estimate: object { currency, monthly_cost }`

    - `currency: string`

    - `monthly_cost: number`

  - `name: string`

  - `native_id: string`

  - `observations: map[object { first_observed_at, last_observed_at, provider_id, resource_id } ]`

    - `first_observed_at: string`

    - `last_observed_at: string`

    - `provider_id: string`

    - `resource_id: string`

  - `provider_ids: array of string`

  - `provider_names_by_id: map[string]`

  - `region: string`

  - `resource_group: string`

  - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

    - `"aws_customer_gateway"`

    - `"aws_egress_only_internet_gateway"`

    - `"aws_internet_gateway"`

    - `"aws_instance"`

    - `"aws_network_interface"`

    - `"aws_route"`

    - `"aws_route_table"`

    - `"aws_route_table_association"`

    - `"aws_subnet"`

    - `"aws_vpc"`

    - `"aws_vpc_ipv4_cidr_block_association"`

    - `"aws_vpn_connection"`

    - `"aws_vpn_connection_route"`

    - `"aws_vpn_gateway"`

    - `"aws_security_group"`

    - `"aws_vpc_security_group_ingress_rule"`

    - `"aws_vpc_security_group_egress_rule"`

    - `"aws_ec2_managed_prefix_list"`

    - `"aws_ec2_transit_gateway"`

    - `"aws_ec2_transit_gateway_prefix_list_reference"`

    - `"aws_ec2_transit_gateway_vpc_attachment"`

    - `"azurerm_application_security_group"`

    - `"azurerm_lb"`

    - `"azurerm_lb_backend_address_pool"`

    - `"azurerm_lb_nat_pool"`

    - `"azurerm_lb_nat_rule"`

    - `"azurerm_lb_rule"`

    - `"azurerm_local_network_gateway"`

    - `"azurerm_network_interface"`

    - `"azurerm_network_interface_application_security_group_association"`

    - `"azurerm_network_interface_backend_address_pool_association"`

    - `"azurerm_network_interface_security_group_association"`

    - `"azurerm_network_security_group"`

    - `"azurerm_public_ip"`

    - `"azurerm_route"`

    - `"azurerm_route_table"`

    - `"azurerm_subnet"`

    - `"azurerm_subnet_route_table_association"`

    - `"azurerm_virtual_machine"`

    - `"azurerm_virtual_network_gateway_connection"`

    - `"azurerm_virtual_network"`

    - `"azurerm_virtual_network_gateway"`

    - `"google_compute_network"`

    - `"google_compute_subnetwork"`

    - `"google_compute_vpn_gateway"`

    - `"google_compute_vpn_tunnel"`

    - `"google_compute_route"`

    - `"google_compute_address"`

    - `"google_compute_global_address"`

    - `"google_compute_router"`

    - `"google_compute_interconnect_attachment"`

    - `"google_compute_ha_vpn_gateway"`

    - `"google_compute_forwarding_rule"`

    - `"google_compute_network_firewall_policy"`

    - `"google_compute_network_firewall_policy_rule"`

    - `"cloudflare_static_route"`

    - `"cloudflare_ipsec_tunnel"`

  - `sections: array of object { hidden_items, name, visible_items, help_text }`

    - `hidden_items: array of object { helpText, name, value }`

      - `helpText: optional string`

      - `name: optional string`

      - `value: optional object { item_type, string }  or object { item_type, yaml }  or object { item_type, yaml_diff }  or 2 more`

        - `McnStringItem object { item_type, string }`

          - `item_type: string`

          - `string: string`

        - `McnYamlItem object { item_type, yaml }`

          - `item_type: string`

          - `yaml: string`

        - `McnYamlDiffItem object { item_type, yaml_diff }`

          - `item_type: string`

          - `yaml_diff: object { diff, left_description, left_yaml, 2 more }`

            - `diff: string`

            - `left_description: string`

            - `left_yaml: string`

            - `right_description: string`

            - `right_yaml: string`

        - `McnResourcePreviewItem object { item_type, resource_preview }`

          - `item_type: string`

          - `resource_preview: object { id, cloud_type, detail, 3 more }`

            - `id: string`

            - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

              - `"AWS"`

              - `"AZURE"`

              - `"GOOGLE"`

              - `"CLOUDFLARE"`

            - `detail: string`

            - `name: string`

            - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

              - `"aws_customer_gateway"`

              - `"aws_egress_only_internet_gateway"`

              - `"aws_internet_gateway"`

              - `"aws_instance"`

              - `"aws_network_interface"`

              - `"aws_route"`

              - `"aws_route_table"`

              - `"aws_route_table_association"`

              - `"aws_subnet"`

              - `"aws_vpc"`

              - `"aws_vpc_ipv4_cidr_block_association"`

              - `"aws_vpn_connection"`

              - `"aws_vpn_connection_route"`

              - `"aws_vpn_gateway"`

              - `"aws_security_group"`

              - `"aws_vpc_security_group_ingress_rule"`

              - `"aws_vpc_security_group_egress_rule"`

              - `"aws_ec2_managed_prefix_list"`

              - `"aws_ec2_transit_gateway"`

              - `"aws_ec2_transit_gateway_prefix_list_reference"`

              - `"aws_ec2_transit_gateway_vpc_attachment"`

              - `"azurerm_application_security_group"`

              - `"azurerm_lb"`

              - `"azurerm_lb_backend_address_pool"`

              - `"azurerm_lb_nat_pool"`

              - `"azurerm_lb_nat_rule"`

              - `"azurerm_lb_rule"`

              - `"azurerm_local_network_gateway"`

              - `"azurerm_network_interface"`

              - `"azurerm_network_interface_application_security_group_association"`

              - `"azurerm_network_interface_backend_address_pool_association"`

              - `"azurerm_network_interface_security_group_association"`

              - `"azurerm_network_security_group"`

              - `"azurerm_public_ip"`

              - `"azurerm_route"`

              - `"azurerm_route_table"`

              - `"azurerm_subnet"`

              - `"azurerm_subnet_route_table_association"`

              - `"azurerm_virtual_machine"`

              - `"azurerm_virtual_network_gateway_connection"`

              - `"azurerm_virtual_network"`

              - `"azurerm_virtual_network_gateway"`

              - `"google_compute_network"`

              - `"google_compute_subnetwork"`

              - `"google_compute_vpn_gateway"`

              - `"google_compute_vpn_tunnel"`

              - `"google_compute_route"`

              - `"google_compute_address"`

              - `"google_compute_global_address"`

              - `"google_compute_router"`

              - `"google_compute_interconnect_attachment"`

              - `"google_compute_ha_vpn_gateway"`

              - `"google_compute_forwarding_rule"`

              - `"google_compute_network_firewall_policy"`

              - `"google_compute_network_firewall_policy_rule"`

              - `"cloudflare_static_route"`

              - `"cloudflare_ipsec_tunnel"`

            - `title: string`

        - `McnListItem object { item_type, list }`

          - `item_type: string`

          - `list: array of object { item_type, string }  or object { item_type, resource_preview }`

            - `McnStringItem object { item_type, string }`

              - `item_type: string`

              - `string: string`

            - `McnResourcePreviewItem object { item_type, resource_preview }`

              - `item_type: string`

              - `resource_preview: object { id, cloud_type, detail, 3 more }`

                - `id: string`

                - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                  - `"AWS"`

                  - `"AZURE"`

                  - `"GOOGLE"`

                  - `"CLOUDFLARE"`

                - `detail: string`

                - `name: string`

                - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                  - `"aws_customer_gateway"`

                  - `"aws_egress_only_internet_gateway"`

                  - `"aws_internet_gateway"`

                  - `"aws_instance"`

                  - `"aws_network_interface"`

                  - `"aws_route"`

                  - `"aws_route_table"`

                  - `"aws_route_table_association"`

                  - `"aws_subnet"`

                  - `"aws_vpc"`

                  - `"aws_vpc_ipv4_cidr_block_association"`

                  - `"aws_vpn_connection"`

                  - `"aws_vpn_connection_route"`

                  - `"aws_vpn_gateway"`

                  - `"aws_security_group"`

                  - `"aws_vpc_security_group_ingress_rule"`

                  - `"aws_vpc_security_group_egress_rule"`

                  - `"aws_ec2_managed_prefix_list"`

                  - `"aws_ec2_transit_gateway"`

                  - `"aws_ec2_transit_gateway_prefix_list_reference"`

                  - `"aws_ec2_transit_gateway_vpc_attachment"`

                  - `"azurerm_application_security_group"`

                  - `"azurerm_lb"`

                  - `"azurerm_lb_backend_address_pool"`

                  - `"azurerm_lb_nat_pool"`

                  - `"azurerm_lb_nat_rule"`

                  - `"azurerm_lb_rule"`

                  - `"azurerm_local_network_gateway"`

                  - `"azurerm_network_interface"`

                  - `"azurerm_network_interface_application_security_group_association"`

                  - `"azurerm_network_interface_backend_address_pool_association"`

                  - `"azurerm_network_interface_security_group_association"`

                  - `"azurerm_network_security_group"`

                  - `"azurerm_public_ip"`

                  - `"azurerm_route"`

                  - `"azurerm_route_table"`

                  - `"azurerm_subnet"`

                  - `"azurerm_subnet_route_table_association"`

                  - `"azurerm_virtual_machine"`

                  - `"azurerm_virtual_network_gateway_connection"`

                  - `"azurerm_virtual_network"`

                  - `"azurerm_virtual_network_gateway"`

                  - `"google_compute_network"`

                  - `"google_compute_subnetwork"`

                  - `"google_compute_vpn_gateway"`

                  - `"google_compute_vpn_tunnel"`

                  - `"google_compute_route"`

                  - `"google_compute_address"`

                  - `"google_compute_global_address"`

                  - `"google_compute_router"`

                  - `"google_compute_interconnect_attachment"`

                  - `"google_compute_ha_vpn_gateway"`

                  - `"google_compute_forwarding_rule"`

                  - `"google_compute_network_firewall_policy"`

                  - `"google_compute_network_firewall_policy_rule"`

                  - `"cloudflare_static_route"`

                  - `"cloudflare_ipsec_tunnel"`

                - `title: string`

    - `name: string`

    - `visible_items: array of object { helpText, name, value }`

      - `helpText: optional string`

      - `name: optional string`

      - `value: optional object { item_type, string }  or object { item_type, yaml }  or object { item_type, yaml_diff }  or 2 more`

        - `McnStringItem object { item_type, string }`

          - `item_type: string`

          - `string: string`

        - `McnYamlItem object { item_type, yaml }`

          - `item_type: string`

          - `yaml: string`

        - `McnYamlDiffItem object { item_type, yaml_diff }`

          - `item_type: string`

          - `yaml_diff: object { diff, left_description, left_yaml, 2 more }`

            - `diff: string`

            - `left_description: string`

            - `left_yaml: string`

            - `right_description: string`

            - `right_yaml: string`

        - `McnResourcePreviewItem object { item_type, resource_preview }`

          - `item_type: string`

          - `resource_preview: object { id, cloud_type, detail, 3 more }`

            - `id: string`

            - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

              - `"AWS"`

              - `"AZURE"`

              - `"GOOGLE"`

              - `"CLOUDFLARE"`

            - `detail: string`

            - `name: string`

            - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

              - `"aws_customer_gateway"`

              - `"aws_egress_only_internet_gateway"`

              - `"aws_internet_gateway"`

              - `"aws_instance"`

              - `"aws_network_interface"`

              - `"aws_route"`

              - `"aws_route_table"`

              - `"aws_route_table_association"`

              - `"aws_subnet"`

              - `"aws_vpc"`

              - `"aws_vpc_ipv4_cidr_block_association"`

              - `"aws_vpn_connection"`

              - `"aws_vpn_connection_route"`

              - `"aws_vpn_gateway"`

              - `"aws_security_group"`

              - `"aws_vpc_security_group_ingress_rule"`

              - `"aws_vpc_security_group_egress_rule"`

              - `"aws_ec2_managed_prefix_list"`

              - `"aws_ec2_transit_gateway"`

              - `"aws_ec2_transit_gateway_prefix_list_reference"`

              - `"aws_ec2_transit_gateway_vpc_attachment"`

              - `"azurerm_application_security_group"`

              - `"azurerm_lb"`

              - `"azurerm_lb_backend_address_pool"`

              - `"azurerm_lb_nat_pool"`

              - `"azurerm_lb_nat_rule"`

              - `"azurerm_lb_rule"`

              - `"azurerm_local_network_gateway"`

              - `"azurerm_network_interface"`

              - `"azurerm_network_interface_application_security_group_association"`

              - `"azurerm_network_interface_backend_address_pool_association"`

              - `"azurerm_network_interface_security_group_association"`

              - `"azurerm_network_security_group"`

              - `"azurerm_public_ip"`

              - `"azurerm_route"`

              - `"azurerm_route_table"`

              - `"azurerm_subnet"`

              - `"azurerm_subnet_route_table_association"`

              - `"azurerm_virtual_machine"`

              - `"azurerm_virtual_network_gateway_connection"`

              - `"azurerm_virtual_network"`

              - `"azurerm_virtual_network_gateway"`

              - `"google_compute_network"`

              - `"google_compute_subnetwork"`

              - `"google_compute_vpn_gateway"`

              - `"google_compute_vpn_tunnel"`

              - `"google_compute_route"`

              - `"google_compute_address"`

              - `"google_compute_global_address"`

              - `"google_compute_router"`

              - `"google_compute_interconnect_attachment"`

              - `"google_compute_ha_vpn_gateway"`

              - `"google_compute_forwarding_rule"`

              - `"google_compute_network_firewall_policy"`

              - `"google_compute_network_firewall_policy_rule"`

              - `"cloudflare_static_route"`

              - `"cloudflare_ipsec_tunnel"`

            - `title: string`

        - `McnListItem object { item_type, list }`

          - `item_type: string`

          - `list: array of object { item_type, string }  or object { item_type, resource_preview }`

            - `McnStringItem object { item_type, string }`

              - `item_type: string`

              - `string: string`

            - `McnResourcePreviewItem object { item_type, resource_preview }`

              - `item_type: string`

              - `resource_preview: object { id, cloud_type, detail, 3 more }`

                - `id: string`

                - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                  - `"AWS"`

                  - `"AZURE"`

                  - `"GOOGLE"`

                  - `"CLOUDFLARE"`

                - `detail: string`

                - `name: string`

                - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                  - `"aws_customer_gateway"`

                  - `"aws_egress_only_internet_gateway"`

                  - `"aws_internet_gateway"`

                  - `"aws_instance"`

                  - `"aws_network_interface"`

                  - `"aws_route"`

                  - `"aws_route_table"`

                  - `"aws_route_table_association"`

                  - `"aws_subnet"`

                  - `"aws_vpc"`

                  - `"aws_vpc_ipv4_cidr_block_association"`

                  - `"aws_vpn_connection"`

                  - `"aws_vpn_connection_route"`

                  - `"aws_vpn_gateway"`

                  - `"aws_security_group"`

                  - `"aws_vpc_security_group_ingress_rule"`

                  - `"aws_vpc_security_group_egress_rule"`

                  - `"aws_ec2_managed_prefix_list"`

                  - `"aws_ec2_transit_gateway"`

                  - `"aws_ec2_transit_gateway_prefix_list_reference"`

                  - `"aws_ec2_transit_gateway_vpc_attachment"`

                  - `"azurerm_application_security_group"`

                  - `"azurerm_lb"`

                  - `"azurerm_lb_backend_address_pool"`

                  - `"azurerm_lb_nat_pool"`

                  - `"azurerm_lb_nat_rule"`

                  - `"azurerm_lb_rule"`

                  - `"azurerm_local_network_gateway"`

                  - `"azurerm_network_interface"`

                  - `"azurerm_network_interface_application_security_group_association"`

                  - `"azurerm_network_interface_backend_address_pool_association"`

                  - `"azurerm_network_interface_security_group_association"`

                  - `"azurerm_network_security_group"`

                  - `"azurerm_public_ip"`

                  - `"azurerm_route"`

                  - `"azurerm_route_table"`

                  - `"azurerm_subnet"`

                  - `"azurerm_subnet_route_table_association"`

                  - `"azurerm_virtual_machine"`

                  - `"azurerm_virtual_network_gateway_connection"`

                  - `"azurerm_virtual_network"`

                  - `"azurerm_virtual_network_gateway"`

                  - `"google_compute_network"`

                  - `"google_compute_subnetwork"`

                  - `"google_compute_vpn_gateway"`

                  - `"google_compute_vpn_tunnel"`

                  - `"google_compute_route"`

                  - `"google_compute_address"`

                  - `"google_compute_global_address"`

                  - `"google_compute_router"`

                  - `"google_compute_interconnect_attachment"`

                  - `"google_compute_ha_vpn_gateway"`

                  - `"google_compute_forwarding_rule"`

                  - `"google_compute_network_firewall_policy"`

                  - `"google_compute_network_firewall_policy_rule"`

                  - `"cloudflare_static_route"`

                  - `"cloudflare_ipsec_tunnel"`

                - `title: string`

    - `help_text: optional string`

  - `state: map[unknown]`

  - `tags: map[string]`

  - `updated_at: string`

  - `url: string`

  - `managed_by: optional array of object { id, client_type, name }`

    - `id: string`

    - `client_type: "MAGIC_WAN_CLOUD_ONRAMP"`

      - `"MAGIC_WAN_CLOUD_ONRAMP"`

    - `name: string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/cloud/resources/$RESOURCE_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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
    "account_id": "account_id",
    "cloud_type": "AWS",
    "config": {
      "foo": "bar"
    },
    "deployment_provider": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "managed": true,
    "monthly_cost_estimate": {
      "currency": "currency",
      "monthly_cost": 0
    },
    "name": "name",
    "native_id": "native_id",
    "observations": {
      "foo": {
        "first_observed_at": "first_observed_at",
        "last_observed_at": "last_observed_at",
        "provider_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
        "resource_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
      }
    },
    "provider_ids": [
      "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
    ],
    "provider_names_by_id": {
      "foo": "string"
    },
    "region": "region",
    "resource_group": "resource_group",
    "resource_type": "aws_customer_gateway",
    "sections": [
      {
        "hidden_items": [
          {
            "helpText": "helpText",
            "name": "name",
            "value": {
              "item_type": "item_type",
              "string": "string"
            }
          }
        ],
        "name": "name",
        "visible_items": [
          {
            "helpText": "helpText",
            "name": "name",
            "value": {
              "item_type": "item_type",
              "string": "string"
            }
          }
        ],
        "help_text": "help_text"
      }
    ],
    "state": {
      "foo": "bar"
    },
    "tags": {
      "foo": "string"
    },
    "updated_at": "updated_at",
    "url": "url",
    "managed_by": [
      {
        "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
        "client_type": "MAGIC_WAN_CLOUD_ONRAMP",
        "name": "name"
      }
    ]
  },
  "success": true
}
```

## Export Resources

**get** `/accounts/{account_id}/magic/cloud/resources/export`

Export resources in the Resource Catalog as a JSON file (Closed Beta).

### Path Parameters

- `account_id: string`

### Query Parameters

- `desc: optional boolean`

- `order_by: optional string`

  One of ["id", "resource_type", "region"].

- `provider_id: optional string`

- `region: optional string`

- `resource_group: optional string`

- `resource_id: optional array of string`

- `resource_type: optional array of "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

  - `"aws_customer_gateway"`

  - `"aws_egress_only_internet_gateway"`

  - `"aws_internet_gateway"`

  - `"aws_instance"`

  - `"aws_network_interface"`

  - `"aws_route"`

  - `"aws_route_table"`

  - `"aws_route_table_association"`

  - `"aws_subnet"`

  - `"aws_vpc"`

  - `"aws_vpc_ipv4_cidr_block_association"`

  - `"aws_vpn_connection"`

  - `"aws_vpn_connection_route"`

  - `"aws_vpn_gateway"`

  - `"aws_security_group"`

  - `"aws_vpc_security_group_ingress_rule"`

  - `"aws_vpc_security_group_egress_rule"`

  - `"aws_ec2_managed_prefix_list"`

  - `"aws_ec2_transit_gateway"`

  - `"aws_ec2_transit_gateway_prefix_list_reference"`

  - `"aws_ec2_transit_gateway_vpc_attachment"`

  - `"azurerm_application_security_group"`

  - `"azurerm_lb"`

  - `"azurerm_lb_backend_address_pool"`

  - `"azurerm_lb_nat_pool"`

  - `"azurerm_lb_nat_rule"`

  - `"azurerm_lb_rule"`

  - `"azurerm_local_network_gateway"`

  - `"azurerm_network_interface"`

  - `"azurerm_network_interface_application_security_group_association"`

  - `"azurerm_network_interface_backend_address_pool_association"`

  - `"azurerm_network_interface_security_group_association"`

  - `"azurerm_network_security_group"`

  - `"azurerm_public_ip"`

  - `"azurerm_route"`

  - `"azurerm_route_table"`

  - `"azurerm_subnet"`

  - `"azurerm_subnet_route_table_association"`

  - `"azurerm_virtual_machine"`

  - `"azurerm_virtual_network_gateway_connection"`

  - `"azurerm_virtual_network"`

  - `"azurerm_virtual_network_gateway"`

  - `"google_compute_network"`

  - `"google_compute_subnetwork"`

  - `"google_compute_vpn_gateway"`

  - `"google_compute_vpn_tunnel"`

  - `"google_compute_route"`

  - `"google_compute_address"`

  - `"google_compute_global_address"`

  - `"google_compute_router"`

  - `"google_compute_interconnect_attachment"`

  - `"google_compute_ha_vpn_gateway"`

  - `"google_compute_forwarding_rule"`

  - `"google_compute_network_firewall_policy"`

  - `"google_compute_network_firewall_policy_rule"`

  - `"cloudflare_static_route"`

  - `"cloudflare_ipsec_tunnel"`

- `search: optional array of string`

- `v2: optional boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/cloud/resources/export \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

## Preview Rego Query

**post** `/accounts/{account_id}/magic/cloud/resources/policy-preview`

Preview Rego query result against the latest resource catalog (Closed Beta).

### Path Parameters

- `account_id: string`

### Body Parameters

- `policy: string`

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

- `result: string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/cloud/resources/policy-preview \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "policy": "policy"
        }'
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
  "result": "result",
  "success": true
}
```

## Domain Types

### Resource List Response

- `ResourceListResponse object { id, account_id, cloud_type, 18 more }`

  - `id: string`

  - `account_id: string`

  - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

    - `"AWS"`

    - `"AZURE"`

    - `"GOOGLE"`

    - `"CLOUDFLARE"`

  - `config: map[unknown]`

  - `deployment_provider: string`

  - `managed: boolean`

  - `monthly_cost_estimate: object { currency, monthly_cost }`

    - `currency: string`

    - `monthly_cost: number`

  - `name: string`

  - `native_id: string`

  - `observations: map[object { first_observed_at, last_observed_at, provider_id, resource_id } ]`

    - `first_observed_at: string`

    - `last_observed_at: string`

    - `provider_id: string`

    - `resource_id: string`

  - `provider_ids: array of string`

  - `provider_names_by_id: map[string]`

  - `region: string`

  - `resource_group: string`

  - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

    - `"aws_customer_gateway"`

    - `"aws_egress_only_internet_gateway"`

    - `"aws_internet_gateway"`

    - `"aws_instance"`

    - `"aws_network_interface"`

    - `"aws_route"`

    - `"aws_route_table"`

    - `"aws_route_table_association"`

    - `"aws_subnet"`

    - `"aws_vpc"`

    - `"aws_vpc_ipv4_cidr_block_association"`

    - `"aws_vpn_connection"`

    - `"aws_vpn_connection_route"`

    - `"aws_vpn_gateway"`

    - `"aws_security_group"`

    - `"aws_vpc_security_group_ingress_rule"`

    - `"aws_vpc_security_group_egress_rule"`

    - `"aws_ec2_managed_prefix_list"`

    - `"aws_ec2_transit_gateway"`

    - `"aws_ec2_transit_gateway_prefix_list_reference"`

    - `"aws_ec2_transit_gateway_vpc_attachment"`

    - `"azurerm_application_security_group"`

    - `"azurerm_lb"`

    - `"azurerm_lb_backend_address_pool"`

    - `"azurerm_lb_nat_pool"`

    - `"azurerm_lb_nat_rule"`

    - `"azurerm_lb_rule"`

    - `"azurerm_local_network_gateway"`

    - `"azurerm_network_interface"`

    - `"azurerm_network_interface_application_security_group_association"`

    - `"azurerm_network_interface_backend_address_pool_association"`

    - `"azurerm_network_interface_security_group_association"`

    - `"azurerm_network_security_group"`

    - `"azurerm_public_ip"`

    - `"azurerm_route"`

    - `"azurerm_route_table"`

    - `"azurerm_subnet"`

    - `"azurerm_subnet_route_table_association"`

    - `"azurerm_virtual_machine"`

    - `"azurerm_virtual_network_gateway_connection"`

    - `"azurerm_virtual_network"`

    - `"azurerm_virtual_network_gateway"`

    - `"google_compute_network"`

    - `"google_compute_subnetwork"`

    - `"google_compute_vpn_gateway"`

    - `"google_compute_vpn_tunnel"`

    - `"google_compute_route"`

    - `"google_compute_address"`

    - `"google_compute_global_address"`

    - `"google_compute_router"`

    - `"google_compute_interconnect_attachment"`

    - `"google_compute_ha_vpn_gateway"`

    - `"google_compute_forwarding_rule"`

    - `"google_compute_network_firewall_policy"`

    - `"google_compute_network_firewall_policy_rule"`

    - `"cloudflare_static_route"`

    - `"cloudflare_ipsec_tunnel"`

  - `sections: array of object { hidden_items, name, visible_items, help_text }`

    - `hidden_items: array of object { helpText, name, value }`

      - `helpText: optional string`

      - `name: optional string`

      - `value: optional object { item_type, string }  or object { item_type, yaml }  or object { item_type, yaml_diff }  or 2 more`

        - `McnStringItem object { item_type, string }`

          - `item_type: string`

          - `string: string`

        - `McnYamlItem object { item_type, yaml }`

          - `item_type: string`

          - `yaml: string`

        - `McnYamlDiffItem object { item_type, yaml_diff }`

          - `item_type: string`

          - `yaml_diff: object { diff, left_description, left_yaml, 2 more }`

            - `diff: string`

            - `left_description: string`

            - `left_yaml: string`

            - `right_description: string`

            - `right_yaml: string`

        - `McnResourcePreviewItem object { item_type, resource_preview }`

          - `item_type: string`

          - `resource_preview: object { id, cloud_type, detail, 3 more }`

            - `id: string`

            - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

              - `"AWS"`

              - `"AZURE"`

              - `"GOOGLE"`

              - `"CLOUDFLARE"`

            - `detail: string`

            - `name: string`

            - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

              - `"aws_customer_gateway"`

              - `"aws_egress_only_internet_gateway"`

              - `"aws_internet_gateway"`

              - `"aws_instance"`

              - `"aws_network_interface"`

              - `"aws_route"`

              - `"aws_route_table"`

              - `"aws_route_table_association"`

              - `"aws_subnet"`

              - `"aws_vpc"`

              - `"aws_vpc_ipv4_cidr_block_association"`

              - `"aws_vpn_connection"`

              - `"aws_vpn_connection_route"`

              - `"aws_vpn_gateway"`

              - `"aws_security_group"`

              - `"aws_vpc_security_group_ingress_rule"`

              - `"aws_vpc_security_group_egress_rule"`

              - `"aws_ec2_managed_prefix_list"`

              - `"aws_ec2_transit_gateway"`

              - `"aws_ec2_transit_gateway_prefix_list_reference"`

              - `"aws_ec2_transit_gateway_vpc_attachment"`

              - `"azurerm_application_security_group"`

              - `"azurerm_lb"`

              - `"azurerm_lb_backend_address_pool"`

              - `"azurerm_lb_nat_pool"`

              - `"azurerm_lb_nat_rule"`

              - `"azurerm_lb_rule"`

              - `"azurerm_local_network_gateway"`

              - `"azurerm_network_interface"`

              - `"azurerm_network_interface_application_security_group_association"`

              - `"azurerm_network_interface_backend_address_pool_association"`

              - `"azurerm_network_interface_security_group_association"`

              - `"azurerm_network_security_group"`

              - `"azurerm_public_ip"`

              - `"azurerm_route"`

              - `"azurerm_route_table"`

              - `"azurerm_subnet"`

              - `"azurerm_subnet_route_table_association"`

              - `"azurerm_virtual_machine"`

              - `"azurerm_virtual_network_gateway_connection"`

              - `"azurerm_virtual_network"`

              - `"azurerm_virtual_network_gateway"`

              - `"google_compute_network"`

              - `"google_compute_subnetwork"`

              - `"google_compute_vpn_gateway"`

              - `"google_compute_vpn_tunnel"`

              - `"google_compute_route"`

              - `"google_compute_address"`

              - `"google_compute_global_address"`

              - `"google_compute_router"`

              - `"google_compute_interconnect_attachment"`

              - `"google_compute_ha_vpn_gateway"`

              - `"google_compute_forwarding_rule"`

              - `"google_compute_network_firewall_policy"`

              - `"google_compute_network_firewall_policy_rule"`

              - `"cloudflare_static_route"`

              - `"cloudflare_ipsec_tunnel"`

            - `title: string`

        - `McnListItem object { item_type, list }`

          - `item_type: string`

          - `list: array of object { item_type, string }  or object { item_type, resource_preview }`

            - `McnStringItem object { item_type, string }`

              - `item_type: string`

              - `string: string`

            - `McnResourcePreviewItem object { item_type, resource_preview }`

              - `item_type: string`

              - `resource_preview: object { id, cloud_type, detail, 3 more }`

                - `id: string`

                - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                  - `"AWS"`

                  - `"AZURE"`

                  - `"GOOGLE"`

                  - `"CLOUDFLARE"`

                - `detail: string`

                - `name: string`

                - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                  - `"aws_customer_gateway"`

                  - `"aws_egress_only_internet_gateway"`

                  - `"aws_internet_gateway"`

                  - `"aws_instance"`

                  - `"aws_network_interface"`

                  - `"aws_route"`

                  - `"aws_route_table"`

                  - `"aws_route_table_association"`

                  - `"aws_subnet"`

                  - `"aws_vpc"`

                  - `"aws_vpc_ipv4_cidr_block_association"`

                  - `"aws_vpn_connection"`

                  - `"aws_vpn_connection_route"`

                  - `"aws_vpn_gateway"`

                  - `"aws_security_group"`

                  - `"aws_vpc_security_group_ingress_rule"`

                  - `"aws_vpc_security_group_egress_rule"`

                  - `"aws_ec2_managed_prefix_list"`

                  - `"aws_ec2_transit_gateway"`

                  - `"aws_ec2_transit_gateway_prefix_list_reference"`

                  - `"aws_ec2_transit_gateway_vpc_attachment"`

                  - `"azurerm_application_security_group"`

                  - `"azurerm_lb"`

                  - `"azurerm_lb_backend_address_pool"`

                  - `"azurerm_lb_nat_pool"`

                  - `"azurerm_lb_nat_rule"`

                  - `"azurerm_lb_rule"`

                  - `"azurerm_local_network_gateway"`

                  - `"azurerm_network_interface"`

                  - `"azurerm_network_interface_application_security_group_association"`

                  - `"azurerm_network_interface_backend_address_pool_association"`

                  - `"azurerm_network_interface_security_group_association"`

                  - `"azurerm_network_security_group"`

                  - `"azurerm_public_ip"`

                  - `"azurerm_route"`

                  - `"azurerm_route_table"`

                  - `"azurerm_subnet"`

                  - `"azurerm_subnet_route_table_association"`

                  - `"azurerm_virtual_machine"`

                  - `"azurerm_virtual_network_gateway_connection"`

                  - `"azurerm_virtual_network"`

                  - `"azurerm_virtual_network_gateway"`

                  - `"google_compute_network"`

                  - `"google_compute_subnetwork"`

                  - `"google_compute_vpn_gateway"`

                  - `"google_compute_vpn_tunnel"`

                  - `"google_compute_route"`

                  - `"google_compute_address"`

                  - `"google_compute_global_address"`

                  - `"google_compute_router"`

                  - `"google_compute_interconnect_attachment"`

                  - `"google_compute_ha_vpn_gateway"`

                  - `"google_compute_forwarding_rule"`

                  - `"google_compute_network_firewall_policy"`

                  - `"google_compute_network_firewall_policy_rule"`

                  - `"cloudflare_static_route"`

                  - `"cloudflare_ipsec_tunnel"`

                - `title: string`

    - `name: string`

    - `visible_items: array of object { helpText, name, value }`

      - `helpText: optional string`

      - `name: optional string`

      - `value: optional object { item_type, string }  or object { item_type, yaml }  or object { item_type, yaml_diff }  or 2 more`

        - `McnStringItem object { item_type, string }`

          - `item_type: string`

          - `string: string`

        - `McnYamlItem object { item_type, yaml }`

          - `item_type: string`

          - `yaml: string`

        - `McnYamlDiffItem object { item_type, yaml_diff }`

          - `item_type: string`

          - `yaml_diff: object { diff, left_description, left_yaml, 2 more }`

            - `diff: string`

            - `left_description: string`

            - `left_yaml: string`

            - `right_description: string`

            - `right_yaml: string`

        - `McnResourcePreviewItem object { item_type, resource_preview }`

          - `item_type: string`

          - `resource_preview: object { id, cloud_type, detail, 3 more }`

            - `id: string`

            - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

              - `"AWS"`

              - `"AZURE"`

              - `"GOOGLE"`

              - `"CLOUDFLARE"`

            - `detail: string`

            - `name: string`

            - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

              - `"aws_customer_gateway"`

              - `"aws_egress_only_internet_gateway"`

              - `"aws_internet_gateway"`

              - `"aws_instance"`

              - `"aws_network_interface"`

              - `"aws_route"`

              - `"aws_route_table"`

              - `"aws_route_table_association"`

              - `"aws_subnet"`

              - `"aws_vpc"`

              - `"aws_vpc_ipv4_cidr_block_association"`

              - `"aws_vpn_connection"`

              - `"aws_vpn_connection_route"`

              - `"aws_vpn_gateway"`

              - `"aws_security_group"`

              - `"aws_vpc_security_group_ingress_rule"`

              - `"aws_vpc_security_group_egress_rule"`

              - `"aws_ec2_managed_prefix_list"`

              - `"aws_ec2_transit_gateway"`

              - `"aws_ec2_transit_gateway_prefix_list_reference"`

              - `"aws_ec2_transit_gateway_vpc_attachment"`

              - `"azurerm_application_security_group"`

              - `"azurerm_lb"`

              - `"azurerm_lb_backend_address_pool"`

              - `"azurerm_lb_nat_pool"`

              - `"azurerm_lb_nat_rule"`

              - `"azurerm_lb_rule"`

              - `"azurerm_local_network_gateway"`

              - `"azurerm_network_interface"`

              - `"azurerm_network_interface_application_security_group_association"`

              - `"azurerm_network_interface_backend_address_pool_association"`

              - `"azurerm_network_interface_security_group_association"`

              - `"azurerm_network_security_group"`

              - `"azurerm_public_ip"`

              - `"azurerm_route"`

              - `"azurerm_route_table"`

              - `"azurerm_subnet"`

              - `"azurerm_subnet_route_table_association"`

              - `"azurerm_virtual_machine"`

              - `"azurerm_virtual_network_gateway_connection"`

              - `"azurerm_virtual_network"`

              - `"azurerm_virtual_network_gateway"`

              - `"google_compute_network"`

              - `"google_compute_subnetwork"`

              - `"google_compute_vpn_gateway"`

              - `"google_compute_vpn_tunnel"`

              - `"google_compute_route"`

              - `"google_compute_address"`

              - `"google_compute_global_address"`

              - `"google_compute_router"`

              - `"google_compute_interconnect_attachment"`

              - `"google_compute_ha_vpn_gateway"`

              - `"google_compute_forwarding_rule"`

              - `"google_compute_network_firewall_policy"`

              - `"google_compute_network_firewall_policy_rule"`

              - `"cloudflare_static_route"`

              - `"cloudflare_ipsec_tunnel"`

            - `title: string`

        - `McnListItem object { item_type, list }`

          - `item_type: string`

          - `list: array of object { item_type, string }  or object { item_type, resource_preview }`

            - `McnStringItem object { item_type, string }`

              - `item_type: string`

              - `string: string`

            - `McnResourcePreviewItem object { item_type, resource_preview }`

              - `item_type: string`

              - `resource_preview: object { id, cloud_type, detail, 3 more }`

                - `id: string`

                - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                  - `"AWS"`

                  - `"AZURE"`

                  - `"GOOGLE"`

                  - `"CLOUDFLARE"`

                - `detail: string`

                - `name: string`

                - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                  - `"aws_customer_gateway"`

                  - `"aws_egress_only_internet_gateway"`

                  - `"aws_internet_gateway"`

                  - `"aws_instance"`

                  - `"aws_network_interface"`

                  - `"aws_route"`

                  - `"aws_route_table"`

                  - `"aws_route_table_association"`

                  - `"aws_subnet"`

                  - `"aws_vpc"`

                  - `"aws_vpc_ipv4_cidr_block_association"`

                  - `"aws_vpn_connection"`

                  - `"aws_vpn_connection_route"`

                  - `"aws_vpn_gateway"`

                  - `"aws_security_group"`

                  - `"aws_vpc_security_group_ingress_rule"`

                  - `"aws_vpc_security_group_egress_rule"`

                  - `"aws_ec2_managed_prefix_list"`

                  - `"aws_ec2_transit_gateway"`

                  - `"aws_ec2_transit_gateway_prefix_list_reference"`

                  - `"aws_ec2_transit_gateway_vpc_attachment"`

                  - `"azurerm_application_security_group"`

                  - `"azurerm_lb"`

                  - `"azurerm_lb_backend_address_pool"`

                  - `"azurerm_lb_nat_pool"`

                  - `"azurerm_lb_nat_rule"`

                  - `"azurerm_lb_rule"`

                  - `"azurerm_local_network_gateway"`

                  - `"azurerm_network_interface"`

                  - `"azurerm_network_interface_application_security_group_association"`

                  - `"azurerm_network_interface_backend_address_pool_association"`

                  - `"azurerm_network_interface_security_group_association"`

                  - `"azurerm_network_security_group"`

                  - `"azurerm_public_ip"`

                  - `"azurerm_route"`

                  - `"azurerm_route_table"`

                  - `"azurerm_subnet"`

                  - `"azurerm_subnet_route_table_association"`

                  - `"azurerm_virtual_machine"`

                  - `"azurerm_virtual_network_gateway_connection"`

                  - `"azurerm_virtual_network"`

                  - `"azurerm_virtual_network_gateway"`

                  - `"google_compute_network"`

                  - `"google_compute_subnetwork"`

                  - `"google_compute_vpn_gateway"`

                  - `"google_compute_vpn_tunnel"`

                  - `"google_compute_route"`

                  - `"google_compute_address"`

                  - `"google_compute_global_address"`

                  - `"google_compute_router"`

                  - `"google_compute_interconnect_attachment"`

                  - `"google_compute_ha_vpn_gateway"`

                  - `"google_compute_forwarding_rule"`

                  - `"google_compute_network_firewall_policy"`

                  - `"google_compute_network_firewall_policy_rule"`

                  - `"cloudflare_static_route"`

                  - `"cloudflare_ipsec_tunnel"`

                - `title: string`

    - `help_text: optional string`

  - `state: map[unknown]`

  - `tags: map[string]`

  - `updated_at: string`

  - `url: string`

  - `managed_by: optional array of object { id, client_type, name }`

    - `id: string`

    - `client_type: "MAGIC_WAN_CLOUD_ONRAMP"`

      - `"MAGIC_WAN_CLOUD_ONRAMP"`

    - `name: string`

### Resource Get Response

- `ResourceGetResponse object { id, account_id, cloud_type, 18 more }`

  - `id: string`

  - `account_id: string`

  - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

    - `"AWS"`

    - `"AZURE"`

    - `"GOOGLE"`

    - `"CLOUDFLARE"`

  - `config: map[unknown]`

  - `deployment_provider: string`

  - `managed: boolean`

  - `monthly_cost_estimate: object { currency, monthly_cost }`

    - `currency: string`

    - `monthly_cost: number`

  - `name: string`

  - `native_id: string`

  - `observations: map[object { first_observed_at, last_observed_at, provider_id, resource_id } ]`

    - `first_observed_at: string`

    - `last_observed_at: string`

    - `provider_id: string`

    - `resource_id: string`

  - `provider_ids: array of string`

  - `provider_names_by_id: map[string]`

  - `region: string`

  - `resource_group: string`

  - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

    - `"aws_customer_gateway"`

    - `"aws_egress_only_internet_gateway"`

    - `"aws_internet_gateway"`

    - `"aws_instance"`

    - `"aws_network_interface"`

    - `"aws_route"`

    - `"aws_route_table"`

    - `"aws_route_table_association"`

    - `"aws_subnet"`

    - `"aws_vpc"`

    - `"aws_vpc_ipv4_cidr_block_association"`

    - `"aws_vpn_connection"`

    - `"aws_vpn_connection_route"`

    - `"aws_vpn_gateway"`

    - `"aws_security_group"`

    - `"aws_vpc_security_group_ingress_rule"`

    - `"aws_vpc_security_group_egress_rule"`

    - `"aws_ec2_managed_prefix_list"`

    - `"aws_ec2_transit_gateway"`

    - `"aws_ec2_transit_gateway_prefix_list_reference"`

    - `"aws_ec2_transit_gateway_vpc_attachment"`

    - `"azurerm_application_security_group"`

    - `"azurerm_lb"`

    - `"azurerm_lb_backend_address_pool"`

    - `"azurerm_lb_nat_pool"`

    - `"azurerm_lb_nat_rule"`

    - `"azurerm_lb_rule"`

    - `"azurerm_local_network_gateway"`

    - `"azurerm_network_interface"`

    - `"azurerm_network_interface_application_security_group_association"`

    - `"azurerm_network_interface_backend_address_pool_association"`

    - `"azurerm_network_interface_security_group_association"`

    - `"azurerm_network_security_group"`

    - `"azurerm_public_ip"`

    - `"azurerm_route"`

    - `"azurerm_route_table"`

    - `"azurerm_subnet"`

    - `"azurerm_subnet_route_table_association"`

    - `"azurerm_virtual_machine"`

    - `"azurerm_virtual_network_gateway_connection"`

    - `"azurerm_virtual_network"`

    - `"azurerm_virtual_network_gateway"`

    - `"google_compute_network"`

    - `"google_compute_subnetwork"`

    - `"google_compute_vpn_gateway"`

    - `"google_compute_vpn_tunnel"`

    - `"google_compute_route"`

    - `"google_compute_address"`

    - `"google_compute_global_address"`

    - `"google_compute_router"`

    - `"google_compute_interconnect_attachment"`

    - `"google_compute_ha_vpn_gateway"`

    - `"google_compute_forwarding_rule"`

    - `"google_compute_network_firewall_policy"`

    - `"google_compute_network_firewall_policy_rule"`

    - `"cloudflare_static_route"`

    - `"cloudflare_ipsec_tunnel"`

  - `sections: array of object { hidden_items, name, visible_items, help_text }`

    - `hidden_items: array of object { helpText, name, value }`

      - `helpText: optional string`

      - `name: optional string`

      - `value: optional object { item_type, string }  or object { item_type, yaml }  or object { item_type, yaml_diff }  or 2 more`

        - `McnStringItem object { item_type, string }`

          - `item_type: string`

          - `string: string`

        - `McnYamlItem object { item_type, yaml }`

          - `item_type: string`

          - `yaml: string`

        - `McnYamlDiffItem object { item_type, yaml_diff }`

          - `item_type: string`

          - `yaml_diff: object { diff, left_description, left_yaml, 2 more }`

            - `diff: string`

            - `left_description: string`

            - `left_yaml: string`

            - `right_description: string`

            - `right_yaml: string`

        - `McnResourcePreviewItem object { item_type, resource_preview }`

          - `item_type: string`

          - `resource_preview: object { id, cloud_type, detail, 3 more }`

            - `id: string`

            - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

              - `"AWS"`

              - `"AZURE"`

              - `"GOOGLE"`

              - `"CLOUDFLARE"`

            - `detail: string`

            - `name: string`

            - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

              - `"aws_customer_gateway"`

              - `"aws_egress_only_internet_gateway"`

              - `"aws_internet_gateway"`

              - `"aws_instance"`

              - `"aws_network_interface"`

              - `"aws_route"`

              - `"aws_route_table"`

              - `"aws_route_table_association"`

              - `"aws_subnet"`

              - `"aws_vpc"`

              - `"aws_vpc_ipv4_cidr_block_association"`

              - `"aws_vpn_connection"`

              - `"aws_vpn_connection_route"`

              - `"aws_vpn_gateway"`

              - `"aws_security_group"`

              - `"aws_vpc_security_group_ingress_rule"`

              - `"aws_vpc_security_group_egress_rule"`

              - `"aws_ec2_managed_prefix_list"`

              - `"aws_ec2_transit_gateway"`

              - `"aws_ec2_transit_gateway_prefix_list_reference"`

              - `"aws_ec2_transit_gateway_vpc_attachment"`

              - `"azurerm_application_security_group"`

              - `"azurerm_lb"`

              - `"azurerm_lb_backend_address_pool"`

              - `"azurerm_lb_nat_pool"`

              - `"azurerm_lb_nat_rule"`

              - `"azurerm_lb_rule"`

              - `"azurerm_local_network_gateway"`

              - `"azurerm_network_interface"`

              - `"azurerm_network_interface_application_security_group_association"`

              - `"azurerm_network_interface_backend_address_pool_association"`

              - `"azurerm_network_interface_security_group_association"`

              - `"azurerm_network_security_group"`

              - `"azurerm_public_ip"`

              - `"azurerm_route"`

              - `"azurerm_route_table"`

              - `"azurerm_subnet"`

              - `"azurerm_subnet_route_table_association"`

              - `"azurerm_virtual_machine"`

              - `"azurerm_virtual_network_gateway_connection"`

              - `"azurerm_virtual_network"`

              - `"azurerm_virtual_network_gateway"`

              - `"google_compute_network"`

              - `"google_compute_subnetwork"`

              - `"google_compute_vpn_gateway"`

              - `"google_compute_vpn_tunnel"`

              - `"google_compute_route"`

              - `"google_compute_address"`

              - `"google_compute_global_address"`

              - `"google_compute_router"`

              - `"google_compute_interconnect_attachment"`

              - `"google_compute_ha_vpn_gateway"`

              - `"google_compute_forwarding_rule"`

              - `"google_compute_network_firewall_policy"`

              - `"google_compute_network_firewall_policy_rule"`

              - `"cloudflare_static_route"`

              - `"cloudflare_ipsec_tunnel"`

            - `title: string`

        - `McnListItem object { item_type, list }`

          - `item_type: string`

          - `list: array of object { item_type, string }  or object { item_type, resource_preview }`

            - `McnStringItem object { item_type, string }`

              - `item_type: string`

              - `string: string`

            - `McnResourcePreviewItem object { item_type, resource_preview }`

              - `item_type: string`

              - `resource_preview: object { id, cloud_type, detail, 3 more }`

                - `id: string`

                - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                  - `"AWS"`

                  - `"AZURE"`

                  - `"GOOGLE"`

                  - `"CLOUDFLARE"`

                - `detail: string`

                - `name: string`

                - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                  - `"aws_customer_gateway"`

                  - `"aws_egress_only_internet_gateway"`

                  - `"aws_internet_gateway"`

                  - `"aws_instance"`

                  - `"aws_network_interface"`

                  - `"aws_route"`

                  - `"aws_route_table"`

                  - `"aws_route_table_association"`

                  - `"aws_subnet"`

                  - `"aws_vpc"`

                  - `"aws_vpc_ipv4_cidr_block_association"`

                  - `"aws_vpn_connection"`

                  - `"aws_vpn_connection_route"`

                  - `"aws_vpn_gateway"`

                  - `"aws_security_group"`

                  - `"aws_vpc_security_group_ingress_rule"`

                  - `"aws_vpc_security_group_egress_rule"`

                  - `"aws_ec2_managed_prefix_list"`

                  - `"aws_ec2_transit_gateway"`

                  - `"aws_ec2_transit_gateway_prefix_list_reference"`

                  - `"aws_ec2_transit_gateway_vpc_attachment"`

                  - `"azurerm_application_security_group"`

                  - `"azurerm_lb"`

                  - `"azurerm_lb_backend_address_pool"`

                  - `"azurerm_lb_nat_pool"`

                  - `"azurerm_lb_nat_rule"`

                  - `"azurerm_lb_rule"`

                  - `"azurerm_local_network_gateway"`

                  - `"azurerm_network_interface"`

                  - `"azurerm_network_interface_application_security_group_association"`

                  - `"azurerm_network_interface_backend_address_pool_association"`

                  - `"azurerm_network_interface_security_group_association"`

                  - `"azurerm_network_security_group"`

                  - `"azurerm_public_ip"`

                  - `"azurerm_route"`

                  - `"azurerm_route_table"`

                  - `"azurerm_subnet"`

                  - `"azurerm_subnet_route_table_association"`

                  - `"azurerm_virtual_machine"`

                  - `"azurerm_virtual_network_gateway_connection"`

                  - `"azurerm_virtual_network"`

                  - `"azurerm_virtual_network_gateway"`

                  - `"google_compute_network"`

                  - `"google_compute_subnetwork"`

                  - `"google_compute_vpn_gateway"`

                  - `"google_compute_vpn_tunnel"`

                  - `"google_compute_route"`

                  - `"google_compute_address"`

                  - `"google_compute_global_address"`

                  - `"google_compute_router"`

                  - `"google_compute_interconnect_attachment"`

                  - `"google_compute_ha_vpn_gateway"`

                  - `"google_compute_forwarding_rule"`

                  - `"google_compute_network_firewall_policy"`

                  - `"google_compute_network_firewall_policy_rule"`

                  - `"cloudflare_static_route"`

                  - `"cloudflare_ipsec_tunnel"`

                - `title: string`

    - `name: string`

    - `visible_items: array of object { helpText, name, value }`

      - `helpText: optional string`

      - `name: optional string`

      - `value: optional object { item_type, string }  or object { item_type, yaml }  or object { item_type, yaml_diff }  or 2 more`

        - `McnStringItem object { item_type, string }`

          - `item_type: string`

          - `string: string`

        - `McnYamlItem object { item_type, yaml }`

          - `item_type: string`

          - `yaml: string`

        - `McnYamlDiffItem object { item_type, yaml_diff }`

          - `item_type: string`

          - `yaml_diff: object { diff, left_description, left_yaml, 2 more }`

            - `diff: string`

            - `left_description: string`

            - `left_yaml: string`

            - `right_description: string`

            - `right_yaml: string`

        - `McnResourcePreviewItem object { item_type, resource_preview }`

          - `item_type: string`

          - `resource_preview: object { id, cloud_type, detail, 3 more }`

            - `id: string`

            - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

              - `"AWS"`

              - `"AZURE"`

              - `"GOOGLE"`

              - `"CLOUDFLARE"`

            - `detail: string`

            - `name: string`

            - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

              - `"aws_customer_gateway"`

              - `"aws_egress_only_internet_gateway"`

              - `"aws_internet_gateway"`

              - `"aws_instance"`

              - `"aws_network_interface"`

              - `"aws_route"`

              - `"aws_route_table"`

              - `"aws_route_table_association"`

              - `"aws_subnet"`

              - `"aws_vpc"`

              - `"aws_vpc_ipv4_cidr_block_association"`

              - `"aws_vpn_connection"`

              - `"aws_vpn_connection_route"`

              - `"aws_vpn_gateway"`

              - `"aws_security_group"`

              - `"aws_vpc_security_group_ingress_rule"`

              - `"aws_vpc_security_group_egress_rule"`

              - `"aws_ec2_managed_prefix_list"`

              - `"aws_ec2_transit_gateway"`

              - `"aws_ec2_transit_gateway_prefix_list_reference"`

              - `"aws_ec2_transit_gateway_vpc_attachment"`

              - `"azurerm_application_security_group"`

              - `"azurerm_lb"`

              - `"azurerm_lb_backend_address_pool"`

              - `"azurerm_lb_nat_pool"`

              - `"azurerm_lb_nat_rule"`

              - `"azurerm_lb_rule"`

              - `"azurerm_local_network_gateway"`

              - `"azurerm_network_interface"`

              - `"azurerm_network_interface_application_security_group_association"`

              - `"azurerm_network_interface_backend_address_pool_association"`

              - `"azurerm_network_interface_security_group_association"`

              - `"azurerm_network_security_group"`

              - `"azurerm_public_ip"`

              - `"azurerm_route"`

              - `"azurerm_route_table"`

              - `"azurerm_subnet"`

              - `"azurerm_subnet_route_table_association"`

              - `"azurerm_virtual_machine"`

              - `"azurerm_virtual_network_gateway_connection"`

              - `"azurerm_virtual_network"`

              - `"azurerm_virtual_network_gateway"`

              - `"google_compute_network"`

              - `"google_compute_subnetwork"`

              - `"google_compute_vpn_gateway"`

              - `"google_compute_vpn_tunnel"`

              - `"google_compute_route"`

              - `"google_compute_address"`

              - `"google_compute_global_address"`

              - `"google_compute_router"`

              - `"google_compute_interconnect_attachment"`

              - `"google_compute_ha_vpn_gateway"`

              - `"google_compute_forwarding_rule"`

              - `"google_compute_network_firewall_policy"`

              - `"google_compute_network_firewall_policy_rule"`

              - `"cloudflare_static_route"`

              - `"cloudflare_ipsec_tunnel"`

            - `title: string`

        - `McnListItem object { item_type, list }`

          - `item_type: string`

          - `list: array of object { item_type, string }  or object { item_type, resource_preview }`

            - `McnStringItem object { item_type, string }`

              - `item_type: string`

              - `string: string`

            - `McnResourcePreviewItem object { item_type, resource_preview }`

              - `item_type: string`

              - `resource_preview: object { id, cloud_type, detail, 3 more }`

                - `id: string`

                - `cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"`

                  - `"AWS"`

                  - `"AZURE"`

                  - `"GOOGLE"`

                  - `"CLOUDFLARE"`

                - `detail: string`

                - `name: string`

                - `resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more`

                  - `"aws_customer_gateway"`

                  - `"aws_egress_only_internet_gateway"`

                  - `"aws_internet_gateway"`

                  - `"aws_instance"`

                  - `"aws_network_interface"`

                  - `"aws_route"`

                  - `"aws_route_table"`

                  - `"aws_route_table_association"`

                  - `"aws_subnet"`

                  - `"aws_vpc"`

                  - `"aws_vpc_ipv4_cidr_block_association"`

                  - `"aws_vpn_connection"`

                  - `"aws_vpn_connection_route"`

                  - `"aws_vpn_gateway"`

                  - `"aws_security_group"`

                  - `"aws_vpc_security_group_ingress_rule"`

                  - `"aws_vpc_security_group_egress_rule"`

                  - `"aws_ec2_managed_prefix_list"`

                  - `"aws_ec2_transit_gateway"`

                  - `"aws_ec2_transit_gateway_prefix_list_reference"`

                  - `"aws_ec2_transit_gateway_vpc_attachment"`

                  - `"azurerm_application_security_group"`

                  - `"azurerm_lb"`

                  - `"azurerm_lb_backend_address_pool"`

                  - `"azurerm_lb_nat_pool"`

                  - `"azurerm_lb_nat_rule"`

                  - `"azurerm_lb_rule"`

                  - `"azurerm_local_network_gateway"`

                  - `"azurerm_network_interface"`

                  - `"azurerm_network_interface_application_security_group_association"`

                  - `"azurerm_network_interface_backend_address_pool_association"`

                  - `"azurerm_network_interface_security_group_association"`

                  - `"azurerm_network_security_group"`

                  - `"azurerm_public_ip"`

                  - `"azurerm_route"`

                  - `"azurerm_route_table"`

                  - `"azurerm_subnet"`

                  - `"azurerm_subnet_route_table_association"`

                  - `"azurerm_virtual_machine"`

                  - `"azurerm_virtual_network_gateway_connection"`

                  - `"azurerm_virtual_network"`

                  - `"azurerm_virtual_network_gateway"`

                  - `"google_compute_network"`

                  - `"google_compute_subnetwork"`

                  - `"google_compute_vpn_gateway"`

                  - `"google_compute_vpn_tunnel"`

                  - `"google_compute_route"`

                  - `"google_compute_address"`

                  - `"google_compute_global_address"`

                  - `"google_compute_router"`

                  - `"google_compute_interconnect_attachment"`

                  - `"google_compute_ha_vpn_gateway"`

                  - `"google_compute_forwarding_rule"`

                  - `"google_compute_network_firewall_policy"`

                  - `"google_compute_network_firewall_policy_rule"`

                  - `"cloudflare_static_route"`

                  - `"cloudflare_ipsec_tunnel"`

                - `title: string`

    - `help_text: optional string`

  - `state: map[unknown]`

  - `tags: map[string]`

  - `updated_at: string`

  - `url: string`

  - `managed_by: optional array of object { id, client_type, name }`

    - `id: string`

    - `client_type: "MAGIC_WAN_CLOUD_ONRAMP"`

      - `"MAGIC_WAN_CLOUD_ONRAMP"`

    - `name: string`

### Resource Policy Preview Response

- `ResourcePolicyPreviewResponse = string`

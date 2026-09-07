# Rules

## List rules

**get** `/accounts/{account_id}/mnm/rules`

Lists network monitoring rules for account.

### Path Parameters

- `account_id: string`

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

- `result: array of MagicNetworkMonitoringRule`

  - `id: string`

    The id of the rule. Must be unique.

  - `automatic_advertisement: boolean`

    Toggle on if you would like Cloudflare to automatically advertise the IP Prefixes within the rule via Magic Transit when the rule is triggered. Only available for users of Magic Transit.

  - `name: string`

    The name of the rule. Must be unique. Supports characters A-Z, a-z, 0-9, underscore (_), dash (-), period (.), and tilde (~). You can’t have a space in the rule name. Max 256 characters.

  - `prefixes: array of string`

  - `type: "threshold" or "zscore" or "advanced_ddos"`

    MNM rule type.

    - `"threshold"`

    - `"zscore"`

    - `"advanced_ddos"`

  - `bandwidth_threshold: optional number`

    The number of bits per second for the rule. When this value is exceeded for the set duration, an alert notification is sent. Minimum of 1 and no maximum.

  - `duration: optional "1m" or "5m" or "10m" or 5 more`

    The amount of time that the rule threshold must be exceeded to send an alert notification. The final value must be equivalent to one of the following 8 values ["1m","5m","10m","15m","20m","30m","45m","60m"].

    - `"1m"`

    - `"5m"`

    - `"10m"`

    - `"15m"`

    - `"20m"`

    - `"30m"`

    - `"45m"`

    - `"60m"`

  - `packet_threshold: optional number`

    The number of packets per second for the rule. When this value is exceeded for the set duration, an alert notification is sent. Minimum of 1 and no maximum.

  - `prefix_match: optional "exact" or "subnet" or "supernet"`

    Prefix match type to be applied for a prefix auto advertisement when using an advanced_ddos rule.

    - `"exact"`

    - `"subnet"`

    - `"supernet"`

  - `zscore_sensitivity: optional "low" or "medium" or "high"`

    Level of sensitivity set for zscore rules.

    - `"low"`

    - `"medium"`

    - `"high"`

  - `zscore_target: optional "bits" or "packets"`

    Target of the zscore rule analysis.

    - `"bits"`

    - `"packets"`

- `success: true`

  Whether the API call was successful

  - `true`

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Total number of results for the requested service

  - `page: optional number`

    Current page within paginated list of results

  - `per_page: optional number`

    Number of results per page of results

  - `total_count: optional number`

    Total results available without any search parameters

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/mnm/rules \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
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
  "result": [
    {
      "id": "2890e6fa406311ed9b5a23f70f6fb8cf",
      "automatic_advertisement": true,
      "name": "my_rule_1",
      "prefixes": [
        "203.0.113.1/32"
      ],
      "type": "zscore",
      "bandwidth_threshold": 1000,
      "duration": "1m",
      "packet_threshold": 10000,
      "prefix_match": "exact",
      "zscore_sensitivity": "high",
      "zscore_target": "bits"
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

## Get rule

**get** `/accounts/{account_id}/mnm/rules/{rule_id}`

List a single network monitoring rule for account.

### Path Parameters

- `account_id: string`

- `rule_id: string`

  The id of the rule. Must be unique.

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

- `result: MagicNetworkMonitoringRule`

  - `id: string`

    The id of the rule. Must be unique.

  - `automatic_advertisement: boolean`

    Toggle on if you would like Cloudflare to automatically advertise the IP Prefixes within the rule via Magic Transit when the rule is triggered. Only available for users of Magic Transit.

  - `name: string`

    The name of the rule. Must be unique. Supports characters A-Z, a-z, 0-9, underscore (_), dash (-), period (.), and tilde (~). You can’t have a space in the rule name. Max 256 characters.

  - `prefixes: array of string`

  - `type: "threshold" or "zscore" or "advanced_ddos"`

    MNM rule type.

    - `"threshold"`

    - `"zscore"`

    - `"advanced_ddos"`

  - `bandwidth_threshold: optional number`

    The number of bits per second for the rule. When this value is exceeded for the set duration, an alert notification is sent. Minimum of 1 and no maximum.

  - `duration: optional "1m" or "5m" or "10m" or 5 more`

    The amount of time that the rule threshold must be exceeded to send an alert notification. The final value must be equivalent to one of the following 8 values ["1m","5m","10m","15m","20m","30m","45m","60m"].

    - `"1m"`

    - `"5m"`

    - `"10m"`

    - `"15m"`

    - `"20m"`

    - `"30m"`

    - `"45m"`

    - `"60m"`

  - `packet_threshold: optional number`

    The number of packets per second for the rule. When this value is exceeded for the set duration, an alert notification is sent. Minimum of 1 and no maximum.

  - `prefix_match: optional "exact" or "subnet" or "supernet"`

    Prefix match type to be applied for a prefix auto advertisement when using an advanced_ddos rule.

    - `"exact"`

    - `"subnet"`

    - `"supernet"`

  - `zscore_sensitivity: optional "low" or "medium" or "high"`

    Level of sensitivity set for zscore rules.

    - `"low"`

    - `"medium"`

    - `"high"`

  - `zscore_target: optional "bits" or "packets"`

    Target of the zscore rule analysis.

    - `"bits"`

    - `"packets"`

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/mnm/rules/$RULE_ID \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
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
  "result": {
    "id": "2890e6fa406311ed9b5a23f70f6fb8cf",
    "automatic_advertisement": true,
    "name": "my_rule_1",
    "prefixes": [
      "203.0.113.1/32"
    ],
    "type": "zscore",
    "bandwidth_threshold": 1000,
    "duration": "1m",
    "packet_threshold": 10000,
    "prefix_match": "exact",
    "zscore_sensitivity": "high",
    "zscore_target": "bits"
  },
  "success": true
}
```

## Create rules

**post** `/accounts/{account_id}/mnm/rules`

Create network monitoring rules for account. Currently only supports creating a single rule per API request.

### Path Parameters

- `account_id: string`

### Body Parameters

- `automatic_advertisement: boolean`

  Toggle on if you would like Cloudflare to automatically advertise the IP Prefixes within the rule via Magic Transit when the rule is triggered. Only available for users of Magic Transit.

- `name: string`

  The name of the rule. Must be unique. Supports characters A-Z, a-z, 0-9, underscore (_), dash (-), period (.), and tilde (~). You can’t have a space in the rule name. Max 256 characters.

- `prefixes: array of string`

- `type: "threshold" or "zscore" or "advanced_ddos"`

  MNM rule type.

  - `"threshold"`

  - `"zscore"`

  - `"advanced_ddos"`

- `bandwidth_threshold: optional number`

  The number of bits per second for the rule. When this value is exceeded for the set duration, an alert notification is sent. Minimum of 1 and no maximum.

- `duration: optional "1m" or "5m" or "10m" or 5 more`

  The amount of time that the rule threshold must be exceeded to send an alert notification. The final value must be equivalent to one of the following 8 values ["1m","5m","10m","15m","20m","30m","45m","60m"].

  - `"1m"`

  - `"5m"`

  - `"10m"`

  - `"15m"`

  - `"20m"`

  - `"30m"`

  - `"45m"`

  - `"60m"`

- `packet_threshold: optional number`

  The number of packets per second for the rule. When this value is exceeded for the set duration, an alert notification is sent. Minimum of 1 and no maximum.

- `prefix_match: optional "exact" or "subnet" or "supernet"`

  Prefix match type to be applied for a prefix auto advertisement when using an advanced_ddos rule.

  - `"exact"`

  - `"subnet"`

  - `"supernet"`

- `zscore_sensitivity: optional "low" or "medium" or "high"`

  Level of sensitivity set for zscore rules.

  - `"low"`

  - `"medium"`

  - `"high"`

- `zscore_target: optional "bits" or "packets"`

  Target of the zscore rule analysis.

  - `"bits"`

  - `"packets"`

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

- `result: MagicNetworkMonitoringRule`

  - `id: string`

    The id of the rule. Must be unique.

  - `automatic_advertisement: boolean`

    Toggle on if you would like Cloudflare to automatically advertise the IP Prefixes within the rule via Magic Transit when the rule is triggered. Only available for users of Magic Transit.

  - `name: string`

    The name of the rule. Must be unique. Supports characters A-Z, a-z, 0-9, underscore (_), dash (-), period (.), and tilde (~). You can’t have a space in the rule name. Max 256 characters.

  - `prefixes: array of string`

  - `type: "threshold" or "zscore" or "advanced_ddos"`

    MNM rule type.

    - `"threshold"`

    - `"zscore"`

    - `"advanced_ddos"`

  - `bandwidth_threshold: optional number`

    The number of bits per second for the rule. When this value is exceeded for the set duration, an alert notification is sent. Minimum of 1 and no maximum.

  - `duration: optional "1m" or "5m" or "10m" or 5 more`

    The amount of time that the rule threshold must be exceeded to send an alert notification. The final value must be equivalent to one of the following 8 values ["1m","5m","10m","15m","20m","30m","45m","60m"].

    - `"1m"`

    - `"5m"`

    - `"10m"`

    - `"15m"`

    - `"20m"`

    - `"30m"`

    - `"45m"`

    - `"60m"`

  - `packet_threshold: optional number`

    The number of packets per second for the rule. When this value is exceeded for the set duration, an alert notification is sent. Minimum of 1 and no maximum.

  - `prefix_match: optional "exact" or "subnet" or "supernet"`

    Prefix match type to be applied for a prefix auto advertisement when using an advanced_ddos rule.

    - `"exact"`

    - `"subnet"`

    - `"supernet"`

  - `zscore_sensitivity: optional "low" or "medium" or "high"`

    Level of sensitivity set for zscore rules.

    - `"low"`

    - `"medium"`

    - `"high"`

  - `zscore_target: optional "bits" or "packets"`

    Target of the zscore rule analysis.

    - `"bits"`

    - `"packets"`

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/mnm/rules \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "automatic_advertisement": true,
          "name": "my_rule_1",
          "prefixes": [
            "203.0.113.1/32"
          ],
          "type": "zscore",
          "bandwidth_threshold": 1000,
          "packet_threshold": 10000,
          "prefix_match": "exact",
          "zscore_sensitivity": "high",
          "zscore_target": "bits"
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
  "result": {
    "id": "2890e6fa406311ed9b5a23f70f6fb8cf",
    "automatic_advertisement": true,
    "name": "my_rule_1",
    "prefixes": [
      "203.0.113.1/32"
    ],
    "type": "zscore",
    "bandwidth_threshold": 1000,
    "duration": "1m",
    "packet_threshold": 10000,
    "prefix_match": "exact",
    "zscore_sensitivity": "high",
    "zscore_target": "bits"
  },
  "success": true
}
```

## Update rules

**put** `/accounts/{account_id}/mnm/rules`

Update network monitoring rules for account.

### Path Parameters

- `account_id: string`

### Body Parameters

- `automatic_advertisement: boolean`

  Toggle on if you would like Cloudflare to automatically advertise the IP Prefixes within the rule via Magic Transit when the rule is triggered. Only available for users of Magic Transit.

- `name: string`

  The name of the rule. Must be unique. Supports characters A-Z, a-z, 0-9, underscore (_), dash (-), period (.), and tilde (~). You can’t have a space in the rule name. Max 256 characters.

- `prefixes: array of string`

- `type: "threshold" or "zscore" or "advanced_ddos"`

  MNM rule type.

  - `"threshold"`

  - `"zscore"`

  - `"advanced_ddos"`

- `bandwidth_threshold: optional number`

  The number of bits per second for the rule. When this value is exceeded for the set duration, an alert notification is sent. Minimum of 1 and no maximum.

- `duration: optional "1m" or "5m" or "10m" or 5 more`

  The amount of time that the rule threshold must be exceeded to send an alert notification. The final value must be equivalent to one of the following 8 values ["1m","5m","10m","15m","20m","30m","45m","60m"].

  - `"1m"`

  - `"5m"`

  - `"10m"`

  - `"15m"`

  - `"20m"`

  - `"30m"`

  - `"45m"`

  - `"60m"`

- `packet_threshold: optional number`

  The number of packets per second for the rule. When this value is exceeded for the set duration, an alert notification is sent. Minimum of 1 and no maximum.

- `prefix_match: optional "exact" or "subnet" or "supernet"`

  Prefix match type to be applied for a prefix auto advertisement when using an advanced_ddos rule.

  - `"exact"`

  - `"subnet"`

  - `"supernet"`

- `zscore_sensitivity: optional "low" or "medium" or "high"`

  Level of sensitivity set for zscore rules.

  - `"low"`

  - `"medium"`

  - `"high"`

- `zscore_target: optional "bits" or "packets"`

  Target of the zscore rule analysis.

  - `"bits"`

  - `"packets"`

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

- `result: MagicNetworkMonitoringRule`

  - `id: string`

    The id of the rule. Must be unique.

  - `automatic_advertisement: boolean`

    Toggle on if you would like Cloudflare to automatically advertise the IP Prefixes within the rule via Magic Transit when the rule is triggered. Only available for users of Magic Transit.

  - `name: string`

    The name of the rule. Must be unique. Supports characters A-Z, a-z, 0-9, underscore (_), dash (-), period (.), and tilde (~). You can’t have a space in the rule name. Max 256 characters.

  - `prefixes: array of string`

  - `type: "threshold" or "zscore" or "advanced_ddos"`

    MNM rule type.

    - `"threshold"`

    - `"zscore"`

    - `"advanced_ddos"`

  - `bandwidth_threshold: optional number`

    The number of bits per second for the rule. When this value is exceeded for the set duration, an alert notification is sent. Minimum of 1 and no maximum.

  - `duration: optional "1m" or "5m" or "10m" or 5 more`

    The amount of time that the rule threshold must be exceeded to send an alert notification. The final value must be equivalent to one of the following 8 values ["1m","5m","10m","15m","20m","30m","45m","60m"].

    - `"1m"`

    - `"5m"`

    - `"10m"`

    - `"15m"`

    - `"20m"`

    - `"30m"`

    - `"45m"`

    - `"60m"`

  - `packet_threshold: optional number`

    The number of packets per second for the rule. When this value is exceeded for the set duration, an alert notification is sent. Minimum of 1 and no maximum.

  - `prefix_match: optional "exact" or "subnet" or "supernet"`

    Prefix match type to be applied for a prefix auto advertisement when using an advanced_ddos rule.

    - `"exact"`

    - `"subnet"`

    - `"supernet"`

  - `zscore_sensitivity: optional "low" or "medium" or "high"`

    Level of sensitivity set for zscore rules.

    - `"low"`

    - `"medium"`

    - `"high"`

  - `zscore_target: optional "bits" or "packets"`

    Target of the zscore rule analysis.

    - `"bits"`

    - `"packets"`

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/mnm/rules \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "automatic_advertisement": true,
          "name": "my_rule_1",
          "prefixes": [
            "203.0.113.1/32"
          ],
          "type": "zscore",
          "bandwidth_threshold": 1000,
          "packet_threshold": 10000,
          "prefix_match": "exact",
          "zscore_sensitivity": "high",
          "zscore_target": "bits"
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
  "result": {
    "id": "2890e6fa406311ed9b5a23f70f6fb8cf",
    "automatic_advertisement": true,
    "name": "my_rule_1",
    "prefixes": [
      "203.0.113.1/32"
    ],
    "type": "zscore",
    "bandwidth_threshold": 1000,
    "duration": "1m",
    "packet_threshold": 10000,
    "prefix_match": "exact",
    "zscore_sensitivity": "high",
    "zscore_target": "bits"
  },
  "success": true
}
```

## Update rule

**patch** `/accounts/{account_id}/mnm/rules/{rule_id}`

Update a network monitoring rule for account.

### Path Parameters

- `account_id: string`

- `rule_id: string`

  The id of the rule. Must be unique.

### Body Parameters

- `automatic_advertisement: boolean`

  Toggle on if you would like Cloudflare to automatically advertise the IP Prefixes within the rule via Magic Transit when the rule is triggered. Only available for users of Magic Transit.

- `name: string`

  The name of the rule. Must be unique. Supports characters A-Z, a-z, 0-9, underscore (_), dash (-), period (.), and tilde (~). You can’t have a space in the rule name. Max 256 characters.

- `prefixes: array of string`

- `type: "threshold" or "zscore" or "advanced_ddos"`

  MNM rule type.

  - `"threshold"`

  - `"zscore"`

  - `"advanced_ddos"`

- `bandwidth_threshold: optional number`

  The number of bits per second for the rule. When this value is exceeded for the set duration, an alert notification is sent. Minimum of 1 and no maximum.

- `duration: optional "1m" or "5m" or "10m" or 5 more`

  The amount of time that the rule threshold must be exceeded to send an alert notification. The final value must be equivalent to one of the following 8 values ["1m","5m","10m","15m","20m","30m","45m","60m"].

  - `"1m"`

  - `"5m"`

  - `"10m"`

  - `"15m"`

  - `"20m"`

  - `"30m"`

  - `"45m"`

  - `"60m"`

- `packet_threshold: optional number`

  The number of packets per second for the rule. When this value is exceeded for the set duration, an alert notification is sent. Minimum of 1 and no maximum.

- `prefix_match: optional "exact" or "subnet" or "supernet"`

  Prefix match type to be applied for a prefix auto advertisement when using an advanced_ddos rule.

  - `"exact"`

  - `"subnet"`

  - `"supernet"`

- `zscore_sensitivity: optional "low" or "medium" or "high"`

  Level of sensitivity set for zscore rules.

  - `"low"`

  - `"medium"`

  - `"high"`

- `zscore_target: optional "bits" or "packets"`

  Target of the zscore rule analysis.

  - `"bits"`

  - `"packets"`

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

- `result: MagicNetworkMonitoringRule`

  - `id: string`

    The id of the rule. Must be unique.

  - `automatic_advertisement: boolean`

    Toggle on if you would like Cloudflare to automatically advertise the IP Prefixes within the rule via Magic Transit when the rule is triggered. Only available for users of Magic Transit.

  - `name: string`

    The name of the rule. Must be unique. Supports characters A-Z, a-z, 0-9, underscore (_), dash (-), period (.), and tilde (~). You can’t have a space in the rule name. Max 256 characters.

  - `prefixes: array of string`

  - `type: "threshold" or "zscore" or "advanced_ddos"`

    MNM rule type.

    - `"threshold"`

    - `"zscore"`

    - `"advanced_ddos"`

  - `bandwidth_threshold: optional number`

    The number of bits per second for the rule. When this value is exceeded for the set duration, an alert notification is sent. Minimum of 1 and no maximum.

  - `duration: optional "1m" or "5m" or "10m" or 5 more`

    The amount of time that the rule threshold must be exceeded to send an alert notification. The final value must be equivalent to one of the following 8 values ["1m","5m","10m","15m","20m","30m","45m","60m"].

    - `"1m"`

    - `"5m"`

    - `"10m"`

    - `"15m"`

    - `"20m"`

    - `"30m"`

    - `"45m"`

    - `"60m"`

  - `packet_threshold: optional number`

    The number of packets per second for the rule. When this value is exceeded for the set duration, an alert notification is sent. Minimum of 1 and no maximum.

  - `prefix_match: optional "exact" or "subnet" or "supernet"`

    Prefix match type to be applied for a prefix auto advertisement when using an advanced_ddos rule.

    - `"exact"`

    - `"subnet"`

    - `"supernet"`

  - `zscore_sensitivity: optional "low" or "medium" or "high"`

    Level of sensitivity set for zscore rules.

    - `"low"`

    - `"medium"`

    - `"high"`

  - `zscore_target: optional "bits" or "packets"`

    Target of the zscore rule analysis.

    - `"bits"`

    - `"packets"`

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/mnm/rules/$RULE_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "automatic_advertisement": true,
          "name": "my_rule_1",
          "prefixes": [
            "203.0.113.1/32"
          ],
          "type": "zscore",
          "bandwidth_threshold": 1000,
          "packet_threshold": 10000,
          "prefix_match": "exact",
          "zscore_sensitivity": "high",
          "zscore_target": "bits"
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
  "result": {
    "id": "2890e6fa406311ed9b5a23f70f6fb8cf",
    "automatic_advertisement": true,
    "name": "my_rule_1",
    "prefixes": [
      "203.0.113.1/32"
    ],
    "type": "zscore",
    "bandwidth_threshold": 1000,
    "duration": "1m",
    "packet_threshold": 10000,
    "prefix_match": "exact",
    "zscore_sensitivity": "high",
    "zscore_target": "bits"
  },
  "success": true
}
```

## Delete rule

**delete** `/accounts/{account_id}/mnm/rules/{rule_id}`

Delete a network monitoring rule for account.

### Path Parameters

- `account_id: string`

- `rule_id: string`

  The id of the rule. Must be unique.

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

- `result: MagicNetworkMonitoringRule`

  - `id: string`

    The id of the rule. Must be unique.

  - `automatic_advertisement: boolean`

    Toggle on if you would like Cloudflare to automatically advertise the IP Prefixes within the rule via Magic Transit when the rule is triggered. Only available for users of Magic Transit.

  - `name: string`

    The name of the rule. Must be unique. Supports characters A-Z, a-z, 0-9, underscore (_), dash (-), period (.), and tilde (~). You can’t have a space in the rule name. Max 256 characters.

  - `prefixes: array of string`

  - `type: "threshold" or "zscore" or "advanced_ddos"`

    MNM rule type.

    - `"threshold"`

    - `"zscore"`

    - `"advanced_ddos"`

  - `bandwidth_threshold: optional number`

    The number of bits per second for the rule. When this value is exceeded for the set duration, an alert notification is sent. Minimum of 1 and no maximum.

  - `duration: optional "1m" or "5m" or "10m" or 5 more`

    The amount of time that the rule threshold must be exceeded to send an alert notification. The final value must be equivalent to one of the following 8 values ["1m","5m","10m","15m","20m","30m","45m","60m"].

    - `"1m"`

    - `"5m"`

    - `"10m"`

    - `"15m"`

    - `"20m"`

    - `"30m"`

    - `"45m"`

    - `"60m"`

  - `packet_threshold: optional number`

    The number of packets per second for the rule. When this value is exceeded for the set duration, an alert notification is sent. Minimum of 1 and no maximum.

  - `prefix_match: optional "exact" or "subnet" or "supernet"`

    Prefix match type to be applied for a prefix auto advertisement when using an advanced_ddos rule.

    - `"exact"`

    - `"subnet"`

    - `"supernet"`

  - `zscore_sensitivity: optional "low" or "medium" or "high"`

    Level of sensitivity set for zscore rules.

    - `"low"`

    - `"medium"`

    - `"high"`

  - `zscore_target: optional "bits" or "packets"`

    Target of the zscore rule analysis.

    - `"bits"`

    - `"packets"`

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/mnm/rules/$RULE_ID \
    -X DELETE \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
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
  "result": {
    "id": "2890e6fa406311ed9b5a23f70f6fb8cf",
    "automatic_advertisement": true,
    "name": "my_rule_1",
    "prefixes": [
      "203.0.113.1/32"
    ],
    "type": "zscore",
    "bandwidth_threshold": 1000,
    "duration": "1m",
    "packet_threshold": 10000,
    "prefix_match": "exact",
    "zscore_sensitivity": "high",
    "zscore_target": "bits"
  },
  "success": true
}
```

## Domain Types

### Magic Network Monitoring Rule

- `MagicNetworkMonitoringRule object { id, automatic_advertisement, name, 8 more }`

  - `id: string`

    The id of the rule. Must be unique.

  - `automatic_advertisement: boolean`

    Toggle on if you would like Cloudflare to automatically advertise the IP Prefixes within the rule via Magic Transit when the rule is triggered. Only available for users of Magic Transit.

  - `name: string`

    The name of the rule. Must be unique. Supports characters A-Z, a-z, 0-9, underscore (_), dash (-), period (.), and tilde (~). You can’t have a space in the rule name. Max 256 characters.

  - `prefixes: array of string`

  - `type: "threshold" or "zscore" or "advanced_ddos"`

    MNM rule type.

    - `"threshold"`

    - `"zscore"`

    - `"advanced_ddos"`

  - `bandwidth_threshold: optional number`

    The number of bits per second for the rule. When this value is exceeded for the set duration, an alert notification is sent. Minimum of 1 and no maximum.

  - `duration: optional "1m" or "5m" or "10m" or 5 more`

    The amount of time that the rule threshold must be exceeded to send an alert notification. The final value must be equivalent to one of the following 8 values ["1m","5m","10m","15m","20m","30m","45m","60m"].

    - `"1m"`

    - `"5m"`

    - `"10m"`

    - `"15m"`

    - `"20m"`

    - `"30m"`

    - `"45m"`

    - `"60m"`

  - `packet_threshold: optional number`

    The number of packets per second for the rule. When this value is exceeded for the set duration, an alert notification is sent. Minimum of 1 and no maximum.

  - `prefix_match: optional "exact" or "subnet" or "supernet"`

    Prefix match type to be applied for a prefix auto advertisement when using an advanced_ddos rule.

    - `"exact"`

    - `"subnet"`

    - `"supernet"`

  - `zscore_sensitivity: optional "low" or "medium" or "high"`

    Level of sensitivity set for zscore rules.

    - `"low"`

    - `"medium"`

    - `"high"`

  - `zscore_target: optional "bits" or "packets"`

    Target of the zscore rule analysis.

    - `"bits"`

    - `"packets"`

# Advertisements

## Update advertisement for rule

**patch** `/accounts/{account_id}/mnm/rules/{rule_id}/advertisement`

Update advertisement for rule.

### Path Parameters

- `account_id: string`

- `rule_id: string`

  The id of the rule. Must be unique.

### Body Parameters

- `body: unknown`

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

- `result: Advertisement`

  - `automatic_advertisement: boolean`

    Toggle on if you would like Cloudflare to automatically advertise the IP Prefixes within the rule via Magic Transit when the rule is triggered. Only available for users of Magic Transit.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/mnm/rules/$RULE_ID/advertisement \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{}'
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
  "result": {
    "automatic_advertisement": true
  },
  "success": true
}
```

## Domain Types

### Advertisement

- `Advertisement object { automatic_advertisement }`

  - `automatic_advertisement: boolean`

    Toggle on if you would like Cloudflare to automatically advertise the IP Prefixes within the rule via Magic Transit when the rule is triggered. Only available for users of Magic Transit.

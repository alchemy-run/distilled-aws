## Create a Zero Trust Gateway rule

**post** `/accounts/{account_id}/gateway/rules`

Create a new Zero Trust Gateway rule.

### Path Parameters

- `account_id: string`

### Body Parameters

- `action: "on" or "off" or "allow" or 13 more`

  Specify the action to perform when the associated traffic, identity, and device posture expressions either absent or evaluate to `true`.

  - `"on"`

  - `"off"`

  - `"allow"`

  - `"block"`

  - `"scan"`

  - `"noscan"`

  - `"safesearch"`

  - `"ytrestricted"`

  - `"isolate"`

  - `"noisolate"`

  - `"override"`

  - `"l4_override"`

  - `"egress"`

  - `"resolve"`

  - `"quarantine"`

  - `"redirect"`

- `name: string`

  Specify the rule name.

- `description: optional string`

  Specify the rule description.

- `device_posture: optional string`

  Specify the wirefilter expression used for device posture check. The API automatically formats and sanitizes expressions before storing them. To prevent Terraform state drift, use the formatted expression returned in the API response.

- `enabled: optional boolean`

  Specify whether the rule is enabled.

- `expiration: optional object { expires_at, duration, expired }`

  Defines the expiration time stamp and default duration of a DNS policy. Takes precedence over the policy's `schedule` configuration, if any. This  does not apply to HTTP or network policies. Settable only for `dns` rules.

  - `expires_at: string`

    Show the timestamp when the policy expires and stops applying.  The value must follow RFC 3339 and include a UTC offset.  The system accepts non-zero offsets but converts them to the equivalent UTC+00:00  value and returns timestamps with a trailing Z. Expiration policies ignore client  timezones and expire globally at the specified expires_at time.

  - `duration: optional number`

    Defines the default duration a policy active in minutes. Must set in order to use the `reset_expiration` endpoint on this rule.

  - `expired: optional boolean`

    Indicates whether the policy is expired.

- `filters: optional array of GatewayFilter`

  Specify the protocol or layer to evaluate the traffic, identity, and device posture expressions. Can only contain a single value.

  - `"http"`

  - `"dns"`

  - `"l4"`

  - `"egress"`

  - `"dns_resolver"`

- `identity: optional string`

  Specify the wirefilter expression used for identity matching. The API automatically formats and sanitizes expressions before storing them. To prevent Terraform state drift, use the formatted expression returned in the API response.

- `precedence: optional number`

  Set the order of your rules. Lower values indicate higher precedence. At each processing phase, evaluate applicable rules in ascending order of this value. Refer to [Order of enforcement](http://developers.cloudflare.com/learning-paths/secure-internet-traffic/understand-policies/order-of-enforcement/#manage-precedence-with-terraform) to manage precedence via Terraform.

- `rule_settings: optional RuleSetting`

  Defines settings for this rule. Settings apply only to specific rule types and must use compatible selectors. If Terraform detects drift, confirm the setting supports your rule type and check whether the API modifies the value. Use API-returned values in your configuration to prevent drift.

  - `add_headers: optional map[array of string]`

    Add custom headers to allowed requests as key-value pairs. Use header names as keys that map to arrays of header values. Settable only for `http` rules with the action set to `allow`.

  - `allow_child_bypass: optional boolean`

    Set to enable MSP children to bypass this rule. Only parent MSP accounts can set this. this rule. Settable for all types of rules.

  - `audit_ssh: optional object { command_logging }`

    Define the settings for the Audit SSH action. Settable only for `l4` rules with `audit_ssh` action.

    - `command_logging: optional boolean`

      Enable SSH command logging.

  - `biso_admin_controls: optional object { copy, dcp, dd, 10 more }`

    Configure browser isolation behavior. Settable only for `http` rules with the action set to `isolate`.

    - `copy: optional "enabled" or "disabled" or "remote_only"`

      Configure copy behavior. If set to remote_only, users cannot copy isolated content from the remote browser to the local clipboard. If this field is absent, copying remains enabled. Applies only when version == "v2".

      - `"enabled"`

      - `"disabled"`

      - `"remote_only"`

    - `dcp: optional boolean`

      Set to false to enable copy-pasting. Only applies when `version == "v1"`.

    - `dd: optional boolean`

      Set to false to enable downloading. Only applies when `version == "v1"`.

    - `dk: optional boolean`

      Set to false to enable keyboard usage. Only applies when `version == "v1"`.

    - `download: optional "enabled" or "disabled" or "remote_only"`

      Configure download behavior. When set to remote_only, users can view downloads but cannot save them. If this field is absent, downloading remains enabled. Applies only when version == "v2".

      - `"enabled"`

      - `"disabled"`

      - `"remote_only"`

    - `dp: optional boolean`

      Set to false to enable printing. Only applies when `version == "v1"`.

    - `du: optional boolean`

      Set to false to enable uploading. Only applies when `version == "v1"`.

    - `keyboard: optional "enabled" or "disabled"`

      Configure keyboard usage behavior. If this field is absent, keyboard usage remains enabled. Applies only when version == "v2".

      - `"enabled"`

      - `"disabled"`

    - `paste: optional "enabled" or "disabled" or "remote_only"`

      Configure paste behavior. If set to remote_only, users cannot paste content from the local clipboard into isolated pages. If this field is absent, pasting remains enabled. Applies only when version == "v2".

      - `"enabled"`

      - `"disabled"`

      - `"remote_only"`

    - `printing: optional "enabled" or "disabled"`

      Configure print behavior. Default, Printing is enabled. Applies only when version == "v2".

      - `"enabled"`

      - `"disabled"`

    - `upload: optional "enabled" or "disabled"`

      Configure upload behavior. If this field is absent, uploading remains enabled. Applies only when version == "v2".

      - `"enabled"`

      - `"disabled"`

    - `version: optional "v1" or "v2"`

      Indicate which version of the browser isolation controls should apply.

      - `"v1"`

      - `"v2"`

    - `wm_id: optional string`

      Specify the watermark ID (UUID) to apply to the isolated browser session. When present, enables watermark rendering in the isolated browser.

  - `block_page: optional object { target_uri, include_context }`

    Configure custom block page settings. If missing or null, use the account settings. Settable only for `http` rules with the action set to `block`.

    - `target_uri: string`

      Specify the URI to which the user is redirected.

    - `include_context: optional boolean`

      Specify whether to pass the context information as query parameters.

  - `block_page_enabled: optional boolean`

    Enable the custom block page. Settable only for `dns` rules with action `block`.

  - `block_reason: optional string`

    Explain why the rule blocks the request. The custom block page shows this text (if enabled). Settable only for `dns`, `l4`, and `http` rules when the action set to `block`.

  - `bypass_parent_rule: optional boolean`

    Set to enable MSP accounts to bypass their parent's rules. Only MSP child accounts can set this. Settable for all types of rules.

  - `check_session: optional object { duration, enforce }`

    Configure session check behavior. Settable only for `l4` and `http` rules with the action set to `allow`.

    - `duration: optional string`

      Sets the required session freshness threshold. The API returns a normalized version of this value.

    - `enforce: optional boolean`

      Enable session enforcement.

  - `dns_resolvers: optional object { ipv4, ipv6 }`

    Configure custom resolvers to route queries that match the resolver policy. Unused with 'resolve_dns_through_cloudflare' or 'resolve_dns_internally' settings. DNS queries get routed to the address closest to their origin. Only valid when a rule's action set to 'resolve'. Settable only for `dns_resolver` rules.

    - `ipv4: optional array of DNSResolverSettingsV4`

      - `ip: string`

        Specify the IPv4 address of the upstream resolver.

      - `port: optional number`

        Specify a port number to use for the upstream resolver. Defaults to 53 if unspecified.

      - `route_through_private_network: optional boolean`

        Indicate whether to connect to this resolver over a private network. Must set when vnet_id set.

      - `vnet_id: optional string`

        Specify an optional virtual network for this resolver. Uses default virtual network id if omitted.

    - `ipv6: optional array of DNSResolverSettingsV6`

      - `ip: string`

        Specify the IPv6 address of the upstream resolver.

      - `port: optional number`

        Specify a port number to use for the upstream resolver. Defaults to 53 if unspecified.

      - `route_through_private_network: optional boolean`

        Indicate whether to connect to this resolver over a private network. Must set when vnet_id set.

      - `vnet_id: optional string`

        Specify an optional virtual network for this resolver. Uses default virtual network id if omitted.

  - `egress: optional object { ipv4, ipv4_fallback, ipv6 }`

    Configure how Gateway Proxy traffic egresses. You can enable this setting for rules with Egress actions and filters, or omit it to indicate local egress via WARP IPs. Settable only for `egress` rules.

    - `ipv4: optional string`

      Specify the IPv4 address to use for egress.

    - `ipv4_fallback: optional string`

      Specify the fallback IPv4 address to use for egress when the primary IPv4 fails. Set '0.0.0.0' to indicate local egress via WARP IPs.

    - `ipv6: optional string`

      Specify the IPv6 range to use for egress.

  - `forensic_copy: optional object { enabled }`

    Configure whether a copy of the HTTP request will be sent to storage when the rule matches.

    - `enabled: optional boolean`

      Enable sending the copy to storage.

  - `ignore_cname_category_matches: optional boolean`

    Ignore category matches at CNAME domains in a response. When off, evaluate categories in this rule against all CNAME domain categories in the response. Settable only for `dns` and `dns_resolver` rules.

  - `insecure_disable_dnssec_validation: optional boolean`

    Specify whether to disable DNSSEC validation (for Allow actions) [INSECURE]. Settable only for `dns` rules.

  - `ip_categories: optional boolean`

    Enable IPs in DNS resolver category blocks. The system blocks only domain name categories unless you enable this setting. Settable only for `dns` and `dns_resolver` rules.

  - `ip_indicator_feeds: optional boolean`

    Indicates whether to include IPs in DNS resolver indicator feed blocks. Default, indicator feeds block only domain names. Settable only for `dns` and `dns_resolver` rules.

  - `l4override: optional object { ip, port }`

    Send matching traffic to the supplied destination IP address and port. Settable only for `l4` rules with the action set to `l4_override`.

    - `ip: optional string`

      Defines the IPv4 or IPv6 address.

    - `port: optional number`

      Defines a port number to use for TCP/UDP overrides.

  - `notification_settings: optional object { enabled, include_context, msg, support_url }`

    Configure a notification to display on the user's device when this rule matched. Settable for all types of rules with the action set to `block`.

    - `enabled: optional boolean`

      Enable notification.

    - `include_context: optional boolean`

      Indicates whether to pass the context information as query parameters.

    - `msg: optional string`

      Customize the message shown in the notification.

    - `support_url: optional string`

      Defines an optional URL to direct users to additional information. If unset, the notification opens a block page.

  - `override_host: optional string`

    Defines a hostname for override, for the matching DNS queries. Settable only for `dns` rules with the action set to `override`.

  - `override_ips: optional array of string`

    Defines a an IP or set of IPs for overriding matched DNS queries. Settable only for `dns` rules with the action set to `override`.

  - `payload_log: optional object { enabled }`

    Configure DLP payload logging. Settable only for `http` rules.

    - `enabled: optional boolean`

      Enable DLP payload logging for this rule.

  - `quarantine: optional object { file_types }`

    Configure settings that apply to quarantine rules. Settable only for `http` rules.

    - `file_types: optional array of "exe" or "pdf" or "doc" or 10 more`

      Specify the types of files to sandbox.

      - `"exe"`

      - `"pdf"`

      - `"doc"`

      - `"docm"`

      - `"docx"`

      - `"rtf"`

      - `"ppt"`

      - `"pptx"`

      - `"xls"`

      - `"xlsm"`

      - `"xlsx"`

      - `"zip"`

      - `"rar"`

  - `redirect: optional object { target_uri, include_context, preserve_path_and_query }`

    Apply settings to redirect rules. Settable only for `http` rules with the action set to `redirect`.

    - `target_uri: string`

      Specify the URI to which the user is redirected.

    - `include_context: optional boolean`

      Specify whether to pass the context information as query parameters.

    - `preserve_path_and_query: optional boolean`

      Specify whether to append the path and query parameters from the original request to target_uri.

  - `resolve_dns_internally: optional object { fallback, view_id }`

    Configure to forward the query to the internal DNS service, passing the specified 'view_id' as input. Not used when 'dns_resolvers' is specified or 'resolve_dns_through_cloudflare' is set. Only valid when a rule's action set to 'resolve'. Settable only for `dns_resolver` rules.

    - `fallback: optional "none" or "public_dns"`

      Specify the fallback behavior to apply when the internal DNS response code differs from 'NOERROR' or when the response data contains only CNAME records for 'A' or 'AAAA' queries.

      - `"none"`

      - `"public_dns"`

    - `view_id: optional string`

      Specify the internal DNS view identifier to pass to the internal DNS service.

  - `resolve_dns_through_cloudflare: optional boolean`

    Enable to send queries that match the policy to Cloudflare's default 1.1.1.1 DNS resolver. Cannot set when 'dns_resolvers' specified or 'resolve_dns_internally' is set. Only valid when a rule's action set to 'resolve'. Settable only for `dns_resolver` rules.

  - `untrusted_cert: optional object { action }`

    Configure behavior when an upstream certificate is invalid or an SSL error occurs. Settable only for `http` rules with the action set to `allow`.

    - `action: optional "pass_through" or "block" or "error"`

      Defines the action performed when an untrusted certificate seen. The default action an error with HTTP code 526.

      - `"pass_through"`

      - `"block"`

      - `"error"`

- `schedule: optional Schedule`

  Defines the schedule for activating DNS policies. Settable only for `dns` and `dns_resolver` rules.

  - `fri: optional string`

    Specify the time intervals when the rule is active on Fridays, in the increasing order from 00:00-24:00.  If this parameter omitted, the rule is deactivated on Fridays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

  - `mon: optional string`

    Specify the time intervals when the rule is active on Mondays, in the increasing order from 00:00-24:00(capped at maximum of 6 time splits). If this parameter omitted, the rule is deactivated on Mondays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

  - `sat: optional string`

    Specify the time intervals when the rule is active on Saturdays, in the increasing order from 00:00-24:00.  If this parameter omitted, the rule is deactivated on Saturdays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

  - `sun: optional string`

    Specify the time intervals when the rule is active on Sundays, in the increasing order from 00:00-24:00. If this parameter omitted, the rule is deactivated on Sundays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

  - `thu: optional string`

    Specify the time intervals when the rule is active on Thursdays, in the increasing order from 00:00-24:00. If this parameter omitted, the rule is deactivated on Thursdays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

  - `time_zone: optional string`

    Specify the time zone for rule evaluation. When a [valid time zone city name](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List) is provided, Gateway always uses the current time for that time zone. When this parameter is omitted, Gateway uses the time zone determined from the user's IP address. Colo time zone is used when the user's IP address does not resolve to a location.

  - `tue: optional string`

    Specify the time intervals when the rule is active on Tuesdays, in the increasing order from 00:00-24:00. If this parameter omitted, the rule is deactivated on Tuesdays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

  - `wed: optional string`

    Specify the time intervals when the rule is active on Wednesdays, in the increasing order from 00:00-24:00. If this parameter omitted, the rule is deactivated on Wednesdays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

- `traffic: optional string`

  Specify the wirefilter expression used for traffic matching. The API automatically formats and sanitizes expressions before storing them. To prevent Terraform state drift, use the formatted expression returned in the API response.

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

- `success: true`

  Indicate whether the API call was successful.

  - `true`

- `result: optional GatewayRule`

  - `action: "on" or "off" or "allow" or 13 more`

    Specify the action to perform when the associated traffic, identity, and device posture expressions either absent or evaluate to `true`.

    - `"on"`

    - `"off"`

    - `"allow"`

    - `"block"`

    - `"scan"`

    - `"noscan"`

    - `"safesearch"`

    - `"ytrestricted"`

    - `"isolate"`

    - `"noisolate"`

    - `"override"`

    - `"l4_override"`

    - `"egress"`

    - `"resolve"`

    - `"quarantine"`

    - `"redirect"`

  - `enabled: boolean`

    Specify whether the rule is enabled.

  - `filters: array of GatewayFilter`

    Specify the protocol or layer to evaluate the traffic, identity, and device posture expressions. Can only contain a single value.

    - `"http"`

    - `"dns"`

    - `"l4"`

    - `"egress"`

    - `"dns_resolver"`

  - `name: string`

    Specify the rule name.

  - `precedence: number`

    Set the order of your rules. Lower values indicate higher precedence. At each processing phase, evaluate applicable rules in ascending order of this value. Refer to [Order of enforcement](http://developers.cloudflare.com/learning-paths/secure-internet-traffic/understand-policies/order-of-enforcement/#manage-precedence-with-terraform) to manage precedence via Terraform.

  - `traffic: string`

    Specify the wirefilter expression used for traffic matching. The API automatically formats and sanitizes expressions before storing them. To prevent Terraform state drift, use the formatted expression returned in the API response.

  - `id: optional string`

    Identify the API resource with a UUID.

  - `created_at: optional string`

  - `deleted_at: optional string`

    Indicate the date of deletion, if any.

  - `description: optional string`

    Specify the rule description.

  - `device_posture: optional string`

    Specify the wirefilter expression used for device posture check. The API automatically formats and sanitizes expressions before storing them. To prevent Terraform state drift, use the formatted expression returned in the API response.

  - `expiration: optional object { expires_at, duration, expired }`

    Defines the expiration time stamp and default duration of a DNS policy. Takes precedence over the policy's `schedule` configuration, if any. This  does not apply to HTTP or network policies. Settable only for `dns` rules.

    - `expires_at: string`

      Show the timestamp when the policy expires and stops applying.  The value must follow RFC 3339 and include a UTC offset.  The system accepts non-zero offsets but converts them to the equivalent UTC+00:00  value and returns timestamps with a trailing Z. Expiration policies ignore client  timezones and expire globally at the specified expires_at time.

    - `duration: optional number`

      Defines the default duration a policy active in minutes. Must set in order to use the `reset_expiration` endpoint on this rule.

    - `expired: optional boolean`

      Indicates whether the policy is expired.

  - `identity: optional string`

    Specify the wirefilter expression used for identity matching. The API automatically formats and sanitizes expressions before storing them. To prevent Terraform state drift, use the formatted expression returned in the API response.

  - `read_only: optional boolean`

    Indicate that this rule is shared via the Orgs API and read only.

  - `rule_settings: optional RuleSetting`

    Defines settings for this rule. Settings apply only to specific rule types and must use compatible selectors. If Terraform detects drift, confirm the setting supports your rule type and check whether the API modifies the value. Use API-returned values in your configuration to prevent drift.

    - `add_headers: optional map[array of string]`

      Add custom headers to allowed requests as key-value pairs. Use header names as keys that map to arrays of header values. Settable only for `http` rules with the action set to `allow`.

    - `allow_child_bypass: optional boolean`

      Set to enable MSP children to bypass this rule. Only parent MSP accounts can set this. this rule. Settable for all types of rules.

    - `audit_ssh: optional object { command_logging }`

      Define the settings for the Audit SSH action. Settable only for `l4` rules with `audit_ssh` action.

      - `command_logging: optional boolean`

        Enable SSH command logging.

    - `biso_admin_controls: optional object { copy, dcp, dd, 10 more }`

      Configure browser isolation behavior. Settable only for `http` rules with the action set to `isolate`.

      - `copy: optional "enabled" or "disabled" or "remote_only"`

        Configure copy behavior. If set to remote_only, users cannot copy isolated content from the remote browser to the local clipboard. If this field is absent, copying remains enabled. Applies only when version == "v2".

        - `"enabled"`

        - `"disabled"`

        - `"remote_only"`

      - `dcp: optional boolean`

        Set to false to enable copy-pasting. Only applies when `version == "v1"`.

      - `dd: optional boolean`

        Set to false to enable downloading. Only applies when `version == "v1"`.

      - `dk: optional boolean`

        Set to false to enable keyboard usage. Only applies when `version == "v1"`.

      - `download: optional "enabled" or "disabled" or "remote_only"`

        Configure download behavior. When set to remote_only, users can view downloads but cannot save them. If this field is absent, downloading remains enabled. Applies only when version == "v2".

        - `"enabled"`

        - `"disabled"`

        - `"remote_only"`

      - `dp: optional boolean`

        Set to false to enable printing. Only applies when `version == "v1"`.

      - `du: optional boolean`

        Set to false to enable uploading. Only applies when `version == "v1"`.

      - `keyboard: optional "enabled" or "disabled"`

        Configure keyboard usage behavior. If this field is absent, keyboard usage remains enabled. Applies only when version == "v2".

        - `"enabled"`

        - `"disabled"`

      - `paste: optional "enabled" or "disabled" or "remote_only"`

        Configure paste behavior. If set to remote_only, users cannot paste content from the local clipboard into isolated pages. If this field is absent, pasting remains enabled. Applies only when version == "v2".

        - `"enabled"`

        - `"disabled"`

        - `"remote_only"`

      - `printing: optional "enabled" or "disabled"`

        Configure print behavior. Default, Printing is enabled. Applies only when version == "v2".

        - `"enabled"`

        - `"disabled"`

      - `upload: optional "enabled" or "disabled"`

        Configure upload behavior. If this field is absent, uploading remains enabled. Applies only when version == "v2".

        - `"enabled"`

        - `"disabled"`

      - `version: optional "v1" or "v2"`

        Indicate which version of the browser isolation controls should apply.

        - `"v1"`

        - `"v2"`

      - `wm_id: optional string`

        Specify the watermark ID (UUID) to apply to the isolated browser session. When present, enables watermark rendering in the isolated browser.

    - `block_page: optional object { target_uri, include_context }`

      Configure custom block page settings. If missing or null, use the account settings. Settable only for `http` rules with the action set to `block`.

      - `target_uri: string`

        Specify the URI to which the user is redirected.

      - `include_context: optional boolean`

        Specify whether to pass the context information as query parameters.

    - `block_page_enabled: optional boolean`

      Enable the custom block page. Settable only for `dns` rules with action `block`.

    - `block_reason: optional string`

      Explain why the rule blocks the request. The custom block page shows this text (if enabled). Settable only for `dns`, `l4`, and `http` rules when the action set to `block`.

    - `bypass_parent_rule: optional boolean`

      Set to enable MSP accounts to bypass their parent's rules. Only MSP child accounts can set this. Settable for all types of rules.

    - `check_session: optional object { duration, enforce }`

      Configure session check behavior. Settable only for `l4` and `http` rules with the action set to `allow`.

      - `duration: optional string`

        Sets the required session freshness threshold. The API returns a normalized version of this value.

      - `enforce: optional boolean`

        Enable session enforcement.

    - `dns_resolvers: optional object { ipv4, ipv6 }`

      Configure custom resolvers to route queries that match the resolver policy. Unused with 'resolve_dns_through_cloudflare' or 'resolve_dns_internally' settings. DNS queries get routed to the address closest to their origin. Only valid when a rule's action set to 'resolve'. Settable only for `dns_resolver` rules.

      - `ipv4: optional array of DNSResolverSettingsV4`

        - `ip: string`

          Specify the IPv4 address of the upstream resolver.

        - `port: optional number`

          Specify a port number to use for the upstream resolver. Defaults to 53 if unspecified.

        - `route_through_private_network: optional boolean`

          Indicate whether to connect to this resolver over a private network. Must set when vnet_id set.

        - `vnet_id: optional string`

          Specify an optional virtual network for this resolver. Uses default virtual network id if omitted.

      - `ipv6: optional array of DNSResolverSettingsV6`

        - `ip: string`

          Specify the IPv6 address of the upstream resolver.

        - `port: optional number`

          Specify a port number to use for the upstream resolver. Defaults to 53 if unspecified.

        - `route_through_private_network: optional boolean`

          Indicate whether to connect to this resolver over a private network. Must set when vnet_id set.

        - `vnet_id: optional string`

          Specify an optional virtual network for this resolver. Uses default virtual network id if omitted.

    - `egress: optional object { ipv4, ipv4_fallback, ipv6 }`

      Configure how Gateway Proxy traffic egresses. You can enable this setting for rules with Egress actions and filters, or omit it to indicate local egress via WARP IPs. Settable only for `egress` rules.

      - `ipv4: optional string`

        Specify the IPv4 address to use for egress.

      - `ipv4_fallback: optional string`

        Specify the fallback IPv4 address to use for egress when the primary IPv4 fails. Set '0.0.0.0' to indicate local egress via WARP IPs.

      - `ipv6: optional string`

        Specify the IPv6 range to use for egress.

    - `forensic_copy: optional object { enabled }`

      Configure whether a copy of the HTTP request will be sent to storage when the rule matches.

      - `enabled: optional boolean`

        Enable sending the copy to storage.

    - `ignore_cname_category_matches: optional boolean`

      Ignore category matches at CNAME domains in a response. When off, evaluate categories in this rule against all CNAME domain categories in the response. Settable only for `dns` and `dns_resolver` rules.

    - `insecure_disable_dnssec_validation: optional boolean`

      Specify whether to disable DNSSEC validation (for Allow actions) [INSECURE]. Settable only for `dns` rules.

    - `ip_categories: optional boolean`

      Enable IPs in DNS resolver category blocks. The system blocks only domain name categories unless you enable this setting. Settable only for `dns` and `dns_resolver` rules.

    - `ip_indicator_feeds: optional boolean`

      Indicates whether to include IPs in DNS resolver indicator feed blocks. Default, indicator feeds block only domain names. Settable only for `dns` and `dns_resolver` rules.

    - `l4override: optional object { ip, port }`

      Send matching traffic to the supplied destination IP address and port. Settable only for `l4` rules with the action set to `l4_override`.

      - `ip: optional string`

        Defines the IPv4 or IPv6 address.

      - `port: optional number`

        Defines a port number to use for TCP/UDP overrides.

    - `notification_settings: optional object { enabled, include_context, msg, support_url }`

      Configure a notification to display on the user's device when this rule matched. Settable for all types of rules with the action set to `block`.

      - `enabled: optional boolean`

        Enable notification.

      - `include_context: optional boolean`

        Indicates whether to pass the context information as query parameters.

      - `msg: optional string`

        Customize the message shown in the notification.

      - `support_url: optional string`

        Defines an optional URL to direct users to additional information. If unset, the notification opens a block page.

    - `override_host: optional string`

      Defines a hostname for override, for the matching DNS queries. Settable only for `dns` rules with the action set to `override`.

    - `override_ips: optional array of string`

      Defines a an IP or set of IPs for overriding matched DNS queries. Settable only for `dns` rules with the action set to `override`.

    - `payload_log: optional object { enabled }`

      Configure DLP payload logging. Settable only for `http` rules.

      - `enabled: optional boolean`

        Enable DLP payload logging for this rule.

    - `quarantine: optional object { file_types }`

      Configure settings that apply to quarantine rules. Settable only for `http` rules.

      - `file_types: optional array of "exe" or "pdf" or "doc" or 10 more`

        Specify the types of files to sandbox.

        - `"exe"`

        - `"pdf"`

        - `"doc"`

        - `"docm"`

        - `"docx"`

        - `"rtf"`

        - `"ppt"`

        - `"pptx"`

        - `"xls"`

        - `"xlsm"`

        - `"xlsx"`

        - `"zip"`

        - `"rar"`

    - `redirect: optional object { target_uri, include_context, preserve_path_and_query }`

      Apply settings to redirect rules. Settable only for `http` rules with the action set to `redirect`.

      - `target_uri: string`

        Specify the URI to which the user is redirected.

      - `include_context: optional boolean`

        Specify whether to pass the context information as query parameters.

      - `preserve_path_and_query: optional boolean`

        Specify whether to append the path and query parameters from the original request to target_uri.

    - `resolve_dns_internally: optional object { fallback, view_id }`

      Configure to forward the query to the internal DNS service, passing the specified 'view_id' as input. Not used when 'dns_resolvers' is specified or 'resolve_dns_through_cloudflare' is set. Only valid when a rule's action set to 'resolve'. Settable only for `dns_resolver` rules.

      - `fallback: optional "none" or "public_dns"`

        Specify the fallback behavior to apply when the internal DNS response code differs from 'NOERROR' or when the response data contains only CNAME records for 'A' or 'AAAA' queries.

        - `"none"`

        - `"public_dns"`

      - `view_id: optional string`

        Specify the internal DNS view identifier to pass to the internal DNS service.

    - `resolve_dns_through_cloudflare: optional boolean`

      Enable to send queries that match the policy to Cloudflare's default 1.1.1.1 DNS resolver. Cannot set when 'dns_resolvers' specified or 'resolve_dns_internally' is set. Only valid when a rule's action set to 'resolve'. Settable only for `dns_resolver` rules.

    - `untrusted_cert: optional object { action }`

      Configure behavior when an upstream certificate is invalid or an SSL error occurs. Settable only for `http` rules with the action set to `allow`.

      - `action: optional "pass_through" or "block" or "error"`

        Defines the action performed when an untrusted certificate seen. The default action an error with HTTP code 526.

        - `"pass_through"`

        - `"block"`

        - `"error"`

  - `schedule: optional Schedule`

    Defines the schedule for activating DNS policies. Settable only for `dns` and `dns_resolver` rules.

    - `fri: optional string`

      Specify the time intervals when the rule is active on Fridays, in the increasing order from 00:00-24:00.  If this parameter omitted, the rule is deactivated on Fridays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

    - `mon: optional string`

      Specify the time intervals when the rule is active on Mondays, in the increasing order from 00:00-24:00(capped at maximum of 6 time splits). If this parameter omitted, the rule is deactivated on Mondays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

    - `sat: optional string`

      Specify the time intervals when the rule is active on Saturdays, in the increasing order from 00:00-24:00.  If this parameter omitted, the rule is deactivated on Saturdays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

    - `sun: optional string`

      Specify the time intervals when the rule is active on Sundays, in the increasing order from 00:00-24:00. If this parameter omitted, the rule is deactivated on Sundays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

    - `thu: optional string`

      Specify the time intervals when the rule is active on Thursdays, in the increasing order from 00:00-24:00. If this parameter omitted, the rule is deactivated on Thursdays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

    - `time_zone: optional string`

      Specify the time zone for rule evaluation. When a [valid time zone city name](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List) is provided, Gateway always uses the current time for that time zone. When this parameter is omitted, Gateway uses the time zone determined from the user's IP address. Colo time zone is used when the user's IP address does not resolve to a location.

    - `tue: optional string`

      Specify the time intervals when the rule is active on Tuesdays, in the increasing order from 00:00-24:00. If this parameter omitted, the rule is deactivated on Tuesdays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

    - `wed: optional string`

      Specify the time intervals when the rule is active on Wednesdays, in the increasing order from 00:00-24:00. If this parameter omitted, the rule is deactivated on Wednesdays. API returns a formatted version of this string, which may cause Terraform drift if a unformatted value is used.

  - `sharable: optional boolean`

    Indicate that this rule is sharable via the Orgs API.

  - `source_account: optional string`

    Provide the account tag of the account that created the rule.

  - `updated_at: optional string`

  - `version: optional number`

    Indicate the version number of the rule(read-only).

  - `warning_status: optional string`

    Indicate a warning for a misconfigured rule, if any.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "action": "allow",
          "name": "block bad websites",
          "description": "Block bad websites based on their host name.",
          "device_posture": "any(device_posture.checks.passed[*] in {\\"1308749e-fcfb-4ebc-b051-fe022b632644\\"})",
          "enabled": true,
          "filters": [
            "http"
          ],
          "identity": "any(identity.groups.name[*] in {\\"finance\\"})",
          "traffic": "http.request.uri matches \\".*a/partial/uri.*\\" and http.request.host in $01302951-49f9-47c9-a400-0297e60b6a10"
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
    "action": "allow",
    "enabled": true,
    "filters": [
      "http"
    ],
    "name": "block bad websites",
    "precedence": 0,
    "traffic": "http.request.uri matches \".*a/partial/uri.*\" and http.request.host in $01302951-49f9-47c9-a400-0297e60b6a10",
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "deleted_at": "2019-12-27T18:11:19.117Z",
    "description": "Block bad websites based on their host name.",
    "device_posture": "any(device_posture.checks.passed[*] in {\"1308749e-fcfb-4ebc-b051-fe022b632644\"})",
    "expiration": {
      "expires_at": "2014-01-01T05:20:20Z",
      "duration": 10,
      "expired": false
    },
    "identity": "any(identity.groups.name[*] in {\"finance\"})",
    "read_only": true,
    "rule_settings": {
      "add_headers": {
        "My-Next-Header": [
          "foo",
          "bar"
        ],
        "X-Custom-Header-Name": [
          "somecustomvalue"
        ]
      },
      "allow_child_bypass": false,
      "audit_ssh": {
        "command_logging": false
      },
      "biso_admin_controls": {
        "copy": "remote_only",
        "dcp": true,
        "dd": true,
        "dk": true,
        "download": "enabled",
        "dp": false,
        "du": true,
        "keyboard": "enabled",
        "paste": "enabled",
        "printing": "enabled",
        "upload": "enabled",
        "version": "v1",
        "wm_id": "475345dc-5299-4b6e-8f6a-3d3e4c8e9f1a"
      },
      "block_page": {
        "target_uri": "https://example.com",
        "include_context": true
      },
      "block_page_enabled": true,
      "block_reason": "This website is a security risk",
      "bypass_parent_rule": false,
      "check_session": {
        "duration": "300s",
        "enforce": true
      },
      "dns_resolvers": {
        "ipv4": [
          {
            "ip": "2.2.2.2",
            "port": 5053,
            "route_through_private_network": true,
            "vnet_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
          }
        ],
        "ipv6": [
          {
            "ip": "2001:DB8::",
            "port": 5053,
            "route_through_private_network": true,
            "vnet_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
          }
        ]
      },
      "egress": {
        "ipv4": "192.0.2.2",
        "ipv4_fallback": "192.0.2.3",
        "ipv6": "2001:DB8::/64"
      },
      "forensic_copy": {
        "enabled": true
      },
      "ignore_cname_category_matches": true,
      "insecure_disable_dnssec_validation": false,
      "ip_categories": true,
      "ip_indicator_feeds": true,
      "l4override": {
        "ip": "1.1.1.1",
        "port": 0
      },
      "notification_settings": {
        "enabled": true,
        "include_context": true,
        "msg": "msg",
        "support_url": "support_url"
      },
      "override_host": "example.com",
      "override_ips": [
        "1.1.1.1",
        "2.2.2.2"
      ],
      "payload_log": {
        "enabled": true
      },
      "quarantine": {
        "file_types": [
          "exe"
        ]
      },
      "redirect": {
        "target_uri": "https://example.com",
        "include_context": true,
        "preserve_path_and_query": true
      },
      "resolve_dns_internally": {
        "fallback": "none",
        "view_id": "view_id"
      },
      "resolve_dns_through_cloudflare": true,
      "untrusted_cert": {
        "action": "error"
      }
    },
    "schedule": {
      "fri": "08:00-12:30,13:30-17:00",
      "mon": "08:00-12:30,13:30-17:00",
      "sat": "08:00-12:30,13:30-17:00",
      "sun": "08:00-12:30,13:30-17:00",
      "thu": "08:00-12:30,13:30-17:00",
      "time_zone": "America/New York",
      "tue": "08:00-12:30,13:30-17:00",
      "wed": "08:00-12:30,13:30-17:00"
    },
    "sharable": true,
    "source_account": "source_account",
    "updated_at": "2014-01-01T05:20:00.12345Z",
    "version": 1,
    "warning_status": "warning_status"
  }
}
```

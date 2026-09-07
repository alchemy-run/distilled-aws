# Shared

## Domain Types

### ASN

- `ASN = number`

### Audit Log

- `AuditLog object { id, action, actor, 7 more }`

  - `id: optional string`

    A string that uniquely identifies the audit log.

  - `action: optional object { result, type }`

    - `result: optional boolean`

      A boolean that indicates if the action attempted was successful.

    - `type: optional string`

      A short string that describes the action that was performed.

  - `actor: optional object { id, email, ip, type }`

    - `id: optional string`

      The ID of the actor that performed the action. If a user performed the action, this will be their User ID.

    - `email: optional string`

      The email of the user that performed the action.

    - `ip: optional string`

      The IP address of the request that performed the action.

    - `type: optional "user" or "admin" or "Cloudflare"`

      The type of actor, whether a User, Cloudflare Admin, or an Automated System.

      - `"user"`

      - `"admin"`

      - `"Cloudflare"`

  - `interface: optional string`

    The source of the event.

  - `metadata: optional unknown`

    An object which can lend more context to the action being logged. This is a flexible value and varies between different actions.

  - `newValue: optional string`

    The new value of the resource that was modified.

  - `oldValue: optional string`

    The value of the resource before it was modified.

  - `owner: optional object { id }`

    - `id: optional string`

      Identifier

  - `resource: optional object { id, type }`

    - `id: optional string`

      An identifier for the resource that was affected by the action.

    - `type: optional string`

      A short string that describes the resource that was affected by the action.

  - `when: optional string`

    A UTC RFC3339 timestamp that specifies when the action being logged occured.

### Certificate CA

- `CertificateCA = "digicert" or "google" or "lets_encrypt" or "ssl_com"`

  The Certificate Authority that will issue the certificate.

  - `"digicert"`

  - `"google"`

  - `"lets_encrypt"`

  - `"ssl_com"`

### Certificate Request Type

- `CertificateRequestType = "origin-rsa" or "origin-ecc" or "keyless-certificate"`

  Signature type desired on certificate ("origin-rsa" (rsa), "origin-ecc" (ecdsa), or "keyless-certificate" (for Keyless SSL servers).

  - `"origin-rsa"`

  - `"origin-ecc"`

  - `"keyless-certificate"`

### Cloudflare Tunnel

- `CloudflareTunnel object { id, account_tag, config_src, 10 more }`

  A Cloudflare Tunnel that connects your origin to Cloudflare's edge.

  - `id: optional string`

    UUID of the tunnel.

  - `account_tag: optional string`

    Cloudflare account ID

  - `config_src: optional "local" or "cloudflare"`

    Indicates if this is a locally or remotely configured tunnel. If `local`, manage the tunnel using a YAML file on the origin machine. If `cloudflare`, manage the tunnel on the Zero Trust dashboard.

    - `"local"`

    - `"cloudflare"`

  - `connections: optional array of object { id, client_id, client_version, 5 more }`

    The Cloudflare Tunnel connections between your origin and Cloudflare's edge.

    - `id: optional string`

      UUID of the Cloudflare Tunnel connection.

    - `client_id: optional string`

      UUID of the Cloudflare Tunnel connector.

    - `client_version: optional string`

      The cloudflared version used to establish this connection.

    - `colo_name: optional string`

      The Cloudflare data center used for this connection.

    - `is_pending_reconnect: optional boolean`

      Cloudflare continues to track connections for several minutes after they disconnect. This is an optimization to improve latency and reliability of reconnecting.  If `true`, the connection has disconnected but is still being tracked. If `false`, the connection is actively serving traffic.

    - `opened_at: optional string`

      Timestamp of when the connection was established.

    - `origin_ip: optional string`

      The public IP address of the host running cloudflared.

    - `uuid: optional string`

      UUID of the Cloudflare Tunnel connection.

  - `conns_active_at: optional string`

    Timestamp of when the tunnel established at least one connection to Cloudflare's edge. If `null`, the tunnel is inactive.

  - `conns_inactive_at: optional string`

    Timestamp of when the tunnel became inactive (no connections to Cloudflare's edge). If `null`, the tunnel is active.

  - `created_at: optional string`

    Timestamp of when the resource was created.

  - `deleted_at: optional string`

    Timestamp of when the resource was deleted. If `null`, the resource has not been deleted.

  - `metadata: optional unknown`

    Metadata associated with the tunnel.

  - `name: optional string`

    A user-friendly name for a tunnel.

  - `remote_config: optional boolean`

    If `true`, the tunnel can be configured remotely from the Zero Trust dashboard. If `false`, the tunnel must be configured locally on the origin machine.

  - `status: optional "inactive" or "degraded" or "healthy" or "down"`

    The status of the tunnel. Valid values are `inactive` (tunnel has never been run), `degraded` (tunnel is active and able to serve traffic but in an unhealthy state), `healthy` (tunnel is active and able to serve traffic), or `down` (tunnel can not serve traffic as it has no connections to the Cloudflare Edge).

    - `"inactive"`

    - `"degraded"`

    - `"healthy"`

    - `"down"`

  - `tun_type: optional "cfd_tunnel" or "warp_connector" or "warp" or 4 more`

    The type of tunnel.

    - `"cfd_tunnel"`

    - `"warp_connector"`

    - `"warp"`

    - `"magic"`

    - `"ip_sec"`

    - `"gre"`

    - `"cni"`

### Error Data

- `ErrorData object { code, documentation_url, message, source }`

  - `code: optional number`

  - `documentation_url: optional string`

  - `message: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

### Identifier

- `Identifier object { id }`

  - `id: optional string`

    Identifier.

### Load Balancer Preview

- `LoadBalancerPreview object { pools, preview_id }`

  - `pools: optional map[string]`

    Monitored pool IDs mapped to their respective names.

  - `preview_id: optional string`

### Member

- `Member object { id, email, policies, 3 more }`

  - `id: optional string`

    Membership identifier tag.

  - `email: optional string`

    The contact email address of the user.

  - `policies: optional array of object { id, access, permission_groups, resource_groups }`

    Access policy for the membership

    - `id: optional string`

      Policy identifier.

    - `access: optional "allow" or "deny"`

      Allow or deny operations against the resources.

      - `"allow"`

      - `"deny"`

    - `permission_groups: optional array of object { id, meta, name }`

      A set of permission groups that are specified to the policy.

      - `id: string`

        Identifier of the permission group.

      - `meta: optional object { key, value }`

        Attributes associated to the permission group.

        - `key: optional string`

        - `value: optional string`

      - `name: optional string`

        Name of the permission group.

    - `resource_groups: optional array of object { id, scope, meta, name }`

      A list of resource groups that the policy applies to.

      - `id: string`

        Identifier of the resource group.

      - `scope: array of object { key, objects }`

        The scope associated to the resource group

        - `key: string`

          This is a combination of pre-defined resource name and identifier (like Account ID etc.)

        - `objects: array of object { key }`

          A list of scope objects for additional context.

          - `key: string`

            This is a combination of pre-defined resource name and identifier (like Zone ID etc.)

      - `meta: optional object { key, value }`

        Attributes associated to the resource group.

        - `key: optional string`

        - `value: optional string`

      - `name: optional string`

        Name of the resource group.

  - `roles: optional array of Role`

    Roles assigned to this Member.

    - `id: string`

      Role identifier tag.

    - `description: string`

      Description of role's permissions.

    - `name: string`

      Role name.

    - `permissions: object { analytics, billing, cache_purge, 9 more }`

      - `analytics: optional PermissionGrant`

        - `read: optional boolean`

        - `write: optional boolean`

      - `billing: optional PermissionGrant`

      - `cache_purge: optional PermissionGrant`

      - `dns: optional PermissionGrant`

      - `dns_records: optional PermissionGrant`

      - `lb: optional PermissionGrant`

      - `logs: optional PermissionGrant`

      - `organization: optional PermissionGrant`

      - `ssl: optional PermissionGrant`

      - `waf: optional PermissionGrant`

      - `zone_settings: optional PermissionGrant`

      - `zones: optional PermissionGrant`

  - `status: optional "accepted" or "pending"`

    A member's status in the account.

    - `"accepted"`

    - `"pending"`

  - `user: optional object { email, id, first_name, 2 more }`

    Details of the user associated to the membership.

    - `email: string`

      The contact email address of the user.

    - `id: optional string`

      Identifier

    - `first_name: optional string`

      User's first name

    - `last_name: optional string`

      User's last name

    - `two_factor_authentication_enabled: optional boolean`

      Indicates whether two-factor authentication is enabled for the user account. Does not apply to API authentication.

### Pagination Info

- `PaginationInfo object { count, page, per_page, total_count }`

  - `count: optional number`

    Total number of results for the requested service

  - `page: optional number`

    Current page within paginated list of results

  - `per_page: optional number`

    Number of results per page of results

  - `total_count: optional number`

    Total results available without any search parameters

### Permission

- `Permission = string`

### Permission Grant

- `PermissionGrant object { read, write }`

  - `read: optional boolean`

  - `write: optional boolean`

### Rate Plan

- `RatePlan object { id, currency, externally_managed, 4 more }`

  The rate plan applied to the subscription.

  - `id: optional "free" or "lite" or "pro" or 7 more`

    The ID of the rate plan.

    - `"free"`

    - `"lite"`

    - `"pro"`

    - `"pro_plus"`

    - `"business"`

    - `"enterprise"`

    - `"partners_free"`

    - `"partners_pro"`

    - `"partners_business"`

    - `"partners_enterprise"`

  - `currency: optional string`

    The currency applied to the rate plan subscription.

  - `externally_managed: optional boolean`

    Whether this rate plan is managed externally from Cloudflare.

  - `is_contract: optional boolean`

    Whether a rate plan is enterprise-based (or newly adopted term contract).

  - `public_name: optional string`

    The full name of the rate plan.

  - `scope: optional string`

    The scope that this rate plan applies to.

  - `sets: optional array of string`

    The list of sets this rate plan applies to. Returns array of strings.

### Response Info

- `ResponseInfo object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

### Result

- `Result = object { errors, messages, result, success }  or object { errors, messages, success }`

  - `object { errors, messages, result, success }`

    - `errors: optional array of ResponseInfo`

      - `code: number`

      - `message: string`

      - `documentation_url: optional string`

      - `source: optional object { pointer }`

        - `pointer: optional string`

    - `messages: optional array of ResponseInfo`

      - `code: number`

      - `message: string`

      - `documentation_url: optional string`

      - `source: optional object { pointer }`

    - `result: optional array of AuditLog`

      - `id: optional string`

        A string that uniquely identifies the audit log.

      - `action: optional object { result, type }`

        - `result: optional boolean`

          A boolean that indicates if the action attempted was successful.

        - `type: optional string`

          A short string that describes the action that was performed.

      - `actor: optional object { id, email, ip, type }`

        - `id: optional string`

          The ID of the actor that performed the action. If a user performed the action, this will be their User ID.

        - `email: optional string`

          The email of the user that performed the action.

        - `ip: optional string`

          The IP address of the request that performed the action.

        - `type: optional "user" or "admin" or "Cloudflare"`

          The type of actor, whether a User, Cloudflare Admin, or an Automated System.

          - `"user"`

          - `"admin"`

          - `"Cloudflare"`

      - `interface: optional string`

        The source of the event.

      - `metadata: optional unknown`

        An object which can lend more context to the action being logged. This is a flexible value and varies between different actions.

      - `newValue: optional string`

        The new value of the resource that was modified.

      - `oldValue: optional string`

        The value of the resource before it was modified.

      - `owner: optional object { id }`

        - `id: optional string`

          Identifier

      - `resource: optional object { id, type }`

        - `id: optional string`

          An identifier for the resource that was affected by the action.

        - `type: optional string`

          A short string that describes the resource that was affected by the action.

      - `when: optional string`

        A UTC RFC3339 timestamp that specifies when the action being logged occured.

    - `success: optional boolean`

  - `AaaAPIResponseCommon object { errors, messages, success }`

    - `errors: array of ResponseInfo`

      - `code: number`

      - `message: string`

      - `documentation_url: optional string`

      - `source: optional object { pointer }`

    - `messages: array of ResponseInfo`

      - `code: number`

      - `message: string`

      - `documentation_url: optional string`

      - `source: optional object { pointer }`

    - `success: true`

      Whether the API call was successful

      - `true`

### Role

- `Role object { id, description, name, permissions }`

  - `id: string`

    Role identifier tag.

  - `description: string`

    Description of role's permissions.

  - `name: string`

    Role name.

  - `permissions: object { analytics, billing, cache_purge, 9 more }`

    - `analytics: optional PermissionGrant`

      - `read: optional boolean`

      - `write: optional boolean`

    - `billing: optional PermissionGrant`

    - `cache_purge: optional PermissionGrant`

    - `dns: optional PermissionGrant`

    - `dns_records: optional PermissionGrant`

    - `lb: optional PermissionGrant`

    - `logs: optional PermissionGrant`

    - `organization: optional PermissionGrant`

    - `ssl: optional PermissionGrant`

    - `waf: optional PermissionGrant`

    - `zone_settings: optional PermissionGrant`

    - `zones: optional PermissionGrant`

### Sort Direction

- `SortDirection = "asc" or "desc"`

  Direction to order DNS records in.

  - `"asc"`

  - `"desc"`

### Subscription

- `Subscription object { id, currency, current_period_end, 5 more }`

  - `id: optional string`

    Subscription identifier tag.

  - `currency: optional string`

    The monetary unit in which pricing information is displayed.

  - `current_period_end: optional string`

    The end of the current period and also when the next billing is due.

  - `current_period_start: optional string`

    When the current billing period started. May match initial_period_start if this is the first period.

  - `frequency: optional "weekly" or "monthly" or "quarterly" or "yearly"`

    How often the subscription is renewed automatically.

    - `"weekly"`

    - `"monthly"`

    - `"quarterly"`

    - `"yearly"`

  - `price: optional number`

    The price of the subscription that will be billed, in US dollars.

  - `rate_plan: optional RatePlan`

    The rate plan applied to the subscription.

    - `id: optional "free" or "lite" or "pro" or 7 more`

      The ID of the rate plan.

      - `"free"`

      - `"lite"`

      - `"pro"`

      - `"pro_plus"`

      - `"business"`

      - `"enterprise"`

      - `"partners_free"`

      - `"partners_pro"`

      - `"partners_business"`

      - `"partners_enterprise"`

    - `currency: optional string`

      The currency applied to the rate plan subscription.

    - `externally_managed: optional boolean`

      Whether this rate plan is managed externally from Cloudflare.

    - `is_contract: optional boolean`

      Whether a rate plan is enterprise-based (or newly adopted term contract).

    - `public_name: optional string`

      The full name of the rate plan.

    - `scope: optional string`

      The scope that this rate plan applies to.

    - `sets: optional array of string`

      The list of sets this rate plan applies to. Returns array of strings.

  - `state: optional "Trial" or "Provisioned" or "Paid" or 4 more`

    The state that the subscription is in.

    - `"Trial"`

    - `"Provisioned"`

    - `"Paid"`

    - `"AwaitingPayment"`

    - `"Cancelled"`

    - `"Failed"`

    - `"Expired"`

### Subscription Component

- `SubscriptionComponent object { default, name, price, value }`

  A component value for a subscription.

  - `default: optional number`

    The default amount assigned.

  - `name: optional string`

    The name of the component value.

  - `price: optional number`

    The unit price for the component value.

  - `value: optional number`

    The amount of the component value assigned.

### Subscription Zone

- `SubscriptionZone object { id, name }`

  A simple zone object. May have null properties if not a zone subscription.

  - `id: optional string`

    Identifier

  - `name: optional string`

    The domain name

### Token

- `Token object { id, condition, expires_on, 7 more }`

  - `id: optional string`

    Token identifier tag.

  - `condition: optional object { request_ip }`

    - `request_ip: optional object { in, not_in }`

      Client IP restrictions.

      - `in: optional array of TokenConditionCIDRList`

        List of IPv4/IPv6 CIDR addresses.

      - `not_in: optional array of TokenConditionCIDRList`

        List of IPv4/IPv6 CIDR addresses.

  - `expires_on: optional string`

    The expiration time on or after which the JWT MUST NOT be accepted for processing.

  - `issued_on: optional string`

    The time on which the token was created.

  - `last_used_on: optional string`

    Last time the token was used.

  - `modified_on: optional string`

    Last time the token was modified.

  - `name: optional string`

    Token name.

  - `not_before: optional string`

    The time before which the token MUST NOT be accepted for processing.

  - `policies: optional array of TokenPolicy`

    List of access policies assigned to the token.

    - `id: string`

      Policy identifier.

    - `effect: "allow" or "deny"`

      Allow or deny operations against the resources.

      - `"allow"`

      - `"deny"`

    - `permission_groups: array of object { id, meta, name }`

      A set of permission groups that are specified to the policy.

      - `id: string`

        Identifier of the permission group.

      - `meta: optional object { key, value }`

        Attributes associated to the permission group.

        - `key: optional string`

        - `value: optional string`

      - `name: optional string`

        Name of the permission group.

    - `resources: map[string] or map[map[string]]`

      A list of resource names that the policy applies to.

      - `IAMResourcesTypeObjectString = map[string]`

        Map of simple string resource permissions

      - `IAMResourcesTypeObjectNested = map[map[string]]`

        Map of nested resource permissions

  - `status: optional "active" or "disabled" or "expired"`

    Status of the token.

    - `"active"`

    - `"disabled"`

    - `"expired"`

### Token Condition CIDR List

- `TokenConditionCIDRList = string`

  IPv4/IPv6 CIDR.

### Token Policy

- `TokenPolicy object { id, effect, permission_groups, resources }`

  - `id: string`

    Policy identifier.

  - `effect: "allow" or "deny"`

    Allow or deny operations against the resources.

    - `"allow"`

    - `"deny"`

  - `permission_groups: array of object { id, meta, name }`

    A set of permission groups that are specified to the policy.

    - `id: string`

      Identifier of the permission group.

    - `meta: optional object { key, value }`

      Attributes associated to the permission group.

      - `key: optional string`

      - `value: optional string`

    - `name: optional string`

      Name of the permission group.

  - `resources: map[string] or map[map[string]]`

    A list of resource names that the policy applies to.

    - `IAMResourcesTypeObjectString = map[string]`

      Map of simple string resource permissions

    - `IAMResourcesTypeObjectNested = map[map[string]]`

      Map of nested resource permissions

### Token Value

- `TokenValue = string`

  The token value.

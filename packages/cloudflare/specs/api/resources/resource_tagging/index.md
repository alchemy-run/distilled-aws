# Resource Tagging

## List tagged resources

**get** `/accounts/{account_id}/tags/resources`

Lists all tagged resources for an account.

### Path Parameters

- `account_id: string`

  Identifier.

### Query Parameters

- `cursor: optional string`

  Cursor for pagination.

- `tag: optional array of string`

  Filter resources by tag criteria. This parameter can be repeated multiple times, with AND logic between parameters.

  Supported syntax:

  - **Key-only**: `tag=<key>` - Resource must have the tag key (e.g., `tag=production`)
  - **Key-value**: `tag=<key>=<value>` - Resource must have the tag with specific value (e.g., `tag=env=prod`)
  - **Multiple values (OR)**: `tag=<key>=<v1>,<v2>` - Resource must have tag with any of the values (e.g., `tag=env=prod,staging`)
  - **Negate key-only**: `tag=!<key>` - Resource must not have the tag key (e.g., `tag=!archived`)
  - **Negate key-value**: `tag=<key>!=<value>` - Resource must not have the tag with specific value (e.g., `tag=region!=us-west-1`)

  Multiple tag parameters are combined with AND logic.

- `type: optional array of "access_application" or "access_application_policy" or "access_group" or 24 more`

  Filter by resource type. Can be repeated to filter by multiple types (OR logic). Example: ?type=zone&type=worker

  - `"access_application"`

  - `"access_application_policy"`

  - `"access_group"`

  - `"account"`

  - `"ai_gateway"`

  - `"alerting_policy"`

  - `"alerting_webhook"`

  - `"api_gateway_operation"`

  - `"cloudflared_tunnel"`

  - `"custom_certificate"`

  - `"custom_hostname"`

  - `"d1_database"`

  - `"dns_record"`

  - `"durable_object_namespace"`

  - `"gateway_list"`

  - `"gateway_rule"`

  - `"image"`

  - `"kv_namespace"`

  - `"managed_client_certificate"`

  - `"queue"`

  - `"r2_bucket"`

  - `"resource_share"`

  - `"stream_live_input"`

  - `"stream_video"`

  - `"worker"`

  - `"worker_version"`

  - `"zone"`

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

- `result: optional array of object { id, etag, name, 2 more }  or object { id, access_application_id, etag, 4 more }  or object { id, etag, name, 2 more }  or 24 more`

  - `AccessApplication object { id, etag, name, 2 more }`

    Response for access_application resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "access_application"`

      - `"access_application"`

  - `AccessApplicationPolicy object { id, access_application_id, etag, 4 more }`

    Response for access_application_policy resources

    - `id: string`

      Identifies the unique resource.

    - `access_application_id: string`

      Access application ID is required only for access_application_policy resources

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "access_application_policy"`

      - `"access_application_policy"`

    - `zone_id: string`

      Zone ID is required only for zone-level resources

  - `AccessGroup object { id, etag, name, 2 more }`

    Response for access_group resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "access_group"`

      - `"access_group"`

  - `Account object { id, etag, name, 2 more }`

    Response for account resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "account"`

      - `"account"`

  - `AIGateway object { id, etag, name, 2 more }`

    Response for ai_gateway resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "ai_gateway"`

      - `"ai_gateway"`

  - `AlertingPolicy object { id, etag, name, 2 more }`

    Response for alerting_policy resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "alerting_policy"`

      - `"alerting_policy"`

  - `AlertingWebhook object { id, etag, name, 2 more }`

    Response for alerting_webhook resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "alerting_webhook"`

      - `"alerting_webhook"`

  - `APIGatewayOperation object { id, etag, name, 3 more }`

    Response for api_gateway_operation resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "api_gateway_operation"`

      - `"api_gateway_operation"`

    - `zone_id: string`

      Zone ID is required only for zone-level resources

  - `CloudflaredTunnel object { id, etag, name, 2 more }`

    Response for cloudflared_tunnel resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "cloudflared_tunnel"`

      - `"cloudflared_tunnel"`

  - `CustomCertificate object { id, etag, name, 3 more }`

    Response for custom_certificate resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "custom_certificate"`

      - `"custom_certificate"`

    - `zone_id: string`

      Zone ID is required only for zone-level resources

  - `CustomHostname object { id, etag, name, 3 more }`

    Response for custom_hostname resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "custom_hostname"`

      - `"custom_hostname"`

    - `zone_id: string`

      Zone ID is required only for zone-level resources

  - `D1Database object { id, etag, name, 2 more }`

    Response for d1_database resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "d1_database"`

      - `"d1_database"`

  - `DNSRecord object { id, etag, name, 3 more }`

    Response for dns_record resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "dns_record"`

      - `"dns_record"`

    - `zone_id: string`

      Zone ID is required only for zone-level resources

  - `DurableObjectNamespace object { id, etag, name, 2 more }`

    Response for durable_object_namespace resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "durable_object_namespace"`

      - `"durable_object_namespace"`

  - `GatewayList object { id, etag, name, 2 more }`

    Response for gateway_list resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "gateway_list"`

      - `"gateway_list"`

  - `GatewayRule object { id, etag, name, 2 more }`

    Response for gateway_rule resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "gateway_rule"`

      - `"gateway_rule"`

  - `Image object { id, etag, name, 2 more }`

    Response for image resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "image"`

      - `"image"`

  - `KVNamespace object { id, etag, name, 2 more }`

    Response for kv_namespace resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "kv_namespace"`

      - `"kv_namespace"`

  - `ManagedClientCertificate object { id, etag, name, 3 more }`

    Response for managed_client_certificate resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "managed_client_certificate"`

      - `"managed_client_certificate"`

    - `zone_id: string`

      Zone ID is required only for zone-level resources

  - `Queue object { id, etag, name, 2 more }`

    Response for queue resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "queue"`

      - `"queue"`

  - `R2Bucket object { id, etag, name, 2 more }`

    Response for r2_bucket resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "r2_bucket"`

      - `"r2_bucket"`

  - `ResourceShare object { id, etag, name, 2 more }`

    Response for resource_share resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "resource_share"`

      - `"resource_share"`

  - `StreamLiveInput object { id, etag, name, 2 more }`

    Response for stream_live_input resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "stream_live_input"`

      - `"stream_live_input"`

  - `StreamVideo object { id, etag, name, 2 more }`

    Response for stream_video resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "stream_video"`

      - `"stream_video"`

  - `Worker object { id, etag, name, 2 more }`

    Response for worker resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "worker"`

      - `"worker"`

  - `WorkerVersion object { id, etag, name, 3 more }`

    Response for worker_version resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "worker_version"`

      - `"worker_version"`

    - `worker_id: string`

      Worker ID is required only for worker_version resources

  - `Zone object { id, etag, name, 3 more }`

    Response for zone resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "zone"`

      - `"zone"`

    - `zone_id: string`

      Zone ID is required only for zone-level resources

- `result_info: optional object { count, cursor }`

  - `count: optional number`

    Indicates the number of results returned in the current page.

  - `cursor: optional string`

    Provides a cursor for the next page of results. Include this value in the next request to continue pagination.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/tags/resources \
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
  "success": true,
  "result": [
    {
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "etag": "v1:RBNvo1WzZ4oRRq0W9-hkng",
      "name": "my-worker-script",
      "tags": {
        "environment": "production",
        "team": "engineering"
      },
      "type": "access_application"
    }
  ],
  "result_info": {
    "count": 20,
    "cursor": "eyJhY2NvdW50X2lkIjoxMjM0NTY3ODkwfQ"
  }
}
```

## Domain Types

### Resource Tagging List Response

- `ResourceTaggingListResponse = object { id, etag, name, 2 more }  or object { id, access_application_id, etag, 4 more }  or object { id, etag, name, 2 more }  or 24 more`

  Response for access_application resources

  - `AccessApplication object { id, etag, name, 2 more }`

    Response for access_application resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "access_application"`

      - `"access_application"`

  - `AccessApplicationPolicy object { id, access_application_id, etag, 4 more }`

    Response for access_application_policy resources

    - `id: string`

      Identifies the unique resource.

    - `access_application_id: string`

      Access application ID is required only for access_application_policy resources

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "access_application_policy"`

      - `"access_application_policy"`

    - `zone_id: string`

      Zone ID is required only for zone-level resources

  - `AccessGroup object { id, etag, name, 2 more }`

    Response for access_group resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "access_group"`

      - `"access_group"`

  - `Account object { id, etag, name, 2 more }`

    Response for account resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "account"`

      - `"account"`

  - `AIGateway object { id, etag, name, 2 more }`

    Response for ai_gateway resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "ai_gateway"`

      - `"ai_gateway"`

  - `AlertingPolicy object { id, etag, name, 2 more }`

    Response for alerting_policy resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "alerting_policy"`

      - `"alerting_policy"`

  - `AlertingWebhook object { id, etag, name, 2 more }`

    Response for alerting_webhook resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "alerting_webhook"`

      - `"alerting_webhook"`

  - `APIGatewayOperation object { id, etag, name, 3 more }`

    Response for api_gateway_operation resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "api_gateway_operation"`

      - `"api_gateway_operation"`

    - `zone_id: string`

      Zone ID is required only for zone-level resources

  - `CloudflaredTunnel object { id, etag, name, 2 more }`

    Response for cloudflared_tunnel resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "cloudflared_tunnel"`

      - `"cloudflared_tunnel"`

  - `CustomCertificate object { id, etag, name, 3 more }`

    Response for custom_certificate resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "custom_certificate"`

      - `"custom_certificate"`

    - `zone_id: string`

      Zone ID is required only for zone-level resources

  - `CustomHostname object { id, etag, name, 3 more }`

    Response for custom_hostname resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "custom_hostname"`

      - `"custom_hostname"`

    - `zone_id: string`

      Zone ID is required only for zone-level resources

  - `D1Database object { id, etag, name, 2 more }`

    Response for d1_database resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "d1_database"`

      - `"d1_database"`

  - `DNSRecord object { id, etag, name, 3 more }`

    Response for dns_record resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "dns_record"`

      - `"dns_record"`

    - `zone_id: string`

      Zone ID is required only for zone-level resources

  - `DurableObjectNamespace object { id, etag, name, 2 more }`

    Response for durable_object_namespace resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "durable_object_namespace"`

      - `"durable_object_namespace"`

  - `GatewayList object { id, etag, name, 2 more }`

    Response for gateway_list resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "gateway_list"`

      - `"gateway_list"`

  - `GatewayRule object { id, etag, name, 2 more }`

    Response for gateway_rule resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "gateway_rule"`

      - `"gateway_rule"`

  - `Image object { id, etag, name, 2 more }`

    Response for image resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "image"`

      - `"image"`

  - `KVNamespace object { id, etag, name, 2 more }`

    Response for kv_namespace resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "kv_namespace"`

      - `"kv_namespace"`

  - `ManagedClientCertificate object { id, etag, name, 3 more }`

    Response for managed_client_certificate resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "managed_client_certificate"`

      - `"managed_client_certificate"`

    - `zone_id: string`

      Zone ID is required only for zone-level resources

  - `Queue object { id, etag, name, 2 more }`

    Response for queue resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "queue"`

      - `"queue"`

  - `R2Bucket object { id, etag, name, 2 more }`

    Response for r2_bucket resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "r2_bucket"`

      - `"r2_bucket"`

  - `ResourceShare object { id, etag, name, 2 more }`

    Response for resource_share resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "resource_share"`

      - `"resource_share"`

  - `StreamLiveInput object { id, etag, name, 2 more }`

    Response for stream_live_input resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "stream_live_input"`

      - `"stream_live_input"`

  - `StreamVideo object { id, etag, name, 2 more }`

    Response for stream_video resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "stream_video"`

      - `"stream_video"`

  - `Worker object { id, etag, name, 2 more }`

    Response for worker resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "worker"`

      - `"worker"`

  - `WorkerVersion object { id, etag, name, 3 more }`

    Response for worker_version resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "worker_version"`

      - `"worker_version"`

    - `worker_id: string`

      Worker ID is required only for worker_version resources

  - `Zone object { id, etag, name, 3 more }`

    Response for zone resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "zone"`

      - `"zone"`

    - `zone_id: string`

      Zone ID is required only for zone-level resources

# Account Tags

## Get tags for an account-level resource

**get** `/accounts/{account_id}/tags`

Retrieves tags for a specific account-level resource.

### Path Parameters

- `account_id: string`

  Identifier.

### Query Parameters

- `resource_id: string`

  The ID of the resource to retrieve tags for.

- `resource_type: "access_application" or "access_group" or "account" or 17 more`

  The type of the resource.

  - `"access_application"`

  - `"access_group"`

  - `"account"`

  - `"ai_gateway"`

  - `"alerting_policy"`

  - `"alerting_webhook"`

  - `"cloudflared_tunnel"`

  - `"d1_database"`

  - `"durable_object_namespace"`

  - `"gateway_list"`

  - `"gateway_rule"`

  - `"image"`

  - `"kv_namespace"`

  - `"queue"`

  - `"r2_bucket"`

  - `"resource_share"`

  - `"stream_live_input"`

  - `"stream_video"`

  - `"worker"`

  - `"worker_version"`

- `worker_id: optional string`

  Worker identifier. Required for worker_version resources.

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

- `result: optional object { id, etag, name, 2 more }  or object { id, access_application_id, etag, 4 more }  or object { id, etag, name, 2 more }  or 24 more`

  Response for access_application resources

  - `AccessApplication object { id, etag, name, 2 more }`

    Response for access_application resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "access_application"`

      - `"access_application"`

  - `AccessApplicationPolicy object { id, access_application_id, etag, 4 more }`

    Response for access_application_policy resources

    - `id: string`

      Identifies the unique resource.

    - `access_application_id: string`

      Access application ID is required only for access_application_policy resources

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "access_application_policy"`

      - `"access_application_policy"`

    - `zone_id: string`

      Zone ID is required only for zone-level resources

  - `AccessGroup object { id, etag, name, 2 more }`

    Response for access_group resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "access_group"`

      - `"access_group"`

  - `Account object { id, etag, name, 2 more }`

    Response for account resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "account"`

      - `"account"`

  - `AIGateway object { id, etag, name, 2 more }`

    Response for ai_gateway resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "ai_gateway"`

      - `"ai_gateway"`

  - `AlertingPolicy object { id, etag, name, 2 more }`

    Response for alerting_policy resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "alerting_policy"`

      - `"alerting_policy"`

  - `AlertingWebhook object { id, etag, name, 2 more }`

    Response for alerting_webhook resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "alerting_webhook"`

      - `"alerting_webhook"`

  - `APIGatewayOperation object { id, etag, name, 3 more }`

    Response for api_gateway_operation resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "api_gateway_operation"`

      - `"api_gateway_operation"`

    - `zone_id: string`

      Zone ID is required only for zone-level resources

  - `CloudflaredTunnel object { id, etag, name, 2 more }`

    Response for cloudflared_tunnel resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "cloudflared_tunnel"`

      - `"cloudflared_tunnel"`

  - `CustomCertificate object { id, etag, name, 3 more }`

    Response for custom_certificate resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "custom_certificate"`

      - `"custom_certificate"`

    - `zone_id: string`

      Zone ID is required only for zone-level resources

  - `CustomHostname object { id, etag, name, 3 more }`

    Response for custom_hostname resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "custom_hostname"`

      - `"custom_hostname"`

    - `zone_id: string`

      Zone ID is required only for zone-level resources

  - `D1Database object { id, etag, name, 2 more }`

    Response for d1_database resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "d1_database"`

      - `"d1_database"`

  - `DNSRecord object { id, etag, name, 3 more }`

    Response for dns_record resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "dns_record"`

      - `"dns_record"`

    - `zone_id: string`

      Zone ID is required only for zone-level resources

  - `DurableObjectNamespace object { id, etag, name, 2 more }`

    Response for durable_object_namespace resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "durable_object_namespace"`

      - `"durable_object_namespace"`

  - `GatewayList object { id, etag, name, 2 more }`

    Response for gateway_list resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "gateway_list"`

      - `"gateway_list"`

  - `GatewayRule object { id, etag, name, 2 more }`

    Response for gateway_rule resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "gateway_rule"`

      - `"gateway_rule"`

  - `Image object { id, etag, name, 2 more }`

    Response for image resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "image"`

      - `"image"`

  - `KVNamespace object { id, etag, name, 2 more }`

    Response for kv_namespace resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "kv_namespace"`

      - `"kv_namespace"`

  - `ManagedClientCertificate object { id, etag, name, 3 more }`

    Response for managed_client_certificate resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "managed_client_certificate"`

      - `"managed_client_certificate"`

    - `zone_id: string`

      Zone ID is required only for zone-level resources

  - `Queue object { id, etag, name, 2 more }`

    Response for queue resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "queue"`

      - `"queue"`

  - `R2Bucket object { id, etag, name, 2 more }`

    Response for r2_bucket resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "r2_bucket"`

      - `"r2_bucket"`

  - `ResourceShare object { id, etag, name, 2 more }`

    Response for resource_share resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "resource_share"`

      - `"resource_share"`

  - `StreamLiveInput object { id, etag, name, 2 more }`

    Response for stream_live_input resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "stream_live_input"`

      - `"stream_live_input"`

  - `StreamVideo object { id, etag, name, 2 more }`

    Response for stream_video resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "stream_video"`

      - `"stream_video"`

  - `Worker object { id, etag, name, 2 more }`

    Response for worker resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "worker"`

      - `"worker"`

  - `WorkerVersion object { id, etag, name, 3 more }`

    Response for worker_version resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "worker_version"`

      - `"worker_version"`

    - `worker_id: string`

      Worker ID is required only for worker_version resources

  - `Zone object { id, etag, name, 3 more }`

    Response for zone resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "zone"`

      - `"zone"`

    - `zone_id: string`

      Zone ID is required only for zone-level resources

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/tags \
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
  "success": true,
  "result": {
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "etag": "v1:RBNvo1WzZ4oRRq0W9-hkng",
    "name": "my-worker-script",
    "tags": {
      "environment": "production",
      "team": "engineering"
    },
    "type": "access_application"
  }
}
```

## Set tags for an account-level resource

**put** `/accounts/{account_id}/tags`

Creates or updates tags for a specific account-level resource.

### Path Parameters

- `account_id: string`

  Identifier.

### Header Parameters

- `"If-Match": optional string`

### Body Parameters

- `body: object { resource_id, resource_type, worker_id, tags }  or object { resource_id, resource_type, tags }`

  Request body schema for setting tags on account-level resources.

  - `ResourceTaggingSetTagsRequestAccountLevelWorkerVersion object { resource_id, resource_type, worker_id, tags }`

    Request body schema for deleting tags from account-level resources.

    - `resource_id: string`

      Identifies the unique resource.

    - `resource_type: "access_application" or "access_group" or "account" or 17 more`

      Enum for base account-level resource types (those with no extra required fields).

      - `"access_application"`

      - `"access_group"`

      - `"account"`

      - `"ai_gateway"`

      - `"alerting_policy"`

      - `"alerting_webhook"`

      - `"cloudflared_tunnel"`

      - `"d1_database"`

      - `"durable_object_namespace"`

      - `"gateway_list"`

      - `"gateway_rule"`

      - `"image"`

      - `"kv_namespace"`

      - `"queue"`

      - `"r2_bucket"`

      - `"resource_share"`

      - `"stream_live_input"`

      - `"stream_video"`

      - `"worker"`

      - `"worker_version"`

    - `worker_id: string`

      Worker ID is required only for worker_version resources

    - `tags: optional map[string]`

      Contains key-value pairs of tags.

  - `ResourceTaggingSetTagsRequestAccountLevelBase object { resource_id, resource_type, tags }`

    Request body schema for deleting tags from account-level resources.

    - `resource_id: string`

      Identifies the unique resource.

    - `resource_type: "access_application" or "access_group" or "account" or 16 more`

      Enum for base account-level resource types (those with no extra required fields).

      - `"access_application"`

      - `"access_group"`

      - `"account"`

      - `"ai_gateway"`

      - `"alerting_policy"`

      - `"alerting_webhook"`

      - `"cloudflared_tunnel"`

      - `"d1_database"`

      - `"durable_object_namespace"`

      - `"gateway_list"`

      - `"gateway_rule"`

      - `"image"`

      - `"kv_namespace"`

      - `"queue"`

      - `"r2_bucket"`

      - `"resource_share"`

      - `"stream_live_input"`

      - `"stream_video"`

      - `"worker"`

    - `tags: optional map[string]`

      Contains key-value pairs of tags.

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

- `result: optional object { id, etag, name, 2 more }  or object { id, access_application_id, etag, 4 more }  or object { id, etag, name, 2 more }  or 24 more`

  Response for access_application resources

  - `AccessApplication object { id, etag, name, 2 more }`

    Response for access_application resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "access_application"`

      - `"access_application"`

  - `AccessApplicationPolicy object { id, access_application_id, etag, 4 more }`

    Response for access_application_policy resources

    - `id: string`

      Identifies the unique resource.

    - `access_application_id: string`

      Access application ID is required only for access_application_policy resources

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "access_application_policy"`

      - `"access_application_policy"`

    - `zone_id: string`

      Zone ID is required only for zone-level resources

  - `AccessGroup object { id, etag, name, 2 more }`

    Response for access_group resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "access_group"`

      - `"access_group"`

  - `Account object { id, etag, name, 2 more }`

    Response for account resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "account"`

      - `"account"`

  - `AIGateway object { id, etag, name, 2 more }`

    Response for ai_gateway resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "ai_gateway"`

      - `"ai_gateway"`

  - `AlertingPolicy object { id, etag, name, 2 more }`

    Response for alerting_policy resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "alerting_policy"`

      - `"alerting_policy"`

  - `AlertingWebhook object { id, etag, name, 2 more }`

    Response for alerting_webhook resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "alerting_webhook"`

      - `"alerting_webhook"`

  - `APIGatewayOperation object { id, etag, name, 3 more }`

    Response for api_gateway_operation resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "api_gateway_operation"`

      - `"api_gateway_operation"`

    - `zone_id: string`

      Zone ID is required only for zone-level resources

  - `CloudflaredTunnel object { id, etag, name, 2 more }`

    Response for cloudflared_tunnel resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "cloudflared_tunnel"`

      - `"cloudflared_tunnel"`

  - `CustomCertificate object { id, etag, name, 3 more }`

    Response for custom_certificate resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "custom_certificate"`

      - `"custom_certificate"`

    - `zone_id: string`

      Zone ID is required only for zone-level resources

  - `CustomHostname object { id, etag, name, 3 more }`

    Response for custom_hostname resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "custom_hostname"`

      - `"custom_hostname"`

    - `zone_id: string`

      Zone ID is required only for zone-level resources

  - `D1Database object { id, etag, name, 2 more }`

    Response for d1_database resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "d1_database"`

      - `"d1_database"`

  - `DNSRecord object { id, etag, name, 3 more }`

    Response for dns_record resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "dns_record"`

      - `"dns_record"`

    - `zone_id: string`

      Zone ID is required only for zone-level resources

  - `DurableObjectNamespace object { id, etag, name, 2 more }`

    Response for durable_object_namespace resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "durable_object_namespace"`

      - `"durable_object_namespace"`

  - `GatewayList object { id, etag, name, 2 more }`

    Response for gateway_list resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "gateway_list"`

      - `"gateway_list"`

  - `GatewayRule object { id, etag, name, 2 more }`

    Response for gateway_rule resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "gateway_rule"`

      - `"gateway_rule"`

  - `Image object { id, etag, name, 2 more }`

    Response for image resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "image"`

      - `"image"`

  - `KVNamespace object { id, etag, name, 2 more }`

    Response for kv_namespace resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "kv_namespace"`

      - `"kv_namespace"`

  - `ManagedClientCertificate object { id, etag, name, 3 more }`

    Response for managed_client_certificate resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "managed_client_certificate"`

      - `"managed_client_certificate"`

    - `zone_id: string`

      Zone ID is required only for zone-level resources

  - `Queue object { id, etag, name, 2 more }`

    Response for queue resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "queue"`

      - `"queue"`

  - `R2Bucket object { id, etag, name, 2 more }`

    Response for r2_bucket resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "r2_bucket"`

      - `"r2_bucket"`

  - `ResourceShare object { id, etag, name, 2 more }`

    Response for resource_share resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "resource_share"`

      - `"resource_share"`

  - `StreamLiveInput object { id, etag, name, 2 more }`

    Response for stream_live_input resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "stream_live_input"`

      - `"stream_live_input"`

  - `StreamVideo object { id, etag, name, 2 more }`

    Response for stream_video resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "stream_video"`

      - `"stream_video"`

  - `Worker object { id, etag, name, 2 more }`

    Response for worker resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "worker"`

      - `"worker"`

  - `WorkerVersion object { id, etag, name, 3 more }`

    Response for worker_version resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "worker_version"`

      - `"worker_version"`

    - `worker_id: string`

      Worker ID is required only for worker_version resources

  - `Zone object { id, etag, name, 3 more }`

    Response for zone resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "zone"`

      - `"zone"`

    - `zone_id: string`

      Zone ID is required only for zone-level resources

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/tags \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "resource_id": "023e105f4ecef8ad9ca31a8372d0c353",
          "resource_type": "worker",
          "worker_id": "3f72a691-44b3-4c11-8642-c18a88ddaa5e",
          "tags": {
            "environment": "production",
            "team": "engineering"
          }
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
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "etag": "v1:RBNvo1WzZ4oRRq0W9-hkng",
    "name": "my-worker-script",
    "tags": {
      "environment": "production",
      "team": "engineering"
    },
    "type": "access_application"
  }
}
```

## Delete tags from an account-level resource

**delete** `/accounts/{account_id}/tags`

Removes all tags from a specific account-level resource.

### Path Parameters

- `account_id: string`

  Identifier.

### Header Parameters

- `"If-Match": optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/tags \
    -X DELETE \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
```

## Domain Types

### Account Tag Get Response

- `AccountTagGetResponse = object { id, etag, name, 2 more }  or object { id, access_application_id, etag, 4 more }  or object { id, etag, name, 2 more }  or 24 more`

  Response for access_application resources

  - `AccessApplication object { id, etag, name, 2 more }`

    Response for access_application resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "access_application"`

      - `"access_application"`

  - `AccessApplicationPolicy object { id, access_application_id, etag, 4 more }`

    Response for access_application_policy resources

    - `id: string`

      Identifies the unique resource.

    - `access_application_id: string`

      Access application ID is required only for access_application_policy resources

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "access_application_policy"`

      - `"access_application_policy"`

    - `zone_id: string`

      Zone ID is required only for zone-level resources

  - `AccessGroup object { id, etag, name, 2 more }`

    Response for access_group resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "access_group"`

      - `"access_group"`

  - `Account object { id, etag, name, 2 more }`

    Response for account resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "account"`

      - `"account"`

  - `AIGateway object { id, etag, name, 2 more }`

    Response for ai_gateway resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "ai_gateway"`

      - `"ai_gateway"`

  - `AlertingPolicy object { id, etag, name, 2 more }`

    Response for alerting_policy resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "alerting_policy"`

      - `"alerting_policy"`

  - `AlertingWebhook object { id, etag, name, 2 more }`

    Response for alerting_webhook resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "alerting_webhook"`

      - `"alerting_webhook"`

  - `APIGatewayOperation object { id, etag, name, 3 more }`

    Response for api_gateway_operation resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "api_gateway_operation"`

      - `"api_gateway_operation"`

    - `zone_id: string`

      Zone ID is required only for zone-level resources

  - `CloudflaredTunnel object { id, etag, name, 2 more }`

    Response for cloudflared_tunnel resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "cloudflared_tunnel"`

      - `"cloudflared_tunnel"`

  - `CustomCertificate object { id, etag, name, 3 more }`

    Response for custom_certificate resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "custom_certificate"`

      - `"custom_certificate"`

    - `zone_id: string`

      Zone ID is required only for zone-level resources

  - `CustomHostname object { id, etag, name, 3 more }`

    Response for custom_hostname resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "custom_hostname"`

      - `"custom_hostname"`

    - `zone_id: string`

      Zone ID is required only for zone-level resources

  - `D1Database object { id, etag, name, 2 more }`

    Response for d1_database resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "d1_database"`

      - `"d1_database"`

  - `DNSRecord object { id, etag, name, 3 more }`

    Response for dns_record resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "dns_record"`

      - `"dns_record"`

    - `zone_id: string`

      Zone ID is required only for zone-level resources

  - `DurableObjectNamespace object { id, etag, name, 2 more }`

    Response for durable_object_namespace resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "durable_object_namespace"`

      - `"durable_object_namespace"`

  - `GatewayList object { id, etag, name, 2 more }`

    Response for gateway_list resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "gateway_list"`

      - `"gateway_list"`

  - `GatewayRule object { id, etag, name, 2 more }`

    Response for gateway_rule resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "gateway_rule"`

      - `"gateway_rule"`

  - `Image object { id, etag, name, 2 more }`

    Response for image resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "image"`

      - `"image"`

  - `KVNamespace object { id, etag, name, 2 more }`

    Response for kv_namespace resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "kv_namespace"`

      - `"kv_namespace"`

  - `ManagedClientCertificate object { id, etag, name, 3 more }`

    Response for managed_client_certificate resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "managed_client_certificate"`

      - `"managed_client_certificate"`

    - `zone_id: string`

      Zone ID is required only for zone-level resources

  - `Queue object { id, etag, name, 2 more }`

    Response for queue resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "queue"`

      - `"queue"`

  - `R2Bucket object { id, etag, name, 2 more }`

    Response for r2_bucket resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "r2_bucket"`

      - `"r2_bucket"`

  - `ResourceShare object { id, etag, name, 2 more }`

    Response for resource_share resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "resource_share"`

      - `"resource_share"`

  - `StreamLiveInput object { id, etag, name, 2 more }`

    Response for stream_live_input resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "stream_live_input"`

      - `"stream_live_input"`

  - `StreamVideo object { id, etag, name, 2 more }`

    Response for stream_video resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "stream_video"`

      - `"stream_video"`

  - `Worker object { id, etag, name, 2 more }`

    Response for worker resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "worker"`

      - `"worker"`

  - `WorkerVersion object { id, etag, name, 3 more }`

    Response for worker_version resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "worker_version"`

      - `"worker_version"`

    - `worker_id: string`

      Worker ID is required only for worker_version resources

  - `Zone object { id, etag, name, 3 more }`

    Response for zone resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "zone"`

      - `"zone"`

    - `zone_id: string`

      Zone ID is required only for zone-level resources

### Account Tag Update Response

- `AccountTagUpdateResponse = object { id, etag, name, 2 more }  or object { id, access_application_id, etag, 4 more }  or object { id, etag, name, 2 more }  or 24 more`

  Response for access_application resources

  - `AccessApplication object { id, etag, name, 2 more }`

    Response for access_application resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "access_application"`

      - `"access_application"`

  - `AccessApplicationPolicy object { id, access_application_id, etag, 4 more }`

    Response for access_application_policy resources

    - `id: string`

      Identifies the unique resource.

    - `access_application_id: string`

      Access application ID is required only for access_application_policy resources

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "access_application_policy"`

      - `"access_application_policy"`

    - `zone_id: string`

      Zone ID is required only for zone-level resources

  - `AccessGroup object { id, etag, name, 2 more }`

    Response for access_group resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "access_group"`

      - `"access_group"`

  - `Account object { id, etag, name, 2 more }`

    Response for account resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "account"`

      - `"account"`

  - `AIGateway object { id, etag, name, 2 more }`

    Response for ai_gateway resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "ai_gateway"`

      - `"ai_gateway"`

  - `AlertingPolicy object { id, etag, name, 2 more }`

    Response for alerting_policy resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "alerting_policy"`

      - `"alerting_policy"`

  - `AlertingWebhook object { id, etag, name, 2 more }`

    Response for alerting_webhook resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "alerting_webhook"`

      - `"alerting_webhook"`

  - `APIGatewayOperation object { id, etag, name, 3 more }`

    Response for api_gateway_operation resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "api_gateway_operation"`

      - `"api_gateway_operation"`

    - `zone_id: string`

      Zone ID is required only for zone-level resources

  - `CloudflaredTunnel object { id, etag, name, 2 more }`

    Response for cloudflared_tunnel resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "cloudflared_tunnel"`

      - `"cloudflared_tunnel"`

  - `CustomCertificate object { id, etag, name, 3 more }`

    Response for custom_certificate resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "custom_certificate"`

      - `"custom_certificate"`

    - `zone_id: string`

      Zone ID is required only for zone-level resources

  - `CustomHostname object { id, etag, name, 3 more }`

    Response for custom_hostname resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "custom_hostname"`

      - `"custom_hostname"`

    - `zone_id: string`

      Zone ID is required only for zone-level resources

  - `D1Database object { id, etag, name, 2 more }`

    Response for d1_database resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "d1_database"`

      - `"d1_database"`

  - `DNSRecord object { id, etag, name, 3 more }`

    Response for dns_record resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "dns_record"`

      - `"dns_record"`

    - `zone_id: string`

      Zone ID is required only for zone-level resources

  - `DurableObjectNamespace object { id, etag, name, 2 more }`

    Response for durable_object_namespace resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "durable_object_namespace"`

      - `"durable_object_namespace"`

  - `GatewayList object { id, etag, name, 2 more }`

    Response for gateway_list resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "gateway_list"`

      - `"gateway_list"`

  - `GatewayRule object { id, etag, name, 2 more }`

    Response for gateway_rule resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "gateway_rule"`

      - `"gateway_rule"`

  - `Image object { id, etag, name, 2 more }`

    Response for image resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "image"`

      - `"image"`

  - `KVNamespace object { id, etag, name, 2 more }`

    Response for kv_namespace resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "kv_namespace"`

      - `"kv_namespace"`

  - `ManagedClientCertificate object { id, etag, name, 3 more }`

    Response for managed_client_certificate resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "managed_client_certificate"`

      - `"managed_client_certificate"`

    - `zone_id: string`

      Zone ID is required only for zone-level resources

  - `Queue object { id, etag, name, 2 more }`

    Response for queue resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "queue"`

      - `"queue"`

  - `R2Bucket object { id, etag, name, 2 more }`

    Response for r2_bucket resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "r2_bucket"`

      - `"r2_bucket"`

  - `ResourceShare object { id, etag, name, 2 more }`

    Response for resource_share resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "resource_share"`

      - `"resource_share"`

  - `StreamLiveInput object { id, etag, name, 2 more }`

    Response for stream_live_input resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "stream_live_input"`

      - `"stream_live_input"`

  - `StreamVideo object { id, etag, name, 2 more }`

    Response for stream_video resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "stream_video"`

      - `"stream_video"`

  - `Worker object { id, etag, name, 2 more }`

    Response for worker resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "worker"`

      - `"worker"`

  - `WorkerVersion object { id, etag, name, 3 more }`

    Response for worker_version resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "worker_version"`

      - `"worker_version"`

    - `worker_id: string`

      Worker ID is required only for worker_version resources

  - `Zone object { id, etag, name, 3 more }`

    Response for zone resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "zone"`

      - `"zone"`

    - `zone_id: string`

      Zone ID is required only for zone-level resources

# Zone Tags

## Get tags for a zone-level resource

**get** `/zones/{zone_id}/tags`

Retrieves tags for a specific zone-level resource.

### Path Parameters

- `zone_id: string`

  Zone ID is required only for zone-level resources

### Query Parameters

- `resource_id: string`

  The ID of the resource to retrieve tags for.

- `resource_type: "access_application_policy" or "api_gateway_operation" or "custom_certificate" or 4 more`

  The type of the resource.

  - `"access_application_policy"`

  - `"api_gateway_operation"`

  - `"custom_certificate"`

  - `"custom_hostname"`

  - `"dns_record"`

  - `"managed_client_certificate"`

  - `"zone"`

- `access_application_id: optional string`

  Access application ID identifier. Required for access_application_policy resources.

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

- `result: optional object { id, etag, name, 2 more }  or object { id, access_application_id, etag, 4 more }  or object { id, etag, name, 2 more }  or 24 more`

  Response for access_application resources

  - `AccessApplication object { id, etag, name, 2 more }`

    Response for access_application resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "access_application"`

      - `"access_application"`

  - `AccessApplicationPolicy object { id, access_application_id, etag, 4 more }`

    Response for access_application_policy resources

    - `id: string`

      Identifies the unique resource.

    - `access_application_id: string`

      Access application ID is required only for access_application_policy resources

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "access_application_policy"`

      - `"access_application_policy"`

    - `zone_id: string`

      Zone ID is required only for zone-level resources

  - `AccessGroup object { id, etag, name, 2 more }`

    Response for access_group resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "access_group"`

      - `"access_group"`

  - `Account object { id, etag, name, 2 more }`

    Response for account resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "account"`

      - `"account"`

  - `AIGateway object { id, etag, name, 2 more }`

    Response for ai_gateway resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "ai_gateway"`

      - `"ai_gateway"`

  - `AlertingPolicy object { id, etag, name, 2 more }`

    Response for alerting_policy resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "alerting_policy"`

      - `"alerting_policy"`

  - `AlertingWebhook object { id, etag, name, 2 more }`

    Response for alerting_webhook resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "alerting_webhook"`

      - `"alerting_webhook"`

  - `APIGatewayOperation object { id, etag, name, 3 more }`

    Response for api_gateway_operation resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "api_gateway_operation"`

      - `"api_gateway_operation"`

    - `zone_id: string`

      Zone ID is required only for zone-level resources

  - `CloudflaredTunnel object { id, etag, name, 2 more }`

    Response for cloudflared_tunnel resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "cloudflared_tunnel"`

      - `"cloudflared_tunnel"`

  - `CustomCertificate object { id, etag, name, 3 more }`

    Response for custom_certificate resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "custom_certificate"`

      - `"custom_certificate"`

    - `zone_id: string`

      Zone ID is required only for zone-level resources

  - `CustomHostname object { id, etag, name, 3 more }`

    Response for custom_hostname resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "custom_hostname"`

      - `"custom_hostname"`

    - `zone_id: string`

      Zone ID is required only for zone-level resources

  - `D1Database object { id, etag, name, 2 more }`

    Response for d1_database resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "d1_database"`

      - `"d1_database"`

  - `DNSRecord object { id, etag, name, 3 more }`

    Response for dns_record resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "dns_record"`

      - `"dns_record"`

    - `zone_id: string`

      Zone ID is required only for zone-level resources

  - `DurableObjectNamespace object { id, etag, name, 2 more }`

    Response for durable_object_namespace resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "durable_object_namespace"`

      - `"durable_object_namespace"`

  - `GatewayList object { id, etag, name, 2 more }`

    Response for gateway_list resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "gateway_list"`

      - `"gateway_list"`

  - `GatewayRule object { id, etag, name, 2 more }`

    Response for gateway_rule resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "gateway_rule"`

      - `"gateway_rule"`

  - `Image object { id, etag, name, 2 more }`

    Response for image resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "image"`

      - `"image"`

  - `KVNamespace object { id, etag, name, 2 more }`

    Response for kv_namespace resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "kv_namespace"`

      - `"kv_namespace"`

  - `ManagedClientCertificate object { id, etag, name, 3 more }`

    Response for managed_client_certificate resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "managed_client_certificate"`

      - `"managed_client_certificate"`

    - `zone_id: string`

      Zone ID is required only for zone-level resources

  - `Queue object { id, etag, name, 2 more }`

    Response for queue resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "queue"`

      - `"queue"`

  - `R2Bucket object { id, etag, name, 2 more }`

    Response for r2_bucket resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "r2_bucket"`

      - `"r2_bucket"`

  - `ResourceShare object { id, etag, name, 2 more }`

    Response for resource_share resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "resource_share"`

      - `"resource_share"`

  - `StreamLiveInput object { id, etag, name, 2 more }`

    Response for stream_live_input resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "stream_live_input"`

      - `"stream_live_input"`

  - `StreamVideo object { id, etag, name, 2 more }`

    Response for stream_video resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "stream_video"`

      - `"stream_video"`

  - `Worker object { id, etag, name, 2 more }`

    Response for worker resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "worker"`

      - `"worker"`

  - `WorkerVersion object { id, etag, name, 3 more }`

    Response for worker_version resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "worker_version"`

      - `"worker_version"`

    - `worker_id: string`

      Worker ID is required only for worker_version resources

  - `Zone object { id, etag, name, 3 more }`

    Response for zone resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "zone"`

      - `"zone"`

    - `zone_id: string`

      Zone ID is required only for zone-level resources

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/tags \
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
  "success": true,
  "result": {
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "etag": "v1:RBNvo1WzZ4oRRq0W9-hkng",
    "name": "my-worker-script",
    "tags": {
      "environment": "production",
      "team": "engineering"
    },
    "type": "access_application"
  }
}
```

## Set tags for a zone-level resource

**put** `/zones/{zone_id}/tags`

Creates or updates tags for a specific zone-level resource. Replaces all existing tags for the resource.

### Path Parameters

- `zone_id: string`

  Zone ID is required only for zone-level resources

### Header Parameters

- `"If-Match": optional string`

### Body Parameters

- `body: object { resource_id, resource_type, tags }  or object { access_application_id, resource_id, resource_type, tags }`

  Request body schema for setting tags on zone-level resources.

  - `ResourceTaggingSetTagsRequestZoneLevelBase object { resource_id, resource_type, tags }`

    Request body schema for deleting tags from zone-level resources. Zone ID comes from URL path.

    - `resource_id: string`

      Identifies the unique resource.

    - `resource_type: "api_gateway_operation" or "custom_certificate" or "custom_hostname" or 3 more`

      Enum for base zone-level resource types (those with no extra required fields).

      - `"api_gateway_operation"`

      - `"custom_certificate"`

      - `"custom_hostname"`

      - `"dns_record"`

      - `"managed_client_certificate"`

      - `"zone"`

    - `tags: optional map[string]`

      Contains key-value pairs of tags.

  - `ResourceTaggingSetTagsRequestZoneLevelAccessApplicationPolicy object { access_application_id, resource_id, resource_type, tags }`

    Request body schema for deleting tags from zone-level resources. Zone ID comes from URL path.

    - `access_application_id: string`

      Access application ID is required only for access_application_policy resources

    - `resource_id: string`

      Identifies the unique resource.

    - `resource_type: "api_gateway_operation" or "custom_certificate" or "custom_hostname" or 4 more`

      Enum for base zone-level resource types (those with no extra required fields).

      - `"api_gateway_operation"`

      - `"custom_certificate"`

      - `"custom_hostname"`

      - `"dns_record"`

      - `"managed_client_certificate"`

      - `"zone"`

      - `"access_application_policy"`

    - `tags: optional map[string]`

      Contains key-value pairs of tags.

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

- `result: optional object { id, etag, name, 2 more }  or object { id, access_application_id, etag, 4 more }  or object { id, etag, name, 2 more }  or 24 more`

  Response for access_application resources

  - `AccessApplication object { id, etag, name, 2 more }`

    Response for access_application resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "access_application"`

      - `"access_application"`

  - `AccessApplicationPolicy object { id, access_application_id, etag, 4 more }`

    Response for access_application_policy resources

    - `id: string`

      Identifies the unique resource.

    - `access_application_id: string`

      Access application ID is required only for access_application_policy resources

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "access_application_policy"`

      - `"access_application_policy"`

    - `zone_id: string`

      Zone ID is required only for zone-level resources

  - `AccessGroup object { id, etag, name, 2 more }`

    Response for access_group resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "access_group"`

      - `"access_group"`

  - `Account object { id, etag, name, 2 more }`

    Response for account resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "account"`

      - `"account"`

  - `AIGateway object { id, etag, name, 2 more }`

    Response for ai_gateway resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "ai_gateway"`

      - `"ai_gateway"`

  - `AlertingPolicy object { id, etag, name, 2 more }`

    Response for alerting_policy resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "alerting_policy"`

      - `"alerting_policy"`

  - `AlertingWebhook object { id, etag, name, 2 more }`

    Response for alerting_webhook resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "alerting_webhook"`

      - `"alerting_webhook"`

  - `APIGatewayOperation object { id, etag, name, 3 more }`

    Response for api_gateway_operation resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "api_gateway_operation"`

      - `"api_gateway_operation"`

    - `zone_id: string`

      Zone ID is required only for zone-level resources

  - `CloudflaredTunnel object { id, etag, name, 2 more }`

    Response for cloudflared_tunnel resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "cloudflared_tunnel"`

      - `"cloudflared_tunnel"`

  - `CustomCertificate object { id, etag, name, 3 more }`

    Response for custom_certificate resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "custom_certificate"`

      - `"custom_certificate"`

    - `zone_id: string`

      Zone ID is required only for zone-level resources

  - `CustomHostname object { id, etag, name, 3 more }`

    Response for custom_hostname resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "custom_hostname"`

      - `"custom_hostname"`

    - `zone_id: string`

      Zone ID is required only for zone-level resources

  - `D1Database object { id, etag, name, 2 more }`

    Response for d1_database resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "d1_database"`

      - `"d1_database"`

  - `DNSRecord object { id, etag, name, 3 more }`

    Response for dns_record resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "dns_record"`

      - `"dns_record"`

    - `zone_id: string`

      Zone ID is required only for zone-level resources

  - `DurableObjectNamespace object { id, etag, name, 2 more }`

    Response for durable_object_namespace resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "durable_object_namespace"`

      - `"durable_object_namespace"`

  - `GatewayList object { id, etag, name, 2 more }`

    Response for gateway_list resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "gateway_list"`

      - `"gateway_list"`

  - `GatewayRule object { id, etag, name, 2 more }`

    Response for gateway_rule resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "gateway_rule"`

      - `"gateway_rule"`

  - `Image object { id, etag, name, 2 more }`

    Response for image resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "image"`

      - `"image"`

  - `KVNamespace object { id, etag, name, 2 more }`

    Response for kv_namespace resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "kv_namespace"`

      - `"kv_namespace"`

  - `ManagedClientCertificate object { id, etag, name, 3 more }`

    Response for managed_client_certificate resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "managed_client_certificate"`

      - `"managed_client_certificate"`

    - `zone_id: string`

      Zone ID is required only for zone-level resources

  - `Queue object { id, etag, name, 2 more }`

    Response for queue resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "queue"`

      - `"queue"`

  - `R2Bucket object { id, etag, name, 2 more }`

    Response for r2_bucket resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "r2_bucket"`

      - `"r2_bucket"`

  - `ResourceShare object { id, etag, name, 2 more }`

    Response for resource_share resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "resource_share"`

      - `"resource_share"`

  - `StreamLiveInput object { id, etag, name, 2 more }`

    Response for stream_live_input resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "stream_live_input"`

      - `"stream_live_input"`

  - `StreamVideo object { id, etag, name, 2 more }`

    Response for stream_video resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "stream_video"`

      - `"stream_video"`

  - `Worker object { id, etag, name, 2 more }`

    Response for worker resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "worker"`

      - `"worker"`

  - `WorkerVersion object { id, etag, name, 3 more }`

    Response for worker_version resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "worker_version"`

      - `"worker_version"`

    - `worker_id: string`

      Worker ID is required only for worker_version resources

  - `Zone object { id, etag, name, 3 more }`

    Response for zone resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "zone"`

      - `"zone"`

    - `zone_id: string`

      Zone ID is required only for zone-level resources

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/tags \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "resource_id": "023e105f4ecef8ad9ca31a8372d0c353",
          "resource_type": "zone",
          "tags": {
            "environment": "production",
            "team": "engineering"
          }
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
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "etag": "v1:RBNvo1WzZ4oRRq0W9-hkng",
    "name": "my-worker-script",
    "tags": {
      "environment": "production",
      "team": "engineering"
    },
    "type": "access_application"
  }
}
```

## Delete tags from a zone-level resource

**delete** `/zones/{zone_id}/tags`

Removes all tags from a specific zone-level resource.

### Path Parameters

- `zone_id: string`

  Zone ID is required only for zone-level resources

### Header Parameters

- `"If-Match": optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/tags \
    -X DELETE \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
```

## Domain Types

### Zone Tag Get Response

- `ZoneTagGetResponse = object { id, etag, name, 2 more }  or object { id, access_application_id, etag, 4 more }  or object { id, etag, name, 2 more }  or 24 more`

  Response for access_application resources

  - `AccessApplication object { id, etag, name, 2 more }`

    Response for access_application resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "access_application"`

      - `"access_application"`

  - `AccessApplicationPolicy object { id, access_application_id, etag, 4 more }`

    Response for access_application_policy resources

    - `id: string`

      Identifies the unique resource.

    - `access_application_id: string`

      Access application ID is required only for access_application_policy resources

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "access_application_policy"`

      - `"access_application_policy"`

    - `zone_id: string`

      Zone ID is required only for zone-level resources

  - `AccessGroup object { id, etag, name, 2 more }`

    Response for access_group resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "access_group"`

      - `"access_group"`

  - `Account object { id, etag, name, 2 more }`

    Response for account resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "account"`

      - `"account"`

  - `AIGateway object { id, etag, name, 2 more }`

    Response for ai_gateway resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "ai_gateway"`

      - `"ai_gateway"`

  - `AlertingPolicy object { id, etag, name, 2 more }`

    Response for alerting_policy resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "alerting_policy"`

      - `"alerting_policy"`

  - `AlertingWebhook object { id, etag, name, 2 more }`

    Response for alerting_webhook resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "alerting_webhook"`

      - `"alerting_webhook"`

  - `APIGatewayOperation object { id, etag, name, 3 more }`

    Response for api_gateway_operation resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "api_gateway_operation"`

      - `"api_gateway_operation"`

    - `zone_id: string`

      Zone ID is required only for zone-level resources

  - `CloudflaredTunnel object { id, etag, name, 2 more }`

    Response for cloudflared_tunnel resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "cloudflared_tunnel"`

      - `"cloudflared_tunnel"`

  - `CustomCertificate object { id, etag, name, 3 more }`

    Response for custom_certificate resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "custom_certificate"`

      - `"custom_certificate"`

    - `zone_id: string`

      Zone ID is required only for zone-level resources

  - `CustomHostname object { id, etag, name, 3 more }`

    Response for custom_hostname resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "custom_hostname"`

      - `"custom_hostname"`

    - `zone_id: string`

      Zone ID is required only for zone-level resources

  - `D1Database object { id, etag, name, 2 more }`

    Response for d1_database resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "d1_database"`

      - `"d1_database"`

  - `DNSRecord object { id, etag, name, 3 more }`

    Response for dns_record resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "dns_record"`

      - `"dns_record"`

    - `zone_id: string`

      Zone ID is required only for zone-level resources

  - `DurableObjectNamespace object { id, etag, name, 2 more }`

    Response for durable_object_namespace resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "durable_object_namespace"`

      - `"durable_object_namespace"`

  - `GatewayList object { id, etag, name, 2 more }`

    Response for gateway_list resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "gateway_list"`

      - `"gateway_list"`

  - `GatewayRule object { id, etag, name, 2 more }`

    Response for gateway_rule resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "gateway_rule"`

      - `"gateway_rule"`

  - `Image object { id, etag, name, 2 more }`

    Response for image resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "image"`

      - `"image"`

  - `KVNamespace object { id, etag, name, 2 more }`

    Response for kv_namespace resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "kv_namespace"`

      - `"kv_namespace"`

  - `ManagedClientCertificate object { id, etag, name, 3 more }`

    Response for managed_client_certificate resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "managed_client_certificate"`

      - `"managed_client_certificate"`

    - `zone_id: string`

      Zone ID is required only for zone-level resources

  - `Queue object { id, etag, name, 2 more }`

    Response for queue resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "queue"`

      - `"queue"`

  - `R2Bucket object { id, etag, name, 2 more }`

    Response for r2_bucket resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "r2_bucket"`

      - `"r2_bucket"`

  - `ResourceShare object { id, etag, name, 2 more }`

    Response for resource_share resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "resource_share"`

      - `"resource_share"`

  - `StreamLiveInput object { id, etag, name, 2 more }`

    Response for stream_live_input resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "stream_live_input"`

      - `"stream_live_input"`

  - `StreamVideo object { id, etag, name, 2 more }`

    Response for stream_video resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "stream_video"`

      - `"stream_video"`

  - `Worker object { id, etag, name, 2 more }`

    Response for worker resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "worker"`

      - `"worker"`

  - `WorkerVersion object { id, etag, name, 3 more }`

    Response for worker_version resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "worker_version"`

      - `"worker_version"`

    - `worker_id: string`

      Worker ID is required only for worker_version resources

  - `Zone object { id, etag, name, 3 more }`

    Response for zone resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "zone"`

      - `"zone"`

    - `zone_id: string`

      Zone ID is required only for zone-level resources

### Zone Tag Update Response

- `ZoneTagUpdateResponse = object { id, etag, name, 2 more }  or object { id, access_application_id, etag, 4 more }  or object { id, etag, name, 2 more }  or 24 more`

  Response for access_application resources

  - `AccessApplication object { id, etag, name, 2 more }`

    Response for access_application resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "access_application"`

      - `"access_application"`

  - `AccessApplicationPolicy object { id, access_application_id, etag, 4 more }`

    Response for access_application_policy resources

    - `id: string`

      Identifies the unique resource.

    - `access_application_id: string`

      Access application ID is required only for access_application_policy resources

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "access_application_policy"`

      - `"access_application_policy"`

    - `zone_id: string`

      Zone ID is required only for zone-level resources

  - `AccessGroup object { id, etag, name, 2 more }`

    Response for access_group resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "access_group"`

      - `"access_group"`

  - `Account object { id, etag, name, 2 more }`

    Response for account resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "account"`

      - `"account"`

  - `AIGateway object { id, etag, name, 2 more }`

    Response for ai_gateway resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "ai_gateway"`

      - `"ai_gateway"`

  - `AlertingPolicy object { id, etag, name, 2 more }`

    Response for alerting_policy resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "alerting_policy"`

      - `"alerting_policy"`

  - `AlertingWebhook object { id, etag, name, 2 more }`

    Response for alerting_webhook resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "alerting_webhook"`

      - `"alerting_webhook"`

  - `APIGatewayOperation object { id, etag, name, 3 more }`

    Response for api_gateway_operation resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "api_gateway_operation"`

      - `"api_gateway_operation"`

    - `zone_id: string`

      Zone ID is required only for zone-level resources

  - `CloudflaredTunnel object { id, etag, name, 2 more }`

    Response for cloudflared_tunnel resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "cloudflared_tunnel"`

      - `"cloudflared_tunnel"`

  - `CustomCertificate object { id, etag, name, 3 more }`

    Response for custom_certificate resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "custom_certificate"`

      - `"custom_certificate"`

    - `zone_id: string`

      Zone ID is required only for zone-level resources

  - `CustomHostname object { id, etag, name, 3 more }`

    Response for custom_hostname resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "custom_hostname"`

      - `"custom_hostname"`

    - `zone_id: string`

      Zone ID is required only for zone-level resources

  - `D1Database object { id, etag, name, 2 more }`

    Response for d1_database resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "d1_database"`

      - `"d1_database"`

  - `DNSRecord object { id, etag, name, 3 more }`

    Response for dns_record resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "dns_record"`

      - `"dns_record"`

    - `zone_id: string`

      Zone ID is required only for zone-level resources

  - `DurableObjectNamespace object { id, etag, name, 2 more }`

    Response for durable_object_namespace resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "durable_object_namespace"`

      - `"durable_object_namespace"`

  - `GatewayList object { id, etag, name, 2 more }`

    Response for gateway_list resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "gateway_list"`

      - `"gateway_list"`

  - `GatewayRule object { id, etag, name, 2 more }`

    Response for gateway_rule resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "gateway_rule"`

      - `"gateway_rule"`

  - `Image object { id, etag, name, 2 more }`

    Response for image resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "image"`

      - `"image"`

  - `KVNamespace object { id, etag, name, 2 more }`

    Response for kv_namespace resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "kv_namespace"`

      - `"kv_namespace"`

  - `ManagedClientCertificate object { id, etag, name, 3 more }`

    Response for managed_client_certificate resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "managed_client_certificate"`

      - `"managed_client_certificate"`

    - `zone_id: string`

      Zone ID is required only for zone-level resources

  - `Queue object { id, etag, name, 2 more }`

    Response for queue resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "queue"`

      - `"queue"`

  - `R2Bucket object { id, etag, name, 2 more }`

    Response for r2_bucket resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "r2_bucket"`

      - `"r2_bucket"`

  - `ResourceShare object { id, etag, name, 2 more }`

    Response for resource_share resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "resource_share"`

      - `"resource_share"`

  - `StreamLiveInput object { id, etag, name, 2 more }`

    Response for stream_live_input resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "stream_live_input"`

      - `"stream_live_input"`

  - `StreamVideo object { id, etag, name, 2 more }`

    Response for stream_video resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "stream_video"`

      - `"stream_video"`

  - `Worker object { id, etag, name, 2 more }`

    Response for worker resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "worker"`

      - `"worker"`

  - `WorkerVersion object { id, etag, name, 3 more }`

    Response for worker_version resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "worker_version"`

      - `"worker_version"`

    - `worker_id: string`

      Worker ID is required only for worker_version resources

  - `Zone object { id, etag, name, 3 more }`

    Response for zone resources

    - `id: string`

      Identifies the unique resource.

    - `etag: string`

      ETag identifier for optimistic concurrency control. Formatted as "v1:<hash>" where
      the hash is the base64url-encoded SHA-256 (truncated to 128 bits) of the tags map
      canonicalized using RFC 8785 (JSON Canonicalization Scheme). Clients should treat
      ETags as opaque strings and pass them back via the If-Match header on write operations.

    - `name: string`

      Human-readable name of the resource.

    - `tags: map[string]`

      Contains key-value pairs of tags.

    - `type: "zone"`

      - `"zone"`

    - `zone_id: string`

      Zone ID is required only for zone-level resources

# Keys

## List tag keys

**get** `/accounts/{account_id}/tags/keys`

Lists all distinct tag keys used across resources in an account.

### Path Parameters

- `account_id: string`

  Identifier.

### Query Parameters

- `cursor: optional string`

  Cursor for pagination.

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

- `result: optional array of string`

  Contains an array of distinct tag keys.

- `result_info: optional object { count, cursor }`

  - `count: optional number`

    Indicates the number of results returned in the current page.

  - `cursor: optional string`

    Provides a cursor for the next page of results. Include this value in the next request to continue pagination.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/tags/keys \
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
  "success": true,
  "result": [
    "environment",
    "team",
    "region"
  ],
  "result_info": {
    "count": 20,
    "cursor": "eyJhY2NvdW50X2lkIjoxMjM0NTY3ODkwfQ"
  }
}
```

## Domain Types

### Key List Response

- `KeyListResponse = string`

# Values

## List tag values

**get** `/accounts/{account_id}/tags/values/{tag_key}`

Lists all distinct values for a given tag key, optionally filtered by resource type.

### Path Parameters

- `account_id: string`

  Identifier.

- `tag_key: string`

### Query Parameters

- `cursor: optional string`

  Cursor for pagination.

- `type: optional "access_application" or "access_application_policy" or "access_group" or 24 more`

  Filter by resource type.

  - `"access_application"`

  - `"access_application_policy"`

  - `"access_group"`

  - `"account"`

  - `"ai_gateway"`

  - `"alerting_policy"`

  - `"alerting_webhook"`

  - `"api_gateway_operation"`

  - `"cloudflared_tunnel"`

  - `"custom_certificate"`

  - `"custom_hostname"`

  - `"d1_database"`

  - `"dns_record"`

  - `"durable_object_namespace"`

  - `"gateway_list"`

  - `"gateway_rule"`

  - `"image"`

  - `"kv_namespace"`

  - `"managed_client_certificate"`

  - `"queue"`

  - `"r2_bucket"`

  - `"resource_share"`

  - `"stream_live_input"`

  - `"stream_video"`

  - `"worker"`

  - `"worker_version"`

  - `"zone"`

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

- `result: optional array of string`

- `result_info: optional object { count, cursor }`

  - `count: optional number`

    Indicates the number of results returned in the current page.

  - `cursor: optional string`

    Provides a cursor for the next page of results. Include this value in the next request to continue pagination.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/tags/values/$TAG_KEY \
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
  "success": true,
  "result": [
    "production",
    "staging"
  ],
  "result_info": {
    "count": 20,
    "cursor": "eyJhY2NvdW50X2lkIjoxMjM0NTY3ODkwfQ"
  }
}
```

## Domain Types

### Value List Response

- `ValueListResponse = string`

# Summary

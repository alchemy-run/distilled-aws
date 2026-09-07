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

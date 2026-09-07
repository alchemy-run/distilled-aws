## Update Registration

**patch** `/accounts/{account_id}/registrar/registrations/{domain_name}`

Updates an existing domain registration.

By default, the server holds the connection for a bounded, server-defined
amount of time while the update completes. Most updates finish within this
window and return `200 OK` with a completed workflow status.

If the update is still processing after this synchronous wait window, the
server returns `202 Accepted`. Poll the URL in `links.self` to track progress.

To skip the wait and receive an immediate `202`, send `Prefer: respond-async`.

This endpoint currently supports updating `auto_renew` only.

### Path Parameters

- `account_id: string`

  Identifier

- `domain_name: string`

  Fully qualified domain name (FQDN) including the extension
  (e.g., `example.com`, `mybrand.app`). The domain name uniquely
  identifies a registration — the same domain cannot be registered
  twice, making it a natural idempotency key for registration requests.

### Header Parameters

- `Prefer: optional "respond-async"`

  - `"respond-async"`

### Body Parameters

- `auto_renew: optional boolean`

  Enable or disable automatic renewal.
  Setting this field to `true` authorizes Cloudflare to charge the
  account's default payment method up to 30 days before domain expiry
  to renew the domain automatically. Renewal pricing may change over
  time based on registry pricing.

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

- `result: WorkflowStatus`

  Status of an async registration workflow.

  - `completed: boolean`

    Whether the workflow has reached a terminal state. `true` when
    `state` is `succeeded` or `failed`. `false` for `pending`,
    `in_progress`, `action_required`, and `blocked`.

  - `created_at: string`

  - `links: object { self, resource }`

    - `self: string`

      URL to this status resource.

    - `resource: optional string`

      URL to the domain resource.

  - `state: "pending" or "in_progress" or "action_required" or 3 more`

    Workflow lifecycle state.

    - `pending`: Workflow has been created but not yet started processing.
    - `in_progress`: Actively processing. Continue polling `links.self`.
      The workflow has an internal deadline and will not remain in this
      state indefinitely.
    - `action_required`: Paused — requires action by the user (not the
      system). See `context.action` for what is needed. An automated
      polling loop must break on this state; it will not resolve on its
      own without user intervention.
    - `blocked`: The workflow cannot make progress due to a third party
      such as the domain extension's registry or a losing registrar.
      No user action will help. Continue polling — the block may resolve
      when the third party responds.
    - `succeeded`: Terminal. The operation completed successfully.
      `completed` will be `true`. For registrations, `context.registration`
      contains the resulting registration resource.
    - `failed`: Terminal. The operation failed. `completed` will be `true`.
      See `error.code` and `error.message` for the reason. Do not
      auto-retry without user review.

    - `"pending"`

    - `"in_progress"`

    - `"action_required"`

    - `"blocked"`

    - `"succeeded"`

    - `"failed"`

  - `updated_at: string`

  - `context: optional map[unknown]`

    Workflow-specific data for this workflow.

    The workflow subject is identified by `context.domain_name` for
    domain-centric workflows.

  - `error: optional object { code, message }`

    Error details when a workflow reaches the `failed` state. The specific
    error codes and messages depend on the workflow type (registration,
    update, etc.) and the underlying registry response. These workflow
    error codes are separate from immediate HTTP error `errors[].code`
    values returned by non-2xx responses. Surface
    `error.message` to the user for context.

    - `code: string`

      Machine-readable error code identifying the failure reason.

    - `message: string`

      Human-readable explanation of the failure. May include registry-specific details.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/registrar/registrations/$DOMAIN_NAME \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "auto_renew": false
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
    "completed": false,
    "created_at": "2019-12-27T18:11:19.117Z",
    "links": {
      "self": "/accounts/{account_id}/registrar/registrations/example.com/registration-status",
      "resource": "/accounts/{account_id}/registrar/registrations/example.com"
    },
    "state": "in_progress",
    "updated_at": "2019-12-27T18:11:19.117Z",
    "context": {
      "foo": "bar"
    },
    "error": {
      "code": "registry_rejected",
      "message": "Registry rejected the request."
    }
  },
  "success": true
}
```

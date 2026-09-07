# Registration Status

## Get Registration Status

**get** `/accounts/{account_id}/registrar/registrations/{domain_name}/registration-status`

Returns the current status of a domain registration workflow.

Use this endpoint to poll for completion when the POST response
returned `202 Accepted`. The URL is provided in the `links.self`
field of the workflow status response.

Poll this endpoint until the workflow reaches a terminal state or a
state that requires user attention.

**Terminal states:** `succeeded` and `failed` are terminal and always
have `completed: true`.

**Non-terminal states:**

- `action_required` has `completed: false` and will not resolve on its
  own. The workflow is paused pending user intervention.
- `blocked` has `completed: false` and indicates the workflow is waiting
  on a third party such as the extension registry or losing registrar.
  Continue polling while informing the user of the delay.

Use increasing backoff between polls. When `state: blocked`, use a
longer polling interval and do not poll indefinitely.

A naive polling loop that only checks `completed` can run indefinitely
when `state: action_required`. Break explicitly on `action_required`:

```js
let status;
do {
  await new Promise(r => setTimeout(r, 2000));
  status = await cloudflare.request({
    method: 'GET',
    path: reg.result.links.self,
  });
} while (
  !status.result.completed &&
  status.result.state !== 'action_required'
);

if (status.result.state === 'action_required') {
  // Surface context.action and context.confirmation_sent_to to the user.
  // Do not re-submit the registration request.
}
```

### Path Parameters

- `account_id: string`

  Identifier

- `domain_name: string`

  Fully qualified domain name (FQDN) including the extension
  (e.g., `example.com`, `mybrand.app`). The domain name uniquely
  identifies a registration — the same domain cannot be registered
  twice, making it a natural idempotency key for registration requests.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/registrar/registrations/$DOMAIN_NAME/registration-status \
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

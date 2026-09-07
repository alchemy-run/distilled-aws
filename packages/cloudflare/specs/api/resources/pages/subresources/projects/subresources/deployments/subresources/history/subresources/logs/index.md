# Logs

## Get deployment logs

**get** `/accounts/{account_id}/pages/projects/{project_name}/deployments/{deployment_id}/history/logs`

Fetch deployment logs for a project.

### Path Parameters

- `account_id: string`

  Identifier.

- `project_name: string`

  Name of the project.

- `deployment_id: string`

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

- `result: object { data, includes_container_logs, total }`

  - `data: array of object { line, ts }`

    - `line: string`

    - `ts: string`

  - `includes_container_logs: boolean`

  - `total: number`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pages/projects/$PROJECT_NAME/deployments/$DEPLOYMENT_ID/history/logs \
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
    "data": [
      {
        "line": "Cloning repository...",
        "ts": "2021-04-20T19:35:29.0749819Z"
      },
      {
        "line": "From https://github.com/cloudflare/example",
        "ts": "2021-04-20T19:35:30.0749819Z"
      },
      {
        "line": " * branch            209c5bb11d89533f426b2f8469bcae12fdccf71b -> FETCH_HEAD",
        "ts": "2021-04-20T19:35:30.0749819Z"
      },
      {
        "line": "",
        "ts": "2021-04-20T19:35:30.0749819Z"
      },
      {
        "line": "HEAD is now at 209c5bb Update index.html",
        "ts": "2021-04-20T19:35:30.0749819Z"
      },
      {
        "line": "",
        "ts": "2021-04-20T19:35:30.0749819Z"
      },
      {
        "line": "",
        "ts": "2021-04-20T19:35:30.0749819Z"
      },
      {
        "line": "Success: Finished cloning repository files",
        "ts": "2021-04-20T19:35:30.0749819Z"
      },
      {
        "line": "Installing dependencies",
        "ts": "2021-04-20T19:35:59.0749819Z"
      },
      {
        "line": "Python version set to 2.7",
        "ts": "2021-04-20T19:35:59.0931208Z"
      },
      {
        "line": "v12.18.0 is already installed.",
        "ts": "2021-04-20T19:36:02.2369501Z"
      },
      {
        "line": "Now using node v12.18.0 (npm v6.14.4)",
        "ts": "2021-04-20T19:36:02.6028886Z"
      },
      {
        "line": "Started restoring cached build plugins",
        "ts": "2021-04-20T19:36:02.624555Z"
      },
      {
        "line": "Finished restoring cached build plugins",
        "ts": "2021-04-20T19:36:02.6340688Z"
      },
      {
        "line": "Attempting ruby version 2.7.1, read from environment",
        "ts": "2021-04-20T19:36:02.963095Z"
      },
      {
        "line": "Using ruby version 2.7.1",
        "ts": "2021-04-20T19:36:04.2236084Z"
      },
      {
        "line": "Using PHP version 5.6",
        "ts": "2021-04-20T19:36:04.5450152Z"
      },
      {
        "line": "5.2 is already installed.",
        "ts": "2021-04-20T19:36:04.5740509Z"
      },
      {
        "line": "Using Swift version 5.2",
        "ts": "2021-04-20T19:36:04.577035Z"
      },
      {
        "line": "Installing Hugo 0.54.0",
        "ts": "2021-04-20T19:36:04.5771615Z"
      },
      {
        "line": "Hugo Static Site Generator v0.54.0-B1A82C61A/extended linux/amd64 BuildDate: 2019-02-01T10:04:38Z",
        "ts": "2021-04-20T19:36:05.4786868Z"
      },
      {
        "line": "Started restoring cached go cache",
        "ts": "2021-04-20T19:36:05.4794366Z"
      },
      {
        "line": "Finished restoring cached go cache",
        "ts": "2021-04-20T19:36:05.481977Z"
      },
      {
        "line": "go version go1.14.4 linux/amd64",
        "ts": "2021-04-20T19:36:05.9049776Z"
      },
      {
        "line": "go version go1.14.4 linux/amd64",
        "ts": "2021-04-20T19:36:05.9086053Z"
      },
      {
        "line": "Installing missing commands",
        "ts": "2021-04-20T19:36:05.9163568Z"
      },
      {
        "line": "Verify run directory",
        "ts": "2021-04-20T19:36:05.9163934Z"
      },
      {
        "line": "Executing user command: echo \"skipping build step: no build command specified\"",
        "ts": "2021-04-20T19:36:05.9164636Z"
      },
      {
        "line": "skipping build step: no build command specified",
        "ts": "2021-04-20T19:36:05.9165087Z"
      },
      {
        "line": "Finished",
        "ts": "2021-04-20T19:36:05.917412Z"
      }
    ],
    "includes_container_logs": true,
    "total": 30
  },
  "success": true
}
```

## Domain Types

### Log Get Response

- `LogGetResponse object { data, includes_container_logs, total }`

  - `data: array of object { line, ts }`

    - `line: string`

    - `ts: string`

  - `includes_container_logs: boolean`

  - `total: number`

## Get bot details

**get** `/radar/bots/{bot_slug}`

Retrieves the requested bot information.

### Path Parameters

- `bot_slug: string`

  Bot slug.

### Query Parameters

- `format: optional "JSON" or "CSV"`

  Format in which results will be returned.

  - `"JSON"`

  - `"CSV"`

### Returns

- `result: object { bot }`

  - `bot: object { category, description, kind, 7 more }`

    - `category: string`

      The category of the bot.

    - `description: string`

      A summary for the bot (e.g., purpose).

    - `kind: string`

      The kind of the bot.

    - `name: string`

      The name of the bot.

    - `operator: string`

      The organization that owns and operates the bot.

    - `operatorUrl: string`

      The link to the bot documentation.

    - `slug: string`

      A kebab-case identifier derived from the bot name.

    - `userAgentPatterns: array of string`

    - `userAgents: array of string`

    - `signatureAgentUrl: optional string`

      The URL of the agent's [Web Bot Auth](https://blog.cloudflare.com/web-bot-auth/) resource. Null for bots not verified via request signature.

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/bots/$BOT_SLUG \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "bot": {
      "category": "AI_CRAWLER",
      "description": "OpenAI/ChatGPT's web crawler",
      "kind": "AGENT",
      "name": "GPTBot",
      "operator": "OpenAI",
      "operatorUrl": "https://platform.openai.com/docs/bots",
      "slug": "gptbot",
      "userAgentPatterns": [
        "GPTBot"
      ],
      "userAgents": [
        "GPTBot"
      ],
      "signatureAgentUrl": "https://example.com/signature-agent"
    }
  },
  "success": true
}
```

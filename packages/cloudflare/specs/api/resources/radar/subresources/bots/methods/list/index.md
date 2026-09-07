## List bots

**get** `/radar/bots`

Retrieves a list of bots.

### Query Parameters

- `botCategory: optional "SEARCH_ENGINE_CRAWLER" or "SEARCH_ENGINE_OPTIMIZATION" or "MONITORING_AND_ANALYTICS" or 13 more`

  Filters results by bot category.

  - `"SEARCH_ENGINE_CRAWLER"`

  - `"SEARCH_ENGINE_OPTIMIZATION"`

  - `"MONITORING_AND_ANALYTICS"`

  - `"ADVERTISING_AND_MARKETING"`

  - `"SOCIAL_MEDIA_MARKETING"`

  - `"PAGE_PREVIEW"`

  - `"ACADEMIC_RESEARCH"`

  - `"SECURITY"`

  - `"ACCESSIBILITY"`

  - `"WEBHOOKS"`

  - `"FEED_FETCHER"`

  - `"AI_CRAWLER"`

  - `"AGGREGATOR"`

  - `"AI_ASSISTANT"`

  - `"AI_SEARCH"`

  - `"ARCHIVER"`

- `botOperator: optional string`

  Filters results by bot operator.

- `botVerificationStatus: optional "VERIFIED"`

  Filters results by bot verification status.

  - `"VERIFIED"`

- `format: optional "JSON" or "CSV"`

  Format in which results will be returned.

  - `"JSON"`

  - `"CSV"`

- `kind: optional "AGENT" or "BOT"`

  Filters results by bot kind. Deprecated: the Verified Bot / Signed Agent distinction is being removed.

  - `"AGENT"`

  - `"BOT"`

- `limit: optional number`

  Limits the number of objects returned in the response.

- `offset: optional number`

  Skips the specified number of objects before fetching the results.

### Returns

- `result: object { bots }`

  - `bots: array of object { category, description, kind, 4 more }`

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

    - `slug: string`

      A kebab-case identifier derived from the bot name.

    - `userAgentPatterns: array of string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/bots \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "bots": [
      {
        "category": "AI_CRAWLER",
        "description": "OpenAI/ChatGPT's web crawler",
        "kind": "AGENT",
        "name": "GPTBot",
        "operator": "OpenAI",
        "slug": "gptbot",
        "userAgentPatterns": [
          "GPTBot"
        ]
      }
    ]
  },
  "success": true
}
```

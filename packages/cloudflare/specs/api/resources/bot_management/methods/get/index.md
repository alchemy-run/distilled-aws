## Get Zone Bot Management Config

**get** `/zones/{zone_id}/bot_management`

Retrieve a zone's Bot Management Config

### Path Parameters

- `zone_id: string`

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

- `success: true`

  Whether the API call was successful.

  - `true`

- `result: optional BotFightModeConfiguration or SuperBotFightModeDefinitelyConfiguration or SuperBotFightModeLikelyConfiguration or SubscriptionConfiguration`

  - `BotFightModeConfiguration object { ai_bots_protection, cf_robots_variant, content_bots_protection, 6 more }`

    - `ai_bots_protection: optional "block" or "disabled" or "only_on_ad_pages"`

      Enable rule to block AI Scrapers and Crawlers.

      - `"block"`

      - `"disabled"`

      - `"only_on_ad_pages"`

    - `cf_robots_variant: optional "off" or "policy_only"`

      Specifies the Robots Access Control License variant to use.

      - `"off"`

      - `"policy_only"`

    - `content_bots_protection: optional "block" or "disabled"`

      Enable rule to block content bots. When enabled, blocks automated traffic with low bot scores, excluding safe verified bot categories. Exceptions should be managed via skip rules.

      - `"block"`

      - `"disabled"`

    - `crawler_protection: optional "enabled" or "disabled"`

      Enable rule to punish AI Scrapers and Crawlers via a link maze.

      - `"enabled"`

      - `"disabled"`

    - `enable_js: optional boolean`

      Use lightweight, invisible JavaScript detections to improve Bot Management. [Learn more about JavaScript Detections](https://developers.cloudflare.com/bots/reference/javascript-detections/).

    - `fight_mode: optional boolean`

      Whether to enable Bot Fight Mode.

    - `is_robots_txt_managed: optional boolean`

      Enable cloudflare managed robots.txt. If an existing robots.txt is detected, then managed robots.txt will be prepended to the existing robots.txt.

    - `stale_zone_configuration: optional object { optimize_wordpress, sbfm_definitely_automated, sbfm_likely_automated, 3 more }`

      A read-only field that shows which unauthorized settings are currently active on the zone. These settings typically result from upgrades or downgrades.

      - `optimize_wordpress: optional boolean`

        Indicates that the zone's wordpress optimization for SBFM is turned on.

      - `sbfm_definitely_automated: optional string`

        Indicates that the zone's definitely automated requests are being blocked or challenged.

      - `sbfm_likely_automated: optional string`

        Indicates that the zone's likely automated requests are being blocked or challenged.

      - `sbfm_static_resource_protection: optional string`

        Indicates that the zone's static resource protection is turned on.

      - `sbfm_verified_bots: optional string`

        Indicates that the zone's verified bot requests are being blocked.

      - `suppress_session_score: optional boolean`

        Indicates that the zone's session score tracking is disabled.

    - `using_latest_model: optional boolean`

      A read-only field that indicates whether the zone currently is running the latest ML model.

  - `SuperBotFightModeDefinitelyConfiguration object { ai_bots_protection, cf_robots_variant, content_bots_protection, 9 more }`

    - `ai_bots_protection: optional "block" or "disabled" or "only_on_ad_pages"`

      Enable rule to block AI Scrapers and Crawlers.

      - `"block"`

      - `"disabled"`

      - `"only_on_ad_pages"`

    - `cf_robots_variant: optional "off" or "policy_only"`

      Specifies the Robots Access Control License variant to use.

      - `"off"`

      - `"policy_only"`

    - `content_bots_protection: optional "block" or "disabled"`

      Enable rule to block content bots. When enabled, blocks automated traffic with low bot scores, excluding safe verified bot categories. Exceptions should be managed via skip rules.

      - `"block"`

      - `"disabled"`

    - `crawler_protection: optional "enabled" or "disabled"`

      Enable rule to punish AI Scrapers and Crawlers via a link maze.

      - `"enabled"`

      - `"disabled"`

    - `enable_js: optional boolean`

      Use lightweight, invisible JavaScript detections to improve Bot Management. [Learn more about JavaScript Detections](https://developers.cloudflare.com/bots/reference/javascript-detections/).

    - `is_robots_txt_managed: optional boolean`

      Enable cloudflare managed robots.txt. If an existing robots.txt is detected, then managed robots.txt will be prepended to the existing robots.txt.

    - `optimize_wordpress: optional boolean`

      Whether to optimize Super Bot Fight Mode protections for Wordpress.

    - `sbfm_definitely_automated: optional "allow" or "block" or "managed_challenge"`

      Super Bot Fight Mode (SBFM) action to take on definitely automated requests.

      - `"allow"`

      - `"block"`

      - `"managed_challenge"`

    - `sbfm_static_resource_protection: optional boolean`

      Super Bot Fight Mode (SBFM) to enable static resource protection.
      Enable if static resources on your application need bot protection.
      Note: Static resource protection can also result in legitimate traffic being blocked.

    - `sbfm_verified_bots: optional "allow" or "block"`

      Super Bot Fight Mode (SBFM) action to take on verified bots requests.

      - `"allow"`

      - `"block"`

    - `stale_zone_configuration: optional object { fight_mode, sbfm_likely_automated }`

      A read-only field that shows which unauthorized settings are currently active on the zone. These settings typically result from upgrades or downgrades.

      - `fight_mode: optional boolean`

        Indicates that the zone's Bot Fight Mode is turned on.

      - `sbfm_likely_automated: optional string`

        Indicates that the zone's likely automated requests are being blocked or challenged.

    - `using_latest_model: optional boolean`

      A read-only field that indicates whether the zone currently is running the latest ML model.

  - `SuperBotFightModeLikelyConfiguration object { ai_bots_protection, cf_robots_variant, content_bots_protection, 10 more }`

    - `ai_bots_protection: optional "block" or "disabled" or "only_on_ad_pages"`

      Enable rule to block AI Scrapers and Crawlers.

      - `"block"`

      - `"disabled"`

      - `"only_on_ad_pages"`

    - `cf_robots_variant: optional "off" or "policy_only"`

      Specifies the Robots Access Control License variant to use.

      - `"off"`

      - `"policy_only"`

    - `content_bots_protection: optional "block" or "disabled"`

      Enable rule to block content bots. When enabled, blocks automated traffic with low bot scores, excluding safe verified bot categories. Exceptions should be managed via skip rules.

      - `"block"`

      - `"disabled"`

    - `crawler_protection: optional "enabled" or "disabled"`

      Enable rule to punish AI Scrapers and Crawlers via a link maze.

      - `"enabled"`

      - `"disabled"`

    - `enable_js: optional boolean`

      Use lightweight, invisible JavaScript detections to improve Bot Management. [Learn more about JavaScript Detections](https://developers.cloudflare.com/bots/reference/javascript-detections/).

    - `is_robots_txt_managed: optional boolean`

      Enable cloudflare managed robots.txt. If an existing robots.txt is detected, then managed robots.txt will be prepended to the existing robots.txt.

    - `optimize_wordpress: optional boolean`

      Whether to optimize Super Bot Fight Mode protections for Wordpress.

    - `sbfm_definitely_automated: optional "allow" or "block" or "managed_challenge"`

      Super Bot Fight Mode (SBFM) action to take on definitely automated requests.

      - `"allow"`

      - `"block"`

      - `"managed_challenge"`

    - `sbfm_likely_automated: optional "allow" or "block" or "managed_challenge"`

      Super Bot Fight Mode (SBFM) action to take on likely automated requests.

      - `"allow"`

      - `"block"`

      - `"managed_challenge"`

    - `sbfm_static_resource_protection: optional boolean`

      Super Bot Fight Mode (SBFM) to enable static resource protection.
      Enable if static resources on your application need bot protection.
      Note: Static resource protection can also result in legitimate traffic being blocked.

    - `sbfm_verified_bots: optional "allow" or "block"`

      Super Bot Fight Mode (SBFM) action to take on verified bots requests.

      - `"allow"`

      - `"block"`

    - `stale_zone_configuration: optional object { fight_mode }`

      A read-only field that shows which unauthorized settings are currently active on the zone. These settings typically result from upgrades or downgrades.

      - `fight_mode: optional boolean`

        Indicates that the zone's Bot Fight Mode is turned on.

    - `using_latest_model: optional boolean`

      A read-only field that indicates whether the zone currently is running the latest ML model.

  - `SubscriptionConfiguration object { ai_bots_protection, auto_update_model, bm_cookie_enabled, 8 more }`

    - `ai_bots_protection: optional "block" or "disabled" or "only_on_ad_pages"`

      Enable rule to block AI Scrapers and Crawlers.

      - `"block"`

      - `"disabled"`

      - `"only_on_ad_pages"`

    - `auto_update_model: optional boolean`

      Automatically update to the newest bot detection models created by Cloudflare as they are released. [Learn more.](https://developers.cloudflare.com/bots/reference/machine-learning-models#model-versions-and-release-notes)

    - `bm_cookie_enabled: optional boolean`

      Indicates that the bot management cookie can be placed on end user devices accessing the site. Defaults to true

    - `cf_robots_variant: optional "off" or "policy_only"`

      Specifies the Robots Access Control License variant to use.

      - `"off"`

      - `"policy_only"`

    - `content_bots_protection: optional "block" or "disabled"`

      Enable rule to block content bots. When enabled, blocks automated traffic with low bot scores, excluding safe verified bot categories. Exceptions should be managed via skip rules.

      - `"block"`

      - `"disabled"`

    - `crawler_protection: optional "enabled" or "disabled"`

      Enable rule to punish AI Scrapers and Crawlers via a link maze.

      - `"enabled"`

      - `"disabled"`

    - `enable_js: optional boolean`

      Use lightweight, invisible JavaScript detections to improve Bot Management. [Learn more about JavaScript Detections](https://developers.cloudflare.com/bots/reference/javascript-detections/).

    - `is_robots_txt_managed: optional boolean`

      Enable cloudflare managed robots.txt. If an existing robots.txt is detected, then managed robots.txt will be prepended to the existing robots.txt.

    - `stale_zone_configuration: optional object { fight_mode, optimize_wordpress, sbfm_definitely_automated, 3 more }`

      A read-only field that shows which unauthorized settings are currently active on the zone. These settings typically result from upgrades or downgrades.

      - `fight_mode: optional boolean`

        Indicates that the zone's Bot Fight Mode is turned on.

      - `optimize_wordpress: optional boolean`

        Indicates that the zone's wordpress optimization for SBFM is turned on.

      - `sbfm_definitely_automated: optional string`

        Indicates that the zone's definitely automated requests are being blocked or challenged.

      - `sbfm_likely_automated: optional string`

        Indicates that the zone's likely automated requests are being blocked or challenged.

      - `sbfm_static_resource_protection: optional string`

        Indicates that the zone's static resource protection is turned on.

      - `sbfm_verified_bots: optional string`

        Indicates that the zone's verified bot requests are being blocked.

    - `suppress_session_score: optional boolean`

      Whether to disable tracking the highest bot score for a session in the Bot Management cookie.

    - `using_latest_model: optional boolean`

      A read-only field that indicates whether the zone currently is running the latest ML model.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/bot_management \
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
  "success": true,
  "result": {
    "ai_bots_protection": "block",
    "cf_robots_variant": "policy_only",
    "content_bots_protection": "disabled",
    "crawler_protection": "enabled",
    "enable_js": true,
    "fight_mode": true,
    "is_robots_txt_managed": false,
    "stale_zone_configuration": {
      "optimize_wordpress": true,
      "sbfm_definitely_automated": "sbfm_definitely_automated",
      "sbfm_likely_automated": "sbfm_likely_automated",
      "sbfm_static_resource_protection": "sbfm_static_resource_protection",
      "sbfm_verified_bots": "sbfm_verified_bots",
      "suppress_session_score": true
    },
    "using_latest_model": true
  }
}
```

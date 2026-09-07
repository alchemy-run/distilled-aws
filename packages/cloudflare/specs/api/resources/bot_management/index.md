# Bot Management

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

## Update Zone Bot Management Config

**put** `/zones/{zone_id}/bot_management`

Updates the Bot Management configuration for a zone.

This API is used to update:

- **Bot Fight Mode**
- **Super Bot Fight Mode**
- **Bot Management for Enterprise**

See [Bot Plans](https://developers.cloudflare.com/bots/plans/) for more information on the different plans
\
If you recently upgraded or downgraded your plan, refer to the following examples to clean up old configurations.
Copy and paste the example body to remove old zone configurations based on your current plan.

#### Clean up configuration for Bot Fight Mode plan

```json
{
  "sbfm_likely_automated": "allow",
  "sbfm_definitely_automated": "allow",
  "sbfm_verified_bots": "allow",
  "sbfm_static_resource_protection": false,
  "optimize_wordpress": false,
  "suppress_session_score": false
}
```

#### Clean up configuration for SBFM Pro plan

```json
{
  "sbfm_likely_automated": "allow",
  "fight_mode": false
}
```

#### Clean up configuration for SBFM Biz plan

```json
{
  "fight_mode": false
}
```

#### Clean up configuration for BM Enterprise Subscription plan

It is strongly recommended that you ensure you have [custom rules](https://developers.cloudflare.com/waf/custom-rules/) in place to protect your zone before disabling the SBFM rules. Without these protections, your zone is vulnerable to attacks.

```json
{
  "sbfm_likely_automated": "allow",
  "sbfm_definitely_automated": "allow",
  "sbfm_verified_bots": "allow",
  "sbfm_static_resource_protection": false,
  "optimize_wordpress": false,
  "fight_mode": false
}
```

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `body: BotFightModeConfiguration or SuperBotFightModeDefinitelyConfiguration or SuperBotFightModeLikelyConfiguration or SubscriptionConfiguration`

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
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "ai_bots_protection": "block",
          "cf_robots_variant": "policy_only",
          "content_bots_protection": "disabled",
          "crawler_protection": "enabled",
          "enable_js": true,
          "fight_mode": true
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

## Domain Types

### Bot Fight Mode Configuration

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

### Subscription Configuration

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

### Super Bot Fight Mode Definitely Configuration

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

### Super Bot Fight Mode Likely Configuration

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

### Bot Management Get Response

- `BotManagementGetResponse = BotFightModeConfiguration or SuperBotFightModeDefinitelyConfiguration or SuperBotFightModeLikelyConfiguration or SubscriptionConfiguration`

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

### Bot Management Update Response

- `BotManagementUpdateResponse = BotFightModeConfiguration or SuperBotFightModeDefinitelyConfiguration or SuperBotFightModeLikelyConfiguration or SubscriptionConfiguration`

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

# Feedback

## List zone feedback reports

**get** `/zones/{zone_id}/bot_management/feedback`

Returns all feedback reports previously submitted for the specified zone. Feedback reports help improve detection by sharing samples of traffic that were misclassified as bots or humans.

### Path Parameters

- `zone_id: string`

  Identifier.

### Returns

- `description: string`

- `expression: string`

  Wirefilter expression describing the traffic being reported.

- `first_request_seen_at: string`

- `last_request_seen_at: string`

- `requests: number`

- `requests_by_attribute: RequestsByAttribute`

  Top attributes contributing to the feedback sample. Keys include topASNs, topCountries, topHosts, topIPs, topJA3Hashes, topJA4s, topPaths, topUserAgents.

  - `metric: string`

  - `requests: number`

- `requests_by_score: RequestsByScore`

  Map of bot scores (1-99) to request counts. Sum must equal `requests`.

- `requests_by_score_src: RequestsByScoreSrc`

  Map of score source to request counts. Sum must equal `requests`.

- `type: FeedbackType`

  Type of feedback report.

  - `"false_positive"`

  - `"false_negative"`

- `created_at: optional string`

- `subtype: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/bot_management/feedback \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
[
  {
    "created_at": "2025-10-01T12:00:00Z",
    "description": "Legitimate checkout traffic was blocked as bots",
    "expression": "(http.host eq 'shop.example.com' and http.request.uri.path starts_with '/checkout') and cf.bot_management.score lt 5",
    "first_request_seen_at": "2025-09-30T08:00:00Z",
    "last_request_seen_at": "2025-09-30T09:00:00Z",
    "requests": 1200,
    "requests_by_attribute": {
      "topIPs": [
        {
          "metric": "203.0.113.10",
          "requests": 180
        },
        {
          "metric": "203.0.113.11",
          "requests": 150
        }
      ],
      "topPaths": [
        {
          "metric": "/checkout",
          "requests": 1000
        }
      ]
    },
    "requests_by_score": {
      "1": 200,
      "2": 300,
      "3": 400,
      "4": 300
    },
    "requests_by_score_src": {
      "heuristics": 200,
      "machine_learning": 1000
    },
    "subtype": "Spamming",
    "type": "false_positive"
  }
]
```

## Submit a feedback report

**post** `/zones/{zone_id}/bot_management/feedback`

Submit a feedback report for the specified zone. Use `type` to indicate whether the report is a false positive (good traffic flagged as bot) or a false negative (bot traffic missed). Furthermore, you can also use `expression` as a wirefilter to identify the affected traffic sample.

See more accepted API fields and expression types at https://developers.cloudflare.com/bots/concepts/feedback-loop/#api-fields and https://developers.cloudflare.com/bots/concepts/feedback-loop/#expression-fields, respectively.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `description: string`

- `expression: string`

  Wirefilter expression describing the traffic being reported.

- `first_request_seen_at: string`

- `last_request_seen_at: string`

- `requests: number`

- `requests_by_attribute: RequestsByAttribute`

  Top attributes contributing to the feedback sample. Keys include topASNs, topCountries, topHosts, topIPs, topJA3Hashes, topJA4s, topPaths, topUserAgents.

  - `metric: string`

  - `requests: number`

- `requests_by_score: RequestsByScore`

  Map of bot scores (1-99) to request counts. Sum must equal `requests`.

- `requests_by_score_src: RequestsByScoreSrc`

  Map of score source to request counts. Sum must equal `requests`.

- `type: FeedbackType`

  Type of feedback report.

  - `"false_positive"`

  - `"false_negative"`

- `subtype: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/bot_management/feedback \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d "{
          \"description\": \"Automated scraping missed by detections\",
          \"expression\": \"http.host eq 'www.example.com' and http.request.uri.path starts_with '/products' and cf.bot_management.score gt 25\",
          \"first_request_seen_at\": \"2025-09-29T00:00:00Z\",
          \"last_request_seen_at\": \"2025-09-29T06:00:00Z\",
          \"requests\": 2000,
          \"requests_by_attribute\": {
            \"topIPs\": [
              {
                \"metric\": \"203.0.113.55\",
                \"requests\": 400
              }
            ],
            \"topJA3Hashes\": [
              {
                \"metric\": \"ab12cd34ef56...\",
                \"requests\": 900
              }
            ]
          },
          \"requests_by_score\": {
            \"30\": 800,
            \"40\": 700,
            \"50\": 500
          },
          \"requests_by_score_src\": {
            \"heuristics\": 200,
            \"ml\": 1800
          },
          \"type\": \"false_negative\"
        }"
```

## Domain Types

### Feedback Report

- `FeedbackReport object { description, expression, first_request_seen_at, 8 more }`

  - `description: string`

  - `expression: string`

    Wirefilter expression describing the traffic being reported.

  - `first_request_seen_at: string`

  - `last_request_seen_at: string`

  - `requests: number`

  - `requests_by_attribute: RequestsByAttribute`

    Top attributes contributing to the feedback sample. Keys include topASNs, topCountries, topHosts, topIPs, topJA3Hashes, topJA4s, topPaths, topUserAgents.

    - `metric: string`

    - `requests: number`

  - `requests_by_score: RequestsByScore`

    Map of bot scores (1-99) to request counts. Sum must equal `requests`.

  - `requests_by_score_src: RequestsByScoreSrc`

    Map of score source to request counts. Sum must equal `requests`.

  - `type: FeedbackType`

    Type of feedback report.

    - `"false_positive"`

    - `"false_negative"`

  - `created_at: optional string`

  - `subtype: optional string`

### Feedback Type

- `FeedbackType = "false_positive" or "false_negative"`

  Type of feedback report.

  - `"false_positive"`

  - `"false_negative"`

### Metric Requests

- `MetricRequests object { metric, requests }`

  - `metric: string`

  - `requests: number`

### Requests By Attribute

- `RequestsByAttribute = map[array of MetricRequests]`

  Top attributes contributing to the feedback sample. Keys include topASNs, topCountries, topHosts, topIPs, topJA3Hashes, topJA4s, topPaths, topUserAgents.

  - `metric: string`

  - `requests: number`

### Requests By Score

- `RequestsByScore = map[number]`

  Map of bot scores (1-99) to request counts. Sum must equal `requests`.

### Requests By Score Src

- `RequestsByScoreSrc = map[number]`

  Map of score source to request counts. Sum must equal `requests`.

### Feedback List Response

- `FeedbackListResponse = array of FeedbackReport`

  - `description: string`

  - `expression: string`

    Wirefilter expression describing the traffic being reported.

  - `first_request_seen_at: string`

  - `last_request_seen_at: string`

  - `requests: number`

  - `requests_by_attribute: RequestsByAttribute`

    Top attributes contributing to the feedback sample. Keys include topASNs, topCountries, topHosts, topIPs, topJA3Hashes, topJA4s, topPaths, topUserAgents.

    - `metric: string`

    - `requests: number`

  - `requests_by_score: RequestsByScore`

    Map of bot scores (1-99) to request counts. Sum must equal `requests`.

  - `requests_by_score_src: RequestsByScoreSrc`

    Map of score source to request counts. Sum must equal `requests`.

  - `type: FeedbackType`

    Type of feedback report.

    - `"false_positive"`

    - `"false_negative"`

  - `created_at: optional string`

  - `subtype: optional string`

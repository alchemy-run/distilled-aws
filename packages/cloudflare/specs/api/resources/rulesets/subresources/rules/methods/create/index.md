## Create an account or zone ruleset rule

**post** `/{accounts_or_zones}/{account_or_zone_id}/rulesets/{ruleset_id}/rules`

Adds a new rule to an account or zone ruleset. The rule will be added to the end of the existing list of rules in the ruleset by default.

### Path Parameters

- `ruleset_id: string`

  The unique ID of the ruleset.

- `account_id: optional string`

  The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

- `zone_id: optional string`

  The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

### Body Parameters

- `body: BlockRule or object { last_updated, version, id, 11 more }  or CompressResponseRule or 18 more`

  - `BlockRule = BlockRule`

    - `position: optional object { before }  or object { after }  or object { index }`

      An object configuring where the rule will be placed.

      - `BeforePosition object { before }`

        An object configuring where the rule will be placed.

        - `before: optional string`

          The ID of another rule to place the rule before. An empty value causes the rule to be placed at the top.

      - `AfterPosition object { after }`

        An object configuring where the rule will be placed.

        - `after: optional string`

          The ID of another rule to place the rule after. An empty value causes the rule to be placed at the bottom.

      - `IndexPosition object { index }`

        An object configuring where the rule will be placed.

        - `index: optional number`

          An index at which to place the rule, where index 1 is the first rule.

  - `ChallengeRule object { last_updated, version, id, 11 more }`

    - `last_updated: string`

      The timestamp of when the rule was last modified.

    - `version: string`

      The version of the rule.

    - `id: optional string`

      The unique ID of the rule.

    - `action: optional "challenge"`

      The action to perform when the rule matches.

      - `"challenge"`

    - `action_parameters: optional unknown`

      The parameters configuring the rule's action.

    - `categories: optional array of string`

      The categories of the rule.

    - `description: optional string`

      An informative description of the rule.

    - `enabled: optional boolean`

      Whether the rule should be executed.

    - `exposed_credential_check: optional object { password_expression, username_expression }`

      Configuration for exposed credential checking.

      - `password_expression: string`

        An expression that selects the password used in the credentials check.

      - `username_expression: string`

        An expression that selects the user ID used in the credentials check.

    - `expression: optional string`

      The expression defining which traffic will match the rule.

    - `logging: optional Logging`

      An object configuring the rule's logging behavior.

      - `enabled: boolean`

        Whether to generate a log when the rule matches.

    - `position: optional object { before }  or object { after }  or object { index }`

      An object configuring where the rule will be placed.

      - `BeforePosition object { before }`

        An object configuring where the rule will be placed.

        - `before: optional string`

          The ID of another rule to place the rule before. An empty value causes the rule to be placed at the top.

      - `AfterPosition object { after }`

        An object configuring where the rule will be placed.

        - `after: optional string`

          The ID of another rule to place the rule after. An empty value causes the rule to be placed at the bottom.

      - `IndexPosition object { index }`

        An object configuring where the rule will be placed.

        - `index: optional number`

          An index at which to place the rule, where index 1 is the first rule.

    - `ratelimit: optional object { characteristics, period, counting_expression, 5 more }`

      An object configuring the rule's rate limit behavior.

      - `characteristics: array of string`

        Characteristics of the request on which the rate limit counter will be incremented.

      - `period: number`

        Period in seconds over which the counter is being incremented.

      - `counting_expression: optional string`

        An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule's expression.

      - `mitigation_timeout: optional number`

        Period of time in seconds after which the action will be disabled following its first execution.

      - `requests_per_period: optional number`

        The threshold of requests per period after which the action will be executed for the first time.

      - `requests_to_origin: optional boolean`

        Whether counting is only performed when an origin is reached.

      - `score_per_period: optional number`

        The score threshold per period for which the action will be executed the first time.

      - `score_response_header_name: optional string`

        A response header name provided by the origin, which contains the score to increment rate limit counter with.

    - `ref: optional string`

      The reference of the rule (the rule's ID by default).

  - `ResponseCompressionRule = CompressResponseRule`

    - `position: optional object { before }  or object { after }  or object { index }`

      An object configuring where the rule will be placed.

      - `BeforePosition object { before }`

        An object configuring where the rule will be placed.

        - `before: optional string`

          The ID of another rule to place the rule before. An empty value causes the rule to be placed at the top.

      - `AfterPosition object { after }`

        An object configuring where the rule will be placed.

        - `after: optional string`

          The ID of another rule to place the rule after. An empty value causes the rule to be placed at the bottom.

      - `IndexPosition object { index }`

        An object configuring where the rule will be placed.

        - `index: optional number`

          An index at which to place the rule, where index 1 is the first rule.

  - `DDoSDynamicRule = DDoSDynamicRule`

    - `position: optional object { before }  or object { after }  or object { index }`

      An object configuring where the rule will be placed.

      - `BeforePosition object { before }`

        An object configuring where the rule will be placed.

        - `before: optional string`

          The ID of another rule to place the rule before. An empty value causes the rule to be placed at the top.

      - `AfterPosition object { after }`

        An object configuring where the rule will be placed.

        - `after: optional string`

          The ID of another rule to place the rule after. An empty value causes the rule to be placed at the bottom.

      - `IndexPosition object { index }`

        An object configuring where the rule will be placed.

        - `index: optional number`

          An index at which to place the rule, where index 1 is the first rule.

  - `ExecuteRule = ExecuteRule`

    - `position: optional object { before }  or object { after }  or object { index }`

      An object configuring where the rule will be placed.

      - `BeforePosition object { before }`

        An object configuring where the rule will be placed.

        - `before: optional string`

          The ID of another rule to place the rule before. An empty value causes the rule to be placed at the top.

      - `AfterPosition object { after }`

        An object configuring where the rule will be placed.

        - `after: optional string`

          The ID of another rule to place the rule after. An empty value causes the rule to be placed at the bottom.

      - `IndexPosition object { index }`

        An object configuring where the rule will be placed.

        - `index: optional number`

          An index at which to place the rule, where index 1 is the first rule.

  - `ForceConnectionCloseRule = ForceConnectionCloseRule`

    - `position: optional object { before }  or object { after }  or object { index }`

      An object configuring where the rule will be placed.

      - `BeforePosition object { before }`

        An object configuring where the rule will be placed.

        - `before: optional string`

          The ID of another rule to place the rule before. An empty value causes the rule to be placed at the top.

      - `AfterPosition object { after }`

        An object configuring where the rule will be placed.

        - `after: optional string`

          The ID of another rule to place the rule after. An empty value causes the rule to be placed at the bottom.

      - `IndexPosition object { index }`

        An object configuring where the rule will be placed.

        - `index: optional number`

          An index at which to place the rule, where index 1 is the first rule.

  - `JavaScriptChallengeRule object { last_updated, version, id, 11 more }`

    - `last_updated: string`

      The timestamp of when the rule was last modified.

    - `version: string`

      The version of the rule.

    - `id: optional string`

      The unique ID of the rule.

    - `action: optional "js_challenge"`

      The action to perform when the rule matches.

      - `"js_challenge"`

    - `action_parameters: optional unknown`

      The parameters configuring the rule's action.

    - `categories: optional array of string`

      The categories of the rule.

    - `description: optional string`

      An informative description of the rule.

    - `enabled: optional boolean`

      Whether the rule should be executed.

    - `exposed_credential_check: optional object { password_expression, username_expression }`

      Configuration for exposed credential checking.

      - `password_expression: string`

        An expression that selects the password used in the credentials check.

      - `username_expression: string`

        An expression that selects the user ID used in the credentials check.

    - `expression: optional string`

      The expression defining which traffic will match the rule.

    - `logging: optional Logging`

      An object configuring the rule's logging behavior.

    - `position: optional object { before }  or object { after }  or object { index }`

      An object configuring where the rule will be placed.

      - `BeforePosition object { before }`

        An object configuring where the rule will be placed.

        - `before: optional string`

          The ID of another rule to place the rule before. An empty value causes the rule to be placed at the top.

      - `AfterPosition object { after }`

        An object configuring where the rule will be placed.

        - `after: optional string`

          The ID of another rule to place the rule after. An empty value causes the rule to be placed at the bottom.

      - `IndexPosition object { index }`

        An object configuring where the rule will be placed.

        - `index: optional number`

          An index at which to place the rule, where index 1 is the first rule.

    - `ratelimit: optional object { characteristics, period, counting_expression, 5 more }`

      An object configuring the rule's rate limit behavior.

      - `characteristics: array of string`

        Characteristics of the request on which the rate limit counter will be incremented.

      - `period: number`

        Period in seconds over which the counter is being incremented.

      - `counting_expression: optional string`

        An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule's expression.

      - `mitigation_timeout: optional number`

        Period of time in seconds after which the action will be disabled following its first execution.

      - `requests_per_period: optional number`

        The threshold of requests per period after which the action will be executed for the first time.

      - `requests_to_origin: optional boolean`

        Whether counting is only performed when an origin is reached.

      - `score_per_period: optional number`

        The score threshold per period for which the action will be executed the first time.

      - `score_response_header_name: optional string`

        A response header name provided by the origin, which contains the score to increment rate limit counter with.

    - `ref: optional string`

      The reference of the rule (the rule's ID by default).

  - `LogRule = LogRule`

    - `position: optional object { before }  or object { after }  or object { index }`

      An object configuring where the rule will be placed.

      - `BeforePosition object { before }`

        An object configuring where the rule will be placed.

        - `before: optional string`

          The ID of another rule to place the rule before. An empty value causes the rule to be placed at the top.

      - `AfterPosition object { after }`

        An object configuring where the rule will be placed.

        - `after: optional string`

          The ID of another rule to place the rule after. An empty value causes the rule to be placed at the bottom.

      - `IndexPosition object { index }`

        An object configuring where the rule will be placed.

        - `index: optional number`

          An index at which to place the rule, where index 1 is the first rule.

  - `LogCustomFieldRule = LogCustomFieldRule`

    - `position: optional object { before }  or object { after }  or object { index }`

      An object configuring where the rule will be placed.

      - `BeforePosition object { before }`

        An object configuring where the rule will be placed.

        - `before: optional string`

          The ID of another rule to place the rule before. An empty value causes the rule to be placed at the top.

      - `AfterPosition object { after }`

        An object configuring where the rule will be placed.

        - `after: optional string`

          The ID of another rule to place the rule after. An empty value causes the rule to be placed at the bottom.

      - `IndexPosition object { index }`

        An object configuring where the rule will be placed.

        - `index: optional number`

          An index at which to place the rule, where index 1 is the first rule.

  - `ManagedChallengeRule = ManagedChallengeRule`

    - `position: optional object { before }  or object { after }  or object { index }`

      An object configuring where the rule will be placed.

      - `BeforePosition object { before }`

        An object configuring where the rule will be placed.

        - `before: optional string`

          The ID of another rule to place the rule before. An empty value causes the rule to be placed at the top.

      - `AfterPosition object { after }`

        An object configuring where the rule will be placed.

        - `after: optional string`

          The ID of another rule to place the rule after. An empty value causes the rule to be placed at the bottom.

      - `IndexPosition object { index }`

        An object configuring where the rule will be placed.

        - `index: optional number`

          An index at which to place the rule, where index 1 is the first rule.

  - `RedirectRule = RedirectRule`

    - `position: optional object { before }  or object { after }  or object { index }`

      An object configuring where the rule will be placed.

      - `BeforePosition object { before }`

        An object configuring where the rule will be placed.

        - `before: optional string`

          The ID of another rule to place the rule before. An empty value causes the rule to be placed at the top.

      - `AfterPosition object { after }`

        An object configuring where the rule will be placed.

        - `after: optional string`

          The ID of another rule to place the rule after. An empty value causes the rule to be placed at the bottom.

      - `IndexPosition object { index }`

        An object configuring where the rule will be placed.

        - `index: optional number`

          An index at which to place the rule, where index 1 is the first rule.

  - `RewriteRule = RewriteRule`

    - `position: optional object { before }  or object { after }  or object { index }`

      An object configuring where the rule will be placed.

      - `BeforePosition object { before }`

        An object configuring where the rule will be placed.

        - `before: optional string`

          The ID of another rule to place the rule before. An empty value causes the rule to be placed at the top.

      - `AfterPosition object { after }`

        An object configuring where the rule will be placed.

        - `after: optional string`

          The ID of another rule to place the rule after. An empty value causes the rule to be placed at the bottom.

      - `IndexPosition object { index }`

        An object configuring where the rule will be placed.

        - `index: optional number`

          An index at which to place the rule, where index 1 is the first rule.

  - `RouteRule = RouteRule`

    - `position: optional object { before }  or object { after }  or object { index }`

      An object configuring where the rule will be placed.

      - `BeforePosition object { before }`

        An object configuring where the rule will be placed.

        - `before: optional string`

          The ID of another rule to place the rule before. An empty value causes the rule to be placed at the top.

      - `AfterPosition object { after }`

        An object configuring where the rule will be placed.

        - `after: optional string`

          The ID of another rule to place the rule after. An empty value causes the rule to be placed at the bottom.

      - `IndexPosition object { index }`

        An object configuring where the rule will be placed.

        - `index: optional number`

          An index at which to place the rule, where index 1 is the first rule.

  - `ScoreRule = ScoreRule`

    - `position: optional object { before }  or object { after }  or object { index }`

      An object configuring where the rule will be placed.

      - `BeforePosition object { before }`

        An object configuring where the rule will be placed.

        - `before: optional string`

          The ID of another rule to place the rule before. An empty value causes the rule to be placed at the top.

      - `AfterPosition object { after }`

        An object configuring where the rule will be placed.

        - `after: optional string`

          The ID of another rule to place the rule after. An empty value causes the rule to be placed at the bottom.

      - `IndexPosition object { index }`

        An object configuring where the rule will be placed.

        - `index: optional number`

          An index at which to place the rule, where index 1 is the first rule.

  - `ServeErrorRule = ServeErrorRule`

    - `position: optional object { before }  or object { after }  or object { index }`

      An object configuring where the rule will be placed.

      - `BeforePosition object { before }`

        An object configuring where the rule will be placed.

        - `before: optional string`

          The ID of another rule to place the rule before. An empty value causes the rule to be placed at the top.

      - `AfterPosition object { after }`

        An object configuring where the rule will be placed.

        - `after: optional string`

          The ID of another rule to place the rule after. An empty value causes the rule to be placed at the bottom.

      - `IndexPosition object { index }`

        An object configuring where the rule will be placed.

        - `index: optional number`

          An index at which to place the rule, where index 1 is the first rule.

  - `SetCacheControlRule object { last_updated, version, id, 11 more }`

    - `last_updated: string`

      The timestamp of when the rule was last modified.

    - `version: string`

      The version of the rule.

    - `id: optional string`

      The unique ID of the rule.

    - `action: optional "set_cache_control"`

      The action to perform when the rule matches.

      - `"set_cache_control"`

    - `action_parameters: optional object { immutable, "max-age", "must-revalidate", 10 more }`

      The parameters configuring the rule's action.

      - `immutable: optional object { operation, cloudflare_only }  or object { operation, cloudflare_only }`

        A cache-control directive configuration.

        - `SetDirective object { operation, cloudflare_only }`

          Set the directive.

          - `operation: "set" or "remove"`

            The operation to perform on the cache-control directive.

            - `"set"`

            - `"remove"`

          - `cloudflare_only: optional boolean`

            Whether the directive should only be applied to the Cloudflare CDN cache.

        - `RemoveDirective object { operation, cloudflare_only }`

          Remove the directive.

          - `operation: "set" or "remove"`

            The operation to perform on the cache-control directive.

            - `"set"`

            - `"remove"`

          - `cloudflare_only: optional boolean`

            Whether the directive should only be applied to the Cloudflare CDN cache.

      - `"max-age": optional object { operation, value, cloudflare_only }  or object { operation, cloudflare_only }`

        A cache-control directive configuration that accepts a duration value in seconds.

        - `SetDirective object { operation, value, cloudflare_only }`

          Set the directive with a duration value in seconds.

          - `operation: "set" or "remove"`

            The operation to perform on the cache-control directive.

            - `"set"`

            - `"remove"`

          - `value: number`

            The duration value in seconds for the directive.

          - `cloudflare_only: optional boolean`

            Whether the directive should only be applied to the Cloudflare CDN cache.

        - `RemoveDirective object { operation, cloudflare_only }`

          Remove the directive.

          - `operation: "set" or "remove"`

            The operation to perform on the cache-control directive.

            - `"set"`

            - `"remove"`

          - `cloudflare_only: optional boolean`

            Whether the directive should only be applied to the Cloudflare CDN cache.

      - `"must-revalidate": optional object { operation, cloudflare_only }  or object { operation, cloudflare_only }`

        A cache-control directive configuration.

        - `SetDirective object { operation, cloudflare_only }`

          Set the directive.

          - `operation: "set" or "remove"`

            The operation to perform on the cache-control directive.

            - `"set"`

            - `"remove"`

          - `cloudflare_only: optional boolean`

            Whether the directive should only be applied to the Cloudflare CDN cache.

        - `RemoveDirective object { operation, cloudflare_only }`

          Remove the directive.

          - `operation: "set" or "remove"`

            The operation to perform on the cache-control directive.

            - `"set"`

            - `"remove"`

          - `cloudflare_only: optional boolean`

            Whether the directive should only be applied to the Cloudflare CDN cache.

      - `"must-understand": optional object { operation, cloudflare_only }  or object { operation, cloudflare_only }`

        A cache-control directive configuration.

        - `SetDirective object { operation, cloudflare_only }`

          Set the directive.

          - `operation: "set" or "remove"`

            The operation to perform on the cache-control directive.

            - `"set"`

            - `"remove"`

          - `cloudflare_only: optional boolean`

            Whether the directive should only be applied to the Cloudflare CDN cache.

        - `RemoveDirective object { operation, cloudflare_only }`

          Remove the directive.

          - `operation: "set" or "remove"`

            The operation to perform on the cache-control directive.

            - `"set"`

            - `"remove"`

          - `cloudflare_only: optional boolean`

            Whether the directive should only be applied to the Cloudflare CDN cache.

      - `"no-cache": optional object { operation, cloudflare_only, qualifiers }  or object { operation, cloudflare_only }`

        A cache-control directive configuration that accepts optional qualifiers (header names).

        - `SetDirective object { operation, cloudflare_only, qualifiers }`

          Set the directive with optional qualifiers.

          - `operation: "set" or "remove"`

            The operation to perform on the cache-control directive.

            - `"set"`

            - `"remove"`

          - `cloudflare_only: optional boolean`

            Whether the directive should only be applied to the Cloudflare CDN cache.

          - `qualifiers: optional array of string`

            Optional list of header names to qualify the directive (e.g., for "private" or "no-cache" directives).

        - `RemoveDirective object { operation, cloudflare_only }`

          Remove the directive.

          - `operation: "set" or "remove"`

            The operation to perform on the cache-control directive.

            - `"set"`

            - `"remove"`

          - `cloudflare_only: optional boolean`

            Whether the directive should only be applied to the Cloudflare CDN cache.

      - `"no-store": optional object { operation, cloudflare_only }  or object { operation, cloudflare_only }`

        A cache-control directive configuration.

        - `SetDirective object { operation, cloudflare_only }`

          Set the directive.

          - `operation: "set" or "remove"`

            The operation to perform on the cache-control directive.

            - `"set"`

            - `"remove"`

          - `cloudflare_only: optional boolean`

            Whether the directive should only be applied to the Cloudflare CDN cache.

        - `RemoveDirective object { operation, cloudflare_only }`

          Remove the directive.

          - `operation: "set" or "remove"`

            The operation to perform on the cache-control directive.

            - `"set"`

            - `"remove"`

          - `cloudflare_only: optional boolean`

            Whether the directive should only be applied to the Cloudflare CDN cache.

      - `"no-transform": optional object { operation, cloudflare_only }  or object { operation, cloudflare_only }`

        A cache-control directive configuration.

        - `SetDirective object { operation, cloudflare_only }`

          Set the directive.

          - `operation: "set" or "remove"`

            The operation to perform on the cache-control directive.

            - `"set"`

            - `"remove"`

          - `cloudflare_only: optional boolean`

            Whether the directive should only be applied to the Cloudflare CDN cache.

        - `RemoveDirective object { operation, cloudflare_only }`

          Remove the directive.

          - `operation: "set" or "remove"`

            The operation to perform on the cache-control directive.

            - `"set"`

            - `"remove"`

          - `cloudflare_only: optional boolean`

            Whether the directive should only be applied to the Cloudflare CDN cache.

      - `private: optional object { operation, cloudflare_only, qualifiers }  or object { operation, cloudflare_only }`

        A cache-control directive configuration that accepts optional qualifiers (header names).

        - `SetDirective object { operation, cloudflare_only, qualifiers }`

          Set the directive with optional qualifiers.

          - `operation: "set" or "remove"`

            The operation to perform on the cache-control directive.

            - `"set"`

            - `"remove"`

          - `cloudflare_only: optional boolean`

            Whether the directive should only be applied to the Cloudflare CDN cache.

          - `qualifiers: optional array of string`

            Optional list of header names to qualify the directive (e.g., for "private" or "no-cache" directives).

        - `RemoveDirective object { operation, cloudflare_only }`

          Remove the directive.

          - `operation: "set" or "remove"`

            The operation to perform on the cache-control directive.

            - `"set"`

            - `"remove"`

          - `cloudflare_only: optional boolean`

            Whether the directive should only be applied to the Cloudflare CDN cache.

      - `"proxy-revalidate": optional object { operation, cloudflare_only }  or object { operation, cloudflare_only }`

        A cache-control directive configuration.

        - `SetDirective object { operation, cloudflare_only }`

          Set the directive.

          - `operation: "set" or "remove"`

            The operation to perform on the cache-control directive.

            - `"set"`

            - `"remove"`

          - `cloudflare_only: optional boolean`

            Whether the directive should only be applied to the Cloudflare CDN cache.

        - `RemoveDirective object { operation, cloudflare_only }`

          Remove the directive.

          - `operation: "set" or "remove"`

            The operation to perform on the cache-control directive.

            - `"set"`

            - `"remove"`

          - `cloudflare_only: optional boolean`

            Whether the directive should only be applied to the Cloudflare CDN cache.

      - `public: optional object { operation, cloudflare_only }  or object { operation, cloudflare_only }`

        A cache-control directive configuration.

        - `SetDirective object { operation, cloudflare_only }`

          Set the directive.

          - `operation: "set" or "remove"`

            The operation to perform on the cache-control directive.

            - `"set"`

            - `"remove"`

          - `cloudflare_only: optional boolean`

            Whether the directive should only be applied to the Cloudflare CDN cache.

        - `RemoveDirective object { operation, cloudflare_only }`

          Remove the directive.

          - `operation: "set" or "remove"`

            The operation to perform on the cache-control directive.

            - `"set"`

            - `"remove"`

          - `cloudflare_only: optional boolean`

            Whether the directive should only be applied to the Cloudflare CDN cache.

      - `"s-maxage": optional object { operation, value, cloudflare_only }  or object { operation, cloudflare_only }`

        A cache-control directive configuration that accepts a duration value in seconds.

        - `SetDirective object { operation, value, cloudflare_only }`

          Set the directive with a duration value in seconds.

          - `operation: "set" or "remove"`

            The operation to perform on the cache-control directive.

            - `"set"`

            - `"remove"`

          - `value: number`

            The duration value in seconds for the directive.

          - `cloudflare_only: optional boolean`

            Whether the directive should only be applied to the Cloudflare CDN cache.

        - `RemoveDirective object { operation, cloudflare_only }`

          Remove the directive.

          - `operation: "set" or "remove"`

            The operation to perform on the cache-control directive.

            - `"set"`

            - `"remove"`

          - `cloudflare_only: optional boolean`

            Whether the directive should only be applied to the Cloudflare CDN cache.

      - `"stale-if-error": optional object { operation, value, cloudflare_only }  or object { operation, cloudflare_only }`

        A cache-control directive configuration that accepts a duration value in seconds.

        - `SetDirective object { operation, value, cloudflare_only }`

          Set the directive with a duration value in seconds.

          - `operation: "set" or "remove"`

            The operation to perform on the cache-control directive.

            - `"set"`

            - `"remove"`

          - `value: number`

            The duration value in seconds for the directive.

          - `cloudflare_only: optional boolean`

            Whether the directive should only be applied to the Cloudflare CDN cache.

        - `RemoveDirective object { operation, cloudflare_only }`

          Remove the directive.

          - `operation: "set" or "remove"`

            The operation to perform on the cache-control directive.

            - `"set"`

            - `"remove"`

          - `cloudflare_only: optional boolean`

            Whether the directive should only be applied to the Cloudflare CDN cache.

      - `"stale-while-revalidate": optional object { operation, value, cloudflare_only }  or object { operation, cloudflare_only }`

        A cache-control directive configuration that accepts a duration value in seconds.

        - `SetDirective object { operation, value, cloudflare_only }`

          Set the directive with a duration value in seconds.

          - `operation: "set" or "remove"`

            The operation to perform on the cache-control directive.

            - `"set"`

            - `"remove"`

          - `value: number`

            The duration value in seconds for the directive.

          - `cloudflare_only: optional boolean`

            Whether the directive should only be applied to the Cloudflare CDN cache.

        - `RemoveDirective object { operation, cloudflare_only }`

          Remove the directive.

          - `operation: "set" or "remove"`

            The operation to perform on the cache-control directive.

            - `"set"`

            - `"remove"`

          - `cloudflare_only: optional boolean`

            Whether the directive should only be applied to the Cloudflare CDN cache.

    - `categories: optional array of string`

      The categories of the rule.

    - `description: optional string`

      An informative description of the rule.

    - `enabled: optional boolean`

      Whether the rule should be executed.

    - `exposed_credential_check: optional object { password_expression, username_expression }`

      Configuration for exposed credential checking.

      - `password_expression: string`

        An expression that selects the password used in the credentials check.

      - `username_expression: string`

        An expression that selects the user ID used in the credentials check.

    - `expression: optional string`

      The expression defining which traffic will match the rule.

    - `logging: optional Logging`

      An object configuring the rule's logging behavior.

    - `position: optional object { before }  or object { after }  or object { index }`

      An object configuring where the rule will be placed.

      - `BeforePosition object { before }`

        An object configuring where the rule will be placed.

        - `before: optional string`

          The ID of another rule to place the rule before. An empty value causes the rule to be placed at the top.

      - `AfterPosition object { after }`

        An object configuring where the rule will be placed.

        - `after: optional string`

          The ID of another rule to place the rule after. An empty value causes the rule to be placed at the bottom.

      - `IndexPosition object { index }`

        An object configuring where the rule will be placed.

        - `index: optional number`

          An index at which to place the rule, where index 1 is the first rule.

    - `ratelimit: optional object { characteristics, period, counting_expression, 5 more }`

      An object configuring the rule's rate limit behavior.

      - `characteristics: array of string`

        Characteristics of the request on which the rate limit counter will be incremented.

      - `period: number`

        Period in seconds over which the counter is being incremented.

      - `counting_expression: optional string`

        An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule's expression.

      - `mitigation_timeout: optional number`

        Period of time in seconds after which the action will be disabled following its first execution.

      - `requests_per_period: optional number`

        The threshold of requests per period after which the action will be executed for the first time.

      - `requests_to_origin: optional boolean`

        Whether counting is only performed when an origin is reached.

      - `score_per_period: optional number`

        The score threshold per period for which the action will be executed the first time.

      - `score_response_header_name: optional string`

        A response header name provided by the origin, which contains the score to increment rate limit counter with.

    - `ref: optional string`

      The reference of the rule (the rule's ID by default).

  - `SetCacheSettingsRule = SetCacheSettingsRule`

    - `position: optional object { before }  or object { after }  or object { index }`

      An object configuring where the rule will be placed.

      - `BeforePosition object { before }`

        An object configuring where the rule will be placed.

        - `before: optional string`

          The ID of another rule to place the rule before. An empty value causes the rule to be placed at the top.

      - `AfterPosition object { after }`

        An object configuring where the rule will be placed.

        - `after: optional string`

          The ID of another rule to place the rule after. An empty value causes the rule to be placed at the bottom.

      - `IndexPosition object { index }`

        An object configuring where the rule will be placed.

        - `index: optional number`

          An index at which to place the rule, where index 1 is the first rule.

  - `SetCacheTagsRule object { last_updated, version, id, 11 more }`

    - `last_updated: string`

      The timestamp of when the rule was last modified.

    - `version: string`

      The version of the rule.

    - `id: optional string`

      The unique ID of the rule.

    - `action: optional "set_cache_tags"`

      The action to perform when the rule matches.

      - `"set_cache_tags"`

    - `action_parameters: optional object { operation, values }  or object { expression, operation }  or object { operation, values }  or 3 more`

      The parameters configuring the rule's action.

      - `AddCacheTagsValues object { operation, values }`

        Add cache tags using a list of values.

        - `operation: "add" or "remove" or "set"`

          The operation to perform on the cache tags.

          - `"add"`

          - `"remove"`

          - `"set"`

        - `values: array of string`

          A list of cache tag values.

      - `AddCacheTagsExpression object { expression, operation }`

        Add cache tags using an expression.

        - `expression: string`

          An expression that evaluates to an array of cache tag values.

        - `operation: "add" or "remove" or "set"`

          The operation to perform on the cache tags.

          - `"add"`

          - `"remove"`

          - `"set"`

      - `RemoveCacheTagsValues object { operation, values }`

        Remove cache tags using a list of values.

        - `operation: "add" or "remove" or "set"`

          The operation to perform on the cache tags.

          - `"add"`

          - `"remove"`

          - `"set"`

        - `values: array of string`

          A list of cache tag values.

      - `RemoveCacheTagsExpression object { expression, operation }`

        Remove cache tags using an expression.

        - `expression: string`

          An expression that evaluates to an array of cache tag values.

        - `operation: "add" or "remove" or "set"`

          The operation to perform on the cache tags.

          - `"add"`

          - `"remove"`

          - `"set"`

      - `SetCacheTagsValues object { operation, values }`

        Set cache tags using a list of values.

        - `operation: "add" or "remove" or "set"`

          The operation to perform on the cache tags.

          - `"add"`

          - `"remove"`

          - `"set"`

        - `values: array of string`

          A list of cache tag values.

      - `SetCacheTagsExpression object { expression, operation }`

        Set cache tags using an expression.

        - `expression: string`

          An expression that evaluates to an array of cache tag values.

        - `operation: "add" or "remove" or "set"`

          The operation to perform on the cache tags.

          - `"add"`

          - `"remove"`

          - `"set"`

    - `categories: optional array of string`

      The categories of the rule.

    - `description: optional string`

      An informative description of the rule.

    - `enabled: optional boolean`

      Whether the rule should be executed.

    - `exposed_credential_check: optional object { password_expression, username_expression }`

      Configuration for exposed credential checking.

      - `password_expression: string`

        An expression that selects the password used in the credentials check.

      - `username_expression: string`

        An expression that selects the user ID used in the credentials check.

    - `expression: optional string`

      The expression defining which traffic will match the rule.

    - `logging: optional Logging`

      An object configuring the rule's logging behavior.

    - `position: optional object { before }  or object { after }  or object { index }`

      An object configuring where the rule will be placed.

      - `BeforePosition object { before }`

        An object configuring where the rule will be placed.

        - `before: optional string`

          The ID of another rule to place the rule before. An empty value causes the rule to be placed at the top.

      - `AfterPosition object { after }`

        An object configuring where the rule will be placed.

        - `after: optional string`

          The ID of another rule to place the rule after. An empty value causes the rule to be placed at the bottom.

      - `IndexPosition object { index }`

        An object configuring where the rule will be placed.

        - `index: optional number`

          An index at which to place the rule, where index 1 is the first rule.

    - `ratelimit: optional object { characteristics, period, counting_expression, 5 more }`

      An object configuring the rule's rate limit behavior.

      - `characteristics: array of string`

        Characteristics of the request on which the rate limit counter will be incremented.

      - `period: number`

        Period in seconds over which the counter is being incremented.

      - `counting_expression: optional string`

        An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule's expression.

      - `mitigation_timeout: optional number`

        Period of time in seconds after which the action will be disabled following its first execution.

      - `requests_per_period: optional number`

        The threshold of requests per period after which the action will be executed for the first time.

      - `requests_to_origin: optional boolean`

        Whether counting is only performed when an origin is reached.

      - `score_per_period: optional number`

        The score threshold per period for which the action will be executed the first time.

      - `score_response_header_name: optional string`

        A response header name provided by the origin, which contains the score to increment rate limit counter with.

    - `ref: optional string`

      The reference of the rule (the rule's ID by default).

  - `SetConfigurationRule = SetConfigRule`

    - `position: optional object { before }  or object { after }  or object { index }`

      An object configuring where the rule will be placed.

      - `BeforePosition object { before }`

        An object configuring where the rule will be placed.

        - `before: optional string`

          The ID of another rule to place the rule before. An empty value causes the rule to be placed at the top.

      - `AfterPosition object { after }`

        An object configuring where the rule will be placed.

        - `after: optional string`

          The ID of another rule to place the rule after. An empty value causes the rule to be placed at the bottom.

      - `IndexPosition object { index }`

        An object configuring where the rule will be placed.

        - `index: optional number`

          An index at which to place the rule, where index 1 is the first rule.

  - `SkipRule = SkipRule`

    - `position: optional object { before }  or object { after }  or object { index }`

      An object configuring where the rule will be placed.

      - `BeforePosition object { before }`

        An object configuring where the rule will be placed.

        - `before: optional string`

          The ID of another rule to place the rule before. An empty value causes the rule to be placed at the top.

      - `AfterPosition object { after }`

        An object configuring where the rule will be placed.

        - `after: optional string`

          The ID of another rule to place the rule after. An empty value causes the rule to be placed at the bottom.

      - `IndexPosition object { index }`

        An object configuring where the rule will be placed.

        - `index: optional number`

          An index at which to place the rule, where index 1 is the first rule.

  - `TransformResponseHTMLRule object { last_updated, version, id, 11 more }`

    - `last_updated: string`

      The timestamp of when the rule was last modified.

    - `version: string`

      The version of the rule.

    - `id: optional string`

      The unique ID of the rule.

    - `action: optional "transform_response_html"`

      The action to perform when the rule matches.

      - `"transform_response_html"`

    - `action_parameters: optional object { link_maze }`

      The parameters configuring the rule's action.

      - `link_maze: unknown`

        Enables the link maze transformation on the response.

    - `categories: optional array of string`

      The categories of the rule.

    - `description: optional string`

      An informative description of the rule.

    - `enabled: optional boolean`

      Whether the rule should be executed.

    - `exposed_credential_check: optional object { password_expression, username_expression }`

      Configuration for exposed credential checking.

      - `password_expression: string`

        An expression that selects the password used in the credentials check.

      - `username_expression: string`

        An expression that selects the user ID used in the credentials check.

    - `expression: optional string`

      The expression defining which traffic will match the rule.

    - `logging: optional Logging`

      An object configuring the rule's logging behavior.

    - `position: optional object { before }  or object { after }  or object { index }`

      An object configuring where the rule will be placed.

      - `BeforePosition object { before }`

        An object configuring where the rule will be placed.

        - `before: optional string`

          The ID of another rule to place the rule before. An empty value causes the rule to be placed at the top.

      - `AfterPosition object { after }`

        An object configuring where the rule will be placed.

        - `after: optional string`

          The ID of another rule to place the rule after. An empty value causes the rule to be placed at the bottom.

      - `IndexPosition object { index }`

        An object configuring where the rule will be placed.

        - `index: optional number`

          An index at which to place the rule, where index 1 is the first rule.

    - `ratelimit: optional object { characteristics, period, counting_expression, 5 more }`

      An object configuring the rule's rate limit behavior.

      - `characteristics: array of string`

        Characteristics of the request on which the rate limit counter will be incremented.

      - `period: number`

        Period in seconds over which the counter is being incremented.

      - `counting_expression: optional string`

        An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule's expression.

      - `mitigation_timeout: optional number`

        Period of time in seconds after which the action will be disabled following its first execution.

      - `requests_per_period: optional number`

        The threshold of requests per period after which the action will be executed for the first time.

      - `requests_to_origin: optional boolean`

        Whether counting is only performed when an origin is reached.

      - `score_per_period: optional number`

        The score threshold per period for which the action will be executed the first time.

      - `score_response_header_name: optional string`

        A response header name provided by the origin, which contains the score to increment rate limit counter with.

    - `ref: optional string`

      The reference of the rule (the rule's ID by default).

### Returns

- `errors: array of object { message, code, source }`

  A list of error messages.

  - `message: string`

    A text description of this message.

  - `code: optional number`

    A unique code for this message.

  - `source: optional object { pointer }`

    The source of this message.

    - `pointer: string`

      A JSON pointer to the field that is the source of the message.

- `messages: array of object { message, code, source }`

  A list of warning messages.

  - `message: string`

    A text description of this message.

  - `code: optional number`

    A unique code for this message.

  - `source: optional object { pointer }`

    The source of this message.

    - `pointer: string`

      A JSON pointer to the field that is the source of the message.

- `result: object { id, kind, last_updated, 5 more }`

  A ruleset object.

  - `id: string`

    The unique ID of the ruleset.

  - `kind: Kind`

    The kind of the ruleset.

    - `"managed"`

    - `"custom"`

    - `"root"`

    - `"zone"`

  - `last_updated: string`

    The timestamp of when the ruleset was last modified.

  - `name: string`

    The human-readable name of the ruleset.

  - `phase: Phase`

    The phase of the ruleset.

    - `"ddos_l4"`

    - `"ddos_l7"`

    - `"http_config_settings"`

    - `"http_custom_errors"`

    - `"http_log_custom_fields"`

    - `"http_ratelimit"`

    - `"http_request_cache_settings"`

    - `"http_request_dynamic_redirect"`

    - `"http_request_firewall_custom"`

    - `"http_request_firewall_managed"`

    - `"http_request_late_transform"`

    - `"http_request_origin"`

    - `"http_request_redirect"`

    - `"http_request_sanitize"`

    - `"http_request_sbfm"`

    - `"http_request_transform"`

    - `"http_response_cache_settings"`

    - `"http_response_compression"`

    - `"http_response_firewall_managed"`

    - `"http_response_headers_transform"`

    - `"magic_transit"`

    - `"magic_transit_ids_managed"`

    - `"magic_transit_managed"`

    - `"magic_transit_ratelimit"`

  - `rules: array of BlockRule or object { last_updated, version, id, 10 more }  or CompressResponseRule or 18 more`

    The list of rules in the ruleset.

    - `BlockRule object { last_updated, version, id, 10 more }`

      - `last_updated: string`

        The timestamp of when the rule was last modified.

      - `version: string`

        The version of the rule.

      - `id: optional string`

        The unique ID of the rule.

      - `action: optional "block"`

        The action to perform when the rule matches.

        - `"block"`

      - `action_parameters: optional object { response }`

        The parameters configuring the rule's action.

        - `response: optional object { content, content_type, status_code }`

          The response to show when the block is applied.

          - `content: string`

            The content to return.

          - `content_type: string`

            The type of the content to return.

          - `status_code: number`

            The status code to return.

      - `categories: optional array of string`

        The categories of the rule.

      - `description: optional string`

        An informative description of the rule.

      - `enabled: optional boolean`

        Whether the rule should be executed.

      - `exposed_credential_check: optional object { password_expression, username_expression }`

        Configuration for exposed credential checking.

        - `password_expression: string`

          An expression that selects the password used in the credentials check.

        - `username_expression: string`

          An expression that selects the user ID used in the credentials check.

      - `expression: optional string`

        The expression defining which traffic will match the rule.

      - `logging: optional Logging`

        An object configuring the rule's logging behavior.

        - `enabled: boolean`

          Whether to generate a log when the rule matches.

      - `ratelimit: optional object { characteristics, period, counting_expression, 5 more }`

        An object configuring the rule's rate limit behavior.

        - `characteristics: array of string`

          Characteristics of the request on which the rate limit counter will be incremented.

        - `period: number`

          Period in seconds over which the counter is being incremented.

        - `counting_expression: optional string`

          An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule's expression.

        - `mitigation_timeout: optional number`

          Period of time in seconds after which the action will be disabled following its first execution.

        - `requests_per_period: optional number`

          The threshold of requests per period after which the action will be executed for the first time.

        - `requests_to_origin: optional boolean`

          Whether counting is only performed when an origin is reached.

        - `score_per_period: optional number`

          The score threshold per period for which the action will be executed the first time.

        - `score_response_header_name: optional string`

          A response header name provided by the origin, which contains the score to increment rate limit counter with.

      - `ref: optional string`

        The reference of the rule (the rule's ID by default).

    - `Challenge object { last_updated, version, id, 10 more }`

      - `last_updated: string`

        The timestamp of when the rule was last modified.

      - `version: string`

        The version of the rule.

      - `id: optional string`

        The unique ID of the rule.

      - `action: optional "challenge"`

        The action to perform when the rule matches.

        - `"challenge"`

      - `action_parameters: optional unknown`

        The parameters configuring the rule's action.

      - `categories: optional array of string`

        The categories of the rule.

      - `description: optional string`

        An informative description of the rule.

      - `enabled: optional boolean`

        Whether the rule should be executed.

      - `exposed_credential_check: optional object { password_expression, username_expression }`

        Configuration for exposed credential checking.

        - `password_expression: string`

          An expression that selects the password used in the credentials check.

        - `username_expression: string`

          An expression that selects the user ID used in the credentials check.

      - `expression: optional string`

        The expression defining which traffic will match the rule.

      - `logging: optional Logging`

        An object configuring the rule's logging behavior.

      - `ratelimit: optional object { characteristics, period, counting_expression, 5 more }`

        An object configuring the rule's rate limit behavior.

        - `characteristics: array of string`

          Characteristics of the request on which the rate limit counter will be incremented.

        - `period: number`

          Period in seconds over which the counter is being incremented.

        - `counting_expression: optional string`

          An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule's expression.

        - `mitigation_timeout: optional number`

          Period of time in seconds after which the action will be disabled following its first execution.

        - `requests_per_period: optional number`

          The threshold of requests per period after which the action will be executed for the first time.

        - `requests_to_origin: optional boolean`

          Whether counting is only performed when an origin is reached.

        - `score_per_period: optional number`

          The score threshold per period for which the action will be executed the first time.

        - `score_response_header_name: optional string`

          A response header name provided by the origin, which contains the score to increment rate limit counter with.

      - `ref: optional string`

        The reference of the rule (the rule's ID by default).

    - `CompressResponseRule object { last_updated, version, id, 10 more }`

      - `last_updated: string`

        The timestamp of when the rule was last modified.

      - `version: string`

        The version of the rule.

      - `id: optional string`

        The unique ID of the rule.

      - `action: optional "compress_response"`

        The action to perform when the rule matches.

        - `"compress_response"`

      - `action_parameters: optional object { algorithms }`

        The parameters configuring the rule's action.

        - `algorithms: array of object { name }`

          Custom order for compression algorithms.

          - `name: optional "none" or "auto" or "default" or 3 more`

            Name of the compression algorithm to enable.

            - `"none"`

            - `"auto"`

            - `"default"`

            - `"gzip"`

            - `"brotli"`

            - `"zstd"`

      - `categories: optional array of string`

        The categories of the rule.

      - `description: optional string`

        An informative description of the rule.

      - `enabled: optional boolean`

        Whether the rule should be executed.

      - `exposed_credential_check: optional object { password_expression, username_expression }`

        Configuration for exposed credential checking.

        - `password_expression: string`

          An expression that selects the password used in the credentials check.

        - `username_expression: string`

          An expression that selects the user ID used in the credentials check.

      - `expression: optional string`

        The expression defining which traffic will match the rule.

      - `logging: optional Logging`

        An object configuring the rule's logging behavior.

      - `ratelimit: optional object { characteristics, period, counting_expression, 5 more }`

        An object configuring the rule's rate limit behavior.

        - `characteristics: array of string`

          Characteristics of the request on which the rate limit counter will be incremented.

        - `period: number`

          Period in seconds over which the counter is being incremented.

        - `counting_expression: optional string`

          An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule's expression.

        - `mitigation_timeout: optional number`

          Period of time in seconds after which the action will be disabled following its first execution.

        - `requests_per_period: optional number`

          The threshold of requests per period after which the action will be executed for the first time.

        - `requests_to_origin: optional boolean`

          Whether counting is only performed when an origin is reached.

        - `score_per_period: optional number`

          The score threshold per period for which the action will be executed the first time.

        - `score_response_header_name: optional string`

          A response header name provided by the origin, which contains the score to increment rate limit counter with.

      - `ref: optional string`

        The reference of the rule (the rule's ID by default).

    - `DDoSDynamicRule object { last_updated, version, id, 10 more }`

      - `last_updated: string`

        The timestamp of when the rule was last modified.

      - `version: string`

        The version of the rule.

      - `id: optional string`

        The unique ID of the rule.

      - `action: optional "ddos_dynamic"`

        The action to perform when the rule matches.

        - `"ddos_dynamic"`

      - `action_parameters: optional unknown`

        The parameters configuring the rule's action.

      - `categories: optional array of string`

        The categories of the rule.

      - `description: optional string`

        An informative description of the rule.

      - `enabled: optional boolean`

        Whether the rule should be executed.

      - `exposed_credential_check: optional object { password_expression, username_expression }`

        Configuration for exposed credential checking.

        - `password_expression: string`

          An expression that selects the password used in the credentials check.

        - `username_expression: string`

          An expression that selects the user ID used in the credentials check.

      - `expression: optional string`

        The expression defining which traffic will match the rule.

      - `logging: optional Logging`

        An object configuring the rule's logging behavior.

      - `ratelimit: optional object { characteristics, period, counting_expression, 5 more }`

        An object configuring the rule's rate limit behavior.

        - `characteristics: array of string`

          Characteristics of the request on which the rate limit counter will be incremented.

        - `period: number`

          Period in seconds over which the counter is being incremented.

        - `counting_expression: optional string`

          An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule's expression.

        - `mitigation_timeout: optional number`

          Period of time in seconds after which the action will be disabled following its first execution.

        - `requests_per_period: optional number`

          The threshold of requests per period after which the action will be executed for the first time.

        - `requests_to_origin: optional boolean`

          Whether counting is only performed when an origin is reached.

        - `score_per_period: optional number`

          The score threshold per period for which the action will be executed the first time.

        - `score_response_header_name: optional string`

          A response header name provided by the origin, which contains the score to increment rate limit counter with.

      - `ref: optional string`

        The reference of the rule (the rule's ID by default).

    - `ExecuteRule object { last_updated, version, id, 10 more }`

      - `last_updated: string`

        The timestamp of when the rule was last modified.

      - `version: string`

        The version of the rule.

      - `id: optional string`

        The unique ID of the rule.

      - `action: optional "execute"`

        The action to perform when the rule matches.

        - `"execute"`

      - `action_parameters: optional object { id, matched_data, overrides }`

        The parameters configuring the rule's action.

        - `id: string`

          The ID of the ruleset to execute.

        - `matched_data: optional object { public_key }`

          The configuration to use for matched data logging.

          - `public_key: string`

            The public key to encrypt matched data logs with.

        - `overrides: optional object { action, categories, enabled, 2 more }`

          A set of overrides to apply to the target ruleset.

          - `action: optional string`

            An action to override all rules with. This option has lower precedence than rule and category overrides.

          - `categories: optional array of object { category, action, enabled, sensitivity_level }`

            A list of category-level overrides. This option has the second-highest precedence after rule-level overrides.

            - `category: string`

              The name of the category to override.

            - `action: optional string`

              The action to override rules in the category with.

            - `enabled: optional boolean`

              Whether to enable execution of rules in the category.

            - `sensitivity_level: optional "default" or "medium" or "low" or "eoff"`

              The sensitivity level to use for rules in the category. This option is only applicable for DDoS phases.

              - `"default"`

              - `"medium"`

              - `"low"`

              - `"eoff"`

          - `enabled: optional boolean`

            Whether to enable execution of all rules. This option has lower precedence than rule and category overrides.

          - `rules: optional array of object { id, action, enabled, 2 more }`

            A list of rule-level overrides. This option has the highest precedence.

            - `id: string`

              The ID of the rule to override.

            - `action: optional string`

              The action to override the rule with.

            - `enabled: optional boolean`

              Whether to enable execution of the rule.

            - `score_threshold: optional number`

              The score threshold to use for the rule.

            - `sensitivity_level: optional "default" or "medium" or "low" or "eoff"`

              The sensitivity level to use for the rule. This option is only applicable for DDoS phases.

              - `"default"`

              - `"medium"`

              - `"low"`

              - `"eoff"`

          - `sensitivity_level: optional "default" or "medium" or "low" or "eoff"`

            A sensitivity level to set for all rules. This option has lower precedence than rule and category overrides and is only applicable for DDoS phases.

            - `"default"`

            - `"medium"`

            - `"low"`

            - `"eoff"`

      - `categories: optional array of string`

        The categories of the rule.

      - `description: optional string`

        An informative description of the rule.

      - `enabled: optional boolean`

        Whether the rule should be executed.

      - `exposed_credential_check: optional object { password_expression, username_expression }`

        Configuration for exposed credential checking.

        - `password_expression: string`

          An expression that selects the password used in the credentials check.

        - `username_expression: string`

          An expression that selects the user ID used in the credentials check.

      - `expression: optional string`

        The expression defining which traffic will match the rule.

      - `logging: optional Logging`

        An object configuring the rule's logging behavior.

      - `ratelimit: optional object { characteristics, period, counting_expression, 5 more }`

        An object configuring the rule's rate limit behavior.

        - `characteristics: array of string`

          Characteristics of the request on which the rate limit counter will be incremented.

        - `period: number`

          Period in seconds over which the counter is being incremented.

        - `counting_expression: optional string`

          An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule's expression.

        - `mitigation_timeout: optional number`

          Period of time in seconds after which the action will be disabled following its first execution.

        - `requests_per_period: optional number`

          The threshold of requests per period after which the action will be executed for the first time.

        - `requests_to_origin: optional boolean`

          Whether counting is only performed when an origin is reached.

        - `score_per_period: optional number`

          The score threshold per period for which the action will be executed the first time.

        - `score_response_header_name: optional string`

          A response header name provided by the origin, which contains the score to increment rate limit counter with.

      - `ref: optional string`

        The reference of the rule (the rule's ID by default).

    - `ForceConnectionCloseRule object { last_updated, version, id, 10 more }`

      - `last_updated: string`

        The timestamp of when the rule was last modified.

      - `version: string`

        The version of the rule.

      - `id: optional string`

        The unique ID of the rule.

      - `action: optional "force_connection_close"`

        The action to perform when the rule matches.

        - `"force_connection_close"`

      - `action_parameters: optional unknown`

        The parameters configuring the rule's action.

      - `categories: optional array of string`

        The categories of the rule.

      - `description: optional string`

        An informative description of the rule.

      - `enabled: optional boolean`

        Whether the rule should be executed.

      - `exposed_credential_check: optional object { password_expression, username_expression }`

        Configuration for exposed credential checking.

        - `password_expression: string`

          An expression that selects the password used in the credentials check.

        - `username_expression: string`

          An expression that selects the user ID used in the credentials check.

      - `expression: optional string`

        The expression defining which traffic will match the rule.

      - `logging: optional Logging`

        An object configuring the rule's logging behavior.

      - `ratelimit: optional object { characteristics, period, counting_expression, 5 more }`

        An object configuring the rule's rate limit behavior.

        - `characteristics: array of string`

          Characteristics of the request on which the rate limit counter will be incremented.

        - `period: number`

          Period in seconds over which the counter is being incremented.

        - `counting_expression: optional string`

          An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule's expression.

        - `mitigation_timeout: optional number`

          Period of time in seconds after which the action will be disabled following its first execution.

        - `requests_per_period: optional number`

          The threshold of requests per period after which the action will be executed for the first time.

        - `requests_to_origin: optional boolean`

          Whether counting is only performed when an origin is reached.

        - `score_per_period: optional number`

          The score threshold per period for which the action will be executed the first time.

        - `score_response_header_name: optional string`

          A response header name provided by the origin, which contains the score to increment rate limit counter with.

      - `ref: optional string`

        The reference of the rule (the rule's ID by default).

    - `JSChallenge object { last_updated, version, id, 10 more }`

      - `last_updated: string`

        The timestamp of when the rule was last modified.

      - `version: string`

        The version of the rule.

      - `id: optional string`

        The unique ID of the rule.

      - `action: optional "js_challenge"`

        The action to perform when the rule matches.

        - `"js_challenge"`

      - `action_parameters: optional unknown`

        The parameters configuring the rule's action.

      - `categories: optional array of string`

        The categories of the rule.

      - `description: optional string`

        An informative description of the rule.

      - `enabled: optional boolean`

        Whether the rule should be executed.

      - `exposed_credential_check: optional object { password_expression, username_expression }`

        Configuration for exposed credential checking.

        - `password_expression: string`

          An expression that selects the password used in the credentials check.

        - `username_expression: string`

          An expression that selects the user ID used in the credentials check.

      - `expression: optional string`

        The expression defining which traffic will match the rule.

      - `logging: optional Logging`

        An object configuring the rule's logging behavior.

      - `ratelimit: optional object { characteristics, period, counting_expression, 5 more }`

        An object configuring the rule's rate limit behavior.

        - `characteristics: array of string`

          Characteristics of the request on which the rate limit counter will be incremented.

        - `period: number`

          Period in seconds over which the counter is being incremented.

        - `counting_expression: optional string`

          An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule's expression.

        - `mitigation_timeout: optional number`

          Period of time in seconds after which the action will be disabled following its first execution.

        - `requests_per_period: optional number`

          The threshold of requests per period after which the action will be executed for the first time.

        - `requests_to_origin: optional boolean`

          Whether counting is only performed when an origin is reached.

        - `score_per_period: optional number`

          The score threshold per period for which the action will be executed the first time.

        - `score_response_header_name: optional string`

          A response header name provided by the origin, which contains the score to increment rate limit counter with.

      - `ref: optional string`

        The reference of the rule (the rule's ID by default).

    - `LogRule object { last_updated, version, id, 10 more }`

      - `last_updated: string`

        The timestamp of when the rule was last modified.

      - `version: string`

        The version of the rule.

      - `id: optional string`

        The unique ID of the rule.

      - `action: optional "log"`

        The action to perform when the rule matches.

        - `"log"`

      - `action_parameters: optional unknown`

        The parameters configuring the rule's action.

      - `categories: optional array of string`

        The categories of the rule.

      - `description: optional string`

        An informative description of the rule.

      - `enabled: optional boolean`

        Whether the rule should be executed.

      - `exposed_credential_check: optional object { password_expression, username_expression }`

        Configuration for exposed credential checking.

        - `password_expression: string`

          An expression that selects the password used in the credentials check.

        - `username_expression: string`

          An expression that selects the user ID used in the credentials check.

      - `expression: optional string`

        The expression defining which traffic will match the rule.

      - `logging: optional Logging`

        An object configuring the rule's logging behavior.

      - `ratelimit: optional object { characteristics, period, counting_expression, 5 more }`

        An object configuring the rule's rate limit behavior.

        - `characteristics: array of string`

          Characteristics of the request on which the rate limit counter will be incremented.

        - `period: number`

          Period in seconds over which the counter is being incremented.

        - `counting_expression: optional string`

          An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule's expression.

        - `mitigation_timeout: optional number`

          Period of time in seconds after which the action will be disabled following its first execution.

        - `requests_per_period: optional number`

          The threshold of requests per period after which the action will be executed for the first time.

        - `requests_to_origin: optional boolean`

          Whether counting is only performed when an origin is reached.

        - `score_per_period: optional number`

          The score threshold per period for which the action will be executed the first time.

        - `score_response_header_name: optional string`

          A response header name provided by the origin, which contains the score to increment rate limit counter with.

      - `ref: optional string`

        The reference of the rule (the rule's ID by default).

    - `LogCustomFieldRule object { last_updated, version, id, 10 more }`

      - `last_updated: string`

        The timestamp of when the rule was last modified.

      - `version: string`

        The version of the rule.

      - `id: optional string`

        The unique ID of the rule.

      - `action: optional "log_custom_field"`

        The action to perform when the rule matches.

        - `"log_custom_field"`

      - `action_parameters: optional object { cookie_fields, raw_response_fields, request_fields, 2 more }`

        The parameters configuring the rule's action.

        - `cookie_fields: optional array of object { name }`

          The cookie fields to log.

          - `name: string`

            The name of the cookie.

        - `raw_response_fields: optional array of object { name, preserve_duplicates }`

          The raw response fields to log.

          - `name: string`

            The name of the response header.

          - `preserve_duplicates: optional boolean`

            Whether to log duplicate values of the same header.

        - `request_fields: optional array of object { name }`

          The raw request fields to log.

          - `name: string`

            The name of the header.

        - `response_fields: optional array of object { name, preserve_duplicates }`

          The transformed response fields to log.

          - `name: string`

            The name of the response header.

          - `preserve_duplicates: optional boolean`

            Whether to log duplicate values of the same header.

        - `transformed_request_fields: optional array of object { name }`

          The transformed request fields to log.

          - `name: string`

            The name of the header.

      - `categories: optional array of string`

        The categories of the rule.

      - `description: optional string`

        An informative description of the rule.

      - `enabled: optional boolean`

        Whether the rule should be executed.

      - `exposed_credential_check: optional object { password_expression, username_expression }`

        Configuration for exposed credential checking.

        - `password_expression: string`

          An expression that selects the password used in the credentials check.

        - `username_expression: string`

          An expression that selects the user ID used in the credentials check.

      - `expression: optional string`

        The expression defining which traffic will match the rule.

      - `logging: optional Logging`

        An object configuring the rule's logging behavior.

      - `ratelimit: optional object { characteristics, period, counting_expression, 5 more }`

        An object configuring the rule's rate limit behavior.

        - `characteristics: array of string`

          Characteristics of the request on which the rate limit counter will be incremented.

        - `period: number`

          Period in seconds over which the counter is being incremented.

        - `counting_expression: optional string`

          An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule's expression.

        - `mitigation_timeout: optional number`

          Period of time in seconds after which the action will be disabled following its first execution.

        - `requests_per_period: optional number`

          The threshold of requests per period after which the action will be executed for the first time.

        - `requests_to_origin: optional boolean`

          Whether counting is only performed when an origin is reached.

        - `score_per_period: optional number`

          The score threshold per period for which the action will be executed the first time.

        - `score_response_header_name: optional string`

          A response header name provided by the origin, which contains the score to increment rate limit counter with.

      - `ref: optional string`

        The reference of the rule (the rule's ID by default).

    - `ManagedChallengeRule object { last_updated, version, id, 10 more }`

      - `last_updated: string`

        The timestamp of when the rule was last modified.

      - `version: string`

        The version of the rule.

      - `id: optional string`

        The unique ID of the rule.

      - `action: optional "managed_challenge"`

        The action to perform when the rule matches.

        - `"managed_challenge"`

      - `action_parameters: optional unknown`

        The parameters configuring the rule's action.

      - `categories: optional array of string`

        The categories of the rule.

      - `description: optional string`

        An informative description of the rule.

      - `enabled: optional boolean`

        Whether the rule should be executed.

      - `exposed_credential_check: optional object { password_expression, username_expression }`

        Configuration for exposed credential checking.

        - `password_expression: string`

          An expression that selects the password used in the credentials check.

        - `username_expression: string`

          An expression that selects the user ID used in the credentials check.

      - `expression: optional string`

        The expression defining which traffic will match the rule.

      - `logging: optional Logging`

        An object configuring the rule's logging behavior.

      - `ratelimit: optional object { characteristics, period, counting_expression, 5 more }`

        An object configuring the rule's rate limit behavior.

        - `characteristics: array of string`

          Characteristics of the request on which the rate limit counter will be incremented.

        - `period: number`

          Period in seconds over which the counter is being incremented.

        - `counting_expression: optional string`

          An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule's expression.

        - `mitigation_timeout: optional number`

          Period of time in seconds after which the action will be disabled following its first execution.

        - `requests_per_period: optional number`

          The threshold of requests per period after which the action will be executed for the first time.

        - `requests_to_origin: optional boolean`

          Whether counting is only performed when an origin is reached.

        - `score_per_period: optional number`

          The score threshold per period for which the action will be executed the first time.

        - `score_response_header_name: optional string`

          A response header name provided by the origin, which contains the score to increment rate limit counter with.

      - `ref: optional string`

        The reference of the rule (the rule's ID by default).

    - `RedirectRule object { last_updated, version, id, 10 more }`

      - `last_updated: string`

        The timestamp of when the rule was last modified.

      - `version: string`

        The version of the rule.

      - `id: optional string`

        The unique ID of the rule.

      - `action: optional "redirect"`

        The action to perform when the rule matches.

        - `"redirect"`

      - `action_parameters: optional object { from_list, from_value }`

        The parameters configuring the rule's action.

        - `from_list: optional object { key, name }`

          A redirect based on a bulk list lookup.

          - `key: string`

            An expression that evaluates to the list lookup key.

          - `name: string`

            The name of the list to match against.

        - `from_value: optional object { target_url, preserve_query_string, status_code }`

          A redirect based on the request properties.

          - `target_url: object { expression, value }`

            A URL to redirect the request to.

            - `expression: optional string`

              An expression that evaluates to a URL to redirect the request to.

            - `value: optional string`

              A URL to redirect the request to.

          - `preserve_query_string: optional boolean`

            Whether to keep the query string of the original request.

          - `status_code: optional 301 or 302 or 303 or 2 more`

            The status code to use for the redirect.

            - `301`

            - `302`

            - `303`

            - `307`

            - `308`

      - `categories: optional array of string`

        The categories of the rule.

      - `description: optional string`

        An informative description of the rule.

      - `enabled: optional boolean`

        Whether the rule should be executed.

      - `exposed_credential_check: optional object { password_expression, username_expression }`

        Configuration for exposed credential checking.

        - `password_expression: string`

          An expression that selects the password used in the credentials check.

        - `username_expression: string`

          An expression that selects the user ID used in the credentials check.

      - `expression: optional string`

        The expression defining which traffic will match the rule.

      - `logging: optional Logging`

        An object configuring the rule's logging behavior.

      - `ratelimit: optional object { characteristics, period, counting_expression, 5 more }`

        An object configuring the rule's rate limit behavior.

        - `characteristics: array of string`

          Characteristics of the request on which the rate limit counter will be incremented.

        - `period: number`

          Period in seconds over which the counter is being incremented.

        - `counting_expression: optional string`

          An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule's expression.

        - `mitigation_timeout: optional number`

          Period of time in seconds after which the action will be disabled following its first execution.

        - `requests_per_period: optional number`

          The threshold of requests per period after which the action will be executed for the first time.

        - `requests_to_origin: optional boolean`

          Whether counting is only performed when an origin is reached.

        - `score_per_period: optional number`

          The score threshold per period for which the action will be executed the first time.

        - `score_response_header_name: optional string`

          A response header name provided by the origin, which contains the score to increment rate limit counter with.

      - `ref: optional string`

        The reference of the rule (the rule's ID by default).

    - `RewriteRule object { last_updated, version, id, 10 more }`

      - `last_updated: string`

        The timestamp of when the rule was last modified.

      - `version: string`

        The version of the rule.

      - `id: optional string`

        The unique ID of the rule.

      - `action: optional "rewrite"`

        The action to perform when the rule matches.

        - `"rewrite"`

      - `action_parameters: optional object { headers, uri }`

        The parameters configuring the rule's action.

        - `headers: optional map[object { operation, value }  or object { expression, operation }  or object { operation, value }  or 2 more]`

          A map of headers to rewrite.

          - `AddStaticHeader object { operation, value }`

            A header with a static value to add.

            - `operation: "add"`

              The operation to perform on the header.

              - `"add"`

            - `value: string`

              A static value for the header.

          - `AddDynamicHeader object { expression, operation }`

            A header with a dynamic value to add.

            - `expression: string`

              An expression that evaluates to a value for the header.

            - `operation: "add"`

              The operation to perform on the header.

              - `"add"`

          - `SetStaticHeader object { operation, value }`

            A header with a static value to set.

            - `operation: "set"`

              The operation to perform on the header.

              - `"set"`

            - `value: string`

              A static value for the header.

          - `SetDynamicHeader object { expression, operation }`

            A header with a dynamic value to set.

            - `expression: string`

              An expression that evaluates to a value for the header.

            - `operation: "set"`

              The operation to perform on the header.

              - `"set"`

          - `RemoveHeader object { operation }`

            A header to remove.

            - `operation: "remove"`

              The operation to perform on the header.

              - `"remove"`

        - `uri: optional object { path, origin }  or object { query, origin }`

          A URI path rewrite.

          - `URIPath object { path, origin }`

            A URI path rewrite.

            - `path: object { expression, value }`

              A URI path rewrite.

              - `expression: optional string`

                An expression that evaluates to a value to rewrite the URI path to.

              - `value: optional string`

                A value to rewrite the URI path to.

            - `origin: optional boolean`

              Whether to propagate the rewritten URI to origin.

          - `URIQuery object { query, origin }`

            A URI query rewrite.

            - `query: object { expression, value }`

              A URI query rewrite.

              - `expression: optional string`

                An expression that evaluates to a value to rewrite the URI query to.

              - `value: optional string`

                A value to rewrite the URI query to.

            - `origin: optional boolean`

              Whether to propagate the rewritten URI to origin.

      - `categories: optional array of string`

        The categories of the rule.

      - `description: optional string`

        An informative description of the rule.

      - `enabled: optional boolean`

        Whether the rule should be executed.

      - `exposed_credential_check: optional object { password_expression, username_expression }`

        Configuration for exposed credential checking.

        - `password_expression: string`

          An expression that selects the password used in the credentials check.

        - `username_expression: string`

          An expression that selects the user ID used in the credentials check.

      - `expression: optional string`

        The expression defining which traffic will match the rule.

      - `logging: optional Logging`

        An object configuring the rule's logging behavior.

      - `ratelimit: optional object { characteristics, period, counting_expression, 5 more }`

        An object configuring the rule's rate limit behavior.

        - `characteristics: array of string`

          Characteristics of the request on which the rate limit counter will be incremented.

        - `period: number`

          Period in seconds over which the counter is being incremented.

        - `counting_expression: optional string`

          An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule's expression.

        - `mitigation_timeout: optional number`

          Period of time in seconds after which the action will be disabled following its first execution.

        - `requests_per_period: optional number`

          The threshold of requests per period after which the action will be executed for the first time.

        - `requests_to_origin: optional boolean`

          Whether counting is only performed when an origin is reached.

        - `score_per_period: optional number`

          The score threshold per period for which the action will be executed the first time.

        - `score_response_header_name: optional string`

          A response header name provided by the origin, which contains the score to increment rate limit counter with.

      - `ref: optional string`

        The reference of the rule (the rule's ID by default).

    - `RouteRule object { last_updated, version, id, 10 more }`

      - `last_updated: string`

        The timestamp of when the rule was last modified.

      - `version: string`

        The version of the rule.

      - `id: optional string`

        The unique ID of the rule.

      - `action: optional "route"`

        The action to perform when the rule matches.

        - `"route"`

      - `action_parameters: optional object { host_header, origin, sni }`

        The parameters configuring the rule's action.

        - `host_header: optional string`

          A value to rewrite the HTTP host header to.

        - `origin: optional object { host, port }`

          An origin to route to.

          - `host: optional string`

            A resolved host to route to.

          - `port: optional number`

            A destination port to route to.

        - `sni: optional object { value }`

          A Server Name Indication (SNI) override.

          - `value: string`

            A value to override the SNI to.

      - `categories: optional array of string`

        The categories of the rule.

      - `description: optional string`

        An informative description of the rule.

      - `enabled: optional boolean`

        Whether the rule should be executed.

      - `exposed_credential_check: optional object { password_expression, username_expression }`

        Configuration for exposed credential checking.

        - `password_expression: string`

          An expression that selects the password used in the credentials check.

        - `username_expression: string`

          An expression that selects the user ID used in the credentials check.

      - `expression: optional string`

        The expression defining which traffic will match the rule.

      - `logging: optional Logging`

        An object configuring the rule's logging behavior.

      - `ratelimit: optional object { characteristics, period, counting_expression, 5 more }`

        An object configuring the rule's rate limit behavior.

        - `characteristics: array of string`

          Characteristics of the request on which the rate limit counter will be incremented.

        - `period: number`

          Period in seconds over which the counter is being incremented.

        - `counting_expression: optional string`

          An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule's expression.

        - `mitigation_timeout: optional number`

          Period of time in seconds after which the action will be disabled following its first execution.

        - `requests_per_period: optional number`

          The threshold of requests per period after which the action will be executed for the first time.

        - `requests_to_origin: optional boolean`

          Whether counting is only performed when an origin is reached.

        - `score_per_period: optional number`

          The score threshold per period for which the action will be executed the first time.

        - `score_response_header_name: optional string`

          A response header name provided by the origin, which contains the score to increment rate limit counter with.

      - `ref: optional string`

        The reference of the rule (the rule's ID by default).

    - `ScoreRule object { last_updated, version, id, 10 more }`

      - `last_updated: string`

        The timestamp of when the rule was last modified.

      - `version: string`

        The version of the rule.

      - `id: optional string`

        The unique ID of the rule.

      - `action: optional "score"`

        The action to perform when the rule matches.

        - `"score"`

      - `action_parameters: optional object { increment }`

        The parameters configuring the rule's action.

        - `increment: number`

          A delta to change the score by, which can be either positive or negative.

      - `categories: optional array of string`

        The categories of the rule.

      - `description: optional string`

        An informative description of the rule.

      - `enabled: optional boolean`

        Whether the rule should be executed.

      - `exposed_credential_check: optional object { password_expression, username_expression }`

        Configuration for exposed credential checking.

        - `password_expression: string`

          An expression that selects the password used in the credentials check.

        - `username_expression: string`

          An expression that selects the user ID used in the credentials check.

      - `expression: optional string`

        The expression defining which traffic will match the rule.

      - `logging: optional Logging`

        An object configuring the rule's logging behavior.

      - `ratelimit: optional object { characteristics, period, counting_expression, 5 more }`

        An object configuring the rule's rate limit behavior.

        - `characteristics: array of string`

          Characteristics of the request on which the rate limit counter will be incremented.

        - `period: number`

          Period in seconds over which the counter is being incremented.

        - `counting_expression: optional string`

          An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule's expression.

        - `mitigation_timeout: optional number`

          Period of time in seconds after which the action will be disabled following its first execution.

        - `requests_per_period: optional number`

          The threshold of requests per period after which the action will be executed for the first time.

        - `requests_to_origin: optional boolean`

          Whether counting is only performed when an origin is reached.

        - `score_per_period: optional number`

          The score threshold per period for which the action will be executed the first time.

        - `score_response_header_name: optional string`

          A response header name provided by the origin, which contains the score to increment rate limit counter with.

      - `ref: optional string`

        The reference of the rule (the rule's ID by default).

    - `ServeErrorRule object { last_updated, version, id, 10 more }`

      - `last_updated: string`

        The timestamp of when the rule was last modified.

      - `version: string`

        The version of the rule.

      - `id: optional string`

        The unique ID of the rule.

      - `action: optional "serve_error"`

        The action to perform when the rule matches.

        - `"serve_error"`

      - `action_parameters: optional object { content, content_type, status_code }  or object { asset_name, content_type, status_code }`

        The parameters configuring the rule's action.

        - `ActionParametersContent object { content, content_type, status_code }`

          - `content: string`

            The response content.

          - `content_type: optional "application/json" or "text/html" or "text/plain" or "text/xml"`

            The content type header to set with the error response.

            - `"application/json"`

            - `"text/html"`

            - `"text/plain"`

            - `"text/xml"`

          - `status_code: optional number`

            The status code to use for the error.

        - `ActionParametersAsset object { asset_name, content_type, status_code }`

          - `asset_name: string`

            The name of a custom asset to serve as the error response.

          - `content_type: optional "application/json" or "text/html" or "text/plain" or "text/xml"`

            The content type header to set with the error response.

            - `"application/json"`

            - `"text/html"`

            - `"text/plain"`

            - `"text/xml"`

          - `status_code: optional number`

            The status code to use for the error.

      - `categories: optional array of string`

        The categories of the rule.

      - `description: optional string`

        An informative description of the rule.

      - `enabled: optional boolean`

        Whether the rule should be executed.

      - `exposed_credential_check: optional object { password_expression, username_expression }`

        Configuration for exposed credential checking.

        - `password_expression: string`

          An expression that selects the password used in the credentials check.

        - `username_expression: string`

          An expression that selects the user ID used in the credentials check.

      - `expression: optional string`

        The expression defining which traffic will match the rule.

      - `logging: optional Logging`

        An object configuring the rule's logging behavior.

      - `ratelimit: optional object { characteristics, period, counting_expression, 5 more }`

        An object configuring the rule's rate limit behavior.

        - `characteristics: array of string`

          Characteristics of the request on which the rate limit counter will be incremented.

        - `period: number`

          Period in seconds over which the counter is being incremented.

        - `counting_expression: optional string`

          An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule's expression.

        - `mitigation_timeout: optional number`

          Period of time in seconds after which the action will be disabled following its first execution.

        - `requests_per_period: optional number`

          The threshold of requests per period after which the action will be executed for the first time.

        - `requests_to_origin: optional boolean`

          Whether counting is only performed when an origin is reached.

        - `score_per_period: optional number`

          The score threshold per period for which the action will be executed the first time.

        - `score_response_header_name: optional string`

          A response header name provided by the origin, which contains the score to increment rate limit counter with.

      - `ref: optional string`

        The reference of the rule (the rule's ID by default).

    - `SetCacheControl object { last_updated, version, id, 10 more }`

      - `last_updated: string`

        The timestamp of when the rule was last modified.

      - `version: string`

        The version of the rule.

      - `id: optional string`

        The unique ID of the rule.

      - `action: optional "set_cache_control"`

        The action to perform when the rule matches.

        - `"set_cache_control"`

      - `action_parameters: optional object { immutable, "max-age", "must-revalidate", 10 more }`

        The parameters configuring the rule's action.

        - `immutable: optional object { operation, cloudflare_only }  or object { operation, cloudflare_only }`

          A cache-control directive configuration.

          - `SetDirective object { operation, cloudflare_only }`

            Set the directive.

            - `operation: "set" or "remove"`

              The operation to perform on the cache-control directive.

              - `"set"`

              - `"remove"`

            - `cloudflare_only: optional boolean`

              Whether the directive should only be applied to the Cloudflare CDN cache.

          - `RemoveDirective object { operation, cloudflare_only }`

            Remove the directive.

            - `operation: "set" or "remove"`

              The operation to perform on the cache-control directive.

              - `"set"`

              - `"remove"`

            - `cloudflare_only: optional boolean`

              Whether the directive should only be applied to the Cloudflare CDN cache.

        - `"max-age": optional object { operation, value, cloudflare_only }  or object { operation, cloudflare_only }`

          A cache-control directive configuration that accepts a duration value in seconds.

          - `SetDirective object { operation, value, cloudflare_only }`

            Set the directive with a duration value in seconds.

            - `operation: "set" or "remove"`

              The operation to perform on the cache-control directive.

              - `"set"`

              - `"remove"`

            - `value: number`

              The duration value in seconds for the directive.

            - `cloudflare_only: optional boolean`

              Whether the directive should only be applied to the Cloudflare CDN cache.

          - `RemoveDirective object { operation, cloudflare_only }`

            Remove the directive.

            - `operation: "set" or "remove"`

              The operation to perform on the cache-control directive.

              - `"set"`

              - `"remove"`

            - `cloudflare_only: optional boolean`

              Whether the directive should only be applied to the Cloudflare CDN cache.

        - `"must-revalidate": optional object { operation, cloudflare_only }  or object { operation, cloudflare_only }`

          A cache-control directive configuration.

          - `SetDirective object { operation, cloudflare_only }`

            Set the directive.

            - `operation: "set" or "remove"`

              The operation to perform on the cache-control directive.

              - `"set"`

              - `"remove"`

            - `cloudflare_only: optional boolean`

              Whether the directive should only be applied to the Cloudflare CDN cache.

          - `RemoveDirective object { operation, cloudflare_only }`

            Remove the directive.

            - `operation: "set" or "remove"`

              The operation to perform on the cache-control directive.

              - `"set"`

              - `"remove"`

            - `cloudflare_only: optional boolean`

              Whether the directive should only be applied to the Cloudflare CDN cache.

        - `"must-understand": optional object { operation, cloudflare_only }  or object { operation, cloudflare_only }`

          A cache-control directive configuration.

          - `SetDirective object { operation, cloudflare_only }`

            Set the directive.

            - `operation: "set" or "remove"`

              The operation to perform on the cache-control directive.

              - `"set"`

              - `"remove"`

            - `cloudflare_only: optional boolean`

              Whether the directive should only be applied to the Cloudflare CDN cache.

          - `RemoveDirective object { operation, cloudflare_only }`

            Remove the directive.

            - `operation: "set" or "remove"`

              The operation to perform on the cache-control directive.

              - `"set"`

              - `"remove"`

            - `cloudflare_only: optional boolean`

              Whether the directive should only be applied to the Cloudflare CDN cache.

        - `"no-cache": optional object { operation, cloudflare_only, qualifiers }  or object { operation, cloudflare_only }`

          A cache-control directive configuration that accepts optional qualifiers (header names).

          - `SetDirective object { operation, cloudflare_only, qualifiers }`

            Set the directive with optional qualifiers.

            - `operation: "set" or "remove"`

              The operation to perform on the cache-control directive.

              - `"set"`

              - `"remove"`

            - `cloudflare_only: optional boolean`

              Whether the directive should only be applied to the Cloudflare CDN cache.

            - `qualifiers: optional array of string`

              Optional list of header names to qualify the directive (e.g., for "private" or "no-cache" directives).

          - `RemoveDirective object { operation, cloudflare_only }`

            Remove the directive.

            - `operation: "set" or "remove"`

              The operation to perform on the cache-control directive.

              - `"set"`

              - `"remove"`

            - `cloudflare_only: optional boolean`

              Whether the directive should only be applied to the Cloudflare CDN cache.

        - `"no-store": optional object { operation, cloudflare_only }  or object { operation, cloudflare_only }`

          A cache-control directive configuration.

          - `SetDirective object { operation, cloudflare_only }`

            Set the directive.

            - `operation: "set" or "remove"`

              The operation to perform on the cache-control directive.

              - `"set"`

              - `"remove"`

            - `cloudflare_only: optional boolean`

              Whether the directive should only be applied to the Cloudflare CDN cache.

          - `RemoveDirective object { operation, cloudflare_only }`

            Remove the directive.

            - `operation: "set" or "remove"`

              The operation to perform on the cache-control directive.

              - `"set"`

              - `"remove"`

            - `cloudflare_only: optional boolean`

              Whether the directive should only be applied to the Cloudflare CDN cache.

        - `"no-transform": optional object { operation, cloudflare_only }  or object { operation, cloudflare_only }`

          A cache-control directive configuration.

          - `SetDirective object { operation, cloudflare_only }`

            Set the directive.

            - `operation: "set" or "remove"`

              The operation to perform on the cache-control directive.

              - `"set"`

              - `"remove"`

            - `cloudflare_only: optional boolean`

              Whether the directive should only be applied to the Cloudflare CDN cache.

          - `RemoveDirective object { operation, cloudflare_only }`

            Remove the directive.

            - `operation: "set" or "remove"`

              The operation to perform on the cache-control directive.

              - `"set"`

              - `"remove"`

            - `cloudflare_only: optional boolean`

              Whether the directive should only be applied to the Cloudflare CDN cache.

        - `private: optional object { operation, cloudflare_only, qualifiers }  or object { operation, cloudflare_only }`

          A cache-control directive configuration that accepts optional qualifiers (header names).

          - `SetDirective object { operation, cloudflare_only, qualifiers }`

            Set the directive with optional qualifiers.

            - `operation: "set" or "remove"`

              The operation to perform on the cache-control directive.

              - `"set"`

              - `"remove"`

            - `cloudflare_only: optional boolean`

              Whether the directive should only be applied to the Cloudflare CDN cache.

            - `qualifiers: optional array of string`

              Optional list of header names to qualify the directive (e.g., for "private" or "no-cache" directives).

          - `RemoveDirective object { operation, cloudflare_only }`

            Remove the directive.

            - `operation: "set" or "remove"`

              The operation to perform on the cache-control directive.

              - `"set"`

              - `"remove"`

            - `cloudflare_only: optional boolean`

              Whether the directive should only be applied to the Cloudflare CDN cache.

        - `"proxy-revalidate": optional object { operation, cloudflare_only }  or object { operation, cloudflare_only }`

          A cache-control directive configuration.

          - `SetDirective object { operation, cloudflare_only }`

            Set the directive.

            - `operation: "set" or "remove"`

              The operation to perform on the cache-control directive.

              - `"set"`

              - `"remove"`

            - `cloudflare_only: optional boolean`

              Whether the directive should only be applied to the Cloudflare CDN cache.

          - `RemoveDirective object { operation, cloudflare_only }`

            Remove the directive.

            - `operation: "set" or "remove"`

              The operation to perform on the cache-control directive.

              - `"set"`

              - `"remove"`

            - `cloudflare_only: optional boolean`

              Whether the directive should only be applied to the Cloudflare CDN cache.

        - `public: optional object { operation, cloudflare_only }  or object { operation, cloudflare_only }`

          A cache-control directive configuration.

          - `SetDirective object { operation, cloudflare_only }`

            Set the directive.

            - `operation: "set" or "remove"`

              The operation to perform on the cache-control directive.

              - `"set"`

              - `"remove"`

            - `cloudflare_only: optional boolean`

              Whether the directive should only be applied to the Cloudflare CDN cache.

          - `RemoveDirective object { operation, cloudflare_only }`

            Remove the directive.

            - `operation: "set" or "remove"`

              The operation to perform on the cache-control directive.

              - `"set"`

              - `"remove"`

            - `cloudflare_only: optional boolean`

              Whether the directive should only be applied to the Cloudflare CDN cache.

        - `"s-maxage": optional object { operation, value, cloudflare_only }  or object { operation, cloudflare_only }`

          A cache-control directive configuration that accepts a duration value in seconds.

          - `SetDirective object { operation, value, cloudflare_only }`

            Set the directive with a duration value in seconds.

            - `operation: "set" or "remove"`

              The operation to perform on the cache-control directive.

              - `"set"`

              - `"remove"`

            - `value: number`

              The duration value in seconds for the directive.

            - `cloudflare_only: optional boolean`

              Whether the directive should only be applied to the Cloudflare CDN cache.

          - `RemoveDirective object { operation, cloudflare_only }`

            Remove the directive.

            - `operation: "set" or "remove"`

              The operation to perform on the cache-control directive.

              - `"set"`

              - `"remove"`

            - `cloudflare_only: optional boolean`

              Whether the directive should only be applied to the Cloudflare CDN cache.

        - `"stale-if-error": optional object { operation, value, cloudflare_only }  or object { operation, cloudflare_only }`

          A cache-control directive configuration that accepts a duration value in seconds.

          - `SetDirective object { operation, value, cloudflare_only }`

            Set the directive with a duration value in seconds.

            - `operation: "set" or "remove"`

              The operation to perform on the cache-control directive.

              - `"set"`

              - `"remove"`

            - `value: number`

              The duration value in seconds for the directive.

            - `cloudflare_only: optional boolean`

              Whether the directive should only be applied to the Cloudflare CDN cache.

          - `RemoveDirective object { operation, cloudflare_only }`

            Remove the directive.

            - `operation: "set" or "remove"`

              The operation to perform on the cache-control directive.

              - `"set"`

              - `"remove"`

            - `cloudflare_only: optional boolean`

              Whether the directive should only be applied to the Cloudflare CDN cache.

        - `"stale-while-revalidate": optional object { operation, value, cloudflare_only }  or object { operation, cloudflare_only }`

          A cache-control directive configuration that accepts a duration value in seconds.

          - `SetDirective object { operation, value, cloudflare_only }`

            Set the directive with a duration value in seconds.

            - `operation: "set" or "remove"`

              The operation to perform on the cache-control directive.

              - `"set"`

              - `"remove"`

            - `value: number`

              The duration value in seconds for the directive.

            - `cloudflare_only: optional boolean`

              Whether the directive should only be applied to the Cloudflare CDN cache.

          - `RemoveDirective object { operation, cloudflare_only }`

            Remove the directive.

            - `operation: "set" or "remove"`

              The operation to perform on the cache-control directive.

              - `"set"`

              - `"remove"`

            - `cloudflare_only: optional boolean`

              Whether the directive should only be applied to the Cloudflare CDN cache.

      - `categories: optional array of string`

        The categories of the rule.

      - `description: optional string`

        An informative description of the rule.

      - `enabled: optional boolean`

        Whether the rule should be executed.

      - `exposed_credential_check: optional object { password_expression, username_expression }`

        Configuration for exposed credential checking.

        - `password_expression: string`

          An expression that selects the password used in the credentials check.

        - `username_expression: string`

          An expression that selects the user ID used in the credentials check.

      - `expression: optional string`

        The expression defining which traffic will match the rule.

      - `logging: optional Logging`

        An object configuring the rule's logging behavior.

      - `ratelimit: optional object { characteristics, period, counting_expression, 5 more }`

        An object configuring the rule's rate limit behavior.

        - `characteristics: array of string`

          Characteristics of the request on which the rate limit counter will be incremented.

        - `period: number`

          Period in seconds over which the counter is being incremented.

        - `counting_expression: optional string`

          An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule's expression.

        - `mitigation_timeout: optional number`

          Period of time in seconds after which the action will be disabled following its first execution.

        - `requests_per_period: optional number`

          The threshold of requests per period after which the action will be executed for the first time.

        - `requests_to_origin: optional boolean`

          Whether counting is only performed when an origin is reached.

        - `score_per_period: optional number`

          The score threshold per period for which the action will be executed the first time.

        - `score_response_header_name: optional string`

          A response header name provided by the origin, which contains the score to increment rate limit counter with.

      - `ref: optional string`

        The reference of the rule (the rule's ID by default).

    - `SetCacheSettingsRule object { last_updated, version, id, 10 more }`

      - `last_updated: string`

        The timestamp of when the rule was last modified.

      - `version: string`

        The version of the rule.

      - `id: optional string`

        The unique ID of the rule.

      - `action: optional "set_cache_settings"`

        The action to perform when the rule matches.

        - `"set_cache_settings"`

      - `action_parameters: optional object { additional_cacheable_ports, browser_ttl, cache, 13 more }`

        The parameters configuring the rule's action.

        - `additional_cacheable_ports: optional array of number`

          A list of additional ports that caching should be enabled on.

        - `browser_ttl: optional object { mode, default }`

          How long client browsers should cache the response. Cloudflare cache purge will not purge content cached on client browsers, so high browser TTLs may lead to stale content.

          - `mode: "respect_origin" or "bypass_by_default" or "override_origin" or "bypass"`

            The browser TTL mode.

            - `"respect_origin"`

            - `"bypass_by_default"`

            - `"override_origin"`

            - `"bypass"`

          - `default: optional number`

            The browser TTL (in seconds) if you choose the "override_origin" mode.

        - `cache: optional boolean`

          Whether the request's response from the origin is eligible for caching. Caching itself will still depend on the cache control header and your other caching configurations.

        - `cache_key: optional object { cache_by_device_type, cache_deception_armor, custom_key, ignore_query_strings_order }`

          Which components of the request are included in or excluded from the cache key Cloudflare uses to store the response in cache.

          - `cache_by_device_type: optional boolean`

            Whether to separate cached content based on the visitor's device type.

          - `cache_deception_armor: optional boolean`

            Whether to protect from web cache deception attacks, while allowing static assets to be cached.

          - `custom_key: optional object { cookie, header, host, 2 more }`

            Which components of the request are included or excluded from the cache key.

            - `cookie: optional object { check_presence, include }`

              Which cookies to include in the cache key.

              - `check_presence: optional array of string`

                A list of cookies to check for the presence of. The presence of these cookies is included in the cache key.

              - `include: optional array of string`

                A list of cookies to include in the cache key.

            - `header: optional object { check_presence, contains, exclude_origin, include }`

              Which headers to include in the cache key.

              - `check_presence: optional array of string`

                A list of headers to check for the presence of. The presence of these headers is included in the cache key.

              - `contains: optional map[array of string]`

                A mapping of header names to a list of values. If a header is present in the request and contains any of the values provided, its value is included in the cache key.

              - `exclude_origin: optional boolean`

                Whether to exclude the origin header in the cache key.

              - `include: optional array of string`

                A list of headers to include in the cache key.

            - `host: optional object { resolved }`

              How to use the host in the cache key.

              - `resolved: optional boolean`

                Whether to use the resolved host in the cache key.

            - `query_string: optional object { exclude, include }`

              Which query string parameters to include in or exclude from the cache key.

              - `exclude: optional object { all, list }`

                Which query string parameters to exclude from the cache key.

                - `all: optional true`

                  Whether to exclude all query string parameters from the cache key.

                  - `true`

                - `list: optional array of string`

                  A list of query string parameters to exclude from the cache key.

              - `include: optional object { all, list }`

                Which query string parameters to include in the cache key.

                - `all: optional true`

                  Whether to include all query string parameters in the cache key.

                  - `true`

                - `list: optional array of string`

                  A list of query string parameters to include in the cache key.

            - `user: optional object { device_type, geo, lang }`

              How to use characteristics of the request user agent in the cache key.

              - `device_type: optional boolean`

                Whether to use the user agent's device type in the cache key.

              - `geo: optional boolean`

                Whether to use the user agents's country in the cache key.

              - `lang: optional boolean`

                Whether to use the user agent's language in the cache key.

          - `ignore_query_strings_order: optional boolean`

            Whether to treat requests with the same query parameters the same, regardless of the order those query parameters are in.

        - `cache_reserve: optional object { eligible, minimum_file_size }`

          Settings to determine whether the request's response from origin is eligible for Cache Reserve (requires a Cache Reserve add-on plan).

          - `eligible: boolean`

            Whether Cache Reserve is enabled. If this is true and a request meets eligibility criteria, Cloudflare will write the resource to Cache Reserve.

          - `minimum_file_size: optional number`

            The minimum file size eligible for storage in Cache Reserve.

        - `edge_ttl: optional object { mode, default, status_code_ttl }`

          How long the Cloudflare edge network should cache the response.

          - `mode: "respect_origin" or "bypass_by_default" or "override_origin"`

            The edge TTL mode.

            - `"respect_origin"`

            - `"bypass_by_default"`

            - `"override_origin"`

          - `default: optional number`

            The edge TTL (in seconds) if you choose the "override_origin" mode.

          - `status_code_ttl: optional array of object { value, status_code, status_code_range }`

            A list of TTLs to apply to specific status codes or status code ranges.

            - `value: number`

              The time to cache the response for (in seconds). A value of 0 is equivalent to setting the cache control header with the value "no-cache". A value of -1 is equivalent to setting the cache control header with the value of "no-store".

            - `status_code: optional number`

              A single status code to apply the TTL to.

            - `status_code_range: optional object { from, to }`

              A range of status codes to apply the TTL to.

              - `from: optional number`

                The lower bound of the range.

              - `to: optional number`

                The upper bound of the range.

        - `origin_cache_control: optional boolean`

          Whether Cloudflare will aim to strictly adhere to RFC 7234.

        - `origin_error_page_passthru: optional boolean`

          Whether to generate Cloudflare error pages for issues from the origin server.

        - `read_timeout: optional number`

          A timeout value between two successive read operations to use for your origin server. Historically, the timeout value between two read options from Cloudflare to an origin server is 100 seconds. If you are attempting to reduce HTTP 524 errors because of timeouts from an origin server, try increasing this timeout value.

        - `respect_strong_etags: optional boolean`

          Whether Cloudflare should respect strong ETag (entity tag) headers. If false, Cloudflare converts strong ETag headers to weak ETag headers.

        - `serve_stale: optional object { disable_stale_while_updating }`

          When to serve stale content from cache.

          - `disable_stale_while_updating: optional boolean`

            Whether Cloudflare should disable serving stale content while getting the latest content from the origin.

        - `shared_dictionary: optional object { match_pattern }`

          Configuration for shared dictionary compression. When set, Cloudflare injects Use-As-Dictionary headers on matching cacheable responses.

          - `match_pattern: string`

            URL pattern for the Use-As-Dictionary match field. This pattern specifies which URLs can use this response as a dictionary.

        - `strip_etags: optional boolean`

          Whether to strip ETag headers from the origin response before caching.

        - `strip_last_modified: optional boolean`

          Whether to strip Last-Modified headers from the origin response before caching.

        - `strip_set_cookie: optional boolean`

          Whether to strip Set-Cookie headers from the origin response before caching.

        - `vary: optional object { default, headers }`

          Controls how cached responses vary based on request headers. `default` is required by the API and applies to any Vary response header that does not have a per-header override.

          - `default: optional object { action }`

            Controls how response Vary headers without a per-header override contribute to the cache key.

            - `action: "bypass" or "passthrough" or "normalize"`

              How the header value is treated when building the cache key.

              - `"bypass"`

              - `"passthrough"`

              - `"normalize"`

          - `headers: optional map[object { action, languages, media_types } ]`

            A mapping of lowercase request header names to their vary configuration.

            - `action: "bypass" or "passthrough" or "normalize"`

              How the header value is treated when building the cache key.

              - `"bypass"`

              - `"passthrough"`

              - `"normalize"`

            - `languages: optional array of string`

              The set of languages to normalize against. Only valid for the `accept-language` header.

            - `media_types: optional array of string`

              The set of media types to normalize against. Only valid for the `accept` header.

      - `categories: optional array of string`

        The categories of the rule.

      - `description: optional string`

        An informative description of the rule.

      - `enabled: optional boolean`

        Whether the rule should be executed.

      - `exposed_credential_check: optional object { password_expression, username_expression }`

        Configuration for exposed credential checking.

        - `password_expression: string`

          An expression that selects the password used in the credentials check.

        - `username_expression: string`

          An expression that selects the user ID used in the credentials check.

      - `expression: optional string`

        The expression defining which traffic will match the rule.

      - `logging: optional Logging`

        An object configuring the rule's logging behavior.

      - `ratelimit: optional object { characteristics, period, counting_expression, 5 more }`

        An object configuring the rule's rate limit behavior.

        - `characteristics: array of string`

          Characteristics of the request on which the rate limit counter will be incremented.

        - `period: number`

          Period in seconds over which the counter is being incremented.

        - `counting_expression: optional string`

          An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule's expression.

        - `mitigation_timeout: optional number`

          Period of time in seconds after which the action will be disabled following its first execution.

        - `requests_per_period: optional number`

          The threshold of requests per period after which the action will be executed for the first time.

        - `requests_to_origin: optional boolean`

          Whether counting is only performed when an origin is reached.

        - `score_per_period: optional number`

          The score threshold per period for which the action will be executed the first time.

        - `score_response_header_name: optional string`

          A response header name provided by the origin, which contains the score to increment rate limit counter with.

      - `ref: optional string`

        The reference of the rule (the rule's ID by default).

    - `SetCacheTags object { last_updated, version, id, 10 more }`

      - `last_updated: string`

        The timestamp of when the rule was last modified.

      - `version: string`

        The version of the rule.

      - `id: optional string`

        The unique ID of the rule.

      - `action: optional "set_cache_tags"`

        The action to perform when the rule matches.

        - `"set_cache_tags"`

      - `action_parameters: optional object { operation, values }  or object { expression, operation }  or object { operation, values }  or 3 more`

        The parameters configuring the rule's action.

        - `AddCacheTagsValues object { operation, values }`

          Add cache tags using a list of values.

          - `operation: "add" or "remove" or "set"`

            The operation to perform on the cache tags.

            - `"add"`

            - `"remove"`

            - `"set"`

          - `values: array of string`

            A list of cache tag values.

        - `AddCacheTagsExpression object { expression, operation }`

          Add cache tags using an expression.

          - `expression: string`

            An expression that evaluates to an array of cache tag values.

          - `operation: "add" or "remove" or "set"`

            The operation to perform on the cache tags.

            - `"add"`

            - `"remove"`

            - `"set"`

        - `RemoveCacheTagsValues object { operation, values }`

          Remove cache tags using a list of values.

          - `operation: "add" or "remove" or "set"`

            The operation to perform on the cache tags.

            - `"add"`

            - `"remove"`

            - `"set"`

          - `values: array of string`

            A list of cache tag values.

        - `RemoveCacheTagsExpression object { expression, operation }`

          Remove cache tags using an expression.

          - `expression: string`

            An expression that evaluates to an array of cache tag values.

          - `operation: "add" or "remove" or "set"`

            The operation to perform on the cache tags.

            - `"add"`

            - `"remove"`

            - `"set"`

        - `SetCacheTagsValues object { operation, values }`

          Set cache tags using a list of values.

          - `operation: "add" or "remove" or "set"`

            The operation to perform on the cache tags.

            - `"add"`

            - `"remove"`

            - `"set"`

          - `values: array of string`

            A list of cache tag values.

        - `SetCacheTagsExpression object { expression, operation }`

          Set cache tags using an expression.

          - `expression: string`

            An expression that evaluates to an array of cache tag values.

          - `operation: "add" or "remove" or "set"`

            The operation to perform on the cache tags.

            - `"add"`

            - `"remove"`

            - `"set"`

      - `categories: optional array of string`

        The categories of the rule.

      - `description: optional string`

        An informative description of the rule.

      - `enabled: optional boolean`

        Whether the rule should be executed.

      - `exposed_credential_check: optional object { password_expression, username_expression }`

        Configuration for exposed credential checking.

        - `password_expression: string`

          An expression that selects the password used in the credentials check.

        - `username_expression: string`

          An expression that selects the user ID used in the credentials check.

      - `expression: optional string`

        The expression defining which traffic will match the rule.

      - `logging: optional Logging`

        An object configuring the rule's logging behavior.

      - `ratelimit: optional object { characteristics, period, counting_expression, 5 more }`

        An object configuring the rule's rate limit behavior.

        - `characteristics: array of string`

          Characteristics of the request on which the rate limit counter will be incremented.

        - `period: number`

          Period in seconds over which the counter is being incremented.

        - `counting_expression: optional string`

          An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule's expression.

        - `mitigation_timeout: optional number`

          Period of time in seconds after which the action will be disabled following its first execution.

        - `requests_per_period: optional number`

          The threshold of requests per period after which the action will be executed for the first time.

        - `requests_to_origin: optional boolean`

          Whether counting is only performed when an origin is reached.

        - `score_per_period: optional number`

          The score threshold per period for which the action will be executed the first time.

        - `score_response_header_name: optional string`

          A response header name provided by the origin, which contains the score to increment rate limit counter with.

      - `ref: optional string`

        The reference of the rule (the rule's ID by default).

    - `SetConfigRule object { last_updated, version, id, 10 more }`

      - `last_updated: string`

        The timestamp of when the rule was last modified.

      - `version: string`

        The version of the rule.

      - `id: optional string`

        The unique ID of the rule.

      - `action: optional "set_config"`

        The action to perform when the rule matches.

        - `"set_config"`

      - `action_parameters: optional object { automatic_https_rewrites, autominify, bic, 19 more }`

        The parameters configuring the rule's action.

        - `automatic_https_rewrites: optional boolean`

          Whether to enable Automatic HTTPS Rewrites.

        - `autominify: optional object { css, html, js }`

          Which file extensions to minify automatically.

          - `css: optional boolean`

            Whether to minify CSS files.

          - `html: optional boolean`

            Whether to minify HTML files.

          - `js: optional boolean`

            Whether to minify JavaScript files.

        - `bic: optional boolean`

          Whether to enable Browser Integrity Check (BIC).

        - `content_converter: optional boolean`

          Whether to enable content conversion (e.g., HTML to Markdown).

        - `disable_apps: optional true`

          Whether to disable Cloudflare Apps.

          - `true`

        - `disable_pay_per_crawl: optional true`

          Whether to disable Pay Per Crawl.

          - `true`

        - `disable_rum: optional true`

          Whether to disable Real User Monitoring (RUM).

          - `true`

        - `disable_zaraz: optional true`

          Whether to disable Zaraz.

          - `true`

        - `email_obfuscation: optional boolean`

          Whether to enable Email Obfuscation.

        - `fonts: optional boolean`

          Whether to enable Cloudflare Fonts.

        - `hotlink_protection: optional boolean`

          Whether to enable Hotlink Protection.

        - `mirage: optional boolean`

          Whether to enable Mirage.

        - `opportunistic_encryption: optional boolean`

          Whether to enable Opportunistic Encryption.

        - `polish: optional "off" or "lossless" or "lossy" or "webp"`

          The Polish level to configure.

          - `"off"`

          - `"lossless"`

          - `"lossy"`

          - `"webp"`

        - `redirects_for_ai_training: optional boolean`

          Whether to redirect verified AI training crawlers to canonical URLs found in the HTML response.

        - `request_body_buffering: optional "none" or "standard" or "full"`

          The request body buffering mode.

          - `"none"`

          - `"standard"`

          - `"full"`

        - `response_body_buffering: optional "none" or "standard"`

          The response body buffering mode.

          - `"none"`

          - `"standard"`

        - `rocket_loader: optional boolean`

          Whether to enable Rocket Loader.

        - `security_level: optional "off" or "essentially_off" or "low" or 3 more`

          The Security Level to configure.

          - `"off"`

          - `"essentially_off"`

          - `"low"`

          - `"medium"`

          - `"high"`

          - `"under_attack"`

        - `server_side_excludes: optional boolean`

          Whether to enable Server-Side Excludes.

        - `ssl: optional "off" or "flexible" or "full" or 2 more`

          The SSL level to configure.

          - `"off"`

          - `"flexible"`

          - `"full"`

          - `"strict"`

          - `"origin_pull"`

        - `sxg: optional boolean`

          Whether to enable Signed Exchanges (SXG).

      - `categories: optional array of string`

        The categories of the rule.

      - `description: optional string`

        An informative description of the rule.

      - `enabled: optional boolean`

        Whether the rule should be executed.

      - `exposed_credential_check: optional object { password_expression, username_expression }`

        Configuration for exposed credential checking.

        - `password_expression: string`

          An expression that selects the password used in the credentials check.

        - `username_expression: string`

          An expression that selects the user ID used in the credentials check.

      - `expression: optional string`

        The expression defining which traffic will match the rule.

      - `logging: optional Logging`

        An object configuring the rule's logging behavior.

      - `ratelimit: optional object { characteristics, period, counting_expression, 5 more }`

        An object configuring the rule's rate limit behavior.

        - `characteristics: array of string`

          Characteristics of the request on which the rate limit counter will be incremented.

        - `period: number`

          Period in seconds over which the counter is being incremented.

        - `counting_expression: optional string`

          An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule's expression.

        - `mitigation_timeout: optional number`

          Period of time in seconds after which the action will be disabled following its first execution.

        - `requests_per_period: optional number`

          The threshold of requests per period after which the action will be executed for the first time.

        - `requests_to_origin: optional boolean`

          Whether counting is only performed when an origin is reached.

        - `score_per_period: optional number`

          The score threshold per period for which the action will be executed the first time.

        - `score_response_header_name: optional string`

          A response header name provided by the origin, which contains the score to increment rate limit counter with.

      - `ref: optional string`

        The reference of the rule (the rule's ID by default).

    - `SkipRule object { last_updated, version, id, 10 more }`

      - `last_updated: string`

        The timestamp of when the rule was last modified.

      - `version: string`

        The version of the rule.

      - `id: optional string`

        The unique ID of the rule.

      - `action: optional "skip"`

        The action to perform when the rule matches.

        - `"skip"`

      - `action_parameters: optional object { phase, phases, products, 3 more }`

        The parameters configuring the rule's action.

        - `phase: optional "current"`

          A phase to skip the execution of. This option is only compatible with the products option.

          - `"current"`

        - `phases: optional array of Phase`

          A list of phases to skip the execution of. This option is incompatible with the rulesets option.

          - `"ddos_l4"`

          - `"ddos_l7"`

          - `"http_config_settings"`

          - `"http_custom_errors"`

          - `"http_log_custom_fields"`

          - `"http_ratelimit"`

          - `"http_request_cache_settings"`

          - `"http_request_dynamic_redirect"`

          - `"http_request_firewall_custom"`

          - `"http_request_firewall_managed"`

          - `"http_request_late_transform"`

          - `"http_request_origin"`

          - `"http_request_redirect"`

          - `"http_request_sanitize"`

          - `"http_request_sbfm"`

          - `"http_request_transform"`

          - `"http_response_cache_settings"`

          - `"http_response_compression"`

          - `"http_response_firewall_managed"`

          - `"http_response_headers_transform"`

          - `"magic_transit"`

          - `"magic_transit_ids_managed"`

          - `"magic_transit_managed"`

          - `"magic_transit_ratelimit"`

        - `products: optional array of "bic" or "hot" or "rateLimit" or 4 more`

          A list of legacy security products to skip the execution of.

          - `"bic"`

          - `"hot"`

          - `"rateLimit"`

          - `"securityLevel"`

          - `"uaBlock"`

          - `"waf"`

          - `"zoneLockdown"`

        - `rules: optional map[array of string]`

          A mapping of ruleset IDs to a list of rule IDs in that ruleset to skip the execution of. This option is incompatible with the ruleset option.

        - `ruleset: optional "current"`

          A ruleset to skip the execution of. This option is incompatible with the rulesets option.

          - `"current"`

        - `rulesets: optional array of string`

          A list of ruleset IDs to skip the execution of. This option is incompatible with the ruleset and phases options.

      - `categories: optional array of string`

        The categories of the rule.

      - `description: optional string`

        An informative description of the rule.

      - `enabled: optional boolean`

        Whether the rule should be executed.

      - `exposed_credential_check: optional object { password_expression, username_expression }`

        Configuration for exposed credential checking.

        - `password_expression: string`

          An expression that selects the password used in the credentials check.

        - `username_expression: string`

          An expression that selects the user ID used in the credentials check.

      - `expression: optional string`

        The expression defining which traffic will match the rule.

      - `logging: optional Logging`

        An object configuring the rule's logging behavior.

      - `ratelimit: optional object { characteristics, period, counting_expression, 5 more }`

        An object configuring the rule's rate limit behavior.

        - `characteristics: array of string`

          Characteristics of the request on which the rate limit counter will be incremented.

        - `period: number`

          Period in seconds over which the counter is being incremented.

        - `counting_expression: optional string`

          An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule's expression.

        - `mitigation_timeout: optional number`

          Period of time in seconds after which the action will be disabled following its first execution.

        - `requests_per_period: optional number`

          The threshold of requests per period after which the action will be executed for the first time.

        - `requests_to_origin: optional boolean`

          Whether counting is only performed when an origin is reached.

        - `score_per_period: optional number`

          The score threshold per period for which the action will be executed the first time.

        - `score_response_header_name: optional string`

          A response header name provided by the origin, which contains the score to increment rate limit counter with.

      - `ref: optional string`

        The reference of the rule (the rule's ID by default).

    - `TransformResponseHTML object { last_updated, version, id, 10 more }`

      - `last_updated: string`

        The timestamp of when the rule was last modified.

      - `version: string`

        The version of the rule.

      - `id: optional string`

        The unique ID of the rule.

      - `action: optional "transform_response_html"`

        The action to perform when the rule matches.

        - `"transform_response_html"`

      - `action_parameters: optional object { link_maze }`

        The parameters configuring the rule's action.

        - `link_maze: unknown`

          Enables the link maze transformation on the response.

      - `categories: optional array of string`

        The categories of the rule.

      - `description: optional string`

        An informative description of the rule.

      - `enabled: optional boolean`

        Whether the rule should be executed.

      - `exposed_credential_check: optional object { password_expression, username_expression }`

        Configuration for exposed credential checking.

        - `password_expression: string`

          An expression that selects the password used in the credentials check.

        - `username_expression: string`

          An expression that selects the user ID used in the credentials check.

      - `expression: optional string`

        The expression defining which traffic will match the rule.

      - `logging: optional Logging`

        An object configuring the rule's logging behavior.

      - `ratelimit: optional object { characteristics, period, counting_expression, 5 more }`

        An object configuring the rule's rate limit behavior.

        - `characteristics: array of string`

          Characteristics of the request on which the rate limit counter will be incremented.

        - `period: number`

          Period in seconds over which the counter is being incremented.

        - `counting_expression: optional string`

          An expression that defines when the rate limit counter should be incremented. It defaults to the same as the rule's expression.

        - `mitigation_timeout: optional number`

          Period of time in seconds after which the action will be disabled following its first execution.

        - `requests_per_period: optional number`

          The threshold of requests per period after which the action will be executed for the first time.

        - `requests_to_origin: optional boolean`

          Whether counting is only performed when an origin is reached.

        - `score_per_period: optional number`

          The score threshold per period for which the action will be executed the first time.

        - `score_response_header_name: optional string`

          A response header name provided by the origin, which contains the score to increment rate limit counter with.

      - `ref: optional string`

        The reference of the rule (the rule's ID by default).

  - `version: string`

    The version of the ruleset.

  - `description: optional string`

    An informative description of the ruleset.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/rulesets/$RULESET_ID/rules \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "id": "3a03d665bac047339bb530ecb439a90d",
          "description": "Block the request.",
          "enabled": true,
          "expression": "ip.src eq 1.1.1.1",
          "ref": "my_ref"
        }'
```

#### Response

```json
{
  "errors": [
    {
      "message": "something bad happened",
      "code": 10000,
      "source": {
        "pointer": "/rules/0/action"
      }
    }
  ],
  "messages": [
    {
      "message": "something bad happened",
      "code": 10000,
      "source": {
        "pointer": "/rules/0/action"
      }
    }
  ],
  "result": {
    "id": "2f2feab2026849078ba485f918791bdc",
    "kind": "root",
    "last_updated": "2000-01-01T00:00:00.000000Z",
    "name": "My ruleset",
    "phase": "http_request_firewall_custom",
    "rules": [
      {
        "last_updated": "2000-01-01T00:00:00.000000Z",
        "version": "1",
        "id": "3a03d665bac047339bb530ecb439a90d",
        "action": "block",
        "action_parameters": {
          "response": {
            "content": "{\n  \"success\": false,\n  \"error\": \"you have been blocked\"\n}",
            "content_type": "application/json",
            "status_code": 400
          }
        },
        "categories": [
          "directory-traversal"
        ],
        "description": "Block the request.",
        "enabled": true,
        "exposed_credential_check": {
          "password_expression": "url_decode(http.request.body.form[\\\"password\\\"][0])",
          "username_expression": "url_decode(http.request.body.form[\\\"username\\\"][0])"
        },
        "expression": "ip.src eq 1.1.1.1",
        "logging": {
          "enabled": true
        },
        "ratelimit": {
          "characteristics": [
            "cf.colo.id"
          ],
          "period": 60,
          "counting_expression": "http.request.body.raw eq \"abcd\"",
          "mitigation_timeout": 600,
          "requests_per_period": 1000,
          "requests_to_origin": true,
          "score_per_period": 400,
          "score_response_header_name": "my-score"
        },
        "ref": "my_ref"
      }
    ],
    "version": "1",
    "description": "A description for my ruleset."
  },
  "success": true
}
```

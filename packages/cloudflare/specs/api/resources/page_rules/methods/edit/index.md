## Edit a Page Rule

**patch** `/zones/{zone_id}/pagerules/{pagerule_id}`

Updates one or more fields of an existing Page Rule.

### Path Parameters

- `zone_id: string`

  Identifier.

- `pagerule_id: string`

  Identifier.

### Body Parameters

- `actions: optional array of AlwaysUseHTTPS or AutomaticHTTPSRewrites or BrowserCacheTTL or 31 more`

  The set of actions to perform if the targets of this rule match the
  request. Actions can redirect to another URL or override settings, but
  not both.

  - `AlwaysUseHTTPS object { id }`

    - `id: optional "always_use_https"`

      If enabled, any `http://`` URL is converted to`https://` through a
      301 redirect.

      - `"always_use_https"`

  - `AutomaticHTTPSRewrites object { id, value }`

    - `id: optional "automatic_https_rewrites"`

      Turn on or off Automatic HTTPS Rewrites.

      - `"automatic_https_rewrites"`

    - `value: optional "on" or "off"`

      The status of Automatic HTTPS Rewrites.

      - `"on"`

      - `"off"`

  - `BrowserCacheTTL object { id, value }`

    - `id: optional "browser_cache_ttl"`

      Control how long resources cached by client browsers remain valid.

      - `"browser_cache_ttl"`

    - `value: optional number`

      The number of seconds to cache resources for.
      Setting this to 0 enables "Respect Existing Headers".

  - `BrowserCheck object { id, value }`

    - `id: optional "browser_check"`

      Inspect the visitor's browser for headers commonly associated with
      spammers and certain bots.

      - `"browser_check"`

    - `value: optional "on" or "off"`

      The status of Browser Integrity Check.

      - `"on"`

      - `"off"`

  - `BypassCacheOnCookie object { id, value }`

    - `id: optional "bypass_cache_on_cookie"`

      Bypass cache and fetch resources from the origin server if a regular
      expression matches against a cookie name present in the request.

      - `"bypass_cache_on_cookie"`

    - `value: optional string`

      The regular expression to use for matching cookie names in the
      request. Refer to [Bypass Cache on Cookie
      setting](https://developers.cloudflare.com/rules/page-rules/reference/additional-reference/#bypass-cache-on-cookie-setting)
      to learn about limited regular expression support.

  - `CacheByDeviceType object { id, value }`

    - `id: optional "cache_by_device_type"`

      Separate cached content based on the visitor's device type.

      - `"cache_by_device_type"`

    - `value: optional "on" or "off"`

      The status of Cache By Device Type.

      - `"on"`

      - `"off"`

  - `CacheDeceptionArmor object { id, value }`

    - `id: optional "cache_deception_armor"`

      Protect from web cache deception attacks while still allowing static
      assets to be cached. This setting verifies that the URL's extension
      matches the returned `Content-Type`.

      - `"cache_deception_armor"`

    - `value: optional "on" or "off"`

      The status of Cache Deception Armor.

      - `"on"`

      - `"off"`

  - `CacheKeyFields object { id, value }`

    - `id: optional "cache_key_fields"`

      Control specifically what variables to include when deciding which
      resources to cache. This allows customers to determine what to cache
      based on something other than just the URL.

      - `"cache_key_fields"`

    - `value: optional object { cookie, header, host, 2 more }`

      - `cookie: optional object { check_presence, include }`

        Controls which cookies appear in the Cache Key.

        - `check_presence: optional array of string`

          A list of cookies to check for the presence of, without
          including their actual values.

        - `include: optional array of string`

          A list of cookies to include.

      - `header: optional object { check_presence, exclude, include }`

        Controls which headers go into the Cache Key. Exactly one of
        `include` or `exclude` is expected.

        - `check_presence: optional array of string`

          A list of headers to check for the presence of, without
          including their actual values.

        - `exclude: optional array of string`

          A list of headers to ignore.

        - `include: optional array of string`

          A list of headers to include.

      - `host: optional object { resolved }`

        Determines which host header to include in the Cache Key.

        - `resolved: optional boolean`

          Whether to include the Host header in the HTTP request sent
          to the origin.

      - `query_string: optional object { exclude, include }`

        Controls which URL query string parameters go into the Cache
        Key. Exactly one of `include` or `exclude` is expected.

        - `exclude: optional "*" or array of string`

          Ignore all query string parameters.

          - `"*"`

            Ignore all query string parameters.

            - `"*"`

          - `array of string`

            A list of query string parameters to ignore.

        - `include: optional "*" or array of string`

          Include all query string parameters.

          - `"*"`

            Include all query string parameters.

            - `"*"`

          - `array of string`

            A list of query string parameters to include.

      - `user: optional object { device_type, geo, lang }`

        Feature fields to add features about the end-user (client) into
        the Cache Key.

        - `device_type: optional boolean`

          Classifies a request as `mobile`, `desktop`, or `tablet`
          based on the User Agent.

        - `geo: optional boolean`

          Includes the client's country, derived from the IP address.

        - `lang: optional boolean`

          Includes the first language code contained in the
          `Accept-Language` header sent by the client.

  - `CacheLevel object { id, value }`

    - `id: optional "cache_level"`

      Apply custom caching based on the option selected.

      - `"cache_level"`

    - `value: optional "bypass" or "basic" or "simplified" or 2 more`

      * `bypass`: Cloudflare does not cache.
      * `basic`: Delivers resources from cache when there is no query
        string.
      * `simplified`: Delivers the same resource to everyone independent
        of the query string.
      * `aggressive`: Caches all static content that has a query string.
      * `cache_everything`: Treats all content as static and caches all
        file types beyond the [Cloudflare default cached
        content](https://developers.cloudflare.com/cache/concepts/default-cache-behavior/#default-cached-file-extensions).

      - `"bypass"`

      - `"basic"`

      - `"simplified"`

      - `"aggressive"`

      - `"cache_everything"`

  - `CacheOnCookie object { id, value }`

    - `id: optional "cache_on_cookie"`

      Apply the Cache Everything option (Cache Level setting) based on a
      regular expression match against a cookie name.

      - `"cache_on_cookie"`

    - `value: optional string`

      The regular expression to use for matching cookie names in the
      request.

  - `CacheTTLByStatus object { id, value }`

    - `id: optional "cache_ttl_by_status"`

      Enterprise customers can set cache time-to-live (TTL) based on the
      response status from the origin web server. Cache TTL refers to the
      duration of a resource in the Cloudflare network before being
      marked as stale or discarded from cache. Status codes are returned
      by a resource's origin. Setting cache TTL based on response status
      overrides the default cache behavior (standard caching) for static
      files and overrides cache instructions sent by the origin web
      server. To cache non-static assets, set a Cache Level of Cache
      Everything using a Page Rule. Setting no-store Cache-Control or a
      low TTL (using `max-age`/`s-maxage`) increases requests to origin
      web servers and decreases performance.

      - `"cache_ttl_by_status"`

    - `value: optional map["no-cache" or "no-store" or number]`

      A JSON object containing status codes and their corresponding TTLs.
      Each key-value pair in the cache TTL by status cache rule has the
      following syntax

      - `status_code`: An integer value such as 200 or 500. status_code
        matches the exact status code from the origin web server. Valid
        status codes are between 100-999.
      - `status_code_range`: Integer values for from and to.
        status_code_range matches any status code from the origin web
        server within the specified range.
      - `value`: An integer value that defines the duration an asset is
        valid in seconds or one of the following strings: no-store
        (equivalent to -1), no-cache (equivalent to 0).

      - `"no-cache" or "no-store"`

        `no-store` (equivalent to -1), `no-cache` (equivalent to 0)

        - `"no-cache"`

        - `"no-store"`

      - `number`

        An integer value that defines the duration an asset is valid in
        seconds.

  - `DisableApps object { id }`

    - `id: optional "disable_apps"`

      Turn off all active [Cloudflare Apps](https://developers.cloudflare.com/support/more-dashboard-apps/cloudflare-apps/)
      (deprecated).

      - `"disable_apps"`

  - `DisablePerformance object { id }`

    - `id: optional "disable_performance"`

      Turn off
      [Rocket Loader](https://developers.cloudflare.com/speed/optimization/content/rocket-loader/), and
      [Polish](https://developers.cloudflare.com/images/polish/).

      - `"disable_performance"`

  - `DisableSecurity object { id }`

    - `id: optional "disable_security"`

      Turn off
      [Email Obfuscation](https://developers.cloudflare.com/waf/tools/scrape-shield/email-address-obfuscation/),
      [Rate Limiting (previous version, deprecated)](https://developers.cloudflare.com/waf/reference/legacy/old-rate-limiting/),
      [Scrape Shield](https://developers.cloudflare.com/waf/tools/scrape-shield/),
      [URL (Zone) Lockdown](https://developers.cloudflare.com/waf/tools/zone-lockdown/), and
      [WAF managed rules (previous version, deprecated)](https://developers.cloudflare.com/waf/reference/legacy/old-waf-managed-rules/).

      - `"disable_security"`

  - `DisableZaraz object { id }`

    - `id: optional "disable_zaraz"`

      Turn off [Zaraz](https://developers.cloudflare.com/zaraz/).

      - `"disable_zaraz"`

  - `EdgeCacheTTL object { id, value }`

    - `id: optional "edge_cache_ttl"`

      Specify how long to cache a resource in the Cloudflare global
      network. *Edge Cache TTL* is not visible in response headers.

      - `"edge_cache_ttl"`

    - `value: optional number`

  - `EmailObfuscation object { id, value }`

    - `id: optional "email_obfuscation"`

      Turn on or off **Email Obfuscation**.

      - `"email_obfuscation"`

    - `value: optional "on" or "off"`

      The status of Email Obfuscation.

      - `"on"`

      - `"off"`

  - `ExplicitCacheControl object { id, value }`

    - `id: optional "explicit_cache_control"`

      Origin Cache Control is enabled by default for Free, Pro, and
      Business domains and disabled by default for Enterprise domains.

      - `"explicit_cache_control"`

    - `value: optional "on" or "off"`

      The status of Origin Cache Control.

      - `"on"`

      - `"off"`

  - `ForwardingURL object { id, value }`

    - `id: optional "forwarding_url"`

      Redirects one URL to another using an `HTTP 301/302` redirect. Refer
      to [Wildcard matching and referencing](https://developers.cloudflare.com/rules/page-rules/reference/wildcard-matching/).

      - `"forwarding_url"`

    - `value: optional object { status_code, url }`

      - `status_code: optional 301 or 302`

        The status code to use for the URL redirect. 301 is a permanent
        redirect. 302 is a temporary redirect.

        - `301`

        - `302`

      - `url: optional string`

        The URL to redirect the request to.
        Notes: ${num} refers to the position of '*' in the constraint value.

  - `HostHeaderOverride object { id, value }`

    - `id: optional "host_header_override"`

      Apply a specific host header.

      - `"host_header_override"`

    - `value: optional string`

      The hostname to use in the `Host` header

  - `IPGeolocation object { id, value }`

    - `id: optional "ip_geolocation"`

      Cloudflare adds a CF-IPCountry HTTP header containing the country code that corresponds to the visitor.

      - `"ip_geolocation"`

    - `value: optional "on" or "off"`

      The status of adding the IP Geolocation Header.

      - `"on"`

      - `"off"`

  - `Mirage object { id, value }`

    - `id: optional "mirage"`

      Cloudflare Mirage reduces bandwidth used by images in mobile browsers.
      It can accelerate loading of image-heavy websites on very slow mobile connections and HTTP/1.

      - `"mirage"`

    - `value: optional "on" or "off"`

      The status of Mirage.

      - `"on"`

      - `"off"`

  - `OpportunisticEncryption object { id, value }`

    - `id: optional "opportunistic_encryption"`

      Opportunistic Encryption allows browsers to access HTTP URIs over an encrypted TLS channel.
      It's not a substitute for HTTPS, but provides additional security for otherwise vulnerable requests.

      - `"opportunistic_encryption"`

    - `value: optional "on" or "off"`

      The status of Opportunistic Encryption.

      - `"on"`

      - `"off"`

  - `OriginErrorPagePassThru object { id, value }`

    - `id: optional "origin_error_page_pass_thru"`

      Turn on or off Cloudflare error pages generated from issues sent from the origin server. If enabled, this setting triggers error pages issued by the origin.

      - `"origin_error_page_pass_thru"`

    - `value: optional "on" or "off"`

      The status of Origin Error Page Passthru.

      - `"on"`

      - `"off"`

  - `Polish object { id, value }`

    - `id: optional "polish"`

      Apply options from the Polish feature of the Cloudflare Speed app.

      - `"polish"`

    - `value: optional "off" or "lossless" or "lossy"`

      The level of Polish you want applied to your origin.

      - `"off"`

      - `"lossless"`

      - `"lossy"`

  - `ResolveOverride object { id, value }`

    - `id: optional "resolve_override"`

      Change the origin address to the value specified in this setting.

      - `"resolve_override"`

    - `value: optional string`

      The origin address you want to override with.

  - `RespectStrongEtag object { id, value }`

    - `id: optional "respect_strong_etag"`

      Turn on or off byte-for-byte equivalency checks between the
      Cloudflare cache and the origin server.

      - `"respect_strong_etag"`

    - `value: optional "on" or "off"`

      The status of Respect Strong ETags

      - `"on"`

      - `"off"`

  - `ResponseBuffering object { id, value }`

    - `id: optional "response_buffering"`

      Turn on or off whether Cloudflare should wait for an entire file
      from the origin server before forwarding it to the site visitor. By
      default, Cloudflare sends packets to the client as they arrive from
      the origin server.

      - `"response_buffering"`

    - `value: optional "on" or "off"`

      The status of Response Buffering

      - `"on"`

      - `"off"`

  - `RocketLoader object { id, value }`

    - `id: optional "rocket_loader"`

      Turn on or off Rocket Loader in the Cloudflare Speed app.

      - `"rocket_loader"`

    - `value: optional "on" or "off"`

      The status of Rocket Loader

      - `"on"`

      - `"off"`

  - `SecurityLevel object { id, value }`

    - `id: optional "security_level"`

      Control options for the **Security Level** feature from the **Security** app.

      - `"security_level"`

    - `value: optional "off" or "essentially_off" or "low" or 3 more`

      - `"off"`

      - `"essentially_off"`

      - `"low"`

      - `"medium"`

      - `"high"`

      - `"under_attack"`

  - `SortQueryStringForCache object { id, value }`

    - `id: optional "sort_query_string_for_cache"`

      Turn on or off the reordering of query strings. When query strings have the same structure, caching improves.

      - `"sort_query_string_for_cache"`

    - `value: optional "on" or "off"`

      The status of Query String Sort

      - `"on"`

      - `"off"`

  - `SSL object { id, value }`

    - `id: optional "ssl"`

      Control options for the SSL feature of the Edge Certificates tab in the Cloudflare SSL/TLS app.

      - `"ssl"`

    - `value: optional "off" or "flexible" or "full" or 2 more`

      The encryption mode that Cloudflare uses to connect to your origin server.

      - `"off"`

      - `"flexible"`

      - `"full"`

      - `"strict"`

      - `"origin_pull"`

  - `TrueClientIPHeader object { id, value }`

    - `id: optional "true_client_ip_header"`

      Turn on or off the True-Client-IP Header feature of the Cloudflare Network app.

      - `"true_client_ip_header"`

    - `value: optional "on" or "off"`

      The status of True Client IP Header.

      - `"on"`

      - `"off"`

  - `WAF object { id, value }`

    - `id: optional "waf"`

      Turn on or off [WAF managed rules (previous version, deprecated)](https://developers.cloudflare.com/waf/reference/legacy/old-waf-managed-rules/).
      You cannot enable or disable individual WAF managed rules via Page Rules.

      - `"waf"`

    - `value: optional "on" or "off"`

      The status of WAF managed rules (previous version).

      - `"on"`

      - `"off"`

- `priority: optional number`

  The priority of the rule, used to define which Page Rule is processed
  over another. A higher number indicates a higher priority. For example,
  if you have a catch-all Page Rule (rule A: `/images/*`) but want a more
  specific Page Rule to take precedence (rule B: `/images/special/*`),
  specify a higher priority for rule B so it overrides rule A.

- `status: optional "active" or "disabled"`

  The status of the Page Rule.

  - `"active"`

  - `"disabled"`

- `targets: optional array of Target`

  The rule targets to evaluate on each request.

  - `constraint: optional object { operator, value }`

    String constraint.

    - `operator: "matches" or "contains" or "equals" or 2 more`

      The matches operator can use asterisks and pipes as wildcard and 'or' operators.

      - `"matches"`

      - `"contains"`

      - `"equals"`

      - `"not_equal"`

      - `"not_contain"`

    - `value: string`

      The URL pattern to match against the current request. The pattern may contain up to four asterisks ('*') as placeholders.

  - `target: optional "url"`

    A target based on the URL of the request.

    - `"url"`

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

- `result: optional PageRule`

  - `id: string`

    Identifier.

  - `actions: array of AlwaysUseHTTPS or AutomaticHTTPSRewrites or BrowserCacheTTL or 31 more`

    The set of actions to perform if the targets of this rule match the
    request. Actions can redirect to another URL or override settings, but
    not both.

    - `AlwaysUseHTTPS object { id }`

      - `id: optional "always_use_https"`

        If enabled, any `http://`` URL is converted to`https://` through a
        301 redirect.

        - `"always_use_https"`

    - `AutomaticHTTPSRewrites object { id, value }`

      - `id: optional "automatic_https_rewrites"`

        Turn on or off Automatic HTTPS Rewrites.

        - `"automatic_https_rewrites"`

      - `value: optional "on" or "off"`

        The status of Automatic HTTPS Rewrites.

        - `"on"`

        - `"off"`

    - `BrowserCacheTTL object { id, value }`

      - `id: optional "browser_cache_ttl"`

        Control how long resources cached by client browsers remain valid.

        - `"browser_cache_ttl"`

      - `value: optional number`

        The number of seconds to cache resources for.
        Setting this to 0 enables "Respect Existing Headers".

    - `BrowserCheck object { id, value }`

      - `id: optional "browser_check"`

        Inspect the visitor's browser for headers commonly associated with
        spammers and certain bots.

        - `"browser_check"`

      - `value: optional "on" or "off"`

        The status of Browser Integrity Check.

        - `"on"`

        - `"off"`

    - `BypassCacheOnCookie object { id, value }`

      - `id: optional "bypass_cache_on_cookie"`

        Bypass cache and fetch resources from the origin server if a regular
        expression matches against a cookie name present in the request.

        - `"bypass_cache_on_cookie"`

      - `value: optional string`

        The regular expression to use for matching cookie names in the
        request. Refer to [Bypass Cache on Cookie
        setting](https://developers.cloudflare.com/rules/page-rules/reference/additional-reference/#bypass-cache-on-cookie-setting)
        to learn about limited regular expression support.

    - `CacheByDeviceType object { id, value }`

      - `id: optional "cache_by_device_type"`

        Separate cached content based on the visitor's device type.

        - `"cache_by_device_type"`

      - `value: optional "on" or "off"`

        The status of Cache By Device Type.

        - `"on"`

        - `"off"`

    - `CacheDeceptionArmor object { id, value }`

      - `id: optional "cache_deception_armor"`

        Protect from web cache deception attacks while still allowing static
        assets to be cached. This setting verifies that the URL's extension
        matches the returned `Content-Type`.

        - `"cache_deception_armor"`

      - `value: optional "on" or "off"`

        The status of Cache Deception Armor.

        - `"on"`

        - `"off"`

    - `CacheKeyFields object { id, value }`

      - `id: optional "cache_key_fields"`

        Control specifically what variables to include when deciding which
        resources to cache. This allows customers to determine what to cache
        based on something other than just the URL.

        - `"cache_key_fields"`

      - `value: optional object { cookie, header, host, 2 more }`

        - `cookie: optional object { check_presence, include }`

          Controls which cookies appear in the Cache Key.

          - `check_presence: optional array of string`

            A list of cookies to check for the presence of, without
            including their actual values.

          - `include: optional array of string`

            A list of cookies to include.

        - `header: optional object { check_presence, exclude, include }`

          Controls which headers go into the Cache Key. Exactly one of
          `include` or `exclude` is expected.

          - `check_presence: optional array of string`

            A list of headers to check for the presence of, without
            including their actual values.

          - `exclude: optional array of string`

            A list of headers to ignore.

          - `include: optional array of string`

            A list of headers to include.

        - `host: optional object { resolved }`

          Determines which host header to include in the Cache Key.

          - `resolved: optional boolean`

            Whether to include the Host header in the HTTP request sent
            to the origin.

        - `query_string: optional object { exclude, include }`

          Controls which URL query string parameters go into the Cache
          Key. Exactly one of `include` or `exclude` is expected.

          - `exclude: optional "*" or array of string`

            Ignore all query string parameters.

            - `"*"`

              Ignore all query string parameters.

              - `"*"`

            - `array of string`

              A list of query string parameters to ignore.

          - `include: optional "*" or array of string`

            Include all query string parameters.

            - `"*"`

              Include all query string parameters.

              - `"*"`

            - `array of string`

              A list of query string parameters to include.

        - `user: optional object { device_type, geo, lang }`

          Feature fields to add features about the end-user (client) into
          the Cache Key.

          - `device_type: optional boolean`

            Classifies a request as `mobile`, `desktop`, or `tablet`
            based on the User Agent.

          - `geo: optional boolean`

            Includes the client's country, derived from the IP address.

          - `lang: optional boolean`

            Includes the first language code contained in the
            `Accept-Language` header sent by the client.

    - `CacheLevel object { id, value }`

      - `id: optional "cache_level"`

        Apply custom caching based on the option selected.

        - `"cache_level"`

      - `value: optional "bypass" or "basic" or "simplified" or 2 more`

        * `bypass`: Cloudflare does not cache.
        * `basic`: Delivers resources from cache when there is no query
          string.
        * `simplified`: Delivers the same resource to everyone independent
          of the query string.
        * `aggressive`: Caches all static content that has a query string.
        * `cache_everything`: Treats all content as static and caches all
          file types beyond the [Cloudflare default cached
          content](https://developers.cloudflare.com/cache/concepts/default-cache-behavior/#default-cached-file-extensions).

        - `"bypass"`

        - `"basic"`

        - `"simplified"`

        - `"aggressive"`

        - `"cache_everything"`

    - `CacheOnCookie object { id, value }`

      - `id: optional "cache_on_cookie"`

        Apply the Cache Everything option (Cache Level setting) based on a
        regular expression match against a cookie name.

        - `"cache_on_cookie"`

      - `value: optional string`

        The regular expression to use for matching cookie names in the
        request.

    - `CacheTTLByStatus object { id, value }`

      - `id: optional "cache_ttl_by_status"`

        Enterprise customers can set cache time-to-live (TTL) based on the
        response status from the origin web server. Cache TTL refers to the
        duration of a resource in the Cloudflare network before being
        marked as stale or discarded from cache. Status codes are returned
        by a resource's origin. Setting cache TTL based on response status
        overrides the default cache behavior (standard caching) for static
        files and overrides cache instructions sent by the origin web
        server. To cache non-static assets, set a Cache Level of Cache
        Everything using a Page Rule. Setting no-store Cache-Control or a
        low TTL (using `max-age`/`s-maxage`) increases requests to origin
        web servers and decreases performance.

        - `"cache_ttl_by_status"`

      - `value: optional map["no-cache" or "no-store" or number]`

        A JSON object containing status codes and their corresponding TTLs.
        Each key-value pair in the cache TTL by status cache rule has the
        following syntax

        - `status_code`: An integer value such as 200 or 500. status_code
          matches the exact status code from the origin web server. Valid
          status codes are between 100-999.
        - `status_code_range`: Integer values for from and to.
          status_code_range matches any status code from the origin web
          server within the specified range.
        - `value`: An integer value that defines the duration an asset is
          valid in seconds or one of the following strings: no-store
          (equivalent to -1), no-cache (equivalent to 0).

        - `"no-cache" or "no-store"`

          `no-store` (equivalent to -1), `no-cache` (equivalent to 0)

          - `"no-cache"`

          - `"no-store"`

        - `number`

          An integer value that defines the duration an asset is valid in
          seconds.

    - `DisableApps object { id }`

      - `id: optional "disable_apps"`

        Turn off all active [Cloudflare Apps](https://developers.cloudflare.com/support/more-dashboard-apps/cloudflare-apps/)
        (deprecated).

        - `"disable_apps"`

    - `DisablePerformance object { id }`

      - `id: optional "disable_performance"`

        Turn off
        [Rocket Loader](https://developers.cloudflare.com/speed/optimization/content/rocket-loader/), and
        [Polish](https://developers.cloudflare.com/images/polish/).

        - `"disable_performance"`

    - `DisableSecurity object { id }`

      - `id: optional "disable_security"`

        Turn off
        [Email Obfuscation](https://developers.cloudflare.com/waf/tools/scrape-shield/email-address-obfuscation/),
        [Rate Limiting (previous version, deprecated)](https://developers.cloudflare.com/waf/reference/legacy/old-rate-limiting/),
        [Scrape Shield](https://developers.cloudflare.com/waf/tools/scrape-shield/),
        [URL (Zone) Lockdown](https://developers.cloudflare.com/waf/tools/zone-lockdown/), and
        [WAF managed rules (previous version, deprecated)](https://developers.cloudflare.com/waf/reference/legacy/old-waf-managed-rules/).

        - `"disable_security"`

    - `DisableZaraz object { id }`

      - `id: optional "disable_zaraz"`

        Turn off [Zaraz](https://developers.cloudflare.com/zaraz/).

        - `"disable_zaraz"`

    - `EdgeCacheTTL object { id, value }`

      - `id: optional "edge_cache_ttl"`

        Specify how long to cache a resource in the Cloudflare global
        network. *Edge Cache TTL* is not visible in response headers.

        - `"edge_cache_ttl"`

      - `value: optional number`

    - `EmailObfuscation object { id, value }`

      - `id: optional "email_obfuscation"`

        Turn on or off **Email Obfuscation**.

        - `"email_obfuscation"`

      - `value: optional "on" or "off"`

        The status of Email Obfuscation.

        - `"on"`

        - `"off"`

    - `ExplicitCacheControl object { id, value }`

      - `id: optional "explicit_cache_control"`

        Origin Cache Control is enabled by default for Free, Pro, and
        Business domains and disabled by default for Enterprise domains.

        - `"explicit_cache_control"`

      - `value: optional "on" or "off"`

        The status of Origin Cache Control.

        - `"on"`

        - `"off"`

    - `ForwardingURL object { id, value }`

      - `id: optional "forwarding_url"`

        Redirects one URL to another using an `HTTP 301/302` redirect. Refer
        to [Wildcard matching and referencing](https://developers.cloudflare.com/rules/page-rules/reference/wildcard-matching/).

        - `"forwarding_url"`

      - `value: optional object { status_code, url }`

        - `status_code: optional 301 or 302`

          The status code to use for the URL redirect. 301 is a permanent
          redirect. 302 is a temporary redirect.

          - `301`

          - `302`

        - `url: optional string`

          The URL to redirect the request to.
          Notes: ${num} refers to the position of '*' in the constraint value.

    - `HostHeaderOverride object { id, value }`

      - `id: optional "host_header_override"`

        Apply a specific host header.

        - `"host_header_override"`

      - `value: optional string`

        The hostname to use in the `Host` header

    - `IPGeolocation object { id, value }`

      - `id: optional "ip_geolocation"`

        Cloudflare adds a CF-IPCountry HTTP header containing the country code that corresponds to the visitor.

        - `"ip_geolocation"`

      - `value: optional "on" or "off"`

        The status of adding the IP Geolocation Header.

        - `"on"`

        - `"off"`

    - `Mirage object { id, value }`

      - `id: optional "mirage"`

        Cloudflare Mirage reduces bandwidth used by images in mobile browsers.
        It can accelerate loading of image-heavy websites on very slow mobile connections and HTTP/1.

        - `"mirage"`

      - `value: optional "on" or "off"`

        The status of Mirage.

        - `"on"`

        - `"off"`

    - `OpportunisticEncryption object { id, value }`

      - `id: optional "opportunistic_encryption"`

        Opportunistic Encryption allows browsers to access HTTP URIs over an encrypted TLS channel.
        It's not a substitute for HTTPS, but provides additional security for otherwise vulnerable requests.

        - `"opportunistic_encryption"`

      - `value: optional "on" or "off"`

        The status of Opportunistic Encryption.

        - `"on"`

        - `"off"`

    - `OriginErrorPagePassThru object { id, value }`

      - `id: optional "origin_error_page_pass_thru"`

        Turn on or off Cloudflare error pages generated from issues sent from the origin server. If enabled, this setting triggers error pages issued by the origin.

        - `"origin_error_page_pass_thru"`

      - `value: optional "on" or "off"`

        The status of Origin Error Page Passthru.

        - `"on"`

        - `"off"`

    - `Polish object { id, value }`

      - `id: optional "polish"`

        Apply options from the Polish feature of the Cloudflare Speed app.

        - `"polish"`

      - `value: optional "off" or "lossless" or "lossy"`

        The level of Polish you want applied to your origin.

        - `"off"`

        - `"lossless"`

        - `"lossy"`

    - `ResolveOverride object { id, value }`

      - `id: optional "resolve_override"`

        Change the origin address to the value specified in this setting.

        - `"resolve_override"`

      - `value: optional string`

        The origin address you want to override with.

    - `RespectStrongEtag object { id, value }`

      - `id: optional "respect_strong_etag"`

        Turn on or off byte-for-byte equivalency checks between the
        Cloudflare cache and the origin server.

        - `"respect_strong_etag"`

      - `value: optional "on" or "off"`

        The status of Respect Strong ETags

        - `"on"`

        - `"off"`

    - `ResponseBuffering object { id, value }`

      - `id: optional "response_buffering"`

        Turn on or off whether Cloudflare should wait for an entire file
        from the origin server before forwarding it to the site visitor. By
        default, Cloudflare sends packets to the client as they arrive from
        the origin server.

        - `"response_buffering"`

      - `value: optional "on" or "off"`

        The status of Response Buffering

        - `"on"`

        - `"off"`

    - `RocketLoader object { id, value }`

      - `id: optional "rocket_loader"`

        Turn on or off Rocket Loader in the Cloudflare Speed app.

        - `"rocket_loader"`

      - `value: optional "on" or "off"`

        The status of Rocket Loader

        - `"on"`

        - `"off"`

    - `SecurityLevel object { id, value }`

      - `id: optional "security_level"`

        Control options for the **Security Level** feature from the **Security** app.

        - `"security_level"`

      - `value: optional "off" or "essentially_off" or "low" or 3 more`

        - `"off"`

        - `"essentially_off"`

        - `"low"`

        - `"medium"`

        - `"high"`

        - `"under_attack"`

    - `SortQueryStringForCache object { id, value }`

      - `id: optional "sort_query_string_for_cache"`

        Turn on or off the reordering of query strings. When query strings have the same structure, caching improves.

        - `"sort_query_string_for_cache"`

      - `value: optional "on" or "off"`

        The status of Query String Sort

        - `"on"`

        - `"off"`

    - `SSL object { id, value }`

      - `id: optional "ssl"`

        Control options for the SSL feature of the Edge Certificates tab in the Cloudflare SSL/TLS app.

        - `"ssl"`

      - `value: optional "off" or "flexible" or "full" or 2 more`

        The encryption mode that Cloudflare uses to connect to your origin server.

        - `"off"`

        - `"flexible"`

        - `"full"`

        - `"strict"`

        - `"origin_pull"`

    - `TrueClientIPHeader object { id, value }`

      - `id: optional "true_client_ip_header"`

        Turn on or off the True-Client-IP Header feature of the Cloudflare Network app.

        - `"true_client_ip_header"`

      - `value: optional "on" or "off"`

        The status of True Client IP Header.

        - `"on"`

        - `"off"`

    - `WAF object { id, value }`

      - `id: optional "waf"`

        Turn on or off [WAF managed rules (previous version, deprecated)](https://developers.cloudflare.com/waf/reference/legacy/old-waf-managed-rules/).
        You cannot enable or disable individual WAF managed rules via Page Rules.

        - `"waf"`

      - `value: optional "on" or "off"`

        The status of WAF managed rules (previous version).

        - `"on"`

        - `"off"`

  - `created_on: string`

    The timestamp of when the Page Rule was created.

  - `modified_on: string`

    The timestamp of when the Page Rule was last modified.

  - `priority: number`

    The priority of the rule, used to define which Page Rule is processed
    over another. A higher number indicates a higher priority. For example,
    if you have a catch-all Page Rule (rule A: `/images/*`) but want a more
    specific Page Rule to take precedence (rule B: `/images/special/*`),
    specify a higher priority for rule B so it overrides rule A.

  - `status: "active" or "disabled"`

    The status of the Page Rule.

    - `"active"`

    - `"disabled"`

  - `targets: array of Target`

    The rule targets to evaluate on each request.

    - `constraint: optional object { operator, value }`

      String constraint.

      - `operator: "matches" or "contains" or "equals" or 2 more`

        The matches operator can use asterisks and pipes as wildcard and 'or' operators.

        - `"matches"`

        - `"contains"`

        - `"equals"`

        - `"not_equal"`

        - `"not_contain"`

      - `value: string`

        The URL pattern to match against the current request. The pattern may contain up to four asterisks ('*') as placeholders.

    - `target: optional "url"`

      A target based on the URL of the request.

      - `"url"`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/pagerules/$PAGERULE_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "actions": [
            {
              "id": "browser_check",
              "value": "on"
            }
          ],
          "status": "active",
          "targets": [
            {
              "constraint": {
                "operator": "matches",
                "value": "*example.com/images/*"
              },
              "target": "url"
            }
          ]
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
    "actions": [
      {
        "id": "browser_check",
        "value": "on"
      }
    ],
    "created_on": "2014-01-01T05:20:00.12345Z",
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "priority": 0,
    "status": "active",
    "targets": [
      {
        "constraint": {
          "operator": "matches",
          "value": "*example.com/images/*"
        },
        "target": "url"
      }
    ]
  }
}
```

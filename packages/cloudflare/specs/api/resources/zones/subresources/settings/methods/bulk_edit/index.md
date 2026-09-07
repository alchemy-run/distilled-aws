## Edit multiple zone settings

**patch** `/zones/{zone_id}/settings`

Edit settings for a zone.

### Path Parameters

- `zone_id: string`

  Identifier

### Body Parameters

- `body: array of ZeroRTT or AdvancedDDoS or object { id, modified_on, value }  or 57 more`

  - `ZeroRTT object { id, value, editable, modified_on }`

    0-RTT session resumption enabled for this zone.

    - `id: "0rtt"`

      ID of the zone setting.

      - `"0rtt"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `AdvancedDDoS object { id, value, editable, modified_on }`

    Advanced protection from Distributed Denial of Service (DDoS) attacks on your website. This is an uneditable value that is 'on' in the case of Business and Enterprise zones.

    - `id: "advanced_ddos"`

      ID of the zone setting.

      - `"advanced_ddos"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesCacheRulesAegis object { id, modified_on, value }`

    Aegis provides dedicated egress IPs (from Cloudflare to your origin) for your layer 7 WAF and CDN services. The egress IPs are reserved exclusively for your account so that you can increase your origin security by only allowing traffic from a small list of IP addresses.

    - `id: "aegis"`

      ID of the zone setting.

      - `"aegis"`

    - `modified_on: optional string`

      Last time this setting was modified.

    - `value: optional object { enabled, pool_id }`

      Value of the zone setting.

      - `enabled: optional boolean`

        Whether the feature is enabled or not.

      - `pool_id: optional string`

        Egress pool id which refers to a grouping of dedicated egress IPs through which Cloudflare will connect to origin.

  - `AlwaysOnline object { id, value, editable, modified_on }`

    When enabled, Cloudflare serves limited copies of web pages available from the [Internet Archive's Wayback Machine](https://archive.org/web/) if your server is offline. Refer to [Always Online](https://developers.cloudflare.com/cache/about/always-online) for more information.

    - `id: "always_online"`

      ID of the zone setting.

      - `"always_online"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasAlwaysUseHTTPS object { id, value, editable, modified_on }`

    Reply to all requests for URLs that use "http" with a 301 redirect to the equivalent "https" URL. If you only want to redirect for a subset of requests, consider creating an "Always use HTTPS" page rule.

    - `id: "always_use_https"`

      ID of the zone setting.

      - `"always_use_https"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasAutomaticHTTPSRewrites object { id, value, editable, modified_on }`

    Enable the Automatic HTTPS Rewrites feature for this zone.

    - `id: "automatic_https_rewrites"`

      ID of the zone setting.

      - `"automatic_https_rewrites"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `Brotli object { id, value, editable, modified_on }`

    When the client requesting an asset supports the Brotli compression algorithm, Cloudflare will serve a Brotli compressed version of the asset.

    - `id: "brotli"`

      ID of the zone setting.

      - `"brotli"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasBrowserCacheTTL object { id, value, editable, modified_on }`

    Browser Cache TTL (in seconds) specifies how long Cloudflare-cached resources will remain on your visitors' computers. Cloudflare will honor any larger times specified by your server. (https://support.cloudflare.com/hc/en-us/articles/200168276).

    - `id: "browser_cache_ttl"`

      ID of the zone setting.

      - `"browser_cache_ttl"`

    - `value: number`

      Current value of the zone setting.

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasBrowserCheck object { id, value, editable, modified_on }`

    Browser Integrity Check is similar to Bad Behavior and looks for common HTTP headers abused most commonly by spammers and denies access to your page.  It will also challenge visitors that do not have a user agent or a non standard user agent (also commonly used by abuse bots, crawlers or visitors). (https://support.cloudflare.com/hc/en-us/articles/200170086).

    - `id: "browser_check"`

      ID of the zone setting.

      - `"browser_check"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasCacheLevel object { id, value, editable, modified_on }`

    Cache Level functions based off the setting level. The basic setting will cache most static resources (i.e., css, images, and JavaScript). The simplified setting will ignore the query string when delivering a cached resource. The aggressive setting will cache all static resources, including ones with a query string. (https://support.cloudflare.com/hc/en-us/articles/200168256).

    - `id: "cache_level"`

      ID of the zone setting.

      - `"cache_level"`

    - `value: "aggressive" or "basic" or "simplified"`

      Current value of the zone setting.

      - `"aggressive"`

      - `"basic"`

      - `"simplified"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ChallengeTTL object { id, value, editable, modified_on }`

    Specify how long a visitor is allowed access to your site after successfully completing a challenge (such as a CAPTCHA). After the TTL has expired the visitor will have to complete a new challenge. We recommend a 15 - 45 minute setting and will attempt to honor any setting above 45 minutes. (https://support.cloudflare.com/hc/en-us/articles/200170136).

    - `id: "challenge_ttl"`

      ID of the zone setting.

      - `"challenge_ttl"`

    - `value: 300 or 900 or 1800 or 11 more`

      Current value of the zone setting.

      - `300`

      - `900`

      - `1800`

      - `2700`

      - `3600`

      - `7200`

      - `10800`

      - `14400`

      - `28800`

      - `57600`

      - `86400`

      - `604800`

      - `2592000`

      - `31536000`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesChinaNetworkEnabled object { id, value, editable, modified_on }`

    Determines whether or not the china network is enabled.

    - `id: "china_network_enabled"`

      ID of the zone setting.

      - `"china_network_enabled"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesContentConverter object { id, value, editable, modified_on }`

    When enabled and the client sends an Accept header requesting text/markdown,
    Cloudflare will convert HTML responses to Markdown format using the toMarkdown() service.
    Refer to the [developer documentation](https://developers.cloudflare.com/workers-ai/features/markdown-conversion/) for more information.

    - `id: "content_converter"`

      ID of the zone setting.

      - `"content_converter"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `Ciphers object { id, value, editable, modified_on }`

    An allowlist of ciphers for TLS termination. These ciphers must be in the BoringSSL format.

    - `id: "ciphers"`

      ID of the zone setting.

      - `"ciphers"`

    - `value: array of string`

      Current value of the zone setting.

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesCNAMEFlattening object { id, value, editable, modified_on }`

    Whether or not cname flattening is on.

    - `id: "cname_flattening"`

      How to flatten the cname destination.

      - `"cname_flattening"`

    - `value: "flatten_at_root" or "flatten_all"`

      Current value of the zone setting.

      - `"flatten_at_root"`

      - `"flatten_all"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `DevelopmentMode object { id, value, editable, 2 more }`

    Development Mode temporarily allows you to enter development mode for your websites if you need to make changes to your site. This will bypass Cloudflare's accelerated cache and slow down your site, but is useful if you are making changes to cacheable content (like images, css, or JavaScript) and would like to see those changes right away. Once entered, development mode will last for 3 hours and then automatically toggle off.

    - `id: "development_mode"`

      ID of the zone setting.

      - `"development_mode"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

    - `time_remaining: optional number`

      Value of the zone setting.
      Notes: The interval (in seconds) from when development mode expires (positive integer) or last expired (negative integer) for the domain. If development mode has never been enabled, this value is false.

  - `EarlyHints object { id, value, editable, modified_on }`

    When enabled, Cloudflare will attempt to speed up overall page loads by serving `103` responses with `Link` headers from the final response. Refer to [Early Hints](https://developers.cloudflare.com/cache/about/early-hints) for more information.

    - `id: "early_hints"`

      ID of the zone setting.

      - `"early_hints"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasEdgeCacheTTL object { id, value, editable, modified_on }`

    Time (in seconds) that a resource will be ensured to remain on Cloudflare's cache servers.

    - `id: "edge_cache_ttl"`

      ID of the zone setting.

      - `"edge_cache_ttl"`

    - `value: 30 or 60 or 300 or 18 more`

      Current value of the zone setting.

      - `30`

      - `60`

      - `300`

      - `1200`

      - `1800`

      - `3600`

      - `7200`

      - `10800`

      - `14400`

      - `18000`

      - `28800`

      - `43200`

      - `57600`

      - `72000`

      - `86400`

      - `172800`

      - `259200`

      - `345600`

      - `432000`

      - `518400`

      - `604800`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasEmailObfuscation object { id, value, editable, modified_on }`

    Encrypt email adresses on your web page from bots, while keeping them visible to humans. (https://support.cloudflare.com/hc/en-us/articles/200170016).

    - `id: "email_obfuscation"`

      ID of the zone setting.

      - `"email_obfuscation"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `H2Prioritization object { id, value, editable, modified_on }`

    HTTP/2 Edge Prioritization optimises the delivery of resources served through HTTP/2 to improve page load performance. It also supports fine control of content delivery when used in conjunction with Workers.

    - `id: "h2_prioritization"`

      ID of the zone setting.

      - `"h2_prioritization"`

    - `value: "on" or "off" or "custom"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

      - `"custom"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `HotlinkProtection object { id, value, editable, modified_on }`

    When enabled, the Hotlink Protection option ensures that other sites cannot suck up your bandwidth by building pages that use images hosted on your site. Anytime a request for an image on your site hits Cloudflare, we check to ensure that it's not another site requesting them. People will still be able to download and view images from your page, but other sites won't be able to steal them for use on their own pages. (https://support.cloudflare.com/hc/en-us/articles/200170026).

    - `id: "hotlink_protection"`

      ID of the zone setting.

      - `"hotlink_protection"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `HTTP2 object { id, value, editable, modified_on }`

    HTTP2 enabled for this zone.

    - `id: "http2"`

      ID of the zone setting.

      - `"http2"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `HTTP3 object { id, value, editable, modified_on }`

    HTTP3 enabled for this zone.

    - `id: "http3"`

      ID of the zone setting.

      - `"http3"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasIPGeolocation object { id, value, editable, modified_on }`

    Enable IP Geolocation to have Cloudflare geolocate visitors to your website and pass the country code to you. (https://support.cloudflare.com/hc/en-us/articles/200168236).

    - `id: "ip_geolocation"`

      ID of the zone setting.

      - `"ip_geolocation"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `IPV6 object { id, value, editable, modified_on }`

    Enable IPv6 on all subdomains that are Cloudflare enabled.  (https://support.cloudflare.com/hc/en-us/articles/200168586).

    - `id: "ipv6"`

      ID of the zone setting.

      - `"ipv6"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesMaxUpload object { id, value, editable, modified_on }`

    Maximum size of an allowable upload.

    - `id: "max_upload"`

      identifier of the zone setting.

      - `"max_upload"`

    - `value: 100 or 125 or 150 or 15 more`

      Current value of the zone setting.

      - `100`

      - `125`

      - `150`

      - `175`

      - `200`

      - `225`

      - `250`

      - `275`

      - `300`

      - `325`

      - `350`

      - `375`

      - `400`

      - `425`

      - `450`

      - `475`

      - `500`

      - `1000`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `MinTLSVersion object { id, value, editable, modified_on }`

    Only accepts HTTPS requests that use at least the TLS protocol version specified. For example, if TLS 1.1 is selected, TLS 1.0 connections will be rejected, while 1.1, 1.2, and 1.3 (if enabled) will be permitted.

    - `id: "min_tls_version"`

      ID of the zone setting.

      - `"min_tls_version"`

    - `value: "1.0" or "1.1" or "1.2" or "1.3"`

      Current value of the zone setting.

      - `"1.0"`

      - `"1.1"`

      - `"1.2"`

      - `"1.3"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasMirage object { id, value, editable, modified_on }`

    Automatically optimize image loading for website visitors on mobile
    devices. Refer to [our blog post](http://blog.cloudflare.com/mirage2-solving-mobile-speed)
    for more information.

    - `id: "mirage"`

      ID of the zone setting.

      - `"mirage"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `NEL object { id, value, editable, modified_on }`

    Enable Network Error Logging reporting on your zone. (Beta)

    - `id: "nel"`

      Zone setting identifier.

      - `"nel"`

    - `value: object { enabled }`

      Current value of the zone setting.

      - `enabled: optional boolean`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasOpportunisticEncryption object { id, value, editable, modified_on }`

    Enables the Opportunistic Encryption feature for a zone.

    - `id: "opportunistic_encryption"`

      ID of the zone setting.

      - `"opportunistic_encryption"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `OpportunisticOnion object { id, value, editable, modified_on }`

    Add an Alt-Svc header to all legitimate requests from Tor, allowing the connection to use our onion services instead of exit nodes.

    - `id: "opportunistic_onion"`

      ID of the zone setting.

      - `"opportunistic_onion"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `OrangeToOrange object { id, value, editable, modified_on }`

    Orange to Orange (O2O) allows zones on Cloudflare to CNAME to other zones also on Cloudflare.

    - `id: "orange_to_orange"`

      ID of the zone setting.

      - `"orange_to_orange"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasOriginErrorPagePassThru object { id, value, editable, modified_on }`

    Cloudflare will proxy customer error pages on any 502,504 errors on origin server instead of showing a default Cloudflare error page. This does not apply to 522 errors and is limited to Enterprise Zones.

    - `id: "origin_error_page_pass_thru"`

      ID of the zone setting.

      - `"origin_error_page_pass_thru"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesCacheRulesOriginH2MaxStreams object { id, modified_on, value }`

    Origin H2 Max Streams configures the max number of concurrent requests that Cloudflare will send within the same connection when communicating with the origin server, if the origin supports it. Note that if your origin does not support H2 multiplexing, 5xx errors may be observed, particularly 520s. Also note that the default value is `100` for all plan types except Enterprise where it is `1`. `1` means that H2 multiplexing is disabled.

    - `id: "origin_h2_max_streams"`

      Value of the zone setting.

      - `"origin_h2_max_streams"`

    - `modified_on: optional string`

      Last time this setting was modified.

    - `value: optional number`

      Value of the Origin H2 Max Streams Setting.

  - `ZonesCacheRulesOriginMaxHTTPVersion object { id, modified_on, value }`

    Origin Max HTTP Setting Version sets the highest HTTP version Cloudflare will attempt to use with your origin. This setting allows Cloudflare to make HTTP/2 requests to your origin. (Refer to [Enable HTTP/2 to Origin](https://developers.cloudflare.com/cache/how-to/enable-http2-to-origin/), for more information.). The default value is "2" for all plan types except Enterprise where it is "1".

    - `id: "origin_max_http_version"`

      Value of the zone setting.

      - `"origin_max_http_version"`

    - `modified_on: optional string`

      Last time this setting was modified.

    - `value: optional "2" or "1"`

      Value of the Origin Max HTTP Version Setting.

      - `"2"`

      - `"1"`

  - `ZonesSchemasPolish object { id, value, editable, modified_on }`

    Removes metadata and compresses your images for faster page load times. Basic (Lossless): Reduce the size of PNG, JPEG, and GIF files - no impact on visual quality. Basic + JPEG (Lossy): Further reduce the size of JPEG files for faster image loading. Larger JPEGs are converted to progressive images, loading a lower-resolution image first and ending in a higher-resolution version. Not recommended for hi-res photography sites.

    - `id: "polish"`

      ID of the zone setting.

      - `"polish"`

    - `value: "off" or "lossless" or "lossy"`

      Current value of the zone setting.

      - `"off"`

      - `"lossless"`

      - `"lossy"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `PrefetchPreload object { id, value, editable, modified_on }`

    Cloudflare will prefetch any URLs that are included in the response headers. This is limited to Enterprise Zones.

    - `id: "prefetch_preload"`

      ID of the zone setting.

      - `"prefetch_preload"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesPrivacyPass object { id, value, editable, modified_on }`

    Privacy Pass v1 was a browser extension developed by the Privacy Pass Team to improve the browsing experience for your visitors by allowing users to reduce the number of CAPTCHAs shown. (https://support.cloudflare.com/hc/en-us/articles/115001992652-Privacy-Pass).

    - `id: "privacy_pass"`

      ID of the zone setting.

      - `"privacy_pass"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ProxyReadTimeout object { id, value, editable, modified_on }`

    Maximum time between two read operations from origin.

    - `id: "proxy_read_timeout"`

      ID of the zone setting.

      - `"proxy_read_timeout"`

    - `value: number`

      Current value of the zone setting.

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `PseudoIPV4 object { id, value, editable, modified_on }`

    The value set for the Pseudo IPv4 setting.

    - `id: "pseudo_ipv4"`

      Value of the Pseudo IPv4 setting.

      - `"pseudo_ipv4"`

    - `value: "off" or "add_header" or "overwrite_header"`

      Current value of the zone setting.

      - `"off"`

      - `"add_header"`

      - `"overwrite_header"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesRedirectsForAITraining object { id, value, editable, modified_on }`

    When enabled, Cloudflare will redirect verified AI training crawlers to canonical URLs
    found in the HTML response, ensuring AI models train on authoritative content.

    - `id: "redirects_for_ai_training"`

      ID of the zone setting.

      - `"redirects_for_ai_training"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesReplaceInsecureJS object { id, value, editable, modified_on }`

    Automatically replace insecure JavaScript libraries with safer and faster alternatives provided under cdnjs and powered by Cloudflare. Currently supports the following libraries: Polyfill under polyfill.io.

    - `id: "replace_insecure_js"`

      ID of the zone setting.

      - `"replace_insecure_js"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasResponseBuffering object { id, value, editable, modified_on }`

    Enables or disables buffering of responses from the proxied server. Cloudflare may buffer the whole payload to deliver it at once to the client versus allowing it to be delivered in chunks. By default, the proxied server streams directly and is not buffered by Cloudflare. This is limited to Enterprise Zones.

    - `id: "response_buffering"`

      ID of the zone setting.

      - `"response_buffering"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasRocketLoader object { id, value, editable, modified_on }`

    Rocket Loader is a general-purpose asynchronous JavaScript optimisation that prioritises rendering your content while loading your site's Javascript asynchronously. Turning on Rocket Loader will immediately improve a web page's rendering time sometimes measured as Time to First Paint (TTFP), and also the `window.onload` time (assuming there is JavaScript on the page). This can have a positive impact on your Google search ranking. When turned on, Rocket Loader will automatically defer the loading of all Javascript referenced in your HTML, with no configuration required. Refer to [Understanding Rocket Loader](https://support.cloudflare.com/hc/articles/200168056) for more information.

    - `id: "rocket_loader"`

      ID of the zone setting.

      - `"rocket_loader"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasAutomaticPlatformOptimization object { id, value, editable, modified_on }`

    [Automatic Platform Optimization for WordPress](https://developers.cloudflare.com/automatic-platform-optimization/) serves your WordPress site from Cloudflare's edge network and caches third-party fonts.

    - `id: "automatic_platform_optimization"`

      ID of the zone setting.

      - `"automatic_platform_optimization"`

    - `value: AutomaticPlatformOptimization`

      Current value of the zone setting.

      - `cache_by_device_type: boolean`

        Indicates whether or not [cache by device type](https://developers.cloudflare.com/automatic-platform-optimization/reference/cache-device-type/) is enabled.

      - `cf: boolean`

        Indicates whether or not Cloudflare proxy is enabled.

      - `enabled: boolean`

        Indicates whether or not Automatic Platform Optimization is enabled.

      - `hostnames: array of string`

        An array of hostnames where Automatic Platform Optimization for WordPress is activated.

      - `wordpress: boolean`

        Indicates whether or not site is powered by WordPress.

      - `wp_plugin: boolean`

        Indicates whether or not [Cloudflare for WordPress plugin](https://wordpress.org/plugins/cloudflare/) is installed.

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSearchForAgents object { id, value, editable, modified_on }`

    When enabled, Cloudflare provisions an AI Search instance for the zone
    and exposes a /.well-known/ai-search endpoint that AI agents can query.
    Markdown responses also receive an agent: YAML capability block advertising
    the search endpoint.

    - `id: "search_for_agents"`

      ID of the zone setting.

      - `"search_for_agents"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `SecurityHeaders object { id, value, editable, modified_on }`

    Cloudflare security header for a zone.

    - `id: "security_header"`

      ID of the zone's security header.

      - `"security_header"`

    - `value: object { strict_transport_security }`

      Current value of the zone setting.

      - `strict_transport_security: optional object { enabled, include_subdomains, max_age, 2 more }`

        Strict Transport Security.

        - `enabled: optional boolean`

          Whether or not strict transport security is enabled.

        - `include_subdomains: optional boolean`

          Include all subdomains for strict transport security.

        - `max_age: optional number`

          Max age in seconds of the strict transport security.

        - `nosniff: optional boolean`

          Whether or not to include 'X-Content-Type-Options: nosniff' header.

        - `preload: optional boolean`

          Enable automatic preload of the HSTS configuration.

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasSecurityLevel object { id, value, editable, modified_on }`

    Choose the appropriate security profile for your website, which will automatically adjust each of the security settings. If you choose to customize an individual security setting, the profile will become Custom. (https://support.cloudflare.com/hc/en-us/articles/200170056).

    - `id: "security_level"`

      ID of the zone setting.

      - `"security_level"`

    - `value: "off" or "essentially_off" or "low" or 3 more`

      Current value of the zone setting.

      - `"off"`

      - `"essentially_off"`

      - `"low"`

      - `"medium"`

      - `"high"`

      - `"under_attack"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ServerSideExcludes object { id, value, editable, modified_on }`

    If there is sensitive content on your website that you want visible to real visitors, but that you want to hide from suspicious visitors, all you have to do is wrap the content with Cloudflare SSE tags. Wrap any content that you want to be excluded from suspicious visitors in the following SSE tags: <!--sse--><!--/sse-->. For example: <!--sse-->  Bad visitors won't see my phone number, 555-555-5555 <!--/sse-->. Note: SSE only will work with HTML. If you have HTML minification enabled, you won't see the SSE tags in your HTML source when it's served through Cloudflare. SSE will still function in this case, as Cloudflare's HTML minification and SSE functionality occur on-the-fly as the resource moves through our network to the visitor's computer. (https://support.cloudflare.com/hc/en-us/articles/200170036).

    - `id: "server_side_exclude"`

      ID of the zone setting.

      - `"server_side_exclude"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSha1Support object { id, value, editable, modified_on }`

    Allow SHA1 support.

    - `id: "sha1_support"`

      Zone setting identifier.

      - `"sha1_support"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasSortQueryStringForCache object { id, value, editable, modified_on }`

    Cloudflare will treat files with the same query strings as the same file in cache, regardless of the order of the query strings. This is limited to Enterprise Zones.

    - `id: "sort_query_string_for_cache"`

      ID of the zone setting.

      - `"sort_query_string_for_cache"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasSSL object { id, value, editable, modified_on }`

    SSL encrypts your visitor's connection and safeguards credit card numbers and other personal data to and from your website. SSL can take up to 5 minutes to fully activate. Requires Cloudflare active on your root domain or www domain. Off: no SSL between the visitor and Cloudflare, and no SSL between Cloudflare and your web server  (all HTTP traffic). Flexible: SSL between the visitor and Cloudflare -- visitor sees HTTPS on your site, but no SSL between Cloudflare and your web server. You don't need to have an SSL cert on your web server, but your vistors will still see the site as being HTTPS enabled. Full:  SSL between the visitor and Cloudflare -- visitor sees HTTPS on your site, and SSL between Cloudflare and your web server. You'll need to have your own SSL cert or self-signed cert at the very least. Full (Strict): SSL between the visitor and Cloudflare -- visitor sees HTTPS on your site, and SSL between Cloudflare and your web server. You'll need to have a valid SSL certificate installed on your web server. This certificate must be signed by a certificate authority, have an expiration date in the future, and respond for the request domain name (hostname). (https://support.cloudflare.com/hc/en-us/articles/200170416).

    - `id: "ssl"`

      ID of the zone setting.

      - `"ssl"`

    - `value: "off" or "flexible" or "full" or "strict"`

      Current value of the zone setting.

      - `"off"`

      - `"flexible"`

      - `"full"`

      - `"strict"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `SSLRecommender object { id, enabled }`

    Enrollment in the SSL/TLS Recommender service which tries to detect and recommend (by sending periodic emails) the most secure SSL/TLS setting your origin servers support.

    - `id: optional "ssl_recommender"`

      Enrollment value for SSL/TLS Recommender.

      - `"ssl_recommender"`

    - `enabled: optional boolean`

      ssl-recommender enrollment setting.

  - `ZonesTLS1_2Only object { id, value, editable, modified_on }`

    Only allows TLS1.2.

    - `id: "tls_1_2_only"`

      Zone setting identifier.

      - `"tls_1_2_only"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `TLS1_3 object { id, value, editable, modified_on }`

    Enables Crypto TLS 1.3 feature for a zone.

    - `id: "tls_1_3"`

      ID of the zone setting.

      - `"tls_1_3"`

    - `value: "on" or "off" or "zrt"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

      - `"zrt"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `TLSClientAuth object { id, value, editable, modified_on }`

    TLS Client Auth requires Cloudflare to connect to your origin server using a client certificate (Enterprise Only).

    - `id: "tls_client_auth"`

      ID of the zone setting.

      - `"tls_client_auth"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasTrueClientIPHeader object { id, value, editable, modified_on }`

    Allows customer to continue to use True Client IP (Akamai feature) in the headers we send to the origin. This is limited to Enterprise Zones.

    - `id: "true_client_ip_header"`

      ID of the zone setting.

      - `"true_client_ip_header"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasWAF object { id, value, editable, modified_on }`

    The WAF examines HTTP requests to your website.  It inspects both GET and POST requests and applies rules to help filter out illegitimate traffic from legitimate website visitors. The Cloudflare WAF inspects website addresses or URLs to detect anything out of the ordinary. If the Cloudflare WAF determines suspicious user behavior, then the WAF will 'challenge' the web visitor with a page that asks them to submit a CAPTCHA successfully  to continue their action. If the challenge is failed, the action will be stopped. What this means is that Cloudflare's WAF will block any traffic identified as illegitimate before it reaches your origin web server. (https://support.cloudflare.com/hc/en-us/articles/200172016).

    - `id: "waf"`

      ID of the zone setting.

      - `"waf"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `WebP object { id, value, editable, modified_on }`

    When the client requesting the image supports the WebP image codec, and WebP offers a performance advantage over the original image format, Cloudflare will serve a WebP version of the original image.

    - `id: "webp"`

      ID of the zone setting.

      - `"webp"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `Websocket object { id, value, editable, modified_on }`

    WebSockets are open connections sustained between the client and the origin server. Inside a WebSockets connection, the client and the origin can pass data back and forth without having to reestablish sessions. This makes exchanging data within a WebSockets connection fast. WebSockets are often used for real-time applications such as live chat and gaming. For more information refer to [Can I use Cloudflare with Websockets](https://support.cloudflare.com/hc/en-us/articles/200169466-Can-I-use-Cloudflare-with-WebSockets-).

    - `id: "websockets"`

      ID of the zone setting.

      - `"websockets"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

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

- `success: boolean`

  Whether the API call was successful

- `result: optional array of ZeroRTT or AdvancedDDoS or object { id, modified_on, value }  or 59 more`

  - `ZeroRTT object { id, value, editable, modified_on }`

    0-RTT session resumption enabled for this zone.

    - `id: "0rtt"`

      ID of the zone setting.

      - `"0rtt"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `AdvancedDDoS object { id, value, editable, modified_on }`

    Advanced protection from Distributed Denial of Service (DDoS) attacks on your website. This is an uneditable value that is 'on' in the case of Business and Enterprise zones.

    - `id: "advanced_ddos"`

      ID of the zone setting.

      - `"advanced_ddos"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesCacheRulesAegis object { id, modified_on, value }`

    Aegis provides dedicated egress IPs (from Cloudflare to your origin) for your layer 7 WAF and CDN services. The egress IPs are reserved exclusively for your account so that you can increase your origin security by only allowing traffic from a small list of IP addresses.

    - `id: "aegis"`

      ID of the zone setting.

      - `"aegis"`

    - `modified_on: optional string`

      Last time this setting was modified.

    - `value: optional object { enabled, pool_id }`

      Value of the zone setting.

      - `enabled: optional boolean`

        Whether the feature is enabled or not.

      - `pool_id: optional string`

        Egress pool id which refers to a grouping of dedicated egress IPs through which Cloudflare will connect to origin.

  - `AlwaysOnline object { id, value, editable, modified_on }`

    When enabled, Cloudflare serves limited copies of web pages available from the [Internet Archive's Wayback Machine](https://archive.org/web/) if your server is offline. Refer to [Always Online](https://developers.cloudflare.com/cache/about/always-online) for more information.

    - `id: "always_online"`

      ID of the zone setting.

      - `"always_online"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasAlwaysUseHTTPS object { id, value, editable, modified_on }`

    Reply to all requests for URLs that use "http" with a 301 redirect to the equivalent "https" URL. If you only want to redirect for a subset of requests, consider creating an "Always use HTTPS" page rule.

    - `id: "always_use_https"`

      ID of the zone setting.

      - `"always_use_https"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasAutomaticHTTPSRewrites object { id, value, editable, modified_on }`

    Enable the Automatic HTTPS Rewrites feature for this zone.

    - `id: "automatic_https_rewrites"`

      ID of the zone setting.

      - `"automatic_https_rewrites"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `Brotli object { id, value, editable, modified_on }`

    When the client requesting an asset supports the Brotli compression algorithm, Cloudflare will serve a Brotli compressed version of the asset.

    - `id: "brotli"`

      ID of the zone setting.

      - `"brotli"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasBrowserCacheTTL object { id, value, editable, modified_on }`

    Browser Cache TTL (in seconds) specifies how long Cloudflare-cached resources will remain on your visitors' computers. Cloudflare will honor any larger times specified by your server. (https://support.cloudflare.com/hc/en-us/articles/200168276).

    - `id: "browser_cache_ttl"`

      ID of the zone setting.

      - `"browser_cache_ttl"`

    - `value: number`

      Current value of the zone setting.

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasBrowserCheck object { id, value, editable, modified_on }`

    Browser Integrity Check is similar to Bad Behavior and looks for common HTTP headers abused most commonly by spammers and denies access to your page.  It will also challenge visitors that do not have a user agent or a non standard user agent (also commonly used by abuse bots, crawlers or visitors). (https://support.cloudflare.com/hc/en-us/articles/200170086).

    - `id: "browser_check"`

      ID of the zone setting.

      - `"browser_check"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasCacheLevel object { id, value, editable, modified_on }`

    Cache Level functions based off the setting level. The basic setting will cache most static resources (i.e., css, images, and JavaScript). The simplified setting will ignore the query string when delivering a cached resource. The aggressive setting will cache all static resources, including ones with a query string. (https://support.cloudflare.com/hc/en-us/articles/200168256).

    - `id: "cache_level"`

      ID of the zone setting.

      - `"cache_level"`

    - `value: "aggressive" or "basic" or "simplified"`

      Current value of the zone setting.

      - `"aggressive"`

      - `"basic"`

      - `"simplified"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ChallengeTTL object { id, value, editable, modified_on }`

    Specify how long a visitor is allowed access to your site after successfully completing a challenge (such as a CAPTCHA). After the TTL has expired the visitor will have to complete a new challenge. We recommend a 15 - 45 minute setting and will attempt to honor any setting above 45 minutes. (https://support.cloudflare.com/hc/en-us/articles/200170136).

    - `id: "challenge_ttl"`

      ID of the zone setting.

      - `"challenge_ttl"`

    - `value: 300 or 900 or 1800 or 11 more`

      Current value of the zone setting.

      - `300`

      - `900`

      - `1800`

      - `2700`

      - `3600`

      - `7200`

      - `10800`

      - `14400`

      - `28800`

      - `57600`

      - `86400`

      - `604800`

      - `2592000`

      - `31536000`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `Ciphers object { id, value, editable, modified_on }`

    An allowlist of ciphers for TLS termination. These ciphers must be in the BoringSSL format.

    - `id: "ciphers"`

      ID of the zone setting.

      - `"ciphers"`

    - `value: array of string`

      Current value of the zone setting.

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesContentConverter object { id, value, editable, modified_on }`

    When enabled and the client sends an Accept header requesting text/markdown,
    Cloudflare will convert HTML responses to Markdown format using the toMarkdown() service.
    Refer to the [developer documentation](https://developers.cloudflare.com/workers-ai/features/markdown-conversion/) for more information.

    - `id: "content_converter"`

      ID of the zone setting.

      - `"content_converter"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesCNAMEFlattening object { id, value, editable, modified_on }`

    Whether or not cname flattening is on.

    - `id: "cname_flattening"`

      How to flatten the cname destination.

      - `"cname_flattening"`

    - `value: "flatten_at_root" or "flatten_all"`

      Current value of the zone setting.

      - `"flatten_at_root"`

      - `"flatten_all"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `DevelopmentMode object { id, value, editable, 2 more }`

    Development Mode temporarily allows you to enter development mode for your websites if you need to make changes to your site. This will bypass Cloudflare's accelerated cache and slow down your site, but is useful if you are making changes to cacheable content (like images, css, or JavaScript) and would like to see those changes right away. Once entered, development mode will last for 3 hours and then automatically toggle off.

    - `id: "development_mode"`

      ID of the zone setting.

      - `"development_mode"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

    - `time_remaining: optional number`

      Value of the zone setting.
      Notes: The interval (in seconds) from when development mode expires (positive integer) or last expired (negative integer) for the domain. If development mode has never been enabled, this value is false.

  - `EarlyHints object { id, value, editable, modified_on }`

    When enabled, Cloudflare will attempt to speed up overall page loads by serving `103` responses with `Link` headers from the final response. Refer to [Early Hints](https://developers.cloudflare.com/cache/about/early-hints) for more information.

    - `id: "early_hints"`

      ID of the zone setting.

      - `"early_hints"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasEdgeCacheTTL object { id, value, editable, modified_on }`

    Time (in seconds) that a resource will be ensured to remain on Cloudflare's cache servers.

    - `id: "edge_cache_ttl"`

      ID of the zone setting.

      - `"edge_cache_ttl"`

    - `value: 30 or 60 or 300 or 18 more`

      Current value of the zone setting.

      - `30`

      - `60`

      - `300`

      - `1200`

      - `1800`

      - `3600`

      - `7200`

      - `10800`

      - `14400`

      - `18000`

      - `28800`

      - `43200`

      - `57600`

      - `72000`

      - `86400`

      - `172800`

      - `259200`

      - `345600`

      - `432000`

      - `518400`

      - `604800`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasEmailObfuscation object { id, value, editable, modified_on }`

    Encrypt email adresses on your web page from bots, while keeping them visible to humans. (https://support.cloudflare.com/hc/en-us/articles/200170016).

    - `id: "email_obfuscation"`

      ID of the zone setting.

      - `"email_obfuscation"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `H2Prioritization object { id, value, editable, modified_on }`

    HTTP/2 Edge Prioritization optimises the delivery of resources served through HTTP/2 to improve page load performance. It also supports fine control of content delivery when used in conjunction with Workers.

    - `id: "h2_prioritization"`

      ID of the zone setting.

      - `"h2_prioritization"`

    - `value: "on" or "off" or "custom"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

      - `"custom"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `HotlinkProtection object { id, value, editable, modified_on }`

    When enabled, the Hotlink Protection option ensures that other sites cannot suck up your bandwidth by building pages that use images hosted on your site. Anytime a request for an image on your site hits Cloudflare, we check to ensure that it's not another site requesting them. People will still be able to download and view images from your page, but other sites won't be able to steal them for use on their own pages. (https://support.cloudflare.com/hc/en-us/articles/200170026).

    - `id: "hotlink_protection"`

      ID of the zone setting.

      - `"hotlink_protection"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `HTTP2 object { id, value, editable, modified_on }`

    HTTP2 enabled for this zone.

    - `id: "http2"`

      ID of the zone setting.

      - `"http2"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `HTTP3 object { id, value, editable, modified_on }`

    HTTP3 enabled for this zone.

    - `id: "http3"`

      ID of the zone setting.

      - `"http3"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ImageResizing object { id, value, editable, modified_on }`

    Image Transformations provides on-demand resizing, conversion and optimization for images served through Cloudflare's network. Refer to the [Image Transformations documentation](https://developers.cloudflare.com/images/) for more information.

    - `id: "image_resizing"`

      ID of the zone setting.

      - `"image_resizing"`

    - `value: "on" or "off" or "open"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

      - `"open"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasIPGeolocation object { id, value, editable, modified_on }`

    Enable IP Geolocation to have Cloudflare geolocate visitors to your website and pass the country code to you. (https://support.cloudflare.com/hc/en-us/articles/200168236).

    - `id: "ip_geolocation"`

      ID of the zone setting.

      - `"ip_geolocation"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `IPV6 object { id, value, editable, modified_on }`

    Enable IPv6 on all subdomains that are Cloudflare enabled.  (https://support.cloudflare.com/hc/en-us/articles/200168586).

    - `id: "ipv6"`

      ID of the zone setting.

      - `"ipv6"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesMaxUpload object { id, value, editable, modified_on }`

    Maximum size of an allowable upload.

    - `id: "max_upload"`

      identifier of the zone setting.

      - `"max_upload"`

    - `value: 100 or 125 or 150 or 15 more`

      Current value of the zone setting.

      - `100`

      - `125`

      - `150`

      - `175`

      - `200`

      - `225`

      - `250`

      - `275`

      - `300`

      - `325`

      - `350`

      - `375`

      - `400`

      - `425`

      - `450`

      - `475`

      - `500`

      - `1000`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `MinTLSVersion object { id, value, editable, modified_on }`

    Only accepts HTTPS requests that use at least the TLS protocol version specified. For example, if TLS 1.1 is selected, TLS 1.0 connections will be rejected, while 1.1, 1.2, and 1.3 (if enabled) will be permitted.

    - `id: "min_tls_version"`

      ID of the zone setting.

      - `"min_tls_version"`

    - `value: "1.0" or "1.1" or "1.2" or "1.3"`

      Current value of the zone setting.

      - `"1.0"`

      - `"1.1"`

      - `"1.2"`

      - `"1.3"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasMirage object { id, value, editable, modified_on }`

    Automatically optimize image loading for website visitors on mobile
    devices. Refer to [our blog post](http://blog.cloudflare.com/mirage2-solving-mobile-speed)
    for more information.

    - `id: "mirage"`

      ID of the zone setting.

      - `"mirage"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `NEL object { id, value, editable, modified_on }`

    Enable Network Error Logging reporting on your zone. (Beta)

    - `id: "nel"`

      Zone setting identifier.

      - `"nel"`

    - `value: object { enabled }`

      Current value of the zone setting.

      - `enabled: optional boolean`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasOpportunisticEncryption object { id, value, editable, modified_on }`

    Enables the Opportunistic Encryption feature for a zone.

    - `id: "opportunistic_encryption"`

      ID of the zone setting.

      - `"opportunistic_encryption"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `OpportunisticOnion object { id, value, editable, modified_on }`

    Add an Alt-Svc header to all legitimate requests from Tor, allowing the connection to use our onion services instead of exit nodes.

    - `id: "opportunistic_onion"`

      ID of the zone setting.

      - `"opportunistic_onion"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `OrangeToOrange object { id, value, editable, modified_on }`

    Orange to Orange (O2O) allows zones on Cloudflare to CNAME to other zones also on Cloudflare.

    - `id: "orange_to_orange"`

      ID of the zone setting.

      - `"orange_to_orange"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasOriginErrorPagePassThru object { id, value, editable, modified_on }`

    Cloudflare will proxy customer error pages on any 502,504 errors on origin server instead of showing a default Cloudflare error page. This does not apply to 522 errors and is limited to Enterprise Zones.

    - `id: "origin_error_page_pass_thru"`

      ID of the zone setting.

      - `"origin_error_page_pass_thru"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesCacheRulesOriginH2MaxStreams object { id, modified_on, value }`

    Origin H2 Max Streams configures the max number of concurrent requests that Cloudflare will send within the same connection when communicating with the origin server, if the origin supports it. Note that if your origin does not support H2 multiplexing, 5xx errors may be observed, particularly 520s. Also note that the default value is `100` for all plan types except Enterprise where it is `1`. `1` means that H2 multiplexing is disabled.

    - `id: "origin_h2_max_streams"`

      Value of the zone setting.

      - `"origin_h2_max_streams"`

    - `modified_on: optional string`

      Last time this setting was modified.

    - `value: optional number`

      Value of the Origin H2 Max Streams Setting.

  - `ZonesCacheRulesOriginMaxHTTPVersion object { id, modified_on, value }`

    Origin Max HTTP Setting Version sets the highest HTTP version Cloudflare will attempt to use with your origin. This setting allows Cloudflare to make HTTP/2 requests to your origin. (Refer to [Enable HTTP/2 to Origin](https://developers.cloudflare.com/cache/how-to/enable-http2-to-origin/), for more information.). The default value is "2" for all plan types except Enterprise where it is "1".

    - `id: "origin_max_http_version"`

      Value of the zone setting.

      - `"origin_max_http_version"`

    - `modified_on: optional string`

      Last time this setting was modified.

    - `value: optional "2" or "1"`

      Value of the Origin Max HTTP Version Setting.

      - `"2"`

      - `"1"`

  - `ZonesSchemasPolish object { id, value, editable, modified_on }`

    Removes metadata and compresses your images for faster page load times. Basic (Lossless): Reduce the size of PNG, JPEG, and GIF files - no impact on visual quality. Basic + JPEG (Lossy): Further reduce the size of JPEG files for faster image loading. Larger JPEGs are converted to progressive images, loading a lower-resolution image first and ending in a higher-resolution version. Not recommended for hi-res photography sites.

    - `id: "polish"`

      ID of the zone setting.

      - `"polish"`

    - `value: "off" or "lossless" or "lossy"`

      Current value of the zone setting.

      - `"off"`

      - `"lossless"`

      - `"lossy"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `PrefetchPreload object { id, value, editable, modified_on }`

    Cloudflare will prefetch any URLs that are included in the response headers. This is limited to Enterprise Zones.

    - `id: "prefetch_preload"`

      ID of the zone setting.

      - `"prefetch_preload"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesPrivacyPass object { id, value, editable, modified_on }`

    Privacy Pass v1 was a browser extension developed by the Privacy Pass Team to improve the browsing experience for your visitors by allowing users to reduce the number of CAPTCHAs shown. (https://support.cloudflare.com/hc/en-us/articles/115001992652-Privacy-Pass).

    - `id: "privacy_pass"`

      ID of the zone setting.

      - `"privacy_pass"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ProxyReadTimeout object { id, value, editable, modified_on }`

    Maximum time between two read operations from origin.

    - `id: "proxy_read_timeout"`

      ID of the zone setting.

      - `"proxy_read_timeout"`

    - `value: number`

      Current value of the zone setting.

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `PseudoIPV4 object { id, value, editable, modified_on }`

    The value set for the Pseudo IPv4 setting.

    - `id: "pseudo_ipv4"`

      Value of the Pseudo IPv4 setting.

      - `"pseudo_ipv4"`

    - `value: "off" or "add_header" or "overwrite_header"`

      Current value of the zone setting.

      - `"off"`

      - `"add_header"`

      - `"overwrite_header"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesRedirectsForAITraining object { id, value, editable, modified_on }`

    When enabled, Cloudflare will redirect verified AI training crawlers to canonical URLs
    found in the HTML response, ensuring AI models train on authoritative content.

    - `id: "redirects_for_ai_training"`

      ID of the zone setting.

      - `"redirects_for_ai_training"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesReplaceInsecureJS object { id, value, editable, modified_on }`

    Automatically replace insecure JavaScript libraries with safer and faster alternatives provided under cdnjs and powered by Cloudflare. Currently supports the following libraries: Polyfill under polyfill.io.

    - `id: "replace_insecure_js"`

      ID of the zone setting.

      - `"replace_insecure_js"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasResponseBuffering object { id, value, editable, modified_on }`

    Enables or disables buffering of responses from the proxied server. Cloudflare may buffer the whole payload to deliver it at once to the client versus allowing it to be delivered in chunks. By default, the proxied server streams directly and is not buffered by Cloudflare. This is limited to Enterprise Zones.

    - `id: "response_buffering"`

      ID of the zone setting.

      - `"response_buffering"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasRocketLoader object { id, value, editable, modified_on }`

    Rocket Loader is a general-purpose asynchronous JavaScript optimisation that prioritises rendering your content while loading your site's Javascript asynchronously. Turning on Rocket Loader will immediately improve a web page's rendering time sometimes measured as Time to First Paint (TTFP), and also the `window.onload` time (assuming there is JavaScript on the page). This can have a positive impact on your Google search ranking. When turned on, Rocket Loader will automatically defer the loading of all Javascript referenced in your HTML, with no configuration required. Refer to [Understanding Rocket Loader](https://support.cloudflare.com/hc/articles/200168056) for more information.

    - `id: "rocket_loader"`

      ID of the zone setting.

      - `"rocket_loader"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasAutomaticPlatformOptimization object { id, value, editable, modified_on }`

    [Automatic Platform Optimization for WordPress](https://developers.cloudflare.com/automatic-platform-optimization/) serves your WordPress site from Cloudflare's edge network and caches third-party fonts.

    - `id: "automatic_platform_optimization"`

      ID of the zone setting.

      - `"automatic_platform_optimization"`

    - `value: AutomaticPlatformOptimization`

      Current value of the zone setting.

      - `cache_by_device_type: boolean`

        Indicates whether or not [cache by device type](https://developers.cloudflare.com/automatic-platform-optimization/reference/cache-device-type/) is enabled.

      - `cf: boolean`

        Indicates whether or not Cloudflare proxy is enabled.

      - `enabled: boolean`

        Indicates whether or not Automatic Platform Optimization is enabled.

      - `hostnames: array of string`

        An array of hostnames where Automatic Platform Optimization for WordPress is activated.

      - `wordpress: boolean`

        Indicates whether or not site is powered by WordPress.

      - `wp_plugin: boolean`

        Indicates whether or not [Cloudflare for WordPress plugin](https://wordpress.org/plugins/cloudflare/) is installed.

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSearchForAgents object { id, value, editable, modified_on }`

    When enabled, Cloudflare provisions an AI Search instance for the zone
    and exposes a /.well-known/ai-search endpoint that AI agents can query.
    Markdown responses also receive an agent: YAML capability block advertising
    the search endpoint.

    - `id: "search_for_agents"`

      ID of the zone setting.

      - `"search_for_agents"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `SecurityHeaders object { id, value, editable, modified_on }`

    Cloudflare security header for a zone.

    - `id: "security_header"`

      ID of the zone's security header.

      - `"security_header"`

    - `value: object { strict_transport_security }`

      Current value of the zone setting.

      - `strict_transport_security: optional object { enabled, include_subdomains, max_age, 2 more }`

        Strict Transport Security.

        - `enabled: optional boolean`

          Whether or not strict transport security is enabled.

        - `include_subdomains: optional boolean`

          Include all subdomains for strict transport security.

        - `max_age: optional number`

          Max age in seconds of the strict transport security.

        - `nosniff: optional boolean`

          Whether or not to include 'X-Content-Type-Options: nosniff' header.

        - `preload: optional boolean`

          Enable automatic preload of the HSTS configuration.

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasSecurityLevel object { id, value, editable, modified_on }`

    Choose the appropriate security profile for your website, which will automatically adjust each of the security settings. If you choose to customize an individual security setting, the profile will become Custom. (https://support.cloudflare.com/hc/en-us/articles/200170056).

    - `id: "security_level"`

      ID of the zone setting.

      - `"security_level"`

    - `value: "off" or "essentially_off" or "low" or 3 more`

      Current value of the zone setting.

      - `"off"`

      - `"essentially_off"`

      - `"low"`

      - `"medium"`

      - `"high"`

      - `"under_attack"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ServerSideExcludes object { id, value, editable, modified_on }`

    If there is sensitive content on your website that you want visible to real visitors, but that you want to hide from suspicious visitors, all you have to do is wrap the content with Cloudflare SSE tags. Wrap any content that you want to be excluded from suspicious visitors in the following SSE tags: <!--sse--><!--/sse-->. For example: <!--sse-->  Bad visitors won't see my phone number, 555-555-5555 <!--/sse-->. Note: SSE only will work with HTML. If you have HTML minification enabled, you won't see the SSE tags in your HTML source when it's served through Cloudflare. SSE will still function in this case, as Cloudflare's HTML minification and SSE functionality occur on-the-fly as the resource moves through our network to the visitor's computer. (https://support.cloudflare.com/hc/en-us/articles/200170036).

    - `id: "server_side_exclude"`

      ID of the zone setting.

      - `"server_side_exclude"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSha1Support object { id, value, editable, modified_on }`

    Allow SHA1 support.

    - `id: "sha1_support"`

      Zone setting identifier.

      - `"sha1_support"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasSortQueryStringForCache object { id, value, editable, modified_on }`

    Cloudflare will treat files with the same query strings as the same file in cache, regardless of the order of the query strings. This is limited to Enterprise Zones.

    - `id: "sort_query_string_for_cache"`

      ID of the zone setting.

      - `"sort_query_string_for_cache"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasSSL object { id, value, editable, modified_on }`

    SSL encrypts your visitor's connection and safeguards credit card numbers and other personal data to and from your website. SSL can take up to 5 minutes to fully activate. Requires Cloudflare active on your root domain or www domain. Off: no SSL between the visitor and Cloudflare, and no SSL between Cloudflare and your web server  (all HTTP traffic). Flexible: SSL between the visitor and Cloudflare -- visitor sees HTTPS on your site, but no SSL between Cloudflare and your web server. You don't need to have an SSL cert on your web server, but your vistors will still see the site as being HTTPS enabled. Full:  SSL between the visitor and Cloudflare -- visitor sees HTTPS on your site, and SSL between Cloudflare and your web server. You'll need to have your own SSL cert or self-signed cert at the very least. Full (Strict): SSL between the visitor and Cloudflare -- visitor sees HTTPS on your site, and SSL between Cloudflare and your web server. You'll need to have a valid SSL certificate installed on your web server. This certificate must be signed by a certificate authority, have an expiration date in the future, and respond for the request domain name (hostname). (https://support.cloudflare.com/hc/en-us/articles/200170416).

    - `id: "ssl"`

      ID of the zone setting.

      - `"ssl"`

    - `value: "off" or "flexible" or "full" or "strict"`

      Current value of the zone setting.

      - `"off"`

      - `"flexible"`

      - `"full"`

      - `"strict"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `SSLRecommender object { id, enabled }`

    Enrollment in the SSL/TLS Recommender service which tries to detect and recommend (by sending periodic emails) the most secure SSL/TLS setting your origin servers support.

    - `id: optional "ssl_recommender"`

      Enrollment value for SSL/TLS Recommender.

      - `"ssl_recommender"`

    - `enabled: optional boolean`

      ssl-recommender enrollment setting.

  - `ZonesTLS1_2Only object { id, value, editable, modified_on }`

    Only allows TLS1.2.

    - `id: "tls_1_2_only"`

      Zone setting identifier.

      - `"tls_1_2_only"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `TLS1_3 object { id, value, editable, modified_on }`

    Enables Crypto TLS 1.3 feature for a zone.

    - `id: "tls_1_3"`

      ID of the zone setting.

      - `"tls_1_3"`

    - `value: "on" or "off" or "zrt"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

      - `"zrt"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `TLSClientAuth object { id, value, editable, modified_on }`

    TLS Client Auth requires Cloudflare to connect to your origin server using a client certificate (Enterprise Only).

    - `id: "tls_client_auth"`

      ID of the zone setting.

      - `"tls_client_auth"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesTransformations object { id, value, editable, modified_on }`

    Media Transformations provides on-demand resizing, conversion and optimization for images and video served through Cloudflare's network. Refer to the [Image Transformations](https://developers.cloudflare.com/images/) and [Video Transformations](https://developers.cloudflare.com/stream/transform-videos/#getting-started) documentation for more information.

    - `id: "transformations"`

      ID of the zone setting. Shared between Image Transformations and Video Transformations.

      - `"transformations"`

    - `value: "on" or "off" or "open"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

      - `"open"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesTransformationsAllowedOrigins object { id, value, editable, modified_on }`

    Media Transformations Allowed Origins restricts transformations for images and video served through Cloudflare's network. Refer to the [Image Transformations](https://developers.cloudflare.com/images/) and [Video Transformations](https://developers.cloudflare.com/stream/transform-videos/#getting-started) documentation for more information.

    - `id: "transformations_allowed_origins"`

      ID of the zone setting. Shared between Image Transformations and Video Transformations.

      - `"transformations_allowed_origins"`

    - `value: string`

      Current value of the zone setting.

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasTrueClientIPHeader object { id, value, editable, modified_on }`

    Allows customer to continue to use True Client IP (Akamai feature) in the headers we send to the origin. This is limited to Enterprise Zones.

    - `id: "true_client_ip_header"`

      ID of the zone setting.

      - `"true_client_ip_header"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `ZonesSchemasWAF object { id, value, editable, modified_on }`

    The WAF examines HTTP requests to your website.  It inspects both GET and POST requests and applies rules to help filter out illegitimate traffic from legitimate website visitors. The Cloudflare WAF inspects website addresses or URLs to detect anything out of the ordinary. If the Cloudflare WAF determines suspicious user behavior, then the WAF will 'challenge' the web visitor with a page that asks them to submit a CAPTCHA successfully  to continue their action. If the challenge is failed, the action will be stopped. What this means is that Cloudflare's WAF will block any traffic identified as illegitimate before it reaches your origin web server. (https://support.cloudflare.com/hc/en-us/articles/200172016).

    - `id: "waf"`

      ID of the zone setting.

      - `"waf"`

    - `value: "on" or "off"`

      Current value of the zone setting.

      - `"on"`

      - `"off"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `WebP object { id, value, editable, modified_on }`

    When the client requesting the image supports the WebP image codec, and WebP offers a performance advantage over the original image format, Cloudflare will serve a WebP version of the original image.

    - `id: "webp"`

      ID of the zone setting.

      - `"webp"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

  - `Websocket object { id, value, editable, modified_on }`

    WebSockets are open connections sustained between the client and the origin server. Inside a WebSockets connection, the client and the origin can pass data back and forth without having to reestablish sessions. This makes exchanging data within a WebSockets connection fast. WebSockets are often used for real-time applications such as live chat and gaming. For more information refer to [Can I use Cloudflare with Websockets](https://support.cloudflare.com/hc/en-us/articles/200169466-Can-I-use-Cloudflare-with-WebSockets-).

    - `id: "websockets"`

      ID of the zone setting.

      - `"websockets"`

    - `value: "off" or "on"`

      Current value of the zone setting.

      - `"off"`

      - `"on"`

    - `editable: optional true or false`

      Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

      - `true`

      - `false`

    - `modified_on: optional string`

      last time this setting was modified.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/settings \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '[
          {
            "id": "0rtt",
            "value": "on"
          }
        ]'
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
  "result": [
    {
      "id": "0rtt",
      "value": "on",
      "editable": true,
      "modified_on": "2014-01-01T05:20:00.12345Z"
    }
  ]
}
```

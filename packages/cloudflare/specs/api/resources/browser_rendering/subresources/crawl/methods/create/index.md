## Crawl websites.

**post** `/accounts/{account_id}/browser-rendering/crawl`

Starts a crawl job for the provided URL and its children. Check available options like `gotoOptions` and `waitFor*` to control page load behaviour.

### Path Parameters

- `account_id: string`

  Account ID.

### Query Parameters

- `cacheTTL: optional number`

  Cache TTL default is 5s. Set to 0 to disable.

### Body Parameters

- `body: object { url, actionTimeout, addScriptTag, 25 more }  or object { render, url, crawlPurposes, 8 more }`

  - `object { url, actionTimeout, addScriptTag, 25 more }`

    - `url: string`

      URL to navigate to, eg. `https://example.com`.

    - `actionTimeout: optional number`

      The maximum duration allowed for the browser action to complete after the page has loaded (such as taking screenshots, extracting content, or generating PDFs). If this time limit is exceeded, the action stops and returns a timeout error.

    - `addScriptTag: optional array of object { id, content, type, url }`

      Adds a `<script>` tag into the page with the desired URL or content.

      - `id: optional string`

      - `content: optional string`

      - `type: optional string`

      - `url: optional string`

    - `addStyleTag: optional array of object { content, url }`

      Adds a `<link rel="stylesheet">` tag into the page with the desired URL or a `<style type="text/css">` tag with the content.

      - `content: optional string`

      - `url: optional string`

    - `allowRequestPattern: optional array of string`

      Only allow requests that match the provided regex patterns, eg. '/^.*.(css)'.

    - `allowResourceTypes: optional array of "document" or "stylesheet" or "image" or 15 more`

      Only allow requests that match the provided resource types, eg. 'image' or 'script'.

      - `"document"`

      - `"stylesheet"`

      - `"image"`

      - `"media"`

      - `"font"`

      - `"script"`

      - `"texttrack"`

      - `"xhr"`

      - `"fetch"`

      - `"prefetch"`

      - `"eventsource"`

      - `"websocket"`

      - `"manifest"`

      - `"signedexchange"`

      - `"ping"`

      - `"cspviolationreport"`

      - `"preflight"`

      - `"other"`

    - `authenticate: optional object { password, username }`

      Provide credentials for HTTP authentication.

      - `password: string`

      - `username: string`

    - `bestAttempt: optional boolean`

      Attempt to proceed when 'awaited' events fail or timeout.

    - `cookies: optional array of object { name, value, domain, 11 more }`

      Check [options](https://pptr.dev/api/puppeteer.page.setcookie).

      - `name: string`

        Cookie name.

      - `value: string`

      - `domain: optional string`

      - `expires: optional number`

      - `httpOnly: optional boolean`

      - `partitionKey: optional string`

      - `path: optional string`

      - `priority: optional "Low" or "Medium" or "High"`

        - `"Low"`

        - `"Medium"`

        - `"High"`

      - `sameParty: optional boolean`

      - `sameSite: optional "Strict" or "Lax" or "None"`

        - `"Strict"`

        - `"Lax"`

        - `"None"`

      - `secure: optional boolean`

      - `sourcePort: optional number`

      - `sourceScheme: optional "Unset" or "NonSecure" or "Secure"`

        - `"Unset"`

        - `"NonSecure"`

        - `"Secure"`

      - `url: optional string`

    - `crawlPurposes: optional array of "search" or "ai-input" or "ai-train"`

      List of crawl purposes to respect Content-Signal directives in robots.txt. Allowed values: 'search', 'ai-input', 'ai-train'. Learn more: https://contentsignals.org/. Default: ['search', 'ai-input', 'ai-train'].

      - `"search"`

      - `"ai-input"`

      - `"ai-train"`

    - `depth: optional number`

      Maximum number of levels deep the crawler will traverse from the starting URL.

    - `emulateMediaType: optional string`

    - `formats: optional array of "html" or "markdown" or "json"`

      Formats to return. Default is `html`.

      - `"html"`

      - `"markdown"`

      - `"json"`

    - `gotoOptions: optional object { referer, referrerPolicy, timeout, waitUntil }`

      Check [options](https://pptr.dev/api/puppeteer.gotooptions).

      - `referer: optional string`

      - `referrerPolicy: optional string`

      - `timeout: optional number`

      - `waitUntil: optional "load" or "domcontentloaded" or "networkidle0" or "networkidle2" or array of "load" or "domcontentloaded" or "networkidle0" or "networkidle2"`

        - `"load" or "domcontentloaded" or "networkidle0" or "networkidle2"`

          - `"load"`

          - `"domcontentloaded"`

          - `"networkidle0"`

          - `"networkidle2"`

        - `array of "load" or "domcontentloaded" or "networkidle0" or "networkidle2"`

          - `"load"`

          - `"domcontentloaded"`

          - `"networkidle0"`

          - `"networkidle2"`

    - `jsonOptions: optional object { custom_ai, prompt, response_format }`

      Options for JSON extraction.

      - `custom_ai: optional array of object { model, authorization }`

        Optional list of custom AI models to use for the request. The models will be tried in the order provided, and in case a model returns an error, the next one will be used as fallback.

        - `model: string`

          AI model to use for the request. Must be formed as `<provider>/<model_name>`, e.g. `workers-ai/@cf/meta/llama-3.3-70b-instruct-fp8-fast`.

        - `authorization: optional string`

          Authorization token for the AI model: `Bearer <token>`. Not needed for workers-ai models.

      - `prompt: optional string`

      - `response_format: optional object { type, json_schema }`

        - `type: string`

        - `json_schema: optional map[string or number or boolean or 2 more]`

          Schema for the response format. More information here: https://developers.cloudflare.com/workers-ai/json-mode/

          - `string`

          - `number`

          - `boolean`

          - `unknown`

          - `array of string`

    - `limit: optional number`

      Maximum number of URLs to crawl.

    - `maxAge: optional number`

      Maximum age of a resource that can be returned from cache in seconds. Default is 1 day.

    - `modifiedSince: optional number`

      Unix timestamp (seconds since epoch) indicating to only crawl pages that were modified since this time. For sitemap URLs with a lastmod field, this is compared directly. For other URLs, the crawler will use If-Modified-Since header when fetching. URLs without modification information (no lastmod in sitemap and no Last-Modified header support) will be crawled. Note: This works in conjunction with maxAge - both filters must pass for a cached resource to be used. Must be within the last year and not in the future.

    - `options: optional object { excludePatterns, includeExternalLinks, includePatterns, includeSubdomains }`

      Additional options for the crawler.

      - `excludePatterns: optional array of string`

        Exclude links matching the provided wildcard patterns in the crawl job. Example: 'https://example.com/privacy/**'.

      - `includeExternalLinks: optional boolean`

        Include external links in the crawl job. If set to true, includeSubdomains is ignored.

      - `includePatterns: optional array of string`

        Include only links matching the provided wildcard patterns in the crawl job. Include patterns are evaluated before exclude patterns. URLs that match any of the specified include patterns will be included in the crawl job. Example: 'https://example.com/blog/**'.

      - `includeSubdomains: optional boolean`

        Include links to subdomains in the crawl job. This option is ignored if includeExternalLinks is true.

    - `rejectRequestPattern: optional array of string`

      Block undesired requests that match the provided regex patterns, eg. '/^.*.(css)'.

    - `rejectResourceTypes: optional array of "document" or "stylesheet" or "image" or 15 more`

      Block undesired requests that match the provided resource types, eg. 'image' or 'script'.

      - `"document"`

      - `"stylesheet"`

      - `"image"`

      - `"media"`

      - `"font"`

      - `"script"`

      - `"texttrack"`

      - `"xhr"`

      - `"fetch"`

      - `"prefetch"`

      - `"eventsource"`

      - `"websocket"`

      - `"manifest"`

      - `"signedexchange"`

      - `"ping"`

      - `"cspviolationreport"`

      - `"preflight"`

      - `"other"`

    - `render: optional true`

      Whether to render the page or fetch static content. True by default.

      - `true`

    - `setExtraHTTPHeaders: optional map[string]`

    - `setJavaScriptEnabled: optional boolean`

    - `source: optional "sitemaps" or "links" or "all"`

      Source of links to crawl. 'sitemaps' - only crawl URLs from sitemaps, 'links' - only crawl URLs scraped from pages, 'all' - crawl both sitemap and scraped links (default).

      - `"sitemaps"`

      - `"links"`

      - `"all"`

    - `viewport: optional object { height, width, deviceScaleFactor, 3 more }`

      Check [options](https://pptr.dev/api/puppeteer.page.setviewport).

      - `height: number`

      - `width: number`

      - `deviceScaleFactor: optional number`

      - `hasTouch: optional boolean`

      - `isLandscape: optional boolean`

      - `isMobile: optional boolean`

    - `waitForSelector: optional object { selector, hidden, timeout, visible }`

      Wait for the selector to appear in page. Check [options](https://pptr.dev/api/puppeteer.page.waitforselector).

      - `selector: string`

      - `hidden: optional true`

        - `true`

      - `timeout: optional number`

      - `visible: optional true`

        - `true`

    - `waitForTimeout: optional number`

      Waits for a specified timeout before continuing.

  - `object { render, url, crawlPurposes, 8 more }`

    - `render: false`

      Whether to render the page or fetch static content. True by default.

      - `false`

    - `url: string`

      URL to navigate to, eg. `https://example.com`.

    - `crawlPurposes: optional array of "search" or "ai-input" or "ai-train"`

      List of crawl purposes to respect Content-Signal directives in robots.txt. Allowed values: 'search', 'ai-input', 'ai-train'. Learn more: https://contentsignals.org/. Default: ['search', 'ai-input', 'ai-train'].

      - `"search"`

      - `"ai-input"`

      - `"ai-train"`

    - `depth: optional number`

      Maximum number of levels deep the crawler will traverse from the starting URL.

    - `formats: optional array of "html" or "markdown" or "json"`

      Formats to return. Default is `html`.

      - `"html"`

      - `"markdown"`

      - `"json"`

    - `jsonOptions: optional object { custom_ai, prompt, response_format }`

      Options for JSON extraction.

      - `custom_ai: optional array of object { model, authorization }`

        Optional list of custom AI models to use for the request. The models will be tried in the order provided, and in case a model returns an error, the next one will be used as fallback.

        - `model: string`

          AI model to use for the request. Must be formed as `<provider>/<model_name>`, e.g. `workers-ai/@cf/meta/llama-3.3-70b-instruct-fp8-fast`.

        - `authorization: optional string`

          Authorization token for the AI model: `Bearer <token>`. Not needed for workers-ai models.

      - `prompt: optional string`

      - `response_format: optional object { type, json_schema }`

        - `type: string`

        - `json_schema: optional map[string or number or boolean or 2 more]`

          Schema for the response format. More information here: https://developers.cloudflare.com/workers-ai/json-mode/

          - `string`

          - `number`

          - `boolean`

          - `unknown`

          - `array of string`

    - `limit: optional number`

      Maximum number of URLs to crawl.

    - `maxAge: optional number`

      Maximum age of a resource that can be returned from cache in seconds. Default is 1 day.

    - `modifiedSince: optional number`

      Unix timestamp (seconds since epoch) indicating to only crawl pages that were modified since this time. For sitemap URLs with a lastmod field, this is compared directly. For other URLs, the crawler will use If-Modified-Since header when fetching. URLs without modification information (no lastmod in sitemap and no Last-Modified header support) will be crawled. Note: This works in conjunction with maxAge - both filters must pass for a cached resource to be used. Must be within the last year and not in the future.

    - `options: optional object { excludePatterns, includeExternalLinks, includePatterns, includeSubdomains }`

      Additional options for the crawler.

      - `excludePatterns: optional array of string`

        Exclude links matching the provided wildcard patterns in the crawl job. Example: 'https://example.com/privacy/**'.

      - `includeExternalLinks: optional boolean`

        Include external links in the crawl job. If set to true, includeSubdomains is ignored.

      - `includePatterns: optional array of string`

        Include only links matching the provided wildcard patterns in the crawl job. Include patterns are evaluated before exclude patterns. URLs that match any of the specified include patterns will be included in the crawl job. Example: 'https://example.com/blog/**'.

      - `includeSubdomains: optional boolean`

        Include links to subdomains in the crawl job. This option is ignored if includeExternalLinks is true.

    - `source: optional "sitemaps" or "links" or "all"`

      Source of links to crawl. 'sitemaps' - only crawl URLs from sitemaps, 'links' - only crawl URLs scraped from pages, 'all' - crawl both sitemap and scraped links (default).

      - `"sitemaps"`

      - `"links"`

      - `"all"`

### Returns

- `result: string`

  Crawl job ID.

- `success: boolean`

  Response status.

- `errors: optional array of object { code, message }`

  - `code: number`

    Error code.

  - `message: string`

    Error message.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/browser-rendering/crawl \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "url": "https://example.com"
        }'
```

#### Response

```json
{
  "result": "result",
  "success": true,
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ]
}
```

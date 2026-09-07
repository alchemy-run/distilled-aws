# Browser Rendering

# Content

## Get HTML content.

**post** `/accounts/{account_id}/browser-rendering/content`

Fetches rendered HTML content from provided URL or HTML. Check available options like `gotoOptions` and `waitFor*` to control page load behaviour.

### Path Parameters

- `account_id: string`

  Account ID.

### Query Parameters

- `cacheTTL: optional number`

  Cache TTL default is 5s. Set to 0 to disable.

### Body Parameters

- `body: object { url, actionTimeout, addScriptTag, 16 more }  or object { html, actionTimeout, addScriptTag, 16 more }`

  - `object { url, actionTimeout, addScriptTag, 16 more }`

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

    - `emulateMediaType: optional string`

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

    - `setExtraHTTPHeaders: optional map[string]`

    - `setJavaScriptEnabled: optional boolean`

    - `userAgent: optional string`

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

  - `object { html, actionTimeout, addScriptTag, 16 more }`

    - `html: string`

      Set the content of the page, eg: `<h1>Hello World!!</h1>`. Either `html` or `url` must be set.

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

    - `emulateMediaType: optional string`

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

    - `setExtraHTTPHeaders: optional map[string]`

    - `setJavaScriptEnabled: optional boolean`

    - `userAgent: optional string`

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

### Returns

- `meta: object { status, title }`

  - `status: optional number`

  - `title: optional string`

- `success: boolean`

  Response status.

- `errors: optional array of object { code, message }`

  - `code: number`

    Error code.

  - `message: string`

    Error message.

- `result: optional string`

  HTML content.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/browser-rendering/content \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "url": "https://example.com/"
        }'
```

#### Response

```json
{
  "meta": {
    "status": 0,
    "title": "title"
  },
  "success": true,
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "result": "result"
}
```

## Domain Types

### Content Create Response

- `ContentCreateResponse = string`

  HTML content.

# PDF

## Get PDF.

**post** `/accounts/{account_id}/browser-rendering/pdf`

Fetches rendered PDF from provided URL or HTML. Check available options like `gotoOptions` and `waitFor*` to control page load behaviour.

### Path Parameters

- `account_id: string`

  Account ID.

### Query Parameters

- `cacheTTL: optional number`

  Cache TTL default is 5s. Set to 0 to disable.

### Body Parameters

- `body: object { html, actionTimeout, addScriptTag, 17 more }  or object { url, actionTimeout, addScriptTag, 17 more }`

  - `object { html, actionTimeout, addScriptTag, 17 more }`

    - `html: string`

      Set the content of the page, eg: `<h1>Hello World!!</h1>`. Either `html` or `url` must be set.

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

    - `emulateMediaType: optional string`

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

    - `pdfOptions: optional object { displayHeaderFooter, footerTemplate, format, 13 more }`

      Check [options](https://pptr.dev/api/puppeteer.pdfoptions).

      - `displayHeaderFooter: optional boolean`

        Whether to show the header and footer.

      - `footerTemplate: optional string`

        HTML template for the print footer.

      - `format: optional "letter" or "legal" or "tabloid" or 8 more`

        Paper format. Takes priority over width and height if set.

        - `"letter"`

        - `"legal"`

        - `"tabloid"`

        - `"ledger"`

        - `"a0"`

        - `"a1"`

        - `"a2"`

        - `"a3"`

        - `"a4"`

        - `"a5"`

        - `"a6"`

      - `headerTemplate: optional string`

        HTML template for the print header.

      - `height: optional string or number`

        Sets the height of paper. Can be a number or string with unit.

        - `string`

        - `number`

      - `landscape: optional boolean`

        Whether to print in landscape orientation.

      - `margin: optional object { bottom, left, right, top }`

        Set the PDF margins. Useful when setting header and footer.

        - `bottom: optional string or number`

          - `string`

          - `number`

        - `left: optional string or number`

          - `string`

          - `number`

        - `right: optional string or number`

          - `string`

          - `number`

        - `top: optional string or number`

          - `string`

          - `number`

      - `omitBackground: optional boolean`

        Hides default white background and allows generating pdfs with transparency.

      - `outline: optional boolean`

        Generate document outline.

      - `pageRanges: optional string`

        Paper ranges to print, e.g. '1-5, 8, 11-13'.

      - `preferCSSPageSize: optional boolean`

        Give CSS @page size priority over other size declarations.

      - `printBackground: optional boolean`

        Set to true to print background graphics.

      - `scale: optional number`

        Scales the rendering of the web page. Amount must be between 0.1 and 2.

      - `tagged: optional boolean`

        Generate tagged (accessible) PDF.

      - `timeout: optional number`

        Timeout in milliseconds.

      - `width: optional string or number`

        Sets the width of paper. Can be a number or string with unit.

        - `string`

        - `number`

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

    - `setExtraHTTPHeaders: optional map[string]`

    - `setJavaScriptEnabled: optional boolean`

    - `userAgent: optional string`

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

  - `object { url, actionTimeout, addScriptTag, 17 more }`

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

    - `emulateMediaType: optional string`

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

    - `pdfOptions: optional object { displayHeaderFooter, footerTemplate, format, 13 more }`

      Check [options](https://pptr.dev/api/puppeteer.pdfoptions).

      - `displayHeaderFooter: optional boolean`

        Whether to show the header and footer.

      - `footerTemplate: optional string`

        HTML template for the print footer.

      - `format: optional "letter" or "legal" or "tabloid" or 8 more`

        Paper format. Takes priority over width and height if set.

        - `"letter"`

        - `"legal"`

        - `"tabloid"`

        - `"ledger"`

        - `"a0"`

        - `"a1"`

        - `"a2"`

        - `"a3"`

        - `"a4"`

        - `"a5"`

        - `"a6"`

      - `headerTemplate: optional string`

        HTML template for the print header.

      - `height: optional string or number`

        Sets the height of paper. Can be a number or string with unit.

        - `string`

        - `number`

      - `landscape: optional boolean`

        Whether to print in landscape orientation.

      - `margin: optional object { bottom, left, right, top }`

        Set the PDF margins. Useful when setting header and footer.

        - `bottom: optional string or number`

          - `string`

          - `number`

        - `left: optional string or number`

          - `string`

          - `number`

        - `right: optional string or number`

          - `string`

          - `number`

        - `top: optional string or number`

          - `string`

          - `number`

      - `omitBackground: optional boolean`

        Hides default white background and allows generating pdfs with transparency.

      - `outline: optional boolean`

        Generate document outline.

      - `pageRanges: optional string`

        Paper ranges to print, e.g. '1-5, 8, 11-13'.

      - `preferCSSPageSize: optional boolean`

        Give CSS @page size priority over other size declarations.

      - `printBackground: optional boolean`

        Set to true to print background graphics.

      - `scale: optional number`

        Scales the rendering of the web page. Amount must be between 0.1 and 2.

      - `tagged: optional boolean`

        Generate tagged (accessible) PDF.

      - `timeout: optional number`

        Timeout in milliseconds.

      - `width: optional string or number`

        Sets the width of paper. Can be a number or string with unit.

        - `string`

        - `number`

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

    - `setExtraHTTPHeaders: optional map[string]`

    - `setJavaScriptEnabled: optional boolean`

    - `userAgent: optional string`

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/browser-rendering/pdf \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "html": "<h1>Hello World!</h1>"
        }'
```

#### Response

```json
{
  "errors": [
    {
      "code": 2001,
      "message": "Rate limit exceeded"
    }
  ],
  "success": false
}
```

# Scrape

## Scrape elements.

**post** `/accounts/{account_id}/browser-rendering/scrape`

Get meta attributes like height, width, text and others of selected elements.

### Path Parameters

- `account_id: string`

  Account ID.

### Query Parameters

- `cacheTTL: optional number`

  Cache TTL default is 5s. Set to 0 to disable.

### Body Parameters

- `body: object { elements, html, actionTimeout, 17 more }  or object { elements, url, actionTimeout, 17 more }`

  - `object { elements, html, actionTimeout, 17 more }`

    - `elements: array of object { selector }`

      - `selector: string`

    - `html: string`

      Set the content of the page, eg: `<h1>Hello World!!</h1>`. Either `html` or `url` must be set.

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

    - `emulateMediaType: optional string`

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

    - `setExtraHTTPHeaders: optional map[string]`

    - `setJavaScriptEnabled: optional boolean`

    - `userAgent: optional string`

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

  - `object { elements, url, actionTimeout, 17 more }`

    - `elements: array of object { selector }`

      - `selector: string`

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

    - `emulateMediaType: optional string`

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

    - `setExtraHTTPHeaders: optional map[string]`

    - `setJavaScriptEnabled: optional boolean`

    - `userAgent: optional string`

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

### Returns

- `result: array of object { results, selector }`

  - `results: object { attributes, height, html, 4 more }`

    - `attributes: array of object { name, value }`

      - `name: string`

        Attribute name.

      - `value: string`

        Attribute value.

    - `height: number`

      Element height.

    - `html: string`

      HTML content.

    - `left: number`

      Element left.

    - `text: string`

      Text content.

    - `top: number`

      Element top.

    - `width: number`

      Element width.

  - `selector: string`

    Selector.

- `success: boolean`

  Response status.

- `errors: optional array of object { code, message }`

  - `code: number`

    Error code.

  - `message: string`

    Error message.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/browser-rendering/scrape \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "elements": [
            {
              "selector": "selector"
            }
          ],
          "html": "<h1>Hello World!</h1>"
        }'
```

#### Response

```json
{
  "result": [
    {
      "results": {
        "attributes": [
          {
            "name": "name",
            "value": "value"
          }
        ],
        "height": 0,
        "html": "html",
        "left": 0,
        "text": "text",
        "top": 0,
        "width": 0
      },
      "selector": "selector"
    }
  ],
  "success": true,
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ]
}
```

## Domain Types

### Scrape Create Response

- `ScrapeCreateResponse = array of object { results, selector }`

  - `results: object { attributes, height, html, 4 more }`

    - `attributes: array of object { name, value }`

      - `name: string`

        Attribute name.

      - `value: string`

        Attribute value.

    - `height: number`

      Element height.

    - `html: string`

      HTML content.

    - `left: number`

      Element left.

    - `text: string`

      Text content.

    - `top: number`

      Element top.

    - `width: number`

      Element width.

  - `selector: string`

    Selector.

# Screenshot

## Get screenshot.

**post** `/accounts/{account_id}/browser-rendering/screenshot`

Takes a screenshot of a webpage from provided URL or HTML. Control page loading with `gotoOptions` and `waitFor*` options. Customize screenshots with `viewport`, `fullPage`, `clip` and others.

### Path Parameters

- `account_id: string`

  Account ID.

### Query Parameters

- `cacheTTL: optional number`

  Cache TTL default is 5s. Set to 0 to disable.

### Body Parameters

- `body: object { html, actionTimeout, addScriptTag, 19 more }  or object { url, actionTimeout, addScriptTag, 19 more }`

  - `object { html, actionTimeout, addScriptTag, 19 more }`

    - `html: string`

      Set the content of the page, eg: `<h1>Hello World!!</h1>`. Either `html` or `url` must be set.

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

    - `emulateMediaType: optional string`

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

    - `screenshotOptions: optional object { captureBeyondViewport, clip, encoding, 6 more }`

      Check [options](https://pptr.dev/api/puppeteer.screenshotoptions).

      - `captureBeyondViewport: optional boolean`

      - `clip: optional object { height, width, x, 2 more }`

        - `height: number`

        - `width: number`

        - `x: number`

        - `y: number`

        - `scale: optional number`

      - `encoding: optional "binary" or "base64"`

        - `"binary"`

        - `"base64"`

      - `fromSurface: optional boolean`

      - `fullPage: optional boolean`

      - `omitBackground: optional boolean`

      - `optimizeForSpeed: optional boolean`

      - `quality: optional number`

      - `type: optional "png" or "jpeg" or "webp"`

        - `"png"`

        - `"jpeg"`

        - `"webp"`

    - `scrollPage: optional boolean`

    - `selector: optional string`

    - `setExtraHTTPHeaders: optional map[string]`

    - `setJavaScriptEnabled: optional boolean`

    - `userAgent: optional string`

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

  - `object { url, actionTimeout, addScriptTag, 19 more }`

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

    - `emulateMediaType: optional string`

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

    - `screenshotOptions: optional object { captureBeyondViewport, clip, encoding, 6 more }`

      Check [options](https://pptr.dev/api/puppeteer.screenshotoptions).

      - `captureBeyondViewport: optional boolean`

      - `clip: optional object { height, width, x, 2 more }`

        - `height: number`

        - `width: number`

        - `x: number`

        - `y: number`

        - `scale: optional number`

      - `encoding: optional "binary" or "base64"`

        - `"binary"`

        - `"base64"`

      - `fromSurface: optional boolean`

      - `fullPage: optional boolean`

      - `omitBackground: optional boolean`

      - `optimizeForSpeed: optional boolean`

      - `quality: optional number`

      - `type: optional "png" or "jpeg" or "webp"`

        - `"png"`

        - `"jpeg"`

        - `"webp"`

    - `scrollPage: optional boolean`

    - `selector: optional string`

    - `setExtraHTTPHeaders: optional map[string]`

    - `setJavaScriptEnabled: optional boolean`

    - `userAgent: optional string`

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

### Returns

- `success: boolean`

  Response status.

- `errors: optional array of object { code, message }`

  - `code: number`

    Error code.

  - `message: string`

    Error message.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/browser-rendering/screenshot \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "html": "<h1>Hello World!</h1>"
        }'
```

#### Response

```json
{
  "success": true,
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ]
}
```

## Domain Types

### Screenshot Create Response

- `ScreenshotCreateResponse object { success, errors }`

  - `success: boolean`

    Response status.

  - `errors: optional array of object { code, message }`

    - `code: number`

      Error code.

    - `message: string`

      Error message.

# Snapshot

## Get HTML content and screenshot.

**post** `/accounts/{account_id}/browser-rendering/snapshot`

Returns the page's HTML content and screenshot. Control page loading with `gotoOptions` and `waitFor*` options. Customize screenshots with `viewport`, `fullPage`, `clip` and others.

### Path Parameters

- `account_id: string`

  Account ID.

### Query Parameters

- `cacheTTL: optional number`

  Cache TTL default is 5s. Set to 0 to disable.

### Body Parameters

- `body: object { html, actionTimeout, addScriptTag, 18 more }  or object { url, actionTimeout, addScriptTag, 18 more }`

  - `object { html, actionTimeout, addScriptTag, 18 more }`

    - `html: string`

      Set the content of the page, eg: `<h1>Hello World!!</h1>`. Either `html` or `url` must be set.

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

    - `emulateMediaType: optional string`

    - `formats: optional array of "content" or "screenshot" or "markdown" or "accessibilityTree"`

      - `"content"`

      - `"screenshot"`

      - `"markdown"`

      - `"accessibilityTree"`

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

    - `screenshotOptions: optional object { captureBeyondViewport, clip, fromSurface, 5 more }`

      - `captureBeyondViewport: optional boolean`

      - `clip: optional object { height, width, x, 2 more }`

        - `height: number`

        - `width: number`

        - `x: number`

        - `y: number`

        - `scale: optional number`

      - `fromSurface: optional boolean`

      - `fullPage: optional boolean`

      - `omitBackground: optional boolean`

      - `optimizeForSpeed: optional boolean`

      - `quality: optional number`

      - `type: optional "png" or "jpeg" or "webp"`

        - `"png"`

        - `"jpeg"`

        - `"webp"`

    - `setExtraHTTPHeaders: optional map[string]`

    - `setJavaScriptEnabled: optional boolean`

    - `userAgent: optional string`

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

  - `object { url, actionTimeout, addScriptTag, 18 more }`

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

    - `emulateMediaType: optional string`

    - `formats: optional array of "content" or "screenshot" or "markdown" or "accessibilityTree"`

      - `"content"`

      - `"screenshot"`

      - `"markdown"`

      - `"accessibilityTree"`

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

    - `screenshotOptions: optional object { captureBeyondViewport, clip, fromSurface, 5 more }`

      - `captureBeyondViewport: optional boolean`

      - `clip: optional object { height, width, x, 2 more }`

        - `height: number`

        - `width: number`

        - `x: number`

        - `y: number`

        - `scale: optional number`

      - `fromSurface: optional boolean`

      - `fullPage: optional boolean`

      - `omitBackground: optional boolean`

      - `optimizeForSpeed: optional boolean`

      - `quality: optional number`

      - `type: optional "png" or "jpeg" or "webp"`

        - `"png"`

        - `"jpeg"`

        - `"webp"`

    - `setExtraHTTPHeaders: optional map[string]`

    - `setJavaScriptEnabled: optional boolean`

    - `userAgent: optional string`

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

### Returns

- `meta: object { status, title }`

  - `status: optional number`

  - `title: optional string`

- `success: boolean`

  Response status.

- `errors: optional array of object { code, message }`

  - `code: number`

    Error code.

  - `message: string`

    Error message.

- `result: optional object { accessibilityTree, content, markdown, screenshot }`

  - `accessibilityTree: optional object { role, autocomplete, checked, 23 more }`

    Accessibility tree node

    - `role: string`

    - `autocomplete: optional string`

    - `checked: optional boolean or "mixed"`

      - `boolean`

      - `"mixed"`

        - `"mixed"`

    - `children: optional array of unknown`

    - `description: optional string`

    - `disabled: optional boolean`

    - `expanded: optional boolean`

    - `focused: optional boolean`

    - `haspopup: optional string`

    - `invalid: optional string`

    - `keyshortcuts: optional string`

    - `level: optional number`

    - `modal: optional boolean`

    - `multiline: optional boolean`

    - `multiselectable: optional boolean`

    - `name: optional string`

    - `orientation: optional string`

    - `pressed: optional boolean or "mixed"`

      - `boolean`

      - `"mixed"`

        - `"mixed"`

    - `readonly: optional boolean`

    - `required: optional boolean`

    - `roledescription: optional string`

    - `selected: optional boolean`

    - `value: optional string or number`

      - `string`

      - `number`

    - `valuemax: optional number`

    - `valuemin: optional number`

    - `valuetext: optional string`

  - `content: optional string`

    HTML content.

  - `markdown: optional string`

    Markdown content.

  - `screenshot: optional string`

    Base64 encoded image.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/browser-rendering/snapshot \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "html": "<h1>Hello World!</h1>"
        }'
```

#### Response

```json
{
  "meta": {
    "status": 0,
    "title": "title"
  },
  "success": true,
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "result": {
    "accessibilityTree": {
      "role": "role",
      "autocomplete": "autocomplete",
      "checked": "mixed",
      "children": [
        {}
      ],
      "description": "description",
      "disabled": true,
      "expanded": true,
      "focused": true,
      "haspopup": "haspopup",
      "invalid": "invalid",
      "keyshortcuts": "keyshortcuts",
      "level": 0,
      "modal": true,
      "multiline": true,
      "multiselectable": true,
      "name": "name",
      "orientation": "orientation",
      "pressed": "mixed",
      "readonly": true,
      "required": true,
      "roledescription": "roledescription",
      "selected": true,
      "value": "string",
      "valuemax": 0,
      "valuemin": 0,
      "valuetext": "valuetext"
    },
    "content": "content",
    "markdown": "markdown",
    "screenshot": "screenshot"
  }
}
```

## Domain Types

### Snapshot Create Response

- `SnapshotCreateResponse object { accessibilityTree, content, markdown, screenshot }`

  - `accessibilityTree: optional object { role, autocomplete, checked, 23 more }`

    Accessibility tree node

    - `role: string`

    - `autocomplete: optional string`

    - `checked: optional boolean or "mixed"`

      - `boolean`

      - `"mixed"`

        - `"mixed"`

    - `children: optional array of unknown`

    - `description: optional string`

    - `disabled: optional boolean`

    - `expanded: optional boolean`

    - `focused: optional boolean`

    - `haspopup: optional string`

    - `invalid: optional string`

    - `keyshortcuts: optional string`

    - `level: optional number`

    - `modal: optional boolean`

    - `multiline: optional boolean`

    - `multiselectable: optional boolean`

    - `name: optional string`

    - `orientation: optional string`

    - `pressed: optional boolean or "mixed"`

      - `boolean`

      - `"mixed"`

        - `"mixed"`

    - `readonly: optional boolean`

    - `required: optional boolean`

    - `roledescription: optional string`

    - `selected: optional boolean`

    - `value: optional string or number`

      - `string`

      - `number`

    - `valuemax: optional number`

    - `valuemin: optional number`

    - `valuetext: optional string`

  - `content: optional string`

    HTML content.

  - `markdown: optional string`

    Markdown content.

  - `screenshot: optional string`

    Base64 encoded image.

# Json

## Get json.

**post** `/accounts/{account_id}/browser-rendering/json`

Gets json from a webpage from a provided URL or HTML. Pass `prompt` or `schema` in the body. Control page loading with `gotoOptions` and `waitFor*` options.

### Path Parameters

- `account_id: string`

  Account ID.

### Query Parameters

- `cacheTTL: optional number`

  Cache TTL default is 5s. Set to 0 to disable.

### Body Parameters

- `body: object { html, actionTimeout, addScriptTag, 19 more }  or object { url, actionTimeout, addScriptTag, 19 more }`

  - `object { html, actionTimeout, addScriptTag, 19 more }`

    - `html: string`

      Set the content of the page, eg: `<h1>Hello World!!</h1>`. Either `html` or `url` must be set.

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

    - `custom_ai: optional array of object { model, authorization }`

      Optional list of custom AI models to use for the request. The models will be tried in the order provided, and in case a model returns an error, the next one will be used as fallback.

      - `model: string`

        AI model to use for the request. Must be formed as `<provider>/<model_name>`, e.g. `workers-ai/@cf/meta/llama-3.3-70b-instruct-fp8-fast`.

      - `authorization: optional string`

        Authorization token for the AI model: `Bearer <token>`. Not needed for workers-ai models.

    - `emulateMediaType: optional string`

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

    - `prompt: optional string`

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

    - `response_format: optional object { type, json_schema }`

      - `type: string`

      - `json_schema: optional map[string or number or boolean or 2 more]`

        Schema for the response format. More information here: https://developers.cloudflare.com/workers-ai/json-mode/

        - `string`

        - `number`

        - `boolean`

        - `unknown`

        - `array of string`

    - `setExtraHTTPHeaders: optional map[string]`

    - `setJavaScriptEnabled: optional boolean`

    - `userAgent: optional string`

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

  - `object { url, actionTimeout, addScriptTag, 19 more }`

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

    - `custom_ai: optional array of object { model, authorization }`

      Optional list of custom AI models to use for the request. The models will be tried in the order provided, and in case a model returns an error, the next one will be used as fallback.

      - `model: string`

        AI model to use for the request. Must be formed as `<provider>/<model_name>`, e.g. `workers-ai/@cf/meta/llama-3.3-70b-instruct-fp8-fast`.

      - `authorization: optional string`

        Authorization token for the AI model: `Bearer <token>`. Not needed for workers-ai models.

    - `emulateMediaType: optional string`

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

    - `prompt: optional string`

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

    - `response_format: optional object { type, json_schema }`

      - `type: string`

      - `json_schema: optional map[string or number or boolean or 2 more]`

        Schema for the response format. More information here: https://developers.cloudflare.com/workers-ai/json-mode/

        - `string`

        - `number`

        - `boolean`

        - `unknown`

        - `array of string`

    - `setExtraHTTPHeaders: optional map[string]`

    - `setJavaScriptEnabled: optional boolean`

    - `userAgent: optional string`

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

### Returns

- `result: map[unknown]`

- `success: boolean`

  Response status.

- `errors: optional array of object { code, message }`

  - `code: number`

    Error code.

  - `message: string`

    Error message.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/browser-rendering/json \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "html": "<h1>Hello World!</h1>"
        }'
```

#### Response

```json
{
  "result": {
    "foo": {}
  },
  "success": true,
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ]
}
```

## Domain Types

### Json Create Response

- `JsonCreateResponse = map[unknown]`

# Links

## Get Links.

**post** `/accounts/{account_id}/browser-rendering/links`

Get links from a web page.

### Path Parameters

- `account_id: string`

  Account ID.

### Query Parameters

- `cacheTTL: optional number`

  Cache TTL default is 5s. Set to 0 to disable.

### Body Parameters

- `body: object { html, actionTimeout, addScriptTag, 18 more }  or object { url, actionTimeout, addScriptTag, 18 more }`

  - `object { html, actionTimeout, addScriptTag, 18 more }`

    - `html: string`

      Set the content of the page, eg: `<h1>Hello World!!</h1>`. Either `html` or `url` must be set.

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

    - `emulateMediaType: optional string`

    - `excludeExternalLinks: optional boolean`

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

    - `setExtraHTTPHeaders: optional map[string]`

    - `setJavaScriptEnabled: optional boolean`

    - `userAgent: optional string`

    - `viewport: optional object { height, width, deviceScaleFactor, 3 more }`

      Check [options](https://pptr.dev/api/puppeteer.page.setviewport).

      - `height: number`

      - `width: number`

      - `deviceScaleFactor: optional number`

      - `hasTouch: optional boolean`

      - `isLandscape: optional boolean`

      - `isMobile: optional boolean`

    - `visibleLinksOnly: optional boolean`

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

  - `object { url, actionTimeout, addScriptTag, 18 more }`

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

    - `emulateMediaType: optional string`

    - `excludeExternalLinks: optional boolean`

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

    - `setExtraHTTPHeaders: optional map[string]`

    - `setJavaScriptEnabled: optional boolean`

    - `userAgent: optional string`

    - `viewport: optional object { height, width, deviceScaleFactor, 3 more }`

      Check [options](https://pptr.dev/api/puppeteer.page.setviewport).

      - `height: number`

      - `width: number`

      - `deviceScaleFactor: optional number`

      - `hasTouch: optional boolean`

      - `isLandscape: optional boolean`

      - `isMobile: optional boolean`

    - `visibleLinksOnly: optional boolean`

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

### Returns

- `result: array of string`

- `success: boolean`

  Response status.

- `errors: optional array of object { code, message }`

  - `code: number`

    Error code.

  - `message: string`

    Error message.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/browser-rendering/links \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "html": "<h1>Hello World!</h1>"
        }'
```

#### Response

```json
{
  "result": [
    "string"
  ],
  "success": true,
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ]
}
```

## Domain Types

### Link Create Response

- `LinkCreateResponse = array of string`

# Markdown

## Get markdown.

**post** `/accounts/{account_id}/browser-rendering/markdown`

Gets markdown of a webpage from provided URL or HTML. Control page loading with `gotoOptions` and `waitFor*` options.

### Path Parameters

- `account_id: string`

  Account ID.

### Query Parameters

- `cacheTTL: optional number`

  Cache TTL default is 5s. Set to 0 to disable.

### Body Parameters

- `body: object { url, actionTimeout, addScriptTag, 16 more }  or object { html, actionTimeout, addScriptTag, 16 more }`

  - `object { url, actionTimeout, addScriptTag, 16 more }`

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

    - `emulateMediaType: optional string`

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

    - `setExtraHTTPHeaders: optional map[string]`

    - `setJavaScriptEnabled: optional boolean`

    - `userAgent: optional string`

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

  - `object { html, actionTimeout, addScriptTag, 16 more }`

    - `html: string`

      Set the content of the page, eg: `<h1>Hello World!!</h1>`. Either `html` or `url` must be set.

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

    - `emulateMediaType: optional string`

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

    - `setExtraHTTPHeaders: optional map[string]`

    - `setJavaScriptEnabled: optional boolean`

    - `userAgent: optional string`

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

### Returns

- `success: boolean`

  Response status.

- `errors: optional array of object { code, message }`

  - `code: number`

    Error code.

  - `message: string`

    Error message.

- `result: optional string`

  Markdown content.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/browser-rendering/markdown \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "url": "https://example.com/"
        }'
```

#### Response

```json
{
  "success": true,
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "result": "result"
}
```

## Domain Types

### Markdown Create Response

- `MarkdownCreateResponse = string`

  Markdown content.

# Crawl

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

## Get crawl result.

**get** `/accounts/{account_id}/browser-rendering/crawl/{job_id}`

Returns the result of a crawl job.

### Path Parameters

- `account_id: string`

  Account ID.

- `job_id: string`

  Crawl job ID.

### Query Parameters

- `cacheTTL: optional number`

  Cache TTL default is 5s. Set to 0 to disable.

- `cursor: optional number`

  Cursor for pagination.

- `limit: optional number`

  Limit for pagination.

- `status: optional "queued" or "errored" or "completed" or 3 more`

  Filter by URL status.

  - `"queued"`

  - `"errored"`

  - `"completed"`

  - `"disallowed"`

  - `"skipped"`

  - `"cancelled"`

### Returns

- `result: object { id, browserSecondsUsed, finished, 5 more }`

  - `id: string`

    Crawl job ID.

  - `browserSecondsUsed: number`

    Total seconds spent in browser so far.

  - `finished: number`

    Total number of URLs that have been crawled so far.

  - `records: array of object { metadata, status, url, 3 more }`

    List of crawl job records.

    - `metadata: object { status, url, title }`

      - `status: number`

        HTTP status code of the crawled page.

      - `url: string`

        Final URL of the crawled page.

      - `title: optional string`

        Title of the crawled page.

    - `status: "queued" or "errored" or "completed" or 3 more`

      Current status of the crawled URL.

      - `"queued"`

      - `"errored"`

      - `"completed"`

      - `"disallowed"`

      - `"skipped"`

      - `"cancelled"`

    - `url: string`

      Crawled URL.

    - `html: optional string`

      HTML content of the crawled URL.

    - `json: optional map[unknown]`

      JSON of the content of the crawled URL.

    - `markdown: optional string`

      Markdown of the content of the crawled URL.

  - `skipped: number`

    Total number of URLs that were skipped due to include/exclude/subdomain filters. Skipped URLs are included in records but are not counted toward total/finished.

  - `status: string`

    Current crawl job status.

  - `total: number`

    Total current number of URLs in the crawl job.

  - `cursor: optional string`

    Cursor for pagination.

- `success: boolean`

  Response status.

- `errors: optional array of object { code, message }`

  - `code: number`

    Error code.

  - `message: string`

    Error message.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/browser-rendering/crawl/$JOB_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "id": "id",
    "browserSecondsUsed": 0,
    "finished": 0,
    "records": [
      {
        "metadata": {
          "status": 0,
          "url": "url",
          "title": "title"
        },
        "status": "queued",
        "url": "url",
        "html": "html",
        "json": {
          "foo": {}
        },
        "markdown": "markdown"
      }
    ],
    "skipped": 0,
    "status": "status",
    "total": 0,
    "cursor": "cursor"
  },
  "success": true,
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ]
}
```

## Cancel a crawl job.

**delete** `/accounts/{account_id}/browser-rendering/crawl/{job_id}`

Cancels an ongoing crawl job by setting its status to cancelled and stopping all queued URLs.

### Path Parameters

- `account_id: string`

  Account ID.

- `job_id: string`

  The ID of the crawl job to cancel.

### Returns

- `result: object { job_id, message }`

  - `job_id: string`

    The ID of the cancelled job.

  - `message: string`

    Cancellation confirmation message.

- `success: boolean`

  Response status.

- `errors: optional array of object { code, message }`

  - `code: number`

    Error code.

  - `message: string`

    Error message.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/browser-rendering/crawl/$JOB_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "job_id": "job_id",
    "message": "message"
  },
  "success": true,
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ]
}
```

## Domain Types

### Crawl Create Response

- `CrawlCreateResponse = string`

  Crawl job ID.

### Crawl Get Response

- `CrawlGetResponse object { id, browserSecondsUsed, finished, 5 more }`

  - `id: string`

    Crawl job ID.

  - `browserSecondsUsed: number`

    Total seconds spent in browser so far.

  - `finished: number`

    Total number of URLs that have been crawled so far.

  - `records: array of object { metadata, status, url, 3 more }`

    List of crawl job records.

    - `metadata: object { status, url, title }`

      - `status: number`

        HTTP status code of the crawled page.

      - `url: string`

        Final URL of the crawled page.

      - `title: optional string`

        Title of the crawled page.

    - `status: "queued" or "errored" or "completed" or 3 more`

      Current status of the crawled URL.

      - `"queued"`

      - `"errored"`

      - `"completed"`

      - `"disallowed"`

      - `"skipped"`

      - `"cancelled"`

    - `url: string`

      Crawled URL.

    - `html: optional string`

      HTML content of the crawled URL.

    - `json: optional map[unknown]`

      JSON of the content of the crawled URL.

    - `markdown: optional string`

      Markdown of the content of the crawled URL.

  - `skipped: number`

    Total number of URLs that were skipped due to include/exclude/subdomain filters. Skipped URLs are included in records but are not counted toward total/finished.

  - `status: string`

    Current crawl job status.

  - `total: number`

    Total current number of URLs in the crawl job.

  - `cursor: optional string`

    Cursor for pagination.

### Crawl Delete Response

- `CrawlDeleteResponse object { job_id, message }`

  - `job_id: string`

    The ID of the cancelled job.

  - `message: string`

    Cancellation confirmation message.

# Devtools

# Session

## List sessions.

**get** `/accounts/{account_id}/browser-rendering/devtools/session`

List active browser sessions.

### Path Parameters

- `account_id: string`

  Account ID.

### Query Parameters

- `limit: optional number`

- `offset: optional number`

### Returns

- `sessionId: string`

  Session ID.

- `closeReason: optional string`

  Reason for session closure.

- `closeReasonText: optional string`

  Human-readable close reason.

- `connectionEndTime: optional number`

  Connection end time.

- `connectionId: optional string`

  Connection ID.

- `connectionStartTime: optional number`

  Connection start time.

- `devtoolsFrontendUrl: optional string`

  DevTools frontend URL.

- `endTime: optional number`

  Session end time.

- `lastUpdated: optional number`

  Last updated timestamp.

- `startTime: optional number`

  Session start time.

- `webSocketDebuggerUrl: optional string`

  WebSocket URL for debugging this target.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/browser-rendering/devtools/session \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
[
  {
    "sessionId": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "closeReason": "closeReason",
    "closeReasonText": "closeReasonText",
    "connectionEndTime": 0,
    "connectionId": "connectionId",
    "connectionStartTime": 0,
    "devtoolsFrontendUrl": "devtoolsFrontendUrl",
    "endTime": 0,
    "lastUpdated": 0,
    "startTime": 0,
    "webSocketDebuggerUrl": "webSocketDebuggerUrl"
  }
]
```

## Get session details.

**get** `/accounts/{account_id}/browser-rendering/devtools/session/{session_id}`

Get details for a specific browser session.

### Path Parameters

- `account_id: string`

  Account ID.

- `session_id: string`

  Session ID.

### Returns

- `sessionId: string`

  Session ID.

- `closeReason: optional string`

  Reason for session closure.

- `closeReasonText: optional string`

  Human-readable close reason.

- `connectionEndTime: optional number`

  Connection end time.

- `connectionId: optional string`

  Connection ID.

- `connectionStartTime: optional number`

  Connection start time.

- `devtoolsFrontendUrl: optional string`

  DevTools frontend URL.

- `endTime: optional number`

  Session end time.

- `lastUpdated: optional number`

  Last updated timestamp.

- `startTime: optional number`

  Session start time.

- `webSocketDebuggerUrl: optional string`

  WebSocket URL for debugging this target.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/browser-rendering/devtools/session/$SESSION_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "sessionId": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
  "closeReason": "closeReason",
  "closeReasonText": "closeReasonText",
  "connectionEndTime": 0,
  "connectionId": "connectionId",
  "connectionStartTime": 0,
  "devtoolsFrontendUrl": "devtoolsFrontendUrl",
  "endTime": 0,
  "lastUpdated": 0,
  "startTime": 0,
  "webSocketDebuggerUrl": "webSocketDebuggerUrl"
}
```

## Domain Types

### Session List Response

- `SessionListResponse = array of object { sessionId, closeReason, closeReasonText, 8 more }`

  - `sessionId: string`

    Session ID.

  - `closeReason: optional string`

    Reason for session closure.

  - `closeReasonText: optional string`

    Human-readable close reason.

  - `connectionEndTime: optional number`

    Connection end time.

  - `connectionId: optional string`

    Connection ID.

  - `connectionStartTime: optional number`

    Connection start time.

  - `devtoolsFrontendUrl: optional string`

    DevTools frontend URL.

  - `endTime: optional number`

    Session end time.

  - `lastUpdated: optional number`

    Last updated timestamp.

  - `startTime: optional number`

    Session start time.

  - `webSocketDebuggerUrl: optional string`

    WebSocket URL for debugging this target.

### Session Get Response

- `SessionGetResponse object { sessionId, closeReason, closeReasonText, 8 more }`

  - `sessionId: string`

    Session ID.

  - `closeReason: optional string`

    Reason for session closure.

  - `closeReasonText: optional string`

    Human-readable close reason.

  - `connectionEndTime: optional number`

    Connection end time.

  - `connectionId: optional string`

    Connection ID.

  - `connectionStartTime: optional number`

    Connection start time.

  - `devtoolsFrontendUrl: optional string`

    DevTools frontend URL.

  - `endTime: optional number`

    Session end time.

  - `lastUpdated: optional number`

    Last updated timestamp.

  - `startTime: optional number`

    Session start time.

  - `webSocketDebuggerUrl: optional string`

    WebSocket URL for debugging this target.

# Browser

## Get a browser session ID.

**post** `/accounts/{account_id}/browser-rendering/devtools/browser`

Acquires a browser and returns its session ID and websocket URL.

### Path Parameters

- `account_id: string`

  Account ID.

### Query Parameters

- `keep_alive: optional number`

  Keep-alive time in milliseconds.

- `lab: optional boolean`

  Use experimental browser.

- `liveViewUrlExpiresInMs: optional number`

  How long the live view URL remains valid, in milliseconds (max 60 minutes). Only used when targets is true.

- `recording: optional boolean`

- `targets: optional boolean`

  Include browser targets in response.

### Returns

- `sessionId: string`

  Browser session ID.

- `webSocketDebuggerUrl: optional string`

  WebSocket URL for the session.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/browser-rendering/devtools/browser \
    -X POST \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "sessionId": "sessionId",
  "webSocketDebuggerUrl": "webSocketDebuggerUrl"
}
```

## Acquire and connect to browser session.

**get** `/accounts/{account_id}/browser-rendering/devtools/browser`

Acquires and establishes a WebSocket connection to a browser session.

### Path Parameters

- `account_id: string`

  Account ID.

### Query Parameters

- `keep_alive: optional number`

  Keep-alive time in ms (only valid when acquiring new session).

- `lab: optional boolean`

  Use experimental browser.

- `recording: optional boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/browser-rendering/devtools/browser \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

## Connect to browser session.

**get** `/accounts/{account_id}/browser-rendering/devtools/browser/{session_id}`

Establishes a WebSocket connection to an existing browser session.

### Path Parameters

- `account_id: string`

  Account ID.

- `session_id: string`

  Browser session ID to connect to.

### Query Parameters

- `keep_alive: optional number`

  Keep-alive time in ms (only valid when acquiring new session).

- `lab: optional boolean`

  Use experimental browser.

- `recording: optional boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/browser-rendering/devtools/browser/$SESSION_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

## Close browser session.

**delete** `/accounts/{account_id}/browser-rendering/devtools/browser/{session_id}`

Closes an existing browser session.

### Path Parameters

- `account_id: string`

  Account ID.

- `session_id: string`

  Browser session ID to close.

### Returns

- `status: "closing" or "closed"`

  - `"closing"`

  - `"closed"`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/browser-rendering/devtools/browser/$SESSION_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "status": "closing"
}
```

## Get browser version metadata.

**get** `/accounts/{account_id}/browser-rendering/devtools/browser/{session_id}/json/version`

Get browser version metadata.

### Path Parameters

- `account_id: string`

  Account ID.

- `session_id: string`

  Browser session ID.

### Returns

- `Browser: string`

  Browser name and version.

- `"Protocol-Version": string`

  Chrome DevTools Protocol version.

- `"User-Agent": string`

  User agent string.

- `"V8-Version": string`

  V8 JavaScript engine version.

- `"WebKit-Version": string`

  WebKit version.

- `webSocketDebuggerUrl: string`

  WebSocket URL for debugging the browser.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/browser-rendering/devtools/browser/$SESSION_ID/json/version \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "Browser": "Browser",
  "Protocol-Version": "Protocol-Version",
  "User-Agent": "User-Agent",
  "V8-Version": "V8-Version",
  "WebKit-Version": "WebKit-Version",
  "webSocketDebuggerUrl": "webSocketDebuggerUrl"
}
```

## Get Chrome DevTools Protocol schema.

**get** `/accounts/{account_id}/browser-rendering/devtools/browser/{session_id}/json/protocol`

Returns the complete Chrome DevTools Protocol schema including all domains, commands, events, and types. This schema describes the entire CDP API surface.

### Path Parameters

- `account_id: string`

  Account ID.

- `session_id: string`

  Browser session ID.

### Returns

- `domains: array of object { domain, commands, dependencies, 3 more }`

  List of protocol domains.

  - `domain: string`

    Domain name.

  - `commands: optional array of map[unknown]`

    Available commands.

  - `dependencies: optional array of string`

    Domain dependencies.

  - `events: optional array of map[unknown]`

    Available events.

  - `experimental: optional boolean`

    Whether this domain is experimental.

  - `types: optional array of map[unknown]`

    Type definitions.

- `version: optional object { major, minor }`

  Protocol version.

  - `major: string`

    Major version.

  - `minor: string`

    Minor version.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/browser-rendering/devtools/browser/$SESSION_ID/json/protocol \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "domains": [
    {
      "domain": "domain",
      "commands": [
        {
          "foo": {}
        }
      ],
      "dependencies": [
        "string"
      ],
      "events": [
        {
          "foo": {}
        }
      ],
      "experimental": true,
      "types": [
        {
          "foo": {}
        }
      ]
    }
  ],
  "version": {
    "major": "major",
    "minor": "minor"
  }
}
```

## Domain Types

### Browser Create Response

- `BrowserCreateResponse object { sessionId, webSocketDebuggerUrl }`

  - `sessionId: string`

    Browser session ID.

  - `webSocketDebuggerUrl: optional string`

    WebSocket URL for the session.

### Browser Delete Response

- `BrowserDeleteResponse object { status }`

  - `status: "closing" or "closed"`

    - `"closing"`

    - `"closed"`

### Browser Version Response

- `BrowserVersionResponse object { Browser, "Protocol-Version", "User-Agent", 3 more }`

  - `Browser: string`

    Browser name and version.

  - `"Protocol-Version": string`

    Chrome DevTools Protocol version.

  - `"User-Agent": string`

    User agent string.

  - `"V8-Version": string`

    V8 JavaScript engine version.

  - `"WebKit-Version": string`

    WebKit version.

  - `webSocketDebuggerUrl: string`

    WebSocket URL for debugging the browser.

### Browser Protocol Response

- `BrowserProtocolResponse object { domains, version }`

  - `domains: array of object { domain, commands, dependencies, 3 more }`

    List of protocol domains.

    - `domain: string`

      Domain name.

    - `commands: optional array of map[unknown]`

      Available commands.

    - `dependencies: optional array of string`

      Domain dependencies.

    - `events: optional array of map[unknown]`

      Available events.

    - `experimental: optional boolean`

      Whether this domain is experimental.

    - `types: optional array of map[unknown]`

      Type definitions.

  - `version: optional object { major, minor }`

    Protocol version.

    - `major: string`

      Major version.

    - `minor: string`

      Minor version.

# Page

## Connect to a specific Chrome DevTools page.

**get** `/accounts/{account_id}/browser-rendering/devtools/browser/{session_id}/page/{target_id}`

Establishes a WebSocket connection to a specific Chrome DevTools target or page.

### Path Parameters

- `account_id: string`

  Account ID.

- `session_id: string`

  Browser session ID.

- `target_id: string`

  Target ID, e.g. page ID.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/browser-rendering/devtools/browser/$SESSION_ID/page/$TARGET_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

# Targets

## Open a new browser tab.

**put** `/accounts/{account_id}/browser-rendering/devtools/browser/{session_id}/json/new`

Opens a new tab in the browser. Optionally specify a URL to navigate to.

### Path Parameters

- `account_id: string`

  Account ID.

- `session_id: string`

  Browser session ID.

### Query Parameters

- `liveViewUrlExpiresInMs: optional number`

  How long the live view URL remains valid, in milliseconds (max 60 minutes)

- `url: optional string`

### Returns

- `id: string`

  Target ID.

- `type: string`

  Target type (page, background_page, worker, etc.).

- `url: string`

  URL of the target.

- `description: optional string`

  Target description.

- `devtoolsFrontendUrl: optional string`

  DevTools frontend URL.

- `title: optional string`

  Title of the target.

- `webSocketDebuggerUrl: optional string`

  WebSocket URL for debugging this target.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/browser-rendering/devtools/browser/$SESSION_ID/json/new \
    -X PUT \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "id": "id",
  "type": "type",
  "url": "url",
  "description": "description",
  "devtoolsFrontendUrl": "devtoolsFrontendUrl",
  "title": "title",
  "webSocketDebuggerUrl": "webSocketDebuggerUrl"
}
```

## List targets.

**get** `/accounts/{account_id}/browser-rendering/devtools/browser/{session_id}/json/list`

Returns a list of all debuggable targets including tabs, pages, service workers, and other browser contexts.

### Path Parameters

- `account_id: string`

  Account ID.

- `session_id: string`

  Browser session ID.

### Query Parameters

- `liveViewUrlExpiresInMs: optional number`

  How long the live view URLs remain valid, in milliseconds (max 60 minutes)

### Returns

- `id: string`

  Target ID.

- `type: string`

  Target type (page, background_page, worker, etc.).

- `url: string`

  URL of the target.

- `description: optional string`

  Target description.

- `devtoolsFrontendUrl: optional string`

  DevTools frontend URL.

- `title: optional string`

  Title of the target.

- `webSocketDebuggerUrl: optional string`

  WebSocket URL for debugging this target.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/browser-rendering/devtools/browser/$SESSION_ID/json/list \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
[
  {
    "id": "id",
    "type": "type",
    "url": "url",
    "description": "description",
    "devtoolsFrontendUrl": "devtoolsFrontendUrl",
    "title": "title",
    "webSocketDebuggerUrl": "webSocketDebuggerUrl"
  }
]
```

## Get a target by ID.

**get** `/accounts/{account_id}/browser-rendering/devtools/browser/{session_id}/json/list/{target_id}`

Returns the debuggable target with the given ID.

### Path Parameters

- `account_id: string`

  Account ID.

- `session_id: string`

  Browser session ID.

- `target_id: string`

  Target ID.

### Returns

- `id: string`

  Target ID.

- `type: string`

  Target type (page, background_page, worker, etc.).

- `url: string`

  URL of the target.

- `description: optional string`

  Target description.

- `devtoolsFrontendUrl: optional string`

  DevTools frontend URL.

- `title: optional string`

  Title of the target.

- `webSocketDebuggerUrl: optional string`

  WebSocket URL for debugging this target.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/browser-rendering/devtools/browser/$SESSION_ID/json/list/$TARGET_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "id": "id",
  "type": "type",
  "url": "url",
  "description": "description",
  "devtoolsFrontendUrl": "devtoolsFrontendUrl",
  "title": "title",
  "webSocketDebuggerUrl": "webSocketDebuggerUrl"
}
```

## Activate a browser target.

**get** `/accounts/{account_id}/browser-rendering/devtools/browser/{session_id}/json/activate/{target_id}`

Activates (brings to front) a specific browser target by its ID.

### Path Parameters

- `account_id: string`

  Account ID.

- `session_id: string`

  Browser session ID.

- `target_id: string`

  Target ID to activate.

### Returns

- `message: string`

  Target activated.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/browser-rendering/devtools/browser/$SESSION_ID/json/activate/$TARGET_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "message": "message"
}
```

## Close a browser target.

**get** `/accounts/{account_id}/browser-rendering/devtools/browser/{session_id}/json/close/{target_id}`

Closes a specific browser target (tab, page, etc.) by its ID. Returns 'Target is closing' on success or an error if the target is not found.

### Path Parameters

- `account_id: string`

  Account ID.

- `session_id: string`

  Browser session ID.

- `target_id: string`

  Target ID to close.

### Returns

- `message: string`

  Target is closing.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/browser-rendering/devtools/browser/$SESSION_ID/json/close/$TARGET_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "message": "message"
}
```

## Domain Types

### Target Create Response

- `TargetCreateResponse object { id, type, url, 4 more }`

  - `id: string`

    Target ID.

  - `type: string`

    Target type (page, background_page, worker, etc.).

  - `url: string`

    URL of the target.

  - `description: optional string`

    Target description.

  - `devtoolsFrontendUrl: optional string`

    DevTools frontend URL.

  - `title: optional string`

    Title of the target.

  - `webSocketDebuggerUrl: optional string`

    WebSocket URL for debugging this target.

### Target List Response

- `TargetListResponse = array of object { id, type, url, 4 more }`

  - `id: string`

    Target ID.

  - `type: string`

    Target type (page, background_page, worker, etc.).

  - `url: string`

    URL of the target.

  - `description: optional string`

    Target description.

  - `devtoolsFrontendUrl: optional string`

    DevTools frontend URL.

  - `title: optional string`

    Title of the target.

  - `webSocketDebuggerUrl: optional string`

    WebSocket URL for debugging this target.

### Target Get Response

- `TargetGetResponse object { id, type, url, 4 more }`

  - `id: string`

    Target ID.

  - `type: string`

    Target type (page, background_page, worker, etc.).

  - `url: string`

    URL of the target.

  - `description: optional string`

    Target description.

  - `devtoolsFrontendUrl: optional string`

    DevTools frontend URL.

  - `title: optional string`

    Title of the target.

  - `webSocketDebuggerUrl: optional string`

    WebSocket URL for debugging this target.

### Target Activate Response

- `TargetActivateResponse object { message }`

  - `message: string`

    Target activated.

### Target Close Response

- `TargetCloseResponse object { message }`

  - `message: string`

    Target is closing.

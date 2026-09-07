## Get default Zaraz configuration

**get** `/zones/{zone_id}/settings/zaraz/default`

Gets default Zaraz configuration for a zone.

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

- `result: Configuration`

  Zaraz configuration.

  - `dataLayer: boolean`

    Data layer compatibility mode enabled.

  - `debugKey: string`

    The key for Zaraz debug mode.

  - `settings: object { autoInjectScript, contextEnricher, cookieDomain, 11 more }`

    General Zaraz settings.

    - `autoInjectScript: boolean`

      Automatic injection of Zaraz scripts enabled.

    - `contextEnricher: optional object { escapedWorkerName, workerTag }`

      Details of the worker that receives and edits Zaraz Context object.

      - `escapedWorkerName: string`

      - `workerTag: string`

    - `cookieDomain: optional string`

      The domain Zaraz will use for writing and reading its cookies.

    - `ecommerce: optional boolean`

      Ecommerce API enabled.

    - `eventsApiPath: optional string`

      Custom endpoint for server-side track events.

    - `hideExternalReferer: optional boolean`

      Hiding external referrer URL enabled.

    - `hideIPAddress: optional boolean`

      Trimming IP address enabled.

    - `hideQueryParams: optional boolean`

      Removing URL query params enabled.

    - `hideUserAgent: optional boolean`

      Removing sensitive data from User Agent string enabled.

    - `initPath: optional string`

      Custom endpoint for Zaraz init script.

    - `injectIframes: optional boolean`

      Injection of Zaraz scripts into iframes enabled.

    - `mcRootPath: optional string`

      Custom path for Managed Components server functionalities.

    - `scriptPath: optional string`

      Custom endpoint for Zaraz main script.

    - `trackPath: optional string`

      Custom endpoint for Zaraz tracking requests.

  - `tools: map[object { blockingTriggers, component, defaultFields, 10 more }  or object { blockingTriggers, component, defaultFields, 11 more } ]`

    Tools set up under Zaraz configuration, where key is the alpha-numeric tool ID and value is the tool configuration object.

    - `ZarazManagedComponent object { blockingTriggers, component, defaultFields, 10 more }`

      - `blockingTriggers: array of string`

        List of blocking trigger IDs.

      - `component: string`

        Tool's internal name.

      - `defaultFields: map[string or boolean]`

        Default fields for tool's actions.

        - `string`

        - `boolean`

      - `enabled: boolean`

        Whether tool is enabled.

      - `name: string`

        Tool's name defined by the user.

      - `permissions: array of string`

        List of permissions granted to the component.

      - `settings: map[string or boolean]`

        Tool's settings.

        - `string`

        - `boolean`

      - `type: "component"`

        - `"component"`

      - `actions: optional map[NeoEvent]`

        Actions configured on a tool. Either this or neoEvents field is required.

        - `actionType: string`

          Tool event type.

        - `blockingTriggers: array of string`

          List of blocking triggers IDs.

        - `data: unknown`

          Event payload.

        - `firingTriggers: array of string`

          List of firing triggers IDs.

      - `defaultPurpose: optional string`

        Default consent purpose ID.

      - `neoEvents: optional array of NeoEvent`

        DEPRECATED - List of actions configured on a tool. Either this or actions field is required. If both are present, actions field will take precedence.

        - `actionType: string`

          Tool event type.

        - `blockingTriggers: array of string`

          List of blocking triggers IDs.

        - `data: unknown`

          Event payload.

        - `firingTriggers: array of string`

          List of firing triggers IDs.

      - `vendorName: optional string`

        Vendor name for TCF compliant consent modal, required for Custom Managed Components and Custom HTML tool with a defaultPurpose assigned.

      - `vendorPolicyUrl: optional string`

        Vendor's Privacy Policy URL for TCF compliant consent modal, required for Custom Managed Components and Custom HTML tool with a defaultPurpose assigned.

    - `Worker object { blockingTriggers, component, defaultFields, 11 more }`

      - `blockingTriggers: array of string`

        List of blocking trigger IDs.

      - `component: string`

        Tool's internal name.

      - `defaultFields: map[string or boolean]`

        Default fields for tool's actions.

        - `string`

        - `boolean`

      - `enabled: boolean`

        Whether tool is enabled.

      - `name: string`

        Tool's name defined by the user.

      - `permissions: array of string`

        List of permissions granted to the component.

      - `settings: map[string or boolean]`

        Tool's settings.

        - `string`

        - `boolean`

      - `type: "custom-mc"`

        - `"custom-mc"`

      - `worker: object { escapedWorkerName, workerTag }`

        Cloudflare worker that acts as a managed component.

        - `escapedWorkerName: string`

        - `workerTag: string`

      - `actions: optional map[NeoEvent]`

        Actions configured on a tool. Either this or neoEvents field is required.

        - `actionType: string`

          Tool event type.

        - `blockingTriggers: array of string`

          List of blocking triggers IDs.

        - `data: unknown`

          Event payload.

        - `firingTriggers: array of string`

          List of firing triggers IDs.

      - `defaultPurpose: optional string`

        Default consent purpose ID.

      - `neoEvents: optional array of NeoEvent`

        DEPRECATED - List of actions configured on a tool. Either this or actions field is required. If both are present, actions field will take precedence.

        - `actionType: string`

          Tool event type.

        - `blockingTriggers: array of string`

          List of blocking triggers IDs.

        - `data: unknown`

          Event payload.

        - `firingTriggers: array of string`

          List of firing triggers IDs.

      - `vendorName: optional string`

        Vendor name for TCF compliant consent modal, required for Custom Managed Components and Custom HTML tool with a defaultPurpose assigned.

      - `vendorPolicyUrl: optional string`

        Vendor's Privacy Policy URL for TCF compliant consent modal, required for Custom Managed Components and Custom HTML tool with a defaultPurpose assigned.

  - `triggers: map[object { excludeRules, loadRules, name, 2 more } ]`

    Triggers set up under Zaraz configuration, where key is the trigger alpha-numeric ID and value is the trigger configuration.

    - `excludeRules: array of object { id, match, op, value }  or object { id, action, settings }  or object { id, action, settings }  or 4 more`

      Rules defining when the trigger is not fired.

      - `ZarazLoadRule object { id, match, op, value }`

        - `id: string`

        - `match: string`

        - `op: "CONTAINS" or "EQUALS" or "STARTS_WITH" or 7 more`

          - `"CONTAINS"`

          - `"EQUALS"`

          - `"STARTS_WITH"`

          - `"ENDS_WITH"`

          - `"MATCH_REGEX"`

          - `"NOT_MATCH_REGEX"`

          - `"GREATER_THAN"`

          - `"GREATER_THAN_OR_EQUAL"`

          - `"LESS_THAN"`

          - `"LESS_THAN_OR_EQUAL"`

        - `value: string`

      - `ZarazClickListenerRule object { id, action, settings }`

        - `id: string`

        - `action: "clickListener"`

          - `"clickListener"`

        - `settings: object { selector, type, waitForTags }`

          - `selector: string`

          - `type: "xpath" or "css"`

            - `"xpath"`

            - `"css"`

          - `waitForTags: number`

      - `ZarazTimerRule object { id, action, settings }`

        - `id: string`

        - `action: "timer"`

          - `"timer"`

        - `settings: object { interval, limit }`

          - `interval: number`

          - `limit: number`

      - `ZarazFormSubmissionRule object { id, action, settings }`

        - `id: string`

        - `action: "formSubmission"`

          - `"formSubmission"`

        - `settings: object { selector, validate }`

          - `selector: string`

          - `validate: boolean`

      - `ZarazVariableMatchRule object { id, action, settings }`

        - `id: string`

        - `action: "variableMatch"`

          - `"variableMatch"`

        - `settings: object { match, variable }`

          - `match: string`

          - `variable: string`

      - `ZarazScrollDepthRule object { id, action, settings }`

        - `id: string`

        - `action: "scrollDepth"`

          - `"scrollDepth"`

        - `settings: object { positions }`

          - `positions: string`

      - `ZarazElementVisibilityRule object { id, action, settings }`

        - `id: string`

        - `action: "elementVisibility"`

          - `"elementVisibility"`

        - `settings: object { selector }`

          - `selector: string`

    - `loadRules: array of object { id, match, op, value }  or object { id, action, settings }  or object { id, action, settings }  or 4 more`

      Rules defining when the trigger is fired.

      - `ZarazLoadRule object { id, match, op, value }`

        - `id: string`

        - `match: string`

        - `op: "CONTAINS" or "EQUALS" or "STARTS_WITH" or 7 more`

          - `"CONTAINS"`

          - `"EQUALS"`

          - `"STARTS_WITH"`

          - `"ENDS_WITH"`

          - `"MATCH_REGEX"`

          - `"NOT_MATCH_REGEX"`

          - `"GREATER_THAN"`

          - `"GREATER_THAN_OR_EQUAL"`

          - `"LESS_THAN"`

          - `"LESS_THAN_OR_EQUAL"`

        - `value: string`

      - `ZarazClickListenerRule object { id, action, settings }`

        - `id: string`

        - `action: "clickListener"`

          - `"clickListener"`

        - `settings: object { selector, type, waitForTags }`

          - `selector: string`

          - `type: "xpath" or "css"`

            - `"xpath"`

            - `"css"`

          - `waitForTags: number`

      - `ZarazTimerRule object { id, action, settings }`

        - `id: string`

        - `action: "timer"`

          - `"timer"`

        - `settings: object { interval, limit }`

          - `interval: number`

          - `limit: number`

      - `ZarazFormSubmissionRule object { id, action, settings }`

        - `id: string`

        - `action: "formSubmission"`

          - `"formSubmission"`

        - `settings: object { selector, validate }`

          - `selector: string`

          - `validate: boolean`

      - `ZarazVariableMatchRule object { id, action, settings }`

        - `id: string`

        - `action: "variableMatch"`

          - `"variableMatch"`

        - `settings: object { match, variable }`

          - `match: string`

          - `variable: string`

      - `ZarazScrollDepthRule object { id, action, settings }`

        - `id: string`

        - `action: "scrollDepth"`

          - `"scrollDepth"`

        - `settings: object { positions }`

          - `positions: string`

      - `ZarazElementVisibilityRule object { id, action, settings }`

        - `id: string`

        - `action: "elementVisibility"`

          - `"elementVisibility"`

        - `settings: object { selector }`

          - `selector: string`

    - `name: string`

      Trigger name.

    - `description: optional string`

      Trigger description.

    - `system: optional "pageload"`

      - `"pageload"`

  - `variables: map[object { name, type, value }  or object { name, type, value }  or object { name, type, value } ]`

    Variables set up under Zaraz configuration, where key is the variable alpha-numeric ID and value is the variable configuration. Values of variables of type secret are not included.

    - `String object { name, type, value }`

      - `name: string`

      - `type: "string"`

        - `"string"`

      - `value: string`

    - `Secret object { name, type, value }`

      - `name: string`

      - `type: "secret"`

        - `"secret"`

      - `value: string`

    - `Worker object { name, type, value }`

      - `name: string`

      - `type: "worker"`

        - `"worker"`

      - `value: object { escapedWorkerName, workerTag }`

        - `escapedWorkerName: string`

        - `workerTag: string`

  - `zarazVersion: number`

    Zaraz internal version of the config.

  - `analytics: optional object { defaultPurpose, enabled, sessionExpTime }`

    Cloudflare Monitoring settings.

    - `defaultPurpose: optional string`

      Consent purpose assigned to Monitoring.

    - `enabled: optional boolean`

      Whether Advanced Monitoring reports are enabled.

    - `sessionExpTime: optional number`

      Session expiration time (seconds).

  - `consent: optional object { enabled, buttonTextTranslations, companyEmail, 12 more }`

    Consent management configuration.

    - `enabled: boolean`

    - `buttonTextTranslations: optional ButtonTextTranslation`

      - `accept_all: map[string]`

        Object where keys are language codes.

      - `confirm_my_choices: map[string]`

        Object where keys are language codes.

      - `reject_all: map[string]`

        Object where keys are language codes.

    - `companyEmail: optional string`

    - `companyName: optional string`

    - `companyStreetAddress: optional string`

    - `consentModalIntroHTML: optional string`

    - `consentModalIntroHTMLWithTranslations: optional map[string]`

      Object where keys are language codes.

    - `cookieName: optional string`

    - `customCSS: optional string`

    - `customIntroDisclaimerDismissed: optional boolean`

    - `defaultLanguage: optional string`

    - `hideModal: optional boolean`

    - `purposes: optional map[object { description, name } ]`

      Object where keys are purpose alpha-numeric IDs.

      - `description: string`

      - `name: string`

    - `purposesWithTranslations: optional map[object { description, name, order } ]`

      Object where keys are purpose alpha-numeric IDs.

      - `description: map[string]`

        Object where keys are language codes.

      - `name: map[string]`

        Object where keys are language codes.

      - `order: number`

    - `tcfCompliant: optional boolean`

  - `historyChange: optional boolean`

    Single Page Application support enabled.

- `success: boolean`

  Whether the API call was successful.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/settings/zaraz/default \
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
    "dataLayer": true,
    "debugKey": "debugKey",
    "settings": {
      "autoInjectScript": true,
      "contextEnricher": {
        "escapedWorkerName": "escapedWorkerName",
        "workerTag": "workerTag"
      },
      "cookieDomain": "cookieDomain",
      "ecommerce": true,
      "eventsApiPath": "eventsApiPath",
      "hideExternalReferer": true,
      "hideIPAddress": true,
      "hideQueryParams": true,
      "hideUserAgent": true,
      "initPath": "initPath",
      "injectIframes": true,
      "mcRootPath": "mcRootPath",
      "scriptPath": "scriptPath",
      "trackPath": "trackPath"
    },
    "tools": {
      "foo": {
        "blockingTriggers": [
          "string"
        ],
        "component": "component",
        "defaultFields": {
          "foo": "string"
        },
        "enabled": true,
        "name": "name",
        "permissions": [
          "string"
        ],
        "settings": {
          "foo": "string"
        },
        "type": "component",
        "actions": {
          "foo": {
            "actionType": "actionType",
            "blockingTriggers": [
              "string"
            ],
            "data": {},
            "firingTriggers": [
              "string"
            ]
          }
        },
        "defaultPurpose": "defaultPurpose",
        "neoEvents": [
          {
            "actionType": "actionType",
            "blockingTriggers": [
              "string"
            ],
            "data": {},
            "firingTriggers": [
              "string"
            ]
          }
        ],
        "vendorName": "vendorName",
        "vendorPolicyUrl": "vendorPolicyUrl"
      }
    },
    "triggers": {
      "foo": {
        "excludeRules": [
          {
            "id": "id",
            "match": "match",
            "op": "CONTAINS",
            "value": "value"
          }
        ],
        "loadRules": [
          {
            "id": "id",
            "match": "match",
            "op": "CONTAINS",
            "value": "value"
          }
        ],
        "name": "name",
        "description": "description",
        "system": "pageload"
      }
    },
    "variables": {
      "foo": {
        "name": "name",
        "type": "string",
        "value": "value"
      }
    },
    "zarazVersion": 0,
    "analytics": {
      "defaultPurpose": "defaultPurpose",
      "enabled": true,
      "sessionExpTime": 60
    },
    "consent": {
      "enabled": true,
      "buttonTextTranslations": {
        "accept_all": {
          "foo": "string"
        },
        "confirm_my_choices": {
          "foo": "string"
        },
        "reject_all": {
          "foo": "string"
        }
      },
      "companyEmail": "companyEmail",
      "companyName": "companyName",
      "companyStreetAddress": "companyStreetAddress",
      "consentModalIntroHTML": "consentModalIntroHTML",
      "consentModalIntroHTMLWithTranslations": {
        "foo": "string"
      },
      "cookieName": "cookieName",
      "customCSS": "customCSS",
      "customIntroDisclaimerDismissed": true,
      "defaultLanguage": "defaultLanguage",
      "hideModal": true,
      "purposes": {
        "foo": {
          "description": "description",
          "name": "name"
        }
      },
      "purposesWithTranslations": {
        "foo": {
          "description": {
            "foo": "string"
          },
          "name": {
            "foo": "string"
          },
          "order": 0
        }
      },
      "tcfCompliant": true
    },
    "historyChange": true
  },
  "success": true
}
```

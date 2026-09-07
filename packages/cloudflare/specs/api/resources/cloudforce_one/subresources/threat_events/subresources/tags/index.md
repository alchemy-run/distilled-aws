# Tags

## Creates a new tag

**post** `/accounts/{account_id}/cloudforce-one/events/tags/create`

Creates a new tag to be used accross threat events.

### Path Parameters

- `account_id: string`

  Account ID.

### Body Parameters

- `value: string`

- `activeDuration: optional string`

- `actorCategory: optional string`

  Actor variety. Allowed values: Activist, Competitor, Customer, Crime Syndicate, Former Employee, Nation State, Organized Crime, Nation State Affiliated, Terrorist, Unaffiliated.

- `actorCategoryConfidence: optional number`

  Confidence (1-10) in the actor variety (actorCategory). CFONE-only: stripped from responses to non-CFONE accounts.

- `aliases: optional array of object { value, confidence, tlp }`

  Structured aliases ({ value, confidence 1-10, tlp }). CFONE-only: stripped from responses to non-CFONE accounts.

  - `value: string`

  - `confidence: optional number`

  - `tlp: optional "red" or "amber" or "green" or "white"`

    - `"red"`

    - `"amber"`

    - `"green"`

    - `"white"`

- `aliasGroupNames: optional array of string`

- `aliasGroupNamesInternal: optional array of string`

- `analyticPriority: optional number`

- `attributionConfidence: optional string`

- `attributionConfidenceScore: optional number`

- `attributionOrganization: optional string`

- `categoryUuid: optional string`

- `dateOfDiscovery: optional string`

  Date the actor was discovered (ISO YYYY-MM-DD).

- `externalReferenceLinks: optional array of string`

- `externalReferences: optional array of object { url, description }`

  Structured external references ({ url, description }). Public: returned to all accounts.

  - `url: string`

  - `description: optional string`

- `internalAliases: optional array of object { value, confidence, tlp }`

  Internal structured aliases ({ value, confidence 1-10, tlp }). CFONE-only: never returned to non-CFONE accounts.

  - `value: string`

  - `confidence: optional number`

  - `tlp: optional "red" or "amber" or "green" or "white"`

    - `"red"`

    - `"amber"`

    - `"green"`

    - `"white"`

- `internalDescription: optional string`

- `motive: optional string`

  Actor motive. Allowed values: Convenience, Fear, Fun, Financial, Grudge, Ideology, Espionage.

- `motiveConfidence: optional number`

  Confidence (1-10) in the actor motive. CFONE-only: stripped from responses to non-CFONE accounts.

- `opsecLevel: optional string`

- `originCountryConfidence: optional number`

  Confidence (1-10) in the origin-country attribution. CFONE-only: stripped from responses to non-CFONE accounts.

- `originCountryISO: optional string`

- `originCountryTlp: optional "red" or "amber" or "green" or "white"`

  TLP marking for the origin-country attribution. CFONE-only: stripped from responses to non-CFONE accounts.

  - `"red"`

  - `"amber"`

  - `"green"`

  - `"white"`

- `priority: optional number`

- `sophisticationLevel: optional string`

### Returns

- `uuid: string`

- `value: string`

- `activeDuration: optional string`

- `actorCategory: optional string`

- `actorCategoryConfidence: optional number`

  Confidence (1-10) in the actor variety (actorCategory). CFONE-only: stripped from responses to non-CFONE accounts.

- `aliases: optional array of object { value, confidence, tlp }`

  Structured aliases ({ value, confidence 1-10, tlp }). CFONE-only: stripped from responses to non-CFONE accounts.

  - `value: string`

  - `confidence: optional number`

  - `tlp: optional "red" or "amber" or "green" or "white"`

    - `"red"`

    - `"amber"`

    - `"green"`

    - `"white"`

- `aliasGroupNames: optional array of string`

- `aliasGroupNamesInternal: optional array of string`

- `analyticPriority: optional number`

- `attributionConfidence: optional string`

- `attributionConfidenceScore: optional number`

- `attributionOrganization: optional string`

- `categoryName: optional string`

- `categoryUuid: optional string`

- `dateOfDiscovery: optional string`

- `externalReferenceLinks: optional array of string`

- `externalReferences: optional array of object { url, description }`

  Structured external references ({ url, description }). Public: returned to all accounts.

  - `url: string`

  - `description: optional string`

- `internalAliases: optional array of object { value, confidence, tlp }`

  Internal structured aliases ({ value, confidence 1-10, tlp }). CFONE-only: never returned to non-CFONE accounts.

  - `value: string`

  - `confidence: optional number`

  - `tlp: optional "red" or "amber" or "green" or "white"`

    - `"red"`

    - `"amber"`

    - `"green"`

    - `"white"`

- `internalDescription: optional string`

- `motive: optional string`

- `motiveConfidence: optional number`

  Confidence (1-10) in the actor motive. CFONE-only: stripped from responses to non-CFONE accounts.

- `opsecLevel: optional string`

- `originCountryConfidence: optional number`

  Confidence (1-10) in the origin-country attribution. CFONE-only: stripped from responses to non-CFONE accounts.

- `originCountryISO: optional string`

- `originCountryISOAlpha3: optional string`

- `originCountryTlp: optional "red" or "amber" or "green" or "white"`

  TLP marking for the origin-country attribution. CFONE-only: stripped from responses to non-CFONE accounts.

  - `"red"`

  - `"amber"`

  - `"green"`

  - `"white"`

- `priority: optional number`

- `sophisticationLevel: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/tags/create \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "value": "APT28",
          "actorCategory": "Nation State",
          "actorCategoryConfidence": 7,
          "attributionConfidenceScore": 7,
          "categoryUuid": "12345678-1234-1234-1234-1234567890ab",
          "dateOfDiscovery": "2024-01-15",
          "motive": "Espionage",
          "motiveConfidence": 7,
          "originCountryConfidence": 7,
          "originCountryTlp": "amber"
        }'
```

#### Response

```json
{
  "uuid": "12345678-1234-1234-1234-1234567890ab",
  "value": "APT28",
  "activeDuration": "activeDuration",
  "actorCategory": "actorCategory",
  "actorCategoryConfidence": 7,
  "aliases": [
    {
      "value": "Fancy Bear",
      "confidence": 8,
      "tlp": "amber"
    }
  ],
  "aliasGroupNames": [
    "string"
  ],
  "aliasGroupNamesInternal": [
    "string"
  ],
  "analyticPriority": 0,
  "attributionConfidence": "attributionConfidence",
  "attributionConfidenceScore": 7,
  "attributionOrganization": "attributionOrganization",
  "categoryName": "Nation State",
  "categoryUuid": "12345678-1234-1234-1234-1234567890ab",
  "dateOfDiscovery": "2024-01-15",
  "externalReferenceLinks": [
    "string"
  ],
  "externalReferences": [
    {
      "url": "https://example.com/report",
      "description": "Vendor threat report"
    }
  ],
  "internalAliases": [
    {
      "value": "Fancy Bear",
      "confidence": 8,
      "tlp": "amber"
    }
  ],
  "internalDescription": "internalDescription",
  "motive": "motive",
  "motiveConfidence": 7,
  "opsecLevel": "opsecLevel",
  "originCountryConfidence": 7,
  "originCountryISO": "originCountryISO",
  "originCountryISOAlpha3": "IRN",
  "originCountryTlp": "amber",
  "priority": 0,
  "sophisticationLevel": "sophisticationLevel"
}
```

## Domain Types

### Tag Create Response

- `TagCreateResponse object { uuid, value, activeDuration, 25 more }`

  - `uuid: string`

  - `value: string`

  - `activeDuration: optional string`

  - `actorCategory: optional string`

  - `actorCategoryConfidence: optional number`

    Confidence (1-10) in the actor variety (actorCategory). CFONE-only: stripped from responses to non-CFONE accounts.

  - `aliases: optional array of object { value, confidence, tlp }`

    Structured aliases ({ value, confidence 1-10, tlp }). CFONE-only: stripped from responses to non-CFONE accounts.

    - `value: string`

    - `confidence: optional number`

    - `tlp: optional "red" or "amber" or "green" or "white"`

      - `"red"`

      - `"amber"`

      - `"green"`

      - `"white"`

  - `aliasGroupNames: optional array of string`

  - `aliasGroupNamesInternal: optional array of string`

  - `analyticPriority: optional number`

  - `attributionConfidence: optional string`

  - `attributionConfidenceScore: optional number`

  - `attributionOrganization: optional string`

  - `categoryName: optional string`

  - `categoryUuid: optional string`

  - `dateOfDiscovery: optional string`

  - `externalReferenceLinks: optional array of string`

  - `externalReferences: optional array of object { url, description }`

    Structured external references ({ url, description }). Public: returned to all accounts.

    - `url: string`

    - `description: optional string`

  - `internalAliases: optional array of object { value, confidence, tlp }`

    Internal structured aliases ({ value, confidence 1-10, tlp }). CFONE-only: never returned to non-CFONE accounts.

    - `value: string`

    - `confidence: optional number`

    - `tlp: optional "red" or "amber" or "green" or "white"`

      - `"red"`

      - `"amber"`

      - `"green"`

      - `"white"`

  - `internalDescription: optional string`

  - `motive: optional string`

  - `motiveConfidence: optional number`

    Confidence (1-10) in the actor motive. CFONE-only: stripped from responses to non-CFONE accounts.

  - `opsecLevel: optional string`

  - `originCountryConfidence: optional number`

    Confidence (1-10) in the origin-country attribution. CFONE-only: stripped from responses to non-CFONE accounts.

  - `originCountryISO: optional string`

  - `originCountryISOAlpha3: optional string`

  - `originCountryTlp: optional "red" or "amber" or "green" or "white"`

    TLP marking for the origin-country attribution. CFONE-only: stripped from responses to non-CFONE accounts.

    - `"red"`

    - `"amber"`

    - `"green"`

    - `"white"`

  - `priority: optional number`

  - `sophisticationLevel: optional string`

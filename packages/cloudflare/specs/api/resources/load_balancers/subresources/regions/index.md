# Regions

## List Regions

**get** `/accounts/{account_id}/load_balancers/regions`

List all region mappings.

### Path Parameters

- `account_id: string`

  Identifier.

### Query Parameters

- `country_code_a2: optional string`

  Two-letter alpha-2 country code followed in ISO 3166-1.

- `subdivision_code: optional string`

  Two-letter subdivision code followed in ISO 3166-2.

- `subdivision_code_a2: optional string`

  Two-letter subdivision code followed in ISO 3166-2.

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

- `result: unknown or string`

  - `unknown`

  - `string`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/load_balancers/regions \
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
  "result": {},
  "success": true
}
```

## Get Region

**get** `/accounts/{account_id}/load_balancers/regions/{region_id}`

Get a single region mapping.

### Path Parameters

- `account_id: string`

  Identifier.

- `region_id: "WNAM" or "ENAM" or "WEU" or 10 more`

  A list of Cloudflare regions. WNAM: Western North America, ENAM: Eastern North America, WEU: Western Europe, EEU: Eastern Europe, NSAM: Northern South America, SSAM: Southern South America, OC: Oceania, ME: Middle East, NAF: North Africa, SAF: South Africa, SAS: Southern Asia, SEAS: South East Asia, NEAS: North East Asia).

  - `"WNAM"`

  - `"ENAM"`

  - `"WEU"`

  - `"EEU"`

  - `"NSAM"`

  - `"SSAM"`

  - `"OC"`

  - `"ME"`

  - `"NAF"`

  - `"SAF"`

  - `"SAS"`

  - `"SEAS"`

  - `"NEAS"`

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

- `result: unknown or string`

  A list of countries and subdivisions mapped to a region.

  - `unknown`

  - `string`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/load_balancers/regions/$REGION_ID \
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
    "iso_standard": "Country and subdivision codes follow ISO 3166-1 alpha-2 and ISO 3166-2",
    "regions": [
      {
        "countries": [
          {
            "country_code_a2": "CA",
            "country_name": "Canada",
            "country_subdivisions": [
              {
                "subdivision_code_a2": "AB",
                "subdivision_name": "Alberta"
              },
              {
                "subdivision_code_a2": "BC",
                "subdivision_name": "British Columbia"
              }
            ]
          },
          {
            "country_code_a2": "HT",
            "country_name": "Haiti"
          },
          {
            "country_code_a2": "MX",
            "country_name": "Mexico"
          },
          {
            "country_code_a2": "US",
            "country_name": "United States",
            "country_subdivisions": [
              {
                "subdivision_code_a2": "AZ",
                "subdivision_name": "Arizona"
              },
              {
                "subdivision_code_a2": "CA",
                "subdivision_name": "California"
              },
              {
                "subdivision_code_a2": "CO",
                "subdivision_name": "Colorado"
              },
              {
                "subdivision_code_a2": "HI",
                "subdivision_name": "Hawaii"
              },
              {
                "subdivision_code_a2": "MN",
                "subdivision_name": "Minnesota"
              },
              {
                "subdivision_code_a2": "MO",
                "subdivision_name": "Missouri"
              },
              {
                "subdivision_code_a2": "NV",
                "subdivision_name": "Nevada"
              },
              {
                "subdivision_code_a2": "OR",
                "subdivision_name": "Oregon"
              },
              {
                "subdivision_code_a2": "TX",
                "subdivision_name": "Texas"
              },
              {
                "subdivision_code_a2": "UT",
                "subdivision_name": "Utah"
              },
              {
                "subdivision_code_a2": "WA",
                "subdivision_name": "Washington"
              }
            ]
          }
        ],
        "region_code": "WNAM"
      }
    ]
  },
  "success": true
}
```

## Domain Types

### Region List Response

- `RegionListResponse = unknown or string`

  - `unknown`

  - `string`

### Region Get Response

- `RegionGetResponse = unknown or string`

  A list of countries and subdivisions mapped to a region.

  - `unknown`

  - `string`

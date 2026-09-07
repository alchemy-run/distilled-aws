## Abuse Report Details

**get** `/accounts/{account_id}/abuse-reports/{report_param}`

Retrieve the details of an abuse report.

### Path Parameters

- `account_id: string`

- `report_param: string`

### Returns

- `result: object { id, cdate, domain, 7 more }`

  - `id: string`

    Public facing ID of abuse report, aka abuse_rand.

  - `cdate: string`

    Creation date of report. Time in RFC 3339 format (https://www.rfc-editor.org/rfc/rfc3339.html)

  - `domain: string`

    Domain that relates to the report.

  - `mitigation_summary: object { accepted_url_count, active_count, external_host_notified, 2 more }`

    A summary of the mitigations related to this report.

    - `accepted_url_count: number`

      How many of the reported URLs were confirmed as abusive.

    - `active_count: number`

      How many mitigations are active.

    - `external_host_notified: boolean`

      Whether the report has been forwarded to an external hosting provider.

    - `in_review_count: number`

      How many mitigations are under review.

    - `pending_count: number`

      How many mitigations are pending their effective date.

  - `status: "accepted" or "in_review"`

    An enum value that represents the status of an abuse record

    - `"accepted"`

    - `"in_review"`

  - `type: "PHISH" or "GEN" or "THREAT" or 6 more`

    The abuse report type

    - `"PHISH"`

    - `"GEN"`

    - `"THREAT"`

    - `"DMCA"`

    - `"EMER"`

    - `"TM"`

    - `"REG_WHO"`

    - `"NCSEI"`

    - `"NETWORK"`

  - `justification: optional string`

    Justification for the report.

  - `original_work: optional string`

    Original work / Targeted brand in the alleged abuse.

  - `submitter: optional object { company, email, name, telephone }`

    Information about the submitter of the report.

    - `company: optional string`

    - `email: optional string`

    - `name: optional string`

    - `telephone: optional string`

  - `urls: optional array of string`

- `success: boolean`

- `errors: optional array of object { message, code }`

  - `message: string`

  - `code: optional string or number`

    - `string`

    - `number`

- `messages: optional array of object { message }`

  - `message: string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/abuse-reports/$REPORT_PARAM \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "id": "id",
    "cdate": "2009-11-10T23:00:00Z",
    "domain": "domain",
    "mitigation_summary": {
      "accepted_url_count": 0,
      "active_count": 0,
      "external_host_notified": true,
      "in_review_count": 0,
      "pending_count": 0
    },
    "status": "accepted",
    "type": "PHISH",
    "justification": "justification",
    "original_work": "original_work",
    "submitter": {
      "company": "company",
      "email": "email",
      "name": "name",
      "telephone": "telephone"
    },
    "urls": [
      "string"
    ]
  },
  "success": true,
  "errors": [
    {
      "message": "message",
      "code": "string"
    }
  ],
  "messages": [
    {
      "message": "message"
    }
  ]
}
```

## List abuse reports

**get** `/accounts/{account_id}/abuse-reports`

List the abuse reports for a given account

### Path Parameters

- `account_id: string`

### Query Parameters

- `created_after: optional string`

  Returns reports created after the specified date

- `created_before: optional string`

  Returns reports created before the specified date

- `domain: optional string`

  Filter by domain name related to the abuse report

- `mitigation_status: optional "pending" or "active" or "in_review" or 2 more`

  Filter reports that have any mitigations in the given status.

  - `"pending"`

  - `"active"`

  - `"in_review"`

  - `"cancelled"`

  - `"removed"`

- `page: optional number`

  Where in pagination to start listing abuse reports

- `per_page: optional number`

  How many abuse reports per page to list

- `sort: optional string`

  A property to sort by, followed by the order (id, cdate, domain, type, status)

- `status: optional "accepted" or "in_review"`

  Filter by the status of the report.

  - `"accepted"`

  - `"in_review"`

- `type: optional "PHISH" or "GEN" or "THREAT" or 6 more`

  Filter by the type of the report.

  - `"PHISH"`

  - `"GEN"`

  - `"THREAT"`

  - `"DMCA"`

  - `"EMER"`

  - `"TM"`

  - `"REG_WHO"`

  - `"NCSEI"`

  - `"NETWORK"`

### Returns

- `success: boolean`

- `errors: optional array of object { message }`

  - `message: string`

- `messages: optional array of object { message }`

  - `message: string`

- `result: optional object { reports }`

  - `reports: array of object { id, cdate, domain, 7 more }`

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

- `result_info: optional object { count, page, per_page, 2 more }`

  - `count: number`

  - `page: number`

  - `per_page: number`

  - `total_count: number`

  - `total_pages: number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/abuse-reports \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "success": true,
  "errors": [
    {
      "message": "message"
    }
  ],
  "messages": [
    {
      "message": "message"
    }
  ],
  "result": {
    "reports": [
      {
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
      }
    ]
  },
  "result_info": {
    "count": 0,
    "page": 0,
    "per_page": 0,
    "total_count": 0,
    "total_pages": 0
  }
}
```

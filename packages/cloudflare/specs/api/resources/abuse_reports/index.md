# Abuse Reports

## Submit an abuse report

**post** `/accounts/{account_id}/abuse-reports/{report_param}`

Submit the Abuse Report of a particular type

### Path Parameters

- `account_id: string`

- `report_param: string`

  The report type for submitted reports.

### Body Parameters

- `body: object { act, address1, agent_name, 18 more }  or object { act, email, email2, 14 more }  or object { act, email, email2, 14 more }  or 5 more`

  - `AbuseDmca object { act, address1, agent_name, 18 more }`

    - `act: "abuse_dmca"`

      The report type for submitted reports.

      - `"abuse_dmca"`

    - `address1: string`

      Text not exceeding 100 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).

    - `agent_name: string`

      The name of the copyright holder. Text not exceeding 60 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).

    - `agree: 1`

      Can be `0` for false or `1` for true. Must be value: 1 for DMCA reports

      - `1`

    - `city: string`

      Text not exceeding 255 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).

    - `country: string`

      Text not exceeding 255 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).

    - `email: string`

      A valid email of the abuse reporter. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).

    - `email2: string`

      Should match the value provided in `email`

    - `host_notification: "send"`

      Notification type based on the abuse type. NOTE: Copyright (DMCA) and Trademark reports cannot be anonymous.

      - `"send"`

    - `name: string`

      Text not exceeding 255 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).

    - `original_work: string`

      Text not exceeding 255 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).

    - `owner_notification: "send"`

      Notification type based on the abuse type. NOTE: Copyright (DMCA) and Trademark reports cannot be anonymous.

      - `"send"`

    - `signature: string`

      Required for DMCA reports, should be same as Name. An affirmation that all information in the report is true and accurate while agreeing to the policies of Cloudflare's abuse reports

    - `state: string`

      Text not exceeding 255 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).

    - `urls: string`

      A list of valid URLs separated by ‘\n’ (new line character). The list of the URLs should not exceed 250 URLs. All URLs should have the same hostname. Each URL should be unique. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).

    - `comments: optional string`

      Any additional comments about the infringement not exceeding 2000 characters

    - `company: optional string`

      Text not exceeding 100 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).

    - `reported_country: optional string`

      Text containing 2 characters

    - `reported_user_agent: optional string`

      Text not exceeding 255 characters

    - `tele: optional string`

      Text not exceeding 20 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).

    - `title: optional string`

      Text not exceeding 255 characters

  - `AbuseTrademark object { act, email, email2, 14 more }`

    - `act: "abuse_trademark"`

      The report type for submitted reports.

      - `"abuse_trademark"`

    - `email: string`

      A valid email of the abuse reporter. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).

    - `email2: string`

      Should match the value provided in `email`

    - `host_notification: "send"`

      Notification type based on the abuse type. NOTE: Copyright (DMCA) and Trademark reports cannot be anonymous.

      - `"send"`

    - `justification: string`

      A detailed description of the infringement, including any necessary access details and the exact steps needed to view the content, not exceeding 5000 characters.

    - `name: string`

      Text not exceeding 255 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).

    - `owner_notification: "send"`

      Notification type based on the abuse type. NOTE: Copyright (DMCA) and Trademark reports cannot be anonymous.

      - `"send"`

    - `trademark_number: string`

      Text not exceeding 1000 characters

    - `trademark_office: string`

      Text not exceeding 1000 characters

    - `trademark_symbol: string`

      Text not exceeding 1000 characters

    - `urls: string`

      A list of valid URLs separated by ‘\n’ (new line character). The list of the URLs should not exceed 250 URLs. All URLs should have the same hostname. Each URL should be unique. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).

    - `comments: optional string`

      Any additional comments about the infringement not exceeding 2000 characters

    - `company: optional string`

      Text not exceeding 100 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).

    - `reported_country: optional string`

      Text containing 2 characters

    - `reported_user_agent: optional string`

      Text not exceeding 255 characters

    - `tele: optional string`

      Text not exceeding 20 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).

    - `title: optional string`

      Text not exceeding 255 characters

  - `AbuseGeneral object { act, email, email2, 14 more }`

    - `act: "abuse_general"`

      The report type for submitted reports.

      - `"abuse_general"`

    - `email: string`

      A valid email of the abuse reporter. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).

    - `email2: string`

      Should match the value provided in `email`

    - `host_notification: "send" or "send-anon"`

      Notification type based on the abuse type. NOTE: Copyright (DMCA) and Trademark reports cannot be anonymous.

      - `"send"`

      - `"send-anon"`

    - `justification: string`

      A detailed description of the infringement, including any necessary access details and the exact steps needed to view the content, not exceeding 5000 characters.

    - `name: string`

      Text not exceeding 255 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).

    - `owner_notification: "send" or "send-anon"`

      Notification type based on the abuse type. NOTE: Copyright (DMCA) and Trademark reports cannot be anonymous.

      - `"send"`

      - `"send-anon"`

    - `urls: string`

      A list of valid URLs separated by ‘\n’ (new line character). The list of the URLs should not exceed 250 URLs. All URLs should have the same hostname. Each URL should be unique. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).

    - `comments: optional string`

      Any additional comments about the infringement not exceeding 2000 characters

    - `company: optional string`

      Text not exceeding 100 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).

    - `destination_ips: optional string`

      A list of IP addresses separated by ‘\n’ (new line character). The list of destination IPs should not exceed 30 IP addresses. Each one of the IP addresses ought to be unique.

    - `ports_protocols: optional string`

      A comma separated list of ports and protocols e.g. 80/TCP, 22/UDP. The total size of the field should not exceed 2000 characters. Each individual port/protocol should not exceed 100 characters. The list should not have more than 30 unique ports and protocols.

    - `reported_country: optional string`

      Text containing 2 characters

    - `reported_user_agent: optional string`

      Text not exceeding 255 characters

    - `source_ips: optional string`

      A list of IP addresses separated by ‘\n’ (new line character). The list of source IPs should not exceed 30 IP addresses. Each one of the IP addresses ought to be unique.

    - `tele: optional string`

      Text not exceeding 20 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).

    - `title: optional string`

      Text not exceeding 255 characters

  - `AbusePhishing object { act, email, email2, 12 more }`

    - `act: "abuse_phishing"`

      The report type for submitted reports.

      - `"abuse_phishing"`

    - `email: string`

      A valid email of the abuse reporter. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).

    - `email2: string`

      Should match the value provided in `email`

    - `host_notification: "send" or "send-anon"`

      Notification type based on the abuse type. NOTE: Copyright (DMCA) and Trademark reports cannot be anonymous.

      - `"send"`

      - `"send-anon"`

    - `justification: string`

      A detailed description of the infringement, including any necessary access details and the exact steps needed to view the content, not exceeding 5000 characters.

    - `name: string`

      Text not exceeding 255 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).

    - `owner_notification: "send" or "send-anon"`

      Notification type based on the abuse type. NOTE: Copyright (DMCA) and Trademark reports cannot be anonymous.

      - `"send"`

      - `"send-anon"`

    - `urls: string`

      A list of valid URLs separated by ‘\n’ (new line character). The list of the URLs should not exceed 250 URLs. All URLs should have the same hostname. Each URL should be unique. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).

    - `comments: optional string`

      Any additional comments about the infringement not exceeding 2000 characters

    - `company: optional string`

      Text not exceeding 100 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).

    - `original_work: optional string`

      Text not exceeding 255 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).

    - `reported_country: optional string`

      Text containing 2 characters

    - `reported_user_agent: optional string`

      Text not exceeding 255 characters

    - `tele: optional string`

      Text not exceeding 20 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).

    - `title: optional string`

      Text not exceeding 255 characters

  - `AbuseChildren object { act, email, email2, 13 more }`

    - `act: "abuse_children"`

      The report type for submitted reports.

      - `"abuse_children"`

    - `email: string`

      A valid email of the abuse reporter. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).

    - `email2: string`

      Should match the value provided in `email`

    - `host_notification: "send" or "send-anon"`

      Notification type based on the abuse type. NOTE: Copyright (DMCA) and Trademark reports cannot be anonymous.

      - `"send"`

      - `"send-anon"`

    - `justification: string`

      A detailed description of the infringement, including any necessary access details and the exact steps needed to view the content, not exceeding 5000 characters.

    - `name: string`

      Text not exceeding 255 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).

    - `ncmec_notification: "send" or "send-anon"`

      Notification type based on the abuse type. NOTE: Copyright (DMCA) and Trademark reports cannot be anonymous.

      - `"send"`

      - `"send-anon"`

    - `owner_notification: "send" or "send-anon" or "none"`

      Notification type based on the abuse type. NOTE: Copyright (DMCA) and Trademark reports cannot be anonymous.

      - `"send"`

      - `"send-anon"`

      - `"none"`

    - `urls: string`

      A list of valid URLs separated by ‘\n’ (new line character). The list of the URLs should not exceed 250 URLs. All URLs should have the same hostname. Each URL should be unique. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).

    - `comments: optional string`

      Any additional comments about the infringement not exceeding 2000 characters

    - `company: optional string`

      Text not exceeding 100 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).

    - `country: optional string`

      Text not exceeding 255 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).

    - `reported_country: optional string`

      Text containing 2 characters

    - `reported_user_agent: optional string`

      Text not exceeding 255 characters

    - `tele: optional string`

      Text not exceeding 20 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).

    - `title: optional string`

      Text not exceeding 255 characters

  - `AbuseThreat object { act, email, email2, 11 more }`

    - `act: "abuse_threat"`

      The report type for submitted reports.

      - `"abuse_threat"`

    - `email: string`

      A valid email of the abuse reporter. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).

    - `email2: string`

      Should match the value provided in `email`

    - `host_notification: "send" or "send-anon"`

      Notification type based on the abuse type. NOTE: Copyright (DMCA) and Trademark reports cannot be anonymous.

      - `"send"`

      - `"send-anon"`

    - `justification: string`

      A detailed description of the infringement, including any necessary access details and the exact steps needed to view the content, not exceeding 5000 characters.

    - `name: string`

      Text not exceeding 255 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).

    - `owner_notification: "send" or "send-anon"`

      Notification type based on the abuse type. NOTE: Copyright (DMCA) and Trademark reports cannot be anonymous.

      - `"send"`

      - `"send-anon"`

    - `urls: string`

      A list of valid URLs separated by ‘\n’ (new line character). The list of the URLs should not exceed 250 URLs. All URLs should have the same hostname. Each URL should be unique. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).

    - `comments: optional string`

      Any additional comments about the infringement not exceeding 2000 characters

    - `company: optional string`

      Text not exceeding 100 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).

    - `reported_country: optional string`

      Text containing 2 characters

    - `reported_user_agent: optional string`

      Text not exceeding 255 characters

    - `tele: optional string`

      Text not exceeding 20 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).

    - `title: optional string`

      Text not exceeding 255 characters

  - `AbuseRegistrarWhois object { act, email, email2, 10 more }`

    - `act: "abuse_registrar_whois"`

      The report type for submitted reports.

      - `"abuse_registrar_whois"`

    - `email: string`

      A valid email of the abuse reporter. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).

    - `email2: string`

      Should match the value provided in `email`

    - `name: string`

      Text not exceeding 255 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).

    - `owner_notification: "send" or "send-anon" or "none"`

      Notification type based on the abuse type. NOTE: Copyright (DMCA) and Trademark reports cannot be anonymous.

      - `"send"`

      - `"send-anon"`

      - `"none"`

    - `urls: string`

      A list of valid URLs separated by ‘\n’ (new line character). The list of the URLs should not exceed 250 URLs. All URLs should have the same hostname. Each URL should be unique. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).

    - `comments: optional string`

      Any additional comments about the infringement not exceeding 2000 characters

    - `company: optional string`

      Text not exceeding 100 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).

    - `reg_who_request: optional object { reg_who_good_faith_affirmation, reg_who_lawful_processing_agreement, reg_who_legal_basis, 4 more }`

      RDP-mandated fields for registrar WHOIS data disclosure requests.

      - `reg_who_good_faith_affirmation: boolean`

        Affirmation that the request is made in good faith per RDP 10.2.4. Must be true.

      - `reg_who_lawful_processing_agreement: boolean`

        Agreement to process data lawfully per RDP 10.2.5. Must be true.

      - `reg_who_legal_basis: string`

        Legal rights and rationale for the request per RDP 10.2.3. Required for all WHOIS requests.

      - `reg_who_request_type: "disclosure" or "invalid_whois"`

        The type of WHOIS data request per RDP procedure.

        - `"disclosure"`

        - `"invalid_whois"`

      - `reg_who_requested_data_elements: array of "registrant_name" or "registrant_organization" or "registrant_email" or 14 more`

        The specific WHOIS data elements being requested per RDP 10.2.2. Required for all WHOIS requests.

        - `"registrant_name"`

        - `"registrant_organization"`

        - `"registrant_email"`

        - `"registrant_phone"`

        - `"registrant_address"`

        - `"registrant_address_country"`

        - `"registrant_address_postal_code"`

        - `"admin_name"`

        - `"admin_organization"`

        - `"admin_email"`

        - `"admin_phone"`

        - `"admin_address"`

        - `"tech_name"`

        - `"tech_organization"`

        - `"tech_email"`

        - `"tech_phone"`

        - `"tech_address"`

      - `reg_who_authorization_statement: optional string`

        Optional authorization statement or power of attorney per RDP 10.2.1.3.

      - `reg_who_requestor_type: optional "government" or "corporation" or "individual"`

        The nature of the requestor per RDP 10.2.1.2.

        - `"government"`

        - `"corporation"`

        - `"individual"`

    - `reported_country: optional string`

      Text containing 2 characters

    - `reported_user_agent: optional string`

      Text not exceeding 255 characters

    - `tele: optional string`

      Text not exceeding 20 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).

    - `title: optional string`

      Text not exceeding 255 characters

  - `AbuseNcsei object { act, email, email2, 12 more }`

    - `act: "abuse_ncsei"`

      The report type for submitted reports.

      - `"abuse_ncsei"`

    - `email: string`

      A valid email of the abuse reporter. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).

    - `email2: string`

      Should match the value provided in `email`

    - `host_notification: "send" or "send-anon"`

      Notification type based on the abuse type. NOTE: Copyright (DMCA) and Trademark reports cannot be anonymous.

      - `"send"`

      - `"send-anon"`

    - `name: string`

      Text not exceeding 255 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).

    - `ncsei_subject_representation: boolean`

      If the submitter is the target of NCSEI in the URLs of the abuse report.

    - `owner_notification: "send" or "send-anon" or "none"`

      Notification type based on the abuse type. NOTE: Copyright (DMCA) and Trademark reports cannot be anonymous.

      - `"send"`

      - `"send-anon"`

      - `"none"`

    - `urls: string`

      A list of valid URLs separated by ‘\n’ (new line character). The list of the URLs should not exceed 250 URLs. All URLs should have the same hostname. Each URL should be unique. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).

    - `comments: optional string`

      Any additional comments about the infringement not exceeding 2000 characters

    - `company: optional string`

      Text not exceeding 100 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).

    - `country: optional string`

      Text not exceeding 255 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).

    - `reported_country: optional string`

      Text containing 2 characters

    - `reported_user_agent: optional string`

      Text not exceeding 255 characters

    - `tele: optional string`

      Text not exceeding 20 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabase.org/).

    - `title: optional string`

      Text not exceeding 255 characters

### Returns

- `abuse_rand: string`

  The identifier for the submitted abuse report.

- `request: object { act }`

  - `act: string`

    The report type for submitted reports.

- `result: string`

  The result should be 'success' for successful response

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/abuse-reports/$REPORT_PARAM \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "act": "abuse_dmca",
          "address1": "x",
          "agent_name": "x",
          "agree": 1,
          "city": "x",
          "country": "x",
          "email": "email",
          "email2": "email2",
          "host_notification": "send",
          "name": "x",
          "original_work": "x",
          "owner_notification": "send",
          "signature": "signature",
          "state": "x",
          "urls": "urls"
        }'
```

#### Response

```json
{
  "abuse_rand": "abuse_rand",
  "request": {
    "act": "act"
  },
  "result": "result"
}
```

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

## Domain Types

### Abuse Report Create Response

- `AbuseReportCreateResponse = string`

  The result should be 'success' for successful response

### Abuse Report Get Response

- `AbuseReportGetResponse object { id, cdate, domain, 7 more }`

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

### Abuse Report List Response

- `AbuseReportListResponse object { reports }`

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

# Mitigations

## List abuse report mitigations

**get** `/accounts/{account_id}/abuse-reports/{report_id}/mitigations`

List mitigations done to remediate the abuse report.

### Path Parameters

- `account_id: string`

- `report_id: string`

### Query Parameters

- `effective_after: optional string`

  Returns mitigation that were dispatched after the given date

- `effective_before: optional string`

  Returns mitigations that were dispatched before the given date

- `entity_type: optional "url_pattern" or "account" or "zone"`

  Filter by the type of entity the mitigation impacts.

  - `"url_pattern"`

  - `"account"`

  - `"zone"`

- `page: optional number`

  Where in pagination to start listing abuse reports

- `per_page: optional number`

  How many abuse reports per page to list

- `sort: optional "type,asc" or "type,desc" or "effective_date,asc" or 5 more`

  A property to sort by, followed by the order

  - `"type,asc"`

  - `"type,desc"`

  - `"effective_date,asc"`

  - `"effective_date,desc"`

  - `"status,asc"`

  - `"status,desc"`

  - `"entity_type,asc"`

  - `"entity_type,desc"`

- `status: optional "pending" or "active" or "in_review" or 2 more`

  Filter by the status of the mitigation.

  - `"pending"`

  - `"active"`

  - `"in_review"`

  - `"cancelled"`

  - `"removed"`

- `type: optional "account_suspend" or "copyright_interstitial" or "geo_block" or 16 more`

  Filter by the type of mitigation. This filter parameter can be specified multiple times to include multiple types of mitigations in the result set, e.g. ?type=rate_limit_cache&type=legal_block.

  - `"account_suspend"`

  - `"copyright_interstitial"`

  - `"geo_block"`

  - `"legal_block"`

  - `"malware_interstitial"`

  - `"misleading_interstitial"`

  - `"network_block"`

  - `"phishing_interstitial"`

  - `"playfairite_enforce"`

  - `"r2_takedown_account"`

  - `"r2_takedown_bucket"`

  - `"r2_takedown_object"`

  - `"rate_limit_cache"`

  - `"redirect_video_stream"`

  - `"registrar_freeze"`

  - `"registrar_parking"`

  - `"stream_block_account"`

  - `"user_suspend"`

  - `"workers_takedown_by_zone_id"`

### Returns

- `success: boolean`

- `errors: optional array of object { message }`

  - `message: string`

- `messages: optional array of object { message }`

  - `message: string`

- `result: optional object { mitigations }`

  - `mitigations: array of object { id, effective_date, entity_id, 3 more }`

    - `id: string`

      ID of remediation.

    - `effective_date: string`

      Date when the mitigation will become active. Time in RFC 3339 format (https://www.rfc-editor.org/rfc/rfc3339.html)

    - `entity_id: string`

    - `entity_type: "url_pattern" or "account" or "zone"`

      The type of entity targeted by a mitigation.

      - `"url_pattern"`

      - `"account"`

      - `"zone"`

    - `status: "pending" or "active" or "in_review" or 2 more`

      The status of a mitigation

      - `"pending"`

      - `"active"`

      - `"in_review"`

      - `"cancelled"`

      - `"removed"`

    - `type: "account_suspend" or "copyright_interstitial" or "geo_block" or 16 more`

      The type of mitigation applied to a reported entity.

      - `"account_suspend"`

      - `"copyright_interstitial"`

      - `"geo_block"`

      - `"legal_block"`

      - `"malware_interstitial"`

      - `"misleading_interstitial"`

      - `"network_block"`

      - `"phishing_interstitial"`

      - `"playfairite_enforce"`

      - `"r2_takedown_account"`

      - `"r2_takedown_bucket"`

      - `"r2_takedown_object"`

      - `"rate_limit_cache"`

      - `"redirect_video_stream"`

      - `"registrar_freeze"`

      - `"registrar_parking"`

      - `"stream_block_account"`

      - `"user_suspend"`

      - `"workers_takedown_by_zone_id"`

- `result_info: optional object { count, page, per_page, 2 more }`

  - `count: number`

  - `page: number`

  - `per_page: number`

  - `total_count: number`

  - `total_pages: number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/abuse-reports/$REPORT_ID/mitigations \
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
    "mitigations": [
      {
        "id": "id",
        "effective_date": "2009-11-10T23:00:00Z",
        "entity_id": "entity_id",
        "entity_type": "url_pattern",
        "status": "pending",
        "type": "account_suspend"
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

## Request review on mitigations

**post** `/accounts/{account_id}/abuse-reports/{report_id}/mitigations/appeal`

Request a review for mitigations on an account.

### Path Parameters

- `account_id: string`

- `report_id: string`

### Body Parameters

- `appeals: array of object { id, reason }`

  List of mitigations to appeal.

  - `id: string`

    ID of the mitigation to appeal.

  - `reason: "removed" or "misclassified"`

    Reason why the customer is appealing.

    - `"removed"`

    - `"misclassified"`

### Returns

- `result_info: object { count, page, per_page, 2 more }`

  - `count: number`

  - `page: number`

  - `per_page: number`

  - `total_count: number`

  - `total_pages: number`

- `success: boolean`

- `errors: optional array of object { message }`

  - `message: string`

- `messages: optional array of object { message }`

  - `message: string`

- `result: optional array of object { id, effective_date, entity_id, 3 more }`

  - `id: string`

    ID of remediation.

  - `effective_date: string`

    Date when the mitigation will become active. Time in RFC 3339 format (https://www.rfc-editor.org/rfc/rfc3339.html)

  - `entity_id: string`

  - `entity_type: "url_pattern" or "account" or "zone"`

    The type of entity targeted by a mitigation.

    - `"url_pattern"`

    - `"account"`

    - `"zone"`

  - `status: "pending" or "active" or "in_review" or 2 more`

    The status of a mitigation

    - `"pending"`

    - `"active"`

    - `"in_review"`

    - `"cancelled"`

    - `"removed"`

  - `type: "account_suspend" or "copyright_interstitial" or "geo_block" or 16 more`

    The type of mitigation applied to a reported entity.

    - `"account_suspend"`

    - `"copyright_interstitial"`

    - `"geo_block"`

    - `"legal_block"`

    - `"malware_interstitial"`

    - `"misleading_interstitial"`

    - `"network_block"`

    - `"phishing_interstitial"`

    - `"playfairite_enforce"`

    - `"r2_takedown_account"`

    - `"r2_takedown_bucket"`

    - `"r2_takedown_object"`

    - `"rate_limit_cache"`

    - `"redirect_video_stream"`

    - `"registrar_freeze"`

    - `"registrar_parking"`

    - `"stream_block_account"`

    - `"user_suspend"`

    - `"workers_takedown_by_zone_id"`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/abuse-reports/$REPORT_ID/mitigations/appeal \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "appeals": [
            {
              "id": "id",
              "reason": "misclassified"
            }
          ]
        }'
```

#### Response

```json
{
  "result_info": {
    "count": 0,
    "page": 0,
    "per_page": 0,
    "total_count": 0,
    "total_pages": 0
  },
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
  "result": [
    {
      "id": "id",
      "effective_date": "2009-11-10T23:00:00Z",
      "entity_id": "entity_id",
      "entity_type": "url_pattern",
      "status": "pending",
      "type": "account_suspend"
    }
  ]
}
```

## Domain Types

### Mitigation List Response

- `MitigationListResponse object { mitigations }`

  - `mitigations: array of object { id, effective_date, entity_id, 3 more }`

    - `id: string`

      ID of remediation.

    - `effective_date: string`

      Date when the mitigation will become active. Time in RFC 3339 format (https://www.rfc-editor.org/rfc/rfc3339.html)

    - `entity_id: string`

    - `entity_type: "url_pattern" or "account" or "zone"`

      The type of entity targeted by a mitigation.

      - `"url_pattern"`

      - `"account"`

      - `"zone"`

    - `status: "pending" or "active" or "in_review" or 2 more`

      The status of a mitigation

      - `"pending"`

      - `"active"`

      - `"in_review"`

      - `"cancelled"`

      - `"removed"`

    - `type: "account_suspend" or "copyright_interstitial" or "geo_block" or 16 more`

      The type of mitigation applied to a reported entity.

      - `"account_suspend"`

      - `"copyright_interstitial"`

      - `"geo_block"`

      - `"legal_block"`

      - `"malware_interstitial"`

      - `"misleading_interstitial"`

      - `"network_block"`

      - `"phishing_interstitial"`

      - `"playfairite_enforce"`

      - `"r2_takedown_account"`

      - `"r2_takedown_bucket"`

      - `"r2_takedown_object"`

      - `"rate_limit_cache"`

      - `"redirect_video_stream"`

      - `"registrar_freeze"`

      - `"registrar_parking"`

      - `"stream_block_account"`

      - `"user_suspend"`

      - `"workers_takedown_by_zone_id"`

### Mitigation Review Response

- `MitigationReviewResponse object { id, effective_date, entity_id, 3 more }`

  - `id: string`

    ID of remediation.

  - `effective_date: string`

    Date when the mitigation will become active. Time in RFC 3339 format (https://www.rfc-editor.org/rfc/rfc3339.html)

  - `entity_id: string`

  - `entity_type: "url_pattern" or "account" or "zone"`

    The type of entity targeted by a mitigation.

    - `"url_pattern"`

    - `"account"`

    - `"zone"`

  - `status: "pending" or "active" or "in_review" or 2 more`

    The status of a mitigation

    - `"pending"`

    - `"active"`

    - `"in_review"`

    - `"cancelled"`

    - `"removed"`

  - `type: "account_suspend" or "copyright_interstitial" or "geo_block" or 16 more`

    The type of mitigation applied to a reported entity.

    - `"account_suspend"`

    - `"copyright_interstitial"`

    - `"geo_block"`

    - `"legal_block"`

    - `"malware_interstitial"`

    - `"misleading_interstitial"`

    - `"network_block"`

    - `"phishing_interstitial"`

    - `"playfairite_enforce"`

    - `"r2_takedown_account"`

    - `"r2_takedown_bucket"`

    - `"r2_takedown_object"`

    - `"rate_limit_cache"`

    - `"redirect_video_stream"`

    - `"registrar_freeze"`

    - `"registrar_parking"`

    - `"stream_block_account"`

    - `"user_suspend"`

    - `"workers_takedown_by_zone_id"`

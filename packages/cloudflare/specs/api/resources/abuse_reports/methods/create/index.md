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

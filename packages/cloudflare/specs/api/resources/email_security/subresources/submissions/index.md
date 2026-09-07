# Submissions

## Get reclassify submissions

**get** `/accounts/{account_id}/email-security/submissions`

Returns information for submissions made to reclassify emails. Shows the status, outcome, and disposition changes for reclassification requests made by users or the security team. Useful for tracking false positive/negative reports.

### Path Parameters

- `account_id: string`

  Identifier.

### Query Parameters

- `end: optional string`

  The end of the search date range. Defaults to `now`.

- `escalated_from_user: optional boolean`

  When true, return only submissions that were escalated by an end user (vs. by the security team). When false, return only submissions that were not escalated by an end user. When omitted, no filter is applied.

- `original_disposition: optional "MALICIOUS" or "SUSPICIOUS" or "SPOOF" or 3 more`

  - `"MALICIOUS"`

  - `"SUSPICIOUS"`

  - `"SPOOF"`

  - `"SPAM"`

  - `"BULK"`

  - `"NONE"`

- `outcome_disposition: optional "MALICIOUS" or "SUSPICIOUS" or "SPOOF" or 3 more`

  - `"MALICIOUS"`

  - `"SUSPICIOUS"`

  - `"SPOOF"`

  - `"SPAM"`

  - `"BULK"`

  - `"NONE"`

- `page: optional number`

  Current page within paginated list of results.

- `per_page: optional number`

  The number of results per page. Maximum value is 1000.

- `query: optional string`

- `requested_disposition: optional "MALICIOUS" or "SUSPICIOUS" or "SPOOF" or 3 more`

  - `"MALICIOUS"`

  - `"SUSPICIOUS"`

  - `"SPOOF"`

  - `"SPAM"`

  - `"BULK"`

  - `"NONE"`

- `start: optional string`

  The beginning of the search date range. Defaults to `now - 30 days`.

- `status: optional string`

- `submission_id: optional string`

- `type: optional "TEAM" or "USER"`

  - `"TEAM"`

  - `"USER"`

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

- `success: true`

  Whether the API call was successful.

  - `true`

- `result: optional array of object { requested_at, submission_id, customer_status, 15 more }`

  - `requested_at: string`

    When the submission was requested (UTC).

  - `submission_id: string`

  - `customer_status: optional "escalated" or "reviewed" or "unreviewed"`

    - `"escalated"`

    - `"reviewed"`

    - `"unreviewed"`

  - `escalated_as: optional "MALICIOUS" or "SUSPICIOUS" or "SPOOF" or 3 more`

    - `"MALICIOUS"`

    - `"SUSPICIOUS"`

    - `"SPOOF"`

    - `"SPAM"`

    - `"BULK"`

    - `"NONE"`

  - `escalated_at: optional string`

  - `escalated_by: optional string`

  - `escalated_submission_id: optional string`

  - `original_disposition: optional "MALICIOUS" or "SUSPICIOUS" or "SPOOF" or 3 more`

    - `"MALICIOUS"`

    - `"SUSPICIOUS"`

    - `"SPOOF"`

    - `"SPAM"`

    - `"BULK"`

    - `"NONE"`

  - `original_edf_hash: optional string`

  - `original_postfix_id: optional string`

    The postfix ID of the original message that was submitted

  - `outcome: optional string`

  - `outcome_disposition: optional "MALICIOUS" or "SUSPICIOUS" or "SPOOF" or 3 more`

    - `"MALICIOUS"`

    - `"SUSPICIOUS"`

    - `"SPOOF"`

    - `"SPAM"`

    - `"BULK"`

    - `"NONE"`

  - `requested_by: optional string`

  - `requested_disposition: optional "MALICIOUS" or "SUSPICIOUS" or "SPOOF" or 3 more`

    - `"MALICIOUS"`

    - `"SUSPICIOUS"`

    - `"SPOOF"`

    - `"SPAM"`

    - `"BULK"`

    - `"NONE"`

  - `requested_ts: optional string`

    Deprecated, use `requested_at` instead

  - `status: optional string`

  - `subject: optional string`

  - `type: optional "Team" or "User"`

    Whether the submission was created by a team member or an end user.

    - `"Team"`

    - `"User"`

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Total number of results for the requested service.

  - `page: optional number`

    Current page within paginated list of results.

  - `per_page: optional number`

    Number of results per page of results.

  - `total_count: optional number`

    Total results available without any search parameters.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/submissions \
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
  "success": true,
  "result": [
    {
      "requested_at": "2019-12-27T18:11:19.117Z",
      "submission_id": "submission_id",
      "customer_status": "escalated",
      "escalated_as": "MALICIOUS",
      "escalated_at": "2019-12-27T18:11:19.117Z",
      "escalated_by": "escalated_by",
      "escalated_submission_id": "escalated_submission_id",
      "original_disposition": "MALICIOUS",
      "original_edf_hash": "original_edf_hash",
      "original_postfix_id": "original_postfix_id",
      "outcome": "outcome",
      "outcome_disposition": "MALICIOUS",
      "requested_by": "requested_by",
      "requested_disposition": "MALICIOUS",
      "requested_ts": "requested_ts",
      "status": "status",
      "subject": "subject",
      "type": "Team"
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

## Domain Types

### Submission List Response

- `SubmissionListResponse object { requested_at, submission_id, customer_status, 15 more }`

  - `requested_at: string`

    When the submission was requested (UTC).

  - `submission_id: string`

  - `customer_status: optional "escalated" or "reviewed" or "unreviewed"`

    - `"escalated"`

    - `"reviewed"`

    - `"unreviewed"`

  - `escalated_as: optional "MALICIOUS" or "SUSPICIOUS" or "SPOOF" or 3 more`

    - `"MALICIOUS"`

    - `"SUSPICIOUS"`

    - `"SPOOF"`

    - `"SPAM"`

    - `"BULK"`

    - `"NONE"`

  - `escalated_at: optional string`

  - `escalated_by: optional string`

  - `escalated_submission_id: optional string`

  - `original_disposition: optional "MALICIOUS" or "SUSPICIOUS" or "SPOOF" or 3 more`

    - `"MALICIOUS"`

    - `"SUSPICIOUS"`

    - `"SPOOF"`

    - `"SPAM"`

    - `"BULK"`

    - `"NONE"`

  - `original_edf_hash: optional string`

  - `original_postfix_id: optional string`

    The postfix ID of the original message that was submitted

  - `outcome: optional string`

  - `outcome_disposition: optional "MALICIOUS" or "SUSPICIOUS" or "SPOOF" or 3 more`

    - `"MALICIOUS"`

    - `"SUSPICIOUS"`

    - `"SPOOF"`

    - `"SPAM"`

    - `"BULK"`

    - `"NONE"`

  - `requested_by: optional string`

  - `requested_disposition: optional "MALICIOUS" or "SUSPICIOUS" or "SPOOF" or 3 more`

    - `"MALICIOUS"`

    - `"SUSPICIOUS"`

    - `"SPOOF"`

    - `"SPAM"`

    - `"BULK"`

    - `"NONE"`

  - `requested_ts: optional string`

    Deprecated, use `requested_at` instead

  - `status: optional string`

  - `subject: optional string`

  - `type: optional "Team" or "User"`

    Whether the submission was created by a team member or an end user.

    - `"Team"`

    - `"User"`

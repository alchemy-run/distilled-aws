## List Scanned DNS Records

**get** `/zones/{zone_id}/dns_records/scan/review`

Retrieves the list of DNS records discovered up to this point by the asynchronous scan. These records are temporary until explicitly accepted or rejected via `POST /scan/review`. Additional records may be discovered by the scan later.

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

- `success: true`

  Whether the API call was successful.

  - `true`

- `result: optional array of RecordResponse`

  - `ARecord = ARecord`

    - `id: string`

      Identifier.

    - `created_on: string`

      When the record was created.

    - `meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }`

      Extra Cloudflare-specific metadata about the record.

      - `dead_glue: optional boolean`

        Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

      - `is_glue: optional boolean`

        Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

      - `shadowed_by: optional array of string`

        IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

      - `shadowed_records_count: optional number`

        Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

    - `modified_on: string`

      When the record was last modified.

    - `proxiable: boolean`

      Whether the record can be proxied by Cloudflare or not.

    - `comment_modified_on: optional string`

      When the record comment was last modified. Omitted if there is no comment.

    - `tags_modified_on: optional string`

      When the record tags were last modified. Omitted if there are no tags.

  - `AAAARecord = AAAARecord`

    - `id: string`

      Identifier.

    - `created_on: string`

      When the record was created.

    - `meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }`

      Extra Cloudflare-specific metadata about the record.

      - `dead_glue: optional boolean`

        Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

      - `is_glue: optional boolean`

        Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

      - `shadowed_by: optional array of string`

        IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

      - `shadowed_records_count: optional number`

        Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

    - `modified_on: string`

      When the record was last modified.

    - `proxiable: boolean`

      Whether the record can be proxied by Cloudflare or not.

    - `comment_modified_on: optional string`

      When the record comment was last modified. Omitted if there is no comment.

    - `tags_modified_on: optional string`

      When the record tags were last modified. Omitted if there are no tags.

  - `CNAMERecord = CNAMERecord`

    - `id: string`

      Identifier.

    - `created_on: string`

      When the record was created.

    - `meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }`

      Extra Cloudflare-specific metadata about the record.

      - `dead_glue: optional boolean`

        Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

      - `is_glue: optional boolean`

        Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

      - `shadowed_by: optional array of string`

        IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

      - `shadowed_records_count: optional number`

        Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

    - `modified_on: string`

      When the record was last modified.

    - `proxiable: boolean`

      Whether the record can be proxied by Cloudflare or not.

    - `comment_modified_on: optional string`

      When the record comment was last modified. Omitted if there is no comment.

    - `tags_modified_on: optional string`

      When the record tags were last modified. Omitted if there are no tags.

  - `MXRecord = MXRecord`

    - `id: string`

      Identifier.

    - `created_on: string`

      When the record was created.

    - `meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }`

      Extra Cloudflare-specific metadata about the record.

      - `dead_glue: optional boolean`

        Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

      - `is_glue: optional boolean`

        Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

      - `shadowed_by: optional array of string`

        IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

      - `shadowed_records_count: optional number`

        Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

    - `modified_on: string`

      When the record was last modified.

    - `proxiable: boolean`

      Whether the record can be proxied by Cloudflare or not.

    - `comment_modified_on: optional string`

      When the record comment was last modified. Omitted if there is no comment.

    - `tags_modified_on: optional string`

      When the record tags were last modified. Omitted if there are no tags.

  - `NSRecord = NSRecord`

    - `id: string`

      Identifier.

    - `created_on: string`

      When the record was created.

    - `meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }`

      Extra Cloudflare-specific metadata about the record.

      - `dead_glue: optional boolean`

        Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

      - `is_glue: optional boolean`

        Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

      - `shadowed_by: optional array of string`

        IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

      - `shadowed_records_count: optional number`

        Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

    - `modified_on: string`

      When the record was last modified.

    - `proxiable: boolean`

      Whether the record can be proxied by Cloudflare or not.

    - `comment_modified_on: optional string`

      When the record comment was last modified. Omitted if there is no comment.

    - `tags_modified_on: optional string`

      When the record tags were last modified. Omitted if there are no tags.

  - `OpenpgpkeyRecord object { id, comment, content, 12 more }`

    - `id: string`

      Identifier.

    - `comment: string`

      Comments or notes about the DNS record. This field has no effect on DNS responses.

    - `content: string`

      A single Base64-encoded OpenPGP Transferable Public Key (RFC 4880 Section 11.1)

    - `created_on: string`

      When the record was created.

    - `meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }`

      Extra Cloudflare-specific metadata about the record.

      - `dead_glue: optional boolean`

        Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

      - `is_glue: optional boolean`

        Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

      - `shadowed_by: optional array of string`

        IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

      - `shadowed_records_count: optional number`

        Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

    - `modified_on: string`

      When the record was last modified.

    - `name: string`

      Complete DNS record name, including the zone name, in Punycode.

    - `proxiable: boolean`

      Whether the record can be proxied by Cloudflare or not.

    - `proxied: boolean`

      Whether the record is receiving the performance and security benefits of Cloudflare.

    - `settings: object { ipv4_only, ipv6_only }`

      Settings for the DNS record.

      - `ipv4_only: optional boolean`

        When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

      - `ipv6_only: optional boolean`

        When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

    - `tags: array of RecordTags`

      Custom tags for the DNS record. This field has no effect on DNS responses.

    - `ttl: TTL`

      Time To Live (TTL) of the DNS record in seconds. Setting to 1 means 'automatic'. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

      - `number`

      - `1`

        Time To Live (TTL) of the DNS record in seconds. Setting to 1 means 'automatic'. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

        - `1`

    - `type: "OPENPGPKEY"`

      Record type.

      - `"OPENPGPKEY"`

    - `comment_modified_on: optional string`

      When the record comment was last modified. Omitted if there is no comment.

    - `tags_modified_on: optional string`

      When the record tags were last modified. Omitted if there are no tags.

  - `PTRRecord = PTRRecord`

    - `id: string`

      Identifier.

    - `created_on: string`

      When the record was created.

    - `meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }`

      Extra Cloudflare-specific metadata about the record.

      - `dead_glue: optional boolean`

        Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

      - `is_glue: optional boolean`

        Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

      - `shadowed_by: optional array of string`

        IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

      - `shadowed_records_count: optional number`

        Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

    - `modified_on: string`

      When the record was last modified.

    - `proxiable: boolean`

      Whether the record can be proxied by Cloudflare or not.

    - `comment_modified_on: optional string`

      When the record comment was last modified. Omitted if there is no comment.

    - `tags_modified_on: optional string`

      When the record tags were last modified. Omitted if there are no tags.

  - `TXTRecord = TXTRecord`

    - `id: string`

      Identifier.

    - `created_on: string`

      When the record was created.

    - `meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }`

      Extra Cloudflare-specific metadata about the record.

      - `dead_glue: optional boolean`

        Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

      - `is_glue: optional boolean`

        Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

      - `shadowed_by: optional array of string`

        IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

      - `shadowed_records_count: optional number`

        Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

    - `modified_on: string`

      When the record was last modified.

    - `proxiable: boolean`

      Whether the record can be proxied by Cloudflare or not.

    - `comment_modified_on: optional string`

      When the record comment was last modified. Omitted if there is no comment.

    - `tags_modified_on: optional string`

      When the record tags were last modified. Omitted if there are no tags.

  - `CAARecord = CAARecord`

    - `id: string`

      Identifier.

    - `created_on: string`

      When the record was created.

    - `meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }`

      Extra Cloudflare-specific metadata about the record.

      - `dead_glue: optional boolean`

        Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

      - `is_glue: optional boolean`

        Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

      - `shadowed_by: optional array of string`

        IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

      - `shadowed_records_count: optional number`

        Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

    - `modified_on: string`

      When the record was last modified.

    - `proxiable: boolean`

      Whether the record can be proxied by Cloudflare or not.

    - `comment_modified_on: optional string`

      When the record comment was last modified. Omitted if there is no comment.

    - `tags_modified_on: optional string`

      When the record tags were last modified. Omitted if there are no tags.

  - `CERTRecord = CERTRecord`

    - `id: string`

      Identifier.

    - `created_on: string`

      When the record was created.

    - `meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }`

      Extra Cloudflare-specific metadata about the record.

      - `dead_glue: optional boolean`

        Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

      - `is_glue: optional boolean`

        Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

      - `shadowed_by: optional array of string`

        IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

      - `shadowed_records_count: optional number`

        Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

    - `modified_on: string`

      When the record was last modified.

    - `proxiable: boolean`

      Whether the record can be proxied by Cloudflare or not.

    - `comment_modified_on: optional string`

      When the record comment was last modified. Omitted if there is no comment.

    - `tags_modified_on: optional string`

      When the record tags were last modified. Omitted if there are no tags.

  - `DNSKEYRecord = DNSKEYRecord`

    - `id: string`

      Identifier.

    - `created_on: string`

      When the record was created.

    - `meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }`

      Extra Cloudflare-specific metadata about the record.

      - `dead_glue: optional boolean`

        Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

      - `is_glue: optional boolean`

        Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

      - `shadowed_by: optional array of string`

        IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

      - `shadowed_records_count: optional number`

        Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

    - `modified_on: string`

      When the record was last modified.

    - `proxiable: boolean`

      Whether the record can be proxied by Cloudflare or not.

    - `comment_modified_on: optional string`

      When the record comment was last modified. Omitted if there is no comment.

    - `tags_modified_on: optional string`

      When the record tags were last modified. Omitted if there are no tags.

  - `DSRecord = DSRecord`

    - `id: string`

      Identifier.

    - `created_on: string`

      When the record was created.

    - `meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }`

      Extra Cloudflare-specific metadata about the record.

      - `dead_glue: optional boolean`

        Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

      - `is_glue: optional boolean`

        Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

      - `shadowed_by: optional array of string`

        IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

      - `shadowed_records_count: optional number`

        Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

    - `modified_on: string`

      When the record was last modified.

    - `proxiable: boolean`

      Whether the record can be proxied by Cloudflare or not.

    - `comment_modified_on: optional string`

      When the record comment was last modified. Omitted if there is no comment.

    - `tags_modified_on: optional string`

      When the record tags were last modified. Omitted if there are no tags.

  - `HTTPSRecord = HTTPSRecord`

    - `id: string`

      Identifier.

    - `created_on: string`

      When the record was created.

    - `meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }`

      Extra Cloudflare-specific metadata about the record.

      - `dead_glue: optional boolean`

        Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

      - `is_glue: optional boolean`

        Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

      - `shadowed_by: optional array of string`

        IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

      - `shadowed_records_count: optional number`

        Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

    - `modified_on: string`

      When the record was last modified.

    - `proxiable: boolean`

      Whether the record can be proxied by Cloudflare or not.

    - `comment_modified_on: optional string`

      When the record comment was last modified. Omitted if there is no comment.

    - `tags_modified_on: optional string`

      When the record tags were last modified. Omitted if there are no tags.

  - `LOCRecord = LOCRecord`

    - `id: string`

      Identifier.

    - `created_on: string`

      When the record was created.

    - `meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }`

      Extra Cloudflare-specific metadata about the record.

      - `dead_glue: optional boolean`

        Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

      - `is_glue: optional boolean`

        Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

      - `shadowed_by: optional array of string`

        IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

      - `shadowed_records_count: optional number`

        Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

    - `modified_on: string`

      When the record was last modified.

    - `proxiable: boolean`

      Whether the record can be proxied by Cloudflare or not.

    - `comment_modified_on: optional string`

      When the record comment was last modified. Omitted if there is no comment.

    - `tags_modified_on: optional string`

      When the record tags were last modified. Omitted if there are no tags.

  - `NAPTRRecord = NAPTRRecord`

    - `id: string`

      Identifier.

    - `created_on: string`

      When the record was created.

    - `meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }`

      Extra Cloudflare-specific metadata about the record.

      - `dead_glue: optional boolean`

        Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

      - `is_glue: optional boolean`

        Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

      - `shadowed_by: optional array of string`

        IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

      - `shadowed_records_count: optional number`

        Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

    - `modified_on: string`

      When the record was last modified.

    - `proxiable: boolean`

      Whether the record can be proxied by Cloudflare or not.

    - `comment_modified_on: optional string`

      When the record comment was last modified. Omitted if there is no comment.

    - `tags_modified_on: optional string`

      When the record tags were last modified. Omitted if there are no tags.

  - `SMIMEARecord = SMIMEARecord`

    - `id: string`

      Identifier.

    - `created_on: string`

      When the record was created.

    - `meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }`

      Extra Cloudflare-specific metadata about the record.

      - `dead_glue: optional boolean`

        Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

      - `is_glue: optional boolean`

        Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

      - `shadowed_by: optional array of string`

        IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

      - `shadowed_records_count: optional number`

        Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

    - `modified_on: string`

      When the record was last modified.

    - `proxiable: boolean`

      Whether the record can be proxied by Cloudflare or not.

    - `comment_modified_on: optional string`

      When the record comment was last modified. Omitted if there is no comment.

    - `tags_modified_on: optional string`

      When the record tags were last modified. Omitted if there are no tags.

  - `SRVRecord = SRVRecord`

    - `id: string`

      Identifier.

    - `created_on: string`

      When the record was created.

    - `meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }`

      Extra Cloudflare-specific metadata about the record.

      - `dead_glue: optional boolean`

        Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

      - `is_glue: optional boolean`

        Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

      - `shadowed_by: optional array of string`

        IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

      - `shadowed_records_count: optional number`

        Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

    - `modified_on: string`

      When the record was last modified.

    - `proxiable: boolean`

      Whether the record can be proxied by Cloudflare or not.

    - `comment_modified_on: optional string`

      When the record comment was last modified. Omitted if there is no comment.

    - `tags_modified_on: optional string`

      When the record tags were last modified. Omitted if there are no tags.

  - `SSHFPRecord = SSHFPRecord`

    - `id: string`

      Identifier.

    - `created_on: string`

      When the record was created.

    - `meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }`

      Extra Cloudflare-specific metadata about the record.

      - `dead_glue: optional boolean`

        Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

      - `is_glue: optional boolean`

        Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

      - `shadowed_by: optional array of string`

        IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

      - `shadowed_records_count: optional number`

        Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

    - `modified_on: string`

      When the record was last modified.

    - `proxiable: boolean`

      Whether the record can be proxied by Cloudflare or not.

    - `comment_modified_on: optional string`

      When the record comment was last modified. Omitted if there is no comment.

    - `tags_modified_on: optional string`

      When the record tags were last modified. Omitted if there are no tags.

  - `SVCBRecord = SVCBRecord`

    - `id: string`

      Identifier.

    - `created_on: string`

      When the record was created.

    - `meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }`

      Extra Cloudflare-specific metadata about the record.

      - `dead_glue: optional boolean`

        Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

      - `is_glue: optional boolean`

        Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

      - `shadowed_by: optional array of string`

        IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

      - `shadowed_records_count: optional number`

        Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

    - `modified_on: string`

      When the record was last modified.

    - `proxiable: boolean`

      Whether the record can be proxied by Cloudflare or not.

    - `comment_modified_on: optional string`

      When the record comment was last modified. Omitted if there is no comment.

    - `tags_modified_on: optional string`

      When the record tags were last modified. Omitted if there are no tags.

  - `TLSARecord = TLSARecord`

    - `id: string`

      Identifier.

    - `created_on: string`

      When the record was created.

    - `meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }`

      Extra Cloudflare-specific metadata about the record.

      - `dead_glue: optional boolean`

        Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

      - `is_glue: optional boolean`

        Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

      - `shadowed_by: optional array of string`

        IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

      - `shadowed_records_count: optional number`

        Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

    - `modified_on: string`

      When the record was last modified.

    - `proxiable: boolean`

      Whether the record can be proxied by Cloudflare or not.

    - `comment_modified_on: optional string`

      When the record comment was last modified. Omitted if there is no comment.

    - `tags_modified_on: optional string`

      When the record tags were last modified. Omitted if there are no tags.

  - `URIRecord = URIRecord`

    - `id: string`

      Identifier.

    - `created_on: string`

      When the record was created.

    - `meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }`

      Extra Cloudflare-specific metadata about the record.

      - `dead_glue: optional boolean`

        Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

      - `is_glue: optional boolean`

        Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

      - `shadowed_by: optional array of string`

        IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

      - `shadowed_records_count: optional number`

        Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

    - `modified_on: string`

      When the record was last modified.

    - `proxiable: boolean`

      Whether the record can be proxied by Cloudflare or not.

    - `comment_modified_on: optional string`

      When the record comment was last modified. Omitted if there is no comment.

    - `tags_modified_on: optional string`

      When the record tags were last modified. Omitted if there are no tags.

- `result_info: optional object { count, page, per_page, 2 more }`

  - `count: optional number`

    Total number of results for the requested service.

  - `page: optional number`

    Current page within paginated list of results.

  - `per_page: optional number`

    Number of results per page of results.

  - `total_count: optional number`

    Total results available without any search parameters.

  - `total_pages: optional number`

    The number of total pages in the entire result set.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records/scan/review \
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
      "name": "example.com",
      "ttl": 3600,
      "type": "A",
      "comment": "Domain verification record",
      "content": "198.51.100.4",
      "private_routing": true,
      "proxied": true,
      "settings": {
        "ipv4_only": true,
        "ipv6_only": true
      },
      "tags": [
        "owner:dns-team"
      ],
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "created_on": "2014-01-01T05:20:00.12345Z",
      "meta": {
        "dead_glue": true,
        "is_glue": true,
        "shadowed_by": [
          "372e67954025e0ba6aaa6d586b9e0b59"
        ],
        "shadowed_records_count": 42
      },
      "modified_on": "2014-01-01T05:20:00.12345Z",
      "proxiable": true,
      "comment_modified_on": "2024-01-01T05:20:00.12345Z",
      "tags_modified_on": "2025-01-01T05:20:00.12345Z"
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```

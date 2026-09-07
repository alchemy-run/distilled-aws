## Create DNS Record

**post** `/zones/{zone_id}/dns_records`

Create a new DNS record for a zone.

Notes:

- A/AAAA records cannot exist on the same name as CNAME records.
- NS records cannot exist on the same name as any other record type.
- Domain names are always represented in Punycode, even if Unicode
  characters were used when creating the record.

### Path Parameters

- `zone_id: string`

  Identifier.

### Query Parameters

- `include_shadow_metadata: optional boolean`

  Whether to include shadow metadata in the `meta` field of each record in the response. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

### Body Parameters

- `body: ARecord or AAAARecord or CNAMERecord or 18 more`

  - `ARecord object { name, ttl, type, 6 more }`

    - `name: string`

      Complete DNS record name, including the zone name, in Punycode.

    - `ttl: TTL`

      Time To Live (TTL) of the DNS record in seconds. Setting to 1 means 'automatic'. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

      - `number`

      - `1`

        Time To Live (TTL) of the DNS record in seconds. Setting to 1 means 'automatic'. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

        - `1`

    - `type: "A"`

      Record type.

      - `"A"`

    - `comment: optional string`

      Comments or notes about the DNS record. This field has no effect on DNS responses.

    - `content: optional string`

      A valid IPv4 address.

    - `private_routing: optional boolean`

      Enables private network routing to the origin.

    - `proxied: optional boolean`

      Whether the record is receiving the performance and security benefits of Cloudflare.

    - `settings: optional object { ipv4_only, ipv6_only }`

      Settings for the DNS record.

      - `ipv4_only: optional boolean`

        When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

      - `ipv6_only: optional boolean`

        When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

    - `tags: optional array of RecordTags`

      Custom tags for the DNS record. This field has no effect on DNS responses.

  - `AAAARecord object { name, ttl, type, 6 more }`

    - `name: string`

      Complete DNS record name, including the zone name, in Punycode.

    - `ttl: TTL`

      Time To Live (TTL) of the DNS record in seconds. Setting to 1 means 'automatic'. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

    - `type: "AAAA"`

      Record type.

      - `"AAAA"`

    - `comment: optional string`

      Comments or notes about the DNS record. This field has no effect on DNS responses.

    - `content: optional string`

      A valid IPv6 address.

    - `private_routing: optional boolean`

      Enables private network routing to the origin.

    - `proxied: optional boolean`

      Whether the record is receiving the performance and security benefits of Cloudflare.

    - `settings: optional object { ipv4_only, ipv6_only }`

      Settings for the DNS record.

      - `ipv4_only: optional boolean`

        When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

      - `ipv6_only: optional boolean`

        When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

    - `tags: optional array of RecordTags`

      Custom tags for the DNS record. This field has no effect on DNS responses.

  - `CNAMERecord object { name, ttl, type, 5 more }`

    - `name: string`

      Complete DNS record name, including the zone name, in Punycode.

    - `ttl: TTL`

      Time To Live (TTL) of the DNS record in seconds. Setting to 1 means 'automatic'. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

    - `type: "CNAME"`

      Record type.

      - `"CNAME"`

    - `comment: optional string`

      Comments or notes about the DNS record. This field has no effect on DNS responses.

    - `content: optional string`

      A valid hostname. Must not match the record's name.

    - `proxied: optional boolean`

      Whether the record is receiving the performance and security benefits of Cloudflare.

    - `settings: optional object { flatten_cname, ipv4_only, ipv6_only }`

      Settings for the DNS record.

      - `flatten_cname: optional boolean`

        If enabled, causes the CNAME record to be resolved externally and the resulting address records (e.g., A and AAAA) to be returned instead of the CNAME record itself. This setting is unavailable for proxied records, since they are always flattened.

      - `ipv4_only: optional boolean`

        When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

      - `ipv6_only: optional boolean`

        When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

    - `tags: optional array of RecordTags`

      Custom tags for the DNS record. This field has no effect on DNS responses.

  - `MXRecord object { name, ttl, type, 6 more }`

    - `name: string`

      Complete DNS record name, including the zone name, in Punycode.

    - `ttl: TTL`

      Time To Live (TTL) of the DNS record in seconds. Setting to 1 means 'automatic'. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

    - `type: "MX"`

      Record type.

      - `"MX"`

    - `comment: optional string`

      Comments or notes about the DNS record. This field has no effect on DNS responses.

    - `content: optional string`

      A valid mail server hostname.

    - `priority: optional number`

      Required for MX and URI records; ignored for other record types (but may still be returned by the API). Records with lower priorities are preferred. This field is to be deprecated in favor of the priority field within the data map.

    - `proxied: optional boolean`

      Whether the record is receiving the performance and security benefits of Cloudflare.

    - `settings: optional object { ipv4_only, ipv6_only }`

      Settings for the DNS record.

      - `ipv4_only: optional boolean`

        When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

      - `ipv6_only: optional boolean`

        When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

    - `tags: optional array of RecordTags`

      Custom tags for the DNS record. This field has no effect on DNS responses.

  - `NSRecord object { name, ttl, type, 5 more }`

    - `name: string`

      Complete DNS record name, including the zone name, in Punycode.

    - `ttl: TTL`

      Time To Live (TTL) of the DNS record in seconds. Setting to 1 means 'automatic'. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

    - `type: "NS"`

      Record type.

      - `"NS"`

    - `comment: optional string`

      Comments or notes about the DNS record. This field has no effect on DNS responses.

    - `content: optional string`

      A valid name server host name.

    - `proxied: optional boolean`

      Whether the record is receiving the performance and security benefits of Cloudflare.

    - `settings: optional object { ipv4_only, ipv6_only }`

      Settings for the DNS record.

      - `ipv4_only: optional boolean`

        When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

      - `ipv6_only: optional boolean`

        When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

    - `tags: optional array of RecordTags`

      Custom tags for the DNS record. This field has no effect on DNS responses.

  - `DNSRecordsOpenpgpkeyRecord object { name, ttl, type, 5 more }`

    - `name: string`

      Complete DNS record name, including the zone name, in Punycode.

    - `ttl: TTL`

      Time To Live (TTL) of the DNS record in seconds. Setting to 1 means 'automatic'. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

    - `type: "OPENPGPKEY"`

      Record type.

      - `"OPENPGPKEY"`

    - `comment: optional string`

      Comments or notes about the DNS record. This field has no effect on DNS responses.

    - `content: optional string`

      A single Base64-encoded OpenPGP Transferable Public Key (RFC 4880 Section 11.1)

    - `proxied: optional boolean`

      Whether the record is receiving the performance and security benefits of Cloudflare.

    - `settings: optional object { ipv4_only, ipv6_only }`

      Settings for the DNS record.

      - `ipv4_only: optional boolean`

        When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

      - `ipv6_only: optional boolean`

        When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

    - `tags: optional array of RecordTags`

      Custom tags for the DNS record. This field has no effect on DNS responses.

  - `PTRRecord object { name, ttl, type, 5 more }`

    - `name: string`

      Complete DNS record name, including the zone name, in Punycode.

    - `ttl: TTL`

      Time To Live (TTL) of the DNS record in seconds. Setting to 1 means 'automatic'. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

    - `type: "PTR"`

      Record type.

      - `"PTR"`

    - `comment: optional string`

      Comments or notes about the DNS record. This field has no effect on DNS responses.

    - `content: optional string`

      Domain name pointing to the address.

    - `proxied: optional boolean`

      Whether the record is receiving the performance and security benefits of Cloudflare.

    - `settings: optional object { ipv4_only, ipv6_only }`

      Settings for the DNS record.

      - `ipv4_only: optional boolean`

        When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

      - `ipv6_only: optional boolean`

        When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

    - `tags: optional array of RecordTags`

      Custom tags for the DNS record. This field has no effect on DNS responses.

  - `TXTRecord object { name, ttl, type, 5 more }`

    - `name: string`

      Complete DNS record name, including the zone name, in Punycode.

    - `ttl: TTL`

      Time To Live (TTL) of the DNS record in seconds. Setting to 1 means 'automatic'. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

    - `type: "TXT"`

      Record type.

      - `"TXT"`

    - `comment: optional string`

      Comments or notes about the DNS record. This field has no effect on DNS responses.

    - `content: optional string`

      Text content for the record. The content must consist of quoted "character strings" (RFC 1035), each with a length of up to 255 bytes. Strings exceeding this allowed maximum length are automatically split.

      Learn more at <https://www.cloudflare.com/learning/dns/dns-records/dns-txt-record/>.

    - `proxied: optional boolean`

      Whether the record is receiving the performance and security benefits of Cloudflare.

    - `settings: optional object { ipv4_only, ipv6_only }`

      Settings for the DNS record.

      - `ipv4_only: optional boolean`

        When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

      - `ipv6_only: optional boolean`

        When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

    - `tags: optional array of RecordTags`

      Custom tags for the DNS record. This field has no effect on DNS responses.

  - `CAARecord object { name, ttl, type, 6 more }`

    - `name: string`

      Complete DNS record name, including the zone name, in Punycode.

    - `ttl: TTL`

      Time To Live (TTL) of the DNS record in seconds. Setting to 1 means 'automatic'. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

    - `type: "CAA"`

      Record type.

      - `"CAA"`

    - `comment: optional string`

      Comments or notes about the DNS record. This field has no effect on DNS responses.

    - `content: optional string`

      Formatted CAA content. See 'data' to set CAA properties.

    - `data: optional object { flags, tag, value }`

      Components of a CAA record.

      - `flags: optional number`

        Flags for the CAA record.

      - `tag: optional string`

        Name of the property controlled by this record (e.g.: issue, issuewild, iodef).

      - `value: optional string`

        Value of the record. This field's semantics depend on the chosen tag.

    - `proxied: optional boolean`

      Whether the record is receiving the performance and security benefits of Cloudflare.

    - `settings: optional object { ipv4_only, ipv6_only }`

      Settings for the DNS record.

      - `ipv4_only: optional boolean`

        When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

      - `ipv6_only: optional boolean`

        When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

    - `tags: optional array of RecordTags`

      Custom tags for the DNS record. This field has no effect on DNS responses.

  - `CERTRecord object { name, ttl, type, 6 more }`

    - `name: string`

      Complete DNS record name, including the zone name, in Punycode.

    - `ttl: TTL`

      Time To Live (TTL) of the DNS record in seconds. Setting to 1 means 'automatic'. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

    - `type: "CERT"`

      Record type.

      - `"CERT"`

    - `comment: optional string`

      Comments or notes about the DNS record. This field has no effect on DNS responses.

    - `content: optional string`

      Formatted CERT content. See 'data' to set CERT properties.

    - `data: optional object { algorithm, certificate, key_tag, type }`

      Components of a CERT record.

      - `algorithm: optional number`

        Algorithm.

      - `certificate: optional string`

        Certificate.

      - `key_tag: optional number`

        Key Tag.

      - `type: optional number`

        Type.

    - `proxied: optional boolean`

      Whether the record is receiving the performance and security benefits of Cloudflare.

    - `settings: optional object { ipv4_only, ipv6_only }`

      Settings for the DNS record.

      - `ipv4_only: optional boolean`

        When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

      - `ipv6_only: optional boolean`

        When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

    - `tags: optional array of RecordTags`

      Custom tags for the DNS record. This field has no effect on DNS responses.

  - `DNSKEYRecord object { name, ttl, type, 6 more }`

    - `name: string`

      Complete DNS record name, including the zone name, in Punycode.

    - `ttl: TTL`

      Time To Live (TTL) of the DNS record in seconds. Setting to 1 means 'automatic'. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

    - `type: "DNSKEY"`

      Record type.

      - `"DNSKEY"`

    - `comment: optional string`

      Comments or notes about the DNS record. This field has no effect on DNS responses.

    - `content: optional string`

      Formatted DNSKEY content. See 'data' to set DNSKEY properties.

    - `data: optional object { algorithm, flags, protocol, public_key }`

      Components of a DNSKEY record.

      - `algorithm: optional number`

        Algorithm.

      - `flags: optional number`

        Flags.

      - `protocol: optional number`

        Protocol.

      - `public_key: optional string`

        Public Key.

    - `proxied: optional boolean`

      Whether the record is receiving the performance and security benefits of Cloudflare.

    - `settings: optional object { ipv4_only, ipv6_only }`

      Settings for the DNS record.

      - `ipv4_only: optional boolean`

        When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

      - `ipv6_only: optional boolean`

        When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

    - `tags: optional array of RecordTags`

      Custom tags for the DNS record. This field has no effect on DNS responses.

  - `DSRecord object { name, ttl, type, 6 more }`

    - `name: string`

      Complete DNS record name, including the zone name, in Punycode.

    - `ttl: TTL`

      Time To Live (TTL) of the DNS record in seconds. Setting to 1 means 'automatic'. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

    - `type: "DS"`

      Record type.

      - `"DS"`

    - `comment: optional string`

      Comments or notes about the DNS record. This field has no effect on DNS responses.

    - `content: optional string`

      Formatted DS content. See 'data' to set DS properties.

    - `data: optional object { algorithm, digest, digest_type, key_tag }`

      Components of a DS record.

      - `algorithm: optional number`

        Algorithm.

      - `digest: optional string`

        Digest.

      - `digest_type: optional number`

        Digest Type.

      - `key_tag: optional number`

        Key Tag.

    - `proxied: optional boolean`

      Whether the record is receiving the performance and security benefits of Cloudflare.

    - `settings: optional object { ipv4_only, ipv6_only }`

      Settings for the DNS record.

      - `ipv4_only: optional boolean`

        When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

      - `ipv6_only: optional boolean`

        When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

    - `tags: optional array of RecordTags`

      Custom tags for the DNS record. This field has no effect on DNS responses.

  - `HTTPSRecord object { name, ttl, type, 6 more }`

    - `name: string`

      Complete DNS record name, including the zone name, in Punycode.

    - `ttl: TTL`

      Time To Live (TTL) of the DNS record in seconds. Setting to 1 means 'automatic'. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

    - `type: "HTTPS"`

      Record type.

      - `"HTTPS"`

    - `comment: optional string`

      Comments or notes about the DNS record. This field has no effect on DNS responses.

    - `content: optional string`

      Formatted HTTPS content. See 'data' to set HTTPS properties.

    - `data: optional object { priority, target, value }`

      Components of a HTTPS record.

      - `priority: optional number`

        Priority.

      - `target: optional string`

        Target.

      - `value: optional string`

        Value.

    - `proxied: optional boolean`

      Whether the record is receiving the performance and security benefits of Cloudflare.

    - `settings: optional object { ipv4_only, ipv6_only }`

      Settings for the DNS record.

      - `ipv4_only: optional boolean`

        When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

      - `ipv6_only: optional boolean`

        When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

    - `tags: optional array of RecordTags`

      Custom tags for the DNS record. This field has no effect on DNS responses.

  - `LOCRecord object { name, ttl, type, 6 more }`

    - `name: string`

      Complete DNS record name, including the zone name, in Punycode.

    - `ttl: TTL`

      Time To Live (TTL) of the DNS record in seconds. Setting to 1 means 'automatic'. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

    - `type: "LOC"`

      Record type.

      - `"LOC"`

    - `comment: optional string`

      Comments or notes about the DNS record. This field has no effect on DNS responses.

    - `content: optional string`

      Formatted LOC content. See 'data' to set LOC properties.

    - `data: optional object { altitude, lat_degrees, lat_direction, 9 more }`

      Components of a LOC record.

      - `altitude: optional number`

        Altitude of location in meters.

      - `lat_degrees: optional number`

        Degrees of latitude.

      - `lat_direction: optional "N" or "S"`

        Latitude direction.

        - `"N"`

        - `"S"`

      - `lat_minutes: optional number`

        Minutes of latitude.

      - `lat_seconds: optional number`

        Seconds of latitude.

      - `long_degrees: optional number`

        Degrees of longitude.

      - `long_direction: optional "E" or "W"`

        Longitude direction.

        - `"E"`

        - `"W"`

      - `long_minutes: optional number`

        Minutes of longitude.

      - `long_seconds: optional number`

        Seconds of longitude.

      - `precision_horz: optional number`

        Horizontal precision of location.

      - `precision_vert: optional number`

        Vertical precision of location.

      - `size: optional number`

        Size of location in meters.

    - `proxied: optional boolean`

      Whether the record is receiving the performance and security benefits of Cloudflare.

    - `settings: optional object { ipv4_only, ipv6_only }`

      Settings for the DNS record.

      - `ipv4_only: optional boolean`

        When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

      - `ipv6_only: optional boolean`

        When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

    - `tags: optional array of RecordTags`

      Custom tags for the DNS record. This field has no effect on DNS responses.

  - `NAPTRRecord object { name, ttl, type, 6 more }`

    - `name: string`

      Complete DNS record name, including the zone name, in Punycode.

    - `ttl: TTL`

      Time To Live (TTL) of the DNS record in seconds. Setting to 1 means 'automatic'. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

    - `type: "NAPTR"`

      Record type.

      - `"NAPTR"`

    - `comment: optional string`

      Comments or notes about the DNS record. This field has no effect on DNS responses.

    - `content: optional string`

      Formatted NAPTR content. See 'data' to set NAPTR properties.

    - `data: optional object { flags, order, preference, 3 more }`

      Components of a NAPTR record.

      - `flags: optional string`

        Flags.

      - `order: optional number`

        Order.

      - `preference: optional number`

        Preference.

      - `regex: optional string`

        Regex.

      - `replacement: optional string`

        Replacement.

      - `service: optional string`

        Service.

    - `proxied: optional boolean`

      Whether the record is receiving the performance and security benefits of Cloudflare.

    - `settings: optional object { ipv4_only, ipv6_only }`

      Settings for the DNS record.

      - `ipv4_only: optional boolean`

        When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

      - `ipv6_only: optional boolean`

        When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

    - `tags: optional array of RecordTags`

      Custom tags for the DNS record. This field has no effect on DNS responses.

  - `SMIMEARecord object { name, ttl, type, 6 more }`

    - `name: string`

      Complete DNS record name, including the zone name, in Punycode.

    - `ttl: TTL`

      Time To Live (TTL) of the DNS record in seconds. Setting to 1 means 'automatic'. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

    - `type: "SMIMEA"`

      Record type.

      - `"SMIMEA"`

    - `comment: optional string`

      Comments or notes about the DNS record. This field has no effect on DNS responses.

    - `content: optional string`

      Formatted SMIMEA content. See 'data' to set SMIMEA properties.

    - `data: optional object { certificate, matching_type, selector, usage }`

      Components of a SMIMEA record.

      - `certificate: optional string`

        Certificate.

      - `matching_type: optional number`

        Matching Type.

      - `selector: optional number`

        Selector.

      - `usage: optional number`

        Usage.

    - `proxied: optional boolean`

      Whether the record is receiving the performance and security benefits of Cloudflare.

    - `settings: optional object { ipv4_only, ipv6_only }`

      Settings for the DNS record.

      - `ipv4_only: optional boolean`

        When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

      - `ipv6_only: optional boolean`

        When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

    - `tags: optional array of RecordTags`

      Custom tags for the DNS record. This field has no effect on DNS responses.

  - `SRVRecord object { name, ttl, type, 6 more }`

    - `name: string`

      Complete DNS record name, including the zone name, in Punycode.

    - `ttl: TTL`

      Time To Live (TTL) of the DNS record in seconds. Setting to 1 means 'automatic'. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

    - `type: "SRV"`

      Record type.

      - `"SRV"`

    - `comment: optional string`

      Comments or notes about the DNS record. This field has no effect on DNS responses.

    - `content: optional string`

      Priority, weight, port, and SRV target. See 'data' for setting the individual component values.

    - `data: optional object { port, priority, target, weight }`

      Components of a SRV record.

      - `port: optional number`

        The port of the service.

      - `priority: optional number`

        Required for MX and URI records; ignored for other record types (but may still be returned by the API). Records with lower priorities are preferred. This field is to be deprecated in favor of the priority field within the data map.

      - `target: optional string`

        A valid hostname.

      - `weight: optional number`

        The record weight.

    - `proxied: optional boolean`

      Whether the record is receiving the performance and security benefits of Cloudflare.

    - `settings: optional object { ipv4_only, ipv6_only }`

      Settings for the DNS record.

      - `ipv4_only: optional boolean`

        When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

      - `ipv6_only: optional boolean`

        When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

    - `tags: optional array of RecordTags`

      Custom tags for the DNS record. This field has no effect on DNS responses.

  - `SSHFPRecord object { name, ttl, type, 6 more }`

    - `name: string`

      Complete DNS record name, including the zone name, in Punycode.

    - `ttl: TTL`

      Time To Live (TTL) of the DNS record in seconds. Setting to 1 means 'automatic'. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

    - `type: "SSHFP"`

      Record type.

      - `"SSHFP"`

    - `comment: optional string`

      Comments or notes about the DNS record. This field has no effect on DNS responses.

    - `content: optional string`

      Formatted SSHFP content. See 'data' to set SSHFP properties.

    - `data: optional object { algorithm, fingerprint, type }`

      Components of a SSHFP record.

      - `algorithm: optional number`

        Algorithm.

      - `fingerprint: optional string`

        Fingerprint.

      - `type: optional number`

        Type.

    - `proxied: optional boolean`

      Whether the record is receiving the performance and security benefits of Cloudflare.

    - `settings: optional object { ipv4_only, ipv6_only }`

      Settings for the DNS record.

      - `ipv4_only: optional boolean`

        When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

      - `ipv6_only: optional boolean`

        When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

    - `tags: optional array of RecordTags`

      Custom tags for the DNS record. This field has no effect on DNS responses.

  - `SVCBRecord object { name, ttl, type, 6 more }`

    - `name: string`

      Complete DNS record name, including the zone name, in Punycode.

    - `ttl: TTL`

      Time To Live (TTL) of the DNS record in seconds. Setting to 1 means 'automatic'. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

    - `type: "SVCB"`

      Record type.

      - `"SVCB"`

    - `comment: optional string`

      Comments or notes about the DNS record. This field has no effect on DNS responses.

    - `content: optional string`

      Formatted SVCB content. See 'data' to set SVCB properties.

    - `data: optional object { priority, target, value }`

      Components of a SVCB record.

      - `priority: optional number`

        Priority.

      - `target: optional string`

        Target.

      - `value: optional string`

        Value.

    - `proxied: optional boolean`

      Whether the record is receiving the performance and security benefits of Cloudflare.

    - `settings: optional object { ipv4_only, ipv6_only }`

      Settings for the DNS record.

      - `ipv4_only: optional boolean`

        When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

      - `ipv6_only: optional boolean`

        When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

    - `tags: optional array of RecordTags`

      Custom tags for the DNS record. This field has no effect on DNS responses.

  - `TLSARecord object { name, ttl, type, 6 more }`

    - `name: string`

      Complete DNS record name, including the zone name, in Punycode.

    - `ttl: TTL`

      Time To Live (TTL) of the DNS record in seconds. Setting to 1 means 'automatic'. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

    - `type: "TLSA"`

      Record type.

      - `"TLSA"`

    - `comment: optional string`

      Comments or notes about the DNS record. This field has no effect on DNS responses.

    - `content: optional string`

      Formatted TLSA content. See 'data' to set TLSA properties.

    - `data: optional object { certificate, matching_type, selector, usage }`

      Components of a TLSA record.

      - `certificate: optional string`

        Certificate.

      - `matching_type: optional number`

        Matching Type.

      - `selector: optional number`

        Selector.

      - `usage: optional number`

        Usage.

    - `proxied: optional boolean`

      Whether the record is receiving the performance and security benefits of Cloudflare.

    - `settings: optional object { ipv4_only, ipv6_only }`

      Settings for the DNS record.

      - `ipv4_only: optional boolean`

        When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

      - `ipv6_only: optional boolean`

        When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

    - `tags: optional array of RecordTags`

      Custom tags for the DNS record. This field has no effect on DNS responses.

  - `URIRecord object { name, ttl, type, 7 more }`

    - `name: string`

      Complete DNS record name, including the zone name, in Punycode.

    - `ttl: TTL`

      Time To Live (TTL) of the DNS record in seconds. Setting to 1 means 'automatic'. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

    - `type: "URI"`

      Record type.

      - `"URI"`

    - `comment: optional string`

      Comments or notes about the DNS record. This field has no effect on DNS responses.

    - `content: optional string`

      Formatted URI content. See 'data' to set URI properties.

    - `data: optional object { target, weight }`

      Components of a URI record.

      - `target: optional string`

        The record content.

      - `weight: optional number`

        The record weight.

    - `priority: optional number`

      Required for MX and URI records; ignored for other record types (but may still be returned by the API). Records with lower priorities are preferred. This field is to be deprecated in favor of the priority field within the data map.

    - `proxied: optional boolean`

      Whether the record is receiving the performance and security benefits of Cloudflare.

    - `settings: optional object { ipv4_only, ipv6_only }`

      Settings for the DNS record.

      - `ipv4_only: optional boolean`

        When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

      - `ipv6_only: optional boolean`

        When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

    - `tags: optional array of RecordTags`

      Custom tags for the DNS record. This field has no effect on DNS responses.

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

- `result: optional RecordResponse`

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

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "example.com",
          "ttl": 3600,
          "type": "A",
          "comment": "Domain verification record",
          "content": "198.51.100.4",
          "private_routing": true,
          "proxied": true
        }'
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
  "result": {
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
}
```

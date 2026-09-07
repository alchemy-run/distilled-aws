## Update a device posture rule

**put** `/accounts/{account_id}/devices/posture/{rule_id}`

Updates a device posture rule.

### Path Parameters

- `account_id: string`

- `rule_id: string`

  API UUID.

### Body Parameters

- `name: string`

  The name of the device posture rule.

- `type: "file" or "application" or "tanium" or 20 more`

  The type of device posture rule.

  - `"file"`

  - `"application"`

  - `"tanium"`

  - `"gateway"`

  - `"warp"`

  - `"disk_encryption"`

  - `"serial_number"`

  - `"sentinelone"`

  - `"carbonblack"`

  - `"firewall"`

  - `"os_version"`

  - `"domain_joined"`

  - `"client_certificate"`

  - `"client_certificate_v2"`

  - `"antivirus"`

  - `"unique_client_id"`

  - `"kolide"`

  - `"tanium_s2s"`

  - `"crowdstrike_s2s"`

  - `"intune"`

  - `"workspace_one"`

  - `"sentinelone_s2s"`

  - `"custom_s2s"`

- `description: optional string`

  The description of the device posture rule.

- `expiration: optional string`

  Sets the expiration time for a posture check result. If empty, the result remains valid until it is overwritten by new data from the WARP client.

- `input: optional DeviceInput`

  The value to be checked against.

  - `FileInput object { operating_system, path, exists, 2 more }`

    - `operating_system: "windows" or "linux" or "mac"`

      Operating system.

      - `"windows"`

      - `"linux"`

      - `"mac"`

    - `path: string`

      File path.

    - `exists: optional boolean`

      Whether or not file exists.

    - `sha256: optional string`

      SHA-256.

    - `thumbprint: optional string`

      Signing certificate thumbprint.

  - `UniqueClientIDInput object { id, operating_system }`

    - `id: string`

      List ID.

    - `operating_system: "android" or "ios" or "chromeos"`

      Operating System.

      - `"android"`

      - `"ios"`

      - `"chromeos"`

  - `DomainJoinedInput object { operating_system, domain }`

    - `operating_system: "windows"`

      Operating System.

      - `"windows"`

    - `domain: optional string`

      Domain.

  - `OSVersionInput object { operating_system, operator, version, 3 more }`

    - `operating_system: "windows"`

      Operating System.

      - `"windows"`

    - `operator: "<" or "<=" or ">" or 2 more`

      Operator.

      - `"<"`

      - `"<="`

      - `">"`

      - `">="`

      - `"=="`

    - `version: string`

      Version of OS.

    - `os_distro_name: optional string`

      Operating System Distribution Name (linux only).

    - `os_distro_revision: optional string`

      Version of OS Distribution (linux only).

    - `os_version_extra: optional string`

      Additional operating system version details. For Windows, the UBR (Update Build Revision). For Mac or iOS, the Product Version Extra. For Linux, the distribution name and version.

  - `FirewallInput object { enabled, operating_system }`

    - `enabled: boolean`

      Enabled.

    - `operating_system: "windows" or "mac"`

      Operating System.

      - `"windows"`

      - `"mac"`

  - `SentineloneInput object { operating_system, path, sha256, thumbprint }`

    - `operating_system: "windows" or "linux" or "mac"`

      Operating system.

      - `"windows"`

      - `"linux"`

      - `"mac"`

    - `path: string`

      File path.

    - `sha256: optional string`

      SHA-256.

    - `thumbprint: optional string`

      Signing certificate thumbprint.

  - `TeamsDevicesCarbonblackInputRequest object { operating_system, path, sha256, thumbprint }`

    - `operating_system: "windows" or "linux" or "mac"`

      Operating system.

      - `"windows"`

      - `"linux"`

      - `"mac"`

    - `path: string`

      File path.

    - `sha256: optional string`

      SHA-256.

    - `thumbprint: optional string`

      Signing certificate thumbprint.

  - `TeamsDevicesAccessSerialNumberListInputRequest object { id }`

    - `id: string`

      UUID of Access List.

  - `DiskEncryptionInput object { checkDisks, requireAll }`

    - `checkDisks: optional array of CarbonblackInput`

      List of volume names to be checked for encryption.

    - `requireAll: optional boolean`

      Whether to check all disks for encryption.

  - `TeamsDevicesApplicationInputRequest object { operating_system, path, sha256, thumbprint }`

    - `operating_system: "windows" or "linux" or "mac"`

      Operating system.

      - `"windows"`

      - `"linux"`

      - `"mac"`

    - `path: string`

      Path for the application.

    - `sha256: optional string`

      SHA-256.

    - `thumbprint: optional string`

      Signing certificate thumbprint.

  - `ClientCertificateInput object { certificate_id, cn }`

    - `certificate_id: string`

      UUID of Cloudflare managed certificate.

    - `cn: string`

      Common Name that is protected by the certificate.

  - `TeamsDevicesClientCertificateV2InputRequest object { certificate_id, check_private_key, operating_system, 4 more }`

    - `certificate_id: string`

      UUID of Cloudflare managed certificate.

    - `check_private_key: boolean`

      Confirm the certificate was not imported from another device. We recommend keeping this enabled unless the certificate was deployed without a private key.

    - `operating_system: "windows" or "linux" or "mac"`

      Operating system.

      - `"windows"`

      - `"linux"`

      - `"mac"`

    - `cn: optional string`

      Certificate Common Name. This may include one or more variables in the ${ } notation. Only ${serial_number} and ${hostname} are valid variables.

    - `extended_key_usage: optional array of "clientAuth" or "emailProtection"`

      List of values indicating purposes for which the certificate public key can be used.

      - `"clientAuth"`

      - `"emailProtection"`

    - `locations: optional object { paths, trust_stores }`

      - `paths: optional array of string`

        List of paths to check for client certificate on linux.

      - `trust_stores: optional array of "system" or "user"`

        List of trust stores to check for client certificate.

        - `"system"`

        - `"user"`

    - `subject_alternative_names: optional array of string`

      List of certificate Subject Alternative Names.

  - `TeamsDevicesAntivirusInputRequest object { update_window_days }`

    - `update_window_days: optional number`

      Number of days that the antivirus should be updated within.

  - `WorkspaceOneInput object { compliance_status, connection_id }`

    - `compliance_status: "compliant" or "noncompliant" or "unknown"`

      Compliance Status.

      - `"compliant"`

      - `"noncompliant"`

      - `"unknown"`

    - `connection_id: string`

      Posture Integration ID.

  - `CrowdstrikeInput object { connection_id, last_seen, operator, 6 more }`

    - `connection_id: string`

      Posture Integration ID.

    - `last_seen: optional string`

      For more details on last seen, please refer to the Crowdstrike documentation.

    - `operator: optional "<" or "<=" or ">" or 2 more`

      Operator.

      - `"<"`

      - `"<="`

      - `">"`

      - `">="`

      - `"=="`

    - `os: optional string`

      Os Version.

    - `overall: optional string`

      Overall.

    - `sensor_config: optional string`

      SensorConfig.

    - `state: optional "online" or "offline" or "unknown"`

      For more details on state, please refer to the Crowdstrike documentation.

      - `"online"`

      - `"offline"`

      - `"unknown"`

    - `version: optional string`

      Version.

    - `versionOperator: optional "<" or "<=" or ">" or 2 more`

      Version Operator.

      - `"<"`

      - `"<="`

      - `">"`

      - `">="`

      - `"=="`

  - `IntuneInput object { compliance_status, connection_id }`

    - `compliance_status: "compliant" or "noncompliant" or "unknown" or 3 more`

      Compliance Status.

      - `"compliant"`

      - `"noncompliant"`

      - `"unknown"`

      - `"notapplicable"`

      - `"ingraceperiod"`

      - `"error"`

    - `connection_id: string`

      Posture Integration ID.

  - `KolideInput object { connection_id, auth_state, countOperator, issue_count }`

    - `connection_id: string`

      Posture Integration ID.

    - `auth_state: optional array of "Good" or "Notified" or "Will Block" or "Blocked"`

      The set of Kolide device authentication states that pass the posture check. Device must match one of the specified states.

      - `"Good"`

      - `"Notified"`

      - `"Will Block"`

      - `"Blocked"`

    - `countOperator: optional "<" or "<=" or ">" or 2 more`

      Count Operator.

      - `"<"`

      - `"<="`

      - `">"`

      - `">="`

      - `"=="`

    - `issue_count: optional string`

      The Number of Issues.

  - `TaniumInput object { connection_id, eid_last_seen, operator, 3 more }`

    - `connection_id: string`

      Posture Integration ID.

    - `eid_last_seen: optional string`

      For more details on eid last seen, refer to the Tanium documentation.

    - `operator: optional "<" or "<=" or ">" or 2 more`

      Operator to evaluate risk_level or eid_last_seen.

      - `"<"`

      - `"<="`

      - `">"`

      - `">="`

      - `"=="`

    - `risk_level: optional "low" or "medium" or "high" or "critical"`

      For more details on risk level, refer to the Tanium documentation.

      - `"low"`

      - `"medium"`

      - `"high"`

      - `"critical"`

    - `scoreOperator: optional "<" or "<=" or ">" or 2 more`

      Score Operator.

      - `"<"`

      - `"<="`

      - `">"`

      - `">="`

      - `"=="`

    - `total_score: optional number`

      For more details on total score, refer to the Tanium documentation.

  - `SentineloneS2sInput object { connection_id, active_threats, infected, 4 more }`

    - `connection_id: string`

      Posture Integration ID.

    - `active_threats: optional number`

      The Number of active threats.

    - `infected: optional boolean`

      Whether device is infected.

    - `is_active: optional boolean`

      Whether device is active.

    - `network_status: optional "connected" or "disconnected" or "disconnecting" or "connecting"`

      Network status of device.

      - `"connected"`

      - `"disconnected"`

      - `"disconnecting"`

      - `"connecting"`

    - `operational_state: optional "na" or "partially_disabled" or "auto_fully_disabled" or 4 more`

      Agent operational state.

      - `"na"`

      - `"partially_disabled"`

      - `"auto_fully_disabled"`

      - `"fully_disabled"`

      - `"auto_partially_disabled"`

      - `"disabled_error"`

      - `"db_corruption"`

    - `operator: optional "<" or "<=" or ">" or 2 more`

      Operator.

      - `"<"`

      - `"<="`

      - `">"`

      - `">="`

      - `"=="`

  - `TeamsDevicesCustomS2sInputRequest object { connection_id, operator, score }`

    - `connection_id: string`

      Posture Integration ID.

    - `operator: "<" or "<=" or ">" or 2 more`

      Operator.

      - `"<"`

      - `"<="`

      - `">"`

      - `">="`

      - `"=="`

    - `score: number`

      A value between 0-100 assigned to devices set by the 3rd party posture provider.

- `match: optional array of DeviceMatch`

  The conditions that the client must match to run the rule.

  - `platform: optional "windows" or "mac" or "linux" or 3 more`

    - `"windows"`

    - `"mac"`

    - `"linux"`

    - `"android"`

    - `"ios"`

    - `"chromeos"`

- `schedule: optional string`

  Polling frequency for the WARP client posture check. Default: `5m` (poll every five minutes). Minimum: `1m`.

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

- `result: DevicePostureRule`

  - `id: optional string`

    API UUID.

  - `description: optional string`

    The description of the device posture rule.

  - `expiration: optional string`

    Sets the expiration time for a posture check result. If empty, the result remains valid until it is overwritten by new data from the WARP client.

  - `input: optional DeviceInput`

    The value to be checked against.

    - `FileInput object { operating_system, path, exists, 2 more }`

      - `operating_system: "windows" or "linux" or "mac"`

        Operating system.

        - `"windows"`

        - `"linux"`

        - `"mac"`

      - `path: string`

        File path.

      - `exists: optional boolean`

        Whether or not file exists.

      - `sha256: optional string`

        SHA-256.

      - `thumbprint: optional string`

        Signing certificate thumbprint.

    - `UniqueClientIDInput object { id, operating_system }`

      - `id: string`

        List ID.

      - `operating_system: "android" or "ios" or "chromeos"`

        Operating System.

        - `"android"`

        - `"ios"`

        - `"chromeos"`

    - `DomainJoinedInput object { operating_system, domain }`

      - `operating_system: "windows"`

        Operating System.

        - `"windows"`

      - `domain: optional string`

        Domain.

    - `OSVersionInput object { operating_system, operator, version, 3 more }`

      - `operating_system: "windows"`

        Operating System.

        - `"windows"`

      - `operator: "<" or "<=" or ">" or 2 more`

        Operator.

        - `"<"`

        - `"<="`

        - `">"`

        - `">="`

        - `"=="`

      - `version: string`

        Version of OS.

      - `os_distro_name: optional string`

        Operating System Distribution Name (linux only).

      - `os_distro_revision: optional string`

        Version of OS Distribution (linux only).

      - `os_version_extra: optional string`

        Additional operating system version details. For Windows, the UBR (Update Build Revision). For Mac or iOS, the Product Version Extra. For Linux, the distribution name and version.

    - `FirewallInput object { enabled, operating_system }`

      - `enabled: boolean`

        Enabled.

      - `operating_system: "windows" or "mac"`

        Operating System.

        - `"windows"`

        - `"mac"`

    - `SentineloneInput object { operating_system, path, sha256, thumbprint }`

      - `operating_system: "windows" or "linux" or "mac"`

        Operating system.

        - `"windows"`

        - `"linux"`

        - `"mac"`

      - `path: string`

        File path.

      - `sha256: optional string`

        SHA-256.

      - `thumbprint: optional string`

        Signing certificate thumbprint.

    - `TeamsDevicesCarbonblackInputRequest object { operating_system, path, sha256, thumbprint }`

      - `operating_system: "windows" or "linux" or "mac"`

        Operating system.

        - `"windows"`

        - `"linux"`

        - `"mac"`

      - `path: string`

        File path.

      - `sha256: optional string`

        SHA-256.

      - `thumbprint: optional string`

        Signing certificate thumbprint.

    - `TeamsDevicesAccessSerialNumberListInputRequest object { id }`

      - `id: string`

        UUID of Access List.

    - `DiskEncryptionInput object { checkDisks, requireAll }`

      - `checkDisks: optional array of CarbonblackInput`

        List of volume names to be checked for encryption.

      - `requireAll: optional boolean`

        Whether to check all disks for encryption.

    - `TeamsDevicesApplicationInputRequest object { operating_system, path, sha256, thumbprint }`

      - `operating_system: "windows" or "linux" or "mac"`

        Operating system.

        - `"windows"`

        - `"linux"`

        - `"mac"`

      - `path: string`

        Path for the application.

      - `sha256: optional string`

        SHA-256.

      - `thumbprint: optional string`

        Signing certificate thumbprint.

    - `ClientCertificateInput object { certificate_id, cn }`

      - `certificate_id: string`

        UUID of Cloudflare managed certificate.

      - `cn: string`

        Common Name that is protected by the certificate.

    - `TeamsDevicesClientCertificateV2InputRequest object { certificate_id, check_private_key, operating_system, 4 more }`

      - `certificate_id: string`

        UUID of Cloudflare managed certificate.

      - `check_private_key: boolean`

        Confirm the certificate was not imported from another device. We recommend keeping this enabled unless the certificate was deployed without a private key.

      - `operating_system: "windows" or "linux" or "mac"`

        Operating system.

        - `"windows"`

        - `"linux"`

        - `"mac"`

      - `cn: optional string`

        Certificate Common Name. This may include one or more variables in the ${ } notation. Only ${serial_number} and ${hostname} are valid variables.

      - `extended_key_usage: optional array of "clientAuth" or "emailProtection"`

        List of values indicating purposes for which the certificate public key can be used.

        - `"clientAuth"`

        - `"emailProtection"`

      - `locations: optional object { paths, trust_stores }`

        - `paths: optional array of string`

          List of paths to check for client certificate on linux.

        - `trust_stores: optional array of "system" or "user"`

          List of trust stores to check for client certificate.

          - `"system"`

          - `"user"`

      - `subject_alternative_names: optional array of string`

        List of certificate Subject Alternative Names.

    - `TeamsDevicesAntivirusInputRequest object { update_window_days }`

      - `update_window_days: optional number`

        Number of days that the antivirus should be updated within.

    - `WorkspaceOneInput object { compliance_status, connection_id }`

      - `compliance_status: "compliant" or "noncompliant" or "unknown"`

        Compliance Status.

        - `"compliant"`

        - `"noncompliant"`

        - `"unknown"`

      - `connection_id: string`

        Posture Integration ID.

    - `CrowdstrikeInput object { connection_id, last_seen, operator, 6 more }`

      - `connection_id: string`

        Posture Integration ID.

      - `last_seen: optional string`

        For more details on last seen, please refer to the Crowdstrike documentation.

      - `operator: optional "<" or "<=" or ">" or 2 more`

        Operator.

        - `"<"`

        - `"<="`

        - `">"`

        - `">="`

        - `"=="`

      - `os: optional string`

        Os Version.

      - `overall: optional string`

        Overall.

      - `sensor_config: optional string`

        SensorConfig.

      - `state: optional "online" or "offline" or "unknown"`

        For more details on state, please refer to the Crowdstrike documentation.

        - `"online"`

        - `"offline"`

        - `"unknown"`

      - `version: optional string`

        Version.

      - `versionOperator: optional "<" or "<=" or ">" or 2 more`

        Version Operator.

        - `"<"`

        - `"<="`

        - `">"`

        - `">="`

        - `"=="`

    - `IntuneInput object { compliance_status, connection_id }`

      - `compliance_status: "compliant" or "noncompliant" or "unknown" or 3 more`

        Compliance Status.

        - `"compliant"`

        - `"noncompliant"`

        - `"unknown"`

        - `"notapplicable"`

        - `"ingraceperiod"`

        - `"error"`

      - `connection_id: string`

        Posture Integration ID.

    - `KolideInput object { connection_id, auth_state, countOperator, issue_count }`

      - `connection_id: string`

        Posture Integration ID.

      - `auth_state: optional array of "Good" or "Notified" or "Will Block" or "Blocked"`

        The set of Kolide device authentication states that pass the posture check. Device must match one of the specified states.

        - `"Good"`

        - `"Notified"`

        - `"Will Block"`

        - `"Blocked"`

      - `countOperator: optional "<" or "<=" or ">" or 2 more`

        Count Operator.

        - `"<"`

        - `"<="`

        - `">"`

        - `">="`

        - `"=="`

      - `issue_count: optional string`

        The Number of Issues.

    - `TaniumInput object { connection_id, eid_last_seen, operator, 3 more }`

      - `connection_id: string`

        Posture Integration ID.

      - `eid_last_seen: optional string`

        For more details on eid last seen, refer to the Tanium documentation.

      - `operator: optional "<" or "<=" or ">" or 2 more`

        Operator to evaluate risk_level or eid_last_seen.

        - `"<"`

        - `"<="`

        - `">"`

        - `">="`

        - `"=="`

      - `risk_level: optional "low" or "medium" or "high" or "critical"`

        For more details on risk level, refer to the Tanium documentation.

        - `"low"`

        - `"medium"`

        - `"high"`

        - `"critical"`

      - `scoreOperator: optional "<" or "<=" or ">" or 2 more`

        Score Operator.

        - `"<"`

        - `"<="`

        - `">"`

        - `">="`

        - `"=="`

      - `total_score: optional number`

        For more details on total score, refer to the Tanium documentation.

    - `SentineloneS2sInput object { connection_id, active_threats, infected, 4 more }`

      - `connection_id: string`

        Posture Integration ID.

      - `active_threats: optional number`

        The Number of active threats.

      - `infected: optional boolean`

        Whether device is infected.

      - `is_active: optional boolean`

        Whether device is active.

      - `network_status: optional "connected" or "disconnected" or "disconnecting" or "connecting"`

        Network status of device.

        - `"connected"`

        - `"disconnected"`

        - `"disconnecting"`

        - `"connecting"`

      - `operational_state: optional "na" or "partially_disabled" or "auto_fully_disabled" or 4 more`

        Agent operational state.

        - `"na"`

        - `"partially_disabled"`

        - `"auto_fully_disabled"`

        - `"fully_disabled"`

        - `"auto_partially_disabled"`

        - `"disabled_error"`

        - `"db_corruption"`

      - `operator: optional "<" or "<=" or ">" or 2 more`

        Operator.

        - `"<"`

        - `"<="`

        - `">"`

        - `">="`

        - `"=="`

    - `TeamsDevicesCustomS2sInputRequest object { connection_id, operator, score }`

      - `connection_id: string`

        Posture Integration ID.

      - `operator: "<" or "<=" or ">" or 2 more`

        Operator.

        - `"<"`

        - `"<="`

        - `">"`

        - `">="`

        - `"=="`

      - `score: number`

        A value between 0-100 assigned to devices set by the 3rd party posture provider.

  - `match: optional array of DeviceMatch`

    The conditions that the client must match to run the rule.

    - `platform: optional "windows" or "mac" or "linux" or 3 more`

      - `"windows"`

      - `"mac"`

      - `"linux"`

      - `"android"`

      - `"ios"`

      - `"chromeos"`

  - `name: optional string`

    The name of the device posture rule.

  - `schedule: optional string`

    Polling frequency for the WARP client posture check. Default: `5m` (poll every five minutes). Minimum: `1m`.

  - `type: optional "file" or "application" or "tanium" or 20 more`

    The type of device posture rule.

    - `"file"`

    - `"application"`

    - `"tanium"`

    - `"gateway"`

    - `"warp"`

    - `"disk_encryption"`

    - `"serial_number"`

    - `"sentinelone"`

    - `"carbonblack"`

    - `"firewall"`

    - `"os_version"`

    - `"domain_joined"`

    - `"client_certificate"`

    - `"client_certificate_v2"`

    - `"antivirus"`

    - `"unique_client_id"`

    - `"kolide"`

    - `"tanium_s2s"`

    - `"crowdstrike_s2s"`

    - `"intune"`

    - `"workspace_one"`

    - `"sentinelone_s2s"`

    - `"custom_s2s"`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/posture/$RULE_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "Admin Serial Numbers",
          "type": "file",
          "description": "The rule for admin serial numbers",
          "expiration": "1h",
          "input": {
            "operating_system": "linux",
            "path": "/bin/cat",
            "thumbprint": "0aabab210bdb998e9cf45da2c9ce352977ab531c681b74cf1e487be1bbe9fe6e"
          },
          "schedule": "1h"
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
  "result": {
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "description": "The rule for admin serial numbers",
    "expiration": "1h",
    "input": {
      "operating_system": "linux",
      "path": "/bin/cat",
      "exists": true,
      "sha256": "https://api.us-2.crowdstrike.com",
      "thumbprint": "0aabab210bdb998e9cf45da2c9ce352977ab531c681b74cf1e487be1bbe9fe6e"
    },
    "match": [
      {
        "platform": "windows"
      }
    ],
    "name": "Admin Serial Numbers",
    "schedule": "1h",
    "type": "file"
  },
  "success": true
}
```

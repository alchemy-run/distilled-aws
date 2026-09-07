import * as HttpClient from "effect/unstable/http/HttpClient";
import * as redacted from "effect/Redacted";
import * as S from "@distilled.cloud/core/schema";
import * as API from "@distilled.cloud/core/api";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { Credentials as Creds } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { SensitiveString } from "../sensitive.ts";
const ns = T.XmlNamespace("http://awss3control.amazonaws.com/doc/2018-08-20/");
const svc = T.AwsApiService({
  sdkId: "S3 Control",
  serviceShapeName: "AWSS3ControlServiceV20180820",
});
const auth = T.AwsAuthSigv4({ name: "s3" });
const ver = T.ServiceVersion("2018-08-20");
const proto = T.AwsProtocolsRestXml();
const rules = T.EndpointResolver((p, _) => {
  const {
    Region,
    UseFIPS = false,
    UseDualStack = false,
    Endpoint,
    AccountId,
    RequiresAccountId,
    OutpostId,
    Bucket,
    AccessPointName,
    UseArnRegion,
    ResourceArn,
    UseS3ExpressControlEndpoint,
  } = p;
  const e = (u: unknown, p = {}, h = {}): T.EndpointResolverResult => ({
    type: "endpoint" as const,
    endpoint: { url: u as string, properties: p, headers: h },
  });
  const err = (m: unknown): T.EndpointResolverResult => ({
    type: "error" as const,
    message: m as string,
  });
  const _p0 = (_0: unknown) => ({
    authSchemes: [
      {
        disableDoubleEncoding: true,
        name: "sigv4",
        signingName: "s3-outposts",
        signingRegion: `${_0}`,
      },
    ],
  });
  const _p1 = (_0: unknown) => ({
    authSchemes: [
      {
        disableDoubleEncoding: true,
        name: "sigv4",
        signingName: "s3express",
        signingRegion: `${_0}`,
      },
    ],
  });
  const _p2 = (_0: unknown) => ({
    authSchemes: [
      {
        disableDoubleEncoding: true,
        name: "sigv4",
        signingName: "s3",
        signingRegion: `${_0}`,
      },
    ],
  });
  const _p3 = (_0: unknown) => ({
    authSchemes: [
      {
        disableDoubleEncoding: true,
        name: "sigv4",
        signingName: "s3-outposts",
        signingRegion: `${_.getAttr(_0, "region")}`,
      },
    ],
  });
  if (Region != null) {
    {
      const partitionResult = _.partition(Region);
      if (
        UseFIPS === true &&
        partitionResult != null &&
        partitionResult !== false &&
        _.getAttr(partitionResult, "name") === "aws-cn"
      ) {
        return err("Partition does not support FIPS");
      }
    }
    if (OutpostId != null) {
      {
        const partitionResult = _.partition(Region);
        if (partitionResult != null && partitionResult !== false) {
          if (
            RequiresAccountId != null &&
            RequiresAccountId === true &&
            !(AccountId != null)
          ) {
            return err("AccountId is required but not set");
          }
          if (AccountId != null && !_.isValidHostLabel(AccountId, false)) {
            return err("AccountId must only contain a-z, A-Z, 0-9 and `-`.");
          }
          if (!_.isValidHostLabel(OutpostId, false)) {
            return err("OutpostId must only contain a-z, A-Z, 0-9 and `-`.");
          }
          if (Endpoint != null && UseDualStack === true) {
            return err(
              "Invalid Configuration: DualStack and custom endpoint are not supported",
            );
          }
          if (_.isValidHostLabel(Region, true)) {
            {
              const url = _.parseURL(Endpoint);
              if (Endpoint != null && url != null && url !== false) {
                return e(
                  `${_.getAttr(url, "scheme")}://${_.getAttr(url, "authority")}${_.getAttr(url, "path")}`,
                  _p0(Region),
                  {},
                );
              }
            }
            if (UseFIPS === true && UseDualStack === true) {
              return e(
                `https://s3-outposts-fips.${Region}.${_.getAttr(partitionResult, "dualStackDnsSuffix")}`,
                _p0(Region),
                {},
              );
            }
            if (UseFIPS === true) {
              return e(
                `https://s3-outposts-fips.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                _p0(Region),
                {},
              );
            }
            if (UseDualStack === true) {
              return e(
                `https://s3-outposts.${Region}.${_.getAttr(partitionResult, "dualStackDnsSuffix")}`,
                _p0(Region),
                {},
              );
            }
            return e(
              `https://s3-outposts.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
              _p0(Region),
              {},
            );
          }
          return err("Invalid region: region was not a valid DNS name.");
        }
      }
    }
    {
      const resourceArn = _.parseArn(ResourceArn);
      if (
        ResourceArn != null &&
        resourceArn != null &&
        resourceArn !== false &&
        _.getAttr(resourceArn, "service") === "s3express"
      ) {
        {
          const partitionResult = _.partition(Region);
          if (partitionResult != null && partitionResult !== false) {
            {
              const arnPartition = _.partition(
                _.getAttr(resourceArn, "region"),
              );
              if (arnPartition != null && arnPartition !== false) {
                if (
                  _.getAttr(arnPartition, "name") ===
                  _.getAttr(partitionResult, "name")
                ) {
                  if (
                    UseArnRegion != null &&
                    UseArnRegion === false &&
                    !(_.getAttr(resourceArn, "region") === `${Region}`)
                  ) {
                    return err(
                      `Invalid configuration: region from ARN \`${_.getAttr(resourceArn, "region")}\` does not match client region \`${Region}\` and UseArnRegion is \`false\``,
                    );
                  }
                  if (Endpoint != null && UseDualStack === true) {
                    return err(
                      "Invalid Configuration: DualStack and custom endpoint are not supported",
                    );
                  }
                  if (UseDualStack === true) {
                    return err("S3Express does not support Dual-stack.");
                  }
                  {
                    const url = _.parseURL(Endpoint);
                    if (Endpoint != null && url != null && url !== false) {
                      return e(
                        `${_.getAttr(url, "scheme")}://${_.getAttr(url, "authority")}`,
                        _p1(Region),
                        {},
                      );
                    }
                  }
                  if (UseFIPS === true) {
                    return e(
                      `https://s3express-control-fips.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                      _p1(Region),
                      {},
                    );
                  }
                  return e(
                    `https://s3express-control.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                    _p1(Region),
                    {},
                  );
                }
                return err(
                  `Client was configured for partition \`${_.getAttr(partitionResult, "name")}\` but ARN has \`${_.getAttr(arnPartition, "name")}\``,
                );
              }
            }
          }
        }
      }
    }
    {
      const accessPointSuffix = _.substring(AccessPointName, 0, 7, true);
      if (
        AccessPointName != null &&
        accessPointSuffix != null &&
        accessPointSuffix !== false &&
        accessPointSuffix === "--xa-s3"
      ) {
        {
          const partitionResult = _.partition(Region);
          if (partitionResult != null && partitionResult !== false) {
            if (Endpoint != null && UseDualStack === true) {
              return err(
                "Invalid Configuration: DualStack and custom endpoint are not supported",
              );
            }
            if (UseDualStack === true) {
              return err("S3Express does not support Dual-stack.");
            }
            {
              const url = _.parseURL(Endpoint);
              if (Endpoint != null && url != null && url !== false) {
                return e(
                  `${_.getAttr(url, "scheme")}://${_.getAttr(url, "authority")}`,
                  _p1(Region),
                  {},
                );
              }
            }
            {
              const s3expressAvailabilityZoneId = _.substring(
                AccessPointName,
                7,
                15,
                true,
              );
              const s3expressAvailabilityZoneDelim = _.substring(
                AccessPointName,
                15,
                17,
                true,
              );
              if (
                s3expressAvailabilityZoneId != null &&
                s3expressAvailabilityZoneId !== false &&
                s3expressAvailabilityZoneDelim != null &&
                s3expressAvailabilityZoneDelim !== false &&
                s3expressAvailabilityZoneDelim === "--"
              ) {
                if (UseFIPS === true) {
                  return e(
                    `https://s3express-control-fips.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                    _p1(Region),
                    {},
                  );
                }
                return e(
                  `https://s3express-control.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                  _p1(Region),
                  {},
                );
              }
            }
            {
              const s3expressAvailabilityZoneId = _.substring(
                AccessPointName,
                7,
                16,
                true,
              );
              const s3expressAvailabilityZoneDelim = _.substring(
                AccessPointName,
                16,
                18,
                true,
              );
              if (
                s3expressAvailabilityZoneId != null &&
                s3expressAvailabilityZoneId !== false &&
                s3expressAvailabilityZoneDelim != null &&
                s3expressAvailabilityZoneDelim !== false &&
                s3expressAvailabilityZoneDelim === "--"
              ) {
                if (UseFIPS === true) {
                  return e(
                    `https://s3express-control-fips.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                    _p1(Region),
                    {},
                  );
                }
                return e(
                  `https://s3express-control.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                  _p1(Region),
                  {},
                );
              }
            }
            {
              const s3expressAvailabilityZoneId = _.substring(
                AccessPointName,
                7,
                20,
                true,
              );
              const s3expressAvailabilityZoneDelim = _.substring(
                AccessPointName,
                20,
                22,
                true,
              );
              if (
                s3expressAvailabilityZoneId != null &&
                s3expressAvailabilityZoneId !== false &&
                s3expressAvailabilityZoneDelim != null &&
                s3expressAvailabilityZoneDelim !== false &&
                s3expressAvailabilityZoneDelim === "--"
              ) {
                if (UseFIPS === true) {
                  return e(
                    `https://s3express-control-fips.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                    _p1(Region),
                    {},
                  );
                }
                return e(
                  `https://s3express-control.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                  _p1(Region),
                  {},
                );
              }
            }
            {
              const s3expressAvailabilityZoneId = _.substring(
                AccessPointName,
                7,
                21,
                true,
              );
              const s3expressAvailabilityZoneDelim = _.substring(
                AccessPointName,
                21,
                23,
                true,
              );
              if (
                s3expressAvailabilityZoneId != null &&
                s3expressAvailabilityZoneId !== false &&
                s3expressAvailabilityZoneDelim != null &&
                s3expressAvailabilityZoneDelim !== false &&
                s3expressAvailabilityZoneDelim === "--"
              ) {
                if (UseFIPS === true) {
                  return e(
                    `https://s3express-control-fips.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                    _p1(Region),
                    {},
                  );
                }
                return e(
                  `https://s3express-control.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                  _p1(Region),
                  {},
                );
              }
            }
            {
              const s3expressAvailabilityZoneId = _.substring(
                AccessPointName,
                7,
                27,
                true,
              );
              const s3expressAvailabilityZoneDelim = _.substring(
                AccessPointName,
                27,
                29,
                true,
              );
              if (
                s3expressAvailabilityZoneId != null &&
                s3expressAvailabilityZoneId !== false &&
                s3expressAvailabilityZoneDelim != null &&
                s3expressAvailabilityZoneDelim !== false &&
                s3expressAvailabilityZoneDelim === "--"
              ) {
                if (UseFIPS === true) {
                  return e(
                    `https://s3express-control-fips.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                    _p1(Region),
                    {},
                  );
                }
                return e(
                  `https://s3express-control.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                  _p1(Region),
                  {},
                );
              }
            }
            return err("Unrecognized S3Express Access Point name format.");
          }
        }
      }
    }
    if (
      UseS3ExpressControlEndpoint != null &&
      UseS3ExpressControlEndpoint === true
    ) {
      {
        const partitionResult = _.partition(Region);
        if (partitionResult != null && partitionResult !== false) {
          if (Endpoint != null && UseDualStack === true) {
            return err(
              "Invalid Configuration: DualStack and custom endpoint are not supported",
            );
          }
          if (UseDualStack === true) {
            return err("S3Express does not support Dual-stack.");
          }
          {
            const url = _.parseURL(Endpoint);
            if (Endpoint != null && url != null && url !== false) {
              return e(
                `${_.getAttr(url, "scheme")}://${_.getAttr(url, "authority")}`,
                _p1(Region),
                {},
              );
            }
          }
          if (UseFIPS === true) {
            return e(
              `https://s3express-control-fips.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
              _p1(Region),
              {},
            );
          }
          return e(
            `https://s3express-control.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
            _p1(Region),
            {},
          );
        }
      }
    }
    {
      const url = _.parseURL(Endpoint);
      if (
        Region === "snow" &&
        Endpoint != null &&
        url != null &&
        url !== false
      ) {
        {
          const partitionResult = _.partition(Region);
          if (partitionResult != null && partitionResult !== false) {
            if (UseDualStack === true) {
              return err("S3 Snow does not support DualStack");
            }
            if (UseFIPS === true) {
              return err("S3 Snow does not support FIPS");
            }
            return e(
              `${_.getAttr(url, "scheme")}://${_.getAttr(url, "authority")}`,
              _p2(Region),
              {},
            );
          }
        }
      }
    }
    {
      const accessPointArn = _.parseArn(AccessPointName);
      if (
        AccessPointName != null &&
        accessPointArn != null &&
        accessPointArn !== false
      ) {
        {
          const arnType = _.getAttr(accessPointArn, "resourceId[0]");
          if (arnType != null && arnType !== false && !(arnType === "")) {
            if (_.getAttr(accessPointArn, "service") === "s3-outposts") {
              {
                const outpostId = _.getAttr(accessPointArn, "resourceId[1]");
                if (outpostId != null && outpostId !== false) {
                  if (_.isValidHostLabel(outpostId, false)) {
                    if (Endpoint != null && UseDualStack === true) {
                      return err(
                        "Invalid Configuration: DualStack and custom endpoint are not supported",
                      );
                    }
                    if (
                      UseArnRegion != null &&
                      UseArnRegion === false &&
                      !(_.getAttr(accessPointArn, "region") === `${Region}`)
                    ) {
                      return err(
                        `Invalid configuration: region from ARN \`${_.getAttr(accessPointArn, "region")}\` does not match client region \`${Region}\` and UseArnRegion is \`false\``,
                      );
                    }
                    {
                      const partitionResult = _.partition(Region);
                      if (
                        partitionResult != null &&
                        partitionResult !== false
                      ) {
                        {
                          const arnPartition = _.partition(
                            _.getAttr(accessPointArn, "region"),
                          );
                          if (arnPartition != null && arnPartition !== false) {
                            if (
                              _.getAttr(arnPartition, "name") ===
                              _.getAttr(partitionResult, "name")
                            ) {
                              if (
                                _.isValidHostLabel(
                                  _.getAttr(accessPointArn, "region"),
                                  true,
                                )
                              ) {
                                if (
                                  !(
                                    _.getAttr(accessPointArn, "accountId") ===
                                    ""
                                  )
                                ) {
                                  if (
                                    _.isValidHostLabel(
                                      _.getAttr(accessPointArn, "accountId"),
                                      false,
                                    )
                                  ) {
                                    if (
                                      AccountId != null &&
                                      !(
                                        AccountId ===
                                        `${_.getAttr(accessPointArn, "accountId")}`
                                      )
                                    ) {
                                      return err(
                                        `Invalid ARN: the accountId specified in the ARN (\`${_.getAttr(accessPointArn, "accountId")}\`) does not match the parameter (\`${AccountId}\`)`,
                                      );
                                    }
                                    {
                                      const outpostType = _.getAttr(
                                        accessPointArn,
                                        "resourceId[2]",
                                      );
                                      if (
                                        outpostType != null &&
                                        outpostType !== false
                                      ) {
                                        {
                                          const accessPointName = _.getAttr(
                                            accessPointArn,
                                            "resourceId[3]",
                                          );
                                          if (
                                            accessPointName != null &&
                                            accessPointName !== false
                                          ) {
                                            if (outpostType === "accesspoint") {
                                              if (
                                                UseFIPS === true &&
                                                UseDualStack === true
                                              ) {
                                                return e(
                                                  `https://s3-outposts-fips.${_.getAttr(accessPointArn, "region")}.${_.getAttr(arnPartition, "dualStackDnsSuffix")}`,
                                                  _p3(accessPointArn),
                                                  {
                                                    "x-amz-account-id": [
                                                      `${_.getAttr(accessPointArn, "accountId")}`,
                                                    ],
                                                    "x-amz-outpost-id": [
                                                      `${outpostId}`,
                                                    ],
                                                  },
                                                );
                                              }
                                              if (UseFIPS === true) {
                                                return e(
                                                  `https://s3-outposts-fips.${_.getAttr(accessPointArn, "region")}.${_.getAttr(arnPartition, "dnsSuffix")}`,
                                                  _p3(accessPointArn),
                                                  {
                                                    "x-amz-account-id": [
                                                      `${_.getAttr(accessPointArn, "accountId")}`,
                                                    ],
                                                    "x-amz-outpost-id": [
                                                      `${outpostId}`,
                                                    ],
                                                  },
                                                );
                                              }
                                              if (UseDualStack === true) {
                                                return e(
                                                  `https://s3-outposts.${_.getAttr(accessPointArn, "region")}.${_.getAttr(arnPartition, "dualStackDnsSuffix")}`,
                                                  _p3(accessPointArn),
                                                  {
                                                    "x-amz-account-id": [
                                                      `${_.getAttr(accessPointArn, "accountId")}`,
                                                    ],
                                                    "x-amz-outpost-id": [
                                                      `${outpostId}`,
                                                    ],
                                                  },
                                                );
                                              }
                                              {
                                                const url =
                                                  _.parseURL(Endpoint);
                                                if (
                                                  Endpoint != null &&
                                                  url != null &&
                                                  url !== false
                                                ) {
                                                  return e(
                                                    `${_.getAttr(url, "scheme")}://${_.getAttr(url, "authority")}${_.getAttr(url, "path")}`,
                                                    _p3(accessPointArn),
                                                    {
                                                      "x-amz-account-id": [
                                                        `${_.getAttr(accessPointArn, "accountId")}`,
                                                      ],
                                                      "x-amz-outpost-id": [
                                                        `${outpostId}`,
                                                      ],
                                                    },
                                                  );
                                                }
                                              }
                                              return e(
                                                `https://s3-outposts.${_.getAttr(accessPointArn, "region")}.${_.getAttr(arnPartition, "dnsSuffix")}`,
                                                _p3(accessPointArn),
                                                {
                                                  "x-amz-account-id": [
                                                    `${_.getAttr(accessPointArn, "accountId")}`,
                                                  ],
                                                  "x-amz-outpost-id": [
                                                    `${outpostId}`,
                                                  ],
                                                },
                                              );
                                            }
                                            return err(
                                              `Expected an outpost type \`accesspoint\`, found \`${outpostType}\``,
                                            );
                                          }
                                        }
                                        return err(
                                          "Invalid ARN: expected an access point name",
                                        );
                                      }
                                    }
                                    return err(
                                      "Invalid ARN: Expected a 4-component resource",
                                    );
                                  }
                                  return err(
                                    `Invalid ARN: The account id may only contain a-z, A-Z, 0-9 and \`-\`. Found: \`${_.getAttr(accessPointArn, "accountId")}\``,
                                  );
                                }
                                return err("Invalid ARN: missing account ID");
                              }
                              return err(
                                `Invalid region in ARN: \`${_.getAttr(accessPointArn, "region")}\` (invalid DNS name)`,
                              );
                            }
                            return err(
                              `Client was configured for partition \`${_.getAttr(partitionResult, "name")}\` but ARN has \`${_.getAttr(arnPartition, "name")}\``,
                            );
                          }
                        }
                      }
                    }
                  }
                  return err(
                    `Invalid ARN: The outpost Id must only contain a-z, A-Z, 0-9 and \`-\`., found: \`${outpostId}\``,
                  );
                }
              }
              return err("Invalid ARN: The Outpost Id was not set");
            }
          }
        }
        return err("Invalid ARN: No ARN type specified");
      }
    }
    {
      const bucketArn = _.parseArn(Bucket);
      if (Bucket != null && bucketArn != null && bucketArn !== false) {
        {
          const arnType = _.getAttr(bucketArn, "resourceId[0]");
          if (arnType != null && arnType !== false && !(arnType === "")) {
            if (_.getAttr(bucketArn, "service") === "s3-outposts") {
              {
                const outpostId = _.getAttr(bucketArn, "resourceId[1]");
                if (outpostId != null && outpostId !== false) {
                  if (_.isValidHostLabel(outpostId, false)) {
                    if (Endpoint != null && UseDualStack === true) {
                      return err(
                        "Invalid Configuration: DualStack and custom endpoint are not supported",
                      );
                    }
                    if (
                      UseArnRegion != null &&
                      UseArnRegion === false &&
                      !(_.getAttr(bucketArn, "region") === `${Region}`)
                    ) {
                      return err(
                        `Invalid configuration: region from ARN \`${_.getAttr(bucketArn, "region")}\` does not match client region \`${Region}\` and UseArnRegion is \`false\``,
                      );
                    }
                    {
                      const arnPartition = _.partition(
                        _.getAttr(bucketArn, "region"),
                      );
                      if (arnPartition != null && arnPartition !== false) {
                        {
                          const partitionResult = _.partition(Region);
                          if (
                            partitionResult != null &&
                            partitionResult !== false
                          ) {
                            if (
                              _.getAttr(arnPartition, "name") ===
                              _.getAttr(partitionResult, "name")
                            ) {
                              if (
                                _.isValidHostLabel(
                                  _.getAttr(bucketArn, "region"),
                                  true,
                                )
                              ) {
                                if (
                                  !(_.getAttr(bucketArn, "accountId") === "")
                                ) {
                                  if (
                                    _.isValidHostLabel(
                                      _.getAttr(bucketArn, "accountId"),
                                      false,
                                    )
                                  ) {
                                    if (
                                      AccountId != null &&
                                      !(
                                        AccountId ===
                                        `${_.getAttr(bucketArn, "accountId")}`
                                      )
                                    ) {
                                      return err(
                                        `Invalid ARN: the accountId specified in the ARN (\`${_.getAttr(bucketArn, "accountId")}\`) does not match the parameter (\`${AccountId}\`)`,
                                      );
                                    }
                                    {
                                      const outpostType = _.getAttr(
                                        bucketArn,
                                        "resourceId[2]",
                                      );
                                      if (
                                        outpostType != null &&
                                        outpostType !== false
                                      ) {
                                        {
                                          const bucketName = _.getAttr(
                                            bucketArn,
                                            "resourceId[3]",
                                          );
                                          if (
                                            bucketName != null &&
                                            bucketName !== false
                                          ) {
                                            if (outpostType === "bucket") {
                                              if (
                                                UseFIPS === true &&
                                                UseDualStack === true
                                              ) {
                                                return e(
                                                  `https://s3-outposts-fips.${_.getAttr(bucketArn, "region")}.${_.getAttr(arnPartition, "dualStackDnsSuffix")}`,
                                                  _p3(bucketArn),
                                                  {
                                                    "x-amz-account-id": [
                                                      `${_.getAttr(bucketArn, "accountId")}`,
                                                    ],
                                                    "x-amz-outpost-id": [
                                                      `${outpostId}`,
                                                    ],
                                                  },
                                                );
                                              }
                                              if (UseFIPS === true) {
                                                return e(
                                                  `https://s3-outposts-fips.${_.getAttr(bucketArn, "region")}.${_.getAttr(arnPartition, "dnsSuffix")}`,
                                                  _p3(bucketArn),
                                                  {
                                                    "x-amz-account-id": [
                                                      `${_.getAttr(bucketArn, "accountId")}`,
                                                    ],
                                                    "x-amz-outpost-id": [
                                                      `${outpostId}`,
                                                    ],
                                                  },
                                                );
                                              }
                                              if (UseDualStack === true) {
                                                return e(
                                                  `https://s3-outposts.${_.getAttr(bucketArn, "region")}.${_.getAttr(arnPartition, "dualStackDnsSuffix")}`,
                                                  _p3(bucketArn),
                                                  {
                                                    "x-amz-account-id": [
                                                      `${_.getAttr(bucketArn, "accountId")}`,
                                                    ],
                                                    "x-amz-outpost-id": [
                                                      `${outpostId}`,
                                                    ],
                                                  },
                                                );
                                              }
                                              {
                                                const url =
                                                  _.parseURL(Endpoint);
                                                if (
                                                  Endpoint != null &&
                                                  url != null &&
                                                  url !== false
                                                ) {
                                                  return e(
                                                    `${_.getAttr(url, "scheme")}://${_.getAttr(url, "authority")}${_.getAttr(url, "path")}`,
                                                    _p3(bucketArn),
                                                    {
                                                      "x-amz-account-id": [
                                                        `${_.getAttr(bucketArn, "accountId")}`,
                                                      ],
                                                      "x-amz-outpost-id": [
                                                        `${outpostId}`,
                                                      ],
                                                    },
                                                  );
                                                }
                                              }
                                              return e(
                                                `https://s3-outposts.${_.getAttr(bucketArn, "region")}.${_.getAttr(arnPartition, "dnsSuffix")}`,
                                                _p3(bucketArn),
                                                {
                                                  "x-amz-account-id": [
                                                    `${_.getAttr(bucketArn, "accountId")}`,
                                                  ],
                                                  "x-amz-outpost-id": [
                                                    `${outpostId}`,
                                                  ],
                                                },
                                              );
                                            }
                                            return err(
                                              `Invalid ARN: Expected an outpost type \`bucket\`, found \`${outpostType}\``,
                                            );
                                          }
                                        }
                                        return err(
                                          "Invalid ARN: expected a bucket name",
                                        );
                                      }
                                    }
                                    return err(
                                      "Invalid ARN: Expected a 4-component resource",
                                    );
                                  }
                                  return err(
                                    `Invalid ARN: The account id may only contain a-z, A-Z, 0-9 and \`-\`. Found: \`${_.getAttr(bucketArn, "accountId")}\``,
                                  );
                                }
                                return err("Invalid ARN: missing account ID");
                              }
                              return err(
                                `Invalid region in ARN: \`${_.getAttr(bucketArn, "region")}\` (invalid DNS name)`,
                              );
                            }
                            return err(
                              `Client was configured for partition \`${_.getAttr(partitionResult, "name")}\` but ARN has \`${_.getAttr(arnPartition, "name")}\``,
                            );
                          }
                        }
                      }
                    }
                  }
                  return err(
                    `Invalid ARN: The outpost Id must only contain a-z, A-Z, 0-9 and \`-\`., found: \`${outpostId}\``,
                  );
                }
              }
              return err("Invalid ARN: The Outpost Id was not set");
            }
          }
        }
        return err("Invalid ARN: No ARN type specified");
      }
    }
    {
      const partitionResult = _.partition(Region);
      if (partitionResult != null && partitionResult !== false) {
        if (_.isValidHostLabel(Region, true)) {
          if (
            RequiresAccountId != null &&
            RequiresAccountId === true &&
            !(AccountId != null)
          ) {
            return err("AccountId is required but not set");
          }
          if (AccountId != null && !_.isValidHostLabel(AccountId, false)) {
            return err("AccountId must only contain a-z, A-Z, 0-9 and `-`.");
          }
          {
            const url = _.parseURL(Endpoint);
            if (Endpoint != null && url != null && url !== false) {
              if (UseDualStack === true) {
                return err(
                  "Invalid Configuration: DualStack and custom endpoint are not supported",
                );
              }
              if (
                RequiresAccountId != null &&
                RequiresAccountId === true &&
                AccountId != null
              ) {
                return e(
                  `${_.getAttr(url, "scheme")}://${AccountId}.${_.getAttr(url, "authority")}${_.getAttr(url, "path")}`,
                  _p2(Region),
                  {},
                );
              }
              return e(
                `${_.getAttr(url, "scheme")}://${_.getAttr(url, "authority")}${_.getAttr(url, "path")}`,
                _p2(Region),
                {},
              );
            }
          }
          if (
            UseFIPS === true &&
            UseDualStack === true &&
            RequiresAccountId != null &&
            RequiresAccountId === true &&
            AccountId != null
          ) {
            return e(
              `https://${AccountId}.s3-control-fips.dualstack.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
              _p2(Region),
              {},
            );
          }
          if (UseFIPS === true && UseDualStack === true) {
            return e(
              `https://s3-control-fips.dualstack.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
              _p2(Region),
              {},
            );
          }
          if (
            UseFIPS === true &&
            UseDualStack === false &&
            RequiresAccountId != null &&
            RequiresAccountId === true &&
            AccountId != null
          ) {
            return e(
              `https://${AccountId}.s3-control-fips.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
              _p2(Region),
              {},
            );
          }
          if (UseFIPS === true && UseDualStack === false) {
            return e(
              `https://s3-control-fips.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
              _p2(Region),
              {},
            );
          }
          if (
            UseFIPS === false &&
            UseDualStack === true &&
            RequiresAccountId != null &&
            RequiresAccountId === true &&
            AccountId != null
          ) {
            return e(
              `https://${AccountId}.s3-control.dualstack.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
              _p2(Region),
              {},
            );
          }
          if (UseFIPS === false && UseDualStack === true) {
            return e(
              `https://s3-control.dualstack.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
              _p2(Region),
              {},
            );
          }
          if (
            UseFIPS === false &&
            UseDualStack === false &&
            RequiresAccountId != null &&
            RequiresAccountId === true &&
            AccountId != null
          ) {
            return e(
              `https://${AccountId}.s3-control.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
              _p2(Region),
              {},
            );
          }
          if (UseFIPS === false && UseDualStack === false) {
            return e(
              `https://s3-control.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
              _p2(Region),
              {},
            );
          }
        }
        return err("Invalid region: region was not a valid DNS name.");
      }
    }
  }
  return err("Region must be set");
});

export class AccessPointAlreadyOwnedByYou
  extends /*@__PURE__*/ S.TaggedError<AccessPointAlreadyOwnedByYou>()(
    "AccessPointAlreadyOwnedByYou",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withAlreadyExistsError) {}
export class BadRequestException
  extends /*@__PURE__*/ S.TaggedError<BadRequestException>()(
    "BadRequestException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class BucketAlreadyExists
  extends /*@__PURE__*/ S.TaggedError<BucketAlreadyExists>()(
    "BucketAlreadyExists",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withAlreadyExistsError) {}
export class BucketAlreadyOwnedByYou
  extends /*@__PURE__*/ S.TaggedError<BucketAlreadyOwnedByYou>()(
    "BucketAlreadyOwnedByYou",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class IdempotencyException
  extends /*@__PURE__*/ S.TaggedError<IdempotencyException>()(
    "IdempotencyException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InternalServiceException
  extends /*@__PURE__*/ S.TaggedError<InternalServiceException>()(
    "InternalServiceException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidNextTokenException
  extends /*@__PURE__*/ S.TaggedError<InvalidNextTokenException>()(
    "InvalidNextTokenException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidRequest
  extends /*@__PURE__*/ S.TaggedError<InvalidRequest>()("InvalidRequest", {
    message: S.optional(S.String).pipe(T.ErrorMessage()),
  }).pipe(C.withBadRequestError) {}
export class InvalidRequestException
  extends /*@__PURE__*/ S.TaggedError<InvalidRequestException>()(
    "InvalidRequestException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class JobStatusException
  extends /*@__PURE__*/ S.TaggedError<JobStatusException>()(
    "JobStatusException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class JobStatusTransitionForbidden
  extends /*@__PURE__*/ S.TaggedError<JobStatusTransitionForbidden>()(
    "JobStatusTransitionForbidden",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.SyntheticError({
      from: "InvalidRequest",
      message: { includes: "job status forbidden" },
    }),
  ).pipe(C.withBadRequestError) {}
export class MalformedPolicy
  extends /*@__PURE__*/ S.TaggedError<MalformedPolicy>()("MalformedPolicy", {
    message: S.optional(S.String).pipe(T.ErrorMessage()),
  }).pipe(C.withBadRequestError) {}
export class MissingBucketLevelActivityMetrics
  extends /*@__PURE__*/ S.TaggedError<MissingBucketLevelActivityMetrics>()(
    "MissingBucketLevelActivityMetrics",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withBadRequestError) {}
export class NoSuchAccessPoint
  extends /*@__PURE__*/ S.TaggedError<NoSuchAccessPoint>()(
    "NoSuchAccessPoint",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withNotFoundError) {}
export class NoSuchAccessPointPolicy
  extends /*@__PURE__*/ S.TaggedError<NoSuchAccessPointPolicy>()(
    "NoSuchAccessPointPolicy",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withNotFoundError) {}
export class NoSuchConfiguration
  extends /*@__PURE__*/ S.TaggedError<NoSuchConfiguration>()(
    "NoSuchConfiguration",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withNotFoundError) {}
export class NoSuchMultiRegionAccessPoint
  extends /*@__PURE__*/ S.TaggedError<NoSuchMultiRegionAccessPoint>()(
    "NoSuchMultiRegionAccessPoint",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withNotFoundError) {}
export class NoSuchPublicAccessBlockConfiguration
  extends /*@__PURE__*/ S.TaggedError<NoSuchPublicAccessBlockConfiguration>()(
    "NoSuchPublicAccessBlockConfiguration",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class NotFoundException
  extends /*@__PURE__*/ S.TaggedError<NotFoundException>()(
    "NotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ObjectLambdaNotAvailable
  extends /*@__PURE__*/ S.TaggedError<ObjectLambdaNotAvailable>()(
    "ObjectLambdaNotAvailable",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.SyntheticError({
      from: "AccessDenied",
      message: {
        includes: "Object Lambda is available only to existing customers",
      },
    }),
  ).pipe(C.withAuthError) {}
export class TooManyRequestsException
  extends /*@__PURE__*/ S.TaggedError<TooManyRequestsException>()(
    "TooManyRequestsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class TooManyTagsException
  extends /*@__PURE__*/ S.TaggedError<TooManyTagsException>()(
    "TooManyTagsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export type AccountId = string;
export type IdentityCenterArn = string;
export interface AssociateAccessGrantsIdentityCenterRequest {
  AccountId: string;
  IdentityCenterArn: string;
}
export const AssociateAccessGrantsIdentityCenterRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      AccountId: S.String.pipe(
        T.HttpHeader("x-amz-account-id"),
        T.ContextParam("AccountId"),
        T.HostLabel(),
      ),
      IdentityCenterArn: S.String,
    }).pipe(
      T.all(
        ns,
        T.Http({
          method: "POST",
          uri: "/v20180820/accessgrantsinstance/identitycenter",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
        T.StaticContextParams({ RequiresAccountId: { value: true } }),
      ),
    ),
  ).annotate({
    identifier: "AssociateAccessGrantsIdentityCenterRequest",
  }) as any as S.Schema<AssociateAccessGrantsIdentityCenterRequest>;
export interface AssociateAccessGrantsIdentityCenterResponse {}
export const AssociateAccessGrantsIdentityCenterResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({}).pipe(ns)).annotate({
    identifier: "AssociateAccessGrantsIdentityCenterResponse",
  }) as any as S.Schema<AssociateAccessGrantsIdentityCenterResponse>;
export type AccessGrantsLocationId = string;
export type S3Prefix = string;
export interface AccessGrantsLocationConfiguration {
  S3SubPrefix?: string;
}
export const AccessGrantsLocationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ S3SubPrefix: S.optional(S.String) }),
).annotate({
  identifier: "AccessGrantsLocationConfiguration",
}) as any as S.Schema<AccessGrantsLocationConfiguration>;
export type GranteeType =
  | "DIRECTORY_USER"
  | "DIRECTORY_GROUP"
  | "IAM"
  | (string & {});
export const GranteeType = S.String;

export type GranteeIdentifier = string;
export interface Grantee {
  GranteeType?: GranteeType;
  GranteeIdentifier?: string;
}
export const Grantee = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GranteeType: S.optional(GranteeType),
    GranteeIdentifier: S.optional(S.String),
  }),
).annotate({ identifier: "Grantee" }) as any as S.Schema<Grantee>;
export type Permission = "READ" | "WRITE" | "READWRITE" | (string & {});
export const Permission = S.String;

export type IdentityCenterApplicationArn = string;
export type S3PrefixType = "Object" | (string & {});
export const S3PrefixType = S.String;

export type TagKeyString = string;
export type TagValueString = string;
export interface Tag {
  Key: string;
  Value: string;
}
export const Tag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.String, Value: S.String }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type TagList = Tag[];
export const TagList = /*@__PURE__*/ S.Array(
  Tag.pipe(T.XmlName("Tag")).annotate({ identifier: "Tag" }),
);
export interface CreateAccessGrantRequest {
  AccountId: string;
  AccessGrantsLocationId: string;
  AccessGrantsLocationConfiguration?: AccessGrantsLocationConfiguration;
  Grantee: Grantee;
  Permission: Permission;
  ApplicationArn?: string;
  S3PrefixType?: S3PrefixType;
  Tags?: Tag[];
}
export const CreateAccessGrantRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(
      T.HttpHeader("x-amz-account-id"),
      T.ContextParam("AccountId"),
      T.HostLabel(),
    ),
    AccessGrantsLocationId: S.String,
    AccessGrantsLocationConfiguration: S.optional(
      AccessGrantsLocationConfiguration,
    ),
    Grantee: Grantee,
    Permission: Permission,
    ApplicationArn: S.optional(S.String),
    S3PrefixType: S.optional(S3PrefixType),
    Tags: S.optional(TagList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v20180820/accessgrantsinstance/grant" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ RequiresAccountId: { value: true } }),
    ),
  ),
).annotate({
  identifier: "CreateAccessGrantRequest",
}) as any as S.Schema<CreateAccessGrantRequest>;
export type CreationTimestamp = Date;
export type AccessGrantId = string;
export type AccessGrantArn = string;
export interface CreateAccessGrantResult {
  CreatedAt?: Date;
  AccessGrantId?: string;
  AccessGrantArn?: string;
  Grantee?: Grantee;
  AccessGrantsLocationId?: string;
  AccessGrantsLocationConfiguration?: AccessGrantsLocationConfiguration;
  Permission?: Permission;
  ApplicationArn?: string;
  GrantScope?: string;
}
export const CreateAccessGrantResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CreatedAt: S.optional(T.DateFromString),
    AccessGrantId: S.optional(S.String),
    AccessGrantArn: S.optional(S.String),
    Grantee: S.optional(Grantee),
    AccessGrantsLocationId: S.optional(S.String),
    AccessGrantsLocationConfiguration: S.optional(
      AccessGrantsLocationConfiguration,
    ),
    Permission: S.optional(Permission),
    ApplicationArn: S.optional(S.String),
    GrantScope: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "CreateAccessGrantResult",
}) as any as S.Schema<CreateAccessGrantResult>;
export interface CreateAccessGrantsInstanceRequest {
  AccountId: string;
  IdentityCenterArn?: string;
  Tags?: Tag[];
}
export const CreateAccessGrantsInstanceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(
      T.HttpHeader("x-amz-account-id"),
      T.ContextParam("AccountId"),
      T.HostLabel(),
    ),
    IdentityCenterArn: S.optional(S.String),
    Tags: S.optional(TagList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v20180820/accessgrantsinstance" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ RequiresAccountId: { value: true } }),
    ),
  ),
).annotate({
  identifier: "CreateAccessGrantsInstanceRequest",
}) as any as S.Schema<CreateAccessGrantsInstanceRequest>;
export type AccessGrantsInstanceId = string;
export type AccessGrantsInstanceArn = string;
export interface CreateAccessGrantsInstanceResult {
  CreatedAt?: Date;
  AccessGrantsInstanceId?: string;
  AccessGrantsInstanceArn?: string;
  IdentityCenterArn?: string;
  IdentityCenterInstanceArn?: string;
  IdentityCenterApplicationArn?: string;
}
export const CreateAccessGrantsInstanceResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CreatedAt: S.optional(T.DateFromString),
    AccessGrantsInstanceId: S.optional(S.String),
    AccessGrantsInstanceArn: S.optional(S.String),
    IdentityCenterArn: S.optional(S.String),
    IdentityCenterInstanceArn: S.optional(S.String),
    IdentityCenterApplicationArn: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "CreateAccessGrantsInstanceResult",
}) as any as S.Schema<CreateAccessGrantsInstanceResult>;
export type IAMRoleArn = string;
export interface CreateAccessGrantsLocationRequest {
  AccountId: string;
  LocationScope: string;
  IAMRoleArn: string;
  Tags?: Tag[];
}
export const CreateAccessGrantsLocationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(
      T.HttpHeader("x-amz-account-id"),
      T.ContextParam("AccountId"),
      T.HostLabel(),
    ),
    LocationScope: S.String,
    IAMRoleArn: S.String,
    Tags: S.optional(TagList),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "POST",
        uri: "/v20180820/accessgrantsinstance/location",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ RequiresAccountId: { value: true } }),
    ),
  ),
).annotate({
  identifier: "CreateAccessGrantsLocationRequest",
}) as any as S.Schema<CreateAccessGrantsLocationRequest>;
export type AccessGrantsLocationArn = string;
export interface CreateAccessGrantsLocationResult {
  CreatedAt?: Date;
  AccessGrantsLocationId?: string;
  AccessGrantsLocationArn?: string;
  LocationScope?: string;
  IAMRoleArn?: string;
}
export const CreateAccessGrantsLocationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CreatedAt: S.optional(T.DateFromString),
    AccessGrantsLocationId: S.optional(S.String),
    AccessGrantsLocationArn: S.optional(S.String),
    LocationScope: S.optional(S.String),
    IAMRoleArn: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "CreateAccessGrantsLocationResult",
}) as any as S.Schema<CreateAccessGrantsLocationResult>;
export type AccessPointName = string;
export type BucketName = string;
export type VpcId = string;
export interface VpcConfiguration {
  VpcId: string;
}
export const VpcConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ VpcId: S.String }),
).annotate({
  identifier: "VpcConfiguration",
}) as any as S.Schema<VpcConfiguration>;
export type Setting = boolean;
export interface PublicAccessBlockConfiguration {
  BlockPublicAcls?: boolean;
  IgnorePublicAcls?: boolean;
  BlockPublicPolicy?: boolean;
  RestrictPublicBuckets?: boolean;
}
export const PublicAccessBlockConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BlockPublicAcls: S.optional(S.Boolean).pipe(T.XmlName("BlockPublicAcls")),
    IgnorePublicAcls: S.optional(S.Boolean).pipe(T.XmlName("IgnorePublicAcls")),
    BlockPublicPolicy: S.optional(S.Boolean).pipe(
      T.XmlName("BlockPublicPolicy"),
    ),
    RestrictPublicBuckets: S.optional(S.Boolean).pipe(
      T.XmlName("RestrictPublicBuckets"),
    ),
  }),
).annotate({
  identifier: "PublicAccessBlockConfiguration",
}) as any as S.Schema<PublicAccessBlockConfiguration>;
export type Prefix = string;
export type PrefixesList = string[];
export const PrefixesList = /*@__PURE__*/ S.Array(
  S.String.pipe(T.XmlName("Prefix")),
);
export type ScopePermission =
  | "GetObject"
  | "GetObjectAttributes"
  | "ListMultipartUploadParts"
  | "ListBucket"
  | "ListBucketMultipartUploads"
  | "PutObject"
  | "DeleteObject"
  | "AbortMultipartUpload"
  | (string & {});
export const ScopePermission = S.String;

export type ScopePermissionList = ScopePermission[];
export const ScopePermissionList = /*@__PURE__*/ S.Array(
  ScopePermission.pipe(T.XmlName("Permission")),
);
export interface Scope {
  Prefixes?: string[];
  Permissions?: ScopePermission[];
}
export const Scope = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Prefixes: S.optional(PrefixesList).pipe(T.XmlName("Prefixes")),
    Permissions: S.optional(ScopePermissionList).pipe(T.XmlName("Permissions")),
  }),
).annotate({ identifier: "Scope" }) as any as S.Schema<Scope>;
export interface CreateAccessPointRequest {
  AccountId: string;
  Name: string;
  Bucket: string;
  VpcConfiguration?: VpcConfiguration;
  PublicAccessBlockConfiguration?: PublicAccessBlockConfiguration;
  BucketAccountId?: string;
  Scope?: Scope;
  Tags?: Tag[];
}
export const CreateAccessPointRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(
      T.HttpHeader("x-amz-account-id"),
      T.ContextParam("AccountId"),
      T.HostLabel(),
    ),
    Name: S.String.pipe(T.HttpLabel("Name"), T.ContextParam("AccessPointName")),
    Bucket: S.String.pipe(T.ContextParam("Bucket")),
    VpcConfiguration: S.optional(VpcConfiguration),
    PublicAccessBlockConfiguration: S.optional(PublicAccessBlockConfiguration),
    BucketAccountId: S.optional(S.String),
    Scope: S.optional(Scope),
    Tags: S.optional(TagList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "PUT", uri: "/v20180820/accesspoint/{Name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ RequiresAccountId: { value: true } }),
    ),
  ),
).annotate({
  identifier: "CreateAccessPointRequest",
}) as any as S.Schema<CreateAccessPointRequest>;
export type S3AccessPointArn = string;
export type Alias = string;
export interface CreateAccessPointResult {
  AccessPointArn?: string;
  Alias?: string;
}
export const CreateAccessPointResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccessPointArn: S.optional(S.String),
    Alias: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "CreateAccessPointResult",
}) as any as S.Schema<CreateAccessPointResult>;
export type ObjectLambdaAccessPointName = string;
export type ObjectLambdaSupportingAccessPointArn = string;
export type ObjectLambdaAllowedFeature =
  | "GetObject-Range"
  | "GetObject-PartNumber"
  | "HeadObject-Range"
  | "HeadObject-PartNumber"
  | (string & {});
export const ObjectLambdaAllowedFeature = S.String;

export type ObjectLambdaAllowedFeaturesList = ObjectLambdaAllowedFeature[];
export const ObjectLambdaAllowedFeaturesList = /*@__PURE__*/ S.Array(
  ObjectLambdaAllowedFeature.pipe(T.XmlName("AllowedFeature")),
);
export type ObjectLambdaTransformationConfigurationAction =
  | "GetObject"
  | "HeadObject"
  | "ListObjects"
  | "ListObjectsV2"
  | (string & {});
export const ObjectLambdaTransformationConfigurationAction = S.String;

export type ObjectLambdaTransformationConfigurationActionsList =
  ObjectLambdaTransformationConfigurationAction[];
export const ObjectLambdaTransformationConfigurationActionsList =
  /*@__PURE__*/ S.Array(
    ObjectLambdaTransformationConfigurationAction.pipe(T.XmlName("Action")),
  );
export type FunctionArnString = string;
export type AwsLambdaTransformationPayload = string;
export interface AwsLambdaTransformation {
  FunctionArn: string;
  FunctionPayload?: string;
}
export const AwsLambdaTransformation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FunctionArn: S.String, FunctionPayload: S.optional(S.String) }),
).annotate({
  identifier: "AwsLambdaTransformation",
}) as any as S.Schema<AwsLambdaTransformation>;
export type ObjectLambdaContentTransformation = {
  AwsLambda: AwsLambdaTransformation;
};
export const ObjectLambdaContentTransformation = /*@__PURE__*/ S.Union([
  S.Struct({ AwsLambda: AwsLambdaTransformation }),
]);
export interface ObjectLambdaTransformationConfiguration {
  Actions: ObjectLambdaTransformationConfigurationAction[];
  ContentTransformation: ObjectLambdaContentTransformation;
}
export const ObjectLambdaTransformationConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Actions: ObjectLambdaTransformationConfigurationActionsList,
      ContentTransformation: ObjectLambdaContentTransformation,
    }),
).annotate({
  identifier: "ObjectLambdaTransformationConfiguration",
}) as any as S.Schema<ObjectLambdaTransformationConfiguration>;
export type ObjectLambdaTransformationConfigurationsList =
  ObjectLambdaTransformationConfiguration[];
export const ObjectLambdaTransformationConfigurationsList =
  /*@__PURE__*/ S.Array(
    ObjectLambdaTransformationConfiguration.pipe(
      T.XmlName("TransformationConfiguration"),
    ).annotate({ identifier: "ObjectLambdaTransformationConfiguration" }),
  );
export interface ObjectLambdaConfiguration {
  SupportingAccessPoint: string;
  CloudWatchMetricsEnabled?: boolean;
  AllowedFeatures?: ObjectLambdaAllowedFeature[];
  TransformationConfigurations: ObjectLambdaTransformationConfiguration[];
}
export const ObjectLambdaConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SupportingAccessPoint: S.String,
    CloudWatchMetricsEnabled: S.optional(S.Boolean),
    AllowedFeatures: S.optional(ObjectLambdaAllowedFeaturesList),
    TransformationConfigurations: ObjectLambdaTransformationConfigurationsList,
  }),
).annotate({
  identifier: "ObjectLambdaConfiguration",
}) as any as S.Schema<ObjectLambdaConfiguration>;
export interface CreateAccessPointForObjectLambdaRequest {
  AccountId: string;
  Name: string;
  Configuration: ObjectLambdaConfiguration;
}
export const CreateAccessPointForObjectLambdaRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AccountId: S.String.pipe(
        T.HttpHeader("x-amz-account-id"),
        T.ContextParam("AccountId"),
        T.HostLabel(),
      ),
      Name: S.String.pipe(T.HttpLabel("Name")),
      Configuration: ObjectLambdaConfiguration,
    }).pipe(
      T.all(
        ns,
        T.Http({
          method: "PUT",
          uri: "/v20180820/accesspointforobjectlambda/{Name}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
        T.StaticContextParams({ RequiresAccountId: { value: true } }),
      ),
    ),
).annotate({
  identifier: "CreateAccessPointForObjectLambdaRequest",
}) as any as S.Schema<CreateAccessPointForObjectLambdaRequest>;
export type ObjectLambdaAccessPointArn = string;
export type ObjectLambdaAccessPointAliasValue = string;
export type ObjectLambdaAccessPointAliasStatus =
  | "PROVISIONING"
  | "READY"
  | (string & {});
export const ObjectLambdaAccessPointAliasStatus = S.String;

export interface ObjectLambdaAccessPointAlias {
  Value?: string;
  Status?: ObjectLambdaAccessPointAliasStatus;
}
export const ObjectLambdaAccessPointAlias = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Value: S.optional(S.String),
    Status: S.optional(ObjectLambdaAccessPointAliasStatus),
  }),
).annotate({
  identifier: "ObjectLambdaAccessPointAlias",
}) as any as S.Schema<ObjectLambdaAccessPointAlias>;
export interface CreateAccessPointForObjectLambdaResult {
  ObjectLambdaAccessPointArn?: string;
  Alias?: ObjectLambdaAccessPointAlias;
}
export const CreateAccessPointForObjectLambdaResult = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ObjectLambdaAccessPointArn: S.optional(S.String),
      Alias: S.optional(ObjectLambdaAccessPointAlias),
    }).pipe(ns),
).annotate({
  identifier: "CreateAccessPointForObjectLambdaResult",
}) as any as S.Schema<CreateAccessPointForObjectLambdaResult>;
export type BucketCannedACL =
  | "private"
  | "public-read"
  | "public-read-write"
  | "authenticated-read"
  | (string & {});
export const BucketCannedACL = S.String;

export type BucketLocationConstraint =
  | "EU"
  | "eu-west-1"
  | "us-west-1"
  | "us-west-2"
  | "ap-south-1"
  | "ap-southeast-1"
  | "ap-southeast-2"
  | "ap-northeast-1"
  | "sa-east-1"
  | "cn-north-1"
  | "eu-central-1"
  | (string & {});
export const BucketLocationConstraint = S.String;

export interface CreateBucketConfiguration {
  LocationConstraint?: BucketLocationConstraint;
}
export const CreateBucketConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LocationConstraint: S.optional(BucketLocationConstraint) }),
).annotate({
  identifier: "CreateBucketConfiguration",
}) as any as S.Schema<CreateBucketConfiguration>;
export type GrantFullControl = string;
export type GrantRead = string;
export type GrantReadACP = string;
export type GrantWrite = string;
export type GrantWriteACP = string;
export type ObjectLockEnabledForBucket = boolean;
export type NonEmptyMaxLength64String = string;
export interface CreateBucketRequest {
  ACL?: BucketCannedACL;
  Bucket: string;
  CreateBucketConfiguration?: CreateBucketConfiguration;
  GrantFullControl?: string;
  GrantRead?: string;
  GrantReadACP?: string;
  GrantWrite?: string;
  GrantWriteACP?: string;
  ObjectLockEnabledForBucket?: boolean;
  OutpostId?: string;
}
export const CreateBucketRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ACL: S.optional(BucketCannedACL).pipe(T.HttpHeader("x-amz-acl")),
    Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
    CreateBucketConfiguration: S.optional(CreateBucketConfiguration)
      .pipe(T.HttpPayload(), T.XmlName("CreateBucketConfiguration"))
      .annotate({ identifier: "CreateBucketConfiguration" }),
    GrantFullControl: S.optional(S.String).pipe(
      T.HttpHeader("x-amz-grant-full-control"),
    ),
    GrantRead: S.optional(S.String).pipe(T.HttpHeader("x-amz-grant-read")),
    GrantReadACP: S.optional(S.String).pipe(
      T.HttpHeader("x-amz-grant-read-acp"),
    ),
    GrantWrite: S.optional(S.String).pipe(T.HttpHeader("x-amz-grant-write")),
    GrantWriteACP: S.optional(S.String).pipe(
      T.HttpHeader("x-amz-grant-write-acp"),
    ),
    ObjectLockEnabledForBucket: S.optional(S.Boolean).pipe(
      T.HttpHeader("x-amz-bucket-object-lock-enabled"),
    ),
    OutpostId: S.optional(S.String).pipe(
      T.HttpHeader("x-amz-outpost-id"),
      T.ContextParam("OutpostId"),
    ),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "PUT", uri: "/v20180820/bucket/{Bucket}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateBucketRequest",
}) as any as S.Schema<CreateBucketRequest>;
export type Location = string;
export type S3RegionalBucketArn = string;
export interface CreateBucketResult {
  Location?: string;
  BucketArn?: string;
}
export const CreateBucketResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Location: S.optional(S.String).pipe(T.HttpHeader("Location")),
    BucketArn: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "CreateBucketResult",
}) as any as S.Schema<CreateBucketResult>;
export type ConfirmationRequired = boolean;
export type MaxLength1024String = string;
export type UserArguments = { [key: string]: string | undefined };
export const UserArguments = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface LambdaInvokeOperation {
  FunctionArn?: string;
  InvocationSchemaVersion?: string;
  UserArguments?: { [key: string]: string | undefined };
}
export const LambdaInvokeOperation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FunctionArn: S.optional(S.String),
    InvocationSchemaVersion: S.optional(S.String),
    UserArguments: S.optional(UserArguments),
  }),
).annotate({
  identifier: "LambdaInvokeOperation",
}) as any as S.Schema<LambdaInvokeOperation>;
export type S3RegionalOrS3ExpressBucketArnString = string;
export type S3CannedAccessControlList =
  | "private"
  | "public-read"
  | "public-read-write"
  | "aws-exec-read"
  | "authenticated-read"
  | "bucket-owner-read"
  | "bucket-owner-full-control"
  | (string & {});
export const S3CannedAccessControlList = S.String;

export type S3GranteeTypeIdentifier =
  | "id"
  | "emailAddress"
  | "uri"
  | (string & {});
export const S3GranteeTypeIdentifier = S.String;

export type NonEmptyMaxLength1024String = string;
export interface S3Grantee {
  TypeIdentifier?: S3GranteeTypeIdentifier;
  Identifier?: string;
  DisplayName?: string;
}
export const S3Grantee = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TypeIdentifier: S.optional(S3GranteeTypeIdentifier),
    Identifier: S.optional(S.String),
    DisplayName: S.optional(S.String),
  }),
).annotate({ identifier: "S3Grantee" }) as any as S.Schema<S3Grantee>;
export type S3Permission =
  | "FULL_CONTROL"
  | "READ"
  | "WRITE"
  | "READ_ACP"
  | "WRITE_ACP"
  | (string & {});
export const S3Permission = S.String;

export interface S3Grant {
  Grantee?: S3Grantee;
  Permission?: S3Permission;
}
export const S3Grant = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Grantee: S.optional(S3Grantee),
    Permission: S.optional(S3Permission),
  }),
).annotate({ identifier: "S3Grant" }) as any as S.Schema<S3Grant>;
export type S3GrantList = S3Grant[];
export const S3GrantList = /*@__PURE__*/ S.Array(S3Grant);
export type S3MetadataDirective = "COPY" | "REPLACE" | (string & {});
export const S3MetadataDirective = S.String;

export type S3UserMetadata = { [key: string]: string | undefined };
export const S3UserMetadata = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type S3ContentLength = number;
export type S3SSEAlgorithm = "AES256" | "KMS" | (string & {});
export const S3SSEAlgorithm = S.String;

export interface S3ObjectMetadata {
  CacheControl?: string;
  ContentDisposition?: string;
  ContentEncoding?: string;
  ContentLanguage?: string;
  UserMetadata?: { [key: string]: string | undefined };
  ContentLength?: number;
  ContentMD5?: string;
  ContentType?: string;
  HttpExpiresDate?: Date;
  RequesterCharged?: boolean;
  SSEAlgorithm?: S3SSEAlgorithm;
}
export const S3ObjectMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CacheControl: S.optional(S.String),
    ContentDisposition: S.optional(S.String),
    ContentEncoding: S.optional(S.String),
    ContentLanguage: S.optional(S.String),
    UserMetadata: S.optional(S3UserMetadata),
    ContentLength: S.optional(S.Number),
    ContentMD5: S.optional(S.String),
    ContentType: S.optional(S.String),
    HttpExpiresDate: S.optional(T.DateFromString),
    RequesterCharged: S.optional(S.Boolean),
    SSEAlgorithm: S.optional(S3SSEAlgorithm),
  }),
).annotate({
  identifier: "S3ObjectMetadata",
}) as any as S.Schema<S3ObjectMetadata>;
export interface S3Tag {
  Key: string;
  Value: string;
}
export const S3Tag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.String, Value: S.String }),
).annotate({ identifier: "S3Tag" }) as any as S.Schema<S3Tag>;
export type S3TagSet = S3Tag[];
export const S3TagSet = /*@__PURE__*/ S.Array(S3Tag);
export type NonEmptyMaxLength2048String = string;
export type S3StorageClass =
  | "STANDARD"
  | "STANDARD_IA"
  | "ONEZONE_IA"
  | "GLACIER"
  | "INTELLIGENT_TIERING"
  | "DEEP_ARCHIVE"
  | "GLACIER_IR"
  | (string & {});
export const S3StorageClass = S.String;

export type KmsKeyArnString = string;
export type S3ObjectLockLegalHoldStatus = "OFF" | "ON" | (string & {});
export const S3ObjectLockLegalHoldStatus = S.String;

export type S3ObjectLockMode = "COMPLIANCE" | "GOVERNANCE" | (string & {});
export const S3ObjectLockMode = S.String;

export type S3ChecksumAlgorithm =
  | "CRC32"
  | "CRC32C"
  | "SHA1"
  | "SHA256"
  | "CRC64NVME"
  | "SHA512"
  | "MD5"
  | "XXHASH64"
  | "XXHASH3"
  | "XXHASH128"
  | (string & {});
export const S3ChecksumAlgorithm = S.String;

export interface S3CopyObjectOperation {
  TargetResource?: string;
  CannedAccessControlList?: S3CannedAccessControlList;
  AccessControlGrants?: S3Grant[];
  MetadataDirective?: S3MetadataDirective;
  ModifiedSinceConstraint?: Date;
  NewObjectMetadata?: S3ObjectMetadata;
  NewObjectTagging?: S3Tag[];
  RedirectLocation?: string;
  RequesterPays?: boolean;
  StorageClass?: S3StorageClass;
  UnModifiedSinceConstraint?: Date;
  SSEAwsKmsKeyId?: string;
  TargetKeyPrefix?: string;
  ObjectLockLegalHoldStatus?: S3ObjectLockLegalHoldStatus;
  ObjectLockMode?: S3ObjectLockMode;
  ObjectLockRetainUntilDate?: Date;
  BucketKeyEnabled?: boolean;
  ChecksumAlgorithm?: S3ChecksumAlgorithm;
}
export const S3CopyObjectOperation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TargetResource: S.optional(S.String),
    CannedAccessControlList: S.optional(S3CannedAccessControlList),
    AccessControlGrants: S.optional(S3GrantList),
    MetadataDirective: S.optional(S3MetadataDirective),
    ModifiedSinceConstraint: S.optional(T.DateFromString),
    NewObjectMetadata: S.optional(S3ObjectMetadata),
    NewObjectTagging: S.optional(S3TagSet),
    RedirectLocation: S.optional(S.String),
    RequesterPays: S.optional(S.Boolean),
    StorageClass: S.optional(S3StorageClass),
    UnModifiedSinceConstraint: S.optional(T.DateFromString),
    SSEAwsKmsKeyId: S.optional(S.String),
    TargetKeyPrefix: S.optional(S.String),
    ObjectLockLegalHoldStatus: S.optional(S3ObjectLockLegalHoldStatus),
    ObjectLockMode: S.optional(S3ObjectLockMode),
    ObjectLockRetainUntilDate: S.optional(T.DateFromString),
    BucketKeyEnabled: S.optional(S.Boolean),
    ChecksumAlgorithm: S.optional(S3ChecksumAlgorithm),
  }),
).annotate({
  identifier: "S3CopyObjectOperation",
}) as any as S.Schema<S3CopyObjectOperation>;
export interface S3ObjectOwner {
  ID?: string;
  DisplayName?: string;
}
export const S3ObjectOwner = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ID: S.optional(S.String), DisplayName: S.optional(S.String) }),
).annotate({ identifier: "S3ObjectOwner" }) as any as S.Schema<S3ObjectOwner>;
export interface S3AccessControlList {
  Owner: S3ObjectOwner;
  Grants?: S3Grant[];
}
export const S3AccessControlList = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Owner: S3ObjectOwner, Grants: S.optional(S3GrantList) }),
).annotate({
  identifier: "S3AccessControlList",
}) as any as S.Schema<S3AccessControlList>;
export interface S3AccessControlPolicy {
  AccessControlList?: S3AccessControlList;
  CannedAccessControlList?: S3CannedAccessControlList;
}
export const S3AccessControlPolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccessControlList: S.optional(S3AccessControlList),
    CannedAccessControlList: S.optional(S3CannedAccessControlList),
  }),
).annotate({
  identifier: "S3AccessControlPolicy",
}) as any as S.Schema<S3AccessControlPolicy>;
export interface S3SetObjectAclOperation {
  AccessControlPolicy?: S3AccessControlPolicy;
}
export const S3SetObjectAclOperation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AccessControlPolicy: S.optional(S3AccessControlPolicy) }),
).annotate({
  identifier: "S3SetObjectAclOperation",
}) as any as S.Schema<S3SetObjectAclOperation>;
export interface S3SetObjectTaggingOperation {
  TagSet?: S3Tag[];
}
export const S3SetObjectTaggingOperation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TagSet: S.optional(S3TagSet) }),
).annotate({
  identifier: "S3SetObjectTaggingOperation",
}) as any as S.Schema<S3SetObjectTaggingOperation>;
export interface S3DeleteObjectTaggingOperation {}
export const S3DeleteObjectTaggingOperation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "S3DeleteObjectTaggingOperation",
}) as any as S.Schema<S3DeleteObjectTaggingOperation>;
export type S3ExpirationInDays = number;
export type S3GlacierJobTier = "BULK" | "STANDARD" | (string & {});
export const S3GlacierJobTier = S.String;

export interface S3InitiateRestoreObjectOperation {
  ExpirationInDays?: number;
  GlacierJobTier?: S3GlacierJobTier;
}
export const S3InitiateRestoreObjectOperation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ExpirationInDays: S.optional(S.Number),
    GlacierJobTier: S.optional(S3GlacierJobTier),
  }),
).annotate({
  identifier: "S3InitiateRestoreObjectOperation",
}) as any as S.Schema<S3InitiateRestoreObjectOperation>;
export interface S3ObjectLockLegalHold {
  Status: S3ObjectLockLegalHoldStatus;
}
export const S3ObjectLockLegalHold = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Status: S3ObjectLockLegalHoldStatus }),
).annotate({
  identifier: "S3ObjectLockLegalHold",
}) as any as S.Schema<S3ObjectLockLegalHold>;
export interface S3SetObjectLegalHoldOperation {
  LegalHold: S3ObjectLockLegalHold;
}
export const S3SetObjectLegalHoldOperation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LegalHold: S3ObjectLockLegalHold }),
).annotate({
  identifier: "S3SetObjectLegalHoldOperation",
}) as any as S.Schema<S3SetObjectLegalHoldOperation>;
export type S3ObjectLockRetentionMode =
  | "COMPLIANCE"
  | "GOVERNANCE"
  | (string & {});
export const S3ObjectLockRetentionMode = S.String;

export interface S3Retention {
  RetainUntilDate?: Date;
  Mode?: S3ObjectLockRetentionMode;
}
export const S3Retention = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RetainUntilDate: S.optional(T.DateFromString),
    Mode: S.optional(S3ObjectLockRetentionMode),
  }),
).annotate({ identifier: "S3Retention" }) as any as S.Schema<S3Retention>;
export interface S3SetObjectRetentionOperation {
  BypassGovernanceRetention?: boolean;
  Retention: S3Retention;
}
export const S3SetObjectRetentionOperation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BypassGovernanceRetention: S.optional(S.Boolean),
    Retention: S3Retention,
  }),
).annotate({
  identifier: "S3SetObjectRetentionOperation",
}) as any as S.Schema<S3SetObjectRetentionOperation>;
export interface S3ReplicateObjectOperation {}
export const S3ReplicateObjectOperation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "S3ReplicateObjectOperation",
}) as any as S.Schema<S3ReplicateObjectOperation>;
export type ComputeObjectChecksumAlgorithm =
  | "CRC32"
  | "CRC32C"
  | "CRC64NVME"
  | "MD5"
  | "SHA1"
  | "SHA256"
  | "SHA512"
  | "XXHASH64"
  | "XXHASH3"
  | "XXHASH128"
  | (string & {});
export const ComputeObjectChecksumAlgorithm = S.String;

export type ComputeObjectChecksumType =
  | "FULL_OBJECT"
  | "COMPOSITE"
  | (string & {});
export const ComputeObjectChecksumType = S.String;

export interface S3ComputeObjectChecksumOperation {
  ChecksumAlgorithm?: ComputeObjectChecksumAlgorithm;
  ChecksumType?: ComputeObjectChecksumType;
}
export const S3ComputeObjectChecksumOperation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChecksumAlgorithm: S.optional(ComputeObjectChecksumAlgorithm),
    ChecksumType: S.optional(ComputeObjectChecksumType),
  }),
).annotate({
  identifier: "S3ComputeObjectChecksumOperation",
}) as any as S.Schema<S3ComputeObjectChecksumOperation>;
export type NonEmptyKmsKeyArnString = string;
export interface S3UpdateObjectEncryptionSSEKMS {
  KMSKeyArn: string;
  BucketKeyEnabled?: boolean;
}
export const S3UpdateObjectEncryptionSSEKMS = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    KMSKeyArn: S.String,
    BucketKeyEnabled: S.optional(S.Boolean),
  }).pipe(T.XmlName("SSE-KMS")),
).annotate({
  identifier: "S3UpdateObjectEncryptionSSEKMS",
}) as any as S.Schema<S3UpdateObjectEncryptionSSEKMS>;
export interface ObjectEncryption {
  SSEKMS?: S3UpdateObjectEncryptionSSEKMS;
}
export const ObjectEncryption = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SSEKMS: S.optional(S3UpdateObjectEncryptionSSEKMS)
      .pipe(T.XmlName("SSE-KMS"))
      .annotate({ identifier: "S3UpdateObjectEncryptionSSEKMS" }),
  }),
).annotate({
  identifier: "ObjectEncryption",
}) as any as S.Schema<ObjectEncryption>;
export interface S3UpdateObjectEncryptionOperation {
  ObjectEncryption?: ObjectEncryption;
}
export const S3UpdateObjectEncryptionOperation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ObjectEncryption: S.optional(ObjectEncryption) }),
).annotate({
  identifier: "S3UpdateObjectEncryptionOperation",
}) as any as S.Schema<S3UpdateObjectEncryptionOperation>;
export interface JobOperation {
  LambdaInvoke?: LambdaInvokeOperation;
  S3PutObjectCopy?: S3CopyObjectOperation;
  S3PutObjectAcl?: S3SetObjectAclOperation;
  S3PutObjectTagging?: S3SetObjectTaggingOperation;
  S3DeleteObjectTagging?: S3DeleteObjectTaggingOperation;
  S3InitiateRestoreObject?: S3InitiateRestoreObjectOperation;
  S3PutObjectLegalHold?: S3SetObjectLegalHoldOperation;
  S3PutObjectRetention?: S3SetObjectRetentionOperation;
  S3ReplicateObject?: S3ReplicateObjectOperation;
  S3ComputeObjectChecksum?: S3ComputeObjectChecksumOperation;
  S3UpdateObjectEncryption?: S3UpdateObjectEncryptionOperation;
}
export const JobOperation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LambdaInvoke: S.optional(LambdaInvokeOperation),
    S3PutObjectCopy: S.optional(S3CopyObjectOperation),
    S3PutObjectAcl: S.optional(S3SetObjectAclOperation),
    S3PutObjectTagging: S.optional(S3SetObjectTaggingOperation),
    S3DeleteObjectTagging: S.optional(S3DeleteObjectTaggingOperation),
    S3InitiateRestoreObject: S.optional(S3InitiateRestoreObjectOperation),
    S3PutObjectLegalHold: S.optional(S3SetObjectLegalHoldOperation),
    S3PutObjectRetention: S.optional(S3SetObjectRetentionOperation),
    S3ReplicateObject: S.optional(S3ReplicateObjectOperation),
    S3ComputeObjectChecksum: S.optional(S3ComputeObjectChecksumOperation),
    S3UpdateObjectEncryption: S.optional(S3UpdateObjectEncryptionOperation),
  }),
).annotate({ identifier: "JobOperation" }) as any as S.Schema<JobOperation>;
export type S3BucketArnString = string;
export type JobReportFormat = "Report_CSV_20180820" | (string & {});
export const JobReportFormat = S.String;

export type ReportPrefixString = string;
export type JobReportScope = "AllTasks" | "FailedTasksOnly" | (string & {});
export const JobReportScope = S.String;

export interface JobReport {
  Bucket?: string;
  Format?: JobReportFormat;
  Enabled: boolean;
  Prefix?: string;
  ReportScope?: JobReportScope;
  ExpectedBucketOwner?: string;
}
export const JobReport = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Bucket: S.optional(S.String),
    Format: S.optional(JobReportFormat),
    Enabled: S.Boolean,
    Prefix: S.optional(S.String),
    ReportScope: S.optional(JobReportScope),
    ExpectedBucketOwner: S.optional(S.String),
  }),
).annotate({ identifier: "JobReport" }) as any as S.Schema<JobReport>;
export type JobManifestFormat =
  | "S3BatchOperations_CSV_20180820"
  | "S3InventoryReport_CSV_20161130"
  | (string & {});
export const JobManifestFormat = S.String;

export type JobManifestFieldName =
  | "Ignore"
  | "Bucket"
  | "Key"
  | "VersionId"
  | (string & {});
export const JobManifestFieldName = S.String;

export type JobManifestFieldList = JobManifestFieldName[];
export const JobManifestFieldList = /*@__PURE__*/ S.Array(JobManifestFieldName);
export interface JobManifestSpec {
  Format: JobManifestFormat;
  Fields?: JobManifestFieldName[];
}
export const JobManifestSpec = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Format: JobManifestFormat,
    Fields: S.optional(JobManifestFieldList),
  }),
).annotate({
  identifier: "JobManifestSpec",
}) as any as S.Schema<JobManifestSpec>;
export type S3KeyArnString = string;
export type S3ObjectVersionId = string;
export interface JobManifestLocation {
  ObjectArn: string;
  ObjectVersionId?: string;
  ETag: string;
}
export const JobManifestLocation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ObjectArn: S.String,
    ObjectVersionId: S.optional(S.String),
    ETag: S.String,
  }),
).annotate({
  identifier: "JobManifestLocation",
}) as any as S.Schema<JobManifestLocation>;
export interface JobManifest {
  Spec: JobManifestSpec;
  Location: JobManifestLocation;
}
export const JobManifest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Spec: JobManifestSpec, Location: JobManifestLocation }),
).annotate({ identifier: "JobManifest" }) as any as S.Schema<JobManifest>;
export type NonEmptyMaxLength256String = string;
export type JobPriority = number;
export type ManifestPrefixString = string;
export interface SSES3Encryption {}
export const SSES3Encryption = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(T.XmlName("SSE-S3")),
).annotate({
  identifier: "SSES3Encryption",
}) as any as S.Schema<SSES3Encryption>;
export interface SSEKMSEncryption {
  KeyId: string;
}
export const SSEKMSEncryption = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ KeyId: S.String }).pipe(T.XmlName("SSE-KMS")),
).annotate({
  identifier: "SSEKMSEncryption",
}) as any as S.Schema<SSEKMSEncryption>;
export interface GeneratedManifestEncryption {
  SSES3?: SSES3Encryption;
  SSEKMS?: SSEKMSEncryption;
}
export const GeneratedManifestEncryption = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SSES3: S.optional(SSES3Encryption)
      .pipe(T.XmlName("SSE-S3"))
      .annotate({ identifier: "SSES3Encryption" }),
    SSEKMS: S.optional(SSEKMSEncryption)
      .pipe(T.XmlName("SSE-KMS"))
      .annotate({ identifier: "SSEKMSEncryption" }),
  }),
).annotate({
  identifier: "GeneratedManifestEncryption",
}) as any as S.Schema<GeneratedManifestEncryption>;
export type GeneratedManifestFormat =
  | "S3InventoryReport_CSV_20211130"
  | (string & {});
export const GeneratedManifestFormat = S.String;

export interface S3ManifestOutputLocation {
  ExpectedManifestBucketOwner?: string;
  Bucket: string;
  ManifestPrefix?: string;
  ManifestEncryption?: GeneratedManifestEncryption;
  ManifestFormat: GeneratedManifestFormat;
}
export const S3ManifestOutputLocation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ExpectedManifestBucketOwner: S.optional(S.String),
    Bucket: S.String,
    ManifestPrefix: S.optional(S.String),
    ManifestEncryption: S.optional(GeneratedManifestEncryption),
    ManifestFormat: GeneratedManifestFormat,
  }),
).annotate({
  identifier: "S3ManifestOutputLocation",
}) as any as S.Schema<S3ManifestOutputLocation>;
export type ObjectCreationTime = Date;
export type ReplicationStatus =
  | "COMPLETED"
  | "FAILED"
  | "REPLICA"
  | "NONE"
  | (string & {});
export const ReplicationStatus = S.String;

export type ReplicationStatusFilterList = ReplicationStatus[];
export const ReplicationStatusFilterList =
  /*@__PURE__*/ S.Array(ReplicationStatus);
export type NonEmptyMaxLength1024StringList = string[];
export const NonEmptyMaxLength1024StringList = /*@__PURE__*/ S.Array(S.String);
export interface KeyNameConstraint {
  MatchAnyPrefix?: string[];
  MatchAnySuffix?: string[];
  MatchAnySubstring?: string[];
}
export const KeyNameConstraint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MatchAnyPrefix: S.optional(NonEmptyMaxLength1024StringList),
    MatchAnySuffix: S.optional(NonEmptyMaxLength1024StringList),
    MatchAnySubstring: S.optional(NonEmptyMaxLength1024StringList),
  }),
).annotate({
  identifier: "KeyNameConstraint",
}) as any as S.Schema<KeyNameConstraint>;
export type ObjectSizeGreaterThanBytes = number;
export type ObjectSizeLessThanBytes = number;
export type StorageClassList = S3StorageClass[];
export const StorageClassList = /*@__PURE__*/ S.Array(S3StorageClass);
export interface SSES3Filter {}
export const SSES3Filter = /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate(
  { identifier: "SSES3Filter" },
) as any as S.Schema<SSES3Filter>;
export interface SSEKMSFilter {
  KmsKeyArn?: string;
  BucketKeyEnabled?: boolean;
}
export const SSEKMSFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    KmsKeyArn: S.optional(S.String),
    BucketKeyEnabled: S.optional(S.Boolean),
  }),
).annotate({ identifier: "SSEKMSFilter" }) as any as S.Schema<SSEKMSFilter>;
export interface DSSEKMSFilter {
  KmsKeyArn?: string;
}
export const DSSEKMSFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ KmsKeyArn: S.optional(S.String) }),
).annotate({ identifier: "DSSEKMSFilter" }) as any as S.Schema<DSSEKMSFilter>;
export interface SSECFilter {}
export const SSECFilter = /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
  identifier: "SSECFilter",
}) as any as S.Schema<SSECFilter>;
export interface NotSSEFilter {}
export const NotSSEFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({ identifier: "NotSSEFilter" }) as any as S.Schema<NotSSEFilter>;
export type ObjectEncryptionFilter =
  | {
      SSES3: SSES3Filter;
      SSEKMS?: never;
      DSSEKMS?: never;
      SSEC?: never;
      NOTSSE?: never;
    }
  | {
      SSES3?: never;
      SSEKMS: SSEKMSFilter;
      DSSEKMS?: never;
      SSEC?: never;
      NOTSSE?: never;
    }
  | {
      SSES3?: never;
      SSEKMS?: never;
      DSSEKMS: DSSEKMSFilter;
      SSEC?: never;
      NOTSSE?: never;
    }
  | {
      SSES3?: never;
      SSEKMS?: never;
      DSSEKMS?: never;
      SSEC: SSECFilter;
      NOTSSE?: never;
    }
  | {
      SSES3?: never;
      SSEKMS?: never;
      DSSEKMS?: never;
      SSEC?: never;
      NOTSSE: NotSSEFilter;
    };
export const ObjectEncryptionFilter = /*@__PURE__*/ S.Union([
  S.Struct({
    SSES3: SSES3Filter.pipe(T.XmlName("SSE-S3")).annotate({
      identifier: "SSES3Filter",
    }),
  }),
  S.Struct({
    SSEKMS: SSEKMSFilter.pipe(T.XmlName("SSE-KMS")).annotate({
      identifier: "SSEKMSFilter",
    }),
  }),
  S.Struct({
    DSSEKMS: DSSEKMSFilter.pipe(T.XmlName("DSSE-KMS")).annotate({
      identifier: "DSSEKMSFilter",
    }),
  }),
  S.Struct({
    SSEC: SSECFilter.pipe(T.XmlName("SSE-C")).annotate({
      identifier: "SSECFilter",
    }),
  }),
  S.Struct({
    NOTSSE: NotSSEFilter.pipe(T.XmlName("NOT-SSE")).annotate({
      identifier: "NotSSEFilter",
    }),
  }),
]);
export type ObjectEncryptionFilterList = ObjectEncryptionFilter[];
export const ObjectEncryptionFilterList = /*@__PURE__*/ S.Array(
  ObjectEncryptionFilter.pipe(T.XmlName("ObjectEncryption")),
);
export interface JobManifestGeneratorFilter {
  EligibleForReplication?: boolean;
  CreatedAfter?: Date;
  CreatedBefore?: Date;
  ObjectReplicationStatuses?: ReplicationStatus[];
  KeyNameConstraint?: KeyNameConstraint;
  ObjectSizeGreaterThanBytes?: number;
  ObjectSizeLessThanBytes?: number;
  MatchAnyStorageClass?: S3StorageClass[];
  MatchAnyObjectEncryption?: ObjectEncryptionFilter[];
}
export const JobManifestGeneratorFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EligibleForReplication: S.optional(S.Boolean),
    CreatedAfter: S.optional(T.DateFromString),
    CreatedBefore: S.optional(T.DateFromString),
    ObjectReplicationStatuses: S.optional(ReplicationStatusFilterList),
    KeyNameConstraint: S.optional(KeyNameConstraint),
    ObjectSizeGreaterThanBytes: S.optional(S.Number),
    ObjectSizeLessThanBytes: S.optional(S.Number),
    MatchAnyStorageClass: S.optional(StorageClassList),
    MatchAnyObjectEncryption: S.optional(ObjectEncryptionFilterList),
  }),
).annotate({
  identifier: "JobManifestGeneratorFilter",
}) as any as S.Schema<JobManifestGeneratorFilter>;
export interface S3JobManifestGenerator {
  ExpectedBucketOwner?: string;
  SourceBucket: string;
  ManifestOutputLocation?: S3ManifestOutputLocation;
  Filter?: JobManifestGeneratorFilter;
  EnableManifestOutput: boolean;
}
export const S3JobManifestGenerator = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ExpectedBucketOwner: S.optional(S.String),
    SourceBucket: S.String,
    ManifestOutputLocation: S.optional(S3ManifestOutputLocation),
    Filter: S.optional(JobManifestGeneratorFilter),
    EnableManifestOutput: S.Boolean,
  }),
).annotate({
  identifier: "S3JobManifestGenerator",
}) as any as S.Schema<S3JobManifestGenerator>;
export type JobManifestGenerator = {
  S3JobManifestGenerator: S3JobManifestGenerator;
};
export const JobManifestGenerator = /*@__PURE__*/ S.Union([
  S.Struct({ S3JobManifestGenerator: S3JobManifestGenerator }),
]);
export interface CreateJobRequest {
  AccountId: string;
  ConfirmationRequired?: boolean;
  Operation: JobOperation;
  Report: JobReport;
  ClientRequestToken: string;
  Manifest?: JobManifest;
  Description?: string;
  Priority: number;
  RoleArn: string;
  Tags?: S3Tag[];
  ManifestGenerator?: JobManifestGenerator;
}
export const CreateJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(
      T.HttpHeader("x-amz-account-id"),
      T.ContextParam("AccountId"),
      T.HostLabel(),
    ),
    ConfirmationRequired: S.optional(S.Boolean),
    Operation: JobOperation,
    Report: JobReport,
    ClientRequestToken: S.String.pipe(T.IdempotencyToken()),
    Manifest: S.optional(JobManifest),
    Description: S.optional(S.String),
    Priority: S.Number,
    RoleArn: S.String,
    Tags: S.optional(S3TagSet),
    ManifestGenerator: S.optional(JobManifestGenerator),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v20180820/jobs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ RequiresAccountId: { value: true } }),
    ),
  ),
).annotate({
  identifier: "CreateJobRequest",
}) as any as S.Schema<CreateJobRequest>;
export type JobId = string;
export interface CreateJobResult {
  JobId?: string;
}
export const CreateJobResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ JobId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "CreateJobResult",
}) as any as S.Schema<CreateJobResult>;
export type MultiRegionAccessPointClientToken = string;
export type MultiRegionAccessPointName = string;
export interface Region {
  Bucket: string;
  BucketAccountId?: string;
}
export const Region = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Bucket: S.String, BucketAccountId: S.optional(S.String) }),
).annotate({ identifier: "Region" }) as any as S.Schema<Region>;
export type RegionCreationList = Region[];
export const RegionCreationList = /*@__PURE__*/ S.Array(
  Region.pipe(T.XmlName("Region")).annotate({ identifier: "Region" }),
);
export interface CreateMultiRegionAccessPointInput {
  Name: string;
  PublicAccessBlock?: PublicAccessBlockConfiguration;
  Regions: Region[];
}
export const CreateMultiRegionAccessPointInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    PublicAccessBlock: S.optional(PublicAccessBlockConfiguration),
    Regions: RegionCreationList,
  }),
).annotate({
  identifier: "CreateMultiRegionAccessPointInput",
}) as any as S.Schema<CreateMultiRegionAccessPointInput>;
export interface CreateMultiRegionAccessPointRequest {
  AccountId: string;
  ClientToken: string;
  Details: CreateMultiRegionAccessPointInput;
}
export const CreateMultiRegionAccessPointRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(
      T.HttpHeader("x-amz-account-id"),
      T.ContextParam("AccountId"),
      T.HostLabel(),
    ),
    ClientToken: S.String.pipe(T.IdempotencyToken()),
    Details: CreateMultiRegionAccessPointInput,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v20180820/async-requests/mrap/create" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ RequiresAccountId: { value: true } }),
    ),
  ),
).annotate({
  identifier: "CreateMultiRegionAccessPointRequest",
}) as any as S.Schema<CreateMultiRegionAccessPointRequest>;
export type AsyncRequestTokenARN = string;
export interface CreateMultiRegionAccessPointResult {
  RequestTokenARN?: string;
}
export const CreateMultiRegionAccessPointResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RequestTokenARN: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "CreateMultiRegionAccessPointResult",
}) as any as S.Schema<CreateMultiRegionAccessPointResult>;
export type StorageLensGroupName = string;
export type MatchAnyPrefix = string[];
export const MatchAnyPrefix = /*@__PURE__*/ S.Array(
  S.String.pipe(T.XmlName("Prefix")),
);
export type Suffix = string;
export type MatchAnySuffix = string[];
export const MatchAnySuffix = /*@__PURE__*/ S.Array(
  S.String.pipe(T.XmlName("Suffix")),
);
export type MatchAnyTag = S3Tag[];
export const MatchAnyTag = /*@__PURE__*/ S.Array(
  S3Tag.pipe(T.XmlName("Tag")).annotate({ identifier: "S3Tag" }),
);
export type ObjectAgeValue = number;
export interface MatchObjectAge {
  DaysGreaterThan?: number;
  DaysLessThan?: number;
}
export const MatchObjectAge = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DaysGreaterThan: S.optional(S.Number),
    DaysLessThan: S.optional(S.Number),
  }),
).annotate({ identifier: "MatchObjectAge" }) as any as S.Schema<MatchObjectAge>;
export type ObjectSizeValue = number;
export interface MatchObjectSize {
  BytesGreaterThan?: number;
  BytesLessThan?: number;
}
export const MatchObjectSize = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BytesGreaterThan: S.optional(S.Number),
    BytesLessThan: S.optional(S.Number),
  }),
).annotate({
  identifier: "MatchObjectSize",
}) as any as S.Schema<MatchObjectSize>;
export interface StorageLensGroupAndOperator {
  MatchAnyPrefix?: string[];
  MatchAnySuffix?: string[];
  MatchAnyTag?: S3Tag[];
  MatchObjectAge?: MatchObjectAge;
  MatchObjectSize?: MatchObjectSize;
}
export const StorageLensGroupAndOperator = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MatchAnyPrefix: S.optional(MatchAnyPrefix),
    MatchAnySuffix: S.optional(MatchAnySuffix),
    MatchAnyTag: S.optional(MatchAnyTag),
    MatchObjectAge: S.optional(MatchObjectAge),
    MatchObjectSize: S.optional(MatchObjectSize),
  }),
).annotate({
  identifier: "StorageLensGroupAndOperator",
}) as any as S.Schema<StorageLensGroupAndOperator>;
export interface StorageLensGroupOrOperator {
  MatchAnyPrefix?: string[];
  MatchAnySuffix?: string[];
  MatchAnyTag?: S3Tag[];
  MatchObjectAge?: MatchObjectAge;
  MatchObjectSize?: MatchObjectSize;
}
export const StorageLensGroupOrOperator = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MatchAnyPrefix: S.optional(MatchAnyPrefix),
    MatchAnySuffix: S.optional(MatchAnySuffix),
    MatchAnyTag: S.optional(MatchAnyTag),
    MatchObjectAge: S.optional(MatchObjectAge),
    MatchObjectSize: S.optional(MatchObjectSize),
  }),
).annotate({
  identifier: "StorageLensGroupOrOperator",
}) as any as S.Schema<StorageLensGroupOrOperator>;
export interface StorageLensGroupFilter {
  MatchAnyPrefix?: string[];
  MatchAnySuffix?: string[];
  MatchAnyTag?: S3Tag[];
  MatchObjectAge?: MatchObjectAge;
  MatchObjectSize?: MatchObjectSize;
  And?: StorageLensGroupAndOperator;
  Or?: StorageLensGroupOrOperator;
}
export const StorageLensGroupFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MatchAnyPrefix: S.optional(MatchAnyPrefix),
    MatchAnySuffix: S.optional(MatchAnySuffix),
    MatchAnyTag: S.optional(MatchAnyTag),
    MatchObjectAge: S.optional(MatchObjectAge),
    MatchObjectSize: S.optional(MatchObjectSize),
    And: S.optional(StorageLensGroupAndOperator),
    Or: S.optional(StorageLensGroupOrOperator),
  }),
).annotate({
  identifier: "StorageLensGroupFilter",
}) as any as S.Schema<StorageLensGroupFilter>;
export type StorageLensGroupArn = string;
export interface StorageLensGroup {
  Name: string;
  Filter: StorageLensGroupFilter;
  StorageLensGroupArn?: string;
}
export const StorageLensGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Filter: StorageLensGroupFilter,
    StorageLensGroupArn: S.optional(S.String),
  }),
).annotate({
  identifier: "StorageLensGroup",
}) as any as S.Schema<StorageLensGroup>;
export interface CreateStorageLensGroupRequest {
  AccountId: string;
  StorageLensGroup: StorageLensGroup;
  Tags?: Tag[];
}
export const CreateStorageLensGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(
      T.HttpHeader("x-amz-account-id"),
      T.ContextParam("AccountId"),
      T.HostLabel(),
    ),
    StorageLensGroup: StorageLensGroup,
    Tags: S.optional(TagList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v20180820/storagelensgroup" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ RequiresAccountId: { value: true } }),
    ),
  ),
).annotate({
  identifier: "CreateStorageLensGroupRequest",
}) as any as S.Schema<CreateStorageLensGroupRequest>;
export interface CreateStorageLensGroupResponse {}
export const CreateStorageLensGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "CreateStorageLensGroupResponse",
}) as any as S.Schema<CreateStorageLensGroupResponse>;
export interface DeleteAccessGrantRequest {
  AccountId: string;
  AccessGrantId: string;
}
export const DeleteAccessGrantRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(
      T.HttpHeader("x-amz-account-id"),
      T.ContextParam("AccountId"),
      T.HostLabel(),
    ),
    AccessGrantId: S.String.pipe(T.HttpLabel("AccessGrantId")),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "DELETE",
        uri: "/v20180820/accessgrantsinstance/grant/{AccessGrantId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ RequiresAccountId: { value: true } }),
    ),
  ),
).annotate({
  identifier: "DeleteAccessGrantRequest",
}) as any as S.Schema<DeleteAccessGrantRequest>;
export interface DeleteAccessGrantResponse {}
export const DeleteAccessGrantResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteAccessGrantResponse",
}) as any as S.Schema<DeleteAccessGrantResponse>;
export interface DeleteAccessGrantsInstanceRequest {
  AccountId: string;
}
export const DeleteAccessGrantsInstanceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(
      T.HttpHeader("x-amz-account-id"),
      T.ContextParam("AccountId"),
      T.HostLabel(),
    ),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "DELETE", uri: "/v20180820/accessgrantsinstance" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ RequiresAccountId: { value: true } }),
    ),
  ),
).annotate({
  identifier: "DeleteAccessGrantsInstanceRequest",
}) as any as S.Schema<DeleteAccessGrantsInstanceRequest>;
export interface DeleteAccessGrantsInstanceResponse {}
export const DeleteAccessGrantsInstanceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteAccessGrantsInstanceResponse",
}) as any as S.Schema<DeleteAccessGrantsInstanceResponse>;
export interface DeleteAccessGrantsInstanceResourcePolicyRequest {
  AccountId: string;
}
export const DeleteAccessGrantsInstanceResourcePolicyRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      AccountId: S.String.pipe(
        T.HttpHeader("x-amz-account-id"),
        T.ContextParam("AccountId"),
        T.HostLabel(),
      ),
    }).pipe(
      T.all(
        ns,
        T.Http({
          method: "DELETE",
          uri: "/v20180820/accessgrantsinstance/resourcepolicy",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
        T.StaticContextParams({ RequiresAccountId: { value: true } }),
      ),
    ),
  ).annotate({
    identifier: "DeleteAccessGrantsInstanceResourcePolicyRequest",
  }) as any as S.Schema<DeleteAccessGrantsInstanceResourcePolicyRequest>;
export interface DeleteAccessGrantsInstanceResourcePolicyResponse {}
export const DeleteAccessGrantsInstanceResourcePolicyResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({}).pipe(ns)).annotate({
    identifier: "DeleteAccessGrantsInstanceResourcePolicyResponse",
  }) as any as S.Schema<DeleteAccessGrantsInstanceResourcePolicyResponse>;
export interface DeleteAccessGrantsLocationRequest {
  AccountId: string;
  AccessGrantsLocationId: string;
}
export const DeleteAccessGrantsLocationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(
      T.HttpHeader("x-amz-account-id"),
      T.ContextParam("AccountId"),
      T.HostLabel(),
    ),
    AccessGrantsLocationId: S.String.pipe(
      T.HttpLabel("AccessGrantsLocationId"),
    ),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "DELETE",
        uri: "/v20180820/accessgrantsinstance/location/{AccessGrantsLocationId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ RequiresAccountId: { value: true } }),
    ),
  ),
).annotate({
  identifier: "DeleteAccessGrantsLocationRequest",
}) as any as S.Schema<DeleteAccessGrantsLocationRequest>;
export interface DeleteAccessGrantsLocationResponse {}
export const DeleteAccessGrantsLocationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteAccessGrantsLocationResponse",
}) as any as S.Schema<DeleteAccessGrantsLocationResponse>;
export interface DeleteAccessPointRequest {
  AccountId: string;
  Name: string;
}
export const DeleteAccessPointRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(
      T.HttpHeader("x-amz-account-id"),
      T.ContextParam("AccountId"),
      T.HostLabel(),
    ),
    Name: S.String.pipe(T.HttpLabel("Name"), T.ContextParam("AccessPointName")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "DELETE", uri: "/v20180820/accesspoint/{Name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ RequiresAccountId: { value: true } }),
    ),
  ),
).annotate({
  identifier: "DeleteAccessPointRequest",
}) as any as S.Schema<DeleteAccessPointRequest>;
export interface DeleteAccessPointResponse {}
export const DeleteAccessPointResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteAccessPointResponse",
}) as any as S.Schema<DeleteAccessPointResponse>;
export interface DeleteAccessPointForObjectLambdaRequest {
  AccountId: string;
  Name: string;
}
export const DeleteAccessPointForObjectLambdaRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AccountId: S.String.pipe(
        T.HttpHeader("x-amz-account-id"),
        T.ContextParam("AccountId"),
        T.HostLabel(),
      ),
      Name: S.String.pipe(T.HttpLabel("Name")),
    }).pipe(
      T.all(
        ns,
        T.Http({
          method: "DELETE",
          uri: "/v20180820/accesspointforobjectlambda/{Name}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
        T.StaticContextParams({ RequiresAccountId: { value: true } }),
      ),
    ),
).annotate({
  identifier: "DeleteAccessPointForObjectLambdaRequest",
}) as any as S.Schema<DeleteAccessPointForObjectLambdaRequest>;
export interface DeleteAccessPointForObjectLambdaResponse {}
export const DeleteAccessPointForObjectLambdaResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteAccessPointForObjectLambdaResponse",
}) as any as S.Schema<DeleteAccessPointForObjectLambdaResponse>;
export interface DeleteAccessPointPolicyRequest {
  AccountId: string;
  Name: string;
}
export const DeleteAccessPointPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(
      T.HttpHeader("x-amz-account-id"),
      T.ContextParam("AccountId"),
      T.HostLabel(),
    ),
    Name: S.String.pipe(T.HttpLabel("Name"), T.ContextParam("AccessPointName")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "DELETE", uri: "/v20180820/accesspoint/{Name}/policy" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ RequiresAccountId: { value: true } }),
    ),
  ),
).annotate({
  identifier: "DeleteAccessPointPolicyRequest",
}) as any as S.Schema<DeleteAccessPointPolicyRequest>;
export interface DeleteAccessPointPolicyResponse {}
export const DeleteAccessPointPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteAccessPointPolicyResponse",
}) as any as S.Schema<DeleteAccessPointPolicyResponse>;
export interface DeleteAccessPointPolicyForObjectLambdaRequest {
  AccountId: string;
  Name: string;
}
export const DeleteAccessPointPolicyForObjectLambdaRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      AccountId: S.String.pipe(
        T.HttpHeader("x-amz-account-id"),
        T.ContextParam("AccountId"),
        T.HostLabel(),
      ),
      Name: S.String.pipe(T.HttpLabel("Name")),
    }).pipe(
      T.all(
        ns,
        T.Http({
          method: "DELETE",
          uri: "/v20180820/accesspointforobjectlambda/{Name}/policy",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
        T.StaticContextParams({ RequiresAccountId: { value: true } }),
      ),
    ),
  ).annotate({
    identifier: "DeleteAccessPointPolicyForObjectLambdaRequest",
  }) as any as S.Schema<DeleteAccessPointPolicyForObjectLambdaRequest>;
export interface DeleteAccessPointPolicyForObjectLambdaResponse {}
export const DeleteAccessPointPolicyForObjectLambdaResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({}).pipe(ns)).annotate({
    identifier: "DeleteAccessPointPolicyForObjectLambdaResponse",
  }) as any as S.Schema<DeleteAccessPointPolicyForObjectLambdaResponse>;
export interface DeleteAccessPointScopeRequest {
  AccountId: string;
  Name: string;
}
export const DeleteAccessPointScopeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(
      T.HttpHeader("x-amz-account-id"),
      T.ContextParam("AccountId"),
      T.HostLabel(),
    ),
    Name: S.String.pipe(T.HttpLabel("Name"), T.ContextParam("AccessPointName")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "DELETE", uri: "/v20180820/accesspoint/{Name}/scope" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({
        RequiresAccountId: { value: true },
        UseS3ExpressControlEndpoint: { value: true },
      }),
    ),
  ),
).annotate({
  identifier: "DeleteAccessPointScopeRequest",
}) as any as S.Schema<DeleteAccessPointScopeRequest>;
export interface DeleteAccessPointScopeResponse {}
export const DeleteAccessPointScopeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteAccessPointScopeResponse",
}) as any as S.Schema<DeleteAccessPointScopeResponse>;
export interface DeleteBucketRequest {
  AccountId: string;
  Bucket: string;
}
export const DeleteBucketRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(
      T.HttpHeader("x-amz-account-id"),
      T.ContextParam("AccountId"),
      T.HostLabel(),
    ),
    Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "DELETE", uri: "/v20180820/bucket/{Bucket}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ RequiresAccountId: { value: true } }),
    ),
  ),
).annotate({
  identifier: "DeleteBucketRequest",
}) as any as S.Schema<DeleteBucketRequest>;
export interface DeleteBucketResponse {}
export const DeleteBucketResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteBucketResponse",
}) as any as S.Schema<DeleteBucketResponse>;
export interface DeleteBucketLifecycleConfigurationRequest {
  AccountId: string;
  Bucket: string;
}
export const DeleteBucketLifecycleConfigurationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      AccountId: S.String.pipe(
        T.HttpHeader("x-amz-account-id"),
        T.ContextParam("AccountId"),
        T.HostLabel(),
      ),
      Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
    }).pipe(
      T.all(
        ns,
        T.Http({
          method: "DELETE",
          uri: "/v20180820/bucket/{Bucket}/lifecycleconfiguration",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
        T.StaticContextParams({ RequiresAccountId: { value: true } }),
      ),
    ),
  ).annotate({
    identifier: "DeleteBucketLifecycleConfigurationRequest",
  }) as any as S.Schema<DeleteBucketLifecycleConfigurationRequest>;
export interface DeleteBucketLifecycleConfigurationResponse {}
export const DeleteBucketLifecycleConfigurationResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({}).pipe(ns)).annotate({
    identifier: "DeleteBucketLifecycleConfigurationResponse",
  }) as any as S.Schema<DeleteBucketLifecycleConfigurationResponse>;
export interface DeleteBucketPolicyRequest {
  AccountId: string;
  Bucket: string;
}
export const DeleteBucketPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(
      T.HttpHeader("x-amz-account-id"),
      T.ContextParam("AccountId"),
      T.HostLabel(),
    ),
    Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "DELETE", uri: "/v20180820/bucket/{Bucket}/policy" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ RequiresAccountId: { value: true } }),
    ),
  ),
).annotate({
  identifier: "DeleteBucketPolicyRequest",
}) as any as S.Schema<DeleteBucketPolicyRequest>;
export interface DeleteBucketPolicyResponse {}
export const DeleteBucketPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteBucketPolicyResponse",
}) as any as S.Schema<DeleteBucketPolicyResponse>;
export interface DeleteBucketReplicationRequest {
  AccountId: string;
  Bucket: string;
}
export const DeleteBucketReplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(
      T.HttpHeader("x-amz-account-id"),
      T.ContextParam("AccountId"),
      T.HostLabel(),
    ),
    Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "DELETE",
        uri: "/v20180820/bucket/{Bucket}/replication",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ RequiresAccountId: { value: true } }),
    ),
  ),
).annotate({
  identifier: "DeleteBucketReplicationRequest",
}) as any as S.Schema<DeleteBucketReplicationRequest>;
export interface DeleteBucketReplicationResponse {}
export const DeleteBucketReplicationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteBucketReplicationResponse",
}) as any as S.Schema<DeleteBucketReplicationResponse>;
export interface DeleteBucketTaggingRequest {
  AccountId: string;
  Bucket: string;
}
export const DeleteBucketTaggingRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(
      T.HttpHeader("x-amz-account-id"),
      T.ContextParam("AccountId"),
      T.HostLabel(),
    ),
    Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "DELETE", uri: "/v20180820/bucket/{Bucket}/tagging" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ RequiresAccountId: { value: true } }),
    ),
  ),
).annotate({
  identifier: "DeleteBucketTaggingRequest",
}) as any as S.Schema<DeleteBucketTaggingRequest>;
export interface DeleteBucketTaggingResponse {}
export const DeleteBucketTaggingResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteBucketTaggingResponse",
}) as any as S.Schema<DeleteBucketTaggingResponse>;
export interface DeleteJobTaggingRequest {
  AccountId: string;
  JobId: string;
}
export const DeleteJobTaggingRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(
      T.HttpHeader("x-amz-account-id"),
      T.ContextParam("AccountId"),
      T.HostLabel(),
    ),
    JobId: S.String.pipe(T.HttpLabel("JobId")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "DELETE", uri: "/v20180820/jobs/{JobId}/tagging" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ RequiresAccountId: { value: true } }),
    ),
  ),
).annotate({
  identifier: "DeleteJobTaggingRequest",
}) as any as S.Schema<DeleteJobTaggingRequest>;
export interface DeleteJobTaggingResult {}
export const DeleteJobTaggingResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteJobTaggingResult",
}) as any as S.Schema<DeleteJobTaggingResult>;
export interface DeleteMultiRegionAccessPointInput {
  Name: string;
}
export const DeleteMultiRegionAccessPointInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String }),
).annotate({
  identifier: "DeleteMultiRegionAccessPointInput",
}) as any as S.Schema<DeleteMultiRegionAccessPointInput>;
export interface DeleteMultiRegionAccessPointRequest {
  AccountId: string;
  ClientToken: string;
  Details: DeleteMultiRegionAccessPointInput;
}
export const DeleteMultiRegionAccessPointRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(
      T.HttpHeader("x-amz-account-id"),
      T.ContextParam("AccountId"),
      T.HostLabel(),
    ),
    ClientToken: S.String.pipe(T.IdempotencyToken()),
    Details: DeleteMultiRegionAccessPointInput,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v20180820/async-requests/mrap/delete" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ RequiresAccountId: { value: true } }),
    ),
  ),
).annotate({
  identifier: "DeleteMultiRegionAccessPointRequest",
}) as any as S.Schema<DeleteMultiRegionAccessPointRequest>;
export interface DeleteMultiRegionAccessPointResult {
  RequestTokenARN?: string;
}
export const DeleteMultiRegionAccessPointResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RequestTokenARN: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "DeleteMultiRegionAccessPointResult",
}) as any as S.Schema<DeleteMultiRegionAccessPointResult>;
export interface DeletePublicAccessBlockRequest {
  AccountId: string;
}
export const DeletePublicAccessBlockRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(
      T.HttpHeader("x-amz-account-id"),
      T.ContextParam("AccountId"),
      T.HostLabel(),
    ),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "DELETE",
        uri: "/v20180820/configuration/publicAccessBlock",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ RequiresAccountId: { value: true } }),
    ),
  ),
).annotate({
  identifier: "DeletePublicAccessBlockRequest",
}) as any as S.Schema<DeletePublicAccessBlockRequest>;
export interface DeletePublicAccessBlockResponse {}
export const DeletePublicAccessBlockResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeletePublicAccessBlockResponse",
}) as any as S.Schema<DeletePublicAccessBlockResponse>;
export type ConfigId = string;
export interface DeleteStorageLensConfigurationRequest {
  ConfigId: string;
  AccountId: string;
}
export const DeleteStorageLensConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ConfigId: S.String.pipe(T.HttpLabel("ConfigId")),
      AccountId: S.String.pipe(
        T.HttpHeader("x-amz-account-id"),
        T.ContextParam("AccountId"),
        T.HostLabel(),
      ),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "DELETE", uri: "/v20180820/storagelens/{ConfigId}" }),
        svc,
        auth,
        proto,
        ver,
        rules,
        T.StaticContextParams({ RequiresAccountId: { value: true } }),
      ),
    ),
).annotate({
  identifier: "DeleteStorageLensConfigurationRequest",
}) as any as S.Schema<DeleteStorageLensConfigurationRequest>;
export interface DeleteStorageLensConfigurationResponse {}
export const DeleteStorageLensConfigurationResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteStorageLensConfigurationResponse",
}) as any as S.Schema<DeleteStorageLensConfigurationResponse>;
export interface DeleteStorageLensConfigurationTaggingRequest {
  ConfigId: string;
  AccountId: string;
}
export const DeleteStorageLensConfigurationTaggingRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ConfigId: S.String.pipe(T.HttpLabel("ConfigId")),
      AccountId: S.String.pipe(
        T.HttpHeader("x-amz-account-id"),
        T.ContextParam("AccountId"),
        T.HostLabel(),
      ),
    }).pipe(
      T.all(
        ns,
        T.Http({
          method: "DELETE",
          uri: "/v20180820/storagelens/{ConfigId}/tagging",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
        T.StaticContextParams({ RequiresAccountId: { value: true } }),
      ),
    ),
  ).annotate({
    identifier: "DeleteStorageLensConfigurationTaggingRequest",
  }) as any as S.Schema<DeleteStorageLensConfigurationTaggingRequest>;
export interface DeleteStorageLensConfigurationTaggingResult {}
export const DeleteStorageLensConfigurationTaggingResult =
  /*@__PURE__*/ S.suspend(() => S.Struct({}).pipe(ns)).annotate({
    identifier: "DeleteStorageLensConfigurationTaggingResult",
  }) as any as S.Schema<DeleteStorageLensConfigurationTaggingResult>;
export interface DeleteStorageLensGroupRequest {
  Name: string;
  AccountId: string;
}
export const DeleteStorageLensGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String.pipe(T.HttpLabel("Name")),
    AccountId: S.String.pipe(
      T.HttpHeader("x-amz-account-id"),
      T.ContextParam("AccountId"),
      T.HostLabel(),
    ),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "DELETE", uri: "/v20180820/storagelensgroup/{Name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ RequiresAccountId: { value: true } }),
    ),
  ),
).annotate({
  identifier: "DeleteStorageLensGroupRequest",
}) as any as S.Schema<DeleteStorageLensGroupRequest>;
export interface DeleteStorageLensGroupResponse {}
export const DeleteStorageLensGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteStorageLensGroupResponse",
}) as any as S.Schema<DeleteStorageLensGroupResponse>;
export interface DescribeJobRequest {
  AccountId: string;
  JobId: string;
}
export const DescribeJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(
      T.HttpHeader("x-amz-account-id"),
      T.ContextParam("AccountId"),
      T.HostLabel(),
    ),
    JobId: S.String.pipe(T.HttpLabel("JobId")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/v20180820/jobs/{JobId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ RequiresAccountId: { value: true } }),
    ),
  ),
).annotate({
  identifier: "DescribeJobRequest",
}) as any as S.Schema<DescribeJobRequest>;
export type JobArn = string;
export type JobStatus =
  | "Active"
  | "Cancelled"
  | "Cancelling"
  | "Complete"
  | "Completing"
  | "Failed"
  | "Failing"
  | "New"
  | "Paused"
  | "Pausing"
  | "Preparing"
  | "Ready"
  | "Suspended"
  | (string & {});
export const JobStatus = S.String;

export type JobTotalNumberOfTasks = number;
export type JobNumberOfTasksSucceeded = number;
export type JobNumberOfTasksFailed = number;
export type JobTimeInStateSeconds = number;
export interface JobTimers {
  ElapsedTimeInActiveSeconds?: number;
}
export const JobTimers = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ElapsedTimeInActiveSeconds: S.optional(S.Number) }),
).annotate({ identifier: "JobTimers" }) as any as S.Schema<JobTimers>;
export interface JobProgressSummary {
  TotalNumberOfTasks?: number;
  NumberOfTasksSucceeded?: number;
  NumberOfTasksFailed?: number;
  Timers?: JobTimers;
}
export const JobProgressSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TotalNumberOfTasks: S.optional(S.Number),
    NumberOfTasksSucceeded: S.optional(S.Number),
    NumberOfTasksFailed: S.optional(S.Number),
    Timers: S.optional(JobTimers),
  }),
).annotate({
  identifier: "JobProgressSummary",
}) as any as S.Schema<JobProgressSummary>;
export type JobStatusUpdateReason = string;
export type JobFailureCode = string;
export type JobFailureReason = string;
export interface JobFailure {
  FailureCode?: string;
  FailureReason?: string;
}
export const JobFailure = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FailureCode: S.optional(S.String),
    FailureReason: S.optional(S.String),
  }),
).annotate({ identifier: "JobFailure" }) as any as S.Schema<JobFailure>;
export type JobFailureList = JobFailure[];
export const JobFailureList = /*@__PURE__*/ S.Array(JobFailure);
export type JobCreationTime = Date;
export type JobTerminationDate = Date;
export type SuspendedDate = Date;
export type SuspendedCause = string;
export interface S3GeneratedManifestDescriptor {
  Format?: GeneratedManifestFormat;
  Location?: JobManifestLocation;
}
export const S3GeneratedManifestDescriptor = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Format: S.optional(GeneratedManifestFormat),
    Location: S.optional(JobManifestLocation),
  }),
).annotate({
  identifier: "S3GeneratedManifestDescriptor",
}) as any as S.Schema<S3GeneratedManifestDescriptor>;
export interface JobDescriptor {
  JobId?: string;
  ConfirmationRequired?: boolean;
  Description?: string;
  JobArn?: string;
  Status?: JobStatus;
  Manifest?: JobManifest;
  Operation?: JobOperation;
  Priority?: number;
  ProgressSummary?: JobProgressSummary;
  StatusUpdateReason?: string;
  FailureReasons?: JobFailure[];
  Report?: JobReport;
  CreationTime?: Date;
  TerminationDate?: Date;
  RoleArn?: string;
  SuspendedDate?: Date;
  SuspendedCause?: string;
  ManifestGenerator?: JobManifestGenerator;
  GeneratedManifestDescriptor?: S3GeneratedManifestDescriptor;
}
export const JobDescriptor = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobId: S.optional(S.String),
    ConfirmationRequired: S.optional(S.Boolean),
    Description: S.optional(S.String),
    JobArn: S.optional(S.String),
    Status: S.optional(JobStatus),
    Manifest: S.optional(JobManifest),
    Operation: S.optional(JobOperation),
    Priority: S.optional(S.Number),
    ProgressSummary: S.optional(JobProgressSummary),
    StatusUpdateReason: S.optional(S.String),
    FailureReasons: S.optional(JobFailureList),
    Report: S.optional(JobReport),
    CreationTime: S.optional(T.DateFromString),
    TerminationDate: S.optional(T.DateFromString),
    RoleArn: S.optional(S.String),
    SuspendedDate: S.optional(T.DateFromString),
    SuspendedCause: S.optional(S.String),
    ManifestGenerator: S.optional(JobManifestGenerator),
    GeneratedManifestDescriptor: S.optional(S3GeneratedManifestDescriptor),
  }),
).annotate({ identifier: "JobDescriptor" }) as any as S.Schema<JobDescriptor>;
export interface DescribeJobResult {
  Job?: JobDescriptor;
}
export const DescribeJobResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Job: S.optional(JobDescriptor) }).pipe(ns),
).annotate({
  identifier: "DescribeJobResult",
}) as any as S.Schema<DescribeJobResult>;
export interface DescribeMultiRegionAccessPointOperationRequest {
  AccountId: string;
  RequestTokenARN: string;
}
export const DescribeMultiRegionAccessPointOperationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      AccountId: S.String.pipe(
        T.HttpHeader("x-amz-account-id"),
        T.ContextParam("AccountId"),
        T.HostLabel(),
      ),
      RequestTokenARN: S.String.pipe(T.HttpLabel("RequestTokenARN")),
    }).pipe(
      T.all(
        ns,
        T.Http({
          method: "GET",
          uri: "/v20180820/async-requests/mrap/{RequestTokenARN+}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
        T.StaticContextParams({ RequiresAccountId: { value: true } }),
      ),
    ),
  ).annotate({
    identifier: "DescribeMultiRegionAccessPointOperationRequest",
  }) as any as S.Schema<DescribeMultiRegionAccessPointOperationRequest>;
export type AsyncCreationTimestamp = Date;
export type AsyncOperationName =
  | "CreateMultiRegionAccessPoint"
  | "DeleteMultiRegionAccessPoint"
  | "PutMultiRegionAccessPointPolicy"
  | (string & {});
export const AsyncOperationName = S.String;

export type Policy = string;
export interface PutMultiRegionAccessPointPolicyInput {
  Name: string;
  Policy: string;
}
export const PutMultiRegionAccessPointPolicyInput = /*@__PURE__*/ S.suspend(
  () => S.Struct({ Name: S.String, Policy: S.String }),
).annotate({
  identifier: "PutMultiRegionAccessPointPolicyInput",
}) as any as S.Schema<PutMultiRegionAccessPointPolicyInput>;
export interface AsyncRequestParameters {
  CreateMultiRegionAccessPointRequest?: CreateMultiRegionAccessPointInput;
  DeleteMultiRegionAccessPointRequest?: DeleteMultiRegionAccessPointInput;
  PutMultiRegionAccessPointPolicyRequest?: PutMultiRegionAccessPointPolicyInput;
}
export const AsyncRequestParameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CreateMultiRegionAccessPointRequest: S.optional(
      CreateMultiRegionAccessPointInput,
    ),
    DeleteMultiRegionAccessPointRequest: S.optional(
      DeleteMultiRegionAccessPointInput,
    ),
    PutMultiRegionAccessPointPolicyRequest: S.optional(
      PutMultiRegionAccessPointPolicyInput,
    ),
  }),
).annotate({
  identifier: "AsyncRequestParameters",
}) as any as S.Schema<AsyncRequestParameters>;
export type AsyncRequestStatus = string;
export type RegionName = string;
export interface MultiRegionAccessPointRegionalResponse {
  Name?: string;
  RequestStatus?: string;
}
export const MultiRegionAccessPointRegionalResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Name: S.optional(S.String),
      RequestStatus: S.optional(S.String),
    }),
).annotate({
  identifier: "MultiRegionAccessPointRegionalResponse",
}) as any as S.Schema<MultiRegionAccessPointRegionalResponse>;
export type MultiRegionAccessPointRegionalResponseList =
  MultiRegionAccessPointRegionalResponse[];
export const MultiRegionAccessPointRegionalResponseList = /*@__PURE__*/ S.Array(
  MultiRegionAccessPointRegionalResponse.pipe(T.XmlName("Region")).annotate({
    identifier: "MultiRegionAccessPointRegionalResponse",
  }),
);
export interface MultiRegionAccessPointsAsyncResponse {
  Regions?: MultiRegionAccessPointRegionalResponse[];
}
export const MultiRegionAccessPointsAsyncResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Regions: S.optional(MultiRegionAccessPointRegionalResponseList),
    }),
).annotate({
  identifier: "MultiRegionAccessPointsAsyncResponse",
}) as any as S.Schema<MultiRegionAccessPointsAsyncResponse>;
export interface AsyncErrorDetails {
  Code?: string;
  Message?: string;
  Resource?: string;
  RequestId?: string;
}
export const AsyncErrorDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Code: S.optional(S.String),
    Message: S.optional(S.String),
    Resource: S.optional(S.String),
    RequestId: S.optional(S.String),
  }),
).annotate({
  identifier: "AsyncErrorDetails",
}) as any as S.Schema<AsyncErrorDetails>;
export interface AsyncResponseDetails {
  MultiRegionAccessPointDetails?: MultiRegionAccessPointsAsyncResponse;
  ErrorDetails?: AsyncErrorDetails;
}
export const AsyncResponseDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MultiRegionAccessPointDetails: S.optional(
      MultiRegionAccessPointsAsyncResponse,
    ),
    ErrorDetails: S.optional(AsyncErrorDetails),
  }),
).annotate({
  identifier: "AsyncResponseDetails",
}) as any as S.Schema<AsyncResponseDetails>;
export interface AsyncOperation {
  CreationTime?: Date;
  Operation?: AsyncOperationName;
  RequestTokenARN?: string;
  RequestParameters?: AsyncRequestParameters;
  RequestStatus?: string;
  ResponseDetails?: AsyncResponseDetails;
}
export const AsyncOperation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CreationTime: S.optional(T.DateFromString),
    Operation: S.optional(AsyncOperationName),
    RequestTokenARN: S.optional(S.String),
    RequestParameters: S.optional(AsyncRequestParameters),
    RequestStatus: S.optional(S.String),
    ResponseDetails: S.optional(AsyncResponseDetails),
  }),
).annotate({ identifier: "AsyncOperation" }) as any as S.Schema<AsyncOperation>;
export interface DescribeMultiRegionAccessPointOperationResult {
  AsyncOperation?: AsyncOperation;
}
export const DescribeMultiRegionAccessPointOperationResult =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ AsyncOperation: S.optional(AsyncOperation) }).pipe(ns),
  ).annotate({
    identifier: "DescribeMultiRegionAccessPointOperationResult",
  }) as any as S.Schema<DescribeMultiRegionAccessPointOperationResult>;
export interface DissociateAccessGrantsIdentityCenterRequest {
  AccountId: string;
}
export const DissociateAccessGrantsIdentityCenterRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      AccountId: S.String.pipe(
        T.HttpHeader("x-amz-account-id"),
        T.ContextParam("AccountId"),
        T.HostLabel(),
      ),
    }).pipe(
      T.all(
        ns,
        T.Http({
          method: "DELETE",
          uri: "/v20180820/accessgrantsinstance/identitycenter",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
        T.StaticContextParams({ RequiresAccountId: { value: true } }),
      ),
    ),
  ).annotate({
    identifier: "DissociateAccessGrantsIdentityCenterRequest",
  }) as any as S.Schema<DissociateAccessGrantsIdentityCenterRequest>;
export interface DissociateAccessGrantsIdentityCenterResponse {}
export const DissociateAccessGrantsIdentityCenterResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({}).pipe(ns)).annotate({
    identifier: "DissociateAccessGrantsIdentityCenterResponse",
  }) as any as S.Schema<DissociateAccessGrantsIdentityCenterResponse>;
export interface GetAccessGrantRequest {
  AccountId: string;
  AccessGrantId: string;
}
export const GetAccessGrantRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(
      T.HttpHeader("x-amz-account-id"),
      T.ContextParam("AccountId"),
      T.HostLabel(),
    ),
    AccessGrantId: S.String.pipe(T.HttpLabel("AccessGrantId")),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "GET",
        uri: "/v20180820/accessgrantsinstance/grant/{AccessGrantId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ RequiresAccountId: { value: true } }),
    ),
  ),
).annotate({
  identifier: "GetAccessGrantRequest",
}) as any as S.Schema<GetAccessGrantRequest>;
export interface GetAccessGrantResult {
  CreatedAt?: Date;
  AccessGrantId?: string;
  AccessGrantArn?: string;
  Grantee?: Grantee;
  Permission?: Permission;
  AccessGrantsLocationId?: string;
  AccessGrantsLocationConfiguration?: AccessGrantsLocationConfiguration;
  GrantScope?: string;
  ApplicationArn?: string;
}
export const GetAccessGrantResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CreatedAt: S.optional(T.DateFromString),
    AccessGrantId: S.optional(S.String),
    AccessGrantArn: S.optional(S.String),
    Grantee: S.optional(Grantee),
    Permission: S.optional(Permission),
    AccessGrantsLocationId: S.optional(S.String),
    AccessGrantsLocationConfiguration: S.optional(
      AccessGrantsLocationConfiguration,
    ),
    GrantScope: S.optional(S.String),
    ApplicationArn: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "GetAccessGrantResult",
}) as any as S.Schema<GetAccessGrantResult>;
export interface GetAccessGrantsInstanceRequest {
  AccountId: string;
}
export const GetAccessGrantsInstanceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(
      T.HttpHeader("x-amz-account-id"),
      T.ContextParam("AccountId"),
      T.HostLabel(),
    ),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/v20180820/accessgrantsinstance" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ RequiresAccountId: { value: true } }),
    ),
  ),
).annotate({
  identifier: "GetAccessGrantsInstanceRequest",
}) as any as S.Schema<GetAccessGrantsInstanceRequest>;
export interface GetAccessGrantsInstanceResult {
  AccessGrantsInstanceArn?: string;
  AccessGrantsInstanceId?: string;
  IdentityCenterArn?: string;
  IdentityCenterInstanceArn?: string;
  IdentityCenterApplicationArn?: string;
  CreatedAt?: Date;
}
export const GetAccessGrantsInstanceResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccessGrantsInstanceArn: S.optional(S.String),
    AccessGrantsInstanceId: S.optional(S.String),
    IdentityCenterArn: S.optional(S.String),
    IdentityCenterInstanceArn: S.optional(S.String),
    IdentityCenterApplicationArn: S.optional(S.String),
    CreatedAt: S.optional(T.DateFromString),
  }).pipe(ns),
).annotate({
  identifier: "GetAccessGrantsInstanceResult",
}) as any as S.Schema<GetAccessGrantsInstanceResult>;
export interface GetAccessGrantsInstanceForPrefixRequest {
  AccountId: string;
  S3Prefix: string;
}
export const GetAccessGrantsInstanceForPrefixRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AccountId: S.String.pipe(
        T.HttpHeader("x-amz-account-id"),
        T.ContextParam("AccountId"),
        T.HostLabel(),
      ),
      S3Prefix: S.String.pipe(T.HttpQuery("s3prefix")),
    }).pipe(
      T.all(
        ns,
        T.Http({
          method: "GET",
          uri: "/v20180820/accessgrantsinstance/prefix",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
        T.StaticContextParams({ RequiresAccountId: { value: true } }),
      ),
    ),
).annotate({
  identifier: "GetAccessGrantsInstanceForPrefixRequest",
}) as any as S.Schema<GetAccessGrantsInstanceForPrefixRequest>;
export interface GetAccessGrantsInstanceForPrefixResult {
  AccessGrantsInstanceArn?: string;
  AccessGrantsInstanceId?: string;
}
export const GetAccessGrantsInstanceForPrefixResult = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AccessGrantsInstanceArn: S.optional(S.String),
      AccessGrantsInstanceId: S.optional(S.String),
    }).pipe(ns),
).annotate({
  identifier: "GetAccessGrantsInstanceForPrefixResult",
}) as any as S.Schema<GetAccessGrantsInstanceForPrefixResult>;
export interface GetAccessGrantsInstanceResourcePolicyRequest {
  AccountId: string;
}
export const GetAccessGrantsInstanceResourcePolicyRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      AccountId: S.String.pipe(
        T.HttpHeader("x-amz-account-id"),
        T.ContextParam("AccountId"),
        T.HostLabel(),
      ),
    }).pipe(
      T.all(
        ns,
        T.Http({
          method: "GET",
          uri: "/v20180820/accessgrantsinstance/resourcepolicy",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
        T.StaticContextParams({ RequiresAccountId: { value: true } }),
      ),
    ),
  ).annotate({
    identifier: "GetAccessGrantsInstanceResourcePolicyRequest",
  }) as any as S.Schema<GetAccessGrantsInstanceResourcePolicyRequest>;
export type PolicyDocument = string;
export type Organization = string;
export interface GetAccessGrantsInstanceResourcePolicyResult {
  Policy?: string;
  Organization?: string;
  CreatedAt?: Date;
}
export const GetAccessGrantsInstanceResourcePolicyResult =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Policy: S.optional(S.String),
      Organization: S.optional(S.String),
      CreatedAt: S.optional(T.DateFromString),
    }).pipe(ns),
  ).annotate({
    identifier: "GetAccessGrantsInstanceResourcePolicyResult",
  }) as any as S.Schema<GetAccessGrantsInstanceResourcePolicyResult>;
export interface GetAccessGrantsLocationRequest {
  AccountId: string;
  AccessGrantsLocationId: string;
}
export const GetAccessGrantsLocationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(
      T.HttpHeader("x-amz-account-id"),
      T.ContextParam("AccountId"),
      T.HostLabel(),
    ),
    AccessGrantsLocationId: S.String.pipe(
      T.HttpLabel("AccessGrantsLocationId"),
    ),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "GET",
        uri: "/v20180820/accessgrantsinstance/location/{AccessGrantsLocationId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ RequiresAccountId: { value: true } }),
    ),
  ),
).annotate({
  identifier: "GetAccessGrantsLocationRequest",
}) as any as S.Schema<GetAccessGrantsLocationRequest>;
export interface GetAccessGrantsLocationResult {
  CreatedAt?: Date;
  AccessGrantsLocationId?: string;
  AccessGrantsLocationArn?: string;
  LocationScope?: string;
  IAMRoleArn?: string;
}
export const GetAccessGrantsLocationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CreatedAt: S.optional(T.DateFromString),
    AccessGrantsLocationId: S.optional(S.String),
    AccessGrantsLocationArn: S.optional(S.String),
    LocationScope: S.optional(S.String),
    IAMRoleArn: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "GetAccessGrantsLocationResult",
}) as any as S.Schema<GetAccessGrantsLocationResult>;
export interface GetAccessPointRequest {
  AccountId: string;
  Name: string;
}
export const GetAccessPointRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(
      T.HttpHeader("x-amz-account-id"),
      T.ContextParam("AccountId"),
      T.HostLabel(),
    ),
    Name: S.String.pipe(T.HttpLabel("Name"), T.ContextParam("AccessPointName")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/v20180820/accesspoint/{Name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ RequiresAccountId: { value: true } }),
    ),
  ),
).annotate({
  identifier: "GetAccessPointRequest",
}) as any as S.Schema<GetAccessPointRequest>;
export type AccessPointBucketName = string;
export type NetworkOrigin = "Internet" | "VPC" | (string & {});
export const NetworkOrigin = S.String;

export type CreationDate = Date;
export type Endpoints = { [key: string]: string | undefined };
export const Endpoints = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type DataSourceId = string;
export type DataSourceType = string;
export interface GetAccessPointResult {
  Name?: string;
  Bucket?: string;
  NetworkOrigin?: NetworkOrigin;
  VpcConfiguration?: VpcConfiguration;
  PublicAccessBlockConfiguration?: PublicAccessBlockConfiguration;
  CreationDate?: Date;
  Alias?: string;
  AccessPointArn?: string;
  Endpoints?: { [key: string]: string | undefined };
  BucketAccountId?: string;
  DataSourceId?: string;
  DataSourceType?: string;
}
export const GetAccessPointResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Bucket: S.optional(S.String),
    NetworkOrigin: S.optional(NetworkOrigin),
    VpcConfiguration: S.optional(VpcConfiguration),
    PublicAccessBlockConfiguration: S.optional(PublicAccessBlockConfiguration),
    CreationDate: S.optional(T.DateFromString),
    Alias: S.optional(S.String),
    AccessPointArn: S.optional(S.String),
    Endpoints: S.optional(Endpoints),
    BucketAccountId: S.optional(S.String),
    DataSourceId: S.optional(S.String),
    DataSourceType: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "GetAccessPointResult",
}) as any as S.Schema<GetAccessPointResult>;
export interface GetAccessPointConfigurationForObjectLambdaRequest {
  AccountId: string;
  Name: string;
}
export const GetAccessPointConfigurationForObjectLambdaRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      AccountId: S.String.pipe(
        T.HttpHeader("x-amz-account-id"),
        T.ContextParam("AccountId"),
        T.HostLabel(),
      ),
      Name: S.String.pipe(T.HttpLabel("Name")),
    }).pipe(
      T.all(
        ns,
        T.Http({
          method: "GET",
          uri: "/v20180820/accesspointforobjectlambda/{Name}/configuration",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
        T.StaticContextParams({ RequiresAccountId: { value: true } }),
      ),
    ),
  ).annotate({
    identifier: "GetAccessPointConfigurationForObjectLambdaRequest",
  }) as any as S.Schema<GetAccessPointConfigurationForObjectLambdaRequest>;
export interface GetAccessPointConfigurationForObjectLambdaResult {
  Configuration?: ObjectLambdaConfiguration;
}
export const GetAccessPointConfigurationForObjectLambdaResult =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ Configuration: S.optional(ObjectLambdaConfiguration) }).pipe(ns),
  ).annotate({
    identifier: "GetAccessPointConfigurationForObjectLambdaResult",
  }) as any as S.Schema<GetAccessPointConfigurationForObjectLambdaResult>;
export interface GetAccessPointForObjectLambdaRequest {
  AccountId: string;
  Name: string;
}
export const GetAccessPointForObjectLambdaRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AccountId: S.String.pipe(
        T.HttpHeader("x-amz-account-id"),
        T.ContextParam("AccountId"),
        T.HostLabel(),
      ),
      Name: S.String.pipe(T.HttpLabel("Name")),
    }).pipe(
      T.all(
        ns,
        T.Http({
          method: "GET",
          uri: "/v20180820/accesspointforobjectlambda/{Name}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
        T.StaticContextParams({ RequiresAccountId: { value: true } }),
      ),
    ),
).annotate({
  identifier: "GetAccessPointForObjectLambdaRequest",
}) as any as S.Schema<GetAccessPointForObjectLambdaRequest>;
export interface GetAccessPointForObjectLambdaResult {
  Name?: string;
  PublicAccessBlockConfiguration?: PublicAccessBlockConfiguration;
  CreationDate?: Date;
  Alias?: ObjectLambdaAccessPointAlias;
}
export const GetAccessPointForObjectLambdaResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    PublicAccessBlockConfiguration: S.optional(PublicAccessBlockConfiguration),
    CreationDate: S.optional(T.DateFromString),
    Alias: S.optional(ObjectLambdaAccessPointAlias),
  }).pipe(ns),
).annotate({
  identifier: "GetAccessPointForObjectLambdaResult",
}) as any as S.Schema<GetAccessPointForObjectLambdaResult>;
export interface GetAccessPointPolicyRequest {
  AccountId: string;
  Name: string;
}
export const GetAccessPointPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(
      T.HttpHeader("x-amz-account-id"),
      T.ContextParam("AccountId"),
      T.HostLabel(),
    ),
    Name: S.String.pipe(T.HttpLabel("Name"), T.ContextParam("AccessPointName")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/v20180820/accesspoint/{Name}/policy" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ RequiresAccountId: { value: true } }),
    ),
  ),
).annotate({
  identifier: "GetAccessPointPolicyRequest",
}) as any as S.Schema<GetAccessPointPolicyRequest>;
export interface GetAccessPointPolicyResult {
  Policy?: string;
}
export const GetAccessPointPolicyResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Policy: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "GetAccessPointPolicyResult",
}) as any as S.Schema<GetAccessPointPolicyResult>;
export interface GetAccessPointPolicyForObjectLambdaRequest {
  AccountId: string;
  Name: string;
}
export const GetAccessPointPolicyForObjectLambdaRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      AccountId: S.String.pipe(
        T.HttpHeader("x-amz-account-id"),
        T.ContextParam("AccountId"),
        T.HostLabel(),
      ),
      Name: S.String.pipe(T.HttpLabel("Name")),
    }).pipe(
      T.all(
        ns,
        T.Http({
          method: "GET",
          uri: "/v20180820/accesspointforobjectlambda/{Name}/policy",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
        T.StaticContextParams({ RequiresAccountId: { value: true } }),
      ),
    ),
  ).annotate({
    identifier: "GetAccessPointPolicyForObjectLambdaRequest",
  }) as any as S.Schema<GetAccessPointPolicyForObjectLambdaRequest>;
export type ObjectLambdaPolicy = string;
export interface GetAccessPointPolicyForObjectLambdaResult {
  Policy?: string;
}
export const GetAccessPointPolicyForObjectLambdaResult =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ Policy: S.optional(S.String) }).pipe(ns),
  ).annotate({
    identifier: "GetAccessPointPolicyForObjectLambdaResult",
  }) as any as S.Schema<GetAccessPointPolicyForObjectLambdaResult>;
export interface GetAccessPointPolicyStatusRequest {
  AccountId: string;
  Name: string;
}
export const GetAccessPointPolicyStatusRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(
      T.HttpHeader("x-amz-account-id"),
      T.ContextParam("AccountId"),
      T.HostLabel(),
    ),
    Name: S.String.pipe(T.HttpLabel("Name"), T.ContextParam("AccessPointName")),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "GET",
        uri: "/v20180820/accesspoint/{Name}/policyStatus",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ RequiresAccountId: { value: true } }),
    ),
  ),
).annotate({
  identifier: "GetAccessPointPolicyStatusRequest",
}) as any as S.Schema<GetAccessPointPolicyStatusRequest>;
export type IsPublic = boolean;
export interface PolicyStatus {
  IsPublic?: boolean;
}
export const PolicyStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ IsPublic: S.optional(S.Boolean).pipe(T.XmlName("IsPublic")) }),
).annotate({ identifier: "PolicyStatus" }) as any as S.Schema<PolicyStatus>;
export interface GetAccessPointPolicyStatusResult {
  PolicyStatus?: PolicyStatus;
}
export const GetAccessPointPolicyStatusResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PolicyStatus: S.optional(PolicyStatus) }).pipe(ns),
).annotate({
  identifier: "GetAccessPointPolicyStatusResult",
}) as any as S.Schema<GetAccessPointPolicyStatusResult>;
export interface GetAccessPointPolicyStatusForObjectLambdaRequest {
  AccountId: string;
  Name: string;
}
export const GetAccessPointPolicyStatusForObjectLambdaRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      AccountId: S.String.pipe(
        T.HttpHeader("x-amz-account-id"),
        T.ContextParam("AccountId"),
        T.HostLabel(),
      ),
      Name: S.String.pipe(T.HttpLabel("Name")),
    }).pipe(
      T.all(
        ns,
        T.Http({
          method: "GET",
          uri: "/v20180820/accesspointforobjectlambda/{Name}/policyStatus",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
        T.StaticContextParams({ RequiresAccountId: { value: true } }),
      ),
    ),
  ).annotate({
    identifier: "GetAccessPointPolicyStatusForObjectLambdaRequest",
  }) as any as S.Schema<GetAccessPointPolicyStatusForObjectLambdaRequest>;
export interface GetAccessPointPolicyStatusForObjectLambdaResult {
  PolicyStatus?: PolicyStatus;
}
export const GetAccessPointPolicyStatusForObjectLambdaResult =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ PolicyStatus: S.optional(PolicyStatus) }).pipe(ns),
  ).annotate({
    identifier: "GetAccessPointPolicyStatusForObjectLambdaResult",
  }) as any as S.Schema<GetAccessPointPolicyStatusForObjectLambdaResult>;
export interface GetAccessPointScopeRequest {
  AccountId: string;
  Name: string;
}
export const GetAccessPointScopeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(
      T.HttpHeader("x-amz-account-id"),
      T.ContextParam("AccountId"),
      T.HostLabel(),
    ),
    Name: S.String.pipe(T.HttpLabel("Name"), T.ContextParam("AccessPointName")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/v20180820/accesspoint/{Name}/scope" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({
        RequiresAccountId: { value: true },
        UseS3ExpressControlEndpoint: { value: true },
      }),
    ),
  ),
).annotate({
  identifier: "GetAccessPointScopeRequest",
}) as any as S.Schema<GetAccessPointScopeRequest>;
export interface GetAccessPointScopeResult {
  Scope?: Scope;
}
export const GetAccessPointScopeResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Scope: S.optional(Scope) }).pipe(ns),
).annotate({
  identifier: "GetAccessPointScopeResult",
}) as any as S.Schema<GetAccessPointScopeResult>;
export interface GetBucketRequest {
  AccountId: string;
  Bucket: string;
}
export const GetBucketRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(
      T.HttpHeader("x-amz-account-id"),
      T.ContextParam("AccountId"),
      T.HostLabel(),
    ),
    Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/v20180820/bucket/{Bucket}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ RequiresAccountId: { value: true } }),
    ),
  ),
).annotate({
  identifier: "GetBucketRequest",
}) as any as S.Schema<GetBucketRequest>;
export type PublicAccessBlockEnabled = boolean;
export interface GetBucketResult {
  Bucket?: string;
  PublicAccessBlockEnabled?: boolean;
  CreationDate?: Date;
}
export const GetBucketResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Bucket: S.optional(S.String),
    PublicAccessBlockEnabled: S.optional(S.Boolean),
    CreationDate: S.optional(T.DateFromString),
  }).pipe(ns),
).annotate({
  identifier: "GetBucketResult",
}) as any as S.Schema<GetBucketResult>;
export interface GetBucketLifecycleConfigurationRequest {
  AccountId: string;
  Bucket: string;
}
export const GetBucketLifecycleConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AccountId: S.String.pipe(
        T.HttpHeader("x-amz-account-id"),
        T.ContextParam("AccountId"),
        T.HostLabel(),
      ),
      Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
    }).pipe(
      T.all(
        ns,
        T.Http({
          method: "GET",
          uri: "/v20180820/bucket/{Bucket}/lifecycleconfiguration",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
        T.StaticContextParams({ RequiresAccountId: { value: true } }),
      ),
    ),
).annotate({
  identifier: "GetBucketLifecycleConfigurationRequest",
}) as any as S.Schema<GetBucketLifecycleConfigurationRequest>;
export type Days = number;
export type ExpiredObjectDeleteMarker = boolean;
export interface LifecycleExpiration {
  Date?: Date;
  Days?: number;
  ExpiredObjectDeleteMarker?: boolean;
}
export const LifecycleExpiration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Date: S.optional(T.DateFromString),
    Days: S.optional(S.Number),
    ExpiredObjectDeleteMarker: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "LifecycleExpiration",
}) as any as S.Schema<LifecycleExpiration>;
export type ID = string;
export interface LifecycleRuleAndOperator {
  Prefix?: string;
  Tags?: S3Tag[];
  ObjectSizeGreaterThan?: number;
  ObjectSizeLessThan?: number;
}
export const LifecycleRuleAndOperator = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Prefix: S.optional(S.String),
    Tags: S.optional(S3TagSet),
    ObjectSizeGreaterThan: S.optional(S.Number),
    ObjectSizeLessThan: S.optional(S.Number),
  }),
).annotate({
  identifier: "LifecycleRuleAndOperator",
}) as any as S.Schema<LifecycleRuleAndOperator>;
export interface LifecycleRuleFilter {
  Prefix?: string;
  Tag?: S3Tag;
  And?: LifecycleRuleAndOperator;
  ObjectSizeGreaterThan?: number;
  ObjectSizeLessThan?: number;
}
export const LifecycleRuleFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Prefix: S.optional(S.String),
    Tag: S.optional(S3Tag),
    And: S.optional(LifecycleRuleAndOperator),
    ObjectSizeGreaterThan: S.optional(S.Number),
    ObjectSizeLessThan: S.optional(S.Number),
  }),
).annotate({
  identifier: "LifecycleRuleFilter",
}) as any as S.Schema<LifecycleRuleFilter>;
export type ExpirationStatus = "Enabled" | "Disabled" | (string & {});
export const ExpirationStatus = S.String;

export type TransitionStorageClass =
  | "GLACIER"
  | "STANDARD_IA"
  | "ONEZONE_IA"
  | "INTELLIGENT_TIERING"
  | "DEEP_ARCHIVE"
  | (string & {});
export const TransitionStorageClass = S.String;

export interface Transition {
  Date?: Date;
  Days?: number;
  StorageClass?: TransitionStorageClass;
}
export const Transition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Date: S.optional(T.DateFromString),
    Days: S.optional(S.Number),
    StorageClass: S.optional(TransitionStorageClass),
  }),
).annotate({ identifier: "Transition" }) as any as S.Schema<Transition>;
export type TransitionList = Transition[];
export const TransitionList = /*@__PURE__*/ S.Array(
  Transition.pipe(T.XmlName("Transition")).annotate({
    identifier: "Transition",
  }),
);
export interface NoncurrentVersionTransition {
  NoncurrentDays?: number;
  StorageClass?: TransitionStorageClass;
}
export const NoncurrentVersionTransition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NoncurrentDays: S.optional(S.Number),
    StorageClass: S.optional(TransitionStorageClass),
  }),
).annotate({
  identifier: "NoncurrentVersionTransition",
}) as any as S.Schema<NoncurrentVersionTransition>;
export type NoncurrentVersionTransitionList = NoncurrentVersionTransition[];
export const NoncurrentVersionTransitionList = /*@__PURE__*/ S.Array(
  NoncurrentVersionTransition.pipe(
    T.XmlName("NoncurrentVersionTransition"),
  ).annotate({ identifier: "NoncurrentVersionTransition" }),
);
export type NoncurrentVersionCount = number;
export interface NoncurrentVersionExpiration {
  NoncurrentDays?: number;
  NewerNoncurrentVersions?: number;
}
export const NoncurrentVersionExpiration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NoncurrentDays: S.optional(S.Number),
    NewerNoncurrentVersions: S.optional(S.Number),
  }),
).annotate({
  identifier: "NoncurrentVersionExpiration",
}) as any as S.Schema<NoncurrentVersionExpiration>;
export type DaysAfterInitiation = number;
export interface AbortIncompleteMultipartUpload {
  DaysAfterInitiation?: number;
}
export const AbortIncompleteMultipartUpload = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DaysAfterInitiation: S.optional(S.Number) }),
).annotate({
  identifier: "AbortIncompleteMultipartUpload",
}) as any as S.Schema<AbortIncompleteMultipartUpload>;
export interface LifecycleRule {
  Expiration?: LifecycleExpiration;
  ID?: string;
  Filter?: LifecycleRuleFilter;
  Status: ExpirationStatus;
  Transitions?: Transition[];
  NoncurrentVersionTransitions?: NoncurrentVersionTransition[];
  NoncurrentVersionExpiration?: NoncurrentVersionExpiration;
  AbortIncompleteMultipartUpload?: AbortIncompleteMultipartUpload;
}
export const LifecycleRule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Expiration: S.optional(LifecycleExpiration),
    ID: S.optional(S.String),
    Filter: S.optional(LifecycleRuleFilter),
    Status: ExpirationStatus,
    Transitions: S.optional(TransitionList),
    NoncurrentVersionTransitions: S.optional(NoncurrentVersionTransitionList),
    NoncurrentVersionExpiration: S.optional(NoncurrentVersionExpiration),
    AbortIncompleteMultipartUpload: S.optional(AbortIncompleteMultipartUpload),
  }),
).annotate({ identifier: "LifecycleRule" }) as any as S.Schema<LifecycleRule>;
export type LifecycleRules = LifecycleRule[];
export const LifecycleRules = /*@__PURE__*/ S.Array(
  LifecycleRule.pipe(T.XmlName("Rule")).annotate({
    identifier: "LifecycleRule",
  }),
);
export interface GetBucketLifecycleConfigurationResult {
  Rules?: LifecycleRule[];
}
export const GetBucketLifecycleConfigurationResult = /*@__PURE__*/ S.suspend(
  () => S.Struct({ Rules: S.optional(LifecycleRules) }).pipe(ns),
).annotate({
  identifier: "GetBucketLifecycleConfigurationResult",
}) as any as S.Schema<GetBucketLifecycleConfigurationResult>;
export interface GetBucketPolicyRequest {
  AccountId: string;
  Bucket: string;
}
export const GetBucketPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(
      T.HttpHeader("x-amz-account-id"),
      T.ContextParam("AccountId"),
      T.HostLabel(),
    ),
    Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/v20180820/bucket/{Bucket}/policy" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ RequiresAccountId: { value: true } }),
    ),
  ),
).annotate({
  identifier: "GetBucketPolicyRequest",
}) as any as S.Schema<GetBucketPolicyRequest>;
export interface GetBucketPolicyResult {
  Policy?: string;
}
export const GetBucketPolicyResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Policy: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "GetBucketPolicyResult",
}) as any as S.Schema<GetBucketPolicyResult>;
export interface GetBucketReplicationRequest {
  AccountId: string;
  Bucket: string;
}
export const GetBucketReplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(
      T.HttpHeader("x-amz-account-id"),
      T.ContextParam("AccountId"),
      T.HostLabel(),
    ),
    Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/v20180820/bucket/{Bucket}/replication" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ RequiresAccountId: { value: true } }),
    ),
  ),
).annotate({
  identifier: "GetBucketReplicationRequest",
}) as any as S.Schema<GetBucketReplicationRequest>;
export type Role = string;
export type Priority = number;
export interface ReplicationRuleAndOperator {
  Prefix?: string;
  Tags?: S3Tag[];
}
export const ReplicationRuleAndOperator = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Prefix: S.optional(S.String), Tags: S.optional(S3TagSet) }),
).annotate({
  identifier: "ReplicationRuleAndOperator",
}) as any as S.Schema<ReplicationRuleAndOperator>;
export interface ReplicationRuleFilter {
  Prefix?: string;
  Tag?: S3Tag;
  And?: ReplicationRuleAndOperator;
}
export const ReplicationRuleFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Prefix: S.optional(S.String),
    Tag: S.optional(S3Tag),
    And: S.optional(ReplicationRuleAndOperator),
  }),
).annotate({
  identifier: "ReplicationRuleFilter",
}) as any as S.Schema<ReplicationRuleFilter>;
export type ReplicationRuleStatus = "Enabled" | "Disabled" | (string & {});
export const ReplicationRuleStatus = S.String;

export type SseKmsEncryptedObjectsStatus =
  | "Enabled"
  | "Disabled"
  | (string & {});
export const SseKmsEncryptedObjectsStatus = S.String;

export interface SseKmsEncryptedObjects {
  Status: SseKmsEncryptedObjectsStatus;
}
export const SseKmsEncryptedObjects = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Status: SseKmsEncryptedObjectsStatus }),
).annotate({
  identifier: "SseKmsEncryptedObjects",
}) as any as S.Schema<SseKmsEncryptedObjects>;
export type ReplicaModificationsStatus = "Enabled" | "Disabled" | (string & {});
export const ReplicaModificationsStatus = S.String;

export interface ReplicaModifications {
  Status: ReplicaModificationsStatus;
}
export const ReplicaModifications = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Status: ReplicaModificationsStatus }),
).annotate({
  identifier: "ReplicaModifications",
}) as any as S.Schema<ReplicaModifications>;
export interface SourceSelectionCriteria {
  SseKmsEncryptedObjects?: SseKmsEncryptedObjects;
  ReplicaModifications?: ReplicaModifications;
}
export const SourceSelectionCriteria = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SseKmsEncryptedObjects: S.optional(SseKmsEncryptedObjects),
    ReplicaModifications: S.optional(ReplicaModifications),
  }),
).annotate({
  identifier: "SourceSelectionCriteria",
}) as any as S.Schema<SourceSelectionCriteria>;
export type ExistingObjectReplicationStatus =
  | "Enabled"
  | "Disabled"
  | (string & {});
export const ExistingObjectReplicationStatus = S.String;

export interface ExistingObjectReplication {
  Status: ExistingObjectReplicationStatus;
}
export const ExistingObjectReplication = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Status: ExistingObjectReplicationStatus }),
).annotate({
  identifier: "ExistingObjectReplication",
}) as any as S.Schema<ExistingObjectReplication>;
export type BucketIdentifierString = string;
export type ReplicationTimeStatus = "Enabled" | "Disabled" | (string & {});
export const ReplicationTimeStatus = S.String;

export type Minutes = number;
export interface ReplicationTimeValue {
  Minutes?: number;
}
export const ReplicationTimeValue = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Minutes: S.optional(S.Number) }),
).annotate({
  identifier: "ReplicationTimeValue",
}) as any as S.Schema<ReplicationTimeValue>;
export interface ReplicationTime {
  Status: ReplicationTimeStatus;
  Time: ReplicationTimeValue;
}
export const ReplicationTime = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Status: ReplicationTimeStatus, Time: ReplicationTimeValue }),
).annotate({
  identifier: "ReplicationTime",
}) as any as S.Schema<ReplicationTime>;
export type OwnerOverride = "Destination" | (string & {});
export const OwnerOverride = S.String;

export interface AccessControlTranslation {
  Owner: OwnerOverride;
}
export const AccessControlTranslation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Owner: OwnerOverride }),
).annotate({
  identifier: "AccessControlTranslation",
}) as any as S.Schema<AccessControlTranslation>;
export type ReplicaKmsKeyID = string;
export interface EncryptionConfiguration {
  ReplicaKmsKeyID?: string;
}
export const EncryptionConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ReplicaKmsKeyID: S.optional(S.String) }),
).annotate({
  identifier: "EncryptionConfiguration",
}) as any as S.Schema<EncryptionConfiguration>;
export type MetricsStatus = "Enabled" | "Disabled" | (string & {});
export const MetricsStatus = S.String;

export interface Metrics {
  Status: MetricsStatus;
  EventThreshold?: ReplicationTimeValue;
}
export const Metrics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: MetricsStatus,
    EventThreshold: S.optional(ReplicationTimeValue),
  }),
).annotate({ identifier: "Metrics" }) as any as S.Schema<Metrics>;
export type ReplicationStorageClass =
  | "STANDARD"
  | "REDUCED_REDUNDANCY"
  | "STANDARD_IA"
  | "ONEZONE_IA"
  | "INTELLIGENT_TIERING"
  | "GLACIER"
  | "DEEP_ARCHIVE"
  | "OUTPOSTS"
  | "GLACIER_IR"
  | (string & {});
export const ReplicationStorageClass = S.String;

export interface Destination {
  Account?: string;
  Bucket: string;
  ReplicationTime?: ReplicationTime;
  AccessControlTranslation?: AccessControlTranslation;
  EncryptionConfiguration?: EncryptionConfiguration;
  Metrics?: Metrics;
  StorageClass?: ReplicationStorageClass;
}
export const Destination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Account: S.optional(S.String),
    Bucket: S.String,
    ReplicationTime: S.optional(ReplicationTime),
    AccessControlTranslation: S.optional(AccessControlTranslation),
    EncryptionConfiguration: S.optional(EncryptionConfiguration),
    Metrics: S.optional(Metrics),
    StorageClass: S.optional(ReplicationStorageClass),
  }),
).annotate({ identifier: "Destination" }) as any as S.Schema<Destination>;
export type DeleteMarkerReplicationStatus =
  | "Enabled"
  | "Disabled"
  | (string & {});
export const DeleteMarkerReplicationStatus = S.String;

export interface DeleteMarkerReplication {
  Status: DeleteMarkerReplicationStatus;
}
export const DeleteMarkerReplication = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Status: DeleteMarkerReplicationStatus }),
).annotate({
  identifier: "DeleteMarkerReplication",
}) as any as S.Schema<DeleteMarkerReplication>;
export interface ReplicationRule {
  ID?: string;
  Priority?: number;
  Prefix?: string;
  Filter?: ReplicationRuleFilter;
  Status: ReplicationRuleStatus;
  SourceSelectionCriteria?: SourceSelectionCriteria;
  ExistingObjectReplication?: ExistingObjectReplication;
  Destination: Destination;
  DeleteMarkerReplication?: DeleteMarkerReplication;
  Bucket: string;
}
export const ReplicationRule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ID: S.optional(S.String),
    Priority: S.optional(S.Number),
    Prefix: S.optional(S.String),
    Filter: S.optional(ReplicationRuleFilter),
    Status: ReplicationRuleStatus,
    SourceSelectionCriteria: S.optional(SourceSelectionCriteria),
    ExistingObjectReplication: S.optional(ExistingObjectReplication),
    Destination: Destination,
    DeleteMarkerReplication: S.optional(DeleteMarkerReplication),
    Bucket: S.String,
  }),
).annotate({
  identifier: "ReplicationRule",
}) as any as S.Schema<ReplicationRule>;
export type ReplicationRules = ReplicationRule[];
export const ReplicationRules = /*@__PURE__*/ S.Array(
  ReplicationRule.pipe(T.XmlName("Rule")).annotate({
    identifier: "ReplicationRule",
  }),
);
export interface ReplicationConfiguration {
  Role: string;
  Rules: ReplicationRule[];
}
export const ReplicationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Role: S.String, Rules: ReplicationRules }),
).annotate({
  identifier: "ReplicationConfiguration",
}) as any as S.Schema<ReplicationConfiguration>;
export interface GetBucketReplicationResult {
  ReplicationConfiguration?: ReplicationConfiguration;
}
export const GetBucketReplicationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReplicationConfiguration: S.optional(ReplicationConfiguration),
  }).pipe(ns),
).annotate({
  identifier: "GetBucketReplicationResult",
}) as any as S.Schema<GetBucketReplicationResult>;
export interface GetBucketTaggingRequest {
  AccountId: string;
  Bucket: string;
}
export const GetBucketTaggingRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(
      T.HttpHeader("x-amz-account-id"),
      T.ContextParam("AccountId"),
      T.HostLabel(),
    ),
    Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/v20180820/bucket/{Bucket}/tagging" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ RequiresAccountId: { value: true } }),
    ),
  ),
).annotate({
  identifier: "GetBucketTaggingRequest",
}) as any as S.Schema<GetBucketTaggingRequest>;
export interface GetBucketTaggingResult {
  TagSet: S3Tag[];
}
export const GetBucketTaggingResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TagSet: S3TagSet }).pipe(ns),
).annotate({
  identifier: "GetBucketTaggingResult",
}) as any as S.Schema<GetBucketTaggingResult>;
export interface GetBucketVersioningRequest {
  AccountId: string;
  Bucket: string;
}
export const GetBucketVersioningRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(
      T.HttpHeader("x-amz-account-id"),
      T.ContextParam("AccountId"),
      T.HostLabel(),
    ),
    Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/v20180820/bucket/{Bucket}/versioning" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ RequiresAccountId: { value: true } }),
    ),
  ),
).annotate({
  identifier: "GetBucketVersioningRequest",
}) as any as S.Schema<GetBucketVersioningRequest>;
export type BucketVersioningStatus = "Enabled" | "Suspended" | (string & {});
export const BucketVersioningStatus = S.String;

export type MFADeleteStatus = "Enabled" | "Disabled" | (string & {});
export const MFADeleteStatus = S.String;

export interface GetBucketVersioningResult {
  Status?: BucketVersioningStatus;
  MFADelete?: MFADeleteStatus;
}
export const GetBucketVersioningResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: S.optional(BucketVersioningStatus),
    MFADelete: S.optional(MFADeleteStatus).pipe(T.XmlName("MfaDelete")),
  }).pipe(ns),
).annotate({
  identifier: "GetBucketVersioningResult",
}) as any as S.Schema<GetBucketVersioningResult>;
export type DurationSeconds = number;
export type Privilege = "Minimal" | "Default" | (string & {});
export const Privilege = S.String;

export type AuditContext = string;
export interface GetDataAccessRequest {
  AccountId: string;
  Target: string;
  Permission: Permission;
  DurationSeconds?: number;
  Privilege?: Privilege;
  TargetType?: S3PrefixType;
  AuditContext?: string;
}
export const GetDataAccessRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(
      T.HttpHeader("x-amz-account-id"),
      T.ContextParam("AccountId"),
      T.HostLabel(),
    ),
    Target: S.String.pipe(T.HttpQuery("target")),
    Permission: Permission.pipe(T.HttpQuery("permission")),
    DurationSeconds: S.optional(S.Number).pipe(T.HttpQuery("durationSeconds")),
    Privilege: S.optional(Privilege).pipe(T.HttpQuery("privilege")),
    TargetType: S.optional(S3PrefixType).pipe(T.HttpQuery("targetType")),
    AuditContext: S.optional(S.String).pipe(T.HttpQuery("auditContext")),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "GET",
        uri: "/v20180820/accessgrantsinstance/dataaccess",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ RequiresAccountId: { value: true } }),
    ),
  ),
).annotate({
  identifier: "GetDataAccessRequest",
}) as any as S.Schema<GetDataAccessRequest>;
export type AccessKeyId = string | redacted.Redacted<string>;
export type SecretAccessKey = string | redacted.Redacted<string>;
export type SessionToken = string | redacted.Redacted<string>;
export type Expiration = Date;
export interface Credentials {
  AccessKeyId?: string | redacted.Redacted<string>;
  SecretAccessKey?: string | redacted.Redacted<string>;
  SessionToken?: string | redacted.Redacted<string>;
  Expiration?: Date;
}
export const Credentials = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccessKeyId: S.optional(SensitiveString),
    SecretAccessKey: S.optional(SensitiveString),
    SessionToken: S.optional(SensitiveString),
    Expiration: S.optional(T.DateFromString),
  }),
).annotate({ identifier: "Credentials" }) as any as S.Schema<Credentials>;
export interface GetDataAccessResult {
  Credentials?: Credentials;
  MatchedGrantTarget?: string;
  Grantee?: Grantee;
}
export const GetDataAccessResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Credentials: S.optional(Credentials),
    MatchedGrantTarget: S.optional(S.String),
    Grantee: S.optional(Grantee),
  }).pipe(ns),
).annotate({
  identifier: "GetDataAccessResult",
}) as any as S.Schema<GetDataAccessResult>;
export interface GetJobTaggingRequest {
  AccountId: string;
  JobId: string;
}
export const GetJobTaggingRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(
      T.HttpHeader("x-amz-account-id"),
      T.ContextParam("AccountId"),
      T.HostLabel(),
    ),
    JobId: S.String.pipe(T.HttpLabel("JobId")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/v20180820/jobs/{JobId}/tagging" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ RequiresAccountId: { value: true } }),
    ),
  ),
).annotate({
  identifier: "GetJobTaggingRequest",
}) as any as S.Schema<GetJobTaggingRequest>;
export interface GetJobTaggingResult {
  Tags?: S3Tag[];
}
export const GetJobTaggingResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tags: S.optional(S3TagSet) }).pipe(ns),
).annotate({
  identifier: "GetJobTaggingResult",
}) as any as S.Schema<GetJobTaggingResult>;
export interface GetMultiRegionAccessPointRequest {
  AccountId: string;
  Name: string;
}
export const GetMultiRegionAccessPointRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(
      T.HttpHeader("x-amz-account-id"),
      T.ContextParam("AccountId"),
      T.HostLabel(),
    ),
    Name: S.String.pipe(T.HttpLabel("Name")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/v20180820/mrap/instances/{Name+}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ RequiresAccountId: { value: true } }),
    ),
  ),
).annotate({
  identifier: "GetMultiRegionAccessPointRequest",
}) as any as S.Schema<GetMultiRegionAccessPointRequest>;
export type MultiRegionAccessPointAlias = string;
export type MultiRegionAccessPointStatus =
  | "READY"
  | "INCONSISTENT_ACROSS_REGIONS"
  | "CREATING"
  | "PARTIALLY_CREATED"
  | "PARTIALLY_DELETED"
  | "DELETING"
  | (string & {});
export const MultiRegionAccessPointStatus = S.String;

export interface RegionReport {
  Bucket?: string;
  Region?: string;
  BucketAccountId?: string;
}
export const RegionReport = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Bucket: S.optional(S.String),
    Region: S.optional(S.String),
    BucketAccountId: S.optional(S.String),
  }),
).annotate({ identifier: "RegionReport" }) as any as S.Schema<RegionReport>;
export type RegionReportList = RegionReport[];
export const RegionReportList = /*@__PURE__*/ S.Array(
  RegionReport.pipe(T.XmlName("Region")).annotate({
    identifier: "RegionReport",
  }),
);
export interface MultiRegionAccessPointReport {
  Name?: string;
  Alias?: string;
  CreatedAt?: Date;
  PublicAccessBlock?: PublicAccessBlockConfiguration;
  Status?: MultiRegionAccessPointStatus;
  Regions?: RegionReport[];
}
export const MultiRegionAccessPointReport = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Alias: S.optional(S.String),
    CreatedAt: S.optional(T.DateFromString),
    PublicAccessBlock: S.optional(PublicAccessBlockConfiguration),
    Status: S.optional(MultiRegionAccessPointStatus),
    Regions: S.optional(RegionReportList),
  }),
).annotate({
  identifier: "MultiRegionAccessPointReport",
}) as any as S.Schema<MultiRegionAccessPointReport>;
export interface GetMultiRegionAccessPointResult {
  AccessPoint?: MultiRegionAccessPointReport;
}
export const GetMultiRegionAccessPointResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AccessPoint: S.optional(MultiRegionAccessPointReport) }).pipe(ns),
).annotate({
  identifier: "GetMultiRegionAccessPointResult",
}) as any as S.Schema<GetMultiRegionAccessPointResult>;
export interface GetMultiRegionAccessPointPolicyRequest {
  AccountId: string;
  Name: string;
}
export const GetMultiRegionAccessPointPolicyRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AccountId: S.String.pipe(
        T.HttpHeader("x-amz-account-id"),
        T.ContextParam("AccountId"),
        T.HostLabel(),
      ),
      Name: S.String.pipe(T.HttpLabel("Name")),
    }).pipe(
      T.all(
        ns,
        T.Http({
          method: "GET",
          uri: "/v20180820/mrap/instances/{Name+}/policy",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
        T.StaticContextParams({ RequiresAccountId: { value: true } }),
      ),
    ),
).annotate({
  identifier: "GetMultiRegionAccessPointPolicyRequest",
}) as any as S.Schema<GetMultiRegionAccessPointPolicyRequest>;
export interface EstablishedMultiRegionAccessPointPolicy {
  Policy?: string;
}
export const EstablishedMultiRegionAccessPointPolicy = /*@__PURE__*/ S.suspend(
  () => S.Struct({ Policy: S.optional(S.String) }),
).annotate({
  identifier: "EstablishedMultiRegionAccessPointPolicy",
}) as any as S.Schema<EstablishedMultiRegionAccessPointPolicy>;
export interface ProposedMultiRegionAccessPointPolicy {
  Policy?: string;
}
export const ProposedMultiRegionAccessPointPolicy = /*@__PURE__*/ S.suspend(
  () => S.Struct({ Policy: S.optional(S.String) }),
).annotate({
  identifier: "ProposedMultiRegionAccessPointPolicy",
}) as any as S.Schema<ProposedMultiRegionAccessPointPolicy>;
export interface MultiRegionAccessPointPolicyDocument {
  Established?: EstablishedMultiRegionAccessPointPolicy;
  Proposed?: ProposedMultiRegionAccessPointPolicy;
}
export const MultiRegionAccessPointPolicyDocument = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Established: S.optional(EstablishedMultiRegionAccessPointPolicy),
      Proposed: S.optional(ProposedMultiRegionAccessPointPolicy),
    }),
).annotate({
  identifier: "MultiRegionAccessPointPolicyDocument",
}) as any as S.Schema<MultiRegionAccessPointPolicyDocument>;
export interface GetMultiRegionAccessPointPolicyResult {
  Policy?: MultiRegionAccessPointPolicyDocument;
}
export const GetMultiRegionAccessPointPolicyResult = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ Policy: S.optional(MultiRegionAccessPointPolicyDocument) }).pipe(
      ns,
    ),
).annotate({
  identifier: "GetMultiRegionAccessPointPolicyResult",
}) as any as S.Schema<GetMultiRegionAccessPointPolicyResult>;
export interface GetMultiRegionAccessPointPolicyStatusRequest {
  AccountId: string;
  Name: string;
}
export const GetMultiRegionAccessPointPolicyStatusRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      AccountId: S.String.pipe(
        T.HttpHeader("x-amz-account-id"),
        T.ContextParam("AccountId"),
        T.HostLabel(),
      ),
      Name: S.String.pipe(T.HttpLabel("Name")),
    }).pipe(
      T.all(
        ns,
        T.Http({
          method: "GET",
          uri: "/v20180820/mrap/instances/{Name+}/policystatus",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
        T.StaticContextParams({ RequiresAccountId: { value: true } }),
      ),
    ),
  ).annotate({
    identifier: "GetMultiRegionAccessPointPolicyStatusRequest",
  }) as any as S.Schema<GetMultiRegionAccessPointPolicyStatusRequest>;
export interface GetMultiRegionAccessPointPolicyStatusResult {
  Established?: PolicyStatus;
}
export const GetMultiRegionAccessPointPolicyStatusResult =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ Established: S.optional(PolicyStatus) }).pipe(ns),
  ).annotate({
    identifier: "GetMultiRegionAccessPointPolicyStatusResult",
  }) as any as S.Schema<GetMultiRegionAccessPointPolicyStatusResult>;
export type MultiRegionAccessPointId = string;
export interface GetMultiRegionAccessPointRoutesRequest {
  AccountId: string;
  Mrap: string;
}
export const GetMultiRegionAccessPointRoutesRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AccountId: S.String.pipe(
        T.HttpHeader("x-amz-account-id"),
        T.ContextParam("AccountId"),
        T.HostLabel(),
      ),
      Mrap: S.String.pipe(T.HttpLabel("Mrap")),
    }).pipe(
      T.all(
        ns,
        T.Http({
          method: "GET",
          uri: "/v20180820/mrap/instances/{Mrap+}/routes",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
        T.StaticContextParams({ RequiresAccountId: { value: true } }),
      ),
    ),
).annotate({
  identifier: "GetMultiRegionAccessPointRoutesRequest",
}) as any as S.Schema<GetMultiRegionAccessPointRoutesRequest>;
export type TrafficDialPercentage = number;
export interface MultiRegionAccessPointRoute {
  Bucket?: string;
  Region?: string;
  TrafficDialPercentage: number;
}
export const MultiRegionAccessPointRoute = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Bucket: S.optional(S.String),
    Region: S.optional(S.String),
    TrafficDialPercentage: S.Number,
  }),
).annotate({
  identifier: "MultiRegionAccessPointRoute",
}) as any as S.Schema<MultiRegionAccessPointRoute>;
export type RouteList = MultiRegionAccessPointRoute[];
export const RouteList = /*@__PURE__*/ S.Array(
  MultiRegionAccessPointRoute.pipe(T.XmlName("Route")).annotate({
    identifier: "MultiRegionAccessPointRoute",
  }),
);
export interface GetMultiRegionAccessPointRoutesResult {
  Mrap?: string;
  Routes?: MultiRegionAccessPointRoute[];
}
export const GetMultiRegionAccessPointRoutesResult = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Mrap: S.optional(S.String),
      Routes: S.optional(RouteList),
    }).pipe(ns),
).annotate({
  identifier: "GetMultiRegionAccessPointRoutesResult",
}) as any as S.Schema<GetMultiRegionAccessPointRoutesResult>;
export interface GetPublicAccessBlockRequest {
  AccountId: string;
}
export const GetPublicAccessBlockRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(
      T.HttpHeader("x-amz-account-id"),
      T.ContextParam("AccountId"),
      T.HostLabel(),
    ),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "GET",
        uri: "/v20180820/configuration/publicAccessBlock",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ RequiresAccountId: { value: true } }),
    ),
  ),
).annotate({
  identifier: "GetPublicAccessBlockRequest",
}) as any as S.Schema<GetPublicAccessBlockRequest>;
export interface GetPublicAccessBlockOutput {
  PublicAccessBlockConfiguration?: PublicAccessBlockConfiguration;
}
export const GetPublicAccessBlockOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PublicAccessBlockConfiguration: S.optional(PublicAccessBlockConfiguration)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "PublicAccessBlockConfiguration" }),
  }).pipe(ns),
).annotate({
  identifier: "GetPublicAccessBlockOutput",
}) as any as S.Schema<GetPublicAccessBlockOutput>;
export interface GetStorageLensConfigurationRequest {
  ConfigId: string;
  AccountId: string;
}
export const GetStorageLensConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConfigId: S.String.pipe(T.HttpLabel("ConfigId")),
    AccountId: S.String.pipe(
      T.HttpHeader("x-amz-account-id"),
      T.ContextParam("AccountId"),
      T.HostLabel(),
    ),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/v20180820/storagelens/{ConfigId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ RequiresAccountId: { value: true } }),
    ),
  ),
).annotate({
  identifier: "GetStorageLensConfigurationRequest",
}) as any as S.Schema<GetStorageLensConfigurationRequest>;
export type IsEnabled = boolean;
export interface ActivityMetrics {
  IsEnabled?: boolean;
}
export const ActivityMetrics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ IsEnabled: S.optional(S.Boolean) }),
).annotate({
  identifier: "ActivityMetrics",
}) as any as S.Schema<ActivityMetrics>;
export type StorageLensPrefixLevelDelimiter = string;
export type StorageLensPrefixLevelMaxDepth = number;
export type MinStorageBytesPercentage = number;
export interface SelectionCriteria {
  Delimiter?: string;
  MaxDepth?: number;
  MinStorageBytesPercentage?: number;
}
export const SelectionCriteria = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Delimiter: S.optional(S.String),
    MaxDepth: S.optional(S.Number),
    MinStorageBytesPercentage: S.optional(S.Number),
  }),
).annotate({
  identifier: "SelectionCriteria",
}) as any as S.Schema<SelectionCriteria>;
export interface PrefixLevelStorageMetrics {
  IsEnabled?: boolean;
  SelectionCriteria?: SelectionCriteria;
}
export const PrefixLevelStorageMetrics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IsEnabled: S.optional(S.Boolean),
    SelectionCriteria: S.optional(SelectionCriteria),
  }),
).annotate({
  identifier: "PrefixLevelStorageMetrics",
}) as any as S.Schema<PrefixLevelStorageMetrics>;
export interface PrefixLevel {
  StorageMetrics: PrefixLevelStorageMetrics;
}
export const PrefixLevel = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ StorageMetrics: PrefixLevelStorageMetrics }),
).annotate({ identifier: "PrefixLevel" }) as any as S.Schema<PrefixLevel>;
export interface AdvancedCostOptimizationMetrics {
  IsEnabled?: boolean;
}
export const AdvancedCostOptimizationMetrics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ IsEnabled: S.optional(S.Boolean) }),
).annotate({
  identifier: "AdvancedCostOptimizationMetrics",
}) as any as S.Schema<AdvancedCostOptimizationMetrics>;
export interface AdvancedDataProtectionMetrics {
  IsEnabled?: boolean;
}
export const AdvancedDataProtectionMetrics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ IsEnabled: S.optional(S.Boolean) }),
).annotate({
  identifier: "AdvancedDataProtectionMetrics",
}) as any as S.Schema<AdvancedDataProtectionMetrics>;
export interface DetailedStatusCodesMetrics {
  IsEnabled?: boolean;
}
export const DetailedStatusCodesMetrics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ IsEnabled: S.optional(S.Boolean) }),
).annotate({
  identifier: "DetailedStatusCodesMetrics",
}) as any as S.Schema<DetailedStatusCodesMetrics>;
export interface AdvancedPerformanceMetrics {
  IsEnabled?: boolean;
}
export const AdvancedPerformanceMetrics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ IsEnabled: S.optional(S.Boolean) }),
).annotate({
  identifier: "AdvancedPerformanceMetrics",
}) as any as S.Schema<AdvancedPerformanceMetrics>;
export interface BucketLevel {
  ActivityMetrics?: ActivityMetrics;
  PrefixLevel?: PrefixLevel;
  AdvancedCostOptimizationMetrics?: AdvancedCostOptimizationMetrics;
  AdvancedDataProtectionMetrics?: AdvancedDataProtectionMetrics;
  DetailedStatusCodesMetrics?: DetailedStatusCodesMetrics;
  AdvancedPerformanceMetrics?: AdvancedPerformanceMetrics;
}
export const BucketLevel = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ActivityMetrics: S.optional(ActivityMetrics),
    PrefixLevel: S.optional(PrefixLevel),
    AdvancedCostOptimizationMetrics: S.optional(
      AdvancedCostOptimizationMetrics,
    ),
    AdvancedDataProtectionMetrics: S.optional(AdvancedDataProtectionMetrics),
    DetailedStatusCodesMetrics: S.optional(DetailedStatusCodesMetrics),
    AdvancedPerformanceMetrics: S.optional(AdvancedPerformanceMetrics),
  }),
).annotate({ identifier: "BucketLevel" }) as any as S.Schema<BucketLevel>;
export type StorageLensGroupLevelInclude = string[];
export const StorageLensGroupLevelInclude = /*@__PURE__*/ S.Array(
  S.String.pipe(T.XmlName("Arn")),
);
export type StorageLensGroupLevelExclude = string[];
export const StorageLensGroupLevelExclude = /*@__PURE__*/ S.Array(
  S.String.pipe(T.XmlName("Arn")),
);
export interface StorageLensGroupLevelSelectionCriteria {
  Include?: string[];
  Exclude?: string[];
}
export const StorageLensGroupLevelSelectionCriteria = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Include: S.optional(StorageLensGroupLevelInclude),
      Exclude: S.optional(StorageLensGroupLevelExclude),
    }),
).annotate({
  identifier: "StorageLensGroupLevelSelectionCriteria",
}) as any as S.Schema<StorageLensGroupLevelSelectionCriteria>;
export interface StorageLensGroupLevel {
  SelectionCriteria?: StorageLensGroupLevelSelectionCriteria;
}
export const StorageLensGroupLevel = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SelectionCriteria: S.optional(StorageLensGroupLevelSelectionCriteria),
  }),
).annotate({
  identifier: "StorageLensGroupLevel",
}) as any as S.Schema<StorageLensGroupLevel>;
export interface AccountLevel {
  ActivityMetrics?: ActivityMetrics;
  BucketLevel?: BucketLevel;
  AdvancedCostOptimizationMetrics?: AdvancedCostOptimizationMetrics;
  AdvancedDataProtectionMetrics?: AdvancedDataProtectionMetrics;
  DetailedStatusCodesMetrics?: DetailedStatusCodesMetrics;
  AdvancedPerformanceMetrics?: AdvancedPerformanceMetrics;
  StorageLensGroupLevel?: StorageLensGroupLevel;
}
export const AccountLevel = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ActivityMetrics: S.optional(ActivityMetrics),
    BucketLevel: S.optional(BucketLevel),
    AdvancedCostOptimizationMetrics: S.optional(
      AdvancedCostOptimizationMetrics,
    ),
    AdvancedDataProtectionMetrics: S.optional(AdvancedDataProtectionMetrics),
    DetailedStatusCodesMetrics: S.optional(DetailedStatusCodesMetrics),
    AdvancedPerformanceMetrics: S.optional(AdvancedPerformanceMetrics),
    StorageLensGroupLevel: S.optional(StorageLensGroupLevel),
  }),
).annotate({ identifier: "AccountLevel" }) as any as S.Schema<AccountLevel>;
export type Buckets = string[];
export const Buckets = /*@__PURE__*/ S.Array(S.String.pipe(T.XmlName("Arn")));
export type S3AWSRegion = string;
export type Regions = string[];
export const Regions = /*@__PURE__*/ S.Array(
  S.String.pipe(T.XmlName("Region")),
);
export interface Include {
  Buckets?: string[];
  Regions?: string[];
}
export const Include = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Buckets: S.optional(Buckets), Regions: S.optional(Regions) }),
).annotate({ identifier: "Include" }) as any as S.Schema<Include>;
export interface Exclude {
  Buckets?: string[];
  Regions?: string[];
}
export const Exclude = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Buckets: S.optional(Buckets), Regions: S.optional(Regions) }),
).annotate({ identifier: "Exclude" }) as any as S.Schema<Exclude>;
export type Format = "CSV" | "Parquet" | (string & {});
export const Format = S.String;

export type OutputSchemaVersion = "V_1" | (string & {});
export const OutputSchemaVersion = S.String;

export interface SSES3 {}
export const SSES3 = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(T.XmlName("SSE-S3")),
).annotate({ identifier: "SSES3" }) as any as S.Schema<SSES3>;
export type SSEKMSKeyId = string;
export interface SSEKMS {
  KeyId: string;
}
export const SSEKMS = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ KeyId: S.String }).pipe(T.XmlName("SSE-KMS")),
).annotate({ identifier: "SSEKMS" }) as any as S.Schema<SSEKMS>;
export interface StorageLensDataExportEncryption {
  SSES3?: SSES3;
  SSEKMS?: SSEKMS;
}
export const StorageLensDataExportEncryption = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SSES3: S.optional(SSES3)
      .pipe(T.XmlName("SSE-S3"))
      .annotate({ identifier: "SSES3" }),
    SSEKMS: S.optional(SSEKMS)
      .pipe(T.XmlName("SSE-KMS"))
      .annotate({ identifier: "SSEKMS" }),
  }),
).annotate({
  identifier: "StorageLensDataExportEncryption",
}) as any as S.Schema<StorageLensDataExportEncryption>;
export interface S3BucketDestination {
  Format: Format;
  OutputSchemaVersion: OutputSchemaVersion;
  AccountId: string;
  Arn: string;
  Prefix?: string;
  Encryption?: StorageLensDataExportEncryption;
}
export const S3BucketDestination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Format: Format,
    OutputSchemaVersion: OutputSchemaVersion,
    AccountId: S.String,
    Arn: S.String,
    Prefix: S.optional(S.String),
    Encryption: S.optional(StorageLensDataExportEncryption),
  }),
).annotate({
  identifier: "S3BucketDestination",
}) as any as S.Schema<S3BucketDestination>;
export interface CloudWatchMetrics {
  IsEnabled: boolean;
}
export const CloudWatchMetrics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ IsEnabled: S.Boolean }),
).annotate({
  identifier: "CloudWatchMetrics",
}) as any as S.Schema<CloudWatchMetrics>;
export interface StorageLensTableDestination {
  IsEnabled: boolean;
  Encryption?: StorageLensDataExportEncryption;
}
export const StorageLensTableDestination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IsEnabled: S.Boolean,
    Encryption: S.optional(StorageLensDataExportEncryption),
  }),
).annotate({
  identifier: "StorageLensTableDestination",
}) as any as S.Schema<StorageLensTableDestination>;
export interface StorageLensDataExport {
  S3BucketDestination?: S3BucketDestination;
  CloudWatchMetrics?: CloudWatchMetrics;
  StorageLensTableDestination?: StorageLensTableDestination;
}
export const StorageLensDataExport = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    S3BucketDestination: S.optional(S3BucketDestination),
    CloudWatchMetrics: S.optional(CloudWatchMetrics),
    StorageLensTableDestination: S.optional(StorageLensTableDestination),
  }),
).annotate({
  identifier: "StorageLensDataExport",
}) as any as S.Schema<StorageLensDataExport>;
export interface StorageLensExpandedPrefixesDataExport {
  S3BucketDestination?: S3BucketDestination;
  StorageLensTableDestination?: StorageLensTableDestination;
}
export const StorageLensExpandedPrefixesDataExport = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      S3BucketDestination: S.optional(S3BucketDestination),
      StorageLensTableDestination: S.optional(StorageLensTableDestination),
    }),
).annotate({
  identifier: "StorageLensExpandedPrefixesDataExport",
}) as any as S.Schema<StorageLensExpandedPrefixesDataExport>;
export type AwsOrgArn = string;
export interface StorageLensAwsOrg {
  Arn: string;
}
export const StorageLensAwsOrg = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.String }),
).annotate({
  identifier: "StorageLensAwsOrg",
}) as any as S.Schema<StorageLensAwsOrg>;
export type StorageLensArn = string;
export interface StorageLensConfiguration {
  Id: string;
  AccountLevel: AccountLevel;
  Include?: Include;
  Exclude?: Exclude;
  DataExport?: StorageLensDataExport;
  ExpandedPrefixesDataExport?: StorageLensExpandedPrefixesDataExport;
  IsEnabled: boolean;
  AwsOrg?: StorageLensAwsOrg;
  StorageLensArn?: string;
  PrefixDelimiter?: string;
}
export const StorageLensConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.String,
    AccountLevel: AccountLevel,
    Include: S.optional(Include),
    Exclude: S.optional(Exclude),
    DataExport: S.optional(StorageLensDataExport),
    ExpandedPrefixesDataExport: S.optional(
      StorageLensExpandedPrefixesDataExport,
    ),
    IsEnabled: S.Boolean,
    AwsOrg: S.optional(StorageLensAwsOrg),
    StorageLensArn: S.optional(S.String),
    PrefixDelimiter: S.optional(S.String),
  }),
).annotate({
  identifier: "StorageLensConfiguration",
}) as any as S.Schema<StorageLensConfiguration>;
export interface GetStorageLensConfigurationResult {
  StorageLensConfiguration?: StorageLensConfiguration;
}
export const GetStorageLensConfigurationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StorageLensConfiguration: S.optional(StorageLensConfiguration)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "StorageLensConfiguration" }),
  }).pipe(ns),
).annotate({
  identifier: "GetStorageLensConfigurationResult",
}) as any as S.Schema<GetStorageLensConfigurationResult>;
export interface GetStorageLensConfigurationTaggingRequest {
  ConfigId: string;
  AccountId: string;
}
export const GetStorageLensConfigurationTaggingRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ConfigId: S.String.pipe(T.HttpLabel("ConfigId")),
      AccountId: S.String.pipe(
        T.HttpHeader("x-amz-account-id"),
        T.ContextParam("AccountId"),
        T.HostLabel(),
      ),
    }).pipe(
      T.all(
        ns,
        T.Http({
          method: "GET",
          uri: "/v20180820/storagelens/{ConfigId}/tagging",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
        T.StaticContextParams({ RequiresAccountId: { value: true } }),
      ),
    ),
  ).annotate({
    identifier: "GetStorageLensConfigurationTaggingRequest",
  }) as any as S.Schema<GetStorageLensConfigurationTaggingRequest>;
export interface StorageLensTag {
  Key: string;
  Value: string;
}
export const StorageLensTag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.String, Value: S.String }),
).annotate({ identifier: "StorageLensTag" }) as any as S.Schema<StorageLensTag>;
export type StorageLensTags = StorageLensTag[];
export const StorageLensTags = /*@__PURE__*/ S.Array(
  StorageLensTag.pipe(T.XmlName("Tag")).annotate({
    identifier: "StorageLensTag",
  }),
);
export interface GetStorageLensConfigurationTaggingResult {
  Tags?: StorageLensTag[];
}
export const GetStorageLensConfigurationTaggingResult = /*@__PURE__*/ S.suspend(
  () => S.Struct({ Tags: S.optional(StorageLensTags) }).pipe(ns),
).annotate({
  identifier: "GetStorageLensConfigurationTaggingResult",
}) as any as S.Schema<GetStorageLensConfigurationTaggingResult>;
export interface GetStorageLensGroupRequest {
  Name: string;
  AccountId: string;
}
export const GetStorageLensGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String.pipe(T.HttpLabel("Name")),
    AccountId: S.String.pipe(
      T.HttpHeader("x-amz-account-id"),
      T.ContextParam("AccountId"),
      T.HostLabel(),
    ),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/v20180820/storagelensgroup/{Name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ RequiresAccountId: { value: true } }),
    ),
  ),
).annotate({
  identifier: "GetStorageLensGroupRequest",
}) as any as S.Schema<GetStorageLensGroupRequest>;
export interface GetStorageLensGroupResult {
  StorageLensGroup?: StorageLensGroup;
}
export const GetStorageLensGroupResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StorageLensGroup: S.optional(StorageLensGroup)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "StorageLensGroup" }),
  }).pipe(ns),
).annotate({
  identifier: "GetStorageLensGroupResult",
}) as any as S.Schema<GetStorageLensGroupResult>;
export type ContinuationToken = string;
export type MaxResults = number;
export interface ListAccessGrantsRequest {
  AccountId: string;
  NextToken?: string;
  MaxResults?: number;
  GranteeType?: GranteeType;
  GranteeIdentifier?: string;
  Permission?: Permission;
  GrantScope?: string;
  ApplicationArn?: string;
}
export const ListAccessGrantsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(
      T.HttpHeader("x-amz-account-id"),
      T.ContextParam("AccountId"),
      T.HostLabel(),
    ),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    GranteeType: S.optional(GranteeType).pipe(T.HttpQuery("granteetype")),
    GranteeIdentifier: S.optional(S.String).pipe(
      T.HttpQuery("granteeidentifier"),
    ),
    Permission: S.optional(Permission).pipe(T.HttpQuery("permission")),
    GrantScope: S.optional(S.String).pipe(T.HttpQuery("grantscope")),
    ApplicationArn: S.optional(S.String).pipe(T.HttpQuery("application_arn")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/v20180820/accessgrantsinstance/grants" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ RequiresAccountId: { value: true } }),
    ),
  ),
).annotate({
  identifier: "ListAccessGrantsRequest",
}) as any as S.Schema<ListAccessGrantsRequest>;
export interface ListAccessGrantEntry {
  CreatedAt?: Date;
  AccessGrantId?: string;
  AccessGrantArn?: string;
  Grantee?: Grantee;
  Permission?: Permission;
  AccessGrantsLocationId?: string;
  AccessGrantsLocationConfiguration?: AccessGrantsLocationConfiguration;
  GrantScope?: string;
  ApplicationArn?: string;
}
export const ListAccessGrantEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CreatedAt: S.optional(T.DateFromString),
    AccessGrantId: S.optional(S.String),
    AccessGrantArn: S.optional(S.String),
    Grantee: S.optional(Grantee),
    Permission: S.optional(Permission),
    AccessGrantsLocationId: S.optional(S.String),
    AccessGrantsLocationConfiguration: S.optional(
      AccessGrantsLocationConfiguration,
    ),
    GrantScope: S.optional(S.String),
    ApplicationArn: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAccessGrantEntry",
}) as any as S.Schema<ListAccessGrantEntry>;
export type AccessGrantsList = ListAccessGrantEntry[];
export const AccessGrantsList = /*@__PURE__*/ S.Array(
  ListAccessGrantEntry.pipe(T.XmlName("AccessGrant")).annotate({
    identifier: "ListAccessGrantEntry",
  }),
);
export interface ListAccessGrantsResult {
  NextToken?: string;
  AccessGrantsList?: ListAccessGrantEntry[];
}
export const ListAccessGrantsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    AccessGrantsList: S.optional(AccessGrantsList),
  }).pipe(ns),
).annotate({
  identifier: "ListAccessGrantsResult",
}) as any as S.Schema<ListAccessGrantsResult>;
export interface ListAccessGrantsInstancesRequest {
  AccountId: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListAccessGrantsInstancesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(
      T.HttpHeader("x-amz-account-id"),
      T.ContextParam("AccountId"),
      T.HostLabel(),
    ),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/v20180820/accessgrantsinstances" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ RequiresAccountId: { value: true } }),
    ),
  ),
).annotate({
  identifier: "ListAccessGrantsInstancesRequest",
}) as any as S.Schema<ListAccessGrantsInstancesRequest>;
export interface ListAccessGrantsInstanceEntry {
  AccessGrantsInstanceId?: string;
  AccessGrantsInstanceArn?: string;
  CreatedAt?: Date;
  IdentityCenterArn?: string;
  IdentityCenterInstanceArn?: string;
  IdentityCenterApplicationArn?: string;
}
export const ListAccessGrantsInstanceEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccessGrantsInstanceId: S.optional(S.String),
    AccessGrantsInstanceArn: S.optional(S.String),
    CreatedAt: S.optional(T.DateFromString),
    IdentityCenterArn: S.optional(S.String),
    IdentityCenterInstanceArn: S.optional(S.String),
    IdentityCenterApplicationArn: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAccessGrantsInstanceEntry",
}) as any as S.Schema<ListAccessGrantsInstanceEntry>;
export type AccessGrantsInstancesList = ListAccessGrantsInstanceEntry[];
export const AccessGrantsInstancesList = /*@__PURE__*/ S.Array(
  ListAccessGrantsInstanceEntry.pipe(
    T.XmlName("AccessGrantsInstance"),
  ).annotate({ identifier: "ListAccessGrantsInstanceEntry" }),
);
export interface ListAccessGrantsInstancesResult {
  NextToken?: string;
  AccessGrantsInstancesList?: ListAccessGrantsInstanceEntry[];
}
export const ListAccessGrantsInstancesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    AccessGrantsInstancesList: S.optional(AccessGrantsInstancesList),
  }).pipe(ns),
).annotate({
  identifier: "ListAccessGrantsInstancesResult",
}) as any as S.Schema<ListAccessGrantsInstancesResult>;
export interface ListAccessGrantsLocationsRequest {
  AccountId: string;
  NextToken?: string;
  MaxResults?: number;
  LocationScope?: string;
}
export const ListAccessGrantsLocationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(
      T.HttpHeader("x-amz-account-id"),
      T.ContextParam("AccountId"),
      T.HostLabel(),
    ),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    LocationScope: S.optional(S.String).pipe(T.HttpQuery("locationscope")),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "GET",
        uri: "/v20180820/accessgrantsinstance/locations",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ RequiresAccountId: { value: true } }),
    ),
  ),
).annotate({
  identifier: "ListAccessGrantsLocationsRequest",
}) as any as S.Schema<ListAccessGrantsLocationsRequest>;
export interface ListAccessGrantsLocationsEntry {
  CreatedAt?: Date;
  AccessGrantsLocationId?: string;
  AccessGrantsLocationArn?: string;
  LocationScope?: string;
  IAMRoleArn?: string;
}
export const ListAccessGrantsLocationsEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CreatedAt: S.optional(T.DateFromString),
    AccessGrantsLocationId: S.optional(S.String),
    AccessGrantsLocationArn: S.optional(S.String),
    LocationScope: S.optional(S.String),
    IAMRoleArn: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAccessGrantsLocationsEntry",
}) as any as S.Schema<ListAccessGrantsLocationsEntry>;
export type AccessGrantsLocationsList = ListAccessGrantsLocationsEntry[];
export const AccessGrantsLocationsList = /*@__PURE__*/ S.Array(
  ListAccessGrantsLocationsEntry.pipe(
    T.XmlName("AccessGrantsLocation"),
  ).annotate({ identifier: "ListAccessGrantsLocationsEntry" }),
);
export interface ListAccessGrantsLocationsResult {
  NextToken?: string;
  AccessGrantsLocationsList?: ListAccessGrantsLocationsEntry[];
}
export const ListAccessGrantsLocationsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    AccessGrantsLocationsList: S.optional(AccessGrantsLocationsList),
  }).pipe(ns),
).annotate({
  identifier: "ListAccessGrantsLocationsResult",
}) as any as S.Schema<ListAccessGrantsLocationsResult>;
export interface ListAccessPointsRequest {
  AccountId: string;
  Bucket?: string;
  NextToken?: string;
  MaxResults?: number;
  DataSourceId?: string;
  DataSourceType?: string;
}
export const ListAccessPointsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(
      T.HttpHeader("x-amz-account-id"),
      T.ContextParam("AccountId"),
      T.HostLabel(),
    ),
    Bucket: S.optional(S.String).pipe(
      T.HttpQuery("bucket"),
      T.ContextParam("Bucket"),
    ),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    DataSourceId: S.optional(S.String).pipe(T.HttpQuery("dataSourceId")),
    DataSourceType: S.optional(S.String).pipe(T.HttpQuery("dataSourceType")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/v20180820/accesspoint" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ RequiresAccountId: { value: true } }),
    ),
  ),
).annotate({
  identifier: "ListAccessPointsRequest",
}) as any as S.Schema<ListAccessPointsRequest>;
export interface AccessPoint {
  Name: string;
  NetworkOrigin: NetworkOrigin;
  VpcConfiguration?: VpcConfiguration;
  Bucket: string;
  AccessPointArn?: string;
  Alias?: string;
  BucketAccountId?: string;
  DataSourceId?: string;
  DataSourceType?: string;
}
export const AccessPoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    NetworkOrigin: NetworkOrigin,
    VpcConfiguration: S.optional(VpcConfiguration),
    Bucket: S.String,
    AccessPointArn: S.optional(S.String),
    Alias: S.optional(S.String),
    BucketAccountId: S.optional(S.String),
    DataSourceId: S.optional(S.String),
    DataSourceType: S.optional(S.String),
  }),
).annotate({ identifier: "AccessPoint" }) as any as S.Schema<AccessPoint>;
export type AccessPointList = AccessPoint[];
export const AccessPointList = /*@__PURE__*/ S.Array(
  AccessPoint.pipe(T.XmlName("AccessPoint")).annotate({
    identifier: "AccessPoint",
  }),
);
export interface ListAccessPointsResult {
  AccessPointList?: AccessPoint[];
  NextToken?: string;
}
export const ListAccessPointsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccessPointList: S.optional(AccessPointList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListAccessPointsResult",
}) as any as S.Schema<ListAccessPointsResult>;
export interface ListAccessPointsForDirectoryBucketsRequest {
  AccountId: string;
  DirectoryBucket?: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListAccessPointsForDirectoryBucketsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      AccountId: S.String.pipe(
        T.HttpHeader("x-amz-account-id"),
        T.ContextParam("AccountId"),
        T.HostLabel(),
      ),
      DirectoryBucket: S.optional(S.String).pipe(
        T.HttpQuery("directoryBucket"),
      ),
      NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
      MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "GET", uri: "/v20180820/accesspointfordirectory" }),
        svc,
        auth,
        proto,
        ver,
        rules,
        T.StaticContextParams({
          RequiresAccountId: { value: true },
          UseS3ExpressControlEndpoint: { value: true },
        }),
      ),
    ),
  ).annotate({
    identifier: "ListAccessPointsForDirectoryBucketsRequest",
  }) as any as S.Schema<ListAccessPointsForDirectoryBucketsRequest>;
export interface ListAccessPointsForDirectoryBucketsResult {
  AccessPointList?: AccessPoint[];
  NextToken?: string;
}
export const ListAccessPointsForDirectoryBucketsResult =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      AccessPointList: S.optional(AccessPointList),
      NextToken: S.optional(S.String),
    }).pipe(ns),
  ).annotate({
    identifier: "ListAccessPointsForDirectoryBucketsResult",
  }) as any as S.Schema<ListAccessPointsForDirectoryBucketsResult>;
export interface ListAccessPointsForObjectLambdaRequest {
  AccountId: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListAccessPointsForObjectLambdaRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AccountId: S.String.pipe(
        T.HttpHeader("x-amz-account-id"),
        T.ContextParam("AccountId"),
        T.HostLabel(),
      ),
      NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
      MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "GET", uri: "/v20180820/accesspointforobjectlambda" }),
        svc,
        auth,
        proto,
        ver,
        rules,
        T.StaticContextParams({ RequiresAccountId: { value: true } }),
      ),
    ),
).annotate({
  identifier: "ListAccessPointsForObjectLambdaRequest",
}) as any as S.Schema<ListAccessPointsForObjectLambdaRequest>;
export interface ObjectLambdaAccessPoint {
  Name: string;
  ObjectLambdaAccessPointArn?: string;
  Alias?: ObjectLambdaAccessPointAlias;
}
export const ObjectLambdaAccessPoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    ObjectLambdaAccessPointArn: S.optional(S.String),
    Alias: S.optional(ObjectLambdaAccessPointAlias),
  }),
).annotate({
  identifier: "ObjectLambdaAccessPoint",
}) as any as S.Schema<ObjectLambdaAccessPoint>;
export type ObjectLambdaAccessPointList = ObjectLambdaAccessPoint[];
export const ObjectLambdaAccessPointList = /*@__PURE__*/ S.Array(
  ObjectLambdaAccessPoint.pipe(T.XmlName("ObjectLambdaAccessPoint")).annotate({
    identifier: "ObjectLambdaAccessPoint",
  }),
);
export interface ListAccessPointsForObjectLambdaResult {
  ObjectLambdaAccessPointList?: ObjectLambdaAccessPoint[];
  NextToken?: string;
}
export const ListAccessPointsForObjectLambdaResult = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ObjectLambdaAccessPointList: S.optional(ObjectLambdaAccessPointList),
      NextToken: S.optional(S.String),
    }).pipe(ns),
).annotate({
  identifier: "ListAccessPointsForObjectLambdaResult",
}) as any as S.Schema<ListAccessPointsForObjectLambdaResult>;
export interface ListCallerAccessGrantsRequest {
  AccountId: string;
  GrantScope?: string;
  NextToken?: string;
  MaxResults?: number;
  AllowedByApplication?: boolean;
}
export const ListCallerAccessGrantsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(
      T.HttpHeader("x-amz-account-id"),
      T.ContextParam("AccountId"),
      T.HostLabel(),
    ),
    GrantScope: S.optional(S.String).pipe(T.HttpQuery("grantscope")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    AllowedByApplication: S.optional(S.Boolean).pipe(
      T.HttpQuery("allowedByApplication"),
    ),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "GET",
        uri: "/v20180820/accessgrantsinstance/caller/grants",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ RequiresAccountId: { value: true } }),
    ),
  ),
).annotate({
  identifier: "ListCallerAccessGrantsRequest",
}) as any as S.Schema<ListCallerAccessGrantsRequest>;
export interface ListCallerAccessGrantsEntry {
  Permission?: Permission;
  GrantScope?: string;
  ApplicationArn?: string;
}
export const ListCallerAccessGrantsEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Permission: S.optional(Permission),
    GrantScope: S.optional(S.String),
    ApplicationArn: S.optional(S.String),
  }),
).annotate({
  identifier: "ListCallerAccessGrantsEntry",
}) as any as S.Schema<ListCallerAccessGrantsEntry>;
export type CallerAccessGrantsList = ListCallerAccessGrantsEntry[];
export const CallerAccessGrantsList = /*@__PURE__*/ S.Array(
  ListCallerAccessGrantsEntry.pipe(T.XmlName("AccessGrant")).annotate({
    identifier: "ListCallerAccessGrantsEntry",
  }),
);
export interface ListCallerAccessGrantsResult {
  NextToken?: string;
  CallerAccessGrantsList?: ListCallerAccessGrantsEntry[];
}
export const ListCallerAccessGrantsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    CallerAccessGrantsList: S.optional(CallerAccessGrantsList),
  }).pipe(ns),
).annotate({
  identifier: "ListCallerAccessGrantsResult",
}) as any as S.Schema<ListCallerAccessGrantsResult>;
export type JobStatusList = JobStatus[];
export const JobStatusList = /*@__PURE__*/ S.Array(JobStatus);
export type StringForNextToken = string;
export interface ListJobsRequest {
  AccountId: string;
  JobStatuses?: JobStatus[];
  NextToken?: string;
  MaxResults?: number;
}
export const ListJobsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(
      T.HttpHeader("x-amz-account-id"),
      T.ContextParam("AccountId"),
      T.HostLabel(),
    ),
    JobStatuses: S.optional(JobStatusList).pipe(T.HttpQuery("jobStatuses")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/v20180820/jobs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ RequiresAccountId: { value: true } }),
    ),
  ),
).annotate({
  identifier: "ListJobsRequest",
}) as any as S.Schema<ListJobsRequest>;
export type OperationName =
  | "LambdaInvoke"
  | "S3PutObjectCopy"
  | "S3PutObjectAcl"
  | "S3PutObjectTagging"
  | "S3DeleteObjectTagging"
  | "S3InitiateRestoreObject"
  | "S3PutObjectLegalHold"
  | "S3PutObjectRetention"
  | "S3ReplicateObject"
  | "S3ComputeObjectChecksum"
  | "S3UpdateObjectEncryption"
  | (string & {});
export const OperationName = S.String;

export interface JobListDescriptor {
  JobId?: string;
  Description?: string;
  Operation?: OperationName;
  Priority?: number;
  Status?: JobStatus;
  CreationTime?: Date;
  TerminationDate?: Date;
  ProgressSummary?: JobProgressSummary;
}
export const JobListDescriptor = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobId: S.optional(S.String),
    Description: S.optional(S.String),
    Operation: S.optional(OperationName),
    Priority: S.optional(S.Number),
    Status: S.optional(JobStatus),
    CreationTime: S.optional(T.DateFromString),
    TerminationDate: S.optional(T.DateFromString),
    ProgressSummary: S.optional(JobProgressSummary),
  }),
).annotate({
  identifier: "JobListDescriptor",
}) as any as S.Schema<JobListDescriptor>;
export type JobListDescriptorList = JobListDescriptor[];
export const JobListDescriptorList = /*@__PURE__*/ S.Array(JobListDescriptor);
export interface ListJobsResult {
  NextToken?: string;
  Jobs?: JobListDescriptor[];
}
export const ListJobsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    Jobs: S.optional(JobListDescriptorList),
  }).pipe(ns),
).annotate({ identifier: "ListJobsResult" }) as any as S.Schema<ListJobsResult>;
export interface ListMultiRegionAccessPointsRequest {
  AccountId: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListMultiRegionAccessPointsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(
      T.HttpHeader("x-amz-account-id"),
      T.ContextParam("AccountId"),
      T.HostLabel(),
    ),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/v20180820/mrap/instances" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ RequiresAccountId: { value: true } }),
    ),
  ),
).annotate({
  identifier: "ListMultiRegionAccessPointsRequest",
}) as any as S.Schema<ListMultiRegionAccessPointsRequest>;
export type MultiRegionAccessPointReportList = MultiRegionAccessPointReport[];
export const MultiRegionAccessPointReportList = /*@__PURE__*/ S.Array(
  MultiRegionAccessPointReport.pipe(T.XmlName("AccessPoint")).annotate({
    identifier: "MultiRegionAccessPointReport",
  }),
);
export interface ListMultiRegionAccessPointsResult {
  AccessPoints?: MultiRegionAccessPointReport[];
  NextToken?: string;
}
export const ListMultiRegionAccessPointsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccessPoints: S.optional(MultiRegionAccessPointReportList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListMultiRegionAccessPointsResult",
}) as any as S.Schema<ListMultiRegionAccessPointsResult>;
export interface ListRegionalBucketsRequest {
  AccountId: string;
  NextToken?: string;
  MaxResults?: number;
  OutpostId?: string;
}
export const ListRegionalBucketsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(
      T.HttpHeader("x-amz-account-id"),
      T.ContextParam("AccountId"),
      T.HostLabel(),
    ),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    OutpostId: S.optional(S.String).pipe(
      T.HttpHeader("x-amz-outpost-id"),
      T.ContextParam("OutpostId"),
    ),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/v20180820/bucket" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ RequiresAccountId: { value: true } }),
    ),
  ),
).annotate({
  identifier: "ListRegionalBucketsRequest",
}) as any as S.Schema<ListRegionalBucketsRequest>;
export interface RegionalBucket {
  Bucket: string;
  BucketArn?: string;
  PublicAccessBlockEnabled: boolean;
  CreationDate: Date;
  OutpostId?: string;
}
export const RegionalBucket = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Bucket: S.String,
    BucketArn: S.optional(S.String),
    PublicAccessBlockEnabled: S.Boolean,
    CreationDate: T.DateFromString,
    OutpostId: S.optional(S.String),
  }),
).annotate({ identifier: "RegionalBucket" }) as any as S.Schema<RegionalBucket>;
export type RegionalBucketList = RegionalBucket[];
export const RegionalBucketList = /*@__PURE__*/ S.Array(
  RegionalBucket.pipe(T.XmlName("RegionalBucket")).annotate({
    identifier: "RegionalBucket",
  }),
);
export interface ListRegionalBucketsResult {
  RegionalBucketList?: RegionalBucket[];
  NextToken?: string;
}
export const ListRegionalBucketsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RegionalBucketList: S.optional(RegionalBucketList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListRegionalBucketsResult",
}) as any as S.Schema<ListRegionalBucketsResult>;
export interface ListStorageLensConfigurationsRequest {
  AccountId: string;
  NextToken?: string;
}
export const ListStorageLensConfigurationsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AccountId: S.String.pipe(
        T.HttpHeader("x-amz-account-id"),
        T.ContextParam("AccountId"),
        T.HostLabel(),
      ),
      NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "GET", uri: "/v20180820/storagelens" }),
        svc,
        auth,
        proto,
        ver,
        rules,
        T.StaticContextParams({ RequiresAccountId: { value: true } }),
      ),
    ),
).annotate({
  identifier: "ListStorageLensConfigurationsRequest",
}) as any as S.Schema<ListStorageLensConfigurationsRequest>;
export interface ListStorageLensConfigurationEntry {
  Id: string;
  StorageLensArn: string;
  HomeRegion: string;
  IsEnabled?: boolean;
}
export const ListStorageLensConfigurationEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.String,
    StorageLensArn: S.String,
    HomeRegion: S.String,
    IsEnabled: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "ListStorageLensConfigurationEntry",
}) as any as S.Schema<ListStorageLensConfigurationEntry>;
export type StorageLensConfigurationList = ListStorageLensConfigurationEntry[];
export const StorageLensConfigurationList = /*@__PURE__*/ S.Array(
  ListStorageLensConfigurationEntry.pipe(
    T.XmlName("StorageLensConfiguration"),
  ).annotate({ identifier: "ListStorageLensConfigurationEntry" }),
);
export interface ListStorageLensConfigurationsResult {
  NextToken?: string;
  StorageLensConfigurationList?: ListStorageLensConfigurationEntry[];
}
export const ListStorageLensConfigurationsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    StorageLensConfigurationList: S.optional(StorageLensConfigurationList).pipe(
      T.XmlName("StorageLensConfiguration"),
      T.XmlFlattened(),
    ),
  }).pipe(T.all(T.XmlName("ListStorageLensConfigurationResult"), ns)),
).annotate({
  identifier: "ListStorageLensConfigurationsResult",
}) as any as S.Schema<ListStorageLensConfigurationsResult>;
export interface ListStorageLensGroupsRequest {
  AccountId: string;
  NextToken?: string;
}
export const ListStorageLensGroupsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(
      T.HttpHeader("x-amz-account-id"),
      T.ContextParam("AccountId"),
      T.HostLabel(),
    ),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/v20180820/storagelensgroup" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ RequiresAccountId: { value: true } }),
    ),
  ),
).annotate({
  identifier: "ListStorageLensGroupsRequest",
}) as any as S.Schema<ListStorageLensGroupsRequest>;
export interface ListStorageLensGroupEntry {
  Name: string;
  StorageLensGroupArn: string;
  HomeRegion: string;
}
export const ListStorageLensGroupEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    StorageLensGroupArn: S.String,
    HomeRegion: S.String,
  }),
).annotate({
  identifier: "ListStorageLensGroupEntry",
}) as any as S.Schema<ListStorageLensGroupEntry>;
export type StorageLensGroupList = ListStorageLensGroupEntry[];
export const StorageLensGroupList = /*@__PURE__*/ S.Array(
  ListStorageLensGroupEntry.pipe(T.XmlName("StorageLensGroup")).annotate({
    identifier: "ListStorageLensGroupEntry",
  }),
);
export interface ListStorageLensGroupsResult {
  NextToken?: string;
  StorageLensGroupList?: ListStorageLensGroupEntry[];
}
export const ListStorageLensGroupsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    StorageLensGroupList: S.optional(StorageLensGroupList).pipe(
      T.XmlName("StorageLensGroup"),
      T.XmlFlattened(),
    ),
  }).pipe(ns),
).annotate({
  identifier: "ListStorageLensGroupsResult",
}) as any as S.Schema<ListStorageLensGroupsResult>;
export type S3ResourceArn = string;
export interface ListTagsForResourceRequest {
  AccountId: string;
  ResourceArn: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(
      T.HttpHeader("x-amz-account-id"),
      T.ContextParam("AccountId"),
      T.HostLabel(),
    ),
    ResourceArn: S.String.pipe(
      T.HttpLabel("ResourceArn"),
      T.ContextParam("ResourceArn"),
    ),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/v20180820/tags/{ResourceArn+}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ RequiresAccountId: { value: true } }),
    ),
  ),
).annotate({
  identifier: "ListTagsForResourceRequest",
}) as any as S.Schema<ListTagsForResourceRequest>;
export interface ListTagsForResourceResult {
  Tags?: Tag[];
}
export const ListTagsForResourceResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tags: S.optional(TagList) }).pipe(ns),
).annotate({
  identifier: "ListTagsForResourceResult",
}) as any as S.Schema<ListTagsForResourceResult>;
export interface PutAccessGrantsInstanceResourcePolicyRequest {
  AccountId: string;
  Policy: string;
  Organization?: string;
}
export const PutAccessGrantsInstanceResourcePolicyRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      AccountId: S.String.pipe(
        T.HttpHeader("x-amz-account-id"),
        T.ContextParam("AccountId"),
        T.HostLabel(),
      ),
      Policy: S.String,
      Organization: S.optional(S.String),
    }).pipe(
      T.all(
        ns,
        T.Http({
          method: "PUT",
          uri: "/v20180820/accessgrantsinstance/resourcepolicy",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
        T.StaticContextParams({ RequiresAccountId: { value: true } }),
      ),
    ),
  ).annotate({
    identifier: "PutAccessGrantsInstanceResourcePolicyRequest",
  }) as any as S.Schema<PutAccessGrantsInstanceResourcePolicyRequest>;
export interface PutAccessGrantsInstanceResourcePolicyResult {
  Policy?: string;
  Organization?: string;
  CreatedAt?: Date;
}
export const PutAccessGrantsInstanceResourcePolicyResult =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Policy: S.optional(S.String),
      Organization: S.optional(S.String),
      CreatedAt: S.optional(T.DateFromString),
    }).pipe(ns),
  ).annotate({
    identifier: "PutAccessGrantsInstanceResourcePolicyResult",
  }) as any as S.Schema<PutAccessGrantsInstanceResourcePolicyResult>;
export interface PutAccessPointConfigurationForObjectLambdaRequest {
  AccountId: string;
  Name: string;
  Configuration: ObjectLambdaConfiguration;
}
export const PutAccessPointConfigurationForObjectLambdaRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      AccountId: S.String.pipe(
        T.HttpHeader("x-amz-account-id"),
        T.ContextParam("AccountId"),
        T.HostLabel(),
      ),
      Name: S.String.pipe(T.HttpLabel("Name")),
      Configuration: ObjectLambdaConfiguration,
    }).pipe(
      T.all(
        ns,
        T.Http({
          method: "PUT",
          uri: "/v20180820/accesspointforobjectlambda/{Name}/configuration",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
        T.StaticContextParams({ RequiresAccountId: { value: true } }),
      ),
    ),
  ).annotate({
    identifier: "PutAccessPointConfigurationForObjectLambdaRequest",
  }) as any as S.Schema<PutAccessPointConfigurationForObjectLambdaRequest>;
export interface PutAccessPointConfigurationForObjectLambdaResponse {}
export const PutAccessPointConfigurationForObjectLambdaResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({}).pipe(ns)).annotate({
    identifier: "PutAccessPointConfigurationForObjectLambdaResponse",
  }) as any as S.Schema<PutAccessPointConfigurationForObjectLambdaResponse>;
export interface PutAccessPointPolicyRequest {
  AccountId: string;
  Name: string;
  Policy: string;
}
export const PutAccessPointPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(
      T.HttpHeader("x-amz-account-id"),
      T.ContextParam("AccountId"),
      T.HostLabel(),
    ),
    Name: S.String.pipe(T.HttpLabel("Name"), T.ContextParam("AccessPointName")),
    Policy: S.String,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "PUT", uri: "/v20180820/accesspoint/{Name}/policy" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ RequiresAccountId: { value: true } }),
    ),
  ),
).annotate({
  identifier: "PutAccessPointPolicyRequest",
}) as any as S.Schema<PutAccessPointPolicyRequest>;
export interface PutAccessPointPolicyResponse {}
export const PutAccessPointPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "PutAccessPointPolicyResponse",
}) as any as S.Schema<PutAccessPointPolicyResponse>;
export interface PutAccessPointPolicyForObjectLambdaRequest {
  AccountId: string;
  Name: string;
  Policy: string;
}
export const PutAccessPointPolicyForObjectLambdaRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      AccountId: S.String.pipe(
        T.HttpHeader("x-amz-account-id"),
        T.ContextParam("AccountId"),
        T.HostLabel(),
      ),
      Name: S.String.pipe(T.HttpLabel("Name")),
      Policy: S.String,
    }).pipe(
      T.all(
        ns,
        T.Http({
          method: "PUT",
          uri: "/v20180820/accesspointforobjectlambda/{Name}/policy",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
        T.StaticContextParams({ RequiresAccountId: { value: true } }),
      ),
    ),
  ).annotate({
    identifier: "PutAccessPointPolicyForObjectLambdaRequest",
  }) as any as S.Schema<PutAccessPointPolicyForObjectLambdaRequest>;
export interface PutAccessPointPolicyForObjectLambdaResponse {}
export const PutAccessPointPolicyForObjectLambdaResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({}).pipe(ns)).annotate({
    identifier: "PutAccessPointPolicyForObjectLambdaResponse",
  }) as any as S.Schema<PutAccessPointPolicyForObjectLambdaResponse>;
export interface PutAccessPointScopeRequest {
  AccountId: string;
  Name: string;
  Scope: Scope;
}
export const PutAccessPointScopeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(
      T.HttpHeader("x-amz-account-id"),
      T.ContextParam("AccountId"),
      T.HostLabel(),
    ),
    Name: S.String.pipe(T.HttpLabel("Name"), T.ContextParam("AccessPointName")),
    Scope: Scope,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "PUT", uri: "/v20180820/accesspoint/{Name}/scope" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({
        RequiresAccountId: { value: true },
        UseS3ExpressControlEndpoint: { value: true },
      }),
    ),
  ),
).annotate({
  identifier: "PutAccessPointScopeRequest",
}) as any as S.Schema<PutAccessPointScopeRequest>;
export interface PutAccessPointScopeResponse {}
export const PutAccessPointScopeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "PutAccessPointScopeResponse",
}) as any as S.Schema<PutAccessPointScopeResponse>;
export interface LifecycleConfiguration {
  Rules?: LifecycleRule[];
}
export const LifecycleConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Rules: S.optional(LifecycleRules) }),
).annotate({
  identifier: "LifecycleConfiguration",
}) as any as S.Schema<LifecycleConfiguration>;
export interface PutBucketLifecycleConfigurationRequest {
  AccountId: string;
  Bucket: string;
  LifecycleConfiguration?: LifecycleConfiguration;
}
export const PutBucketLifecycleConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AccountId: S.String.pipe(
        T.HttpHeader("x-amz-account-id"),
        T.ContextParam("AccountId"),
        T.HostLabel(),
      ),
      Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
      LifecycleConfiguration: S.optional(LifecycleConfiguration)
        .pipe(T.HttpPayload(), T.XmlName("LifecycleConfiguration"))
        .annotate({ identifier: "LifecycleConfiguration" }),
    }).pipe(
      T.all(
        ns,
        T.Http({
          method: "PUT",
          uri: "/v20180820/bucket/{Bucket}/lifecycleconfiguration",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
        T.StaticContextParams({ RequiresAccountId: { value: true } }),
      ),
    ),
).annotate({
  identifier: "PutBucketLifecycleConfigurationRequest",
}) as any as S.Schema<PutBucketLifecycleConfigurationRequest>;
export interface PutBucketLifecycleConfigurationResponse {}
export const PutBucketLifecycleConfigurationResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}).pipe(ns),
).annotate({
  identifier: "PutBucketLifecycleConfigurationResponse",
}) as any as S.Schema<PutBucketLifecycleConfigurationResponse>;
export type ConfirmRemoveSelfBucketAccess = boolean;
export interface PutBucketPolicyRequest {
  AccountId: string;
  Bucket: string;
  ConfirmRemoveSelfBucketAccess?: boolean;
  Policy: string;
}
export const PutBucketPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(
      T.HttpHeader("x-amz-account-id"),
      T.ContextParam("AccountId"),
      T.HostLabel(),
    ),
    Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
    ConfirmRemoveSelfBucketAccess: S.optional(S.Boolean).pipe(
      T.HttpHeader("x-amz-confirm-remove-self-bucket-access"),
    ),
    Policy: S.String,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "PUT", uri: "/v20180820/bucket/{Bucket}/policy" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ RequiresAccountId: { value: true } }),
    ),
  ),
).annotate({
  identifier: "PutBucketPolicyRequest",
}) as any as S.Schema<PutBucketPolicyRequest>;
export interface PutBucketPolicyResponse {}
export const PutBucketPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "PutBucketPolicyResponse",
}) as any as S.Schema<PutBucketPolicyResponse>;
export interface PutBucketReplicationRequest {
  AccountId: string;
  Bucket: string;
  ReplicationConfiguration: ReplicationConfiguration;
}
export const PutBucketReplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(
      T.HttpHeader("x-amz-account-id"),
      T.ContextParam("AccountId"),
      T.HostLabel(),
    ),
    Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
    ReplicationConfiguration: ReplicationConfiguration.pipe(
      T.HttpPayload(),
      T.XmlName("ReplicationConfiguration"),
    ).annotate({ identifier: "ReplicationConfiguration" }),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "PUT", uri: "/v20180820/bucket/{Bucket}/replication" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ RequiresAccountId: { value: true } }),
    ),
  ),
).annotate({
  identifier: "PutBucketReplicationRequest",
}) as any as S.Schema<PutBucketReplicationRequest>;
export interface PutBucketReplicationResponse {}
export const PutBucketReplicationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "PutBucketReplicationResponse",
}) as any as S.Schema<PutBucketReplicationResponse>;
export interface Tagging {
  TagSet: S3Tag[];
}
export const Tagging = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TagSet: S3TagSet }),
).annotate({ identifier: "Tagging" }) as any as S.Schema<Tagging>;
export interface PutBucketTaggingRequest {
  AccountId: string;
  Bucket: string;
  Tagging: Tagging;
}
export const PutBucketTaggingRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(
      T.HttpHeader("x-amz-account-id"),
      T.ContextParam("AccountId"),
      T.HostLabel(),
    ),
    Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
    Tagging: Tagging.pipe(T.HttpPayload(), T.XmlName("Tagging")).annotate({
      identifier: "Tagging",
    }),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "PUT", uri: "/v20180820/bucket/{Bucket}/tagging" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ RequiresAccountId: { value: true } }),
    ),
  ),
).annotate({
  identifier: "PutBucketTaggingRequest",
}) as any as S.Schema<PutBucketTaggingRequest>;
export interface PutBucketTaggingResponse {}
export const PutBucketTaggingResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "PutBucketTaggingResponse",
}) as any as S.Schema<PutBucketTaggingResponse>;
export type MFA = string;
export type MFADelete = "Enabled" | "Disabled" | (string & {});
export const MFADelete = S.String;

export interface VersioningConfiguration {
  MFADelete?: MFADelete;
  Status?: BucketVersioningStatus;
}
export const VersioningConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MFADelete: S.optional(MFADelete).pipe(T.XmlName("MfaDelete")),
    Status: S.optional(BucketVersioningStatus),
  }),
).annotate({
  identifier: "VersioningConfiguration",
}) as any as S.Schema<VersioningConfiguration>;
export interface PutBucketVersioningRequest {
  AccountId: string;
  Bucket: string;
  MFA?: string;
  VersioningConfiguration: VersioningConfiguration;
}
export const PutBucketVersioningRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(
      T.HttpHeader("x-amz-account-id"),
      T.ContextParam("AccountId"),
      T.HostLabel(),
    ),
    Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
    MFA: S.optional(S.String).pipe(T.HttpHeader("x-amz-mfa")),
    VersioningConfiguration: VersioningConfiguration.pipe(
      T.HttpPayload(),
      T.XmlName("VersioningConfiguration"),
    ).annotate({ identifier: "VersioningConfiguration" }),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "PUT", uri: "/v20180820/bucket/{Bucket}/versioning" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ RequiresAccountId: { value: true } }),
    ),
  ),
).annotate({
  identifier: "PutBucketVersioningRequest",
}) as any as S.Schema<PutBucketVersioningRequest>;
export interface PutBucketVersioningResponse {}
export const PutBucketVersioningResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "PutBucketVersioningResponse",
}) as any as S.Schema<PutBucketVersioningResponse>;
export interface PutJobTaggingRequest {
  AccountId: string;
  JobId: string;
  Tags: S3Tag[];
}
export const PutJobTaggingRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(
      T.HttpHeader("x-amz-account-id"),
      T.ContextParam("AccountId"),
      T.HostLabel(),
    ),
    JobId: S.String.pipe(T.HttpLabel("JobId")),
    Tags: S3TagSet,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "PUT", uri: "/v20180820/jobs/{JobId}/tagging" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ RequiresAccountId: { value: true } }),
    ),
  ),
).annotate({
  identifier: "PutJobTaggingRequest",
}) as any as S.Schema<PutJobTaggingRequest>;
export interface PutJobTaggingResult {}
export const PutJobTaggingResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "PutJobTaggingResult",
}) as any as S.Schema<PutJobTaggingResult>;
export interface PutMultiRegionAccessPointPolicyRequest {
  AccountId: string;
  ClientToken: string;
  Details: PutMultiRegionAccessPointPolicyInput;
}
export const PutMultiRegionAccessPointPolicyRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AccountId: S.String.pipe(
        T.HttpHeader("x-amz-account-id"),
        T.ContextParam("AccountId"),
        T.HostLabel(),
      ),
      ClientToken: S.String.pipe(T.IdempotencyToken()),
      Details: PutMultiRegionAccessPointPolicyInput,
    }).pipe(
      T.all(
        ns,
        T.Http({
          method: "POST",
          uri: "/v20180820/async-requests/mrap/put-policy",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
        T.StaticContextParams({ RequiresAccountId: { value: true } }),
      ),
    ),
).annotate({
  identifier: "PutMultiRegionAccessPointPolicyRequest",
}) as any as S.Schema<PutMultiRegionAccessPointPolicyRequest>;
export interface PutMultiRegionAccessPointPolicyResult {
  RequestTokenARN?: string;
}
export const PutMultiRegionAccessPointPolicyResult = /*@__PURE__*/ S.suspend(
  () => S.Struct({ RequestTokenARN: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "PutMultiRegionAccessPointPolicyResult",
}) as any as S.Schema<PutMultiRegionAccessPointPolicyResult>;
export interface PutPublicAccessBlockRequest {
  PublicAccessBlockConfiguration: PublicAccessBlockConfiguration;
  AccountId: string;
}
export const PutPublicAccessBlockRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PublicAccessBlockConfiguration: PublicAccessBlockConfiguration.pipe(
      T.HttpPayload(),
      T.XmlName("PublicAccessBlockConfiguration"),
    ).annotate({ identifier: "PublicAccessBlockConfiguration" }),
    AccountId: S.String.pipe(
      T.HttpHeader("x-amz-account-id"),
      T.ContextParam("AccountId"),
      T.HostLabel(),
    ),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "PUT",
        uri: "/v20180820/configuration/publicAccessBlock",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ RequiresAccountId: { value: true } }),
    ),
  ),
).annotate({
  identifier: "PutPublicAccessBlockRequest",
}) as any as S.Schema<PutPublicAccessBlockRequest>;
export interface PutPublicAccessBlockResponse {}
export const PutPublicAccessBlockResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "PutPublicAccessBlockResponse",
}) as any as S.Schema<PutPublicAccessBlockResponse>;
export interface PutStorageLensConfigurationRequest {
  ConfigId: string;
  AccountId: string;
  StorageLensConfiguration: StorageLensConfiguration;
  Tags?: StorageLensTag[];
}
export const PutStorageLensConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConfigId: S.String.pipe(T.HttpLabel("ConfigId")),
    AccountId: S.String.pipe(
      T.HttpHeader("x-amz-account-id"),
      T.ContextParam("AccountId"),
      T.HostLabel(),
    ),
    StorageLensConfiguration: StorageLensConfiguration,
    Tags: S.optional(StorageLensTags),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "PUT", uri: "/v20180820/storagelens/{ConfigId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ RequiresAccountId: { value: true } }),
    ),
  ),
).annotate({
  identifier: "PutStorageLensConfigurationRequest",
}) as any as S.Schema<PutStorageLensConfigurationRequest>;
export interface PutStorageLensConfigurationResponse {}
export const PutStorageLensConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "PutStorageLensConfigurationResponse",
}) as any as S.Schema<PutStorageLensConfigurationResponse>;
export interface PutStorageLensConfigurationTaggingRequest {
  ConfigId: string;
  AccountId: string;
  Tags: StorageLensTag[];
}
export const PutStorageLensConfigurationTaggingRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ConfigId: S.String.pipe(T.HttpLabel("ConfigId")),
      AccountId: S.String.pipe(
        T.HttpHeader("x-amz-account-id"),
        T.ContextParam("AccountId"),
        T.HostLabel(),
      ),
      Tags: StorageLensTags,
    }).pipe(
      T.all(
        ns,
        T.Http({
          method: "PUT",
          uri: "/v20180820/storagelens/{ConfigId}/tagging",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
        T.StaticContextParams({ RequiresAccountId: { value: true } }),
      ),
    ),
  ).annotate({
    identifier: "PutStorageLensConfigurationTaggingRequest",
  }) as any as S.Schema<PutStorageLensConfigurationTaggingRequest>;
export interface PutStorageLensConfigurationTaggingResult {}
export const PutStorageLensConfigurationTaggingResult = /*@__PURE__*/ S.suspend(
  () => S.Struct({}).pipe(ns),
).annotate({
  identifier: "PutStorageLensConfigurationTaggingResult",
}) as any as S.Schema<PutStorageLensConfigurationTaggingResult>;
export interface SubmitMultiRegionAccessPointRoutesRequest {
  AccountId: string;
  Mrap: string;
  RouteUpdates: MultiRegionAccessPointRoute[];
}
export const SubmitMultiRegionAccessPointRoutesRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      AccountId: S.String.pipe(
        T.HttpHeader("x-amz-account-id"),
        T.ContextParam("AccountId"),
        T.HostLabel(),
      ),
      Mrap: S.String.pipe(T.HttpLabel("Mrap")),
      RouteUpdates: RouteList,
    }).pipe(
      T.all(
        ns,
        T.Http({
          method: "PATCH",
          uri: "/v20180820/mrap/instances/{Mrap+}/routes",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
        T.StaticContextParams({ RequiresAccountId: { value: true } }),
      ),
    ),
  ).annotate({
    identifier: "SubmitMultiRegionAccessPointRoutesRequest",
  }) as any as S.Schema<SubmitMultiRegionAccessPointRoutesRequest>;
export interface SubmitMultiRegionAccessPointRoutesResult {}
export const SubmitMultiRegionAccessPointRoutesResult = /*@__PURE__*/ S.suspend(
  () => S.Struct({}).pipe(ns),
).annotate({
  identifier: "SubmitMultiRegionAccessPointRoutesResult",
}) as any as S.Schema<SubmitMultiRegionAccessPointRoutesResult>;
export interface TagResourceRequest {
  AccountId: string;
  ResourceArn: string;
  Tags: Tag[];
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(
      T.HttpHeader("x-amz-account-id"),
      T.ContextParam("AccountId"),
      T.HostLabel(),
    ),
    ResourceArn: S.String.pipe(
      T.HttpLabel("ResourceArn"),
      T.ContextParam("ResourceArn"),
    ),
    Tags: TagList,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v20180820/tags/{ResourceArn+}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ RequiresAccountId: { value: true } }),
    ),
  ),
).annotate({
  identifier: "TagResourceRequest",
}) as any as S.Schema<TagResourceRequest>;
export interface TagResourceResult {}
export const TagResourceResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "TagResourceResult",
}) as any as S.Schema<TagResourceResult>;
export type TagKeyList = string[];
export const TagKeyList = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceRequest {
  AccountId: string;
  ResourceArn: string;
  TagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(
      T.HttpHeader("x-amz-account-id"),
      T.ContextParam("AccountId"),
      T.HostLabel(),
    ),
    ResourceArn: S.String.pipe(
      T.HttpLabel("ResourceArn"),
      T.ContextParam("ResourceArn"),
    ),
    TagKeys: TagKeyList.pipe(T.HttpQuery("tagKeys")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "DELETE", uri: "/v20180820/tags/{ResourceArn+}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ RequiresAccountId: { value: true } }),
    ),
  ),
).annotate({
  identifier: "UntagResourceRequest",
}) as any as S.Schema<UntagResourceRequest>;
export interface UntagResourceResult {}
export const UntagResourceResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UntagResourceResult",
}) as any as S.Schema<UntagResourceResult>;
export interface UpdateAccessGrantsLocationRequest {
  AccountId: string;
  AccessGrantsLocationId: string;
  IAMRoleArn: string;
}
export const UpdateAccessGrantsLocationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(
      T.HttpHeader("x-amz-account-id"),
      T.ContextParam("AccountId"),
      T.HostLabel(),
    ),
    AccessGrantsLocationId: S.String.pipe(
      T.HttpLabel("AccessGrantsLocationId"),
    ),
    IAMRoleArn: S.String,
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "PUT",
        uri: "/v20180820/accessgrantsinstance/location/{AccessGrantsLocationId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ RequiresAccountId: { value: true } }),
    ),
  ),
).annotate({
  identifier: "UpdateAccessGrantsLocationRequest",
}) as any as S.Schema<UpdateAccessGrantsLocationRequest>;
export interface UpdateAccessGrantsLocationResult {
  CreatedAt?: Date;
  AccessGrantsLocationId?: string;
  AccessGrantsLocationArn?: string;
  LocationScope?: string;
  IAMRoleArn?: string;
}
export const UpdateAccessGrantsLocationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CreatedAt: S.optional(T.DateFromString),
    AccessGrantsLocationId: S.optional(S.String),
    AccessGrantsLocationArn: S.optional(S.String),
    LocationScope: S.optional(S.String),
    IAMRoleArn: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "UpdateAccessGrantsLocationResult",
}) as any as S.Schema<UpdateAccessGrantsLocationResult>;
export interface UpdateJobPriorityRequest {
  AccountId: string;
  JobId: string;
  Priority: number;
}
export const UpdateJobPriorityRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(
      T.HttpHeader("x-amz-account-id"),
      T.ContextParam("AccountId"),
      T.HostLabel(),
    ),
    JobId: S.String.pipe(T.HttpLabel("JobId")),
    Priority: S.Number.pipe(T.HttpQuery("priority")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v20180820/jobs/{JobId}/priority" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ RequiresAccountId: { value: true } }),
    ),
  ),
).annotate({
  identifier: "UpdateJobPriorityRequest",
}) as any as S.Schema<UpdateJobPriorityRequest>;
export interface UpdateJobPriorityResult {
  JobId: string;
  Priority: number;
}
export const UpdateJobPriorityResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ JobId: S.String, Priority: S.Number }).pipe(ns),
).annotate({
  identifier: "UpdateJobPriorityResult",
}) as any as S.Schema<UpdateJobPriorityResult>;
export type RequestedJobStatus = "Cancelled" | "Ready" | (string & {});
export const RequestedJobStatus = S.String;

export interface UpdateJobStatusRequest {
  AccountId: string;
  JobId: string;
  RequestedJobStatus: RequestedJobStatus;
  StatusUpdateReason?: string;
}
export const UpdateJobStatusRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String.pipe(
      T.HttpHeader("x-amz-account-id"),
      T.ContextParam("AccountId"),
      T.HostLabel(),
    ),
    JobId: S.String.pipe(T.HttpLabel("JobId")),
    RequestedJobStatus: RequestedJobStatus.pipe(
      T.HttpQuery("requestedJobStatus"),
    ),
    StatusUpdateReason: S.optional(S.String).pipe(
      T.HttpQuery("statusUpdateReason"),
    ),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v20180820/jobs/{JobId}/status" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ RequiresAccountId: { value: true } }),
    ),
  ),
).annotate({
  identifier: "UpdateJobStatusRequest",
}) as any as S.Schema<UpdateJobStatusRequest>;
export interface UpdateJobStatusResult {
  JobId?: string;
  Status?: JobStatus;
  StatusUpdateReason?: string;
}
export const UpdateJobStatusResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobId: S.optional(S.String),
    Status: S.optional(JobStatus),
    StatusUpdateReason: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "UpdateJobStatusResult",
}) as any as S.Schema<UpdateJobStatusResult>;
export interface UpdateStorageLensGroupRequest {
  Name: string;
  AccountId: string;
  StorageLensGroup: StorageLensGroup;
}
export const UpdateStorageLensGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String.pipe(T.HttpLabel("Name")),
    AccountId: S.String.pipe(
      T.HttpHeader("x-amz-account-id"),
      T.ContextParam("AccountId"),
      T.HostLabel(),
    ),
    StorageLensGroup: StorageLensGroup,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "PUT", uri: "/v20180820/storagelensgroup/{Name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ RequiresAccountId: { value: true } }),
    ),
  ),
).annotate({
  identifier: "UpdateStorageLensGroupRequest",
}) as any as S.Schema<UpdateStorageLensGroupRequest>;
export interface UpdateStorageLensGroupResponse {}
export const UpdateStorageLensGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UpdateStorageLensGroupResponse",
}) as any as S.Schema<UpdateStorageLensGroupResponse>;
export type ExceptionMessage = string;
export type NoSuchPublicAccessBlockConfigurationMessage = string;
export type AssociateAccessGrantsIdentityCenterError = CommonErrors;
/**
 * Associate your S3 Access Grants instance with an Amazon Web Services IAM Identity Center instance. Use this action if you want to create access grants for users or groups from your corporate identity directory. First, you must add your corporate identity directory to Amazon Web Services IAM Identity Center. Then, you can associate this IAM Identity Center instance with your S3 Access Grants instance.
 *
 * ### Permissions
 *
 * You must have the `s3:AssociateAccessGrantsIdentityCenter` permission to use this operation.
 *
 * ### Additional Permissions
 *
 * You must also have the following permissions: `sso:CreateApplication`, `sso:PutApplicationGrant`, and `sso:PutApplicationAuthenticationMethod`.
 */
export const associateAccessGrantsIdentityCenter: API.OperationMethod<
  AssociateAccessGrantsIdentityCenterRequest,
  AssociateAccessGrantsIdentityCenterResponse,
  AssociateAccessGrantsIdentityCenterError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateAccessGrantsIdentityCenterRequest,
  output: AssociateAccessGrantsIdentityCenterResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateAccessGrantsIdentityCenter",
  endpointHostPrefix: "{AccountId}.",
}));

export type CreateAccessGrantError = CommonErrors;
/**
 * Creates an access grant that gives a grantee access to your S3 data. The grantee can be an IAM user or role or a directory user, or group. Before you can create a grant, you must have an S3 Access Grants instance in the same Region as the S3 data. You can create an S3 Access Grants instance using the CreateAccessGrantsInstance. You must also have registered at least one S3 data location in your S3 Access Grants instance using CreateAccessGrantsLocation.
 *
 * ### Permissions
 *
 * You must have the `s3:CreateAccessGrant` permission to use this operation.
 *
 * ### Additional Permissions
 *
 * For any directory identity - `sso:DescribeInstance` and `sso:DescribeApplication`
 *
 * For directory users - `identitystore:DescribeUser`
 *
 * For directory groups - `identitystore:DescribeGroup`
 */
export const createAccessGrant: API.OperationMethod<
  CreateAccessGrantRequest,
  CreateAccessGrantResult,
  CreateAccessGrantError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAccessGrantRequest,
  output: CreateAccessGrantResult,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAccessGrant",
  endpointHostPrefix: "{AccountId}.",
}));

export type CreateAccessGrantsInstanceError = CommonErrors;
/**
 * Creates an S3 Access Grants instance, which serves as a logical grouping for access grants. You can create one S3 Access Grants instance per Region per account.
 *
 * ### Permissions
 *
 * You must have the `s3:CreateAccessGrantsInstance` permission to use this operation.
 *
 * ### Additional Permissions
 *
 * To associate an IAM Identity Center instance with your S3 Access Grants instance, you must also have the `sso:DescribeInstance`, `sso:CreateApplication`, `sso:PutApplicationGrant`, and `sso:PutApplicationAuthenticationMethod` permissions.
 */
export const createAccessGrantsInstance: API.OperationMethod<
  CreateAccessGrantsInstanceRequest,
  CreateAccessGrantsInstanceResult,
  CreateAccessGrantsInstanceError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAccessGrantsInstanceRequest,
  output: CreateAccessGrantsInstanceResult,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAccessGrantsInstance",
  endpointHostPrefix: "{AccountId}.",
}));

export type CreateAccessGrantsLocationError = CommonErrors;
/**
 * The S3 data location that you would like to register in your S3 Access Grants instance. Your S3 data must be in the same Region as your S3 Access Grants instance. The location can be one of the following:
 *
 * - The default S3 location `s3://`
 *
 * - A bucket - `S3://`
 *
 * - A bucket and prefix - `S3:///`
 *
 * When you register a location, you must include the IAM role that has permission to manage the S3 location that you are registering. Give S3 Access Grants permission to assume this role using a policy. S3 Access Grants assumes this role to manage access to the location and to vend temporary credentials to grantees or client applications.
 *
 * ### Permissions
 *
 * You must have the `s3:CreateAccessGrantsLocation` permission to use this operation.
 *
 * ### Additional Permissions
 *
 * You must also have the following permission for the specified IAM role: `iam:PassRole`
 */
export const createAccessGrantsLocation: API.OperationMethod<
  CreateAccessGrantsLocationRequest,
  CreateAccessGrantsLocationResult,
  CreateAccessGrantsLocationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAccessGrantsLocationRequest,
  output: CreateAccessGrantsLocationResult,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAccessGrantsLocation",
  endpointHostPrefix: "{AccountId}.",
}));

export type CreateAccessPointError =
  | AccessPointAlreadyOwnedByYou
  | InvalidRequest
  | CommonErrors;
/**
 * Creates an access point and associates it to a specified bucket. For more information, see
 * Managing
 * access to shared datasets with access points or Managing access to
 * shared datasets in directory buckets with access points in the
 * *Amazon S3 User Guide*.
 *
 * To create an access point and attach it to a volume on an Amazon FSx file system, see CreateAndAttachS3AccessPoint in the Amazon FSx API
 * Reference.
 *
 * S3 on Outposts only supports VPC-style access points.
 *
 * For more information, see Accessing Amazon S3 on Outposts using
 * virtual private cloud (VPC) only access points in the
 * *Amazon S3 User Guide*.
 *
 * All Amazon S3 on Outposts REST API requests for this action require an additional parameter of `x-amz-outpost-id` to be passed with the request. In addition, you must use an S3 on Outposts endpoint hostname prefix instead of `s3-control`. For an example of the request syntax for Amazon S3 on Outposts that uses the S3 on Outposts endpoint hostname prefix and the `x-amz-outpost-id` derived by using the access point ARN, see the Examples section.
 *
 * The following actions are related to `CreateAccessPoint`:
 *
 * - GetAccessPoint
 *
 * - DeleteAccessPoint
 *
 * - ListAccessPoints
 *
 * - ListAccessPointsForDirectoryBuckets
 */
export const createAccessPoint: API.OperationMethod<
  CreateAccessPointRequest,
  CreateAccessPointResult,
  CreateAccessPointError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAccessPointRequest,
  output: CreateAccessPointResult,
  errors: [AccessPointAlreadyOwnedByYou, InvalidRequest],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAccessPoint",
  endpointHostPrefix: "{AccountId}.",
}));

export type CreateAccessPointForObjectLambdaError =
  | AccessPointAlreadyOwnedByYou
  | InvalidRequest
  | NoSuchAccessPoint
  | ObjectLambdaNotAvailable
  | CommonErrors;
/**
 * This operation is not supported by directory buckets.
 *
 * Creates an Object Lambda Access Point. For more information, see Transforming objects with
 * Object Lambda Access Points in the *Amazon S3 User Guide*.
 *
 * The following actions are related to
 * `CreateAccessPointForObjectLambda`:
 *
 * - DeleteAccessPointForObjectLambda
 *
 * - GetAccessPointForObjectLambda
 *
 * - ListAccessPointsForObjectLambda
 */
export const createAccessPointForObjectLambda: API.OperationMethod<
  CreateAccessPointForObjectLambdaRequest,
  CreateAccessPointForObjectLambdaResult,
  CreateAccessPointForObjectLambdaError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAccessPointForObjectLambdaRequest,
  output: CreateAccessPointForObjectLambdaResult,
  errors: [
    AccessPointAlreadyOwnedByYou,
    InvalidRequest,
    NoSuchAccessPoint,
    ObjectLambdaNotAvailable,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAccessPointForObjectLambda",
  endpointHostPrefix: "{AccountId}.",
}));

export type CreateBucketError =
  | BucketAlreadyExists
  | BucketAlreadyOwnedByYou
  | CommonErrors;
/**
 * This action creates an Amazon S3 on Outposts bucket. To create an S3 bucket, see Create
 * Bucket in the *Amazon S3 API Reference*.
 *
 * Creates a new Outposts bucket. By creating the bucket, you become the bucket owner. To
 * create an Outposts bucket, you must have S3 on Outposts. For more information, see Using
 * Amazon S3 on Outposts in *Amazon S3 User Guide*.
 *
 * Not every string is an acceptable bucket name. For information on bucket naming
 * restrictions, see Working with
 * Amazon S3 Buckets.
 *
 * S3 on Outposts buckets support:
 *
 * - Tags
 *
 * - LifecycleConfigurations for deleting expired objects
 *
 * For a complete list of restrictions and Amazon S3 feature limitations on S3 on Outposts, see
 *
 * Amazon S3 on Outposts Restrictions and Limitations.
 *
 * For an example of the request syntax for Amazon S3 on Outposts that uses the S3 on Outposts
 * endpoint hostname prefix and `x-amz-outpost-id` in your API request, see the
 * Examples section.
 *
 * The following actions are related to `CreateBucket` for
 * Amazon S3 on Outposts:
 *
 * - PutObject
 *
 * - GetBucket
 *
 * - DeleteBucket
 *
 * - CreateAccessPoint
 *
 * - PutAccessPointPolicy
 */
export const createBucket: API.OperationMethod<
  CreateBucketRequest,
  CreateBucketResult,
  CreateBucketError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateBucketRequest,
  output: CreateBucketResult,
  errors: [BucketAlreadyExists, BucketAlreadyOwnedByYou],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBucket",
}));

export type CreateJobError =
  | BadRequestException
  | IdempotencyException
  | InternalServiceException
  | TooManyRequestsException
  | InvalidRequest
  | CommonErrors;
/**
 * This operation creates an S3 Batch Operations job.
 *
 * You can use S3 Batch Operations to perform large-scale batch actions on Amazon S3 objects.
 * Batch Operations can run a single action on lists of Amazon S3 objects that you specify. For more
 * information, see S3 Batch Operations in the *Amazon S3 User Guide*.
 *
 * ### Permissions
 *
 * For information about permissions required to use the Batch Operations, see Granting permissions for S3 Batch Operations in the Amazon S3
 * User Guide.
 *
 * Related actions include:
 *
 * - DescribeJob
 *
 * - ListJobs
 *
 * - UpdateJobPriority
 *
 * - UpdateJobStatus
 *
 * - JobOperation
 */
export const createJob: API.OperationMethod<
  CreateJobRequest,
  CreateJobResult,
  CreateJobError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateJobRequest,
  output: CreateJobResult,
  errors: [
    BadRequestException,
    IdempotencyException,
    InternalServiceException,
    TooManyRequestsException,
    InvalidRequest,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateJob",
  endpointHostPrefix: "{AccountId}.",
}));

export type CreateMultiRegionAccessPointError = InvalidRequest | CommonErrors;
/**
 * This operation is not supported by directory buckets.
 *
 * Creates a Multi-Region Access Point and associates it with the specified buckets. For more information
 * about creating Multi-Region Access Points, see Creating Multi-Region Access Points in the *Amazon S3 User Guide*.
 *
 * This action will always be routed to the US West (Oregon) Region. For more information
 * about the restrictions around working with Multi-Region Access Points, see Multi-Region Access Point
 * restrictions and limitations in the *Amazon S3 User Guide*.
 *
 * This request is asynchronous, meaning that you might receive a response before the
 * command has completed. When this request provides a response, it provides a token that you
 * can use to monitor the status of the request with
 * `DescribeMultiRegionAccessPointOperation`.
 *
 * The following actions are related to `CreateMultiRegionAccessPoint`:
 *
 * - DeleteMultiRegionAccessPoint
 *
 * - DescribeMultiRegionAccessPointOperation
 *
 * - GetMultiRegionAccessPoint
 *
 * - ListMultiRegionAccessPoints
 */
export const createMultiRegionAccessPoint: API.OperationMethod<
  CreateMultiRegionAccessPointRequest,
  CreateMultiRegionAccessPointResult,
  CreateMultiRegionAccessPointError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateMultiRegionAccessPointRequest,
  output: CreateMultiRegionAccessPointResult,
  errors: [InvalidRequest],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMultiRegionAccessPoint",
  endpointHostPrefix: "{AccountId}.",
}));

export type CreateStorageLensGroupError = CommonErrors;
/**
 * Creates a new S3 Storage Lens group and associates it with the specified Amazon Web Services account ID. An
 * S3 Storage Lens group is a custom grouping of objects based on prefix, suffix, object tags,
 * object size, object age, or a combination of these filters. For each Storage Lens group
 * that you’ve created, you can also optionally add Amazon Web Services resource tags. For more information
 * about S3 Storage Lens groups, see Working with S3 Storage Lens
 * groups.
 *
 * To use this operation, you must have the permission to perform the
 * `s3:CreateStorageLensGroup` action. If you’re trying to create a Storage Lens
 * group with Amazon Web Services resource tags, you must also have permission to perform the
 * `s3:TagResource` action. For more information about the required Storage Lens
 * Groups permissions, see Setting account permissions to use S3 Storage Lens groups.
 *
 * For information about Storage Lens groups errors, see List of Amazon S3 Storage
 * Lens error codes.
 */
export const createStorageLensGroup: API.OperationMethod<
  CreateStorageLensGroupRequest,
  CreateStorageLensGroupResponse,
  CreateStorageLensGroupError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateStorageLensGroupRequest,
  output: CreateStorageLensGroupResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateStorageLensGroup",
  endpointHostPrefix: "{AccountId}.",
}));

export type DeleteAccessGrantError = CommonErrors;
/**
 * Deletes the access grant from the S3 Access Grants instance. You cannot undo an access grant deletion and the grantee will no longer have access to the S3 data.
 *
 * ### Permissions
 *
 * You must have the `s3:DeleteAccessGrant` permission to use this operation.
 */
export const deleteAccessGrant: API.OperationMethod<
  DeleteAccessGrantRequest,
  DeleteAccessGrantResponse,
  DeleteAccessGrantError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAccessGrantRequest,
  output: DeleteAccessGrantResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccessGrant",
  endpointHostPrefix: "{AccountId}.",
}));

export type DeleteAccessGrantsInstanceError = CommonErrors;
/**
 * Deletes your S3 Access Grants instance. You must first delete the access grants and locations before S3 Access Grants can delete the instance. See DeleteAccessGrant and DeleteAccessGrantsLocation. If you have associated an IAM Identity Center instance with your S3 Access Grants instance, you must first dissassociate the Identity Center instance from the S3 Access Grants instance before you can delete the S3 Access Grants instance. See AssociateAccessGrantsIdentityCenter and DissociateAccessGrantsIdentityCenter.
 *
 * ### Permissions
 *
 * You must have the `s3:DeleteAccessGrantsInstance` permission to use this operation.
 */
export const deleteAccessGrantsInstance: API.OperationMethod<
  DeleteAccessGrantsInstanceRequest,
  DeleteAccessGrantsInstanceResponse,
  DeleteAccessGrantsInstanceError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAccessGrantsInstanceRequest,
  output: DeleteAccessGrantsInstanceResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccessGrantsInstance",
  endpointHostPrefix: "{AccountId}.",
}));

export type DeleteAccessGrantsInstanceResourcePolicyError = CommonErrors;
/**
 * Deletes the resource policy of the S3 Access Grants instance. The resource policy is used to manage cross-account access to your S3 Access Grants instance. By deleting the resource policy, you delete any cross-account permissions to your S3 Access Grants instance.
 *
 * ### Permissions
 *
 * You must have the `s3:DeleteAccessGrantsInstanceResourcePolicy` permission to use this operation.
 */
export const deleteAccessGrantsInstanceResourcePolicy: API.OperationMethod<
  DeleteAccessGrantsInstanceResourcePolicyRequest,
  DeleteAccessGrantsInstanceResourcePolicyResponse,
  DeleteAccessGrantsInstanceResourcePolicyError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAccessGrantsInstanceResourcePolicyRequest,
  output: DeleteAccessGrantsInstanceResourcePolicyResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccessGrantsInstanceResourcePolicy",
  endpointHostPrefix: "{AccountId}.",
}));

export type DeleteAccessGrantsLocationError = CommonErrors;
/**
 * Deregisters a location from your S3 Access Grants instance. You can only delete a location registration from an S3 Access Grants instance if there are no grants associated with this location. See Delete a grant for information on how to delete grants. You need to have at least one registered location in your S3 Access Grants instance in order to create access grants.
 *
 * ### Permissions
 *
 * You must have the `s3:DeleteAccessGrantsLocation` permission to use this operation.
 */
export const deleteAccessGrantsLocation: API.OperationMethod<
  DeleteAccessGrantsLocationRequest,
  DeleteAccessGrantsLocationResponse,
  DeleteAccessGrantsLocationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAccessGrantsLocationRequest,
  output: DeleteAccessGrantsLocationResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccessGrantsLocation",
  endpointHostPrefix: "{AccountId}.",
}));

export type DeleteAccessPointError = NoSuchAccessPoint | CommonErrors;
/**
 * Deletes the specified access point.
 *
 * All Amazon S3 on Outposts REST API requests for this action require an additional parameter of `x-amz-outpost-id` to be passed with the request. In addition, you must use an S3 on Outposts endpoint hostname prefix instead of `s3-control`. For an example of the request syntax for Amazon S3 on Outposts that uses the S3 on Outposts endpoint hostname prefix and the `x-amz-outpost-id` derived by using the access point ARN, see the Examples section.
 *
 * The following actions are related to `DeleteAccessPoint`:
 *
 * - CreateAccessPoint
 *
 * - GetAccessPoint
 *
 * - ListAccessPoints
 */
export const deleteAccessPoint: API.OperationMethod<
  DeleteAccessPointRequest,
  DeleteAccessPointResponse,
  DeleteAccessPointError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAccessPointRequest,
  output: DeleteAccessPointResponse,
  errors: [NoSuchAccessPoint],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccessPoint",
  endpointHostPrefix: "{AccountId}.",
}));

export type DeleteAccessPointForObjectLambdaError =
  | NoSuchAccessPoint
  | CommonErrors;
/**
 * This operation is not supported by directory buckets.
 *
 * Deletes the specified Object Lambda Access Point.
 *
 * The following actions are related to
 * `DeleteAccessPointForObjectLambda`:
 *
 * - CreateAccessPointForObjectLambda
 *
 * - GetAccessPointForObjectLambda
 *
 * - ListAccessPointsForObjectLambda
 */
export const deleteAccessPointForObjectLambda: API.OperationMethod<
  DeleteAccessPointForObjectLambdaRequest,
  DeleteAccessPointForObjectLambdaResponse,
  DeleteAccessPointForObjectLambdaError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAccessPointForObjectLambdaRequest,
  output: DeleteAccessPointForObjectLambdaResponse,
  errors: [NoSuchAccessPoint],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccessPointForObjectLambda",
  endpointHostPrefix: "{AccountId}.",
}));

export type DeleteAccessPointPolicyError =
  | NoSuchAccessPoint
  | NoSuchAccessPointPolicy
  | CommonErrors;
/**
 * Deletes the access point policy for the specified access point.
 *
 * All Amazon S3 on Outposts REST API requests for this action require an additional parameter of `x-amz-outpost-id` to be passed with the request. In addition, you must use an S3 on Outposts endpoint hostname prefix instead of `s3-control`. For an example of the request syntax for Amazon S3 on Outposts that uses the S3 on Outposts endpoint hostname prefix and the `x-amz-outpost-id` derived by using the access point ARN, see the Examples section.
 *
 * The following actions are related to `DeleteAccessPointPolicy`:
 *
 * - PutAccessPointPolicy
 *
 * - GetAccessPointPolicy
 */
export const deleteAccessPointPolicy: API.OperationMethod<
  DeleteAccessPointPolicyRequest,
  DeleteAccessPointPolicyResponse,
  DeleteAccessPointPolicyError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAccessPointPolicyRequest,
  output: DeleteAccessPointPolicyResponse,
  errors: [NoSuchAccessPoint, NoSuchAccessPointPolicy],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccessPointPolicy",
  endpointHostPrefix: "{AccountId}.",
}));

export type DeleteAccessPointPolicyForObjectLambdaError =
  | NoSuchAccessPoint
  | NoSuchAccessPointPolicy
  | CommonErrors;
/**
 * This operation is not supported by directory buckets.
 *
 * Removes the resource policy for an Object Lambda Access Point.
 *
 * The following actions are related to
 * `DeleteAccessPointPolicyForObjectLambda`:
 *
 * - GetAccessPointPolicyForObjectLambda
 *
 * - PutAccessPointPolicyForObjectLambda
 */
export const deleteAccessPointPolicyForObjectLambda: API.OperationMethod<
  DeleteAccessPointPolicyForObjectLambdaRequest,
  DeleteAccessPointPolicyForObjectLambdaResponse,
  DeleteAccessPointPolicyForObjectLambdaError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAccessPointPolicyForObjectLambdaRequest,
  output: DeleteAccessPointPolicyForObjectLambdaResponse,
  errors: [NoSuchAccessPoint, NoSuchAccessPointPolicy],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccessPointPolicyForObjectLambda",
  endpointHostPrefix: "{AccountId}.",
}));

export type DeleteAccessPointScopeError = CommonErrors;
/**
 * Deletes an existing access point scope for a directory bucket.
 *
 * When you delete the scope of an access point, all prefixes and permissions are deleted.
 *
 * To use this operation, you must have the permission to perform the
 * `s3express:DeleteAccessPointScope` action.
 *
 * For information about REST API errors, see REST error responses.
 */
export const deleteAccessPointScope: API.OperationMethod<
  DeleteAccessPointScopeRequest,
  DeleteAccessPointScopeResponse,
  DeleteAccessPointScopeError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAccessPointScopeRequest,
  output: DeleteAccessPointScopeResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccessPointScope",
}));

export type DeleteBucketError = CommonErrors;
/**
 * This action deletes an Amazon S3 on Outposts bucket. To delete an S3 bucket, see DeleteBucket in the *Amazon S3 API Reference*.
 *
 * Deletes the Amazon S3 on Outposts bucket. All objects (including all object versions and
 * delete markers) in the bucket must be deleted before the bucket itself can be deleted. For
 * more information, see Using Amazon S3 on Outposts in
 * *Amazon S3 User Guide*.
 *
 * All Amazon S3 on Outposts REST API requests for this action require an additional parameter of `x-amz-outpost-id` to be passed with the request. In addition, you must use an S3 on Outposts endpoint hostname prefix instead of `s3-control`. For an example of the request syntax for Amazon S3 on Outposts that uses the S3 on Outposts endpoint hostname prefix and the `x-amz-outpost-id` derived by using the access point ARN, see the Examples section.
 *
 * **Related Resources**
 *
 * - CreateBucket
 *
 * - GetBucket
 *
 * - DeleteObject
 */
export const deleteBucket: API.OperationMethod<
  DeleteBucketRequest,
  DeleteBucketResponse,
  DeleteBucketError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteBucketRequest,
  output: DeleteBucketResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBucket",
  endpointHostPrefix: "{AccountId}.",
}));

export type DeleteBucketLifecycleConfigurationError = CommonErrors;
/**
 * This action deletes an Amazon S3 on Outposts bucket's lifecycle configuration. To delete
 * an S3 bucket's lifecycle configuration, see DeleteBucketLifecycle in the *Amazon S3 API Reference*.
 *
 * Deletes the lifecycle configuration from the specified Outposts bucket.
 * Amazon S3 on Outposts removes all the lifecycle configuration rules in the lifecycle subresource
 * associated with the bucket. Your objects never expire, and Amazon S3 on Outposts no longer
 * automatically deletes any objects on the basis of rules contained in the deleted lifecycle
 * configuration. For more information, see Using Amazon S3 on Outposts in
 * *Amazon S3 User Guide*.
 *
 * To use this operation, you must have permission to perform the
 * `s3-outposts:PutLifecycleConfiguration` action. By default, the bucket owner
 * has this permission and the Outposts bucket owner can grant this permission to
 * others.
 *
 * All Amazon S3 on Outposts REST API requests for this action require an additional parameter of `x-amz-outpost-id` to be passed with the request. In addition, you must use an S3 on Outposts endpoint hostname prefix instead of `s3-control`. For an example of the request syntax for Amazon S3 on Outposts that uses the S3 on Outposts endpoint hostname prefix and the `x-amz-outpost-id` derived by using the access point ARN, see the Examples section.
 *
 * For more information about object expiration, see Elements to Describe Lifecycle Actions.
 *
 * Related actions include:
 *
 * - PutBucketLifecycleConfiguration
 *
 * - GetBucketLifecycleConfiguration
 */
export const deleteBucketLifecycleConfiguration: API.OperationMethod<
  DeleteBucketLifecycleConfigurationRequest,
  DeleteBucketLifecycleConfigurationResponse,
  DeleteBucketLifecycleConfigurationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteBucketLifecycleConfigurationRequest,
  output: DeleteBucketLifecycleConfigurationResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBucketLifecycleConfiguration",
  endpointHostPrefix: "{AccountId}.",
}));

export type DeleteBucketPolicyError = CommonErrors;
/**
 * This action deletes an Amazon S3 on Outposts bucket policy. To delete an S3 bucket policy,
 * see DeleteBucketPolicy in the *Amazon S3 API Reference*.
 *
 * This implementation of the DELETE action uses the policy subresource to delete the
 * policy of a specified Amazon S3 on Outposts bucket. If you are using an identity other than the
 * root user of the Amazon Web Services account that owns the bucket, the calling identity must have the
 * `s3-outposts:DeleteBucketPolicy` permissions on the specified Outposts bucket
 * and belong to the bucket owner's account to use this action. For more information, see
 * Using
 * Amazon S3 on Outposts in *Amazon S3 User Guide*.
 *
 * If you don't have `DeleteBucketPolicy` permissions, Amazon S3 returns a 403
 * Access Denied error. If you have the correct permissions, but you're not using an
 * identity that belongs to the bucket owner's account, Amazon S3 returns a 405 Method Not
 * Allowed error.
 *
 * As a security precaution, the root user of the Amazon Web Services account that owns a bucket can
 * always use this action, even if the policy explicitly denies the root user the ability
 * to perform this action.
 *
 * For more information about bucket policies, see Using Bucket Policies and User
 * Policies.
 *
 * All Amazon S3 on Outposts REST API requests for this action require an additional parameter of `x-amz-outpost-id` to be passed with the request. In addition, you must use an S3 on Outposts endpoint hostname prefix instead of `s3-control`. For an example of the request syntax for Amazon S3 on Outposts that uses the S3 on Outposts endpoint hostname prefix and the `x-amz-outpost-id` derived by using the access point ARN, see the Examples section.
 *
 * The following actions are related to `DeleteBucketPolicy`:
 *
 * - GetBucketPolicy
 *
 * - PutBucketPolicy
 */
export const deleteBucketPolicy: API.OperationMethod<
  DeleteBucketPolicyRequest,
  DeleteBucketPolicyResponse,
  DeleteBucketPolicyError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteBucketPolicyRequest,
  output: DeleteBucketPolicyResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBucketPolicy",
  endpointHostPrefix: "{AccountId}.",
}));

export type DeleteBucketReplicationError = CommonErrors;
/**
 * This operation deletes an Amazon S3 on Outposts bucket's replication configuration. To
 * delete an S3 bucket's replication configuration, see DeleteBucketReplication in the *Amazon S3 API Reference*.
 *
 * Deletes the replication configuration from the specified S3 on Outposts bucket.
 *
 * To use this operation, you must have permissions to perform the
 * `s3-outposts:PutReplicationConfiguration` action. The Outposts bucket owner
 * has this permission by default and can grant it to others. For more information about
 * permissions, see Setting up IAM with
 * S3 on Outposts and Managing access to
 * S3 on Outposts buckets in the *Amazon S3 User Guide*.
 *
 * It can take a while to propagate `PUT` or `DELETE` requests for
 * a replication configuration to all S3 on Outposts systems. Therefore, the replication
 * configuration that's returned by a `GET` request soon after a
 * `PUT` or `DELETE` request might return a more recent result
 * than what's on the Outpost. If an Outpost is offline, the delay in updating the
 * replication configuration on that Outpost can be significant.
 *
 * All Amazon S3 on Outposts REST API requests for this action require an additional parameter of `x-amz-outpost-id` to be passed with the request. In addition, you must use an S3 on Outposts endpoint hostname prefix instead of `s3-control`. For an example of the request syntax for Amazon S3 on Outposts that uses the S3 on Outposts endpoint hostname prefix and the `x-amz-outpost-id` derived by using the access point ARN, see the Examples section.
 *
 * For information about S3 replication on Outposts configuration, see Replicating objects for S3 on Outposts in the
 * *Amazon S3 User Guide*.
 *
 * The following operations are related to `DeleteBucketReplication`:
 *
 * - PutBucketReplication
 *
 * - GetBucketReplication
 */
export const deleteBucketReplication: API.OperationMethod<
  DeleteBucketReplicationRequest,
  DeleteBucketReplicationResponse,
  DeleteBucketReplicationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteBucketReplicationRequest,
  output: DeleteBucketReplicationResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBucketReplication",
  endpointHostPrefix: "{AccountId}.",
}));

export type DeleteBucketTaggingError = CommonErrors;
/**
 * This action deletes an Amazon S3 on Outposts bucket's tags. To delete an S3 bucket tags,
 * see DeleteBucketTagging in the *Amazon S3 API Reference*.
 *
 * Deletes the tags from the Outposts bucket. For more information, see Using
 * Amazon S3 on Outposts in *Amazon S3 User Guide*.
 *
 * To use this action, you must have permission to perform the
 * `PutBucketTagging` action. By default, the bucket owner has this permission
 * and can grant this permission to others.
 *
 * All Amazon S3 on Outposts REST API requests for this action require an additional parameter of `x-amz-outpost-id` to be passed with the request. In addition, you must use an S3 on Outposts endpoint hostname prefix instead of `s3-control`. For an example of the request syntax for Amazon S3 on Outposts that uses the S3 on Outposts endpoint hostname prefix and the `x-amz-outpost-id` derived by using the access point ARN, see the Examples section.
 *
 * The following actions are related to `DeleteBucketTagging`:
 *
 * - GetBucketTagging
 *
 * - PutBucketTagging
 */
export const deleteBucketTagging: API.OperationMethod<
  DeleteBucketTaggingRequest,
  DeleteBucketTaggingResponse,
  DeleteBucketTaggingError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteBucketTaggingRequest,
  output: DeleteBucketTaggingResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBucketTagging",
  endpointHostPrefix: "{AccountId}.",
}));

export type DeleteJobTaggingError =
  | InternalServiceException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Removes the entire tag set from the specified S3 Batch Operations job.
 *
 * ### Permissions
 *
 * To use the
 * `DeleteJobTagging` operation, you must have permission to
 * perform the `s3:DeleteJobTagging` action. For more information, see Controlling
 * access and labeling jobs using tags in the
 * *Amazon S3 User Guide*.
 *
 * Related actions include:
 *
 * - CreateJob
 *
 * - GetJobTagging
 *
 * - PutJobTagging
 */
export const deleteJobTagging: API.OperationMethod<
  DeleteJobTaggingRequest,
  DeleteJobTaggingResult,
  DeleteJobTaggingError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteJobTaggingRequest,
  output: DeleteJobTaggingResult,
  errors: [
    InternalServiceException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteJobTagging",
  endpointHostPrefix: "{AccountId}.",
}));

export type DeleteMultiRegionAccessPointError =
  | NoSuchMultiRegionAccessPoint
  | InvalidRequest
  | CommonErrors;
/**
 * This operation is not supported by directory buckets.
 *
 * Deletes a Multi-Region Access Point. This action does not delete the buckets associated with the Multi-Region Access Point,
 * only the Multi-Region Access Point itself.
 *
 * This action will always be routed to the US West (Oregon) Region. For more information
 * about the restrictions around working with Multi-Region Access Points, see Multi-Region Access Point
 * restrictions and limitations in the *Amazon S3 User Guide*.
 *
 * This request is asynchronous, meaning that you might receive a response before the
 * command has completed. When this request provides a response, it provides a token that you
 * can use to monitor the status of the request with
 * `DescribeMultiRegionAccessPointOperation`.
 *
 * The following actions are related to `DeleteMultiRegionAccessPoint`:
 *
 * - CreateMultiRegionAccessPoint
 *
 * - DescribeMultiRegionAccessPointOperation
 *
 * - GetMultiRegionAccessPoint
 *
 * - ListMultiRegionAccessPoints
 */
export const deleteMultiRegionAccessPoint: API.OperationMethod<
  DeleteMultiRegionAccessPointRequest,
  DeleteMultiRegionAccessPointResult,
  DeleteMultiRegionAccessPointError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteMultiRegionAccessPointRequest,
  output: DeleteMultiRegionAccessPointResult,
  errors: [NoSuchMultiRegionAccessPoint, InvalidRequest],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMultiRegionAccessPoint",
  endpointHostPrefix: "{AccountId}.",
}));

export type DeletePublicAccessBlockError = CommonErrors;
/**
 * This operation is not supported by directory buckets.
 *
 * Removes the `PublicAccessBlock` configuration for an Amazon Web Services account. This
 * operation might be restricted when the account is managed by organization-level Block
 * Public Access policies. You’ll get an Access Denied (403) error when the account is managed
 * by organization-level Block Public Access policies. Organization-level policies override
 * account-level settings, preventing direct account-level modifications. For more
 * information, see Using Amazon S3 block
 * public access.
 *
 * Related actions include:
 *
 * - GetPublicAccessBlock
 *
 * - PutPublicAccessBlock
 */
export const deletePublicAccessBlock: API.OperationMethod<
  DeletePublicAccessBlockRequest,
  DeletePublicAccessBlockResponse,
  DeletePublicAccessBlockError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeletePublicAccessBlockRequest,
  output: DeletePublicAccessBlockResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePublicAccessBlock",
  endpointHostPrefix: "{AccountId}.",
}));

export type DeleteStorageLensConfigurationError =
  | NoSuchConfiguration
  | CommonErrors;
/**
 * This operation is not supported by directory buckets.
 *
 * Deletes the Amazon S3 Storage Lens configuration. For more information about S3 Storage Lens, see Assessing your storage
 * activity and usage with Amazon S3 Storage Lens in the
 * *Amazon S3 User Guide*.
 *
 * To use this action, you must have permission to perform the
 * `s3:DeleteStorageLensConfiguration` action. For more information, see
 * Setting permissions to
 * use Amazon S3 Storage Lens in the *Amazon S3 User Guide*.
 */
export const deleteStorageLensConfiguration: API.OperationMethod<
  DeleteStorageLensConfigurationRequest,
  DeleteStorageLensConfigurationResponse,
  DeleteStorageLensConfigurationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteStorageLensConfigurationRequest,
  output: DeleteStorageLensConfigurationResponse,
  errors: [NoSuchConfiguration],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteStorageLensConfiguration",
  endpointHostPrefix: "{AccountId}.",
}));

export type DeleteStorageLensConfigurationTaggingError =
  | NoSuchConfiguration
  | CommonErrors;
/**
 * This operation is not supported by directory buckets.
 *
 * Deletes the Amazon S3 Storage Lens configuration tags. For more information about S3 Storage Lens, see
 * Assessing your
 * storage activity and usage with Amazon S3 Storage Lens in the
 * *Amazon S3 User Guide*.
 *
 * To use this action, you must have permission to perform the
 * `s3:DeleteStorageLensConfigurationTagging` action. For more information,
 * see Setting permissions to
 * use Amazon S3 Storage Lens in the *Amazon S3 User Guide*.
 */
export const deleteStorageLensConfigurationTagging: API.OperationMethod<
  DeleteStorageLensConfigurationTaggingRequest,
  DeleteStorageLensConfigurationTaggingResult,
  DeleteStorageLensConfigurationTaggingError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteStorageLensConfigurationTaggingRequest,
  output: DeleteStorageLensConfigurationTaggingResult,
  errors: [NoSuchConfiguration],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteStorageLensConfigurationTagging",
  endpointHostPrefix: "{AccountId}.",
}));

export type DeleteStorageLensGroupError = CommonErrors;
/**
 * Deletes an existing S3 Storage Lens group.
 *
 * To use this operation, you must have the permission to perform the
 * `s3:DeleteStorageLensGroup` action. For more information about the required Storage Lens
 * Groups permissions, see Setting account permissions to use S3 Storage Lens groups.
 *
 * For information about Storage Lens groups errors, see List of Amazon S3 Storage
 * Lens error codes.
 */
export const deleteStorageLensGroup: API.OperationMethod<
  DeleteStorageLensGroupRequest,
  DeleteStorageLensGroupResponse,
  DeleteStorageLensGroupError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteStorageLensGroupRequest,
  output: DeleteStorageLensGroupResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteStorageLensGroup",
  endpointHostPrefix: "{AccountId}.",
}));

export type DescribeJobError =
  | BadRequestException
  | InternalServiceException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves the configuration parameters and status for a Batch Operations job. For more
 * information, see S3 Batch Operations in the *Amazon S3 User Guide*.
 *
 * ### Permissions
 *
 * To use the `DescribeJob` operation, you must have permission to perform the `s3:DescribeJob` action.
 *
 * Related actions include:
 *
 * - CreateJob
 *
 * - ListJobs
 *
 * - UpdateJobPriority
 *
 * - UpdateJobStatus
 */
export const describeJob: API.OperationMethod<
  DescribeJobRequest,
  DescribeJobResult,
  DescribeJobError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeJobRequest,
  output: DescribeJobResult,
  errors: [
    BadRequestException,
    InternalServiceException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeJob",
  endpointHostPrefix: "{AccountId}.",
}));

export type DescribeMultiRegionAccessPointOperationError =
  | InvalidRequest
  | CommonErrors;
/**
 * This operation is not supported by directory buckets.
 *
 * Retrieves the status of an asynchronous request to manage a Multi-Region Access Point. For more information
 * about managing Multi-Region Access Points and how asynchronous requests work, see Using Multi-Region Access Points in the *Amazon S3 User Guide*.
 *
 * The following actions are related to `GetMultiRegionAccessPoint`:
 *
 * - CreateMultiRegionAccessPoint
 *
 * - DeleteMultiRegionAccessPoint
 *
 * - GetMultiRegionAccessPoint
 *
 * - ListMultiRegionAccessPoints
 */
export const describeMultiRegionAccessPointOperation: API.OperationMethod<
  DescribeMultiRegionAccessPointOperationRequest,
  DescribeMultiRegionAccessPointOperationResult,
  DescribeMultiRegionAccessPointOperationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeMultiRegionAccessPointOperationRequest,
  output: DescribeMultiRegionAccessPointOperationResult,
  errors: [InvalidRequest],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMultiRegionAccessPointOperation",
  endpointHostPrefix: "{AccountId}.",
}));

export type DissociateAccessGrantsIdentityCenterError = CommonErrors;
/**
 * Dissociates the Amazon Web Services IAM Identity Center instance from the S3 Access Grants instance.
 *
 * ### Permissions
 *
 * You must have the `s3:DissociateAccessGrantsIdentityCenter` permission to use this operation.
 *
 * ### Additional Permissions
 *
 * You must have the `sso:DeleteApplication` permission to use this operation.
 */
export const dissociateAccessGrantsIdentityCenter: API.OperationMethod<
  DissociateAccessGrantsIdentityCenterRequest,
  DissociateAccessGrantsIdentityCenterResponse,
  DissociateAccessGrantsIdentityCenterError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DissociateAccessGrantsIdentityCenterRequest,
  output: DissociateAccessGrantsIdentityCenterResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DissociateAccessGrantsIdentityCenter",
  endpointHostPrefix: "{AccountId}.",
}));

export type GetAccessGrantError = CommonErrors;
/**
 * Get the details of an access grant from your S3 Access Grants instance.
 *
 * ### Permissions
 *
 * You must have the `s3:GetAccessGrant` permission to use this operation.
 */
export const getAccessGrant: API.OperationMethod<
  GetAccessGrantRequest,
  GetAccessGrantResult,
  GetAccessGrantError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAccessGrantRequest,
  output: GetAccessGrantResult,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccessGrant",
  endpointHostPrefix: "{AccountId}.",
}));

export type GetAccessGrantsInstanceError = CommonErrors;
/**
 * Retrieves the S3 Access Grants instance for a Region in your account.
 *
 * ### Permissions
 *
 * You must have the `s3:GetAccessGrantsInstance` permission to use this operation.
 *
 * `GetAccessGrantsInstance` is not supported for cross-account access. You can only call the API from the account that owns the S3 Access Grants instance.
 */
export const getAccessGrantsInstance: API.OperationMethod<
  GetAccessGrantsInstanceRequest,
  GetAccessGrantsInstanceResult,
  GetAccessGrantsInstanceError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAccessGrantsInstanceRequest,
  output: GetAccessGrantsInstanceResult,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccessGrantsInstance",
  endpointHostPrefix: "{AccountId}.",
}));

export type GetAccessGrantsInstanceForPrefixError = CommonErrors;
/**
 * Retrieve the S3 Access Grants instance that contains a particular prefix.
 *
 * ### Permissions
 *
 * You must have the `s3:GetAccessGrantsInstanceForPrefix` permission for the caller account to use this operation.
 *
 * ### Additional Permissions
 *
 * The prefix owner account must grant you the following permissions to their S3 Access Grants instance: `s3:GetAccessGrantsInstanceForPrefix`.
 */
export const getAccessGrantsInstanceForPrefix: API.OperationMethod<
  GetAccessGrantsInstanceForPrefixRequest,
  GetAccessGrantsInstanceForPrefixResult,
  GetAccessGrantsInstanceForPrefixError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAccessGrantsInstanceForPrefixRequest,
  output: GetAccessGrantsInstanceForPrefixResult,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccessGrantsInstanceForPrefix",
  endpointHostPrefix: "{AccountId}.",
}));

export type GetAccessGrantsInstanceResourcePolicyError = CommonErrors;
/**
 * Returns the resource policy of the S3 Access Grants instance.
 *
 * ### Permissions
 *
 * You must have the `s3:GetAccessGrantsInstanceResourcePolicy` permission to use this operation.
 */
export const getAccessGrantsInstanceResourcePolicy: API.OperationMethod<
  GetAccessGrantsInstanceResourcePolicyRequest,
  GetAccessGrantsInstanceResourcePolicyResult,
  GetAccessGrantsInstanceResourcePolicyError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAccessGrantsInstanceResourcePolicyRequest,
  output: GetAccessGrantsInstanceResourcePolicyResult,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccessGrantsInstanceResourcePolicy",
  endpointHostPrefix: "{AccountId}.",
}));

export type GetAccessGrantsLocationError = CommonErrors;
/**
 * Retrieves the details of a particular location registered in your S3 Access Grants instance.
 *
 * ### Permissions
 *
 * You must have the `s3:GetAccessGrantsLocation` permission to use this operation.
 */
export const getAccessGrantsLocation: API.OperationMethod<
  GetAccessGrantsLocationRequest,
  GetAccessGrantsLocationResult,
  GetAccessGrantsLocationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAccessGrantsLocationRequest,
  output: GetAccessGrantsLocationResult,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccessGrantsLocation",
  endpointHostPrefix: "{AccountId}.",
}));

export type GetAccessPointError = NoSuchAccessPoint | CommonErrors;
/**
 * Returns configuration information about the specified access point.
 *
 * All Amazon S3 on Outposts REST API requests for this action require an additional parameter of `x-amz-outpost-id` to be passed with the request. In addition, you must use an S3 on Outposts endpoint hostname prefix instead of `s3-control`. For an example of the request syntax for Amazon S3 on Outposts that uses the S3 on Outposts endpoint hostname prefix and the `x-amz-outpost-id` derived by using the access point ARN, see the Examples section.
 *
 * The following actions are related to `GetAccessPoint`:
 *
 * - CreateAccessPoint
 *
 * - DeleteAccessPoint
 *
 * - ListAccessPoints
 */
export const getAccessPoint: API.OperationMethod<
  GetAccessPointRequest,
  GetAccessPointResult,
  GetAccessPointError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAccessPointRequest,
  output: GetAccessPointResult,
  errors: [NoSuchAccessPoint],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccessPoint",
  endpointHostPrefix: "{AccountId}.",
}));

export type GetAccessPointConfigurationForObjectLambdaError =
  | NoSuchAccessPoint
  | CommonErrors;
/**
 * This operation is not supported by directory buckets.
 *
 * Returns configuration for an Object Lambda Access Point.
 *
 * The following actions are related to
 * `GetAccessPointConfigurationForObjectLambda`:
 *
 * - PutAccessPointConfigurationForObjectLambda
 */
export const getAccessPointConfigurationForObjectLambda: API.OperationMethod<
  GetAccessPointConfigurationForObjectLambdaRequest,
  GetAccessPointConfigurationForObjectLambdaResult,
  GetAccessPointConfigurationForObjectLambdaError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAccessPointConfigurationForObjectLambdaRequest,
  output: GetAccessPointConfigurationForObjectLambdaResult,
  errors: [NoSuchAccessPoint],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccessPointConfigurationForObjectLambda",
  endpointHostPrefix: "{AccountId}.",
}));

export type GetAccessPointForObjectLambdaError =
  | NoSuchAccessPoint
  | CommonErrors;
/**
 * This operation is not supported by directory buckets.
 *
 * Returns configuration information about the specified Object Lambda Access Point
 *
 * The following actions are related to `GetAccessPointForObjectLambda`:
 *
 * - CreateAccessPointForObjectLambda
 *
 * - DeleteAccessPointForObjectLambda
 *
 * - ListAccessPointsForObjectLambda
 */
export const getAccessPointForObjectLambda: API.OperationMethod<
  GetAccessPointForObjectLambdaRequest,
  GetAccessPointForObjectLambdaResult,
  GetAccessPointForObjectLambdaError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAccessPointForObjectLambdaRequest,
  output: GetAccessPointForObjectLambdaResult,
  errors: [NoSuchAccessPoint],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccessPointForObjectLambda",
  endpointHostPrefix: "{AccountId}.",
}));

export type GetAccessPointPolicyError =
  | NoSuchAccessPoint
  | NoSuchAccessPointPolicy
  | CommonErrors;
/**
 * Returns the access point policy associated with the specified access point.
 *
 * The following actions are related to `GetAccessPointPolicy`:
 *
 * - PutAccessPointPolicy
 *
 * - DeleteAccessPointPolicy
 */
export const getAccessPointPolicy: API.OperationMethod<
  GetAccessPointPolicyRequest,
  GetAccessPointPolicyResult,
  GetAccessPointPolicyError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAccessPointPolicyRequest,
  output: GetAccessPointPolicyResult,
  errors: [NoSuchAccessPoint, NoSuchAccessPointPolicy],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccessPointPolicy",
  endpointHostPrefix: "{AccountId}.",
}));

export type GetAccessPointPolicyForObjectLambdaError =
  | NoSuchAccessPoint
  | NoSuchAccessPointPolicy
  | CommonErrors;
/**
 * This operation is not supported by directory buckets.
 *
 * Returns the resource policy for an Object Lambda Access Point.
 *
 * The following actions are related to
 * `GetAccessPointPolicyForObjectLambda`:
 *
 * - DeleteAccessPointPolicyForObjectLambda
 *
 * - PutAccessPointPolicyForObjectLambda
 */
export const getAccessPointPolicyForObjectLambda: API.OperationMethod<
  GetAccessPointPolicyForObjectLambdaRequest,
  GetAccessPointPolicyForObjectLambdaResult,
  GetAccessPointPolicyForObjectLambdaError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAccessPointPolicyForObjectLambdaRequest,
  output: GetAccessPointPolicyForObjectLambdaResult,
  errors: [NoSuchAccessPoint, NoSuchAccessPointPolicy],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccessPointPolicyForObjectLambda",
  endpointHostPrefix: "{AccountId}.",
}));

export type GetAccessPointPolicyStatusError =
  | NoSuchAccessPoint
  | NoSuchAccessPointPolicy
  | CommonErrors;
/**
 * This operation is not supported by directory buckets.
 *
 * Indicates whether the specified access point currently has a policy that allows public access.
 * For more information about public access through access points, see Managing Data Access with Amazon S3
 * access points in the *Amazon S3 User Guide*.
 */
export const getAccessPointPolicyStatus: API.OperationMethod<
  GetAccessPointPolicyStatusRequest,
  GetAccessPointPolicyStatusResult,
  GetAccessPointPolicyStatusError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAccessPointPolicyStatusRequest,
  output: GetAccessPointPolicyStatusResult,
  errors: [NoSuchAccessPoint, NoSuchAccessPointPolicy],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccessPointPolicyStatus",
  endpointHostPrefix: "{AccountId}.",
}));

export type GetAccessPointPolicyStatusForObjectLambdaError = CommonErrors;
/**
 * This operation is not supported by directory buckets.
 *
 * Returns the status of the resource policy associated with an Object Lambda Access Point.
 */
export const getAccessPointPolicyStatusForObjectLambda: API.OperationMethod<
  GetAccessPointPolicyStatusForObjectLambdaRequest,
  GetAccessPointPolicyStatusForObjectLambdaResult,
  GetAccessPointPolicyStatusForObjectLambdaError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAccessPointPolicyStatusForObjectLambdaRequest,
  output: GetAccessPointPolicyStatusForObjectLambdaResult,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccessPointPolicyStatusForObjectLambda",
  endpointHostPrefix: "{AccountId}.",
}));

export type GetAccessPointScopeError = CommonErrors;
/**
 * Returns the access point scope for a directory bucket.
 *
 * To use this operation, you must have the permission to perform the
 * `s3express:GetAccessPointScope` action.
 *
 * For information about REST API errors, see REST error responses.
 */
export const getAccessPointScope: API.OperationMethod<
  GetAccessPointScopeRequest,
  GetAccessPointScopeResult,
  GetAccessPointScopeError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAccessPointScopeRequest,
  output: GetAccessPointScopeResult,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccessPointScope",
}));

export type GetBucketError = CommonErrors;
/**
 * Gets an Amazon S3 on Outposts bucket. For more information, see Using Amazon S3 on Outposts in the
 * *Amazon S3 User Guide*.
 *
 * If you are using an identity other than the root user of the Amazon Web Services account that owns the
 * Outposts bucket, the calling identity must have the `s3-outposts:GetBucket`
 * permissions on the specified Outposts bucket and belong to the Outposts bucket owner's
 * account in order to use this action. Only users from Outposts bucket owner account with
 * the right permissions can perform actions on an Outposts bucket.
 *
 * If you don't have `s3-outposts:GetBucket` permissions or you're not using an
 * identity that belongs to the bucket owner's account, Amazon S3 returns a 403 Access
 * Denied error.
 *
 * The following actions are related to `GetBucket` for Amazon S3 on Outposts:
 *
 * All Amazon S3 on Outposts REST API requests for this action require an additional parameter of `x-amz-outpost-id` to be passed with the request. In addition, you must use an S3 on Outposts endpoint hostname prefix instead of `s3-control`. For an example of the request syntax for Amazon S3 on Outposts that uses the S3 on Outposts endpoint hostname prefix and the `x-amz-outpost-id` derived by using the access point ARN, see the Examples section.
 *
 * - PutObject
 *
 * - CreateBucket
 *
 * - DeleteBucket
 */
export const getBucket: API.OperationMethod<
  GetBucketRequest,
  GetBucketResult,
  GetBucketError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetBucketRequest,
  output: GetBucketResult,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBucket",
  endpointHostPrefix: "{AccountId}.",
}));

export type GetBucketLifecycleConfigurationError = CommonErrors;
/**
 * This action gets an Amazon S3 on Outposts bucket's lifecycle configuration. To get an S3
 * bucket's lifecycle configuration, see GetBucketLifecycleConfiguration in the *Amazon S3 API Reference*.
 *
 * Returns the lifecycle configuration information set on the Outposts bucket. For more
 * information, see Using Amazon S3 on Outposts and for
 * information about lifecycle configuration, see Object Lifecycle
 * Management in *Amazon S3 User Guide*.
 *
 * To use this action, you must have permission to perform the
 * `s3-outposts:GetLifecycleConfiguration` action. The Outposts bucket owner
 * has this permission, by default. The bucket owner can grant this permission to others. For
 * more information about permissions, see Permissions Related to Bucket Subresource Operations and Managing
 * Access Permissions to Your Amazon S3 Resources.
 *
 * All Amazon S3 on Outposts REST API requests for this action require an additional parameter of `x-amz-outpost-id` to be passed with the request. In addition, you must use an S3 on Outposts endpoint hostname prefix instead of `s3-control`. For an example of the request syntax for Amazon S3 on Outposts that uses the S3 on Outposts endpoint hostname prefix and the `x-amz-outpost-id` derived by using the access point ARN, see the Examples section.
 *
 * `GetBucketLifecycleConfiguration` has the following special error:
 *
 * - Error code: `NoSuchLifecycleConfiguration`
 *
 * - Description: The lifecycle configuration does not exist.
 *
 * - HTTP Status Code: 404 Not Found
 *
 * - SOAP Fault Code Prefix: Client
 *
 * The following actions are related to
 * `GetBucketLifecycleConfiguration`:
 *
 * - PutBucketLifecycleConfiguration
 *
 * - DeleteBucketLifecycleConfiguration
 */
export const getBucketLifecycleConfiguration: API.OperationMethod<
  GetBucketLifecycleConfigurationRequest,
  GetBucketLifecycleConfigurationResult,
  GetBucketLifecycleConfigurationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetBucketLifecycleConfigurationRequest,
  output: GetBucketLifecycleConfigurationResult,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBucketLifecycleConfiguration",
  endpointHostPrefix: "{AccountId}.",
}));

export type GetBucketPolicyError = CommonErrors;
/**
 * This action gets a bucket policy for an Amazon S3 on Outposts bucket. To get a policy for
 * an S3 bucket, see GetBucketPolicy in the
 * *Amazon S3 API Reference*.
 *
 * Returns the policy of a specified Outposts bucket. For more information, see Using
 * Amazon S3 on Outposts in the *Amazon S3 User Guide*.
 *
 * If you are using an identity other than the root user of the Amazon Web Services account that owns the
 * bucket, the calling identity must have the `GetBucketPolicy` permissions on the
 * specified bucket and belong to the bucket owner's account in order to use this
 * action.
 *
 * Only users from Outposts bucket owner account with the right permissions can perform
 * actions on an Outposts bucket. If you don't have `s3-outposts:GetBucketPolicy`
 * permissions or you're not using an identity that belongs to the bucket owner's account,
 * Amazon S3 returns a `403 Access Denied` error.
 *
 * As a security precaution, the root user of the Amazon Web Services account that owns a bucket can
 * always use this action, even if the policy explicitly denies the root user the ability
 * to perform this action.
 *
 * For more information about bucket policies, see Using Bucket Policies and User
 * Policies.
 *
 * All Amazon S3 on Outposts REST API requests for this action require an additional parameter of `x-amz-outpost-id` to be passed with the request. In addition, you must use an S3 on Outposts endpoint hostname prefix instead of `s3-control`. For an example of the request syntax for Amazon S3 on Outposts that uses the S3 on Outposts endpoint hostname prefix and the `x-amz-outpost-id` derived by using the access point ARN, see the Examples section.
 *
 * The following actions are related to `GetBucketPolicy`:
 *
 * - GetObject
 *
 * - PutBucketPolicy
 *
 * - DeleteBucketPolicy
 */
export const getBucketPolicy: API.OperationMethod<
  GetBucketPolicyRequest,
  GetBucketPolicyResult,
  GetBucketPolicyError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetBucketPolicyRequest,
  output: GetBucketPolicyResult,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBucketPolicy",
  endpointHostPrefix: "{AccountId}.",
}));

export type GetBucketReplicationError = CommonErrors;
/**
 * This operation gets an Amazon S3 on Outposts bucket's replication configuration. To get an
 * S3 bucket's replication configuration, see GetBucketReplication
 * in the *Amazon S3 API Reference*.
 *
 * Returns the replication configuration of an S3 on Outposts bucket. For more information
 * about S3 on Outposts, see Using Amazon S3 on Outposts in the
 * *Amazon S3 User Guide*. For information about S3 replication on Outposts
 * configuration, see Replicating objects for
 * S3 on Outposts in the *Amazon S3 User Guide*.
 *
 * It can take a while to propagate `PUT` or `DELETE` requests for
 * a replication configuration to all S3 on Outposts systems. Therefore, the replication
 * configuration that's returned by a `GET` request soon after a
 * `PUT` or `DELETE` request might return a more recent result
 * than what's on the Outpost. If an Outpost is offline, the delay in updating the
 * replication configuration on that Outpost can be significant.
 *
 * This action requires permissions for the
 * `s3-outposts:GetReplicationConfiguration` action. The Outposts bucket owner
 * has this permission by default and can grant it to others. For more information about
 * permissions, see Setting up IAM with
 * S3 on Outposts and Managing access to
 * S3 on Outposts bucket in the *Amazon S3 User Guide*.
 *
 * All Amazon S3 on Outposts REST API requests for this action require an additional parameter of `x-amz-outpost-id` to be passed with the request. In addition, you must use an S3 on Outposts endpoint hostname prefix instead of `s3-control`. For an example of the request syntax for Amazon S3 on Outposts that uses the S3 on Outposts endpoint hostname prefix and the `x-amz-outpost-id` derived by using the access point ARN, see the Examples section.
 *
 * If you include the `Filter` element in a replication configuration, you must
 * also include the `DeleteMarkerReplication`, `Status`, and
 * `Priority` elements. The response also returns those elements.
 *
 * For information about S3 on Outposts replication failure reasons, see Replication failure reasons in the *Amazon S3 User Guide*.
 *
 * The following operations are related to `GetBucketReplication`:
 *
 * - PutBucketReplication
 *
 * - DeleteBucketReplication
 */
export const getBucketReplication: API.OperationMethod<
  GetBucketReplicationRequest,
  GetBucketReplicationResult,
  GetBucketReplicationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetBucketReplicationRequest,
  output: GetBucketReplicationResult,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBucketReplication",
  endpointHostPrefix: "{AccountId}.",
}));

export type GetBucketTaggingError = CommonErrors;
/**
 * This action gets an Amazon S3 on Outposts bucket's tags. To get an S3 bucket tags, see
 * GetBucketTagging in the *Amazon S3 API Reference*.
 *
 * Returns the tag set associated with the Outposts bucket. For more information, see
 * Using
 * Amazon S3 on Outposts in the *Amazon S3 User Guide*.
 *
 * To use this action, you must have permission to perform the
 * `GetBucketTagging` action. By default, the bucket owner has this permission
 * and can grant this permission to others.
 *
 * `GetBucketTagging` has the following special error:
 *
 * - Error code: `NoSuchTagSetError`
 *
 * - Description: There is no tag set associated with the bucket.
 *
 * All Amazon S3 on Outposts REST API requests for this action require an additional parameter of `x-amz-outpost-id` to be passed with the request. In addition, you must use an S3 on Outposts endpoint hostname prefix instead of `s3-control`. For an example of the request syntax for Amazon S3 on Outposts that uses the S3 on Outposts endpoint hostname prefix and the `x-amz-outpost-id` derived by using the access point ARN, see the Examples section.
 *
 * The following actions are related to `GetBucketTagging`:
 *
 * - PutBucketTagging
 *
 * - DeleteBucketTagging
 */
export const getBucketTagging: API.OperationMethod<
  GetBucketTaggingRequest,
  GetBucketTaggingResult,
  GetBucketTaggingError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetBucketTaggingRequest,
  output: GetBucketTaggingResult,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBucketTagging",
  endpointHostPrefix: "{AccountId}.",
}));

export type GetBucketVersioningError = CommonErrors;
/**
 * This operation returns the versioning state
 * for
 * S3 on Outposts
 * buckets
 * only. To return the versioning state for an S3 bucket, see GetBucketVersioning in the *Amazon S3 API Reference*.
 *
 * Returns the versioning state for an S3 on Outposts bucket. With
 * S3
 * Versioning,
 * you can save multiple distinct copies of your
 * objects
 * and recover from unintended user actions and application failures.
 *
 * If you've never set versioning on your bucket, it has no versioning state. In that case,
 * the `GetBucketVersioning` request does not return a versioning state
 * value.
 *
 * For more information about versioning, see Versioning in the Amazon S3
 * User Guide.
 *
 * All Amazon S3 on Outposts REST API requests for this action require an additional parameter of `x-amz-outpost-id` to be passed with the request. In addition, you must use an S3 on Outposts endpoint hostname prefix instead of `s3-control`. For an example of the request syntax for Amazon S3 on Outposts that uses the S3 on Outposts endpoint hostname prefix and the `x-amz-outpost-id` derived by using the access point ARN, see the Examples section.
 *
 * The following operations are related to `GetBucketVersioning` for
 * S3 on Outposts.
 *
 * - PutBucketVersioning
 *
 * - PutBucketLifecycleConfiguration
 *
 * - GetBucketLifecycleConfiguration
 */
export const getBucketVersioning: API.OperationMethod<
  GetBucketVersioningRequest,
  GetBucketVersioningResult,
  GetBucketVersioningError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetBucketVersioningRequest,
  output: GetBucketVersioningResult,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBucketVersioning",
  endpointHostPrefix: "{AccountId}.",
}));

export type GetDataAccessError = CommonErrors;
/**
 * Returns a temporary access credential from S3 Access Grants to the grantee or client application. The temporary credential is an Amazon Web Services STS token that grants them access to the S3 data.
 *
 * ### Permissions
 *
 * You must have the `s3:GetDataAccess` permission to use this operation.
 *
 * ### Additional Permissions
 *
 * The IAM role that S3 Access Grants assumes must have the following permissions specified in the trust policy when registering the location: `sts:AssumeRole`, for directory users or groups `sts:SetContext`, and for IAM users or roles `sts:SetSourceIdentity`.
 */
export const getDataAccess: API.OperationMethod<
  GetDataAccessRequest,
  GetDataAccessResult,
  GetDataAccessError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDataAccessRequest,
  output: GetDataAccessResult,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataAccess",
  endpointHostPrefix: "{AccountId}.",
}));

export type GetJobTaggingError =
  | InternalServiceException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns the tags on an S3 Batch Operations job.
 *
 * ### Permissions
 *
 * To use the
 * `GetJobTagging` operation, you must have permission to
 * perform the `s3:GetJobTagging` action. For more information, see Controlling
 * access and labeling jobs using tags in the
 * *Amazon S3 User Guide*.
 *
 * Related actions include:
 *
 * - CreateJob
 *
 * - PutJobTagging
 *
 * - DeleteJobTagging
 */
export const getJobTagging: API.OperationMethod<
  GetJobTaggingRequest,
  GetJobTaggingResult,
  GetJobTaggingError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetJobTaggingRequest,
  output: GetJobTaggingResult,
  errors: [
    InternalServiceException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetJobTagging",
  endpointHostPrefix: "{AccountId}.",
}));

export type GetMultiRegionAccessPointError =
  | NoSuchMultiRegionAccessPoint
  | CommonErrors;
/**
 * This operation is not supported by directory buckets.
 *
 * Returns configuration information about the specified Multi-Region Access Point.
 *
 * This action will always be routed to the US West (Oregon) Region. For more information
 * about the restrictions around working with Multi-Region Access Points, see Multi-Region Access Point
 * restrictions and limitations in the *Amazon S3 User Guide*.
 *
 * The following actions are related to `GetMultiRegionAccessPoint`:
 *
 * - CreateMultiRegionAccessPoint
 *
 * - DeleteMultiRegionAccessPoint
 *
 * - DescribeMultiRegionAccessPointOperation
 *
 * - ListMultiRegionAccessPoints
 */
export const getMultiRegionAccessPoint: API.OperationMethod<
  GetMultiRegionAccessPointRequest,
  GetMultiRegionAccessPointResult,
  GetMultiRegionAccessPointError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMultiRegionAccessPointRequest,
  output: GetMultiRegionAccessPointResult,
  errors: [NoSuchMultiRegionAccessPoint],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMultiRegionAccessPoint",
  endpointHostPrefix: "{AccountId}.",
}));

export type GetMultiRegionAccessPointPolicyError =
  | NoSuchMultiRegionAccessPoint
  | CommonErrors;
/**
 * This operation is not supported by directory buckets.
 *
 * Returns the access control policy of the specified Multi-Region Access Point.
 *
 * This action will always be routed to the US West (Oregon) Region. For more information
 * about the restrictions around working with Multi-Region Access Points, see Multi-Region Access Point
 * restrictions and limitations in the *Amazon S3 User Guide*.
 *
 * The following actions are related to
 * `GetMultiRegionAccessPointPolicy`:
 *
 * - GetMultiRegionAccessPointPolicyStatus
 *
 * - PutMultiRegionAccessPointPolicy
 */
export const getMultiRegionAccessPointPolicy: API.OperationMethod<
  GetMultiRegionAccessPointPolicyRequest,
  GetMultiRegionAccessPointPolicyResult,
  GetMultiRegionAccessPointPolicyError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMultiRegionAccessPointPolicyRequest,
  output: GetMultiRegionAccessPointPolicyResult,
  errors: [NoSuchMultiRegionAccessPoint],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMultiRegionAccessPointPolicy",
  endpointHostPrefix: "{AccountId}.",
}));

export type GetMultiRegionAccessPointPolicyStatusError = CommonErrors;
/**
 * This operation is not supported by directory buckets.
 *
 * Indicates whether the specified Multi-Region Access Point has an access control policy that allows public
 * access.
 *
 * This action will always be routed to the US West (Oregon) Region. For more information
 * about the restrictions around working with Multi-Region Access Points, see Multi-Region Access Point
 * restrictions and limitations in the *Amazon S3 User Guide*.
 *
 * The following actions are related to
 * `GetMultiRegionAccessPointPolicyStatus`:
 *
 * - GetMultiRegionAccessPointPolicy
 *
 * - PutMultiRegionAccessPointPolicy
 */
export const getMultiRegionAccessPointPolicyStatus: API.OperationMethod<
  GetMultiRegionAccessPointPolicyStatusRequest,
  GetMultiRegionAccessPointPolicyStatusResult,
  GetMultiRegionAccessPointPolicyStatusError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMultiRegionAccessPointPolicyStatusRequest,
  output: GetMultiRegionAccessPointPolicyStatusResult,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMultiRegionAccessPointPolicyStatus",
  endpointHostPrefix: "{AccountId}.",
}));

export type GetMultiRegionAccessPointRoutesError = CommonErrors;
/**
 * This operation is not supported by directory buckets.
 *
 * Returns the routing configuration for a Multi-Region Access Point, indicating which Regions are active or
 * passive.
 *
 * To obtain routing control changes and failover requests, use the Amazon S3 failover control
 * infrastructure endpoints in these five Amazon Web Services Regions:
 *
 * - `us-east-1`
 *
 * - `us-west-2`
 *
 * - `ap-southeast-2`
 *
 * - `ap-northeast-1`
 *
 * - `eu-west-1`
 */
export const getMultiRegionAccessPointRoutes: API.OperationMethod<
  GetMultiRegionAccessPointRoutesRequest,
  GetMultiRegionAccessPointRoutesResult,
  GetMultiRegionAccessPointRoutesError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMultiRegionAccessPointRoutesRequest,
  output: GetMultiRegionAccessPointRoutesResult,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMultiRegionAccessPointRoutes",
  endpointHostPrefix: "{AccountId}.",
}));

export type GetPublicAccessBlockError =
  | NoSuchPublicAccessBlockConfiguration
  | CommonErrors;
/**
 * This operation is not supported by directory buckets.
 *
 * Retrieves the `PublicAccessBlock` configuration for an Amazon Web Services account. This
 * operation returns the effective account-level configuration, which may inherit from
 * organization-level policies. For more information, see Using Amazon S3 block
 * public access.
 *
 * Related actions include:
 *
 * - DeletePublicAccessBlock
 *
 * - PutPublicAccessBlock
 */
export const getPublicAccessBlock: API.OperationMethod<
  GetPublicAccessBlockRequest,
  GetPublicAccessBlockOutput,
  GetPublicAccessBlockError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPublicAccessBlockRequest,
  output: GetPublicAccessBlockOutput,
  errors: [NoSuchPublicAccessBlockConfiguration],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPublicAccessBlock",
  endpointHostPrefix: "{AccountId}.",
}));

export type GetStorageLensConfigurationError =
  | NoSuchConfiguration
  | CommonErrors;
/**
 * This operation is not supported by directory buckets.
 *
 * Gets the Amazon S3 Storage Lens configuration. For more information, see Assessing your storage
 * activity and usage with Amazon S3 Storage Lens in the
 * *Amazon S3 User Guide*. For a complete list of S3 Storage Lens metrics, see S3 Storage Lens metrics glossary in the *Amazon S3 User Guide*.
 *
 * To use this action, you must have permission to perform the
 * `s3:GetStorageLensConfiguration` action. For more information, see Setting permissions to use Amazon S3 Storage Lens in the
 * *Amazon S3 User Guide*.
 */
export const getStorageLensConfiguration: API.OperationMethod<
  GetStorageLensConfigurationRequest,
  GetStorageLensConfigurationResult,
  GetStorageLensConfigurationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetStorageLensConfigurationRequest,
  output: GetStorageLensConfigurationResult,
  errors: [NoSuchConfiguration],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetStorageLensConfiguration",
  endpointHostPrefix: "{AccountId}.",
}));

export type GetStorageLensConfigurationTaggingError =
  | NoSuchConfiguration
  | CommonErrors;
/**
 * This operation is not supported by directory buckets.
 *
 * Gets the tags of Amazon S3 Storage Lens configuration. For more information about S3 Storage Lens, see
 * Assessing your
 * storage activity and usage with Amazon S3 Storage Lens in the
 * *Amazon S3 User Guide*.
 *
 * To use this action, you must have permission to perform the
 * `s3:GetStorageLensConfigurationTagging` action. For more information, see
 * Setting permissions to
 * use Amazon S3 Storage Lens in the *Amazon S3 User Guide*.
 */
export const getStorageLensConfigurationTagging: API.OperationMethod<
  GetStorageLensConfigurationTaggingRequest,
  GetStorageLensConfigurationTaggingResult,
  GetStorageLensConfigurationTaggingError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetStorageLensConfigurationTaggingRequest,
  output: GetStorageLensConfigurationTaggingResult,
  errors: [NoSuchConfiguration],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetStorageLensConfigurationTagging",
  endpointHostPrefix: "{AccountId}.",
}));

export type GetStorageLensGroupError = CommonErrors;
/**
 * Retrieves the Storage Lens group configuration details.
 *
 * To use this operation, you must have the permission to perform the
 * `s3:GetStorageLensGroup` action. For more information about the required Storage Lens
 * Groups permissions, see Setting account permissions to use S3 Storage Lens groups.
 *
 * For information about Storage Lens groups errors, see List of Amazon S3 Storage
 * Lens error codes.
 */
export const getStorageLensGroup: API.OperationMethod<
  GetStorageLensGroupRequest,
  GetStorageLensGroupResult,
  GetStorageLensGroupError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetStorageLensGroupRequest,
  output: GetStorageLensGroupResult,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetStorageLensGroup",
  endpointHostPrefix: "{AccountId}.",
}));

export type ListAccessGrantsError = CommonErrors;
/**
 * Returns the list of access grants in your S3 Access Grants instance.
 *
 * ### Permissions
 *
 * You must have the `s3:ListAccessGrants` permission to use this operation.
 */
export const listAccessGrants: API.PaginatedOperationMethod<
  ListAccessGrantsRequest,
  ListAccessGrantsResult,
  ListAccessGrantsError,
  Creds | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAccessGrantsRequest,
  output: ListAccessGrantsResult,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAccessGrants",
  endpointHostPrefix: "{AccountId}.",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListAccessGrantsInstancesError = CommonErrors;
/**
 * Returns a list of S3 Access Grants instances. An S3 Access Grants instance serves as a logical grouping for your individual access grants. You can only have one S3 Access Grants instance per Region per account.
 *
 * ### Permissions
 *
 * You must have the `s3:ListAccessGrantsInstances` permission to use this operation.
 */
export const listAccessGrantsInstances: API.PaginatedOperationMethod<
  ListAccessGrantsInstancesRequest,
  ListAccessGrantsInstancesResult,
  ListAccessGrantsInstancesError,
  Creds | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAccessGrantsInstancesRequest,
  output: ListAccessGrantsInstancesResult,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAccessGrantsInstances",
  endpointHostPrefix: "{AccountId}.",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListAccessGrantsLocationsError = CommonErrors;
/**
 * Returns a list of the locations registered in your S3 Access Grants instance.
 *
 * ### Permissions
 *
 * You must have the `s3:ListAccessGrantsLocations` permission to use this operation.
 */
export const listAccessGrantsLocations: API.PaginatedOperationMethod<
  ListAccessGrantsLocationsRequest,
  ListAccessGrantsLocationsResult,
  ListAccessGrantsLocationsError,
  Creds | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAccessGrantsLocationsRequest,
  output: ListAccessGrantsLocationsResult,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAccessGrantsLocations",
  endpointHostPrefix: "{AccountId}.",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListAccessPointsError = CommonErrors;
/**
 * This operation is not supported by directory buckets.
 *
 * Returns a list of the access points. You can retrieve up to 1,000 access points per call. If the call
 * returns more than 1,000 access points (or the number specified in `maxResults`,
 * whichever is less), the response will include a continuation token that you can use to list
 * the additional access points.
 *
 * Returns only access points attached to S3 buckets by default. To return all access points specify
 * `DataSourceType` as `ALL`.
 *
 * All Amazon S3 on Outposts REST API requests for this action require an additional parameter of `x-amz-outpost-id` to be passed with the request. In addition, you must use an S3 on Outposts endpoint hostname prefix instead of `s3-control`. For an example of the request syntax for Amazon S3 on Outposts that uses the S3 on Outposts endpoint hostname prefix and the `x-amz-outpost-id` derived by using the access point ARN, see the Examples section.
 *
 * The following actions are related to `ListAccessPoints`:
 *
 * - CreateAccessPoint
 *
 * - DeleteAccessPoint
 *
 * - GetAccessPoint
 */
export const listAccessPoints: API.PaginatedOperationMethod<
  ListAccessPointsRequest,
  ListAccessPointsResult,
  ListAccessPointsError,
  Creds | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAccessPointsRequest,
  output: ListAccessPointsResult,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAccessPoints",
  endpointHostPrefix: "{AccountId}.",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListAccessPointsForDirectoryBucketsError = CommonErrors;
/**
 * Returns a list of the access points that are owned by the Amazon Web Services account and that are associated with the specified directory bucket.
 *
 * To list access points for general purpose buckets, see ListAccesspoints.
 *
 * To use this operation, you must have the permission to perform the
 * `s3express:ListAccessPointsForDirectoryBuckets` action.
 *
 * For information about REST API errors, see REST error responses.
 */
export const listAccessPointsForDirectoryBuckets: API.PaginatedOperationMethod<
  ListAccessPointsForDirectoryBucketsRequest,
  ListAccessPointsForDirectoryBucketsResult,
  ListAccessPointsForDirectoryBucketsError,
  Creds | HttpClient.HttpClient,
  AccessPoint
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAccessPointsForDirectoryBucketsRequest,
  output: ListAccessPointsForDirectoryBucketsResult,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAccessPointsForDirectoryBuckets",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AccessPointList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListAccessPointsForObjectLambdaError = CommonErrors;
/**
 * This operation is not supported by directory buckets.
 *
 * Returns some or all (up to 1,000) access points associated with the Object Lambda Access Point per call. If there
 * are more access points than what can be returned in one call, the response will include a
 * continuation token that you can use to list the additional access points.
 *
 * The following actions are related to
 * `ListAccessPointsForObjectLambda`:
 *
 * - CreateAccessPointForObjectLambda
 *
 * - DeleteAccessPointForObjectLambda
 *
 * - GetAccessPointForObjectLambda
 */
export const listAccessPointsForObjectLambda: API.PaginatedOperationMethod<
  ListAccessPointsForObjectLambdaRequest,
  ListAccessPointsForObjectLambdaResult,
  ListAccessPointsForObjectLambdaError,
  Creds | HttpClient.HttpClient,
  ObjectLambdaAccessPoint
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAccessPointsForObjectLambdaRequest,
  output: ListAccessPointsForObjectLambdaResult,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAccessPointsForObjectLambda",
  endpointHostPrefix: "{AccountId}.",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ObjectLambdaAccessPointList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCallerAccessGrantsError = CommonErrors;
/**
 * Use this API to list the access grants that grant the caller access to Amazon S3 data through S3 Access Grants. The caller (grantee) can be an Identity and Access Management (IAM) identity or Amazon Web Services Identity Center corporate directory identity. You must pass the Amazon Web Services account of the S3 data owner (grantor) in the request. You can, optionally, narrow the results by `GrantScope`, using a fragment of the data's S3 path, and S3 Access Grants will return only the grants with a path that contains the path fragment. You can also pass the `AllowedByApplication` filter in the request, which returns only the grants authorized for applications, whether the application is the caller's Identity Center application or any other application (`ALL`). For more information, see List the caller's access grants in the *Amazon S3 User Guide*.
 *
 * ### Permissions
 *
 * You must have the `s3:ListCallerAccessGrants` permission to use this operation.
 */
export const listCallerAccessGrants: API.PaginatedOperationMethod<
  ListCallerAccessGrantsRequest,
  ListCallerAccessGrantsResult,
  ListCallerAccessGrantsError,
  Creds | HttpClient.HttpClient,
  ListCallerAccessGrantsEntry
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCallerAccessGrantsRequest,
  output: ListCallerAccessGrantsResult,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCallerAccessGrants",
  endpointHostPrefix: "{AccountId}.",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "CallerAccessGrantsList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListJobsError =
  | InternalServiceException
  | InvalidNextTokenException
  | InvalidRequestException
  | CommonErrors;
/**
 * Lists current S3 Batch Operations jobs as well as the jobs that have ended within the last 90
 * days for the Amazon Web Services account making the request. For more information, see S3 Batch Operations in the *Amazon S3 User Guide*.
 *
 * ### Permissions
 *
 * To use the
 * `ListJobs` operation, you must have permission to
 * perform the `s3:ListJobs` action.
 *
 * Related actions include:
 *
 * - CreateJob
 *
 * - DescribeJob
 *
 * - UpdateJobPriority
 *
 * - UpdateJobStatus
 */
export const listJobs: API.PaginatedOperationMethod<
  ListJobsRequest,
  ListJobsResult,
  ListJobsError,
  Creds | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListJobsRequest,
  output: ListJobsResult,
  errors: [
    InternalServiceException,
    InvalidNextTokenException,
    InvalidRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListJobs",
  endpointHostPrefix: "{AccountId}.",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListMultiRegionAccessPointsError = CommonErrors;
/**
 * This operation is not supported by directory buckets.
 *
 * Returns a list of the Multi-Region Access Points currently associated with the specified Amazon Web Services account.
 * Each call can return up to 100 Multi-Region Access Points, the maximum number of Multi-Region Access Points that can be
 * associated with a single account.
 *
 * This action will always be routed to the US West (Oregon) Region. For more information
 * about the restrictions around working with Multi-Region Access Points, see Multi-Region Access Point
 * restrictions and limitations in the *Amazon S3 User Guide*.
 *
 * The following actions are related to `ListMultiRegionAccessPoint`:
 *
 * - CreateMultiRegionAccessPoint
 *
 * - DeleteMultiRegionAccessPoint
 *
 * - DescribeMultiRegionAccessPointOperation
 *
 * - GetMultiRegionAccessPoint
 */
export const listMultiRegionAccessPoints: API.PaginatedOperationMethod<
  ListMultiRegionAccessPointsRequest,
  ListMultiRegionAccessPointsResult,
  ListMultiRegionAccessPointsError,
  Creds | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListMultiRegionAccessPointsRequest,
  output: ListMultiRegionAccessPointsResult,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMultiRegionAccessPoints",
  endpointHostPrefix: "{AccountId}.",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListRegionalBucketsError = CommonErrors;
/**
 * This operation is not supported by directory buckets.
 *
 * Returns a list of all Outposts buckets in an Outpost that are owned by the authenticated
 * sender of the request. For more information, see Using Amazon S3 on Outposts in the
 * *Amazon S3 User Guide*.
 *
 * For an example of the request syntax for Amazon S3 on Outposts that uses the S3 on Outposts
 * endpoint hostname prefix and `x-amz-outpost-id` in your request, see the Examples section.
 */
export const listRegionalBuckets: API.PaginatedOperationMethod<
  ListRegionalBucketsRequest,
  ListRegionalBucketsResult,
  ListRegionalBucketsError,
  Creds | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListRegionalBucketsRequest,
  output: ListRegionalBucketsResult,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRegionalBuckets",
  endpointHostPrefix: "{AccountId}.",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListStorageLensConfigurationsError = CommonErrors;
/**
 * This operation is not supported by directory buckets.
 *
 * Gets a list of Amazon S3 Storage Lens configurations. For more information about S3 Storage Lens, see
 * Assessing your
 * storage activity and usage with Amazon S3 Storage Lens in the
 * *Amazon S3 User Guide*.
 *
 * To use this action, you must have permission to perform the
 * `s3:ListStorageLensConfigurations` action. For more information, see
 * Setting permissions to
 * use Amazon S3 Storage Lens in the *Amazon S3 User Guide*.
 */
export const listStorageLensConfigurations: API.PaginatedOperationMethod<
  ListStorageLensConfigurationsRequest,
  ListStorageLensConfigurationsResult,
  ListStorageLensConfigurationsError,
  Creds | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListStorageLensConfigurationsRequest,
  output: ListStorageLensConfigurationsResult,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStorageLensConfigurations",
  endpointHostPrefix: "{AccountId}.",
  pagination: { inputToken: "NextToken", outputToken: "NextToken" } as const,
})) as any;

export type ListStorageLensGroupsError = CommonErrors;
/**
 * Lists all the Storage Lens groups in the specified home Region.
 *
 * To use this operation, you must have the permission to perform the
 * `s3:ListStorageLensGroups` action. For more information about the required Storage Lens
 * Groups permissions, see Setting account permissions to use S3 Storage Lens groups.
 *
 * For information about Storage Lens groups errors, see List of Amazon S3 Storage
 * Lens error codes.
 */
export const listStorageLensGroups: API.PaginatedOperationMethod<
  ListStorageLensGroupsRequest,
  ListStorageLensGroupsResult,
  ListStorageLensGroupsError,
  Creds | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListStorageLensGroupsRequest,
  output: ListStorageLensGroupsResult,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStorageLensGroups",
  endpointHostPrefix: "{AccountId}.",
  pagination: { inputToken: "NextToken", outputToken: "NextToken" } as const,
})) as any;

export type ListTagsForResourceError = NoSuchAccessPoint | CommonErrors;
/**
 * This operation allows you to list all of the tags for a specified resource. Each tag is a label consisting of a key and value. Tags can help you organize, track costs for, and control access to resources.
 *
 * This operation is only supported for the following Amazon S3 resources:
 *
 * - General purpose buckets
 *
 * - Access Points for directory buckets
 *
 * - Access Points for general purpose buckets
 *
 * - Directory buckets
 *
 * - S3 Storage Lens groups
 *
 * - S3 Access Grants instances, registered locations, and grants.
 *
 * ### Permissions
 *
 * For general purpose buckets, access points for general purpose buckets, Storage Lens groups, and S3 Access Grants, you must have the `s3:ListTagsForResource` permission to use this operation.
 *
 * ### Directory bucket permissions
 *
 * For directory buckets, you must have the `s3express:ListTagsForResource` permission to use this operation. For more information about directory buckets policies and permissions, see Identity and Access Management (IAM) for S3 Express One Zone in the *Amazon S3 User Guide*.
 *
 * ### HTTP Host header syntax
 *
 * **Directory buckets ** - The HTTP Host header syntax is `s3express-control.*region*.amazonaws.com`.
 *
 * For information about S3 Tagging errors, see List of Amazon S3 Tagging error codes.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResult,
  ListTagsForResourceError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResult,
  errors: [NoSuchAccessPoint],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  endpointHostPrefix: "{AccountId}.",
}));

export type PutAccessGrantsInstanceResourcePolicyError = CommonErrors;
/**
 * Updates the resource policy of the S3 Access Grants instance.
 *
 * ### Permissions
 *
 * You must have the `s3:PutAccessGrantsInstanceResourcePolicy` permission to use this operation.
 */
export const putAccessGrantsInstanceResourcePolicy: API.OperationMethod<
  PutAccessGrantsInstanceResourcePolicyRequest,
  PutAccessGrantsInstanceResourcePolicyResult,
  PutAccessGrantsInstanceResourcePolicyError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutAccessGrantsInstanceResourcePolicyRequest,
  output: PutAccessGrantsInstanceResourcePolicyResult,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAccessGrantsInstanceResourcePolicy",
  endpointHostPrefix: "{AccountId}.",
}));

export type PutAccessPointConfigurationForObjectLambdaError =
  | NoSuchAccessPoint
  | InvalidRequest
  | CommonErrors;
/**
 * This operation is not supported by directory buckets.
 *
 * Replaces configuration for an Object Lambda Access Point.
 *
 * The following actions are related to
 * `PutAccessPointConfigurationForObjectLambda`:
 *
 * - GetAccessPointConfigurationForObjectLambda
 */
export const putAccessPointConfigurationForObjectLambda: API.OperationMethod<
  PutAccessPointConfigurationForObjectLambdaRequest,
  PutAccessPointConfigurationForObjectLambdaResponse,
  PutAccessPointConfigurationForObjectLambdaError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutAccessPointConfigurationForObjectLambdaRequest,
  output: PutAccessPointConfigurationForObjectLambdaResponse,
  errors: [NoSuchAccessPoint, InvalidRequest],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAccessPointConfigurationForObjectLambda",
  endpointHostPrefix: "{AccountId}.",
}));

export type PutAccessPointPolicyError =
  | NoSuchAccessPoint
  | MalformedPolicy
  | CommonErrors;
/**
 * Associates an access policy with the specified access point. Each access point can have only one policy,
 * so a request made to this API replaces any existing policy associated with the specified
 * access point.
 *
 * All Amazon S3 on Outposts REST API requests for this action require an additional parameter of `x-amz-outpost-id` to be passed with the request. In addition, you must use an S3 on Outposts endpoint hostname prefix instead of `s3-control`. For an example of the request syntax for Amazon S3 on Outposts that uses the S3 on Outposts endpoint hostname prefix and the `x-amz-outpost-id` derived by using the access point ARN, see the Examples section.
 *
 * The following actions are related to `PutAccessPointPolicy`:
 *
 * - GetAccessPointPolicy
 *
 * - DeleteAccessPointPolicy
 */
export const putAccessPointPolicy: API.OperationMethod<
  PutAccessPointPolicyRequest,
  PutAccessPointPolicyResponse,
  PutAccessPointPolicyError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutAccessPointPolicyRequest,
  output: PutAccessPointPolicyResponse,
  errors: [NoSuchAccessPoint, MalformedPolicy],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAccessPointPolicy",
  endpointHostPrefix: "{AccountId}.",
}));

export type PutAccessPointPolicyForObjectLambdaError =
  | NoSuchAccessPoint
  | MalformedPolicy
  | CommonErrors;
/**
 * This operation is not supported by directory buckets.
 *
 * Creates or replaces resource policy for an Object Lambda Access Point. For an example policy, see Creating Object Lambda Access Points in the *Amazon S3 User Guide*.
 *
 * The following actions are related to
 * `PutAccessPointPolicyForObjectLambda`:
 *
 * - DeleteAccessPointPolicyForObjectLambda
 *
 * - GetAccessPointPolicyForObjectLambda
 */
export const putAccessPointPolicyForObjectLambda: API.OperationMethod<
  PutAccessPointPolicyForObjectLambdaRequest,
  PutAccessPointPolicyForObjectLambdaResponse,
  PutAccessPointPolicyForObjectLambdaError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutAccessPointPolicyForObjectLambdaRequest,
  output: PutAccessPointPolicyForObjectLambdaResponse,
  errors: [NoSuchAccessPoint, MalformedPolicy],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAccessPointPolicyForObjectLambda",
  endpointHostPrefix: "{AccountId}.",
}));

export type PutAccessPointScopeError = CommonErrors;
/**
 * Creates or replaces the access point scope for a directory bucket. You can use the access point scope to restrict access to specific prefixes, API operations, or a combination of both.
 *
 * You can specify any amount of prefixes, but the total length of characters of all prefixes must be less than 256 bytes in size.
 *
 * To use this operation, you must have the permission to perform the
 * `s3express:PutAccessPointScope` action.
 *
 * For information about REST API errors, see REST error responses.
 */
export const putAccessPointScope: API.OperationMethod<
  PutAccessPointScopeRequest,
  PutAccessPointScopeResponse,
  PutAccessPointScopeError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutAccessPointScopeRequest,
  output: PutAccessPointScopeResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAccessPointScope",
}));

export type PutBucketLifecycleConfigurationError = CommonErrors;
/**
 * This action puts a lifecycle configuration to an Amazon S3 on Outposts bucket. To put a
 * lifecycle configuration to an S3 bucket, see PutBucketLifecycleConfiguration in the *Amazon S3 API Reference*.
 *
 * Creates a new lifecycle configuration for the S3 on Outposts bucket or replaces an
 * existing lifecycle configuration. Outposts buckets only support lifecycle configurations
 * that delete/expire objects after a certain period of time and abort incomplete multipart
 * uploads.
 *
 * All Amazon S3 on Outposts REST API requests for this action require an additional parameter of `x-amz-outpost-id` to be passed with the request. In addition, you must use an S3 on Outposts endpoint hostname prefix instead of `s3-control`. For an example of the request syntax for Amazon S3 on Outposts that uses the S3 on Outposts endpoint hostname prefix and the `x-amz-outpost-id` derived by using the access point ARN, see the Examples section.
 *
 * The following actions are related to
 * `PutBucketLifecycleConfiguration`:
 *
 * - GetBucketLifecycleConfiguration
 *
 * - DeleteBucketLifecycleConfiguration
 */
export const putBucketLifecycleConfiguration: API.OperationMethod<
  PutBucketLifecycleConfigurationRequest,
  PutBucketLifecycleConfigurationResponse,
  PutBucketLifecycleConfigurationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutBucketLifecycleConfigurationRequest,
  output: PutBucketLifecycleConfigurationResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutBucketLifecycleConfiguration",
  endpointHostPrefix: "{AccountId}.",
}));

export type PutBucketPolicyError = CommonErrors;
/**
 * This action puts a bucket policy to an Amazon S3 on Outposts bucket. To put a policy on an
 * S3 bucket, see PutBucketPolicy in the
 * *Amazon S3 API Reference*.
 *
 * Applies an Amazon S3 bucket policy to an Outposts bucket. For more information, see Using
 * Amazon S3 on Outposts in the *Amazon S3 User Guide*.
 *
 * If you are using an identity other than the root user of the Amazon Web Services account that owns the
 * Outposts bucket, the calling identity must have the `PutBucketPolicy`
 * permissions on the specified Outposts bucket and belong to the bucket owner's account in
 * order to use this action.
 *
 * If you don't have `PutBucketPolicy` permissions, Amazon S3 returns a 403
 * Access Denied error. If you have the correct permissions, but you're not using an
 * identity that belongs to the bucket owner's account, Amazon S3 returns a 405 Method Not
 * Allowed error.
 *
 * As a security precaution, the root user of the Amazon Web Services account that owns a bucket can
 * always use this action, even if the policy explicitly denies the root user the ability
 * to perform this action.
 *
 * For more information about bucket policies, see Using Bucket Policies and User
 * Policies.
 *
 * All Amazon S3 on Outposts REST API requests for this action require an additional parameter of `x-amz-outpost-id` to be passed with the request. In addition, you must use an S3 on Outposts endpoint hostname prefix instead of `s3-control`. For an example of the request syntax for Amazon S3 on Outposts that uses the S3 on Outposts endpoint hostname prefix and the `x-amz-outpost-id` derived by using the access point ARN, see the Examples section.
 *
 * The following actions are related to `PutBucketPolicy`:
 *
 * - GetBucketPolicy
 *
 * - DeleteBucketPolicy
 */
export const putBucketPolicy: API.OperationMethod<
  PutBucketPolicyRequest,
  PutBucketPolicyResponse,
  PutBucketPolicyError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutBucketPolicyRequest,
  output: PutBucketPolicyResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutBucketPolicy",
  endpointHostPrefix: "{AccountId}.",
}));

export type PutBucketReplicationError = CommonErrors;
/**
 * This action creates an Amazon S3 on Outposts bucket's replication configuration. To create
 * an S3 bucket's replication configuration, see PutBucketReplication
 * in the *Amazon S3 API Reference*.
 *
 * Creates a replication configuration or replaces an existing one. For information about
 * S3 replication on Outposts configuration, see Replicating objects for
 * S3 on Outposts in the *Amazon S3 User Guide*.
 *
 * It can take a while to propagate `PUT` or `DELETE` requests for
 * a replication configuration to all S3 on Outposts systems. Therefore, the replication
 * configuration that's returned by a `GET` request soon after a
 * `PUT` or `DELETE` request might return a more recent result
 * than what's on the Outpost. If an Outpost is offline, the delay in updating the
 * replication configuration on that Outpost can be significant.
 *
 * Specify the replication configuration in the request body. In the replication
 * configuration, you provide the following information:
 *
 * - The name of the destination bucket or buckets where you want S3 on Outposts to
 * replicate objects
 *
 * - The Identity and Access Management (IAM) role that S3 on Outposts can assume to replicate objects on
 * your behalf
 *
 * - Other relevant information, such as replication rules
 *
 * A replication configuration must include at least one rule and can contain a maximum of
 * 100. Each rule identifies a subset of objects to replicate by filtering the objects in the
 * source Outposts bucket. To choose additional subsets of objects to replicate, add a rule
 * for each subset.
 *
 * To specify a subset of the objects in the source Outposts bucket to apply a replication
 * rule to, add the `Filter` element as a child of the `Rule` element.
 * You can filter objects based on an object key prefix, one or more object tags, or both.
 * When you add the `Filter` element in the configuration, you must also add the
 * following elements: `DeleteMarkerReplication`, `Status`, and
 * `Priority`.
 *
 * Using `PutBucketReplication` on Outposts requires that both the source and
 * destination buckets must have versioning enabled. For information about enabling versioning
 * on a bucket, see Managing S3 Versioning
 * for your S3 on Outposts bucket.
 *
 * For information about S3 on Outposts replication failure reasons, see Replication failure reasons in the *Amazon S3 User Guide*.
 *
 * **Handling Replication of Encrypted Objects**
 *
 * Outposts buckets are encrypted at all times. All the objects in the source Outposts
 * bucket are encrypted and can be replicated. Also, all the replicas in the destination
 * Outposts bucket are encrypted with the same encryption key as the objects in the source
 * Outposts bucket.
 *
 * **Permissions**
 *
 * To create a `PutBucketReplication` request, you must have
 * `s3-outposts:PutReplicationConfiguration` permissions for the bucket. The
 * Outposts bucket owner has this permission by default and can grant it to others. For more
 * information about permissions, see Setting up IAM with
 * S3 on Outposts and Managing access to
 * S3 on Outposts buckets.
 *
 * To perform this operation, the user or role must also have the
 * `iam:CreateRole` and `iam:PassRole` permissions. For more
 * information, see Granting a user permissions to
 * pass a role to an Amazon Web Services service.
 *
 * All Amazon S3 on Outposts REST API requests for this action require an additional parameter of `x-amz-outpost-id` to be passed with the request. In addition, you must use an S3 on Outposts endpoint hostname prefix instead of `s3-control`. For an example of the request syntax for Amazon S3 on Outposts that uses the S3 on Outposts endpoint hostname prefix and the `x-amz-outpost-id` derived by using the access point ARN, see the Examples section.
 *
 * The following operations are related to `PutBucketReplication`:
 *
 * - GetBucketReplication
 *
 * - DeleteBucketReplication
 */
export const putBucketReplication: API.OperationMethod<
  PutBucketReplicationRequest,
  PutBucketReplicationResponse,
  PutBucketReplicationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutBucketReplicationRequest,
  output: PutBucketReplicationResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutBucketReplication",
  endpointHostPrefix: "{AccountId}.",
}));

export type PutBucketTaggingError = CommonErrors;
/**
 * This action puts tags on an Amazon S3 on Outposts bucket. To put tags on an S3 bucket, see
 * PutBucketTagging in the *Amazon S3 API Reference*.
 *
 * Sets the tags for an S3 on Outposts bucket. For more information, see Using
 * Amazon S3 on Outposts in the *Amazon S3 User Guide*.
 *
 * Use tags to organize your Amazon Web Services bill to reflect your own cost structure. To do this,
 * sign up to get your Amazon Web Services account bill with tag key values included. Then, to see the cost
 * of combined resources, organize your billing information according to resources with the
 * same tag key values. For example, you can tag several resources with a specific application
 * name, and then organize your billing information to see the total cost of that application
 * across several services. For more information, see Cost allocation and
 * tagging.
 *
 * Within a bucket, if you add a tag that has the same key as an existing tag, the new
 * value overwrites the old value. For more information, see Using cost allocation in Amazon S3
 * bucket tags.
 *
 * To use this action, you must have permissions to perform the
 * `s3-outposts:PutBucketTagging` action. The Outposts bucket owner has this
 * permission by default and can grant this permission to others. For more information about
 * permissions, see Permissions Related to Bucket Subresource Operations and Managing
 * access permissions to your Amazon S3 resources.
 *
 * `PutBucketTagging` has the following special errors:
 *
 * - Error code: `InvalidTagError`
 *
 * - Description: The tag provided was not a valid tag. This error can occur if
 * the tag did not pass input validation. For information about tag restrictions,
 * see
 * User-Defined Tag Restrictions and
 * Amazon Web Services-Generated Cost Allocation Tag Restrictions.
 *
 * - Error code: `MalformedXMLError`
 *
 * - Description: The XML provided does not match the schema.
 *
 * - Error code: `OperationAbortedError `
 *
 * - Description: A conflicting conditional action is currently in progress
 * against this resource. Try again.
 *
 * - Error code: `InternalError`
 *
 * - Description: The service was unable to apply the provided tag to the
 * bucket.
 *
 * All Amazon S3 on Outposts REST API requests for this action require an additional parameter of `x-amz-outpost-id` to be passed with the request. In addition, you must use an S3 on Outposts endpoint hostname prefix instead of `s3-control`. For an example of the request syntax for Amazon S3 on Outposts that uses the S3 on Outposts endpoint hostname prefix and the `x-amz-outpost-id` derived by using the access point ARN, see the Examples section.
 *
 * The following actions are related to `PutBucketTagging`:
 *
 * - GetBucketTagging
 *
 * - DeleteBucketTagging
 */
export const putBucketTagging: API.OperationMethod<
  PutBucketTaggingRequest,
  PutBucketTaggingResponse,
  PutBucketTaggingError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutBucketTaggingRequest,
  output: PutBucketTaggingResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutBucketTagging",
  endpointHostPrefix: "{AccountId}.",
}));

export type PutBucketVersioningError = CommonErrors;
/**
 * This operation sets the versioning state
 * for
 * S3 on Outposts
 * buckets
 * only. To set the versioning state for an S3 bucket, see PutBucketVersioning in the *Amazon S3 API Reference*.
 *
 * Sets the versioning state for an S3 on Outposts bucket. With
 * S3
 * Versioning,
 * you can save multiple distinct copies of your
 * objects
 * and recover from unintended user actions and application failures.
 *
 * You can set the versioning state to one of the following:
 *
 * - **Enabled** - Enables versioning for the objects in
 * the bucket. All objects added to the bucket receive a unique version ID.
 *
 * - **Suspended** - Suspends versioning for the objects
 * in the bucket. All objects added to the bucket receive the version ID
 * `null`.
 *
 * If you've never set versioning on your bucket, it has no versioning state. In that case,
 * a
 * GetBucketVersioning request does not return a versioning state value.
 *
 * When you enable S3 Versioning, for each object in your bucket, you have a current
 * version and zero or more noncurrent versions. You can configure your bucket S3 Lifecycle
 * rules to expire noncurrent versions after a specified time period. For more information,
 * see Creating and managing
 * a lifecycle configuration for your S3 on Outposts bucket in the Amazon S3
 * User Guide.
 *
 * If you have an object expiration lifecycle configuration in your non-versioned bucket
 * and you want to maintain the same permanent delete behavior when you enable versioning, you
 * must add a noncurrent expiration policy. The noncurrent expiration lifecycle configuration
 * will manage the deletes of the noncurrent object versions in the version-enabled bucket.
 * For more information, see Versioning in the Amazon S3
 * User Guide.
 *
 * All Amazon S3 on Outposts REST API requests for this action require an additional parameter of `x-amz-outpost-id` to be passed with the request. In addition, you must use an S3 on Outposts endpoint hostname prefix instead of `s3-control`. For an example of the request syntax for Amazon S3 on Outposts that uses the S3 on Outposts endpoint hostname prefix and the `x-amz-outpost-id` derived by using the access point ARN, see the Examples section.
 *
 * The following operations are related to `PutBucketVersioning` for
 * S3 on Outposts.
 *
 * - GetBucketVersioning
 *
 * - PutBucketLifecycleConfiguration
 *
 * - GetBucketLifecycleConfiguration
 */
export const putBucketVersioning: API.OperationMethod<
  PutBucketVersioningRequest,
  PutBucketVersioningResponse,
  PutBucketVersioningError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutBucketVersioningRequest,
  output: PutBucketVersioningResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutBucketVersioning",
  endpointHostPrefix: "{AccountId}.",
}));

export type PutJobTaggingError =
  | InternalServiceException
  | NotFoundException
  | TooManyRequestsException
  | TooManyTagsException
  | CommonErrors;
/**
 * Sets the supplied tag-set on an S3 Batch Operations job.
 *
 * A tag is a key-value pair. You can associate S3 Batch Operations tags with any job by sending
 * a PUT request against the tagging subresource that is associated with the job. To modify
 * the existing tag set, you can either replace the existing tag set entirely, or make changes
 * within the existing tag set by retrieving the existing tag set using GetJobTagging, modify that tag set, and use this operation to replace the tag set
 * with the one you modified. For more information, see Controlling
 * access and labeling jobs using tags in the *Amazon S3 User Guide*.
 *
 * - If you send this request with an empty tag set, Amazon S3 deletes the existing
 * tag set on the Batch Operations job. If you use this method, you are charged for a Tier
 * 1 Request (PUT). For more information, see Amazon S3 pricing.
 *
 * - For deleting existing tags for your Batch Operations job, a DeleteJobTagging request is preferred because it achieves the same
 * result without incurring charges.
 *
 * - A few things to consider about using tags:
 *
 * - Amazon S3 limits the maximum number of tags to 50 tags per job.
 *
 * - You can associate up to 50 tags with a job as long as they have unique
 * tag keys.
 *
 * - A tag key can be up to 128 Unicode characters in length, and tag values
 * can be up to 256 Unicode characters in length.
 *
 * - The key and values are case sensitive.
 *
 * - For tagging-related restrictions related to characters and encodings, see
 * User-Defined Tag Restrictions in the *Billing and Cost Management User Guide*.
 *
 * ### Permissions
 *
 * To use the
 * `PutJobTagging` operation, you must have permission to
 * perform the `s3:PutJobTagging` action.
 *
 * Related actions include:
 *
 * - CreateJob
 *
 * - GetJobTagging
 *
 * - DeleteJobTagging
 */
export const putJobTagging: API.OperationMethod<
  PutJobTaggingRequest,
  PutJobTaggingResult,
  PutJobTaggingError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutJobTaggingRequest,
  output: PutJobTaggingResult,
  errors: [
    InternalServiceException,
    NotFoundException,
    TooManyRequestsException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutJobTagging",
  endpointHostPrefix: "{AccountId}.",
}));

export type PutMultiRegionAccessPointPolicyError =
  | NoSuchMultiRegionAccessPoint
  | InvalidRequest
  | CommonErrors;
/**
 * This operation is not supported by directory buckets.
 *
 * Associates an access control policy with the specified Multi-Region Access Point. Each Multi-Region Access Point can have only
 * one policy, so a request made to this action replaces any existing policy that is
 * associated with the specified Multi-Region Access Point.
 *
 * This action will always be routed to the US West (Oregon) Region. For more information
 * about the restrictions around working with Multi-Region Access Points, see Multi-Region Access Point
 * restrictions and limitations in the *Amazon S3 User Guide*.
 *
 * The following actions are related to
 * `PutMultiRegionAccessPointPolicy`:
 *
 * - GetMultiRegionAccessPointPolicy
 *
 * - GetMultiRegionAccessPointPolicyStatus
 */
export const putMultiRegionAccessPointPolicy: API.OperationMethod<
  PutMultiRegionAccessPointPolicyRequest,
  PutMultiRegionAccessPointPolicyResult,
  PutMultiRegionAccessPointPolicyError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutMultiRegionAccessPointPolicyRequest,
  output: PutMultiRegionAccessPointPolicyResult,
  errors: [NoSuchMultiRegionAccessPoint, InvalidRequest],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutMultiRegionAccessPointPolicy",
  endpointHostPrefix: "{AccountId}.",
}));

export type PutPublicAccessBlockError = CommonErrors;
/**
 * This operation is not supported by directory buckets.
 *
 * Creates or modifies the `PublicAccessBlock` configuration for an
 * Amazon Web Services account. This operation may be restricted when the account is managed by
 * organization-level Block Public Access policies. You might get an Access Denied (403) error
 * when the account is managed by organization-level Block Public Access policies.
 * Organization-level policies override account-level settings, preventing direct
 * account-level modifications. For this operation, users must have the
 * `s3:PutAccountPublicAccessBlock` permission. For more information, see
 * Using Amazon S3 block public access.
 *
 * Related actions include:
 *
 * - GetPublicAccessBlock
 *
 * - DeletePublicAccessBlock
 */
export const putPublicAccessBlock: API.OperationMethod<
  PutPublicAccessBlockRequest,
  PutPublicAccessBlockResponse,
  PutPublicAccessBlockError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutPublicAccessBlockRequest,
  output: PutPublicAccessBlockResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutPublicAccessBlock",
  endpointHostPrefix: "{AccountId}.",
}));

export type PutStorageLensConfigurationError =
  | InvalidRequest
  | MissingBucketLevelActivityMetrics
  | CommonErrors;
/**
 * This operation is not supported by directory buckets.
 *
 * Puts an Amazon S3 Storage Lens configuration. For more information about S3 Storage Lens, see Working with
 * Amazon S3 Storage Lens in the *Amazon S3 User Guide*. For a complete list of S3 Storage Lens metrics, see S3 Storage Lens metrics glossary in the *Amazon S3 User Guide*.
 *
 * To use this action, you must have permission to perform the
 * `s3:PutStorageLensConfiguration` action. For more information, see Setting permissions to use Amazon S3 Storage Lens in the
 * *Amazon S3 User Guide*.
 */
export const putStorageLensConfiguration: API.OperationMethod<
  PutStorageLensConfigurationRequest,
  PutStorageLensConfigurationResponse,
  PutStorageLensConfigurationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutStorageLensConfigurationRequest,
  output: PutStorageLensConfigurationResponse,
  errors: [InvalidRequest, MissingBucketLevelActivityMetrics],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutStorageLensConfiguration",
  endpointHostPrefix: "{AccountId}.",
}));

export type PutStorageLensConfigurationTaggingError =
  | NoSuchConfiguration
  | CommonErrors;
/**
 * This operation is not supported by directory buckets.
 *
 * Put or replace tags on an existing Amazon S3 Storage Lens configuration. For more information
 * about S3 Storage Lens, see Assessing your storage activity and usage with Amazon S3 Storage Lens in the
 * *Amazon S3 User Guide*.
 *
 * To use this action, you must have permission to perform the
 * `s3:PutStorageLensConfigurationTagging` action. For more information, see
 * Setting permissions to
 * use Amazon S3 Storage Lens in the *Amazon S3 User Guide*.
 */
export const putStorageLensConfigurationTagging: API.OperationMethod<
  PutStorageLensConfigurationTaggingRequest,
  PutStorageLensConfigurationTaggingResult,
  PutStorageLensConfigurationTaggingError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutStorageLensConfigurationTaggingRequest,
  output: PutStorageLensConfigurationTaggingResult,
  errors: [NoSuchConfiguration],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutStorageLensConfigurationTagging",
  endpointHostPrefix: "{AccountId}.",
}));

export type SubmitMultiRegionAccessPointRoutesError = CommonErrors;
/**
 * This operation is not supported by directory buckets.
 *
 * Submits an updated route configuration for a Multi-Region Access Point. This API operation updates the
 * routing status for the specified Regions from active to passive, or from passive to active.
 * A value of `0` indicates a passive status, which means that traffic won't be
 * routed to the specified Region. A value of `100` indicates an active status,
 * which means that traffic will be routed to the specified Region. At least one Region must
 * be active at all times.
 *
 * When the routing configuration is changed, any in-progress operations (uploads, copies,
 * deletes, and so on) to formerly active Regions will continue to run to their final
 * completion state (success or failure). The routing configurations of any Regions that
 * aren’t specified remain unchanged.
 *
 * Updated routing configurations might not be immediately applied. It can take up to 2
 * minutes for your changes to take effect.
 *
 * To submit routing control changes and failover requests, use the Amazon S3 failover control
 * infrastructure endpoints in these five Amazon Web Services Regions:
 *
 * - `us-east-1`
 *
 * - `us-west-2`
 *
 * - `ap-southeast-2`
 *
 * - `ap-northeast-1`
 *
 * - `eu-west-1`
 */
export const submitMultiRegionAccessPointRoutes: API.OperationMethod<
  SubmitMultiRegionAccessPointRoutesRequest,
  SubmitMultiRegionAccessPointRoutesResult,
  SubmitMultiRegionAccessPointRoutesError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SubmitMultiRegionAccessPointRoutesRequest,
  output: SubmitMultiRegionAccessPointRoutesResult,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SubmitMultiRegionAccessPointRoutes",
  endpointHostPrefix: "{AccountId}.",
}));

export type TagResourceError = NoSuchAccessPoint | CommonErrors;
/**
 * Creates a new user-defined tag or updates an existing tag. Each tag is a label consisting of a key and value that is applied to your resource. Tags can help you organize, track costs for, and control access to your resources. You can add up to 50 Amazon Web Services resource tags for each S3 resource.
 *
 * This operation is only supported for the following Amazon S3 resource:
 *
 * - General purpose buckets
 *
 * - Access Points for directory buckets
 *
 * - Access Points for general purpose buckets
 *
 * - Directory buckets
 *
 * - S3 Storage Lens groups
 *
 * - S3 Access Grants instances, registered locations, or grants.
 *
 * ### Permissions
 *
 * For general purpose buckets, access points for general purpose buckets, Storage Lens groups, and S3 Access Grants, you must have the `s3:TagResource` permission to use this operation.
 *
 * ### Directory bucket permissions
 *
 * For directory buckets, you must have the `s3express:TagResource` permission to use this operation. For more information about directory buckets policies and permissions, see Identity and Access Management (IAM) for S3 Express One Zone in the *Amazon S3 User Guide*.
 *
 * ### HTTP Host header syntax
 *
 * **Directory buckets ** - The HTTP Host header syntax is `s3express-control.*region*.amazonaws.com`.
 *
 * For information about S3 Tagging errors, see List of Amazon S3 Tagging error codes.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResult,
  TagResourceError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TagResourceRequest,
  output: TagResourceResult,
  errors: [NoSuchAccessPoint],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
  endpointHostPrefix: "{AccountId}.",
}));

export type UntagResourceError = NoSuchAccessPoint | CommonErrors;
/**
 * This operation removes the specified user-defined tags from an S3 resource. You can pass one or more tag keys.
 *
 * This operation is only supported for the following Amazon S3 resources:
 *
 * - General purpose buckets
 *
 * - Access Points for directory buckets
 *
 * - Access Points for general purpose buckets
 *
 * - Directory buckets
 *
 * - S3 Storage Lens groups
 *
 * - S3 Access Grants instances, registered locations, and grants.
 *
 * ### Permissions
 *
 * For general purpose buckets, access points for general purpose buckets, Storage Lens groups, and S3 Access Grants, you must have the `s3:UntagResource` permission to use this operation.
 *
 * ### Directory bucket permissions
 *
 * For directory buckets, you must have the `s3express:UntagResource` permission to use this operation. For more information about directory buckets policies and permissions, see Identity and Access Management (IAM) for S3 Express One Zone in the *Amazon S3 User Guide*.
 *
 * ### HTTP Host header syntax
 *
 * **Directory buckets ** - The HTTP Host header syntax is `s3express-control.*region*.amazonaws.com`.
 *
 * For information about S3 Tagging errors, see List of Amazon S3
 * Tagging error codes.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResult,
  UntagResourceError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResult,
  errors: [NoSuchAccessPoint],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
  endpointHostPrefix: "{AccountId}.",
}));

export type UpdateAccessGrantsLocationError = CommonErrors;
/**
 * Updates the IAM role of a registered location in your S3 Access Grants instance.
 *
 * ### Permissions
 *
 * You must have the `s3:UpdateAccessGrantsLocation` permission to use this operation.
 *
 * ### Additional Permissions
 *
 * You must also have the following permission: `iam:PassRole`
 */
export const updateAccessGrantsLocation: API.OperationMethod<
  UpdateAccessGrantsLocationRequest,
  UpdateAccessGrantsLocationResult,
  UpdateAccessGrantsLocationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateAccessGrantsLocationRequest,
  output: UpdateAccessGrantsLocationResult,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAccessGrantsLocation",
  endpointHostPrefix: "{AccountId}.",
}));

export type UpdateJobPriorityError =
  | BadRequestException
  | InternalServiceException
  | NotFoundException
  | TooManyRequestsException
  | InvalidRequest
  | JobStatusTransitionForbidden
  | CommonErrors;
/**
 * Updates an existing S3 Batch Operations job's priority. For more information, see S3 Batch Operations in the *Amazon S3 User Guide*.
 *
 * ### Permissions
 *
 * To use the
 * `UpdateJobPriority` operation, you must have permission to
 * perform the `s3:UpdateJobPriority` action.
 *
 * Related actions include:
 *
 * - CreateJob
 *
 * - ListJobs
 *
 * - DescribeJob
 *
 * - UpdateJobStatus
 */
export const updateJobPriority: API.OperationMethod<
  UpdateJobPriorityRequest,
  UpdateJobPriorityResult,
  UpdateJobPriorityError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateJobPriorityRequest,
  output: UpdateJobPriorityResult,
  errors: [
    BadRequestException,
    InternalServiceException,
    NotFoundException,
    TooManyRequestsException,
    InvalidRequest,
    JobStatusTransitionForbidden,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateJobPriority",
  endpointHostPrefix: "{AccountId}.",
}));

export type UpdateJobStatusError =
  | BadRequestException
  | InternalServiceException
  | JobStatusException
  | NotFoundException
  | TooManyRequestsException
  | InvalidRequest
  | JobStatusTransitionForbidden
  | CommonErrors;
/**
 * Updates the status for the specified job. Use this operation to confirm that you want to
 * run a job or to cancel an existing job. For more information, see S3 Batch Operations in the *Amazon S3 User Guide*.
 *
 * ### Permissions
 *
 * To use the
 * `UpdateJobStatus` operation, you must have permission to
 * perform the `s3:UpdateJobStatus` action.
 *
 * Related actions include:
 *
 * - CreateJob
 *
 * - ListJobs
 *
 * - DescribeJob
 *
 * - UpdateJobStatus
 */
export const updateJobStatus: API.OperationMethod<
  UpdateJobStatusRequest,
  UpdateJobStatusResult,
  UpdateJobStatusError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateJobStatusRequest,
  output: UpdateJobStatusResult,
  errors: [
    BadRequestException,
    InternalServiceException,
    JobStatusException,
    NotFoundException,
    TooManyRequestsException,
    InvalidRequest,
    JobStatusTransitionForbidden,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateJobStatus",
  endpointHostPrefix: "{AccountId}.",
}));

export type UpdateStorageLensGroupError = CommonErrors;
/**
 * Updates the existing Storage Lens group.
 *
 * To use this operation, you must have the permission to perform the
 * `s3:UpdateStorageLensGroup` action. For more information about the required Storage Lens
 * Groups permissions, see Setting account permissions to use S3 Storage Lens groups.
 *
 * For information about Storage Lens groups errors, see List of Amazon S3 Storage
 * Lens error codes.
 */
export const updateStorageLensGroup: API.OperationMethod<
  UpdateStorageLensGroupRequest,
  UpdateStorageLensGroupResponse,
  UpdateStorageLensGroupError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateStorageLensGroupRequest,
  output: UpdateStorageLensGroupResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateStorageLensGroup",
  endpointHostPrefix: "{AccountId}.",
}));

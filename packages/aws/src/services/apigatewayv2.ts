import * as HttpClient from "effect/unstable/http/HttpClient";
import * as S from "@distilled.cloud/core/schema";
import * as API from "@distilled.cloud/core/api";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc = T.AwsApiService({
  sdkId: "ApiGatewayV2",
  serviceShapeName: "ApiGatewayV2",
});
const auth = T.AwsAuthSigv4({ name: "apigateway" });
const ver = T.ServiceVersion("2018-11-29");
const proto = T.AwsProtocolsRestJson1();
const rules = T.EndpointResolver((p, _) => {
  const { Region, UseDualStack = false, UseFIPS = false, Endpoint } = p;
  const e = (u: unknown, p = {}, h = {}): T.EndpointResolverResult => ({
    type: "endpoint" as const,
    endpoint: { url: u as string, properties: p, headers: h },
  });
  const err = (m: unknown): T.EndpointResolverResult => ({
    type: "error" as const,
    message: m as string,
  });
  if (Endpoint != null) {
    if (UseFIPS === true) {
      return err(
        "Invalid Configuration: FIPS and custom endpoint are not supported",
      );
    }
    if (UseDualStack === true) {
      return err(
        "Invalid Configuration: Dualstack and custom endpoint are not supported",
      );
    }
    return e(Endpoint);
  }
  if (Region != null) {
    {
      const PartitionResult = _.partition(Region);
      if (PartitionResult != null && PartitionResult !== false) {
        if (UseFIPS === true && UseDualStack === true) {
          if (
            true === _.getAttr(PartitionResult, "supportsFIPS") &&
            true === _.getAttr(PartitionResult, "supportsDualStack")
          ) {
            return e(
              `https://apigateway-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://apigateway-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://apigateway.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://apigateway.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class BadRequestException
  extends /*@__PURE__*/ S.TaggedError<BadRequestException>()(
    "BadRequestException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class NotFoundException
  extends /*@__PURE__*/ S.TaggedError<NotFoundException>()(
    "NotFoundException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      ResourceType: S.optional(S.String),
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class TooManyRequestsException
  extends /*@__PURE__*/ S.TaggedError<TooManyRequestsException>()(
    "TooManyRequestsException",
    {
      LimitType: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export type SelectionExpression = string;
export type CorsHeaderList = string[];
export const CorsHeaderList = /*@__PURE__*/ S.Array(S.String);
export type StringWithLengthBetween1And64 = string;
export type CorsMethodList = string[];
export const CorsMethodList = /*@__PURE__*/ S.Array(S.String);
export type CorsOriginList = string[];
export const CorsOriginList = /*@__PURE__*/ S.Array(S.String);
export type IntegerWithLengthBetweenMinus1And86400 = number;
export interface Cors {
  AllowCredentials?: boolean;
  AllowHeaders?: string[];
  AllowMethods?: string[];
  AllowOrigins?: string[];
  ExposeHeaders?: string[];
  MaxAge?: number;
}
export const Cors = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AllowCredentials: S.optional(S.Boolean),
    AllowHeaders: S.optional(CorsHeaderList),
    AllowMethods: S.optional(CorsMethodList),
    AllowOrigins: S.optional(CorsOriginList),
    ExposeHeaders: S.optional(CorsHeaderList),
    MaxAge: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      AllowCredentials: "allowCredentials",
      AllowHeaders: "allowHeaders",
      AllowMethods: "allowMethods",
      AllowOrigins: "allowOrigins",
      ExposeHeaders: "exposeHeaders",
      MaxAge: "maxAge",
    }),
  ),
).annotate({ identifier: "Cors" }) as any as S.Schema<Cors>;
export type Arn = string;
export type StringWithLengthBetween0And1024 = string;
export type IpAddressType = "ipv4" | "dualstack" | (string & {});
export const IpAddressType = /*@__PURE__*/ S.String;

export type StringWithLengthBetween1And128 = string;
export type ProtocolType = "WEBSOCKET" | "HTTP" | (string & {});
export const ProtocolType = /*@__PURE__*/ S.String;

export type SelectionKey = string;
export type StringWithLengthBetween1And1600 = string;
export type Tags = { [key: string]: string | undefined };
export const Tags = /*@__PURE__*/ S.Record(S.String, S.String.pipe(S.optional));
export type UriWithLengthBetween1And2048 = string;
export interface CreateApiRequest {
  ApiKeySelectionExpression?: string;
  CorsConfiguration?: Cors;
  CredentialsArn?: string;
  Description?: string;
  DisableSchemaValidation?: boolean;
  DisableExecuteApiEndpoint?: boolean;
  IpAddressType?: IpAddressType;
  Name?: string;
  ProtocolType?: ProtocolType;
  RouteKey?: string;
  RouteSelectionExpression?: string;
  Tags?: { [key: string]: string | undefined };
  Target?: string;
  Version?: string;
}
export const CreateApiRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiKeySelectionExpression: S.optional(S.String),
    CorsConfiguration: S.optional(Cors),
    CredentialsArn: S.optional(S.String),
    Description: S.optional(S.String),
    DisableSchemaValidation: S.optional(S.Boolean),
    DisableExecuteApiEndpoint: S.optional(S.Boolean),
    IpAddressType: S.optional(IpAddressType),
    Name: S.optional(S.String),
    ProtocolType: S.optional(ProtocolType),
    RouteKey: S.optional(S.String),
    RouteSelectionExpression: S.optional(S.String),
    Tags: S.optional(Tags),
    Target: S.optional(S.String),
    Version: S.optional(S.String),
  })
    .pipe(
      S.encodeKeys({
        ApiKeySelectionExpression: "apiKeySelectionExpression",
        CorsConfiguration: "corsConfiguration",
        CredentialsArn: "credentialsArn",
        Description: "description",
        DisableSchemaValidation: "disableSchemaValidation",
        DisableExecuteApiEndpoint: "disableExecuteApiEndpoint",
        IpAddressType: "ipAddressType",
        Name: "name",
        ProtocolType: "protocolType",
        RouteKey: "routeKey",
        RouteSelectionExpression: "routeSelectionExpression",
        Tags: "tags",
        Target: "target",
        Version: "version",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/v2/apis" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateApiRequest",
}) as any as S.Schema<CreateApiRequest>;
export type Id = string;
export type __timestampIso8601 = Date;
export type __listOf__string = string[];
export const __listOf__string = /*@__PURE__*/ S.Array(S.String);
export interface CreateApiResponse {
  ApiEndpoint?: string;
  ApiGatewayManaged?: boolean;
  ApiId?: string;
  ApiKeySelectionExpression?: string;
  CorsConfiguration?: Cors;
  CreatedDate?: Date;
  Description?: string;
  DisableSchemaValidation?: boolean;
  DisableExecuteApiEndpoint?: boolean;
  ImportInfo?: string[];
  IpAddressType?: IpAddressType;
  Name?: string;
  ProtocolType?: ProtocolType;
  RouteSelectionExpression?: string;
  Tags?: { [key: string]: string | undefined };
  Version?: string;
  Warnings?: string[];
}
export const CreateApiResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiEndpoint: S.optional(S.String),
    ApiGatewayManaged: S.optional(S.Boolean),
    ApiId: S.optional(S.String),
    ApiKeySelectionExpression: S.optional(S.String),
    CorsConfiguration: S.optional(Cors),
    CreatedDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Description: S.optional(S.String),
    DisableSchemaValidation: S.optional(S.Boolean),
    DisableExecuteApiEndpoint: S.optional(S.Boolean),
    ImportInfo: S.optional(__listOf__string),
    IpAddressType: S.optional(IpAddressType),
    Name: S.optional(S.String),
    ProtocolType: S.optional(ProtocolType),
    RouteSelectionExpression: S.optional(S.String),
    Tags: S.optional(Tags),
    Version: S.optional(S.String),
    Warnings: S.optional(__listOf__string),
  }).pipe(
    S.encodeKeys({
      ApiEndpoint: "apiEndpoint",
      ApiGatewayManaged: "apiGatewayManaged",
      ApiId: "apiId",
      ApiKeySelectionExpression: "apiKeySelectionExpression",
      CorsConfiguration: "corsConfiguration",
      CreatedDate: "createdDate",
      Description: "description",
      DisableSchemaValidation: "disableSchemaValidation",
      DisableExecuteApiEndpoint: "disableExecuteApiEndpoint",
      ImportInfo: "importInfo",
      IpAddressType: "ipAddressType",
      Name: "name",
      ProtocolType: "protocolType",
      RouteSelectionExpression: "routeSelectionExpression",
      Tags: "tags",
      Version: "version",
      Warnings: "warnings",
    }),
  ),
).annotate({
  identifier: "CreateApiResponse",
}) as any as S.Schema<CreateApiResponse>;
export interface CreateApiMappingRequest {
  ApiId?: string;
  ApiMappingKey?: string;
  DomainName: string;
  Stage?: string;
}
export const CreateApiMappingRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiId: S.optional(S.String),
    ApiMappingKey: S.optional(S.String),
    DomainName: S.String.pipe(T.HttpLabel("DomainName")),
    Stage: S.optional(S.String),
  })
    .pipe(
      S.encodeKeys({
        ApiId: "apiId",
        ApiMappingKey: "apiMappingKey",
        Stage: "stage",
      }),
    )
    .pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/v2/domainnames/{DomainName}/apimappings",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateApiMappingRequest",
}) as any as S.Schema<CreateApiMappingRequest>;
export interface CreateApiMappingResponse {
  ApiId?: string;
  ApiMappingId?: string;
  ApiMappingKey?: string;
  Stage?: string;
}
export const CreateApiMappingResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiId: S.optional(S.String),
    ApiMappingId: S.optional(S.String),
    ApiMappingKey: S.optional(S.String),
    Stage: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      ApiId: "apiId",
      ApiMappingId: "apiMappingId",
      ApiMappingKey: "apiMappingKey",
      Stage: "stage",
    }),
  ),
).annotate({
  identifier: "CreateApiMappingResponse",
}) as any as S.Schema<CreateApiMappingResponse>;
export type IntegerWithLengthBetween0And3600 = number;
export type AuthorizerType = "REQUEST" | "JWT" | (string & {});
export const AuthorizerType = /*@__PURE__*/ S.String;

export type IdentitySourceList = string[];
export const IdentitySourceList = /*@__PURE__*/ S.Array(S.String);
export interface JWTConfiguration {
  Audience?: string[];
  Issuer?: string;
}
export const JWTConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Audience: S.optional(__listOf__string),
    Issuer: S.optional(S.String),
  }).pipe(S.encodeKeys({ Audience: "audience", Issuer: "issuer" })),
).annotate({
  identifier: "JWTConfiguration",
}) as any as S.Schema<JWTConfiguration>;
export interface CreateAuthorizerRequest {
  ApiId: string;
  AuthorizerCredentialsArn?: string;
  AuthorizerPayloadFormatVersion?: string;
  AuthorizerResultTtlInSeconds?: number;
  AuthorizerType?: AuthorizerType;
  AuthorizerUri?: string;
  EnableSimpleResponses?: boolean;
  IdentitySource?: string[];
  IdentityValidationExpression?: string;
  JwtConfiguration?: JWTConfiguration;
  Name?: string;
}
export const CreateAuthorizerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiId: S.String.pipe(T.HttpLabel("ApiId")),
    AuthorizerCredentialsArn: S.optional(S.String),
    AuthorizerPayloadFormatVersion: S.optional(S.String),
    AuthorizerResultTtlInSeconds: S.optional(S.Number),
    AuthorizerType: S.optional(AuthorizerType),
    AuthorizerUri: S.optional(S.String),
    EnableSimpleResponses: S.optional(S.Boolean),
    IdentitySource: S.optional(IdentitySourceList),
    IdentityValidationExpression: S.optional(S.String),
    JwtConfiguration: S.optional(JWTConfiguration),
    Name: S.optional(S.String),
  })
    .pipe(
      S.encodeKeys({
        AuthorizerCredentialsArn: "authorizerCredentialsArn",
        AuthorizerPayloadFormatVersion: "authorizerPayloadFormatVersion",
        AuthorizerResultTtlInSeconds: "authorizerResultTtlInSeconds",
        AuthorizerType: "authorizerType",
        AuthorizerUri: "authorizerUri",
        EnableSimpleResponses: "enableSimpleResponses",
        IdentitySource: "identitySource",
        IdentityValidationExpression: "identityValidationExpression",
        JwtConfiguration: "jwtConfiguration",
        Name: "name",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/v2/apis/{ApiId}/authorizers" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateAuthorizerRequest",
}) as any as S.Schema<CreateAuthorizerRequest>;
export interface CreateAuthorizerResponse {
  AuthorizerCredentialsArn?: string;
  AuthorizerId?: string;
  AuthorizerPayloadFormatVersion?: string;
  AuthorizerResultTtlInSeconds?: number;
  AuthorizerType?: AuthorizerType;
  AuthorizerUri?: string;
  EnableSimpleResponses?: boolean;
  IdentitySource?: string[];
  IdentityValidationExpression?: string;
  JwtConfiguration?: JWTConfiguration;
  Name?: string;
}
export const CreateAuthorizerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AuthorizerCredentialsArn: S.optional(S.String),
    AuthorizerId: S.optional(S.String),
    AuthorizerPayloadFormatVersion: S.optional(S.String),
    AuthorizerResultTtlInSeconds: S.optional(S.Number),
    AuthorizerType: S.optional(AuthorizerType),
    AuthorizerUri: S.optional(S.String),
    EnableSimpleResponses: S.optional(S.Boolean),
    IdentitySource: S.optional(IdentitySourceList),
    IdentityValidationExpression: S.optional(S.String),
    JwtConfiguration: S.optional(JWTConfiguration),
    Name: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      AuthorizerCredentialsArn: "authorizerCredentialsArn",
      AuthorizerId: "authorizerId",
      AuthorizerPayloadFormatVersion: "authorizerPayloadFormatVersion",
      AuthorizerResultTtlInSeconds: "authorizerResultTtlInSeconds",
      AuthorizerType: "authorizerType",
      AuthorizerUri: "authorizerUri",
      EnableSimpleResponses: "enableSimpleResponses",
      IdentitySource: "identitySource",
      IdentityValidationExpression: "identityValidationExpression",
      JwtConfiguration: "jwtConfiguration",
      Name: "name",
    }),
  ),
).annotate({
  identifier: "CreateAuthorizerResponse",
}) as any as S.Schema<CreateAuthorizerResponse>;
export interface CreateDeploymentRequest {
  ApiId: string;
  Description?: string;
  StageName?: string;
}
export const CreateDeploymentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiId: S.String.pipe(T.HttpLabel("ApiId")),
    Description: S.optional(S.String),
    StageName: S.optional(S.String),
  })
    .pipe(S.encodeKeys({ Description: "description", StageName: "stageName" }))
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/v2/apis/{ApiId}/deployments" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateDeploymentRequest",
}) as any as S.Schema<CreateDeploymentRequest>;
export type DeploymentStatus =
  | "PENDING"
  | "FAILED"
  | "DEPLOYED"
  | (string & {});
export const DeploymentStatus = /*@__PURE__*/ S.String;

export interface CreateDeploymentResponse {
  AutoDeployed?: boolean;
  CreatedDate?: Date;
  DeploymentId?: string;
  DeploymentStatus?: DeploymentStatus;
  DeploymentStatusMessage?: string;
  Description?: string;
}
export const CreateDeploymentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AutoDeployed: S.optional(S.Boolean),
    CreatedDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    DeploymentId: S.optional(S.String),
    DeploymentStatus: S.optional(DeploymentStatus),
    DeploymentStatusMessage: S.optional(S.String),
    Description: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      AutoDeployed: "autoDeployed",
      CreatedDate: "createdDate",
      DeploymentId: "deploymentId",
      DeploymentStatus: "deploymentStatus",
      DeploymentStatusMessage: "deploymentStatusMessage",
      Description: "description",
    }),
  ),
).annotate({
  identifier: "CreateDeploymentResponse",
}) as any as S.Schema<CreateDeploymentResponse>;
export type StringWithLengthBetween1And512 = string;
export type DomainNameStatus =
  | "AVAILABLE"
  | "UPDATING"
  | "PENDING_CERTIFICATE_REIMPORT"
  | "PENDING_OWNERSHIP_VERIFICATION"
  | (string & {});
export const DomainNameStatus = /*@__PURE__*/ S.String;

export type EndpointType = "REGIONAL" | "EDGE" | (string & {});
export const EndpointType = /*@__PURE__*/ S.String;

export type SecurityPolicy = "TLS_1_0" | "TLS_1_2" | (string & {});
export const SecurityPolicy = /*@__PURE__*/ S.String;

export interface DomainNameConfiguration {
  ApiGatewayDomainName?: string;
  CertificateArn?: string;
  CertificateName?: string;
  CertificateUploadDate?: Date;
  DomainNameStatus?: DomainNameStatus;
  DomainNameStatusMessage?: string;
  EndpointType?: EndpointType;
  HostedZoneId?: string;
  IpAddressType?: IpAddressType;
  SecurityPolicy?: SecurityPolicy;
  OwnershipVerificationCertificateArn?: string;
}
export const DomainNameConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiGatewayDomainName: S.optional(S.String),
    CertificateArn: S.optional(S.String),
    CertificateName: S.optional(S.String),
    CertificateUploadDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    DomainNameStatus: S.optional(DomainNameStatus),
    DomainNameStatusMessage: S.optional(S.String),
    EndpointType: S.optional(EndpointType),
    HostedZoneId: S.optional(S.String),
    IpAddressType: S.optional(IpAddressType),
    SecurityPolicy: S.optional(SecurityPolicy),
    OwnershipVerificationCertificateArn: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      ApiGatewayDomainName: "apiGatewayDomainName",
      CertificateArn: "certificateArn",
      CertificateName: "certificateName",
      CertificateUploadDate: "certificateUploadDate",
      DomainNameStatus: "domainNameStatus",
      DomainNameStatusMessage: "domainNameStatusMessage",
      EndpointType: "endpointType",
      HostedZoneId: "hostedZoneId",
      IpAddressType: "ipAddressType",
      SecurityPolicy: "securityPolicy",
      OwnershipVerificationCertificateArn:
        "ownershipVerificationCertificateArn",
    }),
  ),
).annotate({
  identifier: "DomainNameConfiguration",
}) as any as S.Schema<DomainNameConfiguration>;
export type DomainNameConfigurations = DomainNameConfiguration[];
export const DomainNameConfigurations = /*@__PURE__*/ S.Array(
  DomainNameConfiguration,
);
export interface MutualTlsAuthenticationInput {
  TruststoreUri?: string;
  TruststoreVersion?: string;
}
export const MutualTlsAuthenticationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TruststoreUri: S.optional(S.String),
    TruststoreVersion: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      TruststoreUri: "truststoreUri",
      TruststoreVersion: "truststoreVersion",
    }),
  ),
).annotate({
  identifier: "MutualTlsAuthenticationInput",
}) as any as S.Schema<MutualTlsAuthenticationInput>;
export type RoutingMode =
  | "API_MAPPING_ONLY"
  | "ROUTING_RULE_ONLY"
  | "ROUTING_RULE_THEN_API_MAPPING"
  | (string & {});
export const RoutingMode = /*@__PURE__*/ S.String;

export interface CreateDomainNameRequest {
  DomainName?: string;
  DomainNameConfigurations?: DomainNameConfiguration[];
  MutualTlsAuthentication?: MutualTlsAuthenticationInput;
  RoutingMode?: RoutingMode;
  Tags?: { [key: string]: string | undefined };
}
export const CreateDomainNameRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainName: S.optional(S.String),
    DomainNameConfigurations: S.optional(DomainNameConfigurations),
    MutualTlsAuthentication: S.optional(MutualTlsAuthenticationInput),
    RoutingMode: S.optional(RoutingMode),
    Tags: S.optional(Tags),
  })
    .pipe(
      S.encodeKeys({
        DomainName: "domainName",
        DomainNameConfigurations: "domainNameConfigurations",
        MutualTlsAuthentication: "mutualTlsAuthentication",
        RoutingMode: "routingMode",
        Tags: "tags",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/v2/domainnames" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateDomainNameRequest",
}) as any as S.Schema<CreateDomainNameRequest>;
export interface MutualTlsAuthentication {
  TruststoreUri?: string;
  TruststoreVersion?: string;
  TruststoreWarnings?: string[];
}
export const MutualTlsAuthentication = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TruststoreUri: S.optional(S.String),
    TruststoreVersion: S.optional(S.String),
    TruststoreWarnings: S.optional(__listOf__string),
  }).pipe(
    S.encodeKeys({
      TruststoreUri: "truststoreUri",
      TruststoreVersion: "truststoreVersion",
      TruststoreWarnings: "truststoreWarnings",
    }),
  ),
).annotate({
  identifier: "MutualTlsAuthentication",
}) as any as S.Schema<MutualTlsAuthentication>;
export interface CreateDomainNameResponse {
  ApiMappingSelectionExpression?: string;
  DomainName?: string;
  DomainNameArn?: string;
  DomainNameConfigurations?: DomainNameConfiguration[];
  MutualTlsAuthentication?: MutualTlsAuthentication;
  RoutingMode?: RoutingMode;
  Tags?: { [key: string]: string | undefined };
}
export const CreateDomainNameResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiMappingSelectionExpression: S.optional(S.String),
    DomainName: S.optional(S.String),
    DomainNameArn: S.optional(S.String),
    DomainNameConfigurations: S.optional(DomainNameConfigurations),
    MutualTlsAuthentication: S.optional(MutualTlsAuthentication),
    RoutingMode: S.optional(RoutingMode),
    Tags: S.optional(Tags),
  }).pipe(
    S.encodeKeys({
      ApiMappingSelectionExpression: "apiMappingSelectionExpression",
      DomainName: "domainName",
      DomainNameArn: "domainNameArn",
      DomainNameConfigurations: "domainNameConfigurations",
      MutualTlsAuthentication: "mutualTlsAuthentication",
      RoutingMode: "routingMode",
      Tags: "tags",
    }),
  ),
).annotate({
  identifier: "CreateDomainNameResponse",
}) as any as S.Schema<CreateDomainNameResponse>;
export type StringWithLengthBetween1And1024 = string;
export type ConnectionType = "INTERNET" | "VPC_LINK" | (string & {});
export const ConnectionType = /*@__PURE__*/ S.String;

export type ContentHandlingStrategy =
  | "CONVERT_TO_BINARY"
  | "CONVERT_TO_TEXT"
  | (string & {});
export const ContentHandlingStrategy = /*@__PURE__*/ S.String;

export type IntegrationType =
  | "AWS"
  | "HTTP"
  | "MOCK"
  | "HTTP_PROXY"
  | "AWS_PROXY"
  | (string & {});
export const IntegrationType = /*@__PURE__*/ S.String;

export type PassthroughBehavior =
  | "WHEN_NO_MATCH"
  | "NEVER"
  | "WHEN_NO_TEMPLATES"
  | (string & {});
export const PassthroughBehavior = /*@__PURE__*/ S.String;

export type IntegrationParameters = { [key: string]: string | undefined };
export const IntegrationParameters = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type StringWithLengthBetween0And32K = string;
export type TemplateMap = { [key: string]: string | undefined };
export const TemplateMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type ResponseParameters = {
  [key: string]: { [key: string]: string | undefined } | undefined;
};
export const ResponseParameters = /*@__PURE__*/ S.Record(
  S.String,
  IntegrationParameters.pipe(S.optional),
);
export type IntegerWithLengthBetween50And30000 = number;
export interface TlsConfigInput {
  ServerNameToVerify?: string;
}
export const TlsConfigInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ServerNameToVerify: S.optional(S.String) }).pipe(
    S.encodeKeys({ ServerNameToVerify: "serverNameToVerify" }),
  ),
).annotate({ identifier: "TlsConfigInput" }) as any as S.Schema<TlsConfigInput>;
export interface CreateIntegrationRequest {
  ApiId: string;
  ConnectionId?: string;
  ConnectionType?: ConnectionType;
  ContentHandlingStrategy?: ContentHandlingStrategy;
  CredentialsArn?: string;
  Description?: string;
  IntegrationMethod?: string;
  IntegrationSubtype?: string;
  IntegrationType?: IntegrationType;
  IntegrationUri?: string;
  PassthroughBehavior?: PassthroughBehavior;
  PayloadFormatVersion?: string;
  RequestParameters?: { [key: string]: string | undefined };
  RequestTemplates?: { [key: string]: string | undefined };
  ResponseParameters?: {
    [key: string]: { [key: string]: string | undefined } | undefined;
  };
  TemplateSelectionExpression?: string;
  TimeoutInMillis?: number;
  TlsConfig?: TlsConfigInput;
}
export const CreateIntegrationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiId: S.String.pipe(T.HttpLabel("ApiId")),
    ConnectionId: S.optional(S.String),
    ConnectionType: S.optional(ConnectionType),
    ContentHandlingStrategy: S.optional(ContentHandlingStrategy),
    CredentialsArn: S.optional(S.String),
    Description: S.optional(S.String),
    IntegrationMethod: S.optional(S.String),
    IntegrationSubtype: S.optional(S.String),
    IntegrationType: S.optional(IntegrationType),
    IntegrationUri: S.optional(S.String),
    PassthroughBehavior: S.optional(PassthroughBehavior),
    PayloadFormatVersion: S.optional(S.String),
    RequestParameters: S.optional(IntegrationParameters),
    RequestTemplates: S.optional(TemplateMap),
    ResponseParameters: S.optional(ResponseParameters),
    TemplateSelectionExpression: S.optional(S.String),
    TimeoutInMillis: S.optional(S.Number),
    TlsConfig: S.optional(TlsConfigInput),
  })
    .pipe(
      S.encodeKeys({
        ConnectionId: "connectionId",
        ConnectionType: "connectionType",
        ContentHandlingStrategy: "contentHandlingStrategy",
        CredentialsArn: "credentialsArn",
        Description: "description",
        IntegrationMethod: "integrationMethod",
        IntegrationSubtype: "integrationSubtype",
        IntegrationType: "integrationType",
        IntegrationUri: "integrationUri",
        PassthroughBehavior: "passthroughBehavior",
        PayloadFormatVersion: "payloadFormatVersion",
        RequestParameters: "requestParameters",
        RequestTemplates: "requestTemplates",
        ResponseParameters: "responseParameters",
        TemplateSelectionExpression: "templateSelectionExpression",
        TimeoutInMillis: "timeoutInMillis",
        TlsConfig: "tlsConfig",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/v2/apis/{ApiId}/integrations" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateIntegrationRequest",
}) as any as S.Schema<CreateIntegrationRequest>;
export interface TlsConfig {
  ServerNameToVerify?: string;
}
export const TlsConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ServerNameToVerify: S.optional(S.String) }).pipe(
    S.encodeKeys({ ServerNameToVerify: "serverNameToVerify" }),
  ),
).annotate({ identifier: "TlsConfig" }) as any as S.Schema<TlsConfig>;
export interface CreateIntegrationResult {
  ApiGatewayManaged?: boolean;
  ConnectionId?: string;
  ConnectionType?: ConnectionType;
  ContentHandlingStrategy?: ContentHandlingStrategy;
  CredentialsArn?: string;
  Description?: string;
  IntegrationId?: string;
  IntegrationMethod?: string;
  IntegrationResponseSelectionExpression?: string;
  IntegrationSubtype?: string;
  IntegrationType?: IntegrationType;
  IntegrationUri?: string;
  PassthroughBehavior?: PassthroughBehavior;
  PayloadFormatVersion?: string;
  RequestParameters?: { [key: string]: string | undefined };
  RequestTemplates?: { [key: string]: string | undefined };
  ResponseParameters?: {
    [key: string]: { [key: string]: string | undefined } | undefined;
  };
  TemplateSelectionExpression?: string;
  TimeoutInMillis?: number;
  TlsConfig?: TlsConfig;
}
export const CreateIntegrationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiGatewayManaged: S.optional(S.Boolean),
    ConnectionId: S.optional(S.String),
    ConnectionType: S.optional(ConnectionType),
    ContentHandlingStrategy: S.optional(ContentHandlingStrategy),
    CredentialsArn: S.optional(S.String),
    Description: S.optional(S.String),
    IntegrationId: S.optional(S.String),
    IntegrationMethod: S.optional(S.String),
    IntegrationResponseSelectionExpression: S.optional(S.String),
    IntegrationSubtype: S.optional(S.String),
    IntegrationType: S.optional(IntegrationType),
    IntegrationUri: S.optional(S.String),
    PassthroughBehavior: S.optional(PassthroughBehavior),
    PayloadFormatVersion: S.optional(S.String),
    RequestParameters: S.optional(IntegrationParameters),
    RequestTemplates: S.optional(TemplateMap),
    ResponseParameters: S.optional(ResponseParameters),
    TemplateSelectionExpression: S.optional(S.String),
    TimeoutInMillis: S.optional(S.Number),
    TlsConfig: S.optional(TlsConfig),
  }).pipe(
    S.encodeKeys({
      ApiGatewayManaged: "apiGatewayManaged",
      ConnectionId: "connectionId",
      ConnectionType: "connectionType",
      ContentHandlingStrategy: "contentHandlingStrategy",
      CredentialsArn: "credentialsArn",
      Description: "description",
      IntegrationId: "integrationId",
      IntegrationMethod: "integrationMethod",
      IntegrationResponseSelectionExpression:
        "integrationResponseSelectionExpression",
      IntegrationSubtype: "integrationSubtype",
      IntegrationType: "integrationType",
      IntegrationUri: "integrationUri",
      PassthroughBehavior: "passthroughBehavior",
      PayloadFormatVersion: "payloadFormatVersion",
      RequestParameters: "requestParameters",
      RequestTemplates: "requestTemplates",
      ResponseParameters: "responseParameters",
      TemplateSelectionExpression: "templateSelectionExpression",
      TimeoutInMillis: "timeoutInMillis",
      TlsConfig: "tlsConfig",
    }),
  ),
).annotate({
  identifier: "CreateIntegrationResult",
}) as any as S.Schema<CreateIntegrationResult>;
export interface CreateIntegrationResponseRequest {
  ApiId: string;
  ContentHandlingStrategy?: ContentHandlingStrategy;
  IntegrationId: string;
  IntegrationResponseKey?: string;
  ResponseParameters?: { [key: string]: string | undefined };
  ResponseTemplates?: { [key: string]: string | undefined };
  TemplateSelectionExpression?: string;
}
export const CreateIntegrationResponseRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiId: S.String.pipe(T.HttpLabel("ApiId")),
    ContentHandlingStrategy: S.optional(ContentHandlingStrategy),
    IntegrationId: S.String.pipe(T.HttpLabel("IntegrationId")),
    IntegrationResponseKey: S.optional(S.String),
    ResponseParameters: S.optional(IntegrationParameters),
    ResponseTemplates: S.optional(TemplateMap),
    TemplateSelectionExpression: S.optional(S.String),
  })
    .pipe(
      S.encodeKeys({
        ContentHandlingStrategy: "contentHandlingStrategy",
        IntegrationResponseKey: "integrationResponseKey",
        ResponseParameters: "responseParameters",
        ResponseTemplates: "responseTemplates",
        TemplateSelectionExpression: "templateSelectionExpression",
      }),
    )
    .pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/v2/apis/{ApiId}/integrations/{IntegrationId}/integrationresponses",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateIntegrationResponseRequest",
}) as any as S.Schema<CreateIntegrationResponseRequest>;
export interface CreateIntegrationResponseResponse {
  ContentHandlingStrategy?: ContentHandlingStrategy;
  IntegrationResponseId?: string;
  IntegrationResponseKey?: string;
  ResponseParameters?: { [key: string]: string | undefined };
  ResponseTemplates?: { [key: string]: string | undefined };
  TemplateSelectionExpression?: string;
}
export const CreateIntegrationResponseResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContentHandlingStrategy: S.optional(ContentHandlingStrategy),
    IntegrationResponseId: S.optional(S.String),
    IntegrationResponseKey: S.optional(S.String),
    ResponseParameters: S.optional(IntegrationParameters),
    ResponseTemplates: S.optional(TemplateMap),
    TemplateSelectionExpression: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      ContentHandlingStrategy: "contentHandlingStrategy",
      IntegrationResponseId: "integrationResponseId",
      IntegrationResponseKey: "integrationResponseKey",
      ResponseParameters: "responseParameters",
      ResponseTemplates: "responseTemplates",
      TemplateSelectionExpression: "templateSelectionExpression",
    }),
  ),
).annotate({
  identifier: "CreateIntegrationResponseResponse",
}) as any as S.Schema<CreateIntegrationResponseResponse>;
export type StringWithLengthBetween1And256 = string;
export interface CreateModelRequest {
  ApiId: string;
  ContentType?: string;
  Description?: string;
  Name?: string;
  Schema?: string;
}
export const CreateModelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiId: S.String.pipe(T.HttpLabel("ApiId")),
    ContentType: S.optional(S.String),
    Description: S.optional(S.String),
    Name: S.optional(S.String),
    Schema: S.optional(S.String),
  })
    .pipe(
      S.encodeKeys({
        ContentType: "contentType",
        Description: "description",
        Name: "name",
        Schema: "schema",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/v2/apis/{ApiId}/models" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateModelRequest",
}) as any as S.Schema<CreateModelRequest>;
export interface CreateModelResponse {
  ContentType?: string;
  Description?: string;
  ModelId?: string;
  Name?: string;
  Schema?: string;
}
export const CreateModelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContentType: S.optional(S.String),
    Description: S.optional(S.String),
    ModelId: S.optional(S.String),
    Name: S.optional(S.String),
    Schema: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      ContentType: "contentType",
      Description: "description",
      ModelId: "modelId",
      Name: "name",
      Schema: "schema",
    }),
  ),
).annotate({
  identifier: "CreateModelResponse",
}) as any as S.Schema<CreateModelResponse>;
export type __stringMin1Max256 = string;
export type __stringMin20Max2048 = string;
export interface CognitoConfig {
  AppClientId?: string;
  UserPoolArn?: string;
  UserPoolDomain?: string;
}
export const CognitoConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AppClientId: S.optional(S.String),
    UserPoolArn: S.optional(S.String),
    UserPoolDomain: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      AppClientId: "appClientId",
      UserPoolArn: "userPoolArn",
      UserPoolDomain: "userPoolDomain",
    }),
  ),
).annotate({ identifier: "CognitoConfig" }) as any as S.Schema<CognitoConfig>;
export interface None {}
export const None = /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
  identifier: "None",
}) as any as S.Schema<None>;
export interface Authorization {
  CognitoConfig?: CognitoConfig;
  None?: None;
}
export const Authorization = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CognitoConfig: S.optional(CognitoConfig),
    None: S.optional(None),
  }).pipe(S.encodeKeys({ CognitoConfig: "cognitoConfig", None: "none" })),
).annotate({ identifier: "Authorization" }) as any as S.Schema<Authorization>;
export type __stringMin10Max2048 = string;
export type __stringMin3Max256 = string;
export interface ACMManaged {
  CertificateArn?: string;
  DomainName?: string;
}
export const ACMManaged = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CertificateArn: S.optional(S.String),
    DomainName: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      CertificateArn: "certificateArn",
      DomainName: "domainName",
    }),
  ),
).annotate({ identifier: "ACMManaged" }) as any as S.Schema<ACMManaged>;
export interface EndpointConfigurationRequest {
  AcmManaged?: ACMManaged;
  None?: None;
}
export const EndpointConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AcmManaged: S.optional(ACMManaged), None: S.optional(None) }).pipe(
    S.encodeKeys({ AcmManaged: "acmManaged", None: "none" }),
  ),
).annotate({
  identifier: "EndpointConfigurationRequest",
}) as any as S.Schema<EndpointConfigurationRequest>;
export type __listOf__stringMin20Max2048 = string[];
export const __listOf__stringMin20Max2048 = /*@__PURE__*/ S.Array(S.String);
export type __stringMin0Max1092 = string;
export type __stringMin0Max1024 = string;
export type __stringMin3Max255 = string;
export type __stringMin1Max16 = string;
export interface CustomColors {
  AccentColor?: string;
  BackgroundColor?: string;
  ErrorValidationColor?: string;
  HeaderColor?: string;
  NavigationColor?: string;
  TextColor?: string;
}
export const CustomColors = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccentColor: S.optional(S.String),
    BackgroundColor: S.optional(S.String),
    ErrorValidationColor: S.optional(S.String),
    HeaderColor: S.optional(S.String),
    NavigationColor: S.optional(S.String),
    TextColor: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      AccentColor: "accentColor",
      BackgroundColor: "backgroundColor",
      ErrorValidationColor: "errorValidationColor",
      HeaderColor: "headerColor",
      NavigationColor: "navigationColor",
      TextColor: "textColor",
    }),
  ),
).annotate({ identifier: "CustomColors" }) as any as S.Schema<CustomColors>;
export interface PortalTheme {
  CustomColors?: CustomColors;
  LogoLastUploaded?: Date;
}
export const PortalTheme = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CustomColors: S.optional(CustomColors),
    LogoLastUploaded: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }).pipe(
    S.encodeKeys({
      CustomColors: "customColors",
      LogoLastUploaded: "logoLastUploaded",
    }),
  ),
).annotate({ identifier: "PortalTheme" }) as any as S.Schema<PortalTheme>;
export interface PortalContent {
  Description?: string;
  DisplayName?: string;
  Theme?: PortalTheme;
}
export const PortalContent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Description: S.optional(S.String),
    DisplayName: S.optional(S.String),
    Theme: S.optional(PortalTheme),
  }).pipe(
    S.encodeKeys({
      Description: "description",
      DisplayName: "displayName",
      Theme: "theme",
    }),
  ),
).annotate({ identifier: "PortalContent" }) as any as S.Schema<PortalContent>;
export type __stringMin0Max255 = string;
export interface CreatePortalRequest {
  Authorization?: Authorization;
  EndpointConfiguration?: EndpointConfigurationRequest;
  IncludedPortalProductArns?: string[];
  LogoUri?: string;
  PortalContent?: PortalContent;
  RumAppMonitorName?: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreatePortalRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Authorization: S.optional(Authorization),
    EndpointConfiguration: S.optional(EndpointConfigurationRequest),
    IncludedPortalProductArns: S.optional(__listOf__stringMin20Max2048),
    LogoUri: S.optional(S.String),
    PortalContent: S.optional(PortalContent),
    RumAppMonitorName: S.optional(S.String),
    Tags: S.optional(Tags),
  })
    .pipe(
      S.encodeKeys({
        Authorization: "authorization",
        EndpointConfiguration: "endpointConfiguration",
        IncludedPortalProductArns: "includedPortalProductArns",
        LogoUri: "logoUri",
        PortalContent: "portalContent",
        RumAppMonitorName: "rumAppMonitorName",
        Tags: "tags",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/v2/portals" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreatePortalRequest",
}) as any as S.Schema<CreatePortalRequest>;
export type __stringMin1Max64 = string;
export interface EndpointConfigurationResponse {
  CertificateArn?: string;
  DomainName?: string;
  PortalDefaultDomainName?: string;
  PortalDomainHostedZoneId?: string;
}
export const EndpointConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CertificateArn: S.optional(S.String),
    DomainName: S.optional(S.String),
    PortalDefaultDomainName: S.optional(S.String),
    PortalDomainHostedZoneId: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      CertificateArn: "certificateArn",
      DomainName: "domainName",
      PortalDefaultDomainName: "portalDefaultDomainName",
      PortalDomainHostedZoneId: "portalDomainHostedZoneId",
    }),
  ),
).annotate({
  identifier: "EndpointConfigurationResponse",
}) as any as S.Schema<EndpointConfigurationResponse>;
export type __stringMin10Max30PatternAZ09 = string;
export type PublishStatus =
  | "PUBLISHED"
  | "PUBLISH_IN_PROGRESS"
  | "PUBLISH_FAILED"
  | "DISABLE_IN_PROGRESS"
  | "DISABLE_FAILED"
  | "DISABLED"
  | (string & {});
export const PublishStatus = /*@__PURE__*/ S.String;

export type __stringMin1Max2048 = string;
export interface StatusException {
  Exception?: string;
  Message?: string;
}
export const StatusException = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Exception: S.optional(S.String),
    Message: S.optional(S.String),
  }).pipe(S.encodeKeys({ Exception: "exception", Message: "message" })),
).annotate({
  identifier: "StatusException",
}) as any as S.Schema<StatusException>;
export interface CreatePortalResponse {
  Authorization?: Authorization & {
    CognitoConfig: CognitoConfig & {
      AppClientId: __stringMin1Max256;
      UserPoolArn: __stringMin20Max2048;
      UserPoolDomain: __stringMin20Max2048;
    };
  };
  EndpointConfiguration?: EndpointConfigurationResponse & {
    PortalDefaultDomainName: __stringMin3Max256;
    PortalDomainHostedZoneId: __stringMin1Max64;
  };
  IncludedPortalProductArns?: string[];
  LastModified?: Date;
  LastPublished?: Date;
  LastPublishedDescription?: string;
  PortalArn?: string;
  PortalContent?: PortalContent & {
    DisplayName: __stringMin3Max255;
    Theme: PortalTheme & {
      CustomColors: CustomColors & {
        AccentColor: __stringMin1Max16;
        BackgroundColor: __stringMin1Max16;
        ErrorValidationColor: __stringMin1Max16;
        HeaderColor: __stringMin1Max16;
        NavigationColor: __stringMin1Max16;
        TextColor: __stringMin1Max16;
      };
    };
  };
  PortalId?: string;
  PublishStatus?: PublishStatus;
  RumAppMonitorName?: string;
  StatusException?: StatusException;
  Tags?: { [key: string]: string | undefined };
}
export const CreatePortalResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Authorization: S.optional(Authorization),
    EndpointConfiguration: S.optional(EndpointConfigurationResponse),
    IncludedPortalProductArns: S.optional(__listOf__stringMin20Max2048),
    LastModified: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    LastPublished: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    LastPublishedDescription: S.optional(S.String),
    PortalArn: S.optional(S.String),
    PortalContent: S.optional(PortalContent),
    PortalId: S.optional(S.String),
    PublishStatus: S.optional(PublishStatus),
    RumAppMonitorName: S.optional(S.String),
    StatusException: S.optional(StatusException),
    Tags: S.optional(Tags),
  }).pipe(
    S.encodeKeys({
      Authorization: "authorization",
      EndpointConfiguration: "endpointConfiguration",
      IncludedPortalProductArns: "includedPortalProductArns",
      LastModified: "lastModified",
      LastPublished: "lastPublished",
      LastPublishedDescription: "lastPublishedDescription",
      PortalArn: "portalArn",
      PortalContent: "portalContent",
      PortalId: "portalId",
      PublishStatus: "publishStatus",
      RumAppMonitorName: "rumAppMonitorName",
      StatusException: "statusException",
      Tags: "tags",
    }),
  ),
).annotate({
  identifier: "CreatePortalResponse",
}) as any as S.Schema<CreatePortalResponse>;
export type __stringMin1Max255 = string;
export interface CreatePortalProductRequest {
  Description?: string;
  DisplayName?: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreatePortalProductRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Description: S.optional(S.String),
    DisplayName: S.optional(S.String),
    Tags: S.optional(Tags),
  })
    .pipe(
      S.encodeKeys({
        Description: "description",
        DisplayName: "displayName",
        Tags: "tags",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/v2/portalproducts" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreatePortalProductRequest",
}) as any as S.Schema<CreatePortalProductRequest>;
export interface Section {
  ProductRestEndpointPageArns?: string[];
  SectionName?: string;
}
export const Section = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProductRestEndpointPageArns: S.optional(__listOf__stringMin20Max2048),
    SectionName: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      ProductRestEndpointPageArns: "productRestEndpointPageArns",
      SectionName: "sectionName",
    }),
  ),
).annotate({ identifier: "Section" }) as any as S.Schema<Section>;
export type __listOfSection = Section[];
export const __listOfSection = /*@__PURE__*/ S.Array(Section);
export interface DisplayOrder {
  Contents?: Section[];
  OverviewPageArn?: string;
  ProductPageArns?: string[];
}
export const DisplayOrder = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Contents: S.optional(__listOfSection),
    OverviewPageArn: S.optional(S.String),
    ProductPageArns: S.optional(__listOf__stringMin20Max2048),
  }).pipe(
    S.encodeKeys({
      Contents: "contents",
      OverviewPageArn: "overviewPageArn",
      ProductPageArns: "productPageArns",
    }),
  ),
).annotate({ identifier: "DisplayOrder" }) as any as S.Schema<DisplayOrder>;
export interface CreatePortalProductResponse {
  Description?: string;
  DisplayName?: string;
  DisplayOrder?: DisplayOrder & {
    Contents: (Section & {
      ProductRestEndpointPageArns: __listOf__stringMin20Max2048;
      SectionName: string;
    })[];
  };
  LastModified?: Date;
  PortalProductArn?: string;
  PortalProductId?: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreatePortalProductResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Description: S.optional(S.String),
    DisplayName: S.optional(S.String),
    DisplayOrder: S.optional(DisplayOrder),
    LastModified: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    PortalProductArn: S.optional(S.String),
    PortalProductId: S.optional(S.String),
    Tags: S.optional(Tags),
  }).pipe(
    S.encodeKeys({
      Description: "description",
      DisplayName: "displayName",
      DisplayOrder: "displayOrder",
      LastModified: "lastModified",
      PortalProductArn: "portalProductArn",
      PortalProductId: "portalProductId",
      Tags: "tags",
    }),
  ),
).annotate({
  identifier: "CreatePortalProductResponse",
}) as any as S.Schema<CreatePortalProductResponse>;
export type __stringMin1Max32768 = string;
export interface DisplayContent {
  Body?: string;
  Title?: string;
}
export const DisplayContent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Body: S.optional(S.String), Title: S.optional(S.String) }).pipe(
    S.encodeKeys({ Body: "body", Title: "title" }),
  ),
).annotate({ identifier: "DisplayContent" }) as any as S.Schema<DisplayContent>;
export interface CreateProductPageRequest {
  DisplayContent?: DisplayContent;
  PortalProductId: string;
}
export const CreateProductPageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DisplayContent: S.optional(DisplayContent),
    PortalProductId: S.String.pipe(T.HttpLabel("PortalProductId")),
  })
    .pipe(S.encodeKeys({ DisplayContent: "displayContent" }))
    .pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/v2/portalproducts/{PortalProductId}/productpages",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateProductPageRequest",
}) as any as S.Schema<CreateProductPageRequest>;
export interface CreateProductPageResponse {
  DisplayContent?: DisplayContent & {
    Body: __stringMin1Max32768;
    Title: __stringMin1Max255;
  };
  LastModified?: Date;
  ProductPageArn?: string;
  ProductPageId?: string;
}
export const CreateProductPageResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DisplayContent: S.optional(DisplayContent),
    LastModified: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    ProductPageArn: S.optional(S.String),
    ProductPageId: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      DisplayContent: "displayContent",
      LastModified: "lastModified",
      ProductPageArn: "productPageArn",
      ProductPageId: "productPageId",
    }),
  ),
).annotate({
  identifier: "CreateProductPageResponse",
}) as any as S.Schema<CreateProductPageResponse>;
export type __stringMin1Max1024 = string;
export interface DisplayContentOverrides {
  Body?: string;
  Endpoint?: string;
  OperationName?: string;
}
export const DisplayContentOverrides = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Body: S.optional(S.String),
    Endpoint: S.optional(S.String),
    OperationName: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      Body: "body",
      Endpoint: "endpoint",
      OperationName: "operationName",
    }),
  ),
).annotate({
  identifier: "DisplayContentOverrides",
}) as any as S.Schema<DisplayContentOverrides>;
export interface EndpointDisplayContent {
  None?: None;
  Overrides?: DisplayContentOverrides;
}
export const EndpointDisplayContent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    None: S.optional(None),
    Overrides: S.optional(DisplayContentOverrides),
  }).pipe(S.encodeKeys({ None: "none", Overrides: "overrides" })),
).annotate({
  identifier: "EndpointDisplayContent",
}) as any as S.Schema<EndpointDisplayContent>;
export type __stringMin1Max20 = string;
export type __stringMin1Max4096 = string;
export type __stringMin1Max50 = string;
export type __stringMin1Max128 = string;
export interface IdentifierParts {
  Method?: string;
  Path?: string;
  RestApiId?: string;
  Stage?: string;
}
export const IdentifierParts = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Method: S.optional(S.String),
    Path: S.optional(S.String),
    RestApiId: S.optional(S.String),
    Stage: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      Method: "method",
      Path: "path",
      RestApiId: "restApiId",
      Stage: "stage",
    }),
  ),
).annotate({
  identifier: "IdentifierParts",
}) as any as S.Schema<IdentifierParts>;
export interface RestEndpointIdentifier {
  IdentifierParts?: IdentifierParts;
}
export const RestEndpointIdentifier = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ IdentifierParts: S.optional(IdentifierParts) }).pipe(
    S.encodeKeys({ IdentifierParts: "identifierParts" }),
  ),
).annotate({
  identifier: "RestEndpointIdentifier",
}) as any as S.Schema<RestEndpointIdentifier>;
export type TryItState = "ENABLED" | "DISABLED" | (string & {});
export const TryItState = /*@__PURE__*/ S.String;

export interface CreateProductRestEndpointPageRequest {
  DisplayContent?: EndpointDisplayContent;
  PortalProductId: string;
  RestEndpointIdentifier?: RestEndpointIdentifier;
  TryItState?: TryItState;
}
export const CreateProductRestEndpointPageRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      DisplayContent: S.optional(EndpointDisplayContent),
      PortalProductId: S.String.pipe(T.HttpLabel("PortalProductId")),
      RestEndpointIdentifier: S.optional(RestEndpointIdentifier),
      TryItState: S.optional(TryItState),
    })
      .pipe(
        S.encodeKeys({
          DisplayContent: "displayContent",
          RestEndpointIdentifier: "restEndpointIdentifier",
          TryItState: "tryItState",
        }),
      )
      .pipe(
        T.all(
          T.Http({
            method: "POST",
            uri: "/v2/portalproducts/{PortalProductId}/productrestendpointpages",
          }),
          svc,
          auth,
          proto,
          ver,
          rules,
        ),
      ),
).annotate({
  identifier: "CreateProductRestEndpointPageRequest",
}) as any as S.Schema<CreateProductRestEndpointPageRequest>;
export interface EndpointDisplayContentResponse {
  Body?: string;
  Endpoint?: string;
  OperationName?: string;
}
export const EndpointDisplayContentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Body: S.optional(S.String),
    Endpoint: S.optional(S.String),
    OperationName: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      Body: "body",
      Endpoint: "endpoint",
      OperationName: "operationName",
    }),
  ),
).annotate({
  identifier: "EndpointDisplayContentResponse",
}) as any as S.Schema<EndpointDisplayContentResponse>;
export type Status = "AVAILABLE" | "IN_PROGRESS" | "FAILED" | (string & {});
export const Status = /*@__PURE__*/ S.String;

export interface CreateProductRestEndpointPageResponse {
  DisplayContent?: EndpointDisplayContentResponse & {
    Endpoint: __stringMin1Max1024;
  };
  LastModified?: Date;
  ProductRestEndpointPageArn?: string;
  ProductRestEndpointPageId?: string;
  RestEndpointIdentifier?: RestEndpointIdentifier & {
    IdentifierParts: IdentifierParts & {
      Method: __stringMin1Max20;
      Path: __stringMin1Max4096;
      RestApiId: __stringMin1Max50;
      Stage: __stringMin1Max128;
    };
  };
  Status?: Status;
  StatusException?: StatusException;
  TryItState?: TryItState;
}
export const CreateProductRestEndpointPageResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      DisplayContent: S.optional(EndpointDisplayContentResponse),
      LastModified: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
      ProductRestEndpointPageArn: S.optional(S.String),
      ProductRestEndpointPageId: S.optional(S.String),
      RestEndpointIdentifier: S.optional(RestEndpointIdentifier),
      Status: S.optional(Status),
      StatusException: S.optional(StatusException),
      TryItState: S.optional(TryItState),
    }).pipe(
      S.encodeKeys({
        DisplayContent: "displayContent",
        LastModified: "lastModified",
        ProductRestEndpointPageArn: "productRestEndpointPageArn",
        ProductRestEndpointPageId: "productRestEndpointPageId",
        RestEndpointIdentifier: "restEndpointIdentifier",
        Status: "status",
        StatusException: "statusException",
        TryItState: "tryItState",
      }),
    ),
).annotate({
  identifier: "CreateProductRestEndpointPageResponse",
}) as any as S.Schema<CreateProductRestEndpointPageResponse>;
export type AuthorizationScopes = string[];
export const AuthorizationScopes = /*@__PURE__*/ S.Array(S.String);
export type AuthorizationType =
  | "NONE"
  | "AWS_IAM"
  | "CUSTOM"
  | "JWT"
  | (string & {});
export const AuthorizationType = /*@__PURE__*/ S.String;

export type RouteModels = { [key: string]: string | undefined };
export const RouteModels = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface ParameterConstraints {
  Required?: boolean;
}
export const ParameterConstraints = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Required: S.optional(S.Boolean) }).pipe(
    S.encodeKeys({ Required: "required" }),
  ),
).annotate({
  identifier: "ParameterConstraints",
}) as any as S.Schema<ParameterConstraints>;
export type RouteParameters = {
  [key: string]: ParameterConstraints | undefined;
};
export const RouteParameters = /*@__PURE__*/ S.Record(
  S.String,
  ParameterConstraints.pipe(S.optional),
);
export interface CreateRouteRequest {
  ApiId: string;
  ApiKeyRequired?: boolean;
  AuthorizationScopes?: string[];
  AuthorizationType?: AuthorizationType;
  AuthorizerId?: string;
  ModelSelectionExpression?: string;
  OperationName?: string;
  RequestModels?: { [key: string]: string | undefined };
  RequestParameters?: { [key: string]: ParameterConstraints | undefined };
  RouteKey?: string;
  RouteResponseSelectionExpression?: string;
  Target?: string;
}
export const CreateRouteRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiId: S.String.pipe(T.HttpLabel("ApiId")),
    ApiKeyRequired: S.optional(S.Boolean),
    AuthorizationScopes: S.optional(AuthorizationScopes),
    AuthorizationType: S.optional(AuthorizationType),
    AuthorizerId: S.optional(S.String),
    ModelSelectionExpression: S.optional(S.String),
    OperationName: S.optional(S.String),
    RequestModels: S.optional(RouteModels),
    RequestParameters: S.optional(RouteParameters),
    RouteKey: S.optional(S.String),
    RouteResponseSelectionExpression: S.optional(S.String),
    Target: S.optional(S.String),
  })
    .pipe(
      S.encodeKeys({
        ApiKeyRequired: "apiKeyRequired",
        AuthorizationScopes: "authorizationScopes",
        AuthorizationType: "authorizationType",
        AuthorizerId: "authorizerId",
        ModelSelectionExpression: "modelSelectionExpression",
        OperationName: "operationName",
        RequestModels: "requestModels",
        RequestParameters: "requestParameters",
        RouteKey: "routeKey",
        RouteResponseSelectionExpression: "routeResponseSelectionExpression",
        Target: "target",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/v2/apis/{ApiId}/routes" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateRouteRequest",
}) as any as S.Schema<CreateRouteRequest>;
export interface CreateRouteResult {
  ApiGatewayManaged?: boolean;
  ApiKeyRequired?: boolean;
  AuthorizationScopes?: string[];
  AuthorizationType?: AuthorizationType;
  AuthorizerId?: string;
  ModelSelectionExpression?: string;
  OperationName?: string;
  RequestModels?: { [key: string]: string | undefined };
  RequestParameters?: { [key: string]: ParameterConstraints | undefined };
  RouteId?: string;
  RouteKey?: string;
  RouteResponseSelectionExpression?: string;
  Target?: string;
}
export const CreateRouteResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiGatewayManaged: S.optional(S.Boolean),
    ApiKeyRequired: S.optional(S.Boolean),
    AuthorizationScopes: S.optional(AuthorizationScopes),
    AuthorizationType: S.optional(AuthorizationType),
    AuthorizerId: S.optional(S.String),
    ModelSelectionExpression: S.optional(S.String),
    OperationName: S.optional(S.String),
    RequestModels: S.optional(RouteModels),
    RequestParameters: S.optional(RouteParameters),
    RouteId: S.optional(S.String),
    RouteKey: S.optional(S.String),
    RouteResponseSelectionExpression: S.optional(S.String),
    Target: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      ApiGatewayManaged: "apiGatewayManaged",
      ApiKeyRequired: "apiKeyRequired",
      AuthorizationScopes: "authorizationScopes",
      AuthorizationType: "authorizationType",
      AuthorizerId: "authorizerId",
      ModelSelectionExpression: "modelSelectionExpression",
      OperationName: "operationName",
      RequestModels: "requestModels",
      RequestParameters: "requestParameters",
      RouteId: "routeId",
      RouteKey: "routeKey",
      RouteResponseSelectionExpression: "routeResponseSelectionExpression",
      Target: "target",
    }),
  ),
).annotate({
  identifier: "CreateRouteResult",
}) as any as S.Schema<CreateRouteResult>;
export interface CreateRouteResponseRequest {
  ApiId: string;
  ModelSelectionExpression?: string;
  ResponseModels?: { [key: string]: string | undefined };
  ResponseParameters?: { [key: string]: ParameterConstraints | undefined };
  RouteId: string;
  RouteResponseKey?: string;
}
export const CreateRouteResponseRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiId: S.String.pipe(T.HttpLabel("ApiId")),
    ModelSelectionExpression: S.optional(S.String),
    ResponseModels: S.optional(RouteModels),
    ResponseParameters: S.optional(RouteParameters),
    RouteId: S.String.pipe(T.HttpLabel("RouteId")),
    RouteResponseKey: S.optional(S.String),
  })
    .pipe(
      S.encodeKeys({
        ModelSelectionExpression: "modelSelectionExpression",
        ResponseModels: "responseModels",
        ResponseParameters: "responseParameters",
        RouteResponseKey: "routeResponseKey",
      }),
    )
    .pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/v2/apis/{ApiId}/routes/{RouteId}/routeresponses",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateRouteResponseRequest",
}) as any as S.Schema<CreateRouteResponseRequest>;
export interface CreateRouteResponseResponse {
  ModelSelectionExpression?: string;
  ResponseModels?: { [key: string]: string | undefined };
  ResponseParameters?: { [key: string]: ParameterConstraints | undefined };
  RouteResponseId?: string;
  RouteResponseKey?: string;
}
export const CreateRouteResponseResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ModelSelectionExpression: S.optional(S.String),
    ResponseModels: S.optional(RouteModels),
    ResponseParameters: S.optional(RouteParameters),
    RouteResponseId: S.optional(S.String),
    RouteResponseKey: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      ModelSelectionExpression: "modelSelectionExpression",
      ResponseModels: "responseModels",
      ResponseParameters: "responseParameters",
      RouteResponseId: "routeResponseId",
      RouteResponseKey: "routeResponseKey",
    }),
  ),
).annotate({
  identifier: "CreateRouteResponseResponse",
}) as any as S.Schema<CreateRouteResponseResponse>;
export interface RoutingRuleActionInvokeApi {
  ApiId?: string;
  Stage?: string;
  StripBasePath?: boolean;
}
export const RoutingRuleActionInvokeApi = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiId: S.optional(S.String),
    Stage: S.optional(S.String),
    StripBasePath: S.optional(S.Boolean),
  }).pipe(
    S.encodeKeys({
      ApiId: "apiId",
      Stage: "stage",
      StripBasePath: "stripBasePath",
    }),
  ),
).annotate({
  identifier: "RoutingRuleActionInvokeApi",
}) as any as S.Schema<RoutingRuleActionInvokeApi>;
export interface RoutingRuleAction {
  InvokeApi?: RoutingRuleActionInvokeApi;
}
export const RoutingRuleAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ InvokeApi: S.optional(RoutingRuleActionInvokeApi) }).pipe(
    S.encodeKeys({ InvokeApi: "invokeApi" }),
  ),
).annotate({
  identifier: "RoutingRuleAction",
}) as any as S.Schema<RoutingRuleAction>;
export type __listOfRoutingRuleAction = RoutingRuleAction[];
export const __listOfRoutingRuleAction =
  /*@__PURE__*/ S.Array(RoutingRuleAction);
export type __listOfSelectionKey = string[];
export const __listOfSelectionKey = /*@__PURE__*/ S.Array(S.String);
export interface RoutingRuleMatchBasePaths {
  AnyOf?: string[];
}
export const RoutingRuleMatchBasePaths = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AnyOf: S.optional(__listOfSelectionKey) }).pipe(
    S.encodeKeys({ AnyOf: "anyOf" }),
  ),
).annotate({
  identifier: "RoutingRuleMatchBasePaths",
}) as any as S.Schema<RoutingRuleMatchBasePaths>;
export interface RoutingRuleMatchHeaderValue {
  Header?: string;
  ValueGlob?: string;
}
export const RoutingRuleMatchHeaderValue = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Header: S.optional(S.String),
    ValueGlob: S.optional(S.String),
  }).pipe(S.encodeKeys({ Header: "header", ValueGlob: "valueGlob" })),
).annotate({
  identifier: "RoutingRuleMatchHeaderValue",
}) as any as S.Schema<RoutingRuleMatchHeaderValue>;
export type __listOfRoutingRuleMatchHeaderValue = RoutingRuleMatchHeaderValue[];
export const __listOfRoutingRuleMatchHeaderValue = /*@__PURE__*/ S.Array(
  RoutingRuleMatchHeaderValue,
);
export interface RoutingRuleMatchHeaders {
  AnyOf?: RoutingRuleMatchHeaderValue[];
}
export const RoutingRuleMatchHeaders = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AnyOf: S.optional(__listOfRoutingRuleMatchHeaderValue) }).pipe(
    S.encodeKeys({ AnyOf: "anyOf" }),
  ),
).annotate({
  identifier: "RoutingRuleMatchHeaders",
}) as any as S.Schema<RoutingRuleMatchHeaders>;
export interface RoutingRuleCondition {
  MatchBasePaths?: RoutingRuleMatchBasePaths;
  MatchHeaders?: RoutingRuleMatchHeaders;
}
export const RoutingRuleCondition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MatchBasePaths: S.optional(RoutingRuleMatchBasePaths),
    MatchHeaders: S.optional(RoutingRuleMatchHeaders),
  }).pipe(
    S.encodeKeys({
      MatchBasePaths: "matchBasePaths",
      MatchHeaders: "matchHeaders",
    }),
  ),
).annotate({
  identifier: "RoutingRuleCondition",
}) as any as S.Schema<RoutingRuleCondition>;
export type __listOfRoutingRuleCondition = RoutingRuleCondition[];
export const __listOfRoutingRuleCondition =
  /*@__PURE__*/ S.Array(RoutingRuleCondition);
export type RoutingRulePriority = number;
export interface CreateRoutingRuleRequest {
  Actions?: RoutingRuleAction[];
  Conditions?: RoutingRuleCondition[];
  DomainName: string;
  DomainNameId?: string;
  Priority?: number;
}
export const CreateRoutingRuleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Actions: S.optional(__listOfRoutingRuleAction),
    Conditions: S.optional(__listOfRoutingRuleCondition),
    DomainName: S.String.pipe(T.HttpLabel("DomainName")),
    DomainNameId: S.optional(S.String).pipe(T.HttpQuery("domainNameId")),
    Priority: S.optional(S.Number),
  })
    .pipe(
      S.encodeKeys({
        Actions: "actions",
        Conditions: "conditions",
        Priority: "priority",
      }),
    )
    .pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/v2/domainnames/{DomainName}/routingrules",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateRoutingRuleRequest",
}) as any as S.Schema<CreateRoutingRuleRequest>;
export interface CreateRoutingRuleResponse {
  Actions?: (RoutingRuleAction & {
    InvokeApi: RoutingRuleActionInvokeApi & {
      ApiId: Id;
      Stage: StringWithLengthBetween1And128;
    };
  })[];
  Conditions?: (RoutingRuleCondition & {
    MatchBasePaths: RoutingRuleMatchBasePaths & { AnyOf: __listOfSelectionKey };
    MatchHeaders: RoutingRuleMatchHeaders & {
      AnyOf: (RoutingRuleMatchHeaderValue & {
        Header: SelectionKey;
        ValueGlob: SelectionExpression;
      })[];
    };
  })[];
  Priority?: number;
  RoutingRuleArn?: string;
  RoutingRuleId?: string;
}
export const CreateRoutingRuleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Actions: S.optional(__listOfRoutingRuleAction),
    Conditions: S.optional(__listOfRoutingRuleCondition),
    Priority: S.optional(S.Number),
    RoutingRuleArn: S.optional(S.String),
    RoutingRuleId: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      Actions: "actions",
      Conditions: "conditions",
      Priority: "priority",
      RoutingRuleArn: "routingRuleArn",
      RoutingRuleId: "routingRuleId",
    }),
  ),
).annotate({
  identifier: "CreateRoutingRuleResponse",
}) as any as S.Schema<CreateRoutingRuleResponse>;
export interface AccessLogSettings {
  DestinationArn?: string;
  Format?: string;
}
export const AccessLogSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DestinationArn: S.optional(S.String),
    Format: S.optional(S.String),
  }).pipe(S.encodeKeys({ DestinationArn: "destinationArn", Format: "format" })),
).annotate({
  identifier: "AccessLogSettings",
}) as any as S.Schema<AccessLogSettings>;
export type LoggingLevel = "ERROR" | "INFO" | "OFF" | (string & {});
export const LoggingLevel = /*@__PURE__*/ S.String;

export interface RouteSettings {
  DataTraceEnabled?: boolean;
  DetailedMetricsEnabled?: boolean;
  LoggingLevel?: LoggingLevel;
  ThrottlingBurstLimit?: number;
  ThrottlingRateLimit?: number;
}
export const RouteSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DataTraceEnabled: S.optional(S.Boolean),
    DetailedMetricsEnabled: S.optional(S.Boolean),
    LoggingLevel: S.optional(LoggingLevel),
    ThrottlingBurstLimit: S.optional(S.Number),
    ThrottlingRateLimit: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      DataTraceEnabled: "dataTraceEnabled",
      DetailedMetricsEnabled: "detailedMetricsEnabled",
      LoggingLevel: "loggingLevel",
      ThrottlingBurstLimit: "throttlingBurstLimit",
      ThrottlingRateLimit: "throttlingRateLimit",
    }),
  ),
).annotate({ identifier: "RouteSettings" }) as any as S.Schema<RouteSettings>;
export type RouteSettingsMap = { [key: string]: RouteSettings | undefined };
export const RouteSettingsMap = /*@__PURE__*/ S.Record(
  S.String,
  RouteSettings.pipe(S.optional),
);
export type StringWithLengthBetween0And2048 = string;
export type StageVariablesMap = { [key: string]: string | undefined };
export const StageVariablesMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface CreateStageRequest {
  AccessLogSettings?: AccessLogSettings;
  ApiId: string;
  AutoDeploy?: boolean;
  ClientCertificateId?: string;
  DefaultRouteSettings?: RouteSettings;
  DeploymentId?: string;
  Description?: string;
  RouteSettings?: { [key: string]: RouteSettings | undefined };
  StageName?: string;
  StageVariables?: { [key: string]: string | undefined };
  Tags?: { [key: string]: string | undefined };
}
export const CreateStageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccessLogSettings: S.optional(AccessLogSettings),
    ApiId: S.String.pipe(T.HttpLabel("ApiId")),
    AutoDeploy: S.optional(S.Boolean),
    ClientCertificateId: S.optional(S.String),
    DefaultRouteSettings: S.optional(RouteSettings),
    DeploymentId: S.optional(S.String),
    Description: S.optional(S.String),
    RouteSettings: S.optional(RouteSettingsMap),
    StageName: S.optional(S.String),
    StageVariables: S.optional(StageVariablesMap),
    Tags: S.optional(Tags),
  })
    .pipe(
      S.encodeKeys({
        AccessLogSettings: "accessLogSettings",
        AutoDeploy: "autoDeploy",
        ClientCertificateId: "clientCertificateId",
        DefaultRouteSettings: "defaultRouteSettings",
        DeploymentId: "deploymentId",
        Description: "description",
        RouteSettings: "routeSettings",
        StageName: "stageName",
        StageVariables: "stageVariables",
        Tags: "tags",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/v2/apis/{ApiId}/stages" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateStageRequest",
}) as any as S.Schema<CreateStageRequest>;
export interface CreateStageResponse {
  AccessLogSettings?: AccessLogSettings;
  ApiGatewayManaged?: boolean;
  AutoDeploy?: boolean;
  ClientCertificateId?: string;
  CreatedDate?: Date;
  DefaultRouteSettings?: RouteSettings;
  DeploymentId?: string;
  Description?: string;
  LastDeploymentStatusMessage?: string;
  LastUpdatedDate?: Date;
  RouteSettings?: { [key: string]: RouteSettings | undefined };
  StageName?: string;
  StageVariables?: { [key: string]: string | undefined };
  Tags?: { [key: string]: string | undefined };
}
export const CreateStageResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccessLogSettings: S.optional(AccessLogSettings),
    ApiGatewayManaged: S.optional(S.Boolean),
    AutoDeploy: S.optional(S.Boolean),
    ClientCertificateId: S.optional(S.String),
    CreatedDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    DefaultRouteSettings: S.optional(RouteSettings),
    DeploymentId: S.optional(S.String),
    Description: S.optional(S.String),
    LastDeploymentStatusMessage: S.optional(S.String),
    LastUpdatedDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    RouteSettings: S.optional(RouteSettingsMap),
    StageName: S.optional(S.String),
    StageVariables: S.optional(StageVariablesMap),
    Tags: S.optional(Tags),
  }).pipe(
    S.encodeKeys({
      AccessLogSettings: "accessLogSettings",
      ApiGatewayManaged: "apiGatewayManaged",
      AutoDeploy: "autoDeploy",
      ClientCertificateId: "clientCertificateId",
      CreatedDate: "createdDate",
      DefaultRouteSettings: "defaultRouteSettings",
      DeploymentId: "deploymentId",
      Description: "description",
      LastDeploymentStatusMessage: "lastDeploymentStatusMessage",
      LastUpdatedDate: "lastUpdatedDate",
      RouteSettings: "routeSettings",
      StageName: "stageName",
      StageVariables: "stageVariables",
      Tags: "tags",
    }),
  ),
).annotate({
  identifier: "CreateStageResponse",
}) as any as S.Schema<CreateStageResponse>;
export type SecurityGroupIdList = string[];
export const SecurityGroupIdList = /*@__PURE__*/ S.Array(S.String);
export type SubnetIdList = string[];
export const SubnetIdList = /*@__PURE__*/ S.Array(S.String);
export interface CreateVpcLinkRequest {
  Name?: string;
  SecurityGroupIds?: string[];
  SubnetIds?: string[];
  Tags?: { [key: string]: string | undefined };
}
export const CreateVpcLinkRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    SecurityGroupIds: S.optional(SecurityGroupIdList),
    SubnetIds: S.optional(SubnetIdList),
    Tags: S.optional(Tags),
  })
    .pipe(
      S.encodeKeys({
        Name: "name",
        SecurityGroupIds: "securityGroupIds",
        SubnetIds: "subnetIds",
        Tags: "tags",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/v2/vpclinks" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateVpcLinkRequest",
}) as any as S.Schema<CreateVpcLinkRequest>;
export type VpcLinkStatus =
  | "PENDING"
  | "AVAILABLE"
  | "DELETING"
  | "FAILED"
  | "INACTIVE"
  | (string & {});
export const VpcLinkStatus = /*@__PURE__*/ S.String;

export type VpcLinkVersion = "V2" | (string & {});
export const VpcLinkVersion = /*@__PURE__*/ S.String;

export interface CreateVpcLinkResponse {
  CreatedDate?: Date;
  Name?: string;
  SecurityGroupIds?: string[];
  SubnetIds?: string[];
  Tags?: { [key: string]: string | undefined };
  VpcLinkId?: string;
  VpcLinkStatus?: VpcLinkStatus;
  VpcLinkStatusMessage?: string;
  VpcLinkVersion?: VpcLinkVersion;
}
export const CreateVpcLinkResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CreatedDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Name: S.optional(S.String),
    SecurityGroupIds: S.optional(SecurityGroupIdList),
    SubnetIds: S.optional(SubnetIdList),
    Tags: S.optional(Tags),
    VpcLinkId: S.optional(S.String),
    VpcLinkStatus: S.optional(VpcLinkStatus),
    VpcLinkStatusMessage: S.optional(S.String),
    VpcLinkVersion: S.optional(VpcLinkVersion),
  }).pipe(
    S.encodeKeys({
      CreatedDate: "createdDate",
      Name: "name",
      SecurityGroupIds: "securityGroupIds",
      SubnetIds: "subnetIds",
      Tags: "tags",
      VpcLinkId: "vpcLinkId",
      VpcLinkStatus: "vpcLinkStatus",
      VpcLinkStatusMessage: "vpcLinkStatusMessage",
      VpcLinkVersion: "vpcLinkVersion",
    }),
  ),
).annotate({
  identifier: "CreateVpcLinkResponse",
}) as any as S.Schema<CreateVpcLinkResponse>;
export interface DeleteAccessLogSettingsRequest {
  ApiId: string;
  StageName: string;
}
export const DeleteAccessLogSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiId: S.String.pipe(T.HttpLabel("ApiId")),
    StageName: S.String.pipe(T.HttpLabel("StageName")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v2/apis/{ApiId}/stages/{StageName}/accesslogsettings",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteAccessLogSettingsRequest",
}) as any as S.Schema<DeleteAccessLogSettingsRequest>;
export interface DeleteAccessLogSettingsResponse {}
export const DeleteAccessLogSettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteAccessLogSettingsResponse",
}) as any as S.Schema<DeleteAccessLogSettingsResponse>;
export interface DeleteApiRequest {
  ApiId: string;
}
export const DeleteApiRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ApiId: S.String.pipe(T.HttpLabel("ApiId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/v2/apis/{ApiId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteApiRequest",
}) as any as S.Schema<DeleteApiRequest>;
export interface DeleteApiResponse {}
export const DeleteApiResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteApiResponse",
}) as any as S.Schema<DeleteApiResponse>;
export interface DeleteApiMappingRequest {
  ApiMappingId: string;
  DomainName: string;
}
export const DeleteApiMappingRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiMappingId: S.String.pipe(T.HttpLabel("ApiMappingId")),
    DomainName: S.String.pipe(T.HttpLabel("DomainName")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v2/domainnames/{DomainName}/apimappings/{ApiMappingId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteApiMappingRequest",
}) as any as S.Schema<DeleteApiMappingRequest>;
export interface DeleteApiMappingResponse {}
export const DeleteApiMappingResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteApiMappingResponse",
}) as any as S.Schema<DeleteApiMappingResponse>;
export interface DeleteAuthorizerRequest {
  ApiId: string;
  AuthorizerId: string;
}
export const DeleteAuthorizerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiId: S.String.pipe(T.HttpLabel("ApiId")),
    AuthorizerId: S.String.pipe(T.HttpLabel("AuthorizerId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v2/apis/{ApiId}/authorizers/{AuthorizerId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteAuthorizerRequest",
}) as any as S.Schema<DeleteAuthorizerRequest>;
export interface DeleteAuthorizerResponse {}
export const DeleteAuthorizerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteAuthorizerResponse",
}) as any as S.Schema<DeleteAuthorizerResponse>;
export interface DeleteCorsConfigurationRequest {
  ApiId: string;
}
export const DeleteCorsConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ApiId: S.String.pipe(T.HttpLabel("ApiId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/v2/apis/{ApiId}/cors" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteCorsConfigurationRequest",
}) as any as S.Schema<DeleteCorsConfigurationRequest>;
export interface DeleteCorsConfigurationResponse {}
export const DeleteCorsConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteCorsConfigurationResponse",
}) as any as S.Schema<DeleteCorsConfigurationResponse>;
export interface DeleteDeploymentRequest {
  ApiId: string;
  DeploymentId: string;
}
export const DeleteDeploymentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiId: S.String.pipe(T.HttpLabel("ApiId")),
    DeploymentId: S.String.pipe(T.HttpLabel("DeploymentId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v2/apis/{ApiId}/deployments/{DeploymentId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteDeploymentRequest",
}) as any as S.Schema<DeleteDeploymentRequest>;
export interface DeleteDeploymentResponse {}
export const DeleteDeploymentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteDeploymentResponse",
}) as any as S.Schema<DeleteDeploymentResponse>;
export interface DeleteDomainNameRequest {
  DomainName: string;
}
export const DeleteDomainNameRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DomainName: S.String.pipe(T.HttpLabel("DomainName")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/v2/domainnames/{DomainName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteDomainNameRequest",
}) as any as S.Schema<DeleteDomainNameRequest>;
export interface DeleteDomainNameResponse {}
export const DeleteDomainNameResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteDomainNameResponse",
}) as any as S.Schema<DeleteDomainNameResponse>;
export interface DeleteIntegrationRequest {
  ApiId: string;
  IntegrationId: string;
}
export const DeleteIntegrationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiId: S.String.pipe(T.HttpLabel("ApiId")),
    IntegrationId: S.String.pipe(T.HttpLabel("IntegrationId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v2/apis/{ApiId}/integrations/{IntegrationId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteIntegrationRequest",
}) as any as S.Schema<DeleteIntegrationRequest>;
export interface DeleteIntegrationResponse {}
export const DeleteIntegrationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteIntegrationResponse",
}) as any as S.Schema<DeleteIntegrationResponse>;
export interface DeleteIntegrationResponseRequest {
  ApiId: string;
  IntegrationId: string;
  IntegrationResponseId: string;
}
export const DeleteIntegrationResponseRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiId: S.String.pipe(T.HttpLabel("ApiId")),
    IntegrationId: S.String.pipe(T.HttpLabel("IntegrationId")),
    IntegrationResponseId: S.String.pipe(T.HttpLabel("IntegrationResponseId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v2/apis/{ApiId}/integrations/{IntegrationId}/integrationresponses/{IntegrationResponseId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteIntegrationResponseRequest",
}) as any as S.Schema<DeleteIntegrationResponseRequest>;
export interface DeleteIntegrationResponseResponse {}
export const DeleteIntegrationResponseResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteIntegrationResponseResponse",
}) as any as S.Schema<DeleteIntegrationResponseResponse>;
export interface DeleteModelRequest {
  ApiId: string;
  ModelId: string;
}
export const DeleteModelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiId: S.String.pipe(T.HttpLabel("ApiId")),
    ModelId: S.String.pipe(T.HttpLabel("ModelId")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/v2/apis/{ApiId}/models/{ModelId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteModelRequest",
}) as any as S.Schema<DeleteModelRequest>;
export interface DeleteModelResponse {}
export const DeleteModelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteModelResponse",
}) as any as S.Schema<DeleteModelResponse>;
export interface DeletePortalRequest {
  PortalId: string;
}
export const DeletePortalRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PortalId: S.String.pipe(T.HttpLabel("PortalId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/v2/portals/{PortalId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeletePortalRequest",
}) as any as S.Schema<DeletePortalRequest>;
export interface DeletePortalResponse {}
export const DeletePortalResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeletePortalResponse",
}) as any as S.Schema<DeletePortalResponse>;
export interface DeletePortalProductRequest {
  PortalProductId: string;
}
export const DeletePortalProductRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PortalProductId: S.String.pipe(T.HttpLabel("PortalProductId")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/v2/portalproducts/{PortalProductId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeletePortalProductRequest",
}) as any as S.Schema<DeletePortalProductRequest>;
export interface DeletePortalProductResponse {}
export const DeletePortalProductResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeletePortalProductResponse",
}) as any as S.Schema<DeletePortalProductResponse>;
export interface DeletePortalProductSharingPolicyRequest {
  PortalProductId: string;
}
export const DeletePortalProductSharingPolicyRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      PortalProductId: S.String.pipe(T.HttpLabel("PortalProductId")),
    }).pipe(
      T.all(
        T.Http({
          method: "DELETE",
          uri: "/v2/portalproducts/{PortalProductId}/sharingpolicy",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DeletePortalProductSharingPolicyRequest",
}) as any as S.Schema<DeletePortalProductSharingPolicyRequest>;
export interface DeletePortalProductSharingPolicyResponse {}
export const DeletePortalProductSharingPolicyResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DeletePortalProductSharingPolicyResponse",
}) as any as S.Schema<DeletePortalProductSharingPolicyResponse>;
export interface DeleteProductPageRequest {
  PortalProductId: string;
  ProductPageId: string;
}
export const DeleteProductPageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PortalProductId: S.String.pipe(T.HttpLabel("PortalProductId")),
    ProductPageId: S.String.pipe(T.HttpLabel("ProductPageId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v2/portalproducts/{PortalProductId}/productpages/{ProductPageId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteProductPageRequest",
}) as any as S.Schema<DeleteProductPageRequest>;
export interface DeleteProductPageResponse {}
export const DeleteProductPageResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteProductPageResponse",
}) as any as S.Schema<DeleteProductPageResponse>;
export interface DeleteProductRestEndpointPageRequest {
  PortalProductId: string;
  ProductRestEndpointPageId: string;
}
export const DeleteProductRestEndpointPageRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      PortalProductId: S.String.pipe(T.HttpLabel("PortalProductId")),
      ProductRestEndpointPageId: S.String.pipe(
        T.HttpLabel("ProductRestEndpointPageId"),
      ),
    }).pipe(
      T.all(
        T.Http({
          method: "DELETE",
          uri: "/v2/portalproducts/{PortalProductId}/productrestendpointpages/{ProductRestEndpointPageId}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DeleteProductRestEndpointPageRequest",
}) as any as S.Schema<DeleteProductRestEndpointPageRequest>;
export interface DeleteProductRestEndpointPageResponse {}
export const DeleteProductRestEndpointPageResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DeleteProductRestEndpointPageResponse",
}) as any as S.Schema<DeleteProductRestEndpointPageResponse>;
export interface DeleteRouteRequest {
  ApiId: string;
  RouteId: string;
}
export const DeleteRouteRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiId: S.String.pipe(T.HttpLabel("ApiId")),
    RouteId: S.String.pipe(T.HttpLabel("RouteId")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/v2/apis/{ApiId}/routes/{RouteId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteRouteRequest",
}) as any as S.Schema<DeleteRouteRequest>;
export interface DeleteRouteResponse {}
export const DeleteRouteResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteRouteResponse",
}) as any as S.Schema<DeleteRouteResponse>;
export interface DeleteRouteRequestParameterRequest {
  ApiId: string;
  RequestParameterKey: string;
  RouteId: string;
}
export const DeleteRouteRequestParameterRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiId: S.String.pipe(T.HttpLabel("ApiId")),
    RequestParameterKey: S.String.pipe(T.HttpLabel("RequestParameterKey")),
    RouteId: S.String.pipe(T.HttpLabel("RouteId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v2/apis/{ApiId}/routes/{RouteId}/requestparameters/{RequestParameterKey}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteRouteRequestParameterRequest",
}) as any as S.Schema<DeleteRouteRequestParameterRequest>;
export interface DeleteRouteRequestParameterResponse {}
export const DeleteRouteRequestParameterResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteRouteRequestParameterResponse",
}) as any as S.Schema<DeleteRouteRequestParameterResponse>;
export interface DeleteRouteResponseRequest {
  ApiId: string;
  RouteId: string;
  RouteResponseId: string;
}
export const DeleteRouteResponseRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiId: S.String.pipe(T.HttpLabel("ApiId")),
    RouteId: S.String.pipe(T.HttpLabel("RouteId")),
    RouteResponseId: S.String.pipe(T.HttpLabel("RouteResponseId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v2/apis/{ApiId}/routes/{RouteId}/routeresponses/{RouteResponseId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteRouteResponseRequest",
}) as any as S.Schema<DeleteRouteResponseRequest>;
export interface DeleteRouteResponseResponse {}
export const DeleteRouteResponseResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteRouteResponseResponse",
}) as any as S.Schema<DeleteRouteResponseResponse>;
export interface DeleteRouteSettingsRequest {
  ApiId: string;
  RouteKey: string;
  StageName: string;
}
export const DeleteRouteSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiId: S.String.pipe(T.HttpLabel("ApiId")),
    RouteKey: S.String.pipe(T.HttpLabel("RouteKey")),
    StageName: S.String.pipe(T.HttpLabel("StageName")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v2/apis/{ApiId}/stages/{StageName}/routesettings/{RouteKey}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteRouteSettingsRequest",
}) as any as S.Schema<DeleteRouteSettingsRequest>;
export interface DeleteRouteSettingsResponse {}
export const DeleteRouteSettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteRouteSettingsResponse",
}) as any as S.Schema<DeleteRouteSettingsResponse>;
export interface DeleteRoutingRuleRequest {
  DomainName: string;
  DomainNameId?: string;
  RoutingRuleId: string;
}
export const DeleteRoutingRuleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainName: S.String.pipe(T.HttpLabel("DomainName")),
    DomainNameId: S.optional(S.String).pipe(T.HttpQuery("domainNameId")),
    RoutingRuleId: S.String.pipe(T.HttpLabel("RoutingRuleId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v2/domainnames/{DomainName}/routingrules/{RoutingRuleId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteRoutingRuleRequest",
}) as any as S.Schema<DeleteRoutingRuleRequest>;
export interface DeleteRoutingRuleResponse {}
export const DeleteRoutingRuleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteRoutingRuleResponse",
}) as any as S.Schema<DeleteRoutingRuleResponse>;
export interface DeleteStageRequest {
  ApiId: string;
  StageName: string;
}
export const DeleteStageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiId: S.String.pipe(T.HttpLabel("ApiId")),
    StageName: S.String.pipe(T.HttpLabel("StageName")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/v2/apis/{ApiId}/stages/{StageName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteStageRequest",
}) as any as S.Schema<DeleteStageRequest>;
export interface DeleteStageResponse {}
export const DeleteStageResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteStageResponse",
}) as any as S.Schema<DeleteStageResponse>;
export interface DeleteVpcLinkRequest {
  VpcLinkId: string;
}
export const DeleteVpcLinkRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ VpcLinkId: S.String.pipe(T.HttpLabel("VpcLinkId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/v2/vpclinks/{VpcLinkId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteVpcLinkRequest",
}) as any as S.Schema<DeleteVpcLinkRequest>;
export interface DeleteVpcLinkResponse {}
export const DeleteVpcLinkResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteVpcLinkResponse",
}) as any as S.Schema<DeleteVpcLinkResponse>;
export interface DisablePortalRequest {
  PortalId: string;
}
export const DisablePortalRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PortalId: S.String.pipe(T.HttpLabel("PortalId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/v2/portals/{PortalId}/publish" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisablePortalRequest",
}) as any as S.Schema<DisablePortalRequest>;
export interface DisablePortalResponse {}
export const DisablePortalResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DisablePortalResponse",
}) as any as S.Schema<DisablePortalResponse>;
export interface ExportApiRequest {
  ApiId: string;
  ExportVersion?: string;
  IncludeExtensions?: boolean;
  OutputType?: string;
  Specification: string;
  StageName?: string;
}
export const ExportApiRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiId: S.String.pipe(T.HttpLabel("ApiId")),
    ExportVersion: S.optional(S.String).pipe(T.HttpQuery("exportVersion")),
    IncludeExtensions: S.optional(S.Boolean).pipe(
      T.HttpQuery("includeExtensions"),
    ),
    OutputType: S.optional(S.String).pipe(T.HttpQuery("outputType")),
    Specification: S.String.pipe(T.HttpLabel("Specification")),
    StageName: S.optional(S.String).pipe(T.HttpQuery("stageName")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/apis/{ApiId}/exports/{Specification}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ExportApiRequest",
}) as any as S.Schema<ExportApiRequest>;
export interface ExportApiResponse {
  body?: T.StreamingOutputBody;
}
export const ExportApiResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ body: S.optional(T.StreamingOutput).pipe(T.HttpPayload()) }),
).annotate({
  identifier: "ExportApiResponse",
}) as any as S.Schema<ExportApiResponse>;
export interface GetApiRequest {
  ApiId: string;
}
export const GetApiRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ApiId: S.String.pipe(T.HttpLabel("ApiId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2/apis/{ApiId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetApiRequest" }) as any as S.Schema<GetApiRequest>;
export interface GetApiResponse {
  ApiEndpoint?: string;
  ApiGatewayManaged?: boolean;
  ApiId?: string;
  ApiKeySelectionExpression?: string;
  CorsConfiguration?: Cors;
  CreatedDate?: Date;
  Description?: string;
  DisableSchemaValidation?: boolean;
  DisableExecuteApiEndpoint?: boolean;
  ImportInfo?: string[];
  IpAddressType?: IpAddressType;
  Name?: string;
  ProtocolType?: ProtocolType;
  RouteSelectionExpression?: string;
  Tags?: { [key: string]: string | undefined };
  Version?: string;
  Warnings?: string[];
}
export const GetApiResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiEndpoint: S.optional(S.String),
    ApiGatewayManaged: S.optional(S.Boolean),
    ApiId: S.optional(S.String),
    ApiKeySelectionExpression: S.optional(S.String),
    CorsConfiguration: S.optional(Cors),
    CreatedDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Description: S.optional(S.String),
    DisableSchemaValidation: S.optional(S.Boolean),
    DisableExecuteApiEndpoint: S.optional(S.Boolean),
    ImportInfo: S.optional(__listOf__string),
    IpAddressType: S.optional(IpAddressType),
    Name: S.optional(S.String),
    ProtocolType: S.optional(ProtocolType),
    RouteSelectionExpression: S.optional(S.String),
    Tags: S.optional(Tags),
    Version: S.optional(S.String),
    Warnings: S.optional(__listOf__string),
  }).pipe(
    S.encodeKeys({
      ApiEndpoint: "apiEndpoint",
      ApiGatewayManaged: "apiGatewayManaged",
      ApiId: "apiId",
      ApiKeySelectionExpression: "apiKeySelectionExpression",
      CorsConfiguration: "corsConfiguration",
      CreatedDate: "createdDate",
      Description: "description",
      DisableSchemaValidation: "disableSchemaValidation",
      DisableExecuteApiEndpoint: "disableExecuteApiEndpoint",
      ImportInfo: "importInfo",
      IpAddressType: "ipAddressType",
      Name: "name",
      ProtocolType: "protocolType",
      RouteSelectionExpression: "routeSelectionExpression",
      Tags: "tags",
      Version: "version",
      Warnings: "warnings",
    }),
  ),
).annotate({ identifier: "GetApiResponse" }) as any as S.Schema<GetApiResponse>;
export interface GetApiMappingRequest {
  ApiMappingId: string;
  DomainName: string;
}
export const GetApiMappingRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiMappingId: S.String.pipe(T.HttpLabel("ApiMappingId")),
    DomainName: S.String.pipe(T.HttpLabel("DomainName")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/domainnames/{DomainName}/apimappings/{ApiMappingId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetApiMappingRequest",
}) as any as S.Schema<GetApiMappingRequest>;
export interface GetApiMappingResponse {
  ApiId?: string;
  ApiMappingId?: string;
  ApiMappingKey?: string;
  Stage?: string;
}
export const GetApiMappingResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiId: S.optional(S.String),
    ApiMappingId: S.optional(S.String),
    ApiMappingKey: S.optional(S.String),
    Stage: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      ApiId: "apiId",
      ApiMappingId: "apiMappingId",
      ApiMappingKey: "apiMappingKey",
      Stage: "stage",
    }),
  ),
).annotate({
  identifier: "GetApiMappingResponse",
}) as any as S.Schema<GetApiMappingResponse>;
export interface GetApiMappingsRequest {
  DomainName: string;
  MaxResults?: string;
  NextToken?: string;
}
export const GetApiMappingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainName: S.String.pipe(T.HttpLabel("DomainName")),
    MaxResults: S.optional(S.String).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/domainnames/{DomainName}/apimappings",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetApiMappingsRequest",
}) as any as S.Schema<GetApiMappingsRequest>;
export interface ApiMapping {
  ApiId?: string;
  ApiMappingId?: string;
  ApiMappingKey?: string;
  Stage?: string;
}
export const ApiMapping = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiId: S.optional(S.String),
    ApiMappingId: S.optional(S.String),
    ApiMappingKey: S.optional(S.String),
    Stage: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      ApiId: "apiId",
      ApiMappingId: "apiMappingId",
      ApiMappingKey: "apiMappingKey",
      Stage: "stage",
    }),
  ),
).annotate({ identifier: "ApiMapping" }) as any as S.Schema<ApiMapping>;
export type __listOfApiMapping = ApiMapping[];
export const __listOfApiMapping = /*@__PURE__*/ S.Array(ApiMapping);
export type NextToken = string;
export interface GetApiMappingsResponse {
  Items?: (ApiMapping & { ApiId: Id; Stage: StringWithLengthBetween1And128 })[];
  NextToken?: string;
}
export const GetApiMappingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Items: S.optional(__listOfApiMapping),
    NextToken: S.optional(S.String),
  }).pipe(S.encodeKeys({ Items: "items", NextToken: "nextToken" })),
).annotate({
  identifier: "GetApiMappingsResponse",
}) as any as S.Schema<GetApiMappingsResponse>;
export interface GetApisRequest {
  MaxResults?: string;
  NextToken?: string;
}
export const GetApisRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.String).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2/apis" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetApisRequest" }) as any as S.Schema<GetApisRequest>;
export interface Api {
  ApiEndpoint?: string;
  ApiGatewayManaged?: boolean;
  ApiId?: string;
  ApiKeySelectionExpression?: string;
  CorsConfiguration?: Cors;
  CreatedDate?: Date;
  Description?: string;
  DisableSchemaValidation?: boolean;
  DisableExecuteApiEndpoint?: boolean;
  ImportInfo?: string[];
  IpAddressType?: IpAddressType;
  Name?: string;
  ProtocolType?: ProtocolType;
  RouteSelectionExpression?: string;
  Tags?: { [key: string]: string | undefined };
  Version?: string;
  Warnings?: string[];
}
export const Api = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiEndpoint: S.optional(S.String),
    ApiGatewayManaged: S.optional(S.Boolean),
    ApiId: S.optional(S.String),
    ApiKeySelectionExpression: S.optional(S.String),
    CorsConfiguration: S.optional(Cors),
    CreatedDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Description: S.optional(S.String),
    DisableSchemaValidation: S.optional(S.Boolean),
    DisableExecuteApiEndpoint: S.optional(S.Boolean),
    ImportInfo: S.optional(__listOf__string),
    IpAddressType: S.optional(IpAddressType),
    Name: S.optional(S.String),
    ProtocolType: S.optional(ProtocolType),
    RouteSelectionExpression: S.optional(S.String),
    Tags: S.optional(Tags),
    Version: S.optional(S.String),
    Warnings: S.optional(__listOf__string),
  }).pipe(
    S.encodeKeys({
      ApiEndpoint: "apiEndpoint",
      ApiGatewayManaged: "apiGatewayManaged",
      ApiId: "apiId",
      ApiKeySelectionExpression: "apiKeySelectionExpression",
      CorsConfiguration: "corsConfiguration",
      CreatedDate: "createdDate",
      Description: "description",
      DisableSchemaValidation: "disableSchemaValidation",
      DisableExecuteApiEndpoint: "disableExecuteApiEndpoint",
      ImportInfo: "importInfo",
      IpAddressType: "ipAddressType",
      Name: "name",
      ProtocolType: "protocolType",
      RouteSelectionExpression: "routeSelectionExpression",
      Tags: "tags",
      Version: "version",
      Warnings: "warnings",
    }),
  ),
).annotate({ identifier: "Api" }) as any as S.Schema<Api>;
export type __listOfApi = Api[];
export const __listOfApi = /*@__PURE__*/ S.Array(Api);
export interface GetApisResponse {
  Items?: (Api & {
    Name: StringWithLengthBetween1And128;
    ProtocolType: ProtocolType;
    RouteSelectionExpression: SelectionExpression;
  })[];
  NextToken?: string;
}
export const GetApisResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Items: S.optional(__listOfApi),
    NextToken: S.optional(S.String),
  }).pipe(S.encodeKeys({ Items: "items", NextToken: "nextToken" })),
).annotate({
  identifier: "GetApisResponse",
}) as any as S.Schema<GetApisResponse>;
export interface GetAuthorizerRequest {
  ApiId: string;
  AuthorizerId: string;
}
export const GetAuthorizerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiId: S.String.pipe(T.HttpLabel("ApiId")),
    AuthorizerId: S.String.pipe(T.HttpLabel("AuthorizerId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/apis/{ApiId}/authorizers/{AuthorizerId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAuthorizerRequest",
}) as any as S.Schema<GetAuthorizerRequest>;
export interface GetAuthorizerResponse {
  AuthorizerCredentialsArn?: string;
  AuthorizerId?: string;
  AuthorizerPayloadFormatVersion?: string;
  AuthorizerResultTtlInSeconds?: number;
  AuthorizerType?: AuthorizerType;
  AuthorizerUri?: string;
  EnableSimpleResponses?: boolean;
  IdentitySource?: string[];
  IdentityValidationExpression?: string;
  JwtConfiguration?: JWTConfiguration;
  Name?: string;
}
export const GetAuthorizerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AuthorizerCredentialsArn: S.optional(S.String),
    AuthorizerId: S.optional(S.String),
    AuthorizerPayloadFormatVersion: S.optional(S.String),
    AuthorizerResultTtlInSeconds: S.optional(S.Number),
    AuthorizerType: S.optional(AuthorizerType),
    AuthorizerUri: S.optional(S.String),
    EnableSimpleResponses: S.optional(S.Boolean),
    IdentitySource: S.optional(IdentitySourceList),
    IdentityValidationExpression: S.optional(S.String),
    JwtConfiguration: S.optional(JWTConfiguration),
    Name: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      AuthorizerCredentialsArn: "authorizerCredentialsArn",
      AuthorizerId: "authorizerId",
      AuthorizerPayloadFormatVersion: "authorizerPayloadFormatVersion",
      AuthorizerResultTtlInSeconds: "authorizerResultTtlInSeconds",
      AuthorizerType: "authorizerType",
      AuthorizerUri: "authorizerUri",
      EnableSimpleResponses: "enableSimpleResponses",
      IdentitySource: "identitySource",
      IdentityValidationExpression: "identityValidationExpression",
      JwtConfiguration: "jwtConfiguration",
      Name: "name",
    }),
  ),
).annotate({
  identifier: "GetAuthorizerResponse",
}) as any as S.Schema<GetAuthorizerResponse>;
export interface GetAuthorizersRequest {
  ApiId: string;
  MaxResults?: string;
  NextToken?: string;
}
export const GetAuthorizersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiId: S.String.pipe(T.HttpLabel("ApiId")),
    MaxResults: S.optional(S.String).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2/apis/{ApiId}/authorizers" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAuthorizersRequest",
}) as any as S.Schema<GetAuthorizersRequest>;
export interface Authorizer {
  AuthorizerCredentialsArn?: string;
  AuthorizerId?: string;
  AuthorizerPayloadFormatVersion?: string;
  AuthorizerResultTtlInSeconds?: number;
  AuthorizerType?: AuthorizerType;
  AuthorizerUri?: string;
  EnableSimpleResponses?: boolean;
  IdentitySource?: string[];
  IdentityValidationExpression?: string;
  JwtConfiguration?: JWTConfiguration;
  Name?: string;
}
export const Authorizer = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AuthorizerCredentialsArn: S.optional(S.String),
    AuthorizerId: S.optional(S.String),
    AuthorizerPayloadFormatVersion: S.optional(S.String),
    AuthorizerResultTtlInSeconds: S.optional(S.Number),
    AuthorizerType: S.optional(AuthorizerType),
    AuthorizerUri: S.optional(S.String),
    EnableSimpleResponses: S.optional(S.Boolean),
    IdentitySource: S.optional(IdentitySourceList),
    IdentityValidationExpression: S.optional(S.String),
    JwtConfiguration: S.optional(JWTConfiguration),
    Name: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      AuthorizerCredentialsArn: "authorizerCredentialsArn",
      AuthorizerId: "authorizerId",
      AuthorizerPayloadFormatVersion: "authorizerPayloadFormatVersion",
      AuthorizerResultTtlInSeconds: "authorizerResultTtlInSeconds",
      AuthorizerType: "authorizerType",
      AuthorizerUri: "authorizerUri",
      EnableSimpleResponses: "enableSimpleResponses",
      IdentitySource: "identitySource",
      IdentityValidationExpression: "identityValidationExpression",
      JwtConfiguration: "jwtConfiguration",
      Name: "name",
    }),
  ),
).annotate({ identifier: "Authorizer" }) as any as S.Schema<Authorizer>;
export type __listOfAuthorizer = Authorizer[];
export const __listOfAuthorizer = /*@__PURE__*/ S.Array(Authorizer);
export interface GetAuthorizersResponse {
  Items?: (Authorizer & { Name: StringWithLengthBetween1And128 })[];
  NextToken?: string;
}
export const GetAuthorizersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Items: S.optional(__listOfAuthorizer),
    NextToken: S.optional(S.String),
  }).pipe(S.encodeKeys({ Items: "items", NextToken: "nextToken" })),
).annotate({
  identifier: "GetAuthorizersResponse",
}) as any as S.Schema<GetAuthorizersResponse>;
export interface GetDeploymentRequest {
  ApiId: string;
  DeploymentId: string;
}
export const GetDeploymentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiId: S.String.pipe(T.HttpLabel("ApiId")),
    DeploymentId: S.String.pipe(T.HttpLabel("DeploymentId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/apis/{ApiId}/deployments/{DeploymentId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDeploymentRequest",
}) as any as S.Schema<GetDeploymentRequest>;
export interface GetDeploymentResponse {
  AutoDeployed?: boolean;
  CreatedDate?: Date;
  DeploymentId?: string;
  DeploymentStatus?: DeploymentStatus;
  DeploymentStatusMessage?: string;
  Description?: string;
}
export const GetDeploymentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AutoDeployed: S.optional(S.Boolean),
    CreatedDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    DeploymentId: S.optional(S.String),
    DeploymentStatus: S.optional(DeploymentStatus),
    DeploymentStatusMessage: S.optional(S.String),
    Description: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      AutoDeployed: "autoDeployed",
      CreatedDate: "createdDate",
      DeploymentId: "deploymentId",
      DeploymentStatus: "deploymentStatus",
      DeploymentStatusMessage: "deploymentStatusMessage",
      Description: "description",
    }),
  ),
).annotate({
  identifier: "GetDeploymentResponse",
}) as any as S.Schema<GetDeploymentResponse>;
export interface GetDeploymentsRequest {
  ApiId: string;
  MaxResults?: string;
  NextToken?: string;
}
export const GetDeploymentsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiId: S.String.pipe(T.HttpLabel("ApiId")),
    MaxResults: S.optional(S.String).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2/apis/{ApiId}/deployments" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDeploymentsRequest",
}) as any as S.Schema<GetDeploymentsRequest>;
export interface Deployment {
  AutoDeployed?: boolean;
  CreatedDate?: Date;
  DeploymentId?: string;
  DeploymentStatus?: DeploymentStatus;
  DeploymentStatusMessage?: string;
  Description?: string;
}
export const Deployment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AutoDeployed: S.optional(S.Boolean),
    CreatedDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    DeploymentId: S.optional(S.String),
    DeploymentStatus: S.optional(DeploymentStatus),
    DeploymentStatusMessage: S.optional(S.String),
    Description: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      AutoDeployed: "autoDeployed",
      CreatedDate: "createdDate",
      DeploymentId: "deploymentId",
      DeploymentStatus: "deploymentStatus",
      DeploymentStatusMessage: "deploymentStatusMessage",
      Description: "description",
    }),
  ),
).annotate({ identifier: "Deployment" }) as any as S.Schema<Deployment>;
export type __listOfDeployment = Deployment[];
export const __listOfDeployment = /*@__PURE__*/ S.Array(Deployment);
export interface GetDeploymentsResponse {
  Items?: Deployment[];
  NextToken?: string;
}
export const GetDeploymentsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Items: S.optional(__listOfDeployment),
    NextToken: S.optional(S.String),
  }).pipe(S.encodeKeys({ Items: "items", NextToken: "nextToken" })),
).annotate({
  identifier: "GetDeploymentsResponse",
}) as any as S.Schema<GetDeploymentsResponse>;
export interface GetDomainNameRequest {
  DomainName: string;
}
export const GetDomainNameRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DomainName: S.String.pipe(T.HttpLabel("DomainName")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2/domainnames/{DomainName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDomainNameRequest",
}) as any as S.Schema<GetDomainNameRequest>;
export interface GetDomainNameResponse {
  ApiMappingSelectionExpression?: string;
  DomainName?: string;
  DomainNameArn?: string;
  DomainNameConfigurations?: DomainNameConfiguration[];
  MutualTlsAuthentication?: MutualTlsAuthentication;
  RoutingMode?: RoutingMode;
  Tags?: { [key: string]: string | undefined };
}
export const GetDomainNameResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiMappingSelectionExpression: S.optional(S.String),
    DomainName: S.optional(S.String),
    DomainNameArn: S.optional(S.String),
    DomainNameConfigurations: S.optional(DomainNameConfigurations),
    MutualTlsAuthentication: S.optional(MutualTlsAuthentication),
    RoutingMode: S.optional(RoutingMode),
    Tags: S.optional(Tags),
  }).pipe(
    S.encodeKeys({
      ApiMappingSelectionExpression: "apiMappingSelectionExpression",
      DomainName: "domainName",
      DomainNameArn: "domainNameArn",
      DomainNameConfigurations: "domainNameConfigurations",
      MutualTlsAuthentication: "mutualTlsAuthentication",
      RoutingMode: "routingMode",
      Tags: "tags",
    }),
  ),
).annotate({
  identifier: "GetDomainNameResponse",
}) as any as S.Schema<GetDomainNameResponse>;
export interface GetDomainNamesRequest {
  MaxResults?: string;
  NextToken?: string;
}
export const GetDomainNamesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.String).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2/domainnames" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDomainNamesRequest",
}) as any as S.Schema<GetDomainNamesRequest>;
export interface DomainName {
  ApiMappingSelectionExpression?: string;
  DomainName?: string;
  DomainNameArn?: string;
  DomainNameConfigurations?: DomainNameConfiguration[];
  MutualTlsAuthentication?: MutualTlsAuthentication;
  RoutingMode?: RoutingMode;
  Tags?: { [key: string]: string | undefined };
}
export const DomainName = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiMappingSelectionExpression: S.optional(S.String),
    DomainName: S.optional(S.String),
    DomainNameArn: S.optional(S.String),
    DomainNameConfigurations: S.optional(DomainNameConfigurations),
    MutualTlsAuthentication: S.optional(MutualTlsAuthentication),
    RoutingMode: S.optional(RoutingMode),
    Tags: S.optional(Tags),
  }).pipe(
    S.encodeKeys({
      ApiMappingSelectionExpression: "apiMappingSelectionExpression",
      DomainName: "domainName",
      DomainNameArn: "domainNameArn",
      DomainNameConfigurations: "domainNameConfigurations",
      MutualTlsAuthentication: "mutualTlsAuthentication",
      RoutingMode: "routingMode",
      Tags: "tags",
    }),
  ),
).annotate({ identifier: "DomainName" }) as any as S.Schema<DomainName>;
export type __listOfDomainName = DomainName[];
export const __listOfDomainName = /*@__PURE__*/ S.Array(DomainName);
export interface GetDomainNamesResponse {
  Items?: (DomainName & { DomainName: StringWithLengthBetween1And512 })[];
  NextToken?: string;
}
export const GetDomainNamesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Items: S.optional(__listOfDomainName),
    NextToken: S.optional(S.String),
  }).pipe(S.encodeKeys({ Items: "items", NextToken: "nextToken" })),
).annotate({
  identifier: "GetDomainNamesResponse",
}) as any as S.Schema<GetDomainNamesResponse>;
export interface GetIntegrationRequest {
  ApiId: string;
  IntegrationId: string;
}
export const GetIntegrationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiId: S.String.pipe(T.HttpLabel("ApiId")),
    IntegrationId: S.String.pipe(T.HttpLabel("IntegrationId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/apis/{ApiId}/integrations/{IntegrationId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetIntegrationRequest",
}) as any as S.Schema<GetIntegrationRequest>;
export interface GetIntegrationResult {
  ApiGatewayManaged?: boolean;
  ConnectionId?: string;
  ConnectionType?: ConnectionType;
  ContentHandlingStrategy?: ContentHandlingStrategy;
  CredentialsArn?: string;
  Description?: string;
  IntegrationId?: string;
  IntegrationMethod?: string;
  IntegrationResponseSelectionExpression?: string;
  IntegrationSubtype?: string;
  IntegrationType?: IntegrationType;
  IntegrationUri?: string;
  PassthroughBehavior?: PassthroughBehavior;
  PayloadFormatVersion?: string;
  RequestParameters?: { [key: string]: string | undefined };
  RequestTemplates?: { [key: string]: string | undefined };
  ResponseParameters?: {
    [key: string]: { [key: string]: string | undefined } | undefined;
  };
  TemplateSelectionExpression?: string;
  TimeoutInMillis?: number;
  TlsConfig?: TlsConfig;
}
export const GetIntegrationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiGatewayManaged: S.optional(S.Boolean),
    ConnectionId: S.optional(S.String),
    ConnectionType: S.optional(ConnectionType),
    ContentHandlingStrategy: S.optional(ContentHandlingStrategy),
    CredentialsArn: S.optional(S.String),
    Description: S.optional(S.String),
    IntegrationId: S.optional(S.String),
    IntegrationMethod: S.optional(S.String),
    IntegrationResponseSelectionExpression: S.optional(S.String),
    IntegrationSubtype: S.optional(S.String),
    IntegrationType: S.optional(IntegrationType),
    IntegrationUri: S.optional(S.String),
    PassthroughBehavior: S.optional(PassthroughBehavior),
    PayloadFormatVersion: S.optional(S.String),
    RequestParameters: S.optional(IntegrationParameters),
    RequestTemplates: S.optional(TemplateMap),
    ResponseParameters: S.optional(ResponseParameters),
    TemplateSelectionExpression: S.optional(S.String),
    TimeoutInMillis: S.optional(S.Number),
    TlsConfig: S.optional(TlsConfig),
  }).pipe(
    S.encodeKeys({
      ApiGatewayManaged: "apiGatewayManaged",
      ConnectionId: "connectionId",
      ConnectionType: "connectionType",
      ContentHandlingStrategy: "contentHandlingStrategy",
      CredentialsArn: "credentialsArn",
      Description: "description",
      IntegrationId: "integrationId",
      IntegrationMethod: "integrationMethod",
      IntegrationResponseSelectionExpression:
        "integrationResponseSelectionExpression",
      IntegrationSubtype: "integrationSubtype",
      IntegrationType: "integrationType",
      IntegrationUri: "integrationUri",
      PassthroughBehavior: "passthroughBehavior",
      PayloadFormatVersion: "payloadFormatVersion",
      RequestParameters: "requestParameters",
      RequestTemplates: "requestTemplates",
      ResponseParameters: "responseParameters",
      TemplateSelectionExpression: "templateSelectionExpression",
      TimeoutInMillis: "timeoutInMillis",
      TlsConfig: "tlsConfig",
    }),
  ),
).annotate({
  identifier: "GetIntegrationResult",
}) as any as S.Schema<GetIntegrationResult>;
export interface GetIntegrationResponseRequest {
  ApiId: string;
  IntegrationId: string;
  IntegrationResponseId: string;
}
export const GetIntegrationResponseRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiId: S.String.pipe(T.HttpLabel("ApiId")),
    IntegrationId: S.String.pipe(T.HttpLabel("IntegrationId")),
    IntegrationResponseId: S.String.pipe(T.HttpLabel("IntegrationResponseId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/apis/{ApiId}/integrations/{IntegrationId}/integrationresponses/{IntegrationResponseId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetIntegrationResponseRequest",
}) as any as S.Schema<GetIntegrationResponseRequest>;
export interface GetIntegrationResponseResponse {
  ContentHandlingStrategy?: ContentHandlingStrategy;
  IntegrationResponseId?: string;
  IntegrationResponseKey?: string;
  ResponseParameters?: { [key: string]: string | undefined };
  ResponseTemplates?: { [key: string]: string | undefined };
  TemplateSelectionExpression?: string;
}
export const GetIntegrationResponseResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContentHandlingStrategy: S.optional(ContentHandlingStrategy),
    IntegrationResponseId: S.optional(S.String),
    IntegrationResponseKey: S.optional(S.String),
    ResponseParameters: S.optional(IntegrationParameters),
    ResponseTemplates: S.optional(TemplateMap),
    TemplateSelectionExpression: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      ContentHandlingStrategy: "contentHandlingStrategy",
      IntegrationResponseId: "integrationResponseId",
      IntegrationResponseKey: "integrationResponseKey",
      ResponseParameters: "responseParameters",
      ResponseTemplates: "responseTemplates",
      TemplateSelectionExpression: "templateSelectionExpression",
    }),
  ),
).annotate({
  identifier: "GetIntegrationResponseResponse",
}) as any as S.Schema<GetIntegrationResponseResponse>;
export interface GetIntegrationResponsesRequest {
  ApiId: string;
  IntegrationId: string;
  MaxResults?: string;
  NextToken?: string;
}
export const GetIntegrationResponsesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiId: S.String.pipe(T.HttpLabel("ApiId")),
    IntegrationId: S.String.pipe(T.HttpLabel("IntegrationId")),
    MaxResults: S.optional(S.String).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/apis/{ApiId}/integrations/{IntegrationId}/integrationresponses",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetIntegrationResponsesRequest",
}) as any as S.Schema<GetIntegrationResponsesRequest>;
export interface IntegrationResponse {
  ContentHandlingStrategy?: ContentHandlingStrategy;
  IntegrationResponseId?: string;
  IntegrationResponseKey?: string;
  ResponseParameters?: { [key: string]: string | undefined };
  ResponseTemplates?: { [key: string]: string | undefined };
  TemplateSelectionExpression?: string;
}
export const IntegrationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContentHandlingStrategy: S.optional(ContentHandlingStrategy),
    IntegrationResponseId: S.optional(S.String),
    IntegrationResponseKey: S.optional(S.String),
    ResponseParameters: S.optional(IntegrationParameters),
    ResponseTemplates: S.optional(TemplateMap),
    TemplateSelectionExpression: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      ContentHandlingStrategy: "contentHandlingStrategy",
      IntegrationResponseId: "integrationResponseId",
      IntegrationResponseKey: "integrationResponseKey",
      ResponseParameters: "responseParameters",
      ResponseTemplates: "responseTemplates",
      TemplateSelectionExpression: "templateSelectionExpression",
    }),
  ),
).annotate({
  identifier: "IntegrationResponse",
}) as any as S.Schema<IntegrationResponse>;
export type __listOfIntegrationResponse = IntegrationResponse[];
export const __listOfIntegrationResponse =
  /*@__PURE__*/ S.Array(IntegrationResponse);
export interface GetIntegrationResponsesResponse {
  Items?: (IntegrationResponse & { IntegrationResponseKey: SelectionKey })[];
  NextToken?: string;
}
export const GetIntegrationResponsesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Items: S.optional(__listOfIntegrationResponse),
    NextToken: S.optional(S.String),
  }).pipe(S.encodeKeys({ Items: "items", NextToken: "nextToken" })),
).annotate({
  identifier: "GetIntegrationResponsesResponse",
}) as any as S.Schema<GetIntegrationResponsesResponse>;
export interface GetIntegrationsRequest {
  ApiId: string;
  MaxResults?: string;
  NextToken?: string;
}
export const GetIntegrationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiId: S.String.pipe(T.HttpLabel("ApiId")),
    MaxResults: S.optional(S.String).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2/apis/{ApiId}/integrations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetIntegrationsRequest",
}) as any as S.Schema<GetIntegrationsRequest>;
export interface Integration {
  ApiGatewayManaged?: boolean;
  ConnectionId?: string;
  ConnectionType?: ConnectionType;
  ContentHandlingStrategy?: ContentHandlingStrategy;
  CredentialsArn?: string;
  Description?: string;
  IntegrationId?: string;
  IntegrationMethod?: string;
  IntegrationResponseSelectionExpression?: string;
  IntegrationSubtype?: string;
  IntegrationType?: IntegrationType;
  IntegrationUri?: string;
  PassthroughBehavior?: PassthroughBehavior;
  PayloadFormatVersion?: string;
  RequestParameters?: { [key: string]: string | undefined };
  RequestTemplates?: { [key: string]: string | undefined };
  ResponseParameters?: {
    [key: string]: { [key: string]: string | undefined } | undefined;
  };
  TemplateSelectionExpression?: string;
  TimeoutInMillis?: number;
  TlsConfig?: TlsConfig;
}
export const Integration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiGatewayManaged: S.optional(S.Boolean),
    ConnectionId: S.optional(S.String),
    ConnectionType: S.optional(ConnectionType),
    ContentHandlingStrategy: S.optional(ContentHandlingStrategy),
    CredentialsArn: S.optional(S.String),
    Description: S.optional(S.String),
    IntegrationId: S.optional(S.String),
    IntegrationMethod: S.optional(S.String),
    IntegrationResponseSelectionExpression: S.optional(S.String),
    IntegrationSubtype: S.optional(S.String),
    IntegrationType: S.optional(IntegrationType),
    IntegrationUri: S.optional(S.String),
    PassthroughBehavior: S.optional(PassthroughBehavior),
    PayloadFormatVersion: S.optional(S.String),
    RequestParameters: S.optional(IntegrationParameters),
    RequestTemplates: S.optional(TemplateMap),
    ResponseParameters: S.optional(ResponseParameters),
    TemplateSelectionExpression: S.optional(S.String),
    TimeoutInMillis: S.optional(S.Number),
    TlsConfig: S.optional(TlsConfig),
  }).pipe(
    S.encodeKeys({
      ApiGatewayManaged: "apiGatewayManaged",
      ConnectionId: "connectionId",
      ConnectionType: "connectionType",
      ContentHandlingStrategy: "contentHandlingStrategy",
      CredentialsArn: "credentialsArn",
      Description: "description",
      IntegrationId: "integrationId",
      IntegrationMethod: "integrationMethod",
      IntegrationResponseSelectionExpression:
        "integrationResponseSelectionExpression",
      IntegrationSubtype: "integrationSubtype",
      IntegrationType: "integrationType",
      IntegrationUri: "integrationUri",
      PassthroughBehavior: "passthroughBehavior",
      PayloadFormatVersion: "payloadFormatVersion",
      RequestParameters: "requestParameters",
      RequestTemplates: "requestTemplates",
      ResponseParameters: "responseParameters",
      TemplateSelectionExpression: "templateSelectionExpression",
      TimeoutInMillis: "timeoutInMillis",
      TlsConfig: "tlsConfig",
    }),
  ),
).annotate({ identifier: "Integration" }) as any as S.Schema<Integration>;
export type __listOfIntegration = Integration[];
export const __listOfIntegration = /*@__PURE__*/ S.Array(Integration);
export interface GetIntegrationsResponse {
  Items?: Integration[];
  NextToken?: string;
}
export const GetIntegrationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Items: S.optional(__listOfIntegration),
    NextToken: S.optional(S.String),
  }).pipe(S.encodeKeys({ Items: "items", NextToken: "nextToken" })),
).annotate({
  identifier: "GetIntegrationsResponse",
}) as any as S.Schema<GetIntegrationsResponse>;
export interface GetModelRequest {
  ApiId: string;
  ModelId: string;
}
export const GetModelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiId: S.String.pipe(T.HttpLabel("ApiId")),
    ModelId: S.String.pipe(T.HttpLabel("ModelId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2/apis/{ApiId}/models/{ModelId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetModelRequest",
}) as any as S.Schema<GetModelRequest>;
export interface GetModelResponse {
  ContentType?: string;
  Description?: string;
  ModelId?: string;
  Name?: string;
  Schema?: string;
}
export const GetModelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContentType: S.optional(S.String),
    Description: S.optional(S.String),
    ModelId: S.optional(S.String),
    Name: S.optional(S.String),
    Schema: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      ContentType: "contentType",
      Description: "description",
      ModelId: "modelId",
      Name: "name",
      Schema: "schema",
    }),
  ),
).annotate({
  identifier: "GetModelResponse",
}) as any as S.Schema<GetModelResponse>;
export interface GetModelsRequest {
  ApiId: string;
  MaxResults?: string;
  NextToken?: string;
}
export const GetModelsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiId: S.String.pipe(T.HttpLabel("ApiId")),
    MaxResults: S.optional(S.String).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2/apis/{ApiId}/models" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetModelsRequest",
}) as any as S.Schema<GetModelsRequest>;
export interface Model {
  ContentType?: string;
  Description?: string;
  ModelId?: string;
  Name?: string;
  Schema?: string;
}
export const Model = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContentType: S.optional(S.String),
    Description: S.optional(S.String),
    ModelId: S.optional(S.String),
    Name: S.optional(S.String),
    Schema: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      ContentType: "contentType",
      Description: "description",
      ModelId: "modelId",
      Name: "name",
      Schema: "schema",
    }),
  ),
).annotate({ identifier: "Model" }) as any as S.Schema<Model>;
export type __listOfModel = Model[];
export const __listOfModel = /*@__PURE__*/ S.Array(Model);
export interface GetModelsResponse {
  Items?: (Model & { Name: StringWithLengthBetween1And128 })[];
  NextToken?: string;
}
export const GetModelsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Items: S.optional(__listOfModel),
    NextToken: S.optional(S.String),
  }).pipe(S.encodeKeys({ Items: "items", NextToken: "nextToken" })),
).annotate({
  identifier: "GetModelsResponse",
}) as any as S.Schema<GetModelsResponse>;
export interface GetModelTemplateRequest {
  ApiId: string;
  ModelId: string;
}
export const GetModelTemplateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiId: S.String.pipe(T.HttpLabel("ApiId")),
    ModelId: S.String.pipe(T.HttpLabel("ModelId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/apis/{ApiId}/models/{ModelId}/template",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetModelTemplateRequest",
}) as any as S.Schema<GetModelTemplateRequest>;
export interface GetModelTemplateResponse {
  Value?: string;
}
export const GetModelTemplateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Value: S.optional(S.String) }).pipe(
    S.encodeKeys({ Value: "value" }),
  ),
).annotate({
  identifier: "GetModelTemplateResponse",
}) as any as S.Schema<GetModelTemplateResponse>;
export interface GetPortalRequest {
  PortalId: string;
}
export const GetPortalRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PortalId: S.String.pipe(T.HttpLabel("PortalId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2/portals/{PortalId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetPortalRequest",
}) as any as S.Schema<GetPortalRequest>;
export type PreviewStatus =
  | "PREVIEW_IN_PROGRESS"
  | "PREVIEW_FAILED"
  | "PREVIEW_READY"
  | (string & {});
export const PreviewStatus = /*@__PURE__*/ S.String;

export interface Preview {
  PreviewStatus?: PreviewStatus;
  PreviewUrl?: string;
  StatusException?: StatusException;
}
export const Preview = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PreviewStatus: S.optional(PreviewStatus),
    PreviewUrl: S.optional(S.String),
    StatusException: S.optional(StatusException),
  }).pipe(
    S.encodeKeys({
      PreviewStatus: "previewStatus",
      PreviewUrl: "previewUrl",
      StatusException: "statusException",
    }),
  ),
).annotate({ identifier: "Preview" }) as any as S.Schema<Preview>;
export interface GetPortalResponse {
  Authorization?: Authorization & {
    CognitoConfig: CognitoConfig & {
      AppClientId: __stringMin1Max256;
      UserPoolArn: __stringMin20Max2048;
      UserPoolDomain: __stringMin20Max2048;
    };
  };
  EndpointConfiguration?: EndpointConfigurationResponse & {
    PortalDefaultDomainName: __stringMin3Max256;
    PortalDomainHostedZoneId: __stringMin1Max64;
  };
  IncludedPortalProductArns?: string[];
  LastModified?: Date;
  LastPublished?: Date;
  LastPublishedDescription?: string;
  PortalArn?: string;
  PortalContent?: PortalContent & {
    DisplayName: __stringMin3Max255;
    Theme: PortalTheme & {
      CustomColors: CustomColors & {
        AccentColor: __stringMin1Max16;
        BackgroundColor: __stringMin1Max16;
        ErrorValidationColor: __stringMin1Max16;
        HeaderColor: __stringMin1Max16;
        NavigationColor: __stringMin1Max16;
        TextColor: __stringMin1Max16;
      };
    };
  };
  PortalId?: string;
  Preview?: Preview & { PreviewStatus: PreviewStatus };
  PublishStatus?: PublishStatus;
  RumAppMonitorName?: string;
  StatusException?: StatusException;
  Tags?: { [key: string]: string | undefined };
}
export const GetPortalResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Authorization: S.optional(Authorization),
    EndpointConfiguration: S.optional(EndpointConfigurationResponse),
    IncludedPortalProductArns: S.optional(__listOf__stringMin20Max2048),
    LastModified: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    LastPublished: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    LastPublishedDescription: S.optional(S.String),
    PortalArn: S.optional(S.String),
    PortalContent: S.optional(PortalContent),
    PortalId: S.optional(S.String),
    Preview: S.optional(Preview),
    PublishStatus: S.optional(PublishStatus),
    RumAppMonitorName: S.optional(S.String),
    StatusException: S.optional(StatusException),
    Tags: S.optional(Tags),
  }).pipe(
    S.encodeKeys({
      Authorization: "authorization",
      EndpointConfiguration: "endpointConfiguration",
      IncludedPortalProductArns: "includedPortalProductArns",
      LastModified: "lastModified",
      LastPublished: "lastPublished",
      LastPublishedDescription: "lastPublishedDescription",
      PortalArn: "portalArn",
      PortalContent: "portalContent",
      PortalId: "portalId",
      Preview: "preview",
      PublishStatus: "publishStatus",
      RumAppMonitorName: "rumAppMonitorName",
      StatusException: "statusException",
      Tags: "tags",
    }),
  ),
).annotate({
  identifier: "GetPortalResponse",
}) as any as S.Schema<GetPortalResponse>;
export interface GetPortalProductRequest {
  PortalProductId: string;
  ResourceOwnerAccountId?: string;
}
export const GetPortalProductRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PortalProductId: S.String.pipe(T.HttpLabel("PortalProductId")),
    ResourceOwnerAccountId: S.optional(S.String).pipe(
      T.HttpQuery("resourceOwnerAccountId"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2/portalproducts/{PortalProductId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetPortalProductRequest",
}) as any as S.Schema<GetPortalProductRequest>;
export interface GetPortalProductResponse {
  Description?: string;
  DisplayName?: string;
  DisplayOrder?: DisplayOrder & {
    Contents: (Section & {
      ProductRestEndpointPageArns: __listOf__stringMin20Max2048;
      SectionName: string;
    })[];
  };
  LastModified?: Date;
  PortalProductArn?: string;
  PortalProductId?: string;
  Tags?: { [key: string]: string | undefined };
}
export const GetPortalProductResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Description: S.optional(S.String),
    DisplayName: S.optional(S.String),
    DisplayOrder: S.optional(DisplayOrder),
    LastModified: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    PortalProductArn: S.optional(S.String),
    PortalProductId: S.optional(S.String),
    Tags: S.optional(Tags),
  }).pipe(
    S.encodeKeys({
      Description: "description",
      DisplayName: "displayName",
      DisplayOrder: "displayOrder",
      LastModified: "lastModified",
      PortalProductArn: "portalProductArn",
      PortalProductId: "portalProductId",
      Tags: "tags",
    }),
  ),
).annotate({
  identifier: "GetPortalProductResponse",
}) as any as S.Schema<GetPortalProductResponse>;
export interface GetPortalProductSharingPolicyRequest {
  PortalProductId: string;
}
export const GetPortalProductSharingPolicyRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      PortalProductId: S.String.pipe(T.HttpLabel("PortalProductId")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/v2/portalproducts/{PortalProductId}/sharingpolicy",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetPortalProductSharingPolicyRequest",
}) as any as S.Schema<GetPortalProductSharingPolicyRequest>;
export type __stringMin1Max307200 = string;
export interface GetPortalProductSharingPolicyResponse {
  PolicyDocument?: string;
  PortalProductId?: string;
}
export const GetPortalProductSharingPolicyResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      PolicyDocument: S.optional(S.String),
      PortalProductId: S.optional(S.String),
    }).pipe(
      S.encodeKeys({
        PolicyDocument: "policyDocument",
        PortalProductId: "portalProductId",
      }),
    ),
).annotate({
  identifier: "GetPortalProductSharingPolicyResponse",
}) as any as S.Schema<GetPortalProductSharingPolicyResponse>;
export interface GetProductPageRequest {
  PortalProductId: string;
  ProductPageId: string;
  ResourceOwnerAccountId?: string;
}
export const GetProductPageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PortalProductId: S.String.pipe(T.HttpLabel("PortalProductId")),
    ProductPageId: S.String.pipe(T.HttpLabel("ProductPageId")),
    ResourceOwnerAccountId: S.optional(S.String).pipe(
      T.HttpQuery("resourceOwnerAccountId"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/portalproducts/{PortalProductId}/productpages/{ProductPageId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetProductPageRequest",
}) as any as S.Schema<GetProductPageRequest>;
export interface GetProductPageResponse {
  DisplayContent?: DisplayContent & {
    Body: __stringMin1Max32768;
    Title: __stringMin1Max255;
  };
  LastModified?: Date;
  ProductPageArn?: string;
  ProductPageId?: string;
}
export const GetProductPageResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DisplayContent: S.optional(DisplayContent),
    LastModified: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    ProductPageArn: S.optional(S.String),
    ProductPageId: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      DisplayContent: "displayContent",
      LastModified: "lastModified",
      ProductPageArn: "productPageArn",
      ProductPageId: "productPageId",
    }),
  ),
).annotate({
  identifier: "GetProductPageResponse",
}) as any as S.Schema<GetProductPageResponse>;
export interface GetProductRestEndpointPageRequest {
  IncludeRawDisplayContent?: string;
  PortalProductId: string;
  ProductRestEndpointPageId: string;
  ResourceOwnerAccountId?: string;
}
export const GetProductRestEndpointPageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IncludeRawDisplayContent: S.optional(S.String).pipe(
      T.HttpQuery("includeRawDisplayContent"),
    ),
    PortalProductId: S.String.pipe(T.HttpLabel("PortalProductId")),
    ProductRestEndpointPageId: S.String.pipe(
      T.HttpLabel("ProductRestEndpointPageId"),
    ),
    ResourceOwnerAccountId: S.optional(S.String).pipe(
      T.HttpQuery("resourceOwnerAccountId"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/portalproducts/{PortalProductId}/productrestendpointpages/{ProductRestEndpointPageId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetProductRestEndpointPageRequest",
}) as any as S.Schema<GetProductRestEndpointPageRequest>;
export interface GetProductRestEndpointPageResponse {
  DisplayContent?: EndpointDisplayContentResponse & {
    Endpoint: __stringMin1Max1024;
  };
  LastModified?: Date;
  ProductRestEndpointPageArn?: string;
  ProductRestEndpointPageId?: string;
  RawDisplayContent?: string;
  RestEndpointIdentifier?: RestEndpointIdentifier & {
    IdentifierParts: IdentifierParts & {
      Method: __stringMin1Max20;
      Path: __stringMin1Max4096;
      RestApiId: __stringMin1Max50;
      Stage: __stringMin1Max128;
    };
  };
  Status?: Status;
  StatusException?: StatusException;
  TryItState?: TryItState;
}
export const GetProductRestEndpointPageResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DisplayContent: S.optional(EndpointDisplayContentResponse),
    LastModified: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    ProductRestEndpointPageArn: S.optional(S.String),
    ProductRestEndpointPageId: S.optional(S.String),
    RawDisplayContent: S.optional(S.String),
    RestEndpointIdentifier: S.optional(RestEndpointIdentifier),
    Status: S.optional(Status),
    StatusException: S.optional(StatusException),
    TryItState: S.optional(TryItState),
  }).pipe(
    S.encodeKeys({
      DisplayContent: "displayContent",
      LastModified: "lastModified",
      ProductRestEndpointPageArn: "productRestEndpointPageArn",
      ProductRestEndpointPageId: "productRestEndpointPageId",
      RawDisplayContent: "rawDisplayContent",
      RestEndpointIdentifier: "restEndpointIdentifier",
      Status: "status",
      StatusException: "statusException",
      TryItState: "tryItState",
    }),
  ),
).annotate({
  identifier: "GetProductRestEndpointPageResponse",
}) as any as S.Schema<GetProductRestEndpointPageResponse>;
export interface GetRouteRequest {
  ApiId: string;
  RouteId: string;
}
export const GetRouteRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiId: S.String.pipe(T.HttpLabel("ApiId")),
    RouteId: S.String.pipe(T.HttpLabel("RouteId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2/apis/{ApiId}/routes/{RouteId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetRouteRequest",
}) as any as S.Schema<GetRouteRequest>;
export interface GetRouteResult {
  ApiGatewayManaged?: boolean;
  ApiKeyRequired?: boolean;
  AuthorizationScopes?: string[];
  AuthorizationType?: AuthorizationType;
  AuthorizerId?: string;
  ModelSelectionExpression?: string;
  OperationName?: string;
  RequestModels?: { [key: string]: string | undefined };
  RequestParameters?: { [key: string]: ParameterConstraints | undefined };
  RouteId?: string;
  RouteKey?: string;
  RouteResponseSelectionExpression?: string;
  Target?: string;
}
export const GetRouteResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiGatewayManaged: S.optional(S.Boolean),
    ApiKeyRequired: S.optional(S.Boolean),
    AuthorizationScopes: S.optional(AuthorizationScopes),
    AuthorizationType: S.optional(AuthorizationType),
    AuthorizerId: S.optional(S.String),
    ModelSelectionExpression: S.optional(S.String),
    OperationName: S.optional(S.String),
    RequestModels: S.optional(RouteModels),
    RequestParameters: S.optional(RouteParameters),
    RouteId: S.optional(S.String),
    RouteKey: S.optional(S.String),
    RouteResponseSelectionExpression: S.optional(S.String),
    Target: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      ApiGatewayManaged: "apiGatewayManaged",
      ApiKeyRequired: "apiKeyRequired",
      AuthorizationScopes: "authorizationScopes",
      AuthorizationType: "authorizationType",
      AuthorizerId: "authorizerId",
      ModelSelectionExpression: "modelSelectionExpression",
      OperationName: "operationName",
      RequestModels: "requestModels",
      RequestParameters: "requestParameters",
      RouteId: "routeId",
      RouteKey: "routeKey",
      RouteResponseSelectionExpression: "routeResponseSelectionExpression",
      Target: "target",
    }),
  ),
).annotate({ identifier: "GetRouteResult" }) as any as S.Schema<GetRouteResult>;
export interface GetRouteResponseRequest {
  ApiId: string;
  RouteId: string;
  RouteResponseId: string;
}
export const GetRouteResponseRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiId: S.String.pipe(T.HttpLabel("ApiId")),
    RouteId: S.String.pipe(T.HttpLabel("RouteId")),
    RouteResponseId: S.String.pipe(T.HttpLabel("RouteResponseId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/apis/{ApiId}/routes/{RouteId}/routeresponses/{RouteResponseId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetRouteResponseRequest",
}) as any as S.Schema<GetRouteResponseRequest>;
export interface GetRouteResponseResponse {
  ModelSelectionExpression?: string;
  ResponseModels?: { [key: string]: string | undefined };
  ResponseParameters?: { [key: string]: ParameterConstraints | undefined };
  RouteResponseId?: string;
  RouteResponseKey?: string;
}
export const GetRouteResponseResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ModelSelectionExpression: S.optional(S.String),
    ResponseModels: S.optional(RouteModels),
    ResponseParameters: S.optional(RouteParameters),
    RouteResponseId: S.optional(S.String),
    RouteResponseKey: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      ModelSelectionExpression: "modelSelectionExpression",
      ResponseModels: "responseModels",
      ResponseParameters: "responseParameters",
      RouteResponseId: "routeResponseId",
      RouteResponseKey: "routeResponseKey",
    }),
  ),
).annotate({
  identifier: "GetRouteResponseResponse",
}) as any as S.Schema<GetRouteResponseResponse>;
export interface GetRouteResponsesRequest {
  ApiId: string;
  MaxResults?: string;
  NextToken?: string;
  RouteId: string;
}
export const GetRouteResponsesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiId: S.String.pipe(T.HttpLabel("ApiId")),
    MaxResults: S.optional(S.String).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    RouteId: S.String.pipe(T.HttpLabel("RouteId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/apis/{ApiId}/routes/{RouteId}/routeresponses",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetRouteResponsesRequest",
}) as any as S.Schema<GetRouteResponsesRequest>;
export interface RouteResponse {
  ModelSelectionExpression?: string;
  ResponseModels?: { [key: string]: string | undefined };
  ResponseParameters?: { [key: string]: ParameterConstraints | undefined };
  RouteResponseId?: string;
  RouteResponseKey?: string;
}
export const RouteResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ModelSelectionExpression: S.optional(S.String),
    ResponseModels: S.optional(RouteModels),
    ResponseParameters: S.optional(RouteParameters),
    RouteResponseId: S.optional(S.String),
    RouteResponseKey: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      ModelSelectionExpression: "modelSelectionExpression",
      ResponseModels: "responseModels",
      ResponseParameters: "responseParameters",
      RouteResponseId: "routeResponseId",
      RouteResponseKey: "routeResponseKey",
    }),
  ),
).annotate({ identifier: "RouteResponse" }) as any as S.Schema<RouteResponse>;
export type __listOfRouteResponse = RouteResponse[];
export const __listOfRouteResponse = /*@__PURE__*/ S.Array(RouteResponse);
export interface GetRouteResponsesResponse {
  Items?: (RouteResponse & { RouteResponseKey: SelectionKey })[];
  NextToken?: string;
}
export const GetRouteResponsesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Items: S.optional(__listOfRouteResponse),
    NextToken: S.optional(S.String),
  }).pipe(S.encodeKeys({ Items: "items", NextToken: "nextToken" })),
).annotate({
  identifier: "GetRouteResponsesResponse",
}) as any as S.Schema<GetRouteResponsesResponse>;
export interface GetRoutesRequest {
  ApiId: string;
  MaxResults?: string;
  NextToken?: string;
}
export const GetRoutesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiId: S.String.pipe(T.HttpLabel("ApiId")),
    MaxResults: S.optional(S.String).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2/apis/{ApiId}/routes" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetRoutesRequest",
}) as any as S.Schema<GetRoutesRequest>;
export interface Route {
  ApiGatewayManaged?: boolean;
  ApiKeyRequired?: boolean;
  AuthorizationScopes?: string[];
  AuthorizationType?: AuthorizationType;
  AuthorizerId?: string;
  ModelSelectionExpression?: string;
  OperationName?: string;
  RequestModels?: { [key: string]: string | undefined };
  RequestParameters?: { [key: string]: ParameterConstraints | undefined };
  RouteId?: string;
  RouteKey?: string;
  RouteResponseSelectionExpression?: string;
  Target?: string;
}
export const Route = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiGatewayManaged: S.optional(S.Boolean),
    ApiKeyRequired: S.optional(S.Boolean),
    AuthorizationScopes: S.optional(AuthorizationScopes),
    AuthorizationType: S.optional(AuthorizationType),
    AuthorizerId: S.optional(S.String),
    ModelSelectionExpression: S.optional(S.String),
    OperationName: S.optional(S.String),
    RequestModels: S.optional(RouteModels),
    RequestParameters: S.optional(RouteParameters),
    RouteId: S.optional(S.String),
    RouteKey: S.optional(S.String),
    RouteResponseSelectionExpression: S.optional(S.String),
    Target: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      ApiGatewayManaged: "apiGatewayManaged",
      ApiKeyRequired: "apiKeyRequired",
      AuthorizationScopes: "authorizationScopes",
      AuthorizationType: "authorizationType",
      AuthorizerId: "authorizerId",
      ModelSelectionExpression: "modelSelectionExpression",
      OperationName: "operationName",
      RequestModels: "requestModels",
      RequestParameters: "requestParameters",
      RouteId: "routeId",
      RouteKey: "routeKey",
      RouteResponseSelectionExpression: "routeResponseSelectionExpression",
      Target: "target",
    }),
  ),
).annotate({ identifier: "Route" }) as any as S.Schema<Route>;
export type __listOfRoute = Route[];
export const __listOfRoute = /*@__PURE__*/ S.Array(Route);
export interface GetRoutesResponse {
  Items?: (Route & { RouteKey: SelectionKey })[];
  NextToken?: string;
}
export const GetRoutesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Items: S.optional(__listOfRoute),
    NextToken: S.optional(S.String),
  }).pipe(S.encodeKeys({ Items: "items", NextToken: "nextToken" })),
).annotate({
  identifier: "GetRoutesResponse",
}) as any as S.Schema<GetRoutesResponse>;
export interface GetRoutingRuleRequest {
  DomainName: string;
  DomainNameId?: string;
  RoutingRuleId: string;
}
export const GetRoutingRuleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainName: S.String.pipe(T.HttpLabel("DomainName")),
    DomainNameId: S.optional(S.String).pipe(T.HttpQuery("domainNameId")),
    RoutingRuleId: S.String.pipe(T.HttpLabel("RoutingRuleId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/domainnames/{DomainName}/routingrules/{RoutingRuleId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetRoutingRuleRequest",
}) as any as S.Schema<GetRoutingRuleRequest>;
export interface GetRoutingRuleResponse {
  Actions?: (RoutingRuleAction & {
    InvokeApi: RoutingRuleActionInvokeApi & {
      ApiId: Id;
      Stage: StringWithLengthBetween1And128;
    };
  })[];
  Conditions?: (RoutingRuleCondition & {
    MatchBasePaths: RoutingRuleMatchBasePaths & { AnyOf: __listOfSelectionKey };
    MatchHeaders: RoutingRuleMatchHeaders & {
      AnyOf: (RoutingRuleMatchHeaderValue & {
        Header: SelectionKey;
        ValueGlob: SelectionExpression;
      })[];
    };
  })[];
  Priority?: number;
  RoutingRuleArn?: string;
  RoutingRuleId?: string;
}
export const GetRoutingRuleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Actions: S.optional(__listOfRoutingRuleAction),
    Conditions: S.optional(__listOfRoutingRuleCondition),
    Priority: S.optional(S.Number),
    RoutingRuleArn: S.optional(S.String),
    RoutingRuleId: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      Actions: "actions",
      Conditions: "conditions",
      Priority: "priority",
      RoutingRuleArn: "routingRuleArn",
      RoutingRuleId: "routingRuleId",
    }),
  ),
).annotate({
  identifier: "GetRoutingRuleResponse",
}) as any as S.Schema<GetRoutingRuleResponse>;
export interface GetStageRequest {
  ApiId: string;
  StageName: string;
}
export const GetStageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiId: S.String.pipe(T.HttpLabel("ApiId")),
    StageName: S.String.pipe(T.HttpLabel("StageName")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2/apis/{ApiId}/stages/{StageName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetStageRequest",
}) as any as S.Schema<GetStageRequest>;
export interface GetStageResponse {
  AccessLogSettings?: AccessLogSettings;
  ApiGatewayManaged?: boolean;
  AutoDeploy?: boolean;
  ClientCertificateId?: string;
  CreatedDate?: Date;
  DefaultRouteSettings?: RouteSettings;
  DeploymentId?: string;
  Description?: string;
  LastDeploymentStatusMessage?: string;
  LastUpdatedDate?: Date;
  RouteSettings?: { [key: string]: RouteSettings | undefined };
  StageName?: string;
  StageVariables?: { [key: string]: string | undefined };
  Tags?: { [key: string]: string | undefined };
}
export const GetStageResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccessLogSettings: S.optional(AccessLogSettings),
    ApiGatewayManaged: S.optional(S.Boolean),
    AutoDeploy: S.optional(S.Boolean),
    ClientCertificateId: S.optional(S.String),
    CreatedDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    DefaultRouteSettings: S.optional(RouteSettings),
    DeploymentId: S.optional(S.String),
    Description: S.optional(S.String),
    LastDeploymentStatusMessage: S.optional(S.String),
    LastUpdatedDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    RouteSettings: S.optional(RouteSettingsMap),
    StageName: S.optional(S.String),
    StageVariables: S.optional(StageVariablesMap),
    Tags: S.optional(Tags),
  }).pipe(
    S.encodeKeys({
      AccessLogSettings: "accessLogSettings",
      ApiGatewayManaged: "apiGatewayManaged",
      AutoDeploy: "autoDeploy",
      ClientCertificateId: "clientCertificateId",
      CreatedDate: "createdDate",
      DefaultRouteSettings: "defaultRouteSettings",
      DeploymentId: "deploymentId",
      Description: "description",
      LastDeploymentStatusMessage: "lastDeploymentStatusMessage",
      LastUpdatedDate: "lastUpdatedDate",
      RouteSettings: "routeSettings",
      StageName: "stageName",
      StageVariables: "stageVariables",
      Tags: "tags",
    }),
  ),
).annotate({
  identifier: "GetStageResponse",
}) as any as S.Schema<GetStageResponse>;
export interface GetStagesRequest {
  ApiId: string;
  MaxResults?: string;
  NextToken?: string;
}
export const GetStagesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiId: S.String.pipe(T.HttpLabel("ApiId")),
    MaxResults: S.optional(S.String).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2/apis/{ApiId}/stages" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetStagesRequest",
}) as any as S.Schema<GetStagesRequest>;
export interface Stage {
  AccessLogSettings?: AccessLogSettings;
  ApiGatewayManaged?: boolean;
  AutoDeploy?: boolean;
  ClientCertificateId?: string;
  CreatedDate?: Date;
  DefaultRouteSettings?: RouteSettings;
  DeploymentId?: string;
  Description?: string;
  LastDeploymentStatusMessage?: string;
  LastUpdatedDate?: Date;
  RouteSettings?: { [key: string]: RouteSettings | undefined };
  StageName?: string;
  StageVariables?: { [key: string]: string | undefined };
  Tags?: { [key: string]: string | undefined };
}
export const Stage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccessLogSettings: S.optional(AccessLogSettings),
    ApiGatewayManaged: S.optional(S.Boolean),
    AutoDeploy: S.optional(S.Boolean),
    ClientCertificateId: S.optional(S.String),
    CreatedDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    DefaultRouteSettings: S.optional(RouteSettings),
    DeploymentId: S.optional(S.String),
    Description: S.optional(S.String),
    LastDeploymentStatusMessage: S.optional(S.String),
    LastUpdatedDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    RouteSettings: S.optional(RouteSettingsMap),
    StageName: S.optional(S.String),
    StageVariables: S.optional(StageVariablesMap),
    Tags: S.optional(Tags),
  }).pipe(
    S.encodeKeys({
      AccessLogSettings: "accessLogSettings",
      ApiGatewayManaged: "apiGatewayManaged",
      AutoDeploy: "autoDeploy",
      ClientCertificateId: "clientCertificateId",
      CreatedDate: "createdDate",
      DefaultRouteSettings: "defaultRouteSettings",
      DeploymentId: "deploymentId",
      Description: "description",
      LastDeploymentStatusMessage: "lastDeploymentStatusMessage",
      LastUpdatedDate: "lastUpdatedDate",
      RouteSettings: "routeSettings",
      StageName: "stageName",
      StageVariables: "stageVariables",
      Tags: "tags",
    }),
  ),
).annotate({ identifier: "Stage" }) as any as S.Schema<Stage>;
export type __listOfStage = Stage[];
export const __listOfStage = /*@__PURE__*/ S.Array(Stage);
export interface GetStagesResponse {
  Items?: (Stage & { StageName: StringWithLengthBetween1And128 })[];
  NextToken?: string;
}
export const GetStagesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Items: S.optional(__listOfStage),
    NextToken: S.optional(S.String),
  }).pipe(S.encodeKeys({ Items: "items", NextToken: "nextToken" })),
).annotate({
  identifier: "GetStagesResponse",
}) as any as S.Schema<GetStagesResponse>;
export interface GetTagsRequest {
  ResourceArn: string;
}
export const GetTagsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2/tags/{ResourceArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetTagsRequest" }) as any as S.Schema<GetTagsRequest>;
export interface GetTagsResponse {
  Tags?: { [key: string]: string | undefined };
}
export const GetTagsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tags: S.optional(Tags) }).pipe(S.encodeKeys({ Tags: "tags" })),
).annotate({
  identifier: "GetTagsResponse",
}) as any as S.Schema<GetTagsResponse>;
export interface GetVpcLinkRequest {
  VpcLinkId: string;
}
export const GetVpcLinkRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ VpcLinkId: S.String.pipe(T.HttpLabel("VpcLinkId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2/vpclinks/{VpcLinkId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetVpcLinkRequest",
}) as any as S.Schema<GetVpcLinkRequest>;
export interface GetVpcLinkResponse {
  CreatedDate?: Date;
  Name?: string;
  SecurityGroupIds?: string[];
  SubnetIds?: string[];
  Tags?: { [key: string]: string | undefined };
  VpcLinkId?: string;
  VpcLinkStatus?: VpcLinkStatus;
  VpcLinkStatusMessage?: string;
  VpcLinkVersion?: VpcLinkVersion;
}
export const GetVpcLinkResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CreatedDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Name: S.optional(S.String),
    SecurityGroupIds: S.optional(SecurityGroupIdList),
    SubnetIds: S.optional(SubnetIdList),
    Tags: S.optional(Tags),
    VpcLinkId: S.optional(S.String),
    VpcLinkStatus: S.optional(VpcLinkStatus),
    VpcLinkStatusMessage: S.optional(S.String),
    VpcLinkVersion: S.optional(VpcLinkVersion),
  }).pipe(
    S.encodeKeys({
      CreatedDate: "createdDate",
      Name: "name",
      SecurityGroupIds: "securityGroupIds",
      SubnetIds: "subnetIds",
      Tags: "tags",
      VpcLinkId: "vpcLinkId",
      VpcLinkStatus: "vpcLinkStatus",
      VpcLinkStatusMessage: "vpcLinkStatusMessage",
      VpcLinkVersion: "vpcLinkVersion",
    }),
  ),
).annotate({
  identifier: "GetVpcLinkResponse",
}) as any as S.Schema<GetVpcLinkResponse>;
export interface GetVpcLinksRequest {
  MaxResults?: string;
  NextToken?: string;
}
export const GetVpcLinksRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.String).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2/vpclinks" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetVpcLinksRequest",
}) as any as S.Schema<GetVpcLinksRequest>;
export interface VpcLink {
  CreatedDate?: Date;
  Name?: string;
  SecurityGroupIds?: string[];
  SubnetIds?: string[];
  Tags?: { [key: string]: string | undefined };
  VpcLinkId?: string;
  VpcLinkStatus?: VpcLinkStatus;
  VpcLinkStatusMessage?: string;
  VpcLinkVersion?: VpcLinkVersion;
}
export const VpcLink = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CreatedDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Name: S.optional(S.String),
    SecurityGroupIds: S.optional(SecurityGroupIdList),
    SubnetIds: S.optional(SubnetIdList),
    Tags: S.optional(Tags),
    VpcLinkId: S.optional(S.String),
    VpcLinkStatus: S.optional(VpcLinkStatus),
    VpcLinkStatusMessage: S.optional(S.String),
    VpcLinkVersion: S.optional(VpcLinkVersion),
  }).pipe(
    S.encodeKeys({
      CreatedDate: "createdDate",
      Name: "name",
      SecurityGroupIds: "securityGroupIds",
      SubnetIds: "subnetIds",
      Tags: "tags",
      VpcLinkId: "vpcLinkId",
      VpcLinkStatus: "vpcLinkStatus",
      VpcLinkStatusMessage: "vpcLinkStatusMessage",
      VpcLinkVersion: "vpcLinkVersion",
    }),
  ),
).annotate({ identifier: "VpcLink" }) as any as S.Schema<VpcLink>;
export type __listOfVpcLink = VpcLink[];
export const __listOfVpcLink = /*@__PURE__*/ S.Array(VpcLink);
export interface GetVpcLinksResponse {
  Items?: (VpcLink & {
    Name: StringWithLengthBetween1And128;
    SecurityGroupIds: SecurityGroupIdList;
    SubnetIds: SubnetIdList;
    VpcLinkId: Id;
  })[];
  NextToken?: string;
}
export const GetVpcLinksResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Items: S.optional(__listOfVpcLink),
    NextToken: S.optional(S.String),
  }).pipe(S.encodeKeys({ Items: "items", NextToken: "nextToken" })),
).annotate({
  identifier: "GetVpcLinksResponse",
}) as any as S.Schema<GetVpcLinksResponse>;
export interface ImportApiRequest {
  Basepath?: string;
  Body?: string;
  FailOnWarnings?: boolean;
}
export const ImportApiRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Basepath: S.optional(S.String).pipe(T.HttpQuery("basepath")),
    Body: S.optional(S.String),
    FailOnWarnings: S.optional(S.Boolean).pipe(T.HttpQuery("failOnWarnings")),
  })
    .pipe(S.encodeKeys({ Body: "body" }))
    .pipe(
      T.all(
        T.Http({ method: "PUT", uri: "/v2/apis" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ImportApiRequest",
}) as any as S.Schema<ImportApiRequest>;
export interface ImportApiResponse {
  ApiEndpoint?: string;
  ApiGatewayManaged?: boolean;
  ApiId?: string;
  ApiKeySelectionExpression?: string;
  CorsConfiguration?: Cors;
  CreatedDate?: Date;
  Description?: string;
  DisableSchemaValidation?: boolean;
  DisableExecuteApiEndpoint?: boolean;
  ImportInfo?: string[];
  IpAddressType?: IpAddressType;
  Name?: string;
  ProtocolType?: ProtocolType;
  RouteSelectionExpression?: string;
  Tags?: { [key: string]: string | undefined };
  Version?: string;
  Warnings?: string[];
}
export const ImportApiResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiEndpoint: S.optional(S.String),
    ApiGatewayManaged: S.optional(S.Boolean),
    ApiId: S.optional(S.String),
    ApiKeySelectionExpression: S.optional(S.String),
    CorsConfiguration: S.optional(Cors),
    CreatedDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Description: S.optional(S.String),
    DisableSchemaValidation: S.optional(S.Boolean),
    DisableExecuteApiEndpoint: S.optional(S.Boolean),
    ImportInfo: S.optional(__listOf__string),
    IpAddressType: S.optional(IpAddressType),
    Name: S.optional(S.String),
    ProtocolType: S.optional(ProtocolType),
    RouteSelectionExpression: S.optional(S.String),
    Tags: S.optional(Tags),
    Version: S.optional(S.String),
    Warnings: S.optional(__listOf__string),
  }).pipe(
    S.encodeKeys({
      ApiEndpoint: "apiEndpoint",
      ApiGatewayManaged: "apiGatewayManaged",
      ApiId: "apiId",
      ApiKeySelectionExpression: "apiKeySelectionExpression",
      CorsConfiguration: "corsConfiguration",
      CreatedDate: "createdDate",
      Description: "description",
      DisableSchemaValidation: "disableSchemaValidation",
      DisableExecuteApiEndpoint: "disableExecuteApiEndpoint",
      ImportInfo: "importInfo",
      IpAddressType: "ipAddressType",
      Name: "name",
      ProtocolType: "protocolType",
      RouteSelectionExpression: "routeSelectionExpression",
      Tags: "tags",
      Version: "version",
      Warnings: "warnings",
    }),
  ),
).annotate({
  identifier: "ImportApiResponse",
}) as any as S.Schema<ImportApiResponse>;
export interface ListPortalProductsRequest {
  MaxResults?: string;
  NextToken?: string;
  ResourceOwner?: string;
}
export const ListPortalProductsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.String).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    ResourceOwner: S.optional(S.String).pipe(T.HttpQuery("resourceOwner")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2/portalproducts" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPortalProductsRequest",
}) as any as S.Schema<ListPortalProductsRequest>;
export interface PortalProductSummary {
  Description?: string;
  DisplayName?: string;
  LastModified?: Date;
  PortalProductArn?: string;
  PortalProductId?: string;
  Tags?: { [key: string]: string | undefined };
}
export const PortalProductSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Description: S.optional(S.String),
    DisplayName: S.optional(S.String),
    LastModified: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    PortalProductArn: S.optional(S.String),
    PortalProductId: S.optional(S.String),
    Tags: S.optional(Tags),
  }).pipe(
    S.encodeKeys({
      Description: "description",
      DisplayName: "displayName",
      LastModified: "lastModified",
      PortalProductArn: "portalProductArn",
      PortalProductId: "portalProductId",
      Tags: "tags",
    }),
  ),
).annotate({
  identifier: "PortalProductSummary",
}) as any as S.Schema<PortalProductSummary>;
export type __listOfPortalProductSummary = PortalProductSummary[];
export const __listOfPortalProductSummary =
  /*@__PURE__*/ S.Array(PortalProductSummary);
export interface ListPortalProductsResponse {
  Items?: (PortalProductSummary & {
    Description: __stringMin0Max1024;
    DisplayName: __stringMin1Max255;
    LastModified: __timestampIso8601;
    PortalProductArn: __stringMin20Max2048;
    PortalProductId: __stringMin10Max30PatternAZ09;
  })[];
  NextToken?: string;
}
export const ListPortalProductsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Items: S.optional(__listOfPortalProductSummary),
    NextToken: S.optional(S.String),
  }).pipe(S.encodeKeys({ Items: "items", NextToken: "nextToken" })),
).annotate({
  identifier: "ListPortalProductsResponse",
}) as any as S.Schema<ListPortalProductsResponse>;
export interface ListPortalsRequest {
  MaxResults?: string;
  NextToken?: string;
}
export const ListPortalsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.String).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2/portals" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPortalsRequest",
}) as any as S.Schema<ListPortalsRequest>;
export interface PortalSummary {
  Authorization?: Authorization;
  EndpointConfiguration?: EndpointConfigurationResponse;
  IncludedPortalProductArns?: string[];
  LastModified?: Date;
  LastPublished?: Date;
  LastPublishedDescription?: string;
  PortalArn?: string;
  PortalContent?: PortalContent;
  PortalId?: string;
  Preview?: Preview;
  PublishStatus?: PublishStatus;
  RumAppMonitorName?: string;
  StatusException?: StatusException;
  Tags?: { [key: string]: string | undefined };
}
export const PortalSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Authorization: S.optional(Authorization),
    EndpointConfiguration: S.optional(EndpointConfigurationResponse),
    IncludedPortalProductArns: S.optional(__listOf__stringMin20Max2048),
    LastModified: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    LastPublished: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    LastPublishedDescription: S.optional(S.String),
    PortalArn: S.optional(S.String),
    PortalContent: S.optional(PortalContent),
    PortalId: S.optional(S.String),
    Preview: S.optional(Preview),
    PublishStatus: S.optional(PublishStatus),
    RumAppMonitorName: S.optional(S.String),
    StatusException: S.optional(StatusException),
    Tags: S.optional(Tags),
  }).pipe(
    S.encodeKeys({
      Authorization: "authorization",
      EndpointConfiguration: "endpointConfiguration",
      IncludedPortalProductArns: "includedPortalProductArns",
      LastModified: "lastModified",
      LastPublished: "lastPublished",
      LastPublishedDescription: "lastPublishedDescription",
      PortalArn: "portalArn",
      PortalContent: "portalContent",
      PortalId: "portalId",
      Preview: "preview",
      PublishStatus: "publishStatus",
      RumAppMonitorName: "rumAppMonitorName",
      StatusException: "statusException",
      Tags: "tags",
    }),
  ),
).annotate({ identifier: "PortalSummary" }) as any as S.Schema<PortalSummary>;
export type __listOfPortalSummary = PortalSummary[];
export const __listOfPortalSummary = /*@__PURE__*/ S.Array(PortalSummary);
export interface ListPortalsResponse {
  Items?: (PortalSummary & {
    Authorization: Authorization & {
      CognitoConfig: CognitoConfig & {
        AppClientId: __stringMin1Max256;
        UserPoolArn: __stringMin20Max2048;
        UserPoolDomain: __stringMin20Max2048;
      };
    };
    EndpointConfiguration: EndpointConfigurationResponse & {
      PortalDefaultDomainName: __stringMin3Max256;
      PortalDomainHostedZoneId: __stringMin1Max64;
    };
    IncludedPortalProductArns: __listOf__stringMin20Max2048;
    LastModified: __timestampIso8601;
    PortalArn: __stringMin20Max2048;
    PortalContent: PortalContent & {
      DisplayName: __stringMin3Max255;
      Theme: PortalTheme & {
        CustomColors: CustomColors & {
          AccentColor: __stringMin1Max16;
          BackgroundColor: __stringMin1Max16;
          ErrorValidationColor: __stringMin1Max16;
          HeaderColor: __stringMin1Max16;
          NavigationColor: __stringMin1Max16;
          TextColor: __stringMin1Max16;
        };
      };
    };
    PortalId: __stringMin10Max30PatternAZ09;
    Preview: Preview & { PreviewStatus: PreviewStatus };
  })[];
  NextToken?: string;
}
export const ListPortalsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Items: S.optional(__listOfPortalSummary),
    NextToken: S.optional(S.String),
  }).pipe(S.encodeKeys({ Items: "items", NextToken: "nextToken" })),
).annotate({
  identifier: "ListPortalsResponse",
}) as any as S.Schema<ListPortalsResponse>;
export interface ListProductPagesRequest {
  MaxResults?: string;
  NextToken?: string;
  PortalProductId: string;
  ResourceOwnerAccountId?: string;
}
export const ListProductPagesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.String).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    PortalProductId: S.String.pipe(T.HttpLabel("PortalProductId")),
    ResourceOwnerAccountId: S.optional(S.String).pipe(
      T.HttpQuery("resourceOwnerAccountId"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/portalproducts/{PortalProductId}/productpages",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListProductPagesRequest",
}) as any as S.Schema<ListProductPagesRequest>;
export interface ProductPageSummaryNoBody {
  LastModified?: Date;
  PageTitle?: string;
  ProductPageArn?: string;
  ProductPageId?: string;
}
export const ProductPageSummaryNoBody = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LastModified: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    PageTitle: S.optional(S.String),
    ProductPageArn: S.optional(S.String),
    ProductPageId: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      LastModified: "lastModified",
      PageTitle: "pageTitle",
      ProductPageArn: "productPageArn",
      ProductPageId: "productPageId",
    }),
  ),
).annotate({
  identifier: "ProductPageSummaryNoBody",
}) as any as S.Schema<ProductPageSummaryNoBody>;
export type __listOfProductPageSummaryNoBody = ProductPageSummaryNoBody[];
export const __listOfProductPageSummaryNoBody = /*@__PURE__*/ S.Array(
  ProductPageSummaryNoBody,
);
export interface ListProductPagesResponse {
  Items?: (ProductPageSummaryNoBody & {
    LastModified: __timestampIso8601;
    PageTitle: __stringMin1Max255;
    ProductPageArn: __stringMin20Max2048;
    ProductPageId: __stringMin10Max30PatternAZ09;
  })[];
  NextToken?: string;
}
export const ListProductPagesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Items: S.optional(__listOfProductPageSummaryNoBody),
    NextToken: S.optional(S.String),
  }).pipe(S.encodeKeys({ Items: "items", NextToken: "nextToken" })),
).annotate({
  identifier: "ListProductPagesResponse",
}) as any as S.Schema<ListProductPagesResponse>;
export interface ListProductRestEndpointPagesRequest {
  MaxResults?: string;
  NextToken?: string;
  PortalProductId: string;
  ResourceOwnerAccountId?: string;
}
export const ListProductRestEndpointPagesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.String).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    PortalProductId: S.String.pipe(T.HttpLabel("PortalProductId")),
    ResourceOwnerAccountId: S.optional(S.String).pipe(
      T.HttpQuery("resourceOwnerAccountId"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/portalproducts/{PortalProductId}/productrestendpointpages",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListProductRestEndpointPagesRequest",
}) as any as S.Schema<ListProductRestEndpointPagesRequest>;
export interface ProductRestEndpointPageSummaryNoBody {
  Endpoint?: string;
  LastModified?: Date;
  OperationName?: string;
  ProductRestEndpointPageArn?: string;
  ProductRestEndpointPageId?: string;
  RestEndpointIdentifier?: RestEndpointIdentifier;
  Status?: Status;
  StatusException?: StatusException;
  TryItState?: TryItState;
}
export const ProductRestEndpointPageSummaryNoBody = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Endpoint: S.optional(S.String),
      LastModified: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
      OperationName: S.optional(S.String),
      ProductRestEndpointPageArn: S.optional(S.String),
      ProductRestEndpointPageId: S.optional(S.String),
      RestEndpointIdentifier: S.optional(RestEndpointIdentifier),
      Status: S.optional(Status),
      StatusException: S.optional(StatusException),
      TryItState: S.optional(TryItState),
    }).pipe(
      S.encodeKeys({
        Endpoint: "endpoint",
        LastModified: "lastModified",
        OperationName: "operationName",
        ProductRestEndpointPageArn: "productRestEndpointPageArn",
        ProductRestEndpointPageId: "productRestEndpointPageId",
        RestEndpointIdentifier: "restEndpointIdentifier",
        Status: "status",
        StatusException: "statusException",
        TryItState: "tryItState",
      }),
    ),
).annotate({
  identifier: "ProductRestEndpointPageSummaryNoBody",
}) as any as S.Schema<ProductRestEndpointPageSummaryNoBody>;
export type __listOfProductRestEndpointPageSummaryNoBody =
  ProductRestEndpointPageSummaryNoBody[];
export const __listOfProductRestEndpointPageSummaryNoBody =
  /*@__PURE__*/ S.Array(ProductRestEndpointPageSummaryNoBody);
export interface ListProductRestEndpointPagesResponse {
  Items?: (ProductRestEndpointPageSummaryNoBody & {
    Endpoint: __stringMin1Max1024;
    LastModified: __timestampIso8601;
    ProductRestEndpointPageArn: __stringMin20Max2048;
    ProductRestEndpointPageId: __stringMin10Max30PatternAZ09;
    RestEndpointIdentifier: RestEndpointIdentifier & {
      IdentifierParts: IdentifierParts & {
        Method: __stringMin1Max20;
        Path: __stringMin1Max4096;
        RestApiId: __stringMin1Max50;
        Stage: __stringMin1Max128;
      };
    };
    Status: Status;
    TryItState: TryItState;
  })[];
  NextToken?: string;
}
export const ListProductRestEndpointPagesResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Items: S.optional(__listOfProductRestEndpointPageSummaryNoBody),
      NextToken: S.optional(S.String),
    }).pipe(S.encodeKeys({ Items: "items", NextToken: "nextToken" })),
).annotate({
  identifier: "ListProductRestEndpointPagesResponse",
}) as any as S.Schema<ListProductRestEndpointPagesResponse>;
export type MaxResults = number;
export interface ListRoutingRulesRequest {
  DomainName: string;
  DomainNameId?: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListRoutingRulesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainName: S.String.pipe(T.HttpLabel("DomainName")),
    DomainNameId: S.optional(S.String).pipe(T.HttpQuery("domainNameId")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/domainnames/{DomainName}/routingrules",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListRoutingRulesRequest",
}) as any as S.Schema<ListRoutingRulesRequest>;
export interface RoutingRule {
  Actions?: RoutingRuleAction[];
  Conditions?: RoutingRuleCondition[];
  Priority?: number;
  RoutingRuleArn?: string;
  RoutingRuleId?: string;
}
export const RoutingRule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Actions: S.optional(__listOfRoutingRuleAction),
    Conditions: S.optional(__listOfRoutingRuleCondition),
    Priority: S.optional(S.Number),
    RoutingRuleArn: S.optional(S.String),
    RoutingRuleId: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      Actions: "actions",
      Conditions: "conditions",
      Priority: "priority",
      RoutingRuleArn: "routingRuleArn",
      RoutingRuleId: "routingRuleId",
    }),
  ),
).annotate({ identifier: "RoutingRule" }) as any as S.Schema<RoutingRule>;
export type __listOfRoutingRule = RoutingRule[];
export const __listOfRoutingRule = /*@__PURE__*/ S.Array(RoutingRule);
export interface ListRoutingRulesResponse {
  NextToken?: string;
  RoutingRules?: (RoutingRule & {
    Actions: (RoutingRuleAction & {
      InvokeApi: RoutingRuleActionInvokeApi & {
        ApiId: Id;
        Stage: StringWithLengthBetween1And128;
      };
    })[];
    Conditions: (RoutingRuleCondition & {
      MatchBasePaths: RoutingRuleMatchBasePaths & {
        AnyOf: __listOfSelectionKey;
      };
      MatchHeaders: RoutingRuleMatchHeaders & {
        AnyOf: (RoutingRuleMatchHeaderValue & {
          Header: SelectionKey;
          ValueGlob: SelectionExpression;
        })[];
      };
    })[];
  })[];
}
export const ListRoutingRulesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    RoutingRules: S.optional(__listOfRoutingRule),
  }).pipe(
    S.encodeKeys({ NextToken: "nextToken", RoutingRules: "routingRules" }),
  ),
).annotate({
  identifier: "ListRoutingRulesResponse",
}) as any as S.Schema<ListRoutingRulesResponse>;
export interface PreviewPortalRequest {
  PortalId: string;
}
export const PreviewPortalRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PortalId: S.String.pipe(T.HttpLabel("PortalId")) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2/portals/{PortalId}/preview" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PreviewPortalRequest",
}) as any as S.Schema<PreviewPortalRequest>;
export interface PreviewPortalResponse {}
export const PreviewPortalResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "PreviewPortalResponse",
}) as any as S.Schema<PreviewPortalResponse>;
export interface PublishPortalRequest {
  Description?: string;
  PortalId: string;
}
export const PublishPortalRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Description: S.optional(S.String),
    PortalId: S.String.pipe(T.HttpLabel("PortalId")),
  })
    .pipe(S.encodeKeys({ Description: "description" }))
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/v2/portals/{PortalId}/publish" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "PublishPortalRequest",
}) as any as S.Schema<PublishPortalRequest>;
export interface PublishPortalResponse {}
export const PublishPortalResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "PublishPortalResponse",
}) as any as S.Schema<PublishPortalResponse>;
export interface PutPortalProductSharingPolicyRequest {
  PolicyDocument?: string;
  PortalProductId: string;
}
export const PutPortalProductSharingPolicyRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      PolicyDocument: S.optional(S.String),
      PortalProductId: S.String.pipe(T.HttpLabel("PortalProductId")),
    })
      .pipe(S.encodeKeys({ PolicyDocument: "policyDocument" }))
      .pipe(
        T.all(
          T.Http({
            method: "PUT",
            uri: "/v2/portalproducts/{PortalProductId}/sharingpolicy",
          }),
          svc,
          auth,
          proto,
          ver,
          rules,
        ),
      ),
).annotate({
  identifier: "PutPortalProductSharingPolicyRequest",
}) as any as S.Schema<PutPortalProductSharingPolicyRequest>;
export interface PutPortalProductSharingPolicyResponse {}
export const PutPortalProductSharingPolicyResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "PutPortalProductSharingPolicyResponse",
}) as any as S.Schema<PutPortalProductSharingPolicyResponse>;
export interface PutRoutingRuleRequest {
  Actions?: RoutingRuleAction[];
  Conditions?: RoutingRuleCondition[];
  DomainName: string;
  DomainNameId?: string;
  Priority?: number;
  RoutingRuleId: string;
}
export const PutRoutingRuleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Actions: S.optional(__listOfRoutingRuleAction),
    Conditions: S.optional(__listOfRoutingRuleCondition),
    DomainName: S.String.pipe(T.HttpLabel("DomainName")),
    DomainNameId: S.optional(S.String).pipe(T.HttpQuery("domainNameId")),
    Priority: S.optional(S.Number),
    RoutingRuleId: S.String.pipe(T.HttpLabel("RoutingRuleId")),
  })
    .pipe(
      S.encodeKeys({
        Actions: "actions",
        Conditions: "conditions",
        Priority: "priority",
      }),
    )
    .pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/v2/domainnames/{DomainName}/routingrules/{RoutingRuleId}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "PutRoutingRuleRequest",
}) as any as S.Schema<PutRoutingRuleRequest>;
export interface PutRoutingRuleResponse {
  Actions?: (RoutingRuleAction & {
    InvokeApi: RoutingRuleActionInvokeApi & {
      ApiId: Id;
      Stage: StringWithLengthBetween1And128;
    };
  })[];
  Conditions?: (RoutingRuleCondition & {
    MatchBasePaths: RoutingRuleMatchBasePaths & { AnyOf: __listOfSelectionKey };
    MatchHeaders: RoutingRuleMatchHeaders & {
      AnyOf: (RoutingRuleMatchHeaderValue & {
        Header: SelectionKey;
        ValueGlob: SelectionExpression;
      })[];
    };
  })[];
  Priority?: number;
  RoutingRuleArn?: string;
  RoutingRuleId?: string;
}
export const PutRoutingRuleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Actions: S.optional(__listOfRoutingRuleAction),
    Conditions: S.optional(__listOfRoutingRuleCondition),
    Priority: S.optional(S.Number),
    RoutingRuleArn: S.optional(S.String),
    RoutingRuleId: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      Actions: "actions",
      Conditions: "conditions",
      Priority: "priority",
      RoutingRuleArn: "routingRuleArn",
      RoutingRuleId: "routingRuleId",
    }),
  ),
).annotate({
  identifier: "PutRoutingRuleResponse",
}) as any as S.Schema<PutRoutingRuleResponse>;
export interface ReimportApiRequest {
  ApiId: string;
  Basepath?: string;
  Body?: string;
  FailOnWarnings?: boolean;
}
export const ReimportApiRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiId: S.String.pipe(T.HttpLabel("ApiId")),
    Basepath: S.optional(S.String).pipe(T.HttpQuery("basepath")),
    Body: S.optional(S.String),
    FailOnWarnings: S.optional(S.Boolean).pipe(T.HttpQuery("failOnWarnings")),
  })
    .pipe(S.encodeKeys({ Body: "body" }))
    .pipe(
      T.all(
        T.Http({ method: "PUT", uri: "/v2/apis/{ApiId}" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ReimportApiRequest",
}) as any as S.Schema<ReimportApiRequest>;
export interface ReimportApiResponse {
  ApiEndpoint?: string;
  ApiGatewayManaged?: boolean;
  ApiId?: string;
  ApiKeySelectionExpression?: string;
  CorsConfiguration?: Cors;
  CreatedDate?: Date;
  Description?: string;
  DisableSchemaValidation?: boolean;
  DisableExecuteApiEndpoint?: boolean;
  ImportInfo?: string[];
  IpAddressType?: IpAddressType;
  Name?: string;
  ProtocolType?: ProtocolType;
  RouteSelectionExpression?: string;
  Tags?: { [key: string]: string | undefined };
  Version?: string;
  Warnings?: string[];
}
export const ReimportApiResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiEndpoint: S.optional(S.String),
    ApiGatewayManaged: S.optional(S.Boolean),
    ApiId: S.optional(S.String),
    ApiKeySelectionExpression: S.optional(S.String),
    CorsConfiguration: S.optional(Cors),
    CreatedDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Description: S.optional(S.String),
    DisableSchemaValidation: S.optional(S.Boolean),
    DisableExecuteApiEndpoint: S.optional(S.Boolean),
    ImportInfo: S.optional(__listOf__string),
    IpAddressType: S.optional(IpAddressType),
    Name: S.optional(S.String),
    ProtocolType: S.optional(ProtocolType),
    RouteSelectionExpression: S.optional(S.String),
    Tags: S.optional(Tags),
    Version: S.optional(S.String),
    Warnings: S.optional(__listOf__string),
  }).pipe(
    S.encodeKeys({
      ApiEndpoint: "apiEndpoint",
      ApiGatewayManaged: "apiGatewayManaged",
      ApiId: "apiId",
      ApiKeySelectionExpression: "apiKeySelectionExpression",
      CorsConfiguration: "corsConfiguration",
      CreatedDate: "createdDate",
      Description: "description",
      DisableSchemaValidation: "disableSchemaValidation",
      DisableExecuteApiEndpoint: "disableExecuteApiEndpoint",
      ImportInfo: "importInfo",
      IpAddressType: "ipAddressType",
      Name: "name",
      ProtocolType: "protocolType",
      RouteSelectionExpression: "routeSelectionExpression",
      Tags: "tags",
      Version: "version",
      Warnings: "warnings",
    }),
  ),
).annotate({
  identifier: "ReimportApiResponse",
}) as any as S.Schema<ReimportApiResponse>;
export interface ResetAuthorizersCacheRequest {
  ApiId: string;
  StageName: string;
}
export const ResetAuthorizersCacheRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiId: S.String.pipe(T.HttpLabel("ApiId")),
    StageName: S.String.pipe(T.HttpLabel("StageName")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v2/apis/{ApiId}/stages/{StageName}/cache/authorizers",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ResetAuthorizersCacheRequest",
}) as any as S.Schema<ResetAuthorizersCacheRequest>;
export interface ResetAuthorizersCacheResponse {}
export const ResetAuthorizersCacheResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "ResetAuthorizersCacheResponse",
}) as any as S.Schema<ResetAuthorizersCacheResponse>;
export interface TagResourceRequest {
  ResourceArn: string;
  Tags?: { [key: string]: string | undefined };
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    Tags: S.optional(Tags),
  })
    .pipe(S.encodeKeys({ Tags: "tags" }))
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/v2/tags/{ResourceArn}" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "TagResourceRequest",
}) as any as S.Schema<TagResourceRequest>;
export interface TagResourceResponse {}
export const TagResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "TagResourceResponse",
}) as any as S.Schema<TagResourceResponse>;
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys?: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    TagKeys: S.optional(__listOf__string).pipe(T.HttpQuery("tagKeys")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/v2/tags/{ResourceArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UntagResourceRequest",
}) as any as S.Schema<UntagResourceRequest>;
export interface UntagResourceResponse {}
export const UntagResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UntagResourceResponse",
}) as any as S.Schema<UntagResourceResponse>;
export interface UpdateApiRequest {
  ApiId: string;
  ApiKeySelectionExpression?: string;
  CorsConfiguration?: Cors;
  CredentialsArn?: string;
  Description?: string;
  DisableSchemaValidation?: boolean;
  DisableExecuteApiEndpoint?: boolean;
  IpAddressType?: IpAddressType;
  Name?: string;
  RouteKey?: string;
  RouteSelectionExpression?: string;
  Target?: string;
  Version?: string;
}
export const UpdateApiRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiId: S.String.pipe(T.HttpLabel("ApiId")),
    ApiKeySelectionExpression: S.optional(S.String),
    CorsConfiguration: S.optional(Cors),
    CredentialsArn: S.optional(S.String),
    Description: S.optional(S.String),
    DisableSchemaValidation: S.optional(S.Boolean),
    DisableExecuteApiEndpoint: S.optional(S.Boolean),
    IpAddressType: S.optional(IpAddressType),
    Name: S.optional(S.String),
    RouteKey: S.optional(S.String),
    RouteSelectionExpression: S.optional(S.String),
    Target: S.optional(S.String),
    Version: S.optional(S.String),
  })
    .pipe(
      S.encodeKeys({
        ApiKeySelectionExpression: "apiKeySelectionExpression",
        CorsConfiguration: "corsConfiguration",
        CredentialsArn: "credentialsArn",
        Description: "description",
        DisableSchemaValidation: "disableSchemaValidation",
        DisableExecuteApiEndpoint: "disableExecuteApiEndpoint",
        IpAddressType: "ipAddressType",
        Name: "name",
        RouteKey: "routeKey",
        RouteSelectionExpression: "routeSelectionExpression",
        Target: "target",
        Version: "version",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "PATCH", uri: "/v2/apis/{ApiId}" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateApiRequest",
}) as any as S.Schema<UpdateApiRequest>;
export interface UpdateApiResponse {
  ApiEndpoint?: string;
  ApiGatewayManaged?: boolean;
  ApiId?: string;
  ApiKeySelectionExpression?: string;
  CorsConfiguration?: Cors;
  CreatedDate?: Date;
  Description?: string;
  DisableSchemaValidation?: boolean;
  DisableExecuteApiEndpoint?: boolean;
  ImportInfo?: string[];
  IpAddressType?: IpAddressType;
  Name?: string;
  ProtocolType?: ProtocolType;
  RouteSelectionExpression?: string;
  Tags?: { [key: string]: string | undefined };
  Version?: string;
  Warnings?: string[];
}
export const UpdateApiResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiEndpoint: S.optional(S.String),
    ApiGatewayManaged: S.optional(S.Boolean),
    ApiId: S.optional(S.String),
    ApiKeySelectionExpression: S.optional(S.String),
    CorsConfiguration: S.optional(Cors),
    CreatedDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Description: S.optional(S.String),
    DisableSchemaValidation: S.optional(S.Boolean),
    DisableExecuteApiEndpoint: S.optional(S.Boolean),
    ImportInfo: S.optional(__listOf__string),
    IpAddressType: S.optional(IpAddressType),
    Name: S.optional(S.String),
    ProtocolType: S.optional(ProtocolType),
    RouteSelectionExpression: S.optional(S.String),
    Tags: S.optional(Tags),
    Version: S.optional(S.String),
    Warnings: S.optional(__listOf__string),
  }).pipe(
    S.encodeKeys({
      ApiEndpoint: "apiEndpoint",
      ApiGatewayManaged: "apiGatewayManaged",
      ApiId: "apiId",
      ApiKeySelectionExpression: "apiKeySelectionExpression",
      CorsConfiguration: "corsConfiguration",
      CreatedDate: "createdDate",
      Description: "description",
      DisableSchemaValidation: "disableSchemaValidation",
      DisableExecuteApiEndpoint: "disableExecuteApiEndpoint",
      ImportInfo: "importInfo",
      IpAddressType: "ipAddressType",
      Name: "name",
      ProtocolType: "protocolType",
      RouteSelectionExpression: "routeSelectionExpression",
      Tags: "tags",
      Version: "version",
      Warnings: "warnings",
    }),
  ),
).annotate({
  identifier: "UpdateApiResponse",
}) as any as S.Schema<UpdateApiResponse>;
export interface UpdateApiMappingRequest {
  ApiId?: string;
  ApiMappingId: string;
  ApiMappingKey?: string;
  DomainName: string;
  Stage?: string;
}
export const UpdateApiMappingRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiId: S.optional(S.String),
    ApiMappingId: S.String.pipe(T.HttpLabel("ApiMappingId")),
    ApiMappingKey: S.optional(S.String),
    DomainName: S.String.pipe(T.HttpLabel("DomainName")),
    Stage: S.optional(S.String),
  })
    .pipe(
      S.encodeKeys({
        ApiId: "apiId",
        ApiMappingKey: "apiMappingKey",
        Stage: "stage",
      }),
    )
    .pipe(
      T.all(
        T.Http({
          method: "PATCH",
          uri: "/v2/domainnames/{DomainName}/apimappings/{ApiMappingId}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateApiMappingRequest",
}) as any as S.Schema<UpdateApiMappingRequest>;
export interface UpdateApiMappingResponse {
  ApiId?: string;
  ApiMappingId?: string;
  ApiMappingKey?: string;
  Stage?: string;
}
export const UpdateApiMappingResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiId: S.optional(S.String),
    ApiMappingId: S.optional(S.String),
    ApiMappingKey: S.optional(S.String),
    Stage: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      ApiId: "apiId",
      ApiMappingId: "apiMappingId",
      ApiMappingKey: "apiMappingKey",
      Stage: "stage",
    }),
  ),
).annotate({
  identifier: "UpdateApiMappingResponse",
}) as any as S.Schema<UpdateApiMappingResponse>;
export interface UpdateAuthorizerRequest {
  ApiId: string;
  AuthorizerCredentialsArn?: string;
  AuthorizerId: string;
  AuthorizerPayloadFormatVersion?: string;
  AuthorizerResultTtlInSeconds?: number;
  AuthorizerType?: AuthorizerType;
  AuthorizerUri?: string;
  EnableSimpleResponses?: boolean;
  IdentitySource?: string[];
  IdentityValidationExpression?: string;
  JwtConfiguration?: JWTConfiguration;
  Name?: string;
}
export const UpdateAuthorizerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiId: S.String.pipe(T.HttpLabel("ApiId")),
    AuthorizerCredentialsArn: S.optional(S.String),
    AuthorizerId: S.String.pipe(T.HttpLabel("AuthorizerId")),
    AuthorizerPayloadFormatVersion: S.optional(S.String),
    AuthorizerResultTtlInSeconds: S.optional(S.Number),
    AuthorizerType: S.optional(AuthorizerType),
    AuthorizerUri: S.optional(S.String),
    EnableSimpleResponses: S.optional(S.Boolean),
    IdentitySource: S.optional(IdentitySourceList),
    IdentityValidationExpression: S.optional(S.String),
    JwtConfiguration: S.optional(JWTConfiguration),
    Name: S.optional(S.String),
  })
    .pipe(
      S.encodeKeys({
        AuthorizerCredentialsArn: "authorizerCredentialsArn",
        AuthorizerPayloadFormatVersion: "authorizerPayloadFormatVersion",
        AuthorizerResultTtlInSeconds: "authorizerResultTtlInSeconds",
        AuthorizerType: "authorizerType",
        AuthorizerUri: "authorizerUri",
        EnableSimpleResponses: "enableSimpleResponses",
        IdentitySource: "identitySource",
        IdentityValidationExpression: "identityValidationExpression",
        JwtConfiguration: "jwtConfiguration",
        Name: "name",
      }),
    )
    .pipe(
      T.all(
        T.Http({
          method: "PATCH",
          uri: "/v2/apis/{ApiId}/authorizers/{AuthorizerId}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateAuthorizerRequest",
}) as any as S.Schema<UpdateAuthorizerRequest>;
export interface UpdateAuthorizerResponse {
  AuthorizerCredentialsArn?: string;
  AuthorizerId?: string;
  AuthorizerPayloadFormatVersion?: string;
  AuthorizerResultTtlInSeconds?: number;
  AuthorizerType?: AuthorizerType;
  AuthorizerUri?: string;
  EnableSimpleResponses?: boolean;
  IdentitySource?: string[];
  IdentityValidationExpression?: string;
  JwtConfiguration?: JWTConfiguration;
  Name?: string;
}
export const UpdateAuthorizerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AuthorizerCredentialsArn: S.optional(S.String),
    AuthorizerId: S.optional(S.String),
    AuthorizerPayloadFormatVersion: S.optional(S.String),
    AuthorizerResultTtlInSeconds: S.optional(S.Number),
    AuthorizerType: S.optional(AuthorizerType),
    AuthorizerUri: S.optional(S.String),
    EnableSimpleResponses: S.optional(S.Boolean),
    IdentitySource: S.optional(IdentitySourceList),
    IdentityValidationExpression: S.optional(S.String),
    JwtConfiguration: S.optional(JWTConfiguration),
    Name: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      AuthorizerCredentialsArn: "authorizerCredentialsArn",
      AuthorizerId: "authorizerId",
      AuthorizerPayloadFormatVersion: "authorizerPayloadFormatVersion",
      AuthorizerResultTtlInSeconds: "authorizerResultTtlInSeconds",
      AuthorizerType: "authorizerType",
      AuthorizerUri: "authorizerUri",
      EnableSimpleResponses: "enableSimpleResponses",
      IdentitySource: "identitySource",
      IdentityValidationExpression: "identityValidationExpression",
      JwtConfiguration: "jwtConfiguration",
      Name: "name",
    }),
  ),
).annotate({
  identifier: "UpdateAuthorizerResponse",
}) as any as S.Schema<UpdateAuthorizerResponse>;
export interface UpdateDeploymentRequest {
  ApiId: string;
  DeploymentId: string;
  Description?: string;
}
export const UpdateDeploymentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiId: S.String.pipe(T.HttpLabel("ApiId")),
    DeploymentId: S.String.pipe(T.HttpLabel("DeploymentId")),
    Description: S.optional(S.String),
  })
    .pipe(S.encodeKeys({ Description: "description" }))
    .pipe(
      T.all(
        T.Http({
          method: "PATCH",
          uri: "/v2/apis/{ApiId}/deployments/{DeploymentId}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateDeploymentRequest",
}) as any as S.Schema<UpdateDeploymentRequest>;
export interface UpdateDeploymentResponse {
  AutoDeployed?: boolean;
  CreatedDate?: Date;
  DeploymentId?: string;
  DeploymentStatus?: DeploymentStatus;
  DeploymentStatusMessage?: string;
  Description?: string;
}
export const UpdateDeploymentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AutoDeployed: S.optional(S.Boolean),
    CreatedDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    DeploymentId: S.optional(S.String),
    DeploymentStatus: S.optional(DeploymentStatus),
    DeploymentStatusMessage: S.optional(S.String),
    Description: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      AutoDeployed: "autoDeployed",
      CreatedDate: "createdDate",
      DeploymentId: "deploymentId",
      DeploymentStatus: "deploymentStatus",
      DeploymentStatusMessage: "deploymentStatusMessage",
      Description: "description",
    }),
  ),
).annotate({
  identifier: "UpdateDeploymentResponse",
}) as any as S.Schema<UpdateDeploymentResponse>;
export interface UpdateDomainNameRequest {
  DomainName: string;
  DomainNameConfigurations?: DomainNameConfiguration[];
  MutualTlsAuthentication?: MutualTlsAuthenticationInput;
  RoutingMode?: RoutingMode;
}
export const UpdateDomainNameRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainName: S.String.pipe(T.HttpLabel("DomainName")),
    DomainNameConfigurations: S.optional(DomainNameConfigurations),
    MutualTlsAuthentication: S.optional(MutualTlsAuthenticationInput),
    RoutingMode: S.optional(RoutingMode),
  })
    .pipe(
      S.encodeKeys({
        DomainNameConfigurations: "domainNameConfigurations",
        MutualTlsAuthentication: "mutualTlsAuthentication",
        RoutingMode: "routingMode",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "PATCH", uri: "/v2/domainnames/{DomainName}" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateDomainNameRequest",
}) as any as S.Schema<UpdateDomainNameRequest>;
export interface UpdateDomainNameResponse {
  ApiMappingSelectionExpression?: string;
  DomainName?: string;
  DomainNameArn?: string;
  DomainNameConfigurations?: DomainNameConfiguration[];
  MutualTlsAuthentication?: MutualTlsAuthentication;
  RoutingMode?: RoutingMode;
  Tags?: { [key: string]: string | undefined };
}
export const UpdateDomainNameResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiMappingSelectionExpression: S.optional(S.String),
    DomainName: S.optional(S.String),
    DomainNameArn: S.optional(S.String),
    DomainNameConfigurations: S.optional(DomainNameConfigurations),
    MutualTlsAuthentication: S.optional(MutualTlsAuthentication),
    RoutingMode: S.optional(RoutingMode),
    Tags: S.optional(Tags),
  }).pipe(
    S.encodeKeys({
      ApiMappingSelectionExpression: "apiMappingSelectionExpression",
      DomainName: "domainName",
      DomainNameArn: "domainNameArn",
      DomainNameConfigurations: "domainNameConfigurations",
      MutualTlsAuthentication: "mutualTlsAuthentication",
      RoutingMode: "routingMode",
      Tags: "tags",
    }),
  ),
).annotate({
  identifier: "UpdateDomainNameResponse",
}) as any as S.Schema<UpdateDomainNameResponse>;
export interface UpdateIntegrationRequest {
  ApiId: string;
  ConnectionId?: string;
  ConnectionType?: ConnectionType;
  ContentHandlingStrategy?: ContentHandlingStrategy;
  CredentialsArn?: string;
  Description?: string;
  IntegrationId: string;
  IntegrationMethod?: string;
  IntegrationSubtype?: string;
  IntegrationType?: IntegrationType;
  IntegrationUri?: string;
  PassthroughBehavior?: PassthroughBehavior;
  PayloadFormatVersion?: string;
  RequestParameters?: { [key: string]: string | undefined };
  RequestTemplates?: { [key: string]: string | undefined };
  ResponseParameters?: {
    [key: string]: { [key: string]: string | undefined } | undefined;
  };
  TemplateSelectionExpression?: string;
  TimeoutInMillis?: number;
  TlsConfig?: TlsConfigInput;
}
export const UpdateIntegrationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiId: S.String.pipe(T.HttpLabel("ApiId")),
    ConnectionId: S.optional(S.String),
    ConnectionType: S.optional(ConnectionType),
    ContentHandlingStrategy: S.optional(ContentHandlingStrategy),
    CredentialsArn: S.optional(S.String),
    Description: S.optional(S.String),
    IntegrationId: S.String.pipe(T.HttpLabel("IntegrationId")),
    IntegrationMethod: S.optional(S.String),
    IntegrationSubtype: S.optional(S.String),
    IntegrationType: S.optional(IntegrationType),
    IntegrationUri: S.optional(S.String),
    PassthroughBehavior: S.optional(PassthroughBehavior),
    PayloadFormatVersion: S.optional(S.String),
    RequestParameters: S.optional(IntegrationParameters),
    RequestTemplates: S.optional(TemplateMap),
    ResponseParameters: S.optional(ResponseParameters),
    TemplateSelectionExpression: S.optional(S.String),
    TimeoutInMillis: S.optional(S.Number),
    TlsConfig: S.optional(TlsConfigInput),
  })
    .pipe(
      S.encodeKeys({
        ConnectionId: "connectionId",
        ConnectionType: "connectionType",
        ContentHandlingStrategy: "contentHandlingStrategy",
        CredentialsArn: "credentialsArn",
        Description: "description",
        IntegrationMethod: "integrationMethod",
        IntegrationSubtype: "integrationSubtype",
        IntegrationType: "integrationType",
        IntegrationUri: "integrationUri",
        PassthroughBehavior: "passthroughBehavior",
        PayloadFormatVersion: "payloadFormatVersion",
        RequestParameters: "requestParameters",
        RequestTemplates: "requestTemplates",
        ResponseParameters: "responseParameters",
        TemplateSelectionExpression: "templateSelectionExpression",
        TimeoutInMillis: "timeoutInMillis",
        TlsConfig: "tlsConfig",
      }),
    )
    .pipe(
      T.all(
        T.Http({
          method: "PATCH",
          uri: "/v2/apis/{ApiId}/integrations/{IntegrationId}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateIntegrationRequest",
}) as any as S.Schema<UpdateIntegrationRequest>;
export interface UpdateIntegrationResult {
  ApiGatewayManaged?: boolean;
  ConnectionId?: string;
  ConnectionType?: ConnectionType;
  ContentHandlingStrategy?: ContentHandlingStrategy;
  CredentialsArn?: string;
  Description?: string;
  IntegrationId?: string;
  IntegrationMethod?: string;
  IntegrationResponseSelectionExpression?: string;
  IntegrationSubtype?: string;
  IntegrationType?: IntegrationType;
  IntegrationUri?: string;
  PassthroughBehavior?: PassthroughBehavior;
  PayloadFormatVersion?: string;
  RequestParameters?: { [key: string]: string | undefined };
  RequestTemplates?: { [key: string]: string | undefined };
  ResponseParameters?: {
    [key: string]: { [key: string]: string | undefined } | undefined;
  };
  TemplateSelectionExpression?: string;
  TimeoutInMillis?: number;
  TlsConfig?: TlsConfig;
}
export const UpdateIntegrationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiGatewayManaged: S.optional(S.Boolean),
    ConnectionId: S.optional(S.String),
    ConnectionType: S.optional(ConnectionType),
    ContentHandlingStrategy: S.optional(ContentHandlingStrategy),
    CredentialsArn: S.optional(S.String),
    Description: S.optional(S.String),
    IntegrationId: S.optional(S.String),
    IntegrationMethod: S.optional(S.String),
    IntegrationResponseSelectionExpression: S.optional(S.String),
    IntegrationSubtype: S.optional(S.String),
    IntegrationType: S.optional(IntegrationType),
    IntegrationUri: S.optional(S.String),
    PassthroughBehavior: S.optional(PassthroughBehavior),
    PayloadFormatVersion: S.optional(S.String),
    RequestParameters: S.optional(IntegrationParameters),
    RequestTemplates: S.optional(TemplateMap),
    ResponseParameters: S.optional(ResponseParameters),
    TemplateSelectionExpression: S.optional(S.String),
    TimeoutInMillis: S.optional(S.Number),
    TlsConfig: S.optional(TlsConfig),
  }).pipe(
    S.encodeKeys({
      ApiGatewayManaged: "apiGatewayManaged",
      ConnectionId: "connectionId",
      ConnectionType: "connectionType",
      ContentHandlingStrategy: "contentHandlingStrategy",
      CredentialsArn: "credentialsArn",
      Description: "description",
      IntegrationId: "integrationId",
      IntegrationMethod: "integrationMethod",
      IntegrationResponseSelectionExpression:
        "integrationResponseSelectionExpression",
      IntegrationSubtype: "integrationSubtype",
      IntegrationType: "integrationType",
      IntegrationUri: "integrationUri",
      PassthroughBehavior: "passthroughBehavior",
      PayloadFormatVersion: "payloadFormatVersion",
      RequestParameters: "requestParameters",
      RequestTemplates: "requestTemplates",
      ResponseParameters: "responseParameters",
      TemplateSelectionExpression: "templateSelectionExpression",
      TimeoutInMillis: "timeoutInMillis",
      TlsConfig: "tlsConfig",
    }),
  ),
).annotate({
  identifier: "UpdateIntegrationResult",
}) as any as S.Schema<UpdateIntegrationResult>;
export interface UpdateIntegrationResponseRequest {
  ApiId: string;
  ContentHandlingStrategy?: ContentHandlingStrategy;
  IntegrationId: string;
  IntegrationResponseId: string;
  IntegrationResponseKey?: string;
  ResponseParameters?: { [key: string]: string | undefined };
  ResponseTemplates?: { [key: string]: string | undefined };
  TemplateSelectionExpression?: string;
}
export const UpdateIntegrationResponseRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiId: S.String.pipe(T.HttpLabel("ApiId")),
    ContentHandlingStrategy: S.optional(ContentHandlingStrategy),
    IntegrationId: S.String.pipe(T.HttpLabel("IntegrationId")),
    IntegrationResponseId: S.String.pipe(T.HttpLabel("IntegrationResponseId")),
    IntegrationResponseKey: S.optional(S.String),
    ResponseParameters: S.optional(IntegrationParameters),
    ResponseTemplates: S.optional(TemplateMap),
    TemplateSelectionExpression: S.optional(S.String),
  })
    .pipe(
      S.encodeKeys({
        ContentHandlingStrategy: "contentHandlingStrategy",
        IntegrationResponseKey: "integrationResponseKey",
        ResponseParameters: "responseParameters",
        ResponseTemplates: "responseTemplates",
        TemplateSelectionExpression: "templateSelectionExpression",
      }),
    )
    .pipe(
      T.all(
        T.Http({
          method: "PATCH",
          uri: "/v2/apis/{ApiId}/integrations/{IntegrationId}/integrationresponses/{IntegrationResponseId}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateIntegrationResponseRequest",
}) as any as S.Schema<UpdateIntegrationResponseRequest>;
export interface UpdateIntegrationResponseResponse {
  ContentHandlingStrategy?: ContentHandlingStrategy;
  IntegrationResponseId?: string;
  IntegrationResponseKey?: string;
  ResponseParameters?: { [key: string]: string | undefined };
  ResponseTemplates?: { [key: string]: string | undefined };
  TemplateSelectionExpression?: string;
}
export const UpdateIntegrationResponseResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContentHandlingStrategy: S.optional(ContentHandlingStrategy),
    IntegrationResponseId: S.optional(S.String),
    IntegrationResponseKey: S.optional(S.String),
    ResponseParameters: S.optional(IntegrationParameters),
    ResponseTemplates: S.optional(TemplateMap),
    TemplateSelectionExpression: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      ContentHandlingStrategy: "contentHandlingStrategy",
      IntegrationResponseId: "integrationResponseId",
      IntegrationResponseKey: "integrationResponseKey",
      ResponseParameters: "responseParameters",
      ResponseTemplates: "responseTemplates",
      TemplateSelectionExpression: "templateSelectionExpression",
    }),
  ),
).annotate({
  identifier: "UpdateIntegrationResponseResponse",
}) as any as S.Schema<UpdateIntegrationResponseResponse>;
export interface UpdateModelRequest {
  ApiId: string;
  ContentType?: string;
  Description?: string;
  ModelId: string;
  Name?: string;
  Schema?: string;
}
export const UpdateModelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiId: S.String.pipe(T.HttpLabel("ApiId")),
    ContentType: S.optional(S.String),
    Description: S.optional(S.String),
    ModelId: S.String.pipe(T.HttpLabel("ModelId")),
    Name: S.optional(S.String),
    Schema: S.optional(S.String),
  })
    .pipe(
      S.encodeKeys({
        ContentType: "contentType",
        Description: "description",
        Name: "name",
        Schema: "schema",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "PATCH", uri: "/v2/apis/{ApiId}/models/{ModelId}" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateModelRequest",
}) as any as S.Schema<UpdateModelRequest>;
export interface UpdateModelResponse {
  ContentType?: string;
  Description?: string;
  ModelId?: string;
  Name?: string;
  Schema?: string;
}
export const UpdateModelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContentType: S.optional(S.String),
    Description: S.optional(S.String),
    ModelId: S.optional(S.String),
    Name: S.optional(S.String),
    Schema: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      ContentType: "contentType",
      Description: "description",
      ModelId: "modelId",
      Name: "name",
      Schema: "schema",
    }),
  ),
).annotate({
  identifier: "UpdateModelResponse",
}) as any as S.Schema<UpdateModelResponse>;
export interface UpdatePortalRequest {
  Authorization?: Authorization;
  EndpointConfiguration?: EndpointConfigurationRequest;
  IncludedPortalProductArns?: string[];
  LogoUri?: string;
  PortalContent?: PortalContent;
  PortalId: string;
  RumAppMonitorName?: string;
}
export const UpdatePortalRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Authorization: S.optional(Authorization),
    EndpointConfiguration: S.optional(EndpointConfigurationRequest),
    IncludedPortalProductArns: S.optional(__listOf__stringMin20Max2048),
    LogoUri: S.optional(S.String),
    PortalContent: S.optional(PortalContent),
    PortalId: S.String.pipe(T.HttpLabel("PortalId")),
    RumAppMonitorName: S.optional(S.String),
  })
    .pipe(
      S.encodeKeys({
        Authorization: "authorization",
        EndpointConfiguration: "endpointConfiguration",
        IncludedPortalProductArns: "includedPortalProductArns",
        LogoUri: "logoUri",
        PortalContent: "portalContent",
        RumAppMonitorName: "rumAppMonitorName",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "PATCH", uri: "/v2/portals/{PortalId}" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdatePortalRequest",
}) as any as S.Schema<UpdatePortalRequest>;
export interface UpdatePortalResponse {
  Authorization?: Authorization & {
    CognitoConfig: CognitoConfig & {
      AppClientId: __stringMin1Max256;
      UserPoolArn: __stringMin20Max2048;
      UserPoolDomain: __stringMin20Max2048;
    };
  };
  EndpointConfiguration?: EndpointConfigurationResponse & {
    PortalDefaultDomainName: __stringMin3Max256;
    PortalDomainHostedZoneId: __stringMin1Max64;
  };
  IncludedPortalProductArns?: string[];
  LastModified?: Date;
  LastPublished?: Date;
  LastPublishedDescription?: string;
  PortalArn?: string;
  PortalContent?: PortalContent & {
    DisplayName: __stringMin3Max255;
    Theme: PortalTheme & {
      CustomColors: CustomColors & {
        AccentColor: __stringMin1Max16;
        BackgroundColor: __stringMin1Max16;
        ErrorValidationColor: __stringMin1Max16;
        HeaderColor: __stringMin1Max16;
        NavigationColor: __stringMin1Max16;
        TextColor: __stringMin1Max16;
      };
    };
  };
  PortalId?: string;
  Preview?: Preview & { PreviewStatus: PreviewStatus };
  PublishStatus?: PublishStatus;
  RumAppMonitorName?: string;
  StatusException?: StatusException;
  Tags?: { [key: string]: string | undefined };
}
export const UpdatePortalResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Authorization: S.optional(Authorization),
    EndpointConfiguration: S.optional(EndpointConfigurationResponse),
    IncludedPortalProductArns: S.optional(__listOf__stringMin20Max2048),
    LastModified: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    LastPublished: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    LastPublishedDescription: S.optional(S.String),
    PortalArn: S.optional(S.String),
    PortalContent: S.optional(PortalContent),
    PortalId: S.optional(S.String),
    Preview: S.optional(Preview),
    PublishStatus: S.optional(PublishStatus),
    RumAppMonitorName: S.optional(S.String),
    StatusException: S.optional(StatusException),
    Tags: S.optional(Tags),
  }).pipe(
    S.encodeKeys({
      Authorization: "authorization",
      EndpointConfiguration: "endpointConfiguration",
      IncludedPortalProductArns: "includedPortalProductArns",
      LastModified: "lastModified",
      LastPublished: "lastPublished",
      LastPublishedDescription: "lastPublishedDescription",
      PortalArn: "portalArn",
      PortalContent: "portalContent",
      PortalId: "portalId",
      Preview: "preview",
      PublishStatus: "publishStatus",
      RumAppMonitorName: "rumAppMonitorName",
      StatusException: "statusException",
      Tags: "tags",
    }),
  ),
).annotate({
  identifier: "UpdatePortalResponse",
}) as any as S.Schema<UpdatePortalResponse>;
export interface UpdatePortalProductRequest {
  Description?: string;
  DisplayName?: string;
  DisplayOrder?: DisplayOrder;
  PortalProductId: string;
}
export const UpdatePortalProductRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Description: S.optional(S.String),
    DisplayName: S.optional(S.String),
    DisplayOrder: S.optional(DisplayOrder),
    PortalProductId: S.String.pipe(T.HttpLabel("PortalProductId")),
  })
    .pipe(
      S.encodeKeys({
        Description: "description",
        DisplayName: "displayName",
        DisplayOrder: "displayOrder",
      }),
    )
    .pipe(
      T.all(
        T.Http({
          method: "PATCH",
          uri: "/v2/portalproducts/{PortalProductId}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdatePortalProductRequest",
}) as any as S.Schema<UpdatePortalProductRequest>;
export interface UpdatePortalProductResponse {
  Description?: string;
  DisplayName?: string;
  DisplayOrder?: DisplayOrder & {
    Contents: (Section & {
      ProductRestEndpointPageArns: __listOf__stringMin20Max2048;
      SectionName: string;
    })[];
  };
  LastModified?: Date;
  PortalProductArn?: string;
  PortalProductId?: string;
  Tags?: { [key: string]: string | undefined };
}
export const UpdatePortalProductResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Description: S.optional(S.String),
    DisplayName: S.optional(S.String),
    DisplayOrder: S.optional(DisplayOrder),
    LastModified: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    PortalProductArn: S.optional(S.String),
    PortalProductId: S.optional(S.String),
    Tags: S.optional(Tags),
  }).pipe(
    S.encodeKeys({
      Description: "description",
      DisplayName: "displayName",
      DisplayOrder: "displayOrder",
      LastModified: "lastModified",
      PortalProductArn: "portalProductArn",
      PortalProductId: "portalProductId",
      Tags: "tags",
    }),
  ),
).annotate({
  identifier: "UpdatePortalProductResponse",
}) as any as S.Schema<UpdatePortalProductResponse>;
export interface UpdateProductPageRequest {
  DisplayContent?: DisplayContent;
  PortalProductId: string;
  ProductPageId: string;
}
export const UpdateProductPageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DisplayContent: S.optional(DisplayContent),
    PortalProductId: S.String.pipe(T.HttpLabel("PortalProductId")),
    ProductPageId: S.String.pipe(T.HttpLabel("ProductPageId")),
  })
    .pipe(S.encodeKeys({ DisplayContent: "displayContent" }))
    .pipe(
      T.all(
        T.Http({
          method: "PATCH",
          uri: "/v2/portalproducts/{PortalProductId}/productpages/{ProductPageId}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateProductPageRequest",
}) as any as S.Schema<UpdateProductPageRequest>;
export interface UpdateProductPageResponse {
  DisplayContent?: DisplayContent & {
    Body: __stringMin1Max32768;
    Title: __stringMin1Max255;
  };
  LastModified?: Date;
  ProductPageArn?: string;
  ProductPageId?: string;
}
export const UpdateProductPageResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DisplayContent: S.optional(DisplayContent),
    LastModified: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    ProductPageArn: S.optional(S.String),
    ProductPageId: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      DisplayContent: "displayContent",
      LastModified: "lastModified",
      ProductPageArn: "productPageArn",
      ProductPageId: "productPageId",
    }),
  ),
).annotate({
  identifier: "UpdateProductPageResponse",
}) as any as S.Schema<UpdateProductPageResponse>;
export interface UpdateProductRestEndpointPageRequest {
  DisplayContent?: EndpointDisplayContent;
  PortalProductId: string;
  ProductRestEndpointPageId: string;
  TryItState?: TryItState;
}
export const UpdateProductRestEndpointPageRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      DisplayContent: S.optional(EndpointDisplayContent),
      PortalProductId: S.String.pipe(T.HttpLabel("PortalProductId")),
      ProductRestEndpointPageId: S.String.pipe(
        T.HttpLabel("ProductRestEndpointPageId"),
      ),
      TryItState: S.optional(TryItState),
    })
      .pipe(
        S.encodeKeys({
          DisplayContent: "displayContent",
          TryItState: "tryItState",
        }),
      )
      .pipe(
        T.all(
          T.Http({
            method: "PATCH",
            uri: "/v2/portalproducts/{PortalProductId}/productrestendpointpages/{ProductRestEndpointPageId}",
          }),
          svc,
          auth,
          proto,
          ver,
          rules,
        ),
      ),
).annotate({
  identifier: "UpdateProductRestEndpointPageRequest",
}) as any as S.Schema<UpdateProductRestEndpointPageRequest>;
export interface UpdateProductRestEndpointPageResponse {
  DisplayContent?: EndpointDisplayContentResponse & {
    Endpoint: __stringMin1Max1024;
  };
  LastModified?: Date;
  ProductRestEndpointPageArn?: string;
  ProductRestEndpointPageId?: string;
  RestEndpointIdentifier?: RestEndpointIdentifier & {
    IdentifierParts: IdentifierParts & {
      Method: __stringMin1Max20;
      Path: __stringMin1Max4096;
      RestApiId: __stringMin1Max50;
      Stage: __stringMin1Max128;
    };
  };
  Status?: Status;
  StatusException?: StatusException;
  TryItState?: TryItState;
}
export const UpdateProductRestEndpointPageResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      DisplayContent: S.optional(EndpointDisplayContentResponse),
      LastModified: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
      ProductRestEndpointPageArn: S.optional(S.String),
      ProductRestEndpointPageId: S.optional(S.String),
      RestEndpointIdentifier: S.optional(RestEndpointIdentifier),
      Status: S.optional(Status),
      StatusException: S.optional(StatusException),
      TryItState: S.optional(TryItState),
    }).pipe(
      S.encodeKeys({
        DisplayContent: "displayContent",
        LastModified: "lastModified",
        ProductRestEndpointPageArn: "productRestEndpointPageArn",
        ProductRestEndpointPageId: "productRestEndpointPageId",
        RestEndpointIdentifier: "restEndpointIdentifier",
        Status: "status",
        StatusException: "statusException",
        TryItState: "tryItState",
      }),
    ),
).annotate({
  identifier: "UpdateProductRestEndpointPageResponse",
}) as any as S.Schema<UpdateProductRestEndpointPageResponse>;
export interface UpdateRouteRequest {
  ApiId: string;
  ApiKeyRequired?: boolean;
  AuthorizationScopes?: string[];
  AuthorizationType?: AuthorizationType;
  AuthorizerId?: string;
  ModelSelectionExpression?: string;
  OperationName?: string;
  RequestModels?: { [key: string]: string | undefined };
  RequestParameters?: { [key: string]: ParameterConstraints | undefined };
  RouteId: string;
  RouteKey?: string;
  RouteResponseSelectionExpression?: string;
  Target?: string;
}
export const UpdateRouteRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiId: S.String.pipe(T.HttpLabel("ApiId")),
    ApiKeyRequired: S.optional(S.Boolean),
    AuthorizationScopes: S.optional(AuthorizationScopes),
    AuthorizationType: S.optional(AuthorizationType),
    AuthorizerId: S.optional(S.String),
    ModelSelectionExpression: S.optional(S.String),
    OperationName: S.optional(S.String),
    RequestModels: S.optional(RouteModels),
    RequestParameters: S.optional(RouteParameters),
    RouteId: S.String.pipe(T.HttpLabel("RouteId")),
    RouteKey: S.optional(S.String),
    RouteResponseSelectionExpression: S.optional(S.String),
    Target: S.optional(S.String),
  })
    .pipe(
      S.encodeKeys({
        ApiKeyRequired: "apiKeyRequired",
        AuthorizationScopes: "authorizationScopes",
        AuthorizationType: "authorizationType",
        AuthorizerId: "authorizerId",
        ModelSelectionExpression: "modelSelectionExpression",
        OperationName: "operationName",
        RequestModels: "requestModels",
        RequestParameters: "requestParameters",
        RouteKey: "routeKey",
        RouteResponseSelectionExpression: "routeResponseSelectionExpression",
        Target: "target",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "PATCH", uri: "/v2/apis/{ApiId}/routes/{RouteId}" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateRouteRequest",
}) as any as S.Schema<UpdateRouteRequest>;
export interface UpdateRouteResult {
  ApiGatewayManaged?: boolean;
  ApiKeyRequired?: boolean;
  AuthorizationScopes?: string[];
  AuthorizationType?: AuthorizationType;
  AuthorizerId?: string;
  ModelSelectionExpression?: string;
  OperationName?: string;
  RequestModels?: { [key: string]: string | undefined };
  RequestParameters?: { [key: string]: ParameterConstraints | undefined };
  RouteId?: string;
  RouteKey?: string;
  RouteResponseSelectionExpression?: string;
  Target?: string;
}
export const UpdateRouteResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiGatewayManaged: S.optional(S.Boolean),
    ApiKeyRequired: S.optional(S.Boolean),
    AuthorizationScopes: S.optional(AuthorizationScopes),
    AuthorizationType: S.optional(AuthorizationType),
    AuthorizerId: S.optional(S.String),
    ModelSelectionExpression: S.optional(S.String),
    OperationName: S.optional(S.String),
    RequestModels: S.optional(RouteModels),
    RequestParameters: S.optional(RouteParameters),
    RouteId: S.optional(S.String),
    RouteKey: S.optional(S.String),
    RouteResponseSelectionExpression: S.optional(S.String),
    Target: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      ApiGatewayManaged: "apiGatewayManaged",
      ApiKeyRequired: "apiKeyRequired",
      AuthorizationScopes: "authorizationScopes",
      AuthorizationType: "authorizationType",
      AuthorizerId: "authorizerId",
      ModelSelectionExpression: "modelSelectionExpression",
      OperationName: "operationName",
      RequestModels: "requestModels",
      RequestParameters: "requestParameters",
      RouteId: "routeId",
      RouteKey: "routeKey",
      RouteResponseSelectionExpression: "routeResponseSelectionExpression",
      Target: "target",
    }),
  ),
).annotate({
  identifier: "UpdateRouteResult",
}) as any as S.Schema<UpdateRouteResult>;
export interface UpdateRouteResponseRequest {
  ApiId: string;
  ModelSelectionExpression?: string;
  ResponseModels?: { [key: string]: string | undefined };
  ResponseParameters?: { [key: string]: ParameterConstraints | undefined };
  RouteId: string;
  RouteResponseId: string;
  RouteResponseKey?: string;
}
export const UpdateRouteResponseRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiId: S.String.pipe(T.HttpLabel("ApiId")),
    ModelSelectionExpression: S.optional(S.String),
    ResponseModels: S.optional(RouteModels),
    ResponseParameters: S.optional(RouteParameters),
    RouteId: S.String.pipe(T.HttpLabel("RouteId")),
    RouteResponseId: S.String.pipe(T.HttpLabel("RouteResponseId")),
    RouteResponseKey: S.optional(S.String),
  })
    .pipe(
      S.encodeKeys({
        ModelSelectionExpression: "modelSelectionExpression",
        ResponseModels: "responseModels",
        ResponseParameters: "responseParameters",
        RouteResponseKey: "routeResponseKey",
      }),
    )
    .pipe(
      T.all(
        T.Http({
          method: "PATCH",
          uri: "/v2/apis/{ApiId}/routes/{RouteId}/routeresponses/{RouteResponseId}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateRouteResponseRequest",
}) as any as S.Schema<UpdateRouteResponseRequest>;
export interface UpdateRouteResponseResponse {
  ModelSelectionExpression?: string;
  ResponseModels?: { [key: string]: string | undefined };
  ResponseParameters?: { [key: string]: ParameterConstraints | undefined };
  RouteResponseId?: string;
  RouteResponseKey?: string;
}
export const UpdateRouteResponseResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ModelSelectionExpression: S.optional(S.String),
    ResponseModels: S.optional(RouteModels),
    ResponseParameters: S.optional(RouteParameters),
    RouteResponseId: S.optional(S.String),
    RouteResponseKey: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      ModelSelectionExpression: "modelSelectionExpression",
      ResponseModels: "responseModels",
      ResponseParameters: "responseParameters",
      RouteResponseId: "routeResponseId",
      RouteResponseKey: "routeResponseKey",
    }),
  ),
).annotate({
  identifier: "UpdateRouteResponseResponse",
}) as any as S.Schema<UpdateRouteResponseResponse>;
export interface UpdateStageRequest {
  AccessLogSettings?: AccessLogSettings;
  ApiId: string;
  AutoDeploy?: boolean;
  ClientCertificateId?: string;
  DefaultRouteSettings?: RouteSettings;
  DeploymentId?: string;
  Description?: string;
  RouteSettings?: { [key: string]: RouteSettings | undefined };
  StageName: string;
  StageVariables?: { [key: string]: string | undefined };
}
export const UpdateStageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccessLogSettings: S.optional(AccessLogSettings),
    ApiId: S.String.pipe(T.HttpLabel("ApiId")),
    AutoDeploy: S.optional(S.Boolean),
    ClientCertificateId: S.optional(S.String),
    DefaultRouteSettings: S.optional(RouteSettings),
    DeploymentId: S.optional(S.String),
    Description: S.optional(S.String),
    RouteSettings: S.optional(RouteSettingsMap),
    StageName: S.String.pipe(T.HttpLabel("StageName")),
    StageVariables: S.optional(StageVariablesMap),
  })
    .pipe(
      S.encodeKeys({
        AccessLogSettings: "accessLogSettings",
        AutoDeploy: "autoDeploy",
        ClientCertificateId: "clientCertificateId",
        DefaultRouteSettings: "defaultRouteSettings",
        DeploymentId: "deploymentId",
        Description: "description",
        RouteSettings: "routeSettings",
        StageVariables: "stageVariables",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "PATCH", uri: "/v2/apis/{ApiId}/stages/{StageName}" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateStageRequest",
}) as any as S.Schema<UpdateStageRequest>;
export interface UpdateStageResponse {
  AccessLogSettings?: AccessLogSettings;
  ApiGatewayManaged?: boolean;
  AutoDeploy?: boolean;
  ClientCertificateId?: string;
  CreatedDate?: Date;
  DefaultRouteSettings?: RouteSettings;
  DeploymentId?: string;
  Description?: string;
  LastDeploymentStatusMessage?: string;
  LastUpdatedDate?: Date;
  RouteSettings?: { [key: string]: RouteSettings | undefined };
  StageName?: string;
  StageVariables?: { [key: string]: string | undefined };
  Tags?: { [key: string]: string | undefined };
}
export const UpdateStageResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccessLogSettings: S.optional(AccessLogSettings),
    ApiGatewayManaged: S.optional(S.Boolean),
    AutoDeploy: S.optional(S.Boolean),
    ClientCertificateId: S.optional(S.String),
    CreatedDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    DefaultRouteSettings: S.optional(RouteSettings),
    DeploymentId: S.optional(S.String),
    Description: S.optional(S.String),
    LastDeploymentStatusMessage: S.optional(S.String),
    LastUpdatedDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    RouteSettings: S.optional(RouteSettingsMap),
    StageName: S.optional(S.String),
    StageVariables: S.optional(StageVariablesMap),
    Tags: S.optional(Tags),
  }).pipe(
    S.encodeKeys({
      AccessLogSettings: "accessLogSettings",
      ApiGatewayManaged: "apiGatewayManaged",
      AutoDeploy: "autoDeploy",
      ClientCertificateId: "clientCertificateId",
      CreatedDate: "createdDate",
      DefaultRouteSettings: "defaultRouteSettings",
      DeploymentId: "deploymentId",
      Description: "description",
      LastDeploymentStatusMessage: "lastDeploymentStatusMessage",
      LastUpdatedDate: "lastUpdatedDate",
      RouteSettings: "routeSettings",
      StageName: "stageName",
      StageVariables: "stageVariables",
      Tags: "tags",
    }),
  ),
).annotate({
  identifier: "UpdateStageResponse",
}) as any as S.Schema<UpdateStageResponse>;
export interface UpdateVpcLinkRequest {
  Name?: string;
  VpcLinkId: string;
}
export const UpdateVpcLinkRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    VpcLinkId: S.String.pipe(T.HttpLabel("VpcLinkId")),
  })
    .pipe(S.encodeKeys({ Name: "name" }))
    .pipe(
      T.all(
        T.Http({ method: "PATCH", uri: "/v2/vpclinks/{VpcLinkId}" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateVpcLinkRequest",
}) as any as S.Schema<UpdateVpcLinkRequest>;
export interface UpdateVpcLinkResponse {
  CreatedDate?: Date;
  Name?: string;
  SecurityGroupIds?: string[];
  SubnetIds?: string[];
  Tags?: { [key: string]: string | undefined };
  VpcLinkId?: string;
  VpcLinkStatus?: VpcLinkStatus;
  VpcLinkStatusMessage?: string;
  VpcLinkVersion?: VpcLinkVersion;
}
export const UpdateVpcLinkResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CreatedDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Name: S.optional(S.String),
    SecurityGroupIds: S.optional(SecurityGroupIdList),
    SubnetIds: S.optional(SubnetIdList),
    Tags: S.optional(Tags),
    VpcLinkId: S.optional(S.String),
    VpcLinkStatus: S.optional(VpcLinkStatus),
    VpcLinkStatusMessage: S.optional(S.String),
    VpcLinkVersion: S.optional(VpcLinkVersion),
  }).pipe(
    S.encodeKeys({
      CreatedDate: "createdDate",
      Name: "name",
      SecurityGroupIds: "securityGroupIds",
      SubnetIds: "subnetIds",
      Tags: "tags",
      VpcLinkId: "vpcLinkId",
      VpcLinkStatus: "vpcLinkStatus",
      VpcLinkStatusMessage: "vpcLinkStatusMessage",
      VpcLinkVersion: "vpcLinkVersion",
    }),
  ),
).annotate({
  identifier: "UpdateVpcLinkResponse",
}) as any as S.Schema<UpdateVpcLinkResponse>;
export type CreateApiError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates an Api resource.
 */
export const createApi: API.OperationMethod<
  CreateApiRequest,
  CreateApiResponse,
  CreateApiError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateApiRequest,
  output: CreateApiResponse,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateApi",
}));

export type CreateApiMappingError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates an API mapping.
 */
export const createApiMapping: API.OperationMethod<
  CreateApiMappingRequest,
  CreateApiMappingResponse,
  CreateApiMappingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateApiMappingRequest,
  output: CreateApiMappingResponse,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateApiMapping",
}));

export type CreateAuthorizerError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates an Authorizer for an API.
 */
export const createAuthorizer: API.OperationMethod<
  CreateAuthorizerRequest,
  CreateAuthorizerResponse,
  CreateAuthorizerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAuthorizerRequest,
  output: CreateAuthorizerResponse,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAuthorizer",
}));

export type CreateDeploymentError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a Deployment for an API.
 */
export const createDeployment: API.OperationMethod<
  CreateDeploymentRequest,
  CreateDeploymentResponse,
  CreateDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDeploymentRequest,
  output: CreateDeploymentResponse,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDeployment",
}));

export type CreateDomainNameError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a domain name.
 */
export const createDomainName: API.OperationMethod<
  CreateDomainNameRequest,
  CreateDomainNameResponse,
  CreateDomainNameError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDomainNameRequest,
  output: CreateDomainNameResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDomainName",
}));

export type CreateIntegrationError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates an Integration.
 */
export const createIntegration: API.OperationMethod<
  CreateIntegrationRequest,
  CreateIntegrationResult,
  CreateIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateIntegrationRequest,
  output: CreateIntegrationResult,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateIntegration",
}));

export type CreateIntegrationResponseError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates an IntegrationResponses.
 */
export const createIntegrationResponse: API.OperationMethod<
  CreateIntegrationResponseRequest,
  CreateIntegrationResponseResponse,
  CreateIntegrationResponseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateIntegrationResponseRequest,
  output: CreateIntegrationResponseResponse,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateIntegrationResponse",
}));

export type CreateModelError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a Model for an API.
 */
export const createModel: API.OperationMethod<
  CreateModelRequest,
  CreateModelResponse,
  CreateModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateModelRequest,
  output: CreateModelResponse,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateModel",
}));

export type CreatePortalError =
  | AccessDeniedException
  | BadRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a portal.
 */
export const createPortal: API.OperationMethod<
  CreatePortalRequest,
  CreatePortalResponse,
  CreatePortalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreatePortalRequest,
  output: CreatePortalResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePortal",
}));

export type CreatePortalProductError =
  | AccessDeniedException
  | BadRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a new portal product.
 */
export const createPortalProduct: API.OperationMethod<
  CreatePortalProductRequest,
  CreatePortalProductResponse,
  CreatePortalProductError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreatePortalProductRequest,
  output: CreatePortalProductResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePortalProduct",
}));

export type CreateProductPageError =
  | AccessDeniedException
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a new product page for a portal product.
 */
export const createProductPage: API.OperationMethod<
  CreateProductPageRequest,
  CreateProductPageResponse,
  CreateProductPageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateProductPageRequest,
  output: CreateProductPageResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProductPage",
}));

export type CreateProductRestEndpointPageError =
  | AccessDeniedException
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a product REST endpoint page for a portal product.
 */
export const createProductRestEndpointPage: API.OperationMethod<
  CreateProductRestEndpointPageRequest,
  CreateProductRestEndpointPageResponse,
  CreateProductRestEndpointPageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateProductRestEndpointPageRequest,
  output: CreateProductRestEndpointPageResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProductRestEndpointPage",
}));

export type CreateRouteError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a Route for an API.
 */
export const createRoute: API.OperationMethod<
  CreateRouteRequest,
  CreateRouteResult,
  CreateRouteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateRouteRequest,
  output: CreateRouteResult,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRoute",
}));

export type CreateRouteResponseError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a RouteResponse for a Route.
 */
export const createRouteResponse: API.OperationMethod<
  CreateRouteResponseRequest,
  CreateRouteResponseResponse,
  CreateRouteResponseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateRouteResponseRequest,
  output: CreateRouteResponseResponse,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRouteResponse",
}));

export type CreateRoutingRuleError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a RoutingRule.
 */
export const createRoutingRule: API.OperationMethod<
  CreateRoutingRuleRequest,
  CreateRoutingRuleResponse,
  CreateRoutingRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateRoutingRuleRequest,
  output: CreateRoutingRuleResponse,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRoutingRule",
}));

export type CreateStageError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a Stage for an API.
 */
export const createStage: API.OperationMethod<
  CreateStageRequest,
  CreateStageResponse,
  CreateStageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateStageRequest,
  output: CreateStageResponse,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateStage",
}));

export type CreateVpcLinkError =
  | BadRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a VPC link.
 */
export const createVpcLink: API.OperationMethod<
  CreateVpcLinkRequest,
  CreateVpcLinkResponse,
  CreateVpcLinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateVpcLinkRequest,
  output: CreateVpcLinkResponse,
  errors: [BadRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateVpcLink",
}));

export type DeleteAccessLogSettingsError =
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes the AccessLogSettings for a Stage. To disable access logging for a Stage, delete its AccessLogSettings.
 */
export const deleteAccessLogSettings: API.OperationMethod<
  DeleteAccessLogSettingsRequest,
  DeleteAccessLogSettingsResponse,
  DeleteAccessLogSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAccessLogSettingsRequest,
  output: DeleteAccessLogSettingsResponse,
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccessLogSettings",
}));

export type DeleteApiError =
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes an Api resource.
 */
export const deleteApi: API.OperationMethod<
  DeleteApiRequest,
  DeleteApiResponse,
  DeleteApiError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteApiRequest,
  output: DeleteApiResponse,
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApi",
}));

export type DeleteApiMappingError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes an API mapping.
 */
export const deleteApiMapping: API.OperationMethod<
  DeleteApiMappingRequest,
  DeleteApiMappingResponse,
  DeleteApiMappingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteApiMappingRequest,
  output: DeleteApiMappingResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApiMapping",
}));

export type DeleteAuthorizerError =
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes an Authorizer.
 */
export const deleteAuthorizer: API.OperationMethod<
  DeleteAuthorizerRequest,
  DeleteAuthorizerResponse,
  DeleteAuthorizerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAuthorizerRequest,
  output: DeleteAuthorizerResponse,
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAuthorizer",
}));

export type DeleteCorsConfigurationError =
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a CORS configuration.
 */
export const deleteCorsConfiguration: API.OperationMethod<
  DeleteCorsConfigurationRequest,
  DeleteCorsConfigurationResponse,
  DeleteCorsConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteCorsConfigurationRequest,
  output: DeleteCorsConfigurationResponse,
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCorsConfiguration",
}));

export type DeleteDeploymentError =
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a Deployment.
 */
export const deleteDeployment: API.OperationMethod<
  DeleteDeploymentRequest,
  DeleteDeploymentResponse,
  DeleteDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDeploymentRequest,
  output: DeleteDeploymentResponse,
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDeployment",
}));

export type DeleteDomainNameError =
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a domain name.
 */
export const deleteDomainName: API.OperationMethod<
  DeleteDomainNameRequest,
  DeleteDomainNameResponse,
  DeleteDomainNameError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDomainNameRequest,
  output: DeleteDomainNameResponse,
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDomainName",
}));

export type DeleteIntegrationError =
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes an Integration.
 */
export const deleteIntegration: API.OperationMethod<
  DeleteIntegrationRequest,
  DeleteIntegrationResponse,
  DeleteIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteIntegrationRequest,
  output: DeleteIntegrationResponse,
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIntegration",
}));

export type DeleteIntegrationResponseError =
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes an IntegrationResponses.
 */
export const deleteIntegrationResponse: API.OperationMethod<
  DeleteIntegrationResponseRequest,
  DeleteIntegrationResponseResponse,
  DeleteIntegrationResponseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteIntegrationResponseRequest,
  output: DeleteIntegrationResponseResponse,
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIntegrationResponse",
}));

export type DeleteModelError =
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a Model.
 */
export const deleteModel: API.OperationMethod<
  DeleteModelRequest,
  DeleteModelResponse,
  DeleteModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteModelRequest,
  output: DeleteModelResponse,
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteModel",
}));

export type DeletePortalError =
  | AccessDeniedException
  | BadRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a portal.
 */
export const deletePortal: API.OperationMethod<
  DeletePortalRequest,
  DeletePortalResponse,
  DeletePortalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeletePortalRequest,
  output: DeletePortalResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePortal",
}));

export type DeletePortalProductError =
  | AccessDeniedException
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a portal product.
 */
export const deletePortalProduct: API.OperationMethod<
  DeletePortalProductRequest,
  DeletePortalProductResponse,
  DeletePortalProductError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeletePortalProductRequest,
  output: DeletePortalProductResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePortalProduct",
}));

export type DeletePortalProductSharingPolicyError =
  | AccessDeniedException
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes the sharing policy for a portal product.
 */
export const deletePortalProductSharingPolicy: API.OperationMethod<
  DeletePortalProductSharingPolicyRequest,
  DeletePortalProductSharingPolicyResponse,
  DeletePortalProductSharingPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeletePortalProductSharingPolicyRequest,
  output: DeletePortalProductSharingPolicyResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePortalProductSharingPolicy",
}));

export type DeleteProductPageError =
  | AccessDeniedException
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a product page of a portal product.
 */
export const deleteProductPage: API.OperationMethod<
  DeleteProductPageRequest,
  DeleteProductPageResponse,
  DeleteProductPageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteProductPageRequest,
  output: DeleteProductPageResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProductPage",
}));

export type DeleteProductRestEndpointPageError =
  | AccessDeniedException
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a product REST endpoint page.
 */
export const deleteProductRestEndpointPage: API.OperationMethod<
  DeleteProductRestEndpointPageRequest,
  DeleteProductRestEndpointPageResponse,
  DeleteProductRestEndpointPageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteProductRestEndpointPageRequest,
  output: DeleteProductRestEndpointPageResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProductRestEndpointPage",
}));

export type DeleteRouteError =
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a Route.
 */
export const deleteRoute: API.OperationMethod<
  DeleteRouteRequest,
  DeleteRouteResponse,
  DeleteRouteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteRouteRequest,
  output: DeleteRouteResponse,
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRoute",
}));

export type DeleteRouteRequestParameterError =
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a route request parameter. Supported only for WebSocket APIs.
 */
export const deleteRouteRequestParameter: API.OperationMethod<
  DeleteRouteRequestParameterRequest,
  DeleteRouteRequestParameterResponse,
  DeleteRouteRequestParameterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteRouteRequestParameterRequest,
  output: DeleteRouteRequestParameterResponse,
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRouteRequestParameter",
}));

export type DeleteRouteResponseError =
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a RouteResponse.
 */
export const deleteRouteResponse: API.OperationMethod<
  DeleteRouteResponseRequest,
  DeleteRouteResponseResponse,
  DeleteRouteResponseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteRouteResponseRequest,
  output: DeleteRouteResponseResponse,
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRouteResponse",
}));

export type DeleteRouteSettingsError =
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes the RouteSettings for a stage.
 */
export const deleteRouteSettings: API.OperationMethod<
  DeleteRouteSettingsRequest,
  DeleteRouteSettingsResponse,
  DeleteRouteSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteRouteSettingsRequest,
  output: DeleteRouteSettingsResponse,
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRouteSettings",
}));

export type DeleteRoutingRuleError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a routing rule.
 */
export const deleteRoutingRule: API.OperationMethod<
  DeleteRoutingRuleRequest,
  DeleteRoutingRuleResponse,
  DeleteRoutingRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteRoutingRuleRequest,
  output: DeleteRoutingRuleResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRoutingRule",
}));

export type DeleteStageError =
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a Stage.
 */
export const deleteStage: API.OperationMethod<
  DeleteStageRequest,
  DeleteStageResponse,
  DeleteStageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteStageRequest,
  output: DeleteStageResponse,
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteStage",
}));

export type DeleteVpcLinkError =
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a VPC link.
 */
export const deleteVpcLink: API.OperationMethod<
  DeleteVpcLinkRequest,
  DeleteVpcLinkResponse,
  DeleteVpcLinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteVpcLinkRequest,
  output: DeleteVpcLinkResponse,
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVpcLink",
}));

export type DisablePortalError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes the publication of a portal portal.
 */
export const disablePortal: API.OperationMethod<
  DisablePortalRequest,
  DisablePortalResponse,
  DisablePortalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisablePortalRequest,
  output: DisablePortalResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisablePortal",
}));

export type ExportApiError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 *
 */
export const exportApi: API.OperationMethod<
  ExportApiRequest,
  ExportApiResponse,
  ExportApiError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ExportApiRequest,
  output: ExportApiResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExportApi",
}));

export type GetApiError =
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets an Api resource.
 */
export const getApi: API.OperationMethod<
  GetApiRequest,
  GetApiResponse,
  GetApiError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetApiRequest,
  output: GetApiResponse,
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApi",
}));

export type GetApiMappingError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets an API mapping.
 */
export const getApiMapping: API.OperationMethod<
  GetApiMappingRequest,
  GetApiMappingResponse,
  GetApiMappingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetApiMappingRequest,
  output: GetApiMappingResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApiMapping",
}));

export type GetApiMappingsError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets API mappings.
 */
export const getApiMappings: API.OperationMethod<
  GetApiMappingsRequest,
  GetApiMappingsResponse,
  GetApiMappingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetApiMappingsRequest,
  output: GetApiMappingsResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApiMappings",
}));

export type GetApisError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets a collection of Api resources.
 */
export const getApis: API.OperationMethod<
  GetApisRequest,
  GetApisResponse,
  GetApisError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetApisRequest,
  output: GetApisResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApis",
}));

export type GetAuthorizerError =
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets an Authorizer.
 */
export const getAuthorizer: API.OperationMethod<
  GetAuthorizerRequest,
  GetAuthorizerResponse,
  GetAuthorizerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAuthorizerRequest,
  output: GetAuthorizerResponse,
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAuthorizer",
}));

export type GetAuthorizersError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets the Authorizers for an API.
 */
export const getAuthorizers: API.OperationMethod<
  GetAuthorizersRequest,
  GetAuthorizersResponse,
  GetAuthorizersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAuthorizersRequest,
  output: GetAuthorizersResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAuthorizers",
}));

export type GetDeploymentError =
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets a Deployment.
 */
export const getDeployment: API.OperationMethod<
  GetDeploymentRequest,
  GetDeploymentResponse,
  GetDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDeploymentRequest,
  output: GetDeploymentResponse,
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeployment",
}));

export type GetDeploymentsError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets the Deployments for an API.
 */
export const getDeployments: API.OperationMethod<
  GetDeploymentsRequest,
  GetDeploymentsResponse,
  GetDeploymentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDeploymentsRequest,
  output: GetDeploymentsResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeployments",
}));

export type GetDomainNameError =
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets a domain name.
 */
export const getDomainName: API.OperationMethod<
  GetDomainNameRequest,
  GetDomainNameResponse,
  GetDomainNameError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDomainNameRequest,
  output: GetDomainNameResponse,
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDomainName",
}));

export type GetDomainNamesError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets the domain names for an AWS account.
 */
export const getDomainNames: API.OperationMethod<
  GetDomainNamesRequest,
  GetDomainNamesResponse,
  GetDomainNamesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDomainNamesRequest,
  output: GetDomainNamesResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDomainNames",
}));

export type GetIntegrationError =
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets an Integration.
 */
export const getIntegration: API.OperationMethod<
  GetIntegrationRequest,
  GetIntegrationResult,
  GetIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetIntegrationRequest,
  output: GetIntegrationResult,
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIntegration",
}));

export type GetIntegrationResponseError =
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets an IntegrationResponses.
 */
export const getIntegrationResponse: API.OperationMethod<
  GetIntegrationResponseRequest,
  GetIntegrationResponseResponse,
  GetIntegrationResponseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetIntegrationResponseRequest,
  output: GetIntegrationResponseResponse,
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIntegrationResponse",
}));

export type GetIntegrationResponsesError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets the IntegrationResponses for an Integration.
 */
export const getIntegrationResponses: API.OperationMethod<
  GetIntegrationResponsesRequest,
  GetIntegrationResponsesResponse,
  GetIntegrationResponsesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetIntegrationResponsesRequest,
  output: GetIntegrationResponsesResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIntegrationResponses",
}));

export type GetIntegrationsError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets the Integrations for an API.
 */
export const getIntegrations: API.OperationMethod<
  GetIntegrationsRequest,
  GetIntegrationsResponse,
  GetIntegrationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetIntegrationsRequest,
  output: GetIntegrationsResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIntegrations",
}));

export type GetModelError =
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets a Model.
 */
export const getModel: API.OperationMethod<
  GetModelRequest,
  GetModelResponse,
  GetModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetModelRequest,
  output: GetModelResponse,
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetModel",
}));

export type GetModelsError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets the Models for an API.
 */
export const getModels: API.OperationMethod<
  GetModelsRequest,
  GetModelsResponse,
  GetModelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetModelsRequest,
  output: GetModelsResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetModels",
}));

export type GetModelTemplateError =
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets a model template.
 */
export const getModelTemplate: API.OperationMethod<
  GetModelTemplateRequest,
  GetModelTemplateResponse,
  GetModelTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetModelTemplateRequest,
  output: GetModelTemplateResponse,
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetModelTemplate",
}));

export type GetPortalError =
  | AccessDeniedException
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets a portal.
 */
export const getPortal: API.OperationMethod<
  GetPortalRequest,
  GetPortalResponse,
  GetPortalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPortalRequest,
  output: GetPortalResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPortal",
}));

export type GetPortalProductError =
  | AccessDeniedException
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets a portal product.
 */
export const getPortalProduct: API.OperationMethod<
  GetPortalProductRequest,
  GetPortalProductResponse,
  GetPortalProductError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPortalProductRequest,
  output: GetPortalProductResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPortalProduct",
}));

export type GetPortalProductSharingPolicyError =
  | AccessDeniedException
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets the sharing policy for a portal product.
 */
export const getPortalProductSharingPolicy: API.OperationMethod<
  GetPortalProductSharingPolicyRequest,
  GetPortalProductSharingPolicyResponse,
  GetPortalProductSharingPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPortalProductSharingPolicyRequest,
  output: GetPortalProductSharingPolicyResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPortalProductSharingPolicy",
}));

export type GetProductPageError =
  | AccessDeniedException
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets a product page of a portal product.
 */
export const getProductPage: API.OperationMethod<
  GetProductPageRequest,
  GetProductPageResponse,
  GetProductPageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetProductPageRequest,
  output: GetProductPageResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProductPage",
}));

export type GetProductRestEndpointPageError =
  | AccessDeniedException
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets a product REST endpoint page.
 */
export const getProductRestEndpointPage: API.OperationMethod<
  GetProductRestEndpointPageRequest,
  GetProductRestEndpointPageResponse,
  GetProductRestEndpointPageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetProductRestEndpointPageRequest,
  output: GetProductRestEndpointPageResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProductRestEndpointPage",
}));

export type GetRouteError =
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets a Route.
 */
export const getRoute: API.OperationMethod<
  GetRouteRequest,
  GetRouteResult,
  GetRouteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRouteRequest,
  output: GetRouteResult,
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRoute",
}));

export type GetRouteResponseError =
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets a RouteResponse.
 */
export const getRouteResponse: API.OperationMethod<
  GetRouteResponseRequest,
  GetRouteResponseResponse,
  GetRouteResponseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRouteResponseRequest,
  output: GetRouteResponseResponse,
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRouteResponse",
}));

export type GetRouteResponsesError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets the RouteResponses for a Route.
 */
export const getRouteResponses: API.OperationMethod<
  GetRouteResponsesRequest,
  GetRouteResponsesResponse,
  GetRouteResponsesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRouteResponsesRequest,
  output: GetRouteResponsesResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRouteResponses",
}));

export type GetRoutesError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets the Routes for an API.
 */
export const getRoutes: API.OperationMethod<
  GetRoutesRequest,
  GetRoutesResponse,
  GetRoutesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRoutesRequest,
  output: GetRoutesResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRoutes",
}));

export type GetRoutingRuleError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets a routing rule.
 */
export const getRoutingRule: API.OperationMethod<
  GetRoutingRuleRequest,
  GetRoutingRuleResponse,
  GetRoutingRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRoutingRuleRequest,
  output: GetRoutingRuleResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRoutingRule",
}));

export type GetStageError =
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets a Stage.
 */
export const getStage: API.OperationMethod<
  GetStageRequest,
  GetStageResponse,
  GetStageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetStageRequest,
  output: GetStageResponse,
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetStage",
}));

export type GetStagesError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets the Stages for an API.
 */
export const getStages: API.OperationMethod<
  GetStagesRequest,
  GetStagesResponse,
  GetStagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetStagesRequest,
  output: GetStagesResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetStages",
}));

export type GetTagsError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets a collection of Tag resources.
 */
export const getTags: API.OperationMethod<
  GetTagsRequest,
  GetTagsResponse,
  GetTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetTagsRequest,
  output: GetTagsResponse,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTags",
}));

export type GetVpcLinkError =
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets a VPC link.
 */
export const getVpcLink: API.OperationMethod<
  GetVpcLinkRequest,
  GetVpcLinkResponse,
  GetVpcLinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetVpcLinkRequest,
  output: GetVpcLinkResponse,
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetVpcLink",
}));

export type GetVpcLinksError =
  | BadRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets a collection of VPC links.
 */
export const getVpcLinks: API.OperationMethod<
  GetVpcLinksRequest,
  GetVpcLinksResponse,
  GetVpcLinksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetVpcLinksRequest,
  output: GetVpcLinksResponse,
  errors: [BadRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetVpcLinks",
}));

export type ImportApiError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Imports an API.
 */
export const importApi: API.OperationMethod<
  ImportApiRequest,
  ImportApiResponse,
  ImportApiError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ImportApiRequest,
  output: ImportApiResponse,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportApi",
}));

export type ListPortalProductsError =
  | AccessDeniedException
  | BadRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists portal products.
 */
export const listPortalProducts: API.OperationMethod<
  ListPortalProductsRequest,
  ListPortalProductsResponse,
  ListPortalProductsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListPortalProductsRequest,
  output: ListPortalProductsResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPortalProducts",
}));

export type ListPortalsError =
  | AccessDeniedException
  | BadRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists portals.
 */
export const listPortals: API.OperationMethod<
  ListPortalsRequest,
  ListPortalsResponse,
  ListPortalsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListPortalsRequest,
  output: ListPortalsResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPortals",
}));

export type ListProductPagesError =
  | AccessDeniedException
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists the product pages for a portal product.
 */
export const listProductPages: API.OperationMethod<
  ListProductPagesRequest,
  ListProductPagesResponse,
  ListProductPagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListProductPagesRequest,
  output: ListProductPagesResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProductPages",
}));

export type ListProductRestEndpointPagesError =
  | AccessDeniedException
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists the product REST endpoint pages of a portal product.
 */
export const listProductRestEndpointPages: API.OperationMethod<
  ListProductRestEndpointPagesRequest,
  ListProductRestEndpointPagesResponse,
  ListProductRestEndpointPagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListProductRestEndpointPagesRequest,
  output: ListProductRestEndpointPagesResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProductRestEndpointPages",
}));

export type ListRoutingRulesError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists routing rules.
 */
export const listRoutingRules: API.PaginatedOperationMethod<
  ListRoutingRulesRequest,
  ListRoutingRulesResponse,
  ListRoutingRulesError,
  Credentials | HttpClient.HttpClient,
  RoutingRule
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListRoutingRulesRequest,
  output: ListRoutingRulesResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRoutingRules",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RoutingRules",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type PreviewPortalError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a portal preview.
 */
export const previewPortal: API.OperationMethod<
  PreviewPortalRequest,
  PreviewPortalResponse,
  PreviewPortalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PreviewPortalRequest,
  output: PreviewPortalResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PreviewPortal",
}));

export type PublishPortalError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Publishes a portal.
 */
export const publishPortal: API.OperationMethod<
  PublishPortalRequest,
  PublishPortalResponse,
  PublishPortalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PublishPortalRequest,
  output: PublishPortalResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PublishPortal",
}));

export type PutPortalProductSharingPolicyError =
  | AccessDeniedException
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates the sharing policy for a portal product.
 */
export const putPortalProductSharingPolicy: API.OperationMethod<
  PutPortalProductSharingPolicyRequest,
  PutPortalProductSharingPolicyResponse,
  PutPortalProductSharingPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutPortalProductSharingPolicyRequest,
  output: PutPortalProductSharingPolicyResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutPortalProductSharingPolicy",
}));

export type PutRoutingRuleError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates a routing rule.
 */
export const putRoutingRule: API.OperationMethod<
  PutRoutingRuleRequest,
  PutRoutingRuleResponse,
  PutRoutingRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutRoutingRuleRequest,
  output: PutRoutingRuleResponse,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutRoutingRule",
}));

export type ReimportApiError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Puts an Api resource.
 */
export const reimportApi: API.OperationMethod<
  ReimportApiRequest,
  ReimportApiResponse,
  ReimportApiError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ReimportApiRequest,
  output: ReimportApiResponse,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ReimportApi",
}));

export type ResetAuthorizersCacheError =
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Resets all authorizer cache entries on a stage. Supported only for HTTP APIs.
 */
export const resetAuthorizersCache: API.OperationMethod<
  ResetAuthorizersCacheRequest,
  ResetAuthorizersCacheResponse,
  ResetAuthorizersCacheError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ResetAuthorizersCacheRequest,
  output: ResetAuthorizersCacheResponse,
  errors: [NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResetAuthorizersCache",
}));

export type TagResourceError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a new Tag resource to represent a tag.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TagResourceRequest,
  output: TagResourceResponse,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a Tag.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResponse,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateApiError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates an Api resource.
 */
export const updateApi: API.OperationMethod<
  UpdateApiRequest,
  UpdateApiResponse,
  UpdateApiError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateApiRequest,
  output: UpdateApiResponse,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApi",
}));

export type UpdateApiMappingError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * The API mapping.
 */
export const updateApiMapping: API.OperationMethod<
  UpdateApiMappingRequest,
  UpdateApiMappingResponse,
  UpdateApiMappingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateApiMappingRequest,
  output: UpdateApiMappingResponse,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApiMapping",
}));

export type UpdateAuthorizerError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates an Authorizer.
 */
export const updateAuthorizer: API.OperationMethod<
  UpdateAuthorizerRequest,
  UpdateAuthorizerResponse,
  UpdateAuthorizerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateAuthorizerRequest,
  output: UpdateAuthorizerResponse,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAuthorizer",
}));

export type UpdateDeploymentError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates a Deployment.
 */
export const updateDeployment: API.OperationMethod<
  UpdateDeploymentRequest,
  UpdateDeploymentResponse,
  UpdateDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDeploymentRequest,
  output: UpdateDeploymentResponse,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDeployment",
}));

export type UpdateDomainNameError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates a domain name.
 */
export const updateDomainName: API.OperationMethod<
  UpdateDomainNameRequest,
  UpdateDomainNameResponse,
  UpdateDomainNameError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDomainNameRequest,
  output: UpdateDomainNameResponse,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDomainName",
}));

export type UpdateIntegrationError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates an Integration.
 */
export const updateIntegration: API.OperationMethod<
  UpdateIntegrationRequest,
  UpdateIntegrationResult,
  UpdateIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateIntegrationRequest,
  output: UpdateIntegrationResult,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateIntegration",
}));

export type UpdateIntegrationResponseError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates an IntegrationResponses.
 */
export const updateIntegrationResponse: API.OperationMethod<
  UpdateIntegrationResponseRequest,
  UpdateIntegrationResponseResponse,
  UpdateIntegrationResponseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateIntegrationResponseRequest,
  output: UpdateIntegrationResponseResponse,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateIntegrationResponse",
}));

export type UpdateModelError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates a Model.
 */
export const updateModel: API.OperationMethod<
  UpdateModelRequest,
  UpdateModelResponse,
  UpdateModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateModelRequest,
  output: UpdateModelResponse,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateModel",
}));

export type UpdatePortalError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates a portal.
 */
export const updatePortal: API.OperationMethod<
  UpdatePortalRequest,
  UpdatePortalResponse,
  UpdatePortalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdatePortalRequest,
  output: UpdatePortalResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePortal",
}));

export type UpdatePortalProductError =
  | AccessDeniedException
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates the portal product.
 */
export const updatePortalProduct: API.OperationMethod<
  UpdatePortalProductRequest,
  UpdatePortalProductResponse,
  UpdatePortalProductError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdatePortalProductRequest,
  output: UpdatePortalProductResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePortalProduct",
}));

export type UpdateProductPageError =
  | AccessDeniedException
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates a product page of a portal product.
 */
export const updateProductPage: API.OperationMethod<
  UpdateProductPageRequest,
  UpdateProductPageResponse,
  UpdateProductPageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateProductPageRequest,
  output: UpdateProductPageResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProductPage",
}));

export type UpdateProductRestEndpointPageError =
  | AccessDeniedException
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates a product REST endpoint page.
 */
export const updateProductRestEndpointPage: API.OperationMethod<
  UpdateProductRestEndpointPageRequest,
  UpdateProductRestEndpointPageResponse,
  UpdateProductRestEndpointPageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateProductRestEndpointPageRequest,
  output: UpdateProductRestEndpointPageResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProductRestEndpointPage",
}));

export type UpdateRouteError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates a Route.
 */
export const updateRoute: API.OperationMethod<
  UpdateRouteRequest,
  UpdateRouteResult,
  UpdateRouteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateRouteRequest,
  output: UpdateRouteResult,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRoute",
}));

export type UpdateRouteResponseError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates a RouteResponse.
 */
export const updateRouteResponse: API.OperationMethod<
  UpdateRouteResponseRequest,
  UpdateRouteResponseResponse,
  UpdateRouteResponseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateRouteResponseRequest,
  output: UpdateRouteResponseResponse,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRouteResponse",
}));

export type UpdateStageError =
  | BadRequestException
  | ConflictException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates a Stage.
 */
export const updateStage: API.OperationMethod<
  UpdateStageRequest,
  UpdateStageResponse,
  UpdateStageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateStageRequest,
  output: UpdateStageResponse,
  errors: [
    BadRequestException,
    ConflictException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateStage",
}));

export type UpdateVpcLinkError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates a VPC link.
 */
export const updateVpcLink: API.OperationMethod<
  UpdateVpcLinkRequest,
  UpdateVpcLinkResponse,
  UpdateVpcLinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateVpcLinkRequest,
  output: UpdateVpcLinkResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateVpcLink",
}));

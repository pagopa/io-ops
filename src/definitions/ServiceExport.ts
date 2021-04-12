import * as t from "io-ts";
import {
  NonEmptyString,
  OrganizationFiscalCode
} from "italia-ts-commons/lib/strings";
import { enumType } from "italia-ts-commons/lib/types";
import { ServiceScopeEnum } from "../generated/ServiceScope";

const ServiceExportR = t.interface({
  i: NonEmptyString,
  n: NonEmptyString
});
type ServiceExportR = t.TypeOf<typeof ServiceExportR>;

const ServiceExportO = t.partial({
  d: NonEmptyString,
  sc: enumType<ServiceScopeEnum>(ServiceScopeEnum, "ServiceScope")
});
type ServiceExportO = t.TypeOf<typeof ServiceExportO>;

export const ServiceExport = t.intersection([ServiceExportR, ServiceExportO]);
export type ServiceExport = t.TypeOf<typeof ServiceExport>;

export const ServicesExport = t.interface({
  o: NonEmptyString,
  fc: OrganizationFiscalCode,
  s: t.readonlyArray(ServiceExport)
});

export type ServicesExport = t.TypeOf<typeof ServicesExport>;

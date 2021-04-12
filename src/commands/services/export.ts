import { Command, flags } from "@oclif/command";
import cli from "cli-ux";
import * as dotenv from "dotenv";
import { fromNullable, isNone, isSome } from "fp-ts/lib/Option";
// tslint:disable-next-line: no-submodule-imports
import { RetrievedService } from "io-functions-commons/dist/src/models/service";
import { DateTime } from "luxon";
import { ServiceExport, ServicesExport } from "../../definitions/ServiceExport";
import { ServiceScopeEnum } from "../../generated/ServiceScope";
import { getServices } from "../../utils/service";

dotenv.config();

const ServiceScope = {
  ...ServiceScopeEnum,
  ALL: "ALL"
};

export default class VisibleServicesExport extends Command {
  public static description = "Export visible services";

  public static flags = {
    date: flags.string({
      description:
        "filter services from specified day (Europe/Rome timezone, required format yyyy-MM-dd, ie 2020-05-25)",
      required: false
    }),
    extended: flags.boolean({ char: "x", description: "show extra columns" }),
    scope: flags.string({
      char: "s",
      description: "The service scope metadata",
      required: false,
      default: ServiceScope.ALL,
      options: Object.values(ServiceScope)
    })
  };

  // tslint:disable-next-line: cognitive-complexity
  public async run(): Promise<void> {
    const { flags: parsedFlags } = this.parse(VisibleServicesExport);

    const date = fromNullable(parsedFlags.date).map(_ =>
      DateTime.fromFormat(`${_} Europe/Rome`, "yyyy-MM-dd z")
    );

    if (isSome(date) && !date.value.isValid) {
      this.error("day is not valid");
      return;
    }
    try {
      cli.action.start("Querying services...");
      const services = await getServices(date);
      cli.action.stop();

      if (isNone(services)) {
        this.error("No result");
        return;
      }

      cli.action.start("Filtering visible services...");
      // get all visible services
      const visible = services.value.filter(x => {
        if (x.isVisible === false) {
          return false;
        }
        if (parsedFlags.scope === ServiceScope.ALL) {
          return true;
        }
        if (x.serviceMetadata?.scope) {
          return x.serviceMetadata.scope === parsedFlags.scope;
        }
        // Services without metadata are considered NATIONAL scoped
        return parsedFlags.scope === ServiceScope.NATIONAL;
      });
      cli.action.stop();

      cli.action.start("Remap services...");
      const serviceMapper = getServiceMapper(parsedFlags.extended);
      const organizationMap = visible.reduce((prev, _) => {
        if (prev[_.organizationFiscalCode]) {
          return {
            ...prev,
            [_.organizationFiscalCode]: {
              ...prev[_.organizationFiscalCode],
              s: [...prev[_.organizationFiscalCode].s, serviceMapper(_)]
            }
          };
        }
        return {
          ...prev,
          [_.organizationFiscalCode]: {
            o: _.organizationName,
            fc: _.organizationFiscalCode,
            s: [serviceMapper(_)]
          }
        };
      }, {} as Record<string, ServicesExport>);
      cli.action.stop();
      // tslint:disable-next-line: no-console
      console.log(
        JSON.stringify(
          Object.values(organizationMap).sort((a, b) =>
            a.o.toLowerCase().localeCompare(b.o.toLowerCase())
          )
        )
      );
    } catch (e) {
      this.error(e);
    }
  }
}

function getServiceMapper(
  extended: boolean
): (s: RetrievedService) => ServiceExport {
  return (service: RetrievedService) => {
    if (extended) {
      return {
        i: service.serviceId,
        n: service.serviceName,
        d: service.serviceMetadata?.description,
        sc: service.serviceMetadata?.scope || ServiceScopeEnum.NATIONAL
      };
    }
    return {
      i: service.serviceId,
      n: service.serviceName
    };
  };
}

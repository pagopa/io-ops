import chalk from "chalk";
import cli from "cli-ux";
import * as execa from "execa";

export interface IAzureConfig {
  configName: string;
  cosmosDatabaseName: string;
  cosmosProfilesContainer: string;
  cosmosMessagesContainer: string;
  cosmosMessageStatusContainer: string;
  cosmosNotificationContainer: string;
  cosmosNotificationStatusContainer: string;
  cosmosServicesContainer: string;
  cosmosName: string;
  resourceGroup: string;
  storageMessagesContainer: string;
  storageName: string;
}

export const agid: IAzureConfig = {
  configName: "agid-aks-k8s-01-test",
  cosmosDatabaseName: "agid-documentdb-test",
  cosmosMessagesContainer: "messages",
  cosmosMessageStatusContainer: "message-status",
  cosmosNotificationContainer: "notifications",
  cosmosNotificationStatusContainer: "notification-status",
  cosmosProfilesContainer: "profiles",
  cosmosServicesContainer: "services",
  cosmosName: "agid-cosmosdb-test",
  resourceGroup: "agid-rg-test",
  storageMessagesContainer: "message-content",
  storageName: "agidstoragetest"
};

export const dev: IAzureConfig = {
  configName: "io-dev-aks-k8s-01",
  cosmosDatabaseName: "io-dev-sqldb-db-01",
  cosmosMessagesContainer: "messages",
  cosmosMessageStatusContainer: "message-status",
  cosmosNotificationContainer: "notifications",
  cosmosNotificationStatusContainer: "notification-status",
  cosmosProfilesContainer: "profiles",
  cosmosServicesContainer: "services",
  cosmosName: "io-dev-cosmosdb-01",
  resourceGroup: "io-dev-rg",
  storageMessagesContainer: "message-content",
  storageName: "iodevsaappdata"
};

export const prod: IAzureConfig = {
  configName: "io-p-cosmos-api",
  cosmosDatabaseName: "db",
  cosmosMessagesContainer: "messages",
  cosmosMessageStatusContainer: "message-status",
  cosmosNotificationContainer: "notifications",
  cosmosNotificationStatusContainer: "notification-status",
  cosmosProfilesContainer: "profiles",
  cosmosServicesContainer: "services",
  cosmosName: "io-p-cosmos-api",
  resourceGroup: "io-p-rg-internal",
  storageMessagesContainer: "message-content",
  storageName: ""
};
interface IConfigs {
  [key: string]: IAzureConfig;
}
const configs: IConfigs = { agid, dev, prod };

export const pickAzureConfig = async (): Promise<IAzureConfig> => {
  const options = Object.keys(configs)
    .map((c, i) => `${i + 1} - ${c}`)
    .join("\n");
  const choice = await cli.prompt(`select azure config:\n${options}\n`, {
    default: "0"
  });
  const defaultValue = configs[Object.keys(configs)[0]];
  if (isNaN(choice)) {
    return defaultValue;
  }
  const index = parseInt(choice, 10) - 1;
  if (index < 0 || index > options.length) {
    return defaultValue;
  }
  const config = configs[Object.keys(configs)[index]];
  cli.action.start(
    chalk.cyanBright(
      `Retrieving azure credentials for '${
        Object.keys(configs)[index]
      }' config...`
    )
  );
  cli.action.stop();
  return config;
};

export const getCosmosEndpoint = async (resourceGroup: string, name: string) =>
  (
    await execa(
      `az cosmosdb show -g ${resourceGroup} -n ${name} --query documentEndpoint -o tsv`
    )
  ).stdout;

export const getCosmosReadonlyKey = async (
  resourceGroup: string,
  name: string
) =>
  (
    await execa(
      `az cosmosdb list-keys -g ${resourceGroup} -n ${name} --query primaryReadonlyMasterKey -o tsv`
    )
  ).stdout;

export const getCosmosWriteKey = async (resourceGroup: string, name: string) =>
  (
    await execa(
      `az cosmosdb list-keys -g ${resourceGroup} -n ${name} --query primaryMasterKey -o tsv`
    )
  ).stdout;

export const getCosmosConnection = async (
  resourceGroup: string,
  name: string
) => {
  const [endpoint, key] = await Promise.all([
    getCosmosEndpoint(resourceGroup, name),
    getCosmosReadonlyKey(resourceGroup, name)
  ]);
  return { endpoint, key };
};

export const getCosmosWriteConnection = async (
  resourceGroup: string,
  name: string
) => {
  const [endpoint, key] = await Promise.all([
    getCosmosEndpoint(resourceGroup, name),
    getCosmosWriteKey(resourceGroup, name)
  ]);
  return { endpoint, key };
};

export const getStorageConnection = async (name: string) =>
  (
    await execa(
      `az storage account show-connection-string --name ${name} --output tsv`
    )
  ).stdout;

/**
 * hasCosmosConnection checks if the host has az cli installed and resouceGroup and name
 * are valid inputs for cosmosdb
 */
export const hasCosmosConnection = async (
  resourceGroup: string,
  name: string
) => {
  try {
    const successExitCode = "SUCCESS";
    const documentEndpoint = await execa(
      `az cosmosdb show -g ${resourceGroup} -n ${name} --query documentEndpoint -o tsv`
    );
    const primaryReadonlyMasterKey = await execa(
      `az cosmosdb list-keys -g ${resourceGroup} -n ${name} --query primaryReadonlyMasterKey -o tsv`
    );

    return (
      documentEndpoint.exitCodeName === successExitCode &&
      primaryReadonlyMasterKey.exitCodeName === successExitCode
    );
  } catch (e) {
    return false;
  }
};

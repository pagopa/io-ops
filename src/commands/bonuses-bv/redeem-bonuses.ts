import { Command, flags } from "@oclif/command";
import { BlobServiceClient } from "@azure/storage-blob";
import { pickAzureConfig, getStorageConnection } from "../../utils/azure";
import fetch from "node-fetch";
import * as fs from "fs";
import cli from "cli-ux";

interface OutputResult {
  file: string;
  statusCode: string;
}

export default class RedeemBonuses extends Command {
  public static description = "Download and reprocess redeemed bonuses";

  public static args = [];

  public static flags = {
    tmpDir: flags.string({
      char: "o",
      default: "tmp",
      description: "temp directory",
      required: true
    }),
    containerFolder: flags.string({
      char: "c",
      description: "container folder",
      required: true
    }),
    apiUrl: flags.string({
      char: "u",
      default: "https://api-gad.io.italia.it/api/bonus-vacanze/v1/redeemed",
      description: "api url",
      required: true
    }),
    apiKey: flags.string({
      char: "k",
      description: "api key",
      required: true
    })
  };

  public async run(): Promise<void> {
    const { flags: parsedFlags } = this.parse(RedeemBonuses);

    let redeemedRequests = Array<string>();
    let outputResults = Array<OutputResult>();

    try {
      const config = await pickAzureConfig();

      const storageConnection = await getStorageConnection(config.storageName);

      const blobServiceClient = BlobServiceClient.fromConnectionString(
        storageConnection
      );

      const containerClient = blobServiceClient.getContainerClient(
        config.storageBonusRedeemedContainer
      );

      if (
        !fs.existsSync(parsedFlags.tmpDir + "/" + parsedFlags.containerFolder)
      ) {
        fs.mkdirSync(parsedFlags.tmpDir + "/" + parsedFlags.containerFolder, {
          recursive: true
        });
      }

      this.log("\nListing blobs...");
      cli.action.start("Downloading redeemed requests started...");
      // List and download the blob(s) in the container.
      for await (const blob of containerClient.listBlobsFlat({
        prefix: parsedFlags.containerFolder
      })) {
        this.log("\t", blob.name);
        const blockBlobClient = containerClient.getBlockBlobClient(blob.name);
        const response = await blockBlobClient.downloadToFile(
          parsedFlags.tmpDir + "/" + blob.name
        );
        redeemedRequests.push(parsedFlags.tmpDir + "/" + blob.name);
      }
      cli.action.stop("Downloading redeemed requests finished...");

      cli.action.start("Sending redeemed requests started...");
      // Send redeemed requests
      for (const redeemedRequest of redeemedRequests) {
        this.log(redeemedRequest);
        const rawDataRequest = fs.readFileSync(
          redeemedRequest,
          "utf8"
        ) as string;
        const rawDataResponse = await fetch(parsedFlags.apiUrl, {
          method: "POST",
          headers: {
            "Ocp-Apim-Subscription-Key": parsedFlags.apiKey,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(rawDataRequest)
        });
        const content = await rawDataResponse.json();
        outputResults.push({
          file: redeemedRequest,
          statusCode: rawDataResponse.status.toString()
        });
        // pause 1 second to avoid 429 statusCode response
        await this.delay(1000);
      }
      cli.action.stop("Sending redeemed requests finished...");

      cli.table(
        outputResults,
        {
          file: {
            header: "file"
          },
          statusCode: {
            header: "statusCode"
          }
        },
        {
          printLine: this.log,
          ...parsedFlags
        }
      );
    } catch (e) {
      this.error(e);
    }
  }

  private async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
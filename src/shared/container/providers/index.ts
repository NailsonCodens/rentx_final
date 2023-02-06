import { container } from "tsyringe";

import { IDateProvider } from "@shared/container/providers/DateProvider/IDateprovider";
import { DayjsDateprovider } from "@shared/container/providers/DateProvider/implementations/DayjsDateprovider";

import { IMailProvider } from "./MailProvider/IMailProvider";
import { EtherealMailProvider } from "./MailProvider/implementations/EtherealMailProvider";
import { LocalStorageProvider } from "./StorageProvider/implementations/LocalStorageProvider";
import { IStorageProvider } from "./StorageProvider/IStorageProvider";
import { S3StorageProvider } from "./StorageProvider/S3StorageProvider";

container.registerSingleton<IDateProvider>("DayjsProvider", DayjsDateprovider);
container.registerInstance<IMailProvider>(
  "EtherealMailProvider",
  new EtherealMailProvider()
);

const diskStorage = {
  local: LocalStorageProvider,
  S3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  diskStorage[process.env.disk]
);

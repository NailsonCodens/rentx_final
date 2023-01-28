import { container } from "tsyringe";

import { IDateProvider } from "@shared/container/providers/DateProvider/IDateprovider";
import { DayjsDateprovider } from "@shared/container/providers/DateProvider/implementations/DayjsDateprovider";

import { IMailProvider } from "./MailProvider/IMailProvider";
import { EtherealMailProvider } from "./MailProvider/implementations/EtherealMailProvider";

container.registerSingleton<IDateProvider>("DayjsProvider", DayjsDateprovider);
container.registerInstance<IMailProvider>(
  "EtherealMailProvider",
  new EtherealMailProvider()
);

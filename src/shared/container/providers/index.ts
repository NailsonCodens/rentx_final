import { container } from "tsyringe";

import { IDateProvider } from "@shared/container/providers/DateProvider/IDateprovider";
import { DayjsDateprovider } from "@shared/container/providers/DateProvider/implementations/DayjsDateprovider";

container.registerSingleton<IDateProvider>("DayjsProvider", DayjsDateprovider);

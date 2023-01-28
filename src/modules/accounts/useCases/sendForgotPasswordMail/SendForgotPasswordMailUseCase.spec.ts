import { UserRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserRepositoryInMemory";
import { UsersTokenRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateprovider } from "@shared/container/providers/DateProvider/implementations/DayjsDateprovider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UserRepositoryInMemory;
let dateProvider: DayjsDateprovider;
let usersTokenRepositoryInMemory: UsersTokenRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe("Send forgot mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UserRepositoryInMemory();
    dateProvider = new DayjsDateprovider();
    usersTokenRepositoryInMemory = new UsersTokenRepositoryInMemory();
    mailProvider = new MailProviderInMemory();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokenRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  it("Should be ble to send a forgot password mail to user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");

    await usersRepositoryInMemory.create({
      driver_license: "925837",
      email: "ku@fu.si",
      name: "Joshua Logan",
      password: "1234",
    });

    await sendForgotPasswordMailUseCase.execute("ku@fu.si");

    expect(sendMail).toHaveBeenCalled();
  });

  it("Should not be ble to send a forgot email if user does not exists", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("zuoggu@wedzim.tf")
    ).rejects.toEqual(new AppError("User does not exists"));
  });

  it("Should be ble to create an users token ", async () => {
    const generateTokenMail = jest.spyOn(
      usersTokenRepositoryInMemory,
      "create"
    );

    await usersRepositoryInMemory.create({
      driver_license: "448618",
      email: "isa@dodjob.pr",
      name: "Mabelle Hunt",
      password: "1234",
    });

    await sendForgotPasswordMailUseCase.execute("isa@dodjob.pr");

    expect(generateTokenMail).toBeCalled();
  });
});

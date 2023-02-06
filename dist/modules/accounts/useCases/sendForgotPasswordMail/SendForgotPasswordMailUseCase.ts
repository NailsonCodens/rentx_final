import { resolve } from "path";
import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 } from "uuid";

import { IUserRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateprovider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import { AppError } from "@shared/errors/AppError";

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUserRepository,
    @inject("UsersTokensRepository")
    private UsersTokensRepository: IUsersTokensRepository,
    @inject("DayjsProvider")
    private dayjsProvider: IDateProvider,
    @inject("EtherealMailProvider")
    private mailProvider: IMailProvider
  ) {}
  async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    const templatePath = resolve(
      __dirname,
      "..",
      "..",
      "views",
      "emails",
      "forgotPassword.hbs"
    );

    if (!user) {
      throw new AppError("User does not exists");
    }

    const tokenEmail = uuidV4();

    const expires_date = this.dayjsProvider.addHours(3);

    await this.UsersTokensRepository.create({
      refresh_token: tokenEmail,
      user_id: user.id,
      expires_date,
    });

    const variables = {
      name: user.email,
      link: `${process.env.FORGOT_MAIL_URL}${tokenEmail}`,
    };

    await this.mailProvider.sendMail(
      email,
      "Recuperação de senha",
      variables,
      templatePath
    );
  }
}

export { SendForgotPasswordMailUseCase };

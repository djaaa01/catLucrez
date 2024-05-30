import {ComponentHarness, TestElement, TestKey} from "@angular/cdk/testing";

export const byTestId = (id: string): string => `[data-testid=${id}]`

export class LoginHarness extends ComponentHarness {
  static hostSelector = 'app-login';

  private readonly getEmailInput = this.locatorFor(byTestId('emailInput'))
  private readonly getPasswordInput = this.locatorFor(byTestId('passwordInput'))
  private readonly getLoginBtn = this.locatorFor(byTestId('loginBtn'))


  async getEmail(): Promise<string> {
    const input = await this.getEmailInput();

    return input.getProperty('value');
  }

  async setEmail(email: string): Promise<void> {
    const input = await this.getEmailInput();

    if (await input.getProperty('disabled')) {
      return;
    }

    return this.setInputValue(input, email)
  }

  async getPassword(): Promise<string> {
    const input = await this.getPasswordInput();

    return input.getProperty('value');
  }

  async setPassword(password: string): Promise<void> {
    const input = await this.getPasswordInput();

    if (await input.getProperty('disabled')) {
      return;
    }

    return this.setInputValue(input, password)
  }

  async login(): Promise<void> {
    const button = await this.getLoginBtn();

    return button.click()
  }

  async isLoading(): Promise<boolean> {
    const button = await this.getLoginBtn();

    return button.hasClass('loading')
  }

  private async setInputValue(input: TestElement, value: string): Promise<void> {
    const isReadonly = await input.getProperty('readonly');
    const isDisabled = await input.getProperty('disabled');

    if (isReadonly || isDisabled) {
      return;
    }

    await input.focus();
    await this.clearInput(input);

    if (value) {
      await input.sendKeys(value.toString());
      await input.setInputValue(value.toString());
    }

    return input.blur();
  }

  private readonly clearInput = async (input: TestElement): Promise<void> => {
    await input.clear();
    await input.sendKeys(TestKey.BACKSPACE);
  };
}

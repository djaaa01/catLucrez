import {Component} from "@angular/core";
import {createComponentFactory, Spectator} from "@ngneat/spectator/jest";
import {LoginComponent} from "./login.component";
import {TestbedHarnessEnvironment} from "@angular/cdk/testing/testbed";
import {LoginHarness} from "./login.component.harness";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../../../shared/shared.module";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {AuthService} from "../../core/services/auth.service";
import {noop} from "rxjs";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {RouterTestingHarness, RouterTestingModule} from "@angular/router/testing";
import {NotifierService} from "angular-notifier";
import {HelperService} from "../../../../shared/core/services/helper.service";


@Component({
  selector: 'host',
  template: `
    <app-login/>`
})
class HostComponent {
}

describe('Login Component', () => {
  let spectator: Spectator<HostComponent>;
  let harness: LoginHarness

  const createComponent = createComponentFactory({
    component: HostComponent,
    declarations: [
      LoginComponent
    ],
    imports: [
      FormsModule,
      CommonModule, SharedModule,
      RouterTestingModule

    ],
    providers: [
      {
        provide: AuthService,
        useFactory: () => ({
          login: () => noop()
        })
      },
      {
        provide: NotifierService,
        useFactory: () => ({
          notify: () => noop()
        })
      },
      {
        provide: HelperService,
        useFactory: () => ({
          getErrorMessage: (value: string) => value
        })
      }
    ]
  })

  beforeEach(async () => {
    spectator = createComponent();

    const loader = TestbedHarnessEnvironment.loader(spectator.fixture)
    harness = await loader.getHarness(LoginHarness);
  })

  describe('Email Input', () => {

    test('should start off with no value', async () => {
      expect(await harness.getEmail()).toBe('')
    })

    test('should be able to type in an email', async () => {
      expect(await harness.getEmail()).toBe('')
      await harness.setEmail('some@gmail.com');
      expect(await harness.getEmail()).toBe('some@gmail.com')
    })
  })

  describe('Password Input', () => {
    test('should start off with no value', async () => {
      expect(await harness.getPassword()).toBe('')
    })

    test('should be able to type in a password', async () => {
      expect(await harness.getPassword()).toBe('')
      await harness.setPassword('parola123');
      expect(await harness.getPassword()).toBe('parola123')
    })
  })

  describe('Submit', () => {
    let loginSpy: jest.SpyInstance;
    let resolveLoginPromise: any;
    let failLoginPromise: any;
    let navigateSpy: jest.SpyInstance;

    beforeEach(() => {
      loginSpy = jest.spyOn(spectator.inject(AuthService), 'login').mockImplementationOnce(() => new Promise((resolve, reject) => {
        resolveLoginPromise = resolve;
        failLoginPromise = reject
      }))


      navigateSpy = jest.spyOn(spectator.inject(Router), 'navigate').mockImplementationOnce(jest.fn());
    })

    test('should NOT be able to login if no email was entered', async () => {
      await harness.setPassword('parola123');
      await harness.login();

      expect(loginSpy).not.toHaveBeenCalled()
    })


    test('should NOT be able to login if no password was entered', async () => {
      await harness.setEmail('test@gmail.com');
      await harness.login();

      expect(loginSpy).not.toHaveBeenCalled()
    })


    test('should be able to login if password and email were entered', async () => {
      await harness.setEmail('test@gmail.com');
      await harness.setPassword('parola123');
      await harness.login();

      expect(loginSpy).toHaveBeenCalledTimes(1);
      expect(loginSpy).toHaveBeenCalledWith('test@gmail.com', 'parola123')
    })

    test('should NOT be in a loading state from the start', async () => {
      expect(await harness.isLoading()).toBe(false)
    })

    test('should be in a loading state until the login request finishes successfully', async () => {
      expect(await harness.isLoading()).toBe(false)

      await harness.setEmail('test@gmail.com');
      await harness.setPassword('parola123');
      await harness.login();

      expect(await harness.isLoading()).toBe(true);

      resolveLoginPromise();

      expect(await harness.isLoading()).toBe(false);
    })

    test('should be in a loading state until the login request fails', async () => {
      expect(await harness.isLoading()).toBe(false)

      await harness.setEmail('test@gmail.com');
      await harness.setPassword('parola123');
      await harness.login();

      expect(await harness.isLoading()).toBe(true);

      failLoginPromise();

      expect(await harness.isLoading()).toBe(false);
    })

    test('should display an error message on failed login', async () => {
      const notifySpy = jest.spyOn(spectator.inject(NotifierService), 'notify');


      await harness.setEmail('test@gmail.com');
      await harness.setPassword('parola123');
      await harness.login();

      await failLoginPromise({code: '123'});

      expect(notifySpy).toHaveBeenCalledTimes(1);
      expect(notifySpy).toHaveBeenCalledWith('error', '123')
    })

    describe('Navigation', () => {

      test('should navigate to project on succesful login', async () => {
        await harness.setEmail('test@gmail.com');
        await harness.setPassword('parola123');
        await harness.login();

        await resolveLoginPromise();

        expect(navigateSpy).toHaveBeenCalledTimes(1);
        expect(navigateSpy).toHaveBeenCalledWith(['/projects'])
      })

      test('should NOT navigate to project on failed login', async () => {
        await harness.setEmail('test@gmail.com');
        await harness.setPassword('parola123');
        await harness.login();

        await failLoginPromise();

        expect(navigateSpy).not.toHaveBeenCalled();
      })
    })
  })
})

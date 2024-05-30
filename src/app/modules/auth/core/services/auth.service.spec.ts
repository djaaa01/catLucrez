import {AuthService} from "./auth.service";
import {createServiceFactory, SpectatorService} from "@ngneat/spectator/jest";
import {Auth, User} from "@angular/fire/auth";
import {FirestoreService} from "../../../../shared/core/services/firestore.service";

class MockFirebaseAuthService {

  get currentUser(): User | null {
    return this._currentUser
  }

  private _currentUser: User | null = null;

  setCurrentUser(user: Partial<User> | null): void {
    this._currentUser = user as any;
  }
}


describe('Auth Service', () => {
  let spectator: SpectatorService<AuthService>;

  const createService = createServiceFactory({
    service: AuthService,
    providers: [
      {
        provide: Auth,
        useClass: MockFirebaseAuthService
      },
      {
        provide: FirestoreService,
        useFactory: () => ({})
      }
    ]
  })

  beforeEach(() => {
    spectator = createService()
  })


  describe('getCurrentUse', () => {
    test('should return null if there is no logged in user', () => {
      expect(spectator.service.getCurrentUse()).toBeNull()
    })


    test('should return null if there is a logged in user', () => {
      const mockUser: Partial<User> = {
        email: 'someuser@gmail.com'
      }

      const firebaseAuthService = spectator.inject(Auth) as unknown as MockFirebaseAuthService;

      firebaseAuthService.setCurrentUser(mockUser)

      expect(spectator.service.getCurrentUse()).toEqual(mockUser
      )
    })
  })
})

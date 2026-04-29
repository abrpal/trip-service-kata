import TripService from '../src/trip/TripService';
import UserNotLoggedInException from '../src/exception/UserNotLoggedInException';
import User from '../src/user/User';
import Trip from '../src/trip/Trip';


describe('User Not Logged In Exception', () => {
    
    class TestableTripService extends TripService {
        protected getLoggedUser(): User | null {
            return null;
        }
    }
    
    it('should throw UserNotLoggedInException', () => {
        const testTripService = new TestableTripService();
        const anyUser = new User();
        
        expect(() => testTripService.getTripsByUser(anyUser)).toThrow(UserNotLoggedInException);
    });
});


describe('User Logged In, Is Friend', () => {
    it('should return trips', () => {
        
        const loggedUser = new User();
        const anyUser = new User();
        
        class TestableTripService extends TripService {
            protected getLoggedUser(): User | null {
                return loggedUser;
            }
            
            protected findTripsByUser(user: User): Trip[] {
                return [new Trip()];
            }
        }
        
        const testTripService = new TestableTripService();
        
        anyUser.addFriend(loggedUser);
        
        const trips = testTripService.getTripsByUser(anyUser);
        expect(trips).toEqual([new Trip()]);
    });
});

describe('User Logged In, Is not Friend', () => {
    it('should return no trips', () => {
        const loggedUser = new User();
        
        class TestableTripService extends TripService {
            protected getLoggedUser(): User | null {
                return loggedUser;
            }
        }
        
        const testTripService = new TestableTripService();
        const anyUser = new User();
        
        const trips = testTripService.getTripsByUser(anyUser);
        expect(trips).toEqual([]);
    });
});
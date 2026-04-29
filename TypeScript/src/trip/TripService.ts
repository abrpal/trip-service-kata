import UserNotLoggedInException from "../exception/UserNotLoggedInException";
import User from "../user/User";
import UserSession from "../user/UserSession";
import Trip from "./Trip";
import TripDAO from "./TripDAO";

export default class TripService {
    public getTripsByUser(user: User): Trip[] {
        const loggedUser: User | null = this.getLoggedUser();
        
        if (loggedUser === null) {
            throw new UserNotLoggedInException();
        }

        if (user.getFriends().includes(loggedUser)) {
            return this.findTripsByUser(user);
        }

        return [];
    }
    
    protected findTripsByUser(user: User): Trip[] {
        return TripDAO.findTripsByUser(user);
    }
    
    protected getLoggedUser(): User | null {
        return UserSession.getLoggedUser();
    }
}

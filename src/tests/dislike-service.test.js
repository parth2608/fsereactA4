import {findAllTuitsDislikedByUser, findAllUsersThatDislikedTuit, userDislikesTuit} from "../services/dislikes-service";
import {createUser, deleteUsersByUsername} from "../services/users-service";
import {createTuit, deleteTuit, findTuitById} from "../services/tuits-service";
describe("dislike services", () => {
    const ripley = {username: "bob", password: "123", email: "bob@123.com",};
    const anna = {username: "alice", password: "123", email: "alice@123.com",};

    const tuit = {tuit: "test tuit"};
    let userId1;
    let userId2;
    let tid;
    let tid2;
    beforeAll(async () => {
        const user1 = await createUser(ripley);
        userId1 = user1._id;
        const user2 = await createUser(anna);
        userId2 = user2._id;
        const newTuit = await createTuit(userId1, tuit);
        tid = newTuit._id;
    });

    afterAll(async () => {
        await deleteTuit(tid);
        await deleteUsersByUsername(ripley.username);
        await deleteUsersByUsername(anna.username);
        await deleteTuit(tid2);
    });

    test("tuit-stats updated on dislike", async () => {
        await userDislikesTuit(userId1, tid);
        const tuit = await findTuitById(tid);
        expect(tuit.stats.dislikes).toBe(1);
    });

    test("list of users who dislike a tuit", async () => {
        await userDislikesTuit(userId2, tid);
        const users = await findAllUsersThatDislikedTuit(tid);
        console.log(users);
        expect(users.length).toBe(2);
    });

    test("list of tuits disliked by a user", async () => {
        const newTuit = await createTuit(userId1, {tuit: "sample tuit 1"});
        await userDislikesTuit(userId1, newTuit._id);
        const dislikedTuits = await findAllTuitsDislikedByUser(userId1);
        expect(dislikedTuits.length).toBe(2);
        tid2 = newTuit._id;
    });

    test("pressing the dislike button second time toggles dislike", async () => {
        await userDislikesTuit(userId1, tid);
        const dislikedTuits = await findAllTuitsDislikedByUser(userId1);
        expect(dislikedTuits.length).toBe(1);
        const tuit = await findTuitById(tid);
        expect(tuit.stats.dislikes).toBe(1);
    });
});
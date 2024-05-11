class UsersController {
    // Users list
    users = [];

    // Log list by user
    logs = [];

    constructor() {
        this.create = this.create.bind(this);
        this.getAll = this.getAll.bind(this);   
        this.getLogsByUserId = this.getLogsByUserId.bind(this);
    }
    
    generateId() {
        return Math.random().toString(36).substring(2, 16);
    }

    getUserIndexByUserId(userId) {
        return usersController.users.findIndex(user => user._id === userId);
    }

    addExercise(userId, data) {
        const user = this.getUserIndexByUserId(userId);
        if(user === -1) {
            throw new Error("User not found")
        }
        if (!this.users[userIndex].exercises) {
            this.users[userIndex].exercises = [];
        }
        this.users[userIndex].exercises.push(data);
    }
       
    async create(req, res) {
        const { username } = req.body;
        const newUser = { username, _id: this.generateId()};
        this.users.push(newUser);
        res.json(newUser);
    }

    async getAll(req, res) {
        res.json(this.users)
    }

    async getLogsByUserId(req, res) {
        const userId = req.params.id;
        const user = this.users.find(user => user._id === userId);
        if (user) {
            const log = {
                username: user.username,
                count: user.exercises ? user.exercises.length : 0,
                _id: user._id,
                log: user.exercises || []
            };
            res.json(log);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    }
}

const usersController = new UsersController();

export default usersController;
 
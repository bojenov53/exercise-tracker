class UsersController {
    constructor() {
        this.createUser = this.createUser.bind(this);
        this.getAllUser = this.getAllUser.bind(this);
        this.createExercise = this.createExercise.bind(this);
        this.getUserLogs = this.getUserLogs.bind(this);
    }
    
    users = [];
    logs = [];

    generateId() {
        return Math.random().toString(36).substring(2, 16);
    }
       
    async createUser(req, res) {
        const { username } = req.body;
        const newUser = { username, _id: this.generateId()};
        this.users.push(newUser);
        res.json(newUser);
    }

    async getAllUser(req, res) {
        res.json(this.users)
    }

    async createExercise(req, res) {
        const userId = req.params.id;
        const { description, duration, date } = req.body;
        const userIndex = this.users.findIndex(user => user._id === userId);
        if (userIndex !== -1) {
            const newExercise = { description, duration: parseInt(duration), date: date ? new Date(date).toDateString() : new Date().toDateString() };
            if (!this.users[userIndex].exercises) {
                this.users[userIndex].exercises = [];
            }
            this.users[userIndex].exercises.push(newExercise);
            res.json({ username: this.users[userIndex].username, ...newExercise });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    }

    async getUserLogs(req, res) {
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
 
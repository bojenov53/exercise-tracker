import usersController from "./usersController";

class ExercisesController {
    constructor() {
        this.create = this.create.bind(this);
    }

    async create(req, res) {
        const userId = req.params.id;
        const { description, duration, date } = req.body;
        const newExercise = { 
            description, 
            duration: parseInt(duration), 
            date: date ? new Date(date).toDateString() : new Date().toDateString() 
        };

        try {
            usersController.addExercise(userId, newExercise);       
            res.json({ newExercise });
        } catch (error) {
            res.status(404).json({ message: e.message});
        }

    }
}

const exercisesController = new ExercisesController();

export default exercisesController;
 
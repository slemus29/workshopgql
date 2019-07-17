import mongoose from 'mongoose';

const ProjectSchema = mongoose.Schema({
    name: {
        require: true,
        type: String,
    },
    description:String,
    team:{
        type: String,
        require: true,
        enum:[
            'UI',
            'QA',
            'DESIGN',
            'ADMIN',
        ]
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }]
});

export default mongoose.model("Project", ProjectSchema, 'projects');

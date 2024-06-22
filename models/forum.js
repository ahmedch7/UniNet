import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

const forumSchema = new Schema({
    titreForum: { 
        type: String, 
        required: true, 
        minlength:3, 
        maxlength:100,
        validate: {
            validator: async function(value) {
                const existingForum = await this.constructor.findOne({ titreForum: value });
                return !existingForum;   
            },
            message:  props => `Le titre du forum '${props.value}' existe déjà!`
        },
        match: /^[a-zA-Z0-9\- ]+$/
            
    },

    descriptionForum: { type: String },
    category: { type: String, required: true},
    userId: { type: Types.ObjectId, required: true, ref: 'user' },
}, {
    timestamps: true
});

export default model('Forum', forumSchema);

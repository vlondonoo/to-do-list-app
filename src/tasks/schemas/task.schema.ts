import * as mongoose from 'mongoose';

export const TaskSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: String,
});
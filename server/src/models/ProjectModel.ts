import mongoose, { Document, Schema } from 'mongoose';

export interface Project {
    videoLink: string;
    projectName: string;
    description: string;
    viewCode: string;
    visitSite: string;
    user: string;
}

export interface ProjectModel extends Project, Document {}

const ProjectSchema = new Schema(
    {
        videoLink: { type: 'String', required: true },
        projectName: { type: 'String', required: true },
        description: { type: 'String', required: true },
        viewCode: { type: 'String', required: true },
        visitSite: { type: 'String', required: true },
        user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
        isDeleted: { type: 'Boolean', default: false }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<ProjectModel>('project', ProjectSchema);

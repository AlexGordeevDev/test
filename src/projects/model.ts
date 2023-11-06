import {ProjectExceptions} from "./exaptions";
import {get_message} from "./messages";
import {generateRandomInteger} from "./utils";
import {v4 as uuidv4} from 'uuid';

class Generic {
    id: number
    uid: string
    created: Date

    public constructor() {
        this.id = generateRandomInteger(1, 1000)
        this.created = new Date()
        this.uid = uuidv4()
    }

}

class ProjectStageTask extends Generic {

    project_id: number
    order: number
    private _previous_task: ProjectStageTask
    private _compleat_at?: Date

    public set compleat_at(date: Date) {
        if (!this.previous_task.is_completed) {
            throw new ProjectExceptions(get_message('task_not_done'))
        }
        this._compleat_at = date
    }

    public get compleat_at() {
        return this._compleat_at
    }

    public set previous_task(task: ProjectStageTask) {
        this._previous_task = task
    }

    public get previous_task() {
        return this._previous_task
    }

    public get is_completed() {
        return this._compleat_at !== null
    }
}

class ProjectStage extends Generic {
    name: string
    project_id: number
    tasks: Array<ProjectStageTask>
    private _previous_stage: ProjectStage

    public constructor(props) {
        super(props);
        this.name = props.name
        this.project_id = props.project_id
    }

    public get is_compleat() {
        if (!this.tasks.length) {
            return false
        }
        return this.tasks.find((task) => {
            return task.compleat_at !== null
        }) === null
    }

    public set previous_stage(stage: ProjectStage) {
        this._previous_stage = stage
    }

    public get previous_stage() {
        return this._previous_stage
    }

    public is_unlocked() {
        return this._previous_stage.is_compleat
    }
}

class Project extends Generic {
    constructor(public name?: string) {
        super()
        this.name = name ? name : `New project: #${this.id}`
    }

    stages?: Array<ProjectStage> = []

    public get is_completed() {
        return this.stages.find((stage) => {
            return !stage.is_compleat
        }) === null
    }

    public startStage(name: string): ProjectStage {
        const stage =
            new ProjectStage(
                name,
                this.id
            )
        this.stages.push(stage)
        return stage
    }
}

export class ProjectApplication {
    private _projects: Array<Project> = []

    public init(first_project_name?: string) {
        this.add_project(first_project_name)
    }

    public get projects() {
        return this._projects
    }

    public set projects(projects: Array<Project>) {
        this._projects = projects
    }

    public get_project_by_uid(uid: string): Project {
        return this.projects.find(item => item.uid === uid)
    }

    public add_project(name: string) {
        /**
         * Should be  validation to make names unique
         */
        const project = new Project(name)
        this.projects.push(project)
        return project
    }

    public add_stage(project_uid: string, name: string) {
        const project = this.get_project_by_uid(project_uid)
        if (!project) {
            throw new ProjectExceptions(get_message('project_not_done'))
        }
        return project.startStage(name)
    }
}
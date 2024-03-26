export default class Task {
    id: number;
    title: string;
    description: string;
    status: string;
    assigned_user_id: number | null;

    constructor(id: number, title: string, description: string, status: string, assigned_user_id: number | null) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.assigned_user_id = assigned_user_id;
    }
}

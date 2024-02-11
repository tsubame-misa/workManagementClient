type user = {
    user_id: string,
    student_id?: string,
    user_name?: string,
    name?:string,
}

type project = {
    id: number,
    name: string,
    user_id: string,
    total_seconds: number,
    working:boolean,
}

type userProject = {
    user: user,
    projects: project,
}
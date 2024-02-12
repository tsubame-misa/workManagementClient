type user = {
    user_id: string,
    student_id?: string,
    user_name?: string,
    name?: string,
    icon?: string,
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
    projects: project[],
}

type bar = {
    name: string;
    x: number,
    y: number,
    w: number,
    seconds: number,
    color: string,
    label: string;
  };
  
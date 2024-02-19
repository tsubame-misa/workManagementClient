type userDict = { [id: string]: userProject };

type projectDict = {[projectId:number]:project}

type user = {
    id:number,
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
    working: boolean,
    works?: work[],
}

type work = {
    id: number,
    start_time: string,
    end_time: string,
    description:string|null,
}

type showWork = {
    id: number,
    start_time: string,
    end_time: string,
    seconds: number,
    description:string,
}

type userProject = {
    user: user,
    projects: project[],
}

//TODO:rename
type bar = {
    id:number|null,
    name: string;
    x: number,
    y: number,
    w: number,
    seconds: number,
    color: string,
    label: string;
  };
  
  //TODO:rename
  type barData = {
    id: number;
    name: string;
    total_seconds: number;
  };
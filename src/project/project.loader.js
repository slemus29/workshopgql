import DataLoader from 'dataloader'

export default (projectsModel) => new DataLoader((userIds)=>{

    // Hacer la consulta a la db con los userIDs
    // Mapeo de datos

    const projects = userIds.map(()=>([{
        name: 'Proyecto hardcoded',
        description:'No es verdad'
    }]))

    return Promise.resolve(projects)
});
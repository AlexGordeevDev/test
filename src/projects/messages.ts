interface Message{
    key: string
    message: string
}
const messages:Array<Message> = [
    {
        key: 'task_not_done',
        message: 'In order to close task, you should close all tasks'
    },
    {
        key: 'project_not_found',
        message: 'Project with given uud is not present in database'
    },

]

export function get_message(key: String) {
    const item = messages.find(item => item.key === key)
    return item ? item.message : key
}
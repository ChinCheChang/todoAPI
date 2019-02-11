const addTask = (req, res, db) => {
  const { contents, authorid, title} = req.body;
  db('tasks').insert({
    title: title,
    contents: contents,
    authorid: authorid,
    completed: false
  })
  .returning('*')
  .then( data => {
    res.json(data[0])
  })
  .catch(err => res.status(400).json('add task error'))
}

const updateTask =  (req, res, db) => {
  const { taskid, request } = req.body;
  db('tasks').where({id: taskid})
    .update(request)
    .then(data => res.json('update success'))
    .catch(err => res.status(400).json('update error'))
}

const getTask = (req, res, db) => {
  const { id } = req.query;
  db('tasks').select('*')
    .where({authorid: id})
    .then(data => res.json(data))
    .catch(err => res.status(400).json('get tasks error'))
}

const deleteTask = (req, res, db) => {
  const { id } = req.query;
  db('tasks').del()
    .where({id: id})
    .then(data => res.json(data))
    .catch(err => res.status(400).json('delete tasks error'))
}

module.exports = {
  addTask: addTask,
  getTask: getTask,
  deleteTask: deleteTask,
  updateTask: updateTask
}

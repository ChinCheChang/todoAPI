const tasks = require('./tasks');

const handleSignin = (req, res, db, bcrypt) => {
  const { email, password } = req.body;
  db.select('email', 'hash').from('login')
    .where({
      email: email
    })
    .then( data => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid){
        return (
          db.select('*').from('users')
            .where({
              email: email
            })
            .then( users => {
              return users[0];
            })
            .catch(err => res.status(400).json('unable to get user'))
        );
      } else {
        res.status(400).json('wrong credentials');
      }
    })
    .then( data => {
      return (
        db.select('*').from('tasks')
          .where({
            authorid: data.id
          })
          .then( result => {
            res.json({user: data, tasks: result});
          })
          .catch(err => res.status(400).json('unable to get tasks'))
      );
    })
    .catch(err => res.status(400).json('wrong credentials'))
}

module.exports = {
  handleSignin: handleSignin
};

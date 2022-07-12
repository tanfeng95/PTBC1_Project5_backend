import jsSHA from 'jssha';

export default function initUserController(db) {
  /**
   * user login , find the user by name and match password before, return user result to client
   * @param {*} request
   * @param {*} reponse
   * @returns
   */
  const login = async (request, reponse) => {
    const user = await db.User.findAll({
      where: {
        email: request.body.email,
      },
    });
    console.log(user);
    if (typeof user[0] === 'undefined') {
      reponse.status(200).send({ noUser: true, error: 'Please Login Using Correct UserName and Password' });
      return;
    }
    const { dataValues } = user[0];

    if (dataValues.password === request.body.password) {
      reponse.send(user);
    } else {
      reponse.send(400);
    }
  };
  /**
   * user sign up function add a new user into data base
   * @param {} request
   * @param {*} reponse
   * @returns
   */
  const signup = async (request, reponse) => {
    console.log(request.body);

    const FindUser = await db.User.findAll({
      where: {
        email: request.body.email,
      },
    });
    if (FindUser.length !== 0) {
      console.log('there a user');
      reponse.status(200).send({ noUser: true, error: 'Please Choose another username' });
      return;
    }

    // const shaObj = new jsSHA('SHA-512', 'TEXT', { encoding: 'UTF8' });
    // shaObj.update(request.body.password);
    // const hashedPassword = shaObj.getHash('HEX');
    const newUser = request.body.email;
    const array = newUser.split('@');
    console.log(array[0]);
    const user = {
      email: request.body.email,
      username: array[0],
      password: request.body.password,
      role: 'buyer',
      created_at: Date.now(),
      updated_at: Date.now(),
    };
    const createUser = await db.User.create(user);
    reponse.send(createUser);
  };
  const getUserById = async (request, reponse) => {
    console.log('get user id');
    console.log(request.params.id);
    const user = await db.User.findByPk(request.params.id);
    console.log(user);
    reponse.send(user);
  };
  return {
    getUserById,
    login,
    signup,
  };
}

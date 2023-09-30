import User from '@/config/database/models/user'

async function getAll() {
  return await User.find();
}

async function getById(id) {
  try {
    return await User.findById(id);
  } catch {
    throw 'User Not Found';
  }
}

async function create(params) {
  // validate
  if (await User.findOne({ email: params.email })) {
    throw 'Email "' + params.email + '" is already taken';
  }

  const user = new User(params);

  // hash password
  if (params.password) {
    user.hash = bcrypt.hashSync(params.password, 10);
  }

  // save user
  await user.save();
}

async function _hardDelete(id) {
  await User.findByIdAndRemove(id);
}

async function _softDelete(id) {
  const user = await User.findById(id);

  if (!user) throw 'User not found';

  Object.assign(user, {
    isDeleted: true,
  });

  await user.save();
}

export const userServices = {
  getAll,
  getById,
  create,
  delete: _softDelete,
};

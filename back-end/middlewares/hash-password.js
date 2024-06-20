import bcrypt from "bcrypt"; 
const hashPassword = async (user, next) => {
  if (!user.isModified('motDePasse')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.motDePasse, salt);
    user.motDePasse = hash;
    next();
  } catch (error) {
    next(error); // Pass any errors to the error handler
  }
};

export default hashPassword;
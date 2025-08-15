import bcrypt from "bcrypt";



export async  function hashPasswordWithSalt(password , userSalt =undefined) {
   const salt = userSalt || await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(password, salt);
   return { userSalt: salt, password:hashedPassword };
}
import bcrypt from 'bcrypt';


export const hashPassword = async (pass :string)=> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(pass , salt);
    return hashedPassword
}

export const comparePassword = async (retrievedPassword :string,  enteredPassword :string)=>{
    const compared = await bcrypt.compare(enteredPassword , retrievedPassword);
    return compared;
}
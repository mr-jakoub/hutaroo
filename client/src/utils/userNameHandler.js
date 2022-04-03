let userNameHandler = (user_name, feeling) =>{
    if(user_name){
        if(user_name.length > 7){
            let mini_name = user_name.slice(0, 5)
            if(feeling){
                return mini_name + "..."
            }else if(user_name.length > 20){
                return mini_name + "..."
            }else{
                return user_name
            }
        }else{
            return user_name
        }
    }
}
export default userNameHandler
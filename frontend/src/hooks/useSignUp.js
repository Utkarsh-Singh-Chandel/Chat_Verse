
import React, {  useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const useSignUp = () => {
    const [loading,setLoading]=useState(false);
    const {setAuthUser}=useAuthContext();

    const signup=async({fullName,username,password,confirmPassword,gender,profilePic} )=>{
       
       const success= handleInputErrors({fullName,username,password,confirmPassword,gender})
       if(!success)
       return;
    setLoading(true);
    try {
        const res=await fetch('/api/auth/signup',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({fullName,username,password,confirmPassword,gender,profilePic})
        });
            const data=await res.json();
           
            if(data.error)
            throw new Error(data.error);
        //local storage saving
        localStorage.setItem("chat-user",JSON.stringify(data));
        //context
        setAuthUser(data);


        
    } catch (error) {
        toast.error(error.message);

    }
    finally{
        setLoading(false);

    }
    }
    
    return {loading,signup}
}
export default useSignUp

function handleInputErrors({fullName,username,password,confirmPassword,gender}){
    if(!fullName||!username||!password||!confirmPassword||!gender)
    {
        toast.error("Please fill all the field")
        return false;

    }
    if(password!==confirmPassword){
        toast.error('Password do not match')
        return false;
        
    }
    if(password.length<6){
        toast.error('Password must have atleast 6 characters')
        return false;

    }
    return true;
}
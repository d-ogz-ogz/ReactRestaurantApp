import { LoginUser } from "../models/LoginModel"
import { UserModel } from "../models/UserModel";

export const Login = async (login: LoginUser): Promise<UserModel> => {
    const res = await fetch("/User/Login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json", // Düzeltildi
        },
        body: JSON.stringify(login), 
    });
    if (!res.ok) {
        throw new Error("Login iþlemi baþarýsýz.");
    }

    const data: { token: string; user: UserModel } = await res.json();

    localStorage.setItem("token", data.token);

    return  data.user;
};

export const Register = async (registerUser:UserModel):Promise<boolean> => {
    const response = await fetch("/User/Register", {
        method:"POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(registerUser)

    })
    if (!response.ok) {
        throw new Error("");
        return  false;
    }
   
    return true;
}
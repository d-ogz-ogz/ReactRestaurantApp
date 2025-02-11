import { UserModel } from "./UserModel";

export class LoginResponseModel {
    token!: string;
    user!: UserModel
}
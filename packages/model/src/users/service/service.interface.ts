import { GetUserByIdDto } from "../dtos/get-user.dto";
import { LoginRequestDto, LoginResponseDto } from "../dtos/login.dto";
import {
  RegistrationRequestDto,
  RegistrationResponseDto,
} from "../dtos/registration.dto";
import { User } from "../schemas/user.schema";

export type GetUserById = (id: User["id"]) => Promise<GetUserByIdDto>;

export type Register = (
  data: RegistrationRequestDto,
) => Promise<RegistrationResponseDto>;

export type Login = (data: LoginRequestDto) => Promise<LoginResponseDto>;

export interface UserService {
  login: Login;
  register: Register;
  getUserById: GetUserById;
}

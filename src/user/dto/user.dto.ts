import { Role } from '../roles/role.enum';

export class CreateUserDto {
  email: string;
  password: string;
  roles: Role[];
}
export class GetUserDtoRes {
  email: string;
  roles: Role[];
  password: string;
  id: string;
}

export class GetUserDtoReq {
  email: string;
  password: string;
}

type UserModel = {
  email: string;
  id: string;
};

export class UserDto {
  email: string;
  id: string;

  constructor(model: UserModel) {
    this.email = model.email;
    this.id = model.id;
  }
}

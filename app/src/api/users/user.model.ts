import { Entity, Column, PrimaryGeneratedColumn} from "typeorm";
import { compareSync } from "bcryptjs";

@Entity({
  name: "users",
  synchronize: false
})
export default class User {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: "text"
  })
  name!: string;

  @Column({
    type: "text"
  })
  department!: string;

  @Column({
    type: "text",
    unique: true
  })
  login!: string

  @Column({
    type: "text"
  })
  password!: string

  validatePassword(inputPassword: string) {
    return compareSync(inputPassword, this.password)
  }

}

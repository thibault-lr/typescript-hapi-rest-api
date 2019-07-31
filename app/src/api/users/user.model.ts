import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

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

}

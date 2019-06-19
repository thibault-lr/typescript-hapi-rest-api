import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: "users",
  synchronize: false
})
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: "text"
  })
  department!: string;

  @Column("text")
  localization!: string;
}

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("adresses")
export class Address {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @Column({ type: "varchar", length: 8 })
  cep: string;

  @Column({ type: "varchar", length: 15 })
  state: string;

  @Column({ type: "text" })
  street: string;

  @Column({ type: "varchar", length: 50 })
  city: string;

  @Column({ type: "varchar", length: 8 })
  number: string;

  @Column({ type: "varchar", length: 20, nullable: true })
  complement: string | null | undefined;
}

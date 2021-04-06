import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
//import { Photo } from '../photos/photo.entity';

@Entity('task')
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: 'OPEN' })
  status: string;

 // @OneToMany(type => Photo, photo => photo.user)
  //photos: Photo[];
}
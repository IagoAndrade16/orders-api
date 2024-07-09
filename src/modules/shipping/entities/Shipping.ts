import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('shipping')
export class Shipping {
    @PrimaryColumn({ type: 'varchar', length: 100 })
    id: string;

    @Column({ type: 'varchar' })
    city: string;

    @Column({ type: 'int' })
    value: number;

    @Column({ type: 'datetime', default: 'now()' })
    createdAt: Date;

    @Column({ type: 'datetime', default: 'now()' })
    updatedAt: Date;
}


import { createConnection } from 'mysql2/promise';

async function dropDatabase() {
  try {
    const connection = await createConnection({
      host: 'shopper',
      user: 'root',
      password: '123456',
    });
    await connection.query(`DROP DATABASE IF EXISTS shopper;`)
    await connection.query(`CREATE DATABASE IF NOT EXISTS shopper;`)
    await connection.query(`USE shopper;`);
    await connection.query(`
    CREATE TABLE products 
      ( 
        code bigint PRIMARY KEY, 
        name varchar(100) NOT NULL, 
        cost_price decimal(9,2) NOT NULL, 
        sales_price decimal(9,2) NOT NULL 
      );
    `);
    await connection.query(`INSERT INTO products VALUES (16,'AZEITE  PORTUGUÊS  EXTRA VIRGEM GALLO 500ML',18.44,20.49);`);
    await connection.query(`INSERT INTO products VALUES (18,'BEBIDA ENERGÉTICA VIBE 2L',8.09,8.99);`);
    await connection.query(`INSERT INTO products VALUES (19,'ENERGÉTICO  RED BULL ENERGY DRINK 250ML',6.56,7.29);`);
    await connection.query(`INSERT INTO products VALUES (20,'ENERGÉTICO RED BULL ENERGY DRINK 355ML',9.71,10.79);`);
    await connection.query(`INSERT INTO products VALUES (21,'BEBIDA ENERGÉTICA RED BULL RED EDITION 250ML',10.71,11.71);`);
    await connection.query(`INSERT INTO products VALUES (22,'ENERGÉTICO  RED BULL ENERGY DRINK SEM AÇÚCAR 250ML',6.74,7.49);`);
    await connection.query(`INSERT INTO products VALUES (23,'ÁGUA MINERAL BONAFONT SEM GÁS 1,5L',2.15,2.39);`);
    await connection.query(`INSERT INTO products VALUES (24,'FILME DE PVC WYDA 28CMX15M',3.59,3.99);`);
    await connection.query(`INSERT INTO products VALUES (26,'ROLO DE PAPEL ALUMÍNIO WYDA 30CMX7,5M',5.21,5.79);`);
    await connection.query(`INSERT INTO products VALUES (1000,'BEBIDA ENERGÉTICA VIBE 2L - 6 UNIDADES',48.54,53.94);`);
    await connection.query(`INSERT INTO products VALUES (1010,'KIT ROLO DE ALUMINIO + FILME PVC WYDA',8.80,9.78);`);
    await connection.query(`INSERT INTO products VALUES (1020,'SUPER PACK RED BULL VARIADOS - 6 UNIDADES',51.81,57.00);`);

    await connection.query(`
    CREATE TABLE packs 
        (
          id bigint AUTO_INCREMENT PRIMARY KEY, 
          pack_id bigint NOT NULL,  
          product_id bigint NOT NULL, 
          qty bigint NOT NULL, 
          CONSTRAINT FOREIGN KEY (pack_id) REFERENCES products(code),
          CONSTRAINT FOREIGN KEY (product_id) REFERENCES products(code)
        );
    `);

  await connection.query(`INSERT INTO packs (pack_id,product_id, qty) VALUES (1000,18,6);`);
  await connection.query(`INSERT INTO packs (pack_id,product_id, qty) VALUES (1010,24,1);`);
  await connection.query(`INSERT INTO packs (pack_id,product_id, qty) VALUES (1010,26,1);`);
  await connection.query(`INSERT INTO packs (pack_id,product_id, qty) VALUES (1020,19,3);`);
  await connection.query(`INSERT INTO packs (pack_id,product_id, qty) VALUES (1020,21,3);`);
    await connection.end();
  } catch (error) {
    console.error('Erro ao criar o banco de dados:', error);
  } finally {
  }
}

dropDatabase();

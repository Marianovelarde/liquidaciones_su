// src/prisma/client.ts
//Este modulo lo que hace es crear una instancia de PrismaClient y exportarla para que pueda ser utilizada en otras partes de la aplicación. Además, se asegura de que solo se cree una instancia de PrismaClient durante el desarrollo para evitar problemas de conexión a la base de datos.

//Instancia de PrismaClient quiere decir que se crea un objeto que permite interactuar con la base de datos a través de Prisma. Al exportar esta instancia, otras partes de la aplicación pueden importar y utilizar esta conexión para realizar consultas y operaciones en la base de datos sin tener que crear una nueva instancia cada vez.

import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
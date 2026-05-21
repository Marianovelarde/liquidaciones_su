"use strict";
// src/prisma/client.ts
//Este modulo lo que hace es crear una instancia de PrismaClient y exportarla para que pueda ser utilizada en otras partes de la aplicación. Además, se asegura de que solo se cree una instancia de PrismaClient durante el desarrollo para evitar problemas de conexión a la base de datos.
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
//Instancia de PrismaClient quiere decir que se crea un objeto que permite interactuar con la base de datos a través de Prisma. Al exportar esta instancia, otras partes de la aplicación pueden importar y utilizar esta conexión para realizar consultas y operaciones en la base de datos sin tener que crear una nueva instancia cada vez.
const client_1 = require("@prisma/client");
const globalForPrisma = global;
exports.prisma = globalForPrisma.prisma || new client_1.PrismaClient();
if (process.env.NODE_ENV !== "production")
    globalForPrisma.prisma = exports.prisma;
exports.default = exports.prisma;

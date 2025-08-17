import { pgEnum, pgTableCreator } from 'drizzle-orm/pg-core';

export const createTable = pgTableCreator((name) => `shiharai_${name}`);
export const createEnum = (name: string, values: [string, ...string[]]) =>
	pgEnum(`shiharai_${name}`, values);

import { z } from "zod";
import { fuelType } from "../entities/cars.entity";

const FuelType = z.enum([fuelType.flex, fuelType.hybrid, fuelType.eletric]);

const CarSchema = z.object({
  uuid: z.string().uuid(),
  brand: z.string().max(20),
  model: z.string().max(40),
  year: z.number().int().min(1886).max(new Date().getFullYear()),
  fuel_type: FuelType,
  mileage: z.number().int(),
  color: z.string().max(30),
  is_good_deal: z.boolean(),
  is_active: z.boolean(),
  value: z.number().positive(),
  description: z.string(),
  user: z.object({}),
  comments: z.array(z.object({})).optional(),
  galleries: z.array(z.object({})).optional(),
});

const CarCreateSchema = CarSchema.omit({
  uuid: true,
  user: true,
  comments: true,
  galleries: true,
});

const CarCreateRequestSchema = CarCreateSchema.omit({
  is_good_deal: true,
}).extend({
  fipe_price: z.number(),
});

const CarUpdateRequestSchema = CarCreateRequestSchema.partial();

export {
  CarSchema,
  CarCreateRequestSchema,
  CarCreateSchema,
  CarUpdateRequestSchema,
};

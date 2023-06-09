import { z } from "zod";
import { fuelType } from "../entities/cars.entity";
import { gallerySchema } from "./gallery.schemas";
import { UserResponseSchema } from "./users.schemas";

const FuelType = z.enum([fuelType.flex, fuelType.hybrid, fuelType.eletric]);

const CarSchema = z.object({
  uuid: z.string().uuid(),
  brand: z.string().max(20),
  model: z.string().max(40),
  year: z.number().int().min(1886).max(new Date().getFullYear()),
  fuel_type: FuelType,
  mileage: z.number().int(),
  color: z.string().max(30),
  img_default: z.string(),
  is_good_deal: z.boolean(),
  is_active: z.boolean(),
  value: z.number().positive(),
  description: z.string(),
  user: z.object({}),
  comments: z.array(z.object({})).optional(),
  gallery: z.array(z.string())
});

const CarReturnSchema = CarSchema.omit({
  gallery: true
}).extend({
  gallery: z.array(gallerySchema.required())
});

const CarCreateSchema = CarSchema.omit({
  uuid: true,
  user: true,
  comments: true
});

const CarCreateRequestSchema = CarCreateSchema.omit({
  is_good_deal: true
}).extend({
  fipe_price: z.number()
});

const CarCreateRequestWithotGallerySchema = CarCreateSchema.omit({
  gallery: true
});

const CarUpdateRequestSchema = CarCreateRequestSchema.partial();

const CarUpdateRequestRequiredSchema = CarCreateRequestSchema.required();

const CarResponseSchema = z.object({
  uuid: z.string().uuid(),
  brand: z.string().max(20),
  model: z.string().max(40),
  year: z.number().int().min(1886).max(new Date().getFullYear()),
  fuel_type: FuelType,
  mileage: z.number().int(),
  color: z.string().max(30),
  img_default: z.string(),
  is_good_deal: z.boolean(),
  is_active: z.boolean(),
  value: z.string(),
  description: z.string(),
  user: UserResponseSchema
});

const retrieveCarSchema = CarResponseSchema.extend({
  gallery: z
    .array(
      z.object({
        uuid: z.string(),
        imageUrl: z.string()
      })
    )
    .optional(),
  comments: z
    .array(
      z.object({
        uuid: z.string(),
        addedIn: z.string(),
        user: UserResponseSchema,
        description: z.string()
      })
    )
    .optional()
});

const MultipleCarResponseSchema = retrieveCarSchema.array();

export {
  retrieveCarSchema,
  MultipleCarResponseSchema,
  CarSchema,
  CarReturnSchema,
  CarCreateRequestSchema,
  CarCreateSchema,
  CarUpdateRequestSchema,
  CarCreateRequestWithotGallerySchema,
  CarUpdateRequestRequiredSchema,
  CarResponseSchema
};

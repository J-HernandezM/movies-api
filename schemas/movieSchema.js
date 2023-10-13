const z = require('zod')

const movieSchema = z.object({
    title: z.string({
        invalid_type_error: "Title must be a string",
    }),
    year: z.number().min(1900).max(2025).int(),
    director: z.string().max(60),
    duration: z.number().positive().max(500),
    poster: z.string().url({message: "invalid URL"}),
    rate: z.number().min(0).max(10),
    genre: z.array(z.enum(["Drama", "Crime", "Action", "Sci-Fi", "Adventure", "Romance", "Fantasy", "Biography"]))
})

const validateMovie = (object) => {
    return movieSchema.safeParse(object)
}

const validatePartialMovie = (object) => {
    return movieSchema.partial.safeParse(object)
}

module.exports = {
    validateMovie,
    validatePartialMovie
}
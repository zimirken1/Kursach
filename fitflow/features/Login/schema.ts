import { z } from 'zod';

export type FormDataType = z.infer<typeof schema>;

export const schema = z.object({
  email: z.string().min(1, 'Обязательное поле').email('Некорректный email'),
  password: z.string().min(1, 'Обязательное поле').min(6, 'Пароль должен содержать не менее 6 символов'),
});

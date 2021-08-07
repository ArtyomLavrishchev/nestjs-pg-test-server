import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
	@ApiProperty({example: 'example@mail.com', description: 'Email пользователя'})
	readonly email: string;
	@ApiProperty({example: 'paSsWord123', description: 'Пароль пользователя'})
	readonly password: string;
}
import {IsNumber, IsString} from "class-validator";

export class CreatePostDto {
	@IsString({message: 'Должен быть строкой'})
	readonly title: string;
	@IsString({message: 'Должен быть строкой'})
	readonly content: string;
	@IsNumber({}, {message: 'Должен быть числом'})
	readonly userId: number;
}
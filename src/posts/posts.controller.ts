import {Body, Controller, Post, UploadedFile, UseInterceptors, UsePipes} from '@nestjs/common';
import {CreatePostDto} from "./dto/create-post.dto";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {User} from "../users/users.model";
import {ValidationPipe} from "../pipes/validation.pipe";
import {PostsService} from "./posts.service";
import {FileInterceptor} from "@nestjs/platform-express";

@Controller('posts')
export class PostsController {
	constructor(private postsService: PostsService) {
	}

	@Post()
	@UseInterceptors(FileInterceptor('image'))
	createPost(@Body() dto: CreatePostDto,
			   @UploadedFile() image) {
		return this.postsService.create(dto, image);
	}
}
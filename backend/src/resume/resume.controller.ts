import { Controller, Post, Body, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ResumeService } from './resume.service';
import { diskStorage } from 'multer';

@Controller('api/resume')
export class ResumeController {
    constructor(private readonly resumeService: ResumeService) { }

    @Post('upload')
    @UseInterceptors(
        FileInterceptor('resume', {
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, callback) => {
                    callback(null, Date.now() + file.originalname);
                },
            }),
        }),
    )
    async evaluateResume(
        @UploadedFile() file: Express.Multer.File,
        @Body('skills') skills: string,
    ) {
        if (!file || !skills) {
            throw new Error('Please provide both a resume and skills list.');
        }

        try {
            const result = await this.resumeService.evaluateResume(file, skills);
            return { status: 'success', data: result };
        } catch (error) {
            throw new Error('Error processing the resume: ' + error.message);
        }
    }
}

import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class ResumeService {
    private readonly openai: OpenAI;

    constructor() {
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }

    async evaluateResume(file: Express.Multer.File, skills: string) {
        const resumePath = path.resolve(__dirname, '..', '..', 'uploads', file.filename);

        if (!fs.existsSync(resumePath)) {
            throw new Error(`File not found: ${resumePath}`);
        }
        const resumeText = await this.extractTextFromPdf(resumePath);

        const openaiResponse = await this.callOpenAiAPI(resumeText, skills);

        return openaiResponse;
    }

    private async extractTextFromPdf(filePath: string): Promise<string> {
        const pdfBuffer = fs.readFileSync(filePath);
        const pdfParse = require('pdf-parse');
        const data = await pdfParse(pdfBuffer);
        return data.text;
    }

    private async callOpenAiAPI(resumeText: string, skills: string) {
        const prompt = `
            You are an expert in analyzing and interpreting resume text data. Based on the following details, analyze the resume content and extract the required information.

            Resume Text:
            ${resumeText}

            Required Skills: ${skills}

            Return the results in **valid JSON format** with the following structure:
            {
            "name": "Full name extracted from the resume",
            "experience": "Total years of experience as a whole number, like 2 or 5",
            "graduation_year": "Graduation year extracted from the resume as a four-digit number, like 2022",
            "criteria_match": "Percentage match between required skills and mentioned skills in the resume, as a whole number between 0 and 100"
            }

            Guidelines:
            1. Ensure the "name" field contains the full name of the candidate.
            2. "Experience" should be a numerical value derived from years mentioned in the resume.
            3. "Graduation year" should be a valid four-digit number. If not found, return "Not Found".
            4. "Criteria match" should calculate how many of the required skills are present in the resume (case-insensitive) as a percentage of the total required skills.
            5. Ensure the response is strictly in the JSON format with no additional text or commentary.

            If any information is missing or unclear in the resume, provide a best estimate or return "Not Found" for that field.
        `;
        
        const response = await this.openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
        });

        return JSON.parse(response.choices[0].message.content)
    }
}

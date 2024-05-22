import {IQuestionResponse} from "./question.types";

export interface IQuizResponse {
    id: number,
    title: string,
    questions: IQuestionResponse
}
import {IAnswerResponse} from "./answer.types";

export interface IQuestionResponse {
    id: number
    text: string
    answers: IAnswerResponse[]
    correctAnswer: IAnswerResponse
}
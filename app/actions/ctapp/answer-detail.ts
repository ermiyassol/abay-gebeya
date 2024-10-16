"use server"; 
import { auth } from "@/auth";
 
import { fetchData, postData, putData } from "../baseAction";
import { AxiosErrorResponse } from "@/types/axiosErrorResponse";
import { createQuestionnaireAnswersEndpoint, getQuestionnaireAnswersEndpoint, updateQuestionnaireAnswersEndpoint } from "@/utils/backendEndpoints/route";
import { AnswerType } from "@/types/enums/answerTypeEnums";

type answerListType = {
  answer: string;
  status: boolean;
}
interface PostType {
  answerDescription: string,
  answer: answerListType[],
  answerType: AnswerType
}

interface PutType {
  id: number,
  answerDescription?: string,
  answer?: answerListType[],
  answerType?: AnswerType
}

export async function getQuestionnaireAnswersList(): Promise<any | AxiosErrorResponse> {
  let url = `${process.env.NEXT_CTAPP_BE}${getQuestionnaireAnswersEndpoint}`;
  const session = await auth();
  const token = session?.user?.accessToken ? session?.user?.accessToken : "";
  return fetchData(url, token);
}

export async function createQuestionnaireAnswer(data: PostType): Promise<any | AxiosErrorResponse> {
  let url = `${process.env.NEXT_CTAPP_BE}${createQuestionnaireAnswersEndpoint}`;
  const session = await auth();
  const token = session?.user?.accessToken ? session?.user?.accessToken : "";
  return postData(url, token, data);
}

export async function updateQuestionnaireAnswers(data: PutType): Promise<any | AxiosErrorResponse> {
  let url = `${process.env.NEXT_CTAPP_BE}${updateQuestionnaireAnswersEndpoint }`;
  const session = await auth();
  const token = session?.user?.accessToken ? session?.user?.accessToken : "";
  return putData(url, token, data);
}

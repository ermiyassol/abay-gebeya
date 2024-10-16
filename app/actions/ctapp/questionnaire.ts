"use server"; 
import { auth } from "@/auth";
 
import { fetchData, postData, putData } from "../baseAction";
import { AxiosErrorResponse } from "@/types/axiosErrorResponse";
import { createQuestionnaireEndpoint, getQuestionnairesEndpoint, updateQuestionnaireEndpoint } from "@/utils/backendEndpoints/route";
import { VisitType } from "@/types/enums/roleEnums";
import { CallType } from "@/types/enums/callTypeEnums";

interface PostType {
 question: string,
 description: string,
 QuestionnaireId: number,
 channelTypeId: number,
 answerDetailId: number,
 theCoachingRoleId?: number,
 theCoachedRoleId?: number,
 activityType: VisitType,
 callType: CallType,
 weight: number,
}

interface PutType {
  id: number,
  question?: string,
  description?: string,
  QuestionnaireId?: number,
  channelTypeId?: number,
  answerDetailId?: number,
  theCoachingRoleId?: number,
  theCoachedRoleId?: number,
  activityType?: VisitType,
  callType?: CallType
  isActive?: boolean
  weight?: number,
}

export async function getQuestionnairesList(): Promise<any | AxiosErrorResponse> {
  let url = `${process.env.NEXT_CTAPP_BE}${getQuestionnairesEndpoint}?isWeb=true`;
  const session = await auth();
  const token = session?.user?.accessToken ? session?.user?.accessToken : "";
  return fetchData(url, token);
}

export async function createQuestionnaire(data: PostType): Promise<any | AxiosErrorResponse> {
  let url = `${process.env.NEXT_CTAPP_BE}${createQuestionnaireEndpoint}`;
  const session = await auth();
  const token = session?.user?.accessToken ? session?.user?.accessToken : "";
  return postData(url, token, data);
}

export async function updateQuestionnaire(data: PutType): Promise<any | AxiosErrorResponse> {
  let url = `${process.env.NEXT_CTAPP_BE}${updateQuestionnaireEndpoint}`;
  const session = await auth();
  const token = session?.user?.accessToken ? session?.user?.accessToken : "";
  return putData(url, token, data);
}

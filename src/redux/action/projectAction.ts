import { PayloadName } from '@redux/reducer';
import { querySearchDefault, SearchResponse } from '@type/context';
import { Project, ProjectInputName } from '@type/project';

export type CreateProjectBody = Record<ProjectInputName, any>;
export type GetProjectParams = { id: string };

export type SearchProjectAction = Record<PayloadName, querySearchDefault>;
export type SearchProjectSuccessAction = Record<PayloadName, SearchResponse>;
export type CreateProjectAction = Record<PayloadName, CreateProjectBody>;
export type CreateProjectSuccessAction = Record<PayloadName, Project>;
export type GetProjectAction = Record<PayloadName, GetProjectParams>;
export type GetProjectSuccessAction = Record<PayloadName, Project>;

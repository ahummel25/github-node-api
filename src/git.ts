import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';

const githubReposUrl = 'https://api.github.com/user/repos';
const githubUserReposUrl = 'https://api.github.com/repos/ahummel25';
const token = process.env.GITHUB_API_TOKEN;

const config: AxiosRequestConfig = {
  method: 'get',
  headers: { Authorization: `token ${token}` }
};

export const getRepo = async (
  repo?: string,
  repoFileToFetch?: string
): Promise<AxiosResponse> => {
  const fileContentsUrl = repoFileToFetch
    ? repoFileToFetch.charAt(0) === '/'
      ? repoFileToFetch
      : `/${repoFileToFetch}`
    : '';

  const url = repo
    ? `${githubUserReposUrl}/${repo}${fileContentsUrl}`
    : githubReposUrl;

  config.url = url;

  try {
    const res = await axios(config);

    return res;
  } catch (err) {
    if (err.response.status === StatusCodes.NOT_FOUND) {
      const message = repoFileToFetch
        ? `File ${fileContentsUrl}`
        : `Repo ${repo}`;

      throw new Error(`${message} not found`);
    }

    throw new Error(err);
  }
};

export const getRepoFile = async (
  repoFileDownloadUrl: string
): Promise<AxiosResponse> => {
  config.url = repoFileDownloadUrl;

  try {
    const res = await axios(config);

    return res;
  } catch (err) {
    throw new Error(err);
  }
};

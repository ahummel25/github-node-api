import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const githubReposUrl = 'https://api.github.com/repos/ahummel25';
const token = process.env.GITHUB_API_TOKEN;

const config: AxiosRequestConfig = {
	method: 'get',
	headers: { Authorization: `token ${token}` },
};

export const getRepo = async (
	repo: string,
	fileContents?: string,
): Promise<AxiosResponse> => {
	const fileContentsUrl = fileContents
		? fileContents?.charAt(0) === '/'
			? fileContents
			: `/${fileContents}`
		: '';

	Object.assign(config, {
		url: `${githubReposUrl}/${repo}${fileContentsUrl}`,
	});

	try {
		const res = await axios(config);

		return res;
	} catch (err) {
		if (err.response?.status === 404) {
			const message = fileContents ? `File ${fileContentsUrl}` : `Repo ${repo}`;

			throw new Error(`${message} not found`);
		}

		throw new Error(err);
	}
};

export const getRepoFile = async (
	repoFileDownloadUrl: string,
): Promise<AxiosResponse> => {
	Object.assign(config, {
		url: repoFileDownloadUrl,
	});

	try {
		const res = await axios(config);

		return res;
	} catch (err) {
		throw new Error(err.response?.data);
	}
};
